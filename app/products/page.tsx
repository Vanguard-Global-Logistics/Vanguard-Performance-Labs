import Link from "next/link";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { ACTIONS_BY_STATUS } from "@/types";
import { GlassCard, SectionHeading, EvidenceTag, DisclaimerBanner, GlowButton } from "@/components/ui";
import { ProductVial } from "@/components/product-vial";

export const metadata = { title: "Research Materials" };

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        kicker="Research Materials"
        title="A documented professional-inquiry catalog"
        sub="Information for qualified businesses and research organizations. No consumer checkout. No human-use instructions. Availability and eligibility are reviewed by our team."
      />

      <div className="mt-6 rounded-xl border border-vanguard-amber/30 bg-vanguard-amber/[0.06] px-4 py-3 text-xs leading-relaxed text-muted">
        Catalog presence does not mean a material is approved, available, or legally eligible for every request. Investigational materials are presented for research education and professional inquiry only.
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COMPOUNDS.map((compound) => {
          const actions = ACTIONS_BY_STATUS[compound.regulatory];
          const sizes = compound.availableSizes?.length
            ? compound.availableSizes
            : Array.from(new Set((compound.variants ?? []).map((variant) => variant.size)));

          return (
            <GlassCard key={compound.slug} className="card-lift flex h-full flex-col p-5">
              <div className="mb-3 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] py-6">
                <ProductVial slug={compound.slug} name={compound.name} strength={compound.strength} size={92} />
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="font-display text-lg font-bold text-bone">{compound.name}</div>
                <EvidenceTag level={compound.evidence} />
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-muted">{compound.overview}</p>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-vanguard-amber">
                Research information · not for human consumption
              </div>

              <div className="mt-4 flex flex-1 flex-col gap-2">
                {sizes.length > 0 && (
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted">Referenced formats</div>
                    <div className="mt-1 text-xs font-semibold text-bone">{sizes.join(" · ")}</div>
                    <div className="mt-0.5 text-[10px] text-muted">Details provided only after professional review.</div>
                  </div>
                )}

                {actions.length === 0 ? (
                  <span className="rounded-lg border border-white/10 px-3 py-2 text-center text-xs text-muted">Currently unavailable for inquiry</span>
                ) : (
                  <Link
                    href={`/products/${compound.slug}?action=${actions.includes("quote_only") ? "quote_only" : actions[0]}`}
                    className="rounded-lg border border-vanguard-violet/40 bg-vanguard-violet/10 px-3 py-2 text-center text-xs font-semibold text-vanguard-violet hover:bg-vanguard-violet/20"
                  >
                    Professional Inquiry
                  </Link>
                )}

                <div className="mt-auto flex items-center justify-between pt-1 text-[11px]">
                  <Link href={`/education/${compound.slug}`} className="text-muted hover:text-bone">Read the evidence →</Link>
                  <Link href={`/products/${compound.slug}`} className="font-semibold text-vanguard-violet hover:underline">Details</Link>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        <GlassCard className="p-5 text-sm leading-relaxed text-muted">
          <span className="font-semibold text-bone">Professional inquiry only. </span>
          Vanguard does not offer consumer checkout on this website. Requests are screened for organization type, intended research use, documentation needs, availability, and applicable requirements before any commercial discussion.
        </GlassCard>

        <GlassCard className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <div className="font-display text-lg font-bold text-bone">Need a research material not listed?</div>
            <p className="mt-1 text-sm text-muted">Submit the organization, intended research context, and required specification for a non-binding review.</p>
          </div>
          <GlowButton href="/specialty-request">Request a Review</GlowButton>
        </GlassCard>

        <div className="mt-8"><DisclaimerBanner text={DISCLAIMER} /></div>
      </div>
    </div>
  );
}
