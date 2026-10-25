## NEXT-74 · Import-Härtung auf isoliertem Branch · 25.10.2026, ca. 20:08 MEZ · UNVERÖFFENTLICHT
- **Aktuelle Runde (max. 3 NEXT):** NEXT-71 **NEU entwicklungsseitig fertig** (kombinierte CI #40223947082: 395 Vitest + 4 Konfliktguard + 144 Desktop/Mobil, Audit 0, Build reproduzierbar); NEXT-79e in Arbeit (Kontrollrand-Kontrast verbessert, echte NVDA-/VoiceOver-/Touch-/visuelle Abnahme fehlt); NEXT-74 neu implementiert, CI noch offen.
- **NEXT-74 neuer Branch `feature/NEXT-74-import-guards`, Draft-PR #61 gegen isolierten QA-Zweig `qa/NEXT-74-isolated-validation`.** Guard für untrusted JSON: Tiefen-/Knoten-/Array-/Textgrenzen, gefährliche Prototype-Schlüssel, Accessor/Cycles, nicht endliche Zahlen, JSON-Objekttypen; Validierung vor Archivannahme und bei Definitionen; bestehende 2-MiB-Dateigrenze erhalten. Neue Unit-/Adversarial- und Desktop-/Mobiltests prüfen u.a. Datenintegrität nach fehlerhaftem Import. **Noch keine aktuelle erfolgreiche NEXT-74-CI – NICHT abgeschlossen.**
- **Kumulativ seit letzter bestätigter Live-Version v0.1.56: 3 vollständig implementierte und getestete, aber UNVERÖFFENTLICHTE Aufgaben:** NEXT-69 (Roboterpresets, 391 Unit + 134 E2E), NEXT-70 (Kampfexport, 387 Unit + 130 E2E), **NEXT-71 (NEU: kombinierte QA 395 Unit + 4 Node + 144 E2E)**. NEXT-79e und NEXT-74 offen. Keine Veröffentlichung bestätigt.
- **Refactoring:** Eigenständiger iterativer Input-Guard statt mehrfacher ad-hoc Prüfungen; Simulationsengine und RNG unverändert. Nach CI bei Fehlern zuerst Fix und gesamte QA wiederholen.
- **Rolling Backlog:** (1) NEXT-74 QA auswerten/fixen; (2) NEXT-79e echte Screenreader-/Touch-/Kontrast-Abnahme; (3) NEXT-74 Import-Fuzz und Legacy-Archive auf 2/16 Teilnehmer nachziehen, falls CI/Befunde erforderlich; (4) NEXT-72–77 unverändert erhalten; (5) späteres Release-SHA-Gate erst nach manueller Nutzerfreigabe.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Keine Änderungen an main, Homepage, publish.php oder Release-Workflow.

## Priorisierte Fortsetzung · 25.10.2026, 14:00 MEZ · unveröffentlicht
- [ ] **NEXT-79e (P0):** Neue Playwright-Tastatur-/Screenreader-Namensmatrix auf Entwicklungs-HEAD vollständig in GitHub CI bestätigen (Desktop + Mobil; neuer Test 2 Ausführungen), Fehler zuerst beheben. Anschließend echte NVDA-/VoiceOver-Prüfung: Dialogtitel, Feldnamen, Live-Status, Fehlerhinweise, Fokusfalle/Fokusrückgabe. Visuelle Touch-/Kontrastprüfung 375/768/1280px; vollständige CI nach jedem Fix. **Noch nicht abgeschlossen.**
- [ ] **NEXT-71 (Release-Readiness, keine Veröffentlichung):** Die vom Nutzer nur für NEXT-63 und NEXT-64 erteilte Freigabe respektieren: Abhängigkeiten zur bereits veröffentlichten v0.1.55 prüfen, Änderungen isolieren, Test- und Release-SHA dokumentieren. Der aktuelle Sammelbranch enthält viele weitere unveröffentlichte Features und liegt 4 Commits hinter main. **Kein Merge, kein Deployment.**
- [ ] **NEXT-69:** Validierte, versionierte Roboterpresets aus Sandbox-Konfiguration in Turnier übernehmen; Grenzwerte, stabile IDs, Importvalidierung, deterministische Engine- und Desktop/Mobil-Tests.
- [ ] **NEXT-70:** Match-CSV/JSON mit Unicode-, Formel-Injection-, Schema- und Download-Regressionen.
- [ ] **NEXT-72–77:** Weiter gemäß vorhandenen Akzeptanzkriterien; keine Einträge verlieren.
- **Neue Entwicklungsänderung:** NEXT-79e Tastatur-Playwright-Test + gemeinsamer Overflow-Helper, Commits `ca7f9801`/`89fd44fd`; **aktuelle CI ausstehend**, letzte bestätigte #40191756134 (383 Unit/Behavior/Regression, 132 E2E).
- **Kumulativ fertig getestet und unveröffentlicht seit v0.1.55:** 6 ganze NEXT (63,64,66,67,68,78) + 4 Teilaufgaben (79a–d) = 10 Einträge; NEXT-79e weiter offen. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

# VERBINDLICHE ENTWICKLUNGSREGEL – HÖCHSTE PRIORITÄT (25.10.2026)

**JEDE NEXT-AUFGABE MUSS AUF EINEM EIGENEN GIT-BRANCH ENTWICKELT WERDEN.** Dies gilt ab sofort ausnahmslos für neue Aufgaben. Kein gemeinsamer Sammel-Entwicklungsbranch für mehrere NEXT-Aufgaben.

1. Vor Beginn jeder NEXT-Aufgabe vom aktuellen stabilen `main` einen eigenen Branch `feature/NEXT-<Nummer>-<kurztitel>` erstellen. Unteraufgaben mit unabhängigem Veröffentlichungsbedarf erhalten ebenfalls eigene Branches (z. B. `feature/NEXT-79a-...`).
2. Auf diesem Branch ausschließlich Code, Tests und Dokumentation dieser einen Aufgabe ändern. Fremde, unfertige Aufgaben dürfen nicht als Abhängigkeit hineingeraten; erforderliche gemeinsame Änderungen zuerst als separat geprüfte Basis integrieren.
3. Für jede Aufgabe einen eigenen Pull Request, eigene CI-/Behavior-/E2E-Tests und eine eigene Freigabe führen. Erst nach erfolgreicher Prüfung und ausdrücklicher Nutzerfreigabe nach `main` integrieren und veröffentlichen.
4. **Teilfreigaben müssen isoliert veröffentlichbar sein.** Niemals mehrere NEXT-Aufgaben durch einen Sammel-Merge oder eine Sammelveröffentlichung unbeabsichtigt ausliefern.
## Entwicklungsrunde 25.10.2026, 12:00 MEZ – NEXT-79c, NEXT-79d, NEXT-68 – KEIN PUBLISHING
- **Erstmals echte aktuelle CI gefunden:** GitHub Actions Push-Run #40183321392 (Head e1ca20c0) war ROT: 383 Unit/Behavior/Regression sowie Typecheck, Audit=0, Build und reproduzierbarer Zweitbuild GRÜN; Playwright **116 bestanden, 10 fehlgeschlagen** (je 5 Desktop/Mobil). Vorherige Commit-Run-Abfragen zeigten irreführend nur PR-Runs. Ab sofort GitHub REST Actions-Runs per Branch prüfen.
- **NEXT-79c Fehlerkorrektur/Regression:** Legacy-E2E erstellt nicht mehr stillschweigend einen neuen Spielplan über einen aktiven; vor der Neuplanung wird explizit abgebrochen. Responsive-Dialogtest erwartet nach Wiederöffnen eines abgeschlossenen Turniers richtigerweise weiterhin verfügbaren Export statt „deaktiviert“. Produktive Guard-Logik unverändert.
- **NEXT-79d P1-Fix:** Doppelte native/synthetische Teilnehmerzahl-Änderungsereignisse bauen bei unveränderter gültiger Anzahl die Teilnehmerfelder nicht erneut auf (Namensverlust). Legacy-E2E erwartet neue, konkrete Validierungstexte für fehlende Namen und Startwert.
- **NEXT-68 Regression:** Wiederhergestelltes abgebrochenes Turnier deaktiviert „Nächster Kampf“ absichtlich. Der E2E-Test prüft „disabled“ statt einen Klick auf einen deaktivierten Button (30-s-Timeout).
- **Verifikation:** 4 Code-/Testdateien auf dem Entwicklungsbranch committed und anhand GitHub-Blob-SHA zurückgelesen. Neue Push-CI-Runs #40187122831, #40187134234, #40187142977, #40187149330 gestartet, zuletzt noch nicht vollständig abgeschlossen. **Keine neue NEXT-Abnahme bis aktueller vollständiger grüner CI.**
- **Rolling Backlog P0:** (1) CI-Run des letzten Entwicklungs-Head auf Typecheck/Unit/Behavior/Determinismus/Audit/reproduzierbaren Build/Desktop/Mobil vollständig auswerten; (2) übrige E2E-Fehler reproduzieren und beheben; (3) NEXT-79c/d und NEXT-68 Regression erst bei Grün freigeben; (4) NEXT-79e Screenreader/Fokus/Touch/375-768-1280px/Import-Export/Autosave/Cancel/Resume als finale UX-Matrix; (5) vor späterer manueller Veröffentlichung Divergenz zu main beheben, erneut CI prüfen.
- **Kumulativ seit letzter bestätigter Live-v0.1.55: 6 vollständig CI-getestete, NICHT veröffentlichte ganze NEXT-Aufgaben:** NEXT-63 (Touch/Tastatur/Barrierefreiheit), NEXT-64 (Audit/reproduzierbare Builds), NEXT-66 (Kampfdetails), NEXT-67 (deterministische Replays), NEXT-68 (Autosave/Restore), NEXT-78 (Raptor/HUD-Arenagrenzen). NEXT-79a/b getestet als Teilaufgaben, NEXT-79c/d noch nicht aktuell vollständig abgenommen, NEXT-79e offen. **In dieser Runde keine neu abgenommene Aufgabe.**
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

## Rolling Backlog · 25.10.2026, ca. 09:00 MEZ · NEXT-79c/d P1-Fehler korrigiert, CI offen
- [x] NEXT-79c: Defekte/fehlende lokale Sicherung darf laufende oder pausierte Automatik nicht beenden; erst validierter Restore stoppt alten Runner. Code + Browser-Regression geschrieben, noch nicht ausgeführt.
- [x] NEXT-79c: Ungültiger JSON-Dateiimport darf Auto-Play-Absicht nicht löschen; erst erfolgreich validiertes Archiv ersetzt den Runner. Code + Browser-Regression geschrieben, noch nicht ausgeführt.
- [x] NEXT-79c: Beim Wiederherstellen die echten Raptor-/Titan-Presets aus validierten Teilnehmerdaten statt alten Formularwerten anzeigen; Browser-Regression geschrieben, noch nicht ausgeführt.
- [x] NEXT-79d: Ungültigen Seed, Ticklimit, Teilnehmerzahl und leere/doppelte Namen mit konkreter Fehlermeldung, Fokus, `aria-invalid` und `aria-describedby` anzeigen; Eingabekorrektur entfernt stale Error-Attribute. Code + Browser-Regression geschrieben, noch nicht ausgeführt.
- [ ] **P0 CURRENT CI:** Aktuellen PR-Head durch vollständige Development Tests laufen lassen: `npm ci`, Audit mit 0 Advisories, Typecheck, Unit/Behavior/Regression/Determinismus, Build 2× identisch, Playwright Desktop/Mobil. Letzte belegte CI #40153366228 liegt vor neuen Änderungen. CI-Runs für neuen Commit nicht sichtbar; lokaler Clone durch DNS blockiert.
- [ ] **P0 FIX ON RED:** Bei jedem fehlgeschlagenen Test Ursache isolieren, Produktionscode und Regression korrigieren, erneut komplette CI prüfen. NEXT-79c/d erst nach aktuellem grünem CI-Gate schließen.
- [ ] **NEXT-79e UX-Finalisierung:** Screenreader-Status und `aria-describedby` für alle Fehler prüfen; Keyboard/Fokus beim Dialog, Abbrechen, Import/Restore und Replay; 375/768/1280px, Touchziele, kein horizontaler Scroll; Pause/Resume/Cancel und Auto-Play mit invaliden Formularentwürfen; Export/Import/Autosave/Restore auf Mobil/Desktop. Danach Refactoring + Voll-CI.
- [ ] **Release-Reife:** Divergenz zu `main` (4 Commits behind) auflösen; separate Freigabe der Nutzerpakete 63/64/66/67/68/78 ohne ungeprüfte Änderungen; Release-Gate auf exakt ausgewähltem Stand erneut grün. KEIN Publish durch Automation.
- **Kumulativ vollständig getestet und noch nicht veröffentlicht: 6 NEXT-Aufgaben – 63, 64, 66, 67, 68, 78.** NEXT-79a/b getestete Teilaufgaben; 79c/d ohne neue Voll-CI, 79e offen. Letzte bestätigte Live-Version v0.1.55. Draft-PR #48. NICHT VERÖFFENTLICHT.

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

## Entwicklungsstand · 25.10.2026, ca. 08:00 MEZ · NEXT-79c Auto-Play-Guard nachgebessert · KEIN PUBLISHING
- [x] **NEXT-79c P1 Bugfix implementiert:** Versuch einer Neuanlage bei aktivem Turnier und bloße Änderung der Teilnehmerzahl dürfen eine angehaltene/automatische Turnierausführung nicht heimlich stoppen. Timer/Auto-Absicht nur nach erfolgreicher echter Neuanlage beenden; bestehender Runner-Status bleibt maßgeblich.
- [x] **Regression als Code ergänzt:** 3 Teilnehmer, Ticklimit 1, Auto → Pause → ungültige und gültige geänderte Seeds → Teilnehmer-Update → explizit Fortsetzen → automatischer Abschluss aller 3 Kämpfe; Desktop-/Mobil-Projekte. GitHub-Code und -Test nach Schreiben zurückgelesen, **noch nicht ausgeführt**.
- [ ] **P0 NEXT-79c/d CI-Gate:** aktuellen Head auf Development Tests prüfen (Unit/Behavior/Regression, deterministische Simulation, 375/768/1280px Desktop/Mobil, Typecheck, Build, Audit, reproduzierbarer Build); bei Rot Fix + vollständige Wiederholung. Erst bei nachgewiesenem Grün NEXT-79c/d schließen. Aktuelle Commit-Run-/Statusabfrage ohne verwertbare Daten; lokaler Clone wegen DNS blockiert.
- [ ] **NEXT-79d Verständlichkeit:** Validierungsfehler für Namen, Seed, Ticklimit, Teilnehmer und Formate mit konkreter Handlungsanweisung; Fokus/ARIA/Touchziel/Kontrast-Abnahme nach erfolgreicher CI.
- [ ] **NEXT-79e Abschluss:** Screenreader, Keyboard, Pause/Resume/Cancel, Auto-Play nach Formänderung, Import/Export/Autosave, 375/768/1280px und horizontaler Scroll; Refactoring-Review, komplette CI erneut.
- Letzte bestätigte Live-Version v0.1.55; kumulativ 6 vollständig CI-getestete, NICHT veröffentlichte NEXT-Aufgaben: NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (reproduzierbare Builds/Audit), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministisches Replay), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD-Arenagrenzen). NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d nicht aktuell vollständig CI-abgenommen; NEXT-79e offen. Draft-PR #48; keine Veröffentlichung.

