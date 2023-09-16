/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'grow-shrink': {
          '0%, 100%': {
            'font-size': '3rem',
          },
          '50%': {
            'font-size': '5rem',
          },
        },
      },
      animation: {
        'pulse-grow-shrink': 'grow-shrink 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}

