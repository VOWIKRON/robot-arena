import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('NEXT-70: completed match CSV and JSON downloads are validated and accessible', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-ticks').fill('10');
  await page.locator('#tournament-create').click();
  await expect(page.locator('button[data-match-export-id]')).toHaveCount(0);
  await page.locator('#tournament-run').click();
  await expect(page.locator('button[data-match-export-id]')).toHaveCount(2);

  const [csv] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('button[data-match-export-format="csv"]').click()
  ]);
  expect(csv.suggestedFilename()).toBe('robot-arena-match-001.csv');
  const csvContent = (await readFile(await csv.path())).toString('utf8');
  expect(csvContent.startsWith('\uFEFF')).toBe(true);
  expect(csvContent).toContain('robotAName');
  expect(csvContent).toContain('Raptor 1');

  const [json] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('button[data-match-export-format="json"]').click()
  ]);
  const report = JSON.parse((await readFile(await json.path())).toString('utf8')) as {
    schemaVersion: number; matchId: string; ticks: number
  };
  expect(report).toMatchObject({ schemaVersion: 1, matchId: 'match-001' });
  expect(report.ticks).toBeGreaterThanOrEqual(0);
});

test('NEXT-70: match exports are reachable on narrow touch viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-ticks').fill('10');
  await page.locator('#tournament-create').click();
  await page.locator('#tournament-run').click();
  await expect(page.getByRole('button', { name: /Kampf CSV exportieren/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
