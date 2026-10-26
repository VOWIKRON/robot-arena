import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { createTournamentDefinition } from '../src/engine/tournament-model';
import { createRoundRobinSchedule } from '../src/engine/tournament-schedule';
import {
  advanceTournamentRun, createTournamentRun, finishTournamentRun,
  pauseTournamentRun, resumeTournamentRun, type TournamentRun
} from '../src/engine/tournament-runner';
import { exportTournamentRun, importTournamentRun } from '../src/engine/tournament-archive';
import type { StrategyType } from '../src/engine/strategy-config';

/** NEXT-104: integration of NEXT-99's 120-match tournament and NEXT-103's adaptive engine. */
const strategies: readonly StrategyType[] = ['aggressive', 'defensive', 'adaptive', 'distance', 'melee'];

function definition(seed: number) {
  return createTournamentDefinition({
    schemaVersion: 1, id: 'next104-integrated-120', format: 'round-robin',
    sideAssignment: 'balanced', baseSeed: seed, maxTicks: 24,
    participants: Array.from({ length: 16 }, (_, index) => ({
      ...(index % 2 ? TITAN : RAPTOR),
      id: `integrated-${String(index).padStart(2, '0')}`,
      name: `Integrated ${index}`,
      strategy: strategies[index % strategies.length]!,
      ...(index % strategies.length === 2
        ? { strategyParameters: { retreatStructureRatio: 0.55, targetDistanceRatio: 0.65, retreatDistanceFactor: 1.25 } }
        : {})
    }))
  });
}

/** Progress by match boundary, not by wall clock; do not duplicate runner logic. */
function advanceTo(start: TournamentRun, count: number): TournamentRun {
  let current = start;
  for (let i = current.nextMatchIndex; i < count; i++) current = advanceTournamentRun(current);
  return current;
}

describe('NEXT-104 integrated unpublished release candidate acceptance', () => {
  it.each([1, 4711])('16 robots, adaptive strategies, 120 fixtures and archive replay are deterministic (seed %i)', seed => {
    const model = definition(seed);
    const unchanged = structuredClone(model);
    const fixtures = createRoundRobinSchedule(model);
    expect(fixtures).toHaveLength(120);
    expect(new Set(fixtures.map(item => item.id)).size).toBe(120);
    expect(new Set(fixtures.map(item => item.seed)).size).toBe(120);

    const firstHalf = advanceTo(createTournamentRun(model), 60);
    expect(firstHalf.nextMatchIndex).toBe(60);
    const paused = pauseTournamentRun(firstHalf);
    const archive = exportTournamentRun(paused);
    expect(new TextEncoder().encode(archive).length).toBeLessThan(2 * 1024 * 1024);
    const restored = importTournamentRun(archive);
    expect(restored).toEqual(paused);
    expect(Object.isFrozen(restored)).toBe(true);

    const replay = finishTournamentRun(resumeTournamentRun(restored));
    const uninterrupted = finishTournamentRun(createTournamentRun(model));
    expect(replay.status).toBe('completed');
    expect(replay.nextMatchIndex).toBe(120);
    expect(replay.results).toHaveLength(120);
    expect(replay.results).toEqual(uninterrupted.results);
    expect(replay.results.map(item => item.matchId)).toEqual(fixtures.map(item => item.id));
    expect(replay.results.map(item => item.seed)).toEqual(fixtures.map(item => item.seed));
    expect(importTournamentRun(exportTournamentRun(replay))).toEqual(replay);
    expect(model).toEqual(unchanged);

    const adaptiveIds = new Set(model.participants.filter(p => p.strategy === 'adaptive').map(p => p.id));
    expect(adaptiveIds.size).toBeGreaterThan(0);
    for (const id of adaptiveIds) {
      expect(replay.results.filter(r => r.robotAId === id || r.robotBId === id)).toHaveLength(15);
      expect(replay.results.some(r => r.robotAId === id)).toBe(true);
      expect(replay.results.some(r => r.robotBId === id)).toBe(true);
    }
  });

  it('rejects an altered match ID in a paused adaptive 120-match archive', () => {
    const run = pauseTournamentRun(advanceTo(createTournamentRun(definition(12)), 3));
    const raw = JSON.parse(exportTournamentRun(run)) as { run: { results: Array<{ matchId: string }> } };
    raw.run.results[0]!.matchId = 'match-999';
    expect(() => importTournamentRun(JSON.stringify(raw))).toThrow(/Spielplanreihenfolge/);
    expect(run.results[0]!.matchId).toBe('match-001');
  });
});
