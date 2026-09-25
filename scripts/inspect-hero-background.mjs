/* global document, window */
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { mkdir, writeFile } from 'node:fs/promises';

const phase = process.argv[2] || 'after';
if (!['before', 'after'].includes(phase)) throw new Error('Use before or after');
const directory = `docs/audits/hero-background/${phase}`;
const url = process.env.AUDIT_URL || 'http://127.0.0.1:3124';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', args: ['--remote-debugging-port=9223'] });
try {
  for (const width of [320, 390, 768, 1280, 1536]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${directory}/hero-${width}.png` });
    await page.locator('#inicio').screenshot({ path: `${directory}/hero-full-${width}.png` });
    await page.evaluate(() => {
      const section = document.querySelector('#soluciones');
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 260, behavior: 'instant' });
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${directory}/transition-${width}.png` });
    await page.close();
  }
  const summary = [];
  for (const device of ['mobile', 'desktop']) {
    const run = await lighthouse(url, { port: 9223, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] }, device === 'desktop' ? desktopConfig : undefined);
    if (!run || run.lhr.runtimeError) throw new Error(run?.lhr.runtimeError?.message || 'Missing Lighthouse report');
    const { lhr } = run;
    await writeFile(`${directory}/${device}.json`, JSON.stringify(lhr, null, 2));
    summary.push({ device, date: lhr.fetchTime, scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])), lcp: lhr.audits['largest-contentful-paint'].numericValue, cls: lhr.audits['cumulative-layout-shift'].numericValue, bytes: lhr.audits['total-byte-weight'].numericValue });
    console.log(JSON.stringify(summary.at(-1)));
  }
  await writeFile(`${directory}/summary.json`, JSON.stringify(summary, null, 2));
} finally { await browser.close(); }
