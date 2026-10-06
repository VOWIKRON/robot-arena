import type { RobotDefinition } from './types';
import { buildRobotDefinition, type Armor, type Chassis, type EnergySupply, type Motor, type Sensor, type Weapon } from './components';

export const RAPTOR_CHASSIS: Chassis = {
  id: 'raptor-chassis', name: 'Raptor Chassis', maxStructure: 75, maxEnergy: 100, energyRegen: 1.5, speed: 1.5, maxWeight: 90
};
export const TITAN_CHASSIS: Chassis = {
  id: 'titan-chassis', name: 'Titan Chassis', maxStructure: 130, maxEnergy: 90, energyRegen: 1.1, speed: 0.8, maxWeight: 110
};
export const BALANCED_MOTOR: Motor = { id: 'balanced-motor', name: 'Balanced Motor', speedFactor: 1, weight: 18 };
export const SWIFT_MOTOR: Motor = { id: 'swift-motor', name: 'Swift Motor', speedFactor: 1.25, weight: 14 };
export const HEAVY_MOTOR: Motor = { id: 'heavy-motor', name: 'Heavy Motor', speedFactor: 0.8, weight: 26 };
export const STANDARD_ARMOR: Armor = { id: 'standard-armor', name: 'Standard Armor', structureFactor: 1, weight: 18 };
export const LIGHT_ARMOR: Armor = { id: 'light-armor', name: 'Light Armor', structureFactor: 0.8, weight: 10 };
export const HEAVY_ARMOR: Armor = { id: 'heavy-armor', name: 'Heavy Armor', structureFactor: 1.25, weight: 32 };
export const STANDARD_ENERGY: EnergySupply = { id: 'standard-energy', name: 'Standard Energy', energyFactor: 1, regenFactor: 1, weight: 16 };
export const CAPACITY_ENERGY: EnergySupply = { id: 'capacity-energy', name: 'Capacity Energy', energyFactor: 1.25, regenFactor: 0.9, weight: 24 };
export const REGEN_ENERGY: EnergySupply = { id: 'regen-energy', name: 'Regen Energy', energyFactor: 0.9, regenFactor: 1.25, weight: 14 };
export const STANDARD_SENSOR: Sensor = { id: 'standard-sensor', name: 'Standard Sensor', rangeFactor: 1, weight: 8 };
export const SHORT_SENSOR: Sensor = { id: 'short-sensor', name: 'Short Sensor', rangeFactor: 0.7, weight: 5 };
export const LONG_SENSOR: Sensor = { id: 'long-sensor', name: 'Long Sensor', rangeFactor: 1.3, weight: 14 };
export const RAPTOR_WEAPON: Weapon = {
  id: 'raptor-cannon', name: 'Raptor Cannon', range: 28, damage: 8, energy: 7, cooldownTicks: 8, weight: 18
};
export const TITAN_WEAPON: Weapon = {
  id: 'titan-cannon', name: 'Titan Cannon', range: 24, damage: 12, energy: 9, cooldownTicks: 12, weight: 28
};

export const RAPTOR: RobotDefinition = buildRobotDefinition({
  id: 'raptor', name: 'Raptor', chassis: RAPTOR_CHASSIS, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR, weapon: RAPTOR_WEAPON
});
export const TITAN: RobotDefinition = buildRobotDefinition({
  id: 'titan', name: 'Titan', chassis: TITAN_CHASSIS, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR, weapon: TITAN_WEAPON
});
