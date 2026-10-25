import { expect, test } from '@playwright/test';

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
    await expect(dialog.locator('#tournament-count')).toBeVisible();
    await expect(dialog.locator('#tournament-run')).toBeVisible();
    await dialog.locator('#tournament-create').click();
    await expect(dialog.locator('#tournament-progress')).toContainText('0 / 1');
    await dialog.locator('#tournament-run').click();
    await expect(dialog.locator('#tournament-progress')).toContainText('1 / 1');
    await expect(dialog.locator('#tournament-table tbody tr')).toHaveCount(2);
    await expect(dialog.locator('.tournament-advanced')).toHaveAttribute('open', '');
    await expect(dialog.locator('#tournament-import')).toBeVisible();
    await expect(dialog.locator('#tournament-autosave')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await dialog.locator('#close-tournament').click();
  }
});
