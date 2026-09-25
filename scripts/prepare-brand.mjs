import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// Deterministic extraction of the owner's approved 01 / Principal variant.
// Keep both source boards untouched. Coordinates refer to Logoiarmo.png (1536×1024).
await mkdir('public/brand', { recursive: true });
const { data, info } = await sharp('Logoiarmo.png')
  .extract({ left: 360, top: 106, width: 820, height: 262 })
  .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let offset = 0; offset < data.length; offset += 4) {
  const darkest = Math.min(data[offset], data[offset + 1], data[offset + 2]);
  // Recover contours against the light board and normalize to approved ink.
  // Remove board texture and white edge halos at small display sizes.
  const color = data[offset + 2] - data[offset] > 40 ? [14, 165, 233] : [55, 65, 81];
  const coverage = Math.min(1, Math.max(0, (250 - darkest) / (250 - color[0])));
  const alpha = coverage < .04 ? 0 : coverage > .94 ? 1 : coverage;
  for (let channel = 0; channel < 3; channel++) data[offset + channel] = color[channel];
  data[offset + 3] = Math.round(alpha * 255);
}
const logo = sharp(data, { raw: info });
await logo.clone().resize({ width: 656 }).png({ palette: true, colors: 128 }).toFile('public/brand/iarmo-wordmark.png');
await logo.clone().resize({ width: 328 }).webp({ lossless: true }).toFile('public/brand/iarmo-wordmark.webp');
await logo.clone().extract({ left: 0, top: 0, width: 84, height: 262 })
  .resize(256, 256, { fit: 'contain', background: '#ffffff00' })
  .extend({ top: 32, bottom: 32, left: 32, right: 32, background: '#ffffff00' })
  .png({ palette: true, colors: 128 }).toFile('public/brand/iarmo-symbol.png');
await sharp('public/brand/iarmo-symbol.png').resize(64, 64).png().toFile('src/app/icon.png');
await sharp('public/brand/iarmo-symbol.png').resize(180, 180).flatten({ background: '#ffffff' }).png().toFile('src/app/apple-icon.png');
console.log('Prepared wordmark, symbol, favicon and apple icon from the approved board.');
