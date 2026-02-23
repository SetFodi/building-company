/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF8F5',  // Ivory
        primary: '#C9A84C',     // Champagne Gold Accent
        secondary: '#2A2A35',   // Slate details
        accent: '#C9A84C',      // Champagne
        dark: '#0D0D12',        // Obsidian (The primary dark mode color)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        craneSwing: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(15deg)' }
        },
        cableDrop: {
          '0%, 100%': { height: '16px' },
          '50%': { height: '48px' }
        },
        tractorMove: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(24px)' }
        }
      },
      animation: {
        'crane-swing': 'craneSwing 4s ease-in-out infinite',
        'cable-drop': 'cableDrop 4s ease-in-out infinite',
        'tractor-move': 'tractorMove 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
