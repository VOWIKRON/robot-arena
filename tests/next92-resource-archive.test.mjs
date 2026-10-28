import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { verifyResourceArchive, verifyCheckedInResourceArchive } from '../scripts/next92-resource-archive.mjs';

const manifest = JSON.parse(await readFile(new URL('./fixtures/resource-artifacts-manifest.json', import.meta.url), 'utf8'));
const readBytes = file => readFile(new URL('../' + file, import.meta.url));
const verify = (records, reader = readBytes) => verifyResourceArchive({ ...manifest, records }, { readBytes: reader });
const clone = () => structuredClone(manifest.records);

test('NEXT-92: three real CI JSON fixtures pass byte-for-byte SHA-256, provenance and scenario checks', async () => {
  const runs = await verifyCheckedInResourceArchive();
  assert.deepEqual(runs.map(r => r.runId), [40266761987, 40267008446, 40355252200]);
  assert.deepEqual(runs.map(r => r.report.samples.map(s => s.archiveBytes)),
    Array(3).fill([815, 2082, 6646, 24004]));
  assert.ok(Object.isFrozen(runs));
});

test('NEXT-92: altered bytes and truncated artifacts cannot silently pass', async () => {
  const records = clone();
  await assert.rejects(verify(records, async file => {
    const b = Buffer.from(await readBytes(file)); b[20] ^= 1; return b;
  }), /SHA-256 mismatch/);
  await assert.rejects(verify(records, async file => (await readBytes(file)).subarray(0, 20)), /size mismatch/);
});

test('NEXT-92: rejects duplicate artifact IDs and nonchronological run IDs', async () => {
  const duplicate = clone(); duplicate[2].artifactId = duplicate[1].artifactId;
  await assert.rejects(verify(duplicate), /duplicate or out-of-order/);
  const reordered = clone().reverse();
  await assert.rejects(verify(reordered), /duplicate or out-of-order/);
});

test('NEXT-92: rejects malicious paths, untrusted status and oversized manifests before I/O', async () => {
  for (const patch of [
    { file: '../etc/passwd' }, { file: 'tests/fixtures/next92-ci-000.json' },
    { conclusion: 'failure' }, { bytes: 100000 }, { sha256: '00' }
  ]) {
    const records = clone(); Object.assign(records[0], patch);
    await assert.rejects(verify(records, async () => { throw new Error('I/O must not run'); }), /provenance/);
  }
});

test('NEXT-92: matching hash is not enough for invalid schema, scenario or sample size', async () => {
  const records = clone();
  const report = JSON.parse(await readFile(new URL('./fixtures/next90-ci-40266761987.json', import.meta.url), 'utf8'));
  for (const change of [r => { r.schemaVersion = 2; }, r => { r.scenario = 'changed'; },
    r => { r.samples[0].matches = 7; }, r => { r.samples[1].elapsedMs = -1; }]) {
    const edited = structuredClone(report); change(edited);
    const data = Buffer.from(JSON.stringify(edited));
    records[0].bytes = data.byteLength;
    records[0].sha256 = createHash('sha256').update(data).digest('hex');
    await assert.rejects(verify(records, file => file === records[0].file ? data : readBytes(file)),
      /Incompatible|Invalid or inconsistent/);
  }
});
