# Especificação do site · TEHURA PICKLER

Fonte de verdade sobre o que será construído.

- **Versão:** 3, 15/10/2026. Inclui as respostas de todas as rodadas de perguntas e a identidade
  visual. Ainda não aprovada por inteiro.
- **Legenda:**
  - **[A DEFINIR]**: depende de resposta ou material do escritório.
  - **[PROPOSTA]**: sugestão do Claude; só vale depois de aprovada.
  - Sem marcação: informado ou aprovado pelo escritório.

---

## 1. Objetivo do site

- Apresentar o escritório TEHURA PICKLER, a arquiteta Tehura Pickler, a equipe, a forma de
  trabalhar, os serviços e os projetos realizados.
- Gerar contatos de novos clientes pelo WhatsApp.
- Transmitir um posicionamento premium.

## 2. Público-alvo

- **Residencial alto padrão:** famílias construindo casa ou fazendo o projeto completo de um
  apartamento.
- **Interiores e reformas:** quem comprou um imóvel e quer reformar ou projetar os interiores.
- **Comercial e corporativo:** empresas com lojas, escritórios, consultórios e restaurantes.
- **Incorporadoras:** empreendimentos imobiliários, áreas comuns e apartamentos decorados.
- **Região de atuação:** todo o Brasil e o exterior, inclusive com projetos a distância.

## 3. Escritório e proposta de valor

- **Nome:** TEHURA PICKLER. No logo aparece como "TEHURA PICKLER ARQUITETURA".
- **Natureza:** escritório de arquitetura liderado pela arquiteta Tehura Pickler.
- **Frase do escritório:** "Arquitetura e interiores".
- **Proposta de valor:** [A DEFINIR] O que diferencia o escritório, nas palavras do próprio
  escritório.
- **História e ano de fundação:** [A DEFINIR]
- **Localização no site:** só bairro e cidade, sem número e sem mapa. O endereço exato é passado
  pelo WhatsApp.
  - **Cidade:** Mogi das Cruzes (SP).
  - [A DEFINIR] Bairro.
- **Registro profissional:** o site mostra o registro do escritório (pessoa jurídica) no CAU.
  - [A DEFINIR] O número.
- **Horário de atendimento:** de segunda a sexta, das 9h às 18h.
- **Redes sociais:** só o Instagram.
  - [A DEFINIR] O endereço do perfil.
- **Prêmios e mostras:** existem e entram no site.
  - [A DEFINIR] Lista, com nome, ano e projeto premiado ou exposto.
- **Publicações e depoimentos:** não há por enquanto e ficam fora do lançamento.

## 4. Arquiteta e equipe

- **Tehura Pickler:** arquiteta que lidera o escritório. Aparece com retrato e biografia.
  - [A DEFINIR] Formação, trajetória, biografia e arquivo do retrato.
- **Equipe:** aparece só com nome e cargo, sem fotos e sem biografias.
  - [A DEFINIR] Nomes e cargos.

## 5. Serviços e áreas de atuação

- **Serviços:**
  - projeto de arquitetura;
  - design de interiores;
  - reformas;
  - acompanhamento de obra.
- **Áreas de atuação:** residencial, interiores e reformas, comercial e corporativo,
  incorporadoras (as mesmas do público-alvo).
- **Forma de trabalhar:** cinco etapas:
  1. Conversa inicial
  2. Estudo preliminar
  3. Anteprojeto
  4. Projeto executivo
  5. Acompanhamento de obra

  O texto de cada etapa é redigido pelo Claude e aprovado pelo escritório.

## 6. Projetos exibidos

- **Quantidade no lançamento:** de 6 a 10 projetos.
- **Lista de projetos:** [A DEFINIR] Chega por zip na conversa, com uma pasta por projeto (fotos e
  um arquivo de texto com a ficha técnica).
- **Organização:** filtro por área, com as categorias:
  - Residencial;
  - Interiores;
  - Comercial;
  - Incorporação.

  Categoria sem projeto não aparece no filtro.
- **Material publicado:**
  - fotos profissionais, com autorização de uso e crédito do fotógrafo;
  - ficha técnica.
- **O que não aparece:**
  - plantas e croquis;
  - nome dos clientes.
- **[PROPOSTA] Campos da ficha técnica:**
  - nome do projeto;
  - categoria;
  - cidade/UF;
  - ano;
  - área (m²);
  - situação (concluído ou em andamento);
  - fotógrafo.
- **Autorização:** antes de publicar um projeto, o escritório confirma que o fotógrafo autoriza o
  uso das fotos.

## 7. Idiomas

- Português e inglês.
- **Tradução:** o Claude traduz a partir dos textos aprovados em português. O escritório revisa o
  inglês antes de publicar.

## 8. Quantidade de páginas

Site com várias páginas, nas duas línguas:

