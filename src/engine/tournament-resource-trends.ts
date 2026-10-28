/** NEXT-89: diagnostic-only metrics. Never gate CI on elapsed time or heap deltas. */
export type ResourceSample = Readonly<{
  participants: number;
  matches: number;
  ticks: number;
  archiveBytes: number;
  elapsedMs: number;
  heapDeltaBytes: number;
}>;
export type ResourceReport = Readonly<{
  schemaVersion: 1;
  scenario: string;
  samples: readonly ResourceSample[];
}>;

function validSample(s: ResourceSample): boolean {
  return Number.isSafeInteger(s.participants) && s.participants >= 2 && s.participants <= 16
    && Number.isSafeInteger(s.matches) && s.matches === s.participants * (s.participants - 1) / 2
    && Number.isSafeInteger(s.ticks) && s.ticks >= s.matches
    && Number.isSafeInteger(s.archiveBytes) && s.archiveBytes > 0
    && Number.isFinite(s.elapsedMs) && s.elapsedMs >= 0
    && Number.isFinite(s.heapDeltaBytes);
}

export function createResourceReport(scenario: string, input: readonly ResourceSample[]): ResourceReport {
  if (!scenario.trim() || !input.length || input.some(s => !validSample(s))) {
    throw new Error('Ungültige Ressourcendiagnose');
  }
  const samples = input.map(s => Object.freeze({ ...s })).sort((a, b) => a.participants - b.participants);
  if (new Set(samples.map(s => s.participants)).size !== samples.length) {
    throw new Error('Doppelte Teilnehmerzahl in Ressourcendiagnose');
  }
  return Object.freeze({ schemaVersion: 1 as const, scenario, samples: Object.freeze(samples) });
}

export type ResourceComparison = Readonly<{
  participants: number;
  archiveBytesDelta: number;
  archiveBytesPercent: number;
  elapsedMsPercent: number | null;
  heapDeltaBytes: number;
}>;

/** Compare two CI artifacts for the same scenario and fixture sizes.
 * Wall-clock and heap measurements are informational, not correctness thresholds.
 * Archive bytes are reproducible and can reveal serialization growth. */
export function compareResourceReports(previous: ResourceReport, current: ResourceReport): readonly ResourceComparison[] {
  if (previous.schemaVersion !== 1 || current.schemaVersion !== 1 || previous.scenario !== current.scenario) {
    throw new Error('Ressourcenberichte nicht vergleichbar');
  }
  const older = createResourceReport(previous.scenario, previous.samples);
  const newer = createResourceReport(current.scenario, current.samples);
  if (older.samples.length !== newer.samples.length ||
      older.samples.some((sample, index) => sample.participants !== newer.samples[index]?.participants)) {
    throw new Error('Unterschiedliche Testgrößen');
  }
  return newer.samples.map((sample, index) => {
    const before = older.samples[index]!;
    return Object.freeze({
      participants: sample.participants,
      archiveBytesDelta: sample.archiveBytes - before.archiveBytes,
      archiveBytesPercent: (sample.archiveBytes - before.archiveBytes) / before.archiveBytes * 100,
      elapsedMsPercent: before.elapsedMs === 0 ? null : (sample.elapsedMs - before.elapsedMs) / before.elapsedMs * 100,
      heapDeltaBytes: sample.heapDeltaBytes - before.heapDeltaBytes
    });
  });
}
