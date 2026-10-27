## 27.10.2026 · 23 Uhr · NEXT-110 E22/E21/E23 IMPLEMENTIERT, CI NOCH NICHT BESTÄTIGT · NICHT VERÖFFENTLICHT
- **Vorprüfung:** Letzte vollständig bestätigte QA GitHub Actions #40584947368 SUCCESS auf isoliertem QA-Snapshot 001eda9763543312affdbb4e3ec74961e1f94a39, Git-Tree identisch mit vorherigem Entwicklungsstand 4d966ba0b083e3414a068cc3835eea0815b5b0b9: 540 Vitest + 32 Node + 240 Chromium/WebKit Desktop/Mobil = **812/812**; TypeScript, Security-Audit, reproduzierbarer Build, Browser- und Evidence-Gates PASS. Die CI belegt **NICHT** die neuen Änderungen E21/E22/E23. Letzte bestätigte LIVE-Version v0.1.61. NEXT-106/107/109 auf main (Merge 753b1a3953b4), jeweils **Veröffentlichungsstatus ungeklärt**. NEXT-110 gesamt OFFEN, NEXT-79e reale Accessibility-Abnahme OFFEN.
- **3/3 Arbeitspakete auf drei isolierten Task-Branches implementiert und zurückgelesen; 0/3 neu vollständig CI-bestätigt.** Reihenfolge: (1) **NEXT-110-E22 KRITISCHER FIX:** In `e2e/next110-v2-120-browser.spec.ts` hatte ein literales `\\n` in einem `//`-Kommentar die nachfolgende `test.setTimeout`-Anweisung versehentlich auskommentiert. Jetzt tatsächliche 180s-WebKit-/120s-Chromium-Testbudgets mit Testannotation. Branch `feature/NEXT-110-E22-webkit-timeout-fix`, Commit 3d474688ebe2, Draft-PR #100. Akzeptanz: 120-Kampf-Archivtest auf Desktop-/iPhone-WebKit ohne Flakiness; Test: `npx playwright test e2e/next110-v2-120-browser.spec.ts --project=desktop-webkit --project=mobile-webkit`; Abhängigkeit E19.
- (2) **NEXT-110-E21:** Wiederholter fehlerhafter v2-Replay-Import (kaputtes JSON, gefälschter Gewinner) muss geladenes Replay, Cursor, Ergebnis, Statistiken, Slider unverändert lassen; nachfolgender gültiger Import muss vollständig funktionieren und Sandbox unverändert bleiben. Datei `e2e/next110-v2-cross-browser.spec.ts`, Branch `feature/NEXT-110-E21-replay-import-recovery`, Commit 2d7c26612bff, Draft-PR #101. Akzeptanz: Chromium/WebKit Desktop/Mobil grün; Test: `npx playwright test e2e/next110-v2-cross-browser.spec.ts`; Abhängigkeit E18/E22.
- (3) **NEXT-110-E23:** Gemeinsame Testhilfe `expectRejectedMutations` für Null-Tick-/Double-KO-Manipulation mit Byte-Stabilitätsprüfung des kanonischen Replays; vorhandene v1-Kompatibilitätsprüfungen bleiben. Datei `tests/next110-replay-v2.test.ts`, Branch `feature/NEXT-110-E23-replay-tamper-helper`, Commit 34d699c663d3, Draft-PR #102. Akzeptanz: alle v1/v2-, Determinismus-, Manipulations- und Browserregressionen grün; Tests: `npx vitest run tests/next110-replay-v2.test.ts && npx playwright test e2e/next110-v2-cross-browser.spec.ts`; Abhängigkeit E20/E21.
- **Refactoring:** gemeinsame Tamper-Assertion statt zweier kopierter Schleifen; produktive Engine/RNG/v1-Regeln unverändert. Alle drei Task-Commits sind auf Entwicklungsbranch fast-forward integriert, **kein Merge nach main**. CI für neuen Quellcode und nachfolgende Dokumentations-HEADs ist noch ausstehend; keine neuen Aufgaben als abgeschlossen zählen.
- **Kumulativ seit v0.1.61 fertig implementiert und getestet, nicht live bestätigt:** NEXT-106 (Evidence-Gate, 733/733), NEXT-107 (Startseiten-Balance/Replay-Import, 736/736), NEXT-109 (Erstschussdiagnose, 739/739) auf main, jeweils **Veröffentlichungsstatus ungeklärt**; **18 testbestätigte NEXT-110-Unterpakete E1/E2/E5–E20** auf Entwicklungszweigen, **nicht live**. E3/E4 nicht separat belegt. **Gesamt 21 getestete Einheiten; 0 neu testbestätigt**. E21/E22/E23 implementiert, CI offen, nicht mitzählen.
- **Rolling Backlog:** P0 vollständige isolierte QA-CI für E21/E22/E23 einschließlich Chromium/WebKit Desktop/Mobil, Typecheck, Security-Audit, reproduzierbarem Build und Evidence-Gates; bei Fehlern reparieren und erneut prüfen. P1 NEXT-110-E24: wiederholte ungültige Turnierarchiv-Importe + gültige Wiederherstellung (Datei `e2e/next110-v2-120-browser.spec.ts`; Akzeptanz unverändertes Turnier/Export/Sandbox, danach gültiger Import; Test `npx playwright test e2e/next110-v2-120-browser.spec.ts`; Abhängigkeit E12/E16). P1 NEXT-110-E25: 120-Kampf-WebKit-Performance-Evidenz und reproduzierbare Timeout-Fehlerdiagnose (Datei `e2e/next110-v2-120-browser.spec.ts`; Test `npx playwright test e2e/next110-v2-120-browser.spec.ts --project=desktop-webkit --project=mobile-webkit`; Abhängigkeit E22). P2 NEXT-110-E26: v1/v2-Fixture-Konsolidierung mit deterministischer Regression (Datei `tests/next110-replay-v2.test.ts`; Test `npx vitest run tests/next110-replay-v2.test.ts`; Abhängigkeit E23). P0 NEXT-79e echte NVDA/VoiceOver/Touch/Kontrast-Abnahme; P2 NEXT-108 CI-Provenienz-Gate.
- **Sicherheitsgrenze:** Task-PRs #100–#102 und QA-PR #96 Draft; QA-PR NIEMALS MERGEN. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein publish.php, keine Homepage, keine Release-Workflows, kein Release-Commit, kein Deployment, kein main-Merge und keine anderen Automationen verändert.

