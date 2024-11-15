import withMT from "@material-tailwind/html/utils/withMT";

module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // Используем 'content' вместо 'purge'
  darkMode: 'media', // Либо 'media', либо удалите эту строку, если не хотите использовать темную тему
  theme: {
    extend: {
      colors: {
        'pastel-blauw': '#699BF6',
        'background-element': '#1A1C25',
        'backgroundMainPage':  {
          40: '#737373',
          50: '#f2f2f2',       // оттенок на 50%
          200: '#b3b3b3',      // оттенок на 200%
          300: '#808080',      // оттенок на 300%
          400: '#4d4d4d',      // оттенок на 400%
          500: '#262626',      // оттенок на 500%
          600: '#1f1f1f',      // оттенок на 600%
          700: '#191919',      // оттенок на 700%
          800: '#0d0d0d',      // оттенок на 800%
          900: '#040404',
          100: '#040404',
          },
        'background': '#0E0F14',
        'second-background': '#191C25',
        'backgroundHeader': '#0e0f14',

      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  container: {
    center: true,
  },
  variants: {
    extend: {},
  },
  plugins: [],
});
