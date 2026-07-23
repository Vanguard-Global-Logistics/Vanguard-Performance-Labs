import type { MetadataRoute } from "next";
import { NAV, COMPOUNDS } from "@/lib/content";
import { listArticles } from "@/lib/articles-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://vanguardperformancelabs.com";
  const pages = NAV.map((n) => ({ url: `${base}${n.href}`, lastModified: new Date() }));
  const compounds = COMPOUNDS.map((c) => ({ url: `${base}/education/${c.slug}`, lastModified: new Date() }));
  let articles: MetadataRoute.Sitemap = [];
  try {
    const published = await listArticles("approved");
    articles = published.map((a) => ({ url: `${base}/articles/${a.slug}`, lastModified: new Date(a.reviewed_at ?? a.created_at) }));
  } catch { /* sitemap must never fail the build */ }
  return [...pages, ...compounds, ...articles];
}
