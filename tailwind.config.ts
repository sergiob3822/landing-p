import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#FFD700",
          soft: "#FFE873",
          deep: "#C9A227",
        },
        felt: {
          DEFAULT: "#0a3d1f",
          dark: "#062612",
        },
        royal: "#1a0b2e",
        neon: {
          pink: "#ff2e88",
          purple: "#9d4edd",
          cyan: "#00e5ff",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 215, 0, 0.35)",
        "glow-pink": "0 0 40px rgba(255, 46, 136, 0.45)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 25px rgba(255,215,0,0.4)" },
          "50%": { boxShadow: "0 0 55px rgba(255,215,0,0.85)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.92)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        floaty: "floaty 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        spinSlow: "spinSlow 18s linear infinite",
        pop: "pop 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
