import { describe, expect, it } from 'vitest';
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
