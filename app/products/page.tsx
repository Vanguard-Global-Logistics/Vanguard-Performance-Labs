import Link from "next/link";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { ACTIONS_BY_STATUS, ACTION_LABEL, cartEligible } from "@/types";
import { GlassCard, SectionHeading, EvidenceTag, DisclaimerBanner } from "@/components/ui";
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
              <div className="mb-3 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] py-6">
                <ProductVial slug={c.slug} name={c.name} strength={c.strength} size={92} />
              </div>
              <div className="flex items-center justify-between">
                <div className="font-display text-lg font-bold text-bone">{c.name}</div>
                <EvidenceTag level={c.evidence} />
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{c.overview}</p>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-vanguard-amber">Research use only</div>

              <div className="mt-4 flex flex-col gap-2">
                {cartEligible(c.regulatory) && typeof c.listPrice === "number" && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-bone tabular-nums">${c.listPrice.toFixed(2)} <span className="text-[10px] font-medium text-muted">list</span></span>
                    <AddToCart slug={c.slug} name={c.name} strength={c.strength} listPrice={c.listPrice} compact />
                  </div>
                )}
                {actions.length === 0 ? (
                  <span className="rounded-lg border border-white/10 px-3 py-2 text-center text-xs text-muted">Currently unavailable</span>
                ) : (
                  actions.map((a) => (
                    <Link key={a} href={`/products/${c.slug}?action=${a}`}
                      className="rounded-lg border border-vanguard-violet/40 bg-vanguard-violet/10 px-3 py-2 text-center text-xs font-semibold text-vanguard-violet hover:bg-vanguard-violet/20">
                      {ACTION_LABEL[a]}
                    </Link>
                  ))
                )}
                <Link href={`/education/${c.slug}`} className="text-center text-xs text-muted hover:text-bone">Read the science →</Link>
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
        <DisclaimerBanner text={DISCLAIMER} />
      </div>
    </div>
  );
}
