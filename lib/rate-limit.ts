// Lightweight per-IP rate limiter (token bucket, in-memory).
// Per-serverless-instance, so it's a strong deterrent rather than a hard global
// cap — pair with Vercel WAF or Upstash for hard limits at scale.

type Bucket = { tokens: number; last: number };
const buckets = new Map<string, Bucket>();
const MAX_ENTRIES = 5000;

export function rateLimit(
  req: Request,
  key: string,
  { perMinute }: { perMinute: number }
): { ok: boolean; retryAfter?: number } {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const id = `${key}:${ip}`;
  const now = Date.now();
  const refill = perMinute / 60_000; // tokens per ms

  let b = buckets.get(id);
  if (!b) {
    if (buckets.size >= MAX_ENTRIES) buckets.clear(); // crude memory guard
    b = { tokens: perMinute, last: now };
    buckets.set(id, b);
  }
  b.tokens = Math.min(perMinute, b.tokens + (now - b.last) * refill);
  b.last = now;

  if (b.tokens < 1) {
    return { ok: false, retryAfter: Math.ceil((1 - b.tokens) / refill / 1000) };
  }
  b.tokens -= 1;
  return { ok: true };
}

export function tooMany(retryAfter = 30) {
  return new Response(JSON.stringify({ ok: false, error: "rate_limited" }), {
    status: 429,
    headers: { "Content-Type": "application/json", "Retry-After": String(retryAfter) },
  });
}
