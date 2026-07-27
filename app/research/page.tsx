import Link from "next/link";
import { BarChart3, BookOpenCheck, Microscope, Scale, ShieldCheck } from "lucide-react";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { DisclaimerBanner, EvidenceTag, GlassCard, GlowButton } from "@/components/ui";

export const metadata = {
  title: "Scientific Research",
  description: "How Vanguard grades evidence and distinguishes human findings, preclinical signals, limitations, and unanswered research questions.",
};

const GRADES = [
  { level: "strong" as const, title: "Strong", description: "Multiple well-designed human studies with reasonably consistent findings. Strong does not mean universal, risk-free, or appropriate for human use through this website." },
  { level: "moderate" as const, title: "Moderate", description: "Human studies exist, but sample size, duration, replication, or consistency limits certainty." },
  { level: "limited" as const, title: "Limited", description: "Evidence is largely animal, in-vitro, mechanistic, observational, or otherwise insufficient for confident human conclusions." },
  { level: "insufficient" as const, title: "Insufficient", description: "Credible published evidence is too sparse or unclear to characterize the claim responsibly." },
];

export default function ResearchPage() {
  const counts = GRADES.map((grade) => ({ ...grade, count: COMPOUNDS.filter((compound) => compound.evidence === grade.level).length }));
  const cited = COMPOUNDS.reduce((sum, compound) => sum + compound.references.filter((reference) => reference.citation).length, 0);

  return (
    <div className="launch-page research-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Scientific Research</div>
          <h1>A confidence label is not evidence. Here is how Vanguard separates the two.</h1>
          <p>
            Every research profile receives an explicit evidence grade, source record, limitation statement, and review date. Popularity, online repetition, and supplier claims do not increase the grade.
          </p>
          <div className="launch-hero__actions">
            <GlowButton href="/education">Open the evidence library</GlowButton>
            <GlowButton href="/articles" variant="secondary">Read research articles</GlowButton>
          </div>
        </div>
        <div className="launch-metric-grid">
          <div><strong>{COMPOUNDS.length}</strong><span>Research profiles</span></div>
          <div><strong>{cited}</strong><span>Citation records</span></div>
          <div><strong>4</strong><span>Evidence grades</span></div>
          <div><strong>1</strong><span>Published standard</span></div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Research review standards">
        <div><Microscope /><span><strong>Model identified</strong>Human, animal, in-vitro, review, or observational</span></div>
        <div><Scale /><span><strong>Limitations stated</strong>Sample size, duration, consistency, and bias</span></div>
        <div><BookOpenCheck /><span><strong>Sources verified</strong>Unverified citations stay unpublished</span></div>
        <div><ShieldCheck /><span><strong>No clinical substitution</strong>Education does not become medical advice</span></div>
      </section>

      <section className="mt-8">
        <div className="launch-section-heading text-center">
          <div className="launch-kicker">Evidence grading system</div>
          <h2>Four grades. No “promising” category that hides uncertainty.</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {counts.map((grade) => (
            <GlassCard key={grade.level} className="flex min-h-[260px] flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <EvidenceTag level={grade.level} />
                <span className="font-serif text-3xl text-vanguard-amber">{grade.count}</span>
              </div>
              <h3 className="mt-5 font-serif text-3xl font-normal text-bone">{grade.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{grade.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="launch-section-heading">
          <div className="launch-kicker">Current catalog map</div>
          <h2>Where every listed compound currently sits.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">Grades change only when the underlying published record changes. The profile page shows the latest review date and source notes.</p>
        </div>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-[linear-gradient(155deg,rgba(15,12,29,.94),rgba(7,7,17,.96))]">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.035] font-mono text-[10px] uppercase tracking-[.14em] text-vanguard-amber">
              <tr>
                <th className="px-5 py-4 font-semibold">Compound</th>
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold">Evidence</th>
                <th className="px-5 py-4 font-semibold">Research status</th>
              </tr>
            </thead>
            <tbody>
              {COMPOUNDS.map((compound) => (
                <tr key={compound.slug} className="border-t border-white/[0.07] transition hover:bg-vanguard-violet/[0.035]">
                  <td className="px-5 py-4"><Link href={`/education/${compound.slug}`} className="font-semibold text-bone hover:text-vanguard-amber">{compound.name}</Link></td>
                  <td className="px-5 py-4 text-muted">{compound.category}</td>
                  <td className="px-5 py-4"><EvidenceTag level={compound.evidence} /></td>
                  <td className="px-5 py-4 text-xs text-muted">{compound.researchStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {[
          { title: "Animal data is a hypothesis", description: "A result in rodents can justify more research. It does not establish the same outcome, safety, or dose relationship in humans.", Icon: Microscope },
          { title: "Size and duration matter", description: "A small, short study may detect a signal while remaining unable to establish long-term safety, rare events, or durable benefit.", Icon: BarChart3 },
          { title: "Funding and design matter", description: "Industry funding does not automatically invalidate a study, but sponsorship, controls, endpoints, attrition, and publication bias affect confidence.", Icon: Scale },
        ].map(({ title, description, Icon }) => (
          <GlassCard key={title} className="p-6">
            <Icon className="text-vanguard-amber" />
            <h3 className="mt-4 font-serif text-2xl font-normal text-bone">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
          </GlassCard>
        ))}
      </section>

      <section className="launch-cta-panel">
        <div>
          <div className="launch-kicker">Read the source record</div>
          <h2>Move from a marketing claim to the actual research profile.</h2>
          <p>Search the library by compound, alias, category, or evidence level. Each profile separates mechanism, study direction, safety limitations, FAQs, and verified citations.</p>
        </div>
        <GlowButton href="/education">Browse the library</GlowButton>
      </section>

      <div className="launch-legal"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
