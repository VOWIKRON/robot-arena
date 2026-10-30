# NEXT-117-C · Strategy-v2 compatibility boundary (NO PUBLISH)

Date: 2026-10-30. Base: NEXT-117-B commit `80d813f01ac5b06393391e1a8028d0d25703c06b` (Draft PR #208). Last independently confirmed full QA: Actions #40978841757, SHA `9d9055a748e9949d47c193dd324431dd285b3167`, 992/992. No later HEAD has been certified by this review.

## Existing behavior and compatibility risk

- `src/engine/simulation.ts` calls `nextCombatPosition`, which calls `movementDelta` from `src/engine/strategies.ts`. It resolves A then B sequentially, including shot/damage events and RNG consumption. Thus changing the legacy function or turn ordering can change historical replay event streams, seed outcomes, archive digests and tournament results.
- `tests/next109-side-initiative.test.ts` documents a reproducible side-B first-shot effect at standard range and side-A first-shot priority when initially in range. The new NEXT-117-A/B tests verify only strategy request decisions, **not** full-match fairness.
- Do not alter `movementDelta`, `nextCombatPosition`, `stepMatchWithEvents`, the replay/archive schema, the RNG or the existing strategy identifiers in this package.

## Safe next increment

NEXT-117-D adds a **pure, unused tactical decision preview** in a new module. It may suggest a retreat when an adaptive/defensive robot is threatened by a longer-range opponent who can fire on its next action and the robot cannot retaliate. This is an experimental candidate, **not** an active strategy change. It must not be imported by the v1 engine or used for live matches. No user-facing gameplay improvement is claimed yet.

NEXT-117-E tests the candidate with deterministic states, both start-slot orientations, cooldown/energy boundaries, immutability, and explicit legacy `movementDelta` non-regression. The candidate can only be activated in a **separate future task** after rule-version selection, replay/archive versioned metadata, old-fixture checks and cross-browser acceptance are implemented. Historical v1 replays must continue using the exact original algorithm.

## Packages / acceptance

- **NEXT-117-C (P0)**: this compatibility review + exact isolated QA branch/provenance allowlists. Files: this document, `.github/workflows/feature-qa.yml`, `scripts/next108-verify-provenance.mjs`, `tests/next108-provenance.test.mjs`. Acceptance: explicit no-v1-change contract, only exact three new QA branches allowed, unknown branch remains rejected. Test: `node --test tests/next108-provenance.test.mjs`; dependency: NEXT-117-B. No full-CI claim until exact HEAD green.
- **NEXT-117-D (P1)**: pure experimental `src/engine/tactical-preview.ts`. Acceptance: returns bounded signed movement request, no RNG, no mutation, v1 path unchanged. Test: `npm run typecheck && npm test`; dependency: NEXT-117-C.
- **NEXT-117-E (P2)**: `tests/next117-tactical-preview.test.ts` plus nine status/HTML sources. Acceptance: cooldown/energy/range, both orientations, legacy non-regression, complete TypeScript, unit/behavior/determinism, Node, Chromium/WebKit desktop/mobile, build/audit/provenance on final SHA. Test: `npx vitest run tests/next117-tactical-preview.test.ts && npm run typecheck && npm test && npm run build && npm run test:e2e`; dependency: NEXT-117-D.

## Gates and rolling backlog

1. Obtain exact final-head CI status for NEXT-116-A/B/C and NEXT-117-A/B, resolve any failure, and verify SHA-bound artifacts; current combined-status endpoint does not enumerate push-only runs. Do not infer green from an empty result.
2. Verify new preview module and tests on the final stacked SHA; if CI pending, keep NEXT-117-C/D/E CI-open.
3. Design explicit v2 rule-version plumbing and historical replay/archive fixtures before enabling any new strategy; only then implement actual gameplay change.
4. NEXT-79e real NVDA, VoiceOver, touch and contrast acceptance remains 0/4; NEXT-110 release gate NO-GO.

Confirmed live baseline in project records: v0.1.62, main `2cbbda87ebfbead0f74ead24fa016b0857f4eaaa`. Cumulative previously QA-confirmed but not live: **141** technical subtasks; NEXT-116-A/B/C and NEXT-117-A/B remain CI-open until exact SHA evidence. Older PRs without live verification: **Veröffentlichungsstatus ungeklärt**. NO PUBLISH, no main merge, no release/deployment.
