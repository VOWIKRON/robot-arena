## Abnahme 25.10.2026, 12:00 MEZ · NEXT-79c/d vollständig CI-bestätigt · KEIN PUBLISHING
- **P0-Blockade beseitigt:** GitHub-Actions-Push-Run **#40187217166** für den kompletten Entwicklungsstand **4e50e098e20d** ist **SUCCESS**. Ausgeführte Tests: **383/383 Unit-/Behavior-/Regressionstests (32 Dateien), 126/126 Playwright Desktop/Mobil-E2E**; Typecheck, Build, Audit-Gate (keine bekannten Advisories) und zweifacher reproduzierbarer Build ebenfalls grün. GitHub-Run/Job-Logs nachgelesen. Der vorherige rote Run #40183321392 (116 E2E bestanden, 10 fehlgeschlagen) ist durch konkrete Fixes abgelöst.
- [x] **NEXT-79c Teilaufgabe abgeschlossen:** Drei Turnierschritte, explizite Pause/Fortsetzung, keine unbestätigte Neuanlage bei aktivem Turnier, Escape/Close/Import/Restore ohne verstecktes Auto-Play, Export nach Wiederöffnen weiterhin verfügbar. Bestehende und neue Desktop-/Mobil-Regressionen grün.
- [x] **NEXT-79d Teilaufgabe abgeschlossen:** Hilfetexte, zugängliche Fehler-/Fokus-/ARIA-Behandlung, eindeutige Namen/Seed/Ticklimit, Teilnehmernamen bleiben auch bei doppelten Change-Ereignissen erhalten. Browser-Regressionen grün. Statische Farbkontrast-Stichproben für Feldhilfe #d4e3f7 auf #101a2e = 13,34:1, Abschnittstext #bdcde6 auf #101a2e = 10,78:1; 44px-Touchziele in CSS und E2E geprüft.
- [x] **NEXT-68 erneute Regression grün:** Abgebrochene lokal wiederhergestellte Turniere lassen keinen weiteren Kampf zu; der Button ist korrekt deaktiviert. Bestehende Autosave-/Restore-Funktion erneut grün.
- **Refactoring:** Teilnehmerfelder nur bei tatsächlicher Änderung der gültigen Teilnehmerzahl neu aufbauen; sonst DOM und Namen erhalten. Legacy-Tests an bewusst sichere UI-Verträge angepasst, nicht Schutzmechanismen abgeschwächt. Simulationsengine/Seed/RNG unverändert.
- **Rolling Backlog:** NEXT-79e als P0 offen: Screenreader-/Tastatur-/Touch-/Responsive-Abschlussmatrix (375/768/1280px), horizontale Scrollprüfung, Import/Export/Autosave/Cancel/Resume sowie Refactoring; NEXT-69–77 danach priorisiert. Vor späterem manuellem Publish: 4 Commits Divergenz zu main kontrolliert auflösen und endgültigen Release-SHA erneut vollständig testen.
- **Kumulativ vollständig getestet, aber unveröffentlicht seit letzter bestätigter Live-v0.1.55: 6 ganze NEXT-Aufgaben** – NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (Audit/reproduzierbare Builds), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministische Replays), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD innerhalb Arena) – **plus 4 getestete abgeschlossene NEXT-79-Teilaufgaben: 79a (UX-Baseline), 79b (Kampfsteuerung), 79c (Turnierdialog/Runner), 79d (Hilfetexte/Validierung)**. Gesamt **10 abgeschlossene Einträge**, davon 6 ganze NEXT und 4 Teilaufgaben; NEXT-79 als Ganzes erst nach 79e. **Neu in dieser Runde: NEXT-79c und NEXT-79d abgeschlossen; NEXT-68 erneut bestätigt.**
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Keine Homepage, kein publish.php, kein Merge nach main, kein Release.

