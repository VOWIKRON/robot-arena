import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from './presets';
import { createTournamentDefinition } from './tournament-model';
import { advanceTournamentRun, createTournamentRun } from './tournament-runner';
import { createTournamentMatchExport, exportTournamentMatchCsv, exportTournamentMatchJson } from './tournament-match-export';

const definition = createTournamentDefinition({
  schemaVersion: 1, id: 'match-export', format: 'round-robin', baseSeed: 4711, maxTicks: 12,
  participants: [{ ...RAPTOR, id: 'a', name: '=HYPERLINK("url","Ä")' }, { ...TITAN, id: 'b', name: 'Björk, "Beta"\nZeile' }]
});
const ready = createTournamentRun(definition);
const completed = advanceTournamentRun(ready);
const matchId = completed.results[0]?.matchId ?? '';

describe('NEXT-70 per-match exports', () => {
  it('rejects pending and unknown matches', () => {
    expect(() => createTournamentMatchExport(ready, matchId)).toThrow(/noch nicht abgeschlossen/);
    expect(() => createTournamentMatchExport(completed, 'missing')).toThrow(/unbekannte Kampf-ID/);
  });
  it('exports validated deterministic JSON with schema version', () => {
    const a = exportTournamentMatchJson(completed, matchId);
    const b = exportTournamentMatchJson(completed, matchId);
    expect(a).toBe(b);
    const parsed = JSON.parse(a) as { schemaVersion: number; matchId: string; ticks: number; robotBName: string };
    expect(parsed.schemaVersion).toBe(1);
    expect(parsed.matchId).toBe(matchId);
    expect(parsed.ticks).toBeGreaterThanOrEqual(0);
    expect(parsed.robotBName).toContain('Björk');
  });
  it('exports BOM, CRLF, escaped quotes and formula-safe Unicode CSV', () => {
    const csv = exportTournamentMatchCsv(completed, matchId);
    expect(csv.startsWith('\uFEFF')).toBe(true);
    expect(csv).toContain('\r\n');
    expect(csv).toContain('\'=HYPERLINK');
    expect(csv).toContain('Björk');
    expect(csv).toContain('""Beta""');
    expect(csv.split('\r\n').length).toBeGreaterThanOrEqual(3);
  });
  it('rejects tampered result before export', () => {
    const invalid = { ...completed, results: [{ ...completed.results[0]!, seed: -5 }] };
    expect(() => exportTournamentMatchJson(invalid, matchId)).toThrow();
  });
});
