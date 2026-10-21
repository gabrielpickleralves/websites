import { useRef, useState, type FormEvent } from "react";
import { FOTOS } from "../dados-gerados";
import { FotoZoom } from "./Fotos";
import { IcFace, IcInsta, IcWhats } from "../icones";
import { COORD, COORD_DECIMAL, FACE_POUSADA, INSTA_MARINA, INSTA_POUSADA, MAPA_EMBED, MAPS_MARINA, MAPS_POUSADA, NOVA_ABA, RAIZ, ROTA_MARINA, SITE_POUSADA, WHATS, WHATS_VENDA } from "../conteudo";

const secao = "py-[clamp(80px,11vw,170px)]";

/* ---------- localização ---------- */
export function Localizacao() {
  const [copiado, setCopiado] = useState<null | boolean>(null);
  const [aviso, setAviso] = useState("");
  const decimal = useRef<HTMLSpanElement>(null);
  const tempo = useRef(0);
  const copia = () => {
    const fim = (ok: boolean) => {
      setCopiado(ok);
      setAviso(ok ? "Coordenadas copiadas: " + COORD_DECIMAL : "Não foi possível copiar. As coordenadas estão selecionadas ao lado; use o comando de copiar.");
      if (!ok && decimal.current) { const sel = getSelection(), rg = document.createRange(); rg.selectNodeContents(decimal.current); sel?.removeAllRanges(); sel?.addRange(rg); }
      clearTimeout(tempo.current); tempo.current = window.setTimeout(() => setCopiado(null), 4000);
    };
    try { navigator.clipboard.writeText(COORD_DECIMAL).then(() => fim(true), () => fim(false)); } catch { fim(false); }
  };
  return (
    <section id="localizacao" aria-labelledby="t-local" className={"no-escuro bg-tinta text-casco " + secao}>
      <div className="wrap">
        {/* os lugares da faixa do site atual, parados como nomes ao longo da costa numa carta */}
        <p aria-hidden className="costa mb-10 flex flex-wrap gap-x-8 gap-y-1 pb-4 text-[15px] font-semibold text-azul-claro">
          <span>Rio Una</span><span>Barra do Una</span><span>Bertioga</span><span>Ilhabela</span><span>Litoral norte de São Paulo</span>
        </p>
        <h2 id="t-local" tabIndex={-1} className="text-[clamp(3.2rem,9vw,8.5rem)]">Localização</h2>
        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="medida lg:col-span-6">
            <p className="text-[clamp(1.15rem,.6vw+1rem,1.4rem)] leading-normal">Localizada em Barra do Una, no litoral norte do estado de São Paulo, estamos entre o Rio Una e o mar.</p>
            <p className="mt-4 text-casco/85">A Marina Boreste proporciona acesso facilitado às diversas ilhas da região entre Bertioga e Ilhabela.</p>

            <h3 className="mt-12 text-[2.1rem]">Vindo de São Paulo e região</h3>
            <ul className="m-0 mt-4 grid list-none gap-0 p-0">
              {["Rodovia dos Imigrantes", "Mogi-Bertioga", "Rodovia dos Tamoios"].map(r => (
                <li key={r} className="border-t border-casco/20 py-3 text-[18px] last:border-b">{r}</li>
              ))}
            </ul>
            <p className="mt-4 text-casco/85">Dica: conheça a Rota 55 do litoral paulista e seus encantos.</p>

            <h3 className="mt-12 text-[2.1rem]">Vindo do mar</h3>
            <div className="mt-4 grid gap-4">
              <p className="num font-letreiro text-[clamp(2.2rem,4.6vw,3.6rem)] font-extrabold leading-none text-azul-claro">{COORD}</p>
              <p className="num text-[18px]"><span ref={decimal}>{COORD_DECIMAL}</span></p>
              <div><button type="button" className="bt bt-linha" onClick={copia}>{copiado === true ? "Coordenadas copiadas" : copiado === false ? "Selecione e copie o texto ao lado" : "Copiar coordenadas"}</button></div>
              <p className="sr" role="status">{aviso}</p>
            </div>

            <h3 className="mt-12 text-[2.1rem]">Nosso endereço</h3>
            <p className="mt-4 text-[18px]"><a className="ext" href={MAPS_MARINA} {...NOVA_ABA}>Rua Petrópolis, 215, Barra do Una<br />São Sebastião (SP), CEP 11624-179<span className="sr"> (ver no Google Maps, abre em nova aba)</span></a></p>
          </div>
          <div className="grid content-start gap-6 lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden border border-casco/20 bg-tinta-2 lg:aspect-[5/4]">
              <iframe title="Marina Boreste no Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={MAPA_EMBED} className="h-full w-full border-0" />
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="bt bt-azul" href={MAPS_MARINA} {...NOVA_ABA}>Abrir no Google Maps<span className="sr"> (abre em nova aba)</span></a>
              <a className="bt bt-linha" href={ROTA_MARINA} {...NOVA_ABA}>Traçar rota<span className="sr"> até a Marina Boreste no Google Maps (abre em nova aba)</span></a>
            </div>
            <FotoZoom f={FOTOS.mapa} sizes="(min-width: 1024px) 44vw, 100vw" className="mt-6 aspect-square max-w-[520px] bg-tinta-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- contato: a mensagem sai pronta pelo WhatsApp ou pelo e-mail, como no site atual ---------- */
const REGRAS: Record<string, (v: string) => string> = {
  nome: v => (v.trim() ? "" : "Escreva o seu nome."),
  email: v => (!v.trim() ? "Escreva o seu e-mail." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Confira o e-mail. Ele precisa ter o formato nome@exemplo.com.br."),
  assunto: v => (v ? "" : "Selecione o assunto."),
  mensagem: v => (v.trim() ? "" : "Escreva a sua mensagem."),
};
const ASSUNTOS = ["Valores e serviços", "Compra de embarcação", "Sugestões e reclamações", "Benefício Pousada do Una (hospedagem e restaurante)", "Outros assuntos"];

export function Contato() {
  const form = useRef<HTMLFormElement>(null);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ tipo?: "erro"; texto: string }>({ texto: "" });
  const valida = (nome: string, valor: string) => { const msg = REGRAS[nome](valor); setErros(e => ({ ...e, [nome]: msg })); return msg; };
  const confere = (e: { currentTarget: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement }) => { if (erros[e.currentTarget.name]) valida(e.currentTarget.name, e.currentTarget.value); };
  const envia = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const invalidos = Object.keys(REGRAS).filter(n => valida(n, String(d.get(n) || "")));
    if (invalidos.length) {
      setStatus({ tipo: "erro", texto: invalidos.length === 1 ? "A mensagem ainda não foi enviada: falta corrigir 1 campo." : "A mensagem ainda não foi enviada: falta corrigir " + invalidos.length + " campos." });
      (e.currentTarget.elements.namedItem(invalidos[0]) as HTMLElement).focus();
      return;
    }
    const texto = "Olá! Meu nome é " + String(d.get("nome")).trim() + " (" + String(d.get("email")).trim() + ").\nAssunto: " + d.get("assunto") + "\n\n" + String(d.get("mensagem")).trim();
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value;
    if (via === "email") {
      setStatus({ texto: "Abrimos o seu programa de e-mail com a mensagem pronta. É só confirmar o envio." });
      location.href = "mailto:atendimento@boreste.com.br?subject=" + encodeURIComponent("Site: " + d.get("assunto")) + "&body=" + encodeURIComponent(texto);
    } else {
      setStatus({ texto: "Abrimos o WhatsApp em uma nova aba com a mensagem pronta. É só confirmar o envio." });
      window.open(WHATS + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
    }
  };
  const campo = "w-full rounded border-[1.5px] border-tinta/45 bg-white px-3.5 py-3 text-[17px] text-tinta outline-offset-2 aria-[invalid=true]:border-erro";
  const Erro = ({ nome }: { nome: string }) => erros[nome] ? (
    <p id={"e-" + nome} className="mt-2 flex items-start gap-2 text-[15px] font-semibold text-erro">
      <svg viewBox="0 0 18 18" aria-hidden className="mt-[2px] h-[18px] w-[18px] shrink-0"><circle cx="9" cy="9" r="8" fill="currentColor" /><path d="M9 4.6v5.2" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="9" cy="13" r="1.15" fill="#fff" /></svg>
      <span><span className="sr">Erro: </span>{erros[nome]}</span>
    </p>) : null;
  const ligacao = (nome: string) => ({ name: nome, id: "f-" + nome, required: true, "aria-invalid": erros[nome] ? true : undefined, "aria-describedby": erros[nome] ? "e-" + nome : undefined, onBlur: confere, onChange: confere, className: campo });

  return (
    <section id="contato" aria-labelledby="t-contato" className={secao}>
      <div className="wrap">
        <h2 id="t-contato" tabIndex={-1} className="text-[clamp(3.6rem,12vw,12rem)] leading-[.85]">Vamos conversar?</h2>
        <div className="mt-[clamp(40px,6vw,90px)] grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <dl className="m-0 grid gap-6 text-[18px]">
              <div><dt className="font-bold">WhatsApp</dt><dd className="m-0"><a className="ext num" href={WHATS} {...NOVA_ABA}>(12) 99729-2082<span className="sr"> (WhatsApp, abre em nova aba)</span></a></dd></div>
              <div><dt className="font-bold">Telefone/fax</dt><dd className="m-0"><a className="num" href="tel:+551238671550">(12) 3867-1550</a></dd></div>
              <div><dt className="font-bold">Embarcações à venda</dt><dd className="m-0">Pergunte à nossa atendente se há embarcações à venda.<br /><a className="ext" href={WHATS_VENDA} {...NOVA_ABA}>Perguntar pelo WhatsApp<span className="sr"> sobre embarcações à venda (abre em nova aba)</span></a></dd></div>
              <div><dt className="font-bold">E-mail</dt><dd className="m-0"><a href="mailto:atendimento@boreste.com.br">atendimento@boreste.com.br</a><br /><a href="mailto:boreste@boreste.com.br">boreste@boreste.com.br</a></dd></div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="bt bt-linha" href={INSTA_MARINA} {...NOVA_ABA}><IcInsta /><span className="sr">Instagram </span>@marinaboreste<span className="sr"> (abre em nova aba)</span></a>
              <a className="bt bt-linha" href={WHATS} {...NOVA_ABA}><IcWhats />WhatsApp<span className="sr"> da Marina Boreste (abre em nova aba)</span></a>
              <a className="bt bt-linha" href={INSTA_POUSADA} {...NOVA_ABA}><IcInsta /><span className="sr">Instagram </span>@pousadauna<span className="sr"> (abre em nova aba)</span></a>
            </div>
          </div>
          <form ref={form} noValidate onSubmit={envia} aria-describedby="form-instr" className="grid gap-5 border-t-[1.5px] border-tinta pt-6 lg:col-span-6 lg:col-start-7">
            <p id="form-instr" className="text-[15px] text-cinza">Todos os campos são obrigatórios.</p>
            <div><label htmlFor="f-nome" className="mb-1.5 block font-semibold">Seu nome</label><input type="text" autoComplete="name" {...ligacao("nome")} /><Erro nome="nome" /></div>
            <div><label htmlFor="f-email" className="mb-1.5 block font-semibold">Seu e-mail</label><input type="email" autoComplete="email" inputMode="email" spellCheck={false} {...ligacao("email")} /><Erro nome="email" /></div>
            <div><label htmlFor="f-assunto" className="mb-1.5 block font-semibold">Assunto</label>
              <select {...ligacao("assunto")} defaultValue=""><option value="">Selecione o assunto</option>{ASSUNTOS.map(a => <option key={a}>{a}</option>)}</select><Erro nome="assunto" /></div>
            <div><label htmlFor="f-mensagem" className="mb-1.5 block font-semibold">Mensagem</label><textarea rows={5} {...ligacao("mensagem")} /><Erro nome="mensagem" /></div>
            <div className="flex flex-wrap gap-3">
              <button className="bt bt-azul" type="submit" value="whatsapp"><IcWhats />Enviar pelo WhatsApp<span className="sr"> (abre em nova aba)</span></button>
              <button className="bt bt-linha" type="submit" value="email">Enviar por e-mail</button>
            </div>
            <p className="text-[15px] text-cinza">A mensagem abre pronta no seu WhatsApp ou no seu programa de e-mail; é só confirmar o envio.</p>
            <p role="status" className={"text-[15.5px] font-semibold " + (status.tipo === "erro" ? "text-erro" : "text-tinta")}>{status.texto}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- rodapé ---------- */
export function Rodape({ topo }: { topo: () => void }) {
  return (
    <footer className="no-escuro bg-tinta pb-8 pt-[clamp(64px,8vw,120px)] text-casco">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_1fr_1fr]">
          <div>
            <a href="#inicio" aria-label="Marina Boreste, voltar ao início"><img src={RAIZ + "imagens/logo-marina-boreste-negativo.svg"} alt="" width={470} height={180} loading="lazy" className="h-16 w-auto" /></a>
            <p className="medida mt-6 text-[15px] text-casco/80">Infraestrutura e serviços para a guarda, manutenção, compra e venda de embarcações, sempre em harmonia com o meio ambiente.</p>
          </div>
          <nav aria-labelledby="r-marina">
            <h2 id="r-marina" className="text-[1.6rem] text-azul-claro">A marina</h2>
            <ul className="m-0 mt-4 grid list-none gap-2 p-0 text-[15.5px]">
              <li><a href="#servicos">Serviços</a></li><li><a href="#infraestrutura">Infraestrutura</a></li><li><a href="#/biografia">Biografia</a></li>
              <li><a href="#localizacao">Localização</a></li><li><a href="#contato">Vamos conversar?</a></li>
            </ul>
          </nav>
          <div>
            <h2 className="text-[1.6rem] text-azul-claro">Marina Boreste</h2>
            <address className="mt-4 grid gap-2 text-[15.5px] not-italic">
              <a className="ext" href={MAPS_MARINA} {...NOVA_ABA}>Rua Petrópolis, 215, Barra do Una<br />São Sebastião (SP), CEP 11624-179<span className="sr"> (ver no Google Maps, abre em nova aba)</span></a>
              <a className="num" href="tel:+551238671550"><span className="sr">Telefone: </span>(12) 3867-1550</a>
              <a className="num" href="tel:+5512997292082"><span className="sr">Celular e WhatsApp: </span>(12) 99729-2082</a>
              <a href="mailto:boreste@boreste.com.br"><span className="sr">E-mail: </span>boreste@boreste.com.br</a>
            </address>
            <div className="mt-4 flex gap-3">
              <a className="bt bt-linha w-12 px-0" href={INSTA_MARINA} {...NOVA_ABA} aria-label="Instagram da Marina Boreste, @marinaboreste (abre em nova aba)"><IcInsta /></a>
              <a className="bt bt-linha w-12 px-0" href={WHATS} {...NOVA_ABA} aria-label="WhatsApp da Marina Boreste (abre em nova aba)"><IcWhats /></a>
            </div>
          </div>
          <div>
            <h2 className="text-[1.6rem] text-azul-claro">Pousada Una</h2>
            <address className="mt-4 grid gap-2 text-[15.5px] not-italic">
              <a className="ext" href={MAPS_POUSADA} {...NOVA_ABA}>Rua Petrópolis, 80, Barra do Una<br />São Sebastião (SP)<span className="sr"> (ver no Google Maps, abre em nova aba)</span></a>
              <a className="num" href="tel:+551238671515"><span className="sr">Telefone: </span>(12) 3867-1515</a>
              <a className="ext" href={SITE_POUSADA} {...NOVA_ABA}>pousadauna.com.br<span className="sr"> (site da Pousada Una, abre em nova aba)</span></a>
            </address>
            <div className="mt-4 flex gap-3">
              <a className="bt bt-linha w-12 px-0" href={INSTA_POUSADA} {...NOVA_ABA} aria-label="Instagram da Pousada Una, @pousadauna (abre em nova aba)"><IcInsta /></a>
              <a className="bt bt-linha w-12 px-0" href={FACE_POUSADA} {...NOVA_ABA} aria-label="Facebook da Pousada Una (abre em nova aba)"><IcFace /></a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-casco/20 pt-6 text-[14px] text-casco/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Marina Boreste. Todos os direitos reservados.</p>
          <p>Segunda a domingo, das 8h às 17h</p>
          <a href="#inicio" onClick={e => { e.preventDefault(); topo(); }} className="font-semibold text-casco">Voltar ao topo</a>
        </div>
      </div>
    </footer>
  );
}
