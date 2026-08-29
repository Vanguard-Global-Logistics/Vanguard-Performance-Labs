import { NextRequest, NextResponse } from "next/server";

/**
 * Network-boundary anti-abuse controls.
 *
 * This is deliberately affiliation-neutral: it blocks well-known automated
 * scraping/AI user agents and suspicious cross-site API writes, regardless of
 * who operates them. It is defense-in-depth, not a substitute for Vercel WAF,
 * Bot Management/BotID, authentication, or server-side authorization.
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

const WRITE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const MAX_API_BODY_BYTES = 1_000_000;

function isKnownAutomation(userAgent: string) {
  return AUTOMATION_UA.some((pattern) => pattern.test(userAgent));
}

function forbidden(reason: string) {
  return new NextResponse("Forbidden", {
    status: 403,
    headers: {
      "Cache-Control": "no-store, private",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noai, noimageai",
      "X-VPL-Block-Reason": reason,
    },
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") ?? "";
  const isApi = pathname.startsWith("/api/");
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  // Block known AI/data-harvesting/scraper clients from application content.
  // We intentionally do not use a generic /bot/ match so normal search-engine
  // indexing can remain a separate SEO decision.
  if (isKnownAutomation(userAgent)) {
    return forbidden("automated-client");
  }

  // API and admin traffic should always identify a client.
  if ((isApi || isAdmin) && !userAgent.trim()) {
    return forbidden("missing-user-agent");
  }

  if (isApi && WRITE_METHODS.has(request.method.toUpperCase())) {
    const fetchSite = request.headers.get("sec-fetch-site");
    if (fetchSite === "cross-site") {
      return forbidden("cross-site-write");
    }

    // Public browser mutations must originate from the same VPL host. This
    // blocks casual connector/curl abuse and cross-origin form/API attacks.
    const origin = request.headers.get("origin");
    if (origin) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== request.nextUrl.host) {
          return forbidden("origin-mismatch");
        }
      } catch {
        return forbidden("invalid-origin");
      }
    } else if (process.env.NODE_ENV === "production") {
      return forbidden("missing-origin");
    }

    const contentLength = Number(request.headers.get("content-length") ?? "0");
    if (Number.isFinite(contentLength) && contentLength > MAX_API_BODY_BYTES) {
      return new NextResponse("Payload Too Large", {
        status: 413,
        headers: { "Cache-Control": "no-store, private" },
      });
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noai, noimageai");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/).*)",
  ],
};
