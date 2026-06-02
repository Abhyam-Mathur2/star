import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: "#050510",
        void: "#01020A",
        nebula: "#7B4DFF",
        aurora: "#49C6FF",
        stellar: "#F8D879",
        moon: "#DDE3F0"
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "DM Sans", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "Syncopate", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(123, 77, 255, 0.28)",
        gold: "0 0 60px rgba(248, 216, 121, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
