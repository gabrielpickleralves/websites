"""
Prepara os arquivos de apoio do site a partir da identidade (identidade/). Só precisa rodar de novo se a
identidade mudar.

    python3 _ferramentas/recursos.py

Gera:
  fontes/tehura-{light,regular,bold}.woff2       a fonte Tehura em WOFF2
  imagens/logo-tehura-pickler{,-branco}.svg      cópias dos SVG da identidade
  imagens/logo-tehura-pickler{,-branco}-en.svg   logo das páginas em inglês (ARCHITECTURE na última linha)
  favicon.svg, favicon.ico, apple-touch-icon.png  monograma TP em carvão sobre o fundo do site
  imagens/compartilhamento{,-en}.jpg              imagem de 1200 x 630 para WhatsApp, redes e buscadores

Precisa de: pip install fonttools brotli cairosvg pillow
"""
import io, math, os, re, shutil
from fontTools.ttLib import TTFont
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import RecordingPen
import cairosvg
from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IDENT = os.path.join(RAIZ, 'identidade')
FUNDO, CARVAO = '#F2F0EB', '#1E1D19'


def caminho(*p):
    destino = os.path.join(RAIZ, *p)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    return destino


# fontes
for peso in ('Light', 'Regular', 'Bold'):
    f = TTFont(os.path.join(IDENT, 'fonte', f'Tehura-{peso}.ttf'))
    f.flavor = 'woff2'
    f.save(caminho('fontes', f'tehura-{peso.lower()}.woff2'))

# logo
for nome in ('logo-tehura-pickler.svg', 'logo-tehura-pickler-branco.svg'):
    shutil.copyfile(os.path.join(IDENT, 'svg', nome), caminho('imagens', nome))

# logo das páginas em inglês (pedido do escritório em 21/10/2026): TEHURA e PICKLER ficam idênticos aos do SVG
# da identidade; só a última linha troca ARQUITETURA por ARCHITECTURE, na mesma fonte, tamanho e linha de base,
# justificada na mesma largura. Posição de cada linha medida no PNG 4K da identidade (15/10/2026).
LINHAS_DO_LOGO = {
    'TEHURA': dict(peso='Bold', escala=0.4581873775864787, x0=935.0906312557097,
                   espacamento=10.37422598740233, base=946.0480484478436),
    'PICKLER': dict(peso='Regular', escala=0.4367841053828784, x0=939.0949189312886,
                    espacamento=42.72007079661138, base=1318.640306721096),
    'ARQUITETURA': dict(peso='Regular', escala=0.20243842460932934, x0=955.6289674976499,
                        espacamento=44.74526321720598, base=1534.5858331070408),
}
_fontes_logo = {p: TTFont(os.path.join(IDENT, 'fonte', f'Tehura-{p}.ttf')) for p in ('Regular', 'Bold')}


def letras(texto, espacamento=None):
    """(glyphset, glifo, x da origem, escala, linha de base) de cada letra; a última linha usa as medidas de
    ARQUITETURA"""
    m = LINHAS_DO_LOGO.get(texto, LINHAS_DO_LOGO['ARQUITETURA'])
    f = _fontes_logo[m['peso']]
    gs, cmap, hm = f.getGlyphSet(), f.getBestCmap(), f['hmtx']
    x = m['x0']
    for ch in texto:
        g = cmap[ord(ch)]
        yield gs, g, x, m['escala'], m['base']
        x += hm[g][0] * m['escala'] + (m['espacamento'] if espacamento is None else espacamento)


def caixa(gs, g):
    bp = BoundsPen(gs)
    gs[g].draw(bp)
    return bp.bounds


def num(v):
    """número com uma casa e sem zero à esquerda, como no SVG da identidade"""
    s = f'{v:.1f}'.rstrip('0').rstrip('.')
    s = '0' if s in ('-0', '') else s
    return '.' + s[2:] if s.startswith('0.') else ('-.' + s[3:] if s.startswith('-0.') else s)


def contornos(itens, dx, dy):
    """contornos das letras em SVG, no mesmo formato do SVG da identidade: M absoluto e depois l relativo"""
    d = []
    for gs, g, x, s, base in itens:
        rec = RecordingPen()
        gs[g].draw(rec)
        ult, em_l = None, False
        for op, pts in rec.value:
            if op == 'closePath':
                d.append('z')
                em_l = False
                continue
            if op not in ('moveTo', 'lineTo'):
                raise ValueError(f'contorno inesperado em {g}: {op}')
            px, py = pts[0]
            p = (round(x + px * s - dx, 1), round(base - py * s - dy, 1))
            if op == 'moveTo':
                d.append(f'M{num(p[0])} {num(p[1])}')
            else:
                ddx, ddy = num(p[0] - ult[0]), num(p[1] - ult[1])
                par = ddx + ('' if ddy.startswith('-') else ' ') + ddy
                d.append(((' ' if not par.startswith('-') else '') if em_l else 'l') + par)
                em_l = True
            ult = p
    return ''.join(d)


