import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { protectPublicMutation } from "@/lib/security-guard";
import { getOrder, updateOrder } from "@/lib/orders-store";

const MAX_FILE = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

function extensionFor(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

export async function POST(req: Request) {
  const blocked = protectPublicMutation(req, "payment-evidence", {
    perMinute: 3,
    burst: 1,
    perHour: 10,
    maxBodyBytes: MAX_FILE + 256 * 1024,
    allowedContentTypes: ["multipart/form-data"],
  });
  if (blocked) return blocked;

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ ok: false, error: "secure_evidence_storage_unavailable" }, { status: 503 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_form" }, { status: 400 });
  }

  const orderId = String(form.get("orderId") ?? "").trim().slice(0, 80);
  const reference = String(form.get("paymentReference") ?? "").trim().toUpperCase().slice(0, 80);
  const evidence = form.get("evidence");

  if (!orderId || !reference || !(evidence instanceof File)) {
    return NextResponse.json({ ok: false, error: "order_reference_and_image_required" }, { status: 422 });
  }
  if (!ALLOWED.has(evidence.type) || evidence.size < 1 || evidence.size > MAX_FILE) {
    return NextResponse.json({ ok: false, error: "invalid_evidence_file" }, { status: 422 });
  }

  const order = await getOrder(orderId);
  if (!order || order.payment_reference !== reference) {
    // Do not reveal whether an order id or reference exists independently.
    return NextResponse.json({ ok: false, error: "order_reference_mismatch" }, { status: 404 });
  }
  if (order.status !== "pending_payment") {
    return NextResponse.json({ ok: false, error: "order_not_awaiting_payment" }, { status: 409 });
  }

  const ext = extensionFor(evidence.type);
  const objectPath = `${order.id}/${Date.now()}-${randomUUID()}.${ext}`;
  const bytes = await evidence.arrayBuffer();
  const upload = await fetch(`${process.env.SUPABASE_URL}/storage/v1/object/payment-evidence/${encodeURI(objectPath)}`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": evidence.type,
      "x-upsert": "false",
    },
    body: bytes,
    signal: AbortSignal.timeout(15000),
  });

  if (!upload.ok) {
    console.error("[payment-evidence] storage failed", upload.status, (await upload.text()).slice(0, 300));
    return NextResponse.json({ ok: false, error: "evidence_storage_failed" }, { status: 502 });
  }

  const updated = await updateOrder(order.id, {
    payment_evidence_path: objectPath,
    payment_evidence_status: "submitted",
  });
  if (!updated) {
    return NextResponse.json({ ok: false, error: "order_update_failed" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    status: "submitted_for_review",
    message: "Evidence received. It does not mark the order paid until Vanguard independently verifies the ledger transaction.",
  });
}
