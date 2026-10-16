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

**15/10/2026, identidade visual**

- **Arquivos recebidos:** logo, monograma e fonte, guardados em `identidade/`.
- **Tipografia:** só a fonte Tehura, tudo em maiúsculas, inclusive nos textos longos.
- **Licença da fonte:** a Tehura é do escritório e pode ser publicada no site.
- **Sinais ausentes na fonte:** contornar nos textos (por exemplo, "m2" e "—" no lugar de "·").
- **Cidade:** Mogi das Cruzes (SP).
- **Frase do escritório:** "Arquitetura e interiores".
- **Fundo principal:** bege `#EBE8E1`, a cor da identidade.
- **Logo e monograma:** fazer versões SVG idênticas aos PNG.

**15/10/2026, segunda rodada (contato, escritório e visual)**

- **Botão principal:** "Conte sobre seu projeto".
- **Mensagem pronta do WhatsApp:** "Olá! Vim pelo site e gostaria de conversar sobre um projeto."
- **Redes:** só o Instagram.
- **Região de atuação:** todo o Brasil e o exterior.
- **CAU:** aparece o registro do escritório (pessoa jurídica).
- **Horário:** de segunda a sexta, das 9h às 18h.
- **Processo:** cinco etapas.
  1. Conversa inicial
  2. Estudo preliminar
  3. Anteprojeto
  4. Projeto executivo
  5. Acompanhamento de obra
- **Projetos:** filtro por área.
  - As categorias são Residencial, Interiores, Comercial e Incorporação.
  - Categoria sem projeto não aparece.
- **Visual:**
  - monograma TP no cabeçalho;
  - foto em tela cheia com o logo branco na abertura;
  - grade de duas colunas grandes;
  - movimento sutil.
- **Retrato da Tehura:** em cor.
- **Envio de material:** zip na conversa, com uma pasta por projeto (fotos e ficha técnica em
  texto).
- **Prints da referência:** o escritório vai enviar.

**15/10/2026, prints da referência**

- **Prints guardados** em `referencias/prints-fernanda-marques/`, por decisão do escritório,
  sabendo que o repositório é público.
- Eles continuam fora do site publicado (ver Pendências).

**15/10/2026, aprovação do design**

- **`specs/design.md` aprovado** (versão 4), depois do esboço da página inicial em `esbocos/`.
  Todas as propostas da versão 3 passaram a valer.
- **Escolhas na aprovação:**
  - projetos em destaque em faixas de ponta a ponta;
  - ficha técnica em coluna lateral fixa na página de projeto;
  - títulos em Regular.
- **Ajustes pedidos pelo escritório:**
  - **Fundo do site:** `#F2F0EB`, mais claro. Isso **substitui** a decisão anterior de fundo
    `#EBE8E1`, com confirmação do escritório. O `#EBE8E1` continua como o bege das peças da
    identidade.
  - **Ordem da página inicial:**
    1. Abertura
    2. Faixas de projetos
    3. Apresentação
    4. Tehura
    5. Como trabalhamos
    6. Chamada final
  - **Faixas de projeto:** 85% da altura da tela em todas as larguras, inclusive no celular.

**15/10/2026, aprovação do site.md**

- **`specs/site.md` aprovado** (versão 4).
- **Regras técnicas aprovadas:**
  - responsividade de 360 a 1920 px;
  - nível AA das WCAG 2.2;
  - nota 90 ou mais no Lighthouse;
  - inglês em `en/`;
  - links relativos;
  - menu em tela cheia no celular;
  - galeria ampliada;
  - metadados.
- **Inglês das chamadas:**
  - botão: "Tell us about your project";
  - mensagem do WhatsApp: "Hello! I'm reaching out through the website about a project." (texto
    do escritório).

**15/10/2026, site de teste**

- **Site de teste pedido pelo escritório**, para ir acrescentando o conteúdo depois.
- **Montagem por script** (aprovada): `_ferramentas/gerar.py` gera as páginas a partir de
  `_ferramentas/conteudo.py`.
- **Publicação do teste** (aprovada): no GitHub Pages, branch `gh-pages`, pasta `tehura-pickler/`,
  só com os arquivos do site e marcado para o Google não indexar.
- **Idioma:** o escritório pediu um seletor no canto superior usando o Google Tradutor.
  - Fui avisado de que o pedido contradizia decisões aprovadas.
  - O tradutor de sites do Google está fechado para sites comerciais desde 2019 e, segundo fontes
    de terceiros, saiu de suporte em 01/10/2026.
  - O escritório escolheu **manter o PT | EN feito pelo Claude** (decisão original).

**15/10/2026, conteúdo recebido**

