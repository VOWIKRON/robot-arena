import { test, expect } from '@playwright/test';
import appPackage from '../package.json';

// NEXT-110-UI-VERSION-REG: the shipped app must not advertise a stale release.
// Runs in the existing Chromium/WebKit desktop/mobile Playwright matrix.
test('NEXT-110: visible version and browser title match package metadata', async ({ page }) => {
  await page.goto('/');
  const expectedVersion = `v${appPackage.version}`;
  await expect(page.locator('#app-version')).toHaveText(expectedVersion);
  await expect(page).toHaveTitle(`Robot Arena ${expectedVersion}`);
});
