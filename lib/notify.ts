// Owner alerts on new orders: email + optional SMS. Both are environment-gated.
// Notification failure never changes whether an already-persisted order exists.

import { sendEmail } from "@/lib/email";
import type { Order } from "@/lib/orders-store";

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
}[character] ?? character));

async function sendSMS(body: string): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  const to = process.env.OWNER_PHONE;
  if (!sid || !token || !from || !to) {
    console.log("[sms:DEV noop]", body.slice(0, 120));
    return false;
  }
  try {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: from, To: to, Body: body.slice(0, 320) }),
      signal: AbortSignal.timeout(10000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function notifyOwnerNewOrder(order: Order): Promise<void> {
  const items = order.lines.map((line) => `${line.name} x${line.qty}`).join(", ");
  const fulfillment = order.fulfillment === "willcall" ? "WILL CALL" : "SHIP";
  const payment = order.payment_method === "phone" ? "PHONE PAYMENT" : "WIRE/ACH";
  const adminUrl = `${(process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "")}/admin`;

  await sendSMS(
    `VANGUARD ORDER ${order.id}\n$${order.total.toFixed(2)} · ${fulfillment} · ${payment}\n${order.company}\n${items}\nReview + confirm payment: ${adminUrl}`,
  );

  const owner = process.env.OWNER_EMAIL;
  if (!owner) return;

  const rows = order.lines.map((line) =>
    `<tr><td style="padding:6px 10px;border-bottom:1px solid #241a3a;color:#F2ECFF"><b>${escapeHtml(line.name)}</b></td>
     <td style="padding:6px 10px;border-bottom:1px solid #241a3a;color:#C9C2E0;text-align:center">x${line.qty}</td>
     <td style="padding:6px 10px;border-bottom:1px solid #241a3a;color:#C9C2E0;text-align:right">$${(line.qty * line.unit).toFixed(2)}</td></tr>`,
  ).join("");

  const shippingLines = [
    order.shipping?.name,
    order.shipping?.line1,
    order.shipping?.line2,
    [order.shipping?.city, order.shipping?.state, order.shipping?.zip].filter(Boolean).join(", "),
  ].filter(Boolean).map((value) => escapeHtml(String(value)));

  const shipping = order.fulfillment === "willcall"
    ? "<b>WILL CALL</b> — hold for pickup after payment confirmation."
    : `<b>SHIP TO:</b><br/>${shippingLines.join("<br/>")}`;

  await sendEmail(
    owner,
    `New order ${order.id} — $${order.total.toFixed(2)} — ${order.company}`,
    `<div style="background:#050510;padding:28px 16px;font-family:Arial,Helvetica,sans-serif">
      <div style="max-width:620px;margin:0 auto;background:#0B0718;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:24px">
        <div style="font-size:11px;letter-spacing:.25em;color:#E8A93B">VANGUARD · NEW ORDER</div>
        <h1 style="font-size:20px;color:#F2ECFF;margin:8px 0">${escapeHtml(order.id)} — $${order.total.toFixed(2)}</h1>
        <p style="color:#C9C2E0;font-size:14px;margin:0 0 4px"><b>${escapeHtml(order.company)}</b>${order.contact ? ` · ${escapeHtml(order.contact)}` : ""}</p>
        <p style="color:#9A8FC0;font-size:13px;margin:0 0 14px">${escapeHtml(order.email)}${order.phone ? ` · ${escapeHtml(order.phone)}` : ""} · Payment: <b style="color:#c084fc">${payment}</b></p>
        <table style="width:100%;border-collapse:collapse;margin:12px 0">${rows}</table>
        <p style="color:#C9C2E0;font-size:13px;line-height:1.6">${shipping}</p>
        ${order.notes ? `<p style="color:#9A8FC0;font-size:12px;font-style:italic">Notes: ${escapeHtml(order.notes)}</p>` : ""}
        <p style="margin-top:18px"><a href="${escapeHtml(adminUrl)}" style="background:linear-gradient(135deg,#c084fc,#7c3aed);color:#050510;font-weight:800;font-size:13px;text-decoration:none;padding:11px 18px;border-radius:9px;display:inline-block">Open Order Board → Confirm Payment</a></p>
        <p style="color:#9A8FC0;font-size:11px;margin-top:14px">Status: <b style="color:#FFB830">AWAITING PAYMENT</b>. Verify payment before releasing fulfillment.</p>
      </div>
    </div>`,
  );
}
