/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#1a237e',
          800: '#283593',
          700: '#303f9f',
          600: '#3949ab',
        },
        accent: {
          500: '#9c27b0',
          400: '#ab47bc',
          300: '#ba68c8',
        }
      },
      backdropBlur: {
        'glass': '10px',
      }
    },
  },
  plugins: [],
}