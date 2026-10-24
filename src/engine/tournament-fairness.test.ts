import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { RAPTOR, TITAN } from './presets';
import { runMatch } from './simulation';
import { createTournamentRun, advanceTournamentRun, finishTournamentRun, pauseTournamentRun, resumeTournamentRun } from './tournament-runner';
import { exportTournamentRun, importTournamentRun, continueImportedTournament } from './tournament-archive';
import { computeRoundRobinStandings } from './tournament-standings';
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

describe('NEXT-60 actual runner side assignment and stable fairness references', () => {
  const model = (n: number, balanced = true) => createTournamentDefinition({
    schemaVersion: 1, id: 'balanced-fixtures', format: 'round-robin', baseSeed: 4711,
    maxTicks: 25,
    ...(balanced ? { sideAssignment: 'balanced' as const } : {}),
    participants: Array.from({length:n}, (_,i) => ({
      ...(i % 2 ? TITAN : RAPTOR), id: 'r'+i, name: 'Robot '+i
    }))
  });
  const sha = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
  for (const n of [2,3,4,5,16]) {
    it('balances both actual fixture and runner sides for '+n+' players', () => {
      const canonical = model(n, false);
      const balanced = model(n);
      const original = createRoundRobinSchedule(canonical);
      const changed = createRoundRobinSchedule(balanced);
      expect(changed.map(f => [f.id,f.seed])).toEqual(original.map(f => [f.id,f.seed]));
      expect(changed.map(f => [f.robotAId,f.robotBId].sort())).toEqual(original.map(f => [f.robotAId,f.robotBId].sort()));
      const audit = auditTournamentFairness(balanced);
      expect(audit.maxSideImbalance).toBeLessThanOrEqual(1);
      expect(Object.values(audit.appearances)).toEqual(Array(n).fill(n-1));
      expect(createFairSideSchedule(canonical, true)).toEqual(changed);
      expect(createFairSideSchedule(balanced, false)).toEqual(original);
      expect(Object.isFrozen(changed)).toBe(true);
      const first = advanceTournamentRun(createTournamentRun(balanced));
      const fixture = changed[0]!;
      const left = balanced.participants.find(p=>p.id===fixture.robotAId)!;
      const right = balanced.participants.find(p=>p.id===fixture.robotBId)!;
      const expected = runMatch(left,right,fixture.seed,balanced.maxTicks);
      expect(first.results[0]).toMatchObject({
        robotAId: fixture.robotAId, robotBId: fixture.robotBId,
        seed: fixture.seed, winnerId: expected.winner,
        remainingStructureA: expected.robotA.structure,
        remainingStructureB: expected.robotB.structure
      });
      const paused = pauseTournamentRun(first);
      const resumed = continueImportedTournament(importTournamentRun(exportTournamentRun(paused)));
      const completed = finishTournamentRun(resumed);
      expect(completed).toEqual(finishTournamentRun(createTournamentRun(balanced)));
      expect(computeRoundRobinStandings(balanced,completed.results).complete).toBe(true);
      expect(resumeTournamentRun(paused).results).toEqual(paused.results);
    });
  }
  it('rejects unsupported side assignment and knockout mode', () => {
    expect(() => createTournamentDefinition({...model(2),sideAssignment:'random'})).toThrow(/Seitenzuordnung/);
    expect(() => createTournamentDefinition({...model(2),format:'knockout'})).toThrow(/Seitenbalance/);
  });
  it('pins SHA256 of 16-player balanced fixtures, results, standings and side-bias audit', () => {
    const definition = model(16);
    const completed = finishTournamentRun(createTournamentRun(definition));
    const snapshot = {
      fixtures: createRoundRobinSchedule(definition),
      results: completed.results,
      standings: computeRoundRobinStandings(definition,completed.results),
      audit: auditTournamentFairness(definition),
      sideBias: auditSideBias(definition)
    };
    expect(snapshot.audit.maxSideImbalance).toBeLessThanOrEqual(1);
    expect(snapshot.sideBias.sideBiasRate).toBeLessThanOrEqual(0.25);
    expect(sha(snapshot)).toBe('GOLDEN_BALANCED_16');
  });
  it('pins legacy SHA256 to prove opt-in leaves historical schedule and results unchanged', () => {
    const definition = model(16,false);
    const completed = finishTournamentRun(createTournamentRun(definition));
    expect(sha({fixtures:createRoundRobinSchedule(definition),results:completed.results})).toBe('GOLDEN_LEGACY_16');
  });
});
