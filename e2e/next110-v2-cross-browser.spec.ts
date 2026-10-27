import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

// NEXT-110: explicitly included in desktop/iPhone WebKit as well as Chromium.
// Exercise the real UI, replay, archive validation and sandbox isolation.
test('NEXT-110: v2 archive and replay roundtrip is safe on desktop and mobile browsers', async ({ page }) => {
  await page.goto('/');
  const sandboxBefore = await page.locator('#bot-a').getAttribute('style');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await expect(page.locator('#tournament-ruleset')).toHaveValue('sequential-v1');
  await page.locator('#tournament-ruleset').selectOption('simultaneous-v2');
  await page.locator('#tournament-ticks').fill('1');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-autosave')).toBeDisabled();
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Speichern', exact: true }).click();
  const download = await downloadPromise;
  const archive = JSON.parse(await readFile(await download.path(), 'utf8'));
  expect(archive.schemaVersion).toBe(2);
  expect(archive.run.definition.rulesetVersion).toBe('simultaneous-v2');

  await page.locator('#tournament-pairings li').first()
    .getByRole('button', { name: /Replay abspielen/ }).click();
  await expect(page.getByRole('dialog', { name: 'Replay-Dateien' })).toBeVisible();
  await expect(page.locator('#replay-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Replay-Schritt' }).click();
  await expect(page.locator('#replay-progress')).toContainText('1 / 1');
  await expect(page.locator('#replay-stats')).toContainText('A: Position');
  await expect(page.locator('#replay-result')).toContainText('Ergebnis: Unentschieden (Ticklimit)');
  await expect(page.locator('#replay-analysis')).toBeVisible();
  await expect(page.locator('#replay-stat-a')).toContainText('Schüsse');
  await expect(page.locator('#replay-stat-b')).toContainText('Schüsse');
  await page.getByRole('button', { name: 'Schließen', exact: true }).click();
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();

  await page.locator('#tournament-file').setInputFiles(await download.path());
  await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
  await expect(page.locator('#tournament-ruleset')).toHaveValue('simultaneous-v2');
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
  expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
});

test('NEXT-110: invalid v2 ruleset archive cannot replace an active browser tournament', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-ruleset').selectOption('simultaneous-v2');
  await page.locator('#tournament-ticks').fill('1');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Speichern', exact: true }).click();
  const archive = JSON.parse(await readFile(await (await downloadPromise).path(), 'utf8'));
  const before = await page.locator('#tournament-progress').innerText();

  archive.run.definition.rulesetVersion = 'sequential-v1';
  await page.locator('#tournament-file').setInputFiles({
    name: 'tampered-v2.json', mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(archive))
  });
  await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
  await expect(page.locator('#tournament-feedback')).toContainText(/ungültig|version|regel|ruleset/i);
  await expect(page.locator('#tournament-progress')).toHaveText(before);
  await expect(page.locator('#tournament-ruleset')).toHaveValue('simultaneous-v2');
});


test('NEXT-110-E8: v2 Double-KO replay shows an explicit draw on desktop and mobile', async ({ page }) => {
  // Generate a deterministic v2 fixture without changing the sandbox or tournament.
  const { RAPTOR, TITAN } = await import('../src/engine/presets');
  const { recordMatchV2, serializeReplayV2 } = await import('../src/engine/replay-v2');
  const alpha = { ...RAPTOR, id: 'e8-alpha', speed: 0, weaponRange: 100, weaponDamage: 1000 };
  const beta = { ...TITAN, id: 'e8-beta', speed: 0, weaponRange: 100, weaponDamage: 1000 };
  const replay = recordMatchV2(alpha, beta, 5, 10);
  expect(replay.finalState).toMatchObject({ outcome: 'draw', winner: null, endReason: 'destroyed' });
  expect(replay.frames).toHaveLength(1);

  await page.goto('/');
  const before = await page.locator('#status').innerText();
  const sandboxBefore = await page.locator('#bot-a').getAttribute('style');
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await page.locator('#replay-file').setInputFiles({
    name: 'next110-e8-double-ko.json', mimeType: 'application/json',
    buffer: Buffer.from(serializeReplayV2(replay))
  });
  await expect(page.locator('#replay-feedback')).toContainText('Replay geprüft:');
  await expect(page.locator('#replay-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Replay-Schritt' }).click();
  await expect(page.locator('#replay-progress')).toContainText('1 / 1');
  await expect(page.locator('#replay-result')).toHaveText('Ergebnis: Unentschieden (Double-KO)');
  await expect(page.locator('#replay-stat-a')).toContainText('Schüsse 1');
  await expect(page.locator('#replay-stat-b')).toContainText('Schüsse 1');
  await page.getByRole('button', { name: 'Replay-Anfang' }).click();
  await expect(page.locator('#replay-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Schließen', exact: true }).click();
  expect(await page.locator('#status').innerText()).toBe(before);
  expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
});