1. Início
2. Escritório (Tehura Pickler e equipe)
3. Como trabalhamos (processo e serviços)
4. Projetos (lista com filtro por categoria)
5. Projeto (uma página por projeto, todas no mesmo modelo)
6. Contato
7. Página de erro 404

São 7 modelos de página, mais uma página para cada projeto, em português e em inglês.

## 9. Seções necessárias

[PROPOSTA]

- **Em todas as páginas:**
  - cabeçalho fixo com o monograma TP, o menu e a troca de idioma;
  - rodapé com WhatsApp, Instagram, horário, bairro/cidade e CAU do escritório.
- **Início** (ordem aprovada, detalhes em `specs/design.md`, seção 15):
  1. abertura com foto de projeto em tela cheia e o logo completo em branco;
  2. projetos em destaque, em faixas de foto de ponta a ponta;
  3. apresentação curta do escritório;
  4. Tehura Pickler;
  5. resumo de como trabalhamos;
  6. chamada para o WhatsApp.
- **Escritório:**
  - apresentação do escritório;
  - Tehura Pickler (retrato e biografia);
  - equipe (nomes e cargos);
  - prêmios e mostras.
- **Como trabalhamos:**
  - abordagem;
  - etapas do processo;
  - serviços e áreas de atuação;
  - chamada para o WhatsApp.
- **Projetos:**
  - filtro por área;
  - grade de duas colunas grandes no desktop (uma no celular), com foto, nome, cidade e ano de cada
    projeto.
- **Projeto:**
  - foto de abertura;
  - ficha técnica;
  - texto;
  - galeria;
  - crédito do fotógrafo;
  - "Outros projetos" (dois cards);
  - chamada para o WhatsApp.

  A composição detalhada está em `specs/design.md`, seção 11.
- **Contato:**
  - botão para o WhatsApp;
  - bairro e cidade;
  - horário de atendimento;
  - Instagram.

## 10. Funcionalidades

- **Troca de idioma** entre português e inglês, mantendo a página em que a pessoa está.
- **Contato só pelo WhatsApp:** os botões abrem a conversa com uma mensagem pronta, no idioma da
  página.
- **Sem botão flutuante de WhatsApp:** o contato fica nos botões dentro das páginas e no rodapé.
- **Filtro de projetos por área**, sem recarregar a página.
- **[PROPOSTA]**
  - Menu responsivo, com painel em tela cheia no celular.
  - Galeria de fotos com ampliação em tela cheia, controlável por teclado e por toque.
  - Metadados para buscadores e compartilhamento: título, descrição, Open Graph, dados
    estruturados e `hreflang` entre as duas línguas.

## 11. Chamadas para ação

- **Principal:** conversa pelo WhatsApp.
  - **Texto do botão:** "Conte sobre seu projeto".
  - **Mensagem pronta:** "Olá! Vim pelo site e gostaria de conversar sobre um projeto."
  - **[PROPOSTA] Em inglês** (a revisar pelo escritório):
    - botão: "Tell us about your project";
    - mensagem: "Hello! I found you through your website and would like to talk about a
      project."
- **[PROPOSTA] Secundárias:**
  - "Ver projetos";
  - "Conheça o escritório".

## 12. Informações que ainda precisam ser definidas

- [x] Link do site de referência (`referencias/site-de-referencia.md`)
- [x] Prints do site de referência (`referencias/prints-fernanda-marques/`) e análise
      (`referencias/analise-da-referencia.md`)
- [x] Idioma, tradução, páginas, público-alvo, canal de contato, stack, serviços, quantidade e
      material dos projetos, endereço no site, CAU, extras
- [x] Logo e monograma em PNG 4K (`identidade/logo/`)
- [x] Fonte Tehura, com publicação autorizada (`identidade/fonte/`)
- [x] Cidade (Mogi das Cruzes, SP) e frase ("Arquitetura e interiores")
- [x] Versão SVG do logo e do monograma (`identidade/svg/`)
- [ ] Domínio que será registrado
- [x] Horário, rede social (Instagram), região de atuação, tipo de registro no CAU, etapas do
      processo, texto do botão e mensagem pronta do WhatsApp, categorias de projeto
- [ ] Número do WhatsApp
- [ ] Endereço do Instagram
- [ ] Bairro
- [ ] Número do CAU do escritório
- [ ] História, ano de fundação e proposta de valor
- [ ] Tehura: formação, biografia e retrato
- [ ] Equipe: nomes e cargos
- [ ] Projetos (6 a 10): nome, categoria, cidade, ano, área, texto, fotos e fotógrafo
- [ ] Prêmios e mostras: lista

## 13. Stack técnica

- **Base:** HTML, CSS e JavaScript puros, sem framework e sem etapa de build. É a mesma base do
  site da Marina Boreste, neste mesmo repositório.
