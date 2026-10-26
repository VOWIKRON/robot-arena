import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from './presets';
import { createTournamentDefinition } from './tournament-model';
import { createTournamentRun, advanceTournamentRun } from './tournament-runner';
import { TOURNAMENT_AUTOSAVE_KEY, TOURNAMENT_AUTOSAVE_ENABLED_KEY, restoreTournamentSnapshot, type TournamentSnapshotStorage } from './tournament-local-save';
import { TournamentAutosaveGuard, AUTOSAVE_CONFLICT_NOTICE, AUTOSAVE_LOCK_UNAVAILABLE, TOURNAMENT_AUTOSAVE_LOCK, formatTournamentStorageError } from './tournament-storage-guard';

function memoryStorage() {
  const data = new Map<string, string>();
  const storage: TournamentSnapshotStorage = {
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => { data.set(key, value); },
    removeItem: key => { data.delete(key); }
  };
  return { data, storage };
}
function fixture() {
  return createTournamentRun(createTournamentDefinition({
    schemaVersion: 1, id: 'next-77', format: 'round-robin', baseSeed: 77, maxTicks: 2,
    participants: [{ ...RAPTOR, id: 'a' }, { ...TITAN, id: 'b' }]
  }));
}
describe('NEXT-77 local storage and cross-tab errors', () => {
  it('rejects stale-tab overwrites even when a storage event was missed', () => {
    const { storage } = memoryStorage();
    const first = new TournamentAutosaveGuard(storage);
    first.setEnabled(true);
    const second = new TournamentAutosaveGuard(storage);
    first.save(fixture());
    const saved = storage.getItem(TOURNAMENT_AUTOSAVE_KEY);
    expect(() => second.save(advanceTournamentRun(fixture()))).toThrow(AUTOSAVE_CONFLICT_NOTICE);
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_KEY)).toBe(saved);
    expect(restoreTournamentSnapshot(storage)).toEqual(fixture());
  });
  it('detects foreign opt-out, does not silently delete or overwrite', () => {
    const { storage } = memoryStorage();
    const first = new TournamentAutosaveGuard(storage);
    first.setEnabled(true);
    first.save(fixture());
    const second = new TournamentAutosaveGuard(storage);
    first.setEnabled(false);
    expect(() => second.save(fixture())).toThrow(/Andere Registerkarte/);
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_KEY)).toBeNull();
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_ENABLED_KEY)).toBeNull();
  });
  it('reports storage events and permits writing only after verified recovery', () => {
    const { storage } = memoryStorage();
    const first = new TournamentAutosaveGuard(storage);
    first.setEnabled(true);
    first.save(fixture());
    const second = new TournamentAutosaveGuard(storage);
    expect(second.noteExternalChange('unrelated-key')).toBe(false);
    expect(second.noteExternalChange(TOURNAMENT_AUTOSAVE_KEY)).toBe(false); // same bytes
    first.save(advanceTournamentRun(fixture()));
    expect(second.noteExternalChange(TOURNAMENT_AUTOSAVE_KEY)).toBe(true);
    expect(() => second.save(fixture())).toThrow(/Andere Registerkarte/);
    expect(restoreTournamentSnapshot(storage)?.results).toHaveLength(1);
    second.acceptVerifiedRestore();
    second.save(fixture());
    expect(restoreTournamentSnapshot(storage)?.results).toHaveLength(0);
  });
  it('preserves previous snapshot when quota is exhausted', () => {
    const { storage } = memoryStorage();
    const guard = new TournamentAutosaveGuard(storage);
    guard.setEnabled(true);
    guard.save(fixture());
    const before = storage.getItem(TOURNAMENT_AUTOSAVE_KEY);
    const quotaStorage: TournamentSnapshotStorage = {
      getItem: key => storage.getItem(key),
      removeItem: key => storage.removeItem(key),
      setItem: () => { const error = new Error('quota reached'); error.name = 'QuotaExceededError'; throw error; }
    };
    const blocked = new TournamentAutosaveGuard(quotaStorage);
    expect(() => blocked.save(advanceTournamentRun(fixture()))).toThrow(/quota/);
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_KEY)).toBe(before);
    expect(formatTournamentStorageError(new DOMException('quota', 'QuotaExceededError'))).toMatch(/Speicherplatz voll/);
    expect(formatTournamentStorageError(new DOMException('blocked', 'SecurityError'))).toMatch(/Browser blockiert/);
  });
  it('keeps opt-in enabled when snapshot deletion is blocked', () => {
    const { storage } = memoryStorage();
    const guard = new TournamentAutosaveGuard(storage);
    guard.setEnabled(true);
    guard.save(fixture());
    const denied: TournamentSnapshotStorage = {
      getItem: key => storage.getItem(key),
      setItem: (key, value) => storage.setItem(key, value),
      removeItem: key => { if (key === TOURNAMENT_AUTOSAVE_KEY) throw new Error('SecurityError'); storage.removeItem(key); }
    };
    const blocked = new TournamentAutosaveGuard(denied);
    expect(() => blocked.setEnabled(false)).toThrow(/SecurityError/);
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_ENABLED_KEY)).toBe('1');
    expect(restoreTournamentSnapshot(storage)).toEqual(fixture());
  });
});

