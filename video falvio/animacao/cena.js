import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const W = 1080, H = 1920, ESPACO = 40; // distância entre as cenas no mundo
const tempos = await (await fetch('tempos.json')).json();
await document.fonts.load('800 58px Inter');
await document.fonts.load('700 64px Mono');
await document.fonts.load('500 22px Mono');
const FOTOS = {};
for (const n of ['flavio', 'trump', 'moraes', 'lula']) {
  const t = await new THREE.TextureLoader().loadAsync(`fotos/${n}.png`);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; FOTOS[n] = t;
}

// ---------- cores ----------
const COR = { fundo: '#1f2228', chao: '#2a2e35', branco: '#e9e9ec', cinza: '#8d939c', escuro: '#3a3f47',
  vermelho: '#d2343f', ouro: '#c9a23a', brasil: '#b98a8e', pais: '#8e949c', azul: '#2d3f6b' };

// ---------- renderizador ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(W, H);
renderer.setPixelRatio(1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.getElementById('palco').prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(COR.fundo);
scene.fog = new THREE.Fog(COR.fundo, 13, 26);
const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);

scene.add(new THREE.HemisphereLight(0xffffff, 0x2a2e35, 1.6));
const sol = new THREE.DirectionalLight(0xffffff, 2.4);
sol.castShadow = true;
sol.shadow.mapSize.set(2048, 2048);
Object.assign(sol.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 40 });
sol.shadow.bias = -0.0005;
sol.shadow.radius = 6;
scene.add(sol, sol.target);

const chao = new THREE.Mesh(new THREE.PlaneGeometry(600, 200), new THREE.MeshStandardMaterial({ color: COR.chao, roughness: 0.95 }));
chao.rotation.x = -Math.PI / 2;
chao.position.x = 160;
chao.receiveShadow = true;
scene.add(chao);

// poeira flutuando, como nas referências
const nPoeira = 900, poeiraBase = new Float32Array(nPoeira * 3);
for (let i = 0; i < nPoeira; i++) {
  poeiraBase[i * 3] = Math.random() * 380 - 10;
  poeiraBase[i * 3 + 1] = Math.random() * 7;
  poeiraBase[i * 3 + 2] = Math.random() * 10 - 6;
}
const poeiraGeo = new THREE.BufferGeometry();
poeiraGeo.setAttribute('position', new THREE.BufferAttribute(poeiraBase.slice(), 3));
scene.add(new THREE.Points(poeiraGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.045, transparent: true, opacity: 0.55, fog: true })));

// ---------- utilidades ----------
const clamp = (x) => Math.min(1, Math.max(0, x));
const easeOutBack = (x) => { const c = 1.6; return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2; };
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
const easeOut = (x) => 1 - (1 - x) ** 3;
const lerp = (a, b, k) => a + (b - a) * k;
const v3 = (x, y, z) => new THREE.Vector3(x, y, z);

const mat = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.5, metalness: 0.05, ...o });
function sombra(m) { m.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return m; }
const caixa = (w, h, d, c, r = 0.04) => sombra(new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2.01, h / 2.01, d / 2.01)), mat(c)));
const cilindro = (rt, rb, h, c) => sombra(new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 48), mat(c)));
const esfera = (r, c) => sombra(new THREE.Mesh(new THREE.SphereGeometry(r, 32, 24), mat(c)));
const capsula = (r, l, c) => sombra(new THREE.Mesh(new THREE.CapsuleGeometry(r, l, 8, 24), mat(c)));
function grupo(...filhos) { const g = new THREE.Group(); filhos.forEach((f) => g.add(f)); return g; }
const em = (o, x, y, z) => { o.position.set(x, y, z); return o; };

// etiqueta de texto (canvas -> plano que sempre olha para a câmera)
function etiqueta(texto, { fundo = COR.escuro, cor = '#f4f4f4', h = 0.24, fonte = '700 64px Mono', billboard = true, borda = null } = {}) {
  const linhas = texto.split('\n');
  const c = document.createElement('canvas'), ctx = c.getContext('2d');
  ctx.font = fonte;
  const pad = 40, lh = 84;
  const larg = Math.ceil(Math.max(...linhas.map((l) => ctx.measureText(l).width)) + pad * 2);
  const alt = lh * linhas.length + 36;
  c.width = larg; c.height = alt;
  ctx.font = fonte;
  if (fundo) { ctx.fillStyle = fundo; ctx.beginPath(); ctx.roundRect(0, 0, larg, alt, 14); ctx.fill(); }
  if (borda) { ctx.strokeStyle = borda; ctx.lineWidth = 8; ctx.beginPath(); ctx.roundRect(4, 4, larg - 8, alt - 8, 12); ctx.stroke(); }
  ctx.fillStyle = cor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  linhas.forEach((l, i) => ctx.fillText(l, larg / 2, 18 + lh * (i + 0.5) + 3));
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const altura = h * linhas.length;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(altura * larg / alt * (alt / (lh * linhas.length)), altura * (alt / (lh * linhas.length))),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false, fog: false }));
  m.userData.billboard = billboard;
  m.renderOrder = 10;
  return m;
}

// textura de documento: título + linhas de texto falso
function documento(titulo, w = 0.8, h = 1.05, { carimbo = null, corTitulo = '#222' } = {}) {
  const c = document.createElement('canvas'); c.width = 512; c.height = Math.round(512 * h / w);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#f3f1ec'; ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = corTitulo; ctx.font = '700 44px Mono'; ctx.textAlign = 'center';
  titulo.split('\n').forEach((l, i) => ctx.fillText(l, 256, 90 + i * 52));
  ctx.fillStyle = '#b9b6ae';
  for (let y = 170 + titulo.split('\n').length * 30, i = 0; y < c.height - 70; y += 38, i++) ctx.fillRect(60, y, i % 3 === 2 ? 260 : 392, 14);
  if (carimbo) {
    ctx.save(); ctx.translate(256, c.height - 130); ctx.rotate(-0.18);
    ctx.strokeStyle = COR.vermelho; ctx.lineWidth = 10; ctx.strokeRect(-190, -50, 380, 100);
    ctx.fillStyle = COR.vermelho; ctx.font = '700 46px Mono'; ctx.fillText(carimbo, 0, 16); ctx.restore();
  }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const corpo = caixa(w, h, 0.03, '#f3f1ec', 0.01);
  const frente = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.98, h * 0.98), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 }));
  frente.position.z = 0.017;
  return grupo(corpo, frente);
}

