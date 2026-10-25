import { expect, test } from '@playwright/test';

/** Automated non-text contrast check. Does not replace manual NVDA/VoiceOver or visual acceptance. */
test('NEXT-79e: essential tournament control boundaries meet WCAG AA 3:1 contrast', async ({ page }) => {
  await page.goto('/');
  await page.locator('#open-tournament').click();

  const results = await page.evaluate(() => {
    const luminance = (css: string): number => {
      const channels = css.match(/\\d+(?:\\.\\d+)?/g)?.slice(0, 3).map(Number);
      if (!channels || channels.length !== 3) throw new Error('Expected opaque RGB color: ' + css);
      const [red, green, blue] = channels.map(value => {
        const normalized = value / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    };
    const ratio = (first: string, second: string): number => {
      const a = luminance(first);
      const b = luminance(second);
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    };
    return ['tournament-count', 'tournament-seed', 'tournament-ticks',
      'tournament-create', 'tournament-preset-1'].map(id => {
      const element = document.getElementById(id);
      if (!element) throw new Error('Missing control: ' + id);
      const styles = getComputedStyle(element);
      return { id, ratio: ratio(styles.borderTopColor, styles.backgroundColor) };
    });
  });

  for (const result of results) {
    expect(result.ratio, result.id + ' boundary contrast must be >= 3:1').toBeGreaterThanOrEqual(3);
  }
});
