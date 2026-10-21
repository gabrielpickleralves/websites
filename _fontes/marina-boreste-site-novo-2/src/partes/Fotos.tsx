import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { Foto } from "../tipos";
import { IcSeta } from "../icones";

export function Imagem({ f, sizes, className, eager }: { f: Foto; sizes: string; className?: string; eager?: boolean }) {
  return (
    <picture>
      {f.avif && <source type="image/avif" srcSet={f.avif} sizes={sizes} />}
      {f.webp && <source type="image/webp" srcSet={f.webp} sizes={sizes} />}
      <img src={f.src} alt={f.alt} width={f.w} height={f.h} loading={eager ? "eager" : "lazy"} decoding="async" className={className} />
    </picture>
  );
}

/* ---------- foto ampliada: todas as fotos da página, uma de cada vez ---------- */
const Ctx = createContext<(src: string) => void>(() => {});

export function Galeria({ fotos, children }: { fotos: Foto[]; children: ReactNode }) {
  const [i, setI] = useState<number | null>(null);
  const quemAbriu = useRef<HTMLElement | null>(null);   // ao fechar, o foco volta para a foto que foi clicada
  const abre = useCallback((src: string) => { quemAbriu.current = document.activeElement as HTMLElement; const k = fotos.findIndex(f => f.src === src); setI(k < 0 ? 0 : k); }, [fotos]);
  const anda = (d: number) => setI(k => (k === null ? k : (k + d + fotos.length) % fotos.length));
  const f = i === null ? null : fotos[i];
  return (
    <Ctx.Provider value={abre}>
      {children}
      <Dialog.Root open={i !== null} onOpenChange={aberto => { if (!aberto) setI(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-tinta/80" />
          <Dialog.Content
            className="no-escuro fixed inset-0 z-50 flex flex-col bg-tinta text-casco outline-none"
            onCloseAutoFocus={e => { e.preventDefault(); quemAbriu.current?.focus(); }}
            onKeyDown={e => { if (fotos.length > 1 && e.key === "ArrowRight") anda(1); if (fotos.length > 1 && e.key === "ArrowLeft") anda(-1); }}
          >
            <div className="wrap flex min-h-[68px] items-center justify-between gap-4">
              <Dialog.Title className="num text-[15px] font-semibold">Foto {(i ?? 0) + 1} de {fotos.length}</Dialog.Title>
              <Dialog.Close className="bt bt-linha">Fechar</Dialog.Close>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-[var(--gut)] pb-4">
              {f && (
                <figure className="m-0 flex h-full max-h-full flex-col items-center justify-center gap-3">
                  <Imagem f={f} sizes="100vw" eager className="max-h-[calc(100svh-190px)] w-auto object-contain" />
                  <Dialog.Description asChild><figcaption className="medida text-center text-[15px] text-casco/85">{f.alt}</figcaption></Dialog.Description>
                </figure>
              )}
            </div>
            {fotos.length > 1 && (
              <div className="wrap flex justify-center gap-3 pb-6">
                <button type="button" className="bt bt-linha w-12 px-0" aria-label="Foto anterior" onClick={() => anda(-1)}><IcSeta dir={-1} /></button>
                <button type="button" className="bt bt-linha w-12 px-0" aria-label="Próxima foto" onClick={() => anda(1)}><IcSeta /></button>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Ctx.Provider>
  );
}

/* foto que abre ampliada ao clicar */
export function FotoZoom({ f, sizes, className = "", imgClass = "", eager }: { f: Foto; sizes: string; className?: string; imgClass?: string; eager?: boolean }) {
  const abre = useContext(Ctx);
  return (
    <button type="button" className={"group block w-full cursor-zoom-in overflow-hidden bg-espuma text-left " + className} aria-label={"Ampliar foto: " + f.alt} onClick={() => abre(f.src)}>
      <Imagem f={f} sizes={sizes} eager={eager} className={"h-full w-full object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(.2,.75,.15,1)] motion-safe:group-hover:scale-[1.03] " + imgClass} />
    </button>
  );
}
