import { notFound } from "next/navigation";
import Link from "next/link";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { ACTIONS_BY_STATUS, ACTION_LABEL, cartEligible, type OrderingMode } from "@/types";
import { GlassCard, EvidenceTag, DisclaimerBanner } from "@/components/ui";
import { ProductVial } from "@/components/product-vial";
import { B2BForm } from "@/components/b2b-form";
import { AddToCart } from "@/components/add-to-cart";

export function generateStaticParams() {
  return COMPOUNDS.map((c) => ({ slug: c.slug }));
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const c = COMPOUNDS.find((x) => x.slug === params.slug);
  if (!c) notFound();

  const allowed = ACTIONS_BY_STATUS[c.regulatory];
  // server-authoritative default; the form reads any ?action= query param on the client
  // and still validates it against `allowed`, so the page stays statically generable.
  const action: OrderingMode = allowed[0] ?? "information_request";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Link href="/products" className="text-sm text-vanguard-violet hover:underline">← Research Products</Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] py-12">
            <ProductVial slug={c.slug} name={c.name} strength={c.strength} size={150} />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <h1 className="font-display text-3xl font-black text-bone">{c.name}</h1>
            <EvidenceTag level={c.evidence} />
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-vanguard-amber">Research use only · {c.researchStatus}</p>
          {cartEligible(c.regulatory) && typeof c.listPrice === "number" && (
            <div className="mt-4 flex items-center gap-4">
              <span className="font-display text-2xl font-black text-bone tabular-nums">${c.listPrice.toFixed(2)}</span>
              <span className="text-[10px] font-medium text-muted">list · wholesale terms on approved accounts</span>
              <AddToCart slug={c.slug} name={c.name} strength={c.strength} listPrice={c.listPrice} />
            </div>
          )}
          <p className="mt-4 text-sm text-muted">{c.overview}</p>

          <GlassCard className="mt-6 p-5">
            <div className="mb-2 text-sm font-bold text-bone">Documentation</div>
            <ul className="space-y-1 text-sm text-muted">
              <li>Certificate of Analysis — <span className="text-vanguard-violet">available on request</span></li>
              <li>Batch records — <span className="text-vanguard-violet">provided to approved accounts</span></li>
            </ul>
          </GlassCard>
          <div className="mt-4"><Link href={`/education/${c.slug}`} className="text-sm text-vanguard-violet hover:underline">Read the full research overview →</Link></div>
        </div>

        <div>
          <GlassCard className="p-6">
            <div className="mb-1 text-sm font-bold text-bone">Professional Inquiry</div>
            <p className="mb-4 text-xs text-muted">
              Available actions for this product: {allowed.map((a) => ACTION_LABEL[a]).join(" · ") || "None"}.
            </p>
            {allowed.length === 0 ? (
              <p className="text-sm text-muted">This product is currently unavailable for inquiry.</p>
            ) : (
              <B2BForm product={c.name} action={action} allowed={allowed} />
            )}
          </GlassCard>
          <div className="mt-4"><DisclaimerBanner text={DISCLAIMER} /></div>
        </div>
      </div>
    </div>
  );
}
