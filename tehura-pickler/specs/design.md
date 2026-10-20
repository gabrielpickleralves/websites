# Design · TEHURA PICKLER

Fonte de verdade visual do projeto.

- **Versão:** 5, 16/10/2026. Na versão 5, a pedido do escritório:
  - entrou o botão de voltar ao início, a página Biografia e a nova composição do Escritório;
  - saiu Como trabalhamos.
- **Versão 4,** 15/10/2026: **aprovada pelo escritório**, depois de ver o esboço da página
  inicial (`esbocos/`), com três ajustes:
  - fundo mais claro (`#F2F0EB`);
  - projetos logo depois da abertura;
  - faixas de projeto com 85% da altura da tela também no celular.
- **Situação das propostas:** tudo o que era proposta na versão 3 foi aprovado.
- **Legenda:**
  - **[A DEFINIR]**: depende de material ou resposta do escritório.
  - Sem marcação: identidade do escritório ou decisão aprovada.

---

## 0. Uso da referência

**Referência:** site da Fernanda Marques Arquitetura.

- **Link:** `referencias/site-de-referencia.md`.
- **Prints:** `referencias/prints-fernanda-marques/` (desktop, 1920 px).
- **Análise com medidas:** `referencias/analise-da-referencia.md`.

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

**O que vem da referência, já adaptado à Tehura:**

- abertura em tela cheia, com o cabeçalho transparente por cima;
- faixas de foto de ponta a ponta para dar ritmo à página inicial;
- uma única linha de alinhamento para todos os textos;
- coluna de conteúdo de cerca de 1280 px;
- página de projeto com ficha técnica lateral fixa;
- composição dividida ao meio, com a foto indo até a borda da tela;
- filtros em abas de texto.

**O que muda em relação à referência:**

- **Fundo e cores:** fundo bege e texto carvão, no lugar de branco e preto.
- **Tipografia:** a fonte Tehura, só em maiúsculas.
- **Leitura:** texto corrido maior e com contraste alto, no lugar de texto pequeno e cinza.
- **Projetos:** duas colunas iguais, no lugar do mosaico.
- **Equipe:** só nomes e cargos, sem carrossel.
- **Página inicial:** os projetos aparecem em faixas, no lugar de categorias.

## 1. Direção visual

- **Atmosfera:** minimalismo geométrico, quente e monocromático. Fundo bege, texto carvão e as
  fotos dos projetos como único elemento de cor forte. As fotos fazem o trabalho, e o texto é pouco
  e direto.
- **Origem:** a identidade do escritório.
  - A fonte Tehura é geométrica, só em maiúsculas, com o "A" sem travessão (Λ).
  - O monograma TP é feito de traços finos e retos com um único arco.
- **Linguagem gráfica:**
  - linhas finas de 1 px como único ornamento, ecoando os traços do monograma;
  - cantos retos;
  - muito espaço em branco;
  - nenhum ícone decorativo.
- **Contato:** o WhatsApp é o único canal, e não há botão flutuante.
  - O botão "Conte sobre seu projeto" fica na página Contato e no menu do celular.
  - No cabeçalho do desktop, o link "Fale conosco" também abre o WhatsApp.
  - O rodapé tem o link do WhatsApp.
  - Desde 16/10/2026, a pedido do escritório, a chamada final das outras páginas tem só a frase,
    sem botão.

### Logo e monograma

**Arquivos:**

- **Originais em PNG 4K** (`identidade/logo/`):
  - logo empilhado (TEHURA / PICKLER / ARQUITETURA): carvão sobre transparente, branco sobre
    transparente e carvão sobre bege;
  - monograma TP: carvão sobre transparente, branco sobre transparente e branco sobre carvão.
- **No site, use sempre os SVG** (`identidade/svg/`):
  - `logo-tehura-pickler.svg` e `logo-tehura-pickler-branco.svg`;
  - `monograma-tp.svg` e `monograma-tp-branco.svg`.

  Eles foram conferidos com os PNG: diferença de 1,85% da área no logo e de 0,23% no monograma,
  só na suavização das bordas.

**Composição:**

