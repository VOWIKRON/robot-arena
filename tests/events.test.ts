import { describe, expect, it } from 'vitest';
import {
  createDamageEvent,
  createHitEvent,
  createMoveEvent,
  createShotEvent
} from '../src/engine/events';

describe('combat events', () => {
  it('creates a movement event with copied positions', () => {
    const from = { x: 10, y: 20 };
    const to = { x: 12, y: 20 };
    const event = createMoveEvent(3, 'raptor', from, to);

    expect(event).toEqual({
      type: 'move',
      tick: 3,
      robotId: 'raptor',
      from,
      to
    });
    expect(event.from).not.toBe(from);
    expect(event.to).not.toBe(to);
  });

  it('creates a shot event with attacker, target and energy cost', () => {
    expect(createShotEvent(7, 'raptor', 'titan', 7)).toEqual({
      type: 'shot',
      tick: 7,
      attackerId: 'raptor',
      targetId: 'titan',
      energyCost: 7
    });
  });

  it('creates a hit event with attacker and target', () => {
    expect(createHitEvent(7, 'raptor', 'titan')).toEqual({
      type: 'hit',
      tick: 7,
      attackerId: 'raptor',
      targetId: 'titan'
    });
  });

  it('creates a damage event with source, target and amount', () => {
    expect(createDamageEvent(7, 'raptor', 'titan', 8.4)).toEqual({
      type: 'damage',
      tick: 7,
      sourceId: 'raptor',
      targetId: 'titan',
      amount: 8.4
    });
  });
});
