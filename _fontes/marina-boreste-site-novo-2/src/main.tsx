import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

/* ícone e fontes: carregados aqui para o HTML empacotado não tentar embutir arquivos de fora */
[
  { rel: "icon", href: "../favicon.svg", type: "image/svg+xml" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600..900&family=Figtree:ital,wght@0,400..700;1,400&display=swap" },
].forEach(a => { const l = document.createElement("link"); Object.assign(l, a); document.head.appendChild(l); });

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
