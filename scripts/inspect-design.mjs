/* global document, HTMLElement, Node, getComputedStyle, innerWidth, scrollTo */
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const origin = process.env.AUDIT_URL || 'http://127.0.0.1:3102';
const outputDir = 'docs/audits/v2/screenshots';
await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const findings = [];
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
    for (const route of ['/', '/soluciones', '/planes', '/casos', '/nosotros', '/diagnostico']) {
      await page.goto(origin + route);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('.site-footer').scrollIntoViewIfNeeded();
      await page.locator('.site-footer img').evaluate(image => image.decode());
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      const name = `${route === '/' ? 'home' : route.slice(1)}-${width}`;
      await page.screenshot({ path: join(outputDir, `${name}.png`), fullPage: true });
      await page.screenshot({ path: join(outputDir, `${name}-viewport.png`) });
      findings.push({ name, ...await page.evaluate(() => {
        const textElements = Array.from(document.querySelectorAll('body *')).filter(element =>
          element instanceof HTMLElement && element.getClientRects().length &&
          Array.from(element.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()));
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          smallText: textElements.filter(element => parseFloat(getComputedStyle(element).fontSize) < 13)
            .map(element => ({ text: element.textContent.slice(0, 70), size: getComputedStyle(element).fontSize })),
        };
      }) });
    }
    await page.close();
  }
} finally { await browser.close(); }
await writeFile('docs/audits/v2/visual-check.json', JSON.stringify(findings, null, 2));
console.log(JSON.stringify(findings, null, 2));
