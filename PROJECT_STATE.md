# PROJECT_STATE

## Aktueller Stand

- Projektphase: Fundament abgeschlossen, Einstieg in Kernsimulation
- Aktuelle stabile Version: 0.1.6
- Branch: main
- CI: aktiv
- Auto-Publish: aktiv
- Publish-Gate: nur explizite `release:`-Commits
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

- Entwicklungszyklen seit Test-Review: 1
- Entwicklungszyklen seit Refactoring: 1
- Entwicklungszyklen seit Architektur-Review: 1

## Öffentliche Metadaten

Beim Publish werden gepflegt:
- version
- commit
- builtAt
- published
- nextRunAt
- Status der verpflichtenden Qualitätsgates

## Nächster Entwicklungsschritt

NEXT-02: Bewegungsereignisse in die Simulation integrieren und mit Geschwindigkeits-/Immutability-Tests absichern.

Dieser Block wird beim nächsten regulären Lauf in einen kleinen, täglich umsetzbaren Teil zerlegt.


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

Move-, Shot-, Hit- und Damage-Events sind als separates Datenmodell vorhanden und mit Unit-Tests abgesichert. Die Simulation selbst wird ab NEXT-02 schrittweise auf Event-Erzeugung erweitert.
