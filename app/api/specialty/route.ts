import { NextResponse } from "next/server";
import { protectPublicMutation } from "@/lib/security-guard";
import { sendEmail } from "@/lib/email";

const production = () => process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
const clean = (value: unknown, max = 500) => String(value ?? "").trim().slice(0, max);
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
}[character] ?? character));

function productionReady() {
  return Boolean(
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.RESEND_API_KEY &&
    process.env.ORDER_EMAIL_FROM &&
    process.env.OWNER_EMAIL,
  );
}

async function saveRequest(record: Record<string, unknown>) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    if (production()) throw new Error("Specialty request persistence is not configured.");
    console.log("[specialty:dev]", record);
    return;
  }
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/specialty_requests`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(record),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Supabase specialty save failed: ${response.status} ${await response.text()}`);
}

export async function POST(req: Request) {
  const blocked = protectPublicMutation(req, "specialty", {
    perMinute: 3,
    burst: 1,
    perHour: 12,
    maxBodyBytes: 48 * 1024,
  });
  if (blocked) return blocked;

  if (production() && !productionReady()) {
    return NextResponse.json({
      ok: false,
      error: "Specialty sourcing requests are temporarily unavailable while Vanguard completes the secure request system. Please use the contact page for direct assistance.",
    }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: "Invalid request data." }, { status: 400 }); }

  if (Object.keys(body).length > 40) {
    return NextResponse.json({ ok: false, error: "Request contains too many fields." }, { status: 422 });
  }

  const company = clean(body.company, 160);
  const contactName = clean(body.contact, 160);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);
  const compound = clean(body.compound, 200);
  const cas = clean(body.cas, 120);
  const quantity = clean(body.quantity, 200);
  const purity = clean(body.purity, 160);
  const application = clean(body.application, 500);
  const timeline = clean(body.timeline, 160);
  const notes = clean(body.notes, 3000);

  if (!company || !contactName || !compound || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Company, contact name, compound, and a valid work email are required." }, { status: 422 });
  }
  if (body.ack !== true) {
    return NextResponse.json({ ok: false, error: "Research-use acknowledgment is required." }, { status: 422 });
  }

  const ref = `SPC-${Date.now().toString(36).toUpperCase()}`;
  const request = {
    id: ref,
    created_at: new Date().toISOString(),
    status: "new",
    company,
    contact_name: contactName,
    email,
    phone: phone || null,
    compound,
    cas_identifier: cas || null,
    quantity_spec: quantity || null,
    purity_requirement: purity || null,
    research_application: application || null,
    target_timeline: timeline || null,
    notes: notes || null,
  };

  try {
    await saveRequest(request);
  } catch (error) {
    console.error("[specialty] save failed", error);
    return NextResponse.json({ ok: false, error: "The sourcing request could not be saved securely. Please contact Vanguard directly." }, { status: 500 });
  }

  const rows = [
    ["Compound requested", compound],
    ["CAS / identifier", cas || "Not provided"],
    ["Quantity / vial size", quantity || "Not provided"],
    ["Purity requirement", purity || "Not provided"],
    ["Research application", application || "Not provided"],
    ["Target timeline", timeline || "Not provided"],
    ["Company", company],
    ["Contact", contactName],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Notes", notes || "Not provided"],
  ];

  const owner = process.env.OWNER_EMAIL!;
  const ownerDelivered = await sendEmail(
    owner,
    `Specialty sourcing request ${ref} — ${compound} — ${company}`,
    `<div style="background:#050510;padding:26px 16px;font-family:Arial,Helvetica,sans-serif">
      <div style="max-width:620px;margin:0 auto;background:#0B0718;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:24px">
        <div style="font-size:11px;letter-spacing:.25em;color:#E8A93B">VANGUARD · SPECIALTY REQUEST</div>
        <h1 style="font-size:19px;color:#F2ECFF;margin:8px 0 14px">${escapeHtml(ref)}</h1>
        <table style="width:100%;border-collapse:collapse">
          ${rows.map(([key, value]) => `<tr><td style="padding:6px 8px;border-bottom:1px solid #241a3a;color:#9A8FC0;font-size:12px;width:38%">${escapeHtml(key)}</td><td style="padding:6px 8px;border-bottom:1px solid #241a3a;color:#F2ECFF;font-size:13px">${escapeHtml(value)}</td></tr>`).join("")}
        </table>
        <p style="color:#9A8FC0;font-size:11px;margin-top:16px">Review before quoting. Decline controlled substances, scheduled compounds, and approved-drug APIs intended for human use.</p>
      </div>
    </div>`,
  );

  const customerDelivered = await sendEmail(
    email,
    `Vanguard specialty request ${ref} received`,
    `<div style="background:#050510;padding:28px 16px;font-family:Arial,Helvetica,sans-serif">
      <div style="max-width:560px;margin:0 auto;background:#0B0718;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:26px">
        <div style="font-size:18px;font-weight:900;color:#E8A93B">VANGUARD</div>
        <div style="font-size:9px;letter-spacing:.3em;color:#9A8FC0;margin-bottom:16px">PERFORMANCE LABS</div>
        <h1 style="font-size:17px;color:#F2ECFF;margin:0 0 12px">Request ${escapeHtml(ref)} received</h1>
        <p style="color:#C9C2E0;font-size:14px;line-height:1.6">We received your sourcing request for <b>${escapeHtml(compound)}</b>. The Vanguard team reviews every request individually and will respond with availability and pricing, or explain why the material cannot be sourced.</p>
        <p style="color:#9A8FC0;font-size:12px;line-height:1.6">This is a request for quotation only. It is not an order, a quote, or confirmation of availability. All materials are for laboratory research use by qualified businesses and institutions.</p>
      </div>
    </div>`,
  );

  if (!ownerDelivered || !customerDelivered) {
    console.error("[specialty] email delivery incomplete", { ref, ownerDelivered, customerDelivered });
  }

  return NextResponse.json({ ok: true, ref, customerEmailSent: customerDelivered });
}
