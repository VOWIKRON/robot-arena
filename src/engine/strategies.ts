import type { RobotDefinition, RobotState } from './types';

import { STRATEGY_CATALOG, strategyParameters } from './strategy-config';
export const AVAILABLE_STRATEGIES = STRATEGY_CATALOG.map(({ value, label }) => ({ value, label }));

export function desiredCombatDistance(robot: RobotDefinition): number {
  return robot.weaponRange * strategyParameters(robot.strategy, robot.strategyParameters).targetDistanceRatio;
}

/** Signed movement request, capped once for every strategy. No RNG or state mutation. */
export function movementDelta(self: RobotState, enemy: RobotState, distance: number): number {
  const parameters = strategyParameters(self.definition.strategy, self.definition.strategyParameters);
  const wounded = self.definition.strategy === 'defensive'
    && self.structure <= self.definition.maxStructure * parameters.retreatStructureRatio;
  const target = wounded
    ? Math.max(self.definition.weaponRange, enemy.definition.weaponRange) * parameters.retreatDistanceFactor
    : desiredCombatDistance(self.definition);
  const gap = distance - target;
  // Wounded defenders never chase. Distance robots actively correct both directions.
  const request = wounded ? Math.min(0, gap)
    : self.definition.strategy === 'distance' ? gap : Math.max(0, gap);
  return Math.max(-self.definition.speed, Math.min(self.definition.speed, request));
}