- **Instagram:** @tehurapicklerarquiteta (`https://www.instagram.com/tehurapicklerarquiteta/`).
- **WhatsApp:** +55 11 98939-6948.
  - O escritório mandou o link `api.whatsapp.com/send?1=pt_BR&phone=5511989396948`.
  - O `1=pt_BR` provavelmente era `l=pt_BR`, um parâmetro de idioma.
  - O site usa `https://wa.me/5511989396948?text=…`, o formato oficial curto, que leva a mensagem
    pronta.

**16/10/2026, três alterações pedidas pelo escritório**

Elas substituíram decisões aprovadas, com confirmação do escritório antes de começar.

- **Página Biografia:**
  - trajetória pessoal da Tehura, com formação, início da carreira, marcos e prêmios, visão sobre
    arquitetura e linha do tempo;
  - retrato grande ao lado do texto, e em cima no celular;
  - no menu, logo depois de Escritório (o "Sobre" do pedido).
- **Escritório:**
  - fala só do escritório;
  - o retrato da Tehura foi para a Biografia, e entrou `[PREENCHER: foto do escritório]`.
- **Prêmios:** nos dois lugares. A lista completa fica no Escritório, e os principais entram na
  linha do tempo da Biografia.
- **"Como trabalhamos" removido do site:**
  - a página, o item do menu e a seção da página inicial;
  - as 5 etapas e os textos delas (que eram rascunhos).
  - Serviços e Áreas de atuação foram para o Escritório.
- **Botão de voltar ao início:**
  - canto superior esquerdo de todas as páginas menos a inicial, à esquerda do monograma;
  - **só a seta "←"**, sem o texto "Início" (ajuste do escritório depois de ver os prints);
  - componente único (`voltar_inicio` em `gerar.py`).
- **Sitemap:** `sitemap.xml`, gerado automaticamente.
- **Formato dos marcadores:** `[PREENCHER: o que falta]`.

**16/10/2026, chamada final sem botão**

- **O que saiu:** a pedido do escritório, saíram de todas as páginas a frase "Atendemos em todo o
  Brasil e no exterior" e o botão "Conte sobre seu projeto" da chamada final.
- **O que ficou:** só a frase da chamada final.
- **Onde o WhatsApp continua:**
  - página Contato (botão);
  - menu do celular (botão);
  - rodapé (link).
- **Aviso registrado:** isso substituiu a decisão de ter o botão como o mais visível de cada página.

## Decisões rejeitadas

**15/10/2026**

- **Página única:** trocada por um site com várias páginas.
- **Plataforma editável** (WordPress, Wix, Webflow): trocada por código próprio.
- **Formulário, e-mail e agendamento online como canais de contato:** fica só o WhatsApp.
- **Endereço completo com mapa:** fica só bairro e cidade.
- **Segunda fonte para os textos longos** (sem serifa ou serifada) e pedido de minúsculas ao
  designer: fica só a Tehura, em maiúsculas.
- **"Arquitetura residencial e de interiores"** (frase da amostra da fonte): ampliada para
  "Arquitetura e interiores", para abranger todos os públicos.
- **Fundo branco, fundo carvão e seções alternando bege e carvão:** fica o bege.
- **Botão flutuante de WhatsApp:** o contato fica só nos botões das páginas e no rodapé.
- **Logo completo no cabeçalho:** fica o monograma TP.
- **Grade editorial alternada e grade de três colunas:** ficam duas colunas grandes.
- **Retrato em preto e branco:** fica em cor.
- **Projetos em grade de duas colunas na página inicial:** ficam as faixas.
- **Ficha técnica no topo da página de projeto:** fica a coluna lateral fixa.
- **Títulos em Bold:** ficam em Regular.
- **Fundo `#EBE8E1` no site:** trocado por `#F2F0EB`. A cor continua nas peças da identidade.
- **Faixas com 70% da altura no celular:** ficam 85% em todas as larguras.
- **Mensagem em inglês "Hello! I found you through your website…":** trocada pelo texto do
  escritório.
- **Tradução pelo Google Tradutor, tradutor automático pago (GTranslate) e site só em português:**
  fica o PT | EN feito pelo Claude.
- **Páginas escritas à mão:** fica a montagem por script.
- **Página Como trabalhamos e as 5 etapas** (aprovadas em 15/10/2026): removidas em 16/10/2026 a
  pedido do escritório.
- **Botão com o texto "← Início":** fica só a seta.
- **Chamada final com frase de atuação e botão do WhatsApp:** fica só a frase.

## Alterações realizadas

**15/10/2026**

- Criada a pasta `tehura-pickler/` no repositório `websites`, separada do site da Marina Boreste,
  que fica na raiz.
- Criados `CLAUDE.md`, `specs/site.md`, `specs/design.md`, esta memória e
  `referencias/site-de-referencia.md` (link e páginas conhecidas do site de referência).
