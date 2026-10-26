import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { evaluateV02Readiness } from '../scripts/next101-v02-readiness.mjs';

const initial = JSON.parse(await readFile(new URL('../V02_ACCEPTANCE.json', import.meta.url), 'utf8'));
const clone = () => structuredClone(initial);
const evidence = kind => ({kind, reference:'CI run or signed manual acceptance record', passed:true});

test('NEXT-101 initial milestone is explicitly NOT ready and cannot authorize release', () => {
  const result = evaluateV02Readiness(clone());
  assert.equal(result.readyForManualReview,false);
  assert.equal(result.releaseAuthorized,false);
  assert.equal(result.completed,0);
  assert.equal(result.pending.length,7);
});
test('NEXT-101 requires automated and appropriate manual evidence for all criteria', () => {
  const manifest=clone();
  for (const entry of manifest.criteria) {
    entry.status='verified';
    entry.evidence=[evidence('automated')];
  }
  let result=evaluateV02Readiness(manifest);
  assert.equal(result.readyForManualReview,false);
  assert.ok(result.pending.includes('quality'));
  for (const entry of manifest.criteria) entry.evidence.push(evidence('manual'));
  result=evaluateV02Readiness(manifest);
  assert.equal(result.readyForManualReview,true);
  assert.equal(result.releaseAuthorized,false);
  assert.equal(result.externalEvidenceVerificationRequired,true);
});
test('NEXT-101 refuses missing, duplicate and unexpected criteria', () => {
  const missing=clone(); missing.criteria.pop();
  assert.throws(()=>evaluateV02Readiness(missing),/manifest/);
  const duplicate=clone(); duplicate.criteria[1].id=duplicate.criteria[0].id;
  assert.throws(()=>evaluateV02Readiness(duplicate),/duplicate/);
  const unknown=clone(); unknown.criteria[0].id='unknown';
  assert.throws(()=>evaluateV02Readiness(unknown),/criterion/);
});
test('NEXT-101 rejects unsupported status and unverified evidence', () => {
  const wrong=clone(); wrong.criteria[0].status='passed';
  assert.throws(()=>evaluateV02Readiness(wrong),/criterion/);
  const fake=clone(); fake.criteria[0].evidence=[{kind:'automated',reference:'ok',passed:false}];
  assert.throws(()=>evaluateV02Readiness(fake),/evidence/);
});
test('NEXT-101 does not mark blocked criteria complete even with evidence', () => {
  const blocked=clone(); blocked.criteria[0].status='blocked';
  blocked.criteria[0].evidence=[evidence('automated'),evidence('manual')];
  assert.equal(evaluateV02Readiness(blocked).completed,0);
});

test('NEXT-101 CLI accepts review-only flag without mistaking it for a filename', () => {
  const cli = new URL('../scripts/next101-v02-readiness.mjs', import.meta.url);
  const result = spawnSync(process.execPath, [cli.pathname, '--require-review-ready'], { encoding:'utf8', cwd:new URL('..', import.meta.url).pathname });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /"readyForManualReview": false/);
  assert.match(result.stdout, /"releaseAuthorized": false/);
  assert.doesNotMatch(result.stderr, /ENOENT|Usage:/);
});
