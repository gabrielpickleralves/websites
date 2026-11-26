"""
Conteúdo do site TEHURA PICKLER: tudo o que aparece nas páginas sai daqui.

Para mudar um texto, acrescentar um projeto ou trocar um [PREENCHER] pelo conteúdo real, edite este
arquivo e rode, na pasta tehura-pickler/:
    python3 _ferramentas/gerar.py

Regras (ver CLAUDE.md e specs/):
  - Nada de inventar informação. O que ainda não chegou fica como PREENCHER('o que falta'),
    que aparece no site de teste como [PREENCHER: o que falta].
  - Textos em caixa normal: a fonte Tehura mostra tudo em maiúsculas.
  - Não use os sinais que a fonte não tem: ² % · # © * $ _ | [ ] < > “ ” ‘ ’ … º ª ü è ñ
    (escreva "m2", use "—" como separador e aspas retas). O gerar.py confere e avisa.
  - Cada texto tem a versão 'pt' e a 'en'. O inglês é traduzido pelo Claude e revisado pelo escritório.
"""


class PREENCHER(str):
    """Marca um conteúdo que ainda não chegou. Aparece destacado no site de teste."""


class RASCUNHO(str):
    """Texto redigido pelo Claude que ainda precisa da aprovação do escritório."""


def t(pt, en):
    return {'pt': pt, 'en': en}


# ------------------------------------------------------------------ dados gerais

SITE = {
    # endereço de desenvolvimento aprovado (specs/site.md, item 13); troque quando houver domínio próprio
    'url_base': 'https://gabrielpickleralves.github.io/websites/tehura-pickler/',
    # site de teste: o Google não indexa e os [PREENCHER] aparecem destacados
    'teste': True,
    'ano': 2026,
    'nome': 'TEHURA PICKLER',
    # como o logo se lê: a última linha muda com o idioma (pedido do escritório em 21/10/2026)
    'nome_logo': t('TEHURA PICKLER Arquitetura', 'TEHURA PICKLER Architecture'),
    'frase': t('Arquitetura e interiores', 'Architecture and interiors'),
    'whatsapp': '5511989396948',
    'whatsapp_exibicao': '+55 11 98939-6948',
    'whatsapp_mensagem': t('Olá! Vim pelo site e gostaria de conversar sobre um projeto.',
                           "Hello! I'm reaching out through the website about a project."),
    'instagram': 'tehurapicklerarquiteta',
    'cidade': 'Mogi das Cruzes',
    'uf': 'SP',
    'bairro': PREENCHER('bairro'),
    'cau': PREENCHER('número do CAU do escritório'),
    'horario': t('Segunda a sexta, das 9h às 18h', 'Monday to Friday, 9 am to 6 pm'),
    'atuacao': t('Atendemos em todo o Brasil e no exterior.', 'We work throughout Brazil and abroad.'),
}

