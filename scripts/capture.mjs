import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('docs/audits/screenshots', { recursive: true });
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {});
const page = await browser.newPage();
for (const [name, width, height, path] of [
  ['home-desktop', 1280, 900, '/'],
  ['home-mobile', 390, 844, '/'],
  ['diagnostico-desktop', 1280, 1000, '/diagnostico'],
]) {
  await page.setViewportSize({ width, height });
  await page.goto(`http://127.0.0.1:3000${path}`);
  await page.screenshot({ path: `docs/audits/screenshots/${name}.png` });
}
await browser.close();
