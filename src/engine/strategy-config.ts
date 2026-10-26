export const STRATEGY_TYPES = ['aggressive', 'defensive', 'distance', 'melee', 'adaptive'] as const;
export type StrategyType = typeof STRATEGY_TYPES[number];
export const DEFAULT_STRATEGY: StrategyType = 'aggressive';
export type StrategyParameters = Readonly<{
  energyReserveRatio?: number;
  targetDistanceRatio?: number;
  retreatStructureRatio?: number;
  retreatDistanceFactor?: number;
}>;

// Shared engine/UI defaults; omitted reserve values preserve legacy zero-reserve behavior.
export const STRATEGY_CATALOG = [
  { value: 'aggressive', label: 'Aggressiv', targetDistanceRatio: 0.8 },
  { value: 'distance', label: 'Distanz', targetDistanceRatio: 0.9 },
  { value: 'defensive', label: 'Defensiv', targetDistanceRatio: 0.8 },
  { value: 'melee', label: 'Nahkampf', targetDistanceRatio: 0.2 },
  { value: 'adaptive', label: 'Adaptiv', targetDistanceRatio: 0.8 }
] as const;

export function strategyLabel(strategy: StrategyType): string {
  return STRATEGY_CATALOG.find(item => item.value === strategy)!.label;
}

export function strategyParameters(strategy: StrategyType, overrides: StrategyParameters = {}) {
  return {
    energyReserveRatio: overrides.energyReserveRatio ?? 0,
    targetDistanceRatio: overrides.targetDistanceRatio ?? STRATEGY_CATALOG.find(item => item.value === strategy)!.targetDistanceRatio,
    retreatStructureRatio: overrides.retreatStructureRatio ?? 0.7,
    retreatDistanceFactor: overrides.retreatDistanceFactor ?? 1.1
  };
}

export function validateStrategyParameters(parameters: StrategyParameters = {}): string[] {
  const errors: string[] = [];
  for (const [value, min, max, label] of [
    [parameters.energyReserveRatio, 0, 1, 'Energiereserve'],
    [parameters.targetDistanceRatio, 0, 1, 'Zielabstand'],
    [parameters.retreatStructureRatio, 0, 1, 'Rückzugsschwelle'],
    [parameters.retreatDistanceFactor, 1, 2, 'Sicherheitsabstand']
  ] as const) {
    if (value !== undefined && (!Number.isFinite(value) || value < min || value > max)) {
      errors.push(`${label} muss zwischen ${min * 100} und ${max * 100} % liegen`);
    }
  }
  return errors;
}
