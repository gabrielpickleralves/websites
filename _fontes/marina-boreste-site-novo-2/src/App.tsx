import { useEffect, useRef } from "react";
import { FOTOS, INFRA } from "./dados-gerados";
import { Galeria } from "./partes/Fotos";
import { Topo } from "./partes/Topo";
import { Carta } from "./partes/Carta";
import { Abertura, Infraestrutura, Pousada, Servicos } from "./partes/Secoes";
import { Contato, Localizacao, Rodape } from "./partes/Contato";
import { Biografia, Embarcacao, Embarcacoes } from "./partes/Paginas";
import { useMenosMovimento, useRota } from "./uteis";

const TITULOS = {
  inicio: "Marina Boreste | Barra do Una, São Sebastião (SP)",
  biografia: "Biografia | Marina Boreste",
  embarcacoes: "Embarcações à venda | Marina Boreste",
  embarcacao: "Embarcação à venda | Marina Boreste",
};
// as fotos que abrem ampliadas, na ordem em que aparecem em cada página
const GALERIA_INICIO = [FOTOS.barraDoUna, ...INFRA.map(i => i.foto), FOTOS.banda, FOTOS.pousadaAerea, FOTOS.pousadaPiscina, FOTOS.mapa];
const GALERIA_BIOGRAFIA = [FOTOS.vistaAerea];

export default function App() {
  const rota = useRota();
  const menos = useMenosMovimento();
  const primeira = useRef(true);

  // ao trocar de página ou de seção: rola até o lugar certo e leva o foco ao título dele
  useEffect(() => {
    document.title = TITULOS[rota.pagina];
    const inicial = primeira.current;
    primeira.current = false;
    requestAnimationFrame(() => {
      if (rota.pagina === "inicio" && rota.alvo) {
        const el = document.getElementById(rota.alvo);
        if (!el) return;
        el.scrollIntoView({ behavior: inicial || menos ? "auto" : "smooth" });
        const t = el.matches("h1,h2") ? el : el.querySelector<HTMLElement>("h1,h2");
        if (!inicial) t?.focus({ preventScroll: true });
      } else if (!inicial) {
        window.scrollTo(0, 0);
        document.querySelector<HTMLElement>("main h1")?.focus({ preventScroll: true });
      }
    });
  }, [rota.pagina, rota.chave, rota.alvo, menos]);

  const topo = () => { window.scrollTo({ top: 0, behavior: menos ? "auto" : "smooth" }); document.querySelector<HTMLElement>("main h1")?.focus({ preventScroll: true }); };
  const inicio = rota.pagina === "inicio";

  return (
    <Galeria fotos={inicio ? GALERIA_INICIO : rota.pagina === "biografia" ? GALERIA_BIOGRAFIA : []}>
      <Topo rota={rota} />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        {inicio && <><Carta /><Abertura /><Servicos /><Infraestrutura /><Pousada /><Localizacao /><Contato /></>}
        {rota.pagina === "biografia" && <Biografia />}
        {rota.pagina === "embarcacoes" && <Embarcacoes />}
        {rota.pagina === "embarcacao" && <Embarcacao id={rota.chave || ""} />}
      </main>
      <Rodape topo={topo} />
    </Galeria>
  );
}
