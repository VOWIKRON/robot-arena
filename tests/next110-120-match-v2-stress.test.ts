import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { createTournamentDefinition } from '../src/engine/tournament-model';
import { createRoundRobinSchedule } from '../src/engine/tournament-schedule';
import { advanceTournamentRun, createTournamentRun, finishTournamentRun, pauseTournamentRun, resumeTournamentRun } from '../src/engine/tournament-runner';
import { continueImportedTournament, exportTournamentRun, importTournamentRun } from '../src/engine/tournament-archive';

const participants = Array.from({ length: 16 }, (_, index) => ({
  ...(index % 2 === 0 ? RAPTOR : TITAN),
  id: `next110-stress-${String(index + 1).padStart(2, '0')}`,
  name: `Stress Robot ${index + 1}`
}));

const definition = () => createTournamentDefinition({
  schemaVersion: 2,
  rulesetVersion: 'simultaneous-v2',
  id: 'next110-120-match-v2',
  format: 'round-robin',
  sideAssignment: 'balanced',
  baseSeed: 4711,
  maxTicks: 48,
  participants
});

function pauseAfter60() {
  let run = createTournamentRun(definition());
  for (let index = 0; index < 60; index++) run = advanceTournamentRun(run);
  return pauseTournamentRun(run);
}

describe('NEXT-110 stage D: 16 robots / 120 simultaneous-v2 matches', () => {
  it('preserves all 120 deterministic results across match 60 pause, export, import and resume', () => {
    const model = definition();
    const schedule = createRoundRobinSchedule(model);
    expect(schedule).toHaveLength(120);
    expect(new Set(schedule.map(match => match.id)).size).toBe(120);
    expect(new Set(schedule.map(match => match.seed)).size).toBe(120);

    const paused = pauseAfter60();
    expect(paused).toMatchObject({ status: 'paused', nextMatchIndex: 60, totalMatches: 120 });
    expect(paused.results).toHaveLength(60);
    const archive = exportTournamentRun(paused);
    expect(JSON.parse(archive)).toMatchObject({
      schemaVersion: 2,
      run: { definition: { schemaVersion: 2, rulesetVersion: 'simultaneous-v2' } }
    });
    const imported = importTournamentRun(archive);
    expect(imported).toEqual(paused);
    expect(exportTournamentRun(imported)).toBe(archive);

    const resumed = finishTournamentRun(resumeTournamentRun(imported));
    const uninterrupted = finishTournamentRun(createTournamentRun(model));
    expect(resumed).toMatchObject({ status: 'completed', nextMatchIndex: 120, totalMatches: 120 });
    expect(resumed.results).toHaveLength(120);
    expect(resumed.results).toEqual(uninterrupted.results);
    expect(exportTournamentRun(resumed)).toBe(exportTournamentRun(uninterrupted));
    expect(importTournamentRun(exportTournamentRun(resumed))).toEqual(resumed);

    const continued = finishTournamentRun(continueImportedTournament(imported));
    expect(continued.results).toEqual(uninterrupted.results);
  });

  it('rejects tampered mid-tournament progress, fixture identity and ruleset without losing the original archive', () => {
    const original = exportTournamentRun(pauseAfter60());
    const valid = JSON.parse(original);
    const mutate = (edit: (value: any) => void) => {
      const candidate = structuredClone(valid);
      edit(candidate);
      expect(() => importTournamentRun(JSON.stringify(candidate))).toThrow();
    };
    mutate(value => { value.run.nextMatchIndex = 59; });
    mutate(value => { value.run.results[59].seed += 1; });
    mutate(value => { value.run.results[59].matchId = 'match-120'; });
    mutate(value => { value.run.definition.rulesetVersion = 'sequential-v1'; });
    mutate(value => { value.schemaVersion = 1; });
    expect(importTournamentRun(original)).toEqual(pauseAfter60());
    expect(() => importTournamentRun(original, 1)).toThrow(/ungültige Version/);
  });
});
