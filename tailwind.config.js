/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ["Caveat", "cursive"],
        noto: ["Noto Kufi Arabic", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        black: "#000000",
        gray: {
          100: "#F0F0F0",
          200: "#F2F0F1",
          300: "#F0EEED",
        },
        red: {
          100: "#FF3333",
        },
      },
    },
    container: {
      center: true,
      screens: {
        "2xl": "1240px",
      },
      padding: "14px",
    },
  },
  plugins: [],
};
