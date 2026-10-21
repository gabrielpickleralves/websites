import { useEffect, useState } from "react";
import { FOTOS } from "../dados-gerados";
import { FotoZoom } from "./Fotos";
import { IcVolta, IcWhats } from "../icones";
import { NOVA_ABA, RAIZ, WHATS, WHATS_OPORTUNIDADES } from "../conteudo";
import type { Barco } from "../tipos";
import { caminho, chave, preco, useBarcos, vendido } from "../uteis";

const pagina = "pt-[calc(var(--topo)+clamp(32px,5vw,72px))] pb-[clamp(80px,10vw,150px)]";
const tituloPagina = "text-[clamp(3.4rem,10vw,9.5rem)] leading-[.85]";
const Volta = ({ href, children }: { href: string; children: string }) => (
  <a className="bt bt-linha mb-8" href={href}><IcVolta />{children}</a>
);

/* ---------- Biografia ---------- */
const NUMEROS = [
  { n: "40", u: "+ anos", t: "de experiência nas águas de Barra do Una" },
  { n: "3.000", u: "m²", t: "de galpões na garagem náutica" },
  { n: "10", u: "t", t: "por embarcação, sem empilhamento" },
  { n: "24", u: "h", t: "de monitoramento por câmeras" },
];
const HISTORIA = [
  "Não havia telefone celular nem GPS, não havia previsão do tempo e às vezes nem estradas. Mas mesmo assim, em meados da década de 70, Amandio Alves Pinto, um apaixonado pelo mar, saía com o seu barco navegando pela barra do Rio Una, mar afora, atraído pelas belezas do litoral norte de São Paulo.",
  "Foi por esta paixão e pelo seu espírito visionário que, ainda nesta época, ele começou a desenvolver em sua propriedade, na beira do Rio Una, as primeiras atividades náuticas da Marina Boreste, sendo ponto de apoio para amigos e outros navegantes.",
  "Com o tempo, a necessidade de facilitar o acesso a outros amantes do mar se tornava mais latente, e a Marina Boreste, acompanhando esta tendência, se organizava e se estruturava para atender os seus clientes cada vez melhor.",
  "Hoje, administrada pela família, a Marina Boreste continua investindo constantemente em melhorias, está consolidada no mercado, e a satisfação dos seus clientes é a comprovação da qualidade de seus serviços.",
  "E é neste clima de pioneirismo, amizade, honestidade e respeito à natureza que a Marina Boreste assume o compromisso de manter a sua embarcação sempre em boas mãos.",
];

