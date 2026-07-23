// Owner alerts on new orders: email + SMS. Both env-gated and fail-safe —
// a notification failure must NEVER block an order from saving.

import { sendEmail } from "@/lib/email";
import type { Order } from "@/lib/orders-store";

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
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: from, To: to, Body: body.slice(0, 320) }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function notifyOwnerNewOrder(o: Order): Promise<void> {
  const items = o.lines.map((l) => `${l.name} x${l.qty}`).join(", ");
  const fulfil = o.fulfillment === "willcall" ? "WILL CALL" : "SHIP";
  const pay = o.payment_method === "phone" ? "PHONE PAYMENT" : "WIRE/ACH";

  // SMS — short and actionable
  await sendSMS(
    `VANGUARD ORDER ${o.id}\n$${o.total.toFixed(2)} · ${fulfil} · ${pay}\n${o.company}\n${items}\nPull stock + confirm payment: ${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/admin`
  );

  // Email — full pick list
  const owner = process.env.OWNER_EMAIL;
  if (!owner) return;
  const rows = o.lines
    .map(
      (l) =>
        `<tr><td style="padding:6px 10px;border-bottom:1px solid #241a3a;color:#F2ECFF"><b>${l.name}</b></td>
         <td style="padding:6px 10px;border-bottom:1px solid #241a3a;color:#C9C2E0;text-align:center">x${l.qty}</td>
         <td style="padding:6px 10px;border-bottom:1px solid #241a3a;color:#C9C2E0;text-align:right">$${(l.qty * l.unit).toFixed(2)}</td></tr>`
    )
    .join("");
  const ship =
    o.fulfillment === "willcall"
      ? "<b>WILL CALL</b> — hold for pickup (refrigerated)."
      : `<b>SHIP TO:</b><br/>${[o.shipping?.name, o.shipping?.line1, o.shipping?.line2, [o.shipping?.city, o.shipping?.state, o.shipping?.zip].filter(Boolean).join(", ")].filter(Boolean).join("<br/>")}`;

  await sendEmail(
    owner,
    `🔔 New order ${o.id} — $${o.total.toFixed(2)} — ${o.company}`,
    `<div style="background:#050510;padding:28px 16px;font-family:Arial,Helvetica,sans-serif">
      <div style="max-width:620px;margin:0 auto;background:#0B0718;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:24px">
        <div style="font-size:11px;letter-spacing:.25em;color:#E8A93B">VANGUARD · NEW ORDER</div>
        <h1 style="font-size:20px;color:#F2ECFF;margin:8px 0">${o.id} — $${o.total.toFixed(2)}</h1>
        <p style="color:#C9C2E0;font-size:14px;margin:0 0 4px"><b>${o.company}</b>${o.contact ? ` · ${o.contact}` : ""}</p>
        <p style="color:#9A8FC0;font-size:13px;margin:0 0 14px">${o.email}${o.phone ? ` · ${o.phone}` : ""} · Payment: <b style="color:#c084fc">${pay}</b></p>
        <table style="width:100%;border-collapse:collapse;margin:12px 0">${rows}</table>
        <p style="color:#C9C2E0;font-size:13px;line-height:1.6">${ship}</p>
        ${o.notes ? `<p style="color:#9A8FC0;font-size:12px;font-style:italic">Notes: ${o.notes}</p>` : ""}
        <p style="margin-top:18px"><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/admin" style="background:linear-gradient(135deg,#c084fc,#7c3aed);color:#050510;font-weight:800;font-size:13px;text-decoration:none;padding:11px 18px;border-radius:9px;display:inline-block">Open Order Board → Confirm Payment</a></p>
        <p style="color:#9A8FC0;font-size:11px;margin-top:14px">Status: <b style="color:#FFB830">AWAITING PAYMENT</b>. Pull and pack stock now; release shipping after payment is verified.</p>
      </div>
    </div>`
  );
}
