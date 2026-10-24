import { deepFreeze } from './immutable';
import { computeRoundRobinStandings } from './tournament-standings';
import { createRoundRobinSchedule } from './tournament-schedule';
import type { TournamentRun } from './tournament-runner';

export type TournamentMatchDetail = Readonly<{
  matchId: string;
  robotAName: string;
  robotBName: string;
  seed: number;
  status: 'pending' | 'completed';
  ticks: number | null;
  winnerName: string | null;
  remainingStructureA: number | null;
  remainingStructureB: number | null;
}>;

/** NEXT-66: immutable, validated match details. Pending fixtures have no invented values. */
export function tournamentMatchDetails(run: TournamentRun): readonly TournamentMatchDetail[] {
  // Validate the entire result set, including IDs, sides, seeds and numeric bounds.
  computeRoundRobinStandings(run.definition, run.results);
  const fixtures = createRoundRobinSchedule(run.definition);
  const results = new Map(run.results.map(result => [result.matchId, result]));
  const names = new Map(run.definition.participants.map(participant => [participant.id, participant.name]));
  return deepFreeze(fixtures.map(fixture => {
    const result = results.get(fixture.id);
    return {
      matchId: fixture.id,
      robotAName: names.get(fixture.robotAId)!,
      robotBName: names.get(fixture.robotBId)!,
      seed: fixture.seed,
      status: result ? 'completed' as const : 'pending' as const,
      ticks: result?.ticks ?? null,
      winnerName: result?.winnerId ? names.get(result.winnerId)! : null,
      remainingStructureA: result?.remainingStructureA ?? null,
      remainingStructureB: result?.remainingStructureB ?? null
    };
  }));
}
