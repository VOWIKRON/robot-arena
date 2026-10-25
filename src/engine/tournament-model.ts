import { deepFreeze } from './immutable';
import { assertSafeTournamentInput } from './tournament-input-guard';
import { STRATEGY_TYPES, validateStrategyParameters } from './strategy-config';
import type { RobotDefinition } from './types';

export type TournamentFormat = 'round-robin' | 'knockout';
export type TournamentDefinition = Readonly<{
  schemaVersion: 1;
  id: string;
  format: TournamentFormat;
  /** Omitted means the historical fixture orientation, preserving old archives. */
  sideAssignment?: 'balanced';
  baseSeed: number;
  maxTicks: number;
  participants: readonly RobotDefinition[];
}>;

function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label}: Objekt erwartet`);
  return value as Record<string, unknown>;
}
function nonempty(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label}: Text fehlt`);
  return value;
}
function number(value: unknown, label: string, min: number, strict = false): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || (strict ? value <= min : value < min)) {
    throw new Error(`${label}: ungültige Zahl`);
  }
  return value;
}
function integer(value: unknown, label: string, min: number, max = Number.MAX_SAFE_INTEGER): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < min || value > max) {
    throw new Error(`${label}: ungültige ganze Zahl`);
  }
  return value;
}
function robot(value: unknown, index: number): RobotDefinition {
  const label = `Teilnehmer ${index + 1}`;
  const r = record(value, label);
  nonempty(r.id, `${label}.id`);
  nonempty(r.name, `${label}.name`);
  if (!STRATEGY_TYPES.includes(r.strategy as typeof STRATEGY_TYPES[number])) {
    throw new Error(`${label}: unbekannte Strategie`);
  }
  for (const key of ['maxStructure', 'maxEnergy'] as const) number(r[key], `${label}.${key}`, 0, true);
  for (const key of ['energyRegen', 'speed', 'sensorRange', 'weaponRange', 'weaponDamage', 'weaponEnergy'] as const) {
    number(r[key], `${label}.${key}`, 0);
  }
  integer(r.cooldownTicks, `${label}.cooldownTicks`, 0);
  if (r.strategyParameters !== undefined) {
    const params = record(r.strategyParameters, `${label}.strategyParameters`);
    const allowed = ['energyReserveRatio', 'targetDistanceRatio', 'retreatStructureRatio', 'retreatDistanceFactor'];
    if (Object.keys(params).some(key => !allowed.includes(key))) throw new Error(`${label}: unbekannter Strategieparameter`);
    const errors = validateStrategyParameters(params as unknown as Parameters<typeof validateStrategyParameters>[0]);
    if (errors.length) throw new Error(`${label}: ${errors.join(', ')}`);
  }
  return r as unknown as RobotDefinition;
}

/** Validate, clone and freeze tournament input. Does not run any simulation or consume RNG. */
export function createTournamentDefinition(input: unknown): TournamentDefinition {
  assertSafeTournamentInput(input);
  const t = record(input, 'Turnier');
  if (t.schemaVersion !== 1) throw new Error('Turnier: schemaVersion 1 erwartet');
  nonempty(t.id, 'Turnier-ID');
  if (t.format !== 'round-robin' && t.format !== 'knockout') throw new Error('Turnierformat ungültig');
  if (t.sideAssignment !== undefined && t.sideAssignment !== 'balanced') throw new Error('Turnier: ungültige Seitenzuordnung');
  if (t.sideAssignment === 'balanced' && t.format !== 'round-robin') throw new Error('Turnier: Seitenbalance nur für Round Robin');
  integer(t.baseSeed, 'Turnier-Seed', 0);
  integer(t.maxTicks, 'Turnier-maxTicks', 1, 3600);
  if (!Array.isArray(t.participants) || t.participants.length < 2 || t.participants.length > 16) {
    throw new Error('Turnier: 2 bis 16 Teilnehmer erforderlich');
  }
  const participants = t.participants.map((value: unknown, index: number) => robot(value, index));
  const ids = participants.map(participant => participant.id);
  if (new Set(ids).size !== ids.length) throw new Error('Turnier: doppelte Teilnehmer-ID');
  const result: TournamentDefinition = {
    schemaVersion: 1, id: t.id as string, format: t.format,
    baseSeed: t.baseSeed as number, maxTicks: t.maxTicks as number,
    ...(t.sideAssignment === 'balanced' ? { sideAssignment: 'balanced' as const } : {}),
    participants: structuredClone(participants)
  };
  return deepFreeze(result);
}

export function serializeTournamentDefinition(value: TournamentDefinition): string {
  return JSON.stringify(createTournamentDefinition(value));
}

export function parseTournamentDefinition(json: string): TournamentDefinition {
  if (new TextEncoder().encode(json).length > 2 * 1024 * 1024) throw new Error('Turnierimport: Datei zu groß');
  return createTournamentDefinition(JSON.parse(json) as unknown);
}
