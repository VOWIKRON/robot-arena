import { test, expect } from '@playwright/test';

test('NEXT-59: tournament execution, pause, resume and archive roundtrip', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('0/1');
  await page.getByRole('button', { name: 'Pause', exact: true }).last().click();
  await expect(page.locator('#tournament-progress')).toContainText('paused');
  await page.getByRole('button', { name: 'Fortsetzen' }).click();
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1/1');
  await expect(page.locator('#tournament-progress')).toContainText('completed');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Speichern' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('robot-arena-turnier.json');
  await page.locator('#tournament-file').setInputFiles(await download.path() as string);
  await expect(page.locator('#tournament-progress')).toContainText('1/1');
  await expect(page.locator('#tournament-table tbody tr')).toHaveCount(2);
});
