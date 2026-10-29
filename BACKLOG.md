## 29.10.2026 · 23:00 · NEXT-114-A/B/C Zehn-Tick-Steuerung · NICHT VERÖFFENTLICHT
- **Status:** Live v0.1.62, main `2cbbda87ebfbead0f74ead24fa016b0857f4eaaa`, letzte nachgewiesene erfolgreiche Gesamt-CI #40946132427 **946/946** (568 Unit/Behavior/Determinismus, 42 Node, 336 Chromium/WebKit Desktop/Mobil); #40946601166 **FAILED** (343/344 WebKit). Aktuelle Push-CI auf NEXT-112-C/NEXT-113 und NEXT-114 **nicht SHA-genau verifiziert**, keine Freigabe.
- **P0 NEXT-114-A – IMPLEMENTIERT, CI OFFEN:** 10-Ticks-Schaltfläche pausiert laufenden Timer und führt maximal zehn deterministische Schritte aus; stoppt bei Endzustand und ist bei ungültiger Konfiguration deaktiviert. Dateien `src/main.ts`, `.github/workflows/feature-qa.yml`, `scripts/next108-verify-provenance.mjs`, `tests/next108-provenance.test.mjs`; PR #193. Test: `npm run typecheck && npm test && npm run build && npm run test:e2e`; abhängig von NEXT-113-B.
- **P1 NEXT-114-B – IMPLEMENTIERT, CI OFFEN:** 3 Browserregressionen (0→10→20/Reset, kein versteckter Tick nach Pause, identischer Seed nach zehn Einzelschritten), 12 Fälle Chromium/WebKit Desktop/Mobil. Dateien `e2e/ten-ticks.spec.ts`, `playwright.config.ts`; PR #194. Test: `npx playwright test e2e/ten-ticks.spec.ts && npm run test:e2e`; abhängig von NEXT-114-A.
- **P2 NEXT-114-C – IMPLEMENTIERT, CI OFFEN:** Refactoring zur reinen Funktion `advanceBoundedSteps` mit drei Unit-Tests (Reihenfolge, Endzustand, Grenzen). Dateien `src/main.ts`, `src/engine/batch-steps.ts`, `tests/batch-steps.test.ts` sowie Status-/HTML-Quellen; Test: `npx vitest run tests/batch-steps.test.ts && npm run typecheck && npm test && npm run build && npm run test:e2e`; abhängig von NEXT-114-B. QA/Provenienz/Artefakte erst auf finaler SHA bestätigen.
- **Kumulativ vollständig getestet, nicht live bestätigt: 127:** NEXT-110-E1/E2/E5–E101 (99); NEXT-108-A/B/C/D (4); NEXT-79e-AUTO1–6/AUTO8–11 (10); NEXT-110-UI-VERSION-FIX/REG/JSON-IMPORT-FIX/METADATA-GUARD/WEBKIT-REG (5); NEXT-110-FOOTER-ISOLATION-FIX/REG/HTTP-REG/SHAPE-REG/TIMEOUT-GUARD/TIMEOUT-REG/BOUNDARY-REG (7); NEXT-110-SMOKE-STRICT-FIX (1); NEXT-112-A (1). **99+4+10+5+7+1+1=127**. NEXT-112-B/C, NEXT-113-A/B, NEXT-114-A/B/C **nicht mitgezählt**. E3/E4 nicht eigenständig nachgewiesen; ältere PRs: **Veröffentlichungsstatus ungeklärt**.
- **Rolling Backlog:** (1) exakte CI auf aktuellem HEAD verifizieren und Fehler beheben; (2) weitere sichtbare Roboter-/Spielfunktionen entwickeln; (3) Regression/Refactoring. NEXT-79e praktische NVDA/VoiceOver/Touch/Kontrast-Abnahme 0/4, Release NO-GO. Kein main-Merge, Release, Publishing, Deployment oder Änderung anderer Automationen.

## 29.10.2026 · 22:00 · NEXT-112-C / NEXT-113-A/B – NICHT VERÖFFENTLICHT
- **Vorprüfung:** bestätigte Live-Version **v0.1.62**, main `2cbbda87ebfbead0f74ead24fa016b0857f4eaaa`. Letzte vollständige erfolgreiche Gesamt-CI **#40946132427: 946/946** (568 Unit/Behavior/Determinismus, 42 Node, 336 Chromium/WebKit Desktop/Mobil), Quality und Provenienz SUCCESS. Neue CI **#40946601166 FAILED**: 343/344 Browser, nur `desktop-webkit` in `e2e/combat-speed.spec.ts`, `Tick: 5` nach einem einzigen `clock.runFor(80)` nicht gefunden. Die Provenienz-Folgeprüfung scheiterte wegen fehlgeschlagener Quality. Keine Freigabe der neuen Commits vor neuer grüner Gesamt-CI.
- **P0 NEXT-112-C – IMPLEMENTIERT, CI OFFEN:** WebKit-Zeitsteuerungsregression: vier einzeln vorgerückte 20-ms-Intervalle mit jeweils exakt geprüften Tickwerten 2–5 statt eines 80-ms-Blocks. Dateien `e2e/combat-speed.spec.ts`, `.github/workflows/feature-qa.yml`, `scripts/next108-verify-provenance.mjs`, `tests/next108-provenance.test.mjs`; exakte fail-closed QA-Branchfreigabe. **Akzeptanz:** alle 344 bisherigen Browserprüfungen grün, keine geschwächte Tickprüfung; `npx playwright test e2e/combat-speed.spec.ts && npm run test:e2e`; Gesamt-QA/Provenienz. **Abhängigkeit:** NEXT-112-B, PR #189. Draft-PR #190.
- **P1 NEXT-113-A – NEU, IMPLEMENTIERT, CI OFFEN:** neue spielbare Tastatursteuerung: fokussierbare Kampfarena; Leertaste startet/pausiert den Sandbox-Kampf, ohne Formularfelder, Buttons oder Dialoge zu übersteuern. Wiederholte oder modifizierte Tastendrücke ignoriert. Datei `src/main.ts`. **Akzeptanz:** sichtbarer Hinweis, Fokus, Pause ohne Extratick, Simulation/Seed/RNG/Replay unverändert; `npm run typecheck && npm test && npm run build && npm run test:e2e`. **Abhängigkeit:** P0, bestehende Start/Pause-Funktionen. Draft-PR #191.
- **P2 NEXT-113-B – NEU, IMPLEMENTIERT, CI OFFEN:** zwei Browserregressionen für Start/Pause/Fortsetzen, Pausen-Tickstabilität sowie Nicht-Eingriff in Formulare/Dialoge/Modifier. Dateien `e2e/arena-shortcut.spec.ts`, `playwright.config.ts` (Chromium/WebKit Desktop/Mobil), neun Status-/HTML-Quellen. **Akzeptanz:** 2×4 Browserfälle plus komplette Unit-/Behavior-/Determinismus-/Node-/Browser-QA, Audit, reproduzierbarer Build und SHA-/Artefaktprovenienz; `npx playwright test e2e/arena-shortcut.spec.ts && npm run typecheck && npm test && npm run build && npm run test:e2e`. **Abhängigkeit:** NEXT-113-A. Draft-PR #192 vorgesehen.
- **Refactoring:** vorhandene Start-/Pause-Funktionen wiederverwendet; keine Änderung der deterministischen Engine. Exakte, überprüfbare QA-Branchfreigabe statt generischer Wildcards. Alle Änderungen auf drei separaten, seriell aufgebauten Entwicklungsbranches, kein main-Merge.
- **Kumulativ CI-bestätigt, nicht live: 127:** NEXT-110-E1/E2/E5–E101 (99: Replay, Turnier, Archiv, Determinismus); NEXT-108-A/B/C/D (4: Provenienz); NEXT-79e-AUTO1–6/AUTO8–11 (10: Tastatur/Animation/Kontrast); NEXT-110-UI-VERSION-FIX/REG/JSON-IMPORT-FIX/METADATA-GUARD/WEBKIT-REG (5); NEXT-110-FOOTER-ISOLATION-FIX/REG/HTTP-REG/SHAPE-REG/TIMEOUT-GUARD/TIMEOUT-REG/BOUNDARY-REG (7); NEXT-110-SMOKE-STRICT-FIX (1); NEXT-112-A (1). **Rechnung: 99+4+10+5+7+1+1=127.** NEXT-112-B/C und NEXT-113-A/B auf neuem HEAD **noch nicht als vollständig CI-bestätigt** gezählt. E3/E4 nicht unabhängig belegt; alte PRs ohne Live-Abgleich: **Veröffentlichungsstatus ungeklärt**.
- **Rolling Backlog:** (1) WebKit-Speed-Regression auf finaler SHA verifizieren und bei tatsächlichem Fehler korrigieren; (2) NEXT-113-A/B Chromium/WebKit Desktop/Mobil abnehmen; (3) weitere sichtbare Roboter-/Arena-Funktionen statt wiederholter Footer-Mikrotests. NEXT-79e echte NVDA/VoiceOver/Touch/Kontrast-Abnahme **0/4**; NEXT-110-Release **NO-GO**. **KEIN PUBLISHING**, kein Release, Deployment, main-Merge oder Änderung anderer Automationen.

## 29.10.2026 · 21:05 · NEXT-108-D + NEXT-112-A/B – NICHT VERÖFFENTLICHT
- **Vorprüfung:** main `2cbbda87ebfbead0f74ead24fa016b0857f4eaaa`; bestätigte Live-Version **v0.1.62**. Letzte grüne Gesamt-CI #40917730455 auf `61018a4f956e3104ff951295d42dcd8f480a885e`: **931/931** (566 Vitest, 41 Node, 324 Chromium/WebKit Desktop/Mobil), Quality/Provenienz SUCCESS. CI für diese Runde noch offen; frühere #40936661593/#40936739059: Quality SUCCESS, Provenienz FAILED (unerlaubter QA-Branch); #40936902536: Quality FAILED. Keine Scheinabschlüsse.
- **P0 NEXT-108-D – IMPLEMENTIERT, CI OFFEN:** exakte Branch-Freigabe für Smoke, Boundary, Docs und NEXT-112 in `scripts/next108-verify-provenance.mjs`; positive/negative Node-Tests und QA-Workflow. PR #187. Ziel: `unexpected QA branch` beheben, unbekannte Branches fail-closed halten. Akzeptanz: SHA/Run/Artefakte passen, `node --test tests/next108-provenance.test.mjs` und Gesamt-QA erfolgreich. Abhängigkeit: Smoke-Fix PR #184.
- **P1 NEXT-112-A – NEU, IMPLEMENTIERT, CI OFFEN:** neue sichtbare Spielfunktion Kampfgeschwindigkeit 0,5×/1×/2×/4×; Timerwechsel ohne zusätzlichen Tick, Reset 1×. Dateien: `src/main.ts`, `src/style.css`, `src/engine/combat-speed.ts`, `tests/combat-speed.test.ts`. PR #188. Akzeptanz: 160/80/40/20 ms, Engine/RNG/Replay unverändert; `npx vitest run tests/combat-speed.test.ts` + Gesamt-QA. Abhängigkeit: P0.
- **P2 NEXT-112-B – NEU, IMPLEMENTIERT, CI OFFEN:** zwei Browserregressionen für Tempoänderung, Pause, Reset und Seed-Determinismus in `e2e/combat-speed.spec.ts`; `playwright.config.ts` deckt Chromium/WebKit Desktop/Mobil ab (8 neue Browserfälle). Refactoring: reine `combatIntervalMs`-Funktion; Engine unverändert. Akzeptanz: `npx playwright test e2e/combat-speed.spec.ts`, `npm run typecheck && npm test && npm run build && npm run test:e2e`, SHA-gebundene Build-/Audit-Artefakte und Provenienz. Abhängigkeit: P1.
- **Kumulativ CI-getestet, nicht live bestätigt: 121:** NEXT-110-E1/E2/E5–E101 (99: Replay/Turnier/Archiv/Determinismus); NEXT-108-A/B/C (3: Provenienz); NEXT-79e-AUTO1–6/AUTO8–11 (10: Tastatur/Animation/Kontrast); NEXT-110-UI-VERSION-FIX/REG/JSON-IMPORT-FIX/METADATA-GUARD/WEBKIT-REG (5: Version); NEXT-110-FOOTER-ISOLATION-FIX/REG/HTTP-REG/SHAPE-REG (4: Footer). NEXT-110-E3/E4 nicht eigenständig belegt; Alt-PRs: **Veröffentlichungsstatus ungeklärt**. Neue NEXT-108-D/NEXT-112-A/B und Timeout/Smoke/Boundary **noch nicht mitgezählt**.
- **Rolling Backlog:** (1) finale Gesamt-CI/Provenienz prüfen und echte Fehler beheben; (2) NEXT-112-A/B erst nach grünem finalen HEAD als getestet zählen; (3) weitere sichtbare Spielfunktion auf separatem Branch statt Footer-Mikrotests. NEXT-79e reale NVDA/VoiceOver/Touch/Kontrast-Abnahmen **0/4**; NEXT-110 Release **NO-GO**. Kein main-Merge, Release, Deployment, publish.php oder andere Automation verändert.

## 29.10.2026 · 20:00 · NEXT-110 CI-Fehlerdiagnose und Reparatur – NICHT VERÖFFENTLICHT
- **Vorprüfung:** main `2cbbda87ebfbead0f74ead24fa016b0857f4eaaa`, bestätigte Live-Version v0.1.62. Vorherige grüne CI #40917730455 auf `61018a4f956e3104ff951295d42dcd8f480a885e`: 566 Vitest + 41 Node + 324 Browser = 931/931, Quality/Provenienz erfolgreich. Kumulativ **121** getestete technische Unteraufgaben nicht live bestätigt. Liste: NEXT-110-E1/E2/E5–E101 (99; Replay, Turnier, Determinismus, Recovery), NEXT-108-A/B/C (3; Provenienz), NEXT-79e-AUTO1–6/AUTO8–11 (10; Barrierefreiheit), NEXT-110-UI-VERSION-FIX/REG/JSON-IMPORT-FIX/METADATA-GUARD/WEBKIT-REG (5; Version), NEXT-110-FOOTER-ISOLATION-FIX/REG/HTTP-REG/SHAPE-REG (4; Metadaten). NEXT-110-E3/E4 nicht nachgewiesen; Alt-PRs ohne Live-Abgleich: **Veröffentlichungsstatus ungeklärt**.
- **P0 NEXT-110-SMOKE-STRICT-FIX – IMPLEMENTIERT, CI OFFEN:** Die CI #40926772493 auf `bd9ff491e0128f600354e59cbcbfbb3d9e4f0ebd` ist **FAILED** (330/332 Browser, 2 Fehler Chromium Desktop/Mobil; 566/566 Unit, 41/41 Node erfolgreich). Ursache: `getByRole('heading', { name: 'Backlog' })` matcht sowohl H1 Backlog als auch neue H2-Überschrift. Fix `exact: true` in `e2e/smoke.spec.ts`, isolierter QA-Trigger; PR #184, SHA `52ab57e017ee0da71c38a2e97d24fc67d424d986`. Akzeptanz: Smoke auf Desktop/Mobil, volle Chromium/WebKit-Matrix, TypeScript, Unit/Behavior/Determinismus, Node, reproduzierbarer Build und Provenienz auf finalem HEAD. Test: `npx playwright test e2e/smoke.spec.ts && npm run test:e2e`. Abhängigkeit: PR #183. **Nicht CI-bestätigt**.
- **P1 NEXT-110-FOOTER-BOUNDARY-REG – NEU, IMPLEMENTIERT, CI OFFEN:** Zwei getrennte Metadatenantworten nach 2500 ms (unter 3500-ms-Abbruchgrenze) müssen beide sichtbar sein; Build-Version/Titel bleiben stabil. Dateien: `e2e/version-label.spec.ts`, isolierter QA-Trigger. PR #185, SHA `2335a79c7ea9ea4120cf124ad602712fa92e74dd`. Akzeptanz: ein neuer Test x vier Chromium/WebKit Desktop/Mobil-Projekte plus Gesamtregression/Provenienz. Test: `npx playwright test e2e/version-label.spec.ts && npm run test:e2e`. Abhängigkeiten: Timeout-Guard PR #182, Smoke-Fix PR #184. **Nicht CI-bestätigt**.
- **P2 NEXT-110-RC5-FAIL-EVIDENCE – DOKUMENTIERT, eigene CI OFFEN:** RUN_STATE, PROJECT_STATE, BACKLOG, CHANGELOG, Release-Gate, manuelle Abnahme und drei HTML-Informationsquellen aktualisiert; QA-Workflow um diesen isolierten Dokumentationsbranch erweitert. Akzeptanz: alle neun Status-/HTML-Dateien konsistent, keine Produktionscodeänderung, neue QA auf finaler SHA. Test: GitHub Datei-Rücklesen, `npm run typecheck && npm test && npm run build && npm run test:e2e`. Abhängigkeit: P0/P1. **Refactoring:** selektiver Smoke-Locator, kein Produktionscode-Refactoring; Regression nach Änderung offen.
- **Rolling Backlog:** (1) finale CI auf Dokumentations-HEAD prüfen und Fehler beheben, (2) NEXT-79e-AUTO12 Fokus-/Tastaturregression auf eigenem Branch, (3) reale NVDA/VoiceOver/Touch/Kontrast-Abnahmen (0/4; Hardware/Prüfperson fehlen). NEXT-110 Release **NO-GO**. Timeout-Guard/Timeout-REG aus PR #182/#183 weiterhin implementiert, aber **nicht** zu den 121 gezählt. Keine Veröffentlichung, kein main-Merge, kein Release-Workflow, kein Deployment, kein publish.php, keine anderen Automationen ändern.

## 29.10.2026 · 19:00 · RC5 931/931 QA-NACHWEIS + FOOTER-TIMEOUT-BACKLOG · NICHT LIVE
- **P0 NEXT-110-RC5-EVIDENCE-SYNC – DOKUMENTIERT:** GitHub Actions #40917730455 (https://github.com/VOWIKRON/robot-arena/actions/runs/40917730455), exakte SHA `61018a4f956e3104ff951295d42dcd8f480a885e`, Quality und Provenienz SUCCESS; 566 Unit/Behavior/Determinismus + 41 Node/Provenienz + 324 Chromium/WebKit Desktop/Mobil = **931/931**. Build-Artefakt #12916543545 SHA-256 fd446337167afb700404a0e82e7dd49c28d9aa40b594d63936b7c83612ac0bd5; Audit-Artefakt #12916217709 SHA-256 6ad46ba5f150af8c8240e7afc25f281e6e09ebeeaffde2fa08c7446f0a7f800c; beide nicht abgelaufen, zu Run und SHA passend. Neu CI-bestätigt: NEXT-110-FOOTER-HTTP-REG und NEXT-110-FOOTER-SHAPE-REG. Dateien: Status- und HTML-Informationsquellen; Test: GitHub Actions Jobs/Artefakte/SHA. Abhängigkeit: PR #180. **121** technische Unteraufgaben auf kombiniertem Entwicklungsstand getestet, nicht live bestätigt.
- **P1 NEXT-110-FOOTER-TIMEOUT-GUARD – IN ARBEIT / CI OFFEN:** Ziel: ein dauerhaft hängender Metadaten-Fetch darf den anderen Footerwert nicht blockieren. Betroffene Datei: `src/main.ts`. Akzeptanz: pro Quelle begrenzte Wartezeit, Abbruchsignal, Timer-Aufräumen, sichere Fallback-Werte, gültige andere Quelle sichtbar, Version aus package.json unverändert. Test: `npm run typecheck && npm test && npm run build && npm run test:e2e`. Abhängigkeit: NEXT-110-FOOTER-ISOLATION-FIX. **Nicht als getestet zählen vor erfolgreicher CI.**
- **P2 NEXT-110-FOOTER-TIMEOUT-REG – IN ARBEIT / CI OFFEN:** Ziel: verzögerte/hängende Antworten für jede der beiden Quellen in Chromium/WebKit Desktop/Mobil simulieren. Dateien: `e2e/version-label.spec.ts`, isolierter QA-Branch-Trigger `.github/workflows/feature-qa.yml`. Akzeptanz: 2 Browserfälle x 4 Projekte, jeweils andere Quelle bleibt sichtbar, Timeout-Quelle fällt auf „noch nicht verfügbar“ zurück, Build-Version bleibt unverändert; vollständige CI/Provenienz auf finaler SHA. Test: `npx playwright test e2e/version-label.spec.ts`, danach Gesamt-QA. Abhängigkeit: P1. **Nicht als getestet zählen vor erfolgreicher CI.**
- **Kumulative Liste (alle nicht live bestätigt):** NEXT-110-E1/E2/E5–E101 = 99 (Replay/Turniere/Archiv-Recovery/Determinismus/Regression); NEXT-108-A/B/C = 3 (Provenienz); NEXT-79e-AUTO1–6/AUTO8–11 = 10 (Tastatur/Reduced Motion/Kontrast); NEXT-110-UI-VERSION-FIX/REG/JSON-IMPORT-FIX/METADATA-GUARD/WEBKIT-REG = 5 (Versionsanzeige/Browser); NEXT-110-FOOTER-ISOLATION-FIX/REG/HTTP-REG/SHAPE-REG = 4 (Footer-Fehlerisolierung/Negativtests). **Gesamt 121**; NEXT-110-E3/E4 nicht eigenständig belegt; andere Alt-PRs: **Veröffentlichungsstatus ungeklärt**. Neue Timeout-Aufgaben nicht eingerechnet.
- **Rolling Backlog:** (1) Timeout-Guard und zwei Browserfälle implementieren, (2) isolierte vollständige QA mit Provenienz und Artefakten auf finaler SHA prüfen, (3) reale NVDA/VoiceOver/Touch/Kontrast-Abnahmen. Praktische Abnahmen 0/4, Hardware/Prüfperson fehlen; **NEXT-110 RELEASE NO-GO**. Keine Veröffentlichung, kein main-Merge, kein Release/Deployment/publish.php, keine anderen Automationen ändern.

