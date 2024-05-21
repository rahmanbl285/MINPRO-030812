/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      'biru': '#4B6587',
      'putih': '#ffffff',
      'kuning': '#F0E5CF',
      'abu': '#C8C6C6',
      'birutua': '#495464',
      'merah': '#B80000'
    },
  },
  plugins: [
    require('daisyui'),
  ],
}