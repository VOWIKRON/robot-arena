import { describe, expect, it } from 'vitest';
import { deepFreeze } from '../src/engine/immutable';

describe('NEXT-51 immutable snapshot contract', () => {
  it('freezes nested events and states without changing their values', () => {
    const input = { state: { energy: 17, position: { x: 2, y: 5 } }, events: [{ tick: 1, payload: { amount: 3 } }] };
    const before = structuredClone(input);
    const result = deepFreeze(input);
    expect(result).toBe(input);
    expect(result).toEqual(before);
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.state.position)).toBe(true);
    expect(Object.isFrozen(result.events)).toBe(true);
    expect(Object.isFrozen(result.events[0]!.payload)).toBe(true);
    expect(() => { result.state.energy = 99; }).toThrow(TypeError);
    expect(() => { result.events.push({ tick: 2, payload: { amount: 1 } }); }).toThrow(TypeError);
  });

  it('preserves primitive, null and already frozen inputs', () => {
    expect(deepFreeze(null)).toBeNull();
    expect(deepFreeze(7)).toBe(7);
    const value = deepFreeze({ nested: [1, 2, 3] });
    expect(deepFreeze(value)).toBe(value);
    expect(value.nested).toEqual([1, 2, 3]);
  });
});
