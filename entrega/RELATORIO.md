# Marina Boreste: relatório da revisão

Branch `claude/marina-boreste-polish-5vsqjo`. O site original está preservado em `index-antes.html`, idêntico ao arquivo recebido.

## Resumo

| | Desempenho | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| **Antes**, celular | 55 | 96 | 96–100¹ | 100 |
| **Depois**, celular (mediana de 3 execuções) | **98** (96–99) | **100** | **100** | **100** |
| Depois, celular, servidor sem compressão | 96 | 100 | 100 | 100 |
| Antes, desktop | 65 | 96 | 100 | 100 |
| Depois, desktop | 99 | 100 | 100 | 100 |

¹ No primeiro teste deu 96, por causa do erro 404 do `favicon.ico` no console.

- **Primeira pintura no celular:** de 17,6 s para 0,8 s. **Maior conteúdo (LCP):** de 17,6 s para 1,7 s. **Peso total:** de 3,0 MB para 554 KB, com vídeo.
- **axe-core 4.14:** 0 violações em 360, 768, 1440 e 1920 px, com e sem "reduzir movimento". O original tinha 1 violação (alvos de toque com 16 px na faixa de informações).
- **Validador do W3C (Nu HTML Checker):** nenhum erro nem aviso. **html-validate:** sem erros.
- **Teclado:** percorri a página inteira com Tab em 6 configurações (73 a 77 paradas). Nenhum foco ficou escondido, sem contorno ou com alvo menor que 24 px.
- **Refluxo:** nada vaza da tela a 320 px nem com zoom de 200% (1280 × 800). Nenhuma palavra fica partida entre linhas de 320 a 1920 px.
- **Textos:** comparei o texto visível do antes e do depois por script. Nenhum texto, telefone, endereço, horário ou serviço mudou. Só entraram rótulos de interface: "Pausar", "Todos os campos são obrigatórios." e "Foto 1 de 12".

Os relatórios completos estão em `entrega/lighthouse/` (HTML do Lighthouse) e `entrega/axe-resultado.txt`.

## O que mudou

### 0. Estrutura
- O `index.html` recebido tinha 4,4 MB, com logotipo, 21 fotos e o vídeo em base64. Separei tudo em `imagens/` e `video/` com nomes descritivos. A captura de página inteira ficou idêntica, pixel a pixel.
- Continua sendo uma página só, com HTML, CSS e JS no mesmo arquivo, sem framework e sem build. A página agora precisa das pastas `imagens/` e `video/` ao lado dela.

### 1. Logotipo
- **Não havia pasta `originais/`**, então vetorizei o PNG de 470 × 182 (comparação lado a lado em `entrega/comparacao-logo.png`):
  - **Crescente:** é a diferença entre dois círculos, que ajustei ao contorno do original com erro médio de 0,1 px. O degradê horizontal #00AEE5 → #0075C2 foi medido nos pixels.
  - **"Boreste" e "MARINA":** o desenho é Times. Usei os glifos da FreeSerif (desenho Times, licença livre) e posicionei e dimensionei cada letra sobre a letra do original. O degradê vertical #636363 → #131313 e a sombra suave também foram medidos no original.
  - **Barco:** reconstruí cada traço pela linha central do original, com a espessura medida e o afinamento nas pontas.
- **Versões:** `imagens/logo-marina-boreste.svg` (fundo claro) e `imagens/logo-marina-boreste-negativo.svg` (fundo escuro, letras brancas). O PNG original continua em `imagens/`.
- **Onde aparece:**
  - **Topo, sem a pílula branca:** grande sobre o vídeo e menor numa barra clara depois da primeira tela.
  - Cortina de abertura, menu, rodapé e junto da citação "Missão" em Nossa história.
  - Favicon (SVG e ICO), ícone da Apple, ícones do manifesto e imagem de compartilhamento (1200 × 630).
- Nunca distorcido nem recortado. Os ícones usam o logotipo inteiro, centrado.

