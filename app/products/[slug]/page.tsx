import { notFound } from "next/navigation";
import Link from "next/link";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { ACTIONS_BY_STATUS, ACTION_LABEL, type OrderingMode } from "@/types";
import { GlassCard, EvidenceTag, DisclaimerBanner } from "@/components/ui";
import { ProductVial } from "@/components/product-vial";
import { B2BForm } from "@/components/b2b-form";

export function generateStaticParams() {
  return COMPOUNDS.map((compound) => ({ slug: compound.slug }));
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const compound = COMPOUNDS.find((item) => item.slug === params.slug);
  if (!compound) notFound();

  const allowed = ACTIONS_BY_STATUS[compound.regulatory];
  const action: OrderingMode = allowed.includes("quote_only") ? "quote_only" : (allowed[0] ?? "information_request");
  const sizes = compound.availableSizes?.length
    ? compound.availableSizes
    : Array.from(new Set((compound.variants ?? []).map((variant) => variant.size)));

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Link href="/products" className="text-sm text-vanguard-violet hover:underline">← Research Materials</Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] py-12">
            <ProductVial slug={compound.slug} name={compound.name} strength={compound.strength} size={150} />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <h1 className="font-display text-3xl font-black text-bone">{compound.name}</h1>
            <EvidenceTag level={compound.evidence} />
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-vanguard-amber">
            Research information only · {compound.researchStatus}
          </p>

          {sizes.length > 0 && (
            <div className="mt-5 max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted">Referenced formats</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {sizes.map((size) => (
                  <span key={size} className="rounded-lg border border-vanguard-violet/40 bg-vanguard-violet/10 px-2.5 py-1 text-xs font-semibold text-vanguard-violet">{size}</span>
                ))}
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-muted">
                Format, availability, documentation, and eligibility are discussed only after professional review. No consumer sale is offered here.
              </p>
            </div>
          )}

          <p className="mt-4 text-sm leading-relaxed text-muted">{compound.overview}</p>

          <GlassCard className="mt-6 p-5">
            <div className="mb-2 text-sm font-bold text-bone">Documentation posture</div>
            <ul className="space-y-1 text-sm text-muted">
              <li>Evidence overview — <span className="text-vanguard-violet">available in the education library</span></li>
              <li>Product documentation — <span className="text-vanguard-violet">discussed with approved professional accounts</span></li>
              <li>Claims and citations — <span className="text-vanguard-violet">subject to editorial verification</span></li>
            </ul>
          </GlassCard>
          <div className="mt-4"><Link href={`/education/${compound.slug}`} className="text-sm text-vanguard-violet hover:underline">Read the research overview →</Link></div>
        </div>

        <div>
          <GlassCard className="p-6">
            <div className="mb-1 text-sm font-bold text-bone">Professional Inquiry</div>
            <p className="mb-4 text-xs leading-relaxed text-muted">
              Available non-binding actions: {allowed.map((item) => ACTION_LABEL[item]).join(" · ") || "None"}.
              Submitting a form does not confirm availability, eligibility, approval, pricing, or a transaction.
            </p>
            {allowed.length === 0 ? (
              <p className="text-sm text-muted">This material is currently unavailable for inquiry.</p>
            ) : (
              <B2BForm product={compound.name} action={action} allowed={allowed} />
            )}
          </GlassCard>
          <div className="mt-4"><DisclaimerBanner text={DISCLAIMER} /></div>
        </div>
      </div>
    </div>
  );
}
