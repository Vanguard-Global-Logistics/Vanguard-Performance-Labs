import { NextResponse } from "next/server";
import { adminAuthorized } from "@/lib/admin-auth";
import { rateLimit, tooMany } from "@/lib/rate-limit";
import { getOrder, listOrders, updateOrder } from "@/lib/orders-store";
import {
  orderCancelledEmail,
  orderCompletedEmail,
  orderShippedEmail,
  paymentConfirmedEmail,
  sendEmail,
} from "@/lib/email";
import { releaseOrderToShipping } from "@/lib/shipping-release";

async function customerUpdate(email: string, subject: string, html: string) {
  const delivered = await sendEmail(email, subject, html);
  if (!delivered) console.error("[admin orders] customer status email failed", { email, subject });
}

export async function GET(req: Request) {
  const limit = rateLimit(req, "admin-orders-read", { perMinute: 30 });
  if (!limit.ok) return tooMany(limit.retryAfter);
  if (!adminAuthorized(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true, orders: await listOrders() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const limit = rateLimit(req, "admin-orders-write", { perMinute: 12 });
  if (!limit.ok) return tooMany(limit.retryAfter);
  if (!adminAuthorized(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let body: { id?: string; action?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 }); }

  const order = body.id ? await getOrder(body.id) : null;
  if (!order) return NextResponse.json({ ok: false, error: "order_not_found" }, { status: 404 });

  switch (body.action) {
    case "confirm_payment": {
      if (order.status !== "pending_payment") {
        return NextResponse.json({ ok: false, error: `Payment cannot be confirmed from status ${order.status}.` }, { status: 409 });
      }
      const updated = await updateOrder(order.id, {
        status: "payment_confirmed",
        payment_confirmed_at: new Date().toISOString(),
        payment_confirmation_source: "admin:manual-confirmation",
        payment_evidence_status: order.payment_evidence_status === "submitted" ? "verified" : order.payment_evidence_status,
      });
      if (!updated) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });

      await releaseOrderToShipping(updated);
      await customerUpdate(updated.email, `Vanguard order ${updated.id} — payment confirmed`, paymentConfirmedEmail(updated));
      return NextResponse.json({ ok: true, order: updated });
    }

    case "mark_shipped": {
      if (order.status !== "payment_confirmed" || order.fulfillment !== "ship") {
        return NextResponse.json({ ok: false, error: "Only a paid shipping order can be marked shipped." }, { status: 409 });
      }
      const updated = await updateOrder(order.id, {
        status: "shipped",
        shipped_at: new Date().toISOString(),
      });
      if (!updated) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });
      await customerUpdate(updated.email, `Vanguard order ${updated.id} — shipped`, orderShippedEmail(updated));
      return NextResponse.json({ ok: true, order: updated });
    }

    case "complete": {
      const allowed = order.fulfillment === "willcall"
        ? order.status === "payment_confirmed"
        : order.status === "shipped";
      if (!allowed) {
        return NextResponse.json({ ok: false, error: "The order has not reached a completable status." }, { status: 409 });
      }
      const updated = await updateOrder(order.id, { status: "completed" });
      if (!updated) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });
      await customerUpdate(updated.email, `Vanguard order ${updated.id} — completed`, orderCompletedEmail(updated));
      return NextResponse.json({ ok: true, order: updated });
    }

    case "cancel": {
      if (order.status !== "pending_payment") {
        return NextResponse.json({ ok: false, error: "Only an unpaid order request can be cancelled in the website board." }, { status: 409 });
      }
      const updated = await updateOrder(order.id, { status: "cancelled" });
      if (!updated) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });
      await customerUpdate(updated.email, `Vanguard order ${updated.id} — cancelled`, orderCancelledEmail(updated));
      return NextResponse.json({ ok: true, order: updated });
    }

    default:
      return NextResponse.json({ ok: false, error: "unknown_action" }, { status: 400 });
  }
}