## Entwicklungsstand · 25.10.2026, 07:00 MEZ · NEXT-79c Schutz aktiver Turniere ergänzt, CI offen · KEIN PUBLISHING
- [x] **NEXT-79c Implementierung gehärtet:** Geänderte gültige Konfiguration darf aktiven Turnierlauf nicht überschreiben; expliziter Abbruch vor Neustart nötig. Unveränderte Eingaben bleiben ebenfalls gesperrt. Vorhandener Runner-Status als einzige Quelle, keine Engine-/RNG-Änderung.
- [x] **NEXT-79c Regression hinzugefügt:** ungültiger Startwert lässt laufenden Plan bestehen; geänderter gültiger Startwert überschreibt ihn nicht; Cancel → neue Planung → Kampf funktioniert. GitHub-Code und -Test nach Commit zurückgelesen.
- [ ] **P0 Test-Gate für NEXT-79c/d:** aktuellen Head in vollständiger Development-CI (Unit/Behavior/Regression, deterministische Simulation, Desktop/Mobil, Typecheck, Build, Audit, reproduzierbarer Build) erfolgreich nachweisen, Fehler ggf. korrigieren; erst dann als abgeschlossen markieren. Letzte bestätigte CI vor 79c/d: #40153366228 (383 Unit/Behavior/Regression, 102 E2E). Aktuelle Run-Abfrage nicht aussagekräftig; lokaler Clone durch DNS blockiert.
- [ ] **NEXT-79d nach CI:** verständliche Validierungsfehler und konkrete Handlungsanweisungen für ungültige Formate/Teilnehmer/Startwerte, Kontrast/Fokus/Touchziele und ARIA-Abnahme.
- [ ] **NEXT-79e danach:** 375/768/1280px, Screenreader-Labels, Tastatur/Fokus, kein horizontaler Scroll, Import/Export/Autosave und Pause/Resume/Cancel als Desktop-/Mobil-Regression; nach Refactoring komplette CI erneut ausführen.
- **Kumulativ seit Live-v0.1.55 unveröffentlicht und bereits vollständig getestet: genau 6 ganze NEXT-Aufgaben (63, 64, 66, 67, 68, 78).** NEXT-79a/b getestet; 79c/d offen, 79e geplant. NEXT-69–77 unverändert im Rolling Backlog. Draft-PR #48; kein Merge/Publish.

## Entwicklungsstand · 25.10.2026, 06:00 MEZ · NEXT-79c/d weiter in Abnahme, KEIN PUBLISHING
- [x] NEXT-79c: Pausenbedienung korrigiert: „Nächster Kampf“ **und** „Alle Kämpfe spielen“ bei pausiertem Turnier deaktiviert, ausschließlich explizites „Fortsetzen“ erlaubt. Desktop-/Mobil-Regression für Pausieren, Aktionsgates und Fortsetzen ergänzt und committed.
- [ ] **NEXT-79c/d Abnahme:** vollständige aktuelle CI für Unit/Behavior/Regression, Desktop/Mobil, Typecheck, Build, Audit und reproduzierbare Builds nachweisen; neue Regression erst dann als bestanden markieren. Für den aktuellen Head keine verwertbaren GitHub-Run-Statusdaten; lokale Tests wegen fehlendem GitHub-Netzwerkzugang nicht möglich.
- [ ] NEXT-79e: abschließende Screenreader-/Fokus-/Responsive-/Fehlertextmatrix und Refactoring nach bestätigter 79c/d-Abnahme. Danach NEXT-69–77 unverändert fortsetzen.
- **Kumulativ seit Live-v0.1.55: 6 vollständig getestete, NICHT veröffentlichte NEXT-Aufgaben 63, 64, 66, 67, 68, 78.** NEXT-79a/b als getestete Teilaufgaben; 79c/d ohne aktuelle CI, 79e offen. Letzte bestätigte CI #40153366228: 383 Unit/Behavior/Regression, 102 Desktop/Mobil-E2E.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Draft-PR #48; kein Merge, Release oder Deployment.

