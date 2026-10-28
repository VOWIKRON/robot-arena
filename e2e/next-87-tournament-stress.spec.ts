import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('NEXT-87: 16 participants / 120 pairings survive filtering and archive reload on desktop and mobile', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-count').fill('16');
  await page.locator('#tournament-count').press('Tab');
  await page.locator('#tournament-ticks').fill('1');
  await page.locator('#tournament-create').click();

  await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
  await expect(page.locator('#tournament-match-count')).toContainText('120 von 120');
  await page.locator('#tournament-match-search').fill('match-120');
  await expect(page.locator('#tournament-pairings li:visible')).toHaveCount(1);
  await page.locator('#tournament-match-reset').click();
  await expect(page.locator('#tournament-pairings li:visible')).toHaveCount(120);

  await page.locator('#tournament-run').click();
  await page.locator('#tournament-match-status').selectOption('completed');
  await expect(page.locator('#tournament-pairings li:visible')).toHaveCount(1);
  await page.locator('#tournament-match-status').selectOption('pending');
  await expect(page.locator('#tournament-pairings li:visible')).toHaveCount(119);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#tournament-export').click()
  ]);
  const archive = await readFile(await download.path());
  expect(archive.length).toBeLessThan(2 * 1024 * 1024);
  await page.reload();
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-file').setInputFiles({ name: 'stress-16.json', mimeType: 'application/json', buffer: archive });
  await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
  await page.locator('#tournament-match-status').selectOption('completed');
  await expect(page.locator('#tournament-pairings li:visible')).toHaveCount(1);
  await page.locator('#tournament-match-search').fill('match-001');
  await expect(page.locator('#tournament-pairings li:visible button[data-replay-match-id]')).toHaveCount(1);
  await page.locator('#tournament-match-reset').click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
