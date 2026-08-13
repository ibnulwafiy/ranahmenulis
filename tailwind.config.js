/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        workspace: {
          black: '#0A0A0A',
          dark: '#141414',
          card: '#FFFFFF',
          'card-subtle': '#FAFAFA',
          'border-light': '#E5E5E5',
          'border-subtle': '#F0F0F0',
          'text-primary': '#0A0A0A',
          'text-secondary': '#737373',
          'text-muted': '#A3A3A3',
          'bg-canvas': '#F7F7F8',
          'bg-elevated': '#FFFFFF',
          'hover-gray': '#F2F2F2',
          'active-gray': '#EAEAEA',
        },
      },
      borderRadius: {
        'card': '20px',
        'card-sm': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'elevated': '0 8px 24px -4px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.03)',
        'modal': '0 20px 40px -12px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
