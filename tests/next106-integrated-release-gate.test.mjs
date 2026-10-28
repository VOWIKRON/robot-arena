import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { evaluateIntegratedEvidence } from '../scripts/next106-integrated-release-gate.mjs';
import { REQUIRED_BROWSER_PROJECTS } from '../scripts/next97-browser-release-gate.mjs';

const unitFiles = ['adaptive-strategy.test.ts', 'next104-integration.test.ts', 'next105-adaptive-balance.test.ts'];
const browserFiles = ['next99-multitab-120.spec.ts', 'next103-adaptive-strategy.spec.ts'];
const clone = value => structuredClone(value);

function fixture() {
  const unit = {
    success: true, numPassedTests: 3, numFailedTests: 0, numPendingTests: 0,
    testResults: unitFiles.map(name => ({
      name: '/repo/tests/' + name, status: 'passed',
      assertionResults: [{ title: 'deterministic acceptance', status: 'passed' }]
    }))
  };
  const browser = {
    config: { projects: REQUIRED_BROWSER_PROJECTS.map(name => ({ name })) },
    errors: [], stats: { unexpected: 0, flaky: 0 },
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
  assert.deepEqual(result.manualAcceptancePending, ['NEXT-79e']);
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
