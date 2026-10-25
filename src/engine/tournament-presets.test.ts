import { describe, expect, it } from 'vitest';
import { RAPTOR_CHASSIS, TITAN_CHASSIS, BALANCED_MOTOR, STANDARD_ARMOR, STANDARD_ENERGY, STANDARD_SENSOR, RAPTOR_WEAPON, TITAN_WEAPON } from './presets';
import { tournamentFromConfigurations } from './tournament-presets';

const raptor = { id: 'custom-raptor', name: 'Eigener Raptor', chassis: RAPTOR_CHASSIS, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR, weapon: RAPTOR_WEAPON };
const titan = { id: 'custom-titan', name: 'Eigener Titan', chassis: TITAN_CHASSIS, motor: BALANCED_MOTOR, armor: STANDARD_ARMOR, energySupply: STANDARD_ENERGY, sensor: STANDARD_SENSOR, weapon: TITAN_WEAPON };
const input = { id: 'custom-tournament', format: 'round-robin' as const, baseSeed: 4711, maxTicks: 120, configurations: [raptor, titan] };

describe('NEXT-69 tournament configurations', () => {
  it('converts valid sandbox robots into a frozen, deterministic tournament definition', () => {
    const a = tournamentFromConfigurations(input);
    const b = tournamentFromConfigurations(input);
    expect(a).toEqual(b);
    expect(Object.isFrozen(a)).toBe(true);
    expect(a.participants.map(p => p.id)).toEqual(['custom-raptor', 'custom-titan']);
    expect(a.participants[0]?.name).toBe('Eigener Raptor');
  });
  it('rejects duplicate stable robot IDs', () => {
    expect(() => tournamentFromConfigurations({ ...input, configurations: [raptor, { ...titan, id: raptor.id }] })).toThrow(/doppelte Teilnehmer-ID/);
  });
  it('rejects overweight sandbox configurations', () => {
    expect(() => tournamentFromConfigurations({ ...input, configurations: [{ ...raptor, chassis: { ...RAPTOR_CHASSIS, maxWeight: 1 } }, titan] })).toThrow(/Gewicht/);
  });
  it('rejects too few participants and invalid seed', () => {
    expect(() => tournamentFromConfigurations({ ...input, configurations: [raptor] })).toThrow(/2 bis 16/);
    expect(() => tournamentFromConfigurations({ ...input, baseSeed: -1 })).toThrow(/Seed/);
  });
});
