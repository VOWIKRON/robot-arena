import type { RobotState } from './types';
import { tacticalMovementPreview, type TacticalMovementPreview } from './tactical-preview';

/**
 * NEXT-118-B: strict opt-in for a future tactical-v3 ruleset.
 * This is a READ-ONLY preview API, not a playable simulation or replay format.
 * In particular, existing sequential-v1 and simultaneous-v2 replays must never
 * be silently reinterpreted with new movement logic.
 */
export const TACTICAL_PREVIEW_RULESET = 'tactical-v3-preview' as const;
export type TacticalPreviewRuleset = typeof TACTICAL_PREVIEW_RULESET;

export function parseTacticalPreviewRuleset(value: unknown): TacticalPreviewRuleset {
  if (value !== TACTICAL_PREVIEW_RULESET) {
    throw new Error('Taktikvorschau: explizite v3-Regelversion erforderlich');
  }
  return TACTICAL_PREVIEW_RULESET;
}

/**
 * Fail closed on missing/legacy/unknown rulesets and invalid geometry.
 * Does not mutate robots, consume RNG, emit events, or call a match step.
 */
export function previewTacticalMovementForRuleset(
  ruleset: unknown,
  self: RobotState,
  enemy: RobotState,
  distance: number
): TacticalMovementPreview {
  parseTacticalPreviewRuleset(ruleset);
  if (!Number.isFinite(distance) || distance < 0) {
    throw new Error('Taktikvorschau: ungültiger Abstand');
  }
  return tacticalMovementPreview(self, enemy, distance);
}
