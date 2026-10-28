/** NEXT-101: deterministic, fail-closed evidence inventory; NEVER releases/deploys. */
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const IDS = Object.freeze(['aggressive','defensive','adaptive','combat','tournament','usability','quality']);
const MANUAL = new Set(['aggressive','defensive','adaptive','usability','quality']);
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);

export function evaluateV02Readiness(manifest) {
  if (!isObject(manifest) || manifest.schemaVersion !== 1 ||
      manifest.targetVersion !== '0.2.0' || manifest.policy !== 'manual-approval-only' ||
      !Array.isArray(manifest.criteria) || manifest.criteria.length !== IDS.length) {
    throw new Error('Invalid v0.2.0 acceptance manifest');
  }
  const seen = new Set();
  const items = [];
  for (const entry of manifest.criteria) {
    if (!isObject(entry) || !IDS.includes(entry.id) || seen.has(entry.id) ||
        !['pending','blocked','verified'].includes(entry.status) ||
        !Array.isArray(entry.evidence) || entry.evidence.length > 30) {
      throw new Error('Invalid or duplicate v0.2.0 criterion');
    }
    seen.add(entry.id);
    const kinds = new Set();
    for (const evidence of entry.evidence) {
      if (!isObject(evidence) || !['automated','manual'].includes(evidence.kind) ||
          typeof evidence.reference !== 'string' ||
          evidence.reference.trim().length < 8 || evidence.reference.length > 300 ||
          evidence.passed !== true) {
        throw new Error('Invalid v0.2.0 evidence for ' + entry.id);
      }
      kinds.add(evidence.kind);
    }
    const complete = entry.status === 'verified' && kinds.has('automated') &&
      (!MANUAL.has(entry.id) || kinds.has('manual'));
    items.push({ id: entry.id, area: entry.area, status: entry.status, complete,
      missingEvidence: entry.status === 'verified' && !complete });
  }
  if (seen.size !== IDS.length) throw new Error('Missing v0.2.0 criterion');
  const pending = items.filter(item => !item.complete).map(item => item.id);
  return {
    targetVersion:'0.2.0', readyForManualReview: pending.length === 0,
    releaseAuthorized:false, externalEvidenceVerificationRequired:true,
    completed:items.length-pending.length, total:items.length, pending, criteria:items
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = process.argv.slice(2);
    const paths = args.filter(arg => arg !== '--require-review-ready');
    if (paths.length > 1 || paths.some(arg => arg.startsWith('--'))) {
      throw new Error('Usage: next101-v02-readiness.mjs [manifest.json] [--require-review-ready]');
    }
    const path = paths[0] || 'V02_ACCEPTANCE.json';
    const manifest = JSON.parse(await readFile(path, 'utf8'));
    const result = evaluateV02Readiness(manifest);
    console.log(JSON.stringify(result, null, 2));
    if (process.argv.includes('--require-review-ready') && !result.readyForManualReview) process.exitCode = 1;
  } catch (error) {
    console.error('NEXT-101 readiness check:', error.message);
    process.exitCode = 1;
  }
}
