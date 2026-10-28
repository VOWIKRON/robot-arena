import './style.css';
import { RAPTOR_CHASSIS, TITAN_CHASSIS, RAPTOR_WEAPON, TITAN_WEAPON, BALANCED_MOTOR, SWIFT_MOTOR, HEAVY_MOTOR, STANDARD_ARMOR, LIGHT_ARMOR, HEAVY_ARMOR, STANDARD_ENERGY, CAPACITY_ENERGY, REGEN_ENERGY, STANDARD_SENSOR, SHORT_SENSOR, LONG_SENSOR } from './engine/presets';
import { buildRobotDefinition, validateRobotConfiguration, configurationWeight, DEFAULT_STRATEGY, type Armor, type Chassis, type EnergySupply, type Motor, type Sensor, type Weapon } from './engine/components';
import { createMatch, stepMatchWithEvents } from './engine/simulation';
import { SeededRandom } from './engine/random';
import { EventRecorder } from './engine/recorder';
import { downloadReplay, readReplayFile } from './engine/replay-io';
import { parseReplay, serializeReplay, type ReplayDocument } from './engine/replay-format';
import { parseReplayV2, type ReplayDocumentV2 } from './engine/replay-v2';
import { ReplayPlayer } from './engine/replay-player';
import { analyzeReplay, type ReplayStatistics } from './engine/replay-stats';
import { RAPTOR, TITAN } from './engine/presets';
import { createTournamentDefinition, type TournamentDefinition } from './engine/tournament-model';
import { serializeRobotPreset, importRobotPreset } from './engine/robot-preset-format';
import { createRoundRobinSchedule } from './engine/tournament-schedule';
import { computeRoundRobinStandings } from './engine/tournament-standings';
import { tournamentMatchDetails } from './engine/tournament-details';
import { filterTournamentMatches, type TournamentMatchFilterStatus } from './engine/tournament-match-filter';
import { replayTournamentMatch } from './engine/tournament-replay';
import { runKnockoutBracket } from './engine/tournament-knockout';
import { exportTournamentTableCsv, exportTournamentTableJson } from './engine/tournament-export';
import { exportTournamentMatchCsv, exportTournamentMatchJson } from './engine/tournament-match-export';
import { downloadTournamentFile } from './engine/tournament-download';
import { createTournamentRun, advanceTournamentRun, pauseTournamentRun, resumeTournamentRun, cancelTournamentRun, type TournamentRun } from './engine/tournament-runner';
import { exportTournamentRun, importTournamentRun } from './engine/tournament-archive';
import { isTournamentAutosaveEnabled } from './engine/tournament-local-save';
import { TournamentAutosaveGuard, formatTournamentStorageError, AUTOSAVE_CONFLICT_NOTICE } from './engine/tournament-storage-guard';
import { AVAILABLE_STRATEGIES } from './engine/strategies';
import { strategyLabel, strategyParameters, type StrategyType } from './engine/strategy-config';
import type { MatchState } from './engine/types';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root missing');

function strategyControls(side: 'a' | 'b'): string {
  const label = side.toUpperCase();
  return `<div class="strategy-controls"><label for="strategy-${side}">Strategie ${label}</label><span class="field-help" id="strategy-help-${side}">Die Strategie bestimmt, ob der Roboter angreift, Abstand hält, ausweicht oder seine Taktik an Struktur, Energie und Bedrohung anpasst.</span><select id="strategy-${side}" aria-describedby="strategy-help-${side}">${AVAILABLE_STRATEGIES.map(item => `<option value="${item.value}">${item.label}</option>`).join('')}</select>
  <label>Energiereserve ${label} (% Maximalenergie)<span class="field-help" id="reserve-help-${side}">Dieser Anteil bleibt für spätere Aktionen zurückgehalten.</span><input aria-describedby="reserve-help-${side}" id="reserve-${side}" type="number" min="0" max="100" step="any" value="0"></label>
  <label id="target-field-${side}">Zielabstand ${label} (% Waffenreichweite)<input id="target-${side}" type="number" min="0" max="100" step="any" value="80"></label>
  <div id="defensive-fields-${side}" hidden><label>Rückzugsschwelle ${label} (% Struktur)<input id="threshold-${side}" type="number" min="0" max="100" step="any" value="70"></label><label>Sicherheitsabstand ${label} (% gegnerische Waffenreichweite)<input id="retreat-${side}" type="number" min="100" max="200" step="any" value="110"></label><p class="muted">Defensiv hält frühzeitig Abstand. Adaptiv zieht sich bei Schaden, Energiemangel oder überlegener gegnerischer Reichweite zurück. Rückzug maximal 95 % der eigenen Waffenreichweite.</p></div></div>`;
}

