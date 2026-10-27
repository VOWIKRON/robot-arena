import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { SeededRandom } from '../src/engine/random';
import { createMatch, runMatch, stepMatchWithEvents } from '../src/engine/simulation';
import { createTournamentDefinition } from '../src/engine/tournament-model';
import { advanceTournamentRun, createTournamentRun, finishTournamentRun, pauseTournamentRun, resumeTournamentRun } from '../src/engine/tournament-runner';
import { exportTournamentRun, importTournamentRun } from '../src/engine/tournament-archive';

/** NEXT-110 stage A: protect the legacy rules and archive before implementing simultaneous-v2. */
describe('NEXT-110 legacy-v1 compatibility lock', () => {
  const tournament = () => createTournamentDefinition({
    schemaVersion: 1, id: 'next110-legacy', format: 'round-robin',
    baseSeed: 4711, maxTicks: 180, participants: [RAPTOR, TITAN, { ...TITAN, id: 'titan-two', name: 'Titan Two' }]
  });

  it('preserves exact historical Raptor/Titan seeded outcomes and no implicit ruleset', () => {
    const result = runMatch(RAPTOR, TITAN, 4711);
    expect(result.tick).toBe(93);
    expect(result.winner).toBe(TITAN.id);
    expect(result.robotA.structure).toBe(0);
    expect(result.robotB.structure).toBeCloseTo(51.8481166958809, 10);
    expect(Object.hasOwn(result, 'rulesetVersion')).toBe(false);
  });

  it('preserves sequential A-first event order when both bots are in range', () => {
    const initial = createMatch({ ...RAPTOR, id: 'legacy-a' }, { ...RAPTOR, id: 'legacy-b' });
    initial.robotA.position = { x: 40, y: 50 };
    initial.robotB.position = { x: 60, y: 50 };
    const original = structuredClone(initial);
    const result = stepMatchWithEvents(initial, new SeededRandom(2));
    expect(result.events.filter(event => event.type === 'shot').map(event => event.attackerId))
      .toEqual(['legacy-a', 'legacy-b']);
    expect(initial).toEqual(original);
  });

  it('v1 archive roundtrip preserves fixture progress and deterministic resume', () => {
    const model = tournament();
    expect(Object.hasOwn(model, 'rulesetVersion')).toBe(false);
    const started = advanceTournamentRun(createTournamentRun(model));
    const archived = exportTournamentRun(pauseTournamentRun(started));
    expect(JSON.parse(archived).schemaVersion).toBe(1);
    expect(JSON.parse(archived).run.definition.rulesetVersion).toBeUndefined();
    const resumed = finishTournamentRun(resumeTournamentRun(importTournamentRun(archived)));
    const uninterrupted = finishTournamentRun(createTournamentRun(model));
    expect(resumed.results).toEqual(uninterrupted.results);
  });

  it('rejects future archive schema instead of silently interpreting as legacy', () => {
    const archived = JSON.parse(exportTournamentRun(createTournamentRun(tournament())));
    archived.schemaVersion = 2;
    expect(() => importTournamentRun(JSON.stringify(archived))).toThrow(/Version/);
  });
});
