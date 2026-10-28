/** NEXT-91: read-only GitHub Actions artifact provenance/retention inventory. No deployment or download. */
import { writeFile } from 'node:fs/promises';
const SHA = /^[0-9a-f]{40}$/i;
const REPO = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const NAME = 'robot-arena-resource-trends';
const validId = x => Number.isSafeInteger(x) && x > 0;
const validDate = x => typeof x === 'string' && Number.isFinite(Date.parse(x)) ? x : null;

export async function collectResourceArtifactInventory({ repository, token, fetchImpl = fetch, now = new Date(), maxRuns = 20 }) {
  if (!REPO.test(repository ?? '') || !token || !Number.isSafeInteger(maxRuns) ||
      maxRuns < 1 || maxRuns > 100 || !Number.isFinite(now.getTime())) {
    throw new Error('Invalid inventory configuration');
  }
  const base = 'https://api.github.com/repos/' + repository;
  const headers = {
    Authorization: 'Bearer ' + token,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'robot-arena-resource-inventory'
  };
  async function get(path) {
    const response = await fetchImpl(base + path, {
      headers, redirect: 'error', signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) throw new Error('GitHub Actions API HTTP ' + response.status);
    return response.json();
  }
  const runs = [];
  for (let page = 1; page <= 5 && runs.length < maxRuns; page++) {
    const data = await get('/actions/workflows/ci.yml/runs?status=success&per_page=100&page=' + page);
    if (!Array.isArray(data.workflow_runs)) throw new Error('Malformed workflow run response');
    for (const run of data.workflow_runs) {
      if (run.name === 'Development Tests' && run.conclusion === 'success' &&
          validId(run.id) && SHA.test(run.head_sha ?? '') && validDate(run.created_at)) {
        runs.push(run);
        if (runs.length === maxRuns) break;
      }
    }
    if (data.workflow_runs.length < 100) break;
  }
  const records = [];
  for (const run of runs) {
    const data = await get('/actions/runs/' + run.id + '/artifacts?per_page=100');
    if (!Array.isArray(data.artifacts)) throw new Error('Malformed artifact response');
    for (const artifact of data.artifacts) {
      if (artifact.name !== NAME) continue;
      if (!validId(artifact.id) || !validId(artifact.size_in_bytes) ||
          !validDate(artifact.created_at)) throw new Error('Malformed resource artifact metadata');
      const expiresAt = validDate(artifact.expires_at);
      const expired = artifact.expired === true ||
        (expiresAt !== null && Date.parse(expiresAt) <= now.getTime());
      records.push({
        runId: run.id, commit: run.head_sha.toLowerCase(),
        branch: String(run.head_branch ?? ''), runCreatedAt: run.created_at,
        artifactId: artifact.id, artifactCreatedAt: artifact.created_at,
        expiresAt, status: expired ? 'expired' : expiresAt === null ? 'expiry-unknown' : 'available',
        sizeBytes: artifact.size_in_bytes
      });
    }
  }
  records.sort((a,b) => a.runId - b.runId || a.artifactId - b.artifactId);
  if (new Set(records.map(x => x.artifactId)).size !== records.length) {
    throw new Error('Duplicate artifact identifier');
  }
  return {
    schemaVersion: 1, repository, artifactName: NAME, generatedAt: now.toISOString(),
    scannedSuccessfulRuns: runs.length,
    available: records.filter(x => x.status === 'available').length,
    expired: records.filter(x => x.status === 'expired').length,
    expiryUnknown: records.filter(x => x.status === 'expiry-unknown').length,
    records,
    warnings: records.length < 2 ?
      ['Fewer than two resource artifacts found; historical comparison requires two preserved reports.'] : []
  };
}

if (process.argv[1] && import.meta.url === new URL('file://' + process.argv[1]).href) {
  try {
    const inventory = await collectResourceArtifactInventory({
      repository: process.env.GITHUB_REPOSITORY,
      token: process.env.GITHUB_TOKEN,
      maxRuns: Number(process.env.NEXT91_MAX_RUNS || 20)
    });
    await writeFile(process.env.NEXT91_INVENTORY_PATH || 'next91-resource-inventory.json',
      JSON.stringify(inventory, null, 2) + '\n', { flag: 'w' });
    console.log('Resource inventory: ' + inventory.records.length + ' artifacts; ' +
      inventory.available + ' available; ' + inventory.expired + ' expired.');
  } catch (error) {
    console.error('Resource inventory failed:', error.message);
    process.exitCode = 1;
  }
}