- **Logo:** feito com a própria fonte Tehura.
  - "TEHURA" em Bold.
  - "PICKLER" e "ARQUITETURA" em Regular, com espaçamento entre letras, justificados na mesma
    largura.
- **Monograma:** formas geométricas exatas:
  - barra e haste do T;
  - haste do P;
  - bojo do P, um semicírculo com duas retas.

  Todas têm traço de cerca de 4,4% da altura do monograma.

**Uso:**

- Sobre o bege: logo e monograma em carvão.
- Sobre fotos e sobre carvão: versão branca.
- O desenho nunca é alterado: nada de mudar a cor fora dessas versões, distorcer, contornar ou
  aplicar sombra.

**Onde cada um aparece:**

- **Monograma TP:**
  - no cabeçalho fixo;
  - como ícone do navegador (favicon) e de atalho no celular.
- **Logo completo:**
  - em branco, sobre a foto em tela cheia da abertura da página inicial;
  - no rodapé.

**Tamanhos e área livre:**

- **Tamanho mínimo do logo:** 120 px de largura.
- **Área livre ao redor do logo:** igual à altura de uma linha do "TEHURA".

### Frase do escritório

**"Arquitetura e interiores"**.

- Ela **não** vai logo abaixo do logo, porque o logo já termina em "ARQUITETURA" e as
  duas palavras ficariam repetidas.
- Lugares onde aparece:
  - título da apresentação na página inicial;
  - título da aba do navegador;
  - descrição para buscadores.

## 2. Paleta principal e secundária

| Papel | Nome | Cor | Origem |
|---|---|---|---|
| Fundo do site | Bege claro | `#F2F0EB` | escolhido pelo escritório, mais claro que o bege da identidade |
| Peças da identidade (como o PNG do logo com fundo bege) | Bege da identidade | `#EBE8E1` | identidade |
| Texto, logo e traços | Carvão | `#1E1D19` | identidade |
| Sobre fotos e sobre carvão | Branco | `#FFFFFF` | identidade |
| Texto secundário | Cinza quente | `#66635C` | derivado do carvão |
| Linhas e divisórias | Areia | `#C9C5BD` | derivado do bege |

**Contraste (exigência mínima de 4,5:1 para texto):**

| Combinação | Contraste | Uso |
|---|---|---|
| Carvão sobre o fundo | 14,8:1 | texto |
| Cinza quente sobre o fundo | 5,3:1 | texto secundário |
| Branco sobre carvão | 16,9:1 | texto |
| Areia sobre o fundo | 1,5:1 | **nunca texto**: só divisórias decorativas |

## 3. Cores de fundo, texto, botões e detalhes

- **Fundo:** bege claro `#F2F0EB` em todas as páginas, inclusive no cabeçalho e no rodapé.
- **Texto principal:** carvão.
- **Texto secundário** (cidade e ano, cargos, rótulos da ficha técnica): cinza quente.
- **Botões:** contorno carvão de 1 px, texto carvão e fundo transparente. Ao passar o
  mouse ou focar, o fundo fica carvão e o texto bege.
- **Links no texto:** carvão, com sublinhado fino.
- **Foco do teclado:** contorno carvão de 2 px, afastado 3 px do elemento.
- **Divisórias:** linha areia de 1 px.
- **Texto sobre foto** (abertura e faixas de projeto): branco, com um véu escuro suave
  na parte de baixo da foto (degradê de transparente a 45% de carvão) para manter o contraste.
- **Galeria ampliada:** fundo carvão, para a foto se destacar. É a única área escura do
  site.

## 4. Tipografia

**Duas famílias** (decisão do escritório em 20/10/2026, que substitui "só Tehura, tudo em maiúsculas"):

- **Tehura**, fonte própria do escritório, em Light, Regular e Bold.
  - Usada em títulos, menu, rótulos, botões, legendas, ficha técnica e rodapé.
  - Arquivos em `identidade/fonte/`. A publicação no site está autorizada.
