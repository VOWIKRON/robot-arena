import type { CombatEvent } from './events';
import type { ReplayDocument } from './replay-format';
import type { ReplayDocumentV2 } from './replay-v2';
import { reconstructReplayStatesV2 } from './replay-v2';
import { reconstructReplayStates } from './replay-state';
import type { MatchState } from './types';

/** Event-only replay cursor. Never advances the simulation or consumes RNG. */
export class ReplayPlayer {
  private cursor = 0;
  private playing = false;

  private readonly snapshots: readonly MatchState[];

  constructor(private readonly recording: ReplayDocument | ReplayDocumentV2) {
    this.snapshots = recording.schemaVersion === 2
      ? reconstructReplayStatesV2(recording)
      : reconstructReplayStates(recording);
  }

  get tick(): number { return this.cursor; }
  get state(): Readonly<MatchState> { return this.snapshots[this.cursor]!; }
  get length(): number { return this.recording.frames.length; }
  get atEnd(): boolean { return this.cursor >= this.length; }
  get isPlaying(): boolean { return this.playing; }
  get events(): readonly CombatEvent[] {
    if (this.cursor === 0) return [];
    if (this.recording.schemaVersion === 1) return this.recording.frames[this.cursor - 1]!.events;
    // v2 terminal draw is reflected in state/outcome; legacy event renderers remain v1-safe.
    return this.recording.frames[this.cursor - 1]!.events.filter(
      (event): event is CombatEvent => event.type !== 'draw');
  }

  /** Returns false for an empty or finished recording. */
  play(): boolean {
    if (this.atEnd) { this.playing = false; return false; }
    this.playing = true;
    return true;
  }

  pause(): void { this.playing = false; }

  /** Manual step works while paused; no simulation or random number generator. */
  step(): boolean {
    if (this.atEnd) { this.playing = false; return false; }
    this.cursor++;
    if (this.atEnd) this.playing = false;
    return true;
  }

  /** Timer-friendly step; does nothing when paused. */
  advance(): boolean {
    return this.playing ? this.step() : false;
  }

  /** Seek is bounded, deterministic and pauses playback; invalid input never changes state. */
  seek(tick: number): void {
    if (!Number.isSafeInteger(tick) || tick < 0 || tick > this.length) {
      throw new RangeError('Replay-Tick außerhalb der Aufzeichnung');
    }
    this.cursor = tick;
    this.playing = false;
  }

  reset(): void { this.seek(0); }

  get outcome(): ReplayDocument['finalState']['outcome'] | null {
    return this.atEnd ? this.recording.finalState.outcome : null;
  }
}
