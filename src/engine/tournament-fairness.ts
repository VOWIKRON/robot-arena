import { createTournamentDefinition, type TournamentDefinition } from './tournament-model';
import { createRoundRobinSchedule } from './tournament-schedule';
import { runMatch } from './simulation';
import { deepFreeze } from './immutable';

export type FairnessAudit = Readonly<{
  participants: number; matches: number;
  appearances: Readonly<Record<string, number>>;
  asRobotA: Readonly<Record<string, number>>;
  asRobotB: Readonly<Record<string, number>>;
  seedDigest: string;
}>;
/** Pure seed/side audit. Never consumes the simulation RNG. */
export function auditTournamentFairness(input: TournamentDefinition): FairnessAudit {
  const definition = createTournamentDefinition(input);
  const fixtures = createRoundRobinSchedule(definition);
  const appearances: Record<string, number> = {};
  const asRobotA: Record<string, number> = {};
  const asRobotB: Record<string, number> = {};
  for (const p of definition.participants) {
    appearances[p.id] = 0; asRobotA[p.id] = 0; asRobotB[p.id] = 0;
  }
  for (const f of fixtures) {
    appearances[f.robotAId]!++; appearances[f.robotBId]!++;
    asRobotA[f.robotAId]!++; asRobotB[f.robotBId]!++;
  }
  return deepFreeze({
    participants: definition.participants.length, matches: fixtures.length,
    appearances, asRobotA, asRobotB,
    seedDigest: fixtures.map(f => f.seed).join(',')
  });
}
/** Optional alternating sides: preserves the legacy fixture and seed order when disabled. */
export function createFairSideSchedule(input: TournamentDefinition, alternateSides = false) {
  const fixtures = createRoundRobinSchedule(input);
  if (!alternateSides) return fixtures;
  return deepFreeze(fixtures.map((f, index) => index % 2 === 0 ? f : {
    ...f, robotAId: f.robotBId, robotBId: f.robotAId
  }));
}
