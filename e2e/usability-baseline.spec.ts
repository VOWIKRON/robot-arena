import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('NEXT-79a: first-time sandbox journey is reachable at phone, tablet and desktop widths', async ({ page }) => {
  await page.goto('/');
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await expect(page.getByRole('heading', { name: 'Robot Arena' })).toBeVisible();
    for (const label of ['Start', 'Pause', '1 Tick', 'Reset', 'Konfiguration', 'Replay', 'Turnier']) {
      await expect(page.getByRole('button', { name: label, exact: true }).first()).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `No horizontal document scrolling at ${width}px`).toBe(true);
  }

  const config = page.getByRole('button', { name: 'Konfiguration', exact: true });
  await config.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#config-dialog')).toBeVisible();
  await expect(page.locator('#chassis-a')).toBeVisible();
  await expect(page.locator('#chassis-b')).toBeVisible();
  await page.getByRole('button', { name: 'Konfiguration schließen' }).click();
  await expect(config).toBeFocused();

  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await expect(page.locator('#stats')).toContainText(/Tick: [1-9]\d*/);
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  const stopped = await page.locator('#stats').getByText(/Tick:/).innerText();
  await page.waitForTimeout(160);
  await expect(page.locator('#stats').getByText(/Tick:/)).toHaveText(stopped);
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.getByText('Tick: 0')).toBeVisible();
});

test('NEXT-79a: tournament creation to result is operable by keyboard without changing sandbox', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  const sandboxBefore = await page.locator('#status').innerText();
  const open = page.getByRole('button', { name: 'Turnier', exact: true });
  await open.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#tournament-dialog')).toBeVisible();
  await expect(page.locator('#tournament-count')).toBeFocused();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
  await expect(page.locator('#tournament-pairings li')).toHaveCount(1);
  await expect(page.locator('#tournament-table tbody tr')).toHaveCount(2);
  await page.getByRole('button', { name: 'Turnier schließen' }).click();
  await expect(open).toBeFocused();
  await expect(page.locator('#status')).toHaveText(sandboxBefore);
});

test('NEXT-79b: combat controls and tools are grouped and fight phase is explicit', async ({ page }) => {
  await page.goto('/');
  const combat = page.getByRole('group', { name: 'Kampfsteuerung' });
  const tools = page.getByRole('group', { name: 'Werkzeuge' });
  await expect(combat).toBeVisible();
  await expect(tools).toBeVisible();
  for (const id of ['start', 'pause', 'step', 'reset']) {
    await expect(combat.locator('#' + id)).toBeVisible();
  }
  for (const id of ['open-config', 'open-replay', 'open-tournament']) {
    await expect(tools.locator('#' + id)).toBeVisible();
  }
  await expect(page.locator('#status')).toHaveText('Kampfbereit');
  await page.locator('#start').click();
  await expect(page.locator('#status')).toHaveText('Kampf läuft');
  await page.locator('#pause').click();
  await expect(page.locator('#status')).toHaveText('Kampf pausiert');
  await page.locator('#reset').click();
  await expect(page.locator('#status')).toHaveText('Kampfbereit');
  await page.setViewportSize({ width: 375, height: 780 });
  await expect(combat).toBeVisible();
  await expect(tools).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});


