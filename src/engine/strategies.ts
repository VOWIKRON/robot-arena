import type { StrategyType } from './components';
import type { RobotDefinition } from './types';

// Only implemented strategies are offered to future Desktop/Mobile selectors.
export const AVAILABLE_STRATEGIES = [
  { value: 'aggressive', label: 'Aggressiv' }
] as const satisfies readonly { value: StrategyType; label: string }[];

export function desiredCombatDistance(robot: RobotDefinition): number {
  switch (robot.strategy) {
    case 'aggressive':
      // Close decisively even while firing; leave room inside effective range.
      return robot.weaponRange * 0.8;
    default:
      // Preserve NEXT-34 behavior until the remaining strategies are implemented.
      return robot.weaponRange * 0.8;
  }
}
