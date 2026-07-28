import Link from "next/link";
import { BadgeCheck, BookOpenCheck, BrainCircuit, Medal, ShieldCheck, Sparkles } from "lucide-react";
import { HeroVial } from "@/components/hero-vial";
import { JessiePortrait } from "@/components/brand";
import { DisclaimerBanner, GlassCard, GlowButton } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";

export const metadata = {
  title: "About Vanguard",
  description: "Veteran-owned research materials, evidence-based education, and AI software built around integrity, discipline, and transparent claims.",
};

const VALUES = [
  { title: "Tell the truth", description: "Evidence is graded honestly, including when the answer is that the research is thin or incomplete.", Icon: BadgeCheck },
  { title: "Education before commerce", description: "Researchers should understand the evidence, limitations, and documentation before discussing a product.", Icon: BookOpenCheck },
  { title: "Disciplined operations", description: "Repeatable review, sourcing, documentation, and fulfillment processes protect trust better than marketing language.", Icon: ShieldCheck },
  { title: "Build for professionals", description: "The catalog, AI support, and Peptastic workflows are designed around real laboratories, clinics, and business teams.", Icon: BrainCircuit },
];

const PILLARS = [
  { title: "Evidence Library", description: "Research profiles that separate human findings, preclinical signals, and unanswered questions.", href: "/education", cta: "Explore the research" },
  { title: "Research Materials", description: "A reviewed business catalog with strength-aware vial labeling, documentation support, and server-validated ordering.", href: "/products", cta: "Open the catalog" },
  { title: "Peptastic AI OS", description: "Clinic operations, knowledge continuity, staff support, scheduling, inventory, analytics, and AI assistance in one platform.", href: "/peptastic", cta: "See Peptastic" },
];

export default function AboutPage() {
  return (
    <div className="launch-page about-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Veteran Owned · Mission Driven</div>
          <h1>The company that would rather earn trust than manufacture certainty.</h1>
          <p>
            Vanguard Performance Labs combines research materials, evidence-based education, and AI software under one operating principle: make the claim only when the documentation can support it.
          </p>
          <div className="launch-hero__actions">
            <GlowButton href="/education">Explore the evidence</GlowButton>
            <GlowButton href="/contact" variant="secondary">Talk to Vanguard</GlowButton>
          </div>
        </div>
        <div className="relative z-[1] flex min-h-[340px] items-center justify-center">
          <div className="absolute h-64 w-64 rounded-full bg-vanguard-violet/20 blur-3xl" />
          <HeroVial width={360} />
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Vanguard values">
        <div><Medal /><span><strong>Veteran owned</strong>Integrity, discipline, and service</span></div>
        <div><BadgeCheck /><span><strong>Evidence graded</strong>Limitations are published, not hidden</span></div>
        <div><ShieldCheck /><span><strong>Human reviewed</strong>Orders, claims, and content are controlled</span></div>
        <div><Sparkles /><span><strong>AI with boundaries</strong>Useful support without pretending to be a clinician</span></div>
      </section>

      <section className="mt-8">
        <div className="launch-section-heading text-center">
          <div className="launch-kicker">Three connected businesses</div>
          <h2>Education, research supply, and clinic technology strengthen each other.</h2>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <GlassCard key={pillar.title} className="group flex min-h-[260px] flex-col p-7 transition hover:-translate-y-1 hover:border-vanguard-violet/40">
              <div className="font-mono text-[10px] font-bold tracking-[.18em] text-vanguard-amber">0{index + 1}</div>
              <h3 className="mt-4 font-serif text-3xl font-normal text-bone">{pillar.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{pillar.description}</p>
              <Link href={pillar.href} className="mt-5 text-sm font-semibold text-vanguard-amber transition group-hover:text-vanguard-gold">{pillar.cta} →</Link>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {VALUES.map(({ title, description, Icon }) => (
          <GlassCard key={title} className="p-6">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-vanguard-amber/25 bg-vanguard-amber/[0.06] text-vanguard-amber"><Icon size={20} /></span>
              <div>
                <h2 className="font-serif text-2xl font-normal text-bone">{title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </section>

      <section className="mt-8 grid items-center gap-8 rounded-[24px] border border-vanguard-violet/25 bg-[linear-gradient(135deg,rgba(168,85,247,.09),rgba(227,180,90,.05),rgba(8,7,18,.98))] p-7 lg:grid-cols-[340px_1fr] lg:p-10">
        <div className="relative mx-auto w-[280px]">
          <div className="absolute inset-8 -z-10 rounded-full bg-vanguard-violet/25 blur-3xl" />
          <div className="jessie-rim overflow-hidden rounded-[24px] border border-white/12">
            <JessiePortrait size={340} variant="hero" />
          </div>
        </div>
        <div>
          <div className="launch-kicker">Meet Jessie</div>
          <h2 className="mt-3 font-serif text-4xl font-normal leading-tight text-bone sm:text-5xl">An AI concierge designed to say “I don’t know” before she guesses.</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
            Jessie helps visitors find research profiles, understand evidence grades, navigate the catalog, and reach the right Vanguard team. Dosing, diagnosis, treatment, injection, and human-use questions are refused before a paid model call is made.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <GlowButton href="/education">See the evidence library</GlowButton>
            <GlowButton href="/peptastic" variant="secondary">See Jessie inside Peptastic</GlowButton>
          </div>
        </div>
      </section>

      <section className="launch-cta-panel">
        <div>
          <div className="launch-kicker">Mission continuity</div>
          <h2>Built to become more trustworthy as it grows.</h2>
          <p>Vanguard’s long-term advantage is not louder marketing. It is disciplined evidence review, durable operations, and software that preserves what the team learns.</p>
        </div>
        <GlowButton href="/partnerships">Build with Vanguard</GlowButton>
      </section>

      <div className="launch-legal"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
