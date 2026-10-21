#!/usr/bin/env python3
"""
Monta a nova versão do site, na pasta /novo, a partir deste arquivo.

O topo, o menu e o rodapé ficam aqui uma vez só e entram nas quatro páginas:
    novo/index.html, novo/biografia.html, novo/compra-e-venda.html, novo/embarcacao.html
O estilo fica em novo/estilo.css e o script comum em novo/site.js.
As fotos, o vídeo e a lista de barcos são os mesmos da versão atual (pastas imagens/, video/ e dados/).
Para adicionar ou marcar um barco como vendido, basta editar dados/barcos.js: vale para as duas versões.

Depois de mudar este arquivo, rode na raiz do site:
    python3 _ferramentas/novo.py
"""
import os

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAIDA = os.path.join(RAIZ, 'novo')
BASE = 'https://gabrielpickleralves.github.io/websites/novo/'
R = '../'                       # caminho até a raiz, onde estão imagens/, video/ e dados/
WPP = 'https://wa.me/5512997292082'
MAPS = 'https://www.google.com/maps/search/?api=1&amp;query=Marina%20Boreste%2C%20Barra%20do%20Una%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP&amp;query_place_id=ChIJS2xwpZCIzZQRFnlkunPgOQ8'
MAPS_POUSADA = 'https://www.google.com/maps/search/?api=1&amp;query=Pousada%20Una%2C%20Rua%20Petr%C3%B3polis%2C%2080%2C%20Barra%20do%20Una%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP&amp;query_place_id=ChIJ14_vbpqIzZQRNGed2SGEBd8'
ROTA = 'https://www.google.com/maps/dir/?api=1&amp;destination=Marina%20Boreste%2C%20Barra%20do%20Una%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP&amp;destination_place_id=ChIJS2xwpZCIzZQRFnlkunPgOQ8'
NOVA = '<span class="sr"> (abre em nova aba)</span>'

I = {
    'wpp': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3.6 20.4l1.3-4.4a8.4 8.4 0 1 1 3.2 3.1z"/><path d="M9.2 8.3c-.3 2.8 2.9 6.4 6.3 6.5l1-1.6-2-1.1-.9.9c-.9-.4-1.8-1.3-2.3-2.4l.9-.9-1.1-2z"/></svg>',
    'insta': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></svg>',
    'fb': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14.2 8.4V6.9c0-.8.5-1.2 1.3-1.2h1.6V3h-2.5c-2.4 0-3.6 1.5-3.6 3.7v1.7H8.7v3h2.3V21h3.2v-9.6h2.5l.4-3z"/></svg>',
    'volta': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    'mais': '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M8 2v12M2 8h12"/></svg>',
    'pausa': '<svg class="i-pausa" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M3 2h3v10H3zM8 2h3v10H8z" fill="currentColor"/></svg><svg class="i-play" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M3 1.5v11l9-5.5z" fill="currentColor"/></svg>',
}


def img(nome, larguras, alt, sizes, w, h, extra='', classe=''):
    """<img> com srcset das versões .webp que já existem na pasta imagens/."""
    srcset = ', '.join(f'{R}imagens/{nome}-{l}.webp {l}w' for l in larguras)
    c = f' class="{classe}"' if classe else ''
    return (f'<img{c} src="{R}imagens/{nome}-{larguras[-1]}.webp" srcset="{srcset}" sizes="{sizes}" '
            f'alt="{alt}" width="{w}" height="{h}" loading="lazy" decoding="async"{extra}>')


def cabeca(titulo, descricao, caminho, extra=''):
    return f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titulo}</title>
