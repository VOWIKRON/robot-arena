import { expect, test } from '@playwright/test';

test('NEXT-55 tournament planner shows deterministic fixtures and table without mutating sandbox', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  const liveStatus = await page.locator('#status').innerText();
  const liveEnergy = await page.getByRole('progressbar', { name: 'Energie Roboter A' }).getAttribute('aria-valuenow');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Turnier planen' })).toBeVisible();
  await expect(page.locator('#tournament-count')).toBeFocused();
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-feedback')).toContainText('2 Teilnehmern und 1 Paarungen');
  await expect(page.locator('#tournament-pairings li')).toHaveCount(1);
  await expect(page.locator('#tournament-table tbody tr')).toHaveCount(2);
  await expect(page.locator('#tournament-progress')).toContainText('0 / 1 Kämpfe abgeschlossen');
  // NEXT-79c intentionally prevents silently replacing an active plan.
  // Explicitly cancel the earlier plan before preparing a new one.
  await page.locator('#tournament-cancel').click();
  await page.locator('#tournament-count').fill('4');
  await page.locator('#tournament-count').press('Tab');
  await page.locator('#tournament-name-1').fill('Alpha');
  await page.locator('#tournament-name-2').fill('Beta');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-pairings li')).toHaveCount(6);
  await expect(page.locator('#tournament-table tbody tr')).toHaveCount(4);
  await expect(page.locator('#tournament-table')).toContainText('Alpha');
  await expect(page.locator('#tournament-table')).toContainText('Beta');
  await expect(page.locator('#tournament-progress')).toContainText('0 / 6 Kämpfe abgeschlossen');
  await page.getByRole('button', { name: 'Turnier schließen' }).click();
  await expect(page.getByRole('button', { name: 'Turnier', exact: true })).toBeFocused();
  expect(await page.locator('#status').innerText()).toBe(liveStatus);
  expect(await page.getByRole('progressbar', { name: 'Energie Roboter A' }).getAttribute('aria-valuenow')).toBe(liveEnergy);
});

test('NEXT-55 tournament validation, Escape and mobile overflow', async ({ page }) => {
  await page.goto('/');
  const before = await page.locator('#status').innerText();
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  await page.locator('#tournament-count').fill('17');
  await page.locator('#tournament-count').press('Tab');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-feedback')).toContainText('zwischen 2 und 16');
  await expect(page.locator('#tournament-preview')).toBeHidden();
  await page.locator('#tournament-count').fill('16');
  await page.locator('#tournament-count').press('Tab');
  await page.locator('#tournament-name-1').fill('');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-feedback')).toContainText('Teilnehmername fehlt');
  await page.locator('#tournament-name-1').fill('Robot 1');
  await page.locator('#tournament-seed').fill('-1');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-feedback')).toContainText('Turnier-Startwert');
  await page.locator('#tournament-seed').fill('4711');
  await page.getByRole('button', { name: 'Spielplan erstellen' }).click();
  await expect(page.locator('#tournament-pairings li')).toHaveCount(120);
  await expect(page.locator('#tournament-table tbody tr')).toHaveCount(16);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Turnier planen' })).toBeHidden();
  expect(await page.locator('#status').innerText()).toBe(before);
});
