import './style.css';
import { RAPTOR_CHASSIS, TITAN_CHASSIS, RAPTOR_WEAPON, TITAN_WEAPON, BALANCED_MOTOR, SWIFT_MOTOR, HEAVY_MOTOR, STANDARD_ARMOR, LIGHT_ARMOR, HEAVY_ARMOR, STANDARD_ENERGY, CAPACITY_ENERGY, REGEN_ENERGY, STANDARD_SENSOR, SHORT_SENSOR, LONG_SENSOR } from './engine/presets';
import { buildRobotDefinition, validateRobotConfiguration, configurationWeight, DEFAULT_STRATEGY, type Armor, type Chassis, type EnergySupply, type Motor, type Sensor, type Weapon } from './engine/components';
import { createMatch, stepMatchWithEvents } from './engine/simulation';
import { SeededRandom } from './engine/random';
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
<header><div><h1>Robot Arena</h1><div class="subtitle">Deterministische Kampf-Sandbox</div></div><div class="version" id="app-version">v0.1.53</div></header>
<div class="grid">
<section class="card">
<div class="arena" id="arena"><div id="shot-layer" aria-hidden="true"></div><div class="bot bot-a" id="bot-a" aria-label="Roboter A"><span class="bot-body" aria-hidden="true"></span><span class="bot-energy" role="progressbar" aria-label="Energie Roboter A" aria-valuemin="0"><span class="bot-energy-fill"></span></span><span class="bot-health" aria-label="Lebensbalken Roboter A"><span class="bot-health-fill"></span></span><span class="bot-weapon" aria-hidden="true"></span><span class="bot-mark">A</span></div><div class="bot bot-b" id="bot-b" aria-label="Roboter B"><span class="bot-body" aria-hidden="true"></span><span class="bot-energy" role="progressbar" aria-label="Energie Roboter B" aria-valuemin="0"><span class="bot-energy-fill"></span></span><span class="bot-health" aria-label="Lebensbalken Roboter B"><span class="bot-health-fill"></span></span><span class="bot-weapon" aria-hidden="true"></span><span class="bot-mark">B</span></div></div>
<div class="controls"><button id="start">Start</button><button id="pause">Pause</button><button id="step">1 Tick</button><button id="reset">Reset</button><button id="open-config">Konfiguration</button></div>
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
