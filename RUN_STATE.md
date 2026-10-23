# RUN_STATE

Operative Übergabe zwischen Robot-Arena-Läufen. Jeder Lauf liest zuerst diese Datei.

## Aktueller Lauf
- step: BUGFIX Energieanzeigen Robot A/B
- status: COMPLETE
- version: 0.1.51
- branch: main
- local_typecheck: GREEN
- local_unit_tests: GREEN (191, Engine unverändert)
- local_build: GREEN
- pr_tests: GREEN (191 Unit-/Verhaltenstests, 36 Desktop-/Mobile-E2E)
- pr_ci: https://github.com/VOWIKRON/robot-arena/actions/runs/40010909581
- main_tests: GREEN (vollständig einschließlich Browser-Runtime, Desktop und Mobile)
- main_ci: https://github.com/VOWIKRON/robot-arena/actions/runs/40012062567
- publish: SUCCESS
- publish_run: https://github.com/VOWIKRON/robot-arena/actions/runs/40012192363
- published_commit: 1213296167558f6f8ab2d3525879034521902a6d
- online_smoke: GREEN (Publish verifiziert Arena, Infoseiten, Versionsarchiv und Commit)
- blocker: none

## Test-Review und CI-Korrektur
Der fällige Test-Review erweitert reine DOM-Sichtbarkeit um Paint-Hit-Tests, beide Chassis und Energie-Lebenszyklusprüfungen. Frühere main-Runner warteten bei pauschaler Browser-Systempaketinstallation. CI installiert Chromium, prüft dessen tatsächlichen Start und installiert Systembibliotheken nur bei Bedarf nach (maximal drei Minuten); erfolgreicher Start und alle E2E bleiben verpflichtend. Publish akzeptiert ausschließlich den aktuellen main-SHA im workflow_run-Kontext, sodass spät beendete ältere Läufe keinen älteren Stand zurückspielen.

## Nächstes Gate
Energieanzeigen-Bugfix abgeschlossen und veröffentlicht. NEXT-39 · Strategieauswahl im Config-Dialog bleibt nächster Strategieschritt. Vor Beginn main-/Publish-Zustand prüfen. Dieser Abschlusscommit ändert nur Projektmetadaten; das veröffentlichte Produkt bleibt unverändert.
