/** NEXT-110-E34: pure, fail-closed timing-evidence contract shared by browser and unit tests. */
export type TimingEvidence = {
  ruleset: string;
  participants: number;
  matches: number;
  maxTicks: number;
  seed: number;
  archiveBytes: number;
  elapsedMs: number;
  tournamentElapsedMs: number;
  archiveImportElapsedMs: number;
  invalidImportRecoveryElapsedMs: number;
  timeoutBudgetMs: number;
  browserProject: string;
  importedArchiveIdentical: boolean;
};

const keys: ReadonlyArray<keyof TimingEvidence> = [
  'ruleset', 'participants', 'matches', 'maxTicks', 'seed', 'archiveBytes',
  'elapsedMs', 'tournamentElapsedMs', 'archiveImportElapsedMs',
  'invalidImportRecoveryElapsedMs', 'timeoutBudgetMs', 'browserProject',
  'importedArchiveIdentical'
];

export function validateTimingEvidence(value: unknown, projectName: string): asserts value is TimingEvidence {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Timing evidence must be an object');
  }
  const data = value as Record<string, unknown>;
  if (Object.keys(data).length !== keys.length || keys.some(key => !Object.hasOwn(data, key))) {
    throw new Error('Timing evidence schema mismatch');
  }
  for (const key of ['elapsedMs', 'tournamentElapsedMs', 'archiveImportElapsedMs',
    'invalidImportRecoveryElapsedMs', 'timeoutBudgetMs'] as const) {
    const number = data[key];
    if (typeof number !== 'number' || !Number.isFinite(number) || number < 0) {
      throw new Error(`Invalid timing evidence: ${key}`);
    }
  }
  if (typeof data.timeoutBudgetMs !== 'number' || data.timeoutBudgetMs <= 0) {
    throw new Error('Invalid timeout budget');
  }
  if (typeof data.elapsedMs !== 'number' || typeof data.tournamentElapsedMs !== 'number' ||
      data.elapsedMs < data.tournamentElapsedMs) {
    throw new Error('Total elapsed time cannot precede tournament time');
  }
  if (data.ruleset !== 'simultaneous-v2' || data.participants !== 16 ||
      data.matches !== 120 || data.maxTicks !== 1 || data.seed !== 4711 ||
      data.importedArchiveIdentical !== true || data.browserProject !== projectName ||
      typeof projectName !== 'string' || projectName.length === 0) {
    throw new Error('Timing evidence context mismatch');
  }
  if (typeof data.archiveBytes !== 'number' || !Number.isSafeInteger(data.archiveBytes) ||
      data.archiveBytes <= 0) {
    throw new Error('Invalid archive size');
  }
}
