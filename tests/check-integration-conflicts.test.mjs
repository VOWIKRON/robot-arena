import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseBaseHunks, hunksOverlap, analyzeIntegration } from '../scripts/check-integration-conflicts.mjs';

const base = 'abc123';
function fakeGit(patches) {
  return (...args) => {
    if (args[0] === 'rev-parse') return base;
    if (args[0] === 'merge-base') return base;
    if (args[0] === 'diff' && args[1] === '--name-only') return Object.keys(patches[args[2].split('...')[1]] ?? {}).join('\n');
    if (args[0] === 'diff' && args[1] === '--unified=0') return patches[args[2].split('...')[1]][args[4]];
    throw new Error(`Unexpected git call: ${args.join(' ')}`);
  };
}

describe('NEXT-71 integration conflict guard', () => {
  it('parses base-side insertion, replacement and deletion hunks', () => {
    assert.deepEqual(parseBaseHunks('@@ -12,0 +13,3 @@\n@@ -45 +48 @@\n@@ -67,4 +70,0 @@'), [
      { start: 12, count: 0 }, { start: 45, count: 1 }, { start: 67, count: 4 }
    ]);
  });
  it('detects overlaps but permits disjoint source changes', () => {
    assert.equal(hunksOverlap({ start: 10, count: 0 }, { start: 10, count: 0 }), true);
    assert.equal(hunksOverlap({ start: 10, count: 1 }, { start: 10, count: 0 }), true);
    assert.equal(hunksOverlap({ start: 10, count: 1 }, { start: 30, count: 0 }), false);
  });
  it('reports documentation reconciliation separately from safe disjoint main.ts changes', () => {
    const report = analyzeIntegration('main', ['feature/a', 'feature/b'], fakeGit({
      'feature/a': { 'src/main.ts': '@@ -12,0 +13 @@', 'RUN_STATE.md': '@@ -1 +1 @@' },
      'feature/b': { 'src/main.ts': '@@ -520,0 +521,10 @@', 'RUN_STATE.md': '@@ -1 +1 @@' }
    }));
    assert.equal(report.readyForCombinedQA, true);
    assert.deepEqual(report.sharedPaths, ['RUN_STATE.md', 'src/main.ts']);
    assert.equal(report.manualReconciliation.length, 1);
  });
  it('blocks overlapping code and stale branch bases', () => {
    const patches = { a: { 'src/main.ts': '@@ -25,3 +25,1 @@' }, b: { 'src/main.ts': '@@ -27 +27,3 @@' } };
    assert.equal(analyzeIntegration('main', ['a', 'b'], fakeGit(patches)).readyForCombinedQA, false);
    assert.throws(() => analyzeIntegration('main', ['a', 'b'], (...args) => args[0] === 'merge-base' ? 'old' : fakeGit(patches)(...args)), /Basis-Commit/);
  });
});
