# NEXT-90 · Historical resource trend baseline · 26 October 2026

**Development branch only — NOT PUBLISHED.** These are authentic JSON artifacts downloaded from two separate successful GitHub Actions Development Tests runs. Both use scenario `round-robin-fixed-seed-24ticks`. The history is a diagnostic comparison, **not a performance benchmark or CI performance gate**.

| Source | Run | Artifact ID | Tested commit |
|---|---|---|---|
| Earlier | [40266761987](https://github.com/VOWIKRON/robot-arena/actions/runs/40266761987) | 12626795952 | `1f0b6076c15923dfc49a9713ed8e6c239d814f55` |
| Later | [40267008446](https://github.com/VOWIKRON/robot-arena/actions/runs/40267008446) | 12626417753 | `3c840ba2f7a687a4339806d3a402294bc15573f9` |

The original `next89-resource-trends.json` from each artifact is preserved under `tests/fixtures/next90-ci-*.json` for deterministic regression tests. Archive bytes are reproducible; elapsed time and heap deltas are noisy and **must never cause test failures**.

| Participants | Matches | Ticks | Earlier archive bytes | Later archive bytes | Archive growth | Elapsed change (diagnostic) | Heap delta change (diagnostic) |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 2 | 1 | 24 | 815 | 815 | 0 | +7.1% | +40 B |
| 4 | 6 | 144 | 2,082 | 2,082 | 0 | +29.8% | -259,344 B |
| 8 | 28 | 672 | 6,646 | 6,646 | 0 | +28.5% | -46,520 B |
| 16 | 120 | 2,880 | 24,004 | 24,004 | 0 | +30.2% | -5,272,600 B |

**Interpretation:** The archived payload sizes are byte-identical between these runs. Apparent runtime/heap changes do not establish a performance regression because CI machine load, JIT, garbage collection and measurement variance are uncontrolled. The later commit only changes documentation relative to the earlier code. These two runs establish a functional historical baseline, not evidence of sustained performance change.

## Extension procedure

1. Download the `robot-arena-resource-trends` artifact from a subsequent successful GitHub Actions run.
2. Record run ID, artifact ID, full commit SHA, test scenario, and the unchanged JSON artifact in a new fixture.
3. Add that run in chronological order to the `createResourceHistory` regression, compare every adjacent run, and document archive-byte deltas and diagnostics without time/memory failure thresholds.
4. Keep scenario, participant sizes and fixture seeds identical. A changed scenario or missing size must fail validation, not be compared as if equivalent.
5. Run full typecheck, Vitest, conflict guard, reproducible build, dependency audit and desktop/mobile Playwright on the combined development branch. Do not publish or merge to main automatically.

## Next steps

- NEXT-90 historical comparison implementation requires combined GitHub CI confirmation on this branch before marking complete.
- NEXT-80 P1: atomic cross-tab compare-and-swap and deterministic race regression.
- NEXT-79e P0: actual NVDA, VoiceOver, physical touch and contrast acceptance; manual sign-off outstanding.
- NEXT-84 P2: WebKit/iOS touch and storage matrix.
- NEXT-91 P2: automatically maintain the artifact provenance/history with explicit read-only Actions permissions and retention/expiry handling (no deployment).

**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**
