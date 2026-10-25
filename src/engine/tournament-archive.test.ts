import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { createTournamentDefinition } from './tournament-model';
import { createTournamentRun, advanceTournamentRun, finishTournamentRun, pauseTournamentRun, cancelTournamentRun } from './tournament-runner';
import { continueImportedTournament, exportTournamentRun, importTournamentRun } from './tournament-archive';
const robot = (id: string) => ({
  id, name: id, strategy: 'aggressive', maxStructure: 100, maxEnergy: 100,
  energyRegen: 2, speed: 1, sensorRange: 150, weaponRange: 100,
  weaponDamage: 10, weaponEnergy: 5, cooldownTicks: 1
});
const definition = createTournamentDefinition({
  schemaVersion: 1, id: 'archive', format: 'round-robin', baseSeed: 4711,
  maxTicks: 10, participants: [robot('a'), robot('b'), robot('c')]
});
describe('NEXT-58 tournament archive', () => {
  it('roundtrips a paused partial tournament and resumes without replaying fixtures', () => {
    const first = advanceTournamentRun(createTournamentRun(definition));
    const saved = importTournamentRun(exportTournamentRun(pauseTournamentRun(first)));
    expect(saved).toEqual(pauseTournamentRun(first));
    const next = continueImportedTournament(saved);
    expect(next.nextMatchIndex).toBe(2);
    expect(next.results[0]).toEqual(first.results[0]);
    expect(finishTournamentRun(next)).toEqual(finishTournamentRun(first));
  });
  it('roundtrips a completed tournament without changing results or winner ordering', () => {
    const complete = finishTournamentRun(createTournamentRun(definition));
    expect(importTournamentRun(exportTournamentRun(complete))).toEqual(complete);
    expect(continueImportedTournament(complete)).toEqual(complete);
  });
  it('rejects corrupt progress, duplicated match and oversized archives', () => {
    const run = advanceTournamentRun(createTournamentRun(definition));
    const original = JSON.parse(exportTournamentRun(run));
    original.run.nextMatchIndex = 2;
    expect(() => importTournamentRun(JSON.stringify(original))).toThrow();
    const duplicate = JSON.parse(exportTournamentRun(run));
    duplicate.run.results.push(duplicate.run.results[0]);
    duplicate.run.nextMatchIndex = 2;
    expect(() => importTournamentRun(JSON.stringify(duplicate))).toThrow();
    expect(() => importTournamentRun(' '.repeat(2 * 1024 * 1024 + 1))).toThrow();
  });
  it.each(['running', 'paused', 'cancelled', 'ready'])('rejects a complete archive falsely marked %s', status => {
    const complete = JSON.parse(exportTournamentRun(finishTournamentRun(createTournamentRun(definition))));
    complete.run.status = status;
    expect(() => importTournamentRun(JSON.stringify(complete))).toThrow(/Abschlussstatus/);
  });
  it('rejects a partial archive falsely marked completed', () => {
    const partial = JSON.parse(exportTournamentRun(advanceTournamentRun(createTournamentRun(definition))));
    partial.run.status = 'completed';
    expect(() => importTournamentRun(JSON.stringify(partial))).toThrow(/unvollständiger Abschluss/);
  });
  it.each([0, 2, 999, '1', null])('refuses unsupported archive schemaVersion %s without migration', version => {
    const archived = JSON.parse(exportTournamentRun(createTournamentRun(definition)));
    archived.schemaVersion = version;
    expect(() => importTournamentRun(JSON.stringify(archived))).toThrow(/ungültige Version/);
  });
  it('distinguishes missing version, missing run, malformed JSON and oversized input', () => {
    const archived = JSON.parse(exportTournamentRun(createTournamentRun(definition)));
    delete archived.schemaVersion;
    expect(() => importTournamentRun(JSON.stringify(archived))).toThrow(/Versionsfeld fehlt/);
    archived.schemaVersion = 1;
    delete archived.run;
    expect(() => importTournamentRun(JSON.stringify(archived))).toThrow(/Laufdaten fehlen/);
    expect(() => importTournamentRun('{broken')).toThrow(/beschädigtes JSON/);
    expect(() => importTournamentRun('x'.repeat(2 * 1024 * 1024 + 1))).toThrow(/zu groß/);
  });
  it('preserves v1 ready, running, paused, cancelled and completed snapshots byte-for-byte', () => {
    const ready = createTournamentRun(definition);
    const running = advanceTournamentRun(ready);
    const variants = [ready, running, pauseTournamentRun(running), cancelTournamentRun(running), finishTournamentRun(ready)];
    for (const run of variants) {
      const archive = exportTournamentRun(run);
      const restored = importTournamentRun(archive);
      expect(restored).toEqual(run);
      expect(exportTournamentRun(restored)).toBe(archive);
    }
  });
  it('preserves deterministic 16-participant v1 archives and all 120 fixtures', () => {
    const participants = Array.from({ length: 16 }, (_, i) => robot('robot-' + i));
    const sixteen = createTournamentDefinition({
      schemaVersion: 1, id: 'compat-16', format: 'round-robin', baseSeed: 4711,
      maxTicks: 1, participants
    });
    const completed = finishTournamentRun(createTournamentRun(sixteen));
    const archive = exportTournamentRun(completed);
    expect(completed.results).toHaveLength(120);
    expect(importTournamentRun(archive)).toEqual(completed);
    expect(exportTournamentRun(importTournamentRun(archive))).toBe(archive);
  });

  it('records fixed-seed V1 golden-archive digests for 2 and 16 participants', () => {
    for (const count of [2, 16]) {
      const participants = Array.from({ length: count }, (_, i) => robot('golden-' + i));
      const fixture = createTournamentDefinition({
        schemaVersion: 1, id: 'compat-golden-' + count, format: 'round-robin', baseSeed: 4711,
        maxTicks: 1, participants
      });
      const base = createTournamentRun(fixture);
      const partial = count === 2 ? base : advanceTournamentRun(base);
      const cases = {
        paused: pauseTournamentRun(partial),
        cancelled: cancelTournamentRun(partial),
        completed: finishTournamentRun(base)
      };
      for (const [status, run] of Object.entries(cases)) {
        const digest = createHash('sha256').update(exportTournamentRun(run)).digest('hex');
        console.log('NEXT75_GOLDEN', count, status, digest);
        expect(digest).toMatch(/^[0-9a-f]{64}$/);
      }
    }
  });

});
