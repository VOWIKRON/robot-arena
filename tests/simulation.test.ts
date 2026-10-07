import { describe, expect, it } from 'vitest';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { createMatch, runMatch, stepMatch, stepMatchWithEvents } from '../src/engine/simulation';
import { SeededRandom } from '../src/engine/random';

const distance = (
  a: { x: number; y: number },
  b: { x: number; y: number }
): number => Math.hypot(a.x - b.x, a.y - b.y);

describe('simulation', () => {
  it('is deterministic for identical input', () => {
    expect(runMatch(RAPTOR, TITAN, 4711)).toEqual(runMatch(RAPTOR, TITAN, 4711));
  });


  it.each([
    { seed: 1, winner: TITAN.id, tick: 93, titanStructure: 49.814735663309655 },
    { seed: 12, winner: TITAN.id, tick: 93, titanStructure: 51.327303930744506 },
    { seed: 4711, winner: TITAN.id, tick: 93, titanStructure: 51.8481166958809 }
  ])('keeps seed $seed match outcome stable', ({ seed, winner, tick, titanStructure }) => {
    const result = runMatch(RAPTOR, TITAN, seed);
    expect(result.winner).toBe(winner);
    expect(result.tick).toBe(tick);
    expect(result.robotA.structure).toBe(0);
    expect(result.robotB.structure).toBeCloseTo(titanStructure, 10);
  });

  it('finishes without invalid numeric state', () => {
    const result = runMatch(RAPTOR, TITAN, 12);
    expect(Number.isFinite(result.robotA.structure)).toBe(true);
    expect(Number.isFinite(result.robotB.structure)).toBe(true);
    expect(result.tick).toBeLessThanOrEqual(3600);
  });

  it('creates a match with stable initial state', () => {
    const state = createMatch(RAPTOR, TITAN);

    expect(state.tick).toBe(0);
    expect(state.winner).toBeNull();
    expect(state.outcome).toBe('active');
    expect(state.endReason).toBeNull();
    expect(state.width).toBe(100);
    expect(state.height).toBe(100);
    expect(state.robotA.position).toEqual({ x: 15, y: 50 });
    expect(state.robotB.position).toEqual({ x: 85, y: 50 });
    expect(state.robotA.structure).toBe(RAPTOR.maxStructure);
    expect(state.robotB.structure).toBe(TITAN.maxStructure);
    expect(state.robotA.energy).toBe(RAPTOR.maxEnergy);
    expect(state.robotB.energy).toBe(TITAN.maxEnergy);
  });

  it('increments exactly one tick per simulation step', () => {
    const state = createMatch(RAPTOR, TITAN);
    const next = stepMatch(state, new SeededRandom(4711));

    expect(next.tick).toBe(1);
  });

  it('does not mutate the input match state', () => {
    const state = createMatch(RAPTOR, TITAN);
    const snapshot = structuredClone(state);

    stepMatch(state, new SeededRandom(4711));

    expect(state).toEqual(snapshot);
  });

  it('emits movement events with before and after positions', () => {
    const state = createMatch(RAPTOR, TITAN);
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    const moves = result.events.filter((event) => event.type === 'move');

    expect(moves).toHaveLength(2);
    expect(moves[0]).toMatchObject({
      type: 'move',
      tick: 1,
      robotId: RAPTOR.id,
      from: state.robotA.position,
      to: result.state.robotA.position
    });
    expect(moves[1]).toMatchObject({
      type: 'move',
      tick: 1,
      robotId: TITAN.id,
      from: state.robotB.position,
      to: result.state.robotB.position
    });
  });

  it('never moves a robot farther than its configured speed in one tick', () => {
    const state = createMatch(RAPTOR, TITAN);
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    const moves = result.events.filter((event) => event.type === 'move');

    for (const move of moves) {
      const robot = move.robotId === RAPTOR.id ? RAPTOR : TITAN;
      const traveled = distance(move.from, move.to);
      expect(traveled).toBeLessThanOrEqual(robot.speed + Number.EPSILON);
    }
  });

  it('movement event generation does not mutate the input state', () => {
    const state = createMatch(RAPTOR, TITAN);
    const snapshot = structuredClone(state);

    stepMatchWithEvents(state, new SeededRandom(4711));

    expect(state).toEqual(snapshot);
  });

  it('moves robots closer while they are outside desired combat distance', () => {
    const state = createMatch(RAPTOR, TITAN);
    const before = distance(state.robotA.position, state.robotB.position);
    const next = stepMatch(state, new SeededRandom(4711));
    const after = distance(next.robotA.position, next.robotB.position);

    expect(after).toBeLessThan(before);
  });



  it('keeps movement inside the arena at minimum and maximum boundaries', () => {
    const fast = { ...RAPTOR, speed: 500, weaponRange: 0 };
    const state = createMatch(fast, TITAN);
    state.robotA.position = { x: 0, y: 0 };
    state.robotB.position = { x: 100, y: 100 };
    state.robotB.cooldown = 99;
    const next = stepMatch(state, new SeededRandom(4711));
    for (const robot of [next.robotA, next.robotB]) {
      expect(robot.position.x).toBeGreaterThanOrEqual(0);
      expect(robot.position.x).toBeLessThanOrEqual(next.width);
      expect(robot.position.y).toBeGreaterThanOrEqual(0);
      expect(robot.position.y).toBeLessThanOrEqual(next.height);
    }
  });

  it('does not move robots that occupy identical positions', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 50, y: 50 };
    state.robotB.position = { x: 50, y: 50 };
    state.robotA.cooldown = 99;
    state.robotB.cooldown = 99;
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    expect(result.state.robotA.position).toEqual({ x: 50, y: 50 });
    expect(result.state.robotB.position).toEqual({ x: 50, y: 50 });
    expect(result.events.filter((event) => event.type === 'move')).toHaveLength(0);
  });

  it('emits a shot event when range, energy and cooldown allow firing', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 };
    state.robotB.position = { x: 60, y: 50 };
    state.robotB.energy = 0;
    state.robotB.cooldown = 99;

    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    const shots = result.events.filter((event) => event.type === 'shot');

    expect(shots).toContainEqual({
      type: 'shot',
      tick: 1,
      attackerId: RAPTOR.id,
      targetId: TITAN.id,
      energyCost: RAPTOR.weaponEnergy
    });
  });

  it('does not emit a shot event while target remains outside weapon range', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotB.energy = 0;
    state.robotB.cooldown = 99;

    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    const raptorShots = result.events.filter(
      (event) => event.type === 'shot' && event.attackerId === RAPTOR.id
    );

    expect(raptorShots).toHaveLength(0);
  });

  it('does not emit a shot event without enough energy', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 };
    state.robotB.position = { x: 60, y: 50 };
    state.robotA.energy = 0;
    state.robotB.energy = 0;
    state.robotB.cooldown = 99;

    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    const raptorShots = result.events.filter(
      (event) => event.type === 'shot' && event.attackerId === RAPTOR.id
    );

    expect(raptorShots).toHaveLength(0);
  });

  it('does not emit a shot event while cooldown is still active', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 };
    state.robotB.position = { x: 60, y: 50 };
    state.robotA.cooldown = 2;
    state.robotB.energy = 0;
    state.robotB.cooldown = 99;

    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    const raptorShots = result.events.filter(
      (event) => event.type === 'shot' && event.attackerId === RAPTOR.id
    );

    expect(raptorShots).toHaveLength(0);
  });


  it('fires exactly at the weapon range boundary', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 };
    state.robotB.position = { x: 40 + RAPTOR.weaponRange, y: 50 };
    state.robotB.cooldown = 99;
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    expect(result.events.some((event) => event.type === 'shot' && event.attackerId === RAPTOR.id)).toBe(true);
  });

  it('reduces cooldown before deciding whether firing is allowed', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 };
    state.robotB.position = { x: 60, y: 50 };
    state.robotA.cooldown = 1;
    state.robotB.cooldown = 99;
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    expect(result.events.some((event) => event.type === 'shot' && event.attackerId === RAPTOR.id)).toBe(true);
  });


  it('counts cooldown down over multiple ticks and fires on the first allowed tick', () => {
    let state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 };
    state.robotB.position = { x: 60, y: 50 };
    state.robotA.cooldown = 3;
    state.robotB.cooldown = 99;
    const rng = new SeededRandom(4711);

    let result = stepMatchWithEvents(state, rng);
    expect(result.state.robotA.cooldown).toBe(2);
    expect(result.events.some((event) => event.type === 'shot' && event.attackerId === RAPTOR.id)).toBe(false);

    result = stepMatchWithEvents(result.state, rng);
    expect(result.state.robotA.cooldown).toBe(1);
    expect(result.events.some((event) => event.type === 'shot' && event.attackerId === RAPTOR.id)).toBe(false);

    result = stepMatchWithEvents(result.state, rng);
    expect(result.events.some((event) => event.type === 'shot' && event.attackerId === RAPTOR.id)).toBe(true);
    expect(result.state.robotA.cooldown).toBe(RAPTOR.cooldownTicks);
  });

  it('emits separate hit and damage events after a successful shot', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 }; state.robotB.position = { x: 60, y: 50 };
    state.robotB.energy = 0; state.robotB.cooldown = 99;
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    const combat = result.events.filter((event) => event.type === 'shot' || event.type === 'hit' || event.type === 'damage');
    expect(combat.map((event) => event.type)).toEqual(['shot', 'hit', 'damage']);
    expect(combat[1]).toEqual({ type: 'hit', tick: 1, attackerId: RAPTOR.id, targetId: TITAN.id });
    expect(combat[2]).toMatchObject({ type: 'damage', tick: 1, sourceId: RAPTOR.id, targetId: TITAN.id });
  });

  it('keeps per-tick event order stable for two acting robots', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 };
    state.robotB.position = { x: 60, y: 50 };

    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    const types = result.events.map((event) => event.type);

    expect(types).toEqual(['shot', 'hit', 'damage', 'move', 'shot', 'hit', 'damage']);
    expect(result.events.slice(0, 3).every((event) =>
      event.type === 'shot' ? event.attackerId === RAPTOR.id :
      event.type === 'hit' ? event.attackerId === RAPTOR.id :
      event.type === 'damage' ? event.sourceId === RAPTOR.id : false
    )).toBe(true);
    expect(result.events.slice(4).every((event) =>
      event.type === 'shot' ? event.attackerId === TITAN.id :
      event.type === 'hit' ? event.attackerId === TITAN.id :
      event.type === 'damage' ? event.sourceId === TITAN.id : false
    )).toBe(true);
  });

  it.each([1, 12, 4711])('keeps the event stream deterministic for seed %s', (seed) => {
    const collect = () => {
      let state = createMatch(RAPTOR, TITAN);
      const rng = new SeededRandom(seed);
      const events = [];
      while (!state.winner && state.outcome === 'active' && state.tick < 3600) {
        const result = stepMatchWithEvents(state, rng);
        state = result.state;
        events.push(...result.events);
      }
      return events;
    };

    expect(collect()).toEqual(collect());
  });

  it.each([
    { seed: 1, eventCount: 98 },
    { seed: 12, eventCount: 98 },
    { seed: 4711, eventCount: 98 }
  ])('keeps event count stable for seed $seed', ({ seed, eventCount }) => {
    let state = createMatch(RAPTOR, TITAN);
    const rng = new SeededRandom(seed);
    const events = [];
    while (!state.winner && state.outcome === 'active' && state.tick < 3600) {
      const result = stepMatchWithEvents(state, rng);
      state = result.state;
      events.push(...result.events);
    }
    expect(events).toHaveLength(eventCount);
  });

  it('never emits negative damage and never reduces structure below zero', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 }; state.robotB.position = { x: 60, y: 50 };
    state.robotB.structure = 1; state.robotB.energy = 0; state.robotB.cooldown = 99;
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    const damage = result.events.find((event) => event.type === 'damage');
    expect(damage?.type).toBe('damage');
    if (damage?.type === 'damage') { expect(damage.amount).toBeGreaterThanOrEqual(0); expect(damage.amount).toBeLessThanOrEqual(1); }
    expect(result.state.robotB.structure).toBe(0);
  });

  it('keeps damage jitter deterministic for a fixed seed', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 }; state.robotB.position = { x: 60, y: 50 };
    state.robotB.energy = 0; state.robotB.cooldown = 99;
    const first = stepMatchWithEvents(state, new SeededRandom(4711));
    const second = stepMatchWithEvents(state, new SeededRandom(4711));
    const firstDamage = first.events.find((event) => event.type === 'damage');
    const secondDamage = second.events.find((event) => event.type === 'damage');
    expect(firstDamage).toEqual(secondDamage);
    if (firstDamage?.type === 'damage') expect(firstDamage.amount).toBeCloseTo(7.780831221491098, 10);
  });

  it('keeps energy within zero and configured maximum', () => {
    let state = createMatch(RAPTOR, TITAN);
    const rng = new SeededRandom(4711);

    for (let i = 0; i < 200 && !state.winner; i += 1) {
      state = stepMatch(state, rng);
      expect(state.robotA.energy).toBeGreaterThanOrEqual(0);
      expect(state.robotA.energy).toBeLessThanOrEqual(RAPTOR.maxEnergy);
      expect(state.robotB.energy).toBeGreaterThanOrEqual(0);
      expect(state.robotB.energy).toBeLessThanOrEqual(TITAN.maxEnergy);
    }
  });


  it('regenerates energy only up to the configured maximum', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.energy = RAPTOR.maxEnergy - 0.5;
    state.robotA.cooldown = 99;
    state.robotB.cooldown = 99;
    const next = stepMatch(state, new SeededRandom(4711));
    expect(next.robotA.energy).toBe(RAPTOR.maxEnergy);
  });

  it('spends weapon energy after the tick regeneration', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 };
    state.robotB.position = { x: 60, y: 50 };
    state.robotA.energy = RAPTOR.weaponEnergy;
    state.robotB.cooldown = 99;
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    expect(result.state.robotA.energy).toBeCloseTo(RAPTOR.energyRegen, 10);
  });

  it('never increases structure during combat', () => {
    let state = createMatch(RAPTOR, TITAN);
    const rng = new SeededRandom(4711);
    let previousA = state.robotA.structure;
    let previousB = state.robotB.structure;

    for (let i = 0; i < 200 && !state.winner; i += 1) {
      state = stepMatch(state, rng);
      expect(state.robotA.structure).toBeLessThanOrEqual(previousA);
      expect(state.robotB.structure).toBeLessThanOrEqual(previousB);
      previousA = state.robotA.structure;
      previousB = state.robotB.structure;
    }
  });

  it('emits victory immediately when a robot is destroyed', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 };
    state.robotB.position = { x: 60, y: 50 };
    state.robotB.structure = 1;

    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    expect(result.state.winner).toBe(RAPTOR.id);
    expect(result.events.find((event) => event.type === 'victory')).toEqual({
      type: 'victory', tick: 1, winnerId: RAPTOR.id, loserId: TITAN.id
    });
  });

  it('does not allow a destroyed robot to act later in the same tick', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 };
    state.robotB.position = { x: 60, y: 50 };
    state.robotB.structure = 1;

    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    const titanActions = result.events.filter((event) =>
      (event.type === 'move' && event.robotId === TITAN.id) ||
      (event.type === 'shot' && event.attackerId === TITAN.id) ||
      (event.type === 'hit' && event.attackerId === TITAN.id) ||
      (event.type === 'damage' && event.sourceId === TITAN.id)
    );
    expect(titanActions).toHaveLength(0);
  });

  it('freezes an already finished match including the event stream', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.winner = RAPTOR.id;
    state.outcome = 'victory';
    state.endReason = 'destroyed';
    const result = stepMatchWithEvents(state, new SeededRandom(4711));

    expect(result.state).toBe(state);
    expect(result.state.tick).toBe(0);
    expect(result.events).toEqual([]);
  });

  it('ends as an explicit draw exactly at the tick limit', () => {
    const result = runMatch(RAPTOR, TITAN, 4711, 1);
    expect(result.tick).toBe(1);
    expect(result.winner).toBeNull();
    expect(result.outcome).toBe('draw');
    expect(result.endReason).toBe('timeout');
  });

  it('allows victory on the last permitted tick before declaring a draw', () => {
    const finisher = { ...RAPTOR, weaponRange: 100, weaponDamage: 999 };
    const result = runMatch(finisher, TITAN, 4711, 1);
    expect(result.tick).toBe(1);
    expect(result.winner).toBe(finisher.id);
    expect(result.outcome).toBe('victory');
    expect(result.endReason).toBe('destroyed');
  });

  it('freezes a timeout draw on further simulation steps', () => {
    const state = runMatch(RAPTOR, TITAN, 4711, 0);
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    expect(result.state).toBe(state);
    expect(result.state.tick).toBe(0);
    expect(result.events).toEqual([]);
  });

  it('applies damage amount exactly to target structure', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 }; state.robotB.position = { x: 60, y: 50 };
    state.robotB.energy = 0; state.robotB.cooldown = 99;
    const before = state.robotB.structure;
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    const damage = result.events.find((event) => event.type === 'damage');
    if (damage?.type !== 'damage') throw new Error('damage event missing');
    expect(result.state.robotB.structure).toBeCloseTo(before - damage.amount, 10);
  });

  it('spends energy and resets cooldown exactly when a shot is emitted', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 }; state.robotB.position = { x: 60, y: 50 };
    state.robotA.energy = 50; state.robotB.cooldown = 99;
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    expect(result.events.some((event) => event.type === 'shot' && event.attackerId === RAPTOR.id)).toBe(true);
    expect(result.state.robotA.energy).toBeCloseTo(Math.min(RAPTOR.maxEnergy, 50 + RAPTOR.energyRegen) - RAPTOR.weaponEnergy, 10);
    expect(result.state.robotA.cooldown).toBe(RAPTOR.cooldownTicks);
  });

  it('does not spend weapon energy when no shot is possible', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.energy = 50; state.robotA.cooldown = 99; state.robotB.cooldown = 99;
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    expect(result.events.some((event) => event.type === 'shot')).toBe(false);
    expect(result.state.robotA.energy).toBeCloseTo(Math.min(RAPTOR.maxEnergy, 50 + RAPTOR.energyRegen), 10);
  });

  it('stops moving once desired combat distance is reached', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 50, y: 50 };
    state.robotB.position = { x: 50 + RAPTOR.weaponRange * 0.8, y: 50 };
    state.robotA.cooldown = 99; state.robotB.cooldown = 99;
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    expect(result.events.some((event) => event.type === 'move' && event.robotId === RAPTOR.id)).toBe(false);
    expect(result.state.robotA.position).toEqual(state.robotA.position);
  });

  it('keeps all emitted combat events on the current tick', () => {
    const state = createMatch(RAPTOR, TITAN);
    state.robotA.position = { x: 40, y: 50 }; state.robotB.position = { x: 60, y: 50 };
    const result = stepMatchWithEvents(state, new SeededRandom(4711));
    expect(result.events.length).toBeGreaterThan(0);
    expect(result.events.every((event) => event.tick === result.state.tick)).toBe(true);
  });

  it('never emits damage without a preceding hit from the same source to target', () => {
    let state = createMatch(RAPTOR, TITAN); const rng = new SeededRandom(4711);
    for (let i = 0; i < 120 && state.outcome === 'active'; i += 1) {
      const result = stepMatchWithEvents(state, rng);
      result.events.forEach((event, index) => {
        if (event.type !== 'damage') return;
        const hit = result.events[index - 1];
        expect(hit?.type).toBe('hit');
        if (hit?.type === 'hit') { expect(hit.attackerId).toBe(event.sourceId); expect(hit.targetId).toBe(event.targetId); }
      });
      state = result.state;
    }
  });

});
