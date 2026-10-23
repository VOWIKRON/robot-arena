# RUN_STATE

## Aktueller Lauf
- step: BUGFIX Energieanzeigen Robot A/B
- status: INTEGRATED_AWAITING_MAIN_CI
- version: 0.1.51
- branch: main
- local_typecheck: GREEN
- local_unit_tests: GREEN (191, Engine unverändert)
- local_build: GREEN
- pr_tests: GREEN (191 Unit-/Verhaltenstests, 36 Desktop-/Mobile-E2E)
- pr_ci: https://github.com/VOWIKRON/robot-arena/actions/runs/40010909581
- integrated_commit: d5a5c4c7b945f1c326e86f4ac2f8421856b643c0
- main_tests: IN_PROGRESS (Typecheck/191 Tests/Build grün; Browser-Systeminstallation wartet)
- main_ci: https://github.com/VOWIKRON/robot-arena/actions/runs/40011098907
- publish: NOT_RUN
- blocker: Vollständige CI des aktualisierten Browser-Setups und Veröffentlichung offen

## Nächstes Gate
PR-CI prüfen, bei grünen Gates integrieren und main-/Publish-Gates verifizieren. NEXT-39 bleibt nächster Strategieschritt.

## CI-Korrektur
Die pauschale Systempaketinstallation hielt mehrere main-Runner auf. CI installiert Chromium und prüft seinen tatsächlichen Start. Nur bei fehlgeschlagenem Start werden Systempakete nachinstalliert (maximal drei Minuten), danach ist ein erfolgreicher Start verpflichtend. Alle 191 Unit- und 36 Desktop-/Mobile-Tests bleiben Pflicht. Publish akzeptiert nur den aktuellen main-SHA im workflow_run-Kontext, damit spät beendete ältere Läufe keinen alten Produktstand veröffentlichen.
