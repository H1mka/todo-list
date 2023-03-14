/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "rgb(17, 23, 94)",
        blue: "rgb(45, 112, 253)",
        dark: "rgb(0, 23, 71)",
        lightGreen: "rgba(0, 216, 167, 1)",
        lightRed: "#ff7979",
      },
      fontFamily: {
        rubick: ['rubick', 'regular'],
        inter: ['inter', 'medium']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