export function Biografia() {
  return (
    <section aria-labelledby="t-historia" className={pagina}>
      <div className="wrap">
        <Volta href="#inicio">Voltar ao início</Volta>
        <h1 id="t-historia" tabIndex={-1} className={tituloPagina}>Nossa história</h1>
        {/* os números da marina como a escala de uma carta: valor grande, unidade e o que ele mede */}
        <ul className="m-0 mt-[clamp(40px,6vw,80px)] grid list-none grid-cols-1 border-t-[1.5px] border-tinta p-0 sm:grid-cols-2 lg:grid-cols-4">
          {NUMEROS.map(x => (
            <li key={x.n} className="border-b border-tinta/25 py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <b className="num block font-letreiro text-[clamp(3.6rem,6vw,5.6rem)] font-black leading-none">{x.n}<small className="ml-1 text-[.4em] font-extrabold">{x.u}</small></b>
              <span className="mt-2 block text-[16px]">{x.t}</span>
            </li>
          ))}
        </ul>
        <div className="mt-[clamp(56px,8vw,120px)] grid grid-cols-1 gap-12 lg:grid-cols-12">
          <figure className="m-0 lg:col-span-5 lg:sticky lg:top-[calc(var(--topo)+32px)] lg:self-start">
            <FotoZoom f={FOTOS.vistaAerea} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-square" />
            <figcaption className="mt-3 text-[15px] text-cinza">A Marina Boreste vista de cima, entre o Rio Una e o mar.</figcaption>
          </figure>
          <div className="medida lg:col-span-6 lg:col-start-7">
            <img src={RAIZ + "imagens/logo-marina-boreste.svg"} alt="Marina Boreste" width={470} height={180} loading="lazy" className="h-20 w-auto" />
            <blockquote className="m-0 mt-8 border-l-4 border-azul pl-6">
              <p className="font-bold text-azul-texto">Missão</p>
              <p className="mt-2 text-[clamp(1.15rem,.6vw+1rem,1.4rem)] leading-normal">Proporcionar infraestrutura e serviços ideais para a guarda, manutenção, compra e venda de embarcações, sempre em harmonia com o meio ambiente, para que os clientes possam desfrutar da natureza e dos prazeres da atividade náutica.</p>
            </blockquote>
            <div className="mt-10 grid gap-5 text-[17.5px]">{HISTORIA.map((p, i) => <p key={i}>{p}</p>)}</div>
            <div className="mt-12"><Volta href="#inicio">Voltar ao início</Volta></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Embarcações à venda ---------- */
const BotaoWhats = ({ b }: { b: Barco }) => (
  <a className="bt bt-azul relative z-[2]" href={WHATS + "?text=" + encodeURIComponent("Olá! Tenho interesse no barco " + b.nome + ", anunciado no site da Marina Boreste.")} {...NOVA_ABA}>
    <IcWhats />Falar no WhatsApp sobre este barco<span className="sr">: {b.nome} (abre em nova aba)</span>
  </a>
);
function Dados({ b, grande }: { b: Barco; grande?: boolean }) {
  const linhas = ([["Ano", b.ano], ["Tamanho", b.pes ? b.pes + " pés" : ""], ["Motor", b.motor]] as const).filter(d => d[1] != null && d[1] !== "" && d[1] !== 0);
  if (!linhas.length) return null;
  return (
    <dl className={"m-0 grid " + (grande ? "border-t border-tinta/25" : "gap-1 text-[15.5px]")}>
      {linhas.map(([rot, v]) => (
        <div key={rot} className={grande ? "grid grid-cols-[7.5em_1fr] gap-4 border-b border-tinta/25 py-3.5" : "flex gap-2"}>
          <dt className="text-cinza">{rot}</dt><dd className="m-0 font-semibold">{String(v)}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Embarcacoes() {
  const barcos = useBarcos();
  const disponiveis = (barcos || []).filter(b => !vendido(b)).length;
  return (
    <section aria-labelledby="t-vendas" className={pagina}>
      <div className="wrap">
        <Volta href="#inicio">Voltar ao início</Volta>
        <h1 id="t-vendas" tabIndex={-1} className={tituloPagina}>Embarcações à venda</h1>
        <p className="medida mt-8 text-[clamp(1.1rem,.6vw+1rem,1.35rem)]">Conheça as embarcações à venda na Marina Boreste. Os preços são negociáveis, e todo o atendimento é feito pelo WhatsApp.</p>
        {barcos && !disponiveis && (
          <div className="mt-12 grid max-w-[40em] justify-items-start gap-5 border-t-[1.5px] border-tinta pt-6">
            <p className="text-[18px]">No momento não há embarcações anunciadas. Fale com a gente pelo WhatsApp para saber das próximas oportunidades.</p>
            <a className="bt bt-azul" href={WHATS_OPORTUNIDADES} {...NOVA_ABA}><IcWhats />Falar no WhatsApp<span className="sr"> sobre as próximas oportunidades (abre em nova aba)</span></a>
          </div>
        )}
        {/* cada anúncio é uma linha da lista; clicar em qualquer parte dele abre a página do barco */}
        <ul className="m-0 mt-[clamp(40px,6vw,80px)] grid list-none gap-0 p-0" aria-label="Lista de embarcações à venda">
          {(barcos || []).map(b => (
            <li key={chave(b)} className="group relative grid grid-cols-1 gap-6 border-t-[1.5px] border-tinta py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
              <div className={"aspect-[4/3] overflow-hidden bg-espuma " + (b.foto ? "" : "grid place-items-center")}>
                {b.foto
                  ? <img src={caminho(b.foto)} alt={b.descricaoFoto || ""} width={800} height={600} loading="lazy" className={"h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03] " + (vendido(b) ? "grayscale-[.75]" : "")} />
                  : <img src={RAIZ + "imagens/logo-marina-boreste.svg"} alt="" width={470} height={180} className="w-[46%] opacity-40" />}
              </div>
              <div className="flex flex-col items-start gap-4">
                <h2 className="text-[clamp(2.2rem,3.6vw,3.6rem)]">
                  <a href={"#/embarcacoes/" + chave(b)} className="no-underline after:absolute after:inset-0 after:z-[1] group-hover:underline focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-[3px] focus-visible:after:outline-offset-2 focus-visible:after:outline-[var(--foco)]">
                    {b.nome}{vendido(b) && <span className="sr"> (vendido)</span>}
                  </a>
                </h2>
                {vendido(b) && <span aria-hidden className="rounded bg-tinta px-3 py-1 text-[13px] font-bold text-casco">Vendido</span>}
                <Dados b={b} />
                {b.descricao && <p className="medida text-cinza">{b.descricao}</p>}
                <p className="num mt-auto text-[clamp(1.4rem,1.2vw+1rem,1.9rem)] font-bold">{preco(b.preco)}</p>
                {!vendido(b) && <BotaoWhats b={b} />}
              </div>
            </li>
          ))}
        </ul>
        <noscript><p>Para ver as embarcações à venda, ative o JavaScript do navegador.</p></noscript>
        <div className="mt-6 border-t-[1.5px] border-tinta pt-10"><Volta href="#inicio">Voltar ao início</Volta></div>
      </div>
    </section>
  );
}

/* ---------- a página de cada barco ---------- */
export function Embarcacao({ id }: { id: string }) {
  const barcos = useBarcos();
  const b = barcos?.find(x => chave(x) === id);
  const fotos = b ? [b.foto, ...(b.maisFotos || [])].filter(Boolean).map(f => caminho(f as string)) : [];
  const [atual, setAtual] = useState(0);
  useEffect(() => { if (b) document.title = b.nome + " | Embarcações à venda | Marina Boreste"; }, [b]);
  if (barcos && !b) {
    return (
      <section aria-labelledby="t-emb" className={pagina}>
        <div className="wrap">
          <Volta href="#/embarcacoes">Embarcações à venda</Volta>
          <h1 id="t-emb" tabIndex={-1} className={tituloPagina}>Embarcação não encontrada</h1>
          <div className="mt-10 grid max-w-[40em] justify-items-start gap-5">
            <p className="text-[18px]">Não encontramos esta embarcação. Ela pode ter sido vendida ou retirada do site.</p>
            <a className="bt bt-azul" href="#/embarcacoes">Ver as embarcações à venda</a>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section aria-labelledby="t-emb" className={pagina}>
      <div className="wrap">
        <Volta href="#/embarcacoes">Embarcações à venda</Volta>
        <div className="grid grid-cols-1 gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
          <div className="min-w-0">
            <div className="bg-espuma">
              {b && fotos.length
                ? <img src={fotos[atual]} alt={atual === 0 ? b.descricaoFoto || "" : b.nome + ", foto " + (atual + 1) + " de " + fotos.length} className={"mx-auto max-h-[min(86svh,1000px)] w-full object-contain " + (vendido(b) ? "grayscale-[.75]" : "")} />
                : <div className="grid aspect-[4/3] place-items-center"><img src={RAIZ + "imagens/logo-marina-boreste.svg"} alt="" width={470} height={180} className="w-[46%] opacity-40" /></div>}
            </div>
            {fotos.length > 1 && (
              <ul className="m-0 mt-3 flex list-none flex-wrap gap-2.5 p-0">
                {fotos.map((f, i) => (
                  <li key={f}><button type="button" onClick={() => setAtual(i)} aria-label={"Ver a foto " + (i + 1) + " de " + fotos.length} aria-current={i === atual ? "true" : undefined}
                    className="block aspect-square w-[clamp(64px,8vw,92px)] border-2 border-transparent bg-espuma aria-[current=true]:border-tinta"><img src={f} alt="" loading="lazy" className="h-full w-full object-cover" /></button></li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col items-start gap-6 lg:sticky lg:top-[calc(var(--topo)+28px)]">
            <h1 id="t-emb" tabIndex={-1} className="text-[clamp(2.6rem,4.4vw,4.4rem)]">{b ? b.nome : "Embarcação à venda"}</h1>
            {b && <>
              <p className="num text-[clamp(1.6rem,1.4vw+1.1rem,2.4rem)] font-bold">{vendido(b) ? "Vendido" : preco(b.preco)}</p>
              <div className="self-stretch"><Dados b={b} grande /></div>
              {b.descricao && <div className="grid gap-2"><h2 className="text-[1.6rem]">Descrição</h2><p className="medida text-[17.5px]">{b.descricao}</p></div>}
              {vendido(b) ? <a className="bt bt-linha" href="#/embarcacoes">Ver as embarcações à venda</a> : <BotaoWhats b={b} />}
            </>}
          </div>
        </div>
      </div>
    </section>
  );
}
