import { NextResponse } from "next/server";
import { rateLimit, tooMany } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";

// Specialty sourcing requests. NEVER auto-quotes and NEVER confirms availability —
// every request is reviewed and priced by a human. Requests for controlled
// substances or approved-drug APIs are declined at review.

export async function POST(req: Request) {
  const rl = rateLimit(req, "specialty", { perMinute: 3 });
  if (!rl.ok) return tooMany(rl.retryAfter);

  let b: Record<string, string | boolean>;
  try { b = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const company = String(b.company ?? "").trim();
  const email = String(b.email ?? "").trim();
  const compound = String(b.compound ?? "").trim();
  if (!company || !compound || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Company, compound, and a valid work email are required." }, { status: 422 });
  }
  if (b.ack !== true) {
    return NextResponse.json({ ok: false, error: "Research-use acknowledgment is required." }, { status: 422 });
  }

  const ref = `SPC-${Date.now().toString(36).toUpperCase()}`;
  const rows = [
    ["Compound requested", compound],
    ["CAS / identifier", String(b.cas ?? "—")],
    ["Quantity / vial size", String(b.quantity ?? "—")],
    ["Purity requirement", String(b.purity ?? "—")],
    ["Research application", String(b.application ?? "—")],
    ["Target timeline", String(b.timeline ?? "—")],
    ["Company", company],
    ["Contact", String(b.contact ?? "—")],
    ["Email", email],
    ["Phone", String(b.phone ?? "—")],
    ["Notes", String(b.notes ?? "—")],
  ];

  const owner = process.env.OWNER_EMAIL;
  if (owner) {
    await sendEmail(
      owner,
      `🧪 Specialty sourcing request ${ref} — ${compound} — ${company}`,
      `<div style="background:#050510;padding:26px 16px;font-family:Arial,Helvetica,sans-serif">
        <div style="max-width:620px;margin:0 auto;background:#0B0718;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:24px">
          <div style="font-size:11px;letter-spacing:.25em;color:#E8A93B">VANGUARD · SPECIALTY REQUEST</div>
          <h1 style="font-size:19px;color:#F2ECFF;margin:8px 0 14px">${ref}</h1>
          <table style="width:100%;border-collapse:collapse">
            ${rows.map(([k, v]) => `<tr><td style="padding:6px 8px;border-bottom:1px solid #241a3a;color:#9A8FC0;font-size:12px;width:38%">${k}</td><td style="padding:6px 8px;border-bottom:1px solid #241a3a;color:#F2ECFF;font-size:13px">${v}</td></tr>`).join("")}
          </table>
          <p style="color:#9A8FC0;font-size:11px;margin-top:16px">Review before quoting. Decline controlled substances, scheduled compounds, and approved-drug APIs intended for human use.</p>
        </div>
      </div>`
    );
  }

  await sendEmail(
    email,
    `Vanguard specialty request ${ref} received`,
    `<div style="background:#050510;padding:28px 16px;font-family:Arial,Helvetica,sans-serif">
      <div style="max-width:560px;margin:0 auto;background:#0B0718;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:26px">
        <div style="font-size:18px;font-weight:900;color:#E8A93B">VANGUARD</div>
        <div style="font-size:9px;letter-spacing:.3em;color:#9A8FC0;margin-bottom:16px">PERFORMANCE LABS</div>
        <h1 style="font-size:17px;color:#F2ECFF;margin:0 0 12px">Request ${ref} received</h1>
        <p style="color:#C9C2E0;font-size:14px;line-height:1.6">Thank you — we've received your sourcing request for <b>${compound}</b>. Our team reviews each request individually and will respond with availability and pricing, or let you know if we're unable to source it.</p>
        <p style="color:#9A8FC0;font-size:12px;line-height:1.6">This is a request for quotation only. It is not an order, a quote, or a confirmation of availability. All materials are supplied for laboratory research use by qualified businesses and institutions.</p>
      </div>
    </div>`
  );

  console.log("[specialty]", ref, compound, company);
  return NextResponse.json({ ok: true, ref });
}
