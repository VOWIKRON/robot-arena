import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { createTournamentDefinition } from './tournament-model';
import { createTournamentRun, advanceTournamentRun, finishTournamentRun } from './tournament-runner';
import { computeRoundRobinStandings } from './tournament-standings';
import { exportTournamentRun, importTournamentRun, continueImportedTournament } from './tournament-archive';
import { runKnockoutBracket } from './tournament-knockout';
import { auditTournamentFairness } from './tournament-fairness';
const robot = (id: string) => ({ id, name: id, strategy: 'aggressive', maxStructure: 100, maxEnergy: 100, energyRegen: 2, speed: 1, sensorRange: 150, weaponRange: 100, weaponDamage: 10, weaponEnergy: 5, cooldownTicks: 1 });
describe('NEXT-59 tournament integration and deterministic regression', () => {
  it('16 participants complete all 120 round robin matches and export/import identically', () => {
    const definition = createTournamentDefinition({ schemaVersion: 1, id: 'integration', format: 'round-robin', baseSeed: 4711, maxTicks: 10, participants: Array.from({ length: 16 }, (_, i) => robot('r' + i)) });
    const initial = createTournamentRun(definition);
    const first = advanceTournamentRun(initial);
    const restored = importTournamentRun(exportTournamentRun(first));
    const resumed = finishTournamentRun(continueImportedTournament(restored));
    const direct = finishTournamentRun(initial);
    expect(resumed).toEqual(direct);
    expect(resumed.results).toHaveLength(120);
    const standings = computeRoundRobinStandings(definition, resumed.results);
    expect(standings.complete).toBe(true);
    expect(standings.standings.reduce((sum, row) => sum + row.played, 0)).toBe(240);
    expect(auditTournamentFairness(definition).matches).toBe(120);
  });
  it('knockout produces stable champion across repeated full runs', () => {
    const definition = createTournamentDefinition({ schemaVersion: 1, id: 'knockout', format: 'knockout', baseSeed: 12, maxTicks: 10, participants: Array.from({ length: 5 }, (_, i) => robot('r' + i)) });
    expect(runKnockoutBracket(definition)).toEqual(runKnockoutBracket(definition));
  });
});

describe('NEXT-59 golden references and bounded execution', () => {
  const digest = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
  const create = (format: 'round-robin' | 'knockout') => createTournamentDefinition({
    schemaVersion: 1, id: 'golden', format, baseSeed: 4711, maxTicks: 10,
    participants: Array.from({length:16}, (_,i)=>robot('r'+i))
  });
  it('round-robin standings have stable SHA256 reference', () => {
    const definition = create('round-robin');
    const result = computeRoundRobinStandings(definition, finishTournamentRun(createTournamentRun(definition)).results);
    expect(digest(result)).toBe('079051ea6a23533702a98b74eafbb82b1d972c7748f685bf6b480f4860fcf769');
  });
  it('knockout bracket has stable SHA256 reference', () => {
    expect(digest(runKnockoutBracket(create('knockout')))).toBe('d8d1f8c8662b32760a009045ce4b1c6634378c93224e36d764d207538e1cfb5a');
  });
  it('16-player engine execution stays within a documented generous CI limit', () => {
    const start = performance.now();
    const definition = create('round-robin');
    const completed = finishTournamentRun(createTournamentRun(definition));
    expect(completed.results).toHaveLength(120);
    expect(performance.now() - start).toBeLessThan(30_000);
  });
});
