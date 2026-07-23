import Link from "next/link";
import { Hero } from "@/components/hero";
import { PillarRow, TrustedBy, NewsletterBand } from "@/components/home-sections";
import { Reveal } from "@/components/motion";
import { GlassCard, GlowButton, SectionHeading, EvidenceTag } from "@/components/ui";
import { COMPOUNDS, PEPTASTIC_FEATURES, ROLE_CARDS } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarRow />

      {/* Popular research education */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <Reveal><SectionHeading kicker="Education First" title="Explore the Research"
          sub="Honest, evidence-graded education on the compounds people ask about most." /></Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPOUNDS.slice(0, 6).map((c) => (
            <Link key={c.slug} href={`/education/${c.slug}`}>
              <GlassCard className="card-lift h-full p-5 hover:border-vanguard-violet/40">
                <div className="flex items-center justify-between">
                  <div className="font-display text-lg font-bold text-bone">{c.name}</div>
                  <span className="rounded-full border border-vanguard-violet/40 bg-vanguard-violet/10 px-2 py-0.5 text-[10px] font-semibold text-vanguard-violet">{c.category}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{c.overview}</p>
                <div className="mt-4"><EvidenceTag level={c.evidence} /></div>
              </GlassCard>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center"><GlowButton href="/education" variant="secondary">View full library</GlowButton></div>
      </section>

      {/* Veteran mission */}
      <section className="border-y border-white/10 bg-ink-1">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-vanguard-gold/40 bg-vanguard-gold/10 px-3 py-1 text-[10px] font-bold tracking-wide text-vanguard-gold">★ VETERAN OWNED · VETERAN RAN</div>
            <h2 className="font-display text-3xl font-bold text-bone">Mission-Driven. Science-Aware.</h2>
            <p className="mt-4 text-muted">Built on discipline, integrity, and straight talk. We give people the truth about the research — what&apos;s solid, what&apos;s early, and what still belongs with a licensed professional.</p>
            <div className="mt-6"><GlowButton href="/about">Our Mission</GlowButton></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[["Evidence-graded", "Every entry rated honestly"], ["Primary sources", "Studies, not marketing"], ["Veteran-led", "Built on service values"]].map(([n, l]) => (
              <GlassCard key={l} className="p-5 text-center">
                <div className="font-display text-base font-black leading-tight text-vanguard-violet">{n}</div>
                <div className="text-xs text-muted">{l}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Peptastic showcase teaser */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <Reveal><SectionHeading kicker="Peptastic Software" title="The AI Operating System for Modern Clinics"
          sub="One Vanguard product: the platform running med spas, longevity, and wellness clinics behind the scenes." /></Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PEPTASTIC_FEATURES.slice(0, 5).map((f) => (
            <GlassCard key={f.title} className="p-5">
              <div className="font-display font-bold text-bone">{f.title}</div>
              <p className="mt-2 text-xs text-muted">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-8 text-center"><GlowButton href="/peptastic">Book a Peptastic Demo</GlowButton></div>
      </section>

      {/* Roles */}
      <section className="border-t border-white/10 bg-ink-1">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <SectionHeading kicker="Built for every seat" title="How AI Helps Each Role" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROLE_CARDS.map((r) => (
              <GlassCard key={r.role} className="p-5">
                <div className="font-display font-bold text-vanguard-violet">{r.role}</div>
                <p className="mt-2 text-sm text-muted">{r.blurb}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-20 text-center">
        <h2 className="font-display text-3xl font-bold text-bone sm:text-4xl">Ready to see what Vanguard can do?</h2>
        <p className="mt-4 text-muted">Explore the research, or book a Peptastic demo for your clinic.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GlowButton href="/peptastic">Book a Demo</GlowButton>
          <GlowButton href="/contact" variant="secondary">Contact Sales</GlowButton>
        </div>
      </section>

      <TrustedBy />
      <NewsletterBand />
    </>
  );
}
