import { createTournamentDefinition, type TournamentDefinition } from './tournament-model';
import { deepFreeze } from './immutable';

export type TournamentPairing = Readonly<{
  id: string;
  index: number;
  robotAId: string;
  robotBId: string;
  seed: number;
}>;

const SEED_MODULUS = 2147483647n;

/** Regular orientation of the complete graph: every player starts as A and B
 * equally often (odd player counts) or differs by at most one (even counts).
 * This changes only A/B placement, never fixture IDs, seeds or pair order. */
function balancedFirstSide(a: number, b: number, count: number): boolean {
  const distance = b - a;
  const half = count / 2;
  return distance < half || (count % 2 === 0 && distance === half && a % 2 === 0);
}


/** Stable, UI-independent round-robin fixture order. Each unordered pair occurs once. */
export function createRoundRobinSchedule(definition: TournamentDefinition): readonly TournamentPairing[] {
  const tournament = createTournamentDefinition(definition);
  if (tournament.format !== 'round-robin') throw new Error('Round-Robin-Spielplan benötigt Format round-robin');
  const fixtures: TournamentPairing[] = [];
  for (let a = 0; a < tournament.participants.length; a++) {
    for (let b = a + 1; b < tournament.participants.length; b++) {
      const index = fixtures.length;
      const firstIsA = tournament.sideAssignment !== 'balanced' || balancedFirstSide(a, b, tournament.participants.length);
      fixtures.push({
        id: `match-${String(index + 1).padStart(3, '0')}`,
        index,
        robotAId: tournament.participants[firstIsA ? a : b]!.id,
        robotBId: tournament.participants[firstIsA ? b : a]!.id,
        seed: Number((BigInt(tournament.baseSeed) + BigInt(index)) % SEED_MODULUS)
      });
    }
  }
  return deepFreeze(fixtures);
}