test('NEXT-79c: tournament has navigable setup, play and results sections on mobile and desktop', async ({ page }) => {
  await page.goto('/');
  let completedPriorRun = false;
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await page.locator('#open-tournament').click();
    const dialog = page.locator('#tournament-dialog');
    for (const [id, heading] of [
      ['tournament-setup', '1 · Einrichten'],
      ['tournament-play', '2 · Spielen'],
      ['tournament-results', '3 · Ergebnisse']
    ]) {
      await expect(dialog.locator('#' + id)).toBeVisible();
      await expect(dialog.locator('#' + id).getByRole('heading', { name: heading })).toBeVisible();
      const link = dialog.getByRole('navigation', { name: 'Turnierschritte' }).getByRole('link', { name: heading });
      await link.focus();
      await page.keyboard.press('Enter');
      await expect(link).toHaveAttribute('href', '#' + id);
    }
    await expect(dialog.locator('#tournament-run')).toBeDisabled();
    await expect(dialog.locator('#tournament-pause')).toBeDisabled();
    // Reopening a completed tournament retains its exportable results.
    if (completedPriorRun) await expect(dialog.locator('#tournament-export')).toBeEnabled();
    else await expect(dialog.locator('#tournament-export')).toBeDisabled();
    await expect(dialog.locator('#tournament-count')).toBeVisible();
    await expect(dialog.locator('#tournament-run')).toBeVisible();
    await dialog.locator('#tournament-create').click();
    await expect(dialog.locator('#tournament-progress')).toContainText('0 / 1');
    await expect(dialog.locator('#tournament-run')).toBeEnabled();
    await expect(dialog.locator('#tournament-pause')).toBeEnabled();
    await expect(dialog.locator('#tournament-resume')).toBeDisabled();
    // Pause is a real state boundary: no alternate start action may silently resume it.
    await dialog.locator('#tournament-pause').click();
    await expect(dialog.locator('#tournament-progress')).toContainText('paused');
    await expect(dialog.locator('#tournament-run')).toBeDisabled();
    await expect(dialog.locator('#tournament-auto')).toBeDisabled();
    await expect(dialog.locator('#tournament-resume')).toBeEnabled();
    await dialog.locator('#tournament-resume').click();
    await expect(dialog.locator('#tournament-run')).toBeEnabled();

    await dialog.locator('#tournament-run').click();
    await expect(dialog.locator('#tournament-progress')).toContainText('1 / 1');
    await expect(dialog.locator('#tournament-run')).toBeDisabled();
    await expect(dialog.locator('#tournament-export')).toBeEnabled();

    await expect(dialog.locator('#tournament-table tbody tr')).toHaveCount(2);
    await expect(dialog.locator('.tournament-advanced')).toHaveAttribute('open', '');
    await expect(dialog.locator('#tournament-import')).toBeVisible();
    await expect(dialog.locator('#tournament-autosave')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await dialog.locator('#close-tournament').click();
    completedPriorRun = true;
  }
});

test('NEXT-79c: editing setup cannot overwrite an active tournament; cancellation permits restart', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');

  // Invalid edits must not discard the valid run or its result controls.
  await page.locator('#tournament-seed').fill('-1');
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-feedback')).toContainText('Turnier ungültig');
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
  await expect(page.locator('#tournament-run')).toBeEnabled();

  // A different valid definition must not silently replace a running/ready plan.
  await page.locator('#tournament-seed').fill('12345');
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-feedback')).toContainText('Bitte zuerst abbrechen');
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
  await expect(page.locator('#tournament-run')).toBeEnabled();

  await page.locator('#tournament-cancel').click();
  await expect(page.locator('#tournament-progress')).toContainText('cancelled');
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
  await expect(page.locator('#tournament-feedback')).toContainText('Spielplan mit 2 Teilnehmern');
  await page.locator('#tournament-run').click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
});

