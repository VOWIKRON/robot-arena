import { readFile } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';
import { validateTimingEvidence, type TimingEvidence } from '../tests/helpers/next110-timing-evidence';

/**
 * NEXT-110 E6: real Chromium desktop/mobile integration, not a unit-only
 * 120-match simulation. WebKit v2 import/replay remains covered by the
 * dedicated next110-v2-cross-browser suite.
 */
async function exportArchive(
  page: Page,
  options: { timeoutMs?: number; trigger?: () => Promise<unknown> } = {}
): Promise<{ archive: any; file: string }> {
  // NEXT-110-E42: injectable trigger/timeout make the missing-download error
  // testable without a 30-second wait or a real failing browser download.
  const timeoutMs = options.timeoutMs ?? 30_000;
  const trigger = options.trigger ?? (() => page.getByRole('button', { name: 'Speichern', exact: true }).click());
  let download;
  try {
    [download] = await Promise.all([
      page.waitForEvent('download', { timeout: timeoutMs }),
      trigger()
    ]);
  } catch (cause) {
    const feedback = await page.locator('#tournament-feedback').textContent().catch(() => null);
    throw new Error(
      `NEXT-110-E39/E42: Turnierarchiv-Download fehlgeschlagen (${timeoutMs}ms); UI-Feedback: ${feedback?.trim() || 'keines'}`,
      { cause }
    );
  }
  const file = await download.path();
  return { archive: JSON.parse(await readFile(file, 'utf8')), file };
}

test('NEXT-110-E42: missing download reports bounded failure with UI feedback', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  // Inject a harmless diagnostic message and deliberately never trigger Save.
  await page.locator('#tournament-feedback').evaluate(node => {
    node.textContent = 'E42 absichtlich kein Download';
  });
  const startedAt = Date.now();
  await expect(exportArchive(page, {
    timeoutMs: 250,
    trigger: async () => { await page.locator('#tournament-feedback').isVisible(); }
  })).rejects.toThrow(/NEXT-110-E39\/E42:.*250ms.*E42 absichtlich kein Download/);
  expect(Date.now() - startedAt).toBeLessThan(5_000);
});

// NEXT-110-E45: missing download without UI feedback must have a bounded,
// actionable diagnostic and must not leak a page-level unhandled exception.
test('NEXT-110-E45: missing download with empty feedback reports keines', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-feedback').evaluate(node => { node.textContent = ''; });
  const startedAt = Date.now();
  await expect(exportArchive(page, {
    timeoutMs: 250,
    trigger: async () => { await page.locator('#tournament-feedback').isVisible(); }
  })).rejects.toThrow(/NEXT-110-E39\/E42:.*250ms.*UI-Feedback: keines/);
  expect(Date.now() - startedAt).toBeLessThan(5_000);
  expect(pageErrors).toEqual([]);
});


/** NEXT-110-E48: a rejected download trigger must retain its cause and
 * never leave a page-level unhandled error or wait for the 30-second default. */
test('NEXT-110-E48: rejected download trigger preserves cause without page errors', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-feedback').evaluate(node => {
    node.textContent = 'E48 Trigger abgebrochen';
  });
  const triggerFailure = new Error('E48 absichtlicher Trigger-Abbruch');
  const startedAt = Date.now();
  const caught: unknown = await exportArchive(page, {
    timeoutMs: 250,
    trigger: async () => { throw triggerFailure; }
  }).then(() => null, (error: unknown) => error);
  expect(caught).toBeInstanceOf(Error);
  expect((caught as Error).message).toMatch(/Download fehlgeschlagen.*250ms.*E48 Trigger abgebrochen/);
  expect((caught as Error).cause).toBe(triggerFailure);
  expect(Date.now() - startedAt).toBeLessThan(5_000);
  await page.waitForTimeout(300);
  expect(pageErrors).toEqual([]);
});

