## Entwicklungsrunde 24.10.2026, 22:00 MESZ · NEXT-64/66 verifiziert (ohne Publishing)
Development Tests #40128110261 auf e23323ef: 29 Testdateien, 358 Unit-/Behavior-/Regressionstests, 82 Desktop-/Mobil-E2E, TypeScript/Build, zweimaliger sauberer npm-ci-Install und byteidentischer Dist-SHA256 (1488f94b…), npm audit 0 bekannte Advisories; vollständig erfolgreich.
NEXT-64: festes npm-Lockfile, npm ci, 2 identische Dist-Builds und Sicherheitsgate. NEXT-66: validierte unveränderliche Match-Details, Unicode/HTML-Sicherheit, Pending/Draw/Timeout, Desktop/Mobil. Beide vollständig und neu abgeschlossen; NEXT-67 folgt. Refactoring: reine Engine-Details von UI getrennt.
**Kumulativ 10 verifizierte NEXT-Aufgaben seit v0.1.54: 56–64 und 66 (NEXT-65 ist Duplikat).** NEXT-56–62: Veröffentlichungsstatus ungeklärt; NEXT-63/64/66: nur Draft-PR #48, NICHT VERÖFFENTLICHT. Letzte unabhängig bestätigte Live-Version v0.1.54 (#40111747415). main enthält v0.1.55 (809fe86c), aber kein neuer erfolgreicher Publish-Lauf wurde bestätigt; tatsächlicher Live-Status für NEXT-56–62 bleibt 'Veröffentlichungsstatus ungeklärt'. NEXT-63/64/66 sind ausschließlich auf dem Entwicklungsbranch / Draft-PR #48, sicher NICHT veröffentlicht.
**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

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

## Neuer Entwicklungsstand · 24.10.2026, 18:56 Europe/Berlin
- **Release v0.1.54 erfolgreich veröffentlicht und von GitHub Actions verifiziert:** Publish #40111747415, Commit 362f8bdb (Upload, Live-Checks, Deployment-Status grün). Die 13 NEXT-Aufgaben 40 und 44–55 gehören nun zum veröffentlichten Basisstand.
- Neue unveröffentlichte Entwicklung auf Branch automation/next-56-tournament-runner-unpublished, Draft-PR #47, ohne Merge/Deployment.
- NEXT-56 implementiert und verifiziert: CI #40113922862, 314 Unit-/Behavior-/Regressionstests und 64 Desktop-/Mobile-E2E sowie TypeScript/Build erfolgreich. Serienausführung pro Match, immutable Snapshots, Pause/Resume/Cancel, deterministische Seeds.
- Ab NEXT-56 zählt der neue kumulative unveröffentlichte Stand; aktuell **1 bestätigte, unveröffentlichte Aufgabe: NEXT-56**.
- Nach NEXT-56 folgen NEXT-57 K.-o.-Bracket, NEXT-58 Turnier-Import/-Export, NEXT-59 Browser-Integration und E2E.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unveröffentlichte Entwicklungsfortsetzung (24.10.2026, 18:12 Europe/Berlin)
- NEXT-55 abgeschlossen: unabhängiger responsiver Turnierdialog, 2–16 benennbare Teilnehmer mit Raptor/Titan-Presets, Seed/Ticklimit-Validierung, Round-Robin-Paarungen, Fortschritt und Tabelle. Noch keine automatische Turnierausführung.
- Browser-Regression für mehrdeutiges Seed-Label behoben; TypeScript-Tupeltyp korrigiert; vollständiger Testlauf #40110813524 auf SHA 9f17bc65 grün (303 Unit/Behavior, 64 Desktop/Mobile, Typecheck/Build).
- Kumulativ 13 unveröffentlichte Aufgaben seit v0.1.53 (NEXT-40, 44–55). Nächster Schritt NEXT-56; PR #46 Draft, main unverändert, kein Publish/Deployment.
- Veröffentlichungsstatus der externen Homepage unabhängig ungeklärt; **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell**.

