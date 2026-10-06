import { describe, expect, it } from 'vitest';
import { configurationWeight, validateRobotConfiguration, type RobotConfiguration } from '../src/engine/components';
import { BALANCED_MOTOR, STANDARD_ARMOR, STANDARD_ENERGY, STANDARD_SENSOR, RAPTOR_CHASSIS, RAPTOR_WEAPON } from '../src/engine/presets';

const valid = (): RobotConfiguration => ({
  id: 'test',
  name: 'Test',
  chassis: { ...RAPTOR_CHASSIS },
  motor: { ...BALANCED_MOTOR },
  armor: { ...STANDARD_ARMOR },
  energySupply: { ...STANDARD_ENERGY },
  sensor: { ...STANDARD_SENSOR },
  weapon: { ...RAPTOR_WEAPON }
});

describe('configuration validation boundaries', () => {
  it.each([
    ['empty id', (c: any) => { c.id = ' '; }, 'Robot-ID fehlt'],
    ['empty name', (c: any) => { c.name = ''; }, 'Robotername fehlt'],
    ['zero structure', (c: any) => { c.chassis.maxStructure = 0; }, 'Struktur muss größer als 0 sein'],
    ['zero energy', (c: any) => { c.chassis.maxEnergy = 0; }, 'Energie muss größer als 0 sein'],
    ['negative regeneration', (c: any) => { c.chassis.energyRegen = -0.1; }, 'Energieregeneration darf nicht negativ sein'],
    ['negative speed', (c: any) => { c.chassis.speed = -0.1; }, 'Geschwindigkeit darf nicht negativ sein'],
    ['zero motor factor', (c: any) => { c.motor.speedFactor = 0; }, 'Motorfaktor muss größer als 0 sein'],
    ['zero armor factor', (c: any) => { c.armor.structureFactor = 0; }, 'Panzerungsfaktor muss größer als 0 sein'],
    ['zero energy factor', (c: any) => { c.energySupply.energyFactor = 0; }, 'Energiefaktor muss größer als 0 sein'],
    ['zero regen factor', (c: any) => { c.energySupply.regenFactor = 0; }, 'Regenerationsfaktor muss größer als 0 sein'],
    ['zero sensor factor', (c: any) => { c.sensor.rangeFactor = 0; }, 'Sensorfaktor muss größer als 0 sein'],
    ['negative weapon range', (c: any) => { c.weapon.range = -1; }, 'Waffenreichweite darf nicht negativ sein'],
    ['negative weapon damage', (c: any) => { c.weapon.damage = -1; }, 'Waffenschaden darf nicht negativ sein'],
    ['negative weapon energy', (c: any) => { c.weapon.energy = -1; }, 'Waffenenergie darf nicht negativ sein'],
    ['negative cooldown', (c: any) => { c.weapon.cooldownTicks = -1; }, 'Cooldown darf nicht negativ sein']
  ])('rejects %s', (_name, mutate, expected) => {
    const c: any = valid();
    mutate(c);
    expect(validateRobotConfiguration(c)).toContain(expected);
  });

  it('accepts exact chassis weight limit', () => {
    const c: any = valid();
    c.chassis.maxWeight = configurationWeight(c);
    expect(validateRobotConfiguration(c)).toEqual([]);
  });

  it('rejects one unit above chassis weight limit', () => {
    const c: any = valid();
    c.chassis.maxWeight = configurationWeight(c) - 1;
    expect(validateRobotConfiguration(c)).toContain(`Gewicht ${configurationWeight(c)} überschreitet Limit ${c.chassis.maxWeight}`);
  });

  it('keeps zero-valued allowed weapon properties valid', () => {
    const c: any = valid();
    c.weapon.range = 0;
    c.weapon.damage = 0;
    c.weapon.energy = 0;
    c.weapon.cooldownTicks = 0;
    expect(validateRobotConfiguration(c)).toEqual([]);
  });
});
