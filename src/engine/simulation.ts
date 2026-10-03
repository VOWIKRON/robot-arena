import type { MatchState, RobotDefinition, RobotState, Vec2 } from './types';
import { SeededRandom } from './random';

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

function moveTowards(self: RobotState, enemy: RobotState): void {
  const dx = enemy.position.x - self.position.x;
  const dy = enemy.position.y - self.position.y;
  const len = Math.hypot(dx, dy);

  if (len === 0) return;

  const desiredDistance = self.definition.weaponRange * 0.8;

  if (len > desiredDistance) {
    const step = Math.min(self.definition.speed, len - desiredDistance);
    self.position = {
      x: self.position.x + (dx / len) * step,
      y: self.position.y + (dy / len) * step
    };
  }
}

function updateRobot(self: RobotState, enemy: RobotState, rng: SeededRandom): void {
  self.energy = Math.min(self.definition.maxEnergy, self.energy + self.definition.energyRegen);
  self.cooldown = Math.max(0, self.cooldown - 1);

  moveTowards(self, enemy);

  const inRange = distance(self.position, enemy.position) <= self.definition.weaponRange;
  const canFire = inRange && self.cooldown === 0 && self.energy >= self.definition.weaponEnergy;

  if (!canFire) return;

  self.energy -= self.definition.weaponEnergy;
  self.cooldown = self.definition.cooldownTicks;

  const jitter = 0.9 + rng.next() * 0.2;
  enemy.structure = Math.max(0, enemy.structure - self.definition.weaponDamage * jitter);
}

export function stepMatch(state: MatchState, rng: SeededRandom): MatchState {
  if (state.winner) return state;

  const next: MatchState = structuredClone(state);
  next.tick += 1;

  updateRobot(next.robotA, next.robotB, rng);
  if (next.robotB.structure > 0) {
    updateRobot(next.robotB, next.robotA, rng);
  }

  if (next.robotA.structure <= 0) next.winner = next.robotB.definition.id;
  if (next.robotB.structure <= 0) next.winner = next.robotA.definition.id;

  return next;
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
