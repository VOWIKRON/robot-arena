# NEXT-110 RC5 – UI-Version und QA-Gate (29.10.2026, 15:00 Europe/Berlin)

**ENTWICKLUNGSBRANCH – NICHT VERÖFFENTLICHT – RELEASE NO-GO.**
Branch: `integration/NEXT-110-RC5-ui-version-20261029-1500`; Basis: `32be25aa731e1cdf198eaa85b0edf1f7389fad20`. Kein Merge nach main, kein Deployment, kein publish.php, kein Release-Workflow.

## Drei kleine Arbeitspakete (seriell)

### NEXT-110-UI-VERSION-FIX (P0) – Implementiert, CI offen
- **Ziel:** Veraltete Versionsanzeigen im App-Header (bisher v0.1.54) und Browser-Titel (bisher statisch v0.1.0) vermeiden; Version aus `package.json` ableiten.
- **Dateien:** `src/main.ts`, `index.html`, `package.json` (nur Referenz).
- **Akzeptanz:** `#app-version` und `document.title` stimmen mit `package.json.version` überein; vor JS-Start zeigt HTML keinen veralteten Versionswert; bei künftiger Versionsänderung keine weiteren Hardcodings erforderlich.
- **Test:** `npm run typecheck && npm run build`; Browserprüfung `npx playwright test e2e/version-label.spec.ts`.
- **Abhängigkeit:** RC5-Evidence-Branch; keine Änderung an `package.json.version` und kein Release.
- **Ergebnis:** Code und HTML geschrieben und zurückgelesen; noch kein vollständiger CI-Nachweis auf finaler SHA.

### NEXT-110-UI-VERSION-REG (P1) – Implementiert, CI offen
- **Ziel:** Regression verhindern, wenn Versionslabel und Seitentitel künftig wieder auseinanderlaufen.
- **Datei:** `e2e/version-label.spec.ts`.
- **Akzeptanz:** Vergleich mit `package.json.version` für sichtbaren Header und Browser-Titel in allen konfigurierten Chromium-/WebKit-Desktop-/Mobilprojekten.
- **Test:** `npx playwright test e2e/version-label.spec.ts`, danach `npm run test:e2e`.
- **Abhängigkeit:** NEXT-110-UI-VERSION-FIX.
- **Ergebnis:** Browser-Test geschrieben und zurückgelesen; CI offen.

### NEXT-110-RC5-UI-QA-GATE (P2) – Konfiguration/Dokumentation, CI offen
- **Ziel:** Isolierten QA-Push-Trigger für diesen Entwicklungsbranch und synchronisierte Nachweise/Backlog bereitstellen.
- **Dateien:** `.github/workflows/feature-qa.yml`, `RUN_STATE.md`, `PROJECT_STATE.md`, `BACKLOG.md`, `CHANGELOG.md`, `docs/NEXT-110-RC-RELEASE-GATE.md`, `docs/NEXT-79e-MANUAL-ACCEPTANCE.md`, `public/backlog.html`, `public/testsuite.html`, `public/release-notes.html`.
- **Akzeptanz:** Workflow ausschließlich für isolierten Branch erweitert, keine Release-/Publish-Aktion; Readback aller geänderten Dateien; vollständige Quality- und Provenienzjobs auf identischer finaler SHA erfolgreich.
- **Test:** GitHub-Readback, Branch-/PR-Compare, isolierte CI: `npm run typecheck && npm test && npm run build && npm run test:e2e`, Build-/Audit-Artefaktprovenienz.
- **Abhängigkeit:** P0/P1. **Vollständige CI auf neuer SHA nicht bestätigt; nicht als fertig getestet zählen.**

## Verifizierter Ausgangsstand und Blocker
- Letzte belegte Gesamt-CI: RC5 Commit `7e5778c1c8bb20041569d73e9a38f394bdee9473`, Actions #40862453416, **906/906** (566 Vitest + 40 Node + 300 Chromium/WebKit), Quality/Provenienz SUCCESS, Build-/Audit-Artefakte mit gültigen SHA-256-Digests.
- RC5-Evidence-HEAD `32be25aa731e1cdf198eaa85b0edf1f7389fad20` und dieser neue Branch benötigen einen **eigenen bestätigten vollständigen Push-CI-Nachweis**; ein leeres Ergebnis der auf PR-Events beschränkten Workflow-Abfrage beweist weder Erfolg noch Fehlschlag von Push-Runs.
- Kumulativ **112 bereits CI-bestätigte, nicht live bestätigte technische Unteraufgaben**: NEXT-110 E1/E2/E5–E101 (99), NEXT-108 A/B/C (3), NEXT-79e AUTO1–6/AUTO8–11 (10). NEXT-110 E3/E4 nicht separat nachgewiesen. Für ältere unklare PRs: **Veröffentlichungsstatus ungeklärt**. Neue Versionspakete erst nach CI zählen.
- Praktische NEXT-79e-Abnahme **0/4**: NVDA/Windows, VoiceOver/Safari, echtes Touch-Gerät und reale Kontrastmessung benötigen Hardware und dokumentierte Prüfergebnisse. NEXT-110 bleibt **NO-GO**.

## Rolling Backlog
1. **NEXT-110-RC5-UI-CI (P0):** Aktuellen Branch-HEAD auf Quality, Provenienz, Typecheck, Vitest, Node, Chromium/WebKit Desktop/Mobil, Build-/Audit-Digests prüfen; bei Fehlern nur auf Entwicklungsbranch beheben und erneut testen.
2. **NEXT-79e-1/2-REAL (P0):** Praktische NVDA-/VoiceOver-Abnahme mit Geräte-/Versions-/Fokus-/Ansageprotokoll. Bis Hardware/Prüfperson vorhanden: BLOCKIERT.
3. **NEXT-79e-3/4-REAL (P1):** Physische Touch-Abnahme und gemessene Kontrastwerte nach WCAG AA dokumentieren. Bis Hardware/Prüfperson vorhanden: BLOCKIERT.

**KEIN PUBLISHING. Kein main-Merge, Release-Commit, Release-Workflow, Homepage-Deployment, publish.php oder Änderung anderer Automationen.**