# deslocamento do SVG: a caixa do logo começa na menor borda das letras das três linhas
_todas = [it for t in LINHAS_DO_LOGO for it in letras(t)]
LX0 = math.floor(min(x + caixa(gs, g)[0] * s for gs, g, x, s, b in _todas))
LY0 = math.floor(min(b - caixa(gs, g)[3] * s for gs, g, x, s, b in _todas))
# ARCHITECTURE termina na mesma borda direita de ARQUITETURA
_pt = list(letras('ARQUITETURA'))
_borda = lambda itens: itens[-1][2] + caixa(itens[-1][0], itens[-1][1])[2] * itens[-1][3]  # noqa: E731
_espacamento_en = (_borda(_pt) - _borda(list(letras('ARCHITECTURE', 0)))) / (len('ARCHITECTURE') - 1)
_limite = (LINHAS_DO_LOGO['PICKLER']['base'] + min(b - caixa(gs, g)[3] * s for gs, g, x, s, b in _pt)) / 2 - LY0

for cor in ('', '-branco'):
    svg = open(os.path.join(IDENT, 'svg', f'logo-tehura-pickler{cor}.svg'), encoding='utf-8').read()
    d = re.search(r' d="([^"]+)"', svg).group(1)
    subcaminhos = re.findall(r'M[^M]+', d)
    # confere se as medidas reproduzem a linha ARQUITETURA do SVG da identidade antes de trocar
    ultima_pt = ''.join(s for s in subcaminhos if float(re.match(r'M(-?[\d.]+) (-?[\d.]+)', s).group(2)) > _limite)
    if ultima_pt != contornos(_pt, LX0, LY0):
        raise SystemExit('as medidas do logo não reproduzem a linha ARQUITETURA do SVG da identidade')
    d_en = d[:len(d) - len(ultima_pt)] if d.endswith(ultima_pt) else None
    if d_en is None:
        raise SystemExit('a linha ARQUITETURA não é o fim do contorno do SVG da identidade')
    d_en += contornos(letras('ARCHITECTURE', _espacamento_en), LX0, LY0)
    svg_en = svg.replace(d, d_en).replace('TEHURA PICKLER Arquitetura', 'TEHURA PICKLER Architecture')
    open(caminho('imagens', f'logo-tehura-pickler{cor}-en.svg'), 'w', encoding='utf-8').write(svg_en)

# ícones: monograma carvão centralizado num quadrado com o fundo do site
mono = open(os.path.join(IDENT, 'svg', 'monograma-tp.svg'), encoding='utf-8').read()
d = re.search(r' d="([^"]+)"', mono).group(1)
vw, vh = map(float, re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', mono).groups())
lado = max(vw, vh) / 0.62                                   # o monograma ocupa 62% do quadrado
dx, dy = (lado - vw) / 2, (lado - vh) / 2
icone = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {lado:.0f} {lado:.0f}">'
         f'<rect width="100%" height="100%" fill="{FUNDO}"/>'
         f'<path fill="{CARVAO}" transform="translate({dx:.1f} {dy:.1f})" d="{d}"/></svg>\n')
open(caminho('favicon.svg'), 'w', encoding='utf-8').write(icone)


def png(svg, lado):
    return Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode(), output_width=lado,
                                                  output_height=lado))).convert('RGBA')


png(icone, 180).convert('RGB').save(caminho('apple-touch-icon.png'), optimize=True)
png(icone, 256).save(caminho('favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)])

# imagem de compartilhamento: logo carvão centralizado no fundo do site (a das páginas em inglês, com o logo em
# inglês)
for origem, destino in ((os.path.join(IDENT, 'svg', 'logo-tehura-pickler.svg'), 'compartilhamento.jpg'),
                        (caminho('imagens', 'logo-tehura-pickler-en.svg'), 'compartilhamento-en.jpg')):
    logo = Image.open(io.BytesIO(cairosvg.svg2png(url=origem, output_width=560))).convert('RGBA')
    og = Image.new('RGB', (1200, 630), FUNDO)
    og.paste(logo, ((1200 - logo.width) // 2, (630 - logo.height) // 2), logo)
    og.save(caminho('imagens', destino), quality=88, optimize=True, progressive=True)

for p in ('fontes', 'imagens'):
    for n in sorted(os.listdir(caminho(p, 'x')[:-2])):
        print(f'{p}/{n}', os.path.getsize(os.path.join(RAIZ, p, n)), 'bytes')
for n in ('favicon.svg', 'favicon.ico', 'apple-touch-icon.png'):
    print(n, os.path.getsize(os.path.join(RAIZ, n)), 'bytes')
