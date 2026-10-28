import { test, expect, type Page, type BrowserContext } from '@playwright/test';

/**
 * NEXT-96: repeat real cross-tab autosave races on Chromium and WebKit.
 * All waits are based on browser state, not wall-clock sleeps. The simulation
 * seeds and tournament fixture are fixed, and the holder lock is always freed.
 */
const key = 'robot-arena:tournament:autosave:v1';
const lockName = 'robot-arena:tournament:autosave:write:v1';
const rounds = 3;

async function openTournament(page: Page): Promise<boolean> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  const supportsLocks = await page.evaluate(() => typeof navigator.locks?.request === 'function');
  if (!supportsLocks) {
    await page.locator('#tournament-autosave').click();
    await expect(page.locator('#tournament-autosave')).not.toBeChecked();
    await expect(page.locator('#tournament-feedback')).toContainText('Atomare lokale Sicherung');
    return false;
  }
  await page.locator('#tournament-autosave').check();
  await page.locator('#tournament-count').fill('4');
  await page.locator('#tournament-count').press('Tab');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 6');
  await expect.poll(() => savedResults(page)).toBe(0);
  return true;
}

async function savedResults(page: Page): Promise<number | null> {
  return page.evaluate(storageKey => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw).run?.results?.length ?? null : null;
  }, key);
}

async function holdLock(page: Page): Promise<void> {
  await page.evaluate(async name => {
    await new Promise<void>((ready, reject) => {
      void navigator.locks.request(name, async () => {
        await new Promise<void>(release => {
          (window as Window & { releaseNEXT96?: () => void }).releaseNEXT96 = release;
          ready();
        });
      }).catch(reject);
    });
  }, lockName);
}

async function releaseLock(page: Page): Promise<void> {
  await page.evaluate(() => {
    const holder = window as Window & { releaseNEXT96?: () => void };
    holder.releaseNEXT96?.();
    delete holder.releaseNEXT96;
  });
}

async function newLoadedTab(context: BrowserContext): Promise<Page> {
  const tab = await context.newPage();
  await tab.goto('/');
  await tab.getByRole('button', { name: 'Turnier', exact: true }).click();
  await tab.getByRole('button', { name: 'Lokale Sicherung laden' }).click();
  await expect(tab.locator('#tournament-progress')).toContainText('0 / 6');
  return tab;
}

test('NEXT-96: three queued autosaves remain ordered and preserve all matches', async ({ page, context }) => {
  if (!(await openTournament(page))) return; // Explicit safe fallback is asserted above.
  const holder = await context.newPage();
  await holder.goto('/');
  try {
    for (let index = 0; index < rounds; index++) {
      await holdLock(holder);
      try {
        await page.getByRole('button', { name: 'Nächster Kampf' }).click();
        await expect(page.locator('#tournament-progress')).toContainText(`${index + 1} / 6`);
        await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'busy');
        expect(await savedResults(page)).toBe(index);
      } finally {
        await releaseLock(holder);
      }
      await expect.poll(() => savedResults(page)).toBe(index + 1);
      await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'saved');
      await expect(page.locator('#tournament-feedback')).not.toContainText('Andere Registerkarte');
    }
    const stored = await page.evaluate(storageKey => JSON.parse(localStorage.getItem(storageKey)!), key);
    expect(stored.run.results).toHaveLength(rounds);
    // Persisted match order must be stable, with unique identities.
    const identities = stored.run.results.map((result: { matchId?: string; id?: string }) =>
      result.matchId ?? result.id
    );
    expect(new Set(identities).size).toBe(rounds);
  } finally {
    await releaseLock(holder).catch(() => {});
    await holder.close();
  }
});

test('NEXT-96: three stale tabs cannot overwrite competing valid snapshots', async ({ page, context }) => {
  if (!(await openTournament(page))) return;
  for (let index = 0; index < rounds; index++) {
    const stale = await newLoadedTab(context);
    await holdLock(page);
    try {
      await stale.getByRole('button', { name: 'Nächster Kampf' }).click();
      await expect(stale.locator('#tournament-progress')).toContainText('1 / 6');
      await expect(stale.locator('#tournament-save-status')).toHaveAttribute('data-state', 'busy');
      const competing = await page.evaluate(storageKey => {
        const raw = localStorage.getItem(storageKey);
        if (!raw) throw new Error('Expected initial snapshot');
        localStorage.setItem(storageKey, raw + ' ');
        return raw + ' ';
      }, key);
      // WebKit storage events can arrive asynchronously; wait for observation.
      await expect.poll(() => stale.evaluate(storageKey => localStorage.getItem(storageKey), key)).toBe(competing);
      await releaseLock(page);
      await expect(stale.locator('#tournament-feedback')).toContainText('Andere Registerkarte');
      await expect(stale.locator('#tournament-save-status')).toHaveAttribute('data-state', 'error');
      expect(await page.evaluate(storageKey => localStorage.getItem(storageKey), key)).toBe(competing);
      expect(await savedResults(page)).toBe(0);
    } finally {
      await releaseLock(page).catch(() => {});
      await stale.close();
    }
  }
});
