import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { movementDelta } from '../src/engine/strategies';
import { parseCombatRuleset } from '../src/engine/simulation-v2';
import {
  TACTICAL_PREVIEW_RULESET,
  parseTacticalPreviewRuleset,
  previewTacticalMovementForRuleset
} from '../src/engine/tactical-ruleset';
import type { RobotState } from '../src/engine/types';

const self = (): RobotState => ({
  definition: { ...RAPTOR, strategy: 'adaptive', speed: 1.5, weaponRange: 10 },
  position: { x: 10, y: 50 },
  structure: RAPTOR.maxStructure, energy: RAPTOR.maxEnergy, cooldown: 0
});
const enemy = (): RobotState => ({
  definition: { ...TITAN, weaponRange: 20, weaponEnergy: 9, energyRegen: 1 },
  position: { x: 25, y: 50 },
  structure: TITAN.maxStructure, energy: TITAN.maxEnergy, cooldown: 0
});

describe('NEXT-118-C: experimental tactical-v3 opt-in must not affect historical rulesets', () => {
  it('requires an explicit tactical-v3-preview identifier', () => {
    expect(parseTacticalPreviewRuleset(TACTICAL_PREVIEW_RULESET)).toBe('tactical-v3-preview');
    for (const invalid of [undefined, null, '', 'sequential-v1', 'simultaneous-v2', 'tactical-v3', 3]) {
      expect(() => parseTacticalPreviewRuleset(invalid)).toThrow();
    }
  });

  it('rejects missing, legacy and unknown rulesets before any preview', () => {
    const a = self(), b = enemy();
    for (const invalid of [undefined, null, 'sequential-v1', 'simultaneous-v2', 'unknown']) {
      expect(() => previewTacticalMovementForRuleset(invalid, a, b, 15)).toThrow();
    }
  });

  it('rejects invalid geometry rather than passing NaN into legacy movement', () => {
    const a = self(), b = enemy();
    for (const invalid of [Number.NaN, Infinity, -Infinity, -1]) {
      expect(() => previewTacticalMovementForRuleset(TACTICAL_PREVIEW_RULESET, a, b, invalid)).toThrow();
    }
  });

  it('provides a deterministic, pure retreat preview only with v3 opt-in', () => {
    const a = self(), b = enemy(), snapshot = structuredClone({ a, b });
    const expected = { delta: -1.5, reason: 'ready-longer-range-threat' };
    for (let n = 0; n < 12; n += 1) {
      expect(previewTacticalMovementForRuleset(TACTICAL_PREVIEW_RULESET, a, b, 15)).toEqual(expected);
    }
    expect({ a, b }).toEqual(snapshot);
    expect(movementDelta(a, b, 15)).toBeGreaterThanOrEqual(0);
  });

  it('retains legacy fallback when the longer-range enemy cannot shoot', () => {
    const a = self(), b = enemy();
    b.cooldown = 5;
    expect(previewTacticalMovementForRuleset(TACTICAL_PREVIEW_RULESET, a, b, 15)).toEqual({
      delta: movementDelta(a, b, 15), reason: 'legacy'
    });
  });

  it('leaves existing v1/v2 ruleset parser unchanged and refuses v3 there', () => {
    expect(parseCombatRuleset('sequential-v1')).toBe('sequential-v1');
    expect(parseCombatRuleset('simultaneous-v2')).toBe('simultaneous-v2');
    expect(() => parseCombatRuleset(TACTICAL_PREVIEW_RULESET)).toThrow();
  });
});
