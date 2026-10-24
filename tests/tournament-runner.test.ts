import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { runMatch } from '../src/engine/simulation';
import { createTournamentDefinition } from '../src/engine/tournament-model';
import { createRoundRobinSchedule } from '../src/engine/tournament-schedule';
import { computeRoundRobinStandings } from '../src/engine/tournament-standings';
import {
  advanceTournamentRun, cancelTournamentRun, createTournamentRun,
  finishTournamentRun, pauseTournamentRun, resumeTournamentRun
} from '../src/engine/tournament-runner';

const definition = (count: number, seed = 12, maxTicks = 15) => createTournamentDefinition({
  schemaVersion: 1, id: 'runner-test', format: 'round-robin', baseSeed: seed, maxTicks,
  participants: Array.from({ length: count }, (_, i) => ({
    ...(i % 2 ? TITAN : RAPTOR), id: `r${i}`, name: `Robot ${i}`
  }))
});

describe('NEXT-56 deterministic serial tournament runner', () => {
  it.each([2, 4, 16])('executes every fixture exactly once for %i participants', count => {
    const model = definition(count, 4711, 1);
    const before = structuredClone(model);
    const fixtures = createRoundRobinSchedule(model);
    const result = finishTournamentRun(createTournamentRun(model));
    expect(result.status).toBe('completed');
    expect(result.nextMatchIndex).toBe(fixtures.length);
    expect(result.totalMatches).toBe(count * (count - 1) / 2);
    expect(result.results.map(item => item.matchId)).toEqual(fixtures.map(item => item.id));
    expect(result.results.map(item => item.seed)).toEqual(fixtures.map(item => item.seed));
    expect(result.results.every(item => item.ticks === 1 && item.winnerId === null)).toBe(true);
    expect(computeRoundRobinStandings(model, result.results).complete).toBe(true);
    expect(model).toEqual(before);
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.results)).toBe(true);
    expect(Object.isFrozen(result.results[0])).toBe(true);
  });

  it('matches the real engine result and respects the exact timeout', () => {
    const model = definition(2, 12, 1);
    const fixture = createRoundRobinSchedule(model)[0]!;
    const expected = runMatch(model.participants[0]!, model.participants[1]!, fixture.seed, model.maxTicks);
    const completed = advanceTournamentRun(createTournamentRun(model));
    expect(completed.status).toBe('completed');
    expect(completed.results[0]).toEqual({
      matchId: fixture.id, robotAId: fixture.robotAId, robotBId: fixture.robotBId,
      seed: fixture.seed, winnerId: expected.winner, ticks: expected.tick,
      remainingStructureA: expected.robotA.structure,
      remainingStructureB: expected.robotB.structure
    });
    expect(expected.outcome).toBe('draw');
    expect(expected.endReason).toBe('timeout');
  });

  it.each([1, 12, 4711])('produces identical results with seed %i after pause and resume', seed => {
    const model = definition(4, seed, 40);
    const first = createTournamentRun(model);
    const afterOne = advanceTournamentRun(first);
    const paused = pauseTournamentRun(afterOne);
    expect(advanceTournamentRun(paused)).toBe(paused);
    expect(paused.results).toEqual(afterOne.results);
    const resumed = resumeTournamentRun(paused);
    const end = finishTournamentRun(resumed);
    expect(end.results).toEqual(finishTournamentRun(createTournamentRun(model)).results);
    expect(first.status).toBe('ready');
    expect(first.results).toEqual([]);
    expect(afterOne.results).toHaveLength(1);
    expect(resumed.results).toHaveLength(1);
    expect(Object.isFrozen(paused.results)).toBe(true);
  });

  it('preserves all completed results on cancellation and never runs another fixture', () => {
    const start = createTournamentRun(definition(4));
    const progressed = advanceTournamentRun(advanceTournamentRun(start));
    const cancelled = cancelTournamentRun(progressed);
    expect(cancelled.status).toBe('cancelled');
    expect(cancelled.nextMatchIndex).toBe(2);
    expect(cancelled.results).toEqual(progressed.results);
    expect(advanceTournamentRun(cancelled)).toBe(cancelled);
    expect(cancelTournamentRun(cancelled)).toBe(cancelled);
    expect(() => resumeTournamentRun(cancelled)).toThrow(/Pause/);
    expect(() => finishTournamentRun(cancelled)).toThrow(/abgebrochen/);
  });

  it('rejects invalid lifecycle transitions without mutating prior snapshots', () => {
    const initial = createTournamentRun(definition(2));
    expect(() => resumeTournamentRun(initial)).toThrow(/Pause/);
    const paused = pauseTournamentRun(initial);
    expect(() => pauseTournamentRun(paused)).toThrow(/Pausieren/);
    const completed = finishTournamentRun(resumeTournamentRun(paused));
    expect(advanceTournamentRun(completed)).toBe(completed);
    expect(() => cancelTournamentRun(completed)).toThrow(/abgeschlossen/);
    expect(() => pauseTournamentRun(completed)).toThrow(/Pausieren/);
    const cancelledBeforeFirst = cancelTournamentRun(initial);
    expect(cancelledBeforeFirst.results).toEqual([]);
    expect(initial.status).toBe('ready');
  });

  it('rejects unsupported knockout format before executing any match', () => {
    const knockout = createTournamentDefinition({ ...definition(2), format: 'knockout' });
    expect(() => createTournamentRun(knockout)).toThrow(/round-robin/);
  });

  it('handles 120 matches with a bounded deterministic batch', () => {
    const model = definition(16, 1, 1);
    const start = performance.now();
    const end = finishTournamentRun(createTournamentRun(model));
    expect(end.results).toHaveLength(120);
    expect(end.results.map(x => x.matchId)).toEqual(createRoundRobinSchedule(model).map(x => x.id));
    expect(performance.now() - start).toBeLessThan(10000);
  });
});
