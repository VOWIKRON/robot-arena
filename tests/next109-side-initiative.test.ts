import { describe, expect, it } from 'vitest';
import { RAPTOR } from '../src/engine/presets';
import { SeededRandom } from '../src/engine/random';
import { createMatch, runMatch, stepMatchWithEvents } from '../src/engine/simulation';
import type { MatchState, RobotDefinition } from '../src/engine/types';

/**
 * NEXT-109: reproduce the turn-order/first-shot mechanism before changing combat rules.
 * This file intentionally diagnoses the existing engine rather than silently changing
 * historical event-stream fixtures or asserting an arbitrary 50% win rate.
 */
const seeds = [2, 7, 13, 31, 42, 99, 4711, 8192] as const;
const bot = (id: string, strategy: RobotDefinition['strategy']): RobotDefinition =>
  ({ ...RAPTOR, id, name: id, strategy });

function trace(initial: MatchState, seed: number, limit = 180) {
  const rng = new SeededRandom(seed);
  let state = initial;
  const shots: Array<{ tick: number; attackerId: string }> = [];
  while (state.outcome === 'active' && state.tick < limit) {
    const result = stepMatchWithEvents(state, rng);
    state = result.state;
    for (const event of result.events) {
      if (event.type === 'shot') shots.push({ tick: event.tick, attackerId: event.attackerId });
    }
  }
  return { state, shots };
}

describe('NEXT-109: isolate the start-side initiative bias', () => {
  it('B reaches firing range one tick earlier with identical Raptor hardware', () => {
    const first = trace(createMatch(bot('a', 'adaptive'), bot('b', 'aggressive')), 2);
    expect(first.shots.slice(0, 2)).toEqual([
      { tick: 14, attackerId: 'b' },
      { tick: 15, attackerId: 'a' }
    ]);
    expect(first.state.winner).toBe('b');
    expect(trace(createMatch(bot('a', 'adaptive'), bot('b', 'aggressive')), 2)).toEqual(first);
  });

  it('swapping only the strategy assignment leaves the Raptor side-B winner unchanged for all diagnostic seeds', () => {
    for (const seed of seeds) {
      const adaptiveA = runMatch(bot('adaptive', 'adaptive'), bot('opponent', 'aggressive'), seed, 180);
      const adaptiveB = runMatch(bot('opponent', 'aggressive'), bot('adaptive', 'adaptive'), seed, 180);
      expect(adaptiveA.winner).toBe('opponent');
      expect(adaptiveB.winner).toBe('adaptive');
      expect(adaptiveA.outcome).toBe('victory');
      expect(adaptiveB.outcome).toBe('victory');
    }
  });

  it('starting already in weapon range reverses first-shot priority to A', () => {
    const initial = createMatch(bot('a', 'aggressive'), bot('b', 'aggressive'));
    initial.robotA.position = { x: 40, y: 50 };
    initial.robotB.position = { x: 60, y: 50 };
    const result = trace(initial, 2);
    expect(result.shots.slice(0, 2)).toEqual([
      { tick: 1, attackerId: 'a' },
      { tick: 1, attackerId: 'b' }
    ]);
    expect(result.state.winner).toBe('a');
  });
});
