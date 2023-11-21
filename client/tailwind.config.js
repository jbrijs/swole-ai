/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        primary: "#8D99AE",
        secondary: "#92B3C0",
        tertiary: "#96CCD2",
        accent: "#F26419",
      },
    },
  },
  plugins: [],
};
