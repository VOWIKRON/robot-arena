import type { Page } from '@playwright/test';

/** Test-only deterministic interval driver: no browser fake-clock coalescing. */
type IntervalDriver = { pending: () => number[]; fire: () => boolean };
declare global {
  interface Window { __robotArenaIntervals?: IntervalDriver }
}

export async function installManualIntervals(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const active = new Map<number, { callback: (...args: unknown[]) => void; delay: number; args: unknown[] }>();
    let nextId = 100000;
    window.setInterval = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
      if (typeof handler !== 'function') throw new TypeError('Test driver requires a function callback');
      const id = nextId++;
      active.set(id, { callback: handler as (...args: unknown[]) => void, delay: Number(timeout) || 0, args });
      return id;
    }) as typeof window.setInterval;
    window.clearInterval = ((id?: number) => {
      if (id !== undefined) active.delete(Number(id));
    }) as typeof window.clearInterval;
    window.__robotArenaIntervals = {
      pending: () => [...active.values()].map(entry => entry.delay),
      fire: () => {
        const next = active.values().next();
        if (next.done) return false;
        next.value.callback(...next.value.args);
        return true;
      }
    };
  });
}

export function pendingIntervals(page: Page): Promise<number[]> {
  return page.evaluate(() => window.__robotArenaIntervals?.pending() ?? []);
}

export function fireInterval(page: Page): Promise<boolean> {
  return page.evaluate(() => window.__robotArenaIntervals?.fire() ?? false);
}
