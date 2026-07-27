import { NextResponse } from "next/server";
import { rateLimit, tooMany } from "@/lib/rate-limit";
import { COMPOUNDS } from "@/lib/content";
import { cartEligible } from "@/types";
import { saveOrder, type Order, type OrderLine, type PaymentMethod, type Fulfillment } from "@/lib/orders-store";
import { sendEmail, orderReceivedEmail } from "@/lib/email";
import { notifyOwnerNewOrder } from "@/lib/notify";

function productionOrderingMissing() {
  const production = process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
  if (!production) return [];
  const missing: string[] = [];
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push("durable order storage");
  if (!process.env.RESEND_API_KEY || !process.env.ORDER_EMAIL_FROM) missing.push("customer email delivery");
  if (!process.env.OWNER_EMAIL) missing.push("owner order alerts");
  return missing;
}

export async function POST(req: Request) {
  const missing = productionOrderingMissing();
  if (missing.length) {
    console.error("[orders] production ordering unavailable", { missing });
    return NextResponse.json({
      ok: false,
      code: "ordering_not_configured",
      error: "Online order requests are temporarily unavailable while Vanguard completes the secure order system. Please use the contact page so our team can assist you directly.",
    }, { status: 503 });
  }

  const limit = rateLimit(req, "orders", { perMinute: 4 });
  if (!limit.ok) return tooMany(limit.retryAfter);

  let body: {
    items?: { slug: string; size: string; qty: number }[];
    company?: string;
    contact?: string;
    email?: string;
    phone?: string;
    notes?: string;
    ack?: boolean;
    paymentMethod?: string;
    fulfillment?: string;
    shipping?: { name?: string; line1?: string; line2?: string; city?: string; state?: string; zip?: string };
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid order data." }, { status: 400 });
  }

  const company = String(body.company ?? "").trim();
  const contact = String(body.contact ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!company || !contact || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Company, contact name, and a valid work email are required." }, { status: 422 });
  }
  if (body.ack !== true) {
    return NextResponse.json({ ok: false, error: "Research-use acknowledgment is required." }, { status: 422 });
  }

  const paymentMethod = (body.paymentMethod === "phone" ? "phone" : "wire") as PaymentMethod;
  const fulfillment = (body.fulfillment === "willcall" ? "willcall" : "ship") as Fulfillment;
  if (fulfillment === "ship") {
    const shipping = body.shipping ?? {};
    if (!shipping.line1?.trim() || !shipping.city?.trim() || !shipping.state?.trim() || !/^\d{5}(?:-\d{4})?$/.test(shipping.zip?.trim() ?? "")) {
      return NextResponse.json({ ok: false, error: "A complete U.S. shipping address with a valid ZIP code is required for shipped orders." }, { status: 422 });
    }
  }

  const rawItems = Array.isArray(body.items) ? body.items : [];
  const lines: OrderLine[] = [];
  for (const item of rawItems) {
    const compound = COMPOUNDS.find((entry) => entry.slug === item.slug);
    if (!compound || !cartEligible(compound.regulatory) || !compound.variants?.length) {
      return NextResponse.json({ ok: false, error: `Item is not currently orderable: ${item.slug}` }, { status: 422 });
    }
    const variant = compound.variants.find((entry) => entry.size === item.size);
    if (!variant) {
      return NextResponse.json({ ok: false, error: `Unavailable vial strength for ${compound.name}: ${item.size}` }, { status: 422 });
    }
    lines.push({
      slug: compound.slug,
      name: `${compound.name} ${variant.size}`,
      qty: Math.max(1, Math.min(99, Number(item.qty) || 1)),
      unit: variant.price,
    });
  }
  if (!lines.length) return NextResponse.json({ ok: false, error: "The order is empty." }, { status: 422 });

  const total = lines.reduce((sum, line) => sum + line.qty * line.unit, 0);
  const order: Order = {
    id: `VPL-${Date.now().toString(36).toUpperCase()}`,
    created_at: new Date().toISOString(),
    status: "pending_payment",
    company,
    contact,
    email,
    phone: String(body.phone ?? "").trim() || undefined,
    notes: String(body.notes ?? "").trim().slice(0, 2000) || undefined,
    payment_method: paymentMethod,
    fulfillment,
    shipping: fulfillment === "ship" ? body.shipping : undefined,
    lines,
    total,
  };

  try {
    await saveOrder(order);
  } catch (error) {
    console.error("[orders] save failed", error);
    return NextResponse.json({ ok: false, error: "The order could not be saved securely. Please contact Vanguard so we can assist you." }, { status: 500 });
  }

  const customerEmailSent = await sendEmail(email, `Vanguard order ${order.id} received`, orderReceivedEmail(order));
  try {
    await notifyOwnerNewOrder(order);
  } catch (error) {
    console.error("[notify] owner alert failed", error);
  }

  const instructions = paymentMethod === "phone"
    ? `Order ${order.id} is saved. Call ${process.env.PAYMENT_PHONE ?? "the number on your confirmation"} and reference the order number. Nothing ships until payment is confirmed.`
    : `Order ${order.id} is saved. Bank wire or ACH instructions will be sent to ${email} after review. Nothing ships until payment is verified.`;

  return NextResponse.json({
    ok: true,
    orderId: order.id,
    total,
    customerEmailSent,
    settlement: { method: paymentMethod, instructions },
  });
}
