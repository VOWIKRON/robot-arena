import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from './presets';
import { createTournamentDefinition } from './tournament-model';
import { createTournamentRun, advanceTournamentRun, finishTournamentRun } from './tournament-runner';
import { tournamentMatchDetails } from './tournament-details';

const makeRun = (n: number) => createTournamentRun(createTournamentDefinition({
  schemaVersion: 1, id: 'details', format: 'round-robin', baseSeed: 4711, maxTicks: 12,
  participants: Array.from({ length: n }, (_, index) => ({
    ...(index % 2 ? TITAN : RAPTOR),
    id: 'robot-' + index,
    name: index === 0 ? 'Änne <b>Robot</b>' : 'Robot ' + index
  }))
}));

describe('NEXT-66 deterministic tournament match details', () => {
  for (const n of [2, 16]) {
    it('shows exactly the real fixtures, never invented values, for ' + n + ' participants', () => {
      const ready = makeRun(n);
      const pending = tournamentMatchDetails(ready);
      expect(pending).toHaveLength(n * (n - 1) / 2);
      expect(pending.every(d => d.status === 'pending' && d.ticks === null &&
        d.winnerName === null && d.remainingStructureA === null && d.remainingStructureB === null)).toBe(true);
      expect(pending[0]?.robotAName).toBe('Änne <b>Robot</b>');
      expect(Object.isFrozen(pending)).toBe(true);
      expect(Object.isFrozen(pending[0])).toBe(true);
      const first = advanceTournamentRun(ready);
      const details = tournamentMatchDetails(first);
      expect(details[0]).toMatchObject({
        status: 'completed',
        matchId: first.results[0]?.matchId,
        seed: first.results[0]?.seed,
        ticks: first.results[0]?.ticks,
        remainingStructureA: first.results[0]?.remainingStructureA,
        remainingStructureB: first.results[0]?.remainingStructureB
      });
      expect(details[0]?.winnerName).toBe(first.results[0]?.winnerId
        ? first.definition.participants.find(p => p.id === first.results[0]?.winnerId)?.name
        : null);
      expect(details.slice(1).every(d => d.status === 'pending')).toBe(true);
      expect(tournamentMatchDetails(first)).toEqual(details);
      expect(tournamentMatchDetails(ready)).toEqual(pending);
      const complete = tournamentMatchDetails(finishTournamentRun(ready));
      expect(complete.every(d => d.status === 'completed')).toBe(true);
      expect(complete.map(d => d.seed)).toEqual(pending.map(d => d.seed));
    });
  }
  it('shows draws at the tick limit without manufacturing a winner', () => {
    const run = makeRun(2);
    const first = advanceTournamentRun(run);
    const draw = {
      ...first, results: [{ ...first.results[0]!, winnerId: null, ticks: run.definition.maxTicks }]
    };
    expect(tournamentMatchDetails(draw)[0]).toMatchObject({
      status: 'completed', winnerName: null, ticks: run.definition.maxTicks
    });
  });
  it('rejects mismatched result seeds and does not mutate source snapshots', () => {
    const run = advanceTournamentRun(makeRun(2));
    const corrupted = { ...run, results: [{ ...run.results[0]!, seed: -1 }] };
    expect(() => tournamentMatchDetails(corrupted)).toThrow(/Seed/);
    expect(tournamentMatchDetails(run)[0]?.seed).toBe(run.results[0]?.seed);
  });
});
