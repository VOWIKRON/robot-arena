import './style.css';
import { RAPTOR, TITAN } from './engine/presets';
import { createMatch, stepMatch } from './engine/simulation';
import { SeededRandom } from './engine/random';
import type { MatchState } from './engine/types';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root missing');

app.innerHTML = `
<div class="shell">
<header><div><h1>Robot Arena</h1><div class="subtitle">Deterministische Kampf-Sandbox</div></div><div class="version" id="app-version">v0.1.7</div></header>
<div class="grid">
<section class="card">
<div class="arena" id="arena"><div class="bot bot-a" id="bot-a">R</div><div class="bot bot-b" id="bot-b">T</div></div>
<div class="controls"><button id="start">Start</button><button id="pause">Pause</button><button id="step">1 Tick</button><button id="reset">Reset</button></div>
<div class="status" id="status"></div>
</section>
<aside class="card"><label>Seed <input id="seed" type="number" value="4711" /></label><div id="stats"></div></aside>
</div>
<footer class="site-footer" aria-label="Projektinformationen">
  <a href="./testsuite.html">Testsuite</a>
  <span>Letzter Publish: <strong id="footer-published">wird geladen …</strong></span>
  <a href="./release-notes.html">Release Notes</a>
  <span>Letzter Publish: <strong id="footer-release-published">wird geladen …</strong></span>
  <a href="./backlog.html">Backlog</a>
  <span>Letzter Publish: <strong id="footer-backlog-published">wird geladen …</strong></span>
  <span>Nächster Lauf: <strong id="footer-next-run">wird geladen …</strong></span>
</footer>
</div>`;

let state: MatchState;
let rng: SeededRandom;
let timer: number | null = null;

const el = <T extends HTMLElement>(id: string): T => {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing #${id}`);
  return node as T;
};

function seedValue(): number {
  return Number(el<HTMLInputElement>('seed').value) || 4711;
}

function pause(): void {
  if (timer !== null) window.clearInterval(timer);
  timer = null;
}

function reset(): void {
  pause();
  state = createMatch(RAPTOR, TITAN);
  rng = new SeededRandom(seedValue());
  render();
}

function tick(): void {
  if (state.winner) {
    pause();
    return;
  }
  state = stepMatch(state, rng);
  render();
}

function start(): void {
  if (timer !== null) return;
  timer = window.setInterval(tick, 80);
}

function pct(value: number, max: number): string {
  return `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
}

function renderRobot(id: string, x: number, y: number): void {
  const node = el<HTMLDivElement>(id);
  node.style.left = `${x}%`;
  node.style.top = `${y}%`;
}

function robotStats(label: string, css: string, s: MatchState['robotA']): string {
  return `<div class="stat ${css}"><strong>${label}: ${s.definition.name}</strong><div>Struktur ${s.structure.toFixed(1)} / ${s.definition.maxStructure}</div><div class="bar"><div class="fill" style="width:${pct(s.structure, s.definition.maxStructure)}"></div></div><div>Energie ${s.energy.toFixed(1)} / ${s.definition.maxEnergy}</div></div>`;
}

function render(): void {
  renderRobot('bot-a', state.robotA.position.x, state.robotA.position.y);
  renderRobot('bot-b', state.robotB.position.x, state.robotB.position.y);
  el('stats').innerHTML =
    robotStats('A', 'robot-a', state.robotA) +
    robotStats('B', 'robot-b', state.robotB) +
    `<div>Tick: ${state.tick}</div>`;
  el('status').textContent = state.winner ? `Sieger: ${state.winner}` : 'Kampfbereit';
}

function formatDate(value: string | undefined): string {
  if (!value) return 'noch nicht verfügbar';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'noch nicht verfügbar';
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin'
  }).format(date);
}

async function loadFooterMetadata(): Promise<void> {
  try {
    const [versionResponse, buildResponse] = await Promise.all([
      fetch('./version.json', { cache: 'no-store' }),
      fetch('./build-info.json', { cache: 'no-store' })
    ]);
    const version = versionResponse.ok ? await versionResponse.json() as { version?: string; published?: string } : {};
    const build = buildResponse.ok ? await buildResponse.json() as { version?: string; nextRunAt?: string } : {};
    const published = formatDate(version.published);
    el('footer-published').textContent = published;
    el('footer-release-published').textContent = published;
    el('footer-backlog-published').textContent = published;
    el('footer-next-run').textContent = formatDate(build.nextRunAt);
    const visibleVersion = version.version ?? build.version;
    if (visibleVersion) el('app-version').textContent = `v${visibleVersion}`;
  } catch {
    el('footer-published').textContent = 'noch nicht verfügbar';
    el('footer-release-published').textContent = 'noch nicht verfügbar';
    el('footer-backlog-published').textContent = 'noch nicht verfügbar';
    el('footer-next-run').textContent = 'noch nicht verfügbar';
  }
}

el('start').addEventListener('click', start);
el('pause').addEventListener('click', pause);
el('step').addEventListener('click', tick);
el('reset').addEventListener('click', reset);
el('seed').addEventListener('change', reset);
reset();
void loadFooterMetadata();
