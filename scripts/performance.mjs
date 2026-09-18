import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const lighthouse = require.resolve('lighthouse/cli/index.js');
const browserPath = process.env.CHROME_PATH || chromium.executablePath();
const baseUrl = process.env.AUDIT_URL || 'http://127.0.0.1:3000';
await mkdir('docs/audits', { recursive: true });
const results = [];
for (const route of ['/', '/diagnostico']) {
  for (const device of ['mobile', 'desktop']) {
    const name = `${route === '/' ? 'home' : 'diagnostico'}-${device}`;
    const file = `docs/audits/${name}.json`;
    const args = [lighthouse, `${baseUrl}${route}`, '--output=json', `--output-path=${file}`, '--chrome-flags=--headless --no-sandbox', '--only-categories=performance,accessibility,best-practices,seo', '--quiet', ...(device === 'desktop' ? ['--preset=desktop'] : [])];
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, args, { env: { ...process.env, CHROME_PATH: browserPath }, stdio: 'inherit' });
      child.on('exit', code => code === 0 ? resolve() : reject(new Error(`Lighthouse exited ${code}`)));
      child.on('error', reject);
    });
    const report = JSON.parse(await readFile(file, 'utf8'));
    results.push({ name, date: report.fetchTime, scores: Object.fromEntries(Object.entries(report.categories).map(([key, value]) => [key, Math.round(value.score * 100)])), lcp: report.audits['largest-contentful-paint'].numericValue, cls: report.audits['cumulative-layout-shift'].numericValue, tbt: report.audits['total-blocking-time'].numericValue, bytes: report.audits['total-byte-weight'].numericValue });
  }
}
await writeFile('docs/audits/summary.json', JSON.stringify(results, null, 2));
process.stdout.write(JSON.stringify(results, null, 2) + '\n');