// rosto em círculo (foto) que sempre olha para a câmera
function retrato(nome, r = 0.26, borda = '#f2f2f2') {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CircleGeometry(r * 1.1, 64), new THREE.MeshBasicMaterial({ color: borda, toneMapped: false, fog: false })));
  const foto = new THREE.Mesh(new THREE.CircleGeometry(r, 64), new THREE.MeshBasicMaterial({ map: FOTOS[nome], toneMapped: false, fog: false }));
  foto.position.z = 0.002;
  g.add(foto);
  g.userData.billboard = true;
  return g;
}

// boneco branco (manequim) como nas referências; roupa: 'terno' (homens) ou 'vestido' (mulheres); foto: rosto no lugar da cabeça
function boneco(cor = COR.branco, s = 1, roupa = 'terno', { gravata = COR.vermelho, vestido = '#7d2f42', foto = null } = {}) {
  const g = grupo(foto ? em(retrato(foto, 0.27), 0, 1.72, 0.05) : em(esfera(0.2, cor), 0, 1.66, 0), em(cilindro(0.06, 0.07, 0.12, cor), 0, 1.46, 0));
  if (roupa === 'vestido') {
    g.add(em(capsula(0.18, 0.36, vestido), 0, 1.12, 0),
      em(cilindro(0.17, 0.4, 0.62, vestido), 0, 0.72, 0),
      em(capsula(0.065, 0.36, cor), -0.1, 0.3, 0),
      em(capsula(0.065, 0.36, cor), 0.1, 0.3, 0));
  } else {
    const paleto = '#262a33', calca = '#1d2027';
    g.add(em(capsula(0.22, 0.42, paleto), 0, 1.1, 0),
      em(caixa(0.13, 0.34, 0.03, '#f2f2f2', 0.01), 0, 1.26, 0.2),
      em(caixa(0.05, 0.3, 0.03, gravata, 0.01), 0, 1.24, 0.225),
      em(capsula(0.085, 0.62, calca), -0.11, 0.42, 0),
      em(capsula(0.085, 0.62, calca), 0.11, 0.42, 0));
  }
  const manga = roupa === 'vestido' ? cor : '#262a33';
  const bE = em(capsula(0.065, 0.5, manga), -0.32, 1.08, 0); bE.rotation.z = 0.12;
  const bD = em(capsula(0.065, 0.5, manga), 0.32, 1.08, 0); bD.rotation.z = -0.12;
  g.add(bE, bD);
  g.scale.setScalar(s);
  return g;
}

const pedestal = (r = 0.5, h = 0.35, c = COR.cinza) => cilindro(r, r * 1.05, h, c);

function emblema(texto, cor = COR.ouro) {
  const g = grupo();
  const disco = cilindro(0.55, 0.55, 0.1, cor); disco.rotation.x = Math.PI / 2;
  const anel = sombra(new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.04, 16, 64), mat('#e2c56a', { metalness: 0.4 })));
  anel.position.z = 0.06;
  const e = etiqueta(texto, { fundo: null, cor: '#1d1d1d', h: 0.22, billboard: false }); e.position.z = 0.07;
  g.add(disco, anel, e);
  return g;
}

// ---------- sistema de animação ----------
const itens = [];
const C = Object.fromEntries(tempos.cenas.map((c, i) => [c.id, { ...c, i, ox: i * ESPACO }]));
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
const F = (id, n) => C[id].frases[n];
function P(id, palavra, n = 0) {
  const ps = C[id].palavras.filter((p) => norm(p.w).startsWith(norm(palavra)));
  if (!ps[n]) throw new Error(`palavra não achada: ${id}/${palavra}`);
  return ps[n].t0;
}

// coloca um objeto na cena `id`; entra em `tin` e sai quando a cena acaba
function add(id, obj, tin, { tout = C[id].fim + 1.2, update = null, cair = 0.5 } = {}) {
  obj.position.x += C[id].ox;
  scene.add(obj);
  itens.push({ obj, tin, tout, update, cair, escala: obj.scale.clone(), pos: obj.position.clone() });
  return obj;
}

function atualizarItens(t) {
  for (const it of itens) {
    const a = clamp((t - it.tin) / 0.35), b = clamp((t - (it.tout - 0.25)) / 0.25);
    const s = easeOutBack(a) * (1 - easeInOut(b));
    it.obj.visible = s > 0.002;
    if (!it.obj.visible) continue;
    it.obj.scale.copy(it.escala).multiplyScalar(Math.max(s, 0.0001));
    it.obj.position.copy(it.pos);
    it.obj.position.y += (1 - easeOut(a)) * it.cair;
    if (it.update) it.update(t, it.obj, it);
  }
}

// câmeras: por cena, posição/alvo com leve deslocamento; transição rápida entre cenas
const cams = {};
function cam(id, pos, alvo, drift = [0, 0, -0.6], fn = null) { cams[id] = { pos: v3(...pos), alvo: v3(...alvo), drift: v3(...drift), fn }; }
function poseCena(id, t) {
  const c = C[id], k = cams[id], p = clamp((t - c.inicio) / (c.fim - c.inicio));
  let pos = k.pos.clone().add(k.drift.clone().multiplyScalar(p * 1.6)), alvo = k.alvo.clone();
  if (k.fn) [pos, alvo] = k.fn(t, pos, alvo);
  const ts = c.frases.filter((f) => f <= t).pop() ?? c.inicio;
  pos.add(alvo.clone().sub(pos).normalize().multiplyScalar(Math.sin(clamp((t - ts) / 0.7) * Math.PI) * 0.25));
  pos.x += Math.sin(t * 0.9) * 0.06;
  pos.x += c.ox; alvo.x += c.ox;
  return [pos, alvo];
}

// ================= CENAS =================

