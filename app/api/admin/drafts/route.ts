import { NextResponse } from "next/server";
import { adminAuthorized } from "@/lib/admin-auth";
import { rateLimit, tooMany } from "@/lib/rate-limit";
import { COMPOUNDS } from "@/lib/content";
import { listArticles, saveArticle, updateArticle, type Article } from "@/lib/articles-store";

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);

const SYSTEM = `You write educational research articles for Vanguard Performance Labs.

NON-NEGOTIABLE RULES
- Educational only. Never provide dosing, reconstitution, injection instructions, protocols, treatment advice, diagnosis, prescribing, or personalized medical guidance.
- Never fabricate citations, statistics, study names, author names, regulatory claims, certifications, or numbers.
- Be explicit about evidence strength and distinguish human, animal, in-vitro, observational, and review evidence.
- Neutral, factual, plain English. No hype, promises, testimonials, or claims of results.
- Do not claim a material is approved, safe, or effective for human use unless the provided source text explicitly establishes that fact.

Write approximately 450-650 words in four to six short paragraphs. No headings, markdown, or bullet lists.
Return only JSON:
{"title":"...","summary":"<150 character meta description>","body":"<paragraphs separated by \\n\\n>","evidence_note":"<one honest sentence on evidence strength>"}`;

const ANGLES = [
  "what the published research actually shows and where the gaps are",
  "how researchers describe the proposed mechanism in plain language",
  "the difference between preclinical findings and human evidence",
  "the regulatory status and what it does and does not mean",
  "common misconceptions and what the evidence does not support",
  "how the material is handled and studied in a laboratory research context",
  "the questions researchers are still trying to answer",
];

export async function GET(req: Request) {
  const limit = rateLimit(req, "admin-drafts-read", { perMinute: 20 });
  if (!limit.ok) return tooMany(limit.retryAfter);
  if (!adminAuthorized(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true, articles: await listArticles() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const limit = rateLimit(req, "admin-drafts-generate", { perMinute: 2 });
  if (!limit.ok) return tooMany(limit.retryAfter);
  if (!adminAuthorized(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ ok: false, error: "ANTHROPIC_API_KEY not configured" }, { status: 503 });

  let body: { compoundSlug?: string; count?: number };
  try { body = await req.json(); }
  catch { body = {}; }

  const requestedCount = Math.max(1, Math.min(2, Number(body.count) || 1));
  const targets = body.compoundSlug
    ? COMPOUNDS.filter((compound) => compound.slug === body.compoundSlug).slice(0, 1)
    : COMPOUNDS.slice(0, requestedCount);
  if (!targets.length) return NextResponse.json({ ok: false, error: "no_compound" }, { status: 422 });

  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";
  const created: Article[] = [];
  const failed: string[] = [];

  for (const compound of targets) {
    const angle = ANGLES[Math.floor(Math.random() * ANGLES.length)];
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: 1300,
          temperature: 0.2,
          system: SYSTEM,
          messages: [{
            role: "user",
            content: `Write an educational article about ${compound.name}. Aliases: ${compound.aliases.join(", ") || "none listed"}. Category: ${compound.category}. Angle: ${angle}. Research status: ${compound.researchStatus}. Vanguard evidence grade: ${compound.evidence}. Published overview: ${compound.overview}. Mechanism summary: ${compound.mechanism}. Safety and limitations: ${compound.safety}. Do not add citations not supplied here.`,
          }],
        }),
        signal: AbortSignal.timeout(25000),
      });
      if (!response.ok) throw new Error(`Anthropic ${response.status}: ${(await response.text()).slice(0, 400)}`);

      const data = await response.json();
      const text = (data.content ?? [])
        .filter((block: { type?: string }) => block.type === "text")
        .map((block: { text?: string }) => block.text ?? "")
        .join("\n")
        .trim();
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim()) as Record<string, unknown>;

      const title = String(parsed.title ?? "").trim().slice(0, 140);
      const summary = String(parsed.summary ?? "").trim().slice(0, 200);
      const articleBody = String(parsed.body ?? "").trim().slice(0, 12000);
      const evidenceNote = String(parsed.evidence_note ?? "").trim().slice(0, 300);
      if (!title || !summary || articleBody.length < 500 || !evidenceNote) throw new Error("Model response did not meet the draft contract.");

      const article: Article = {
        id: `ART-${Date.now().toString(36).toUpperCase()}-${compound.slug}`,
        slug: slugify(`${title}-${compound.slug}`),
        compound_slug: compound.slug,
        title,
        summary,
        body: articleBody,
        evidence_note: evidenceNote,
        status: "draft",
        created_at: new Date().toISOString(),
      };
      await saveArticle(article);
      created.push(article);
    } catch (error) {
      console.error("[drafts] generation failed", compound.slug, error);
      failed.push(compound.slug);
    }
  }

  return NextResponse.json({
    ok: created.length > 0,
    created: created.length,
    failed,
    articles: created,
  }, { status: created.length > 0 ? 200 : 502 });
}

export async function PATCH(req: Request) {
  const limit = rateLimit(req, "admin-drafts-update", { perMinute: 20 });
  if (!limit.ok) return tooMany(limit.retryAfter);
  if (!adminAuthorized(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let body: {
    id?: string;
    status?: string;
    title?: string;
    summary?: string;
    body?: string;
    evidence_note?: string;
    reviewer_note?: string;
  };
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 }); }
  if (!body.id) return NextResponse.json({ ok: false, error: "id_required" }, { status: 422 });

  const patch: Partial<Article> = { reviewed_at: new Date().toISOString() };
  if (["approved", "rejected", "draft"].includes(body.status ?? "")) patch.status = body.status as Article["status"];
  if (typeof body.title === "string") patch.title = body.title.trim().slice(0, 140);
  if (typeof body.summary === "string") patch.summary = body.summary.trim().slice(0, 200);
  if (typeof body.body === "string") patch.body = body.body.trim().slice(0, 12000);
  if (typeof body.evidence_note === "string") patch.evidence_note = body.evidence_note.trim().slice(0, 300);
  if (typeof body.reviewer_note === "string") patch.reviewer_note = body.reviewer_note.trim().slice(0, 500);

  const updated = await updateArticle(body.id, patch);
  if (!updated) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true, article: updated });
}
