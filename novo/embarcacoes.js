/* Embarcações à venda: monta a lista (compra-e-venda.html) e a página de cada barco (embarcacao.html)
   a partir de ../dados/barcos.js, o mesmo arquivo da versão atual do site: atualizar a lista lá vale para as duas versões.
   Para anunciar, editar ou marcar como vendido, veja as instruções no alto de dados/barcos.js. */
(function () {
  var WPP = 'https://wa.me/5512997292082';
  var RAIZ = '../';
  var barcos = (Array.isArray(window.BARCOS) ? window.BARCOS : []).filter(function (b) { return b && b.nome; });
  var icone = document.querySelector('.topo-wpp svg');

  function el(tag, classe, texto) { var e = document.createElement(tag); if (classe) e.className = classe; if (texto != null) e.textContent = texto; return e; }
  function simples(t) { return String(t == null ? '' : t).normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase(); }
  function chave(b) { return simples(b.nome + ' ' + (b.ano || '')).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }   // a mesma da versão atual
  function vendido(b) { return simples(b.status) === 'vendido'; }
  function caminho(f) { return /^(https?:)?\//.test(f) ? f : RAIZ + f; }
  function endereco(b) { return 'embarcacao.html?barco=' + encodeURIComponent(chave(b)); }

  /* preço: o valor e, embaixo, "Preço negociável"; sem valor, só "Preço negociável" */
  function preco(b, alvo) {
    var v = b.preco;
    if (v == null || v === '' || v === 0) { alvo.appendChild(el('p', 'preco', 'Preço negociável')); return; }
    alvo.appendChild(el('p', 'preco', typeof v === 'number' ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }) : String(v)));
    alvo.appendChild(el('p', 'preco-nota', 'Preço negociável'));
  }
  function ficha(b) {
    var dl = el('dl', 'ficha');
    [['Ano', b.ano], ['Tamanho', b.pes ? b.pes + ' pés' : ''], ['Motor', b.motor]].forEach(function (d) {
      if (d[1] == null || d[1] === '' || d[1] === 0) return;
      dl.appendChild(el('dt', null, d[0])); dl.appendChild(el('dd', null, String(d[1])));
    });
    return dl.children.length ? dl : null;
  }
  function botaoWpp(b) {
    var a = el('a', 'btn btn-azul');
    a.href = WPP + '?text=' + encodeURIComponent('Olá! Tenho interesse no barco ' + b.nome + ', anunciado no site da Marina Boreste.');
    a.target = '_blank'; a.rel = 'noopener';
    if (icone) a.appendChild(icone.cloneNode(true));
    a.appendChild(document.createTextNode('Falar no WhatsApp sobre este barco'));
    a.appendChild(el('span', 'sr', ': ' + b.nome + ' (abre em nova aba)'));
    return a;
  }
  function imagem(b, img) {
    if (b.foto) { img.src = caminho(b.foto); img.alt = b.descricaoFoto || ''; }
    else { img.src = RAIZ + 'imagens/logo-marina-boreste.svg'; img.alt = ''; }   // sem foto: o logotipo no lugar
    img.decoding = 'async';
  }

  /* ----- lista de cartões ----- */
  var lista = document.getElementById('barcos');
  if (lista) {
    var disponiveis = 0;
    barcos.forEach(function (b) {
      var foi = vendido(b);
      if (!foi) disponiveis++;
      var li = el('li', 'barco'); li.setAttribute('data-rv', '');
      if (foi) li.setAttribute('data-vendido', '');
      var moldura = el('a', b.foto ? 'barco-foto' : 'barco-foto barco-sem-foto'), img = el('img');
      moldura.href = endereco(b); moldura.tabIndex = -1; moldura.setAttribute('aria-hidden', 'true');
      imagem(b, img); img.width = 900; img.height = 1200; img.loading = 'lazy';
      moldura.appendChild(img);
      if (foi) moldura.appendChild(el('span', 'barco-etiqueta', 'Vendido'));
      li.appendChild(moldura);
      var corpo = el('div', 'barco-corpo');
      var titulo = el('h2'), link = el('a', null, b.nome);
      link.href = endereco(b);
      if (foi) link.appendChild(el('span', 'sr', ' (vendido)'));
      titulo.appendChild(link); corpo.appendChild(titulo);
      preco(b, corpo);
      var f = ficha(b); if (f) corpo.appendChild(f);
      if (b.descricao) corpo.appendChild(el('p', 'barco-desc', b.descricao));
      if (!foi) corpo.appendChild(botaoWpp(b));
      li.appendChild(corpo); lista.appendChild(li);
    });
    if (!disponiveis) document.getElementById('barcos-vazio').hidden = false;   // nenhum disponível: mensagem e WhatsApp
    if (!lista.children.length) lista.hidden = true;
  }

  /* ----- página de um barco ----- */
  var pagina = document.getElementById('embarcacao');
  if (pagina) {
    var fotos = document.getElementById('emb-fotos'), info = document.getElementById('emb-info');
    var titulo = document.getElementById('t-embarcacao'), naoAchou = document.getElementById('emb-nao-achou');
    var pedido = new URLSearchParams(location.search).get('barco') || '';
    var b = barcos.filter(function (x) { return chave(x) === pedido; })[0];
    if (!b) { titulo.textContent = 'Embarcação não encontrada'; naoAchou.hidden = false; return; }

    var foi = vendido(b);
    if (foi) pagina.setAttribute('data-vendido', '');
    document.title = b.nome + ' | Embarcações à venda | Marina Boreste';
    var aqui = location.href.split('#')[0];
    var can = document.querySelector('link[rel="canonical"]'); if (can) can.href = aqui;
    var ogu = document.querySelector('meta[property="og:url"]'); if (ogu) ogu.content = aqui;
    var ogt = document.querySelector('meta[property="og:title"]'); if (ogt) ogt.content = document.title;

    /* fotos: a de capa grande; com mais de uma, miniaturas embaixo para trocar */
    var lista2 = [];
    if (b.foto) lista2.push({ src: caminho(b.foto), alt: b.descricaoFoto || '' });
    (Array.isArray(b.maisFotos) ? b.maisFotos : []).forEach(function (f) { if (f) lista2.push({ src: caminho(f), alt: '' }); });
    var moldura = el('figure', 'emb-foto'), img = el('img');
    imagem(b, img); img.fetchPriority = 'high';
    if (!b.foto) moldura.className = 'emb-foto barco-sem-foto';
    moldura.appendChild(img); fotos.appendChild(moldura);
    if (lista2.length > 1) {
      var mini = el('ul', 'emb-miniaturas');
      lista2.forEach(function (f, i) {
        var li = el('li'), bt = el('button'), m = el('img');
        bt.type = 'button'; bt.setAttribute('aria-label', 'Ver a foto ' + (i + 1) + ' de ' + lista2.length);
        if (!i) bt.setAttribute('aria-current', 'true');
        m.src = f.src; m.alt = ''; m.loading = 'lazy'; m.decoding = 'async';
        bt.appendChild(m); li.appendChild(bt); mini.appendChild(li);
        bt.addEventListener('click', function () {
          img.src = f.src; img.alt = f.alt || (b.nome + ', foto ' + (i + 1) + ' de ' + lista2.length);
          mini.querySelectorAll('button').forEach(function (x) { x.removeAttribute('aria-current'); });
          bt.setAttribute('aria-current', 'true');
        });
      });
      fotos.appendChild(mini);
    }
    fotos.hidden = false;

    /* nome, preço, dados, descrição e, embaixo de tudo, o contato */
    titulo.textContent = b.nome;
    if (foi) info.appendChild(el('p', 'preco', 'Vendido')); else preco(b, info);
    var f = ficha(b); if (f) info.appendChild(f);
    if (b.descricao) {
      var desc = el('div', 'emb-desc'); desc.appendChild(el('h2', null, 'Descrição')); desc.appendChild(el('p', null, b.descricao));
      info.appendChild(desc);
    }
    if (!foi) info.appendChild(botaoWpp(b));
    else { var volta = el('a', 'btn btn-linha', 'Ver as embarcações à venda'); volta.href = 'compra-e-venda.html'; info.appendChild(volta); }
  }
})();
