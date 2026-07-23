import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 0: "#050510", 1: "#0B0718", 2: "#150E2A" },
        vanguard: {
          violet: "#c084fc",   // light accent (links, active states)
          purple: "#a855f7",   // primary brand violet
          deep: "#7c3aed",     // deep violet (gradient end)
          gold: "#E8A93B",     // wings, wordmark, veteran mark
          teal: "#2ED9B8",     // strong evidence
          amber: "#FFB830",    // moderate evidence
          rose: "#FF5D8F",     // limited evidence
        },
        bone: "#F2ECFF",
        muted: "#9A8FC0",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "vg-grad": "linear-gradient(135deg,#c084fc 0%,#a855f7 50%,#7c3aed 100%)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        pulseRing: { "0%,100%": { opacity: "0.5", transform: "scale(1)" }, "50%": { opacity: "1", transform: "scale(1.05)" } },
        rise: { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "none" } },
        wave: { "0%,100%": { transform: "scaleY(0.35)" }, "50%": { transform: "scaleY(1)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseRing: "pulseRing 3s ease-in-out infinite",
        rise: "rise .6s ease both",
        wave: "wave 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
