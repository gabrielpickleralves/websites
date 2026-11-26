"""
Gera as versões das fotos de projeto usadas no site, a partir das fotos originais.

    python3 _ferramentas/fotos.py <pasta com as fotos originais>

A pasta pode ter subpastas (uma por projeto, por exemplo); cada foto é procurada pelo nome do arquivo
original que está em _ferramentas/conteudo.py. As originais não vão para o repositório: ficam com o
escritório (link do Google Drive registrado em memoria.md).

Para cada foto, grava em imagens/projetos/<slug>/:
  - AVIF e WebP em duas larguras (horizontais: 800 e 1600 px; verticais: 640 e 1280 px);
  - um JPEG de reserva, para navegadores antigos;
  - nas fotos de tela cheia (capa e abertura da página inicial), também 2560 px nas horizontais.
As cores são convertidas para sRGB e os dados da câmera (EXIF, GPS) não vão para o site.
Os tamanhos ficam anotados em _ferramentas/fotos-geradas.json, que o gerar.py lê.
Fotos já geradas são puladas; use --refazer para gerar tudo de novo.

Precisa de: pip install pillow (com suporte a AVIF e WebP)
"""
import io, json, os, re, sys
from PIL import Image, ImageCms, ImageOps, features

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import conteudo as C                                                           # noqa: E402

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFESTO = os.path.join(RAIZ, '_ferramentas', 'fotos-geradas.json')
Image.MAX_IMAGE_PIXELS = None

LARGURAS = {'horizontal': [800, 1600], 'vertical': [640, 1280]}
TELA_CHEIA = 2560                       # a mais, nas horizontais de capa e abertura
JPEG = {'horizontal': 1200, 'vertical': 960, 'tela_cheia': 1600}
QUALIDADE = {'AVIF': dict(quality=60, speed=6), 'WEBP': dict(quality=74, method=5),
             'JPEG': dict(quality=78, optimize=True, progressive=True)}
SRGB = ImageCms.createProfile('sRGB')


def nome_base(arquivo):
    """0A9A0075-Editar-Editar-2.jpg -> 0a9a0075-2; _FJR9789-HDR.jpg -> fjr9789-hdr"""
    base = os.path.splitext(arquivo)[0].lower().lstrip('_')
    return re.sub(r'(-editar)+', '', base)


def fotos_do_site():
    """(slug, arquivo original, tela cheia?) de cada foto usada nas páginas"""
    usos = {}
    for p in C.PROJETOS:
        for foto in p['fotos']:
            usos.setdefault((p['slug'], foto['arquivo']), False)
        for chave in ('capa', 'capa_vertical'):
            usos[(p['slug'], p[chave]['arquivo'])] = True
    for chave in ('vertical', 'horizontal'):
        usos[(C.ABERTURA['projeto'], C.ABERTURA[chave]['arquivo'])] = True
    return usos


def abre_em_srgb(caminho):
    im = Image.open(caminho)
    icc = im.info.get('icc_profile')
    im = ImageOps.exif_transpose(im)
    if icc:
        origem = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        if 'srgb' not in ImageCms.getProfileDescription(origem).lower().replace(' ', ''):
            im = ImageCms.profileToProfile(im.convert('RGB'), origem, SRGB, outputMode='RGB')
    return im.convert('RGB')


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    refazer = '--refazer' in sys.argv
    if len(args) != 1 or not os.path.isdir(args[0]):
        sys.exit(__doc__)
    if not (features.check('avif') and features.check('webp')):
        sys.exit('O Pillow instalado não grava AVIF ou WebP.')
    originais = {}
    for base, _, nomes in os.walk(args[0]):
        for n in nomes:
            originais.setdefault(n, os.path.join(base, n))

    manifesto = {} if refazer or not os.path.exists(MANIFESTO) else json.load(open(MANIFESTO))
    novo = {}
    for (slug, arquivo), tela_cheia in sorted(fotos_do_site().items()):
        chave = f'{slug}/{arquivo}'
        if arquivo not in originais:
            sys.exit(f'Foto original não encontrada: {arquivo} (projeto {slug})')
        pasta = os.path.join(RAIZ, 'imagens', 'projetos', slug)
        base = nome_base(arquivo)
        anterior = manifesto.get(chave)
        if anterior and anterior['tela_cheia'] == tela_cheia and all(
                os.path.exists(os.path.join(pasta, n)) for n in anterior['arquivos']):
            novo[chave] = anterior
            continue
        im = abre_em_srgb(originais[arquivo])
        orientacao = 'horizontal' if im.width > im.height else 'vertical'
        larguras = LARGURAS[orientacao] + ([TELA_CHEIA] if tela_cheia and orientacao == 'horizontal' else [])
        larg_jpeg = JPEG['tela_cheia'] if tela_cheia and orientacao == 'horizontal' else JPEG[orientacao]
        os.makedirs(pasta, exist_ok=True)
        gravados = []
        for formato, ext, lista in (('AVIF', 'avif', larguras), ('WEBP', 'webp', larguras), ('JPEG', 'jpg', [larg_jpeg])):
            for w in lista:
                menor = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
                nome = f'{base}-{w}.{ext}'
                menor.save(os.path.join(pasta, nome), formato, **QUALIDADE[formato])
                gravados.append(nome)
        novo[chave] = {'base': base, 'largura': im.width, 'altura': im.height, 'orientacao': orientacao,
                       'larguras': larguras, 'jpeg': larg_jpeg, 'tela_cheia': tela_cheia, 'arquivos': gravados}
        print(f'{chave}: {len(gravados)} arquivos')

    # apaga versões de fotos que saíram do site
    usados = {(c.split('/')[0], n) for c, v in novo.items() for n in v['arquivos']}
    raiz_fotos = os.path.join(RAIZ, 'imagens', 'projetos')
    if os.path.isdir(raiz_fotos):
        for slug in os.listdir(raiz_fotos):
            for n in os.listdir(os.path.join(raiz_fotos, slug)):
                if (slug, n) not in usados:
                    os.remove(os.path.join(raiz_fotos, slug, n))
                    print('Removida:', f'{slug}/{n}')
            if not os.listdir(os.path.join(raiz_fotos, slug)):
                os.rmdir(os.path.join(raiz_fotos, slug))
    with open(MANIFESTO, 'w', encoding='utf-8') as f:
        json.dump(dict(sorted(novo.items())), f, ensure_ascii=False, indent=1)
        f.write('\n')
    total = sum(os.path.getsize(os.path.join(raiz_fotos, s, n)) for s, n in usados)
    print(f'{len(novo)} fotos, {len(usados)} arquivos, {total / 1e6:.1f} MB')


if __name__ == '__main__':
    main()
