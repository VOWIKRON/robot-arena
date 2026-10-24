# RUN_STATE

## Aktueller Arbeitslauf (24.10.2026, 12:00 Europe/Berlin)
- step: NEXT-40
- phase: IMPLEMENTING / WAITING_TESTS
- status: IN_PROGRESS; unveröffentlicht; nicht als abgeschlossen zählen
- branch: automation/next-40-energy-reserve-unpublished
- last_inspected_branch_head: 7cf4efee5e6f11a9cc7d962bf3c7cd101e84cd04 (vor dieser Dokumentationsänderung)
- base_main_sha: b90c7448419a134cd5e764e1243dc04fd5958715
- stable_version: 0.1.53; main unverändert
- pr_for_NEXT_40: none
- open_unrelated_prs: #5 und #8 (alte NEXT-10/11, nicht anfassen)
- isolated_behavior_checks: PASS (23 Quellcode-/Verhaltensprüfungen; keine vollständige Vitest-Ausführung)
- unit_behavior_regression_tests_for_NEXT_40: NOT_VERIFIED
- desktop_mobile_e2e_for_NEXT_40: NOT_VERIFIED
- last_verified_main_tests: GREEN (run 40018986554, SHA b90c7448419a134cd5e764e1243dc04fd5958715, 23.10.2026; nicht NEXT-40)
- latest_publish_run: 40080528304 SKIPPED; nicht deployed
- last_confirmed_published_version: 0.1.53 (GitHub Publish 40019085126 SUCCESS, 23.10.2026)
- publish: FORBIDDEN; ausschließlich manuelle Nutzeraktion

## Kumulative unveröffentlichte Aufgaben seit dem letzten bestätigten Publish (0.1.53)
**Vollständig implementiert UND mit erforderlichen Tests verifiziert UND noch unveröffentlicht: 0 Aufgaben.**
- Keine. NEXT-40 ist implementiert, aber die vollständigen Tests fehlen; daher NICHT in diese Liste aufnehmen.
- NEXT-40 · Energiereserve pro Roboter (0–100 %, Default 0 %) mit zentraler Schussfreigabe und Konfigurationsdialog: QUELLCODE VORHANDEN, UNIT/BEHAVIOR/REGRESSION/E2E NICHT VERIFIZIERT, NICHT VERÖFFENTLICHT.
- NEXT-44 bis NEXT-51: nur geplant; keine Implementierung/Abnahme.

## Sicherheitsblocker und Ursache
`.github/workflows/ci.yml` startet den Workflow mit Namen `CI` auf Branch-Push und Pull Request.
`.github/workflows/publish.yml` auf main reagiert über `workflow_run` auf jeden abgeschlossenen `CI`-Lauf. Auch bei Entwicklungsbranches wird dadurch ein Publish-Workflow erzeugt (Run 40080528304: SKIPPED); ein tatsächliches Deployment fand dabei nicht statt.
Die bisherigen NEXT-40-Commits nutzten `[skip ci]` und haben daher keinen vollständigen Testlauf des neuen Heads ausgelöst.
**Keine Tests auf GitHub starten, solange dies einen Publish-Workflow auslösen könnte. Keine Commits/Merges auf main.**
Eine Änderung von publish.yml allein auf dem Entwicklungsbranch löst die Kopplung nicht, weil workflow_run auf dem Default-Branch ausgewertet wird.
Sichere Entkopplung braucht eine gesonderte Testausführung ohne CI->Publish-Trigger oder eine vom Nutzer freigegebene manuelle Publish-Only-Konfiguration auf main.

## Nächste Aktion
1. NEXT-40 auf demselben Branch fortsetzen, ohne neue NEXT-Nummer zu beginnen.
2. Erst einen nachweislich vom Publish-Workflow entkoppelten Testpfad schaffen; bis dahin keine riskanten GitHub-Testtrigger.
3. Typecheck, Unit-/Behavior-/Regressionstests, feste Seeds sowie Desktop-/Mobile-E2E auf exakt dem Entwicklungs-Head nachweisen; Fehler vor weiteren Features beheben.
4. Erst nach vollständiger Verifikation NEXT-40 als abgeschlossen in die kumulative Liste aufnehmen. Keine automatische Veröffentlichung.

**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**
