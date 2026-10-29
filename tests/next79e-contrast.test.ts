import { describe, expect, it } from 'vitest';
import { contrastRatio, parseOpaqueComputedRgb } from '../e2e/contrast';

describe('NEXT-79e-AUTO11: fail-closed computed contrast regression', () => {
  it('preserves WCAG relative luminance for opaque black, white and gray', () => {
    expect(contrastRatio('rgb(0, 0, 0)', 'rgb(255, 255, 255)')).toBeCloseTo(21, 9);
    expect(contrastRatio('rgb(255, 255, 255)', 'rgb(0, 0, 0)')).toBeCloseTo(21, 9);
    expect(contrastRatio('rgb(118, 118, 118)', 'rgb(255, 255, 255)')).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio('rgb(119, 119, 119)', 'rgb(119, 119, 119)')).toBe(1);
  });

  it('accepts browser-computed opaque rgb/rgba comma and CSS4 space syntax', () => {
    expect(parseOpaqueComputedRgb('rgb(23, 33, 59)')).toEqual([23, 33, 59]);
    expect(parseOpaqueComputedRgb('rgba(23, 33, 59, 1)')).toEqual([23, 33, 59]);
    expect(parseOpaqueComputedRgb('rgb(23 33 59 / 1)')).toEqual([23, 33, 59]);
    expect(contrastRatio('rgba(255, 255, 255, 1)', 'rgb(0 0 0)')).toBeCloseTo(21, 9);
  });

  it.each([
    'rgba(255, 255, 255, 0.5)',
    'rgb(255 255 255 / 0.25)',
    'rgba(255, 255, 255)',
    'transparent',
    'rgb(256, 0, 0)',
    'rgb(-1, 0, 0)',
    'rgb(255, 0 0)',
    'rgb(255, 0, 0) trailing',
    'rgb(1e309, 0, 0)',
    'rgb(NaN, 0, 0)',
  ])('rejects unsafe or malformed color %s instead of giving false PASS', color => {
    expect(() => contrastRatio(color, 'rgb(0, 0, 0)')).toThrow();
    expect(() => contrastRatio('rgb(0, 0, 0)', color)).toThrow();
  });
});
