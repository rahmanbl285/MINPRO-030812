/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
    colors: {
      'biru': '#4B6587',
      'putih': '#ffffff',
      'kuning': '#F0E5CF',
      'abu': '#C8C6C6',
      'birutua': '#495464',
      'merahtua': '#f70505',
      'kuningtua' : '#ede209',
      'hijautua' : '#11f20a'
    },
  },
  plugins: [require("daisyui")],
}