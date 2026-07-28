import { NextResponse } from "next/server";
import { rateLimit, tooMany } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";

const ALLOWED_MODES = new Set([
  "information_request",
  "quote_only",
  "po_only",
  "invoice_only",
  "approved_checkout",
  "wholesale_application",
  "professional_inquiry",
  "partnership_inquiry",
  "demo_request",
]);
const production = () => process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
const ready = () => Boolean(
  process.env.SUPABASE_URL &&
  process.env.SUPABASE_SERVICE_ROLE_KEY &&
  process.env.RESEND_API_KEY &&
  process.env.OWNER_EMAIL,
);
const clean = (value: unknown, max = 500) => String(value ?? "").trim().slice(0, max);
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
}[character] ?? character));

async function supabaseWrite(path: string, body: unknown, prefer = "return=minimal") {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    if (production()) throw new Error("Supabase is not configured.");
    console.log("[supabase:dev]", { path, body });
    return;
  }
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: prefer,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Supabase write failed: ${response.status} ${await response.text()}`);
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
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: "Invalid inquiry data." }, { status: 400 }); }

  const company = clean(body.company, 160);
  const contactName = clean(body.name ?? body.contact ?? body.buyer_name, 160);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);
  const topic = clean(body.topic, 200);
  const source = clean(body.source, 120);
  const product = clean(body.product, 200);
  const message = clean(body.message ?? body.notes, 4000);
  const modeCandidate = clean(body.mode, 60);
  const mode = ALLOWED_MODES.has(modeCandidate) ? modeCandidate : "information_request";

  if (!company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Company or name and a valid email are required." }, { status: 422 });
  }

  const id = `VPL-I-${Date.now().toString(36).toUpperCase()}`;
  const payload = Object.fromEntries(Object.entries(body).map(([key, value]) => [key, clean(value, 1000)]));
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
    await supabaseWrite("inquiries", inquiry);
    if (topic.toLowerCase() === "newsletter" || source === "homepage_newsletter") {
      await supabaseWrite(
        "newsletter_subscribers?on_conflict=email",
        { email, status: "subscribed", source: source || "website" },
        "resolution=merge-duplicates,return=minimal",
      );
    }
  } catch (error) {
    console.error("[inquiry] save failed", error);
    return NextResponse.json({ ok: false, error: "Your request could not be saved securely. Please try again or contact Vanguard directly." }, { status: 500 });
  }

  const isNewsletter = topic.toLowerCase() === "newsletter" || source === "homepage_newsletter";
  const owner = process.env.OWNER_EMAIL;
  if (owner && !isNewsletter) {
    const detailRows = Object.entries(payload)
      .filter(([key]) => !["company", "email", "name", "contact", "buyer_name", "phone", "message", "notes", "mode"].includes(key))
      .filter(([, value]) => String(value).trim().length > 0)
      .slice(0, 20)
      .map(([key, value]) => `<tr><td style="padding:5px 8px;border-bottom:1px solid #241a3a;color:#9A8FC0;font-size:11px">${escapeHtml(key.replaceAll("_", " "))}</td><td style="padding:5px 8px;border-bottom:1px solid #241a3a;color:#F2ECFF;font-size:12px">${escapeHtml(String(value))}</td></tr>`)
      .join("");

    const html = `
      <div style="background:#050510;padding:26px 16px;font-family:Arial,Helvetica,sans-serif">
        <div style="max-width:620px;margin:0 auto;background:#0B0718;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:24px">
          <div style="font-size:11px;letter-spacing:.24em;color:#E8A93B">VANGUARD · NEW INQUIRY</div>
          <h2 style="color:#F2ECFF">${escapeHtml(id)}</h2>
          <p style="color:#C9C2E0"><b>Type:</b> ${escapeHtml(mode.replaceAll("_", " "))}</p>
          <p style="color:#C9C2E0"><b>Company:</b> ${escapeHtml(company)}</p>
          <p style="color:#C9C2E0"><b>Contact:</b> ${escapeHtml(contactName || "Not provided")}</p>
          <p style="color:#C9C2E0"><b>Email:</b> ${escapeHtml(email)}</p>
          <p style="color:#C9C2E0"><b>Phone:</b> ${escapeHtml(phone || "Not provided")}</p>
          ${detailRows ? `<table style="width:100%;border-collapse:collapse;margin-top:14px">${detailRows}</table>` : ""}
          <p style="color:#C9C2E0"><b>Message:</b><br/>${escapeHtml(message || "No message").replace(/\n/g, "<br/>")}</p>
        </div>
      </div>`;
    const delivered = await sendEmail(owner, `New Vanguard ${mode.replaceAll("_", " ")} — ${company}`, html);
    if (!delivered) console.error("[inquiry] owner email delivery failed", { id });
  }

  return NextResponse.json({ ok: true, status: isNewsletter ? "subscribed" : "received", inquiryId: id });
}
