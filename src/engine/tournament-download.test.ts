import { afterEach, describe, expect, it, vi } from 'vitest';
import { downloadTournamentFile, safeTournamentDownloadFilename } from './tournament-download';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

function browserHarness(clickError?: Error) {
  const create = vi.fn(() => 'blob:robot-arena-test');
  const revoke = vi.fn();
  const remove = vi.fn();
  const click = vi.fn(() => { if (clickError) throw clickError; });
  const appendChild = vi.fn();
  const anchor = { href: '', download: '', style: { display: '' }, click, remove };
  let delayed: (() => void) | null = null;
  vi.stubGlobal('URL', { createObjectURL: create, revokeObjectURL: revoke });
  vi.stubGlobal('document', { createElement: vi.fn(() => anchor), body: { appendChild } });
  vi.stubGlobal('window', { setTimeout: vi.fn((callback: () => void) => { delayed = callback; return 1; }) });
  return { create, revoke, remove, click, appendChild, anchor, flush: () => { const fn: (() => void) | null = delayed; if (fn) (fn as () => void)(); } };
}

describe('NEXT-82 safe tournament download', () => {
  it('preserves ordinary match names and neutralizes traversal, control and dangerous characters', () => {
    expect(safeTournamentDownloadFilename('robot-arena-match-001.csv')).toBe('robot-arena-match-001.csv');
    expect(safeTournamentDownloadFilename('../evil\\path:<script>?*.json')).not.toMatch(/[\\/<>:?*]/);
    expect(safeTournamentDownloadFilename('...')).toBe('_');
    expect(safeTournamentDownloadFilename('')).toBe('robot-arena-download.txt');
    expect(safeTournamentDownloadFilename('a'.repeat(300)).length).toBeLessThanOrEqual(160);
  });

  it('creates an accessible download and releases its object URL after the browser delay', () => {
    const browser = browserHarness();
    downloadTournamentFile('test', 'text/csv', 'robot-arena-match-001.csv');
    expect(browser.create).toHaveBeenCalledTimes(1);
    expect(browser.appendChild).toHaveBeenCalledTimes(1);
    expect(browser.click).toHaveBeenCalledTimes(1);
    expect(browser.anchor.download).toBe('robot-arena-match-001.csv');
    expect(browser.remove).toHaveBeenCalledTimes(1);
    expect(browser.revoke).not.toHaveBeenCalled();
    browser.flush();
    expect(browser.revoke).toHaveBeenCalledWith('blob:robot-arena-test');
  });

  it('reports missing object URL APIs without leaving an anchor behind', () => {
    const browser = browserHarness();
    vi.stubGlobal('URL', { revokeObjectURL: browser.revoke });
    expect(() => downloadTournamentFile('test', 'application/json', 'a.json'))
      .toThrow(/Download konnte nicht gestartet werden: Browser unterstützt Datei-Downloads nicht/);
    expect(browser.appendChild).not.toHaveBeenCalled();
  });

  it('reports a failed anchor click and still revokes the created URL', () => {
    const browser = browserHarness(new Error('click blocked'));
    expect(() => downloadTournamentFile('test', 'application/json', 'a.json'))
      .toThrow(/Download konnte nicht gestartet werden: click blocked/);
    expect(browser.remove).toHaveBeenCalledTimes(1);
    browser.flush();
    expect(browser.revoke).toHaveBeenCalledTimes(1);
  });

  it('cleans up immediately if the browser refuses to schedule revocation', () => {
    const browser = browserHarness();
    vi.stubGlobal('window', { setTimeout: () => { throw new Error('timer blocked'); } });
    downloadTournamentFile('test', 'application/json', 'a.json');
    expect(browser.revoke).toHaveBeenCalledWith('blob:robot-arena-test');
  });

  it('reports a failed URL factory without mutating the DOM', () => {
    const browser = browserHarness();
    vi.stubGlobal('URL', { createObjectURL: () => { throw new Error('quota'); }, revokeObjectURL: browser.revoke });
    expect(() => downloadTournamentFile('test', 'application/json', 'a.json')).toThrow(/quota/);
    expect(browser.appendChild).not.toHaveBeenCalled();
  });
});
