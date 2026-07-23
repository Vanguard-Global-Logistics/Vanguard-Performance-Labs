import Link from "next/link";
import { GlassCard, GlowButton, DisclaimerBanner } from "@/components/ui";
import { WingedVial } from "@/components/brand";
import { DISCLAIMER } from "@/lib/content";

export const metadata = {
  title: "About Vanguard",
  description: "Veteran-owned biotechnology, education, and AI software company built on evidence-first principles.",
};

const VALUES = [
  { t: "Tell the truth", d: "We grade evidence honestly — including when the research is thin or the answer is 'we don't know yet.'" },
  { t: "Education before commerce", d: "People should understand the science before anyone talks to them about a product." },
  { t: "Discipline", d: "Military-grade process applied to sourcing, documentation, and quality." },
  { t: "Build for professionals", d: "Clinics and laboratories need tools that respect how they actually operate." },
];

const PILLARS = [
  { t: "Education", d: "A world-class library covering mechanisms, research status, and references for the compounds people actually ask about.", href: "/education", cta: "Explore the library" },
  { t: "Research Products", d: "Research-use-only materials for qualified businesses, with documentation and reviewed accounts.", href: "/products", cta: "View catalog" },
  { t: "Peptastic OS", d: "AI-powered clinic management — CRM, scheduling, inventory, analytics, and an AI concierge.", href: "/peptastic", cta: "See the platform" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-hero border-b border-white/10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-vanguard-gold/40 bg-vanguard-gold/10 px-3 py-1 text-[10px] font-bold tracking-wide text-vanguard-gold">
              ★ VETERAN OWNED · VETERAN RAN
            </div>
            <h1 className="font-display text-4xl font-black leading-tight text-bone sm:text-5xl">
              The brand that <span className="bg-vg-grad bg-clip-text text-transparent">tells the truth.</span>
            </h1>
            <p className="mt-5 max-w-lg text-muted">
              Vanguard Performance Labs is a biotechnology, education, AI software, and research company.
              We exist because this industry is full of confident claims and short on honest evidence.
              We&apos;d rather be the company that says &quot;the research is limited&quot; and keeps your trust.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <GlowButton href="/education">Explore the Science</GlowButton>
              <GlowButton href="/contact" variant="secondary">Talk to Us</GlowButton>
            </div>
          </div>
          <div className="flex justify-center"><WingedVial size={320} label /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-bone">What we do</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <GlassCard key={p.t} className="flex flex-col p-6">
              <h3 className="font-display text-lg font-bold text-bone">{p.t}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.d}</p>
              <Link href={p.href} className="mt-4 text-sm font-semibold text-vanguard-violet hover:underline">{p.cta} →</Link>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-1">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold text-bone">What we stand for</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {VALUES.map((v) => (
              <GlassCard key={v.t} className="p-6">
                <h3 className="font-display font-bold text-vanguard-violet">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.d}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-bone">Mission driven</h2>
        <p className="mt-4 text-muted">
          Built on military values of integrity, discipline, and service. The same standards that governed
          how we operated then govern how we source, document, and communicate now.
        </p>
        <div className="mt-8"><GlowButton href="/partnerships">Work With Us</GlowButton></div>
        <div className="mt-10 text-left"><DisclaimerBanner text={DISCLAIMER} /></div>
      </section>
    </div>
  );
}
