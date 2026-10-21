import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IcInsta, IcWhats } from "../icones";
import { INSTA_MARINA, NOVA_ABA, RAIZ, WHATS } from "../conteudo";
import type { Rota } from "../uteis";

const PAGINAS = [
  { href: "#/biografia", nome: "Biografia", pagina: "biografia" },
  { href: "#/embarcacoes", nome: "Embarcações à venda", pagina: "embarcacoes" },
];
const SECOES = [
  { href: "#servicos", nome: "Serviços" },
  { href: "#infraestrutura", nome: "Infraestrutura" },
  { href: "#pousada", nome: "Pousada Una" },
  { href: "#localizacao", nome: "Localização" },
  { href: "#contato", nome: "Vamos conversar?" },
];
const atual = (rota: Rota, p: string) => rota.pagina === p || (p === "embarcacoes" && rota.pagina === "embarcacao");

export function Topo({ rota }: { rota: Rota }) {
  const [aberto, setAberto] = useState(false);
  const porLink = useRef(false);   // fechou por um link: o foco vai para o destino, não volta ao botão Menu
  const vai = () => { porLink.current = true; setAberto(false); };
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-tinta/15 bg-casco">
      <a href="#conteudo" onClick={e => { e.preventDefault(); const m = document.getElementById("conteudo"); m?.focus(); m?.scrollIntoView(); }}
        className="bt bt-tinta absolute left-2 top-2 z-50 -translate-y-[200%] focus:translate-y-0">Pular para o conteúdo</a>
      <div className="wrap flex h-[var(--topo)] items-center justify-between gap-4">
        <a href="#inicio" aria-label="Marina Boreste, voltar ao início" className="shrink-0">
          <img src={RAIZ + "imagens/logo-marina-boreste.svg"} alt="" width={470} height={180} className="h-11 w-auto" />
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <nav aria-label="Páginas do site" className="mr-2 hidden items-center gap-6 lg:flex">
            {PAGINAS.map(p => (
              <a key={p.href} href={p.href} aria-current={atual(rota, p.pagina) ? "page" : undefined}
                className="text-[16px] font-semibold no-underline decoration-2 underline-offset-[6px] hover:underline aria-[current=page]:text-azul-texto aria-[current=page]:underline">{p.nome}</a>
            ))}
          </nav>
          <a className="bt bt-azul px-3 sm:px-5" href={WHATS} {...NOVA_ABA}>
            <IcWhats /><span className="hidden sm:inline">WhatsApp</span><span className="sr"> da Marina Boreste (abre em nova aba)</span>
          </a>
          <Dialog.Root open={aberto} onOpenChange={setAberto}>
            <Dialog.Trigger className="bt bt-tinta">Menu</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-tinta/60 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
              <Dialog.Content aria-describedby={undefined} onCloseAutoFocus={e => { if (porLink.current) { e.preventDefault(); porLink.current = false; } }}
                className="no-escuro fixed inset-y-0 right-0 z-50 flex w-full max-w-[560px] flex-col overflow-y-auto bg-tinta text-casco outline-none motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:slide-in-from-right">
                <div className="flex h-[var(--topo)] items-center justify-between px-[var(--gut)]">
                  <Dialog.Title className="sr">Menu</Dialog.Title>
                  <a href="#inicio" aria-label="Marina Boreste, voltar ao início" onClick={vai}>
                    <img src={RAIZ + "imagens/logo-marina-boreste-negativo.svg"} alt="" width={470} height={180} className="h-11 w-auto" />
                  </a>
                  <Dialog.Close className="bt bt-linha">Fechar</Dialog.Close>
                </div>
                <nav aria-label="Páginas e seções do site" className="flex-1 px-[var(--gut)] py-6">
                  <ul className="m-0 list-none space-y-1 p-0">
                    {PAGINAS.map(p => (
                      <li key={p.href}><a href={p.href} onClick={vai} aria-current={atual(rota, p.pagina) ? "page" : undefined}
                        className="font-letreiro text-[clamp(2.2rem,7vw,3.2rem)] font-extrabold leading-[1.05] text-azul-claro no-underline hover:underline aria-[current=page]:underline">{p.nome}</a></li>
                    ))}
                  </ul>
                  <ul className="m-0 mt-6 list-none space-y-1 border-t border-casco/20 p-0 pt-6">
                    {SECOES.map(s => (
                      <li key={s.href}><a href={s.href} onClick={vai}
                        className="font-letreiro text-[clamp(2.2rem,7vw,3.2rem)] font-extrabold leading-[1.05] no-underline hover:underline">{s.nome}</a></li>
                    ))}
                  </ul>
                </nav>
                <div className="space-y-2 border-t border-casco/20 px-[var(--gut)] py-6 text-[15px]">
                  <div className="flex flex-wrap gap-3 pb-2">
                    <a className="bt bt-linha" href={INSTA_MARINA} {...NOVA_ABA}><IcInsta /><span className="sr">Instagram </span>@marinaboreste<span className="sr"> (abre em nova aba)</span></a>
                    <a className="bt bt-linha w-12 px-0" href={WHATS} {...NOVA_ABA} aria-label="WhatsApp da Marina Boreste (abre em nova aba)"><IcWhats /></a>
                  </div>
                  <p>Segunda a domingo, das 8h às 17h</p>
                  <p><a href="tel:+5512997292082" className="num"><span className="sr">Telefone: </span>(12) 99729-2082</a></p>
                  <p><a href="mailto:atendimento@boreste.com.br"><span className="sr">E-mail: </span>atendimento@boreste.com.br</a></p>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
