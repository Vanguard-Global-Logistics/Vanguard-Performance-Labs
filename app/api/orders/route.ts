import { NextResponse } from "next/server";
import { protectPublicMutation } from "@/lib/security-guard";
import { COMPOUNDS } from "@/lib/content";
import { cartEligible } from "@/types";
import { saveOrder, type Order, type OrderLine, type PaymentMethod, type Fulfillment } from "@/lib/orders-store";
import { sendEmail, orderReceivedEmail } from "@/lib/email";
import { notifyOwnerNewOrder } from "@/lib/notify";

const clean = (value: unknown, max = 500) => String(value ?? "").trim().slice(0, max);

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
  const blocked = protectPublicMutation(req, "orders", {
    perMinute: 4,
    burst: 1,
    perHour: 15,
    maxBodyBytes: 48 * 1024,
  });
  if (blocked) return blocked;

  const missing = productionOrderingMissing();
  if (missing.length) {
    console.error("[orders] production ordering unavailable", { missing });
    return NextResponse.json({
      ok: false,
      code: "ordering_not_configured",
      error: "Online order requests are temporarily unavailable while Vanguard completes the secure order system. Please use the contact page so our team can assist you directly.",
    }, { status: 503 });
  }

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

  const company = clean(body.company, 160);
  const contact = clean(body.contact, 160);
  const email = clean(body.email, 254).toLowerCase();
  if (!company || !contact || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Company, contact name, and a valid work email are required." }, { status: 422 });
  }
  if (body.ack !== true) {
    return NextResponse.json({ ok: false, error: "Research-use acknowledgment is required." }, { status: 422 });
  }

  const paymentMethod = (body.paymentMethod === "phone" ? "phone" : "wire") as PaymentMethod;
  const fulfillment = (body.fulfillment === "willcall" ? "willcall" : "ship") as Fulfillment;
  const sanitizedShipping = body.shipping ? {
    name: clean(body.shipping.name, 160),
    line1: clean(body.shipping.line1, 180),
    line2: clean(body.shipping.line2, 180),
    city: clean(body.shipping.city, 120),
    state: clean(body.shipping.state, 40),
    zip: clean(body.shipping.zip, 20),
  } : undefined;

  if (fulfillment === "ship") {
    const shipping = sanitizedShipping ?? {};
    if (!shipping.line1 || !shipping.city || !shipping.state || !/^\d{5}(?:-\d{4})?$/.test(shipping.zip ?? "")) {
      return NextResponse.json({ ok: false, error: "A complete U.S. shipping address with a valid ZIP code is required for shipped orders." }, { status: 422 });
    }
  }

  const rawItems = Array.isArray(body.items) ? body.items : [];
  if (rawItems.length > 50) {
    return NextResponse.json({ ok: false, error: "The order contains too many line items." }, { status: 422 });
  }

  const lines: OrderLine[] = [];
  for (const item of rawItems) {
    const slug = clean(item?.slug, 120);
    const size = clean(item?.size, 80);
    const compound = COMPOUNDS.find((entry) => entry.slug === slug);
    if (!compound || !cartEligible(compound.regulatory) || !compound.variants?.length) {
      return NextResponse.json({ ok: false, error: `Item is not currently orderable: ${slug}` }, { status: 422 });
    }
    const variant = compound.variants.find((entry) => entry.size === size);
    if (!variant) {
      return NextResponse.json({ ok: false, error: `Unavailable vial strength for ${compound.name}: ${size}` }, { status: 422 });
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
    phone: clean(body.phone, 40) || undefined,
    notes: clean(body.notes, 2000) || undefined,
    payment_method: paymentMethod,
    fulfillment,
    shipping: fulfillment === "ship" ? sanitizedShipping : undefined,
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
