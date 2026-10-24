import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { recordMatch } from '../src/engine/recorder';
import { parseReplay, serializeReplay } from '../src/engine/replay-format';
import { ReplayPlayer } from '../src/engine/replay-player';

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
