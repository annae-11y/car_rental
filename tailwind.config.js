/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E2E2E',
        secondary: '#D9D9D9',
        accent: '#FF6B6B',
        background: '#F8F8F8',
        charcoal: '#2E2E2E',
        coral: '#FF6B6B',
        silver: '#D9D9D9',
        softwhite: '#F8F8F8',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
