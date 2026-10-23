import { expect, test, type Page } from '@playwright/test';

async function assertPaintedBars(page: Page, id: string) {
  for (const selector of ['.bot-energy', '.bot-health']) {
    const bar = page.locator(`#bot-${id} ${selector}`);
    await expect(bar).toBeVisible();
    // Visibility alone does not detect ancestor clip-path clipping (the original Raptor bug).
    expect(await bar.evaluate(node => {
      const el = node as HTMLElement;
      const previous = el.style.pointerEvents;
      el.style.pointerEvents = 'auto';
      const box = el.getBoundingClientRect();
      const painted = el.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
      el.style.pointerEvents = previous;
      return painted;
    })).toBe(true);
  }
}

test('both robots paint energy and health bars with either chassis', async ({ page }) => {
  await page.goto('/');
  for (const id of ['a', 'b']) {
    await assertPaintedBars(page, id);
    const bar = page.getByRole('progressbar', { name: `Energie Roboter ${id.toUpperCase()}` });
    await expect(bar).toHaveAttribute('aria-valuenow', id === 'a' ? '100' : '90');
    expect(await page.locator(`#bot-${id} .bot-energy-fill`).evaluate(el => (el as HTMLElement).style.width)).toBe('100%');
  }
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await page.getByLabel('Chassis A', { exact: true }).selectOption('titan');
  await page.getByLabel('Chassis B', { exact: true }).selectOption('raptor');
  await page.getByLabel('Waffe B', { exact: true }).selectOption('raptor');
  await page.getByRole('button', { name: 'Konfiguration schließen' }).click();
  for (const id of ['a', 'b']) await assertPaintedBars(page, id);
});

test('energy bars follow spending, regeneration, configuration and reset for A and B', async ({ page }) => {
  await page.goto('/');
  const barA = page.getByRole('progressbar', { name: 'Energie Roboter A' });
  const barB = page.getByRole('progressbar', { name: 'Energie Roboter B' });
  for (let i = 0; i < 40 && (Number(await barA.getAttribute('aria-valuenow')) === 100 || Number(await barB.getAttribute('aria-valuenow')) === 90); i++) {
    await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  }
  for (const id of ['a', 'b']) {
    const bar = page.getByRole('progressbar', { name: `Energie Roboter ${id.toUpperCase()}` });
    const energy = Number(await bar.getAttribute('aria-valuenow'));
    const max = Number(await bar.getAttribute('aria-valuemax'));
    expect(energy).toBeLessThan(max);
    await expect(page.locator(`#stats .robot-${id} .energy-value`)).toHaveText(`Energie ${energy.toFixed(1)} / ${max}`);
    expect(await page.locator(`#bot-${id} .bot-energy-fill`).evaluate(el => parseFloat((el as HTMLElement).style.width))).toBeCloseTo(energy / max * 100);
  }
  const beforeA = Number(await barA.getAttribute('aria-valuenow'));
  const beforeB = Number(await barB.getAttribute('aria-valuenow'));
  await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  expect(Number(await barA.getAttribute('aria-valuenow'))).toBeCloseTo(Math.min(100, beforeA + 1.5));
  expect(Number(await barB.getAttribute('aria-valuenow'))).toBeCloseTo(Math.min(90, beforeB + 1.1));
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await page.getByLabel('Energie A', { exact: true }).selectOption('regen');
  await page.getByLabel('Energie B', { exact: true }).selectOption('capacity');
  await page.getByRole('button', { name: 'Übernehmen & Kampf zurücksetzen' }).click();
  await expect(barA).toHaveAttribute('aria-valuemax', '90');
  await expect(barA).toHaveAttribute('aria-valuenow', '90');
  await expect(barB).toHaveAttribute('aria-valuemax', '112.5');
  await expect(barB).toHaveAttribute('aria-valuenow', '112.5');
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(barA).toHaveAttribute('aria-valuenow', '100');
  await expect(barA).toHaveAttribute('aria-valuemax', '100');
  await expect(barB).toHaveAttribute('aria-valuenow', '90');
  await expect(barB).toHaveAttribute('aria-valuemax', '90');
  for (const id of ['a', 'b']) await assertPaintedBars(page, id);
});
