import { describe, expect, it } from 'vitest';
import { buildRobotDefinition } from '../src/engine/components';
import { RAPTOR, TITAN, RAPTOR_CHASSIS, RAPTOR_WEAPON, BALANCED_MOTOR, STANDARD_ARMOR, STANDARD_ENERGY, STANDARD_SENSOR } from '../src/engine/presets';
import { SeededRandom } from '../src/engine/random';
import { createMatch, stepMatchWithEvents } from '../src/engine/simulation';
import { strategyParameters, STRATEGY_TYPES, validateStrategyParameters } from '../src/engine/strategy-config';

const reserveRobot = (ratio: number, regen = 0) => ({
  ...RAPTOR, maxEnergy: 100, energyRegen: regen, weaponEnergy: 20,
  weaponDamage: 0, speed: 0, strategyParameters: { energyReserveRatio: ratio }
});
function scenario(ratio: number, energy: number, regen = 0) {
  const state = createMatch(reserveRobot(ratio, regen), { ...TITAN, speed: 0, weaponDamage: 0 });
  state.robotA.position = { x: 40, y: 50 };
  state.robotB.position = { x: 50, y: 50 };
  state.robotA.energy = energy;
  state.robotB.cooldown = 100;
  return state;
}
const step = (state: ReturnType<typeof scenario>, seed = 4711) => stepMatchWithEvents(state, new SeededRandom(seed));
const shotA = (result: ReturnType<typeof step>) => result.events.some(e => e.type === 'shot' && e.attackerId === RAPTOR.id);

describe('NEXT-40 energy reserve (unreleased)', () => {
  it.each(STRATEGY_TYPES)('%s defaults to zero reserve without changing existing shots', strategy => {
    expect(strategyParameters(strategy).energyReserveRatio).toBe(0);
    const state = scenario(0, 20);
    state.robotA.definition = { ...state.robotA.definition, strategy };
    expect(shotA(step(state))).toBe(true);
  });
  it.each([0, 0.5, 1])('accepts boundary reserve ratio %s', ratio => {
    expect(validateStrategyParameters({ energyReserveRatio: ratio })).toEqual([]);
  });
  it.each([-0.01, 1.01, NaN, Infinity, -Infinity])('rejects invalid reserve ratio %s', ratio => {
    expect(validateStrategyParameters({ energyReserveRatio: ratio })).toContain('Energiereserve muss zwischen 0 und 100 % liegen');
  });
  it('rejects invalid reserve at builder boundary and copies a valid override', () => {
    const configuration = { id: 'a', name: 'A', chassis: RAPTOR_CHASSIS, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR, weapon: RAPTOR_WEAPON };
    expect(() => buildRobotDefinition({ ...configuration, strategyParameters: { energyReserveRatio: 1.01 } })).toThrow('Ungültige');
    const parameters = { energyReserveRatio: 0.4 };
    const robot = buildRobotDefinition({ ...configuration, strategyParameters: parameters });
    parameters.energyReserveRatio = 0.9;
    expect(robot.strategyParameters?.energyReserveRatio).toBe(0.4);
    expect(JSON.parse(JSON.stringify(robot))).toEqual(robot);
  });
  it('spends energy at exactly the reserve boundary but not one point below', () => {
    const at = scenario(0.8, 100);
    const snapshot = structuredClone(at);
    const result = step(at);
    expect(shotA(result)).toBe(true);
    expect(result.state.robotA.energy).toBe(80);
    expect(at).toEqual(snapshot);
    const below = step(scenario(0.8, 99));
    expect(shotA(below)).toBe(false);
    expect(below.state.robotA.energy).toBe(99);
  });
  it('zero reserve preserves legacy firing; 100 percent blocks positive-cost weapons', () => {
    expect(shotA(step(scenario(0, 20)))).toBe(true);
    expect(shotA(step(scenario(1, 100)))).toBe(false);
    expect(step(scenario(1, 100)).state.robotA.energy).toBe(100);
  });
  it('regenerates before evaluating the reserve and clamps energy to maximum', () => {
    expect(shotA(step(scenario(0.8, 98, 2)))).toBe(true);
    expect(step(scenario(0.8, 98, 2)).state.robotA.energy).toBe(80);
    expect(shotA(step(scenario(0.8, 98, 1)))).toBe(false);
    expect(step(scenario(1, 99, 3)).state.robotA.energy).toBe(100);
  });
  it('keeps A and B reserves independent', () => {
    const state = createMatch(reserveRobot(1), { ...TITAN, maxEnergy: 100, energyRegen: 0, weaponEnergy: 20, weaponDamage: 0, speed: 0, strategyParameters: { energyReserveRatio: 0 } });
    state.robotA.position = { x: 40, y: 50 }; state.robotB.position = { x: 50, y: 50 };
    const result = stepMatchWithEvents(state, new SeededRandom(12));
    expect(result.events.filter(e => e.type === 'shot').map(e => e.attackerId)).toEqual([TITAN.id]);
    expect(result.state.robotA.energy).toBe(100);
    expect(result.state.robotB.energy).toBe(80);
  });
  it.each([0, 0.4, 0.8, 1])('same seed and reserve %s reproduce state and event streams', ratio => {
    const initial = scenario(ratio, 100, 2);
    const simulate = () => {
      let state = structuredClone(initial);
      const rng = new SeededRandom(4711);
      const stream = [];
      for (let i = 0; i < 50; i++) {
        const result = stepMatchWithEvents(state, rng);
        state = result.state; stream.push(result.events);
      }
      return { state, stream };
    };
    expect(simulate()).toEqual(simulate());
    expect(initial.robotA.energy).toBe(100);
  });
});
