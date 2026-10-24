/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tinta: { DEFAULT: "#0F2A33", 2: "#17404D" },
        casco: "#F3F4EF",
        espuma: "#DDE9EC",
        azul: { DEFAULT: "#1B9AD6", texto: "#0A6A9E", claro: "#7FCBEE" },
        cinza: "#4B636B",
        erro: "#B42318",
      },
      fontFamily: { archivo: ["Archivo", "Arial", "sans-serif"] },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: { "accordion-down": "accordion-down 0.25s ease-out", "accordion-up": "accordion-up 0.2s ease-out" },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
