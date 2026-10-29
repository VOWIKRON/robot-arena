import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Node 22 Playwright test runner: avoid bare JSON ESM import without type attribute.
const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { version: string };
const expectedVersion = `v${version}`;

test('NEXT-110: visible version and browser title match package metadata', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#app-version')).toHaveText(expectedVersion);
  await expect(page).toHaveTitle(`Robot Arena ${expectedVersion}`);
});

test('NEXT-110: stale footer metadata cannot overwrite the running build version', async ({ page }) => {
  await page.route('**/version.json', route => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ version: '0.0.1', published: '2026-10-01T12:00:00Z' })
  }));
  await page.route('**/build-info.json', route => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ version: '0.0.2', nextRunAt: '2026-11-01T12:00:00Z' })
  }));
  await page.goto('/');
  await expect(page.locator('#footer-published')).not.toHaveText('wird geladen …');
  await expect(page.locator('#app-version')).toHaveText(expectedVersion);
  await expect(page).toHaveTitle(`Robot Arena ${expectedVersion}`);
});
