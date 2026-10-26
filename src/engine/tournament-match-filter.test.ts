import { describe, expect, it } from 'vitest';
import { filterTournamentMatches } from './tournament-match-filter';
import type { TournamentMatchDetail } from './tournament-details';

function match(index: number, a: string, b: string, status: 'pending' | 'completed'): TournamentMatchDetail {
  return Object.freeze({
    matchId: `match-${String(index).padStart(3, '0')}`, robotAName: a, robotBName: b,
    seed: index, status, ticks: status === 'completed' ? 10 : null,
    winnerName: status === 'completed' ? a : null,
    remainingStructureA: status === 'completed' ? 5 : null,
    remainingStructureB: status === 'completed' ? 0 : null
  });
}

describe('NEXT-76 read-only tournament match search', () => {
  const fixtures = Object.freeze([
    match(1, 'Änne <img src=x>', 'Björk', 'completed'),
    match(2, 'Clara', 'Erik', 'pending'),
    match(3, 'Erik', 'Lukas', 'completed')
  ]);

  it('searches participants case-insensitively, including Unicode and markup-like names', () => {
    expect(filterTournamentMatches(fixtures, '  änNE ', 'all').map(m => m.matchId)).toEqual(['match-001']);
    expect(filterTournamentMatches(fixtures, '<IMG', 'all').map(m => m.matchId)).toEqual(['match-001']);
    expect(filterTournamentMatches(fixtures, 'ERIK', 'all').map(m => m.matchId)).toEqual(['match-002', 'match-003']);
  });

  it('combines match-ID search and completed/pending status', () => {
    expect(filterTournamentMatches(fixtures, 'match-002', 'pending').map(m => m.matchId)).toEqual(['match-002']);
    expect(filterTournamentMatches(fixtures, 'match-002', 'completed')).toEqual([]);
    expect(filterTournamentMatches(fixtures, '', 'completed').map(m => m.matchId)).toEqual(['match-001', 'match-003']);
  });

  it('preserves input, order and immutable fixture references', () => {
    const before = JSON.stringify(fixtures);
    const result = filterTournamentMatches(fixtures, '', 'all');
    expect(result).toHaveLength(3);
    expect(result[0]).toBe(fixtures[0]);
    expect(Object.isFrozen(result)).toBe(true);
    expect(JSON.stringify(fixtures)).toBe(before);
  });

  it('filters 120 pairings without modifying the 16-participant schedule view', () => {
    const all = Object.freeze(Array.from({ length: 120 }, (_, i) =>
      match(i + 1, `Roboter ${(i % 16) + 1}`, `Roboter ${((i + 1) % 16) + 1}`, i % 2 ? 'pending' : 'completed')
    ));
    const before = JSON.stringify(all);
    expect(filterTournamentMatches(all, '', 'all')).toHaveLength(120);
    expect(filterTournamentMatches(all, 'match-120', 'all').map(m => m.matchId)).toEqual(['match-120']);
    expect(filterTournamentMatches(all, '', 'completed')).toHaveLength(60);
    expect(JSON.stringify(all)).toBe(before);
  });
});
