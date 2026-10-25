/* Marina Boreste, versão nova: rolagem suave, topo, menu, revelações, parallax, rosa dos ventos,
   serviços, contadores, vídeo, coordenadas, formulário e fotos ampliadas.
   Com movimento reduzido nada se desloca: sem rolagem suave, parallax, rosa girando nem vídeo automático. */
(function () {
  'use strict';
  window.__site = true;
  var raiz = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var anima = raiz.classList.contains('anima');
  var temIO = 'IntersectionObserver' in window;
  var VH = innerHeight;

  /* a entrada do logotipo toca uma vez por visita */
  if ($('.hero')) { try { sessionStorage.setItem('mb-intro', '1'); } catch (e) {} }

  /* ----- rolagem suave (Lenis), desligada no movimento reduzido; no toque fica a rolagem nativa ----- */
  var lenis = null;
  if (!reduz && window.Lenis) lenis = new window.Lenis({ autoRaf: true, lerp: 0.1 });
  function rolaPara(y, imediato) {
    if (lenis) lenis.scrollTo(y, { immediate: !!imediato, force: true });
    else scrollTo({ top: y, behavior: imediato || reduz ? 'auto' : 'smooth' });
  }

  /* ----- topo: transparente sobre o vídeo, some ao descer e volta ao subir ----- */
  var topo = $('[data-topo]'), hero = $('.hero'), fab = $('[data-volta-topo]'), menu = $('#menu');
  var ultimoY = scrollY, menuAberto = false;
  function atualizaTopo(y) {
    if (!topo) return;
    if (hero) topo.classList.toggle('sobre-hero', y < hero.offsetHeight - topo.offsetHeight);
    var esconde = y > ultimoY + 4 && y > 240 && !menuAberto && !topo.contains(document.activeElement);
    if (esconde) topo.classList.add('escondido');
    else if (y < ultimoY - 4 || y <= 240) topo.classList.remove('escondido');
    ultimoY = y;
  }

  /* ----- rosa dos ventos: gira com a rolagem da página ----- */
  var rosas = $$('.rola .rosa, .fab-topo .rosa, .coord-rosa .rosa');
  function giraRosas(y) {
    var max = raiz.scrollHeight - VH, g = max > 0 ? y / max * 360 : 0;
    for (var i = 0; i < rosas.length; i++) rosas[i].style.transform = 'rotate(' + g.toFixed(1) + 'deg)';
  }

  /* ----- parallax: a foto anda um pouco dentro da moldura; o vídeo do topo desce mais devagar ----- */
  var pxVisiveis = [], heroMidia = $('[data-hero-midia]');
  if (!reduz && temIO) {
    var ioPx = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var i = pxVisiveis.indexOf(e.target);
        if (e.isIntersecting && i < 0) pxVisiveis.push(e.target);
        else if (!e.isIntersecting && i >= 0) pxVisiveis.splice(i, 1);
      });
      agenda();
    }, { rootMargin: '15% 0px' });
    $$('[data-px]').forEach(function (el) { ioPx.observe(el); });
  }
  function parallax(y) {
    var medidas = pxVisiveis.map(function (el) { return el.parentNode.getBoundingClientRect(); });   // primeiro lê tudo, depois escreve
    pxVisiveis.forEach(function (el, i) {
      var r = medidas[i], p = (r.top + r.height / 2 - VH / 2) / (VH / 2 + r.height / 2);
      el.style.transform = 'translate3d(0,' + (Math.max(-1, Math.min(1, p)) * -0.045 * r.height).toFixed(1) + 'px,0)';
    });
    if (heroMidia && y < VH * 1.2) heroMidia.style.transform = 'translate3d(0,' + (y * 0.28).toFixed(1) + 'px,0)';
  }

  var pendente = false;
  function quadro() {
    pendente = false;
    var y = scrollY;
    atualizaTopo(y);
    if (fab) fab.classList.toggle('on', y > VH * 0.9);
    if (!reduz) { giraRosas(y); parallax(y); }
  }
  function agenda() { if (!pendente) { pendente = true; requestAnimationFrame(quadro); } }
  addEventListener('scroll', agenda, { passive: true });
  addEventListener('resize', function () { VH = innerHeight; agenda(); });
  quadro();

  /* ----- revelação ao rolar: títulos palavra a palavra, depois texto e fotos ----- */
  var revelaveis = $$('[data-rv], [data-rvimg], .tx');
  if (anima && temIO) {
    $$('.tx').forEach(function (h) {
      if (h.children.length) return;
      var palavras = h.textContent.trim().split(/\s+/);
      h.textContent = '';
      palavras.forEach(function (p, i) {
        if (i) h.appendChild(document.createTextNode(' '));
        var w = document.createElement('span'), dentro = document.createElement('span');
        w.className = 'w'; w.style.setProperty('--w', i); dentro.textContent = p;
        w.appendChild(dentro); h.appendChild(w);
      });
    });
    var ioRv = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visto'); ioRv.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
    revelaveis.forEach(function (el) { ioRv.observe(el); });
  } else {
    revelaveis.forEach(function (el) { el.classList.add('visto'); });
  }

  /* ----- números que contam ----- */
  var numeros = $$('[data-conta]');
  if (anima && temIO && numeros.length) {
    numeros.forEach(function (el) { el.textContent = '0'; });
    var ioN = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        ioN.unobserve(e.target);
        var el = e.target, fim = Number(el.getAttribute('data-conta')), t0 = performance.now(), dur = 1400;
        (function passo(t) {
          var k = Math.min(1, (t - t0) / dur);
          el.textContent = Math.round(fim * (1 - Math.pow(1 - k, 3))).toLocaleString('pt-BR');
          if (k < 1) requestAnimationFrame(passo);
        })(t0);
      });
    }, { threshold: 0.6 });
    numeros.forEach(function (el) { ioN.observe(el); });
  }

  /* ----- serviços: o serviço no meio da tela acende e troca a foto fixa ----- */
  var servs = $$('[data-serv]'), fotosServ = $$('[data-serv-foto]');
  function ativaServ(i) {
    servs.forEach(function (s, k) { s.classList.toggle('ativo', k === i); });
    fotosServ.forEach(function (f, k) { f.classList.toggle('on', k === i); });
  }
  if (servs.length && temIO) {
    var ioS = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) ativaServ(servs.indexOf(e.target)); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    servs.forEach(function (s) { ioS.observe(s); });
  }

  /* ----- vídeo: carrega depois da página, toca só quando está na tela; o botão pausa vídeo e faixa ----- */
  var videos = $$('video[data-mp4]'), naTela = new Set(), paginaPronta = document.readyState === 'complete';
  var pausado = reduz;
  try { var salvo = localStorage.getItem('mb-pausado'); if (salvo !== null) pausado = salvo === '1'; } catch (e) {}
  function carrega(v) {
    if (v.__carregado) return;
    v.__carregado = 1;
    [['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(function (f) {
      var s = document.createElement('source'); s.src = v.getAttribute('data-' + f[0]); s.type = f[1]; v.appendChild(s);
    });
    v.addEventListener('playing', function () { v.classList.add('tocando'); });
    v.load();
  }
  function atualizaVideos() {
    videos.forEach(function (v) {
      if (!pausado && paginaPronta && naTela.has(v)) { carrega(v); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else if (v.__carregado) v.pause();
    });
  }
  function aplicaPausa() {
    raiz.toggleAttribute('data-pausado', pausado);
    $$('[data-pausa]').forEach(function (b) { $('.pausa-txt', b).textContent = pausado ? 'Retomar' : 'Pausar'; });
    atualizaVideos();
  }
  $$('[data-pausa]').forEach(function (b) {
    b.addEventListener('click', function () {
      pausado = !pausado;
      try { localStorage.setItem('mb-pausado', pausado ? '1' : '0'); } catch (e) {}
      aplicaPausa();
    });
  });
  if (temIO) {
    var ioV = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) naTela.add(e.target); else naTela.delete(e.target); });
      atualizaVideos();
    });
    videos.forEach(function (v) { ioV.observe(v); });
  }
  if (!paginaPronta) addEventListener('load', function () { paginaPronta = true; atualizaVideos(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) videos.forEach(function (v) { v.pause(); }); else atualizaVideos(); });
  aplicaPausa();

  /* ----- menu ----- */
  var abreBtn = $('[data-abre-menu]'), voltaFoco = true;
  function abreMenu() {
    if (!menu || menu.open) return;
    voltaFoco = true; menuAberto = true;
    menu.classList.remove('fechando');
    if (menu.showModal) menu.showModal(); else menu.setAttribute('open', '');
    abreBtn.setAttribute('aria-expanded', 'true');
    if (lenis) lenis.stop();
  }
  function fechaMenu() {
    if (!menu || !menu.open || menu.classList.contains('fechando')) return;
    var fim = function () { menu.classList.remove('fechando'); if (menu.close) menu.close(); else { menu.removeAttribute('open'); aoFechar(); } };
    if (reduz) fim(); else { menu.classList.add('fechando'); setTimeout(fim, 280); }
  }
  function aoFechar() {
    menuAberto = false;
    abreBtn.setAttribute('aria-expanded', 'false');
    if (lenis) lenis.start();
    if (voltaFoco) abreBtn.focus();
  }
  if (menu && abreBtn) {
    abreBtn.addEventListener('click', abreMenu);
    menu.addEventListener('close', aoFechar);
    menu.addEventListener('cancel', function (e) { e.preventDefault(); fechaMenu(); });   // Esc também anima a saída
    $$('[data-fecha-menu]', menu).forEach(function (b) { if (b.tagName === 'BUTTON') b.addEventListener('click', fechaMenu); });
  }

  /* ----- links internos: rolam até a seção e levam o foco ao título dela ----- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1), alvo = id && document.getElementById(id);
    if (!alvo) return;
    e.preventDefault();
    var vai = function () {
      var noTopo = id === 'inicio' || id === 'conteudo';
      var y = noTopo ? 0 : alvo.getBoundingClientRect().top + scrollY - (topo ? topo.offsetHeight : 0) - 16;
      rolaPara(y);
      var foco = noTopo ? $('#conteudo') : (alvo.matches('h1, h2, [tabindex]') ? alvo : $('h1, h2, [tabindex="-1"]', alvo));
      if (foco) foco.focus({ preventScroll: true });
      if (history.replaceState) history.replaceState(null, '', noTopo ? location.pathname + location.search : '#' + id);
    };
    if (menu && menu.contains(a)) { voltaFoco = false; fechaMenu(); setTimeout(vai, reduz ? 0 : 300); }
    else vai();
  });
  if (fab) fab.addEventListener('click', function () { rolaPara(0); var m = $('#conteudo'); if (m) m.focus({ preventScroll: true }); });

  /* o mapa é de outro domínio: quando o foco entra nele, a moldura mostra o contorno */
  var mapaFrame = $('.mapa-moldura iframe'), mapaMoldura = $('.mapa-moldura');
  if (mapaFrame) {
    addEventListener('blur', function () { setTimeout(function () { mapaMoldura.toggleAttribute('data-foco', document.activeElement === mapaFrame); }, 0); });
    addEventListener('focus', function () { mapaMoldura.removeAttribute('data-foco'); });
  }

  /* ----- copiar coordenadas ----- */
  var copia = $('#copia'), copiaStatus = $('#copia-status'), copiaT = 0;
  if (copia) copia.addEventListener('click', function () {
    var coord = $('#coord'), texto = coord.textContent;
    var fim = function (ok) {
      copia.textContent = ok ? 'Coordenadas copiadas' : 'Selecione e copie o texto ao lado';
      copia.toggleAttribute('data-ok', ok);
      copiaStatus.textContent = ok ? 'Coordenadas copiadas: ' + texto : 'Não foi possível copiar. As coordenadas estão selecionadas ao lado; use o comando de copiar.';
      if (!ok) { var sel = getSelection(), rg = document.createRange(); rg.selectNodeContents(coord); sel.removeAllRanges(); sel.addRange(rg); }
      clearTimeout(copiaT);
      copiaT = setTimeout(function () { copia.textContent = 'Copiar coordenadas'; copia.removeAttribute('data-ok'); }, 4000);
    };
    try { navigator.clipboard.writeText(texto).then(function () { fim(true); }, function () { fim(false); }); } catch (e) { fim(false); }
  });

  /* ----- formulário: valida, explica o erro em texto e abre o WhatsApp ou o e-mail ----- */
  var form = $('#form-contato'), status = $('#form-status');
  var ICONE_ERRO = '<svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="8" fill="currentColor"/><path d="M9 4.6v5.2" stroke="#0B1D2E" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="13" r="1.15" fill="#0B1D2E"/></svg>';
  var regras = {
    nome: function (v) { return v.trim() ? '' : 'Escreva o seu nome.'; },
    email: function (v) { return !v.trim() ? 'Escreva o seu e-mail.' : (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Confira o e-mail. Ele precisa ter o formato nome@exemplo.com.br.'); },
    assunto: function (v) { return v ? '' : 'Selecione o assunto.'; },
    mensagem: function (v) { return v.trim() ? '' : 'Escreva a sua mensagem.'; }
  };
  if (form) {
    var tocado = {};
    var valida = function (nome) {
      var campo = form.elements[nome], erro = $('#e-' + nome), msg = regras[nome](campo.value);
      if (msg) {
        erro.innerHTML = ICONE_ERRO + '<span><span class="sr">Erro: </span>' + msg + '</span>'; erro.hidden = false;
        campo.setAttribute('aria-invalid', 'true'); campo.setAttribute('aria-describedby', erro.id);
      } else {
        erro.hidden = true; erro.textContent = '';
        campo.removeAttribute('aria-invalid'); campo.removeAttribute('aria-describedby');
      }
      return !msg;
    };
    Object.keys(regras).forEach(function (nome) {
      var campo = form.elements[nome];
      var reage = function () { tocado[nome] = 1; if (campo.hasAttribute('aria-invalid')) valida(nome); };
      campo.addEventListener('input', reage);
      campo.addEventListener('change', reage);
      campo.addEventListener('blur', function () { if (tocado[nome]) valida(nome); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var invalidos = Object.keys(regras).filter(function (nome) { return !valida(nome); });
      if (invalidos.length) {
        status.setAttribute('data-tipo', 'erro');
        status.textContent = invalidos.length === 1 ? 'A mensagem ainda não foi enviada: falta corrigir 1 campo.' : 'A mensagem ainda não foi enviada: falta corrigir ' + invalidos.length + ' campos.';
        form.elements[invalidos[0]].focus();
        return;
      }
      var d = new FormData(form);
      var texto = 'Olá! Meu nome é ' + d.get('nome').trim() + ' (' + d.get('email').trim() + ').\nAssunto: ' + d.get('assunto') + '\n\n' + d.get('mensagem').trim();
      status.removeAttribute('data-tipo');
      if (e.submitter && e.submitter.value === 'email') {
        status.textContent = 'Abrimos o seu programa de e-mail com a mensagem pronta. É só confirmar o envio.';
        location.href = 'mailto:atendimento@boreste.com.br?subject=' + encodeURIComponent('Site: ' + d.get('assunto')) + '&body=' + encodeURIComponent(texto);
      } else {
        status.textContent = 'Abrimos o WhatsApp em uma nova aba com a mensagem pronta. É só confirmar o envio.';
        window.open('https://wa.me/5512997292082?text=' + encodeURIComponent(texto), '_blank', 'noopener');
      }
    });
  }

  /* ----- fotos que ampliam: todas as da página numa galeria ----- */
  var zoom = $('#foto-zoom'), fotos = $$('button.zoom');
  if (zoom && fotos.length) {
    var zImg = $('[data-zoom-img]', zoom), zLeg = $('[data-zoom-legenda]', zoom), zN = $('[data-zoom-n]', zoom), zAviso = $('[data-zoom-aviso]', zoom);
    var zi = 0, zOrigem = null, x0 = null;
    $('[data-zoom-total]', zoom).textContent = fotos.length;
    var maior = function (b) {
      var src = $('source[type="image/webp"]', b), set = src ? src.getAttribute('srcset') : '';
      return set ? set.split(',').pop().trim().split(' ')[0] : $('img', b).currentSrc;
    };
    var mostra = function (i, avisa) {
      zi = (i + fotos.length) % fotos.length;
      var img = $('img', fotos[zi]);
      zImg.src = maior(fotos[zi]); zImg.alt = img.alt; zLeg.textContent = img.alt; zN.textContent = zi + 1;
      if (avisa) zAviso.textContent = 'Foto ' + (zi + 1) + ' de ' + fotos.length + ': ' + img.alt;
    };
    fotos.forEach(function (b, i) {
      b.addEventListener('click', function () {
        zOrigem = b; mostra(i, false); zAviso.textContent = '';
        if (zoom.showModal) zoom.showModal(); else zoom.setAttribute('open', '');
        if (lenis) lenis.stop();
      });
    });
    var fechaZoom = function () { if (zoom.close) zoom.close(); else zoom.removeAttribute('open'); };
    zoom.addEventListener('close', function () { if (lenis) lenis.start(); if (zOrigem) zOrigem.focus({ preventScroll: true }); });
    $('[data-zoom-fecha]', zoom).addEventListener('click', fechaZoom);
    $$('[data-zoom-dir]', zoom).forEach(function (b) { b.addEventListener('click', function () { mostra(zi + Number(b.getAttribute('data-zoom-dir')), true); }); });
    zoom.addEventListener('click', function (e) { if (e.target === zoom) fechaZoom(); });
    zoom.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); mostra(zi + 1, true); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); mostra(zi - 1, true); }
    });
    var palco = $('.zoom-palco', zoom);
    palco.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    palco.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) mostra(zi + (dx < 0 ? 1 : -1), true);
    });
  }
})();
