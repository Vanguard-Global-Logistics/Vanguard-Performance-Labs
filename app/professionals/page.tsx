import { GlassCard, GlowButton, DisclaimerBanner } from "@/components/ui";
import { DISCLAIMER, PEPTASTIC_FEATURES } from "@/lib/content";

export const metadata = {
  title: "Medical Professionals",
  description: "Resources, education, and clinic technology for licensed providers and clinical teams.",
};

const RESOURCES = [
  { t: "Evidence-graded references", d: "Every compound profile states research status and evidence level, with references verified before publication." },
  { t: "Documentation on request", d: "Certificates of Analysis and batch records are provided to approved professional accounts." },
  { t: "Staff education", d: "Use the library and video series for onboarding and cross-training your team." },
  { t: "Operational tooling", d: "Peptastic OS handles CRM, scheduling, inventory, analytics, and reporting in one place." },
];

export default function ProfessionalsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="max-w-2xl">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-vanguard-violet">Medical Professionals</div>
        <h1 className="mt-2 font-display text-4xl font-black text-bone">Built for Clinical Teams</h1>
        <p className="mt-3 text-muted">
          Vanguard supports licensed providers with honest education and operational software. Every clinical
          decision stays with the licensed professional — we don&apos;t provide protocols, dosing, or treatment guidance.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {RESOURCES.map((r) => (
          <GlassCard key={r.t} className="p-6">
            <h2 className="font-display font-bold text-bone">{r.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{r.d}</p>
          </GlassCard>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-bone">Peptastic OS for your practice</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PEPTASTIC_FEATURES.slice(0, 10).map((f) => (
            <GlassCard key={f.title} className="p-4">
              <div className="text-sm font-bold text-bone">{f.title}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-white/10 bg-ink-1 p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-bone">Request professional access</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          Book a platform walkthrough, request documentation, or open a professional account. Business
          verification is required.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <GlowButton href="/peptastic">Book a Peptastic Demo</GlowButton>
          <GlowButton href="/wholesale" variant="secondary">Apply for an Account</GlowButton>
        </div>
      </section>

      <div className="mt-8"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