// 1. GANCHO
{
  const id = 'gancho';
  cam(id, [0, 2.6, 10.6], [0, 2.0, 0], [0, 0.2, -0.9]);
  const dias = [['DOM', '25', 'PERDEU A ELEIÇÃO'], ['TER', '27', 'CRUZOU A FRONTEIRA'], ['QUA', '28', 'CHEGOU A MIAMI']];
  dias.forEach(([d, n, txt], i) => {
    const card = grupo(caixa(1.3, 1.5, 0.14, COR.branco, 0.06));
    const topo = em(caixa(1.3, 0.38, 0.16, i === 1 ? COR.vermelho : COR.escuro, 0.06), 0, 0.56, 0.01);
    const tDia = em(etiqueta(d, { fundo: null, h: 0.24, billboard: false }), 0, 0.56, 0.1);
    const tNum = em(etiqueta(n, { fundo: null, cor: '#222', h: 0.62, fonte: '800 64px Inter', billboard: false }), 0, -0.14, 0.08);
    card.add(topo, tDia, tNum);
    const x = (i - 1) * 1.55, y0 = 3.0;
    em(card, x, y0, -0.4);
    const tin = F(id, i);
    add(id, card, tin, { cair: 1.2, update: (t, o) => { o.rotation.y = Math.sin(t * 0.8 + i) * 0.08; o.position.y += clamp((t - F(id, 3)) / 0.8) * 0.7; } });
    const lab = em(etiqueta(txt, { h: 0.16 }), x, y0 - 1.0, -0.2);
    add(id, lab, tin + 0.3, { update: (t, o) => { o.position.y += easeInOut(clamp((t - F(id, 3)) / 0.8)) * 0.7; } });
  });
  const b = em(boneco(COR.branco, 1, 'terno', { foto: 'flavio' }), 0, 0, 1.8);
  add(id, b, F(id, 3), { cair: 0 });
  add(id, em(pedestal(0.55, 0.06, COR.escuro), 0, 0.03, 1.8), F(id, 3), { cair: 0 });
  add(id, em(etiqueta('FLÁVIO BOLSONARO', { fundo: COR.vermelho, h: 0.2 }), 0, 2.15, 1.8), F(id, 3) + 0.4);
}

// 2. O FATO
{
  const id = 'fato';
  cam(id, [0, 2.4, 8.6], [0, 1.8, 0], [0.3, 0, -0.8]);
  add(id, em(boneco(COR.branco, 1, 'terno', { foto: 'flavio' }), -1.3, 0, 0.6), F(id, 0), { cair: 0 });
  add(id, em(boneco(COR.branco, 0.95, 'terno', { foto: 'moraes', gravata: '#15171b' }), 0.15, 0, -1.4), P(id, 'ministro') - 0.2, { cair: 0.6 });
  add(id, em(etiqueta('ALEXANDRE DE MORAES · STF', { fundo: COR.escuro, h: 0.15 }), 0.3, 2.35, -1.3), P(id, 'ministro'));
  add(id, em(etiqueta('SENADOR', { h: 0.17 }), -1.3, 2.15, 0.6), F(id, 0) + 0.3);
  add(id, em(etiqueta('INVESTIGADO', { fundo: COR.branco, cor: '#222', h: 0.18 }), 0.75, 3.75, 0), P(id, 'investigado'));
  add(id, em(etiqueta('LAVAGEM DE DINHEIRO', { h: 0.16 }), 0.75, 3.38, 0), P(id, 'lavagem'));
  add(id, em(etiqueta('EVASÃO DE DIVISAS', { h: 0.16 }), 0.75, 3.06, 0), P(id, 'evasao'));
  add(id, em(etiqueta('PF: RISCO DE FUGA', { fundo: COR.vermelho, h: 0.2 }), -0.9, 2.75, 0.9), P(id, 'risco'));
  // decisão do STF: documento + passaporte com cadeado
  add(id, em(pedestal(0.5, 0.4), 0.15, 0.2, -0.4), F(id, 2), { cair: 0 });
  const doc = em(documento('STF\nDECISÃO', 0.75, 1.0), 0.15, 0.95, -0.45); doc.rotation.x = -0.12;
  add(id, doc, P(id, 'ministro'), { cair: 0.8 });
  add(id, em(pedestal(0.42, 0.3), 1.35, 0.15, 0.4), P(id, 'passaportes') - 0.2, { cair: 0 });
  const pass = em(grupo(caixa(0.55, 0.76, 0.08, COR.azul, 0.03),
    em(etiqueta('PASSAPORTE', { fundo: null, cor: '#e2c56a', h: 0.07, billboard: false }), 0, 0.22, 0.045),
    em(cilindro(0.11, 0.11, 0.01, '#e2c56a'), 0, -0.02, 0.045)), 1.35, 0.72, 0.4);
  pass.children[2].rotation.x = Math.PI / 2;
  add(id, pass, P(id, 'passaportes'), { update: (t, o) => { o.rotation.y = -0.35 + Math.sin(t) * 0.05; } });
  const cadeado = grupo(em(caixa(0.26, 0.22, 0.1, COR.vermelho, 0.03), 0, 0, 0),
    em(sombra(new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.025, 12, 32, Math.PI), mat('#d9d9dc', { metalness: 0.6 }))), 0, 0.11, 0));
  add(id, em(cadeado, 1.42, 0.55, 0.62), P(id, 'passaportes') + 0.4);
  add(id, em(etiqueta('24 H', { fundo: COR.vermelho, h: 0.24 }), 1.35, 1.38, 0.4), P(id, '24'));
}

