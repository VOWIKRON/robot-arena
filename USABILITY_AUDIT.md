## Publish-Reife Arbeitsstand · 25.10.2026 · KEIN PUBLISHING
- **Auftrag:** Angefangene Pakete bis zur Veröffentlichungsreife bringen; Freigabeumfang NEXT-63/64/66/67/68/78, NEXT-79a/b bereits getestet; NEXT-79c/d/e erst nach vollständiger CI-Abnahme. Keine Veröffentlichung in diesem Arbeitsschritt.
- **NEXT-79d heute weiterbearbeitet:** Präzise Fehlertexte für ungültigen Seed (0..MAX_SAFE_INTEGER), Ticklimit (1..3600), fehlende und doppelte Teilnehmernamen vor Planerstellung ergänzt. Neuer Playwright-Test prüft ungültige Eingaben und anschließend erfolgreiche Erstellung. Produktionscode/Test im Entwicklungsbranch committed und per GitHub-Readback verifiziert. **Noch nicht ausgeführt; keine CI-Freigabe.**
- **Release-Gate:** Aktuellen Branch vollständig testen (Typecheck, 383+ Unit/Behavior/Regression, deterministische Engine, Desktop/Mobil Playwright, Audit, reproduzierbarer Build), danach NEXT-79c/d und NEXT-79e abschließen. Vor Release zusätzlich Divergenz zu main (zuletzt 4 Commits hinter main) auflösen und danach komplette Regression wiederholen. Keine ungeprüften Änderungen veröffentlichen.
- **Kumulativ weiterhin 6 vollständig getestete, unveröffentlichte ganze NEXT-Aufgaben:** 63, 64, 66, 67, 68, 78; NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d in Abnahme; NEXT-79e offen. Letzte bestätigte Live-Version v0.1.55.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Fortschritt · 25.10.2026, ca. 08:00 MEZ · NEXT-79c Auto-Play-Absicht bei Formularänderungen
- [x] Neue Fehlerquelle gefunden und im Code korrigiert: `stopTournamentAuto()` beim bloßen Versuch einer Neuanlage oder beim Ändern der Teilnehmerzahl verwarf die automatische Fortsetzung eines pausierten Turniers. Entwurfsänderungen bleiben jetzt ohne Timer-Nebenwirkung; ein echter neuer Plan beendet die alte Automatik erst nach erfolgreicher Validierung.
- [x] Browser-Regression ergänzt: 3 Teilnehmer, Auto → Pause → ungültige/geänderte gültige Seed-Eingabe und Teilnehmer-Update → explizit Fortsetzen → automatisch 3/3. Code/Test per GitHub-Readback geprüft; **Tests noch nicht ausgeführt**.
- [ ] Vollständige aktuelle CI und Desktop-/Mobil-Regression für NEXT-79c/d nachweisen, Fehler beheben und erneut testen; erst dann Teilaufgaben abnehmen. GitHub-Commit-Run-/Statusabfrage leer, lokaler Clone wegen DNS nicht möglich.
- [ ] NEXT-79d Validierungs-/Fokus-/Kontrast-Abnahme; NEXT-79e Screenreader-/Responsive-/Import-/Export-/Autosave-Abschlussmatrix mit erneuter Voll-CI.
- Letzte bestätigte Live-Version v0.1.55; kumulativ 6 vollständig CI-getestete, NICHT veröffentlichte NEXT-Aufgaben: NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (reproduzierbare Builds/Audit), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministisches Replay), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD-Arenagrenzen). NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d nicht aktuell vollständig CI-abgenommen; NEXT-79e offen. Keine neue vollständige NEXT-Aufgabe freigegeben. Kein Publishing.

## Fortschritt · 25.10.2026, 07:00 MEZ · NEXT-79c Schutz vor versehentlichem Turnier-Neustart
- [x] Bei einem aktiven Turnier blockiert „Spielplan erstellen“ jetzt auch abweichende gültige Formulareinstellungen; vorher konnte ein aktiver Spielplan stillschweigend ersetzt werden. Erst explizit abbrechen, dann neu planen. Runner-Status bleibt die einzige Quelle.
- [x] E2E-Regression ergänzt: ungültige Eingabe lässt aktiven Plan stehen, geänderte gültige Eingabe ersetzt ihn nicht, Cancel erlaubt Neustart und Kampf. Code und Tests auf GitHub geschrieben und zurückgelesen.
- [ ] Vollständige aktuelle CI für NEXT-79c/d nachweisen (Unit/Behavior/Regression, Desktop/Mobil, Typecheck, Build, Audit, reproduzierbar); erst danach Freigabe. GitHub-Commit-Runs/Status ohne verwertbares Ergebnis; lokaler Clone wegen DNS nicht möglich.
- [ ] NEXT-79d: konkrete Hilfen bei Eingabefehlern/Validierung und Kontrast-/Fokus-/Touch-Abnahme.
- [ ] NEXT-79e: abschließende responsive, Tastatur-, Screenreader- und Import/Export/Autosave-Regressionen; vollständige CI nach Refactoring.
- **Kumulativ 6 CI-getestete unveröffentlichte ganze NEXT-Aufgaben seit Live-v0.1.55:** 63, 64, 66, 67, 68, 78; NEXT-79a/b als getestete Teilaufgaben. NEXT-79c/d bleiben offen. Kein Publishing.

