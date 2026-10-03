import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { createMatch, runMatch, stepMatch } from '../src/engine/simulation';
import { SeededRandom } from '../src/engine/random';

const distance = (
  a: { x: number; y: number },
  b: { x: number; y: number }
): number => Math.hypot(a.x - b.x, a.y - b.y);

describe('simulation', () => {
  it('is deterministic for identical input', () => {
    expect(runMatch(RAPTOR, TITAN, 4711)).toEqual(runMatch(RAPTOR, TITAN, 4711));
  });

  it('finishes without invalid numeric state', () => {
    const result = runMatch(RAPTOR, TITAN, 12);
    expect(Number.isFinite(result.robotA.structure)).toBe(true);
    expect(Number.isFinite(result.robotB.structure)).toBe(true);
    expect(result.tick).toBeLessThanOrEqual(3600);
  });

  it('creates a match with stable initial state', () => {
    const state = createMatch(RAPTOR, TITAN);

    expect(state.tick).toBe(0);
    expect(state.winner).toBeNull();
    expect(state.width).toBe(100);
    expect(state.height).toBe(100);
    expect(state.robotA.position).toEqual({ x: 15, y: 50 });
    expect(state.robotB.position).toEqual({ x: 85, y: 50 });
    expect(state.robotA.structure).toBe(RAPTOR.maxStructure);
    expect(state.robotB.structure).toBe(TITAN.maxStructure);
    expect(state.robotA.energy).toBe(RAPTOR.maxEnergy);
    expect(state.robotB.energy).toBe(TITAN.maxEnergy);
  });

  it('increments exactly one tick per simulation step', () => {
    const state = createMatch(RAPTOR, TITAN);
    const next = stepMatch(state, new SeededRandom(4711));

    expect(next.tick).toBe(1);
  });

  it('does not mutate the input match state', () => {
    const state = createMatch(RAPTOR, TITAN);
    const snapshot = structuredClone(state);

    stepMatch(state, new SeededRandom(4711));

    expect(state).toEqual(snapshot);
  });

  it('moves robots closer while they are outside desired combat distance', () => {
    const state = createMatch(RAPTOR, TITAN);
    const before = distance(state.robotA.position, state.robotB.position);
    const next = stepMatch(state, new SeededRandom(4711));
    const after = distance(next.robotA.position, next.robotB.position);

    expect(after).toBeLessThan(before);
  });

  it('keeps energy within zero and configured maximum', () => {
    let state = createMatch(RAPTOR, TITAN);
    const rng = new SeededRandom(4711);

    for (let i = 0; i < 200 && !state.winner; i += 1) {
      state = stepMatch(state, rng);
      expect(state.robotA.energy).toBeGreaterThanOrEqual(0);
      expect(state.robotA.energy).toBeLessThanOrEqual(RAPTOR.maxEnergy);
      expect(state.robotB.energy).toBeGreaterThanOrEqual(0);
      expect(state.robotB.energy).toBeLessThanOrEqual(TITAN.maxEnergy);
    }
  });

  it('never increases structure during combat', () => {
    let state = createMatch(RAPTOR, TITAN);
    const rng = new SeededRandom(4711);
    let previousA = state.robotA.structure;
    let previousB = state.robotB.structure;

    for (let i = 0; i < 200 && !state.winner; i += 1) {
      state = stepMatch(state, rng);
      expect(state.robotA.structure).toBeLessThanOrEqual(previousA);
      expect(state.robotB.structure).toBeLessThanOrEqual(previousB);
      previousA = state.robotA.structure;
      previousB = state.robotB.structure;
    }
  });

  it('freezes an already finished match', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.winner = RAPTOR.id;
    const next = stepMatch(state, new SeededRandom(4711));

    expect(next).toBe(state);
    expect(next.tick).toBe(0);
  });
});
