import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getOrder, updateOrder } from "@/lib/orders-store";
import { orderShippedEmail, sendEmail } from "@/lib/email";
import { rateLimit, tooMany } from "@/lib/rate-limit";

function validSignature(raw: string, supplied: string | null) {
  const secret = process.env.SHIPPING_WEBHOOK_SECRET;
  if (!secret || !supplied) return false;
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied.replace(/^sha256=/i, ""));
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const limit = rateLimit(req, "shipping-status-webhook", { perMinute: 30, burst: 10 });
  if (!limit.ok) return tooMany(limit.retryAfter);

  const raw = await req.text();
  if (!validSignature(raw, req.headers.get("x-vpl-signature"))) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: {
    orderId?: string;
    carrier?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    event?: string;
  };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const orderId = String(body.orderId ?? "").trim().slice(0, 80);
  const carrier = String(body.carrier ?? "").trim().slice(0, 80);
  const trackingNumber = String(body.trackingNumber ?? "").trim().slice(0, 160);
  const trackingUrl = String(body.trackingUrl ?? "").trim().slice(0, 500);
  if (!orderId || !carrier || !trackingNumber) {
    return NextResponse.json({ ok: false, error: "tracking_fields_required" }, { status: 422 });
  }
  if (trackingUrl && !/^https:\/\//i.test(trackingUrl)) {
    return NextResponse.json({ ok: false, error: "invalid_tracking_url" }, { status: 422 });
  }

  const order = await getOrder(orderId);
  if (!order) return NextResponse.json({ ok: false, error: "order_not_found" }, { status: 404 });
  if (order.status === "shipped" || order.status === "completed") {
    return NextResponse.json({ ok: true, status: order.status, idempotent: true });
  }
  if (order.status !== "payment_confirmed" || order.fulfillment !== "ship") {
    return NextResponse.json({ ok: false, error: "order_not_releasable" }, { status: 409 });
  }

  const updated = await updateOrder(order.id, {
    status: "shipped",
    carrier,
    tracking_number: trackingNumber,
    tracking_url: trackingUrl || undefined,
    shipped_at: new Date().toISOString(),
  });
  if (!updated) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });

  await sendEmail(order.email, `Vanguard order ${order.id} — shipped`, orderShippedEmail(updated));
  return NextResponse.json({ ok: true, orderId: updated.id, status: updated.status });
}
