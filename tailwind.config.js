/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        forest: {
          50: '#f0fdf9',
          100: '#ccfbf1',
          500: '#14b8a6',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      boxShadow: {
        'glass': '0 4px 20px -2px rgba(16, 185, 129, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 12px 30px -4px rgba(22, 163, 74, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'glow-emerald': '0 0 25px -3px rgba(34, 197, 94, 0.35)',
        'glow-green': '0 4px 20px -2px rgba(22, 163, 74, 0.3)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.88' },
        },
      },
    },
  },
  plugins: [],
}

