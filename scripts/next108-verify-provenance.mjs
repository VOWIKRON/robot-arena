// NEXT-108: fail-closed verification of an isolated GitHub Actions QA run.
// This tool NEVER authorizes a release, merges, publishes or deploys.
const SHA = /^[0-9a-f]{40}$/i;
const DIGEST = /^sha256:[0-9a-f]{64}$/i;
const REQUIRED_STEPS = [
  'Run npm run typecheck',
  'Run npm test',
  'Run npm run build',
  'Verify second clean install and reproducible build on identical SHA',
  'Enforce zero known dependency advisories',
  'Install WebKit browser and Linux runtime dependencies',
  'Run npm run test:e2e'
];
const REQUIRED_ARTIFACTS = ['robot-arena-dist', 'robot-arena-dependency-audit'];
const fail = message => { throw new Error('NEXT-108 PROVENANCE BLOCKED: ' + message); };

export function evaluateProvenance({ run, jobs, artifacts, expected, mode = 'final' }) {
  if (!expected || typeof expected !== 'object') fail('missing expected identity');
  const { repository, sha, branch, runId } = expected;
  if (typeof repository !== 'string' || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) fail('invalid expected repository');
  if (typeof sha !== 'string' || !SHA.test(sha)) fail('invalid expected commit SHA');
  // Explicitly allow only these isolated QA branches; never main, tags or arbitrary feature refs.
  const isolatedQaBranches = new Set([
    "feature/NEXT-79e-automated-preflight-20261029-0700",
    "feature/NEXT-79e-AUTO4-provenance-fix-20261029-0800",
    "feature/NEXT-79e-AUTO5-dialog-keyboard-20261029-0800",
    "feature/NEXT-79e-AUTO6-motion-regression-20261029-0800"
    ,"feature/NEXT-110-SMOKE-STRICT-20261029-2000"
    ,"feature/NEXT-110-FOOTER-BOUNDARY-20261029-2000"
    ,"docs/NEXT-110-RC5-qa-failure-20261029-2000"
    ,"integration/NEXT-112-combat-speed-20261029-2105"
    ,"integration/NEXT-112-combat-speed-reg-20261029-2105"
    ,"feature/NEXT-112-C-webkit-clock-20261029-2200"
    ,"feature/NEXT-113-A-spacebar-control-20261029-2200"
    ,"feature/NEXT-113-B-spacebar-reg-20261029-2200"
    ,"feature/NEXT-114-A-ten-tick-20261029-2300"
    ,"feature/NEXT-114-B-ten-tick-e2e-20261029-2300"
    ,"feature/NEXT-114-C-batch-refactor-20261029-2300"
    ,"feature/NEXT-115-A-combat-range-20261029-2357"
    ,"feature/NEXT-115-B-range-unit-20261029-2357"
    ,"feature/NEXT-115-C-range-e2e-20261029-2357"
    ,"feature/NEXT-112-D-interval-harness-20261030-0100"
    ,"feature/NEXT-114-D-manual-timer-reg-20261030-0100"
    ,"docs/NEXT-115-webkit-qa-evidence-20261030-0100"
    ,"feature/NEXT-112-F-interval-isolation-20261030-0120"
    ,"docs/NEXT-112-F-evidence-20261030-0157"
    ,"feature/NEXT-116-A-range-trend-20261030-0157"
    ,"feature/NEXT-116-B-range-trend-reg-20261030-0157"
    ,"feature/NEXT-116-C-trend-boundary-20261030-0300"
    ,"feature/NEXT-117-A-strategy-safety-20261030-0300"
    ,"feature/NEXT-117-B-strategy-symmetry-20261030-0300"
    ,"docs/NEXT-117-C-compat-audit-20261030-0400"
    ,"feature/NEXT-117-D-tactical-preview-20261030-0400"
    ,"feature/NEXT-117-E-tactical-tests-20261030-0400"
]);
  if (typeof branch !== 'string' || !(branch.startsWith('integration/NEXT-110-') || isolatedQaBranches.has(branch))) fail('unexpected QA branch');
  if (!Number.isSafeInteger(Number(runId)) || Number(runId) < 1) fail('invalid expected run ID');
  if (!['final', 'in-run'].includes(mode)) fail('unknown verification mode');
  if (!run || Number(run.id) !== Number(runId)) fail('workflow run ID mismatch');
  if (run.head_sha !== sha || run.head_branch !== branch) fail('workflow SHA or branch mismatch');
  if (run.repository?.full_name !== repository) fail('workflow repository mismatch');
  if (run.event !== 'push') fail('workflow event is not isolated branch push');
  if (!String(run.path || '').includes('.github/workflows/feature-qa.yml')) fail('unexpected workflow file');
  if (mode === 'final' && (run.status !== 'completed' || run.conclusion !== 'success')) fail('workflow is not fully successful');
  if (mode === 'in-run' && !(
    (run.status === 'in_progress' && run.conclusion == null) ||
    (run.status === 'completed' && run.conclusion === 'success')
  )) fail('workflow has invalid state');
  if (!Array.isArray(jobs) || jobs.length === 0) fail('missing workflow jobs');
  const quality = jobs.filter(job => job.name === 'quality');
  if (quality.length !== 1 || quality[0].status !== 'completed' || quality[0].conclusion !== 'success') fail('quality job missing, duplicate or not successful');
  if (Number(quality[0].run_id) !== Number(runId)) fail('quality job belongs to another run');
  if (quality[0].head_sha != null && quality[0].head_sha !== sha) fail('quality job SHA mismatch');
  const steps = quality[0].steps;
  if (!Array.isArray(steps)) fail('missing quality job steps');
  for (const name of REQUIRED_STEPS) {
    const matching = steps.filter(step => step.name === name);
    if (matching.length !== 1 || matching[0].status !== 'completed' || matching[0].conclusion !== 'success') fail('missing or unsuccessful step: ' + name);
  }
  const uploads = steps.filter(step => step.name === 'Run actions/upload-artifact@v4' && step.status === 'completed' && step.conclusion === 'success');
  if (uploads.length < 2) fail('both artifact upload steps must pass');
  if (!Array.isArray(artifacts)) fail('missing artifacts');
  for (const name of REQUIRED_ARTIFACTS) {
    const matching = artifacts.filter(a => a.name === name);
    if (matching.length !== 1) fail('missing or duplicate artifact: ' + name);
    const a = matching[0];
    if (!Number.isSafeInteger(a.id) || a.id <= 0 || !(a.size_in_bytes > 0) || a.expired !== false || !DIGEST.test(a.digest || '')) fail('invalid or expired artifact: ' + name);
    if (Number(a.workflow_run?.id) !== Number(runId) || a.workflow_run?.head_sha !== sha || a.workflow_run?.head_branch !== branch) fail('artifact provenance mismatch: ' + name);
  }
  return Object.freeze({ gate: 'PASS', verifiedSha: sha, verifiedRunId: Number(runId),
    artifacts: REQUIRED_ARTIFACTS.slice(), mode, releaseAuthorized: false,
    externalFinalVerificationRequired: mode === 'in-run', manualAcceptancePending: ['NEXT-79e'] });
}