- Atualizados `specs/site.md` (versão 1) e `specs/design.md` com as respostas da primeira rodada.
- Recebido o pacote de identidade. Logo e monograma foram para `identidade/logo/`; a fonte Tehura e
  a amostra, para `identidade/fonte/`.
- `specs/design.md` (versão 1) preenchido com a paleta, a tipografia e as regras do logo.
- `specs/site.md` passou para a versão 2.
- Depois da segunda rodada, `specs/site.md` passou para a versão 3 e `specs/design.md` para a
  versão 2.
- **SVG do logo:** o ajuste mostrou que o logo foi composto com a própria fonte Tehura.
  - "TEHURA" está em Bold; "PICKLER" e "ARQUITETURA" estão em Regular, com espaçamento entre
    letras.
  - A diferença para o PNG ficou entre 1% e 4% da área, só na suavização das bordas, e por igual em
    todas as letras.
  - O script do ajuste ficou fora do repositório.
- **SVG prontos** em `identidade/svg/`: logo e monograma, em carvão e em branco.
  - Cada arquivo foi renderizado e comparado com o PNG correspondente.
  - **Logo:** 1,85% de diferença na área, só em pixels soltos nas curvas e diagonais. Pesa 20,7 KB
    (4,6 KB comprimido).
  - **Monograma:** 0,23% de diferença, nenhum pixel acima de 50% de diferença. Pesa 0,5 KB.
- **Prints da referência:** recebidos em 74 arquivos, com 8 páginas inteiras e telas separadas,
  só desktop.
  - Análise com medidas em `referencias/analise-da-referencia.md`.
  - `specs/design.md` passou para a versão 3, com a composição de cada página, aguardando aprovação.
- **Esboço da página inicial:** imagens em `esbocos/` (desktop e celular), com logo, fonte e cores
  reais e fotos e textos provisórios.
  - Ele foi feito fora do repositório só para a aprovação. Não é o código do site.
  - Também está em `esbocos/` a comparação de tons de fundo.
- `specs/design.md` passou para a versão 4, aprovada.
- **Site de teste programado:**
  - **Páginas:** 20 no total, sendo 10 em português e 10 em inglês (`en/`): Início, Escritório,
    Como trabalhamos, Projetos, 4 projetos de exemplo, Contato e 404.
  - **Arquivos:**
    - `estilo.css` e `site.js`;
    - fontes em WOFF2, de 6,5 KB cada;
    - logo em SVG;
    - favicon e imagem de compartilhamento.
  - **Comportamento:**
    - cabeçalho transparente sobre a abertura, que vira bege ao rolar;
    - menu do celular em tela cheia;
    - filtro por área, com link direto (por exemplo, `projetos.html#comercial`);
    - galeria ampliada com setas, Esc e deslizar do dedo;
    - entrada suave das seções, desligada para quem prefere menos movimento.
  - **Conferências:**
    - nenhuma rolagem lateral nem erro no console em 360, 390, 768, 1024, 1280, 1440 e 1920 px;
    - nenhuma violação de acessibilidade no axe-core (WCAG 2.2 A/AA e boas práticas), no
      celular e no desktop;
    - nenhum sinal fora da fonte.
- **16/10/2026, as três alterações:**
  - entrou `biografia.html` (PT e EN);
  - saiu `como-trabalhamos.html` (PT e EN);
  - o gerador agora apaga sozinho as páginas que deixam de existir;
  - entrou `sitemap.xml`;
  - saíram do CSS os estilos das etapas (`.etapas-resumo`, `.etapa*`, `.etapas`);
  - `.duas-listas` ficou, porque Serviços e Áreas agora a usam no Escritório;
  - `.rascunho` ficou sem uso no momento, mas pertence ao mecanismo de rascunho do gerador, que
    continua ativo.

## Problemas encontrados

**15/10/2026**

- **Print da referência:** a pasta `referencias/` não existia. Resolvido: o escritório enviou os
  prints, que estão em `referencias/prints-fernanda-marques/`.
- **Rede bloqueada:** a rede do ambiente na nuvem bloqueia `fernandamarques.com.br`. O site de
  referência não pôde ser aberto nem fotografado daqui. Continuou bloqueado mesmo depois de o
  escritório pedir de novo para usar o site. Talvez a liberação só valha numa sessão nova.
- **Fonte só em maiúsculas:** a Tehura não tem minúsculas, e as letras minúsculas são desenhadas como
  maiúsculas.
- **Sinais ausentes na fonte:** `²` `%` `·` `#` `©` `*` `$` `_` `|` `[ ]` `< >`, aspas curvas,
  `…`, `º` `ª` `ü` `è` `ñ`. O `©` e o `#` apareceram como quadradinhos no esboço e na comparação de
  tons, e foram contornados.
- **Sem informação pública:** não há nada sobre Tehura Pickler ou o escritório nos resultados de
  busca. Todo o conteúdo depende do material enviado pelo escritório.
