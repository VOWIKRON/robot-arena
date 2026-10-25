# NEXT-71 – Integrationsvorbereitung (ohne Veröffentlichung)

Stand: 25.10.2026, 18:00 MEZ. **Nicht integriert, nicht veröffentlicht.** Verifizierte Live-Basis: v0.1.56 / main `3d516317128578e374ec39eacd8991649c1815cc`.

## Isolierte Entwicklungszweige

| NEXT | Branch / PR | Isolierte QA | Ergebnis |
| --- | --- | --- | --- |
| 69 | `feature/NEXT-69-validated-tournament-presets` / #53 | #40210126969 | SUCCESS: 391 Unit/Behavior/Regression/Determinismus + 134 Desktop/Mobil |
| 70 | `feature/NEXT-70-match-export` / #57 | #40210582101 | SUCCESS: 387 Unit/Behavior/Regression/Determinismus + 130 Desktop/Mobil |
| 79e | `feature/NEXT-79e-accessibility-matrix` / #51 | #40204710908 | SUCCESS: 383 Unit/Behavior/Regression/Determinismus + 130 Desktop/Mobil; **manuelle Abnahme fehlt** |

Alle drei PRs wurden als offen geprüft. Alle drei QA-Run-Jobs wurden als `completed/success` bestätigt. Die isolierte QA ist **kein** Nachweis der kombinierten Integration.

## Konfliktprüfung vor einem späteren manuellen Merge

GitHub-Vergleich mit `main` bestätigt: NEXT-69 und NEXT-70 beruhen auf demselben Basiscommit und sind jeweils nicht hinter `main`.

Beide bearbeiten `src/main.ts`, jedoch nach statischer Quelltext-Differenz unterschiedliche Basisbereiche: NEXT-69 etwa Imports und Konfiguration/Teilnehmerwahl (Zeilen 13, 48, 596, 623, 628, 661, 674); NEXT-70 Imports, Paarungs-Buttons und Exporthandler (Zeilen 19, 527, 548). **Keine offensichtliche überlappende Produktions-Hunk**, aber das ist **kein** Ersatz für einen tatsächlichen kombinierten Build und Browserlauf.

Beide bearbeiten auch `BACKLOG.md`, `PROJECT_STATE.md`, `RUN_STATE.md`, `CHANGELOG.md` und `public/backlog.html`, `public/testsuite.html`, `public/release-notes.html`. Diese Dateien dürfen bei einer Integration nicht einfach überschrieben werden; beide Aufgaben müssen in der kumulativen Dokumentation erhalten bleiben.

Das neue Skript `scripts/check-integration-conflicts.mjs` prüft gemeinsame Basis, gemeinsame Dateien und sich überlappende Quelltext-Hunks und meldet Dokumentationsabgleich separat. Lokale Node-Selbsttests: **4/4 erfolgreich**. Auf einem Checkout mit allen Branches:

```sh
node --test tests/check-integration-conflicts.check.mjs
node scripts/check-integration-conflicts.mjs main feature/NEXT-69-validated-tournament-presets feature/NEXT-70-match-export
```

## Freigabegates – noch offen

1. QA-Integrationsbranch ausschließlich als Testkandidat aus der unveränderten v0.1.56-Basis erzeugen. Keine Änderung an `main` und kein Release-Workflow.
2. NEXT-69 und NEXT-70 **selektiv** zusammenführen, Konflikte und Dokumentationshistorie explizit abgleichen. Die Original-Feature-Branches und PRs bleiben isoliert.
3. Vollständige kombinierte CI: `npm ci`, Audit 0, Typecheck, Unit/Behavior/Regression/Determinismus, zwei reproduzierbare Builds, Desktop/Mobil-Playwright; besonders Turnierpreset + Einzelkampfexport in derselben Turniersitzung.
4. Eventuelle sporadische NEXT-67-Replay-Regression beobachten; Fehler mit eigenem Fix-Branch absichern.
5. NEXT-79e: reale NVDA-/VoiceOver- und Touch-/Kontrastprüfung bleibt offen und darf nicht stillschweigend als bestanden gelten.
6. **Nur nach ausdrücklicher Nutzerfreigabe**: sequenzielle PR-Merges mit erneuter Prüfung auf dem exakten späteren Release-SHA. Bis dahin keine Veröffentlichung.

## Kumulativ seit bestätigter v0.1.56

**2 vollständig implementierte und isoliert getestete, unveröffentlichte NEXT-Aufgaben: NEXT-69 und NEXT-70.** NEXT-79e und NEXT-71 sind noch offen. Diese Datei ist ausschließlich Integrationsvorbereitung.