## 29.10.2026 · 18:00 · RC5 FOOTER-NEGATIVREGRESSION – NICHT LIVE
- **P0 NEXT-110-FOOTER-ISOLATION-CI – ABGESCHLOSSEN:** QA [#40908164494](https://github.com/VOWIKRON/robot-arena/actions/runs/40908164494) auf `3587067a3886ff480570b74a0e44bc37de804a9f`: **923/923** (566 Vitest/Behavior/Determinismus, 41 Node/Provenienz, 316 Chromium/WebKit Desktop/Mobil). Quality und Provenienz SUCCESS, Typecheck, Audit und reproduzierbarer Build erfolgreich. Artefakte Build #12912637909 (sha256:a150fab70669fd2db0361046351221f25542c9b489747a0b855a7dc599f18c6e) und Audit #12911723089 (sha256:12f0df29d262f97877b20d2db5da25a1c18d05676db7b829e635ded3c7e0363e) vorhanden, nicht abgelaufen, richtige SHA/Run. Ziel: unabhängige Footer-Fehlerbehandlung und Browserregression bestätigen. Dateien: `src/main.ts`, `e2e/version-label.spec.ts`. Akzeptanz: 2/2 Jobs und Artefakte erfolgreich. Test: GitHub Actions Quality/Provenienz + Logzählung. Abhängigkeit: PR #178. **2 zuvor offene Aufgaben FIX/REG jetzt CI-bestätigt.**
- **P1 NEXT-110-FOOTER-HTTP-REG – NEU, IMPLEMENTIERT, CI OFFEN:** `e2e/version-label.spec.ts` testet HTTP 503 für `build-info.json` mit scheinbar gültigem JSON; gültige `version.json` muss sichtbar bleiben, Termin unbekannt, Build-Version unverändert. `.github/workflows/feature-qa.yml` isolierter QA-Trigger. Ziel: Statusfehler dürfen keinen gültigen Footerwert löschen. Akzeptanz: Chromium/WebKit Desktop/Mobil 4/4, vollständige QA und SHA-/Artefaktprovenienz. Test: `npx playwright test e2e/version-label.spec.ts` + `npm run typecheck && npm test && npm run build && npm run test:e2e`. Abhängigkeit: P0; Draft-PR #179. **Nicht als getestet zählen bis CI.**
- **P2 NEXT-110-FOOTER-SHAPE-REG – NEU, IMPLEMENTIERT, CI OFFEN:** `e2e/version-label.spec.ts` prüft Array statt Objekt für `version.json`; Publikationsfelder müssen unbekannt bleiben, gültiger Termin sichtbar und Build-Version unverändert. Isolierter QA-Trigger und neun Dokumentations-/HTML-Quellen synchronisiert. Akzeptanz: Chromium/WebKit Desktop/Mobil 4/4, Gesamtregression und Provenienz auf finaler SHA. Test: `npx playwright test e2e/version-label.spec.ts` + vollständige QA. Abhängigkeit: P0, HTTP-Branch nur als technischer Vorfahr; Draft-PR gegen P1. **Nicht als getestet zählen bis CI.**
- **Kumulativ seit bestätigtem Live v0.1.62:** **119** CI-getestete, noch nicht live bestätigte technische Unteraufgaben: NEXT-110-E1/E2/E5–E101 = 99; NEXT-108-A/B/C = 3; NEXT-79e-AUTO1–6/AUTO8–11 = 10; NEXT-110-UI-VERSION-FIX/REG/JSON-IMPORT-FIX/METADATA-GUARD/WEBKIT-REG = 5; NEXT-110-FOOTER-ISOLATION-FIX/REG = 2. Neue HTTP-/SHAPE-REG noch offen, nicht zählen. NEXT-110-E3/E4 nicht eigenständig nachgewiesen. Für andere Alt-PRs ohne eindeutigen Live-Abgleich: **Veröffentlichungsstatus ungeklärt**.
- **Rolling Backlog:** (1) CI auf beiden neuen QA-Branches inkl. 2 Jobs und Artefakt-SHA prüfen, Fehler vor Abschluss beheben; (2) NEXT-79e reale NVDA/VoiceOver-Prüfung unter Windows/Safari mit Geräten und protokollierten Belegen; (3) NEXT-79e reale Touch- und gemessene Kontrastprüfung. Praktische Abnahme 0/4, reale Hardware/Prüfperson fehlen. **NEXT-110 RELEASE NO-GO.** Keine Produktionscode-Refaktorierung in dieser Runde; zwei unabhängige Browserregressionen ergänzen bestehende Absicherung. **NICHT VERÖFFENTLICHT.** Kein main-Merge, Release, Deployment, publish.php oder Änderung anderer Automationen.

## 29.10.2026 · 17:00 · RC5 FOOTER-RESILIENZ – NICHT LIVE, NEUE CI AUSSTEHEND
- **P0 NEXT-110-RC5-UI-REPAIR-CI (abgeschlossen):** Isolierte QA #40897141030 auf SHA `a963cb29a3390e32e7f6a74cd0cfdcb3c4048c1d`: Quality SUCCESS, Provenienz SUCCESS, **915/915** (566 Vitest, 41 Node, 308 Chromium/WebKit Desktop/Mobil). Build-Artefakt 12907148443 SHA-256 `a1207b514de01fab2183afbe9f646323641d177cc5566a458788af0d9632717c`, Audit-Artefakt 12907701505 SHA-256 `08ecd03397b1d35ece258652be9c5f263d195671ab8e57b8cd8382cf36eef688`, beide nicht abgelaufen und exakt an Run/Branch/SHA gebunden. Akzeptanz: 2/2 Jobs und Artefakte erfolgreich, kein Release. Test: CI-Protokolle, Jobs, Artefakt- und SHA-Prüfung. Abhängigkeit: PR #177.
- **P1 NEXT-110-FOOTER-ISOLATION-FIX (implementiert, neue CI offen):** Ein defekter JSON-Endpunkt oder Netzwerkfehler darf nicht mehr alle Footer-Werte verwerfen. Datei: `src/main.ts`; `readFooterJson()` kapselt Fetch, HTTP-Status, JSON-Parsing und Datentypprüfung je Quelle; gültige Publikations- und Terminangaben bleiben unabhängig sichtbar, Versionslabel unverändert. Akzeptanz: gültiger Endpunkt bleibt sichtbar, ungültiger wird einzeln als „noch nicht verfügbar“ markiert. Test: `npm run typecheck && npm test && npm run build && npm run test:e2e`. Abhängigkeit: P0.
- **P2 NEXT-110-FOOTER-ISOLATION-REG (implementiert, neue CI offen):** Zwei Playwright-Regressionen für kaputtes Build-JSON bei gültiger Veröffentlichung und Netzwerkausfall bei gültigem nächsten Termin. Datei: `e2e/version-label.spec.ts`; Chromium/WebKit Desktop/Mobil (4 Projekte, +8 Browserfälle), zusätzlich `.github/workflows/feature-qa.yml` nur für den isolierten Branch. Akzeptanz: beide Fehlerfälle mit unabhängigen Footer-Werten und unverändertem Build-Versionslabel erfolgreich; vollständige Quality-/Provenienz-CI auf finaler SHA. Test: `npx playwright test e2e/version-label.spec.ts`, danach komplette QA. Abhängigkeit: P1.
- **Kumulativ seit bestätigtem Live v0.1.62:** **117** auf vorherigem HEAD getestet, nicht live bestätigt: NEXT-110-E1/E2/E5–E101 (99), NEXT-108-A/B/C (3), NEXT-79e-AUTO1–6/AUTO8–11 (10), NEXT-110-UI-VERSION-FIX, NEXT-110-UI-VERSION-REG, NEXT-110-UI-JSON-IMPORT-FIX, NEXT-110-UI-METADATA-GUARD, NEXT-110-UI-WEBKIT-REG (5). NEXT-110-E3/E4 nicht separat belegt. Ältere ungeklärte PRs: **Veröffentlichungsstatus ungeklärt**. Neue P1/P2 bis zur CI **nicht mitzählen**.
- **Rolling Backlog:** (1) NEXT-110-FOOTER-ISOLATION-CI: neue Gesamt-CI und Artefakte auf finaler SHA bestätigen, Fehler beheben; (2) NEXT-79e-1/2-REAL: NVDA/Windows + VoiceOver/Safari real abnehmen; (3) NEXT-79e-3/4-REAL: echtes Touch und gemessene Kontraste. Praktische Abnahme weiterhin **0/4** (Hardware/Prüfperson fehlen); NEXT-110 **NO-GO**. **KEIN PUBLISHING, kein main-Merge, kein Release-/Deployment-Workflow, kein publish.php, keine Änderung anderer Automationen.**

## 29.10.2026 · 16:00 · RC5 UI-E2E REPAIR – 3 PAKETE IMPLEMENTIERT, CI OFFEN · NICHT LIVE
- **NEXT-110-UI-JSON-IMPORT-FIX (P0):** CI #40886959779 scheiterte beim Playwright-Start: Node 22 verlangt für einen JSON-ESM-Import `type: json`. Datei `e2e/version-label.spec.ts`: stattdessen `readFileSync(new URL('../package.json', import.meta.url))`. Akzeptanz: Playwright startet, UI-Label und Titel entsprechen Paketversion. Test: `npx playwright test e2e/version-label.spec.ts --project=desktop-chromium` und vollständige QA. Abhängigkeit: NEXT-110-UI-VERSION-FIX. **CI offen.**
- **NEXT-110-UI-METADATA-GUARD (P1):** `loadFooterMetadata()` überschreibt das Build-Versionslabel nicht mehr mit potenziell veralteten `version.json`/`build-info.json`-Werten. Dateien `src/main.ts`, `e2e/version-label.spec.ts`; zusätzlicher Test mit absichtlich abweichenden Footer-Metadaten. Akzeptanz: Footer aktualisiert, Header und Titel bleiben bei Paketversion. Test: `npx playwright test e2e/version-label.spec.ts`, Unit/Behavior/Regression/Determinismus und Build. Abhängigkeit: P0. **CI offen.**
- **NEXT-110-UI-WEBKIT-REG (P2):** `playwright.config.ts` hatte den Versions-Test nicht in der WebKit-`testMatch`-Liste; jetzt in Chromium/WebKit Desktop/Mobil aktiv. `.github/workflows/feature-qa.yml` erlaubt ausschließlich den neuen isolierten QA-Push-Branch `integration/NEXT-110-RC5-ui-e2e-repair-20261029-1600`. Akzeptanz: beide Versionstests in allen vier Browserprojekten grün, Quality und Provenienz mit korrekter SHA/Build-/Audit-Artefakten. Test: `npx playwright test e2e/version-label.spec.ts`, `npm run typecheck && npm test && npm run build && npm run test:e2e`. Abhängigkeiten: P0/P1. **CI offen.**
- **Letzte bestätigte vollständige CI:** #40862453416, SHA `7e5778c1c8bb20041569d73e9a38f394bdee9473`, **906/906** (566 Unit/Behavior/Regression/Determinismus + 40 Node + 300 Chromium/WebKit), Quality und Provenienz SUCCESS. **Neue CI auf finalem Reparatur-HEAD offen; fehlgeschlagene #40886959779 ist kein Nachweis.**
- **Kumulativ seit bestätigtem Live v0.1.62:** weiterhin **112** auf RC5 getestete, nicht live bestätigte technische Unteraufgaben: NEXT-110-E1/E2/E5–E101 (99), NEXT-108-A/B/C (3), NEXT-79e-AUTO1–6/AUTO8–11 (10). E3/E4 nicht eigenständig belegt; ältere unklare PRs: **Veröffentlichungsstatus ungeklärt**. Neue Reparaturen bis zur vollständigen CI **nicht mitzählen**.
- **Rolling Backlog:** (1) NEXT-110-RC5-UI-REPAIR-CI: Quality/Provenienz auf finaler SHA und Artefakte prüfen, ggf. Fehler beheben; (2) NEXT-79e-1/2-REAL: NVDA/Windows und VoiceOver/Safari real abnehmen; (3) NEXT-79e-3/4-REAL: physische Touch- und gemessene Kontrastabnahme. Für 2/3 fehlen Hardware/Prüfperson. Praktische Abnahme **0/4**, NEXT-110 **NO-GO**. **NICHT VERÖFFENTLICHT, kein main-Merge, Release-Workflow, Deployment, publish.php oder Änderung anderer Automationen.**

## 29.10.2026 · 15:00 · RC5 UI-VERSION FIX + REGRESSION – CI OFFEN · NICHT LIVE
- **NEXT-110-UI-VERSION-FIX (P0, implementiert):** Falsche fest codierte Versionsangaben in `src/main.ts` (v0.1.54) und `index.html` (v0.1.0) beseitigt; Header und Seitentitel verwenden jetzt `package.json.version` (aktuell v0.1.62). Akzeptanz: identische Version in UI/Titel und Paketmetadaten. Test: `npm run typecheck && npm run build` sowie Browserregression. Abhängigkeit: RC5 Evidence. **CI offen.**
- **NEXT-110-UI-VERSION-REG (P1, implementiert):** `e2e/version-label.spec.ts` prüft sichtbares Versionslabel und Browser-Titel gegen Paketversion in Chromium/WebKit Desktop/Mobil. Akzeptanz: alle Browserprojekte grün. Test: `npx playwright test e2e/version-label.spec.ts`, danach vollständige `npm run test:e2e`. Abhängigkeit: P0. **CI offen.**
- **NEXT-110-RC5-UI-QA-GATE (P2, konfiguriert):** Exakter isolierter Push-QA-Branch in `.github/workflows/feature-qa.yml` ergänzt, Dokumentation/HTML aktualisiert; Readback erforderlich. Test: `npm run typecheck && npm test && npm run build && npm run test:e2e`, Quality/Provenienz und SHA-256-Artefakte auf finaler SHA. Abhängigkeit: P0/P1. **Kein neuer CI-Abschluss behauptet.**
- **Letzte bestätigte CI:** RC5 `7e5778c1c8bb20041569d73e9a38f394bdee9473`, #40862453416, **906/906** (566 Vitest + 40 Node + 300 Chromium/WebKit), Quality/Provenienz SUCCESS. Neue Branch-SHA noch nicht CI-bestätigt.
- **Kumulativ seit bestätigtem Live v0.1.62:** **112** getestete, nicht live bestätigte technische Unteraufgaben: NEXT-110 E1/E2/E5–E101 (99), NEXT-108 A/B/C (3), NEXT-79e AUTO1–6/AUTO8–11 (10). Neue Versionspakete **noch nicht mitzählen**. E3/E4 nicht separat belegt; andere alte PRs: **Veröffentlichungsstatus ungeklärt**.
- **Rolling Backlog:** (1) RC5-UI-CI auf finaler SHA mit Artefakten bestätigen/Fehler beheben; (2) NEXT-79e-1/2 echte NVDA-/VoiceOver-Abnahme; (3) NEXT-79e-3/4 echtes Touch und gemessene Kontraste. Praktische Abnahme **0/4**, Hardware/Prüfperson fehlen, NEXT-110 **NO-GO**. Details: `docs/NEXT-110-RC5-UI-VERSION-REVIEW-20261029.md`. **NICHT VERÖFFENTLICHT; kein main-Merge, Release-Workflow, Deployment, publish.php oder andere Automationen.**

## 29.10.2026 · 14:00 · RC5 EVIDENCE QA – VORBEREITET, CI OFFEN · NICHT LIVE
- **NEXT-110-RC5-EVIDENCE-CI-A (P0, Konfiguration umgesetzt):** Auf eigenem Entwicklungsbranch exakten Push-Trigger für `integration/NEXT-110-RC5-evidence-qa-20261029-1400` in `.github/workflows/feature-qa.yml` ergänzt, ohne Release-/Publish-Schritte. Akzeptanz: ausschließlich der vorgesehene QA-Branch, keine Änderung an main; Test: GitHub-Datei-Readback, danach isolierte Feature-QA `npm run typecheck && npm test && npm run build && npm run test:e2e` samt Provenienz. Abhängigkeit: Dokumentations-HEAD `bc1dc33e4bac8844c17a275b15b854aa382c91e3`. **Workflow-Ergebnis auf finaler SHA noch offen.**
- **NEXT-108-RC5-EVIDENCE-TEST (P1, Regression implementiert):** `tests/next108-provenance.test.mjs` um positiven exakten RC5-Evidence-Branch und negative SHA-/Artefakt-/main-Abweichungen ergänzt. Akzeptanz: PASS nur für korrekte Branch-/SHA-/Artefaktidentität, `releaseAuthorized=false`; Test: `npm test` plus volle isolierte QA. Abhängigkeit: NEXT-110-RC5-EVIDENCE-CI-A. **Implementiert, vollständige CI offen.**
- **NEXT-110-RC5-EVIDENCE-DOCS (P2, Dokumentation):** `RUN_STATE.md`, `PROJECT_STATE.md`, `BACKLOG.md`, `CHANGELOG.md`, `docs/NEXT-110-RC-RELEASE-GATE.md`, `docs/NEXT-79e-MANUAL-ACCEPTANCE.md` und drei HTML-Informationsseiten synchronisieren; danach exakten QA-Branch aus finaler Dokumentations-SHA anlegen und alle Quality-/Provenienzjobs prüfen. Akzeptanz: Readback aller neun Dateien, gleiche Zählung, NO-GO, keine Live-Änderung. Test: GitHub-Datei-Readback und isolierte QA. Abhängigkeit: P0/P1. **Bis zur finalen CI nicht als getestet abgeschlossen zählen.**
- **Letzte vollständig bestätigte CI:** RC5 `7e5778c1c8bb20041569d73e9a38f394bdee9473`, Workflow #40862453416: **906/906** (566 Vitest + 40 Node + 300 Chromium/WebKit Desktop/Mobil), Quality und Provenienz SUCCESS. Neue QA-Regression darf erst nach eigener vollständiger CI hinzugezählt werden.
- **Kumulativ seit bestätigtem Live v0.1.62:** **112 technisch getestete, nicht live bestätigte Unteraufgaben:** NEXT-110-E1/E2/E5–E101 = 99 (E3/E4 nicht eigenständig belegt); NEXT-108-A/B/C = 3; NEXT-79e-AUTO1–6/AUTO8–11 = 10. Neue NEXT-108-RC5-EVIDENCE-TEST **CI OFFEN, nicht mitzählen**. Andere Alt-PRs: **Veröffentlichungsstatus ungeklärt**.
- **Rolling Backlog:** (1) finalen Evidence-QA-Run auf exakter SHA inkl. Build-/Audit-Digests bestätigen oder Fehler beheben; (2) NEXT-79e-1/2 reale NVDA-/VoiceOver-Abnahme mit Geräte-/Versions-/Belegprotokoll; (3) NEXT-79e-3/4 reale Touch- und WCAG-Kontrastabnahme. Praktische Abnahme **0/4**, ohne Hardware/Prüfperson BLOCKIERT, NEXT-110 **NO-GO**. Kein Refactoring am Produktionscode erforderlich. **NICHT VERÖFFENTLICHT – nur manuelle Veröffentlichung, kein main-Merge, Release-Workflow, publish.php, Homepage-Deployment oder andere Automationen.**

## 29.10.2026 · 13:00 · NEXT-110 RC5 QA bestätigt · NICHT VERÖFFENTLICHT
- **NEXT-110-RC5-CI:** GitHub Actions [#40862453416](https://github.com/VOWIKRON/robot-arena/actions/runs/40862453416) auf `7e5778c1c8bb20041569d73e9a38f394bdee9473`: Quality und Provenienz SUCCESS, **566 Vitest + 40 Node + 300 Chromium/WebKit Desktop/Mobil = 906/906**; Typecheck, Audit (0 bekannte Advisories), reproduzierbarer Build und zwei gültige SHA-256-Artefakte (Build #12892821071, Audit #12891947636). Test: `npm run typecheck && npm test && npm run build && npm run test:e2e` + Provenienz. Abhängigkeit: RC5/AUTO8–11. **Abgeschlossen auf RC5-Quell-SHA, nicht auf neuer Dokumentations-SHA.**
- **NEXT-110-RC5-REVIEW:** GitHub-Compare RC5 gegen `main`: 83 voraus, 0 zurück; gegen RC4: 25 voraus, 0 zurück. PR #173 und die Vorläufer #169/#170/#171 offen, nicht gemergt. Kein doppelter oder riskanter Merge. Test: GitHub-Compare und PR-Readback. Abhängigkeit: RC5-CI.
- **NEXT-110-RC5-EVIDENCE:** Nur Dokumentations-/HTML-Synchronisation auf separatem Branch; Readback und PR-Diff, keine neue Produktionsfunktion, kein zusätzliches Refactoring. Details mit Ziel, Dateien, Akzeptanzkriterien, Testkommando und Abhängigkeiten: `docs/NEXT-110-RC5-CI-REVIEW-20261029.md`. Für die Dokumentations-SHA noch keine vollständige CI bestätigt.
- **NEU:** NEXT-79e-AUTO10 (Fail-Closed-Kontrastberechnung) und AUTO11 (positive/negative Kontrastregression) CI-bestätigt. **112 getestete, nicht live bestätigte technische Unteraufgaben:** NEXT-110-E1/E2/E5–E101 (99; E3/E4 nicht separat nachgewiesen), NEXT-108-A/B/C (3), NEXT-79e-AUTO1–6/AUTO8–11 (10). Für andere ältere PRs: **Veröffentlichungsstatus ungeklärt**.
- **Rolling Backlog (drei nächste Pakete):** (1) NEXT-110-RC5-EVIDENCE-CI: finale Dokumentations-SHA, Quality/Provenienz und Artefakte kontrollieren; (2) NEXT-79e-1/2-REAL: NVDA/Windows und VoiceOver/Safari mit realer Hardware und Prüfnachweis; (3) NEXT-79e-3/4-REAL: echtes Touch-Gerät und dokumentierte WCAG-Kontrastmessung. Letztere benötigen Prüfperson und Geräte. **Praktische Abnahme 0/4, NEXT-110 NO-GO.** Live v0.1.62, `main` unverändert. **KEIN PUBLISHING, kein main-Merge, Release-Workflow, Deployment, publish.php oder Änderung anderer Automationen.**

## 29.10.2026 · 12:00 · NEXT-110 RC5 / NEXT-79e AUTO10+AUTO11 · ENTWICKLUNG · NICHT LIVE
- **NEXT-110-RC5-A (P0, Integration vorbereitet):** RC5-Branch `integration/NEXT-110-RC5-contrast-guard-20261029-1200` als exakter Nachfahre des dokumentierten AUTO8/AUTO9-Entwicklungsstands erstellt; isolierter QA-Push-Trigger ergänzt. Dateien: `.github/workflows/feature-qa.yml`, alle aus AUTO8/AUTO9 geerbten Quell-/Test- und Statusdateien. Akzeptanz: keine Main-Änderung, RC4 als Vorfahr, 894er Regression + Provenienz auf finaler RC5-SHA vollständig erfolgreich. Test: `npm run typecheck && npm test && npm run build && npm run test:e2e` und GitHub-Actions-Provenienz. Abhängigkeiten: AUTO8/9 CI SUCCESS (#40846334285/#40846479327). **Integration vorbereitet; finale RC5-CI noch nicht bestätigt.**
- **NEXT-79e-AUTO10 (P1, implementiert, CI offen):** Browser-Kontrastberechnung in `e2e/contrast.ts` refaktoriert, nur vollständig deckende berechnete RGB/RGBA-Farben zulassen, transparente/ungültige Farben fail-closed ablehnen; `e2e/next79e-automated-preflight.spec.ts` nutzt gemeinsamen Helfer. Akzeptanz: unveränderte 4,5:1-/3:1-Checks in Chromium/WebKit Desktop/Mobil, keine falschen PASS-Werte bei Alpha<1. Test: `npm run typecheck && npm test && npm run test:e2e`. Abhängigkeit: AUTO9. **Implementiert; CI offen.**
- **NEXT-79e-AUTO11 (P2, implementiert, CI offen):** Neue Vitest-Regression `tests/next79e-contrast.test.ts` für WCAG 21:1, 4,5:1, Symmetrie, gültige RGB-Formen und zehn negative Eingaben (Alpha, Mischsyntax, außerhalb RGB, malformed). Akzeptanz: positive/negative Fälle PASS, vollständige Regression nach Refactoring PASS. Test: `npm run typecheck && npm test && npm run build && npm run test:e2e`. Abhängigkeit: AUTO10. **Implementiert; CI offen.**
- **Kumulativ seit bestätigter Live-Version v0.1.62:** 110 zuvor auf Entwicklungsständen CI-getestete und nicht live bestätigte Unteraufgaben (99 NEXT-110 E1/E2/E5–E101, 3 NEXT-108 A/B/C, 8 NEXT-79e AUTO1–6/AUTO8/9). AUTO10/AUTO11 **nicht mitzählen**, solange RC5-CI aussteht. Weitere Alt-PRs ohne eindeutigen Abgleich: **Veröffentlichungsstatus ungeklärt**. Praktische NVDA-/VoiceOver-/Touch-/Kontrast-Abnahme **0/4**, NEXT-110 **NO-GO**.
- **Rolling Backlog:** P0 RC5 finalen Quality-/Provenienzlauf und SHA-/Artefaktbelege kontrollieren, Fehler beheben und vollständig neu testen; P0 NEXT-79e-1 NVDA und NEXT-79e-2 VoiceOver real prüfen; P1 NEXT-79e-3 physisches Touch-Gerät und NEXT-79e-4 dokumentierte Kontrastmessung; erst danach manuelle GO/NO-GO-Entscheidung. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, Release, publish.php, Deployment oder Änderung anderer Automationen.

## 29.10.2026 · 11:00 · NEXT-79e-AUTO8/AUTO9 CI BESTÄTIGT · 110 GETESTET · NICHT LIVE

- **NEXT-79e-AUTO8 (P0, NEU ABGESCHLOSSEN):** Browser-basierter Kontrast-Preflight für Startbutton, Turnierdialog und Turniernavigation, berechnete Vorder-/Hintergrundfarben und WCAG-AA-Schwelle 4,5:1. Dateien: `e2e/next79e-automated-preflight.spec.ts`, `.github/workflows/feature-qa.yml`. Akzeptanz: Chromium/WebKit Desktop/Mobil grün, beide QA-Jobs erfolgreich, Build-/Audit-Artefakte exakt zugeordnet. Test: `npm run typecheck && npm test && npm run build && npm run test:e2e`; CI #40846334285 auf SHA `25b6051d8c39d86b42c355e42e26c453c16c2a3e`: **554 Vitest + 40 Node + 296 Playwright = 890/890**, Quality und Provenienz SUCCESS; gültige SHA-256-Artefakte. Abhängigkeit: RC4.
- **NEXT-79e-AUTO9 (P1, NEU ABGESCHLOSSEN):** Gemeinsame Kontrastfunktion refaktoriert; Fokusindikator >=3px und Kontrast >=3:1 auf zwei dunklen Referenzhintergründen. Datei: `e2e/next79e-automated-preflight.spec.ts`; isolierter QA-Workflow. Akzeptanz: 4 Browserprojekte und vollständige Regression nach Refactoring grün. Test: `npm run typecheck && npm test && npm run build && npm run test:e2e`; CI #40846479327 auf SHA `8213962042dae27ab4ff7438b09024c8be018148`: **554 Vitest + 40 Node + 300 Playwright = 894/894**, Quality und Provenienz SUCCESS; gültige SHA-256-Artefakte. Abhängigkeit: AUTO8.
- **NEXT-79e-QA-EVIDENCE1 (P2, diese Dokumentation):** CI-/Provenienzbelege und Rolling Backlog in Statusdateien und HTML-Informationsquellen synchronisieren, ausschließlich auf separatem Dokumentationsbranch. Dateien: `RUN_STATE.md`, `PROJECT_STATE.md`, `BACKLOG.md`, `CHANGELOG.md`, `docs/NEXT-110-RC-RELEASE-GATE.md`, `public/backlog.html`, `public/testsuite.html`, `public/release-notes.html`. Akzeptanz: gleiche Zählung und SHA-Nachweise in allen acht Dateien, Änderungen zurückgelesen; keine Produktionscodeänderung. Test: Datei-Readback und PR-Diff; neue Dokumentations-SHA hat **noch keine eigene vollständige CI**. Abhängigkeit: AUTO8/9 SUCCESS.
- **Kumulativ seit bestätigtem Live v0.1.62:** 99 NEXT-110-E1/E2/E5–E101 (E3/E4 nicht eigenständig bestätigt), 3 NEXT-108-A/B/C und 8 NEXT-79e-AUTO1–AUTO6/AUTO8/AUTO9 = **110 vollständig getestete, nicht live bestätigte Unteraufgaben**. Für ältere ungeklärte PRs: **Veröffentlichungsstatus ungeklärt**; nicht zusätzlich zählen. AUTO7, RC4, PREP2 und EVIDENCE1 sind Integrations-/Nachweisarbeiten, keine weiteren technischen Abschlüsse.
- **Rolling Backlog:** (1) AUTO8/9 ausschließlich auf Entwicklungsbranch in konsolidierten RC integrieren und komplette 894er Regression auf finaler SHA neu prüfen; (2) NEXT-79e-1/2 echte NVDA-/VoiceOver-Abnahme mit Geräte- und Versionsnachweis; (3) NEXT-79e-3/4 reale Touch-/Kontrastabnahme, anschließend GO/NO-GO. **Praktische Abnahme 0/4; NEXT-110 NO-GO.** Kein main-Merge, Release, publish.php oder Deployment.

## 29.10.2026 · 10:00 · RC4-CI bestätigt / NEXT-79e-AUTO8 / AUTO9 · NUR ENTWICKLUNG · NICHT LIVE

- **NEXT-110-RC4-CI (P0, Nachweis abgeschlossen):** Isolierter QA-Run #40839866406 für exakte RC4-SHA `6955e1e38ad76a178cf4915cc8ca9956ddb76d8a` nach Abschluss bestätigt: Quality und Provenienz SUCCESS; 554 Vitest + 40 Node + 292 Chromium/WebKit Desktop/Mobil = **886/886**. Beide Artefakte (Build und Audit) vorhanden, nicht abgelaufen, gültige SHA-256-Digests und exakt zu Run/Branch/Commit zugeordnet. Dateien: `.github/workflows/feature-qa.yml`, `docs/NEXT-110-RC-RELEASE-GATE.md`. Akzeptanz: finaler Run SUCCESS und beide Artefakte exakt zugeordnet. Test: isolierte QA inklusive `npm run typecheck && npm test && npm run build && npm run test:e2e` und NEXT-108-Provenienz. Abhängigkeit: RC4. **Abgeschlossen für RC4-SHA; nicht für neue AUTO8/AUTO9-Commits.**
- **NEXT-79e-AUTO8 (P1, NEU, CI ausstehend):** Browser-basierter WCAG-AA-Kontrast-Preflight für tatsächlich berechnete Vorder-/Hintergrundfarben dreier deckender UI-Flächen (Start, Dialog, Turnier-Navigation). Dateien: `e2e/next79e-automated-preflight.spec.ts`, isolierter QA-Workflow. Akzeptanz: Kontrast >=4,5:1 in Chromium/WebKit Desktop/Mobil, Fail bei Unterschreitung. Test: `npx playwright test e2e/next79e-automated-preflight.spec.ts`; vollständige Feature-QA. Abhängigkeit: RC4. **Implementiert auf eigenem Entwicklungsbranch, CI noch nicht bestätigt.**
- **NEXT-79e-AUTO9 (P1, NEU, CI ausstehend):** Kontrastberechnung als gemeinsame Testhilfe refaktoriert; Fokusindikator automatisiert gegen dunkle Arena-/Seitenhintergründe (>=3:1) und >=3px Dicke geprüft. Dateien: `e2e/next79e-automated-preflight.spec.ts`, QA-Workflow. Akzeptanz: Chromium/WebKit Desktop/Mobil PASS, Testhilfe ohne duplizierte Kontrastformel. Test: `npx playwright test e2e/next79e-automated-preflight.spec.ts`; danach vollständige Regression. Abhängigkeit: AUTO8. **Implementiert auf separatem Entwicklungsbranch, CI noch nicht bestätigt.**
- **NEXT-79e reale Abnahme:** NVDA, VoiceOver, echtes Touch-Gerät und reale Kontrastmessungen **0/4**. Automatische Stichproben ersetzen die Abnahme nicht. NEXT-110 **NO-GO**.
- **Kumulativ seit Live v0.1.62:** **108** zuvor vollständig getestete, nicht live bestätigte Unteraufgaben: NEXT-110-E1/E2/E5–E101 (99; E3/E4 nicht separat belegt), NEXT-108-A/B/C (3), NEXT-79e-AUTO1–AUTO6 (6). **AUTO8/AUTO9 erst nach CI zählen.** Veröffentlichungsstatus aller 108: NICHT LIVE. Unklarheiten aus weiteren älteren PRs: **Veröffentlichungsstatus ungeklärt**, nicht zusätzlich zählen.
- **Rolling Backlog:** (1) AUTO8/AUTO9 CI auf exakter SHA prüfen, bei Fehlern isoliert korrigieren, (2) nur nach grüner CI sicher in RC4-Entwicklungsbranch integrieren und erneut voll testen, (3) echte NVDA-/VoiceOver-/Touch-/Kontrast-Abnahme, (4) manuelles GO/NO-GO. Kein main-Merge, Release, Deployment oder publish.php.

## 29.10.2026 · 09:00 · NEXT-79e-AUTO7 / NEXT-110-RC4 / NEXT-79e-PREP2 · NUR ENTWICKLUNG · NICHT LIVE

- **NEXT-79e-AUTO7 (P0, Konsolidierung):** RC4-Entwicklungsbranch aus vollständig getesteter AUTO6-SHA `ad46f898c6153826650777c3d35d8552203ba6ea` erstellt. Quell-CI #40833576469 Quality/Provenienz SUCCESS, 554 Unit/Behavior/Determinismus + 40 Node + 292 Chromium/WebKit Desktop/Mobil = **886/886**. Enthalten: AUTO1–AUTO6 (Tastaturfokus, Reduced Motion, Browser-Preflight, QA-Provenienz-Fix, Dialog-Fokus-Regression, HUD-Transition-Regression). Dateien: `src/style.css`, `e2e/next79e-automated-preflight.spec.ts`, `playwright.config.ts`, `scripts/next108-verify-provenance.mjs`, `tests/next108-provenance.test.mjs`. Akzeptanz: unveränderte Funktionen im konsolidierten RC4, vollständige neue CI. Test: `npm run typecheck && npm test && npm run test:e2e && npm run build`. Abhängigkeit: AUTO1–6. **Quellcode getestet, finaler RC4-HEAD noch nicht CI-bestätigt.**
- **NEXT-110-RC4 (P0, CI offen):** `.github/workflows/feature-qa.yml` nur um expliziten RC4-Push-Trigger erweitert; Draft-PR #169 ausschließlich gegen `integration/NEXT-110-v0162-rc-20261029-0300`, kein main. Akzeptanz: QA-Quality und Provenienz SUCCESS auf finaler RC4-SHA, Artefakte und SHA-256 geprüft. Test: isolierte Feature-QA + NEXT-108-Provenienz. Abhängigkeit: AUTO7. **CI noch nicht abschließend bestätigt.**
- **NEXT-79e-PREP2 (P1, Prüfvorbereitung):** `docs/NEXT-79e-MANUAL-ACCEPTANCE.md` enthält jetzt konkrete NVDA-, VoiceOver-, echte Touch- und WCAG-AA-Kontrast-Prüfschritte mit Geräte-/Browser-/Screenreader-Version, Messwerten, Belegen und PASS/FAIL. Akzeptanz: vier dokumentierte reale PASS-Abnahmen. Test: reale 79e-1/2/3/4-Prüfungen, technische Vorprüfung `npm run typecheck && npm test && npm run test:e2e && npm run build`. Abhängigkeit: RC4-Vorschau und Hardware/Prüfperson. **0/4 praktische Abnahmen, NO-GO.**
- **Kumulativ:** **108** auf jeweiligen Entwicklungsständen getestete, nicht live bestätigte Unteraufgaben: NEXT-110-E1/E2/E5–E101 (99, E3/E4 nicht eigenständig nachgewiesen), NEXT-108-A/B/C (3), NEXT-79e-AUTO1–AUTO6 (6). AUTO7/RC4/PREP2 zählen als Integrations-/Nachweisarbeiten nicht zusätzlich. Letzte bestätigte Live-Version **v0.1.62**. **Alle 108 NICHT LIVE.**
- **Rolling Backlog:** (1) finale RC4-Quality-/Provenienz-CI inklusive SHA/Artefakte prüfen, (2) reale NVDA-/VoiceOver-Abnahme, (3) reale Touch-/Kontrastabnahme und anschließendes GO/NO-GO. **NEXT-110 NO-GO. NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 29.10.2026 · 08:00 · NEXT-79e-AUTO4/5/6 · QA-FIX UND REGRESSION · CI AUSSTEHEND · NICHT LIVE

- **AUTO4 (P0, Fix):** CI #40827112904 hatte Quality SUCCESS (554 Vitest + 38 Node + 284 Chromium/WebKit = 876/876), aber Provenienzjob FAILURE: `unexpected QA branch`. Exakte QA-Branch-Allowlist im fail-closed NEXT-108-Verifier; Positiv-/Negativtests, QA-Workflow-Trigger. Dateien: `scripts/next108-verify-provenance.mjs`, `tests/next108-provenance.test.mjs`, `.github/workflows/feature-qa.yml`. Akzeptanz: beide Jobs SUCCESS auf exakter SHA, fremde Branches weiter abgelehnt. Test: `node --test tests/next108-provenance.test.mjs` + Feature-QA. Abhängigkeit: AUTO1–3. **Implementiert, finale CI offen.**
- **AUTO5 (P1, Test):** Turnierdialog per Enter öffnen, Fokus im Modal, Escape schließen, Fokus zurück auf Auslöser. Datei: `e2e/next79e-automated-preflight.spec.ts`. Akzeptanz: Chromium/WebKit Desktop/Mobil PASS. Test: `npx playwright test e2e/next79e-automated-preflight.spec.ts`. Abhängigkeit: AUTO4. **Implementiert, finale CI offen.**
- **AUTO6 (P1, Refactoring/Regression):** `prefers-reduced-motion` unterbindet auch Lebens-/Energiebalken-Transitions; normal → reduce → normal per Browser-Test. Dateien: `src/style.css`, `e2e/next79e-automated-preflight.spec.ts`. Akzeptanz: 0s bei reduce, ursprüngliche Dauer wiederhergestellt; 4 Browserprojekte. Test: `npm run typecheck && npm test && npm run test:e2e && npm run build`. Abhängigkeit: AUTO2/AUTO5. **Implementiert, finale CI offen.**
- **Kumulativ seit Live v0.1.62:** 99 NEXT-110 E1/E2/E5–E101 (E3/E4 nicht separat belegt) + NEXT-108-A/B/C = **102 getestet, nicht live**. AUTO1–6 erst nach grüner finaler CI zählen. NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrast-Abnahme 0/4, NEXT-110 NO-GO.
- **Rolling Backlog:** (1) finalen AUTO6-HEAD mit Quality+Provenienz und Artefakten bestätigen, (2) sichere RC-Entwicklungsintegration und erneut komplette CI, (3) NEXT-79e reale 4 Prüfungen dokumentieren, (4) RC3 GO/NO-GO. Keine Freigabe, kein main-Merge, kein Deployment, kein publish.php.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 29.10.2026 · 07:00 · NEXT-79e-AUTO1/2/3 AUTOMATISIERTE VORPRÜFUNG – CI AUSSTEHEND · NICHT LIVE

- **NEXT-79e-AUTO1 (P0):** Allgemein sichtbare Tastatur-Fokusmarkierung für Buttons, Links, Eingaben, Selects, Summary und Tabindex-Elemente. Datei: `src/style.css`. Abnahme: Fokusindikator >= 3px; Test: `npx playwright test e2e/next79e-automated-preflight.spec.ts`. Abhängigkeit: RC1/RC2. **Implementiert, CI offen.**
- **NEXT-79e-AUTO2 (P1):** `prefers-reduced-motion: reduce` deaktiviert Treffer-/Schusseffekte, Hit-Animation und Bot-Transitions. Datei: `src/style.css`. Abnahme: CSS-Animations- und Transitionsdauer 0s; Test: `npx playwright test e2e/next79e-automated-preflight.spec.ts`. Abhängigkeit: RC1/RC2. **Implementiert, CI offen.**
- **NEXT-79e-AUTO3 (P1):** Automatisierte Chromium/WebKit-Desktop/Mobil-Regression für Fokus, reduzierte Bewegung und 320px-Turnierdialog; Dateien: `e2e/next79e-automated-preflight.spec.ts`, `playwright.config.ts`, isolierter Feature-QA-Workflow. Abnahme: alle vier Browserprojekte erfolgreich; Test: `npm run typecheck && npm test && npm run test:e2e && npm run build` und isolierter Provenienzjob. Abhängigkeiten: AUTO1/AUTO2. **Implementiert, CI offen.**
- **Keine reale NEXT-79e-Abnahme:** NVDA, VoiceOver, physische Touch-Geräte und gemessene Kontraste bleiben **0/4**, Release **NO-GO**. Die automatisierten Tests dürfen keine dieser vier Abnahmen ersetzen. Weitere Pakete: 79e-1 NVDA real, 79e-2 VoiceOver real, 79e-3 Touch real, 79e-4 Kontrastmessung; danach RC3-Gate neu prüfen.
- **Kumulativ seit Live v0.1.62:** 99 getestete NEXT-110-E1/E2/E5–E101 (E3/E4 nicht eigenständig bestätigt) + NEXT-108-A/B/C = **102 getestet, NICHT LIVE**. AUTO1/2/3 bis vollständiger CI nicht mitzählen. Letzte bestätigte kombinierte CI: #40815455661, 864/864 auf `f97f35a352d8b2dbac02b4ac88078671b139e593`; neuer Branch-HEAD noch nicht CI-verifiziert. Keine Veröffentlichung, kein main-Merge, keine anderen Automationen geändert.

## 29.10.2026 · 05:00 · NEXT-108 D/E und RC3-Gates · QA 864/864 GRÜN · NUR RC-ENTWICKLUNG · NICHT LIVE

- **NEXT-108-D (P0, abgeschlossen):** Isolierte GitHub Actions #40809602875 auf SHA `434975705ca8d9cd3a027741a3387a5a3503865c` vollständig SUCCESS: 554 Vitest + **38 Node** (einschließlich sechs NEXT-108-Negativ-/Positivtests) + 272 Chromium/WebKit Desktop/Mobil = **864/864**; TypeScript, Audit, reproduzierbarer Build, separater Provenienzjob PASS. GitHub-API nach Abschluss erneut kontrolliert: Run-ID, Branch, SHA, erfolgreicher Quality-/Provenienzjob und beide SHA-256-Artefakte mit exakter Run-/SHA-Zuordnung gültig. Test: `node --test tests/next108-provenance.test.mjs` und isolierte Feature-QA. Abhängigkeit NEXT-108-A/B/C.
- **NEXT-108-E (P0, integriert, RC-Nachtest offen):** PR #163 nach grüner CI ausschließlich in `integration/NEXT-110-v0162-rc-20261029-0300` gemergt, Merge-SHA `f943b58503b2f433ae50c74f391d2a0751ba515a`; KEIN main-Merge. Neue RC-CI #40815354923 gestartet; **bis zu ihrem vollständigen SUCCESS keine neue RC-Abnahme behaupten**. Test: `npm run typecheck && npm test && npm run test:e2e && npm run build` sowie SHA-/Artefaktprüfung nach Run-Abschluss. Abhängigkeit D.
- **NEXT-110-RC3-B / NEXT-79e (P0, NO-GO):** NVDA, VoiceOver, reales Touch und Kontrast sind NICHT praktisch abgenommen. Prüfprotokoll `docs/NEXT-79e-MANUAL-ACCEPTANCE.md`; keine simulierten Erfolge. Test: vier reale Prüfungen mit Gerät/OS/Version, Beobachtung und Beleg. Abhängigkeit exakter unveröffentlichter RC-Vorschau und Prüfhardware.
- **Rolling Backlog:** (1) NEXT-108-E1 finale RC-CI #40815354923 bzw. CI des neuesten Dokumentations-HEAD prüfen und bei Fehlern korrigieren; (2) NEXT-79e reale 4-teilige Abnahme durchführen und protokollieren; (3) NEXT-110-RC3-C nach abgeschlossener finaler Provenienz und Accessibility eine dokumentierte GO/NO-GO-Entscheidung treffen. **Bis dahin NO-GO.**
- **Kumulativ:** 99 getestete, nicht live bestätigte NEXT-110-E1/E2/E5–E101; E3/E4 nicht eigenständig belegt. NEXT-108-A/B/C nun auf isoliertem QA-Quell-SHA vollständig getestet, auf integriertem RC-HEAD Nachtest offen. Letzte bestätigte Live-Version **v0.1.62**; `main` unverändert `2cbbda87ebfbead0f74ead24fa016b0857f4eaaa`. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 29.10.2026 · NEXT-108-A/B/C: fail-closed Provenienzprüfung implementiert, CI-Nachtest ausstehend · NEXT-79e NO-GO · NICHT LIVE

- **NEXT-108-A (P0):** `scripts/next108-verify-provenance.mjs` prüft GitHub-Run-ID, exakte 40-stellige Commit-SHA, Branch/Repository/Workflow/Event, erfolgreichen Quality-Job und Pflichtschritte sowie zwei eindeutige, nicht abgelaufene SHA-256-Artefakte mit identischer Run-/Commit-Zuordnung. Bei fehlender API-Antwort, Paginierung, Abweichung oder fehlendem Nachweis: FAIL CLOSED. Test: `node --test tests/next108-provenance.test.mjs`. Abhängigkeit: RC1/RC2.
- **NEXT-108-B (P0):** Positive/negative Provenienztests einschließlich falscher SHA, Run, Event, Branch, fehlgeschlagener Jobs, abgelaufener/doppelter/fehlender Artefakte und CLI ohne Token; `npm test` um die neue Testdatei erweitert. Test: `npm test`. Abhängigkeit: A.
- **NEXT-108-C (P1):** Isolierter `feature-qa.yml`-Workflow erhält nach dem Quality-Job einen `provenance`-Job mit `actions:read`; dieser kontrolliert die gerade hochgeladenen Artefakte und die SHA, ohne Release-Freigabe. Der In-Run-Check ersetzt **nicht** die finale Prüfung eines abgeschlossenen GitHub-Runs. Test: vollständige Feature-QA inkl. Chromium/WebKit Desktop/Mobil und Provenienzjob. Abhängigkeit: A/B. **Aktuell noch keine grüne CI für diese Änderungen nachgewiesen.**
- **NEXT-79e:** Reale NVDA-/VoiceOver-/Touch-/Kontrastabnahme ist NICHT durchgeführt. Prüfprotokoll: `docs/NEXT-79e-MANUAL-ACCEPTANCE.md`. Release-Gate bleibt **NO-GO**.
- **Kumulativ:** 99 zuvor getestete NEXT-110-E1/E2/E5–E101 sind weiterhin NICHT LIVE; E3/E4 nicht eigenständig belegt. Die drei NEXT-108-Pakete sind **neu implementiert, noch nicht vollständig CI-bestätigt** und werden nicht zu den 99 addiert. Letzte bestätigte Live-Version v0.1.62.
- **Rolling Backlog:** (1) CI für NEXT-108-A/B/C vollständig prüfen und etwaige Fehler korrigieren; (2) nach erfolgreicher CI auf RC-Entwicklungsbranch integrieren und finalen SHA-/Artefakt-Check durchführen; (3) NEXT-79e auf realen Geräten abnehmen und anschließend RC3 GO/NO-GO neu entscheiden. Keine ungetesteten Abschlüsse.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, kein publish.php, kein Release-Workflow, kein Deployment und keine Änderung anderer Automationen.

## 29.10.2026 · NEXT-110 v0.1.62 RC1/RC2 INTEGRATIONS-CI GRÜN · 858/858 · RC3 NO-GO · NICHT LIVE

- **RC1 v0.1.62 Integration (NEU verifiziert):** Auf `integration/NEXT-110-v0162-rc-20261029-0300` aus bestätigtem main v0.1.62 (`2cbbda87ebfbead0f74ead24fa016b0857f4eaaa`) 10 Produktionsdateien der versionierten v2-Engine und UI integriert. V1-Kompatibilität, seeded deterministische Regression und TypeScript/Build auf RC-SHA `76de1be455159b31d46646aa701932e499e343ce` bestanden. Test: `npm run typecheck && npm test && npm run build`; Abhängigkeit E99–E101. **Kein main-Merge.**
- **RC2 vollständige v2-/Legacy-Regression (NEU verifiziert):** 13 Test-/Konfigurationsdateien einschließlich 120-Kampf-/Double-KO-/Replay-/Archiv-Recovery- und Chromium/WebKit Desktop/Mobilmatrix. Isolierte GitHub Actions **#40804950830 SUCCESS** auf exakt `76de1be455159b31d46646aa701932e499e343ce`: **554/554 Vitest + 32/32 Node + 272/272 Playwright = 858/858**; TypeScript, 0 Audit-Advisories, reproduzierbarer Build (Digest `b8167310e5a6c81cddd3cb8c0d14ccbd18c1087c97887d57c737d43d6892b8f3`), `robot-arena-dist`- und `robot-arena-dependency-audit`-Artefakte vorhanden. Test: `npm run typecheck && npm test && npm run test:e2e && npm run build`, Audit, Build-Reproduktion. Abhängigkeit RC1.
- **P0 CI-Infrastrukturfix (NEU):** Erster Integrationslauf #40804444059 FAILED: 218 Browser bestanden, 52 WebKit wegen fehlendem `libevent-2.1.so.7` nicht startbar, 2 nicht ausgeführt. Auf isoliertem RC-Branch `.github/workflows/feature-qa.yml` um `npx playwright install --with-deps webkit` ergänzt; anschließend vollständiger Lauf #40804950830 GRÜN. Keine Produktionscodeänderung durch Fix; kein Release-Workflow.
- **RC3 (noch NICHT abgeschlossen):** SHA/CI/Artefaktzuordnung für RC1/RC2 nachgewiesen; **NEXT-108** automatisierte fail-closed Provenienzprüfung und **NEXT-79e** praktische NVDA-/VoiceOver-/Touch-/Kontrastabnahme offen. Parent NEXT-110 weiterhin **NO-GO**, kein Release. Dateien `docs/NEXT-110-RC-RELEASE-GATE.md` sowie diese sieben Status-/HTML-Quellen. Abhängigkeit RC2. Nächste drei Pakete: RC3-A automatisierte SHA-/Artefakt-Fail-Closed-Negativtests, RC3-B praktische Accessibility-Abnahme/Nachweis, RC3-C finaler Freigabe-Check auf unverändertem HEAD. Test: GitHub Actions SHA-/Artefakt-API, Negativtests, Geräteprotokoll.
- **Kumulativ seit letzter bestätigter Live-Version v0.1.62:** **99** zuvor isoliert getestete, weiterhin NICHT LIVE NEXT-110-Unteraufgaben **E1/E2/E5–E101**, E3/E4 nicht separat bestätigt. **RC1/RC2 NEU auf v0.1.62 getestet, keine zusätzlichen E-IDs.** Alle anderen Aufgaben/Automationen unverändert.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, kein publish.php, kein Release-Workflow, kein Deployment, keine Homepage-Aktualisierung.

## 29.10.2026 · RC1/RC2 Integrations-CI #40804444059 fehlgeschlagen: WebKit-Runner-Abhängigkeit, FIX IN ARBEIT · NO-GO

- v0.1.62-Integrationsbranch `integration/NEXT-110-v0162-rc-20261029-0300`: 10 v2-Produktionsdateien, 13 Test-/Konfigurationsdateien, alle 7 Status-/HTML-Quellen und Release-Gate-Dokument übertragen; kein main-Merge, kein Publishing.
- Isolierte Feature-QA **#40804444059 FAILED**, obwohl TypeScript, 554 Vitest/Unit/Behavior/Determinismus, 32 Node, Build, Audit und reproduzierbarer Build bestanden: Playwright **218 bestanden, 52 WebKit-Starts fehlgeschlagen, 2 nicht ausgeführt**. Belegter Runner-Fehler: `libevent-2.1.so.7: cannot open shared object file`. **Kein nachgewiesener Produktionscodefehler**, aber RC1/RC2 trotzdem NICHT abgeschlossen.
- **P0 Fix:** Auf ausschließlich diesem Entwicklungsbranch isoliertes Workflow-`feature-qa.yml` um `npx playwright install --with-deps webkit` vor `npm run test:e2e` ergänzen (identisch zum früher erfolgreichen NEXT-110-QA-Workflow); danach **vollständige** CI erneut auf exakt neuem HEAD, einschließlich Refactoring-Regression. Keine Release-Workflow-Auslösung.
- **Rolling 3 Pakete:** RC1 (v0.1.62/v1-Integration, Abnahme pending), RC2 (v2-120-/Double-KO-/Replay-Browsermatrix, WebKit-Runner-Fix + Retest pending), RC3 (SHA-/Artefakt-/NEXT-79e-/NEXT-108-Gates, NO-GO dokumentiert). Seit v0.1.62 **99 zuvor isoliert getestete, nicht live NEXT-110-E1/E2/E5–E101**, E3/E4 unbewiesen; neue RC-Tasks noch nicht als abgeschlossen zählen. Test: `npm run typecheck && npm test && npm run build && npm run test:e2e`, Audit, reproduzierbarer Build. Abhängigkeiten RC1→RC2→RC3.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 29.10.2026 · NEXT-110-RC1/RC2/RC3 v0.1.62-INTEGRATION VORBEREITET · NO-GO · NICHT VERÖFFENTLICHT

- **Live-Basis:** v0.1.62, main `2cbbda87ebfbead0f74ead24fa016b0857f4eaaa`, Deploymentstatus SUCCESS. **Kumulativ:** 99 auf isoliertem v0.1.61-Snapshot getestete, NICHT LIVE NEXT-110-Unteraufgaben E1/E2/E5–E101; E3/E4 nicht eigenständig bestätigt. Keine neuen vollständig getesteten RC-Unteraufgaben.
- **RC1 (P0, Code integriert, Abnahme offen):** v2-Engine und UI aus eingefrorenem NEXT-110-HEAD `baff6497771f8152b4c8ad39175349af603381ef` auf separaten, von main v0.1.62 abgezweigten Branch `integration/NEXT-110-v0162-rc-20261029-0300` übertragen. 10 Produktionsdateien; Main-Paketversion 0.1.62 und Lockfile unverändert. Abnahme: Legacy-v1-Digest, Replay und RNG/Schussfolge unverändert; `npm run typecheck && npm test && npm run build`. Abhängigkeit E99–E101. **Keine CI auf diesem Integrations-HEAD bestätigt.**
- **RC2 (P0, Tests integriert, Abnahme offen):** 13 deterministische/Unit/Behavior-/Browser-Testdateien einschließlich 120-Kampf-, Double-KO-, Replay-, Import-/Recovery- und Legacy-Regressionsmatrix aus demselben HEAD übertragen. Abnahme: `npm run typecheck && npm test && npm run test:e2e && npm run build`, Audit, zweiter reproduzierbarer Build, Chromium/WebKit Desktop/Mobil. Abhängigkeit RC1. **Noch nicht als getestet zählen.**
- **RC3 (P1, Nachweisdokument angelegt, Freigabe offen):** `docs/NEXT-110-RC-RELEASE-GATE.md` dokumentiert Quell-/Main-SHA, konkrete Abnahme, Testbefehle und NO-GO; exakte neue CI-/Artefaktprovenienz sowie NEXT-108 und echte NEXT-79e-NVDA-/VoiceOver-/Touch-/Kontrastabnahme offen. Abhängigkeit RC2. Isolierte frühere QA #40791231361 war 858/858 auf v0.1.61, **nicht** auf diesem RC-Integrationsbaum.
- **Nächste drei kleinen Pakete:** (1) RC1-A CI auf v0.1.62-Integration und v1-Fixture-Gate, (2) RC2-A v2-120-/Double-KO-/Replay-Browsermatrix und Refactoring-Nachtests, (3) RC3-A CI-Commit-/Artefaktprovenienz und Freigabegates fail-closed prüfen. **Blocker:** Integrations-CI, NEXT-79e, NEXT-108. Kein GO für NEXT-110.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Workflow, kein publish.php, kein Deployment, keine Homepage-Änderung und keine andere Automation geändert.

## 27.10.2026 · 06:00 Uhr · NEXT-109 Diagnose-QA 739/739 grün; finale Dokumentations-CI offen · NICHT VERÖFFENTLICHT
- **Letzte verifizierte Live-Version v0.1.61**, Release-Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, Deploymentstatus `success`. **Kumulativ vollständig fertig, getestet, noch NICHT veröffentlicht: 2 Tasks:** NEXT-106 (integriertes Fail-Closed-Evidence-Gate, 733/733, PR #90, CI #40431030229 SUCCESS); NEXT-107 (128 Spiegelmatches + 128 Replays, Chromium-Import-Tastatur-Race-Fix, 736/736, PR #91, CI #40442361594 SUCCESS).
- **Aktuelle Runde: NEXT-109 P0 Ursachenanalyse, weiterhin in Arbeit bis zur finalen Dokumentations-CI.** Auf HEAD `5a07b43b0a1413b37fd3421574d293b5a1d6f9b5` ist CI #40447583893 **SUCCESS**: 499/499 Vitest (Unit, Behavior, Regression, Determinismus), 32/32 Node und 208/208 Playwright (92 Chromium Desktop, 92 Chromium Mobil, 12 WebKit Desktop, 12 WebKit iPhone) = **739/739**; TypeScript, Audit, reproduzierbarer Build, Browser- und Evidence-Gates PASS. Diagnosetest beweist sequentiellen Startseiten-/Erstschusseffekt (Raptor B feuert Tick 14 vor A Tick 15 bei Standarddistanz; im Waffenbereich A zuerst); 8 Seeds gespiegelt. PR #92 ist Draft und wieder gegen NEXT-107 ausgerichtet. Diese Dokumentationsaktualisierung erzeugt neue Commits, deren abschließende CI noch zu prüfen ist. **Keine Änderung der Produktionsengine**, kein Fairnessfix als erledigt behauptet.
- **Rolling Backlog:** P0 NEXT-109 finale Dokumentations-CI auf aktuellem HEAD kontrollieren; P0 NEXT-110 eigenständige Regel-/Replay-Versionsarchitektur für faire simultane Bewegung und Schüsse mit historischen Event-/RNG-/Archiv-Fixtures und vollständiger Regression vor Umsetzung; P0 NEXT-79e praktische NVDA/VoiceOver/Touch/Kontrast-Abnahme auf echten Geräten; P2 NEXT-108 CI-Artefakt- und Commit-SHA-Provenienz fail-closed prüfen. **Refactoring:** keine Produktionscodeänderung in dieser Runde; bestehende wiederverwendbare Testhelfer beibehalten, 739 Tests erfolgreich. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Commit, kein publish.php, kein Deployment.

## 27.10.2026 · 05:08 Uhr · NEXT-107 FINAL QA GRÜN, NEXT-109 Diagnose in Prüfung · NICHT VERÖFFENTLICHT
- **Letzte bestätigte Live-Version: v0.1.61** (Release-Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, GitHub-Status `robot-arena/deployment=success`). **Kumulativ fertig, vollständig getestet, NICHT veröffentlicht: 2 Aufgaben:** **NEXT-106** integriertes Fail-Closed-Evidence-Gate, 733/733, finale CI #40431030229 SUCCESS, Draft-PR #90; **NEXT-107 NEU BESTÄTIGT** deterministische Startseitenanalyse mit Replay-Import-Tastatur-Race-Fix, 736/736 (496 Vitest, 32 Node, 208 Chromium/WebKit Desktop/Mobil), finale CI #40442361594 SUCCESS auf exaktem HEAD `99265b53575257341403fe1e5d19ae1f1ce7dcbe`, Browser-/Evidence-Gates PASS, Draft-PR #91. NEXT-107 korrigiert nur die asynchrone Test-Synchronisation; kein Retry/Click-Fallback, keine Produktionsänderung.
- **NEXT-109 P0 in Arbeit, noch NICHT fertig:** Root-Cause-Diagnose im separaten Draft-PR #92. Deterministische Tests für sequentielle A-/B-Bewegung und Schüsse, acht gespiegelte Seeds und Nahdistanz-Gegenprobe liegen vor; vollständige CI auf finalem Branch-HEAD noch ausstehend. Bei identischer Raptor-Hardware erreicht B in der Ausgangssituation die Waffenreichweite einen Tick früher (Schuss Tick 14 statt A Tick 15); bei Start innerhalb Reichweite feuert A zuerst. Die Simulation wird **noch nicht** geändert: historische Event-Stream-Digests, Replays, RNG-Verbrauch und gespeicherte Turniere müssen vor einer fairen, simultanen Aktionsauflösung kompatibel versioniert und durch Regressionen abgesichert werden. Keine willkürliche 50%-Quote als Passkriterium.
- **Rolling Backlog:** P0 NEXT-109 Diagnose-CI vollständig verifizieren und dann Regel-/Replay-Versionierung + simultane Bewegung/Schussauswertung als separate sichere Implementierungsstufe planen; P0 NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme (manuell); P2 NEXT-108 CI-Artefakt-/Commit-SHA-Provenienz mit Fail-Closed-Negativtests. Refactoring der NEXT-107 Testhelfer unverändert, keine Produktionsengine-Änderung. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Commit, kein publish.php, keine Homepage-Aktualisierung.

## 27.10.2026 · 04:03 Uhr · NEXT-107 Browser-Regression behoben, NEXT-109 Ursachenanalyse begonnen · NICHT VERÖFFENTLICHT
- **Bestätigte Live-Version v0.1.61**, Release-Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, Deploymentstatus `robot-arena/deployment=success`. **Kumulativ seit v0.1.61 vollständig abgeschlossen, getestet und noch NICHT veröffentlicht: 1 Task: NEXT-106** (integriertes Fail-Closed-Evidence-Gate, 733/733, finale CI #40431030229 SUCCESS, Draft-PR #90). NEXT-107 und NEXT-109 ausdrücklich **nicht** als abgeschlossen zählen.
- **P0 Fehlerbehebung NEXT-107:** Finale Dokumentations-CI #40436661581 **FAILED**: 207/208 Browser-Tests erfolgreich, aber NEXT-67 mobile Chromium Replay-Tastaturtest fand Dialog nach `Enter` nicht. Ursache: `setInputFiles()` wartet nicht auf das asynchrone `File.text()` und die Archiv-UI kann den bereits sichtbaren Replay-Button nachträglich ersetzen. Regression im NEXT-107-Branch auf Commit `56ee4e1eba93ca273f9417038a92471ebab4a2bf` gezielt behoben: Test wartet auf das Leeren des Dateiinputs durch `finally`, bevor die Tastaturaktion ausgelöst wird. Kein Retry, kein Click-Fallback, Keyboard-Akzeptanz bleibt verpflichtend. Vollständige neue CI auf Fix-HEAD **noch nicht bestätigt**; alte 736/736 auf vorherigem Commit #40436126584 bleiben historisch, nicht als Freigabe für Fix-HEAD verwenden. Fehlerlauf erneut angestoßen zur Reproduktion.
- **P0 NEXT-109 Ursachenanalyse, Draft-PR #92:** Eigener Branch `feature/NEXT-109-side-initiative-root-cause-unpublished`, neuer deterministischer Test `tests/next109-side-initiative.test.ts` auf Commit `76c90d83cb4523ef1db99f154bde046bf60bf836`. Hypothese aus Codepfad `stepMatchWithEvents`: A bewegt/schießt vor B; bei identischen Raptor-Bots erreicht B nach A-Bewegung zuerst Reichweite (erster B-Schuss Tick 14, erster A-Schuss Tick 15), während bei anfänglicher Waffenreichweite A den ersten Schuss hat. Acht gespiegelte Seeds prüfen, dass das Ergebnis am Startslot und nicht allein an der Strategie hängt. **Tests/CI für NEXT-109 noch nicht bestätigt; keine Produktionsänderung, kein Fairness-Fix als erledigt behauptet.**
- **Rolling Backlog:** P0 NEXT-107 neue Chromium/WebKit Desktop/Mobil-CI auf Fix-HEAD vollständig grün bekommen, PR wieder auf NEXT-106-Basis setzen; P0 NEXT-109 Diagnose-Tests verifizieren, faire Aktionsauflösung (simultane Bewegung/Schuss oder dokumentierte Initiative) entwerfen, deterministische Event-/RNG-/Archiv-Kompatibilität und historische Fixture-Digests prüfen, anschließend mit expliziten Regressionen implementieren; P0 NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme (Hardware manuell); P2 NEXT-108 SHA-/Artefaktprovenienz fail-closed absichern. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Commit, kein Deployment, keine Homepage-Aktualisierung.

## 27.10.2026 · 03:10 Uhr · NEXT-107 finale Quellcode- und Browser-QA 736/736 PASS · NICHT VERÖFFENTLICHT
- **Letzte bestätigte Live-Version v0.1.61** (Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, Deploymentstatus SUCCESS). **Kumulativ seit dieser Veröffentlichung unveröffentlicht und quellen-/browsergetestet: 2 Tasks:** NEXT-106 (733/733, CI #40431030229 SUCCESS, PR #90) und **NEXT-107 NEU** (736/736, CI #40435542286 sowie finale Dokumentations-CI #40436126584 SUCCESS auf vorherigem HEAD `f5ea39d5331172a0c59bc8643dbef411dc756ccd`, PR #91). Diese Statusnotiz ist eine zusätzliche reine Dokumentationsänderung; die CI auf dem neuen Dokumentations-HEAD muss noch abschließend bestätigt werden.
- **NEXT-107:** 8 Seeds × 4 Gegnerstrategien × 2 Chassis × 2 Startseiten = 128 deterministische Kämpfe plus 128 identische Replays, Eingabe-/Struktur-/Energie-/Positionsinvarianten, W/L/D- und Tickstatistiken. **496 Vitest + 32 Node + 208 Chromium/WebKit Desktop/Mobil = 736/736 PASS**, Audit, TypeScript, reproduzierbarer Build, Browser- und integriertes Evidence-Gate grün; Produktionsengine unverändert. Refactoring: reine `robot`-, `observe`-, `summarize`-Testhelfer.
- **Kritische reproduzierbare Diagnose, Ursache noch ungeklärt:** Raptor adaptiv als A 0/8 Siege, als B 8/8 gegen jede der vier Gegnerstrategien; Titan 4/8 als A und 4/8 als B gegen jede Strategie. **P0 NEXT-109** Ursache in sequentieller Bewegung/Schussreihenfolge, Reichweitenschwellen und Szenarien prüfen; Fix nur mit zusätzlichen deterministischen Behavior-/Regressionstests, ohne willkürliche 50%-Fairnessschwelle. **P0 NEXT-79e** echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme weiterhin manuell offen. **P2 NEXT-108** GitHub-SHA-/Artefakt-Provenienz mit Negativtests.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Commit, kein Deployment, keine Homepage-Aktualisierung. NEXT-107 bleibt Draft und wird nach der CI wieder auf NEXT-106 als PR-Basis zurückgestellt.

## 27.10.2026 · 03:03 Uhr · NEXT-107 Quellcode-/Browser-CI 736/736 GRÜN · finale Dokumentations-CI ausstehend · NICHT VERÖFFENTLICHT
- **Letzte bestätigte Live-Version: v0.1.61**, Release-Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, Deploymentstatus SUCCESS. **Kumulativ vollständig abgeschlossen und getestet, noch NICHT veröffentlicht: NEXT-106 (1 Task; 733/733, finale CI #40431030229 SUCCESS, Draft-PR #90)**. **NEXT-107 Quellcode QA-GREEN, finale Dokumentations-CI noch ausstehend** (Draft-PR #91, Branch `feature/NEXT-107-multiseed-side-bias-unpublished`).
- **NEXT-107 Quellcode- und Browserprüfung:** GitHub Actions #40435542286 SUCCESS auf Commit `00fa3600297c2fd19e087213c1dcf5e7a863b3cb`: **496/496 Vitest + 32/32 Node + 208/208 Playwright = 736/736**, Chromium Desktop/Mobil und WebKit Desktop/iPhone, TypeScript/Audit/reproduzierbarer Build und NEXT-106 Evidence-Gate PASS. 8 Seeds × 4 Gegner × 2 Chassis × 2 Startseiten = 128 deterministische Kämpfe plus 128 exakte Replays; W/L/D, Tickzahl, Eingabe-/Zustandsinvarianten. **Formaler Abschluss erst nach grüner CI auf diesem Dokumentations-HEAD.**
- **WICHTIGER NEUER BEFUND (nicht als Ursache bestätigt):** Beim Raptor-Chassis gewinnt Adaptiv als Startseite A **0/8**, als B **8/8** – identisch gegen alle vier Gegnerstrategien. Bei Titan **4/8 als A und 4/8 als B**, ebenfalls identisch gegen alle Gegnerstrategien. Diese auffällige Seitenabhängigkeit und Strategie-Ununterscheidbarkeit ist reproduzierbar, aber die Ursache (z. B. sequentielle A/B-Aktualisierung, Schussreichweiten-Grenze oder Testaufbau) muss untersucht werden. Keine künstliche 50%-Quote als Testschwelle.
- **Refactoring:** `robot`-, `observe`- und `summarize`-Testhelfer, explizite Gewinner-/Zustandsprüfung; Produktionsengine unverändert. **Rolling Backlog:** P0 **NEXT-109** Ursache des Raptor-Seitenbias untersuchen, Ereignis-/Schussreihenfolge charakterisieren, Fix nur mit Determinismus-/Regressionstests; P0 NEXT-79e praktische NVDA-/VoiceOver-/Touch-/Kontrastabnahme (Hardware nötig); P1 NEXT-107 finale Dokumentations-CI und PR-Basis wieder auf NEXT-106; P2 NEXT-108 CI-Commit-/Artefakt-Provenienz, Negativtests. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release, kein Deployment.

## 27.10.2026 · 02:55 Uhr · NEXT-107 implementiert, CI ausstehend · KEIN PUBLISHING
- **Letzte bestätigte Live-Version: v0.1.61** (Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, `robot-arena/deployment=success`). NEXT-99/103/104/105 sind live. **Kumulativ vollständig abgeschlossen und getestet, noch NICHT veröffentlicht: NEXT-106 (1 Task)**, finale CI #40431030229 SUCCESS, 733/733 Tests; Draft-PR #90. Historische Angaben zu v0.1.60/v0.1.61 bleiben unverändert als ältere Zeitstände.
- **Aktuelle Runde: NEXT-107 NEU IMPLEMENTIERT, NICHT ABGESCHLOSSEN.** Eigener Entwicklungsbranch `feature/NEXT-107-multiseed-side-bias-unpublished`, Draft-PR #91 auf NEXT-106 aufgebaut. Neue deterministische Strategie-Diagnostik: 8 Seeds × 4 Gegnerstrategien × 2 Hardwareprofile (Raptor/Titan) × 2 Startseiten = **128 Kämpfe plus 128 identische Replays**. Prüft Sieger-/Unentschiedenlogik, Seed-/Startseitenabdeckung, Struktur/Energie/Positionsgrenzen, unveränderte Definitionen und W/L/D-/Tick-Statistiken je Seite; gibt Seiteneffekte nur diagnostisch aus (keine erfundene 50%-Grenze). **Vollständige CI, Browsermatrix und finaler Dokumentationsstand noch NICHT bestätigt; NEXT-107 nicht als fertig zählen.**
- **Refactoring:** Wiederverwendbare `robot`-, `observe`- und `summarize`-Testhelfer; tautologische Gewinnerprüfung entfernt. Produktionssimulation unverändert. **Rolling Backlog:** P0 NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme (manuell); P1 NEXT-107 CI, Browsermatrix, Fehlerkorrektur und finaler Nachtest; P2 NEXT-108 SHA-/Artefakt-Provenienzprüfung mit Manipulations-Negativtests; P2 NEXT-109 diagnostische Strategie-Berichte als wiederholbare Artefakte (keine harten Fairnessschwellen).
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Versionssprung, kein Deployment, keine Homepage-Aktualisierung.

## 27.10.2026 · 02:13 Uhr · NEXT-106 QUELLCODE-CI GRÜN 733/733 · finale Dokumentations-CI offen · NICHT VERÖFFENTLICHT
- **Letzte bestätigte Live-Version: v0.1.61**, Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, `robot-arena/deployment=success`. NEXT-99/103/104/105 wurden mit v0.1.61 veröffentlicht. **Kumulativ fertig getestet, aber noch nicht veröffentlicht: NEXT-106 (1 Task)**; **vorbehaltlich finaler Dokumentations-CI**. Für den formalen Abschluss bleibt NEXT-106 bis dahin als `Quellcode QA-GREEN / Abschluss ausstehend` gekennzeichnet.
- **NEXT-106 neu implementiert und Quellcode geprüft:** GitHub Actions `#40430379779` SUCCESS auf Commit `ededd434da1e856d4ff190370fe5655cc29445eb`: **493/493 Vitest, 32/32 Node, 208/208 Playwright (92 Desktop-Chromium, 92 Mobil-Chromium, 12 Desktop-WebKit, 12 iPhone-WebKit) = 733/733**. TypeScript, Audit, reproduzierbarer Build und Browser-Gate PASS; 0 flaky/unerwartet. Zusätzlicher integrierter Evidence-Gate PASS auf 18 gezielt wiederholten Vitest-Assertions und der vollständigen Browsermatrix; Artefakt `robot-arena-integrated-evidence` gespeichert. Neue Node-Negativtests (6) für fehlende, fehlerhafte, übersprungene und inkonsistente Evidenz bestanden.
- **Refactoring:** Das neue Gate verwendet `evaluateBrowserMatrix` von NEXT-97 statt Browser-Regeln zu duplizieren. CI liest echte Vitest-/Playwright-JSON-Runnergebnisse; das Gate bleibt **read-only**, `releaseAuthorized=false`, `readyForManualRelease=false`. Es ersetzt weder GitHub-SHA-/Artefakt-Provenienzprüfung noch echte NEXT-79e Accessibility-Abnahme.
- **Nächste Aufgaben:** P0 NEXT-79e manuelle NVDA-/VoiceOver-/Touch-/Kontrastabnahme; P1 NEXT-106 finale CI auf Dokumentations-HEAD; P2 NEXT-107 zusätzliche deterministische Startseiten-/Seed-Balance-Diagnostik; P2 NEXT-108 GitHub-CI-SHA-/Artefaktprovenienz und Manipulationstests. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Versionssprung, kein Deployment.

## 27.10.2026 · 02:10 Uhr · v0.1.61 LIVE bestätigt; NEXT-106 implementiert, CI ausstehend · KEIN PUBLISHING IN DIESER RUNDE
- **Letzte verifizierte Veröffentlichung: v0.1.61**, Merge-Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, GitHub-Status `robot-arena/deployment=success`. NEXT-99 (120-Kampf-Multitab), NEXT-103 (adaptive Strategie), NEXT-104 (integrierter Archiv-Replay), NEXT-105 (gespiegelte Seed-Balance) wurden in v0.1.61 veröffentlicht. Historische Abschnitte mit v0.1.60 beziehen sich ausdrücklich auf ältere Zeitstände.
- **Kumulativ fertig getestet und seit v0.1.61 noch NICHT veröffentlicht: 0 NEXT-Tasks.** **NEXT-106 NEU IN ARBEIT:** eigener Branch `feature/NEXT-106-integrated-evidence-gate-unpublished`. Read-only maschinenlesbares Release-Evidence-Gate prüft echte Vitest-JSON-Runnergebnisse (adaptive Strategie, 120-Kampf-/Archivintegration, gespiegelte Balance) und Playwright-JSON-Ergebnisse (NEXT-99 und NEXT-103 auf Chromium/WebKit Desktop/Mobil). Fehlende, übersprungene, fehlerhafte oder flaky Belege blockieren. GitHub-CI soll diese Belege erzeugen und den Gate-Report als Artefakt speichern; **Quellcode/CI noch nicht abschließend verifiziert; NEXT-106 NICHT als abgeschlossen zählen.**
- **Release-Sicherheit:** Der Gate-Report autorisiert ausdrücklich KEIN Release; `releaseAuthorized=false`, `readyForManualRelease=false`, externe CI-SHA-Provenienzprüfung und echte NEXT-79e NVDA-/VoiceOver-/Touch-/Kontrastabnahme bleiben erforderlich. CI nur auf PR/Entwicklungsbranch, kein Merge nach main, kein Versionssprung, kein Deployment.
- **Refactoring:** Gemeinsame JSON-Runner-Evidenzvalidierung statt duplizierter Browser-Matrixlogik (NEXT-97 wiederverwendet). Neue Node-Regressionsfälle prüfen Positivpfad, fehlende Unit-/Browser-Suites, übersprungene Assertions, gefälschte Zählwerte, Browser-Flakiness und CLI-Fail-Closed.
- **Rolling Backlog:** P0 NEXT-79e: reale NVDA-/VoiceOver-/Touch-/Kontrastabnahme dokumentieren; P1 NEXT-106: CI des finalen HEAD verifizieren, Fehler korrigieren, Browsermatrix, Artefakt und Regression prüfen; P2 NEXT-107: Seiteneffekt- und Balancestatistik über zusätzliche deterministische Seeds und Startpositionen auswerten; P2 NEXT-108: GitHub-SHA-/Artefaktprovenienz für Gate-Berichte verifizieren und negative Manipulationstests ergänzen. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 27.10.2026 · 00:59 Uhr · NEXT-105 Quellcode QA-GREEN 727/727, finale Dokumentations-CI offen · NICHT VERÖFFENTLICHT
- **Bestätigte Live-Basis: v0.1.60**, Release-Commit `c302ceed9bb5bb6646145297142b60c6bf61f40c` mit GitHub-Status `robot-arena/deployment=success`. **Kumulativ vollständig abgeschlossen, getestet, noch NICHT veröffentlicht: 3 Tasks:** NEXT-99 (676/676, PR #84), NEXT-103 (717/717, PR #85; WebKit-Nachtests erfolgreich), NEXT-104 (722/722, PR #87; abschließende Dokumentations-CI #40410051468 SUCCESS). Diese drei Tasks bleiben bis zur bestätigten manuellen Veröffentlichung auf der Liste.
- **Aktuelle Runde: NEXT-105 Quell-CI erfolgreich, finale Dokumentationsprüfung offen.** CI #40416565741 SUCCESS auf PR #88 mit HEAD `d625774d8cf03222fc5fa78fd3a333dbf3652846`: 493/493 Vitest Unit/Behavior/Regression/Determinismus, 26/26 Node, 208/208 Playwright (92 Chromium Desktop, 92 Chromium Mobil, 12 WebKit Desktop, 12 WebKit iPhone) = **727/727**, 0 flaky/unerwartet, Browser-Release-Gate PASS, TypeScript, Dependency-Audit und reproduzierbarer Build PASS. NEXT-105 enthält 48 adaptive Spiegelmatches gegen vier Strategien mit sechs Seeds und vertauschten Startseiten plus 48 identische Replays, Zustands-/Grenz-/Input-Invarianten und Seitenstatistik. **Nicht als endgültig abgeschlossen zählen, bis die CI auf diesem Dokumentations-HEAD grün ist.**
- **Refactoring:** Gemeinsame `mirrored`-/`inspect`-Testhelfer für deterministische Spiegelmatches und Zustandsgrenzen; Produktionssimulation unverändert. **Rolling Backlog:** P0 NEXT-79e praktische NVDA-/VoiceOver-/echte Touch-/Kontrastabnahme (manuelle Hardware nötig); P1 NEXT-105 abschließende Dokumentations-CI und PR-Basis auf NEXT-104 zurücksetzen; P2 NEXT-106 maschinenlesbares integriertes Release-Gate für adaptive Strategie, Archiv-Replay, 120-Kampf-Stresstest und Browserfreigabe (fehlende Belege müssen fail-closed sein); P2 NEXT-107 deterministische Strategie-Seiteneffekt-Auswertung über weitere Seeds und Szenarien, ohne harte 50%-Schwelle. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Commit, kein Deployment, kein publish.php und keine Homepage-Aktualisierung.

## 26.10.2026 · 23:55 Uhr · NEXT-105 implementiert, vollständige CI ausstehend · NICHT VERÖFFENTLICHT
- **Live bestätigt: v0.1.60**, Release-Commit `c302ceed9bb5bb6646145297142b60c6bf61f40c`, `robot-arena/deployment=success`. **Kumulativ vollständig getestet, aber NICHT veröffentlicht: 3 Tasks**: NEXT-99 (676/676, CI #40393733293, Draft-PR #84), NEXT-103 (717/717, CI #40402592636, Draft-PR #85), NEXT-104 (722/722 auf Quell-Commit, CI #40409230341, Draft-PR #87; finale Dokumentations-CI #40410051468 SUCCESS). NEXT-97/101/102/92/93/98 sind seit v0.1.60 veröffentlicht.
- **Aktuelle Runde:** NEXT-104 finale Dokumentations-CI #40410051468 SUCCESS verifiziert. **NEXT-105 IMPLEMENTIERT, NICHT ABGESCHLOSSEN**: neuer isolierter Branch `feature/NEXT-105-adaptive-mirror-balance-unpublished`, Draft-PR #88, deterministische spiegelbildliche Seed-Matches für Adaptiv gegen Aggressiv/Defensiv/Distanz/Nahkampf (6 Seeds, je A/B-Seite, 48 Matches + 48 identische Replay-Läufe), Struktur-/Energie-/Arenagrenzen, terminale Ergebnisse, Seitendeckung und Input-Unveränderlichkeit. Win/Loss/Draw und Tickzahlen werden getrennt nach Startseite diagnostiziert; keine erfundene 50%-Fairnessschwelle. **CI und Browser-/Build-Gate auf neuem HEAD noch ausstehend; NEXT-105 NICHT zu den 3 fertigen Tasks zählen.** Refactoring: eine gemeinsame `mirrored`-Testhilfe und ein `inspect`-Invariantenprüfer; Produktionssimulation unverändert.
- **Rolling Backlog:** P0 NEXT-79e praktische NVDA/VoiceOver/echte Touch-/Kontrastabnahme (Hardware nötig); P1 NEXT-104 endgültige CI auswerten und NEXT-105 vollständige CI auswerten/Fehler beheben; P2 NEXT-106 maschinenlesbares integriertes Release-Gate und Seiteneffekt-Diagnostik, ohne automatischen Versionssprung. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Commit, kein Deployment, kein publish.php, keine Homepage-Aktualisierung. Andere Automationen unverändert.

## 26.10.2026 · 23:10 Uhr · NEXT-104 NEU QA-GREEN 722/722 · NICHT VERÖFFENTLICHT
- **Bestätigte Live-Version v0.1.60**, Release-Commit `c302ceed9bb5bb6646145297142b60c6bf61f40c`, GitHub-Deploymentstatus `robot-arena/deployment=success`. NEXT-97/101/102/92/93/98 sind bereits veröffentlicht.
- **KUMULATIV FERTIG, GETESTET, NICHT VERÖFFENTLICHT: 3 Aufgaben:** NEXT-99 (16-Roboter-/120-Kampf-Multi-Tab, **676/676**, CI #40393733293, PR #84); NEXT-103 (adaptive Strategie und Behavior-/Determinismusabnahme, **717/717**, CI #40402592636, PR #85, zusätzlich WebKit-Abdeckung jetzt in Integration erfolgreich); **NEXT-104 NEU** (gemeinsame Integrations-QA, **722/722**, CI **#40409230341 SUCCESS** auf Source-HEAD `44b2b023504c770410aa24b09efaac31d1188ac1`, Draft-PR #87). Abschließende CI auf diesem neuen Dokumentations-HEAD noch prüfen.
- **Aktuelle Runde (2 Tasks):** NEXT-103 fehlende Safari-/iPhone-WebKit-Ausführung der adaptiven UI-Akzeptanz ergänzt, jetzt **12/12 WebKit Desktop und 12/12 WebKit iPhone erfolgreich**. **NEXT-104 NEU ABGESCHLOSSEN:** drei Vitest-Integrationstests für 16 Roboter mit aggressiver, defensiver, adaptiver, Distanz- und Nahkampfstrategie; 120 Paarungen mit balancierter Seitenzuordnung; Seeds 1 und 4711; Pause nach 60, Archivexport/Import, deterministisches Fortsetzen vs. Durchlauf, 120 eindeutige IDs/Seeds, adaptive Teilnehmer auf beiden Seiten, Manipulationsabwehr. Erster CI-Lauf #40409150951 deckte einen zu engen Testfehlertext auf; Assertion korrigiert, vollständige CI danach grün. Keine Änderung der Produktionssimulation.
- **Vollständige CI #40409230341:** 488/488 Vitest Unit/Behavior/Regression/Determinismus, 26/26 Node, 208/208 Playwright (92 Chromium Desktop + 92 Chromium Mobil + 12 WebKit Desktop + 12 WebKit iPhone) = **722/722**, 0 flaky/unerwartet, Browser-Gate PASS, Typecheck, Security-Audit, reproduzierbarer Build PASS.
- **Refactoring:** gemeinsame `definition`-/`advanceTo`-Testhelfer, WebKit-Testmatrix ergänzt. NEXT-104 Branch `feature/NEXT-104-adaptive-120-integration-qa-unpublished` und Draft-PR #87; für vollständige CI vorübergehend PR-Basis main, danach zurück auf NEXT-103; **KEIN MERGE**. Rolling Backlog: P0 NEXT-79e echte NVDA/VoiceOver-/Touch-/Kontrastabnahme (manuell offen); P1 finale Dokumentations-CI; P2 NEXT-105 mehrseedige adaptive Strategie-Balance/Spiegelmatches; P2 NEXT-106 maschinenlesbares integriertes Release-Gate ohne Versionssprung. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, kein Release-Commit, kein Deployment, kein publish.php, keine Homepage-Änderung.

## 26.10.2026 · 23 Uhr · NEXT-103 WebKit-Abdeckung korrigiert / NEXT-104 Integrations-QA implementiert · CI OFFEN · KEIN PUBLISHING
- **Live bestätigt: v0.1.60** (Release-Commit `c302ceed9bb5bb6646145297142b60c6bf61f40c`, GitHub `robot-arena/deployment=success`). NEXT-97/101/102/92/93/98 sind veröffentlicht.
- **KUMULATIV FERTIG, GETESTET, NICHT VERÖFFENTLICHT: 2 Aufgaben.** NEXT-99: Multi-Tab-Stress mit 16 Robotern/120 Kämpfen, **676/676**, finale CI #40393733293 SUCCESS, Draft-PR #84. NEXT-103: adaptive Strategie, Unit/Behavior/Determinismus, Browser Desktop/Mobil, **717/717**, finale Dokumentations-CI #40402592636 SUCCESS, Draft-PR #85. Die neue zusätzliche WebKit-E2E-Prüfung ist noch nicht bestätigt und wird deshalb nicht als bereits bestanden gemeldet.
- **Aktuelle Runde (2 Aufgaben):** NEXT-103 Browser-Testlücke behoben: `e2e/next103-adaptive-strategy.spec.ts` war bisher nur in Chromium enthalten, jetzt explizit in Desktop-WebKit und iPhone-WebKit aufgenommen; vollständige erneute CI nötig. NEXT-104 **IMPLEMENTIERT, NICHT ABGESCHLOSSEN**: 16 Teilnehmer (aggressiv, defensiv, adaptiv, Distanz, Nahkampf), 120 Round-Robin-Partien mit balancierter Seitenzuordnung, zwei Seeds, Pause nach 60 Partien, JSON-Archiv Export/Import, deterministisches Fortsetzen vs. durchgehender Lauf, Ergebnis-/Seed-/ID-Integrität, Adaptiv auf beiden Seiten, manipulierte Match-ID ablehnen. Drei neue Vitest-Integrationstests; CI auf endgültigem Branch-HEAD ausstehend. Keine Produktionssimulation verändert.
- **Refactoring:** `advanceTo` und `definition` als wiederverwendbare Integrations-Testhelfer; NEXT-103 WebKit-Matrix ergänzt. Branch `feature/NEXT-104-adaptive-120-integration-qa-unpublished`, Draft-PR #87 (für vollständige PR-QA vorübergehend gegen main, ausdrücklich KEIN MERGE). Gestapelte Vorarbeiten NEXT-99 #84, NEXT-103 #85 bleiben unveröffentlicht.
- **Rolling Backlog:** P0 NEXT-79e manuelle NVDA/VoiceOver/echte Touch- und Kontrastabnahme (Hardware erforderlich, offen); P1 NEXT-103 WebKit-Regression und NEXT-104 komplette GitHub-CI, Fehler priorisiert beheben; P2 NEXT-105 mehrseedige adaptive Balance mit Spiegelmatches und Seitenfairness; P2 NEXT-106 Release-Kandidaten-Gate mit Integritätsprüfung und Dokumentation ohne automatischen Versionssprung. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, Release-Commit, publish.php oder Homepage-Update.

## 26.10.2026 · 22:15 Uhr · NEXT-103 NEU QA-GREEN 717/717 · NICHT VERÖFFENTLICHT
- **Bestätigte Live-Version v0.1.60:** Release-Commit `c302ceed9bb5bb6646145297142b60c6bf61f40c`, `robot-arena/deployment = success`. Die Aufgaben NEXT-97/101/102/92/93/98 sind veröffentlicht. **Kumulativ seit v0.1.60 fertig, vollständig getestet und NICHT veröffentlicht: 2 Tasks:** **NEXT-99** (16 Roboter/120 Kämpfe, Multi-Tab-Stress, 676/676, finale CI #40393733293 SUCCESS, Draft-PR #84) und **NEXT-103 NEU** (adaptive Taktik samt deterministischen Behavior-/Regressions-/Import- und Desktop-/Mobiltests, **717/717**, CI #40401707130 SUCCESS auf Code+vorangehender Dokumentation SHA `5aba7b7dcb4d3814adcf46ccef8684b6e4d7ee98`, Draft-PR #85).
- **NEXT-103 Umsetzung:** Adaptive Strategie ergänzt vorhandene aggressive, defensive, Distanz- und Nahkampf-Strategien. Gesundheits-/Energie-/Reichweitenbedrohung steuern deterministisches Annähern, Zurückweichen und Nicht-Verfolgen; vorhandene Strategien und ihre historischen Digest-Fixtures bleiben unverändert. Die Konfiguration erlaubt bei Adaptiv Zielabstand, Rückzugsschwelle, Sicherheitsabstand und Energiereserve. Preset- und Turnierimport round-trippen; Browser-UI Desktop/Mobil getestet. **QA:** 485/485 Vitest (Unit/Behavior/Regression/Determinismus), 26/26 Node, 206/206 Playwright (92 Chromium Desktop, 92 Chromium Mobil, 11 WebKit Desktop, 11 WebKit iPhone), 0 flaky/unerwartet, Browser-Gate PASS, TypeScript, Security-Audit und reproduzierbarer Build erfolgreich. Eine echte CI-Regression (negatives Null bei Bewegung mit Tempo 0) wurde behoben und mit erneuter Gesamt-CI verifiziert. Dieses abschließende Statusupdate benötigt erneut eine CI auf dem letzten Dokumentations-HEAD.
- **Rolling Backlog:** (P0 manuell) NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme; (P1) NEXT-103 finale CI auf Dokumentations-HEAD kontrollieren; (P2) NEXT-104 isolierte Integration von NEXT-99/103, Determinismus-/Replay-/Turnier-Abnahme, Konflikt- und Release-Gate ohne Merge/Publish; (P2) NEXT-105 adaptive Strategiebalance mit mehreren Seeds, Spiegelmatches, messbaren Rückzug-/Siegraten und Fairnessdiagnostik. **Refactoring:** zentrale pure Strategie-Bewegungsentscheidung mit kanonischem Nullwert; bestehende Strategien regressionsgesichert.
- **Branches:** NEXT-99 Draft-PR #84; NEXT-103 eigenständiger darauf aufbauender Draft-PR #85. **KEIN MERGE NACH MAIN, KEIN PUBLISH/DEPLOYMENT, KEIN RELEASE-COMMIT, KEINE HOMEPAGE-AKTUALISIERUNG. NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Andere Automationen unverändert.

## 26.10.2026 · 22 Uhr · NEXT-103 ADAPTIVE STRATEGIE IMPLEMENTIERT · FINALE CI OFFEN · NICHT VERÖFFENTLICHT
- **Bestätigte Live-Basis v0.1.60:** GitHub Release-Commit `c302ceed9bb5bb6646145297142b60c6bf61f40c` hat `robot-arena/deployment = success`; NEXT-97/101/102/92/93/98 veröffentlicht. **Kumulativ seit v0.1.60 fertig/getestet und unveröffentlicht: GENAU 1 Task NEXT-99** (16 Roboter, 120 Kämpfe, 2 Browser-Tabs, konfliktfeste Speicherung und 120/120 nach Reload, **676/676** Unit/Node/Chromium/WebKit Desktop/Mobil, finale CI #40393733293 SUCCESS auf Commit `4d6663679a4006e2852e30a2286c002264aab363`, Draft-PR #84).
- **Aktuelle Runde: NEXT-103 IN ARBEIT, NICHT ALS FERTIG ZÄHLEN.** Auf eigenem, auf #84 aufbauendem Branch/Draft-PR #85 wurde eine echte adaptive Strategie implementiert: gesund annähern, bei Struktur <= Rückzugsschwelle oder Energiemangel Abstand gewinnen und Verfolgung stoppen, bei einsatzbereiter überlegener gegnerischer Waffenreichweite ausweichen; reine deterministische Bewegungsentscheidung ohne RNG/Mutation. UI zeigt für Adaptiv sowohl Zielabstand als auch Rückzugsschwelle/Sicherheitsabstand. Import von Presets und Turnieren unterstützt die Strategie. Neue Unit-/Behavior-/Regressionstests prüfen Grenzfälle, Energie/Cooldown, historische Strategien, Seeds, Replay, Bounds und Import; neuer Playwright-Desktop-/Mobiltest prüft Auswahl, Validierung, Übernehmen und Reset. **CI #40401512951 gestartet; vollständige Freigabe erst nach erfolgreichem Abschluss und erneuter CI auf dem finalen Dokumentations-HEAD.** Kein Release- oder Versionssprung.
- **Rolling Backlog:** (P0 manuell) NEXT-79e: reale NVDA-/VoiceOver-Screenreader, physische Touch-Bedienung und Kontrastmessung; keine automatischen Tests als Ersatz ausgeben. (P1) NEXT-103: vollständige Unit-/Behavior-/Regression-/Determinismus- und Chromium-/WebKit-Desktop-/Mobil-CI auswerten, Fehler beheben, historische Digest-Fixtures unangetastet lassen, Abschluss-QA auf Dokumentations-HEAD. (P2) NEXT-104: integrierten Kandidaten aus NEXT-99/103 auf eigenem Branch nur testen, bei Konflikten refactoren, kein Merge nach main und kein Publish; deterministische Turnier-Rangfolge und Gameplay-v0.2-Gate separat prüfen. (P2) NEXT-105: langfristige adaptive Taktik-Qualität mit mehr Seeds, Spiegelmatches und nachvollziehbaren Strategie-Statistiken messen, ohne Sieggarantie zu behaupten.
- **Branch-Disziplin:** NEXT-99 Draft-PR #84 QA-GREEN, NEXT-103 separater Draft-PR #85 auf #84 gestapelt. **KEIN MERGE NACH MAIN, KEIN PUBLISHING/DEPLOYMENT, KEIN RELEASE-COMMIT, KEINE HOMEPAGE-AKTUALISIERUNG. NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Andere Automationen unverändert.

## 26.10.2026 · 21:15 Uhr · v0.1.60 DEPLOYMENT BESTÄTIGT · NEXT-99 FERTIG 676/676 · NICHT VERÖFFENTLICHT
- **NEUE BESTÄTIGUNG:** GitHub `main`-Release-Commit `c302ceed9bb5bb6646145297142b60c6bf61f40c` hat jetzt den Status **`robot-arena/deployment = success`**. Der Publish-Workflow vergibt diesen Status erst nach erfolgreicher Homepage-/Release-/Build-Info-Prüfung. **Letzte bestätigte veröffentlichte Version: v0.1.60.** Darin enthalten: NEXT-97, NEXT-101, NEXT-102, NEXT-92, NEXT-93, NEXT-98. Direkter externer Abruf war aus dieser Umgebung nicht möglich; GitHub-Deploymentstatus ist die Verifikationsquelle.
- **KUMULATIV FERTIG/GETESTET, ABER SEIT v0.1.60 NICHT VERÖFFENTLICHT: GENAU 1 TASK – NEXT-99.** Zwei echte Browser-Tabs, 16 Roboter, 120 Kämpfe, 120 eindeutige Match-IDs, stale-tab Revisionskonflikt verhindert, 120/120 nach Reload, Autosave <2 MiB. **Finale Code- und Dokumentations-CI #40392837356 SUCCESS** auf Commit `ed1ab6569986eb8646f0104061c2985de1597b85`: **446 Vitest + 26 Node + 204 Playwright = 676/676**, Chromium Desktop/Mobil 91+91, WebKit Desktop/iPhone 11+11, 0 flaky/unerwartet, TypeScript, Audit, reproduzierbarer Build und Browser-Gate PASS. Die nun ergänzte Deploymentstatus-Dokumentation löst erneute CI aus; nur diese Dokumentationsänderung ist danach noch nicht separat verifiziert.
- **Branch/PR:** Isolierter Branch `feature/NEXT-99-v0160-120-match-stress-unpublished`, **Draft-PR #84**, 0 Commits hinter `main`, 9 geänderte Dateien; veralteter divergierter Draft-PR #82 ohne Merge geschlossen. Refactoring: Browser-Snapshot-/Zählhelfer; Simulationsengine unverändert. **KEIN PUBLISHING in dieser Entwicklungsrunde.**
- **Rolling Backlog:** NEXT-79e manuelle NVDA-/VoiceOver-/Touch-/Kontrastabnahme offen; NEXT-99 letzte Dokumentations-CI kontrollieren; NEXT-103 adaptive Strategie ist noch nicht in `STRATEGY_TYPES` implementiert, daher zuerst Implementierung und deterministische Aggressiv/Defensiv/Adaptiv-Behavior-Tests; NEXT-104 Release-Kandidaten-Integration erst nach ausdrücklicher Freigabe. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Andere Automationen unverändert.

## 26.10.2026 · 21:10 Uhr · NEXT-99 NEU ABGESCHLOSSEN AUF v0.1.60 · 676/676 · NICHT VERÖFFENTLICHT
- **Neue vollständige Integrations-QA:** GitHub Actions Development Tests **#40391895441 SUCCESS** auf Entwicklungsbranch-Commit `7a824c5c5a86c4be9d638f808516fa07ae7e9860`: **446/446 Vitest**, **26/26 Node**, **204/204 Playwright** (91 Chromium Desktop + 91 Chromium Mobil + 11 WebKit Desktop + 11 WebKit iPhone) = **676/676**. Browser-Gate PASS, 0 unerwartete und 0 flaky Browserergebnisse, TypeScript/Build/Audit/reproduzierbarer Build grün. Originaler isolierter NEXT-99-Code bereits auf #40382680196 erfolgreich geprüft; nach v0.1.60-Merge identisch auf neuen Branch portiert und erneut erfolgreich getestet.
- **NEXT-99 NEU FERTIG:** 16 Roboter/120 deterministische Kämpfe, zwei echte Tabs, 120 eindeutige Match-IDs, atomare Speicherung, veraltete Revision zurückgewiesen, 120/120 Ergebnisse nach Reload wiederhergestellt, JSON <2 MiB. Refactoring: wiederverwendbare Browser-Snapshot-/Zählhelfer; Simulationsengine unverändert. **Draft-PR #84** ist die einzige aktuelle NEXT-99-Integrations-PR; veraltete #82 wird abgelöst. Dieses Dokumentationsupdate löst eine erneute CI aus; Erfolg auf dem vorangehenden Quell-/Dokumentationsstand ist bestätigt.
- **Veröffentlichungsstatus:** **Sicher fertig/getestet und NICHT veröffentlicht: 1 Task NEXT-99 (676/676).** **6 weitere Tasks mit ungeklärtem Homepage-Veröffentlichungsstatus** (auf GitHub `main` in v0.1.60 integriert): NEXT-97 (648/648), NEXT-101 (654/654), NEXT-102 (654/654), NEXT-92 (659/659), NEXT-93 (660/660), NEXT-98 (672/672). GitHub `main`-Version 0.1.60 bestätigt; für den Release-Commit `c302ceed9bb5bb6646145297142b60c6bf61f40c` keine erfolgreiche Deployment-Statusmeldung abrufbar und Live-Metadaten nicht erreichbar. **Nicht behaupten, dass diese sechs noch unveröffentlicht oder schon live sind.**
- **Nächste Tasks:** P0 NEXT-79e echte NVDA/VoiceOver/Touch-/Kontrastabnahme (manueller Blocker); P1 NEXT-99 Dokumentations-CI und alte PR bereinigen; P2 NEXT-103 deterministische Aggressiv/Defensiv/Adaptiv-Strategie-Behavior-Tests (Adaptive Strategie existiert noch nicht in `STRATEGY_TYPES`, zuerst Implementierung/Abnahmekriterien); P2 NEXT-104 integrierter Release-Kandidat nur nach ausdrücklicher Freigabe. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein `main`-Merge, Publish-Workflow, Release-Commit, publish.php oder Homepage-Update in diesem Entwicklungslauf.

## 26.10.2026 · 21 Uhr · NEXT-99 676/676 QA-GREEN AUF URSPRUNGSCOMMIT · PORT AUF v0.1.60 IN INTEGRATIONS-QA · NICHT VERÖFFENTLICHT
- **GitHub-Basis:** `main` enthält v0.1.60 (Release-Merge `c302ceed9bb5bb6646145297142b60c6bf61f40c`). **Homepage-Deployment nicht verifiziert:** Für den Release-Commit lag bei der Prüfung kein erfolgreicher `robot-arena/deployment`-Status vor; externe `version.json`/`build-info.json` waren nicht erreichbar. Die sechs früheren NEXT-97, NEXT-101, NEXT-102, NEXT-92, NEXT-93 und NEXT-98 sind in `main` integriert; ihr tatsächlicher Homepage-Veröffentlichungsstatus ist **ungeklärt**. Nicht als weiterhin sicher unveröffentlicht oder sicher live ausgeben.
- **Aktuelle Runde (NEXT-99):** Ursprungscode auf Branch `feature/NEXT-99-120-match-multitab-stress-unpublished` Commit `37db5b9a4bff17dbaeddd2ae1090bb45400f3685`: GitHub Actions **#40382680196 SUCCESS** auf exakt diesem Commit, **676/676** (446 Vitest Unit/Behavior/Regression/Determinismus + 26 Node + 204 Chromium/WebKit Desktop/Mobil). Zwei echte Tabs, 16 Roboter, 120 Kämpfe, 120 eindeutige Match-IDs, atomarer Autosave, veraltete Revision wird abgewiesen, Reload rekonstruiert 120/120, gespeichertes JSON <2 MiB. Build, Typecheck, Audit und Browser-Gate grün; keine Änderungen an der Produktionssimulation.
- **Integration:** Nach manueller Freigabe und Merge von v0.1.60 divergierte der alte NEXT-99-Branch (11 ahead/4 behind); daher Testdatei und Playwright-Browsermatrix **inhaltlich identisch** auf neuem, isoliertem Branch `feature/NEXT-99-v0160-120-match-stress-unpublished` von aktuellem `main` portiert. Abschließende Integrations-CI auf dem neuen Branch nach Dokumentationsänderungen erforderlich, bevor Release-Reife behauptet wird. Kein Merge/Publish/Deployment.
- **Kumulativ nach letzter bestätigter Homepage-Version v0.1.59:** **1 sicher nicht veröffentlichter, auf Ursprungscode vollständig getesteter Task: NEXT-99 (676/676; Port-CI offen)**. **6 weitere vollständig getestete Tasks mit Veröffentlichungsstatus ungeklärt:** NEXT-97 (648/648), NEXT-101 (654/654), NEXT-102 (654/654), NEXT-92 (659/659), NEXT-93 (660/660), NEXT-98 (672/672). Diese sechs wurden in GitHub v0.1.60 integriert, Homepage nicht bestätigt.
- **Rolling Backlog:** P0 NEXT-79e praktische NVDA/VoiceOver/echte Touch-/Kontrastabnahme (nicht automatisierbar); P1 NEXT-99 neue v0.1.60-Branch-CI verifizieren und alten Draft-PR nach grüner neuer PR bereinigen; P2 NEXT-103 aggressive/defensive/adaptive deterministische Behavior-Tests; P2 NEXT-104 Release-Kandidaten-Integration nach ausdrücklicher manueller Freigabe. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · 20 Uhr · NEXT-98 NEU QA-GREEN · 672/672 · NICHT VERÖFFENTLICHT
- **Bestätigte Live-Basis:** v0.1.59, main unverändert. **Aktuelle Runde (2 Tasks):** NEXT-93 **NEU ABGESCHLOSSEN** (660/660, CI #40366908197); **NEXT-98 NEU ABGESCHLOSSEN** (GitHub Actions Development Tests **#40373627251 SUCCESS** auf Quell-/Dokumentations-Commit `1bd3ed5df4a6113bf9186513ce034994a52e64b6`). **672/672 Tests erfolgreich:** 446 Vitest Unit/Behavior/Regression/Determinismus, 26 Node, 200 Playwright = 90 Chromium Desktop + 90 Chromium Mobil + 10 WebKit Desktop + 10 WebKit iPhone; TypeScript, Security-Audit, reproduzierbarer Build und Browser-Release-Gate grün, 0 unerwartete/flaky Browserergebnisse.
- **NEXT-98 Verhalten:** Browser-Reload während originweitem Web Lock darf keinen vorzeitigen oder nachträglichen Ghost-Write auslösen; konkurrierende gültige Revision bleibt nach Konflikt und Reload erhalten; QuotaExceededError zerstört weder das laufende Turnier im RAM noch den letzten gültigen Snapshot. Drei neue E2E-Regressionen je Desktop/Mobil-Browser. Keine Änderung an der Simulationsengine. Refactoring: wiederverwendbare Lock-/Storage-/Setup-Helfer in eigenständigem Testmodul.
- **Kumulativ seit bestätigter Veröffentlichung v0.1.59: 6 vollständig implementierte, getestete und NICHT veröffentlichte Tasks:** NEXT-97 (648/648), NEXT-101 (654/654), NEXT-102 (654/654), NEXT-92 (659/659), **NEXT-93 NEU (660/660)**, **NEXT-98 NEU (672/672)**. NEXT-100 reine Statusprüfung; NEXT-80/84/94/95/96 sind veröffentlicht. Statusdokumentation aktualisiert; CI auf diesem endgültigen Dokumentations-HEAD erneut prüfen.
- **Rolling Backlog:** P0 NEXT-79e manuelle NVDA-/VoiceOver-/echte Touch-/Kontrastabnahme (offen); P2 NEXT-99 Multi-Tab-Stress 16 Roboter/120 Kämpfe und Speicher-/Ressourcenmessung; P2 NEXT-103 aggressive/defensive/adaptive Strategien mit deterministischen Behavior-Seeds nachweisen; P2 NEXT-104 Release-Kandidaten-Integration nach manueller Freigabe ohne automatischen Versionssprung. **Draft-PR #81** auf #80; kein Merge, kein Release, kein Publish, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · 19 Uhr · NEXT-93 QA-GREEN / NEXT-98 IMPLEMENTIERT, FINALE CI OFFEN · NICHT VERÖFFENTLICHT
- **Bestätigte Live-Basis:** v0.1.59; main unverändert. **Aktuelle Runde (2 Aufgaben):** NEXT-93 **NEU ABGESCHLOSSEN** (GitHub Actions #40366908197 SUCCESS, 446 Vitest + 26 Node + 188 Chromium/WebKit = **660/660** auf Commit `4bd9e09fe0878ea0d50ea587859dc99c424b4dc5`). NEXT-98 **IN ARBEIT**: drei neue Playwright-E2E-Regressionen für Reload während gehaltenem Web Lock ohne Ghost-Write, konkurrierende valide Revision mit sicherer Wiederherstellung und Quota-Fehler ohne Verlust des letzten gültigen Snapshots; Chromium Desktop/Mobil plus WebKit Desktop/iPhone. **NEXT-98 erst nach grüner vollständiger CI als abgeschlossen melden.**
- **Kumulativ vollständig getestet und NICHT veröffentlicht seit v0.1.59: 5 Tasks:** NEXT-97 (648/648), NEXT-101 (654/654), NEXT-102 (654/654), NEXT-92 (659/659), **NEXT-93 NEU (660/660)**. NEXT-98 nicht mitzählen, solange QA aussteht. NEXT-79e reale NVDA-/VoiceOver-/Touch-/Kontrastabnahme bleibt manuell offen.
- **Refactoring:** Browser-Test-Helfer für Lock-Halte-/Freigabe, persistierten Zähler und reproduzierbaren Turnieraufbau isoliert; keine Änderung an der Simulationsengine. **Rolling Backlog:** (P1) NEXT-98 vollständige Desktop-/Mobil-/WebKit-CI und Fehlerkorrekturen, (P2) NEXT-99 16 Roboter/120 Kämpfe Multi-Tab, (P2) NEXT-103 Strategien anhand deterministischer Behavior-Seeds vergleichen; (P0 manuell) NEXT-79e. **Draft PR #81**, auf NEXT-93 Draft PR #80 aufgebaut. **KEIN MERGE, RELEASE, PUBLISH ODER DEPLOYMENT.**

## 26.10.2026 · 19 Uhr · NEXT-93 NEU ABGESCHLOSSEN · NICHT VERÖFFENTLICHT
- **Bestätigte Live-Basis:** v0.1.59 (Deploymentstatus success); `main` unverändert. **Aktuelle Runde (1 Task): NEXT-93 NEU ABGESCHLOSSEN.** Drei authentische erfolgreiche CI-Ressourcenläufe #40266761987, #40267008446, #40355252200 chronologisch verglichen; 2/4/8/16 Roboter, 1/6/28/120 Kämpfe, deterministische Archivgrößen 815/2082/6646/24004 Byte; zwei benachbarte Trends und First-to-Last-Diagnostik, keine fragilen Laufzeit-/Heap-Grenzwerte. Zwei neue Vitest-Regressionen.
- **Finale Code- und Dokumentations-CI vor diesem Statusupdate:** GitHub Actions Development Tests **#40366908197 SUCCESS auf Commit `4bd9e09fe0878ea0d50ea587859dc99c424b4dc5`**: **446/446 Vitest** (Unit, Behavior, Regression, Determinismus), **26/26 Node**, **188/188 Chromium/WebKit Desktop/Mobil** = **660/660**; TypeScript, Audit, reproduzierbarer Build und Browser-Release-Gate erfolgreich. Die Statusdokumentation selbst löst erneute QA aus; endgültigen HEAD erneut verifizieren.
- **Kumulativ seit bestätigter Veröffentlichung v0.1.59: 5 abgeschlossene, getestete und NICHT veröffentlichte Tasks:** NEXT-97 (648/648), NEXT-101 (654/654), NEXT-102 (654/654), NEXT-92 (659/659), **NEXT-93 NEU (660/660)**. NEXT-100 nur Statusprüfung, kein Code; NEXT-80/84/94/95/96 sind live.
- **Refactoring:** historische Fixture-Validierung von Trend-Auswertung getrennt; vorhandene Vergleichsfunktion wiederverwendet. **Rolling Backlog:** P0 NEXT-79e echte NVDA/VoiceOver/Touch/Kontrastabnahme; P2 NEXT-98 Reload bei ausstehendem Web Lock, Revision/Quota-Fallback auf Chromium/WebKit; P2 NEXT-99 16-Roboter-/120-Kampf-Multi-Tab-Stress; P2 NEXT-103 Strategien anhand deterministischer Behavior-Seeds unterscheiden. **Branches:** Draft-PR #80 (NEXT-93), #79 (NEXT-92), #78 (NEXT-101/102), #77 (NEXT-97). **KEIN MERGE, KEIN PUBLISH, KEIN DEPLOYMENT.**

## 26.10.2026 · 18 Uhr · NEXT-92 NEU QA-GREEN / NEXT-93 CI-WARTEPUNKT · NICHT VERÖFFENTLICHT
- **Bestätigte Live-Basis:** v0.1.59 auf main; Deploymentstatus success.
- **Aktuelle Runde (2 Tasks):** **NEXT-92 NEU ABGESCHLOSSEN**: drei echte erfolgreiche GitHub-Actions-Ressourcen-JSON-Artefakte (Runs 40266761987, 40267008446, 40355252200) mit SHA-256, Größe, Commit, Run-/Artifact-ID archiviert; read-only Schema-/Pfad-/Manipulationsprüfer und fünf neue Node-Regressionen. **Finale CI #40365286149 SUCCESS auf NEXT-92-Dokumentations-HEAD `4aba84a1ddc1cb25a758c4c42f837b7095675d3d`: 445/445 Vitest, 26/26 Node, 188/188 Browser = 659/659; Typecheck, Audit, reproduzierbarer Build und Browser-Gate grün.** **NEXT-93 IN ARBEIT**: drei echte Runs und beide benachbarten Ressourcen-Deltas plus 2 neue Vitest-Regressionen; CI #40365713610 in WebKit-Installation, **nicht als abgeschlossen zählen**.
- **Kumulativ seit bestätigter Veröffentlichung v0.1.59 fertig/getestet und NICHT veröffentlicht: 4 Aufgaben:** NEXT-97 (648/648), NEXT-101 (654/654), NEXT-102 (654/654), **NEXT-92 NEU (659/659)**. NEXT-93 zusätzlich implementiert, Abschluss-CI offen. NEXT-100 Statusprüfung ohne Code; NEXT-80/84/94/95/96 in v0.1.59 veröffentlicht.
- **Refactoring:** archivierte JSON-Fixtures und rein lesende Integritätsprüfung entkoppelt; drei Ressourcenläufe nutzen vorhandene deterministische Vergleichsfunktion; keine Produktionssimulation geändert. **Rolling Backlog:** NEXT-79e reale NVDA/VoiceOver/Touch/Kontrastabnahme (manuell offen), NEXT-93 finale Chromium-/WebKit-CI, danach NEXT-98 Web-Lock-Recovery/Reload, NEXT-99 16-Roboter-/120-Kampf-Multi-Tab-Last, NEXT-103 v0.2.0-Strategie-Behavior-Tests.
- **Branch/PR:** NEXT-92 Draft-PR #79 QA-GREEN; NEXT-93 Draft-PR #80 CI OFFEN. Kein Merge, Release, Publish oder Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · 18 Uhr · NEXT-92/93 IMPLEMENTIERT, FINALE CI AUSSTEHEND · NICHT VERÖFFENTLICHT
- **Bestätigte Live-Basis:** v0.1.59 (Commit `f594d72099767fb2ca165e6dcf2b7f4294c608b0`, Deploymentstatus success).
- **Aktuelle Runde (2 Tasks):** **NEXT-92** drei authentische GitHub-CI-JSON-Artefakte sicher archiviert, Run-/Artefakt-/Commit-Provenienz, SHA-256 und Größen dokumentiert; read-only Validator mit fünf Node-Regressionen für Manipulation, Duplikate, Pfade und Schema. **NEXT-93** echte drei CI-Läufe (40266761987 → 40267008446 → 40355252200) in chronologischer Folge verglichen, beide benachbarten Deltas und First-to-Last-Diagnostik durch zwei Vitest-Regressionen abgesichert. Gleiche Szenarien mit 2/4/8/16 Robotern, 1/6/28/120 Kämpfen und 24 Ticks pro Kampf; Archivgrößen in allen drei Läufen identisch (815/2082/6646/24004 Byte). Zeit/Heap nur diagnostisch, **keine fragilen Performance-Grenzwerte**.
- **Verifikation:** Lokale NEXT-92-Node-Tests 5/5 grün. Für NEXT-92 und NEXT-93 gilt: **vollständige finale GitHub-CI auf dem endgültigen Branch-HEAD noch nicht bestätigt, daher nicht als vollständig abgeschlossen zählen.** Browsermatrix Chromium/WebKit Desktop/Mobil, Unit/Behavior/Regression/Determinismus, TypeScript, reproduzierbarer Build und Audit müssen grün sein.
- **Kumulativ seit v0.1.59 bereits fertig getestet und NICHT veröffentlicht: 3 Tasks:** NEXT-97 (648/648, CI #40319916074), NEXT-101 und NEXT-102 (654/654, CI #40355252200). NEXT-92/93 zusätzlich in QA, NEXT-100 war nur Statusprüfung. NEXT-80/84/94/95/96 sind live.
- **Refactoring:** Ressourcendaten und Offline-Provenienzvalidierung getrennt; vorhandenen `createResourceHistory`-Vergleich wiederverwendet, keine Simulationseingriffe. **Rolling Backlog:** P0 NEXT-79e echte NVDA/VoiceOver/Touch/Kontrastabnahme (manuell blockiert), P1 NEXT-92/93 finale CI, danach P2 NEXT-98 Web-Lock-Recovery/Reload, NEXT-99 16-Roboter-/120-Kampf-Multi-Tab-Last, NEXT-103 KI-Behavior-Nachweis für v0.2.0.
- **Branch/PR:** `feature/NEXT-93-three-run-resource-comparison-unpublished`, auf NEXT-92 aufgebaut. Kein Merge, kein Release, kein Publish, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · 18 Uhr · NEXT-92 IMPLEMENTIERT, FINALE CI OFFEN · NICHT VERÖFFENTLICHT
- **Live-Basis:** v0.1.59 / main (Commit `f594d72099767fb2ca165e6dcf2b7f4294c608b0`, Deploymentstatus success).
- **Aktuelle Runde (1 Task): NEXT-92** drei echte erfolgreiche GitHub-Actions-Ressourcenberichte aus Runs 40266761987, 40267008446 und 40355252200 geprüft; rohe JSON-Dateien ohne ZIP-Extraktion archiviert, SHA-256/Größe/Run-/Artifact-/Commit-Provenienz in Manifest dokumentiert. Rein lesender Validator prüft Reihenfolge, Eindeutigkeit, Pfade, JSON-Schema, Szenario und 2/4/8/16 Roboter. Fünf neue Node-Regressionen lokal grün; **gesamte PR-CI auf finalem Dokumentations-HEAD noch ausstehend, NEXT-92 daher NICHT als fertig getestet zählen**.
- **Kumulativ sicher abgeschlossen, getestet und unveröffentlicht seit v0.1.59: 3 Tasks:** NEXT-97 (648/648, CI #40319916074), NEXT-101 und NEXT-102 (654/654, CI #40355252200). NEXT-92 ist zusätzlich in Verifikation; NEXT-100 reine Statusprüfung ohne Code. NEXT-80/84/94/95/96 sind in v0.1.59 veröffentlicht.
- **Refactoring:** Archivintegrität in wiederverwendbaren, rein lesenden Validator ausgelagert; keine Simulationsänderung. **Nächste Aufgaben:** NEXT-79e reale Screenreader-/Touch-Abnahme (manuell offen), NEXT-92 CI abschließen, NEXT-93 mindestens drei reale CI-Runs vergleichen, NEXT-98 Lock/Reload-Recovery, NEXT-99 16-Roboter-Cross-Tab-Last, NEXT-103 Strategieverhalten.
- **Branch/PR:** `feature/NEXT-92-resource-archive-unpublished`, Draft-PR #79. Kein Merge nach main, keine Versionsanhebung, kein Release, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · 17 Uhr · NEXT-101 und NEXT-102 NEU QA-GREEN · NICHT VERÖFFENTLICHT
- **Veröffentlichungsbasis:** v0.1.59 auf main, Release-Commit `f594d72099767fb2ca165e6dcf2b7f4294c608b0`, GitHub-Deploymentstatus `robot-arena/deployment=success`. NEXT-80/84/94/95/96 sind darin enthalten; nicht erneut als unveröffentlicht zählen.
- **Aktuelle Runde (2 Aufgaben, beide NEU ABGESCHLOSSEN):** **NEXT-101** sieben nachweisbasierte v0.2.0-Spielreifekriterien, JSON-Manifest, ausschließlich lesender CLI-Checker und sechs Node-Regressionen; keine automatische Versionserhöhung. **NEXT-102** Browser-CI stabilisiert (ein Worker, 60 s, keine Retries) und mobile Replay-Tastatur-Race durch `locator.press('Enter')` behoben. Produktionssimulation unverändert.
- **Finale Code-/Dokumentations-CI vor diesem Status-Update:** GitHub Actions Development Tests **#40346163174 SUCCESS** auf Commit `447400c5c88e418bb972eca7371334d1a5721066`: **445/445 Vitest** (Unit/Behavior/Regression/Determinismus), **21/21 Node-Integration/Regression**, **188/188 Playwright** (Chromium Desktop/Mobil + WebKit Desktop/iPhone) = **654/654**. TypeScript, Dependency-Audit, reproduzierbarer Produktionsbuild und Browser-Release-Gate erfolgreich. Vorheriger Fehllauf #40337197883 wurde nicht als Erfolg gewertet. **Für diese nachträglichen Status-/HTML-Dokumentationsänderungen ist ein neuer HEAD-CI-Nachweis abzuwarten.**
- **Kumulativ seit bestätigter v0.1.59 vollständig implementiert und getestet, aber NICHT veröffentlicht: 3 Aufgaben:** **NEXT-97** Browserkompatibilitäts-Release-Gate (648/648, #40319916074 SUCCESS), **NEXT-101 NEU** v0.2.0-Readiness-Nachweis (654/654, #40346163174 SUCCESS), **NEXT-102 NEU** stabile Chromium-/WebKit-CI und Replay-Tastaturtest (654/654, #40346163174 SUCCESS). NEXT-100 ist eine reine Statusprüfung, kein zu veröffentlichender Code.
- **Refactoring:** Browser-Testaktion vereinheitlicht, CI-Worker/Timeouts zentral und ohne Flaky-Retries; Readiness-Auswertung vom CLI-I/O getrennt. Keine Simulationseingriffe.
- **Rolling Backlog, in Prioritätsreihenfolge:** (P0) NEXT-79e praktische NVDA-/VoiceOver-, physische Touch- und Kontrastabnahme: Geräte-/Browsermatrix, Prüfschritte, Ergebnisprotokoll und konkrete Fixes; keine automatische Freigabe ohne manuelle Evidenz. (P2) NEXT-92 historische CI-JSON-Artefakte: echte Run-IDs, Schema/Hash/Chronologie prüfen, Fixtures sicher archivieren, Manipulations-/Doppelungsregression. (P2) NEXT-93 Ressourcenvergleich aus mindestens 3 erfolgreichen CI-Läufen: identische Szenarien 2/4/8/16 Roboter, Laufzeit/Heap/Archivgröße, keine fragilen Performance-Grenzen, Regressionen. (P2) NEXT-98 Browserreload bei gehaltenem Web Lock: keinen vorzeitigen Speicherstatus, Revisionskonflikt ohne Überschreiben, Reload-/Quota-Fallback auf Chromium/WebKit. (P2) NEXT-99 16-Roboter-/120-Kämpfe-Cross-Tab-Last: deterministische Archiv-Digests vor/nach Reload und Stale-Tab-Konflikten. (P2) NEXT-103 aggressive/defensive/adaptive Strategie-Muster auf festen Seeds per Behavior- und sichtbarer Kampfabnahme vergleichen; Ergebnisse als Evidenz für v0.2.0, nicht nur Siegquoten.
- **Branch/PR:** `feature/NEXT-101-v02-readiness-gate-unpublished`, Draft-PR #78. **KEIN Merge nach main, KEIN Release-Commit, KEIN Deployment, KEINE Homepage-Aktualisierung. NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · Runde 16 Uhr · NEXT-101/102 fortgesetzt · CI-Fehler vor Features · KEIN PUBLISHING
- **Letzte bestätigte Veröffentlichung:** v0.1.59 auf main, Commit `f594d72099767fb2ca165e6dcf2b7f4294c608b0`, GitHub-Status `robot-arena/deployment=success`; NEXT-80/84/94/95/96 sind darin enthalten.
- **Kumulativ seit v0.1.59 vollständig getestet und NICHT veröffentlicht: 1 Aufgabe – NEXT-97** Browser-Release-Gate (648/648, CI #40319916074 SUCCESS). NEXT-100 war eine reine Statusprüfung ohne zu veröffentlichenden Code. **NEXT-101 und NEXT-102 noch NICHT abgeschlossen**.
- **Aktuelle Runde (2 Aufgaben):** NEXT-101 v0.2.0-Readiness-Gate (7 Kriterien, 6 Node-Regressionen) bleibt bis grüner Gesamt-CI offen. NEXT-102 Browser-CI-Stabilisierung: Abschluss-CI #40337197883 auf `976f2d4` **FAILURE**, 445/445 Vitest, 21/21 Node, 187/188 Browser; Fehler ist jetzt **mobile Chromium**, NEXT-67 Replay-Tastaturtest nach Archivimport (Dialog nicht sichtbar), nicht WebKit. CI-Gate hat korrekt blockiert.
- **Fehlerkorrektur/Refactoring:** `e2e/tournament-execution.spec.ts` nutzt für Replay-Tastaturaktion jetzt eine einzelne Playwright-`locator.press('Enter')` statt `focus()` gefolgt von globalem `page.keyboard.press()`; verhindert ein Fokusrennen mit asynchron neu aufgebautem DOM. Die Dialogerwartung erhält 10s Zeit. Bestehender Desktop-/Mobil-Regressionstest deckt denselben Ablauf ab. **Neue abschließende CI auf Dokumentations-HEAD noch ausstehend; keine Erfolgsmeldung vor grünem Lauf.**
- **Weitere Reihenfolge:** (P0) NEXT-79e echte Screenreader-/Touch-/Kontrastabnahme; (P1) NEXT-101/102 vollständige Browser-CI und Teststabilität; (P2) NEXT-92 CI-Berichte archivieren, NEXT-93 mindestens 3 historische Ressourcenläufe vergleichen, NEXT-98 sichere Wiederherstellung nach Reload/Lock-Wartezeit, NEXT-99 16 Roboter/120 Kämpfe unter Multi-Tab-Last, NEXT-103 differenzierte Strategien mit Behavior-Seeds messen. Neue Features erst nach erfolgreicher CI.
- **Branch:** `feature/NEXT-101-v02-readiness-gate-unpublished`, Draft-PR #78. Keine Versionserhöhung, kein Merge nach main, kein Release, kein Publish/Deployment, keine Homepage-Änderung. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · Runde 15 Uhr · NEXT-101 / NEXT-102 CI-Korrektur läuft · KEIN PUBLISHING
- **Bestätigte Veröffentlichungsbasis:** GitHub main v0.1.59, Release-Commit `f594d72099767fb2ca165e6dcf2b7f4294c608b0`, Commitstatus `robot-arena/deployment = success`. NEXT-80/84/94/95/96 sind veröffentlicht und nicht mehr Teil der unveröffentlichten Liste.
- **Kumulativ seit v0.1.59, fertig getestet und NICHT veröffentlicht:** **NEXT-97** Browser-Release-Gate, 648/648 (445 Vitest, 15 Node, 188 Playwright), Abschluss-CI #40319916074 SUCCESS. **Anzahl: 1**. NEXT-100 war eine read-only Statusprüfung ohne zu veröffentlichenden Code.
- **Aktuelle Runde (max. 3 Aufgaben):** **NEXT-101** Spielreife-Gate für v0.2.0 mit sieben Kriterien und sechs neuen Node-Tests implementiert, aber bis grüner Gesamt-CI **NICHT abgeschlossen**. **NEXT-102 NEU IN ARBEIT:** WebKit-CI-Stabilität. Vorherige Abschluss-CI #40328429695 auf Commit `168484230ecbaab9fa8f0c217df58ac50a04625a` ist **FAILURE**, 186/188 Browser bestanden; zwei Desktop-WebKit-Tests überschritten 30 Sekunden (einmal Page-Fixture-Setup, einmal stabiler Button-Click). Unit-/Node-Tests, TypeScript, Audit und reproduzierbarer Build bestanden. Daher keine unzutreffende Erfolgsmeldung für NEXT-101.
- **Fehlerbehebung NEXT-102:** Playwright-CI auf **einen Browser-Worker** begrenzt und **60 Sekunden Test-Timeout** für langsame WebKit-Starts, **0 Retries** beibehalten. Assertions, Browser-Matrix, deterministische Simulation und Fail-Closed-Release-Gate unverändert. Fix-Commit `98f4177ea8e2575626cd2e5085abf9e8104675bf`; **erneute komplette CI auf finalem Dokumentations-HEAD ausstehend**. Sollte CI erneut scheitern: Fehleranalyse fortsetzen, kein Abschluss.
- **Refactoring:** CI-Laststeuerung in `playwright.config.ts` zentralisiert; NEXT-101-Auswertung bleibt rein/deterministisch und vom CLI getrennt; kein Produktions- oder Simulationscode geändert.
- **Rolling Backlog:** P0 NEXT-79e physische NVDA-/VoiceOver-/Touch-/Kontrastabnahme (manuell blockiert); P1 NEXT-101 und NEXT-102 durch vollständige Chromium/WebKit-Tests und Gate verifizieren; P2 NEXT-92 Ressourcenberichte mit SHA-256, Größenlimit und Provenienz sicher archivieren; NEXT-93 drei echte CI-Trends vergleichen; NEXT-98 Web-Lock-Recovery nach Reload; NEXT-99 16-Roboter-/120-Kampf-Multi-Tab-Stress; NEXT-103 Spielreife-Behavior-Tests für aggressive, defensive und adaptive Strategie mit Bewegungs-/Entscheidungsnachweisen.
- **GitHub:** Draft-PR #78 auf `feature/NEXT-101-v02-readiness-gate-unpublished`; enthält NEXT-97 sowie unvollständige NEXT-101/NEXT-102. Kein Merge nach main, kein Release-Commit, kein Publish-/Deployment-Workflow und keine Homepage-Aktualisierung. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · NEXT-100 verifiziert / NEXT-101 implementiert, Abschluss-CI ausstehend · KEIN PUBLISHING
- **Neue bestätigte Veröffentlichungsbasis:** GitHub `main` v0.1.59, Commit `f594d72099767fb2ca165e6dcf2b7f4294c608b0`, GitHub-Commitstatus `robot-arena/deployment = success` direkt am Release-Commit geprüft. **NEXT-100 abgeschlossen (read-only):** Status-Unklarheit geklärt; NEXT-80/84/94/95/96 sind in diesem bestätigten Release enthalten und **nicht** mehr unveröffentlicht.
- **Kumulativ seit bestätigtem Release v0.1.59:** **NEXT-97** Browser-Release-Gate vollständig implementiert und getestet, CI #40319916074 SUCCESS, 648/648 (445 Vitest, 15 Node, 188 Playwright); auf Draft-PR #77, **NICHT VERÖFFENTLICHT**. **NEXT-101** v0.2.0-Spielreife-Abnahme mit sieben Kriterien, evidenzbasierter Readiness-Auswertung und fünf Node-Regressionen implementiert; **Teststatus bis zur abschließenden CI OFFEN**, daher noch **nicht** als abgeschlossen oder publish-reif zählen.
- **Aktuelle Runde (max. 3 Aufgaben):** NEXT-100 Deploymentprüfung abgeschlossen (kein Code); NEXT-101 Kriterien und deterministischer Readiness-Checker implementiert, Prüfung offen. NEXT-79e praktische NVDA-/VoiceOver-/iOS-Geräte-/Kontrastabnahme weiterhin manuell blockiert.
- **Refactoring:** Reine, wiederverwendbare `evaluateV02Readiness`-Funktion von CLI und JSON-Ein-/Ausgabe getrennt; keine Änderung an Kampfsimulation. `releaseAuthorized` bleibt selbst bei vollständig deklarierten Belegen `false`; externe Belege werden nicht automatisch als authentisch behauptet.
- **Rolling Backlog:** P0 NEXT-79e physische Screenreader-/Touch-Abnahme; P2 NEXT-92 sichere Ressourcenbericht-Archivierung mit Größenlimit, SHA-256 und Provenienz; NEXT-93 Vergleich mindestens drei authentischer CI-Berichte; NEXT-98 Reload/Recovery bei ausstehendem Web Lock; NEXT-99 16-Roboter-/120-Kampf-Multi-Tab-Stress; NEXT-101 CI-Verifikation/Abnahme finalisieren. v0.2.0 erst nach spielerischer Reife und manueller Freigabe.
- **GitHub:** Branch `feature/NEXT-101-v02-readiness-gate-unpublished` baut auf NEXT-97 auf; PR/CI wird separat geprüft. **KEIN Merge nach main, kein Release-Commit, kein publish.php, kein Deployment. NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · NEXT-97 NEU ABGESCHLOSSEN · CODE-CI GREEN · NICHT VERÖFFENTLICHT
- **Veröffentlichungsbasis:** main/`package.json` = v0.1.59, Commit `f594d72099767fb2ca165e6dcf2b7f4294c608b0`; letzter **bestätigter Live-Deploymentstatus** ist v0.1.58 (Commit `6d6da65c18ef85b59ccd58f62e2fd60c4e29a334`). **v0.1.59: Veröffentlichungsstatus ungeklärt**, da der Release-Commit keinen bestätigten Deploymentstatus aufweist.
- **Kumulativ seit letzter bestätigter Live-Veröffentlichung v0.1.58:** NEXT-80 (Multi-Tab-Sicherung, 618/618 #40284084971), NEXT-84 (WebKit Safari/iOS, 624/624 #40293191896), NEXT-94 (WebKit-Konflikte, 628/628 #40297832090), NEXT-95 (Speicherstatus, 634/634 #40304830045), NEXT-96 (Cross-Tab-Stress, 642/642 #40312143461): **5 fertig getestet und in main integriert, aber Live-Veröffentlichungsstatus ungeklärt**. **NEXT-97 NEU: 1 fertig getestet und sicher nicht veröffentlicht** (isolierter Draft-PR #77). Nicht aus kumulativer Liste streichen, bevor der Live-Publish bestätigt ist.
- **Aktuelle Runde (1 Aufgabe): NEXT-97 NEU ABGESCHLOSSEN – Browser-Kompatibilitäts-Release-Gate.** GitHub-CI verwendet Playwright JSON Reporter und wertet Chromium Desktop (87), Chromium Mobil (87), WebKit Desktop (7), WebKit Mobil (7) aus. Fail-closed bei fehlenden Projekten, null bestandenen Tests, Fehlern oder Flakiness. Ergebnis als 30-Tage-Artefakt gespeichert. Kein Deployment. Echte Hardware-/Screenreader-Abnahme weiterhin NEXT-79e.
- **Verifizierte Code-CI:** GitHub Actions Development Tests **#40319414567 SUCCESS** auf Commit `3148ff983b2e7e721d3f2248f159e2084c5b7578`: 445/445 Vitest (Unit/Behavior/Regression/Determinismus), 15/15 Node (9 bestehend + 6 neue Gate-Regressionen), 188/188 Playwright = **648/648 Tests**, TypeScript, reproduzierbarer Build, Dependency-Audit erfolgreich. Browser-Gate: PASS, 0 unexpected, 0 flaky. **Post-Dokumentations-CI auf endgültigem HEAD noch separat zu bestätigen.**
- **Refactoring:** Reine deterministische JSON-Auswertung als wiederverwendbare Funktion von CI/Browserausführung entkoppelt, Regressionen für fehlende/übersprungene/flakige Tests. Kampfsimulation unverändert.
- **Rolling Backlog:** P0 NEXT-79e echte NVDA-/VoiceOver-/iOS-Geräte-Abnahme; P1 NEXT-100 v0.1.59-Deployment verifizieren; P2 NEXT-92 sichere JSON-Ressourcenarchivierung, NEXT-93 3+-CI-Trends, NEXT-98 Reload/Recovery bei Web Lock, NEXT-99 16-Roboter-/120-Kampf-Stressmatrix, NEXT-101 v0.2.0-Spielreife-Gate mit drei unterschiedlichen KI-Strategien. v0.2.0 ist funktionaler Meilenstein, keine feste Versionszahl.
- **GitHub:** isolierter Branch `feature/NEXT-97-browser-compatibility-release-gate-unpublished`, Draft-PR #77. Kein Merge nach main, kein Release-Commit, kein publish.php, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · NEXT-96 QA-GREEN · NEU ABGESCHLOSSEN · NICHT VERÖFFENTLICHT
- **Releasebasis:** zuletzt bestätigter Publish v0.1.58 auf main; NEXT-76/82/85/86/87/88/89/90/91 dort enthalten.
- **Aktuelle Runde (1 Aufgabe): NEXT-96 NEU ABGESCHLOSSEN.** Wiederholte reale browserweite Web-Locks-Serialisierung für 3 aufeinanderfolgende Kämpfe eines deterministischen 4-Roboter-Turniers; in jedem Durchlauf darf der gesperrte Schreibvorgang keinen Snapshot vorzeitig überschreiben. Drei neue stale-tab-Konfliktdurchläufe weisen eine konkurrierende gültige Revision sicher ab, ohne den letzten Speicherstand oder die Spielbarkeit zu verlieren. Beide Szenarien laufen unter Chromium Desktop/Pixel 7 und WebKit Desktop Safari/iPhone 13, bei fehlenden Web Locks sicherer Fallback. Insgesamt 8 zusätzliche Browserprüfungen.
- **Verifizierte Code-CI:** GitHub Actions Development Tests **#40311528322 SUCCESS** auf Commit `1119a41bcdedbdf3001f84a4896a991377d30bc8`: **445/445 Vitest** (Unit/Behavior/Regression/Determinismus), **9/9 Node-Integration/Inventar**, **188/188 Playwright** (174 Chromium + 14 WebKit) = **642/642 Tests**. TypeScript, Produktionsbuild, reproduzierbarer Zweitbuild, Dependency-Audit erfolgreich. Dokumentationsstand wird separat durch nachfolgenden CI-Lauf überprüft.
- **Kumulativ seit v0.1.58: 5 vollständig implementierte, getestete und NICHT veröffentlichte Aufgaben:** NEXT-80 (618/618, CI #40284084971), NEXT-84 (624/624, CI #40293191896), NEXT-94 (628/628, CI #40297832090), NEXT-95 (634/634, CI #40304830045), **NEXT-96 NEU** (642/642, CI #40311528322).
- **Refactoring:** Wiederverwendbare Lock-Halte-/Freigabe-Helfer, deterministische 3-Runden-Snapshot-Invarianten, state-basiertes Warten ohne Sleeps; Simulation und Produktionscode unverändert.
- **Rolling Backlog:** P0 NEXT-79e echte NVDA-/VoiceOver-/iOS-Geräte-/Kontrastabnahme (manuell blockiert); P2 NEXT-92 sichere JSON-Ressourcenarchivierung mit SHA-256, Größenlimit und Provenienz, ohne ungesicherte ZIP-Extraktion; P2 NEXT-93 Ressourcenvergleich aus mindestens drei echten CI-Läufen inklusive fehlender/abgelaufener Artefakte; P2 NEXT-97 Browserkompatibilitäts-Release-Gate für Chromium/WebKit; P2 NEXT-98 Recovery/Reload unter ausstehendem Web Lock ohne Datenverlust; P2 NEXT-99 deterministische 16-Teilnehmer-/120-Kampf-Multi-Tab-Stressmatrix mit Ressourcenmetriken.
- **GitHub:** isolierter Branch `feature/NEXT-96-cross-tab-stress-unpublished`, Draft-PR #76, enthält NEXT-80/84/94/95/96. Kein Merge nach main, kein Release-Commit, kein Deployment, kein publish.php. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · NEXT-95 QA-GREEN (Quellstand) · NEU ABGESCHLOSSEN · NICHT VERÖFFENTLICHT
- **Releasebasis:** bestätigte main v0.1.58, Deploymentstatus `robot-arena/deployment = success`; NEXT-76/82/85/86/87/88/89/90/91 bereits veröffentlicht.
- **Aktuelle Runde: NEXT-95 NEU ABGESCHLOSSEN.** Getrennte, barrierearm angekündigte Live-Statusanzeige für lokale Sicherung: Web-Lock-Wartezeit, erfolgreiches Speichern, Quota-/Web-Locks-Fehler und Konflikte mit anderen Tabs. Serielle Warteschlange zählt ausstehende Vorgänge; kein vorzeitiges „gespeichert“ bei wartenden Writes; Fehler bleiben bis zum Ende der Operationen sichtbar. Allgemeines Turnierfeedback bleibt erhalten.
- **Verifizierte Code-CI:** GitHub Actions Development Tests **#40304322024 SUCCESS** auf Quellcommit `cb2f21b58ad799a652233ff58be5fe4ded205394`: **445/445 Vitest** (Unit/Behavior/Regression/Determinismus), **9/9 Node-Integration/Inventar**, **180/180 Playwright** (170 Chromium + 10 WebKit) = **634/634 Tests**. TypeScript, reproduzierbarer Produktionsbuild, Audit ohne bekannte Advisories. Browserfälle: wartender Web Lock, Erfolg nach Freigabe, fehlende Web Locks mit manuellem JSON-Export, QuotaExceededError bei weiter spielbarem Turnier. Dokumentationsstand separat in CI prüfen.
- **Kumulativ seit bestätigter v0.1.58: 4 fertig implementierte, getestete, NICHT veröffentlichte Aufgaben:** NEXT-80 (618/618, #40284084971), NEXT-84 (624/624, #40293191896), NEXT-94 (628/628, #40297832090), **NEXT-95 NEU** (634/634, #40304322024).
- **Refactoring:** Statuslogik in `tournamentSaveStatus` zentralisiert, bestehende asynchrone Warteschlange weiterverwendet; Kampfsimulation unverändert.
- **Rolling Backlog:** P0 NEXT-79e manuelle NVDA-/VoiceOver-/physische iOS-Touch-/Kontrastabnahme (blockiert ohne reale Geräte); P2 NEXT-92 sichere JSON-Artefaktarchivierung mit SHA-256/Größenlimit/Provenienz und ohne ungeprüftes ZIP-Entpacken; P2 NEXT-93 Ressourcenvergleich über >=3 echte CI-Läufe mit Lücken-/Ablaufdiagnostik; P2 NEXT-96 wiederholte Cross-Tab-Fairness-/Konflikt-Stresstests (Chromium/WebKit, definierte Seeds, Speicherinvarianten); P2 NEXT-97 WebKit-/Chromium-Kompatibilitäts-Release-Gate.
- **GitHub:** Draft-PR #75, Branch `feature/NEXT-95-autosave-status-unpublished`, enthält NEXT-80/84/94/95. Kein Merge nach main, kein Release-Commit, kein publish.php, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · NEXT-94 QA-GREEN · NEU ABGESCHLOSSEN · NICHT VERÖFFENTLICHT
- **Releasebasis:** bestätigtes main v0.1.58 (GitHub-Publish erfolgreich); NEXT-76/82/85/86/87/88/89/90/91 sind bereits veröffentlicht und nicht mehr in der offenen Liste.
- **Aktuelle Runde: NEXT-94 NEU ABGESCHLOSSEN.** Zwei neue echte Zwei-Tab-WebKit-E2E-Szenarien in Desktop-Safari und emuliertem iPhone: (1) ein originweiter Web Lock blockiert paralleles Autosave bis zur Freigabe; (2) ein zwischenzeitlich geänderter, gültiger Speicherstand wird nicht überschrieben, sondern als Konflikt behandelt. Falls Web Locks fehlen, prüfen die Tests den sicheren Fallback. Ein anfänglicher mobiler WebKit-Testfehler (asynchrone Weitergabe eines localStorage-Updates) wurde durch deterministisches Warten auf den konkurrierenden Speicherstand behoben; keine Produktionscodeänderung.
- **Verifizierte Code-CI:** GitHub Actions Development Tests **#40297360666 SUCCESS** auf Commit `03bfd6b9fa5bf7d12c3a22999f97f79e8b18571f`: 445/445 Vitest (Unit/Behavior/Regression/Determinismus), 9/9 Node-Integration/Inventar, 174/174 Playwright (164 Chromium + 10 WebKit) = **628/628**; TypeScript, reproduzierbarer Produktionsbuild, Audit ohne bekannte Advisories. Abschließende CI nach dieser Dokumentationsaktualisierung separat prüfen.
- **Kumulativ seit v0.1.58: 3 vollständig implementierte und getestete, aber NICHT veröffentlichte Aufgaben:** NEXT-80 (atomare Multi-Tab-Autosaves, CI #40284084971, 618/618), NEXT-84 (Safari-/iOS-WebKit, CI #40293191896, 624/624), **NEXT-94 NEU** (echte Zwei-Tab-WebKit-Konfliktregressionen, CI #40297360666, 628/628).
- **Refactoring:** gemeinsame Browser-Testhelfer für Lock-Halten/-Freigeben und Zwei-Tab-Testaufbau; Produktionssimulation unverändert.
- **Rolling Backlog:** NEXT-79e (P0, physische NVDA-/VoiceOver-/iOS-Touch-/Kontrastabnahme, manuell blockiert), NEXT-92 (sichere JSON-Ressourcenbericht-Archivierung mit SHA-256, Größenlimit und Provenienz), NEXT-93 (Vergleich von >=3 echten CI-Artefakten), NEXT-95 (sofort sichtbarer Speichervorgang/Fehler), NEXT-96 (wiederholte Cross-Tab-Fairness), NEXT-97 (Browserkompatibilitäts-Release-Gate).
- **GitHub:** Draft-PR #74, Branch `feature/NEXT-94-webkit-cross-tab-races-unpublished`, enthält NEXT-80 und NEXT-84. **Kein Merge, kein Release-Commit, kein publish.php, kein Deployment. NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · NEXT-84 QA-GREEN · NEU ABGESCHLOSSEN · NICHT VERÖFFENTLICHT
- **Releasebasis:** main v0.1.58 (Commit 6d6da65c18ef85b59ccd58f62e2fd60c4e29a334), GitHub-Deploymentstatus `robot-arena/deployment = success`. NEXT-76/82/85/86/87/88/89/90/91 sind in v0.1.58 integriert.
- **Aktuelle Runde (1 Aufgabe): NEXT-84 NEU ABGESCHLOSSEN – automatisierte Safari-/iOS-WebKit-Kompatibilitätsprüfung.** Zwei Playwright-WebKit-Projekte (`Desktop Safari`, emuliertes `iPhone 13`) testen jeweils drei gezielte Browserfälle: Turnierplanung/Kampf/JSON-Export-Import, Web-Locks-Autosave beziehungsweise sichere Fallback-Absage, 375-px-Touchziele und Dialogfokus. Browser und Linux-Laufzeitbibliotheken werden in isolierter PR-CI installiert. Playwright-WebKit ist kein physisches iPhone und ersetzt keine echte VoiceOver-/Touch-Abnahme.
- **Verifizierte CI:** Development Tests **#40292686660 SUCCESS** auf Quellcommit `8d63dd062f4c1e9b99a46ed0c966dd45c86c0d43`: 445/445 Vitest (Unit/Behavior/Regression/Determinismus), 9/9 Node-Integration/Inventar, 170/170 Desktop-/Mobil-Playwright (164 Chromium + 6 WebKit) = **624/624 Tests grün**; TypeScript, reproduzierbarer Build, Dependency-Audit ohne bekannte Advisories. Diese Dokumentationsänderung ist separat nachzutesten.
- **Kumulativ seit bestätigter Veröffentlichung v0.1.58: 2 vollständig implementierte, getestete und NICHT veröffentlichte NEXT-Aufgaben:** NEXT-80 (atomare Cross-Tab-Autosaves; CI #40284084971 SUCCESS, 618/618) und **NEXT-84 NEU** (Safari-/iOS-WebKit-Automation; CI #40292686660 SUCCESS, 624/624).
- **Refactoring:** Browserkompatibilität in zwei fokussierte WebKit-Projekte ausgelagert; bestehende 164 Chromium-Regressionen bleiben unverändert. Keine Produktionssimulation verändert.
- **Rolling Backlog:** P0 NEXT-79e: echte NVDA-/VoiceOver-, physische iOS-Touch- und Kontrastabnahme mit protokollierten Ergebnissen (manuelle Geräte fehlen); P2 NEXT-92: JSON-Ressourcenberichte vor 30-Tage-Retention sicher mit Provenienz, SHA-256 und Größenlimit archivieren, niemals ungeprüfte ZIPs extrahieren; P2 NEXT-93: mindestens drei echte CI-Ressourcenberichte vergleichen und fehlende/abgelaufene Artefakte eindeutig kennzeichnen; P2 NEXT-94: WebKit-Cross-Tab-Races mit echten Web Locks über zwei Seiten prüfen; P2 NEXT-95: unmittelbar sichtbare Speichern-in-Arbeit-Anzeige.
- **GitHub:** Draft-PR #73 auf `feature/NEXT-84-webkit-compatibility-unpublished`, baut auf unveröffentlichtem NEXT-80 Draft-PR #72 auf; PR gegen main nur für CI. **Kein Merge, kein Release-Commit, kein publish.php, kein Deployment. NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · NEXT-80 QA-GREEN · NEU ABGESCHLOSSEN · NICHT VERÖFFENTLICHT
- **Releasebasis:** v0.1.58 auf main, Commit `6d6da65c18ef85b59ccd58f62e2fd60c4e29a334`, GitHub-Deploymentstatus `robot-arena/deployment = success` und Publish-Workflow #40280980041 SUCCESS. NEXT-76, 82, 85, 86, 87, 88, 89, 90, 91 sind darin integriert und werden seit v0.1.58 **nicht** mehr als unveröffentlicht gezählt.
- **Aktuelle Runde (1 Aufgabe): NEXT-80 NEU ABGESCHLOSSEN.** Browserweite Web-Locks-Exklusivsperre um Revisionvergleich, Speichern, Opt-in/Opt-out und validierte Wiederherstellung; registerkarteninterne Promise-Warteschlange für Reihenfolge der Match-Grenzstände. Kein stilles Überschreiben zwischen kooperierenden Tabs; ohne Web Locks fail-closed mit Hinweis auf manuellen JSON-Export. Vorherige synchrone Guard-Tests bleiben für die isolierte Logik erhalten, die Benutzeroberfläche nutzt ausschließlich die gesperrten Methoden.
- **Verifizierte isolierte QA:** GitHub Actions Development Tests **#40283780990 SUCCESS** auf Commit `fc97c2db8d1899021923631528995e9789bc115d`: **445/445 Vitest** (Unit/Behavior/Regression/Determinismus), **4/4** Integrations-Konflikttests, **5/5** Node-Inventartests, **164/164** Desktop-/Mobil-Playwright = **618/618**; TypeScript, Produktionsbuild, zweiter reproduzierbarer Build, Dependency-Audit ohne bekannte Advisories. Erste E2E-Runde deckte asynchrone Reload-/Opt-out-Races auf; Tests warten jetzt explizit auf den persistierten Stand. Finaler Dokumentationsstand erfordert erneute CI.
- **Kumulativ seit bestätigter Veröffentlichung v0.1.58: 1 vollständig implementierte, getestete, aber NICHT veröffentlichte NEXT-Aufgabe:** **NEXT-80 NEU** (atomare Multi-Tab-Turniersicherung; 618/618 QA grün). Die zuvor neun NEXT-Aufgaben sind Bestandteil von v0.1.58 und nicht mehr unveröffentlicht.
- **Refactoring:** gemeinsamer originweiter Web-Lock-Adapter und lokale asynchrone Operationswarteschlange; Produktionssimulation unverändert. **Rolling Backlog:** P0 NEXT-79e echte NVDA/VoiceOver/Touch/Kontrastabnahme (manuell blockiert); P2 NEXT-84 Safari/iOS-WebKit und Web-Locks-Kompatibilität; NEXT-92 sichere JSON-Artefaktsicherung vor Retention; NEXT-93 Vergleich von mindestens drei CI-Artefakten. Prüfe außerdem sofortige UI-Feedbackanzeige bei ausstehenden asynchronen Sicherungen.
- **GitHub:** Draft-PR #72, Branch `feature/NEXT-80-atomic-cross-tab-autosave-unpublished`. Keine Änderung an main, keine neue Releaseversion, kein publish.php, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-91 QA-GREEN · 26.10.2026, 07:00 MEZ · NICHT VERÖFFENTLICHT
- **Diese Runde (1 NEXT): NEXT-91 NEU ABGESCHLOSSEN.** Read-only GitHub-Actions-Inventar für `robot-arena-resource-trends`: Run-/Commit-/Artefakt-ID, Branch, Größe, Erstellungs-/Ablaufdatum und Status `available`/`expired`/`expiry-unknown`; begrenzte API-Paginierung, Metadatenvalidierung, API-Fehlerdiagnose. Kein Download fremder ZIPs, keine GitHub-Schreiboperationen.
- **Automatisierung nur in CI:** GitHub-Token `actions:read`/`contents:read`; JSON-Inventar und Ressourcenberichte mit 30 Tagen Retention. Read-only-Inventarschritt ist diagnostisch (`continue-on-error`) und beeinflusst keine Spiel- oder Performance-Grenzen. **Erster vollständiger CI-Lauf #40277798706 SUCCESS auf Commit `3d36f40ace8b23e9a9e1e7423a07a7567611aae4`:** 440 Vitest, 4 Konflikttests, 5 neue Node-Inventartests, 162 Desktop-/Mobiltests = **611 Tests**, TypeScript, reproduzierbarer Build, 0 bekannte Dependency-Advisories. GitHub bestätigt Inventar-Artefakt **12631125138** und Ressourcentrend-Artefakt **12629914902** mit Ablauf am 25.11.2026. Letzte Dokumentationsänderungen benötigen erneute CI.
- **Kumulativ seit letzter bestätigter Veröffentlichung v0.1.57: 9 vollständig implementierte, getestete und unveröffentlichte NEXT-Aufgaben:** NEXT-76 (Suche/Filter), NEXT-82 (sichere Downloads), NEXT-85 (Integration), NEXT-86 (Port auf v0.1.57), NEXT-87 (120-Kampf-Stress), NEXT-88 (Langzeit), NEXT-89 (Ressourcentrends), NEXT-90 (historische Vergleiche), **NEXT-91 NEU** (read-only Inventar/Retention).
- **Refactoring:** API-Abfrage und Retention-Auswertung in eine testbare injizierbare Funktion gekapselt; Produktionssimulation unverändert.
- **Rolling Backlog:** P0 NEXT-79e manuelle NVDA/VoiceOver/Touch-/Kontrastabnahme; P1 NEXT-80 atomare Multi-Tab-CAS mit Race-/Quota-Regression; P2 NEXT-84 Safari/iOS; NEXT-92 sichere JSON-Sicherung vor Retention-Ablauf; NEXT-93 Mehrfachhistorie mit mindestens drei CI-Artefakten.
- **GitHub:** Draft-PR #71 auf `feature/NEXT-91-artifact-inventory-unpublished`. Kein Merge auf main, kein Release, kein publish.php, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-90 QA-GREEN · 26.10.2026, 06:00 MEZ · NICHT VERÖFFENTLICHT
- **Diese Runde (1 NEXT): NEXT-90 NEU ABGESCHLOSSEN.** Zwei echte GitHub-Actions-JSON-Artefakte aus erfolgreichen Läufen #40266761987 (ID 12626795952) und #40267008446 (ID 12626417753) heruntergeladen, unverändert als Fixtures gespeichert und historisch verglichen. Identische Archivbytes für 2/4/8/16 Roboter (815/2082/6646/24004 B); Laufzeit-/Heap-Unterschiede rein diagnostisch. Provenienz, Zahlen und Interpretation: RESOURCE_HISTORY.md.
- **Neue historische Vergleichslogik:** createResourceHistory validiert Lauf-/Artefakt-ID, SHA, Chronologie, Berichtsversion und identische Szenarien/Testgrößen; vergleicht benachbarte CI-Läufe. Vier neue Vitest-Tests mit realen JSON-Artefakten, fehlerhaften Metadaten, manipulierten Berichten und Drei-Läufe-Verlauf.
- **Vollständige PR-CI #40271841058 SUCCESS auf Commit `cc26536e9818e18f7680502beb314d66de407fbc`:** 440/440 Vitest (43 Dateien), 4/4 Integrations-Konfliktprüfungen, 162/162 Desktop-/Mobil-Playwright, TypeScript, Produktionsbuild, reproduzierbarer Zweitbuild, 0 bekannte Dependency-Advisories. **606/606 Tests erfolgreich.** Abschließender Dokumentationscommit erfordert erneute CI.
- **Kumulativ seit letzter bestätigter Veröffentlichung v0.1.57: 8 vollständig implementierte, getestete und unveröffentlichte NEXT-Aufgaben:** NEXT-76 (Suche/Filter), NEXT-82 (sichere Downloads), NEXT-85 (Integration), NEXT-86 (Port auf v0.1.57), NEXT-87 (120-Kampf-Stress), NEXT-88 (Langzeit-/Grenztests), NEXT-89 (Ressourcentrends), **NEXT-90 NEU** (historische Vergleiche). NEXT-85–90 sind überwiegend QA-/Integrationsaufgaben.
- **Refactoring:** NEXT-89-Validierung und Vergleichsfunktion wiederverwendet; keine duplizierte Deltalogik, Produktionssimulation unverändert.
- **Rolling Backlog:** P0 NEXT-79e praktische NVDA-/VoiceOver-/Touch-/Kontrastabnahme; P1 NEXT-80 atomare Cross-Tab-CAS mit Race-/Quota-Regressionen; P2 NEXT-84 Safari/iOS-WebKit; NEXT-91 sichere automatisierte Artefaktprovenienz/Retention und mehr als zwei historische CI-Läufe.
- **GitHub:** Draft-PR #70 auf `feature/NEXT-90-resource-history-unpublished`, kein Merge nach main, keine Versionsänderung, kein publish.php, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-89 QA-GREEN · 26.10.2026, 05:00 MEZ · NICHT VERÖFFENTLICHT
- **Diese Runde (1 NEXT): NEXT-89 NEU ABGESCHLOSSEN.** Deterministische 2/4/8/16-Roboter-Ressourcentrends mit jeweils 24 Ticks/Kampf; valide JSON-Messreihen für Laufzeit, Heap-Differenz, Matchanzahl, Ticks und Archivbytes; sichere Vergleichsfunktion für historische CI-Artefakte (absolute und prozentuale Deltas). Keine flüchtigen Laufzeit-/Heap-Fail-Grenzwerte.
- **Vollständige isolierte PR-CI #40266761987 SUCCESS** auf Commit `1f0b6076c15923dfc49a9713ed8e6c239d814f55`: 436/436 Vitest (42 Dateien), 4/4 Konfliktprüfungen, 162/162 Desktop-/Mobil-Playwright, TypeScript, Build, reproduzierbarer Zweitbuild, 0 bekannte Dependency-Advisories. **602/602 Prüfungen erfolgreich.** CI-Artefakt `robot-arena-resource-trends` ID 12626795952 enthält `next89-resource-trends.json`. Nachfolgende Dokumentationsänderungen erfordern erneute CI.
- **Kumulativ 7 vollständig implementiert, getestet und NICHT veröffentlicht seit bestätigter v0.1.57:** NEXT-76 (Suche/Filter), NEXT-82 (sichere Downloads), NEXT-85 (gemeinsame Integration), NEXT-86 (Port auf v0.1.57), NEXT-87 (120-Match-Stress), NEXT-88 (Langzeit-/Grenztests), **NEXT-89 NEU** (Ressourcentrends). NEXT-85–89 sind Integrations-/QA-Aufgaben.
- **Refactoring:** gemeinsame deterministische Endurance-Fixture aus NEXT-88 extrahiert; vorhandene Tests nach Umstellung vollständig grün. Produktionssimulation unverändert.
- **Rolling Backlog:** P0 NEXT-79e praktische NVDA/VoiceOver/Touch/Kontrastabnahme; P1 NEXT-80 atomare Multi-Tab-CAS mit Versions-Token, Quota-/Race-Regressionen; P2 NEXT-84 Safari/iOS-WebKit- und Touch-Matrix; NEXT-90 mindestens zwei JSON-CI-Artefakte vergleichen und dokumentierte Trendhistorie ohne Timing-Schwellenwerte pflegen.
- **GitHub:** Draft-PR #69, Branch `feature/NEXT-89-resource-trends-unpublished`; kein Merge nach main, kein Release-Commit, kein publish.php, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-88 QA-GREEN · 26.10.2026, 04:00 MEZ · NICHT VERÖFFENTLICHT
- **Diese Runde: NEXT-88 NEU ABGESCHLOSSEN:** 16 Roboter/120 Kämpfe/5.760 Ticks, deterministische Archiv-Wiederaufnahme, maxTicks=3.600 und diagnostische Zeit-/Heap-/Archivmessung ohne CI-Zeitgrenzwerte. Keine Produktivcodeänderung.
- **CI #40262194281 SUCCESS** auf 12ac113b86a59c8536f7585d34716d5af9858d43: 434/434 Vitest, 4/4 Konfliktprüfungen, 162/162 Browser, TypeScript, reproduzierbarer Build, 0 bekannte Dependency-Advisories. **600/600**; Docs-Follow-up benötigt erneut CI.
- **Kumulativ seit v0.1.57: 6 fertig getestet, NICHT veröffentlicht:** NEXT-76 Suche/Filter, NEXT-82 Downloads, NEXT-85 Integration, NEXT-86 Port, NEXT-87 Stresstest, **NEXT-88 NEU** Endurance. NEXT-85/86/87/88 QA/Integration, keine neuen UI-Features.
- **Rolling Backlog:** NEXT-80 atomare Cross-Tab-CAS + Race-Test; NEXT-79e praktische NVDA/VoiceOver/Touch-Kontrastabnahme; NEXT-84 Safari/iOS-Matrix; NEXT-89 Ressourcen-Trends ohne flüchtige CI-Schwellenwerte. Refactoring: gekapselte Endurance-Fixture.
- **GitHub:** Draft-PR #68; main unverändert, kein Merge/Release/Deploy. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-87 abgeschlossen · 26.10.2026, 03:00 MEZ · QA-GREEN · NICHT VERÖFFENTLICHT
- **Diese Runde (1 Aufgabe): NEXT-87 NEU ABGESCHLOSSEN.** Deterministischer Maximalgrößen-Stresstest (16 Teilnehmer, 120 Kämpfe) für identische V1-Archive, 47/120-Pause/Wiederaufnahme ohne Replays, vollständige Tabelle und Unicode-Suchfilter, 2-MiB-Grenze sowie Desktop-/Mobil-Playwright mit 120 Paarungen, Statusfiltern und Archivexport/-import. Kein Produktionscode geändert; Test-Fixture und feste Seeds zentralisiert.
- **Vollständige gemeinsame CI auf `dbe5ca073256a8e49d16afd48d881ca2be97d7ac`: #40257410247 SUCCESS:** 432/432 Vitest (40 Dateien), 4/4 Integrations-Konflikttests, 162/162 Desktop-/Mobil-Playwright; TypeScript, Produktionsbuild, reproduzierbarer Zweitbuild, Audit (0 bekannte Schwachstellen). **Insgesamt 598 erfolgreiche Tests/Prüfungen.** Dokumentations-Follow-up muss erneut CI bestehen.
- **Vorheriger NEXT-86-Dokumentationsstand ebenfalls QA-GREEN:** CI #40252418309 SUCCESS auf `43c7531060f349c940ce288892260a650abaeb32`.
- **Kumulativ seit letzter bestätigter Veröffentlichung v0.1.57: 5 vollständig implementierte und getestete, aber NICHT veröffentlichte NEXT-Aufgaben:** NEXT-76 (Turniersuche/Ergebnisfilter), NEXT-82 (sichere Browserdownloads), NEXT-85 (Integration), NEXT-86 (Port auf v0.1.57), **NEXT-87 NEU** (120-Match-Stress/Archiv/Filter). NEXT-85/86/87 sind Integrations-/QA-Aufgaben, keine zusätzlichen UI-Features.
- **Weiter offen:** NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme; NEXT-80 atomare Multi-Tab-Speicherung; NEXT-84 Safari/iOS; **NEXT-88** längere Simulationen mit höheren Ticklimits, reproduzierbare Dauerlast und Ressourcenmessung ohne flüchtige Zeitgrenzwerte.
- **Branch/PR:** `feature/NEXT-87-tournament-stress-unpublished`, Draft-PR #67 gegen main **nur für PR-CI**; kein Merge nach main, keine Releaseversion verändert, kein publish.php, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-86 abgeschlossen · 26.10.2026 · QA-GREEN · NICHT VERÖFFENTLICHT
- **Aktuelle Runde (1 NEXT): NEXT-86 NEU ABGESCHLOSSEN.** Port von NEXT-76 (zugängliche Turniersuche/Ergebnisfilter) und NEXT-82 (gehärtete Browserdownloads) auf den veröffentlichten v0.1.57-Basisstand, konfliktfrei auf eigenem Entwicklungsbranch. Keine neuen Endnutzerfeatures über 76/82 hinaus.
- **Verifizierte isolierte CI:** GitHub Actions Development Tests #40247820482, SUCCESS auf exakt `990bc0ddcb08880360b4d3b674522d9840d1a325`: 429/429 Vitest (39 Dateien), 4/4 Integration-Conflict-Guard, 160/160 Desktop-/Mobil-Playwright; TypeScript, Produktionsbuild, zweiter reproduzierbarer Build, npm-Audit 0 bekannte Advisories. CI-Job quality und alle Schritte erfolgreich.
- **Kumulativ vollständig implementiert, getestet, aber seit bestätigter Veröffentlichung v0.1.57 NICHT veröffentlicht: 4 NEXT-Aufgaben:** NEXT-76 (Turniersuche/Statusfilter; QA #40243932862 + Integration), NEXT-82 (sichere Browserdownloads; QA #40243672046 + Integration), NEXT-85 (gemeinsame Integration; QA #40244548121), **NEXT-86 (NEU: Port auf v0.1.57; QA #40247820482)**. NEXT-85/86 sind Integrations-/Qualitätssicherungsaufgaben, keine zusätzlichen Benutzerfeatures.
- **GitHub:** Draft-PR #66 auf `feature/NEXT-86-rebase-v0.1.57-unpublished` gegen main; main v0.1.57 mit GitHub-Deploymentstatus success unverändert. Kein Merge, kein Release, kein Publish-Workflow, kein Deployment, keine Homepage-Aktualisierung.
- **Refactoring:** kein zusätzliches Refactoring in dieser Runde; der bestehende gemeinsame Downloadadapter ist durch die vollständige Regression erneut abgesichert.
- **Weiter offen:** NEXT-79e praktische NVDA-/VoiceOver-/Touch-/Kontrastabnahme; NEXT-80 atomare Multi-Tab-Speichersperre; NEXT-84 Safari/iOS; NEXT-87 Stress-/Langläufertests. Fehler vor neuen Features priorisieren. Für die nächste Runde maximal drei NEXT, zunächst offene Regressionen und NEXT-87.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-86 · Rebase auf v0.1.57 · 26.10.2026 · NICHT VERÖFFENTLICHT
- **Verifizierte Releasebasis:** main v0.1.57; NEXT-69/70/71/74/75/77 bereits in main und daher nicht mehr als unveröffentlicht zählen.
- **Kumulativ seit v0.1.57 einzeln und gemeinsam getestet, aber unveröffentlicht:** NEXT-76 (zugängliche Turniersuche/Statusfilter; isolierte QA und NEXT-85 erfolgreich), NEXT-82 (sichere Browserdownloads; isolierte QA und NEXT-85 erfolgreich), NEXT-85 (Acht-Feature-Integration; 429 Unit/Behavior/Regression/Determinismus + 160 Desktop/Mobil in QA #40244548121). **Gesamt 3.**
- **Aktuelle Runde:** NEXT-86 überträgt ausschließlich NEXT-76/82 auf einen frischen main-v0.1.57-Branch; main.ts und style.css sind gegenüber dem früheren sechs-Aufgaben-Kandidaten byte-identisch, daher konnte die zuvor kombinierte Änderung ohne Überschreiben der veröffentlichten Funktionalität übernommen werden. Neue Quell- und Testdateien übernommen.
- **NEXT-86 Status:** Codeport abgeschlossen, volle QA auf neuem Branch NOCH NICHT bestätigt; erst nach grüner CI als abgeschlossen werten.
- **Rolling Backlog:** NEXT-86: volle isolierte CI inkl. deterministischer Simulationen, TypeScript, Build, Audit, Desktop/Mobil; Diff gegen main prüfen; NEXT-79e: echte NVDA/VoiceOver/Touch-Abnahme; NEXT-80: atomare Cross-Tab-CAS; NEXT-84: Safari/iOS-Matrix; NEXT-87: Export-/Suchfilter-Stresstest auf großen Turnierarchiven mit festen Seeds.
- **Kein Publishing:** kein Merge nach main, kein Release-Commit, kein publish.php, keine Homepage-Aktualisierung.

## Gemeinsamer sechs-Aufgaben-QA-Erfolg · 25.10.2026 · NICHT VERÖFFENTLICHT
- **NEXT-74/75/77 in NEXT-69/70/71 integriert und gemeinsam verifiziert.** Isolierte QA-only CI #40238144023 auf Code-HEAD `e7967c636716582fe6bfeab8652ca9b24196abac` erfolgreich: 419/419 Unit-/Behavior-/Regressions-/Determinismustests, 152/152 Desktop-/Mobiltests, TypeScript, Build, reproduzierbarer Zweitbuild, 0 bekannte Dependency-Schwachstellen.
- **Kumulativ 6 fertig entwickelte und gemeinsam getestete, unveröffentlichte NEXT-Aufgaben:** NEXT-69 Presets; NEXT-70 Kampfexport; NEXT-71 Integration; NEXT-74 Importvalidierung; NEXT-75 V1-Archivkompatibilität; NEXT-77 Autosave-/Downloadfehler. **Neu abgeschlossen: 0; 3 bestehende Aufgaben integriert.**
- **Refactoring:** Kampf-/Tabellen-/Archivdownload vereinheitlicht, Objekt-URL-Cleanup. Deterministische Engine unverändert.
- **Releasekandidat:** Draft-PR #62 gegen isolierten QA-Branch, nicht main. Dokumentations-Follow-up benötigt erneuten CI-Erfolg vor Freigabe. NEXT-79e praktische Barrierefreiheitsabnahme weiterhin offen und ausgeschlossen.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** main v0.1.56 unverändert.

## Release-Candidate-Integration · 25.10.2026, 23:00 MEZ · NICHT VERÖFFENTLICHT
- **Diese Runde (3 Integrationsaufgaben):** NEXT-74 (Import-Guard + Model-Validierung), NEXT-75 (V1-Archivkompatibilität + Golden-Tests) und NEXT-77 (Autosave-Konflikte + gemeinsame Downloads) in den isolierten NEXT-69/70/71-Integrationsbranch übernommen; `src/engine/tournament-archive.ts` aus NEXT-74 und NEXT-75 bewusst kombiniert; `src/main.ts` mit NEXT-77 hunkweise gegen main abgeglichen, Match-CSV/JSON ebenfalls auf gemeinsame Downloadfunktion umgestellt. GitHub-Schreibresultate geprüft.
- **Kumulativ seit verifiziert live v0.1.56: 6 einzeln fertig implementierte und getestete, aber unveröffentlichte Aufgaben:** NEXT-69 (Presets; 391 Unit + 134 Browser), NEXT-70 (Kampfexport; 387 + 130), NEXT-71 (gemeinsame Preset/Export-Integration; 395 + 144, 4 Konfliktprüfungen), NEXT-74 (Importgrenzen; 392 + 128), NEXT-75 (Archivkompatibilität; 393 + 126), NEXT-77 (Autosave/Exportfehler; 388 + 134). **Neu als eigenständige NEXT-Aufgaben abgeschlossen: 0**; diese Runde integriert drei bestehende Aufgaben.
- **WICHTIG: Gemeinsame sechs-Aufgaben-CI noch NICHT bestätigt.** Individuelle CI-Erfolge gelten nicht als kombinierte Releasefreigabe. Bei Fehlschlag Fehler beheben und vollständig erneut testen.
- **NEXT-79e bleibt offen:** echte NVDA-/VoiceOver-, Touch- und visuelle Kontrastabnahme ausstehend; nicht Teil dieses Kandidaten.
- **Kein Publishing:** main unverändert; kein Release-Commit, kein Deployment, keine Homepage-Aktualisierung. Veröffentlichung nur durch Nutzer.
- **Refactoring:** Match-, Tabellen- und Archivdownloads teilen denselben sicheren Blob-Download mit URL-Aufräumen; deterministische Simulationsengine unverändert.

### Rolling Backlog · Nächste überprüfbare Schritte
- [ ] **NEXT-80 · Cross-Tab-CAS:** Race zwischen zwei gleichzeitig speichernden Tabs mit festem Scheduler reproduzieren; atomare Sperrstrategie (z. B. Web Locks API mit sicherem Fallback) implementieren; kein stilles Überschreiben; Desktop-/Mobil-Regression.
- [ ] **NEXT-81 · Gesamtrelease-Gate:** Sechs-Aufgaben-Integrationsbranch mit Typecheck, Unit, Behavior, deterministischen Seeds, Desktop/Mobil, reproduzierbarem Build und Security-Audit vollständig grün; nur dann manuelle Releasefreigabe vorschlagen.
- [ ] **NEXT-82 · Match-Downloadfehler:** Fehlende Blob-/ObjectURL-APIs, click()-Ausnahme, URL-Aufräumen, schädliche Dateinamen und fehlende Matches im kombinierten NEXT-70/77-Pfad absichern.
- [ ] **NEXT-83 · Accessibility-Matrix:** Manuelle NVDA-/VoiceOver-, Tastatur-, Touch- und Kontrastabnahme mit Gerät/Version, erwarteten Ansagen und dokumentierten Befunden durchführen; NEXT-79e erst dann schließen.

## NEXT-71 · Kombinierter QA-Kandidat · 25.10.2026, 19:00 MEZ · KEIN PUBLISHING
- **Neu in dieser Runde:** Auf isoliertem Branch `qa/NEXT-71-combined-integration` die Implementierungen NEXT-69 (versionierte Roboterpresets) und NEXT-70 (Kampfexport CSV/JSON) gemeinsam zusammengeführt; sechs getrennte `src/main.ts`-Diff-Hunks gegen main verifiziert, Quellcode zusammengeführt und per GitHub-Readback kontrolliert.
- **Neue kombinierte Behavior-/Desktop-/Mobil-Regression:** `e2e/next-71-combined-integration.spec.ts` prüft Sandbox-Preset → Turnierkampf → CSV-/JSON-Export derselben Teilnehmer und 375px-Touchlayout. Zusätzlich NEXT-69/70-Tests und NEXT-71-Konfliktguard eingebunden.
- **Qualitätsstatus:** Gemeinsame QA wird erst nach Abschluss aller Branch-Dateien ausgeführt; bis dahin KEIN erfolgreicher Integrationstest behauptet. NEXT-71 bleibt offen bis vollständiger grüner CI.
- **NEXT-79e:** Echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme fehlt weiterhin; automatisierte Tests sind kein Ersatz. **NEXT-74:** geplant, noch nicht begonnen.
- **Kumulativ seit verifiziert live v0.1.56: 2 vollständig implementierte, isoliert getestete, UNVERÖFFENTLICHTE Aufgaben:** NEXT-69 (391 Unit + 134 E2E), NEXT-70 (387 Unit + 130 E2E). NEXT-71 und NEXT-79e offen. Keine Aufgabe neu vollständig abgeschlossen.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** main, Homepage und Publish-Workflow unverändert.

## NEXT-71 · Integrationsvorbereitung · 25.10.2026, 18:00 MEZ · KEIN PUBLISHING
- **Aktuelle Runde:** NEXT-71 begonnen: `scripts/check-integration-conflicts.mjs` und 4 Node-Regressionstests (lokal **4/4 grün**) sowie `INTEGRATION_READINESS.md` erstellt. Automatische kombinierte CI auf einem gemeinsamen NEXT-69+70-Stand **noch nicht durchgeführt**; NEXT-71 **nicht abgeschlossen**.
- **Quellstandsprüfung:** main v0.1.56 `3d516317`; NEXT-69 PR #53 und NEXT-70 PR #57 sind isoliert auf demselben main-Commit, Quelltextänderungen in `src/main.ts` betreffen nach statischem Diff unterschiedliche Bereiche. Dokumentations-/HTML-Quellseiten überschneiden sich und müssen später zusammengeführt werden.
- **QA nachgeprüft:** NEXT-69 #40210126969 (391 Unit + 134 E2E) SUCCESS; NEXT-70 #40210582101 (387 Unit + 130 E2E) SUCCESS; NEXT-79e #40204710908 (383 Unit + 130 E2E) SUCCESS, aber echte Screenreader-/Touch-/Kontrast-Abnahme fehlt.
- **Kumulativ vollständig implementiert, isoliert getestet und NICHT VERÖFFENTLICHT seit v0.1.56: 2 Aufgaben:** NEXT-69 (versionierte Sandbox-Presets im Turnier), NEXT-70 (Einzelkampf-CSV/JSON). **Neu abgeschlossen in dieser Runde: 0.** NEXT-71 und NEXT-79e sind offen.
- **Nächste Schritte:** Gemeinsame isolierte QA ohne Publishing für NEXT-69+70; Dokumentationsabgleich; End-to-End-Kombinationstest; NEXT-79e manuelle Abnahme; anschließend weitere NEXT-72–77 gemäß Akzeptanzkriterien.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein publish.php, keine Homepage-Änderung.

## Priorisierte Fortsetzung · 25.10.2026, 14:00 MEZ · unveröffentlicht
- [ ] **NEXT-79e (P0):** Neue Playwright-Tastatur-/Screenreader-Namensmatrix auf Entwicklungs-HEAD vollständig in GitHub CI bestätigen (Desktop + Mobil; neuer Test 2 Ausführungen), Fehler zuerst beheben. Anschließend echte NVDA-/VoiceOver-Prüfung: Dialogtitel, Feldnamen, Live-Status, Fehlerhinweise, Fokusfalle/Fokusrückgabe. Visuelle Touch-/Kontrastprüfung 375/768/1280px; vollständige CI nach jedem Fix. **Noch nicht abgeschlossen.**
- [ ] **NEXT-71 (Release-Readiness, keine Veröffentlichung):** Die vom Nutzer nur für NEXT-63 und NEXT-64 erteilte Freigabe respektieren: Abhängigkeiten zur bereits veröffentlichten v0.1.55 prüfen, Änderungen isolieren, Test- und Release-SHA dokumentieren. Der aktuelle Sammelbranch enthält viele weitere unveröffentlichte Features und liegt 4 Commits hinter main. **Kein Merge, kein Deployment.**
- [ ] **NEXT-69:** Validierte, versionierte Roboterpresets aus Sandbox-Konfiguration in Turnier übernehmen; Grenzwerte, stabile IDs, Importvalidierung, deterministische Engine- und Desktop/Mobil-Tests.
- [ ] **NEXT-70:** Match-CSV/JSON mit Unicode-, Formel-Injection-, Schema- und Download-Regressionen.
- [ ] **NEXT-72–77:** Weiter gemäß vorhandenen Akzeptanzkriterien; keine Einträge verlieren.
- **Neue Entwicklungsänderung:** NEXT-79e Tastatur-Playwright-Test + gemeinsamer Overflow-Helper, Commits `ca7f9801`/`89fd44fd`; **aktuelle CI ausstehend**, letzte bestätigte #40191756134 (383 Unit/Behavior/Regression, 132 E2E).
- **Kumulativ fertig getestet und unveröffentlicht seit v0.1.55:** 6 ganze NEXT (63,64,66,67,68,78) + 4 Teilaufgaben (79a–d) = 10 Einträge; NEXT-79e weiter offen. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

# VERBINDLICHE ENTWICKLUNGSREGEL – HÖCHSTE PRIORITÄT (25.10.2026)

**JEDE NEXT-AUFGABE MUSS AUF EINEM EIGENEN GIT-BRANCH ENTWICKELT WERDEN.** Dies gilt ab sofort ausnahmslos für neue Aufgaben. Kein gemeinsamer Sammel-Entwicklungsbranch für mehrere NEXT-Aufgaben.

1. Vor Beginn jeder NEXT-Aufgabe vom aktuellen stabilen `main` einen eigenen Branch `feature/NEXT-<Nummer>-<kurztitel>` erstellen. Unteraufgaben mit unabhängigem Veröffentlichungsbedarf erhalten ebenfalls eigene Branches (z. B. `feature/NEXT-79a-...`).
2. Auf diesem Branch ausschließlich Code, Tests und Dokumentation dieser einen Aufgabe ändern. Fremde, unfertige Aufgaben dürfen nicht als Abhängigkeit hineingeraten; erforderliche gemeinsame Änderungen zuerst als separat geprüfte Basis integrieren.
3. Für jede Aufgabe einen eigenen Pull Request, eigene CI-/Behavior-/E2E-Tests und eine eigene Freigabe führen. Erst nach erfolgreicher Prüfung und ausdrücklicher Nutzerfreigabe nach `main` integrieren und veröffentlichen.
4. **Teilfreigaben müssen isoliert veröffentlichbar sein.** Niemals mehrere NEXT-Aufgaben durch einen Sammel-Merge oder eine Sammelveröffentlichung unbeabsichtigt ausliefern.
## Entwicklungsrunde 25.10.2026, 12:00 MEZ – NEXT-79c, NEXT-79d, NEXT-68 – KEIN PUBLISHING
- **Erstmals echte aktuelle CI gefunden:** GitHub Actions Push-Run #40183321392 (Head e1ca20c0) war ROT: 383 Unit/Behavior/Regression sowie Typecheck, Audit=0, Build und reproduzierbarer Zweitbuild GRÜN; Playwright **116 bestanden, 10 fehlgeschlagen** (je 5 Desktop/Mobil). Vorherige Commit-Run-Abfragen zeigten irreführend nur PR-Runs. Ab sofort GitHub REST Actions-Runs per Branch prüfen.
- **NEXT-79c Fehlerkorrektur/Regression:** Legacy-E2E erstellt nicht mehr stillschweigend einen neuen Spielplan über einen aktiven; vor der Neuplanung wird explizit abgebrochen. Responsive-Dialogtest erwartet nach Wiederöffnen eines abgeschlossenen Turniers richtigerweise weiterhin verfügbaren Export statt „deaktiviert“. Produktive Guard-Logik unverändert.
- **NEXT-79d P1-Fix:** Doppelte native/synthetische Teilnehmerzahl-Änderungsereignisse bauen bei unveränderter gültiger Anzahl die Teilnehmerfelder nicht erneut auf (Namensverlust). Legacy-E2E erwartet neue, konkrete Validierungstexte für fehlende Namen und Startwert.
- **NEXT-68 Regression:** Wiederhergestelltes abgebrochenes Turnier deaktiviert „Nächster Kampf“ absichtlich. Der E2E-Test prüft „disabled“ statt einen Klick auf einen deaktivierten Button (30-s-Timeout).
- **Verifikation:** 4 Code-/Testdateien auf dem Entwicklungsbranch committed und anhand GitHub-Blob-SHA zurückgelesen. Neue Push-CI-Runs #40187122831, #40187134234, #40187142977, #40187149330 gestartet, zuletzt noch nicht vollständig abgeschlossen. **Keine neue NEXT-Abnahme bis aktueller vollständiger grüner CI.**
- **Rolling Backlog P0:** (1) CI-Run des letzten Entwicklungs-Head auf Typecheck/Unit/Behavior/Determinismus/Audit/reproduzierbaren Build/Desktop/Mobil vollständig auswerten; (2) übrige E2E-Fehler reproduzieren und beheben; (3) NEXT-79c/d und NEXT-68 Regression erst bei Grün freigeben; (4) NEXT-79e Screenreader/Fokus/Touch/375-768-1280px/Import-Export/Autosave/Cancel/Resume als finale UX-Matrix; (5) vor späterer manueller Veröffentlichung Divergenz zu main beheben, erneut CI prüfen.
- **Kumulativ seit letzter bestätigter Live-v0.1.55: 6 vollständig CI-getestete, NICHT veröffentlichte ganze NEXT-Aufgaben:** NEXT-63 (Touch/Tastatur/Barrierefreiheit), NEXT-64 (Audit/reproduzierbare Builds), NEXT-66 (Kampfdetails), NEXT-67 (deterministische Replays), NEXT-68 (Autosave/Restore), NEXT-78 (Raptor/HUD-Arenagrenzen). NEXT-79a/b getestet als Teilaufgaben, NEXT-79c/d noch nicht aktuell vollständig abgenommen, NEXT-79e offen. **In dieser Runde keine neu abgenommene Aufgabe.**
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Keine Homepage, kein publish.php, kein Merge nach main, kein Release.

## Entwicklungsrunde 25.10.2026, 11:00 MEZ · NEXT-79c/d P1-Härtung · KEIN PUBLISHING
- **Aktuelle Runde (2 von maximal 3 NEXT-Aufgaben):** GitHub-Branches, offene PRs, RUN_STATE.md, PROJECT_STATE.md, BACKLOG.md, Commits und CI erneut geprüft. Draft-PR #48; vor dieser Dokumentationsrunde Entwicklungsbranch 176 Commits vor, 4 hinter main. Hauptzweig mit automatischem Publish bei erfolgreicher CI wird NICHT verändert.
- **NEXT-79c Bugfix:** Browser-Dialog löst bei Escape das `cancel`-Event vor dem asynchronen `close`-Event aus. Der Auto-Timer wird nun schon im `cancel`-Handler pausiert, sodass kein 0-ms-Timer zwischen Escape und Schließen einen weiteren Kampf startet. Der bestehende idempotente Close-Handler bleibt als Fallback. Neuer Playwright-Fall: Auto-Start und Cancel im selben Browser-Task → paused 0/3 → schließen/wiederöffnen → kein Fortschritt → ausdrückliches Fortsetzen → 3/3.
- **NEXT-79d Bugfix:** Korrigierte ungültige Eingaben entfernen bereits `aria-invalid`, ließen aber die alte Fehlermeldung stehen. Jetzt wird diese nur bei tatsächlich vorher ungültigen Feldern durch den neutralen Hinweis „Eingabe geändert. Bitte Spielplan erstellen …“ ersetzt. Vorhandene Feldhilfe in `aria-describedby` bleibt erhalten; neue Assertions in vorhandener Playwright-Regression.
- **Refactoring:** Dialog-Schließen bleibt in einem gemeinsamen Suspend-Helper, Escape ruft denselben Helper frühzeitig auf. Fehlermeldungsbereinigung ist auf vorher als ungültig markierte Felder begrenzt. Deterministische Engine, Seeds und Archivformate unverändert.
- **Prüfung:** 13/13 gezielte statische Code-/Test-/CI-Konsistenzprüfungen nach Korrektur eines zu breiten Suchmusters erfolgreich; alle vier neuen Code-/Test-Commits per GitHub-Blob-SHA zurückgelesen. **0 neue Unit-/Behavior-/Regression-/Browser-Tests tatsächlich ausgeführt**: privater GitHub-Clone wegen DNS nicht erreichbar, Commit-Workflow-Run-Abfrage für neuen Head leer (Connector zeigt nur PR-getriggerte Läufe), Combined-Status leer. Letzte nachgewiesene vollständige CI #40153366228: 383 Unit-/Behavior-/Regressionstests und 102 Desktop-/Mobil-E2E; betrifft früheren Commit. NEXT-79c/d bleiben OFFEN.
- **Rolling Backlog P0:** (1) Vollständige aktuelle CI inklusive Audit=0, Typecheck, Unit/Behavior/Regression/Determinismus, zweifachem reproduzierbarem Build und Desktop/Mobil Playwright nachweisen; (2) bei Fehlern reproduzieren, fixen und gesamte Suite erneut ausführen; (3) NEXT-79c/d erst bei grünem Gate schließen; (4) NEXT-79e mit Screenreader-/Fokus-/Escape-/Keyboard-/Touch-/375-768-1280px-/Import-/Export-/Autosave-/Cancel-/Resume-Matrix und Refactoring; (5) 4 Commits Divergenz zu main vor späterer manueller Veröffentlichung sicher auflösen, Release-SHA erneut vollständig testen. Keine anderen Automationen verändert.
- **Kumulativ vollständig getestet, aber NICHT veröffentlicht seit bestätigter Live-v0.1.55: genau 6 ganze NEXT-Aufgaben:** NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (Audit/reproduzierbare Builds), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministische Replays), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD innerhalb der Arena). NEXT-79a/b getestete Teilaufgaben, nicht als vollständige NEXT-79 zählen; NEXT-79c/d weiter offen, NEXT-79e offen. Keine neue ganze NEXT-Aufgabe in dieser Runde abgeschlossen.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, Release, publish.php, Deployment oder Homepage-Update.

## Entwicklungsrunde 25.10.2026, 10:00 MEZ · NEXT-79c/d P1-Fehlerbehebung · KEIN PUBLISHING
- **Aktuelle Runde (2/3 Aufgaben):** NEXT-79c und NEXT-79d; priorisiert vor NEXT-79e. Vorher GitHub-Branch, Draft-PR #48, RUN_STATE.md, PROJECT_STATE.md, BACKLOG.md, Changelog, Commits und CI geprüft. Branch nach Quellcode/Test-Commits 164 Commits vor, 4 hinter main.
- **NEXT-79c Bugfix:** Schließen des Turnierdialogs während angeforderter automatischer Ausführung pausiert den Runner jetzt ausdrücklich an der Matchgrenze, statt nur den Timer zu löschen und einen unsichtbar auf „running“ stehenden Lauf zurückzulassen. Sowohl Schließen-Knopf als auch Escape/native Dialog-Schließung nutzen denselben idempotenten Suspend-Helper. Automatik-Fortsetzungsabsicht bleibt erhalten, nach Wiederöffnen nur explizites „Fortsetzen“. Neuer Desktop-/Mobil-Playwright-Test: 3 Teilnehmer, Auto + Dialog schließen im selben Browser-Task, Wiederöffnen zeigt paused/0 von 3, Startaktionen gesperrt, Fortsetzen führt 3/3 zu Ende.
- **NEXT-79d Bugfix:** Ungültige Teilnehmerzahl (z. B. 99) löscht keine zuvor eingetragenen Teilnehmernamen mehr: Eingabe vor DOM-Ersetzung validieren. Fehler über gemeinsamen Fokus-/ARIA-Reporter mit `aria-invalid` und `aria-describedby`. Neuer Desktop-/Mobil-Playwright-Test: 3 benannte Teilnehmer, ungültige Zahl, Namen bleiben, Fokus/Fehlermeldung korrekt, nach Korrektur kann Spielplan erzeugt werden.
- **Refactoring:** Schließlogik in `suspendTournamentOnDialogClose()` zentralisiert, doppelte Timer-Clear-Aufrufe vereinheitlicht; Teilnehmerformular erst nach erfolgreicher Zahlvalidierung neu aufbauen. Keine Änderung an Simulation, RNG oder Turnierarchiven.
- **Prüfung:** 10/10 statische Quellcode-/Test-Konsistenzchecks bestanden; beide Commits und Blob-SHAs per GitHub-Readback geprüft. **0 aktuelle Unit-/Behavior-/Regression-/E2E-Tests ausgeführt**: privater GitHub-Clone durch DNS nicht erreichbar, CI-Run-Abfrage für aktuellen Commit leer, Combined-Status leer. Letzte belegte Voll-CI #40153366228 (383 Unit/Behavior/Regression, 102 E2E) betrifft früheren Stand. **NEXT-79c/d ausdrücklich NICHT abgeschlossen/CI-freigegeben.**
- **Rolling Backlog P0:** (1) Aktuelle CI für NEXT-79c/d mit npm ci, Audit 0, Typecheck, 383+ Unit-/Behavior-/Regression-/Determinismus-Tests, doppeltem reproduzierbarem Build und Desktop/Mobil-Playwright nachweisen; (2) bei Rot fehlerhafte Teststelle beheben und komplette Suite wiederholen; (3) bei Grün NEXT-79c/d abschließen; (4) NEXT-79e mit Screenreader/Fokus/375-768-1280px/Import-Export/Autosave/Cancel/Resume/Auto-Play-Matrix, Refactoring und erneuter Voll-CI; (5) erst danach Release-Branch mit main-Divergenz abgleichen, vollständige CI auf Release-SHA. KEIN PUBLISHING.
- **Kumulativ seit bestätigt live v0.1.55 genau 6 vollständig getestete, unveröffentlichte ganze NEXT-Aufgaben:** NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (Audit/reproduzierbare Builds), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministische Replays), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD innerhalb Arena). NEXT-79a/b sind getestete Teilaufgaben, zählen nicht als volle NEXT-79; NEXT-79c/d CI-offen, NEXT-79e offen. Keine neue vollständig abgenommene Aufgabe in dieser Runde.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, Release, publish.php, Deployment oder Homepage-Update. Andere Automationen unverändert.

## Rolling Backlog · 25.10.2026, ca. 09:00 MEZ · NEXT-79c/d P1-Fehler korrigiert, CI offen
- [x] NEXT-79c: Defekte/fehlende lokale Sicherung darf laufende oder pausierte Automatik nicht beenden; erst validierter Restore stoppt alten Runner. Code + Browser-Regression geschrieben, noch nicht ausgeführt.
- [x] NEXT-79c: Ungültiger JSON-Dateiimport darf Auto-Play-Absicht nicht löschen; erst erfolgreich validiertes Archiv ersetzt den Runner. Code + Browser-Regression geschrieben, noch nicht ausgeführt.
- [x] NEXT-79c: Beim Wiederherstellen die echten Raptor-/Titan-Presets aus validierten Teilnehmerdaten statt alten Formularwerten anzeigen; Browser-Regression geschrieben, noch nicht ausgeführt.
- [x] NEXT-79d: Ungültigen Seed, Ticklimit, Teilnehmerzahl und leere/doppelte Namen mit konkreter Fehlermeldung, Fokus, `aria-invalid` und `aria-describedby` anzeigen; Eingabekorrektur entfernt stale Error-Attribute. Code + Browser-Regression geschrieben, noch nicht ausgeführt.
- [ ] **P0 CURRENT CI:** Aktuellen PR-Head durch vollständige Development Tests laufen lassen: `npm ci`, Audit mit 0 Advisories, Typecheck, Unit/Behavior/Regression/Determinismus, Build 2× identisch, Playwright Desktop/Mobil. Letzte belegte CI #40153366228 liegt vor neuen Änderungen. CI-Runs für neuen Commit nicht sichtbar; lokaler Clone durch DNS blockiert.
- [ ] **P0 FIX ON RED:** Bei jedem fehlgeschlagenen Test Ursache isolieren, Produktionscode und Regression korrigieren, erneut komplette CI prüfen. NEXT-79c/d erst nach aktuellem grünem CI-Gate schließen.
- [ ] **NEXT-79e UX-Finalisierung:** Screenreader-Status und `aria-describedby` für alle Fehler prüfen; Keyboard/Fokus beim Dialog, Abbrechen, Import/Restore und Replay; 375/768/1280px, Touchziele, kein horizontaler Scroll; Pause/Resume/Cancel und Auto-Play mit invaliden Formularentwürfen; Export/Import/Autosave/Restore auf Mobil/Desktop. Danach Refactoring + Voll-CI.
- [ ] **Release-Reife:** Divergenz zu `main` (4 Commits behind) auflösen; separate Freigabe der Nutzerpakete 63/64/66/67/68/78 ohne ungeprüfte Änderungen; Release-Gate auf exakt ausgewähltem Stand erneut grün. KEIN Publish durch Automation.
- **Kumulativ vollständig getestet und noch nicht veröffentlicht: 6 NEXT-Aufgaben – 63, 64, 66, 67, 68, 78.** NEXT-79a/b getestete Teilaufgaben; 79c/d ohne neue Voll-CI, 79e offen. Letzte bestätigte Live-Version v0.1.55. Draft-PR #48. NICHT VERÖFFENTLICHT.

## 25.10.2026 · NEXT-79c/d Publish-Reife-Prüfung – noch nicht freigegeben
- **NEXT-79c Bugfix:** Bei ungültigem Formularentwurf wird jetzt unmittelbar der konkrete Validierungsfehler angezeigt, ohne `renderTournamentPreview()` aufzurufen; bestehende Spielpläne, Kampfstände und Auto-Play bleiben unberührt. Neuer Playwright-Regressionstest prüft aktiven Spielplan, ungültigen Seed, unveränderten Fortschritt und danach erfolgreichen Einzelkampf. Code und Test im Branch committed und per Blob-SHA zurückgelesen.
- **NEXT-79d:** Präzise Validierung für Seed, Ticklimit, leere und doppelte Teilnehmernamen sowie E2E für ungültige Eingaben vor Spielplanerstellung vorhanden. Refactoring: Fehlerprüfung vor dem mutierenden Preview-Pfad; kein zweiter Runner-Zustand.
- **P0 Blocker:** Vollständige Tests für aktuellen Commit noch NICHT ausgeführt oder durch CI bestätigt. Lokaler GitHub-Clone scheitert an DNS; Commit-Workflow-Abfrage liefert keine Läufe. Keine Publish-Reife behaupten. Nächster Schritt: aktuelle CI (Unit/Behavior/Regression, deterministische Simulation, Desktop/Mobil, Typecheck, Audit, Build) ausführen/nachweisen, dann ggf. korrigieren und wiederholen.
- **Kumulativ unveröffentlicht, zuvor vollständig getestet:** NEXT-63, 64, 66, 67, 68, 78 (6 ganze NEXT-Aufgaben); NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d noch nicht vollständig abgenommen; NEXT-79e offen. Letzter bestätigter Live-Stand v0.1.55. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Publish-Reife Arbeitsstand · 25.10.2026 · KEIN PUBLISHING
- **Auftrag:** Angefangene Pakete bis zur Veröffentlichungsreife bringen; Freigabeumfang NEXT-63/64/66/67/68/78, NEXT-79a/b bereits getestet; NEXT-79c/d/e erst nach vollständiger CI-Abnahme. Keine Veröffentlichung in diesem Arbeitsschritt.
- **NEXT-79d heute weiterbearbeitet:** Präzise Fehlertexte für ungültigen Seed (0..MAX_SAFE_INTEGER), Ticklimit (1..3600), fehlende und doppelte Teilnehmernamen vor Planerstellung ergänzt. Neuer Playwright-Test prüft ungültige Eingaben und anschließend erfolgreiche Erstellung. Produktionscode/Test im Entwicklungsbranch committed und per GitHub-Readback verifiziert. **Noch nicht ausgeführt; keine CI-Freigabe.**
- **Release-Gate:** Aktuellen Branch vollständig testen (Typecheck, 383+ Unit/Behavior/Regression, deterministische Engine, Desktop/Mobil Playwright, Audit, reproduzierbarer Build), danach NEXT-79c/d und NEXT-79e abschließen. Vor Release zusätzlich Divergenz zu main (zuletzt 4 Commits hinter main) auflösen und danach komplette Regression wiederholen. Keine ungeprüften Änderungen veröffentlichen.
- **Kumulativ weiterhin 6 vollständig getestete, unveröffentlichte ganze NEXT-Aufgaben:** 63, 64, 66, 67, 68, 78; NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d in Abnahme; NEXT-79e offen. Letzte bestätigte Live-Version v0.1.55.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsstand · 25.10.2026, ca. 08:00 MEZ · NEXT-79c Auto-Play-Guard nachgebessert · KEIN PUBLISHING
- [x] **NEXT-79c P1 Bugfix implementiert:** Versuch einer Neuanlage bei aktivem Turnier und bloße Änderung der Teilnehmerzahl dürfen eine angehaltene/automatische Turnierausführung nicht heimlich stoppen. Timer/Auto-Absicht nur nach erfolgreicher echter Neuanlage beenden; bestehender Runner-Status bleibt maßgeblich.
- [x] **Regression als Code ergänzt:** 3 Teilnehmer, Ticklimit 1, Auto → Pause → ungültige und gültige geänderte Seeds → Teilnehmer-Update → explizit Fortsetzen → automatischer Abschluss aller 3 Kämpfe; Desktop-/Mobil-Projekte. GitHub-Code und -Test nach Schreiben zurückgelesen, **noch nicht ausgeführt**.
- [ ] **P0 NEXT-79c/d CI-Gate:** aktuellen Head auf Development Tests prüfen (Unit/Behavior/Regression, deterministische Simulation, 375/768/1280px Desktop/Mobil, Typecheck, Build, Audit, reproduzierbarer Build); bei Rot Fix + vollständige Wiederholung. Erst bei nachgewiesenem Grün NEXT-79c/d schließen. Aktuelle Commit-Run-/Statusabfrage ohne verwertbare Daten; lokaler Clone wegen DNS blockiert.
- [ ] **NEXT-79d Verständlichkeit:** Validierungsfehler für Namen, Seed, Ticklimit, Teilnehmer und Formate mit konkreter Handlungsanweisung; Fokus/ARIA/Touchziel/Kontrast-Abnahme nach erfolgreicher CI.
- [ ] **NEXT-79e Abschluss:** Screenreader, Keyboard, Pause/Resume/Cancel, Auto-Play nach Formänderung, Import/Export/Autosave, 375/768/1280px und horizontaler Scroll; Refactoring-Review, komplette CI erneut.
- Letzte bestätigte Live-Version v0.1.55; kumulativ 6 vollständig CI-getestete, NICHT veröffentlichte NEXT-Aufgaben: NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (reproduzierbare Builds/Audit), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministisches Replay), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD-Arenagrenzen). NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d nicht aktuell vollständig CI-abgenommen; NEXT-79e offen. Draft-PR #48; keine Veröffentlichung.

## Entwicklungsstand · 25.10.2026, 07:00 MEZ · NEXT-79c Schutz aktiver Turniere ergänzt, CI offen · KEIN PUBLISHING
- [x] **NEXT-79c Implementierung gehärtet:** Geänderte gültige Konfiguration darf aktiven Turnierlauf nicht überschreiben; expliziter Abbruch vor Neustart nötig. Unveränderte Eingaben bleiben ebenfalls gesperrt. Vorhandener Runner-Status als einzige Quelle, keine Engine-/RNG-Änderung.
- [x] **NEXT-79c Regression hinzugefügt:** ungültiger Startwert lässt laufenden Plan bestehen; geänderter gültiger Startwert überschreibt ihn nicht; Cancel → neue Planung → Kampf funktioniert. GitHub-Code und -Test nach Commit zurückgelesen.
- [ ] **P0 Test-Gate für NEXT-79c/d:** aktuellen Head in vollständiger Development-CI (Unit/Behavior/Regression, deterministische Simulation, Desktop/Mobil, Typecheck, Build, Audit, reproduzierbarer Build) erfolgreich nachweisen, Fehler ggf. korrigieren; erst dann als abgeschlossen markieren. Letzte bestätigte CI vor 79c/d: #40153366228 (383 Unit/Behavior/Regression, 102 E2E). Aktuelle Run-Abfrage nicht aussagekräftig; lokaler Clone durch DNS blockiert.
- [ ] **NEXT-79d nach CI:** verständliche Validierungsfehler und konkrete Handlungsanweisungen für ungültige Formate/Teilnehmer/Startwerte, Kontrast/Fokus/Touchziele und ARIA-Abnahme.
- [ ] **NEXT-79e danach:** 375/768/1280px, Screenreader-Labels, Tastatur/Fokus, kein horizontaler Scroll, Import/Export/Autosave und Pause/Resume/Cancel als Desktop-/Mobil-Regression; nach Refactoring komplette CI erneut ausführen.
- **Kumulativ seit Live-v0.1.55 unveröffentlicht und bereits vollständig getestet: genau 6 ganze NEXT-Aufgaben (63, 64, 66, 67, 68, 78).** NEXT-79a/b getestet; 79c/d offen, 79e geplant. NEXT-69–77 unverändert im Rolling Backlog. Draft-PR #48; kein Merge/Publish.

## Entwicklungsstand · 25.10.2026, 06:00 MEZ · NEXT-79c/d weiter in Abnahme, KEIN PUBLISHING
- [x] NEXT-79c: Pausenbedienung korrigiert: „Nächster Kampf“ **und** „Alle Kämpfe spielen“ bei pausiertem Turnier deaktiviert, ausschließlich explizites „Fortsetzen“ erlaubt. Desktop-/Mobil-Regression für Pausieren, Aktionsgates und Fortsetzen ergänzt und committed.
- [ ] **NEXT-79c/d Abnahme:** vollständige aktuelle CI für Unit/Behavior/Regression, Desktop/Mobil, Typecheck, Build, Audit und reproduzierbare Builds nachweisen; neue Regression erst dann als bestanden markieren. Für den aktuellen Head keine verwertbaren GitHub-Run-Statusdaten; lokale Tests wegen fehlendem GitHub-Netzwerkzugang nicht möglich.
- [ ] NEXT-79e: abschließende Screenreader-/Fokus-/Responsive-/Fehlertextmatrix und Refactoring nach bestätigter 79c/d-Abnahme. Danach NEXT-69–77 unverändert fortsetzen.
- **Kumulativ seit Live-v0.1.55: 6 vollständig getestete, NICHT veröffentlichte NEXT-Aufgaben 63, 64, 66, 67, 68, 78.** NEXT-79a/b als getestete Teilaufgaben; 79c/d ohne aktuelle CI, 79e offen. Letzte bestätigte CI #40153366228: 383 Unit/Behavior/Regression, 102 Desktop/Mobil-E2E.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Draft-PR #48; kein Merge, Release oder Deployment.

## Entwicklungsstand · 25.10.2026, 05:00 MEZ · NEXT-79c/d in Abnahme, NICHT VERÖFFENTLICHT
- [x] NEXT-79c: Turnierdialog-Schrittfolge und zustandsabhängige Aktionsfreigabe implementiert; Desktop-/Mobil-/Tastaturtests committed.
- [x] NEXT-79d: Erklärungen zu Seed/Startwert, Tick, Strategie, Energiereserve, Reststruktur und Turnierformat sowie `aria-describedby` und responsive Browser-Regressionen implementiert.
- [ ] **CI-Gate für NEXT-79c und NEXT-79d:** vollständige Unit-/Behavior-/Regression-/Desktop-/Mobilmatrix auf aktuellem Head erfolgreich bestätigen, bei Fehlern korrigieren und erneut testen. **Beide Aufgaben bis dahin offen.**
- [ ] NEXT-79e: Responsive/Tastatur/Screenreader-Abschlussmatrix und Refactoring-Review; anschließend vollständige CI. Danach NEXT-69–77 gemäß Rolling Backlog.
- **Letzte bestätigte CI vor NEXT-79c/d:** #40153366228 (383 Unit/Behavior/Regression, 102 E2E). **Seit bestätigt veröffentlichtem v0.1.55 genau 6 zuvor vollständig getestete, NICHT veröffentlichte ganze NEXT-Aufgaben:** 63, 64, 66, 67, 68, 78. NEXT-79a/b getestet, 79c/d ohne aktuelle CI, 79e offen. Draft-PR #48; kein Merge/Publish.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsstand · 25.10.2026, 04:00 MEZ · NEXT-79c in Arbeit, NICHT VERÖFFENTLICHT
- [x] Drei Turnierschritte „Einrichten“, „Spielen“, „Ergebnisse“ als getrennte UI-Sektionen und Tastatur-Sprungnavigation umgesetzt.
- [x] Verfügbare Turnieraktionen aus bestehendem Runner-Status zentral abgeleitet; E2E-Tests für 375/1280px, Bedienfolge, Datenzugang und Disabled-Zustände ergänzt.
- [ ] **NEXT-79c CI-Abnahme:** vollständige Unit-/Behavior-/Regression-/Desktop-/Mobile-Matrix für den aktuellen Code-Head bestätigen, gegebenenfalls reparieren; erst danach abschließen.
- [ ] Danach NEXT-79d Hilfen/Kontrast/Touch und NEXT-79e abschließende Usability-Regression. NEXT-69–77 bleiben im Rolling Backlog.
- **Letztes bestätigtes Live-Release v0.1.55; kumulativ 6 vollständig getestete, NICHT veröffentlichte Aufgaben: NEXT-63/64/66/67/68/78.** NEXT-79a/b getestete Teilaufgaben; NEXT-79c in Abnahme. Letzte grüne vollständige CI #40153366228 vor diesen Änderungen: 383 Unit/Behavior/Regression, 102 E2E. Kein Merge/Publish.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsstand · 25.10.2026, 03:00 MEZ · NEXT-78 fertig, NEXT-79a/b fertig, NEXT-79 offen (NICHT VERÖFFENTLICHT)
- [x] NEXT-78 P0 inklusive Raptor-/Titan-HUD am Rand durch CI #40144987038 vollständig abgenommen.
- [x] NEXT-79a Browser-Baseline für 375/768/1280px, Sandbox/Turnier und Tastatur: CI #40152929889 grün.
- [x] NEXT-79b primäre Kampfsteuerung von Werkzeugen getrennt; Status bereit/läuft/pausiert: CI #40153090696 grün (383 Unit/Behavior/Regression, 102 Desktop/Mobil).
- [ ] NEXT-79c/d/e noch offen; NEXT-69 ff. nicht vergessen.
- **Kumulativ 6 vollständig getestete, nicht veröffentlichte NEXT-Aufgaben:** 63, 64, 66, 67, 68, **78 NEU**. Letztes bestätigtes Live-Release v0.1.55. Kein Merge/Publish. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsstand · 25.10.2026, 02:00 MESZ · P0 NEXT-78 Testhärtung (offen)
- [x] Acht Rand-/Eckfälle nun gegen wirkliche Fluchtbewegung und anschließenden Kontakt mit der Arenagrenze abgesichert (Regressionen im Code ergänzt, **noch nicht CI-verifiziert**).
- [ ] Vollständige GitHub-CI auf aktuellem Head (Unit, Behavior, Regression, deterministische Simulation, Typecheck/Build, Desktop/Mobil, Audit und Reproduzierbarkeit) erfolgreich nachweisen; bei Fehlschlag korrigieren und erneut testen.
- [ ] NEXT-78 erst nach erfolgreicher CI und überprüften Browser-Randfällen als abgeschlossen markieren.
- [ ] Danach NEXT-79a UX-Baseline und 79b–79e sequenziert angehen; NEXT-69 ff. erhalten.
- **Kumulativ 5 bestätigte, nicht veröffentlichte NEXT-Tasks:** 63, 64, 66, 67, 68 (jeweils ältere CI grün). Letztes verifiziertes Live-Release v0.1.55. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsstand · 25.10.2026, 01:00 MESZ · NICHT VERÖFFENTLICHT
- **NEXT-78 P0 (in Arbeit, CI-Abnahme ausstehend):** Die Engine begrenzt Weltkoordinaten bereits auf 0..100; der 48px-Raptor bzw. 54px-Titan samt Energie-/Strukturbalken wird bislang jedoch am Spielfeldrand abgeschnitten. CSS-Viewport-Clamp für komplette Roboter/HUD implementiert, Rohkoordinaten und deterministische Engine unverändert. Neue feste Engine-Grenztests und Desktop-/Mobile-Playwright-Tests für acht Rand-/Eckfälle sowie reale Defensive hinzugefügt. **Nicht als abgeschlossen zählen, bevor die aktuelle vollständige CI grün ist.**
- **NEXT-79 P1 (Analyse begonnen, Umsetzung offen):** Quellcode-Audit in `USABILITY_AUDIT.md` mit priorisierten Bedienproblemen und testbaren Folgeschritten 79a–79e; keine UX-Änderung behauptet.
- **Letztes verifiziertes Live-Release v0.1.55.** Unverändert **5 vollständig getestete, noch nicht veröffentlichte Aufgaben:** NEXT-63, NEXT-64, NEXT-66, NEXT-67, NEXT-68. NEXT-78/79 nicht dazuzählen. Nur Draft-PR #48; kein Merge/Publish.

## Aktueller Zustand · 25.10.2026, 00:08 MESZ
**NEXT-68 – NEU vollständig implementiert und verifiziert:** Opt-in-LocalStorage-Checkpoint nur an Match-/Statusgrenzen; validierte versionierte Archive bis 2 MB, explizite Wiederherstellung nach Reload, korrupte/zu große Sicherungen und Quota-Fehler ohne Änderung aktiver Turniere, Datenschutz-Löschung, Pause/Cancel und 16-Teilnehmer-Regression. Refactoring: gemeinsamer validierter Datei-/LocalStorage-Importpfad und isoliertes Speicher-Modul.
**Development Tests #40137115159 auf c95aaf99 grün:** 372 Unit-/Behavior-/Regressionstests (31 Dateien), 92 Desktop-/Mobile-E2E, Typecheck, Build, Audit-Gate 0 bekannte Advisories, zwei identische Clean-Builds.
**Letztes bestätigtes Live-Release v0.1.55:** Publish #40132737105 hat Upload und Live-Checks erfolgreich durchgeführt, #40132968986 hat Live erneut verifiziert. NEXT-56–62 sind veröffentlicht und nicht mehr im Unpublished-Zähler.
**Kumulativ 5 getestete, NICHT veröffentlichte Aufgaben seit v0.1.55:** NEXT-63, 64, 66, 67 und **68 NEU**; nur Entwicklungsbranch / Draft-PR #48. NEXT-65 ist bereits in NEXT-59 enthalten. Nächster Schritt NEXT-69, danach NEXT-70/71, Rolling Backlog bis NEXT-77.
**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Aktueller Zustand · 24.10.2026, 23:00 MESZ
**NEXT-67 – NEU vollständig abgeschlossen und getestet:** Isoliertes Replay abgeschlossener Turnierkämpfe, reproduziert aus Original-Seed und eingefrorenen Roboterdefinitionen. Exakte archivierte Sieger-/Tick-/Reststrukturwerte müssen übereinstimmen; keine Replay-Wiedergabe bei Manipulation oder offenen Kämpfen. Sandbox und aktives Turnier bleiben unverändert. 2/3/16 Teilnehmer, 1/3600 Ticks, Desktop/Mobil und Tastatur getestet. 0 Ticks im Turniermodell absichtlich ungültig.
**Development Tests #40132151611 auf ddd26d15:** 365 Unit/Behavior/Regression (30 Dateien), 86 Desktop-/Mobile-E2E, Typecheck, Build, Audit und zweimaliger reproduzierbarer Build grün.
**Kumulativ 11 seit letztem unabhängig bestätigten Live-Release v0.1.54:** NEXT-56, 57, 58, 59, 60, 61, 62, 63, 64, 66, 67. NEXT-65 in NEXT-59 enthalten. NEXT-56–62: **Veröffentlichungsstatus ungeklärt** (main v0.1.55); NEXT-63/64/66/67: nur Entwicklungsbranch/Draft-PR #48, **NICHT VERÖFFENTLICHT**. Nächste Aufgabe NEXT-68, danach NEXT-69/70; detaillierte Planung bis NEXT-74.
**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

# Backlog

## Neu priorisierte Nutzerbefunde · 25.10.2026 (offen, noch nicht implementiert)

### NEXT-78 · P0 Bug: Raptor verlässt beim Fliehen das Spielfeld – ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Ursache getrennt: Weltkoordinaten bleiben innerhalb 0..100; bisheriges Rendering schnitt Chassis/Waffe/HUD an Rändern ab.
- [x] Visuellen Clamp für Raptor/Titan einschließlich Waffe, Energie- und Strukturbalken ergänzt, Engine/Seeds unverändert.
- [x] Acht Ränder/Ecken, 1000 defensive Fluchtschritte mit nachgewiesener Bewegung und Randkontakt, Seeds 1/12/4711, 375/1280px und Desktop/Mobil getestet.
- [x] Vollständige CI #40144987038 auf a06e5c56: 383 Unit/Behavior/Regression und 96 E2E, Typecheck, Build, Audit, Reproduzierbarkeit grün.

### NEXT-79 · P1 Usability-Audit und Bedienkonzept – TEILWEISE UMGESETZT, GESAMTAUFGABE OFFEN
- [x] **79a:** Quellcode-Audit und Browser-Baseline für Sandbox/Turnier, Tastatur und 375/768/1280px; CI #40152929889 (383 Unit, 100 E2E) grün.
- [x] **79b:** Kampfsteuerung von Werkzeugen getrennt, Start optisch hervorgehoben, Status bereit/läuft/pausiert; CI #40153090696 (383 Unit, 102 E2E) grün.
- [ ] **79c:** Turnierdialog in Einrichten/Spielen/Ergebnisse strukturieren; nur passende Aktionen hervorheben, Autosave/Import/Export erreichbar halten; Desktop/Mobil und Pause/Resume/Cancel absichern.
- [ ] **79d:** Seed, Tick, Strategien und Turnierformate verständlich erklären; Fehlertexte mit Handlungshinweisen, Kontrast/Fokus/Touchziele testen.
- [ ] **79e:** Abschließende responsive, Tastatur-, Screenreader- und Regressionstests, kein horizontaler Scroll; vor/nach Refactoring vollständige CI.
- [ ] NEXT-79 erst nach 79c–79e und vollständiger CI als gesamte Aufgabe abschließen.

**Priorisierung:** NEXT-79c vor NEXT-69; anschließend 79d/e. Rolling Backlog NEXT-69–77 bleibt erhalten. Keine Veröffentlichung oder Merge nach main.

Der Backlog zeigt die nächsten Entwicklungsschritte bewusst konkret und in Reihenfolge. Pro stündlichem Lauf werden bis zu drei unabhängige oder sicher sequenzierbare Schritte bearbeitet; unvollständige Schritte werden zuerst fortgesetzt. Nach jedem Lauf wird die Reihenfolge aktualisiert und der jeweils folgende Block weiter detailliert.

## Aktueller Zustand · 24.10.2026, 22:00 MESZ

**Neue Runde vollständig getestet:** NEXT-64 (reproduzierbare Abhängigkeiten) und NEXT-66 (Matchdetails), Development Tests #40128110261 auf e23323ef: 29 Testdateien, 358 Unit-/Behavior-/Regressionstests, 82 Desktop-/Mobil-E2E, TypeScript/Build, zweimaliger sauberer npm-ci-Install und byteidentischer Dist-SHA256 (1488f94b…), npm audit 0 bekannte Advisories; vollständig erfolgreich. **Kumulativ 10 getestete NEXT-Aufgaben seit v0.1.54; 63/64/66 sicher nicht veröffentlicht.** Nächstes Ziel NEXT-67.
**Letzte unabhängig bestätigte Live-Veröffentlichung:** v0.1.54, Publish #40111747415. **main inzwischen v0.1.55** (Commit 809fe86c; Release-Bump nach Merge von PR #47 um 19:09 UTC). **Live-Veröffentlichung von v0.1.55 NICHT verifiziert; Veröffentlichungsstatus ungeklärt.** Dieser Lauf hat weder Merge noch Publish ausgelöst.
**Aktuelle sichere Entwicklung:** Branch `automation/next-56-tournament-runner-unpublished`, **Draft-PR #48**, kein Merge. Development Tests **#40128110261** auf Commit e23323ef: **358 Unit-/Behavior-/Regressionstests, 82 Desktop-/Mobile-E2E**, Typecheck, Build und npm audit (0 Advisories) erfolgreich.
**Insgesamt zehn seit v0.1.54 implementierte und verifizierte Aufgaben:** NEXT-56, 57, 58, 59, 60, 61, 62, 63, 64, 66.
**Davon sicher noch nicht in main:** **NEXT-63, NEXT-64 und NEXT-66** (nur Draft-PR #48). **NEXT-56 bis NEXT-62:** inzwischen in main integriert; **Veröffentlichungsstatus ungeklärt** bis zur unabhängigen Prüfung der tatsächlich ausgelieferten Homepage. Sie dürfen weder pauschal als unveröffentlicht noch als live behauptet werden.
**Nächster offener Schritt:** NEXT-67 (isoliertes Turnierkampf-Replay). NEXT-65 war in NEXT-59 bereits enthalten und wird nicht doppelt gezählt; Rolling Backlog NEXT-67 bis NEXT-74 ist detailliert.
**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell** (für den aktuellen Draft-PR #48).

---

## Defensive-Korrektur · v0.1.53
- [x] Frühes Abstandhalten statt Warten bis 35 % Struktur
- [x] Verfolgungsstopp standardmäßig bei 70 %; Gegenfeuer innerhalb eigener Reichweite
- [x] Deterministische Engine-/Balance- und Desktop-/Mobile-Regressionen ergänzt
- [x] PR-/main-CI grün: 225 Unit-/Verhaltenstests und 46 Desktop-/Mobile-E2E; PR #45 integriert
- [x] 0.1.53 veröffentlicht, Infoseiten, Versionsarchiv und Build-Commit durch Online-Smoke verifiziert

## Konkrete nächste Läufe

### Erledigt in v0.1.6 · Ereignismodell-Grundtypen
- [x] Event-Typen für Bewegung, Schuss, Treffer und Schaden definiert
- [x] Event-Datenmodell vom Simulationszustand getrennt
- [x] Unit-Tests für Event-Erzeugung ergänzt
- [x] Testsuite-Doku um Event-Testfälle ergänzt

### Erledigt in v0.1.7 · Bewegungsereignisse
- [x] Bewegung als explizites Event erzeugt
- [x] Position vor/nach Bewegung im Event nachvollziehbar
- [x] Verhaltenstest: Bewegungsdistanz überschreitet Geschwindigkeitslimit nicht
- [x] Regressionstest: Event-Erzeugung mutiert Input-State nicht

### Erledigt in v0.1.8 · Schussereignisse
- [x] Schuss als Event mit Angreifer, Ziel und Tick
- [x] Bedingungen Reichweite, Energie und Cooldown explizit geprüft
- [x] Test: kein Schuss außerhalb Reichweite
- [x] Test: kein Schuss ohne ausreichende Energie
- [x] Test: kein Schuss während aktivem Cooldown

### Erledigt in v0.1.9 · Treffer- und Schadensereignisse
- [x] Treffer vom Schuss getrennt
- [x] Schaden als separates Event
- [x] Test: Schaden nie negativ
- [x] Test: Struktur nie unter 0
- [x] feste Seed-Regression für Schadensjitter

### Erledigt in v0.1.10 · Sieg- und Kampfende
- [x] Sieg als explizites Victory-Event
- [x] Kampf stoppt unmittelbar nach Zerstörung
- [x] Test: besiegter Roboter führt keine Aktion mehr aus
- [x] Test: fertiger Match-State bleibt inklusive Event-Stream stabil

### Erledigt in v0.1.11 · Zeitlimit und Unentschieden
- [x] explizites Match-Ende bei Tick-Limit
- [x] Unentschieden als outcome=draw mit endReason=timeout
- [x] Test für Sieg im exakt letzten zulässigen Tick
- [x] feste Seed-Regression für Timeout-Fälle

### Erledigt in v0.1.12 · Energieverhalten härten
- [x] Regeneration und Verbrauch durch Tests dokumentiert
- [x] Grenzfälle am Energiemaximum getestet
- [x] langer deterministischer Energietest vorhanden
- [x] Charakterisierungstests vor Engine-Refactoring ergänzt

### Erledigt in v0.1.13 · Bewegungs- und Arena-Grenzen
- [x] Arena-Grenzen erzwungen
- [x] Tests für x/y-Min/Max
- [x] Verhalten an identischen Positionen abgesichert
- [x] hohe Geschwindigkeiten bleiben innerhalb der Arena

### Erledigt in v0.1.14 · Regression-Seeds
- [x] feste Seed-Sammlung 1, 12 und 4711 definiert
- [x] bekannte Gewinner, Endticks und Reststruktur dokumentiert
- [x] Regressionstest gegen unbeabsichtigte Verhaltensänderungen ergänzt
- [x] Seeds im Testcode sichtbar festgehalten

### Erledigt in v0.1.15 · Test-Review vor Engine-Refactoring
- [x] Abdeckung der Kernregeln geprüft
- [x] Charakterisierung für exakte Reichweitengrenze und Cooldown=1 ergänzt
- [x] wiederholte Aktionsbedingungen in updateRobot als Refactoring-Kandidat identifiziert
- [x] gezieltes Refactoring erst nach Charakterisierung eingeplant

### Erledigt in v0.1.16 · Reichweite und Cooldown charakterisieren
- [x] Verhalten exakt an der Reichweitengrenze getestet
- [x] Cooldown-Abbau über mehrere Ticks charakterisiert
- [x] Regressionstest für ersten erlaubten Schuss nach Cooldown
- [x] Testsuite-Doku um Reichweiten-/Cooldown-Fälle ergänzt

### Erledigt in v0.1.17 · Event-Reihenfolge charakterisieren
- [x] Reihenfolge mehrerer Events innerhalb eines Ticks festgelegt
- [x] Shot/Hit/Damage-Reihenfolge pro handelndem Roboter abgesichert
- [x] Verhalten bei zwei handelnden Robotern charakterisiert
- [x] Testsuite-Doku um Event-Reihenfolge ergänzt

### Erledigt in v0.1.18 · Event-Stream deterministisch absichern
- [x] gleichen Seed gegen identischen Event-Stream testen
- [x] Event-Anzahl und Reihenfolge für feste Seeds charakterisieren
- [x] Regressionstest gegen unbemerkte Event-Änderungen
- [x] Testsuite-Doku um Event-Stream-Testfälle ergänzen

### Erledigt in v0.1.19 · Engine-Refactoring vorbereiten
- [x] charakterisierte Aktionslogik geprüft
- [x] kleinsten sicheren Refactoring-Schnitt festgelegt: Schussfreigabe in canFire zentralisiert
- [x] Verhalten vor Umbau vollständig durch bestehende Charakterisierungs- und Regressionstests abgesichert
- [x] keine sichtbare Verhaltensänderung

### Erledigt in v0.1.20 · Aktionslogik weiter entkoppeln
- [x] Energie-Regeneration, Cooldown-Abbau und Bewegung in prepareAction gekapselt
- [x] Verhalten durch bestehende Regressionstests abgesichert
- [x] nur interne Struktur geändert
- [x] keine sichtbare Verhaltensänderung

### Erledigt in v0.1.21 · Schussausführung kapseln
- [x] Schuss-/Treffer-/Schadensausführung aus updateRobot in fire() herausgelöst
- [x] Energie- und Cooldown-Änderungen unverändert gehalten
- [x] Event-Reihenfolge durch bestehende Regressionstests unverändert gehalten
- [x] keine sichtbare Verhaltensänderung

### Erledigt in v0.1.22 · Roboter- und Komponentensystem beginnen
- [x] Chassis und Waffen als erste kombinierbare Komponenten eingeführt
- [x] bestehende Raptor-/Titan-Presets ohne Verhaltensänderung auf Komponenten migriert
- [x] Konfigurationsvalidierung und Regressionstests ergänzt
- [x] Kombination unterschiedlicher Chassis/Waffen durch Test abgesichert

### Erledigt in v0.1.23 · Komponentenwahl sichtbar machen
- [x] Chassis- und Waffenwahl für Roboter A in der Oberfläche anbieten
- [x] berechnete Roboterwerte live anzeigen
- [x] Reset/Matchstart mit gewählter Konfiguration verbinden
- [x] Desktop- und Mobile-Bedienung absichern

### Erledigt in v0.1.24 · Komponentenwahl für Roboter B
- [x] Chassis- und Waffenwahl für Roboter B in der Oberfläche anbieten
- [x] berechnete Werte von Roboter B live anzeigen
- [x] Reset/Matchstart mit beiden gewählten Konfigurationen verbinden
- [x] Desktop- und Mobile-Bedienung für beide Konfigurationen absichern

### Erledigt in v0.1.25 · Komponentenvalidierung und Builder-Grenzen
- [x] ungültige Roboterkonfigurationen an der Builder-Grenze ablehnen
- [x] Validierungszustand für beide Roboter anzeigen
- [x] Matchstart bei ungültiger Konfiguration verhindern
- [x] Desktop- und Mobile-Verhalten für Validierungszustände absichern

### Erledigt in v0.1.26 · Motoren als Komponente
- [x] Motoren als eigene Komponente modelliert
- [x] Motorwahl für beide Roboter im Builder angeboten
- [x] berechnete Geschwindigkeitswerte live aktualisiert
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.27 · Panzerung als Komponente
- [x] Panzerung als eigene Komponente modelliert
- [x] Panzerungswahl für beide Roboter im Builder angeboten
- [x] berechnete Strukturwerte live aktualisiert
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.28 · Energieversorgung als Komponente
- [x] Energieversorgung als eigene Komponente modelliert
- [x] Energieauswahl für beide Roboter im Builder angeboten
- [x] berechnete Energiewerte live aktualisiert
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.30 · Sensorik als Komponente
- [x] Sensorik als eigene Komponente modelliert
- [x] Sensorwahl für beide Roboter im Builder angeboten
- [x] berechnete Sensorwerte live aktualisiert
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.31 · Gewichtslimits und gültige Komponentenkombinationen
- [x] Komponenten um Gewichtswerte ergänzt
- [x] zulässiges Gesamtgewicht je Chassis definiert
- [x] ungültige Kombinationen im Builder angezeigt und Matchstart gesperrt
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.34 · Roboter optisch unterscheidbarer machen
- [x] Roboter in der Arena visuell klar unterscheiden
- [x] Chassis-Auswahl in der Darstellung erkennbar machen
- [x] bestehende Kampflogik unverändert lassen
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.35 · Start/Reset reparieren und Tests massiv ausbauen
- [x] Start führt sofort einen sichtbaren Tick aus und startet anschließend den Lauf
- [x] Reset stoppt den Lauf und stellt Match, Seed und Standardkonfigurationen zuverlässig wieder her
- [x] Start/Pause/Einzelschritt/Reset und deterministischer Reset auf Desktop und Mobile absichern
- [x] Validierungs-Grenzfälle systematisch erweitern
- [x] Testsuite von 59 auf mindestens 93 Testausführungen erweitern

### Erledigt in v0.1.36 · Waffen am Roboter sichtbar machen
- [x] gewählte Waffe visuell am Roboter darstellen
- [x] Raptor- und Titan-Waffe unterscheidbar machen
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.37 · Projektil- und Schusseffekte
- [x] Shot-Events als sichtbare Schusslinien darstellen
- [x] Effekt zeitlich mit der Simulation koppeln
- [x] deterministisches Kampfverhalten unverändert lassen
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.38 · Treffer- und Schadenseffekte
- [x] Hit-/Damage-Events sichtbar machen
- [x] Trefferfeedback am Zielroboter darstellen
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.39 · Konfiguration in eigenen Dialog auslagern
- [x] Roboter-Konfiguration aus der Kampfanzeige herauslösen
- [x] eigenen Config-Dialog für beide Roboter anlegen
- [x] während des Kampfes nur kampfrelevante Live-Werte anzeigen
- [x] Desktop- und Mobile-Bedienung absichern

### Erledigt in v0.1.40 · Lebensbalken direkt über den Robotern
- [x] Lebens-/Strukturbalken über jedem Roboter anzeigen
- [x] Balken synchron zum tatsächlichen Strukturwert aktualisieren
- [x] bei Schaden sofort sichtbar reagieren
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.44 · Sichtbar flüssige Fahrbewegung
- [x] vorhandene Bewegungspositionen zwischen den Simulationsticks sichtbar animieren
- [x] Fahrbewegung ohne Änderung der deterministischen Engine darstellen
- [x] unterschiedliche Motorgeschwindigkeiten visuell nachvollziehbar machen
- [x] Desktop- und Mobile-Darstellung absichern

---

## Geplanter nächster Zyklus

### Erledigt in v0.1.47 · NEXT-34 · Strategietyp als Engine-Datenmodell
- [x] Strategietypen `aggressive`, `defensive`, `distance` und `melee` definiert
- [x] Strategie explizit je Roboterkonfiguration gespeichert
- [x] bestehendes Kampfverhalten als Default unverändert gehalten
- [x] Unit-/Regressionstests für Default und Serialisierbarkeit ergänzt

### Erledigt in v0.1.49 · NEXT-35 · Aggressive Strategie
- [x] aggressive Zielannäherung als erste echte Strategie implementieren
- [x] Schussentscheidung mit bestehender Reichweiten-/Energielogik verbinden
- [x] deterministische Verhaltenstests mit festen Seeds ergänzen
- [x] Desktop/Mobile-Auswahl vorbereiten, ohne weitere Strategien vorwegzunehmen

### Erledigt in v0.1.50 · NEXT-36 · Distanzstrategie
- [x] gewünschte Kampfdistanz modellieren
- [x] Roboter bei zu großer Distanz annähern und bei zu kleiner Distanz Abstand gewinnen lassen
- [x] Arena-Grenzen und deterministische Bewegung absichern
- [x] Verhaltenstests für beide Distanzrichtungen ergänzen

### Erledigt in v0.1.50 · NEXT-37 · Defensive Strategie
- [x] defensive Entscheidungsregel auf Basis von Struktur und Distanz einführen
- [x] Rückzugsbewegung innerhalb der Arena absichern
- [x] Schießen während defensiver Bewegung eindeutig festlegen
- [x] feste Seed-Regressionen ergänzen

### Erledigt in v0.1.50 · NEXT-38 · Nahkampfstrategie
- [x] konsequentes Schließen der Distanz implementieren
- [x] Nahkampfverhalten mit Waffenreichweite koppeln
- [x] Stillstand/identische Positionen robust behandeln
- [x] deterministische Verhaltenstests ergänzen

### Erledigt in v0.1.52 · NEXT-39 · Strategieauswahl im Config-Dialog
- [x] Strategie für Roboter A und B auswählbar machen
- [x] Auswahl beim Start und Reset korrekt übernehmen
- [x] aktuelle Strategie in der Konfiguration sichtbar machen
- [x] Desktop- und Mobile-E2E ergänzen

### NEXT-40 · Energieverwaltungsparameter · ABGESCHLOSSEN / NICHT VERÖFFENTLICHT
- [x] Optionale Energiereserve 0–100 % der maximalen Energie, Default 0 %, mit Builder-Validierung modelliert
- [x] Schuss nur zulassen, wenn nach Energieverbrauch die Reserve erhalten bleibt; Regeneration erfolgt vor der Prüfung
- [x] Eingabe und Vorschau für A/B im Config-Dialog als Quellcode ergänzt, Reset auf 0 %
- [x] Unit-, Behavior-, Seed- und Desktop-/Mobile-Testfälle als Quellcode ergänzt
- [x] Development Tests #40085113036 auf Commit 193f42d0: 246 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build erfolgreich
- [x] Default 0 % und feste Seeds gegen Regressionen geprüft; Veröffentlichung bleibt ausschließlich manuell und steht aus

### Erledigt in v0.1.52 · NEXT-41 · Strategieparameter im Config-Dialog
- [x] relevante Strategieparameter abhängig vom Strategietyp anzeigen
- [x] Werte validieren und ungültigen Matchstart verhindern
- [x] Reset auf stabile Defaults absichern
- [x] Desktop- und Mobile-E2E ergänzen

### Erledigt in v0.1.52 · NEXT-42 · Strategievergleich in der Kampfanzeige
- [x] gewählte Strategien während des Kampfes kompakt sichtbar machen
- [x] keine Builder-Details zurück in die Kampfanzeige verschieben
- [x] Layout für kleine Displays absichern
- [x] bestehende Kampfanzeige regressionssicher halten

### Erledigt in v0.1.52 · NEXT-43 · Strategie-Testreview und Refactoring
- [x] Strategie-Verhaltensmatrix auf Lücken prüfen
- [x] feste Seed-Vergleiche aller Strategiepaarungen ergänzen
- [x] wiederholte Entscheidungslogik nur nach Charakterisierung refactoren
- [x] nächsten Planungszyklus aus F · Replay & Analyse konkretisieren

## Folgezyklus · F · Replay & Analyse

NEXT-40 und NEXT-44 sind getestet, aber nicht veröffentlicht. NEXT-45 ist der nächste offene Schritt; weitere Schritte sind geplant.

### NEXT-44 · Event Recorder · ABGESCHLOSSEN / NICHT VERÖFFENTLICHT
- [x] Seed, Startkonfigurationen, Initial-/Endzustand und Tick-Events in einem unveränderlichen Snapshot aufzeichnen.
- [x] Append-only-Recorder mit fortlaufenden Tick-IDs, Ereignisreihenfolge und Ende-Sperre ergänzen.
- [x] Tests für 0/1/3600 Ticks, Sofortsieg und Seed-Determinismus implementieren.
- [x] Development Tests #40088595774 auf SHA 7df3cacc: 252 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build erfolgreich.
- [x] Recorder-Tests und unveränderte Default-Kämpfe verifiziert; NEXT-44 als abgeschlossen und unveröffentlicht gezählt.

### NEXT-45 · Replay-Dateiformat und Validierung · ABGESCHLOSSEN / NICHT VERÖFFENTLICHT
- [x] JSON-Schema-Version 1 mit Seed, Arena, RobotDefinition-Snapshots, Tick-Events und Endzustand ergänzen.
- [x] Validierung von Schema-Version, Robot-IDs, Tick-Folge, Event-Referenzen, Arena und nicht endlichen Werten implementieren.
- [x] Unit-/Behavior-/Regressionstests für JSON-Roundtrip, 0-Tick, Sofortsieg und ungültige Daten ergänzen.
- [x] Development Tests #40088913689 auf SHA 9d6f719c: 258 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build erfolgreich.
- [x] Replay-Format als abgeschlossen und unveröffentlicht gezählt; NEXT-46 folgt frühestens im nächsten Stundenlauf.

### NEXT-46 · Replay exportieren und importieren · ABGESCHLOSSEN / NICHT VERÖFFENTLICHT
- [x] Live-Recorder um unveränderliche, wiederholbare Snapshots ohne Abschluss erweitern.
- [x] Deterministische JSON-Dateinamen, Browser-Download, 2-MB-Grenze und Schema-/ID-/Tick-Validierung beim Import.
- [x] Separaten zugänglichen Replay-Dialog mit Import-/Export-Knöpfen, Dateiauswahl und verständlicher Rückmeldung ergänzen.
- [x] Ungültiger Import und gültige Dateivorschau verändern den laufenden Kampf nicht; Wiedergabe erst NEXT-47.
- [x] Unit-/Behavior-/Regressionstests und Desktop-/Mobile-E2E als Quellcode ergänzt.
- [x] Development Tests #40092321506 auf Commit 556a2858: Typecheck, Build, **262 Unit-/Verhaltenstests und 50 Desktop-/Mobile-E2E erfolgreich**; NEXT-46 implementiert und getestet, unveröffentlicht.

### NEXT-47 · Replay-Player (implementiert und getestet, unveröffentlicht)
- [x] Ereignisbasierte Player-Zustandsmaschine mit Play/Pause/Einzelschritt/Ende aus validierten Frames; keine RNG-/Simulationsaufrufe.
- [x] Importierte Aufzeichnung und aktuellen Kampf im eigenen Replay-Dialog mit Tick- und Ereignisanzeige abspielen; Live-Kampf bleibt unverändert.
- [x] GitHub Development Tests #40096436278 (SHA 1b7413a): 268 Unit-/Behavior-/Regressionstests und 52 Desktop-/Mobile-E2E, Typecheck/Build grün; 0-Tick, Sofortsieg, 3600 Ticks, Pause/Ende, erneutes Öffnen und importierte JSON-Datei geprüft.
- [x] NEXT-47 als abgeschlossen und kumulativ unveröffentlicht gezählt; NEXT-48 übernimmt Zustandsrekonstruktion und grafische Zeitleiste.

### NEXT-48 · Replay-Zeitleiste · ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Seek auf Tick 0, Mitte, Ende und rückwärts; deterministische Zustandsrekonstruktion ohne neue Simulation.
- [x] Struktur, Energie, Position und Kampfeffekte nach Seek konsistent; Mobile-Touch und Tastatur geprüft.
- [x] Referenzzustände und Eventreihenfolge mit festen Seeds getestet; Development Tests #40100789839: 274 Unit-/Behavior-Tests, 56 Desktop-/Mobile-E2E, Typecheck/Build grün.

### NEXT-49 · Kampfstatistiken · ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Schüsse, Treffer, effektiven Schaden und Energieverbrauch aus aufgezeichneten Events berechnen.
- [x] Doppelte Events, Überkill, Sofortsieg, 0 Ticks und Timeout gesondert getestet.
- [x] A/B-Vergleich mit zugänglichen Labels und responsiver Ansicht; Development Tests #40100953952: 281 Unit-/Behavior-Tests, 58 Desktop-/Mobile-E2E, Typecheck/Build grün.

### NEXT-50 · Replay-Roundtrip und Testreview · ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Alle 16 Strategiepaarungen × Seeds 1/12/4711: Aufnahme→Export→Import→Player mit Zustands-/Event-Digests verglichen (48 Fälle).
- [x] Maximalgröße, beschädigte JSON-Daten, fehlende Frames und Desktop-/Mobile-E2E abgesichert.
- [x] Referenz-Snapshots, stabile Hash-Vergleiche und Performance der 48-Fälle-Suite im vollständigen CI-Lauf geprüft; Development Tests #40101113261: 284 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.

### NEXT-51 · Replay-Refactoring und Turnierplanung (erledigt, unveröffentlicht)
- [x] Gemeinsames `deepFreeze` in `src/engine/immutable.ts` extrahiert; Recorder-Export für Kompatibilität beibehalten; Replay-Format und Zustandsrekonstruktion importieren direkt aus dem reinen Modul.
- [x] Charakterisierungstests für verschachtelte Event-/Zustands-Snapshots, referenztreue Rückgabe, Primitivwerte und bereits eingefrorene Werte ergänzt.
- [x] Vollständige Unit-/Behavior-/Regression-/Desktop-/Mobile-Tests erfolgreich: Development Tests #40105284320 (gemeinsamer Immutable-Helper), anschließend #40105438397 und #40105486356.
- [x] Turnier-NEXT-52 bis NEXT-59 mit Datenmodell, Seeds, Round-Robin, Auswertung, UI, K.-o., Persistenz und E2E-Abnahmen konkret geplant.

### NEXT-52 · Turnierdatenmodell und Validierung (erledigt, unveröffentlicht)
- [x] Reines Modul `src/engine/tournament-model.ts`: Teilnehmer mit stabiler eindeutiger ID und validierter RobotDefinition, Turnier-ID, `format` (round-robin/knockout), `baseSeed` und `maxTicks`.
- [x] 2–16 Teilnehmer erzwingen; doppelte IDs, ungültige Definitionen, Nicht-Finite-Werte, negative/unsichere Seeds und leere Namen mit verständlichen Fehlern ablehnen.
- [x] Eingaben niemals mutieren; serialisierbare, versionierte Turnierdefinition mit deterministischem JSON-Roundtrip.
- [x] Unit-/Behavior-Tests: Grenzen 1/2/16/17, Duplikate, Invalid-Inputs, Deep-Copy, Wiederholbarkeit.

### NEXT-53 · Deterministischer Round-Robin-Spielplan (erledigt, unveröffentlicht)
- [x] Paarungen für 2–16 Teilnehmer genau einmal pro ungeordnetem Paar erzeugen: `n*(n-1)/2`; keine Selbstpaarungen.
- [x] Paarungsreihenfolge und Seeds allein aus Turnierdefinition und Matchindex ableiten, ohne globalen RNG; unabhängig von UI-/Ausführungsreihenfolge.
- [x] Gerade/ungerade Teilnehmerzahl, 2/3/4/16 Teilnehmer und Seed-Grenzen testen; Snapshot-Digests für feste Referenzturniere.

### NEXT-54 · Turnierauswertung und Rangfolge (abgeschlossen und getestet)
- [x] Ergebnisse als unveränderliche Datensätze (Teilnehmer-IDs, Seed, Gewinner/Unentschieden, Ticks, Reststruktur) erfassen; doppelte Match-IDs ablehnen.
- [x] Tabelle aus Ergebnissen berechnen: Spiele, Siege, Unentschieden, Niederlagen, Punkte 3/1/0, Struktur-Differenz.
- [x] Gleichstand deterministisch nach Punkten, Struktur-Differenz und stabiler Teilnehmer-ID auflösen; unvollständige Turniere anzeigen.
- [x] Unit-/Behavior-Tests: 0 Matches, Draw, Sieg, Überzählung, Duplikate, stabile Sortierung, keine Eingabemutation.

- Qualitätsnachweis: Development Tests #40109944097 (303 Unit/Behavior, 60 Desktop/Mobile, Typecheck/Build erfolgreich); unveröffentlicht.

### NEXT-55 · Responsives Turnier-UI-Grundgerüst
- [x] Eigenständiger Dialog mit Teilnehmern, Paarungen, Fortschritt und Tabelle; Sandbox-Kampfzustand strikt unverändert.
- [x] Tastaturbedienung, Fokusmanagement, klare Fehlerzustände und responsive Darstellung auf 375px und Desktop.
- [x] Playwright-E2E: Öffnen/Schließen, gültige/ungültige Eingaben, Scrollen, Touch und unveränderte Sandbox.

- **Verifiziert:** Development Tests #40110813524 auf SHA 9f17bc65: 303 Unit-/Behavior-Tests, 64 Desktop-/Mobile-E2E, Typecheck/Build erfolgreich; Sandbox-Isolation, 375px, Escape/Fokus und ungültige Eingaben geprüft.

### NEXT-56 · Deterministische Turnierausführung (implementiert und vollständig getestet, unveröffentlicht)
- [x] Runner verarbeitet geplante Paarungen seriell mit `runMatch`/Engine ohne UI-Kopplung; Pause/Fortsetzen/Abbrechen an Matchgrenzen.
- [x] Kein versteckter RNG; identische Definitionen liefern identische Ergebnisse und Reihenfolge, auch nach Pause.
- [x] Unit-/Behavior-/Performance-Tests für 2/4/16 Teilnehmer, feste Seeds, Timeout und Abbruch ohne Teilzustandsverlust (CI #40113922862 grün: 314 Unit/Behavior, 64 Desktop/Mobile).

### NEXT-57 · K.-o.-Bracket (vollständig getestet, unveröffentlicht)
- [x] Single-Elimination für 2–16 Teilnehmer, deterministische Freilose für die zuerst gesetzten Teilnehmer und keine doppelte Teilnahme pro Runde.
- [x] Unentschieden über Reststrukturanteil und danach stabile Setzreihenfolge auflösen, ohne RNG-Zusatz.
- [x] Engine-Regressionen 2/3/5/8/16 Teilnehmer, stabile Seeds/Champion/Matchzahl. CI #40119157124: grün. Browser-K.-o.-UI ist getrennte Folgeaufgabe.

### NEXT-58 · Turnier-Import/-Export und Wiederaufnahme (vollständig getestet, unveröffentlicht)
- [x] Versioniertes JSON mit Schema-/Größen-/Status-/Matchreihenfolgeprüfung und immutable Ergebnissen.
- [x] Browser-Import/Export, Resume an Matchgrenzen, keine doppelten Kämpfe; ungültiger Import erhält den laufenden Turnierstand.
- [x] Tests: pausierter und abgeschlossener Roundtrip, fehlerhafte Zustände/Progress/IDs, Sonder-IDs, Desktop-/Mobile-Dateiimport; CI #40119157124: grün.

### NEXT-59 · Turnier-E2E, Statistik und Refactoring (vollständig getestet, unveröffentlicht)
- [x] Engine-Integration für 16 Teilnehmer/120 Round-Robin-Matches; Import-/Resume-Ergebnisse stimmen mit direktem Lauf überein.
- [x] Browser-E2E für Round Robin mit Pause/Resume, JSON-Download/-Upload und Tabellenstand; Desktop und Mobile.
- [x] K.-o.-Turnier in der Browseroberfläche integrieren und Desktop-/Mobile-E2E mit Tastatur, Gewinneranzeige und Freilosen ergänzen; ungültige Konfiguration und Touch-Details bleiben in der Abnahme.
- [x] 16-Teilnehmer-SHA256-Referenz-Digests für Tabelle und Bracket mit festen Seeds festgeschrieben; 30-Sekunden-Engine-Laufzeitlimit in CI geprüft. Speicherlimit wird durch die feste Teilnehmergrenze (max. 16) und vollständige Testmatrix begrenzt, nicht durch eine separat gemessene Heap-Obergrenze.
- [x] SHA256-Charakterisierung vor K.-o.-Seed-Refactoring, danach vollständige Unit-/Behavior-/Regression-/E2E-Matrix erneut erfolgreich ausgeführt (CI #40123058094).

### NEXT-60 · Turnier-Fairness und Seed-Audit (vollständig getestet; Live-Status ungeklärt)
- [x] Reines Audit zählt A/B-Auftritte, Spielplan-IDs, Seeds und Teilnehmer ohne Simulations-RNG; sichere Sonder-IDs.
- [x] Optionales `sideAssignment: 'balanced'` verteilt A/B-Starts bei 2/3/4/5/16 Teilnehmern mit maximal 1 Unterschied; klassischer Default unverändert.
- [x] Echte Runner-, Tabellen- und Archiv-Integration mit identischen Match-IDs/Seeds, Pause/Resume/Import/Export und Browser-Selektor; Desktop/Mobile verifiziert.
- [x] Paarweise Side-Swap-Simulation mit quantifizierter 25-%-Biasgrenze, 16-Teilnehmer-SHA256-Referenz-Digests für Balanced und Legacy.
- [x] CI #40123664899 grün; main enthält den Code seit PR #47, tatsächliche Homepage-Veröffentlichung ungeklärt.

### NEXT-61 · Exportierbare Turniertabelle (implementiert, getestet)
- [x] Validierte Ergebnis- und Tabellen-Snapshots als versioniertes JSON und CSV ausgeben, ohne laufende Sandbox zu verändern.
- [x] Feste Spaltenreihenfolge, Unicode, dezimalpunktbasierte numerische Werte, CSV-Quoting, Formel-Injection-Schutz und unvollständige Turniere implementieren.
- [x] Unit-/Behavior-Tests für Sonderzeichen, 0 Ergebnisse und 16 Teilnehmer; Desktop-/Mobile-Download erfolgreich.

### NEXT-62 · Turnier-Leistung und Abbruchgrenzen (vollständig getestet; Live-Status ungeklärt)
- [x] Reproduzierbarer Benchmark: 16 Teilnehmer, 120 Paarungen, Seed 4711, 100 Ticks, Wall/CPU/Heap-Messung; CI #40124222697: 191,5 ms Wall, 233,9 ms CPU, 1,70 MiB Heap-Wachstum (Referenzmessung, keine Endgerätegarantie).
- [x] CI-Regressionsgrenzen: <30 s Wall, <30 s CPU, <128 MiB Heap-Wachstum; deterministische Ergebniskontrolle.
- [x] Pause bei 60/120, Archiv-Roundtrip, Resume ohne Duplikate und Cancel ohne zusätzliche Matches unter Last getestet.
- [x] Browser-Automatik spielt maximal ein Match pro Event-Loop-Aufgabe und gibt UI zwischen Matches frei; Fortschritt, Pause/Resume/Cancel und Sandbox-Isolation auf Desktop/Mobile getestet.
- [x] CI #40123885631/#40124222697 grün; main enthält den Code, tatsächliche Homepage-Veröffentlichung ungeklärt.

### NEXT-63 · Turnier-Zugänglichkeit und Robustheit (NEU vollständig getestet, NICHT veröffentlicht)
- [x] Dialogbeschreibung, Screenreader-Live-Fortschritt, fokussierbare Spielplan-/Tabellen-Scrollbereiche und sichtbare Tastaturfokus-Ringe ergänzt.
- [x] 44px Touch-Ziele, lesbarer Dialogkontrast (WCAG ≥4,5:1 im Browser-Test), 375px-Layout und Desktop-/Mobile-Bedienung geprüft.
- [x] Doppelklick auf `Nächster Kampf` führt nur einen Kampf aus; erneutes Erstellen identischer aktiver Pläne setzt den Fortschritt nicht zurück.
- [x] Ungültige neue Konfiguration verwirft kein laufendes Turnier; Dialog schließen stoppt Automatik; Sandbox bleibt unverändert.
- [x] Vollständige CI #40124222697 auf 01771371: 354 Unit-/Behavior-/Regressionstests, 80 Desktop-/Mobile-E2E, Typecheck/Build/Audit grün; ausschließlich Draft-PR #48.

### NEXT-64 · Reproduzierbare und sichere Entwicklungsabhängigkeiten (NEU abgeschlossen, NICHT veröffentlicht)
- [x] Lockfile v3 aus realem CI-Install erstellt; `npm ci` statt `npm install` und Cache-Key auf Lockfile-Hash; Update-Strategie: bewusster Lockfile-Update-PR mit Audit, Unit/E2E und zwei Builds.
- [x] Sicherheitsgate lehnt jede bekannte Advisory ab (npm audit, 0 Befunde im CI); keine automatische Veröffentlichung.
- [x] Zweimal `npm ci` und zweimal Build auf identischem SHA; Dist-SHA256 byteidentisch (1488f94b…); CI #40128110261 erfolgreich.

### NEXT-65 · K.-o.-Turnier im Browser (bereits in NEXT-59 erledigt – DUPLIKAT, nicht erneut zählen)
- [x] K.-o.-Format, Bracket, Freilose und Champion responsiv dargestellt.
- [x] Isolierte Engine ohne Sandbox-Veränderung; Desktop-/Mobile-Behavior-E2E 3/5/16 Teilnehmer.
- [x] Mit NEXT-59 getestet; kein neuer separater Entwicklungsabschluss.

### NEXT-66 · Detailansicht einzelner Turnierkämpfe (NEU abgeschlossen, NICHT veröffentlicht)
- [x] Paarungsdetails aus validiertem, immutable Runner-Snapshot nach jedem Match anzeigen: Seed, Ticks, Gewinner/Remis, Reststruktur A/B.
- [x] Ausstehende Paarungen mit `Ausstehend` ohne erfundene Ticks/Sieger/Reststruktur; Unicode- und HTML-artige Namen nur via `textContent`.
- [x] 2/16 Teilnehmer, Timeout/Remis, ungültige Seeds, deterministische Wiederholung, Archiv-Roundtrip und Desktop/Mobil im CI #40128110261 verifiziert.

### NEXT-67 · Turnierkampf-Replay aus reproduzierbaren Seeds · ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Reproduzierbaren Replay-Snapshot für abgeschlossenen Kampf isoliert aus Original-Seed und Turnierdefinition erzeugen, ohne Sandbox oder aktives Turnier zu verändern.
- [x] Archiviertes Ergebnis exakt auf Sieger, Tick und beide Reststrukturen prüfen (kollisionsfreier Feldvergleich statt verlustbehaftetem Digest); manipulierte Ergebnisse und offene Kämpfe explizit ablehnen.
- [x] Zugängliche Replay-Schaltfläche je abgeschlossener Paarung, vorhandener Replay-Player, 1/3600-Tick-Grenzen, 0-Tick-Validierungsfehler, 2/3/16 Teilnehmer, Desktop-/Mobile-E2E und Tastatur prüfen. CI #40132151611 grün: 365 Unit/Behavior/Regression und 86 E2E.

### NEXT-68 · Sicheres automatisches Turnier-Zwischenspeichern · NEU ABGESCHLOSSEN, NICHT VERÖFFENTLICHT
- [x] Opt-in-LocalStorage-Snapshot nur an Match-/Statusgrenzen mit Archivschema 1, 2-MB-Grenze und vollständiger Validierung; keine Hintergrund-Übertragung.
- [x] Korrupte/zu große Daten, falsche Versionen und Quota-Fehler abweisen, gültiges aktives Turnier unangetastet lassen; deaktivierte Einwilligung löscht lokal gespeicherte Daten.
- [x] Wiederaufnahme nach Reload nur auf Benutzeraktion, Pause/Cancel-Semantik, 2/3/16 Teilnehmer und 120 Matches, Desktop-/Mobile-Tests absichern. CI #40137115159: 372 Unit-/Behavior-/Regressionstests und 92 Desktop-/Mobile-E2E erfolgreich.
- [x] Dateiimport und lokale Wiederherstellung nutzen denselben validierten Importpfad; Storage-Modul ist isoliert und unit-getestet.

### NEXT-69 · Eigene Roboterkonfigurationen im Turnier
- [ ] Validierte aktuelle A/B-Konfigurationen als optionale Teilnehmer-Presets übernehmen, ohne Live-Sandboxzustand zu mutieren.
- [ ] Namens-/ID-Duplikate, Komponentenlimits und Strategiewerte für bis zu 16 Teilnehmer prüfen.
- [ ] Deterministische Paarungen, Export/Import und Browser-Behavior-Tests ergänzen.

### NEXT-70 · Turnierergebnis-Export je Match
- [ ] CSV/JSON mit Match-ID, A/B-IDs, Seed, Ticks, Gewinner und Reststruktur versioniert exportieren.
- [ ] Formel-Injection-/Unicode-/CSV-Quoting-Schutz und unvollständige Turniere testen.
- [ ] Browser-Downloads Desktop/Mobile sowie JSON-Roundtrip ohne Sandbox-Änderung prüfen.

### NEXT-71 · Turnier-Regression, Refactoring und Release-Readiness
- [ ] Seit NEXT-60 neu hinzugekommene Module auf Duplikate, Kopplungen und versteckte RNG-Verwendungen prüfen.
- [ ] Vor jedem Refactoring Charakterisierung, danach komplette Unit-/Behavior-/Desktop-/Mobile-Matrix und SHA256-Digests erneut ausführen.
- [ ] Versions-/Live-Status, Draft-PR, Deployment-Gates und manuelle Freigabe dokumentieren; **kein Publish**.

### NEXT-72 · Best-of-N Turnierserie (geplant, noch nicht implementiert)
- [ ] Ungerade Serienlängen 1/3/5 als validiertes Modell definieren; feste Seedfolge und stabile Seitenzuordnung.
- [ ] Abbruch sobald eine Seite uneinholbar führt, Remis-/Tie-Break-Regel dokumentieren; keine versteckte RNG-Nutzung.
- [ ] Golden-Digests, 2/16 Teilnehmer, Archive und Desktop-/Mobile-Regressionen absichern.

### NEXT-73 · Match-Statistik im Turnier (geplant)
- [ ] Treffer, Schüsse, Schaden und Energieverbrauch je Match aus deterministischen Ereignissen ableiten.
- [ ] Statistik von bereits archivierten Matches als optional kennzeichnen; keine Werte erfinden.
- [ ] Unit/Behavior/Replay-Golden-Digests und responsives Layout prüfen.

### NEXT-74 · Turnierdaten-Validierung und Missbrauchsgrenzen (geplant)
- [ ] Importgröße, Duplikate, Prototyp-Namen, verschachtelte Objekte und nicht endliche Zahlen prüfen.
- [ ] Fehlerhafte Daten dürfen laufendes Turnier und Sandbox nicht verändern.
- [ ] Fuzz-/Property-Tests mit festen Seeds, Desktop/Mobil und vollständige Regressionen ergänzen.

### NEXT-75 · Turnier-Archivmigration und Abwärtskompatibilität (geplant)
- [ ] V1-Archive und LocalStorage-Snapshots bei zukünftiger Schemaänderung strikt versioniert behandeln; keine stille Datenkonvertierung.
- [ ] Validierte Migrationsmatrix und explizite Fehlertexte für inkompatible Versionen, beschädigte und zu große Sicherungen.
- [ ] Golden-Archive für Pause/Cancel/Complete, 2/16 Teilnehmer und Desktop-/Mobile-Import dauerhaft testen.

### NEXT-76 · Turnier-Suche und Ergebnisfilter (geplant)
- [ ] 120 Paarungen nach Teilnehmer, Ergebnisstatus und Match-ID ohne Mutation des Turnier-Snapshots filtern.
- [ ] Zugängliche Suche mit Debounce, Tastatur und 375px-Layout; HTML-/Unicode-Namen sicher anzeigen.
- [ ] Browser-E2E für Filter, Replay, Import und Zurücksetzen der Suche, auch bei unvollständigen Turnieren.

### NEXT-77 · Export- und Autosave-Fehlerbehandlung (geplant)
- [ ] Einheitliche Fehlermeldungen für lokale Speichersperre, Quota, ungültige Archive und Download-Fehler ohne Verlust des Turnierstands.
- [ ] Opt-in- und Löschzustände gegen Browser-Neustart und konkurrierende Tabs prüfen; Konflikte sichtbar machen statt Daten still zu überschreiben.
- [ ] Fehlerpfade mit Unit-/Behavior-/Desktop-/Mobile-Regressionen und vollständiger CI absichern.

## Planungszyklus

- Nach spätestens 10 konkreten NEXT-Schritten oder sobald weniger als 5 konkrete NEXT-Schritte übrig sind, wird ein Planungszyklus fällig.
- Der Planungszyklus erzeugt wieder mindestens 5 und höchstens 10 kleine, eindeutig abschließbare NEXT-Schritte aus dem nächsten priorisierten Entwicklungsblock.
- Er bereinigt dabei bereits erledigte/stale Backlog-Punkte und prüft Test-/Refactoring-Bedarf.
- Ein Planungszyklus ist kein Feature-Lauf und verändert kein Spielverhalten.
- Der jeweils letzte Schritt eines Zyklus plant den nächsten Block konkret vor, damit kein planmäßiger Lauf ohne eindeutigen NEXT-Schritt endet.

---

## Parallel laufender Testausbau

Bei **jedem** Feature-Schritt:
- [x] neue Regel mit Unit-/Verhaltenstest absichern
- [x] bei Bugfix einen Regressionstest ergänzen
- [x] Testsuite-HTML um reale Testfälle erweitern
- [x] feste Seeds verwenden, wenn Verhalten reproduzierbar sein muss
- [x] vor Refactoring fehlende Charakterisierungstests ergänzen
- [x] nach Refactoring komplette Testsuite erneut ausführen

---

## Danach: größere Entwicklungsblöcke

### C · Roboter- und Komponentensystem
Chassis, Motoren, Panzerung, Energie, Sensorik, Waffen, Gewichtslimits und Presets.

### D · Robot Builder
Komponentenwahl, Live-Werte, Validierung, Speichern/Laden, Import/Export.

**Späterer UI-Aufräumblock · niedrige Priorität**
- [ ] Roboter-Konfiguration aus dem rechten Kampfbereich herauslösen
- [ ] eigenen Config-Dialog für Chassis, Motor, Panzerung, Energie, Sensorik und Waffen anlegen
- [ ] Config-Dialog vor dem Kampf bzw. bei bewusster Neukonfiguration öffnen
- [ ] während des Kampfes rechts nur kampfrelevante Live-Werte anzeigen (z. B. aktuelle Struktur/Panzerung, Energie, Status)
- [ ] Kampfanzeige kompakter und klar von der Konfiguration trennen
- [ ] Desktop- und Mobile-Bedienung des Dialogs absichern

### E · Strategiesystem
Aggressiv, defensiv, Distanz, Nahkampf, Energieverwaltung und Strategieparameter.

### F · Replay & Analyse
Event Recorder, Replay-Datei, Player, Zeitleiste und Kampfstatistiken.

### G · Turniere
Round Robin, K.-o., Best-of-N, Tabellen, Seeds und Turnierstatistiken.

### H · Testlabor
Batch-Simulationen, Siegquoten, Reststruktur, Energieverbrauch, Seed-Vergleiche.

### I · Arenen & Spieltiefe
Hindernisse, Arena-Größen, Engstellen, Gefahren- und Energiezonen.

### J · Qualität, Performance & Refactoring
Testabdeckung, Flaky Tests, Performance, Accessibility, Architektur und Dependencies.

### K · Version 1.0
Stabile Sandbox mit Editor, Strategien, Replay, Turnieren, Testlabor und reproduzierbarer Releasequalität.

---

## Öffentliche Backlog-Regel

`backlog.html` zeigt:
1. aktuelle Version,
2. letzten Publish,
3. nächsten geplanten Lauf,
4. **den nächsten konkreten Schritt**,
5. **mehrere danach folgende konkrete Schritte in Reihenfolge**,
6. anschließend die größeren Entwicklungsblöcke.

So bleibt jederzeit sichtbar, was beim nächsten Lauf passiert und was unmittelbar danach vorgesehen ist.

## Detaillierte Folgeabnahme (Planung, noch nicht implementiert)
- **NEXT-44 Recorder:** Seed und beide RobotDefinition-Snapshots einmalig beim Matchstart einfrieren; Tick/Events nur append-only; bei Replay-Aufnahme 0, 1 und 3600 Ticks sowie sofortigem Sieg Ereignisreihenfolge und unveränderte Eingaben prüfen.
- **NEXT-45 Replay-Format:** schemaVersion=1, Seed, Arenaabmessungen, Roboterdefinitionen, Tick-/Eventliste und Endzustand; ungültige IDs, Ticks, Versionen und Nicht-Finite-Werte mit benannten Fehlern ablehnen; JSON-Roundtrip deterministisch.
- **NEXT-46 Import/Export:** Download mit stabiler Dateibenennung; Dateiimport mit Größenlimit, Fehlerdialog und ohne Änderung des laufenden Matchs bei ungültigen Daten; Desktop/Mobile und Tastatur testen.
- **NEXT-47 Player:** Aufzeichnungen ohne SeededRandom erneut abspielen; Play/Pause/Step und Ende deterministisch; keine Simulation im Player; Tests für leere und früh beendete Kämpfe.
- **NEXT-48 Zeitleiste:** seek(0), seek(mitte), seek(ende), rückwärts springen; Energie/Struktur/Position/Effekte konsistent rekonstruieren; Desktop/Mobile inklusive Touch testen.
- **NEXT-49 Statistiken:** Shot-, Damage- und Energy-Kennzahlen ausschließlich aus Events ableiten; negative/überzählige Schäden ausschließen; Sieger/Unentschieden getrennt anzeigen.
- **NEXT-50 Roundtrip:** Alle 16 Strategiepaarungen × Seeds 1/12/4711 mit Export→Import→Player gegen Zustands-/Event-Digests prüfen; Speichergrenzen und Browser-E2E aufnehmen.
- **NEXT-51 Refactoring/Turnierplanung:** Recorder/Player-Schnittstellen nach Charakterisierung entkoppeln; bestehende Referenzen unverändert halten; 5–10 konkrete Turnieraufgaben mit Abnahmetests planen.