<meta name="description" content="{descricao}">
<meta name="theme-color" content="#142A22">
<meta name="color-scheme" content="light">
<meta name="format-detection" content="telephone=no">
<link rel="canonical" href="{BASE}{caminho}">
<meta property="og:url" content="{BASE}{caminho}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Marina Boreste">
<meta property="og:title" content="{titulo}">
<meta property="og:description" content="{descricao}">
<meta property="og:image" content="https://gabrielpickleralves.github.io/websites/imagens/marina-boreste-compartilhamento.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{R}favicon.ico" sizes="48x48">
<link rel="icon" href="{R}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="{R}apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&amp;family=IBM+Plex+Mono:wght@400;500&amp;family=Instrument+Sans:wght@400..700&amp;display=swap">
<link rel="stylesheet" href="estilo.css">
{extra}<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="pula" href="#conteudo">Pular para o conteúdo</a>
'''


def topo(pagina):
    inicio = 'index.html' if pagina != 'index' else '#inicio'
    sec = (lambda s: s) if pagina == 'index' else (lambda s: 'index.html' + s)
    atual = lambda p: ' aria-current="page"' if p == pagina or (p == 'compra-e-venda' and pagina == 'embarcacao') else ''
    solido = '' if pagina == 'index' else ' solido'
    links = [
        (sec('#servicos'), 'Serviços', ''),
        (sec('#infraestrutura'), 'Infraestrutura', ''),
        ('compra-e-venda.html', 'Embarcações à venda', atual('compra-e-venda')),
        ('biografia.html', 'Biografia', atual('biografia')),
        (sec('#localizacao'), 'Localização', ''),
        (sec('#contato'), 'Contato', ''),
    ]
    nav = '\n'.join(f'      <a href="{h}"{a}>{t}</a>' for h, t, a in links)
    menu = '\n'.join(f'        <li><a href="{h}"{a} data-fecha>{t}</a></li>' for h, t, a in links)
    return f'''<header class="topo{solido}" data-topo>
  <div class="wrap topo-dentro">
    <a class="logo" href="{inicio}" aria-label="Marina Boreste, página inicial">
      <img class="l-neg" src="{R}imagens/logo-marina-boreste-negativo.svg" alt="" width="470" height="180">
      <img class="l-cor" src="{R}imagens/logo-marina-boreste.svg" alt="" width="470" height="180">
    </a>
    <nav class="nav" aria-label="Principal">
{nav}
    </nav>
    <div class="topo-acoes">
      <a class="btn btn-azul" href="{WPP}" target="_blank" rel="noopener">{I['wpp']}<span class="wpp-txt">WhatsApp</span><span class="sr"> da Marina Boreste (abre em nova aba)</span></a>
      <button class="btn btn-linha abre-menu" type="button" data-abre-menu aria-haspopup="dialog" aria-expanded="false">Menu</button>
    </div>
  </div>
  <dialog class="menu" id="menu" aria-label="Menu">
    <div class="wrap menu-dentro">
      <div class="menu-topo">
        <a class="logo" href="{inicio}" aria-label="Marina Boreste, página inicial" data-fecha><img src="{R}imagens/logo-marina-boreste-negativo.svg" alt="" width="470" height="180"></a>
        <button class="btn btn-linha" type="button" data-fecha-menu>Fechar</button>
      </div>
      <nav aria-label="Menu"><ul>
{menu}
      </ul></nav>
      <div class="menu-pe">
        <span>Segunda a domingo, das 8h às 17h</span>
        <a href="tel:+5512997292082"><span class="sr">Telefone: </span>(12) 99729-2082</a>
        <a href="mailto:atendimento@boreste.com.br"><span class="sr">E-mail: </span>atendimento@boreste.com.br</a>
      </div>
    </div>
  </dialog>
</header>
'''


def rodape(pagina):
    sec = (lambda s: s) if pagina == 'index' else (lambda s: 'index.html' + s)
    inicio = '#inicio' if pagina == 'index' else 'index.html'
    return f'''<footer class="escuro rodape">
  <div class="wrap">
    <div class="rodape-grid">
      <div>
        <a class="logo" href="{inicio}" aria-label="Marina Boreste, página inicial"><img src="{R}imagens/logo-marina-boreste-negativo.svg" alt="" width="470" height="180" loading="lazy"></a>
        <p style="margin-top:20px;max-width:34ch">Infraestrutura e serviços para a guarda, manutenção, compra e venda de embarcações, sempre em harmonia com o meio ambiente.</p>
      </div>
      <nav aria-labelledby="r-marina">
        <h2 id="r-marina">A marina</h2>
        <ul>
          <li><a href="{sec('#servicos')}">Serviços</a></li>
          <li><a href="{sec('#infraestrutura')}">Infraestrutura</a></li>
          <li><a href="compra-e-venda.html">Embarcações à venda</a></li>
          <li><a href="biografia.html">Biografia</a></li>
          <li><a href="{sec('#localizacao')}">Localização</a></li>
          <li><a href="{sec('#contato')}">Contato</a></li>
        </ul>
      </nav>
      <div>
        <h2>Marina Boreste</h2>
        <address>
          <a class="ext" href="{MAPS}" target="_blank" rel="noopener">Rua Petrópolis, 215, Barra do Una<br>São Sebastião (SP), CEP 11624-179<span class="sr"> (ver no Google Maps, abre em nova aba)</span></a><br>
          <a href="tel:+551238671550"><span class="sr">Telefone: </span>(12) 3867-1550</a><br>
          <a href="tel:+5512997292082"><span class="sr">Celular e WhatsApp: </span>(12) 99729-2082</a><br>
          <a href="mailto:boreste@boreste.com.br"><span class="sr">E-mail: </span>boreste@boreste.com.br</a>
        </address>
        <div class="redes">
          <a class="rede" href="https://www.instagram.com/marinaboreste/" target="_blank" rel="noopener" aria-label="Instagram da Marina Boreste, @marinaboreste (abre em nova aba)">{I['insta']}</a>
          <a class="rede" href="{WPP}" target="_blank" rel="noopener" aria-label="WhatsApp da Marina Boreste (abre em nova aba)">{I['wpp']}</a>
        </div>
      </div>
      <div>
        <h2>Pousada Una</h2>
        <address>
          <a class="ext" href="{MAPS_POUSADA}" target="_blank" rel="noopener">Rua Petrópolis, 80, Barra do Una<br>São Sebastião (SP)<span class="sr"> (ver no Google Maps, abre em nova aba)</span></a><br>
          <a href="tel:+551238671515"><span class="sr">Telefone: </span>(12) 3867-1515</a><br>
          <a class="ext" href="https://pousadauna.com.br/" target="_blank" rel="noopener">pousadauna.com.br<span class="sr"> (site da Pousada Una, abre em nova aba)</span></a>
        </address>
        <div class="redes">
          <a class="rede" href="https://www.instagram.com/pousadauna/" target="_blank" rel="noopener" aria-label="Instagram da Pousada Una, @pousadauna (abre em nova aba)">{I['insta']}</a>
          <a class="rede" href="https://www.facebook.com/pousadauna/" target="_blank" rel="noopener" aria-label="Facebook da Pousada Una (abre em nova aba)">{I['fb']}</a>
        </div>
      </div>
    </div>
    <div class="rodape-fim">
      <span>© 2026 Marina Boreste</span>
      <span>23°45'29"S 45°45'40"W · VHF 74 · Segunda a domingo, 8h às 17h</span>
    </div>
  </div>
