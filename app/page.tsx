import Link from "next/link";
import {
  ShieldCheck,
  FlaskConical,
  Snowflake,
  BadgeCheck,
  Flag,
  Bot,
  BookOpenCheck,
  BriefcaseBusiness,
  Workflow,
  Scale,
} from "lucide-react";
import { COMPOUNDS, PEPTASTIC_FEATURES, DISCLAIMER } from "@/lib/content";
import { PUBLIC_AI_AGENTS } from "@/lib/ai-agents";
import { GlassCard, GlowButton, EvidenceTag, DisclaimerBanner } from "@/components/ui";
import { JessiePortrait } from "@/components/brand";
import { HeroVial } from "@/components/hero-vial";
import { JessieHero } from "@/components/jessie-hero";
import { ProductVial } from "@/components/product-vial";
import { Station, Depth, DepthGauge } from "@/components/journey";
import { JourneyNudge } from "@/components/journey-nudge";

const AGENT_ICONS = [Bot, BookOpenCheck, BriefcaseBusiness, Workflow, Scale];

export default function HomePage() {
  const featured = COMPOUNDS.filter((compound) => compound.references.some((reference) => reference.citation)).slice(0, 4);
  const catalogPreview = COMPOUNDS.filter((compound) => compound.regulatory !== "unavailable").slice(0, 5);

  return (
    <div className="journey">
      <DepthGauge />

      <Station id="arrival" index={0} label="Arrival" className="bg-hero horizon" footer={<JourneyNudge />}>
        <div className="space-y-12">
          <div className="max-w-3xl">
            <div className="stagger mb-5 inline-flex items-center gap-2 rounded-full border border-vanguard-gold/40 bg-vanguard-gold/10 px-3 py-1 text-[10px] font-bold tracking-widest text-vanguard-gold">
              <Flag size={11} /> VETERAN OWNED · VETERAN RAN
            </div>
            <h1 className="stagger font-display text-4xl font-black leading-[0.98] text-bone sm:text-5xl xl:text-6xl" style={{ "--d": "80ms" } as React.CSSProperties}>
              Research education and professional support,{
              " "}<span className="shimmer bg-vg-grad bg-clip-text text-transparent">held to the evidence.</span>
            </h1>
            <p className="stagger mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg" style={{ "--d": "140ms" } as React.CSSProperties}>
              Vanguard Performance Labs brings together an evidence-graded education library, professional research-material inquiries, and AI-powered clinic-operations technology.
            </p>
          </div>

          <div className="stagger" style={{ "--d": "200ms" } as React.CSSProperties}>
            <JessieHero />
          </div>

          <Depth z={1.2} className="pointer-events-none absolute right-[3%] top-1/2 hidden -translate-y-1/2 opacity-45 xl:block">
            <div className="float-slow"><HeroVial width={430} /></div>
          </Depth>
        </div>
      </Station>

      <Station id="library" index={1} label="Research Library" className="horizon">
        <div className="mb-10 max-w-2xl">
          <div className="stagger font-mono text-[10px] tracking-[0.3em] text-vanguard-violet">01 — THE LIBRARY</div>
          <h2 className="stagger mt-3 font-display text-4xl font-black text-bone sm:text-5xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            Read what the studies actually found.
          </h2>
          <p className="stagger mt-4 text-muted" style={{ "--d": "140ms" } as React.CSSProperties}>
            Evidence grades distinguish human trials, animal studies, laboratory findings, reviews, and material still awaiting editorial verification.
          </p>
        </div>

        <Depth z={0.4}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((compound, index) => (
              <Link key={compound.slug} href={`/education/${compound.slug}`} className="stagger block" style={{ "--d": `${index * 70}ms` } as React.CSSProperties}>
                <GlassCard className="tilt flex h-full flex-col p-5">
                  <div className="font-display text-lg font-bold text-bone">{compound.name}</div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">{compound.overview}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <EvidenceTag level={compound.evidence} />
                    <span className="font-mono text-[10px] text-vanguard-violet">
                      {compound.references.filter((reference) => reference.citation).length} refs
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </Depth>

        <div className="stagger mt-8" style={{ "--d": "320ms" } as React.CSSProperties}>
          <GlowButton href="/education" variant="secondary">Open the full library</GlowButton>
        </div>
      </Station>

      <Station id="catalog" index={2} label="Research Materials" className="horizon">
        <div className="mb-10 max-w-2xl">
          <div className="stagger font-mono text-[10px] tracking-[0.3em] text-vanguard-violet">02 — PROFESSIONAL INQUIRIES</div>
          <h2 className="stagger mt-3 font-display text-4xl font-black text-bone sm:text-5xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            Research materials presented without consumer checkout.
          </h2>
          <p className="stagger mt-4 text-muted" style={{ "--d": "140ms" } as React.CSSProperties}>
            Qualified organizations can request information or a non-binding review. Catalog presence does not promise availability, eligibility, approval, or human use.
          </p>
        </div>

        <Depth z={0.7}>
          <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-10">
            {catalogPreview.map((compound, index) => (
              <Link
                key={compound.slug}
                href={`/products/${compound.slug}`}
                className={`stagger group flex max-w-[130px] flex-col items-center text-center ${index % 2 ? "float-mid" : "float-slow"}`}
                style={{ "--d": `${index * 80}ms`, animationDelay: `${index * 0.4}s` } as React.CSSProperties}
              >
                <ProductVial slug={compound.slug} name={compound.name} strength={compound.strength} size={92} />
                <span className="mt-3 font-display text-sm font-bold text-bone group-hover:text-vanguard-violet">{compound.name}</span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted">Professional inquiry</span>
              </Link>
            ))}
          </div>
        </Depth>

        <div className="stagger mt-12 flex flex-wrap justify-center gap-3" style={{ "--d": "400ms" } as React.CSSProperties}>
          <GlowButton href="/products">Explore research materials</GlowButton>
          <GlowButton href="/specialty-request" variant="secondary">Request specialty review</GlowButton>
        </div>
      </Station>

      <Station id="peptastic" index={3} label="Peptastic OS" className="horizon">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="stagger font-mono text-[10px] tracking-[0.3em] text-vanguard-violet">03 — PEPTASTIC OS</div>
            <h2 className="stagger mt-3 font-display text-4xl font-black text-bone sm:text-5xl" style={{ "--d": "80ms" } as React.CSSProperties}>
              A clinic-operations platform built around approved workflows.
            </h2>
            <p className="stagger mt-4 max-w-lg text-muted" style={{ "--d": "140ms" } as React.CSSProperties}>
              Organization management, scheduling, inventory concepts, and AI-guided knowledge access — with features represented according to their documented build status.
            </p>
            <div className="stagger mt-7" style={{ "--d": "220ms" } as React.CSSProperties}>
              <GlowButton href="/peptastic">Book a working session</GlowButton>
            </div>
          </div>

          <Depth z={0.9}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PEPTASTIC_FEATURES.slice(0, 6).map((feature, index) => (
                <div key={feature.title} className="stagger" style={{ "--d": `${index * 60}ms` } as React.CSSProperties}>
                  <GlassCard className="tilt h-full p-4">
                    <div className="font-display text-sm font-bold text-bone">{feature.title}</div>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{feature.desc}</p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </Depth>
        </div>
      </Station>

      <Station id="agents" index={4} label="AI Agent Network" className="horizon">
        <div className="mb-10 max-w-3xl">
          <div className="stagger font-mono text-[10px] tracking-[0.3em] text-vanguard-violet">04 — GUARDED AI ROUTING</div>
          <h2 className="stagger mt-3 font-display text-4xl font-black text-bone sm:text-5xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            One concierge, five narrowly defined responsibilities.
          </h2>
          <p className="stagger mt-4 text-muted" style={{ "--d": "140ms" } as React.CSSProperties}>
            Jessie routes each question to the appropriate specialist. The compliance gate intercepts prohibited medical, human-use, and unsupported-claim requests before they become answers.
          </p>
        </div>

        <Depth z={0.5}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PUBLIC_AI_AGENTS.map((agent, index) => {
              const Icon = AGENT_ICONS[index] ?? Bot;
              return (
                <div key={agent.id} className="stagger" style={{ "--d": `${index * 70}ms` } as React.CSSProperties}>
                  <GlassCard className="tilt h-full p-5">
                    <Icon size={20} className="text-vanguard-violet" />
                    <div className="mt-3 font-display font-bold text-bone">{agent.publicLabel}</div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{agent.purpose}</p>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </Depth>

        <div className="stagger mt-8 flex flex-wrap gap-3" style={{ "--d": "360ms" } as React.CSSProperties}>
          <GlowButton href="/contact">Ask for human review</GlowButton>
          <GlowButton href="/education" variant="secondary">Explore verified research</GlowButton>
        </div>
      </Station>

      <Station id="standard" index={5} label="The Standard" className="horizon">
        <div className="mb-10 max-w-2xl">
          <div className="stagger font-mono text-[10px] tracking-[0.3em] text-vanguard-violet">05 — THE STANDARD</div>
          <h2 className="stagger mt-3 font-display text-4xl font-black text-bone sm:text-5xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            Built to show the limits, not hide them.
          </h2>
        </div>

        <Depth z={0.3}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: ShieldCheck, t: "Evidence graded", d: "Human, animal, laboratory, review, and unverified material are distinguished." },
              { icon: FlaskConical, t: "Documentation available", d: "Product and research documentation is discussed with qualified professional accounts." },
              { icon: Snowflake, t: "Temperature-conscious handling", d: "Handling requirements are reviewed according to the material and shipment." },
              { icon: BadgeCheck, t: "Human review", d: "Professional inquiries are reviewed by a person before any commercial step." },
              { icon: Flag, t: "Veteran run", d: "Built around discipline, accountability, and straight answers." },
            ].map((principle, index) => (
              <div key={principle.t} className="stagger" style={{ "--d": `${index * 70}ms` } as React.CSSProperties}>
                <GlassCard className="tilt h-full p-5">
                  <principle.icon size={20} className="text-vanguard-violet" />
                  <div className="mt-3 font-display font-bold text-bone">{principle.t}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{principle.d}</p>
                </GlassCard>
              </div>
            ))}
          </div>
        </Depth>
      </Station>

      <Station id="contact" index={6} label="Contact">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Depth z={0.8} className="relative mx-auto w-[240px] shrink-0 sm:w-[300px] lg:w-[340px]">
            <div className="absolute inset-0 -z-10 rounded-[26px] bg-vanguard-violet/20 blur-3xl" />
            <div className="jessie-rim float-slow overflow-hidden rounded-[24px] border border-white/12">
              <JessiePortrait size={340} variant="hero" />
            </div>
          </Depth>

          <div className="text-center lg:text-left">
            <div className="stagger font-mono text-[10px] tracking-[0.3em] text-vanguard-violet">06 — CONTACT</div>
            <h2 className="stagger mt-3 font-display text-4xl font-black text-bone sm:text-5xl" style={{ "--d": "80ms" } as React.CSSProperties}>
              Tell us what your organization needs.
            </h2>
            <p className="stagger mt-4 max-w-md text-muted lg:mx-0 mx-auto" style={{ "--d": "140ms" } as React.CSSProperties}>
              Research education, professional inquiries, specialty reviews, partnerships, or a Peptastic working session. Jessie can route the request, and a person can review it.
            </p>
            <div className="stagger mt-8 flex flex-wrap justify-center gap-3 lg:justify-start" style={{ "--d": "220ms" } as React.CSSProperties}>
              <GlowButton href="/contact">Contact Vanguard</GlowButton>
              <GlowButton href="/wholesale" variant="secondary">Professional inquiry</GlowButton>
            </div>
            <div className="stagger mt-10 max-w-xl lg:mx-0 mx-auto" style={{ "--d": "300ms" } as React.CSSProperties}>
              <DisclaimerBanner text={DISCLAIMER} />
            </div>
          </div>
        </div>
      </Station>
    </div>
  );
}
