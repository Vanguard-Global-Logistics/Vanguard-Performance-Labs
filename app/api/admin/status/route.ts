import { NextResponse } from "next/server";
import { adminAuthorized } from "@/lib/admin-auth";
import { rateLimit, tooMany } from "@/lib/rate-limit";
import { currentSecurityMode } from "@/lib/security-guard";

export async function GET(req: Request) {
  const limit = rateLimit(req, "admin-status", { perMinute: 12, burst: 4 });
  if (!limit.ok) return tooMany(limit.retryAfter);
  if (!adminAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const services = {
    anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
    orderPersistence: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    paymentEvidenceStore: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    customerEmail: Boolean(process.env.RESEND_API_KEY && process.env.ORDER_EMAIL_FROM),
    ownerEmailAlert: Boolean(process.env.OWNER_EMAIL),
    paymentPhone: Boolean(process.env.PAYMENT_PHONE),
    paymentConfirmationWebhook: Boolean(process.env.PAYMENT_CONFIRMATION_WEBHOOK_SECRET),
    shippingReleaseEndpoint: Boolean(process.env.SHIPPING_WEBHOOK_URL),
    shippingReleaseAuth: Boolean(!process.env.SHIPPING_WEBHOOK_URL || process.env.SHIPPING_RELEASE_TOKEN),
    shippingStatusWebhook: Boolean(process.env.SHIPPING_WEBHOOK_SECRET),
    siteUrl: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    adminProtection: Boolean(process.env.ADMIN_TOKEN),
  };

  const critical = {
    orderPersistence: services.orderPersistence,
    customerEmail: services.customerEmail,
    ownerEmailAlert: services.ownerEmailAlert,
    adminProtection: services.adminProtection,
  };

  const automation = {
    paymentConfirmationWebhook: services.paymentConfirmationWebhook,
    shippingReleaseEndpoint: services.shippingReleaseEndpoint,
    shippingReleaseAuth: services.shippingReleaseAuth,
    shippingStatusWebhook: services.shippingStatusWebhook,
  };

  return NextResponse.json({
    ok: true,
    readyForLiveOrders: Object.values(critical).every(Boolean),
    automationReady: Object.values(automation).every(Boolean),
    securityMode: currentSecurityMode(),
    services,
    critical,
    automation,
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}
