/** NEXT-114: bounded, deterministic manual stepping without timers or RNG side effects. */
export function advanceBoundedSteps(
  count: number,
  isActive: () => boolean,
  step: () => void
): number {
  if (!Number.isSafeInteger(count) || count < 0 || count > 10) {
    throw new RangeError('Manual step count must be an integer from 0 to 10');
  }
  let completed = 0;
  while (completed < count && isActive()) {
    step();
    completed++;
  }
  return completed;
}
