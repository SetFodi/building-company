/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F2F0E9', // Cream / Paper
        primary: '#2E4036',   // Moss / Deep Green
        accent: '#CC5833',    // Clay / Terracotta / Signal Red
        dark: '#1A1A1A',      // Charcoal / Obsidian
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        drama: ['Instrument Serif', 'serif'],
        mono: ['Geist Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
