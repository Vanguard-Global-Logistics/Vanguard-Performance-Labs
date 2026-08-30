import type { MetadataRoute } from "next";
import { NAV, COMPOUNDS } from "@/lib/content";
import { listArticles } from "@/lib/articles-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vanguardperformancelabs.com").replace(/\/$/, "");
  const now = new Date();
  const publicNav = NAV.filter((item) => !["/cart", "/checkout", "/admin"].includes(item.href));

  const pages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...publicNav.filter((item) => item.href !== "/").map((item) => ({
      url: `${base}${item.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: item.href === "/products" || item.href === "/education" ? 0.9 : 0.7,
    })),
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/refunds`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const education = COMPOUNDS.map((compound) => ({
    url: `${base}/education/${compound.slug}`,
    lastModified: new Date(compound.lastReviewed),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const products = COMPOUNDS.map((compound) => ({
    url: `${base}/products/${compound.slug}`,
    lastModified: new Date(compound.lastReviewed),
    changeFrequency: "weekly" as const,
    priority: 0.76,
  }));

  let articles: MetadataRoute.Sitemap = [];
  try {
    const published = await listArticles("approved");
    articles = published.map((article) => ({
      url: `${base}/articles/${article.slug}`,
      lastModified: new Date(article.reviewed_at ?? article.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));
  } catch {
    // The sitemap must remain available even when an optional article backend is offline.
  }

  const unique = new Map<string, MetadataRoute.Sitemap[number]>();
  [...pages, ...education, ...products, ...articles].forEach((entry) => unique.set(entry.url, entry));
  return [...unique.values()];
}
