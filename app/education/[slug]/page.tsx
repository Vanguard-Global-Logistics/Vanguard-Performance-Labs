import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BookOpenCheck, CalendarCheck, FlaskConical, Microscope, ShieldAlert } from "lucide-react";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { DisclaimerBanner, EvidenceTag, GlassCard, GlowButton } from "@/components/ui";
import { References } from "@/components/references";

export function generateStaticParams() {
  return COMPOUNDS.map((compound) => ({ slug: compound.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const compound = COMPOUNDS.find((item) => item.slug === slug);
  if (!compound) return { title: "Research profile not found" };
  return {
    title: `${compound.name} Research Profile`,
    description: `${compound.name}: evidence grade, mechanism, research areas, limitations, FAQs, and verified references.`,
  };
}

export default async function CompoundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const compound = COMPOUNDS.find((item) => item.slug === slug);
  if (!compound) notFound();

  const verifiedReferences = compound.references.filter((reference) => reference.citation).length;

  return (
    <article className="launch-page education-detail-page">
      <div className="launch-breadcrumb">
        <Link href="/education"><ArrowLeft size={15} /> Evidence library</Link>
        <span>/</span>
        <span>{compound.name}</span>
      </div>

      <section className="launch-hero mt-5">
        <div className="launch-hero__copy">
          <div className="flex flex-wrap items-center gap-3">
            <div className="launch-kicker">{compound.category}</div>
            <EvidenceTag level={compound.evidence} />
          </div>
          <h1>{compound.name}</h1>
          {compound.aliases.length > 0 && <p className="mt-3 font-mono text-[11px] text-muted">Also known as: {compound.aliases.join(" · ")}</p>}
          <p>{compound.overview}</p>
          <div className="launch-hero__actions">
            <GlowButton href={`/products/${compound.slug}`}>View research material</GlowButton>
            <GlowButton href="/contact" variant="secondary">Ask Vanguard</GlowButton>
          </div>
        </div>
        <div className="launch-metric-grid">
          <div><strong>{compound.areasOfStudy.length}</strong><span>Study directions</span></div>
          <div><strong>{verifiedReferences}</strong><span>Published citations</span></div>
          <div><strong>{compound.faq.length}</strong><span>Reviewed FAQs</span></div>
          <div><strong>{compound.lastReviewed.slice(0, 4)}</strong><span>Latest review year</span></div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Research profile structure">
        <div><Microscope /><span><strong>Mechanism separated</strong>Biological rationale is not treated as outcome evidence</span></div>
        <div><FlaskConical /><span><strong>Research areas</strong>Study directions are described without human-use instruction</span></div>
        <div><ShieldAlert /><span><strong>Limitations published</strong>Safety and uncertainty remain visible</span></div>
        <div><CalendarCheck /><span><strong>Review record</strong>Last review date and editorial status disclosed</span></div>
      </section>

      <section className="product-information-grid mt-5">
        <ResearchCard kicker="Educational overview" title="What this profile covers"><p>{compound.overview}</p></ResearchCard>
        <ResearchCard kicker="Research mechanism" title="Biological rationale under study"><p>{compound.mechanism}</p></ResearchCard>
        <ResearchCard kicker="Areas of study" title="Current research directions"><ul>{compound.areasOfStudy.map((area) => <li key={area}>{area}</li>)}</ul></ResearchCard>
        <ResearchCard kicker="Safety & limitations" title="What remains uncertain"><p>{compound.safety}</p></ResearchCard>
      </section>

      <section className="product-detail-lower mt-5">
        <div className="product-detail-lower__research">
          <div className="launch-section-heading">
            <div className="launch-kicker">Frequently asked questions</div>
            <h2>Questions answered within the evidence boundaries.</h2>
          </div>
          <div className="product-faq-list">
            {compound.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className="product-inquiry-panel">
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 text-vanguard-amber"><BookOpenCheck size={18} /><span className="launch-kicker">Source record</span></div>
            <h2>References and editorial status</h2>
            <div className="mt-5"><References refs={compound.references} /></div>
            <p className="mt-5 border-t border-white/10 pt-4 text-[10px] leading-relaxed text-muted">Last reviewed: {compound.lastReviewed} · Editorial status: {compound.reviewStatus.replaceAll("_", " ")} · Unverified references are not presented as verified citations.</p>
          </GlassCard>
          <DisclaimerBanner text={DISCLAIMER} />
        </aside>
      </section>

      <section className="launch-cta-panel">
        <div>
          <div className="launch-kicker">Continue the research journey</div>
          <h2>Move from the profile to documentation or the research catalog.</h2>
          <p>The product page contains available formats, documentation support, and the appropriate reviewed business workflow for this compound.</p>
        </div>
        <GlowButton href={`/products/${compound.slug}`}>Open product details</GlowButton>
      </section>
    </article>
  );
}

function ResearchCard({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <GlassCard className="launch-content-card">
      <div className="launch-kicker">{kicker}</div>
      <h2>{title}</h2>
      <div className="mt-3 text-sm leading-7 text-muted">{children}</div>
    </GlassCard>
  );
}
