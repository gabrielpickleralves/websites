# TEHURA PICKLER · site do escritório

Site premium do escritório de arquitetura TEHURA PICKLER, liderado pela arquiteta Tehura Pickler.
Objetivo: apresentar o escritório, a arquiteta, a equipe, a forma de trabalhar, os serviços e os
projetos, e gerar contatos de novos clientes.

Esta pasta (`tehura-pickler/`) fica dentro do repositório `websites`, que guarda na raiz o site da
Marina Boreste. Só o que está dentro desta pasta pertence a este projeto: não altere nada fora dela
sem autorização.

## Fontes de verdade

- O que construir: @specs/site.md
- Como deve parecer: @specs/design.md
- Decisões, problemas e pendências: @memoria.md
- Identidade visual do escritório: `identidade/` (logo, monograma e fonte Tehura; não alterar)
- Materiais de referência: `referencias/` (print completo e link do site de referência)

## Regras

- Se algum pedido meu contradisser uma decisão registrada em @specs/site.md, @specs/design.md ou
  @memoria.md, pare e me avise antes de realizar qualquer alteração. Explique qual decisão seria
  afetada e pergunte se desejo substituí-la.
- Não altere a stack técnica sem minha autorização.
- Não remova uma decisão aprovada silenciosamente.
- Não invente informações sobre o escritório, a arquiteta, a equipe, os projetos, os clientes, os
  prêmios ou os registros profissionais. O que faltar fica como `[PREENCHER]` no site e entra nas
  pendências de @memoria.md.
- Sempre preserve a consistência visual e estrutural entre as seções.
- Antes de uma mudança grande, apresente um plano resumido.
- Depois de uma decisão importante aprovada, atualize @memoria.md.
- O site de referência é só direção de estrutura e atmosfera. Não copie textos, logotipo, nome,
  identidade, imagens, elementos exclusivos da marca nem layouts idênticos.
- Escreva em português do Brasil: conversa, documentação, textos do site e mensagens de commit.

## Fase atual

Site de teste no ar, com o conteúdo que falta marcado como `[PREENCHER]`. @specs/site.md e
@specs/design.md estão aprovados (versão 4 de cada).

## Como mexer no site

1. **Textos, projetos e dados:** edite `_ferramentas/conteudo.py`. Não edite os `.html`: eles são
   gerados.
2. **Estilo e comportamento:** edite `estilo.css` e `site.js` direto.
3. **Gerar as páginas:** rode `python3 _ferramentas/gerar.py` dentro de `tehura-pickler/`. O script
   avisa sobre sinais que a fonte não tem e lista os `[PREENCHER]` que faltam.
4. **Identidade:** se mudar, rode `python3 _ferramentas/recursos.py`.
5. **Publicar:** no branch `gh-pages`, publique só os arquivos de `_ferramentas/arquivos-publicos.txt`.
   Nunca publique os documentos, as referências ou os originais da identidade.
