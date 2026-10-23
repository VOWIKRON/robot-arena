# PROJECT_STATE

## Aktueller Stand

- Projektphase: Strategiesystem ausgebaut; Energieverwaltung offen, Replay geplant
- Aktuelle stabile Version: 0.1.52
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
- Entwicklungszyklen seit Architektur-Review: 15

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

BACKLOG.md hält mindestens die nächsten 5–10 konkreten Schritte in Reihenfolge sichtbar. Der jeweils nächste Lauf bearbeitet genau einen davon. Sobald weniger als 5 konkrete Schritte verbleiben, wird vor dem Leerlaufen ein Planungszyklus fällig.


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

## Defensive-Korrektur 0.1.53 (in Prüfung)

Die bisherigen 35-%-/größere-Reichweite-Regeln oben beschreiben v0.1.50–52. Neu: Defensive korrigiert Sicherheitsabstand frühzeitig in beide Richtungen; Abstand = min(gegnerische Waffenreichweite × Faktor, 95 % eigene Waffenreichweite). Ab standardmäßig 70 % Struktur kein Nachsetzen mehr. Reine Abstandspolitik gekapselt, gemeinsame Bewegungsgeometrie und Schussfreigabe unverändert. In 100 festen Standardkämpfen gewinnt der defensive Raptor 93 statt zuvor 0; beide Roboter weichen früh zurück. Keine allgemeine Sieggarantie. 21 neue defensive Referenzstreams ergänzen 27 unveränderte Altversionsreferenzen. NEXT-40 bleibt offen.
