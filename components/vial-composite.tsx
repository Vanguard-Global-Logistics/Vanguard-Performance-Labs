import Image from "next/image";
import { accentFor } from "@/components/product-vial";

/** Where the label sits on the base render, as a percentage of the image box.
 *  These match the framing specified in docs/VIAL-BASE-PROMPT.md — if the base
 *  render changes framing, adjust here once and every vial follows. */
const LABEL = { left: 15.5, top: 30, width: 69, height: 44 };

/**
 * A product vial: photoreal glass underneath, crisp vector label on top.
 *
 * The base render carries a BLANK black label. Everything readable — the mark,
 * wordmark, accent band, product name, size, spec block — is drawn as real text,
 * so it is always sharp, always spelled correctly, and changes with the data
 * rather than needing a new render.
 */
export function VialComposite({
  slug, name, size = "", batch = "VPL-24-001", purity = "99%+", width = 220, className = "",
}: {
  slug: string; name: string; size?: string; batch?: string;
  purity?: string; width?: number; className?: string;
}) {
  const accent = accentFor(slug);
  const nameLen = name.length;
  const nameSize = nameLen <= 8 ? 8.2 : nameLen <= 13 ? 6.4 : nameLen <= 18 ? 5.2 : 4.4;

  return (
    <div className={`relative ${className}`} style={{ width, aspectRatio: "1 / 2.05" }}>
      <Image
        src="/images/vials/base.png"
        alt=""
        fill
        sizes={`${width}px`}
        priority={false}
        className="object-contain"
        aria-hidden
      />

      <svg
        viewBox="0 0 100 64"
        className="absolute"
        style={{
          left: `${LABEL.left}%`, top: `${LABEL.top}%`,
          width: `${LABEL.width}%`, height: `${LABEL.height}%`,
        }}
        role="img"
        aria-label={`Vanguard ${name}${size ? ` ${size}` : ""} research vial`}
      >
        <defs>
          <linearGradient id={`sil-${slug}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#C9D2E2" />
            <stop offset="100%" stopColor="#79839A" />
          </linearGradient>
          <linearGradient id={`gold-${slug}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6E3AC" />
            <stop offset="55%" stopColor="#E8A93B" />
            <stop offset="100%" stopColor="#B07C20" />
          </linearGradient>
          {/* the band picks up the curve of the glass so it does not read as a flat sticker */}
          <linearGradient id={`band-${slug}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.34" />
            <stop offset="14%" stopColor="#FFFFFF" stopOpacity="0.06" />
            <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.10" />
            <stop offset="88%" stopColor="#000000" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.42" />
          </linearGradient>
        </defs>

        {/* eagle-V mark */}
        <g transform="translate(50, 11) scale(0.92)">
          <path d="M-11 -6 Q-4.5 -8.6 -0.6 -3.6 Q-5 -4.4 -9.4 -2.2 Z" fill={`url(#sil-${slug})`} />
          <path d="M11 -6 Q4.5 -8.6 0.6 -3.6 Q5 -4.4 9.4 -2.2 Z" fill={`url(#sil-${slug})`} />
          <path d="M-4.1 -4.4 L0 8 L4.1 -4.4" stroke={`url(#sil-${slug})`} strokeWidth="2.1"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        <text x="50" y="24.6" textAnchor="middle" fontSize="7.4" fontWeight="800"
          letterSpacing="1.15" fill={`url(#gold-${slug})`}
          fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif">VANGUARD</text>
        <text x="50" y="29.4" textAnchor="middle" fontSize="2.85" fontWeight="600"
          letterSpacing="1.5" fill="#B9C2D4"
          fontFamily="ui-sans-serif, system-ui, sans-serif">PERFORMANCE LABS</text>

        {/* accent band */}
        <rect x="0" y="32.5" width="100" height="15.5" fill={accent} />
        <rect x="0" y="32.5" width="100" height="15.5" fill={`url(#band-${slug})`} />
        <text x="50" y="40.4" textAnchor="middle" fontSize={nameSize} fontWeight="800"
          fill="#FFFFFF" letterSpacing="0.3"
          fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif">{name.toUpperCase()}</text>
        {size && (
          <text x="50" y="46.2" textAnchor="middle" fontSize="5" fontWeight="600" fill="#FFFFFF"
            fillOpacity="0.94" fontFamily="ui-sans-serif, system-ui, sans-serif">{size}</text>
        )}

        {/* spec block */}
        <text x="5" y="53.6" fontSize="3.1" fontWeight="700" letterSpacing="0.35" fill="#D2D9E6"
          fontFamily="ui-sans-serif, system-ui, sans-serif">RESEARCH PEPTIDE</text>
        <text x="5" y="57.8" fontSize="3" fontWeight="600" fill="#95A0B4"
          fontFamily="ui-sans-serif, system-ui, sans-serif">{purity} PURITY</text>
        <line x1="5" y1="59.6" x2="62" y2="59.6" stroke="#4C566B" strokeWidth="0.35" />
        <text x="5" y="63" fontSize="2.85" fontWeight="600" fill="#8E99AD"
          fontFamily="ui-sans-serif, system-ui, sans-serif">BATCH {batch}</text>

        {/* COA code */}
        <rect x="76" y="50" width="14" height="14" rx="0.6" fill="#E7EBF3" />
        <g fill="#0B0B0F">
          {Array.from({ length: 6 }, (_, r) =>
            Array.from({ length: 6 }, (_, c) =>
              (r * 7 + c * 3 + (slug.charCodeAt(0) % 4)) % 3 === 0 ? (
                <rect key={`${r}-${c}`} x={77 + c * 2.1} y={51 + r * 2.1} width="1.7" height="1.7" />
              ) : null
            )
          )}
        </g>
      </svg>
    </div>
  );
}
