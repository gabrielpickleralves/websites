import { useEffect, useState } from "react";
import type { Barco } from "./tipos";
import { RAIZ } from "./conteudo";

/* ---------- rotas pelo endereço: #/biografia, #/embarcacoes, #/embarcacoes/<barco>; o resto é a página inicial ---------- */
export type Rota = { pagina: "inicio" | "biografia" | "embarcacoes" | "embarcacao"; chave?: string; alvo?: string };
export function lerRota(): Rota {
  const h = decodeURIComponent(location.hash.slice(1));
  if (h.startsWith("/biografia")) return { pagina: "biografia" };
  if (h.startsWith("/embarcacoes/")) return { pagina: "embarcacao", chave: h.slice("/embarcacoes/".length) };
  if (h.startsWith("/embarcacoes")) return { pagina: "embarcacoes" };
  return { pagina: "inicio", alvo: h || undefined };
}
export function useRota() {
  const [rota, setRota] = useState(lerRota);
  useEffect(() => {
    const muda = () => setRota(lerRota());
    window.addEventListener("hashchange", muda);
    return () => window.removeEventListener("hashchange", muda);
  }, []);
  return rota;
}

/* ---------- preferências de quem visita ---------- */
export function useMidia(consulta: string) {
  const [sim, setSim] = useState(() => window.matchMedia(consulta).matches);
  useEffect(() => {
    const m = window.matchMedia(consulta), muda = () => setSim(m.matches);
    m.addEventListener("change", muda);
    return () => m.removeEventListener("change", muda);
  }, [consulta]);
  return sim;
}
export const useMenosMovimento = () => useMidia("(prefers-reduced-motion: reduce)");

/* ---------- embarcações à venda: o mesmo arquivo do site atual, dados/barcos.js ---------- */
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
export const simples = (t: unknown) => String(t == null ? "" : t).normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
/* a mesma chave do site atual (embarcacao.html?barco=...) */
export const chave = (b: Barco) => simples(b.nome + " " + (b.ano || "")).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const vendido = (b: Barco) => simples(b.status) === "vendido";
export function preco(v: Barco["preco"]) {
  if (v == null || v === "" || v === 0) return "Preço negociável";
  return typeof v === "number" ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }) : String(v);
}
export const caminho = (p: string) => (/^(https?:)?\/\//.test(p) ? p : RAIZ + p.replace(/^\.?\//, ""));
