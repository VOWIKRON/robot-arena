# PROJECT_STATE

## Aktueller Stand

- Projektphase: Fundament abgeschlossen, Einstieg in Kernsimulation
- Aktuelle stabile Version: 0.1.37
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
- nächster geplanter 18-Uhr-Lauf,
- Version, Commit und Buildzeit über Build-Metadaten.

## Qualitätszähler

- Entwicklungszyklen seit Test-Review: 0
- Entwicklungszyklen seit Refactoring: 0
- Entwicklungszyklen seit Architektur-Review: 6

## Öffentliche Metadaten

Beim Publish werden gepflegt:
- version
- commit
- builtAt
- published
- nextRunAt
- Status der verpflichtenden Qualitätsgates

## Nächster Entwicklungsschritt

NEXT-30: Treffer- und Schadenseffekte.

NEXT-27 abgeschlossen: Start und Reset repariert; Bedienverhalten, deterministischer Reset und Validierungsgrenzen massiv erweitert und auf Desktop/Mobile abgesichert.


## Teststrategie

- Testsuite wächst bei jedem Entwicklungsschritt mit.
- Verhalten und Spielregeln werden als Charakterisierungs-/Regressionstests abgesichert.
- Vor Refactorings werden fehlende Verhaltenstests ergänzt.
- TEST_STRATEGY.md ist verbindliche Grundlage.

## Rolling Backlog

BACKLOG.md hält mindestens die nächsten 5–10 konkreten Schritte in Reihenfolge sichtbar. Der jeweils nächste Lauf bearbeitet genau einen davon.


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
