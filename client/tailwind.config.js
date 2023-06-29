/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      sm: '480px', 
      md: '768px', 
      lg: '976px', 
      xl: '1440px'
    },
    extend: {
      colors: {
        primary: "#04A000",
        secondary: "#FFDB53",
        complementary: "#FFE9B1",
        minWhite: "#FCFDF2"
      },
      fontFamily: {
        primary: ["'Roboto'", '"sans-serif"'],
        complementry: ["'Montserrat'", 'sans-serif'],
        white: ["'Playfair Display'", 'serif'],
        secondary: ["'Lato'", "sans-serif"]
      }, 
      backgroundImage: {
        'heroPattern': "url('/public/images/vector3.svg')",
      }
    },
  },
  plugins: [],
}

