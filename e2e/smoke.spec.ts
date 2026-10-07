import { expect, test } from '@playwright/test';

test('arena is usable and exposes project information', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Robot Arena' })).toBeVisible();
  await page.getByRole('button', { name: '1 Tick' }).click();
  await expect(page.getByText('Tick: 1')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Roboter A' })).toBeVisible();
  await expect(page.locator('#preview-a').getByText('Live-Werte')).toBeVisible();
  await expect(page.locator('#preview-b').getByText('Live-Werte')).toBeVisible();
  await expect(page.locator('#validation-a')).toHaveText('Konfiguration gültig');
  await expect(page.locator('#validation-b')).toHaveText('Konfiguration gültig');
  await expect(page.getByRole('button', { name: 'Start' })).toBeEnabled();
  await expect(page.locator('#bot-a')).toHaveAttribute('data-chassis', 'raptor-chassis');
  await expect(page.locator('#bot-b')).toHaveAttribute('data-chassis', 'titan-chassis');
  await expect(page.locator('#bot-a')).toHaveAttribute('data-weapon', 'raptor-cannon');
  await expect(page.locator('#bot-b')).toHaveAttribute('data-weapon', 'titan-cannon');
  await expect(page.locator('#bot-a .bot-mark')).toHaveText('A');
  await expect(page.locator('#bot-b .bot-mark')).toHaveText('B');
  await expect(page.locator('#preview-a').getByText(/Gewicht \d+ \/ 90/)).toBeVisible();
  await page.getByLabel('Chassis A').selectOption('titan');
  await expect(page.locator('#bot-a')).toHaveAttribute('data-chassis', 'titan-chassis');
  await expect(page.locator('#preview-a').getByText('Struktur 130', { exact: true })).toBeVisible();
  await page.getByLabel('Motor A').selectOption('swift');
  await expect(page.locator('#preview-a').getByText('Tempo 1')).toBeVisible();
  await page.getByLabel('Panzerung A').selectOption('heavy');
  await expect(page.locator('#preview-a').getByText('Struktur 162.5', { exact: true })).toBeVisible();
  await page.getByLabel('Energie A').selectOption('capacity');
  await expect(page.locator('#preview-a').getByText(/Energie 112.5 · \+0.9900000000000001\/Tick/)).toBeVisible();
  await page.getByLabel('Sensor A').selectOption('short');
  await expect(page.locator('#preview-a').getByText('Sensor 21', { exact: true })).toBeVisible();
  await page.getByLabel('Sensor A').selectOption('standard');
  await page.getByLabel('Waffe A').selectOption('raptor');
  await expect(page.getByText(/Reichweite 28 · Schaden 8/)).toBeVisible();
  await page.getByLabel('Chassis A').selectOption('raptor');
  await page.getByLabel('Motor A').selectOption('heavy');
  await page.getByLabel('Panzerung A').selectOption('heavy');
  await page.getByLabel('Energie A').selectOption('capacity');
  await page.getByLabel('Sensor A').selectOption('long');
  await page.getByLabel('Waffe A').selectOption('titan');
  await expect(page.locator('#validation-a')).toContainText('überschreitet Limit 90');
  await expect(page.getByRole('button', { name: 'Start' })).toBeDisabled();
  await page.getByLabel('Chassis A').selectOption('titan');
  await expect(page.locator('#validation-a')).toHaveText('Konfiguration gültig');
  await expect(page.getByRole('button', { name: 'Start' })).toBeEnabled();
  await page.getByLabel('Chassis B').selectOption('raptor');
  await expect(page.locator('#bot-b')).toHaveAttribute('data-chassis', 'raptor-chassis');
  await expect(page.locator('#preview-b').getByText('Struktur 75', { exact: true })).toBeVisible();
  await page.getByLabel('Motor B').selectOption('swift');
  await expect(page.locator('#preview-b').getByText('Tempo 1.875')).toBeVisible();
  await page.getByLabel('Panzerung B').selectOption('light');
  await expect(page.locator('#preview-b').getByText('Struktur 60', { exact: true })).toBeVisible();
  await page.getByLabel('Energie B').selectOption('regen');
  await expect(page.locator('#preview-b').getByText(/Energie 90 · \+1.875\/Tick/)).toBeVisible();
  await page.getByLabel('Sensor B').selectOption('long');
  await expect(page.locator('#preview-b').getByText('Sensor 39', { exact: true })).toBeVisible();
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

test('shot events are rendered visibly', async ({ page }) => {
  await page.goto('/');
  const shot = page.locator('.shot-effect');
  for (let i = 0; i < 20 && await shot.count() === 0; i++) {
    await page.getByRole('button', { name: '1 Tick' }).click();
  }
  await expect(shot.first()).toBeAttached();
  await expect(shot.first()).toHaveAttribute('data-attacker', /robot-[ab]/);
});

test('hit and damage events are visible', async ({ page }) => {
  await page.goto('/');
  const damage = page.locator('.hit-effect');
  for (let i = 0; i < 20 && await damage.count() === 0; i++) await page.getByRole('button', { name: '1 Tick' }).click();
  await expect(damage.first()).toBeAttached();
  await expect(damage.first()).toHaveAttribute('data-target', /robot-[ab]/);
  await expect(damage.first()).toContainText(/-\d/);
  await expect(page.locator('.bot.is-hit')).toBeAttached();
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
  await expect(page.getByText('✓ Erledigt · Komponentenwahl Roboter B', { exact: false })).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Komponentenvalidierung und Builder-Grenzen')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Motoren als Komponente')
  ).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Panzerung als Komponente')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Energieversorgung als Komponente')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Sensorik als Komponente')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Gewichtslimits und gültige Komponentenkombinationen')).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Roboter optisch unterscheidbarer machen', { exact: false })).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Start/Reset repariert und Tests massiv ausgebaut', { exact: false })).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Waffen am Roboter sichtbar machen', { exact: false })).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Projektil- und Schusseffekte', { exact: false })).toBeVisible();
  await expect(page.getByText('✓ Erledigt · Treffer- und Schadenseffekte', { exact: false })).toBeVisible();
  await expect(page.getByText('NEXT-31: Konfiguration in eigenen Dialog auslagern', { exact: false })).toBeVisible();
});
