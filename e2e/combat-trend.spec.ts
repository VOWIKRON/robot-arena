import { expect, test } from '@playwright/test';

async function separation(page: import('@playwright/test').Page): Promise<number> {
  const a = page.locator('#bot-a');
  const b = page.locator('#bot-b');
  const [ax, ay, bx, by] = await Promise.all([
    a.getAttribute('data-x'), a.getAttribute('data-y'),
    b.getAttribute('data-x'), b.getAttribute('data-y')
  ]);
  return Math.hypot(Number(ax) - Number(bx), Number(ay) - Number(by));
}

test('NEXT-116: distance trend follows actual simulation tick and clears on reset', async ({ page }) => {
  await page.goto('/');
  const trend = page.locator('#combat-trend');
  await expect(trend).toHaveText('Abstandstrend: noch kein Tick');
  const before = await separation(page);
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  const after = await separation(page);
  const expected = Math.abs(after - before) <= 1e-6 ? 'Abstand unverändert'
    : after < before ? 'Annäherung' : 'Entfernung';
  await expect(trend).toHaveText('Abstandstrend: ' + expected);
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(trend).toHaveText('Abstandstrend: noch kein Tick');
});

test('NEXT-116: same seed yields identical movement trend and does not advance on pause', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  const first = await page.locator('#combat-trend').textContent();
  const positions = await Promise.all(['a', 'b'].map(async side => ({
    x: await page.locator('#bot-' + side).getAttribute('data-x'),
    y: await page.locator('#bot-' + side).getAttribute('data-y')
  })));
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect(page.locator('#combat-trend')).toHaveText(first!);
  await expect(page.getByText('Tick: 1', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  await expect(page.locator('#combat-trend')).toHaveText(first!);
  for (const [index, side] of ['a', 'b'].entries()) {
    await expect(page.locator('#bot-' + side)).toHaveAttribute('data-x', positions[index].x!);
    await expect(page.locator('#bot-' + side)).toHaveAttribute('data-y', positions[index].y!);
  }
});
