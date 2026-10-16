"""
Monta as páginas do site TEHURA PICKLER a partir de _ferramentas/conteudo.py.

    python3 _ferramentas/gerar.py

O site publicado continua sendo HTML, CSS e JavaScript puros: este script só escreve os arquivos .html
(português na raiz, inglês em en/) para que cabeçalho, rodapé e páginas de projeto fiquem sempre iguais.
O estilo está em estilo.css e o comportamento em site.js; edite-os direto.

Ao final, o script:
  - confere se algum texto usa um sinal que a fonte Tehura não tem;
  - lista os [PREENCHER] e os rascunhos que ainda faltam;
  - grava em _ferramentas/arquivos-publicos.txt a lista do que vai para o site publicado.
(A pasta _ferramentas começa com "_" e por isso não é publicada pelo GitHub Pages.)
"""
import html, json, os, re, sys
from html.parser import HTMLParser
from urllib.parse import quote

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import conteudo as C                                                           # noqa: E402
from conteudo import PREENCHER, RASCUNHO                                       # noqa: E402

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
S, UI = C.SITE, C.UI
LINGUAS = ('pt', 'en')
HTML_LANG = {'pt': 'pt-BR', 'en': 'en'}
OG_LOCALE = {'pt': 'pt_BR', 'en': 'en_US'}
CATEGORIA = {k: v for k, v in C.CATEGORIAS}
LOGO_W, LOGO_H = 1902, 919

pendencias = {'preencher': set(), 'rascunho': set()}

# ------------------------------------------------------------------ texto


def tr(valor, lg):
    """escolhe a língua de um t(pt, en); outros valores passam direto"""
    return valor[lg] if isinstance(valor, dict) and set(valor) == {'pt', 'en'} else valor


def x(valor, lg='pt'):
    """texto pronto para o HTML; [PREENCHER] e rascunhos ganham marcação no site de teste"""
    valor = tr(valor, lg)
    if valor is None:
        return ''
    if isinstance(valor, PREENCHER):
        pendencias['preencher'].add(str(valor) if lg == 'pt' else '')
        if not S['teste']:
            sys.exit(f'Falta conteúdo: [PREENCHER] {valor}. Complete conteudo.py antes de publicar.')
        return f'<span class="preencher">[PREENCHER] {html.escape(valor)}</span>'
    if isinstance(valor, RASCUNHO):
        pendencias['rascunho'].add(str(valor)[:60] if lg == 'pt' else '')
        if S['teste']:
            return f'<span class="rascunho">{html.escape(valor)}</span>'
    return html.escape(str(valor))


def simples(valor, lg='pt'):
    """texto sem marcação (para title, alt e meta)"""
    valor = tr(valor, lg)
    if isinstance(valor, PREENCHER):
        return f'[PREENCHER] {valor}' if S['teste'] else ''
    return '' if valor is None else str(valor)


def paragrafos(lista, lg, classe=''):
    c = f' class="{classe}"' if classe else ''
    return '\n'.join(f'<p{c}>{x(p, lg)}</p>' for p in tr(lista, lg))


def local(p, lg):
    cidade = x(p['cidade'], lg) + (f', {x(p["uf"], lg)}' if p.get('uf') else '')
    return f'{cidade} — {x(p["ano"], lg)}'


# ------------------------------------------------------------------ endereços


def arquivo(chave, lg):
    return chave if lg == 'pt' else f'en/{chave}'


def rel(de, para):
    """link relativo entre dois arquivos do site (aprovado: links internos sempre relativos)"""
    return os.path.relpath(para, os.path.dirname(de) or '.').replace(os.sep, '/')


def absoluto(caminho):
    return S['url_base'] + ('' if caminho == 'index.html' else caminho)


def whatsapp(lg):
    return f'https://wa.me/{S["whatsapp"]}?text={quote(tr(S["whatsapp_mensagem"], lg))}'


INSTAGRAM = f'https://www.instagram.com/{S["instagram"]}/'


def botao_whatsapp(lg, classe='botao'):
    return (f'<a class="{classe}" href="{whatsapp(lg)}" target="_blank" rel="noopener">'
            f'{x(UI["cta"], lg)}<span class="visualmente-oculto"> ({x(UI["abre_whatsapp"], lg)})</span></a>')


# ------------------------------------------------------------------ pedaços comuns

