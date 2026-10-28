# NEXT-77 – Storage- und Download-Fehlerabnahme (UNRELEASED)

## Implementierung
- `src/engine/tournament-storage-guard.ts`: Tab-spezifische gespeicherte Revision, Prüfung unmittelbar vor Speicherung/Opt-out/Löschung, `storage`-Event-Beobachtung, kontrolliertes Akzeptieren nach erfolgreicher Archivvalidierung.
- `src/engine/tournament-local-save.ts`: beim Opt-out zuerst gespeichertes Archiv löschen, dann Aktivierungsflag; bei blockierter Löschung bleibt die Aktivierung erhalten.
- `src/main.ts`: Fehlermeldungen für QuotaExceededError/SecurityError, gemeinsame Fehlerbehandlung für Turnier-/CSV-/JSON-Downloads, Objekt-URL-Aufräumen, Turnierlauf bei Speicher-/Downloadfehler unverändert.

## Verifikation
- Isolierte GitHub Actions: https://github.com/VOWIKRON/robot-arena/actions/runs/40233631492
- Code-/Test-SHA: `f77c81b548efba5540c9af59af8895256b9c62e5`.
- 388/388 Vitest, 134/134 Desktop-/Mobil-Playwright, Typecheck, npm audit 0, Build und reproduzierbarer Zweitbuild: **SUCCESS**.
- Unit: veraltete Tab-Revision ohne Event, fremdes Opt-out, Event/Restore-Recovery, Quota-Schutz, blockiertes Löschen.
- E2E: Quota-Fehler mit weiter spielbarem Turnier, zwei Tabs ohne stilles Überschreiben, Download-API-Fehler ohne Turnierverlust, Opt-out über Reload.
- Unveränderte deterministische Simulation und V1-Archivschema.

## Grenzen und Folgeaufgaben
Der Konfliktschutz ist optimistisch (Vergleich unmittelbar vor `localStorage.setItem` plus `storage`-Events). `localStorage` bietet kein atomisches Compare-and-Swap. Bei exakt zeitgleichen Tab-Schreibvorgängen kann eine theoretische Race-Condition bestehen; für eine strikte Garantie Browser-Web-Locks mit Fallback und parallele Browser-Stresstests als gesonderte Härtung einplanen. Ein Browser kann einen Download auch nach erfolgreichem `anchor.click()` blockieren, ohne eine synchrone Exception zu liefern; eine bestätigte Speicherung auf dem Dateisystem kann die Webseite nicht garantieren.

**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**