## Entwicklungsrunde 25.10.2026, 11:00 MEZ · NEXT-79c/d P1-Härtung · KEIN PUBLISHING
- **Aktuelle Runde (2 von maximal 3 NEXT-Aufgaben):** GitHub-Branches, offene PRs, RUN_STATE.md, PROJECT_STATE.md, BACKLOG.md, Commits und CI erneut geprüft. Draft-PR #48; vor dieser Dokumentationsrunde Entwicklungsbranch 176 Commits vor, 4 hinter main. Hauptzweig mit automatischem Publish bei erfolgreicher CI wird NICHT verändert.
- **NEXT-79c Bugfix:** Browser-Dialog löst bei Escape das `cancel`-Event vor dem asynchronen `close`-Event aus. Der Auto-Timer wird nun schon im `cancel`-Handler pausiert, sodass kein 0-ms-Timer zwischen Escape und Schließen einen weiteren Kampf startet. Der bestehende idempotente Close-Handler bleibt als Fallback. Neuer Playwright-Fall: Auto-Start und Cancel im selben Browser-Task → paused 0/3 → schließen/wiederöffnen → kein Fortschritt → ausdrückliches Fortsetzen → 3/3.
- **NEXT-79d Bugfix:** Korrigierte ungültige Eingaben entfernen bereits `aria-invalid`, ließen aber die alte Fehlermeldung stehen. Jetzt wird diese nur bei tatsächlich vorher ungültigen Feldern durch den neutralen Hinweis „Eingabe geändert. Bitte Spielplan erstellen …“ ersetzt. Vorhandene Feldhilfe in `aria-describedby` bleibt erhalten; neue Assertions in vorhandener Playwright-Regression.
- **Refactoring:** Dialog-Schließen bleibt in einem gemeinsamen Suspend-Helper, Escape ruft denselben Helper frühzeitig auf. Fehlermeldungsbereinigung ist auf vorher als ungültig markierte Felder begrenzt. Deterministische Engine, Seeds und Archivformate unverändert.
- **Prüfung:** 13/13 gezielte statische Code-/Test-/CI-Konsistenzprüfungen nach Korrektur eines zu breiten Suchmusters erfolgreich; alle vier neuen Code-/Test-Commits per GitHub-Blob-SHA zurückgelesen. **0 neue Unit-/Behavior-/Regression-/Browser-Tests tatsächlich ausgeführt**: privater GitHub-Clone wegen DNS nicht erreichbar, Commit-Workflow-Run-Abfrage für neuen Head leer (Connector zeigt nur PR-getriggerte Läufe), Combined-Status leer. Letzte nachgewiesene vollständige CI #40153366228: 383 Unit-/Behavior-/Regressionstests und 102 Desktop-/Mobil-E2E; betrifft früheren Commit. NEXT-79c/d bleiben OFFEN.
- **Rolling Backlog P0:** (1) Vollständige aktuelle CI inklusive Audit=0, Typecheck, Unit/Behavior/Regression/Determinismus, zweifachem reproduzierbarem Build und Desktop/Mobil Playwright nachweisen; (2) bei Fehlern reproduzieren, fixen und gesamte Suite erneut ausführen; (3) NEXT-79c/d erst bei grünem Gate schließen; (4) NEXT-79e mit Screenreader-/Fokus-/Escape-/Keyboard-/Touch-/375-768-1280px-/Import-/Export-/Autosave-/Cancel-/Resume-Matrix und Refactoring; (5) 4 Commits Divergenz zu main vor späterer manueller Veröffentlichung sicher auflösen, Release-SHA erneut vollständig testen. Keine anderen Automationen verändert.
- **Kumulativ vollständig getestet, aber NICHT veröffentlicht seit bestätigter Live-v0.1.55: genau 6 ganze NEXT-Aufgaben:** NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (Audit/reproduzierbare Builds), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministische Replays), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD innerhalb der Arena). NEXT-79a/b getestete Teilaufgaben, nicht als vollständige NEXT-79 zählen; NEXT-79c/d weiter offen, NEXT-79e offen. Keine neue ganze NEXT-Aufgabe in dieser Runde abgeschlossen.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, Release, publish.php, Deployment oder Homepage-Update.

