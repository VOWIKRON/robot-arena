import { test, expect, type Page } from '@playwright/test';

/**
 * NEXT-98: reload/recovery at the exact moment an autosave waits for an
 * origin-wide Web Lock. Test real browser locks, not a mocked queue.
 * Every wait is state-based; no arbitrary sleeps or silent retries.
 */
const archiveKey = 'robot-arena:tournament:autosave:v1';
const lockName = 'robot-arena:tournament:autosave:write:v1';

async function savedCount(page: Page): Promise<number | null> {
  return page.evaluate(key => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw).run.results.length : null;
  }, archiveKey);
}

async function prepare(page: Page): Promise<boolean> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  if (!(await page.evaluate(() => typeof navigator.locks?.request === 'function'))) {
    await page.locator('#tournament-autosave').check();
    await expect(page.locator('#tournament-autosave')).not.toBeChecked();
    await expect(page.locator('#tournament-feedback')).toContainText('Atomare lokale Sicherung');
    return false;
  }
  await page.locator('#tournament-autosave').check();
  await page.locator('#tournament-count').fill('4');
  await page.locator('#tournament-count').press('Tab');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect.poll(() => savedCount(page)).toBe(0);
  await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'saved');
  return true;
}

async function hold(page: Page): Promise<void> {
  await page.evaluate(async name => {
    await new Promise<void>((ready, reject) => {
      void navigator.locks.request(name, async () => {
        await new Promise<void>(release => {
          (window as Window & { releaseNEXT98?: () => void }).releaseNEXT98 = release;
          ready();
        });
      }).catch(reject);
    });
  }, lockName);
}

async function release(page: Page): Promise<void> {
  await page.evaluate(() => {
    const owner = window as Window & { releaseNEXT98?: () => void };
    owner.releaseNEXT98?.();
    delete owner.releaseNEXT98;
  });
}

test('NEXT-98: reload during held Web Lock cannot commit an unfinished match', async ({ page, context }) => {
  if (!(await prepare(page))) return; // Missing Web Locks must fail closed.
  const holder = await context.newPage();
  await holder.goto('/');
  try {
    await hold(holder);
    await page.getByRole('button', { name: 'Nächster Kampf' }).click();
    await expect(page.locator('#tournament-progress')).toContainText('1 / 6');
    await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'busy');
    expect(await savedCount(page)).toBe(0);
    await page.reload(); // Pending request from the old document must be abandoned.
    await page.getByRole('button', { name: 'Turnier', exact: true }).click();
    await expect(page.locator('#tournament-autosave')).toBeChecked();
    expect(await savedCount(page)).toBe(0);
    await expect(page.locator('#tournament-save-status')).not.toHaveAttribute('data-state', 'saved');
    await release(holder);
    await expect.poll(() => savedCount(page)).toBe(0); // No ghost write after lock release.
    await page.getByRole('button', { name: 'Lokale Sicherung laden' }).click();
    await expect(page.locator('#tournament-progress')).toContainText('0 / 6');
    await page.getByRole('button', { name: 'Nächster Kampf' }).click();
    await expect.poll(() => savedCount(page)).toBe(1);
    await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'saved');
  } finally {
    await release(holder).catch(() => {});
    await holder.close();
  }
});

test('NEXT-98: competing valid revision while lock waits is preserved and recoverable after reload', async ({ page, context }) => {
  if (!(await prepare(page))) return;
  const stale = await context.newPage();
  await stale.goto('/');
  await stale.getByRole('button', { name: 'Turnier', exact: true }).click();
  await stale.getByRole('button', { name: 'Lokale Sicherung laden' }).click();
  await expect(stale.locator('#tournament-progress')).toContainText('0 / 6');
  try {
    await hold(page);
    await stale.getByRole('button', { name: 'Nächster Kampf' }).click();
    await expect(stale.locator('#tournament-save-status')).toHaveAttribute('data-state', 'busy');
    const competitor = await page.evaluate(key => {
      const original = localStorage.getItem(key);
      if (!original) throw new Error('Missing initial valid snapshot');
      const changed = original + ' '; // Valid JSON, distinct byte-level revision.
      localStorage.setItem(key, changed);
      return changed;
    }, archiveKey);
    await expect.poll(() => stale.evaluate(key => localStorage.getItem(key), archiveKey)).toBe(competitor);
    await release(page);
    await expect(stale.locator('#tournament-save-status')).toHaveAttribute('data-state', 'error');
    await expect(stale.locator('#tournament-feedback')).toContainText('Andere Registerkarte');
    expect(await stale.evaluate(key => localStorage.getItem(key), archiveKey)).toBe(competitor);
    await stale.reload();
    await stale.getByRole('button', { name: 'Turnier', exact: true }).click();
    await stale.getByRole('button', { name: 'Lokale Sicherung laden' }).click();
    await expect(stale.locator('#tournament-progress')).toContainText('0 / 6');
    await stale.getByRole('button', { name: 'Nächster Kampf' }).click();
    await expect.poll(() => savedCount(stale)).toBe(1);
  } finally {
    await release(page).catch(() => {});
    await stale.close();
  }
});

test('NEXT-98: quota failure retains playable in-memory run and previous recoverable snapshot', async ({ page }) => {
  if (!(await prepare(page))) return;
  await page.evaluate(key => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (name: string, value: string): void {
      if (name === key) throw new DOMException('Quota exceeded', 'QuotaExceededError');
      return original.call(this, name, value);
    };
  }, archiveKey);
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 6');
  await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'error');
  await expect(page.locator('#tournament-feedback')).toContainText('Speicherplatz voll');
  expect(await savedCount(page)).toBe(0);
  await page.reload();
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.getByRole('button', { name: 'Lokale Sicherung laden' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 6');
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect.poll(() => savedCount(page)).toBe(1);
});
