import { validateTournamentArchive } from './tournament-archive';
import { tournamentMatchDetails } from './tournament-details';
import type { TournamentRun } from './tournament-runner';

export type TournamentMatchExportV1 = Readonly<{
  schemaVersion: 1;
  tournamentId: string;
  matchId: string;
  robotAName: string;
  robotBName: string;
  seed: number;
  ticks: number;
  winnerName: string | null;
  remainingStructureA: number;
  remainingStructureB: number;
}>;

/** Export only validated completed matches, never synthetic data for pending fixtures. */
export function createTournamentMatchExport(run: TournamentRun, matchId: string): TournamentMatchExportV1 {
  const valid = validateTournamentArchive({ schemaVersion: 1, run }).run;
  const match = tournamentMatchDetails(valid).find(detail => detail.matchId === matchId);
  if (!match) throw new Error('Kampfexport: unbekannte Kampf-ID');
  if (match.status !== 'completed' || match.ticks === null ||
      match.remainingStructureA === null || match.remainingStructureB === null) {
    throw new Error('Kampfexport: Kampf noch nicht abgeschlossen');
  }
  return Object.freeze({
    schemaVersion: 1 as const, tournamentId: valid.definition.id, matchId: match.matchId,
    robotAName: match.robotAName, robotBName: match.robotBName, seed: match.seed,
    ticks: match.ticks, winnerName: match.winnerName,
    remainingStructureA: match.remainingStructureA, remainingStructureB: match.remainingStructureB
  });
}
export function exportTournamentMatchJson(run: TournamentRun, matchId: string): string {
  return JSON.stringify(createTournamentMatchExport(run, matchId), null, 2);
}
function csvCell(value: string | number | null): string {
  const raw = value === null ? '' : String(value);
  // Prefix any spreadsheet formula trigger, including after whitespace/control characters.
  const safe = typeof value === 'string' && /^[\s\x00-\x1f]*[=+@\-]/.test(raw) ? "'" + raw : raw;
  return '"' + safe.replace(/"/g, '""') + '"';
}
export function exportTournamentMatchCsv(run: TournamentRun, matchId: string): string {
  const match = createTournamentMatchExport(run, matchId);
  const columns = ['schemaVersion', 'tournamentId', 'matchId', 'robotAName', 'robotBName', 'seed', 'ticks', 'winnerName', 'remainingStructureA', 'remainingStructureB'] as const;
  return '\uFEFF' + columns.map(csvCell).join(',') + '\r\n' +
    columns.map(key => csvCell(match[key])).join(',') + '\r\n';
}
