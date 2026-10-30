import { describe, expect, it } from 'vitest';
import { combatDistanceTrend } from '../src/engine/combat-trend';

describe('NEXT-116-C distance-trend boundary and invalid-data regression', () => {
  it('classifies sub-epsilon movement as steady but larger changes as real movement', () => {
    expect(combatDistanceTrend(70, 70 + 0.5e-6)).toBe('steady');
    expect(combatDistanceTrend(70, 70 - 0.5e-6)).toBe('steady');
    expect(combatDistanceTrend(70, 70 + 2e-6)).toBe('separating');
    expect(combatDistanceTrend(70, 70 - 2e-6)).toBe('closing');
  });

  it('does not fabricate a trend from missing or non-finite measurements', () => {
    for (const previous of [null, NaN, Infinity, -Infinity]) {
      expect(combatDistanceTrend(previous, 70)).toBe('start');
    }
    for (const current of [NaN, Infinity, -Infinity]) {
      expect(combatDistanceTrend(70, current)).toBe('start');
    }
  });

  it('canonicalizes exact equality and negative zero without changing inputs', () => {
    const previous = -0;
    const current = 0;
    expect(combatDistanceTrend(previous, current)).toBe('steady');
    expect(Object.is(previous, -0)).toBe(true);
    expect(Object.is(current, 0)).toBe(true);
  });
});
