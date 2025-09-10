/** @type {import('tailwindcss').Config} */
module.exports = {
  // This is the crucial line that enables class-based dark mode.
  // It tells Tailwind to apply dark styles whenever it sees the 'dark' class on the <html> tag.
  darkMode: 'class',

  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all your component files for Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

