/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'red': '#fe3a44',
      'light-red': '#ff4750',
      'light-gray': '#efefef',
      'dark-gray': '#737373',
      'white': '#ffffff',
      'black': '#000000'
    },
    extend: {
      fontFamily: {
        'sans': ['"Lato"', defaultTheme.fontFamily.sans],
      },
      animation: {
        'ping-low': 'pinglow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        pinglow: {
          '0%': { transform: 'scale(1.15)', opacity: '1' },
          '50%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.15)', opacity: '1' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
