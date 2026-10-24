import { deepFreeze } from './immutable';
import { createTournamentDefinition, type TournamentDefinition } from './tournament-model';
import { createRoundRobinSchedule } from './tournament-schedule';

export type TournamentMatchResult = Readonly<{
  matchId: string;
  robotAId: string;
  robotBId: string;
  seed: number;
  winnerId: string | null;
  ticks: number;
  remainingStructureA: number;
  remainingStructureB: number;
}>;

export type TournamentStanding = Readonly<{
  participantId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  structureDifference: number;
}>;

export type TournamentStandings = Readonly<{
  standings: readonly TournamentStanding[];
  completedMatches: number;
  totalMatches: number;
  complete: boolean;
}>;

function safeInteger(value: unknown, min: number, max: number, label: string): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < min || value > max) {
    throw new Error(`${label}: ungültige ganze Zahl`);
  }
  return value;
}

function structure(value: unknown, max: number, label: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > max) {
    throw new Error(`${label}: ungültige Reststruktur`);
  }
  return value;
}

/** Pure, deterministic ranking. Missing matches are not counted and are reported explicitly.
 * Structure difference is the sum of (own remaining structure - opponent remaining structure)
 * across completed fixtures, without normalization.
 */
export function computeRoundRobinStandings(
  definition: TournamentDefinition,
  results: readonly TournamentMatchResult[]
): TournamentStandings {
  const tournament = createTournamentDefinition(definition);
  const fixtures = createRoundRobinSchedule(tournament);
  if (!Array.isArray(results)) throw new Error('Turnierergebnisse: Liste erwartet');
  if (results.length > fixtures.length) throw new Error('Turnierergebnisse: zu viele Ergebnisse');
  const byMatch = new Map(fixtures.map(fixture => [fixture.id, fixture]));
  const participants = new Map(tournament.participants.map(participant => [participant.id, participant]));
  const rows = new Map<string, {
    participantId: string; played: number; wins: number; draws: number;
    losses: number; points: number; structureDifference: number;
  }>(tournament.participants.map(participant => [participant.id, {
    participantId: participant.id, played: 0, wins: 0, draws: 0,
    losses: 0, points: 0, structureDifference: 0
  }]));
  const seen = new Set<string>();
  for (const result of results) {
    if (!result || typeof result !== 'object' || Array.isArray(result)) {
      throw new Error('Turnierergebnis: Objekt erwartet');
    }
    const fixture = byMatch.get(result.matchId);
    if (!fixture) throw new Error('Turnierergebnis: unbekannte Match-ID');
    if (seen.has(result.matchId)) throw new Error('Turnierergebnis: doppelte Match-ID');
    seen.add(result.matchId);
    if (result.robotAId !== fixture.robotAId || result.robotBId !== fixture.robotBId || result.seed !== fixture.seed) {
      throw new Error('Turnierergebnis: Teilnehmer oder Seed passen nicht zum Spielplan');
    }
    safeInteger(result.ticks, 0, tournament.maxTicks, 'Ticks');
    if (result.winnerId !== null && result.winnerId !== fixture.robotAId && result.winnerId !== fixture.robotBId) {
      throw new Error('Turnierergebnis: ungültiger Gewinner');
    }
    const maxA = participants.get(fixture.robotAId)!.maxStructure;
    const maxB = participants.get(fixture.robotBId)!.maxStructure;
    const aStructure = structure(result.remainingStructureA, maxA, 'Robot A');
    const bStructure = structure(result.remainingStructureB, maxB, 'Robot B');
    const a = rows.get(fixture.robotAId)!;
    const b = rows.get(fixture.robotBId)!;
    a.played++; b.played++;
    a.structureDifference += aStructure - bStructure;
    b.structureDifference += bStructure - aStructure;
    if (result.winnerId === null) {
      a.draws++; b.draws++; a.points++; b.points++;
    } else if (result.winnerId === fixture.robotAId) {
      a.wins++; b.losses++; a.points += 3;
    } else {
      b.wins++; a.losses++; b.points += 3;
    }
  }
  const standings = [...rows.values()].sort((a, b) =>
    b.points - a.points ||
    b.structureDifference - a.structureDifference ||
    (a.participantId < b.participantId ? -1 : a.participantId > b.participantId ? 1 : 0)
  );
  return deepFreeze({
    standings,
    completedMatches: seen.size,
    totalMatches: fixtures.length,
    complete: seen.size === fixtures.length
  });
}
