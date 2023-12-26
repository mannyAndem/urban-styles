/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/**/*.{jsx, js}"],
  theme: {
    extend: {
      colors: {
        dark: "#1F0404",
        lightPink: "#FFF4F4",
        gray: "#5F5F5F",
        darkGray: "#5F5353",
        lightGray: "#AAB1B0",
        orange: "#FD3B2E",
      },
      fontSize: {
        superXl: "10.75rem",
        midXl: "3.5rem",
      },
    },
  },
  plugins: [],
};
