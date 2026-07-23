import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { GlassCard, EvidenceTag, DisclaimerBanner, GlowButton } from "@/components/ui";

export function generateStaticParams() {
  return COMPOUNDS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = COMPOUNDS.find((x) => x.slug === params.slug);
  if (!c) return { title: "Not found" };
  return { title: `${c.name} — Education`, description: c.overview };
}

export default function CompoundPage({ params }: { params: { slug: string } }) {
  const c = COMPOUNDS.find((x) => x.slug === params.slug);
  if (!c) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <Link href="/education" className="text-sm text-vanguard-violet hover:underline">← Education Library</Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-4xl font-black text-bone">{c.name}</h1>
        <EvidenceTag level={c.evidence} />
      </div>
      {c.aliases.length > 0 && <p className="mt-1 text-sm text-muted">Also known as: {c.aliases.join(", ")}</p>}
      <p className="mt-2 text-sm font-semibold text-vanguard-amber">{c.researchStatus}</p>

      <div className="mt-8 grid gap-4">
        <Block title="Educational Overview">{c.overview}</Block>
        <Block title="Research Mechanism">{c.mechanism}</Block>
        <Block title="Areas of Study">
          <ul className="list-disc pl-5">{c.areasOfStudy.map((a) => <li key={a}>{a}</li>)}</ul>
        </Block>
        <Block title="Safety Considerations">{c.safety}</Block>

        <GlassCard className="p-5">
          <div className="mb-3 text-sm font-bold text-bone">Frequently Asked Questions</div>
          <div className="space-y-3">
            {c.faq.map((f) => (
              <div key={f.q}>
                <div className="text-sm font-semibold text-bone">{f.q}</div>
                <div className="text-sm text-muted">{f.a}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-2 text-sm font-bold text-bone">References</div>
          <ul className="space-y-1 text-sm text-muted">
            {c.references.map((r, i) => (
              <li key={i}><span className="font-semibold text-vanguard-violet">{r.label}</span> — {r.note}</li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-muted">Last reviewed: {c.lastReviewed} · Status: {c.reviewStatus} · References verified by editorial review before publication.</p>
        </GlassCard>

        <div className="flex flex-wrap gap-3">
          <GlowButton href="/products">View research product</GlowButton>
          <GlowButton href="/contact" variant="secondary">Ask about this</GlowButton>
        </div>

        <DisclaimerBanner text={DISCLAIMER} />
      </div>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <GlassCard className="p-5">
      <div className="mb-2 text-sm font-bold text-bone">{title}</div>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </GlassCard>
  );
}
