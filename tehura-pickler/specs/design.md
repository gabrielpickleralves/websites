# Design · TEHURA PICKLER

Fonte de verdade visual do projeto.

- **Versão:** 2, 15/10/2026. Inclui a identidade visual e as escolhas visuais do escritório
  (cabeçalho, abertura, grade, movimento e retrato). Ainda não aprovada por inteiro.
- **Situação:** paleta, tipografia e logo vêm da identidade do escritório (`identidade/`).
  Espaçamentos, ritmo e composição das páginas ainda dependem do print do site de referência
  (ver seção 0).
- **Legenda:**
  - **[A DEFINIR]**: depende das referências ou de resposta do escritório.
  - **[PROPOSTA]**: sugestão do Claude; só vale depois de aprovada.
  - Sem marcação: identidade do escritório ou decisão aprovada.

---

## 0. Uso da referência

**Referência principal:** site da Fernanda Marques Arquitetura. O link e as páginas conhecidas estão
em `referencias/site-de-referencia.md`.

Ela serve **só** como direção de estrutura e atmosfera. A identidade final é a do escritório
TEHURA PICKLER.

**Não copiar:**

- textos;
- logotipo;
- nome;
- identidade proprietária;
- imagens;
- elementos exclusivos da marca;
- layouts de forma idêntica.

### Observações preliminares (fontes indiretas, a confirmar com o print)

O site de referência não pôde ser aberto deste ambiente: a rede bloqueia o domínio. Tudo abaixo
vem de resultados de busca e de uma descrição feita antes. Precisa ser confirmado com o print.

- **Menu:** Quem Somos, Projetos, Produtos e Contato, com troca de idioma PT/EN.
- **Categorias de projeto:** Residencial, Corporativo, Comercial e Produtos.
- **Projetos:** cada um tem página própria, com fotos, ano, cidade e texto curto.
- **Elementos descritos antes, ainda sem verificação:**
  - fotos grandes;
  - abertura em tela cheia;
  - submenus de projetos;
  - grade de categorias;
  - rodapé com contato e redes;
  - botão flutuante de WhatsApp (não será usado no site da Tehura).

## 1. Direção visual

- **Atmosfera:** minimalismo geométrico, quente e monocromático. Fundo bege, texto carvão e as
  fotos dos projetos como único elemento de cor forte.
- **Origem:** a identidade do escritório.
  - A fonte Tehura é geométrica, só em maiúsculas, com o "A" sem travessão (Λ).
  - O monograma TP é feito de traços finos e retos com um único arco.
- **[PROPOSTA] Linguagem gráfica:**
  - linhas finas de 1 px como único ornamento, ecoando os traços do monograma;
  - cantos retos;
  - muito espaço em branco;
  - nenhum ícone decorativo.
- **Contato:** o WhatsApp é o único canal, e não há botão flutuante. O botão "Conte sobre seu
  projeto" precisa ser o mais visível de cada página, sem competir com as fotos.

### Logo e monograma

**Arquivos (em `identidade/logo/`, PNG 4K):**

- **Logo empilhado:** TEHURA / PICKLER / ARQUITETURA, em três versões:
  - carvão sobre transparente;
  - branco sobre transparente;
  - carvão sobre bege.
- **Monograma TP:** em três versões:
  - carvão sobre transparente;
  - branco sobre transparente;
  - branco sobre carvão.

**Uso:**

- Sobre o bege: logo e monograma em carvão.
- Sobre fotos e sobre carvão: versão branca.
- O desenho nunca é alterado: nada de mudar a cor fora dessas versões, distorcer, contornar ou
  aplicar sombra.
- No site, use sempre os **SVG de `identidade/svg/`**:
  - `logo-tehura-pickler.svg` e `logo-tehura-pickler-branco.svg`;
  - `monograma-tp.svg` e `monograma-tp-branco.svg`.

  Eles foram conferidos com os PNG: diferença de 1,85% da área no logo e de 0,23% no monograma,
  só na suavização das bordas.
- **Composição do logo:** a própria fonte Tehura.
  - "TEHURA" em Bold.
  - "PICKLER" e "ARQUITETURA" em Regular, com espaçamento entre letras, justificados na mesma
    largura.
- **Monograma TP:** formas geométricas exatas:
  - barra e haste do T;
  - haste do P;
  - bojo do P, um semicírculo com duas retas.

  Todas têm traço de cerca de 4,4% da altura do monograma.

**Onde cada um aparece:**

- **Monograma TP:**
  - no cabeçalho fixo;
  - [PROPOSTA] como ícone do navegador (favicon) e de atalho no celular.
- **Logo completo:**
  - em branco, sobre a foto em tela cheia da abertura da página inicial;
  - [PROPOSTA] no rodapé.

**[PROPOSTA] Tamanhos e área livre:**

- **Tamanho mínimo do logo:** 120 px de largura.
- **Área livre ao redor do logo:** igual à altura de uma linha do "TEHURA".

### Frase do escritório

**"Arquitetura e interiores"**, usada abaixo do nome no cabeçalho da página inicial e nos
metadados.

## 2. Paleta principal e secundária

