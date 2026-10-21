/* os mesmos ícones do site atual */
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, focusable: false };
export const IcWhats = () => (<svg {...base}><path d="M3.6 20.4l1.3-4.4a8.4 8.4 0 1 1 3.2 3.1z" /><path d="M9.2 8.3c-.3 2.8 2.9 6.4 6.3 6.5l1-1.6-2-1.1-.9.9c-.9-.4-1.8-1.3-2.3-2.4l.9-.9-1.1-2z" /></svg>);
export const IcInsta = () => (<svg {...base}><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" /></svg>);
export const IcFace = () => (<svg {...base}><path d="M14.2 8.4V6.9c0-.8.5-1.2 1.3-1.2h1.6V3h-2.5c-2.4 0-3.6 1.5-3.6 3.7v1.7H8.7v3h2.3V21h3.2v-9.6h2.5l.4-3z" /></svg>);
export const IcVolta = () => (<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable={false}><path d="M16 10H4M9.5 4.5 4 10l5.5 5.5" /></svg>);
export const IcSeta = ({ dir = 1 }: { dir?: 1 | -1 }) => (<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable={false} style={{ transform: dir < 0 ? "scaleX(-1)" : undefined }}><path d="M4 10h12M10.5 4.5 16 10l-5.5 5.5" /></svg>);
export const IcPausa = ({ pausado }: { pausado: boolean }) => pausado
  ? (<svg viewBox="0 0 18 18" fill="currentColor" aria-hidden focusable={false}><path d="M5 3.5v11l9-5.5z" /></svg>)
  : (<svg viewBox="0 0 18 18" fill="currentColor" aria-hidden focusable={false}><rect x="4" y="3" width="3.4" height="12" rx="1" /><rect x="10.6" y="3" width="3.4" height="12" rx="1" /></svg>);
