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

/** Stable, UI-independent round-robin fixture order. Each unordered pair occurs once. */
export function createRoundRobinSchedule(definition: TournamentDefinition): readonly TournamentPairing[] {
  const tournament = createTournamentDefinition(definition);
  if (tournament.format !== 'round-robin') throw new Error('Round-Robin-Spielplan benötigt Format round-robin');
  const fixtures: TournamentPairing[] = [];
  for (let a = 0; a < tournament.participants.length; a++) {
    for (let b = a + 1; b < tournament.participants.length; b++) {
      const index = fixtures.length;
      fixtures.push({
        id: `match-${String(index + 1).padStart(3, '0')}`,
        index,
        robotAId: tournament.participants[a]!.id,
        robotBId: tournament.participants[b]!.id,
        seed: Number((BigInt(tournament.baseSeed) + BigInt(index)) % SEED_MODULUS)
      });
    }
  }
  return deepFreeze(fixtures);
}
