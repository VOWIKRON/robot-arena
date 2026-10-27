import type { CombatEvent } from './events';
import { deepFreeze } from './immutable';
import { SeededRandom } from './random';
import { createMatch } from './simulation';
import { SIMULTANEOUS_RULESET, stepMatchV2WithEvents } from './simulation-v2';
import { STRATEGY_TYPES, validateStrategyParameters } from './strategy-config';
import type { MatchState, RobotDefinition, RobotState } from './types';

/** NEXT-110 stage E: separate, opt-in v2 wire format. The v1 replay parser stays untouched. */
export type V2DrawEvent = Readonly<{ type: 'draw'; tick: number; reason: 'destroyed' | 'timeout' }>;
export type V2ReplayEvent = CombatEvent | V2DrawEvent;
export type V2ReplayFrame = Readonly<{ tick: number; events: readonly V2ReplayEvent[] }>;
export type ReplayDocumentV2 = Readonly<{
  schemaVersion: 2;
  rulesetVersion: typeof SIMULTANEOUS_RULESET;
  seed: number;
  arena: Readonly<{ width: number; height: number }>;
  robotA: RobotDefinition;
  robotB: RobotDefinition;
  initialState: MatchState;
  frames: readonly V2ReplayFrame[];
  finalState: MatchState;
}>;

const MAX_V2_REPLAY_BYTES = 2_000_000;
const MAX_V2_REPLAY_TICKS = 3600;

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function same(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (Array.isArray(a) || Array.isArray(b)) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
      a.every((entry, index) => same(entry, b[index]));
  }
  if (!record(a) || !record(b)) return false;
  const keys = Object.keys(a).sort();
  const other = Object.keys(b).sort();
  return keys.length === other.length && keys.every((key, index) =>
    key === other[index] && same(a[key], b[key]));
}
function assertRobot(value: unknown, label: string): asserts value is RobotDefinition {
  if (!record(value) || typeof value.id !== 'string' || !value.id.trim() ||
      typeof value.name !== 'string' ||
      !STRATEGY_TYPES.includes(value.strategy as typeof STRATEGY_TYPES[number])) {
    throw new Error(label + ': ungültige Roboterdefinition');
  }
  for (const key of ['maxStructure', 'maxEnergy', 'energyRegen', 'speed',
    'sensorRange', 'weaponRange', 'weaponDamage', 'weaponEnergy'] as const) {
    if (typeof value[key] !== 'number' || !Number.isFinite(value[key]) ||
        (value[key] as number) < (key === 'maxStructure' || key === 'maxEnergy' ? Number.EPSILON : 0)) {
      throw new Error(label + ': ungültige Roboterwerte');
    }
  }
  if (typeof value.cooldownTicks !== 'number' || !Number.isSafeInteger(value.cooldownTicks) ||
      value.cooldownTicks < 0) throw new Error(label + ': ungültige Abklingzeit');
  if (value.strategyParameters !== undefined) {
    if (!record(value.strategyParameters) ||
        Object.keys(value.strategyParameters).some(key => ![
          'energyReserveRatio', 'targetDistanceRatio', 'retreatStructureRatio',
          'retreatDistanceFactor'].includes(key)) ||
        validateStrategyParameters(value.strategyParameters).length > 0) {
      throw new Error(label + ': ungültige Strategieparameter');
    }
  }
}
function expectedFinal(doc: ReplayDocumentV2): MatchState {
  const rng = new SeededRandom(doc.seed);
  let state = createMatch(doc.robotA, doc.robotB);
  for (const [index, frame] of doc.frames.entries()) {
    if (!record(frame) || frame.tick !== index + 1 || !Array.isArray(frame.events) ||
        state.outcome !== 'active') throw new Error('v2-Replay: Tick-Reihenfolge ungültig');
    const result = stepMatchV2WithEvents(state, rng);
    state = result.state;
    const expected: V2ReplayEvent[] = [...result.events];
    if (state.outcome === 'draw' && state.endReason === 'destroyed') {
      expected.push({ type: 'draw', tick: state.tick, reason: 'destroyed' });
    } else if (index === doc.frames.length - 1 &&
               doc.finalState.outcome === 'draw' && doc.finalState.endReason === 'timeout' &&
               state.outcome === 'active') {
      expected.push({ type: 'draw', tick: state.tick, reason: 'timeout' });
    }
    if (!same(frame.events, expected)) throw new Error('v2-Replay: Eventfolge ungültig');
  }
  if (state.outcome === 'active' && doc.finalState.outcome === 'draw' &&
      doc.finalState.endReason === 'timeout') {
    state = { ...state, outcome: 'draw', winner: null, endReason: 'timeout' };
  }
  return state;
}
function validate(doc: unknown): ReplayDocumentV2 {
  if (!record(doc) || doc.schemaVersion !== 2 ||
      doc.rulesetVersion !== SIMULTANEOUS_RULESET) {
    throw new Error('v2-Replay: Schema- oder Regelversion nicht unterstützt');
  }
  const fields = ['schemaVersion', 'rulesetVersion', 'seed', 'arena', 'robotA',
    'robotB', 'initialState', 'frames', 'finalState'];
  if (!same(Object.keys(doc).sort(), fields.sort()) ||
      typeof doc.seed !== 'number' || !Number.isSafeInteger(doc.seed)) {
    throw new Error('v2-Replay: ungültige Felder oder Seed');
  }
  assertRobot(doc.robotA, 'robotA');
  assertRobot(doc.robotB, 'robotB');
  if (doc.robotA.id === doc.robotB.id) throw new Error('v2-Replay: Roboter-ID doppelt');
  if (!record(doc.arena) || doc.arena.width !== 100 || doc.arena.height !== 100) {
    throw new Error('v2-Replay: Arena ungültig');
  }
  if (!same(doc.initialState, createMatch(doc.robotA, doc.robotB))) {
    throw new Error('v2-Replay: Startzustand ungültig');
  }
  if (!Array.isArray(doc.frames) || doc.frames.length > MAX_V2_REPLAY_TICKS) {
    throw new Error('v2-Replay: Frame-Limit überschritten');
  }
  const typed = doc as unknown as ReplayDocumentV2;
  if (!same(typed.finalState, expectedFinal(typed))) {
    throw new Error('v2-Replay: Endzustand widerspricht der Eventfolge');
  }
  return typed;
}

