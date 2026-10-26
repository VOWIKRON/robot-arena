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

/** Signed movement request, capped once for every strategy. No RNG or state mutation.
 * Adaptive robots advance while healthy, but preserve energy and retreat when wounded,
 * unable to fire, or threatened by a ready longer-range weapon.
 * All decisions depend solely on the current immutable input state.
 */
export function movementDelta(self: RobotState, enemy: RobotState, distance: number): number {
  const strategy = self.definition.strategy;
  const parameters = strategyParameters(strategy, self.definition.strategyParameters);
  const lowStructure = self.structure <= self.definition.maxStructure * parameters.retreatStructureRatio;
  const lowEnergy = self.energy < self.definition.weaponEnergy
    + self.definition.maxEnergy * parameters.energyReserveRatio;
  const outRangedUnderThreat = enemy.definition.weaponRange > self.definition.weaponRange
    && enemy.cooldown === 0 && distance <= enemy.definition.weaponRange;
  const adaptive = strategy === 'adaptive';
  const defensive = strategy === 'defensive';
  const adaptiveRetreat = adaptive && (lowStructure || lowEnergy || outRangedUnderThreat);
  const target = defensive || adaptiveRetreat
    ? defensiveCombatDistance(self.definition, enemy.definition)
    : desiredCombatDistance(self.definition);
  const gap = distance - target;
  // Damaged defenders and depleted adaptive robots disengage instead of pursuing.
  const stopChasing = (defensive && lowStructure) || (adaptive && (lowStructure || lowEnergy));
  const request = stopChasing ? Math.min(0, gap)
    : strategy === 'distance' || defensive || adaptiveRetreat ? gap : Math.max(0, gap);
  return Math.max(-self.definition.speed, Math.min(self.definition.speed, request));
}
