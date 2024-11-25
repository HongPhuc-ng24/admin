/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  
  content: ['./*.{html,css,js}','./views/index.ejs'],
  mode:'jit',
  theme: {
    extend: {
      fontFamily:{
        sans:["InterVariable", ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}

