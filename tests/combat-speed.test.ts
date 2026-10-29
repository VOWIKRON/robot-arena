import { describe, expect, it } from 'vitest';
import { combatIntervalMs, COMBAT_INTERVALS_MS } from '../src/engine/combat-speed';

describe('NEXT-112 combat speed selection', () => {
  it('maps the four user-visible speeds to bounded tick intervals', () => {
    expect(combatIntervalMs('0.5')).toBe(160);
    expect(combatIntervalMs('1')).toBe(80);
    expect(combatIntervalMs('2')).toBe(40);
    expect(combatIntervalMs('4')).toBe(20);
    expect(Object.values(COMBAT_INTERVALS_MS).every(value => Number.isInteger(value) && value >= 20)).toBe(true);
  });
  it('fails safely to normal speed for arbitrary or invalid values', () => {
    for (const value of ['', 'Infinity', '0', '-1', '999', '__proto__', 'toString']) {
      expect(combatIntervalMs(value)).toBe(80);
    }
  });
});
