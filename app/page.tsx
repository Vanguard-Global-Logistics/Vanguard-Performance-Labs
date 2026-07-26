import Link from "next/link";
import { ShieldCheck, FlaskConical, Snowflake, BadgeCheck, Flag } from "lucide-react";
import { COMPOUNDS, PEPTASTIC_FEATURES, DISCLAIMER } from "@/lib/content";
import { GlassCard, GlowButton, EvidenceTag, DisclaimerBanner } from "@/components/ui";
import { JessiePortrait } from "@/components/brand";
import { HeroVial } from "@/components/hero-vial";
import { ProductVial } from "@/components/product-vial";
import { Station, Depth, DepthGauge } from "@/components/journey";
import { JourneyNudge } from "@/components/journey-nudge";
import { cartEligible } from "@/types";

export default function HomePage() {
  const featured = COMPOUNDS.filter((c) => c.references.some((r) => r.citation)).slice(0, 4);
  const sellable = COMPOUNDS.filter((c) => cartEligible(c.regulatory) && c.variants?.length).slice(0, 5);

  return (
    <div className="journey">
      <DepthGauge />

      {/* ── 00 ARRIVAL ─────────────────────────────────────── */}
      <Station id="arrival" index={0} label="Arrival" className="bg-hero horizon" footer={<JourneyNudge />}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="stagger mb-5 inline-flex items-center gap-2 rounded-full border border-vanguard-gold/40 bg-vanguard-gold/10 px-3 py-1 text-[10px] font-bold tracking-widest text-vanguard-gold">
              <Flag size={11} /> VETERAN OWNED · VETERAN RAN
            </div>
            <h1 className="stagger font-display text-5xl font-black leading-[0.98] text-bone sm:text-6xl xl:text-7xl" style={{ "--d": "80ms" } as React.CSSProperties}>
              Peptide science,
              <br />
              <span className="shimmer bg-vg-grad bg-clip-text text-transparent">held to the evidence.</span>
            </h1>
            <p className="stagger mt-6 max-w-lg text-lg leading-relaxed text-muted" style={{ "--d": "160ms" } as React.CSSProperties}>
              Research materials for qualified businesses, an education library that tells you where the
              evidence is thin, and AI software for the clinics doing the work.
            </p>
            <div className="stagger mt-8 flex flex-wrap gap-3" style={{ "--d": "240ms" } as React.CSSProperties}>
              <GlowButton href="/education">Explore the research</GlowButton>
              <GlowButton href="/peptastic" variant="secondary">See Peptastic</GlowButton>
            </div>
          </div>

          <Depth z={1.4} className="relative hidden justify-center lg:flex">
            <div className="float-slow glow-pulse">
              <HeroVial width={520} />
            </div>
          </Depth>
        </div>

      </Station>

      {/* ── 01 THE LIBRARY ─────────────────────────────────── */}
      <Station id="library" index={1} label="Research Library" className="horizon">
        <div className="mb-10 max-w-2xl">
          <div className="stagger font-mono text-[10px] tracking-[0.3em] text-vanguard-violet">01 — THE LIBRARY</div>
          <h2 className="stagger mt-3 font-display text-4xl font-black text-bone sm:text-5xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            We publish what the studies actually found.
          </h2>
          <p className="stagger mt-4 text-muted" style={{ "--d": "140ms" } as React.CSSProperties}>
            Every compound carries an evidence grade, and citations link straight to PubMed. Where human
            trials do not exist, we say so.
          </p>
        </div>

        <Depth z={0.4}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((c, i) => (
              <Link key={c.slug} href={`/education/${c.slug}`} className="stagger block" style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                <GlassCard className="tilt flex h-full flex-col p-5">
                  <div className="font-display text-lg font-bold text-bone">{c.name}</div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">{c.overview}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <EvidenceTag level={c.evidence} />
                    <span className="font-mono text-[10px] text-vanguard-violet">
                      {c.references.filter((r) => r.citation).length} refs
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

      {/* ── 02 THE CATALOG ─────────────────────────────────── */}
      <Station id="catalog" index={2} label="Catalog" className="horizon">
        <div className="mb-10 max-w-2xl">
          <div className="stagger font-mono text-[10px] tracking-[0.3em] text-vanguard-violet">02 — THE CATALOG</div>
          <h2 className="stagger mt-3 font-display text-4xl font-black text-bone sm:text-5xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            Research materials, documented and cold-chained.
          </h2>
          <p className="stagger mt-4 text-muted" style={{ "--d": "140ms" } as React.CSSProperties}>
            {COMPOUNDS.length} compounds. Certificates of analysis for approved accounts. Business orders only.
          </p>
        </div>

        <Depth z={0.7}>
          <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-10">
            {sellable.map((c, i) => (
              <Link key={c.slug} href={`/products/${c.slug}`}
                className={`stagger group flex flex-col items-center ${i % 2 ? "float-mid" : "float-slow"}`}
                style={{ "--d": `${i * 80}ms`, animationDelay: `${i * 0.4}s` } as React.CSSProperties}>
                <ProductVial slug={c.slug} name={c.name} strength={c.strength} size={92} />
                <span className="mt-3 font-display text-sm font-bold text-bone group-hover:text-vanguard-violet">{c.name}</span>
                {c.variants?.[0] && (
                  <span className="font-mono text-[10px] text-muted">from ${c.variants[0].price.toFixed(2)}</span>
                )}
              </Link>
            ))}
          </div>
        </Depth>

        <div className="stagger mt-12 flex flex-wrap justify-center gap-3" style={{ "--d": "400ms" } as React.CSSProperties}>
          <GlowButton href="/products">Browse all products</GlowButton>
          <GlowButton href="/specialty-request" variant="secondary">Request specialty sourcing</GlowButton>
        </div>
      </Station>

      {/* ── 03 PEPTASTIC ───────────────────────────────────── */}
      <Station id="peptastic" index={3} label="Peptastic OS" className="horizon">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="stagger font-mono text-[10px] tracking-[0.3em] text-vanguard-violet">03 — PEPTASTIC OS</div>
            <h2 className="stagger mt-3 font-display text-4xl font-black text-bone sm:text-5xl" style={{ "--d": "80ms" } as React.CSSProperties}>
              The operating system for modern clinics.
            </h2>
            <p className="stagger mt-4 max-w-lg text-muted" style={{ "--d": "140ms" } as React.CSSProperties}>
              CRM, scheduling, inventory, and an AI assistant trained on the clinic&apos;s own approved
              workflows — so knowledge compounds instead of walking out the door.
            </p>
            <div className="stagger mt-7" style={{ "--d": "220ms" } as React.CSSProperties}>
              <GlowButton href="/peptastic">Book a working session</GlowButton>
            </div>
          </div>

          <Depth z={0.9}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PEPTASTIC_FEATURES.slice(0, 6).map((f, i) => (
                <div key={f.title} className="stagger" style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
                  <GlassCard className="tilt h-full p-4">
                    <div className="font-display text-sm font-bold text-bone">{f.title}</div>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{f.desc}</p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </Depth>
        </div>
      </Station>

      {/* ── 04 THE STANDARD ────────────────────────────────── */}
      <Station id="standard" index={4} label="The Standard" className="horizon">
        <div className="mb-10 max-w-2xl">
          <div className="stagger font-mono text-[10px] tracking-[0.3em] text-vanguard-violet">04 — THE STANDARD</div>
          <h2 className="stagger mt-3 font-display text-4xl font-black text-bone sm:text-5xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            How we operate.
          </h2>
        </div>

        <Depth z={0.3}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: ShieldCheck, t: "Evidence graded", d: "Every compound carries an honest grade — including when the data is thin." },
              { icon: FlaskConical, t: "Documented purity", d: "Certificates of analysis available to approved accounts." },
              { icon: Snowflake, t: "Cold chain", d: "Temperature-controlled handling to business addresses." },
              { icon: BadgeCheck, t: "Reviewed orders", d: "Every order is reviewed by a person before it ships." },
              { icon: Flag, t: "Veteran run", d: "Built on discipline and straight answers." },
            ].map((p, i) => (
              <div key={p.t} className="stagger" style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                <GlassCard className="tilt h-full p-5">
                  <p.icon size={20} className="text-vanguard-violet" />
                  <div className="mt-3 font-display font-bold text-bone">{p.t}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{p.d}</p>
                </GlassCard>
              </div>
            ))}
          </div>
        </Depth>
      </Station>

      {/* ── 05 CONTACT ─────────────────────────────────────── */}
      <Station id="contact" index={5} label="Contact">
        <div className="mx-auto max-w-3xl text-center">
          <Depth z={1.1} className="mb-8 flex justify-center">
            <div className="float-slow h-28 w-28 overflow-hidden rounded-2xl border border-white/10">
              <JessiePortrait size={112} variant="portrait" />
            </div>
          </Depth>
          <div className="stagger font-mono text-[10px] tracking-[0.3em] text-vanguard-violet">05 — CONTACT</div>
          <h2 className="stagger mt-3 font-display text-4xl font-black text-bone sm:text-5xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            Tell us what you need.
          </h2>
          <p className="stagger mx-auto mt-4 max-w-md text-muted" style={{ "--d": "140ms" } as React.CSSProperties}>
            Wholesale accounts, specialty sourcing, Peptastic demos, or a question about the research.
            Jessie can point you, or talk to a person.
          </p>
          <div className="stagger mt-8 flex flex-wrap justify-center gap-3" style={{ "--d": "220ms" } as React.CSSProperties}>
            <GlowButton href="/contact">Contact sales</GlowButton>
            <GlowButton href="/wholesale" variant="secondary">Apply for wholesale</GlowButton>
          </div>
          <div className="stagger mt-12" style={{ "--d": "300ms" } as React.CSSProperties}>
            <DisclaimerBanner text={DISCLAIMER} />
          </div>
        </div>
      </Station>
    </div>
  );
}
