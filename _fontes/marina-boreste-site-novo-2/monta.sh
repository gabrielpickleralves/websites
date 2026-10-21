#!/bin/bash
# Empacota o site novo 2 em um único HTML e copia para a pasta publicada.
# Uso, na pasta _fontes/marina-boreste-site-novo-2:  pnpm install  (uma vez)  e depois  ./monta.sh
set -e
cd "$(dirname "$0")"
pnpm exec parcel build index.html --dist-dir dist --no-source-maps --log-level error
pnpm exec html-inline dist/index.html > bundle.html
cp bundle.html ../../marina-boreste-site-novo-2/index.html
echo "ok: marina-boreste-site-novo-2/index.html ($(du -h bundle.html | cut -f1))"