## Fortschritt · 25.10.2026, 06:00 MEZ · NEXT-79c Pause-/Fortsetzen-Regression ergänzt
- [x] Bei pausiertem Turnier sind jetzt beide Startaktionen deaktiviert; nur „Fortsetzen“ nimmt den Lauf wieder auf. UI verwendet weiterhin allein `tournamentRun.status`, keinen zweiten Zustand.
- [x] Desktop-/Mobil-Playwright-Test ergänzt: Plan erstellen → Pause → Startaktionen deaktiviert → Fortsetzen → Kampf. Code und Test aus GitHub zurückgelesen.
- [ ] Vollständige aktuelle CI für NEXT-79c/d nachweisen; keine Abschlussfreigabe vor grünem Unit-/Behavior-/Regression-/Desktop-/Mobil-Gate. GitHub-Commit-Runs-Suche liefert keine verwertbaren Statusdaten, selbst bei älteren nachweislich grünen Runs.
- [ ] NEXT-79e erst danach: Screenreader-Labels, Tastatur, 375/768/1280px, Status-/Fehlertexte und Regressionen; anschließend Refactoring und volle CI.
- Kumulativ 6 CI-bestätigte unveröffentlichte NEXT-Aufgaben seit Live-v0.1.55: 63, 64, 66, 67, 68, 78. NEXT-79a/b getestete Teilaufgaben; 79c/d in Abnahme, 79e offen. **Kein Publishing.**

## Fortschritt · 25.10.2026, 05:00 MEZ · NEXT-79c/d CI-Abnahme offen
- [x] NEXT-79c: Drei Turnierabschnitte, Tastaturnavigation und Aktionsgates implementiert; Playwright-Tests im Branch.
- [x] NEXT-79d: Kontext-Hilfetexte zu Strategie, Energiereserve, Seed/Startwert, Ticklimit, Turnierformat und Reststruktur sowie `aria-describedby` und CSS-Stile implementiert; neue Desktop-/Mobil-Regressionen im Branch.
- [ ] Vollständige aktuelle CI für NEXT-79c/d (Unit, Behavior, Regression, Desktop/Mobil, Typecheck, Audit, reproduzierbarer Build) nachweisen und bei Fehlern korrigieren; **bis dahin keine Abschlussmeldung**.
- [ ] NEXT-79e: Screenreader-/Fokus-/Responsive-Abschlussmatrix, weitere Verständlichkeits- und Fehlertextprüfungen, Refactoring und vollständige Regression.
- **Kumulativ 6 zuvor CI-bestätigte unveröffentlichte NEXT-Aufgaben:** 63, 64, 66, 67, 68, 78. NEXT-79a/b als Teilaufgaben getestet, 79c/d in Abnahme, 79e offen. Kein Publishing.

## Fortschritt · 25.10.2026, 04:00 MEZ · NEXT-79c in CI-Abnahme
- [x] Drei Turnierabschnitte Einrichten/Spielen/Ergebnisse und zugängliche Tastatur-Sprungnavigation im Code ergänzt.
- [x] Turnieraktionen nach Runner-Status zentralisiert; nicht verfügbare Aktionen deaktiviert. Datei-/Autosave-Bedienung bleibt für bestehende Abläufe sichtbar.
- [x] Playwright-Fälle für Desktop/Mobil, Keyboard, Ablauf und Action-Gates ergänzt (Code vorhanden).
- [ ] Vollständige neue CI auf dem aktuellen Head erfolgreich nachweisen und Fehler gegebenenfalls korrigieren; erst danach NEXT-79c als abgeschlossen markieren.
- [ ] NEXT-79d Hilfetexte, Kontrast/Touch; NEXT-79e Abschlussmatrix.
- **Kumulativ 6 CI-bestätigte, noch unveröffentlichte ganze NEXT-Aufgaben:** 63, 64, 66, 67, 68, 78. NEXT-79c zählt noch nicht. Keine Veröffentlichung.

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
