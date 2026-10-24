import { describe, expect, it } from 'vitest';
import { createTournamentDefinition } from '../src/engine/tournament-model';
import { createRoundRobinSchedule } from '../src/engine/tournament-schedule';
import {
  advanceTournamentRun, cancelTournamentRun, createTournamentRun, finishTournamentRun,
  pauseTournamentRun, resumeTournamentRun
} from '../src/engine/tournament-runner';
import { exportTournamentRun, importTournamentRun, continueImportedTournament } from '../src/engine/tournament-archive';

const MiB = 1024 * 1024;
const model = createTournamentDefinition({
  schemaVersion: 1, id: 'load-16', format: 'round-robin', baseSeed: 4711, maxTicks: 100,
  participants: Array.from({length:16}, (_,i) => ({
    id: 'load-'+i, name: 'Load '+i, strategy: 'aggressive',
    maxStructure: 100, maxEnergy: 100, energyRegen: 2, speed: 1,
    sensorRange: 150, weaponRange: 100, weaponDamage: 0,
    weaponEnergy: 5, cooldownTicks: 1
  }))
});

describe('NEXT-62 reproducible 120-match load and lifecycle limits', () => {
  it('benchmarks wall time, CPU time and heap growth with fixed seed/tick limits', () => {
    const beforeHeap = process.memoryUsage().heapUsed;
    const beforeCpu = process.cpuUsage();
    const started = performance.now();
    const result = finishTournamentRun(createTournamentRun(model));
    const wallMs = performance.now() - started;
    const cpu = process.cpuUsage(beforeCpu);
    const cpuMs = (cpu.user + cpu.system) / 1000;
    const heapDeltaMiB = Math.max(0, process.memoryUsage().heapUsed - beforeHeap) / MiB;
    console.info('NEXT-62 benchmark: participants=16 fixtures=120 seed=4711 maxTicks=100 wallMs=' +
      wallMs.toFixed(1) + ' cpuMs=' + cpuMs.toFixed(1) + ' heapGrowthMiB=' + heapDeltaMiB.toFixed(2));
    expect(result.results).toHaveLength(120);
    expect(result.results.every(x => x.ticks === 100 && x.winnerId === null)).toBe(true);
    expect(result.results.map(x => x.matchId)).toEqual(createRoundRobinSchedule(model).map(x => x.id));
    // Deliberately generous CI regression guards, not a performance promise for user devices.
    expect(wallMs).toBeLessThan(30_000);
    expect(cpuMs).toBeLessThan(30_000);
    expect(heapDeltaMiB).toBeLessThan(128);
  });

  it('preserves deterministic results at 60/120 pause, export, resume and cancel boundaries', () => {
    let current = createTournamentRun(model);
    for (let i = 0; i < 60; i++) current = advanceTournamentRun(current);
    expect(current.nextMatchIndex).toBe(60);
    expect(current.results).toHaveLength(60);
    const before = JSON.stringify(current);
    const paused = pauseTournamentRun(current);
    expect(advanceTournamentRun(paused)).toBe(paused);
    expect(JSON.stringify(current)).toBe(before);
    const imported = importTournamentRun(exportTournamentRun(paused));
    expect(imported).toEqual(paused);
    expect(Object.isFrozen(imported.results)).toBe(true);
    const resumed = continueImportedTournament(imported);
    expect(resumed.nextMatchIndex).toBe(61);
    expect(finishTournamentRun(resumed)).toEqual(finishTournamentRun(createTournamentRun(model)));
    expect(resumeTournamentRun(paused).results).toEqual(paused.results);
    const cancelled = cancelTournamentRun(current);
    expect(cancelled.nextMatchIndex).toBe(60);
    expect(cancelled.results).toEqual(current.results);
    expect(advanceTournamentRun(cancelled)).toBe(cancelled);
    expect(() => finishTournamentRun(cancelled)).toThrow(/abgebrochen/);
    expect(JSON.stringify(current)).toBe(before);
  });
});
