/** NEXT-106: read-only, fail-closed integration evidence gate. NEVER publishes. */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { evaluateBrowserMatrix, REQUIRED_BROWSER_PROJECTS } from './next97-browser-release-gate.mjs';

const REQUIRED_UNIT = Object.freeze([
  'adaptive-strategy.test.ts', 'next104-integration.test.ts', 'next105-adaptive-balance.test.ts'
]);
const REQUIRED_BROWSER = Object.freeze([
  'next99-multitab-120.spec.ts', 'next103-adaptive-strategy.spec.ts'
]);
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const basename = path => typeof path === 'string' ? path.replaceAll('\\', '/').split('/').pop() : '';

/** This validates *actual runner JSON*, not declarations of success in a manifest.
 * CI provenance still requires inspecting the GitHub Actions run for the exact SHA.
 */
export function evaluateIntegratedEvidence(unitReport, browserReport) {
  if (!isObject(unitReport) || unitReport.success !== true ||
      !Number.isSafeInteger(unitReport.numPassedTests) || unitReport.numPassedTests < 1 ||
      unitReport.numFailedTests !== 0 || unitReport.numPendingTests !== 0 ||
      !Array.isArray(unitReport.testResults) || unitReport.testResults.length === 0 ||
      unitReport.numTotalTests !== unitReport.numPassedTests ||
      !Number.isSafeInteger(unitReport.numPassedTestSuites) ||
      unitReport.numPassedTestSuites < unitReport.testResults.length ||
      unitReport.numTotalTestSuites !== unitReport.numPassedTestSuites ||
      unitReport.numFailedTestSuites !== 0 || unitReport.numPendingTestSuites !== 0) {
    throw new Error('Missing, incomplete or failed Vitest JSON report');
  }
  const unit = Object.fromEntries(REQUIRED_UNIT.map(name => [name, 0]));
  let actualPassed = 0;
  const seenUnitFiles = new Set();
  for (const suite of unitReport.testResults) {
    if (!isObject(suite) || suite.status !== 'passed' ||
        !Array.isArray(suite.assertionResults) || suite.assertionResults.length === 0) {
      throw new Error('Vitest suite missing or not passed');
    }
    const file = basename(suite.name);
    if (!file || seenUnitFiles.has(file)) throw new Error('Missing or duplicate Vitest suite name: ' + file);
    seenUnitFiles.add(file);
    for (const assertion of suite.assertionResults) {
      if (!isObject(assertion) || assertion.status !== 'passed') {
        throw new Error('Vitest assertion failed, skipped or incomplete');
      }
      actualPassed += 1;
      if (Object.hasOwn(unit, file)) unit[file] += 1;
    }
  }
  if (actualPassed !== unitReport.numPassedTests) {
    throw new Error('Vitest passed test count does not match assertions');
  }
  for (const [file, count] of Object.entries(unit)) {
    if (count === 0) throw new Error('Missing passing unit/behavior/integration evidence: ' + file);
  }

  const browser = evaluateBrowserMatrix(browserReport);
  // NEXT-97 permits intentionally skipped unrelated cases; a release evidence gate
  // must not. Reject skipped, retried, contradictory or uncounted tests globally.
  const browserStats = browserReport.stats;
  if (!Number.isSafeInteger(browserStats?.expected) ||
      !Number.isSafeInteger(browserStats?.skipped) || browserStats.skipped !== 0 ||
      browserStats.expected !== browser.observedTests) {
    throw new Error('Incomplete or contradictory Playwright statistics');
  }
  const covered = Object.fromEntries(REQUIRED_BROWSER.map(file => [
    file, Object.fromEntries(REQUIRED_BROWSER_PROJECTS.map(project => [project, 0]))
  ]));
  function visit(suites, parentFile = '') {
    for (const suite of suites) {
      const file = basename(suite.file || parentFile || suite.title);
      for (const spec of suite.specs ?? []) {
        if (!Array.isArray(spec.tests) || spec.tests.length === 0 || spec.ok === false) {
          throw new Error('Missing or unsuccessful Playwright spec');
        }
        const source = basename(spec.file || file);
        for (const item of spec.tests) {
          if (item.status !== 'expected' || item.expectedStatus !== 'passed' ||
              !Array.isArray(item.results) || item.results.length !== 1 ||
              item.results[0]?.status !== 'passed') {
            throw new Error('Skipped, retried or contradictory Playwright evidence');
          }
          if (Object.hasOwn(covered, source) && Object.hasOwn(covered[source], item.projectName)) {
            covered[source][item.projectName] += 1;
          }
        }
      }
      visit(suite.suites ?? [], suite.file || parentFile);
    }
  }
  visit(browserReport.suites);
  for (const [file, projects] of Object.entries(covered)) {
    for (const [project, count] of Object.entries(projects)) {
      if (count < 1) throw new Error('Missing browser acceptance evidence: ' + file + ' / ' + project);
    }
  }
  return {
    schemaVersion: 1, gate: 'PASS', automatedEvidenceOnly: true,
    releaseAuthorized: false, readyForManualRelease: false,
    manualAcceptancePending: [], // NEXT-79e accepted in the user-reduced scope on 31.10.2026.
    externalCIProvenanceVerificationRequired: true,
    unitTests: actualPassed, requiredUnitSuites: unit,
    browserTests: browser.observedTests, browserProjects: browser.projects,
    requiredBrowserSuites: covered,
    note: 'Runner evidence verified locally. GitHub CI SHA/run/artifacts require independent verification; no release or publish is authorized by this gate.'
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [unitFile, browserFile, outputFile, ...extra] = process.argv.slice(2);
  try {
    if (!unitFile || !browserFile || extra.length || [unitFile, browserFile, outputFile].some(p => p?.startsWith('--'))) {
      throw new Error('Usage: next106-integrated-release-gate.mjs vitest.json playwright.json [result.json]');
    }
    const result = evaluateIntegratedEvidence(
      JSON.parse(readFileSync(unitFile, 'utf8')),
      JSON.parse(readFileSync(browserFile, 'utf8'))
    );
    if (outputFile) writeFileSync(outputFile, JSON.stringify(result, null, 2) + '\n');
    console.log('NEXT-106 AUTOMATED EVIDENCE PASS (NOT A RELEASE APPROVAL):', JSON.stringify(result));
  } catch (error) {
    console.error('NEXT-106 RELEASE EVIDENCE BLOCKED:', error.message);
    process.exitCode = 1;
  }
}
