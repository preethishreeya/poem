import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pause design tokens — Pause / Tokens in Figma
        bg: {
          app: "#F9F8F5",
          surface: "#FFFFFF",
          muted: "#F3F2F0",
        },
        accent: {
          freedom: "#03A97D", // green — positive, savings, debt-free
          danger: "#E54040",  // red — consequence, date pushed back
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
        border: {
          DEFAULT: "#E0E2E6",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
        input: "10px",
        badge: "20px",
        dot: "50%",
      },
    },
  },
  plugins: [],
};

export default config;
