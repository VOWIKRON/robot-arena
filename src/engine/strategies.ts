import type { RobotDefinition, RobotState } from './types';

import { STRATEGY_CATALOG, strategyParameters } from './strategy-config';
export const AVAILABLE_STRATEGIES = STRATEGY_CATALOG.map(({ value, label }) => ({ value, label }));

export function desiredCombatDistance(robot: RobotDefinition): number {
  return robot.weaponRange * strategyParameters(robot.strategy, robot.strategyParameters).targetDistanceRatio;
}

/** Prefer safety from the opponent, but preserve a margin inside our own firing range. */
export function defensiveCombatDistance(self: RobotDefinition, enemy: RobotDefinition): number {
  const { retreatDistanceFactor } = strategyParameters(self.strategy, self.strategyParameters);
  return Math.min(enemy.weaponRange * retreatDistanceFactor, self.weaponRange * 0.95);
}

/** Signed movement request, capped once for every strategy. No RNG or state mutation. */
export function movementDelta(self: RobotState, enemy: RobotState, distance: number): number {
  const parameters = strategyParameters(self.definition.strategy, self.definition.strategyParameters);
  const wounded = self.definition.strategy === 'defensive'
    && self.structure <= self.definition.maxStructure * parameters.retreatStructureRatio;
  const defensive = self.definition.strategy === 'defensive';
  const target = defensive
    ? defensiveCombatDistance(self.definition, enemy.definition)
    : desiredCombatDistance(self.definition);
  const gap = distance - target;
  // Defenders maintain safety immediately; wounded defenders additionally stop chasing.
  const request = wounded ? Math.min(0, gap)
    : self.definition.strategy === 'distance' || defensive ? gap : Math.max(0, gap);
  return Math.max(-self.definition.speed, Math.min(self.definition.speed, request));
}
