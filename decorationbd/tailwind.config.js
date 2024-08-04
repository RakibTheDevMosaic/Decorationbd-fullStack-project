/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily:{
      Roboto:["Roboto","sans-serif"],
      Poppins:["Poppins","sans-serif"]
    },
    extend: {
      screens:{
        "1024px":"1024px",
        "1280px":"1280px",
        "768px":"768px",
        "1350px":"1350px",
        "300px":"300px",
        "1500px":"1500px",
      },
    },
  },
  plugins: [],
}

