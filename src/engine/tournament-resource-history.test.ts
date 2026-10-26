import { describe, expect, it } from 'vitest';
import baseline from '../../tests/fixtures/next90-ci-40266761987.json';
import followup from '../../tests/fixtures/next90-ci-40267008446.json';
import { createResourceHistory, type HistoricalResourceRun } from './tournament-resource-history';
import type { ResourceReport } from './tournament-resource-trends';

const first: HistoricalResourceRun = {
  runId: 40266761987, artifactId: 12626795952,
  commit: '1f0b6076c15923dfc49a9713ed8e6c239d814f55',
  report: baseline as ResourceReport
};
const second: HistoricalResourceRun = {
  runId: 40267008446, artifactId: 12626417753,
  commit: '3c840ba2f7a687a4339806d3a402294bc15573f9',
  report: followup as ResourceReport
};

describe('NEXT-90 actual GitHub Actions historical resource artifacts', () => {
  it('compares two archived JSON reports from distinct successful CI runs', () => {
    const history = createResourceHistory([first, second]);
    expect(history.schemaVersion).toBe(1);
    expect(history.runs.map(run => run.runId)).toEqual([40266761987, 40267008446]);
    expect(history.deltas).toHaveLength(1);
    expect(history.deltas[0]?.differences.map(delta => delta.participants)).toEqual([2, 4, 8, 16]);
    // Identical production simulation, only documentation changed between these two runs.
    expect(history.deltas[0]?.differences.map(delta => delta.archiveBytesDelta)).toEqual([0, 0, 0, 0]);
    expect(history.deltas[0]?.differences.map(delta => delta.archiveBytesPercent)).toEqual([0, 0, 0, 0]);
    // Wall-clock and heap values are diagnostic, never used as acceptance thresholds.
    expect(history.deltas[0]?.differences.every(delta => delta.elapsedMsPercent !== null &&
      Number.isFinite(delta.elapsedMsPercent) && Number.isFinite(delta.heapDeltaBytes))).toBe(true);
    expect(Object.isFrozen(history.runs)).toBe(true);
    expect(Object.isFrozen(history.deltas[0]?.differences)).toBe(true);
    expect(history.runs[0]?.report.samples.map(sample => sample.archiveBytes)).toEqual([815, 2082, 6646, 24004]);
  });

  it('rejects a single artifact, reordered runs and duplicate artifact identifiers', () => {
    expect(() => createResourceHistory([first])).toThrow(/Mindestens zwei/);
    expect(() => createResourceHistory([second, first])).toThrow(/chronologisch/);
    expect(() => createResourceHistory([first, { ...second, artifactId: first.artifactId }])).toThrow(/eindeutig/);
    expect(() => createResourceHistory([first, { ...second, runId: first.runId }])).toThrow(/chronologisch/);
  });

  it('rejects malformed metadata, tampered samples and incompatible scenarios', () => {
    expect(() => createResourceHistory([{ ...first, commit: 'bad' }, second])).toThrow(/Artefaktmetadaten/);
    expect(() => createResourceHistory([{ ...first, runId: 0 }, second])).toThrow(/Artefaktmetadaten/);
    expect(() => createResourceHistory([{ ...first, report: { ...first.report, schemaVersion: 2 as 1 } }, second])).toThrow(/berichtsversion/);
    expect(() => createResourceHistory([first, {
      ...second, report: { ...second.report, samples: second.report.samples.map(s =>
        s.participants === 16 ? { ...s, matches: 1 } : s) }
    }])).toThrow(/Ungültige/);
    expect(() => createResourceHistory([first, {
      ...second, report: { ...second.report, scenario: 'different-scenario' }
    }])).toThrow(/nicht vergleichbar/);
  });

  it('supports a third run without skipping intermediate comparisons', () => {
    const third = { ...second, runId: second.runId + 1, artifactId: second.artifactId + 1 };
    const history = createResourceHistory([first, second, third]);
    expect(history.deltas.map(delta => [delta.fromRunId, delta.toRunId])).toEqual([
      [first.runId, second.runId], [second.runId, third.runId]
    ]);
    expect(history.deltas[1]?.differences.every(delta => delta.archiveBytesDelta === 0)).toBe(true);
  });
});
