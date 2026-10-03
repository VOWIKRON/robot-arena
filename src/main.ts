import './style.css';
import { RAPTOR, TITAN } from './engine/presets';
import { createMatch, stepMatch } from './engine/simulation';
import { SeededRandom } from './engine/random';
import type { MatchState } from './engine/types';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root missing');

app.innerHTML = `
<div class="shell">
<header><div><h1>Robot Arena</h1><div class="subtitle">Deterministische Kampf-Sandbox</div></div><div class="version">v0.1.0 · Bootstrap</div></header>
<div class="grid">
<section class="card">
<div class="arena" id="arena"><div class="bot bot-a" id="bot-a">R</div><div class="bot bot-b" id="bot-b">T</div></div>
<div class="controls"><button id="start">Start</button><button id="pause">Pause</button><button id="step">1 Tick</button><button id="reset">Reset</button></div>
<div class="status" id="status"></div>
</section>
<aside class="card"><label>Seed <input id="seed" type="number" value="4711" /></label><div id="stats"></div></aside>
</div>
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

el('start').addEventListener('click', start);
el('pause').addEventListener('click', pause);
el('step').addEventListener('click', tick);
el('reset').addEventListener('click', reset);
el('seed').addEventListener('change', reset);
reset();