- **Hospedagem durante o desenvolvimento:** GitHub Pages do repositório
  `gabrielpickleralves/websites`, pasta `tehura-pickler/`. Endereço:
  `https://gabrielpickleralves.github.io/websites/tehura-pickler/`.
- **Domínio definitivo:** será registrado. [A DEFINIR] Qual é. Ver o problema registrado em
  `memoria.md`: o GitHub Pages liga um domínio ao repositório inteiro, e a raiz deste é a Marina.
- **[PROPOSTA] Idiomas:** português na raiz da pasta do site e inglês em `en/`, com os mesmos
  nomes de página.
- **[PROPOSTA] Links:** todos os links internos relativos, para o site funcionar tanto no endereço
  do GitHub quanto no domínio próprio.
- **Imagens:** AVIF e WebP, com JPEG de reserva, em vários tamanhos (`srcset`).
- **Fonte:** só a Tehura, a fonte própria do escritório, com publicação autorizada. Os arquivos TTF
  de `identidade/fonte/` são convertidos para WOFF2 e servidos pelo próprio site.
- **Logo:** os SVG de `identidade/svg/`, feitos a partir dos PNG 4K de `identidade/logo/` e
  conferidos com eles.
- **Sem formulário:** o contato é só pelo WhatsApp.
- **Publicação:** `CLAUDE.md`, `specs/`, `memoria.md` e `referencias/` não podem ir para o site
  público (ver pendências em `memoria.md`).

## 14. Responsividade

[PROPOSTA]

- Construção a partir do celular (mobile-first).
- Conferir em 360, 390, 768, 1024, 1280, 1440 e 1920 px de largura.
- Nenhuma largura com rolagem horizontal.
- Alvos de toque com pelo menos 44 × 44 px.
- Enquadramento das fotos ajustado para o celular quando o recorte do desktop não funcionar.
- Texto corrido com 60 a 75 caracteres por linha no desktop.
- Textos em inglês costumam ter outro tamanho: conferir cada página nas duas línguas.

## 15. Acessibilidade

[PROPOSTA] Nível AA das WCAG 2.2.

- **Contraste:** pelo menos 4,5:1 no texto e 3:1 em texto grande e elementos gráficos.
- **Teclado:** navegação completa, foco visível e link "Pular para o conteúdo".
- **Imagens:** texto alternativo descritivo em toda foto de projeto, nas duas línguas. Fotos
  decorativas ficam com texto alternativo vazio.
- **Estrutura:** um `h1` por página, hierarquia de títulos correta e regiões (landmarks).
- **Movimento:** respeitar a preferência por menos movimento (`prefers-reduced-motion`).
- **Idioma:** atributo `lang` certo em cada página (`pt-BR` e `en`).
- **Maiúsculas:** o site usa só a fonte Tehura, que mostra tudo em maiúsculas. Para não prejudicar
  leitores de tela nem buscadores, o texto é escrito em caixa normal no HTML, e quem faz as
  maiúsculas é a fonte (ver `specs/design.md`, seção 4).
- **Galeria:** Esc fecha, as setas navegam e o foco fica dentro dela enquanto está aberta.

## 16. Desempenho

[PROPOSTA]

- **Core Web Vitals** na faixa "bom" no celular:
  - LCP até 2,5 s;
  - INP até 200 ms;
  - CLS até 0,1.
- **Lighthouse** com nota 90 ou mais em Desempenho, Acessibilidade, Boas práticas e SEO, no
  celular.
- **Foto de abertura** com cerca de 200 KB no celular. As demais fotos carregam sob demanda.
- **JavaScript** só onde há interação, sem bibliotecas pesadas.
- **Fontes:** uma família (Tehura) em três pesos, em WOFF2, com `font-display: swap`.

## 17. Escopo

**Dentro do escopo:**

- Desenho e programação das páginas do item 8, em português e inglês, nas versões desktop e
  celular.
- Tradução para o inglês, revisada pelo escritório.
- Otimização das fotos fornecidas.
- Redação e revisão de textos a partir de informações reais fornecidas pelo escritório. Todo texto
  é aprovado antes de publicar.
- SEO básico e metadados de compartilhamento.
- Publicação no GitHub Pages.
- Versão vetorial (SVG) fiel do logo e do monograma, sem mudar o desenho.

**Fora do escopo:**

- Formulário de contato, e-mail como canal de contato e agendamento online.
- Plantas e croquis dos projetos.
- Publicações na imprensa e depoimentos de clientes (podem entrar depois).
- Retratos da equipe.
- Produção de fotografias e retratos.
- Criação de um logotipo novo.
- Blog, área do cliente, loja virtual e painel de edição de conteúdo (CMS).
- Registro do domínio e e-mail profissional. O site pode ser apontado para o domínio depois.
- Anúncios pagos e gestão de redes sociais.
