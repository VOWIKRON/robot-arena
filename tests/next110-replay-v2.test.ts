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
const doubleKoReplayJson = (seed = 5): string => {
  const a = { ...alpha, speed: 0, weaponRange: 100, weaponDamage: 1000 };
  const b = { ...beta, speed: 0, weaponRange: 100, weaponDamage: 1000 };
  return serializeReplayV2(recordMatchV2(a, b, seed, 10));
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


/** NEXT-110-E44: shared terminal seek characterization without mutating bytes. */
const expectTerminalSeekImmutable = (bytes: string, positions: number[]): void => {
  const recording = parseReplayV2(bytes);
  const immutableSnapshot = JSON.stringify(recording);
  const player = new ReplayPlayer(recording);
  for (const position of positions) {
    const reference = new ReplayPlayer(recording);
    for (let tick = 0; tick < position; tick++) expect(reference.step()).toBe(true);
    player.seek(position);
    expect(player.tick).toBe(position);
    expect(player.state).toEqual(reference.state);
    expect(player.events).toEqual(reference.events);
    expect(Object.isFrozen(player.state)).toBe(true);
  }
  player.reset();
  expect(player.tick).toBe(0);
  expect(player.events).toEqual([]);
  expect(JSON.stringify(recording)).toBe(immutableSnapshot);
  expect(serializeReplayV2(recording)).toBe(bytes);
};

/** NEXT-110-E53: one characterization for v1 and v2 cursor boundaries.
 * Keep identity, immutable snapshots and canonical bytes across invalid seeks. */
const expectSeededSeekBoundsImmutable = (bytes: string, schemaVersion: 1 | 2): void => {
  const recording = schemaVersion === 2 ? parseReplayV2(bytes) : parseReplay(bytes);
  const player = new ReplayPlayer(recording);
  const end = player.length;
  const positions = [end, 0, end, Math.floor(end / 2), 0, end];
  for (const position of positions) {
    player.seek(position);
    const reference = new ReplayPlayer(recording);
    for (let tick = 0; tick < position; tick++) expect(reference.step()).toBe(true);
    expect(player.tick).toBe(position);
    expect(player.state).toEqual(reference.state);
    expect(player.events).toEqual(reference.events);
    expect(Object.isFrozen(player.state)).toBe(true);
    const unchangedState = player.state;
    const unchangedEvents = player.events;
    for (const invalid of [-1, end + 1, Number.NaN, Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY, 0.5]) {
      expect(() => player.seek(invalid)).toThrow(RangeError);
      expect(player.tick).toBe(position);
      expect(player.state).toBe(unchangedState);
      expect(player.events).toEqual(unchangedEvents);
    }
  }
  player.reset();
  expect(player.tick).toBe(0);
  expect(player.events).toEqual([]);
  const bytesAfter = recording.schemaVersion === 2
    ? serializeReplayV2(recording) : serializeReplay(recording);
  expect(bytesAfter).toBe(bytes);
};

/** NEXT-110-E56: one shared control-flow regression for v1/v2 recordings.
 * Invalid seeks must not silently pause playback or alter cursor snapshots. */
const expectControlsAfterInvalidSeek = (bytes: string, schemaVersion: 1 | 2): void => {
  const recording = schemaVersion === 2 ? parseReplayV2(bytes) : parseReplay(bytes);
  const player = new ReplayPlayer(recording);
  const firstState = player.state;
  const firstEvents = player.events;
  expect(player.advance()).toBe(false);
  expect(player.play()).toBe(player.length > 0);
  const playingBefore = player.isPlaying;
  for (const invalid of [-1, player.length + 1, Number.NaN]) {
    expect(() => player.seek(invalid)).toThrow(RangeError);
    expect(player.tick).toBe(0);
    expect(player.state).toBe(firstState);
    expect(player.events).toEqual(firstEvents);
    expect(player.isPlaying).toBe(playingBefore);
  }
  if (player.length > 0) {
    expect(player.advance()).toBe(true);
    const tick = player.tick;
    const pausedState = player.state;
    const pausedEvents = player.events;
    player.pause();
    expect(player.advance()).toBe(false);
    expect(() => player.seek(player.length + 1)).toThrow(RangeError);
    expect(player.isPlaying).toBe(false);
    expect(player.tick).toBe(tick);
    expect(player.state).toBe(pausedState);
    expect(player.events).toEqual(pausedEvents);
    expect(player.play()).toBe(tick < player.length);
    if (tick < player.length) expect(player.advance()).toBe(true);
  }
  player.reset();
  expect(player.tick).toBe(0);
  expect(player.isPlaying).toBe(false);
  expect(player.state).toBe(firstState);
  expect(player.events).toEqual([]);
  expect(Object.isFrozen(player.state)).toBe(true);
  const canonicalBytes = recording.schemaVersion === 2
    ? serializeReplayV2(recording) : serializeReplay(recording);
  expect(canonicalBytes).toBe(bytes);
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

  it('NEXT-110-E29 preserves multi-tick v1/v2 replay bytes and cursor states across seeds', () => {
    for (const seed of [0, 1, 42, 4711]) {
      const maxTicks = 8;
      const canonicalV2 = serializeReplayV2(recordMatchV2(alpha, beta, seed, maxTicks));
      const parsed = parseReplayV2(canonicalV2);
      const snapshots = reconstructReplayStatesV2(parsed);
      expect(parsed.frames.length).toBeGreaterThan(1);
      expect(snapshots).toHaveLength(parsed.frames.length + 1);
      expect(snapshots.at(-1)).toEqual(runMatchV2(alpha, beta, seed, maxTicks));
      expect(serializeReplayV2(parseReplayV2(canonicalV2))).toBe(canonicalV2);
      expect(serializeReplayV2(recordMatchV2(alpha, beta, seed, maxTicks))).toBe(canonicalV2);
      const player = new ReplayPlayer(parsed);
      for (let cursor = 0; cursor <= parsed.frames.length; cursor++) {
        player.seek(cursor);
        expect(player.tick).toBe(cursor);
        expect(player.state).toEqual(snapshots[cursor]);
      }
      player.reset();
      expect(player.tick).toBe(0);
      expect(player.state).toEqual(snapshots[0]);
      const canonicalV1 = serializeReplay(recordMatch(RAPTOR, TITAN, seed, maxTicks));
      expect(serializeReplay(parseReplay(canonicalV1))).toBe(canonicalV1);
      expect(() => parseReplay(canonicalV2)).toThrow(/schemaVersion/);
      expect(() => parseReplayV2(canonicalV1)).toThrow();
    }
  });

  it('NEXT-110-E32 replays multiple ticks backward and forward without changing snapshots or RNG', () => {
    for (const seed of [1, 42, 4711]) {
      const canonical = serializeReplayV2(recordMatchV2(alpha, beta, seed, 8));
      const recording = parseReplayV2(canonical);
      const snapshots = reconstructReplayStatesV2(recording);
      const player = new ReplayPlayer(recording);
      expect(player.length).toBeGreaterThan(1);
      player.seek(player.length);
      expect(player.atEnd).toBe(true);
      expect(player.outcome).toBe(recording.finalState.outcome);
      for (let cursor = player.length - 1; cursor >= 0; cursor--) {
        player.seek(cursor);
        expect(player.tick).toBe(cursor);
        expect(player.state).toEqual(snapshots[cursor]);
        expect(player.isPlaying).toBe(false);
        expect(player.outcome).toBeNull();
      }
      expect(player.play()).toBe(true);
      for (let cursor = 1; cursor <= player.length; cursor++) {
        expect(player.advance()).toBe(true);
        expect(player.tick).toBe(cursor);
        expect(player.state).toEqual(snapshots[cursor]);
      }
      expect(player.atEnd).toBe(true);
      expect(player.advance()).toBe(false);
      player.reset();
      expect(player.tick).toBe(0);
      expect(player.state).toEqual(snapshots[0]);
      expect(player.isPlaying).toBe(false);
      expect(player.step()).toBe(true);
      expect(player.state).toEqual(snapshots[1]);
      expect(player.advance()).toBe(false);
      player.reset();
      expect(player.state).toEqual(snapshots[0]);
      expect(serializeReplayV2(recording)).toBe(canonical);
      const legacy = serializeReplay(recordMatch(RAPTOR, TITAN, seed, 8));
      expect(serializeReplay(parseReplay(legacy))).toBe(legacy);
    }
  });

  it('NEXT-110-E35 keeps alternating seek/pause/play/step deterministic for v1 and v2', () => {
    for (const seed of [0, 7, 42]) {
      const v1 = serializeReplay(recordMatch(RAPTOR, TITAN, seed, 8));
      const v2 = serializeReplayV2(recordMatchV2(alpha, beta, seed, 8));
      const recordings = [parseReplay(v1), parseReplayV2(v2)];
      for (const recording of recordings) {
        const player = new ReplayPlayer(recording);
        const reference = new ReplayPlayer(recording);
        expect(player.length).toBeGreaterThan(3);
        const originalBytes = recording.schemaVersion === 1 ? v1 : v2;
        for (const cursor of [0, 2, 1, 3, player.length, 0]) {
          player.seek(cursor);
          reference.seek(cursor);
          expect(player.tick).toBe(cursor);
          expect(player.state).toEqual(reference.state);
          expect(player.events).toEqual(reference.events);
          expect(player.isPlaying).toBe(false);
          expect(player.outcome).toBe(cursor === player.length ? recording.finalState.outcome : null);
        }
        expect(player.play()).toBe(true);
        expect(player.advance()).toBe(true);
        expect(player.tick).toBe(1);
        player.pause();
        expect(player.advance()).toBe(false);
        expect(player.tick).toBe(1);
        expect(player.step()).toBe(true);
        expect(player.tick).toBe(2);
        reference.seek(2);
        expect(player.state).toEqual(reference.state);
        for (const invalid of [-1, player.length + 1, Number.NaN, 1.5]) {
          const stateBefore = player.state;
          expect(() => player.seek(invalid)).toThrow(RangeError);
          expect(player.tick).toBe(2);
          expect(player.state).toBe(stateBefore);
        }
        player.seek(player.length);
        expect(player.atEnd).toBe(true);
        expect(player.play()).toBe(false);
        expect(player.advance()).toBe(false);
        player.reset();
        expect(player.tick).toBe(0);
        expect(player.state).toEqual(new ReplayPlayer(recording).state);
        const after = recording.schemaVersion === 1
          ? serializeReplay(recording)
          : serializeReplayV2(recording);
        expect(after).toBe(originalBytes);
      }
      expect(serializeReplay(parseReplay(v1))).toBe(v1);
      expect(serializeReplayV2(parseReplayV2(v2))).toBe(v2);
    }
  });

  it('NEXT-110-E38 preserves frame event streams across nonmonotonic v1/v2 seeks and replay resets', () => {
    for (const seed of [0, 7, 42]) {
      const canonicalV1 = serializeReplay(recordMatch(RAPTOR, TITAN, seed, 8));
      const canonicalV2 = serializeReplayV2(recordMatchV2(alpha, beta, seed, 8));
      const recordings = [parseReplay(canonicalV1), parseReplayV2(canonicalV2)];
      for (const recording of recordings) {
        const player = new ReplayPlayer(recording);
        const reference = new ReplayPlayer(recording);
        const originalEvents = JSON.stringify(recording.frames.map(frame => frame.events));
        expect(player.length).toBeGreaterThan(3);
        const positions = [player.length, 1, player.length - 1, 0, 2, 0, player.length];
        for (const position of positions) {
          player.seek(position);
          reference.reset();
          for (let i = 0; i < position; i++) expect(reference.step()).toBe(true);
          const expected = position === 0 ? [] : recording.schemaVersion === 2
            ? recording.frames[position - 1]!.events.filter(event => event.type !== 'draw')
            : recording.frames[position - 1]!.events;
          expect(player.events).toEqual(expected);
          expect(player.events).toEqual(reference.events);
          expect(player.state).toEqual(reference.state);
          expect(player.isPlaying).toBe(false);
        }
        player.reset();
        expect(player.events).toEqual([]);
        expect(player.play()).toBe(true);
        expect(player.advance()).toBe(true);
        expect(player.events).toEqual(recording.frames[0]!.events.filter(event => event.type !== 'draw'));
        expect(JSON.stringify(recording.frames.map(frame => frame.events))).toBe(originalEvents);
        expect(recording.schemaVersion === 2 ? serializeReplayV2(recording) : serializeReplay(recording))
          .toBe(recording.schemaVersion === 2 ? canonicalV2 : canonicalV1);
      }
    }
  });

  it('NEXT-110-E41 keeps destroyed and zero-tick terminal draw replay events immutable', () => {
    for (const seed of [0, 7, 42]) {
      const destroyedBytes = doubleKoReplayJson(seed);
      const destroyed = parseReplayV2(destroyedBytes);
      const player = new ReplayPlayer(destroyed);
      expect(player.length).toBe(1);
      expect(player.outcome).toBeNull();
      expect(player.step()).toBe(true);
      expect(player.atEnd).toBe(true);
      expect(player.outcome).toBe('draw');
      expect(player.events).toEqual(destroyed.frames[0]!.events.filter(event => event.type !== 'draw'));
      player.reset();
      expect(player.tick).toBe(0);
      expect(player.outcome).toBeNull();
      expect(player.events).toEqual([]);
      expect(player.step()).toBe(true);
      expect(player.outcome).toBe('draw');
      expectTerminalSeekImmutable(destroyedBytes, [1, 0, 1]);

      const zeroBytes = serializeReplayV2(recordMatchV2(alpha, beta, seed, 0));
      const zero = new ReplayPlayer(parseReplayV2(zeroBytes));
      expect(zero.length).toBe(0);
      expect(zero.atEnd).toBe(true);
      expect(zero.outcome).toBe('draw');
      expect(zero.events).toEqual([]);
      expect(zero.step()).toBe(false);
      zero.reset();
      expect(zero.events).toEqual([]);
      expectTerminalSeekImmutable(zeroBytes, [0, 0]);
      const legacyBytes = serializeReplay(recordMatch(RAPTOR, TITAN, seed, 0));
      expect(serializeReplay(parseReplay(legacyBytes))).toBe(legacyBytes);
    }
  });

  it('NEXT-110-E44 preserves terminal timeout seek snapshots and canonical bytes across seeds', () => {
    for (const seed of [0, 7, 42]) {
      const bytes = serializeReplayV2(recordMatchV2(alpha, beta, seed, 3));
      const recording = parseReplayV2(bytes);
      expect(recording.finalState.outcome).toBe('draw');
      expect(recording.finalState.endReason).toBe('timeout');
      expect(recording.frames.length).toBeGreaterThan(1);
      expectTerminalSeekImmutable(bytes, [
        recording.frames.length, 1, 0, recording.frames.length - 1, recording.frames.length
      ]);
      const legacy = serializeReplay(recordMatch(RAPTOR, TITAN, seed, 3));
      expect(serializeReplay(parseReplay(legacy))).toBe(legacy);
    }
  });

  it('NEXT-110-E47 covers terminal seek boundaries and seeded double-KO without changing v1/v2 bytes', () => {
    for (const seed of [0, 1, 7, 42, 4711]) {
      const destroyedBytes = doubleKoReplayJson(seed);
      const destroyed = parseReplayV2(destroyedBytes);
      expect(destroyed.finalState).toMatchObject({ outcome: 'draw', endReason: 'destroyed' });
      expectTerminalSeekImmutable(destroyedBytes, [1, 0, 1, 0, 1]);
      expect(doubleKoReplayJson(seed)).toBe(destroyedBytes);
      for (const maxTicks of [0, 1, 2, 3, 5]) {
        const bytes = serializeReplayV2(recordMatchV2(alpha, beta, seed, maxTicks));
        const recording = parseReplayV2(bytes);
        const end = recording.frames.length;
        expectTerminalSeekImmutable(bytes, [end, 0, Math.floor(end / 2), end]);
        expect(serializeReplayV2(recordMatchV2(alpha, beta, seed, maxTicks))).toBe(bytes);
        const legacyBytes = serializeReplay(recordMatch(RAPTOR, TITAN, seed, maxTicks));
        expect(serializeReplay(parseReplay(legacyBytes))).toBe(legacyBytes);
        expect(() => parseReplay(bytes)).toThrow(/schemaVersion/);
      }
    }
  });

  it('NEXT-110-E50: invalid cursor bounds never mutate seeded double-KO or legacy v1 replay', () => {
    for (const seed of [0, 1, 7, 42, 4711]) {
      const v2Bytes = doubleKoReplayJson(seed);
      const v1Bytes = serializeReplay(recordMatch(RAPTOR, TITAN, seed, 5));
      expectSeededSeekBoundsImmutable(v2Bytes, 2);
      expectSeededSeekBoundsImmutable(v1Bytes, 1);
      expect(doubleKoReplayJson(seed)).toBe(v2Bytes);
      expect(serializeReplay(parseReplay(v1Bytes))).toBe(v1Bytes);
    }
  });

  it('NEXT-110-E53: shared v1/v2 seek characterization stays deterministic at short tick boundaries', () => {
    for (const seed of [0, 7, 42]) {
      for (const maxTicks of [0, 1, 3, 5]) {
        const v2Bytes = serializeReplayV2(recordMatchV2(alpha, beta, seed, maxTicks));
        const v1Bytes = serializeReplay(recordMatch(RAPTOR, TITAN, seed, maxTicks));
        expectSeededSeekBoundsImmutable(v2Bytes, 2);
        expectSeededSeekBoundsImmutable(v1Bytes, 1);
        expect(serializeReplayV2(recordMatchV2(alpha, beta, seed, maxTicks))).toBe(v2Bytes);
        expect(serializeReplay(recordMatch(RAPTOR, TITAN, seed, maxTicks))).toBe(v1Bytes);
      }
    }
  });

  it('NEXT-110-E56: invalid seek preserves play/pause/reset for seeded v1 and v2 recordings', () => {
    for (const seed of [0, 7, 42]) {
      for (const maxTicks of [0, 1, 5]) {
        const v2 = serializeReplayV2(recordMatchV2(alpha, beta, seed, maxTicks));
        const v1 = serializeReplay(recordMatch(RAPTOR, TITAN, seed, maxTicks));
        expectControlsAfterInvalidSeek(v2, 2);
        expectControlsAfterInvalidSeek(v1, 1);
      }
      expectControlsAfterInvalidSeek(doubleKoReplayJson(seed), 2);
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
