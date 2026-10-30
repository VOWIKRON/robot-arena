import { expect, test } from '@playwright/test';
import { fireInterval, installManualIntervals, pendingIntervals } from './helpers/manual-intervals';

test('NEXT-112: speed changes reschedule live timer without extra ticks; Pause and Reset work', async ({ page }) => {
  await installManualIntervals(page);
  await page.goto('/');
  const speed = page.getByRole('combobox', { name: 'Kampfgeschwindigkeit' });
  await expect(speed).toHaveValue('1');
  await speed.selectOption('4');
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await expect(page.getByText('Tick: 1', { exact: true })).toBeVisible();
  expect(await pendingIntervals(page)).toEqual([20]);
  for (let expectedTick = 2; expectedTick <= 5; expectedTick++) {
    expect(await fireInterval(page)).toBe(true);
    await expect(page.getByText(`Tick: ${expectedTick}`, { exact: true })).toBeVisible();
  }
  await speed.selectOption('0.5');
  expect(await pendingIntervals(page)).toEqual([160]);
  await expect(page.getByText('Tick: 5', { exact: true })).toBeVisible();
  expect(await fireInterval(page)).toBe(true);
  await expect(page.getByText('Tick: 6', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  expect(await pendingIntervals(page)).toEqual([]);
  expect(await fireInterval(page)).toBe(false);
  await expect(page.getByText('Tick: 6', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(speed).toHaveValue('1');
  await expect(page.getByText('Tick: 0', { exact: true })).toBeVisible();
  expect(await pendingIntervals(page)).toEqual([]);
});

test('NEXT-112: speed selection cannot change one-tick seeded simulation', async ({ page }) => {
  await page.goto('/');
  const speed = page.getByRole('combobox', { name: 'Kampfgeschwindigkeit' });
  await speed.selectOption('4');
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  const first = await Promise.all(['a', 'b'].map(async side => ({
    x: await page.locator('#bot-' + side).getAttribute('data-x'),
    y: await page.locator('#bot-' + side).getAttribute('data-y')
  })));
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await speed.selectOption('0.5');
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  for (const [index, side] of ['a', 'b'].entries()) {
    await expect(page.locator('#bot-' + side)).toHaveAttribute('data-x', first[index].x!);
    await expect(page.locator('#bot-' + side)).toHaveAttribute('data-y', first[index].y!);
  }
});

test('NEXT-112-E: repeated speed changes and reset leave no orphaned interval', async ({ page }) => {
  await installManualIntervals(page);
  await page.goto('/');
  const speed = page.getByRole('combobox', { name: 'Kampfgeschwindigkeit' });
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await expect(page.getByText('Tick: 1', { exact: true })).toBeVisible();
  expect(await pendingIntervals(page)).toEqual([80]);
  await speed.selectOption('2');
  expect(await pendingIntervals(page)).toEqual([40]);
  await speed.selectOption('4');
  expect(await pendingIntervals(page)).toEqual([20]);
  await expect(page.getByText('Tick: 1', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  expect(await pendingIntervals(page)).toEqual([]);
  expect(await fireInterval(page)).toBe(false);
  await expect(page.getByText('Tick: 0', { exact: true })).toBeVisible();
  await expect(speed).toHaveValue('1');
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  expect(await pendingIntervals(page)).toEqual([80]);
  expect(await fireInterval(page)).toBe(true);
  await expect(page.getByText('Tick: 2', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  expect(await pendingIntervals(page)).toEqual([]);
  expect(await fireInterval(page)).toBe(false);
  await expect(page.getByText('Tick: 2', { exact: true })).toBeVisible();
});