## Unveröffentlichte Entwicklungsrunde (24.10.2026, 18:00 Europe/Berlin)
- NEXT-54: Deterministische Round-Robin-Auswertung (3/1/0 Punkte, Spiele/Siege/Remis/Niederlagen, Reststruktur-Differenz, stabile Sortierung und unvollständige Turniere); doppelte/ungültige Match-IDs, Seeds, Teilnehmer und Reststruktur werden abgewiesen. Validierte Ergebnis-Snapshots sind unveränderlich. Development Tests #40109944097 auf Commit 431ee335: 303 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.
- Kumulativ 12 getestete Aufgaben seit v0.1.53, NICHT VERÖFFENTLICHT: NEXT-40, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54.
- Nächster Schritt NEXT-55; Rolling Backlog NEXT-55 bis NEXT-63. PR #46 Draft, main unverändert, kein Publish/Deployment.
- Vollständige Development Tests nach Dokumentationsänderungen #40110105950 auf a6eb67d0 grün.

## Unveröffentlichte Entwicklungsrunde (24.10.2026, 17:00 Europe/Berlin)
- NEXT-51 abgeschlossen: `deepFreeze` aus Recorder in `src/engine/immutable.ts` extrahiert; Replay-Format/State ohne Runtime-Abhängigkeit vom Recorder; Recorder-Export rückwärtskompatibel. Charakterisierungstests und vollständige CI #40105284320 grün.
- NEXT-52 abgeschlossen: unveränderliches, validiertes Turniermodell für 2–16 Teilnehmer, Format, Seed, maxTicks und JSON-Roundtrip; doppelte IDs/ungültige Werte abgewiesen. #40105438397 grün: 290 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E.
- NEXT-53 abgeschlossen: deterministische Round-Robin-Paarungen und Seeds, 2/3/4/16 Teilnehmer, keine Duplikate/Selbstpaarungen, sichere Seeds bis MAX_SAFE_INTEGER. #40105486356 grün: 297 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E.
- Kumulativ 11 implementierte und vollständig getestete Aufgaben seit v0.1.53, NICHT VERÖFFENTLICHT: NEXT-40, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53.
- Nächster Schritt: NEXT-54 Turnierauswertung. PR #46 Draft, main unverändert, kein Publish/Deployment.

# PROJECT_STATE

## Aktuelle unveröffentlichte Entwicklungsrunde (24.10.2026, 16:00 Europe/Berlin)
- NEXT-48: Eventbasierte, unveränderliche Zustandsrekonstruktion und Seek-Zeitleiste mit Position, Energie, Struktur, Schuss-/Treffereffekten; Tastatur und Mobile-Touch getestet. Development Tests #40100789839: 274 Unit-/Behavior-Tests, 56 Desktop-/Mobile-E2E, Typecheck/Build grün.
- NEXT-49: Reine Replay-Statistik (Schüsse, Treffer, effektiver Schaden, Energieverbrauch), Deduplizierung und Überkill-Begrenzung; responsiver A/B-Vergleich. Development Tests #40100953952: 281 Unit-/Behavior-Tests, 58 Desktop-/Mobile-E2E, Typecheck/Build grün.
- NEXT-50: 16 Strategiepaarungen × Seeds 1/12/4711, JSON-Roundtrip, Event-/Zustands-Digests, korrupte/übergroße Imports, Desktop-/Mobile-Regressionen. Development Tests #40101113261: 284 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.
- Refactoring: Replay-Zustandsrekonstruktion und Kampfauswertung als getrennte, RNG-freie Engine-Module; UI verwendet nur diese Modelle. Danach vollständige Tests erfolgreich.
- Kumulativ 8 vollständig getestete, unveröffentlichte Aufgaben seit v0.1.53: NEXT-40, NEXT-44, NEXT-45, NEXT-46, NEXT-47, NEXT-48, NEXT-49, NEXT-50.
- Nächster Schritt: NEXT-51 · Replay-Refactoring/Turnierplanung. Hauptbranch und stabile Version v0.1.53 unverändert; PR #46 Draft, kein Merge, kein Publish.

