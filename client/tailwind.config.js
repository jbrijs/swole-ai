/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        primary: "#CDEDF6",
        secondary: "#4E878C",
        tertiary: "#EF7B45",
        accent: "#E2C044",
      },
    },
  },
  plugins: [],
};