- **Jost** (licença SIL OFL 1.1, `fontes/OFL-Jost.txt`), em Regular, só nos parágrafos de texto
  corrido.
  - Onde: `p` dentro de `.texto`, `.dividida__texto` (inclusive a Biografia e o Contato),
    `.projeto__conteudo` e `.linha-do-tempo`, além de `.topo-pagina__texto`.
  - Medidas: espaço entre letras de 0,01em e entrelinha de 1,7.
  - Escolhida por ser geométrica e leve como a Tehura, mas com minúsculas, o que facilita a leitura
    de textos longos.
  - Arquivo: `fontes/jost-regular.woff2`, conjunto latino com os acentos do português, 9,4 KB, vindo
    do pacote npm `@fontsource/jost`.

**Tehura em maiúsculas.**

- **Como funciona:** a Tehura não tem minúsculas, e as letras minúsculas são desenhadas como
  maiúsculas.
- **Regra:** todos os textos são escritos no HTML em caixa normal (frases com maiúscula só no
  começo e nos nomes próprios). A Tehura mostra tudo em maiúsculas, e a Jost mostra o texto como
  está escrito.
- **Por quê:** leitores de tela, Google, tradução automática e copiar e colar recebem o texto
  normal. Por isso não se usa `text-transform: uppercase`.

**Sinais que a Tehura não tem** (vale para títulos, rótulos e menus; os parágrafos em Jost têm todos).

- **Sinais ausentes:** `²` `%` `·` `#` `©` `*` `$` `_` `|` `[ ]` `< >`, aspas curvas `“ ” ‘ ’`,
  `…`, `º` e `ª`, além de `ü`, `è` e `ñ`.
- **Como contornar:**
  - escrever "420 m2" em vez de "420 m²";
  - usar o travessão "—" como separador, no lugar de "·";
  - usar aspas retas;
  - escrever "por cento" ou evitar números em porcentagem;
  - no rodapé, o "©" de "© 2026 TEHURA PICKLER — Todos os direitos reservados" sai na Jost
    (desde 20/10/2026).
- **Reserva:** a Jost vem logo depois da Tehura na lista de fontes. Se um desses sinais aparecer num
  texto em Tehura, ele sai na Jost, que tem desenho parecido. O `gerar.py` avisa quando isso
  acontece.

**Pesos:**

- **Regular:**
  - títulos de página e de seção (como na referência, os títulos ficam leves e o peso vem do
    tamanho);
  - menu e botões.
- **Bold:** só em rótulos pequenos (ficha técnica) e no nome dos projetos nos cards.
- **Light:** só em tamanhos grandes, a partir de 24 px (nomes sobre as fotos). Em tamanho pequeno o
  traço fino perde leitura.

**Texto corrido:** parágrafos curtos e nunca abaixo de 17 px. A referência usa 13–14 px, o que é
pequeno demais.

**Formato no site:** WOFF2. A Tehura foi convertida dos TTF enviados. São pré-carregadas a Tehura
Regular e a Jost Regular.

## 5. Escala tipográfica

Tamanhos fluidos, que crescem do celular ao desktop, calibrados com a referência (ver a
análise, seção 3).

| Papel | Celular → desktop | Peso | Entrelinha | Espaço entre letras |
|---|---|---|---|---|
| Nome sobre foto (faixas e abertura de projeto) | 28 → 40 px | Light | 1,15 | 0,04 em |
| Título de página | 28 → 40 px | Regular | 1,2 | 0,06 em |
| Título de seção | 22 → 28 px | Regular | 1,25 | 0,08 em |
| Texto corrido (Jost) | 17 → 18 px | Regular | 1,7 | 0,01 em |
| Nome do projeto no card | 15 → 16 px | Bold | 1,4 | 0,08 em |
| Menu, botões, filtros e rótulos | 14 → 15 px | Regular (rótulo da ficha em Bold) | 1,4 | 0,14 em |
| Texto pequeno (direitos autorais) | 13 px | Regular | 1,5 | 0,1 em |

## 6. Espaçamentos

- **Escala base de 8 px:** 4, 8, 16, 24, 32, 48, 64, 96, 128 e 160 px.
- **Coluna de conteúdo:** até 1280 px, centralizada (a referência usa 1260 px).
- **Linha de alinhamento:** todo texto começa na borda esquerda da coluna, inclusive sobre as fotos
  de ponta a ponta.
