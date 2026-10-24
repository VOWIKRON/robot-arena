import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { EventRecorder, recordMatch } from '../src/engine/recorder';
import { serializeReplay } from '../src/engine/replay-format';
import { replayFilename, readReplayFile } from '../src/engine/replay-io';

function fakeFile(name: string, content: string, size = new TextEncoder().encode(content).length) {
  return { name, size, text: async () => content };
}

describe('NEXT-46 replay export/import', () => {
  const recording = () => recordMatch(RAPTOR, TITAN, 4711, 4);

  it('generates a stable, safe filename without clock or randomness', () => {
    expect(replayFilename(recording())).toBe('robot-arena-replay-seed-4711-tick-4.json');
    expect(replayFilename(recording())).toBe(replayFilename(recording()));
  });

  it('imports exported JSON and freezes validated data without modifying the recording', async () => {
    const original = recording();
    const before = structuredClone(original);
    const result = await readReplayFile(fakeFile('fight.JSON', serializeReplay(original)));
    expect(result.finalState).toEqual(original.finalState);
    expect(result.frames).toEqual(original.frames);
    expect(Object.isFrozen(result)).toBe(true);
    expect(original).toEqual(before);
  });

  it('rejects invalid names, oversized files and invalid JSON with clear errors', async () => {
    const json = serializeReplay(recording());
    await expect(readReplayFile(fakeFile('fight.txt', json))).rejects.toThrow(/\.json/);
    await expect(readReplayFile(fakeFile('fight.json', json, 2_000_001))).rejects.toThrow(/2 MB/);
    await expect(readReplayFile(fakeFile('fight.json', '{broken'))).rejects.toThrow(/JSON/);
    await expect(readReplayFile(fakeFile('fight.json', '{"schemaVersion":2}'))).rejects.toThrow(/schemaVersion/);
  });

  it('allows repeated snapshots during a live recording without ending or mutating it', () => {
    const recorder = new EventRecorder(RAPTOR, TITAN, 4711);
    const first = recorder.snapshot();
    expect(first.frames).toHaveLength(0);
    expect(first.finalState.outcome).toBe('active');
    expect(recorder.snapshot()).toEqual(first);
    expect(recorder.finish().frames).toHaveLength(0);
  });
});
