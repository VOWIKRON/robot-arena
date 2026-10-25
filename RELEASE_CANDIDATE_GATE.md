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
