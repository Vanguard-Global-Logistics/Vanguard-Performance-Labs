import { BookOpen, Captions, Clock3, PlayCircle, ShieldCheck, Video } from "lucide-react";
import { DISCLAIMER } from "@/lib/content";
import { DisclaimerBanner, GlassCard, GlowButton } from "@/components/ui";

export const metadata = {
  title: "Video Library",
  description: "Reviewed educational video series, research explainers, documentation guidance, and Peptastic walkthroughs from Vanguard Performance Labs.",
};

const SERIES = [
  { title: "Peptide Science 101", episodes: 6, description: "Foundations: what peptides are, how they are studied, and why evidence quality varies so widely.", accent: "Education" },
  { title: "Evidence Explained", episodes: 4, description: "How strong, moderate, limited, and insufficient evidence differ in real research review.", accent: "Research" },
  { title: "Peptastic OS Walkthrough", episodes: 5, description: "Clinic CRM, scheduling, inventory, analytics, workflow knowledge, and AI support in context.", accent: "Platform" },
  { title: "Quality & Documentation", episodes: 3, description: "COAs, batch records, analytical methods, traceability, and supplier questions that matter.", accent: "Quality" },
  { title: "Regulatory Watch", episodes: 4, description: "Plain-language context around a changing compounding and enforcement environment.", accent: "Regulatory" },
  { title: "Founder & Mission", episodes: 2, description: "The veteran-owned story behind Vanguard and the decision to lead with evidence instead of hype.", accent: "Company" },
];

export default function VideosPage() {
  const totalEpisodes = SERIES.reduce((sum, series) => sum + series.episodes, 0);

  return (
    <div className="launch-page videos-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Vanguard Video Library</div>
          <h1>Short explainers with the same standards as the written research.</h1>
          <p>
            Vanguard video series are designed for research education, documentation literacy, clinic operations, and platform walkthroughs. Planned episodes remain labeled as planned until they are produced and reviewed.
          </p>
          <div className="launch-hero__actions">
            <GlowButton href="/education">Read the research library</GlowButton>
            <GlowButton href="/contact" variant="secondary">Request a video topic</GlowButton>
          </div>
        </div>
        <div className="launch-metric-grid">
          <div><strong>{SERIES.length}</strong><span>Planned series</span></div>
          <div><strong>{totalEpisodes}</strong><span>Episodes mapped</span></div>
          <div><strong>2</strong><span>Review gates</span></div>
          <div><strong>0</strong><span>Fake playable videos</span></div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Video publishing standards">
        <div><Video /><span><strong>Production status shown</strong>Planned content is never presented as live</span></div>
        <div><Captions /><span><strong>Accessible delivery</strong>Captioning and transcripts belong in release QA</span></div>
        <div><BookOpen /><span><strong>Source aligned</strong>Research claims follow the evidence library</span></div>
        <div><ShieldCheck /><span><strong>Clear boundaries</strong>No dosing, treatment, or human-use instruction</span></div>
      </section>

      <section className="mt-8">
        <div className="launch-section-heading text-center">
          <div className="launch-kicker">Series roadmap</div>
          <h2>Six channels for learning without pretending the library is already full.</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERIES.map((series, index) => (
            <GlassCard key={series.title} className="group overflow-hidden transition hover:-translate-y-1 hover:border-vanguard-violet/40">
              <div className="relative grid h-48 place-items-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_45%,rgba(168,85,247,.22),transparent_38%),linear-gradient(135deg,rgba(168,85,247,.08),rgba(227,180,90,.08),rgba(5,5,14,.98))]">
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:32px_32px]" />
                <span className="absolute left-4 top-4 rounded-full border border-vanguard-amber/30 bg-black/30 px-3 py-1 font-mono text-[9px] uppercase tracking-wide text-vanguard-amber">{series.accent}</span>
                <span className="absolute right-4 top-4 font-mono text-[9px] text-muted">SERIES {String(index + 1).padStart(2, "0")}</span>
                <span className="relative grid h-16 w-16 place-items-center rounded-full border border-vanguard-violet/50 bg-vanguard-violet/10 text-vanguard-violet shadow-[0_0_35px_rgba(168,85,247,.24)]"><PlayCircle size={34} /></span>
              </div>
              <div className="flex min-h-[250px] flex-col p-6">
                <h2 className="font-serif text-3xl font-normal leading-tight text-bone">{series.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">{series.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-[10px]">
                  <span className="inline-flex items-center gap-2 text-muted"><Clock3 size={13} /> {series.episodes} episodes planned</span>
                  <span className="font-semibold text-vanguard-amber">In editorial production</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="launch-cta-panel">
        <div>
          <div className="launch-kicker">Available now</div>
          <h2>The evidence library already contains the research profiles.</h2>
          <p>Use the written library today for evidence grades, mechanisms, limitations, FAQs, and verified citation records while reviewed video production continues.</p>
        </div>
        <GlowButton href="/education">Open the library</GlowButton>
      </section>

      <div className="launch-legal"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
