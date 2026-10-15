"""
Prepara os arquivos de apoio do site a partir da identidade (identidade/). Só precisa rodar de novo se a
identidade mudar.

    python3 _ferramentas/recursos.py

Gera:
  fontes/tehura-{light,regular,bold}.woff2       a fonte Tehura em WOFF2
  imagens/logo-tehura-pickler{,-branco}.svg      cópias dos SVG da identidade
  favicon.svg, favicon.ico, apple-touch-icon.png  monograma TP em carvão sobre o fundo do site
  imagens/compartilhamento.jpg                    imagem de 1200 x 630 para WhatsApp, redes e buscadores

Precisa de: pip install fonttools brotli cairosvg pillow
"""
import io, os, re, shutil
from fontTools.ttLib import TTFont
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

# imagem de compartilhamento: logo carvão centralizado no fundo do site
logo = Image.open(io.BytesIO(cairosvg.svg2png(url=os.path.join(IDENT, 'svg', 'logo-tehura-pickler.svg'),
                                              output_width=560))).convert('RGBA')
og = Image.new('RGB', (1200, 630), FUNDO)
og.paste(logo, ((1200 - logo.width) // 2, (630 - logo.height) // 2), logo)
og.save(caminho('imagens', 'compartilhamento.jpg'), quality=88, optimize=True, progressive=True)

for p in ('fontes', 'imagens'):
    for n in sorted(os.listdir(caminho(p, 'x')[:-2])):
        print(f'{p}/{n}', os.path.getsize(os.path.join(RAIZ, p, n)), 'bytes')
for n in ('favicon.svg', 'favicon.ico', 'apple-touch-icon.png'):
    print(n, os.path.getsize(os.path.join(RAIZ, n)), 'bytes')
