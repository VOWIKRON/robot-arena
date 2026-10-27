# NEXT-110 — versioned, fair simultaneous combat resolution (development design, NOT IMPLEMENTED)

Status: **IN PROGRESS / architecture and compatibility baseline only**. No gameplay rule change is authorized by this document. The published engine remains sequential-v1.

## Verified defect and objective

NEXT-109 shows the current `stepMatchWithEvents` processes A's movement/fire before B's, so the side changes first-shot opportunities: identical Raptor hardware at the standard starting distance fires B on tick 14 and A on tick 15, whereas at close range A shoots first. A fair resolution must evaluate both decisions from one shared pre-action snapshot, not after the other actor has moved or dealt damage.

## Ruleset and persistence contract

1. Keep legacy **sequential-v1** byte-for-byte deterministic by default. Old `createMatch`, `runMatch`, `stepMatchWithEvents`, `TournamentDefinition` with `schemaVersion:1`, and imported archive `schemaVersion:1` MUST continue to execute the historical algorithm, including exact event ordering and RNG consumption.
2. Introduce an **explicit, independently validated ruleset discriminator** for new matches/tournaments; absence means sequential-v1. Do not silently change defaults or infer a ruleset from an application version. Unknown, malformed or future identifiers must fail closed before running or resuming.
3. Keep the archive *schema version* separate from the *combat ruleset version*. If a v2 archive is required, implement and test a deliberate migration boundary, not a reinterpretation of v1 data. Persist ruleset with the run so paused/exported/imported tournaments cannot switch semantics halfway through.
4. A new simultaneous-v2 tick must: (a) clone the old state; (b) regenerate energy/decrement cooldown for both living bots; (c) compute movement decisions for A and B against the **same snapshot**; (d) apply both positions; (e) decide both firing eligibilities from the **same post-movement snapshot**; (f) draw independent deterministic damage jitter for each eligible shooter in documented, stable RNG order; (g) apply both damages atomically. Neither bot may suppress the other's same-tick shot by killing it first.
5. Resolve both destroyed as a draw (`outcome:draw`, `endReason:destroyed`, `winner:null`), one destroyed as victory, neither destroyed as active. Keep damage capped at target structure, energy nonnegative, and positions inside arena. Existing `victory` event must not be emitted for double KO; any new draw event requires separately versioned event consumers and tests.
6. Simultaneous movement can produce overlap or crossing; specify collision policy and symmetry fixtures before enabling v2 in the UI. Symmetry must be assessed by swapping slots, seeds and robot IDs; do not require arbitrary 50% win rates for dissimilar hardware.

## Implementation stages / acceptance

- **A — Compatibility lock (this branch):** add focused historical simulation + v1 archive regressions, including missing/future ruleset rejection policy as design constraints. Run full TypeScript, unit, behavior, regression, determinism, desktop/mobile Chromium/WebKit, security and reproducible-build CI. Do not mark NEXT-110 done after this stage.
- **B — Isolated v2 engine:** implement simultaneous step/run API and deterministic fixed-seed mirrored tests; preserve old entry points. Verify movement symmetry, shot eligibility, double KO, energy, cooldown, RNG and event stream. Refactor shared geometry without touching legacy event/RNG order.
- **C — Explicit persistence:** add validated ruleset to tournament definition and runner, archive import/export, and UI match/replay entry points. Add hostile-import tests (unknown version, version stripping, tampered run) and old v1 archive round trips. Never migrate in place.
- **D — Integration gate:** compare full v1 event digests and tournament archive fixtures against unchanged baselines; run v2 mirrored seed matrix, 120-match pause/export/import/resume, browser replay on desktop/mobile and WebKit. Verify exact final branch SHA in CI and document evidence. Only then mark NEXT-110 finished; **no merge/publish without manual user request**.

## Risk and stop conditions

Historical fixture mismatch, altered v1 RNG/event order, silent archive reinterpretation, unversioned replay, nondeterministic v2 mirrored results, or failed browser/CI gate blocks completion. Keep the task active and diagnose before implementing further features.
