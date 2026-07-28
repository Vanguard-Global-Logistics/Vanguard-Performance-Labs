import Link from "next/link";
import { ArrowRight, BookOpenCheck, FileClock, SearchCheck, ShieldCheck } from "lucide-react";
import { listArticles } from "@/lib/articles-store";
import { DISCLAIMER } from "@/lib/content";
import { DisclaimerBanner, GlassCard, GlowButton } from "@/components/ui";

export const metadata = {
  title: "Articles",
  description: "Reviewed research education, quality guidance, regulatory context, and clinic operations insights from Vanguard Performance Labs.",
};

const EDITORIAL = [
  { title: "Why Evidence Grading Beats Marketing Claims", category: "Education", description: "A practical framework for separating repeated confidence from research that has actually earned it." },
  { title: "Animal Data Is a Hypothesis, Not a Human Result", category: "Education", description: "What preclinical findings can justify—and the conclusions they cannot responsibly support." },
  { title: "How to Read a Certificate of Analysis", category: "Quality", description: "Identity, assay, purity, method, batch linkage, and the omissions that matter when reviewing documentation." },
  { title: "The Compounding Landscape, in Plain English", category: "Regulatory", description: "A careful overview of a changing environment without treating a website article as legal advice." },
  { title: "What Clinic Owners Get Wrong About AI", category: "Operations", description: "AI creates the most value where it removes repeat work, improves consistency, and preserves knowledge." },
  { title: "Building a Clinic That Survives Staff Turnover", category: "Operations", description: "How approved processes, role guidance, and operational memory reduce the risk of knowledge walking out the door." },
];

export const revalidate = 300;

export default async function ArticlesPage() {
  const published = await listArticles("approved");

  return (
    <div className="launch-page articles-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Vanguard Editorial</div>
          <h1>Research education written to survive the next skeptical question.</h1>
          <p>
            Vanguard articles cover evidence quality, research interpretation, documentation, regulatory context, and clinic operations. Drafts remain private until a human review marks them approved.
          </p>
          <div className="launch-hero__actions">
            <GlowButton href="/education">Explore the evidence library</GlowButton>
            <GlowButton href="/contact" variant="secondary">Suggest a topic</GlowButton>
          </div>
        </div>
        <div className="launch-metric-grid">
          <div><strong>{published.length}</strong><span>Approved articles</span></div>
          <div><strong>{EDITORIAL.length}</strong><span>Editorial tracks</span></div>
          <div><strong>2</strong><span>Human review gates</span></div>
          <div><strong>0</strong><span>Unverified citations published</span></div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Editorial standards">
        <div><SearchCheck /><span><strong>Source checked</strong>References remain unpublished until verified</span></div>
        <div><BookOpenCheck /><span><strong>Evidence separated</strong>Human and preclinical findings are not blended</span></div>
        <div><FileClock /><span><strong>Drafts stay drafts</strong>Planned content is labeled rather than faked</span></div>
        <div><ShieldCheck /><span><strong>Clear boundaries</strong>No dosing, diagnosis, or treatment guidance</span></div>
      </section>

      {published.length > 0 && (
        <section className="mt-8">
          <div className="launch-section-heading">
            <div className="launch-kicker">Published and approved</div>
            <h2>Latest Vanguard research education.</h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {published.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="group">
                <GlassCard className="flex h-full min-h-[290px] flex-col p-6 transition group-hover:-translate-y-1 group-hover:border-vanguard-violet/40">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-vanguard-violet/35 bg-vanguard-violet/[0.07] px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-wide text-vanguard-violet">{article.compound_slug.replaceAll("-", " ")}</span>
                    <span className="text-[10px] text-muted">{new Date(article.reviewed_at ?? article.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-3xl font-normal leading-tight text-bone">{article.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">{article.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-vanguard-amber">Read the approved article <ArrowRight size={14} /></span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <div className="launch-section-heading">
          <div className="launch-kicker">Editorial roadmap</div>
          <h2>Important subjects currently in review or development.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">These cards describe planned editorial work. They are not links to articles that do not exist, and they do not imply that medical, legal, or regulatory review has been completed.</p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EDITORIAL.map((article, index) => (
            <GlassCard key={article.title} className="flex min-h-[270px] flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-vanguard-amber/30 bg-vanguard-amber/[0.06] px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-wide text-vanguard-amber">{article.category}</span>
                <span className="font-mono text-[9px] text-muted">QUEUE {String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 font-serif text-3xl font-normal leading-tight text-bone">{article.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{article.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-muted"><FileClock size={14} /> Editorial review required before publication</span>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="launch-cta-panel">
        <div>
          <div className="launch-kicker">Research question first</div>
          <h2>Need the compound profile rather than an opinion piece?</h2>
          <p>The evidence library is the faster route for mechanism, study areas, safety limitations, evidence grade, FAQs, and verified source records.</p>
        </div>
        <GlowButton href="/education">Open the library</GlowButton>
      </section>

      <div className="launch-legal"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