async function githubJson(url, token) {
  const response = await fetch(url, { headers: {
    Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  } });
  if (!response.ok) fail('GitHub API returned HTTP ' + response.status);
  return response.json();
}

export async function verifyGithubProvenance(env = process.env) {
  const { GITHUB_TOKEN: token, GITHUB_REPOSITORY: repository, GITHUB_SHA: sha,
    GITHUB_REF_NAME: branch, GITHUB_RUN_ID: runId } = env;
  if (!token || !repository || !sha || !branch || !runId) fail('required GitHub environment variables missing');
  const base = 'https://api.github.com/repos/' + repository + '/actions/runs/' + encodeURIComponent(runId);
  const [run, jobPage, artifactPage] = await Promise.all([
    githubJson(base, token),
    githubJson(base + '/jobs?per_page=100', token),
    githubJson(base + '/artifacts?per_page=100', token)
  ]);
  if (!Number.isSafeInteger(jobPage.total_count) || jobPage.total_count !== jobPage.jobs?.length) fail('job pagination incomplete');
  if (!Number.isSafeInteger(artifactPage.total_count) || artifactPage.total_count !== artifactPage.artifacts?.length) fail('artifact pagination incomplete');
  return evaluateProvenance({ run, jobs: jobPage.jobs, artifacts: artifactPage.artifacts,
    expected: { repository, sha, branch, runId }, mode: env.NEXT108_MODE || 'final' });
}

if (process.argv[1] && import.meta.url === new URL('file://' + process.argv[1]).href) {
  verifyGithubProvenance().then(result => {
    console.log(JSON.stringify(result, null, 2));
  }).catch(error => {
    console.error(String(error.message || error));
    process.exitCode = 1;
  });
}
