import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
const browserPath = process.env.CHROME_PATH || chromium.executablePath();
const baseUrl = process.env.AUDIT_URL || 'http://127.0.0.1:3000';
const outputDir = process.env.AUDIT_OUTPUT_DIR || 'docs/audits';
const runs = Number(process.env.AUDIT_RUNS || 1);
if (!Number.isInteger(runs) || runs < 1 || runs > 5) throw new Error('AUDIT_RUNS must be an integer from 1 to 5');
await mkdir(outputDir, { recursive: true });
const results = [];
const browser = await chromium.launch({ executablePath: browserPath, args: ['--remote-debugging-port=9222'] });
try {
for (const route of ['/', '/diagnostico']) {
  for (const device of ['mobile', 'desktop']) {
    for (let attempt = 1; attempt <= runs; attempt++) {
    const name = `${route === '/' ? 'home' : 'diagnostico'}-${device}`;
    const file = join(outputDir, `${name}${runs > 1 ? `-run-${attempt}` : ''}.json`);
    const run = await lighthouse(`${baseUrl}${route}`, { port: 9222, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] }, device === 'desktop' ? desktopConfig : undefined);
    if (!run || run.lhr.runtimeError) throw new Error(run?.lhr.runtimeError?.message || 'Lighthouse returned no report');
    const report = run.lhr;
    await writeFile(file, JSON.stringify(report, null, 2));
    results.push({ name, attempt, date: report.fetchTime, scores: Object.fromEntries(Object.entries(report.categories).map(([key, value]) => [key, Math.round(value.score * 100)])), lcp: report.audits['largest-contentful-paint'].numericValue, cls: report.audits['cumulative-layout-shift'].numericValue, tbt: report.audits['total-blocking-time'].numericValue, bytes: report.audits['total-byte-weight'].numericValue });
    console.log(`${name} ${attempt}/${runs}: LCP ${Math.round(report.audits['largest-contentful-paint'].numericValue)} ms`);
    }
  }
}
} finally { await browser.close(); }
const median = values => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
const summary = [...new Set(results.map(result => result.name))].map(name => {
  const samples = results.filter(result => result.name === name);
  return { name, samples: samples.length, date: samples[0].date,
    scores: Object.fromEntries(Object.keys(samples[0].scores).map(key => [key, median(samples.map(sample => sample.scores[key]))])),
    ...Object.fromEntries(['lcp', 'cls', 'tbt', 'bytes'].map(key => [key, median(samples.map(sample => sample[key]))])),
    lcpRange: [Math.min(...samples.map(sample => sample.lcp)), Math.max(...samples.map(sample => sample.lcp))],
  };
});
await writeFile(join(outputDir, 'samples.json'), JSON.stringify(results, null, 2));
await writeFile(join(outputDir, 'summary.json'), JSON.stringify(summary, null, 2));
process.stdout.write(JSON.stringify(summary, null, 2) + '\n');
