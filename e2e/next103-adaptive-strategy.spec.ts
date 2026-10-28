import { expect, test } from '@playwright/test';

test('NEXT-103 adaptive strategy exposes both attack and retreat controls on desktop and mobile', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await page.getByLabel('Strategie A', { exact: true }).selectOption('adaptive');
  await page.getByLabel('Strategie B', { exact: true }).selectOption('adaptive');
  for (const side of ['a', 'b'] as const) {
    await expect(page.locator(`#target-${side}`)).toBeVisible();
    await expect(page.locator(`#threshold-${side}`)).toBeVisible();
    await expect(page.locator(`#retreat-${side}`)).toBeVisible();
    await expect(page.locator(`#target-${side}`)).toHaveValue('80');
    await expect(page.locator(`#threshold-${side}`)).toHaveValue('70');
    await expect(page.locator(`#retreat-${side}`)).toHaveValue('110');
  }
  await page.locator('#target-a').fill('101');
  await expect(page.locator('#validation-a')).toContainText('Zielabstand');
  await page.locator('#target-a').fill('60');
  await page.locator('#threshold-a').fill('101');
  await expect(page.locator('#validation-a')).toContainText('Rückzugsschwelle');
  await page.locator('#threshold-a').fill('55');
  await page.locator('#retreat-a').fill('99');
  await expect(page.locator('#validation-a')).toContainText('Sicherheitsabstand');
  await page.locator('#retreat-a').fill('125');
  await expect(page.locator('#validation-a')).toHaveText('Konfiguration gültig');
  await page.getByRole('button', { name: 'Übernehmen & Kampf zurücksetzen' }).click();
  await expect(page.locator('#stats .battle-strategy')).toHaveText(['Strategie: Adaptiv', 'Strategie: Adaptiv']);
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  await expect(page.getByText('Tick: 1', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await expect(page.getByLabel('Strategie A', { exact: true })).toHaveValue('adaptive');
  await expect(page.locator('#target-a')).toHaveValue('60');
  await expect(page.locator('#threshold-a')).toHaveValue('55');
  await expect(page.locator('#retreat-a')).toHaveValue('125');
  await page.getByRole('button', { name: 'Konfiguration schließen' }).click();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await expect(page.getByLabel('Strategie A', { exact: true })).toHaveValue('aggressive');
  await expect(page.locator('#threshold-a')).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
