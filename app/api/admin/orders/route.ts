import { NextResponse } from "next/server";
import { getOrder, listOrders, updateOrder } from "@/lib/orders-store";
import {
  orderCancelledEmail,
  orderCompletedEmail,
  orderShippedEmail,
  paymentConfirmedEmail,
  sendEmail,
} from "@/lib/email";

function authed(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  return req.headers.get("authorization") === `Bearer ${token}`;
}

async function customerUpdate(email: string, subject: string, html: string) {
  const delivered = await sendEmail(email, subject, html);
  if (!delivered) console.error("[admin orders] customer status email failed", { email, subject });
}

export async function GET(req: Request) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true, orders: await listOrders() });
}

export async function POST(req: Request) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

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
      const updated = await updateOrder(order.id, { status: "payment_confirmed" });
      if (!updated) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });

      if (order.fulfillment === "ship" && process.env.SHIPPING_WEBHOOK_URL) {
        try {
          const response = await fetch(process.env.SHIPPING_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ event: "order.release_to_shipping", order: updated }),
            signal: AbortSignal.timeout(12000),
          });
          if (!response.ok) console.error("[shipping webhook] rejected release", response.status, await response.text());
        } catch (error) {
          console.error("[shipping webhook] release failed", error);
        }
      }

      await customerUpdate(order.email, `Vanguard order ${order.id} — payment confirmed`, paymentConfirmedEmail(order));
      return NextResponse.json({ ok: true, order: updated });
    }

    case "mark_shipped": {
      if (order.status !== "payment_confirmed" || order.fulfillment !== "ship") {
        return NextResponse.json({ ok: false, error: "Only a paid shipping order can be marked shipped." }, { status: 409 });
      }
      const updated = await updateOrder(order.id, { status: "shipped" });
      if (!updated) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });
      await customerUpdate(order.email, `Vanguard order ${order.id} — shipped`, orderShippedEmail(order));
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
      await customerUpdate(order.email, `Vanguard order ${order.id} — completed`, orderCompletedEmail(order));
      return NextResponse.json({ ok: true, order: updated });
    }

    case "cancel": {
      if (order.status !== "pending_payment") {
        return NextResponse.json({ ok: false, error: "Only an unpaid order request can be cancelled in the website board." }, { status: 409 });
      }
      const updated = await updateOrder(order.id, { status: "cancelled" });
      if (!updated) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });
      await customerUpdate(order.email, `Vanguard order ${order.id} — cancelled`, orderCancelledEmail(order));
      return NextResponse.json({ ok: true, order: updated });
    }

    default:
      return NextResponse.json({ ok: false, error: "unknown_action" }, { status: 400 });
  }
}
