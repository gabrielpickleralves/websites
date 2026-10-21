import { useEffect, useRef, useState } from "react";
import { FOTOS } from "../dados-gerados";
import { Imagem } from "./Fotos";
import { IcPausa } from "../icones";
import { COORD, MAPS_MARINA, NOVA_ABA, RAIZ, WHATS } from "../conteudo";
import { useMenosMovimento } from "../uteis";

/* abertura: uma folha de carta náutica, com a posição real da marina na margem */
export function Carta() {
  const video = useRef<HTMLVideoElement>(null);
  const menos = useMenosMovimento();
  const [pausado, setPausado] = useState(false);
  const [tocando, setTocando] = useState(false);

  // o vídeo só carrega depois da página, e não começa sozinho para quem pediu menos movimento
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const economia = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (menos || economia) { setPausado(true); return; }
    if (!v.src) {
      v.src = RAIZ + (v.canPlayType('video/webm; codecs="vp9"') ? "video/marina-boreste-barcos.webm" : "video/marina-boreste-barcos-leve.mp4");
    }
    v.play().catch(() => setPausado(true));
  }, [menos]);

  const alterna = () => {
    const v = video.current;
    if (!v) return;
    if (!v.src) v.src = RAIZ + "video/marina-boreste-barcos-leve.mp4";
    if (pausado) { v.play().then(() => setPausado(false)).catch(() => {}); } else { v.pause(); setPausado(true); }
  };

  return (
    <section id="inicio" aria-labelledby="titulo" className="pt-[var(--topo)]">
      <div className="wrap py-[clamp(12px,2vw,28px)]">
        <div className="carta entra-carta">
          <div className="carta-folha grid grid-cols-1 gap-x-[clamp(24px,4vw,72px)] gap-y-8 px-[clamp(18px,3.4vw,56px)] pb-[clamp(18px,2.4vw,36px)] pt-[clamp(28px,4vw,64px)] lg:min-h-[calc(100svh-var(--topo)-64px)] lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[1fr_auto]">
            {/* graus de latitude e longitude ao redor da marina, como na margem de uma carta */}
            <span aria-hidden className="carta-grau carta-grau-topo num left-[18%]">45°46′W</span>
            <span aria-hidden className="carta-grau carta-grau-topo num left-[64%] hidden sm:block">45°45′W</span>
            <span aria-hidden className="carta-grau carta-grau-lado num top-[38%]">23°45′S</span>
            <span aria-hidden className="carta-grau carta-grau-lado num top-[86%] hidden sm:block">23°46′S</span>

            <div className="flex flex-col justify-between gap-10">
              <h1 id="titulo" tabIndex={-1} className="text-[clamp(4.6rem,14vw,13rem)] font-black leading-[.82] tracking-[-.012em]">
                <span className="entra-linha"><span style={{ "--l": 0 } as React.CSSProperties}>Marina</span></span>{" "}
                <span className="entra-linha"><span style={{ "--l": 1 } as React.CSSProperties}>Boreste</span></span>
              </h1>
              <div className="entra-leve flex flex-col gap-6">
                <p className="medida text-[clamp(1.15rem,.9vw+.95rem,1.55rem)] leading-snug">Sua embarcação com amantes da navegação. Barra do Una, litoral norte de São Paulo.</p>
                <div className="flex flex-wrap items-center gap-3">
                  <a className="bt bt-azul" href={WHATS} {...NOVA_ABA}>Chamar no WhatsApp<span className="sr"> (abre em nova aba)</span></a>
                  <a className="bt bt-linha" href="#sobre">Role para conhecer</a>
                </div>
              </div>
            </div>

            <figure className="entra-leve m-0 flex flex-col gap-3 lg:row-span-1">
              <div className="prancha aspect-[4/5] sm:aspect-[9/16] lg:h-[min(58svh,640px)] lg:w-auto">
                <Imagem f={FOTOS.heroCapa} sizes="(min-width: 1024px) 400px, 100vw" eager className="" />
                <video ref={video} muted loop playsInline preload="none" aria-hidden tabIndex={-1}
                  onPlaying={() => setTocando(true)} className={tocando ? "opacity-100" : "opacity-0"} />
                <button type="button" onClick={alterna}
                  className="bt absolute bottom-3 right-3 min-h-[40px] bg-casco/90 px-3 text-[14px] text-tinta hover:bg-casco">
                  <IcPausa pausado={pausado} /><span>{pausado ? "Retomar" : "Pausar"}</span><span className="sr"> vídeo</span>
                </button>
              </div>
              <figcaption className="num text-[14px] font-semibold">
                <span className="sr">Posição da marina: </span>{COORD}
              </figcaption>
            </figure>

            {/* legenda da carta: a faixa de informações do site atual */}
            <dl className="entra-leve m-0 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-tinta pt-5 text-[15.5px] leading-[1.7] sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
              <div><dt className="font-bold">Endereço</dt><dd className="m-0"><a className="ext" href={MAPS_MARINA} {...NOVA_ABA}>Rua Petrópolis, 215<br />Barra do Una, São Sebastião (SP)<span className="sr"> (ver no Google Maps, abre em nova aba)</span></a></dd></div>
              <div><dt className="font-bold">Horário</dt><dd className="m-0">Segunda a domingo<br />das 8h às 17h</dd></div>
              <div><dt className="font-bold">Telefone e WhatsApp</dt><dd className="m-0"><a className="num" href="tel:+5512997292082"><span className="sr">Telefone: </span>(12) 99729-2082</a><br /><a className="ext" href={WHATS} {...NOVA_ABA}>Chamar no WhatsApp<span className="sr"> (abre em nova aba)</span></a></dd></div>
              <div><dt className="font-bold">Rádio</dt><dd className="m-0">VHF canal 74<br />da primeira saída ao último retorno</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
