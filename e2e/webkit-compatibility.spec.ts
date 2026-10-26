import { test, expect } from '@playwright/test';

/**
 * NEXT-84: WebKit is the browser engine used by Safari, but Playwright's
 * emulated iPhone is NOT a substitute for manual testing on physical iOS.
 * These targeted checks run on Desktop Safari and iPhone 13 WebKit projects.
 */
test('NEXT-84: Safari WebKit tournament plan, deterministic progress and JSON roundtrip', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-count').fill('4');
  await page.locator('#tournament-count').press('Tab');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 6');
  await page.getByRole('button', { name: 'Nächster Kampf' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 6');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Speichern' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('robot-arena-turnier.json');
  await page.locator('#tournament-file').setInputFiles(await download.path() as string);
  await expect(page.locator('#tournament-progress')).toContainText('1 / 6');
  await expect(page.locator('#tournament-table tbody tr')).toHaveCount(4);
});

test('NEXT-84: WebKit Web Locks either serialize autosave or fail closed with manual export', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  const supportsLocks = await page.evaluate(() => typeof navigator.locks?.request === 'function');
  const toggle = page.locator('#tournament-autosave');
  if (supportsLocks) {
    await toggle.check();
    await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'))).not.toBeNull();
    await page.getByRole('button', { name: 'Nächster Kampf' }).click();
    await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
    await expect.poll(async () => {
      const raw = await page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'));
      return raw ? JSON.parse(raw).run?.results?.length : null;
    }).toBe(1);
  } else {
    await toggle.click();
    await expect(page.locator('#tournament-feedback')).toContainText('Atomare lokale Sicherung');
    await expect(toggle).not.toBeChecked();
    expect(await page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'))).toBeNull();
    await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Speichern' }).click();
    expect((await downloadPromise).suggestedFilename()).toBe('robot-arena-turnier.json');
  }
});

test('NEXT-84: iPhone-sized Safari dialog keeps controls usable and accessible', async ({ page, isMobile }) => {
  await page.setViewportSize({ width: 375, height: 780 });
  await page.goto('/');
  const open = page.getByRole('button', { name: 'Turnier', exact: true });
  if (isMobile) await open.tap();
  else await open.click();
  const dialog = page.getByRole('dialog', { name: 'Turnier planen' });
  await expect(dialog).toBeVisible();
  await expect(page.locator('#tournament-count')).toBeVisible();
  const targets = await page.locator('#tournament-dialog button:visible, #tournament-dialog input:visible, #tournament-dialog select:visible').evaluateAll(elements =>
    elements.map(el => ({ width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height }))
  );
  expect(targets.length).toBeGreaterThan(15);
  expect(targets.every(target => target.width >= 44 && target.height >= 44)).toBe(true);
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1');
  await page.getByRole('button', { name: 'Turnier schließen' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(open).toBeFocused();
});


/**
 * NEXT-94: a real origin-scoped Web Lock, not a mocked LockManager, must
 * serialize two independently running Safari/WebKit pages.
 * The holder is released in finally to prevent hanging the browser worker.
 */
async function holdAutosaveLock(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((ready, reject) => {
      void navigator.locks.request('robot-arena:tournament:autosave:write:v1', async () => {
        await new Promise<void>(release => {
          (window as Window & { releaseNEXT94Lock?: () => void }).releaseNEXT94Lock = release;
          ready();
        });
      }).catch(reject);
    });
  });
}

async function releaseAutosaveLock(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(() => {
    const holder = window as Window & { releaseNEXT94Lock?: () => void };
    holder.releaseNEXT94Lock?.();
    delete holder.releaseNEXT94Lock;
  });
}

async function openSavedTournamentInTwoTabs(page: import('@playwright/test').Page, context: import('@playwright/test').BrowserContext) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  const supported = await page.evaluate(() => typeof navigator.locks?.request === 'function');
  if (!supported) return { supported, other: null };
  await page.locator('#tournament-autosave').check();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect.poll(async () => {
    const raw = await page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'));
    return raw ? JSON.parse(raw).run?.results?.length : null;
  }).toBe(0);
  const other = await context.newPage();
  await other.goto('/');
  await other.getByRole('button', { name: 'Turnier', exact: true }).click();
  await other.getByRole('button', { name: 'Lokale Sicherung laden' }).click();
  await expect(other.locator('#tournament-progress')).toContainText('0 / 1');
  return { supported, other };
}

test('NEXT-94: Safari WebKit serializes a pending autosave across two tabs', async ({ page, context }) => {
  const { supported, other } = await openSavedTournamentInTwoTabs(page, context);
  if (!supported || !other) {
    await page.locator('#tournament-autosave').click();
    await expect(page.locator('#tournament-feedback')).toContainText('Atomare lokale Sicherung');
    return; // Explicitly verifies safe fallback on WebKit without Web Locks.
  }
  await holdAutosaveLock(page);
  try {
    await other.getByRole('button', { name: 'Nächster Kampf' }).click();
    await expect(other.locator('#tournament-progress')).toContainText('1 / 1');
    // The queued second tab must not write before the first tab releases its lock.
    const before = await page.evaluate(() => JSON.parse(localStorage.getItem('robot-arena:tournament:autosave:v1')!).run.results.length);
    expect(before).toBe(0);
    await releaseAutosaveLock(page);
    await expect.poll(async () => {
      const raw = await page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'));
      return raw ? JSON.parse(raw).run?.results?.length : null;
    }).toBe(1);
    await expect(other.locator('#tournament-feedback')).not.toContainText('Andere Registerkarte');
  } finally {
    await releaseAutosaveLock(page).catch(() => {});
    await other.close();
  }
});

test('NEXT-94: Safari WebKit rejects a stale tab after a competing locked write', async ({ page, context }) => {
  const { supported, other } = await openSavedTournamentInTwoTabs(page, context);
  if (!supported || !other) {
    await page.locator('#tournament-autosave').click();
    await expect(page.locator('#tournament-feedback')).toContainText('Atomare lokale Sicherung');
    return;
  }
  await holdAutosaveLock(page);
  try {
    await other.getByRole('button', { name: 'Nächster Kampf' }).click();
    await expect(other.locator('#tournament-progress')).toContainText('1 / 1');
    // A different but still valid JSON byte representation models a competing
    // writer without modifying the archived match or inventing engine results.
    const competingBytes = await page.evaluate(() => {
      const key = 'robot-arena:tournament:autosave:v1';
      const raw = localStorage.getItem(key);
      if (!raw) throw new Error('Expected initial tournament snapshot');
      localStorage.setItem(key, raw + ' ');
      return raw + ' ';
    });
    await releaseAutosaveLock(page);
    await expect(other.locator('#tournament-feedback')).toContainText('Andere Registerkarte');
    expect(await page.evaluate(() => localStorage.getItem('robot-arena:tournament:autosave:v1'))).toBe(competingBytes);
  } finally {
    await releaseAutosaveLock(page).catch(() => {});
    await other.close();
  }
});
