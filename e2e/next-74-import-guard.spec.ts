import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('NEXT-74: hostile tournament import cannot replace a completed tournament or corrupt its export', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-tournament').click();
  await page.locator('#tournament-ticks').fill('10');
  await page.locator('#tournament-create').click();
  await page.locator('#tournament-run').click();
  await expect(page.locator('#tournament-progress')).toContainText('1 / 1');
  const before = await page.locator('#tournament-progress').innerText();

  const hostile = '{"schemaVersion":1,"run":{"__proto__":{"polluted":true}}}';
  await page.locator('#tournament-file').setInputFiles({
    name: 'hostile.json', mimeType: 'application/json', buffer: Buffer.from(hostile)
  });
  await expect(page.locator('#tournament-feedback')).toContainText('gefährlicher Objektschlüssel');
  await expect(page.locator('#tournament-progress')).toHaveText(before);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#tournament-export').click()
  ]);
  const saved = JSON.parse(await readFile(await download.path(), 'utf8')) as {
    run: { status: string; results: unknown[] }
  };
  expect(saved.run.status).toBe('completed');
  expect(saved.run.results).toHaveLength(1);
});
