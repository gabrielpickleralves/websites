#!/bin/bash
# Empacota o site novo de Embarcações à venda em um único HTML e copia para a pasta publicada.
# Uso, na pasta _fontes/embarcacoes-novo:  pnpm install  (uma vez)  e depois  ./monta.sh
set -e
cd "$(dirname "$0")"
pnpm exec parcel build index.html --dist-dir dist --no-source-maps --log-level error
pnpm exec html-inline dist/index.html > bundle.html
cp bundle.html ../../embarcacoes-novo/index.html
echo "ok: embarcacoes-novo/index.html ($(du -h bundle.html | cut -f1))"
