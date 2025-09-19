// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7E57C2',
          light: '#B39DDB',
          dark: '#5E35B1',
        },
        background: '#F9F7F4',
        text: {
          DEFAULT: '#333333',
          light: '#666666',
        },
      },
    },
  },
  plugins: [],
}
