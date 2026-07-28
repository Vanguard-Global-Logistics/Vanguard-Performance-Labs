import { BadgeCheck, FileSearch, ShieldCheck, Snowflake } from "lucide-react";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { ProductCatalog } from "@/components/product-catalog";
import { DisclaimerBanner, GlowButton } from "@/components/ui";

export const metadata = {
  title: "Research Products",
  description: "Explore Vanguard Performance Labs research materials, available vial strengths, documentation, and professional ordering options.",
};

export default function ProductsPage() {
  const orderable = COMPOUNDS.filter((item) => item.variants?.length).length;

  return (
    <div className="launch-page catalog-page">
      <section className="launch-hero launch-hero--catalog">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Vanguard Research Catalog</div>
          <h1>Every vial should look as precise as the research behind it.</h1>
          <p>
            Search {COMPOUNDS.length} research materials, compare available strengths, review the science,
            and build a business order request with server-validated pricing.
          </p>
          <div className="launch-hero__actions">
            <GlowButton href="#catalog">Explore catalog</GlowButton>
            <GlowButton href="/specialty-request" variant="secondary">Specialty sourcing</GlowButton>
          </div>
        </div>
        <div className="launch-metric-grid" aria-label="Catalog standards">
          <div><strong>{COMPOUNDS.length}</strong><span>Research materials</span></div>
          <div><strong>{orderable}</strong><span>Configured order options</span></div>
          <div><strong>1</strong><span>Consistent vial system</span></div>
          <div><strong>100%</strong><span>Server-checked pricing</span></div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Research ordering standards">
        <div><ShieldCheck /><span><strong>Research use only</strong>Clear product positioning</span></div>
        <div><BadgeCheck /><span><strong>Reviewed orders</strong>A person approves fulfillment</span></div>
        <div><FileSearch /><span><strong>Documentation</strong>COA and batch records by request</span></div>
        <div><Snowflake /><span><strong>Temperature conscious</strong>Cold-chain handling where required</span></div>
      </section>

      <div id="catalog" className="launch-section">
        <ProductCatalog compounds={COMPOUNDS} />
      </div>

      <section className="launch-cta-panel">
        <div>
          <div className="launch-kicker">Qualified Business Support</div>
          <h2>Need a size, specification, or material that is not listed?</h2>
          <p>Send the target specification and intended research context. Vanguard will review availability and provide a documented response.</p>
        </div>
        <GlowButton href="/specialty-request">Request specialty sourcing</GlowButton>
      </section>

      <div className="launch-legal"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
