import { BookOpenCheck, ClipboardCheck, FileCheck2, MonitorCog, ShieldCheck, Stethoscope } from "lucide-react";
import { DISCLAIMER, PEPTASTIC_FEATURES } from "@/lib/content";
import { DisclaimerBanner, GlassCard, GlowButton } from "@/components/ui";

export const metadata = {
  title: "Medical Professionals",
  description: "Evidence-graded education, research documentation, professional accounts, and clinic operating technology for licensed providers and clinical teams.",
};

const RESOURCES = [
  { title: "Evidence-graded references", description: "Profiles separate human evidence, preclinical findings, mechanisms, limitations, and verified source records.", Icon: BookOpenCheck },
  { title: "Documentation support", description: "Certificates of Analysis and batch records are available through approved professional and business workflows.", Icon: FileCheck2 },
  { title: "Staff education", description: "Use the research library and approved operating knowledge to support onboarding, cross-training, and consistent communication.", Icon: ClipboardCheck },
  { title: "Operational technology", description: "Peptastic connects CRM, scheduling, inventory, analytics, workflows, and AI assistance in one clinic operating layer.", Icon: MonitorCog },
];

export default function ProfessionalsPage() {
  return (
    <div className="launch-page professionals-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Licensed Professionals & Clinical Teams</div>
          <h1>Resources that respect the difference between education and clinical judgment.</h1>
          <p>
            Vanguard supports professional teams with evidence-graded education, research documentation, reviewed business accounts, and operational software. Diagnosis, treatment, dosing, and protocol decisions remain with the appropriately licensed professional.
          </p>
          <div className="launch-hero__actions">
            <GlowButton href="/education">Explore professional research</GlowButton>
            <GlowButton href="/contact" variant="secondary">Request professional support</GlowButton>
          </div>
        </div>
        <div className="launch-metric-grid">
          <div><strong>4</strong><span>Professional resources</span></div>
          <div><strong>1</strong><span>Evidence standard</span></div>
          <div><strong>0</strong><span>Automated protocols</span></div>
          <div><strong>100%</strong><span>Clinical authority retained</span></div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Professional support boundaries">
        <div><Stethoscope /><span><strong>Licensed judgment</strong>Clinical decisions remain with the provider</span></div>
        <div><BookOpenCheck /><span><strong>Evidence context</strong>Mechanisms and limitations are separated</span></div>
        <div><ShieldCheck /><span><strong>Research boundaries</strong>No dosing or treatment guidance</span></div>
        <div><MonitorCog /><span><strong>Operations support</strong>Peptastic helps the business run consistently</span></div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {RESOURCES.map(({ title, description, Icon }) => (
          <GlassCard key={title} className="p-7">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-vanguard-amber/25 bg-vanguard-amber/[0.06] text-vanguard-amber"><Icon size={21} /></span>
            <h2 className="mt-5 font-serif text-3xl font-normal text-bone">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
          </GlassCard>
        ))}
      </section>

      <section className="mt-8">
        <div className="launch-section-heading text-center">
          <div className="launch-kicker">Peptastic for the practice</div>
          <h2>Operational intelligence for every role around the patient.</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-muted">The platform focuses on repeatable business operations, team communication, inventory, scheduling, analytics, and approved knowledge—not autonomous clinical decision-making.</p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PEPTASTIC_FEATURES.slice(0, 10).map((feature, index) => (
            <GlassCard key={feature.title} className="min-h-[210px] p-5">
              <div className="font-mono text-[9px] font-bold tracking-[.16em] text-vanguard-amber">MODULE {String(index + 1).padStart(2, '0')}</div>
              <h3 className="mt-4 font-serif text-xl font-normal text-bone">{feature.title}</h3>
              <p className="mt-3 text-xs leading-6 text-muted">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="launch-cta-panel">
        <div>
          <div className="launch-kicker">Professional access</div>
          <h2>Choose the next step that matches the practice.</h2>
          <p>Request documentation, apply for a professional business account, or schedule a Peptastic walkthrough focused on your existing clinic workflow.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <GlowButton href="/contact">Request support</GlowButton>
          <GlowButton href="/wholesale" variant="secondary">Apply for an account</GlowButton>
        </div>
      </section>

      <div className="launch-legal"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
