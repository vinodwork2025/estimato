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
          DEFAULT: "#0E2146",
          light: "#1A3461",
          muted: "#2D4A7A",
          faint: "#E8EDF5",
        },
        bg: {
          primary: "#F8F6F2",
          elevated: "#ffffff",
          navy: "#0E2146",
        },
        surface: {
          DEFAULT: "#F8F6F2",
          low: "#F2EFE9",
          container: "#EAE7DF",
          high: "#E0DDD5",
          white: "#FFFFFF",
        },
        text: {
          primary: "#0E2146",
          secondary: "#1A1A1A",
          tertiary: "#0a0a0a",
          inverse: "#F8F6F2",
        },
        accent: {
          DEFAULT: "#C8633A",
          hover: "#B5552E",
          light: "#FEF0EB",
        },
        gold: {
          DEFAULT: "#C5A059",
          light: "#D4B47A",
          muted: "#9A7B3F",
          faint: "#F7F0E2",
        },
        success: "#2D7D5A",
        warning: "#B8741F",
        error: "#B33A3A",
        border: {
          DEFAULT: "#E2DDD4",
          strong: "#C8C2B8",
          subtle: "#EDE9E2",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "SF Pro Text", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display": ["56px", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-sm": ["44px", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "headline-xl": ["36px", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "headline-lg": ["28px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "headline-md": ["22px", { lineHeight: "1.25" }],
        "headline-sm": ["18px", { lineHeight: "1.3" }],
        "body-lg": ["18px", { lineHeight: "1.65" }],
        "body": ["16px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.55" }],
        "label-lg": ["13px", { lineHeight: "1.4", letterSpacing: "0.06em" }],
        "label": ["11px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        // Legacy compat
        "hero": ["60px", { lineHeight: "1.05" }],
        "heading": ["28px", { lineHeight: "1.2" }],
        "subheading": ["22px", { lineHeight: "1.3" }],
        "large": ["18px", { lineHeight: "1.5" }],
        "small": ["14px", { lineHeight: "1.5" }],
      },
      borderRadius: {
        card: "16px",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2rem",
      },
      boxShadow: {
        "card": "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.06)",
        "elevation-1": "0 2px 12px rgba(0,0,0,0.06)",
        "elevation-2": "0 8px 32px rgba(0,0,0,0.1)",
        "elevation-3": "0 20px 60px rgba(0,0,0,0.15)",
        "glow-gold": "0 0 24px rgba(197, 160, 89, 0.25), 0 4px 12px rgba(197, 160, 89, 0.15)",
        "glow-accent": "0 0 24px rgba(200, 99, 58, 0.2)",
        "inner-subtle": "inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-right": "slideRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold": "linear-gradient(135deg, #C5A059, #E9C176)",
      },
    },
  },
  plugins: [],
};

export default config;