// 3. A ROTA (mapa visto de cima)
{
  const id = 'rota';
  const geo = (lon, lat) => [(lon + 58) * 0.1, -(lat + 14) * 0.1];
  const FOZ = geo(-54.58, -25.55), GYE = geo(-79.9, -2.2), MIA = geo(-80.2, 25.8);
  const ponto = (p, y = 0.15) => v3(p[0], y, p[1]);
  function pais(coords, cor, alt = 0.1) {
    const s = new THREE.Shape(coords.map(([lo, la]) => { const [x, z] = geo(lo, la); return new THREE.Vector2(x, -z); }));
    const m = sombra(new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: alt, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 }), mat(cor)));
    m.rotation.x = -Math.PI / 2;
    return m;
  }
  const BR = [[-74, -8], [-70, -4], [-67, 2], [-60, 5], [-51, 4], [-50, 0], [-44, -2], [-35, -5], [-35, -9], [-39, -14], [-41, -22], [-48, -26], [-53, -33.7], [-57.6, -30.2], [-54.6, -25.6], [-55.7, -22.5], [-58, -20], [-62, -17], [-65, -11], [-70, -11], [-74, -8]];
  const AR = [[-54.6, -25.6], [-57.6, -30.2], [-58.4, -34], [-57, -37], [-62, -39], [-65, -42], [-67.5, -46], [-68.5, -52], [-69, -55], [-72, -50], [-72, -43], [-70, -36], [-69, -28], [-66, -22], [-62, -22], [-58.2, -24.5], [-54.6, -25.6]];
  const EQ = [[-81, -2], [-80, 1], [-78, 1.5], [-75.3, -0.5], [-77, -2.5], [-78.5, -4.5], [-80.3, -3.4]];
  const FL = [[-87.5, 30.8], [-81.5, 30.7], [-80.1, 26.5], [-80.4, 25.2], [-81.3, 25.3], [-82.7, 27.6], [-84.3, 30], [-86, 30.3]];
  const t0 = F(id, 0);
  add(id, pais(BR, COR.brasil, 0.14), t0 - 0.2, { cair: 0.3 });
  add(id, pais(AR, COR.pais), t0, { cair: 0.3 });
  add(id, pais(EQ, COR.pais), F(id, 2) - 0.4, { cair: 0.3 });
  add(id, pais(FL, COR.pais), F(id, 3) - 0.6, { cair: 0.3 });
  add(id, em(etiqueta('BRASIL', { fundo: null, cor: '#f0dede', h: 0.32 }), 0.6, 0.5, -0.6), t0);
  add(id, em(etiqueta('ARGENTINA', { fundo: null, cor: '#dfe2e6', h: 0.24 }), -1.0, 0.5, 1.9), t0 + 0.3);

  function alfinete(p, cor = COR.vermelho) {
    return em(grupo(em(cilindro(0.015, 0.015, 0.5, '#ddd'), 0, 0.25, 0), em(esfera(0.09, cor), 0, 0.52, 0)), p[0], 0.14, p[1]);
  }
  add(id, alfinete(FOZ), P(id, 'foz'), { cair: 1 });
  add(id, em(etiqueta('FOZ DO IGUAÇU', { h: 0.13 }), FOZ[0] + 0.1, 0.85, FOZ[1] - 0.6), P(id, 'foz') + 0.2);
  const ponte = em(caixa(0.32, 0.05, 0.08, COR.branco, 0.02), FOZ[0] - 0.02, 0.2, FOZ[1] + 0.05);
  add(id, ponte, P(id, 'ponte'), { update: (t, o) => { o.rotation.y = 0.3; } });
  add(id, em(etiqueta('PONTE TANCREDO NEVES', { h: 0.11 }), FOZ[0] + 0.25, 0.42, FOZ[1] + 0.42), P(id, 'tancredo'));
  add(id, em(etiqueta('22H50', { fundo: COR.vermelho, h: 0.17 }), FOZ[0] - 0.6, 0.9, FOZ[1] - 0.05), P(id, 'cinquenta'));

  // avião pela rota Foz -> Equador -> Miami
  const curva = new THREE.CatmullRomCurve3([ponto(FOZ, 0.25), v3(-0.9, 0.9, 0.6), ponto(GYE, 0.45), v3(-2.75, 1.0, -2.6), ponto(MIA, 0.3)]);
  const pts = curva.getSpacedPoints(400);
  const linhaGeo = new THREE.BufferGeometry().setFromPoints(pts);
  const linha = new THREE.Line(linhaGeo, new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.08, gapSize: 0.06, fog: false }));
  linha.computeLineDistances();
  const tSai = P(id, 'jatinho'), tEq = F(id, 2) + 2.2, tMia = F(id, 3) + 1.4;
  const uDe = (t) => (t < tEq ? 0.5 * easeInOut(clamp((t - tSai) / (tEq - tSai))) : 0.5 + 0.5 * easeInOut(clamp((t - tEq) / (tMia - tEq))));
  add(id, linha, tSai, { cair: 0, update: (t, o) => { o.scale.setScalar(1); o.geometry.setDrawRange(0, Math.floor(uDe(t) * 400)); } });
  const aviao = grupo(
    em(capsula(0.07, 0.4, COR.branco), 0, 0, 0),
    em(caixa(0.14, 0.02, 0.62, COR.branco, 0.01), 0, 0, 0),
    em(caixa(0.06, 0.16, 0.02, COR.branco, 0.005), -0.22, 0.08, 0),
    em(caixa(0.06, 0.02, 0.22, COR.branco, 0.005), -0.22, 0.02, 0));
  aviao.children[0].rotation.z = Math.PI / 2;
  const avW = new THREE.Group(); avW.add(aviao); aviao.scale.setScalar(1.3);
  add(id, avW, tSai, { cair: 0, update: (t, o, it) => {
    const u = Math.min(uDe(t), 0.999), p = curva.getPointAt(u), q = curva.getTangentAt(u);
    o.position.copy(p).add(v3(C[id].ox, 0, 0));
    o.rotation.set(0, Math.atan2(-q.z, q.x), 0);
  } });
  add(id, alfinete(GYE), F(id, 2), { cair: 1 });
  add(id, em(etiqueta('EQUADOR\n(ESCALA, SEGUNDO A IMPRENSA)', { h: 0.12 }), GYE[0] + 0.9, 0.95, GYE[1] + 0.1), F(id, 2) + 0.2);
  add(id, alfinete(MIA), F(id, 3) - 0.2, { cair: 1 });
  add(id, em(etiqueta('MIAMI', { fundo: COR.vermelho, h: 0.2 }), MIA[0] + 0.55, 0.95, MIA[1]), F(id, 3));
  add(id, em(etiqueta('VISTOS CONCEDIDOS', { fundo: COR.branco, cor: '#222', h: 0.16 }), MIA[0] + 1.25, 0.5, MIA[1] + 0.75), P(id, 'vistos'));
  [[0, 0.32], [0.25, 0.3], [0.48, 0.2], [0.64, 0.18]].forEach(([dx, s], i) =>
    add(id, em(boneco(COR.branco, s, i === 0 ? 'terno' : 'vestido', { vestido: ['', '#7d2f42', '#3f6d8c', '#b0894a'][i], foto: i === 0 ? 'flavio' : null }), MIA[0] + 0.8 + dx, 0.12, MIA[1] + 1.25), P(id, 'senador') + i * 0.25, { cair: 0 }));

  const CLOSE = [FOZ[0] - 0.3, 6.2, FOZ[1] + 3.8], ALVO_FOZ = [FOZ[0], 0, FOZ[1] - 0.2];
  cam(id, [-0.3, 12.6, 4.6], [-0.3, 0, -0.75], [0, 0, 0], (t, pos, alvo) => {
    const k = easeInOut(clamp((t - (tSai - 0.6)) / 2.2));
    return [v3(lerp(CLOSE[0], pos.x, k), lerp(CLOSE[1], pos.y, k), lerp(CLOSE[2], pos.z, k)),
      v3(lerp(ALVO_FOZ[0], alvo.x, k), lerp(ALVO_FOZ[1], alvo.y, k), lerp(ALVO_FOZ[2], alvo.z, k))];
  });
}

