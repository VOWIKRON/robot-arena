import { test, expect } from '@playwright/test';

test('NEXT-59: knockout bracket keyboard and champion for 3/5 participants', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name:'Turnier', exact:true}).click();
  await page.locator('#tournament-format').selectOption('knockout');
  for (const n of [3,5]) {
    await page.locator('#tournament-count').fill(String(n));
    await page.locator('#tournament-count').press('Tab');
    await page.getByRole('button', {name:'Spielplan erstellen'}).click();
    await expect(page.locator('#tournament-progress')).toContainText('Sieger:');
    await expect(page.locator('#tournament-pairings li')).toHaveCount(n === 3 ? 3 : 7);
    await expect(page.locator('#tournament-pairings')).toContainText('Freilos');
  }
});
test('NEXT-61: round robin standings CSV/JSON download', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name:'Turnier', exact:true}).click();
  await page.getByRole('button', {name:'Spielplan erstellen'}).click();
  for (const format of ['CSV','JSON']) {
    const promise = page.waitForEvent('download');
    await page.getByRole('button', {name:'Tabelle '+format}).click();
    const download = await promise;
    expect(download.suggestedFilename()).toBe('robot-arena-tabelle.'+format.toLowerCase());
  }
});
