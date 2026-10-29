import { expect, test } from '@playwright/test';

test('NEXT-114: ten-tick control advances exactly ten steps and reset clears progress', async ({ page }) => {
  await page.goto('/');
  const advance = page.getByRole('button', { name: '10 Ticks', exact: true });
  await expect(advance).toBeEnabled();
  await advance.click();
  await expect(page.getByText('Tick: 10', { exact: true })).toBeVisible();
  await expect(page.locator('#status')).toHaveText('Kampf pausiert');
  await advance.click();
  await expect(page.getByText('Tick: 20', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.getByText('Tick: 0', { exact: true })).toBeVisible();
});

test('NEXT-114: ten-tick control stops live playback without hidden timer ticks', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await expect(page.getByText('Tick: 1', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '10 Ticks', exact: true }).click();
  await expect(page.getByText('Tick: 11', { exact: true })).toBeVisible();
  await expect(page.locator('#status')).toHaveText('Kampf pausiert');
  await page.clock.runFor(800);
  await expect(page.getByText('Tick: 11', { exact: true })).toBeVisible();
});

test('NEXT-114: ten-tick batch has identical seeded result to ten individual steps', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '10 Ticks', exact: true }).click();
  const batch = await Promise.all(['a', 'b'].map(async side => ({
    x: await page.locator('#bot-' + side).getAttribute('data-x'),
    y: await page.locator('#bot-' + side).getAttribute('data-y')
  })));
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  for (let i = 0; i < 10; i++) await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  await expect(page.getByText('Tick: 10', { exact: true })).toBeVisible();
  for (const [index, side] of ['a', 'b'].entries()) {
    await expect(page.locator('#bot-' + side)).toHaveAttribute('data-x', batch[index].x!);
    await expect(page.locator('#bot-' + side)).toHaveAttribute('data-y', batch[index].y!);
  }
});
