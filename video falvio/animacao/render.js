// Renderiza a animação quadro a quadro e junta com a narração.
// Uso: node render.js <saida.mp4>            (vídeo completo)
//      node render.js --teste <pasta> t1 t2  (só alguns quadros em PNG)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const FPS = 30, DURACAO = Math.ceil(require('./tempos.json').total);
const raiz = __dirname;
const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2' };

const servidor = http.createServer((req, res) => {
  const f = path.join(raiz, decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': tipos[path.extname(f)] || 'application/octet-stream' });
    res.end(data);
  });
});

(async () => {
  await new Promise((r) => servidor.listen(0, r));
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on('pageerror', (e) => console.error('ERRO NA PÁGINA:', e.message));
  await page.goto(`http://localhost:${servidor.address().port}/index.html`);
  await page.waitForFunction('window.pronto === true', null, { timeout: 120000 });

  if (process.argv[2] === '--teste') {
    const pasta = process.argv[3];
    fs.mkdirSync(pasta, { recursive: true });
    for (const t of process.argv.slice(4).map(Number)) {
      await page.evaluate((t) => window.renderAt(t), t);
      await page.screenshot({ path: path.join(pasta, `t${String(t).padStart(6, '0')}.png`) });
    }
  } else {
    const saida = process.argv[2];
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
      '-i', path.join(raiz, 'narracao.wav'), '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '160k', '-af', 'apad', '-t', String(DURACAO), '-movflags', '+faststart', saida], { stdio: ['pipe', 'inherit', 'inherit'] });
    const total = FPS * DURACAO, inicio = Date.now();
    for (let i = 0; i < total; i++) {
      await page.evaluate((t) => window.renderAt(t), i / FPS);
      const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
      if (i % 150 === 0) console.log(`quadro ${i}/${total} (${((Date.now() - inicio) / 1000).toFixed(0)}s)`);
    }
    ff.stdin.end();
    await new Promise((r) => ff.on('close', r));
  }
  await browser.close();
  servidor.close();
})();
