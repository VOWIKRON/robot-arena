import type { MatchState, RobotDefinition, RobotState } from './types';
import type { CombatEvent } from './events';
import { createDamageEvent, createHitEvent, createMoveEvent, createShotEvent, createVictoryEvent } from './events';
import { createMatch } from './simulation';
import { nextCombatPosition } from './movement';
import { SeededRandom } from './random';
import { strategyParameters } from './strategy-config';

/**
 * NEXT-110 stage B: opt-in experimental rules. Legacy simulation entry points,
 * their RNG consumption and their event ordering remain entirely unchanged.
 * This API must not be wired to archives/UI until versioned persistence exists.
 */
export type CombatRuleset = 'sequential-v1' | 'simultaneous-v2';
export const LEGACY_RULESET: CombatRuleset = 'sequential-v1';
export const SIMULTANEOUS_RULESET: CombatRuleset = 'simultaneous-v2';

export function parseCombatRuleset(value: unknown): CombatRuleset {
  if (value === LEGACY_RULESET || value === SIMULTANEOUS_RULESET) return value as CombatRuleset;
  throw new Error('Kampfregeln: unbekannte oder fehlende Regelversion');
}

export type SimultaneousStepResult = Readonly<{ state: MatchState; events: readonly CombatEvent[] }>;
const distance = (a: RobotState, b: RobotState) =>
  Math.hypot(a.position.x - b.position.x, a.position.y - b.position.y);

function eligible(self: RobotState, enemy: RobotState): boolean {
  const reserve = self.definition.maxEnergy *
    strategyParameters(self.definition.strategy, self.definition.strategyParameters).energyReserveRatio;
  return self.structure > 0 && self.cooldown === 0 &&
    self.energy >= self.definition.weaponEnergy + reserve &&
    distance(self, enemy) <= self.definition.weaponRange;
}

/**
 * Both movement intents see the same regenerated pre-movement snapshot.
 * Both fire decisions see the same post-movement snapshot.
 * Jitter is drawn by stable robot ID, independent of A/B slot assignment.
 * Collision policy for v2: crossing/overlap is permitted (no pushback).
 */
export function stepMatchV2WithEvents(state: MatchState, rng: SeededRandom): SimultaneousStepResult {
  if (state.outcome !== 'active') return { state, events: [] };
  const next = structuredClone(state);
  next.tick += 1;
  const tick = next.tick;
  const events: CombatEvent[] = [];

  for (const bot of [next.robotA, next.robotB]) {
    if (bot.structure <= 0) continue;
    bot.energy = Math.min(bot.definition.maxEnergy, bot.energy + bot.definition.energyRegen);
    bot.cooldown = Math.max(0, bot.cooldown - 1);
  }

  const beforeMovement = structuredClone(next);
  const intents = [
    beforeMovement.robotA.structure > 0
      ? nextCombatPosition(beforeMovement.robotA, beforeMovement.robotB, next.width, next.height)
      : null,
    beforeMovement.robotB.structure > 0
      ? nextCombatPosition(beforeMovement.robotB, beforeMovement.robotA, next.width, next.height)
      : null
  ] as const;
  for (const [index, bot] of [next.robotA, next.robotB].entries()) {
    const to = intents[index];
    if (!to) continue;
    const from = bot.position;
    bot.position = to;
    events.push(createMoveEvent(tick, bot.definition.id, from, to));
  }

  const fireA = eligible(next.robotA, next.robotB);
  const fireB = eligible(next.robotB, next.robotA);
  const shots = [
    ...(fireA ? [{ attacker: next.robotA, target: next.robotB }] : []),
    ...(fireB ? [{ attacker: next.robotB, target: next.robotA }] : [])
  ];
  // RNG order is stable by identity, not the mutable left/right arena slot.
  const jitter = new Map<string, number>();
  for (const shot of [...shots].sort((a, b) => a.attacker.definition.id < b.attacker.definition.id ? -1 : 1)) {
    jitter.set(shot.attacker.definition.id, 0.9 + rng.next() * 0.2);
  }
  const damage = shots.map(shot => ({
    ...shot,
    amount: Math.min(shot.target.structure,
      Math.max(0, shot.attacker.definition.weaponDamage * jitter.get(shot.attacker.definition.id)!))
  }));
  // All shot and hit events precede atomic damage resolution.
  for (const shot of damage) {
    shot.attacker.energy -= shot.attacker.definition.weaponEnergy;
    shot.attacker.cooldown = shot.attacker.definition.cooldownTicks;
    events.push(createShotEvent(tick, shot.attacker.definition.id, shot.target.definition.id,
      shot.attacker.definition.weaponEnergy));
    events.push(createHitEvent(tick, shot.attacker.definition.id, shot.target.definition.id));
  }
  for (const shot of damage) {
    shot.target.structure = Math.max(0, shot.target.structure - shot.amount);
    events.push(createDamageEvent(tick, shot.attacker.definition.id, shot.target.definition.id, shot.amount));
  }

  const deadA = next.robotA.structure <= 0;
  const deadB = next.robotB.structure <= 0;
  if (deadA && deadB) {
    next.outcome = 'draw';
    next.winner = null;
    next.endReason = 'destroyed';
    // No victory event for double KO. Replay schema v1 cannot encode this.
  } else if (deadA || deadB) {
    const winner = deadA ? next.robotB : next.robotA;
    const loser = deadA ? next.robotA : next.robotB;
    next.outcome = 'victory';
    next.winner = winner.definition.id;
    next.endReason = 'destroyed';
    events.push(createVictoryEvent(tick, winner.definition.id, loser.definition.id));
  }
  return { state: next, events };
}

export function runMatchV2(robotA: RobotDefinition, robotB: RobotDefinition,
  seed: number, maxTicks = 3600): MatchState {
  if (!Number.isSafeInteger(seed) || !Number.isSafeInteger(maxTicks) || maxTicks < 0)
    throw new RangeError('Kampf: ungültiger Seed oder Ticklimit');
  const rng = new SeededRandom(seed);
  let state = createMatch(robotA, robotB);
  while (state.outcome === 'active' && state.tick < maxTicks)
    state = stepMatchV2WithEvents(state, rng).state;
  if (state.outcome === 'active' && state.tick >= maxTicks)
    state = { ...state, outcome: 'draw', winner: null, endReason: 'timeout' };
  return state;
}
