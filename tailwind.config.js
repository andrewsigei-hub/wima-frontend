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
        "primary-light": "#3A6B4A",
        "primary-dark": "#1E3D29",
        secondary: "#FAF8F2",
        accent: "#E5F0E7",
        cream: "#E8E2C8",
        "cream-dark": "#D4C9A8",
        gold: "#A69055",
      },
    },
  },
  plugins: [],
}