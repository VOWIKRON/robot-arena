import { expect, test } from '@playwright/test';

test('NEXT-112: speed changes reschedule live timer without extra ticks; Pause and Reset work', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  const speed = page.getByRole('combobox', { name: 'Kampfgeschwindigkeit' });
  await expect(speed).toHaveValue('1');
  await speed.selectOption('4');
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await expect(page.getByText('Tick: 1', { exact: true })).toBeVisible();
  // Advance one interval at a time: WebKit may coalesce multiple fake-clock
  // interval callbacks when a single runFor() spans several ticks.
  for (let expectedTick = 2; expectedTick <= 5; expectedTick++) {
    await page.clock.runFor(20);
    await expect(page.getByText(`Tick: ${expectedTick}`, { exact: true })).toBeVisible();
  }
  await speed.selectOption('0.5');
  await expect(page.getByText('Tick: 5', { exact: true })).toBeVisible();
  await page.clock.runFor(160);
  await expect(page.getByText('Tick: 6', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.clock.runFor(640);
  await expect(page.getByText('Tick: 6', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(speed).toHaveValue('1');
  await expect(page.getByText('Tick: 0', { exact: true })).toBeVisible();
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
