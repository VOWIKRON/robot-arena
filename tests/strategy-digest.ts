import { createHash } from 'node:crypto';
import type { MatchState } from '../src/engine/types';
import type { CombatEvent } from '../src/engine/events';

// Canonical keys and nanounit precision freeze behavior, not object insertion order.
export function strategyDigest(state: MatchState, events: readonly CombatEvent[]): string {
  const robots = [state.robotA, state.robotB].map(r => ({ position: r.position, structure: r.structure, energy: r.energy, cooldown: r.cooldown }));
  const data = { tick: state.tick, outcome: state.outcome, winner: state.winner, endReason: state.endReason, robots, events };
  const canonical = JSON.stringify(data, (_key, value: unknown) => {
    if (typeof value === 'number') return Math.round(value * 1e9) / 1e9;
    if (value && typeof value === 'object' && !Array.isArray(value)) return Object.fromEntries(Object.entries(value).sort(([a],[b]) => a < b ? -1 : a > b ? 1 : 0));
    return value;
  });
  return createHash('sha256').update(canonical).digest('hex');
}
