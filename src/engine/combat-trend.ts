/** Read-only interpretation of the change in robot separation between simulation ticks. */
export type CombatDistanceTrend = 'start' | 'closing' | 'separating' | 'steady';

export function combatDistanceTrend(previousDistance: number | null, currentDistance: number): CombatDistanceTrend {
  if (previousDistance === null || !Number.isFinite(previousDistance) || !Number.isFinite(currentDistance)) return 'start';
  const delta = currentDistance - previousDistance;
  if (Math.abs(delta) <= 1e-6) return 'steady';
  return delta < 0 ? 'closing' : 'separating';
}
