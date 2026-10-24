# Embarcações à venda, site novo

Outra versão da página Embarcações à venda, num site próprio (`embarcacoes-novo/`, um único `index.html`).
Tem identidade visual própria (papel, a água escura do Rio Una e o laranja das boias, em Schibsted Grotesk)
e usa o logotipo, os textos, as fotos e o vídeo do site da Marina Boreste. Lê o
mesmo `dados/barcos.js`: um barco cadastrado lá aparece aqui também.

- A foto do anúncio cresce até virar a foto da página do barco (View Transitions; sem a animação nos
  navegadores que não a têm ou com "menos movimento").
- Ao abrir, a prancha com o vídeo dos barcos sobe da base uma vez.
- No celular, a página do barco tem uma barra fixa embaixo com o preço e o WhatsApp.

Para mudar algo: edite `src/`, rode `pnpm install` (uma vez) e `./monta.sh`. Esta pasta começa com `_` e não vai para o ar.