## Unveröffentlichte Entwicklung NEXT-47 (24.10.2026, vollständig getestet)
- Eventbasierter Replay-Player ohne RNG/Engine-Simulation auf Entwicklungsbranch implementiert; Play/Pause/Step/Reset, Ereignisanzeige und Laden importierter Dateien bzw. des aktuellen Kampfes.
- Separate Replay-Uhr; der laufende Sandbox-Kampf wird durch Import und Wiedergabe nicht verändert.
- Unit-/Behavior-/Regressionstests für 0/1/3600 Ticks, Sofortsieg, Pause, Ende und deterministische Wiedergabe; Desktop-/Mobile-E2E für Dialog und Dateiimport ergänzt.
- Development Tests #40096436278 auf Code-SHA 1b7413a grün: 268 Unit-/Verhaltenstests, 52 Desktop-/Mobile-E2E, Typecheck und Build. NEXT-47 abgeschlossen; finale Dokumentationsänderungen separat prüfen.
- Kumulativ bereits verifiziert, aber nicht veröffentlicht: NEXT-40, NEXT-44, NEXT-45, NEXT-46, NEXT-47 (5).
- Stabile Version auf main: 0.1.53; PR #46 Draft, kein Merge/Publish.

## Aktueller Stand

- Projektphase: Strategiesystem stabil auf main; unveröffentlichte Energieverwaltung, Recorder und Replay-Format fertig getestet; Replay-Import/-Export auf Entwicklungsbranch implementiert und getestet
- Aktuelle stabile Version: 0.1.53
- Branch: main
- CI: aktiv
- Auto-Publish: aktiv
- Publish-Gate: grüne CI + neue, noch nicht live befindliche Version
- Versionierte Releases: aktiv
- Desktop-E2E: aktiv
- Mobile-E2E: aktiv

## Öffentliche Projektinformationen

Umgesetzt:
- professioneller Footer,
- Testsuite-HTML als strukturierte Testfalldokumentation,
- kumulierende Release Notes,
- öffentliche Backlog-/Roadmap-Seite,
- tatsächlicher Publish-Zeitpunkt,
- nächster planmäßiger Lauf gemäß aktiver Automation,
- Version, Commit und Buildzeit über Build-Metadaten.

## Qualitätszähler

- Entwicklungszyklen seit Test-Review: 0
- Entwicklungszyklen seit Refactoring: 0
- Entwicklungszyklen seit Architektur-Review: 16

## Öffentliche Metadaten

Beim Publish werden gepflegt:
- version
- commit
- builtAt
- published
- nextRunAt
- Status der verpflichtenden Qualitätsgates

## Energieanzeigen-Bugfix

0.1.51 veröffentlicht: trennt die Raptor-Form von Energie-/Lebensbalken und zeigt die aktuelle Energie direkt an beiden Robotern sowie im Kampfstatus. Browser-Regressionen prüfen tatsächliche Darstellung (Hit-Test statt nur DOM-Sichtbarkeit), Chassiswechsel, Verbrauch/Regeneration, Konfiguration und Reset. Keine Engine-Änderung. PR-/main-CI grün: 191 Unit-/Verhaltenstests und 36 Desktop-/Mobile-E2E. Publish und Online-Smoke erfolgreich; Produktcommit 1213296167558f6f8ab2d3525879034521902a6d.

Fälliger Test-Review: toBeVisible allein erkennt Clipping nicht. Neue Paint-Hit-Tests und Energie-Lebenszyklustests sichern beide Roboter und Chassis ab. CI prüft den tatsächlichen Chromium-Start vor einer optionalen Paketinstallation; ältere CI-Stände dürfen nicht mehr veröffentlichen.

## Nächster Entwicklungsschritt

NEXT-34 abgeschlossen: Strategietypen `aggressive`, `defensive`, `distance` und `melee` sind als Engine-Datenmodell vorhanden. Jede Roboterkonfiguration trägt eine explizite Strategie; das bisherige Kampfverhalten bleibt über den Default unverändert. Unit-/Regressionstests sichern Default und Serialisierbarkeit ab.

NEXT-35 abgeschlossen und veröffentlicht: explizite aggressive Bewegungspolitik mit Zielabstand 80 % der effektiven Waffenreichweite; Annäherung auch während Cooldown/Energiemangel, Schussfreigabe nach Bewegung weiterhin zentral. Die Default-Kampfergebnisse bleiben kompatibel. Gemeinsamer Katalog ausschließlich implementierter Strategien und expliziter UI-Default bereiten NEXT-39 vor; Vorschau zeigt Aggressiv für A/B.

