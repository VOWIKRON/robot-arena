import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { movementDelta } from '../src/engine/strategies';
import { tacticalMovementPreview } from '../src/engine/tactical-preview';
import type { RobotState } from '../src/engine/types';

const self = (strategy: 'adaptive' | 'defensive' | 'aggressive' = 'adaptive'): RobotState => ({
  definition: { ...RAPTOR, strategy, speed: 1.5, weaponRange: 10 },
  position: { x: 10, y: 50 },
  structure: RAPTOR.maxStructure,
  energy: RAPTOR.maxEnergy,
  cooldown: 0
});
const enemy = (cooldown = 1, energy = 100): RobotState => ({
  definition: { ...TITAN, weaponRange: 20, weaponEnergy: 9, energyRegen: 1 },
  position: { x: 25, y: 50 },
  structure: TITAN.maxStructure,
  energy,
  cooldown
});

describe('NEXT-117-E experimental tactical preview, legacy simulation remains untouched', () => {
  it.each(['adaptive', 'defensive'] as const)(
    '%s requests a speed-bounded retreat against a ready longer-range opponent',
    strategy => {
      const a = self(strategy), b = enemy(1);
      expect(tacticalMovementPreview(a, b, 15)).toEqual({
        delta: -1.5, reason: 'ready-longer-range-threat'
      });
      expect(movementDelta(a, b, 15)).toBeGreaterThanOrEqual(0);
    }
  );

  it('does not anticipate a shot while the opponent is cooling down', () => {
    const a = self(), b = enemy(2);
    expect(tacticalMovementPreview(a, b, 15)).toEqual({
      delta: movementDelta(a, b, 15), reason: 'legacy'
    });
  });

  it('respects post-regeneration energy and the enemy strategy reserve', () => {
    const a = self(), b = enemy(0, 0);
    expect(tacticalMovementPreview(a, b, 15).reason).toBe('legacy');
    b.energy = 8;
    expect(tacticalMovementPreview(a, b, 15).reason).toBe('ready-longer-range-threat');
    b.definition = {
      ...b.definition, strategyParameters: { energyReserveRatio: 0.2 }
    };
    expect(tacticalMovementPreview(a, b, 15).reason).toBe('legacy');
  });

  it('does not retreat outside enemy range or within own weapon range', () => {
    const a = self(), b = enemy(0);
    for (const distance of [9, 10, 20.001]) {
      expect(tacticalMovementPreview(a, b, distance)).toEqual({
        delta: movementDelta(a, b, distance), reason: 'legacy'
      });
    }
    expect(tacticalMovementPreview(a, b, 20).reason).toBe('ready-longer-range-threat');
  });

  it('leaves non-adaptive/non-defensive strategies on legacy decisions', () => {
    const a = self('aggressive'), b = enemy(0);
    expect(tacticalMovementPreview(a, b, 15)).toEqual({
      delta: movementDelta(a, b, 15), reason: 'legacy'
    });
  });

  it('is pure, repeatable and side-independent for identical input geometry', () => {
    const a = self(), b = enemy(0);
    const snapshot = structuredClone({ a, b });
    const decisions = Array.from({ length: 12 }, () => tacticalMovementPreview(a, b, 15));
    for (const result of decisions) expect(result).toEqual(decisions[0]);
    expect({ a, b }).toEqual(snapshot);
    const mirroredSelf = structuredClone(a);
    const mirroredEnemy = structuredClone(b);
    mirroredSelf.position = { x: 85, y: 50 };
    mirroredEnemy.position = { x: 70, y: 50 };
    expect(tacticalMovementPreview(mirroredSelf, mirroredEnemy, 15)).toEqual(decisions[0]);
  });

  it('does not modify v1 movement decisions or emit any simulation events', () => {
    const a = self(), b = enemy(0);
    const before = movementDelta(a, b, 15);
    tacticalMovementPreview(a, b, 15);
    expect(movementDelta(a, b, 15)).toBe(before);
    expect(tacticalMovementPreview(a, b, 15)).toHaveProperty('delta');
  });
});
