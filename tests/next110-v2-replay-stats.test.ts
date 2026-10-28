import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { analyzeReplay } from '../src/engine/replay-stats';
import { parseReplayV2, recordMatchV2, serializeReplayV2 } from '../src/engine/replay-v2';

describe('NEXT-110: event-only statistics for simultaneous-v2 replays', () => {
  it('counts both simultaneous shots and caps effective damage in a double-KO', () => {
    const a = { ...RAPTOR, id: 'stats-v2-a', speed: 0, weaponRange: 100, weaponDamage: 1000 };
    const b = { ...TITAN, id: 'stats-v2-b', speed: 0, weaponRange: 100, weaponDamage: 1000 };
    const recording = recordMatchV2(a, b, 5, 10);
    const before = serializeReplayV2(recording);
    const stats = analyzeReplay(recording);

    expect(recording.finalState).toMatchObject({ outcome: 'draw', winner: null, endReason: 'destroyed' });
    expect(stats).toMatchObject({ ticks: 1, outcome: 'draw', winner: null });
    expect(stats.robotA).toMatchObject({
      shots: 1, hits: 1, energySpent: a.weaponEnergy, effectiveDamage: b.maxStructure
    });
    expect(stats.robotB).toMatchObject({
      shots: 1, hits: 1, energySpent: b.weaponEnergy, effectiveDamage: a.maxStructure
    });
    expect(Object.isFrozen(stats.robotA)).toBe(true);
    expect(Object.isFrozen(stats.robotB)).toBe(true);
    expect(serializeReplayV2(recording)).toBe(before);
    expect(analyzeReplay(parseReplayV2(before))).toEqual(stats);
  });

  it('reports a zero-tick timeout without invented events', () => {
    const recording = recordMatchV2(RAPTOR, TITAN, 4711, 0);
    const stats = analyzeReplay(recording);
    expect(stats).toMatchObject({ ticks: 0, outcome: 'draw', winner: null });
    for (const robot of [stats.robotA, stats.robotB]) {
      expect(robot).toMatchObject({ shots: 0, hits: 0, effectiveDamage: 0, energySpent: 0 });
    }
  });

  it('produces deterministic statistics from an imported v2 replay without changing it', () => {
    const recording = recordMatchV2(RAPTOR, TITAN, 4711, 48);
    const json = serializeReplayV2(recording);
    const parsed = parseReplayV2(json);
    const first = analyzeReplay(parsed);
    const second = analyzeReplay(parseReplayV2(json));
    expect(first).toEqual(second);
    expect(first.ticks).toBe(parsed.frames.length);
    expect(first.outcome).toBe(parsed.finalState.outcome);
    expect(first.winner).toBe(parsed.finalState.winner);
    expect(serializeReplayV2(parsed)).toBe(json);
  });
});
