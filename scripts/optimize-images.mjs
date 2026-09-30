// Generates WebP variants + tiny blur placeholders for everything under public/img,
// and the PWA icons. Run with: npm run optimize
import sharp from 'sharp';
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, extname, basename, dirname, relative } from 'node:path';

const root = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const imgRoot = join(root, 'img');
const blur = {};

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p);
  }
  return out;
}

for (const file of await walk(imgRoot)) {
  const ext = extname(file);
  const stem = join(dirname(file), basename(file, ext));
  const key = relative(root, file).replace(/\\/g, '/');
  const img = sharp(file);
  const meta = await img.metadata();

  await sharp(file).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${stem}.webp`);
  await sharp(file).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 70 }).toFile(`${stem}-sm.webp`);

  const tiny = await sharp(file).resize(16).blur(1).webp({ quality: 40 }).toBuffer();
  blur[key] = { b: `data:image/webp;base64,${tiny.toString('base64')}`, w: meta.width, h: meta.height };
  console.log('ok', key);
}

await writeFile(new URL('../src/lib/blur.json', import.meta.url), JSON.stringify(blur));

// PWA icons from the logo
const logo = join(root, 'RXSlogo-withBG.svg');
await mkdir(join(root, 'icons'), { recursive: true });
for (const size of [180, 192, 512]) {
  await sharp(logo, { density: 384 }).resize(size, size, { fit: 'contain', background: '#ffffff' }).png().toFile(join(root, 'icons', `icon-${size}.png`));
}
console.log('icons ok');
