import { test, expect, type Page } from '@playwright/test';

/**
 * NEXT-99: maximum-size real-browser multi-tab stress, not just a simulated
 * unit test. All synchronization observes committed storage or UI state;
 * elapsed time and heap samples are diagnostics, never flaky pass thresholds.
 */
const key = 'robot-arena:tournament:autosave:v1';

type StoredRun = {
  run: { status: string; results: Array<{ matchId?: string; id?: string }> };
};

async function snapshot(page: Page): Promise<StoredRun | null> {
  return page.evaluate(storageKey => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) as StoredRun : null;
  }, key);
}

async function completed(page: Page): Promise<number | null> {
  const saved = await snapshot(page);
  return saved?.run.results.length ?? null;
}

test('NEXT-99: two tabs cannot lose or overwrite a completed 16-robot / 120-match autosave', async ({ page, context }, testInfo) => {
  const start = Date.now();
  await page.goto('/');
  const originalSandbox = await page.locator('#bot-a').getAttribute('style');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  expect(await page.evaluate(() => typeof navigator.locks?.request === 'function')).toBe(true);
  await page.locator('#tournament-autosave').check();
  await page.locator('#tournament-count').fill('16');
  await page.locator('#tournament-count').press('Tab');
  await page.locator('#tournament-ticks').fill('1');
  await page.locator('#tournament-seed').fill('4711');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
  await expect(page.locator('#tournament-progress')).toContainText('0 / 120');
  await expect.poll(() => completed(page)).toBe(0);

  // Tab B reads the original valid revision before tab A finishes the stress run.
  const stale = await context.newPage();
  try {
    await stale.goto('/');
    await stale.getByRole('button', { name: 'Turnier', exact: true }).click();
    await stale.getByRole('button', { name: 'Lokale Sicherung laden' }).click();
    await expect(stale.locator('#tournament-progress')).toContainText('0 / 120');

    await page.getByRole('button', { name: 'Alle Kämpfe spielen' }).click();
    await expect(page.locator('#tournament-progress')).toContainText('120 / 120', { timeout: 40_000 });
    await expect(page.locator('#tournament-progress')).toContainText('completed');
    await expect.poll(() => completed(page), { timeout: 40_000 }).toBe(120);
    await expect(page.locator('#tournament-save-status')).toHaveAttribute('data-state', 'saved');

    const committed = await snapshot(page);
    expect(committed).not.toBeNull();
    expect(committed!.run.status).toBe('completed');
    expect(committed!.run.results).toHaveLength(120);
    const ids = committed!.run.results.map(row => row.matchId ?? row.id);
    expect(ids.every(id => typeof id === 'string' && id.length > 0)).toBe(true);
    expect(new Set(ids).size).toBe(120);
    const serialized = JSON.stringify(committed);
    const bytes = new TextEncoder().encode(serialized).length;
    expect(bytes).toBeGreaterThan(0);
    expect(bytes).toBeLessThan(2 * 1024 * 1024);

    // The stale tab attempts to commit its 1/120 revision after 120/120 was
    // saved. Optimistic concurrency must reject it, never roll back the winner.
    await stale.getByRole('button', { name: 'Nächster Kampf' }).click();
    await expect(stale.locator('#tournament-progress')).toContainText('1 / 120');
    await expect(stale.locator('#tournament-save-status')).toHaveAttribute('data-state', 'error');
    await expect(stale.locator('#tournament-feedback')).toContainText('Andere Registerkarte');
    expect(JSON.stringify(await snapshot(stale))).toBe(serialized);

    // A fresh load in the stale tab must recover the COMPLETE valid snapshot.
    await stale.reload();
    await stale.getByRole('button', { name: 'Turnier', exact: true }).click();
    await stale.getByRole('button', { name: 'Lokale Sicherung laden' }).click();
    await expect(stale.locator('#tournament-progress')).toContainText('120 / 120');
    await expect(stale.locator('#tournament-progress')).toContainText('completed');
    expect(JSON.stringify(await snapshot(stale))).toBe(serialized);
    expect(await page.locator('#bot-a').getAttribute('style')).toBe(originalSandbox);

    const heap = await page.evaluate(() => {
      const p = performance as Performance & { memory?: { usedJSHeapSize: number } };
      return p.memory?.usedJSHeapSize ?? null;
    });
    await testInfo.attach('next99-multitab-120-diagnostics.json', {
      body: Buffer.from(JSON.stringify({
        participants: 16, matches: 120, maxTicks: 1, seed: 4711,
        persistedBytes: bytes, elapsedMs: Date.now() - start,
        usedJSHeapSize: heap, staleRevisionRejected: true, recoveredResults: 120
      }, null, 2)),
      contentType: 'application/json'
    });
  } finally {
    await stale.close();
  }
});