MONOGRAMA = open(os.path.join(RAIZ, 'identidade', 'svg', 'monograma-tp.svg'), encoding='utf-8').read()
MONO_VB = re.search(r'viewBox="([^"]+)"', MONOGRAMA).group(1)
MONO_D = re.search(r' d="([^"]+)"', MONOGRAMA).group(1)


def monograma(classe):
    return (f'<svg class="{classe}" viewBox="{MONO_VB}" aria-hidden="true" focusable="false">'
            f'<path fill="currentColor" d="{MONO_D}"/></svg>')


MENU = ('escritorio.html', 'como-trabalhamos.html', 'projetos.html', 'contato.html')
MENU_ROTULO = {'escritorio.html': 'escritorio', 'como-trabalhamos.html': 'como_trabalhamos',
               'projetos.html': 'projetos', 'contato.html': 'contato'}


def itens_menu(atual, secao, lg, aqui):
    itens = []
    for chave in MENU:
        marca = ' aria-current="page"' if chave == atual else (' aria-current="true"' if chave == secao else '')
        itens.append(f'<li><a href="{rel(aqui, arquivo(chave, lg))}"{marca}>{x(UI[MENU_ROTULO[chave]], lg)}</a></li>')
    return '\n'.join(itens)


def idiomas(chave, lg, aqui):
    itens = []
    for outra, sigla, nome in (('pt', 'PT', 'Português'), ('en', 'EN', 'English')):
        marca = ' aria-current="true"' if outra == lg else ''
        itens.append(f'<li><a href="{rel(aqui, arquivo(chave, outra))}" hreflang="{HTML_LANG[outra]}" '
                     f'lang="{HTML_LANG[outra]}"{marca}><span aria-hidden="true">{sigla}</span>'
                     f'<span class="visualmente-oculto">{nome}</span></a></li>')
    return f'<ul class="idiomas" aria-label="{simples(UI["idioma"], lg)}">\n' + '\n'.join(itens) + '\n</ul>'


SETA_VOLTAR = ('<svg class="voltar__seta" viewBox="0 0 22 12" aria-hidden="true" focusable="false">'
               '<path d="M21.5 6H1M6.5.5 1 6l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1"/></svg>')


def voltar_inicio(lg, aqui):
    """botão "← Início" no canto superior esquerdo; aparece em todas as páginas menos a inicial"""
    return (f'<a class="voltar" href="{rel(aqui, arquivo("index.html", lg))}" aria-label="{simples(UI["voltar"], lg)}">'
            f'{SETA_VOLTAR}<span class="voltar__texto">{x(UI["inicio"], lg)}</span></a>')


def cabecalho(chave, secao, lg, aqui, sobre_foto):
    inicio = rel(aqui, arquivo('index.html', lg))
    classe = 'topo topo--sobre-foto' if sobre_foto else 'topo'
    voltar = '' if chave == 'index.html' else voltar_inicio(lg, aqui)
    return f'''<a class="pular" href="#conteudo">{x(UI["pular"], lg)}</a>
<header class="{classe}" data-topo>
<div class="coluna topo__barra">
<div class="topo__esquerda">{voltar}<a class="topo__marca" href="{inicio}" aria-label="TEHURA PICKLER, {simples(UI["inicio"], lg).lower()}">{monograma("topo__monograma")}</a></div>
<nav class="topo__nav" aria-label="{simples(UI["menu"], lg)}">
<ul class="topo__links">
{itens_menu(chave, secao, lg, aqui)}
</ul>
{idiomas(chave, lg, aqui)}
</nav>
<button class="topo__abrir rotulo" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="menu-celular" data-menu-abrir>{x(UI["menu"], lg)}</button>
</div>
</header>
<dialog class="menu-celular" id="menu-celular" aria-label="{simples(UI["menu"], lg)}" data-menu>
<div class="coluna menu-celular__barra">
<a class="topo__marca" href="{inicio}" aria-label="TEHURA PICKLER, {simples(UI["inicio"], lg).lower()}">{monograma("topo__monograma")}</a>
<button class="rotulo" type="button" data-menu-fechar>{x(UI["fechar"], lg)}</button>
</div>
<nav class="coluna menu-celular__nav" aria-label="{simples(UI["menu"], lg)}">
<ul class="menu-celular__links">
{itens_menu(chave, secao, lg, aqui)}
</ul>
{botao_whatsapp(lg)}
{idiomas(chave, lg, aqui)}
</nav>
</dialog>'''