- **Margens laterais mínimas:** 20 px no celular, 48 px no tablet e 80 px no desktop.
- **Colunas de texto:** até 60 caracteres por linha, porque o texto em maiúsculas é mais largo.
- **Topo das páginas internas:** 64 px entre cabeçalho, título, subtítulo, filtros e conteúdo.
- **Espaço vertical entre seções:** de 64 px no celular a 128 px no desktop.
  - Seções seguidas não somam os dois espaços: entre elas fica um só (`.secao + .secao`).
    Corrigido em 20/10/2026, quando havia 256 px antes de "Outros projetos" e da chamada final.
- **Entre fotos:**
  - grade de projetos: 32 px no desktop e 24 px no tablet. A referência usa 22 px com três
    colunas; com duas colunas grandes, um pouco mais de ar fica melhor.
  - Faixas de foto de ponta a ponta: coladas, sem espaço entre elas.
- **Grade:** 12 colunas no desktop e 4 no celular.

## 7. Bordas e raios

- Cantos sempre retos (raio 0), em fotos, botões e cards. A referência usa cantos levemente
  arredondados nos botões; a Tehura não.
- Linhas de 1 px.
- Nenhuma sombra.

## 8. Botões

- **Principal ("Conte sobre seu projeto", abre o WhatsApp):**
  - contorno carvão de 1 px, texto em Regular, altura mínima de 48 px e preenchimento
    invertido ao passar o mouse;
  - sobre foto, a versão é branca (contorno e texto brancos).
- **Secundário** ("Ver projetos", "Conheça o escritório"): só texto, com uma linha fina
  embaixo que cresce ao passar o mouse.
- **Sem botão flutuante de WhatsApp** (decisão do escritório).

## 9. Cards

- **Grade de projetos:** duas colunas (decisão do escritório).
- **Card de projeto:**
  - foto em 3:2, sem borda e sem sombra, na mesma proporção em toda a grade;
  - embaixo, a 12 px da foto: nome do projeto em Bold à esquerda e "Cidade — ano" em cinza quente
    à direita, na mesma linha;
  - no celular, a cidade e o ano vão para a linha de baixo.
- **Ao passar o mouse:** a foto escurece levemente e aumenta 3%, devagar.
- **Card inteiro clicável**, com foco visível pelo teclado.

## 10. Fotografias de arquitetura

A confirmar quando as fotos chegarem.

- Fotos profissionais com luz natural, cores fiéis e sem filtros.
- Linhas verticais retas (perspectiva corrigida, como é padrão em fotografia de arquitetura).
- Duas proporções no site inteiro: 3:2 horizontal e 4:5 vertical. As faixas de ponta a ponta
  recortam a foto horizontal pelo enquadramento. Nunca distorcer.
- Texto sobre foto só na abertura da página inicial, nas faixas de projeto e na abertura de cada
  projeto.
- Crédito do fotógrafo em todas as páginas de projeto.

## 11. Tratamento dos projetos

- **O que entra:** fotos profissionais e ficha técnica, com crédito do fotógrafo.
- **O que não entra:** plantas, croquis e nome dos clientes.
- **Página de projeto:**
  1. **Abertura:** foto em tela cheia, com o nome do projeto e "Cidade — ano" embaixo à esquerda,
     em branco.
  2. **Duas colunas** (direção da referência):
     - **à esquerda, ficha técnica fixa** enquanto a página rola (cerca de 1/4 da coluna):
       - Categoria;
       - Local (cidade/UF);
       - Ano;
       - Área (em m2);
       - Situação;
       - Fotografia.

       Rótulo em Bold e cinza quente; valor em Regular e carvão. Linhas areia entre os itens.
     - **à direita**, o texto curto do projeto e a galeria: fotos 3:2 na largura da coluna,
       intercaladas com pares de fotos 4:5 lado a lado.
       - Sequência (20/10/2026): 3:2, par 4:5, 3:2, par 4:5…
       - Nunca sobra uma 4:5 sozinha, e a galeria nunca termina com duas 3:2 seguidas.
       - Sem fotos, mostra 6 marcadores.
  3. **"Outros projetos":** dois cards.
  4. **Chamada final:** só a frase, sem botão.
