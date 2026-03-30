/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./blog/**/*.html", "./roi/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'zap-orange': '#ff6b35',
        'zap-coral': '#f7931e',
        'zap-pink': '#ff3d7f',
        'zap-dark': '#0a0a0a',
        'zap-gray': '#1a1a1a',
      }
    }
  },
  plugins: [],
}
