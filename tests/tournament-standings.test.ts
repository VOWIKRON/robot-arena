import { describe, expect, it } from 'vitest';
import { RAPTOR } from '../src/engine/presets';
import { createTournamentDefinition } from '../src/engine/tournament-model';
import { createRoundRobinSchedule } from '../src/engine/tournament-schedule';
import { computeRoundRobinStandings, type TournamentMatchResult } from '../src/engine/tournament-standings';

const definition = (count = 3) => createTournamentDefinition({
  schemaVersion: 1, id: 'cup', format: 'round-robin', baseSeed: 12, maxTicks: 3600,
  participants: Array.from({ length: count }, (_, i) => ({ ...RAPTOR, id: `r${i}`, name: `Robot ${i}` }))
});
const fixtureResult = (count: number, index: number, winner: string | null, a = 50, b = 30): TournamentMatchResult => {
  const fixture = createRoundRobinSchedule(definition(count))[index]!;
  return { matchId: fixture.id, robotAId: fixture.robotAId, robotBId: fixture.robotBId,
    seed: fixture.seed, winnerId: winner, ticks: 100, remainingStructureA: a, remainingStructureB: b };
};

describe('NEXT-54 immutable deterministic round-robin standings', () => {
  it('reports zero matches and stable participant-ID tiebreaks', () => {
    const output = computeRoundRobinStandings(definition(), []);
    expect(output).toMatchObject({ complete: false, completedMatches: 0, totalMatches: 3 });
    expect(output.standings.map(row => row.participantId)).toEqual(['r0', 'r1', 'r2']);
    expect(output.standings.every(row => row.points === 0 && row.played === 0)).toBe(true);
    expect(Object.isFrozen(output)).toBe(true);
    expect(Object.isFrozen(output.standings[0])).toBe(true);
  });

  it('scores wins 3, draws 1, losses 0, and preserves input snapshots', () => {
    const results = [
      fixtureResult(3, 0, 'r0'),
      fixtureResult(3, 1, null, 25, 25),
      fixtureResult(3, 2, 'r2', 10, 40)
    ];
    const before = structuredClone(results);
    const output = computeRoundRobinStandings(definition(), results);
    expect(results).toEqual(before);
    expect(output).toMatchObject({ complete: true, completedMatches: 3, totalMatches: 3 });
    expect(output.standings.map(row => [row.participantId, row.points, row.played, row.wins, row.draws, row.losses]))
      .toEqual([['r0', 4, 2, 1, 1, 0], ['r2', 4, 2, 1, 1, 0], ['r1', 0, 2, 0, 0, 2]]);
    expect(output.standings.map(row => row.structureDifference)).toEqual([20, 30, -50]);
  });

  it('uses structure difference and then ID for equal points, regardless of input order', () => {
    const results = [
      fixtureResult(3, 0, null, 30, 30),
      fixtureResult(3, 1, null, 30, 30),
      fixtureResult(3, 2, null, 30, 30)
    ];
    const first = computeRoundRobinStandings(definition(), results);
    expect(first.standings.map(row => row.participantId)).toEqual(['r0','r1','r2']);
    expect(computeRoundRobinStandings(definition(), [...results].reverse())).toEqual(first);
    expect(computeRoundRobinStandings(definition(), [fixtureResult(3, 0, 'r0', 50, 30)]).standings[0])
      .toMatchObject({ participantId: 'r0', points: 3, structureDifference: 20 });
  });

  it('rejects duplicate, unknown, excessive, mismatched and malformed match results', () => {
    const result = fixtureResult(3, 0, 'r0');
    expect(() => computeRoundRobinStandings(definition(), [result, result])).toThrow(/doppelte/);
    expect(() => computeRoundRobinStandings(definition(), [{ ...result, matchId: 'unknown' }])).toThrow(/unbekannte/);
    expect(() => computeRoundRobinStandings(definition(), Array(4).fill(result))).toThrow(/zu viele/);
    expect(() => computeRoundRobinStandings(definition(), [{ ...result, seed: 0 }])).toThrow(/Seed/);
    expect(() => computeRoundRobinStandings(definition(), [{ ...result, robotAId: 'bad' }])).toThrow(/Teilnehmer/);
    expect(() => computeRoundRobinStandings(definition(), [{ ...result, winnerId: 'bad' }])).toThrow(/Gewinner/);
    expect(() => computeRoundRobinStandings(definition(), [{ ...result, ticks: 3601 }])).toThrow(/Ticks/);
    expect(() => computeRoundRobinStandings(definition(), [{ ...result, remainingStructureA: Infinity }])).toThrow(/Reststruktur/);
    expect(() => computeRoundRobinStandings(definition(), [{ ...result, remainingStructureB: -1 }])).toThrow(/Reststruktur/);
  });

  it('handles 2 and 16 participants, with no result duplication or hidden RNG', () => {
    for (const count of [2, 16]) {
      const tournament = definition(count);
      const fixtures = createRoundRobinSchedule(tournament);
      const results = fixtures.map(fixture => ({
        matchId: fixture.id, robotAId: fixture.robotAId, robotBId: fixture.robotBId,
        seed: fixture.seed, winnerId: null, ticks: 3600,
        remainingStructureA: 0, remainingStructureB: 0
      }));
      const output = computeRoundRobinStandings(tournament, results);
      expect(output.completedMatches).toBe(count * (count - 1) / 2);
      expect(output.complete).toBe(true);
      expect(output.standings.every(row => row.played === count - 1 && row.points === count - 1)).toBe(true);
      expect(computeRoundRobinStandings(tournament, [...results].reverse())).toEqual(output);
    }
  });
});
