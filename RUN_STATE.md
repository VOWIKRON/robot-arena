## Entwicklungsrunde 25.10.2026, 00:08 MESZ · NEXT-68 NEU vollständig verifiziert · KEIN PUBLISHING
- **Aktuelle Runde (1 von maximal 3 Aufgaben): NEXT-68 NEU abgeschlossen.** Opt-in-Browser-Autosave ausschließlich lokal, nur an validierten Match-/Statusgrenzen; versioniertes 2-MB-Archiv, persistente Einwilligung, explizites Wiederherstellen nach Reload, vollständiges Löschen bei Deaktivierung. Fehlerhafte/zu große Daten verändern das laufende Turnier nicht. Pausierte und abgebrochene Turniere behalten ihren Status; kein automatischer Start nach Wiederherstellung.
- **Qualität:** Development Tests **#40137115159 auf c95aaf99 erfolgreich:** **372 Unit-/Behavior-/Regressionstests in 31 Dateien, 92 Desktop-/Mobile-E2E**, TypeScript, Build, npm-Audit-Gate (0 bekannte Advisories), zweimaliger Clean-Build mit identischem SHA256. NEXT-68: 7 neue Unit-Tests und 6 neue Desktop-/Mobile-E2E; 2/3/16 Teilnehmer, 120 Matches, manipulierte Version/Fortschritt, >2 MB, Quota-Fehler, Reload/Pause/Cancel, Datenschutz.
- **Refactoring:** Ein gemeinsamer validierter Importpfad für JSON-Datei und lokale Wiederherstellung; Speicherung/Validierung in reinem, speicherinjiziertem Modul `src/engine/tournament-local-save.ts` statt direkt im UI. Danach komplette CI erfolgreich.
- **Letztes bestätigtes Release: v0.1.55**, Publish **#40132737105** (Upload + Live-Verifikation + Deployment-Status erfolgreich) und erneute Live-Verifikation **#40132968986**. NEXT-56–62 gehören zu v0.1.55 und werden **nicht** mehr als unveröffentlicht gezählt.
- **Kumulativ seit v0.1.55: genau 5 vollständig implementierte, getestete und NICHT veröffentlichte NEXT-Aufgaben:** 
  - **NEXT-63** · Zugänglichkeit, Fokus, Touch, robuste Turnierbedienung · **Tests grün**, nur Draft-PR #48, **NICHT VERÖFFENTLICHT**.
  - **NEXT-64** · Lockfile, npm ci, Sicherheitsgate, reproduzierbare Builds · **Tests grün**, nur Draft-PR #48, **NICHT VERÖFFENTLICHT**.
  - **NEXT-66** · Validierte Matchdetails mit Seed/Ticks/Sieger/Reststruktur · **Tests grün**, nur Draft-PR #48, **NICHT VERÖFFENTLICHT**.
  - **NEXT-67** · Isoliertes deterministisches Turnierkampf-Replay · **Tests grün**, nur Draft-PR #48, **NICHT VERÖFFENTLICHT**.
  - **NEXT-68 – NEU** · Opt-in-LocalStorage-Sicherung und sichere Wiederaufnahme · **Tests grün**, nur Draft-PR #48, **NICHT VERÖFFENTLICHT**.
- **GitHub:** Branch `automation/next-56-tournament-runner-unpublished`, **Draft-PR #48**, kein Merge nach main. NEXT-65 ist in NEXT-59 enthalten und wird nicht separat gezählt. **Nächster Schritt NEXT-69**, danach NEXT-70/71; Rolling Backlog bis NEXT-77. **Keine technischen Blocker.**
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Weder publish.php noch Release-Commit, Merge, Homepage-Update oder Deployment ausgelöst.

