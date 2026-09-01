import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { ACTIONS_BY_STATUS, ACTION_LABEL, cartEligible, type OrderingMode } from "@/types";
import { GlassCard, EvidenceTag, DisclaimerBanner } from "@/components/ui";
import { ProductVial } from "@/components/product-vial";
import { B2BForm } from "@/components/b2b-form";
import { AddToCart } from "@/components/add-to-cart";
import { productImages, hasAsset } from "@/lib/assets";

const BASE = "https://vanguardperformancelabs.com";

export function generateStaticParams() {
  return COMPOUNDS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = COMPOUNDS.find((x) => x.slug === params.slug);
  if (!c) return {};
  const title = `${c.name}${c.strength ? ` ${c.strength}` : ""} — Research Peptide`;
  const description = c.overview ?? `${c.name} research peptide. ${c.researchStatus ?? "Research use only."}`;
  const img = productImages[c.slug];
  return {
    title,
    description,
    alternates: { canonical: `${BASE}/products/${c.slug}` },
    openGraph: { title, description, url: `${BASE}/products/${c.slug}`, images: hasAsset(img) ? [`${BASE}${img.src}`] : undefined },
  };
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const c = COMPOUNDS.find((x) => x.slug === params.slug);
  if (!c) notFound();

  const img = productImages[c.slug];
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: c.name,
    description: c.overview,
    image: hasAsset(img) ? `${BASE}${img.src}` : undefined,
    brand: { "@type": "Brand", name: "Vanguard Performance Labs" },
    ...(cartEligible(c.regulatory) && c.variants?.length
      ? {
          offers: c.variants.map((v) => ({
            "@type": "Offer",
            name: `${c.name} ${v.size}`,
            price: v.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `${BASE}/products/${c.slug}`,
          })),
        }
      : {}),
  };

  const allowed = ACTIONS_BY_STATUS[c.regulatory];
  // server-authoritative default; the form reads any ?action= query param on the client
  // and still validates it against `allowed`, so the page stays statically generable.
  const action: OrderingMode = allowed[0] ?? "information_request";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
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
          {!cartEligible(c.regulatory) && c.availableSizes && c.availableSizes.length > 0 && (
            <div className="mt-5 max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted">Available vial sizes</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {c.availableSizes.map((sz) => (
                  <span key={sz} className="rounded-lg border border-vanguard-violet/40 bg-vanguard-violet/10 px-2.5 py-1 text-xs font-semibold text-vanguard-violet">{sz}</span>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-muted">Pricing provided on quote to approved business accounts.</p>
            </div>
          )}
          {cartEligible(c.regulatory) && c.variants && c.variants.length > 0 && (
            <div className="mt-5 max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted">Vial size · list price</div>
              <AddToCart slug={c.slug} name={c.name} variants={c.variants} />
              <p className="mt-2 text-[10px] text-muted">Wholesale terms available to approved accounts.</p>
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
