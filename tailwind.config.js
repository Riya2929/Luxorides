/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0B0D0F",
          soft: "#12151A",
          line: "#1C2027",
        },
        ivory: {
          DEFAULT: "#EDE8DE",
          dim: "#A8A296",
        },
        gold: {
          DEFAULT: "#C9A227",
          soft: "#E4C766",
          dim: "#7A6A2E",
        },
        burgundy: {
          DEFAULT: "#3B1220",
          soft: "#5C1D30",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(201,162,39,0.35)",
        panel: "0 24px 60px -20px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
