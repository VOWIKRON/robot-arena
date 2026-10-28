import { exportTournamentRun, importTournamentRun } from './tournament-archive';
import type { TournamentRun } from './tournament-runner';

/** Browser-local opt-in only: no network calls and no automatic restore. */
export const TOURNAMENT_AUTOSAVE_KEY = 'robot-arena:tournament:autosave:v1';
export const TOURNAMENT_AUTOSAVE_ENABLED_KEY = 'robot-arena:tournament:autosave-enabled:v1';
export type TournamentSnapshotStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

/** Persist only a fully validated match-boundary snapshot; setItem is atomic. */
export function saveTournamentSnapshot(run: TournamentRun, storage: TournamentSnapshotStorage): void {
  const archive = exportTournamentRun(run);
  if (new TextEncoder().encode(archive).length > 2 * 1024 * 1024) {
    throw new Error('Lokale Turniersicherung ist zu groß');
  }
  storage.setItem(TOURNAMENT_AUTOSAVE_KEY, archive);
}

/** Validation precedes any caller-side state change. A corrupt snapshot is never applied. */
export function restoreTournamentSnapshot(storage: TournamentSnapshotStorage): TournamentRun | null {
  const archive = storage.getItem(TOURNAMENT_AUTOSAVE_KEY);
  return archive === null ? null : importTournamentRun(archive, 1);
}

export function isTournamentAutosaveEnabled(storage: TournamentSnapshotStorage): boolean {
  return storage.getItem(TOURNAMENT_AUTOSAVE_ENABLED_KEY) === '1';
}

/** Turning opt-in off also deletes its saved tournament (privacy by default). */
export function setTournamentAutosaveEnabled(storage: TournamentSnapshotStorage, enabled: boolean): void {
  if (enabled) storage.setItem(TOURNAMENT_AUTOSAVE_ENABLED_KEY, '1');
  else {
    // Remove the snapshot first: if deletion is denied, the opt-in flag stays accurate.
    storage.removeItem(TOURNAMENT_AUTOSAVE_KEY);
    storage.removeItem(TOURNAMENT_AUTOSAVE_ENABLED_KEY);
  }
}
