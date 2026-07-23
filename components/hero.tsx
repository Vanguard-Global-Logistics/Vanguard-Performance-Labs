"use client";
import { TrendingUp, Users, ShoppingCart, Activity, Mic, ShieldCheck, FlaskConical, Snowflake, BadgeCheck, Flag, Sparkles } from "lucide-react";
import { GlowButton, ParticleField } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { useEffect, useState } from "react";
import { readAndMarkVisit, timeGreeting } from "@/lib/visitor";
import { WingedVial, JessiePortrait } from "@/components/brand";

export function Hero() {
  return (
    <>
      {/* ── TOP: cinematic hero (Jessie + winged vial + concierge) ── */}
      <section className="bg-hero relative overflow-hidden">
        <ParticleField />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <Reveal delay={0}><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-vanguard-gold/40 bg-vanguard-gold/10 px-3 py-1 text-[10px] font-bold tracking-wide text-vanguard-gold">
              ★ VETERAN OWNED · VETERAN RAN
            </div></Reveal>
            <Reveal delay={90}><h1 className="font-display text-4xl font-black leading-[1.05] text-bone sm:text-5xl">
              The Future of Peptide Science.{" "}
              <span className="shimmer bg-vg-grad bg-clip-text text-transparent">Powered by AI.</span>
            </h1></Reveal>
            <Reveal delay={180}><p className="mt-5 max-w-md text-muted">
              Vanguard Performance Labs delivers research-grade education, real science, and intelligent
              software built to optimize health, performance, and longevity.
            </p></Reveal>
            <Reveal delay={270}><div className="mt-7 flex flex-wrap gap-3">
              <GlowButton href="/education">Explore Peptides</GlowButton>
              <GlowButton href="/peptastic" variant="secondary">Book a Demo</GlowButton>
            </div>
            <div className="mt-6 flex items-center gap-2 text-vanguard-gold">
              <span aria-hidden>★★★★★</span>
              <span className="text-xs font-bold tracking-wide">VETERAN OWNED. VETERAN RUN.</span>
            </div></Reveal>
          </div>

          <div className="relative lg:col-span-5">
            <Reveal variant="rv-scale" delay={150}><div className="flex items-end justify-center gap-2">
              <div className="hidden h-72 w-40 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:block">
                <JessiePortrait size={160} variant="hero" priority className="mx-auto" />
              </div>
              <div className="animate-float glow-pulse">
                <WingedVial size={330} label priority />
              </div>
            </div></Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal variant="rv-right" delay={260}><ConciergeRail /></Reveal>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-ink-1/60 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-5 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: FlaskConical, t: "Research Use Only", s: "Not for human consumption" },
              { icon: BadgeCheck, t: "99%+ Purity", s: "Third-Party Verified" },
              { icon: Sparkles, t: "Advanced Formula", s: "Precision Engineered" },
              { icon: Snowflake, t: "Store Cold", s: "Refrigerate 2-8°C" },
              { icon: ShieldCheck, t: "Quality Assured", s: "Batches Tested" },
              { icon: Flag, t: "Veteran Owned", s: "Veteran Ran" },
            ].map((x) => (
              <div key={x.t} className="flex items-center gap-2.5">
                <x.icon size={20} className="shrink-0 text-vanguard-gold" />
                <div>
                  <div className="text-xs font-bold text-bone">{x.t}</div>
                  <div className="text-[10px] text-muted">{x.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-ink-0">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <Reveal><div className="mb-6 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-vanguard-violet">Peptastic OS</div>
              <h2 className="mt-1 font-display text-2xl font-bold text-bone">AI-Powered Clinic Management</h2>
            </div>
            <div className="hidden items-end gap-4 sm:flex"><ScoreCard /></div>
          </div>
          <DashboardMock /></Reveal>
        </div>
      </section>
    </>
  );
}

function ScoreCard() {
  return (
    <div className="animate-float rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl">
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted">AI Optimization Score</div>
      <div className="mt-1 font-display text-3xl font-black text-vanguard-violet">97<span className="text-base text-muted">%</span></div>
      <div className="mt-1 text-[10px] text-muted">System performance excellent</div>
    </div>
  );
}

function DashboardMock() {
  const kpis = [
    { label: "Total Revenue", value: "$1,248,430", delta: "+18.2%", icon: TrendingUp },
    { label: "New Patients", value: "327", delta: "+12.5%", icon: Users },
    { label: "Appointments", value: "1,243", delta: "+22.1%", icon: Activity },
    { label: "Conversion Rate", value: "6.34%", delta: "+14.3%", icon: ShoppingCart },
  ];
  const bars = [38, 52, 44, 60, 55, 72, 64, 82, 70, 90];
  const topPeptides: [string, string][] = [
    ["BPC-157", "$245,420"], ["TB-500", "$182,310"], ["GHK-Cu", "$154,220"], ["CJC-1295", "$98,420"], ["Ipamorelin", "$81,210"],
  ];
  const orders: [string, string, string][] = [
    ["#ORD-1248", "$234.50", "2m ago"], ["#ORD-1247", "$189.99", "15m ago"], ["#ORD-1246", "$299.00", "1h ago"], ["#ORD-1245", "$198.50", "2h ago"],
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-1/80 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-bone">Executive Overview</span>
          <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-muted">Illustrative data</span>
        </div>
        <div className="text-[10px] text-vanguard-teal">● This Month</div>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <k.icon size={16} className="text-vanguard-violet" />
            <div className="mt-2 text-lg font-bold text-bone">{k.value}</div>
            <div className="text-[10px] text-muted">{k.label}</div>
            <div className="text-[10px] font-semibold text-vanguard-teal">{k.delta}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-3 px-4 pb-4 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs font-semibold text-bone">Revenue Performance</div>
            <div className="text-[10px] text-muted">Revenue \u00b7 New Patients</div>
          </div>
          <div className="flex h-32 items-end gap-1.5">
            {bars.map((h, i) => <div key={i} className="bar-grow flex-1 rounded-t bg-vg-grad" style={{ height: `${h}%`, "--bar-i": i } as React.CSSProperties} />)}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-3 text-xs font-semibold text-bone">Patient Activity</div>
          {([["New Consultations", "45"], ["Follow Ups", "128"], ["Lab Results", "96"], ["Protocols Updated", "32"]] as [string, string][]).map(([l, v]) => (
            <div key={l} className="flex items-center justify-between py-1.5 text-xs">
              <span className="text-muted">{l}</span><span className="font-semibold text-bone">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-3 px-4 pb-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-2 text-xs font-semibold text-bone">Top Research Interest</div>
          {topPeptides.map(([n, v], i) => (
            <div key={n} className="flex items-center justify-between py-1 text-xs">
              <span className="text-muted">{i + 1}. {n}</span><span className="font-semibold text-bone">{v}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-2 text-xs font-semibold text-bone">Recent Orders</div>
          {orders.map(([id, v, t]) => (
            <div key={id} className="flex items-center justify-between py-1 text-xs">
              <span className="text-muted">{id}</span><span className="font-semibold text-bone">{v}</span><span className="text-muted">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConciergeRail() {
  const [greet, setGreet] = useState("Hello! How can I assist you today?");
  useEffect(() => {
    const v = readAndMarkVisit();
    setGreet(v.returning ? `${timeGreeting()} — welcome back. How can I help today?` : `${timeGreeting()}! How can I assist you today?`);
  }, []);
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-ink-1/80 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-lg"><JessiePortrait size={48} variant="avatar" /></div>
        <div>
          <div className="text-sm font-bold text-bone">Jessie AI Concierge</div>
          <div className="text-[10px] text-vanguard-teal">● Online</div>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-bone">{greet}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {["Peptide Education", "Research Products", "Wholesale Inquiry", "Book a Demo", "Schedule Consult", "Customer Support"].map((q) => (
          <div key={q} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 text-[11px] text-bone">{q}</div>
        ))}
      </div>
      <div className="mt-3 flex items-end gap-1" aria-hidden>
        {[6, 12, 8, 16, 10, 18, 9, 14, 7, 15, 8, 12].map((h, i) => (
          <span key={i} className="w-1 rounded bg-vanguard-violet animate-wave" style={{ height: h, animationDelay: `${i * 0.07}s` }} />
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 pt-4">
        <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-muted">Ask me anything…</div>
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-vg-grad"><Mic size={14} className="text-ink-0" /></div>
      </div>
    </div>
  );
}
