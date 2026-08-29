import { rateLimit, fixedWindowLimit, tooMany } from "@/lib/rate-limit";

type GuardOptions = {
  perMinute: number;
  burst?: number;
  perHour: number;
  maxBodyBytes?: number;
  /** MIME prefixes accepted for this mutation. Defaults to application/json. */
  allowedContentTypes?: string[];
};

const DEFAULT_MAX_BODY = 64 * 1024;
const WRITE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function securityMode() {
  const mode = (process.env.VPL_SECURITY_MODE ?? "normal").trim().toLowerCase();
  return mode === "lockdown" || mode === "elevated" ? mode : "normal";
}

function shortHash(value: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}

function clientFingerprint(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  const language = req.headers.get("accept-language") ?? "";
  const platform = req.headers.get("sec-ch-ua-platform") ?? "";
  return shortHash(`${ua}|${language}|${platform}`);
}

function event(req: Request, key: string, reason: string) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip")
    ?? "unknown";
  console.warn("[security]", {
    key,
    reason,
    mode: securityMode(),
    ip: shortHash(ip),
    fp: clientFingerprint(req),
    at: new Date().toISOString(),
  });
}

function deny(req: Request, key: string, reason: string, status = 403) {
  event(req, key, reason);
  return new Response(status === 415 ? "Unsupported Media Type" : "Forbidden", {
    status,
    headers: {
      "Cache-Control": "no-store, private",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noai, noimageai",
    },
  });
}

export function protectPublicMutation(req: Request, key: string, options: GuardOptions): Response | null {
  if (!WRITE_METHODS.has(req.method.toUpperCase())) return null;

  const mode = securityMode();
  if (mode === "lockdown") {
    event(req, key, "security-lockdown");
    return new Response(JSON.stringify({ ok: false, error: "temporarily_unavailable" }), {
      status: 503,
      headers: {
        "Cache-Control": "no-store, private",
        "Content-Type": "application/json",
        "Retry-After": "300",
      },
    });
  }

  const userAgent = req.headers.get("user-agent") ?? "";
  if (!userAgent.trim() || userAgent.length > 512) return deny(req, key, "invalid-user-agent");

  if (req.headers.has("x-http-method-override") || req.headers.has("x-method-override")) {
    return deny(req, key, "method-override");
  }

  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return deny(req, key, "cross-site-write");

  const origin = req.headers.get("origin");
  if (origin) {
    try {
      const originHost = new URL(origin).host;
      const requestHost = new URL(req.url).host;
      if (originHost !== requestHost) return deny(req, key, "origin-mismatch");
    } catch {
      return deny(req, key, "invalid-origin");
    }
  } else if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
    return deny(req, key, "missing-origin");
  }

  const contentType = (req.headers.get("content-type") ?? "").toLowerCase();
  const allowed = options.allowedContentTypes ?? ["application/json"];
  if (!allowed.some((prefix) => contentType.startsWith(prefix.toLowerCase()))) {
    return deny(req, key, "invalid-content-type", 415);
  }

  const maxBodyBytes = options.maxBodyBytes ?? DEFAULT_MAX_BODY;
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) {
    event(req, key, "payload-too-large");
    return new Response("Payload Too Large", {
      status: 413,
      headers: { "Cache-Control": "no-store, private" },
    });
  }

  const scale = mode === "elevated" ? 0.5 : 1;
  const perMinute = Math.max(1, Math.floor(options.perMinute * scale));
  const burst = Math.max(1, Math.floor((options.burst ?? options.perMinute) * scale));
  const perHour = Math.max(1, Math.floor(options.perHour * scale));
  const fp = clientFingerprint(req);

  const routeMinute = rateLimit(req, `${key}:minute:${fp}`, { perMinute, burst });
  if (!routeMinute.ok) {
    event(req, key, "route-minute-limit");
    return tooMany(routeMinute.retryAfter);
  }

  const routeHour = fixedWindowLimit(req, `${key}:hour:${fp}`, { limit: perHour, windowMs: 60 * 60 * 1000 });
  if (!routeHour.ok) {
    event(req, key, "route-hour-limit");
    return tooMany(routeHour.retryAfter);
  }

  const globalMinute = rateLimit(req, "public-write-global", { perMinute: mode === "elevated" ? 12 : 30, burst: mode === "elevated" ? 4 : 8 });
  if (!globalMinute.ok) {
    event(req, key, "global-minute-limit");
    return tooMany(globalMinute.retryAfter);
  }

  const globalHour = fixedWindowLimit(req, "public-write-global-hour", {
    limit: mode === "elevated" ? 80 : 200,
    windowMs: 60 * 60 * 1000,
  });
  if (!globalHour.ok) {
    event(req, key, "global-hour-limit");
    return tooMany(globalHour.retryAfter);
  }

  return null;
}

export function currentSecurityMode() {
  return securityMode();
}
