import type { MatchRecording } from './recorder';
import { parseReplay, serializeReplay, type ReplayDocument } from './replay-format';

export const MAX_REPLAY_BYTES = 2_000_000;

export type ReplayFile = Pick<File, 'name' | 'size' | 'text'>;

/** Stable name; no local clock, locale, or randomness. */
export function replayFilename(recording: MatchRecording): string {
  return `robot-arena-replay-seed-${recording.seed}-tick-${recording.finalState.tick}.json`;
}

/** Reject before reading to avoid oversized imports; parsing never mutates the current match. */
export async function readReplayFile(file: ReplayFile): Promise<ReplayDocument> {
  if (!/\.json$/i.test(file.name)) throw new Error('Bitte eine .json-Replay-Datei auswählen.');
  if (!Number.isFinite(file.size) || file.size > MAX_REPLAY_BYTES) throw new Error('Replay-Datei darf höchstens 2 MB groß sein.');
  const json = await file.text();
  if (new TextEncoder().encode(json).length > MAX_REPLAY_BYTES) throw new Error('Replay-Datei darf höchstens 2 MB groß sein.');
  return parseReplay(json);
}

/** Browser download, without network calls or modifying match state. */
export function downloadReplay(recording: MatchRecording): void {
  const json = serializeReplay(recording);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = replayFilename(recording);
  anchor.hidden = true;
  document.body.append(anchor);
  try { anchor.click(); }
  finally {
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
