import { PEPTASTIC_FEATURES, INTEGRATIONS, ROLE_CARDS } from "@/lib/content";
import { GlassCard, SectionHeading, GlowButton } from "@/components/ui";

export const metadata = { title: "Peptastic — Clinic AI Operating System" };

export default function PeptasticPage() {
  return (
    <div>
      <section className="bg-hero px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-vanguard-violet">A Vanguard Product</div>
          <h1 className="font-display text-4xl font-black text-bone sm:text-5xl">Peptastic AI OS</h1>
          <p className="mt-5 text-muted">The AI operating system for med spas, longevity, wellness, and functional-medicine clinics. It preserves knowledge, trains staff faster, assists your team, and helps owners run smarter.</p>
          <div className="mt-7 flex justify-center gap-3">
            <GlowButton href="/contact">Book a Peptastic Demo</GlowButton>
            <GlowButton href="/professionals" variant="secondary">For Medical Professionals</GlowButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading kicker="Signature capability" title="AI Knowledge & Operations Assistant"
          sub="Captures approved workflows, SOPs, and role-specific guidance so the business gets stronger over time — for onboarding, vacation coverage, cross-training, and consistency. Not employee surveillance." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PEPTASTIC_FEATURES.map((f) => (
            <GlassCard key={f.title} className="p-5">
              <div className="font-display font-bold text-bone">{f.title}</div>
              <p className="mt-2 text-xs text-muted">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-1">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <SectionHeading kicker="Every seat" title="How AI Helps Each Role" />
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

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading kicker="Connects with your stack" title="Integrations" />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {INTEGRATIONS.map((i) => (
            <span key={i} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-bone">{i}</span>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink-1">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <SectionHeading kicker="Enterprise-grade" title="Security & Trust"
            sub="Role-based access, audit logs, encryption, admin controls, and privacy by design." />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Role-Based Access", "Audit Logs", "Encryption", "Admin Controls", "Privacy by Design", "HIPAA-Ready Architecture"].map((s) => (
              <GlassCard key={s} className="p-5 text-center text-sm font-semibold text-bone">{s}</GlassCard>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted">HIPAA-ready architecture. Vanguard does not claim certifications it has not independently obtained.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <SectionHeading kicker="Pricing" title="Plans for Every Clinic" />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[["Starter", "Solo & small clinics"], ["Professional", "Growing multi-provider clinics"], ["Enterprise", "Groups & networks"]].map(([t, d]) => (
            <GlassCard key={t} className="p-6">
              <div className="font-display text-xl font-bold text-bone">{t}</div>
              <p className="mt-2 text-sm text-muted">{d}</p>
              <div className="mt-5"><GlowButton href="/contact" variant="secondary">Request Demo</GlowButton></div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
