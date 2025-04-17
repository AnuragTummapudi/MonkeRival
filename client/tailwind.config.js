/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'monke-dark': '#232323',
        'monke-darker': '#1a1a1a',
      },
      animation: {
        cursor: 'cursor .6s linear infinite alternate',
      },
      keyframes: {
        cursor: {
          '0%, 40%': { opacity: 1 },
          '60%, 100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};