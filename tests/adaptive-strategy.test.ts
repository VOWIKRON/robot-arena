import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { SeededRandom } from '../src/engine/random';
import { createMatch, runMatch, stepMatchWithEvents } from '../src/engine/simulation';
import { movementDelta } from '../src/engine/strategies';
import { buildRobotDefinition } from '../src/engine/components';
import { RAPTOR_CHASSIS, BALANCED_MOTOR, STANDARD_ARMOR, STANDARD_ENERGY, STANDARD_SENSOR, RAPTOR_WEAPON } from '../src/engine/presets';
import { createTournamentDefinition, parseTournamentDefinition, serializeTournamentDefinition } from '../src/engine/tournament-model';
import { createRobotPreset, parseRobotPreset } from '../src/engine/robot-preset-format';
import { strategyDigest } from './strategy-digest';
import type { StrategyType } from '../src/engine/strategy-config';
import type { MatchState } from '../src/engine/types';
import type { CombatEvent } from '../src/engine/events';

function scenario(strategy: StrategyType, distance: number, structure = 100, energy = 100): MatchState {
  const state = createMatch(
    { ...RAPTOR, strategy, maxStructure: 100, weaponRange: 20, speed: 5 },
    { ...TITAN, speed: 0, weaponDamage: 0, weaponRange: 20 }
  );
  state.robotA.position = { x: 40, y: 50 };
  state.robotB.position = { x: 40 + distance, y: 50 };
  state.robotA.structure = structure;
  state.robotA.energy = energy;
  return state;
}

function step(state: MatchState) {
  return stepMatchWithEvents(state, new SeededRandom(4711));
}

describe('NEXT-103 adaptive strategy behavioral acceptance', () => {
  it('stays aggressive while healthy, retreats below structure threshold, and stops chasing while wounded', () => {
    expect(step(scenario('adaptive', 10, 100)).state.robotA.position.x).toBe(40);
    expect(step(scenario('adaptive', 10, 71)).state.robotA.position.x).toBe(40);
    expect(step(scenario('adaptive', 10, 70)).state.robotA.position.x).toBe(35);
    expect(step(scenario('adaptive', 30, 70)).state.robotA.position.x).toBe(40);
    expect(step(scenario('adaptive', 30, 71)).state.robotA.position.x).toBe(45);
  });

  it('responds to insufficient energy and a ready longer-range enemy without changing the legacy strategies', () => {
    expect(step(scenario('adaptive', 10, 100, 0)).state.robotA.position.x).toBe(35);
    expect(step(scenario('adaptive', 30, 100, 0)).state.robotA.position.x).toBe(40);
    expect(step(scenario('aggressive', 10, 70, 0)).state.robotA.position.x).toBe(40);
    expect(step(scenario('defensive', 10, 100)).state.robotA.position.x).toBe(35);

    const threatened = scenario('adaptive', 10);
    threatened.robotB.definition = { ...threatened.robotB.definition, weaponRange: 30 };
    expect(step(threatened).state.robotA.position.x).toBe(35);
    threatened.robotB.cooldown = 2;
    expect(step(threatened).state.robotA.position.x).toBe(40);
  });

  it('honors custom threshold, safety distance and target ratio and does not mutate inputs', () => {
    const state = scenario('adaptive', 10, 60);
    state.robotA.definition = {
      ...state.robotA.definition,
      weaponRange: 40,
      strategyParameters: { retreatStructureRatio: 0.6, retreatDistanceFactor: 1.5, targetDistanceRatio: 0.5 }
    };
    const original = structuredClone(state);
    expect(step(state).state.robotA.position.x).toBe(35);
    expect(state).toEqual(original);
    state.robotA.structure = 61;
    expect(step(state).state.robotA.position.x).toBe(40);
    state.robotB.position = { x: 80, y: 50 };
    expect(step(state).state.robotA.position.x).toBe(45);
  });

  it('fires while retreating when in range and retains energy/cooldown constraints', () => {
    const state = scenario('adaptive', 10, 60);
    const result = step(state);
    expect(result.state.robotA.position.x).toBe(35);
    expect(result.events.slice(0, 4).map(e => e.type)).toEqual(['move', 'shot', 'hit', 'damage']);
    const cooldown = scenario('adaptive', 10, 60);
    cooldown.robotA.cooldown = 2;
    expect(step(cooldown).events.some(e => e.type === 'shot' && e.attackerId === RAPTOR.id)).toBe(false);
  });

  it.each([0, 1, 12, 4711])('replays the same events and state at seed %i, preserving arena and energy bounds', seed => {
    const play = () => {
      let state = createMatch({ ...RAPTOR, strategy: 'adaptive' }, { ...TITAN, strategy: 'defensive' });
      const rng = new SeededRandom(seed);
      const events: CombatEvent[] = [];
      for (let i = 0; i < 300 && state.outcome === 'active'; i++) {
        const result = stepMatchWithEvents(state, rng);
        state = result.state;
        events.push(...result.events);
        for (const robot of [state.robotA, state.robotB]) {
          expect(robot.position.x).toBeGreaterThanOrEqual(0);
          expect(robot.position.x).toBeLessThanOrEqual(state.width);
          expect(robot.position.y).toBeGreaterThanOrEqual(0);
          expect(robot.position.y).toBeLessThanOrEqual(state.height);
          expect(robot.energy).toBeGreaterThanOrEqual(0);
          expect(robot.energy).toBeLessThanOrEqual(robot.definition.maxEnergy);
        }
      }
      return { state, events };
    };
    const first = play();
    expect(first).toEqual(play());
    expect(strategyDigest(first.state, first.events)).toBe(strategyDigest(play().state, play().events));
  });

  it('handles zero speed, overlap and edge without phantom moves', () => {
    const state = scenario('adaptive', 0, 50);
    state.robotA.position = { x: 0, y: 50 };
    state.robotB.position = { x: 0, y: 50 };
    expect(step(state).state.robotA.position.x).toBe(5);
    state.robotA.definition = { ...state.robotA.definition, speed: 0 };
    expect(movementDelta(state.robotA, state.robotB, 0)).toBe(0);
    expect(step(state).state.robotA.position).toEqual(state.robotA.position);
  });

  it('round-trips adaptive through robot presets and tournament archives', () => {
    const config = {
      id: 'adaptive', name: 'Adaptive', chassis: RAPTOR_CHASSIS, motor: BALANCED_MOTOR,
      armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR,
      weapon: RAPTOR_WEAPON, strategy: 'adaptive' as const,
      strategyParameters: { targetDistanceRatio: 0.6, retreatStructureRatio: 0.55, retreatDistanceFactor: 1.25 }
    };
    const preset = createRobotPreset(config);
    expect(parseRobotPreset(JSON.parse(JSON.stringify(preset)))).toEqual(config);
    const robot = buildRobotDefinition(config);
    const tournament = createTournamentDefinition({
      schemaVersion: 1, id: 'adaptive-roundtrip', format: 'round-robin',
      baseSeed: 4711, maxTicks: 250, participants: [robot, TITAN]
    });
    expect(parseTournamentDefinition(serializeTournamentDefinition(tournament))).toEqual(tournament);
    expect(runMatch(robot, TITAN, 4711, 250)).toEqual(runMatch(robot, TITAN, 4711, 250));
  });
});
