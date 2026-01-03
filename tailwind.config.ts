import tailwindScrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["scrollbar-hide"],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Urbanist", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        sora: ["Sora", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
        // Legacy fonts kept for compatibility
        pollinator: "Pollinator",
        autography: "Autography",
        airstrip: "airstrip",
        noto: ["Noto Sans Bengali"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        // Organic Food Theme Colors
        organic: {
          50: "#f0fdf4", // Lightest green
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e", // Primary green
          600: "#16a34a", // Deep green
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        earth: {
          50: "#fafaf9", // Stone/cream
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e", // Brown
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
        fresh: {
          50: "#fffbeb", // Warm yellow/amber
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b", // Fresh amber
          600: "#d97706",
          700: "#b45309",
        },
        // Keep legacy colors for backward compatibility; prefer CSS vars for runtime theming
        primary: {
          DEFAULT: "var(--color-primary, #16a34a)", // Organic green-600
          foreground: "var(--color-primary-foreground, #ffffff)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary, #fafaf9)", // Earth-50
          foreground: "var(--color-secondary-foreground, #1c1917)", // Earth-900
        },
        base: "var(--color-base, #fffbeb)", // Fresh-50
        tertiary: "var(--color-tertiary, #fbbf24)", // Fresh-400
        accent: "var(--color-accent, #f59e0b)", // Fresh-500
        muted: "var(--color-muted, #a8a29e)", // Earth-400
      },
      screens: {
        "mobile-lg": "425px",
        "mobile-sm": "375px",
        "mobile-xs": "360px",
      },
      animation: {
        "light-up-down": "light-up-down 1.5s infinite",
        shimmer: "shimmer 2s linear infinite",
        "leaf-float": "leaf-float 3s ease-in-out infinite",
        "organic-pulse":
          "organic-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "light-up-down": {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "0% 100%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "leaf-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(5deg)" },
        },
        "organic-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      boxShadow: {
        organic:
          "0 4px 6px -1px rgba(22, 163, 74, 0.1), 0 2px 4px -1px rgba(22, 163, 74, 0.06)",
        "organic-lg":
          "0 10px 15px -3px rgba(22, 163, 74, 0.1), 0 4px 6px -2px rgba(22, 163, 74, 0.05)",
        earth:
          "0 4px 6px -1px rgba(68, 64, 60, 0.1), 0 2px 4px -1px rgba(68, 64, 60, 0.06)",
      },
    },
  },
  plugins: [tailwindScrollbar, require("@tailwindcss/typography")],
};

export default config;
