export type Vec2 = Readonly<{ x: number; y: number }>;

export type RobotDefinition = Readonly<{
  id: string;
  name: string;
  maxStructure: number;
  maxEnergy: number;
  energyRegen: number;
  speed: number;
  weaponRange: number;
  weaponDamage: number;
  weaponEnergy: number;
  cooldownTicks: number;
}>;

export type RobotState = {
  definition: RobotDefinition;
  position: Vec2;
  structure: number;
  energy: number;
  cooldown: number;
};

export type MatchState = {
  tick: number;
  width: number;
  height: number;
  robotA: RobotState;
  robotB: RobotState;
  winner: string | null;
};
