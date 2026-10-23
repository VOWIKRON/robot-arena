import { describe, expect, it } from 'vitest';
import { createMatch, stepMatchWithEvents } from '../src/engine/simulation';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { SeededRandom } from '../src/engine/random';
import type { StrategyType } from '../src/engine/components';
import type { MatchState } from '../src/engine/types';

function scenario(strategy: StrategyType, distance: number, structure = 100) {
  const state = createMatch({ ...RAPTOR, strategy, maxStructure: 100, weaponRange: 20, speed: 5 },
    { ...TITAN, speed: 0, weaponDamage: 0, weaponRange: 20 });
  state.robotA.structure = structure;
  state.robotA.position = { x: 40, y: 50 };
  state.robotB.position = { x: 40 + distance, y: 50 };
  return state;
}
const step = (state: MatchState) => stepMatchWithEvents(state, new SeededRandom(4711));

describe('strategy movement behavior', () => {
  it.each([
    ['distance', 30, 100, 45], ['distance', 20, 100, 42],
    ['distance', 18, 100, 40], ['distance', 15, 100, 37],
    ['distance', 5, 100, 35],
    ['defensive', 30, 36, 45], ['defensive', 10, 36, 40],
    ['defensive', 10, 35, 35], ['defensive', 20, 35, 38],
    ['defensive', 22, 35, 40], ['defensive', 30, 35, 40],
    ['melee', 30, 100, 45], ['melee', 8, 100, 44],
    ['melee', 4, 100, 40], ['melee', 2, 100, 40]
  ] as const)('%s distance %i structure %i yields x=%i', (strategy, distance, structure, x) => {
    const state = scenario(strategy, distance, structure);
    const snapshot = structuredClone(state);
    expect(step(state).state.robotA.position).toEqual({ x, y: 50 });
    expect(state).toEqual(snapshot);
  });

  it('defensive retreat considers the opponent weapon range', () => {
    const state = scenario('defensive', 24, 35);
    state.robotB.definition = { ...state.robotB.definition, weaponRange: 30 };
    expect(step(state).state.robotA.position.x).toBe(35);
  });

  it('switches to retreat on the next action after damage crosses the threshold', () => {
    const state = scenario('defensive', 10, 36);
    state.robotA.definition = { ...state.robotA.definition, weaponDamage: 0 };
    state.robotB.definition = { ...state.robotB.definition, weaponDamage: 2 };
    const next = step(state).state;
    expect(next.robotA.structure).toBeLessThan(35);
    expect(step(next).state.robotA.position.x).toBeLessThan(next.robotA.position.x);
  });

  it.each(['distance', 'defensive'] as const)('%s can shoot while retreating within range', strategy => {
    const result = step(scenario(strategy, 10, 35));
    expect(result.state.robotA.position.x).toBe(35);
    expect(result.events.slice(0, 4).map(e => e.type)).toEqual(['move', 'shot', 'hit', 'damage']);
  });

  it('does not fire when defensive retreat leaves weapon range', () => {
    const result = step(scenario('defensive', 20, 35));
    expect(result.events.some(e => e.type === 'shot' && e.attackerId === RAPTOR.id)).toBe(false);
    expect(result.state.robotA.energy).toBe(RAPTOR.maxEnergy);
  });

  it.each(['distance', 'defensive', 'melee'] as const)('%s respects energy and cooldown while moving', strategy => {
    for (const blockedBy of ['energy', 'cooldown']) {
      const state = scenario(strategy, 10, 35);
      if (blockedBy === 'energy') state.robotA.energy = 0;
      else state.robotA.cooldown = 2;
      const result = step(state);
      expect(result.state.robotA.position).not.toEqual(state.robotA.position);
      expect(result.events.some(e => e.type === 'shot' && e.attackerId === RAPTOR.id)).toBe(false);
    }
  });

  it.each(['distance', 'defensive', 'melee'] as const)('%s remains finite at identical positions', strategy => {
    const state = scenario(strategy, 0, 35);
    const result = step(state);
    expect(Number.isFinite(result.state.robotA.position.x)).toBe(true);
    if (strategy === 'melee') expect(result.state.robotA.position).toEqual(state.robotA.position);
    else expect(result.state.robotA.position).not.toEqual(state.robotA.position);
  });

  it.each(['distance', 'defensive', 'melee'] as const)('%s with zero range and speed is stable', strategy => {
    const state = scenario(strategy, 0, 35);
    state.robotA.definition = { ...state.robotA.definition, speed: 0, weaponRange: 0 };
    expect(step(state).state.robotA.position).toEqual(state.robotA.position);
  });

  it.each(['distance', 'defensive'] as const)('%s clamps retreat at every edge without exceeding speed', strategy => {
    for (const [position, enemy] of [
      [{ x: 1, y: 50 }, { x: 2, y: 50 }],
      [{ x: 99, y: 50 }, { x: 98, y: 50 }],
      [{ x: 50, y: 1 }, { x: 50, y: 2 }],
      [{ x: 50, y: 99 }, { x: 50, y: 98 }],
      [{ x: 1, y: 1 }, { x: 2, y: 2 }]
    ] as const) {
      const state = scenario(strategy, 0, 35);
      state.robotA.position = position; state.robotB.position = enemy;
      const { position: next } = step(state).state.robotA;
      expect(next.x).toBeGreaterThanOrEqual(0); expect(next.x).toBeLessThanOrEqual(100);
      expect(next.y).toBeGreaterThanOrEqual(0); expect(next.y).toBeLessThanOrEqual(100);
      expect(Math.hypot(next.x-position.x, next.y-position.y)).toBeLessThanOrEqual(5);
    }
  });

  it.each(['distance', 'defensive'] as const)('%s pinned at an edge emits no phantom movement', strategy => {
    const state = scenario(strategy, 1, 35);
    state.robotA.position = { x: 0, y: 50 };
    state.robotB.position = { x: 1, y: 50 };
    const result = step(state);
    expect(result.state.robotA.position).toEqual(state.robotA.position);
    expect(result.events.some(e => e.type === 'move' && e.robotId === RAPTOR.id)).toBe(false);
  });

  it.each(['distance', 'defensive'] as const)('%s escapes overlap inward at either x edge', strategy => {
    for (const x of [0, 100]) {
      const state = scenario(strategy, 0, 35);
      state.robotA.position = { x, y: 50 };
      state.robotB.position = { x, y: 50 };
      const result = step(state).state.robotA.position;
      expect(result.x).toBe(x === 0 ? 5 : 95);
    }
  });

  it.each(['distance', 'defensive', 'melee'] as const)('%s uses the same behavior for robot B', strategy => {
    const state = scenario(strategy, 10, 35);
    [state.robotA, state.robotB] = [state.robotB, state.robotA];
    expect(step(state).state.robotB.position.x).toBe(strategy === 'melee' ? 45 : 35);
  });
});
