import { NextResponse } from "next/server";
import { rateLimit, tooMany } from "@/lib/rate-limit";
import { COMPOUNDS } from "@/lib/content";
import { cartEligible } from "@/types";
import { saveOrder, type Order, type OrderLine, type PaymentMethod, type Fulfillment } from "@/lib/orders-store";
import { sendEmail, orderReceivedEmail } from "@/lib/email";
import { notifyOwnerNewOrder } from "@/lib/notify";

// Order intake: server re-validates every line; SAVES the order in pending_payment;
// emails the customer wire/phone instructions. Nothing ships until the owner
// confirms payment in /admin.

export async function POST(req: Request) {
  const rl = rateLimit(req, "orders", { perMinute: 4 });
  if (!rl.ok) return tooMany(rl.retryAfter);
  let body: {
    items?: { slug: string; qty: number }[];
    company?: string; contact?: string; email?: string; phone?: string; notes?: string; ack?: boolean;
    paymentMethod?: string; fulfillment?: string;
    shipping?: { name?: string; line1?: string; line2?: string; city?: string; state?: string; zip?: string };
  };
  try { body = await req.json(); } catch {
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
    const s = body.shipping ?? {};
    if (!s.line1?.trim() || !s.city?.trim() || !s.zip?.trim()) {
      return NextResponse.json({ ok: false, error: "Shipping address (street, city, ZIP) is required for shipped orders." }, { status: 422 });
    }
  }

  const raw = Array.isArray(body.items) ? body.items : [];
  const lines: OrderLine[] = [];
  for (const it of raw) {
    const c = COMPOUNDS.find((x) => x.slug === it.slug);
    if (!c || !cartEligible(c.regulatory) || typeof c.listPrice !== "number") {
      return NextResponse.json({ ok: false, error: `Item not orderable: ${it.slug}` }, { status: 422 });
    }
    lines.push({ slug: c.slug, name: c.name, qty: Math.max(1, Math.min(99, Number(it.qty) || 1)), unit: c.listPrice });
  }
  if (lines.length === 0) return NextResponse.json({ ok: false, error: "Order is empty." }, { status: 422 });

  const total = lines.reduce((n, l) => n + l.qty * l.unit, 0);
  const order: Order = {
    id: `VPL-${Date.now().toString(36).toUpperCase()}`,
    created_at: new Date().toISOString(),
    status: "pending_payment",
    company, contact: body.contact, email, phone: body.phone, notes: body.notes,
    payment_method, fulfillment,
    shipping: fulfillment === "ship" ? body.shipping : undefined,
    lines, total,
  };

  try { await saveOrder(order); } catch (e) {
    console.error("[orders] save failed", e);
    return NextResponse.json({ ok: false, error: "Could not save order. Please try again." }, { status: 500 });
  }

  // Customer receipt + owner alert. Failures are logged, never fatal to the order.
  await sendEmail(email, `Vanguard order ${order.id} received`, orderReceivedEmail(order));
  try { await notifyOwnerNewOrder(order); } catch (e) { console.error("[notify] owner alert failed", e); }

  const instructions = payment_method === "phone"
    ? `Order ${order.id} saved. Call ${process.env.PAYMENT_PHONE ?? "our team (number on your confirmation email)"} to arrange payment — reference your order number. Nothing ships until payment is confirmed.`
    : `Order ${order.id} saved. An invoice with bank wire/ACH instructions is on its way to ${email}. Nothing ships until payment is verified by our team.`;

  return NextResponse.json({ ok: true, orderId: order.id, total, settlement: { method: payment_method, instructions } });
}
