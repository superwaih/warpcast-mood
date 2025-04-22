/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'meme-pink': '#FF69B4',
        'meme-neon': '#39FF14',
        'meme-blue': '#00B7EB',
        'meme-dark': '#1A1A2E',
      },
      fontFamily: {
        comic: ['"Comic Neue"', 'sans-serif'],
      },
      backgroundImage: {
        'crypto-gradient': 'linear-gradient(135deg, #FF69B4 0%, #39FF14 100%)',
      },
    },
  },
  plugins: [],
};