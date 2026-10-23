import { expect, test } from '@playwright/test';

test('independent strategy selection reaches the actual battle and Reset restores defaults', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await page.getByLabel('Strategie A', { exact: true }).selectOption('distance');
  await page.getByLabel('Strategie B', { exact: true }).selectOption('melee');
  await expect(page.locator('#target-a')).toHaveValue('90');
  await expect(page.locator('#target-b')).toHaveValue('20');
  await expect(page.locator('#preview-a')).toContainText('Strategie: Distanz');
  await expect(page.locator('#preview-b')).toContainText('Strategie: Nahkampf');
  await page.getByRole('button', { name: 'Übernehmen & Kampf zurücksetzen' }).click();
  await expect(page.locator('#stats .robot-a .battle-strategy')).toHaveText('Strategie: Distanz');
  await expect(page.locator('#stats .robot-b .battle-strategy')).toHaveText('Strategie: Nahkampf');
  await expect(page.locator('.battle-panel select')).toHaveCount(0);
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await expect(page.getByText('Tick: 0', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await page.getByLabel('Strategie A', { exact: true }).selectOption('defensive');
  await expect(page.locator('#target-a')).toBeHidden();
  await expect(page.locator('#threshold-a')).toBeVisible();
  await expect(page.locator('#threshold-a')).toHaveValue('70');
  await expect(page.locator('#retreat-a')).toHaveValue('110');
  await expect(page.getByLabel('Strategie B', { exact: true })).toHaveValue('melee');
  await page.getByRole('button', { name: 'Konfiguration schließen' }).click();
  await expect(page.locator('#stats .robot-a .battle-strategy')).toHaveText('Strategie: Defensiv');
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  for (const side of ['a','b']) {
    await expect(page.getByLabel(`Strategie ${side.toUpperCase()}`, { exact: true })).toHaveValue('aggressive');
    await expect(page.locator(`#target-${side}`)).toHaveValue('80');
    await expect(page.locator(`#threshold-${side}`)).toBeHidden();
  }
  await page.getByRole('button', { name: 'Konfiguration schließen' }).click();
  await expect(page.locator('#stats .battle-strategy')).toHaveText(['Strategie: Aggressiv','Strategie: Aggressiv']);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('strategy parameters affect engine movement and invalid input blocks all match actions', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  // Aggressive A stops at 100 % range without retreat; melee B must close all the way to zero.
  await page.getByLabel('Strategie A', { exact: true }).selectOption('aggressive');
  await page.locator('#target-a').fill('100');
  await page.getByLabel('Strategie B', { exact: true }).selectOption('melee');
  await page.locator('#target-b').fill('-1');
  await expect(page.locator('#validation-b')).toContainText('Zielabstand');
  await page.locator('#target-b').fill('0');
  await page.locator('#target-a').fill('101');
  await expect(page.locator('#validation-a')).toContainText('Zielabstand');
  await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: '1 Tick', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Übernehmen & Kampf zurücksetzen' })).toBeDisabled();
  await page.locator('#target-a').fill('');
  await expect(page.locator('#validation-a')).toContainText('Zielabstand');
  await page.locator('#target-a').fill('100');
  await expect(page.locator('#validation-a')).toHaveText('Konfiguration gültig');
  await page.getByRole('button', { name: 'Übernehmen & Kampf zurücksetzen' }).click();
  for (let i=0;i<54;i++) await page.getByRole('button', { name: '1 Tick', exact: true }).click();
  const xA=Number(await page.locator('#bot-a').getAttribute('data-x'));
  const xB=Number(await page.locator('#bot-b').getAttribute('data-x'));
  expect(xA).toBeCloseTo(42.6, 3); // A's 100 % target, rather than its old 80 % default.
  expect(xB-xA).toBeCloseTo(0, 3); // B's custom zero target, rather than the default 20 % gap.
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await page.getByLabel('Strategie A', { exact: true }).selectOption('defensive');
  await page.locator('#threshold-a').fill('101');
  await expect(page.locator('#validation-a')).toContainText('Rückzugsschwelle');
  await page.locator('#threshold-a').fill('0');
  await page.locator('#retreat-a').fill('99');
  await expect(page.locator('#validation-a')).toContainText('Sicherheitsabstand');
  await page.locator('#retreat-a').fill('200');
  await expect(page.locator('#validation-a')).toHaveText('Konfiguration gültig');
  await page.locator('#threshold-a').fill('101');
  await page.getByLabel('Strategie A', { exact: true }).selectOption('aggressive');
  await expect(page.locator('#threshold-a')).toBeHidden();
  await expect(page.locator('#validation-a')).toHaveText('Konfiguration gültig');
  await page.getByRole('button', { name: 'Konfiguration schließen' }).click();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.getByText('Tick: 0', { exact: true })).toBeVisible();
});

test('invalid live edits pause the fight without throwing or replacing the last valid state', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await expect(page.getByText('Tick: 0', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Konfiguration', exact: true }).click();
  await page.locator('#target-a').fill('101');
  const tick = await page.locator('#stats').getByText(/^Tick:/).textContent();
  await page.waitForTimeout(180);
  await expect(page.locator('#stats').getByText(/^Tick:/)).toHaveText(tick ?? '');
  await expect(page.getByRole('button', { name: 'Übernehmen & Kampf zurücksetzen' })).toBeDisabled();
  await page.getByRole('button', { name: 'Konfiguration schließen' }).click();
  await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: '1 Tick', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.getByText('Tick: 0', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeEnabled();
  expect(errors).toEqual([]);
});

for (const [side, firstRetreatTick] of [['a',20],['b',21]] as const) {
  test(`defensive robot ${side.toUpperCase()} visibly retreats before critical damage`, async ({page}) => {
    await page.goto('/');
    await page.getByRole('button', {name:'Konfiguration',exact:true}).click();
    await page.getByLabel(`Strategie ${side.toUpperCase()}`, {exact:true}).selectOption('defensive');
    await expect(page.locator(`#threshold-${side}`)).toHaveValue('70');
    await expect(page.locator(`#defensive-fields-${side}`)).toContainText('maximal 95 %');
    await page.getByRole('button', {name:'Übernehmen & Kampf zurücksetzen'}).click();
    for(let i=1;i<firstRetreatTick;i++) await page.getByRole('button',{name:'1 Tick',exact:true}).click();
    const robot=page.locator(`#bot-${side}`);
    const previousX=Number(await robot.getAttribute('data-x'));
    await page.getByRole('button',{name:'1 Tick',exact:true}).click();
    const x=Number(await robot.getAttribute('data-x'));
    expect(side==='a'?x<previousX:x>previousX).toBe(true);
    expect(Number(await robot.locator('.bot-health').getAttribute('aria-valuenow'))).toBeGreaterThan(70);
    await expect(page.locator(`#stats .robot-${side} .battle-strategy`)).toHaveText('Strategie: Defensiv');
  });
}
