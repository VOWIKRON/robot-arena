/** NEXT-97: fail-closed, read-only browser compatibility release gate. No publishing. */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const REQUIRED_BROWSER_PROJECTS = Object.freeze([
  'desktop-chromium', 'mobile-chromium', 'desktop-webkit', 'mobile-webkit'
]);

export function evaluateBrowserMatrix(report) {
  if (!report || typeof report !== 'object') throw new Error('Missing Playwright JSON report');
  const projects = report.config?.projects;
  if (!Array.isArray(projects)) throw new Error('Missing Playwright project configuration');
  const declared = new Set(projects.map((project) => project?.name));
  for (const project of REQUIRED_BROWSER_PROJECTS) {
    if (!declared.has(project)) throw new Error(`Missing browser project: ${project}`);
  }
  if (!Array.isArray(report.suites)) throw new Error('Missing Playwright suites');
  if (!Array.isArray(report.errors) || report.errors.length > 0) {
    throw new Error('Playwright runner errors or missing error report');
  }
  const stats = report.stats;
  if (!stats || !Number.isInteger(stats.unexpected) || !Number.isInteger(stats.flaky)
      || stats.unexpected !== 0 || stats.flaky !== 0) {
    throw new Error('Unexpected/flaky Playwright results or missing statistics');
  }
  const passed = Object.fromEntries(REQUIRED_BROWSER_PROJECTS.map((name) => [name, 0]));
  let observed = 0;
  function visit(suites) {
    for (const suite of suites) {
      for (const spec of suite.specs ?? []) {
        for (const test of spec.tests ?? []) {
          observed += 1;
          const name = test.projectName;
          if (!declared.has(name)) throw new Error(`Unrecognized test project: ${name}`);
          if (test.status === 'skipped' && test.expectedStatus === 'skipped') continue;
          if (test.status !== 'expected' || test.expectedStatus !== 'passed'
              || !Array.isArray(test.results)
              || !test.results.some((result) => result.status === 'passed')) {
            throw new Error(`Browser test did not pass cleanly: ${name} / ${spec.title}`);
          }
          if (Object.hasOwn(passed, name)) passed[name] += 1;
        }
      }
      visit(suite.suites ?? []);
    }
  }
  visit(report.suites);
  for (const [name, count] of Object.entries(passed)) {
    if (count < 1) throw new Error(`No passed browser tests in ${name}`);
  }
  return { schemaVersion: 1, gate: 'PASS', projects: passed, observedTests: observed,
    unexpected: stats.unexpected, flaky: stats.flaky,
    note: 'Automated Chromium/WebKit desktop/mobile checks; not physical-device acceptance.' };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const input = process.argv[2] || 'next97-browser-matrix.json';
  const output = process.argv[3] || 'next97-browser-gate.json';
  try {
    const result = evaluateBrowserMatrix(JSON.parse(readFileSync(input, 'utf8')));
    writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
    console.log('NEXT-97 browser compatibility gate:', JSON.stringify(result));
  } catch (error) {
    console.error('NEXT-97 RELEASE BLOCKED:', error.message);
    process.exitCode = 1;
  }
}
