import { deepFreeze } from './immutable';
import { createTournamentDefinition, type TournamentDefinition } from './tournament-model';
import { runMatch } from './simulation';

/** A bye advances the earliest seeded participants; no RNG or implicit coin toss. */
export type KnockoutMatch = Readonly<{
  round: number; index: number; robotAId: string; robotBId: string | null;
  seed: number; winnerId: string; drawn: boolean;
}>;
export type KnockoutBracket = Readonly<{
  matches: readonly KnockoutMatch[]; championId: string;
}>;

const MODULUS = 2147483647n;
export function runKnockoutBracket(input: TournamentDefinition): KnockoutBracket {
  const definition = createTournamentDefinition(input);
  if (definition.format !== 'knockout') throw new Error('K.-o.-Turnier benötigt knockout-Format');
  const byId = new Map(definition.participants.map(p => [p.id, p]));
  const seedOf = (index: number) => Number((BigInt(definition.baseSeed) + BigInt(index)) % MODULUS);
  let entrants = definition.participants.map(p => p.id);
  const matches: KnockoutMatch[] = [];
  let round = 0;
  while (entrants.length > 1) {
    const next: string[] = [];
    const byeCount = 2 ** Math.ceil(Math.log2(entrants.length)) - entrants.length;
    // A bye goes to the first seeds; remaining entrants compete in stable order.
    for (const id of entrants.slice(0, byeCount)) {
      const index = matches.length;
      matches.push({ round, index, robotAId: id, robotBId: null, seed: seedOf(index), winnerId: id, drawn: false });
      next.push(id);
    }
    const competing = entrants.slice(byeCount);
    for (let i = 0; i < competing.length; i += 2) {
      const a = competing[i]!;
      const b = competing[i + 1]!;
      const index = matches.length;
      const seed = seedOf(index);
      const state = runMatch(byId.get(a)!, byId.get(b)!, seed, definition.maxTicks);
      if (state.outcome === 'active') throw new Error('K.-o.-Kampf nicht abgeschlossen');
      // Draw: higher remaining structure fraction wins; if equal, earlier tournament seed wins.
      const ratioA = state.robotA.structure / byId.get(a)!.maxStructure;
      const ratioB = state.robotB.structure / byId.get(b)!.maxStructure;
      const winnerId = state.winner ?? (ratioA >= ratioB ? a : b);
      matches.push({ round, index, robotAId: a, robotBId: b, seed, winnerId, drawn: state.winner === null });
      next.push(winnerId);
    }
    entrants = next;
    round++;
  }
  return deepFreeze({ matches, championId: entrants[0]! });
}
