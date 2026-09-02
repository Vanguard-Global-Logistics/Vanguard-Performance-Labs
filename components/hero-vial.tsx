import Image from "next/image";
import { accentFor } from "@/components/product-vial";

/** Position of the blank label on public/images/hero/winged-base.png,
 *  as percentages of the image box. Nudge these four numbers if the label
 *  sits slightly off — nothing else needs to change. */
const LABEL = { left: 37.5, top: 47.5, width: 25, height: 33 };

/**
 * The hero winged vial: photoreal render with a real Vanguard label composited
 * on top. The featured compound is data, so it can change without a new render.
 */
export function HeroVial({
  slug = "retatrutide", name = "RT", size = "10mg", width = 520, className = "",
}: { slug?: string; name?: string; size?: string; width?: number; className?: string }) {
  const accent = accentFor(slug);
  const n = name.length;
  const nameSize = n <= 8 ? 9 : n <= 13 ? 7 : n <= 18 ? 5.6 : 4.6;

  return (
    <div className={`relative ${className}`} style={{ width, aspectRatio: "1 / 1" }}>
      <Image
        src="/images/hero/winged-base.png"
        alt={`Vanguard ${name} research vial`}
        fill
        sizes={`${width}px`}
        priority
        className="object-contain"
      />
      <svg
        viewBox="0 0 100 60"
        className="absolute"
        style={{
          left: `${LABEL.left}%`, top: `${LABEL.top}%`,
          width: `${LABEL.width}%`, height: `${LABEL.height}%`,
        }}
        aria-hidden
      >
        <defs>
          <linearGradient id="hv-sil" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" /><stop offset="45%" stopColor="#C9D2E2" /><stop offset="100%" stopColor="#79839A" />
          </linearGradient>
          <linearGradient id="hv-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6E3AC" /><stop offset="55%" stopColor="#E8A93B" /><stop offset="100%" stopColor="#B07C20" />
          </linearGradient>
          <linearGradient id="hv-band" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity="0.36" />
            <stop offset="16%" stopColor="#FFF" stopOpacity="0.07" />
            <stop offset="54%" stopColor="#FFF" stopOpacity="0.11" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.44" />
          </linearGradient>
        </defs>

        <g transform="translate(50, 12) scale(1.05)">
          <path d="M-11 -6 Q-4.5 -8.6 -0.6 -3.6 Q-5 -4.4 -9.4 -2.2 Z" fill="url(#hv-sil)" />
          <path d="M11 -6 Q4.5 -8.6 0.6 -3.6 Q5 -4.4 9.4 -2.2 Z" fill="url(#hv-sil)" />
          <path d="M-4.1 -4.4 L0 8 L4.1 -4.4" stroke="url(#hv-sil)" strokeWidth="2.1"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
        <text x="50" y="27" textAnchor="middle" fontSize="8.4" fontWeight="800" letterSpacing="1.2"
          fill="url(#hv-gold)" fontFamily="var(--font-display), ui-sans-serif, sans-serif">VANGUARD</text>
        <text x="50" y="32.4" textAnchor="middle" fontSize="3.2" fontWeight="600" letterSpacing="1.6"
          fill="#B9C2D4" fontFamily="ui-sans-serif, sans-serif">PERFORMANCE LABS</text>

        <rect x="0" y="36" width="100" height="16" fill={accent} />
        <rect x="0" y="36" width="100" height="16" fill="url(#hv-band)" />
        <text x="50" y="44.4" textAnchor="middle" fontSize={nameSize} fontWeight="800" fill="#FFFFFF"
          fontFamily="var(--font-display), ui-sans-serif, sans-serif">{name.toUpperCase()}</text>
        <text x="50" y="50.2" textAnchor="middle" fontSize="5.2" fontWeight="600" fill="#FFFFFF"
          fillOpacity="0.94" fontFamily="ui-sans-serif, sans-serif">{size}</text>

        <text x="50" y="57" textAnchor="middle" fontSize="3" fontWeight="700" letterSpacing="0.5"
          fill="#98A2B6" fontFamily="ui-sans-serif, sans-serif">RESEARCH USE ONLY</text>
      </svg>
    </div>
  );
}
