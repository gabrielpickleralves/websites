# Marina Boreste, site novo 2

Outra interface para o mesmo site: as cores, os logotipos, as fotos, os vídeos e os textos são os do site
atual; mudam o layout, os tipos e as interações. Publicado em `marina-boreste-site-novo-2/` (um único
`index.html`), com as fotos, os vídeos e `dados/barcos.js` lidos da pasta do site atual (`../`).

Feito com React, TypeScript, Tailwind e Radix (o kit web-artifacts-builder), empacotado com Parcel
em um HTML só. Esta pasta começa com `_` e por isso não vai para o ar.

- `src/dados-gerados.ts`: serviços, infraestrutura e fotos, copiados do `index.html` atual.
- `src/conteudo.ts`: endereços, telefones, links e coordenadas.
- `src/partes/`: abertura (Carta), seções da página inicial, contato e rodapé, Biografia e Embarcações à venda.
- As embarcações à venda vêm do mesmo `dados/barcos.js` do site atual: um barco novo lá aparece aqui também.

Para mudar algo: edite `src/`, rode `pnpm install` (uma vez) e `./monta.sh`.
