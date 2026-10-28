import { describe, expect, it } from 'vitest';
import { createMatch, runMatch, stepMatchWithEvents } from '../src/engine/simulation';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { STRATEGY_TYPES } from '../src/engine/components';
import { SeededRandom } from '../src/engine/random';
import fixtures from './strategy-stream-fixtures.json';
import defensiveFixtures from './defensive-stream-fixtures.json';
import { strategyDigest } from './strategy-digest';
import type { CombatEvent } from '../src/engine/events';

describe('strategy fixed-seed regressions', () => {
  it.each([
    { strategy: 'distance', seed: 1, tick: 147, winner: 'raptor', a: 5.112511274591084, b: 0 },
    { strategy: 'distance', seed: 12, tick: 147, winner: 'raptor', a: 2.8671394234523166, b: 0 },
    { strategy: 'distance', seed: 4711, tick: 147, winner: 'raptor', a: 0.6365351026877732, b: 0 },
    { strategy: 'defensive', seed: 1, tick: 147, winner: 'raptor', a: 5.112511274591084, b: 0 },
    { strategy: 'defensive', seed: 12, tick: 147, winner: 'raptor', a: 2.8671394234523166, b: 0 },
    { strategy: 'defensive', seed: 4711, tick: 147, winner: 'raptor', a: 0.6365351026877732, b: 0 },
    { strategy: 'melee', seed: 1, tick: 93, winner: 'titan', a: 0, b: 49.814735663309655 },
    { strategy: 'melee', seed: 12, tick: 93, winner: 'titan', a: 0, b: 51.327303930744506 },
    { strategy: 'melee', seed: 4711, tick: 93, winner: 'titan', a: 0, b: 51.8481166958809 }
  ] as const)('$strategy seed $seed retains its known result', ({strategy, seed, tick, winner, a, b}) => {
    const state = runMatch({ ...RAPTOR, strategy }, TITAN, seed, 500);
    expect(state.tick).toBe(tick);
    expect(state.winner).toBe(winner);
    expect(state.outcome).toBe('victory');
    expect(state.robotA.structure).toBeCloseTo(a, 10);
    expect(state.robotB.structure).toBeCloseTo(b, 10);
  });

  for (const strategyA of STRATEGY_TYPES) {
    for (const strategyB of STRATEGY_TYPES) {
      it.each([1,12,4711])(`${strategyA} vs ${strategyB} seed %i has reproducible states and events`, seed => {
        const play = () => {
          let state = createMatch({...RAPTOR, strategy: strategyA}, {...TITAN, strategy: strategyB});
          const rng = new SeededRandom(seed);
          const events: CombatEvent[] = [];
          for (let i = 0; i < 500 && state.outcome === 'active'; i++) {
            const result = stepMatchWithEvents(state, rng);
            state = result.state; events.push(...result.events);
            for (const robot of [state.robotA, state.robotB]) {
              expect(robot.position.x).toBeGreaterThanOrEqual(0);
              expect(robot.position.x).toBeLessThanOrEqual(state.width);
              expect(robot.position.y).toBeGreaterThanOrEqual(0);
              expect(robot.position.y).toBeLessThanOrEqual(state.height);
              expect(robot.energy).toBeGreaterThanOrEqual(0);
              expect(robot.energy).toBeLessThanOrEqual(robot.definition.maxEnergy);
            }
          }
          return {state,events};
        };
        const result = play();
        expect(play()).toEqual(result);
        const digest = strategyDigest(result.state, result.events);
        if (strategyA === 'adaptive' || strategyB === 'adaptive') {
          // New strategy has no historical digest fixture; validate deterministic
          // event+state replay without altering frozen legacy hashes.
          expect(digest).toMatch(/^[0-9a-f]{64}$/);
          const repeat = play();
          expect(strategyDigest(repeat.state, repeat.events)).toBe(digest);
        } else {
          expect(digest).toBe(((strategyA === 'defensive' || strategyB === 'defensive' ? defensiveFixtures : fixtures) as Record<string,string>)[`${strategyA}/${strategyB}/${seed}`]);
        }
        if (result.state.outcome !== 'active') expect(stepMatchWithEvents(result.state, new SeededRandom(seed))).toEqual({state: result.state,events:[]});
      });
    }
  }
});
