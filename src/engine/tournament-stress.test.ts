import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { createTournamentDefinition } from './tournament-model';
import { createRoundRobinSchedule } from './tournament-schedule';
import { advanceTournamentRun, createTournamentRun, finishTournamentRun, pauseTournamentRun, resumeTournamentRun } from './tournament-runner';
import { exportTournamentRun, importTournamentRun } from './tournament-archive';
import { tournamentMatchDetails } from './tournament-details';
import { filterTournamentMatches } from './tournament-match-filter';
import { computeRoundRobinStandings } from './tournament-standings';

/** NEXT-87: maximum supported tournament, fixed seed, tiny tick budget.
 * Stress the entire pipeline without nondeterministic wall-clock assertions. */
const definition = createTournamentDefinition({
  schemaVersion: 1, id: 'stress-16', format: 'round-robin', baseSeed: 4711, maxTicks: 1,
  participants: Array.from({ length: 16 }, (_, i) => ({
    id: `stress-${i + 1}`, name: `Roboter ${i + 1} Ä`,
    strategy: 'aggressive', maxStructure: 100, maxEnergy: 100,
    energyRegen: 2, speed: 1, sensorRange: 150, weaponRange: 100,
    weaponDamage: 10, weaponEnergy: 5, cooldownTicks: 1
  }))
});

describe('NEXT-87 maximum-size tournament stress and deterministic regressions', () => {
  it('preserves 120 fixtures, standings, immutable search and byte-identical archives', () => {
    const schedule = createRoundRobinSchedule(definition);
    expect(schedule).toHaveLength(120);
    expect(new Set(schedule.map(pair => pair.id)).size).toBe(120);

    const first = finishTournamentRun(createTournamentRun(definition));
    const second = finishTournamentRun(createTournamentRun(definition));
    expect(first).toEqual(second);
    expect(first.results).toHaveLength(120);
    const archive = exportTournamentRun(first);
    expect(new TextEncoder().encode(archive).length).toBeLessThan(2 * 1024 * 1024);
    expect(exportTournamentRun(second)).toBe(archive);
    expect(exportTournamentRun(importTournamentRun(archive))).toBe(archive);
    expect(createHash('sha256').update(exportTournamentRun(importTournamentRun(archive))).digest('hex'))
      .toBe(createHash('sha256').update(archive).digest('hex'));

    const details = tournamentMatchDetails(first);
    const snapshot = JSON.stringify(details);
    expect(details).toHaveLength(120);
    expect(filterTournamentMatches(details, '', 'completed')).toHaveLength(120);
    expect(filterTournamentMatches(details, '', 'pending')).toHaveLength(0);
    expect(filterTournamentMatches(details, 'MATCH-120', 'all').map(row => row.matchId)).toEqual(['match-120']);
    expect(filterTournamentMatches(details, 'Ä', 'all')).toHaveLength(120);
    expect(JSON.stringify(details)).toBe(snapshot);
    expect(Object.isFrozen(details)).toBe(true);
    const standings = computeRoundRobinStandings(definition, first.results);
    expect(standings.complete).toBe(true);
    expect(standings.completedMatches).toBe(120);
    expect(standings.standings).toHaveLength(16);
    expect(standings.standings.reduce((sum, row) => sum + row.played, 0)).toBe(240);
  });

  it('resumes a 47/120 archive without replaying or changing the remaining deterministic fixtures', () => {
    let partial = createTournamentRun(definition);
    for (let i = 0; i < 47; i++) partial = advanceTournamentRun(partial);
    const details = tournamentMatchDetails(partial);
    expect(filterTournamentMatches(details, '', 'completed')).toHaveLength(47);
    expect(filterTournamentMatches(details, '', 'pending')).toHaveLength(73);

    const frozenPrefix = JSON.stringify(partial.results);
    const imported = importTournamentRun(exportTournamentRun(pauseTournamentRun(partial)));
    expect(imported.status).toBe('paused');
    expect(JSON.stringify(imported.results)).toBe(frozenPrefix);
    const resumed = finishTournamentRun(resumeTournamentRun(imported));
    const uninterrupted = finishTournamentRun(createTournamentRun(definition));
    expect(resumed).toEqual(uninterrupted);
    expect(JSON.stringify(resumed.results.slice(0, 47))).toBe(frozenPrefix);
    expect(exportTournamentRun(resumed)).toBe(exportTournamentRun(uninterrupted));
  });

  it('rejects oversized archive inputs without modifying an already validated run', () => {
    const original = createTournamentRun(definition);
    const before = exportTournamentRun(original);
    expect(() => importTournamentRun(' '.repeat(2 * 1024 * 1024 + 1))).toThrow(/zu groß/);
    expect(exportTournamentRun(original)).toBe(before);
  });
});
