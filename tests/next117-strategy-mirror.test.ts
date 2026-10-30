import { describe, expect, it } from 'vitest';
import { RAPTOR } from '../src/engine/presets';
import { createMatch } from '../src/engine/simulation';
import { movementDelta } from '../src/engine/strategies';

describe('NEXT-117-B side-neutral strategy decision regression (not a full fairness claim)', () => {
  it.each(['aggressive', 'defensive', 'distance', 'melee', 'adaptive'] as const)(
    'mirrored identical %s robots request identical movement from either start slot', strategy => {
      const definition = { ...RAPTOR, strategy };
      const state = createMatch(definition, { ...definition, id: 'raptor-b' });
      const distance = Math.hypot(
        state.robotA.position.x - state.robotB.position.x,
        state.robotA.position.y - state.robotB.position.y
      );
      const before = structuredClone(state);
      expect(movementDelta(state.robotA, state.robotB, distance))
        .toBe(movementDelta(state.robotB, state.robotA, distance));
      expect(state).toEqual(before);
    }
  );

  it('mirrored damaged adaptive robots choose equal retreat at the same separation', () => {
    const definition = { ...RAPTOR, strategy: 'adaptive' as const };
    const state = createMatch(definition, { ...definition, id: 'raptor-b' });
    state.robotA.structure = definition.maxStructure * 0.5;
    state.robotB.structure = definition.maxStructure * 0.5;
    const a = movementDelta(state.robotA, state.robotB, 10);
    const b = movementDelta(state.robotB, state.robotA, 10);
    expect(a).toBe(b);
    expect(a).toBeLessThan(0);
  });

  it('mirrored healthy strategies stay deterministic across repeated decisions', () => {
    const definition = { ...RAPTOR, strategy: 'adaptive' as const };
    const state = createMatch(definition, { ...definition, id: 'raptor-b' });
    const original = structuredClone(state);
    const decisions = Array.from({ length: 8 }, () => [
      movementDelta(state.robotA, state.robotB, 25),
      movementDelta(state.robotB, state.robotA, 25)
    ]);
    for (const pair of decisions) expect(pair).toEqual(decisions[0]);
    expect(state).toEqual(original);
  });
});
