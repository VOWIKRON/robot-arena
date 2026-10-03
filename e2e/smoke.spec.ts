import { expect, test } from '@playwright/test';

test('arena is usable and exposes project information', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Robot Arena' })).toBeVisible();
  await page.getByRole('button', { name: '1 Tick' }).click();
  await expect(page.getByText('Tick: 1')).toBeVisible();

  await expect(page.getByRole('link', { name: 'Testsuite' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Release Notes' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Backlog' })).toBeVisible();
  await expect(page.getByText('Bootstrap')).toHaveCount(0);
});

test('public information pages are reachable', async ({ page }) => {
  await page.goto('/testsuite.html');
  await expect(page.getByRole('heading', { name: 'Testsuite' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Engine / Determinismus' })).toBeVisible();
  await expect(page.getByText('RAND-001')).toBeVisible();
  await expect(page.getByText('SIM-001')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Browser / Desktop' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Browser / Mobile' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Deployment / Online-Smoke' })).toBeVisible();

  await page.goto('/release-notes.html');
  await expect(page.getByRole('heading', { name: 'Release Notes' })).toBeVisible();

  await page.goto('/backlog.html');
  await expect(page.getByRole('heading', { name: 'Backlog' })).toBeVisible();
  await expect(page.getByText('Nächster Lauf', { exact: true })).toBeVisible();
});
