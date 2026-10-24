import { describe, expect, it } from 'vitest';
import { createTournamentDefinition } from './tournament-model';
import { createTournamentRun, advanceTournamentRun, finishTournamentRun } from './tournament-runner';
import { exportTournamentTableCsv, exportTournamentTableJson } from './tournament-export';
const robot = (id: string, name: string) => ({ id, name, strategy: 'aggressive', maxStructure: 100, maxEnergy: 100, energyRegen: 2, speed: 1, sensorRange: 150, weaponRange: 100, weaponDamage: 10, weaponEnergy: 5, cooldownTicks: 1 });
describe('NEXT-61 table export', () => {
  for (const count of [2,16]) {
    it('exports deterministic incomplete and completed tables for ' + count + ' players', () => {
      const definition = createTournamentDefinition({ schemaVersion: 1, id: 'table', format: 'round-robin', baseSeed: 99, maxTicks: 8, participants: Array.from({length: count}, (_, i) => robot('id-'+i, i === 0 ? '=SUM(1,2)' : 'ÄÖ Ünicode '+i)) });
      const initial = createTournamentRun(definition);
      const csv = exportTournamentTableCsv(initial);
      expect(csv).toContain("'=SUM(1,2)");
      expect(csv).toContain('ÄÖ Ünicode');
      expect(JSON.parse(exportTournamentTableJson(initial)).completedMatches).toBe(0);
      const finished = finishTournamentRun(advanceTournamentRun(initial));
      expect(JSON.parse(exportTournamentTableJson(finished)).completedMatches).toBe(count*(count-1)/2);
      expect(exportTournamentTableCsv(finished)).toBe(exportTournamentTableCsv(finished));
      expect(initial.results).toHaveLength(0);
    });
  }
});
