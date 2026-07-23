import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticleBySlug } from "@/lib/articles-store";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { GlassCard, GlowButton, EvidenceTag, DisclaimerBanner } from "@/components/ui";
import { ProductVial } from "@/components/product-vial";
import { cartEligible } from "@/types";

export const revalidate = 300; // refresh published content every 5 min

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = await getArticleBySlug(params.slug);
  if (!a || a.status !== "approved") return { title: "Article not found" };
  return {
    title: a.title,
    description: a.summary,
    openGraph: { title: a.title, description: a.summary, type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const a = await getArticleBySlug(params.slug);
  if (!a || a.status !== "approved") notFound();

  const c = COMPOUNDS.find((x) => x.slug === a.compound_slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: a.title,
    description: a.summary,
    datePublished: a.reviewed_at ?? a.created_at,
    dateModified: a.reviewed_at ?? a.created_at,
    publisher: { "@type": "Organization", name: "Vanguard Performance Labs" },
    isAccessibleForFree: true,
    about: c ? { "@type": "Substance", name: c.name } : undefined,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Link href="/articles" className="text-sm text-vanguard-violet hover:underline">← Articles</Link>
      <h1 className="mt-4 font-display text-3xl font-black leading-tight text-bone sm:text-4xl">{a.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
        <span>Reviewed {new Date(a.reviewed_at ?? a.created_at).toLocaleDateString()}</span>
        {c && <EvidenceTag level={c.evidence} />}
      </div>
      <p className="mt-4 rounded-lg border border-vanguard-amber/30 bg-vanguard-amber/[0.06] px-3 py-2 text-xs text-muted">
        <span className="font-bold text-vanguard-amber">Evidence note: </span>{a.evidence_note}
      </p>

      <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-muted">
        {a.body.split("\n\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
      </div>

      {c && (
        <GlassCard className="mt-10 flex flex-col items-center gap-5 p-6 sm:flex-row">
          <ProductVial slug={c.slug} name={c.name} strength={c.strength} size={84} />
          <div className="flex-1 text-center sm:text-left">
            <div className="font-display text-lg font-bold text-bone">{c.name}</div>
            <p className="mt-1 text-sm text-muted">{c.overview.slice(0, 150)}…</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-vanguard-amber">Research use only</p>
          </div>
          <div className="flex flex-col gap-2">
            <GlowButton href={`/education/${c.slug}`} variant="secondary">Full profile</GlowButton>
            {cartEligible(c.regulatory) && <GlowButton href={`/products/${c.slug}`}>View product</GlowButton>}
          </div>
        </GlassCard>
      )}

      <div className="mt-8"><DisclaimerBanner text={DISCLAIMER} /></div>
    </article>
  );
}
