import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

test('NEXT-59: tournament execution, pause, resume and archive roundtrip', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Pause', exact: true }).last().click();
  await expect(page.locator('#tournament-progress')).toContainText('paused');
  await page.getByRole('button', { name: 'Fortsetzen' }).click();
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
  await expect(page.locator('#tournament-progress')).toContainText('completed');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Speichern' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('robot-arena-turnier.json');
  await page.locator('#tournament-file').setInputFiles(await download.path() as string);
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
  await expect(page.locator('#tournament-table tbody tr')).toHaveCount(2);
});

test('NEXT-58: custom participant IDs survive import and invalid JSON preserves the active tournament', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Speichern' }).click();
  const download = await downloadPromise;
  const archive = JSON.parse(await readFile(await download.path(), 'utf8'));
  archive.run.definition.participants[0].id = 'custom-alpha';
  archive.run.definition.participants[0].name = 'Alpha Import';
  archive.run.definition.participants[1].id = 'custom-beta';
  archive.run.definition.participants[1].name = 'Beta Import';
  await page.locator('#tournament-file').setInputFiles({
    name: 'custom.json', mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(archive))
  });
  await expect(page.locator('#tournament-table tbody')).toContainText('Alpha Import');
  await expect(page.locator('#tournament-table tbody')).toContainText('Beta Import');
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
  const before = await page.locator('#tournament-progress').innerText();
  await page.locator('#tournament-file').setInputFiles({
    name: 'broken.json', mimeType: 'application/json',
    buffer: Buffer.from('{"schemaVersion":2}')
  });
  await expect(page.locator('#tournament-feedback')).toContainText(/ungültige Version/);
  await expect(page.locator('#tournament-progress')).toHaveText(before);
  await expect(page.locator('#tournament-table tbody')).toContainText('Alpha Import');
});
