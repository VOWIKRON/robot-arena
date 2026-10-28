import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('NEXT-76: debounced match-ID and status search, reset and replay after progress', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-count').fill('3');
  await page.locator('#tournament-count').press('Tab');
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-pairings li')).toHaveCount(3);
  await expect(page.locator('#tournament-match-count')).toContainText('3 von 3');
  await page.locator('#tournament-match-search').fill('match-002');
  await expect(page.locator('#tournament-pairings li:visible')).toHaveCount(1);
  await expect(page.locator('#tournament-match-count')).toContainText('1 von 3');
  await page.locator('#tournament-match-reset').click();
  await expect(page.locator('#tournament-pairings li:visible')).toHaveCount(3);
  await page.locator('#tournament-match-status').selectOption('completed');
  await expect(page.locator('#tournament-pairings li:visible')).toHaveCount(0);
  await page.locator('#tournament-run').click();
  await expect(page.locator('#tournament-pairings li:visible')).toHaveCount(1);
  await expect(page.locator('#tournament-match-count')).toContainText('1 von 3');
  await expect(page.locator('#tournament-pairings li:visible button[data-replay-match-id]')).toHaveCount(1);
});

test('NEXT-76: Unicode and markup-like names stay text-only across archive import on 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-name-1').fill('<img src=x onerror=alert(1)>');
  await page.locator('#tournament-name-2').fill('Björk');
  await page.locator('#tournament-create').click();
  await page.locator('#tournament-run').click();
  await page.locator('#tournament-match-search').fill('bjÖRK');
  await expect(page.locator('#tournament-pairings li:visible')).toHaveCount(1);
  await expect(page.locator('#tournament-pairings img')).toHaveCount(0);
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#tournament-export').click()
  ]);
  const buffer = await readFile(await download.path());
  await page.reload();
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-file').setInputFiles({ name: 'turnier.json', mimeType: 'application/json', buffer });
  await expect(page.locator('#tournament-pairings li')).toHaveCount(1);
  await page.locator('#tournament-match-search').fill('björk');
  await expect(page.locator('#tournament-pairings li:visible button[data-replay-match-id]')).toHaveCount(1);
  await page.locator('#tournament-match-reset').click();
  await expect(page.locator('#tournament-pairings li:visible')).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
