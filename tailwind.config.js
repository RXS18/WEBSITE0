const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: token('surface'),
        alt: token('alt'),
        card: token('card'),
        fg: token('fg'),
        muted: token('muted'),
        line: token('line'),
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pop: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        ping1: {
          '0%': { transform: 'scale(1)', opacity: '0.45' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-out',
        pop: 'pop 420ms cubic-bezier(0.22, 1, 0.36, 1) both',
        ping1: 'ping1 1.6s ease-out 2',
      },
    },
  },
  plugins: [],
};
