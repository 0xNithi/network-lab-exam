/** @type {import('tailwindcss').Config} */
const _ = require("lodash")

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

module.exports = _.mergeWith(
  require("../../packages/ui/tailwind.config"),
  {
    darkMode: "class",
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  },
  customizer
)
