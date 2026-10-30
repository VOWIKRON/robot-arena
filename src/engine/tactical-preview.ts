import type { RobotState } from './types';
import { strategyParameters } from './strategy-config';
import { movementDelta } from './strategies';

/**
 * Experimental NEXT-117-D tactical movement proposal, deliberately NOT used by
 * the v1 simulation. Integrating it requires a versioned rules/replay gate.
 * Positive delta approaches; negative delta retreats. No RNG or mutation.
 */
export type TacticalMovementPreview = Readonly<{
  delta: number;
  reason: 'legacy' | 'ready-longer-range-threat';
}>;

export function tacticalMovementPreview(
  self: RobotState,
  enemy: RobotState,
  distance: number
): TacticalMovementPreview {
  const legacy = movementDelta(self, enemy, distance);
  const candidate = self.definition.strategy === 'adaptive' || self.definition.strategy === 'defensive';
  if (!candidate || !Number.isFinite(distance) || distance < 0 || self.definition.speed <= 0 || self.structure <= 0 || enemy.structure <= 0) {
    return { delta: legacy, reason: 'legacy' };
  }

  // The current v1 engine regenerates energy and decrements cooldown before
  // the robot's own action. This is a *preview* of the next available shot.
  const enemyReserve = strategyParameters(
    enemy.definition.strategy,
    enemy.definition.strategyParameters
  ).energyReserveRatio * enemy.definition.maxEnergy;
  const enemyCanFireNextAction =
    enemy.cooldown <= 1 &&
    Math.min(enemy.definition.maxEnergy, enemy.energy + enemy.definition.energyRegen) >=
      enemy.definition.weaponEnergy + enemyReserve;
  const exposedToLongerRange =
    enemy.definition.weaponRange > self.definition.weaponRange &&
    distance > self.definition.weaponRange &&
    distance <= enemy.definition.weaponRange;

  if (!enemyCanFireNextAction || !exposedToLongerRange) {
    return { delta: legacy, reason: 'legacy' };
  }

  return { delta: -self.definition.speed, reason: 'ready-longer-range-threat' };
}
