import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, BookOpen, FileCheck2, ShieldCheck, Snowflake } from "lucide-react";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { ACTIONS_BY_STATUS, ACTION_LABEL, cartEligible, type OrderingMode } from "@/types";
import { B2BForm } from "@/components/b2b-form";
import { ProductPurchase } from "@/components/product-purchase";
import { VialComposite } from "@/components/vial-composite";
import { DisclaimerBanner, EvidenceTag, GlassCard } from "@/components/ui";

export function generateStaticParams() {
  return COMPOUNDS.map((compound) => ({ slug: compound.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const compound = COMPOUNDS.find((item) => item.slug === params.slug);
  if (!compound) return { title: "Research Product" };
  return {
    title: `${compound.name} Research Material`,
    description: `${compound.name} research overview, available vial strengths, documentation, and professional ordering information from Vanguard Performance Labs.`,
  };
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const compound = COMPOUNDS.find((item) => item.slug === params.slug);
  if (!compound) notFound();

  const allowed = ACTIONS_BY_STATUS[compound.regulatory];
  const action: OrderingMode = allowed[0] ?? "information_request";
  const orderable = cartEligible(compound.regulatory) && !!compound.variants?.length;
  const displaySize = compound.variants?.[0]?.size ?? compound.availableSizes?.[0] ?? compound.strength ?? "Research vial";
  const verifiedReferences = compound.references.filter((reference) => reference.citation);

  return (
    <div className="launch-page product-detail-page">
      <div className="launch-breadcrumb">
        <Link href="/products"><ArrowLeft size={15} /> Research catalog</Link>
        <span>/</span>
        <span>{compound.name}</span>
      </div>

      <section className="product-detail-hero">
        <div className="product-detail-hero__visual">
          {orderable && compound.variants ? (
            <ProductPurchase slug={compound.slug} name={compound.name} variants={compound.variants} mode="detail" />
          ) : (
            <div className="product-detail-quote-vial">
              <VialComposite slug={compound.slug} name={compound.name} size={displaySize} width={260} />
              <div className="product-detail-quote-vial__sizes">
                {(compound.availableSizes ?? [displaySize]).map((size) => <span key={size}>{size}</span>)}
              </div>
            </div>
          )}
        </div>

        <div className="product-detail-hero__copy">
          <div className="product-detail-hero__eyebrow">
            <span>{compound.category}</span>
            <EvidenceTag level={compound.evidence} />
          </div>
          <h1>{compound.name}</h1>
          <p className="product-detail-hero__status">Research use only · {compound.researchStatus}</p>
          <p className="product-detail-hero__overview">{compound.overview}</p>

          <div className="product-standard-grid">
            <div><FileCheck2 /><span><strong>COA support</strong>Available by batch and approved account</span></div>
            <div><ShieldCheck /><span><strong>Reviewed fulfillment</strong>No shipment without human review</span></div>
            <div><Snowflake /><span><strong>Handling controls</strong>Temperature-conscious where required</span></div>
            <div><BadgeCheck /><span><strong>Server-checked order</strong>Strength and price validated again on submit</span></div>
          </div>

          <Link className="product-science-link" href={`/education/${compound.slug}`}>
            <BookOpen size={16} /> Open the full research overview
          </Link>
        </div>
      </section>

      <section className="product-information-grid">
        <article className="launch-content-card">
          <div className="launch-kicker">Research Context</div>
          <h2>Mechanism under study</h2>
          <p>{compound.mechanism}</p>
        </article>
        <article className="launch-content-card">
          <div className="launch-kicker">Areas of Study</div>
          <h2>Current research directions</h2>
          <ul>{compound.areasOfStudy.map((area) => <li key={area}>{area}</li>)}</ul>
        </article>
        <article className="launch-content-card">
          <div className="launch-kicker">Safety & Limitations</div>
          <h2>What researchers should know</h2>
          <p>{compound.safety}</p>
        </article>
        <article className="launch-content-card">
          <div className="launch-kicker">Documentation</div>
          <h2>Records available by request</h2>
          <ul>
            <li>Certificate of Analysis associated with available batch records</li>
            <li>Product identity and handling documentation for approved accounts</li>
            <li>Research overview with cited sources where verified</li>
          </ul>
        </article>
      </section>

      <section className="product-detail-lower">
        <div className="product-detail-lower__research">
          <div className="launch-section-heading">
            <div className="launch-kicker">Evidence Library</div>
            <h2>Research notes and frequently asked questions</h2>
          </div>

          <div className="product-faq-list">
            {compound.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>

          <GlassCard className="product-reference-card">
            <div className="product-reference-card__header">
              <strong>Source record</strong>
              <span>{verifiedReferences.length} cited reference{verifiedReferences.length === 1 ? "" : "s"}</span>
            </div>
            {verifiedReferences.length ? (
              <ol>
                {verifiedReferences.slice(0, 8).map((reference, index) => (
                  <li key={`${reference.citation}-${index}`}>
                    <span>{reference.citation}</span>
                    {reference.finding && <p>{reference.finding}</p>}
                  </li>
                ))}
              </ol>
            ) : (
              <p>No verified citation is currently published for this listing. The evidence grade reflects that limitation.</p>
            )}
          </GlassCard>
        </div>

        <aside className="product-inquiry-panel">
          <GlassCard className="p-6">
            <div className="launch-kicker">Professional Desk</div>
            <h2>{orderable ? "Need a quote or purchase-order workflow?" : "Request availability"}</h2>
            <p>
              Available actions: {allowed.map((item) => ACTION_LABEL[item]).join(" · ") || "Currently unavailable"}.
            </p>
            {allowed.length > 0 && <B2BForm product={compound.name} action={action} allowed={allowed} />}
          </GlassCard>
          <DisclaimerBanner text={DISCLAIMER} />
        </aside>
      </section>
    </div>
  );
}
