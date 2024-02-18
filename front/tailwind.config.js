/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: '#FFE3B2',
      dark: '#FAA81A',
      light: '#FEF0D7',
      white: '#FFF',
    },
    screens: {
      sm: "380px",
      md: "740px",
      lg: "1440px",
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
    },
  },
  plugins: [],
};
