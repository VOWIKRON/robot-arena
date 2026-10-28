import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from './presets';
import { createTournamentDefinition } from './tournament-model';
import { advanceTournamentRun, createTournamentRun, finishTournamentRun, pauseTournamentRun, resumeTournamentRun, cancelTournamentRun } from './tournament-runner';
import { TOURNAMENT_AUTOSAVE_KEY, TOURNAMENT_AUTOSAVE_ENABLED_KEY, saveTournamentSnapshot, restoreTournamentSnapshot, isTournamentAutosaveEnabled, setTournamentAutosaveEnabled, type TournamentSnapshotStorage } from './tournament-local-save';

function memoryStorage(): TournamentSnapshotStorage {
  const entries = new Map<string, string>();
  return {
    getItem: key => entries.get(key) ?? null,
    setItem: (key, value) => { entries.set(key, value); },
    removeItem: key => { entries.delete(key); }
  };
}
function fixture(count = 2) {
  const participants = Array.from({ length: count }, (_, i) => ({ ...(i % 2 ? TITAN : RAPTOR), id: 'p-' + i, name: 'Roboter ' + i }));
  return createTournamentRun(createTournamentDefinition({
    schemaVersion: 1, id: 'autosave', format: 'round-robin', baseSeed: 4711, maxTicks: 1, participants
  }));
}
describe('NEXT-68 local tournament autosave', () => {
  it('is opt-in and clearing it deletes the saved data', () => {
    const storage = memoryStorage();
    expect(isTournamentAutosaveEnabled(storage)).toBe(false);
    expect(restoreTournamentSnapshot(storage)).toBeNull();
    setTournamentAutosaveEnabled(storage, true);
    expect(isTournamentAutosaveEnabled(storage)).toBe(true);
    saveTournamentSnapshot(fixture(), storage);
    expect(restoreTournamentSnapshot(storage)).not.toBeNull();
    setTournamentAutosaveEnabled(storage, false);
    expect(isTournamentAutosaveEnabled(storage)).toBe(false);
    expect(restoreTournamentSnapshot(storage)).toBeNull();
  });
  it('restores a paused match-boundary snapshot with identical deterministic results', () => {
    const storage = memoryStorage();
    const run = pauseTournamentRun(advanceTournamentRun(fixture(3)));
    saveTournamentSnapshot(run, storage);
    const restored = restoreTournamentSnapshot(storage)!;
    expect(restored).toEqual(run);
    expect(restored).not.toBe(run);
    expect(Object.isFrozen(restored)).toBe(true);
    expect(finishTournamentRun(resumeTournamentRun(restored))).toEqual(finishTournamentRun(resumeTournamentRun(run)));
  });
  it('restores completed and cancelled status without changing the outcome', () => {
    const storage = memoryStorage();
    for (const run of [finishTournamentRun(fixture()), cancelTournamentRun(advanceTournamentRun(fixture(3)))]) {
      saveTournamentSnapshot(run, storage);
      expect(restoreTournamentSnapshot(storage)).toEqual(run);
    }
  });
  it('handles 16 participants and 120 matches without truncation', () => {
    const storage = memoryStorage();
    const run = finishTournamentRun(fixture(16));
    saveTournamentSnapshot(run, storage);
    expect(restoreTournamentSnapshot(storage)).toEqual(run);
    expect(restoreTournamentSnapshot(storage)!.results).toHaveLength(120);
  });
  it('rejects invalid versions, corrupt progress and oversized data', () => {
    const storage = memoryStorage();
    const run = advanceTournamentRun(fixture(3));
    saveTournamentSnapshot(run, storage);
    const valid = storage.getItem(TOURNAMENT_AUTOSAVE_KEY)!;
    const broken = JSON.parse(valid);
    broken.schemaVersion = 2;
    storage.setItem(TOURNAMENT_AUTOSAVE_KEY, JSON.stringify(broken));
    expect(() => restoreTournamentSnapshot(storage)).toThrow(/Version/);
    broken.schemaVersion = 1;
    broken.run.nextMatchIndex = 99;
    storage.setItem(TOURNAMENT_AUTOSAVE_KEY, JSON.stringify(broken));
    expect(() => restoreTournamentSnapshot(storage)).toThrow(/Fortschritt/);
    storage.setItem(TOURNAMENT_AUTOSAVE_KEY, 'x'.repeat(2 * 1024 * 1024 + 1));
    expect(() => restoreTournamentSnapshot(storage)).toThrow(/zu groß/);
    storage.setItem(TOURNAMENT_AUTOSAVE_KEY, valid);
    expect(restoreTournamentSnapshot(storage)).toEqual(run);
  });
  it('keeps the previous snapshot if storage quota rejects the new write', () => {
    const storage = memoryStorage();
    const run = fixture();
    saveTournamentSnapshot(run, storage);
    const failing: TournamentSnapshotStorage = {
      getItem: key => storage.getItem(key),
      removeItem: key => storage.removeItem(key),
      setItem: () => { throw new Error('QuotaExceededError'); }
    };
    expect(() => saveTournamentSnapshot(advanceTournamentRun(run), failing)).toThrow(/QuotaExceeded/);
    expect(restoreTournamentSnapshot(storage)).toEqual(run);
  });
  it('does not persist anything before the user explicitly opts in', () => {
    const storage = memoryStorage();
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_ENABLED_KEY)).toBeNull();
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_KEY)).toBeNull();
    expect(isTournamentAutosaveEnabled(storage)).toBe(false);
  });
  it('never silently migrates or deletes an incompatible autosave snapshot', () => {
    const storage = memoryStorage();
    saveTournamentSnapshot(pauseTournamentRun(advanceTournamentRun(fixture(3))), storage);
    const valid = storage.getItem(TOURNAMENT_AUTOSAVE_KEY)!;
    for (const version of [0, 2, 99, '1']) {
      const incompatible = JSON.parse(valid);
      incompatible.schemaVersion = version;
      const stored = JSON.stringify(incompatible);
      storage.setItem(TOURNAMENT_AUTOSAVE_KEY, stored);
      expect(() => restoreTournamentSnapshot(storage)).toThrow(/Version/);
      expect(storage.getItem(TOURNAMENT_AUTOSAVE_KEY)).toBe(stored);
    }
    storage.setItem(TOURNAMENT_AUTOSAVE_KEY, '{broken');
    expect(() => restoreTournamentSnapshot(storage)).toThrow(/beschädigtes JSON/);
    expect(storage.getItem(TOURNAMENT_AUTOSAVE_KEY)).toBe('{broken');
    storage.setItem(TOURNAMENT_AUTOSAVE_KEY, valid);
    expect(restoreTournamentSnapshot(storage)).not.toBeNull();
  });

});
