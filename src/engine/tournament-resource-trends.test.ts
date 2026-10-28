import { writeFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { createEnduranceFixture } from './tournament-endurance-fixture';
import { finishTournamentRun, createTournamentRun } from './tournament-runner';
import { exportTournamentRun, importTournamentRun } from './tournament-archive';
import { compareResourceReports, createResourceReport, type ResourceSample } from './tournament-resource-trends';

describe('NEXT-89 resource trends (diagnostic only, no flaky timing thresholds)', () => {
  it('captures reproducible archive growth at 2/4/8/16 robots with real measured resources', () => {
    const samples: ResourceSample[] = [];
    for (const participants of [2, 4, 8, 16]) {
      const definition = createEnduranceFixture(participants, 24);
      const heapBefore = process.memoryUsage().heapUsed;
      const started = performance.now();
      const run = finishTournamentRun(createTournamentRun(definition));
      const elapsedMs = performance.now() - started;
      const archive = exportTournamentRun(run);
      expect(exportTournamentRun(importTournamentRun(archive))).toBe(archive);
      const matches = participants * (participants - 1) / 2;
      expect(run.results).toHaveLength(matches);
      expect(run.results.every(result => result.ticks === 24)).toBe(true);
      samples.push({
        participants, matches,
        ticks: run.results.reduce((sum, result) => sum + result.ticks, 0),
        archiveBytes: new TextEncoder().encode(archive).length,
        elapsedMs,
        heapDeltaBytes: process.memoryUsage().heapUsed - heapBefore
      });
    }
    const report = createResourceReport('round-robin-fixed-seed-24ticks', samples);
    expect(report.samples.map(sample => sample.matches)).toEqual([1, 6, 28, 120]);
    expect(report.samples.map(sample => sample.ticks)).toEqual([24, 144, 672, 2880]);
    expect(report.samples.every(sample => sample.archiveBytes > 0 && sample.elapsedMs >= 0)).toBe(true);
    expect(Object.isFrozen(report.samples)).toBe(true);
    const same = compareResourceReports(report, report);
    expect(same.every(row => row.archiveBytesDelta === 0 && row.archiveBytesPercent === 0)).toBe(true);
    // CI retains each report as an artifact; compare two reports offline for historical trends.
    if (process.env.NEXT89_RESOURCE_REPORT_PATH) {
      writeFileSync(process.env.NEXT89_RESOURCE_REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf8');
    }
    console.info('[NEXT-89 resource-trend-report]', JSON.stringify(report));
  });

  it('validates schema, duplicate sizes, and mismatched comparisons', () => {
    const sample: ResourceSample = {
      participants: 2, matches: 1, ticks: 24, archiveBytes: 100,
      elapsedMs: 10, heapDeltaBytes: -50
    };
    const before = createResourceReport('scenario-a', [sample]);
    const after = createResourceReport('scenario-a', [{ ...sample, archiveBytes: 125, elapsedMs: 15, heapDeltaBytes: 25 }]);
    expect(compareResourceReports(before, after)).toEqual([{
      participants: 2, archiveBytesDelta: 25, archiveBytesPercent: 25,
      elapsedMsPercent: 50, heapDeltaBytes: 75
    }]);
    expect(() => createResourceReport('x', [sample, sample])).toThrow(/Doppelte/);
    expect(() => createResourceReport('x', [{ ...sample, matches: 9 }])).toThrow(/Ungültige/);
    expect(() => createResourceReport('x', [{ ...sample, elapsedMs: Number.NaN }])).toThrow(/Ungültige/);
    expect(() => compareResourceReports(before, createResourceReport('scenario-b', [sample]))).toThrow(/nicht vergleichbar/);
    expect(() => compareResourceReports(before, createResourceReport('scenario-a', [{ ...sample, participants: 4, matches: 6, ticks: 144 }]))).toThrow(/Testgrößen/);
    expect(compareResourceReports(
      createResourceReport('scenario-a', [{ ...sample, elapsedMs: 0 }]), after
    )[0]?.elapsedMsPercent).toBeNull();
  });
});
