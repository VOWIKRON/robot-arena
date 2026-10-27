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

test('NEXT-110-E18: rejected v2 replay import preserves the loaded replay, cursor and sandbox', async ({ page }) => {
  const { RAPTOR, TITAN } = await import('../src/engine/presets');
  const { recordMatchV2, serializeReplayV2 } = await import('../src/engine/replay-v2');
  const a = { ...RAPTOR, id: 'e18-a', speed: 0, weaponRange: 100, weaponDamage: 1000 };
  const b = { ...TITAN, id: 'e18-b', speed: 0, weaponRange: 100, weaponDamage: 1000 };
  const valid = recordMatchV2(a, b, 5, 10);
  expect(valid.finalState).toMatchObject({ outcome: 'draw', winner: null, endReason: 'destroyed' });

  await page.goto('/');
  const sandboxBefore = await page.locator('#bot-a').getAttribute('style');
  const statusBefore = await page.locator('#status').innerText();
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  const input = page.locator('#replay-file');
  await input.setInputFiles({
    name: 'next110-e18-valid.json', mimeType: 'application/json',
    buffer: Buffer.from(serializeReplayV2(valid))
  });
  await expect(page.locator('#replay-feedback')).toContainText('Replay geprüft:');
  await page.getByRole('button', { name: 'Replay-Schritt' }).click();
  await expect(page.locator('#replay-progress')).toContainText('1 / 1');
  const progressBefore = await page.locator('#replay-progress').innerText();
  const resultBefore = await page.locator('#replay-result').innerText();
  const statsBefore = await page.locator('#replay-stats').innerText();
  const sliderBefore = await page.getByRole('slider', { name: 'Replay-Zeitleiste' }).inputValue();

  const forged = JSON.parse(serializeReplayV2(valid));
  forged.finalState.winner = 'forged-winner';
  await input.setInputFiles({
    name: 'next110-e18-invalid.json', mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(forged))
  });
  await expect.poll(() => input.inputValue()).toBe('');
  await expect(page.locator('#replay-feedback')).toContainText('Replay-Import abgelehnt:');
  await expect(page.locator('#replay-progress')).toHaveText(progressBefore);
  await expect(page.locator('#replay-result')).toHaveText(resultBefore);
  await expect(page.locator('#replay-stats')).toHaveText(statsBefore);
  await expect(page.getByRole('slider', { name: 'Replay-Zeitleiste' })).toHaveValue(sliderBefore);
  await page.getByRole('button', { name: 'Replay-Anfang' }).click();
  await expect(page.locator('#replay-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Schließen', exact: true }).click();
  expect(await page.locator('#status').innerText()).toBe(statusBefore);
  expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
});

test('NEXT-110-E21: repeated invalid imports preserve the active replay and a subsequent valid import recovers', async ({ page }) => {
  const { RAPTOR, TITAN } = await import('../src/engine/presets');
  const { recordMatchV2, serializeReplayV2 } = await import('../src/engine/replay-v2');
  const a = { ...RAPTOR, id: 'e21-a', speed: 0, weaponRange: 100, weaponDamage: 1000 };
  const b = { ...TITAN, id: 'e21-b', speed: 0, weaponRange: 100, weaponDamage: 1000 };
  const original = recordMatchV2(a, b, 5, 10);
  const replacement = recordMatchV2({ ...a, id: 'e21-replacement-a' }, { ...b, id: 'e21-replacement-b' }, 11, 10);
  expect(original.frames).toHaveLength(1);
  expect(replacement.frames).toHaveLength(1);

  await page.goto('/');
  const sandboxBefore = await page.locator('#bot-a').getAttribute('style');
  const statusBefore = await page.locator('#status').innerText();
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  const input = page.locator('#replay-file');
  const feedback = page.locator('#replay-feedback');
  await input.setInputFiles({
    name: 'e21-original.json', mimeType: 'application/json',
    buffer: Buffer.from(serializeReplayV2(original))
  });
  await expect(feedback).toContainText('Replay geprüft:');
  await page.getByRole('button', { name: 'Replay-Schritt' }).click();
  const progressBefore = await page.locator('#replay-progress').innerText();
  const resultBefore = await page.locator('#replay-result').innerText();
  const statsBefore = await page.locator('#replay-stats').innerText();
  const sliderBefore = await page.getByRole('slider', { name: 'Replay-Zeitleiste' }).inputValue();
  expect(sliderBefore).toBe('1');

  const forged = JSON.parse(serializeReplayV2(original));
  forged.finalState.winner = 'forged-e21-winner';
  for (const [name, buffer] of [
    ['e21-invalid-json.json', Buffer.from('{invalid-json')],
    ['e21-forged-winner.json', Buffer.from(JSON.stringify(forged))]
  ] as const) {
    await input.setInputFiles({ name, mimeType: 'application/json', buffer });
    await expect.poll(() => input.inputValue()).toBe('');
    await expect(feedback).toContainText('Replay-Import abgelehnt:');
    await expect(page.locator('#replay-progress')).toHaveText(progressBefore);
    await expect(page.locator('#replay-result')).toHaveText(resultBefore);
    await expect(page.locator('#replay-stats')).toHaveText(statsBefore);
    await expect(page.getByRole('slider', { name: 'Replay-Zeitleiste' })).toHaveValue(sliderBefore);
  }

  await input.setInputFiles({
    name: 'e21-replacement.json', mimeType: 'application/json',
    buffer: Buffer.from(serializeReplayV2(replacement))
  });
  await expect(feedback).toContainText('Replay geprüft:');
  await expect(page.locator('#replay-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Replay-Schritt' }).click();
  await expect(page.locator('#replay-progress')).toContainText('1 / 1');
  await expect(page.locator('#replay-result')).toHaveText('Ergebnis: Unentschieden (Double-KO)');
  await page.getByRole('button', { name: 'Schließen', exact: true }).click();
  expect(await page.locator('#status').innerText()).toBe(statusBefore);
  expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
});
