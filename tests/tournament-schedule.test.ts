import { describe, expect, it } from 'vitest';
import { RAPTOR } from '../src/engine/presets';
import { createTournamentDefinition } from '../src/engine/tournament-model';
import { createRoundRobinSchedule } from '../src/engine/tournament-schedule';

const model = (n: number, baseSeed = 4711) => createTournamentDefinition({
  schemaVersion: 1, id: 'round-robin', format: 'round-robin', baseSeed, maxTicks: 3600,
  participants: Array.from({ length: n }, (_, i) => ({ ...RAPTOR, id: `r${i}`, name: `Robot ${i}` }))
});

describe('NEXT-53 deterministic round-robin fixture generation', () => {
  it.each([2, 3, 4, 16])('creates exactly one pairing per unordered pair for %i robots', n => {
    const definition = model(n);
    const before = structuredClone(definition);
    const fixtures = createRoundRobinSchedule(definition);
    expect(fixtures).toHaveLength(n * (n - 1) / 2);
    const pairs = fixtures.map(pair => [pair.robotAId, pair.robotBId].sort().join(':'));
    expect(new Set(pairs).size).toBe(fixtures.length);
    expect(fixtures.every(pair => pair.robotAId !== pair.robotBId)).toBe(true);
    expect(fixtures.map(pair => pair.id)).toEqual(fixtures.map((_, i) => `match-${String(i + 1).padStart(3, '0')}`));
    expect(createRoundRobinSchedule(definition)).toEqual(fixtures);
    expect(definition).toEqual(before);
    expect(Object.isFrozen(fixtures)).toBe(true);
    expect(Object.isFrozen(fixtures[0])).toBe(true);
  });

  it('keeps pairing order and seeds stable for odd participant counts', () => {
    const fixtures = createRoundRobinSchedule(model(3, 12));
    expect(fixtures.map(pair => [pair.robotAId, pair.robotBId, pair.seed])).toEqual([
      ['r0', 'r1', 12], ['r0', 'r2', 13], ['r1', 'r2', 14]
    ]);
  });

  it('derives seeds without unsafe overflow at the maximum safe base seed', () => {
    const fixtures = createRoundRobinSchedule(model(16, Number.MAX_SAFE_INTEGER));
    expect(fixtures.every(pair => Number.isSafeInteger(pair.seed) && pair.seed >= 0 && pair.seed < 2147483647)).toBe(true);
    expect(createRoundRobinSchedule(model(16, Number.MAX_SAFE_INTEGER))).toEqual(fixtures);
  });

  it('rejects knockout definitions without touching the original', () => {
    const def = createTournamentDefinition({
      ...model(2), format: 'knockout'
    });
    expect(() => createRoundRobinSchedule(def)).toThrow(/round-robin/);
    expect(def.format).toBe('knockout');
  });
});
