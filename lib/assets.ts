// ─────────────────────────────────────────────────────────────
// BRAND ASSET REGISTRY
// Set a path to the real file once it exists in /public.
// Leave as null and the component renders the SVG stand-in instead —
// so the site NEVER shows a broken image.
// ─────────────────────────────────────────────────────────────

export type BrandAsset = { src: string; width: number; height: number } | null;

export const brandAssets: Record<string, BrandAsset | undefined> = {
  // Jessie — cinematic presenter, waist-up, transparent or dark background.
  // Drop file at: public/images/concierge/jessie-hero.webp
  jessieHero: { src: "/images/concierge/jessie-hero.png", width: 710, height: 932 },

  // Jessie — head-and-shoulders crop for the concierge panel.
  // public/images/concierge/jessie-portrait.webp
  jessiePortrait: { src: "/images/concierge/jessie-portrait.png", width: 540, height: 671 },

  // Jessie — square avatar for the chat dock header.
  // public/images/concierge/jessie-avatar.webp
  jessieAvatar: { src: "/images/concierge/jessie-avatar.png", width: 298, height: 298 },

  // Winged Vanguard research vial — hero centerpiece, transparent background.
  // public/images/hero/vanguard-winged-vial.webp
  // Hero art disabled: the source crop included part of Jessie and the framing was wrong.
  // The vector winged vial renders instead. Replace with a clean transparent render when ready.
  heroVial: null,

  // Vanguard eagle-V logo mark, transparent background.
  // public/images/brand/vanguard-mark.webp
  logoMark: { src: "/images/brand/vanguard-mark.png", width: 172, height: 132 },
};

// Per-compound product vial renders (slug -> asset).
// public/images/products/<slug>.webp
export const productImages: Record<string, BrandAsset | undefined> = {
  "aod-9604": { src: "/images/products/aod-9604.png", width: 813, height: 1536 },
  "bpc-157": { src: "/images/products/bpc-157.png", width: 164, height: 351 },
  "cagrilintide": { src: "/images/products/cagrilintide.png", width: 900, height: 749 },
  "cagrisema": { src: "/images/products/cagrisema.png", width: 900, height: 1501 },
  "cjc-1295": { src: "/images/products/cjc-1295.png", width: 900, height: 680 },
  "ghk-cu": { src: "/images/products/ghk-cu.png", width: 164, height: 351 },
  "glow-blend": { src: "/images/products/glow-blend.png", width: 684, height: 1536 },
  "ipamorelin": { src: "/images/products/ipamorelin.png", width: 826, height: 1536 },
  "kpv": { src: "/images/products/kpv.png", width: 163, height: 352 },
  "mots-c": { src: "/images/products/mots-c.png", width: 900, height: 743 },
  "nad-plus": { src: "/images/products/nad-plus.png", width: 900, height: 694 },
  "retatrutide": { src: "/images/products/retatrutide.png", width: 162, height: 364 },
  "ss-31": { src: "/images/products/ss-31.png", width: 613, height: 1536 },
  "tb-500": { src: "/images/products/tb-500.png", width: 164, height: 350 },
  "tesamorelin": { src: "/images/products/tesamorelin.png", width: 900, height: 1457 },
  // Everything else falls back to the generated SVG vial until a render exists.
};

export const hasAsset = (a: BrandAsset | undefined): a is NonNullable<BrandAsset> => a != null;

/** True once the photoreal blank vial render has been added.
 *  Drop the file at public/images/vials/base.png and flip this to true —
 *  every product then renders as photoreal glass with a vector label. */
export const VIAL_BASE_READY = true;
export const hasVialBase = () => VIAL_BASE_READY;
