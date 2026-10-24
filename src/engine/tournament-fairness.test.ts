import { describe, expect, it } from 'vitest';
import { createTournamentDefinition } from './tournament-model';
import { createRoundRobinSchedule } from './tournament-schedule';
import { auditTournamentFairness, auditSideBias, createFairSideSchedule } from './tournament-fairness';
const robot = (id: string) => ({ id, name: id, strategy: 'aggressive', maxStructure: 100, maxEnergy: 100, energyRegen: 2, speed: 1, sensorRange: 150, weaponRange: 100, weaponDamage: 10, weaponEnergy: 5, cooldownTicks: 1 });
describe('NEXT-60 deterministic fairness audit', () => {
  it('counts prototype-like participant IDs without inherited-property collisions', () => {
    const ids = ['__proto__', 'constructor', 'toString'];
    const definition = createTournamentDefinition({ schemaVersion: 1, id: 'special-ids', format: 'round-robin', baseSeed: 12, maxTicks: 10, participants: ids.map(robot) });
    const audit = auditTournamentFairness(definition);
    expect(Object.keys(audit.appearances)).toEqual(ids);
    expect(ids.map(id => audit.appearances[id])).toEqual([2, 2, 2]);
    expect(ids.map(id => audit.asRobotA[id]! + audit.asRobotB[id]!)).toEqual([2, 2, 2]);
  });
  for (const n of [2,3,4,16]) {
    it('counts all appearances for ' + n + ' participants without changing legacy seeds', () => {
      const definition = createTournamentDefinition({ schemaVersion: 1, id: 'fairness', format: 'round-robin', baseSeed: 12, maxTicks: 10, participants: Array.from({ length: n }, (_, i) => robot('robot-' + i)) });
      const audit = auditTournamentFairness(definition);
      expect(audit.matches).toBe(n * (n - 1) / 2);
      expect(Object.values(audit.appearances)).toEqual(Array(n).fill(n - 1));
      expect(createFairSideSchedule(definition)).toEqual(createRoundRobinSchedule(definition));
      expect(createFairSideSchedule(definition, true).map(f => f.seed)).toEqual(createRoundRobinSchedule(definition).map(f => f.seed));
      expect(auditTournamentFairness(definition)).toEqual(audit);
    });
  }
});

describe('NEXT-60 paired side bias', () => {
  for (const n of [2,3,4,16]) {
    it('evaluates both sides with unchanged seeds for '+n+' players', () => {
      const definition = createTournamentDefinition({ schemaVersion: 1, id:'bias', format:'round-robin', baseSeed:4711, maxTicks:8, participants:Array.from({length:n},(_,i)=>robot('bot-'+i)) });
      const audit = auditSideBias(definition);
      expect(audit.simulations).toBe(n*(n-1));
      expect(audit.sideAWins+audit.sideBWins+audit.draws).toBe(audit.simulations);
      expect(auditSideBias(definition)).toEqual(audit);
      expect(Math.abs(audit.sideWinDifference)).toBeLessThanOrEqual(audit.simulations);
    });
  }
});