## Entwicklungsrunde 25.10.2026, 10:00 MEZ · NEXT-79c/d P1-Fehlerbehebung · KEIN PUBLISHING
- **Aktuelle Runde (2/3 Aufgaben):** NEXT-79c und NEXT-79d; priorisiert vor NEXT-79e. Vorher GitHub-Branch, Draft-PR #48, RUN_STATE.md, PROJECT_STATE.md, BACKLOG.md, Changelog, Commits und CI geprüft. Branch nach Quellcode/Test-Commits 164 Commits vor, 4 hinter main.
- **NEXT-79c Bugfix:** Schließen des Turnierdialogs während angeforderter automatischer Ausführung pausiert den Runner jetzt ausdrücklich an der Matchgrenze, statt nur den Timer zu löschen und einen unsichtbar auf „running“ stehenden Lauf zurückzulassen. Sowohl Schließen-Knopf als auch Escape/native Dialog-Schließung nutzen denselben idempotenten Suspend-Helper. Automatik-Fortsetzungsabsicht bleibt erhalten, nach Wiederöffnen nur explizites „Fortsetzen“. Neuer Desktop-/Mobil-Playwright-Test: 3 Teilnehmer, Auto + Dialog schließen im selben Browser-Task, Wiederöffnen zeigt paused/0 von 3, Startaktionen gesperrt, Fortsetzen führt 3/3 zu Ende.
- **NEXT-79d Bugfix:** Ungültige Teilnehmerzahl (z. B. 99) löscht keine zuvor eingetragenen Teilnehmernamen mehr: Eingabe vor DOM-Ersetzung validieren. Fehler über gemeinsamen Fokus-/ARIA-Reporter mit `aria-invalid` und `aria-describedby`. Neuer Desktop-/Mobil-Playwright-Test: 3 benannte Teilnehmer, ungültige Zahl, Namen bleiben, Fokus/Fehlermeldung korrekt, nach Korrektur kann Spielplan erzeugt werden.
- **Refactoring:** Schließlogik in `suspendTournamentOnDialogClose()` zentralisiert, doppelte Timer-Clear-Aufrufe vereinheitlicht; Teilnehmerformular erst nach erfolgreicher Zahlvalidierung neu aufbauen. Keine Änderung an Simulation, RNG oder Turnierarchiven.
- **Prüfung:** 10/10 statische Quellcode-/Test-Konsistenzchecks bestanden; beide Commits und Blob-SHAs per GitHub-Readback geprüft. **0 aktuelle Unit-/Behavior-/Regression-/E2E-Tests ausgeführt**: privater GitHub-Clone durch DNS nicht erreichbar, CI-Run-Abfrage für aktuellen Commit leer, Combined-Status leer. Letzte belegte Voll-CI #40153366228 (383 Unit/Behavior/Regression, 102 E2E) betrifft früheren Stand. **NEXT-79c/d ausdrücklich NICHT abgeschlossen/CI-freigegeben.**
- **Rolling Backlog P0:** (1) Aktuelle CI für NEXT-79c/d mit npm ci, Audit 0, Typecheck, 383+ Unit-/Behavior-/Regression-/Determinismus-Tests, doppeltem reproduzierbarem Build und Desktop/Mobil-Playwright nachweisen; (2) bei Rot fehlerhafte Teststelle beheben und komplette Suite wiederholen; (3) bei Grün NEXT-79c/d abschließen; (4) NEXT-79e mit Screenreader/Fokus/375-768-1280px/Import-Export/Autosave/Cancel/Resume/Auto-Play-Matrix, Refactoring und erneuter Voll-CI; (5) erst danach Release-Branch mit main-Divergenz abgleichen, vollständige CI auf Release-SHA. KEIN PUBLISHING.
- **Kumulativ seit bestätigt live v0.1.55 genau 6 vollständig getestete, unveröffentlichte ganze NEXT-Aufgaben:** NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (Audit/reproduzierbare Builds), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministische Replays), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD innerhalb Arena). NEXT-79a/b sind getestete Teilaufgaben, zählen nicht als volle NEXT-79; NEXT-79c/d CI-offen, NEXT-79e offen. Keine neue vollständig abgenommene Aufgabe in dieser Runde.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, Release, publish.php, Deployment oder Homepage-Update. Andere Automationen unverändert.

