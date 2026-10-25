import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('NEXT-69: current sandbox robots can enter a tournament without altering sandbox state', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-config').click();
  await page.locator('#chassis-a').selectOption('titan');
  await page.locator('#motor-a').selectOption('swift');
  await page.locator('#apply-config').click();
  const sandboxStatus = await page.locator('#status').innerText();

  await page.locator('#open-tournament').click();
  await page.locator('#tournament-preset-1').selectOption('sandbox-a');
  await page.locator('#tournament-preset-2').selectOption('sandbox-b');
  await page.locator('#tournament-name-1').fill('Eigener A');
  await page.locator('#tournament-name-2').fill('Eigener B');
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-pairings li')).toHaveCount(1);
  await expect(page.locator('#tournament-feedback')).not.toContainText('ungültig');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#tournament-export').click()
  ]);
  const json = JSON.parse((await readFile(await download.path())).toString('utf8')) as {
    run: { definition: { participants: Array<{ id: string; name: string; maxStructure: number; speed: number }> } }
  };
  const [first, second] = json.run.definition.participants;
  expect(first).toMatchObject({ id: 'participant-1', name: 'Eigener A', maxStructure: 130 });
  expect(first?.speed).toBeGreaterThan(0.8);
  expect(second).toMatchObject({ id: 'participant-2', name: 'Eigener B' });
  await page.locator('#close-tournament').click();
  expect(await page.locator('#status').innerText()).toBe(sandboxStatus);
});

test('NEXT-69: sandbox robot selections remain usable on narrow mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-preset-1').selectOption('sandbox-a');
  await page.locator('#tournament-preset-2').selectOption('sandbox-b');
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-pairings li')).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