### 2. Imagens e vídeo
- **Fotos:** cada uma ganhou versões AVIF e WebP nas larguras do layout, com `<picture>`, `srcset`, `sizes`, `width` e `height`. Ficaram de 40% a 60% menores que os JPEG. `loading="lazy"` fora da primeira tela; a capa do vídeo tem `fetchpriority="high"` e pré-carregamento.
- **Nada foi ampliado além do tamanho original.** A foto de abastecimento (462 × 300) agora aparece no tamanho dela, no alto do cartão, em vez de esticada para cobrir o cartão todo.
- **Vídeo:**
  - WebM de 362 KB e MP4 leve de 371 KB, contra 605 KB do original, sem perda visível (SSIM 0,985).
  - Capa em AVIF de 18 KB.
  - Só carrega depois da página pronta e não carrega com "reduzir movimento", com o modo de economia de dados ou depois de o visitante pausar.

### 3. Interatividade
- Estados de hover, foco e clique em botões, links, cartões, fotos e redes sociais.
- **Menu:** marca a seção atual (ponto azul + `aria-current`). Prende o foco, fecha com Esc e devolve o foco ao botão "Menu". Ao escolher uma seção, a página rola até ela e o foco vai para o título dela.
- **Botão fixo de WhatsApp** e **botão de voltar ao topo**. Os dois aparecem depois da primeira tela e nunca cobrem o elemento focado.
- **Fotos que ampliam:** 12 fotos abrem em tela cheia com contador ("Foto 3 de 12"), setas, teclado (← → Esc), gesto de arrastar e legenda. O foco volta para a foto que foi aberta.
- **Formulário:** valida ao enviar e ao sair de cada campo. O erro aparece em texto, com ícone e borda grossa (não depende só de cor), ligado ao campo por `aria-describedby` e `aria-invalid`. Há um aviso geral ("falta corrigir 2 campos") e o foco vai ao primeiro campo com erro.
- **Ideias extras que implementei:**
  - Botão **Pausar/Retomar** para vídeo, faixa que corre e ondas, lembrando a escolha.
  - "Copiar coordenadas" com aviso falado e volta ao texto original depois de 4 s.
  - Esc fecha o detalhe de um cartão de serviço.
  - Setas dos serviços desativadas nas pontas.

### 4. Acessibilidade (WCAG 2.2 AA)
- **Contraste:**
  - As palavras que "acendem" na abertura começavam com 18% de opacidade (1,4:1). Agora começam em 66% (4,8:1) e mantêm o efeito.
  - O degradê atrás do texto do topo foi reforçado, para dar 4,5:1 mesmo no trecho claro do vídeo.
  - Foco em #0A6A9E sobre fundo claro (5,3:1) e #7FCBEE sobre fundo escuro (8,4:1).
- **Foco:**
  - Sempre visível e nunca escondido atrás do topo fixo, das lâminas empilhadas ou dos botões flutuantes.
  - O mapa, que é de outro domínio, também ganha contorno.
  - O link "Pular para o conteúdo" leva o foco ao `<main>`.
- **Serviços presos na rolagem:**
  - O cartão que recebe o Tab vai para o centro do arco.
  - Cada botão "+" controla o detalhe (`aria-controls`, `aria-expanded`). O detalhe é rolável pelo teclado e fecha com Esc.
  - Leitores de tela leem os 9 cartões e os detalhes abertos.
- **Movimento:** com "reduzir movimento", o site abre parado, como antes. O botão de pausa cobre tudo que se move por mais de 5 s.
- **Alvos de toque:** 44 a 56 px nos botões e 24 px ou mais em todos os links de texto.
- **Estrutura:**
  - Um `h1`, `h2` por seção, `h3` e `h4` em ordem. O rodapé passou a usar `h2`.
  - Landmarks: topo, navegação, `main`, rodapé e atalhos. `lang="pt-BR"`.
  - Textos alternativos revisados. As fotos ampliáveis têm "Ampliar foto: …" e o vídeo decorativo fica oculto para leitores de tela.

### 5. Interface
- Topo, botões e redes com altura e cantos consistentes (48 px).
- Campos do formulário com peso de texto normal; antes herdavam o negrito do rótulo. A lista de assuntos ganhou seta própria.
- Cartões de serviço: títulos sem quebra estranha.
- Contatos empilhados abaixo de 420 px, para o e-mail não quebrar no meio.
- Rodapé em duas colunas no tablet.
- Revisado em 320, 360, 768, 1440, 1920 e 2560 px. O título "Navegue tranquilo" ocupa a largura certa em todas.

### 6. Links e acabamento
- **52 links conferidos por script:**
  - 16 âncoras, todas com destino.
  - Telefones e WhatsApp batem com o texto.
  - Todos os externos com `rel="noopener"`, seta ↗ visível e "(abre em nova aba)" no nome acessível.
  - Links só com ícone têm nome ("Facebook da Pousada Una").
