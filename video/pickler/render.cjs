// Renderiza pickler.html quadro a quadro e codifica em MP4 com ffmpeg.
// Uso: [HTML=arquivo.html] node render.cjs [saida.mp4] [quadroInicial] [quadroFinal]
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

(async () => {
  const out = process.argv[2] || path.join(__dirname, 'pickler.mp4');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.join(__dirname, process.env.HTML || 'pickler.html') + '?render');
  await page.addStyleTag({ content: 'canvas{height:1920px!important}' });
  await page.evaluate(() => window.ready);
  const { FPS, DUR, SIZE } = await page.evaluate(() => ({ FPS: window.FPS, DUR: window.DUR, SIZE: window.SIZE || [1080, 1920] }));
  await page.setViewportSize({ width: SIZE[0], height: SIZE[1] });
  await page.addStyleTag({ content: `canvas{width:${SIZE[0]}px!important;height:${SIZE[1]}px!important;max-height:none!important}` });
  const first = +(process.argv[3] || 0), last = +(process.argv[4] || FPS * DUR);

  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out],
    { stdio: ['pipe', 'inherit', 'inherit'] });

  for (let f = first; f < last; f++) {
    await page.evaluate(n => window.render(n), f);
    ff.stdin.write(await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: SIZE[0], height: SIZE[1] } }));
    if (f % 60 === 0) process.stdout.write(`quadro ${f}/${last}\n`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log('ok:', out);
})();
