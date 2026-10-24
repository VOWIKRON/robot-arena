import { createTournamentDefinition } from './tournament-model';
import { computeRoundRobinStandings } from './tournament-standings';
import { validateTournamentArchive } from './tournament-archive';
import type { TournamentRun } from './tournament-runner';

export type TournamentTableExport = Readonly<{
  schemaVersion: 1;
  tournamentId: string;
  status: TournamentRun['status'];
  completedMatches: number;
  totalMatches: number;
  standings: ReturnType<typeof computeRoundRobinStandings>['standings'];
}>;
export function createTournamentTableExport(run: TournamentRun): TournamentTableExport {
  const valid = validateTournamentArchive({ schemaVersion: 1, run }).run;
  const definition = createTournamentDefinition(valid.definition);
  const standings = computeRoundRobinStandings(definition, valid.results);
  return Object.freeze({
    schemaVersion: 1 as const, tournamentId: definition.id, status: valid.status,
    completedMatches: standings.completedMatches, totalMatches: standings.totalMatches,
    standings: standings.standings
  });
}
export function exportTournamentTableJson(run: TournamentRun): string {
  return JSON.stringify(createTournamentTableExport(run), null, 2);
}
function cell(value: string | number): string {
  const raw = String(value);
  // Quoted cells also prevent commas, newlines and Unicode from corrupting columns.
  // Prefix spreadsheet formula triggers even if preceded by whitespace/control characters.
  const safe = /^[\s\x00-\x1f]*[=+@\-]/.test(raw) && typeof value === 'string' ? "'" + raw : raw;
  return '"' + safe.replace(/"/g, '""') + '"';
}
export function exportTournamentTableCsv(run: TournamentRun): string {
  const report = createTournamentTableExport(run);
  const participants = new Map(run.definition.participants.map(p => [p.id, p.name]));
  const header = ['Teilnehmer','Spiele','Siege','Unentschieden','Niederlagen','Punkte','Strukturdifferenz'];
  const lines = [header.map(cell).join(',')];
  for (const row of report.standings) {
    lines.push([participants.get(row.participantId) ?? row.participantId, row.played, row.wins,
      row.draws, row.losses, row.points, row.structureDifference].map(cell).join(','));
  }
  return '\uFEFF' + lines.join('\r\n') + '\r\n';
}
