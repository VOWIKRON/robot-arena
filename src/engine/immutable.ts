/** Deep-freeze plain simulation snapshots and recorded events without cloning them.
 * The caller owns the input; use structuredClone first when a mutable copy is needed.
 * Kept independent of recorder, replay, simulation and RNG modules.
 */
export function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}
