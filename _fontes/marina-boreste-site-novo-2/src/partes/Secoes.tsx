import * as Tabs from "@radix-ui/react-tabs";
import * as Accordion from "@radix-ui/react-accordion";
import { FOTOS, INFRA, SERVICOS } from "../dados-gerados";
import { FotoZoom, Imagem } from "./Fotos";
import { IcFace, IcInsta, IcWhats } from "../icones";
import { FACE_POUSADA, INSTA_POUSADA, MAPS_POUSADA, NOVA_ABA, SITE_POUSADA, WHATS_POUSADA } from "../conteudo";
import { useMidia } from "../uteis";

const secao = "py-[clamp(80px,11vw,170px)]";
const tituloSecao = "text-[clamp(3.2rem,9vw,8.5rem)]";

/* ---------- mais de 40 anos ---------- */
export function Abertura() {
  return (
    <section id="sobre" aria-labelledby="t-sobre" className={secao}>
      <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 id="t-sobre" tabIndex={-1} className="text-[clamp(2.9rem,6.6vw,6.6rem)]">Mais de 40 anos nas águas de Barra do Una</h2>
          <p className="medida mt-8 text-[clamp(1.15rem,.8vw+1rem,1.5rem)] leading-normal">Com a Marina Boreste você navega tranquilo em uma das mais belas regiões do litoral paulista. Conte com a estrutura e o apoio de quem tem mais de 40 anos de experiência nas águas de Barra do Una.</p>
        </div>
        <figure className="m-0 lg:col-span-4 lg:col-start-9">
          <FotoZoom f={FOTOS.barraDoUna} sizes="(min-width: 1024px) 32vw, 100vw" className="aspect-[14/15]" />
          <figcaption className="mt-3 text-[15px] text-cinza">Barra do Una, onde o Rio Una encontra o mar.</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ---------- serviços: um índice; no celular, uma sanfona ---------- */
function DetalheServico({ s, comTitulo }: { s: (typeof SERVICOS)[number]; comTitulo: boolean }) {
  return (
    <div className="grid gap-6">
      <div className="aspect-square max-w-[560px] overflow-hidden bg-casco">
        <Imagem f={s.foto} sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full object-cover" />
      </div>
      <div className="medida grid gap-3 text-[17.5px]">
        {comTitulo && <h3 className="text-[clamp(2rem,3vw,2.8rem)]">{s.titulo}</h3>}
        {s.texto.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
}

export function Servicos() {
  const largo = useMidia("(min-width: 1024px)");
  return (
    <section id="servicos" aria-labelledby="t-servicos" className={"bg-espuma " + secao}>
      <div className="wrap">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="t-servicos" tabIndex={-1} className={"lg:col-span-6 " + tituloSecao}>Serviços</h2>
          <p className="medida text-[clamp(1.1rem,.6vw+1rem,1.35rem)] lg:col-span-5 lg:col-start-8">Tudo o que a sua embarcação precisa em terra e no mar. Escolha um serviço para ler os detalhes.</p>
        </div>

        {largo ? (
          <Tabs.Root defaultValue={SERVICOS[0].id} orientation="vertical" className="mt-14 grid grid-cols-12 gap-x-8">
            <Tabs.List aria-label="Serviços da Marina Boreste" className="col-span-5 flex flex-col border-b border-tinta/25">
              {SERVICOS.map(s => (
                <Tabs.Trigger key={s.id} value={s.id}
                  className="indice-item group relative flex items-center border-t border-tinta/25 py-3 text-left font-letreiro text-[clamp(2rem,2.8vw,2.9rem)] font-extrabold leading-none hover:text-azul-texto">
                  <span>{s.titulo}</span>
                  <span aria-hidden className="indice-marca absolute bottom-[-1px] left-0 h-[3px] w-full bg-azul-texto" />
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {SERVICOS.map(s => (
              <Tabs.Content key={s.id} value={s.id} className="col-span-6 col-start-7 self-start lg:sticky lg:top-[calc(var(--topo)+32px)]">
                <DetalheServico s={s} comTitulo />
              </Tabs.Content>
            ))}
          </Tabs.Root>
        ) : (
          <Accordion.Root type="single" collapsible defaultValue={SERVICOS[0].id} className="mt-10 border-b border-tinta/25">
            {SERVICOS.map(s => (
              <Accordion.Item key={s.id} value={s.id} className="border-t border-tinta/25">
                <Accordion.Header asChild>
                  <h3>
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left font-letreiro text-[2.1rem] font-extrabold leading-none data-[state=open]:text-azul-texto">
                      {s.titulo}
                      <span aria-hidden className="relative h-5 w-5 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-[2.5px] before:w-5 before:-translate-y-1/2 before:bg-current after:absolute after:left-1/2 after:top-0 after:h-5 after:w-[2.5px] after:-translate-x-1/2 after:bg-current after:transition-transform group-data-[state=open]:after:scale-y-0" />
                    </Accordion.Trigger>
                  </h3>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pb-8"><DetalheServico s={s} comTitulo={false} /></div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        )}
      </div>
    </section>
  );
}

/* ---------- infraestrutura: duas colunas defasadas, no escuro ---------- */
export function Infraestrutura() {
  return (
    <>
      <section id="infraestrutura" aria-labelledby="t-infra" className={"no-escuro bg-tinta text-casco " + secao}>
        <div className="wrap">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="t-infra" tabIndex={-1} className={"lg:col-span-7 " + tituloSecao}>Infraestrutura</h2>
            <p className="medida text-[clamp(1.1rem,.6vw+1rem,1.35rem)] text-casco/90 lg:col-span-5">Galpões, píer, rampa, oficina e uma área de lazer à beira do Rio Una, dentro dos padrões do “Projeto Marinas” e das regulamentações da CETESB.</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-[clamp(32px,6vw,110px)] gap-y-16 md:grid-cols-2">
            {INFRA.map((item, i) => (
              <article key={item.titulo} aria-labelledby={"l-" + i} className={i % 2 ? "md:mt-[clamp(90px,14vw,220px)]" : ""}>
                <FotoZoom f={item.foto} sizes="(min-width: 768px) 44vw, 100vw" className="aspect-[5/4] bg-tinta-2" />
                <h3 id={"l-" + i} className="mt-6 text-[clamp(2rem,3vw,2.9rem)]">{item.titulo}</h3>
                <div className="medida mt-4 grid gap-3 text-casco/85">{item.texto.map((p, k) => <p key={k}>{p}</p>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-tinta">
        <FotoZoom f={FOTOS.banda} sizes="100vw" className="aspect-[2/1] max-h-[86svh] bg-tinta-2" />
      </div>
    </>
  );
}

/* ---------- Pousada Una ---------- */
export function Pousada() {
  return (
    <section id="pousada" aria-labelledby="t-pousada" className={secao}>
      <div className="wrap">
        <FotoZoom f={FOTOS.pousadaAerea} sizes="(min-width: 1400px) 1400px, 100vw" className="aspect-[132/78]" />
        <div className="mt-[clamp(40px,6vw,90px)] grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="t-pousada" tabIndex={-1} className={tituloSecao}>Pousada Una</h2>
            <div className="medida mt-8 grid gap-4">
              <p className="text-[clamp(1.15rem,.6vw+1rem,1.4rem)] leading-normal">Parceira da marina e parte do mesmo empreendimento, a Pousada Una fica a 50 metros daqui, na mesma rua.</p>
              <p>Pousada e restaurante à beira do Rio Una, com acomodações confortáveis, piscina, deck voltado para o rio, jardim arborizado e píer para embarcações.</p>
              <p>Clientes da Marina Boreste têm benefícios exclusivos na hospedagem e acesso ao restaurante da pousada, uma boa pedida para o almoço depois do passeio de barco.</p>
            </div>
            <dl className="m-0 mt-8 grid gap-4 border-t border-tinta/25 pt-6">
              <div className="grid gap-1 sm:grid-cols-[8rem_1fr]"><dt className="font-bold">Endereço</dt><dd className="m-0"><a className="ext" href={MAPS_POUSADA} {...NOVA_ABA}>Rua Petrópolis, 80, Barra do Una, São Sebastião (SP), CEP 11624-179<span className="sr"> (ver no Google Maps, abre em nova aba)</span></a></dd></div>
              <div className="grid gap-1 sm:grid-cols-[8rem_1fr]"><dt className="font-bold">Reservas</dt><dd className="m-0"><a className="num" href="tel:+551238671515"><span className="sr">Telefone de reservas: </span>(12) 3867-1515</a></dd></div>
              <div className="grid gap-1 sm:grid-cols-[8rem_1fr]"><dt className="font-bold">Site</dt><dd className="m-0"><a className="ext" href={SITE_POUSADA} {...NOVA_ABA}>pousadauna.com.br<span className="sr"> (site da Pousada Una, abre em nova aba)</span></a></dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="bt bt-linha" href={INSTA_POUSADA} {...NOVA_ABA}><IcInsta /><span className="sr">Instagram </span>@pousadauna<span className="sr"> (abre em nova aba)</span></a>
              <a className="bt bt-linha w-12 px-0" href={FACE_POUSADA} {...NOVA_ABA} aria-label="Facebook da Pousada Una (abre em nova aba)"><IcFace /></a>
              <a className="bt bt-linha w-12 px-0" href={WHATS_POUSADA} {...NOVA_ABA} aria-label="WhatsApp da Pousada Una (abre em nova aba)"><IcWhats /></a>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            <FotoZoom f={FOTOS.pousadaPiscina} sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[3/2]" />
          </div>
        </div>
      </div>
    </section>
  );
}
