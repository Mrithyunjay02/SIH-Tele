/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This line is crucial
  ],
  theme: {
    extend: {
      fontFamily: {
        // Sets 'Inter' as the default font for the entire application
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
