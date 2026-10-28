import { createTournamentDefinition } from './tournament-model';

/** Shared deterministic, non-moving fixture. All matches run to maxTicks. */
export function createEnduranceFixture(participants: number, maxTicks: number) {
  return createTournamentDefinition({
    schemaVersion: 1, id: `long-run-${participants}-${maxTicks}`, format: 'round-robin',
    baseSeed: 20261026, maxTicks,
    participants: Array.from({ length: participants }, (_, i) => ({
      id: `endurance-${i + 1}`, name: `Endurance ${i + 1}`,
      strategy: 'aggressive', maxStructure: 100, maxEnergy: 100,
      energyRegen: 0, speed: 0, sensorRange: 0, weaponRange: 0,
      weaponDamage: 0, weaponEnergy: 0, cooldownTicks: 1
    }))
  });
}
