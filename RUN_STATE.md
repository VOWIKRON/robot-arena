# RUN_STATE

Operative Übergabe zwischen Robot-Arena-Läufen. Jeder Lauf liest zuerst diese Datei.

## Aktueller Lauf
- step: NEXT-26
- status: COMPLETED
- version: 0.1.34
- main_sha: f48d383f68040cfbda536975f89e91f24ec152c9
- pr: 30
- pr_tests: SUCCESS
- main_tests: SUCCESS
- publish: SUCCESS
- published_sha: f48d383f68040cfbda536975f89e91f24ec152c9
- live_verified: true
- next_step: NEXT-27
- blocker: none

## Benutzeränderung
Roboter A und B sind klar unterscheidbar. Raptor und Titan besitzen unterschiedliche Chassis-Silhouetten.

## Regeln
1. Zuerst RUN_STATE.md lesen.
2. IN_PROGRESS oder BLOCKED: nur diesen Schritt fortsetzen.
3. Erfolgreiche Gates nicht erneut prüfen, solange der zugehörige SHA unverändert ist.
4. COMPLETED: nur main_sha minimal gegen main prüfen, danach next_step beginnen.
5. Beim Start RUN_STATE.md sofort auf IN_PROGRESS setzen.
6. Nach PR-Tests, Merge, Tests auf main, Publish und Live-Verifikation den Checkpoint aktualisieren.
7. Erst nach erfolgreicher Live-Verifikation desselben main-SHA auf COMPLETED setzen.
8. BACKLOG.md, PROJECT_STATE.md und CHANGELOG.md bleiben die fachlichen Release-Dokumente.
