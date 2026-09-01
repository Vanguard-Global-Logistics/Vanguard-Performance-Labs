import { Star } from "lucide-react";
import { GlassCard, GlowButton } from "@/components/ui";
import { REVIEWS } from "@/lib/reviews";

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35.4 26.8 36 24 36c-5.2 0-9.6-3.1-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.3 5.3C40.9 36.6 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z" />
    </svg>
  );
}

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < rating ? "fill-vanguard-gold text-vanguard-gold" : "text-white/15"} />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const count = REVIEWS.length;
  const avg = count ? REVIEWS.reduce((n, r) => n + r.rating, 0) / count : 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-vanguard-violet">
          <GoogleG size={16} />
          Google Reviews
        </div>
        <h2 className="font-display text-3xl font-bold text-bone sm:text-4xl">What professionals are saying</h2>
        {count > 0 ? (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
            <span className="font-display text-2xl font-bold text-bone">{avg.toFixed(1)}</span>
            <Stars rating={Math.round(avg)} />
            <span>({count} review{count === 1 ? "" : "s"})</span>
          </div>
        ) : (
          <p className="mt-4 text-muted">
            No reviews yet — this section pulls straight from Vanguard&apos;s Google Business Profile once it&apos;s live.
          </p>
        )}
      </div>

      {count > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <GlassCard key={i} className="flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-vg-grad text-sm font-bold text-ink-0">
                    {r.author.trim().charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-bone">{r.author}</div>
                    <div className="text-[11px] text-muted">{r.relativeTime}</div>
                  </div>
                </div>
                <GoogleG size={16} />
              </div>
              <Stars rating={r.rating} />
              <p className="text-sm leading-relaxed text-muted">{r.text}</p>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-8 max-w-md text-center">
          <GlowButton href="/contact" variant="secondary">Leave us a review</GlowButton>
        </div>
      )}
    </section>
  );
}
