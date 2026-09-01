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
  "ace-031": { src: "/images/products/ace-031.png", width: 1024, height: 1024 },
  "adipotide": { src: "/images/products/adipotide.png", width: 1024, height: 1024 },
  "ahk-cu": { src: "/images/products/ahk-cu.png", width: 1024, height: 1024 },
  "aicar": { src: "/images/products/aicar.png", width: 1024, height: 1024 },
  "aod-9604": { src: "/images/products/aod-9604.png", width: 1024, height: 1024 },
  "cjc-1295-with-dac": { src: "/images/products/cjc-1295-with-dac.png", width: 1024, height: 1024 },
  "ghrp-2": { src: "/images/products/ghrp-2.png", width: 1024, height: 1024 },
  "ghrp-6": { src: "/images/products/ghrp-6.png", width: 1024, height: 1024 },
  "hexarelin": { src: "/images/products/hexarelin.png", width: 1024, height: 1024 },
  "kisspeptin-10": { src: "/images/products/kisspeptin-10.png", width: 1024, height: 1024 },
  "klow-blend": { src: "/images/products/klow-blend.png", width: 1024, height: 1024 },
  "mgf": { src: "/images/products/mgf.png", width: 1024, height: 1024 },
  "mt-1": { src: "/images/products/mt-1.png", width: 1024, height: 1024 },
  "mt-2": { src: "/images/products/mt-2.png", width: 1024, height: 1024 },
  "peg-mgf": { src: "/images/products/peg-mgf.png", width: 1024, height: 1024 },
  "pinealon": { src: "/images/products/pinealon.png", width: 1024, height: 1024 },
  "snap-8": { src: "/images/products/snap-8.png", width: 1024, height: 1024 },
  "5-amino-1mq": { src: "/images/products/5-amino-1mq.png", width: 1024, height: 1024 },
  "ara-290": { src: "/images/products/ara-290.png", width: 1024, height: 1024 },
  "dihexa": { src: "/images/products/dihexa.png", width: 1024, height: 1024 },
  "hgh-fragment-176-191": { src: "/images/products/hgh-fragment-176-191.png", width: 1024, height: 1024 },
  "ll-37": { src: "/images/products/ll-37.png", width: 1024, height: 1024 },
  "pe-22-28": { src: "/images/products/pe-22-28.png", width: 1024, height: 1024 },
  "thymalin": { src: "/images/products/thymalin.png", width: 1024, height: 1024 },
  "vip-peptide": { src: "/images/products/vip-peptide.png", width: 1024, height: 1024 },
  "follistatin": { src: "/images/products/follistatin.png", width: 1024, height: 1024 },
  "foxo4": { src: "/images/products/foxo4.png", width: 1024, height: 1024 },
  "gdf-8": { src: "/images/products/gdf-8.png", width: 1024, height: 1024 },
  "igf-des": { src: "/images/products/igf-des.png", width: 1024, height: 1024 },
  "pnc-27": { src: "/images/products/pnc-27.png", width: 1024, height: 1024 },
  "slu-pp-332": { src: "/images/products/slu-pp-332.png", width: 1024, height: 1024 },
  "survodutide": { src: "/images/products/survodutide.png", width: 1024, height: 1024 },
  "bam15": { src: "/images/products/bam15.png", width: 1024, height: 1024 },
  "mazdutide": { src: "/images/products/mazdutide.png", width: 1024, height: 1024 },
  "melatonin": { src: "/images/products/melatonin.png", width: 1024, height: 1024 },
  "bpc-157": { src: "/images/products/bpc-157.png", width: 1024, height: 1024 },
  "bpc-157-tb-500": { src: "/images/products/bpc-157-tb-500.png", width: 1024, height: 1024 },
  "cagrilintide": { src: "/images/products/cagrilintide.png", width: 1024, height: 1024 },
  "cagrisema": { src: "/images/products/cagrisema.png", width: 1024, height: 1024 },
  "cjc-1295": { src: "/images/products/cjc-1295.png", width: 1024, height: 1024 },
  "cjc-1295-no-dac-ipamorelin": { src: "/images/products/cjc-1295-no-dac-ipamorelin.png", width: 1024, height: 1024 },
  "dsip": { src: "/images/products/dsip.png", width: 1024, height: 1024 },
  "epithalon": { src: "/images/products/epithalon.png", width: 1024, height: 1024 },
  "ghk-cu": { src: "/images/products/ghk-cu.png", width: 1024, height: 1024 },
  "glow-blend": { src: "/images/products/glow-blend.png", width: 1024, height: 1024 },
  "glp2-tirz": { src: "/images/products/glp2-tirz.png", width: 1024, height: 1024 },
  "igf-1-lr3": { src: "/images/products/igf-1-lr3.png", width: 1024, height: 1024 },
  "ipamorelin": { src: "/images/products/ipamorelin.png", width: 1024, height: 1024 },
  "kpv": { src: "/images/products/kpv.png", width: 1024, height: 1024 },
  "mots-c": { src: "/images/products/mots-c.png", width: 1024, height: 1024 },
  "nad-plus": { src: "/images/products/nad-plus.png", width: 1024, height: 1024 },
  "pt-141": { src: "/images/products/pt-141.png", width: 1024, height: 1024 },
  "reconstitution-solution": { src: "/images/products/reconstitution-solution.png", width: 1024, height: 1024 },
  "retatrutide": { src: "/images/products/retatrutide.png", width: 1024, height: 1024 },
  "selank": { src: "/images/products/selank.png", width: 1024, height: 1024 },
  "semax": { src: "/images/products/semax.png", width: 1024, height: 1024 },
  "sermorelin": { src: "/images/products/sermorelin.png", width: 1024, height: 1024 },
  "ss-31": { src: "/images/products/ss-31.png", width: 1024, height: 1024 },
  "tb-500": { src: "/images/products/tb-500.png", width: 1024, height: 1024 },
  "tesamorelin": { src: "/images/products/tesamorelin.png", width: 1024, height: 1024 },
  "thymosin-alpha-1": { src: "/images/products/thymosin-alpha-1.png", width: 1024, height: 1024 },
  // Everything else falls back to the generated SVG vial until a render exists.
};

export const hasAsset = (a: BrandAsset | undefined): a is NonNullable<BrandAsset> => a != null;

/** True once the photoreal blank vial render has been added.
 *  Drop the file at public/images/vials/base.png and flip this to true —
 *  every product then renders as photoreal glass with a vector label. */
export const VIAL_BASE_READY = true;
export const hasVialBase = () => VIAL_BASE_READY;
