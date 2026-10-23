import { describe, expect, it } from 'vitest';
import { buildRobotDefinition } from '../src/engine/components';
import { strategyParameters, validateStrategyParameters, STRATEGY_TYPES } from '../src/engine/strategy-config';
import { RAPTOR, TITAN, RAPTOR_CHASSIS, RAPTOR_WEAPON, BALANCED_MOTOR, STANDARD_ARMOR, STANDARD_ENERGY, STANDARD_SENSOR } from '../src/engine/presets';
import { createMatch, stepMatchWithEvents } from '../src/engine/simulation';
import { SeededRandom } from '../src/engine/random';

const configuration = { id: 'a', name: 'A', chassis: RAPTOR_CHASSIS, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR, weapon: RAPTOR_WEAPON };

describe('strategy parameters', () => {
  it.each(STRATEGY_TYPES)('%s resolves stable defaults without modifying overrides', strategy => {
    const overrides = {};
    expect(strategyParameters(strategy, overrides).targetDistanceRatio).toBe(strategy === 'distance' ? 0.9 : strategy === 'melee' ? 0.2 : 0.8);
    expect(strategyParameters(strategy, overrides).retreatStructureRatio).toBe(0.35);
    expect(overrides).toEqual({});
  });
  it.each([
    { targetDistanceRatio: -0.01 }, { targetDistanceRatio: 1.01 }, { targetDistanceRatio: NaN }, { targetDistanceRatio: Infinity },
    { retreatStructureRatio: -0.01 }, { retreatStructureRatio: 1.01 }, { retreatStructureRatio: NaN },
    { retreatDistanceFactor: 0.99 }, { retreatDistanceFactor: 2.01 }, { retreatDistanceFactor: Infinity }
  ])('rejects invalid parameters %j at the builder boundary', parameters => {
    expect(validateStrategyParameters(parameters)).not.toHaveLength(0);
    expect(() => buildRobotDefinition({ ...configuration, strategyParameters: parameters })).toThrow('Ungültige');
  });
  it.each([0,1])('accepts target and structure boundaries %i', value => {
    expect(validateStrategyParameters({ targetDistanceRatio: value, retreatStructureRatio: value })).toEqual([]);
  });
  it.each([1,2])('accepts retreat factor boundary %i', value => {
    expect(validateStrategyParameters({ retreatDistanceFactor: value })).toEqual([]);
  });
  it('copies and serializes parameter overrides instead of sharing caller data', () => {
    const overrides = { targetDistanceRatio: 0.6 };
    const robot = buildRobotDefinition({...configuration, strategy: 'distance', strategyParameters: overrides});
    overrides.targetDistanceRatio = 0.2;
    expect(robot.strategyParameters?.targetDistanceRatio).toBe(0.6);
    expect(JSON.parse(JSON.stringify(robot))).toEqual(robot);
  });
  it.each([0,0.5,1])('custom distance ratio %s changes the actual engine target', ratio => {
    const state = createMatch({...RAPTOR, strategy:'distance', speed:100, weaponRange:20, strategyParameters:{targetDistanceRatio:ratio}}, {...TITAN,speed:0,weaponDamage:0});
    state.robotA.position={x:10,y:50};state.robotB.position={x:40,y:50};
    const snapshot=structuredClone(state);
    const result=stepMatchWithEvents(state,new SeededRandom(4711));
    expect(result.state.robotA.position.x).toBe(40-20*ratio);
    expect(state).toEqual(snapshot);
  });
  it('custom defensive threshold and safety distance affect retreat together', () => {
    const state=createMatch({...RAPTOR,maxStructure:100,strategy:'defensive',weaponRange:20,speed:100,strategyParameters:{retreatStructureRatio:0.6,retreatDistanceFactor:1.5}}, {...TITAN,speed:0,weaponRange:20,weaponDamage:0});
    state.robotA.structure=60;state.robotA.position={x:40,y:50};state.robotB.position={x:60,y:50};
    expect(stepMatchWithEvents(state,new SeededRandom(12)).state.robotA.position.x).toBe(30);
    state.robotA.structure=61;
    expect(stepMatchWithEvents(state,new SeededRandom(12)).state.robotA.position.x).toBe(44);
  });
});


it('keeps the combined 100 % aggressive / 0 % melee UI scenario reproducible', () => {
  let state = createMatch({...RAPTOR, strategy:'aggressive', strategyParameters:{targetDistanceRatio:1}}, {...TITAN, strategy:'melee', strategyParameters:{targetDistanceRatio:0}});
  const rng = new SeededRandom(4711);
  for (let i=0;i<54;i++) state=stepMatchWithEvents(state,rng).state;
  expect(state.outcome).toBe('active');
  expect(state.robotA.position.x).toBeCloseTo(42.6, 9);
  expect(state.robotB.position).toEqual(state.robotA.position);
});
