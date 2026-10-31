import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { evaluateIntegratedEvidence } from '../scripts/next106-integrated-release-gate.mjs';
import { REQUIRED_BROWSER_PROJECTS } from '../scripts/next97-browser-release-gate.mjs';

const unitFiles = ['adaptive-strategy.test.ts', 'next104-integration.test.ts', 'next105-adaptive-balance.test.ts'];
const browserFiles = ['next99-multitab-120.spec.ts', 'next103-adaptive-strategy.spec.ts'];
const clone = value => structuredClone(value);

function fixture() {
  const unit = {
    success: true, numPassedTests: 3, numFailedTests: 0, numPendingTests: 0,
    numTotalTests: 3, numPassedTestSuites: 3, numTotalTestSuites: 3,
    numFailedTestSuites: 0, numPendingTestSuites: 0,
    testResults: unitFiles.map(name => ({
      name: '/repo/tests/' + name, status: 'passed',
      assertionResults: [{ title: 'deterministic acceptance', status: 'passed' }]
    }))
  };
  const browser = {
    config: { projects: REQUIRED_BROWSER_PROJECTS.map(name => ({ name })) },
    errors: [], stats: { expected: 8, skipped: 0, unexpected: 0, flaky: 0 },
    suites: browserFiles.map(file => ({
      file, specs: [{ title: 'behavior acceptance', tests: REQUIRED_BROWSER_PROJECTS.map(projectName => ({
        projectName, expectedStatus: 'passed', status: 'expected', results: [{ status: 'passed' }]
      })) }]
    }))
  };
  return { unit, browser };
}

test('NEXT-106: full adaptive, 120-match archive, mirrored balance and four-browser evidence passes', () => {
  const { unit, browser } = fixture();
  const result = evaluateIntegratedEvidence(unit, browser);
  assert.equal(result.gate, 'PASS');
  assert.equal(result.unitTests, 3);
  assert.equal(result.browserTests, 8);
  assert.equal(result.automatedEvidenceOnly, true);
  assert.equal(result.releaseAuthorized, false);
  assert.equal(result.readyForManualRelease, false);
  assert.equal(result.externalCIProvenanceVerificationRequired, true);
  assert.deepEqual(result.manualAcceptancePending, []);
});

test('NEXT-106: missing unit suite or incomplete assertions fail closed', () => {
  for (const change of [
    r => r.unit.testResults.pop(),
    r => { r.unit.testResults[0].status = 'failed'; },
    r => { r.unit.testResults[1].assertionResults[0].status = 'skipped'; },
    r => { r.unit.numPassedTests = 4; },
    r => { r.unit.success = false; },
    r => { r.unit.numPendingTests = 1; }
  ]) {
    const r = fixture(); change(r);
    assert.throws(() => evaluateIntegratedEvidence(r.unit, r.browser), /Vitest|Missing passing/);
  }
});

test('NEXT-106: browser project exists but missing required feature test fails closed', () => {
  const r = fixture();
  r.browser.suites[0].specs[0].tests.pop();
  r.browser.stats.expected = 7; // valid count, but a required feature/project is absent
  assert.throws(() => evaluateIntegratedEvidence(r.unit, r.browser), /Missing browser acceptance evidence/);
});

test('NEXT-106: browser flakiness, runner errors, missing project or failed test block', () => {
  for (const change of [
    r => { r.browser.stats.flaky = 1; },
    r => { r.browser.errors.push({ message: 'worker crashed' }); },
    r => { r.browser.config.projects.pop(); },
    r => { r.browser.suites[1].specs[0].tests[0].status = 'unexpected'; }
  ]) {
    const r = fixture(); change(r);
    assert.throws(() => evaluateIntegratedEvidence(r.unit, r.browser), /flaky|runner errors|Missing browser project|did not pass/);
  }
});

