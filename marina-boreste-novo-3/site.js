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

  /* ---------- embarcações à venda (dados/barcos.js do site atual) ---------- */
  var lista = $('[data-barcos]');
  var barcos = (window.BARCOS || []).filter(function (b) { return b && b.nome; });
  if (lista && window.BARCOS) {
    lista.textContent = '';
    if (!barcos.length) {
      var vazio = el('div', 'venda-vazio');
      vazio.appendChild(el('p', null, 'No momento não há embarcações anunciadas. Fale com a gente pelo WhatsApp para saber das próximas oportunidades.'));
      var bv = el('a', 'botao', 'Falar no WhatsApp');
      bv.href = WHATS + '?text=' + encodeURIComponent('Olá! Gostaria de saber das próximas embarcações à venda na Marina Boreste.');
      bv.target = '_blank'; bv.rel = 'noopener'; bv.style.marginTop = '24px';
      vazio.appendChild(bv);
      lista.appendChild(vazio);
    }
    barcos.forEach(function (b) {
      var vendido = b.status === 'vendido';
      var art = el('article', 'barco-venda');
      var foto = el('div', 'moldura');
      foto.setAttribute('data-rv', '');
      if (b.foto) {
        var img = el('img');
        img.src = '../' + b.foto; img.alt = b.descricaoFoto || b.nome; img.loading = 'lazy'; img.decoding = 'async';
        foto.appendChild(img);
      }
      if (vendido) foto.appendChild(el('span', 'etiqueta', 'Vendido'));
      art.appendChild(foto);
      var tx = el('div', 'barco-venda-texto');
      tx.appendChild(el('h3', null, b.nome));
      tx.appendChild(el('p', 'barco-preco', b.preco ? 'R$ ' + Number(b.preco).toLocaleString('pt-BR') : 'Preço negociável'));
      var ficha = el('dl', 'barco-ficha');
      [['Ano', b.ano], ['Tamanho', b.pes ? b.pes + ' pés' : ''], ['Motor', b.motor]].forEach(function (linha) {
        if (!linha[1]) return;
        var dv = el('div'); dv.appendChild(el('dt', null, linha[0])); dv.appendChild(el('dd', null, linha[1])); ficha.appendChild(dv);
      });
      tx.appendChild(ficha);
      if (b.descricao) tx.appendChild(el('p', null, b.descricao));
      if (!vendido) {
        var bt = el('a', 'botao', 'Perguntar pelo WhatsApp');
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
  }

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
  function ajustaBotao() { var parado = video.paused; pausa.textContent = parado ? 'Tocar vídeo' : 'Pausar vídeo'; pausa.setAttribute('aria-pressed', String(parado)); }
  if (video) {
    pausa.addEventListener('click', function () {
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
  var io = new IntersectionObserver(function (es) {
    var n = 0;
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.style.transitionDelay = Math.min(n++, 6) * 75 + 'ms';
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  $$('[data-rv]').forEach(function (e) { io.observe(e); });

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

  /* ---------- serviços: o índice ao lado acompanha a leitura ---------- */
  var indice = $('[data-indice]');
  if (indice) {
    var marca = function (id) {
      $$('a', indice).forEach(function (a) {
        var ativo = a.getAttribute('href') === '#' + id;
        if (ativo) { a.setAttribute('aria-current', 'true'); indice.style.setProperty('--y', a.parentNode.offsetTop + 'px'); }
        else a.removeAttribute('aria-current');
      });
    };
    marca($('.fileira').id);
    var ioIndice = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) marca(e.target.id); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    $$('.fileira').forEach(function (f) { ioIndice.observe(f); });
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

  /* ---------- tudo que anda com a rolagem ---------- */
  var pousada = $('.pousada'), trilho = $('[data-triptico]');
  if (!reduz && pousada) pousada.classList.add('pin');
  var rumoBarco = $('.rumo-barco'), rumoEsteira = $('.rumo-esteira');
  var derivas = $$('[data-deriva]'), rosa = $('[data-rosa]'), local = $('.local'), cabo = $('[data-cabo]'), diario = $('.diario');
  var triC = $('.tri-c'), triL = $('.tri-l'), triR = $('.tri-r'), cabeca = $('.pousada-cabeca');
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
