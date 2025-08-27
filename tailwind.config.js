/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pink: "#ffc2e1",
        "pink-strong": "#ff7aa2",
        blue: "#c2e9fb",
        "blue-strong": "#6aa9ff",
        yellow: "#fff6a5",
        "yellow-strong": "#ffd166",
        red: "#ffb3ba",
        text: "#1a1a1a",
        "text-soft": "#333"
      }
    },
  },
  plugins: [],
}