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

function evidenceLink(orderId: string, reference: string) {
  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  if (!/^https:\/\//i.test(site)) return "";
  const href = `${site}/payment-evidence?order=${encodeURIComponent(orderId)}&ref=${encodeURIComponent(reference)}`;
  return `<p><a href="${escapeHtml(href)}" style="display:inline-block;background:#E8A93B;color:#0B0718;text-decoration:none;font-weight:800;padding:10px 14px;border-radius:8px">Submit payment evidence securely</a></p>`;
}

export function orderReceivedEmail(order: {
  id: string;
  total: number;
  payment_method: string;
  payment_reference: string;
}) {
  const id = escapeHtml(order.id);
  const reference = escapeHtml(order.payment_reference);
  const payment = order.payment_method === "phone"
    ? `Contact Vanguard using the payment instructions provided for your approved order and quote payment reference <b>${reference}</b>.`
    : `Bank wire or ACH instructions will be provided after review. Put only payment reference <b>${reference}</b> in the transfer reference/memo field unless your bank requires additional information.`;
  return wrap(`Order ${order.id} received`,
    `<p>Your order request has been saved and is <b>awaiting payment confirmation</b>.</p>
     <p><b>Order reference:</b> ${id}<br/><b>Payment reference:</b> ${reference}<br/><b>Order total (list): $${order.total.toFixed(2)}</b></p>
     <p>${payment}</p>
     <p>The payment reference is an opaque reconciliation code. Vanguard retains the complete itemized order in its internal records. Use only payment methods explicitly approved for this business transaction.</p>
     ${evidenceLink(order.id, order.payment_reference)}
     <p>Nothing ships until Vanguard verifies payment and availability. A screenshot or receipt upload may assist review but does not, by itself, mark an order paid.</p>`);
}

export function paymentConfirmedEmail(order: {
  id: string;
  payment_reference?: string;
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
     <p>A separate update follows as soon as a trusted shipping integration reports the carrier and tracking number.</p>`);
}

export function orderShippedEmail(order: {
  id: string;
  carrier?: string;
  tracking_number?: string;
  tracking_url?: string;
}) {
  const carrier = order.carrier ? escapeHtml(order.carrier) : "Carrier on file";
  const tracking = order.tracking_number ? escapeHtml(order.tracking_number) : "Tracking pending";
  const link = order.tracking_url && /^https:\/\//i.test(order.tracking_url)
    ? `<p><a href="${escapeHtml(order.tracking_url)}" style="color:#E8A93B">Track shipment</a></p>`
    : "";
  return wrap(`Order ${order.id} — shipped`,
    `<p>Your Vanguard order has been marked <b>shipped</b>.</p>
     <p><b>Carrier:</b> ${carrier}<br/><b>Tracking:</b> ${tracking}</p>${link}
     <p>Keep the order number for delivery questions and inspect the package promptly on arrival.</p>`);
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
