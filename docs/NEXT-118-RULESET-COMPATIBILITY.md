# NEXT-118-A — existing ruleset compatibility audit (NO PUBLISH)

Date: 2026-10-30. Base: NEXT-117-H, PR #214. Last independently confirmed full CI: Actions #40978841757 (992/992) on 9d9055a748e9949d47c193dd324431dd285b3167. Current changes require new SHA-specific CI.

## Important finding: v2 already exists

- `src/engine/simulation-v2.ts` already exports `CombatRuleset`, `parseCombatRuleset`, `SIMULTANEOUS_RULESET='simultaneous-v2'` and `stepMatchV2WithEvents`.
- `src/engine/replay-v2.ts` already persists `schemaVersion:2` and `rulesetVersion:'simultaneous-v2'` and re-simulates recorded events. Do NOT create another `simulation-v2.ts` or reuse the v2 identifier for changed tactics.
- `src/engine/simulation.ts` is legacy sequential-v1 and must remain bit-for-bit unchanged. Existing v2 simulation, replay schema, event stream and RNG consumption must also remain unchanged.
- The experimental `tacticalMovementPreview` from NEXT-117-D/F is currently unconnected. Wiring it into existing v2 would invalidate historical v2 replay validation.

## Three small, safe packages

1. **NEXT-118-A (P0, this package)** — audit and explicitly allow isolated QA branches. Files: this document, `.github/workflows/feature-qa.yml`, `scripts/next108-verify-provenance.mjs`. Acceptance: v1/v2 compatibility boundary documented; only three exact new branches allowed; main and unknown branches still excluded. Test: `node --test tests/next108-provenance.test.mjs`. Dependency: NEXT-117-H. CI still required.
2. **NEXT-118-B (P1)** — introduce a pure, opt-in `tactical-v3-preview` gate in `src/engine/tactical-ruleset.ts`; reject missing, v1, v2 or unknown ruleset values; do not wire to either simulation or replay. Acceptance: explicit opt-in, deterministic result, legacy v1/v2 code unchanged. Test: `npm run typecheck && npm test`. Dependency: NEXT-118-A. CI still required.
3. **NEXT-118-C (P2)** — isolated Vitest regression in `tests/next118-tactical-ruleset.test.ts` and status/HTML updates. Acceptance: v3 accepted, v1/v2/unknown rejected, preview deterministic and pure, existing v2 parser unchanged; full Chromium/WebKit desktop/mobile, audit, reproducible build, SHA-bound Quality and Provenance on final commit. Test: `npx vitest run tests/next118-tactical-ruleset.test.ts && npm run typecheck && npm test && npm run build && npm run test:e2e`. Dependency: NEXT-118-B.

## Future activation — NOT in these packages

A genuine playable tactical-v3 mode needs its own simulation and replay schema/archives, stable RNG and event fixtures, UI opt-in, import/export compatibility and full cross-browser tests. NEXT-118-D/E/F should design these before activating the preview. The pre-existing `simultaneous-v2` version is immutable.

Manual NEXT-79e accessibility acceptance remains 0/4; NEXT-110 release gate NO-GO. Last confirmed live v0.1.62 on main 2cbbda87ebfbead0f74ead24fa016b0857f4eaaa. Previously recorded cumulative CI-confirmed but not live: 141; newly developed tasks are NOT counted until SHA-specific CI. NO PUBLISH / NO MAIN MERGE / NO DEPLOYMENT.