</footer>
'''


def pe(scripts=''):
    return f'''<script src="site.js"></script>
{scripts}</body>
</html>
'''


# ------------------------------------------------------------------ início
SERVICOS = [
    ('garageamento', 'Garageamento', 'Vaga seca e coberta, sem empilhamento.', 'Lancha em carreta sob a cobertura da garagem náutica',
     ['As embarcações são manobradas em suas carretas e guardadas nos galpões em vaga seca, coberta, com piso impermeável.']),
    ('rampagem', 'Rampagem', 'Seu barco na água quando você pedir.', 'Lancha em carreta descendo a rampa para o Rio Una',
     ['A colocação ou retirada da embarcação da água é feita a pedido do proprietário, ou de pessoa por ele autorizada.',
      'As solicitações podem ser feitas diretamente na recepção da Marina Boreste, por telefone e e-mail.',
      'Sempre é respeitada a ordem de chegada dos pedidos.', 'Este serviço é exclusivo para clientes da Marina.']),
    ('lavagem', 'Lavagem', 'Com produtos biodegradáveis.', 'Funcionário da Marina Boreste lavando uma lancha',
     ['Sempre que necessário, as embarcações são lavadas por profissionais especializados e treinados.',
      'Neste processo são utilizados produtos biodegradáveis em quantidades adequadas, conforme as orientações do “Projeto Marinas”.']),
    ('acionamento', 'Acionamento', 'Motor checado no seco toda semana.', 'Profissional com protetor auricular conferindo uma lancha no seco',
     ['Uma vez por semana as embarcações são acionadas no seco por um profissional especialmente treinado para esta função.',
      'O intuito é checar não só o funcionamento do motor, mas também diversos outros itens importantes para uma navegação segura.',
      'O cliente fica sabendo com antecedência caso alguma anomalia seja identificada.']),
    ('apoio-de-radio', 'Apoio de rádio', 'Escuta no VHF canal 74.', 'Rádio VHF da recepção sintonizado no canal 74',
     ['Para maior segurança dos clientes, a Marina Boreste mantém escuta via rádio VHF, canal 74, e também telefones, desde o momento da saída do primeiro navegante para o mar até o retorno do último.']),
    ('resgate', 'Resgate', 'Em caso de pane, sem custo adicional.', 'Bote inflável em carreta no pátio da marina',
     ['Em caso de pane no mar, o serviço de resgate poderá ser solicitado sem custos adicionais.',
      'Este serviço é prestado por embarcação especialmente preparada, sujeito a regras de horário, área de cobertura, condições de mar e maré, conforme descrito no Regulamento Interno da Marina Boreste.']),
    ('bebidas-e-gelo', 'Bebidas e gelo', 'Para levar a bordo ou tomar no bar.', 'Geladeira de bebidas e freezer de gelo',
     ['Gelo e bebidas, para levar a bordo ou consumir no bar da Marina Boreste, também podem ser adquiridos.']),
    ('abastecimento', 'Abastecimento', 'Píer de combustível a 300 m.', 'Funcionário da marina ao lado de uma lancha em carreta',
     ['No canal de Barra do Una, a aproximadamente 300 m da Marina Boreste, no sentido de quem navega para o mar, existe um píer de abastecimento aberto ao público, onde se pode adquirir diesel ou gasolina.',
      'Caso o cliente prefira trazer o seu próprio combustível, a Marina Boreste disponibiliza bomba especial para transferência de líquidos, para que abasteça seu barco com total segurança.']),
    ('seguranca', 'Segurança', 'Câmeras 24 h, vigia e seguro completo.', 'Câmeras de monitoramento na cobertura do galpão',
     ['Além de monitoramento 24 horas por sistema de câmeras, vigia noturno e cão de guarda, a Marina Boreste mantém apólice de seguro com cobertura completa para todas as embarcações, enquanto estiverem sob sua responsabilidade.']),
]

INFRA = [
    ('garageamento', [400, 680], 'Garagem náutica', '3.000 m² de galpões', 'Lancha em carreta sob o galpão da garagem náutica',
     ['Com 3.000 m² de área, os galpões da Marina Boreste foram projetados visando a máxima proteção das embarcações.',
      'Pisos impermeáveis, canaletas e caixas separadoras de água e óleo devidamente instaladas mantêm a Marina Boreste dentro dos padrões do “Projeto Marinas” e em conformidade com as regulamentações da CETESB.',
      'Guarda embarcações de até 10 toneladas, entre jets, infláveis e lanchas, sem a necessidade de empilhamento.']),
    ('pier', [400, 680], 'Amplo píer', 'Águas abrigadas do Rio Una', 'Lanchas atracadas no píer flutuante, com a Mata Atlântica ao fundo',
     ['Amplo píer de atracação, com área exclusiva para embarque e desembarque, situado nas águas abrigadas e praticamente doces do Rio Una.',
      'Capacidade para atender aos clientes que, com o intuito de agilizar a saída no dia seguinte, prefiram o pernoite da embarcação na água com total segurança.']),
    ('rampagem', [400, 680], 'Rampa', 'Dois sistemas de operação', 'Lancha em carreta na rampa de acesso ao Rio Una',
     ['A colocação e a retirada das embarcações são feitas pela rampa de acesso.',
      'Dois sistemas distintos estão disponíveis para garantir maior segurança e risco zero de interrupção nas operações.',
      'A Marina Boreste dispõe de tratores que podem trabalhar simultaneamente, agilizando a operação.']),
    ('recepcao', [400, 680], 'Recepção e conveniência', 'Rádio, TV e EasyMarine', 'Recepção da Marina Boreste, com balcão de atendimento e mapa da região',
     ['A entrada da Marina conta com um balcão de atendimento com rádio, TV e acesso ao EasyMarine, por onde acompanhamos todos os processos em tempo real.',
      'Além da área de atendimento, é possível conferir o mapa da região, verificar as condições de navegação atualizadas semanalmente e adquirir bebidas geladas e gelo para o seu passeio.']),
    ('lazer', [400, 680, 1360], 'Lazer e conforto', 'Bar, piscina e Wi-Fi', 'Deck de acesso ao Rio Una, com a garagem náutica ao fundo',
     ['Uma agradável área junto às margens do Rio Una, reservada para o conforto e o lazer dos navegantes e de sua família.',
      'Sentado no bar à beira da piscina, é possível relaxar curtindo a linda vista do rio e da Mata Atlântica, sem deixar de navegar pela internet com o Wi-Fi disponível.']),
    ('oficina', [400, 680], 'Oficina e maquinário', 'Reparos no local', 'Painel de ferramentas da oficina',
     ['Espaço destinado a reparos de embarcações, equipado com diversas ferramentas: talha, compressor, carregador de baterias, bomba de combustível, macacos hidráulicos, lavadora de alta pressão etc.']),
]


def pagina_inicio():
    srv_fotos = '\n'.join(
        f'          <img src="{R}imagens/{k}-680.webp" alt="" width="680" height="680" loading="{"eager" if i == 0 else "lazy"}" decoding="async" data-srv-foto="{k}" data-legenda="{alt}"{" class=\"ativa\"" if i == 0 else ""}>'
        for i, (k, t, r, alt, ps) in enumerate(SERVICOS))
    srv_lista = '\n'.join(f'''        <li><details data-srv="{k}">
          <summary><h3>{t}</h3><span class="resumo">{r}</span><span class="sinal">{I['mais']}</span></summary>
          <div class="corpo">{img(k, [400, 680], alt, '100vw', 680, 680)}
            {''.join(f'<p>{p}</p>' for p in ps)}</div>
        </details></li>''' for k, t, r, alt, ps in SERVICOS)
    infra = '\n'.join(f'''      <article class="linha-infra" aria-labelledby="i-{k}">
        <div class="li-img">{img(k, ls, alt, '(max-width:860px) 100vw, 58vw', 680, 680)}</div>
        <div class="li-txt"><p class="dado">{d}</p><h3 id="i-{k}">{t}</h3>
          {''.join(f'<p>{p}</p>' for p in ps)}</div>
      </article>''' for k, ls, t, d, alt, ps in INFRA)

    preload = f'<link rel="preload" as="image" href="{R}video/marina-boreste-barcos-capa-720.webp" fetchpriority="high">\n'
    return cabeca('Marina Boreste | Barra do Una, São Sebastião (SP)',
                  'Marina Boreste: guarda, manutenção, compra e venda de embarcações, com mais de 40 anos de experiência nas águas de Barra do Una, litoral norte de São Paulo.',
                  '', preload) + topo('index') + f'''<main id="conteudo" tabindex="-1">
