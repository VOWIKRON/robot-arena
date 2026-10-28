import type { TournamentRun } from './tournament-runner';
import {
  TOURNAMENT_AUTOSAVE_KEY, TOURNAMENT_AUTOSAVE_ENABLED_KEY,
  isTournamentAutosaveEnabled, saveTournamentSnapshot, setTournamentAutosaveEnabled, restoreTournamentSnapshot,
  type TournamentSnapshotStorage
} from './tournament-local-save';

/** The browser's origin-scoped Web Lock serializes compare-and-write across tabs. */
export const TOURNAMENT_AUTOSAVE_LOCK = 'robot-arena:tournament:autosave:write:v1';
export const AUTOSAVE_LOCK_UNAVAILABLE =
  'Atomare lokale Sicherung wird von diesem Browser nicht unterstützt. Bitte das Turnier als JSON exportieren.';

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
    // A second tab may re-save identical bytes (for example after Restore).
    // Only actual changes to the snapshot or opt-in state create a conflict.
    try {
      if (this.storage.getItem(TOURNAMENT_AUTOSAVE_KEY) === this.expectedArchive &&
          isTournamentAutosaveEnabled(this.storage) === this.expectedOptIn) return false;
    } catch { /* blocked storage is conservatively treated as a conflict */ }
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

  /**
   * NEXT-80: the comparison and write MUST execute inside one origin-wide
   * exclusive Web Lock. localStorage by itself has no compare-and-swap API.
   * Missing Web Locks fail closed rather than claiming cross-tab safety.
   */
  private withExclusiveLock<T>(locks: LockManager | undefined, action: () => T): Promise<T> {
    if (!locks || typeof locks.request !== 'function') {
      return Promise.reject(new Error(AUTOSAVE_LOCK_UNAVAILABLE));
    }
    return locks.request(TOURNAMENT_AUTOSAVE_LOCK, { mode: 'exclusive' }, () => action());
  }

  saveLocked(run: TournamentRun, locks: LockManager | undefined): Promise<void> {
    return this.withExclusiveLock(locks, () => this.save(run));
  }

  setEnabledLocked(enabled: boolean, locks: LockManager | undefined): Promise<void> {
    return this.withExclusiveLock(locks, () => this.setEnabled(enabled));
  }

  /** Validation and revision acceptance happen within the same lock. */
  restoreLocked(locks: LockManager | undefined): Promise<TournamentRun | null> {
    return this.withExclusiveLock(locks, () => {
      const restored = restoreTournamentSnapshot(this.storage);
      if (restored !== null) this.acceptVerifiedRestore();
      return restored;
    });
  }

  /** Call only after the archive has passed full validation. */
  acceptVerifiedRestore(): void {
    this.expectedArchive = this.storage.getItem(TOURNAMENT_AUTOSAVE_KEY);
    this.expectedOptIn = isTournamentAutosaveEnabled(this.storage);
    this.stale = false;
  }
}
