import { VialComposite } from "@/components/vial-composite";
import { hasVialBase } from "@/lib/assets";

// Accent colour system — one locked label system for every Vanguard vial.
export const ACCENT: Record<string, string> = {
  "thymosin-alpha-1": "#3F8A6B",
  "tesamorelin": "#7A4FA0",
  "sermorelin": "#3D8A8F",
  "semax": "#5B60A8",
  "selank": "#4C6BA8",
  "reconstitution-solution": "#4A5568",
  "pt-141": "#C24E6E",
  "igf-1-lr3": "#6E86A8",
  "glp2-tirz": "#B4497A",
  "glow-blend": "#8E4FA8",
  "epithalon": "#5C7FA8",
  "dsip": "#3F4E8C",
  "cjc-1295-no-dac-ipamorelin": "#4E7BA0",
  "cagrisema": "#A0489A",
  "cagrilintide": "#8B4FA8",
  "bpc-157-tb-500": "#3E7F5C",
  "aod-9604": "#7B5EA8",
  "ahk-cu": "#B87333",
  "klow-blend": "#7C9A3B",
  "cjc-1295-with-dac": "#5B7FBF",
  "snap-8": "#C77DA8",
  "pinealon": "#6E7FA8",
  "mt-1": "#8B6F3E",
  "mt-2": "#7A5C33",
  "ace-031": "#A84B4B",
  "aicar": "#4A8B7A",
  "adipotide": "#9A5B8B",
  "ghrp-2": "#5F8BA8",
  "ghrp-6": "#6B8FA8",
  "hexarelin": "#7089A8",
  "mgf": "#8B7BA8",
  "peg-mgf": "#9585B5",
  "kisspeptin-10": "#A85B7A",
  "thymalin": "#5B8B6B",
  "ara-290": "#4B7B8B",
  "vip-peptide": "#4B8B9A",
  "dihexa": "#7B6BA8",
  "hgh-fragment-176-191": "#8B8B4B",
  "ll-37": "#8B5B5B",
  "5-amino-1mq": "#4B8B5B",
  "pe-22-28": "#6B6BA8",
  "bam15": "#A87B4B",
  "pnc-27": "#8B4B6B",
  "foxo4": "#5B6B8B",
  "slu-pp-332": "#4B7B5B",
  "gdf-8": "#6B7B8B",
  "follistatin": "#7B8B9A",
  "igf-des": "#8B95A8",
  "survodutide": "#5B7BA8",
  "mazdutide": "#6B8BA8",
  "melatonin": "#4B5B8B",
  "retatrutide": "#8B5CF6",
  "bpc-157": "#1F7A4D",
  "tb-500": "#1F5FA8",
  "ghk-cu": "#9A6234",
  "kpv": "#A82230",
  "cjc-1295": "#1F7E86",
  "ipamorelin": "#B5651D",
  "mots-c": "#B33A2B",
  "ss-31": "#7C8697",
  "nad-plus": "#B8912F",
};

export function accentFor(slug: string) {
  return ACCENT[slug] ?? "#8B5CF6";
}

/**
 * One canonical Vanguard vial renderer.
 *
 * IMPORTANT: individual legacy product PNGs are intentionally NOT used here.
 * Every catalog product uses the same photoreal blank vial + vector label so
 * cap, glass, label proportions, typography and legal language stay identical.
 * Product-specific art may only return after it has been reviewed against this
 * master template pixel-for-pixel.
 */
export function ProductVial({
  slug,
  name,
  strength,
  batch,
  size = 190,
  className = "",
}: {
  slug: string;
  name: string;
  strength?: string;
  batch?: string;
  size?: number;
  className?: string;
}) {
  if (hasVialBase()) {
    return (
      <VialComposite
        slug={slug}
        name={name}
        size={strength}
        batch={batch}
        width={size}
        className={className}
      />
    );
  }

  const accent = accentFor(slug);
  const uid = `v-${slug}`;
  const nameSize = name.length <= 9 ? 10 : name.length <= 15 ? 8 : 6.6;
  return (
    <svg
      className={`vt-vial ${className}`}
      width={size}
      height={size * 2.1}
      viewBox="0 0 120 252"
      fill="none"
      role="img"
      aria-label={`Vanguard ${name}${strength ? ` ${strength}` : ""} research vial`}
    >
      <defs>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="18%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="82%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={`${uid}-cap`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2A2A2E" />
          <stop offset="45%" stopColor="#141416" />
          <stop offset="100%" stopColor="#0A0A0C" />
        </linearGradient>
      </defs>

      <ellipse cx="60" cy="150" rx="52" ry="96" fill={accent} opacity="0.13" />
      <rect x="24" y="30" width="72" height="200" rx="9" fill={`url(#${uid}-glass)`} />
      <rect x="24" y="30" width="72" height="200" rx="9" stroke="#8A93A8" strokeOpacity="0.5" strokeWidth="1.4" />
      <rect x="34" y="16" width="52" height="11" rx="3" fill="#9AA3B4" />
      <rect x="36" y="2" width="48" height="17" rx="4" fill={`url(#${uid}-cap)`} />

      <rect x="26" y="64" width="68" height="138" rx="5" fill="#0B0B0F" stroke={accent} strokeOpacity="0.45" />
      <text x="60" y="98" textAnchor="middle" fontSize="8" fontWeight="800" letterSpacing="1.2" fill="#E8A93B">VANGUARD</text>
      <text x="60" y="106" textAnchor="middle" fontSize="3.6" fontWeight="600" letterSpacing="1.25" fill="#AAB2C4">PERFORMANCE LABS</text>

      <rect x="30" y="119" width="60" height="30" rx="3" fill={accent} />
      <text x="60" y="132" textAnchor="middle" fontSize={nameSize} fontWeight="800" fill="#FFFFFF">{name.toUpperCase()}</text>
      {strength && <text x="60" y="144" textAnchor="middle" fontSize="7" fontWeight="700" fill="#FFFFFF">{strength}</text>}

      <text x="32" y="165" fontSize="4.5" fontWeight="800" fill="#D7DCE6">RESEARCH GRADE</text>
      <text x="32" y="174" fontSize="3.5" fontWeight="700" fill="#9AA3B8">NOT FOR HUMAN</text>
      <text x="32" y="181" fontSize="3.5" fontWeight="700" fill="#9AA3B8">CONSUMPTION</text>
      {batch && <text x="32" y="191" fontSize="3.5" fontWeight="600" fill="#70798C">LOT {batch}</text>}
    </svg>
  );
}
