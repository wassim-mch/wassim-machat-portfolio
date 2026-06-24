/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0f0f0f",
        accent: "#60a5fa",
        secondary: "#a1a1aa",
      },
    },
  },
  plugins: [],
};