// 4. AS REAÇÕES
{
  const id = 'reacoes';
  cam(id, [0, 2.5, 9.2], [0, 2.3, 0], [0, 0, -0.7]);
  function balao(texto, w, x, y, rabo = 1) {
    const g = grupo(caixa(w, 0.62, 0.14, COR.branco, 0.18));
    const r = em(cilindro(0, 0.13, 0.28, COR.branco), rabo * w * 0.28, -0.4, 0); r.rotation.z = Math.PI + rabo * 0.4;
    g.add(r, em(etiqueta(texto, { fundo: null, cor: '#1e1e1e', h: 0.24, fonte: '800 64px Inter', billboard: false }), 0, 0, 0.08));
    return em(g, x, y, 0);
  }
  add(id, balao('NÃO VIAJOU', 1.9, -0.95, 3.75), F(id, 0), { cair: 0.8, update: (t, o) => { o.rotation.z = Math.sin(t * 1.3) * 0.03; } });
  add(id, em(etiqueta('ALIADOS', { h: 0.15 }), -0.95, 4.3, 0), F(id, 0) + 0.2);
  const carimbo = em(etiqueta('ADMITIRAM', { fundo: '#f4f4f4', cor: COR.vermelho, borda: COR.vermelho, h: 0.3, billboard: false }), -0.7, 3.05, 0.3);
  carimbo.rotation.z = 0.14;
  add(id, carimbo, F(id, 1), { cair: 0 });
  // celular com o vídeo do dia anterior
  const cel = grupo(caixa(0.82, 1.5, 0.08, '#15171b', 0.09),
    em(etiqueta('"NÃO PENSO\nEM SAIR"', { fundo: '#2d3138', h: 0.13, billboard: false }), 0, 0, 0.045));
  add(id, em(cel, 1.25, 2.5, 0.2), F(id, 2), { cair: 0.8, update: (t, o) => { o.rotation.y = -0.25 + Math.sin(t) * 0.05; } });
  add(id, em(etiqueta('1 DIA ANTES', { fundo: COR.vermelho, h: 0.15 }), 1.25, 3.42, 0.3), P(id, 'antes'));
  add(id, balao('MOEDA DE TROCA', 2.3, -0.75, 2.0, -1), F(id, 3), { cair: 0.8 });
  add(id, em(etiqueta('CARLOS JORDY · SENADOR ELEITO', { h: 0.13 }), -0.75, 1.45, 0.1), P(id, 'jordy'));
  add(id, balao('VERGONHOSA', 2.0, 0.8, 0.95), F(id, 4), { cair: 0.8 });
  add(id, em(retrato('lula', 0.34, COR.vermelho), -0.6, 0.95, 0.3), P(id, 'lula'));
  add(id, em(etiqueta('LULA · PRESIDENTE', { h: 0.13 }), 0.95, 1.5, 0.1), P(id, 'lula'));
}

// 5. PRECEDENTES
{
  const id = 'precedentes';
  cam(id, [0, 2.6, 9.6], [0, 2.0, 0], [0, 0, -0.9]);
  add(id, em(emblema('EUA'), 0, 3.6, -2.2), F(id, 1) - 0.3, { update: (t, o) => { o.rotation.y = Math.sin(t * 0.6) * 0.15; } });
  const quem = [['EDUARDO BOLSONARO', 'NOS EUA DESDE 2025', -1.55, P(id, 'eduardo')], ['FLÁVIO BOLSONARO', 'OUT. 2026', 0, F(id, 0)],
    ['ALEXANDRE RAMAGEM', 'CONDENADO PELO STF', 1.55, P(id, 'ramagem')]];
  quem.forEach(([nome, info, x, tin], i) => {
    add(id, em(pedestal(0.5, 0.3), x, 0.15, 0), tin, { cair: 0 });
    add(id, em(boneco(i === 1 ? '#f2f2f4' : '#cfd1d6', 0.85, 'terno', { foto: i === 1 ? 'flavio' : null }), x, 0.3, 0), tin + 0.1, { cair: 0.6 });
    add(id, em(etiqueta(nome, { fundo: i === 1 ? COR.vermelho : COR.escuro, h: 0.13 }), x, 2.0 + (i % 2) * 0.45, 0.2), tin + 0.3);
    add(id, em(etiqueta(info, { fundo: COR.branco, cor: '#222', h: 0.11 }), x, 1.77 + (i % 2) * 0.45, 0.2), tin + 0.5);
  });
}

