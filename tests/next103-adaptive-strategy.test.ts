import { describe, expect, it } from 'vitest';
import { buildRobotDefinition } from '../src/engine/components';
import { RAPTOR, TITAN, RAPTOR_CHASSIS, RAPTOR_WEAPON, BALANCED_MOTOR, STANDARD_ARMOR, STANDARD_ENERGY, STANDARD_SENSOR } from '../src/engine/presets';
import { createMatch, runMatch, stepMatchWithEvents } from '../src/engine/simulation';
import { adaptiveRetreatRequired, movementDelta } from '../src/engine/strategies';
import { SeededRandom } from '../src/engine/random';
import { createRobotPreset, parseRobotPreset } from '../src/engine/robot-preset-format';
import { createTournamentDefinition, serializeTournamentDefinition, parseTournamentDefinition } from '../src/engine/tournament-model';

function setup(distance: number, structure = 100, energy = 100) {
  const state = createMatch(
    { ...RAPTOR, strategy: 'adaptive', maxStructure: 100, maxEnergy: 100, weaponRange: 20, speed: 5 },
    { ...TITAN, weaponRange: 20, speed: 0, weaponDamage: 0 }
  );
  state.robotA.position = { x: 40, y: 50 };
  state.robotB.position = { x: 40 + distance, y: 50 };
  state.robotA.structure = structure;
  state.robotA.energy = energy;
  return state;
}
const next = (state: ReturnType<typeof setup>) => stepMatchWithEvents(state, new SeededRandom(4711));

describe('NEXT-103 adaptive strategy deterministic behavior', () => {
  it.each([
    { distance: 30, structure: 100, energy: 100, expected: 45, label: 'healthy approach' },
    { distance: 10, structure: 100, energy: 100, expected: 40, label: 'healthy no unnecessary retreat' },
    { distance: 10, structure: 70, energy: 100, expected: 35, label: 'damaged retreat' },
    { distance: 10, structure: 100, energy: 0, expected: 35, label: 'energy-starved retreat' },
    { distance: 30, structure: 70, energy: 100, expected: 40, label: 'damaged no pursuit' },
    { distance: 30, structure: 100, energy: 0, expected: 40, label: 'energy-starved no pursuit' }
  ])('$label is a distinct tactical response', ({distance, structure, energy, expected}) => {
    const state = setup(distance, structure, energy);
    const before = structuredClone(state);
    expect(next(state).state.robotA.position.x).toBe(expected);
    expect(state).toEqual(before);
  });

  it('contrasts healthy aggressive, defensive and adaptive movement at the same position', () => {
    const base = setup(10);
    const positions = (strategy: 'aggressive'|'defensive'|'adaptive') => {
      const state = structuredClone(base);
      state.robotA.definition = { ...state.robotA.definition, strategy };
      return next(state).state.robotA.position.x;
    };
    expect(positions('aggressive')).toBe(40);
    expect(positions('defensive')).toBe(35);
    expect(positions('adaptive')).toBe(40);
    const wounded = setup(10, 50);
    expect(next(wounded).state.robotA.position.x).toBe(35);
    expect(next({ ...wounded, robotA: { ...wounded.robotA, structure: 100 } }).state.robotA.position.x).toBe(40);
  });

  it('respects configurable retreat threshold, enemy weapon reach, and own firing margin', () => {
    const state = setup(10, 55);
    state.robotA.definition = {
      ...state.robotA.definition, weaponRange: 40,
      strategyParameters: { retreatStructureRatio: 0.5, retreatDistanceFactor: 1.5 }
    };
    state.robotB.definition = { ...state.robotB.definition, weaponRange: 30 };
    expect(adaptiveRetreatRequired(state.robotA)).toBe(false);
    expect(next(state).state.robotA.position.x).toBe(40);
    state.robotA.structure = 50;
    expect(adaptiveRetreatRequired(state.robotA)).toBe(true);
    expect(next(state).state.robotA.position.x).toBe(35);
    state.robotA.position = { x: 0, y: 50 };
    state.robotB.position = { x: 1, y: 50 };
    expect(next(state).state.robotA.position).toEqual({ x: 0, y: 50 });
    expect(movementDelta(state.robotA, state.robotB, 10)).toBe(-5);
  });

  it('preserves shooting cooldown and energy rules while changing movement', () => {
    const state = setup(10, 50, 100);
    state.robotA.cooldown = 3;
    const result = next(state);
    expect(result.state.robotA.position.x).toBe(35);
    expect(result.events.some(e => e.type === 'shot' && e.attackerId === RAPTOR.id)).toBe(false);
    const noEnergy = next(setup(10, 100, 0));
    expect(noEnergy.state.robotA.energy).toBeGreaterThan(0);
    expect(noEnergy.events.some(e => e.type === 'shot' && e.attackerId === RAPTOR.id)).toBe(false);
  });

  it.each([1, 12, 4711])('replays adaptive-vs-aggressive and adaptive-vs-defensive exactly with seed %i', seed => {
    for (const opponent of ['aggressive', 'defensive'] as const) {
      const a = { ...RAPTOR, strategy: 'adaptive' as const };
      const b = { ...TITAN, strategy: opponent };
      const first = runMatch(a, b, seed, 500);
      expect(first).toEqual(runMatch(a, b, seed, 500));
      expect(first.tick).toBeGreaterThan(0);
      expect(first.robotA.position.x).toBeGreaterThanOrEqual(0);
      expect(first.robotA.position.x).toBeLessThanOrEqual(100);
    }
  });

  it('supports adaptive robot presets and tournament archive roundtrips', () => {
    const configuration = {
      id: 'adaptive-test', name: 'Adaptive', chassis: RAPTOR_CHASSIS,
      motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY,
      sensor: STANDARD_SENSOR, weapon: RAPTOR_WEAPON,
      strategy: 'adaptive' as const,
      strategyParameters: { targetDistanceRatio: 0.75, retreatStructureRatio: 0.6, retreatDistanceFactor: 1.2 }
    };
    const preset = createRobotPreset(configuration);
    expect(parseRobotPreset(preset).strategy).toBe('adaptive');
    const tournament = createTournamentDefinition({
      schemaVersion: 1, id: 'next103', format: 'round-robin', baseSeed: 4711,
      maxTicks: 100, participants: [buildRobotDefinition(configuration), TITAN]
    });
    const restored = parseTournamentDefinition(serializeTournamentDefinition(tournament));
    expect(restored).toEqual(tournament);
    expect(restored.participants[0].strategy).toBe('adaptive');
  });
});
