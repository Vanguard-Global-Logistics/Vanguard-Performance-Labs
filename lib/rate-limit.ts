// Lightweight per-IP abuse controls.
// These are intentionally an application-layer backstop. Counters are local to
// a serverless instance, so production still relies on Vercel Firewall/Bot
// Management for hard global enforcement and volumetric DDoS mitigation.

type Bucket = { tokens: number; last: number };
type Window = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const windows = new Map<string, Window>();
const MAX_ENTRIES = 10_000;

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip")
    ?? "unknown";
}

function pruneIfNeeded() {
  if (buckets.size > MAX_ENTRIES) buckets.clear();
  if (windows.size > MAX_ENTRIES) windows.clear();
}

export function rateLimit(
  req: Request,
  key: string,
  { perMinute, burst = perMinute }: { perMinute: number; burst?: number },
): { ok: boolean; retryAfter?: number } {
  pruneIfNeeded();
  const id = `${key}:${clientIp(req)}`;
  const now = Date.now();
  const refill = Math.max(1, perMinute) / 60_000;
  const capacity = Math.max(1, burst);

  let bucket = buckets.get(id);
  if (!bucket) {
    bucket = { tokens: capacity, last: now };
    buckets.set(id, bucket);
  }

  bucket.tokens = Math.min(capacity, bucket.tokens + (now - bucket.last) * refill);
  bucket.last = now;

  if (bucket.tokens < 1) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((1 - bucket.tokens) / refill / 1000)) };
  }

  bucket.tokens -= 1;
  return { ok: true };
}

export function fixedWindowLimit(
  req: Request,
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { ok: boolean; retryAfter?: number } {
  pruneIfNeeded();
  const id = `${key}:${clientIp(req)}`;
  const now = Date.now();
  const max = Math.max(1, limit);
  const duration = Math.max(1000, windowMs);

  let window = windows.get(id);
  if (!window || window.resetAt <= now) {
    window = { count: 0, resetAt: now + duration };
    windows.set(id, window);
  }

  if (window.count >= max) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((window.resetAt - now) / 1000)) };
  }

  window.count += 1;
  return { ok: true };
}

export function tooMany(retryAfter = 30) {
  return new Response(JSON.stringify({ ok: false, error: "rate_limited" }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, private",
      "Retry-After": String(retryAfter),
    },
  });
}