# rótulos fixos da interface
UI = {
    'menu': t('Menu', 'Menu'),
    'fechar': t('Fechar', 'Close'),
    'pular': t('Pular para o conteúdo', 'Skip to content'),
    'inicio': t('Início', 'Home'),
    'escritorio': t('Escritório', 'Studio'),
    'biografia': t('Biografia', 'Biography'),
    'projetos': t('Projetos', 'Projects'),
    'contato': t('Contato', 'Contact'),
    'idioma': t('Idioma', 'Language'),
    'cta': t('Conte sobre seu projeto', 'Tell us about your project'),
    'fale_conosco': t('Fale conosco', 'Get in touch'),
    'ver_projetos': t('Ver todos os projetos', 'See all projects'),
    'rolar': t('Rolar até os projetos', 'Scroll to the projects'),
    'conheca_escritorio': t('Conheça o escritório', 'About the studio'),
    'leia_biografia': t('Leia a biografia', 'Read her biography'),
    'todos': t('Todos', 'All'),
    'filtrar': t('Filtrar projetos por área', 'Filter projects by area'),
    'outros_projetos': t('Outros projetos', 'Other projects'),
    'ficha': t('Ficha técnica', 'Project details'),
    'categoria': t('Categoria', 'Category'),
    'local': t('Local', 'Location'),
    'ano': t('Ano', 'Year'),
    'area': t('Área', 'Area'),
    'situacao': t('Situação', 'Status'),
    'fotografia': t('Fotografia', 'Photography'),
    'galeria': t('Galeria de fotos', 'Photo gallery'),
    'ampliar': t('Ampliar foto', 'Enlarge photo'),
    'anterior': t('Foto anterior', 'Previous photo'),
    'proxima': t('Próxima foto', 'Next photo'),
    'foto_de': t('Foto {n} de {total}', 'Photo {n} of {total}'),
    'foto_marcador': t('Foto de projeto', 'Project photo'),
    'retrato_marcador': t(PREENCHER('foto da Tehura'), PREENCHER('photo of Tehura')),
    'foto_escritorio_marcador': t(PREENCHER('foto do escritório'), PREENCHER('photo of the studio')),
    'foto_contato_marcador': t(PREENCHER('foto da página Contato'), PREENCHER('photo for the Contact page')),
    'whatsapp': t('WhatsApp', 'WhatsApp'),
    'instagram': t('Instagram', 'Instagram'),
    'horario': t('Horário', 'Hours'),
    'endereco': t('Onde estamos', 'Where we are'),
    'cau': t('CAU', 'CAU'),
    'direitos': t('Todos os direitos reservados', 'All rights reserved'),
    'abre_whatsapp': t('abre o WhatsApp', 'opens WhatsApp'),
    'nao_encontrada_titulo': t('Página não encontrada', 'Page not found'),
    'nao_encontrada_texto': t('O endereço pode ter mudado ou não existe mais.',
                              'The address may have changed or no longer exists.'),
    'voltar_inicio': t('Voltar ao início', 'Back to home'),
    'situacao_concluido': t('Concluído', 'Completed'),
    'situacao_andamento': t('Em andamento', 'In progress'),
}

# áreas de atuação = categorias do filtro de projetos (specs/site.md, item 6)
CATEGORIAS = [
    ('residencial', t('Residencial', 'Residential')),
    ('interiores', t('Interiores', 'Interiors')),
    ('comercial', t('Comercial', 'Commercial')),
    ('incorporacao', t('Incorporação', 'Developments')),
]

SERVICOS = [
    t('Projeto de arquitetura', 'Architectural design'),
    t('Design de interiores', 'Interior design'),
    t('Reformas', 'Renovations'),
    t('Acompanhamento de obra', 'Construction follow-up'),
]

AREAS = [
    t('Residencial alto padrão', 'High-end residential'),
    t('Interiores e reformas', 'Interiors and renovations'),
    t('Comercial e corporativo', 'Commercial and corporate'),
    t('Incorporadoras', 'Real estate developers'),
]

# ------------------------------------------------------------------ textos das páginas

TEXTOS = {
    'apresentacao': t([PREENCHER('dois ou três parágrafos curtos de apresentação do escritório')],
                      [PREENCHER('two or three short paragraphs introducing the studio')]),
    'tehura_resumo': t(PREENCHER('texto curto sobre a Tehura: formação, trajetória e olhar'),
                       PREENCHER('short text about Tehura: education, career and approach')),
    'chamada_final': t(PREENCHER('frase da chamada final'), PREENCHER('closing call to action')),
    'escritorio_titulo': t('O escritório', 'The studio'),
    'escritorio_texto': t([PREENCHER('história do escritório, ano de fundação e o que o diferencia')],
                          [PREENCHER("the studio's story, year founded and what sets it apart")]),
    'equipe_titulo': t('Equipe', 'Team'),
    'premios_titulo': t('Prêmios e mostras', 'Awards and exhibitions'),
    'servicos_titulo': t('Serviços', 'Services'),
    'areas_titulo': t('Áreas de atuação', 'Areas of work'),
    'projetos_subtitulo': t(PREENCHER('subtítulo de uma linha'), PREENCHER('one-line subtitle')),
    'contato_texto': t(PREENCHER('frase curta de contato'), PREENCHER('short contact sentence')),
}

# ------------------------------------------------------------------ biografia da Tehura
# Trajetória pessoal da arquiteta (a página Escritório fala do escritório). Nada aqui pode ser inventado.

