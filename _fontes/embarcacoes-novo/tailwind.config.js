/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rio: { DEFAULT: "#17201C", 2: "#24302B" },   // a água escura do Rio Una: texto e fundos escuros
        papel: "#FAFAF8",                            // fundo
        nevoa: "#E6EBE8",                            // fundo das fotos e painéis
        mata: "#4A5A52",                             // texto secundário
        boia: { DEFAULT: "#EF6A2E", texto: "#9A3A0E", claro: "#F6A47A" },   // laranja de boia: só nas ações
        erro: "#B42318",
      },
      fontFamily: { texto: ["\"Schibsted Grotesk\"", "Arial", "sans-serif"] },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: { "accordion-down": "accordion-down 0.25s ease-out", "accordion-up": "accordion-up 0.2s ease-out" },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
