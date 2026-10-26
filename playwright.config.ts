import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:5173' },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] }, testIgnore: '**/webkit-compatibility.spec.ts' },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] }, testIgnore: '**/webkit-compatibility.spec.ts' },
    { name: 'desktop-webkit', use: { ...devices['Desktop Safari'] }, testMatch: '**/webkit-compatibility.spec.ts' },
    { name: 'mobile-webkit', use: { ...devices['iPhone 13'] }, testMatch: '**/webkit-compatibility.spec.ts' }
  ]
});
