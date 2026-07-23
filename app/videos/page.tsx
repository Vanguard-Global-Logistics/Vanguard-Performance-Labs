import { GlassCard, GlowButton, DisclaimerBanner } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";
import { PlayCircle } from "lucide-react";

export const metadata = {
  title: "Video Library",
  description: "Educational videos, explainers, and platform walkthroughs from Vanguard Performance Labs.",
};

const SERIES = [
  { t: "Peptide Science 101", n: 6, d: "Foundations: what peptides are, how they're studied, and why evidence quality varies so much." },
  { t: "Evidence Explained", n: 4, d: "What strong, moderate, and limited evidence actually mean when you're evaluating a claim." },
  { t: "Peptastic OS Walkthrough", n: 5, d: "A guided tour of the clinic operating system — CRM, scheduling, inventory, and reporting." },
  { t: "Quality & Documentation", n: 3, d: "Reading a COA, understanding batch records, and what to ask a supplier." },
  { t: "Regulatory Watch", n: 4, d: "Plain-English updates on the shifting compounding and enforcement landscape." },
  { t: "Founder & Mission", n: 2, d: "The veteran story behind Vanguard and why we lead with education." },
];

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="max-w-2xl">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-vanguard-violet">Video Library</div>
        <h1 className="mt-2 font-display text-4xl font-black text-bone">Watch & Learn</h1>
        <p className="mt-3 text-muted">Short, honest explainers. No hype, no dosing guidance, no treatment advice.</p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERIES.map((s) => (
          <GlassCard key={s.t} className="flex flex-col overflow-hidden">
            <div className="relative flex h-36 items-center justify-center border-b border-white/10 bg-gradient-to-br from-vanguard-violet/15 via-transparent to-vanguard-gold/10">
              <PlayCircle size={40} className="text-vanguard-violet/70" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-display text-base font-bold text-bone">{s.t}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.d}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-muted">{s.n} episodes planned</span>
                <span className="font-semibold text-vanguard-gold">In production</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">
        Series are listed as planned or in production. Episodes publish after review — we don&apos;t list videos
        that don&apos;t exist yet as available.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <GlowButton href="/education">Read the library instead</GlowButton>
        <GlowButton href="/contact" variant="secondary">Request a topic</GlowButton>
      </div>
      <div className="mt-8"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
