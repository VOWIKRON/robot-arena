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
- **Diese Runde: NEXT-88 NEU ABGESCHLOSSEN** – deterministische Dauerlast (16 Roboter, 120 Kämpfe, 5.760 Ticks), Archivpause/-wiederaufnahme, maximal 3.600 Ticks, Laufzeit-/Heap-/Archivgrößen-Diagnostik ohne fragile Grenzwerte. Kein Produktionscode verändert.
- **GitHub-CI #40262194281 SUCCESS auf Code-/Dokumentationscommit 12ac113b86a59c8536f7585d34716d5af9858d43:** 434/434 Vitest, 4/4 Konfliktprüfungen, 162/162 Desktop-/Mobiltests; TypeScript, reproduzierbarer Build, Audit ohne bekannte Schwachstellen. **600/600 Prüfungen.** Neue Dokumentations-Commits benötigen erneute CI.
- **Kumulativ 6 fertig getestet und NICHT veröffentlicht seit v0.1.57:** NEXT-76 Suche/Filter, NEXT-82 sichere Downloads, NEXT-85 Integration, NEXT-86 Port auf v0.1.57, NEXT-87 120-Kampf-Stresstest, **NEXT-88 NEU** Langläufer-/Ressourcentests. NEXT-85/86/87/88 sind QA-Aufgaben.
- **Refactoring:** Endurance-Fixture gekapselt; kein Produktiv-Refactoring nötig. **Offen:** NEXT-79e manuelle Barrierefreiheit, NEXT-80 atomare Cross-Tab-CAS, NEXT-84 Safari/iOS, NEXT-89 Langzeit-Ressourcentrends. Draft-PR #68; kein Merge nach main, kein Release-Commit, kein publish.php, kein Deployment.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

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

