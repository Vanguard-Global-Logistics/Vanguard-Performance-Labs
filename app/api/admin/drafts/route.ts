import { NextResponse } from "next/server";
import { COMPOUNDS } from "@/lib/content";
import { saveArticle, listArticles, updateArticle, type Article } from "@/lib/articles-store";

// Draft pipeline (owner-only). GET = queue. POST = generate drafts.
// PATCH = approve / reject / edit. NOTHING publishes without approval.

function authed(req: Request) {
  const t = process.env.ADMIN_TOKEN;
  return !!t && req.headers.get("authorization") === `Bearer ${t}`;
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);

const SYSTEM = `You write educational articles for Vanguard Performance Labs about peptides studied in research.

NON-NEGOTIABLE RULES:
- Educational only. NEVER give dosing, reconstitution, injection instructions, protocols, treatment
  advice, or personalised medical guidance.
- NEVER fabricate citations, statistics, study names, author names, or numbers. If you don't know a
  specific figure, describe the finding qualitatively instead.
- Be explicit and honest about evidence strength, including "most data is preclinical/animal" or
  "controlled human trials are essentially absent" where that is true.
- Neutral, factual, plain English. No hype, no marketing claims, no promises of results.
- Do not claim the compound is approved, safe, or effective for human use unless that is factually true.

Write ~450-650 words, 4-6 short paragraphs, no headings, no markdown formatting, no bullet lists.
Respond ONLY with JSON:
{"title": "...", "summary": "<150 char meta description>", "body": "<paragraphs separated by \\n\\n>", "evidence_note": "<one honest sentence on evidence strength>"}`;

const ANGLES = [
  "what the published research actually shows, and where the gaps are",
  "how researchers describe its proposed mechanism, in plain language",
  "the difference between preclinical findings and human evidence for this compound",
  "its regulatory status and what that means for availability",
  "common misconceptions and what the evidence does not support",
  "how it is handled and studied in a laboratory research context",
  "what questions researchers are still trying to answer",
];

export async function GET(req: Request) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true, articles: await listArticles() });
}

export async function POST(req: Request) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ ok: false, error: "ANTHROPIC_API_KEY not configured" }, { status: 503 });

  let body: { compoundSlug?: string; count?: number };
  try { body = await req.json(); } catch { body = {}; }

  const targets = body.compoundSlug
    ? COMPOUNDS.filter((c) => c.slug === body.compoundSlug)
    : COMPOUNDS.slice(0, Math.max(1, Math.min(4, body.count ?? 2)));
  if (targets.length === 0) return NextResponse.json({ ok: false, error: "no_compound" }, { status: 422 });

  const created: Article[] = [];
  for (const c of targets) {
    const angle = ANGLES[Math.floor(Math.random() * ANGLES.length)];
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1400,
          system: SYSTEM,
          messages: [{
            role: "user",
            content: `Write an educational article about ${c.name} (${c.aliases.join(", ") || "no common aliases"}), category ${c.category}. Angle: ${angle}. Known research status: ${c.researchStatus}. Our evidence grade for it: ${c.evidence}. Overview we publish: ${c.overview}`,
          }],
        }),
      });
      if (!res.ok) throw new Error(`upstream ${res.status}`);
      const data = await res.json();
      const text = (data.content ?? []).filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("\n");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());

      const a: Article = {
        id: `ART-${Date.now().toString(36).toUpperCase()}-${c.slug}`,
        slug: slugify(`${parsed.title}-${c.slug}`),
        compound_slug: c.slug,
        title: String(parsed.title).slice(0, 140),
        summary: String(parsed.summary).slice(0, 200),
        body: String(parsed.body),
        evidence_note: String(parsed.evidence_note ?? "").slice(0, 300),
        status: "draft",
        created_at: new Date().toISOString(),
      };
      await saveArticle(a);
      created.push(a);
    } catch (e) {
      console.error("[drafts] generation failed for", c.slug, e);
    }
  }

  return NextResponse.json({ ok: true, created: created.length, articles: created });
}

export async function PATCH(req: Request) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { id?: string; status?: string; title?: string; body?: string; reviewer_note?: string };
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!body.id) return NextResponse.json({ ok: false, error: "id_required" }, { status: 422 });

  const patch: Partial<Article> = { reviewed_at: new Date().toISOString() };
  if (body.status === "approved" || body.status === "rejected" || body.status === "draft") patch.status = body.status;
  if (typeof body.title === "string") patch.title = body.title.slice(0, 140);
  if (typeof body.body === "string") patch.body = body.body;
  if (typeof body.reviewer_note === "string") patch.reviewer_note = body.reviewer_note.slice(0, 500);

  const updated = await updateArticle(body.id, patch);
  if (!updated) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true, article: updated });
}
