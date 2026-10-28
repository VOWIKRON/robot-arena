import type { ReplayDocument } from './replay-format';
import type { ReplayDocumentV2 } from './replay-v2';

export type RobotReplayStatistics = Readonly<{
  id: string;
  name: string;
  shots: number;
  hits: number;
  effectiveDamage: number;
  energySpent: number;
}>;
export type ReplayStatistics = Readonly<{
  robotA: RobotReplayStatistics;
  robotB: RobotReplayStatistics;
  ticks: number;
  outcome: ReplayDocument['finalState']['outcome'];
  winner: string | null;
}>;

/** Pure event analysis. Deduplicates same-type actor/target events per tick and
 * clamps effective damage to the victim's remaining recorded structure. */
export function analyzeReplay(recording: ReplayDocument | ReplayDocumentV2): ReplayStatistics {
  const mutable = [recording.robotA, recording.robotB].map(def => ({
    id: def.id, name: def.name, shots: 0, hits: 0, effectiveDamage: 0, energySpent: 0
  }));
  const byId = new Map(mutable.map(stats => [stats.id, stats]));
  const remaining = new Map([
    [recording.robotA.id, recording.initialState.robotA.structure],
    [recording.robotB.id, recording.initialState.robotB.structure]
  ]);
  for (const frame of recording.frames) {
    const seen = new Set<string>();
    for (const event of frame.events) {
      if (event.type !== 'shot' && event.type !== 'hit' && event.type !== 'damage') continue;
      const actor = event.type === 'damage' ? event.sourceId : event.attackerId;
      const target = event.targetId;
      const key = `${event.type}:${actor}:${target}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const stats = byId.get(actor);
      if (!stats) continue;
      if (event.type === 'shot') {
        stats.shots++;
        stats.energySpent += Math.max(0, event.energyCost);
      } else if (event.type === 'hit') {
        stats.hits++;
      } else {
        const applied = Math.min(Math.max(0, event.amount), Math.max(0, remaining.get(target) ?? 0));
        stats.effectiveDamage += applied;
        remaining.set(target, Math.max(0, (remaining.get(target) ?? 0) - applied));
      }
    }
  }
  return Object.freeze({
    robotA: Object.freeze({ ...mutable[0]! }),
    robotB: Object.freeze({ ...mutable[1]! }),
    ticks: recording.frames.length,
    outcome: recording.finalState.outcome,
    winner: recording.finalState.winner
  });
}
