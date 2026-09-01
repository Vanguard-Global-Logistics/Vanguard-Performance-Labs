import Link from "next/link";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { ACTIONS_BY_STATUS, cartEligible } from "@/types";
import { GlassCard, SectionHeading, EvidenceTag, DisclaimerBanner, GlowButton } from "@/components/ui";
import { ProductVial } from "@/components/product-vial";
import { AddToCart } from "@/components/add-to-cart";

export const metadata = { title: "Research Products" };

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading kicker="Research Products" title="Premium Research-Use Catalog"
        sub="Educational product presentation for professionals and qualified buyers. Research use only — not for human consumption." />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COMPOUNDS.map((c) => {
          const actions = ACTIONS_BY_STATUS[c.regulatory];
          return (
            <GlassCard key={c.slug} className="card-lift flex h-full flex-col p-5">
              <div className="mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <ProductVial slug={c.slug} name={c.name} strength={c.strength} size={184} className="h-full w-full object-contain" />
              </div>
              <div className="flex items-center justify-between">
                <div className="font-display text-lg font-bold text-bone">{c.name}</div>
                <EvidenceTag level={c.evidence} />
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{c.overview}</p>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-vanguard-amber">Research use only</div>

              <div className="mt-4 flex flex-col gap-2">
                {cartEligible(c.regulatory) && c.variants && c.variants.length > 0 && (
                  <AddToCart slug={c.slug} name={c.name} variants={c.variants} compact />
                )}
                {!cartEligible(c.regulatory) && c.availableSizes && c.availableSizes.length > 0 && (
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted">Available sizes</div>
                    <div className="mt-1 text-xs font-semibold text-bone">{c.availableSizes.join(" · ")}</div>
                    <div className="mt-0.5 text-[10px] text-vanguard-violet">Pricing on quote</div>
                  </div>
                )}
                {/* One action per card. The full set of B2B workflows lives on the
                    product page, where someone who is actually interested will find them. */}
                {actions.length === 0 ? (
                  <span className="rounded-lg border border-white/10 px-3 py-2 text-center text-xs text-muted">Currently unavailable</span>
                ) : !cartEligible(c.regulatory) ? (
                  <Link href={`/products/${c.slug}?action=${actions[actions.length - 1]}`}
                    className="rounded-lg border border-vanguard-violet/40 bg-vanguard-violet/10 px-3 py-2 text-center text-xs font-semibold text-vanguard-violet hover:bg-vanguard-violet/20">
                    Request a Quote
                  </Link>
                ) : null}
                <div className="flex items-center justify-between pt-0.5 text-[11px]">
                  <Link href={`/education/${c.slug}`} className="text-muted hover:text-bone">Read the science →</Link>
                  <Link href={`/products/${c.slug}`} className="font-semibold text-vanguard-violet hover:underline">Details</Link>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        <GlassCard className="p-5 text-sm text-muted">
          <span className="font-semibold text-bone">No consumer checkout. </span>
          Vanguard uses professional B2B workflows — information requests, quotes, purchase orders, and wholesale
          applications — configured per product and reviewed by our team. Available actions are determined server-side.
        </GlassCard>
        <GlassCard className="mt-10 flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <div className="font-display text-lg font-bold text-bone">Don&apos;t see what your research needs?</div>
          <p className="mt-1 text-sm text-muted">We source specialty compounds for qualified businesses — tell us the spec and we&apos;ll quote it.</p>
        </div>
        <GlowButton href="/specialty-request">Request Specialty Sourcing</GlowButton>
      </GlassCard>

      <div className="mt-8"><DisclaimerBanner text={DISCLAIMER} /></div>
      </div>
    </div>
  );
}
