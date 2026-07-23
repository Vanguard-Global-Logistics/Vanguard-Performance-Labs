import { NextResponse } from "next/server";
import { rateLimit, tooMany } from "@/lib/rate-limit";

// Server-side validation. This is a safe stub: it validates and acknowledges.
// TODO (owner): wire to a real backend — email (Resend/SES), CRM (HubSpot),
// or Supabase `leads`/`inquiries`. A customer-entered PO/reference must NEVER
// mark an order paid; approval happens in the admin workflow, not here.
export async function POST(req: Request) {
  const rl = rateLimit(req, "inquiry", { perMinute: 5 });
  if (!rl.ok) return tooMany(rl.retryAfter);
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const company = String(body.company ?? "").trim();
  const email = String(body.email ?? "").trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!company || !emailOk) {
    return NextResponse.json({ ok: false, error: "Company and a valid email are required." }, { status: 422 });
  }

  // In production, persist + notify here. For now, log server-side.
  console.log("[inquiry]", { company, email, mode: body.mode, product: body.product });

  return NextResponse.json({ ok: true, status: "received" });
}
