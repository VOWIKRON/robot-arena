import type { RobotDefinition } from './types';

export type Chassis = Readonly<{
  id: string;
  name: string;
  maxStructure: number;
  maxEnergy: number;
  energyRegen: number;
  speed: number;
}>;

export type Motor = Readonly<{
  id: string;
  name: string;
  speedFactor: number;
}>;

export type Armor = Readonly<{
  id: string;
  name: string;
  structureFactor: number;
}>;

export type EnergySupply = Readonly<{
  id: string;
  name: string;
  energyFactor: number;
  regenFactor: number;
}>;

export type Weapon = Readonly<{
  id: string;
  name: string;
  range: number;
  damage: number;
  energy: number;
  cooldownTicks: number;
}>;

export type RobotConfiguration = Readonly<{
  id: string;
  name: string;
  chassis: Chassis;
  motor: Motor;
  armor: Armor;
  energySupply: EnergySupply;
  weapon: Weapon;
}>;

export function buildRobotDefinition(configuration: RobotConfiguration): RobotDefinition {
  const errors = validateRobotConfiguration(configuration);
  if (errors.length > 0) throw new Error(`Ungültige Roboterkonfiguration: ${errors.join(', ')}`);
  return {
    id: configuration.id,
    name: configuration.name,
    maxStructure: configuration.chassis.maxStructure * configuration.armor.structureFactor,
    maxEnergy: configuration.chassis.maxEnergy * configuration.energySupply.energyFactor,
    energyRegen: configuration.chassis.energyRegen * configuration.energySupply.regenFactor,
    speed: configuration.chassis.speed * configuration.motor.speedFactor,
    weaponRange: configuration.weapon.range,
    weaponDamage: configuration.weapon.damage,
    weaponEnergy: configuration.weapon.energy,
    cooldownTicks: configuration.weapon.cooldownTicks
  };
}

export function validateRobotConfiguration(configuration: RobotConfiguration): readonly string[] {
  const errors: string[] = [];
  if (!configuration.id.trim()) errors.push('Robot-ID fehlt');
  if (!configuration.name.trim()) errors.push('Robotername fehlt');
  if (configuration.chassis.maxStructure <= 0) errors.push('Struktur muss größer als 0 sein');
  if (configuration.chassis.maxEnergy <= 0) errors.push('Energie muss größer als 0 sein');
  if (configuration.chassis.energyRegen < 0) errors.push('Energieregeneration darf nicht negativ sein');
  if (configuration.chassis.speed < 0) errors.push('Geschwindigkeit darf nicht negativ sein');
  if (configuration.motor.speedFactor <= 0) errors.push('Motorfaktor muss größer als 0 sein');
  if (configuration.armor.structureFactor <= 0) errors.push('Panzerungsfaktor muss größer als 0 sein');
  if (configuration.energySupply.energyFactor <= 0) errors.push('Energiefaktor muss größer als 0 sein');
  if (configuration.energySupply.regenFactor <= 0) errors.push('Regenerationsfaktor muss größer als 0 sein');
  if (configuration.weapon.range < 0) errors.push('Waffenreichweite darf nicht negativ sein');
  if (configuration.weapon.damage < 0) errors.push('Waffenschaden darf nicht negativ sein');
  if (configuration.weapon.energy < 0) errors.push('Waffenenergie darf nicht negativ sein');
  if (configuration.weapon.cooldownTicks < 0) errors.push('Cooldown darf nicht negativ sein');
  return errors;
}
