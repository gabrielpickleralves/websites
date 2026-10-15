# Análise do site de referência · fernandamarques.com.br

- **Base:** os prints de `prints-fernanda-marques/`, enviados pelo escritório e capturados em
  15/10/2026 numa tela de computador de 1920 px de largura.
- **Medidas:** os prints foram salvos com 1254 px de largura. Todas as medidas abaixo já foram
  convertidas para a tela real de 1920 px (fator 1,53).
- **Sem celular:** não há prints de celular.

**Uso:** só como direção de estrutura e atmosfera. Nada daqui é copiado (ver `../CLAUDE.md`). O que
vale para o site da Tehura está em `../specs/design.md`.

---

## 1. Estrutura e navegação

- **Menu:**
  - Home;
  - Sobre;
  - Projetos (submenu com 7 categorias);
  - Prêmios;
  - Mídia (submenu: Artigos e Publicações);
  - Contato;
  - EN;
  - busca.
- **Submenu:** caixa preta que cai abaixo do item, com os links em lista.
- **Logo:** à esquerda. O menu fica alinhado à direita, em texto pequeno, com o item atual
  sublinhado.
- **Páginas observadas:**
  - Home;
  - Sobre;
  - Projetos (lista com filtros e uma página por categoria);
  - Projeto aberto;
  - Prêmios;
  - Mídia/Artigos;
  - Mídia/Publicações;
  - Contato.

## 2. Composição de cada página

| Página | Composição |
|---|---|
| Home | Abertura em tela cheia (foto/vídeo), com frase em 3 linhas e botão branco embaixo à esquerda. Depois, cinco faixas de foto em tela cheia, uma por categoria, com o nome da categoria embaixo à esquerda, sobre a foto. No fim, newsletter e rodapé. |
| Sobre | Duas metades. À esquerda, coluna de texto (título numa caixa cinza-clara, subtítulos e parágrafos). À direita, retrato grande que vai até a borda da tela. Depois, bloco "Equipe" com carrossel de retratos em preto e branco (4 por vez), nomes embaixo e pontos de navegação. |
| Projetos | Título, subtítulo de uma linha e filtros em abas de texto, com a aba atual sublinhada. Grade de 3 colunas em mosaico (alturas variadas), com nome do projeto em negrito e "+" à direita. Botão preto "Carregar mais". |
| Projeto aberto | Duas colunas. À esquerda, ficha lateral estreita: nome, subtítulo, categoria, ficha técnica com rótulo em negrito e valor embaixo, botão "Baixar release" e "Sugestões" com 3 projetos separados por linhas. À direita, fotos grandes em 16:9 intercaladas com subtítulos e parágrafos. |
| Prêmios | Título, parágrafo e grade de 3 colunas: foto, selo do prêmio no canto superior direito e nome do projeto. |
| Mídia | Abas Artigos/Publicações; grade de 4 colunas; capas de revista. |
| Contato | Duas metades. À esquerda, formulário de linhas finas (nome, e-mail, telefone, mensagem) e "Faça parte da equipe". À direita, foto até a borda da tela; embaixo dela, endereço, telefone e link do mapa. |

## 3. Medidas (tela de 1920 px)

| Elemento | Medida |
|---|---|
| Coluna de conteúdo | 1260 px, centralizada (margens de cerca de 330 px) |
| Alinhamento | todo texto começa na mesma linha vertical (x ≈ 323 px), na abertura, nas faixas da Home, nos títulos e nas grades |
| Cabeçalho das páginas internas | 119 px de altura, preto |
| Cabeçalho da Home | transparente sobre a foto; ao rolar, vira barra preta fixa de cerca de 59 px |
| Logo no cabeçalho | cerca de 92 px de largura, a 52 px da borda esquerda |
| Itens do menu | texto de cerca de 15–16 px |
| Título de página ("Projetos", "Prêmios") | letra de cerca de 32 px, peso leve |
| Subtítulo e abas de filtro | cerca de 15 px |
| Espaço vertical no topo das páginas | cerca de 64–70 px entre cabeçalho, título, subtítulo, filtros e grade |
| Grade de projetos | 3 colunas de 406 px e 22 px entre elas; fotos horizontais em cerca de 4:3 e verticais mais altas |
| Legenda do card | nome em negrito, cerca de 16 px, 11 px abaixo da foto |
| Página de projeto | ficha lateral de 315 px, 63 px de espaço e 882 px de coluna de fotos |
| Fotos da página de projeto | 16:9, na largura da coluna |
| Frase da abertura da Home | cerca de 34 px, peso leve, entrelinha de cerca de 49 px |
| Botão da abertura | branco, texto preto, 209 × 39 px, cantos levemente arredondados |
| Nome da categoria nas faixas | cerca de 30 px, peso leve, branco |
| Faixas da Home | altura da tela inteira, foto de ponta a ponta |
| Rodapé | preto, coluna de cerca de 1290 px: logo, endereço/telefone, ícones de redes; linha fina; direitos autorais centralizados (cerca de 12 px) |