// 6. 1ª PERGUNTA — mandato
{
  const id = 'pergunta1';
  cam(id, [0, 2.8, 9.0], [0, 1.7, 0], [0, 0, -0.8]);
  add(id, em(etiqueta('ELE CONTINUA SENADOR?', { fundo: COR.branco, cor: '#222', h: 0.22 }), 0, 3.95, 0), F(id, 1));
  const cadeira = grupo(em(caixa(0.9, 0.16, 0.8, COR.azul, 0.05), 0, 0.62, 0), em(caixa(0.9, 1.0, 0.14, COR.azul, 0.05), 0, 1.15, -0.36),
    em(cilindro(0.05, 0.05, 0.55, '#999'), 0, 0.28, 0), em(cilindro(0.38, 0.38, 0.04, '#999'), 0, 0.02, 0));
  add(id, em(cadeira, -1.25, 0, 0.2), F(id, 1) + 0.2, { cair: 0.6, update: (t, o) => { o.rotation.y = 0.35 + Math.sin(t * 0.7) * 0.06; } });
  add(id, em(etiqueta('POR ENQUANTO, SIM', { h: 0.15 }), -1.25, 2.0, 0.3), F(id, 2));
  // 15 sessões: 5 viram falta (1/3)
  const tFaltas = P(id, 'falta');
  for (let i = 0; i < 15; i++) {
    const col = i % 5, lin = Math.floor(i / 5);
    const bloco = em(caixa(0.26, 0.26, 0.26, COR.branco, 0.04), 0.35 + col * 0.34, 0.13 + lin * 0.34, 0.5);
    bloco.material = bloco.material.clone();
    const falta = i >= 10, tVira = tFaltas + 0.5 + (i - 10) * 0.18;
    add(id, bloco, tFaltas - 0.4 + i * 0.03, { cair: 0.8, update: (t, o) => { if (falta) o.material.color.set(t > tVira ? COR.vermelho : COR.branco); } });
  }
  add(id, em(etiqueta('1/3 DE FALTAS', { fundo: COR.vermelho, h: 0.16 }), 1.03, 1.45, 0.6), P(id, 'terco'));
  add(id, em(etiqueta('= PODE PERDER O MANDATO', { h: 0.13 }), 1.03, 1.2, 0.6), P(id, 'perder'));
  // Senado
  const senado = grupo(em(caixa(2.0, 0.14, 0.9, COR.branco, 0.02), 0, 0.07, 0), em(caixa(2.0, 0.22, 0.9, COR.branco, 0.02), 0, 1.15, 0));
  for (let i = 0; i < 6; i++) senado.add(em(cilindro(0.06, 0.07, 0.86, COR.branco), -0.8 + i * 0.32, 0.6, 0.3));
  const front = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.01, 1.15, 0.4, 3, 1), mat(COR.branco))); front.scale.z = 0.35; front.rotation.y = Math.PI / 6;
  senado.add(em(front, 0, 1.45, 0.05));
  add(id, em(senado, 0, 0, -2.0), F(id, 4) - 0.2, { cair: 0.6 });
  add(id, em(etiqueta('SENADO', { fundo: null, cor: '#222', h: 0.15 }), 0, 1.15, -1.53), F(id, 4));
  add(id, em(etiqueta('MESA DO SENADO DECLARA', { fundo: COR.vermelho, h: 0.15 }), 0, 2.15, -1.6), P(id, 'mesa'));
}

// 7. 2ª PERGUNTA — extradição
{
  const id = 'pergunta2';
  cam(id, [0, 2.7, 9.0], [0, 1.8, 0], [0, 0, -0.8]);
  add(id, em(etiqueta('DÁ PRA TRAZER DE VOLTA?', { fundo: COR.branco, cor: '#222', h: 0.22 }), 0, 3.95, 0), F(id, 0));
  add(id, em(pedestal(0.6, 0.45), -1.35, 0.22, 0), F(id, 0) + 0.3, { cair: 0 });
  add(id, em(pedestal(0.6, 0.45), 1.35, 0.22, 0), F(id, 0) + 0.45, { cair: 0 });
  add(id, em(emblema('BRASIL', '#3d8a5a'), -1.35, 1.25, 0), F(id, 0) + 0.4);
  add(id, em(emblema('EUA'), 1.35, 1.25, 0), F(id, 0) + 0.55);
  add(id, em(etiqueta('SÓ POR EXTRADIÇÃO', { fundo: COR.vermelho, h: 0.18 }), 0, 3.5, 0.2), F(id, 1));
  const tPed = P(id, 'pedido'), tChega = F(id, 3) + 0.4;
  const doc = documento('PEDIDO DE\nEXTRADIÇÃO', 0.62, 0.82);
  add(id, em(doc, -1.35, 2.2, 0.3), tPed, { update: (t, o) => {
    const u = easeInOut(clamp((t - (tPed + 1.6)) / (tChega - tPed - 1.6)));
    o.position.x = C[id].ox + lerp(-1.35, 1.35, u); o.position.y += Math.sin(u * Math.PI) * 0.5; o.rotation.z = Math.sin(u * Math.PI) * -0.2;
  } });
  add(id, em(etiqueta('+ ORDEM DE PRISÃO', { h: 0.12 }), -1.35, 1.65, 0.4), P(id, 'ordem'), { update: (t, o) => {
    const u = easeInOut(clamp((t - (tPed + 1.6)) / (tChega - tPed - 1.6)));
    o.position.x = C[id].ox + lerp(-1.35, 1.35, u); o.position.y += Math.sin(u * Math.PI) * 0.5;
  } });
  // martelo do juiz americano
  const martelo = grupo(em(cilindro(0.13, 0.13, 0.42, '#7a5233'), 0, 0, 0), em(cilindro(0.035, 0.035, 0.6, '#9a6b45'), 0, -0.3, 0));
  martelo.children[0].rotation.z = Math.PI / 2;
  const tJuiz = F(id, 3);
  add(id, em(martelo, 1.95, 1.0, 0.5), tJuiz, { update: (t, o) => {
    const k = (t - tJuiz - 0.6); o.rotation.z = k > 0 && k < 1.2 ? -Math.abs(Math.sin(k * Math.PI * 2.5)) * 0.7 : 0;
  } });
  add(id, em(etiqueta('JUSTIÇA AMERICANA DECIDE', { fundo: COR.branco, cor: '#222', h: 0.14 }), 0.9, 3.05, 0.3), P(id, 'justica'));
}

