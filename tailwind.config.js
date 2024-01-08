/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'green': '#178733',
      'green_secondary': '#71b657',
      'light_green': '#499557',
      'white': '#ffffff',
      'light_black': "#1E1E1E",
      'ash': '#CCCCCC',
      'background': '#F1F1F1',
    },
  },
  plugins: [],
}