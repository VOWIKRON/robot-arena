import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { recordMatch } from '../src/engine/recorder';
import { parseReplay, serializeReplay } from '../src/engine/replay-format';
import { runMatchV2 } from '../src/engine/simulation-v2';
import { ReplayPlayer } from '../src/engine/replay-player';
import { parseReplayV2, recordMatchV2, reconstructReplayStatesV2, serializeReplayV2 } from '../src/engine/replay-v2';

const alpha = { ...RAPTOR, id: 'alpha', name: 'Alpha' };
const beta = { ...TITAN, id: 'beta', name: 'Beta' };
// NEXT-110-E20: shared deterministic Double-KO fixture used by tamper regressions.
const doubleKoReplayJson = (): string => {
  const a = { ...alpha, speed: 0, weaponRange: 100, weaponDamage: 1000 };
  const b = { ...beta, speed: 0, weaponRange: 100, weaponDamage: 1000 };
  return serializeReplayV2(recordMatchV2(a, b, 5, 10));
};
const mutate = (json: string, fn: (doc: any) => void): string => {
  const doc = JSON.parse(json);
  fn(doc);
  return JSON.stringify(doc);
};
/** NEXT-110-E23: tamper cases must fail without changing canonical v2 bytes. */
const expectRejectedMutations = (
  canonical: string,
  edits: ReadonlyArray<(doc: any) => void>,
  errorPattern?: RegExp
): void => {
  for (const edit of edits) {
    const tampered = mutate(canonical, edit);
    expect(tampered).not.toBe(canonical);
    if (errorPattern) {
      expect(() => parseReplayV2(tampered)).toThrow(errorPattern);
    } else {
      expect(() => parseReplayV2(tampered)).toThrow();
    }
  }
  expect(serializeReplayV2(parseReplayV2(canonical))).toBe(canonical);
};

