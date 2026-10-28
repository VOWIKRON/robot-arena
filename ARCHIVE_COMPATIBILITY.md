# NEXT-75 – Turnierarchiv-Kompatibilität (Entwicklungsstand, unveröffentlicht)

Stand: 25.10.2026. **Kein Release und keine Veröffentlichung.**

## Verbindliche Formatmatrix

| Eingabe | Verhalten | Zustand |
| --- | --- | --- |
| V1, vollständiger gültiger Lauf | Validieren und unverändert importieren | Unterstützt |
| V1, ready/running/paused/cancelled/completed | Identische Status-, Fortschritts- und Ergebnisdaten | Unterstützt |
| V1, 2 bis 16 Teilnehmer | Identische deterministische Ergebnisse; 16 Round-Robin-Teilnehmer = 120 Matches | Unterstützt |
| V1, ungültiger Status/Fortschritt/Fixture | Explizite Validierungsfehlermeldung, keine Zustandsübernahme | Abgelehnt |
| Fehlendes schemaVersion | „Versionsfeld fehlt“ | Abgelehnt |
| schemaVersion 0, 2, 999, '1', null | „ungültige Version (nicht unterstützt; nur v1)“ | Abgelehnt, keine implizite Migration |
| JSON-Syntaxfehler | „beschädigtes JSON“ | Abgelehnt |
| JSON größer als 2 MiB | „Datei zu groß“ | Abgelehnt |
| Inkompatibles lokales Autosave | Fehler melden, gespeicherten Wert unverändert lassen | Abgelehnt ohne Datenverlust |

## Golden-Archive

SHA-256 der kanonisch exportierten V1-JSON-Daten; Seed 4711, maxTicks 1, IDs `golden-0` bis `golden-15`. Die Tests vergleichen gegen **feste** Referenzwerte.

| Teilnehmer | Status | SHA-256 |
| ---: | --- | --- |
| 2 | paused | `a913b75502410f1a4774d23db532d1d97730e7bcd54fde8af43819aa05c503d5` |
| 2 | cancelled | `5b78704bc554cc0c273e4b7e52dd0618dc375a0d94bff0440b6dbf6caa0bcb46` |
| 2 | completed | `cf68b1c19d4d7b4236a7bf7d478366662414bd1fb013b526364c0770e426b10c` |
| 16 | paused | `671ced6947d3f8e6a30d75a7c963eee7c545f97e5d7fd4efe5ab96fccdea51ae` |
| 16 | cancelled | `e110475df9cdcf6a466154916b2c90a29a1ef57a17cf850f07de8c3e1059d565` |
| 16 | completed | `a526850d6fd42943198def5875b8750a00ab4a04c4e44a140243206409abbd5c` |

## Zukünftige V2-Migration – noch nicht implementiert

Eine spätere V2 darf **erst** mit expliziter Spezifikation, Versionsmatrix, rückwärtskompatiblen V1-Golden-Tests, Validierung vor Zustandsübernahme und dokumentiertem Backup-/Rollback-Verhalten unterstützt werden. Kein stilles Umbenennen von `schemaVersion`, keine implizite Annahme neuer Felder und kein Überschreiben inkompatibler Autosaves.

## Test- und Freigaberegel

Die endgültige QA umfasst TypeScript, Unit-/Behavior-/Regressions-/Determinismustests, doppelt reproduzierbaren Build, Dependency-Audit und Desktop-/Mobil-Playwright. Erst nach grünem isoliertem Lauf darf NEXT-75 als entwicklungsseitig abgeschlossen gelten. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**
