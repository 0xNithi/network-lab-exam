/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["../../packages/ui/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
