import { test, expect } from '@playwright/test';

// Automated accessibility preflight only: never substitutes for physical
// NVDA, VoiceOver, touch-device, or measured contrast acceptance (NEXT-79e).
test('NEXT-79e-AUTO1: keyboard focus has a visible outline', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const focused = page.locator(':focus-visible');
  await expect(focused).toHaveCount(1);
  const width = await focused.evaluate(element => parseFloat(getComputedStyle(element).outlineWidth));
  expect(width).toBeGreaterThanOrEqual(3);
});

test('NEXT-79e-AUTO2: reduced-motion preference disables combat effects', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const result = await page.evaluate(() => {
    const shot = document.createElement('div');
    shot.className = 'shot-effect';
    document.body.appendChild(shot);
    const hit = document.createElement('div');
    hit.className = 'hit-effect';
    document.body.appendChild(hit);
    const bot = document.querySelector<HTMLElement>('#bot-a');
    if (!bot) throw new Error('Missing bot A');
    bot.classList.add('is-hit');
    const durations = {
      shot: getComputedStyle(shot).animationDuration,
      hit: getComputedStyle(hit).animationDuration,
      botAnimation: getComputedStyle(bot).animationDuration,
      botTransition: getComputedStyle(bot).transitionDuration,
    };
    shot.remove();
    hit.remove();
    bot.classList.remove('is-hit');
    return durations;
  });
  expect(result.shot).toBe('0s');
  expect(result.hit).toBe('0s');
  expect(result.botAnimation).toBe('0s');
  expect(result.botTransition).toBe('0s');
});

test('NEXT-79e-AUTO3: 320px viewport keeps tournament dialog and trigger operable', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Turnier', exact: true });
  await expect(trigger).toBeVisible();
  const triggerBox = await trigger.boundingBox();
  expect(triggerBox).not.toBeNull();
  expect(triggerBox!.height).toBeGreaterThanOrEqual(44);
  await trigger.click();
  const dialog = page.locator('#tournament-dialog');
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(-1);
  expect(box!.x + box!.width).toBeLessThanOrEqual(321);
});

test('NEXT-79e-AUTO5: keyboard opens and dismisses tournament dialog with focus restored', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Turnier', exact: true });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.locator('#tournament-dialog');
  await expect(dialog).toBeVisible();
  const focusWithinDialog = await dialog.evaluate(element => element.contains(document.activeElement));
  expect(focusWithinDialog).toBe(true);
  await expect(page.getByRole('button', { name: 'Turnier schließen' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('NEXT-79e-AUTO6: reduced motion toggles shot and HUD transitions, restores normal mode', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => {
    const shot = document.createElement('span');
    shot.id = 'next79e-motion-probe';
    shot.className = 'shot-effect';
    document.body.appendChild(shot);
  });
  const sample = () => page.evaluate(() => {
    const shot = document.getElementById('next79e-motion-probe');
    const health = document.querySelector('#bot-a .bot-health-fill');
    const energy = document.querySelector('#bot-a .bot-energy-fill');
    if (!shot || !health || !energy) throw new Error('Missing visual-motion probes');
    return {
      shot: getComputedStyle(shot).animationDuration,
      health: getComputedStyle(health).transitionDuration,
      energy: getComputedStyle(energy).transitionDuration,
    };
  });
  const normal = await sample();
  for (const value of Object.values(normal)) expect(parseFloat(value)).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await sample()).toEqual({ shot: '0s', health: '0s', energy: '0s' });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  expect(await sample()).toEqual(normal);
});
