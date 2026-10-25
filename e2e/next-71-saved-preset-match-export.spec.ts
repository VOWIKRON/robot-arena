import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('NEXT-71 combined: persisted custom robot survives reload and exports its completed tournament match', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-config').click();
  await page.locator('#chassis-a').selectOption('titan');
  await page.locator('#save-robot-preset-a').click();
  await expect(page.locator('#robot-preset-feedback')).toContainText('versioniertes Preset gespeichert');
  await page.reload();

  await page.locator('#open-tournament').click();
  await page.locator('#tournament-preset-1').selectOption('saved-a');
  await page.locator('#tournament-name-1').fill('Gespeichert A');
  await page.locator('#tournament-name-2').fill('Standard B');
  await page.locator('#tournament-ticks').fill('10');
  await page.locator('#tournament-create').click();
  await expect(page.locator('#tournament-pairings li')).toHaveCount(1);

  const [archiveDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#tournament-export').click()
  ]);
  const archive = JSON.parse(await readFile(await archiveDownload.path(), 'utf8')) as {
    run: { definition: { participants: Array<{ name: string; maxStructure: number }> } }
  };
  expect(archive.run.definition.participants[0]).toMatchObject({
    name: 'Gespeichert A', maxStructure: 130
  });

  await page.locator('#tournament-run').click();
  await expect(page.locator('button[data-match-export-format="json"]')).toHaveCount(1);
  const [matchDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('button[data-match-export-format="json"]').click()
  ]);
  const match = JSON.parse(await readFile(await matchDownload.path(), 'utf8')) as {
    schemaVersion: number; matchId: string; robotAName: string; robotBName: string
  };
  expect(match).toMatchObject({
    schemaVersion: 1, matchId: 'match-001',
    robotAName: 'Gespeichert A', robotBName: 'Standard B'
  });
});
