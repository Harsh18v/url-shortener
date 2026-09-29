import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        panel: "#F1F0E9",
        ink: "#16150F",
        muted: "#6B6A61",
        line: "#E2E1D8",
        knot: {
          DEFAULT: "#1F6F5C",
          dark: "#164E41",
          light: "#E6F0EC",
        },
        rust: "#B4552F",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        prose: "38rem",
      },
    },
  },
  plugins: [],
};
export default config;
