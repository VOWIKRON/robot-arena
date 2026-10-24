import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { recordMatch } from '../src/engine/recorder';
import { parseReplay, serializeReplay } from '../src/engine/replay-format';
import { analyzeReplay } from '../src/engine/replay-stats';

const document = (ticks: number) => parseReplay(serializeReplay(recordMatch(RAPTOR, TITAN, 4711, ticks)));

describe('NEXT-49 pure replay statistics', () => {
  it('reports zeros for empty replay without mutating input', () => {
    const replay = document(0);
    const before = JSON.stringify(replay);
    const stats = analyzeReplay(replay);
    expect(stats.ticks).toBe(0);
    expect(stats.robotA).toMatchObject({ shots: 0, hits: 0, effectiveDamage: 0, energySpent: 0 });
    expect(stats.robotB).toMatchObject({ shots: 0, hits: 0, effectiveDamage: 0, energySpent: 0 });
    expect(stats.outcome).toBe('draw');
    expect(JSON.stringify(replay)).toBe(before);
    expect(Object.isFrozen(stats.robotA)).toBe(true);
  });

  it('counts a single immediate victory shot, hit, effective damage and energy cost', () => {
    const a = { ...RAPTOR, speed: 0, weaponRange: 100, weaponDamage: 10000 };
    const b = { ...TITAN, speed: 0 };
    const replay = parseReplay(serializeReplay(recordMatch(a, b, 12, 3600)));
    const stats = analyzeReplay(replay);
    expect(stats.ticks).toBe(1);
    expect(stats.outcome).toBe('victory');
    expect(stats.winner).toBe(a.id);
    expect(stats.robotA.shots).toBe(1);
    expect(stats.robotA.hits).toBe(1);
    expect(stats.robotA.energySpent).toBe(a.weaponEnergy);
    expect(stats.robotA.effectiveDamage).toBe(b.maxStructure);
    expect(stats.robotB.shots).toBe(0);
  });

  it('ignores duplicate shot/hit/damage events in one tick and caps overkill', () => {
    const a = { ...RAPTOR, speed: 0, weaponRange: 100, weaponDamage: 10000 };
    const b = { ...TITAN, speed: 0 };
    const raw = JSON.parse(serializeReplay(recordMatch(a, b, 12, 3600)));
    const events = raw.frames[0].events as Array<Record<string, unknown>>;
    const baseline = analyzeReplay(parseReplay(JSON.stringify(raw)));
    for (const event of [...events]) events.push({ ...event });
    const doubled = analyzeReplay(parseReplay(JSON.stringify(raw)));
    expect(doubled).toEqual(baseline);
    const damage = events.find(e => e.type === 'damage')!;
    damage.amount = 100000;
    const overkill = analyzeReplay(parseReplay(JSON.stringify(raw)));
    expect(overkill.robotA.effectiveDamage).toBe(b.maxStructure);
    expect(overkill.robotA.shots).toBe(1);
    expect(overkill.robotA.hits).toBe(1);
  });

  it('handles 3600-tick timeout without phantom hits or energy spending', () => {
    const a = { ...RAPTOR, speed: 0, weaponRange: 0, weaponDamage: 0 };
    const b = { ...TITAN, speed: 0, weaponRange: 0, weaponDamage: 0 };
    const stats = analyzeReplay(parseReplay(serializeReplay(recordMatch(a, b, 4711, 3600))));
    expect(stats.ticks).toBe(3600);
    expect(stats.outcome).toBe('draw');
    expect(stats.winner).toBeNull();
    for (const side of [stats.robotA, stats.robotB]) {
      expect(side.shots).toBe(0);
      expect(side.hits).toBe(0);
      expect(side.effectiveDamage).toBe(0);
      expect(side.energySpent).toBe(0);
    }
  });

  it.each([1, 12, 4711])('produces repeatable stats for seed %i', seed => {
    const first = parseReplay(serializeReplay(recordMatch(RAPTOR, TITAN, seed, 120)));
    const second = parseReplay(serializeReplay(recordMatch(RAPTOR, TITAN, seed, 120)));
    expect(analyzeReplay(first)).toEqual(analyzeReplay(second));
  });
});