## Entwicklungsstand · 25.10.2026, 05:00 MEZ · NEXT-79c/d in Abnahme, NICHT VERÖFFENTLICHT
- [x] NEXT-79c: Turnierdialog-Schrittfolge und zustandsabhängige Aktionsfreigabe implementiert; Desktop-/Mobil-/Tastaturtests committed.
- [x] NEXT-79d: Erklärungen zu Seed/Startwert, Tick, Strategie, Energiereserve, Reststruktur und Turnierformat sowie `aria-describedby` und responsive Browser-Regressionen implementiert.
- [ ] **CI-Gate für NEXT-79c und NEXT-79d:** vollständige Unit-/Behavior-/Regression-/Desktop-/Mobilmatrix auf aktuellem Head erfolgreich bestätigen, bei Fehlern korrigieren und erneut testen. **Beide Aufgaben bis dahin offen.**
- [ ] NEXT-79e: Responsive/Tastatur/Screenreader-Abschlussmatrix und Refactoring-Review; anschließend vollständige CI. Danach NEXT-69–77 gemäß Rolling Backlog.
- **Letzte bestätigte CI vor NEXT-79c/d:** #40153366228 (383 Unit/Behavior/Regression, 102 E2E). **Seit bestätigt veröffentlichtem v0.1.55 genau 6 zuvor vollständig getestete, NICHT veröffentlichte ganze NEXT-Aufgaben:** 63, 64, 66, 67, 68, 78. NEXT-79a/b getestet, 79c/d ohne aktuelle CI, 79e offen. Draft-PR #48; kein Merge/Publish.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsstand · 25.10.2026, 04:00 MEZ · NEXT-79c in Arbeit, NICHT VERÖFFENTLICHT
- [x] Drei Turnierschritte „Einrichten“, „Spielen“, „Ergebnisse“ als getrennte UI-Sektionen und Tastatur-Sprungnavigation umgesetzt.
- [x] Verfügbare Turnieraktionen aus bestehendem Runner-Status zentral abgeleitet; E2E-Tests für 375/1280px, Bedienfolge, Datenzugang und Disabled-Zustände ergänzt.
- [ ] **NEXT-79c CI-Abnahme:** vollständige Unit-/Behavior-/Regression-/Desktop-/Mobile-Matrix für den aktuellen Code-Head bestätigen, gegebenenfalls reparieren; erst danach abschließen.
- [ ] Danach NEXT-79d Hilfen/Kontrast/Touch und NEXT-79e abschließende Usability-Regression. NEXT-69–77 bleiben im Rolling Backlog.
- **Letztes bestätigtes Live-Release v0.1.55; kumulativ 6 vollständig getestete, NICHT veröffentlichte Aufgaben: NEXT-63/64/66/67/68/78.** NEXT-79a/b getestete Teilaufgaben; NEXT-79c in Abnahme. Letzte grüne vollständige CI #40153366228 vor diesen Änderungen: 383 Unit/Behavior/Regression, 102 E2E. Kein Merge/Publish.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsstand · 25.10.2026, 03:00 MEZ · NEXT-78 fertig, NEXT-79a/b fertig, NEXT-79 offen (NICHT VERÖFFENTLICHT)
- [x] NEXT-78 P0 inklusive Raptor-/Titan-HUD am Rand durch CI #40144987038 vollständig abgenommen.
- [x] NEXT-79a Browser-Baseline für 375/768/1280px, Sandbox/Turnier und Tastatur: CI #40152929889 grün.
- [x] NEXT-79b primäre Kampfsteuerung von Werkzeugen getrennt; Status bereit/läuft/pausiert: CI #40153090696 grün (383 Unit/Behavior/Regression, 102 Desktop/Mobil).
- [ ] NEXT-79c/d/e noch offen; NEXT-69 ff. nicht vergessen.
- **Kumulativ 6 vollständig getestete, nicht veröffentlichte NEXT-Aufgaben:** 63, 64, 66, 67, 68, **78 NEU**. Letztes bestätigtes Live-Release v0.1.55. Kein Merge/Publish. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsstand · 25.10.2026, 02:00 MESZ · P0 NEXT-78 Testhärtung (offen)
- [x] Acht Rand-/Eckfälle nun gegen wirkliche Fluchtbewegung und anschließenden Kontakt mit der Arenagrenze abgesichert (Regressionen im Code ergänzt, **noch nicht CI-verifiziert**).
- [ ] Vollständige GitHub-CI auf aktuellem Head (Unit, Behavior, Regression, deterministische Simulation, Typecheck/Build, Desktop/Mobil, Audit und Reproduzierbarkeit) erfolgreich nachweisen; bei Fehlschlag korrigieren und erneut testen.
- [ ] NEXT-78 erst nach erfolgreicher CI und überprüften Browser-Randfällen als abgeschlossen markieren.
- [ ] Danach NEXT-79a UX-Baseline und 79b–79e sequenziert angehen; NEXT-69 ff. erhalten.
- **Kumulativ 5 bestätigte, nicht veröffentlichte NEXT-Tasks:** 63, 64, 66, 67, 68 (jeweils ältere CI grün). Letztes verifiziertes Live-Release v0.1.55. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsstand · 25.10.2026, 01:00 MESZ · NICHT VERÖFFENTLICHT
- **NEXT-78 P0 (in Arbeit, CI-Abnahme ausstehend):** Die Engine begrenzt Weltkoordinaten bereits auf 0..100; der 48px-Raptor bzw. 54px-Titan samt Energie-/Strukturbalken wird bislang jedoch am Spielfeldrand abgeschnitten. CSS-Viewport-Clamp für komplette Roboter/HUD implementiert, Rohkoordinaten und deterministische Engine unverändert. Neue feste Engine-Grenztests und Desktop-/Mobile-Playwright-Tests für acht Rand-/Eckfälle sowie reale Defensive hinzugefügt. **Nicht als abgeschlossen zählen, bevor die aktuelle vollständige CI grün ist.**
- **NEXT-79 P1 (Analyse begonnen, Umsetzung offen):** Quellcode-Audit in `USABILITY_AUDIT.md` mit priorisierten Bedienproblemen und testbaren Folgeschritten 79a–79e; keine UX-Änderung behauptet.
- **Letztes verifiziertes Live-Release v0.1.55.** Unverändert **5 vollständig getestete, noch nicht veröffentlichte Aufgaben:** NEXT-63, NEXT-64, NEXT-66, NEXT-67, NEXT-68. NEXT-78/79 nicht dazuzählen. Nur Draft-PR #48; kein Merge/Publish.

## Aktueller Zustand · 25.10.2026, 00:08 MESZ
**NEXT-68 – NEU vollständig implementiert und verifiziert:** Opt-in-LocalStorage-Checkpoint nur an Match-/Statusgrenzen; validierte versionierte Archive bis 2 MB, explizite Wiederherstellung nach Reload, korrupte/zu große Sicherungen und Quota-Fehler ohne Änderung aktiver Turniere, Datenschutz-Löschung, Pause/Cancel und 16-Teilnehmer-Regression. Refactoring: gemeinsamer validierter Datei-/LocalStorage-Importpfad und isoliertes Speicher-Modul.
**Development Tests #40137115159 auf c95aaf99 grün:** 372 Unit-/Behavior-/Regressionstests (31 Dateien), 92 Desktop-/Mobile-E2E, Typecheck, Build, Audit-Gate 0 bekannte Advisories, zwei identische Clean-Builds.
**Letztes bestätigtes Live-Release v0.1.55:** Publish #40132737105 hat Upload und Live-Checks erfolgreich durchgeführt, #40132968986 hat Live erneut verifiziert. NEXT-56–62 sind veröffentlicht und nicht mehr im Unpublished-Zähler.
**Kumulativ 5 getestete, NICHT veröffentlichte Aufgaben seit v0.1.55:** NEXT-63, 64, 66, 67 und **68 NEU**; nur Entwicklungsbranch / Draft-PR #48. NEXT-65 ist bereits in NEXT-59 enthalten. Nächster Schritt NEXT-69, danach NEXT-70/71, Rolling Backlog bis NEXT-77.
**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Aktueller Zustand · 24.10.2026, 23:00 MESZ
**NEXT-67 – NEU vollständig abgeschlossen und getestet:** Isoliertes Replay abgeschlossener Turnierkämpfe, reproduziert aus Original-Seed und eingefrorenen Roboterdefinitionen. Exakte archivierte Sieger-/Tick-/Reststrukturwerte müssen übereinstimmen; keine Replay-Wiedergabe bei Manipulation oder offenen Kämpfen. Sandbox und aktives Turnier bleiben unverändert. 2/3/16 Teilnehmer, 1/3600 Ticks, Desktop/Mobil und Tastatur getestet. 0 Ticks im Turniermodell absichtlich ungültig.
**Development Tests #40132151611 auf ddd26d15:** 365 Unit/Behavior/Regression (30 Dateien), 86 Desktop-/Mobile-E2E, Typecheck, Build, Audit und zweimaliger reproduzierbarer Build grün.
**Kumulativ 11 seit letztem unabhängig bestätigten Live-Release v0.1.54:** NEXT-56, 57, 58, 59, 60, 61, 62, 63, 64, 66, 67. NEXT-65 in NEXT-59 enthalten. NEXT-56–62: **Veröffentlichungsstatus ungeklärt** (main v0.1.55); NEXT-63/64/66/67: nur Entwicklungsbranch/Draft-PR #48, **NICHT VERÖFFENTLICHT**. Nächste Aufgabe NEXT-68, danach NEXT-69/70; detaillierte Planung bis NEXT-74.
**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

# Backlog

## Neu priorisierte Nutzerbefunde · 25.10.2026 (offen, noch nicht implementiert)

### NEXT-78 · P0 Bug: Raptor verlässt beim Fliehen das Spielfeld – ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Ursache getrennt: Weltkoordinaten bleiben innerhalb 0..100; bisheriges Rendering schnitt Chassis/Waffe/HUD an Rändern ab.
- [x] Visuellen Clamp für Raptor/Titan einschließlich Waffe, Energie- und Strukturbalken ergänzt, Engine/Seeds unverändert.
- [x] Acht Ränder/Ecken, 1000 defensive Fluchtschritte mit nachgewiesener Bewegung und Randkontakt, Seeds 1/12/4711, 375/1280px und Desktop/Mobil getestet.
- [x] Vollständige CI #40144987038 auf a06e5c56: 383 Unit/Behavior/Regression und 96 E2E, Typecheck, Build, Audit, Reproduzierbarkeit grün.

