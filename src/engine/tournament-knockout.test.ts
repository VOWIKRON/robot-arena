import { describe, expect, it } from 'vitest';
import { runKnockoutBracket } from './tournament-knockout';
import { createTournamentDefinition } from './tournament-model';


function fixture(count: number) {
  const prototype = { strategy: 'aggressive', maxStructure: 100, maxEnergy: 100, energyRegen: 2, speed: 1, sensorRange: 150, weaponRange: 100, weaponDamage: 10, weaponEnergy: 5, cooldownTicks: 1 };
  return createTournamentDefinition({
    schemaVersion: 1, id: 'knockout-test', format: 'knockout',
    baseSeed: 4711, maxTicks: 12,
    participants: Array.from({ length: count }, (_, i) => ({
      ...prototype, id: 'robot-' + i, name: 'Robot ' + i
    }))
  });
}
describe('NEXT-57 knockout bracket', () => {
  for (const n of [2, 3, 5, 8, 16]) {
    it('completes reproducibly for ' + n + ' participants', () => {
      const definition = fixture(n);
      const first = runKnockoutBracket(definition);
      expect(runKnockoutBracket(definition)).toEqual(first);
      expect(first.matches.filter(m => m.robotBId !== null)).toHaveLength(n - 1);
      expect(definition.participants.map(p => p.id)).toContain(first.championId);
      expect(Object.isFrozen(first.matches)).toBe(true);
      for (const round of new Set(first.matches.map(m => m.round))) {
        const participants = first.matches.filter(m => m.round === round)
          .flatMap(m => [m.robotAId, m.robotBId].filter(Boolean));
        expect(new Set(participants).size).toBe(participants.length);
      }
    });
  }
  it('rejects round robin definitions', () => {
    expect(() => runKnockoutBracket({ ...fixture(2), format: 'round-robin' })).toThrow();
  });
});
