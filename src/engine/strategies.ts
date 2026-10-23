import type { StrategyType } from './components';
import type { RobotDefinition, RobotState } from './types';

export const AVAILABLE_STRATEGIES = [
  { value: 'aggressive', label: 'Aggressiv' },
  { value: 'distance', label: 'Distanz' },
  { value: 'defensive', label: 'Defensiv' },
  { value: 'melee', label: 'Nahkampf' }
] as const satisfies readonly { value: StrategyType; label: string }[];

export const DEFENSIVE_STRUCTURE_THRESHOLD = 0.35;

export function desiredCombatDistance(robot: RobotDefinition): number {
  switch (robot.strategy) {
    case 'distance': return robot.weaponRange * 0.9;
    case 'melee': return robot.weaponRange * 0.2;
    case 'aggressive':
    case 'defensive': return robot.weaponRange * 0.8;
  }
}

/** Signed movement request, capped once for every strategy. No RNG or state mutation. */
export function movementDelta(self: RobotState, enemy: RobotState, distance: number): number {
  const wounded = self.definition.strategy === 'defensive'
    && self.structure <= self.definition.maxStructure * DEFENSIVE_STRUCTURE_THRESHOLD;
  const target = wounded
    ? Math.max(self.definition.weaponRange, enemy.definition.weaponRange) * 1.1
    : desiredCombatDistance(self.definition);
  const gap = distance - target;
  // Wounded defenders never chase. Distance robots actively correct both directions.
  const request = wounded ? Math.min(0, gap)
    : self.definition.strategy === 'distance' ? gap : Math.max(0, gap);
  return Math.max(-self.definition.speed, Math.min(self.definition.speed, request));
}