// 8. 3ª PERGUNTA — asilo
{
  const id = 'pergunta3';
  cam(id, [0, 3.0, 8.4], [0, 1.6, 0], [0, 0, -0.8]);
  add(id, em(etiqueta('E SE PEDIR ASILO?', { fundo: COR.branco, cor: '#222', h: 0.22 }), 0, 3.95, 0), F(id, 0));
  const mesa = grupo(em(caixa(2.2, 0.1, 1.1, '#8a6a4c', 0.03), 0, 0.85, 0));
  [[-1, -0.45], [1, -0.45], [-1, 0.45], [1, 0.45]].forEach(([x, z]) => mesa.add(em(caixa(0.08, 0.8, 0.08, '#6e533b', 0.02), x, 0.4, z)));
  add(id, em(mesa, 0, 0, 0), F(id, 0) + 0.2, { cair: 0.6 });
  const form = documento('PEDIDO DE\nASILO', 0.7, 0.92, { carimbo: 'EUA' });
  form.rotation.x = -Math.PI / 2 + 0.5;
  add(id, em(form, -0.3, 1.25, 0.05), P(id, 'asilo'), { cair: 1 });
  add(id, em(etiqueta('PERSEGUIÇÃO POLÍTICA?', { fundo: COR.vermelho, h: 0.16 }), 0.55, 2.35, 0.2), P(id, 'perseguicao'));
  add(id, em(emblema('EUA'), 1.3, 2.9, -1.2), F(id, 1) - 0.2);
  add(id, em(etiqueta('QUEM DECIDE: GOVERNO DOS EUA', { h: 0.14 }), 0, 0.35, 1.0), P(id, 'governo'));
}

// 9. PERSEGUIÇÃO? (versão dos aliados, atribuída)
{
  const id = 'perseguicao';
  cam(id, [0, 2.5, 9.0], [0, 2.0, 0], [0.3, 0, -0.9]);
  add(id, em(pedestal(0.5, 0.3), -1.2, 0.15, 0.5), F(id, 0), { cair: 0 });
  add(id, em(boneco(COR.branco, 0.9, 'terno', { foto: 'flavio' }), -1.2, 0.3, 0.5), F(id, 0) + 0.1, { cair: 0.6 });
  add(id, em(etiqueta('FLÁVIO BOLSONARO', { fundo: COR.vermelho, h: 0.14 }), -1.2, 2.15, 0.6), F(id, 0) + 0.2);
  add(id, em(etiqueta('ALIADOS:\n"PERSEGUIÇÃO POLÍTICA"', { fundo: COR.branco, cor: '#222', h: 0.17 }), 0, 3.95, 0), P(id, 'perseguicao'));
  add(id, em(etiqueta('CONSTITUCIONALISTA (GAZETA DO POVO):\nVÊ INDÍCIOS', { h: 0.12 }), 0.35, 3.25, 0.2), P(id, 'constitucionalista'));
  // relógio: pedido da PF minutos após a vitória
  const relogio = grupo(cilindro(0.42, 0.42, 0.08, COR.branco));
  relogio.children[0].rotation.x = Math.PI / 2;
  const ponteiro = em(caixa(0.04, 0.3, 0.03, '#222', 0.01), 0, 0.13, 0.06);
  relogio.add(ponteiro, em(esfera(0.04, COR.vermelho), 0, 0, 0.07));
  const tMin = P(id, 'minutos');
  add(id, em(relogio, 1.15, 1.95, 0.3), P(id, 'policia'), { update: (t) => {
    const a = -Math.max(0, t - tMin) * 2.5; ponteiro.position.set(-Math.sin(a) * 0.13, Math.cos(a) * 0.13, 0.06); ponteiro.rotation.z = a;
  } });
  add(id, em(etiqueta('PF: MINUTOS APÓS\nA VITÓRIA DE LULA (O GLOBO)', { fundo: COR.vermelho, h: 0.12 }), 1.0, 1.25, 0.5), tMin);
  const doc = documento('DECISÃO\nMORAES', 0.62, 0.82, { carimbo: 'SIGILO' });
  add(id, em(doc, -0.05, 1.6, 0.9), P(id, 'sigilo') - 0.3, { cair: 1, update: (t, o) => { o.rotation.y = -0.2 + Math.sin(t) * 0.05; } });
}

// 10. E O TRUMP?
{
  const id = 'trump';
  cam(id, [0, 2.5, 9.0], [0, 2.0, 0], [0, 0, -0.8]);
  add(id, em(emblema('EUA'), 1.45, 1.2, -1.0), F(id, 0), { update: (t, o) => { o.rotation.y = Math.sin(t * 0.6) * 0.15; } });
  add(id, em(pedestal(0.55, 0.3), 0, 0.15, 0.4), F(id, 0), { cair: 0 });
  add(id, em(boneco(COR.branco, 1, 'terno', { gravata: '#2f5fa8', foto: 'trump' }), 0, 0.3, 0.4), F(id, 0) + 0.15, { cair: 0.6 });
  add(id, em(etiqueta('DONALD TRUMP', { fundo: COR.vermelho, h: 0.17 }), 0, 2.45, 0.5), F(id, 0) + 0.4);
  function balao(texto, w, x, y, rabo = 1) {
    const g = grupo(caixa(w, 0.62, 0.14, COR.branco, 0.18));
    const r = em(cilindro(0, 0.13, 0.28, COR.branco), rabo * w * 0.28, -0.4, 0); r.rotation.z = Math.PI + rabo * 0.4;
    g.add(r, em(etiqueta(texto, { fundo: null, cor: '#1e1e1e', h: 0.22, fonte: '800 64px Inter', billboard: false }), 0, 0, 0.08));
    return em(g, x, y, 0.6);
  }
  add(id, balao('APROVO A VINDA', 2.2, -0.7, 4.05, 1), P(id, 'aprova'), { cair: 0.8 });
  add(id, balao('GENTE DE BEM', 1.9, 0.75, 3.15, -1), P(id, 'chamou'), { cair: 0.8 });
  add(id, em(etiqueta('"FINE PEOPLE"', { h: 0.13 }), 0.75, 2.62, 0.7), P(id, 'chamou') + 0.4);
  add(id, em(etiqueta('NÃO ME ENVOLVI', { fundo: COR.escuro, h: 0.16 }), -1.15, 1.3, 0.9), P(id, 'envolveu'));
}

