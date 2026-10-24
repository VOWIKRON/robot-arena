import './style.css';
import { RAPTOR_CHASSIS, TITAN_CHASSIS, RAPTOR_WEAPON, TITAN_WEAPON, BALANCED_MOTOR, SWIFT_MOTOR, HEAVY_MOTOR, STANDARD_ARMOR, LIGHT_ARMOR, HEAVY_ARMOR, STANDARD_ENERGY, CAPACITY_ENERGY, REGEN_ENERGY, STANDARD_SENSOR, SHORT_SENSOR, LONG_SENSOR } from './engine/presets';
import { buildRobotDefinition, validateRobotConfiguration, configurationWeight, DEFAULT_STRATEGY, type Armor, type Chassis, type EnergySupply, type Motor, type Sensor, type Weapon } from './engine/components';
import { createMatch, stepMatchWithEvents } from './engine/simulation';
import { SeededRandom } from './engine/random';
import { EventRecorder } from './engine/recorder';
import { downloadReplay, readReplayFile } from './engine/replay-io';
import { parseReplay, serializeReplay, type ReplayDocument } from './engine/replay-format';
import { ReplayPlayer } from './engine/replay-player';
import { analyzeReplay, type ReplayStatistics } from './engine/replay-stats';
import { RAPTOR, TITAN } from './engine/presets';
import { createTournamentDefinition, type TournamentDefinition } from './engine/tournament-model';
import { createRoundRobinSchedule } from './engine/tournament-schedule';
import { computeRoundRobinStandings } from './engine/tournament-standings';
import { createTournamentRun, advanceTournamentRun, pauseTournamentRun, resumeTournamentRun, cancelTournamentRun, type TournamentRun } from './engine/tournament-runner';
import { exportTournamentRun, importTournamentRun } from './engine/tournament-archive';
import { AVAILABLE_STRATEGIES } from './engine/strategies';
import { strategyLabel, strategyParameters, type StrategyType } from './engine/strategy-config';
import type { MatchState } from './engine/types';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root missing');

function strategyControls(side: 'a' | 'b'): string {
  const label = side.toUpperCase();
  return `<div class="strategy-controls"><label for="strategy-${side}">Strategie ${label}</label><select id="strategy-${side}">${AVAILABLE_STRATEGIES.map(item => `<option value="${item.value}">${item.label}</option>`).join('')}</select>
  <label>Energiereserve ${label} (% Maximalenergie)<input id="reserve-${side}" type="number" min="0" max="100" step="any" value="0"></label>
  <label id="target-field-${side}">Zielabstand ${label} (% Waffenreichweite)<input id="target-${side}" type="number" min="0" max="100" step="any" value="80"></label>
  <div id="defensive-fields-${side}" hidden><label>Rückzugsschwelle ${label} (% Struktur)<input id="threshold-${side}" type="number" min="0" max="100" step="any" value="70"></label><label>Sicherheitsabstand ${label} (% gegnerische Waffenreichweite)<input id="retreat-${side}" type="number" min="100" max="200" step="any" value="110"></label><p class="muted">Hält frühzeitig Abstand, maximal 95 % der eigenen Waffenreichweite. Ab der Rückzugsschwelle keine Verfolgung mehr.</p></div></div>`;
}