/** Fully deterministic, isolated v2 recording. No mutation of legacy v1 recording. */
export function recordMatchV2(robotA: RobotDefinition, robotB: RobotDefinition,
  seed: number, maxTicks = 3600): ReplayDocumentV2 {
  if (!Number.isSafeInteger(seed) || !Number.isSafeInteger(maxTicks) ||
      maxTicks < 0 || maxTicks > MAX_V2_REPLAY_TICKS) {
    throw new RangeError('v2-Replay: Seed oder Ticklimit ungültig');
  }
  const initialState = createMatch(robotA, robotB);
  let state = initialState;
  const rng = new SeededRandom(seed);
  const frames: V2ReplayFrame[] = [];
  while (state.outcome === 'active' && state.tick < maxTicks) {
    const result = stepMatchV2WithEvents(state, rng);
    state = result.state;
    const events: V2ReplayEvent[] = [...result.events];
    if (state.outcome === 'draw' && state.endReason === 'destroyed') {
      events.push({ type: 'draw', tick: state.tick, reason: 'destroyed' });
    }
    frames.push({ tick: state.tick, events });
  }
  if (state.outcome === 'active' && state.tick >= maxTicks) {
    state = { ...state, outcome: 'draw', winner: null, endReason: 'timeout' };
    if (frames.length) {
      const last = frames[frames.length - 1]!;
      frames[frames.length - 1] = { tick: last.tick,
        events: [...last.events, { type: 'draw', tick: last.tick, reason: 'timeout' }] };
    }
  }
  return parseReplayV2(JSON.stringify({
    schemaVersion: 2, rulesetVersion: SIMULTANEOUS_RULESET, seed,
    arena: { width: initialState.width, height: initialState.height },
    robotA, robotB, initialState, frames, finalState: state
  }));
}

export function parseReplayV2(json: string): ReplayDocumentV2 {
  if (new TextEncoder().encode(json).length > MAX_V2_REPLAY_BYTES) {
    throw new Error('v2-Replay: Datei zu groß (2 MB)');
  }
  let value: unknown;
  try { value = JSON.parse(json); }
  catch { throw new Error('v2-Replay: JSON ungültig'); }
  return deepFreeze(validate(value));
}
export function serializeReplayV2(document: ReplayDocumentV2): string {
  const json = JSON.stringify(document);
  parseReplayV2(json);
  return json;
}

/** Event-only playback: no simulation, RNG or strategy evaluation during reconstruction. */
export function reconstructReplayStatesV2(document: ReplayDocumentV2): readonly MatchState[] {
  const states: MatchState[] = [deepFreeze(structuredClone(document.initialState))];
  if (!document.frames.length && document.finalState.outcome === 'draw') {
    states[0] = deepFreeze(structuredClone(document.finalState));
  }
  for (const frame of document.frames) {
    const next = structuredClone(states[states.length - 1]!);
    next.tick = frame.tick;
    for (const bot of [next.robotA, next.robotB]) {
      if (bot.structure > 0) {
        bot.energy = Math.min(bot.definition.maxEnergy, bot.energy + bot.definition.energyRegen);
        bot.cooldown = Math.max(0, bot.cooldown - 1);
      }
    }
    const robot = (id: string): RobotState =>
      id === next.robotA.definition.id ? next.robotA : next.robotB;
    for (const event of frame.events) {
      switch (event.type) {
        case 'move': robot(event.robotId).position = { ...event.to }; break;
        case 'shot': {
          const attacker = robot(event.attackerId);
          attacker.energy -= event.energyCost;
          attacker.cooldown = attacker.definition.cooldownTicks;
          break;
        }
        case 'damage': {
          const target = robot(event.targetId);
          target.structure = Math.max(0, target.structure - event.amount);
          break;
        }
        case 'victory':
          next.winner = event.winnerId;
          next.outcome = 'victory';
          next.endReason = 'destroyed';
          break;
        case 'draw':
          next.winner = null;
          next.outcome = 'draw';
          next.endReason = event.reason;
          break;
        case 'hit': break;
      }
    }
    states.push(deepFreeze(next));
  }
  return Object.freeze(states);
}
