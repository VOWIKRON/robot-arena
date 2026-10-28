import { describe, expect, it } from 'vitest';
import { RAPTOR } from '../src/engine/presets';
import { runMatch } from '../src/engine/simulation';
import type { MatchState, RobotDefinition } from '../src/engine/types';
import type { StrategyType } from '../src/engine/strategy-config';

/**
 * NEXT-105: strategy-only, mirrored-side diagnostics. Same chassis and seed
 * on both sides isolates tactical differences from hardware differences.
 * Side-swapped games are NOT expected to have identical winners: the engine
 * deliberately updates A before B and consumes RNG in action order.
 */
const seeds = [1, 12, 42, 99, 4711, 8192] as const;
const opponents = ['aggressive', 'defensive', 'distance', 'melee'] as const satisfies readonly StrategyType[];
const maxTicks = 180;

type Side = 'A' | 'B';
type Result = Readonly<{
  seed: number;
  opponent: StrategyType;
  adaptiveSide: Side;
  outcome: 'adaptive' | 'opponent' | 'draw';
  tick: number;
  remainingAdaptive: number;
  remainingOpponent: number;
}>;

function definition(id: string, strategy: StrategyType): RobotDefinition {
  return { ...RAPTOR, id, name: id, strategy };
}

function inspect(state: MatchState, adaptiveSide: Side, seed: number, opponent: StrategyType): Result {
  const adaptive = adaptiveSide === 'A' ? state.robotA : state.robotB;
  const other = adaptiveSide === 'A' ? state.robotB : state.robotA;
  expect(state.tick).toBeGreaterThan(0);
  expect(state.tick).toBeLessThanOrEqual(maxTicks);
  expect(['victory', 'draw']).toContain(state.outcome);
  expect(state.outcome === 'draw' ? state.winner : state.winner !== null).toBe(state.outcome === 'draw' ? null : true);
  expect(state.endReason).toBe(state.outcome === 'draw' ? 'timeout' : 'destroyed');
  for (const robot of [adaptive, other]) {
    expect(robot.structure).toBeGreaterThanOrEqual(0);
    expect(robot.structure).toBeLessThanOrEqual(robot.definition.maxStructure);
    expect(robot.energy).toBeGreaterThanOrEqual(0);
    expect(robot.energy).toBeLessThanOrEqual(robot.definition.maxEnergy);
    expect(robot.position.x).toBeGreaterThanOrEqual(0);
    expect(robot.position.x).toBeLessThanOrEqual(state.width);
    expect(robot.position.y).toBeGreaterThanOrEqual(0);
    expect(robot.position.y).toBeLessThanOrEqual(state.height);
  }
  const outcome = state.outcome === 'draw' ? 'draw'
    : state.winner === adaptive.definition.id ? 'adaptive' : 'opponent';
  expect(state.outcome === 'draw' || state.winner === other.definition.id || state.winner === adaptive.definition.id).toBe(true);
  return {
    seed, opponent, adaptiveSide, outcome, tick: state.tick,
    remainingAdaptive: adaptive.structure, remainingOpponent: other.structure
  };
}

function mirrored(seed: number, opponent: StrategyType): readonly [Result, Result] {
  const adaptive = definition('adaptive', 'adaptive');
  const rival = definition('opponent', opponent);
  const first = runMatch(adaptive, rival, seed, maxTicks);
  const second = runMatch(rival, adaptive, seed, maxTicks);
  // Exact seeded replay is required in both orientations.
  expect(runMatch(adaptive, rival, seed, maxTicks)).toEqual(first);
  expect(runMatch(rival, adaptive, seed, maxTicks)).toEqual(second);
  return [inspect(first, 'A', seed, opponent), inspect(second, 'B', seed, opponent)];
}

describe('NEXT-105 adaptive mirrored strategy balance diagnostics', () => {
  it.each(opponents)('measures adaptive versus %s on both sides for all six seeds', opponent => {
    const results = seeds.flatMap(seed => mirrored(seed, opponent));
    expect(results).toHaveLength(seeds.length * 2);
    expect(results.filter(item => item.adaptiveSide === 'A')).toHaveLength(seeds.length);
    expect(results.filter(item => item.adaptiveSide === 'B')).toHaveLength(seeds.length);
    expect(new Set(results.map(item => `${item.seed}/${item.adaptiveSide}`)).size).toBe(seeds.length * 2);
    expect(results.every(item => item.opponent === opponent)).toBe(true);
    const summarize = (side: Side) => {
      const games = results.filter(item => item.adaptiveSide === side);
      const wins = games.filter(item => item.outcome === 'adaptive').length;
      const losses = games.filter(item => item.outcome === 'opponent').length;
      const draws = games.filter(item => item.outcome === 'draw').length;
      expect(wins + losses + draws).toBe(seeds.length);
      return { wins, losses, draws, totalTicks: games.reduce((sum, item) => sum + item.tick, 0) };
    };
    const asA = summarize('A'), asB = summarize('B');
    // Report side skew as a measurement, not an invented fairness threshold.
    // Balance tuning needs evidence across seeds, not a forced 50% win rate.
    console.info(`NEXT-105 balance ${opponent}: ${JSON.stringify({ adaptiveAsA: asA, adaptiveAsB: asB, adaptiveWinSideDelta: asA.wins - asB.wins })}`);
  });

  it('does not mutate robot definitions while running a mirrored matchup', () => {
    const adaptive = definition('adaptive', 'adaptive');
    const rival = definition('opponent', 'defensive');
    const before = structuredClone({ adaptive, rival });
    runMatch(adaptive, rival, 4711, maxTicks);
    runMatch(rival, adaptive, 4711, maxTicks);
    expect({ adaptive, rival }).toEqual(before);
  });
});
