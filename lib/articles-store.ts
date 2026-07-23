// Article pipeline store. AI drafts land here as "draft"; a human approves
// before anything is publicly visible. Supabase in prod, memory in dev.

export type ArticleStatus = "draft" | "approved" | "rejected";

export interface Article {
  id: string;
  slug: string;
  compound_slug: string;      // which peptide this covers
  title: string;
  summary: string;            // meta description
  body: string;               // markdown-ish paragraphs separated by \n\n
  evidence_note: string;      // honest statement of evidence strength
  status: ArticleStatus;
  created_at: string;
  reviewed_at?: string;
  reviewer_note?: string;
}

const hasSupabase = () => !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

async function sb(path: string, init: RequestInit = {}) {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`supabase ${res.status}: ${await res.text()}`);
  return res.json();
}

const mem: Article[] = [];

export async function saveArticle(a: Article) {
  if (hasSupabase()) { await sb("articles", { method: "POST", body: JSON.stringify(a) }); return; }
  mem.unshift(a);
}

export async function listArticles(status?: ArticleStatus): Promise<Article[]> {
  if (hasSupabase()) {
    const q = status ? `articles?status=eq.${status}&order=created_at.desc&limit=200` : "articles?order=created_at.desc&limit=200";
    return sb(q);
  }
  return status ? mem.filter((a) => a.status === status) : mem;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (hasSupabase()) { const r = await sb(`articles?slug=eq.${encodeURIComponent(slug)}&limit=1`); return r[0] ?? null; }
  return mem.find((a) => a.slug === slug) ?? null;
}

export async function updateArticle(id: string, patch: Partial<Article>): Promise<Article | null> {
  if (hasSupabase()) {
    const r = await sb(`articles?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(patch) });
    return r[0] ?? null;
  }
  const i = mem.findIndex((a) => a.id === id);
  if (i < 0) return null;
  mem[i] = { ...mem[i], ...patch };
  return mem[i];
}
