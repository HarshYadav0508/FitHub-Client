/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        'primary': '#101011',
        'secondary': '#00A5CF',
        'dark': '#262626',
        'dark2': '#383838',
      }
    },
  },
  plugins: [],
}