| Papel | Nome | Cor | Origem |
|---|---|---|---|
| Fundo principal | Bege | `#EBE8E1` | identidade |
| Texto, logo e traços | Carvão | `#1E1D19` | identidade |
| Sobre fotos e sobre carvão | Branco | `#FFFFFF` | identidade |
| [PROPOSTA] Texto secundário | Cinza quente | `#66635C` | derivado do carvão |
| [PROPOSTA] Linhas e divisórias | Areia | `#C9C5BD` | derivado do bege |

**Contraste (exigência mínima de 4,5:1 para texto):**

| Combinação | Contraste | Uso |
|---|---|---|
| Carvão sobre bege | 13,8:1 | texto |
| Cinza quente sobre bege | 4,9:1 | texto secundário |
| Branco sobre carvão | 16,9:1 | texto |
| Areia sobre bege | 1,4:1 | **nunca texto**: só divisórias decorativas |

## 3. Cores de fundo, texto, botões e detalhes

- **Fundo:** bege em todas as páginas.
- **Texto principal:** carvão.
- **Texto secundário** (cidade e ano, cargos, rótulos da ficha técnica): cinza quente.
- **[PROPOSTA] Botões:** contorno carvão de 1 px, texto carvão e fundo transparente. Ao passar o
  mouse ou focar, o fundo fica carvão e o texto bege.
- **[PROPOSTA] Links no texto:** carvão, com sublinhado fino.
- **[PROPOSTA] Foco do teclado:** contorno carvão de 2 px, afastado 3 px do elemento.
- **[PROPOSTA] Divisórias:** linha areia de 1 px.
- **[PROPOSTA] Texto sobre foto** (só na abertura): branco, com um véu escuro suave na foto para
  manter o contraste.
- **[PROPOSTA] Galeria ampliada:** fundo carvão, para a foto se destacar. É a única área escura do
  site, porque o fundo principal aprovado é o bege.

## 4. Tipografia

**Uma só família: Tehura**, fonte própria do escritório, em três pesos: Light, Regular e Bold.
Arquivos em `identidade/fonte/`. A publicação no site está autorizada.

**Tudo em maiúsculas**, inclusive os textos longos (decisão do escritório).

- **Como funciona:** a fonte não tem minúsculas, e as letras minúsculas são desenhadas como
  maiúsculas.
- **Regra:** os textos são escritos no HTML em caixa normal (frases com maiúscula só no começo e
  nos nomes próprios). A própria fonte mostra tudo em maiúsculas.
- **Por quê:** leitores de tela, Google, tradução automática e copiar e colar continuam recebendo o
  texto normal. Por isso não se usa `text-transform: uppercase`.

**Sinais que a fonte não tem: contornar nos textos.**

- **Sinais ausentes:** `²` `%` `·` `#` `*` `$` `_` `|` `[ ]` `< >`, aspas curvas `“ ” ‘ ’`, `…`,
  `º` e `ª`, além de `ü`, `è` e `ñ`.
- **Como contornar:**
  - escrever "420 m2" em vez de "420 m²";
  - usar o travessão "—" como separador, no lugar de "·";
  - usar aspas retas;
  - escrever "por cento" ou evitar números em porcentagem.
- **[PROPOSTA] Reserva:** se um desses sinais aparecer, o navegador usa só nele uma fonte geométrica
  do sistema, listada depois da Tehura.

**[PROPOSTA] Pesos:**

- **Bold:** títulos de página e de seção.
- **Regular:** menu, botões, subtítulos e texto corrido.
- **Light:** só em tamanhos grandes, a partir de 24 px, porque o traço fino perde leitura em
  tamanhos pequenos.

**[PROPOSTA] Para compensar a leitura em maiúsculas:**

- parágrafos curtos, de até quatro ou cinco linhas;
- espaço entre letras levemente aberto;
- entrelinha generosa;
- texto corrido nunca abaixo de 17 px.

**Formato no site:** WOFF2, convertido dos arquivos TTF enviados. Só a Regular é pré-carregada.

## 5. Escala tipográfica

[PROPOSTA] Tamanhos fluidos, que crescem do celular ao desktop. Ainda serão ajustados com o print
da referência.

| Papel | Celular → desktop | Peso | Entrelinha | Espaço entre letras |
|---|---|---|---|---|
| Abertura (frase grande) | 40 → 88 px | Light | 1,1 | 0,02 em |
| Título de página | 32 → 56 px | Bold | 1,15 | 0,04 em |
| Título de seção | 24 → 36 px | Bold | 1,2 | 0,06 em |
| Subtítulo | 18 → 22 px | Regular | 1,5 | 0,08 em |
| Texto corrido | 17 → 18 px | Regular | 1,75 | 0,06 em |
| Rótulos, menu e botões | 14 → 15 px | Regular | 1,4 | 0,16 em |

## 6. Espaçamentos

[PROPOSTA] Ainda serão ajustados com o print da referência.

- **Escala base de 8 px:** 4, 8, 16, 24, 32, 48, 64, 96, 128 e 160 px.
- **Espaço vertical entre seções:** de 64 px no celular a 160 px no desktop.
- **Margens laterais:** 20 px no celular, 48 px no tablet e 80 px no desktop.
- **Largura máxima:** 1440 px para o conteúdo e 60 caracteres para colunas de texto. Em maiúsculas o
  texto fica mais largo, e linhas curtas leem melhor.
