import { buildRobotDefinition, type RobotConfiguration } from './components';
import { createTournamentDefinition, type TournamentDefinition, type TournamentFormat } from './tournament-model';

/** NEXT-69: convert independently validated sandbox configurations to immutable tournament participants. */
export function tournamentFromConfigurations(input: {
  id: string;
  format: TournamentFormat;
  baseSeed: number;
  maxTicks: number;
  configurations: readonly RobotConfiguration[];
}): TournamentDefinition {
  if (!Array.isArray(input.configurations) || input.configurations.length < 2 || input.configurations.length > 16) {
    throw new Error('Turnier: 2 bis 16 Roboterkonfigurationen erforderlich');
  }
  const participants = input.configurations.map(configuration => buildRobotDefinition(configuration));
  return createTournamentDefinition({
    schemaVersion: 1,
    id: input.id,
    format: input.format,
    baseSeed: input.baseSeed,
    maxTicks: input.maxTicks,
    participants
  });
}
