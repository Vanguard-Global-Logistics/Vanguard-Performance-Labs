import Link from "next/link";
import { GlassCard, GlowButton, EvidenceTag, DisclaimerBanner } from "@/components/ui";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";

export const metadata = {
  title: "Scientific Research",
  description: "How Vanguard grades evidence, and what the research currently shows across studied compounds.",
};

const GRADES = [
  { level: "strong" as const, d: "Multiple well-designed human trials with consistent findings. Regulatory review or approval in at least one indication." },
  { level: "moderate" as const, d: "Human studies exist but are limited in size, duration, or consistency. Direction is promising; certainty is not." },
  { level: "limited" as const, d: "Mostly animal or in-vitro work. Little or no controlled human data. Popular online ≠ proven." },
  { level: "insufficient" as const, d: "Not enough credible published work to characterize at all." },
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="max-w-2xl">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-vanguard-violet">Scientific Research</div>
        <h1 className="mt-2 font-display text-4xl font-black text-bone">How We Read the Evidence</h1>
        <p className="mt-3 text-muted">
          Most peptide marketing treats every compound as equally proven. It isn&apos;t. We publish an explicit
          evidence grade with every entry so you can tell the difference between a well-studied therapeutic
          and an interesting animal result.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-bone">Our evidence grades</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {GRADES.map((g) => (
            <GlassCard key={g.level} className="p-5">
              <EvidenceTag level={g.level} />
              <p className="mt-3 text-sm leading-relaxed text-muted">{g.d}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-bone">Where each compound currently sits</h2>
        <p className="mt-2 text-sm text-muted">Grades are reviewed as new research publishes. Last review date appears on every profile.</p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Compound</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Evidence</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {COMPOUNDS.map((c) => (
                <tr key={c.slug} className="border-t border-white/10">
                  <td className="px-4 py-3">
                    <Link href={`/education/${c.slug}`} className="font-semibold text-bone hover:text-vanguard-violet">{c.name}</Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{c.category}</td>
                  <td className="px-4 py-3"><EvidenceTag level={c.evidence} /></td>
                  <td className="px-4 py-3 text-xs text-muted">{c.researchStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-bone">How to read a study</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { t: "Animal ≠ human", d: "A result in rodents is a hypothesis about humans, not a finding in them. Most peptide research stops here." },
            { t: "Size and duration", d: "A 12-person, 4-week study can show a signal. It cannot establish safety over years." },
            { t: "Who funded it", d: "Funding doesn't invalidate research, but it belongs in how you weigh a single positive result." },
          ].map((x) => (
            <GlassCard key={x.t} className="p-5">
              <h3 className="font-display font-bold text-vanguard-violet">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{x.d}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <GlowButton href="/education">Browse the library</GlowButton>
        <GlowButton href="/professionals" variant="secondary">For clinicians</GlowButton>
      </div>
      <div className="mt-8"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
