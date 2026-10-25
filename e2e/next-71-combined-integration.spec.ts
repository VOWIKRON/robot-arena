import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('NEXT-71 integration: custom sandbox robots complete a match and export the same participant names', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-config').click();
  await page.locator('#chassis-a').selectOption('titan');
  await page.locator('#apply-config').click();

  await page.locator('#open-tournament').click();
  await page.locator('#tournament-preset-1').selectOption('sandbox-a');
  await page.locator('#tournament-preset-2').selectOption('sandbox-b');
  await page.locator('#tournament-name-1').fill('Eigener A');
  await page.locator('#tournament-name-2').fill('Eigener B');
  await page.locator('#tournament-ticks').fill('10');
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-pairings li')).toHaveCount(1);
  await page.locator('#tournament-run').click();

  const [jsonDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('button[data-match-export-format="json"]').click()
  ]);
  const report = JSON.parse((await readFile(await jsonDownload.path())).toString('utf8')) as {
    schemaVersion: number; matchId: string; robotAName: string; robotBName: string
  };
  expect(report).toMatchObject({
    schemaVersion: 1, matchId: 'match-001', robotAName: 'Eigener A', robotBName: 'Eigener B'
  });

  const [csvDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('button[data-match-export-format="csv"]').click()
  ]);
  const csv = (await readFile(await csvDownload.path())).toString('utf8');
  expect(csv.startsWith('\uFEFF')).toBe(true);
  expect(csv).toContain('Eigener A');
  expect(csv).toContain('Eigener B');
});

test('NEXT-71 integration: combined tournament controls and match export fit a 375px viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-preset-1').selectOption('sandbox-a');
  await page.locator('#tournament-preset-2').selectOption('sandbox-b');
  await page.locator('#tournament-ticks').fill('10');
  await page.locator('#tournament-create').click();
  await page.locator('#tournament-run').click();
  await expect(page.getByRole('button', { name: /Kampf CSV exportieren/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
