#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

/** Parse zero-context git diff hunks into touched coordinates on the common base. */
export function parseBaseHunks(patch) {
  const hunks = [];
  for (const line of patch.split('\n')) {
    const match = /^@@ -(\d+)(?:,(\d+))? \+\d+(?:,\d+)? @@/.exec(line);
    if (match) hunks.push({ start: Number(match[1]), count: match[2] === undefined ? 1 : Number(match[2]) });
  }
  return hunks;
}

/** Conservative: inserting at a replaced block boundary needs manual resolution. */
export function hunksOverlap(a, b) {
  if (a.count === 0 && b.count === 0) return a.start === b.start;
  if (a.count === 0) return a.start >= b.start && a.start <= b.start + b.count;
  if (b.count === 0) return b.start >= a.start && b.start <= a.start + a.count;
  return a.start < b.start + b.count && b.start < a.start + a.count;
}

export function analyzeIntegration(base, branches, git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trimEnd()) {
  if (branches.length < 2 || new Set(branches).size !== branches.length) throw new Error('Mindestens zwei unterschiedliche Feature-Branches erforderlich');
  const baseSha = git('rev-parse', base).trim();
  const changes = branches.map(branch => {
    const mergeBase = git('merge-base', base, branch).trim();
    if (mergeBase !== baseSha) throw new Error(`${branch}: nicht auf dem aktuellen Basis-Commit; zuerst neu abgleichen`);
    const paths = git('diff', '--name-only', `${base}...${branch}`).split('\n').filter(Boolean);
    return { branch, paths: new Set(paths) };
  });
  const allPaths = [...new Set(changes.flatMap(c => [...c.paths]))].sort();
  const sharedPaths = allPaths.filter(path => changes.filter(c => c.paths.has(path)).length > 1);
  const conflicts = [];
  const manualReconciliation = [];
  for (const path of sharedPaths) {
    const owners = changes.filter(c => c.paths.has(path));
    if (!/^(src\/|e2e\/|tests\/|scripts\/|package(?:-lock)?\.json$)/.test(path)) {
      manualReconciliation.push({ path, branches: owners.map(c => c.branch), reason: 'Dokumentation/Metadaten zusammenführen' });
      continue;
    }
    const patches = owners.map(c => ({ branch: c.branch, hunks: parseBaseHunks(git('diff', '--unified=0', `${base}...${c.branch}`, '--', path)) }));
    for (let i = 0; i < patches.length; i++) for (let j = i + 1; j < patches.length; j++) {
      if (!patches[i].hunks.length || !patches[j].hunks.length || patches[i].hunks.some(a => patches[j].hunks.some(b => hunksOverlap(a, b)))) {
        conflicts.push({ path, branches: [patches[i].branch, patches[j].branch], reason: 'Überlappende Quelltextänderungen oder nicht vergleichbare Datei' });
      }
    }
  }
  return { base, baseSha, branches, sharedPaths, conflicts, manualReconciliation, readyForCombinedQA: conflicts.length === 0 };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const [base, ...branches] = process.argv.slice(2);
    if (!base) throw new Error('Aufruf: node scripts/check-integration-conflicts.mjs main feature/NEXT-69-... feature/NEXT-70-...');
    const report = analyzeIntegration(base, branches);
    console.log(JSON.stringify(report, null, 2));
    if (!report.readyForCombinedQA) process.exitCode = 1;
  } catch (error) {
    console.error(`Integrationsprüfung fehlgeschlagen: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 2;
  }
}
