import { createTournamentDefinition, type TournamentDefinition } from './tournament-model';
import { createRoundRobinSchedule } from './tournament-schedule';
import { deepFreeze } from './immutable';
import { runMatch } from './simulation';

export type FairnessAudit = Readonly<{
  participants: number; matches: number;
  appearances: Readonly<Record<string, number>>;
  asRobotA: Readonly<Record<string, number>>;
  asRobotB: Readonly<Record<string, number>>;
  seedDigest: string;
  /** Max |A starts - B starts| across all participants. */
  maxSideImbalance: number;
}>;
/** Pure seed/side audit. Never consumes the simulation RNG. */
export function auditTournamentFairness(input: TournamentDefinition): FairnessAudit {
  const definition = createTournamentDefinition(input);
  const fixtures = createRoundRobinSchedule(definition);
  const appearances: Record<string, number> = Object.create(null) as Record<string, number>;
  const asRobotA: Record<string, number> = Object.create(null) as Record<string, number>;
  const asRobotB: Record<string, number> = Object.create(null) as Record<string, number>;
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
    seedDigest: fixtures.map(f => f.seed).join(','),
    maxSideImbalance: Math.max(...definition.participants.map(p => Math.abs(asRobotA[p.id]! - asRobotB[p.id]!)))
  });
}
/** Optional balanced sides: legacy fixture order and seeds stay byte-identical
 * when disabled; enabled fixtures are exactly those executed by the runner. */
export function createFairSideSchedule(input: TournamentDefinition, balanced = false) {
  return createRoundRobinSchedule(createTournamentDefinition({
    ...input, sideAssignment: balanced ? 'balanced' : undefined
  }));
}

/** Side-balanced paired evaluation: the same pair and seed are simulated twice,
 * with A/B exchanged. Scores measure robot identity, not screen side.
 * This is an audit, not a replacement for the canonical tournament runner.
 */
export function auditSideBias(input: TournamentDefinition) {
  const definition = createTournamentDefinition(input);
  const fixtures = createRoundRobinSchedule(definition);
  const byId = new Map(definition.participants.map(p => [p.id, p]));
  const counts = { sideAWins: 0, sideBWins: 0, draws: 0, pairedMatches: fixtures.length };
  for (const f of fixtures) {
    const a = byId.get(f.robotAId)!;
    const b = byId.get(f.robotBId)!;
    for (const [left, right] of [[a,b],[b,a]] as const) {
      const outcome = runMatch(left, right, f.seed, definition.maxTicks);
      if (outcome.winner === left.id) counts.sideAWins++;
      else if (outcome.winner === right.id) counts.sideBWins++;
      else counts.draws++;
    }
  }
  return deepFreeze({ ...counts, sideWinDifference: counts.sideAWins - counts.sideBWins,
    simulations: fixtures.length * 2,
    sideBiasRate: Math.abs(counts.sideAWins - counts.sideBWins) / (fixtures.length * 2) });
}