/** A deterministic origin-wide exclusive-lock queue shared by multiple tabs. */
function fakeLocks() {
  let queue = Promise.resolve();
  const requests: string[] = [];
  const locks = {
    request: <T>(name: string, _options: LockOptions, action: () => T): Promise<T> => {
      requests.push(name);
      const next = queue.then(action);
      queue = next.then(() => undefined, () => undefined);
      return next;
    }
  } as unknown as LockManager;
  return { locks, requests };
}

describe('NEXT-80 atomic multi-tab autosave', () => {
  it('serializes simultaneous writes and rejects the stale writer without losing the winner', async () => {
    const { storage } = memoryStorage();
    new TournamentAutosaveGuard(storage).setEnabled(true);
    const first = new TournamentAutosaveGuard(storage);
    const second = new TournamentAutosaveGuard(storage);
    const { locks, requests } = fakeLocks();
    const [winner, loser] = await Promise.allSettled([
      first.saveLocked(fixture(), locks),
      second.saveLocked(advanceTournamentRun(fixture()), locks)
    ]);
    expect(winner.status).toBe('fulfilled');
    expect(loser.status).toBe('rejected');
    if (loser.status === 'rejected') expect(String(loser.reason)).toContain(AUTOSAVE_CONFLICT_NOTICE);
    expect(restoreTournamentSnapshot(storage)).toEqual(fixture());
    expect(requests).toEqual([TOURNAMENT_AUTOSAVE_LOCK, TOURNAMENT_AUTOSAVE_LOCK]);
  });

  it('rejects a competing opt-out while the snapshot changes in another tab', async () => {
    const { storage } = memoryStorage();
    new TournamentAutosaveGuard(storage).setEnabled(true);
    const first = new TournamentAutosaveGuard(storage);
    const second = new TournamentAutosaveGuard(storage);
    const { locks } = fakeLocks();
    const [saved, disabled] = await Promise.allSettled([
      first.saveLocked(fixture(), locks), second.setEnabledLocked(false, locks)
    ]);
    expect(saved.status).toBe('fulfilled');
    expect(disabled.status).toBe('rejected');
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_ENABLED_KEY)).toBe('1');
    expect(restoreTournamentSnapshot(storage)).toEqual(fixture());
  });

  it('validates restore and accepts its revision under the same exclusive lock', async () => {
    const { storage } = memoryStorage();
    new TournamentAutosaveGuard(storage).setEnabled(true);
    const first = new TournamentAutosaveGuard(storage);
    const second = new TournamentAutosaveGuard(storage);
    const { locks } = fakeLocks();
    await first.saveLocked(fixture(), locks);
    expect(await second.restoreLocked(locks)).toEqual(fixture());
    await second.saveLocked(advanceTournamentRun(fixture()), locks);
    expect(restoreTournamentSnapshot(storage)?.results).toHaveLength(1);
  });

  it('fails closed when Web Locks are absent, leaving storage untouched', async () => {
    const { storage } = memoryStorage();
    const guard = new TournamentAutosaveGuard(storage);
    await expect(guard.setEnabledLocked(true, undefined)).rejects.toThrow(AUTOSAVE_LOCK_UNAVAILABLE);
    await expect(guard.saveLocked(fixture(), undefined)).rejects.toThrow(AUTOSAVE_LOCK_UNAVAILABLE);
    await expect(guard.restoreLocked(undefined)).rejects.toThrow(AUTOSAVE_LOCK_UNAVAILABLE);
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_ENABLED_KEY)).toBeNull();
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_KEY)).toBeNull();
  });

  it('keeps previous bytes and opt-in when a locked write exceeds quota', async () => {
    const { storage } = memoryStorage();
    new TournamentAutosaveGuard(storage).setEnabled(true);
    const { locks } = fakeLocks();
    const guard = new TournamentAutosaveGuard(storage);
    await guard.saveLocked(fixture(), locks);
    const before = storage.getItem(TOURNAMENT_AUTOSAVE_KEY);
    const failing: TournamentSnapshotStorage = {
      getItem: key => storage.getItem(key),
      removeItem: key => storage.removeItem(key),
      setItem: () => { throw new DOMException('quota', 'QuotaExceededError'); }
    };
    const blocked = new TournamentAutosaveGuard(failing);
    await expect(blocked.saveLocked(advanceTournamentRun(fixture()), locks)).rejects.toThrow(/quota/);
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_KEY)).toBe(before);
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_ENABLED_KEY)).toBe('1');
  });
});
