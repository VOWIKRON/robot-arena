import type { MatchState } from './types';

/** Read-only tactical distance/range projection. Never advances the simulation. */
export function combatRangeSnapshot(state: Pick<MatchState, 'robotA' | 'robotB'>): Readonly<{
  distance: number;
  aWeaponRange: number;
  bWeaponRange: number;
  aInRange: boolean;
  bInRange: boolean;
}> {
  const { robotA, robotB } = state;
  const distance = Math.hypot(robotA.position.x - robotB.position.x, robotA.position.y - robotB.position.y);
  const aWeaponRange = robotA.definition.weaponRange;
  const bWeaponRange = robotB.definition.weaponRange;
  return {
    distance,
    aWeaponRange,
    bWeaponRange,
    aInRange: distance <= aWeaponRange,
    bInRange: distance <= bWeaponRange
  };
}