// 11. RESUMO — balança
{
  const id = 'resumo';
  cam(id, [0, 2.6, 8.6], [0, 2.0, 0], [0, 0.1, -1.0]);
  const tInclina = P(id, 'washington');
  const base = grupo(em(cilindro(0.5, 0.6, 0.12, COR.ouro), 0, 0.06, 0), em(cilindro(0.06, 0.08, 2.4, COR.ouro), 0, 1.25, 0), em(esfera(0.12, COR.ouro), 0, 2.5, 0));
  add(id, em(base, 0, 0, 0), F(id, 0), { cair: 0 });
  const braco = new THREE.Group();
  braco.add(caixa(2.4, 0.07, 0.07, COR.ouro, 0.02));
  const pratos = [-1.1, 1.1].map((x, i) => {
    const pend = new THREE.Group();
    pend.add(em(new THREE.Line(new THREE.BufferGeometry().setFromPoints([v3(0, 0, 0), v3(0, -0.85, 0)]), new THREE.LineBasicMaterial({ color: 0xcaa64a })), 0, 0, 0));
    pend.add(em(cilindro(0.48, 0.38, 0.06, COR.ouro), 0, -0.88, 0));
    pend.add(em(etiqueta(i ? 'WASHINGTON' : 'ORDEM DO STF', { fundo: i ? COR.vermelho : COR.escuro, h: 0.14 }), 0, -0.6, 0.35));
    pend.position.x = x;
    braco.add(pend);
    return pend;
  });
  braco.position.y = 2.5;
  add(id, em(grupo(braco), 0, 0, 0), F(id, 0) + 0.2, { cair: 0, update: (t) => {
    const ang = -0.22 * easeOutBack(clamp((t - tInclina) / 0.9)) + Math.sin(t * 1.4) * 0.015;
    braco.rotation.z = ang; pratos.forEach((p) => { p.rotation.z = -ang; });
  } });
  add(id, em(etiqueta('SERÁ QUE DONALD TRUMP\nFARÁ ALGUMA COISA?', { fundo: COR.branco, cor: '#222', h: 0.2 }), 0, 4.15, 0), F(id, 1));
  const icone = grupo(caixa(0.9, 0.6, 0.12, COR.vermelho, 0.16), em(cilindro(0, 0.12, 0.25, COR.vermelho), -0.2, -0.36, 0));
  icone.children[1].rotation.z = Math.PI;
  [-0.22, 0, 0.22].forEach((x) => icone.add(em(esfera(0.055, '#fff'), x, 0, 0.07)));
  add(id, em(icone, 0, 3.25, 0.4), F(id, 2), { update: (t, o) => { o.rotation.y = Math.sin(t * 2) * 0.25; } });
}

// ---------- overlays HTML ----------
const elCap = document.querySelector('#capitulo span'), elSelo = document.getElementById('selo'), elLeg = document.getElementById('legenda'), elFontes = document.getElementById('fontes');
const SELOS = { gancho: '25—28\nOUT', fato: 'STF\nDECISÃO', rota: '22H50\nTERÇA', reacoes: 'NEGAM\n→ ADMITEM', precedentes: 'NÃO É O\nPRIMEIRO',
  pergunta1: 'CF\nART. 55', pergunta2: 'EXTRA-\nDIÇÃO', pergunta3: 'ASILO\nPOLÍTICO', perseguicao: 'VERSÃO DOS\nALIADOS', trump: 'FINE\nPEOPLE', resumo: 'E\nAGORA?' };

// legendas em blocos curtos, palavra por palavra
const blocos = [];
for (const c of tempos.cenas) {
  let atual = [];
  const fecha = () => { if (atual.length) blocos.push(atual); atual = []; };
  for (const p of c.palavras) {
    const txt = atual.map((q) => q.w).join(' ');
    if (atual.length && txt.length + p.w.length > 26) fecha();
    atual.push(p);
    if (/[.?:!]$/.test(p.w) || (/,$/.test(p.w) && atual.map((q) => q.w).join(' ').length > 12)) fecha();
  }
  fecha();
}
blocos.forEach((b, i) => { b.t0 = b[0].t0; b.t1 = b[b.length - 1].t1; b.prox = blocos[i + 1] ? blocos[i + 1][0].t0 : Infinity; });

let ultimaLeg = '';
function overlays(t) {
  const c = tempos.cenas.find((c) => t >= c.inicio && t < c.fim) || tempos.cenas[tempos.cenas.length - 1];
  elCap.textContent = c.tag;
  elSelo.textContent = SELOS[c.id];
  const b = blocos.find((b) => t >= b.t0 - 0.05 && t < Math.min(b.prox, b.t1 + 0.7));
  const html = b ? `<div>${b.map((p) => `<span class="${t >= p.t0 ? '' : 'f'}">${p.w}</span>`).join(' ')}</div>` : '';
  if (html !== ultimaLeg) { elLeg.innerHTML = html; ultimaLeg = html; }
  if (b) elLeg.firstChild.style.transform = `scale(${0.86 + 0.14 * easeOutBack(clamp((t - b.t0) / 0.18))})`;
  elFontes.textContent = c.id === 'resumo' && t > F('resumo', 2) ? 'FONTES: NEXO · GAZETA DO POVO · AOS FATOS · BRASIL DE FATO' : '';
}

// ---------- quadro no tempo t ----------
const pos = poseCena;
window.renderAt = (t) => {
  const idx = tempos.cenas.findIndex((c) => t < c.fim);
  const atual = tempos.cenas[idx < 0 ? tempos.cenas.length - 1 : idx];
  let [p, a] = pos(atual.id, t);
  const anterior = tempos.cenas[C[atual.id].i - 1];
  if (anterior) {
    const k = easeInOut(clamp((t - atual.inicio + 0.15) / 0.6));
    if (k < 1) {
      const [p0, a0] = pos(anterior.id, t);
      p = p0.lerp(p, k); a = a0.lerp(a, k);
    }
  }
  camera.position.copy(p);
  camera.lookAt(a);
  sol.position.set(p.x + 4, 10, 6);
  sol.target.position.set(p.x, 0, 0);

  const arr = poeiraGeo.attributes.position.array;
  for (let i = 0; i < nPoeira; i++) {
    arr[i * 3 + 1] = (poeiraBase[i * 3 + 1] + t * 0.08 + Math.sin(t * 0.5 + i) * 0.1) % 7;
    arr[i * 3] = poeiraBase[i * 3] + Math.sin(t * 0.3 + i * 1.7) * 0.2;
  }
  poeiraGeo.attributes.position.needsUpdate = true;

  atualizarItens(t);
  scene.traverse((o) => { if (o.userData.billboard) o.quaternion.copy(camera.quaternion); });
  overlays(t);
  renderer.render(scene, camera);
};
window.duracao = tempos.total;
window.pronto = true;
