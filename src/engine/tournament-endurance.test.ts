import { describe, expect, it } from 'vitest';
import { createEnduranceFixture } from './tournament-endurance-fixture';
import { advanceTournamentRun, createTournamentRun, finishTournamentRun, pauseTournamentRun, resumeTournamentRun } from './tournament-runner';
import { exportTournamentRun, importTournamentRun } from './tournament-archive';
import { computeRoundRobinStandings } from './tournament-standings';

/** NEXT-88: deterministic long-running simulation and bounded archive/resource diagnostics.
 * The robot configuration cannot attack or move, so every fixture reaches maxTicks.
 * Timing and heap measurements are diagnostics, never CI pass/fail thresholds. */
describe('NEXT-88 deterministic high-tick endurance and resource diagnostics', () => {
  it('replays a 16-robot, 120-match, 48-tick tournament exactly across archive pause/resume', () => {
    const definition = createEnduranceFixture(16, 48);
    const startHeap = process.memoryUsage().heapUsed;
    const started = performance.now();
    const baseline = finishTournamentRun(createTournamentRun(definition));
    expect(baseline.results).toHaveLength(120);
    expect(baseline.results.every(result => result.ticks === 48 && result.winnerId === null)).toBe(true);
    expect(baseline.results.reduce((sum, result) => sum + result.ticks, 0)).toBe(5760);

    let interrupted = createTournamentRun(definition);
    for (let i = 0; i < 60; i++) interrupted = advanceTournamentRun(interrupted);
    const pausedArchive = exportTournamentRun(pauseTournamentRun(interrupted));
    const restored = importTournamentRun(pausedArchive);
    expect(restored.status).toBe('paused');
    expect(restored.results).toEqual(baseline.results.slice(0, 60));
    const resumed = finishTournamentRun(resumeTournamentRun(restored));
    expect(resumed).toEqual(baseline);
    const archive = exportTournamentRun(resumed);
    expect(archive).toBe(exportTournamentRun(baseline));
    expect(exportTournamentRun(importTournamentRun(archive))).toBe(archive);
    const archiveBytes = new TextEncoder().encode(archive).length;
    expect(archiveBytes).toBeLessThan(2 * 1024 * 1024);
    const standings = computeRoundRobinStandings(definition, resumed.results);
    expect(standings.complete).toBe(true);
    expect(standings.standings.reduce((sum, row) => sum + row.played, 0)).toBe(240);
    console.info('[NEXT-88 diagnostics]', JSON.stringify({
      fixtures: 120, ticks: 5760, archiveBytes,
      elapsedMs: Math.round(performance.now() - started),
      heapDeltaBytes: process.memoryUsage().heapUsed - startHeap
    }));
  });

  it('honors the validated maximum 3600-tick budget without a timeout-based CI assertion', () => {
    const definition = createEnduranceFixture(2, 3600);
    const started = performance.now();
    const completed = finishTournamentRun(createTournamentRun(definition));
    expect(completed.results).toHaveLength(1);
    expect(completed.results[0]?.ticks).toBe(3600);
    expect(completed.results[0]?.winnerId).toBeNull();
    expect(importTournamentRun(exportTournamentRun(completed))).toEqual(completed);
    expect(() => createEnduranceFixture(2, 3601)).toThrow(/Turnier-maxTicks/);
    console.info('[NEXT-88 maxTicks diagnostics]', JSON.stringify({
      ticks: 3600, elapsedMs: Math.round(performance.now() - started)
    }));
  });
});
