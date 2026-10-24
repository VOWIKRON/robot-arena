import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

test('NEXT-46 replay export/import is keyboard accessible and does not change the match', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  const tickBefore = await page.locator('#status').innerText();
  const energyBefore = await page.getByRole('progressbar', { name: 'Energie Roboter A' }).getAttribute('aria-valuenow');

  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Replay-Dateien' })).toBeVisible();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Replay exportieren' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('robot-arena-replay-seed-4711-tick-1.json');
  await expect(page.locator('#replay-feedback')).toContainText('1 Ticks exportiert');

  await page.locator('#replay-file').setInputFiles({
    name: 'invalid.json', mimeType: 'application/json', buffer: Buffer.from('{broken')
  });
  await expect(page.locator('#replay-feedback')).toContainText('Import abgelehnt');
  expect(await page.locator('#status').innerText()).toBe(tickBefore);
  expect(await page.getByRole('progressbar', { name: 'Energie Roboter A' }).getAttribute('aria-valuenow')).toBe(energyBefore);

  await page.locator('#replay-file').setInputFiles({
    name: download.suggestedFilename(), mimeType: 'application/json', buffer: await readFile(await download.path())
  });
  await expect(page.locator('#replay-feedback')).toContainText('Replay geprüft: Seed 4711, 1 Ticks');
  expect(await page.locator('#status').innerText()).toBe(tickBefore);
  await page.getByRole('button', { name: 'Replay importieren' }).focus();
  await expect(page.getByRole('button', { name: 'Replay importieren' })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