app.innerHTML = `
<div class="shell">
<header><div><h1>Robot Arena</h1><div class="subtitle">Deterministische Kampf-Sandbox</div></div><div class="version" id="app-version">v0.1.54</div></header>
<div class="grid">
<section class="card">
<div class="arena" id="arena"><div id="shot-layer" aria-hidden="true"></div><div class="bot bot-a" id="bot-a" aria-label="Roboter A"><span class="bot-body" aria-hidden="true"></span><span class="bot-energy" role="progressbar" aria-label="Energie Roboter A" aria-valuemin="0"><span class="bot-energy-fill"></span></span><span class="bot-health" aria-label="Lebensbalken Roboter A"><span class="bot-health-fill"></span></span><span class="bot-weapon" aria-hidden="true"></span><span class="bot-mark">A</span></div><div class="bot bot-b" id="bot-b" aria-label="Roboter B"><span class="bot-body" aria-hidden="true"></span><span class="bot-energy" role="progressbar" aria-label="Energie Roboter B" aria-valuemin="0"><span class="bot-energy-fill"></span></span><span class="bot-health" aria-label="Lebensbalken Roboter B"><span class="bot-health-fill"></span></span><span class="bot-weapon" aria-hidden="true"></span><span class="bot-mark">B</span></div></div>
<div class="controls"><button id="start">Start</button><button id="pause">Pause</button><button id="step">1 Tick</button><button id="reset">Reset</button><button id="open-config">Konfiguration</button><button id="open-replay">Replay</button><button id="open-tournament">Turnier</button></div>
<dialog id="tournament-dialog" aria-labelledby="tournament-title"><div class="config-dialog-card"><div class="config-dialog-header"><h2 id="tournament-title">Turnier planen</h2><button id="close-tournament" aria-label="Turnier schließen">×</button></div><p>Round Robin für 2 bis 16 Roboter. Die Planung verändert den laufenden Sandbox-Kampf nicht. Die Turnierausführung ist als deterministischer Engine-Runner vorbereitet; die Bedienung im Dialog folgt in einem späteren Entwicklungsschritt.</p><div class="tournament-options"><label>Teilnehmerzahl<input id="tournament-count" type="number" min="2" max="16" step="1" value="2"></label><label>Turnier-Startwert<input id="tournament-seed" type="number" min="0" max="9007199254740991" step="1" value="4711"></label><label>Ticklimit je Kampf<input id="tournament-ticks" type="number" min="1" max="3600" step="1" value="3600"></label></div><h3>Teilnehmer</h3><div id="tournament-participants" class="tournament-participants"></div><div class="controls"><button id="tournament-create">Spielplan erstellen</button><button id="tournament-run">Nächster Kampf</button><button id="tournament-pause">Pause</button><button id="tournament-resume">Fortsetzen</button><button id="tournament-cancel">Abbrechen</button><button id="tournament-export">Speichern</button><button id="tournament-import">Laden</button></div><input id="tournament-file" type="file" accept=".json,application/json" hidden aria-label="Turnierdatei"><p id="tournament-feedback" role="status" aria-live="polite" class="status"></p><section id="tournament-preview" hidden aria-label="Turniervorschau"><h3>Fortschritt</h3><p id="tournament-progress"></p><h3>Paarungen</h3><ol id="tournament-pairings" class="tournament-pairings"></ol><h3>Tabelle</h3><div id="tournament-table-scroll" class="tournament-table-scroll"></div></section></div></dialog>
<dialog id="replay-dialog" aria-labelledby="replay-title"><div class="config-dialog-card"><h2 id="replay-title">Replay-Dateien</h2><p>Aktuellen Kampf als JSON exportieren oder eine Replay-Datei prüfen. Die Wiedergabe zeigt aufgezeichnete Ereignisse ohne erneute Simulation; ein Import verändert den laufenden Kampf nicht.</p><div class="controls"><button id="replay-export">Replay exportieren</button><button id="replay-import">Replay importieren</button><button id="replay-load-current">Aktuellen Kampf laden</button><button id="close-replay">Schließen</button></div><input id="replay-file" type="file" accept=".json,application/json" hidden aria-label="Replay-Datei auswählen"><p id="replay-feedback" class="status" role="status" aria-live="polite"></p><div class="controls" aria-label="Replay-Steuerung"><button id="replay-play" disabled>Abspielen</button><button id="replay-pause" disabled>Pausieren</button><button id="replay-step" disabled>Replay-Schritt</button><button id="replay-reset" disabled>Replay-Anfang</button></div><p id="replay-progress" role="status" aria-live="polite">Kein Replay geladen</p><label for="replay-seek">Replay-Zeitleiste (Tick)<input id="replay-seek" type="range" min="0" max="0" value="0" step="1" disabled aria-label="Replay-Zeitleiste"></label><div id="replay-arena" class="replay-arena" role="img" aria-label="Rekonstruierte Roboterpositionen im Replay" hidden><svg id="replay-effects" class="replay-effects" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg><span id="replay-bot-a" class="replay-marker replay-marker-a">A</span><span id="replay-bot-b" class="replay-marker replay-marker-b">B</span></div><p id="replay-stats" class="replay-stats" role="status" aria-live="polite"></p><p id="replay-events" aria-label="Ereignisse im aktuellen Replay-Tick"></p><section id="replay-analysis" class="replay-analysis" aria-label="Replay-Kampfstatistik" hidden><h3>Kampfstatistik (gesamte Aufzeichnung)</h3><div class="replay-stat-grid"><div id="replay-stat-a" class="replay-stat-side"></div><div id="replay-stat-b" class="replay-stat-side"></div></div><p id="replay-result"></p></section></div></dialog>
<div class="status" id="status"></div>
</section>
<aside class="card battle-panel"><h2>Kampfstatus</h2><div id="stats"></div><div class="battle-hint">Konfiguration über den Button unter der Arena ändern.</div></aside>\n<dialog id="config-dialog" aria-labelledby="config-title"><div class="config-dialog-card"><div class="config-dialog-header"><h2 id="config-title">Roboter konfigurieren</h2><button id="close-config" aria-label="Konfiguration schließen">×</button></div><div class="config-grid"><div class="builder"><h2>Roboter A</h2><label>Chassis A <select id="chassis-a"><option value="raptor">Raptor Chassis</option><option value="titan">Titan Chassis</option></select></label><label>Motor A <select id="motor-a"><option value="balanced">Balanced Motor</option><option value="swift">Swift Motor</option><option value="heavy">Heavy Motor</option></select></label><label>Panzerung A <select id="armor-a"><option value="standard">Standard Armor</option><option value="light">Light Armor</option><option value="heavy">Heavy Armor</option></select></label><label>Energie A <select id="energy-a"><option value="standard">Standard Energy</option><option value="capacity">Capacity Energy</option><option value="regen">Regen Energy</option></select></label><label>Sensor A <select id="sensor-a"><option value="standard">Standard Sensor</option><option value="short">Short Sensor</option><option value="long">Long Sensor</option></select></label><label>Waffe A <select id="weapon-a"><option value="raptor">Raptor Cannon</option><option value="titan">Titan Cannon</option></select></label>${strategyControls('a')}<div class="preview" id="preview-a"></div><div class="validation" id="validation-a" role="status"></div></div><div class="builder"><h2>Roboter B</h2><label>Chassis B <select id="chassis-b"><option value="titan">Titan Chassis</option><option value="raptor">Raptor Chassis</option></select></label><label>Motor B <select id="motor-b"><option value="balanced">Balanced Motor</option><option value="swift">Swift Motor</option><option value="heavy">Heavy Motor</option></select></label><label>Panzerung B <select id="armor-b"><option value="standard">Standard Armor</option><option value="light">Light Armor</option><option value="heavy">Heavy Armor</option></select></label><label>Energie B <select id="energy-b"><option value="standard">Standard Energy</option><option value="capacity">Capacity Energy</option><option value="regen">Regen Energy</option></select></label><label>Sensor B <select id="sensor-b"><option value="standard">Standard Sensor</option><option value="short">Short Sensor</option><option value="long">Long Sensor</option></select></label><label>Waffe B <select id="weapon-b"><option value="titan">Titan Cannon</option><option value="raptor">Raptor Cannon</option></select></label>${strategyControls('b')}<div class="preview" id="preview-b"></div><div class="validation" id="validation-b" role="status"></div></div></div><label>Seed <input id="seed" type="number" value="4711" /></label><div class="dialog-actions"><button id="apply-config">Übernehmen &amp; Kampf zurücksetzen</button></div></div></dialog>
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
let recorder: EventRecorder;
let timer: number | null = null;
let replayPlayer: ReplayPlayer | null = null;
let replayStats: ReplayStatistics | null = null;
let replayTimer: number | null = null;

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

function selectedStrategy(side: 'a' | 'b') {
  const strategy = el<HTMLSelectElement>(`strategy-${side}`).value as StrategyType;
  const percent = (name: string) => el<HTMLInputElement>(`${name}-${side}`).valueAsNumber / 100;
  const movementParameters = strategy === 'defensive'
    ? { retreatStructureRatio: percent('threshold'), retreatDistanceFactor: percent('retreat') }
    : { targetDistanceRatio: percent('target') };
  return { strategy, strategyParameters: { ...movementParameters, energyReserveRatio: percent('reserve') } };
}

function updateStrategyFields(side: 'a' | 'b', resetDefaults = false): void {
  const { strategy } = selectedStrategy(side);
  const defensive = strategy === 'defensive';
  el(`target-field-${side}`).hidden = defensive;
  el(`defensive-fields-${side}`).hidden = !defensive;
  el<HTMLInputElement>(`target-${side}`).disabled = defensive;
  el<HTMLInputElement>(`threshold-${side}`).disabled = !defensive;
  el<HTMLInputElement>(`retreat-${side}`).disabled = !defensive;
  if (resetDefaults) {
    const defaults = strategyParameters(strategy);
    el<HTMLInputElement>(`reserve-${side}`).value = String(defaults.energyReserveRatio * 100);
    el<HTMLInputElement>(`target-${side}`).value = String(defaults.targetDistanceRatio * 100);
    el<HTMLInputElement>(`threshold-${side}`).value = String(defaults.retreatStructureRatio * 100);
    el<HTMLInputElement>(`retreat-${side}`).value = String(Math.round(defaults.retreatDistanceFactor * 100));
  }
}

function configurationValid(): boolean {
  return !validateRobotConfiguration(configurationA()).length && !validateRobotConfiguration(configurationB()).length;
}

function configurationA() {
  const chassis: Chassis = el<HTMLSelectElement>('chassis-a').value === 'titan' ? TITAN_CHASSIS : RAPTOR_CHASSIS;
  const motorValue = el<HTMLSelectElement>('motor-a').value;
  const motor: Motor = motorValue === 'swift' ? SWIFT_MOTOR : motorValue === 'heavy' ? HEAVY_MOTOR : BALANCED_MOTOR;
  const armorValue = el<HTMLSelectElement>('armor-a').value;
  const armor: Armor = armorValue === 'light' ? LIGHT_ARMOR : armorValue === 'heavy' ? HEAVY_ARMOR : STANDARD_ARMOR;
  const energyValue = el<HTMLSelectElement>('energy-a').value;
  const energySupply: EnergySupply = energyValue === 'capacity' ? CAPACITY_ENERGY : energyValue === 'regen' ? REGEN_ENERGY : STANDARD_ENERGY;
  const sensorValue = el<HTMLSelectElement>('sensor-a').value;
  const sensor: Sensor = sensorValue === 'short' ? SHORT_SENSOR : sensorValue === 'long' ? LONG_SENSOR : STANDARD_SENSOR;
  const weapon: Weapon = el<HTMLSelectElement>('weapon-a').value === 'titan' ? TITAN_WEAPON : RAPTOR_WEAPON;
  return { id: 'robot-a', name: 'Robot A', chassis, motor, armor, energySupply, sensor, weapon, ...selectedStrategy('a') };
}
function selectedRobotA() { return buildRobotDefinition(configurationA()); }
function configurationB() {
  const chassis: Chassis = el<HTMLSelectElement>('chassis-b').value === 'raptor' ? RAPTOR_CHASSIS : TITAN_CHASSIS;
  const motorValue = el<HTMLSelectElement>('motor-b').value;
  const motor: Motor = motorValue === 'swift' ? SWIFT_MOTOR : motorValue === 'heavy' ? HEAVY_MOTOR : BALANCED_MOTOR;
  const armorValue = el<HTMLSelectElement>('armor-b').value;
  const armor: Armor = armorValue === 'light' ? LIGHT_ARMOR : armorValue === 'heavy' ? HEAVY_ARMOR : STANDARD_ARMOR;
  const energyValue = el<HTMLSelectElement>('energy-b').value;
  const energySupply: EnergySupply = energyValue === 'capacity' ? CAPACITY_ENERGY : energyValue === 'regen' ? REGEN_ENERGY : STANDARD_ENERGY;
  const sensorValue = el<HTMLSelectElement>('sensor-b').value;
  const sensor: Sensor = sensorValue === 'short' ? SHORT_SENSOR : sensorValue === 'long' ? LONG_SENSOR : STANDARD_SENSOR;
  const weapon: Weapon = el<HTMLSelectElement>('weapon-b').value === 'raptor' ? RAPTOR_WEAPON : TITAN_WEAPON;
  return { id: 'robot-b', name: 'Robot B', chassis, motor, armor, energySupply, sensor, weapon, ...selectedStrategy('b') };
}
function selectedRobotB() { return buildRobotDefinition(configurationB()); }
function previewHtml(d: ReturnType<typeof selectedRobotA>, weight: number, maxWeight: number): string {
  return `<strong>Live-Werte</strong><span>Strategie: ${strategyLabel(d.strategy)}</span><span>Gewicht ${weight} / ${maxWeight}</span><span>Struktur ${d.maxStructure}</span><span>Energie ${d.maxEnergy} · +${d.energyRegen}/Tick</span><span>Energiereserve ${strategyParameters(d.strategy, d.strategyParameters).energyReserveRatio * 100} %</span><span>Tempo ${d.speed}</span><span>Sensor ${d.sensorRange}</span><span>Waffe: Reichweite ${d.weaponRange} · Schaden ${d.weaponDamage}</span><span>Kosten ${d.weaponEnergy} · Cooldown ${d.cooldownTicks}</span>`;
}
function renderPreview(): void {
  const errorsA = validateRobotConfiguration(configurationA());
  const errorsB = validateRobotConfiguration(configurationB());
  el('validation-a').textContent = errorsA.length ? `Ungültig: ${errorsA.join(', ')}` : 'Konfiguration gültig';
  el('validation-b').textContent = errorsB.length ? `Ungültig: ${errorsB.join(', ')}` : 'Konfiguration gültig';
  const invalid = errorsA.length > 0 || errorsB.length > 0;
  for (const id of ['start', 'step', 'apply-config']) el<HTMLButtonElement>(id).disabled = invalid;
  el('preview-a').innerHTML = errorsA.length ? `<strong>Live-Werte</strong><span>Gewicht ${configurationWeight(configurationA())} / ${configurationA().chassis.maxWeight}</span>` : previewHtml(selectedRobotA(), configurationWeight(configurationA()), configurationA().chassis.maxWeight);
  el('preview-b').innerHTML = errorsB.length ? `<strong>Live-Werte</strong><span>Gewicht ${configurationWeight(configurationB())} / ${configurationB().chassis.maxWeight}</span>` : previewHtml(selectedRobotB(), configurationWeight(configurationB()), configurationB().chassis.maxWeight);
}
function resetMatch(): void {
  pause();
  if (!configurationValid()) return;
  state = createMatch(selectedRobotA(), selectedRobotB());
  rng = new SeededRandom(seedValue());
  recorder = new EventRecorder(state.robotA.definition, state.robotB.definition, seedValue());
  el('replay-feedback').textContent = '';
  render();
}

function resetAll(): void {
  pause();
  el<HTMLSelectElement>('chassis-a').value = 'raptor';
  el<HTMLSelectElement>('motor-a').value = 'balanced';
  el<HTMLSelectElement>('armor-a').value = 'standard';
  el<HTMLSelectElement>('energy-a').value = 'standard';
  el<HTMLSelectElement>('sensor-a').value = 'standard';
  el<HTMLSelectElement>('weapon-a').value = 'raptor';
  el<HTMLSelectElement>('chassis-b').value = 'titan';
  el<HTMLSelectElement>('motor-b').value = 'balanced';
  el<HTMLSelectElement>('armor-b').value = 'standard';
  el<HTMLSelectElement>('energy-b').value = 'standard';
  el<HTMLSelectElement>('sensor-b').value = 'standard';
  el<HTMLSelectElement>('weapon-b').value = 'titan';
  for (const side of ['a', 'b'] as const) {
    el<HTMLSelectElement>(`strategy-${side}`).value = DEFAULT_STRATEGY;
    updateStrategyFields(side, true);
  }
  el<HTMLInputElement>('seed').value = '4711';
  renderPreview();
  resetMatch();
}

function tick(): void {
  if (!configurationValid()) return;
  if (state.outcome !== 'active') {
    pause();
    return;
  }
  const result = stepMatchWithEvents(state, rng);
  recorder.append(result);
  state = result.state;
  render();
  renderCombatEffects(result.events);
}

function start(): void {
  if (validateRobotConfiguration(configurationA()).length || validateRobotConfiguration(configurationB()).length) return;
  if (timer !== null) return;
  if (state.outcome !== 'active') resetMatch();
  tick();
  if (state.outcome === 'active') timer = window.setInterval(tick, 80);
}

function pct(value: number, max: number): string {
  return `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
}

