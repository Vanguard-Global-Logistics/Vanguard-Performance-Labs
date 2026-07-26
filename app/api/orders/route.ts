import { NextResponse } from "next/server";
import { rateLimit, tooMany } from "@/lib/rate-limit";
import { COMPOUNDS } from "@/lib/content";
import { cartEligible } from "@/types";
import { saveOrder, type Order, type OrderLine, type PaymentMethod, type Fulfillment } from "@/lib/orders-store";
import { sendEmail, orderReceivedEmail } from "@/lib/email";
import { notifyOwnerNewOrder } from "@/lib/notify";

// Order intake is OFF by default. It must not be enabled until the owner has completed
// product-specific legal/regulatory review, operating procedures, and merchant/account review.
// Enabling the UI later is not enough: the server also requires ENABLE_ORDER_REQUESTS=true.

export async function POST(req: Request) {
  if (process.env.ENABLE_ORDER_REQUESTS !== "true") {
    return NextResponse.json(
      {
        ok: false,
        error: "Public order submission is disabled. Use a professional inquiry or contact Vanguard.",
      },
      { status: 503 },
    );
  }

  const rl = rateLimit(req, "orders", { perMinute: 4 });
  if (!rl.ok) return tooMany(rl.retryAfter);

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
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const company = String(body.company ?? "").trim();
  const email = String(body.email ?? "").trim();
  if (!company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Company and a valid email are required." }, { status: 422 });
  }
  if (body.ack !== true) {
    return NextResponse.json({ ok: false, error: "Research-use acknowledgment is required." }, { status: 422 });
  }

  const payment_method = (body.paymentMethod === "phone" ? "phone" : "wire") as PaymentMethod;
  const fulfillment = (body.fulfillment === "willcall" ? "willcall" : "ship") as Fulfillment;
  if (fulfillment === "ship") {
    const shipping = body.shipping ?? {};
    if (!shipping.line1?.trim() || !shipping.city?.trim() || !shipping.zip?.trim()) {
      return NextResponse.json({ ok: false, error: "Shipping address (street, city, ZIP) is required for shipped orders." }, { status: 422 });
    }
  }

  const raw = Array.isArray(body.items) ? body.items : [];
  const lines: OrderLine[] = [];
  for (const item of raw) {
    const compound = COMPOUNDS.find((entry) => entry.slug === item.slug);
    if (!compound || !cartEligible(compound.regulatory) || !compound.variants?.length) {
      return NextResponse.json({ ok: false, error: `Item not orderable: ${item.slug}` }, { status: 422 });
    }

    const variant = compound.variants.find((entry) => entry.size === item.size);
    if (!variant) {
      return NextResponse.json({ ok: false, error: `Unavailable size for ${compound.name}: ${item.size}` }, { status: 422 });
    }

    lines.push({
      slug: compound.slug,
      name: `${compound.name} ${variant.size}`,
      qty: Math.max(1, Math.min(99, Number(item.qty) || 1)),
      unit: variant.price,
    });
  }

  if (lines.length === 0) {
    return NextResponse.json({ ok: false, error: "Order is empty." }, { status: 422 });
  }

  const total = lines.reduce((sum, line) => sum + line.qty * line.unit, 0);
  const order: Order = {
    id: `VPL-${Date.now().toString(36).toUpperCase()}`,
    created_at: new Date().toISOString(),
    status: "pending_payment",
    company,
    contact: body.contact,
    email,
    phone: body.phone,
    notes: body.notes,
    payment_method,
    fulfillment,
    shipping: fulfillment === "ship" ? body.shipping : undefined,
    lines,
    total,
  };

  try {
    await saveOrder(order);
  } catch (error) {
    console.error("[orders] save failed", error);
    return NextResponse.json({ ok: false, error: "Could not save order. Please try again." }, { status: 500 });
  }

  await sendEmail(email, `Vanguard order ${order.id} received`, orderReceivedEmail(order));
  try {
    await notifyOwnerNewOrder(order);
  } catch (error) {
    console.error("[notify] owner alert failed", error);
  }

  const instructions = payment_method === "phone"
    ? `Order ${order.id} saved. Call ${process.env.PAYMENT_PHONE ?? "the number on your confirmation email"} to arrange payment. Nothing ships until payment is confirmed.`
    : `Order ${order.id} saved. An invoice with bank wire/ACH instructions will be sent to ${email}. Nothing ships until payment is verified by the team.`;

  return NextResponse.json({
    ok: true,
    orderId: order.id,
    total,
    settlement: { method: payment_method, instructions },
  });
}
