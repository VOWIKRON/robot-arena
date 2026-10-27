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

## Unreleased · NEXT-90 QA-GREEN · 26.10.2026 · NICHT VERÖFFENTLICHT
- **NEXT-90 NEU ABGESCHLOSSEN:** Zwei echte JSON-Ressourcenartefakte aus CI #40266761987 und #40267008446 archiviert und verglichen; historische Chronologie-/Schema-/Szenario-Validierung, Deltas und vier Vitest-Regressionen. Archivbytes bei 2/4/8/16 Teilnehmern identisch (815/2082/6646/24004); Zeit-/Heapwerte nur diagnostisch. RESOURCE_HISTORY.md enthält Provenienz und Trends.
- **CI #40271841058 SUCCESS** auf cc26536e9818e18f7680502beb314d66de407fbc: 440/440 Vitest, 4/4 Konfliktprüfungen, 162/162 Desktop-/Mobil = **606/606**, TypeScript, reproduzierbarer Build und Security-Audit grün. Nachfolgender Dokumentationscommit braucht erneute CI.
- **Kumulativ seit v0.1.57 acht getestet und unveröffentlicht:** NEXT-76, 82, 85, 86, 87, 88, 89, **90 NEU**. Refactoring: NEXT-89-Vergleichsfunktionen wiederverwendet, Produktionscode unverändert. Draft-PR #70; kein Merge/Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · NEXT-89 QA-GREEN · 26.10.2026 · NICHT VERÖFFENTLICHT
- **NEXT-89 NEU ABGESCHLOSSEN:** 2/4/8/16-Teilnehmer-Ressourcentrends mit 24 Ticks/Kampf, JSON-CI-Artefakt, Vergleich historischer Laufzeit-/Heap-/Archivgrößen-Messungen, robuste Validierung ohne fragile Performance-Fail-Grenzwerte.
- **CI #40266761987 SUCCESS** auf `1f0b6076c15923dfc49a9713ed8e6c239d814f55`: 436/436 Vitest, 4/4 Konfliktprüfungen, 162/162 Desktop-/Mobiltests, TypeScript, reproduzierbarer Build, Audit 0; **602/602**. Ressourcenartefakt ID 12626795952. Dokumentations-Follow-up muss erneut CI bestehen.
- **Kumulativ sieben fertig getestete und unveröffentlichte NEXT-Aufgaben seit v0.1.57:** 76, 82, 85, 86, 87, 88, **89 NEU**. Refactoring: Endurance-Fixture zentralisiert.
- **Offen:** NEXT-79e manuelle Barrierefreiheit, NEXT-80 Cross-Tab-CAS, NEXT-84 Safari/iOS, NEXT-90 historische Trendbaseline.
- **Draft-PR #69; NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · NEXT-88 QA-GREEN · 26.10.2026
- **NEU abgeschlossen:** NEXT-88 deterministische Endurance-Regression für 16 Roboter/120 Kämpfe, 5.760 Ticks und maxTicks=3.600, Archivpause/-wiederaufnahme, Ressourcen-Diagnostik ohne flüchtige Grenzwerte.
- **Verifiziert:** CI #40262194281 SUCCESS (434 Vitest + 4 Konfliktprüfungen + 162 Browser = 600 Prüfungen; TypeScript, Build, Audit grün) auf 12ac113b86a59c8536f7585d34716d5af9858d43; Dokumentations-Follow-up erfordert neue CI.
- **Kumulativ fertig/getestet und unveröffentlicht seit v0.1.57:** NEXT-76, 82, 85, 86, 87, **88** = 6. Kein Produktivcode verändert. Draft-PR #68, kein Merge/Release/Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

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

## Unreleased – 25.10.2026, 09:00 MEZ (Entwicklungsbranch, NICHT veröffentlicht)
- NEXT-79c: Fehlerhafte oder fehlende Turnier-Sicherungen/Importe unterbrechen Auto-Play nicht mehr; Stopp erfolgt nur nach validiertem Archiv. Roboter-Preset-Auswahl wird nach Restore aus den Archivdaten wiederhergestellt.
- NEXT-79d: Konkrete Turnier-Validierungsfehler mit Fokus, `aria-invalid`, `aria-describedby` und Bereinigung nach Eingabekorrektur.
- Drei Desktop-/Mobil-Playwright-Regressionsfälle ergänzt; noch **nicht ausgeführt**. Letzte bestätigte Voll-CI #40153366228 gilt für früheren Stand.
- Kumulativ unveröffentlicht und vollständig CI-getestet: NEXT-63, 64, 66, 67, 68, 78. NEXT-79a/b getestete Teilaufgaben; 79c/d nicht final abgenommen; 79e offen. Kein Merge, Release oder Deployment.

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

