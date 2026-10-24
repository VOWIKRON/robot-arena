import { describe, expect, it } from 'vitest';
import { createTournamentDefinition } from './tournament-model';
import { createTournamentRun, advanceTournamentRun, finishTournamentRun, pauseTournamentRun } from './tournament-runner';
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
});