BIOGRAFIA = {
    'sobretitulo': t('Biografia', 'Biography'),
    'titulo': 'Tehura Pickler',
    'descricao': t('Biografia da arquiteta Tehura Pickler: formação, início da carreira, marcos, prêmios e '
                   'visão sobre arquitetura.',
                   'Biography of architect Tehura Pickler: education, early career, milestones, awards and '
                   'her approach to architecture.'),
    # subtítulo e parágrafos de cada parte
    'secoes': [
        (t('Formação', 'Education'),
         t([PREENCHER('formação')], [PREENCHER('education')])),
        (t('Início da carreira', 'Early career'),
         t([PREENCHER('início da carreira')], [PREENCHER('early career')])),
        (t('Marcos e prêmios', 'Milestones and awards'),
         t([PREENCHER('marcos e prêmios da carreira')], [PREENCHER('career milestones and awards')])),
        (t('Visão sobre arquitetura', 'On architecture'),
         t([PREENCHER('visão da Tehura sobre arquitetura')], [PREENCHER("Tehura's view on architecture")])),
    ],
    'linha_do_tempo_titulo': t('Linha do tempo', 'Timeline'),
    # ano e marco, do mais antigo ao mais recente; os principais prêmios também entram aqui
    'marcos': [
        (PREENCHER('ano'), t(PREENCHER('marco'), PREENCHER('milestone'))),
        (PREENCHER('ano'), t(PREENCHER('marco'), PREENCHER('milestone'))),
        (PREENCHER('ano'), t(PREENCHER('marco'), PREENCHER('milestone'))),
        (PREENCHER('ano'), t(PREENCHER('prêmio principal'), PREENCHER('main award'))),
    ],
}

# nome e cargo; só depois de o escritório mandar
EQUIPE = [
    (PREENCHER('nome'), t(PREENCHER('cargo'), PREENCHER('role'))),
    (PREENCHER('nome'), t(PREENCHER('cargo'), PREENCHER('role'))),
    (PREENCHER('nome'), t(PREENCHER('cargo'), PREENCHER('role'))),
]

# ano, prêmio ou mostra, projeto (lista completa, na página Escritório)
PREMIOS = [
    (PREENCHER('ano'), t(PREENCHER('prêmio ou mostra'), PREENCHER('award or exhibition')),
     t(PREENCHER('projeto'), PREENCHER('project'))),
    (PREENCHER('ano'), t(PREENCHER('prêmio ou mostra'), PREENCHER('award or exhibition')),
     t(PREENCHER('projeto'), PREENCHER('project'))),
]

# ------------------------------------------------------------------ projetos
#
# Cada projeto vira projetos/<slug>.html e en/projetos/<slug>.html.
#   destaque: aparece numa faixa da página inicial (3 ou 4 projetos)
#   capa: foto horizontal dos cards e, em telas deitadas, das faixas e da abertura do projeto
#   capa_vertical: a mesma função em telas em pé (celular)
#   fotos: a galeria, na ordem. Fotos horizontais ocupam a largura; as verticais vêm em pares.
# Os arquivos são os nomes das fotos originais. _ferramentas/fotos.py gera as versões do site em
# imagens/projetos/<slug>/ e anota os tamanhos em _ferramentas/fotos-geradas.json.
# Os textos dos projetos foram redigidos pelo Claude a partir das fotos e do que o escritório contou
# (26/11/2026). Nome, cidade, ano, área, situação e fotógrafo chegam com as fichas.


def f(arquivo, pt, en):
    return {'arquivo': arquivo, 'alt': t(pt, en)}


def ficha_pendente(nome_pt, nome_en):
    return {
        'nome': t(PREENCHER(nome_pt), PREENCHER(nome_en)),
        'cidade': PREENCHER('cidade'),
        'uf': '',
        'ano': PREENCHER('ano'),
        'area': PREENCHER('área em m2'),
        'situacao': None,                       # 'concluido' ou 'andamento'
        'fotografo': PREENCHER('fotógrafo'),
    }


