## Verifizierter Fortschritt · 25.10.2026, 03:00 MEZ · NICHT VERÖFFENTLICHT
- [x] **NEXT-79a:** Zwei neue Browser-Baseline-Tests (je Desktop/Mobil) für Konfiguration/Kampf, Turnier/Ergebnis, Tastatur/Fokus, 375/768/1280px und kein horizontaler Scroll. CI #40152929889 grün: 383 Unit, 100 E2E.
- [x] **NEXT-79b:** Semantisch gruppierte Kampfsteuerung/Werkzeuge, hervorgehobener Start, Status bereit/läuft/pausiert. Ein neuer E2E-Test je Desktop/Mobil; CI #40153090696 grün: 383 Unit, 102 E2E.
- [ ] **NEXT-79c:** Turnierdialog-Schrittfolge.
- [ ] **NEXT-79d:** Hilfen, Texte, Kontrast/Touch.
- [ ] **NEXT-79e:** Abschließende Usability-/Regressionstests.
- **NEXT-79 insgesamt bleibt offen**, bis 79c/d/e verifiziert sind. Engine bleibt unverändert. Keine Veröffentlichung.

# NEXT-79 – Usability-Audit (Analyse, noch keine UI-Freigabe)

Stand: 25.10.2026, Entwicklungsbranch / Draft-PR #48. **Keine Veröffentlichung.**

## Beobachtungen aus dem Quellcode (keine behaupteten Nutzertests)

1. Die Sandbox bietet sieben gleich gewichtete Schaltflächen in einer einzigen Leiste: Start, Pause, 1 Tick, Reset, Konfiguration, Replay und Turnier. Einsteiger erkennen keine klare Hauptaktion oder Trennung zwischen Kampf und Werkzeugen.
2. Der Turnierdialog präsentiert vor dem ersten Spiel zahlreiche Eingaben und mehr als zehn Aktionsschaltflächen (Planung, Automatik, Pause/Fortsetzen, Abbruch, Export, Import, Sicherung). Fortschritt und Ergebnisse stehen nach den Eingaben; es gibt keine klare Schrittfolge.
3. Begriffe wie Seed, Tick, Replay, A/B-Seitenzuordnung und Round Robin werden nicht an der Stelle erläutert, an der sie benötigt werden.
4. Die Kampf-Statusmeldung lautet während eines laufenden Kampfes weiterhin „Kampfbereit“, solange kein Sieger feststeht. Das ist irreführend; ein Zustand „Läuft“/„Pausiert“ fehlt.
5. Das Konfigurationsdialog-Layout enthält viele Komponenten- und Strategieparameter gleichzeitig; die wichtigsten Entscheidungen sind nicht deutlich hervorgehoben.
6. Die mobile Darstellung wechselt bei 760px auf eine Spalte, doch die Aktionspriorisierung bleibt gleich. Scrollwege, Tastaturfokus und Touch-Flows müssen anhand echter Browser-E2E geprüft werden.

## Umsetzungsplan – kleine, unabhängig abnehmbare Schritte

- **NEXT-79a – Audit-Baseline:** Screenshot-/DOM- und Keyboard-E2E für 375px/768px/1280px; Spielerwege Konfigurieren → Start → Pause → Reset und Turnier erstellen → ausführen → Ergebnis; bestehende Texte/Bedienelemente erfassen. Erst nach diesen Tests eine UX-Änderung beginnen.
- **NEXT-79b – Sandbox-Führung:** Start als klare Hauptaktion, Pause/Weiter und Reset als sekundäre Aktionen, Replay/Turnier/Konfiguration als Werkzeuggruppe; aktuelle Laufphase als eindeutigen Status anzeigen. Abnahme: Aktionen jederzeit auffindbar, keine Änderung an Simulation, Desktop/Mobil/Keyboard grün.
- **NEXT-79c – Dialog-Schrittfolge:** Turnierdialog in „Einrichten“, „Spielen“ und „Ergebnisse“ strukturieren; nur jeweils passende Aktionen aktiv/sichtbar; fortgeschrittene Optionen einklappen. Archiv-/Autosave-Funktionen bleiben erreichbar. Tests für Pause, Resume, Import/Export und ungültige Konfiguration.
- **NEXT-79d – Verständlichkeit:** Tooltips/Hilfetexte für Seed, Tick, Strategie, Energie, Reststruktur und Turnierformate; klare Fehlertexte mit Handlungsanweisung. Kontrast ≥4,5:1, 44px Touchziele, sichtbarer Fokus, Screenreader-Status.
- **NEXT-79e – Abschluss:** 375px/768px/1280px Desktop-/Mobil-E2E und Behavior-Regressionen, Screenreader-Label-Prüfung, kein horizontaler Seitenscroll; vor/nach Refactoring komplette CI.

**Priorität:** Nach NEXT-78 (Raptor-Spielfeldgrenze), vor NEXT-69. NEXT-79 bleibt bis zur Umsetzung und vollständigen Prüfung offen. Analyse basiert auf Quellcode, nicht auf echten Nutzertests.
