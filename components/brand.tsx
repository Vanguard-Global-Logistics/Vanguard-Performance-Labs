import Image from "next/image";
import { brandAssets, hasAsset, type BrandAsset } from "@/lib/assets";

// Brand artwork built as SVG so the repo has ZERO missing/placeholder assets.
// These are swappable: replace with approved artwork later without layout changes.

// Cinematic hero centerpiece: gold winged research vial with glow ring.
// Swappable for approved artwork later; keeps the same footprint.
export function WingedVial({ className = "", size = 220, label = false, priority = false }: { className?: string; size?: number; label?: boolean; priority?: boolean }) {
  const art = brandAssets.heroVial;
  if (hasAsset(art)) {
    return (
      <Image
        src={art.src}
        alt="Vanguard Performance Labs winged research vial"
        width={art.width}
        height={art.height}
        priority={priority}
        sizes="(max-width: 768px) 80vw, 480px"
        className={className}
        style={{ width: size, height: "auto" }}
      />
    );
  }
  return (
    <svg className={className} width={size} height={size * 0.75} viewBox="0 0 320 240" fill="none" aria-hidden>
      <defs>
        <linearGradient id="vgGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F6D98B" /><stop offset="45%" stopColor="#E8A93B" /><stop offset="100%" stopColor="#9C6B1E" />
        </linearGradient>
        <linearGradient id="vgVial" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A3B8C" /><stop offset="55%" stopColor="#3A2168" /><stop offset="100%" stopColor="#1C1140" />
        </linearGradient>
        <radialGradient id="vgRing" cx="0.5" cy="0.5" r="0.5">
          <stop offset="60%" stopColor="#E8A93B" stopOpacity="0" /><stop offset="82%" stopColor="#E8A93B" stopOpacity="0.55" /><stop offset="100%" stopColor="#E8A93B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vgHalo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" /><stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="120" rx="150" ry="120" fill="url(#vgHalo)" />
      <circle cx="160" cy="118" r="92" fill="url(#vgRing)" />
      {/* wings */}
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(160,110) scale(${s},1)`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i}
              d={`M8 ${-6 + i * 9} Q ${70 + i * 14} ${-18 + i * 9} ${120 + i * 12} ${4 + i * 11} Q ${74 + i * 10} ${2 + i * 9} 8 ${8 + i * 9} Z`}
              fill="url(#vgGold)" opacity={0.95 - i * 0.13} />
          ))}
        </g>
      ))}
      {/* vial body */}
      <rect x="132" y="72" width="56" height="120" rx="26" fill="url(#vgVial)" stroke="url(#vgGold)" strokeWidth="2" />
      <rect x="140" y="80" width="8" height="96" rx="4" fill="#ffffff" opacity="0.14" />
      {/* cap */}
      <rect x="138" y="58" width="44" height="20" rx="5" fill="#12101C" stroke="url(#vgGold)" strokeWidth="1.5" />
      {/* V emblem */}
      <path d="M148 104 L160 132 L172 104" stroke="url(#vgGold)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {label && (
        <g>
          <rect x="132" y="150" width="56" height="30" rx="4" fill="#0E0B1A" opacity="0.85" />
          <text x="160" y="162" textAnchor="middle" fontSize="7" fontWeight="800" fill="#E8A93B" fontFamily="ui-sans-serif,sans-serif">ADVANCED FORMULA</text>
          <text x="160" y="173" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#B9A6E8" fontFamily="ui-sans-serif,sans-serif">RESEARCH PEPTIDE</text>
        </g>
      )}
    </svg>
  );
}

export function JessiePortrait({ className = "", size = 300, variant = "portrait", priority = false }: { className?: string; size?: number; variant?: "hero" | "portrait" | "avatar"; priority?: boolean }) {
  const art: BrandAsset =
    variant === "hero" ? brandAssets.jessieHero
    : variant === "avatar" ? brandAssets.jessieAvatar
    : brandAssets.jessiePortrait;
  if (hasAsset(art)) {
    return (
      <Image
        src={art.src}
        alt="Jessie, Vanguard AI Concierge"
        width={art.width}
        height={art.height}
        priority={priority}
        sizes="(max-width: 768px) 50vw, 400px"
        className={`object-cover ${className}`}
        style={{ width: size, height: "auto" }}
      />
    );
  }
  return (
    <svg className={className} width={size} height={size * 1.25} viewBox="0 0 240 300" fill="none" aria-label="Jessie, Vanguard AI Concierge">
      <defs>
        <linearGradient id="jCoat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F4F7FF" /><stop offset="100%" stopColor="#C9D4EC" /></linearGradient>
        <linearGradient id="jRim" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#a855f7" /></linearGradient>
        <radialGradient id="jGlow" cx="0.5" cy="0.4" r="0.6"><stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" /><stop offset="100%" stopColor="#7c3aed" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="120" cy="150" rx="110" ry="140" fill="url(#jGlow)" />
      {/* purple rim light */}
      <path d="M60 120 Q120 40 180 120 L180 300 L60 300 Z" fill="url(#jRim)" opacity="0.25" />
      {/* white coat */}
      <path d="M72 150 Q120 128 168 150 L182 300 L58 300 Z" fill="url(#jCoat)" />
      <path d="M120 138 L120 300" stroke="#AEB9D6" strokeWidth="1.5" />
      {/* crossed arms suggestion */}
      <path d="M72 200 Q120 176 168 200 L160 232 Q120 210 80 232 Z" fill="#DCE4F5" />
      {/* neck + head */}
      <rect x="108" y="112" width="24" height="26" rx="10" fill="#E7B58C" />
      <ellipse cx="120" cy="92" rx="34" ry="40" fill="#EEC29B" />
      {/* hair */}
      <path d="M86 92 Q88 46 120 44 Q152 46 154 92 Q150 70 120 66 Q90 70 86 92 Z" fill="#3A2E4A" />
      {/* eyes + smile */}
      <circle cx="108" cy="90" r="3" fill="#2A2340" /><circle cx="132" cy="90" r="3" fill="#2A2340" />
      <path d="M110 104 Q120 111 130 104" stroke="#B4745A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* rim highlight */}
      <path d="M154 92 Q160 130 150 160" stroke="url(#jRim)" strokeWidth="3" fill="none" opacity="0.7" />
    </svg>
  );
}

export function EagleVMark({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 0.92}
      viewBox="0 0 200 184"
      fill="none"
      className={className}
      role="img"
      aria-label="Vanguard Performance Labs eagle-V mark"
    >
      <defs>
        <linearGradient id="vgChrome" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#E8EEF8" />
          <stop offset="45%" stopColor="#A9B5CB" />
          <stop offset="68%" stopColor="#EDF1F9" />
          <stop offset="100%" stopColor="#636F87" />
        </linearGradient>
        <linearGradient id="vgChromeDark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4CDDE" />
          <stop offset="55%" stopColor="#79849B" />
          <stop offset="100%" stopColor="#414B5E" />
        </linearGradient>
      </defs>

      {/* crest feathers sweeping back */}
      <path d="M98 30 Q126 20 148 28 Q124 32 104 42 Z" fill="url(#vgChromeDark)" opacity="0.85" />
      <path d="M96 40 Q126 34 150 44 Q122 44 100 52 Z" fill="url(#vgChromeDark)" opacity="0.6" />
      <path d="M92 50 Q120 48 142 60 Q116 56 96 62 Z" fill="url(#vgChromeDark)" opacity="0.4" />

      {/* head */}
      <path d="M100 34 Q106 52 98 70 Q88 86 64 88 Q44 88 38 72 Q34 59 43 49 Q56 35 79 31 Q93 29 100 34 Z" fill="url(#vgChrome)" />

      {/* hooked beak */}
      <path d="M46 52 L12 60 Q21 67 35 66 L30 72 Q44 75 51 67 Q54 58 46 52 Z" fill="url(#vgChromeDark)" />
      <path d="M46 54 L18 60 Q26 65 37 64" stroke="#2B3242" strokeWidth="1.1" fill="none" opacity="0.7" />

      {/* eye + brow */}
      <circle cx="71" cy="52" r="5.4" fill="#0B0B12" />
      <circle cx="72.8" cy="50.2" r="1.7" fill="#FFFFFF" opacity="0.9" />
      <path d="M62 44 Q74 40 84 45" stroke="#2B3242" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.55" />

      {/* the V */}
      <path d="M56 62 L100 180 L144 62 L121 62 L100 126 L79 62 Z" fill="url(#vgChrome)" />
      <path d="M56 62 L100 180 L144 62" stroke="#3C4557" strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.6" />
      <path d="M65 67 L97 152" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function VanguardLogo({ className = "", tagline = false }: { className?: string; tagline?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <EagleVMark size={40} />
      <span className="leading-none">
        <span
          className="block font-display text-base font-black tracking-[0.06em]"
          style={{
            backgroundImage: "linear-gradient(180deg,#F8DFA0 0%,#E8A93B 52%,#A8721F 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          VANGUARD
        </span>
        <span className="mt-0.5 block text-[8px] font-bold tracking-[0.30em] text-bone/80">PERFORMANCE LABS</span>
        {tagline && (
          <span className="mt-1 block text-[7px] font-semibold tracking-[0.18em] text-muted">
            ADVANCED PEPTIDES. PROVEN PURITY.
          </span>
        )}
      </span>
    </div>
  );
}
