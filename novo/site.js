/* Marina Boreste, nova versão: script comum a todas as páginas */
(function(){
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* topo: fica sólido depois do hero (na página inicial) */
  var topo = document.querySelector('[data-topo]');
  var hero = document.querySelector('.hero');
  if (topo && hero){
    var ajusta = function(){ topo.classList.toggle('solido', window.scrollY > hero.offsetHeight - topo.offsetHeight - 40); };
    ajusta(); window.addEventListener('scroll', ajusta, {passive:true}); window.addEventListener('resize', ajusta);
  }

  /* menu */
  var menu = document.getElementById('menu'), abre = document.querySelector('[data-abre-menu]');
  if (menu && abre && menu.showModal){
    abre.addEventListener('click', function(){ menu.showModal(); abre.setAttribute('aria-expanded','true'); });
    menu.addEventListener('close', function(){ abre.setAttribute('aria-expanded','false'); abre.focus(); });
    menu.addEventListener('click', function(e){
      if (e.target.closest('[data-fecha-menu]') || e.target.closest('[data-fecha]')) menu.close();
    });
  }

  /* vídeo do hero: só toca se a pessoa não pediu menos movimento; botão de pausa sempre visível */
  var video = document.querySelector('[data-video]'), pausa = document.querySelector('[data-pausa]');
  if (video && pausa){
    var txt = pausa.querySelector('[data-pausa-txt]');
    var estado = function(tocando){ txt.textContent = tocando ? 'Pausar vídeo' : 'Tocar vídeo'; pausa.classList.toggle('parado', !tocando); };
    var toca = function(){ video.preload = 'auto'; var p = video.play(); if (p && p.catch) p.catch(function(){ estado(false); }); };
    pausa.hidden = false;
    video.addEventListener('playing', function(){ estado(true); video.style.opacity = 1; });
    video.addEventListener('pause', function(){ estado(false); });
    pausa.addEventListener('click', function(){ video.paused ? toca() : video.pause(); });
    if (!reduz.matches && !(navigator.connection && navigator.connection.saveData)) toca(); else estado(false);
  }

  /* serviços: a foto ao lado acompanha o serviço aberto ou apontado */
  var fotos = document.querySelectorAll('[data-srv-foto]'), legenda = document.querySelector('[data-srv-legenda]');
  if (fotos.length){
    var mostra = function(k){
      fotos.forEach(function(f){
        var sim = f.getAttribute('data-srv-foto') === k;
        f.classList.toggle('ativa', sim);
        if (sim && legenda) legenda.textContent = f.getAttribute('data-legenda');
      });
    };
    document.querySelectorAll('[data-srv]').forEach(function(d){
      var k = d.getAttribute('data-srv'), s = d.querySelector('summary');
      s.addEventListener('mouseenter', function(){ mostra(k); });
      s.addEventListener('focus', function(){ mostra(k); });
      d.addEventListener('toggle', function(){ if (d.open) mostra(k); });
    });
  }

  /* copiar coordenadas */
  var copia = document.querySelector('[data-copia]'), status = document.querySelector('[data-copia-status]');
  if (copia){
    copia.addEventListener('click', function(){
      var v = copia.getAttribute('data-copia'), feito = function(){ copia.textContent = 'Coordenadas copiadas'; if (status) status.textContent = 'Coordenadas copiadas.'; setTimeout(function(){ copia.textContent = 'Copiar coordenadas'; }, 2400); };
      if (navigator.clipboard) navigator.clipboard.writeText(v).then(feito, function(){ if (status) status.textContent = 'Não foi possível copiar. As coordenadas são ' + v; });
    });
  }

  /* formulário: monta a mensagem e abre no WhatsApp ou no e-mail */
  var form = document.querySelector('[data-form]');
  if (form){
    var fStatus = form.querySelector('[data-form-status]'), quem = 'whatsapp';
    form.querySelectorAll('button[type=submit]').forEach(function(b){ b.addEventListener('click', function(){ quem = b.value; }); });
    var campos = [
      ['f-nome', 'e-nome', function(v){ return v ? '' : 'Escreva o seu nome.'; }],
      ['f-email', 'e-email', function(v){ return !v ? 'Escreva o seu e-mail.' : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Confira o e-mail: ele precisa ter o formato nome@exemplo.com.'); }],
      ['f-assunto', 'e-assunto', function(v){ return v ? '' : 'Escolha um assunto.'; }],
      ['f-mensagem', 'e-mensagem', function(v){ return v ? '' : 'Escreva a sua mensagem.'; }]
    ];
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var primeiro = null;
      campos.forEach(function(c){
        var el = document.getElementById(c[0]), er = document.getElementById(c[1]), msg = c[2](el.value.trim());
        er.textContent = msg; er.hidden = !msg; el.setAttribute('aria-invalid', msg ? 'true' : 'false');
        if (msg && !primeiro) primeiro = el;
      });
      if (primeiro){ primeiro.focus(); fStatus.textContent = 'Há campos para corrigir.'; return; }
      var v = function(id){ return document.getElementById(id).value.trim(); };
      var texto = 'Olá! Meu nome é ' + v('f-nome') + ' (' + v('f-email') + ').\nAssunto: ' + v('f-assunto') + '\n\n' + v('f-mensagem');
      if (quem === 'email'){
        location.href = 'mailto:atendimento@boreste.com.br?subject=' + encodeURIComponent(v('f-assunto') + ' (site)') + '&body=' + encodeURIComponent(texto);
        fStatus.textContent = 'Abrindo o seu programa de e-mail com a mensagem pronta.';
      } else {
        window.open('https://wa.me/5512997292082?text=' + encodeURIComponent(texto), '_blank', 'noopener');
        fStatus.textContent = 'Abrindo o WhatsApp com a mensagem pronta.';
      }
    });
  }
})();
