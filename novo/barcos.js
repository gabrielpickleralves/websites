/* Embarcações à venda: monta os cartões e a página de cada barco a partir de ../dados/barcos.js
   (o mesmo arquivo da versão atual do site: atualizar a lista lá vale para as duas versões). */
(function(){
  var WPP = 'https://wa.me/5512997292082';
  var RAIZ = '../';
  var barcos = (Array.isArray(window.BARCOS) ? window.BARCOS : []).filter(function(b){ return b && b.nome; });
  var icone = document.querySelector('.topo .btn-azul svg');

  function el(tag, classe, texto){ var e = document.createElement(tag); if (classe) e.className = classe; if (texto != null) e.textContent = texto; return e; }
  function simples(t){ return String(t == null ? '' : t).normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase(); }
  function chave(b){ return simples(b.nome + ' ' + (b.ano || '')).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }   // a mesma da versão atual
  function vendido(b){ return simples(b.status) === 'vendido'; }
  function preco(v){
    if (v == null || v === '' || v === 0) return 'Preço negociável';
    return typeof v === 'number' ? v.toLocaleString('pt-BR', {style:'currency', currency:'BRL', maximumFractionDigits:0}) : String(v);
  }
  function caminho(f){ return /^(https?:)?\//.test(f) ? f : RAIZ + f; }
  function ficha(b){
    var dl = el('dl', 'ficha');
    [['Ano', b.ano], ['Tamanho', b.pes ? b.pes + ' pés' : ''], ['Motor', b.motor]].forEach(function(d){
      if (d[1] == null || d[1] === '' || d[1] === 0) return;
      dl.appendChild(el('dt', null, d[0])); dl.appendChild(el('dd', null, String(d[1])));
    });
    return dl.children.length ? dl : null;
  }
  function botaoWpp(b){
    var a = el('a', 'btn btn-azul');
    a.href = WPP + '?text=' + encodeURIComponent('Olá! Tenho interesse no barco ' + b.nome + ', anunciado no site da Marina Boreste.');
    a.target = '_blank'; a.rel = 'noopener';
    if (icone) a.appendChild(icone.cloneNode(true));
    a.appendChild(document.createTextNode('Falar no WhatsApp'));
    a.appendChild(el('span', 'sr', ' sobre ' + b.nome + ' (abre em nova aba)'));
    return a;
  }

  /* lista de cartões (página de vendas e prévia na página inicial) */
  var lista = document.querySelector('[data-barcos]');
  if (lista){
    var limite = parseInt(lista.getAttribute('data-limite'), 10) || Infinity;
    var mostrar = barcos.slice().sort(function(a, b){ return vendido(a) - vendido(b); }).slice(0, limite);
    if (lista.hasAttribute('data-limite')) mostrar = mostrar.filter(function(b){ return !vendido(b); });
    mostrar.forEach(function(b){
      var v = vendido(b), li = el('li', 'barco');
      if (v) li.setAttribute('data-vendido', '');
      var moldura = el('div', b.foto ? 'barco-foto' : 'barco-foto sem'), img = el('img');
      img.decoding = 'async'; img.loading = 'lazy';
      if (b.foto){ img.src = caminho(b.foto); img.alt = b.descricaoFoto || ''; img.width = 800; img.height = 600; }
      else { img.src = RAIZ + 'imagens/logo-marina-boreste.svg'; img.alt = ''; img.width = 470; img.height = 180; }
      moldura.appendChild(img);
      if (v){ var etq = el('span', 'barco-etq', 'Vendido'); etq.setAttribute('aria-hidden', 'true'); moldura.appendChild(etq); }
      li.appendChild(moldura);
      var corpo = el('div', 'barco-corpo'), h = el('h3'), a = el('a', null, b.nome);
      a.href = 'embarcacao.html?barco=' + encodeURIComponent(chave(b));
      if (v) a.appendChild(el('span', 'sr', ' (vendido)'));
      h.appendChild(a); corpo.appendChild(h);
      var f = ficha(b); if (f) corpo.appendChild(f);
      corpo.appendChild(el('p', 'barco-preco', v ? 'Vendido' : preco(b.preco)));
      if (!v) corpo.appendChild(botaoWpp(b));
      li.appendChild(corpo); lista.appendChild(li);
    });
    var vazio = document.querySelector('[data-barcos-vazio]');
    if (!barcos.some(function(b){ return !vendido(b); }) && vazio) vazio.hidden = false;
    if (!lista.children.length) lista.hidden = true;
  }

  /* página de um barco: embarcacao.html?barco=... */
  var emb = document.querySelector('[data-emb]');
  if (emb){
    var titulo = emb.querySelector('[data-emb-titulo]'), info = emb.querySelector('[data-emb-info]'), fotos = emb.querySelector('[data-emb-fotos]');
    var pedido = new URLSearchParams(location.search).get('barco') || '';
    var b = barcos.filter(function(x){ return chave(x) === pedido; })[0];
    if (!b){ titulo.textContent = 'Embarcação não encontrada'; emb.querySelector('[data-emb-nao-achou]').hidden = false; return; }
    var v = vendido(b);
    document.title = b.nome + ' | Embarcações à venda | Marina Boreste';
    titulo.textContent = b.nome;

    var lst = [];
    if (b.foto) lst.push({src: caminho(b.foto), alt: b.descricaoFoto || ''});
    (Array.isArray(b.maisFotos) ? b.maisFotos : []).forEach(function(f){ if (f) lst.push({src: caminho(f), alt: ''}); });
    var fig = el('figure', lst.length ? 'emb-foto' : 'emb-foto sem'), img = el('img');
    img.decoding = 'async';
    if (lst.length){ img.src = lst[0].src; img.alt = lst[0].alt; }
    else { img.src = RAIZ + 'imagens/logo-marina-boreste.svg'; img.alt = ''; }
    fig.appendChild(img); fotos.appendChild(fig);
    if (lst.length > 1){
      var mini = el('ul', 'emb-mini');
      lst.forEach(function(f, i){
        var li = el('li'), bt = el('button'), m = el('img');
        bt.type = 'button'; bt.setAttribute('aria-label', 'Ver a foto ' + (i + 1) + ' de ' + lst.length);
        if (!i) bt.setAttribute('aria-current', 'true');
        m.src = f.src; m.alt = ''; m.loading = 'lazy';
        bt.appendChild(m); li.appendChild(bt); mini.appendChild(li);
        bt.addEventListener('click', function(){
          img.src = f.src; img.alt = f.alt || (b.nome + ', foto ' + (i + 1) + ' de ' + lst.length);
          mini.querySelectorAll('button').forEach(function(x){ x.removeAttribute('aria-current'); });
          bt.setAttribute('aria-current', 'true');
        });
      });
      fotos.appendChild(mini);
    }

    info.appendChild(el('p', 'emb-preco', v ? 'Vendido' : preco(b.preco)));
    var f = ficha(b); if (f) info.appendChild(f);
    if (b.descricao){ var d = el('div', 'emb-desc'); d.appendChild(el('h2', null, 'Descrição')); d.appendChild(el('p', null, b.descricao)); info.appendChild(d); }
    if (!v){ info.appendChild(botaoWpp(b)); info.appendChild(el('p', 'emb-nota', 'Preço negociável. A conversa é feita com a nossa atendente, pelo WhatsApp.')); }
    else { var vt = el('a', 'btn btn-linha', 'Ver as embarcações à venda'); vt.href = 'compra-e-venda.html'; info.appendChild(vt); }
  }
})();
