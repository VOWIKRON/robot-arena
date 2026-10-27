import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { ReplayPlayer } from '../src/engine/replay-player';
import { createTournamentDefinition } from '../src/engine/tournament-model';
import { advanceTournamentRun, createTournamentRun } from '../src/engine/tournament-runner';
import { replayTournamentMatch } from '../src/engine/tournament-replay';
import { createRoundRobinSchedule } from '../src/engine/tournament-schedule';
import { parseReplayV2, reconstructReplayStatesV2 } from '../src/engine/replay-v2';

const alpha = { ...RAPTOR, id: 'alpha', name: 'Alpha' };
const beta = { ...TITAN, id: 'beta', name: 'Beta' };
const definition = (schemaVersion: 1 | 2, bots = [alpha, beta]) =>
  createTournamentDefinition({
    schemaVersion, ...(schemaVersion === 2 ? { rulesetVersion: 'simultaneous-v2' } : {}),
    id: 'next110-v2-replay', format: 'round-robin', baseSeed: 4711,
    maxTicks: 180, participants: bots
  });

describe('NEXT-110 stage E2: version-safe tournament replay and event-only player', () => {
  it('reconstructs a completed v2 tournament fixture with the correct final summary', () => {
    const run = advanceTournamentRun(createTournamentRun(definition(2)));
    const id = createRoundRobinSchedule(run.definition)[0]!.id;
    const replay = replayTournamentMatch(run, id);
    expect(replay.schemaVersion).toBe(2);
    if (replay.schemaVersion !== 2) throw new Error('v2-Replay erwartet');
    expect(parseReplayV2(JSON.stringify(replay))).toEqual(replay);
    const player = new ReplayPlayer(replay);
    expect(player.length).toBe(replay.finalState.tick);
    player.seek(player.length);
    expect(player.state).toEqual(replay.finalState);
    expect(player.state).toEqual(reconstructReplayStatesV2(replay).at(-1));
    expect(player.outcome).toBe(replay.finalState.outcome);
    expect(replay.finalState.winner).toBe(run.results[0]!.winnerId);
  });

  it('keeps double-KO as a v2 draw while exposing only known events to legacy renderers', () => {
    const killerA = { ...alpha, speed: 0, weaponRange: 100, weaponDamage: 1000 };
    const killerB = { ...beta, speed: 0, weaponRange: 100, weaponDamage: 1000 };
    const run = advanceTournamentRun(createTournamentRun(definition(2, [killerA, killerB])));
    const replay = replayTournamentMatch(run, run.results[0]!.matchId);
    expect(replay.schemaVersion).toBe(2);
    if (replay.schemaVersion !== 2) throw new Error('v2-Replay erwartet');
    expect(replay.frames[0]!.events.at(-1)?.type).toBe('draw');
    const player = new ReplayPlayer(replay);
    player.step();
    expect(player.outcome).toBe('draw');
    expect(player.state).toMatchObject({ outcome: 'draw', endReason: 'destroyed', winner: null });
    expect(player.events.some(event => event.type === 'victory')).toBe(false);
    expect(player.events).toHaveLength(replay.frames[0]!.events.length - 1);
  });

  it('rejects a forged tournament result and keeps historical v1 replay byte-compatible', () => {
    const v2 = advanceTournamentRun(createTournamentRun(definition(2)));
    const tampered = structuredClone(v2);
    const result = tampered.results[0] as { remainingStructureA: number };
    result.remainingStructureA = result.remainingStructureA === 0 ? 1 : result.remainingStructureA - 1;
    expect(() => replayTournamentMatch(tampered, tampered.results[0]!.matchId))
      .toThrow(/Ergebnisabweichung/);

    const v1 = advanceTournamentRun(createTournamentRun(definition(1)));
    const replay = replayTournamentMatch(v1, v1.results[0]!.matchId);
    expect(replay.schemaVersion).toBe(1);
    const player = new ReplayPlayer(replay);
    player.seek(player.length);
    expect(player.state).toEqual(replay.finalState);
  });
});
