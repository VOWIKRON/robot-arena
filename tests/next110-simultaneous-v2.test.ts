import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { SeededRandom } from '../src/engine/random';
import { createMatch, runMatch, stepMatchWithEvents } from '../src/engine/simulation';
import { LEGACY_RULESET, SIMULTANEOUS_RULESET, parseCombatRuleset, runMatchV2, stepMatchV2WithEvents } from '../src/engine/simulation-v2';

const a = { ...RAPTOR, id: 'alpha', name: 'Alpha' };
const b = { ...RAPTOR, id: 'beta', name: 'Beta' };
const shots = (events: ReturnType<typeof stepMatchV2WithEvents>['events']) =>
  events.filter(event => event.type === 'shot').map(event => event.attackerId);

describe('NEXT-110 stage B isolated simultaneous-v2 resolver', () => {
  it('requires an explicit known ruleset and never guesses a future version', () => {
    expect(parseCombatRuleset(LEGACY_RULESET)).toBe('sequential-v1');
    expect(parseCombatRuleset(SIMULTANEOUS_RULESET)).toBe('simultaneous-v2');
    for (const input of [undefined, null, '', 2, 'simultaneous-v3', 'legacy']) {
      expect(() => parseCombatRuleset(input)).toThrow(/Regelversion/);
    }
  });

  it('preserves historical sequential-v1 outcomes and entry points', () => {
    expect(runMatch(RAPTOR, TITAN, 4711).tick).toBe(93);
    expect(Object.hasOwn(createMatch(a, b), 'rulesetVersion')).toBe(false);
    const initial = createMatch(a, b);
    initial.robotA.position = { x: 40, y: 50 };
    initial.robotB.position = { x: 60, y: 50 };
    expect(shots(stepMatchWithEvents(initial, new SeededRandom(2)).events)).toEqual(['alpha', 'beta']);
  });

  it('computes movement for both robots against the same old position snapshot', () => {
    const initial = createMatch(a, b);
    const unchanged = structuredClone(initial);
    const { state, events } = stepMatchV2WithEvents(initial, new SeededRandom(7));
    expect(initial).toEqual(unchanged);
    expect(state.tick).toBe(1);
    expect(state.robotA.position.x).toBeGreaterThan(15);
    expect(state.robotB.position.x).toBeLessThan(85);
    const moves = events.filter(event => event.type === 'move');
    expect(moves).toHaveLength(2);
    const aMove = moves.find(event => event.robotId === 'alpha');
    const bMove = moves.find(event => event.robotId === 'beta');
    expect(aMove?.to.x).toBeCloseTo(100 - bMove!.to.x, 10);
  });

  it('lets both living robots fire and die on the same tick (no phantom victory)', () => {
    const killerA = { ...a, weaponDamage: 1000, weaponRange: 100, speed: 0 };
    const killerB = { ...b, weaponDamage: 1000, weaponRange: 100, speed: 0 };
    const initial = createMatch(killerA, killerB);
    const result = stepMatchV2WithEvents(initial, new SeededRandom(5));
    expect(shots(result.events)).toEqual(['alpha', 'beta']);
    expect(result.events.filter(event => event.type === 'damage')).toHaveLength(2);
    expect(result.events.some(event => event.type === 'victory')).toBe(false);
    expect(result.state).toMatchObject({ outcome: 'draw', winner: null, endReason: 'destroyed' });
    expect(result.state.robotA.structure).toBe(0);
    expect(result.state.robotB.structure).toBe(0);
    expect(initial.outcome).toBe('active');
  });

  it('consumes jitter in stable robot ID order even when slots are swapped', () => {
    const fixedA = { ...a, speed: 0, weaponRange: 100, weaponDamage: 11 };
    const fixedB = { ...b, speed: 0, weaponRange: 100, weaponDamage: 17 };
    const one = stepMatchV2WithEvents(createMatch(fixedA, fixedB), new SeededRandom(42));
    const two = stepMatchV2WithEvents(createMatch(fixedB, fixedA), new SeededRandom(42));
    const damage = (result: typeof one) => Object.fromEntries(result.events
      .filter(event => event.type === 'damage').map(event => [event.sourceId, event.amount]));
    expect(damage(one)).toEqual(damage(two));
    expect(one.state.robotA.structure).toBeCloseTo(two.state.robotB.structure, 10);
    expect(one.state.robotB.structure).toBeCloseTo(two.state.robotA.structure, 10);
  });

  it('is deterministic over seeds and respects energy, structure and arena bounds', () => {
    for (const seed of [1, 2, 7, 42, 4711, 65535]) {
      const first = runMatchV2(a, b, seed, 180);
      expect(runMatchV2(a, b, seed, 180)).toEqual(first);
      for (const bot of [first.robotA, first.robotB]) {
        expect(bot.energy).toBeGreaterThanOrEqual(0);
        expect(bot.energy).toBeLessThanOrEqual(bot.definition.maxEnergy);
        expect(bot.structure).toBeGreaterThanOrEqual(0);
        expect(bot.structure).toBeLessThanOrEqual(bot.definition.maxStructure);
        expect(bot.position.x).toBeGreaterThanOrEqual(0);
        expect(bot.position.x).toBeLessThanOrEqual(first.width);
        expect(bot.position.y).toBeGreaterThanOrEqual(0);
        expect(bot.position.y).toBeLessThanOrEqual(first.height);
      }
      expect(first.outcome).not.toBe('active');
    }
  });

  it('is slot-symmetric for mirrored Raptor/Titan across eight seeds', () => {
    for (const seed of [1, 2, 3, 4, 5, 42, 4711, 65535]) {
      const left = runMatchV2(RAPTOR, TITAN, seed, 360);
      const right = runMatchV2(TITAN, RAPTOR, seed, 360);
      expect(left.outcome).toBe(right.outcome);
      expect(left.winner).toBe(right.winner);
      expect(left.tick).toBe(right.tick);
      expect(left.robotA.structure).toBeCloseTo(right.robotB.structure, 10);
      expect(left.robotB.structure).toBeCloseTo(right.robotA.structure, 10);
      expect(left.robotA.energy).toBeCloseTo(right.robotB.energy, 10);
      expect(left.robotB.energy).toBeCloseTo(right.robotA.energy, 10);
      expect(left.robotA.position.x).toBeCloseTo(100 - right.robotB.position.x, 10);
      expect(left.robotB.position.x).toBeCloseTo(100 - right.robotA.position.x, 10);
    }
  });

  it('preserves a terminal state and consumes no RNG after match end', () => {
    const initial = createMatch(a, b);
    initial.outcome = 'draw';
    initial.endReason = 'timeout';
    const rng = new SeededRandom(17);
    expect(stepMatchV2WithEvents(initial, rng)).toEqual({ state: initial, events: [] });
    expect(rng.next()).toBe(new SeededRandom(17).next());
  });
});
