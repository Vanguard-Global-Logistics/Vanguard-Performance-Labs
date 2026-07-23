import { NextResponse } from "next/server";
import { listOrders, getOrder, updateOrder } from "@/lib/orders-store";
import { sendEmail, paymentConfirmedEmail } from "@/lib/email";

// Owner-only order management. Auth: Authorization: Bearer <ADMIN_TOKEN>.
// Actions: confirm_payment (releases shipping webhook or will-call + emails customer),
// mark_shipped, complete, cancel.

function authed(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false; // no token configured -> admin disabled entirely
  return req.headers.get("authorization") === `Bearer ${token}`;
}

export async function GET(req: Request) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true, orders: await listOrders() });
}

export async function POST(req: Request) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { id?: string; action?: string };
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const order = body.id ? await getOrder(body.id) : null;
  if (!order) return NextResponse.json({ ok: false, error: "order_not_found" }, { status: 404 });

  switch (body.action) {
    case "confirm_payment": {
      if (order.status !== "pending_payment")
        return NextResponse.json({ ok: false, error: `Cannot confirm from status ${order.status}` }, { status: 409 });
      const updated = await updateOrder(order.id, { status: "payment_confirmed" });

      // Release to shipping app (generic webhook: Zapier -> ShipStation/Shippo/etc.)
      if (order.fulfillment === "ship" && process.env.SHIPPING_WEBHOOK_URL) {
        try {
          await fetch(process.env.SHIPPING_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ event: "order.release_to_shipping", order: updated }),
          });
        } catch (e) { console.error("[shipping webhook] failed", e); }
      }
      await sendEmail(order.email, `Vanguard order ${order.id} — payment confirmed`, paymentConfirmedEmail(order));
      return NextResponse.json({ ok: true, order: updated });
    }
    case "mark_shipped": {
      const updated = await updateOrder(order.id, { status: "shipped" });
      return NextResponse.json({ ok: true, order: updated });
    }
    case "complete": {
      const updated = await updateOrder(order.id, { status: "completed" });
      return NextResponse.json({ ok: true, order: updated });
    }
    case "cancel": {
      const updated = await updateOrder(order.id, { status: "cancelled" });
      return NextResponse.json({ ok: true, order: updated });
    }
    default:
      return NextResponse.json({ ok: false, error: "unknown_action" }, { status: 400 });
  }
}
