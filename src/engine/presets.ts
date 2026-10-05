import type { RobotDefinition } from './types';
import { buildRobotDefinition, type Chassis, type Motor, type Weapon } from './components';

export const RAPTOR_CHASSIS: Chassis = {
  id: 'raptor-chassis', name: 'Raptor Chassis', maxStructure: 75, maxEnergy: 100, energyRegen: 1.5, speed: 1.5
};
export const TITAN_CHASSIS: Chassis = {
  id: 'titan-chassis', name: 'Titan Chassis', maxStructure: 130, maxEnergy: 90, energyRegen: 1.1, speed: 0.8
};
export const BALANCED_MOTOR: Motor = { id: 'balanced-motor', name: 'Balanced Motor', speedFactor: 1 };
export const SWIFT_MOTOR: Motor = { id: 'swift-motor', name: 'Swift Motor', speedFactor: 1.25 };
export const HEAVY_MOTOR: Motor = { id: 'heavy-motor', name: 'Heavy Motor', speedFactor: 0.8 };
export const RAPTOR_WEAPON: Weapon = {
  id: 'raptor-cannon', name: 'Raptor Cannon', range: 28, damage: 8, energy: 7, cooldownTicks: 8
};
export const TITAN_WEAPON: Weapon = {
  id: 'titan-cannon', name: 'Titan Cannon', range: 24, damage: 12, energy: 9, cooldownTicks: 12
};

export const RAPTOR: RobotDefinition = buildRobotDefinition({
  id: 'raptor', name: 'Raptor', chassis: RAPTOR_CHASSIS, motor: BALANCED_MOTOR, weapon: RAPTOR_WEAPON
});
export const TITAN: RobotDefinition = buildRobotDefinition({
  id: 'titan', name: 'Titan', chassis: TITAN_CHASSIS, motor: BALANCED_MOTOR, weapon: TITAN_WEAPON
});
