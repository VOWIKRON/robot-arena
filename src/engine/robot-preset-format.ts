import { buildRobotDefinition, type RobotConfiguration } from './components';
import { DEFAULT_STRATEGY, STRATEGY_TYPES, validateStrategyParameters, type StrategyParameters, type StrategyType } from './strategy-config';
import {
  RAPTOR_CHASSIS, TITAN_CHASSIS, BALANCED_MOTOR, SWIFT_MOTOR, HEAVY_MOTOR,
  STANDARD_ARMOR, LIGHT_ARMOR, HEAVY_ARMOR, STANDARD_ENERGY, CAPACITY_ENERGY,
  REGEN_ENERGY, STANDARD_SENSOR, SHORT_SENSOR, LONG_SENSOR, RAPTOR_WEAPON, TITAN_WEAPON
} from './presets';

const chassis = [RAPTOR_CHASSIS, TITAN_CHASSIS];
const motors = [BALANCED_MOTOR, SWIFT_MOTOR, HEAVY_MOTOR];
const armors = [STANDARD_ARMOR, LIGHT_ARMOR, HEAVY_ARMOR];
const supplies = [STANDARD_ENERGY, CAPACITY_ENERGY, REGEN_ENERGY];
const sensors = [STANDARD_SENSOR, SHORT_SENSOR, LONG_SENSOR];
const weapons = [RAPTOR_WEAPON, TITAN_WEAPON];
const allowedKeys = ['schemaVersion', 'id', 'name', 'chassis', 'motor', 'armor', 'energySupply', 'sensor', 'weapon', 'strategy', 'strategyParameters'];
const paramKeys = ['energyReserveRatio', 'targetDistanceRatio', 'retreatStructureRatio', 'retreatDistanceFactor'];

export type RobotPresetV1 = Readonly<{
  schemaVersion: 1;
  id: string;
  name: string;
  chassis: string;
  motor: string;
  armor: string;
  energySupply: string;
  sensor: string;
  weapon: string;
  strategy: StrategyType;
  strategyParameters: StrategyParameters;
}>;

function object(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label}: Objekt erwartet`);
  return value as Record<string, unknown>;
}
function pick<T extends { id: string }>(items: readonly T[], id: unknown, label: string): T {
  const item = items.find(entry => entry.id === id);
  if (!item) throw new Error(`Roboterpreset: unbekanntes ${label}`);
  return item;
}
/** Stable schema: only component IDs, never arbitrary imported component stats. */
export function createRobotPreset(configuration: RobotConfiguration): RobotPresetV1 {
  const raw: RobotPresetV1 = {
    schemaVersion: 1, id: configuration.id, name: configuration.name,
    chassis: configuration.chassis.id, motor: configuration.motor.id, armor: configuration.armor.id,
    energySupply: configuration.energySupply.id, sensor: configuration.sensor.id, weapon: configuration.weapon.id,
    strategy: configuration.strategy ?? DEFAULT_STRATEGY,
    strategyParameters: { ...configuration.strategyParameters }
  };
  parseRobotPreset(raw); // validate IDs, strategy and all component constraints
  return Object.freeze({ ...raw, strategyParameters: Object.freeze(raw.strategyParameters) });
}
export function parseRobotPreset(input: unknown): RobotConfiguration {
  const raw = object(input, 'Roboterpreset');
  if (Object.keys(raw).some(key => !allowedKeys.includes(key))) throw new Error('Roboterpreset: unbekanntes Feld');
  if (raw.schemaVersion !== 1) throw new Error('Roboterpreset: schemaVersion 1 erwartet');
  if (typeof raw.id !== 'string' || !/^[a-z0-9][a-z0-9_-]{0,63}$/i.test(raw.id)) {
    throw new Error('Roboterpreset: ungültige stabile ID');
  }
  if (typeof raw.name !== 'string' || !raw.name.trim() || raw.name.length > 80) {
    throw new Error('Roboterpreset: Name muss 1 bis 80 Zeichen enthalten');
  }
  if (!STRATEGY_TYPES.includes(raw.strategy as StrategyType)) throw new Error('Roboterpreset: unbekannte Strategie');
  const parameters = object(raw.strategyParameters, 'Strategieparameter');
  if (Object.keys(parameters).some(key => !paramKeys.includes(key))) throw new Error('Roboterpreset: unbekannter Strategieparameter');
  const errors = validateStrategyParameters(parameters as StrategyParameters);
  if (errors.length) throw new Error('Roboterpreset: ' + errors.join(', '));
  const configuration: RobotConfiguration = {
    id: raw.id, name: raw.name,
    chassis: pick(chassis, raw.chassis, 'Chassis'),
    motor: pick(motors, raw.motor, 'Motor'),
    armor: pick(armors, raw.armor, 'Panzerung'),
    energySupply: pick(supplies, raw.energySupply, 'Energieversorgung'),
    sensor: pick(sensors, raw.sensor, 'Sensor'),
    weapon: pick(weapons, raw.weapon, 'Waffe'),
    strategy: raw.strategy as StrategyType,
    strategyParameters: { ...parameters } as StrategyParameters
  };
  buildRobotDefinition(configuration); // includes weight and strategy validation
  return Object.freeze({ ...configuration, strategyParameters: Object.freeze({ ...configuration.strategyParameters }) });
}
export function serializeRobotPreset(configuration: RobotConfiguration): string {
  return JSON.stringify(createRobotPreset(configuration));
}
export function importRobotPreset(json: string): RobotConfiguration {
  if (new TextEncoder().encode(json).length > 16 * 1024) throw new Error('Roboterpreset: Datei zu groß');
  return parseRobotPreset(JSON.parse(json) as unknown);
}
