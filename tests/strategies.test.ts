import { describe, expect, it } from 'vitest';
import { DEFAULT_STRATEGY } from '../src/engine/components';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { SeededRandom } from '../src/engine/random';
import { createMatch, stepMatchWithEvents } from '../src/engine/simulation';
import { AVAILABLE_STRATEGIES, desiredCombatDistance } from '../src/engine/strategies';

function scenario(distance: number) {
  const state = createMatch({ ...RAPTOR, strategy: 'aggressive', weaponRange: 20, speed: 5 },
    { ...TITAN, speed: 0, weaponDamage: 0 });
  state.robotA.position = { x: 10, y: 50 };
  state.robotB.position = { x: 10 + distance, y: 50 };
  return state;
}

describe('aggressive strategy', () => {
  it('offers exactly the implemented strategies for future selectors', () => {
    expect(AVAILABLE_STRATEGIES.map(option => option.value)).toEqual([DEFAULT_STRATEGY, 'distance', 'defensive', 'melee', 'adaptive']);
    expect(desiredCombatDistance({ ...RAPTOR, weaponRange: 20 })).toBe(16);
  });

  it.each([1, 12, 4711])('closes distance while firing with seed %i without overshooting or mutating input', seed => {
    const state = scenario(21);
    const original = structuredClone(state);
    const { state: next, events } = stepMatchWithEvents(state, new SeededRandom(seed));
    expect(state).toEqual(original);
    expect(next.robotA.position).toEqual({ x: 15, y: 50 });
    expect(events.slice(0, 4).map(event => event.type)).toEqual(['move', 'shot', 'hit', 'damage']);
    expect(next.robotA.energy).toBe(RAPTOR.maxEnergy - RAPTOR.weaponEnergy);
    expect(next.robotA.cooldown).toBe(RAPTOR.cooldownTicks);
    expect(stepMatchWithEvents(next, new SeededRandom(seed)).state.robotA.position).toEqual(next.robotA.position);
  });

  it.each([
    { name: 'outside range', distance: 26, energy: 100, cooldown: 0 },
    { name: 'insufficient energy after regeneration', distance: 21, energy: 0, cooldown: 0 },
    { name: 'active cooldown', distance: 21, energy: 100, cooldown: 2 }
  ])('approaches but does not fire with $name', ({ distance, energy, cooldown }) => {
    const state = scenario(distance);
    state.robotA.energy = energy;
    state.robotA.cooldown = cooldown;
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    expect(result.state.robotA.position.x).toBe(15);
    expect(result.events.some(e => e.type === 'shot' && e.attackerId === RAPTOR.id)).toBe(false);
  });

  it('fires at exact range after regeneration and cooldown expiry', () => {
    const state = scenario(25);
    state.robotA.energy = RAPTOR.weaponEnergy - RAPTOR.energyRegen;
    state.robotA.cooldown = 1;
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    expect(result.state.robotA.energy).toBe(0);
    expect(result.events.some(e => e.type === 'shot' && e.attackerId === RAPTOR.id)).toBe(true);
  });

  it.each([0, 10, 16, 18])('stops at or inside attack distance without retreat at distance %i', distance => {
    const state = scenario(distance);
    const next = stepMatchWithEvents(state, new SeededRandom(12)).state;
    expect(next.robotA.position.x).toBe(10 + Math.max(0, distance - 16));
    expect(Number.isFinite(next.robotA.position.x)).toBe(true);
  });

  it.each([1, 12, 4711])('reproduces the complete event stream with seed %i', seed => {
    const play = () => {
      let state = createMatch(RAPTOR, TITAN);
      const rng = new SeededRandom(seed);
      const stream = [];
      while (state.outcome === 'active' && state.tick < 200) {
        const result = stepMatchWithEvents(state, rng);
        state = result.state;
        stream.push(...result.events);
      }
      return { state, stream };
    };
    const result = play();
    expect(result.state.outcome).toBe('victory');
    expect(result).toEqual(play());
  });
});
