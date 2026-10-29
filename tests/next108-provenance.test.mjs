import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { evaluateProvenance } from '../scripts/next108-verify-provenance.mjs';

const sha = 'a'.repeat(40);
const branch = 'integration/NEXT-110-v0162-rc-20261029-0300';
const repo = 'VOWIKRON/robot-arena';
const required = ['Run npm run typecheck', 'Run npm test', 'Run npm run build',
  'Verify second clean install and reproducible build on identical SHA',
  'Enforce zero known dependency advisories',
  'Install WebKit browser and Linux runtime dependencies', 'Run npm run test:e2e'];
const artifact = (name, id) => ({
  id, name, size_in_bytes: 100, expired: false, digest: 'sha256:' + 'b'.repeat(64),
  workflow_run: { id: 123, head_sha: sha, head_branch: branch }
});
function fixture() {
  return {
    expected: { repository: repo, sha, branch, runId: 123 },
    run: { id: 123, status: 'completed', conclusion: 'success', head_sha: sha,
      head_branch: branch, repository: { full_name: repo }, event: 'push',
      path: '.github/workflows/feature-qa.yml' },
    jobs: [{ name: 'quality', run_id: 123, head_sha: sha, status: 'completed',
      conclusion: 'success', steps: [
        ...required.map(name => ({ name, status: 'completed', conclusion: 'success' })),
        ...[0, 1].map(() => ({ name: 'Run actions/upload-artifact@v4', status: 'completed', conclusion: 'success' }))
      ] }],
    artifacts: [artifact('robot-arena-dist', 1), artifact('robot-arena-dependency-audit', 2)]
  };
}
const check = (change, pattern) => {
  const f = fixture(); change(f);
  assert.throws(() => evaluateProvenance(f), pattern || /NEXT-108 PROVENANCE BLOCKED/);
};
test('NEXT-108: exact successful run, jobs, SHA and artifacts pass review ONLY', () => {
  const v = evaluateProvenance(fixture());
  assert.equal(v.gate, 'PASS');
  assert.equal(v.releaseAuthorized, false);
  assert.equal(v.externalFinalVerificationRequired, false);
  assert.deepEqual(v.manualAcceptancePending, ['NEXT-79e']);
});
test('NEXT-108: an in-progress run can only pass the internal post-quality check', () => {
  const f = fixture(); f.run.status = 'in_progress'; f.run.conclusion = null;
  assert.throws(() => evaluateProvenance(f), /not fully successful/);
  const result = evaluateProvenance({ ...f, mode: 'in-run' });
  assert.equal(result.externalFinalVerificationRequired, true);
  assert.equal(result.releaseAuthorized, false);
});
test('NEXT-108: wrong identity, run, branch, event, workflow and SHA fail closed', () => {
  for (const change of [
    f => { f.expected.sha = 'short'; },
    f => { f.run.head_sha = 'b'.repeat(40); },
    f => { f.run.head_branch = 'main'; },
    f => { f.run.repository.full_name = 'attacker/repo'; },
    f => { f.run.id = 124; },
    f => { f.run.event = 'workflow_dispatch'; },
    f => { f.run.path = '.github/workflows/deploy.yml'; },
    f => { f.expected.branch = 'main'; }
  ]) check(change);
});
test('NEXT-108: failed, cancelled or incomplete runs and quality jobs fail closed', () => {
  for (const change of [
    f => { f.run.status = 'in_progress'; f.run.conclusion = null; },
    f => { f.run.conclusion = 'failure'; },
    f => { f.jobs[0].conclusion = 'cancelled'; },
    f => { f.jobs[0].status = 'in_progress'; },
    f => { f.jobs[0].run_id = 999; },
    f => { f.jobs[0].head_sha = 'b'.repeat(40); },
    f => { f.jobs.push(structuredClone(f.jobs[0])); },
    f => { f.jobs[0].steps = []; },
    f => { f.jobs[0].steps[0].conclusion = 'failure'; },
    f => { f.jobs[0].steps.pop(); }
  ]) check(change);
});
test('NEXT-108: missing, duplicate, expired, empty, wrong-run and undigested artifacts fail', () => {
  for (const change of [
    f => { f.artifacts.pop(); },
    f => { f.artifacts.push(structuredClone(f.artifacts[0])); },
    f => { f.artifacts[0].expired = true; },
    f => { f.artifacts[0].size_in_bytes = 0; },
    f => { f.artifacts[0].digest = null; },
    f => { f.artifacts[0].workflow_run.head_sha = 'b'.repeat(40); },
    f => { f.artifacts[0].workflow_run.head_branch = 'main'; },
    f => { f.artifacts[0].workflow_run.id = 999; }
  ]) check(change);
});
test('NEXT-108: exact NEXT-79e QA branches pass only with matching SHA/run/artifacts', () => {
  for (const branch of ["feature/NEXT-79e-automated-preflight-20261029-0700","feature/NEXT-79e-AUTO4-provenance-fix-20261029-0800","feature/NEXT-79e-AUTO5-dialog-keyboard-20261029-0800","feature/NEXT-79e-AUTO6-motion-regression-20261029-0800"]) {
    const f = fixture();
    f.expected.branch = branch;
    f.run.head_branch = branch;
    for (const artifact of f.artifacts) artifact.workflow_run.head_branch = branch;
    assert.equal(evaluateProvenance(f).gate, 'PASS');
    f.artifacts[0].workflow_run.head_branch = 'integration/NEXT-110-v0162-rc-20261029-0300';
    assert.throws(() => evaluateProvenance(f), /artifact provenance mismatch/);
  }
});
test('NEXT-108: exact approved smoke, docs and gameplay QA branches pass but arbitrary refs do not', () => {
  const approved = [
    'feature/NEXT-110-SMOKE-STRICT-20261029-2000',
    'feature/NEXT-110-FOOTER-BOUNDARY-20261029-2000',
    'docs/NEXT-110-RC5-qa-failure-20261029-2000',
    'integration/NEXT-112-combat-speed-20261029-2105',
    'integration/NEXT-112-combat-speed-reg-20261029-2105',
    'feature/NEXT-112-C-webkit-clock-20261029-2200',
    'feature/NEXT-113-A-spacebar-control-20261029-2200',
    'feature/NEXT-113-B-spacebar-reg-20261029-2200',
    'feature/NEXT-114-A-ten-tick-20261029-2300',
    'feature/NEXT-114-B-ten-tick-e2e-20261029-2300',
    'feature/NEXT-114-C-batch-refactor-20261029-2300'
  ];
  for (const branch of approved) {
    const f = fixture();
    f.expected.branch = branch;
    f.run.head_branch = branch;
    for (const a of f.artifacts) a.workflow_run.head_branch = branch;
    assert.equal(evaluateProvenance(f).gate, 'PASS');
    assert.equal(evaluateProvenance(f).releaseAuthorized, false);
  }
  for (const branch of ['main', 'docs/anything-else', 'feature/NEXT-110-OTHER', 'integration/NEXT-112-unauthorized']) {
    const f = fixture();
    f.expected.branch = branch;
    f.run.head_branch = branch;
    for (const a of f.artifacts) a.workflow_run.head_branch = branch;
    assert.throws(() => evaluateProvenance(f), /unexpected QA branch/);
  }
});