- **No celular:** a ficha técnica vem logo depois da abertura, antes do texto e das
  fotos, e não fica fixa.

## 12. Retratos da arquiteta e da equipe

- **Tehura Pickler:** é a única pessoa com retrato, e ele aparece **em cor**.
  - Retrato vertical, luz natural, fundo neutro próximo ao bege.
  - Na página Biografia, ocupa a metade direita e vai até a borda da tela.
    - No desktop, fica parada ao lado enquanto o texto rola.
    - No celular, vem em cima, antes do texto.
  - Na página Escritório, no mesmo lugar, entra uma foto do escritório. [A DEFINIR] Qual foto.
- **Equipe:** só nome e cargo, sem fotos.
  - Lista tipográfica em duas ou três colunas, com nome em Regular, cargo em cinza
    quente e linhas areia entre as pessoas, sem espaços vazios no lugar de fotos.

## 13. Movimento e animações

Nível de movimento: **sutil** (decisão do escritório).

- **Entrada das seções:** aparecem com um leve deslocamento de 16 px e esmaecimento, em 0,6 s.
  - **Nenhum conteúdo fica invisível** (20/10/2026).
    - Só anima o que entra na tela pela rolagem.
    - Aparece na hora, sem animação, o que já está na tela ou acima dela: ao carregar, ao pular
      por âncora, ao redimensionar, ao capturar a página inteira e ao imprimir.
    - Sem JavaScript, ou se o script falhar, tudo aparece.
- **Ao passar o mouse:** transições de 0,3 s.
- **Cabeçalho:** a troca de transparente para bege, ao rolar, leva 0,3 s.
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

**Cabeçalho:**

- **Na página inicial:** começa transparente sobre a foto, com monograma e menu em branco. Ao rolar,
  vira uma barra bege fixa, com monograma e menu em carvão e uma linha areia embaixo.
- **Nas páginas internas:** já começa bege.
- **Altura:** 96 px no topo e 64 px depois de rolar (a referência usa 119 e 59 px). No celular,
  64 px.
- **Botão de voltar ao início** (pedido do escritório em 16/10/2026):
  - **Onde aparece:** em todas as páginas menos a inicial, no canto superior esquerdo, à esquerda
    do monograma, separado dele por uma linha fina.
  - **Como é:** só a seta fina "←", desenhada em SVG (a fonte não tem a seta), sem texto.
  - **Cor e hover:** usa a cor do cabeçalho; ao passar o mouse, a seta anda 4 px para a esquerda.
  - **Área de toque:** 44 × 44 px.
  - **Acessibilidade:** link relativo para o início, com `aria-label` "Voltar ao início".
- **Desktop:**
  - botão de voltar e monograma à esquerda, alinhados à coluna de conteúdo;
  - menu à direita: Escritório, Biografia, Projetos, Contato e PT | EN;
  - depois do PT | EN, o link "Fale conosco" (20/10/2026):
    - abre o WhatsApp com a mensagem pronta;
    - é um botão pequeno com contorno de 1 px na cor do cabeçalho (branco sobre foto, carvão no
      topo rolado), que fica preenchido ao passar o mouse;
    - tem 44 px de altura;
    - só aparece no desktop, porque no celular o WhatsApp está no painel do menu;
  - item atual sublinhado.
- **Celular:** botão de voltar e monograma à esquerda e botão "Menu" à direita. O botão abre um painel bege em tela
  cheia, com os links em tamanho grande, o botão do WhatsApp e a troca de idioma.

**Larguras conferidas:** 360, 390, 768, 1024, 1280, 1440 e 1920 px. No celular, conferir
que nenhuma palavra longa em maiúsculas estoura a largura (por exemplo, "ARQUITETURA" e
"INCORPORAÇÃO" em títulos grandes).

## 15. Composição das páginas

Adaptada da referência (ver a análise, seção 2) à identidade e às decisões da Tehura.

**Início:**

A ordem foi escolhida pelo escritório.

