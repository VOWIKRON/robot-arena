import type { RobotDefinition } from './types';

export const RAPTOR: RobotDefinition = {
  id: 'raptor',
  name: 'Raptor',
  maxStructure: 75,
  maxEnergy: 100,
  energyRegen: 1.5,
  speed: 1.5,
  weaponRange: 28,
  weaponDamage: 8,
  weaponEnergy: 7,
  cooldownTicks: 8
};

export const TITAN: RobotDefinition = {
  id: 'titan',
  name: 'Titan',
  maxStructure: 130,
  maxEnergy: 90,
  energyRegen: 1.1,
  speed: 0.8,
  weaponRange: 24,
  weaponDamage: 12,
  weaponEnergy: 9,
  cooldownTicks: 12
};
