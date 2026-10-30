import { describe, expect, it } from 'vitest';
import { combatRangeSnapshot } from '../src/engine/combat-range';
import { createMatch } from '../src/engine/simulation';
import { RAPTOR, TITAN } from '../src/engine/presets';

describe('NEXT-115 tactical range is read-only and exact', () => {
  it('reports the initial 70-unit distance and each robot own weapon range', () => {
    const state = createMatch(RAPTOR, TITAN);
    const result = combatRangeSnapshot(state);
    expect(result.distance).toBe(70);
    expect(result.aWeaponRange).toBe(state.robotA.definition.weaponRange);
    expect(result.bWeaponRange).toBe(state.robotB.definition.weaponRange);
    expect(result.aInRange).toBe(70 <= result.aWeaponRange);
    expect(result.bInRange).toBe(70 <= result.bWeaponRange);
  });

  it('handles exact range boundaries independently for asymmetric weapons', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 0, y: 0 };
    state.robotB.position = { x: 3, y: 4 };
    state.robotA.definition = { ...state.robotA.definition, weaponRange: 5 };
    state.robotB.definition = { ...state.robotB.definition, weaponRange: 4.99 };
    expect(combatRangeSnapshot(state)).toEqual({
      distance: 5, aWeaponRange: 5, bWeaponRange: 4.99,
      aInRange: true, bInRange: false
    });
    state.robotB.position = { x: 0, y: 0 };
    expect(combatRangeSnapshot(state).bInRange).toBe(true);
  });

  it('does not mutate simulation, definitions or positions', () => {
    const state = createMatch(RAPTOR, TITAN);
    const before = structuredClone(state);
    const first = combatRangeSnapshot(state);
    const second = combatRangeSnapshot(state);
    expect(first).toEqual(second);
    expect(state).toEqual(before);
    expect(state.tick).toBe(0);
  });
});