1. **Abertura:** foto de projeto em tela cheia, com o logo completo em branco embaixo à esquerda,
   na linha de alinhamento.
   - **Indicador de rolar** (20/10/2026): seta fina branca embaixo à direita, alinhada à coluna.
     - É um link para as faixas de projetos, com área de toque de 44 × 72 px e o rótulo "Rolar até
       os projetos".
     - Desce e sobe devagar e fica parada para quem prefere menos movimento.
     - Ao chegar, a faixa encosta no cabeçalho.
2. **Projetos em faixas:** de três a quatro projetos em destaque, cada um numa faixa de foto de
   ponta a ponta, com 85% da altura da tela em todas as larguras, inclusive no celular.
   - Nome e "Cidade — ano" ficam embaixo à esquerda, em branco.
   - A faixa inteira leva ao projeto.
   - No fim, o link "Ver todos os projetos".
   - Na referência, as faixas são de categorias. Aqui são projetos, o que funciona melhor com 6 a
     10 projetos.
3. **Apresentação:**
   - título "Arquitetura e interiores";
   - dois ou três parágrafos curtos;
   - link "Conheça o escritório".
4. **Tehura Pickler:** composição dividida ao meio, com texto curto e o link "Leia a biografia" à
   esquerda e retrato em cor à direita até a borda.
5. **Chamada final:** frase curta, sem botão.

**Escritório:**

1. Composição dividida ao meio: título e texto sobre o escritório à esquerda, foto do escritório à
   direita até a borda.
2. **Serviços e áreas de atuação** em duas colunas, em listas com linhas finas.
3. **Equipe:** lista tipográfica de nomes e cargos.
4. **Prêmios e mostras:** lista completa, com ano, nome do prêmio ou mostra e projeto, separada por
   linhas areia. Sem selos sobre fotos.
5. CAU do escritório e chamada final.

**Biografia:**

1. Composição dividida ao meio: "Biografia" em rótulo pequeno, título "Tehura Pickler" e texto com
   os subtítulos Formação, Início da carreira, Marcos e prêmios e Visão sobre arquitetura, à
   esquerda.
2. Retrato em cor à direita, parado ao lado do texto no desktop e em cima no celular.
3. **Linha do tempo:** ano em Light à esquerda e marco à direita, em linhas finas. No celular, um
   embaixo do outro. Inclui os principais prêmios.
4. Chamada final.

**Projetos:**

1. Título e subtítulo de uma linha.
2. Filtros em abas de texto: Todos, Residencial, Interiores, Comercial e Incorporação. Só aparecem
   as categorias que têm projeto, e a aba atual fica sublinhada.
3. Grade de duas colunas.
4. Chamada final.

**Projeto:** ver a seção 11.

**Contato:**

1. Composição dividida ao meio:
   - à esquerda: título, frase curta, botão grande "Conte sobre seu projeto", bairro e Mogi das
     Cruzes (SP), horário, Instagram e CAU;
   - à direita: foto até a borda. [A DEFINIR] Qual foto.

**Rodapé:**

- fundo bege com linha areia no topo;
- três colunas:
  - logo completo em carvão;
  - WhatsApp, horário e bairro/cidade;
  - Instagram e CAU;
- embaixo, linha fina e "© 2026 TEHURA PICKLER — Todos os direitos reservados" (em inglês,
  "All rights reserved"). O "©" sai na Jost, porque a Tehura não tem esse sinal.

**Erro 404:** monograma, frase curta e link para o início.

## 16. Elementos a evitar

- Qualquer elemento copiado da referência (ver seção 0).
- Alterações no logo e no monograma.
- Os sinais que a fonte não tem (ver seção 4).
- Texto escrito em maiúsculas no HTML: a fonte já faz isso.
- Light em tamanhos pequenos.
- Texto corrido pequeno ou de baixo contraste (ponto fraco da referência).
- **Itens de estilo:**
  - fotos de banco de imagens;
  - carrossel, inclusive o de equipe;
  - mosaico de alturas variadas;
  - botão "Carregar mais" e busca;
  - newsletter;
  - selos de prêmio sobre fotos;
  - animações chamativas ou que atrasem a leitura;
  - ícones genéricos;
  - sombras;
  - cantos arredondados;
  - pop-ups;
  - cores além da paleta.