PROJETOS = [
    {   # arquitetura e interiores
        'slug': 'casa',
        'categoria': 'residencial',
        **ficha_pendente('nome da casa com tijolinho e piscina', 'name of the brick house with pool'),
        'texto': t([
            'Uma casa pensada por inteiro, da arquitetura aos interiores. Por fora, pedra, madeira e grandes '
            'panos de vidro formam volumes limpos; ao anoitecer, a casa se acende por dentro e se reflete na '
            'piscina.',
            'A área social é um grande espaço contínuo sob o forro de madeira, com cozinha, jantar e estar '
            'abertos para a piscina e para a vista da mata. O tijolinho aparente, o aço preto da escada e as '
            'plantas trazem textura e um ar descontraído, que segue para o andar de cima, nos quartos com '
            'personalidade própria, no piso de madeira e nos banheiros de caixilhos pretos.',
        ], [
            'A house designed as a whole, from the architecture to the interiors. Outside, stone, wood and '
            'large expanses of glass form clean volumes; at dusk, the house glows from within and is reflected '
            'in the pool.',
            'The living area is one large, continuous space under a wooden ceiling, with kitchen, dining and '
            'lounge opening onto the pool and the view of the forest. Exposed brick, the black steel staircase '
            'and the plants bring texture and a relaxed feel that carries on upstairs, in bedrooms with a '
            'character of their own, wooden floors and bathrooms with black-framed glass.',
        ]),
        'capa': f('0A9A0667-Editar-Editar-Editar-Editar-Editar-Editar-Editar.jpg',
                  'Casa ao anoitecer, com a piscina iluminada em primeiro plano',
                  'The house at dusk, with the lit pool in the foreground'),
        'capa_vertical': f('0A9A0631-Pano-Editar-Editar-Editar.jpg',
                           'Fachada da casa ao entardecer, com palmeira e entrada de madeira',
                           'The front of the house at sunset, with a palm tree and a wooden entrance'),
        'fotos': [
            f('0A9A1198-Editar-Editar-Editar-Editar-Editar.jpg',
              'Área social integrada sob forro de madeira, com estar, cozinha e paredes de vidro',
              'Open-plan living area under a wooden ceiling, with lounge, kitchen and glass walls'),
            f('0A9A0595-Editar-Editar.jpg', 'Fachada da casa com pedra, madeira e palmeiras',
              'The front of the house in stone and wood, with palm trees'),
            f('0A9A1111-Editar.jpg', 'Piscina com espreguiçadeiras e vista para a mata',
              'Pool with sun loungers and a view of the forest'),
            f('0A9A0889-Editar-Editar.jpg', 'Sala de estar com parede de tijolinho aparente e escada de aço preto',
              'Living room with an exposed brick wall and a black steel staircase'),
            f('0A9A0931-Editar.jpg', 'Escada de aço preto com degraus de madeira e plantas embaixo',
              'Black steel staircase with wooden treads and plants beneath'),
            f('0A9A0895-Editar.jpg', 'Sala com sofá branco, poltrona e parede de tijolinho',
              'Living room with a white sofa, an armchair and a brick wall'),
            f('0A9A1066-Editar-Editar-Editar.jpg', 'Espaço gourmet com mesa longa de madeira e estar ao lado',
              'Gourmet area with a long wooden table and a lounge beside it'),
            f('0A9A1093-Editar-Editar.jpg', 'Mesa de madeira com cadeiras pretas e pendentes sobre a bancada',
              'Wooden table with black chairs and pendant lights over the counter'),
            f('0A9A0997-Editar.jpg', 'Bar com prateleiras de aço sobre a parede de tijolinho',
              'Bar with steel shelves against the brick wall'),
            f('0A9A1042-Editar-Editar.jpg', 'Cozinha com ilha branca, banquetas de madeira e parede de tijolinho',
              'Kitchen with a white island, wooden stools and a brick wall'),
            f('0A9A1183-Editar.jpg', 'Lavabo com parede verde-azulada e bancada de madeira',
              'Powder room with a teal wall and a wooden vanity'),
            f('0A9A0706-Editar.jpg', 'Sala de TV com poltronas verdes e parede de madeira com prateleiras',
              'TV room with green armchairs and a wooden wall with shelves'),
            f('0A9A0753-Editar.jpg', 'Quarto com parede de tijolinho, escrivaninha e estante de metal',
              'Bedroom with a brick wall, a desk and metal shelving'),
            f('0A9A0799-Editar.jpg', 'Banheiro com bancada ripada de madeira e dois espelhos',
              'Bathroom with a slatted wooden vanity and two mirrors'),
            f('0A9A0847-Editar.jpg', 'Closet com marcenaria e piso de madeira',
              'Walk-in closet with wooden joinery and a wooden floor'),
        ],
        'destaque': True,
    },
    {   # só interiores (a arquitetura da casa não é do escritório)
        'slug': 'casa-interiores',
        'categoria': 'interiores',
        **ficha_pendente('nome da casa (interiores)', 'name of the house (interiors)'),
        'texto': t([
            'Interiores para uma casa cercada de verde, em que dentro e fora quase se confundem. Na área social, '
            'plantas descem do teto entre luminárias de fibra natural, e os grandes vãos abertos para o jardim '
            'deixam a luz e a vegetação entrarem.',
            'A paleta é natural e acolhedora: madeira, pedra, palha e tecidos em tons de areia, com o azul dos '
            'sofás como contraponto. Nos quartos, cabeceiras macias e painéis de madeira em treliça trazem '
            'textura e calma; nos banheiros, a pedra e os espelhos com moldura de madeira mantêm a mesma '
            'linguagem, e a banheira fica de frente para a mata.',
        ], [
            'Interiors for a house surrounded by greenery, where inside and outside almost merge. In the living '
            'areas, plants trail down from the ceiling among natural-fiber pendant lights, and wide openings onto '
            'the garden let light and greenery in.',
            'The palette is natural and welcoming: wood, stone, straw and sand-toned fabrics, with the blue of '
            'the sofas as a counterpoint. In the bedrooms, upholstered headboards and wooden lattice panels bring '
            'texture and calm; in the bathrooms, stone and wood-framed mirrors carry the same language, and the '
            'bathtub faces the forest.',
        ]),
        'capa': f('_FJR9739.jpg', 'Sala de estar com parede curva de pedra, luminárias de fibra natural e o jardim ao lado',
                  'Living room with a curved stone wall, natural-fiber pendant lights and the garden beside it'),
        'capa_vertical': f('_FJR9621.jpg', 'Sala com sofá azul, mesa de centro de madeira e plantas pendentes',
                           'Living room with a blue sofa, a wooden coffee table and trailing plants'),
        'fotos': [
            f('_FJR9640.jpg', 'Estar aberto para o jardim, com plantas pendentes e luminárias de fibra natural',
              'Living area opening onto the garden, with trailing plants and natural-fiber pendant lights'),
            f('_FJR9655.jpg', 'Sala com luminárias de fibra natural entre plantas pendentes, aberta para o jardim',
              'Living room with natural-fiber pendant lights among trailing plants, opening onto the garden'),
            f('_FJR9664.jpg', 'Mesa de centro de madeira em treliça com vasos e samambaia',
              'Lattice wooden coffee table with vases and a fern'),
            f('_FJR9680.jpg', 'Estar com sofá azul, parede curva de pedra e revestimento de madeira',
              'Lounge with a blue sofa, a curved stone wall and wood paneling'),
            f('_FJR9761.jpg', 'Mesa de jantar redonda de madeira sob luminárias de fibra natural',
              'Round wooden dining table under natural-fiber pendant lights'),
            f('_FJR9907.jpg', 'Ilha da cozinha em pedra clara e madeira, com vista para o jardim',
              'Kitchen island in pale stone and wood, with a view of the garden'),
            f('_FJR9700.jpg', 'Cozinha gourmet com armários de madeira e mesas de jantar',
              'Gourmet kitchen with wooden cabinets and dining tables'),
            f('_FJR9570.jpg', 'Luminárias de fibra natural entre folhagens',
              'Natural-fiber pendant lights among foliage'),
            f('_FJR0318.jpg', 'Aparador feito de raiz de madeira, com luminária e quadro',
              'Console table made from a wooden root, with a lamp and artwork'),
            f('_FJR9789-HDR.jpg', 'Quarto com cabeceira estofada, painel de madeira em treliça e vista para a mata',
              'Bedroom with an upholstered headboard, a wooden lattice panel and a view of the forest'),
            f('_FJR9792.jpg', 'Cabeceira estofada e obra de parede com formas orgânicas',
              'Upholstered headboard and a wall piece with organic shapes'),
            f('_FJR9561.jpg', 'Banheira solta junto à janela, de frente para a mata',
              'Freestanding bathtub by the window, facing the forest'),
            f('_FJR9824-HDR.jpg', 'Quarto com painel de madeira em treliça e porta de vidro para a varanda',
              'Bedroom with a wooden lattice panel and a glass door to the balcony'),
            f('_FJR9822.jpg', 'Cama com almofadas verdes diante de painel de madeira em treliça',
              'Bed with green cushions against a wooden lattice panel'),
            f('_FJR9908.jpg', 'Lavabo com espelho oval de moldura de madeira e parede de seixos',
              'Powder room with an oval wood-framed mirror and a pebble wall'),
        ],
        'destaque': True,
    },
    {   # interiores de apartamento
        'slug': 'apartamento',
        'categoria': 'interiores',
        **ficha_pendente('nome do apartamento', 'name of the apartment'),
        'texto': t([
            'Projeto de interiores para um apartamento em que a madeira em ripas dá o tom. Ela sobe pelas '
            'paredes, percorre o teto e une os ambientes sociais, que se abrem uns para os outros, enquanto '
            'linhas de luz embutidas acompanham o desenho do ripado.',
            'Sobre essa base quente e neutra, poucos elementos ganham destaque: uma tela de cores fortes na '
            'sala, o sofá de linhas curvas, as mesas de vidro e a sala de jogos. Nos ambientes íntimos, a paleta '
            'fica mais serena, com cinzas, tecidos macios e marcenaria sob medida, do closet ao banheiro.',
        ], [
            'An interior design project for an apartment where slatted wood sets the tone. It rises up the '
            'walls, runs across the ceiling and ties together the living spaces, which open onto one another, '
            'while recessed lines of light follow the rhythm of the slats.',
            'Against this warm, neutral backdrop, only a few pieces take center stage: a boldly colored canvas '
            'in the living room, the curved sofa, the glass tables and the games room. In the private rooms the '
            'palette grows calmer, with grays, soft fabrics and custom joinery, from the walk-in closet to the '
            'bathroom.',
        ]),
        'capa': f('0A9A0504-Editar.jpg', 'Sala de jogos e estar com teto de madeira ripada e tela colorida ao fundo',
                  'Games room and lounge with a slatted wooden ceiling and a colorful canvas at the back'),
        'capa_vertical': f('0A9A0012-Editar.jpg', 'Sala com sofá curvo branco e tela colorida na parede ripada',
                           'Living room with a white curved sofa and a colorful canvas on the slatted wall'),
        'fotos': [
            f('0A9A0075-Editar-Editar-Editar-2.jpg', 'Sala de estar com sofá curvo, mesas de vidro e tela colorida',
              'Living room with a curved sofa, glass tables and a colorful canvas'),
            f('0A9A0015-Editar.jpg', 'Sofá curvo branco diante de tela colorida e paredes de madeira ripada',
              'White curved sofa in front of a colorful canvas and slatted wooden walls'),
            f('0A9A0535-Editar.jpg', 'Sala com mesas de centro de vidro e painel de madeira ao fundo',
              'Living room with glass coffee tables and a wooden panel at the back'),
            f('0A9A0362-Editar-Editar.jpg', 'Sala de jantar com mesa redonda preta, pendentes de vidro e teto de madeira',
              'Dining room with a round black table, glass pendant lights and a wooden ceiling'),
            f('0A9A0405-Editar-Editar.jpg', 'Ilha em pedra escura com banquetas pretas no espaço gourmet',
              'Dark stone island with black stools in the gourmet area'),
            f('0A9A0134-Editar.jpg', 'Cozinha com bancada de pedra e portas de vidro com caixilho preto',
              'Kitchen with a stone counter and black-framed glass doors'),
            f('0A9A9978-Editar-Editar.jpg', 'Sala de jogos com mesa de pingue-pongue, tela e teto de madeira com linhas de luz',
              'Games room with a ping-pong table, a screen and a wooden ceiling with lines of light'),
            f('0A9A0105-Editar.jpg', 'Parede e teto de madeira ripada com tela colorida ao fundo',
              'Slatted wooden wall and ceiling with a colorful canvas at the end'),
            f('0A9A0541-Editar.jpg', 'Hall de entrada revestido de madeira ripada',
              'Entrance hall lined with wooden slats'),
            f('0A9A0318-Editar.jpg', 'Quarto com parede ripada cinza, poltrona branca e banco de madeira curvado',
              'Bedroom with a gray slatted wall, a white armchair and a curved wooden bench'),
            f('0A9A0201-Editar.jpg', 'Quarto com tela escura sobre a parede ripada e cabeceira estofada',
              'Bedroom with a dark canvas on the slatted wall and an upholstered headboard'),
            f('0A9A0291-Editar-Editar.jpg', 'Closet com ilha de gavetas e marcenaria em madeira e cinza',
              'Walk-in closet with a drawer island and wood and gray joinery'),
            f('0A9A0278-Editar-Editar-Editar-2.jpg', 'Banheiro em tons de cinza com bancada ripada e box de vidro',
              'Bathroom in shades of gray with a slatted vanity and a glass shower'),
            f('0A9A0261-Editar.jpg', 'Bancada do banheiro com espelho de cantos arredondados e metais pretos',
              'Bathroom vanity with a rounded mirror and black fixtures'),
            f('0A9A0177-Editar.jpg', 'Sala íntima com poltrona branca, TV e luminária de chão',
              'Den with a white armchair, a TV and a floor lamp'),
        ],
        'destaque': True,
    },
    {   # interiores de um espaço da mostra Artefato
        'slug': 'mostra-artefato',
        'categoria': 'interiores',
        **ficha_pendente('nome do espaço da mostra Artefato', 'name of the Artefato exhibition space'),
        'texto': t([
            'Espaço criado para a mostra Artefato, com a natureza como ponto de partida. Uma sala de estar '
            'comprida, envolvida por cortinas leves, se abre para um ambiente gourmet sob cobertura de vidro, '
            'cercado de plantas.',
            'Na sala, um jardim baixo corre junto à parede, nichos iluminados recebem peças decorativas e um '
            'grande painel em degradê de azuis ocupa a parede. No espaço gourmet, o piso de pedra, a ilha em '
            'pedra clara, a luminária de fibra natural e a cadeira suspensa laranja convidam a receber sem '
            'pressa, sob a luz natural.',
        ], [
            'A space created for the Artefato exhibition, with nature as its starting point. A long living room, '
            'wrapped in light curtains, opens onto a gourmet area under a glass roof, surrounded by plants.',
            'In the living room, a low garden runs along the wall, lit niches hold decorative pieces and a large '
            'panel in shades of blue covers the wall. In the gourmet area, the stone floor, the pale stone '
            'island, the natural-fiber pendant light and the orange hanging chair invite unhurried gatherings in '
            'natural light.',
        ]),
        'capa': f('0A9A1378-Editar-Editar-Editar-Editar.jpg',
                  'Sala de estar comprida com sofás claros, pufes de fibra natural e painel em degradê de azuis',
                  'Long living room with pale sofas, natural-fiber poufs and a panel in shades of blue'),
        'capa_vertical': f('0A9A1288-Editar.jpg', 'Cadeira suspensa laranja de fibra no espaço gourmet',
                           'Orange woven hanging chair in the gourmet area'),
        'fotos': [
            f('0A9A1378-Editar-Editar-Editar-Editar.jpg',
              'Sala de estar comprida com sofás claros, pufes de fibra natural e painel em degradê de azuis',
              'Long living room with pale sofas, natural-fiber poufs and a panel in shades of blue'),
            f('0A9A1388-Editar-Editar.jpg', 'Sala com jardim baixo junto à parede e pufe de fibra natural',
              'Living room with a low garden along the wall and a natural-fiber pouf'),
            f('0A9A1357-Editar.jpg', 'Sofá branco diante do painel em degradê de azuis',
              'White sofa in front of the blue gradient panel'),
            f('0A9A1342-Editar.jpg', 'Poltrona clara diante de nichos iluminados com peças decorativas',
              'Pale armchair in front of lit niches with decorative pieces'),
            f('0A9A1294-Editar.jpg', 'Ilha de pedra com banquetas de madeira no espaço gourmet',
              'Stone island with wooden stools in the gourmet area'),
            f('0A9A1210-Editar.jpg', 'Espaço gourmet sob teto de vidro, com mesa redonda e luminária de fibra natural',
              'Gourmet area under a glass roof, with a round table and a natural-fiber pendant light'),
            f('0A9A1288-Editar.jpg', 'Cadeira suspensa laranja de fibra no espaço gourmet',
              'Orange woven hanging chair in the gourmet area'),
            f('0A9A1249-Editar.jpg', 'Mesa redonda com cadeiras estofadas, cercada de plantas',
              'Round table with upholstered chairs, surrounded by plants'),
            f('0A9A1272.jpg', 'Mesa alta junto a uma árvore, sobre piso de pedra',
              'High table beside a tree, on a stone floor'),
        ],
        'destaque': True,
    },
]

# abertura da página inicial: foto vertical em telas em pé (celular) e horizontal em telas deitadas.
# Pedido do escritório em 26/11/2026: "uma foto vertical marcante e bem bonita".
ABERTURA = {
    'projeto': 'casa-interiores',
    'vertical': PROJETOS[1]['fotos'][1],        # _FJR9655
    'horizontal': PROJETOS[1]['fotos'][0],      # _FJR9640
}