<!-- ================= HERO: o vídeo de drone e o painel de bordo ================= -->
<section class="hero" id="inicio" aria-labelledby="titulo">
  <div class="hero-midia">
    <img src="{R}video/marina-boreste-barcos-capa-720.webp" alt="" width="720" height="1280" fetchpriority="high">
    <video muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" poster="{R}video/marina-boreste-barcos-capa-720.webp" data-video>
      <source src="{R}video/marina-boreste-barcos.webm" type="video/webm">
      <source src="{R}video/marina-boreste-barcos-leve.mp4" type="video/mp4">
    </video>
  </div>
  <div class="wrap hero-txt">
    <h1 id="titulo"><span class="ln"><span>Entre o Rio Una e o mar,</span></span> <span class="ln"><span>sua embarcação</span></span> <span class="ln"><span>em boas mãos.</span></span></h1>
    <p class="hero-sub">Guarda, manutenção, compra e venda de embarcações há mais de 40 anos em Barra do Una, litoral norte de São Paulo.</p>
    <div class="hero-ctas">
      <a class="btn btn-azul" href="{WPP}" target="_blank" rel="noopener">{I['wpp']}Falar pelo WhatsApp<span class="sr"> com a Marina Boreste (abre em nova aba)</span></a>
      <a class="btn btn-linha" href="#servicos">Conhecer os serviços</a>
      <button class="pausa" type="button" data-pausa hidden>{I['pausa']}<span data-pausa-txt>Pausar vídeo</span></button>
    </div>
  </div>
  <div class="painel">
    <div class="wrap">
      <ul aria-label="Dados da marina">
        <li><span class="luz" aria-hidden="true"></span><span class="luz-txt" aria-hidden="true">Boreste:<br>luz verde</span></li>
        <li><span class="rot">Posição</span><span class="val">23°45'29"S 45°45'40"W</span></li>
        <li><span class="rot">Rádio</span><span class="val">VHF canal 74</span></li>
        <li><span class="rot">Horário</span><span class="val">Todos os dias, 8h–17h</span></li>
        <li><span class="rot">Telefone e WhatsApp</span><a class="val" href="tel:+5512997292082">(12) 99729-2082</a></li>
      </ul>
    </div>
  </div>
