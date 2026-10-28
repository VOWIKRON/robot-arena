import { test, expect } from '@playwright/test';

test('NEXT-77: quota error is visible while the tournament remains playable', async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key: string, value: string) {
      if (key === 'robot-arena:tournament:autosave:v1') throw new DOMException('Quota exceeded', 'QuotaExceededError');
      return original.call(this, key, value);
    };
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await page.locator('#tournament-autosave').check();
  await expect(page.locator('#tournament-feedback')).toContainText('Speicherplatz voll');
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
  await expect(page.locator('#tournament-feedback')).toContainText('Speicherplatz voll');
});

test('NEXT-77: stale second tab cannot overwrite the first tab\'s autosave', async ({ context, page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-autosave').check();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  const other = await context.newPage();
  await other.goto('/');
  await other.getByRole('button', { name: 'Turnier', exact: true }).click();
  await other.getByRole('button', { name: 'Lokale Sicherung laden' }).click();
  await expect(other.locator('#tournament-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(other.locator('#tournament-feedback')).toContainText('Andere Registerkarte');
  const saved = await page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'));
  await other.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(other.locator('#tournament-feedback')).toContainText('Andere Registerkarte');
  expect(await other.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'))).toBe(saved);
  await other.getByRole('button', { name: 'Lokale Sicherung laden' }).click();
  await expect(other.locator('#tournament-progress')).toContainText('1 / 1');
});

test('NEXT-77: browser download failure is reported without changing the run', async ({ page }) => {
  await page.addInitScript(() => {
    URL.createObjectURL = () => { throw new Error('Simulierter Downloadfehler'); };
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  const before = await page.locator('#tournament-progress').innerText();
  await page.getByRole('button', { name: 'Speichern' }).click();
  await expect(page.locator('#tournament-feedback')).toContainText('Download konnte nicht gestartet werden');
  await expect(page.locator('#tournament-progress')).toHaveText(before);
  await page.getByRole('button', { name: 'Tabelle CSV' }).click();
  await expect(page.locator('#tournament-feedback')).toContainText('Download konnte nicht gestartet werden');
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
});

test('NEXT-77: explicit opt-out survives reload and deletes the local snapshot', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-autosave').check();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'))).not.toBeNull();
  await page.locator('#tournament-autosave').uncheck();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave-enabled:v1'))).toBeNull();
  await page.reload();
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await expect(page.locator('#tournament-autosave')).not.toBeChecked();
  expect(await page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'))).toBeNull();
});

test('NEXT-80: browsers without Web Locks cannot silently write an unsafe autosave', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'locks', { configurable: true, value: undefined });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  // click(), not check(): the UI correctly rolls the checkbox back immediately.
  await page.locator('#tournament-autosave').click();
  await expect(page.locator('#tournament-feedback')).toContainText('Atomare lokale Sicherung');
  await expect(page.locator('#tournament-autosave')).not.toBeChecked();
  expect(await page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave-enabled:v1'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'))).toBeNull();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
});


test('NEXT-95: saving is visibly pending while another tab holds the origin-wide Web Lock', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-autosave').check();
  await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'saved');
  await page.evaluate(async () => {
    await new Promise<void>((ready, reject) => {
      void navigator.locks.request('robot-arena:tournament:autosave:write:v1', async () => {
        await new Promise<void>(release => {
          (window as Window & { releaseNEXT95Lock?: () => void }).releaseNEXT95Lock = release;
          ready();
        });
      }).catch(reject);
    });
  });
  try {
    await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
    await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
    await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'busy');
    await expect(page.locator('#tournament-save-status')).toContainText('Sicherung läuft');
    expect(await page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'))).toBeNull();
  } finally {
    await page.evaluate(() => {
      (window as Window & { releaseNEXT95Lock?: () => void }).releaseNEXT95Lock?.();
    });
  }
  await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'saved');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'))).not.toBeNull();
});

test('NEXT-95: blocked Web Locks show persistent autosave error without hiding manual export', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'locks', { configurable: true, value: undefined });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-autosave').click();
  await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'error');
  await expect(page.locator('#tournament-save-status')).toContainText('fehlgeschlagen');
  await expect(page.locator('#tournament-feedback')).toContainText('Atomare lokale Sicherung');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Speichern' }).click();
  expect((await downloadPromise).suggestedFilename()).toBe('robot-arena-turnier.json');
});

test('NEXT-95: quota failure remains visible while tournament advances in memory', async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key: string, value: string) {
      if (key === 'robot-arena:tournament:autosave:v1') throw new DOMException('Quota exceeded', 'QuotaExceededError');
      return original.call(this, key, value);
    };
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await page.locator('#tournament-autosave').check();
  await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'error');
  await expect(page.locator('#tournament-feedback')).toContainText('Speicherplatz voll');
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
  await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'error');
});