function renderRobot(id: string, x: number, y: number, chassisId: string, weaponId: string, structure: number, maxStructure: number, energy: number, maxEnergy: number): void {
  const node = el<HTMLDivElement>(id);
  node.style.left = `${x}%`;
  node.style.top = `${y}%`;
  node.dataset.chassis = chassisId;
  node.dataset.weapon = weaponId;
  node.dataset.x = x.toFixed(3);
  node.dataset.y = y.toFixed(3);
  node.dataset.speed = (id === 'bot-a' ? state.robotA.definition.speed : state.robotB.definition.speed).toFixed(3);
  const health = node.querySelector<HTMLElement>('.bot-health-fill');
  const healthBar = node.querySelector<HTMLElement>('.bot-health');
  const healthPct = Math.max(0, Math.min(100, (structure / maxStructure) * 100));
  if (health) health.style.width = `${healthPct}%`;
  if (healthBar) healthBar.setAttribute('aria-valuenow', healthPct.toFixed(0));
  const energyBar = node.querySelector<HTMLElement>('.bot-energy');
  const energyFill = node.querySelector<HTMLElement>('.bot-energy-fill');
  if (energyFill) energyFill.style.width = pct(energy, maxEnergy);
  if (energyBar) {
    energyBar.setAttribute('aria-valuemax', String(maxEnergy));
    energyBar.setAttribute('aria-valuenow', String(energy));
    energyBar.setAttribute('aria-valuetext', `${energy.toFixed(1)} / ${maxEnergy} Energie`);
    energyBar.title = `Energie ${energy.toFixed(1)} / ${maxEnergy}`;
  }
  node.title = `${id === 'bot-a' ? 'Roboter A' : 'Roboter B'} · ${chassisId === 'titan-chassis' ? 'Titan' : 'Raptor'} Chassis`;
}

