/* global document, getComputedStyle, innerWidth */
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const directory = 'docs/audits/continuous/screenshots';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const findings = [];
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(process.env.AUDIT_URL || 'http://127.0.0.1:3101');
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator('img').all()) { await image.scrollIntoViewIfNeeded(); await image.evaluate(el => el.decode()); }
    await page.locator('#inicio').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${directory}/home-${width}.png`, fullPage: true });
    await page.screenshot({ path: `${directory}/hero-${width}.png` });
    for (const id of ['metodologia', 'casos', 'contacto']) {
      await page.locator(`#${id}`).evaluate(el => el.scrollIntoView({ block: 'start' }));
      await page.screenshot({ path: `${directory}/${id}-${width}.png` });
    }
    findings.push({ width, ...await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, h1: document.querySelectorAll('h1').length, stickyMethod: getComputedStyle(document.querySelector('.method-heading')).position })) });
    await page.close();
  }
} finally { await browser.close(); }
await writeFile('docs/audits/continuous/visual.json', JSON.stringify(findings, null, 2));
console.log(JSON.stringify(findings, null, 2));