app.innerHTML = `
<div class="shell">
<header><div><h1>Robot Arena</h1><div class="subtitle">Deterministische Kampf-Sandbox</div></div><div class="version" id="app-version">v0.1.54</div></header>
<div class="grid">
<section class="card">
<div class="arena" id="arena"><div id="shot-layer" aria-hidden="true"></div><div class="bot bot-a" id="bot-a" aria-label="Roboter A"><span class="bot-body" aria-hidden="true"></span><span class="bot-energy" role="progressbar" aria-label="Energie Roboter A" aria-valuemin="0"><span class="bot-energy-fill"></span></span><span class="bot-health" aria-label="Lebensbalken Roboter A"><span class="bot-health-fill"></span></span><span class="bot-weapon" aria-hidden="true"></span><span class="bot-mark">A</span></div><div class="bot bot-b" id="bot-b" aria-label="Roboter B"><span class="bot-body" aria-hidden="true"></span><span class="bot-energy" role="progressbar" aria-label="Energie Roboter B" aria-valuemin="0"><span class="bot-energy-fill"></span></span><span class="bot-health" aria-label="Lebensbalken Roboter B"><span class="bot-health-fill"></span></span><span class="bot-weapon" aria-hidden="true"></span><span class="bot-mark">B</span></div></div>
<div class="arena-actions" aria-label="Aktionen"><div class="arena-action-group arena-action-group--combat" role="group" aria-label="Kampfsteuerung"><span class="action-group-label" aria-hidden="true">Kampf</span><button id="start">Start</button><button id="pause">Pause</button><button id="step">1 Tick</button><button id="reset">Reset</button></div><div class="arena-action-group arena-action-group--tools" role="group" aria-label="Werkzeuge"><span class="action-group-label" aria-hidden="true">Werkzeuge</span><button id="open-config">Konfiguration</button><button id="open-replay">Replay</button><button id="open-tournament">Turnier</button></div></div>
<dialog id="tournament-dialog" aria-labelledby="tournament-title" aria-describedby="tournament-description"><div class="config-dialog-card"><div class="config-dialog-header"><h2 id="tournament-title">Turnier planen</h2><button id="close-tournament" aria-label="Turnier schließen">×</button></div><p id="tournament-description">Turniere für 2 bis 16 Roboter: Round Robin mit einzelnem oder automatischem Kampfablauf und optional ausgeglichener Seitenzuordnung, oder K.-o.-Bracket. Der Sandbox-Kampf bleibt unverändert.</p><nav class="tournament-steps" aria-label="Turnierschritte"><a href="#tournament-setup">1 · Einrichten</a><a href="#tournament-play">2 · Spielen</a><a href="#tournament-results">3 · Ergebnisse</a></nav><section id="tournament-setup" class="tournament-step" aria-labelledby="tournament-setup-heading"><h3 id="tournament-setup-heading">1 · Einrichten</h3><p>Wähle Format und Teilnehmer. Erstelle anschließend einen Spielplan.</p><div class="tournament-options"><label>Teilnehmerzahl<input id="tournament-count" type="number" min="2" max="16" step="1" value="2"></label><label>Turnier-Startwert<span class="field-help" id="tournament-seed-help">Gleicher Startwert und gleiche Roboter erzeugen dieselben Kampfergebnisse.</span><input aria-describedby="tournament-seed-help" id="tournament-seed" type="number" min="0" max="9007199254740991" step="1" value="4711"></label><label>Ticklimit je Kampf<span class="field-help" id="tournament-ticks-help">Ein Tick ist ein Simulationsschritt. Das Limit beendet zu lange Kämpfe.</span><input aria-describedby="tournament-ticks-help" id="tournament-ticks" type="number" min="1" max="3600" step="1" value="3600"></label></div><h3>Teilnehmer</h3><div id="tournament-participants" class="tournament-participants"></div><label>Turnierformat<span class="field-help" id="tournament-format-help">Jeder gegen jeden: alle Paarungen. K.-o.: Verlierer scheiden aus.</span><select aria-describedby="tournament-format-help" id="tournament-format"><option value="round-robin">Jeder gegen jeden</option><option value="knockout">K.-o.-Turnier</option></select></label><label>Kampfregeln (Round Robin)<select id="tournament-ruleset"><option value="sequential-v1">Klassisch (v1, kompatibel mit bisherigen Archiven)</option><option value="simultaneous-v2">Gleichzeitig (v2, experimentell)</option></select></label><label>Seitenzuordnung (Round Robin)<select id="tournament-side-assignment"><option value="legacy">Klassisch (bisheriges Verhalten)</option><option value="balanced">Ausgeglichen (A/B-Differenz höchstens 1)</option></select></label><div class="controls"><button id="tournament-create">Spielplan erstellen</button></div></section><section id="tournament-play" class="tournament-step" aria-labelledby="tournament-play-heading"><h3 id="tournament-play-heading">2 · Spielen</h3><p>Starte einzelne Kämpfe oder den gesamten Spielplan. Du kannst jederzeit pausieren und fortsetzen.</p><div class="controls"><button id="tournament-run">Nächster Kampf</button><button id="tournament-auto">Alle Kämpfe spielen</button><button id="tournament-pause">Pause</button><button id="tournament-resume">Fortsetzen</button><button id="tournament-cancel">Abbrechen</button></div></section><section id="tournament-results" class="tournament-step" aria-labelledby="tournament-results-heading"><h3 id="tournament-results-heading">3 · Ergebnisse</h3><p>Fortschritt, Paarungen und Tabelle werden nach dem Erstellen des Spielplans angezeigt.</p><div class="controls"><button id="tournament-export">Speichern</button><button id="tournament-table-csv">Tabelle CSV</button><button id="tournament-table-json">Tabelle JSON</button></div><details class="tournament-advanced" open><summary>Turnierdateien und lokale Sicherung</summary><div class="controls"><button id="tournament-import">Laden</button></div><div class="tournament-local-save"><label><input id="tournament-autosave" type="checkbox"> Automatisch nur in diesem Browser sichern</label><button id="tournament-restore" type="button">Lokale Sicherung laden</button><button id="tournament-clear-saved" type="button">Lokale Sicherung löschen</button></div></details><input id="tournament-file" type="file" accept=".json,application/json" hidden aria-label="Turnierdatei"><p id="tournament-save-status" role="status" aria-live="polite" aria-atomic="true" class="tournament-save-status" data-state="idle"></p><p id="tournament-feedback" role="status" aria-live="polite" class="status"></p><section id="tournament-preview" hidden aria-label="Turniervorschau"><h3>Fortschritt</h3><p id="tournament-progress" role="status" aria-live="polite" aria-label="Turnierfortschritt"></p><h3>Paarungen</h3><div class="tournament-match-filters" role="group" aria-label="Paarungen filtern"><label for="tournament-match-search">Teilnehmer oder Match-ID<input id="tournament-match-search" type="search" autocomplete="off" placeholder="Name oder match-001"></label><label for="tournament-match-status">Ergebnisstatus<select id="tournament-match-status"><option value="all">Alle</option><option value="pending">Ausstehend</option><option value="completed">Abgeschlossen</option></select></label><button id="tournament-match-reset" type="button">Suche zurücksetzen</button></div><p id="tournament-match-count" role="status" aria-live="polite" class="tournament-filter-summary"></p><ol id="tournament-pairings" class="tournament-pairings" tabindex="0" aria-label="Spielplan, mit Pfeiltasten scrollbar"></ol><h3>Tabelle</h3><p class="field-help">Reststruktur bezeichnet die verbleibenden Lebenspunkte nach einem Kampf.</p><div id="tournament-table-scroll" class="tournament-table-scroll" tabindex="0" role="region" aria-label="Turniertabelle, horizontal scrollbar"></div></section></section></div></dialog>
<dialog id="replay-dialog" aria-labelledby="replay-title"><div class="config-dialog-card"><h2 id="replay-title">Replay-Dateien</h2><p>Aktuellen Kampf als JSON exportieren oder eine Replay-Datei prüfen. Die Wiedergabe zeigt aufgezeichnete Ereignisse ohne erneute Simulation; ein Import verändert den laufenden Kampf nicht.</p><div class="controls"><button id="replay-export">Replay exportieren</button><button id="replay-import">Replay importieren</button><button id="replay-load-current">Aktuellen Kampf laden</button><button id="close-replay">Schließen</button></div><input id="replay-file" type="file" accept=".json,application/json" hidden aria-label="Replay-Datei auswählen"><p id="replay-feedback" class="status" role="status" aria-live="polite"></p><div class="controls" aria-label="Replay-Steuerung"><button id="replay-play" disabled>Abspielen</button><button id="replay-pause" disabled>Pausieren</button><button id="replay-step" disabled>Replay-Schritt</button><button id="replay-reset" disabled>Replay-Anfang</button></div><p id="replay-progress" role="status" aria-live="polite">Kein Replay geladen</p><label for="replay-seek">Replay-Zeitleiste (Tick)<input id="replay-seek" type="range" min="0" max="0" value="0" step="1" disabled aria-label="Replay-Zeitleiste"></label><div id="replay-arena" class="replay-arena" role="img" aria-label="Rekonstruierte Roboterpositionen im Replay" hidden><svg id="replay-effects" class="replay-effects" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg><span id="replay-bot-a" class="replay-marker replay-marker-a">A</span><span id="replay-bot-b" class="replay-marker replay-marker-b">B</span></div><p id="replay-stats" class="replay-stats" role="status" aria-live="polite"></p><p id="replay-events" aria-label="Ereignisse im aktuellen Replay-Tick"></p><section id="replay-analysis" class="replay-analysis" aria-label="Replay-Kampfstatistik" hidden><h3>Kampfstatistik (gesamte Aufzeichnung)</h3><div class="replay-stat-grid"><div id="replay-stat-a" class="replay-stat-side"></div><div id="replay-stat-b" class="replay-stat-side"></div></div><p id="replay-result"></p></section></div></dialog>
<div class="status" id="status"></div>
</section>
<aside class="card battle-panel"><h2>Kampfstatus</h2><div id="stats"></div><div class="battle-hint">Konfiguration über den Button unter der Arena ändern.</div></aside>\n<dialog id="config-dialog" aria-labelledby="config-title"><div class="config-dialog-card"><div class="config-dialog-header"><h2 id="config-title">Roboter konfigurieren</h2><button id="close-config" aria-label="Konfiguration schließen">×</button></div><div class="config-grid"><div class="builder"><h2>Roboter A</h2><label>Chassis A <select id="chassis-a"><option value="raptor">Raptor Chassis</option><option value="titan">Titan Chassis</option></select></label><label>Motor A <select id="motor-a"><option value="balanced">Balanced Motor</option><option value="swift">Swift Motor</option><option value="heavy">Heavy Motor</option></select></label><label>Panzerung A <select id="armor-a"><option value="standard">Standard Armor</option><option value="light">Light Armor</option><option value="heavy">Heavy Armor</option></select></label><label>Energie A <select id="energy-a"><option value="standard">Standard Energy</option><option value="capacity">Capacity Energy</option><option value="regen">Regen Energy</option></select></label><label>Sensor A <select id="sensor-a"><option value="standard">Standard Sensor</option><option value="short">Short Sensor</option><option value="long">Long Sensor</option></select></label><label>Waffe A <select id="weapon-a"><option value="raptor">Raptor Cannon</option><option value="titan">Titan Cannon</option></select></label>${strategyControls('a')}<div class="preview" id="preview-a"></div><div class="validation" id="validation-a" role="status"></div></div><div class="builder"><h2>Roboter B</h2><label>Chassis B <select id="chassis-b"><option value="titan">Titan Chassis</option><option value="raptor">Raptor Chassis</option></select></label><label>Motor B <select id="motor-b"><option value="balanced">Balanced Motor</option><option value="swift">Swift Motor</option><option value="heavy">Heavy Motor</option></select></label><label>Panzerung B <select id="armor-b"><option value="standard">Standard Armor</option><option value="light">Light Armor</option><option value="heavy">Heavy Armor</option></select></label><label>Energie B <select id="energy-b"><option value="standard">Standard Energy</option><option value="capacity">Capacity Energy</option><option value="regen">Regen Energy</option></select></label><label>Sensor B <select id="sensor-b"><option value="standard">Standard Sensor</option><option value="short">Short Sensor</option><option value="long">Long Sensor</option></select></label><label>Waffe B <select id="weapon-b"><option value="titan">Titan Cannon</option><option value="raptor">Raptor Cannon</option></select></label>${strategyControls('b')}<div class="preview" id="preview-b"></div><div class="validation" id="validation-b" role="status"></div></div></div><label>Seed <input id="seed" type="number" value="4711" /></label><div class="controls" role="group" aria-label="Roboterpresets"><button id="save-robot-preset-a" type="button">Roboter A als Preset speichern</button><button id="save-robot-preset-b" type="button">Roboter B als Preset speichern</button><button id="import-robot-preset" type="button">Preset-Datei importieren</button></div><input id="robot-preset-file" type="file" accept=".json,application/json" hidden aria-label="Roboterpreset-Datei"><p id="robot-preset-feedback" class="status" role="status" aria-live="polite"></p><div class="dialog-actions"><button id="apply-config">Übernehmen &amp; Kampf zurücksetzen</button></div></div></dialog>
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
let replayDrawReason: 'destroyed' | 'timeout' | null = null;
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
  const wasRunning = timer !== null;
  if (timer !== null) window.clearInterval(timer);
  timer = null;
  if (wasRunning && state) render();
}

function selectedStrategy(side: 'a' | 'b') {
  const strategy = el<HTMLSelectElement>(`strategy-${side}`).value as StrategyType;
  const percent = (name: string) => el<HTMLInputElement>(`${name}-${side}`).valueAsNumber / 100;
  const movementParameters = strategy === 'defensive'
    ? { retreatStructureRatio: percent('threshold'), retreatDistanceFactor: percent('retreat') }
    : strategy === 'adaptive'
      ? { targetDistanceRatio: percent('target'), retreatStructureRatio: percent('threshold'), retreatDistanceFactor: percent('retreat') }
      : { targetDistanceRatio: percent('target') };
  return { strategy, strategyParameters: { ...movementParameters, energyReserveRatio: percent('reserve') } };
}

function updateStrategyFields(side: 'a' | 'b', resetDefaults = false): void {
  const { strategy } = selectedStrategy(side);
  const defensive = strategy === 'defensive';
  el(`target-field-${side}`).hidden = defensive;
  el(`defensive-fields-${side}`).hidden = !(defensive || strategy === 'adaptive');
  el<HTMLInputElement>(`target-${side}`).disabled = defensive;
  el<HTMLInputElement>(`threshold-${side}`).disabled = !(defensive || strategy === 'adaptive');
  el<HTMLInputElement>(`retreat-${side}`).disabled = !(defensive || strategy === 'adaptive');
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
  if (state.outcome === 'active') {
    timer = window.setInterval(tick, 80);
    render();
  }
}

function pct(value: number, max: number): string {
  return `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
}

