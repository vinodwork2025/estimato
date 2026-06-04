import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D1F3C",
          light: "#1E3A5F",
          muted: "#7B93A8",
          faint: "#EEF2F7",
        },
        bg: {
          primary: "#FFFFFF",
          secondary: "#F5F7FA",
          elevated: "#FFFFFF",
          navy: "#0D1F3C",
        },
        surface: {
          DEFAULT: "#F5F7FA",
          low: "#EEF2F7",
          container: "#DDE4ED",
          high: "#C5D0DC",
          white: "#FFFFFF",
        },
        text: {
          primary: "#09162A",
          secondary: "#2B3C51",
          tertiary: "#566776",
          inverse: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#C49A3C",
          hover: "#A8832A",
          light: "#FDF4E0",
        },
        gold: {
          DEFAULT: "#C49A3C",
          light: "#D4B86A",
          muted: "#A8832A",
          faint: "#FDF4E0",
        },
        success: "#1D6F50",
        warning: "#B8741F",
        error: "#B33A3A",
        border: {
          DEFAULT: "#DDE4ED",
          strong: "#C5D0DC",
          subtle: "#EEF2F7",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "SFMono-Regular", "Consolas", "monospace"],
      },
      fontSize: {
        "display":    ["64px",  { lineHeight: "0.97", letterSpacing: "-0.03em" }],
        "display-sm": ["48px",  { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "headline-xl":["38px",  { lineHeight: "1.1",  letterSpacing: "-0.018em" }],
        "headline-lg":["30px",  { lineHeight: "1.15", letterSpacing: "-0.012em" }],
        "headline-md":["24px",  { lineHeight: "1.22", letterSpacing: "-0.01em" }],
        "headline-sm":["20px",  { lineHeight: "1.3",  letterSpacing: "-0.006em" }],
        "body-lg":    ["20px",  { lineHeight: "1.72" }],
        "body":       ["18px",  { lineHeight: "1.7" }],
        "body-sm":    ["16px",  { lineHeight: "1.65" }],
        "label-lg":   ["14px",  { lineHeight: "1.4",  letterSpacing: "0.06em" }],
        "label":      ["12px",  { lineHeight: "1.4",  letterSpacing: "0.16em" }],
        "hero":       ["64px",  { lineHeight: "0.97" }],
        "heading":    ["30px",  { lineHeight: "1.15" }],
        "subheading": ["24px",  { lineHeight: "1.3" }],
        "large":      ["20px",  { lineHeight: "1.7" }],
        "small":      ["16px",  { lineHeight: "1.65" }],
      },
      borderRadius: {
        "card": "4px",
        "sm":   "2px",
        "DEFAULT": "4px",
        "md":   "6px",
        "lg":   "8px",
        "xl":   "12px",
        "2xl":  "16px",
        "3xl":  "20px",
        "4xl":  "24px",
      },
      boxShadow: {
        "card":        "0 1px 3px rgba(13,31,60,0.04), 0 4px 14px rgba(13,31,60,0.04)",
        "card-hover":  "0 6px 24px rgba(13,31,60,0.09), 0 1px 3px rgba(13,31,60,0.04)",
        "elevation-1": "0 2px 8px rgba(13,31,60,0.06)",
        "elevation-2": "0 8px 32px rgba(13,31,60,0.09)",
        "elevation-3": "0 20px 60px rgba(13,31,60,0.14)",
        "glow-gold":   "0 0 24px rgba(196,154,60,0.22), 0 4px 12px rgba(196,154,60,0.12)",
        "glow-accent": "0 0 20px rgba(196,154,60,0.20)",
        "inner-subtle":"inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      animation: {
        "fade-up":    "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in":    "fadeIn 0.6s ease forwards",
        "scale-in":   "scaleIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-right":"slideRight 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "shimmer":    "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp:    { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:    { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        scaleIn:   { "0%": { opacity: "0", transform: "scale(0.97)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        slideRight:{ "0%": { opacity: "0", transform: "translateX(-14px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        shimmer:   { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      maxWidth: {
        "prose-wide": "76ch",
      },
    },
  },
  plugins: [],
};

export default config;
