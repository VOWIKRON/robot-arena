import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { recordMatch } from '../src/engine/recorder';
import { parseReplay, serializeReplay } from '../src/engine/replay-format';
import { ReplayPlayer } from '../src/engine/replay-player';
import { analyzeReplay } from '../src/engine/replay-stats';
import { MAX_REPLAY_BYTES, readReplayFile } from '../src/engine/replay-io';

const strategies = ['aggressive', 'defensive', 'distance', 'melee'] as const;
const seeds = [1, 12, 4711] as const;
const digest = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');

describe('NEXT-50 complete deterministic replay roundtrip and quality review', () => {
  it('roundtrips all 16 strategy pairings across seeds 1/12/4711 with matching event/state digests', () => {
    let cases = 0;
    for (const strategyA of strategies) for (const strategyB of strategies) for (const seed of seeds) {
      const a = { ...RAPTOR, strategy: strategyA };
      const b = { ...TITAN, strategy: strategyB };
      const recorded = recordMatch(a, b, seed, 3600);
      const originalDigest = digest({
        initial: recorded.initialState, frames: recorded.frames, final: recorded.finalState
      });
      const json = serializeReplay(recorded);
      const imported = parseReplay(json);
      expect(digest({
        initial: imported.initialState, frames: imported.frames, final: imported.finalState
      })).toBe(originalDigest);
      const player = new ReplayPlayer(imported);
      const playedFrames: Array<{tick: number; events: typeof imported.frames[number]['events']}> = [];
      for (let tick = 1; tick <= player.length; tick++) {
        player.seek(tick);
        playedFrames.push({ tick: player.tick, events: player.events });
      }
      expect(digest(playedFrames)).toBe(digest(recorded.frames));
      expect(digest(player.state)).toBe(digest(recorded.finalState));
      expect(player.outcome).toBe(recorded.finalState.outcome);
      expect(player.state.robotA.position).toEqual(recorded.finalState.robotA.position);
      expect(player.state.robotB.position).toEqual(recorded.finalState.robotB.position);
      expect(analyzeReplay(imported)).toEqual(analyzeReplay(parseReplay(json)));
      player.seek(0);
      expect(player.state).toEqual(recorded.initialState);
      cases++;
    }
    expect(cases).toBe(48);
  }, 120_000);

  it('rejects missing frames and truncated/corrupted data without creating a replay', () => {
    const original = JSON.parse(serializeReplay(recordMatch(RAPTOR, TITAN, 12, 5)));
    const missing = structuredClone(original);
    missing.frames.splice(2, 1);
    expect(() => parseReplay(JSON.stringify(missing))).toThrow(/Tick/);
    expect(() => parseReplay(JSON.stringify(original).slice(0, -7))).toThrow(/JSON/);
    const badEvent = structuredClone(original);
    badEvent.frames[0].events.push({ type: 'damage', tick: 1, sourceId: 'missing', targetId: TITAN.id, amount: 10 });
    expect(() => parseReplay(JSON.stringify(badEvent))).toThrow(/Roboter-ID/);
  });

  it('enforces actual UTF-8 payload size even when file.size metadata is misleading', async () => {
    const huge = ' '.repeat(MAX_REPLAY_BYTES + 1);
    const file = { name: 'huge.json', size: 1, text: async () => huge };
    await expect(readReplayFile(file)).rejects.toThrow(/2 MB/);
    const oversizedMetadata = { name: 'huge.json', size: MAX_REPLAY_BYTES + 1, text: async () => '{}' };
    await expect(readReplayFile(oversizedMetadata)).rejects.toThrow(/2 MB/);
  });
});
