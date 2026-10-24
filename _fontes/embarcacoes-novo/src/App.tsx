import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { Barco } from "./tipos";
import { IcPausa, IcVolta, IcWhats } from "./icones";
import { MAPS_MARINA, NOVA_ABA, RAIZ, WHATS, WHATS_OPORTUNIDADES, caminho, chave, lerChave, linkWhats, preco, useBarcos, useMidia, vendido } from "./uteis";

type Transicao = { startViewTransition?: (f: () => void) => { finished: Promise<void> } };

/* ---------- navegação: a foto do anúncio cresce até virar a foto da página do barco, e volta ---------- */
function useNavegacao(menos: boolean) {
  const [atual, setAtual] = useState(lerChave);
  const anterior = useRef(atual);
  const rolagemLista = useRef(0);
  useEffect(() => {
    const nomeia = (el: Element | null) => { if (el) (el as HTMLElement).style.viewTransitionName = "foto-barco"; };
    const limpa = () => document.querySelectorAll<HTMLElement>(".anuncio-foto img").forEach(e => { e.style.viewTransitionName = ""; });
    const muda = () => {
      const nova = lerChave(), velha = anterior.current;
      anterior.current = nova;
      if (!velha) rolagemLista.current = window.scrollY;
      const aplica = () => {
        flushSync(() => setAtual(nova));
        if (nova) window.scrollTo(0, 0);
        else { window.scrollTo(0, rolagemLista.current); nomeia(document.querySelector(`[data-chave="${velha}"] .anuncio-foto img`)); }
        document.querySelector<HTMLElement>("main h1")?.focus({ preventScroll: true });
      };
      const doc = document as Document & Transicao;
      if (menos || !doc.startViewTransition) { aplica(); return; }
      if (nova && !velha) nomeia(document.querySelector(`[data-chave="${nova}"] .anuncio-foto img`));
      doc.startViewTransition(aplica).finished.finally(limpa);
    };
    window.addEventListener("hashchange", muda);
    return () => window.removeEventListener("hashchange", muda);
  }, [menos]);
  return atual;
}

