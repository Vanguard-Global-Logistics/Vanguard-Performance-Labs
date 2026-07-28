// Transactional email delivery through Resend. Production order and inquiry routes
// refuse acceptance when required email configuration is absent.

export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM ?? "Vanguard Performance Labs <orders@vanguardperformancelabs.com>";
  if (!key) {
    console.log("[email:DEV noop]", { to, subject });
    return false;
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, html }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) console.error("[email] Resend rejected message", response.status, await response.text());
    return response.ok;
  } catch (error) {
    console.error("[email] delivery failed", error);
    return false;
  }
}

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
}[character] ?? character));

const wrap = (title: string, body: string) => `
<div style="background:#050510;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#0B0718;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:28px">
    <div style="font-size:18px;font-weight:900;letter-spacing:.05em;background:linear-gradient(180deg,#F8DFA0,#E8A93B);-webkit-background-clip:text;color:#E8A93B">VANGUARD</div>
    <div style="font-size:9px;letter-spacing:.3em;color:#9A8FC0;margin-bottom:18px">PERFORMANCE LABS</div>
    <h1 style="font-size:18px;color:#F2ECFF;margin:0 0 12px">${escapeHtml(title)}</h1>
    <div style="font-size:14px;line-height:1.6;color:#C9C2E0">${body}</div>
    <p style="font-size:10px;color:#9A8FC0;margin-top:22px">Research use only. Not for human consumption. This message relates to a business order.</p>
  </div>
</div>`;

export function orderReceivedEmail(order: { id: string; total: number; payment_method: string }) {
  const id = escapeHtml(order.id);
  const payment = order.payment_method === "phone"
    ? `Call us at <b>${escapeHtml(process.env.PAYMENT_PHONE ?? "the phone number on your invoice")}</b> and reference order <b>${id}</b>.`
    : `Bank wire or ACH instructions will be provided after review. Reference order <b>${id}</b> on the transfer.`;
  return wrap(`Order ${order.id} received`,
    `<p>Your order request has been saved and is <b>awaiting payment confirmation</b>.</p>
     <p><b>Order total (list): $${order.total.toFixed(2)}</b></p><p>${payment}</p>
     <p>Nothing ships until Vanguard verifies payment and availability. An unpaid request can be cancelled before payment.</p>`);
}

export function paymentConfirmedEmail(order: {
  id: string;
  fulfillment: string;
  shipping?: { name?: string; line1?: string; line2?: string; city?: string; state?: string; zip?: string };
}) {
  if (order.fulfillment === "willcall") {
    const address = escapeHtml(process.env.WILLCALL_ADDRESS ?? "Pickup details will be provided by the Vanguard team.");
    return wrap(`Order ${order.id} — payment confirmed`,
      `<p>Payment is confirmed. Your order is being prepared for <b>will-call pickup</b>.</p>
       <p><b>Pickup information:</b><br/>${address}</p>
       <p>Wait for the ready-for-pickup confirmation before traveling. Bring the order number and appropriate business identification.</p>`);
  }
  const shipping = order.shipping ?? {};
  const address = [shipping.name, shipping.line1, shipping.line2, [shipping.city, shipping.state, shipping.zip].filter(Boolean).join(", ")]
    .filter(Boolean).map((value) => escapeHtml(String(value))).join("<br/>");
  return wrap(`Order ${order.id} — payment confirmed`,
    `<p>Payment is confirmed and the order has entered the <b>shipping preparation</b> workflow.</p>
     <p><b>Shipping to:</b><br/>${address || "Address on file"}</p>
     <p>Cold-chain packaging is used where required. A separate update follows when the order is marked shipped.</p>`);
}

export function orderShippedEmail(order: { id: string }) {
  return wrap(`Order ${order.id} — shipped`,
    `<p>Your Vanguard order has been marked <b>shipped</b>.</p>
     <p>Carrier or tracking details are provided separately when available. Keep the order number for any delivery question and inspect the package promptly on arrival.</p>`);
}

export function orderCompletedEmail(order: { id: string; fulfillment: string }) {
  const wording = order.fulfillment === "willcall" ? "pickup workflow" : "shipping workflow";
  return wrap(`Order ${order.id} — completed`,
    `<p>Vanguard has marked this business order <b>completed</b> after the ${wording}.</p>
     <p>Keep the order number with the applicable research and batch documentation. Contact Vanguard promptly if the record does not match the material received.</p>`);
}

export function orderCancelledEmail(order: { id: string }) {
  return wrap(`Order ${order.id} — cancelled`,
    `<p>The unpaid order request has been marked <b>cancelled</b> and will not be released for fulfillment.</p>
     <p>Contact Vanguard and reference the order number when a correction or replacement request is needed.</p>`);
}
