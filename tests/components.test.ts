import { describe, expect, it } from 'vitest';
import { buildRobotDefinition, validateRobotConfiguration } from '../src/engine/components';
import { RAPTOR, RAPTOR_CHASSIS, RAPTOR_WEAPON, TITAN, TITAN_CHASSIS, TITAN_WEAPON } from '../src/engine/presets';

describe('robot components', () => {
  it('keeps existing presets identical when composed from chassis and weapon', () => {
    expect(buildRobotDefinition({ id: 'raptor', name: 'Raptor', chassis: RAPTOR_CHASSIS, weapon: RAPTOR_WEAPON })).toEqual(RAPTOR);
    expect(buildRobotDefinition({ id: 'titan', name: 'Titan', chassis: TITAN_CHASSIS, weapon: TITAN_WEAPON })).toEqual(TITAN);
  });

  it('allows chassis and weapon to be recombined into a valid robot definition', () => {
    const hybrid = buildRobotDefinition({ id: 'hybrid', name: 'Hybrid', chassis: TITAN_CHASSIS, weapon: RAPTOR_WEAPON });
    expect(hybrid.maxStructure).toBe(TITAN.maxStructure);
    expect(hybrid.speed).toBe(TITAN.speed);
    expect(hybrid.weaponRange).toBe(RAPTOR.weaponRange);
    expect(hybrid.weaponDamage).toBe(RAPTOR.weaponDamage);
  });

  it('validates invalid component values', () => {
    const invalid = {
      id: '', name: '', chassis: { ...RAPTOR_CHASSIS, maxStructure: 0, speed: -1 },
      weapon: { ...RAPTOR_WEAPON, damage: -1 }
    };
    expect(validateRobotConfiguration(invalid)).toEqual([
      'Robot-ID fehlt', 'Robotername fehlt', 'Struktur muss größer als 0 sein',
      'Geschwindigkeit darf nicht negativ sein', 'Waffenschaden darf nicht negativ sein'
    ]);
  });
  it('rejects invalid configurations at the builder boundary', () => {
    const invalid = {
      id: 'broken', name: 'Broken', chassis: { ...RAPTOR_CHASSIS, maxStructure: 0 },
      weapon: RAPTOR_WEAPON
    };
    expect(() => buildRobotDefinition(invalid)).toThrow('Ungültige Roboterkonfiguration: Struktur muss größer als 0 sein');
  });
});
