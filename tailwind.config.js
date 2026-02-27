/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D5A3D",
        "background-light": "#FAF8F2",
        "background-dark": "#121814",
        "primary-light": "#3A6B4A",
        "primary-dark": "#1E3D29",
        botanical: "#234735",
        "botanical-soft": "#3E6E57",
        "botanical-mist": "#EAF2EC",
        "heritage-gold": "#A69055",
        "heritage-gold-soft": "#D8C79A",
        secondary: "#FAF8F2",
        accent: "#E5F0E7",
        cream: "#E8E2C8",
        "cream-dark": "#D4C9A8",
        gold: "#A69055",
        sage: "#6B9B7A",
      },
    },
  },
  plugins: [],
}