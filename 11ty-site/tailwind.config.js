const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [ '_site/**/*.html' ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Open Sans Condensed'", 'sans-serif', 'ui-sans-serif', 'system-ui'],
        serif: ["'EB Garamond'", 'ui-serif', 'Georgia']
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