import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { runMatch } from '../src/engine/simulation';
import type { MatchState, RobotDefinition } from '../src/engine/types';
import type { StrategyType } from '../src/engine/strategy-config';

/**
 * NEXT-107: expanded mirrored-seed diagnostics across two hardware profiles.
 * A acts first in the simulation, so side-swap results need not be symmetric.
 * Bias is measured and reported, never forced to an arbitrary 50% threshold.
 */
const seeds = [2, 7, 13, 31, 42, 99, 4711, 8192] as const;
const opponents = ['aggressive', 'defensive', 'distance', 'melee'] as const satisfies readonly StrategyType[];
const scenarios = [
  { name: 'raptor', base: RAPTOR },
  { name: 'titan', base: TITAN }
] as const;
const maxTicks = 180;
type Side = 'A' | 'B';
type Outcome = 'adaptive' | 'opponent' | 'draw';
type Observation = Readonly<{
  seed: number;
  side: Side;
  outcome: Outcome;
  ticks: number;
  adaptiveStructure: number;
  opponentStructure: number;
}>;
type Totals = Readonly<{ wins: number; losses: number; draws: number; games: number; ticks: number }>;

function robot(base: RobotDefinition, id: string, strategy: StrategyType): RobotDefinition {
  return { ...base, id, name: id, strategy };
}

function observe(state: MatchState, side: Side, seed: number): Observation {
  expect(state.tick).toBeGreaterThan(0);
  expect(state.tick).toBeLessThanOrEqual(maxTicks);
  expect(['victory', 'draw']).toContain(state.outcome);
  expect(state.endReason).toBe(state.outcome === 'draw' ? 'timeout' : 'destroyed');
  const adaptive = side === 'A' ? state.robotA : state.robotB;
  const opponent = side === 'A' ? state.robotB : state.robotA;
  expect(adaptive.definition.id).toBe('adaptive');
  expect(opponent.definition.id).toBe('opponent');
  expect(state.winner).toBe(state.outcome === 'draw' ? null : state.winner);
  if (state.outcome === 'victory') {
    expect([adaptive.definition.id, opponent.definition.id]).toContain(state.winner);
  }
  for (const bot of [adaptive, opponent]) {
    expect(Number.isFinite(bot.structure)).toBe(true);
    expect(Number.isFinite(bot.energy)).toBe(true);
    expect(bot.structure).toBeGreaterThanOrEqual(0);
    expect(bot.structure).toBeLessThanOrEqual(bot.definition.maxStructure);
    expect(bot.energy).toBeGreaterThanOrEqual(0);
    expect(bot.energy).toBeLessThanOrEqual(bot.definition.maxEnergy);
    expect(bot.position.x).toBeGreaterThanOrEqual(0);
    expect(bot.position.x).toBeLessThanOrEqual(state.width);
    expect(bot.position.y).toBeGreaterThanOrEqual(0);
    expect(bot.position.y).toBeLessThanOrEqual(state.height);
  }
  const outcome: Outcome = state.outcome === 'draw' ? 'draw'
    : state.winner === adaptive.definition.id ? 'adaptive' : 'opponent';
  return {
    seed, side, outcome, ticks: state.tick,
    adaptiveStructure: adaptive.structure,
    opponentStructure: opponent.structure
  };
}

function summarize(observations: readonly Observation[], side: Side): Totals {
  const games = observations.filter(item => item.side === side);
  return {
    wins: games.filter(item => item.outcome === 'adaptive').length,
    losses: games.filter(item => item.outcome === 'opponent').length,
    draws: games.filter(item => item.outcome === 'draw').length,
    games: games.length,
    ticks: games.reduce((total, item) => total + item.ticks, 0)
  };
}

describe('NEXT-107 multiseed side-bias diagnostics', () => {
  it('counts outcomes and tick totals independently for both starting sides', () => {
    const data: Observation[] = [
      { seed: 1, side: 'A', outcome: 'adaptive', ticks: 3, adaptiveStructure: 2, opponentStructure: 0 },
      { seed: 2, side: 'A', outcome: 'draw', ticks: 7, adaptiveStructure: 2, opponentStructure: 2 },
      { seed: 1, side: 'B', outcome: 'opponent', ticks: 5, adaptiveStructure: 0, opponentStructure: 2 }
    ];
    expect(summarize(data, 'A')).toEqual({ wins: 1, losses: 0, draws: 1, games: 2, ticks: 10 });
    expect(summarize(data, 'B')).toEqual({ wins: 0, losses: 1, draws: 0, games: 1, ticks: 5 });
  });

  it.each(scenarios)('measures both sides with eight seeds and four opponents on $name hardware', ({ name, base }) => {
    const observations: Observation[] = [];
    for (const opponentStrategy of opponents) {
      const adaptive = robot(base, 'adaptive', 'adaptive');
      const opponent = robot(base, 'opponent', opponentStrategy);
      const definitionsBefore = structuredClone({ adaptive, opponent });
      const pair: Observation[] = [];
      for (const seed of seeds) {
        const orientations = [
          { side: 'A' as const, first: adaptive, second: opponent },
          { side: 'B' as const, first: opponent, second: adaptive }
        ];
        for (const { side, first, second } of orientations) {
          const state = runMatch(first, second, seed, maxTicks);
          // Exact deterministic replay is mandatory for each seed and orientation.
          expect(runMatch(first, second, seed, maxTicks)).toEqual(state);
          pair.push(observe(state, side, seed));
        }
      }
      expect({ adaptive, opponent }).toEqual(definitionsBefore);
      expect(pair).toHaveLength(seeds.length * 2);
      expect(new Set(pair.map(item => `${item.seed}/${item.side}`)).size).toBe(seeds.length * 2);
      const asA = summarize(pair, 'A'), asB = summarize(pair, 'B');
      for (const total of [asA, asB]) {
        expect(total.games).toBe(seeds.length);
        expect(total.wins + total.losses + total.draws).toBe(seeds.length);
        expect(total.ticks).toBeGreaterThan(0);
        expect(total.ticks).toBeLessThanOrEqual(seeds.length * maxTicks);
      }
      // Diagnostics only: report observed skew, do not invent a fairness gate.
      console.info(`NEXT-107 side-bias ${JSON.stringify({
        chassis: name, opponent: opponentStrategy, seeds: [...seeds],
        adaptiveAsA: asA, adaptiveAsB: asB,
        winDeltaAminusB: asA.wins - asB.wins,
        drawDeltaAminusB: asA.draws - asB.draws
      })}`);
      observations.push(...pair);
    }
    expect(observations).toHaveLength(opponents.length * seeds.length * 2);
    expect(new Set(observations.map(item => `${item.seed}/${item.side}/${item.outcome}`)).size)
      .toBeGreaterThan(0);
  });
});
