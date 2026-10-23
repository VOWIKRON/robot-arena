# RUN_STATE

## Aktueller Lauf
- step: NEXT-36 bis NEXT-38 (gemeinsam vom Nutzer beauftragt)
- status: INTEGRATED_AWAITING_MAIN_CI
- version: 0.1.50
- branch: main
- local_typecheck: GREEN
- local_unit_tests: GREEN (191)
- local_build: GREEN
- local_e2e: BLOCKED (Chromium lokal nicht verfügbar; Browserprüfung durch CI)
- pr_tests: GREEN (191 Unit-/Verhaltenstests, 32 Desktop-/Mobile-E2E)
- pr_ci: https://github.com/VOWIKRON/robot-arena/actions/runs/40007483675
- integrated_commit: 773ec3afbd9499b309f1c3b4b34ccfa85a09ef0f
- main_tests: IN_PROGRESS (Typecheck, 191 Tests und Build grün; Browser-Systeminstallation auf Runner hängt)
- main_ci: https://github.com/VOWIKRON/robot-arena/actions/runs/40007679670
- publish: NOT_RUN
- blocker: main-CI wartet auf Browser-Systempakete; Publish bleibt gesperrt

## Nächstes Gate
Finalen PR-Stand vollständig prüfen; erst bei grüner CI integrieren, main-CI und Publish verifizieren. Danach NEXT-39 · Strategieauswahl im Config-Dialog. Die Engine unterstützt alle vier Strategien, die UI-Auswahl ist noch nicht implementiert.
