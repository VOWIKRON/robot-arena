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

/**
 * Adaptive behavior has no hidden state and consumes no random numbers.
 * While healthy and ready to fire it closes the gap like an attacker.
 * At or below the configured structure threshold, or without enough
 * firing energy, it gives up pursuit and retreats toward a safe distance.
 * Existing aggressive/defensive/distance/melee behavior is unchanged.
 */
export function adaptiveRetreatRequired(self: RobotState): boolean {
  const params = strategyParameters(self.definition.strategy, self.definition.strategyParameters);
  return self.structure <= self.definition.maxStructure * params.retreatStructureRatio
    || self.energy < self.definition.weaponEnergy + self.definition.maxEnergy * params.energyReserveRatio;
}

/** Signed movement request, capped once for every strategy. No RNG or state mutation. */
export function movementDelta(self: RobotState, enemy: RobotState, distance: number): number {
  const parameters = strategyParameters(self.definition.strategy, self.definition.strategyParameters);
  const wounded = self.definition.strategy === 'defensive'
    && self.structure <= self.definition.maxStructure * parameters.retreatStructureRatio;
  const defensive = self.definition.strategy === 'defensive';
  const adaptiveRetreat = self.definition.strategy === 'adaptive' && adaptiveRetreatRequired(self);
  const target = defensive || adaptiveRetreat
    ? defensiveCombatDistance(self.definition, enemy.definition)
    : desiredCombatDistance(self.definition);
  const gap = distance - target;
  // Adaptive robots retreat only when threatened; defenders preserve legacy behavior.
  const request = wounded || adaptiveRetreat ? Math.min(0, gap)
    : self.definition.strategy === 'distance' || defensive ? gap : Math.max(0, gap);
  return Math.max(-self.definition.speed, Math.min(self.definition.speed, request));
}
