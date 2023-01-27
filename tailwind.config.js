/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'red': '#fe3a44',
      'light-red': 'ff4750',
      'light-gray': '#efefef',
      'dark-gray': '#b3b3b3',
      'white': '#ffffff',
      'black': '#000000'
    },
    extend: {
      fontFamily: {
        'sans': ['"Lato"', defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