## Unreleased · 25.10.2026, ca. 08:00 MEZ · NEXT-79c Auto-Play bleibt bei Formularänderungen erhalten
- Fehlerkorrektur: Ein Klick auf „Spielplan erstellen“ oder die Änderung der Teilnehmerzahl darf einen bereits gestarteten automatischen Turnierlauf nicht stoppen, wenn die aktive Planung nicht ersetzt wird. `stopTournamentAuto()` läuft nun erst nach erfolgreicher echter Neuanlage; reines Formular-Rendering hat keine Timer-Nebenwirkung.
- Neue Desktop-/Mobil-Playwright-Regression mit 3 Teilnehmern und Auto → Pause → geänderte gültige/ungültige Seed-Eingabe → Teilnehmer-Update → Fortsetzen → 3/3 Kämpfe. **Test implementiert, aber aktuelle CI nicht nachgewiesen; NEXT-79c/d offen.**
- Letzte bestätigte Live-Version v0.1.55; kumulativ 6 vollständig CI-getestete, NICHT veröffentlichte NEXT-Aufgaben: NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (reproduzierbare Builds/Audit), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministisches Replay), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD-Arenagrenzen). NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d nicht aktuell vollständig CI-abgenommen; NEXT-79e offen. Letzte grüne Voll-CI #40153366228 vor diesen Änderungen. Kein Merge/Release/Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · 25.10.2026, 07:00 MEZ · NEXT-79c aktiven Spielplan vor versehentlichem Ersetzen geschützt
- Beim Ändern von Turniereinstellungen kann „Spielplan erstellen“ einen aktiven Lauf nicht mehr unbemerkt überschreiben. Die Oberfläche verlangt ausdrücklich „Abbrechen“; nach Abbruch oder Abschluss ist ein neuer Spielplan möglich. Status-Guard vereinheitlicht, deterministische Simulation unverändert.
- Neue Playwright-Regression für ungültige Eingabe, geänderte gültige Konfiguration, Bestandsschutz und Cancel/Neustart im Entwicklungsbranch committed und zurückgelesen. **Vollständige aktuelle CI noch nicht nachgewiesen: NEXT-79c/d weiterhin offen.**
- Letzte bestätigte CI vor diesen Änderungen #40153366228 (383 Unit/Behavior/Regression, 102 Desktop/Mobil-E2E). Kumulativ seit Live-v0.1.55 sechs bereits CI-getestete unveröffentlichte NEXT-Aufgaben: 63, 64, 66, 67, 68, 78; NEXT-79a/b getestete Teilaufgaben.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · 25.10.2026, 06:00 MEZ · NEXT-79c Pausensteuerung verbessert, CI offen
- Ein pausiertes Turnier lässt sich nicht mehr unbeabsichtigt mit „Alle Kämpfe spielen“ fortsetzen: Beide Startaktionen sind bis zum ausdrücklichen „Fortsetzen“ deaktiviert. Vorhandene Runner-Statusableitung vereinheitlicht, Engine/RNG unverändert.
- Neue Playwright-Regressionen für Desktop/Mobil prüfen Pause, deaktivierte Startaktionen und Wiederaufnahme. **Tests im Branch, aktuelle vollständige CI noch nicht nachgewiesen.** NEXT-79c/d bleiben offen.
- Letzte bestätigte vollständige CI vor den neuen UX-Änderungen: #40153366228 (383 Unit/Behavior/Regression, 102 E2E). Sechs zuvor CI-getestete, unveröffentlichte NEXT-Aufgaben seit Live-v0.1.55: 63, 64, 66, 67, 68, 78.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · 25.10.2026, 05:00 MEZ · NEXT-79d Hilfetexte implementiert, NEXT-79c/d CI ausstehend
- Direkt an den Eingaben: kurze verständliche Erklärungen für Strategie, Energiereserve, Turnier-Startwert, Ticklimit und Turnierformate; Reststruktur im Ergebnisbereich erklärt. `aria-describedby` für Screenreader, kontrastreiche responsive `.field-help`-Stile.
- Neue Playwright-Regressionen prüfen Beschriftungen/ARIA-Verknüpfung, Touch-Navigation ≥44px, 375/1280px und keinen horizontalen Seitenscroll. NEXT-79c-Dreischritt-Dialog weiter in Abnahme.
- **Kein neuer vollständiger Testabschluss:** Für neuen Head kein bestätigter GitHub-CI-Lauf abrufbar. Letzte bestätigte CI #40153366228 (383 Unit/Behavior/Regression, 102 E2E) betrifft früheren Stand. NEXT-79c/d bleiben offen.
- Kumulativ unveröffentlicht und zuvor CI-bestätigt seit Live-v0.1.55: NEXT-63, 64, 66, 67, 68, 78 (6). Kein Merge/Release/Deployment.

## Unreleased · 25.10.2026, 04:00 MEZ · NEXT-79c in Abnahme
- Turnierdialog in „Einrichten“, „Spielen“ und „Ergebnisse“ mit zugänglichen Sprunglinks und responsiven Gruppen umstrukturiert. Aktionen je Runner-Status zentral aktiviert/deaktiviert; Export und lokale Sicherung bleiben erreichbar. Engine und Matchdaten unverändert.
- Neue Browser-Regressionen für 375/1280px, Tastatur, Schrittfolge und Action-Gates committed. **Noch keine vollständige CI auf dem neuen Stand bestätigt; nicht als fertig getestet zählen.**
- Letzte grüne vollständige CI vor dem Umbau: #40153366228 (383 Unit/Behavior/Regression, 102 E2E). Kumulativ weiterhin 6 vollständig getestete, NICHT veröffentlichte NEXT-Aufgaben: 63, 64, 66, 67, 68, 78. NEXT-79 bleibt offen.
- Kein Merge, Release-Commit, Publish oder Deployment.

## Unreleased · 25.10.2026, 03:00 MEZ · NEXT-78 ABGESCHLOSSEN und NEXT-79a/79b implementiert
- **NEXT-78 P0:** Raptor/Titan samt Chassis, Waffe, Energie- und Strukturbalken bleiben am Arenarand sichtbar; reine Darstellungsbegrenzung ohne Änderungen an Seeds oder deterministischer Simulation. Acht Rand-/Eckfälle und defensive Langzeitflucht. CI #40144987038: 383 Unit-/Behavior-/Regressionstests, 96 E2E grün.
- **NEXT-79a:** Browser-Baseline für Konfiguration, Kampf und Turnier mit Tastatur sowie 375/768/1280px, kein horizontaler Seitenscroll. CI #40152929889: 383 Unit und 100 E2E grün.
- **NEXT-79b:** Kampf- und Werkzeugaktionen übersichtlich gruppiert, Start hervorgehoben; Status „Kampfbereit“, „Kampf läuft“ und „Kampf pausiert“. Development Tests #40153090696 auf 88a415e9: 383 Unit-/Behavior-/Regressionstests (32 Dateien), 102 Desktop-/Mobil-E2E, Typecheck, Build, npm-Audit-Gate und reproduzierbare Clean-Builds erfolgreich. NEXT-79c/d/e noch offen.
- Kumulativ sechs unveröffentlichte, vollständig getestete NEXT-Aufgaben seit v0.1.55: NEXT-63, 64, 66, 67, 68, 78. **Kein Publish/Deployment.**

## Unreleased · 25.10.2026, 02:00 MESZ · NEXT-78 Regression verstärkt (noch nicht abgenommen)
- P0-Fluchttests prüfen nun explizit, dass der Raptor **wirklich zurückweicht** und die Arenagrenze erreicht, bevor sie das Einhalten der Grenzen bewerten. Vorher war ein fälschlich grüner Test ohne Bewegung möglich. Alle acht Ränder/Ecken und 1000 Schritte bleiben abgedeckt.
- **Keine aktuelle vollständige CI-Bestätigung:** NEXT-78 offen; keine neue veröffentlichungsreife Aufgabe. NEXT-79 nur Audit, keine UX-Implementierung.
- Kumulativ weiterhin fünf zuvor verifizierte, unveröffentlichte Aufgaben NEXT-63/64/66/67/68 seit Live-v0.1.55. Kein Merge, Release oder Publishing.

