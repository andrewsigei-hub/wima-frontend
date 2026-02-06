import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          deep: '#2D5A3D',
          forest: '#3A6B4A',
          sage: '#6B9B7A',
          light: '#8BB89A',
          pale: '#B5D4BC',
          mist: '#E5F0E7',
        },
        cream: {
          dark: '#D4C9A8',
          DEFAULT: '#E8E2C8',
          light: '#F5F2E6',
          bg: '#FAF8F2',
        },
        gold: {
          DEFAULT: '#A69055',
          warm: '#B8956B',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [forms],
}