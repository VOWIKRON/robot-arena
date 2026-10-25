import { expect, test, type Page } from '@playwright/test';

/**
 * NEXT-79e: isolated, pre-release accessibility acceptance checks.
 * These browser checks are NOT a substitute for NVDA/VoiceOver and real touch QA.
 */
async function expectNoDocumentOverflow(page: Page, width: number): Promise<void> {
  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth
  }));
  expect(dimensions.documentWidth,
    `Document must not overflow at ${width}px (viewport ${dimensions.viewportWidth}px)`)
    .toBeLessThanOrEqual(dimensions.viewportWidth);
}

test('NEXT-79e: tournament is operable by keyboard with named controls, live progress and focus return', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const opener = page.getByRole('button', { name: 'Turnier', exact: true });
  await opener.focus();
  await page.keyboard.press('Enter');

  const dialog = page.getByRole('dialog', { name: 'Turnier planen' });
  await expect(dialog).toBeVisible();
  await expect(page.locator('#tournament-count')).toBeFocused();
  await expect(dialog.getByRole('spinbutton', { name: /Teilnehmerzahl/ })).toBeVisible();
  await expect(dialog.getByRole('spinbutton', { name: /Turnier-Startwert/ })).toBeVisible();
  await expect(dialog.getByRole('spinbutton', { name: /Ticklimit je Kampf/ })).toBeVisible();
  await expect(dialog.getByRole('combobox', { name: /Turnierformat/ })).toBeVisible();

  await page.locator('#tournament-count').fill('3');
  await page.locator('#tournament-count').dispatchEvent('change');
  await page.locator('#tournament-ticks').fill('1');
  await page.locator('#tournament-create').focus();
  await page.keyboard.press('Enter');

  const progress = page.getByRole('status', { name: 'Turnierfortschritt' });
  await expect(progress).toHaveAttribute('aria-live', 'polite');
  await expect(progress).toContainText('0 / 3');
  await page.locator('#tournament-pause').focus();
  await page.keyboard.press('Enter');
  await expect(progress).toContainText('paused');
  await expect(page.locator('#tournament-run')).toBeDisabled();
  await expect(page.locator('#tournament-auto')).toBeDisabled();

  await page.locator('#tournament-resume').focus();
  await page.keyboard.press('Enter');
  await page.locator('#tournament-auto').focus();
  await page.keyboard.press('Enter');
  await expect(progress).toContainText('3 / 3', { timeout: 15000 });

  const table = page.getByRole('region', { name: 'Turniertabelle, horizontal scrollbar' });
  await table.focus();
  await expect(table).toBeFocused();
  expect(await table.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => table.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  await expectNoDocumentOverflow(page, 375);

  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('NEXT-79e: responsive tournament labels, error focus and scroll targets remain accessible', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turnier', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Turnier planen' });

  await page.locator('#tournament-seed').fill('-1');
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-feedback')).toContainText('Turnier ungültig');
  await expect(page.locator('#tournament-feedback')).toHaveAttribute('aria-live', 'polite');
  await expect(page.locator('#tournament-seed')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#tournament-seed')).toBeFocused();
  await expect(page.locator('#tournament-seed')).toHaveAttribute('aria-describedby', /tournament-feedback/);

  await page.locator('#tournament-seed').fill('4711');
  await expect(page.locator('#tournament-seed')).not.toHaveAttribute('aria-invalid', 'true');
  await page.locator('#tournament-create').click();
  await page.locator('#tournament-run').click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');

  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await expect(dialog).toBeVisible();
    await expect(page.locator('#tournament-progress')).toHaveAttribute('role', 'status');
    await expect(page.locator('#tournament-table-scroll')).toHaveAttribute('role', 'region');
    await expect(page.locator('#tournament-table-scroll')).toHaveAttribute('aria-label', 'Turniertabelle, horizontal scrollbar');
    await expect(page.locator('#tournament-export')).toBeEnabled();
    const navigation = dialog.getByRole('navigation', { name: 'Turnierschritte' });
    for (const link of await navigation.getByRole('link').all()) {
      const box = await link.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
    await expectNoDocumentOverflow(page, width);
  }

  await page.locator('#close-tournament').click();
  await expect(page.locator('#open-tournament')).toBeFocused();
});
