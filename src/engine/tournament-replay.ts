import { recordMatch } from './recorder';
import { recordMatchV2, type ReplayDocumentV2 } from './replay-v2';
import { parseReplay, serializeReplay, type ReplayDocument } from './replay-format';
import { createRoundRobinSchedule } from './tournament-schedule';
import { computeRoundRobinStandings } from './tournament-standings';
import type { TournamentRun } from './tournament-runner';

/**
 * NEXT-67: Recreate a completed fixture from its frozen participant definitions
 * and original seed, never from the mutable sandbox RNG or state.
 *
 * The archive contains an outcome summary, not an event stream. Replay is only
 * allowed if the regenerated outcome agrees exactly with that summary.
 */
export function replayTournamentMatch(run: TournamentRun, matchId: string): ReplayDocument | ReplayDocumentV2 {
  if (typeof matchId !== 'string' || !matchId) throw new Error('Replay: Match-ID fehlt');
  // Reject invalid or tampered archives before spending CPU on simulation.
  computeRoundRobinStandings(run.definition, run.results);
  const fixture = createRoundRobinSchedule(run.definition).find(item => item.id === matchId);
  if (!fixture) throw new Error('Replay: unbekannte Match-ID');
  const result = run.results.find(item => item.matchId === matchId);
  if (!result) throw new Error('Replay: Kampf noch nicht abgeschlossen');
  const a = run.definition.participants.find(robot => robot.id === fixture.robotAId);
  const b = run.definition.participants.find(robot => robot.id === fixture.robotBId);
  if (!a || !b) throw new Error('Replay: Teilnehmer fehlt');
  const recording = run.definition.schemaVersion === 2
    ? recordMatchV2(a, b, fixture.seed, run.definition.maxTicks)
    : recordMatch(a, b, fixture.seed, run.definition.maxTicks);
  const final = recording.finalState;
  if (final.outcome === 'active' ||
      final.tick !== result.ticks ||
      final.winner !== result.winnerId ||
      final.robotA.structure !== result.remainingStructureA ||
      final.robotB.structure !== result.remainingStructureB) {
    throw new Error('Replay: Ergebnisabweichung zwischen Archiv und Simulation');
  }
  // The existing player accepts validated, immutable replay documents.
  return run.definition.schemaVersion === 2
    ? recording as ReplayDocumentV2
    : parseReplay(serializeReplay(recording));
}