## Entwicklungsrunde 24.10.2026, 23:00 MESZ · NEXT-67 vollständig verifiziert · KEIN PUBLISHING
- **Aktuelle Runde (1 von maximal 3 Aufgaben): NEXT-67 NEU abgeschlossen.** Isoliertes deterministisches Replay abgeschlossener Round-Robin-Kämpfe aus eingefrorenen Turnierteilnehmern und Original-Seed. Vergleich der tatsächlichen Sieger-, Tick- und Reststrukturwerte gegen das Archiv vor Wiedergabe; manipulierte Ergebnisse und offene Kämpfe werden abgewiesen. Replay-Player und Sandbox/Turnierlauf bleiben getrennt. Tastatur- und Mobile-E2E vorhanden.
- **Vollständige Development Tests #40132151611 auf ddd26d15 erfolgreich:** 30 Testdateien / **365 Unit-, Behavior- und Regressionstests**, **86 Desktop-/Mobil-E2E**, TypeScript, Build, npm-Audit und zwei byteidentische Clean-Builds (Dist-SHA256 b328d073…). 1- und 3600-Tick-Grenzfälle, 2/3/16 Teilnehmer, Archiv-Roundtrip, Manipulations- und Isolationsprüfungen. 0 Ticks sind laut Turniermodell unzulässig und werden explizit abgewiesen.
- **Refactoring:** Replay-Erzeugung und Archiv-Ergebnisvergleich in reines Engine-Modul `src/engine/tournament-replay.ts` ausgelagert; UI nutzt nur dessen validierte ReplayDocument-Schnittstelle und vorhandenen Player.
- **Kumulativ seit letzter unabhängig bestätigter Veröffentlichung v0.1.54: 11 vollständig getestete Aufgaben:** NEXT-56, 57, 58, 59, 60, 61, 62, 63, 64, 66, **67 (NEU)**. NEXT-65 ist in NEXT-59 enthalten und wird nicht doppelt gezählt.
- **Veröffentlichungsstatus:** NEXT-56 bis 62 befinden sich in main v0.1.55, Homepage-Status weiterhin **Veröffentlichungsstatus ungeklärt**. **NEXT-63, 64, 66, 67 sind sicher nicht veröffentlicht** (ausschließlich Entwicklungsbranch / Draft-PR #48). Letzter unabhängig bestätigter Live-Publish v0.1.54 (#40111747415).
- **GitHub:** Entwicklungsbranch `automation/next-56-tournament-runner-unpublished`, Draft-PR #48. Kein Merge auf main, kein Release-Commit, kein Publish-/Deploy-Workflow und kein Homepage-Upload durch diese Runde. **Nächstes Ziel NEXT-68**, danach NEXT-69/70; Rolling Backlog bis NEXT-74 vorhanden. Keine technischen Blocker; Live-Status von v0.1.55 ungeklärt.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsrunde 24.10.2026, 22:00 MESZ · NEXT-64 und NEXT-66 · KEIN PUBLISHING
- **Aktuelle Runde (2/3 Aufgaben):** NEXT-64 und NEXT-66 vollständig implementiert und getestet; NEXT-67 folgt. NEXT-65 ist das bereits in NEXT-59 enthaltene Duplikat, nicht zusätzlich zählen.
- **NEXT-64:** package-lock.json aus realem npm-Install auf CI erzeugt, npm ci mit Cache nach Lockfile, Audit-Gate 0 Advisories, zweimaliger sauberer Install/Build auf identischem SHA, identischer Dist-SHA256.
- **NEXT-66:** reines immutable Modul für validierte Paarungsdetails, kein erfundener Wert für offene Spiele, sichere Unicode/HTML-Namen über textContent, Import/Export-Roundtrip, Draw/Timeout, 2/16 Teilnehmer, Desktop/Mobil.
- **Tests/Refactoring:** Development Tests #40128110261 auf e23323ef: 29 Testdateien, 358 Unit-/Behavior-/Regressionstests, 82 Desktop-/Mobil-E2E, TypeScript/Build, zweimaliger sauberer npm-ci-Install und byteidentischer Dist-SHA256 (1488f94b…), npm audit 0 bekannte Advisories; vollständig erfolgreich. Refactoring: Match-Detailableitung von der DOM-Anzeige entkoppelt; temporären CI-Lockfile-Export wieder entfernt.
- **Kumulativ seit v0.1.54: 10 vollständig implementierte und getestete NEXT-Aufgaben (56–64 ohne Duplikat 65, plus 66).** Sieben davon sind in main, aber Live-Status ungeklärt; drei sicher nur im Draft-PR.
- **NEXT-56** · Deterministischer Round-Robin-Runner, Pause/Resume/Cancel. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-57** · K.-o.-Bracket, Freilose und Tie-Break. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-58** · Validiertes Turnierarchiv, Import/Export und Wiederaufnahme. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-59** · K.-o.-Browser, 16er-Golden-Referenzen und Refactoring. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-60** · Faire A/B-Seiten und Side-Bias-Audit. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-61** · Tabellenexport CSV/JSON mit Formel-Schutz. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-62** · 120-Match-Benchmark und nicht blockierende Turnierautomatik. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-63** · Zugängliche robuste Turnierbedienung. **Tests grün** (Development Tests #40128110261 auf e23323ef). nur Draft-PR #48 – NICHT VERÖFFENTLICHT.
- **NEXT-64 – NEU** · Lockfile, npm ci, Audit-Gate und doppelte deterministische Builds. **Tests grün** (Development Tests #40128110261 auf e23323ef). NEU, nur Draft-PR #48 – NICHT VERÖFFENTLICHT.
- **NEXT-66 – NEU** · Match-Detailanzeige für Seeds/Ticks/Sieger/Reststruktur und offene Kämpfe. **Tests grün** (Development Tests #40128110261 auf e23323ef). NEU, nur Draft-PR #48 – NICHT VERÖFFENTLICHT.
- **Veröffentlichung:** Letzte unabhängig bestätigte Live-Version v0.1.54 (#40111747415). main enthält v0.1.55 (809fe86c), aber kein neuer erfolgreicher Publish-Lauf wurde bestätigt; tatsächlicher Live-Status für NEXT-56–62 bleibt 'Veröffentlichungsstatus ungeklärt'. NEXT-63/64/66 sind ausschließlich auf dem Entwicklungsbranch / Draft-PR #48, sicher NICHT veröffentlicht.
- **GitHub:** Entwicklungsbranch `automation/next-56-tournament-runner-unpublished`, Draft-PR #48; kein Merge, kein Release-Commit, kein publish.php, keine Homepage-Aktualisierung durch diese Runde.
- **Blocker:** keine technischen; unabhängige Prüfung der tatsächlichen Live-Version weiterhin nicht möglich. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

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
