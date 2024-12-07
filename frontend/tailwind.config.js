import withMT from "@material-tailwind/html/utils/withMT";

module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // Если не хотите темную тему, удалите эту строку
  theme: {
    extend: {
      colors: {
        'pastel-blauw': '#699BF6',
        'background-element': '#1A1C25',
        'backgroundMainPage':  {
          40: '#737373',
          50: '#f2f2f2',
          200: '#b3b3b3',
          300: '#808080',
          400: '#4d4d4d',
          500: '#262626',
          600: '#1f1f1f',
          700: '#191919',
          800: '#0d0d0d',
          900: '#040404',
          100: '#040404',
        },
        'background': '#0E0F14',
        'second-background': '#191C25',
        'backgroundHeader': '#0e0f14',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
  container: {
    center: true,
  },
  animation: {
    rotate: 'rotate 1s linear infinite', // Вращение с указанной длительностью
  },
  keyframes: {
    rotate: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  },

});
