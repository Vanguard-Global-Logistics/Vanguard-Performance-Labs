import Link from "next/link";
import { listArticles } from "@/lib/articles-store";
import { GlassCard, GlowButton, DisclaimerBanner } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";

export const metadata = {
  title: "Articles",
  description: "Educational articles and business insights from Vanguard Performance Labs.",
};

const ARTICLES = [
  { t: "Why Evidence Grading Beats Marketing Claims", cat: "Education", d: "Every compound gets sold with the same confidence. Here's how to tell which ones have earned it — and why we publish grades even when they hurt the pitch." },
  { t: "Animal Data Is a Hypothesis, Not a Result", cat: "Education", d: "A huge share of peptide claims trace back to rodent studies. What that actually tells you, and what it doesn't." },
  { t: "How to Read a Certificate of Analysis", cat: "Quality", d: "What a COA covers, what it doesn't, and the specific fields worth checking before you trust a batch." },
  { t: "The Compounding Landscape, in Plain English", cat: "Regulatory", d: "FDA actions have reshaped what clinics can legally offer. A non-alarmist summary of where things stand." },
  { t: "What Clinic Owners Get Wrong About AI", cat: "Business", d: "AI won't replace your staff. It's most valuable where it removes repeat work and preserves knowledge when people leave." },
  { t: "Building a Clinic That Survives Staff Turnover", cat: "Business", d: "When your best nurse leaves, how much of your operation walks out with them? Capturing process before you need it." },
];

export const revalidate = 300;

export default async function ArticlesPage() {
  const published = await listArticles("approved");
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="max-w-2xl">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-vanguard-violet">Articles</div>
        <h1 className="mt-2 font-display text-4xl font-black text-bone">Insights & Education</h1>
        <p className="mt-3 text-muted">Straight writing on the science, the regulatory landscape, and running a modern clinic.</p>
      </header>

      {published.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-lg font-bold text-bone">Latest research education</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {published.map((a) => (
              <Link key={a.id} href={`/articles/${a.slug}`}>
                <GlassCard className="card-lift flex h-full flex-col p-5 hover:border-vanguard-violet/40">
                  <span className="w-fit rounded-full border border-vanguard-violet/40 bg-vanguard-violet/10 px-2.5 py-0.5 text-[10px] font-semibold text-vanguard-violet">{a.compound_slug}</span>
                  <h3 className="mt-3 font-display text-base font-bold leading-snug text-bone">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{a.summary}</p>
                  <span className="mt-3 text-[11px] text-muted">{new Date(a.reviewed_at ?? a.created_at).toLocaleDateString()}</span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      )}

      <h2 className="mt-12 font-display text-lg font-bold text-bone">Editorial series</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((a) => (
          <GlassCard key={a.t} className="flex flex-col p-5">
            <span className="w-fit rounded-full border border-vanguard-violet/40 bg-vanguard-violet/10 px-2.5 py-0.5 text-[10px] font-semibold text-vanguard-violet">{a.cat}</span>
            <h2 className="mt-3 font-display text-base font-bold leading-snug text-bone">{a.t}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{a.d}</p>
            <span className="mt-4 text-xs font-semibold text-muted">Full article in editorial review</span>
          </GlassCard>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">
        Article summaries are published; full pieces are released after editorial and medical review. We do not
        publish research citations that have not been verified.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <GlowButton href="/education">Explore the library</GlowButton>
        <GlowButton href="/contact" variant="secondary">Suggest a topic</GlowButton>
      </div>
      <div className="mt-8"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
