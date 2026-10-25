# NEXT-85 · Acht-Feature-Integrationsgate · 26.10.2026 · NICHT VERÖFFENTLICHT

**Neuester Stand hat Vorrang vor dem historischen Sechs-Aufgaben-Plan unten.** NEXT-76 (Turniersuche) und NEXT-82 (Downloadhärtung) wurden auf isoliertem Branch mit NEXT-69/70/71/74/75/77 kombiniert. Draft-PR #65 zielt nur auf `qa/NEXT-71-combined-integration`.

- Code-SHA `5b1bada2c7262e245cda95a8adf1e647e4eb9924`: isolierte QA-only CI **#40243980520 SUCCESS**, 429/429 Unit/Behavior/Regression/Determinismus, 160/160 Desktop/Mobil, TypeScript, Build, reproduzierbarer Zweitbuild und Security-Gate erfolgreich.
- Dokumentations-Commits nach diesem Code-SHA benötigen erneute finale QA vor Releasefreigabe.
- Kumulativ fertig und unveröffentlicht: NEXT-69, 70, 71, 74, 75, 77, 82, 76, 85 (9 Aufgaben, davon NEXT-85 Integrationsgate).
- NEXT-79e (echte NVDA/VoiceOver/Touch/Kontrastabnahme) bleibt offen und ist nicht Bestandteil des Kandidaten.
- **KEIN MERGE NACH MAIN, KEIN PUBLISHING, KEIN DEPLOYMENT.** Manuelle Veröffentlichung ausschließlich nach ausdrücklicher Nutzeranweisung.

## RELEASE CANDIDATE QA SUCCESS · 25.10.2026 · NOT PUBLISHED
- Six-task integration completed on isolated `integration/NEXT-69-70-71-74-75-77-release-candidate`; QA-only Draft PR #62 targets `qa/NEXT-71-combined-integration`, NEVER main.
- **Combined isolated QA #40238144023 SUCCESS** on code head `e7967c636716582fe6bfeab8652ca9b24196abac`: 419/419 Vitest unit/behavior/regression/determinism tests (37 files), 152/152 Playwright desktop/mobile tests, typecheck, production build, reproducible second build (dist digest `5b29d0ecec6f717c15677b2fd9cedf9cacfe014eab8761b25365983522d8bb96`), zero known dependency advisories.
- **Integration acceptance:** NEXT-69,70,71,74,75,77 tested together; source reconciliation includes import guard + V1 archive validation and unified match/table/archive downloads.
- **Candidate ready for manual release review**; no merge, release, deployment or publish.php performed. Documentation-only follow-up commits require final QA recheck on updated head.
- **NEXT-79e excluded:** manual NVDA/VoiceOver, physical touch and visual contrast acceptance remains open.
- **Cumulative individually completed + combined-tested but unpublished: 6** (69,70,71,74,75,77). Newly completed NEXT tasks in this round: 0; three existing tasks integrated.

# Release candidate integration gate — 2026-10-25

STATUS: NOT READY. NOT PUBLISHED. This branch is isolated from main and must not trigger release/deploy workflows.

## Candidate scope
- NEXT-69 robot presets (feature/NEXT-69-validated-tournament-presets)
- NEXT-70 per-match CSV/JSON export (feature/NEXT-70-match-export)
- NEXT-71 combined preset/export integration (qa/NEXT-71-combined-integration; starting baseline)
- NEXT-74 tournament import guards (feature/NEXT-74-import-guards)
- NEXT-75 archive compatibility (feature/NEXT-75-archive-compatibility)
- NEXT-77 storage/export failure handling (feature/NEXT-77-storage-export-errors)

NEXT-79e EXCLUDED: manual NVDA/VoiceOver, physical touch and visual contrast acceptance pending.

## Verified repository comparison
NEXT-74, NEXT-75 and NEXT-77 each diverge from the NEXT-71 integration baseline. DO NOT merge entire feature branch trees or overwrite source files. Reconcile changes per file/hunk, preserving both sides and tests.

### Integration order
1. NEXT-74: reconcile src/engine/tournament-archive.ts and tournament-model.ts; carry over input guard and tests.
2. NEXT-75: reconcile the SAME src/engine/tournament-archive.ts with NEXT-74; preserve V1 archive compatibility, validation, golden hashes and storage recovery tests.
3. NEXT-77: reconcile src/main.ts with combined NEXT-69/70 changes; integrate tournament-local-save.ts, storage guard and tests.
4. Reconcile BACKLOG.md, PROJECT_STATE.md, RUN_STATE.md, CHANGELOG.md and public/backlog.html, public/testsuite.html, public/release-notes.html without replacing cumulative unpublished task history.
5. Audit .github/workflows/*.yml for deployment triggers BEFORE any PR/merge/CI. Use only an isolated test-only QA workflow.

## Mandatory release gate (all required)
- Full TypeScript typecheck and production build.
- Unit, behavior, regression, deterministic simulation and fixed-seed archive tests.
- Desktop and mobile Playwright, including combined preset -> tournament -> archive -> JSON/CSV export and hostile imports.
- Quota/security errors, cross-tab conflict and opt-out storage tests.
- Dependency security check and reproducible build.
- All tests GREEN on THIS combined commit, not merely the individual feature branches.
- Confirm main remains unchanged; obtain explicit manual publishing action before any merge/deploy.

## Current verification
Individual NEXT-69,70,71,74,75,77 feature tests were previously reported successful; no combined six-task QA has run. No release approval or publish readiness claimed.

CUMULATIVE FINISHED BUT UNPUBLISHED: NEXT-69, NEXT-70, NEXT-71, NEXT-74, NEXT-75, NEXT-77 (6; individual feature tests). NEXT-79e unfinished.