test('NEXT-106: unknown or renamed feature file cannot masquerade as acceptance', () => {
  const r = fixture();
  r.unit.testResults[0].name = '/repo/tests/something-else.test.ts';
  assert.throws(() => evaluateIntegratedEvidence(r.unit, r.browser), /Missing passing unit/);
  const s = fixture();
  s.browser.suites[1].file = 'unrelated.spec.ts';
  assert.throws(() => evaluateIntegratedEvidence(s.unit, s.browser), /Missing browser acceptance evidence/);
});

test('NEXT-106: CLI fails without real JSON reports; never invokes a publish step', () => {
  const cli = new URL('../scripts/next106-integrated-release-gate.mjs', import.meta.url);
  const result = spawnSync(process.execPath, [cli.pathname, 'missing-vitest.json', 'missing-playwright.json'], {
    cwd: new URL('..', import.meta.url).pathname, encoding: 'utf8'
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /RELEASE EVIDENCE BLOCKED/);
});

test('NEXT-106: fabricated totals, duplicate suites and incomplete Vitest evidence block release', () => {
  for (const change of [
    r => { delete r.unit.numTotalTests; },
    r => { r.unit.numTotalTests = 4; },
    r => { r.unit.numPassedTestSuites = 2; },
    r => { r.unit.numFailedTestSuites = 1; },
    r => { r.unit.testResults[1].name = r.unit.testResults[0].name; },
    r => { r.unit.testResults[0].assertionResults[0].status = 'pending'; }
  ]) {
    const r = fixture(); change(r);
    assert.throws(() => evaluateIntegratedEvidence(r.unit, r.browser), /Vitest|duplicate|incomplete/);
  }
});

test('NEXT-106: even unrelated skips and contradictory browser totals fail closed', () => {
  for (const change of [
    r => { r.browser.stats.skipped = 1; },
    r => { delete r.browser.stats.expected; },
    r => { r.browser.stats.expected = 9; },
    r => {
      r.browser.suites.push({ file: 'unrelated.spec.ts', specs: [{ title: 'skip', tests: [
        { projectName: 'desktop-chromium', status: 'skipped', expectedStatus: 'skipped', results: [] }
      ] }] });
      r.browser.stats.expected = 8; r.browser.stats.skipped = 1;
    },
    r => {
      r.browser.suites[0].specs[0].tests[0].results.push({ status: 'failed' });
    },
    r => { r.browser.suites[0].specs[0].ok = false; }
  ]) {
    const r = fixture(); change(r);
    assert.throws(() => evaluateIntegratedEvidence(r.unit, r.browser),
      /statistics|contradictory|spec|did not pass|flaky/);
  }
});

test('NEXT-106: supported 4-project feature acceptance must not use skipped evidence', () => {
  const r = fixture();
  r.browser.suites[0].specs[0].tests[0].status = 'skipped';
  r.browser.suites[0].specs[0].tests[0].expectedStatus = 'skipped';
  r.browser.suites[0].specs[0].tests[0].results = [];
  assert.throws(() => evaluateIntegratedEvidence(r.unit, r.browser), /contradictory|evidence/);
});

test('NEXT-106/NEXT-120: manual publisher cannot bypass evidence gate before upload', () => {
  const publish = readFileSync(new URL('../.github/workflows/publish.yml', import.meta.url), 'utf8');
  const ci = readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');
  const gate = 'node scripts/next106-integrated-release-gate.mjs';
  const upload = 'name: Upload release using existing server publisher';
  assert.match(publish, /workflow_dispatch:/);
  assert.doesNotMatch(publish, /workflow_run:/);
  assert.ok(publish.indexOf(gate) > 0 && publish.indexOf(gate) < publish.indexOf(upload));
  assert.ok(publish.indexOf('node scripts/next97-browser-release-gate.mjs') < publish.indexOf(gate));
  assert.ok(ci.includes(gate));
  // Positive evidence is required even if the artifact upload operation succeeds.
  assert.match(publish, /name: robot-arena-manual-publish-evidence[\s\S]*?if-no-files-found: error/);
  assert.match(ci, /name: robot-arena-integrated-evidence[\s\S]*?if-no-files-found: error/);
});