- **Cabeçalho da página:** título e descrição, Open Graph, `theme-color`, ícones, `site.webmanifest` e dados estruturados `LocalBusiness`. Os dados estruturados usam só o que está na página: endereço, telefones, e-mail, horário, coordenadas, mapa e Instagram.
- **Fonte:** a Archivo continua vindo do Google Fonts, mas sem bloquear a primeira pintura. O texto do topo só aparece com ela carregada, para não "pular" de tamanho.

## Capturas (`entrega/capturas/`)
- `celular-primeira-tela-antes-depois.jpg` e `desktop-primeira-tela-antes-depois.jpg`
- `celular-360-pagina-inteira-antes.jpg` e `-depois.jpg`; `desktop-1440-pagina-inteira-antes.jpg` e `-depois.jpg`. Foram feitas com "reduzir movimento", para tudo aparecer parado.
- `tablet-768-primeira-tela-depois.jpg` e `desktop-1920-primeira-tela-depois.jpg`
- `interacoes-desktop.jpg` (serviços, menu, foto ampliada, erros do formulário) e `interacoes-celular.jpg`

## O que não consegui confirmar ou depende de você

1. **Aprovação do logotipo vetorizado** (`entrega/comparacao-logo.png`). Se existir a arte original (AI, PDF, EPS ou SVG), vale trocar por ela. As letras foram refeitas com o desenho Times; confira com a arte, se houver.
2. **Favicon:** com o logotipo inteiro, a 16 a 32 px ele fica minúsculo. Usar só o símbolo (crescente + barco) leria melhor, mas é um recorte da marca, então não fiz sem a sua autorização.
3. **Pontos que você vai confirmar, mantidos como estavam:** número 215, CEP 11624-179, horário das 8h às 17h, "Área do Cliente" (só texto, sem link) e o WhatsApp da Pousada Una (`https://pousadauna.com.br/whatsapp`).
4. **Links externos que não pude abrir.** A rede deste ambiente bloqueia esses endereços, então estão como estavam:
   - Instagram `@marinaboreste` e `@pousadauna`
   - Facebook `facebook.com/pousadauna`
   - `pousadauna.com.br`
   - Os dois `place_id` do Google Maps (Marina `ChIJS2xwpZCIzZQRFnlkunPgOQ8` e Pousada `ChIJ14_vbpqIzZQRNGed2SGEBd8`)
   - O mapa incorporado (`maps.google.com/maps?…&output=embed`). Não vi o mapa renderizar aqui.

   Numa busca pública, as páginas da Pousada Una no [Expedia](https://www.expedia.com/es/Sao-Sebastiao-Hoteles-Pousada-Una.h109070246.Informacion-Hotel), no [Hotels.com](https://hotels.com/ho3491247872/pousada-una) e no [Trip.com](https://nz.trip.com/hotels/barra-do-una-hotel-detail-10857902/pousada-una) confirmam o endereço (Rua Petrópolis, 80, CEP 11624-179) e o telefone (12) 3867-1515. Não encontrei fonte pública com os dados da marina nem com os perfis de redes sociais.
5. **Endereço definitivo do site.** `og:image` e os dados estruturados usam caminhos relativos. Quando o domínio estiver confirmado, troque por URLs absolutas e acrescente `<link rel="canonical">` e `og:url`. Não inventei o domínio.
6. **Fotos e vídeo em maior resolução.** Para telas grandes, as fotos de 680 px e o vídeo vertical de 720 × 1280 continuam limitados. No desktop, o vídeo aparece ampliado cerca de 2,7×. Um vídeo horizontal e as fotos originais da câmera resolveriam.
7. **Servidor:** os números de desempenho supõem compressão gzip ou brotli, que Netlify, Vercel, GitHub Pages e a maioria das hospedagens fazem sozinhos. Sem compressão, o desempenho no celular fica em 96. Vale também configurar cache longo para `imagens/` e `video/`.
8. **Fonte local (opcional):** hospedar a Archivo junto do site em vez do Google Fonts melhora desempenho e privacidade (LGPD). Não fiz porque você descreveu o uso do Google Fonts.
9. **Para revisar com o cliente** (não alterei): o assunto "Benefício Pousada do Una" usa "Pousada do Una", enquanto o resto do site diz "Pousada Una".
