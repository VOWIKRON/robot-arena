# Changelog

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
