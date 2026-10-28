# NEXT-110 — versioned, fair simultaneous combat resolution (isolated experimental v2 engine)

**18:56 update (no publish):** Runde 3/3 Pakete: (1) CI #40549069814 auf vorherigem Dokumentations-HEAD 9107b452 SUCCESS, Qualität/Browser-/Evidence-Gates PASS; (2) NEXT-110-E12: zwei manipulierte 120-Kampf-Archive (Fortschritt und doppelte Spiel-ID) werden im echten Browser importiert und müssen abgewiesen werden, ohne laufendes Turnier, Export oder Sandbox zu verändern; (3) NEXT-110-E13: sechs manipulierte Null-Tick-v2-Replays müssen scheitern, gültiger v2-Replay und v1-Format unverändert. E12 in e2e/next110-v2-120-browser.spec.ts (Chromium Desktop/Mobil, npx playwright test e2e/next110-v2-120-browser.spec.ts); E13 in tests/next110-replay-v2.test.ts (npx vitest run tests/next110-replay-v2.test.ts). Abhängigkeit E1–E11. Beide NEU IMPLEMENTIERT, aber NICHT ALS ABGESCHLOSSEN ZÄHLEN, bevor CI auf Quellcode-HEAD 78a03dfebb9f934295618c6dae4f9b958841d311 und dem Dokumentations-HEAD grün ist. CI #40555379454 läuft. Keine produktive Engine-/RNG-/v1-Änderung; Refactoring: gemeinsame strukturierte Mutationsfälle statt duplizierter Testlogik. Rolling Backlog: P0 E12/E13 CI prüfen und Fehler beheben, P1 E14 v2 Double-KO-Statistik-/Keyboard-Grenzfälle, P0 NEXT-79e reale NVDA-/VoiceOver-/Touch-/Kontrastabnahme, P2 NEXT-108 SHA-/Artefakt-Provenienz. Kumulativ seit bestätigtem Live v0.1.61: 3 fertig getestete NEXT-Hauptaufgaben: NEXT-106 (733/733, auf main, Veröffentlichungsstatus ungeklärt), NEXT-107 (736/736, PR #94), NEXT-109 (739/739, PR #94). Außerdem 9 verifizierte NEXT-110-Unterpakete E1/E2 und E5–E11; E12/E13 pending, NEXT-110 Gesamtaufgabe offen. NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell. PR #93 und #95 Draft, kein main-Merge/Release/Deployment/publish.php/Homepage-Update; andere Automationen unverändert.

Status: **IN PROGRESS / E1–E11 source QA GREEN 798/798, parent NEXT-110 not finished.** Experimental v2 engine, versioned archive/replay and opt-in browser tournament/replay UI are implemented on development PR #93 only; legacy sequential-v1 remains default and live v0.1.61 unchanged. Latest source CI #40546834016 SUCCESS on accc1264. No publishing.\n\n## Verified defect and objective

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
- **B — Isolated v2 engine (implemented, verification pending):** `stepMatchV2WithEvents`, `runMatchV2`, `parseCombatRuleset` in an independent module. Snapshot-based simultaneous movement, same-snapshot fire eligibility, stable robot-ID RNG draw order, atomic damage and double-KO draw; eight focused tests in `tests/next110-simultaneous-v2.test.ts`. Legacy entry points untouched. This is not production-enabled and must not be marked complete until CI is green.
- **C — Explicit persistence (PARTIAL):** tournament definitions use schemaVersion 2 plus required simultaneous-v2 ruleset; runner dispatches by immutable definition; archive import/export validates matching schema and ruleset, including hostile-import regressions. Legacy schemaVersion 1 remains sequential-v1 with no ruleset field. **Still open:** replay event schema and UI match/replay entry points, independent provenance/anti-tampering evidence. Never migrate in place.
- **D — Integration gate:** compare full v1 event digests and tournament archive fixtures against unchanged baselines; run v2 mirrored seed matrix, 120-match pause/export/import/resume, browser replay on desktop/mobile and WebKit. Verify exact final branch SHA in CI and document evidence. Only then mark NEXT-110 finished; **no merge/publish without manual user request**.