test.describe.serial('NEXT-110 120-match archive isolation phases', () => {
let canonicalArchive = '';

test('NEXT-110 E6: 16-robot / 120-match v2 browser tournament survives export, reload, import and replay', async ({ page }, testInfo) => {
  // NEXT-110-E22: enforce the WebKit 120-match budget (the previous literal \\n was inside a comment).
  // NEXT-110-E33: E30 adds several download/export integrity checks to the
  // same 120-match browser scenario. CI #40612282132/#40612441553 timed out
  // during exportArchive (line 194) on both Chromium projects, not in simulation.
  // Bound the complete scenario (including I/O) without relaxing assertions.
  const isWebKit = testInfo.project.name.includes('webkit');
  const timeoutBudgetMs = isWebKit ? 300_000 : 240_000;
  test.setTimeout(timeoutBudgetMs);
  testInfo.annotations.push({ type: 'timeout-budget', description: `${testInfo.project.name}: ${timeoutBudgetMs}ms` });
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

  const invalidImportRecoveryElapsedMs = Date.now() - recoveryStartedAt;
  canonicalArchive = before;

  // NEXT-110-E28: fail closed on missing/invalid timing evidence before
  // attaching it. JSON.stringify silently turns NaN/Infinity into null.
  const timingEvidence: TimingEvidence = {
    ruleset: 'simultaneous-v2', participants: 16, matches: 120,
    maxTicks: 1, seed: 4711, archiveBytes: Buffer.byteLength(before),
    elapsedMs: Date.now() - start, tournamentElapsedMs, archiveImportElapsedMs,
    invalidImportRecoveryElapsedMs, timeoutBudgetMs,
    browserProject: testInfo.project.name, importedArchiveIdentical: true
  };
  validateTimingEvidence(timingEvidence, testInfo.project.name);
  await testInfo.attach('next110-v2-120-browser.json', {
    body: Buffer.from(JSON.stringify(timingEvidence, null, 2)),
    contentType: 'application/json'
  });
});


// NEXT-110-E36: a fresh Playwright page/context avoids Chromium's repeated
// automatic-download throttling after the long E6/E12/E24/E27 sequence.
// The second phase imports the exact browser-exported 120-match archive;
// no fixture is synthesized and every export/restore assertion is retained.
test('NEXT-110-E36: post-recovery mutations and valid imports preserve 120 matches and replay', async ({ page }, testInfo) => {
  test.setTimeout(testInfo.project.name.includes('webkit') ? 180_000 : 150_000);
  expect(canonicalArchive).not.toBe('');
  await page.goto('/');
  const sandboxBefore = await page.locator('#bot-a').getAttribute('style');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-file').setInputFiles({
    name: 'next110-e36-original-120.json',
    mimeType: 'application/json',
    buffer: Buffer.from(canonicalArchive)
  });
  await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
  await expect(page.locator('#tournament-ruleset')).toHaveValue('simultaneous-v2');
  await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
  await expect(page.locator('#tournament-progress')).toContainText('120 / 120');
  const original = { archive: JSON.parse(canonicalArchive) };
  const before = canonicalArchive;
  const progressBeforeTamper = await page.locator('#tournament-progress').innerText();
  expect(JSON.stringify((await exportArchive(page)).archive)).toBe(before);
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
    // E36: a valid re-import must still work after every rejected mutation.
    await page.locator('#tournament-file').setInputFiles({
      name: 'next110-e36-valid-after-rejection.json',
      mimeType: 'application/json',
      buffer: Buffer.from(canonicalArchive)
    });
    await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
    await expect(page.locator('#tournament-progress')).toHaveText(progressBeforeTamper);
    // NEXT-110-E40: verify that the recovered tournament is still complete,
    // versioned v2, replayable and does not enable legacy v1 autosave.
    await expect(page.locator('#tournament-progress')).toContainText('completed');
    await expect(page.locator('#tournament-ruleset')).toHaveValue('simultaneous-v2');
    await expect(page.locator('#tournament-autosave')).toBeDisabled();
    await expect(page.locator('#tournament-pairings li').last()
      .getByRole('button', { name: /Replay abspielen/ })).toBeEnabled();
    expect(JSON.stringify((await exportArchive(page)).archive)).toBe(before);
    expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
  }


  // NEXT-110-E43: two consecutive valid imports use DOM/state assertions only,
  // avoiding further download events in the recovery phase.
  const pairingsBeforeReimports = await page.locator('#tournament-pairings').innerText();
  const progressBeforeReimports = await page.locator('#tournament-progress').innerText();
  for (let attempt = 0; attempt < 2; attempt++) {
    await page.locator('#tournament-file').setInputFiles({
      name: `next110-e43-valid-${attempt}.json`,
      mimeType: 'application/json',
      buffer: Buffer.from(canonicalArchive)
    });
    await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
    await expect(page.locator('#tournament-ruleset')).toHaveValue('simultaneous-v2');
    await expect(page.locator('#tournament-progress')).toHaveText(progressBeforeReimports);
    await expect(page.locator('#tournament-progress')).toContainText('120 / 120');
    await expect(page.locator('#tournament-progress')).toContainText('completed');
    await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
    expect(await page.locator('#tournament-pairings').innerText()).toBe(pairingsBeforeReimports);
    await expect(page.locator('#tournament-autosave')).toBeDisabled();
    await expect(page.locator('#tournament-pairings li').last()
      .getByRole('button', { name: /Replay abspielen/ })).toBeEnabled();
    expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
  }

  // NEXT-110-E46: alternate invalid/valid imports in the fresh recovery
  // context without triggering more downloads. Each rejection must be atomic.
  for (let attempt = 0; attempt < 2; attempt++) {
    const corrupted = structuredClone(original.archive);
    corrupted.run.results[118] = structuredClone(corrupted.run.results[117]);
    await page.locator('#tournament-file').setInputFiles({
      name: `next110-e46-invalid-${attempt}.json`,
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(corrupted))
    });
    await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
    await expect(page.locator('#tournament-feedback')).not.toBeEmpty();
    await expect(page.locator('#tournament-progress')).toHaveText(progressBeforeReimports);
    expect(await page.locator('#tournament-pairings').innerText()).toBe(pairingsBeforeReimports);
    expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);

    await page.locator('#tournament-file').setInputFiles({
      name: `next110-e46-valid-${attempt}.json`,
      mimeType: 'application/json',
      buffer: Buffer.from(canonicalArchive)
    });
    await expect.poll(() => page.locator('#tournament-file').inputValue()).toBe('');
    await expect(page.locator('#tournament-ruleset')).toHaveValue('simultaneous-v2');
    await expect(page.locator('#tournament-progress')).toHaveText(progressBeforeReimports);
    await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
    expect(await page.locator('#tournament-pairings').innerText()).toBe(pairingsBeforeReimports);
    await expect(page.locator('#tournament-autosave')).toBeDisabled();
    await expect(page.locator('#tournament-pairings li').last()
      .getByRole('button', { name: /Replay abspielen/ })).toBeEnabled();
    expect(await page.locator('#bot-a').getAttribute('style')).toBe(sandboxBefore);
  }

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

});
});
