import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from './presets';
import { createTournamentDefinition } from './tournament-model';
import { advanceTournamentRun, createTournamentRun } from './tournament-runner';
import { exportTournamentRun, importTournamentRun } from './tournament-archive';
import { ReplayPlayer } from './replay-player';
import { replayTournamentMatch } from './tournament-replay';

function makeRun(maxTicks = 12, count = 2, harmless = false) {
  return createTournamentRun(createTournamentDefinition({
    schemaVersion: 1, id: 'replay-isolation', format: 'round-robin',
    baseSeed: 4711, maxTicks,
    participants: Array.from({ length: count }, (_, index) => ({
      ...(index % 2 ? TITAN : RAPTOR),
      ...(harmless ? { weaponDamage: 0, speed: 0 } : {}),
      id: 'robot-' + index, name: 'Robot ' + index
    }))
  }));
}

describe('NEXT-67 isolated, verified tournament replay', () => {
  for (const [count, ticks] of [[2, 1], [3, 12], [16, 12], [2, 3600]] as const) {
    it(`recreates the archived outcome for ${count} participants and ${ticks} tick limit`, () => {
      const run = advanceTournamentRun(makeRun(ticks, count, ticks === 3600));
      const original = JSON.stringify(run);
      const id = run.results[0]!.matchId;
      const recording = replayTournamentMatch(run, id);
      expect(recording.seed).toBe(run.results[0]!.seed);
      expect(recording.finalState.tick).toBe(run.results[0]!.ticks);
      expect(recording.finalState.winner).toBe(run.results[0]!.winnerId);
      expect(recording.finalState.robotA.structure).toBe(run.results[0]!.remainingStructureA);
      expect(recording.finalState.robotB.structure).toBe(run.results[0]!.remainingStructureB);
      expect(Object.isFrozen(recording)).toBe(true);
      const player = new ReplayPlayer(recording);
      player.seek(recording.frames.length);
      expect(player.state.tick).toBe(recording.finalState.tick);
      expect(JSON.stringify(run)).toBe(original);
      expect(replayTournamentMatch(run, id)).toEqual(recording);
      const loaded = importTournamentRun(exportTournamentRun(run));
      expect(replayTournamentMatch(loaded, id)).toEqual(recording);
    });
  }

  it('refuses pending, unknown and missing IDs without changing a run', () => {
    const run = makeRun();
    const snapshot = JSON.stringify(run);
    expect(() => replayTournamentMatch(run, 'match-001')).toThrow(/noch nicht abgeschlossen/);
    expect(() => replayTournamentMatch(run, 'unknown')).toThrow(/unbekannte Match-ID/);
    expect(() => replayTournamentMatch(run, '')).toThrow(/Match-ID fehlt/);
    expect(JSON.stringify(run)).toBe(snapshot);
  });

  it('rejects valid-looking but falsified archived outcomes, not merely invalid seeds', () => {
    const run = advanceTournamentRun(makeRun());
    const result = run.results[0]!;
    for (const altered of [
      { ...result, ticks: result.ticks === 0 ? 1 : 0 },
      { ...result, winnerId: result.winnerId === null ? result.robotAId : null },
      { ...result, remainingStructureA: Math.max(0, result.remainingStructureA - 1) }
    ]) {
      const tampered = { ...run, results: [altered] };
      expect(() => replayTournamentMatch(tampered, result.matchId)).toThrow(/Ergebnisabweichung/);
    }
  });

  it('rejects an impossible zero-tick tournament configuration', () => {
    expect(() => makeRun(0)).toThrow(/maxTicks/);
  });
});
