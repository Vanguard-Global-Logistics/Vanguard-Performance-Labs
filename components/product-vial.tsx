import Image from "next/image";
import { VialComposite } from "@/components/vial-composite";
import { hasVialBase } from "@/lib/assets";
import { productImages, hasAsset } from "@/lib/assets";

// Accent colour system — from the approved Vanguard label sheet.
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
 * Research vial rendered to match the approved label sheet:
 * black matte flip-off cap, clear borosilicate body, black label with a
 * coloured accent band, silver eagle-V, strength, RESEARCH PEPTIDE, batch + QR.
 * Swaps to a real render automatically once registered in lib/assets.ts.
 */
export function ProductVial({
  slug,
  name,
  strength,
  batch = "VPL-24-001",
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
  // Named so the same vial morphs between the grid and its detail page
  const vtStyle = { "--vial-name": `vial-${slug}` } as React.CSSProperties;
  // Order of preference:
  //   1. this product's own photoreal render, if one exists
  //   2. the shared photoreal base with a vector label composited on
  //   3. the fully generated SVG vial
  const art = productImages[slug];
  if (!hasAsset(art) && hasVialBase()) {
    return (
      <VialComposite slug={slug} name={name} size={strength} batch={batch} width={size} className={className} />
    );
  }

  if (hasAsset(art)) {
    return (
      <Image
        src={art.src}
        alt={`Vanguard ${name} research vial`}
        width={art.width}
        height={art.height}
        sizes="(max-width: 768px) 40vw, 220px"
        className={`vt-vial ${className}`}
        style={{ ...vtStyle, width: size, height: "auto" }}
      />
    );
  }

  const c = accentFor(slug);
  const uid = `v-${slug}`;
  const nameSize = name.length <= 9 ? 10 : 8;
  return (
    <svg
      className={`vt-vial ${className}`}
      style={vtStyle}
      width={size}
      height={size * 2.1}
      viewBox="0 0 120 252"
      fill="none"
      role="img"
      aria-label={`Vanguard ${name} research vial`}
    >
      <defs>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="18%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="82%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={`${uid}-cap`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2A2A2E" /><stop offset="45%" stopColor="#141416" /><stop offset="100%" stopColor="#0A0A0C" />
        </linearGradient>
        <linearGradient id={`${uid}-silver`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="50%" stopColor="#C6CEDD" /><stop offset="100%" stopColor="#79839A" />
        </linearGradient>
        <linearGradient id={`${uid}-accent`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c} stopOpacity="0.95" /><stop offset="100%" stopColor={c} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <ellipse cx="60" cy="150" rx="52" ry="96" fill={c} opacity="0.13" />

      {/* glass body */}
      <rect x="24" y="30" width="72" height="200" rx="9" fill={`url(#${uid}-glass)`} />
      <rect x="24" y="30" width="72" height="200" rx="9" stroke="#8A93A8" strokeOpacity="0.5" strokeWidth="1.4" />
      <path d="M24 210 h72 v11 a9 9 0 0 1 -9 9 h-54 a9 9 0 0 1 -9 -9 z" fill="#C9D2E0" opacity="0.16" />

      {/* aluminium seal + ridged flip-off cap */}
      <rect x="34" y="16" width="52" height="11" rx="3" fill="#9AA3B4" />
      <rect x="36" y="2" width="48" height="17" rx="4" fill={`url(#${uid}-cap)`} />
      <rect x="36" y="2" width="48" height="17" rx="4" stroke="#3A3A40" strokeWidth="1" />
      <g stroke="#000000" strokeOpacity="0.45" strokeWidth="0.7">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={40 + i * 4} y1="4" x2={40 + i * 4} y2="17" />
        ))}
      </g>
      <rect x="41" y="4" width="38" height="2.5" rx="1.2" fill="#ffffff" opacity="0.14" />

      {/* label */}
      <rect x="26" y="64" width="68" height="138" rx="5" fill="#0B0B0F" />
      <rect x="26" y="64" width="68" height="138" rx="5" stroke={c} strokeOpacity="0.45" strokeWidth="1" />

      {/* eagle-V */}
      <g transform="translate(60,84)">
        <path d="M-19 -8 Q-8 -12 -1 -5 Q-9 -6 -16 -3 Z" fill={`url(#${uid}-silver)`} opacity="0.9" />
        <path d="M19 -8 Q8 -12 1 -5 Q9 -6 16 -3 Z" fill={`url(#${uid}-silver)`} opacity="0.9" />
        <path d="M-7 -6 L0 12 L7 -6" stroke={`url(#${uid}-silver)`} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      <text x="60" y="107" textAnchor="middle" fontSize="8" fontWeight="700" letterSpacing="1.3" fill="#E6E9F2" fontFamily="ui-sans-serif,system-ui,sans-serif">VANGUARD</text>
      <text x="60" y="114" textAnchor="middle" fontSize="3.6" fontWeight="600" letterSpacing="1.4" fill="#9AA3B8" fontFamily="ui-sans-serif,system-ui,sans-serif">PERFORMANCE LABS</text>

      <rect x="30" y="122" width="60" height="26" rx="3" fill={`url(#${uid}-accent)`} />
      <text x="60" y="134" textAnchor="middle" fontSize={nameSize} fontWeight="800" fill="#FFFFFF" fontFamily="ui-sans-serif,system-ui,sans-serif">{name}</text>
      {strength && (
        <text x="60" y="144" textAnchor="middle" fontSize="7" fontWeight="600" fill="#FFFFFF" fillOpacity="0.92" fontFamily="ui-sans-serif,system-ui,sans-serif">{strength}</text>
      )}

      <text x="32" y="162" fontSize="4.4" fontWeight="700" fill="#C7CEDC" fontFamily="ui-sans-serif,system-ui,sans-serif">RESEARCH</text>
      <text x="32" y="169" fontSize="4.4" fontWeight="700" fill="#8C95A8" fontFamily="ui-sans-serif,system-ui,sans-serif">PEPTIDE</text>
      <text x="32" y="178" fontSize="4" fontWeight="600" fill="#8C95A8" fontFamily="ui-sans-serif,system-ui,sans-serif">99%+ PURITY</text>
      <text x="32" y="187" fontSize="3.8" fontWeight="600" fill="#6E778A" fontFamily="ui-sans-serif,system-ui,sans-serif">BATCH: {batch}</text>

      <rect x="70" y="157" width="19" height="19" rx="1.5" fill="#E6E9F2" />
      <g fill="#0B0B0F">
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 5 }, (_, k) =>
            (r + k) % 2 === 0 ? (
              <rect key={`${r}-${k}`} x={71.4 + k * 3.4} y={158.4 + r * 3.4} width="2.8" height="2.8" />
            ) : null
          )
        )}
      </g>
      <text x="79" y="183" textAnchor="middle" fontSize="3" fontWeight="600" fill="#6E778A" fontFamily="ui-sans-serif,system-ui,sans-serif">SCAN FOR COA</text>

      <rect x="30" y="40" width="4.5" height="182" rx="2.2" fill="#ffffff" opacity="0.14" />
    </svg>
  );
}