NEXT-36 bis NEXT-38 abgeschlossen und veröffentlicht: Distanz hält 90 % der effektiven Reichweite durch Annäherung/Rückzug. Defensiv greift bei mehr als 35 % Struktur wie Aggressiv an; ab 35 % Rückzug auf 110 % der größeren effektiven Waffenreichweite beider Roboter, ohne erneutes Nachsetzen. Nahkampf schließt bis auf 20 % der effektiven Waffenreichweite auf, ohne Rückzug. Schussfreigabe nach Bewegung bleibt zentral und gilt auch während Rückzug.

Refactoring: reine Strategieentscheidung (signierte Bewegung), gemeinsame reine Bewegungsgeometrie und Event-/Kampfausführung getrennt. Keine RNG-Nutzung in Entscheidungen. Identische Positionen mit deterministischer Ausweichrichtung; keine Move-Events ohne Ortsänderung. Default-Ergebnis-/Event-Regressionen unverändert.

NEXT-39, NEXT-41, NEXT-42 und NEXT-43 abgeschlossen und veröffentlicht: A/B wählen Strategien getrennt im Config-Dialog. Zielabstand ist für Aggressiv/Distanz/Nahkampf einstellbar (0–100 % effektive Waffenreichweite); Defensiv bietet Rückzugsschwelle (0–100 % Struktur) und Sicherheitsabstand (100–200 % größere Waffenreichweite). Ungültige/leere/nicht endliche Werte sperren Start, Schritt und Übernehmen und pausieren den Lauf. Reset stellt Aggressiv und stabile Defaults wieder her. Kampfstatus zeigt die tatsächlichen Strategien aus dem Match-State ohne Builderfelder.

Refactoring/Testreview: gemeinsame Strategie-Metadaten, Defaults, Labels und Validierung; keine kopierten Schussregeln. 48 feste, aus 0.1.51 gewonnene Zustands-/Event-Digests ergänzen die 16 Paarungen mit Seeds 1/12/4711. Alle Defaults bleiben verhaltensgleich. Replay-Schritte NEXT-44 bis NEXT-51 konkret geplant.

Nächster konkreter Entwicklungsschritt: NEXT-40 · Energieverwaltungsparameter. Nicht beauftragt, nicht implementiert; NEXT-41 verwendet ausschließlich die vorhandenen Bewegungsparameter. Release-Gates 0.1.52 bestanden: PR-/main-CI grün (215 Unit-/Verhaltenstests und 42 Desktop-/Mobile-E2E), Publish und Online-Smoke erfolgreich. Produktcommit ec6f40dba8f625b08efe968b6458b1b814d05f6f.

Release-Gates 0.1.50 bestanden: PR-CI und main-CI grün (191 Unit-/Verhaltenstests, 32 Desktop-/Mobile-E2E), Publish inklusive Online-Smoke erfolgreich. Veröffentlichter Commit: ea747a3624b71cb2725dd35e288675a938bc120a. Der erste main-Runner hing bei Browser-Systempaketen; der aktualisierte Übergabestand wurde vollständig auf einem weiteren Runner geprüft.

Release-Gates für 0.1.49 bestanden: PR-CI und main-CI grün (96 Unit-/Regressionstests, 32 Desktop-/Mobile-E2E), Publish und Online-Smoke erfolgreich. Veröffentlichter Commit: a41af00d95ac1cd72f256f8da445ae208ad9a646.

NEXT-27 abgeschlossen: Start und Reset repariert; Bedienverhalten, deterministischer Reset und Validierungsgrenzen massiv erweitert und auf Desktop/Mobile abgesichert.


## Teststrategie

- Testsuite wächst bei jedem Entwicklungsschritt mit.
- Verhalten und Spielregeln werden als Charakterisierungs-/Regressionstests abgesichert.
- Vor Refactorings werden fehlende Verhaltenstests ergänzt.
- TEST_STRATEGY.md ist verbindliche Grundlage.

