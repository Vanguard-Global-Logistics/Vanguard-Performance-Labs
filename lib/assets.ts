// ─────────────────────────────────────────────────────────────
// BRAND ASSET REGISTRY
// Set a path to the real file once it exists in /public.
// Leave as null and the component renders the SVG stand-in instead —
// so the site NEVER shows a broken image.
// ─────────────────────────────────────────────────────────────

export type BrandAsset = { src: string; width: number; height: number } | null;

export const brandAssets: Record<string, BrandAsset> = {
  // Jessie — cinematic presenter, waist-up, transparent or dark background.
  // Drop file at: public/images/concierge/jessie-hero.webp
  jessieHero: { src: "/images/concierge/jessie-hero.png", width: 354, height: 414 },

  // Jessie — head-and-shoulders crop for the concierge panel.
  // public/images/concierge/jessie-portrait.webp
  jessiePortrait: { src: "/images/concierge/jessie-portrait.png", width: 261, height: 248 },

  // Jessie — square avatar for the chat dock header.
  // public/images/concierge/jessie-avatar.webp
  jessieAvatar: { src: "/images/concierge/jessie-avatar.png", width: 134, height: 134 },

  // Winged Vanguard research vial — hero centerpiece, transparent background.
  // public/images/hero/vanguard-winged-vial.webp
  heroVial: { src: "/images/hero/vanguard-winged-vial.png", width: 676, height: 476 },

  // Vanguard eagle-V logo mark, transparent background.
  // public/images/brand/vanguard-mark.webp
  logoMark: { src: "/images/brand/vanguard-mark.png", width: 290, height: 195 },
};

// Per-compound product vial renders (slug -> asset).
// public/images/products/<slug>.webp
export const productImages: Record<string, BrandAsset> = {
  // Extracted from the approved brand sheet (photoreal renders).
  "retatrutide": { src: "/images/products/retatrutide.png", width: 164, height: 426 },
  "bpc-157": { src: "/images/products/bpc-157.png", width: 164, height: 426 },
  "tb-500": { src: "/images/products/tb-500.png", width: 164, height: 426 },
  "ghk-cu": { src: "/images/products/ghk-cu.png", width: 164, height: 426 },
  "kpv": { src: "/images/products/kpv.png", width: 164, height: 426 },
  // No photoreal render on the sheet yet — these fall back to the SVG vial.
  "cjc-1295": null,
  "ipamorelin": null,
  "mots-c": null,
  "ss-31": null,
  "nad-plus": null,
};

export const hasAsset = (a: BrandAsset): a is NonNullable<BrandAsset> => a !== null;