def rodape(lg, aqui):
    logo = rel(aqui, 'imagens/logo-tehura-pickler.svg')
    bairro = x(S['bairro'], lg)
    return f'''<footer class="rodape">
<div class="coluna">
<div class="rodape__colunas">
<a class="rodape__logo" href="{rel(aqui, arquivo("index.html", lg))}"><img src="{logo}" width="{LOGO_W}" height="{LOGO_H}" alt="TEHURA PICKLER Arquitetura, {simples(UI["inicio"], lg).lower()}" loading="lazy"></a>
<ul class="rodape__lista">
<li><a href="{whatsapp(lg)}" target="_blank" rel="noopener">{x(UI["whatsapp"], lg)} — {S["whatsapp_exibicao"]}</a></li>
<li class="cinza">{x(S["horario"], lg)}</li>
<li class="cinza">{bairro} — {S["cidade"]}, {S["uf"]}</li>
</ul>
<ul class="rodape__lista">
<li><a href="{INSTAGRAM}" target="_blank" rel="noopener">{x(UI["instagram"], lg)} — @{S["instagram"]}</a></li>
<li class="cinza">{x(UI["cau"], lg)} — {x(S["cau"], lg)}</li>
</ul>
</div>
<p class="rodape__base">{S["ano"]} {S["nome"]} — {x(UI["direitos"], lg)}</p>
</div>
</footer>'''


def chamada(lg):
    return f'''<section class="coluna secao chamada" aria-labelledby="t-chamada">
<h2 class="titulo-secao" id="t-chamada">{x(C.TEXTOS["chamada_final"], lg)}</h2>
<p class="chamada__texto">{x(S["atuacao"], lg)}</p>
{botao_whatsapp(lg)}
</section>'''