## Rolling Backlog

BACKLOG.md hält mindestens die nächsten 5–10 konkreten Schritte in Reihenfolge sichtbar. Pro stündlichem Lauf sind bis zu drei verifizierte Abschlüsse erlaubt; ein unvollständiger Schritt hat Vorrang. Sobald weniger als 5 konkrete Schritte verbleiben, wird vor dem Leerlaufen ein Planungszyklus fällig.


## Aktueller Testausbau

Die Engine-Tests sichern aktuell deterministische Zufallsfolgen, reproduzierbare Matches, Initialzustand, Tick-Fortschritt, Immutability, Annäherungsverhalten, Energiegrenzen, Strukturinvarianten und Verhalten nach Kampfende ab. Dieser Bereich wird bei jedem Entwicklungsschritt weiter ausgebaut.

## Ereignismodell

Move-, Shot-, Hit-, Damage- und Victory-Events sind als separates Datenmodell vorhanden und mit Unit-Tests abgesichert. Die Simulation selbst wird ab NEXT-02 schrittweise auf Event-Erzeugung erweitert.


## Bewegungsereignisse

NEXT-02 abgeschlossen: Bewegungen werden als Move-Events mit Tick, Roboter-ID sowie Vorher-/Nachher-Position ausgegeben. Bestehendes Spielverhalten bleibt unverändert; die Bewegung ist nun für Replay, Analyse und Refactoring explizit nachvollziehbar.


## Schussereignisse

NEXT-03 abgeschlossen: Erfolgreiche Schüsse werden als ShotEvents mit Tick, Angreifer, Ziel und Energiekosten ausgegeben. Reichweite, Energie und Cooldown sind als Verhaltenstests abgesichert. Sichtbares Spielverhalten bleibt unverändert.


## Treffer- und Schadensereignisse

NEXT-04 abgeschlossen: Erfolgreiche Schüsse erzeugen getrennte Shot-, Hit- und Damage-Events. Damage enthält den tatsächlich angewandten, nie negativen Schaden; Zielstruktur wird bei 0 geklemmt. Ein fester Seed sichert den Schadensjitter deterministisch ab.


## Sieg und Kampfende

NEXT-05 abgeschlossen: Zerstörung erzeugt unmittelbar ein Victory-Event mit Gewinner und Verlierer. Der besiegte Roboter führt im selben Tick keine weitere Aktion aus; bereits beendete Matches bleiben einschließlich leerem Event-Stream stabil.


## Zeitlimit und Unentschieden

NEXT-06 abgeschlossen: Erreicht ein Match sein Tick-Limit ohne Sieger, endet es explizit als Unentschieden mit `outcome: draw` und `endReason: timeout`. Ein Sieg im letzten zulässigen Tick hat Vorrang. Timeout-Zustände bleiben bei weiteren Schritten eingefroren.

## Test-Review

Der fällige 5-Läufe-Testreview wurde durchgeführt: NEXT-06 ergänzt Grenztests für den letzten zulässigen Tick, Timeout bei Tick 0 und den eingefrorenen Draw-Zustand; NEXT-10 bleibt als größerer Review vor dem geplanten Engine-Refactoring bestehen.

## Defensive-Korrektur 0.1.53 (veröffentlicht)

Die bisherigen 35-%-/größere-Reichweite-Regeln oben beschreiben v0.1.50–52. Neu: Defensive korrigiert Sicherheitsabstand frühzeitig in beide Richtungen; Abstand = min(gegnerische Waffenreichweite × Faktor, 95 % eigene Waffenreichweite). Ab standardmäßig 70 % Struktur kein Nachsetzen mehr. Reine Abstandspolitik gekapselt, gemeinsame Bewegungsgeometrie und Schussfreigabe unverändert. In 100 festen Standardkämpfen gewinnt der defensive Raptor 93 statt zuvor 0; beide Roboter weichen früh zurück. Keine allgemeine Sieggarantie. 21 neue defensive Referenzstreams ergänzen 27 unveränderte Altversionsreferenzen. NEXT-40 bleibt offen.

