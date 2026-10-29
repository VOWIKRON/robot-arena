/** Fail-closed WCAG contrast preflight for *opaque* computed RGB colors.
 * Translucent colors require compositing against their actual backdrop and
 * must not be silently treated as opaque. This is not a full visual audit.
 */
export function parseOpaqueComputedRgb(color: string): readonly [number, number, number] {
  const source = color.trim();
  const match = /^(rgb|rgba)\(\s*(\d+(?:\.\d+)?)\s*(,|\s+)\s*(\d+(?:\.\d+)?)\s*(,|\s+)\s*(\d+(?:\.\d+)?)(?:\s*(,|\/)\s*(\d+(?:\.\d+)?))?\s*\)$/i.exec(source);
  if (!match) throw new Error('Unsupported computed color: ' + color);
  const [, kind, r, firstSeparator, g, secondSeparator, b, alphaSeparator, alpha] = match;
  if ((firstSeparator === ',') !== (secondSeparator === ',')) throw new Error('Mixed RGB separators: ' + color);
  if (alpha !== undefined) {
    if (Number(alpha) !== 1 || (firstSeparator === ',' && alphaSeparator !== ',') || (firstSeparator !== ',' && alphaSeparator !== '/')) {
      throw new Error('Translucent or invalid computed color: ' + color);
    }
  } else if (kind.toLowerCase() === 'rgba') {
    throw new Error('Missing alpha channel: ' + color);
  }
  const channels = [Number(r), Number(g), Number(b)];
  if (!channels.every(channel => Number.isFinite(channel) && channel >= 0 && channel <= 255)) {
    throw new Error('Out-of-range computed color: ' + color);
  }
  return channels as [number, number, number];
}

export function contrastRatio(foreground: string, background: string): number {
  const luminance = (color: string): number => {
    const [r, g, b] = parseOpaqueComputedRgb(color).map(channel => {
      const s = channel / 255;
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
