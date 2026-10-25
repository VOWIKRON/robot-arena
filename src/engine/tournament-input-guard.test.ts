import { describe, expect, it } from 'vitest';
import { assertSafeTournamentInput } from './tournament-input-guard';
import { createTournamentDefinition, parseTournamentDefinition } from './tournament-model';
import { importTournamentRun, exportTournamentRun } from './tournament-archive';
import { createTournamentRun } from './tournament-runner';
import { RAPTOR, TITAN } from './presets';

const definition = () => createTournamentDefinition({
  schemaVersion: 1, id: 'safe', format: 'round-robin', baseSeed: 4711, maxTicks: 10,
  participants: [{ ...RAPTOR, id: 'a' }, { ...TITAN, id: 'b' }]
});

describe('NEXT-74: bounded tournament import validation', () => {
  it('preserves valid deterministic tournament archives', () => {
    const run = createTournamentRun(definition());
    expect(importTournamentRun(exportTournamentRun(run))).toEqual(run);
  });

  it.each(['__proto__', 'constructor', 'prototype'])('rejects dangerous nested key %s', key => {
    const malicious = JSON.parse('{"nested":{"' + key + '":{"polluted":true}}}');
    expect(() => assertSafeTournamentInput(malicious)).toThrow(/gefährlicher Objektschlüssel/);
    const archive = JSON.parse(exportTournamentRun(createTournamentRun(definition())));
    archive.extra = malicious;
    expect(() => importTournamentRun(JSON.stringify(archive))).toThrow(/gefährlicher Objektschlüssel/);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it('rejects excessive nesting, oversized arrays and non-finite numbers', () => {
    let deep: unknown = 0;
    for (let index = 0; index < 40; index++) deep = { child: deep };
    expect(() => assertSafeTournamentInput(deep)).toThrow(/Verschachtelung/);
    expect(() => assertSafeTournamentInput(Array(2049).fill(0))).toThrow(/Array zu groß/);
    expect(() => assertSafeTournamentInput({ score: Infinity })).toThrow(/nicht endliche Zahl/);
    expect(() => assertSafeTournamentInput({ score: NaN })).toThrow(/nicht endliche Zahl/);
  });

  it('rejects cyclic, accessor and class-instance inputs without invoking getters', () => {
    const cyclic: { self?: unknown } = {};
    cyclic.self = cyclic;
    expect(() => assertSafeTournamentInput(cyclic)).toThrow(/zyklische/);
    let called = false;
    const getter = Object.defineProperty({}, 'unsafe', { enumerable: true, get() { called = true; return 1; } });
    expect(() => assertSafeTournamentInput(getter)).toThrow(/Getter\/Setter/);
    expect(called).toBe(false);
    expect(() => assertSafeTournamentInput(new Date())).toThrow(/JSON-Objekte/);
  });

  it('rejects duplicate participant IDs and oversized definition text', () => {
    const duplicate = { schemaVersion: 1, id: 'duplicate', format: 'round-robin',
      baseSeed: 1, maxTicks: 10, participants: [{ ...RAPTOR, id: 'same' }, { ...TITAN, id: 'same' }] };
    expect(() => createTournamentDefinition(duplicate)).toThrow(/doppelte Teilnehmer-ID/);
    expect(() => parseTournamentDefinition(' '.repeat(2 * 1024 * 1024 + 1))).toThrow(/zu groß/);
  });

  it('keeps original valid run unchanged when hostile import is rejected', () => {
    const run = createTournamentRun(definition());
    const before = exportTournamentRun(run);
    const invalid = JSON.parse(before);
    invalid.extra = { nested: JSON.parse('{"__proto__":{"polluted":true}}') };
    expect(() => importTournamentRun(JSON.stringify(invalid))).toThrow();
    expect(exportTournamentRun(run)).toBe(before);
  });
});