test('NEXT-79d: contextual guidance is readable, linked to inputs and usable on mobile', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  for (const side of ['a', 'b']) {
    await expect(page.locator(`#strategy-${side}`)).toHaveAttribute('aria-describedby', `strategy-help-${side}`);
    await expect(page.locator(`#strategy-help-${side}`)).toContainText('Strategie');
    await expect(page.locator(`#reserve-${side}`)).toHaveAttribute('aria-describedby', `reserve-help-${side}`);
    await expect(page.locator(`#reserve-help-${side}`)).toContainText('zurückgehalten');
  }
  await page.getByRole('button', { name: 'Konfiguration schließen' }).click();
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  for (const [input, help, expected] of [
    ['tournament-seed', 'tournament-seed-help', 'Startwert'],
    ['tournament-ticks', 'tournament-ticks-help', 'Simulationsschritt'],
    ['tournament-format', 'tournament-format-help', 'K.-o.']
  ]) {
    await expect(page.locator('#' + input)).toHaveAttribute('aria-describedby', help);
    await expect(page.locator('#' + help)).toContainText(expected);
  }
  await expect(page.locator('#tournament-results .field-help')).toContainText('Reststruktur');
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await expect(page.locator('#tournament-seed-help')).toBeVisible();
    const nav = page.getByRole('navigation', { name: 'Turnierschritte' });
    for (const link of await nav.getByRole('link').all()) {
      const size = await link.boundingBox();
      expect(size?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('NEXT-79c: editing a paused automatic tournament preserves explicit resume (valid and invalid drafts)', async ({ page }) => {
  for (const seedEdit of ['-1', '12345']) {
    await page.goto('/');
    await page.locator('#open-tournament').click();
    await page.locator('#tournament-count').fill('3');
    await page.locator('#tournament-count').dispatchEvent('change');
    await page.locator('#tournament-ticks').fill('1');
    await page.locator('#tournament-create').click();
    await expect(page.locator('#tournament-progress')).toContainText('0 / 3');

    // Keep all actions in the same browser task so the 0ms auto timer
    // cannot finish the tiny tournament before the user pauses it.
    const snapshot = await page.evaluate((newSeed) => {
      const button = (id: string) => document.getElementById(id) as HTMLButtonElement;
      button('tournament-auto').click();
      button('tournament-pause').click();
      const paused = document.getElementById('tournament-progress')?.textContent ?? '';
      (document.getElementById('tournament-seed') as HTMLInputElement).value = newSeed;
      button('tournament-create').click();
      const feedback = document.getElementById('tournament-feedback')?.textContent ?? '';
      // Even rebuilding the editable participant form must not clear auto-play intent.
      (document.getElementById('tournament-count') as HTMLInputElement)
        .dispatchEvent(new Event('change', { bubbles: true }));
      const afterEdit = document.getElementById('tournament-progress')?.textContent ?? '';
      button('tournament-resume').click();
      return { paused, feedback, afterEdit };
    }, seedEdit);

    expect(snapshot.paused).toContain('paused');
    expect(snapshot.feedback).toContain(seedEdit === '-1' ? 'Turnier ungültig' : 'Bitte zuerst abbrechen');
    expect(snapshot.afterEdit).toContain('0 / 3');
    await expect(page.locator('#tournament-progress')).toContainText('3 / 3', { timeout: 15000 });
    await expect(page.locator('#tournament-table tbody tr')).toHaveCount(3);
  }
});


test('NEXT-79d: invalid tournament inputs give actionable errors before plan creation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-seed').fill('-1');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-feedback')).toContainText('Turnier-Startwert: Bitte eine ganze Zahl');
  await page.locator('#tournament-seed').fill('4711');
  await page.locator('#tournament-ticks').fill('0');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-feedback')).toContainText('Ticklimit: Bitte eine ganze Zahl');
  await page.locator('#tournament-ticks').fill('3600');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
});


test('NEXT-79c: invalid draft never replaces a prepared tournament', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
  await page.locator('#tournament-seed').fill('-1');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-feedback')).toContainText('Turnier-Startwert: Bitte eine ganze Zahl');
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
});


test('NEXT-79d: invalid seed, ticklimit and participant names focus their fields accessibly', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  const create = page.getByRole('button', { name: 'Spielplan erstellen' });
  const seed = page.locator('#tournament-seed');
  const ticks = page.locator('#tournament-ticks');
  const first = page.locator('#tournament-name-1');
  const second = page.locator('#tournament-name-2');

  await seed.fill('-1');
  await create.click();
  await expect(seed).toBeFocused();
  await expect(seed).toHaveAttribute('aria-invalid', 'true');
  await expect(seed).toHaveAttribute('aria-describedby', /tournament-feedback/);
  await expect(page.locator('#tournament-feedback')).toContainText('Turnier-Startwert');
  await seed.fill('4711');
  await expect(seed).not.toHaveAttribute('aria-invalid', 'true');
  await expect(seed).toHaveAttribute('aria-describedby', 'tournament-seed-help');
  await expect(page.locator('#tournament-feedback')).toContainText('Eingabe geändert. Bitte Spielplan erstellen');

  await ticks.fill('0');
  await create.click();
  await expect(ticks).toBeFocused();
  await expect(ticks).toHaveAttribute('aria-invalid', 'true');
  await ticks.fill('1');

  await first.fill(' ');
  await create.click();
  await expect(first).toBeFocused();
  await expect(first).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#tournament-feedback')).toContainText('Teilnehmername fehlt');
  await first.fill('Raptor');
  await second.fill('RAPTOR');
  await create.click();
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#tournament-feedback')).toContainText('Teilnehmernamen doppelt');

  await second.fill('Titan');
  await create.click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
});


