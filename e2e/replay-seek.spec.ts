import { expect, test } from '@playwright/test';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { recordMatch } from '../src/engine/recorder';
import { serializeReplay } from '../src/engine/replay-format';

test('NEXT-48 timeline seeks backward and forward by keyboard/touch without changing live arena', async ({ page }) => {
  await page.goto('/');
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  const liveStatus = await page.locator('#status').innerText();
  const liveA = await page.locator('#bot-a').getAttribute('style');
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await page.getByRole('button', { name: 'Aktuellen Kampf laden' }).click();
  const timeline = page.getByRole('slider', { name: 'Replay-Zeitleiste' });
  await expect(timeline).toBeEnabled();
  await expect(timeline).toHaveValue('0');
  await expect(page.locator('#replay-bot-a')).toHaveCSS('left', /.+/);
  await timeline.focus();
  await timeline.press('End');
  await expect(timeline).toHaveValue('4');
  await expect(page.locator('#replay-progress')).toContainText('Replay Tick 4 / 4');
  await expect(page.locator('#replay-stats')).toContainText('Struktur');
  await expect(page.locator('#replay-stats')).toContainText('Energie');
  await timeline.press('Home');
  await expect(timeline).toHaveValue('0');
  await expect(page.locator('#replay-progress')).toContainText('Replay Tick 0 / 4');
  await timeline.press('ArrowRight');
  await expect(timeline).toHaveValue('1');
  await expect(page.locator('#replay-progress')).toContainText('Replay Tick 1 / 4');
  if (test.info().project.name === 'mobile-chromium') {
    const box = await timeline.boundingBox();
    expect(box).not.toBeNull();
    await page.touchscreen.tap(box!.x + box!.width * 0.75, box!.y + box!.height / 2);
    expect(Number(await timeline.inputValue())).toBeGreaterThan(1);
  }
  await page.getByRole('button', { name: 'Schließen' }).click();
  expect(await page.locator('#status').innerText()).toBe(liveStatus);
  expect(await page.locator('#bot-a').getAttribute('style')).toBe(liveA);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('NEXT-48 seek redraws recorded shot and damage effects from imported instant victory', async ({ page }) => {
  const a = { ...RAPTOR, speed: 0, weaponRange: 100, weaponDamage: 10000 };
  const b = { ...TITAN, speed: 0 };
  const json = serializeReplay(recordMatch(a, b, 12, 3600));
  await page.goto('/');
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await page.locator('#replay-file').setInputFiles({
    name: 'victory.json', mimeType: 'application/json', buffer: Buffer.from(json)
  });
  const timeline = page.getByRole('slider', { name: 'Replay-Zeitleiste' });
  await expect(timeline).toHaveValue('0');
  await expect(page.locator('#replay-effects .replay-shot')).toHaveCount(0);
  await timeline.focus();
  await timeline.press('End');
  await expect(page.locator('#replay-progress')).toContainText('Replay Tick 1 / 1');
  await expect(page.locator('#replay-effects .replay-shot')).toHaveCount(1);
  await expect(page.locator('#replay-effects .replay-damage')).toHaveCount(1);
  await expect(page.locator('#replay-stats')).toContainText('Struktur 0.0');
  await timeline.press('Home');
  await expect(page.locator('#replay-effects .replay-shot')).toHaveCount(0);
  await expect(page.locator('#replay-effects .replay-damage')).toHaveCount(0);
});
