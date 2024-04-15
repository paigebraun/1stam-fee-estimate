/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#0073BB',
        'dark-blue': '#094FA3'
      }
    },
  },
  plugins: [],
}

