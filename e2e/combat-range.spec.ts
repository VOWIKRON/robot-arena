import { expect, test } from '@playwright/test';

async function assertTacticalDistance(page: import('@playwright/test').Page) {
  const a = page.locator('#bot-a');
  const b = page.locator('#bot-b');
  const xA = Number(await a.getAttribute('data-x'));
  const yA = Number(await a.getAttribute('data-y'));
  const xB = Number(await b.getAttribute('data-x'));
  const yB = Number(await b.getAttribute('data-y'));
  const expected = Math.hypot(xA - xB, yA - yB);
  const label = page.locator('#combat-range');
  await expect(label).toBeVisible();
  const text = (await label.textContent()) ?? '';
  const distance = /Abstand: (\d+\.\d+)/.exec(text);
  expect(distance, 'distance is present in tactical HUD').not.toBeNull();
  expect(Math.abs(Number(distance![1]) - expected)).toBeLessThan(0.11);
  for (const side of ['A', 'B'] as const) {
    const range = new RegExp(side + ': (in Reichweite|außer Reichweite) \\((\\d+\\.\\d+)\\)').exec(text);
    expect(range, side + ' independent range status is present').not.toBeNull();
    expect(range![1] === 'in Reichweite').toBe(expected <= Number(range![2]) + 0.051);
  }
}

test('NEXT-115: tactical range reflects positions before/after manual ticks and reset', async ({ page }) => {
  await page.goto('/');
  await assertTacticalDistance(page);
  await page.getByRole('button', { name: '10 Ticks', exact: true }).click();
  await expect(page.getByText('Tick: 10', { exact: true })).toBeVisible();
  await assertTacticalDistance(page);
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.getByText('Tick: 0', { exact: true })).toBeVisible();
  await assertTacticalDistance(page);
});

test('NEXT-115: tactical range is a read-only projection of seeded simulation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  const first = await Promise.all(['a', 'b'].map(async side => ({
    x: await page.locator('#bot-' + side).getAttribute('data-x'),
    y: await page.locator('#bot-' + side).getAttribute('data-y')
  })));
  const firstReadout = await page.locator('#combat-range').textContent();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  for (const [index, side] of ['a', 'b'].entries()) {
    await expect(page.locator('#bot-' + side)).toHaveAttribute('data-x', first[index].x!);
    await expect(page.locator('#bot-' + side)).toHaveAttribute('data-y', first[index].y!);
  }
  await expect(page.locator('#combat-range')).toHaveText(firstReadout!);
});