</section>

<!-- ================= ABERTURA ================= -->
<section class="sec abertura" id="sobre" aria-labelledby="t-sobre">
  <div class="wrap">
    <div class="abertura-grid">
      <div>
        <h2 id="t-sobre">Mais de 40 anos nas águas de Barra do Una</h2>
        <p class="lead">Com a Marina Boreste você navega tranquilo em uma das mais belas regiões do litoral paulista. Conte com a estrutura e o apoio de quem tem mais de 40 anos de experiência nas águas de Barra do Una.</p>
        <a class="btn btn-linha" href="biografia.html">Conhecer a nossa história</a>
      </div>
      <figure>
        {img('barra-do-una', [420, 840], 'Vista aérea de Barra do Una: o Rio Una chegando ao mar, com a praia e a Mata Atlântica', '(max-width:860px) 100vw, 45vw', 840, 900)}
        <figcaption>Barra do Una, onde o Rio Una encontra o mar.</figcaption>
      </figure>
    </div>
    <ul class="numeros">
      <li><b>40<small>+ anos</small></b><span>de experiência nas águas de Barra do Una</span></li>
      <li><b>3.000<small>m²</small></b><span>de galpões na garagem náutica</span></li>
      <li><b>10<small>t</small></b><span>por embarcação, sem empilhamento</span></li>
      <li><b>24<small>h</small></b><span>de monitoramento por câmeras</span></li>
    </ul>
  </div>
</section>

<!-- ================= SERVIÇOS: lista com a foto que acompanha ================= -->
<section class="sec servicos" id="servicos" aria-labelledby="t-servicos">
  <div class="wrap">
    <div class="cab">
      <h2 id="t-servicos">Serviços</h2>
      <p class="lead">Tudo o que a sua embarcação precisa em terra e no mar. Abra cada serviço para ler os detalhes.</p>
    </div>
    <div class="srv">
      <figure class="srv-foto" aria-hidden="true">
        <div class="quadro">
{srv_fotos}
        </div>
        <figcaption data-srv-legenda>{SERVICOS[0][3]}</figcaption>
      </figure>
      <ul class="srv-lista">
{srv_lista}
      </ul>
    </div>
  </div>
</section>

<!-- ================= INFRAESTRUTURA ================= -->
<section class="sec escuro infra" id="infraestrutura" aria-labelledby="t-infra">
  <div class="wrap">
    <div class="cab">
      <h2 id="t-infra">Infraestrutura</h2>
      <p class="lead">Galpões, píer, rampa, oficina e uma área de lazer à beira do Rio Una, dentro dos padrões do “Projeto Marinas” e das regulamentações da CETESB.</p>
    </div>
    <div class="linhas">
{infra}
    </div>
  </div>
</section>

<!-- ================= FOTO DO PÍER ================= -->
<div class="banda">
  {img('pier-garagem-nautica', [640, 960, 1280, 1920], 'Lanchas atracadas em frente à garagem náutica da Marina Boreste, no Rio Una', '100vw', 1920, 960)}
  <div class="wrap"><p>Nas águas abrigadas e praticamente doces do Rio Una.</p></div>
</div>

<!-- ================= EMBARCAÇÕES À VENDA (vêm de dados/barcos.js) ================= -->
<section class="sec vendas" id="vendas" aria-labelledby="t-vendas">
  <div class="wrap">
    <div class="cab">
      <h2 id="t-vendas">Embarcações à venda</h2>
      <p class="lead">Barcos à venda aqui na marina. Os preços são negociáveis e todo o atendimento é feito pelo WhatsApp.</p>
    </div>
    <ul class="barcos" data-barcos data-limite="3"></ul>
    <div class="vazio" data-barcos-vazio hidden>
      <p>No momento não há embarcações anunciadas. Fale com a gente pelo WhatsApp para saber das próximas oportunidades.</p>
      <a class="btn btn-azul" href="{WPP}?text=Ol%C3%A1!%20Quero%20saber%20das%20pr%C3%B3ximas%20oportunidades%20de%20barcos%20%C3%A0%20venda%20na%20Marina%20Boreste." target="_blank" rel="noopener">{I['wpp']}Falar no WhatsApp{NOVA}</a>
    </div>
    <div class="vendas-rodape">
      <p>Quer saber se há outras embarcações à venda? Pergunte à nossa atendente.</p>
      <a class="btn btn-linha" href="compra-e-venda.html">Ver todas as embarcações</a>
    </div>
  </div>
