## NEXT-71 · Kombinierte QA-Erweiterung · 25.10.2026, 20:00 MEZ · NICHT VERÖFFENTLICHT
- **Aktuelle Runde:** NEXT-71 priorisiert, 79e weiterhin offen (echte NVDA-/VoiceOver-/Touch-/Kontrast-Abnahme fehlt), NEXT-74 noch nicht begonnen.
- **NEU:** Branch `feature/NEXT-71-combined-validation`, Draft-PR #59 gegen `qa/NEXT-71-combined-integration` (NICHT gegen main). Zusätzlicher Playwright-Behavior-Test `e2e/next-71-saved-preset-match-export.spec.ts`: Roboterpreset speichern → Seite neu laden → Turnier erstellen → Archiv-Roboterdaten prüfen → Kampf abschließen → Match-JSON prüfen. Läuft auf Desktop und Mobil, sofern isolierte QA erfolgreich abgeschlossen wird.
- **CI-Gate:** Workflow `Isolated Feature QA – no publishing` ist auf dem QA-Zielbranch konfiguriert; aktueller PR-Head wurde noch NICHT als vollständig grün nachgewiesen. Daher NEXT-71 weiterhin offen. Keine lokalen Node-/Browser-Tests möglich (GitHub-DNS im Container nicht erreichbar).
- **Refactoring/Qualität:** Keine produktive Engine-Änderung in dieser Runde; gezielter integrativer Behavior-Test, Schreib-Readback verifiziert. Vor Abschluss kombinierte Typecheck-, Audit-, Unit-/Behavior-/Regression-/Determinismus-, Build- und Desktop-/Mobil-Ergebnisse prüfen.
- **Kumulativ seit bestätigter Live-Version v0.1.56: genau 2 vollständig isoliert getestete, aber UNVERÖFFENTLICHTE NEXT-Aufgaben:** NEXT-69 (391 Unit + 134 Browser) und NEXT-70 (387 Unit + 130 Browser). **Neu abgeschlossen: 0.** NEXT-71, NEXT-79e und NEXT-74 nicht als fertig zählen.
- **Rolling Backlog:** P0 kombinierte QA PR #59 auswerten → bei Fehlern auf demselben NEXT-71-Branch beheben und erneut testen → NEXT-79e manuelle Abnahme mit Befundprotokoll → NEXT-74 auf eigenem Branch: Größenlimits, Duplikate, Prototyp-Schlüssel, tiefe Objekte, nicht endliche Zahlen, Zustandsintegrität und Fuzz-/Property-/Browser-Tests.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Keine Änderung an main, Homepage, publish.php oder Publishing-Workflows.

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
