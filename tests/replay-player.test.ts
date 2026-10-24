import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { recordMatch } from '../src/engine/recorder';
import { parseReplay, serializeReplay } from '../src/engine/replay-format';
import { ReplayPlayer } from '../src/engine/replay-player';
import { SeededRandom } from '../src/engine/random';
import { createMatch, stepMatchWithEvents } from '../src/engine/simulation';

const document = (ticks: number) => parseReplay(serializeReplay(recordMatch(RAPTOR, TITAN, 4711, ticks)));

describe('NEXT-47 deterministic event-only ReplayPlayer', () => {
  it('starts paused, advances exactly once per step and preserves frame event order', () => {
    const recording = document(4);
    const before = structuredClone(recording);
    const player = new ReplayPlayer(recording);
    expect(player.tick).toBe(0);
    expect(player.events).toEqual([]);
    expect(player.advance()).toBe(false);
    expect(player.step()).toBe(true);
    expect(player.tick).toBe(1);
    expect(player.events).toEqual(recording.frames[0]!.events);
    expect(player.step()).toBe(true);
    expect(player.events).toEqual(recording.frames[1]!.events);
    expect(recording).toEqual(before);
  });

  it('plays, pauses and resumes without skipping frames', () => {
    const player = new ReplayPlayer(document(4));
    expect(player.play()).toBe(true);
    expect(player.advance()).toBe(true);
    player.pause();
    expect(player.advance()).toBe(false);
    expect(player.tick).toBe(1);
    expect(player.play()).toBe(true);
    expect(player.advance()).toBe(true);
    expect(player.tick).toBe(2);
    player.reset();
    expect(player.tick).toBe(0);
    expect(player.isPlaying).toBe(false);
  });

  it('handles empty recordings and ends without extra ticks', () => {
    const empty = new ReplayPlayer(document(0));
    expect(empty.atEnd).toBe(true);
    expect(empty.play()).toBe(false);
    expect(empty.step()).toBe(false);
    expect(empty.tick).toBe(0);
    const player = new ReplayPlayer(document(1));
    expect(player.play()).toBe(true);
    expect(player.advance()).toBe(true);
    expect(player.atEnd).toBe(true);
    expect(player.isPlaying).toBe(false);
    expect(player.advance()).toBe(false);
    expect(player.step()).toBe(false);
    expect(player.tick).toBe(1);
  });

  it('preserves immediate-victory event sequence and outcome', () => {
    const a = { ...RAPTOR, speed: 0, weaponRange: 100, weaponDamage: 10000 };
    const b = { ...TITAN, speed: 0 };
    const recording = parseReplay(serializeReplay(recordMatch(a, b, 12, 3600)));
    const player = new ReplayPlayer(recording);
    expect(player.step()).toBe(true);
    expect(player.events.map(e => e.type)).toEqual(['shot', 'hit', 'damage', 'victory']);
    expect(player.outcome).toBe('victory');
  });


  it('plays a 3600-tick timeout without extra events or RNG', () => {
    const a = { ...RAPTOR, speed: 0, weaponRange: 0, weaponDamage: 0 };
    const b = { ...TITAN, speed: 0, weaponRange: 0, weaponDamage: 0 };
    const recording = parseReplay(serializeReplay(recordMatch(a, b, 4711, 3600)));
    const player = new ReplayPlayer(recording);
    expect(player.play()).toBe(true);
    let count = 0;
    while (player.advance()) count++;
    expect(count).toBe(3600);
    expect(player.tick).toBe(3600);
    expect(player.outcome).toBe('draw');
    expect(player.advance()).toBe(false);
  });

  it('is deterministic for identical input and never mutates the imported document', () => {
    const recording = document(20);
    const before = JSON.stringify(recording);
    const a = new ReplayPlayer(recording);
    const b = new ReplayPlayer(recording);
    expect(a.play()).toBe(true);
    expect(b.play()).toBe(true);
    const first: string[] = [], second: string[] = [];
    while (a.advance()) first.push(JSON.stringify([a.tick, a.events]));
    while (b.advance()) second.push(JSON.stringify([b.tick, b.events]));
    expect(first).toEqual(second);
    expect(a.tick).toBe(recording.frames.length);
    expect(JSON.stringify(recording)).toBe(before);
  });
});

describe('NEXT-48 event-only replay seek and reconstructed state', () => {
  it.each([1, 12, 4711])('matches actual simulation states at every tick for seed %i', seed => {
    const recording = parseReplay(serializeReplay(recordMatch(RAPTOR, TITAN, seed, 120)));
    const player = new ReplayPlayer(recording);
    const rng = new SeededRandom(seed);
    let expected = createMatch(RAPTOR, TITAN);
    expect(player.state).toEqual(expected);
    for (let tick = 1; tick <= recording.frames.length; tick++) {
      expected = stepMatchWithEvents(expected, rng).state;
      player.seek(tick);
      if (tick === recording.frames.length && recording.finalState.outcome === 'draw') {
        expected = { ...expected, outcome: 'draw', endReason: 'timeout' };
      }
      expect(player.state).toEqual(expected);
      expect(player.events).toEqual(recording.frames[tick - 1]!.events);
    }
    expect(player.state).toEqual(recording.finalState);
    player.seek(Math.floor(player.length / 2));
    expect(player.state.tick).toBe(Math.floor(player.length / 2));
    player.seek(0);
    expect(player.state).toEqual(recording.initialState);
    player.seek(player.length);
    expect(player.state).toEqual(recording.finalState);
  });

  it('pauses on seek, rejects out-of-range and fractional ticks without mutating cursor', () => {
    const player = new ReplayPlayer(document(10));
    expect(player.play()).toBe(true);
    player.seek(4);
    expect(player.tick).toBe(4);
    expect(player.isPlaying).toBe(false);
    expect(player.advance()).toBe(false);
    for (const bad of [-1, 11, 0.5, NaN, Infinity]) {
      expect(() => player.seek(bad)).toThrow(RangeError);
      expect(player.tick).toBe(4);
    }
    player.seek(1);
    expect(player.state.tick).toBe(1);
    player.reset();
    expect(player.tick).toBe(0);
  });

  it('keeps imported data and cached states immutable across backward and forward seek', () => {
    const recording = document(20);
    const before = JSON.stringify(recording);
    const player = new ReplayPlayer(recording);
    const snapshot = player.state;
    player.seek(20);
    const end = player.state;
    player.seek(5);
    player.seek(20);
    expect(player.state).toBe(end);
    expect(Object.isFrozen(end)).toBe(true);
    expect(Object.isFrozen(end.robotA)).toBe(true);
    expect(player.state).toEqual(recording.finalState);
    player.seek(0);
    expect(player.state).toBe(snapshot);
    expect(JSON.stringify(recording)).toBe(before);
  });

  it('reconstructs immediate victory and empty timeout without extra simulation', () => {
    const a = { ...RAPTOR, speed: 0, weaponRange: 100, weaponDamage: 10000 };
    const b = { ...TITAN, speed: 0 };
    const win = parseReplay(serializeReplay(recordMatch(a, b, 12, 3600)));
    const player = new ReplayPlayer(win);
    player.seek(1);
    expect(player.state).toEqual(win.finalState);
    expect(player.outcome).toBe('victory');
    const empty = parseReplay(serializeReplay(recordMatch(RAPTOR, TITAN, 1, 0)));
    const noFrames = new ReplayPlayer(empty);
    expect(noFrames.state).toEqual(empty.finalState);
    expect(noFrames.length).toBe(0);
    expect(noFrames.outcome).toBe('draw');
  });
});
