/* Marina Boreste, site novo 3: bandeiras, timão, embarcações à venda e o movimento da página. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var limita = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var WHATS = 'https://wa.me/5512997292082';

  function el(tag, classe, texto) {
    var e = d.createElement(tag);
    if (classe) e.className = classe;
    if (texto != null) e.textContent = texto;
    return e;
  }

  /* ---------- bandeiras do código internacional de sinais (60 x 40, tralha à esquerda) ---------- */
  var VM = '#d0312d', AM = '#f2b705', AZ = '#1f4e9c', PR = '#15171a', BR = '#fff';
  function r(x, y, w, h, c) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + c + '"/>'; }
  function p(dd, c) { return '<path d="' + dd + '" fill="' + c + '"/>'; }
  function xis(c) { return '<path d="M0 0 60 40M60 0 0 40" stroke="' + c + '" stroke-width="9"/>'; }
  var CAUDA = 'M0 0H60L45 20L60 40H0Z';
  var xadrez = r(0, 0, 60, 40, BR);
  for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) if ((i + j) % 2 === 0) xadrez += r(i * 15, j * 10, 15, 10, AZ);
  var FLAG = {
    A: r(0, 0, 30, 40, BR) + p('M30 0H60L45 20L60 40H30Z', AZ),
    B: p(CAUDA, VM),
    C: r(0, 0, 60, 40, AZ) + r(0, 8, 60, 24, BR) + r(0, 16, 60, 8, VM),
    D: r(0, 0, 60, 40, AM) + r(0, 10, 60, 20, AZ),
    E: r(0, 0, 60, 20, AZ) + r(0, 20, 60, 20, VM),
    F: r(0, 0, 60, 40, BR) + p('M30 0 60 20 30 40 0 20Z', VM),
    G: [0, 1, 2, 3, 4, 5].map(function (k) { return r(k * 10, 0, 10, 40, k % 2 ? AZ : AM); }).join(''),
    H: r(0, 0, 30, 40, BR) + r(30, 0, 30, 40, VM),
    I: r(0, 0, 60, 40, AM) + '<circle cx="30" cy="20" r="10" fill="' + PR + '"/>',
    J: r(0, 0, 60, 40, AZ) + r(0, 13.3, 60, 13.4, BR),
    K: r(0, 0, 30, 40, AM) + r(30, 0, 30, 40, AZ),
    L: r(0, 0, 60, 40, AM) + r(30, 0, 30, 20, PR) + r(0, 20, 30, 20, PR),
    M: r(0, 0, 60, 40, AZ) + xis(BR),
    N: xadrez,
    O: r(0, 0, 60, 40, AM) + p('M0 0H60V40Z', VM),
    P: r(0, 0, 60, 40, AZ) + r(20, 13.3, 20, 13.4, BR),
    Q: r(0, 0, 60, 40, AM),
    R: r(0, 0, 60, 40, VM) + r(25, 0, 10, 40, AM) + r(0, 15, 60, 10, AM),
    S: r(0, 0, 60, 40, BR) + r(20, 13.3, 20, 13.4, AZ),
    T: r(0, 0, 20, 40, VM) + r(20, 0, 20, 40, BR) + r(40, 0, 20, 40, AZ),
    U: r(0, 0, 60, 40, BR) + r(0, 0, 30, 20, VM) + r(30, 20, 30, 20, VM),
    V: r(0, 0, 60, 40, BR) + xis(VM),
    W: r(0, 0, 60, 40, AZ) + r(8, 8, 44, 24, BR) + r(18, 14, 24, 12, VM),
    X: r(0, 0, 60, 40, BR) + r(25, 0, 10, 40, AZ) + r(0, 15, 60, 10, AZ),
    Y: r(0, 0, 60, 40, AM) + [-40, -24, -8, 8, 24, 40, 56].map(function (x) { return '<path d="M' + x + ' 0 ' + (x + 40) + ' 40" stroke="' + VM + '" stroke-width="8"/>'; }).join(''),
    Z: p('M0 0H60L30 20Z', AM) + p('M60 0V40L30 20Z', AZ) + p('M0 40H60L30 20Z', VM) + p('M0 0V40L30 20Z', PR)
  };
  var NOMES = 'Alfa Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu'.split(' ');

  function bandeira(letra, n) {
    var b = el('span', 'bandeira');
    b.dataset.l = letra;
    b.style.setProperty('--i', n);
    if (letra === ' ') { b.classList.add('bandeira-vazia'); return b; }
    var borda = letra === 'A' || letra === 'B' ? CAUDA : 'M0 0H60V40H0Z';
    b.title = letra + ', ' + NOMES[letra.charCodeAt(0) - 65];
    b.innerHTML = '<svg viewBox="-1 -1 62 42" overflow="hidden"><clipPath id="c' + letra + n + '"><path d="' + borda + '"/></clipPath><g clip-path="url(#c' + letra + n + ')">' + FLAG[letra] + '</g><path d="' + borda + '" fill="none" stroke="#12302a" stroke-opacity=".35" stroke-width="1.5"/></svg>';
    b.appendChild(el('span', null, letra));
    return b;
  }
  function soLetras(t) {
    return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z ]/g, '').replace(/ +/g, ' ').replace(/^ /, '');
  }
  function poeBandeiras(caixa, texto, marca) {
    var letras = soLetras(texto).split('');
    letras.forEach(function (ch, n) {
      var atual = caixa.children[n];
      if (atual && atual.dataset.l === ch) return;
      var nova = bandeira(ch, n);
      if (marca) nova.classList.add('nova');
      if (atual) caixa.replaceChild(nova, atual); else caixa.appendChild(nova);
    });
    while (caixa.children.length > letras.length) caixa.removeChild(caixa.lastChild);
  }
  $$('[data-bandeiras]').forEach(function (c) { poeBandeiras(c, c.dataset.bandeiras); });

  /* ---------- títulos grandes: cada letra sobe por trás da linha ---------- */
  $$('[data-letras]').forEach(function (titulo) {
    var texto = titulo.textContent.trim(), visivel = el('span'), n = 0;
    visivel.setAttribute('aria-hidden', 'true');
    texto.split(' ').forEach(function (palavra, k) {
      var caixa = el('span', 'palavra');
      palavra.split('').forEach(function (ch) { var l = el('span', 'letra', ch); l.style.setProperty('--i', n++); caixa.appendChild(l); });
      if (k) visivel.appendChild(d.createTextNode(' '));
      visivel.appendChild(caixa);
    });
    titulo.textContent = '';
    titulo.appendChild(el('span', 'sr', texto));
    titulo.appendChild(visivel);
    titulo.classList.add('pronto');
  });

  /* ---------- embarcações à venda (dados/barcos.js do site atual): vitrine no início, lista na página ---------- */
  function slug(t) { return t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function preco(b) { return b.preco ? Number(b.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }) : 'Preço negociável'; }
  function foto(src, alt, classe) {
    var f = el('div', 'moldura ' + (classe || '')), img = el('img');
    img.src = '../' + src; img.alt = alt; img.loading = 'lazy'; img.decoding = 'async';
    f.appendChild(img); return f;
  }
  var barcos = (window.BARCOS || []).filter(function (b) { return b && b.nome; });
  $$('[data-barcos]').forEach(function (lista) {
    if (!window.BARCOS) return;
    var vitrine = lista.dataset.modo === 'vitrine';
    lista.textContent = '';
    if (!barcos.length) {
      var vazio = el('div', 'venda-vazio');
      vazio.appendChild(el('p', null, 'No momento não há embarcações anunciadas. Fale com a gente pelo WhatsApp para saber das próximas oportunidades.'));
      var bv = el('a', 'botao', 'Falar no WhatsApp');
      bv.href = WHATS + '?text=' + encodeURIComponent('Olá! Gostaria de saber das próximas embarcações à venda na Marina Boreste.');
      bv.target = '_blank'; bv.rel = 'noopener'; bv.style.marginTop = '24px';
      vazio.appendChild(bv);
      lista.appendChild(vazio);
      return;
    }
    (vitrine ? barcos.slice(0, 2) : barcos).forEach(function (b) {
      var vendido = b.status === 'vendido';
      if (vitrine) {
        var a = el('a', 'barco-vitrine');
        a.href = 'embarcacoes.html#' + slug(b.nome);
        a.setAttribute('data-luz', ''); a.setAttribute('data-rv', '');
        if (b.foto) a.appendChild(foto(b.foto, b.descricaoFoto || b.nome));
        var txt = el('span', 'barco-vitrine-texto');
        txt.appendChild(el('strong', null, b.nome));
        txt.appendChild(el('span', 'barco-preco', vendido ? 'Vendido' : preco(b)));
        txt.appendChild(el('span', 'barco-vitrine-ver', 'Ver detalhes'));
        a.appendChild(txt);
        lista.appendChild(a);
        return;
      }
      var art = el('article', 'barco-venda');
      art.id = slug(b.nome);
      var capaFoto = b.foto ? foto(b.foto, b.descricaoFoto || b.nome) : el('div', 'moldura');
      capaFoto.setAttribute('data-rv', ''); capaFoto.setAttribute('data-luz', '');
      if (vendido) capaFoto.appendChild(el('span', 'etiqueta', 'Vendido'));
      art.appendChild(capaFoto);
      var tx = el('div', 'barco-venda-texto');
      tx.appendChild(el('h3', null, b.nome));
      tx.appendChild(el('p', 'barco-preco', preco(b)));
      var ficha = el('dl', 'barco-ficha');
      [['Ano', b.ano], ['Tamanho', b.pes ? b.pes + ' pés' : ''], ['Motor', b.motor]].forEach(function (linha) {
        if (!linha[1]) return;
        var dv = el('div'); dv.appendChild(el('dt', null, linha[0])); dv.appendChild(el('dd', null, linha[1])); ficha.appendChild(dv);
      });
      tx.appendChild(ficha);
      if (b.descricao) tx.appendChild(el('p', null, b.descricao));
      if (b.maisFotos && b.maisFotos.length) {
        var mais = el('div', 'barco-mais');
        b.maisFotos.forEach(function (src, n) { mais.appendChild(foto(src, b.nome + ', foto ' + (n + 2))); });
        tx.appendChild(mais);
      }
      if (!vendido) {
        var bt = el('a', 'botao botao-brilho', 'Perguntar pelo WhatsApp');
        bt.href = WHATS + '?text=' + encodeURIComponent('Olá! Tenho interesse na ' + b.nome + (b.ano ? ' (' + b.ano + ')' : '') + ', anunciada no site da Marina Boreste.');
        bt.target = '_blank'; bt.rel = 'noopener';
        bt.appendChild(el('span', 'sr', ' (abre em nova aba)'));
        bt.style.justifySelf = 'start';
        tx.appendChild(bt);
      }
      tx.setAttribute('data-rv', '');
      art.appendChild(tx);
      lista.appendChild(art);
    });
  });

  /* ---------- menu ---------- */
  var menu = $('#menu');
  $('[data-abre-menu]').addEventListener('click', function () { menu.showModal(); });
  $('[data-fecha-menu]').addEventListener('click', function () { menu.close(); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { menu.close(); }); });

  /* ---------- aberta agora? (hora de São Paulo) ---------- */
  var agora = $('[data-agora]');
  if (agora) {
    var partes = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: 'numeric', hour12: false }).formatToParts(new Date());
    var hora = +partes.filter(function (x) { return x.type === 'hour'; })[0].value;
    var aberta = hora >= 8 && hora < 17;
    agora.textContent = aberta ? 'Aberta agora, até as 17h' : 'Fechada agora; abre às 8h';
    agora.dataset.aberta = aberta ? 'sim' : 'nao';
  }
  var ano = $('[data-ano]');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- vídeo da abertura: toca só na tela e respeita quem pausou ---------- */
  var video = $('[data-video]'), pausa = $('[data-pausa]'), pausouAMao = reduz;
  function ajustaBotao() { if (!pausa) return; var parado = video.paused; pausa.textContent = parado ? 'Tocar vídeo' : 'Pausar vídeo'; pausa.setAttribute('aria-pressed', String(parado)); }
  if (video) {
    if (pausa) pausa.addEventListener('click', function () {
      if (video.paused) { pausouAMao = false; video.play().catch(function () {}); } else { pausouAMao = true; video.pause(); }
    });
    video.addEventListener('play', ajustaBotao); video.addEventListener('pause', ajustaBotao);
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !pausouAMao) video.play().catch(function () {});
        else if (!e.isIntersecting) video.pause();
      });
    }).observe(video);
    ajustaBotao();
  }

  /* ---------- entradas: cada parte sobe na sua vez ---------- */
  // só esconde o que está a um quarto de tela de entrar; o resto fica visível (pulo pelo menu, impressão)
  var ioIn = new IntersectionObserver(function (es) {
    var n = 0;
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.style.transitionDelay = Math.min(n++, 4) * 70 + 'ms';
      e.target.classList.add('in');
      ioIn.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px 6% 0px' });
  var ioPre = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      ioPre.unobserve(e.target);
      if (e.boundingClientRect.top > innerHeight) { e.target.classList.add('pre'); ioIn.observe(e.target); }
    });
  }, { rootMargin: '0px 0px 25% 0px' });
  $$('[data-rv]').forEach(function (e) { ioPre.observe(e); });

  /* ---------- infraestrutura: o quadro escolhido sobe e conta a sua história ---------- */
  var nota = $('[data-nota]');
  $$('[data-quadro]').forEach(function (bt, n) {
    bt.setAttribute('aria-pressed', String(n === 0));
    bt.addEventListener('click', function () {
      var li = bt.parentNode;
      $$('.quadro').forEach(function (q) { q.removeAttribute('aria-current'); $('button', q).setAttribute('aria-pressed', 'false'); });
      li.setAttribute('aria-current', 'true');
      bt.setAttribute('aria-pressed', 'true');
      nota.textContent = '';
      nota.appendChild($('template', li).content.cloneNode(true));
      nota.classList.remove('trocando'); void nota.offsetWidth; nota.classList.add('trocando');
      var trilho = li.parentNode, alvo = li.offsetLeft - trilho.offsetLeft - 24;
      trilho.scrollTo({ left: alvo, behavior: reduz ? 'auto' : 'smooth' });
    });
  });

  /* ---------- abas: serviços (com troca automática) e como chegar ---------- */
  $$('[data-abas]').forEach(function (caixa) {
    var abas = $$('[role="tab"]', caixa), paineis = abas.map(function (a) { return d.getElementById(a.getAttribute('aria-controls')); });
    var indicador = $('.abas-indicador', caixa), lista = $('[role="tablist"]', caixa);
    var tempo = +caixa.dataset.auto || 0, atual = 0, relogio = 0, parou = !tempo || reduz, visivel = false, segurando = false;
    caixa.classList.add('ativas');
    function mede() {
      var a = abas[atual], vertical = getComputedStyle(lista).flexDirection === 'column';
      indicador.style.transform = vertical
        ? 'translateY(' + a.offsetTop + 'px) scaleY(' + a.offsetHeight / 100 + ')'
        : 'translateX(' + a.offsetLeft + 'px) scaleX(' + a.offsetWidth / 100 + ')';
    }
    function mostra(n, foco, sentido) {
      var antes = atual; atual = (n + abas.length) % abas.length;
      abas.forEach(function (a, i) {
        var sim = i === atual;
        a.setAttribute('aria-selected', String(sim)); a.tabIndex = sim ? 0 : -1;
        paineis[i].hidden = !sim;
      });
      var p = paineis[atual];
      p.style.setProperty('--de', (sentido || (atual >= antes ? 1 : -1)) * 28 + 'px');
      p.classList.remove('entrando'); void p.offsetWidth; p.classList.add('entrando');
      if (foco) abas[atual].focus();
      // a aba escolhida desliza para dentro da faixa no celular
      lista.scrollTo({ left: abas[atual].offsetLeft - 24, behavior: reduz ? 'auto' : 'smooth' });
      mede(); arma();
    }
    function arma() {
      clearTimeout(relogio);
      caixa.style.setProperty('--auto', tempo + 'ms');
      caixa.classList.toggle('rodando', !parou && visivel && !segurando);
      if (!parou && visivel && !segurando) relogio = setTimeout(function () { mostra(atual + 1, false, 1); }, tempo);
    }
    function para() { parou = true; arma(); }
    abas.forEach(function (a, i) {
      a.addEventListener('click', function () { para(); mostra(i); });
      a.addEventListener('keydown', function (e) {
        var passo = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (e.key === 'Home') passo = -atual; else if (e.key === 'End') passo = abas.length - 1 - atual;
        if (passo === undefined) return;
        e.preventDefault(); para(); mostra(atual + passo, true);
      });
    });
    ['pointerenter', 'focusin'].forEach(function (ev) { caixa.addEventListener(ev, function () { segurando = true; arma(); }); });
    ['pointerleave', 'focusout'].forEach(function (ev) { caixa.addEventListener(ev, function () { segurando = false; arma(); }); });
    // no celular, arrastar o painel para o lado troca de aba (segue o dedo e solta com o embalo)
    var area = $('[data-paineis]', caixa), x0 = 0, y0 = 0, t0 = 0, dx = 0, arrastando = false, decidido = false;
    if (area && tempo) {
      area.addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse') return; x0 = e.clientX; y0 = e.clientY; t0 = e.timeStamp; dx = 0; arrastando = true; decidido = false; });
      area.addEventListener('pointermove', function (e) {
        if (!arrastando) return;
        var mx = e.clientX - x0, my = e.clientY - y0;
        if (!decidido) { if (Math.abs(mx) < 10 && Math.abs(my) < 10) return; decidido = true; if (Math.abs(my) > Math.abs(mx)) { arrastando = false; return; } area.setPointerCapture(e.pointerId); }
        dx = mx; paineis[atual].style.transform = 'translateX(' + dx + 'px)';
      });
      var solta = function (e) {
        if (!arrastando) return; arrastando = false;
        var v = dx / Math.max(1, e.timeStamp - t0), p = paineis[atual];
        p.style.transform = '';
        if (Math.abs(dx) > 70 || Math.abs(v) > 0.45) { para(); mostra(atual + (dx < 0 ? 1 : -1), false, dx < 0 ? 1 : -1); }
      };
      area.addEventListener('pointerup', solta); area.addEventListener('pointercancel', solta);
    }
    new IntersectionObserver(function (es) { visivel = es[0].isIntersecting; arma(); }, { threshold: 0.35 }).observe(caixa);
    addEventListener('resize', mede);
    if (d.fonts) d.fonts.ready.then(mede);
    mostra(0);
  });

  /* ---------- números que contam até o valor ---------- */
  var ioNum = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      ioNum.unobserve(e.target);
      var alvo = +e.target.dataset.conta, depois = e.target.dataset.depois || '', inicio = performance.now(), dur = 1600;
      (function passo(t) {
        var k = Math.min(1, (t - inicio) / dur), v = Math.round(alvo * (1 - Math.pow(1 - k, 4)));
        e.target.textContent = v.toLocaleString('pt-BR') + depois;
        if (k < 1) requestAnimationFrame(passo);
      })(inicio);
    });
  }, { threshold: 0.6 });
  if (!reduz) $$('[data-conta]').forEach(function (n) { ioNum.observe(n); });

  /* ---------- luz que segue o ponteiro nas fotos e cartões; ícones que puxam o ponteiro ---------- */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    d.addEventListener('pointermove', function (e) {
      var alvo = e.target.closest && e.target.closest('[data-luz]');
      if (alvo) { var b = alvo.getBoundingClientRect(); alvo.style.setProperty('--lx', (e.clientX - b.left) + 'px'); alvo.style.setProperty('--ly', (e.clientY - b.top) + 'px'); }
    }, { passive: true });
    if (!reduz) $$('[data-ima]').forEach(function (a) {
      a.addEventListener('pointermove', function (e) { var b = a.getBoundingClientRect(); a.style.transform = 'translate(' + ((e.clientX - b.left - b.width / 2) * 0.25).toFixed(1) + 'px,' + ((e.clientY - b.top - b.height / 2) * 0.25).toFixed(1) + 'px)'; });
      a.addEventListener('pointerleave', function () { a.style.transform = ''; });
    });
  }

  /* ---------- copiar coordenadas ---------- */
  var copia = $('[data-copia]'), copiaStatus = $('[data-copia-status]');
  if (copia) copia.addEventListener('click', function () {
    var ok = function () { copia.textContent = 'Copiado'; copiaStatus.textContent = 'Coordenadas copiadas.'; setTimeout(function () { copia.textContent = 'Copiar'; }, 2000); };
    if (navigator.clipboard) navigator.clipboard.writeText(copia.dataset.copia).then(ok, function () { copiaStatus.textContent = copia.dataset.copia; });
  });

  /* ---------- recado: o nome do barco em bandeiras, enviado pelo WhatsApp ---------- */
  var recado = $('[data-recado]'), nomeBarco = $('[data-nome-barco]'), caixaRecado = $('[data-bandeiras-recado]');
  if (recado) {
    nomeBarco.addEventListener('input', function () { poeBandeiras(caixaRecado, nomeBarco.value, true); });
    recado.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = nomeBarco.value.trim(), assunto = recado.assunto.value;
      var msg = 'Olá, Marina Boreste! Assunto: ' + assunto + '.' + (nome ? ' Meu barco é o ' + nome + '.' : '');
      window.open(WHATS + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }

  /* ---------- timão: gira com o dedo, segue girando no embalo e o barco obedece ---------- */
  var roda = $('[data-timao]'), rodaImg = roda && $('img', roda), leitura = $('[data-leitura]'), leme = $('.leme');
  var barco = $('[data-barco]'), esteira = $('[data-esteira]');
  var MAX = 540, ang = 0, vel = 0, guinada = 0, pegando = false, ultimoA = 0, ultimoT = 0, emVista = false, raf = 0, girouSozinho = false;
  function anguloDe(e) {
    var b = roda.getBoundingClientRect(), dx = e.clientX - b.left - b.width / 2, dy = e.clientY - b.top - b.height / 2;
    return { a: Math.atan2(dy, dx) * 180 / Math.PI, perto: dx * dx + dy * dy < 400 };
  }
  function poeAngulo(a) {
    ang = limita(a, -MAX, MAX);
    var graus = Math.round(ang / 15), lado = graus > 1 ? 'be' : graus < -1 ? 'bb' : '';
    var texto = lado === 'be' ? 'Leme ' + graus + '° a boreste' : lado === 'bb' ? 'Leme ' + -graus + '° a bombordo' : 'Leme a meio';
    if (leitura.textContent !== texto) {
      leitura.textContent = texto;
      roda.setAttribute('aria-valuetext', texto);
      leme.dataset.lado = lado; barco.dataset.lado = lado;
    }
    roda.setAttribute('aria-valuenow', Math.round(ang));
  }
  function quadroTimao(t) {
    if (!pegando && Math.abs(vel) > 0.05) {
      poeAngulo(ang + vel);
      vel *= 0.95;
      if (Math.abs(ang) >= MAX) vel = -vel * 0.3; // batente: devolve um pouco
    } else if (!pegando) vel = 0;
    var balanco = reduz || pegando ? 0 : Math.sin(t / 900) * 2;
    rodaImg.style.transform = 'rotate(' + (ang + balanco).toFixed(2) + 'deg)';
    // o barco responde devagar ao leme, como na água
    var alvo = (ang / 15) * 1.4;
    guinada += (alvo - guinada) * (reduz ? 1 : 0.06);
    var s = Math.sin(guinada * Math.PI / 180) * 124;
    barco.style.transform = 'rotate(' + guinada.toFixed(2) + 'deg)';
    esteira.setAttribute('d', 'M42 236Q' + (30 + s * 0.4).toFixed(1) + ' 300 ' + (18 + s).toFixed(1) + ' 360M78 236Q' + (90 + s * 0.4).toFixed(1) + ' 300 ' + (102 + s).toFixed(1) + ' 360');
    raf = emVista || Math.abs(vel) > 0.05 || Math.abs(alvo - guinada) > 0.05 ? requestAnimationFrame(quadroTimao) : 0;
  }
  function liga() { if (!raf) raf = requestAnimationFrame(quadroTimao); }
  if (roda) {
    roda.addEventListener('pointerdown', function (e) {
      var g = anguloDe(e);
      pegando = true; vel = 0; ultimoA = g.a; ultimoT = e.timeStamp;
      roda.setPointerCapture(e.pointerId); roda.classList.add('pegando'); liga();
    });
    roda.addEventListener('pointermove', function (e) {
      if (!pegando) return;
      var g = anguloDe(e);
      if (g.perto) return; // no miolo o ângulo pula; espera o dedo sair do cubo
      var da = g.a - ultimoA;
      if (da > 180) da -= 360; else if (da < -180) da += 360;
      var dt = Math.max(8, e.timeStamp - ultimoT);
      vel = vel * 0.5 + (da / dt) * 16 * 0.5;
      ultimoA = g.a; ultimoT = e.timeStamp;
      poeAngulo(ang + da);
    });
    var solta = function () { if (!pegando) return; pegando = false; roda.classList.remove('pegando'); if (reduz) vel = 0; liga(); };
    roda.addEventListener('pointerup', solta);
    roda.addEventListener('pointercancel', solta);
    roda.addEventListener('keydown', function (e) {
      var passo = { ArrowRight: 30, ArrowUp: 30, ArrowLeft: -30, ArrowDown: -30, PageUp: 90, PageDown: -90 }[e.key];
      if (e.key === 'Home') { vel = 0; poeAngulo(0); liga(); e.preventDefault(); return; }
      if (!passo) return;
      e.preventDefault(); vel = 0; poeAngulo(ang + passo); liga();
    });
    new IntersectionObserver(function (es) {
      emVista = es[0].isIntersecting;
      // na primeira vez, o timão dá um giro sozinho para mostrar que gira
      if (emVista && !girouSozinho && !reduz) { girouSozinho = true; setTimeout(function () { if (!pegando) { vel = 7; liga(); } }, 500); }
      if (emVista) liga();
    }, { threshold: 0.4 }).observe(roda);
  }

  /* ---------- a travessia: água em WebGL, espuma em 2D e a lancha guiada pela rolagem ---------- */
  var trav = $('.travessia'), travTrilho = $('[data-travessia]'), agua = $('[data-agua]'), espuma = $('[data-espuma]');
  var lancha = $('[data-lancha]'), etapas = $$('[data-etapas] li'), nos = $('[data-nos]');
  var ctx = espuma && espuma.getContext('2d'), gl = null, uR, uT;
  var W = 0, H2 = 0, dpr = 1, travVista = false, travRaf = 0, pTrav = 0, pSuave = 0, velNos = 0, etapaAtual = -1;
  function shader(tipo, fonte) { var s = gl.createShader(tipo); gl.shaderSource(s, fonte); gl.compileShader(s); return s; }
  if (agua) {
    gl = agua.getContext('webgl', { antialias: false, alpha: false });
    if (gl) {
      var pg = gl.createProgram();
      gl.attachShader(pg, shader(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'));
      gl.attachShader(pg, shader(gl.FRAGMENT_SHADER, [
        'precision mediump float;uniform vec2 r;uniform float t;',
        'float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
        'float n(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}',
        'float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<4;i++){v+=a*n(p);p=m*p;a*=.5;}return v;}',
        // ondas: duas camadas de ruído que derivam em sentidos diferentes e um marulho longo
        'float onda(vec2 p){return fbm(p*1.1+vec2(t*.05,t*.03))+.5*fbm(p*2.3-vec2(t*.07,-t*.04))+.08*sin(p.x*3.1+p.y*1.7+t*.9);}',
        'void main(){vec2 p=gl_FragCoord.xy/r.y*4.4;float e=.015,c=onda(p);',
        'vec3 N=normalize(vec3((c-onda(p+vec2(e,0.)))/e,(c-onda(p+vec2(0.,e)))/e,3.2)),L=normalize(vec3(-.35,.55,.75));',
        'float dif=clamp(dot(N,L),0.,1.),spec=pow(clamp(dot(reflect(-L,N),vec3(0.,0.,1.)),0.,1.),150.);',
        'vec3 col=mix(vec3(.016,.07,.15),vec3(.035,.19,.34),smoothstep(.2,1.,dif));',
        'col=mix(col,vec3(.12,.42,.62),smoothstep(.85,1.35,c)*.35)+spec*vec3(.75,.88,1.)*.5;',
        'vec2 q=gl_FragCoord.xy/r;col*=.8+.2*smoothstep(1.1,.25,distance(q,vec2(.5)));gl_FragColor=vec4(col,1.);}'
      ].join('')));
      gl.linkProgram(pg);
      if (gl.getProgramParameter(pg, gl.LINK_STATUS)) {
        gl.useProgram(pg);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        var aPos = gl.getAttribLocation(pg, 'a');
        gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
        uR = gl.getUniformLocation(pg, 'r'); uT = gl.getUniformLocation(pg, 't');
      } else gl = null;
    }
  }
  function medeTravessia() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5); W = agua.clientWidth; H2 = agua.clientHeight;
    // a água é macia: meia resolução basta e poupa a GPU de celulares e notebooks fracos
    agua.width = Math.round(W * 0.6); agua.height = Math.round(H2 * 0.6);
    espuma.width = Math.round(W * dpr); espuma.height = Math.round(H2 * dpr);
    if (gl) gl.viewport(0, 0, agua.width, agua.height);
  }
  // o caminho: entra pela esquerda, faz um S suave e sai pela direita
  function ponto(u) { return { x: (-0.22 + 1.44 * u) * W, y: H2 * (0.55 + 0.07 * Math.sin(u * Math.PI * 2)) }; }
  function rumo(u) { var a = ponto(u), b = ponto(u + 0.001); return Math.atan2(b.y - a.y, b.x - a.x); }
  function desenhaEspuma(u, lw, lh, t) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H2);
    var passos = 150, du = 0.0022, inicio = (lw * 0.47) / (1.44 * W), antes = null;
    for (var i = 0; i <= passos; i++) {
      var ui = u - inicio - i * du;
      if (ui < -0.25) break;
      var p = ponto(ui), ang = rumo(ui), nx = -Math.sin(ang), ny = Math.cos(ang);
      var abre = lh * 0.32 + i * 1.5, vida = Math.pow(1 - i / passos, 1.6);
      var cur = { e: [p.x + nx * abre, p.y + ny * abre], d: [p.x - nx * abre, p.y - ny * abre] };
      if (antes) {
        // os dois braços da esteira em V, que abrem e somem com a distância
        ctx.strokeStyle = 'rgba(255,255,255,' + (0.55 * vida).toFixed(3) + ')';
        ctx.lineWidth = 1.2 + vida * 1.6;
        ctx.beginPath(); ctx.moveTo(antes.e[0], antes.e[1]); ctx.lineTo(cur.e[0], cur.e[1]);
        ctx.moveTo(antes.d[0], antes.d[1]); ctx.lineTo(cur.d[0], cur.d[1]); ctx.stroke();
      }
      if (i % 2 === 0) {
        // a espuma revolta no meio: bolhas de tamanhos e lados diferentes, mexendo com o tempo
        for (var b = -1; b <= 1; b += 2) {
          var mexe = (Math.sin(i * 2.3 + b * 1.9 + t / 240) * 0.5 + b * 0.35) * lh * (0.08 + 0.18 * i / passos);
          var raio = lh * (0.05 + 0.13 * i / passos) * (0.6 + 0.4 * Math.sin(i * 3.7 + b + t / 330));
          ctx.fillStyle = 'rgba(255,255,255,' + (0.17 * vida).toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(p.x + nx * mexe, p.y + ny * mexe, Math.max(0.5, raio), 0, 6.283); ctx.fill();
        }
      }
      antes = cur;
    }
  }
  function quadroTravessia(t) {
    pSuave += (pTrav - pSuave) * (reduz ? 1 : 0.09); // a lancha tem massa: chega um pouco depois da rolagem
    if (gl) { gl.uniform2f(uR, agua.width, agua.height); gl.uniform1f(uT, reduz ? 7 : t / 1000); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); }
    var u = reduz ? 0.5 : pSuave, c = ponto(u), ang = rumo(u) * 180 / Math.PI;
    var bob = reduz ? 0 : Math.sin(t / 650), lw = lancha.offsetWidth, lh = lancha.offsetHeight;
    lancha.style.transform = 'translate(' + (c.x - lw / 2).toFixed(1) + 'px,' + (c.y - lh / 2 + bob * 2).toFixed(1) + 'px) rotate(' + (ang + bob * 0.7).toFixed(2) + 'deg)';
    if (ctx) desenhaEspuma(u, lw, lh, t);
    var k = Math.min(2, Math.floor(pTrav * 3));
    if (k !== etapaAtual) { etapaAtual = k; etapas.forEach(function (li, i) { li.classList.toggle('ativa', i === k); }); }
    velNos *= 0.94;
    if (nos) { var vn = Math.round(velNos); nos.textContent = vn + (vn === 1 ? ' nó' : ' nós'); }
    travRaf = travVista && !reduz ? requestAnimationFrame(quadroTravessia) : 0;
  }
  if (trav) {
    trav.classList.add('posta'); // daqui em diante quem posiciona a lancha é o script
    if (!reduz) trav.classList.add('viva');
    medeTravessia();
    addEventListener('resize', function () { medeTravessia(); if (!travRaf) requestAnimationFrame(quadroTravessia); });
    lancha.addEventListener('load', function () { requestAnimationFrame(quadroTravessia); });
    new IntersectionObserver(function (es) {
      travVista = es[0].isIntersecting;
      if (travVista && !travRaf) travRaf = requestAnimationFrame(quadroTravessia);
    }).observe(travTrilho);
    requestAnimationFrame(quadroTravessia);
  }

  /* ---------- a frase final da biografia acende palavra por palavra ---------- */
  var fecho = $('.diario-fecho'), palavras = [];
  if (fecho && !reduz) {
    var frase = fecho.textContent.trim().split(/\s+/);
    fecho.textContent = '';
    frase.forEach(function (w, i) { var s = el('span', 'p', w); fecho.appendChild(s); if (i < frase.length - 1) fecho.appendChild(d.createTextNode(' ')); palavras.push(s); });
    fecho.classList.add('tinta');
  }

  /* ---------- tudo que anda com a rolagem ---------- */
  var pousada = $('.pousada'), trilho = $('[data-triptico]');
  var largo = matchMedia('(min-width: 760px)');
  function pinaPousada() { if (pousada) pousada.classList.toggle('pin', !reduz && largo.matches); }
  pinaPousada(); largo.addEventListener('change', pinaPousada);
  var rumoBarco = $('.rumo-barco'), rumoEsteira = $('.rumo-esteira');
  var derivas = $$('[data-deriva]'), rosa = $('[data-rosa]'), local = $('.local'), cabo = $('[data-cabo]'), diario = $('.diario');
  var triC = $('.tri-c'), triL = $('.tri-l'), triR = $('.tri-r'), cabeca = $('.pousada-cabeca');
  var cabecalho = $('[data-topo]'), abre = $('[data-capa]'), ultimoY = scrollY, ultimoT = performance.now();
  var pedido = 0;

  function rolagem() {
    pedido = 0;
    // primeiro todas as leituras de layout, depois todas as escritas
    var H = innerHeight, total = root.scrollHeight - H, prog = total > 0 ? limita(scrollY / total, 0, 1) : 0;
    var largura = rumoBarco.parentNode.clientWidth - 34;
    var molduras = reduz ? [] : derivas.map(function (img) { return img.parentNode.getBoundingClientRect(); });
    var bl = rosa && !reduz && local.getBoundingClientRect();
    var bd = cabo && !reduz && diario.getBoundingClientRect();
    var pin = trilho && pousada.classList.contains('pin');
    var bt = pin && trilho.getBoundingClientRect(), palcoH = pin && trilho.firstElementChild.clientHeight;
    var hc = pin && triC.offsetHeight, fim = pin && cabeca.offsetTop + cabeca.offsetHeight + 40;
    var hTopo = cabecalho.offsetHeight, fundoAbre = abre ? abre.getBoundingClientRect().bottom : 0;
    var bTrav = travTrilho && travTrilho.getBoundingClientRect(), bFecho = palavras.length && fecho.getBoundingClientRect();

    // topo transparente sobre o vídeo e sobre a travessia; branco no resto
    cabecalho.classList.toggle('solido', !(fundoAbre > hTopo || (bTrav && bTrav.top <= 0 && bTrav.bottom >= hTopo)));
    if (bTrav) {
      pTrav = limita(-bTrav.top / (bTrav.height - H), 0, 1);
      var agoraT = performance.now(), v = Math.abs(scrollY - ultimoY) / Math.max(16, agoraT - ultimoT);
      ultimoY = scrollY; ultimoT = agoraT;
      if (bTrav.top < H && bTrav.bottom > 0) velNos = Math.max(velNos, Math.min(48, v * 14));
    }
    if (bFecho) {
      var acesas = Math.round(limita((H * 0.85 - bFecho.top) / (H * 0.45), 0, 1) * palavras.length);
      palavras.forEach(function (w, i) { w.classList.toggle('acesa', i < acesas); });
    }

    rumoBarco.style.transform = 'translateX(' + (prog * largura).toFixed(1) + 'px)';
    rumoEsteira.style.transform = 'scaleX(' + prog.toFixed(4) + ')';
    molduras.forEach(function (b, n) {
      if (b.bottom < 0 || b.top > H) return;
      var k = limita((b.top + b.height / 2 - H / 2) / H, -1, 1);
      derivas[n].style.transform = 'translateY(' + (-5.35 - k * 5).toFixed(2) + '%)';
    });
    if (bl && bl.top < H && bl.bottom > 0) {
      var pr = limita((H - bl.top) / (H * 0.9), 0, 1);
      rosa.style.transform = 'rotate(' + (130 * Math.exp(-3.4 * pr) * Math.cos(9 * pr)).toFixed(2) + 'deg)';
    }
    if (bd) {
      var pc = limita((H * 0.75 - bd.top) / bd.height, 0, 1);
      cabo.style.clipPath = 'inset(0 0 ' + ((1 - pc) * 100).toFixed(2) + '% 0)';
    }
    if (pin && bt.top < H && bt.bottom > 0) {
      var pt = limita(-bt.top / (bt.height - palcoH), 0, 1), s0 = 0.816;
      var inicio = palcoH - hc * s0 * 0.4, topo = inicio + (fim - inicio) * pt;
      triC.style.transform = 'translateY(' + topo.toFixed(1) + 'px) scale(' + (s0 + (1 - s0) * pt).toFixed(4) + ')';
      var lado = topo + 55 + (1 - pt) * 90;
      triL.style.transform = 'translateY(' + lado.toFixed(1) + 'px)';
      triR.style.transform = 'translateY(' + (lado + (1 - pt) * 40).toFixed(1) + 'px)';
    }
  }
  function pedeRolagem() { if (!pedido) pedido = requestAnimationFrame(rolagem); }
  addEventListener('scroll', pedeRolagem, { passive: true });
  addEventListener('resize', pedeRolagem);
  rolagem();
  window.__site = true;
})();
