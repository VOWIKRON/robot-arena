import { test, expect } from '@playwright/test';

test('NEXT-78: Raptor/Titan body, weapon and HUD stay within all arena edges on desktop and mobile', async ({ page }) => {
  await page.goto('/');
  for (const viewport of [{ width: 1280, height: 900 }, { width: 375, height: 780 }]) {
    await page.setViewportSize(viewport);
    for (const [x, y] of [[0, 0], [100, 0], [0, 100], [100, 100], [50, 0], [50, 100], [0, 50], [100, 50]]) {
      for (const id of ['bot-a', 'bot-b']) {
        await page.locator('#' + id).evaluate((element, coordinates) => {
          (element as HTMLElement).style.setProperty('--arena-x', coordinates[0] + '%');
          (element as HTMLElement).style.setProperty('--arena-y', coordinates[1] + '%');
        }, [x, y]);
      }
      // The production renderer interpolates positions; assert after the transition settles.
      await page.waitForTimeout(90);
      const bounds = await page.locator('#arena').evaluate(arena => {
        const parent = arena.getBoundingClientRect();
        return ['bot-a', 'bot-b'].flatMap(id => {
          const robot = document.getElementById(id)!;
          return [robot, robot.querySelector('.bot-weapon')!, robot.querySelector('.bot-health')!, robot.querySelector('.bot-energy')!]
            .map(element => {
              const box = element.getBoundingClientRect();
              return { id, part: element.className, left: box.left - parent.left,
                top: box.top - parent.top, right: parent.right - box.right,
                bottom: parent.bottom - box.bottom };
            });
        });
      });
      for (const part of bounds) {
        expect(part.left, `${viewport.width}px (${x},${y}) ${part.id}/${part.part}: left`).toBeGreaterThanOrEqual(-1);
        expect(part.top, `${viewport.width}px (${x},${y}) ${part.id}/${part.part}: top`).toBeGreaterThanOrEqual(-1);
        expect(part.right, `${viewport.width}px (${x},${y}) ${part.id}/${part.part}: right`).toBeGreaterThanOrEqual(-1);
        expect(part.bottom, `${viewport.width}px (${x},${y}) ${part.id}/${part.part}: bottom`).toBeGreaterThanOrEqual(-1);
      }
    }
  }
});

test('NEXT-78: real defensive movement preserves engine coordinates and visible Raptor', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-config').click();
  await page.locator('#strategy-a').selectOption('defensive');
  await page.locator('#threshold-a').fill('100');
  await page.locator('#retreat-a').fill('200');
  await page.locator('#apply-config').click();
  await page.locator('#start').click();
  await page.waitForTimeout(1600);
  await page.locator('#pause').click();
  const result = await page.locator('#bot-a').evaluate(element => {
    const arena = document.getElementById('arena')!.getBoundingClientRect();
    const robot = element.getBoundingClientRect();
    const energy = element.querySelector('.bot-energy')!.getBoundingClientRect();
    return {
      x: Number((element as HTMLElement).dataset.x),
      y: Number((element as HTMLElement).dataset.y),
      visible: robot.left >= arena.left - 1 && robot.right <= arena.right + 1 &&
        robot.top >= arena.top - 1 && robot.bottom <= arena.bottom + 1 &&
        energy.top >= arena.top - 1
    };
  });
  expect(result.x).toBeGreaterThanOrEqual(0);
  expect(result.x).toBeLessThanOrEqual(100);
  expect(result.y).toBeGreaterThanOrEqual(0);
  expect(result.y).toBeLessThanOrEqual(100);
  expect(result.visible).toBe(true);
});
