import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { recordMatch } from '../src/engine/recorder';
import { parseReplay, serializeReplay } from '../src/engine/replay-format';

const sample = () => recordMatch(RAPTOR, TITAN, 4711, 3);
const document = () => JSON.parse(serializeReplay(sample()));

describe('NEXT-45 replay JSON format and validation', () => {
  it('roundtrips schema v1, seed, arena, definitions, ticks, events and final state', () => {
    const original = sample();
    const json = serializeReplay(original);
    const parsed = parseReplay(json);
    expect(parsed.schemaVersion).toBe(1);
    expect(parsed.seed).toBe(4711);
    expect(parsed.arena).toEqual({ width: 100, height: 100 });
    expect(parsed.robotA).toEqual(original.robotA);
    expect(parsed.robotB).toEqual(original.robotB);
    expect(parsed.frames).toEqual(original.frames);
    expect(parsed.finalState).toEqual(original.finalState);
    expect(serializeReplay(parsed)).toBe(json);
    expect(Object.isFrozen(parsed.frames)).toBe(true);
  });

  it('roundtrips a zero-tick timeout and a one-tick victory', () => {
    const empty = recordMatch(RAPTOR, TITAN, 1, 0);
    expect(parseReplay(serializeReplay(empty)).frames).toHaveLength(0);
    const victory = recordMatch({ ...RAPTOR, speed: 0, weaponRange: 100, weaponDamage: 10000 }, { ...TITAN, speed: 0 }, 12);
    expect(parseReplay(serializeReplay(victory)).finalState.outcome).toBe('victory');
  });

  it('rejects unsupported versions and malformed JSON with named errors', () => {
    const doc = document();
    doc.schemaVersion = 2;
    expect(() => parseReplay(JSON.stringify(doc))).toThrow(/schemaVersion/);
    expect(() => parseReplay('{broken')).toThrow(/JSON/);
  });

  it('rejects duplicate robot IDs, invalid event references and non-consecutive ticks', () => {
    const duplicate = document();
    duplicate.robotB.id = duplicate.robotA.id;
    expect(() => parseReplay(JSON.stringify(duplicate))).toThrow(/Roboter-ID/);
    const wrongReference = document();
    wrongReference.frames[0].events[0].robotId = 'unknown';
    expect(() => parseReplay(JSON.stringify(wrongReference))).toThrow(/Roboter-ID/);
    const wrongTick = document();
    wrongTick.frames[0].tick = 3;
    expect(() => parseReplay(JSON.stringify(wrongTick))).toThrow(/Tick/);
    const wrongEventTick = document();
    wrongEventTick.frames[0].events[0].tick = 7;
    expect(() => parseReplay(JSON.stringify(wrongEventTick))).toThrow(/Tick/);
  });

  it('rejects invalid arena dimensions, state inconsistencies and nonfinite values', () => {
    const arena = document();
    arena.arena.width = -1;
    expect(() => parseReplay(JSON.stringify(arena))).toThrow(/Arena/);
    const state = document();
    state.finalState.tick += 1;
    expect(() => parseReplay(JSON.stringify(state))).toThrow(/Tick/);
    const seed = document();
    seed.seed = null;
    expect(() => parseReplay(JSON.stringify(seed))).toThrow(/Seed/);
    const energy = document();
    energy.finalState.robotA.energy = null;
    expect(() => parseReplay(JSON.stringify(energy))).toThrow(/Zahl/);
    const nonfinite = structuredClone(sample());
    nonfinite.finalState.robotA.energy = Number.POSITIVE_INFINITY;
    expect(() => serializeReplay(nonfinite)).toThrow(/Zahl/);
  });

  it('rejects mutated initial state, wrong outcome or unknown event types', () => {
    const initial = document();
    initial.initialState.tick = 1;
    expect(() => parseReplay(JSON.stringify(initial))).toThrow(/Startzustand/);
    const outcome = document();
    outcome.finalState.outcome = 'invalid';
    expect(() => parseReplay(JSON.stringify(outcome))).toThrow(/outcome/);
    const event = document();
    event.frames[0].events[0].type = 'teleport';
    expect(() => parseReplay(JSON.stringify(event))).toThrow(/Event/);
  });
});
