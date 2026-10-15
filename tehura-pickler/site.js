/* TEHURA PICKLER · comportamento do site: cabeçalho, menu do celular, filtro de projetos, galeria ampliada
   e entrada suave das seções. Sem bibliotecas. Tudo continua usável sem JavaScript. */
(function () {
  'use strict';

  var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- cabeçalho */
  var topo = document.querySelector('[data-topo]');
  if (topo) {
    var abertura = document.querySelector('.pagina-inicio .abertura');
    var limite = function () {
      // na página inicial o cabeçalho fica transparente até a foto da abertura passar
      return abertura ? abertura.offsetHeight - topo.offsetHeight : 8;
    };
    var atualizaTopo = function () {
      topo.classList.toggle('topo--rolado', window.scrollY > limite());
    };
    atualizaTopo();
    window.addEventListener('scroll', atualizaTopo, { passive: true });
    window.addEventListener('resize', atualizaTopo);
  }

  /* ---------------------------------------------------------------- menu do celular */
  var menu = document.querySelector('[data-menu]');
  var abrir = document.querySelector('[data-menu-abrir]');
  if (menu && abrir && typeof menu.showModal === 'function') {
    abrir.addEventListener('click', function () {
      menu.showModal();
      abrir.setAttribute('aria-expanded', 'true');
    });
    menu.querySelector('[data-menu-fechar]').addEventListener('click', function () { menu.close(); });
    menu.addEventListener('close', function () { abrir.setAttribute('aria-expanded', 'false'); });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.close(); });
    });
    // se a tela crescer até o menu completo aparecer, fecha o painel
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (e) {
      if (e.matches && menu.open) menu.close();
    });
  }

  /* ---------------------------------------------------------------- filtro de projetos */
  var filtros = document.querySelector('[data-filtros]');
  var grade = document.querySelector('[data-grade]');
  if (filtros && grade) {
    var botoes = filtros.querySelectorAll('[data-filtro]');
    var cards = grade.querySelectorAll('.card');
    var status = document.querySelector('[data-filtro-status]');
    var aplica = function (area, anunciar) {
      if (!filtros.querySelector('[data-filtro="' + area + '"]')) area = 'todos';
      var visiveis = 0;
      botoes.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filtro === area)); });
      cards.forEach(function (c) {
        var mostra = area === 'todos' || c.dataset.categoria === area;
        c.hidden = !mostra;
        if (mostra) visiveis++;
      });
      if (anunciar && status) {
        status.textContent = visiveis === 1 ? status.dataset.modeloUm : status.dataset.modelo.replace('{n}', visiveis);
      }
      var hash = area === 'todos' ? '' : '#' + area;
      if (window.location.hash !== hash) history.replaceState(null, '', hash || window.location.pathname);
    };
    filtros.hidden = false;
    botoes.forEach(function (b) {
      b.addEventListener('click', function () { aplica(b.dataset.filtro, true); });
    });
    aplica(window.location.hash.slice(1) || 'todos', false);
  }

  /* ---------------------------------------------------------------- galeria ampliada */
  var galeria = document.querySelector('[data-galeria]');
  var ampliada = document.querySelector('[data-ampliada]');
  if (galeria && ampliada && typeof ampliada.showModal === 'function') {
    var itens = galeria.querySelectorAll('[data-galeria-indice]');
    var figura = ampliada.querySelector('[data-ampliada-figura]');
    var contador = ampliada.querySelector('[data-ampliada-contador]');
    var modelo = JSON.parse(ampliada.dataset.rotulos).de;
    var atual = 0;
    var mostra = function (i) {
      atual = (i + itens.length) % itens.length;
      var copia = itens[atual].querySelector('.foto').cloneNode(true);
      var img = copia.querySelector('img');
      if (img) img.removeAttribute('loading');
      figura.replaceChildren(copia);
      contador.textContent = modelo.replace('{n}', atual + 1).replace('{total}', itens.length);
    };
    itens.forEach(function (botao) {
      botao.addEventListener('click', function () {
        mostra(Number(botao.dataset.galeriaIndice));
        ampliada.showModal();
      });
    });
    ampliada.querySelector('[data-ampliada-fechar]').addEventListener('click', function () { ampliada.close(); });
    ampliada.querySelector('[data-ampliada-anterior]').addEventListener('click', function () { mostra(atual - 1); });
    ampliada.querySelector('[data-ampliada-proxima]').addEventListener('click', function () { mostra(atual + 1); });
    ampliada.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); mostra(atual - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); mostra(atual + 1); }
    });
    // ao fechar, o foco volta para a foto que está aberta
    ampliada.addEventListener('close', function () { itens[atual].focus(); });
    // deslizar o dedo para os lados troca de foto
    var inicioX = null;
    ampliada.addEventListener('touchstart', function (e) { inicioX = e.touches[0].clientX; }, { passive: true });
    ampliada.addEventListener('touchend', function (e) {
      if (inicioX === null) return;
      var dx = e.changedTouches[0].clientX - inicioX;
      if (Math.abs(dx) > 50) mostra(atual + (dx < 0 ? 1 : -1));
      inicioX = null;
    });
  }

  /* ---------------------------------------------------------------- entrada suave das seções */
  if (!reduzMovimento && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js');
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visivel'); observador.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('[data-revelar]').forEach(function (el) { observador.observe(el); });
  }
})();
