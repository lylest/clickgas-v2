/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';
export default  {
  darkMode: ["selector"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6067f4', // torea-bay '500'
          50: '#eef2ff',      // torea-bay '50'
          100: '#dfe8ff',     // torea-bay '100'
          200: '#c6d2ff',     // torea-bay '200'
          300: '#a3b5fe',     // torea-bay '300'
          400: '#7f8dfa',     // torea-bay '400'
          500: '#6067f4',     // torea-bay '500'
          600: '#4843e8',     // torea-bay '600'
          700: '#3c35cd',     // torea-bay '700'
          800: '#2f2b9c',     // torea-bay '800'
          900: '#2d2c83',     // torea-bay '900'
          950: '#1c1a4c',     // torea-bay '950'
        },
        secondary: '#16393D', // keeping the original secondary color
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        indeterminateProgress: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideDown: 'slideDown 0.3s ease-out',
        indeterminateProgress: 'indeterminateProgress 1.5s infinite ease-in-out'
      },
    },
  },
  plugins: [tailwindcssAnimate]
}
