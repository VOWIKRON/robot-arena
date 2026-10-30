import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { movementDelta } from '../src/engine/strategies';
import type { RobotState } from '../src/engine/types';

const self = (strategy: 'adaptive' | 'defensive', structure = 100, energy = 100): RobotState => ({
  definition: {
    ...RAPTOR, strategy, speed: 5, weaponRange: 20, maxStructure: 100,
    maxEnergy: 100, weaponEnergy: 10,
    strategyParameters: { retreatStructureRatio: 0.7, retreatDistanceFactor: 1.1, energyReserveRatio: 0.1 }
  },
  position: { x: 10, y: 50 }, structure, energy, cooldown: 0
});
const enemy = (cooldown = 1): RobotState => ({
  definition: { ...TITAN, weaponRange: 25 },
  position: { x: 35, y: 50 }, structure: TITAN.maxStructure,
  energy: TITAN.maxEnergy, cooldown
});

describe('NEXT-117-A strategy safety decisions (legacy rules unchanged)', () => {
  it('adaptive closes when healthy but retreats when structure is low', () => {
    expect(movementDelta(self('adaptive'), enemy(), 25)).toBe(5);
    expect(movementDelta(self('adaptive', 50), enemy(), 10)).toBe(-5);
  });
  it('adaptive preserves an energy reserve and disengages when depleted', () => {
    expect(movementDelta(self('adaptive', 100, 0), enemy(), 10)).toBe(-5);
    expect(movementDelta(self('adaptive', 100, 100), enemy(), 10)).toBe(0);
  });
  it('adaptive reacts to a ready longer-range weapon, not to cooldown threat', () => {
    expect(movementDelta(self('adaptive'), enemy(0), 15)).toBe(-4);
    expect(movementDelta(self('adaptive'), enemy(1), 15)).toBe(0);
  });
  it('wounded defensive robots stop chasing but still retreat from close threats', () => {
    expect(movementDelta(self('defensive'), enemy(), 25)).toBe(5);
    expect(movementDelta(self('defensive', 50), enemy(), 25)).toBe(0);
    expect(movementDelta(self('defensive', 50), enemy(), 10)).toBe(-5);
  });
  it('movement decisions do not mutate either robot state', () => {
    const a = self('adaptive', 50);
    const b = enemy(0);
    const snapshot = structuredClone({ a, b });
    expect(movementDelta(a, b, 10)).toBe(-5);
    expect({ a, b }).toEqual(snapshot);
  });
});
