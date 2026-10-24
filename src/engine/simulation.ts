import type { MatchState, RobotDefinition, RobotState, Vec2 } from './types';
import type { CombatEvent, MoveEvent } from './events';
import { createDamageEvent, createHitEvent, createMoveEvent, createShotEvent, createVictoryEvent } from './events';
import { SeededRandom } from './random';
import { nextCombatPosition } from './movement';
import { strategyParameters } from './strategy-config';

export type StepResult = Readonly<{ state: MatchState; events: readonly CombatEvent[]; }>;
const distance = (a: Vec2, b: Vec2): number => Math.hypot(a.x - b.x, a.y - b.y);

function createRobot(definition: RobotDefinition, position: Vec2): RobotState {
  return { definition, position, structure: definition.maxStructure, energy: definition.maxEnergy, cooldown: 0 };
}
export function createMatch(robotA: RobotDefinition, robotB: RobotDefinition): MatchState {
  return { tick: 0, width: 100, height: 100, robotA: createRobot(robotA,{x:15,y:50}), robotB: createRobot(robotB,{x:85,y:50}), winner: null, outcome: 'active', endReason: null };
}
function moveRobot(self: RobotState, enemy: RobotState, tick: number, width: number, height: number): MoveEvent | null {
  const to = nextCombatPosition(self, enemy, width, height);
  if (!to) return null;
  const from = self.position;
  self.position = to;
  return createMoveEvent(tick, self.definition.id, from, to);
}
function canFire(self: RobotState, enemy: RobotState): boolean {
  const reserve = self.definition.maxEnergy * strategyParameters(self.definition.strategy, self.definition.strategyParameters).energyReserveRatio;
  return distance(self.position,enemy.position)<=self.definition.weaponRange
    && self.cooldown===0
    && self.energy>=self.definition.weaponEnergy + reserve;
}
function prepareAction(self: RobotState, enemy: RobotState, tick: number, events: CombatEvent[], width: number, height: number): void {
  self.energy=Math.min(self.definition.maxEnergy,self.energy+self.definition.energyRegen);
  self.cooldown=Math.max(0,self.cooldown-1);
  const moveEvent=moveRobot(self,enemy,tick,width,height);
  if (moveEvent) events.push(moveEvent);
}
function fire(self: RobotState, enemy: RobotState, rng: SeededRandom, tick: number, events: CombatEvent[]): void {
  self.energy-=self.definition.weaponEnergy;
  self.cooldown=self.definition.cooldownTicks;
  events.push(createShotEvent(tick,self.definition.id,enemy.definition.id,self.definition.weaponEnergy));
  events.push(createHitEvent(tick,self.definition.id,enemy.definition.id));
  const jitter=0.9+rng.next()*0.2;
  const rawDamage=Math.max(0,self.definition.weaponDamage*jitter);
  const appliedDamage=Math.min(enemy.structure,rawDamage);
  enemy.structure=Math.max(0,enemy.structure-appliedDamage);
  events.push(createDamageEvent(tick,self.definition.id,enemy.definition.id,appliedDamage));
}
function updateRobot(self: RobotState, enemy: RobotState, rng: SeededRandom, tick: number, events: CombatEvent[], width: number, height: number): void {
  if (self.structure<=0) return;
  prepareAction(self,enemy,tick,events,width,height);
  if (!canFire(self,enemy)) return;
  fire(self,enemy,rng,tick,events);
}
function finishIfDestroyed(winner: RobotState, loser: RobotState, state: MatchState, events: CombatEvent[]): boolean {
  if (loser.structure>0) return false;
  state.winner=winner.definition.id;
  state.outcome='victory';
  state.endReason='destroyed';
  events.push(createVictoryEvent(state.tick,winner.definition.id,loser.definition.id));
  return true;
}
export function stepMatchWithEvents(state: MatchState, rng: SeededRandom): StepResult {
  if (state.outcome!=='active') return {state,events:[]};
  const next: MatchState=structuredClone(state), events: CombatEvent[]=[]; next.tick+=1;
  updateRobot(next.robotA,next.robotB,rng,next.tick,events,next.width,next.height);
  if (finishIfDestroyed(next.robotA,next.robotB,next,events)) return {state:next,events};
  updateRobot(next.robotB,next.robotA,rng,next.tick,events,next.width,next.height);
  finishIfDestroyed(next.robotB,next.robotA,next,events);
  return {state:next,events};
}
export function stepMatch(state: MatchState, rng: SeededRandom): MatchState { return stepMatchWithEvents(state,rng).state; }
export function runMatch(robotA: RobotDefinition, robotB: RobotDefinition, seed: number, maxTicks=3600): MatchState {
  let state=createMatch(robotA,robotB); const rng=new SeededRandom(seed);
  while(state.outcome==='active'&&state.tick<maxTicks) state=stepMatch(state,rng);
  if (state.outcome==='active'&&state.tick>=maxTicks) {
    state=structuredClone(state);
    state.outcome='draw';
    state.endReason='timeout';
  }
  return state;
}
