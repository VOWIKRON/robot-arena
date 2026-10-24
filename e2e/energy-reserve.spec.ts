import { expect, test } from '@playwright/test';

test('NEXT-40 energy reserve is validated for both robots and reset on desktop/mobile', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  const reserveA = page.getByLabel('Energiereserve A');
  const reserveB = page.getByLabel('Energiereserve B');
  await expect(reserveA).toHaveValue('0');
  await expect(reserveB).toHaveValue('0');
  await reserveA.fill('101');
  await expect(page.locator('#validation-a')).toContainText('Energiereserve');
  await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: '1 Tick', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Übernehmen & Kampf zurücksetzen' })).toBeDisabled();
  await reserveA.fill('');
  await expect(page.locator('#validation-a')).toContainText('Energiereserve');
  await reserveA.fill('100');
  await reserveB.fill('0');
  await expect(page.locator('#validation-a')).toHaveText('Konfiguration gültig');
  await expect(page.locator('#preview-a')).toContainText('Energiereserve 100 %');
  await page.getByRole('button', { name: 'Übernehmen & Kampf zurücksetzen' }).click();
  const a = page.getByRole('progressbar', { name: 'Energie Roboter A' });
  const b = page.getByRole('progressbar', { name: 'Energie Roboter B' });
  let spentB = false;
  for (let i = 0; i < 55; i++) {
    await page.getByRole('button', { name: '1 Tick', exact: true }).click();
    expect(Number(await a.getAttribute('aria-valuenow'))).toBe(100);
    if (Number(await b.getAttribute('aria-valuenow')) < 90) { spentB = true; break; }
  }
  expect(spentB).toBe(true);
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await expect(page.getByLabel('Energiereserve A')).toHaveValue('0');
  await expect(page.getByLabel('Energiereserve B')).toHaveValue('0');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