</section>

<!-- ================= POUSADA UNA ================= -->
<section class="sec pousada" id="pousada" aria-labelledby="t-pousada">
  <div class="wrap pousada-grid">
    <div class="pousada-fotos">
      {img('pousada-una-aerea', [660, 1320], 'Vista aérea da Pousada Una, com piscina e deck à beira do Rio Una; ao fundo, as lanchas da Marina Boreste', '(max-width:860px) 58vw, 34vw', 1320, 780, classe='f1')}
      {img('pousada-una-piscina', [420, 630, 1260], 'Piscina da Pousada Una, cercada por palmeiras e primaveras em flor', '(max-width:860px) 42vw, 24vw', 1260, 840, classe='f2')}
    </div>
    <div class="pousada-txt">
      <h2 id="t-pousada">Pousada Una</h2>
      <p class="lead">Parceira da marina e parte do mesmo empreendimento, a Pousada Una fica a 50 metros daqui, na mesma rua.</p>
      <p>Pousada e restaurante à beira do Rio Una, com acomodações confortáveis, piscina, deck voltado para o rio, jardim arborizado e píer para embarcações.</p>
      <p>Clientes da Marina Boreste têm benefícios exclusivos na hospedagem e acesso ao restaurante da pousada, uma boa pedida para o almoço depois do passeio de barco.</p>
      <ul class="canais">
        <li><span class="rot">Endereço</span><a class="ext" href="{MAPS_POUSADA}" target="_blank" rel="noopener">Rua Petrópolis, 80, Barra do Una, São Sebastião (SP), CEP 11624-179<span class="sr"> (ver no Google Maps, abre em nova aba)</span></a></li>
        <li><span class="rot">Reservas</span><a href="tel:+551238671515"><span class="sr">Telefone de reservas: </span>(12) 3867-1515</a></li>
        <li><span class="rot">Site</span><a class="ext" href="https://pousadauna.com.br/" target="_blank" rel="noopener">pousadauna.com.br<span class="sr"> (site da Pousada Una, abre em nova aba)</span></a></li>
      </ul>
      <div class="redes">
        <a class="rede" href="https://www.instagram.com/pousadauna/" target="_blank" rel="noopener">{I['insta']}<span class="sr">Instagram </span>@pousadauna{NOVA}</a>
        <a class="rede" href="https://www.facebook.com/pousadauna/" target="_blank" rel="noopener" aria-label="Facebook da Pousada Una (abre em nova aba)">{I['fb']}</a>
        <a class="rede" href="https://pousadauna.com.br/whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp da Pousada Una (abre em nova aba)">{I['wpp']}</a>
      </div>
    </div>
  </div>
</section>

<!-- ================= LOCALIZAÇÃO ================= -->
<section class="sec escuro local" id="localizacao" aria-labelledby="t-local">
  <div class="wrap">
    <div class="cab">
      <h2 id="t-local">Localização</h2>
      <p class="lead">Em Barra do Una, no litoral norte de São Paulo, entre o Rio Una e o mar, com acesso facilitado às ilhas da região entre Bertioga e Ilhabela.</p>
    </div>
    <div class="local-grid">
      <div class="local-txt">
        <h3 style="margin-top:0">Vindo de São Paulo e região</h3>
        <ul class="rotas">
          <li>Rodovia dos Imigrantes</li>
          <li>Mogi-Bertioga</li>
          <li>Rodovia dos Tamoios</li>
        </ul>
        <p style="margin-top:12px">Dica: conheça a Rota 55 do litoral paulista e seus encantos.</p>
        <h3>Vindo do mar</h3>
        <div class="coord">
          <p class="dado" style="margin:0"><span>23°45'29.0"S 45°45'40.2"W</span><span id="coord">-23.758062, -45.761177</span></p>
          <button class="btn btn-linha" type="button" data-copia="-23.758062, -45.761177">Copiar coordenadas</button>
          <p class="sr" role="status" data-copia-status></p>
        </div>
        <p style="margin-top:12px">Rádio VHF canal 74, da primeira saída ao último retorno.</p>
        <h3>Nosso endereço</h3>
        <p><a class="ext" href="{MAPS}" target="_blank" rel="noopener">Rua Petrópolis, 215, Barra do Una<br>São Sebastião (SP), CEP 11624-179<span class="sr"> (ver no Google Maps, abre em nova aba)</span></a></p>
      </div>
      <div class="mapa">
        <iframe title="Marina Boreste no Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Marina%20Boreste%2C%20Barra%20do%20Una%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP&amp;z=16&amp;output=embed"></iframe>
        <div class="mapa-links">
          <a class="btn btn-azul" href="{ROTA}" target="_blank" rel="noopener">Traçar rota<span class="sr"> até a Marina Boreste no Google Maps (abre em nova aba)</span></a>
          <a class="btn btn-linha ext" href="{MAPS}" target="_blank" rel="noopener">Abrir no Google Maps{NOVA}</a>
        </div>
        <figure class="mapa-foto">
          {img('mapa-barra-do-una', [400, 800], 'Vista aérea de Barra do Una com a Praia do Una, a Pousada Una e a Marina Boreste marcadas', '(max-width:860px) 100vw, 55vw', 800, 800)}
          <figcaption>A Praia do Una, a Pousada Una e a Marina Boreste vistas de cima.</figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>