## NEXT-79c/d Prüfung · 25.10.2026, ca. 09:00 MEZ · CI OFFEN
- [x] Fehlerhafte/fehlende lokale Sicherung sowie ungültiger Dateiimport erhalten laufendes/pausiertes Turnier und Auto-Play-Absicht; `stopTournamentAuto` erst nach erfolgreicher Archivvalidierung.
- [x] Gültiger Restore stellt Teilnehmer-Presets aus geladenen Roboterdaten wieder her.
- [x] Seed-/Ticklimit-/Namens-/Teilnehmerzahl-Fehler fokussieren betroffene Eingabe, markieren `aria-invalid` und referenzieren Status via `aria-describedby`; Korrektur löscht Marker.
- [x] Drei neue Playwright-Testfälle als Code hinzugefügt, GitHub-Readback erfolgreich. **Nicht ausgeführt, keine CI-Freigabe.**
- [ ] Aktuelle vollständige Unit-/Behavior-/Regression-/Desktop-/Mobil-CI nachweisen; bei Fehlern reparieren und wiederholen.
- [ ] NEXT-79e Abschlussmatrix: 375/768/1280px, Tastatur/Screenreader, Touchziele, Kontrast, Import/Export/Autosave, Fehlertext-/Fokusabnahme, Refactoring und erneute Voll-CI.
- Kumulativ 6 vollständig CI-getestete, unveröffentlichte ganze NEXT-Aufgaben 63/64/66/67/68/78. NEXT-79a/b getestet, 79c/d CI offen, 79e offen. Letzte bestätigte Live-Version v0.1.55. **KEIN PUBLISHING.**

## 25.10.2026 · NEXT-79c/d Publish-Reife-Prüfung – noch nicht freigegeben
- **NEXT-79c Bugfix:** Bei ungültigem Formularentwurf wird jetzt unmittelbar der konkrete Validierungsfehler angezeigt, ohne `renderTournamentPreview()` aufzurufen; bestehende Spielpläne, Kampfstände und Auto-Play bleiben unberührt. Neuer Playwright-Regressionstest prüft aktiven Spielplan, ungültigen Seed, unveränderten Fortschritt und danach erfolgreichen Einzelkampf. Code und Test im Branch committed und per Blob-SHA zurückgelesen.
- **NEXT-79d:** Präzise Validierung für Seed, Ticklimit, leere und doppelte Teilnehmernamen sowie E2E für ungültige Eingaben vor Spielplanerstellung vorhanden. Refactoring: Fehlerprüfung vor dem mutierenden Preview-Pfad; kein zweiter Runner-Zustand.
- **P0 Blocker:** Vollständige Tests für aktuellen Commit noch NICHT ausgeführt oder durch CI bestätigt. Lokaler GitHub-Clone scheitert an DNS; Commit-Workflow-Abfrage liefert keine Läufe. Keine Publish-Reife behaupten. Nächster Schritt: aktuelle CI (Unit/Behavior/Regression, deterministische Simulation, Desktop/Mobil, Typecheck, Audit, Build) ausführen/nachweisen, dann ggf. korrigieren und wiederholen.
- **Kumulativ unveröffentlicht, zuvor vollständig getestet:** NEXT-63, 64, 66, 67, 68, 78 (6 ganze NEXT-Aufgaben); NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d noch nicht vollständig abgenommen; NEXT-79e offen. Letzter bestätigter Live-Stand v0.1.55. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

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
