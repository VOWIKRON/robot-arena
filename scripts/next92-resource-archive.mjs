import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const EXPECTED_SIZES = [2, 4, 8, 16];
const SCENARIO = 'round-robin-fixed-seed-24ticks';
const MAX_BYTES = 32 * 1024;
const FIXTURE_PATTERN = /^tests\/fixtures\/next(?:90|92)-ci-(\d+)\.json$/;

/** Read-only archive verification. ZIP extraction and external HTTP are intentionally absent. */
export async function verifyResourceArchive(manifest, { readBytes = readFile } = {}) {
  if (!manifest || manifest.schemaVersion !== 1 || !Array.isArray(manifest.records) ||
      manifest.records.length < 2 || manifest.records.length > 50) {
    throw new Error('Invalid resource archive manifest');
  }
  const seenArtifacts = new Set();
  let previousRun = 0;
  const checked = [];
  for (const record of manifest.records) {
    if (!record || !Number.isSafeInteger(record.runId) || record.runId <= previousRun ||
        !Number.isSafeInteger(record.artifactId) || record.artifactId <= 0 ||
        seenArtifacts.has(record.artifactId) ||
        typeof record.commit !== 'string' || !/^[0-9a-f]{40}$/.test(record.commit) ||
        record.workflow !== 'Development Tests' || record.conclusion !== 'success' ||
        typeof record.file !== 'string' ||
        FIXTURE_PATTERN.exec(record.file)?.[1] !== String(record.runId) ||
        !Number.isSafeInteger(record.bytes) || record.bytes < 1 || record.bytes > MAX_BYTES ||
        typeof record.sha256 !== 'string' || !/^[0-9a-f]{64}$/.test(record.sha256)) {
      throw new Error('Invalid, duplicate or out-of-order resource provenance');
    }
    seenArtifacts.add(record.artifactId);
    previousRun = record.runId;
    const raw = await readBytes(record.file);
    if (!Buffer.isBuffer(raw) && !(raw instanceof Uint8Array)) throw new Error('Resource fixture must be raw bytes');
    if (raw.byteLength !== record.bytes || raw.byteLength > MAX_BYTES) throw new Error('Resource fixture size mismatch');
    if (createHash('sha256').update(raw).digest('hex') !== record.sha256) {
      throw new Error('Resource fixture SHA-256 mismatch');
    }
    let report;
    try { report = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(raw)); }
    catch { throw new Error('Resource fixture is not valid UTF-8 JSON'); }
    if (!report || report.schemaVersion !== 1 || report.scenario !== SCENARIO ||
        !Array.isArray(report.samples) || report.samples.length !== EXPECTED_SIZES.length) {
      throw new Error('Incompatible resource report schema or scenario');
    }
    for (let i = 0; i < EXPECTED_SIZES.length; i++) {
      const s = report.samples[i];
      const participants = EXPECTED_SIZES[i];
      const matches = participants * (participants - 1) / 2;
      if (!s || s.participants !== participants || s.matches !== matches || s.ticks !== matches * 24 ||
          !Number.isSafeInteger(s.archiveBytes) || s.archiveBytes < 1 ||
          !Number.isFinite(s.elapsedMs) || s.elapsedMs < 0 ||
          !Number.isSafeInteger(s.heapDeltaBytes)) {
        throw new Error('Invalid or inconsistent resource report samples');
      }
    }
    checked.push(Object.freeze({ runId: record.runId, artifactId: record.artifactId,
      commit: record.commit, sha256: record.sha256, report }));
  }
  return Object.freeze(checked);
}

export async function verifyCheckedInResourceArchive() {
  const root = new URL('../', import.meta.url);
  const manifest = JSON.parse(await readFile(new URL('tests/fixtures/resource-artifacts-manifest.json', root), 'utf8'));
  return verifyResourceArchive(manifest, { readBytes: file => readFile(new URL(file, root)) });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    const checked = await verifyCheckedInResourceArchive();
    console.log(`Verified ${checked.length} archived CI reports: ${checked.map(x => x.runId).join(', ')}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
