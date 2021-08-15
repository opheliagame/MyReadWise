const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [ '_site/**/*.html' ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Poppins'", 'sans-serif']
      },
      gridTemplateRows: {
       '8': 'repeat(8, minmax(0, 1fr))',
       'card': 'auto auto 1fr',
      },
    },
    colors: {
      yellow: colors.amber,
      black: colors.black,
      white: colors.white
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}