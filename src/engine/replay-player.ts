import type { CombatEvent } from './events';
import type { ReplayDocument } from './replay-format';

/** Event-only replay cursor. Never advances the simulation or consumes RNG. */
export class ReplayPlayer {
  private cursor = 0;
  private playing = false;

  constructor(private readonly recording: ReplayDocument) {}

  get tick(): number { return this.cursor; }
  get length(): number { return this.recording.frames.length; }
  get atEnd(): boolean { return this.cursor >= this.length; }
  get isPlaying(): boolean { return this.playing; }
  get events(): readonly CombatEvent[] {
    return this.cursor === 0 ? [] : this.recording.frames[this.cursor - 1]!.events;
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

  reset(): void { this.cursor = 0; this.playing = false; }

  get outcome(): ReplayDocument['finalState']['outcome'] | null {
    return this.atEnd ? this.recording.finalState.outcome : null;
  }
}
