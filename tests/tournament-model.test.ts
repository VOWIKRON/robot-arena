import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { createTournamentDefinition, parseTournamentDefinition, serializeTournamentDefinition } from '../src/engine/tournament-model';

const make = (participants: unknown[] = [RAPTOR, TITAN]) => ({
  schemaVersion: 1, id: 'cup-1', format: 'round-robin', baseSeed: 4711, maxTicks: 3600, participants
});

describe('NEXT-52 tournament model, validation and serialization', () => {
  it('returns immutable independent snapshots and deterministic JSON roundtrips', () => {
    const input = make();
    const before = structuredClone(input);
    const model = createTournamentDefinition(input);
    expect(input).toEqual(before);
    expect(Object.isFrozen(model)).toBe(true);
    expect(Object.isFrozen(model.participants)).toBe(true);
    expect(Object.isFrozen(model.participants[0])).toBe(true);
    expect(parseTournamentDefinition(serializeTournamentDefinition(model))).toEqual(model);
    expect(serializeTournamentDefinition(parseTournamentDefinition(serializeTournamentDefinition(model))))
      .toBe(serializeTournamentDefinition(model));
  });

  it('accepts 2 and 16 participants and both tournament formats', () => {
    const sixteen = Array.from({ length: 16 }, (_, i) => ({ ...RAPTOR, id: `r${i}`, name: `Robot ${i}` }));
    expect(createTournamentDefinition(make(sixteen)).participants).toHaveLength(16);
    expect(createTournamentDefinition({ ...make(), format: 'knockout' }).format).toBe('knockout');
  });

  it('rejects 1/17 participants, duplicates and malformed definitions', () => {
    expect(() => createTournamentDefinition(make([RAPTOR]))).toThrow(/2 bis 16/);
    const seventeen = Array.from({ length: 17 }, (_, i) => ({ ...RAPTOR, id: `r${i}` }));
    expect(() => createTournamentDefinition(make(seventeen))).toThrow(/2 bis 16/);
    expect(() => createTournamentDefinition(make([RAPTOR, { ...TITAN, id: RAPTOR.id }]))).toThrow(/doppelte/);
    expect(() => createTournamentDefinition(make([RAPTOR, { ...TITAN, weaponDamage: Infinity }]))).toThrow(/ungültige Zahl/);
    expect(() => createTournamentDefinition(make([RAPTOR, { ...TITAN, strategy: 'unknown' }]))).toThrow(/Strategie/);
    expect(() => createTournamentDefinition(make([RAPTOR, { ...TITAN, strategyParameters: { energyReserveRatio: 2 } }]))).toThrow(/Energiereserve/);
  });

  it('rejects invalid seed, ticks, IDs, schema and format', () => {
    for (const value of [-1, 1.2, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
      expect(() => createTournamentDefinition({ ...make(), baseSeed: value })).toThrow(/Seed/);
    }
    for (const value of [0, -1, 3601, NaN]) {
      expect(() => createTournamentDefinition({ ...make(), maxTicks: value })).toThrow(/maxTicks/);
    }
    expect(() => createTournamentDefinition({ ...make(), id: '  ' })).toThrow(/Turnier-ID/);
    expect(() => createTournamentDefinition({ ...make(), schemaVersion: 2 })).toThrow(/schemaVersion/);
    expect(() => createTournamentDefinition({ ...make(), format: 'other' })).toThrow(/Turnierformat/);
    expect(() => parseTournamentDefinition('{broken')).toThrow();
  });
});
