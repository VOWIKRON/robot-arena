import { expect, test } from '@playwright/test';

test('arena is usable and exposes project information', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Robot Arena' })).toBeVisible();
  await page.getByRole('button', { name: '1 Tick' }).click();
  await expect(page.getByText('Tick: 1')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Roboter A' })).toBeVisible();
  await expect(page.locator('#preview-a').getByText('Live-Werte')).toBeVisible();
  await expect(page.locator('#preview-b').getByText('Live-Werte')).toBeVisible();
  await page.getByLabel('Chassis A').selectOption('titan');
  await expect(page.getByText('Struktur 130', { exact: true })).toBeVisible();
  await page.getByLabel('Waffe A').selectOption('raptor');
  await expect(page.getByText(/Reichweite 28 · Schaden 8/)).toBeVisible();
  await page.getByLabel('Chassis B').selectOption('raptor');
  await expect(page.locator('#preview-b').getByText('Struktur 90', { exact: true })).toBeVisible();
  await page.getByLabel('Waffe B').selectOption('raptor');
  await expect(page.locator('#preview-b').getByText(/Reichweite 28 · Schaden 8/)).toBeVisible();
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByText('A: Robot A')).toBeVisible();
  await expect(page.getByText('B: Robot B')).toBeVisible();

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
  await expect(page.getByText('EVT-ORDER-001')).toBeVisible();
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
  await expect(page.getByText('✓ Erledigt · Event-Reihenfolge charakterisieren')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Event-Stream deterministisch absichern')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Engine-Refactoring vorbereiten')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Aktionslogik weiter entkoppeln')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Schussausführung kapseln')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Roboter- und Komponentensystem beginnen')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Komponentenwahl sichtbar machen')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Komponentenwahl Roboter B')).toBeVisible();
  await expect(page.getByText('NEXT-20 · Komponentenvalidierung und Builder-Grenzen')).toBeVisible();
});
