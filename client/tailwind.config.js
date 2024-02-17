/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        primary: "#214334",
        secondary: "#3E7A56",
        tertiary: "#0081A7",
        accent: "#F26419",
        text: "#3A2E39", 
        background: "#D3D3D3",
        button: "#3E7A56",
        button_hover: "#376D4C"
      },
    },
  },
  plugins: [],
};
