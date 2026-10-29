import { createTournamentDefinition } from './tournament-model';
import { assertSafeTournamentInput } from './tournament-input-guard';
import { advanceTournamentRun, type TournamentRun } from './tournament-runner';
import { createRoundRobinSchedule } from './tournament-schedule';
import { createTournamentMatchResult } from './tournament-standings';
import { deepFreeze } from './immutable';

const MAX_BYTES = 2 * 1024 * 1024;
export type TournamentArchive = Readonly<{ schemaVersion: 1 | 2; run: TournamentRun }>;

/** Validates the complete prefix against the deterministic fixture order. */
export function validateTournamentArchive(input: unknown): TournamentArchive {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Turnierarchiv: Objekt erwartet');
  const archive = input as Record<string, unknown>;
  // Archive schema and combat ruleset are independent but must be explicitly paired.
  if (!Object.hasOwn(archive, 'schemaVersion')) throw new Error('Turnierarchiv: Versionsfeld fehlt');
  if (archive.schemaVersion !== 1 && archive.schemaVersion !== 2) {
    throw new Error('Turnierarchiv: ungültige Version (nicht unterstützt; nur v1/v2)');
  }
  if (!archive.run || typeof archive.run !== 'object' || Array.isArray(archive.run)) throw new Error('Turnierarchiv: Laufdaten fehlen');
  const raw = archive.run as Record<string, unknown>;
  const definition = createTournamentDefinition(raw.definition);
  if (definition.schemaVersion !== archive.schemaVersion) {
    throw new Error('Turnierarchiv: ungültige Version (Schema und Regelversion widersprechen sich)');
  }
  if (definition.format !== 'round-robin') throw new Error('Turnierarchiv: derzeit nur Round Robin unterstützt');
  const fixtures = createRoundRobinSchedule(definition);
  if (!Array.isArray(raw.results)) throw new Error('Turnierarchiv: Ergebnisse fehlen');
  if (!Number.isSafeInteger(raw.nextMatchIndex) || (raw.nextMatchIndex as number) !== raw.results.length || raw.results.length > fixtures.length) {
    throw new Error('Turnierarchiv: ungültiger Fortschritt');
  }
  const results = raw.results.map((result: unknown, index: number) => {
    const validated = createTournamentMatchResult(definition, result as TournamentRun['results'][number]);
    if (validated.matchId !== fixtures[index]!.id) throw new Error('Turnierarchiv: Ergebnisse außerhalb der Spielplanreihenfolge');
    return validated;
  });
  if (raw.totalMatches !== fixtures.length || !['ready','running','paused','cancelled','completed'].includes(raw.status as string)) {
    throw new Error('Turnierarchiv: ungültiger Status');
  }
  if (results.length === fixtures.length && raw.status !== 'completed') throw new Error('Turnierarchiv: alle Kämpfe abgeschlossen, Abschlussstatus erwartet');
  if (raw.status === 'completed' && results.length !== fixtures.length) throw new Error('Turnierarchiv: unvollständiger Abschluss');
  if (raw.status === 'ready' && results.length !== 0) throw new Error('Turnierarchiv: Bereits gestartetes Turnier');
  const run = deepFreeze({ definition, status: raw.status as TournamentRun['status'], nextMatchIndex: results.length, totalMatches: fixtures.length, results });
  return deepFreeze({ schemaVersion: definition.schemaVersion, run });
}
export function exportTournamentRun(run: TournamentRun): string {
  return JSON.stringify(validateTournamentArchive({ schemaVersion: run.definition.schemaVersion, run }));
}
export function importTournamentRun(json: string, uiSchemaVersion: 1 | null = null): TournamentRun {
  if (new TextEncoder().encode(json).length > MAX_BYTES) throw new Error('Turnierarchiv: Datei zu groß');
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch {
    throw new Error('Turnierarchiv: beschädigtes JSON');
  }
  assertSafeTournamentInput(parsed);
  // Browser v1 replay and autosave cannot safely consume v2 event streams yet.
  // Engine-level import supports both versions; UI explicitly opts into v1 only.
  if (uiSchemaVersion === 1 &&
      (!parsed || typeof parsed !== 'object' || Array.isArray(parsed) ||
       (parsed as Record<string, unknown>).schemaVersion !== 1)) {
    throw new Error('Turnierarchiv: ungültige Version (Browser unterstützt derzeit nur v1)');
  }
  return validateTournamentArchive(parsed).run;
}
/** Imported paused/running tournaments resume from the next match boundary. */
export function continueImportedTournament(run: TournamentRun): TournamentRun {
  const validated = validateTournamentArchive({ schemaVersion: run.definition.schemaVersion, run }).run;
  if (validated.status === 'cancelled' || validated.status === 'completed') return validated;
  const running = validated.status === 'paused' ? deepFreeze({ ...validated, status: 'running' as const }) : validated;
  return advanceTournamentRun(running);
}