### NEXT-79 · P1 Usability-Audit und Bedienkonzept – TEILWEISE UMGESETZT, GESAMTAUFGABE OFFEN
- [x] **79a:** Quellcode-Audit und Browser-Baseline für Sandbox/Turnier, Tastatur und 375/768/1280px; CI #40152929889 (383 Unit, 100 E2E) grün.
- [x] **79b:** Kampfsteuerung von Werkzeugen getrennt, Start optisch hervorgehoben, Status bereit/läuft/pausiert; CI #40153090696 (383 Unit, 102 E2E) grün.
- [ ] **79c:** Turnierdialog in Einrichten/Spielen/Ergebnisse strukturieren; nur passende Aktionen hervorheben, Autosave/Import/Export erreichbar halten; Desktop/Mobil und Pause/Resume/Cancel absichern.
- [ ] **79d:** Seed, Tick, Strategien und Turnierformate verständlich erklären; Fehlertexte mit Handlungshinweisen, Kontrast/Fokus/Touchziele testen.
- [ ] **79e:** Abschließende responsive, Tastatur-, Screenreader- und Regressionstests, kein horizontaler Scroll; vor/nach Refactoring vollständige CI.
- [ ] NEXT-79 erst nach 79c–79e und vollständiger CI als gesamte Aufgabe abschließen.

**Priorisierung:** NEXT-79c vor NEXT-69; anschließend 79d/e. Rolling Backlog NEXT-69–77 bleibt erhalten. Keine Veröffentlichung oder Merge nach main.

Der Backlog zeigt die nächsten Entwicklungsschritte bewusst konkret und in Reihenfolge. Pro stündlichem Lauf werden bis zu drei unabhängige oder sicher sequenzierbare Schritte bearbeitet; unvollständige Schritte werden zuerst fortgesetzt. Nach jedem Lauf wird die Reihenfolge aktualisiert und der jeweils folgende Block weiter detailliert.

## Aktueller Zustand · 24.10.2026, 22:00 MESZ

