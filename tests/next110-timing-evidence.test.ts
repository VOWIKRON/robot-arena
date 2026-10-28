import { describe, expect, it } from 'vitest';
import { validateTimingEvidence, type TimingEvidence } from './helpers/next110-timing-evidence';

const project = 'desktop-chromium';
const baseline: TimingEvidence = {
  ruleset: 'simultaneous-v2', participants: 16, matches: 120,
  maxTicks: 1, seed: 4711, archiveBytes: 4096,
  elapsedMs: 300, tournamentElapsedMs: 100,
  archiveImportElapsedMs: 30, invalidImportRecoveryElapsedMs: 40,
  timeoutBudgetMs: 240_000, browserProject: project,
  importedArchiveIdentical: true
};

describe('NEXT-110-E34 fail-closed timing evidence', () => {
  it('accepts an intact finite evidence record without modifying it', () => {
    const evidence = structuredClone(baseline);
    const before = JSON.stringify(evidence);
    expect(() => validateTimingEvidence(evidence, project)).not.toThrow();
    expect(JSON.stringify(evidence)).toBe(before);
  });

  it('rejects missing, extra, NaN, infinite, negative and inconsistent fields', () => {
    const mutations: Array<(value: Record<string, unknown>) => void> = [
      v => { delete v.elapsedMs; },
      v => { v.extra = 'unexpected'; },
      v => { v.elapsedMs = Number.NaN; },
      v => { v.tournamentElapsedMs = Number.POSITIVE_INFINITY; },
      v => { v.archiveImportElapsedMs = Number.NEGATIVE_INFINITY; },
      v => { v.invalidImportRecoveryElapsedMs = -1; },
      v => { v.timeoutBudgetMs = 0; },
      v => { v.archiveBytes = 0; },
      v => { v.archiveBytes = 1.5; },
      v => { v.archiveBytes = Number.NaN; },
      v => { v.elapsedMs = 99; },
      v => { v.ruleset = 'classic-v1'; },
      v => { v.participants = 15; },
      v => { v.matches = 119; },
      v => { v.maxTicks = 2; },
      v => { v.seed = 0; },
      v => { v.browserProject = 'mobile-webkit'; },
      v => { v.importedArchiveIdentical = false; },
      v => { v.tournamentElapsedMs = '100'; }
    ];
    for (const mutate of mutations) {
      const value: Record<string, unknown> = structuredClone(baseline);
      mutate(value);
      expect(() => validateTimingEvidence(value, project)).toThrow();
    }
    for (const value of [null, [], 0, 'invalid']) {
      expect(() => validateTimingEvidence(value, project)).toThrow();
    }
    expect(() => validateTimingEvidence(baseline, '')).toThrow();
  });
});
