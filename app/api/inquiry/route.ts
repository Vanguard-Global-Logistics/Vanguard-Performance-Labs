import { NextResponse } from "next/server";
import { rateLimit, tooMany } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";

const ALLOWED_MODES = new Set(["information_request", "quote_only", "po_only", "invoice_only", "approved_checkout"]);
const production = () => process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
const ready = () => Boolean(
  process.env.SUPABASE_URL &&
  process.env.SUPABASE_SERVICE_ROLE_KEY &&
  process.env.RESEND_API_KEY &&
  process.env.OWNER_EMAIL,
);

const clean = (value: unknown, max = 500) => String(value ?? "").trim().slice(0, max);
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
}[character] ?? character));

async function saveInquiry(record: Record<string, unknown>) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    if (production()) throw new Error("Inquiry persistence is not configured.");
    console.log("[inquiry:dev]", record);
    return;
  }
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/inquiries`, {
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
  if (!response.ok) throw new Error(`Supabase inquiry save failed: ${response.status} ${await response.text()}`);
}

export async function POST(req: Request) {
  if (production() && !ready()) {
    return NextResponse.json({
      ok: false,
      error: "The secure inquiry system is temporarily unavailable. Please contact Vanguard directly using the business email listed on the site.",
    }, { status: 503 });
  }

  const limit = rateLimit(req, "inquiry", { perMinute: 5 });
  if (!limit.ok) return tooMany(limit.retryAfter);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid inquiry data." }, { status: 400 });
  }

  const company = clean(body.company, 160);
  const contactName = clean(body.name ?? body.contact, 160);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);
  const topic = clean(body.topic, 200);
  const product = clean(body.product, 200);
  const message = clean(body.message, 4000);
  const modeCandidate = clean(body.mode, 60);
  const mode = ALLOWED_MODES.has(modeCandidate) ? modeCandidate : "information_request";

  if (!company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Company or name and a valid email are required." }, { status: 422 });
  }

  const id = `VPL-I-${Date.now().toString(36).toUpperCase()}`;
  const payload = Object.fromEntries(Object.entries(body).map(([key, value]) => [key, clean(value, 500)]));
  const inquiry = {
    id,
    created_at: new Date().toISOString(),
    status: "new",
    mode,
    company,
    contact_name: contactName || null,
    email,
    phone: phone || null,
    topic: topic || null,
    product: product || null,
    message: message || null,
    payload,
  };

  try {
    await saveInquiry(inquiry);
  } catch (error) {
    console.error("[inquiry] save failed", error);
    return NextResponse.json({ ok: false, error: "Your inquiry could not be saved securely. Please try again or contact Vanguard directly." }, { status: 500 });
  }

  const owner = process.env.OWNER_EMAIL;
  if (owner) {
    const html = `
      <h2>New Vanguard inquiry ${escapeHtml(id)}</h2>
      <p><b>Mode:</b> ${escapeHtml(mode)}</p>
      <p><b>Company / name:</b> ${escapeHtml(company)}</p>
      <p><b>Contact:</b> ${escapeHtml(contactName || "Not provided")}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Phone:</b> ${escapeHtml(phone || "Not provided")}</p>
      <p><b>Topic:</b> ${escapeHtml(topic || "Not provided")}</p>
      <p><b>Product:</b> ${escapeHtml(product || "Not provided")}</p>
      <p><b>Message:</b><br/>${escapeHtml(message || "No message").replace(/\n/g, "<br/>")}</p>`;
    const delivered = await sendEmail(owner, `New Vanguard inquiry — ${company}`, html);
    if (!delivered) console.error("[inquiry] owner email delivery failed", { id });
  }

  return NextResponse.json({ ok: true, status: "received", inquiryId: id });
}
