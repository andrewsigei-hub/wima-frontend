/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-deep": "#2D5A3D",
        "primary-forest": "#3A6B4A",
        "sage-green": "#6B9B7A",
        "accent-gold": "#A69055",
        "cream-bg": "#FAF8F2",
        "cream-light": "#F5F2E6",
        "green-mist": "#E5F0E7",
        "border-cream": "#D4C9A8",

        // Existing aliases (kept for backward compatibility)
        primary: "#2D5A3D",
        "background-light": "#FAF8F2",
        "background-dark": "#121814",
        "primary-light": "#3A6B4A",
        "primary-dark": "#1E3D29",
        botanical: "#2D5A3D",
        "botanical-soft": "#3A6B4A",
        "botanical-mist": "#E5F0E7",
        "heritage-gold": "#A69055",
        "heritage-gold-soft": "#D4C9A8",
        secondary: "#FAF8F2",
        accent: "#E5F0E7",
        cream: "#F5F2E6",
        "cream-dark": "#D4C9A8",
        gold: "#A69055",
        sage: "#6B9B7A",
      },
      borderRadius: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.25rem',
      },
    },
  },
  plugins: [],
}