/* ---------- vídeo dos barcos: carrega depois da página; parado com menos movimento ou economia de dados ---------- */
function Prancha({ menos }: { menos: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [pausado, setPausado] = useState(true);
  const [tocando, setTocando] = useState(false);
  const toca = () => {
    const v = video.current;
    if (!v) return;
    if (!v.src) v.src = RAIZ + (v.canPlayType('video/webm; codecs="vp9"') ? "video/marina-boreste-barcos.webm" : "video/marina-boreste-barcos-leve.mp4");
    v.play().then(() => setPausado(false)).catch(() => setPausado(true));
  };
  useEffect(() => {
    const economia = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (menos || economia) return;
    if (document.readyState === "complete") toca(); else window.addEventListener("load", toca, { once: true });
    return () => window.removeEventListener("load", toca);
  }, [menos]);
  return (
    <div className="prancha aspect-[4/5] lg:aspect-[9/16] lg:h-[min(64svh,600px)]">
      <div className="prancha-midia absolute inset-0" aria-hidden>
        <picture>
          <source type="image/avif" srcSet={`${RAIZ}video/marina-boreste-barcos-capa-480.avif 480w, ${RAIZ}video/marina-boreste-barcos-capa-720.avif 720w`} sizes="(min-width: 1024px) 340px, 100vw" />
          <source type="image/webp" srcSet={`${RAIZ}video/marina-boreste-barcos-capa-480.webp 480w, ${RAIZ}video/marina-boreste-barcos-capa-720.webp 720w`} sizes="(min-width: 1024px) 340px, 100vw" />
          <img src={RAIZ + "video/marina-boreste-barcos-capa.jpg"} alt="" width={720} height={1280} fetchPriority="high" />
        </picture>
        <video ref={video} muted loop playsInline preload="none" tabIndex={-1} onPlaying={() => setTocando(true)} data-tocando={tocando ? "" : undefined} />
      </div>
      <button type="button" onClick={() => { if (pausado) toca(); else { video.current?.pause(); setPausado(true); } }}
        className="btn absolute bottom-3 right-3 z-[1] min-h-[44px] border-casco/50 bg-tinta/55 px-4 text-[14px] text-casco hover:bg-tinta/85">
        <IcPausa pausado={pausado} /><span>{pausado ? "Retomar" : "Pausar"}</span><span className="sr"> vídeo</span>
      </button>
    </div>
  );
}

/* ---------- topo ---------- */
function Topo() {
  return (
    <header className="sticky top-0 z-30 border-b border-tinta/10 bg-casco/95 backdrop-blur-[6px]">
      <a href="#conteudo" onClick={e => { e.preventDefault(); document.getElementById("conteudo")?.focus(); }}
        className="btn btn-tinta absolute left-2 top-2 z-40 -translate-y-[200%] focus:translate-y-0">Pular para o conteúdo</a>
      <div className="wrap flex h-[var(--topo)] items-center justify-between gap-3">
        <a href={RAIZ + "index.html"} aria-label="Marina Boreste, ir para a página inicial" className="shrink-0">
          <img src={RAIZ + "imagens/logo-marina-boreste.svg"} alt="" width={470} height={180} className="h-10 w-auto sm:h-11" />
        </a>
        <nav aria-label="Páginas do site" className="flex items-center gap-2 sm:gap-3">
          <a className="btn btn-linha hidden md:inline-flex" href={RAIZ + "biografia.html"}>Biografia</a>
          <a className="btn btn-linha hidden md:inline-flex" href={RAIZ + "index.html"}>Página inicial</a>
          <a className="btn btn-azul px-3 sm:px-5" href={WHATS} {...NOVA_ABA}><IcWhats /><span className="hidden sm:inline">WhatsApp</span><span className="sr"> da Marina Boreste (abre em nova aba)</span></a>
        </nav>
      </div>
    </header>
  );
}

/* ---------- lista ---------- */
function Lista({ barcos, menos }: { barcos: Barco[] | null; menos: boolean }) {
  const disponiveis = (barcos || []).filter(b => !vendido(b)).length;
  return (
    <>
      <section aria-labelledby="t-vendas" className="wrap grid gap-[clamp(28px,4vw,56px)] pb-[clamp(40px,6vw,88px)] pt-[clamp(32px,6vw,96px)] lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex flex-col justify-end gap-6">
          <h1 id="t-vendas" tabIndex={-1} className="text-[clamp(1.9rem,6vw,5.4rem)]">Embarcações à venda</h1>
          <p className="entra max-w-[34em] text-[clamp(1.05rem,.5vw+.95rem,1.3rem)] text-cinza">Conheça as embarcações à venda na Marina Boreste. Os preços são negociáveis, e todo o atendimento é feito pelo WhatsApp.</p>
          {barcos && disponiveis > 0 && <p className="entra text-[15px] font-semibold">{disponiveis === 1 ? "1 embarcação disponível" : disponiveis + " embarcações disponíveis"}</p>}
        </div>
        <Prancha menos={menos} />
      </section>

      <section aria-label="Lista de embarcações à venda" className="wrap pb-[clamp(64px,9vw,140px)]">
        {barcos && !disponiveis && (
          <div className="grid max-w-[40em] justify-items-start gap-5 border-t border-tinta pt-6">
            <p className="text-[18px]">No momento não há embarcações anunciadas. Fale com a gente pelo WhatsApp para saber das próximas oportunidades.</p>
            <a className="btn btn-azul" href={WHATS_OPORTUNIDADES} {...NOVA_ABA}><IcWhats />Falar no WhatsApp<span className="sr"> sobre as próximas oportunidades (abre em nova aba)</span></a>
          </div>
        )}
        <ul className="m-0 grid list-none gap-[clamp(20px,3vw,40px)] p-0">
          {(barcos || []).map(b => (
            <li key={chave(b)} data-chave={chave(b)} className="anuncio relative grid border border-tinta/15 bg-white md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div className="anuncio-foto relative aspect-[4/3] overflow-hidden bg-espuma">
                {b.foto
                  ? <img src={caminho(b.foto)} alt={b.descricaoFoto || ""} width={800} height={600} loading="lazy" decoding="async" className={"h-full w-full object-cover " + (vendido(b) ? "grayscale-[.75]" : "")} />
                  : <div className="grid h-full place-items-center"><img src={RAIZ + "imagens/logo-marina-boreste.svg"} alt="" width={470} height={180} className="w-[46%] opacity-40" /></div>}
                {vendido(b) && <span aria-hidden className="absolute left-3 top-3 rounded-full bg-tinta px-3 py-1 text-[13px] font-bold text-casco">Vendido</span>}
              </div>
              <div className="flex flex-col items-start gap-4 p-[clamp(20px,3vw,48px)]">
                <h2 className="text-[clamp(1.35rem,1.5vw+.8rem,2.3rem)]">
                  <a className="anuncio-link no-underline" href={"#/" + chave(b)}>{b.nome}{vendido(b) && <span className="sr"> (vendido)</span>}</a>
                </h2>
                <Dados b={b} />
                {b.descricao && <p className="max-w-[36em] text-cinza">{b.descricao}</p>}
                <p className="mt-auto pt-2 text-[clamp(1.25rem,1vw+1rem,1.7rem)] font-bold">{vendido(b) ? "Vendido" : preco(b.preco)}</p>
                {!vendido(b) && <a className="btn btn-azul relative z-[2] w-full md:w-auto" href={linkWhats(b)} {...NOVA_ABA}><IcWhats />Falar no WhatsApp sobre este barco<span className="sr">: {b.nome} (abre em nova aba)</span></a>}
              </div>
            </li>
          ))}
        </ul>
        <noscript><p>Para ver as embarcações à venda, ative o JavaScript do navegador ou fale com a gente pelo WhatsApp: (12) 99729-2082.</p></noscript>
      </section>
    </>
  );
}

function Dados({ b, grande }: { b: Barco; grande?: boolean }) {
  const linhas = ([["Ano", b.ano], ["Tamanho", b.pes ? b.pes + " pés" : ""], ["Motor", b.motor]] as const).filter(d => d[1] != null && d[1] !== "" && d[1] !== 0);
  if (!linhas.length) return null;
  return (
    <dl className={"m-0 " + (grande ? "self-stretch border-t border-tinta/15" : "flex flex-wrap gap-x-5 gap-y-1 text-[15px]")}>
      {linhas.map(([rot, v]) => (
        <div key={rot} className={grande ? "grid grid-cols-[7em_1fr] gap-4 border-b border-tinta/15 py-3.5" : "flex gap-1.5"}>
          <dt className="text-cinza">{rot}</dt><dd className="m-0 font-semibold">{String(v)}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- página do barco ---------- */
function Detalhe({ b, id }: { b: Barco | undefined; id: string }) {
  const fotos = b ? [b.foto, ...(b.maisFotos || [])].filter(Boolean).map(f => caminho(f as string)) : [];
  const [i, setI] = useState(0);
  useEffect(() => { document.title = (b ? b.nome : "Embarcação não encontrada") + " | Embarcações à venda | Marina Boreste"; }, [b]);
  const volta = <a className="btn btn-linha" href="#"><IcVolta />Embarcações à venda</a>;
  if (!b) return (
    <section aria-labelledby="t-barco" className="wrap py-[clamp(32px,6vw,96px)]">
      {volta}
      <h1 id="t-barco" tabIndex={-1} className="mt-8 text-[clamp(2rem,6vw,5rem)]">Embarcação não encontrada</h1>
      <p className="mt-6 max-w-[36em] text-[18px]">Não encontramos a embarcação "{id}". Ela pode ter sido vendida ou retirada do site.</p>
      <a className="btn btn-azul mt-6" href="#">Ver as embarcações à venda</a>
    </section>
  );
  return (
    <section aria-labelledby="t-barco" className="wrap pb-[clamp(110px,10vw,140px)] pt-[clamp(20px,3vw,40px)] lg:pb-[clamp(64px,9vw,140px)]">
      {volta}
      <div className="mt-6 grid gap-[clamp(24px,4vw,64px)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
        <div className="min-w-0">
          <div className="overflow-hidden bg-espuma">
            {fotos.length
              ? <img src={fotos[i]} alt={i === 0 ? b.descricaoFoto || "" : b.nome + ", foto " + (i + 1) + " de " + fotos.length} style={{ viewTransitionName: "foto-barco" }}
                  className={"mx-auto max-h-[min(84svh,980px)] w-full object-contain " + (vendido(b) ? "grayscale-[.75]" : "")} />
              : <div className="grid aspect-[4/3] place-items-center"><img src={RAIZ + "imagens/logo-marina-boreste.svg"} alt="" width={470} height={180} className="w-[46%] opacity-40" /></div>}
          </div>
          {fotos.length > 1 && (
            <ul className="m-0 mt-3 flex list-none flex-wrap gap-2.5 p-0">
              {fotos.map((f, k) => (
                <li key={f}><button type="button" onClick={() => setI(k)} aria-label={"Ver a foto " + (k + 1) + " de " + fotos.length} aria-current={k === i ? "true" : undefined}
                  className="block aspect-square w-[clamp(64px,8vw,92px)] border-2 border-transparent bg-espuma aria-[current=true]:border-tinta"><img src={f} alt="" loading="lazy" className="h-full w-full object-cover" /></button></li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-[calc(var(--topo)+28px)]">
          <h1 id="t-barco" tabIndex={-1} className="text-[clamp(1.9rem,3.6vw,3.6rem)]">{b.nome}</h1>
          <p className="text-[clamp(1.6rem,1.4vw+1.1rem,2.4rem)] font-bold">{vendido(b) ? "Vendido" : preco(b.preco)}</p>
          <Dados b={b} grande />
          {b.descricao && <div className="grid gap-2"><h2 className="text-[1.1rem]">Descrição</h2><p className="max-w-[36em] text-[17.5px]">{b.descricao}</p></div>}
          {vendido(b)
            ? <a className="btn btn-linha" href="#">Ver as embarcações à venda</a>
            : <a className="btn btn-azul hidden lg:inline-flex" href={linkWhats(b)} {...NOVA_ABA}><IcWhats />Falar no WhatsApp sobre este barco<span className="sr">: {b.nome} (abre em nova aba)</span></a>}
        </div>
      </div>
      {/* no celular, o preço e o contato ficam sempre à mão, numa barra fixa embaixo */}
      {!vendido(b) && (
        <div className="barra-celular fixed inset-x-0 bottom-0 z-20 border-t border-tinta/15 bg-casco/95 backdrop-blur-[6px] lg:hidden">
          <div className="wrap flex items-center justify-between gap-3 pt-3">
            <p className="text-[18px] font-bold">{preco(b.preco)}</p>
            <a className="btn btn-azul" href={linkWhats(b)} {...NOVA_ABA}><IcWhats />Falar no WhatsApp<span className="sr"> sobre o barco {b.nome} (abre em nova aba)</span></a>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- rodapé ---------- */
function Rodape() {
  return (
    <footer className="no-escuro bg-tinta pb-8 pt-[clamp(56px,7vw,100px)] text-casco">
      <div className="wrap grid gap-10 sm:grid-cols-2">
        <div>
          <a href={RAIZ + "index.html"} aria-label="Marina Boreste, ir para a página inicial"><img src={RAIZ + "imagens/logo-marina-boreste-negativo.svg"} alt="" width={470} height={180} loading="lazy" className="h-16 w-auto" /></a>
          <p className="mt-6 max-w-[30em] text-[15px] text-casco/80">Infraestrutura e serviços para a guarda, manutenção, compra e venda de embarcações, sempre em harmonia com o meio ambiente.</p>
        </div>
        <address className="grid content-start gap-2 text-[15.5px] not-italic sm:justify-self-end">
          <a className="ext" href={MAPS_MARINA} {...NOVA_ABA}>Rua Petrópolis, 215, Barra do Una<br />São Sebastião (SP), CEP 11624-179<span className="sr"> (ver no Google Maps, abre em nova aba)</span></a>
          <a href="tel:+551238671550"><span className="sr">Telefone: </span>(12) 3867-1550</a>
          <a href="tel:+5512997292082"><span className="sr">Celular e WhatsApp: </span>(12) 99729-2082</a>
          <a href="mailto:boreste@boreste.com.br"><span className="sr">E-mail: </span>boreste@boreste.com.br</a>
        </address>
      </div>
      <div className="wrap mt-12 flex flex-col gap-2 border-t border-casco/20 pt-6 text-[14px] text-casco/75 sm:flex-row sm:justify-between">
        <p>© 2026 Marina Boreste. Todos os direitos reservados.</p>
        <p>Segunda a domingo, das 8h às 17h</p>
      </div>
    </footer>
  );
}

export default function App() {
  const menos = useMidia("(prefers-reduced-motion: reduce)");
  const id = useNavegacao(menos);
  const barcos = useBarcos();
  useEffect(() => { if (!id) document.title = "Embarcações à venda | Marina Boreste"; }, [id]);
  return (
    <>
      <Topo />
      <main id="conteudo" tabIndex={-1}>
        {id ? (barcos ? <Detalhe b={barcos.find(x => chave(x) === id)} id={id} /> : null) : <Lista barcos={barcos} menos={menos} />}
      </main>
      <Rodape />
    </>
  );
}
