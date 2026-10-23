import type { RobotState, Vec2 } from './types';
import { movementDelta } from './strategies';

/** Pure geometry shared by all strategies; positive delta approaches, negative retreats. */
export function nextCombatPosition(self: RobotState, enemy: RobotState, width: number, height: number): Vec2 | null {
  const dx = enemy.position.x - self.position.x;
  const dy = enemy.position.y - self.position.y;
  const distance = Math.hypot(dx, dy);
  const delta = movementDelta(self, enemy, distance);
  if (delta === 0) return null;

  // A deterministic escape direction for coincident robots, pointing into the arena at an edge.
  const escapeX = self.position.x <= 0 ? 1 : self.position.x >= width ? -1
    : self.definition.id < enemy.definition.id ? 1 : -1;
  const ux = distance === 0 ? -escapeX : dx / distance;
  const uy = distance === 0 ? 0 : dy / distance;
  const to = {
    x: Math.max(0, Math.min(width, self.position.x + ux * delta)),
    y: Math.max(0, Math.min(height, self.position.y + uy * delta))
  };
  return to.x === self.position.x && to.y === self.position.y ? null : to;
}
