import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  // NEXT-102: WebKit browser startup and element stability can exceed 30s on
  // shared CI runners. Run browser projects serially rather than competing for
  // the same constrained CPU/memory. Preserve fail-closed no-retry release gate.
  workers: process.env.CI ? 1 : undefined,
  timeout: process.env.CI ? 60_000 : 30_000,
  retries: 0,
  use: { baseURL: 'http://127.0.0.1:5173' },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] }, testIgnore: ['**/webkit-compatibility.spec.ts'] },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] }, testIgnore: ['**/webkit-compatibility.spec.ts'] },
    { name: 'desktop-webkit', use: { ...devices['Desktop Safari'] }, testMatch: ['**/webkit-compatibility.spec.ts', '**/next96-cross-tab-stress.spec.ts'] },
    { name: 'mobile-webkit', use: { ...devices['iPhone 13'] }, testMatch: ['**/webkit-compatibility.spec.ts', '**/next96-cross-tab-stress.spec.ts'] }
  ]
});
