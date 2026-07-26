import { GlassCard, GlowButton, DisclaimerBanner } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";

export const metadata = { title: "Professional Inquiry" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <GlassCard className="p-8 text-center sm:p-10">
        <div className="mx-auto inline-flex rounded-full border border-vanguard-violet/40 bg-vanguard-violet/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-vanguard-violet">
          Professional review required
        </div>
        <h1 className="mt-5 font-display text-3xl font-black text-bone sm:text-4xl">
          Public ordering is not enabled.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Vanguard Performance Labs uses information requests, non-binding quote requests, wholesale review, and direct human follow-up. This website does not provide consumer checkout or confirm that any material is available or eligible for a transaction.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GlowButton href="/products">Explore Research Materials</GlowButton>
          <GlowButton href="/wholesale" variant="secondary">Professional Inquiry</GlowButton>
          <GlowButton href="/contact" variant="secondary">Contact Vanguard</GlowButton>
        </div>
      </GlassCard>
      <div className="mt-5"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
