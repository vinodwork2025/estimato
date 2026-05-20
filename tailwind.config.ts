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
        // Architectural charcoal — replaces navy
        navy: {
          DEFAULT: "#1C1917",
          light: "#3A3530",
          muted: "#6B635C",
          faint: "#EEE9E0",
        },
        bg: {
          primary: "#F7F4EF",
          elevated: "#ffffff",
          navy: "#1C1917",
        },
        surface: {
          DEFAULT: "#F7F4EF",
          low: "#F0EBE3",
          container: "#E8E2D7",
          high: "#DDD7CC",
          white: "#FFFFFF",
        },
        text: {
          primary: "#1C1917",
          secondary: "#3A3530",
          tertiary: "#6B635C",
          inverse: "#F7F4EF",
        },
        // Bronze gold — replaces rust accent
        accent: {
          DEFAULT: "#A8823B",
          hover: "#8E6D2F",
          light: "#F5ECDF",
        },
        gold: {
          DEFAULT: "#B8954E",
          light: "#CCB07A",
          muted: "#8B6E3A",
          faint: "#F5ECDF",
        },
        success: "#2D7D5A",
        warning: "#B8741F",
        error: "#B33A3A",
        border: {
          DEFAULT: "#D4CCBF",
          strong: "#B4AB9E",
          subtle: "#E8E3DA",
        },
      },
      fontFamily: {
        // System body (Inter via CSS variable)
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        // Luxury serif display (Cormorant Garamond via CSS variable)
        serif: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        // Precision mono (DM Mono via CSS variable)
        mono: ["var(--font-mono)", "SFMono-Regular", "Consolas", "monospace"],
      },
      fontSize: {
        // Display scale
        "display": ["60px", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-sm": ["46px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        // Headlines
        "headline-xl": ["36px", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "headline-lg": ["28px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "headline-md": ["22px", { lineHeight: "1.25", letterSpacing: "-0.008em" }],
        "headline-sm": ["18px", { lineHeight: "1.3" }],
        // Body
        "body-lg": ["18px", { lineHeight: "1.7" }],
        "body": ["16px", { lineHeight: "1.65" }],
        "body-sm": ["14px", { lineHeight: "1.6" }],
        // Labels
        "label-lg": ["12px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "label": ["10px", { lineHeight: "1.4", letterSpacing: "0.14em" }],
        // Legacy compat
        "hero": ["60px", { lineHeight: "1.0" }],
        "heading": ["28px", { lineHeight: "1.2" }],
        "subheading": ["22px", { lineHeight: "1.3" }],
        "large": ["18px", { lineHeight: "1.6" }],
        "small": ["14px", { lineHeight: "1.55" }],
      },
      borderRadius: {
        // Architectural — minimal radius
        "card": "4px",
        "sm": "2px",
        "DEFAULT": "4px",
        "md": "6px",
        "lg": "8px",
        "xl": "12px",
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(28,25,23,0.04), 0 4px 12px rgba(28,25,23,0.03)",
        "card-hover": "0 4px 16px rgba(28,25,23,0.08), 0 12px 36px rgba(28,25,23,0.05)",
        "elevation-1": "0 2px 8px rgba(28,25,23,0.06)",
        "elevation-2": "0 8px 28px rgba(28,25,23,0.09)",
        "elevation-3": "0 20px 56px rgba(28,25,23,0.13)",
        "glow-gold": "0 0 20px rgba(184, 149, 78, 0.20), 0 4px 10px rgba(184, 149, 78, 0.12)",
        "glow-accent": "0 0 20px rgba(168, 130, 59, 0.18)",
        "inner-subtle": "inset 0 1px 0 rgba(255,255,255,0.5)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "scale-in": "scaleIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-right": "slideRight 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-14px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        // No gradient-gold — flat colors only per design spec
      },
      maxWidth: {
        "prose-wide": "76ch",
      },
    },
  },
  plugins: [],
};

export default config;
