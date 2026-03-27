import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Plum Gallery (public site) ───────────────────────
        plum: {
          primary:              "#a61c82",
          "primary-container":  "#fc69cd",
          "on-primary":         "#ffffff",
          surface:              "#fff3f9",
          "surface-low":        "#ffebf9",
          "surface-mid":        "#ffdff9",
          "surface-high":       "#ffd4f6",
          "surface-highest":    "#ffcef9",
          "on-surface":         "#432342",
          "on-surface-variant": "#744f71",
          "on-background":      "#432342",
          tertiary:             "#3255b7",
          "outline-variant":    "#cba0c6",
          950:                  "#2d1533",
        },
        // ── Navy/Steel kept for admin panel ─────────────────
        navy: {
          50:  "#f0f4fb",
          100: "#d9e4f5",
          200: "#b3c8eb",
          300: "#7ea3d8",
          400: "#4e7dc2",
          500: "#2c5fa8",
          600: "#1a4f8a",
          700: "#163f6e",
          800: "#112f52",
          900: "#0c2038",
          950: "#060f1c",
        },
        steel: {
          50:  "#f6f7f9",
          100: "#eceef2",
          200: "#d5d9e2",
          300: "#b2bbc9",
          400: "#8a97ab",
          500: "#6b7a91",
          600: "#566177",
          700: "#464f61",
          800: "#3c4252",
          900: "#353944",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body:    ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "fade-up":   "fadeUp 0.6s ease-out both",
        "fade-in":   "fadeIn 0.4s ease-out both",
        "float":     "float 3s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.5", transform: "scale(0.85)" },
        },
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, rgba(166,28,130,0.92) 0%, rgba(252,105,205,0.70) 100%)",
        "gradient-cta":  "linear-gradient(135deg, #a61c82 0%, #fc69cd 100%)",
        "gradient-card": "linear-gradient(180deg, transparent 50%, rgba(67,35,66,0.80) 100%)",
      },
      boxShadow: {
        "card":       "0 4px 40px rgba(67, 35, 66, 0.06)",
        "card-hover": "0 12px 40px rgba(67, 35, 66, 0.12)",
        "nav":        "0 2px 20px rgba(67, 35, 66, 0.08)",
        "button":     "0 4px 14px rgba(166, 28, 130, 0.30)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};

export default config;
