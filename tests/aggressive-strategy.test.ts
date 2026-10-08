import { it, expect } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { createMatch, stepMatch } from '../src/engine/simulation';
import { SeededRandom } from '../src/engine/random';

it('NEXT-35: aggressive strategy approaches beyond legacy stopping distance', () => {
  const state = createMatch(RAPTOR, { ...TITAN, speed: 0, energyRegen: 0 });
  state.robotA.position = { x: 40, y: 50 };
  state.robotB.position = { x: 40 + RAPTOR.weaponRange * 0.7, y: 50 };
  state.robotB.energy = 0;
  state.robotA.cooldown = 99;
  state.robotB.cooldown = 99;
  const result = stepMatch(state, new SeededRandom(4711));
  expect(result.robotA.position.x).toBeGreaterThan(40);
  expect(state.robotA.position.x).toBe(40);
});