test('NEXT-108: unauthorized QA feature branch remains fail-closed', () => {
  const f = fixture();
  f.expected.branch = 'feature/NEXT-79e-unauthorized';
  f.run.head_branch = f.expected.branch;
  for (const artifact of f.artifacts) artifact.workflow_run.head_branch = f.expected.branch;
  assert.throws(() => evaluateProvenance(f), /unexpected QA branch/);
});
test('NEXT-108: RC5 evidence QA remains exact-branch, SHA- and artifact-bound, never a release', () => {
  const branch = 'integration/NEXT-110-RC5-evidence-qa-20261029-1400';
  const f = fixture();
  f.expected.branch = branch;
  f.run.head_branch = branch;
  for (const a of f.artifacts) a.workflow_run.head_branch = branch;
  const result = evaluateProvenance(f);
  assert.equal(result.gate, 'PASS');
  assert.equal(result.releaseAuthorized, false);
  const wrongSha = structuredClone(f);
  wrongSha.artifacts[0].workflow_run.head_sha = 'c'.repeat(40);
  assert.throws(() => evaluateProvenance(wrongSha), /artifact provenance mismatch/);
  const wrongBranch = structuredClone(f);
  wrongBranch.run.head_branch = 'main';
  assert.throws(() => evaluateProvenance(wrongBranch), /workflow SHA or branch mismatch/);
});

test('NEXT-108: missing credentials never produce a pass or a publish action', () => {
  const cli = new URL('../scripts/next108-verify-provenance.mjs', import.meta.url);
  const result = spawnSync(process.execPath, [cli.pathname], { encoding: 'utf8',
    env: { PATH: process.env.PATH, NEXT108_MODE: 'final' } });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /NEXT-108 PROVENANCE BLOCKED/);
});
