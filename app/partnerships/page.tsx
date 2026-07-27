import { Beaker, Building2, GraduationCap, Handshake, Network, Rocket, ShieldCheck } from "lucide-react";
import { DisclaimerBanner, GlassCard, GlowButton } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";

export const metadata = {
  title: "Partnerships",
  description: "Clinical, laboratory, academic, technology, distribution, and strategic partnerships with Vanguard Performance Labs.",
};

const TYPES = [
  { title: "Clinical partners", description: "Bring evidence-based education and Peptastic operations into a practice with clearly defined responsibilities and boundaries.", Icon: Building2 },
  { title: "Research & academia", description: "Collaborate on educational content, literature review, evidence-grading methods, and responsible research communication.", Icon: GraduationCap },
  { title: "Laboratories", description: "Support identity, purity, testing, verification, and documentation claims that can withstand scrutiny.", Icon: Beaker },
  { title: "Qualified distribution", description: "Serve legitimate clinical and research markets through reviewed accounts, documented products, and controlled terms.", Icon: Network },
  { title: "Technology & integrations", description: "Connect scheduling, communication, payments, accounting, inventory, or analytics into Peptastic workflows.", Icon: Rocket },
  { title: "Strategic relationships", description: "Explore long-horizon business, investment, product, and operational opportunities with defined governance.", Icon: Handshake },
];

const PROCESS = [
  { number: "01", title: "Introduce", description: "Explain who you are, the problem you solve, and why Vanguard is relevant." },
  { number: "02", title: "Explore", description: "Test alignment, responsibilities, constraints, commercial logic, and evidence standards." },
  { number: "03", title: "Define", description: "Document scope, ownership, data boundaries, success measures, and decision rights." },
  { number: "04", title: "Build", description: "Launch with named contacts, review points, and a path for correction or exit." },
];

export default function PartnershipsPage() {
  return (
    <div className="launch-page partnerships-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Partnerships</div>
          <h1>Build something that becomes more credible when both names are attached.</h1>
          <p>
            Vanguard is interested in partners who value evidence, documentation, disciplined execution, and clear accountability. A partnership should create a stronger operating system—not just another logo row.
          </p>
          <div className="launch-hero__actions">
            <GlowButton href="/contact">Start a partnership conversation</GlowButton>
            <GlowButton href="/about" variant="secondary">Review Vanguard’s mission</GlowButton>
          </div>
        </div>
        <div className="launch-metric-grid">
          <div><strong>6</strong><span>Partnership paths</span></div>
          <div><strong>4</strong><span>Definition stages</span></div>
          <div><strong>2</strong><span>Named owners minimum</span></div>
          <div><strong>1</strong><span>Written scope</span></div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Partnership principles">
        <div><Handshake /><span><strong>Mutual value</strong>Both organizations contribute something real</span></div>
        <div><ShieldCheck /><span><strong>Defined boundaries</strong>Data, claims, responsibility, and authority documented</span></div>
        <div><Beaker /><span><strong>Evidence standards</strong>Scientific and quality claims remain supportable</span></div>
        <div><Rocket /><span><strong>Operational ownership</strong>Named people are accountable for execution</span></div>
      </section>

      <section className="mt-8">
        <div className="launch-section-heading text-center">
          <div className="launch-kicker">Where Vanguard collaborates</div>
          <h2>Six paths into the same disciplined operating model.</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TYPES.map(({ title, description, Icon }) => (
            <GlassCard key={title} className="min-h-[260px] p-7 transition hover:-translate-y-1 hover:border-vanguard-violet/40">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-vanguard-violet/30 bg-vanguard-violet/[0.07] text-vanguard-violet"><Icon size={21} /></span>
              <h2 className="mt-5 font-serif text-3xl font-normal text-bone">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="launch-section-heading">
          <div className="launch-kicker">From idea to operating agreement</div>
          <h2>Partnerships move forward in four deliberate stages.</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step) => (
            <GlassCard key={step.number} className="min-h-[230px] p-6">
              <div className="font-mono text-[10px] font-bold tracking-[.18em] text-vanguard-amber">{step.number}</div>
              <h3 className="mt-4 font-serif text-3xl font-normal text-bone">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="launch-cta-panel">
        <div>
          <div className="launch-kicker">Make the first message useful</div>
          <h2>Tell Vanguard what you bring, what you need, and what success would look like.</h2>
          <p>Include the organization, proposed partnership type, current stage, relevant capabilities, expected timeline, and the person who can make decisions.</p>
        </div>
        <GlowButton href="/contact">Start the conversation</GlowButton>
      </section>

      <div className="launch-legal"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