function renderCombatEffects(events: readonly { type: string; attackerId?: string; targetId?: string; sourceId?: string; amount?: number }[]): void {
  const layer = el<HTMLDivElement>('shot-layer');
  layer.replaceChildren();
  for (const event of events) {
    if (event.type !== 'shot' || !event.attackerId || !event.targetId) continue;
    const attacker = event.attackerId === state.robotA.definition.id ? state.robotA : state.robotB;
    const target = event.targetId === state.robotA.definition.id ? state.robotA : state.robotB;
    const dx = target.position.x - attacker.position.x;
    const dy = target.position.y - attacker.position.y;
    const beam = document.createElement('span');
    beam.className = 'shot-effect';
    beam.dataset.attacker = event.attackerId;
    beam.style.left = attacker.position.x + '%';
    beam.style.top = attacker.position.y + '%';
    beam.style.width = Math.hypot(dx, dy) + '%';
    beam.style.transform = 'rotate(' + Math.atan2(dy, dx) + 'rad)';
    layer.append(beam);
  }
  for (const event of events) {
    if (event.type !== 'damage' || !event.targetId || event.amount === undefined) continue;
    const target = event.targetId === state.robotA.definition.id ? state.robotA : state.robotB;
    const hit = document.createElement('span');
    hit.className = 'hit-effect';
    hit.dataset.target = event.targetId;
    hit.style.left = target.position.x + '%';
    hit.style.top = target.position.y + '%';
    hit.textContent = '-' + event.amount.toFixed(1);
    layer.append(hit);
    const botId = event.targetId === state.robotA.definition.id ? 'bot-a' : 'bot-b';
    const bot = el<HTMLDivElement>(botId);
    bot.classList.remove('is-hit');
    void bot.offsetWidth;
    bot.classList.add('is-hit');
  }
}

