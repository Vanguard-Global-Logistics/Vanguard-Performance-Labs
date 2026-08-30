import { Activity, BrainCircuit, CalendarDays, ChartNoAxesCombined, ClipboardCheck, DatabaseZap, LockKeyhole, MessageSquareText, ShieldCheck, Users } from "lucide-react";
import { INTEGRATIONS, PEPTASTIC_FEATURES, ROLE_CARDS } from "@/lib/content";
import { GlassCard, GlowButton } from "@/components/ui";

export const metadata = {
  title: "Peptastic — Clinic AI Operating System",
  description: "Peptastic is Vanguard's AI operating system for clinics: CRM, scheduling, inventory, analytics, knowledge continuity, and staff assistance.",
};

const ICONS = [Users, CalendarDays, DatabaseZap, MessageSquareText, ChartNoAxesCombined, ClipboardCheck, BrainCircuit, Activity];

export default function PeptasticPage() {
  return (
    <div className="launch-page peptastic-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">A Vanguard Product</div>
          <h1>The clinic operating system that remembers how your best team works.</h1>
          <p>
            Peptastic brings CRM, scheduling, inventory, analytics, staff guidance, workflow knowledge, and AI assistance into one operating layer for med spas, longevity clinics, wellness practices, and functional-medicine teams.
          </p>
          <div className="launch-hero__actions">
            <GlowButton href="/contact">Request a Peptastic demo</GlowButton>
            <GlowButton href="/professionals" variant="secondary">For clinical teams</GlowButton>
          </div>
        </div>

        <div className="relative z-[1] grid gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between rounded-xl border border-vanguard-violet/25 bg-vanguard-violet/[0.06] p-4">
            <div><span className="font-mono text-[9px] uppercase tracking-[.18em] text-vanguard-violet">Clinic command</span><strong className="mt-1 block text-lg text-bone">Monday operations</strong></div>
            <span className="rounded-full border border-vanguard-teal/35 bg-vanguard-teal/10 px-3 py-1 text-[10px] font-bold text-vanguard-teal">SYSTEM HEALTHY</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[['48', 'Appointments'], ['7', 'Follow-ups'], ['3', 'Inventory alerts'], ['94%', 'Task completion']].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.035] p-4"><strong className="font-serif text-3xl font-normal text-vanguard-amber">{value}</strong><span className="mt-1 block text-[10px] uppercase tracking-wide text-muted">{label}</span></div>
            ))}
          </div>
          <div className="grid gap-2">
            {[
              ['AI knowledge assistant', 'Approved SOP guidance available'],
              ['Inventory workflow', 'Two items need owner review'],
              ['Patient communication', 'Follow-up queue prioritized'],
            ].map(([title, status]) => (
              <div key={title} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3"><span><strong className="block text-xs text-bone">{title}</strong><small className="text-[9px] text-muted">{status}</small></span><span className="h-2 w-2 rounded-full bg-vanguard-teal shadow-[0_0_12px_rgba(46,217,184,.8)]" /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Peptastic platform pillars">
        <div><BrainCircuit /><span><strong>Knowledge continuity</strong>Approved processes survive staff turnover</span></div>
        <div><Users /><span><strong>Role-aware guidance</strong>Each team member sees relevant workflows</span></div>
        <div><LockKeyhole /><span><strong>Controlled access</strong>Permissions, auditability, and admin oversight</span></div>
        <div><ChartNoAxesCombined /><span><strong>Operational visibility</strong>Owners see what needs attention next</span></div>
      </section>

      <section className="mt-8">
        <div className="launch-section-heading text-center">
          <div className="launch-kicker">Signature capability</div>
          <h2>AI Knowledge & Operations Assistant</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-muted">Peptastic captures approved workflows, SOPs, role guidance, and operating knowledge so onboarding, vacation coverage, cross-training, and daily execution become more consistent. It is designed for operational continuity, not employee surveillance.</p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PEPTASTIC_FEATURES.slice(0, 8).map((feature, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <GlassCard key={feature.title} className="min-h-[230px] p-6 transition hover:-translate-y-1 hover:border-vanguard-violet/40">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-vanguard-violet/30 bg-vanguard-violet/[0.07] text-vanguard-violet"><Icon size={20} /></span>
                <h3 className="mt-5 font-serif text-2xl font-normal text-bone">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{feature.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <div className="launch-section-heading text-center">
          <div className="launch-kicker">Every seat benefits differently</div>
          <h2>One operating system. Role-specific help.</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROLE_CARDS.map((role, index) => (
            <GlassCard key={role.role} className="p-6">
              <div className="font-mono text-[10px] font-bold tracking-[.18em] text-vanguard-amber">ROLE {String(index + 1).padStart(2, '0')}</div>
              <h3 className="mt-4 font-serif text-2xl font-normal text-bone">{role.role}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{role.blurb}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(168,85,247,.08),rgba(227,180,90,.05),rgba(8,7,18,.98))] p-8">
        <div className="launch-section-heading text-center">
          <div className="launch-kicker">Connects with the clinic stack</div>
          <h2>Integrations without turning the platform into a patchwork.</h2>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {INTEGRATIONS.map((integration) => <span key={integration} className="rounded-xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-medium text-bone shadow-inner">{integration}</span>)}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {[
          { title: "Role-based access", description: "Teams see the workflows and information appropriate to their responsibilities.", Icon: Users },
          { title: "Audit and admin controls", description: "Important actions and changes remain reviewable instead of disappearing into chat history.", Icon: ClipboardCheck },
          { title: "Privacy-first architecture", description: "Encryption, permissions, and controlled integrations are designed into the operating model.", Icon: ShieldCheck },
        ].map(({ title, description, Icon }) => (
          <GlassCard key={title} className="p-6"><Icon className="text-vanguard-amber" /><h3 className="mt-4 font-serif text-3xl font-normal text-bone">{title}</h3><p className="mt-3 text-sm leading-7 text-muted">{description}</p></GlassCard>
        ))}
      </section>
      <p className="mt-4 text-center text-[10px] leading-relaxed text-muted">Peptastic is designed with HIPAA-ready architecture principles. Vanguard does not claim certifications, compliance status, or legal determinations that have not been independently established for a specific deployment.</p>

      <section className="launch-cta-panel">
        <div>
          <div className="launch-kicker">Clinic fit review</div>
          <h2>See your workflows inside the platform—not a generic software demo.</h2>
          <p>Tell Vanguard your clinic size, team structure, current tools, and biggest operational bottleneck. The demo can then focus on the work that actually consumes your time.</p>
        </div>
        <GlowButton href="/contact">Request a tailored demo</GlowButton>
      </section>
    </div>
  );
}
