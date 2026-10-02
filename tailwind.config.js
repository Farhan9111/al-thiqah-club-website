/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1B4D3E', // Deep Racing Green
        primaryDark: '#143A2F',
        accent: '#2E8B57',  // Sea Green
        gold: '#D4AF37',    // Classic Gold
        cream: '#F9F7F2',   // Elegant Background
        sand: '#E8E4D9',    // Secondary Background
        neutral: {
          900: '#0F1724',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F8FAFC',
          50: '#F1F5F9',
        },
        dark: {
          bg: '#0B1220',
          surface: '#1E293B',
          text: '#E6EEF6',
          border: '#334155',
        },
        danger: '#E05050',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        arabic: ['Noto Kufi Arabic', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInSlow: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(1.1)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fadeInSlow: 'fadeInSlow 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        scaleUp: 'scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        kenBurns: 'kenBurns 20s ease-out infinite alternate',
      },
    },
  },
  plugins: [],
};
