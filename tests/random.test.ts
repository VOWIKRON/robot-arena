import { describe, expect, it } from 'vitest';
import { SeededRandom } from '../src/engine/random';

describe('SeededRandom', () => {
  it('produces the same sequence for the same seed', () => {
    const a = new SeededRandom(4711);
    const b = new SeededRandom(4711);
    expect([a.next(), a.next(), a.next()]).toEqual([b.next(), b.next(), b.next()]);
  });
});