## 4. Paleta

- **Cores medidas:**
  - preto `#000000` no cabeçalho, no rodapé, nos botões e no submenu;
  - branco `#FFFFFF` no fundo;
  - cinza-claro `#F1F1F1` na caixa do título da página Sobre.
- **Texto corrido:** fino e acinzentado (o traço mais escuro mede cerca de `#30312C`, mas a
  impressão geral é cinza-médio, porque o peso é leve e o tamanho pequeno).
- **Cor:** vem só das fotos. Não há cor de destaque.

## 5. Tipografia

- **Fonte:** uma única família sem serifa, neutra, em peso leve nos títulos e negrito nas legendas e
  rótulos.
- **Caixa:** frases normais, com maiúscula só no começo. A palavra "newsletter" aparece toda em
  minúsculas.
- **Hierarquia:** fotos grandes, depois título leve (cerca de 32 px), depois legendas em negrito
  (16 px) e, por último, texto corrido pequeno (cerca de 13–14 px).
- **Ponto fraco:** o texto corrido é pequeno e claro demais. O contraste e a leitura ficam
  prejudicados.

## 6. Espaçamento e ritmo visual

- **Dois ritmos alternados:**
  - faixas de foto de ponta a ponta, em tela cheia, na Home;
  - conteúdo dentro de uma coluna de 1260 px nas páginas internas.
- **Muito espaço em branco** em volta dos títulos e pouco espaço entre as fotos da grade (22 px).
  As fotos funcionam como um bloco único.
- **Composição dividida ao meio:** nas páginas Sobre e Contato, texto numa metade e foto na outra,
  com a foto indo até a borda da tela.
- **Detalhe:** um traço preto curto e grosso acima do título da newsletter.

## 7. Tratamento das imagens

- Fotos sem borda, sem sombra e sem cantos arredondados.
- Texto sobre foto só na abertura e nas faixas da Home, com um escurecimento leve da foto.
- Projetos em cor; equipe em preto e branco, em retratos padronizados, com fundo de madeira
  escurecida e enquadramento do peito para cima.
- Prêmios com o selo do prêmio por cima da foto.
- Fotos de produto em fundo neutro claro.

## 8. Tom e hierarquia

- **Tom:** sóbrio, institucional e confiante. Pouco texto, com as fotos fazendo o trabalho.
- **Projetos:** os títulos dos projetos são só o nome, sem slogan.
- **Página de projeto:** o texto é dividido por subtítulos descritivos.

## 9. O que serve de direção para a Tehura e o que fica de fora

**Serve como direção (adaptado à identidade da Tehura em `../specs/design.md`):**

- abertura em tela cheia com o cabeçalho transparente por cima;
- faixas de foto de ponta a ponta para dar ritmo à página inicial;
- uma única linha de alinhamento para todos os textos;
- coluna de conteúdo de cerca de 1260 a 1280 px;
- página de projeto com ficha técnica lateral fixa e fotos com texto ao lado;
- composição dividida ao meio nas páginas Escritório e Contato, com a foto até a borda;
- filtros em abas de texto, com sublinhado na aba atual.

**Fica de fora:**

- **Logotipo e identidade:** o logo de barras verticais, o cabeçalho e o rodapé pretos, a fonte e os
  textos.
- **Leitura:** o texto corrido pequeno e de baixo contraste.
- **Itens que a Tehura não terá:**
  - mosaico de alturas variadas (a Tehura usa duas colunas iguais);
  - botão "Carregar mais" e busca (com 6 a 10 projetos, não fazem falta);
  - carrossel da equipe (a equipe da Tehura aparece sem fotos);
  - formulário, newsletter e botão flutuante de WhatsApp;
  - páginas Mídia e Prêmios separadas (os prêmios da Tehura ficam na página Escritório);
  - selos de prêmio sobre as fotos.
