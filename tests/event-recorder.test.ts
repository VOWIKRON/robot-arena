import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { SeededRandom } from '../src/engine/random';
import { createMatch, runMatch, stepMatchWithEvents } from '../src/engine/simulation';
import { EventRecorder, recordMatch } from '../src/engine/recorder';

describe('NEXT-44 append-only event recorder', () => {
  it('records zero ticks, initial definitions and timeout without changing input', () => {
    const a = structuredClone(RAPTOR), b = structuredClone(TITAN);
    const snapshot = structuredClone({ a, b });
    const recording = recordMatch(a, b, 12, 0);
    expect(recording.seed).toBe(12);
    expect(recording.robotA).toEqual(a);
    expect(recording.robotB).toEqual(b);
    expect(recording.initialState).toEqual(createMatch(a, b));
    expect(recording.frames).toEqual([]);
    expect(recording.finalState).toEqual(runMatch(a, b, 12, 0));
    expect({ a, b }).toEqual(snapshot);
    expect(Object.isFrozen(recording)).toBe(true);
    expect(Object.isFrozen(recording.robotA)).toBe(true);
  });

  it('captures one step, preserving event order, state and source immutability', () => {
    const initial = createMatch(RAPTOR, TITAN);
    const result = stepMatchWithEvents(initial, new SeededRandom(4711));
    const recorder = new EventRecorder(RAPTOR, TITAN, 4711);
    recorder.append(result);
    const recording = recorder.finish();
    expect(recording.frames).toHaveLength(1);
    expect(recording.frames[0]!.tick).toBe(1);
    expect(recording.frames[0]!.events).toEqual(result.events);
    expect(recording.finalState).toEqual(result.state);
    expect(initial.tick).toBe(0);
    expect(Object.isFrozen(recording.frames[0]!.events)).toBe(true);
    expect(() => recorder.append(result)).toThrow(/abgeschlossen/);
  });

  it('rejects skipped or duplicate ticks and keeps the previous recording intact', () => {
    const recorder = new EventRecorder(RAPTOR, TITAN, 1);
    const state = createMatch(RAPTOR, TITAN);
    const first = stepMatchWithEvents(state, new SeededRandom(1));
    expect(() => recorder.append({ ...first, state: { ...first.state, tick: 2 } })).toThrow(/Tick/);
    recorder.append(first);
    expect(() => recorder.append(first)).toThrow(/Tick/);
    expect(recorder.finish().frames).toHaveLength(1);
  });

  it('records 3600 ticks without losing event order or changing deterministic final state', () => {
    const a = { ...RAPTOR, speed: 0, weaponRange: 0, weaponDamage: 0 };
    const b = { ...TITAN, speed: 0, weaponRange: 0, weaponDamage: 0 };
    const recording = recordMatch(a, b, 4711, 3600);
    expect(recording.frames).toHaveLength(3600);
    expect(recording.frames[0]!.tick).toBe(1);
    expect(recording.frames.at(-1)?.tick).toBe(3600);
    expect(recording.frames.every((frame, i) => frame.tick === i + 1)).toBe(true);
    expect(recording.finalState).toEqual(runMatch(a, b, 4711, 3600));
    expect(recording.finalState.outcome).toBe('draw');
  });

  it('stops at immediate victory and preserves shot-hit-damage-victory order', () => {
    const a = { ...RAPTOR, speed: 0, weaponRange: 100, weaponDamage: 10000 };
    const b = { ...TITAN, speed: 0 };
    const recording = recordMatch(a, b, 12, 3600);
    expect(recording.frames).toHaveLength(1);
    expect(recording.frames[0]!.events.map(event => event.type)).toEqual(['shot', 'hit', 'damage', 'victory']);
    expect(recording.finalState.outcome).toBe('victory');
    expect(recording.finalState).toEqual(runMatch(a, b, 12, 3600));
  });

  it('produces identical snapshots and streams for the same seed', () => {
    expect(recordMatch(RAPTOR, TITAN, 4711, 80)).toEqual(recordMatch(RAPTOR, TITAN, 4711, 80));
  });
});
