# Changelog

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
