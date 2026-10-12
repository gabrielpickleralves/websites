#!/usr/bin/env python3
"""
Monta as páginas internas do site (biografia.html e compra-e-venda.html) a partir de index.html.

O topo, o Menu, o rodapé, o estilo e o script comum vêm sempre de index.html. O conteúdo de cada
página fica no próprio arquivo dela e é preservado:
  - entre <!--PAGINA-INICIO--> e <!--PAGINA-FIM-->: o <main> da página;
  - entre <!--SCRIPTS-PAGINA-INICIO--> e <!--SCRIPTS-PAGINA-FIM-->: os scripts só dela.

Depois de mudar o topo, o Menu, o rodapé, o estilo ou o script em index.html, rode na raiz do site:
    python3 _ferramentas/paginas.py
Para criar uma página nova, acrescente-a em PAGINAS e crie o arquivo só com os dois trechos acima.

(A pasta _ferramentas começa com "_" e por isso não é publicada pelo GitHub Pages.)
"""
import os, re, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'https://gabrielpickleralves.github.io/websites/'      # mesma URL base de index.html

PAGINAS = {
    'biografia.html': {
        'titulo': 'Biografia | Marina Boreste',
        'descricao': 'Missão: Proporcionar infraestrutura e serviços ideais para a guarda, manutenção, compra e venda de embarcações, sempre em harmonia com o meio ambiente, para que os clientes possam desfrutar da natureza e dos prazeres da atividade náutica.',
    },
    'compra-e-venda.html': {
        'titulo': 'Compra e venda de barcos | Marina Boreste',
        'descricao': 'A Marina Boreste intermedia a compra e a venda de embarcações. Os preços são negociáveis, e todo o atendimento é feito pelo WhatsApp.',
    },
}
SECOES_DO_INICIO = 'servicos|infraestrutura|pousada|localizacao|contato'


def le(nome):
    with open(os.path.join(RAIZ, nome), encoding='utf-8') as f:
        return f.read()


def entre(txt, a, b, incluir=True):
    i = txt.index(a)
    j = txt.index(b, i)
    return txt[i:j + len(b)] if incluir else txt[i + len(a):j]


def partes_comuns(idx):
    fontes = entre(idx, '<link rel="preconnect" href="https://fonts.googleapis.com">', '</noscript>')
    fontes = re.sub(r'<link rel="preload" as="image"[^>]*>\n', '', fontes)   # a capa do vídeo só existe no início
    return {
        'fontes': fontes,
        'estilo': entre(idx, '<style>\n/*CSS-INICIO*/', '</style>'),
        'script': entre(idx, '<script>\n/*JS-INICIO*/', '</script>'),
        'cortina': entre(idx, '<div class="cortina"', '<a class="pula" href="#conteudo">Pular para o conteúdo</a>'),
        'topo': entre(idx, '<header class="topo">', '</header>'),
        'rodape': entre(idx, '<!-- ================= RODAPÉ ================= -->', '</footer>'),
        'atalhos': entre(idx, '<aside class="atalhos"', '</aside>'),
    }


def ajusta_links(html, atual):
    """links de seção levam à página inicial; o link da página atual ganha aria-current"""
    html = html.replace('href="#inicio"', 'href="index.html"')
    html = re.sub(r'href="#(%s)"' % SECOES_DO_INICIO, r'href="index.html#\1"', html)
    html = re.sub(r'(<a\b[^>]*\bhref="%s")' % re.escape(atual), r'\1 aria-current="page"', html)
    return html


def conteudo(nome):
    """o <main> e os scripts próprios de uma página já existente"""
    txt = le(nome)
    if '<!--PAGINA-INICIO-->' in txt:
        pagina = entre(txt, '<!--PAGINA-INICIO-->', '<!--PAGINA-FIM-->', False).strip('\n')
    else:                                                       # primeira vez: o <main> inteiro
        pagina = entre(txt, '<main', '</main>')
    scripts = ''
    if '<!--SCRIPTS-PAGINA-INICIO-->' in txt:
        scripts = entre(txt, '<!--SCRIPTS-PAGINA-INICIO-->', '<!--SCRIPTS-PAGINA-FIM-->', False).strip('\n')
    return pagina, scripts


def monta(nome, dados, comum):
    pagina, scripts = conteudo(nome)
    topo = ajusta_links(comum['topo'], nome).replace('<header class="topo">', '<header class="topo" data-solido>', 1)
    rodape = ajusta_links(comum['rodape'], nome)
    rodape = rodape.replace('<a class="rodape-topo" href="index.html">', '<a class="rodape-topo" href="#conteudo">')
    assert '#inicio' not in topo + rodape and 'index.html#servicos' in topo and 'aria-current="page"' in topo, nome
    url = BASE + nome
    return f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{dados['titulo']}</title>
<meta name="description" content="{dados['descricao']}">
<meta name="theme-color" content="#0F2A33">
<meta name="color-scheme" content="light">
<meta name="format-detection" content="telephone=no">
<link rel="icon" href="favicon.ico" sizes="48x48">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<!-- URL base (a mesma de index.html): para trocar de domínio, substitua-a nestas 3 linhas -->
<link rel="canonical" href="{url}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{BASE}imagens/marina-boreste-compartilhamento.jpg">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Marina Boreste">
<meta property="og:title" content="{dados['titulo']}">
<meta property="og:description" content="{dados['descricao']}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Logotipo da Marina Boreste sobre a foto do píer, com lanchas atracadas no Rio Una">
<meta name="twitter:card" content="summary_large_image">
{comum['fontes']}
<!-- Topo, Menu, rodapé, estilo e script vêm de index.html: mude lá e rode _ferramentas/paginas.py -->
{comum['estilo']}
</head>
<body>
<!--SITE-INICIO-->
<div class="site" data-site>
{comum['cortina']}

{topo}

<!--PAGINA-INICIO-->
{pagina}
<!--PAGINA-FIM-->

{rodape}

{comum['atalhos']}
</div>
<!--SITE-FIM-->

<!--SCRIPTS-PAGINA-INICIO-->
{scripts}
<!--SCRIPTS-PAGINA-FIM-->

{comum['script']}
</body>
</html>
'''


def main():
    comum = partes_comuns(le('index.html'))
    nomes = sys.argv[1:] or list(PAGINAS)
    for nome in nomes:
        html = monta(nome, PAGINAS[nome], comum)
        with open(os.path.join(RAIZ, nome), 'w', encoding='utf-8') as f:
            f.write(html)
        print('ok', nome, len(html))


if __name__ == '__main__':
    main()