## Unreleased · 25.10.2026, 01:00 MESZ · NEXT-78 P0 in Verifikation, NEXT-79 Audit
- **Fix vorbereitet, noch nicht abgenommen:** Arena-Darstellung klemmt die sichtbaren Raptor-/Titan-Chassis inklusive Waffe und Energie-/Lebensbalken an allen vier Rändern und Ecken in den Viewport. Engine-Weltkoordinaten, Seeds und Replay bleiben unverändert; Inline-Rohwerte für bestehende Diagnosen erhalten.
- **Tests ergänzt (Ausführung der neuen vollständigen CI noch ausstehend):** Engine-Defensive an Rändern/Ecken, 1000-Schritt-Checks und Seeds 1/12/4711; Desktop-/Mobile-E2E mit 375px und 1280px, acht Grenzlagen und realem defensivem Kampf.
- **NEXT-79 Analyse:** Usability-Audit in `USABILITY_AUDIT.md` dokumentiert; UX-Änderungen noch offen.
- **Veröffentlichungsstatus:** Letztes bestätigtes Live-Release v0.1.55; fünf zuvor grün getestete NEXT-63/64/66/67/68 bleiben unveröffentlicht. NEXT-78/79 nicht als fertig markieren. **Kein Publishing, kein Merge.**

