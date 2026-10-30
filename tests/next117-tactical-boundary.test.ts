import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { movementDelta } from '../src/engine/strategies';
import { tacticalMovementPreview } from '../src/engine/tactical-preview';
import type { RobotState } from '../src/engine/types';

const self = (): RobotState => ({
  definition: { ...RAPTOR, strategy: 'adaptive', speed: 1.5, weaponRange: 10 },
  position: { x: 10, y: 50 },
  structure: RAPTOR.maxStructure,
  energy: RAPTOR.maxEnergy,
  cooldown: 0
});
const enemy = (): RobotState => ({
  definition: { ...TITAN, weaponRange: 20, weaponEnergy: 9, energyRegen: 1 },
  position: { x: 25, y: 50 },
  structure: TITAN.maxStructure,
  energy: TITAN.maxEnergy,
  cooldown: 0
});

describe('NEXT-117-G: tactical preview must not invent a shot', () => {
  it('does not request a new tactical retreat from a destroyed enemy', () => {
    const a = self(), b = enemy();
    b.structure = 0;
    expect(tacticalMovementPreview(a, b, 15)).toEqual({
      delta: movementDelta(a, b, 15), reason: 'legacy'
    });
  });

  it('does not request tactical movement for a destroyed robot', () => {
    const a = self(), b = enemy();
    a.structure = 0;
    expect(tacticalMovementPreview(a, b, 15)).toEqual({
      delta: movementDelta(a, b, 15), reason: 'legacy'
    });
  });

  it('caps regenerated energy at maxEnergy before checking weapon plus reserve', () => {
    const a = self(), b = enemy();
    b.definition = {
      ...b.definition, maxEnergy: 10, weaponEnergy: 9, energyRegen: 100,
      strategyParameters: { energyReserveRatio: 0.2 }
    };
    b.energy = 9;
    // Without the cap, 9 + 100 would incorrectly satisfy a cost of 11.
    expect(tacticalMovementPreview(a, b, 15)).toEqual({
      delta: movementDelta(a, b, 15), reason: 'legacy'
    });
  });

  it('preserves a live, affordable threat and is deterministic and pure', () => {
    const a = self(), b = enemy();
    const before = structuredClone({ a, b });
    for (let i = 0; i < 16; i += 1) {
      expect(tacticalMovementPreview(a, b, 15)).toEqual({
        delta: -1.5, reason: 'ready-longer-range-threat'
      });
    }
    expect({ a, b }).toEqual(before);
  });
});
