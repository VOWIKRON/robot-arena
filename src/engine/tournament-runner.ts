import { deepFreeze } from './immutable';
import { runMatch } from './simulation';
import { runMatchV2 } from './simulation-v2';
import { createTournamentDefinition, type TournamentDefinition } from './tournament-model';
import { createRoundRobinSchedule } from './tournament-schedule';
import { createTournamentMatchResult, type TournamentMatchResult } from './tournament-standings';

export type TournamentRunStatus = 'ready' | 'running' | 'paused' | 'cancelled' | 'completed';
export type TournamentRun = Readonly<{
  definition: TournamentDefinition;
  status: TournamentRunStatus;
  nextMatchIndex: number;
  totalMatches: number;
  results: readonly TournamentMatchResult[];
}>;

/** An immutable tournament snapshot. The caller owns no mutable engine or RNG state. */
export function createTournamentRun(input: TournamentDefinition): TournamentRun {
  const definition = createTournamentDefinition(input);
  const fixtures = createRoundRobinSchedule(definition);
  return deepFreeze({
    definition, status: 'ready' as const, nextMatchIndex: 0,
    totalMatches: fixtures.length, results: [] as TournamentMatchResult[]
  });
}

/** Exactly one fixture per call; pause and cancellation are observed at match boundaries. */
export function advanceTournamentRun(run: TournamentRun): TournamentRun {
  if (run.status === 'paused' || run.status === 'cancelled' || run.status === 'completed') return run;
  const fixtures = createRoundRobinSchedule(run.definition);
  const fixture = fixtures[run.nextMatchIndex];
  if (!fixture) throw new Error('Turnierlauf: ungültiger Spielplanindex');
  const robotA = run.definition.participants.find(robot => robot.id === fixture.robotAId);
  const robotB = run.definition.participants.find(robot => robot.id === fixture.robotBId);
  if (!robotA || !robotB) throw new Error('Turnierlauf: Teilnehmer fehlt');
  // Ruleset is persisted inside the immutable definition, including pause/resume.
  const finalState = run.definition.schemaVersion === 2
    ? runMatchV2(robotA, robotB, fixture.seed, run.definition.maxTicks)
    : runMatch(robotA, robotB, fixture.seed, run.definition.maxTicks);
  if (finalState.outcome === 'active') throw new Error('Turnierlauf: Kampf nicht beendet');
  const result = createTournamentMatchResult(run.definition, {
    matchId: fixture.id,
    robotAId: fixture.robotAId,
    robotBId: fixture.robotBId,
    seed: fixture.seed,
    winnerId: finalState.winner,
    ticks: finalState.tick,
    remainingStructureA: finalState.robotA.structure,
    remainingStructureB: finalState.robotB.structure
  });
  const nextMatchIndex = run.nextMatchIndex + 1;
  return deepFreeze({
    definition: run.definition,
    status: nextMatchIndex === fixtures.length ? 'completed' as const : 'running' as const,
    nextMatchIndex,
    totalMatches: fixtures.length,
    results: [...run.results, result]
  });
}

export function pauseTournamentRun(run: TournamentRun): TournamentRun {
  if (run.status !== 'ready' && run.status !== 'running') {
    throw new Error('Turnierlauf: Pausieren nur vor Abschluss oder Abbruch möglich');
  }
  return deepFreeze({ ...run, status: 'paused' as const });
}

export function resumeTournamentRun(run: TournamentRun): TournamentRun {
  if (run.status !== 'paused') throw new Error('Turnierlauf: Fortsetzen nur nach Pause möglich');
  return deepFreeze({ ...run, status: 'running' as const });
}

export function cancelTournamentRun(run: TournamentRun): TournamentRun {
  if (run.status === 'completed') throw new Error('Turnierlauf: abgeschlossenes Turnier nicht abbrechen');
  if (run.status === 'cancelled') return run;
  return deepFreeze({ ...run, status: 'cancelled' as const });
}

/** Convenience method for tests/batch jobs; UI callers should advance at match boundaries. */
export function finishTournamentRun(run: TournamentRun): TournamentRun {
  if (run.status === 'paused' || run.status === 'cancelled') {
    throw new Error('Turnierlauf: pausiertes oder abgebrochenes Turnier nicht ausführbar');
  }
  let current = run;
  while (current.status !== 'completed') current = advanceTournamentRun(current);
  return current;
}