function robotStats(label: string, css: string, s: MatchState['robotA']): string {
  return `<div class="stat ${css}"><strong>${label}: ${s.definition.name}</strong><div class="battle-strategy">Strategie: ${strategyLabel(s.definition.strategy)}</div><div>Struktur ${s.structure.toFixed(1)} / ${s.definition.maxStructure}</div><div class="bar"><div class="fill" style="width:${pct(s.structure, s.definition.maxStructure)}"></div></div><div class="energy-value">Energie ${s.energy.toFixed(1)} / ${s.definition.maxEnergy}</div><div class="bar energy-bar"><div class="fill" style="width:${pct(s.energy, s.definition.maxEnergy)}"></div></div></div>`;
}

function render(): void {
  renderRobot('bot-a', state.robotA.position.x, state.robotA.position.y, configurationA().chassis.id, configurationA().weapon.id, state.robotA.structure, state.robotA.definition.maxStructure, state.robotA.energy, state.robotA.definition.maxEnergy);
  renderRobot('bot-b', state.robotB.position.x, state.robotB.position.y, configurationB().chassis.id, configurationB().weapon.id, state.robotB.structure, state.robotB.definition.maxStructure, state.robotB.energy, state.robotB.definition.maxEnergy);
  el('stats').innerHTML =
    robotStats('A', 'robot-a', state.robotA) +
    robotStats('B', 'robot-b', state.robotB) +
    `<div>Tick: ${state.tick}</div>`;
  el('status').textContent = state.outcome === 'draw' ? 'Unentschieden: Zeitlimit' : state.winner ? `Sieger: ${state.winner}` : 'Kampfbereit';
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

el<HTMLButtonElement>('open-config').addEventListener('click', () => el<HTMLDialogElement>('config-dialog').showModal());
el<HTMLButtonElement>('close-config').addEventListener('click', () => el<HTMLDialogElement>('config-dialog').close());
el<HTMLButtonElement>('apply-config').addEventListener('click', () => { renderPreview(); if (configurationValid()) { resetMatch(); el<HTMLDialogElement>('config-dialog').close(); } });
function stopReplayTimer(): void {
  if (replayTimer !== null) window.clearInterval(replayTimer);
  replayTimer = null;
  replayPlayer?.pause();
}
function renderReplay(): void {
  const player = replayPlayer;
  el('replay-progress').textContent = player
    ? `Replay Tick ${player.tick} / ${player.length}${player.atEnd ? ' · Ende' : ''}`
    : 'Kein Replay geladen';
  el('replay-events').textContent = !player ? '' :
    player.events.length ? `Ereignisse: ${player.events.map(event => event.type).join(', ')}` : 'Keine Ereignisse in diesem Tick';
  for (const id of ['replay-play', 'replay-step'] as const)
    el<HTMLButtonElement>(id).disabled = !player || player.atEnd;
  el<HTMLButtonElement>('replay-pause').disabled = !player || !player.isPlaying;
  el<HTMLButtonElement>('replay-reset').disabled = !player || player.tick === 0;
  const slider = el<HTMLInputElement>('replay-seek');
  slider.disabled = !player || player.length === 0;
  slider.max = String(player?.length ?? 0);
  slider.value = String(player?.tick ?? 0);
  el('replay-arena').hidden = !player;
  el('replay-analysis').hidden = !replayStats;
  if (replayStats) {
    for (const [id, stats] of [['replay-stat-a', replayStats.robotA], ['replay-stat-b', replayStats.robotB]] as const) {
      el(id).textContent = `${stats.name}: Schüsse ${stats.shots} · Treffer ${stats.hits} · Effektiver Schaden ${stats.effectiveDamage.toFixed(1)} · Energieverbrauch ${stats.energySpent.toFixed(1)}`;
    }
    el('replay-result').textContent = replayStats.outcome === 'victory'
      ? `Sieger: ${replayStats.winner === replayStats.robotA.id ? replayStats.robotA.name : replayStats.robotB.name}`
      : replayStats.outcome === 'draw' ? 'Ergebnis: Unentschieden' : 'Ergebnis: Kampf läuft';
  } else {
    el('replay-result').textContent = '';
  }

  const effects = document.querySelector<SVGSVGElement>('#replay-effects');
  if (!effects) throw new Error('Missing replay effects');
  effects.replaceChildren();
  if (player) {
    const replayState = player.state;
    const robots = [replayState.robotA, replayState.robotB] as const;
    for (const [index, robot] of robots.entries()) {
      const marker = el<HTMLSpanElement>(index === 0 ? 'replay-bot-a' : 'replay-bot-b');
      marker.style.left = robot.position.x + '%';
      marker.style.top = robot.position.y + '%';
      marker.title = robot.definition.name + ': Struktur ' + robot.structure.toFixed(1) + ', Energie ' + robot.energy.toFixed(1);
    }
    el('replay-stats').textContent = robots.map((robot, index) =>
      `${index === 0 ? 'A' : 'B'}: Position ${robot.position.x.toFixed(1)}/${robot.position.y.toFixed(1)} · Struktur ${robot.structure.toFixed(1)} · Energie ${robot.energy.toFixed(1)}`
    ).join(' | ');
    const findRobot = (id: string) => robots.find(robot => robot.definition.id === id);
    for (const event of player.events) {
      if (event.type === 'shot') {
        const from = findRobot(event.attackerId)?.position;
        const to = findRobot(event.targetId)?.position;
        if (!from || !to) continue;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        for (const [name, value] of [['x1', from.x], ['y1', from.y], ['x2', to.x], ['y2', to.y]] as const)
          line.setAttribute(name, String(value));
        line.setAttribute('class', 'replay-shot');
        effects.append(line);
      }
      if (event.type === 'damage') {
        const target = findRobot(event.targetId)?.position;
        if (!target) continue;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', String(target.x));
        circle.setAttribute('cy', String(target.y));
        circle.setAttribute('r', '3');
        circle.setAttribute('class', 'replay-damage');
        effects.append(circle);
      }
    }
  } else {
    el('replay-stats').textContent = '';
  }
}
function loadReplay(recording: ReplayDocument): void {
  stopReplayTimer();
  replayPlayer = new ReplayPlayer(recording);
  replayStats = analyzeReplay(recording);
  renderReplay();
}
el('open-replay').addEventListener('click', () => el<HTMLDialogElement>('replay-dialog').showModal());
el('close-replay').addEventListener('click', () => el<HTMLDialogElement>('replay-dialog').close());
el('replay-dialog').addEventListener('close', () => { stopReplayTimer(); renderReplay(); });
el('replay-load-current').addEventListener('click', () => {
  try {
    loadReplay(parseReplay(serializeReplay(recorder.snapshot(state))));
    el('replay-feedback').textContent = 'Aktueller Kampf für Replay geladen.';
  } catch (error) {
    el('replay-feedback').textContent = `Replay konnte nicht geladen werden: ${error instanceof Error ? error.message : 'unbekannter Fehler'}`;
  }
});
el('replay-play').addEventListener('click', () => {
  if (!replayPlayer?.play()) return;
  if (replayTimer !== null) window.clearInterval(replayTimer);
  replayTimer = window.setInterval(() => {
    replayPlayer?.advance();
    if (replayPlayer?.atEnd) stopReplayTimer();
    renderReplay();
  }, 120);
  renderReplay();
});
el('replay-pause').addEventListener('click', () => { stopReplayTimer(); renderReplay(); });
el('replay-step').addEventListener('click', () => { stopReplayTimer(); replayPlayer?.step(); renderReplay(); });
el('replay-reset').addEventListener('click', () => { stopReplayTimer(); replayPlayer?.reset(); renderReplay(); });
el<HTMLInputElement>('replay-seek').addEventListener('input', event => {
  if (!replayPlayer) return;
  stopReplayTimer();
  replayPlayer.seek(Number((event.currentTarget as HTMLInputElement).value));
  renderReplay();
});
el('replay-export').addEventListener('click', () => {
  try {
    downloadReplay(recorder.snapshot(state));
    el('replay-feedback').textContent = `Replay für ${state.tick} Ticks exportiert.`;
  } catch (error) {
    el('replay-feedback').textContent = `Replay-Export fehlgeschlagen: ${error instanceof Error ? error.message : 'unbekannter Fehler'}`;
  }
});
el('replay-import').addEventListener('click', () => el<HTMLInputElement>('replay-file').click());
el<HTMLInputElement>('replay-file').addEventListener('change', async (event) => {
  const input = event.currentTarget as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  try {
    const replay = await readReplayFile(file);
    loadReplay(replay);
    el('replay-feedback').textContent = `Replay geprüft: Seed ${replay.seed}, ${replay.frames.length} Ticks, ${replay.robotA.name} gegen ${replay.robotB.name}. Wiedergabe bereit.`;
  } catch (error) {
    el('replay-feedback').textContent = `Replay-Import abgelehnt: ${error instanceof Error ? error.message : 'unbekannter Fehler'}`;
  } finally {
    input.value = '';
  }
});

/** NEXT-55: The tournament planner owns no reference to the live MatchState or RNG. */
let tournamentDefinition: TournamentDefinition | null = null;
let tournamentRun: TournamentRun | null = null;
function tournamentStatus(): void {
  if (!tournamentRun) return;
  const result = computeRoundRobinStandings(tournamentRun.definition, tournamentRun.results);
  el('tournament-progress').textContent = `${result.completedMatches} / ${result.totalMatches} Kämpfe abgeschlossen · ${tournamentRun.status} · Führender: ${tournamentRun.definition.participants.find(p => p.id === result.standings[0]?.participantId)?.name ?? '–'} (${result.standings[0]?.points ?? 0} Punkte)`;
  const rows = el('tournament-table-scroll').querySelectorAll<HTMLTableRowElement>('tbody tr');
  result.standings.forEach((entry, i) => {
    const row = rows[i]; if (!row) return;
    const cells = row.querySelectorAll('td');
    const participant = tournamentRun!.definition.participants.find(p => p.id === entry.participantId);
    [participant?.name ?? entry.participantId, entry.played, entry.wins, entry.draws, entry.losses, entry.points, entry.structureDifference].forEach((value, j) => { if (cells[j]) cells[j]!.textContent = String(value); });
  });
}
function tournamentCount(): number {
  const count = el<HTMLInputElement>('tournament-count').valueAsNumber;
  if (!Number.isSafeInteger(count) || count < 2 || count > 16) {
    throw new Error('Teilnehmerzahl muss zwischen 2 und 16 liegen.');
  }
  return count;
}
function renderTournamentParticipants(): void {
  const host = el('tournament-participants');
  const previous = [...host.querySelectorAll<HTMLInputElement>('input[data-participant-name]')].map(input => input.value);
  const presets = [...host.querySelectorAll<HTMLSelectElement>('select[data-participant-preset]')].map(input => input.value);
  host.replaceChildren();
  try {
    const count = tournamentCount();
    for (let index = 0; index < count; index++) {
      const row = document.createElement('div');
      row.className = 'tournament-participant';
      const nameLabel = document.createElement('label');
      nameLabel.textContent = `Name Teilnehmer ${index + 1}`;
      const name = document.createElement('input');
      name.id = `tournament-name-${index + 1}`;
      name.dataset.participantName = 'true';
      name.maxLength = 80;
      name.value = previous[index] ?? `${index % 2 ? 'Titan' : 'Raptor'} ${index + 1}`;
      nameLabel.append(name);
      const presetLabel = document.createElement('label');
      presetLabel.textContent = `Robotertyp Teilnehmer ${index + 1}`;
      const select = document.createElement('select');
      select.id = `tournament-preset-${index + 1}`;
      select.dataset.participantPreset = 'true';
      for (const [value, title] of [['raptor', 'Raptor'], ['titan', 'Titan']] as const) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = title;
        select.append(option);
      }
      select.value = presets[index] ?? (index % 2 ? 'titan' : 'raptor');
      presetLabel.append(select);
      row.append(nameLabel, presetLabel);
      host.append(row);
    }
    el('tournament-feedback').textContent = '';
  } catch (error) {
    el('tournament-feedback').textContent = error instanceof Error ? error.message : 'Ungültige Teilnehmerzahl';
  }
  tournamentDefinition = null;
  tournamentRun = null;
  el('tournament-preview').hidden = true;
}
function buildTournamentDefinition(): TournamentDefinition {
  const count = tournamentCount();
  const seed = el<HTMLInputElement>('tournament-seed').valueAsNumber;
  const ticks = el<HTMLInputElement>('tournament-ticks').valueAsNumber;
  const participants = Array.from({ length: count }, (_, index) => {
    const name = el<HTMLInputElement>(`tournament-name-${index + 1}`).value.trim();
    const preset = el<HTMLSelectElement>(`tournament-preset-${index + 1}`).value;
    const robot = preset === 'titan' ? TITAN : RAPTOR;
    return { ...robot, id: `participant-${index + 1}`, name };
  });
  if (participants.some(participant => !participant.name)) throw new Error('Alle Teilnehmer benötigen einen Namen.');
  if (new Set(participants.map(participant => participant.name.toLocaleLowerCase('de'))).size !== count) {
    throw new Error('Teilnehmernamen müssen eindeutig sein.');
  }
  return createTournamentDefinition({
    schemaVersion: 1, id: 'sandbox-tournament', format: 'round-robin',
    baseSeed: seed, maxTicks: ticks, participants
  });
}
function renderTournamentPreview(): void {
  try {
    const definition = buildTournamentDefinition();
    const fixtures = createRoundRobinSchedule(definition);
    const result = computeRoundRobinStandings(definition, []);
    const names = new Map(definition.participants.map(robot => [robot.id, robot.name]));
    const list = el('tournament-pairings');
    list.replaceChildren();
    for (const fixture of fixtures) {
      const item = document.createElement('li');
      item.textContent = `${names.get(fixture.robotAId)} gegen ${names.get(fixture.robotBId)} · Seed ${fixture.seed}`;
      list.append(item);
    }
    const table = document.createElement('table');
    table.id = 'tournament-table';
    table.className = 'tournament-table';
    table.setAttribute('aria-label', 'Turniertabelle');
    const thead = document.createElement('thead');
    const header = document.createElement('tr');
    for (const label of ['Teilnehmer', 'Spiele', 'S', 'U', 'N', 'Punkte', 'Strukturdifferenz']) {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = label;
      header.append(th);
    }
    thead.append(header);
    const tbody = document.createElement('tbody');
    for (const standing of result.standings) {
      const tr = document.createElement('tr');
      for (const value of [
        names.get(standing.participantId) ?? standing.participantId, standing.played,
        standing.wins, standing.draws, standing.losses, standing.points, standing.structureDifference
      ]) {
        const td = document.createElement('td');
        td.textContent = String(value);
        tr.append(td);
      }
      tbody.append(tr);
    }
    table.append(thead, tbody);
    el('tournament-table-scroll').replaceChildren(table);
    el('tournament-progress').textContent = `${result.completedMatches} / ${result.totalMatches} Kämpfe abgeschlossen (0 %). Noch keine Turnierausführung.`;
    el('tournament-preview').hidden = false;
    el('tournament-feedback').textContent = `Spielplan mit ${definition.participants.length} Teilnehmern und ${fixtures.length} Paarungen erstellt.`;
    tournamentDefinition = definition;
  } catch (error) {
    tournamentDefinition = null;
    el('tournament-preview').hidden = true;
    el('tournament-feedback').textContent = `Turnier ungültig: ${error instanceof Error ? error.message : 'unbekannter Fehler'}`;
  }
}
el('open-tournament').addEventListener('click', () => {
  const dialog = el<HTMLDialogElement>('tournament-dialog');
  dialog.showModal();
  if (!tournamentDefinition) renderTournamentParticipants();
  el<HTMLInputElement>('tournament-count').focus();
});
el('close-tournament').addEventListener('click', () => el<HTMLDialogElement>('tournament-dialog').close());
el('tournament-dialog').addEventListener('close', () => el<HTMLButtonElement>('open-tournament').focus());
el('tournament-count').addEventListener('change', renderTournamentParticipants);
el('tournament-create').addEventListener('click', () => { renderTournamentPreview(); if (tournamentDefinition) { tournamentRun = createTournamentRun(tournamentDefinition); tournamentStatus(); } });
function tournamentAction(action: (run: TournamentRun) => TournamentRun): void {
  try {
    if (!tournamentRun) throw new Error('Bitte zuerst einen Spielplan erstellen oder laden.');
    tournamentRun = action(tournamentRun);
    tournamentStatus();
    el('tournament-feedback').textContent = 'Turnierstatus: ' + tournamentRun.status;
  } catch (error) { el('tournament-feedback').textContent = error instanceof Error ? error.message : 'Turnierfehler'; }
}
el('tournament-run').addEventListener('click', () => tournamentAction(advanceTournamentRun));
el('tournament-pause').addEventListener('click', () => tournamentAction(pauseTournamentRun));
el('tournament-resume').addEventListener('click', () => tournamentAction(resumeTournamentRun));
el('tournament-cancel').addEventListener('click', () => tournamentAction(cancelTournamentRun));
el('tournament-export').addEventListener('click', () => {
  try {
    if (!tournamentRun) throw new Error('Kein Turnier vorhanden');
    const url = URL.createObjectURL(new Blob([exportTournamentRun(tournamentRun)], { type: 'application/json' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'robot-arena-turnier.json'; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) { el('tournament-feedback').textContent = error instanceof Error ? error.message : 'Exportfehler'; }
});
el('tournament-import').addEventListener('click', () => el<HTMLInputElement>('tournament-file').click());
el('tournament-file').addEventListener('change', async () => {
  const input = el<HTMLInputElement>('tournament-file');
  try {
    const file = input.files?.[0];
    if (!file || file.size > 2 * 1024 * 1024) throw new Error('Datei fehlt oder ist zu groß');
    const loaded = importTournamentRun(await file.text());
    tournamentRun = loaded;
    tournamentDefinition = loaded.definition;
    el<HTMLInputElement>('tournament-count').value = String(loaded.definition.participants.length);
    renderTournamentParticipants();
    tournamentDefinition = loaded.definition;
    tournamentRun = loaded;
    el<HTMLInputElement>('tournament-seed').value = String(loaded.definition.baseSeed);
    el<HTMLInputElement>('tournament-ticks').value = String(loaded.definition.maxTicks);
    loaded.definition.participants.forEach((p, i) => { el<HTMLInputElement>(`tournament-name-${i + 1}`).value = p.name; });
    renderTournamentPreview();
    tournamentRun = loaded;
    tournamentStatus();
  } catch (error) { el('tournament-feedback').textContent = error instanceof Error ? error.message : 'Importfehler'; }
  finally { input.value = ''; }
});

el('start').addEventListener('click', start);
el('pause').addEventListener('click', pause);
el('step').addEventListener('click', tick);
el('reset').addEventListener('click', resetAll);
el('seed').addEventListener('change', resetMatch);
for (const id of ['chassis-a', 'motor-a', 'armor-a', 'energy-a', 'sensor-a', 'weapon-a', 'chassis-b', 'motor-b', 'armor-b', 'energy-b', 'sensor-b', 'weapon-b']) {
  el(id).addEventListener('change', () => { renderPreview(); resetMatch(); });
}
for (const side of ['a', 'b'] as const) {
  updateStrategyFields(side, true);
  el(`strategy-${side}`).addEventListener('change', () => {
    updateStrategyFields(side, true);
    renderPreview();
    resetMatch();
  });
  for (const name of ['target', 'threshold', 'retreat', 'reserve']) {
    el(`${name}-${side}`).addEventListener('input', () => {
      pause();
      renderPreview();
      resetMatch();
    });
  }
}
renderPreview();
resetMatch();
void loadFooterMetadata();
