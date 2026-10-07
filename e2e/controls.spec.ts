import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Tick: 0')).toBeVisible();
});

test('Start advances the fight immediately', async ({ page }) => {
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.getByText('Tick: 0')).toHaveCount(0);
  await expect(page.locator('#stats')).toContainText(/Tick: [1-9]\d*/);
});

test('Pause stops automatic ticks', async ({ page }) => {
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.locator('#stats')).toContainText(/Tick: [2-9]\d*/);
  await page.getByRole('button', { name: 'Pause' }).click();
  const tick = await page.locator('#stats').getByText(/Tick:/).textContent();
  await page.waitForTimeout(250);
  await expect(page.locator('#stats').getByText(/Tick:/)).toHaveText(tick ?? '');
});

test('single tick advances exactly once', async ({ page }) => {
  await page.getByRole('button', { name: '1 Tick' }).click();
  await expect(page.getByText('Tick: 1')).toBeVisible();
  await page.waitForTimeout(150);
  await expect(page.getByText('Tick: 1')).toBeVisible();
});

test('Reset restores tick zero and ready state', async ({ page }) => {
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.getByText('Tick: 0')).toHaveCount(0);
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByText('Tick: 0')).toBeVisible();
  await expect(page.getByText('Kampfbereit')).toBeVisible();
});

test('Reset restores default robot configurations and seed', async ({ page }) => {
  await page.getByRole('button', { name: 'Konfiguration' }).click();
  await page.getByLabel('Chassis A').selectOption('titan');
  await page.getByLabel('Motor A').selectOption('swift');
  await page.getByLabel('Waffe B').selectOption('raptor');
  await page.getByLabel('Seed').fill('123');
  await page.getByRole('button', { name: 'Reset' }).click();

  await expect(page.getByLabel('Chassis A')).toHaveValue('raptor');
  await expect(page.getByLabel('Motor A')).toHaveValue('balanced');
  await expect(page.getByLabel('Waffe A')).toHaveValue('raptor');
  await expect(page.getByLabel('Chassis B')).toHaveValue('titan');
  await expect(page.getByLabel('Waffe B')).toHaveValue('titan');
  await expect(page.getByLabel('Seed')).toHaveValue('4711');
});

test('Reset recovers from an invalid overweight configuration', async ({ page }) => {
  await page.getByRole('button', { name: 'Konfiguration' }).click();
  await page.getByLabel('Chassis A').selectOption('raptor');
  await page.getByLabel('Motor A').selectOption('heavy');
  await page.getByLabel('Panzerung A').selectOption('heavy');
  await page.getByLabel('Energie A').selectOption('capacity');
  await page.getByLabel('Sensor A').selectOption('long');
  await page.getByLabel('Waffe A').selectOption('titan');
  await expect(page.getByRole('button', { name: 'Start' })).toBeDisabled();

  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('button', { name: 'Start' })).toBeEnabled();
  await expect(page.locator('#validation-a')).toHaveText('Konfiguration gültig');
});

test('configuration changes reset the active match safely', async ({ page }) => {
  await page.getByRole('button', { name: 'Konfiguration' }).click();
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: 'Konfiguration' }).click();
  await expect(page.getByText('Tick: 0')).toHaveCount(0);
  await page.getByLabel('Chassis A').selectOption('titan');
  await expect(page.getByText('Tick: 0')).toBeVisible();
  await expect(page.locator('#bot-a')).toHaveAttribute('data-chassis', 'titan-chassis');
  await page.waitForTimeout(150);
  await expect(page.getByText('Tick: 0')).toBeVisible();
});

test('same seed and Reset reproduce the same first tick', async ({ page }) => {
  await page.getByRole('button', { name: '1 Tick' }).click();
  const firstA = await page.locator('#bot-a').getAttribute('style');
  const firstB = await page.locator('#bot-b').getAttribute('style');

  await page.getByRole('button', { name: 'Reset' }).click();
  await page.getByRole('button', { name: '1 Tick' }).click();
  await expect(page.locator('#bot-a')).toHaveAttribute('style', firstA ?? '');
  await expect(page.locator('#bot-b')).toHaveAttribute('style', firstB ?? '');
});

test('configuration lives in a dedicated dialog', async ({ page }) => {
  await page.getByRole('button', { name: 'Konfiguration' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByLabel('Chassis A')).toBeVisible();
  await expect(page.getByLabel('Chassis B')).toBeVisible();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('heading', { name: 'Kampfstatus' })).toBeVisible();
});
