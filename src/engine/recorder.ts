import type { CombatEvent } from './events';
import { deepFreeze } from './immutable';
export { deepFreeze } from './immutable';
import { SeededRandom } from './random';
import { createMatch, stepMatchWithEvents, type StepResult } from './simulation';
import type { MatchState, RobotDefinition } from './types';

export type RecordedFrame = Readonly<{
  tick: number;
  events: readonly CombatEvent[];
}>;

export type MatchRecording = Readonly<{
  seed: number;
  robotA: RobotDefinition;
  robotB: RobotDefinition;
  initialState: MatchState;
  frames: readonly RecordedFrame[];
  finalState: MatchState;
}>;

/** Records immutable event snapshots without changing the engine or consuming RNG. */
export class EventRecorder {
  private readonly seed: number;
  private readonly initialState: MatchState;
  private readonly frames: RecordedFrame[] = [];
  private lastState: MatchState;
  private completed = false;

  constructor(robotA: RobotDefinition, robotB: RobotDefinition, seed: number) {
    if (!Number.isSafeInteger(seed)) throw new RangeError('Seed muss eine ganze, sichere Zahl sein');
    this.seed = seed;
    this.initialState = structuredClone(createMatch(robotA, robotB));
    this.lastState = structuredClone(this.initialState);
  }

  append(result: StepResult): void {
    if (this.completed || this.lastState.outcome !== 'active') throw new Error('Aufzeichnung bereits abgeschlossen');
    if (result.state.tick !== this.lastState.tick + 1) throw new Error('Tick nicht fortlaufend');
    if (result.events.some(event => event.tick !== result.state.tick)) throw new Error('Event-Tick stimmt nicht überein');
    this.frames.push({ tick: result.state.tick, events: structuredClone(result.events) });
    this.lastState = structuredClone(result.state);
  }

  /** An immutable preview for export, without closing the live recording. */
  snapshot(finalState: MatchState = this.lastState): MatchRecording {
    if (finalState.tick !== this.lastState.tick) throw new Error('Abschluss-Tick stimmt nicht überein');
    const recording: MatchRecording = {
      seed: this.seed,
      robotA: structuredClone(this.initialState.robotA.definition),
      robotB: structuredClone(this.initialState.robotB.definition),
      initialState: structuredClone(this.initialState),
      frames: structuredClone(this.frames),
      finalState: structuredClone(finalState)
    };
    return deepFreeze(recording);
  }

  finish(finalState: MatchState = this.lastState): MatchRecording {
    if (this.completed) throw new Error('Aufzeichnung bereits abgeschlossen');
    const recording = this.snapshot(finalState);
    this.completed = true;
    return recording;
  }
}

/** A deterministic recording of the same simulation used by runMatch. */
export function recordMatch(robotA: RobotDefinition, robotB: RobotDefinition, seed: number, maxTicks = 3600): MatchRecording {
  if (!Number.isSafeInteger(maxTicks) || maxTicks < 0) throw new RangeError('maxTicks muss eine nichtnegative ganze Zahl sein');
  const recorder = new EventRecorder(robotA, robotB, seed);
  const rng = new SeededRandom(seed);
  let state = createMatch(robotA, robotB);
  while (state.outcome === 'active' && state.tick < maxTicks) {
    const result = stepMatchWithEvents(state, rng);
    recorder.append(result);
    state = result.state;
  }
  if (state.outcome === 'active' && state.tick >= maxTicks) {
    state = { ...structuredClone(state), outcome: 'draw', endReason: 'timeout' };
  }
  return recorder.finish(state);
}
