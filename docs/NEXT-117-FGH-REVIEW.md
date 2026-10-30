# NEXT-117-F/G/H · Preview threat hardening · 30.10.2026 05:00 · NO PUBLISH

## Verified repository baseline
- Main / confirmed live v0.1.62: `2cbbda87ebfbead0f74ead24fa016b0857f4eaaa` (no main write).
- Starting development SHA: `ce55f63b8e3967dacde42a7bc1e7f95849c9fe87` (PR #211, draft); compare with main: ahead 279, behind 0.
- Latest independently verified full CI: GitHub Actions #40978841757 on `9d9055a748e9949d47c193dd324431dd285b3167`, quality + provenance SUCCESS, 574 Vitest + 42 Node + 376 Chromium/WebKit desktop/mobile = **992/992**.
- Commit-status and PR-filtered workflow-run queries on the newer starting SHA returned empty arrays. These do **not** establish CI success or failure for push-triggered runs.
- Confirmed CI-tested but not live-confirmed baseline: **141 technical subtasks**. NEW F/G/H are **not** counted without successful full CI on the final SHA.
- Historical v1 `movementDelta`, `stepMatchWithEvents`, RNG, replay schema, and tournament logic remain unchanged. Experimental preview is **not connected to the engine**.

## Three serial packages
| ID | Goal and files | Acceptance / test command | Dependencies / status |
| --- | --- | --- | --- |
| NEXT-117-F (P0) | Fix phantom tactical retreat from a destroyed robot; cap predicted energy at maxEnergy as in `prepareAction`. `src/engine/tactical-preview.ts`; exact branch allowlists in `.github/workflows/feature-qa.yml`, `scripts/next108-verify-provenance.mjs`, `tests/next108-provenance.test.mjs`. | Dead enemy/self -> legacy reason; post-regeneration cap; unknown QA branch rejected. `node --test tests/next108-provenance.test.mjs && npm run typecheck && npm test`. | NEXT-117-E; PR #212. Implemented, full CI pending. |
| NEXT-117-G (P1) | Four focused deterministic tests for dead enemy, dead self, impossible energy-reserve shot and live ready threat. `tests/next117-tactical-boundary.test.ts`. | Four Vitest cases pass, input purity and repeatability; `npx vitest run tests/next117-tactical-boundary.test.ts && npm run typecheck && npm test`. | NEXT-117-F; PR #213. Implemented, full CI pending. |
| NEXT-117-H (P2) | Synchronize project status and rolling backlog, no production change. `RUN_STATE.md`, `PROJECT_STATE.md`, `BACKLOG.md`, `CHANGELOG.md`, `docs/NEXT-110-RC-RELEASE-GATE.md`, `docs/NEXT-79e-MANUAL-ACCEPTANCE.md`, `public/backlog.html`, `public/testsuite.html`, `public/release-notes.html`, this review. | Every write read back, exact SHA full QA + SHA-bound artifacts before calling complete. `npm run typecheck && npm test && npm run build && npm run test:e2e`. | NEXT-117-G; draft PR, full CI pending. |

## Rolling backlog
1. **P0 NEXT-117-FGH-FINAL-QA:** inspect exact final SHA push CI, all quality and provenance jobs, Chromium/WebKit desktop/mobile, audit and SHA-bound artifacts; repair real failures only on a development branch. Do not infer green from an empty commit status.
2. **P1 NEXT-118-A:** introduce explicit opt-in rule version and historical v1 replay/archive/RNG fixture checks before integrating a new strategy. Files `src/engine/simulation-v2.ts`, `src/engine/replay-v2.ts`, `tests/next118-version-gate.test.ts`. Test `npm test`. Depends on green NEXT-117-FGH.
3. **P1 NEXT-118-B:** only after NEXT-118-A, connect preview in explicitly versioned v2 match logic, not in v1. Files `src/engine/simulation-v2.ts`, versioned strategy adapter and tests. Test `npm test && npm run test:e2e`.
4. **P2 NEXT-118-C:** replay/archive compatibility and Chromium/WebKit desktop/mobile browser tests on v1 and opt-in v2. Test `npm run test:e2e`. Depends on NEXT-118-B.
5. **Manual blocker NEXT-79e:** NVDA, VoiceOver, real touch, contrast 0/4; NEXT-110 release NO-GO. No automatic substitution.

## Cumulative tested-but-not-live inventory
- NEXT-110-E1/E2/E5–E101 (99): replay, tournaments, archive integrity and determinism.
- NEXT-108-A–D (4): CI artifact/SHA provenance.
- NEXT-79e-AUTO1–6/AUTO8–11 (10): keyboard, focus, motion and contrast automation.
- NEXT-110-UI (5), NEXT-110-FOOTER (7), NEXT-110-SMOKE (1): version display, metadata resilience and smoke selectors.
- NEXT-112-A–F (6), NEXT-113-A/B (2), NEXT-114-A–D (4), NEXT-115-A–C (3): combat speed, keyboard control, ten-tick stepping, range HUD.
- **Total 141** = 99+4+10+5+7+1+6+2+4+3. These have prior CI evidence, but live deployment is not confirmed.
- Implemented, **CI-open**: NEXT-116-A/B/C, NEXT-117-A/B/C/D/E and **NEXT-117-F/G/H NEW**. NEXT-110-E3/E4 lack independent evidence; older PRs without an exact deployment cross-check: **Veröffentlichungsstatus ungeklärt**.

**NICHT VERÖFFENTLICHT.** No publish.php, no homepage update, no release workflow, no release commit, no main merge, no deployment, no other automation changes.