function renderRobot(id: string, x: number, y: number, chassisId: string, weaponId: string, structure: number, maxStructure: number, energy: number, maxEnergy: number): void {
  const node = el<HTMLDivElement>(id);
  // Keep raw world coordinates available to existing tests and diagnostics.
  node.style.left = `${x}%`;
  node.style.top = `${y}%`;
  // The CSS visual clamp (important) keeps the entire chassis and HUD visible.
  // Never clamp engine coordinates: deterministic matches/replays must stay unchanged.
  node.style.setProperty('--arena-x', `${x}%`);
  node.style.setProperty('--arena-y', `${y}%`);
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
  const phase = timer !== null ? 'Kampf läuft' : state.tick > 0 ? 'Kampf pausiert' : 'Kampfbereit';
  el('status').textContent = state.outcome === 'draw' ? 'Unentschieden: Zeitlimit' : state.winner ? `Sieger: ${state.winner}` : phase;
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
      : replayStats.outcome === 'draw'
        ? `Ergebnis: Unentschieden${replayDrawReason === 'destroyed' ? ' (Double-KO)' : replayDrawReason === 'timeout' ? ' (Ticklimit)' : ''}`
        : 'Ergebnis: Kampf läuft';
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
    ).join(' | '); // Result lives in #replay-result; keep #replay-stats for live positions only.
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
function loadReplay(recording: ReplayDocument | ReplayDocumentV2): void {
  stopReplayTimer();
  replayPlayer = new ReplayPlayer(recording);
  // Both versioned formats share the shot/hit/damage event contract; draw markers are ignored by the pure analyzer.
  replayStats = analyzeReplay(recording);
  replayDrawReason = recording.schemaVersion === 2 && recording.finalState.outcome === 'draw'
    ? recording.finalState.endReason : null;
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
    // Keep the existing v1 file reader and add strict, opt-in v2 parsing.
    const replay = file.size > 2_000_000
      ? (() => { throw new Error('Replay-Datei zu groß (2 MB)'); })()
      : (await file.text());
    const version = JSON.parse(replay) as { schemaVersion?: unknown };
    const recording = version.schemaVersion === 2 ? parseReplayV2(replay) : await readReplayFile(file);
    loadReplay(recording);
    el('replay-feedback').textContent = `Replay geprüft: Seed ${recording.seed}, ${recording.frames.length} Ticks, ${recording.robotA.name} gegen ${recording.robotB.name}. Wiedergabe bereit.`;
  } catch (error) {
    el('replay-feedback').textContent = `Replay-Import abgelehnt: ${error instanceof Error ? error.message : 'unbekannter Fehler'}`;
  } finally {
    input.value = '';
  }
});

