import { describe, expect, it } from 'vitest';
import { RAPTOR_CHASSIS, TITAN_CHASSIS, BALANCED_MOTOR, STANDARD_ARMOR, STANDARD_ENERGY, STANDARD_SENSOR, RAPTOR_WEAPON } from './presets';
import { createRobotPreset, importRobotPreset, serializeRobotPreset } from './robot-preset-format';
import { buildRobotDefinition } from './components';

const robot = { id: 'own-robot-1', name: 'ÄÖÜ Roboter', chassis: RAPTOR_CHASSIS, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR, weapon: RAPTOR_WEAPON, strategy: 'defensive' as const, strategyParameters: { retreatStructureRatio: 0.7 } };

describe('NEXT-69 versioned preset validation', () => {
  it('roundtrips Unicode names, stable IDs and canonical components', () => {
    const restored = importRobotPreset(serializeRobotPreset(robot));
    expect(restored.id).toBe(robot.id);
    expect(restored.name).toBe(robot.name);
    expect(restored.strategy).toBe('defensive');
    expect(buildRobotDefinition(restored)).toEqual(buildRobotDefinition(robot));
    expect(createRobotPreset(restored).schemaVersion).toBe(1);
    expect(Object.isFrozen(restored)).toBe(true);
  });
  it('rejects unknown version, fields, components and strategies', () => {
    const base = createRobotPreset(robot);
    for (const invalid of [
      { ...base, schemaVersion: 2 },
      { ...base, extra: 'unexpected' },
      { ...base, weapon: 'untrusted-weapon' },
      { ...base, strategy: 'teleport' },
      { ...base, id: '__proto__' }
    ]) expect(() => importRobotPreset(JSON.stringify(invalid))).toThrow();
  });
  it('rejects invalid parameters, excessive size and invalid JSON', () => {
    const base = createRobotPreset(robot);
    expect(() => importRobotPreset(JSON.stringify({ ...base, strategyParameters: { retreatStructureRatio: -1 } }))).toThrow();
    expect(() => importRobotPreset(JSON.stringify({ ...base, strategyParameters: { secret: 1 } }))).toThrow();
    expect(() => importRobotPreset('x'.repeat(16 * 1024 + 1))).toThrow(/zu groß/);
    expect(() => importRobotPreset('{')).toThrow();
  });
  it('rejects overweight configurations even when all component IDs exist', () => {
    const base = createRobotPreset(robot);
    const overweight = { ...base, chassis: RAPTOR_CHASSIS.id, armor: 'heavy-armor', motor: 'heavy-motor', energySupply: 'capacity-energy', sensor: 'long-sensor', weapon: 'titan-cannon' };
    expect(() => importRobotPreset(JSON.stringify(overweight))).toThrow(/Gewicht/);
    expect(TITAN_CHASSIS.maxWeight).toBeGreaterThan(RAPTOR_CHASSIS.maxWeight);
  });
});