- **Risco de publicação:** o GitHub Pages deste repositório publica a branch `gh-pages` com Jekyll,
  que transforma arquivos `.md` em páginas públicas. Se `tehura-pickler/` for publicada como está,
  os documentos internos e o print da referência ficam visíveis no site.
- **Domínio próprio:** o GitHub Pages liga um domínio ao repositório inteiro, não a uma pasta. A
  raiz deste repositório é o site da Marina Boreste. Para o domínio do TEHURA PICKLER apontar para
  este site, o projeto precisará de um repositório próprio ou de outra hospedagem estática.

- **Halo nos PNG:** os PNG da identidade têm um halo quase invisível (alfa 1/255) em volta das
  formas. Medir as bordas pelo primeiro pixel com alfa > 0 aumentava as formas em cerca de 2 px.
- **Arco do SVG:** um semicírculo escrito como um único arco fica ambíguo quando o arredondamento
  deixa a corda menor que o diâmetro. Nesse caso o SVG desenha o arco menor, e a curva se desloca.

- **Testes do site:**
  - **Nome repetido:** a abertura da página inicial e a seção da Tehura tinham o mesmo nome para
    leitores de tela ("TEHURA PICKLER" e "Tehura Pickler").
  - **Menu do celular:** os botões PT e EN herdavam o estilo grande dos links.
  - **Galeria no celular:** a etiqueta "Foto de projeto" vazava nas fotos pequenas.
  - **Contagem do filtro:** dizia "1 projetos".

  Os quatro foram corrigidos.
- **Logo do rodapé:** carrega só quando a pessoa rola até ele (`loading="lazy"`). Em capturas de
  página inteira ele pode não aparecer, mas não é defeito.

## Soluções aplicadas

**15/10/2026**

- A estrutura do site de referência (menu, categorias e páginas de projeto) foi levantada por
  resultados de busca. Ela fica em `specs/design.md` como observação preliminar, a confirmar com o
  print.
- O link do site de referência foi registrado em `referencias/site-de-referencia.md`, a pedido do
  escritório.
- **Links relativos** (aprovado): todos os links internos são relativos, para o site funcionar no
  endereço do GitHub e depois no domínio próprio sem mudanças.
- **Maiúsculas:** os textos são escritos em caixa normal no HTML, e a fonte mostra tudo em
  maiúsculas. Assim leitores de tela, buscadores e copiar e colar recebem o texto normal.
- **Sinais ausentes:** evitados na redação. Se algum aparecer, entra uma fonte de reserva só nele.
- **Bordas:** medidas pelo pixel parcial colado no primeiro pixel cheio. A caixa de cada SVG sai da
  geometria, não do PNG.
- **Arcos:** cada semicírculo do monograma é desenhado como dois quartos de círculo.
- **Contraste:** cores medidas na identidade.
  - Carvão sobre bege: 13,8:1.
  - Texto secundário proposto (`#66635C`): 4,9:1, acima do mínimo de 4,5:1.

## Pendências

- **Materiais do escritório:**
  - bairro;
  - número do CAU do escritório;
  - história, ano de fundação e proposta de valor;
  - formação, biografia e retrato em cor da Tehura;
  - nomes e cargos da equipe;
  - de 6 a 10 projetos, num zip com uma pasta por projeto (nome, categoria, cidade, ano, área,
    texto, fotos e fotógrafo);
  - lista de prêmios e mostras.
- **Biografia:** formação, início da carreira, marcos e prêmios, visão sobre arquitetura, marcos da
  linha do tempo e retrato.
- **Foto do escritório:** para a página Escritório.
- **Aprovação de texto:** o inglês das páginas (menus e rótulos), traduzido pelo Claude, aguardando
  revisão do escritório.
- **Foto da página Contato:** a definir.
- **Projetos de exemplo:** os 4 do site de teste serão trocados pelos reais quando o zip chegar.
- **Antes do lançamento:**
  - mudar `SITE['teste']` para `False`;
  - remover os projetos de exemplo e completar todos os `[PREENCHER]`.
- **Domínio:** quando ele for registrado, decidir entre um repositório próprio e outra hospedagem.
- **Antes da primeira publicação:** impedir que `CLAUDE.md`, `specs/`, `memoria.md`,
  `referencias/`, `esbocos/` e os originais de `identidade/` sejam publicados. Só os arquivos otimizados (SVG e
  WOFF2) vão para o site.

## Próximos passos

1. O escritório revisa o site de teste e aprova o inglês.
2. Receber o zip dos projetos e as informações que faltam e substituir os `[PREENCHER]` em
   `_ferramentas/conteudo.py`.
3. Otimizar as fotos reais (AVIF, WebP e JPEG em vários tamanhos) quando chegarem.
4. Lançamento: `SITE['teste'] = False`, nova rodada de testes e publicação.
