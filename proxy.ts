import { NextRequest, NextResponse } from "next/server";

/**
 * Network-boundary anti-abuse controls.
 *
 * This layer is deliberately affiliation-neutral. It blocks common automated
 * scraping clients, exploit scanners, malformed mutation traffic, and abusive
 * methods regardless of who operates them. It is defense-in-depth, not a
 * substitute for Vercel Firewall, Bot Management/BotID, authentication, or
 * server-side authorization.
 */
const AUTOMATION_UA = [
  /GPTBot/i,
  /ChatGPT-User/i,
  /OAI-SearchBot/i,
  /ClaudeBot/i,
  /Claude-User/i,
  /anthropic-ai/i,
  /PerplexityBot/i,
  /Perplexity-User/i,
  /CCBot/i,
  /Bytespider/i,
  /Amazonbot/i,
  /meta-externalagent/i,
  /meta-externalfetcher/i,
  /Applebot-Extended/i,
  /Google-Extended/i,
  /PetalBot/i,
  /AhrefsBot/i,
  /SemrushBot/i,
  /MJ12bot/i,
  /DotBot/i,
  /BLEXBot/i,
  /DataForSeoBot/i,
  /Scrapy/i,
  /python-requests/i,
  /python-httpx/i,
  /aiohttp/i,
  /Go-http-client/i,
  /libwww-perl/i,
  /curl\//i,
  /Wget\//i,
  /HeadlessChrome/i,
  /PhantomJS/i,
  /Selenium/i,
  /Playwright/i,
];

const SCANNER_PATHS = [
  /^\/(?:\.env|\.git)(?:\/|$)/i,
  /^\/(?:wp-admin|wp-login\.php|xmlrpc\.php)(?:\/|$)/i,
  /^\/(?:phpmyadmin|pma|adminer)(?:\/|$)/i,
  /^\/(?:server-status|server-info)(?:\/|$)/i,
  /^\/vendor\/phpunit(?:\/|$)/i,
  /^\/cgi-bin(?:\/|$)/i,
  /^\/(?:actuator|console|manager\/html)(?:\/|$)/i,
];

const WRITE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const DISALLOWED_METHODS = new Set(["TRACE", "CONNECT"]);
const SIGNED_WEBHOOK_PATHS = new Set([
  "/api/webhooks/payment-confirmed",
  "/api/webhooks/shipping-status",
]);
const MAX_PUBLIC_API_BODY_BYTES = 64 * 1024;
const MAX_PAYMENT_EVIDENCE_BODY_BYTES = 5 * 1024 * 1024 + 256 * 1024;
const MAX_ADMIN_API_BODY_BYTES = 512 * 1024;

function isKnownAutomation(userAgent: string) {
  return AUTOMATION_UA.some((pattern) => pattern.test(userAgent));
}

function isScannerPath(pathname: string) {
  return SCANNER_PATHS.some((pattern) => pattern.test(pathname));
}

function logBlock(request: NextRequest, reason: string) {
  console.warn("[edge-security]", {
    reason,
    path: request.nextUrl.pathname.slice(0, 180),
    method: request.method,
    at: new Date().toISOString(),
  });
}

function forbidden(request: NextRequest, reason: string, status = 403) {
  logBlock(request, reason);
  return new NextResponse(status === 413 ? "Payload Too Large" : "Forbidden", {
    status,
    headers: {
      "Cache-Control": "no-store, private",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noai, noimageai",
    },
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") ?? "";
  const isApi = pathname.startsWith("/api/");
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname === "/api/admin" || pathname.startsWith("/api/admin/");
  const isPaymentEvidence = pathname === "/api/payment-evidence";
  const isSignedWebhook = SIGNED_WEBHOOK_PATHS.has(pathname);
  const method = request.method.toUpperCase();

  if (DISALLOWED_METHODS.has(method)) return forbidden(request, "disallowed-method");
  if (isScannerPath(pathname)) return forbidden(request, "scanner-path");

  // Only enforce UA automation blocking at the hosted edge. This keeps the
  // production/preview site protected without blinding local Playwright QA,
  // whose production-mode test server intentionally identifies as Playwright.
  const hostedEdge = Boolean(process.env.VERCEL);
  if (hostedEdge && isKnownAutomation(userAgent)) return forbidden(request, "automated-client");

  // API and admin traffic should always identify a client.
  if ((isApi || isAdminPage) && (!userAgent.trim() || userAgent.length > 512)) {
    return forbidden(request, "invalid-user-agent");
  }

  if (isApi && WRITE_METHODS.has(method)) {
    if (request.headers.has("x-http-method-override") || request.headers.has("x-method-override")) {
      return forbidden(request, "method-override");
    }

    // Browser mutations are same-origin only. The two machine-to-machine webhook
    // routes are exempt from browser Origin/Sec-Fetch checks because their route
    // handlers authenticate the exact raw payload with an HMAC signature. This
    // keeps CSRF protection strict without breaking legitimate provider callbacks.
    if (!isSignedWebhook) {
      const fetchSite = request.headers.get("sec-fetch-site");
      if (fetchSite === "cross-site") return forbidden(request, "cross-site-write");

      const origin = request.headers.get("origin");
      if (origin) {
        try {
          const originHost = new URL(origin).host;
          if (originHost !== request.nextUrl.host) return forbidden(request, "origin-mismatch");
        } catch {
          return forbidden(request, "invalid-origin");
        }
      } else if (process.env.NODE_ENV === "production") {
        return forbidden(request, "missing-origin");
      }
    }

    const contentLength = Number(request.headers.get("content-length") ?? "0");
    const maxBody = isAdminApi
      ? MAX_ADMIN_API_BODY_BYTES
      : isPaymentEvidence
        ? MAX_PAYMENT_EVIDENCE_BODY_BYTES
        : MAX_PUBLIC_API_BODY_BYTES;
    if (Number.isFinite(contentLength) && contentLength > maxBody) {
      return forbidden(request, "payload-too-large", 413);
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noai, noimageai");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set("Origin-Agent-Cluster", "?1");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/).*)",
  ],
};
