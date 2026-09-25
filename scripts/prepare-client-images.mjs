import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const [deliRicuraSource, sugaSource] = process.argv.slice(2);
if (!deliRicuraSource || !sugaSource) {
  throw new Error('Usage: node scripts/prepare-client-images.mjs <deli-ricura.png> <suga.png>');
}

await mkdir('public/clients', { recursive: true });
await Promise.all([
  sharp(deliRicuraSource).webp({ lossless: true }).toFile('public/clients/productos-deli-ricura.webp'),
  sharp(sugaSource).webp({ quality: 94, effort: 6 }).toFile('public/clients/grupo-empresarial-suga.webp'),
]);

console.log('Prepared client images for Productos Deli Ricura and Grupo Empresarial Suga.');
