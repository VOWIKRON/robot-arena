import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateBrowserMatrix, REQUIRED_BROWSER_PROJECTS } from '../scripts/next97-browser-release-gate.mjs';

function fixture() {
  return {
    config: { projects: REQUIRED_BROWSER_PROJECTS.map((name) => ({ name })) },
    errors: [], stats: { unexpected: 0, flaky: 0 },
    suites: [{ specs: REQUIRED_BROWSER_PROJECTS.map((projectName) => ({
      title: projectName, tests: [{ projectName, expectedStatus: 'passed', status: 'expected',
        results: [{ status: 'passed' }] }]
    })) }]
  };
}
test('four-browser matrix passes only with clean results', () => {
  const result = evaluateBrowserMatrix(fixture());
  assert.equal(result.gate, 'PASS');
  for (const project of REQUIRED_BROWSER_PROJECTS) assert.equal(result.projects[project], 1);
});
test('missing WebKit project fails closed', () => {
  const report = fixture(); report.config.projects.pop();
  assert.throws(() => evaluateBrowserMatrix(report), /Missing browser project/);
});
test('declared but unexecuted mobile project fails closed', () => {
  const report = fixture(); report.suites[0].specs.pop();
  assert.throws(() => evaluateBrowserMatrix(report), /No passed browser tests/);
});
test('flaky or unexpected results block release', () => {
  const report = fixture(); report.stats.flaky = 1;
  assert.throws(() => evaluateBrowserMatrix(report), /flaky/);
  report.stats.flaky = 0; report.stats.unexpected = 1;
  assert.throws(() => evaluateBrowserMatrix(report), /Unexpected/);
});
test('failed, skipped and unrecognized project results cannot pass', () => {
  const report = fixture(); const run = report.suites[0].specs[0].tests[0];
  run.status = 'unexpected'; run.results[0].status = 'failed';
  assert.throws(() => evaluateBrowserMatrix(report), /did not pass/);
  run.status = 'skipped'; run.expectedStatus = 'skipped';
  assert.throws(() => evaluateBrowserMatrix(report), /No passed browser tests/);
  run.projectName = 'unknown-browser'; run.status = 'expected'; run.expectedStatus = 'passed';
  run.results[0].status = 'passed';
  assert.throws(() => evaluateBrowserMatrix(report), /Unrecognized/);
});
test('malformed report or runner errors block release', () => {
  assert.throws(() => evaluateBrowserMatrix({}), /project configuration/);
  const report = fixture(); report.errors.push({ message: 'worker crashed' });
  assert.throws(() => evaluateBrowserMatrix(report), /runner errors/);
});
