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
  await expect(page.getByText('SIM-009')).toBeVisible();
  await expect(page.getByText('EVT-001')).toBeVisible();
  await expect(page.getByText('EVT-004')).toBeVisible();
  await expect(page.getByText('MOV-001')).toBeVisible();
  await expect(page.getByText('MOV-003')).toBeVisible();
  await expect(page.getByText('SHOT-001')).toBeVisible();
  await expect(page.getByText('SHOT-004')).toBeVisible();
  await expect(page.getByText('HIT-001')).toBeVisible();
  await expect(page.getByText('DMG-003')).toBeVisible();
  await expect(page.getByText('EVT-005')).toBeVisible();
  await expect(page.getByText('END-002')).toBeVisible();
  await expect(page.getByText('TIME-001')).toBeVisible();
  await expect(page.getByText('TIME-003')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Browser / Desktop' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Browser / Mobile' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Deployment / Online-Smoke' })).toBeVisible();

  await page.goto('/release-notes.html');
  await expect(page.getByRole('heading', { name: 'Release Notes' })).toBeVisible();

  await page.goto('/backlog.html');
  await expect(page.getByRole('heading', { name: 'Backlog' })).toBeVisible();
  await expect(page.getByText('Nächster Lauf', { exact: true })).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Energieverhalten härten')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Test-Review vor Refactoring')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Reichweite und Cooldown charakterisieren')).toBeVisible();
  await expect(page.getByText('NEXT-12 · Event-Reihenfolge charakterisieren')).toBeVisible();
  await expect(page.getByText('NEXT-13 · Event-Stream deterministisch absichern')).toBeVisible();
});
