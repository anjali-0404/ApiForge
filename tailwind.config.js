/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./layout/**/*.{js,jsx,ts,tsx,mdx}",
    "./lib/**/*.{js,jsx,ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#070b1a",
          800: "#0d1530",
          700: "#1b2850"
        },
        mint: "#3be2b8",
        ember: "#ff9b72",
        sky: "#7cc5ff"
      },
      boxShadow: {
        glow: "0 12px 40px rgba(124, 197, 255, 0.22)"
      }
    }
  },
  plugins: []
};
