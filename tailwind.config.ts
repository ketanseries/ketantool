import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/tools/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#080B18",
          secondary: "#0B1020",
          card: "#111827",
          hover: "#1F293D",
        },
        brand: {
          blue: "#3B82F6",
          violet: "#8B5CF6",
          cyan: "#22D3EE",
          dark: "#080B18",
          darker: "#04060E",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "brand-gradient": "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #22D3EE 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(59, 130, 246, 0.5)",
        "glow-violet": "0 0 25px -5px rgba(139, 92, 246, 0.5)",
        "glow-cyan": "0 0 25px -5px rgba(34, 211, 238, 0.5)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