**Neue Runde vollständig getestet:** NEXT-64 (reproduzierbare Abhängigkeiten) und NEXT-66 (Matchdetails), Development Tests #40128110261 auf e23323ef: 29 Testdateien, 358 Unit-/Behavior-/Regressionstests, 82 Desktop-/Mobil-E2E, TypeScript/Build, zweimaliger sauberer npm-ci-Install und byteidentischer Dist-SHA256 (1488f94b…), npm audit 0 bekannte Advisories; vollständig erfolgreich. **Kumulativ 10 getestete NEXT-Aufgaben seit v0.1.54; 63/64/66 sicher nicht veröffentlicht.** Nächstes Ziel NEXT-67.
**Letzte unabhängig bestätigte Live-Veröffentlichung:** v0.1.54, Publish #40111747415. **main inzwischen v0.1.55** (Commit 809fe86c; Release-Bump nach Merge von PR #47 um 19:09 UTC). **Live-Veröffentlichung von v0.1.55 NICHT verifiziert; Veröffentlichungsstatus ungeklärt.** Dieser Lauf hat weder Merge noch Publish ausgelöst.
**Aktuelle sichere Entwicklung:** Branch `automation/next-56-tournament-runner-unpublished`, **Draft-PR #48**, kein Merge. Development Tests **#40128110261** auf Commit e23323ef: **358 Unit-/Behavior-/Regressionstests, 82 Desktop-/Mobile-E2E**, Typecheck, Build und npm audit (0 Advisories) erfolgreich.
**Insgesamt zehn seit v0.1.54 implementierte und verifizierte Aufgaben:** NEXT-56, 57, 58, 59, 60, 61, 62, 63, 64, 66.
**Davon sicher noch nicht in main:** **NEXT-63, NEXT-64 und NEXT-66** (nur Draft-PR #48). **NEXT-56 bis NEXT-62:** inzwischen in main integriert; **Veröffentlichungsstatus ungeklärt** bis zur unabhängigen Prüfung der tatsächlich ausgelieferten Homepage. Sie dürfen weder pauschal als unveröffentlicht noch als live behauptet werden.
**Nächster offener Schritt:** NEXT-67 (isoliertes Turnierkampf-Replay). NEXT-65 war in NEXT-59 bereits enthalten und wird nicht doppelt gezählt; Rolling Backlog NEXT-67 bis NEXT-74 ist detailliert.
**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell** (für den aktuellen Draft-PR #48).

---

## Defensive-Korrektur · v0.1.53
- [x] Frühes Abstandhalten statt Warten bis 35 % Struktur
- [x] Verfolgungsstopp standardmäßig bei 70 %; Gegenfeuer innerhalb eigener Reichweite
- [x] Deterministische Engine-/Balance- und Desktop-/Mobile-Regressionen ergänzt
- [x] PR-/main-CI grün: 225 Unit-/Verhaltenstests und 46 Desktop-/Mobile-E2E; PR #45 integriert
- [x] 0.1.53 veröffentlicht, Infoseiten, Versionsarchiv und Build-Commit durch Online-Smoke verifiziert

## Konkrete nächste Läufe

### Erledigt in v0.1.6 · Ereignismodell-Grundtypen
- [x] Event-Typen für Bewegung, Schuss, Treffer und Schaden definiert
- [x] Event-Datenmodell vom Simulationszustand getrennt
- [x] Unit-Tests für Event-Erzeugung ergänzt
- [x] Testsuite-Doku um Event-Testfälle ergänzt

### Erledigt in v0.1.7 · Bewegungsereignisse
- [x] Bewegung als explizites Event erzeugt
- [x] Position vor/nach Bewegung im Event nachvollziehbar
- [x] Verhaltenstest: Bewegungsdistanz überschreitet Geschwindigkeitslimit nicht
- [x] Regressionstest: Event-Erzeugung mutiert Input-State nicht

### Erledigt in v0.1.8 · Schussereignisse
- [x] Schuss als Event mit Angreifer, Ziel und Tick
- [x] Bedingungen Reichweite, Energie und Cooldown explizit geprüft
- [x] Test: kein Schuss außerhalb Reichweite
- [x] Test: kein Schuss ohne ausreichende Energie
- [x] Test: kein Schuss während aktivem Cooldown

### Erledigt in v0.1.9 · Treffer- und Schadensereignisse
- [x] Treffer vom Schuss getrennt
- [x] Schaden als separates Event
- [x] Test: Schaden nie negativ
- [x] Test: Struktur nie unter 0
- [x] feste Seed-Regression für Schadensjitter

### Erledigt in v0.1.10 · Sieg- und Kampfende
- [x] Sieg als explizites Victory-Event
- [x] Kampf stoppt unmittelbar nach Zerstörung
- [x] Test: besiegter Roboter führt keine Aktion mehr aus
- [x] Test: fertiger Match-State bleibt inklusive Event-Stream stabil

### Erledigt in v0.1.11 · Zeitlimit und Unentschieden
- [x] explizites Match-Ende bei Tick-Limit
- [x] Unentschieden als outcome=draw mit endReason=timeout
- [x] Test für Sieg im exakt letzten zulässigen Tick
- [x] feste Seed-Regression für Timeout-Fälle

### Erledigt in v0.1.12 · Energieverhalten härten
- [x] Regeneration und Verbrauch durch Tests dokumentiert
- [x] Grenzfälle am Energiemaximum getestet
- [x] langer deterministischer Energietest vorhanden
- [x] Charakterisierungstests vor Engine-Refactoring ergänzt

### Erledigt in v0.1.13 · Bewegungs- und Arena-Grenzen
- [x] Arena-Grenzen erzwungen
- [x] Tests für x/y-Min/Max
- [x] Verhalten an identischen Positionen abgesichert
- [x] hohe Geschwindigkeiten bleiben innerhalb der Arena

### Erledigt in v0.1.14 · Regression-Seeds
- [x] feste Seed-Sammlung 1, 12 und 4711 definiert
- [x] bekannte Gewinner, Endticks und Reststruktur dokumentiert
- [x] Regressionstest gegen unbeabsichtigte Verhaltensänderungen ergänzt
- [x] Seeds im Testcode sichtbar festgehalten

### Erledigt in v0.1.15 · Test-Review vor Engine-Refactoring
- [x] Abdeckung der Kernregeln geprüft
- [x] Charakterisierung für exakte Reichweitengrenze und Cooldown=1 ergänzt
- [x] wiederholte Aktionsbedingungen in updateRobot als Refactoring-Kandidat identifiziert
- [x] gezieltes Refactoring erst nach Charakterisierung eingeplant

### Erledigt in v0.1.16 · Reichweite und Cooldown charakterisieren
- [x] Verhalten exakt an der Reichweitengrenze getestet
- [x] Cooldown-Abbau über mehrere Ticks charakterisiert
- [x] Regressionstest für ersten erlaubten Schuss nach Cooldown
- [x] Testsuite-Doku um Reichweiten-/Cooldown-Fälle ergänzt

### Erledigt in v0.1.17 · Event-Reihenfolge charakterisieren
- [x] Reihenfolge mehrerer Events innerhalb eines Ticks festgelegt
- [x] Shot/Hit/Damage-Reihenfolge pro handelndem Roboter abgesichert
- [x] Verhalten bei zwei handelnden Robotern charakterisiert
- [x] Testsuite-Doku um Event-Reihenfolge ergänzt

### Erledigt in v0.1.18 · Event-Stream deterministisch absichern
- [x] gleichen Seed gegen identischen Event-Stream testen
- [x] Event-Anzahl und Reihenfolge für feste Seeds charakterisieren
- [x] Regressionstest gegen unbemerkte Event-Änderungen
- [x] Testsuite-Doku um Event-Stream-Testfälle ergänzen

### Erledigt in v0.1.19 · Engine-Refactoring vorbereiten
- [x] charakterisierte Aktionslogik geprüft
- [x] kleinsten sicheren Refactoring-Schnitt festgelegt: Schussfreigabe in canFire zentralisiert
- [x] Verhalten vor Umbau vollständig durch bestehende Charakterisierungs- und Regressionstests abgesichert
- [x] keine sichtbare Verhaltensänderung

### Erledigt in v0.1.20 · Aktionslogik weiter entkoppeln
- [x] Energie-Regeneration, Cooldown-Abbau und Bewegung in prepareAction gekapselt
- [x] Verhalten durch bestehende Regressionstests abgesichert
- [x] nur interne Struktur geändert
- [x] keine sichtbare Verhaltensänderung

### Erledigt in v0.1.21 · Schussausführung kapseln
- [x] Schuss-/Treffer-/Schadensausführung aus updateRobot in fire() herausgelöst
- [x] Energie- und Cooldown-Änderungen unverändert gehalten
- [x] Event-Reihenfolge durch bestehende Regressionstests unverändert gehalten
- [x] keine sichtbare Verhaltensänderung

### Erledigt in v0.1.22 · Roboter- und Komponentensystem beginnen
- [x] Chassis und Waffen als erste kombinierbare Komponenten eingeführt
- [x] bestehende Raptor-/Titan-Presets ohne Verhaltensänderung auf Komponenten migriert
- [x] Konfigurationsvalidierung und Regressionstests ergänzt
- [x] Kombination unterschiedlicher Chassis/Waffen durch Test abgesichert

### Erledigt in v0.1.23 · Komponentenwahl sichtbar machen
- [x] Chassis- und Waffenwahl für Roboter A in der Oberfläche anbieten
- [x] berechnete Roboterwerte live anzeigen
- [x] Reset/Matchstart mit gewählter Konfiguration verbinden
- [x] Desktop- und Mobile-Bedienung absichern

### Erledigt in v0.1.24 · Komponentenwahl für Roboter B
- [x] Chassis- und Waffenwahl für Roboter B in der Oberfläche anbieten
- [x] berechnete Werte von Roboter B live anzeigen
- [x] Reset/Matchstart mit beiden gewählten Konfigurationen verbinden
- [x] Desktop- und Mobile-Bedienung für beide Konfigurationen absichern

### Erledigt in v0.1.25 · Komponentenvalidierung und Builder-Grenzen
- [x] ungültige Roboterkonfigurationen an der Builder-Grenze ablehnen
- [x] Validierungszustand für beide Roboter anzeigen
- [x] Matchstart bei ungültiger Konfiguration verhindern
- [x] Desktop- und Mobile-Verhalten für Validierungszustände absichern

### Erledigt in v0.1.26 · Motoren als Komponente
- [x] Motoren als eigene Komponente modelliert
- [x] Motorwahl für beide Roboter im Builder angeboten
- [x] berechnete Geschwindigkeitswerte live aktualisiert
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.27 · Panzerung als Komponente
- [x] Panzerung als eigene Komponente modelliert
- [x] Panzerungswahl für beide Roboter im Builder angeboten
- [x] berechnete Strukturwerte live aktualisiert
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.28 · Energieversorgung als Komponente
- [x] Energieversorgung als eigene Komponente modelliert
- [x] Energieauswahl für beide Roboter im Builder angeboten
- [x] berechnete Energiewerte live aktualisiert
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.30 · Sensorik als Komponente
- [x] Sensorik als eigene Komponente modelliert
- [x] Sensorwahl für beide Roboter im Builder angeboten
- [x] berechnete Sensorwerte live aktualisiert
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.31 · Gewichtslimits und gültige Komponentenkombinationen
- [x] Komponenten um Gewichtswerte ergänzt
- [x] zulässiges Gesamtgewicht je Chassis definiert
- [x] ungültige Kombinationen im Builder angezeigt und Matchstart gesperrt
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.34 · Roboter optisch unterscheidbarer machen
- [x] Roboter in der Arena visuell klar unterscheiden
- [x] Chassis-Auswahl in der Darstellung erkennbar machen
- [x] bestehende Kampflogik unverändert lassen
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.35 · Start/Reset reparieren und Tests massiv ausbauen
- [x] Start führt sofort einen sichtbaren Tick aus und startet anschließend den Lauf
- [x] Reset stoppt den Lauf und stellt Match, Seed und Standardkonfigurationen zuverlässig wieder her
- [x] Start/Pause/Einzelschritt/Reset und deterministischer Reset auf Desktop und Mobile absichern
- [x] Validierungs-Grenzfälle systematisch erweitern
- [x] Testsuite von 59 auf mindestens 93 Testausführungen erweitern

### Erledigt in v0.1.36 · Waffen am Roboter sichtbar machen
- [x] gewählte Waffe visuell am Roboter darstellen
- [x] Raptor- und Titan-Waffe unterscheidbar machen
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.37 · Projektil- und Schusseffekte
- [x] Shot-Events als sichtbare Schusslinien darstellen
- [x] Effekt zeitlich mit der Simulation koppeln
- [x] deterministisches Kampfverhalten unverändert lassen
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.38 · Treffer- und Schadenseffekte
- [x] Hit-/Damage-Events sichtbar machen
- [x] Trefferfeedback am Zielroboter darstellen
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.39 · Konfiguration in eigenen Dialog auslagern
- [x] Roboter-Konfiguration aus der Kampfanzeige herauslösen
- [x] eigenen Config-Dialog für beide Roboter anlegen
- [x] während des Kampfes nur kampfrelevante Live-Werte anzeigen
- [x] Desktop- und Mobile-Bedienung absichern

### Erledigt in v0.1.40 · Lebensbalken direkt über den Robotern
- [x] Lebens-/Strukturbalken über jedem Roboter anzeigen
- [x] Balken synchron zum tatsächlichen Strukturwert aktualisieren
- [x] bei Schaden sofort sichtbar reagieren
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.44 · Sichtbar flüssige Fahrbewegung
- [x] vorhandene Bewegungspositionen zwischen den Simulationsticks sichtbar animieren
- [x] Fahrbewegung ohne Änderung der deterministischen Engine darstellen
- [x] unterschiedliche Motorgeschwindigkeiten visuell nachvollziehbar machen
- [x] Desktop- und Mobile-Darstellung absichern

---

## Geplanter nächster Zyklus

### Erledigt in v0.1.47 · NEXT-34 · Strategietyp als Engine-Datenmodell
- [x] Strategietypen `aggressive`, `defensive`, `distance` und `melee` definiert
- [x] Strategie explizit je Roboterkonfiguration gespeichert
- [x] bestehendes Kampfverhalten als Default unverändert gehalten
- [x] Unit-/Regressionstests für Default und Serialisierbarkeit ergänzt

### Erledigt in v0.1.49 · NEXT-35 · Aggressive Strategie
- [x] aggressive Zielannäherung als erste echte Strategie implementieren
- [x] Schussentscheidung mit bestehender Reichweiten-/Energielogik verbinden
- [x] deterministische Verhaltenstests mit festen Seeds ergänzen
- [x] Desktop/Mobile-Auswahl vorbereiten, ohne weitere Strategien vorwegzunehmen

### Erledigt in v0.1.50 · NEXT-36 · Distanzstrategie
- [x] gewünschte Kampfdistanz modellieren
- [x] Roboter bei zu großer Distanz annähern und bei zu kleiner Distanz Abstand gewinnen lassen
- [x] Arena-Grenzen und deterministische Bewegung absichern
- [x] Verhaltenstests für beide Distanzrichtungen ergänzen

### Erledigt in v0.1.50 · NEXT-37 · Defensive Strategie
- [x] defensive Entscheidungsregel auf Basis von Struktur und Distanz einführen
- [x] Rückzugsbewegung innerhalb der Arena absichern
- [x] Schießen während defensiver Bewegung eindeutig festlegen
- [x] feste Seed-Regressionen ergänzen

### Erledigt in v0.1.50 · NEXT-38 · Nahkampfstrategie
- [x] konsequentes Schließen der Distanz implementieren
- [x] Nahkampfverhalten mit Waffenreichweite koppeln
- [x] Stillstand/identische Positionen robust behandeln
- [x] deterministische Verhaltenstests ergänzen

### Erledigt in v0.1.52 · NEXT-39 · Strategieauswahl im Config-Dialog
- [x] Strategie für Roboter A und B auswählbar machen
- [x] Auswahl beim Start und Reset korrekt übernehmen
- [x] aktuelle Strategie in der Konfiguration sichtbar machen
- [x] Desktop- und Mobile-E2E ergänzen

### NEXT-40 · Energieverwaltungsparameter · ABGESCHLOSSEN / NICHT VERÖFFENTLICHT
- [x] Optionale Energiereserve 0–100 % der maximalen Energie, Default 0 %, mit Builder-Validierung modelliert
- [x] Schuss nur zulassen, wenn nach Energieverbrauch die Reserve erhalten bleibt; Regeneration erfolgt vor der Prüfung
- [x] Eingabe und Vorschau für A/B im Config-Dialog als Quellcode ergänzt, Reset auf 0 %
- [x] Unit-, Behavior-, Seed- und Desktop-/Mobile-Testfälle als Quellcode ergänzt
- [x] Development Tests #40085113036 auf Commit 193f42d0: 246 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build erfolgreich
- [x] Default 0 % und feste Seeds gegen Regressionen geprüft; Veröffentlichung bleibt ausschließlich manuell und steht aus

### Erledigt in v0.1.52 · NEXT-41 · Strategieparameter im Config-Dialog
- [x] relevante Strategieparameter abhängig vom Strategietyp anzeigen
- [x] Werte validieren und ungültigen Matchstart verhindern
- [x] Reset auf stabile Defaults absichern
- [x] Desktop- und Mobile-E2E ergänzen

### Erledigt in v0.1.52 · NEXT-42 · Strategievergleich in der Kampfanzeige
- [x] gewählte Strategien während des Kampfes kompakt sichtbar machen
- [x] keine Builder-Details zurück in die Kampfanzeige verschieben
- [x] Layout für kleine Displays absichern
- [x] bestehende Kampfanzeige regressionssicher halten

### Erledigt in v0.1.52 · NEXT-43 · Strategie-Testreview und Refactoring
- [x] Strategie-Verhaltensmatrix auf Lücken prüfen
- [x] feste Seed-Vergleiche aller Strategiepaarungen ergänzen
- [x] wiederholte Entscheidungslogik nur nach Charakterisierung refactoren
- [x] nächsten Planungszyklus aus F · Replay & Analyse konkretisieren

## Folgezyklus · F · Replay & Analyse

NEXT-40 und NEXT-44 sind getestet, aber nicht veröffentlicht. NEXT-45 ist der nächste offene Schritt; weitere Schritte sind geplant.

### NEXT-44 · Event Recorder · ABGESCHLOSSEN / NICHT VERÖFFENTLICHT
- [x] Seed, Startkonfigurationen, Initial-/Endzustand und Tick-Events in einem unveränderlichen Snapshot aufzeichnen.
- [x] Append-only-Recorder mit fortlaufenden Tick-IDs, Ereignisreihenfolge und Ende-Sperre ergänzen.
- [x] Tests für 0/1/3600 Ticks, Sofortsieg und Seed-Determinismus implementieren.
- [x] Development Tests #40088595774 auf SHA 7df3cacc: 252 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build erfolgreich.
- [x] Recorder-Tests und unveränderte Default-Kämpfe verifiziert; NEXT-44 als abgeschlossen und unveröffentlicht gezählt.

### NEXT-45 · Replay-Dateiformat und Validierung · ABGESCHLOSSEN / NICHT VERÖFFENTLICHT
- [x] JSON-Schema-Version 1 mit Seed, Arena, RobotDefinition-Snapshots, Tick-Events und Endzustand ergänzen.
- [x] Validierung von Schema-Version, Robot-IDs, Tick-Folge, Event-Referenzen, Arena und nicht endlichen Werten implementieren.
- [x] Unit-/Behavior-/Regressionstests für JSON-Roundtrip, 0-Tick, Sofortsieg und ungültige Daten ergänzen.
- [x] Development Tests #40088913689 auf SHA 9d6f719c: 258 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build erfolgreich.
- [x] Replay-Format als abgeschlossen und unveröffentlicht gezählt; NEXT-46 folgt frühestens im nächsten Stundenlauf.

### NEXT-46 · Replay exportieren und importieren · ABGESCHLOSSEN / NICHT VERÖFFENTLICHT
- [x] Live-Recorder um unveränderliche, wiederholbare Snapshots ohne Abschluss erweitern.
- [x] Deterministische JSON-Dateinamen, Browser-Download, 2-MB-Grenze und Schema-/ID-/Tick-Validierung beim Import.
- [x] Separaten zugänglichen Replay-Dialog mit Import-/Export-Knöpfen, Dateiauswahl und verständlicher Rückmeldung ergänzen.
- [x] Ungültiger Import und gültige Dateivorschau verändern den laufenden Kampf nicht; Wiedergabe erst NEXT-47.
- [x] Unit-/Behavior-/Regressionstests und Desktop-/Mobile-E2E als Quellcode ergänzt.
- [x] Development Tests #40092321506 auf Commit 556a2858: Typecheck, Build, **262 Unit-/Verhaltenstests und 50 Desktop-/Mobile-E2E erfolgreich**; NEXT-46 implementiert und getestet, unveröffentlicht.

### NEXT-47 · Replay-Player (implementiert und getestet, unveröffentlicht)
- [x] Ereignisbasierte Player-Zustandsmaschine mit Play/Pause/Einzelschritt/Ende aus validierten Frames; keine RNG-/Simulationsaufrufe.
- [x] Importierte Aufzeichnung und aktuellen Kampf im eigenen Replay-Dialog mit Tick- und Ereignisanzeige abspielen; Live-Kampf bleibt unverändert.
- [x] GitHub Development Tests #40096436278 (SHA 1b7413a): 268 Unit-/Behavior-/Regressionstests und 52 Desktop-/Mobile-E2E, Typecheck/Build grün; 0-Tick, Sofortsieg, 3600 Ticks, Pause/Ende, erneutes Öffnen und importierte JSON-Datei geprüft.
- [x] NEXT-47 als abgeschlossen und kumulativ unveröffentlicht gezählt; NEXT-48 übernimmt Zustandsrekonstruktion und grafische Zeitleiste.

### NEXT-48 · Replay-Zeitleiste · ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Seek auf Tick 0, Mitte, Ende und rückwärts; deterministische Zustandsrekonstruktion ohne neue Simulation.
- [x] Struktur, Energie, Position und Kampfeffekte nach Seek konsistent; Mobile-Touch und Tastatur geprüft.
- [x] Referenzzustände und Eventreihenfolge mit festen Seeds getestet; Development Tests #40100789839: 274 Unit-/Behavior-Tests, 56 Desktop-/Mobile-E2E, Typecheck/Build grün.

### NEXT-49 · Kampfstatistiken · ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Schüsse, Treffer, effektiven Schaden und Energieverbrauch aus aufgezeichneten Events berechnen.
- [x] Doppelte Events, Überkill, Sofortsieg, 0 Ticks und Timeout gesondert getestet.
- [x] A/B-Vergleich mit zugänglichen Labels und responsiver Ansicht; Development Tests #40100953952: 281 Unit-/Behavior-Tests, 58 Desktop-/Mobile-E2E, Typecheck/Build grün.

### NEXT-50 · Replay-Roundtrip und Testreview · ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Alle 16 Strategiepaarungen × Seeds 1/12/4711: Aufnahme→Export→Import→Player mit Zustands-/Event-Digests verglichen (48 Fälle).
- [x] Maximalgröße, beschädigte JSON-Daten, fehlende Frames und Desktop-/Mobile-E2E abgesichert.
- [x] Referenz-Snapshots, stabile Hash-Vergleiche und Performance der 48-Fälle-Suite im vollständigen CI-Lauf geprüft; Development Tests #40101113261: 284 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.

### NEXT-51 · Replay-Refactoring und Turnierplanung (erledigt, unveröffentlicht)
- [x] Gemeinsames `deepFreeze` in `src/engine/immutable.ts` extrahiert; Recorder-Export für Kompatibilität beibehalten; Replay-Format und Zustandsrekonstruktion importieren direkt aus dem reinen Modul.
- [x] Charakterisierungstests für verschachtelte Event-/Zustands-Snapshots, referenztreue Rückgabe, Primitivwerte und bereits eingefrorene Werte ergänzt.
- [x] Vollständige Unit-/Behavior-/Regression-/Desktop-/Mobile-Tests erfolgreich: Development Tests #40105284320 (gemeinsamer Immutable-Helper), anschließend #40105438397 und #40105486356.
- [x] Turnier-NEXT-52 bis NEXT-59 mit Datenmodell, Seeds, Round-Robin, Auswertung, UI, K.-o., Persistenz und E2E-Abnahmen konkret geplant.

### NEXT-52 · Turnierdatenmodell und Validierung (erledigt, unveröffentlicht)
- [x] Reines Modul `src/engine/tournament-model.ts`: Teilnehmer mit stabiler eindeutiger ID und validierter RobotDefinition, Turnier-ID, `format` (round-robin/knockout), `baseSeed` und `maxTicks`.
- [x] 2–16 Teilnehmer erzwingen; doppelte IDs, ungültige Definitionen, Nicht-Finite-Werte, negative/unsichere Seeds und leere Namen mit verständlichen Fehlern ablehnen.
- [x] Eingaben niemals mutieren; serialisierbare, versionierte Turnierdefinition mit deterministischem JSON-Roundtrip.
- [x] Unit-/Behavior-Tests: Grenzen 1/2/16/17, Duplikate, Invalid-Inputs, Deep-Copy, Wiederholbarkeit.

### NEXT-53 · Deterministischer Round-Robin-Spielplan (erledigt, unveröffentlicht)
- [x] Paarungen für 2–16 Teilnehmer genau einmal pro ungeordnetem Paar erzeugen: `n*(n-1)/2`; keine Selbstpaarungen.
- [x] Paarungsreihenfolge und Seeds allein aus Turnierdefinition und Matchindex ableiten, ohne globalen RNG; unabhängig von UI-/Ausführungsreihenfolge.
- [x] Gerade/ungerade Teilnehmerzahl, 2/3/4/16 Teilnehmer und Seed-Grenzen testen; Snapshot-Digests für feste Referenzturniere.

### NEXT-54 · Turnierauswertung und Rangfolge (abgeschlossen und getestet)
- [x] Ergebnisse als unveränderliche Datensätze (Teilnehmer-IDs, Seed, Gewinner/Unentschieden, Ticks, Reststruktur) erfassen; doppelte Match-IDs ablehnen.
- [x] Tabelle aus Ergebnissen berechnen: Spiele, Siege, Unentschieden, Niederlagen, Punkte 3/1/0, Struktur-Differenz.
- [x] Gleichstand deterministisch nach Punkten, Struktur-Differenz und stabiler Teilnehmer-ID auflösen; unvollständige Turniere anzeigen.
- [x] Unit-/Behavior-Tests: 0 Matches, Draw, Sieg, Überzählung, Duplikate, stabile Sortierung, keine Eingabemutation.

- Qualitätsnachweis: Development Tests #40109944097 (303 Unit/Behavior, 60 Desktop/Mobile, Typecheck/Build erfolgreich); unveröffentlicht.

### NEXT-55 · Responsives Turnier-UI-Grundgerüst
- [x] Eigenständiger Dialog mit Teilnehmern, Paarungen, Fortschritt und Tabelle; Sandbox-Kampfzustand strikt unverändert.
- [x] Tastaturbedienung, Fokusmanagement, klare Fehlerzustände und responsive Darstellung auf 375px und Desktop.
- [x] Playwright-E2E: Öffnen/Schließen, gültige/ungültige Eingaben, Scrollen, Touch und unveränderte Sandbox.

- **Verifiziert:** Development Tests #40110813524 auf SHA 9f17bc65: 303 Unit-/Behavior-Tests, 64 Desktop-/Mobile-E2E, Typecheck/Build erfolgreich; Sandbox-Isolation, 375px, Escape/Fokus und ungültige Eingaben geprüft.

### NEXT-56 · Deterministische Turnierausführung (implementiert und vollständig getestet, unveröffentlicht)
- [x] Runner verarbeitet geplante Paarungen seriell mit `runMatch`/Engine ohne UI-Kopplung; Pause/Fortsetzen/Abbrechen an Matchgrenzen.
- [x] Kein versteckter RNG; identische Definitionen liefern identische Ergebnisse und Reihenfolge, auch nach Pause.
- [x] Unit-/Behavior-/Performance-Tests für 2/4/16 Teilnehmer, feste Seeds, Timeout und Abbruch ohne Teilzustandsverlust (CI #40113922862 grün: 314 Unit/Behavior, 64 Desktop/Mobile).

### NEXT-57 · K.-o.-Bracket (vollständig getestet, unveröffentlicht)
- [x] Single-Elimination für 2–16 Teilnehmer, deterministische Freilose für die zuerst gesetzten Teilnehmer und keine doppelte Teilnahme pro Runde.
- [x] Unentschieden über Reststrukturanteil und danach stabile Setzreihenfolge auflösen, ohne RNG-Zusatz.
- [x] Engine-Regressionen 2/3/5/8/16 Teilnehmer, stabile Seeds/Champion/Matchzahl. CI #40119157124: grün. Browser-K.-o.-UI ist getrennte Folgeaufgabe.

### NEXT-58 · Turnier-Import/-Export und Wiederaufnahme (vollständig getestet, unveröffentlicht)
- [x] Versioniertes JSON mit Schema-/Größen-/Status-/Matchreihenfolgeprüfung und immutable Ergebnissen.
- [x] Browser-Import/Export, Resume an Matchgrenzen, keine doppelten Kämpfe; ungültiger Import erhält den laufenden Turnierstand.
- [x] Tests: pausierter und abgeschlossener Roundtrip, fehlerhafte Zustände/Progress/IDs, Sonder-IDs, Desktop-/Mobile-Dateiimport; CI #40119157124: grün.

### NEXT-59 · Turnier-E2E, Statistik und Refactoring (vollständig getestet, unveröffentlicht)
- [x] Engine-Integration für 16 Teilnehmer/120 Round-Robin-Matches; Import-/Resume-Ergebnisse stimmen mit direktem Lauf überein.
- [x] Browser-E2E für Round Robin mit Pause/Resume, JSON-Download/-Upload und Tabellenstand; Desktop und Mobile.
- [x] K.-o.-Turnier in der Browseroberfläche integrieren und Desktop-/Mobile-E2E mit Tastatur, Gewinneranzeige und Freilosen ergänzen; ungültige Konfiguration und Touch-Details bleiben in der Abnahme.
- [x] 16-Teilnehmer-SHA256-Referenz-Digests für Tabelle und Bracket mit festen Seeds festgeschrieben; 30-Sekunden-Engine-Laufzeitlimit in CI geprüft. Speicherlimit wird durch die feste Teilnehmergrenze (max. 16) und vollständige Testmatrix begrenzt, nicht durch eine separat gemessene Heap-Obergrenze.
- [x] SHA256-Charakterisierung vor K.-o.-Seed-Refactoring, danach vollständige Unit-/Behavior-/Regression-/E2E-Matrix erneut erfolgreich ausgeführt (CI #40123058094).

### NEXT-60 · Turnier-Fairness und Seed-Audit (vollständig getestet; Live-Status ungeklärt)
- [x] Reines Audit zählt A/B-Auftritte, Spielplan-IDs, Seeds und Teilnehmer ohne Simulations-RNG; sichere Sonder-IDs.
- [x] Optionales `sideAssignment: 'balanced'` verteilt A/B-Starts bei 2/3/4/5/16 Teilnehmern mit maximal 1 Unterschied; klassischer Default unverändert.
- [x] Echte Runner-, Tabellen- und Archiv-Integration mit identischen Match-IDs/Seeds, Pause/Resume/Import/Export und Browser-Selektor; Desktop/Mobile verifiziert.
- [x] Paarweise Side-Swap-Simulation mit quantifizierter 25-%-Biasgrenze, 16-Teilnehmer-SHA256-Referenz-Digests für Balanced und Legacy.
- [x] CI #40123664899 grün; main enthält den Code seit PR #47, tatsächliche Homepage-Veröffentlichung ungeklärt.

### NEXT-61 · Exportierbare Turniertabelle (implementiert, getestet)
- [x] Validierte Ergebnis- und Tabellen-Snapshots als versioniertes JSON und CSV ausgeben, ohne laufende Sandbox zu verändern.
- [x] Feste Spaltenreihenfolge, Unicode, dezimalpunktbasierte numerische Werte, CSV-Quoting, Formel-Injection-Schutz und unvollständige Turniere implementieren.
- [x] Unit-/Behavior-Tests für Sonderzeichen, 0 Ergebnisse und 16 Teilnehmer; Desktop-/Mobile-Download erfolgreich.

### NEXT-62 · Turnier-Leistung und Abbruchgrenzen (vollständig getestet; Live-Status ungeklärt)
- [x] Reproduzierbarer Benchmark: 16 Teilnehmer, 120 Paarungen, Seed 4711, 100 Ticks, Wall/CPU/Heap-Messung; CI #40124222697: 191,5 ms Wall, 233,9 ms CPU, 1,70 MiB Heap-Wachstum (Referenzmessung, keine Endgerätegarantie).
- [x] CI-Regressionsgrenzen: <30 s Wall, <30 s CPU, <128 MiB Heap-Wachstum; deterministische Ergebniskontrolle.
- [x] Pause bei 60/120, Archiv-Roundtrip, Resume ohne Duplikate und Cancel ohne zusätzliche Matches unter Last getestet.
- [x] Browser-Automatik spielt maximal ein Match pro Event-Loop-Aufgabe und gibt UI zwischen Matches frei; Fortschritt, Pause/Resume/Cancel und Sandbox-Isolation auf Desktop/Mobile getestet.
- [x] CI #40123885631/#40124222697 grün; main enthält den Code, tatsächliche Homepage-Veröffentlichung ungeklärt.

### NEXT-63 · Turnier-Zugänglichkeit und Robustheit (NEU vollständig getestet, NICHT veröffentlicht)
- [x] Dialogbeschreibung, Screenreader-Live-Fortschritt, fokussierbare Spielplan-/Tabellen-Scrollbereiche und sichtbare Tastaturfokus-Ringe ergänzt.
- [x] 44px Touch-Ziele, lesbarer Dialogkontrast (WCAG ≥4,5:1 im Browser-Test), 375px-Layout und Desktop-/Mobile-Bedienung geprüft.
- [x] Doppelklick auf `Nächster Kampf` führt nur einen Kampf aus; erneutes Erstellen identischer aktiver Pläne setzt den Fortschritt nicht zurück.
- [x] Ungültige neue Konfiguration verwirft kein laufendes Turnier; Dialog schließen stoppt Automatik; Sandbox bleibt unverändert.
- [x] Vollständige CI #40124222697 auf 01771371: 354 Unit-/Behavior-/Regressionstests, 80 Desktop-/Mobile-E2E, Typecheck/Build/Audit grün; ausschließlich Draft-PR #48.

### NEXT-64 · Reproduzierbare und sichere Entwicklungsabhängigkeiten (NEU abgeschlossen, NICHT veröffentlicht)
- [x] Lockfile v3 aus realem CI-Install erstellt; `npm ci` statt `npm install` und Cache-Key auf Lockfile-Hash; Update-Strategie: bewusster Lockfile-Update-PR mit Audit, Unit/E2E und zwei Builds.
- [x] Sicherheitsgate lehnt jede bekannte Advisory ab (npm audit, 0 Befunde im CI); keine automatische Veröffentlichung.
- [x] Zweimal `npm ci` und zweimal Build auf identischem SHA; Dist-SHA256 byteidentisch (1488f94b…); CI #40128110261 erfolgreich.

### NEXT-65 · K.-o.-Turnier im Browser (bereits in NEXT-59 erledigt – DUPLIKAT, nicht erneut zählen)
- [x] K.-o.-Format, Bracket, Freilose und Champion responsiv dargestellt.
- [x] Isolierte Engine ohne Sandbox-Veränderung; Desktop-/Mobile-Behavior-E2E 3/5/16 Teilnehmer.
- [x] Mit NEXT-59 getestet; kein neuer separater Entwicklungsabschluss.

### NEXT-66 · Detailansicht einzelner Turnierkämpfe (NEU abgeschlossen, NICHT veröffentlicht)
- [x] Paarungsdetails aus validiertem, immutable Runner-Snapshot nach jedem Match anzeigen: Seed, Ticks, Gewinner/Remis, Reststruktur A/B.
- [x] Ausstehende Paarungen mit `Ausstehend` ohne erfundene Ticks/Sieger/Reststruktur; Unicode- und HTML-artige Namen nur via `textContent`.
- [x] 2/16 Teilnehmer, Timeout/Remis, ungültige Seeds, deterministische Wiederholung, Archiv-Roundtrip und Desktop/Mobil im CI #40128110261 verifiziert.

### NEXT-67 · Turnierkampf-Replay aus reproduzierbaren Seeds · ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Reproduzierbaren Replay-Snapshot für abgeschlossenen Kampf isoliert aus Original-Seed und Turnierdefinition erzeugen, ohne Sandbox oder aktives Turnier zu verändern.
- [x] Archiviertes Ergebnis exakt auf Sieger, Tick und beide Reststrukturen prüfen (kollisionsfreier Feldvergleich statt verlustbehaftetem Digest); manipulierte Ergebnisse und offene Kämpfe explizit ablehnen.
- [x] Zugängliche Replay-Schaltfläche je abgeschlossener Paarung, vorhandener Replay-Player, 1/3600-Tick-Grenzen, 0-Tick-Validierungsfehler, 2/3/16 Teilnehmer, Desktop-/Mobile-E2E und Tastatur prüfen. CI #40132151611 grün: 365 Unit/Behavior/Regression und 86 E2E.

### NEXT-68 · Sicheres automatisches Turnier-Zwischenspeichern · NEU ABGESCHLOSSEN, NICHT VERÖFFENTLICHT
- [x] Opt-in-LocalStorage-Snapshot nur an Match-/Statusgrenzen mit Archivschema 1, 2-MB-Grenze und vollständiger Validierung; keine Hintergrund-Übertragung.
- [x] Korrupte/zu große Daten, falsche Versionen und Quota-Fehler abweisen, gültiges aktives Turnier unangetastet lassen; deaktivierte Einwilligung löscht lokal gespeicherte Daten.
- [x] Wiederaufnahme nach Reload nur auf Benutzeraktion, Pause/Cancel-Semantik, 2/3/16 Teilnehmer und 120 Matches, Desktop-/Mobile-Tests absichern. CI #40137115159: 372 Unit-/Behavior-/Regressionstests und 92 Desktop-/Mobile-E2E erfolgreich.
- [x] Dateiimport und lokale Wiederherstellung nutzen denselben validierten Importpfad; Storage-Modul ist isoliert und unit-getestet.

### NEXT-69 · Eigene Roboterkonfigurationen im Turnier
- [ ] Validierte aktuelle A/B-Konfigurationen als optionale Teilnehmer-Presets übernehmen, ohne Live-Sandboxzustand zu mutieren.
- [ ] Namens-/ID-Duplikate, Komponentenlimits und Strategiewerte für bis zu 16 Teilnehmer prüfen.
- [ ] Deterministische Paarungen, Export/Import und Browser-Behavior-Tests ergänzen.

### NEXT-70 · Turnierergebnis-Export je Match
- [ ] CSV/JSON mit Match-ID, A/B-IDs, Seed, Ticks, Gewinner und Reststruktur versioniert exportieren.
- [ ] Formel-Injection-/Unicode-/CSV-Quoting-Schutz und unvollständige Turniere testen.
- [ ] Browser-Downloads Desktop/Mobile sowie JSON-Roundtrip ohne Sandbox-Änderung prüfen.

### NEXT-71 · Turnier-Regression, Refactoring und Release-Readiness
- [ ] Seit NEXT-60 neu hinzugekommene Module auf Duplikate, Kopplungen und versteckte RNG-Verwendungen prüfen.
- [ ] Vor jedem Refactoring Charakterisierung, danach komplette Unit-/Behavior-/Desktop-/Mobile-Matrix und SHA256-Digests erneut ausführen.
- [ ] Versions-/Live-Status, Draft-PR, Deployment-Gates und manuelle Freigabe dokumentieren; **kein Publish**.

### NEXT-72 · Best-of-N Turnierserie (geplant, noch nicht implementiert)
- [ ] Ungerade Serienlängen 1/3/5 als validiertes Modell definieren; feste Seedfolge und stabile Seitenzuordnung.
- [ ] Abbruch sobald eine Seite uneinholbar führt, Remis-/Tie-Break-Regel dokumentieren; keine versteckte RNG-Nutzung.
- [ ] Golden-Digests, 2/16 Teilnehmer, Archive und Desktop-/Mobile-Regressionen absichern.

### NEXT-73 · Match-Statistik im Turnier (geplant)
- [ ] Treffer, Schüsse, Schaden und Energieverbrauch je Match aus deterministischen Ereignissen ableiten.
- [ ] Statistik von bereits archivierten Matches als optional kennzeichnen; keine Werte erfinden.
- [ ] Unit/Behavior/Replay-Golden-Digests und responsives Layout prüfen.

### NEXT-74 · Turnierdaten-Validierung und Missbrauchsgrenzen (geplant)
- [ ] Importgröße, Duplikate, Prototyp-Namen, verschachtelte Objekte und nicht endliche Zahlen prüfen.
- [ ] Fehlerhafte Daten dürfen laufendes Turnier und Sandbox nicht verändern.
- [ ] Fuzz-/Property-Tests mit festen Seeds, Desktop/Mobil und vollständige Regressionen ergänzen.

### NEXT-75 · Turnier-Archivmigration und Abwärtskompatibilität (geplant)
- [ ] V1-Archive und LocalStorage-Snapshots bei zukünftiger Schemaänderung strikt versioniert behandeln; keine stille Datenkonvertierung.
- [ ] Validierte Migrationsmatrix und explizite Fehlertexte für inkompatible Versionen, beschädigte und zu große Sicherungen.
- [ ] Golden-Archive für Pause/Cancel/Complete, 2/16 Teilnehmer und Desktop-/Mobile-Import dauerhaft testen.

### NEXT-76 · Turnier-Suche und Ergebnisfilter (geplant)
- [ ] 120 Paarungen nach Teilnehmer, Ergebnisstatus und Match-ID ohne Mutation des Turnier-Snapshots filtern.
- [ ] Zugängliche Suche mit Debounce, Tastatur und 375px-Layout; HTML-/Unicode-Namen sicher anzeigen.
- [ ] Browser-E2E für Filter, Replay, Import und Zurücksetzen der Suche, auch bei unvollständigen Turnieren.

### NEXT-77 · Export- und Autosave-Fehlerbehandlung (geplant)
- [ ] Einheitliche Fehlermeldungen für lokale Speichersperre, Quota, ungültige Archive und Download-Fehler ohne Verlust des Turnierstands.
- [ ] Opt-in- und Löschzustände gegen Browser-Neustart und konkurrierende Tabs prüfen; Konflikte sichtbar machen statt Daten still zu überschreiben.
- [ ] Fehlerpfade mit Unit-/Behavior-/Desktop-/Mobile-Regressionen und vollständiger CI absichern.

## Planungszyklus

- Nach spätestens 10 konkreten NEXT-Schritten oder sobald weniger als 5 konkrete NEXT-Schritte übrig sind, wird ein Planungszyklus fällig.
- Der Planungszyklus erzeugt wieder mindestens 5 und höchstens 10 kleine, eindeutig abschließbare NEXT-Schritte aus dem nächsten priorisierten Entwicklungsblock.
- Er bereinigt dabei bereits erledigte/stale Backlog-Punkte und prüft Test-/Refactoring-Bedarf.
- Ein Planungszyklus ist kein Feature-Lauf und verändert kein Spielverhalten.
- Der jeweils letzte Schritt eines Zyklus plant den nächsten Block konkret vor, damit kein planmäßiger Lauf ohne eindeutigen NEXT-Schritt endet.

---

## Parallel laufender Testausbau

Bei **jedem** Feature-Schritt:
- [x] neue Regel mit Unit-/Verhaltenstest absichern
- [x] bei Bugfix einen Regressionstest ergänzen
- [x] Testsuite-HTML um reale Testfälle erweitern
- [x] feste Seeds verwenden, wenn Verhalten reproduzierbar sein muss
- [x] vor Refactoring fehlende Charakterisierungstests ergänzen
- [x] nach Refactoring komplette Testsuite erneut ausführen

---

## Danach: größere Entwicklungsblöcke

### C · Roboter- und Komponentensystem
Chassis, Motoren, Panzerung, Energie, Sensorik, Waffen, Gewichtslimits und Presets.

### D · Robot Builder
Komponentenwahl, Live-Werte, Validierung, Speichern/Laden, Import/Export.

**Späterer UI-Aufräumblock · niedrige Priorität**
- [ ] Roboter-Konfiguration aus dem rechten Kampfbereich herauslösen
- [ ] eigenen Config-Dialog für Chassis, Motor, Panzerung, Energie, Sensorik und Waffen anlegen
- [ ] Config-Dialog vor dem Kampf bzw. bei bewusster Neukonfiguration öffnen
- [ ] während des Kampfes rechts nur kampfrelevante Live-Werte anzeigen (z. B. aktuelle Struktur/Panzerung, Energie, Status)
- [ ] Kampfanzeige kompakter und klar von der Konfiguration trennen
- [ ] Desktop- und Mobile-Bedienung des Dialogs absichern

### E · Strategiesystem
Aggressiv, defensiv, Distanz, Nahkampf, Energieverwaltung und Strategieparameter.

### F · Replay & Analyse
Event Recorder, Replay-Datei, Player, Zeitleiste und Kampfstatistiken.

### G · Turniere
Round Robin, K.-o., Best-of-N, Tabellen, Seeds und Turnierstatistiken.

### H · Testlabor
Batch-Simulationen, Siegquoten, Reststruktur, Energieverbrauch, Seed-Vergleiche.

### I · Arenen & Spieltiefe
Hindernisse, Arena-Größen, Engstellen, Gefahren- und Energiezonen.

### J · Qualität, Performance & Refactoring
Testabdeckung, Flaky Tests, Performance, Accessibility, Architektur und Dependencies.

### K · Version 1.0
Stabile Sandbox mit Editor, Strategien, Replay, Turnieren, Testlabor und reproduzierbarer Releasequalität.

---

## Öffentliche Backlog-Regel

`backlog.html` zeigt:
1. aktuelle Version,
2. letzten Publish,
3. nächsten geplanten Lauf,
4. **den nächsten konkreten Schritt**,
5. **mehrere danach folgende konkrete Schritte in Reihenfolge**,
6. anschließend die größeren Entwicklungsblöcke.

So bleibt jederzeit sichtbar, was beim nächsten Lauf passiert und was unmittelbar danach vorgesehen ist.

## Detaillierte Folgeabnahme (Planung, noch nicht implementiert)
- **NEXT-44 Recorder:** Seed und beide RobotDefinition-Snapshots einmalig beim Matchstart einfrieren; Tick/Events nur append-only; bei Replay-Aufnahme 0, 1 und 3600 Ticks sowie sofortigem Sieg Ereignisreihenfolge und unveränderte Eingaben prüfen.
- **NEXT-45 Replay-Format:** schemaVersion=1, Seed, Arenaabmessungen, Roboterdefinitionen, Tick-/Eventliste und Endzustand; ungültige IDs, Ticks, Versionen und Nicht-Finite-Werte mit benannten Fehlern ablehnen; JSON-Roundtrip deterministisch.
- **NEXT-46 Import/Export:** Download mit stabiler Dateibenennung; Dateiimport mit Größenlimit, Fehlerdialog und ohne Änderung des laufenden Matchs bei ungültigen Daten; Desktop/Mobile und Tastatur testen.
- **NEXT-47 Player:** Aufzeichnungen ohne SeededRandom erneut abspielen; Play/Pause/Step und Ende deterministisch; keine Simulation im Player; Tests für leere und früh beendete Kämpfe.
- **NEXT-48 Zeitleiste:** seek(0), seek(mitte), seek(ende), rückwärts springen; Energie/Struktur/Position/Effekte konsistent rekonstruieren; Desktop/Mobile inklusive Touch testen.
- **NEXT-49 Statistiken:** Shot-, Damage- und Energy-Kennzahlen ausschließlich aus Events ableiten; negative/überzählige Schäden ausschließen; Sieger/Unentschieden getrennt anzeigen.
- **NEXT-50 Roundtrip:** Alle 16 Strategiepaarungen × Seeds 1/12/4711 mit Export→Import→Player gegen Zustands-/Event-Digests prüfen; Speichergrenzen und Browser-E2E aufnehmen.
- **NEXT-51 Refactoring/Turnierplanung:** Recorder/Player-Schnittstellen nach Charakterisierung entkoppeln; bestehende Referenzen unverändert halten; 5–10 konkrete Turnieraufgaben mit Abnahmetests planen.
