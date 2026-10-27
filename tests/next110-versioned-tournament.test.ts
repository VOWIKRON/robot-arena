import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { runMatch } from '../src/engine/simulation';
import { runMatchV2 } from '../src/engine/simulation-v2';
import { createTournamentDefinition, parseTournamentDefinition, serializeTournamentDefinition } from '../src/engine/tournament-model';
import { advanceTournamentRun, createTournamentRun, finishTournamentRun, pauseTournamentRun, resumeTournamentRun } from '../src/engine/tournament-runner';
import { continueImportedTournament, exportTournamentRun, importTournamentRun } from '../src/engine/tournament-archive';

const bots = [RAPTOR, TITAN, { ...TITAN, id: 'titan-two', name: 'Titan Two' }];
const base = { id: 'next110-v2', format: 'round-robin', baseSeed: 4711, maxTicks: 180, participants: bots };
const legacy = () => createTournamentDefinition({ ...base, schemaVersion: 1 });
const simultaneous = () => createTournamentDefinition({ ...base, schemaVersion: 2, rulesetVersion: 'simultaneous-v2' });

describe('NEXT-110 stage C: versioned tournament execution and archive boundary', () => {
  it('keeps v1 definitions byte-compatible and forbids unversioned ruleset injection', () => {
    const v1 = legacy();
    expect(v1.schemaVersion).toBe(1);
    expect(Object.hasOwn(v1, 'rulesetVersion')).toBe(false);
    expect(JSON.parse(serializeTournamentDefinition(v1)).rulesetVersion).toBeUndefined();
    expect(() => createTournamentDefinition({ ...base, schemaVersion: 1, rulesetVersion: 'simultaneous-v2' }))
      .toThrow(/Regelversion/);
    expect(() => createTournamentDefinition({ ...base, schemaVersion: 1, rulesetVersion: undefined }))
      .toThrow(/Regelversion/);
  });

  it('requires a known explicit v2 ruleset; rejects missing, future and malformed values', () => {
    for (const rulesetVersion of [undefined, null, 'sequential-v1', 'simultaneous-v3', 2]) {
      expect(() => createTournamentDefinition({ ...base, schemaVersion: 2, rulesetVersion }))
        .toThrow(/Regelversion/);
    }
    expect(() => createTournamentDefinition({ ...base, schemaVersion: 3, rulesetVersion: 'simultaneous-v2' }))
      .toThrow(/schemaVersion/);
    const def = simultaneous();
    expect(def.rulesetVersion).toBe('simultaneous-v2');
    expect(parseTournamentDefinition(serializeTournamentDefinition(def))).toEqual(def);
  });

  it('executes v2 fixtures with the simultaneous resolver while leaving v1 execution unchanged', () => {
    const v1 = advanceTournamentRun(createTournamentRun(legacy()));
    const v2 = advanceTournamentRun(createTournamentRun(simultaneous()));
    const firstA = bots[0]!;
    const firstB = bots[1]!;
    const seed = base.baseSeed;
    const old = runMatch(firstA, firstB, seed, base.maxTicks);
    const modern = runMatchV2(firstA, firstB, seed, base.maxTicks);
    expect(v1.results[0]).toMatchObject({ winnerId: old.winner, ticks: old.tick });
    expect(v2.results[0]).toMatchObject({ winnerId: modern.winner, ticks: modern.tick });
    expect(v1.definition.schemaVersion).toBe(1);
    expect(v2.definition).toMatchObject({ schemaVersion: 2, rulesetVersion: 'simultaneous-v2' });
  });

  it('round-trips v2 paused archives and resumes identically to uninterrupted v2', () => {
    const started = advanceTournamentRun(createTournamentRun(simultaneous()));
    const paused = pauseTournamentRun(started);
    const serialized = exportTournamentRun(paused);
    const data = JSON.parse(serialized);
    expect(data.schemaVersion).toBe(2);
    expect(data.run.definition.rulesetVersion).toBe('simultaneous-v2');
    const restored = importTournamentRun(serialized);
    expect(restored).toEqual(paused);
    const resumed = finishTournamentRun(resumeTournamentRun(restored));
    const uninterrupted = finishTournamentRun(createTournamentRun(simultaneous()));
    expect(resumed.results).toEqual(uninterrupted.results);
    expect(resumed.results).toEqual(finishTournamentRun(continueImportedTournament(paused)).results);
  });

  it('fails closed on schema/ruleset mismatch, version stripping and tampered progress', () => {
    const archived = JSON.parse(exportTournamentRun(pauseTournamentRun(advanceTournamentRun(createTournamentRun(simultaneous())))));
    const reject = (mutate: (value: any) => void) => {
      const changed = structuredClone(archived);
      mutate(changed);
      expect(() => importTournamentRun(JSON.stringify(changed))).toThrow();
    };
    reject(value => { delete value.schemaVersion; });
    reject(value => { value.schemaVersion = 1; });
    reject(value => { value.schemaVersion = 3; });
    reject(value => { delete value.run.definition.rulesetVersion; });
    reject(value => { value.run.definition.rulesetVersion = 'sequential-v1'; });
    reject(value => { value.run.definition.schemaVersion = 1; });
    reject(value => { value.run.nextMatchIndex += 1; });
    reject(value => { value.run.results[0].seed += 1; });
  });

  it('rejects v1 archives disguised as v2 and preserves v1 archive compatibility', () => {
    const v1 = JSON.parse(exportTournamentRun(createTournamentRun(legacy())));
    expect(v1.schemaVersion).toBe(1);
    expect(importTournamentRun(JSON.stringify(v1)).definition).toEqual(legacy());
    v1.schemaVersion = 2;
    expect(() => importTournamentRun(JSON.stringify(v1))).toThrow(/Schema/);
  });
});
