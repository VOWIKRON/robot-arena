import { describe, expect, it } from 'vitest';
import { createMatch, stepMatchWithEvents } from '../src/engine/simulation';
import { defensiveCombatDistance, movementDelta } from '../src/engine/strategies';
import { RAPTOR, TITAN } from '../src/engine/presets';
import { SeededRandom } from '../src/engine/random';

describe('defensive safety and early retreat regression', () => {
  it.each([['A',20], ['B',21]] as const)('%s retreats early in the standard match at tick %i', (side,tick) => {
    let state=createMatch({...RAPTOR,strategy:side==='A'?'defensive':'aggressive'}, {...TITAN,strategy:side==='B'?'defensive':'aggressive'});
    const rng=new SeededRandom(4711);
    for(let i=1;i<=tick;i++) {
      const old=side==='A'?state.robotA:state.robotB;
      state=stepMatchWithEvents(state,rng).state;
      const robot=side==='A'?state.robotA:state.robotB;
      const retreat=side==='A'?robot.position.x<old.position.x:robot.position.x>old.position.x;
      expect(retreat).toBe(i===tick);
      if(retreat) expect(old.structure/old.definition.maxStructure).toBeGreaterThan(0.7);
    }
  });
  it.each([69,70,71])('structure %i only changes pursuit, not immediate safety', structure => {
    const {robotA,robotB}=createMatch({...RAPTOR,strategy:'defensive',maxStructure:100},TITAN);
    robotA.structure=structure;
    expect(movementDelta(robotA,robotB,10)).toBe(-RAPTOR.speed);
    expect(movementDelta(robotA,robotB,40)).toBe(structure<=70?0:RAPTOR.speed);
  });
  it.each([1,1.1,1.5,2])('safety factor %s uses enemy range and caps at own firing margin', factor => {
    const self={...RAPTOR,strategy:'defensive' as const,weaponRange:40,strategyParameters:{retreatDistanceFactor:factor}};
    expect(defensiveCombatDistance(self,{...TITAN,weaponRange:20})).toBe(Math.min(20*factor,38));
    expect(defensiveCombatDistance({...self,weaponRange:0},TITAN)).toBe(0);
  });
  it('keeps a fighting chance across 100 fixed seeds without guaranteed victory', () => {
    let wins=0;
    for(let seed=1;seed<=100;seed++) {
      let state=createMatch({...RAPTOR,strategy:'defensive'},TITAN);const rng=new SeededRandom(seed);
      for(let i=0;i<500&&state.outcome==='active';i++)state=stepMatchWithEvents(state,rng).state;
      expect(state.outcome).toBe('victory');
      if(state.winner===RAPTOR.id)wins++;
    }
    expect(wins).toBe(93);
  });
});