Release-Gates 0.1.53 bestanden: PR-CI https://github.com/VOWIKRON/robot-arena/actions/runs/40018423641 und main-CI https://github.com/VOWIKRON/robot-arena/actions/runs/40018619403 grün (225 Unit-/Verhaltenstests, 46 Desktop-/Mobile-E2E). Publish https://github.com/VOWIKRON/robot-arena/actions/runs/40018744209 erfolgreich; Online-Smoke einschließlich Infoseiten, Versionsarchiv und exaktem Commit grün. PR #45 integriert. Produktcommit ec81e688fe92c79e8baf922583eb40132c4b3830. NEXT-40 bleibt der nächste offene Entwicklungsschritt.

## Arbeitsbranch NEXT-40 (24.10.2026, unveröffentlicht)

Geplante Energiereserve (0–100 % Maximalenergie, Default 0 %) wird in der Schussfreigabe nach Regeneration berücksichtigt. Quellcode für getrennte A/B-Eingaben, Validierung und Tests liegt auf dem Entwicklungsbranch. **Nicht abgeschlossen:** Unit-/Verhaltenstests, vollständige Regression, Desktop-/Mobile-E2E und Freigabe müssen auf dem neuen Head nachgewiesen werden. Stabile Version auf main bleibt 0.1.53; kein Merge, kein Publish.

## Unveröffentlichte Entwicklung · 24.10.2026

- Stabil auf main: **0.1.53**, unverändert; Veröffentlichung ausschließlich nach manueller Nutzerfreigabe.
- Branch: `automation/next-40-energy-reserve-unpublished`, Draft-PR #46, nicht mergen.
- **NEXT-40 abgeschlossen und nicht veröffentlicht:** Energiereserve 0–100 % für A/B mit Default 0 %, Validierung, zentrale Schussfreigabe und Regressionen. Development Tests #40085113036 (SHA `193f42d07cb1a6827799e2ac6fe92a974b7ddae2`): 246 Unit-/Verhaltenstests und 48 Desktop-/Mobile-E2E, Typecheck und Build grün.
- **NEXT-44 abgeschlossen und nicht veröffentlicht:** Append-only Recorder mit Seed, initialen RobotDefinition-Snapshots, Tick-Events und Endzustand. Development Tests #40088595774 (SHA 7df3cacc): 252 Unit-/Verhaltenstests und 48 Desktop-/Mobile-E2E, Typecheck und Build grün.
- **NEXT-45 abgeschlossen und nicht veröffentlicht:** Replay-Dateiformat schemaVersion 1, JSON-Roundtrip, ID-/Tick-/Event-/Arena-/Zahlenvalidierung. Development Tests #40088913689 (SHA 9d6f719c): 258 Unit-/Verhaltenstests und 48 Desktop-/Mobile-E2E, Typecheck und Build grün.
- Testworkflow auf dem Entwicklungsbranch heißt `Development Tests`; der `Publish`-Workflow auf main reagiert nur auf `CI`, bleibt aber grundsätzlich automatisch konfiguriert. Nicht auf main mergen und keinen Publish-Workflow auslösen.
- Kumulativ seit v0.1.53: **4 vollständig getestete, unveröffentlichte Aufgaben (NEXT-40, NEXT-44, NEXT-45, NEXT-46)**. Weitere offene Schritte: NEXT-47 bis NEXT-51.

## NEXT-46 · Replay-Import/-Export (Entwicklungsbranch)
- Implementiert: separater Replay-Dialog, Live-Snapshot ohne Recorder-Abschluss, JSON-Download mit stabilem Namen, Dateiimport mit 2-MB-Grenze und Schema-Prüfung.
- Import zeigt nur geprüfte Metadaten; laufender Kampf bleibt unverändert. Player folgt mit NEXT-47.
- Unit-/Behavior-/Regression- und Desktop-/Mobile-Tests auf Commit 556a2858 grün: Development Tests #40092321506, 262 Unit-/Verhaltenstests und 50 Desktop-/Mobile-E2E, Typecheck und Build. NEXT-46 abgeschlossen und unveröffentlicht; Dokumentations-Head separat prüfen.
- main und Live-Version 0.1.53 unverändert; kein Merge, Publish oder Deployment.
