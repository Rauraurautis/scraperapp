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
            'transform': 'scale(1)',
          },
          '50%': {
            'transform': 'scale(1.5)',
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

