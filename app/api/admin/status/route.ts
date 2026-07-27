import { NextResponse } from "next/server";

function authed(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  return req.headers.get("authorization") === `Bearer ${token}`;
}

export async function GET(req: Request) {
  if (!authed(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const services = {
    anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
    orderPersistence: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    customerEmail: Boolean(process.env.RESEND_API_KEY && process.env.ORDER_EMAIL_FROM),
    ownerEmailAlert: Boolean(process.env.OWNER_EMAIL),
    paymentPhone: Boolean(process.env.PAYMENT_PHONE),
    shippingWebhook: Boolean(process.env.SHIPPING_WEBHOOK_URL),
    siteUrl: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    adminProtection: Boolean(process.env.ADMIN_TOKEN),
  };

  const critical = {
    orderPersistence: services.orderPersistence,
    customerEmail: services.customerEmail,
    ownerEmailAlert: services.ownerEmailAlert,
    adminProtection: services.adminProtection,
  };

  return NextResponse.json({
    ok: true,
    readyForLiveOrders: Object.values(critical).every(Boolean),
    services,
    critical,
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
  });
}