test('NEXT-79c: invalid restore and invalid import preserve paused auto-play intent', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-count').fill('3');
  await page.locator('#tournament-count').dispatchEvent('change');
  await page.locator('#tournament-ticks').fill('1');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 3');

  await page.evaluate(() => {
    (document.getElementById('tournament-auto') as HTMLButtonElement).click();
    (document.getElementById('tournament-pause') as HTMLButtonElement).click();
  });
  await expect(page.locator('#tournament-progress')).toContainText('paused');

  await page.getByRole('button', { name: 'Lokale Sicherung laden' }).click();
  await expect(page.locator('#tournament-feedback')).toContainText('Keine lokale Turniersicherung');
  await expect(page.locator('#tournament-progress')).toContainText('0 / 3');

  await page.locator('#tournament-file').setInputFiles({
    name: 'invalid-tournament.json', mimeType: 'application/json', buffer: Buffer.from('{invalid')
  });
  await expect(page.locator('#tournament-feedback')).toContainText(/JSON|Syntax|Unexpected|Expected/i);
  await expect(page.locator('#tournament-progress')).toContainText('0 / 3');

  await page.getByRole('button', { name: 'Fortsetzen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('3 / 3', { timeout: 15000 });
});


test('NEXT-79c: local restore recovers the actual robot presets, not stale editor selections', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-preset-1').selectOption('titan');
  await page.locator('#tournament-preset-2').selectOption('raptor');
  await page.locator('#tournament-autosave').check();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');

  await page.locator('#tournament-preset-1').selectOption('raptor');
  await page.locator('#tournament-preset-2').selectOption('titan');
  await page.getByRole('button', { name: 'Lokale Sicherung laden' }).click();
  await expect(page.locator('#tournament-feedback')).toContainText('geprüft und geladen');
  await expect(page.locator('#tournament-preset-1')).toHaveValue('titan');
  await expect(page.locator('#tournament-preset-2')).toHaveValue('raptor');
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
});


test('NEXT-79c: closing an automatic tournament pauses it until explicit resume', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-count').fill('3');
  await page.locator('#tournament-count').dispatchEvent('change');
  await page.locator('#tournament-ticks').fill('1');
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 3');
  // Both actions happen in the same browser task, before the zero-delay auto timer.
  await page.evaluate(() => {
    (document.getElementById('tournament-auto') as HTMLButtonElement).click();
    (document.getElementById('close-tournament') as HTMLButtonElement).click();
  });
  await expect(page.locator('#tournament-dialog')).not.toBeVisible();
  await page.locator('#open-tournament').click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 3');
  await expect(page.locator('#tournament-progress')).toContainText('paused');
  await expect(page.locator('#tournament-run')).toBeDisabled();
  await expect(page.locator('#tournament-auto')).toBeDisabled();
  await page.locator('#tournament-resume').click();
  await expect(page.locator('#tournament-progress')).toContainText('3 / 3', { timeout: 15000 });
});

test('NEXT-79d: invalid participant count retains draft names and accessible error focus', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-count').fill('3');
  await page.locator('#tournament-count').dispatchEvent('change');
  await page.locator('#tournament-name-1').fill('Alpha');
  await page.locator('#tournament-name-2').fill('Beta');
  await page.locator('#tournament-name-3').fill('Gamma');
  await page.locator('#tournament-count').fill('99');
  await page.locator('#tournament-count').dispatchEvent('change');
  await expect(page.locator('#tournament-count')).toBeFocused();
  await expect(page.locator('#tournament-count')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#tournament-feedback')).toContainText('Teilnehmerzahl muss zwischen 2 und 16');
  await expect(page.locator('#tournament-name-1')).toHaveValue('Alpha');
  await expect(page.locator('#tournament-name-2')).toHaveValue('Beta');
  await expect(page.locator('#tournament-name-3')).toHaveValue('Gamma');
  await page.locator('#tournament-count').fill('3');
  await page.locator('#tournament-count').dispatchEvent('change');
  await expect(page.locator('#tournament-name-3')).toHaveValue('Gamma');
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 3');
});


test('NEXT-79c: Escape cancel event suspends queued auto-play before close', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-count').fill('3');
  await page.locator('#tournament-count').dispatchEvent('change');
  await page.locator('#tournament-ticks').fill('1');
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 3');

  // Model the native Escape event sequence in one browser task to catch a
  // timer race: cancel must suspend immediately, not only after close.
  const beforeClose = await page.evaluate(() => {
    const dialog = document.getElementById('tournament-dialog') as HTMLDialogElement;
    (document.getElementById('tournament-auto') as HTMLButtonElement).click();
    dialog.dispatchEvent(new Event('cancel', { bubbles: false, cancelable: true }));
    const before = document.getElementById('tournament-progress')?.textContent ?? '';
    dialog.close();
    return before;
  });
  expect(beforeClose).toContain('paused');
  expect(beforeClose).toContain('0 / 3');
  await expect(page.locator('#tournament-dialog')).not.toBeVisible();
  await page.waitForTimeout(80);
  await page.locator('#open-tournament').click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 3');
  await expect(page.locator('#tournament-resume')).toBeEnabled();
  await page.locator('#tournament-resume').click();
  await expect(page.locator('#tournament-progress')).toContainText('3 / 3', { timeout: 15000 });
});


