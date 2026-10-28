import test from 'node:test';
import assert from 'node:assert/strict';
import { collectResourceArtifactInventory } from '../scripts/next91-resource-artifact-inventory.mjs';

const SHA1 = 'a'.repeat(40), SHA2 = 'b'.repeat(40);
const run = (id, sha) => ({
  id, name: 'Development Tests', conclusion: 'success', head_sha: sha,
  head_branch: 'feature/test', created_at: '2026-10-26T05:00:00Z'
});
const artifact = (id, expired, expires_at) => ({
  id, name: 'robot-arena-resource-trends', size_in_bytes: 1200, expired,
  created_at: '2026-10-26T05:10:00Z', expires_at
});
const BASE = '/repos/VOWIKRON/robot-arena';
const RUNS = BASE + '/actions/workflows/ci.yml/runs?status=success&per_page=100&page=1';
const ARTS = id => BASE + '/actions/runs/' + id + '/artifacts?per_page=100';
const CONFIG = {
  repository: 'VOWIKRON/robot-arena', token: 'test-token',
  now: new Date('2026-10-26T07:00:00Z')
};
function mock(pages) {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    const u = new URL(url);
    const key = u.pathname + u.search;
    if (!(key in pages)) return { ok: false, status: 404 };
    return { ok: true, json: async () => pages[key] };
  };
  return { fetchImpl, calls };
}

test('NEXT-91 records real-shaped provenance, expiry and sorted history without writes', async () => {
  const { fetchImpl, calls } = mock({
    [RUNS]: { workflow_runs: [run(22,SHA2), run(21,SHA1), { ...run(20,SHA1), conclusion:'failure' }] },
    [ARTS(22)]: { artifacts: [artifact(202,false,'2026-11-02T00:00:00Z'),
      { ...artifact(999,false,'2026-11-02T00:00:00Z'), name:'unrelated' }] },
    [ARTS(21)]: { artifacts: [artifact(201,true,'2026-10-25T00:00:00Z')] }
  });
  const result = await collectResourceArtifactInventory({ ...CONFIG, fetchImpl });
  assert.equal(result.schemaVersion,1);
  assert.deepEqual(result.records.map(x=>x.runId),[21,22]);
  assert.deepEqual(result.records.map(x=>x.status),['expired','available']);
  assert.deepEqual(result.records.map(x=>x.commit),[SHA1,SHA2]);
  assert.equal(result.available,1); assert.equal(result.expired,1);
  assert.deepEqual(result.warnings,[]);
  assert.ok(calls.every(c=>c.url.startsWith('https://api.github.com/repos/VOWIKRON/robot-arena/actions/')));
  assert.ok(calls.every(c=>c.options.headers.Authorization==='Bearer test-token'));
  assert.ok(calls.every(c=>c.options.redirect==='error'));
});

test('NEXT-91 expired date overrides stale flag and missing expiry is explicitly unknown', async () => {
  const {fetchImpl} = mock({
    [RUNS]: {workflow_runs:[run(21,SHA1)]},
    [ARTS(21)]: {artifacts:[artifact(201,false,'2026-10-25T00:00:00Z'),artifact(202,false,null)]}
  });
  const result=await collectResourceArtifactInventory({...CONFIG,fetchImpl});
  assert.deepEqual(result.records.map(x=>x.status),['expired','expiry-unknown']);
});

test('NEXT-91 missing artifacts do not masquerade as historical coverage', async () => {
  const {fetchImpl}=mock({
    [RUNS]:{workflow_runs:[run(21,SHA1)]},
    [ARTS(21)]:{artifacts:[]}
  });
  const result=await collectResourceArtifactInventory({...CONFIG,fetchImpl});
  assert.equal(result.records.length,0);
  assert.match(result.warnings[0],/Fewer than two/);
});

test('NEXT-91 rejects malformed metadata, duplicates and API failures', async () => {
  const invalid={ [RUNS]:{workflow_runs:[run(21,SHA1)]},
    [ARTS(21)]:{artifacts:[artifact(0,false,'2026-11-02T00:00:00Z')]} };
  const duplicate={ [RUNS]:{workflow_runs:[run(21,SHA1)]},
    [ARTS(21)]:{artifacts:[artifact(201,false,'2026-11-02T00:00:00Z'),artifact(201,false,'2026-11-02T00:00:00Z')]} };
  await assert.rejects(collectResourceArtifactInventory({...CONFIG,fetchImpl:mock(invalid).fetchImpl}),/Malformed/);
  await assert.rejects(collectResourceArtifactInventory({...CONFIG,fetchImpl:mock(duplicate).fetchImpl}),/Duplicate/);
  await assert.rejects(collectResourceArtifactInventory({...CONFIG,fetchImpl:mock({}).fetchImpl}),/HTTP 404/);
  await assert.rejects(collectResourceArtifactInventory({...CONFIG,repository:'invalid/path/extra'}),/Invalid inventory/);
});

test('NEXT-91 ignores malformed SHA and non-successful workflow runs', async () => {
  const {fetchImpl}=mock({[RUNS]:{workflow_runs:[run(22,'bad'),{...run(23,SHA1),conclusion:'failure'}]}});
  const result=await collectResourceArtifactInventory({...CONFIG,fetchImpl});
  assert.equal(result.scannedSuccessfulRuns,0);
  assert.equal(result.records.length,0);
});
