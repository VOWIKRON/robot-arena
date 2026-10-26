import type { TournamentMatchDetail } from './tournament-details';

export type TournamentMatchFilterStatus = 'all' | 'pending' | 'completed';

/**
 * NEXT-76: filter a read-only, validated fixture view. Never modify a
 * TournamentRun, its results, or the original fixture order.
 */
export function filterTournamentMatches(
  matches: readonly TournamentMatchDetail[],
  query: string,
  status: TournamentMatchFilterStatus
): readonly TournamentMatchDetail[] {
  const needle = query.trim().normalize('NFKC').toLocaleLowerCase('de-DE');
  const result = matches.filter(match => {
    if (status !== 'all' && match.status !== status) return false;
    if (!needle) return true;
    return [match.matchId, match.robotAName, match.robotBName]
      .some(value => value.normalize('NFKC').toLocaleLowerCase('de-DE').includes(needle));
  });
  return Object.freeze(result);
}
