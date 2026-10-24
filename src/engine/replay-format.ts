import type { MatchRecording } from './recorder';
import { deepFreeze } from './immutable';

export type ReplayDocument = MatchRecording & Readonly<{
  schemaVersion: 1;
  arena: Readonly<{ width: number; height: number }>;
}>;

type JsonObject = Record<string, unknown>;

function object(value: unknown, label: string): JsonObject {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label}: Objekt erwartet`);
  return value as JsonObject;
}
function finite(value: unknown, label: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error(`${label}: endliche Zahl erwartet`);
  return value;
}
function integer(value: unknown, label: string): number {
  const n = finite(value, label);
  if (!Number.isSafeInteger(n) || n < 0) throw new Error(`${label}: nichtnegative ganze Zahl erwartet`);
  return n;
}
function robotId(value: unknown, ids: readonly string[], label: string): string {
  if (typeof value !== 'string' || !ids.includes(value)) throw new Error(`${label}: unbekannte Roboter-ID`);
  return value;
}
function position(value: unknown, label: string): void {
  const pos = object(value, label);
  finite(pos.x, `${label}.x`);
  finite(pos.y, `${label}.y`);
}
function definition(value: unknown, label: string): JsonObject {
  const def = object(value, label);
  if (typeof def.id !== 'string' || !def.id.trim()) throw new Error(`${label}: ungültige Roboter-ID`);
  if (typeof def.name !== 'string') throw new Error(`${label}: Name fehlt`);
  if (!['aggressive', 'defensive', 'distance', 'melee'].includes(String(def.strategy))) throw new Error(`${label}: Strategie ungültig`);
  for (const key of ['maxStructure','maxEnergy','energyRegen','speed','sensorRange','weaponRange','weaponDamage','weaponEnergy','cooldownTicks']) finite(def[key], `${label}.${key}`);
  if (def.strategyParameters !== undefined) {
    const params = object(def.strategyParameters, `${label}.strategyParameters`);
    for (const [key, val] of Object.entries(params)) finite(val, `${label}.strategyParameters.${key}`);
  }
  return def;
}
function state(value: unknown, label: string, ids: readonly string[], arena: {width: number; height: number}): JsonObject {
  const match = object(value, label);
  integer(match.tick, `${label}.Tick`);
  if (finite(match.width, `${label}.Arena.width`) !== arena.width ||
      finite(match.height, `${label}.Arena.height`) !== arena.height) throw new Error(`${label}: Arena stimmt nicht überein`);
  for (const [side, id] of [['robotA', ids[0]], ['robotB', ids[1]]] as const) {
    const robot = object(match[side], `${label}.${side}`);
    const def = object(robot.definition, `${label}.${side}.definition`);
    if (def.id !== id) throw new Error(`${label}.${side}: Roboter-ID stimmt nicht überein`);
    position(robot.position, `${label}.${side}.position`);
    for (const key of ['structure', 'energy', 'cooldown']) finite(robot[key], `${label}.${side}.${key}`);
  }
  if (!['active','victory','draw'].includes(String(match.outcome))) throw new Error(`${label}: outcome ungültig`);
  if (match.winner !== null) robotId(match.winner, ids, `${label}.winner`);
  if (match.endReason !== null && !['destroyed','timeout'].includes(String(match.endReason))) throw new Error(`${label}: endReason ungültig`);
  return match;
}
function event(value: unknown, tick: number, ids: readonly string[]): void {
  const e = object(value, 'Event');
  if (integer(e.tick, 'Event-Tick') !== tick) throw new Error('Event-Tick stimmt nicht mit Frame-Tick überein');
  switch (e.type) {
    case 'move':
      robotId(e.robotId, ids, 'Event Roboter-ID');
      position(e.from, 'Event.from');
      position(e.to, 'Event.to');
      break;
    case 'shot':
      robotId(e.attackerId, ids, 'Event Angreifer Roboter-ID');
      robotId(e.targetId, ids, 'Event Ziel Roboter-ID');
      finite(e.energyCost, 'Event.energyCost');
      break;
    case 'hit':
      robotId(e.attackerId, ids, 'Event Angreifer Roboter-ID');
      robotId(e.targetId, ids, 'Event Ziel Roboter-ID');
      break;
    case 'damage':
      robotId(e.sourceId, ids, 'Event Quelle Roboter-ID');
      robotId(e.targetId, ids, 'Event Ziel Roboter-ID');
      finite(e.amount, 'Event.amount');
      break;
    case 'victory':
      robotId(e.winnerId, ids, 'Event Sieger Roboter-ID');
      robotId(e.loserId, ids, 'Event Verlierer Roboter-ID');
      break;
    default:
      throw new Error('Event-Typ unbekannt');
  }
}

function validate(value: unknown): ReplayDocument {
  const doc = object(value, 'Replay');
  if (doc.schemaVersion !== 1) throw new Error('schemaVersion nicht unterstützt (erwartet 1)');
  integer(doc.seed, 'Seed');
  const a = definition(doc.robotA, 'robotA'), b = definition(doc.robotB, 'robotB');
  if (a.id === b.id) throw new Error('Roboter-ID muss eindeutig sein');
  const ids = [a.id as string, b.id as string];
  const ar = object(doc.arena, 'Arena');
  const width = finite(ar.width, 'Arena.width'), height = finite(ar.height, 'Arena.height');
  if (width <= 0 || height <= 0) throw new Error('Arena muss positive Abmessungen haben');
  const arena = {width, height};
  const initial = state(doc.initialState, 'Startzustand', ids, arena);
  if (initial.tick !== 0 || initial.outcome !== 'active' || initial.winner !== null || initial.endReason !== null) throw new Error('Startzustand ungültig');
  if (!Array.isArray(doc.frames)) throw new Error('Frames müssen ein Array sein');
  for (let i = 0; i < doc.frames.length; i++) {
    const frame = object(doc.frames[i], `Frame ${i+1}`);
    if (integer(frame.tick, 'Frame-Tick') !== i + 1) throw new Error('Tick-Reihenfolge ungültig');
    if (!Array.isArray(frame.events)) throw new Error('Events müssen ein Array sein');
    for (const e of frame.events) event(e, i+1, ids);
  }
  const final = state(doc.finalState, 'Endzustand', ids, arena);
  if (final.tick !== doc.frames.length) throw new Error('Endzustand-Tick stimmt nicht mit Frames überein');
  if (final.outcome === 'victory' && final.endReason !== 'destroyed') throw new Error('Endzustand outcome/victory inkonsistent');
  if (final.outcome === 'draw' && final.endReason !== 'timeout') throw new Error('Endzustand outcome/draw inkonsistent');
  if (final.outcome === 'active' && (final.endReason !== null || final.winner !== null)) throw new Error('Endzustand outcome/active inkonsistent');
  return doc as unknown as ReplayDocument;
}

export function serializeReplay(recording: MatchRecording): string {
  const doc = {
    schemaVersion: 1,
    seed: recording.seed,
    arena: {width: recording.initialState.width, height: recording.initialState.height},
    robotA: recording.robotA,
    robotB: recording.robotB,
    initialState: recording.initialState,
    frames: recording.frames,
    finalState: recording.finalState
  };
  validate(doc);
  return JSON.stringify(doc);
}

export function parseReplay(json: string): ReplayDocument {
  let value: unknown;
  try { value = JSON.parse(json); }
  catch { throw new Error('Replay-JSON ungültig'); }
  return deepFreeze(validate(value));
}
