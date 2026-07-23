// Customer email via Resend (one env var). Graceful no-op without a key — logs instead,
// so the flow works in dev and never blocks an order.

export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM ?? "Vanguard Performance Labs <orders@vanguardperformancelabs.com>";
  if (!key) {
    console.log("[email:DEV noop]", { to, subject });
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, html }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const wrap = (title: string, body: string) => `
<div style="background:#050510;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#0B0718;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:28px">
    <div style="font-size:18px;font-weight:900;letter-spacing:.05em;background:linear-gradient(180deg,#F8DFA0,#E8A93B);-webkit-background-clip:text;color:#E8A93B">VANGUARD</div>
    <div style="font-size:9px;letter-spacing:.3em;color:#9A8FC0;margin-bottom:18px">PERFORMANCE LABS</div>
    <h1 style="font-size:18px;color:#F2ECFF;margin:0 0 12px">${title}</h1>
    <div style="font-size:14px;line-height:1.6;color:#C9C2E0">${body}</div>
    <p style="font-size:10px;color:#9A8FC0;margin-top:22px">Research use only. Not for human consumption. This message relates to a business order.</p>
  </div>
</div>`;

export function orderReceivedEmail(o: { id: string; total: number; payment_method: string }) {
  const pay = o.payment_method === "phone"
    ? `Call us at <b>${process.env.PAYMENT_PHONE ?? "(phone on your invoice)"}</b> to arrange payment. Reference order <b>${o.id}</b>.`
    : `An invoice with bank wire / ACH instructions will be emailed shortly. Reference order <b>${o.id}</b> on your transfer.`;
  return wrap(`Order ${o.id} received`,
    `<p>Thank you — your order request has been saved and is <b>awaiting payment confirmation</b>.</p>
     <p><b>Order total (list): $${o.total.toFixed(2)}</b></p><p>${pay}</p>
     <p>Nothing ships until our team verifies payment. You can cancel at no cost any time before payment.</p>`);
}

export function paymentConfirmedEmail(o: { id: string; fulfillment: string; shipping?: { name?: string; line1?: string; line2?: string; city?: string; state?: string; zip?: string } }) {
  if (o.fulfillment === "willcall") {
    const addr = process.env.WILLCALL_ADDRESS ?? "Pickup address will be provided by our team.";
    return wrap(`Order ${o.id} — payment confirmed, ready for pickup`,
      `<p>Payment is confirmed. Your order is being prepared for <b>will-call pickup</b>.</p>
       <p><b>Pickup location:</b><br/>${addr}</p>
       <p>Bring your order number and a business ID. Cold-chain items are held refrigerated until pickup.</p>`);
  }
  const s = o.shipping ?? {};
  const addr = [s.name, s.line1, s.line2, [s.city, s.state, s.zip].filter(Boolean).join(", ")].filter(Boolean).join("<br/>");
  return wrap(`Order ${o.id} — payment confirmed, shipping`,
    `<p>Payment is confirmed and your order has been <b>released for shipping</b>.</p>
     <p><b>Shipping to:</b><br/>${addr || "Address on file"}</p>
     <p>Cold-chain packaging is used where required. Tracking details follow once the carrier scans the package.</p>`);
}