describe('NEXT-110 stage E: opt-in simultaneous-v2 replay/event contract', () => {
  it('records and reconstructs 4 seeds without simulation or RNG during playback', () => {
    for (const seed of [1, 42, 4711, 65535]) {
      const recorded = recordMatchV2(alpha, beta, seed, 180);
      const json = serializeReplayV2(recorded);
      const parsed = parseReplayV2(json);
      const snapshots = reconstructReplayStatesV2(parsed);
      expect(parsed).toEqual(recorded);
      expect(parsed.schemaVersion).toBe(2);
      expect(parsed.rulesetVersion).toBe('simultaneous-v2');
      expect(snapshots).toHaveLength(parsed.frames.length + 1);
      expect(snapshots.at(-1)).toEqual(parsed.finalState);
      expect(parsed.finalState).toEqual(runMatchV2(alpha, beta, seed, 180));
      expect(Object.isFrozen(parsed.frames)).toBe(true);
      expect(recordMatchV2(alpha, beta, seed, 180)).toEqual(parsed);
    }
  });

  it('encodes atomic double KO as an explicit terminal destroyed draw event', () => {
    const a = { ...alpha, speed: 0, weaponRange: 100, weaponDamage: 1000 };
    const b = { ...beta, speed: 0, weaponRange: 100, weaponDamage: 1000 };
    const doc = recordMatchV2(a, b, 5, 10);
    expect(doc.frames).toHaveLength(1);
    expect(doc.frames[0]!.events.at(-1)).toEqual({ type: 'draw', tick: 1, reason: 'destroyed' });
    expect(doc.frames[0]!.events.filter(e => e.type === 'damage')).toHaveLength(2);
    expect(doc.finalState).toMatchObject({ outcome: 'draw', winner: null, endReason: 'destroyed' });
    expect(reconstructReplayStatesV2(doc).at(-1)).toEqual(doc.finalState);
  });

  it('supports a zero-tick timeout and explicit terminal timeout marker', () => {
    const zero = recordMatchV2(alpha, beta, 2, 0);
    expect(zero.frames).toHaveLength(0);
    expect(zero.finalState).toMatchObject({ outcome: 'draw', endReason: 'timeout', tick: 0 });
    expect(reconstructReplayStatesV2(zero)).toEqual([zero.finalState]);
    const timed = recordMatchV2(alpha, beta, 2, 3);
    expect(timed.frames.at(-1)!.events.at(-1)).toEqual({ type: 'draw', tick: 3, reason: 'timeout' });
    expect(reconstructReplayStatesV2(timed).at(-1)).toEqual(timed.finalState);
  });

  it('NEXT-110-E13 rejects forged zero-tick terminal states while preserving canonical v2/v1 replay', () => {
    const zero = serializeReplayV2(recordMatchV2(alpha, beta, 2, 0));
    const parsed = parseReplayV2(zero);
    expect(parsed.frames).toHaveLength(0);
    expect(parsed.finalState).toMatchObject({
      tick: 0, outcome: 'draw', winner: null, endReason: 'timeout'
    });
    const invalidChanges: Array<(doc: any) => void> = [
      doc => { doc.finalState.tick = 1; },
      doc => { doc.finalState.endReason = 'destroyed'; },
      doc => { doc.finalState.winner = alpha.id; },
      doc => { doc.finalState.robotA.energy -= 1; },
      doc => { doc.frames.push({ tick: 1, events: [] }); },
      doc => { doc.initialState.robotB.structure = -1; }
    ];
    expectRejectedMutations(zero, invalidChanges, /v2-Replay/);
    expect(serializeReplayV2(parsed)).toBe(zero);
    expect(reconstructReplayStatesV2(parsed)).toEqual([parsed.finalState]);
    const legacy = serializeReplay(recordMatch(RAPTOR, TITAN, 2, 0));
    expect(serializeReplay(parseReplay(legacy))).toBe(legacy);
  });

  it('rejects wrong versions, changed events, missing terminal markers and forged results', () => {
    const doc = serializeReplayV2(recordMatchV2(alpha, beta, 7, 3));
    const rejects = (fn: (doc: any) => void) =>
      expect(() => parseReplayV2(mutate(doc, fn))).toThrow(/v2-Replay/);
    rejects(d => { d.schemaVersion = 1; });
    rejects(d => { d.rulesetVersion = 'simultaneous-v3'; });
    rejects(d => { delete d.rulesetVersion; });
    // A seed cannot be inferred before any RNG-consuming shot; test a trace with shots.
    const withShots = serializeReplayV2(recordMatchV2(alpha, beta, 7, 60));
    expect(() => parseReplayV2(mutate(withShots, d => { d.seed += 1; })))
      .toThrow(/Eventfolge/);
    rejects(d => { d.robotB.id = d.robotA.id; });
    rejects(d => { d.frames[0].tick = 2; });
    rejects(d => { d.frames[0].events[0].tick = 99; });
    rejects(d => { d.frames[0].events.push({ type: 'victory', tick: 1, winnerId: 'alpha', loserId: 'beta' }); });
    rejects(d => { d.frames.at(-1).events.pop(); });
    rejects(d => { d.finalState.robotA.energy = -999; });
    rejects(d => { d.finalState.outcome = 'victory'; });
    rejects(d => { d.extra = true; });
    expect(() => parseReplayV2('{broken')).toThrow(/JSON/);
    expect(() => parseReplayV2(' '.repeat(2_000_001))).toThrow(/2 MB/);
  });

  it('does not alter the v1 wire format, replay parser or historic deterministic events', () => {
    const v1 = recordMatch(RAPTOR, TITAN, 4711, 3);
    const json = serializeReplay(v1);
    expect(parseReplay(json)).toEqual(JSON.parse(json));
    expect(serializeReplay(parseReplay(json))).toBe(json);
    expect(() => parseReplay(serializeReplayV2(recordMatchV2(alpha, beta, 1, 1)))).toThrow(/schemaVersion/);
  });

  it('supports adaptive strategy definitions in v2 while enforcing valid numeric parameters', () => {
    const adaptive = { ...alpha, strategy: 'adaptive' as const, strategyParameters: { energyReserveRatio: 0.1 } };
    const json = serializeReplayV2(recordMatchV2(adaptive, beta, 42, 4));
    expect(parseReplayV2(json).robotA.strategy).toBe('adaptive');
    expect(() => parseReplayV2(mutate(json, d => { d.robotA.strategyParameters.energyReserveRatio = 5; })))
      .toThrow(/Strategieparameter/);
  });

  it('NEXT-110-E9 rejects forged Double-KO terminal events without affecting canonical replay', () => {
    const canonical = doubleKoReplayJson();
    const baseline = parseReplayV2(canonical);
    expect(baseline.frames[0]!.events.at(-1)).toEqual({
      type: 'draw', tick: 1, reason: 'destroyed'
    });
    // NEXT-110-E26: reuse the same tamper fixture/byte-stability guard as E13/E15.
    expectRejectedMutations(canonical, [
      d => { d.frames[0].events.pop(); },
      d => { d.frames[0].events.at(-1).reason = 'timeout'; },
      d => { d.frames[0].events.at(-1).tick = 2; },
      d => { d.frames[0].events.splice(d.frames[0].events.findIndex((e: any) => e.type === 'damage'), 1); },
      d => { d.finalState.winner = alpha.id; },
      d => { d.finalState.endReason = 'timeout'; }
    ], /v2-Replay/);
    expect(serializeReplayV2(baseline)).toBe(canonical);
    expect(reconstructReplayStatesV2(baseline).at(-1)).toEqual(baseline.finalState);
  });
  it('NEXT-110-E15 rejects nested Double-KO replay tampering and preserves deterministic immutable playback', () => {
    const canonical = doubleKoReplayJson();
    const baseline = parseReplayV2(canonical);
    expect(baseline.finalState).toMatchObject({
      outcome: 'draw', winner: null, endReason: 'destroyed', tick: 1
    });
    expect(Object.isFrozen(baseline.frames)).toBe(true);
    expect(Object.isFrozen(baseline.frames[0]!.events)).toBe(true);
    const invalid: Array<(doc: any) => void> = [
      d => { d.arena.width = 99; },
      d => { d.robotB.id = d.robotA.id; },
      d => { d.initialState.tick = 1; },
      d => { d.frames[0].events.reverse(); },
      d => { d.frames[0].events.push({ type: 'draw', tick: 1, reason: 'destroyed' }); },
      d => { d.finalState.robotA.structure = 1; }
    ];
    expectRejectedMutations(canonical, invalid);
    const first = reconstructReplayStatesV2(baseline);
    const second = reconstructReplayStatesV2(parseReplayV2(canonical));
    expect(first).toEqual(second);
    expect(first.at(-1)).toEqual(baseline.finalState);
    expect(serializeReplayV2(baseline)).toBe(canonical);
    const legacy = serializeReplay(recordMatch(RAPTOR, TITAN, 5, 1));
    expect(serializeReplay(parseReplay(legacy))).toBe(legacy);
  });

  it('NEXT-110-E20 shared Double-KO fixture stays byte-stable and v1 parser remains isolated', () => {
    const canonical = doubleKoReplayJson();
    expect(doubleKoReplayJson()).toBe(canonical);
    const parsed = parseReplayV2(canonical);
    expect(parsed.frames).toHaveLength(1);
    expect(parsed.finalState).toMatchObject({ outcome: 'draw', winner: null, endReason: 'destroyed' });
    expect(reconstructReplayStatesV2(parsed).at(-1)).toEqual(parsed.finalState);
    expect(serializeReplayV2(parsed)).toBe(canonical);
    expect(() => parseReplay(canonical)).toThrow(/schemaVersion/);
  });

  it('NEXT-110-E26 keeps v1/v2 fixture serialization deterministic across seeds and independent parsers', () => {
    for (const seed of [0, 1, 42, 4711]) {
      const v1 = serializeReplay(recordMatch(RAPTOR, TITAN, seed, 3));
      const v2 = serializeReplayV2(recordMatchV2(alpha, beta, seed, 3));
      expect(serializeReplay(recordMatch(RAPTOR, TITAN, seed, 3))).toBe(v1);
      expect(serializeReplayV2(recordMatchV2(alpha, beta, seed, 3))).toBe(v2);
      expect(serializeReplay(parseReplay(v1))).toBe(v1);
      expect(serializeReplayV2(parseReplayV2(v2))).toBe(v2);
      expect(() => parseReplay(v2)).toThrow(/schemaVersion/);
      expect(() => parseReplayV2(v1)).toThrow();
    }
  });

  it('NEXT-110-E17 keeps zero-tick replay cursor terminal and rejects invalid seeks without mutation', () => {
    const zero = parseReplayV2(serializeReplayV2(recordMatchV2(alpha, beta, 2, 0)));
    const player = new ReplayPlayer(zero);
    const original = player.state;
    expect(player.length).toBe(0);
    expect(player.tick).toBe(0);
    expect(player.atEnd).toBe(true);
    expect(player.outcome).toBe('draw');
    expect(player.state).toEqual(zero.finalState);
    expect(Object.isFrozen(player.state)).toBe(true);
    expect(player.play()).toBe(false);
    expect(player.step()).toBe(false);
    expect(player.advance()).toBe(false);
    for (const invalid of [-1, 1, Number.NaN, Number.POSITIVE_INFINITY, 0.5]) {
      expect(() => player.seek(invalid)).toThrow(RangeError);
      expect(player.tick).toBe(0);
      expect(player.state).toBe(original);
    }
    player.reset();
    expect(player.state).toBe(original);
    const one = new ReplayPlayer(recordMatchV2(alpha, beta, 2, 1));
    expect(one.length).toBe(1);
    expect(one.outcome).toBeNull();
    expect(one.play()).toBe(true);
    expect(one.advance()).toBe(true);
    expect(one.atEnd).toBe(true);
    expect(one.outcome).toBe('draw');
    expect(one.play()).toBe(false);
    one.reset();
    expect(one.tick).toBe(0);
    expect(one.outcome).toBeNull();
  });

});