## Risk and stop conditions

Historical fixture mismatch, altered v1 RNG/event order, silent archive reinterpretation, unversioned replay, nondeterministic v2 mirrored results, or failed browser/CI gate blocks completion. Keep the task active and diagnose before implementing further features.

## 27.10.2026 · 08:04 development notes

- Simultaneous movement collision policy is currently **allow overlap and crossing**; further fairness and symmetry tests required before enabling. A deterministic ID-based escape rule for exact overlap already exists in the shared movement module.
- RNG jitter draws are ordered by robot ID (not A/B slot), while emitted move/shot/hit/damage events remain A then B for predictable rendering. No victory event is emitted for double KO.
- Replay schema v1 explicitly rejects `draw/destroyed`; the experimental v2 resolver **must not be used for v1 recordings**. Stage C must introduce a validated replay schema/ruleset boundary and a v2 draw representation before UI integration.
- Remaining blockers: schema/ruleset persistence, tournament resume/archives, replay recording/parser/player, browser integration, full CI and deterministic 120-match regression. No publishing or deployment.

### Floating-point boundary regression (08:10)
The eight-seed Raptor/Titan mirrored test initially found a one-tick difference (93 versus 92) at a weapon-range boundary. The isolated v2 eligibility check now accepts a fixed 1e-9 range tolerance to absorb equivalent floating-point subtraction roundoff. Legacy-v1 eligibility and event/RNG order are untouched. CI #40465328903 is the source-verification run for this fix; no final QA claim before it completes.

## 27.10.2026 · 08:55 stage C implementation

- Tournament schema v2 requires explicit `rulesetVersion: 'simultaneous-v2'`; v1 forbids the field, so historical definitions and exports remain unchanged. The immutable tournament definition selects `runMatchV2` only for v2 fixtures.
- Archive schema 1/2 must match definition schema exactly; missing/unknown versions, ruleset stripping, mismatched schema, malformed fixture seeds and progress are rejected. Import/export/continue preserve the versioned definition across pause/resume.
- Added deterministic v1/v2 fixture and paused archive round-trip tests. Updated the former `schemaVersion=2` future-version rejection fixture to 3, because schema 2 is now deliberate and supported.
- **Not completed:** UI and replay schema v2, 120-match regression, real browser matrix on this HEAD, and provenance; no production rollout or publication. CI must verify exact final HEAD before claiming this stage green.

### Stage C browser compatibility gate (08:59)

- Full CI initially found 7 legacy test failures caused by archive error wording; preserved the historical `ungültige Version` error contract while retaining schema v2 rejection for mismatches. Unit/Node checks then passed (517 Vitest + 32 Node), but four Chromium desktop/mobile E2E tests exposed that the legacy browser importer expected to reject schema v2 *before* validating missing run data.
- Explicit v1-only browser gates now call `importTournamentRun(json, 1)` from the UI file import and local autosave restore. Engine-level `importTournamentRun(json)` still validates deliberate schema v2 archives for isolated tests. This prevents the legacy UI/replay renderer from silently interpreting v2 combat archives before replay v2 is implemented.
- Added a regression verifying the v1 browser gate rejects even valid v2 archives, while engine-level v2 import and v1 browser import remain functional. **New full CI is required; do not mark stage C or NEXT-110 complete before it passes.**

## 27.10.2026 · 18:09 verification update
- Earlier explicitly named E1/E2 and E5/E6 plus other unnumbered integration stages: opt-in v2 simulation, versioned tournament/replay, browser UI, stats and 120-match browser stress passed 787/787 on earlier source HEAD.
- E7–E9 hostile archive and Double-KO replay/browser tests, E10 11 full 60/120-match archive mutations, E11 keyboard/ARIA/statistics browser regression passed GitHub Actions #40546834016 798/798 (536 Vitest, 32 Node, 230 browser) on accc1264. NEXT-110 still open for E12/E13 and final acceptance. No release or deployment.
