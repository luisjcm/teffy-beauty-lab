/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#F43F5E',
          surface: '#ffffffe4',
          background: '#FDFBF7',
          backgroundSoft: '#F3EFE9', // Un tono arena suave para seccionar
          text: '#1F2937',
          muted: '#9CA3AF',
        }
      }
    },
  },
  plugins: [],
}