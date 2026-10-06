import { describe, expect, it } from 'vitest';
import { buildRobotDefinition, validateRobotConfiguration, configurationWeight } from '../src/engine/components';
import { BALANCED_MOTOR, SWIFT_MOTOR, STANDARD_ARMOR, STANDARD_ENERGY, CAPACITY_ENERGY, STANDARD_SENSOR, SHORT_SENSOR, RAPTOR, RAPTOR_CHASSIS, RAPTOR_WEAPON, TITAN, TITAN_CHASSIS, TITAN_WEAPON } from '../src/engine/presets';

describe('robot components', () => {
  it('keeps existing presets identical when composed from chassis and weapon', () => {
    expect(buildRobotDefinition({ id: 'raptor', name: 'Raptor', chassis: RAPTOR_CHASSIS, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR, weapon: RAPTOR_WEAPON })).toEqual(RAPTOR);
    expect(buildRobotDefinition({ id: 'titan', name: 'Titan', chassis: TITAN_CHASSIS, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR, weapon: TITAN_WEAPON })).toEqual(TITAN);
  });

  it('allows chassis and weapon to be recombined into a valid robot definition', () => {
    const hybrid = buildRobotDefinition({ id: 'hybrid', name: 'Hybrid', chassis: TITAN_CHASSIS, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR, weapon: RAPTOR_WEAPON });
    expect(hybrid.maxStructure).toBe(TITAN.maxStructure);
    expect(hybrid.speed).toBe(TITAN.speed);
    expect(hybrid.weaponRange).toBe(RAPTOR.weaponRange);
    expect(hybrid.weaponDamage).toBe(RAPTOR.weaponDamage);
  });

  it('validates invalid component values', () => {
    const invalid = {
      id: '', name: '', chassis: { ...RAPTOR_CHASSIS, maxStructure: 0, speed: -1 }, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR,
      weapon: { ...RAPTOR_WEAPON, damage: -1 }
    };
    expect(validateRobotConfiguration(invalid)).toEqual([
      'Robot-ID fehlt', 'Robotername fehlt', 'Struktur muss größer als 0 sein',
      'Geschwindigkeit darf nicht negativ sein', 'Waffenschaden darf nicht negativ sein'
    ]);
  });
  it('rejects invalid configurations at the builder boundary', () => {
    const invalid = {
      id: 'broken', name: 'Broken', chassis: { ...RAPTOR_CHASSIS, maxStructure: 0 }, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR,
      weapon: RAPTOR_WEAPON
    };
    expect(() => buildRobotDefinition(invalid)).toThrow('Ungültige Roboterkonfiguration: Struktur muss größer als 0 sein');
  });
  it('applies the selected motor to calculated speed', () => {
    const robot = buildRobotDefinition({ id: 'swift', name: 'Swift', chassis: RAPTOR_CHASSIS, motor: SWIFT_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR, weapon: RAPTOR_WEAPON });
    expect(robot.speed).toBe(RAPTOR_CHASSIS.speed * SWIFT_MOTOR.speedFactor);
  });
  it('applies the selected energy supply to capacity and regeneration', () => {
    const robot = buildRobotDefinition({ id: 'energy', name: 'Energy', chassis: RAPTOR_CHASSIS, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: CAPACITY_ENERGY, sensor: STANDARD_SENSOR, weapon: RAPTOR_WEAPON });
    expect(robot.maxEnergy).toBe(RAPTOR_CHASSIS.maxEnergy * CAPACITY_ENERGY.energyFactor);
    expect(robot.energyRegen).toBe(RAPTOR_CHASSIS.energyRegen * CAPACITY_ENERGY.regenFactor);
  });
  it('rejects configurations above the chassis weight limit', () => {
    const overweight = { id: 'heavy', name: 'Heavy', chassis: RAPTOR_CHASSIS, motor: { ...BALANCED_MOTOR, weight: 40 }, armor: { ...STANDARD_ARMOR, weight: 40 }, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR, weapon: RAPTOR_WEAPON };
    expect(configurationWeight(overweight)).toBeGreaterThan(RAPTOR_CHASSIS.maxWeight);
    expect(validateRobotConfiguration(overweight)).toContain(`Gewicht ${configurationWeight(overweight)} überschreitet Limit ${RAPTOR_CHASSIS.maxWeight}`);
    expect(() => buildRobotDefinition(overweight)).toThrow('Gewicht');
  });
  it('applies sensor range and limits effective weapon range', () => {
    const robot = buildRobotDefinition({ id: 'sensor', name: 'Sensor', chassis: RAPTOR_CHASSIS, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: SHORT_SENSOR, weapon: RAPTOR_WEAPON });
    expect(robot.sensorRange).toBe(21);
    expect(robot.weaponRange).toBe(21);
  });
});