test('NEXT-79e: in-progress autosave restores paused after reload and can be cleared', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-count').fill('3');
  await page.locator('#tournament-count').dispatchEvent('change');
  await page.locator('#tournament-ticks').fill('1');
  await page.locator('#tournament-autosave').check();
  await page.locator('#tournament-create').click();
  await page.locator('#tournament-run').click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 3');
  await expect(page.locator('#tournament-progress')).toContainText('running');

  await page.reload();
  await page.locator('#open-tournament').click();
  await expect(page.locator('#tournament-autosave')).toBeChecked();
  await page.locator('#tournament-restore').click();
  await expect(page.locator('#tournament-feedback')).toContainText('geprüft und geladen');
  await expect(page.locator('#tournament-progress')).toContainText('1 / 3');
  await expect(page.locator('#tournament-progress')).toContainText('paused');
  await expect(page.locator('#tournament-run')).toBeDisabled();
  await expect(page.locator('#tournament-resume')).toBeEnabled();
  await page.locator('#tournament-resume').click();
  await page.locator('#tournament-run').click();
  await page.locator('#tournament-run').click();
  await expect(page.locator('#tournament-progress')).toContainText('3 / 3');
  await page.locator('#tournament-clear-saved').click();
  await expect(page.locator('#tournament-autosave')).not.toBeChecked();
  await page.reload();
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-restore').click();
  await expect(page.locator('#tournament-feedback')).toContainText('Keine lokale Turniersicherung');
});

test('NEXT-79e: tournament JSON export and import require explicit resume for running snapshots', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-count').fill('3');
  await page.locator('#tournament-count').dispatchEvent('change');
  await page.locator('#tournament-ticks').fill('1');
  await page.locator('#tournament-create').click();
  await page.locator('#tournament-run').click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 3');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#tournament-export').click()
  ]);
  const archive = await readFile(await download.path());
  const document = JSON.parse(archive.toString('utf8')) as { run: { status: string; results: unknown[] } };
  expect(document.run.status).toBe('running');
  expect(document.run.results).toHaveLength(1);
  await page.locator('#tournament-cancel').click();
  await expect(page.locator('#tournament-progress')).toContainText('cancelled');
  await page.locator('#tournament-file').setInputFiles({
    name: 'saved-tournament.json', mimeType: 'application/json', buffer: archive
  });
  await expect(page.locator('#tournament-progress')).toContainText('1 / 3');
  await expect(page.locator('#tournament-progress')).toContainText('paused');
  await expect(page.locator('#tournament-run')).toBeDisabled();
  await page.locator('#tournament-resume').click();
  await page.locator('#tournament-run').click();
  await page.locator('#tournament-run').click();
  await expect(page.locator('#tournament-progress')).toContainText('3 / 3');
  await expect(page.locator('#tournament-table tbody tr')).toHaveCount(3);
});

test('NEXT-79e: tournament accessibility and responsive results at 375, 768 and 1280px', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-create').click();
  await page.locator('#tournament-run').click();
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await expect(page.locator('#tournament-dialog')).toBeVisible();
    await expect(page.locator('#tournament-progress')).toHaveAttribute('role', 'status');
    await expect(page.locator('#tournament-progress')).toHaveAttribute('aria-live', 'polite');
    await expect(page.locator('#tournament-feedback')).toHaveAttribute('role', 'status');
    await expect(page.locator('#tournament-table-scroll')).toHaveAttribute('role', 'region');
    await expect(page.locator('#tournament-table-scroll')).toHaveAttribute('aria-label', 'Turniertabelle, horizontal scrollbar');
    await expect(page.locator('#tournament-export')).toBeEnabled();
    await expect(page.locator('#tournament-run')).toBeDisabled();
    const links = page.getByRole('navigation', { name: 'Turnierschritte' }).getByRole('link');
    for (const link of await links.all()) {
      const rect = await link.boundingBox();
      expect(rect?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const table = page.locator('#tournament-table-scroll');
    await table.focus();
    await expect(table).toBeFocused();
    if (width === 375) {
      expect(await table.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
    }
  }
  await page.locator('#close-tournament').click();
  await expect(page.locator('#open-tournament')).toBeFocused();
});