def json_ld(lg):
    dados = {
        '@context': 'https://schema.org', '@type': 'ProfessionalService',
        'name': S['nome'], 'description': tr(S['frase'], lg), 'url': S['url_base'],
        'logo': S['url_base'] + 'imagens/logo-tehura-pickler.svg',
        'image': S['url_base'] + 'imagens/compartilhamento.jpg',
        'telephone': S['whatsapp_exibicao'],
        'address': {'@type': 'PostalAddress', 'addressLocality': S['cidade'], 'addressRegion': S['uf'],
                    'addressCountry': 'BR'},
        'openingHoursSpecification': {'@type': 'OpeningHoursSpecification', 'opens': '09:00', 'closes': '18:00',
                                      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']},
        'sameAs': [INSTAGRAM],
    }
    return '<script type="application/ld+json">' + json.dumps(dados, ensure_ascii=False) + '</script>\n'


def pagina(chave, lg, titulo, descricao, corpo, secao=None, sobre_foto=False, extra_head='', classe=''):
    aqui = arquivo(chave, lg)
    nome_site = f'{S["nome"]} | {tr(S["frase"], lg)}'
    titulo_completo = nome_site if chave == 'index.html' else f'{titulo} | {S["nome"]}'
    descricao = html.escape(descricao or tr(S['frase'], lg), quote=True)
    alternativas = '\n'.join(f'<link rel="alternate" hreflang="{HTML_LANG[o]}" href="{absoluto(arquivo(chave, o))}">'
                             for o in LINGUAS)
    robos = '<meta name="robots" content="noindex, nofollow">\n' if S['teste'] or chave == '404.html' else ''
    f = lambda p: rel(aqui, p)                                                 # noqa: E731
    return f'''<!doctype html>
<html lang="{HTML_LANG[lg]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(titulo_completo)}</title>
<meta name="description" content="{descricao}">
{robos}<meta name="theme-color" content="#F2F0EB">
<meta name="color-scheme" content="light">
<meta name="format-detection" content="telephone=no">
<link rel="canonical" href="{absoluto(aqui)}">
{alternativas}
<link rel="alternate" hreflang="x-default" href="{absoluto(arquivo(chave, 'pt'))}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{S["nome"]}">
<meta property="og:locale" content="{OG_LOCALE[lg]}">
<meta property="og:url" content="{absoluto(aqui)}">
<meta property="og:title" content="{html.escape(titulo_completo, quote=True)}">
<meta property="og:description" content="{descricao}">
<meta property="og:image" content="{S["url_base"]}imagens/compartilhamento.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="TEHURA PICKLER Arquitetura">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{f("favicon.ico")}" sizes="48x48">
<link rel="icon" href="{f("favicon.svg")}" type="image/svg+xml">
<link rel="apple-touch-icon" href="{f("apple-touch-icon.png")}">
<link rel="preload" href="{f("fontes/tehura-regular.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{f("estilo.css")}">
<script src="{f("site.js")}" defer></script>
{extra_head}</head>
<body class="{classe}">
<!-- Gerado por _ferramentas/gerar.py a partir de _ferramentas/conteudo.py: edite lá, não aqui. -->
{cabecalho(chave, secao, lg, aqui, sobre_foto)}
<main id="conteudo" tabindex="-1">
{corpo}
</main>
{rodape(lg, aqui)}
</body>
</html>
'''


# ------------------------------------------------------------------ fotos


def foto(p, indice, proporcao, lg, aqui, classe='', lazy=True):
    """foto de um projeto; enquanto não houver fotos, um marcador neutro"""
    fotos = p.get('fotos') or []
    if indice < len(fotos):
        arq = f'imagens/projetos/{p["slug"]}/{fotos[indice]["arquivo"]}'
        alt = html.escape(tr(fotos[indice].get('alt', ''), lg), quote=True)
        carga = ' loading="lazy"' if lazy else ' fetchpriority="high"'
        return (f'<div class="foto foto--{proporcao} {classe}"><img src="{rel(aqui, arq)}" alt="{alt}"'
                f'{carga} decoding="async"></div>')
    rotulo = simples(UI['foto_marcador'], lg)
    tom = (sum(map(ord, p['slug'])) + indice) % 4 + 1
    return (f'<div class="foto foto--{proporcao} foto--marcador foto--tom{tom} {classe}" role="img" '
            f'aria-label="{rotulo}"><span class="foto__rotulo" aria-hidden="true">{rotulo}</span></div>')


def retrato(lg, classe=''):
    rotulo = simples(UI['retrato_marcador'], lg)
    return (f'<div class="foto foto--marcador foto--retrato {classe}" role="img" aria-label="{rotulo}">'
            f'<span class="foto__rotulo" aria-hidden="true">{rotulo}</span></div>')


def card(p, lg, aqui, nivel=2):
    return f'''<li class="card" data-categoria="{p["categoria"]}">
<a class="card__link" href="{rel(aqui, arquivo(f"projetos/{p['slug']}.html", lg))}">
{foto(p, 0, "3x2", lg, aqui)}
<div class="card__legenda"><h{nivel} class="card__nome">{x(p["nome"], lg)}</h{nivel}><p class="card__local">{local(p, lg)}</p></div>
</a>
</li>'''


# ------------------------------------------------------------------ páginas


def inicio(lg):
    aqui = arquivo('index.html', lg)
    destaques = [p for p in C.PROJETOS if p['destaque']][:4]
    faixas = '\n'.join(f'''<a class="faixa" href="{rel(aqui, arquivo(f"projetos/{p['slug']}.html", lg))}">
{foto(p, 0, "cheia", lg, aqui, "veu")}
<div class="coluna faixa__texto"><h3 class="nome-sobre-foto">{x(p["nome"], lg)}</h3><p class="rotulo">{local(p, lg)}</p></div>
</a>''' for p in destaques)
    etapas = '\n'.join(f'<li><span class="etapa__numero" aria-hidden="true">{i:02d}</span>{x(nome, lg)}</li>'
                       for i, (nome, _) in enumerate(C.ETAPAS, 1))
    corpo = f'''<section class="abertura">
{foto(destaques[0], 0, "cheia", lg, aqui, "veu", lazy=False)}
<div class="coluna abertura__texto">
<h1 class="abertura__logo"><img src="{rel(aqui, "imagens/logo-tehura-pickler-branco.svg")}" width="{LOGO_W}" height="{LOGO_H}" alt="TEHURA PICKLER Arquitetura"></h1>
</div>
</section>

<section class="faixas" aria-labelledby="t-destaques">
<h2 class="visualmente-oculto" id="t-destaques">{x(UI["projetos"], lg)}</h2>
{faixas}
<div class="coluna faixas__fim"><a class="link" href="{rel(aqui, arquivo("projetos.html", lg))}">{x(UI["ver_projetos"], lg)}</a></div>
</section>

<section class="coluna secao apresentacao" aria-labelledby="t-apresentacao" data-revelar>
<h2 class="titulo-pagina" id="t-apresentacao">{x(S["frase"], lg)}</h2>
<div class="texto">
{paragrafos(C.TEXTOS["apresentacao"], lg)}
<a class="link" href="{rel(aqui, arquivo("escritorio.html", lg))}">{x(UI["conheca_escritorio"], lg)}</a>
</div>
</section>

<section class="dividida" aria-labelledby="t-tehura">
<div class="dividida__texto" data-revelar>
<h2 class="titulo-secao" id="t-tehura">Tehura Pickler</h2>
<p>{x(C.TEXTOS["tehura_resumo"], lg)}</p>
<a class="link" href="{rel(aqui, arquivo("escritorio.html", lg))}">{x(UI["conheca_escritorio"], lg)}</a>
</div>
{retrato(lg, "dividida__foto")}
</section>

<section class="coluna secao" aria-labelledby="t-etapas" data-revelar>
<h2 class="titulo-secao" id="t-etapas">{x(UI["como_trabalhamos"], lg)}</h2>
<ol class="etapas-resumo rotulo">
{etapas}
</ol>
<a class="link" href="{rel(aqui, arquivo("como-trabalhamos.html", lg))}">{x(UI["veja_etapas"], lg)}</a>
</section>

{chamada(lg)}'''
    head = json_ld(lg)
    return pagina('index.html', lg, S['nome'], tr(S['frase'], lg) + ' — ' + tr(S['atuacao'], lg), corpo,
                  sobre_foto=True, extra_head=head, classe='pagina-inicio')


def escritorio(lg):
    aqui = arquivo('escritorio.html', lg)
    equipe = '\n'.join(f'<li><span class="pessoa__nome">{x(nome, lg)}</span><span class="cinza">{x(cargo, lg)}</span></li>'
                       for nome, cargo in C.EQUIPE)
    premios = '\n'.join(f'<li><span class="cinza">{x(ano, lg)}</span><span>{x(nome, lg)}</span><span class="cinza">{x(proj, lg)}</span></li>'
                        for ano, nome, proj in C.PREMIOS)
    corpo = f'''<section class="dividida dividida--topo" aria-labelledby="t-escritorio">
<div class="dividida__texto">
<h1 class="titulo-pagina" id="t-escritorio">{x(C.TEXTOS["escritorio_titulo"], lg)}</h1>
{paragrafos(C.TEXTOS["escritorio_texto"], lg)}
</div>
{retrato(lg, "dividida__foto")}
</section>

<section class="coluna secao" aria-labelledby="t-equipe" data-revelar>
<h2 class="titulo-secao" id="t-equipe">{x(C.TEXTOS["equipe_titulo"], lg)}</h2>
<ul class="lista-linhas lista-equipe rotulo">
{equipe}
</ul>
</section>

<section class="coluna secao" aria-labelledby="t-premios" data-revelar>
<h2 class="titulo-secao" id="t-premios">{x(C.TEXTOS["premios_titulo"], lg)}</h2>
<ul class="lista-linhas lista-premios rotulo">
{premios}
</ul>
<p class="rotulo cinza registro">{x(UI["cau"], lg)} — {x(S["cau"], lg)}</p>
</section>

{chamada(lg)}'''
    return pagina('escritorio.html', lg, tr(UI['escritorio'], lg), None, corpo, classe='pagina-interna')


def como_trabalhamos(lg):
    etapas = '\n'.join(f'''<li class="etapa" data-revelar>
<span class="etapa__numero" aria-hidden="true">{i:02d}</span>
<h3 class="etapa__nome rotulo">{x(nome, lg)}</h3>
<p>{x(texto, lg)}</p>
</li>''' for i, (nome, texto) in enumerate(C.ETAPAS, 1))
    servicos = '\n'.join(f'<li>{x(s, lg)}</li>' for s in C.SERVICOS)
    areas = '\n'.join(f'<li>{x(a, lg)}</li>' for a in C.AREAS)
    corpo = f'''<div class="coluna topo-pagina">
<h1 class="titulo-pagina">{x(UI["como_trabalhamos"], lg)}</h1>
<p class="topo-pagina__texto">{x(C.TEXTOS["como_intro"], lg)}</p>
</div>

<section class="coluna secao secao--sem-topo" aria-labelledby="t-etapas">
<h2 class="visualmente-oculto" id="t-etapas">{x(C.TEXTOS["etapas_titulo"], lg)}</h2>
<ol class="etapas">
{etapas}
</ol>
</section>

<section class="coluna secao duas-listas" data-revelar>
<div>
<h2 class="titulo-secao">{x(C.TEXTOS["servicos_titulo"], lg)}</h2>
<ul class="lista-linhas rotulo">
{servicos}
</ul>
</div>
<div>
<h2 class="titulo-secao">{x(C.TEXTOS["areas_titulo"], lg)}</h2>
<ul class="lista-linhas rotulo">
{areas}
</ul>
</div>
</section>

{chamada(lg)}'''
    return pagina('como-trabalhamos.html', lg, tr(UI['como_trabalhamos'], lg), None, corpo, classe='pagina-interna')


def projetos(lg):
    aqui = arquivo('projetos.html', lg)
    usadas = [c for c, _ in C.CATEGORIAS if any(p['categoria'] == c for p in C.PROJETOS)]
    filtros = [f'<button type="button" class="filtro rotulo" data-filtro="todos" aria-pressed="true">{x(UI["todos"], lg)}</button>']
    filtros += [f'<button type="button" class="filtro rotulo" data-filtro="{c}" aria-pressed="false">{x(CATEGORIA[c], lg)}</button>'
                for c in usadas]
    cards = '\n'.join(card(p, lg, aqui) for p in C.PROJETOS)
    contagem = {'pt': '{n} projetos', 'en': '{n} projects'}[lg]
    contagem_um = {'pt': '1 projeto', 'en': '1 project'}[lg]
    corpo = f'''<div class="coluna topo-pagina">
<h1 class="titulo-pagina">{x(UI["projetos"], lg)}</h1>
<p class="topo-pagina__texto">{x(C.TEXTOS["projetos_subtitulo"], lg)}</p>
<div class="filtros" role="group" aria-label="{simples(UI["filtrar"], lg)}" data-filtros hidden>
{chr(10).join(filtros)}
</div>
</div>

<div class="coluna secao secao--sem-topo">
<ul class="grade-projetos" data-grade>
{cards}
</ul>
<p class="visualmente-oculto" aria-live="polite" data-filtro-status data-modelo="{contagem}" data-modelo-um="{contagem_um}"></p>
</div>

{chamada(lg)}'''
    return pagina('projetos.html', lg, tr(UI['projetos'], lg), None, corpo, classe='pagina-interna')


def projeto(p, lg):
    chave = f'projetos/{p["slug"]}.html'
    aqui = arquivo(chave, lg)
    situacao = {'concluido': UI['situacao_concluido'], 'andamento': UI['situacao_andamento']}.get(p['situacao'])
    linhas = [
        (UI['categoria'], CATEGORIA[p['categoria']]),
        (UI['local'], None),
        (UI['ano'], p['ano']),
        (UI['area'], p['area']),
        (UI['situacao'], situacao if situacao else PREENCHER({'pt': 'situação', 'en': 'status'}[lg])),
        (UI['fotografia'], p['fotografo']),
    ]
    ficha = []
    for rotulo, valor in linhas:
        if valor is None:                                  # local: cidade e UF
            valor_html = x(p['cidade'], lg) + (f', {x(p["uf"], lg)}' if p.get('uf') else '')
        else:
            valor_html = x(valor, lg)
        ficha.append(f'<div><dt>{x(rotulo, lg)}</dt><dd>{valor_html}</dd></div>')
    # galeria: fotos 3:2 na largura da coluna intercaladas com pares 4:5 (design.md, seção 11)
    n_fotos = len(p.get('fotos') or []) or 5               # sem fotos ainda: 5 marcadores
    ritmo = ['3x2', '4x5', '4x5', '3x2', '3x2']
    itens = []
    for i in range(n_fotos):
        prop = ritmo[i % len(ritmo)]
        itens.append(f'''<li class="galeria__item galeria__item--{prop}">
<button type="button" class="galeria__botao" data-galeria-indice="{i}" aria-label="{simples(UI["ampliar"], lg)} {i + 1}">
{foto(p, i, prop, lg, aqui)}
</button>
</li>''')
    outros = [o for o in C.PROJETOS if o['slug'] != p['slug']][:2]
    outros_html = '\n'.join(card(o, lg, aqui, nivel=3) for o in outros)
    rotulos_galeria = json.dumps({'de': tr(UI['foto_de'], lg)}, ensure_ascii=False)
    corpo = f'''<section class="abertura abertura--projeto" aria-labelledby="t-projeto">
{foto(p, 0, "cheia", lg, aqui, "veu", lazy=False)}
<div class="coluna abertura__texto">
<h1 class="nome-sobre-foto" id="t-projeto">{x(p["nome"], lg)}</h1>
<p class="rotulo">{local(p, lg)}</p>
</div>
</section>

<div class="coluna projeto">
<aside class="projeto__ficha" aria-labelledby="t-ficha">
<h2 class="rotulo projeto__ficha-titulo" id="t-ficha">{x(UI["ficha"], lg)}</h2>
<dl class="ficha">
{chr(10).join(ficha)}
</dl>
</aside>
<div class="projeto__conteudo">
<div class="texto">
{paragrafos(p["texto"], lg)}
</div>
<h2 class="visualmente-oculto">{x(UI["galeria"], lg)}</h2>
<ul class="galeria" data-galeria>
{chr(10).join(itens)}
</ul>
</div>
</div>

<section class="coluna secao" aria-labelledby="t-outros">
<h2 class="titulo-secao" id="t-outros">{x(UI["outros_projetos"], lg)}</h2>
<ul class="grade-projetos">
{outros_html}
</ul>
</section>

{chamada(lg)}

<dialog class="ampliada" aria-label="{simples(UI["galeria"], lg)}" data-ampliada data-rotulos='{html.escape(rotulos_galeria, quote=True)}'>
<div class="ampliada__barra">
<p class="rotulo" data-ampliada-contador aria-live="polite"></p>
<button type="button" class="rotulo" data-ampliada-fechar>{x(UI["fechar"], lg)}</button>
</div>
<figure class="ampliada__figura" data-ampliada-figura></figure>
<button type="button" class="ampliada__seta ampliada__seta--anterior" data-ampliada-anterior aria-label="{simples(UI["anterior"], lg)}"><span class="seta" aria-hidden="true"></span></button>
<button type="button" class="ampliada__seta ampliada__seta--proxima" data-ampliada-proxima aria-label="{simples(UI["proxima"], lg)}"><span class="seta" aria-hidden="true"></span></button>
</dialog>'''
    titulo = simples(p['nome'], lg)
    return pagina(chave, lg, titulo, None, corpo, secao='projetos.html', classe='pagina-interna pagina-projeto')


def contato(lg):
    aqui = arquivo('contato.html', lg)
    corpo = f'''<section class="dividida dividida--topo" aria-labelledby="t-contato">
<div class="dividida__texto">
<h1 class="titulo-pagina" id="t-contato">{x(UI["contato"], lg)}</h1>
<p>{x(C.TEXTOS["contato_texto"], lg)}</p>
{botao_whatsapp(lg, "botao botao--grande")}
<dl class="ficha ficha--contato">
<div><dt>{x(UI["whatsapp"], lg)}</dt><dd><a href="{whatsapp(lg)}" target="_blank" rel="noopener">{S["whatsapp_exibicao"]}</a></dd></div>
<div><dt>{x(UI["horario"], lg)}</dt><dd>{x(S["horario"], lg)}</dd></div>
<div><dt>{x(UI["endereco"], lg)}</dt><dd>{x(S["bairro"], lg)} — {S["cidade"]}, {S["uf"]}</dd></div>
<div><dt>{x(UI["instagram"], lg)}</dt><dd><a href="{INSTAGRAM}" target="_blank" rel="noopener">@{S["instagram"]}</a></dd></div>
<div><dt>{x(UI["cau"], lg)}</dt><dd>{x(S["cau"], lg)}</dd></div>
</dl>
</div>
{foto(C.PROJETOS[0], 1, "cheia", lg, aqui, "dividida__foto")}
</section>'''
    return pagina('contato.html', lg, tr(UI['contato'], lg), None, corpo, classe='pagina-interna')


def nao_encontrada(lg):
    aqui = arquivo('404.html', lg)
    corpo = f'''<div class="coluna topo-pagina nao-encontrada">
{monograma("nao-encontrada__monograma")}
<h1 class="titulo-pagina">{x(UI["nao_encontrada_titulo"], lg)}</h1>
<p class="topo-pagina__texto">{x(UI["nao_encontrada_texto"], lg)}</p>
<a class="link" href="{rel(aqui, arquivo("index.html", lg))}">{x(UI["voltar_inicio"], lg)}</a>
</div>'''
    return pagina('404.html', lg, tr(UI['nao_encontrada_titulo'], lg), None, corpo, classe='pagina-interna')


# ------------------------------------------------------------------ conferências

FONTE_TTF = os.path.join(RAIZ, 'identidade', 'fonte', 'Tehura-Regular.ttf')


def caracteres_da_fonte():
    try:
        from fontTools.ttLib import TTFont
        return set(TTFont(FONTE_TTF).getBestCmap())
    except ImportError:
        return None


class Textos(HTMLParser):
    """junta o texto visível, fora de <script>, <style> e dos marcadores [PREENCHER]"""
    def __init__(self):
        super().__init__()
        self.pilha, self.texto = [], []

    def handle_starttag(self, tag, attrs):
        if tag in ('meta', 'link', 'img', 'br', 'input', 'source'):
            return
        classe = dict(attrs).get('class') or ''
        self.pilha.append(tag in ('script', 'style', 'title') or 'preencher' in classe.split())

    def handle_endtag(self, tag):
        if self.pilha and tag not in ('meta', 'link', 'img', 'br', 'input', 'source'):
            self.pilha.pop()

    def handle_data(self, data):
        if not any(self.pilha):
            self.texto.append(data)


def confere_sinais(gerados, cmap):
    problemas = {}
    for caminho, conteudo_html in gerados.items():
        leitor = Textos(); leitor.feed(conteudo_html)
        for ch in ''.join(leitor.texto):
            if ch.isspace() or ord(ch) in cmap:
                continue
            problemas.setdefault(ch, set()).add(caminho)
    return problemas


# ------------------------------------------------------------------ execução

def main():
    gerados = {}
    for lg in LINGUAS:
        gerados[arquivo('index.html', lg)] = inicio(lg)
        gerados[arquivo('escritorio.html', lg)] = escritorio(lg)
        gerados[arquivo('como-trabalhamos.html', lg)] = como_trabalhamos(lg)
        gerados[arquivo('projetos.html', lg)] = projetos(lg)
        gerados[arquivo('contato.html', lg)] = contato(lg)
        gerados[arquivo('404.html', lg)] = nao_encontrada(lg)
        for p in C.PROJETOS:
            gerados[arquivo(f'projetos/{p["slug"]}.html', lg)] = projeto(p, lg)

    # remove páginas de projeto que saíram do conteúdo
    for lg in LINGUAS:
        pasta = os.path.join(RAIZ, arquivo('projetos', lg))
        if os.path.isdir(pasta):
            for nome in os.listdir(pasta):
                if nome.endswith('.html') and arquivo(f'projetos/{nome}', lg) not in gerados:
                    os.remove(os.path.join(pasta, nome))

    for caminho, conteudo_html in gerados.items():
        destino = os.path.join(RAIZ, caminho)
        os.makedirs(os.path.dirname(destino), exist_ok=True)
        with open(destino, 'w', encoding='utf-8') as f:
            f.write(conteudo_html)
    print(f'{len(gerados)} páginas geradas.')

    cmap = caracteres_da_fonte()
    if cmap is None:
        print('Aviso: fontTools não instalado; os sinais da fonte não foram conferidos.')
    else:
        problemas = confere_sinais(gerados, cmap)
        if problemas:
            print('ATENÇÃO, sinais que a fonte Tehura não tem:')
            for ch, onde in problemas.items():
                print(f'  {ch!r} (U+{ord(ch):04X}) em: {", ".join(sorted(onde))}')
        else:
            print('Sinais da fonte: tudo certo.')

    falta = sorted(p for p in pendencias['preencher'] if p)
    print(f'[PREENCHER] diferentes: {len(falta)}')
    for p in falta:
        print('  -', p)
    print(f'Rascunhos aguardando aprovação: {len([r for r in pendencias["rascunho"] if r])}')

    publicos = sorted(gerados) + ['estilo.css', 'site.js', 'favicon.ico', 'favicon.svg', 'apple-touch-icon.png']
    for pasta in ('fontes', 'imagens'):
        for base, _, nomes in os.walk(os.path.join(RAIZ, pasta)):
            publicos += [os.path.relpath(os.path.join(base, n), RAIZ).replace(os.sep, '/') for n in sorted(nomes)]
    with open(os.path.join(RAIZ, '_ferramentas', 'arquivos-publicos.txt'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(publicos) + '\n')


if __name__ == '__main__':
    main()
