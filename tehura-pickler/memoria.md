# Memória do projeto · TEHURA PICKLER

Histórico vivo das decisões e aprendizados. Registre só o que ajuda a continuar o trabalho.

---

## Decisões aprovadas

**15/10/2026, briefing inicial**

- **Escritório:** o nome é TEHURA PICKLER. É um escritório de arquitetura liderado pela arquiteta
  Tehura Pickler.
- **Conteúdo:** o site apresenta:
  - a arquiteta;
  - a equipe;
  - a forma de trabalhar e os serviços;
  - os projetos realizados.
- **Objetivo:** site premium para apresentar o escritório e a equipe e gerar contatos de novos
  clientes.
- **Referência:** o site da Fernanda Marques Arquitetura (`fernandamarques.com.br`) serve só como
  direção de estrutura e atmosfera. Nada dele é copiado.
- **Documentação:** a base do projeto é formada por `CLAUDE.md`, `specs/site.md`,
  `specs/design.md` e esta memória.

**15/10/2026, primeira rodada de perguntas**

- **Idiomas:** português e inglês. O Claude traduz e o escritório revisa o inglês.
- **Páginas:** várias:
  - Início;
  - Escritório;
  - Como trabalhamos;
  - Projetos;
  - uma página por projeto;
  - Contato.
- **Público-alvo:** residencial alto padrão, interiores e reformas, comercial e corporativo, e
  incorporadoras.
- **Contato:** só pelo WhatsApp.
- **Stack:** código próprio em HTML, CSS e JavaScript puros, publicado no GitHub Pages.
- **Domínio:** será registrado um domínio próprio. Até lá, o site fica no endereço do GitHub.
- **Tipografia:** usar as fontes que o escritório já tem.
- **Logo:** existe, só em imagem (PNG ou JPG).
- **Serviços:**
  - projeto de arquitetura;
  - design de interiores;
  - reformas;
  - acompanhamento de obra.
- **Pessoas:** retrato só da Tehura. A equipe aparece com nome e cargo, sem fotos.
- **Projetos:** de 6 a 10 no lançamento, com fotos profissionais e ficha técnica. Sem plantas, sem
  croquis e sem o nome dos clientes.
- **Endereço:** só bairro e cidade, sem número e sem mapa.
- **CAU:** o número aparece no site.
- **Extras:** existem prêmios ou mostras para incluir. Não há publicações nem depoimentos por
  enquanto.

## Decisões rejeitadas

**15/10/2026**

- **Página única:** trocada por um site com várias páginas.
- **Plataforma editável** (WordPress, Wix, Webflow): trocada por código próprio.
- **Formulário, e-mail e agendamento online como canais de contato:** fica só o WhatsApp.
- **Endereço completo com mapa:** fica só bairro e cidade.

## Alterações realizadas

**15/10/2026**

- Criada a pasta `tehura-pickler/` no repositório `websites`, separada do site da Marina Boreste,
  que fica na raiz.
- Criados `CLAUDE.md`, `specs/site.md`, `specs/design.md`, esta memória e
  `referencias/site-de-referencia.md` (link e páginas conhecidas do site de referência).
- Atualizados `specs/site.md` (versão 1) e `specs/design.md` com as respostas da primeira rodada.

## Problemas encontrados

**15/10/2026**

- **Print da referência:** a pasta `referencias/` não existia. O link já foi registrado, mas o print
  completo do site de referência ainda falta.
- **Rede bloqueada:** a rede do ambiente na nuvem bloqueia `fernandamarques.com.br`. O site de
  referência não pôde ser aberto nem fotografado daqui.
- **Sem informação pública:** não há nada sobre Tehura Pickler ou o escritório nos resultados de
  busca. Todo o conteúdo depende do material enviado pelo escritório.
- **Risco de publicação:** o GitHub Pages deste repositório publica a branch `gh-pages` com Jekyll,
  que transforma arquivos `.md` em páginas públicas. Se `tehura-pickler/` for publicada como está,
  os documentos internos e o print da referência ficam visíveis no site.
- **Domínio próprio:** o GitHub Pages liga um domínio ao repositório inteiro, não a uma pasta. A
  raiz deste repositório é o site da Marina Boreste. Para o domínio do TEHURA PICKLER apontar para
  este site, o projeto precisará de um repositório próprio ou de outra hospedagem estática.

## Soluções aplicadas

**15/10/2026**

- A estrutura do site de referência (menu, categorias e páginas de projeto) foi levantada por
  resultados de busca. Ela fica em `specs/design.md` como observação preliminar, a confirmar com o
  print.
- O link do site de referência foi registrado em `referencias/site-de-referencia.md`, a pedido do
  escritório.
- **[PROPOSTA]** Todos os links internos serão relativos, para o site funcionar no endereço do
  GitHub e depois no domínio próprio sem mudanças.

## Pendências

- **Materiais do escritório:**
  - print completo do site de referência em `referencias/`, ou liberação do domínio na rede do
    ambiente;
  - logo na maior resolução disponível;
  - fontes da identidade (nomes, arquivos e licença para a web);
  - WhatsApp, horário de atendimento e redes sociais;
  - texto do botão de contato e mensagem pronta do WhatsApp;
  - bairro, cidade e região de atuação;
  - número do CAU;
  - história, ano de fundação e proposta de valor;
  - etapas do processo de trabalho;
  - formação, biografia e retrato da Tehura;
  - nomes e cargos da equipe;
  - de 6 a 10 projetos, com nome, categoria, cidade, ano, área, texto, fotos e fotógrafo;
  - lista de prêmios e mostras.
- **Domínio:** quando ele for registrado, decidir entre um repositório próprio e outra hospedagem.
- **Antes da primeira publicação:** impedir que `CLAUDE.md`, `specs/`, `memoria.md` e
  `referencias/` sejam publicados.

## Próximos passos

1. Receber o print da referência e as fontes e analisá-los.
2. Preencher `specs/design.md` e apresentá-lo para aprovação.
3. Aprovar as propostas pendentes em `specs/site.md`.
4. Só então começar a programar, mesmo que parte do conteúdo ainda chegue depois e fique como
   `[PREENCHER]`.
