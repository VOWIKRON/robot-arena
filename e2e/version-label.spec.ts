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

test('NEXT-110: malformed build metadata cannot erase valid publication date', async ({ page }) => {
  await page.route('**/version.json', route => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ version: '0.0.1', published: '2026-10-29T12:00:00Z' })
  }));
  await page.route('**/build-info.json', route => route.fulfill({
    status: 200, contentType: 'application/json', body: '{broken-json'
  }));
  await page.goto('/');
  await expect(page.locator('#footer-published')).not.toHaveText('noch nicht verfügbar');
  await expect(page.locator('#footer-release-published')).not.toHaveText('noch nicht verfügbar');
  await expect(page.locator('#footer-backlog-published')).not.toHaveText('noch nicht verfügbar');
  await expect(page.locator('#footer-next-run')).toHaveText('noch nicht verfügbar');
  await expect(page.locator('#app-version')).toHaveText(expectedVersion);
  await expect(page).toHaveTitle(`Robot Arena ${expectedVersion}`);
});

test('NEXT-110: failed publication request cannot erase valid scheduling metadata', async ({ page }) => {
  await page.route('**/version.json', route => route.abort('failed'));
  await page.route('**/build-info.json', route => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ version: '0.0.2', nextRunAt: '2026-11-01T12:00:00Z' })
  }));
  await page.goto('/');
  await expect(page.locator('#footer-published')).toHaveText('noch nicht verfügbar');
  await expect(page.locator('#footer-next-run')).not.toHaveText('noch nicht verfügbar');
  await expect(page.locator('#app-version')).toHaveText(expectedVersion);
  await expect(page).toHaveTitle(`Robot Arena ${expectedVersion}`);
});

test('NEXT-110: HTTP 503 scheduling metadata does not discard valid publication', async ({ page }) => {
  await page.route('**/version.json', route => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ published: '2026-10-29T12:00:00Z' })
  }));
  await page.route('**/build-info.json', route => route.fulfill({
    status: 503, contentType: 'application/json',
    body: JSON.stringify({ nextRunAt: '2026-11-01T12:00:00Z' })
  }));
  await page.goto('/');
  await expect(page.locator('#footer-published')).not.toHaveText('noch nicht verfügbar');
  await expect(page.locator('#footer-release-published')).not.toHaveText('noch nicht verfügbar');
  await expect(page.locator('#footer-next-run')).toHaveText('noch nicht verfügbar');
  await expect(page.locator('#app-version')).toHaveText(expectedVersion);
  await expect(page).toHaveTitle(`Robot Arena ${expectedVersion}`);
});

test('NEXT-110: array-shaped publication metadata is rejected without hiding valid schedule', async ({ page }) => {
  await page.route('**/version.json', route => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify([{ published: '2026-10-29T12:00:00Z' }])
  }));
  await page.route('**/build-info.json', route => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ nextRunAt: '2026-11-01T12:00:00Z' })
  }));
  await page.goto('/');
  await expect(page.locator('#footer-published')).toHaveText('noch nicht verfügbar');
  await expect(page.locator('#footer-release-published')).toHaveText('noch nicht verfügbar');
  await expect(page.locator('#footer-next-run')).not.toHaveText('noch nicht verfügbar');
  await expect(page.locator('#app-version')).toHaveText(expectedVersion);
  await expect(page).toHaveTitle(`Robot Arena ${expectedVersion}`);
});


test('NEXT-110: stalled scheduling endpoint times out without hiding publication', async ({ page }) => {
  await page.route('**/version.json', route => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ published: '2026-10-29T12:00:00Z' })
  }));
  await page.route('**/build-info.json', async route => {
    await new Promise(resolve => setTimeout(resolve, 6500));
    await route.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify({ nextRunAt: '2026-11-01T12:00:00Z' })
    }).catch(() => {});
  });
  await page.goto('/');
  await expect(page.locator('#footer-published')).not.toHaveText('noch nicht verfügbar', { timeout: 9000 });
  await expect(page.locator('#footer-next-run')).toHaveText('noch nicht verfügbar', { timeout: 9000 });
  await page.waitForTimeout(7200);
  await expect(page.locator('#footer-next-run')).toHaveText('noch nicht verfügbar');
  await expect(page.locator('#app-version')).toHaveText(expectedVersion);
  await expect(page).toHaveTitle(`Robot Arena ${expectedVersion}`);
});

test('NEXT-110: stalled publication endpoint times out without hiding schedule', async ({ page }) => {
  await page.route('**/version.json', async route => {
    await new Promise(resolve => setTimeout(resolve, 6500));
    await route.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify({ published: '2026-10-29T12:00:00Z' })
    }).catch(() => {});
  });
  await page.route('**/build-info.json', route => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ nextRunAt: '2026-11-01T12:00:00Z' })
  }));
  await page.goto('/');
  await expect(page.locator('#footer-next-run')).not.toHaveText('noch nicht verfügbar', { timeout: 9000 });
  await expect(page.locator('#footer-published')).toHaveText('noch nicht verfügbar', { timeout: 9000 });
  await page.waitForTimeout(7200);
  await expect(page.locator('#footer-published')).toHaveText('noch nicht verfügbar');
  await expect(page.locator('#app-version')).toHaveText(expectedVersion);
  await expect(page).toHaveTitle(`Robot Arena ${expectedVersion}`);
});
