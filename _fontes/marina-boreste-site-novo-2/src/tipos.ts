export type Foto = { src: string; alt: string; w: number; h: number; avif: string; webp: string };
export type Servico = { id: string; titulo: string; foto: Foto; texto: string[] };
export type ItemInfra = { titulo: string; foto: Foto; texto: string[] };
export type Barco = {
  nome: string; ano?: number | string; pes?: number; motor?: string; descricao?: string;
  preco?: number | string | null; status?: string; foto?: string; descricaoFoto?: string; maisFotos?: string[];
};
