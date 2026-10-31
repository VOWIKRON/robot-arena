import { describe, expect, it } from 'vitest';
import { advanceBoundedSteps } from '../src/engine/batch-steps';

describe('NEXT-114 bounded manual stepping', () => {
  it('executes exactly ten ordered steps without timers', () => {
    const sequence: number[] = [];
    const completed = advanceBoundedSteps(10, () => true, () => sequence.push(sequence.length + 1));
    expect(completed).toBe(10);
    expect(sequence).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
  it('stops on terminal outcome without an extra step', () => {
    let ticks = 0;
    expect(advanceBoundedSteps(10, () => ticks < 4, () => { ticks++; })).toBe(4);
    expect(ticks).toBe(4);
    expect(advanceBoundedSteps(10, () => false, () => { ticks++; })).toBe(0);
    expect(ticks).toBe(4);
  });
  it('treats zero as no-op and rejects invalid or unbounded counts', () => {
    let ticks = 0;
    expect(advanceBoundedSteps(0, () => true, () => { ticks++; })).toBe(0);
    for (const value of [-1, 11, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => advanceBoundedSteps(value, () => true, () => { ticks++; })).toThrow(RangeError);
    }
    expect(ticks).toBe(0);
  });
});
