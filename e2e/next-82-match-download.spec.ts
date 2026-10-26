import { expect, test } from '@playwright/test';

test('NEXT-82: unavailable object URL API reports match export error without losing tournament progress', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: undefined });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  const before = await page.locator('#tournament-progress').innerText();
  await page.locator('button[data-match-export-format="csv"]').first().click();
  await expect(page.locator('#tournament-feedback')).toContainText('Browser unterstützt Datei-Downloads nicht');
  await expect(page.locator('#tournament-progress')).toHaveText(before);
});

test('NEXT-82: failed match download click is reported; tournament remains intact on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.addInitScript(() => {
    const originalClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function() {
      if (this.download.startsWith('robot-arena-match-')) throw new Error('Download durch Browser blockiert');
      return originalClick.call(this);
    };
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  const before = await page.locator('#tournament-progress').innerText();
  await page.locator('button[data-match-export-format="json"]').first().click();
  await expect(page.locator('#tournament-feedback')).toContainText('Download durch Browser blockiert');
  await expect(page.locator('#tournament-progress')).toHaveText(before);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
