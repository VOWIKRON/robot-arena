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