## 27.10.2026 · 22:15 Uhr · NEXT-110 E18/E19/E20 QUELLCODE-QA GRÜN 812/812 · Dokumentations-CI ausstehend · NICHT VERÖFFENTLICHT
- **Exakte QA-Evidenz:** GitHub Actions Development Tests #40583891349 SUCCESS auf isoliertem, nicht zu mergendem QA-Snapshot c0f48ca31d0b1b511066f4040540a8f328143380: **540/540 Vitest Unit/Behavior/Regression/Determinismus + 32/32 Node + 240/240 Playwright = 812/812**; Browserprojekte 101 Desktop-Chromium, 101 Mobil-Chromium, 19 Desktop-WebKit, 19 iPhone-WebKit. TypeScript, Security-Audit, reproduzierbarer Build, Browser-Release-Gate und Evidence-Gate PASS; 0 flaky/unexpected. Vorherige QA #40583602916 scheiterte an TS1005 (fehlende schließende ] im WebKit testMatch), auf E19/E20-Branches korrigiert; #40583818291 bereits 812/812 SUCCESS; #40583891349 zusätzlich mit strenger E18-Importablehnungs-Assertion SUCCESS.
- **3/3 NEU implementiert und QUELLCODE-QA-BESTÄTIGT:** NEXT-110-E18: ungültiger v2-Import lässt geladenes Double-KO-Replay, Cursor, Statistiken, Ergebnis und Sandbox unverändert (e2e/next110-v2-cross-browser.spec.ts; Draft-PR #97; Commits 99c959fa56e3 und 48b0ff921340). NEXT-110-E19: 120-Kampf-Archivimport/Manipulationsabwehr/Replay nun zusätzlich auf WebKit Desktop/iPhone (playwright.config.ts, e2e/next110-v2-120-browser.spec.ts; Draft-PR #98; Commits e78c6f69d9e2, 5a4770ce6c47, TS1005-Fix 8a32f5e543ea). NEXT-110-E20: gemeinsame Double-KO-Fixture statt Testduplikation und zusätzlicher Byte-Stabilitäts-/v1-Isolationstest (tests/next110-replay-v2.test.ts; Draft-PR #99; Commit 75b1021ac147). Alle Änderungen auf eigenen Task-Branches und QA-Snapshot verifiziert, keine Produktivengine-/RNG-/v1-Änderung.
- **Kumulativ seit letzter bestätigter Live-Version v0.1.61:** NEXT-106 (Evidence-Gate, 733/733), NEXT-107 (Startseiten-Balance/Replay-Import, 736/736), NEXT-109 (Erstschussdiagnose, 739/739) auf main, jeweils **Veröffentlichungsstatus ungeklärt**. Dazu **18 testbestätigte NEXT-110-Unterpakete E1/E2/E5–E20** auf Entwicklungszweigen, nicht live. E3/E4 nicht separat belegt. **Gesamt 3 NEXT-Hauptaufgaben + 18 NEXT-110-Unterpakete = 21 getestete Einheiten; 3 NEU testbestätigt.** NEXT-110 Gesamtaufgabe weiterhin OFFEN.
- **Rolling Backlog:** P0 Dokumentations-HEAD nach QA erneut vollständig testen und bei Bedarf korrigieren; P1 NEXT-110-E21: Mehrfach fehlgeschlagene Replay-Importe und anschließender gültiger Import, keine Zustandskorruption (e2e/next110-v2-cross-browser.spec.ts; npx playwright test e2e/next110-v2-cross-browser.spec.ts; Abhängigkeit E18); P1 NEXT-110-E22: WebKit-120-Kampf-Stabilität mit expliziten Budget-/Fehlerrückmeldungen und Browser-Matrix ohne Flakiness (e2e/next110-v2-120-browser.spec.ts, playwright.config.ts; npx playwright test e2e/next110-v2-120-browser.spec.ts --project=desktop-webkit --project=mobile-webkit; Abhängigkeit E19); P2 NEXT-110-E23: gemeinsame Fixture-/Tamper-Hilfen refaktorieren, v1/v2-Verhaltens-/Determinismusregression wiederholen (tests/next110-replay-v2.test.ts; npx vitest run tests/next110-replay-v2.test.ts; Abhängigkeit E20); P0 NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme; P2 NEXT-108 CI-Provenienz-Gate.
- **Sicherheitsgrenze:** Alle Task-PRs #97–#99 und QA-PR #96 bleiben Draft, QA-PR NIEMALS MERGEN. Letzte bestätigte LIVE v0.1.61, NEXT-106/107/109 auf main nach PR #94, Live-Status ungeklärt. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein publish.php, kein Release-Workflow, kein Release-Commit, kein Deployment, keine Homepage-Aktualisierung, keine anderen Automationen verändert.

## 27.10.2026 · 22:10 Uhr · NEXT-110 E18/E19/E20 auf getrennten Task-Branches implementiert · QA LÄUFT · NICHT VERÖFFENTLICHT
- **Vorprüfung:** Letzte vollständige QA #40574859540 SUCCESS auf QA-Dokumentationsstand (805/805; 539 Vitest, 32 Node, 234 Chromium/WebKit); v0.1.61 bleibt letzte bestätigte LIVE-Version. NEXT-106 (Evidence-Gate, 733/733), NEXT-107 (Startseiten-Balance/Replay-Import, 736/736), NEXT-109 (Erstschussdiagnose, 739/739) sind auf main via Merge 753b1a3953b4; Veröffentlichungsstatus ungeklärt. PR #93/#95/#96 Draft, PR #94 gemergt. Entwicklungs-HEAD vor Runde cc04c3fb22c2.
- **Paket 1 NEXT-110-E18 IMPLEMENTIERT, NICHT TESTBESTÄTIGT:** Ungültiger v2-Replay-Import nach geladenem und abgespieltem gültigem Double-KO-Replay darf Fortschritt, Ergebnis, Statistiken, Zeitleiste und Sandbox nicht verändern; danach muss Replay-Anfang funktionieren. Datei e2e/next110-v2-cross-browser.spec.ts, Branch feature/NEXT-110-E18-replay-import-isolation, Commit 99c959fa56e3, Draft-PR #97. Akzeptanz: unveränderte Werte und korrekte Fehlerrückmeldung auf Chromium/WebKit Desktop/Mobil. Test: npx playwright test e2e/next110-v2-cross-browser.spec.ts. Abhängigkeit: E8/E14.
- **Paket 2 NEXT-110-E19 IMPLEMENTIERT, NICHT TESTBESTÄTIGT:** Vollständigen 16-Roboter-/120-Kampf-v2-Browser-Export, Reload, Import, Archiv-Manipulationsabwehr und Replay auch in Desktop-WebKit/iPhone-WebKit ausführen; explizite 180s-Gesamttest- und 120s-Fortschrittsbudgets nur für WebKit. Dateien playwright.config.ts, e2e/next110-v2-120-browser.spec.ts, Branch feature/NEXT-110-E19-webkit-120-archive, Commits e78c6f69d9e2/5a4770ce6c47, Draft-PR #98. Akzeptanz: WebKit-Matrix PASS ohne Flakiness, Archiv unverändert. Test: npx playwright test e2e/next110-v2-120-browser.spec.ts --project=desktop-webkit --project=mobile-webkit. Abhängigkeit: E6/E12/E16, E18-Snapshot.
- **Paket 3 NEXT-110-E20 IMPLEMENTIERT, NICHT TESTBESTÄTIGT:** Duplizierte Double-KO-Testfixtures in E9/E15 durch gemeinsame deterministic Fixture ersetzen; neuen Regressionstest für Byte-Stabilität, rekonstruierten Endzustand und v1-Parserisolation hinzufügen. Datei tests/next110-replay-v2.test.ts, Branch feature/NEXT-110-E20-double-ko-fixture-refactor, Commit 75b1021ac147, Draft-PR #99. Akzeptanz: unveränderte E9/E15-Assertions, zusätzlicher Test PASS, v1 unverändert. Tests: npx vitest run tests/next110-replay-v2.test.ts && npx playwright test e2e/next110-v2-cross-browser.spec.ts. Abhängigkeit: E9/E15, E19-Snapshot. Kein Produktionscode verändert.
- **QA:** Vollständiger isolierter, niemals zu mergender QA-Snapshot von E18–E20 auf PR #96, SHA 93e96d04026f; GitHub Actions #40583602916 in_progress. Erst nach SUCCESS auf exakt diesem Quellcode-HEAD E18/E19/E20 als fertig zählen; bei Fehlern reparieren und erneut testen. 3/3 Pakete implementiert, 0/3 neu CI-bestätigt.
- **Kumulativ seit bestätigter Live v0.1.61:** 3 vollständig getestete NEXT-Hauptaufgaben NEXT-106/107/109 auf main (je Veröffentlichungsstatus ungeklärt) + 15 QA-bestätigte NEXT-110-Unterpakete E1/E2/E5–E17 auf Entwicklungszweigen (nicht live) = **18 getestete Einheiten**, davon 0 neu testbestätigt. E3/E4 nicht separat belegt. E18/E19/E20 noch nicht mitzählen; NEXT-110 gesamt OFFEN.
- **Rolling Backlog:** P0 neue QA #40583602916 bis zum Endstatus prüfen, bei Fehlschlägen konkrete Regression korrigieren und alle Tests wiederholen; P1 E21 v2 Replay-Import-Fehlerzustand nach mehrfachen Manipulationen und anschließend gültigem Import; P1 E22 WebKit 120-Kampf-Timeout/Flakiness prüfen und gegebenenfalls Test in kleine Browserphasen zerlegen; P2 E23 Fixture-Konsolidierung mit unveränderten v1-Behavior-/Determinismus-Tests; P0 NEXT-79e echte NVDA/VoiceOver-/Touch-/Kontrastabnahme; P2 NEXT-108 Commit-/Artefakt-Provenienz-Gate.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Alle Task-PRs und QA-PR #96 bleiben Draft; keine Merges nach main, kein publish.php, kein Deployment, kein Release-Workflow, keine Homepage-Aktualisierung, keine anderen Automationen verändert.

## 27.10.2026 · 21:05 Uhr · NEXT-110 E12–E17 QUELLCODE-QA GRÜN 805/805 · finale Dokumentations-CI läuft · NICHT VERÖFFENTLICHT
- **Neue vollständige QA-Bestätigung:** Isolierter, ausdrücklich nicht zu mergender Draft-QA-PR #96, GitHub Actions Development Tests #40573988436 SUCCESS auf exaktem QA-Quellcode-HEAD 5c5adf7cebb78599ea78ddc840634c487dfe2024: **539/539 Vitest + 32/32 Node + 234/234 Chromium/WebKit Desktop/Mobil = 805/805**, TypeScript, Security-Audit, reproduzierbarer Build, Browser-Gate und integriertes Evidence-Gate PASS. Browserprojekte: 100 Desktop-Chromium, 100 Mobil-Chromium, 17 Desktop-WebKit, 17 Mobil-WebKit; 0 flaky/unerwartete Tests. Die letzte CI auf dem dokumentierten QA-HEAD 699f0bec44d18f4a8c2512c76f13beb03602ecd0 ist noch in Arbeit und darf nicht vorzeitig als grün gelten. Frühere CI #40573893936 war ebenfalls SUCCESS mit 804/804 vor E16/E17.
- **Drei Pakete dieser Runde jetzt QUELLCODE-QA-BESTÄTIGT:** (1) CI-Blockade durch isolierten QA-Snapshot/PR #96 gelöst; (2) NEXT-110-E16 120-Kampf-Archiv-Seedmanipulation und Browserzustands-Isolation bestanden; (3) NEXT-110-E17 ReplayPlayer-Null-Tick-/Seek-/Reset-Grenzfälle bestanden. Zusätzlich **NEXT-110-E12 (inkl. E12-F1), E13, E14, E15 NEU durch CI bestätigt**. Alle Testdateien wurden nach Commit zurückgelesen; Produktionssimulation/RNG/v1 unverändert.
- **Kumulativ seit letzter bestätigter Live-Version v0.1.61 fertig implementiert/getestet, NICHT LIVE BESTÄTIGT:** NEXT-106 Evidence-Gate 733/733, NEXT-107 Startseiten-/Replay-Importfix 736/736, NEXT-109 Erstschussdiagnose 739/739: auf main, jeweils **Veröffentlichungsstatus ungeklärt**. Zusätzlich **15 NEXT-110-Unterpakete** E1/E2/E5–E17 auf Entwicklungsbranch, vollständig QA-bestätigt (zuletzt 805/805); E3/E4 nicht separat belegt. **Gesamt 3 NEXT-Hauptaufgaben + 15 NEXT-110-Unterpakete = 18 bestätigte Einheiten; 6 Unterpakete E12–E17 NEU bestätigt.** NEXT-110 als Gesamtaufgabe bleibt OFFEN.
- **Rolling Backlog:** P0 finale Dokumentations-CI auf aktuellem QA-HEAD und anschließend finalem Status-HEAD bestätigen; P1 E18 Browser-Replay-Fehlimport mit bestehendem gültigem Replay, Zustand unverändert, Datei e2e/next110-v2-cross-browser.spec.ts, Test npx playwright test e2e/next110-v2-cross-browser.spec.ts, Abhängigkeit E8/E14; P1 E19 120-Kampf-Archiv-Import WebKit Desktop/iPhone mit begrenztem Zeitbudget, Datei e2e/next110-v2-120-browser.spec.ts plus playwright.config.ts, Test npx playwright test e2e/next110-v2-120-browser.spec.ts --project=desktop-webkit --project=mobile-webkit, Abhängigkeit E6/E12/E16; P1 E20 gemeinsame Double-KO-Fixture-/Tamper-Testhilfe refaktorieren, Dateien tests/next110-replay-v2.test.ts und e2e/next110-v2-cross-browser.spec.ts, Tests npx vitest run tests/next110-replay-v2.test.ts && npx playwright test e2e/next110-v2-cross-browser.spec.ts, Abhängigkeit E9/E15; P0 NEXT-79e reale NVDA/VoiceOver/Touch/Kontrast-Abnahme, P2 NEXT-108 Provenienz-Gate.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** PR #93 und QA-PR #95/#96 bleiben Draft. Kein main-Merge, Release, publish.php, Homepage-Update, Deployment oder Änderungen anderer Automationen.

## 27.10.2026 · 21:00 Uhr · 3 kleine Pakete umgesetzt, isolierte QA-CI gestartet · NO PUBLISH
- **GitHub vor Beginn:** main mit NEXT-106/107/109 durch Merge 753b1a3953b4; letzte bestätigte LIVE v0.1.61, Homepage-Status für NEXT-106/107/109 ungeklärt. NEXT-110 Draft PR #93 (Branch feature/NEXT-110-versioned-simultaneous-rules-unpublished), alter QA-PR #95 konflikthaft. Letzte erfolgreiche vollständige NEXT-110-CI #40549069814: 798/798 (536 Vitest, 32 Node, 230 Chromium/WebKit Desktop/Mobil); diese CI deckt E12–E17 NICHT ab. Auf Entwicklungs-HEAD f99ed55e gab es keine neue CI, weil CI nur pull_request gegen main oder push main auslöst.
- **Paket 1, CI-Blockade gelöst (TESTAUSFÜHRUNG ANGESTOSSEN, NICHT ABGESCHLOSSEN):** Isolierter QA-Snapshot auf neuem Branch qa/NEXT-110-v2-ci-only-20261027; Draft PR #96 gegen main ist mergebar, aber AUSDRÜCKLICH NICHT MERGEN. Start-Commit 2c648d41073b; CI #40573893936 wurde gestartet (zum Prüfzeitpunkt in_progress). Danach QA-Snapshot mit E16/E17 auf 5c5adf7cebb7 aktualisiert. Betroffene Git-Objekte: QA-Branch, Draft-PR #96; Akzeptanz: erfolgreiche vollständige Actions-CI auf exaktem finalem SHA, alle Qualitäts-/Browser-/Evidence-Gates grün; Test: Development Tests GitHub Actions auf PR #96; Abhängigkeit: NEXT-110-E12-F1/E13/E14/E15. Kein main-Merge, kein Deployment.
- **Paket 2, NEXT-110-E16 NEU (IMPLEMENTIERT, NICHT TESTBESTÄTIGT):** Dritter realer Browser-Manipulationsfall im abgeschlossenen 120-Kampf-v2-Archiv: gefälschter Seed bei gültiger Match-ID. Nach Ablehnung müssen Turnierfortschritt, Archivexport, 120 Paarungen und Sandbox unverändert bleiben. Datei e2e/next110-v2-120-browser.spec.ts; Commit c7f48056b1b5, GitHub-Readback OK. Akzeptanz: alle drei Manipulationsfälle werden in Desktop- und Mobil-Chromium abgewiesen, Zustand byteidentisch; Test: npx playwright test e2e/next110-v2-120-browser.spec.ts --project=desktop-chromium --project=mobile-chromium; Abhängigkeit: E6/E12/E12-F1.
- **Paket 3, NEXT-110-E17 NEU (IMPLEMENTIERT, NICHT TESTBESTÄTIGT):** ReplayPlayer-Null-Tick-Regressionsfall für terminales Timeout, unveränderlichen Snapshot, abgewiesene ungültige Seek-Werte, play/step/advance sowie 1-Tick-Reset. Datei tests/next110-replay-v2.test.ts; Commit 6eac6cf1a1e1, GitHub-Readback OK. Akzeptanz: Null-Tick-Player bleibt terminal, invalid seek mutiert nicht, 1-Tick-Player ist deterministisch und resetbar; Test: npx vitest run tests/next110-replay-v2.test.ts; Abhängigkeit: E13/E15 und ReplayPlayer. Refactoring: vorhandene Fixtures und unveränderliche Zustandsvergleiche wiederverwendet, keine Produktivcode-/RNG-/v1-Änderung.
- **Ergebnis:** 3/3 Arbeitspakete tatsächlich bearbeitet, 0/3 auf aktuellem SHA abschließend CI-bestätigt; keine Scheinabschlüsse. QA-PR #96 bleibt DRAFT/TEST-ONLY. Entwicklungs-HEAD 6eac6cf1a1e1 (vor Dokumentationsänderungen), QA-Snapshot 5c5adf7cebb7. Dokumentation wird nur auf Entwicklungsbranch aktualisiert; QA-Snapshot für finale Dokumentations-CI anschließend neu abgleichen.
- **KUMULATIV seit letzter bestätigter LIVE v0.1.61 vollständig implementiert/getestet, nicht live bestätigt:** NEXT-106 Evidence-Gate (733/733, main, Veröffentlichungsstatus ungeklärt); NEXT-107 Spiegel-/Replay-Importfix (736/736, main, Veröffentlichungsstatus ungeklärt); NEXT-109 Erstschussdiagnose (739/739, main, Veröffentlichungsstatus ungeklärt); NEXT-110-E1 v2-Replayformat, E2 Replay-Player, E5 Statistik/Ergebnis, E6 120-Kampf-Stress, E7 Archiv-Manipulation, E8 Double-KO-Browser, E9 Double-KO-Tamper, E10 60/120-Archiv-Matrix, E11 Tastatur/ARIA (9 Unteraufgaben, gemeinsam 798/798 auf älterem CI-Stand, nur Entwicklungsbranch, NICHT LIVE). **Gesamt: 3 NEXT-Hauptaufgaben + 9 verifizierte NEXT-110-Unteraufgaben; 0 NEU testbestätigt.** E12/E13/E14/E15/E16/E17 bleiben CI-offen; NEXT-110 gesamt OFFEN. E3/E4 nicht eigenständig belegt.
- **Rolling Backlog:** P0 PR #96 CI auf FINALEN SHA inklusive E12-F1/E13–E17 kontrollieren und etwaige Fehler reparieren; P1 E18 Replay-Fehlimport mit bestehendem gültigem Replay im Browser und Sandbox-Isolation; P1 E19 v2-Archiv-Import in WebKit Desktop/iPhone für 120 Kämpfe mit Timeout-Budget; P1 E20 gemeinsame Testfixture-/Mutationshilfe refaktorieren und gesamte Matrix erneut laufen lassen; P0 NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrast-Hardwareabnahme; P2 NEXT-108 CI-SHA-/Artefaktprovenienz.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein publish.php, keine Homepage, kein Release-Workflow, kein Release-Commit, kein Deployment, kein main-Merge, keine Änderungen anderer Automationen.

## 27.10.2026 · 20:03 Uhr · E12 Browser-CI-Fehler analysiert und korrigiert; E14/E15 neu implementiert · CI AUSSTEHEND · NICHT VERÖFFENTLICHT
- **GitHub-Stand:** PR #94 wurde am 27.10.2026 18:37 UTC (19:37 Uhr MEZ) nach main gemergt, Merge 753b1a3953b4c5f6bfd7537b2213cf02961d50e5. NEXT-106/107/109 sind damit auf main; Live-Veröffentlichungsstatus ungeklärt. Letzte bestätigte Live-Version v0.1.61. NEXT-110 PR #93 und reine QA-PR #95 bleiben DRAFT; KEIN Merge/Deployment.
- **3 Pakete dieser Runde (seriell, IMPLEMENTIERT, CI NOCH NICHT BESTÄTIGT):** (1) NEXT-110-E12-F1: CI-Fehler der E12-120-Kampf-Browserabnahme korrigiert. CI #40555379454 und #40555494534 waren FAILED: 228/230 Browser erfolgreich, 2/230 fehlgeschlagen (Desktop-/Mobil-Chromium), weil der Test die tatsächlich korrekte Import-Fehlermeldung „Turnierergebnis: Teilnehmer oder Seed passen nicht zum Spielplan“ nicht als Ablehnung akzeptierte. E12-Test prüft weiterhin unveränderten Turnierfortschritt, Export und Sandbox. Datei e2e/next110-v2-120-browser.spec.ts; Akzeptanz: beide manipulierten 120-Kampf-Archive werden abgewiesen und Zustand bleibt unverändert; Test: npx playwright test e2e/next110-v2-120-browser.spec.ts --project=desktop-chromium --project=mobile-chromium; Abhängigkeit: E6/E12. Commit 41cc1abe6b7a.
- (2) NEXT-110-E14 NEU: Double-KO-Replay-Zeitleiste via Tastatur Home/End und Pfeiltasten; prüft Endergebnis, Statistik beider Roboter, Replay-Fortschritt und Sandbox-Isolation. Datei e2e/next110-v2-cross-browser.spec.ts; Akzeptanz: Chromium/WebKit Desktop/Mobil, keine ungewollten Sandboxänderungen; Test: npx playwright test e2e/next110-v2-cross-browser.spec.ts; Abhängigkeit: E8/E11. Commit d565123f7170.
- (3) NEXT-110-E15 NEU: 6 verschachtelte Double-KO-Replay-Manipulationen (Arena, IDs, Startzustand, Event-Reihenfolge, Extra-Draw, Endzustand), Immutable-/Determinismus-Roundtrip und v1-Kompatibilität. Datei tests/next110-replay-v2.test.ts; Akzeptanz: alle sechs manipulierten Replays abgelehnt, gültige v2-Rekonstruktion deterministisch und eingefroren, v1 unverändert; Test: npx vitest run tests/next110-replay-v2.test.ts; Abhängigkeit: E9/E13. Commit 166a6eea157d.
- **Tests/Refactoring:** Für den früheren E12/E13-Stand waren Unit, Typecheck, Audit und reproduzierbarer Build erfolgreich, Browser 228/230, Gesamt-CI FAILED. Nach E12-F1/E14/E15 ist vollständige CI noch nicht bestätigt. Beste bestätigte vollständige NEXT-110-CI bleibt #40549069814 (798/798, E1/E2 und E5–E11). Gemeinsame vorhandene mutate()-Testhilfe wiederverwendet; keine produktiven Engine-/RNG-/v1-Änderungen. Keine ungetesteten Änderungen als abgeschlossen zählen.
- **Kumulativ fertig/getestet, seit letzter bestätigter Live-Version v0.1.61 NICHT LIVE BESTÄTIGT:** 3 NEXT-Hauptaufgaben: NEXT-106 (Evidence-Gate, 733/733), NEXT-107 (Startseiten-/Replay-Importfix, 736/736), NEXT-109 (Erstschussdiagnose, 739/739); alle drei jetzt auf main, Veröffentlichungsstatus ungeklärt. Zusätzlich 9 geprüfte NEXT-110-Unterpakete E1/E2/E5/E6/E7/E8/E9/E10/E11 (798/798); unveröffentlicht auf Entwicklungsbranch. E3/E4 nicht separat belegt. E12/E13/E14/E15 und E12-F1 bleiben bis erfolgreicher CI offen; NEXT-110 insgesamt offen.
- **Rolling Backlog:** P0 vollständige CI auf E12-F1/E14/E15 prüfen, Fehler reparieren, Browsermatrix/Evidence-Gate erneut bestätigen. P1 E12/E13 dann endgültig abnehmen; P1 E14/E15 bestätigen und bei Bedarf refaktorieren. P0 NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme (Hardware nötig). P2 NEXT-108 GitHub-SHA-/Artefakt-Provenienz. Keine zusätzlichen Änderungen auf main.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Keine Homepage-Aktualisierung, kein publish.php, kein Release-Workflow, kein Release-Commit, kein Deployment, kein main-Merge in dieser Entwicklungsrunde; andere Automationen unverändert.

## 27.10.2026 · 18:56 Uhr · NEXT-110 E12/E13 implementiert, finale CI AUSSTEHEND · NICHT VERÖFFENTLICHT
- Runde 3/3 Pakete: (1) CI #40549069814 auf vorherigem Dokumentations-HEAD 9107b452 SUCCESS, Qualität/Browser-/Evidence-Gates PASS; (2) NEXT-110-E12: zwei manipulierte 120-Kampf-Archive (Fortschritt und doppelte Spiel-ID) werden im echten Browser importiert und müssen abgewiesen werden, ohne laufendes Turnier, Export oder Sandbox zu verändern; (3) NEXT-110-E13: sechs manipulierte Null-Tick-v2-Replays müssen scheitern, gültiger v2-Replay und v1-Format unverändert. E12 in e2e/next110-v2-120-browser.spec.ts (Chromium Desktop/Mobil, npx playwright test e2e/next110-v2-120-browser.spec.ts); E13 in tests/next110-replay-v2.test.ts (npx vitest run tests/next110-replay-v2.test.ts). Abhängigkeit E1–E11. Beide NEU IMPLEMENTIERT, aber NICHT ALS ABGESCHLOSSEN ZÄHLEN, bevor CI auf Quellcode-HEAD 78a03dfebb9f934295618c6dae4f9b958841d311 und dem Dokumentations-HEAD grün ist. CI #40555379454 läuft. Keine produktive Engine-/RNG-/v1-Änderung; Refactoring: gemeinsame strukturierte Mutationsfälle statt duplizierter Testlogik. Rolling Backlog: P0 E12/E13 CI prüfen und Fehler beheben, P1 E14 v2 Double-KO-Statistik-/Keyboard-Grenzfälle, P0 NEXT-79e reale NVDA-/VoiceOver-/Touch-/Kontrastabnahme, P2 NEXT-108 SHA-/Artefakt-Provenienz. Kumulativ seit bestätigtem Live v0.1.61: 3 fertig getestete NEXT-Hauptaufgaben: NEXT-106 (733/733, auf main, Veröffentlichungsstatus ungeklärt), NEXT-107 (736/736, PR #94), NEXT-109 (739/739, PR #94). Außerdem 9 verifizierte NEXT-110-Unterpakete E1/E2 und E5–E11; E12/E13 pending, NEXT-110 Gesamtaufgabe offen. NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell. PR #93 und #95 Draft, kein main-Merge/Release/Deployment/publish.php/Homepage-Update; andere Automationen unverändert.

## 27.10.2026 · 18:09 Uhr · NEXT-110 E7–E11 QUELLCODE-QA GRÜN 798/798 · NICHT VERÖFFENTLICHT
- **GitHub Actions [#40546834016](https://github.com/VOWIKRON/robot-arena/actions/runs/40546834016) SUCCESS** auf exakt `accc126420743ddd9cf63a479023b57bde8a8288`: **536/536 Vitest** (Unit/Behavior/Regression/Determinismus), **32/32 Node-Integration**, **230/230 Playwright** (Chromium/WebKit Desktop/Mobil) = **798/798**. Typecheck, Audit (0 Advisories), reproduzierbarer Build, Browser-Gate und NEXT-106 Evidence-Gate PASS. Das ist der letzte **Quellcode-/Dokumentations-HEAD vor diesem neuen reinen Ergebnisdokumentations-Commit**; nachfolgende Dokumentations-CI ggf. erneut abwarten.
- **Drei Arbeitspakete der 18-Uhr-Runde:** (1) **E7–E9 QA-Blockade behoben und alle drei früher implementierten Testpakete jetzt verifiziert**; (2) **E10 NEU vollständig implementiert und getestet:** 11 Manipulationsfälle für 60/120 v2-Archive, gemeinsamer unveränderlicher Testhelfer; (3) **E11 NEU vollständig implementiert und getestet:** Tastaturbedienung, ARIA-Live-Regionen, Statistik und Double-KO-Replay im Browser. **E7, E8, E9, E10, E11 = 5 verifizierte, unveröffentlichte NEXT-110-Unterpakete**, davon E10/E11 neu in dieser Runde. NEXT-110 als Gesamtaufgabe bleibt OFFEN (E12/E13, Endabnahme). Die zuvor ausdrücklich benannten E1/E2 und E5/E6 sowie weitere nicht eigenständig nummerierte Integrationsschritte waren durch 787/787 auf E6-Stand verifiziert.
- **Kumulativ seit bestätigter Live-Version v0.1.61 vollständig abgeschlossene NEXT-Hauptaufgaben: 3:** **NEXT-106** Evidence-Gate (733/733, auf main, **Veröffentlichungsstatus ungeklärt**), **NEXT-107** Seitenbalance/Replay-Importfix (736/736, PR #94), **NEXT-109** Erstschussdiagnose (739/739, PR #94). **Zusätzlich 9 ausdrücklich nummerierte, verifizierte NEXT-110-Unterpakete E1/E2 und E5–E11 (E3/E4 sind nicht als eigenständige Tasks belegt)**, ohne NEXT-110 als Hauptaufgabe fertig zu zählen. Neu verifiziert in dieser Runde: E7–E11.
- **Refactoring:** gemeinsame `assertTamperRejected`-Archivtesthilfe statt duplizierter Mutation, keine Produktiv-Engine-/RNG-/v1-Änderung. **Rolling Backlog:** P1 NEXT-110-E12 120-Kampf-Browser-Importmanipulation ohne UI-/Sandbox-Zustandsverlust; P1 E13 Replay-Tastatur/0-Tick-/Double-KO-Statistikgrenzen; P0 NEXT-79e reale NVDA-/VoiceOver-/Touch-/Kontrastabnahme; P2 NEXT-108 CI-Artefakt-/SHA-Provenienz. PR #93 Draft (NEXT-109-Basis), PR #95 Draft-QA (main-Basis, ausdrücklich NICHT mergen). **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, Release-Commit, publish.php, Homepage-Update oder Deployment; andere Automationen unverändert.

## 27.10.2026 · 18:00 Uhr · NEXT-110 E7–E9 QA aktiviert; E10/E11 neu implementiert · CI IN PRÜFUNG · NICHT VERÖFFENTLICHT
- **Runde 3/3 kleine Pakete bearbeitet (noch nicht QA-abgeschlossen):** (1) **E7–E9 QA-Blockade beseitigt:** isolierter Draft-QA-PR #95 auf `main` als reine Testbasis korrigiert; `.github/workflows/ci.yml` enthält nur Qualitätsprüfungen, Builds und Artefakte, keine Veröffentlichung. GitHub Actions #40546632378 und #40546665203 für E10/E11-Commits gestartet, Ergebnis offen. (2) **NEXT-110-E10 NEU:** 11 Manipulationsfälle für v2-Archive bei 60/120 Kämpfen, ungültige IDs/Seed-unabhängige Werte, Status, Ergebnisreihenfolge, Tick-/Strukturgrenzen und Fortschritt; gemeinsame `assertTamperRejected`-Testhilfe refaktoriert. Datei `tests/next110-120-match-v2-stress.test.ts`, Test `npx vitest run tests/next110-120-match-v2-stress.test.ts`, Akzeptanz: alle ungültigen Archive abgelehnt, gültige Archive byteidentisch, v1 unverändert. (3) **NEXT-110-E11 NEU:** Tastatur-/Live-Region-/Statistik-Regression für v2-Double-KO in `e2e/next110-v2-cross-browser.spec.ts`, Test `npx playwright test e2e/next110-v2-cross-browser.spec.ts`; Akzeptanz: Chromium/WebKit Desktop/Mobil, Enter-Steuerung, korrekte ARIA-Live-Regionen und Ergebnisanzeige, Sandbox unverändert. Abhängigkeit: E1–E9; reale NVDA-/VoiceOver-Hardwareprüfung bleibt NEXT-79e.
- **Testergebnis:** Letzte erfolgreiche komplette CI bleibt #40527315493 **787/787** auf `a5b29bf9` (533 Vitest, 32 Node, 222 Browser), **nicht** für E7–E11 gültig. Neue QA läuft; E7–E11 nicht als vollständig abgeschlossen melden. Codeänderungen einzeln committed und zurückgelesen; reine Dokumentation wird atomar geschrieben. Kein Refactoring an Produktivsimulation oder RNG.
- **Kumulativ seit letzter bestätigter Live-Version v0.1.61 fertig/getestet, aber nicht live bestätigt: 3 NEXT-Tasks:** **NEXT-106** Evidence-Gate (733/733, auf main, **Veröffentlichungsstatus ungeklärt**), **NEXT-107** Spiegelanalyse/Replay-Importfix (736/736, PR #94), **NEXT-109** Erstschuss-Ursachendiagnose (739/739, PR #94). **NEU vollständig abgeschlossen: 0**; NEXT-110 E7–E11 pending CI, NEXT-110 nicht zählen.
- **Rolling Backlog:** P0 finale CI auf Dokumentations-HEAD prüfen, bei Fehlern E7–E11 reparieren und erneut testen; P1 NEXT-110-E12: Browser-Importfehler mit 120-Kampf-Archiv ohne UI-/Sandbox-Zustandsverlust; P1 NEXT-110-E13: zusätzliche 0-Tick-/Double-KO-Statistik- und Tastaturtests; P0 NEXT-79e echte NVDA/VoiceOver/Touch/Kontrast-Abnahme; P2 NEXT-108 CI-SHA-/Artefakt-Provenienz. PR #93 Draft auf NEXT-109-Basis; PR #95 Draft-QA auf main, ausdrücklich NICHT mergen. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, Release-Commit, publish.php, Homepage-Update oder Deployment; andere Automationen unverändert.

> 27.10.2026 · 17:08 Uhr: E7–E9 isolierte Feature-QA auf dem Draft-Entwicklungsbranch angefordert (keine Publishing- oder Deployment-Workflows); vollständiges Ergebnis ausstehend.\n\n## 27.10.2026 · 17:00 Uhr · NEXT-110 E7/E8/E9 als drei isolierte Testpakete implementiert · CI AUSSTEHEND · NICHT VERÖFFENTLICHT
- **Runde (3 kleine Pakete, noch nicht als QA-abgeschlossen zählen):** E7 v2-Archivmanipulation/Status/Spielplanreihenfolge/Resultatgrenzen in `tests/next110-versioned-tournament.test.ts`; E8 Double-KO-Replay im echten Browser inklusive Status, Statistik, Sandbox-Isolation und Replay-Reset in `e2e/next110-v2-cross-browser.spec.ts` (Chromium/WebKit Desktop/Mobil); E9 Double-KO-Event-/Terminalmanipulation, deterministischer Replay-Roundtrip in `tests/next110-replay-v2.test.ts`. Alle drei Dateien auf Draft-PR #93 seriell geschrieben und zurückgelesen. **Neue vollständige CI noch ausstehend, daher E7/E8/E9 nicht endgültig abgeschlossen und NEXT-110 weiterhin IN ARBEIT.**
- **Akzeptanz/Tests:** E7: manipulierte Archivzustände, doppelte/vertauschte Resultate, ungültige Tick-/Strukturwerte werden abgewiesen; `npx vitest run tests/next110-versioned-tournament.test.ts`. E8: importiertes v2-Double-KO zeigt explizites Unentschieden, beidseitige Schüsse, Replay-Reset und keine Sandboxänderung; `npx playwright test e2e/next110-v2-cross-browser.spec.ts` in Chromium Desktop/Mobil und WebKit Desktop/iPhone. E9: manipulierte terminale Events/Endzustände werden abgewiesen, gültiger Replay bleibt byteidentisch; `npx vitest run tests/next110-replay-v2.test.ts`. Abhängigkeit: NEXT-110 E1–E6 und die bestehenden Parser/Renderer. **Refactoring:** gemeinsame vorhandene Replay-/Archiv-Mutationshelfer wiederverwendet, keine Produktivcode-/RNG-/v1-Änderung.
- **Letzte bestätigte erfolgreiche CI vor diesen Änderungen:** [#40527315493](https://github.com/VOWIKRON/robot-arena/actions/runs/40527315493), 787/787 (533 Vitest, 32 Node, 222 Browser) auf `a5b29bf9f8a85ae9366894019a43dd5081dcd035`. Diese Zahl gilt ausdrücklich NICHT für E7–E9.
- **Kumulativ seit bestätigter Live-Version v0.1.61 fertig/getestet, aber nicht live bestätigt: 3 NEXT-Aufgaben:** NEXT-106 Evidence-Gate (733/733, auf main, **Veröffentlichungsstatus ungeklärt**), NEXT-107 Seitenbalance/Replay-Importfix (736/736, PR #94), NEXT-109 Erstschuss-Ursachendiagnose (739/739, PR #94). **Neue vollständig abgeschlossene NEXT-Aufgaben: 0**; NEXT-110 nicht zählen.
- **Rolling Backlog:** P0 E7–E9 isolierte CI inkl. Browsermatrix, Fehlerkorrektur und erneute QA; P1 NEXT-110 E10 vollständige v2-Archiv-Manipulationsmatrix für 120 Kämpfe; P1 E11 Replay-Statistik/A11y-Browserregression; P0 NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme auf Hardware; P2 NEXT-108 SHA-/Artefakt-Provenienz. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, Release-Commit, publish.php, Deployment oder Änderung anderer Automationen.

## 27.10.2026 · 16:05 Uhr · NEXT-110 E6 Browser-Stress CI GRÜN 787/787 · Dokumentations-CI offen · NICHT VERÖFFENTLICHT
- **E6 QUELLCODE UND BROWSERSTRESS VERIFIZIERT:** GitHub Actions Development Tests [#40526335534](https://github.com/VOWIKRON/robot-arena/actions/runs/40526335534) **SUCCESS** auf exakt `ab0b6db88551e73ad3282701bf7b39d7ad5dbd9f`: **533/533 Vitest** (Unit/Behavior/Regression/Determinismus), **32/32 Node**, **222/222 Playwright** (97 Desktop-Chromium, 97 Mobil-Chromium, 14 Desktop-WebKit, 14 iPhone-WebKit) = **787/787**; Typecheck, Dependency-Audit, reproduzierbarer Build, Browser- und integriertes Evidence-Gate PASS. Der neue E6-Browserstress läuft mit 16 Robotern und 120 v2-Kämpfen, Export/Reload/Import, identischem Re-Export, Replay/Statistiken und Sandbox-Isolation. Keine Test-Retries, 0 unerwartete/flaky Tests. **NEXT-110 bleibt IN ARBEIT**, da vollständige v2-Manipulations-/Double-KO-UX-Abnahme und echte NEXT-79e-Abnahme offen sind. Finale CI auf diesem neuen reinen Dokumentations-HEAD noch offen.
- **Kumulativ fertig/getestet, aber seit bestätigter Live-Version v0.1.61 nicht live bestätigt: genau 3 Aufgaben:** NEXT-106 (Evidence-Gate, 733/733, main, **Veröffentlichungsstatus ungeklärt**), NEXT-107 (Spiegelanalyse/Replay-Importfix, 736/736, PR #94), NEXT-109 (Erstschuss-Ursachendiagnose, 739/739, PR #94). **In dieser Runde keine weitere NEXT-Aufgabe vollständig abgeschlossen; NEXT-110 nicht zählen.**
- **Refactoring:** gemeinsame Browser-Exporthilfe statt doppelter Downloadlogik; Produktiv-Engine unverändert. **Rolling Backlog:** P0 finale Dokumentations-CI, v2-120-Kampf-Archivmanipulation und Double-KO-Browser-UX, dann P0 NEXT-79e echte NVDA/VoiceOver/Touch/Kontrast, P2 NEXT-108 Artefakt-/SHA-Provenienz. Draft-PR #93 isoliert auf NEXT-109-Basis; PR #94 separate Release-Vorbereitung. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, Release-Commit, publish.php oder Deployment; andere Automationen unverändert.

## 27.10.2026 · 15:55 Uhr · NEXT-110 E6 120-Kampf-v2-Browserintegration implementiert · finale CI offen · NICHT VERÖFFENTLICHT
- **Fehlerabschluss zuerst verifiziert:** GitHub Actions Development Tests #40517435029 auf exakt HEAD `10f356ee61f7ec5a288abb64bd4fd994134df0fe` **SUCCESS**: **533/533 Vitest** (Unit, Behavior, Regression, Determinismus), **32/32 Node-Integration**, **220/220 Playwright** (Chromium/WebKit Desktop/Mobil) = **785/785 Tests**. TypeScript, Sicherheitsprüfung, reproduzierbarer Build, Browser- und Evidence-Gates erfolgreich. Die sechs früheren E5-Browserfehler sind behoben.
- **Aktuelle Runde (1 NEXT-Aufgabe, NEXT-110 E6; NEU IMPLEMENTIERT, NOCH NICHT FINAL VERIFIZIERT):** Browser-E2E `e2e/next110-v2-120-browser.spec.ts` für 16 Teilnehmer und 120 simultane v2-Kämpfe (Seed 4711, 1 Tick, balancierte Seiten): realer Browser-Turnierlauf, Archiv-Export, vollständiger Reload, JSON-Import, byteidentischer Re-Export, Replay des letzten Kampfes, Statistikdarstellung, Sandbox-Isolation und deaktiviertes v2-Autosave. Chromium Desktop/Mobil; die bestehende separate WebKit-Desktop/iPhone-Suite prüft v2-Replay und Manipulationsschutz. Test mit 120-s-Stressbudget, ohne Retry und ohne zeitabhängige Pass-Schwellen. **Für E6 ist die neue CI noch offen; NEXT-110 bleibt IN ARBEIT.**
- **KUMULATIV seit letzter bestätigter Live-Version v0.1.61 fertig und getestet, aber noch NICHT live bestätigt: genau 3 Tasks:** **NEXT-106** (integriertes Evidence-Gate, 733/733, auf main, **Veröffentlichungsstatus ungeklärt**), **NEXT-107** (128 Spiegelmatches und Replay-Importfix, 736/736, PR #94, nicht auf main), **NEXT-109** (Erstschuss-Ursachendiagnose, 739/739, PR #94). **NEXT-110 nicht zählen.** Keine neue abgeschlossene NEXT-Aufgabe in dieser Runde.
- **Refactoring:** gemeinsame lokale `exportArchive`-Testhilfe statt doppelter Browser-Downloadlogik; bestehende v1/v2-Engine, RNG, Archiv- und Replay-Validatoren unverändert. **Rolling Backlog:** P0 E6-CI vollständig prüfen und Fehler beheben, danach v2-120-Kampf-Browserreplay-/Manipulationsgrenzen und Double-KO-UX; P0 NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme; P2 NEXT-108 Commit-SHA-/CI-Artefakt-Provenienz. Draft-PR #93 bleibt isoliert, Release-PR #94 getrennt. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, kein Release-Commit, kein publish.php, kein Deployment, keine Änderungen anderer Automationen.

## 27.10.2026 · 15:00 Uhr · NEXT-110 E5 Browser-Regression behoben, finale CI offen · NICHT VERÖFFENTLICHT
- **Fehler zuerst:** GitHub Actions #40508749766 auf HEAD `927146f3f74f5d58ff8facd104e25939c3c57d3a` **FAILED**: 214/220 Browser-Tests erfolgreich, 6 fehlgeschlagen (Chromium Desktop/Mobil, WebKit Desktop/iPhone). Beide betroffenen E2E-Suiten erwarteten `Ergebnis:` fälschlich in `#replay-stats`; seit E5 steht das Kampfergebnis korrekt in `#replay-result`, während `#replay-stats` nur Position, Struktur und Energie zeigt. Tests auf beide semantischen Ausgabefelder korrigiert, explizite Ticklimit-Auswertung geprüft; veralteten, unerreichbaren Ergebnis-Fallback in `renderReplay` entfernt. Quellcode- und E2E-Änderungen auf Draft-PR #93 committed und zurückgelesen. **Neue vollständige CI auf aktuellem Dokumentations-HEAD noch AUSSTEHEND; NEXT-110 bleibt IN ARBEIT.** Keine Engine-/RNG-/Archivformatänderung.
- **Letzter komplett erfolgreicher NEXT-110-Stand:** GitHub Actions #40500348912 auf `c88a361f8c59ca2334aeea662546826b03333545`, **782/782** (530 Vitest, 32 Node, 220 Browser), TypeScript, Audit, reproduzierbarer Build, Browser-/Evidence-Gate PASS. Dieser Erfolg gilt ausdrücklich nicht für den neuen E5-Stand. Refactoring: ein Ergebnis-Panel statt doppelter Ausgabe, bestehender v1/v2-Statistikanalyzer unverändert.
- **KUMULATIV vollständig fertig und getestet, seit letzter bestätigter Live-Version v0.1.61 noch NICHT live bestätigt: 3 Tasks:** **NEXT-106** (integriertes Evidence-Gate, 733/733, auf main, Live-Status ungeklärt); **NEXT-107** (128 Spiegelmatches und Replay-Import-Browserfix, 736/736, PR #94, nicht auf main); **NEXT-109** (Ursachenanalyse des Erstschussvorteils, 739/739, PR #94). **NEXT-110 NICHT zählen.** Letzte bestätigte Live-Basis v0.1.61; neuer externer Live-Abruf nicht möglich, daher keine Veröffentlichungsbestätigung.
- **Rolling Backlog:** P0 NEXT-110 E5 vollständige CI auf finalem HEAD inkl. Browsermatrix, deterministischer Unit-/Behavior-/Regressionstests und Evidence-Gates; bei Fehlern korrigieren und erneut testen. Danach P0 NEXT-110 16-Roboter-/120-Kampf-v2-Browserintegration, Double-KO-/Replay-Manipulationstests; P0 NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme auf Hardware; P2 NEXT-108 CI-Artefakt-/Commit-SHA-Provenienz. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Commit, kein publish.php, kein Deployment, andere Automationen unverändert.

## 27.10.2026 · 14:00 Uhr · NEXT-110 v2-Replay-Statistiken ergänzt · CI AUSSTEHEND · NICHT VERÖFFENTLICHT
- **GitHub-Statuskorrektur:** `tests/next107-side-bias.test.ts` ist nicht auf `main`; NEXT-107 liegt zusammen mit NEXT-109 in PR #94. Ältere Angaben „NEXT-107 auf main“ waren falsch; Gesamtzahl unveröffentlichter fertiger Tasks bleibt 3.
- **Vorherige vollständige CI #40500348912 SUCCESS** auf HEAD `c88a361f8c59ca2334aeea662546826b03333545`: 530 Vitest + 32 Node + 220 Chromium/WebKit Desktop/Mobil = **782/782**. Neue WebKit-v2-Archiv-/Replay- und Manipulationsregressionen vollständig erfolgreich; Typecheck, Audit, Build, Browser-/Evidence-Gate PASS.
- **NEU in dieser Runde: NEXT-110 E5**, eventbasierte v2-Replay-Statistiken (Schüsse, Treffer, effektiver Schaden, Energie, Double-KO/Ticklimit) über gemeinsamen v1/v2-Analyzer; neue drei Unit-/Determinismustests und zusätzliche Playwright-Statistikassertions. **Finale CI auf neuem HEAD noch offen; NEXT-110 bleibt in Arbeit.** Historische v1-Anzeige, Simulation und Archivformate unverändert; Refactoring vermeidet doppelte Statistiklogik.
- **Kumulativ vollständig fertig, getestet, noch nicht live bestätigt seit v0.1.61: 3 Tasks:** NEXT-106 (733/733, main), NEXT-107 (736/736, PR #94, noch NICHT auf main), NEXT-109 (739/739, PR #94); NEXT-110 NICHT mitzählen. **Rolling Backlog:** P0 E5-CI verifizieren/Fehler beheben; danach 120-Kampf-v2-Browserintegration, Replay-Double-KO-/Manipulationsregression; P0 NEXT-79e echte NVDA/VoiceOver/Touch/Kontrast-Abnahme; P2 NEXT-108 Artefakt-/SHA-Provenienz. PR #93 Draft, kein main-Merge. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Release-Commit, publish.php, Deployment oder Änderung anderer Automationen.

## 27.10.2026 · 13:00 Uhr · NEXT-110 WebKit-v2-Abnahme ergänzt · CI AUSSTEHEND · NICHT VERÖFFENTLICHT
- **Aktuelle Runde (1 NEXT-Aufgabe: NEXT-110, weiterhin IN ARBEIT):** Zwei neue reale Browser-E2E-Regressionen in `e2e/next110-v2-cross-browser.spec.ts` angelegt: (1) v2-Round-Robin, 1-Tick-Kampf, Replay, Archivexport/-import, unveränderter Sandbox-Zustand und deaktiviertes v2-Autosave; (2) manipulierte v2-Archiv-Regelversion muss abgewiesen werden und das aktive Turnier unverändert lassen. `playwright.config.ts` schaltet die neue Suite explizit für **Desktop-WebKit und iPhone-WebKit** frei; Chromium Desktop/Mobil führt sie ebenfalls aus. Änderungen committed und zurückgelesen, **abschließende CI für diesen neuen Stand noch nicht bestätigt**. Vorheriger HEAD `7fcf719d89f17c64c863f61e4f838c9d031f474c`: GitHub Actions #40493624267 SUCCESS mit **530 Vitest + 32 Node + 212 Browser = 774/774**. Diese 774 Tests belegen die NEUEN E2E-Tests ausdrücklich noch nicht.
- **Kumulativ seit letzter bestätigter Live-Version v0.1.61 vollständig fertig und getestet, aber nicht live bestätigt: 3 Tasks:** NEXT-106 (integriertes Release-Evidence-Gate, 733/733, auf main), NEXT-107 (Startseiten-Spiegelanalyse und Chromium-Replay-Importfix, 736/736, auf main), NEXT-109 (Erstschussvorteil-Ursachendiagnose, 739/739, PR #94 separat). **NEXT-110 nicht abgeschlossen, nicht mitzählen.** Die Live-Version ist nicht erneut extern abrufbar gewesen; Veröffentlichungsstatus bleibt ohne neue Bestätigung unverändert.
- **Refactoring/Regression:** Statt WebKit-spezifische Produktivlogik einzuführen, wiederverwendbare UI-Verträge und bestehende Archiv-/Replay-Validatoren geprüft; v1-Engine unverändert. **Rolling Backlog:** P0 NEXT-110 vollständige CI für neue WebKit/Chromium-Tests, ggf. Test-/Produktionsfehler beheben und erneut prüfen; danach v2-Replay-Statistiken, Double-KO und große Turnier-Browserabnahme, Manipulationsgrenzen; P0 NEXT-79e praktische NVDA/VoiceOver/Touch/Kontrast-Abnahme auf echter Hardware; P2 NEXT-108 CI-Artefakt-/SHA-Provenienz. PR #93 bleibt Draft und ohne main-Merge; PR #94 Release-Vorbereitung bleibt getrennt. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Keine Homepage-/publish.php-/Deployment-Aktion, kein Release-Commit, keine Änderungen an anderen Automationen.

## 27.10.2026 · 12:08 Uhr · NEXT-110 Browser-Regressionsfehler korrigiert, finale CI offen · NICHT VERÖFFENTLICHT
- **Aktuelle Runde (NEXT-110, Fehler vor Features):** CI #40492731364: 210/212 Browserfälle bestanden; zwei NEXT-50-Regressionen auf Chromium Desktop/Mobil schlugen fehl, weil der neue Replay-Import die historische Fehlermeldung „2 MB“ nicht mehr enthielt. Die neue v2-Importgrößenprüfung behält nach Korrektur die alte Fehlermeldung „Replay-Datei zu groß (2 MB)“ bei (Fix-Commit `29a6a5dd014fc9d99f1b37b8b44c8a2bdd023e6c`). Die neue vollständige CI **ist noch nicht erfolgreich bestätigt**. Die übrigen v2-Opt-in-/Archiv-/Replay-Browsertests waren im fehlgeschlagenen Lauf erfolgreich. Keine neue Aufgabe als abgeschlossen melden.
- **Kumulativ seit letzter bestätigter Live-Version v0.1.61: 3 fertig und getestet, noch NICHT live bestätigt:** NEXT-106 (733/733), NEXT-107 (736/736), NEXT-109 (739/739). NEXT-110 IN ARBEIT, nicht mitzählen. P0: vollständige finale CI auf exaktem Dokumentations-HEAD einschließlich Browser-Gate, Evidence-Gate und deterministischer Tests; danach v2-UX/Replay-Statistik/Manipulationsfälle prüfen. P0 NEXT-79e praktische Accessibility, P2 NEXT-108 Provenienz. PR #93 Draft, PR #94 separat. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, Release-Commit, publish.php oder Deployment.

## 27.10.2026 · 12:00 Uhr · NEXT-110 v2-UI opt-in und Browser-Regression in CI · NICHT VERÖFFENTLICHT
- **Letzte verifizierte Live-Version: v0.1.61** (Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, letzter bestätigter Deploymentstatus success). **Kumulativ vollständig abgeschlossen und getestet, aber noch nicht live bestätigt: genau 3 NEXT-Tasks:** **NEXT-106** integriertes Evidence-Gate (733/733, auf main), **NEXT-107** Startseiten-Spiegelanalyse und Chromium-Replay-Importfix (736/736, auf main), **NEXT-109** Diagnose des Erstschussvorteils (739/739, Release-Vorbereitungs-PR #94, nicht gemergt). **NEXT-110 weiterhin IN ARBEIT, NICHT mitzählen.** Veröffentlichung dieser drei Aufgaben weiterhin nicht bestätigt; keine automatische Veröffentlichung.
- **Aktuelle Runde (1 NEXT-Aufgabe: NEXT-110):** Vorherige finale CI #40486626824 auf Replay-/120-Kampf-Stand `f6bae12d3dff12990d9a02889d7fe3ccf7484021` **SUCCESS** (einschließlich Unit, Behavior, Determinismus, Browser Desktop/Mobil und Build). **NEU implementiert, noch nicht vollständig verifiziert:** explizite v2-Kampfregel-Auswahl nur für Round Robin; v1 bleibt Standard und K.-o. bleibt v1. Browser kann v2-Kämpfe abspielen, versionierte v2-Turnierarchive importieren/exportieren und v2-Replays mit strengem Parser laden; Double-KO-/Timeout-Ergebnis wird angezeigt. Historischer v1-Statistikpfad bleibt separat; lokale Sicherung bleibt ausschließlich v1 und wird für v2 deaktiviert, damit bestehende Daten nicht überschrieben werden. Zwei neue Playwright-Browsertests prüfen v2-Opt-in, 1-Tick-Replay, Export/Import, Sandbox-Isolation und v1-K.-o.-Fallback; bestehender Negativtest prüft weiterhin defekte Archivdateien. Commits `01c10b49` und `b820b4b1`; neue vollständige CI #40492731364 **IN PRÜFUNG**. Keine vorzeitige Erfolgsmeldung.
- **Refactoring:** vorhandene v1/v2 ReplayPlayer-, Turnier- und Archiv-Validatoren wiederverwendet; v1-Simulation/RNG unverändert, Browser-Statistikpfade versioniert getrennt. **Rolling Backlog:** P0 NEXT-110 neue CI inkl. Chromium/WebKit Desktop/Mobil abwarten und Fehler beheben; P0 v2-Replay-Import-/Export-UX und Double-KO-Darstellung samt Manipulationsfällen, 120-Kampf-Browser-Regression und v1-Archiv-Rückwärtskompatibilität absichern; P0 NEXT-79e praktische NVDA/VoiceOver/Touch/Kontrast-Abnahme auf echter Hardware; P2 NEXT-108 GitHub-SHA-/Artefakt-Provenienz. PR #93 bleibt Draft und wird nach CI wieder gegen NEXT-109 ausgerichtet; PR #94 bleibt separate Release-Vorbereitung. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, Release-Commit, publish.php oder Deployment; andere Automationen unverändert.

## 27.10.2026 · 11:10 Uhr · NEXT-110 E1/E2 Replay-/Player-Integration + 120-Replay-Regression in Prüfung · NICHT VERÖFFENTLICHT
- **Letzte verifizierte Live-Version v0.1.61** (Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, letzter bestätigter Deploymentstatus success). **Kumulativ vollständig fertig, getestet, noch nicht live bestätigt: 3 NEXT-Tasks:** NEXT-106 (integriertes Evidence-Gate, 733/733, auf main), NEXT-107 (Startseiten-/Replay-Diagnostik und Chromium-Import-Fix, 736/736, auf main), NEXT-109 (Erstschuss-Ursachenanalyse, 739/739, QA-grüner Release-Vorbereitungs-PR #94, nicht gemergt). **NEXT-110 bleibt IN ARBEIT und zählt nicht zu den 3.** Veröffentlichungsstatus der drei Aufgaben: **nicht live bestätigt**; keine stillschweigende Freigabe.
- **Aktuelle Runde (1 NEXT-Aufgabe, NEXT-110):** isoliertes versioniertes `replay-v2.ts` mit Replay-Ereignisformat, explizitem Double-KO-/Timeout-Draw und strikter Importvalidierung; versionierter `ReplayPlayer` und `replayTournamentMatch` für v2, Legacy-v1-Browserpfad weiterhin explizit gesperrt. **NEU:** 120-Kampf-Regression nach Pause/Archivexport/-import/Fortsetzung prüft für jeden der 120 Kämpfe ereignisbasiertes Replay, Sieger, Reststruktur, Tickzahl, Cursor-Reset und bytegleiches Archiv. Neuer Test-Commit `c7927cb6d251e0210ed2b54d6efaf4df93efbf02`; vollständige CI auf finalem HEAD **noch nicht bestätigt**. Vorherige grüne NEXT-110-CI #40478096659: 760/760 (520 Vitest, 32 Node, 208 Chromium/WebKit Desktop/Mobil), **nicht als Nachweis für neue Replay-Änderungen verwenden**.
- **Refactoring/Kompatibilität:** vorhandenen ReplayPlayer, TournamentRunner, Archive und Schedule wiederverwendet; v1-Simulation, RNG und Replayformat unverändert. **Rolling Backlog:** P0 NEXT-110 neue Unit-/Behavior-/Determinismus- und Chromium/WebKit-Desktop-/Mobil-CI abschließen und Fehler beheben; danach explizite v2-UI-Freigabe mit Replay-Import/-Export und Browser-E2E, Replay-Statistik/Double-KO-Darstellung und vollständige 120-Kampf-Abnahme; P0 NEXT-79e reale NVDA-/VoiceOver-/Touch-/Kontrastprüfung; P2 NEXT-108 CI-Artefakt-/SHA-Provenienz. PR #93 Draft, Release-PR #94 separat. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Commit, kein publish.php, kein Deployment; andere Automationen unverändert.

## 27.10.2026 · 11:00 Uhr · NEXT-110 Stufe E1: versioniertes v2-Replayformat und Double-KO-Ereignis implementiert · CI OFFEN · NICHT VERÖFFENTLICHT
- **Letzte verifizierte Live-Version: v0.1.61** (Release-Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, Deploymentstatus success; keine neue bestätigte Live-Veröffentlichung). **Kumulativ vollständig implementiert, getestet, noch NICHT veröffentlicht: 3 NEXT-Tasks:** NEXT-106 (integriertes Fail-Closed-Evidence-Gate, finale QA 733/733, PR #90 nach main gemergt, aber noch nicht live bestätigt); NEXT-107 (128 Startseiten-Spiegelmatches und Replays, Chromium-Tastatur-Importfix, finale QA 736/736, PR #91 nach main gemergt, aber noch nicht live bestätigt); NEXT-109 (Erstschuss-/Seitenreihenfolge-Diagnose, finale QA 739/739, korrigierter Release-Vorbereitungs-PR #94 mit CI #40478186462 SUCCESS, nicht gemergt). **NEXT-110 IN ARBEIT, nicht zu den 3 zählen.**
- **Aktuelle Runde (1 NEXT-Aufgabe): NEXT-110 Stufe E1** isoliertes `src/engine/replay-v2.ts` mit explizitem `schemaVersion:2`, `rulesetVersion:simultaneous-v2`, deterministischer Aufzeichnung, fail-closed Import/Validierung, Replay-Rekonstruktion ausschließlich aus Events und explizitem `draw`-Ereignis für Double-KO/Timeout. Neue `tests/next110-replay-v2.test.ts` deckt vier Seeds, Ereignis-/Zustands-Digests, Double-KO, Null-Tick-Timeout, manipulierte Frames/Ergebnisse, adaptive Strategie und strikte v1-Isolation ab. **Änderungen committed; vollständige CI auf neuem HEAD noch nicht bestätigt.** Letzte bestätigte vorherige NEXT-110-CI #40478096659 SUCCESS: 520 Vitest + 32 Node + 208 Chromium/WebKit Desktop/Mobil = **760/760**; nicht als Testnachweis für neue E1-Änderungen verwenden.
- **Refactoring/Kompatibilität:** Neue v2-Replaylogik als separater Parser/Recorder mit vorhandenen Engine- und Eventkomponenten; historischer v1-Replay-Parser, v1-RNG und v1-Simulation unverändert. PR #93 bleibt Draft, vorübergehend gegen main für vollständige PR-CI, ohne Merge. **Rolling Backlog:** P0 NEXT-110 E1 TypeScript/Unit/Determinismus/Browser-CI abschließen und Fehler beheben; E2 v2-Turnier-Replay und Player/UI versioniert anbinden, Double-KO und 120-Kampf-Archiv-Replay gegen deterministische Ergebnisse prüfen; P0 NEXT-79e praktische NVDA/VoiceOver/Touch/Kontrast-Abnahme mit echten Geräten; P2 NEXT-108 CI-Artefakt-/Commit-Provenienz. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Release-Commit, kein Merge nach main, kein publish.php, kein Deployment; andere Automationen unverändert.

## 27.10.2026 · 10:00 Uhr · NEXT-110 Stufe D 120-Kampf-v2-Stresstest ergänzt; vollständige CI auf neuem HEAD OFFEN · NICHT VERÖFFENTLICHT
- **Letzte bestätigte Live-Version: v0.1.61** (Deploymentstatus success; main package.json weiterhin 0.1.61). **Kumulativ fertig, getestet, NICHT veröffentlicht: 3 Tasks:** NEXT-106 (integriertes Release-Evidence-Gate, 733/733, PR #90 nach main gemergt, noch nicht live bestätigt), NEXT-107 (128 Spiegelmatches/Replays + Chromium-Import-Tastaturkorrektur, 736/736, PR #91 nach main gemergt, noch nicht live bestätigt), NEXT-109 (Erstschuss-/Startseitendiagnose, 739/739, PR #92; konfliktbereinigte Release-Vorbereitung PR #94 mit CI #40467773054 SUCCESS, noch nicht live bestätigt). **NEXT-110 IN ARBEIT und NICHT als fertig zählen.**
- **Aktuelle Runde: NEXT-110 (eine Aufgabe, Stufe D).** Neuer isolierter Regressionstest `tests/next110-120-match-v2-stress.test.ts`: 16 Roboter / 120 Round-Robin-Kämpfe / 48 Ticks, vollständiger deterministischer v2-Lauf gegen Pause nach Kampf 60 → Export → Import → Fortsetzung; bytegleicher Archivvergleich, vollständige Ergebniskette, Einmaligkeit von IDs/Seeds, manipulierte Archivversion/Regelversion/Fortschritt/Fixture abweisen, v2 im Legacy-v1-Browserpfad weiter ablehnen. **Testcode committed; neue vollständige CI auf exaktem HEAD noch offen.** Vorherige CI #40470975344 SUCCESS: 518 Vitest + 32 Node + 208 Browser = **758/758**, einschließlich Chromium/WebKit Desktop/Mobil. **Keine neuen Tests als erfolgreich behaupten, bevor GitHub sie bestätigt.**
- **Refactoring:** Wiederverwendung bestehender Runner-/Archiv-/Spielplan-Helfer; keine Änderung an v1-Engine, Replay, RNG oder UI. **Rolling Backlog:** P0 NEXT-110 Stufe D CI inkl. 120-Kampf-Test prüfen und ggf. reparieren; danach explizites v2-Replay-/Event-Schema mit Double-KO und versionssicherem Parser, Browser-UI-Integration, vollständige Desktop-/Mobil-/Replay-QA. P0 NEXT-79e reale NVDA/VoiceOver/Touch/Kontrast-Abnahme; P2 NEXT-108 CI-Provenienz. PR #93 bleibt Draft; PR #94 ist getrennte Release-Vorbereitung. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Commit, kein publish.php, kein Deployment.

## 27.10.2026 · 08:55 Uhr · NEXT-110 Stufe C versionierte Turniere/Archive implementiert; neue CI OFFEN · NICHT VERÖFFENTLICHT
- **Kumulativ seit letzter bestätigter Live-Version v0.1.61 fertig, getestet und NICHT veröffentlicht: 3 Tasks:** NEXT-106 (733/733, PR #90 inzwischen auf main, kein bestätigter neuer Live-Release), NEXT-107 (736/736, PR #91 inzwischen auf main, kein bestätigter neuer Live-Release), NEXT-109 (739/739, PR #92; konfliktbereinigte Release-Vorbereitung PR #94, CI #40467773054 SUCCESS, noch keine bestätigte Veröffentlichung). **NEXT-110 weiterhin IN ARBEIT, nicht als erledigt zählen.**
- **Aktuelle Runde: NEXT-110 Stufe C (eine Aufgabe):** Turnierdefinition schemaVersion 2 verlangt explizit rulesetVersion simultaneous-v2; schemaVersion 1 verbietet Regelnfeld und bleibt unverändert. Turnier-Runner wählt v2 nur bei explizitem Schema 2; Archiv-Import/Export und Fortsetzung prüfen passende Schema-/Regelversion, auch bei pausierten Läufen. Sechs neue Tests in next110-versioned-tournament.test.ts decken v1/v2, Seeds, Resume, manipulierte Archive und fehlende/falsche Versionen ab; historischer Zukunftsschema-Test auf 3 angepasst. **Neue vollständige CI auf aktuellem HEAD noch nicht bestätigt; keine Erfolgsmeldung für diese Änderungen.**
- **Refactoring:** vorhandene deterministische Runner-/Schedule-/Archiv-Prüfpfade wiederverwendet; v1 Simulation, RNG und Replay unverändert. **Rolling Backlog:** P0 NEXT-110 Stufe C CI prüfen und Fehler beheben; v2-Replay/Event-Schema und UI-Anbindung mit expliziter Version implementieren; P0 Stufe D 120-Kampf-Pause/Export/Import/Resume, historische v1-Digests, Desktop/Mobil Chromium/WebKit, QA auf exaktem HEAD. P0 NEXT-79e reale NVDA/VoiceOver/Touch/Kontrast-Abnahme; P2 NEXT-108 CI-Provenienz. PR #93 Draft, kein Merge; Release-PR #94 von Nutzer gesondert angefordert, aber dieser automatische Entwicklungslauf führt **keine Veröffentlichung** aus. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, kein Release-Commit, kein publish.php, keine Homepage-Aktualisierung in dieser Runde.

## 27.10.2026 · 08:18 Uhr · NEXT-110 Stufe B QA 751/751 grün, weitere Persistenzintegration offen · NICHT VERÖFFENTLICHT
- **Kumulativ vollständig fertig, getestet und unveröffentlicht: 3 Tasks:** NEXT-106 (733/733, PR #90), NEXT-107 (736/736, PR #91), NEXT-109 (739/739, PR #92). Live-Basis **v0.1.61**, GitHub-Deploymentstatus success. **NEXT-110 weiterhin IN ARBEIT, NICHT als erledigt zählen.**
- **Aktuelle Runde (NEXT-110 Stufe B):** experimentelle simultane-v2-Engine mit gemeinsamer Bewegungs-/Schuss-Snapshot-Auswertung, stabiler RNG-Reihenfolge nach ID, atomarem Schaden und Double-KO-Unentschieden; 8 neue Tests inklusive 8 gespiegelter Seeds. CI #40465328903 **SUCCESS** auf Source-HEAD `0f3a1d1f6429bce53d597faea0b17654ef8cd169`; finale Source+Dokumentation-CI #40465448855 **SUCCESS** auf HEAD `cfaa68122d7d74f29be529268df609ff2787373b`: **511 Vitest + 32 Node + 208 Playwright = 751/751**, TypeScript, Audit, reproduzierbarer Build, Browser- und Evidence-Gates PASS. Erste CI-Fehler (TypeScript-Narrowing; gespiegelter 93/92-Tick-Range-Edge) analysiert und behoben; v2 verwendet 1e-9 Toleranz, v1 bleibt unverändert. **Diese neue Dokumentationsänderung selbst benötigt keine Produktionsänderung; neue HEAD-CI ist noch offen.**
- **Refactoring:** v2 verwendet vorhandene Bewegungs-, Strategie-, Event- und RNG-Helfer, ohne v1-Engine umzubauen. **Rolling Backlog:** NEXT-110 Stufe C explizite Regeln/Schema-Versionen in Turnierdefinition, Runner, Replay und Archiv mit Fail-Closed-Imports; Stufe D 120-Kampf-Archive-Pause/Resume, historische Replay-Digests und Browsermatrix. P0 NEXT-79e reale NVDA/VoiceOver/Touch/Kontrastabnahme; P2 NEXT-108 CI-Provenienz. PR #93 Draft, gestapelt auf NEXT-109, kein Merge. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Release-Commit, kein Deployment, kein publish.php.

## 27.10.2026 · 08:04 Uhr · NEXT-110 Stufe B isolierte simultane Kampfauflösung implementiert, vollständige CI offen · NICHT VERÖFFENTLICHT
- **Live-Basis v0.1.61** (Release-Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, GitHub-Deploymentstatus success). **Kumulativ fertig/getestet/NICHT veröffentlicht: genau 3 Tasks:** NEXT-106 (integriertes Evidence-Gate, 733/733, CI #40431030229, PR #90); NEXT-107 (128 gespiegelte Seeds/Replays und Chromium-Tastatur-Import-Fix, 736/736, CI #40442361594, PR #91); NEXT-109 (Diagnose des Erstschussvorteils, 739/739, finale CI #40453049632, PR #92). Keinen dieser Tasks ohne verifizierte manuelle Veröffentlichung aus der Liste streichen.
- **Aktuelle Runde: NEXT-110 IN ARBEIT (eine Aufgabe, Stufe B).** Auf isoliertem Draft-PR #93 neue `src/engine/simulation-v2.ts` mit simultanen Bewegungsentscheidungen aus einem gemeinsamen Snapshot, gemeinsamen Schussentscheidungen, stabiler RNG-Reihenfolge nach Roboter-ID, atomarer Schadensanwendung und Double-KO als Unentschieden; neue `tests/next110-simultaneous-v2.test.ts` mit 8 Tests für Regeln, Legacy, Bewegungssymmetrie, Double-KO, RNG-Slottausch, Seed-Determinismus und Terminalzustand. Produktionssimulation und v1-Archive/Replays unverändert; **neue vollständige CI noch nicht bestätigt, NEXT-110 NICHT abgeschlossen**. Letzte vorliegende vollständige CI auf vorherigem Stufe-A-HEAD #40458441491 SUCCESS mit 743/743 Tests. PR #93 vorübergehend gegen main nur für PR-CI, **kein Merge**.
- **Refactoring:** isolierter v2-Resolver verwendet bestehende `nextCombatPosition`, `strategyParameters`, Event-Factories und SeededRandom, ohne legacy-v1-Reihenfolge anzufassen. **Rolling Backlog:** P0 NEXT-110 Stufe B CI/Fix und gespiegelte Seed-Matrix, Stufe C explizite Regeln in Turnierdefinition/Runner und versionierte Archive/Replay-Parser samt Hostile-Import-Tests, Stufe D 120-Kampf-Pause/Export/Import/Resume und Chromium/WebKit Desktop/Mobil; P0 NEXT-79e reale NVDA/VoiceOver/Touch/Kontrastabnahme; P2 NEXT-108 CI-Commit-/Artefakt-Provenienz. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Commit, kein Deployment, kein publish.php, keine Homepage-Aktualisierung.

## 27.10.2026 · 06:57 Uhr · NEXT-109 FINAL QA GRÜN, NEXT-110 Kompatibilitätsphase begonnen · NICHT VERÖFFENTLICHT
- **Live-Basis v0.1.61 bestätigt**, Release-Commit `0a7d4cb1b92550c011ccb25af9bc9cdd0e094aab`, GitHub-Deploymentstatus success. **Kumulativ vollständig implementiert, getestet, NICHT veröffentlicht: 3 Tasks:** NEXT-106 (Fail-Closed-Release-Evidence-Gate, 733/733, CI #40431030229 SUCCESS, PR #90); NEXT-107 (128 gespiegelte Seed-Kämpfe + Replays, mobile Chromium-Tastatur-Import-Race behoben, 736/736, CI #40442361594 SUCCESS, PR #91); **NEXT-109 NEU ABGESCHLOSSEN** (reproduzierbare Erstschuss-/Seitenreihenfolge-Diagnose, 739/739, finale CI #40453049632 SUCCESS auf HEAD `f315ac13e9f140a0f54618fd4f1dd5c0bb4976de`, PR #92). **NEXT-110 IN ARBEIT**: Regelversions-/Replay-Migrationsvertrag dokumentiert, vier gezielte Legacy-v1-Kompatibilitätstests ergänzt; neue CI auf diesem Branch steht noch aus, kein simultaner Engine-Fix implementiert. **Refactoring:** vorhandene Engine bleibt unverändert, historische Testpfade wiederverwendet. **Rolling Backlog:** P0 NEXT-110 Versionierung + simultane Aktionsauflösung + RNG/Event-/Archiv-/Replay-Kompatibilität; P0 NEXT-79e praktische NVDA-/VoiceOver-/Touch-/Kontrastabnahme auf echter Hardware; P2 NEXT-108 CI-Provenienz fail-closed absichern. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Commit, kein Deployment, kein publish.php, keine Homepage-Aktualisierung.

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
