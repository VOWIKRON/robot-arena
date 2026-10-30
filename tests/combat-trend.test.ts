import { describe, expect, it } from 'vitest';
import { combatDistanceTrend } from '../src/engine/combat-trend';

describe('NEXT-116 read-only combat distance trend', () => {
  it('starts without history and never fabricates a trend', () => {
    expect(combatDistanceTrend(null, 70)).toBe('start');
    expect(combatDistanceTrend(NaN, 70)).toBe('start');
    expect(combatDistanceTrend(70, Infinity)).toBe('start');
  });
  it('distinguishes approaching from retreating using exact distances', () => {
    expect(combatDistanceTrend(70, 69)).toBe('closing');
    expect(combatDistanceTrend(70, 71)).toBe('separating');
  });
  it('treats unchanged and numerical jitter as steady', () => {
    expect(combatDistanceTrend(70, 70)).toBe('steady');
    expect(combatDistanceTrend(70, 70 + 1e-8)).toBe('steady');
  });
  it('is deterministic, pure and symmetric for the same distance pair', () => {
    const values = [null, 70, 69.5, 70.5] as const;
    const before = [...values];
    const first = values.map(value => combatDistanceTrend(value, 70));
    expect(values.map(value => combatDistanceTrend(value, 70))).toEqual(first);
    expect(values).toEqual(before);
  });
});
