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
#   fotos: arquivos em imagens/projetos/<slug>/ (vazio = marcadores de foto)
#   capa: a foto da abertura, das faixas e dos cards
# Os projetos de exemplo abaixo só existem para o site de teste e devem ser trocados pelos reais.

def exemplo(n, categoria, destaque):
    return {
        'slug': f'projeto-exemplo-{n}',
        'exemplo': True,
        'nome': t(PREENCHER(f'nome do projeto {n}'), PREENCHER(f'project name {n}')),
        'categoria': categoria,
        'cidade': PREENCHER('cidade'),
        'uf': '',
        'ano': PREENCHER('ano'),
        'area': PREENCHER('área em m2'),
        'situacao': None,                       # 'concluido' ou 'andamento'
        'fotografo': PREENCHER('fotógrafo'),
        'texto': t([PREENCHER('texto curto do projeto')], [PREENCHER('short project text')]),
        'fotos': [],
        'destaque': destaque,
    }


PROJETOS = [
    exemplo(1, 'residencial', True),
    exemplo(2, 'interiores', True),
    exemplo(3, 'comercial', True),
    exemplo(4, 'incorporacao', False),
]