- **Grade:** 12 colunas no desktop e 4 no celular.

## 7. Bordas e raios

[PROPOSTA]

- Cantos sempre retos (raio 0), em fotos, botões, campos e cards.
- Linhas de 1 px.
- Nenhuma sombra.

## 8. Botões

[PROPOSTA]

- **Principal ("Conte sobre seu projeto", abre o WhatsApp):** contorno carvão de 1 px, texto em
  Regular, altura mínima de 48 px e preenchimento invertido ao passar o mouse.
- **Secundário** ("Ver projetos"): só texto, com uma linha fina embaixo que cresce ao passar o
  mouse.
- **Sem botão flutuante de WhatsApp** (decisão do escritório).

## 9. Cards

[PROPOSTA]

- **Card de projeto:**
  - foto sem borda e sem sombra, sempre na mesma proporção dentro de uma grade;
  - embaixo, o nome do projeto em Regular e "Cidade — ano" em cinza quente.
- **Ao passar o mouse:** a foto escurece levemente e aumenta 3%, devagar.
- **Card inteiro clicável**, com foco visível pelo teclado.

## 10. Fotografias de arquitetura

[PROPOSTA] A confirmar quando as fotos chegarem.

- Fotos profissionais com luz natural, cores fiéis e sem filtros.
- Linhas verticais retas (perspectiva corrigida, como é padrão em fotografia de arquitetura).
- Duas proporções no site inteiro: 3:2 horizontal e 4:5 vertical. Nunca distorcer. Recortar só pelo
  enquadramento.
- Texto sobre foto só na abertura da página inicial e na abertura de cada projeto.
- Crédito do fotógrafo em todas as páginas de projeto.

## 11. Tratamento dos projetos

- **O que entra:** fotos profissionais e ficha técnica, com crédito do fotógrafo.
- **O que não entra:** plantas, croquis e nome dos clientes.
- **[PROPOSTA] Página de projeto:**
  1. foto de abertura em tela cheia, com o nome do projeto;
  2. ficha técnica;
  3. texto curto;
  4. galeria intercalando fotos inteiras na largura e pares lado a lado;
  5. crédito;
  6. links para o projeto anterior e o próximo;
  7. chamada para o WhatsApp.
- **[PROPOSTA] Ficha técnica:** lista de rótulo e valor separados por linhas areia:
  - Categoria;
  - Local (cidade/UF);
  - Ano;
  - Área (em m2);
  - Situação;
  - Fotografia.

## 12. Retratos da arquiteta e da equipe

- **Tehura Pickler:** é a única pessoa com retrato, e ele aparece **em cor**.
  - [PROPOSTA] Retrato vertical 4:5, luz natural, fundo neutro próximo ao bege.
- **Equipe:** só nome e cargo, sem fotos.
  - [PROPOSTA] Lista tipográfica em colunas, com nome em Regular, cargo em cinza quente e linhas
    areia entre as pessoas, sem espaços vazios no lugar de fotos.

## 13. Movimento e animações

Nível de movimento: **sutil** (decisão do escritório). Detalhes abaixo em [PROPOSTA].

- **Entrada das seções:** aparecem com um leve deslocamento de 16 px e esmaecimento, em 0,6 s.
- **Ao passar o mouse:** transições de 0,3 s.
- **O que não entra:**
  - parallax;
  - carrossel automático;
  - cortina de abertura;
  - vídeo que toca sozinho com som.
- **Com a preferência por menos movimento** (`prefers-reduced-motion`) ativada, tudo aparece sem
  animação.

## 14. Desktop e celular

**Decisões do escritório:**

- **Cabeçalho:** monograma TP.
- **Abertura da página inicial:** foto em tela cheia (altura total da tela), com o logo completo em
  branco.
- **Grade de projetos:** duas colunas grandes no desktop e uma no celular.

**[PROPOSTA]**

- **Cabeçalho no desktop:**
  - monograma TP à esquerda;
  - menu à direita;
  - PT | EN no fim do menu.
- **Cabeçalho no celular:**
  - monograma TP à esquerda;
  - botão "Menu" à direita, que abre um painel bege em tela cheia com os links em tamanho grande e
    a troca de idioma.
- **Textos longos em maiúsculas:** no celular, conferir que nenhuma palavra longa estoura a largura
  (por exemplo, "ARQUITETURA" em títulos grandes).

## 15. Elementos a evitar

- Qualquer elemento copiado da referência (ver seção 0).
- Alterações no logo e no monograma.
- Os sinais que a fonte não tem (ver seção 4).
- Texto escrito em maiúsculas no HTML: a fonte já faz isso.
- Light em tamanhos pequenos.
- **[PROPOSTA]**
  - fotos de banco de imagens;
  - carrossel que avança sozinho;
  - animações chamativas ou que atrasem a leitura;
  - ícones genéricos;
  - sombras;
  - cantos arredondados;
  - pop-ups;
  - cores além da paleta.
