# Changelog

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
