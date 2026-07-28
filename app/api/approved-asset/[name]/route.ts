import { APPROVED_HERO } from "@/lib/approved-home-hero";

export const runtime = "nodejs";

const ASSETS: Record<string, { dataUri: string; type: string }> = {
  hero: { dataUri: APPROVED_HERO, type: "image/webp" },
};

export async function GET(_request: Request, { params }: { params: { name: string } }) {
  const asset = ASSETS[params.name];
  if (!asset) return new Response("Not found", { status: 404 });

  const encoded = asset.dataUri.slice(asset.dataUri.indexOf(",") + 1);
  const bytes = Buffer.from(encoded, "base64");
  return new Response(bytes, {
    headers: {
      "Content-Type": asset.type,
      "Content-Length": String(bytes.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
