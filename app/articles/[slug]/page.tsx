import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BookOpenCheck, CalendarCheck, ShieldCheck } from "lucide-react";
import { getArticleBySlug } from "@/lib/articles-store";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { cartEligible } from "@/types";
import { VialComposite } from "@/components/vial-composite";
import { DisclaimerBanner, EvidenceTag, GlassCard, GlowButton } from "@/components/ui";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.status !== "approved") return { title: "Article not found" };
  return {
    title: article.title,
    description: article.summary,
    openGraph: { title: article.title, description: article.summary, type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.status !== "approved") notFound();

  const compound = COMPOUNDS.find((item) => item.slug === article.compound_slug);
  const reviewedDate = new Date(article.reviewed_at ?? article.created_at);
  const paragraphs = article.body.split("\n\n").map((paragraph) => paragraph.trim()).filter(Boolean);
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: article.title,
    description: article.summary,
    datePublished: article.reviewed_at ?? article.created_at,
    dateModified: article.reviewed_at ?? article.created_at,
    publisher: { "@type": "Organization", name: "Vanguard Performance Labs" },
    isAccessibleForFree: true,
    about: compound ? { "@type": "Substance", name: compound.name } : undefined,
  };

  return (
    <article className="launch-page article-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="launch-breadcrumb">
        <Link href="/articles"><ArrowLeft size={15} /> Articles</Link>
        <span>/</span>
        <span>{compound?.name ?? "Vanguard editorial"}</span>
      </div>

      <section className="launch-hero mt-5">
        <div className="launch-hero__copy">
          <div className="flex flex-wrap items-center gap-3">
            <div className="launch-kicker">Approved Vanguard Editorial</div>
            {compound && <EvidenceTag level={compound.evidence} />}
          </div>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
        </div>
        <div className="launch-metric-grid">
          <div><strong>{paragraphs.length}</strong><span>Reviewed sections</span></div>
          <div><strong>{compound ? compound.references.filter((reference) => reference.citation).length : 0}</strong><span>Profile citations</span></div>
          <div><strong>{reviewedDate.getFullYear()}</strong><span>Review year</span></div>
          <div><strong>APPROVED</strong><span>Editorial status</span></div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Article review standards">
        <div><CalendarCheck /><span><strong>Reviewed {reviewedDate.toLocaleDateString()}</strong>Publication date remains visible</span></div>
        <div><BookOpenCheck /><span><strong>Evidence context</strong>Profile grade and sources stay connected</span></div>
        <div><ShieldCheck /><span><strong>Educational only</strong>No diagnosis, dosing, or treatment guidance</span></div>
        <div><BookOpenCheck /><span><strong>Free access</strong>No paywall hides the evidence note</span></div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="rounded-2xl border border-vanguard-amber/30 bg-[linear-gradient(135deg,rgba(227,180,90,.08),rgba(168,85,247,.035))] p-5 text-sm leading-7 text-muted">
            <span className="font-semibold text-vanguard-amber">Evidence note: </span>{article.evidence_note}
          </div>

          <GlassCard className="mt-4 p-7 sm:p-10">
            <div className="space-y-6 text-[15px] leading-8 text-[#b7afc0]">
              {paragraphs.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 24)}`} className={index === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[.82] first-letter:text-vanguard-amber" : ""}>{paragraph}</p>
              ))}
            </div>
          </GlassCard>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {compound && (
            <GlassCard className="p-6 text-center">
              <div className="mx-auto grid min-h-[280px] place-items-center rounded-xl bg-[radial-gradient(circle,rgba(168,85,247,.14),transparent_68%)]">
                <VialComposite slug={compound.slug} name={compound.name} size={compound.strength ?? compound.variants?.[0]?.size ?? "Research vial"} width={145} />
              </div>
              <h2 className="mt-3 font-serif text-3xl font-normal text-bone">{compound.name}</h2>
              <p className="mt-2 text-xs leading-6 text-muted">{compound.overview}</p>
              <div className="mt-5 grid gap-2">
                <GlowButton href={`/education/${compound.slug}`} variant="secondary">Full research profile</GlowButton>
                {cartEligible(compound.regulatory) && <GlowButton href={`/products/${compound.slug}`}>View research material</GlowButton>}
              </div>
            </GlassCard>
          )}
          <DisclaimerBanner text={DISCLAIMER} />
        </aside>
      </section>
    </article>
  );
}
