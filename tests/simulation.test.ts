import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { runMatch } from '../src/engine/simulation';

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
});