/** NEXT-55: The tournament planner owns no reference to the live MatchState or RNG. */
let tournamentDefinition: TournamentDefinition | null = null;
let tournamentRun: TournamentRun | null = null;
let tournamentAutoTimer: number | null = null;
let tournamentAutoRequested = false;
/** NEXT-77: capture the local storage revision at page load, before another tab changes it. */
let tournamentAutosaveGuard: TournamentAutosaveGuard | null = null;
/** Serialize operations within this tab; Web Locks serialize across tabs. */
let tournamentStorageQueue: Promise<void> = Promise.resolve();
/** NEXT-95: status is independent of the general tournament feedback, which may
 * report a match result while a Web Lock is still waiting for another tab. */
let tournamentStoragePending = 0;
let tournamentStorageFailed = false;
function tournamentSaveStatus(state: 'busy' | 'saved' | 'error', message?: string): void {
  const status = el('tournament-save-status');
  status.dataset.state = state;
  status.textContent = message ?? (state === 'busy'
    ? 'Lokale Sicherung läuft …'
    : state === 'saved' ? 'Lokale Sicherung abgeschlossen.' : 'Lokale Sicherung fehlgeschlagen.');
}
function queueTournamentStorage<T>(action: () => Promise<T>): Promise<T> {
  if (tournamentStoragePending === 0) tournamentStorageFailed = false;
  tournamentStoragePending++;
  tournamentSaveStatus('busy');
  const next = tournamentStorageQueue.then(action, action);
  tournamentStorageQueue = next.then(() => undefined, () => undefined);
  // Every operation settles exactly once. Never show "saved" while queued writes
  // remain; a failed write keeps the batch in the error state.
  void next.then(
    () => {
      tournamentStoragePending--;
      if (tournamentStoragePending === 0) tournamentSaveStatus(tournamentStorageFailed ? 'error' : 'saved');
    },
    () => {
      tournamentStorageFailed = true;
      tournamentStoragePending--;
      if (tournamentStoragePending === 0) tournamentSaveStatus('error');
    }
  );
  return next;
}
function autosaveGuard(): TournamentAutosaveGuard {
  if (!tournamentAutosaveGuard) tournamentAutosaveGuard = new TournamentAutosaveGuard(window.localStorage);
  return tournamentAutosaveGuard;
}
/** NEXT-79c: available actions are derived from the runner, never a second UI state. */
function syncTournamentActions(): void {
  const status = tournamentRun?.status;
  const active = Boolean(status && status !== 'completed' && status !== 'cancelled');
  // A paused tournament must be resumed explicitly; no second start button bypasses Pause.
  for (const id of ['tournament-run', 'tournament-auto']) {
    el<HTMLButtonElement>(id).disabled = !active || status === 'paused';
  }
  el<HTMLButtonElement>('tournament-pause').disabled = !active || status === 'paused';
  el<HTMLButtonElement>('tournament-resume').disabled = status !== 'paused';
  el<HTMLButtonElement>('tournament-cancel').disabled = !active;
  const v2 = tournamentRun?.definition.schemaVersion === 2;
  const autosave = el<HTMLInputElement>('tournament-autosave');
  autosave.disabled = v2;
  if (v2) autosave.checked = false;
  for (const id of ['tournament-export', 'tournament-table-csv', 'tournament-table-json']) {
    el<HTMLButtonElement>(id).disabled = !tournamentRun;
  }
}
/** Only explicit opt-in writes a validated archive at match/status boundaries. */
function persistTournamentSnapshot(): void {
  // Local autosave uses a v1-only storage key and must never overwrite it with v2.
  if (!tournamentRun || tournamentRun.definition.schemaVersion === 2 || !el<HTMLInputElement>('tournament-autosave').checked) return;
  const snapshot = tournamentRun; // Preserve match-boundary order even during rapid auto-play.
  void queueTournamentStorage(() => autosaveGuard().saveLocked(snapshot, navigator.locks))
    .catch(error => {
      el('tournament-feedback').textContent = 'Lokale Sicherung fehlgeschlagen: ' + formatTournamentStorageError(error);
    });
}
function stopTournamentAuto(clearIntent = true): void {
  if (tournamentAutoTimer !== null) window.clearTimeout(tournamentAutoTimer);
  tournamentAutoTimer = null;
  if (clearIntent) tournamentAutoRequested = false;
}
/** Read-only UI projection: search never mutates the tournament snapshot. */
function applyTournamentMatchFilter(): void {
  const count = el('tournament-match-count');
  if (!tournamentRun) { count.textContent = 'Kein aktives Round-Robin-Turnier'; return; }
  const query = el<HTMLInputElement>('tournament-match-search').value;
  const status = el<HTMLSelectElement>('tournament-match-status').value as TournamentMatchFilterStatus;
  const matches = tournamentMatchDetails(tournamentRun);
  const visibleIds = new Set(filterTournamentMatches(matches, query, status).map(match => match.matchId));
  el('tournament-pairings').querySelectorAll<HTMLLIElement>('li').forEach(item => {
    item.hidden = !visibleIds.has(item.dataset.matchId ?? '');
  });
  count.textContent = `${visibleIds.size} von ${matches.length} Paarungen angezeigt.`;
}
let tournamentMatchFilterTimer: number | null = null;
el<HTMLInputElement>('tournament-match-search').addEventListener('input', () => {
  if (tournamentMatchFilterTimer !== null) window.clearTimeout(tournamentMatchFilterTimer);
  tournamentMatchFilterTimer = window.setTimeout(() => {
    tournamentMatchFilterTimer = null;
    applyTournamentMatchFilter();
  }, 160);
});
el<HTMLSelectElement>('tournament-match-status').addEventListener('change', () => {
  if (tournamentMatchFilterTimer !== null) window.clearTimeout(tournamentMatchFilterTimer);
  tournamentMatchFilterTimer = null;
  applyTournamentMatchFilter();
});
el('tournament-match-reset').addEventListener('click', () => {
  if (tournamentMatchFilterTimer !== null) window.clearTimeout(tournamentMatchFilterTimer);
  tournamentMatchFilterTimer = null;
  el<HTMLInputElement>('tournament-match-search').value = '';
  el<HTMLSelectElement>('tournament-match-status').value = 'all';
  applyTournamentMatchFilter();
  el<HTMLInputElement>('tournament-match-search').focus();
});
/** Match details always derive from the immutable runner snapshot, never UI guesses. */
function renderTournamentMatchDetails(): void {
  if (!tournamentRun) return;
  const items = el('tournament-pairings').querySelectorAll<HTMLLIElement>('li');
  tournamentMatchDetails(tournamentRun).forEach((match, index) => {
    const item = items[index];
    if (!item) return;
    const outcome = match.status === 'pending'
      ? 'Ausstehend'
      : `Ticks ${match.ticks} · Sieger: ${match.winnerName ?? 'Unentschieden'} · Reststruktur A/B: ${match.remainingStructureA} / ${match.remainingStructureB}`;
    // textContent deliberately prevents participant names from being interpreted as markup.
    item.textContent = `${match.robotAName} gegen ${match.robotBName} · Seed ${match.seed} · ${outcome}`;
    item.dataset.matchId = match.matchId;
    if (match.status === 'completed') {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tournament-replay-button';
      button.textContent = 'Replay abspielen';
      button.setAttribute('aria-label', 'Replay abspielen: ' + match.robotAName + ' gegen ' + match.robotBName);
      button.dataset.replayMatchId = match.matchId;
      item.append(' ', button);
      for (const format of ['csv', 'json'] as const) {
        const exportButton = document.createElement('button');
        exportButton.type = 'button';
        exportButton.className = 'tournament-replay-button';
        exportButton.textContent = format.toUpperCase();
        exportButton.setAttribute('aria-label', `Kampf ${format.toUpperCase()} exportieren: ${match.robotAName} gegen ${match.robotBName}`);
        exportButton.dataset.matchExportId = match.matchId;
        exportButton.dataset.matchExportFormat = format;
        item.append(' ', exportButton);
      }
    }
  });
  applyTournamentMatchFilter();
}
/** Delegated event: re-rendering a fixture never leaves stale replay handlers. */
el('tournament-pairings').addEventListener('click', event => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest<HTMLButtonElement>('button[data-replay-match-id]');
  if (!button) return;
  try {
    if (!tournamentRun) throw new Error('Kein Turnier geladen');
    const recording = replayTournamentMatch(tournamentRun, button.dataset.replayMatchId ?? '');
    stopTournamentAuto();
    loadReplay(recording);
    el('replay-feedback').textContent = 'Turnierkampf verifiziert und isoliert geladen.';
    el<HTMLDialogElement>('tournament-dialog').close();
    el<HTMLDialogElement>('replay-dialog').showModal();
  } catch (error) {
    el('tournament-feedback').textContent = error instanceof Error ? error.message : 'Replay konnte nicht geladen werden';
  }
});
/** NEXT-70: only completed, validated match details can be downloaded. */
el('tournament-pairings').addEventListener('click', event => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest<HTMLButtonElement>('button[data-match-export-id]');
  if (!button) return;
  try {
    if (!tournamentRun) throw new Error('Kein Turnier geladen');
    const matchId = button.dataset.matchExportId ?? '';
    const format = button.dataset.matchExportFormat;
    if (format !== 'csv' && format !== 'json') throw new Error('Unbekanntes Exportformat');
    const content = format === 'csv'
      ? exportTournamentMatchCsv(tournamentRun, matchId)
      : exportTournamentMatchJson(tournamentRun, matchId);
    downloadTournamentFile(content, format === 'csv' ? 'text/csv;charset=utf-8' : 'application/json', `robot-arena-${matchId.replace(/[^a-z0-9_-]/gi, '_')}.${format}`);
    el('tournament-feedback').textContent = `Kampf ${matchId} als ${format.toUpperCase()} exportiert.`;
  } catch (error) {
    el('tournament-feedback').textContent = 'Kampfexport fehlgeschlagen: ' + (error instanceof Error ? error.message : 'unbekannter Fehler');
  }
});
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
  renderTournamentMatchDetails();
  syncTournamentActions();
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
  try {
    // Validate before replacing the editor: a temporarily invalid count must not erase names.
    const count = tournamentCount();
    // A repeated native change event (or a redundant change to the same count)
    // must not recreate the editor and erase names typed since the first event.
    if (previous.length !== count) {
      host.replaceChildren();
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
      for (const [value, title] of [['raptor', 'Raptor'], ['titan', 'Titan'], ['sandbox-a', 'Sandbox-Roboter A (aktuelle Konfiguration)'], ['sandbox-b', 'Sandbox-Roboter B (aktuelle Konfiguration)'], ['saved-a', 'Gespeichertes Preset A'], ['saved-b', 'Gespeichertes Preset B'], ['saved-imported', 'Importiertes Preset']] as const) {
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
    }
    el('tournament-feedback').textContent = '';
  } catch (error) {
    reportTournamentDraftError(error);
  }
  // Editing a draft must not interrupt a paused/automatically running tournament.
  if (!tournamentRun) {
    tournamentDefinition = null;
    el('tournament-preview').hidden = true;
  }
}
/** NEXT-79d: report the exact invalid draft field without touching an active runner. */
function reportTournamentDraftError(error: unknown): void {
  const message = error instanceof Error ? error.message : 'unbekannter Fehler';
  el('tournament-feedback').textContent = 'Turnier ungültig: ' + message;
  const nameInputs = [...el('tournament-participants').querySelectorAll<HTMLInputElement>('input[data-participant-name]')];
  let target: HTMLInputElement | HTMLSelectElement | null = null;
  if (message.startsWith('Teilnehmerzahl')) target = el<HTMLInputElement>('tournament-count');
  else if (message.startsWith('Turnier-Startwert')) target = el<HTMLInputElement>('tournament-seed');
  else if (message.startsWith('Ticklimit')) target = el<HTMLInputElement>('tournament-ticks');
  else if (message.startsWith('Teilnehmername fehlt')) target = nameInputs.find(input => !input.value.trim()) ?? null;
  else if (message.startsWith('Roboterpreset')) target = [...el('tournament-participants').querySelectorAll<HTMLSelectElement>('select[data-participant-preset]')].find(input => input.value.startsWith('saved-')) ?? null;
  else if (message.startsWith('Teilnehmernamen doppelt')) {
    const seen = new Set<string>();
    target = nameInputs.find(input => {
      const name = input.value.trim().toLocaleLowerCase('de');
      if (seen.has(name)) return true;
      seen.add(name);
      return false;
    }) ?? null;
  }
  if (!target) return;
  target.setAttribute('aria-invalid', 'true');
  const describedBy = (target.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean);
  if (!describedBy.includes('tournament-feedback')) describedBy.push('tournament-feedback');
  target.setAttribute('aria-describedby', describedBy.join(' '));
  target.focus();
}
/** Remove stale errors before the next validation attempt or after an input correction. */
function clearTournamentDraftError(input: HTMLInputElement): void {
  input.removeAttribute('aria-invalid');
  const describedBy = (input.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(id => id && id !== 'tournament-feedback');
  if (describedBy.length) input.setAttribute('aria-describedby', describedBy.join(' '));
  else input.removeAttribute('aria-describedby');
}
el('tournament-dialog').addEventListener('input', event => {
  if (!(event.target instanceof HTMLInputElement)) return;
  const wasInvalid = event.target.getAttribute('aria-invalid') === 'true';
  clearTournamentDraftError(event.target);
  // A corrected field must not leave an obsolete error announced as current.
  // The new draft is not marked valid until the user creates the plan again.
  if (wasInvalid && el('tournament-feedback').textContent?.startsWith('Turnier ungültig:')) {
    el('tournament-feedback').textContent = 'Eingabe geändert. Bitte Spielplan erstellen, um die Änderungen zu prüfen.';
  }
});
const ROBOT_PRESET_KEY = 'robot-arena:robot-preset:';
function loadSavedRobotPreset(slot: string) {
  const stored = window.localStorage.getItem(ROBOT_PRESET_KEY + slot);
  if (!stored) throw new Error('Roboterpreset fehlt: Bitte zuerst in der Konfiguration speichern oder importieren.');
  return importRobotPreset(stored);
}
for (const side of ['a', 'b'] as const) {
  el(`save-robot-preset-${side}`).addEventListener('click', () => {
    try {
      const configuration = side === 'a' ? configurationA() : configurationB();
      window.localStorage.setItem(ROBOT_PRESET_KEY + side, serializeRobotPreset(configuration));
      el('robot-preset-feedback').textContent = `Roboter ${side.toUpperCase()} als versioniertes Preset gespeichert.`;
    } catch (error) {
      el('robot-preset-feedback').textContent = 'Preset konnte nicht gespeichert werden: ' + (error instanceof Error ? error.message : 'unbekannter Fehler');
    }
  });
}
el('import-robot-preset').addEventListener('click', () => el<HTMLInputElement>('robot-preset-file').click());
el<HTMLInputElement>('robot-preset-file').addEventListener('change', async event => {
  const input = event.currentTarget as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  try {
    if (file.size > 16 * 1024) throw new Error('Roboterpreset: Datei zu groß');
    const content = await file.text();
    const validated = importRobotPreset(content);
    window.localStorage.setItem(ROBOT_PRESET_KEY + 'imported', serializeRobotPreset(validated));
    el('robot-preset-feedback').textContent = 'Preset importiert: ' + validated.name;
  } catch (error) {
    el('robot-preset-feedback').textContent = 'Preset-Import abgelehnt: ' + (error instanceof Error ? error.message : 'unbekannter Fehler');
  } finally {
    input.value = '';
  }
});
function buildTournamentDefinition(): TournamentDefinition {
  const count = tournamentCount();
  const seed = el<HTMLInputElement>('tournament-seed').valueAsNumber;
  const ticks = el<HTMLInputElement>('tournament-ticks').valueAsNumber;
  if (!Number.isSafeInteger(seed) || seed < 0 || seed > Number.MAX_SAFE_INTEGER) {
    throw new Error('Turnier-Startwert: Bitte eine ganze Zahl zwischen 0 und 9007199254740991 eingeben.');
  }
  if (!Number.isSafeInteger(ticks) || ticks < 1 || ticks > 3600) {
    throw new Error('Ticklimit: Bitte eine ganze Zahl zwischen 1 und 3600 eingeben.');
  }
  const participants = Array.from({ length: count }, (_, index) => {
    const name = el<HTMLInputElement>(`tournament-name-${index + 1}`).value.trim();
    const preset = el<HTMLSelectElement>(`tournament-preset-${index + 1}`).value;
    // Snapshot the validated sandbox robot without changing the live sandbox state.
    const robot = preset === 'sandbox-a' ? selectedRobotA()
      : preset === 'sandbox-b' ? selectedRobotB()
      : preset.startsWith('saved-') ? buildRobotDefinition(loadSavedRobotPreset(preset.slice(6)))
      : preset === 'titan' ? TITAN : RAPTOR;
    return { ...robot, id: `participant-${index + 1}`, name };
  });
  if (participants.some(participant => !participant.name)) throw new Error('Teilnehmername fehlt: Bitte für jeden Roboter einen Namen eingeben.');
  if (new Set(participants.map(participant => participant.name.toLocaleLowerCase('de'))).size !== count) {
    throw new Error('Teilnehmernamen doppelt: Bitte jedem Roboter einen unterschiedlichen Namen geben.');
  }
  const format = el<HTMLSelectElement>('tournament-format').value as 'round-robin' | 'knockout';
  const v2 = el<HTMLSelectElement>('tournament-ruleset').value === 'simultaneous-v2';
  if (v2 && format !== 'round-robin') throw new Error('Gleichzeitige Regeln sind derzeit nur für Round Robin verfügbar.');
  return createTournamentDefinition({
    schemaVersion: v2 ? 2 : 1, ...(v2 ? { rulesetVersion: 'simultaneous-v2' as const } : {}), id: 'sandbox-tournament', format,
    baseSeed: seed, maxTicks: ticks, participants,
    ...(el<HTMLSelectElement>('tournament-side-assignment').value === 'balanced' ? {sideAssignment: 'balanced' as const} : {})
  });
}
function renderTournamentPreview(definitionOverride?: TournamentDefinition): boolean {
  try {
    const definition = definitionOverride ?? buildTournamentDefinition();
    const fixtures = definition.format === 'round-robin' ? createRoundRobinSchedule(definition) : [];
    const knockout = definition.format === 'knockout' ? runKnockoutBracket(definition) : null;
    const result = definition.format === 'round-robin' ? computeRoundRobinStandings(definition, []) : null;
    const names = new Map(definition.participants.map(robot => [robot.id, robot.name]));
    const list = el('tournament-pairings');
    list.replaceChildren();
    for (const fixture of fixtures) {
      const item = document.createElement('li');
      item.textContent = `${names.get(fixture.robotAId)} gegen ${names.get(fixture.robotBId)} · Seed ${fixture.seed}`;
      list.append(item);
    }
    if (knockout) for (const match of knockout.matches) {
      const item = document.createElement('li');
      item.textContent = `Runde ${match.round + 1}: ${names.get(match.robotAId)} gegen ${match.robotBId ? names.get(match.robotBId) : 'Freilos'} · Seed ${match.seed} · Sieger: ${names.get(match.winnerId)}`;
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
    for (const standing of result?.standings ?? []) {
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
    el('tournament-progress').textContent = knockout ? `K.-o.-Turnier abgeschlossen · Sieger: ${names.get(knockout.championId)}` : `${result!.completedMatches} / ${result!.totalMatches} Kämpfe abgeschlossen (0 %). Noch keine Turnierausführung.`;
    el('tournament-preview').hidden = false;
    el('tournament-feedback').textContent = `Spielplan mit ${definition.participants.length} Teilnehmern und ${fixtures.length} Paarungen erstellt.`;
    tournamentDefinition = definition;
    return true;
  } catch (error) {
    // An invalid new plan must not silently destroy an existing, valid tournament.
    if (!tournamentRun) {
      tournamentDefinition = null;
      el('tournament-preview').hidden = true;
    }
    el('tournament-feedback').textContent = `Turnier ungültig: ${error instanceof Error ? error.message : 'unbekannter Fehler'}`;
    return false;
  }
}
el('open-tournament').addEventListener('click', () => {
  const dialog = el<HTMLDialogElement>('tournament-dialog');
  dialog.showModal();
  if (!tournamentDefinition) renderTournamentParticipants();
  syncTournamentActions();
  el<HTMLInputElement>('tournament-count').focus();
});
/** Closing the dialog suspends auto-play at a match boundary, not an invisible running state. */
function suspendTournamentOnDialogClose(): void {
  const shouldPause = tournamentAutoRequested && tournamentRun &&
    (tournamentRun.status === 'ready' || tournamentRun.status === 'running');
  stopTournamentAuto(false); // Preserve auto-play intent for an explicit Resume after reopening.
  if (shouldPause) tournamentAction(pauseTournamentRun);
}
el('close-tournament').addEventListener('click', () => {
  suspendTournamentOnDialogClose();
  el<HTMLDialogElement>('tournament-dialog').close();
});
// The cancel event fires before the dialog closes: stop the queued 0ms match timer
// immediately on Escape instead of racing the asynchronous close event.
el('tournament-dialog').addEventListener('cancel', () => suspendTournamentOnDialogClose());
el('tournament-dialog').addEventListener('close', () => {
  suspendTournamentOnDialogClose(); // Idempotent fallback for native dialog close.
  el<HTMLButtonElement>('open-tournament').focus();
});
el('tournament-count').addEventListener('change', renderTournamentParticipants);
el('tournament-format').addEventListener('change', () => {
  const knockout = el<HTMLSelectElement>('tournament-format').value === 'knockout';
  const rulesetSelect = el<HTMLSelectElement>('tournament-ruleset');
  rulesetSelect.disabled = knockout;
  if (knockout) rulesetSelect.value = 'sequential-v1';
  const sideSelect = el<HTMLSelectElement>('tournament-side-assignment');
  sideSelect.disabled = knockout;
  if (knockout) sideSelect.value = 'legacy';
});
el('tournament-create').addEventListener('click', () => {
  // Draft validation must not cancel a running tournament's queued auto-play.
  // A double-click must not reset an already prepared or running identical plan.
  try {
    const candidate = buildTournamentDefinition();
    if (tournamentRun && !['completed', 'cancelled'].includes(tournamentRun.status)) {
      // NEXT-79c: editing form fields must never silently replace an active run.
      const unchanged = JSON.stringify(candidate) === JSON.stringify(tournamentRun.definition);
      el('tournament-feedback').textContent = unchanged
        ? 'Spielplan bereits aktiv. Für einen Neustart erst abbrechen.'
        : 'Ein Turnier läuft bereits. Bitte zuerst abbrechen, bevor du einen neuen Spielplan erstellst.';
      return;
    }
  } catch (error) {
    // Never mutate a running plan for an invalid draft; focus the offending field.
    reportTournamentDraftError(error);
    return;
  }
  if (!renderTournamentPreview() || !tournamentDefinition) return;
  // Only a successfully validated replacement may stop an earlier auto-run.
  stopTournamentAuto();
  tournamentRun = tournamentDefinition.format === 'round-robin' ? createTournamentRun(tournamentDefinition) : null;
  if (tournamentRun) { tournamentStatus(); persistTournamentSnapshot(); }
  syncTournamentActions();
});
function tournamentAction(action: (run: TournamentRun) => TournamentRun): void {
  try {
    if (!tournamentRun) throw new Error('Bitte zuerst einen Spielplan erstellen oder laden.');
    tournamentRun = action(tournamentRun);
    tournamentStatus();
    el('tournament-feedback').textContent = 'Turnierstatus: ' + tournamentRun.status;
    persistTournamentSnapshot();
  } catch (error) { el('tournament-feedback').textContent = error instanceof Error ? error.message : 'Turnierfehler'; }
}
/** One match per browser task keeps progress, pause and cancel responsive at match boundaries. */
function scheduleTournamentAuto(): void {
  if (!tournamentAutoRequested || !tournamentRun ||
      tournamentRun.status === 'paused' || tournamentRun.status === 'cancelled' ||
      tournamentRun.status === 'completed' || tournamentAutoTimer !== null) return;
  tournamentAutoTimer = window.setTimeout(() => {
    tournamentAutoTimer = null;
    if (!tournamentAutoRequested || !tournamentRun ||
        tournamentRun.status === 'paused' || tournamentRun.status === 'cancelled' ||
        tournamentRun.status === 'completed') return;
    const before = tournamentRun;
    tournamentAction(advanceTournamentRun);
    if (tournamentRun === before || (tournamentRun !== null && tournamentRun.nextMatchIndex >= tournamentRun.totalMatches)) {
      stopTournamentAuto();
      return;
    }
    scheduleTournamentAuto();
  }, 0);
}
el('tournament-run').addEventListener('click', event => {
  if (event.detail > 1) return; // Ignore the second mouse click of a double-click.
  stopTournamentAuto();
  tournamentAction(advanceTournamentRun);
});
el('tournament-auto').addEventListener('click', () => {
  if (!tournamentRun) { tournamentAction(advanceTournamentRun); return; }
  if (tournamentRun.status === 'paused') tournamentAction(resumeTournamentRun);
  if (tournamentRun.status === 'completed' || tournamentRun.status === 'cancelled') {
    tournamentAction(advanceTournamentRun);
    return;
  }
  tournamentAutoRequested = true;
  scheduleTournamentAuto();
});
el('tournament-pause').addEventListener('click', () => { stopTournamentAuto(false); tournamentAction(pauseTournamentRun); });
el('tournament-resume').addEventListener('click', () => {
  tournamentAction(resumeTournamentRun);
  if (tournamentAutoRequested) scheduleTournamentAuto();
});
el('tournament-cancel').addEventListener('click', () => { stopTournamentAuto(); tournamentAction(cancelTournamentRun); });
/** NEXT-85: verified NEXT-82 adapter shared by all exports; NEXT-76 filter remains independent. */
function downloadTournamentTable(format: 'csv' | 'json'): void {
  try {
    if (!tournamentRun) throw new Error('Für den Tabellenexport ist ein Round-Robin-Turnier erforderlich');
    const content = format === 'csv' ? exportTournamentTableCsv(tournamentRun) : exportTournamentTableJson(tournamentRun);
    downloadTournamentFile(content, format === 'csv' ? 'text/csv;charset=utf-8' : 'application/json', 'robot-arena-tabelle.' + format);
  } catch (error) { el('tournament-feedback').textContent = error instanceof Error ? error.message : 'Exportfehler'; }
}
el('tournament-table-csv').addEventListener('click', () => downloadTournamentTable('csv'));
el('tournament-table-json').addEventListener('click', () => downloadTournamentTable('json'));
el('tournament-export').addEventListener('click', () => {
  try {
    if (!tournamentRun) throw new Error('Kein Turnier vorhanden');
    downloadTournamentFile(exportTournamentRun(tournamentRun), 'application/json', 'robot-arena-turnier.json');
  } catch (error) { el('tournament-feedback').textContent = error instanceof Error ? error.message : 'Exportfehler'; }
});
/** A single import path is shared by file import and validated local recovery. */
function applyImportedTournament(loaded: TournamentRun): void {
  tournamentDefinition = loaded.definition;
  tournamentRun = loaded;
  el<HTMLInputElement>('tournament-count').value = String(loaded.definition.participants.length);
  renderTournamentParticipants();
  el<HTMLSelectElement>('tournament-format').value = loaded.definition.format;
  el<HTMLSelectElement>('tournament-ruleset').value = loaded.definition.schemaVersion === 2 ? 'simultaneous-v2' : 'sequential-v1';
  el<HTMLSelectElement>('tournament-ruleset').disabled = loaded.definition.format === 'knockout';
  el<HTMLSelectElement>('tournament-side-assignment').value = loaded.definition.sideAssignment === 'balanced' ? 'balanced' : 'legacy';
  el<HTMLSelectElement>('tournament-side-assignment').disabled = loaded.definition.format === 'knockout';
  el<HTMLInputElement>('tournament-seed').value = String(loaded.definition.baseSeed);
  el<HTMLInputElement>('tournament-ticks').value = String(loaded.definition.maxTicks);
  loaded.definition.participants.forEach((p, i) => {
    el<HTMLInputElement>(`tournament-name-${i + 1}`).value = p.name;
    // The editor must reflect the validated archive, not the previous draft's presets.
    el<HTMLSelectElement>(`tournament-preset-${i + 1}`).value =
      p.maxStructure === TITAN.maxStructure && p.weaponDamage === TITAN.weaponDamage ? 'titan' : 'raptor';
  });
  if (!renderTournamentPreview(loaded.definition)) throw new Error('Geladenes Turnier konnte nicht angezeigt werden');
  tournamentRun = loaded;
  tournamentStatus();
  persistTournamentSnapshot();
}
el('tournament-autosave').addEventListener('change', () => {
  const checkbox = el<HTMLInputElement>('tournament-autosave');
  if (tournamentRun?.definition.schemaVersion === 2) {
    checkbox.checked = false;
    el('tournament-feedback').textContent = 'v2-Turniere können nur als JSON-Datei gespeichert werden; lokale Sicherung bleibt v1 vorbehalten.';
    return;
  }
  const enabled = checkbox.checked;
  void queueTournamentStorage(async () => {
    await autosaveGuard().setEnabledLocked(enabled, navigator.locks);
    if (enabled && tournamentRun) await autosaveGuard().saveLocked(tournamentRun, navigator.locks);
  }).then(() => {
    el('tournament-feedback').textContent = enabled ? 'Lokale Sicherung aktiviert (nur dieses Gerät).' : 'Lokale Sicherung deaktiviert und gelöscht.';
  }).catch(error => {
    try { checkbox.checked = isTournamentAutosaveEnabled(window.localStorage); } catch { checkbox.checked = false; }
    el('tournament-feedback').textContent = 'Lokaler Speicher nicht verfügbar: ' + formatTournamentStorageError(error);
  });
});
el('tournament-restore').addEventListener('click', () => {
  void queueTournamentStorage(() => autosaveGuard().restoreLocked(navigator.locks)).then(loaded => {
    if (!loaded) throw new Error('Keine lokale Turniersicherung vorhanden');
    // Invalid or absent local data must not cancel an existing automatic run.
    stopTournamentAuto();
    applyImportedTournament(loaded);
    el('tournament-feedback').textContent = 'Lokale Turniersicherung geprüft und geladen. Der Kampf wird nicht automatisch gestartet.';
  }).catch(error => {
    el('tournament-feedback').textContent = 'Lokale Wiederherstellung fehlgeschlagen: ' + (error instanceof Error ? error.message : 'unbekannter Fehler');
  });
});
el('tournament-clear-saved').addEventListener('click', () => {
  void queueTournamentStorage(() => autosaveGuard().setEnabledLocked(false, navigator.locks)).then(() => {
    el<HTMLInputElement>('tournament-autosave').checked = false;
    el('tournament-feedback').textContent = 'Lokale Turniersicherung und automatische Speicherung gelöscht.';
  }).catch(error => {
    el('tournament-feedback').textContent = 'Lokale Sicherung konnte nicht gelöscht werden: ' + formatTournamentStorageError(error);
  });
});
/** Another tab's changes must be visible; do not silently overwrite its saved snapshot. */
window.addEventListener('storage', event => {
  if (tournamentAutosaveGuard?.noteExternalChange(event.key)) {
    el('tournament-feedback').textContent = AUTOSAVE_CONFLICT_NOTICE;
    tournamentSaveStatus('error', 'Lokale Sicherung: Konflikt mit anderer Registerkarte.');
    try { el<HTMLInputElement>('tournament-autosave').checked = isTournamentAutosaveEnabled(window.localStorage); }
    catch { el<HTMLInputElement>('tournament-autosave').checked = false; }
  }
});
el('tournament-import').addEventListener('click', () => el<HTMLInputElement>('tournament-file').click());
el('tournament-file').addEventListener('change', async () => {
  const input = el<HTMLInputElement>('tournament-file');
  try {
    const file = input.files?.[0];
    if (!file || file.size > 2 * 1024 * 1024) throw new Error('Datei fehlt oder ist zu groß');
    const loaded = importTournamentRun(await file.text());
    // Only a successfully validated archive may replace the current run.
    stopTournamentAuto();
    applyImportedTournament(loaded);
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
try {
  tournamentAutosaveGuard = new TournamentAutosaveGuard(window.localStorage);
  el<HTMLInputElement>('tournament-autosave').checked = isTournamentAutosaveEnabled(window.localStorage);
} catch {
  tournamentAutosaveGuard = null;
  el<HTMLInputElement>('tournament-autosave').checked = false;
}
void loadFooterMetadata();
