import type { MatchState, RobotDefinition, RobotState, Vec2 } from './types';
import type { CombatEvent, MoveEvent } from './events';
import { createMoveEvent, createShotEvent } from './events';
import { SeededRandom } from './random';

export type StepResult = Readonly<{
  state: MatchState;
  events: readonly CombatEvent[];
}>;

const distance = (a: Vec2, b: Vec2): number => Math.hypot(a.x - b.x, a.y - b.y);

function createRobot(definition: RobotDefinition, position: Vec2): RobotState {
  return {
    definition,
    position,
    structure: definition.maxStructure,
    energy: definition.maxEnergy,
    cooldown: 0
  };
}

export function createMatch(robotA: RobotDefinition, robotB: RobotDefinition): MatchState {
  return {
    tick: 0,
    width: 100,
    height: 100,
    robotA: createRobot(robotA, { x: 15, y: 50 }),
    robotB: createRobot(robotB, { x: 85, y: 50 }),
    winner: null
  };
}

function moveTowards(self: RobotState, enemy: RobotState, tick: number): MoveEvent | null {
  const dx = enemy.position.x - self.position.x;
  const dy = enemy.position.y - self.position.y;
  const len = Math.hypot(dx, dy);

  if (len === 0) return null;

  const desiredDistance = self.definition.weaponRange * 0.8;

  if (len <= desiredDistance) return null;

  const from = self.position;
  const step = Math.min(self.definition.speed, len - desiredDistance);
  const to = {
    x: self.position.x + (dx / len) * step,
    y: self.position.y + (dy / len) * step
  };

  self.position = to;
  return createMoveEvent(tick, self.definition.id, from, to);
}

function updateRobot(
  self: RobotState,
  enemy: RobotState,
  rng: SeededRandom,
  tick: number,
  events: CombatEvent[]
): void {
  self.energy = Math.min(self.definition.maxEnergy, self.energy + self.definition.energyRegen);
  self.cooldown = Math.max(0, self.cooldown - 1);

  const moveEvent = moveTowards(self, enemy, tick);
  if (moveEvent) events.push(moveEvent);

  const inRange = distance(self.position, enemy.position) <= self.definition.weaponRange;
  const canFire = inRange && self.cooldown === 0 && self.energy >= self.definition.weaponEnergy;

  if (!canFire) return;

  self.energy -= self.definition.weaponEnergy;
  self.cooldown = self.definition.cooldownTicks;
  events.push(
    createShotEvent(
      tick,
      self.definition.id,
      enemy.definition.id,
      self.definition.weaponEnergy
    )
  );

  const jitter = 0.9 + rng.next() * 0.2;
  enemy.structure = Math.max(0, enemy.structure - self.definition.weaponDamage * jitter);
}

export function stepMatchWithEvents(state: MatchState, rng: SeededRandom): StepResult {
  if (state.winner) return { state, events: [] };

  const next: MatchState = structuredClone(state);
  const events: CombatEvent[] = [];
  next.tick += 1;

  updateRobot(next.robotA, next.robotB, rng, next.tick, events);
  if (next.robotB.structure > 0) {
    updateRobot(next.robotB, next.robotA, rng, next.tick, events);
  }

  if (next.robotA.structure <= 0) next.winner = next.robotB.definition.id;
  if (next.robotB.structure <= 0) next.winner = next.robotA.definition.id;

  return { state: next, events };
}

export function stepMatch(state: MatchState, rng: SeededRandom): MatchState {
  return stepMatchWithEvents(state, rng).state;
}

export function runMatch(
  robotA: RobotDefinition,
  robotB: RobotDefinition,
  seed: number,
  maxTicks = 3600
): MatchState {
  let state = createMatch(robotA, robotB);
  const rng = new SeededRandom(seed);

  while (!state.winner && state.tick < maxTicks) {
    state = stepMatch(state, rng);
  }

  return state;
}
