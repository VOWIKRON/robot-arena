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

test('NEXT-60: opt-in balanced side assignment survives save/load and drives the real match', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-count').fill('4');
  await page.locator('#tournament-count').press('Tab');
  await page.locator('#tournament-side-assignment').selectOption('balanced');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-pairings li')).toHaveCount(6);
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 6');
  const saved = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Speichern' }).click();
  const file = await saved;
  const archive = JSON.parse(await readFile(await file.path(), 'utf8'));
  expect(archive.run.definition.sideAssignment).toBe('balanced');
  expect(archive.run.results[0].robotAId).toBe(archive.run.definition.participants[0].id);
  await page.locator('#tournament-side-assignment').selectOption('legacy');
  await page.locator('#tournament-file').setInputFiles(await file.path());
  await expect(page.locator('#tournament-side-assignment')).toHaveValue('balanced');
  await expect(page.locator('#tournament-progress')).toContainText('1 / 6');
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('2 / 6');
  await page.getByRole('button', { name: 'Turnier schließen' }).click();
  await expect(page.locator('#bot-a')).toBeVisible();
});

test('NEXT-62: automatic 16-player tournament yields to pause, resumes and cancels at match boundaries', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-count').fill('16');
  await page.locator('#tournament-count').press('Tab');
  await page.locator('#tournament-ticks').fill('20');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 120');
  await page.getByRole('button', { name: 'Alle Kämpfe spielen' }).click();
  await page.getByRole('button', { name: 'Pause', exact: true }).last().click();
  await expect(page.locator('#tournament-progress')).toContainText('paused');
  const paused = await page.locator('#tournament-progress').innerText();
  await page.waitForTimeout(200);
  await expect(page.locator('#tournament-progress')).toHaveText(paused);
  await page.getByRole('button', { name: 'Fortsetzen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('120 / 120', { timeout: 20000 });
  await expect(page.locator('#tournament-progress')).toContainText('completed');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await page.getByRole('button', { name: 'Alle Kämpfe spielen' }).click();
  await page.getByRole('button', { name: 'Abbrechen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('cancelled');
  const cancelled = await page.locator('#tournament-progress').innerText();
  await page.waitForTimeout(200);
  await expect(page.locator('#tournament-progress')).toHaveText(cancelled);
  await page.getByRole('button', { name: 'Turnier schließen' }).click();
  await expect(page.locator('#bot-a')).toBeVisible();
});
