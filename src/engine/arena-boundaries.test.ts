import { describe, expect, it } from 'vitest';
import { nextCombatPosition } from './movement';
import { createMatch, stepMatch } from './simulation';
import { SeededRandom } from './random';
import { RAPTOR, TITAN } from './presets';

describe('NEXT-78: arena boundaries during defensive retreat', () => {
  const defender = {
    ...RAPTOR, strategy: 'defensive' as const, speed: 100,
    strategyParameters: { retreatStructureRatio: 1, retreatDistanceFactor: 2 }
  };
  const cases = [
    [{ x: 1, y: 50 }, { x: 5, y: 50 }],
    [{ x: 99, y: 50 }, { x: 95, y: 50 }],
    [{ x: 50, y: 1 }, { x: 50, y: 5 }],
    [{ x: 50, y: 99 }, { x: 50, y: 95 }],
    [{ x: 1, y: 1 }, { x: 5, y: 5 }],
    [{ x: 99, y: 1 }, { x: 95, y: 5 }],
    [{ x: 1, y: 99 }, { x: 5, y: 95 }],
    [{ x: 99, y: 99 }, { x: 95, y: 95 }]
  ] as const;

  it.each(cases)('never lets a fleeing center cross a boundary: %j', (start, threat) => {
    const match = createMatch(defender, TITAN);
    match.robotA.position = start;
    match.robotB.position = threat;
    let moved = false;
    let reachedEdge = false;
    for (let tick = 0; tick < 1000; tick++) {
      const before = match.robotA.position;
      const next = nextCombatPosition(match.robotA, match.robotB, 100, 100);
      if (next) {
        moved ||= next.x !== before.x || next.y !== before.y;
        match.robotA.position = next;
      }
      const { x, y } = match.robotA.position;
      expect(Number.isFinite(x) && Number.isFinite(y)).toBe(true);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(100);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(100);
      reachedEdge ||= x === 0 || x === 100 || y === 0 || y === 100;
    }
    // Avoid a vacuous test: this scenario must actually exercise retreat,
    // and the defender must eventually reach an arena edge without crossing it.
    expect(moved).toBe(true);
    expect(reachedEdge).toBe(true);
  });

  it.each([1, 12, 4711])('keeps seeded combat positions finite and inside the world (seed %i)', seed => {
    let state = createMatch(defender, TITAN);
    const rng = new SeededRandom(seed);
    for (let tick = 0; tick < 3600 && state.outcome === 'active'; tick++) {
      state = stepMatch(state, rng);
      for (const robot of [state.robotA, state.robotB]) {
        expect(Number.isFinite(robot.position.x)).toBe(true);
        expect(Number.isFinite(robot.position.y)).toBe(true);
        expect(robot.position.x).toBeGreaterThanOrEqual(0);
        expect(robot.position.x).toBeLessThanOrEqual(state.width);
        expect(robot.position.y).toBeGreaterThanOrEqual(0);
        expect(robot.position.y).toBeLessThanOrEqual(state.height);
      }
    }
  });
});
