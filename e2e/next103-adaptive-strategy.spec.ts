import { expect, test } from '@playwright/test';

test('NEXT-103 adaptive strategy is configurable and reaches the real combat state', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await page.getByLabel('Strategie A', { exact: true }).selectOption('adaptive');
  await expect(page.locator('#target-a')).toBeVisible();
  await expect(page.locator('#target-a')).toHaveValue('80');
  await expect(page.locator('#threshold-a')).toBeVisible();
  await expect(page.locator('#threshold-a')).toHaveValue('70');
  await expect(page.locator('#retreat-a')).toBeVisible();
  await expect(page.locator('#retreat-a')).toHaveValue('110');
  await expect(page.locator('#preview-a')).toContainText('Strategie: Adaptiv');

  await page.locator('#threshold-a').fill('101');
  await expect(page.locator('#validation-a')).toContainText('Rückzugsschwelle');
  await expect(page.getByRole('button', { name: 'Übernehmen & Kampf zurücksetzen' })).toBeDisabled();
  await page.locator('#threshold-a').fill('60');
  await expect(page.locator('#validation-a')).toHaveText('Konfiguration gültig');
  await page.getByRole('button', { name: 'Übernehmen & Kampf zurücksetzen' }).click();
  await expect(page.locator('#stats .robot-a .battle-strategy')).toHaveText('Strategie: Adaptiv');
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  await expect(page.getByText('Tick: 1', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await expect(page.getByLabel('Strategie A', { exact: true })).toHaveValue('aggressive');
  await expect(page.locator('#threshold-a')).toBeHidden();
  await expect(page.locator('#target-a')).toHaveValue('80');
});
