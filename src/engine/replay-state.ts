import type { CombatEvent } from './events';
import { deepFreeze } from './recorder';
import type { ReplayDocument } from './replay-format';
import type { MatchState, RobotState } from './types';

/** Reconstruct snapshots solely from the recorded events and deterministic per-turn upkeep.
 * No RNG, movement strategy, or simulation functions are called. */
function actorId(event: CombatEvent): string {
  switch (event.type) {
    case 'move': return event.robotId;
    case 'shot': case 'hit': return event.attackerId;
    case 'damage': return event.sourceId;
    case 'victory': return event.winnerId;
  }
}

function upkeep(robot: RobotState): void {
  robot.energy = Math.min(robot.definition.maxEnergy, robot.energy + robot.definition.energyRegen);
  robot.cooldown = Math.max(0, robot.cooldown - 1);
}

function apply(state: MatchState, event: CombatEvent): void {
  const robot = (id: string): RobotState => id === state.robotA.definition.id ? state.robotA : state.robotB;
  switch (event.type) {
    case 'move':
      robot(event.robotId).position = { ...event.to };
      break;
    case 'shot': {
      const attacker = robot(event.attackerId);
      attacker.energy -= event.energyCost;
      attacker.cooldown = attacker.definition.cooldownTicks;
      break;
    }
    case 'damage': {
      const target = robot(event.targetId);
      target.structure = Math.max(0, target.structure - event.amount);
      break;
    }
    case 'victory':
      state.winner = event.winnerId;
      state.outcome = 'victory';
      state.endReason = 'destroyed';
      break;
    case 'hit':
      break;
  }
}

/** Precomputed, immutable tick states allow O(1) backward/forward seeking. */
export function reconstructReplayStates(recording: ReplayDocument): readonly MatchState[] {
  const states: MatchState[] = [deepFreeze(structuredClone(recording.initialState))];
  if (recording.frames.length === 0 && recording.finalState.outcome !== 'active') {
    states[0] = deepFreeze(structuredClone(recording.finalState));
  }
  for (const frame of recording.frames) {
    const next = structuredClone(states[states.length - 1]!);
    next.tick = frame.tick;
    for (const [self, id] of [
      [next.robotA, next.robotA.definition.id],
      [next.robotB, next.robotB.definition.id]
    ] as const) {
      if (next.outcome !== 'active' || self.structure <= 0) break;
      upkeep(self);
      for (const event of frame.events) {
        if (actorId(event) === id) apply(next, event);
      }
    }
    if (frame.tick === recording.frames.length && next.outcome === 'active' && recording.finalState.outcome === 'draw') {
      next.outcome = 'draw';
      next.endReason = 'timeout';
    }
    states.push(deepFreeze(next));
  }
  return Object.freeze(states);
}
