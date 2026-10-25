import type { TournamentRun } from './tournament-runner';
import {
  TOURNAMENT_AUTOSAVE_KEY, TOURNAMENT_AUTOSAVE_ENABLED_KEY,
  isTournamentAutosaveEnabled, saveTournamentSnapshot, setTournamentAutosaveEnabled,
  type TournamentSnapshotStorage
} from './tournament-local-save';

export const AUTOSAVE_CONFLICT_NOTICE =
  'Andere Registerkarte hat die lokale Turniersicherung geändert. Bitte die Sicherung erneut laden oder die Seite neu öffnen. Es wurde nichts überschrieben.';

/** Classify browser failures without exposing browser-specific exception stacks. */
export function formatTournamentStorageError(error: unknown): string {
  const description = error instanceof Error ? error.name + ': ' + error.message : String(error);
  if (/quota/i.test(description)) return 'Speicherplatz voll (QuotaExceededError). Turnier bleibt im Arbeitsspeicher erhalten.';
  if (/security|denied|blocked|verweigert/i.test(description)) return 'Browser blockiert den lokalen Speicher. Turnier bleibt im Arbeitsspeicher erhalten.';
  return error instanceof Error ? error.message : 'Unbekannter Speicherfehler';
}

/**
 * Optimistic, per-tab revision guard. Checks actual storage immediately before
 * each write and also listens for storage events. Does not claim atomic CAS:
 * near-simultaneous writes need a browser-wide lock for a strict guarantee.
 */
export class TournamentAutosaveGuard {
  private expectedArchive: string | null;
  private expectedOptIn: boolean;
  private stale = false;

  constructor(private readonly storage: TournamentSnapshotStorage) {
    this.expectedArchive = storage.getItem(TOURNAMENT_AUTOSAVE_KEY);
    this.expectedOptIn = isTournamentAutosaveEnabled(storage);
  }

  noteExternalChange(key: string | null): boolean {
    if (key !== null && key !== TOURNAMENT_AUTOSAVE_KEY && key !== TOURNAMENT_AUTOSAVE_ENABLED_KEY) return false;
    this.stale = true;
    return true;
  }

  private assertCurrent(): void {
    if (this.stale ||
        this.storage.getItem(TOURNAMENT_AUTOSAVE_KEY) !== this.expectedArchive ||
        isTournamentAutosaveEnabled(this.storage) !== this.expectedOptIn) {
      this.stale = true;
      throw new Error(AUTOSAVE_CONFLICT_NOTICE);
    }
  }

  save(run: TournamentRun): void {
    this.assertCurrent();
    saveTournamentSnapshot(run, this.storage);
    this.expectedArchive = this.storage.getItem(TOURNAMENT_AUTOSAVE_KEY);
  }

  setEnabled(enabled: boolean): void {
    this.assertCurrent();
    setTournamentAutosaveEnabled(this.storage, enabled);
    this.expectedArchive = this.storage.getItem(TOURNAMENT_AUTOSAVE_KEY);
    this.expectedOptIn = isTournamentAutosaveEnabled(this.storage);
  }

  /** Call only after the archive has passed full validation. */
  acceptVerifiedRestore(): void {
    this.expectedArchive = this.storage.getItem(TOURNAMENT_AUTOSAVE_KEY);
    this.expectedOptIn = isTournamentAutosaveEnabled(this.storage);
    this.stale = false;
  }
}
