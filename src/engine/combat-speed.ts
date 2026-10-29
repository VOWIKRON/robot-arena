/** NEXT-112: UI playback speed only. Never changes the deterministic engine tick. */
export const COMBAT_INTERVALS_MS = Object.freeze({
  '0.5': 160,
  '1': 80,
  '2': 40,
  '4': 20
} as const);

export function combatIntervalMs(value: string): number {
  return Object.prototype.hasOwnProperty.call(COMBAT_INTERVALS_MS, value)
    ? COMBAT_INTERVALS_MS[value as keyof typeof COMBAT_INTERVALS_MS]
    : COMBAT_INTERVALS_MS['1'];
}
