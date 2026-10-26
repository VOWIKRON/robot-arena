import { compareResourceReports, createResourceReport, type ResourceComparison, type ResourceReport } from './tournament-resource-trends';

/** NEXT-90: historical CI resource reports. Diagnostics only; no elapsed/heap pass/fail thresholds. */
export type HistoricalResourceRun = Readonly<{
  runId: number;
  artifactId: number;
  commit: string;
  report: ResourceReport;
}>;

export type HistoricalResourceDelta = Readonly<{
  fromRunId: number;
  toRunId: number;
  differences: readonly ResourceComparison[];
}>;

export type ResourceHistory = Readonly<{
  schemaVersion: 1;
  scenario: string;
  runs: readonly HistoricalResourceRun[];
  deltas: readonly HistoricalResourceDelta[];
}>;

/** Preserve chronological order; reject incompatible or tampered artifact metadata.
 * Compare only adjacent CI runs, so a history can grow without hiding intermediate changes. */
export function createResourceHistory(entries: readonly HistoricalResourceRun[]): ResourceHistory {
  if (entries.length < 2) throw new Error('Mindestens zwei CI-Ressourcenberichte erforderlich');
  const runs = entries.map(entry => {
    if (!Number.isSafeInteger(entry.runId) || entry.runId <= 0 ||
        !Number.isSafeInteger(entry.artifactId) || entry.artifactId <= 0 ||
        !/^[0-9a-f]{40}$/i.test(entry.commit)) {
      throw new Error('Ungültige CI-Artefaktmetadaten');
    }
    const report = createResourceReport(entry.report.scenario, entry.report.samples);
    if (entry.report.schemaVersion !== 1) throw new Error('Unbekannte Ressourcenberichtsversion');
    return Object.freeze({ runId: entry.runId, artifactId: entry.artifactId, commit: entry.commit, report });
  });
  if (runs.some((run, index) => index > 0 && run.runId <= runs[index - 1]!.runId) ||
      new Set(runs.map(run => run.artifactId)).size !== runs.length) {
    throw new Error('CI-Läufe müssen chronologisch und Artefakte eindeutig sein');
  }
  const deltas = runs.slice(1).map((run, index) => Object.freeze({
    fromRunId: runs[index]!.runId,
    toRunId: run.runId,
    differences: Object.freeze(compareResourceReports(runs[index]!.report, run.report))
  }));
  return Object.freeze({
    schemaVersion: 1 as const,
    scenario: runs[0]!.report.scenario,
    runs: Object.freeze(runs),
    deltas: Object.freeze(deltas)
  });
}
