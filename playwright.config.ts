import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3000', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) } }],
  webServer: {
    command: 'node node_modules/next/dist/bin/next start --hostname 127.0.0.1',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    env: { SITE_URL: 'http://127.0.0.1:3000', SITE_INDEXABLE: 'false', PRIVACY_APPROVED: 'true', LEAD_TRANSPORT: 'smtp', SMTP_HOST: '127.0.0.1', SMTP_PORT: '25252', SMTP_USER: 'fixture', SMTP_PASSWORD: 'fixture-not-a-secret', LEAD_FROM: 'test@example.com', LEAD_TO: 'sink@example.com' },
  },
});