## Unreleased · 25.10.2026, 00:08 MESZ · NEXT-68 (nur Entwicklungsbranch)
- **NEXT-68 NEU vollständig implementiert und getestet:** Browser-lokale, explizit aktivierte Turnier-Zwischenspeicherung an Matchgrenzen. Validiertes Archiv (Version 1, 2-MB-Grenze), Wiederherstellung nach Browser-Reload per Benutzeraktion, Schutz gegen beschädigte/überlange Sicherungen und Speicherkontingentfehler, kein Netztransfer. Ausschalten löscht Sicherung und Einwilligung. Pause, Cancel und deterministische 16-Teilnehmer-Fortsetzung geprüft.
- **Refactoring:** Dateiimport und LocalStorage-Restore verwenden dieselbe validierte UI-Importfunktion; lokale Persistenz und Archivprüfung in eigenständiges Engine-Modul extrahiert.
- **CI #40137115159 auf c95aaf99 vollständig grün:** 372 Unit-/Behavior-/Regressionstests (31 Dateien), 92 Desktop-/Mobile-E2E, Typecheck/Build, 2 reproduzierbare Clean-Builds, npm audit 0 bekannte Advisories.
- **Letztes bestätigtes Live-Release v0.1.55:** Publish #40132737105 (echter Upload, Live-Verifikation und Deployment-Status erfolgreich), erneute Verifikation #40132968986. NEXT-56–62 sind veröffentlicht. **Kumulativ 5 sicher NICHT veröffentlichte Aufgaben seit v0.1.55:** NEXT-63, 64, 66, 67, **68 NEU**. NEXT-65 ist Duplikat von NEXT-59. Nur Draft-PR #48, kein Merge.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · 24.10.2026, 23:00 MESZ · NEXT-67 (nur Entwicklungsbranch)
- **NEU NEXT-67:** Isoliertes Replay abgeschlossener Round-Robin-Kämpfe aus Seed und eingefrorenen Teilnehmern, exakter Abgleich von Sieger/Ticks/Reststruktur mit archiviertem Ergebnis vor Laden; manipulierte oder ausstehende Kämpfe werden abgewiesen.
- Reines Engine-Modul `tournament-replay.ts`; Replay-Player wird wiederverwendet, ohne Sandbox oder Turnier-RNG zu berühren. Zugänglicher Button je abgeschlossenem Match, Desktop-/Mobile- und Tastaturbedienung.
- **Development Tests #40132151611 auf ddd26d15 grün:** 365 Unit-/Behavior-/Regressionstests, 86 Desktop-/Mobile-E2E, TypeScript/Build, npm-Audit und identische Clean-Builds. 1/3600 Ticks, 2/3/16 Teilnehmer, Archiv-Roundtrip, Fehlerfälle. 0 Ticks laut Turniermodell unzulässig.
- **Kumulativ 11 verifizierte NEXT-Aufgaben seit v0.1.54:** 56, 57, 58, 59, 60, 61, 62, 63, 64, 66, 67. NEXT-56–62: Veröffentlichungsstatus ungeklärt; NEXT-63/64/66/67: nur Draft-PR #48, nicht veröffentlicht. Nächstes Ziel NEXT-68.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · 24.10.2026, 22:00 MESZ · NEXT-64/66 (nur Draft-PR #48)
- **NEXT-64:** Reproduzierbares npm-Lockfile, saubere npm-ci-Installationen, Audit-Gate ohne bekannte Advisories und zweimaliger SHA256-identischer Dist-Build bei gleichem Commit.
- **NEXT-66:** Validierte Paarungsdetails (Seed, Ticks, Gewinner/Remis, Reststruktur) nach jedem Kampf, offene Matches ohne erfundene Ergebnisse, sichere Darstellung von Unicode-/HTML-Namen, Archiv-Roundtrip.
- **Qualität:** Development Tests #40128110261 auf e23323ef: 29 Testdateien, 358 Unit-/Behavior-/Regressionstests, 82 Desktop-/Mobil-E2E, TypeScript/Build, zweimaliger sauberer npm-ci-Install und byteidentischer Dist-SHA256 (1488f94b…), npm audit 0 bekannte Advisories; vollständig erfolgreich. Match-Details als reines Modul ausgegliedert und UI-Integration anschließend vollständig geprüft.
- **Kumulativ 10 seit v0.1.54 verifizierte Aufgaben:** NEXT-56–64 und NEXT-66; NEXT-65 war Duplikat. Letzte unabhängig bestätigte Live-Version v0.1.54 (#40111747415). main enthält v0.1.55 (809fe86c), aber kein neuer erfolgreicher Publish-Lauf wurde bestätigt; tatsächlicher Live-Status für NEXT-56–62 bleibt 'Veröffentlichungsstatus ungeklärt'. NEXT-63/64/66 sind ausschließlich auf dem Entwicklungsbranch / Draft-PR #48, sicher NICHT veröffentlicht.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsrunde 24.10.2026, 21:15 MESZ · NEXT-60, NEXT-62, NEXT-63 (maximal drei)
**Erfolgreich umgesetzt und getestet:** NEXT-60 (ausgeglichene A/B-Zuordnung im echten Runner, Archiv, Tabelle, 25-%-Biasgrenze und Golden-Digests), NEXT-62 (120-Match-Benchmark, CPU/Heap/Wall, UI-Automatik mit Event-Loop-Yield, Pause/Resume/Cancel), NEXT-63 (Fokus, Screenreader-Status, Kontrast, Touch, Doppelklick und ungültige Konfiguration). Refactoring: Fairness-Spielplan und tatsächliche Runner-Schedule vereinheitlicht; UI-Automatik in eigene Terminierung gekapselt. Nach Refactoring **Development Tests #40124222697 auf 01771371 erfolgreich**: 354 Unit/Behavior/Regression, 80 Desktop/Mobile-E2E, TypeScript/Build und npm audit 0 Befunde. Referenzbenchmark: 16 Teilnehmer/120 Kämpfe, Seed 4711/100 Ticks, 191,5 ms Wall, 233,9 ms CPU, +1,70 MiB Heap auf GitHub-CI (keine Endgerätegarantie).

**WICHTIGE VERÖFFENTLICHUNGSABWEICHUNG:** Während dieses Laufs wurde **PR #47 außerhalb dieses Laufs um 19:09:30 UTC gemergt**, danach auf main **v0.1.55** per Commit **809fe86c** eingetragen. Dieser Lauf hat **weder Merge noch Publish/Deployment ausgelöst**. Die tatsächliche Live-Veröffentlichung von v0.1.55 konnte nicht unabhängig bestätigt werden: **Veröffentlichungsstatus ungeklärt**. Letzte unabhängig bestätigte Live-Version bleibt v0.1.54 (Publish #40111747415). Aktueller Entwicklungsstand nach dem Merge ist ausschließlich **Draft-PR #48**, ohne Merge.

**Kumulativ seit dem letzten unabhängig bestätigten Live-Release v0.1.54: acht vollständig implementierte und getestete NEXT-Aufgaben:**
- **NEXT-56** · Deterministischer Round-Robin-Runner, Pause/Resume/Cancel. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-57** · K.-o.-Bracket mit Freilosen und Tie-Break. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-58** · Validiertes Turnierarchiv, Import/Export und Wiederaufnahme. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-59** · K.-o.-Browser-E2E, 16-Teilnehmer-Golden-Digests, Refactoring. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-60 – NEU in diesem Lauf verifiziert** · Faire A/B-Zuordnung und Side-Bias-Audit, Runner/Archiv/Tabellenintegration. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-61** · Versionierte Tabellenexporte CSV/JSON mit Formel-Schutz. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-62 – NEU** · Benchmark und nicht blockierende automatische Turnierausführung. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-63 – NEU** · Accessibility/Robustheit (375px, Touch, Fokus, Doppelklick, Invalid-Plan). **Tests grün**, **NICHT VERÖFFENTLICHT**, nur Draft-PR #48.
NEXT-65 ist ein bereits durch NEXT-59 erledigtes Duplikat und wird nicht zusätzlich gezählt. Nächste Aufgabe NEXT-64; detaillierter Rolling Backlog NEXT-66–71.

**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell** (gilt für den aktuellen unveröffentlichten Entwicklungsstand in Draft-PR #48). Kein publish.php, kein Release-Commit, kein Homepage-Update durch diesen Lauf.

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

# Changelog

## Unreleased · Qualitätsrunde 24.10.2026, 20:08 (nicht veröffentlicht)
- NEXT-56/57/58 vollständig implementiert und verifiziert; K.-o.-Bracket, Round-Robin-Runner, Turnier-JSON mit Browser-Import/Export und fehlerfreier Wiederaufnahme. NEXT-59/60 nur teilweise umgesetzt.
- Fehlende Engine-Testdateien durch Erweiterung der Vitest-Discovery aktiviert. Archiv-Endstatus validiert; importierte benutzerdefinierte Teilnehmer-IDs bleiben im Browser erhalten; korrupter Import bewahrt laufendes Turnier; sichere Zähler für Prototype-ähnliche IDs.
- Vitest 5.x ersetzt verwundbare Vitest-3.x-Abhängigkeiten. npm audit: 0 bekannte Schwachstellen. `Development Tests` #40119157124/#40119160281 auf 8dc5633a: 335 Unit/Behavior/Regression, 68 Desktop/Mobile, TypeScript, Build, Audit grün.
- Draft-PR #47, kein Merge, keine Website-Aktualisierung. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · NEXT-56 (vollständig getestet, nicht veröffentlicht)
- Separater, UI-unabhängiger Round-Robin-Runner führt Paarungen seriell mit den definierten Seeds und Ticklimits aus; immutable Ergebnis-Snapshots und deterministische Reihenfolge.
- Pause/Fortsetzen/Abbrechen ausschließlich an Matchgrenzen, bereits abgeschlossene Ergebnisse bleiben erhalten. Tests für 2/4/16 Teilnehmer, 120 Matches, Timeout, Seeds und Zustandsübergänge ergänzt. CI #40113922862 auf 453f5ef5 grün: 314 Unit-/Behavior-/Regressionstests, 64 Desktop-/Mobile-E2E, TypeScript und Build.
- **Nicht veröffentlicht**, Entwicklungsbranch und Draft-PR #47; kein Merge, kein Deployment.

## 0.1.54 – 2026-10-24 (erfolgreich veröffentlicht)
- Release v0.1.54 mit NEXT-40 und NEXT-44 bis NEXT-55 auf main integriert. Publish #40111747415: Upload, Live-Verifikation und Deployment-Status erfolgreich; Build-Commit 362f8bdb.
- Historische, unten stehende „Unreleased“-Abschnitte für NEXT-40 bis NEXT-55 beschreiben den Zustand vor dieser Veröffentlichung und sind jetzt Teil von v0.1.54.

## Unreleased · NEXT-55 (getestet, nicht veröffentlicht)
- Responsiver, eigenständiger Turnierdialog: 2–16 Teilnehmer mit Namens- und Presetwahl, sichere Eingabevalidierung, Round-Robin-Paarungen, Fortschrittsanzeige und Tabelle. Sandbox-Zustand und RNG bleiben unverändert.
- TypeScript-/Browser-Regressionen korrigiert, inklusive eindeutiger Eingabelabels. Development Tests #40110813524 auf SHA 9f17bc65 erfolgreich: 303 Unit-/Behavior-Tests, 64 Desktop-/Mobile-E2E, Typecheck/Build.
- Automatische Turnierausführung folgt in NEXT-56; kein Merge oder Deployment.

## Unreleased · NEXT-54 (getestet, nicht veröffentlicht)
- NEXT-54: Deterministische Round-Robin-Auswertung (3/1/0 Punkte, Spiele/Siege/Remis/Niederlagen, Reststruktur-Differenz, stabile Sortierung und unvollständige Turniere); doppelte/ungültige Match-IDs, Seeds, Teilnehmer und Reststruktur werden abgewiesen. Validierte Ergebnis-Snapshots sind unveränderlich. Development Tests #40109944097 auf Commit 431ee335: 303 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.
- NEXT-55 (Turnier-UI) und NEXT-56 (Runner) bleiben offen; keine Veröffentlichung.


## Unreleased · NEXT-51, NEXT-52 und NEXT-53 (getestet, nicht veröffentlicht)
- NEXT-51: `deepFreeze` als reines, gemeinsam verwendetes Modul ausgegliedert; Recorder-API bleibt kompatibel, Replay-Format und Rekonstruktion ohne Runtime-Recorder-Abhängigkeit. Immutable-Charakterisierung und vollständige Tests grün (#40105284320).
- NEXT-52: Validiertes, versioniertes und unveränderliches Turnierdatenmodell mit 2–16 Teilnehmern, Formaten Round Robin/K.-o., Seeds, Ticklimit und deterministischem JSON-Roundtrip. #40105438397: 290 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.
- NEXT-53: Round-Robin-Spielplan mit jeder Paarung genau einmal, stabiler Reihenfolge und Seed-Ableitung ohne globalen RNG; Tests für 2/3/4/16 Teilnehmer und Seed-Grenzen. #40105486356: 297 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.
- Noch keine Turnierausführung oder -oberfläche (NEXT-54 ff.); keine Veröffentlichung, main unverändert.

## Unreleased · NEXT-48, NEXT-49 und NEXT-50 (vollständig getestet, nicht veröffentlicht)
- NEXT-48: Grafische Replay-Zeitleiste mit deterministischem Seek in beide Richtungen, unabhängiger Arenaansicht, Struktur-/Energie-/Positionsrekonstruktion und reproduzierbaren Schuss-/Treffereffekten. Development Tests #40100789839: 274 Unit-/Behavior-Tests und 56 Desktop-/Mobile-E2E erfolgreich.
- NEXT-49: Ereignisbasierte A/B-Kampfstatistiken (Schüsse, Treffer, effektiver Schaden, Energieverbrauch), Deduplizierung, Überkill-Schutz, Sofortsieg, Timeout und 0 Ticks. Development Tests #40100953952: 281 Unit-/Behavior-Tests und 58 Desktop-/Mobile-E2E erfolgreich.
- NEXT-50: 48 Replay-Roundtrips (16 Strategiepaarungen × 3 Seeds) mit SHA-256-Vergleich von Events und Zuständen, beschädigten/fehlenden Frames, 2-MB-Grenze und Browser-Regressionen. Development Tests #40101113261: 284 Unit-/Behavior-Tests und 60 Desktop-/Mobile-E2E erfolgreich.
- Replay-Zustandsrekonstruktion und Statistik als reine, von der UI getrennte Module refaktoriert. Vollständiger Typecheck und Build erfolgreich. Alle drei Aufgaben bleiben unveröffentlicht; Live-Version v0.1.53 unverändert.

## Unreleased · NEXT-47 (implementiert und getestet, unveröffentlicht)
- Replay-Player mit Play/Pause, Einzelschritt, Reset und Endzustand; importierte Aufzeichnungen oder aktuellen Kampf im Replay-Dialog ereignisbasiert wiedergeben, ohne Engine oder RNG erneut auszuführen.
- Unit-/Behavior-Tests für leere, sofort beendete und 3600-Tick-Replays, deterministische Ereignisreihenfolge sowie Desktop-/Mobile-E2E für Dateiimport und unveränderten Live-Kampf erfolgreich: Development Tests #40096436278 (SHA 1b7413a), 268 Unit-/Verhaltenstests, 52 Desktop-/Mobile-E2E, Typecheck/Build grün.
- Grafische Zustandsrekonstruktion und Seek gehören erst zu NEXT-48; keine Veröffentlichung oder Deployment.


## Unreleased · NEXT-46 (implementiert und getestet, noch nicht veröffentlicht)
- Replay-Dialog mit JSON-Export des aktuellen Kampfs und Importvalidierung bis 2 MB; Live-Kampf bleibt bei gültigen und ungültigen Imports unverändert.
- Recorder-Snapshot refaktoriert; deterministische Dateinamen und Unit-/Behavior-/Desktop-/Mobile-Tests ergänzt. Development Tests #40092321506 auf Commit 556a2858 erfolgreich: 262 Unit-/Verhaltenstests, 50 Desktop-/Mobile-E2E, Typecheck und Build; Dokumentations-Head separat prüfen.
- Kein Merge, kein Deployment, keine Veröffentlichung.

## 0.1.54 – Freigabekandidat (noch nicht veröffentlicht) · NEXT-40, NEXT-44, NEXT-45
- NEXT-40: Energiereserve 0–100 % pro Roboter, zentrale Schussfreigabe, getrennte Konfiguration A/B und Default 0 % implementiert und geprüft.
- NEXT-40: Development Tests #40085113036 auf SHA 193f42d0 erfolgreich: 246 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build.
- NEXT-44: Append-only-Event-Recorder mit Seed, unveränderlichen Start-/End-Snapshots und Ereignissen pro Tick. Development Tests #40088595774 auf SHA 7df3cacc erfolgreich: 252 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build.
- NEXT-45: Replay-JSON schemaVersion 1, Arena-/Seed-/RobotDefinition-Metadaten, Tick-/Event-/Zustandsprüfung und JSON-Roundtrip implementiert. Development Tests #40088913689 auf SHA 9d6f719c: 258 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build grün. Drei NEXT-Aufgaben sind getestet und unveröffentlicht.
- Entwicklungstests durch Workflow-Namen `Development Tests` vom bisherigen Publish-Auslöser `CI` getrennt. Publish auf main ist noch automatisch konfiguriert.
- Release-Kandidat v0.1.54; Veröffentlichung erst nach Tests des finalen Heads und expliziter Freigabe.

## 0.1.53 – 2026-10-23
- Defensive hält Sicherheitsabstand bereits vor kritischem Schaden; ab standardmäßig 70 % Struktur kein Nachsetzen mehr (zuvor erst 35 %).
- Sicherheitsabstand bezieht sich auf die gegnerische Waffenreichweite und bleibt auf 95 % der eigenen begrenzt: Rückzug opfert nicht mehr die Schussmöglichkeit.
- Reine defensive Abstandspolitik gekapselt; Energie, Cooldown, Schaden, Tempo und andere Strategien unverändert.
- Frühzeitiger Rückzug beider Roboter, Schussfreigabe, Parametergrenzen und 100 feste Balance-Seeds getestet; 21 defensive Referenzstreams bewusst neu eingefroren, 27 andere Altversionsreferenzen bleiben unverändert.
- UI-Hinweise, Desktop-/Mobile-Regressionen und öffentliche Projektdokumentation ergänzt. NEXT-40 bleibt offen.

## 0.1.52 – 2026-10-23
- NEXT-39: unabhängige Strategieauswahl für A/B im Config-Dialog, mit korrekter Übernahme und Reset.
- NEXT-41: strategieabhängige Zielabstands-/Rückzugsparameter mit zentraler Validierung; ungültige Werte pausieren und sperren Match-Aktionen.
- NEXT-42: tatsächliche Strategien kompakt im Kampfstatus, ohne Konfigurationsfelder.
- NEXT-43: gemeinsame Strategie-Metadaten/Defaults refactort; 48 feste Zustands-/Event-Digests aus 0.1.51 sichern alle Paarungen und Seeds gegen Änderungen ab. Replay-Folgezyklus NEXT-44 bis NEXT-51 konkretisiert.
- NEXT-40 bleibt ausdrücklich offen: keine Energiereserve oder geänderte Schussfreigabe eingeführt.

## 0.1.51 – 2026-10-23
- Energiebalken direkt über beiden Robotern ergänzt; Verbrauch, Regeneration und gewählte Versorgung aktualisieren sie aus dem Match-State.
- Raptor-Körper wird getrennt von den Anzeigen beschnitten: Energie- und Lebensbalken von Robot A bleiben sichtbar, auch beim Chassiswechsel.
- Kampfstatus zeigt Energie zusätzlich als Balken; zugängliche Energiewerte mit aktuellem Wert und Maximum.
- Desktop-/Mobile-Regressionen prüfen tatsächliche Sichtbarkeit ohne Clipping, beide Chassis sowie Verbrauch, Regeneration, Konfigurationswechsel und Reset.
- Keine Änderung an der Engine; NEXT-39 bleibt der nächste Strategieschritt.

## 0.1.50 – 2026-10-23
- NEXT-36: Distanzstrategie nähert sich auf 90 % der effektiven Reichweite an und weicht bei Unterschreitung zurück.
- NEXT-37: Defensive Strategie zieht sich ab 35 % Struktur auf 110 % der größeren effektiven Waffenreichweite zurück; bei größerer Distanz kein Nachsetzen. Schüsse bleiben während des Rückzugs erlaubt, sofern Reichweite, Energie und Cooldown nach Bewegung passen.
- NEXT-38: Nahkampfstrategie schließt bis auf 20 % der effektiven Waffenreichweite auf; kein Rückzug. Kein zusätzlicher Nahkampfschaden oder neuer Waffentyp.
- Refactoring trennt reine Strategieentscheidung, gemeinsame Bewegungsgeometrie und Kampf-/Eventausführung. Überlappung löst deterministisches Ausweichen aus, stationäre Roboter erzeugen keine leeren Move-Events.
- Alle 16 Strategiepaarungen mit Seeds 1/12/4711 sowie feste Gewinner-/Endtick-/Reststruktur-Regressionen und Grenzfälle ergänzt. Aggressive Standardkämpfe bleiben unverändert.
- Nächster Schritt: NEXT-39 · Strategieauswahl im Config-Dialog.

## 0.1.49 – 2026-10-23
- NEXT-35: aggressive Zielannäherung als explizite Strategie mit 80 % der effektiven Waffenreichweite gekapselt.
- Bestehende Schussfreigabe nach Bewegung berücksichtigt weiterhin Reichweite, Regeneration, Energie und Cooldown. Default-Ergebnisse bleiben stabil.
- Gemeinsamer Auswahlkatalog bietet nur Aggressiv; UI übergibt den Default explizit und zeigt ihn in beiden Konfigurationsvorschauen. Vollständige Auswahl folgt in NEXT-39.
- Deterministische Verhaltenstests mit Seeds 1, 12 und 4711 sowie Desktop-/Mobile-Vorschautest ergänzt.
- Nächster Schritt: NEXT-36 · Distanzstrategie.

## 0.1.48 – 2026-10-08
- Formaler Abschluss von NEXT-34: RUN_STATE auf COMPLETE gesetzt und Release-Metadaten synchronisiert.
- Keine Änderung am Kampfverhalten. NEXT-35 bleibt der nächste Entwicklungsschritt.

## 0.1.47 – 2026-10-08
- NEXT-34: Strategietypen `aggressive`, `defensive`, `distance` und `melee` als Engine-Datenmodell eingeführt.
- Strategie wird explizit je Roboterkonfiguration gespeichert; bestehendes Kampfverhalten bleibt als Default unverändert.
- Unit-/Regressionstests sichern Default und Serialisierbarkeit ab.
- Nächster Schritt: NEXT-35 · Aggressive Strategie.

## 0.1.46 – 2026-10-07
- Planungs-/Publish-Reparatur vollständig abgeschlossen und RUN_STATE auf COMPLETE gesetzt.
- PR-Tests, Tests auf main und Veröffentlichung des exakt getesteten Stands als Release-Gates dokumentiert.
- NEXT-34 bleibt der nächste Entwicklungsschritt; keine Änderung am Spielverhalten.

## 0.1.45
- Planungszyklus nach NEXT-33 veröffentlicht.
- NEXT-34 bis NEXT-43 als zehn konkrete Strategiesystem-Schritte festgelegt.
- Rolling-Backlog-Regel ergänzt: spätestens bei weniger als fünf verbleibenden konkreten Schritten wird der Folgezyklus geplant.
- Keine Änderung am Spielverhalten.

## 0.1.44 – 2026-10-07

- recovery/finalization release for NEXT-33
- keeps the tested smooth robot movement unchanged
- aligns backlog, project state and public release metadata with the published version
- removes the stale fixed 18:00 next-run wording from project documentation

## 0.1.41 – 2026-10-07

- smoothly interpolates robot positions between deterministic simulation ticks
- preserves the engine's exact movement and combat calculations
- exposes deterministic position and speed state for browser behavior tests
- respects reduced-motion preferences
- covers movement on desktop and mobile

## 0.1.40 – 2026-10-07

- adds a live structure/health bar directly above each robot
- derives bar width from actual current structure versus configured maximum
- updates immediately with combat damage and highlights during hit feedback
- covers health-bar behavior on desktop and mobile
- advances to NEXT-33: visibly smooth robot movement

## 0.1.39 – 2026-10-07

- moves both robot builders into a dedicated responsive configuration dialog
- keeps the battle side panel focused on live combat status
- expands core simulation behavior coverage with six additional invariants
- preserves deterministic engine behavior and existing controls
- advances to NEXT-32: health bars above robots

## 0.1.38 – 2026-10-07

- visualizes Damage events as floating damage values at the target robot
- flashes the target robot briefly on a hit
- derives feedback directly from the deterministic event stream without changing combat logic
- covers hit and damage feedback on desktop and mobile
- advances to NEXT-31: move configuration into a dedicated dialog

## 0.1.37 – 2026-10-07

- renders Shot events as short-lived visible shot lines in the arena
- derives effects directly from the existing deterministic event stream
- keeps combat state and deterministic simulation behavior unchanged
- covers visible shot effects on desktop and mobile
- advances to NEXT-30: hit and damage effects

## 0.1.36 – 2026-10-07

- renders the selected weapon visibly on both robots
- gives Raptor and Titan distinct weapon silhouettes
- updates weapon visuals with the selected robot configuration
- keeps deterministic combat behavior unchanged
- covers visible weapons on desktop and mobile
- advances to NEXT-29: projectile and shot effects

## 0.1.35 – 2026-10-06

- fixes Start so a click advances the fight immediately and continues automatically
- fixes Reset so it stops the fight and restores tick 0, seed 4711 and default robot configurations
- adds 8 browser behavior scenarios executed on desktop and mobile
- adds 18 component-validation boundary tests
- expands the suite from 59 to at least 93 test executions
- keeps deterministic engine behavior covered
- advances to NEXT-28: visible weapons

## 0.1.34 – 2026-10-06

- recovery release for completed NEXT-26
- republishes the tested robot/chassis visual state under a fresh immutable release version
- keeps gameplay behavior unchanged
- aligns main SHA, tested state and published deployment
- advances to NEXT-27: visible weapons

## 0.1.32 – 2026-10-06

- makes Robot A and Robot B immediately distinguishable in the arena
- renders Raptor and Titan chassis with different silhouettes
- updates the arena visual when either chassis selection changes
- keeps deterministic combat behavior unchanged
- covers the visuals in desktop and mobile browser tests
- advances to NEXT-27: visible weapons

## 0.1.31 – 2026-10-06

- adds weights to robot components and weight limits to chassis
- rejects overweight robot configurations at the builder boundary
- shows current weight versus chassis limit live for both robots
- prevents match start for overweight configurations
- covers the rule in unit and desktop/mobile browser tests
- advances to NEXT-26: visible robot differentiation


## 0.1.30 – 2026-10-06

- adds sensor systems as selectable robot components
- adds standard, short-range and long-range sensor presets
- calculates sensor range live and lets short-range sensors limit effective weapon range
- exposes sensor selection for Robot A and Robot B
- covers sensor behavior in unit and desktop/mobile browser tests
- advances to NEXT-25: component weight limits


## 0.1.29 – 2026-10-06

- maintenance release for the completed NEXT-23 energy-supply step
- republishes the tested NEXT-23 state under a fresh immutable release version after the v0.1.28 release-path conflict
- keeps gameplay behavior unchanged
- includes the verified deployment-status mechanism for future release confirmation

## 0.1.28 – 2026-10-05

- adds energy supply as a selectable robot component
- adds standard, capacity and regeneration energy presets
- calculates energy capacity and regeneration from chassis and selected supply
- exposes energy selection for Robot A and Robot B
- covers energy behavior in unit and desktop/mobile browser tests
- advances to NEXT-24: sensors as a component


## 0.1.27 – 2026-10-05

- adds armor as a selectable robot component
- adds standard, light and heavy armor presets
- calculates robot structure from chassis and selected armor
- exposes armor selection for Robot A and Robot B
- covers armor behavior in unit and desktop/mobile browser tests
- advances to NEXT-23: energy supply as a component


## 0.1.26 – 2026-10-05

- adds motors as selectable robot components
- adds balanced, swift and heavy motor presets
- calculates robot speed from chassis and selected motor
- exposes motor selection for Robot A and Robot B
- covers motor behavior in unit and desktop/mobile browser tests
- advances to NEXT-22: armor as a component


## 0.1.25 – 2026-10-05

- enforces validation at the robot-builder boundary
- shows a validation state for Robot A and Robot B
- prevents match start when a configuration is invalid
- covers validation state in desktop and mobile browser tests
- advances to NEXT-21: motors as a component


## 0.1.24 – 2026-10-05

- extends chassis and weapon selection to Robot B
- shows calculated Robot B values live
- connects reset and match start to both selected robot configurations
- covers both component builders on desktop and mobile
- advances to NEXT-20: component validation and builder boundaries


## 0.1.23 – 2026-10-04

- makes chassis and weapon selection for Robot A visible in the arena UI
- shows calculated robot values live when the selected components change
- connects reset and match start to the selected Robot A configuration
- covers the component builder on desktop and mobile
- advances to NEXT-19: component selection for Robot B


## 0.1.22 – 2026-10-04

- introduces chassis and weapon as the first composable robot components
- migrates Raptor and Titan presets to component composition without changing combat behavior
- adds robot-configuration validation
- adds regression tests for preset compatibility and mixed component configurations
- advances to NEXT-18: visible component selection

## 0.1.21 – 2026-10-04

- extracts firing, hit and damage execution from updateRobot into fire()
- preserves energy, cooldown, damage jitter and event ordering
- keeps visible simulation behavior unchanged
- closes NEXT-16 and advances to the robot/component system in NEXT-17

## 0.1.20 – 2026-10-04

- extracts energy regeneration, cooldown countdown and movement into prepareAction()
- preserves existing deterministic behavior and event stream
- no visible gameplay change

## 0.1.19 – 2026-10-04

- centralizes firing eligibility in canFire()
- preserves characterized range, cooldown and energy behavior
- begins the safe engine refactoring phase

## 0.1.18 – 2026-10-04

- locks complete event streams deterministically for seeds 1, 12 and 4711
- characterizes stable event count of 98 for representative fixed seeds
- adds regression protection against unnoticed event-stream changes
- advances backlog to NEXT-14


## 0.1.17 – 2026-10-04

- characterizes stable per-tick event ordering for two acting robots
- locks Shot → Hit → Damage ordering per robot
- advances backlog to NEXT-13


## 0.1.16 – 2026-10-04

- characterizes cooldown countdown across multiple ticks
- verifies firing occurs on the first tick cooldown reaches zero
- keeps exact range-boundary behavior covered
- advances backlog to NEXT-12


## 0.1.15 – 2026-10-04

- reviews core simulation rule coverage before refactoring
- adds exact range-boundary characterization
- adds cooldown=1 firing characterization
- identifies updateRobot action-condition duplication as a later refactoring target
- advances backlog to NEXT-11


## 0.1.14 – 2026-10-04

- adds fixed regression seeds 1, 12 and 4711
- locks winner, end tick and remaining structure for representative matches
- advances backlog to NEXT-10


## 0.1.13 – 2026-10-04

- clamps robot movement to arena x/y boundaries
- covers extreme speed and identical-position movement cases
- advances backlog to NEXT-09


## 0.1.12 – 2026-10-04

- hardens energy regeneration and spending behavior with characterization tests
- verifies regeneration clamps at maxEnergy
- verifies weapon energy is spent after tick regeneration
- advances the rolling backlog to NEXT-08


## 0.1.11 – 2026-10-04

- adds explicit match outcome and end reason for timeout draws
- a victory on the last permitted tick takes precedence over timeout
- timeout states stay frozen on later simulation steps
- fixed-seed timeout regressions cover tick limit 0 and 1
- fifth-cycle test review completed; rolling backlog advances to NEXT-07
- public testsuite adds TIME-001 through TIME-003


## 0.1.10 – 2026-10-04

- adds explicit VictoryEvent with winner, loser and tick
- match ends immediately when a robot reaches zero structure
- destroyed robot cannot act later in the same tick
- finished match state stays frozen and emits no further events
- public testsuite adds EVT-005, END-001 and END-002
- rolling backlog advances to NEXT-06


## 0.1.9 – 2026-10-03

- successful shots emit separate HitEvents and DamageEvents
- DamageEvents report actually applied non-negative damage
- structure is clamped at zero; overkill is capped at remaining structure
- fixed-seed regression secures deterministic damage jitter
- public testsuite adds HIT-001 and DMG-001 through DMG-003
- rolling backlog advances to NEXT-05
- publish follows one-commit ticker principle


## 0.1.8 – 2026-10-03

- simulation emits explicit ShotEvents when range, energy and cooldown allow firing
- ShotEvents contain tick, attacker, target and energy cost
- behavior tests cover valid firing plus blocked firing by range, energy and cooldown
- public testsuite adds SHOT-001 through SHOT-004
- rolling backlog advances to NEXT-04 and adds NEXT-13

## 0.1.7 – 2026-10-03

- simulation emits explicit movement events
- move events contain tick, robot id, previous position and new position
- new stepMatchWithEvents API preserves existing stepMatch behavior
- behavior tests cover movement-event generation, per-tick speed limit and input-state immutability
- public testsuite adds MOV-001 through MOV-003
- rolling backlog advances to NEXT-03 and adds NEXT-12

## 0.1.6 – 2026-10-03

- separates combat event model from simulation state
- adds Move, Shot, Hit and Damage event types
- adds event factory functions and four unit tests for event creation
- public testsuite documents EVT-001 through EVT-004
- rolling backlog advances to NEXT-02 and adds NEXT-11
- E2E verifies event-test documentation and updated backlog order

## 0.1.5 – 2026-10-03

- Engine-Verhaltenstests für Initialzustand, Tick, Immutability, Bewegung, Energie, Struktur und Kampfende ergänzt
- TEST_STRATEGY.md als verbindliche Refactoring-Teststrategie eingeführt
- Rolling Backlog mit NEXT-01 bis NEXT-10 konkretisiert
- öffentliche Testsuite um neue Behavior-Testfälle erweitert
- öffentliche Backlog-Seite zeigt mehrere konkrete Folgeschritte
- E2E prüft Testsuite-Ausbau und konkrete Backlog-Reihenfolge

## 0.1.4 – 2026-10-03

- öffentliche Testsuite auf echte Testfalldokumentation umgestellt
- strukturierte Bereiche: statische Qualität, Engine/Regression, Desktop-E2E, Mobile-E2E, Deployment-Smoke
- Testfälle mit Test-ID, Bereich, Prüfinhalt und Ergebnis dokumentiert
- Entwicklungsablauf aus der Testsuite entfernt; bleibt in protokoll.md
- E2E-Test an die neue Testsuite-Struktur angepasst

## 0.1.3 – 2026-10-03

- öffentliche Testsuite zum ausführlichen 20-Punkte-Laufprotokoll erweitert
- Fehler, Auffälligkeiten, Refactoring, CI, Publish und Online-Smoke-Test werden sichtbar dokumentiert
- Daily- und UI-Anforderungen entsprechend verbindlich erweitert
- E2E-Test prüft die ausführliche Testsuite-Dokumentation

## 0.1.2 – 2026-10-03

- professioneller Footer mit Testsuite, Release Notes und Backlog
- tatsächlicher Publish-Zeitpunkt im Footer
- nächster geplanter 18-Uhr-Lauf im Backlog und Footer
- öffentliche Testsuite mit Typecheck-, Unit-, Build-, Desktop- und Mobile-E2E-Status
- kumulierende HTML-Release-Notes
- öffentliche Roadmap/Backlog-Seite
- Playwright-Abdeckung für Footer und Informationsseiten
- Publish-Sperre: Veröffentlichung nur noch beim ausdrücklich markierten Release-Commit
- Build-Metadaten mit Version, Commit, Buildzeit und nächstem Lauf

## 0.1.1 – 2026-10-03

- Footer-Grundstruktur
- öffentliche Versionsdarstellung bereinigt
- interne Bootstrap-Beschriftung entfernt

## 0.1.0 – 2026-10-03

- Vite-/TypeScript-Grundgerüst
- deterministische Seed-Quelle
- minimale Kampfengine mit Raptor und Titan
- responsive Desktop-/Mobile-Oberfläche
- Unit-/Regressionstests
- Playwright Smoke-Test
- GitHub Actions CI
- automatischer versionierter Publish