<!-- ================= CONTATO ================= -->
<section class="sec contato" id="contato" aria-labelledby="t-contato">
  <div class="wrap contato-grid">
    <div>
      <h2 id="t-contato">Vamos conversar?</h2>
      <p class="lead">Atendimento de segunda a domingo, das 8h às 17h.</p>
      <ul class="canais">
        <li><span class="rot">WhatsApp</span><a class="ext" href="{WPP}" target="_blank" rel="noopener">(12) 99729-2082<span class="sr"> (WhatsApp, abre em nova aba)</span></a></li>
        <li><span class="rot">Telefone/fax</span><a href="tel:+551238671550">(12) 3867-1550</a></li>
        <li><span class="rot">E-mail</span><span><a href="mailto:atendimento@boreste.com.br">atendimento@boreste.com.br</a><br><a href="mailto:boreste@boreste.com.br">boreste@boreste.com.br</a></span></li>
        <li><span class="rot">Instagram</span><a class="ext" href="https://www.instagram.com/marinaboreste/" target="_blank" rel="noopener">@marinaboreste{NOVA}</a></li>
      </ul>
    </div>
    <form class="form" data-form novalidate aria-describedby="form-instr">
      <p class="form-instr" id="form-instr">Todos os campos são obrigatórios.</p>
      <div class="campo">
        <label for="f-nome">Seu nome</label>
        <input id="f-nome" name="nome" type="text" autocomplete="name" required aria-describedby="e-nome">
        <p class="erro" id="e-nome" hidden></p>
      </div>
      <div class="campo">
        <label for="f-email">Seu e-mail</label>
        <input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" spellcheck="false" required aria-describedby="e-email">
        <p class="erro" id="e-email" hidden></p>
      </div>
      <div class="campo">
        <label for="f-assunto">Assunto</label>
        <select id="f-assunto" name="assunto" required aria-describedby="e-assunto">
          <option value="">Selecione o assunto</option>
          <option>Valores e serviços</option>
          <option>Compra de embarcação</option>
          <option>Sugestões e reclamações</option>
          <option>Benefício Pousada do Una (hospedagem e restaurante)</option>
          <option>Outros assuntos</option>
        </select>
        <p class="erro" id="e-assunto" hidden></p>
      </div>
      <div class="campo">
        <label for="f-mensagem">Mensagem</label>
        <textarea id="f-mensagem" name="mensagem" rows="5" required aria-describedby="e-mensagem"></textarea>
        <p class="erro" id="e-mensagem" hidden></p>
      </div>
      <div class="form-acoes">
        <button class="btn btn-azul" type="submit" value="whatsapp">{I['wpp']}Enviar pelo WhatsApp{NOVA}</button>
        <button class="btn btn-linha" type="submit" value="email">Enviar por e-mail</button>
      </div>
      <p class="form-nota">A mensagem abre pronta no seu WhatsApp ou no seu programa de e-mail; é só confirmar o envio.</p>
      <p class="sr" role="status" data-form-status></p>
    </form>
  </div>
</section>
</main>
''' + rodape('index') + pe(f'<script src="{R}dados/barcos.js"></script>\n<script src="barcos.js"></script>\n')


def pagina_biografia():
    return cabeca('Biografia | Marina Boreste',
                  'Missão: Proporcionar infraestrutura e serviços ideais para a guarda, manutenção, compra e venda de embarcações, sempre em harmonia com o meio ambiente.',
                  'biografia.html') + topo('biografia') + f'''<main id="conteudo" class="interna" tabindex="-1">
