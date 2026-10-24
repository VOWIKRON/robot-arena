import { expect, test } from '@playwright/test';

test('NEXT-47 replays imported/current events with step pause reset without mutating live match', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  const statusBefore = await page.locator('#status').innerText();
  const energyBefore = await page.getByRole('progressbar', { name: 'Energie Roboter A' }).getAttribute('aria-valuenow');
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await page.getByRole('button', { name: 'Aktuellen Kampf laden' }).click();
  await expect(page.locator('#replay-progress')).toContainText('Replay Tick 0 / 2');
  await page.getByRole('button', { name: 'Replay-Schritt' }).click();
  await expect(page.locator('#replay-progress')).toContainText('Replay Tick 1 / 2');
  await page.getByRole('button', { name: 'Pausieren' }).isDisabled();
  await page.getByRole('button', { name: 'Abspielen' }).click();
  await expect(page.locator('#replay-progress')).toContainText('Replay Tick 2 / 2 · Ende');
  await expect(page.getByRole('button', { name: 'Abspielen' })).toBeDisabled();
  await page.getByRole('button', { name: 'Replay-Anfang' }).click();
  await expect(page.locator('#replay-progress')).toContainText('Replay Tick 0 / 2');
  await page.getByRole('button', { name: 'Schließen' }).click();
  expect(await page.locator('#status').innerText()).toBe(statusBefore);
  expect(await page.getByRole('progressbar', { name: 'Energie Roboter A' }).getAttribute('aria-valuenow')).toBe(energyBefore);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
