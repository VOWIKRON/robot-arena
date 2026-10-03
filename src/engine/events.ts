import type { Vec2 } from './types';

export type MoveEvent = Readonly<{
  type: 'move';
  tick: number;
  robotId: string;
  from: Vec2;
  to: Vec2;
}>;

export type ShotEvent = Readonly<{
  type: 'shot';
  tick: number;
  attackerId: string;
  targetId: string;
  energyCost: number;
}>;

export type HitEvent = Readonly<{
  type: 'hit';
  tick: number;
  attackerId: string;
  targetId: string;
}>;

export type DamageEvent = Readonly<{
  type: 'damage';
  tick: number;
  sourceId: string;
  targetId: string;
  amount: number;
}>;

export type CombatEvent = MoveEvent | ShotEvent | HitEvent | DamageEvent;

export function createMoveEvent(
  tick: number,
  robotId: string,
  from: Vec2,
  to: Vec2
): MoveEvent {
  return { type: 'move', tick, robotId, from: { ...from }, to: { ...to } };
}

export function createShotEvent(
  tick: number,
  attackerId: string,
  targetId: string,
  energyCost: number
): ShotEvent {
  return { type: 'shot', tick, attackerId, targetId, energyCost };
}

export function createHitEvent(
  tick: number,
  attackerId: string,
  targetId: string
): HitEvent {
  return { type: 'hit', tick, attackerId, targetId };
}

export function createDamageEvent(
  tick: number,
  sourceId: string,
  targetId: string,
  amount: number
): DamageEvent {
  return { type: 'damage', tick, sourceId, targetId, amount };
}

// Diagnostic write-path check; no runtime behavior change.