<div class="wrap">
  <a class="volta" href="index.html">{I['volta']}Voltar ao início</a>
  <header class="interna-cab">
    <h1>Nossa história</h1>
    <p class="lead">Da paixão de um navegante, em meados da década de 70, a uma marina administrada pela família há mais de 40 anos.</p>
  </header>
  <div class="historia">
    <figure>
      {img('marina-vista-aerea', [400, 800], 'Vista aérea da Marina Boreste, entre o Rio Una e o mar', '(max-width:860px) 100vw, 40vw', 800, 800)}
      <figcaption>A Marina Boreste vista de cima, entre o Rio Una e o mar.</figcaption>
    </figure>
    <div class="historia-txt">
      <blockquote class="missao">
        <p class="dado"><span class="luz" aria-hidden="true"></span>Missão</p>
        <p>Proporcionar infraestrutura e serviços ideais para a guarda, manutenção, compra e venda de embarcações, sempre em harmonia com o meio ambiente, para que os clientes possam desfrutar da natureza e dos prazeres da atividade náutica.</p>
      </blockquote>
      <p>Não havia telefone celular nem GPS, não havia previsão do tempo e às vezes nem estradas. Mas mesmo assim, em meados da década de 70, Amandio Alves Pinto, um apaixonado pelo mar, saía com o seu barco navegando pela barra do Rio Una, mar afora, atraído pelas belezas do litoral norte de São Paulo.</p>
      <p>Foi por esta paixão e pelo seu espírito visionário que, ainda nesta época, ele começou a desenvolver em sua propriedade, na beira do Rio Una, as primeiras atividades náuticas da Marina Boreste, sendo ponto de apoio para amigos e outros navegantes.</p>
      <p>Com o tempo, a necessidade de facilitar o acesso a outros amantes do mar se tornava mais latente, e a Marina Boreste, acompanhando esta tendência, se organizava e se estruturava para atender os seus clientes cada vez melhor.</p>
      <p>Hoje, administrada pela família, a Marina Boreste continua investindo constantemente em melhorias, está consolidada no mercado, e a satisfação dos seus clientes é a comprovação da qualidade de seus serviços.</p>
      <p>E é neste clima de pioneirismo, amizade, honestidade e respeito à natureza que a Marina Boreste assume o compromisso de manter a sua embarcação sempre em boas mãos.</p>
      <ul class="numeros">
        <li><b>40<small>+ anos</small></b><span>de experiência</span></li>
        <li><b>3.000<small>m²</small></b><span>de galpões</span></li>
        <li><b>10<small>t</small></b><span>por embarcação</span></li>
        <li><b>24<small>h</small></b><span>de monitoramento</span></li>
      </ul>
    </div>
  </div>
  <p class="volta-fim"><a class="btn btn-linha" href="index.html">Voltar ao início</a></p>
</div>
</main>
''' + rodape('biografia') + pe()


def pagina_vendas():
    return cabeca('Embarcações à venda | Marina Boreste',
                  'Conheça as embarcações à venda na Marina Boreste. Os preços são negociáveis, e todo o atendimento é feito pelo WhatsApp.',
                  'compra-e-venda.html') + topo('compra-e-venda') + f'''<main id="conteudo" class="interna" tabindex="-1">
<div class="wrap">
  <a class="volta" href="index.html">{I['volta']}Voltar ao início</a>
  <header class="interna-cab">
    <h1>Embarcações à venda</h1>
    <p class="lead">Conheça as embarcações à venda na Marina Boreste. Os preços são negociáveis, e todo o atendimento é feito pelo WhatsApp.</p>
  </header>
  <ul class="barcos" data-barcos></ul>
  <div class="vazio" data-barcos-vazio hidden>
    <p>No momento não há embarcações anunciadas. Fale com a gente pelo WhatsApp para saber das próximas oportunidades.</p>
    <a class="btn btn-azul" href="{WPP}?text=Ol%C3%A1!%20Quero%20saber%20das%20pr%C3%B3ximas%20oportunidades%20de%20barcos%20%C3%A0%20venda%20na%20Marina%20Boreste." target="_blank" rel="noopener">{I['wpp']}Falar no WhatsApp{NOVA}</a>
  </div>
  <noscript><p class="vazio">Para ver as embarcações à venda, ative o JavaScript do navegador ou fale com a gente pelo <a href="{WPP}" target="_blank" rel="noopener">WhatsApp{NOVA}</a>.</p></noscript>
  <p class="volta-fim"><a class="btn btn-linha" href="index.html">Voltar ao início</a></p>
</div>
</main>
''' + rodape('compra-e-venda') + pe(f'<script src="{R}dados/barcos.js"></script>\n<script src="barcos.js"></script>\n')


def pagina_barco():
    return cabeca('Embarcação à venda | Marina Boreste',
                  'Fotos, dados e preço de uma embarcação à venda na Marina Boreste. Os preços são negociáveis, e todo o atendimento é feito pelo WhatsApp.',
                  'embarcacao.html') + topo('embarcacao') + f'''<main id="conteudo" class="interna" tabindex="-1">
<div class="wrap">
  <a class="volta" href="compra-e-venda.html">{I['volta']}Embarcações à venda</a>
  <div class="emb" data-emb>
    <div data-emb-fotos></div>
    <div class="emb-info" data-emb-info>
      <h1 data-emb-titulo>Embarcação à venda</h1>
      <div class="vazio" data-emb-nao-achou hidden>
        <p>Não encontramos esta embarcação. Ela pode ter sido vendida ou retirada do site.</p>
        <a class="btn btn-azul" href="compra-e-venda.html">Ver as embarcações à venda</a>
      </div>
      <noscript><p class="vazio">Para ver esta embarcação, ative o JavaScript do navegador ou fale com a gente pelo <a href="{WPP}" target="_blank" rel="noopener">WhatsApp{NOVA}</a>.</p></noscript>
    </div>
  </div>
</div>
</main>
''' + rodape('embarcacao') + pe(f'<script src="{R}dados/barcos.js"></script>\n<script src="barcos.js"></script>\n')


if __name__ == '__main__':
    os.makedirs(SAIDA, exist_ok=True)
    for nome, f in [('index.html', pagina_inicio), ('biografia.html', pagina_biografia),
                    ('compra-e-venda.html', pagina_vendas), ('embarcacao.html', pagina_barco)]:
        with open(os.path.join(SAIDA, nome), 'w', encoding='utf-8') as s:
            s.write(f())
        print('ok', 'novo/' + nome)
