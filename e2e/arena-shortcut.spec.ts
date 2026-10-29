import { expect, test } from '@playwright/test';

test('NEXT-113: Space on focused arena starts, pauses and resumes without hidden ticks', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  const arena = page.getByRole('region', { name: 'Kampfarena, Leertaste für Start oder Pause' });
  await expect(arena).toHaveAttribute('tabindex', '0');
  await arena.focus();
  await page.keyboard.press('Space');
  await expect(page.getByText('Tick: 1', { exact: true })).toBeVisible();
  await expect(page.locator('#status')).toHaveText('Kampf läuft');
  await page.keyboard.press('Space');
  await expect(page.locator('#status')).toHaveText('Kampf pausiert');
  await page.clock.runFor(400);
  await expect(page.getByText('Tick: 1', { exact: true })).toBeVisible();
  await page.keyboard.press('Space');
  await expect(page.getByText('Tick: 2', { exact: true })).toBeVisible();
  await page.keyboard.press('Space');
  await expect(page.locator('#status')).toHaveText('Kampf pausiert');
});

test('NEXT-113: arena shortcut never hijacks form fields, dialogs or modified keys', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  const arena = page.getByRole('region', { name: 'Kampfarena, Leertaste für Start oder Pause' });
  await arena.focus();
  await page.keyboard.press('Shift+Space');
  await expect(page.getByText('Tick: 0', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Roboter konfigurieren' })).toBeVisible();
  await page.locator('#seed').focus();
  await page.keyboard.press('Space');
  await expect(page.getByText('Tick: 0', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Konfiguration schließen' }).click();
  await arena.focus();
  await page.keyboard.press('Space');
  await expect(page.getByText('Tick: 1', { exact: true })).toBeVisible();
});
