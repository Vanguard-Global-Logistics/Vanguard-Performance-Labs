import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getOrderByPaymentReference, updateOrder } from "@/lib/orders-store";
import { paymentConfirmedEmail, sendEmail } from "@/lib/email";
import { rateLimit, tooMany } from "@/lib/rate-limit";

function validSignature(raw: string, supplied: string | null) {
  const secret = process.env.PAYMENT_CONFIRMATION_WEBHOOK_SECRET;
  if (!secret || !supplied) return false;
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied.replace(/^sha256=/i, ""));
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const limit = rateLimit(req, "payment-confirmed-webhook", { perMinute: 30, burst: 10 });
  if (!limit.ok) return tooMany(limit.retryAfter);

  const raw = await req.text();
  if (!validSignature(raw, req.headers.get("x-vpl-signature"))) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: {
    paymentReference?: string;
    amount?: number;
    provider?: string;
    transactionId?: string;
  };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const reference = String(body.paymentReference ?? "").trim().toUpperCase().slice(0, 80);
  const amount = Number(body.amount);
  const provider = String(body.provider ?? "trusted-ledger").trim().slice(0, 80);
  const transactionId = String(body.transactionId ?? "").trim().slice(0, 160);
  if (!reference || !Number.isFinite(amount) || amount <= 0 || !transactionId) {
    return NextResponse.json({ ok: false, error: "invalid_confirmation" }, { status: 422 });
  }

  const order = await getOrderByPaymentReference(reference);
  if (!order) return NextResponse.json({ ok: false, error: "order_not_found" }, { status: 404 });
  if (order.status !== "pending_payment") {
    return NextResponse.json({ ok: true, status: order.status, idempotent: true });
  }

  // Never release an order on a partial or mismatched amount.
  if (Math.abs(Number(order.total) - amount) > 0.005) {
    console.warn("[payment-confirmed] amount mismatch", { orderId: order.id, reference, expected: order.total, received: amount });
    return NextResponse.json({ ok: false, error: "amount_mismatch" }, { status: 409 });
  }

  const updated = await updateOrder(order.id, {
    status: "payment_confirmed",
    payment_confirmed_at: new Date().toISOString(),
    payment_confirmation_source: `${provider}:${transactionId}`,
    payment_evidence_status: order.payment_evidence_status === "submitted" ? "verified" : order.payment_evidence_status,
  });
  if (!updated) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });

  await sendEmail(order.email, `Vanguard order ${order.id} — payment confirmed`, paymentConfirmedEmail(updated));

  if (updated.fulfillment === "ship" && process.env.SHIPPING_WEBHOOK_URL) {
    try {
      const release = await fetch(process.env.SHIPPING_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.SHIPPING_RELEASE_TOKEN ? { Authorization: `Bearer ${process.env.SHIPPING_RELEASE_TOKEN}` } : {}),
        },
        body: JSON.stringify({
          event: "order.release_to_shipping",
          orderId: updated.id,
          shipping: updated.shipping,
          paymentReference: updated.payment_reference,
        }),
        signal: AbortSignal.timeout(12000),
      });
      if (!release.ok) console.error("[shipping release] rejected", release.status, (await release.text()).slice(0, 300));
    } catch (error) {
      console.error("[shipping release] failed", error);
    }
  }

  return NextResponse.json({ ok: true, orderId: updated.id, status: updated.status });
}
