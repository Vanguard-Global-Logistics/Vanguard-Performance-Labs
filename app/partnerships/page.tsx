import { GlassCard, GlowButton, DisclaimerBanner } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";

export const metadata = {
  title: "Partnerships",
  description: "Clinical, research, academic, and strategic partnerships with Vanguard Performance Labs.",
};

const TYPES = [
  { t: "Clinical Partners", d: "Bring Vanguard education and Peptastic OS into your practice, with co-branded staff training." },
  { t: "Research & Academia", d: "Collaborate on educational content, literature reviews, and evidence-grading methodology." },
  { t: "Laboratories", d: "Testing, verification, and documentation partnerships supporting quality claims we can actually stand behind." },
  { t: "Distribution", d: "Qualified distributors serving clinical and research markets, under reviewed accounts." },
  { t: "Technology & Integrations", d: "Connect your platform to Peptastic — scheduling, payments, messaging, accounting." },
  { t: "Strategic & Investment", d: "Longer-horizon conversations about where Vanguard is going and who builds it with us." },
];

const PROCESS = [
  { n: "01", t: "Introduce", d: "Tell us who you are and what you have in mind." },
  { n: "02", t: "Explore", d: "A working conversation about fit, scope, and what each side brings." },
  { n: "03", t: "Define", d: "Terms, responsibilities, and what success looks like — in writing." },
  { n: "04", t: "Build", d: "Launch with a named contact on both sides." },
];

export default function PartnershipsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="max-w-2xl">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-vanguard-violet">Partnerships</div>
        <h1 className="mt-2 font-display text-4xl font-black text-bone">Build With Vanguard</h1>
        <p className="mt-3 text-muted">
          We&apos;re looking for partners who share the same standard: evidence first, honest claims, and
          respect for the professionals doing the clinical work.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TYPES.map((x) => (
          <GlassCard key={x.t} className="p-5">
            <h2 className="font-display font-bold text-vanguard-violet">{x.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{x.d}</p>
          </GlassCard>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-bone">How it works</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p) => (
            <GlassCard key={p.n} className="p-5">
              <div className="font-mono text-xs font-bold text-vanguard-gold">{p.n}</div>
              <div className="mt-1 font-display font-bold text-bone">{p.t}</div>
              <p className="mt-1.5 text-sm text-muted">{p.d}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-white/10 bg-ink-1 p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-bone">Start a conversation</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">Tell us what you&apos;re building and we&apos;ll route you to the right person.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <GlowButton href="/contact">Become a Partner</GlowButton>
          <GlowButton href="/peptastic" variant="secondary">See the Platform</GlowButton>
        </div>
      </section>

      <div className="mt-8"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