test('NEXT-110-E11: v2 replay statistics and controls remain keyboard-accessible on all browsers', async ({ page }) => {
  const { RAPTOR, TITAN } = await import('../src/engine/presets');
  const { recordMatchV2, serializeReplayV2 } = await import('../src/engine/replay-v2');
  const a = { ...RAPTOR, id: 'e11-a', speed: 0, weaponRange: 100, weaponDamage: 1000 };
  const b = { ...TITAN, id: 'e11-b', speed: 0, weaponRange: 100, weaponDamage: 1000 };
  const replay = serializeReplayV2(recordMatchV2(a, b, 5, 10));

  await page.goto('/');
  const sandboxBefore = await page.locator('#bot-a').getAttribute('style');
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Replay-Dateien' })).toBeVisible();
  await page.locator('#replay-file').setInputFiles({
    name: 'next110-e11-a11y.json', mimeType: 'application/json',
    buffer: Buffer.from(replay)
  });
  await expect(page.locator('#replay-feedback')).toContainText('Replay geprüft:');
  await expect(page.locator('#replay-progress')).toHaveAttribute('role', 'status');
  await expect(page.locator('#replay-progress')).toHaveAttribute('aria-live', 'polite');
  await expect(page.getByRole('slider', { name: 'Replay-Zeitleiste' })).toBeEnabled();
  await expect(page.locator('#replay-analysis')).toBeVisible();
  await expect(page.locator('#replay-analysis')).toHaveAttribute('aria-label', 'Replay-Kampfstatistik');
  await expect(page.locator('#replay-progress')).toContainText('0 / 1');

  // Keyboard activation works on desktop and mobile emulation without touch-only actions.
  await page.getByRole('button', { name: 'Replay-Schritt' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#replay-progress')).toContainText('1 / 1');
  await expect(page.locator('#replay-result')).toHaveText('Ergebnis: Unentschieden (Double-KO)');
  await expect(page.locator('#replay-stat-a')).toContainText('Schüsse 1');
  await expect(page.locator('#replay-stat-b')).toContainText('Schüsse 1');
  await page.getByRole('button', { name: 'Replay-Anfang' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#replay-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Schließen', exact: true }).click();
  expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
});

test('NEXT-110-E14: Double-KO replay timeline supports Home/End and arrow keys without sandbox changes', async ({ page }) => {
  const { RAPTOR, TITAN } = await import('../src/engine/presets');
  const { recordMatchV2, serializeReplayV2 } = await import('../src/engine/replay-v2');
  const a = { ...RAPTOR, id: 'e14-a', speed: 0, weaponRange: 100, weaponDamage: 1000 };
  const b = { ...TITAN, id: 'e14-b', speed: 0, weaponRange: 100, weaponDamage: 1000 };
  const replay = serializeReplayV2(recordMatchV2(a, b, 5, 10));

  await page.goto('/');
  const sandboxBefore = await page.locator('#bot-a').getAttribute('style');
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await page.locator('#replay-file').setInputFiles({
    name: 'next110-e14-slider.json', mimeType: 'application/json',
    buffer: Buffer.from(replay)
  });
  await expect(page.locator('#replay-feedback')).toContainText('Replay geprüft:');
  const slider = page.getByRole('slider', { name: 'Replay-Zeitleiste' });
  await expect(slider).toBeEnabled();
  await expect(slider).toHaveValue('0');
  await slider.focus();
  await page.keyboard.press('End');
  await expect(slider).toHaveValue('1');
  await expect(page.locator('#replay-progress')).toContainText('1 / 1');
  await expect(page.locator('#replay-result')).toHaveText('Ergebnis: Unentschieden (Double-KO)');
  await expect(page.locator('#replay-stat-a')).toContainText('Schüsse 1');
  await expect(page.locator('#replay-stat-b')).toContainText('Schüsse 1');
  await page.keyboard.press('Home');
  await expect(slider).toHaveValue('0');
  await expect(page.locator('#replay-progress')).toContainText('0 / 1');
  await page.keyboard.press('ArrowRight');
  await expect(slider).toHaveValue('1');
  await page.keyboard.press('ArrowLeft');
  await expect(slider).toHaveValue('0');
  await page.getByRole('button', { name: 'Schließen', exact: true }).click();
  expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
});