## NEXT-86 PR-Status · 26.10.2026 · NICHT VERÖFFENTLICHT
- Draft-PR #66 gegen main v0.1.57 angelegt. Sechs neue Feature-/Test-Dateien und zwei aktualisierte Quell-Dateien (main.ts, style.css) sowie Entwicklungsdokumentation; keine Releaseversion verändert.
- Teststatus auf dem NEXT-86-Branch: neue GitHub-CI bisher NICHT bestätigt; nicht als erledigt zählen. Letzte bestätigte gemeinsame CI stammt aus NEXT-85 (#40244548121), nicht aus NEXT-86.
- Kumulativ unveröffentlicht und getestet: NEXT-76, NEXT-82, NEXT-85 = 3. NEXT-86 bleibt in Arbeit.
- Kein Merge/Publish/Deployment.

## NEXT-86 · Rebase auf v0.1.57 · 26.10.2026 · NICHT VERÖFFENTLICHT
- **Verifizierte Releasebasis:** main v0.1.57; NEXT-69/70/71/74/75/77 bereits in main und daher nicht mehr als unveröffentlicht zählen.
- **Kumulativ seit v0.1.57 einzeln und gemeinsam getestet, aber unveröffentlicht:** NEXT-76 (zugängliche Turniersuche/Statusfilter; isolierte QA und NEXT-85 erfolgreich), NEXT-82 (sichere Browserdownloads; isolierte QA und NEXT-85 erfolgreich), NEXT-85 (Acht-Feature-Integration; 429 Unit/Behavior/Regression/Determinismus + 160 Desktop/Mobil in QA #40244548121). **Gesamt 3.**
- **Aktuelle Runde:** NEXT-86 überträgt ausschließlich NEXT-76/82 auf einen frischen main-v0.1.57-Branch; main.ts und style.css sind gegenüber dem früheren sechs-Aufgaben-Kandidaten byte-identisch, daher konnte die zuvor kombinierte Änderung ohne Überschreiben der veröffentlichten Funktionalität übernommen werden. Neue Quell- und Testdateien übernommen.
- **NEXT-86 Status:** Codeport abgeschlossen, volle QA auf neuem Branch NOCH NICHT bestätigt; erst nach grüner CI als abgeschlossen werten.
- **Rolling Backlog:** NEXT-86: volle isolierte CI inkl. deterministischer Simulationen, TypeScript, Build, Audit, Desktop/Mobil; Diff gegen main prüfen; NEXT-79e: echte NVDA/VoiceOver/Touch-Abnahme; NEXT-80: atomare Cross-Tab-CAS; NEXT-84: Safari/iOS-Matrix; NEXT-87: Export-/Suchfilter-Stresstest auf großen Turnierarchiven mit festen Seeds.
- **Kein Publishing:** kein Merge nach main, kein Release-Commit, kein publish.php, keine Homepage-Aktualisierung.

## Gemeinsame Integrations-CI erfolgreich · 25.10.2026 · NICHT VERÖFFENTLICHT
- **Aktuelle Runde: NEXT-74, NEXT-75, NEXT-77** in den bereits geprüften NEXT-69/70/71-Stand integriert; gemeinsamer QA-only Draft-PR #62.
- **Ergebnis:** isolierte QA #40238144023 SUCCESS auf `e7967c636716582fe6bfeab8652ca9b24196abac`: **419/419 Unit/Behavior/Regression/Determinismus (37 Testdateien), 152/152 Desktop-/Mobiltests**, TypeScript, Produktionsbuild, reproduzierbarer Build und Security-Gate (0 bekannte Schwachstellen) erfolgreich.
- **Kumulativ vollständig entwickelt, einzeln und gemeinsam getestet, NICHT VERÖFFENTLICHT: 6:** NEXT-69 (Roboterpresets), NEXT-70 (CSV-/JSON-Kampfexport), NEXT-71 (Integration Presets/Export), NEXT-74 (Importvalidierung), NEXT-75 (V1-Archivkompatibilität), NEXT-77 (Autosave-/Downloadfehler). **Neu als NEXT-Aufgabe abgeschlossen: 0**; drei bestehende NEXT-Aufgaben integriert.
- **Refactoring:** Gemeinsamer Blob-Download für Kampf/Turniertabelle/Archiv mit URL-Aufräumen; deterministische Engine unverändert.
- **Offen:** NEXT-79e manuelle NVDA-/VoiceOver-/Touch-/Kontrastabnahme; ausgeschlossen vom Releasekandidaten. Dokumentations-Follow-up-Commit benötigt erneut QA.
- **Commit-/PR-Status:** Draft-PR #62 ausschließlich gegen QA-Branch; main weiterhin `3d516317` / v0.1.56.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Keine Homepage-, Release- oder Publishing-Aktion.

## Integration NEXT-74 → NEXT-75 → NEXT-77 · 25.10.2026, 23:00 MEZ · NICHT VERÖFFENTLICHT
- **3 bearbeitete Aufgaben:** NEXT-74, NEXT-75, NEXT-77 in bestehenden NEXT-69/70/71-QA-Stand integriert. Archive/Model/Guard, Golden-Tests, Storage-Guard, Desktop/Mobile-Tests und `src/main.ts` zusammengeführt. Match-CSV/JSON-Download benutzt jetzt denselben Fehler-/Cleanup-Pfad wie Tabellen- und Archivdownload.
- **Kumulativ vollständig implementiert und EINZELN getestet, aber UNVERÖFFENTLICHT: 6:** NEXT-69 (Presets; 391 Unit + 134 E2E), NEXT-70 (Kampfexport; 387 + 130), NEXT-71 (Presets/Export-Integration; 395 + 144 + 4 Guard), NEXT-74 (Import-Validierung; 392 + 128), NEXT-75 (Archivkompatibilität; 393 + 126), NEXT-77 (Autosave-/Exportfehler; 388 + 134). **Neu als NEXT-Aufgabe abgeschlossen: 0.**
- **Release-Gate:** sechs-Aufgaben-Gesamttests noch nicht bestätigt; gemeinsamer Kandidat NICHT publish-reif, bis CI auf aktuellem SHA grün. NEXT-79e manuell weiterhin offen und ausgeschlossen.
- **Refactoring:** Einheitlicher Blob-Download; Simulationsengine unverändert.
- **Schreib-/PR-Status:** isolierter Branch `integration/NEXT-69-70-71-74-75-77-release-candidate`; Integration-PR zur isolierten QA vorgesehen. Keine Änderung an main, keine Veröffentlichung oder Deployment.
- **Nächste Schritte:** isolierte QA ausführen, Fehler beheben, Regressionssuite erneut prüfen; danach Publish-Readiness ohne tatsächliche Veröffentlichung dokumentieren.

## Release candidate preparation · 25.10.2026 · NOT PUBLISHED
- Isolated integration branch: `integration/NEXT-69-70-71-74-75-77-release-candidate`, based on combined NEXT-69/70/71 QA.
- **Cumulative completed, individually tested, unpublished:** NEXT-69 (presets), NEXT-70 (match export), NEXT-71 (combined integration), NEXT-74 (input validation), NEXT-75 (archive compatibility), NEXT-77 (storage/export errors). **6 total; 0 newly completed this preparation run.**
- **Release readiness BLOCKED:** NEXT-74/75/77 not yet reconciled into the combined branch; six-task CI has not run. See RELEASE_CANDIDATE_GATE.md.
- **NEXT-79e:** accessibility manual acceptance remains open; excluded from candidate.
- No merge to main, release commit, publish.php, deployment or homepage change.

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
## Release candidate 25.10.2026 – only completed NEXT-63/64/66/67/68/78/79a-d
- NEXT-64 previously merged to main; this candidate adds NEXT-63, 66, 67, 68, 78, 79a, 79b, 79c and 79d from verified snapshot 4e50e098e20d. NEXT-79e intentionally excluded.
- Final release CI and deployment verification required. One NEXT per branch for future work; no unfinished NEXT tasks in this candidate.

## NEXT-60 abgeschlossen · 24.10.2026 · nicht veröffentlicht
- Tatsächliche CI #40123159397 erfolgreich (auf Code- und Teststand vor dieser Dokumentationsänderung).
- Opt-in-Seitenbalance ist im Spielplan und tatsächlichen Runner implementiert, mit identischen Match-IDs/Seeds, gültigen Archiven und deterministischer Tabellenwertung.
- Regressionen für 2/3/4/5/16 Teilnehmer, Side-Swap, Pause/Resume, Export/Import, legacy unverändertes Verhalten; 16-Teilnehmer-Golden-SHA256 für Spielplan, Ergebnisse, Tabelle und Bias. Referenzszenario maximal 25 % Side-Bias, maximal 1 Seitenstart Differenz je Teilnehmer.
- **Kumulativ 6 vollständig getestete, unveröffentlichte Aufgaben seit v0.1.54: NEXT-56, NEXT-57, NEXT-58, NEXT-59, NEXT-60, NEXT-61.**
- Draft-PR #47, Entwicklungsbranch automation/next-56-tournament-runner-unpublished; keine Veröffentlichung, kein Merge. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-59 vollständig abgeschlossen · 24.10.2026 · NICHT VERÖFFENTLICHT
- 16-Teilnehmer-Round-Robin (120 Paarungen) und K.-o.-Bracket mit SHA256-Golden-Referenzen charakterisiert, 30-Sekunden-CI-Grenze für den deterministischen Engine-Lauf geprüft.
- Desktop-/Mobil-E2E für 3/5/16 Teilnehmer, Freilose, Champion, Eingabefehler und Export vorhanden.
- Seed-Ableitung der K.-o.-Engine refaktoriert, nach Refactoring **Development Tests #40123058094 erfolgreich**: Unit/Behavior/Regression, Desktop/Mobile, TypeScript/Build und npm-Sicherheitsgate.
- Kumulativ vollständig getestete, unveröffentlichte NEXT-Aufgaben seit v0.1.54: **NEXT-56, NEXT-57, NEXT-58, NEXT-59, NEXT-61 (5)**. NEXT-60 bleibt offen.
- Entwicklungsbranch automation/next-56-tournament-runner-unpublished / Draft-PR #47; main und Homepage unverändert. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsrunde 24.10.2026 · NEXT-59 bis NEXT-61 · ohne Publishing
- Letztes verifiziertes Release v0.1.54; main unverändert; Entwicklungsbranch automation/next-56-tournament-runner-unpublished, Draft-PR #47.
- Aktuelle CI #40121383728 auf Commit 0a67a98d: **erfolgreich**; 27 Testdateien, 74 Desktop-/Mobile-E2E, TypeScript/Build grün, npm audit 0 bekannte Schwachstellen.
- NEXT-56: deterministischer Runner mit Pause/Resume/Cancel – vollständig, Tests grün, NICHT VERÖFFENTLICHT.
- NEXT-57: deterministisches K.-o.-Bracket und Freilose – vollständig, Tests grün, NICHT VERÖFFENTLICHT.
- NEXT-58: Archiv-Import/-Export und Wiederaufnahme – vollständig, Tests grün, NICHT VERÖFFENTLICHT.
- NEXT-59: K.-o.-Browseroberfläche mit Champion, Seeds, Freilosen, 3/5/16-Teilnehmer-E2E, ungültigen Eingaben und Desktop/Mobile ergänzt. CI grün; Referenz-Digests, Performance-Grenzen und Refactoring-Charakterisierung aus Akzeptanzkriterien noch offen; daher **NICHT vollständig abgeschlossen**.
- NEXT-60: deterministische paarweise Side-Swap-Bias-Simulation für 2/3/4/16 Teilnehmer, Seeds und Side-Zähler getestet. CI grün; explizite Bias-Grenzwerte, Referenz-Digests und Integration in echten Runner noch offen; daher **NICHT vollständig abgeschlossen**.
- NEXT-61: versionierte JSON-Tabellensnapshots, CSV-Export mit Unicode/Formel-Schutz und Browser-Downloads, 2/16 Teilnehmer, unvollständige Turniere – vollständig implementiert und getestet, **NICHT VERÖFFENTLICHT**.
- Kumulativ seit v0.1.54 **vier vollständig implementierte und verifizierte Aufgaben: NEXT-56, NEXT-57, NEXT-58, NEXT-61**. NEXT-59/60 zählen nicht.
- Keine Homepage-Aktualisierung, kein Merge, kein Release, kein publish.php. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

# RUN_STATE

## Entwicklungsrunde · 24.10.2026, 20:08 Europe/Berlin (ohne Publishing)
- Letztes verifiziertes Release: **v0.1.54**, Publish #40111747415, main 362f8bdb. main unverändert; Entwicklung ausschließlich auf `automation/next-56-tournament-runner-unpublished` / Draft-PR #47.
- **NEU verifiziert in dieser Runde:** NEXT-57 (K.-o.-Engine und Freilose) und NEXT-58 (Round-Robin-Archiv mit Import/Export, Wiederaufnahme und Browser-Regressionsfix). NEXT-56 erneut verifiziert.
- **Kumulativ vollständig implementiert, getestet und NICHT veröffentlicht seit v0.1.54: 3 Aufgaben: NEXT-56, NEXT-57, NEXT-58.** NEXT-59 und NEXT-60 bleiben wegen offener Akzeptanzkriterien ausdrücklich unvollständig.
- NEXT-56 · Serieller deterministischer Runner mit Pause/Resume/Cancel und unveränderlichen Ergebnissen. Teststatus: grün.
- NEXT-57 · Deterministisches K.-o.-Bracket für 2/3/5/8/16 Teilnehmer, Freilose und dokumentierter Tie-Break. Teststatus: grün (Engine/Regression); Browser-K.-o.-UI gehört zu NEXT-59/65.
- NEXT-58 · Validiertes JSON-Turnierarchiv, Fortsetzen ohne Doppelkämpfe, Import/Export im Browser, gültige Sonder-IDs und Ablehnung korrupter Dateien ohne Verlust des laufenden Turniers. Teststatus: grün (Unit/Behavior/Desktop/Mobile).
- NEXT-59 · TEILWEISE: 16-Teilnehmer-Engine-Integration und Round-Robin-Browser-E2E grün; K.-o.-Browser-E2E, deterministische Referenz-Digests und Performance-Dokumentation fehlen. Nicht als abgeschlossen zählen.
- NEXT-60 · TEILWEISE: Seed-/A/B-Audit und optionaler alternierender Spielplan als reine Funktionen vorhanden; quantifizierter Bias-Test und Integration/Abnahmekriterien fehlen. Nicht als abgeschlossen zählen.
- Sicherheitskorrektur: Vitest von 3.x auf 5.x aktualisiert; Audit der installierten Abhängigkeiten **0 bekannte Befunde** (zuvor 1 moderate/2 critical). CI prüft künftig Audit-Befunde; isolierter Workflow-Name `Development Tests` auf Entwicklungsbranch, main unverändert.
- Testlücke behoben: vier zuvor durch `vite.config.ts` ausgeschlossene `src/engine/**/*.test.ts`-Dateien sind jetzt Teil der echten Testmatrix. Archiv-Lebenszyklusvalidierung und Prototyp-Namenskollisionen im Fairness-Audit korrigiert, mit Regressionen abgesichert.
- **Letzter vollständiger grüner Qualitätslauf:** Development Tests #40119157124 und #40119160281 auf Code-SHA 8dc5633a: 335 Unit-/Behavior-/Regressionstests (26 Dateien), 68 Desktop-/Mobile-E2E, Typecheck, Build und npm-audit-Gate erfolgreich.
- Refactoring: Turnierarchiv-Statuskonsistenz zentral validiert; Browser-Vorschau verwendet nach Import die echte importierte Definition statt aus Presets rekonstruierten Daten; Fairness-Zähler ohne geerbte Prototypeigenschaften.
- Publish-Workflow-Runs, die GitHub automatisch nach CI erzeugte, waren **skipped**; kein Publish-Job, kein Merge, kein Deployment, kein publish.php-Aufruf.
- Nächster Schritt: NEXT-59 abschließen, NEXT-60 Audit/Fairness präzisieren; anschließend NEXT-61 Export-Tabelle. Rolling Backlog enthält NEXT-59 bis NEXT-65.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Veröffentlichung der Entwicklung nicht freigegeben.

## Vollständiger CI-Nachweis – 24.10.2026
- Commit e4449845: GitHub CI #40118045416 ERFOLGREICH; TypeScript, Build, 314 Unit-/Behavior-/Regressionstests, 66 Desktop-/Mobile-E2E bestanden.
- Behobene Regression: NEXT-55 erwartete bisherigen Fortschrittstext „0 / 1 Kämpfe abgeschlossen“; neue Laufstatusanzeige bewahrt diese Formulierung.
- Kumulativ seit v0.1.54 unveröffentlicht: NEXT-56, NEXT-57 sowie NEXT-58 (Round-Robin-Archiv und UI), NEXT-59 (16-Teilnehmer-Integrations- und Browser-E2E), NEXT-60 (Seed-/A/B-Audit). K.-o.-UI und vollständige Fairness-Simulation sind weitere Ausbaustufen.
- Sicherheitsgate: npm install meldet 3 Abhängigkeitsschwachstellen (1 moderate, 2 critical); genaue Paket-/Exploit-Bewertung und Abhilfe noch ausstehend. Deshalb **Publish-Reife nicht freigegeben**, trotz grüner funktionaler CI.
- NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.


## Entwicklungsfortsetzung – Turnieroberfläche und Browser-Regression
- NEXT-58: UI-Buttons für Nächster Kampf, Pause/Fortsetzen/Abbrechen, JSON-Export und Import mit Ergebnisfortschritt ergänzt.
- NEXT-59: Desktop-/Mobile-Playwright-Test für Turnierdurchlauf, Pause/Fortsetzen, Download/Upload und Tabellenstand ergänzt.
- NEXT-60: Fairness-Audit mit deterministischer A/B-Seiten- und Seed-Auswertung vorhanden.
- Verifikation der neuesten UI- und E2E-Commits läuft; Freigabe nur nach grünen Checks. npm-audit-Befunde müssen vor Publish-Reife separat eingeordnet werden.
- NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.


## Entwicklungsfortsetzung 24.10.2026 – NEXT-57 bis NEXT-60
- Letzter bestätigter Publish: v0.1.54. main und Homepage bleiben unverändert; Draft-PR #47.
- NEXT-56: bestätigt getestet, unveröffentlicht.
- NEXT-57: deterministisches K.-o.-Bracket, Freilose und Tie-Break; CI #40116730325 erfolgreich.
- NEXT-58: Turnierarchiv mit Schema-/Größen-/Fortschrittsprüfung und Wiederaufnahme implementiert; CI-Gesamtprüfung noch offen.
- NEXT-59: deterministische 16-Teilnehmer-/120-Matches-Integrationsregression implementiert; Browser-E2E und Statistik-UI noch offen.
- NEXT-60: Fairness-Audit mit A/B-Verteilung, Seed-Prüfung und optionalem Seitenwechsel implementiert; CI-Gesamtprüfung noch offen.
- Vorübergehende TypeScript-Fehler (unbenutzte Imports) korrigiert. Veröffentlichung erst nach allen grünen Gates und ausdrücklicher Nutzerfreigabe.
- Kumulativ sicher verifiziert unveröffentlicht: NEXT-56, NEXT-57. NEXT-58–60 erst nach grünem CI als abgeschlossen markieren.
- NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.


## Entwicklungsrunde · 24.10.2026, 18:56 Europe/Berlin (NEUER RELEASE-BASISSTAND)
- **Letzter verifizierter Publish: v0.1.54**. GitHub Publish #40111747415 auf main-Commit 362f8bdb10524f216b3be66e3d9dd1d120e26d46: Upload, Online-Verifikation und Deployment-Status erfolgreich (24.10.2026, 18:29 Europe/Berlin).
- Der alte Stand „13 unveröffentlichte Aufgaben seit v0.1.53“ ist HISTORISCH und wurde durch die erfolgreiche Veröffentlichung abgelöst; NEXT-40 und NEXT-44 bis NEXT-55 gehören zum veröffentlichten Release v0.1.54.
- Aktueller Entwicklungsbranch: automation/next-56-tournament-runner-unpublished; Draft-PR #47. main bleibt unverändert.
- NEXT-56: serieller deterministischer Runner mit immutable Ergebnis-Snapshots, Pause/Fortsetzen/Abbrechen an Matchgrenzen; Unit-/Behavior-/Performance-Tests für 2/4/16 Teilnehmer, Seeds und Timeout geschrieben.
- **Verifikation NEXT-56: CI #40113922862 auf Code-Commit 453f5ef5 erfolgreich** – 314 Unit-/Behavior-/Regressionstests, 64 Desktop-/Mobile-E2E, TypeScript und Build grün.
- Kumulativ seit letztem verifiziertem Release: **1 vollständig implementierte und getestete, unveröffentlichte Aufgabe: NEXT-56**.
- Nächster Schritt: CI prüfen, ggf. Fehler korrigieren; dann NEXT-57 K.-o.-Bracket, NEXT-58 Import/Export.
- Refactoring: Runner ist als reines, UI-unabhängiges Modul isoliert; Engine/Seed-Zuweisung bleibt unverändert. Vollständiger CI-Lauf #40114214478 auf HEAD 9115c0c1 nach Code-, Dokumentations- und E2E-Änderungen grün: 314 Unit-/Behavior-/Regressionstests, 64 Desktop-/Mobile-E2E, TypeScript und Build. Zwei vorübergehende E2E-Fehlläufe durch fest verdrahtete NEXT-56-Backlog-Beschriftung wurden durch generische NEXT-Nummernprüfung behoben; abschließender Test grün.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, kein Deployment, kein publish.php.

## Fortsetzung der Entwicklungsrunde · 24.10.2026, 18:12 Europe/Berlin
- NEU abgeschlossen: NEXT-55 · Responsiver Turnierplanungsdialog mit 2–16 Teilnehmern, Preset- und Namenswahl, validierten Seeds/Ticklimits, deterministischen Paarungen, Fortschritt 0/N und Punktetabelle.
- Verifiziert: Development Tests #40110813524 auf Code-SHA 9f17bc65: 303 Unit-/Behavior-/Regressionstests, 64 Desktop-/Mobile-E2E, Typecheck und Build erfolgreich.
- Testreview: zuerst TypeScript-Tupeltyp korrigiert; danach Browser-Regression wegen mehrdeutigem Seed-Label korrigiert. Vollständiger erneuter Testlauf grün.
- Refactoring/Isolation: Turnier-Vorschau verwendet reine Tournament-Engine-Module; keine Mutation von Sandbox-State oder Sandbox-RNG; dynamische Inhalte per textContent statt HTML-Injektion.
- Kumulativ 13 vollständig getestete NEXT-Aufgaben seit v0.1.53: NEXT-40, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55.
- Nächster Schritt: NEXT-56 · deterministischer serieller Turnier-Runner; NEXT-57 K.-o.-Bracket.
- Veröffentlichungsstatus extern nicht unabhängig bestätigt; bei manueller externer Veröffentlichung ohne GitHub-Merge: **Veröffentlichungsstatus ungeklärt**.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, kein Deployment, kein publish.php.


## Aktuelle Entwicklungsrunde · 24.10.2026, 18:00 Europe/Berlin
- branch: `automation/next-40-energy-reserve-unpublished`; PR #46 Draft, main bleibt bei b90c7448 / v0.1.53.
- completed_this_round: NEXT-54 (1 von maximal 3); NEXT-55/56 nicht begonnen.
- verified: #40109944097 auf Code-SHA 431ee335: 303 Unit-/Behavior-/Regressionstests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.
- functionality: immutable Result-Snapshots, 3/1/0-Punkte, Struktur-Differenz, stabile Rangfolge, unvollständige Tabellen; strenge Match-/Seed-/ID-/Werteprüfung.
- refactoring: Tabellenberechnung in reines, von UI/Simulation entkoppeltes Modul `src/engine/tournament-standings.ts` ausgelagert; vollständige Tests danach erfolgreich.
- current_next: NEXT-55 (responsives Turnier-UI), danach NEXT-56 (Runner).
- cumulative_unpublished: NEXT-40, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54 (12).
- final_documentation_head_ci: Development Tests #40110105950 auf Dokumentations-HEAD a6eb67d0 grün (303 Unit/Behavior, 60 Desktop/Mobile, Typecheck/Build).
- live_website_status: Veröffentlichung extern nicht unabhängig bestätigt; bei manueller Veröffentlichung ohne GitHub-Merge **Veröffentlichungsstatus ungeklärt**.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, kein Deployment, kein publish.php.


## Aktuelle Entwicklungsrunde · 24.10.2026, 17:00 Europe/Berlin
- branch: `automation/next-40-energy-reserve-unpublished`
- pull_request: #46 (Draft; NICHT MERGEN)
- main_sha: `b90c7448419a134cd5e764e1243dc04fd5958715` (per GitHub-Compare weiterhin unverändert)
- last_documented_verified_release: v0.1.53 (laut BACKLOG.md / PROJECT_STATE.md)
- live_website_check: nicht unabhängig bestätigt; bei externer manueller Veröffentlichung ohne GitHub-Merge **Veröffentlichungsstatus ungeklärt**
- package_version_on_branch: 0.1.54 (unveröffentlichter Release-Kandidat)
- current_next: NEXT-54 · Turnierauswertung
- round_completed: NEXT-51, NEXT-52, NEXT-53 (3 von maximal 3)
- round_status: ALLE DREI IMPLEMENTIERT UND VOLLSTÄNDIG GETESTET
- tests: Development Tests #40105284320 (Replay-Refactoring), #40105438397 (290 Unit/Behavior, 60 Desktop/Mobile), #40105486356 (297 Unit/Behavior, 60 Desktop/Mobile), jeweils Typecheck/Build erfolgreich
- deterministic_checks: Immutable-Snapshots; Turniermodell-Grenzen 2/16, IDs, Seeds und JSON-Roundtrip; Round Robin 2/3/4/16, Paarungsformel, Reihenfolge und Seeds bis MAX_SAFE_INTEGER
- refactoring: `deepFreeze` in eigenständiges reines Modul verschoben; Recorder-Runtime-Abhängigkeit in Replay-Format und State beseitigt; bestehende Recorder-API unverändert
- blocker: keiner für Entwicklung; finalen Testlauf nach Dokumentationsänderungen separat prüfen
- publishing: AUSDRÜCKLICH VERBOTEN. Kein Merge auf main, kein Publish/Deployment, kein Aufruf von publish.php.
- publish_workflow_on_main: reagiert weiterhin auf alten CI-Namen; kein Release-Workflow ausgelöst
- unrelated_prs: #5 und #8 nicht verändert

## Kumulative vollständig getestete, seit v0.1.53 nicht in main integrierte Aufgaben
| NEXT | Funktion | Nachweis | Status |
| --- | --- | --- | --- |
| 40 | Energiereserve A/B (0–100 %), Validierung, Schussfreigabe | Development Tests #40085113036 · 246 Unit/Behavior, 48 Desktop/Mobile | Implementiert, getestet, unveröffentlicht |
| 44 | Deterministischer Event Recorder und unveränderliche Snapshots | #40088595774 · 252 / 48 | Implementiert, getestet, unveröffentlicht |
| 45 | Versioniertes Replay-JSON und Schema-/Tick-/ID-Validierung | #40088913689 · 258 / 48 | Implementiert, getestet, unveröffentlicht |
| 46 | Replay-Import/-Export mit 2-MB-Grenze und Live-Isolation | #40092321506 · 262 / 50 | Implementiert, getestet, unveröffentlicht |
| 47 | Eventbasierter Replay-Player mit Play/Pause/Step/Reset | #40096610594 · 268 / 52 | Implementiert, getestet, unveröffentlicht |
| **48 – NEU** | Grafische Replay-Zeitleiste, Seek, Zustands-/Effektrekonstruktion | **#40100789839 · 274 / 56** | **Implementiert, getestet, unveröffentlicht** |
| **49 – NEU** | Kampfstatistiken A/B mit Deduplizierung und Überkill-Begrenzung | **#40100953952 · 281 / 58** | **Implementiert, getestet, unveröffentlicht** |
| **50 – NEU** | 48 Strategie-/Seed-Roundtrips, Hash-Digests, Import-Härtung | **#40101113261 · 284 / 60** | **Implementiert, getestet, unveröffentlicht** |

| **51 – NEU** | Replay-Refactoring: Immutable-Helper und Recorder-Entkopplung | #40105284320 · vollständige Development Tests | **Implementiert, getestet, unveröffentlicht** |
| **52 – NEU** | Validiertes, unveränderliches Turnierdatenmodell | #40105438397 · 290 Unit/Behavior, 60 Desktop/Mobile | **Implementiert, getestet, unveröffentlicht** |
| **53 – NEU** | Deterministischer Round-Robin-Spielplan und Seeds | #40105486356 · 297 Unit/Behavior, 60 Desktop/Mobile | **Implementiert, getestet, unveröffentlicht** |
| **54 – NEU** | Turnierauswertung, 3/1/0 Punkte, Reststruktur-Differenz, immutable Ergebnis-Snapshots | #40109944097 · 303 Unit/Behavior, 60 Desktop/Mobile | **Implementiert, getestet, unveröffentlicht** |
| **55 – NEU** | Responsiver Turnierplanungsdialog, 2–16 Teilnehmer, Presets, Paarungen, Fortschritt und Tabelle, Sandbox-Isolation | #40110813524 · 303 Unit/Behavior, 64 Desktop/Mobile | **Implementiert, getestet, unveröffentlicht** |

**Gesamtzahl vollständig getesteter, seit v0.1.53 nicht in main integrierter Aufgaben: 13.**
- NEXT-55 abgeschlossen; NEXT-56 bis NEXT-63 geplant, noch nicht implementiert.
- Veröffentlichung auf der externen Website konnte in diesem Lauf nicht unabhängig abgerufen werden; falls eine manuelle externe Veröffentlichung ohne GitHub-Merge erfolgt ist, ist deren Status **Veröffentlichungsstatus ungeklärt**.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Nächster Haltepunkt
1. Letzten vollständigen Development-Tests-Lauf auf dem aktuellen Dokumentations-HEAD prüfen; keine neue Aufgabe als getestet melden, bevor der Test grün ist.
2. Nächster Lauf: NEXT-54 Turnierauswertung; Fehler vor Features, maximal drei Aufgaben.
3. Rolling Backlog und Test-/Release-Dokumentation synchron halten; keine Homepage-Aktualisierung.
4. Keine anderen Automationen verändern; PR #46 bleibt Draft und main unverändert.
