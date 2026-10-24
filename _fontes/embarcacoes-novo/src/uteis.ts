import { useEffect, useState } from "react";
import type { Barco } from "./tipos";

export const RAIZ = "../";   // fotos, vídeo e dados vêm da pasta do site atual
export const WHATS = "https://wa.me/5512997292082";
export const WHATS_OPORTUNIDADES = "https://wa.me/5512997292082?text=Ol%C3%A1!%20Quero%20saber%20das%20pr%C3%B3ximas%20oportunidades%20de%20barcos%20%C3%A0%20venda%20na%20Marina%20Boreste.";
export const MAPS_MARINA = "https://www.google.com/maps/search/?api=1&query=Marina%20Boreste%2C%20Barra%20do%20Una%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP&query_place_id=ChIJS2xwpZCIzZQRFnlkunPgOQ8";
export const MAPS_POUSADA = "https://www.google.com/maps/search/?api=1&query=Pousada%20Una%2C%20Rua%20Petr%C3%B3polis%2C%2080%2C%20Barra%20do%20Una%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP&query_place_id=ChIJ14_vbpqIzZQRNGed2SGEBd8";
export const INSTA_MARINA = "https://www.instagram.com/marinaboreste/";
export const NOVA_ABA = { target: "_blank", rel: "noopener" } as const;

/* rotas: # é a lista; #/<barco> é a página do barco */
export const lerChave = () => decodeURIComponent(location.hash.replace(/^#\/?/, ""));

export function useMidia(consulta: string) {
  const [sim, setSim] = useState(() => window.matchMedia(consulta).matches);
  useEffect(() => {
    const m = window.matchMedia(consulta), muda = () => setSim(m.matches);
    m.addEventListener("change", muda);
    return () => m.removeEventListener("change", muda);
  }, [consulta]);
  return sim;
}

/* o mesmo arquivo do site atual, dados/barcos.js: um barco novo lá aparece aqui também */
let pedido: Promise<Barco[]> | null = null;
export function carregaBarcos(): Promise<Barco[]> {
  if (!pedido) pedido = new Promise(fim => {
    const s = document.createElement("script");
    s.src = RAIZ + "dados/barcos.js";
    s.onload = () => { const b = (window as unknown as { BARCOS?: Barco[] }).BARCOS; fim(Array.isArray(b) ? b.filter(x => x && x.nome) : []); };
    s.onerror = () => fim([]);
    document.head.appendChild(s);
  });
  return pedido;
}
export function useBarcos() {
  const [barcos, setBarcos] = useState<Barco[] | null>(null);
  useEffect(() => { carregaBarcos().then(setBarcos); }, []);
  return barcos;
}
const simples = (t: unknown) => String(t == null ? "" : t).normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
export const chave = (b: Barco) => simples(b.nome + " " + (b.ano || "")).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");   // a mesma do site atual
export const vendido = (b: Barco) => simples(b.status) === "vendido";
export function preco(v: Barco["preco"]) {
  if (v == null || v === "" || v === 0) return "Preço negociável";
  return typeof v === "number" ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }) : String(v);
}
export const caminho = (p: string) => (/^(https?:)?\/\//.test(p) ? p : RAIZ + p.replace(/^\.?\//, ""));
export const linkWhats = (b: Barco) => WHATS + "?text=" + encodeURIComponent("Olá! Tenho interesse no barco " + b.nome + ", anunciado no site da Marina Boreste.");
