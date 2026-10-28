import { readFile } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';

/**
 * NEXT-110 E6: real Chromium desktop/mobile integration, not a unit-only
 * 120-match simulation. WebKit v2 import/replay remains covered by the
 * dedicated next110-v2-cross-browser suite.
 */
async function exportArchive(page: Page): Promise<{ archive: any; file: string }> {
  const pending = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Speichern', exact: true }).click();
  const file = await (await pending).path();
  return { archive: JSON.parse(await readFile(file, 'utf8')), file };
}

test('NEXT-110 E6: 16-robot / 120-match v2 browser tournament survives export, reload, import and replay', async ({ page }, testInfo) => {
  // NEXT-110-E22: enforce the WebKit 120-match budget (the previous literal \\n was inside a comment).
  // On constrained CI runners, 120 UI updates may need up to three minutes.
  const isWebKit = testInfo.project.name.includes('webkit');
  test.setTimeout(isWebKit ? 180_000 : 120_000);
  testInfo.annotations.push({ type: 'timeout-budget', description: `${testInfo.project.name}: ${isWebKit ? 180_000 : 120_000}ms` });
  const start = Date.now();
  await page.goto('/');
  const sandboxBefore = await page.locator('#bot-a').getAttribute('style');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-count').fill('16');
  await page.locator('#tournament-count').press('Tab');
  await page.locator('#tournament-seed').fill('4711');
  await page.locator('#tournament-ticks').fill('1');
  await page.locator('#tournament-side-assignment').selectOption('balanced');
  await page.locator('#tournament-ruleset').selectOption('simultaneous-v2');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
  await expect(page.locator('#tournament-progress')).toContainText('0 / 120');
  await expect(page.locator('#tournament-autosave')).toBeDisabled();

  await page.getByRole('button', { name: 'Alle Kämpfe spielen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('120 / 120', { timeout: testInfo.project.name.includes('webkit') ? 120_000 : 60_000 });
  await expect(page.locator('#tournament-progress')).toContainText('completed');
  const tournamentElapsedMs = Date.now() - start;
  const original = await exportArchive(page);
  expect(original.archive).toMatchObject({
    schemaVersion: 2,
    run: {
      status: 'completed',
      definition: { schemaVersion: 2, rulesetVersion: 'simultaneous-v2' }
    }
  });
  const results = original.archive.run.results;
  expect(results).toHaveLength(120);
  expect(new Set(results.map((item: { matchId: string }) => item.matchId)).size).toBe(120);
  expect(new Set(results.map((item: { seed: number }) => item.seed)).size).toBe(120);
  const before = JSON.stringify(original.archive);

  // v2 must NOT write to the legacy v1 local autosave. Restore from the
  // downloaded JSON instead, using the actual browser import path.
  await page.reload();
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  const importStartedAt = Date.now();
  await page.locator('#tournament-file').setInputFiles(original.file);
  await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
  const archiveImportElapsedMs = Date.now() - importStartedAt;
  await expect(page.locator('#tournament-ruleset')).toHaveValue('simultaneous-v2');
  await expect(page.locator('#tournament-progress')).toContainText('120 / 120');
  await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
  expect(JSON.stringify((await exportArchive(page)).archive)).toBe(before);

  // NEXT-110-E12: a malicious full 120-match archive must be rejected
  // without replacing the active completed tournament or touching sandbox.
  const progressBeforeTamper = await page.locator('#tournament-progress').innerText();
  const tamperCases: Array<(archive: any) => void> = [
    archive => { archive.run.nextMatchIndex = 119; },
    archive => { archive.run.results[119].matchId = archive.run.results[0].matchId; },
    // NEXT-110-E16: a valid match ID with a forged seed must fail independently.
    archive => { archive.run.results[119].seed += 1; }
  ];
  for (const [index, tamper] of tamperCases.entries()) {
    const candidate = structuredClone(original.archive);
    tamper(candidate);
    await page.locator('#tournament-file').setInputFiles({
      name: `next110-e12-tampered-${index}.json`,
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(candidate))
    });
    await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
    await expect(page.locator('#tournament-feedback'))
      .toContainText(/ungültig|Reihenfolge|Turnierarchiv|Teilnehmer oder Seed passen nicht zum Spielplan/i);
    await expect(page.locator('#tournament-progress')).toHaveText(progressBeforeTamper);
    await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
    expect(JSON.stringify((await exportArchive(page)).archive)).toBe(before);
    expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
  }

  const recoveryStartedAt = Date.now();
  // NEXT-110-E24: repeated invalid imports must not corrupt the current 120-match
  // archive; a subsequent valid import must recover without touching sandbox.
  for (const [index, payload] of ['{broken-json', JSON.stringify({ schemaVersion: 2, run: null })].entries()) {
    await page.locator('#tournament-file').setInputFiles({
      name: `next110-e24-rejected-${index}.json`,
      mimeType: 'application/json',
      buffer: Buffer.from(payload)
    });
    await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
    await expect(page.locator('#tournament-feedback')).not.toBeEmpty();
    await expect(page.locator('#tournament-progress')).toHaveText(progressBeforeTamper);
    await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
    expect(JSON.stringify((await exportArchive(page)).archive)).toBe(before);
    expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
  }
  // NEXT-110-E27: reject alternate archive shapes and unsupported schema versions
  // after a valid 120-match import. Every rejection must preserve the exact export.
  const extraInvalidArchives = [
    { name: 'array-root', payload: JSON.stringify([original.archive]) },
    { name: 'unsupported-schema', payload: JSON.stringify({ ...original.archive, schemaVersion: 999 }) }
  ];
  for (const { name, payload } of extraInvalidArchives) {
    await page.locator('#tournament-file').setInputFiles({
      name: `next110-e27-${name}.json`,
      mimeType: 'application/json',
      buffer: Buffer.from(payload)
    });
    await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
    await expect(page.locator('#tournament-feedback')).not.toBeEmpty();
    await expect(page.locator('#tournament-progress')).toHaveText(progressBeforeTamper);
    await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
    expect(JSON.stringify((await exportArchive(page)).archive)).toBe(before);
    expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
  }
  await page.locator('#tournament-file').setInputFiles(original.file);
  await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
  await expect(page.locator('#tournament-progress')).toHaveText(progressBeforeTamper);
  expect(JSON.stringify((await exportArchive(page)).archive)).toBe(before);
  expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);

  // NEXT-110-E30: after a successful recovery, malformed results must still be
  // rejected without replacing the restored 120-match archive or sandbox.
  const postRecoveryMutations: Array<{ name: string; change: (archive: any) => void }> = [
    {
      name: 'duplicate-result',
      change: archive => { archive.run.results[118] = structuredClone(archive.run.results[117]); }
    },
    {
      name: 'missing-match-id',
      change: archive => { delete archive.run.results[118].matchId; }
    }
  ];
  for (const { name, change } of postRecoveryMutations) {
    const candidate = structuredClone(original.archive);
    change(candidate);
    await page.locator('#tournament-file').setInputFiles({
      name: `next110-e30-${name}.json`,
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(candidate))
    });
    await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
    await expect(page.locator('#tournament-feedback')).not.toBeEmpty();
    await expect(page.locator('#tournament-progress')).toHaveText(progressBeforeTamper);
    await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
    expect(JSON.stringify((await exportArchive(page)).archive)).toBe(before);
    expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
  }

  const invalidImportRecoveryElapsedMs = Date.now() - recoveryStartedAt;

  // The imported terminal match must still have an event-only replay and
  // visible v2 statistics; the sandbox must remain isolated throughout.
  await page.locator('#tournament-pairings li').last()
    .getByRole('button', { name: /Replay abspielen/ }).click();
  await expect(page.getByRole('dialog', { name: 'Replay-Dateien' })).toBeVisible();
  await expect(page.locator('#replay-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Replay-Schritt' }).click();
  await expect(page.locator('#replay-progress')).toContainText('1 / 1');
  await expect(page.locator('#replay-analysis')).toBeVisible();
  await expect(page.locator('#replay-result')).toContainText('Ergebnis:');
  await expect(page.locator('#replay-stat-a')).toContainText('Schüsse');
  await expect(page.locator('#replay-stat-b')).toContainText('Schüsse');
  expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);

  // NEXT-110-E28: fail closed on missing/invalid timing evidence before
  // attaching it. JSON.stringify silently turns NaN/Infinity into null.
  const timingEvidence = {
    ruleset: 'simultaneous-v2', participants: 16, matches: 120,
    maxTicks: 1, seed: 4711, archiveBytes: Buffer.byteLength(before),
    elapsedMs: Date.now() - start, tournamentElapsedMs, archiveImportElapsedMs,
    invalidImportRecoveryElapsedMs, timeoutBudgetMs: isWebKit ? 180_000 : 120_000,
    browserProject: testInfo.project.name, importedArchiveIdentical: true
  };
  const timingFields = [
    'elapsedMs', 'tournamentElapsedMs', 'archiveImportElapsedMs',
    'invalidImportRecoveryElapsedMs', 'timeoutBudgetMs'
  ] as const;
  for (const field of timingFields) {
    expect(Number.isFinite(timingEvidence[field]), `${field} must be finite`).toBe(true);
    expect(timingEvidence[field], `${field} must be nonnegative`).toBeGreaterThanOrEqual(0);
  }
  expect(timingEvidence.archiveBytes).toBeGreaterThan(0);
  expect(timingEvidence.browserProject).toBe(testInfo.project.name);
  expect(timingEvidence.elapsedMs).toBeGreaterThanOrEqual(timingEvidence.tournamentElapsedMs);
  await testInfo.attach('next110-v2-120-browser.json', {
    body: Buffer.from(JSON.stringify(timingEvidence, null, 2)),
    contentType: 'application/json'
  });
});
