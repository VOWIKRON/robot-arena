import './style.css';
import { RAPTOR_CHASSIS, TITAN_CHASSIS, RAPTOR_WEAPON, TITAN_WEAPON, BALANCED_MOTOR, SWIFT_MOTOR, HEAVY_MOTOR, STANDARD_ARMOR, LIGHT_ARMOR, HEAVY_ARMOR, STANDARD_ENERGY, CAPACITY_ENERGY, REGEN_ENERGY, STANDARD_SENSOR, SHORT_SENSOR, LONG_SENSOR } from './engine/presets';
import { buildRobotDefinition, validateRobotConfiguration, configurationWeight, type Armor, type Chassis, type EnergySupply, type Motor, type Sensor, type Weapon } from './engine/components';
import { createMatch, stepMatchWithEvents } from './engine/simulation';
import { SeededRandom } from './engine/random';
import type { MatchState } from './engine/types';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root missing');

app.innerHTML = `
<div class="shell">
<header><div><h1>Robot Arena</h1><div class="subtitle">Deterministische Kampf-Sandbox</div></div><div class="version" id="app-version">v0.1.28</div></header>
<div class="grid">
<section class="card">
<div class="arena" id="arena"><div id="shot-layer" aria-hidden="true"></div><div class="bot bot-a" id="bot-a" aria-label="Roboter A"><span class="bot-health" aria-label="Lebensbalken Roboter A"><span class="bot-health-fill"></span></span><span class="bot-weapon" aria-hidden="true"></span><span class="bot-mark">A</span></div><div class="bot bot-b" id="bot-b" aria-label="Roboter B"><span class="bot-health" aria-label="Lebensbalken Roboter B"><span class="bot-health-fill"></span></span><span class="bot-weapon" aria-hidden="true"></span><span class="bot-mark">B</span></div></div>
<div class="controls"><button id="start">Start</button><button id="pause">Pause</button><button id="step">1 Tick</button><button id="reset">Reset</button><button id="open-config">Konfiguration</button></div>
<div class="status" id="status"></div>
</section>
<aside class="card battle-panel"><h2>Kampfstatus</h2><div id="stats"></div><div class="battle-hint">Konfiguration über den Button unter der Arena ändern.</div></aside>\n<dialog id="config-dialog" aria-labelledby="config-title"><div class="config-dialog-card"><div class="config-dialog-header"><h2 id="config-title">Roboter konfigurieren</h2><button id="close-config" aria-label="Konfiguration schließen">×</button></div><div class="config-grid"><div class="builder"><h2>Roboter A</h2><label>Chassis A <select id="chassis-a"><option value="raptor">Raptor Chassis</option><option value="titan">Titan Chassis</option></select></label><label>Motor A <select id="motor-a"><option value="balanced">Balanced Motor</option><option value="swift">Swift Motor</option><option value="heavy">Heavy Motor</option></select></label><label>Panzerung A <select id="armor-a"><option value="standard">Standard Armor</option><option value="light">Light Armor</option><option value="heavy">Heavy Armor</option></select></label><label>Energie A <select id="energy-a"><option value="standard">Standard Energy</option><option value="capacity">Capacity Energy</option><option value="regen">Regen Energy</option></select></label><label>Sensor A <select id="sensor-a"><option value="standard">Standard Sensor</option><option value="short">Short Sensor</option><option value="long">Long Sensor</option></select></label><label>Waffe A <select id="weapon-a"><option value="raptor">Raptor Cannon</option><option value="titan">Titan Cannon</option></select></label><div class="preview" id="preview-a"></div><div class="validation" id="validation-a" role="status"></div></div><div class="builder"><h2>Roboter B</h2><label>Chassis B <select id="chassis-b"><option value="titan">Titan Chassis</option><option value="raptor">Raptor Chassis</option></select></label><label>Motor B <select id="motor-b"><option value="balanced">Balanced Motor</option><option value="swift">Swift Motor</option><option value="heavy">Heavy Motor</option></select></label><label>Panzerung B <select id="armor-b"><option value="standard">Standard Armor</option><option value="light">Light Armor</option><option value="heavy">Heavy Armor</option></select></label><label>Energie B <select id="energy-b"><option value="standard">Standard Energy</option><option value="capacity">Capacity Energy</option><option value="regen">Regen Energy</option></select></label><label>Sensor B <select id="sensor-b"><option value="standard">Standard Sensor</option><option value="short">Short Sensor</option><option value="long">Long Sensor</option></select></label><label>Waffe B <select id="weapon-b"><option value="titan">Titan Cannon</option><option value="raptor">Raptor Cannon</option></select></label><div class="preview" id="preview-b"></div><div class="validation" id="validation-b" role="status"></div></div></div><label>Seed <input id="seed" type="number" value="4711" /></label><div class="dialog-actions"><button id="apply-config">Übernehmen &amp; Kampf zurücksetzen</button></div></div></dialog>
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
  return { id: 'robot-a', name: 'Robot A', chassis, motor, armor, energySupply, sensor, weapon };
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
  return { id: 'robot-b', name: 'Robot B', chassis, motor, armor, energySupply, sensor, weapon };
}
function selectedRobotB() { return buildRobotDefinition(configurationB()); }
function previewHtml(d: ReturnType<typeof selectedRobotA>, weight: number, maxWeight: number): string {
  return `<strong>Live-Werte</strong><span>Gewicht ${weight} / ${maxWeight}</span><span>Struktur ${d.maxStructure}</span><span>Energie ${d.maxEnergy} · +${d.energyRegen}/Tick</span><span>Tempo ${d.speed}</span><span>Sensor ${d.sensorRange}</span><span>Waffe: Reichweite ${d.weaponRange} · Schaden ${d.weaponDamage}</span><span>Kosten ${d.weaponEnergy} · Cooldown ${d.cooldownTicks}</span>`;
}
function renderPreview(): void {
  const errorsA = validateRobotConfiguration(configurationA());
  const errorsB = validateRobotConfiguration(configurationB());
  el('validation-a').textContent = errorsA.length ? `Ungültig: ${errorsA.join(', ')}` : 'Konfiguration gültig';
  el('validation-b').textContent = errorsB.length ? `Ungültig: ${errorsB.join(', ')}` : 'Konfiguration gültig';
  el<HTMLButtonElement>('start').disabled = errorsA.length > 0 || errorsB.length > 0;
  el('preview-a').innerHTML = errorsA.length ? `<strong>Live-Werte</strong><span>Gewicht ${configurationWeight(configurationA())} / ${configurationA().chassis.maxWeight}</span>` : previewHtml(selectedRobotA(), configurationWeight(configurationA()), configurationA().chassis.maxWeight);
  el('preview-b').innerHTML = errorsB.length ? `<strong>Live-Werte</strong><span>Gewicht ${configurationWeight(configurationB())} / ${configurationB().chassis.maxWeight}</span>` : previewHtml(selectedRobotB(), configurationWeight(configurationB()), configurationB().chassis.maxWeight);
}
function resetMatch(): void {
  pause();
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
  el<HTMLInputElement>('seed').value = '4711';
  renderPreview();
  resetMatch();
}

function tick(): void {
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

function renderRobot(id: string, x: number, y: number, chassisId: string, weaponId: string, structure: number, maxStructure: number): void {
  const node = el<HTMLDivElement>(id);
  node.style.left = `${x}%`;
  node.style.top = `${y}%`;
  node.dataset.chassis = chassisId;
  node.dataset.weapon = weaponId;
  const health = node.querySelector<HTMLElement>('.bot-health-fill');
  const healthBar = node.querySelector<HTMLElement>('.bot-health');
  const healthPct = Math.max(0, Math.min(100, (structure / maxStructure) * 100));
  if (health) health.style.width = `${healthPct}%`;
  if (healthBar) healthBar.setAttribute('aria-valuenow', healthPct.toFixed(0));
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
  return `<div class="stat ${css}"><strong>${label}: ${s.definition.name}</strong><div>Struktur ${s.structure.toFixed(1)} / ${s.definition.maxStructure}</div><div class="bar"><div class="fill" style="width:${pct(s.structure, s.definition.maxStructure)}"></div></div><div>Energie ${s.energy.toFixed(1)} / ${s.definition.maxEnergy}</div></div>`;
}

function render(): void {
  renderRobot('bot-a', state.robotA.position.x, state.robotA.position.y, configurationA().chassis.id, configurationA().weapon.id, state.robotA.structure, state.robotA.definition.maxStructure);
  renderRobot('bot-b', state.robotB.position.x, state.robotB.position.y, configurationB().chassis.id, configurationB().weapon.id, state.robotB.structure, state.robotB.definition.maxStructure);
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
el<HTMLButtonElement>('apply-config').addEventListener('click', () => { renderPreview(); resetMatch(); el<HTMLDialogElement>('config-dialog').close(); });
el('start').addEventListener('click', start);
el('pause').addEventListener('click', pause);
el('step').addEventListener('click', tick);
el('reset').addEventListener('click', resetAll);
el('seed').addEventListener('change', resetMatch);
for (const id of ['chassis-a', 'motor-a', 'armor-a', 'energy-a', 'sensor-a', 'weapon-a', 'chassis-b', 'motor-b', 'armor-b', 'energy-b', 'sensor-b', 'weapon-b']) {
  el(id).addEventListener('change', () => { renderPreview(); resetMatch(); });
}
renderPreview();
resetMatch();
void loadFooterMetadata();
