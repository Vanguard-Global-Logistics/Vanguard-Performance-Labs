import { GlassCard, GlowButton, DisclaimerBanner } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";

export const metadata = { title: "Checkout Unavailable" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <GlassCard className="p-8 text-center sm:p-10">
        <div className="mx-auto inline-flex rounded-full border border-vanguard-amber/40 bg-vanguard-amber/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-vanguard-amber">
          Launch safeguard active
        </div>
        <h1 className="mt-5 font-display text-3xl font-black text-bone sm:text-4xl">
          Checkout is intentionally disabled.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
          No payment, order, shipping, pickup, or invoice workflow is available through the public website. Commercial workflows may be enabled only after product-specific legal, regulatory, operational, and merchant-account review.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GlowButton href="/wholesale">Submit a Professional Inquiry</GlowButton>
          <GlowButton href="/products" variant="secondary">Return to Research Materials</GlowButton>
          <GlowButton href="/contact" variant="secondary">Contact Vanguard</GlowButton>
        </div>
      </GlassCard>
      <div className="mt-5"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
