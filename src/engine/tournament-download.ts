/**
 * NEXT-82: shared browser download boundary for archives, tables and individual
 * matches. Keep DOM/browser errors out of the deterministic tournament engine.
 */
export function safeTournamentDownloadFilename(filename: string): string {
  const cleaned = filename
    .replace(/[\\/\x00-\x1f\x7f<>:"|?*]/g, '_')
    .replace(/^\.+/, '_')
    .replace(/[. ]+$/, '')
    .slice(0, 160);
  return cleaned || 'robot-arena-download.txt';
}

/** Starts a download or throws a user-visible error without modifying the run. */
export function downloadTournamentFile(content: string, mime: string, filename: string): void {
  let objectUrl: string | null = null;
  let anchor: HTMLAnchorElement | null = null;
  const revoke = (): void => {
    if (objectUrl !== null && typeof URL.revokeObjectURL === 'function') {
      try { URL.revokeObjectURL(objectUrl); } catch { /* browser cleanup is best effort */ }
    }
  };
  try {
    if (typeof URL.createObjectURL !== 'function' || typeof URL.revokeObjectURL !== 'function') {
      throw new Error('Browser unterstützt Datei-Downloads nicht');
    }
    if (typeof Blob !== 'function') throw new Error('Browser unterstützt Blob-Dateien nicht');
    objectUrl = URL.createObjectURL(new Blob([content], { type: mime }));
    if (typeof objectUrl !== 'string' || objectUrl.length === 0) {
      throw new Error('Browser hat keine gültige Download-Adresse erzeugt');
    }
    anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = safeTournamentDownloadFilename(filename);
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
  } catch (error) {
    throw new Error('Download konnte nicht gestartet werden: ' + (error instanceof Error ? error.message : 'Browserfehler'));
  } finally {
    try { anchor?.remove(); } catch { /* cleanup must not hide original error */ }
    if (objectUrl !== null) {
      try { window.setTimeout(revoke, 1000); } catch { revoke(); }
    }
  }
}
