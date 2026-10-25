## Publish-Reife Arbeitsstand · 25.10.2026 · KEIN PUBLISHING
- **Auftrag:** Angefangene Pakete bis zur Veröffentlichungsreife bringen; Freigabeumfang NEXT-63/64/66/67/68/78, NEXT-79a/b bereits getestet; NEXT-79c/d/e erst nach vollständiger CI-Abnahme. Keine Veröffentlichung in diesem Arbeitsschritt.
- **NEXT-79d heute weiterbearbeitet:** Präzise Fehlertexte für ungültigen Seed (0..MAX_SAFE_INTEGER), Ticklimit (1..3600), fehlende und doppelte Teilnehmernamen vor Planerstellung ergänzt. Neuer Playwright-Test prüft ungültige Eingaben und anschließend erfolgreiche Erstellung. Produktionscode/Test im Entwicklungsbranch committed und per GitHub-Readback verifiziert. **Noch nicht ausgeführt; keine CI-Freigabe.**
- **Release-Gate:** Aktuellen Branch vollständig testen (Typecheck, 383+ Unit/Behavior/Regression, deterministische Engine, Desktop/Mobil Playwright, Audit, reproduzierbarer Build), danach NEXT-79c/d und NEXT-79e abschließen. Vor Release zusätzlich Divergenz zu main (zuletzt 4 Commits hinter main) auflösen und danach komplette Regression wiederholen. Keine ungeprüften Änderungen veröffentlichen.
- **Kumulativ weiterhin 6 vollständig getestete, unveröffentlichte ganze NEXT-Aufgaben:** 63, 64, 66, 67, 68, 78; NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d in Abnahme; NEXT-79e offen. Letzte bestätigte Live-Version v0.1.55.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsrunde 25.10.2026, ca. 08:00 MEZ · NEXT-79c Auto-Play bei Formularänderungen geschützt · KEIN PUBLISHING
- **Aktuelle Runde (1 von maximal 3 Aufgaben):** NEXT-79c P1-Bugfix: „Spielplan erstellen“ rief `stopTournamentAuto()` bereits vor der Prüfung auf einen aktiven Turnierlauf auf; auch eine Änderung der Teilnehmerzahl stoppte den automatischen Turnierlauf, obwohl der aktive Spielplan erhalten blieb. Jetzt verändern Entwurfsänderungen weder Timer noch Fortsetzungsabsicht; `stopTournamentAuto()` erfolgt bei der Neuanlage erst nach erfolgreicher Validierung. Status und Engine unverändert.
- **Regression hinzugefügt, nicht ausgeführt:** Desktop-/Mobil-Playwright-Test mit 3 Teilnehmern und 1 Tick/Kampf; Start Automatik → Pause im selben Browser-Task → gültige oder ungültige Seed-Änderung und Teilnehmer-Formular-Update → explizit Fortsetzen → alle 3 Kämpfe automatisch abgeschlossen. Test und Produktionscode auf GitHub seriell committed und durch Blob-SHA/Inhaltsvergleich zurückgelesen. Code-Commit `a5d4c903`, Test-Commit `f5b99440`.
- **CI-Blocker:** Für den neuen Test-Commit liefern die verfügbaren GitHub-Commit-Runs-/Statusabfragen keine Runs/Checks. Lokaler GitHub-Clone wegen DNS-Ausfall nicht möglich. Die neue Regression ist daher **nicht als bestanden** zu melden; NEXT-79c/d bleiben offen. Letzte nachweislich grüne Voll-CI vor 79c/d: #40153366228 (383 Unit-/Behavior-/Regressionstests, 102 Desktop-/Mobil-E2E, Typecheck/Build/Audit/reproduzierbare Builds).
- **Refactoring:** `stopTournamentAuto()` aus reiner Teilnehmerformular-Neudarstellung entfernt und hinter die erfolgreiche Neuanlage verschoben. Keine Änderung an deterministischer Engine, RNG, Archivformat oder gespeicherten Match-Ergebnissen. Vollständige Regression nach Refactoring steht aus.
- **Kumulativ unveröffentlicht:** Letzte bestätigte Live-Version v0.1.55; kumulativ 6 vollständig CI-getestete, NICHT veröffentlichte NEXT-Aufgaben: NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (reproduzierbare Builds/Audit), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministisches Replay), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD-Arenagrenzen). NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d nicht aktuell vollständig CI-abgenommen; NEXT-79e offen. **Keine neue vollständige NEXT-Abnahme in dieser Runde; Gesamtzahl weiterhin 6.**
- **Nächste priorisierte Schritte:** (1) aktuelle vollständige Development-CI und Browser-Regression verifizieren, bei Fehlern korrigieren; (2) NEXT-79c/d abschließen, wenn nachgewiesen; (3) NEXT-79e UX-Abschlussmatrix und Refactoring mit erneuter Voll-CI. NEXT-69–77 bleiben im Rolling Backlog. Draft-PR #48; Branch zuvor 122 Commits vor und 4 hinter main. Keine anderen Automationen verändert.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, Release, publish.php, Deployment oder Homepage-Update.

## Entwicklungsrunde 25.10.2026, 07:00 MEZ · NEXT-79c schützt aktive Turniere vor Überschreiben · KEIN PUBLISHING
- **Aktuelle Runde (1 Teilaufgabe, NEXT-79c):** Quellcodeprüfung ergab, dass ein geänderter, gültiger Turnier-Startwert beim Klick auf „Spielplan erstellen“ einen aktiven Lauf ohne Bestätigung ersetzen konnte. Der Guard schützt jetzt **jeden** aktiven Lauf (ready/running/paused), auch wenn der Formularentwurf abweicht. Fehlermeldung fordert zum expliziten Abbrechen auf; abgeschlossene/abgebrochene Läufe dürfen neu geplant werden. Die deterministische Engine, Seeds bereits laufender Turniere und Archive bleiben unverändert.
- **Neue Regression:** Playwright prüft ungültige Eingabe ohne Datenverlust, geänderte gültige Eingabe ohne stillen Ersatz, Abbruch und anschließenden erlaubten Neustart. Code-Commit `1d952f1e`, Test-Commit `b0cf2fb3`; beide GitHub-Schreibresultate vollständig zurückgelesen. **NEXT-79c bleibt OFFEN bis zur vollständigen aktuellen CI.** NEXT-79d ebenfalls noch ohne aktuelle CI; NEXT-79e offen.
- **Tests/Blocker:** GitHub-Actions-Commit-Runs-Abfrage für den aktuellen Head leer (filtert PR-Runs), kombinierte Statusabfrage leer; daraus folgt weder grün noch rot. Lokaler Clone scheitert an DNS-Auflösung für github.com, deshalb keine aktuelle Unit-/Behavior-/Regression-/Desktop-/Mobil-/Build-Abnahme behaupten. Letzte nachweislich grüne vollständige CI vor NEXT-79c/d: #40153366228 mit 383 Unit/Behavior/Regression und 102 Desktop/Mobil-E2E, Typecheck, Build, Audit und reproduzierbaren Builds.
- **Refactoring:** Statt Sonderfall „nur identischer Plan“ ein einheitlicher Status-Guard für alle aktiven Turniere; bestehende Statusquelle verwendet, kein zweiter UI-State. Regressionstest ergänzt; volle Tests nach Refactoring ausstehend.
- **Kumulativ seit bestätigt veröffentlichtem Live-v0.1.55: genau 6 vollständig getestete, noch NICHT veröffentlichte NEXT-Aufgaben:** NEXT-63 (Barrierefreiheit/Touch/Tastatur; CI grün), NEXT-64 (reproduzierbare Builds/Audit; CI grün), NEXT-66 (Turnierkampfdetails; CI grün), NEXT-67 (deterministisches Replay; CI grün), NEXT-68 (lokale Sicherung/Restore; CI grün), NEXT-78 (Raptor/HUD innerhalb der Arena; CI grün). NEXT-79a/b als CI-getestete Teilaufgaben; NEXT-79c/d implementiert, aber aktuelle CI offen; NEXT-79e noch nicht begonnen. Keine neue vollständig abgeschlossene NEXT-Aufgabe.
- **GitHub:** Entwicklungsbranch `automation/next-56-tournament-runner-unpublished`, Draft-PR #48, vor diesem Lauf 112 Commits vor und 4 hinter `main`; keine Integration. Nächster Lauf: vollständige CI nachweisen, ggf. Fehler beheben; dann 79c/d abnehmen, 79e beginnen. Andere Automationen unverändert.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, kein Release-Commit, kein publish.php, keine Homepage-Aktualisierung.

## Entwicklungsrunde 25.10.2026, 06:00 MEZ · NEXT-79c Pausensteuerung korrigiert, CI offen · KEIN PUBLISHING
- **Aktuelle Runde:** NEXT-79c weiterbearbeitet (1 Teilaufgabe): Der bisher während `paused` noch aktivierbare Knopf „Alle Kämpfe spielen“ wird jetzt zusammen mit „Nächster Kampf“ deaktiviert; explizites „Fortsetzen“ erforderlich. Desktop-/Mobil-E2E prüft Pause, beide deaktivierten Startaktionen und anschließendes Fortsetzen. Produktionscode `src/main.ts` und `e2e/usability-baseline.spec.ts` seriell committed und durch SHA-/Inhaltsvergleich zurückgelesen. **NEXT-79c weiterhin OFFEN bis zur vollständigen CI.**
- **NEXT-79d:** Kontext-Hilfen/ARIA im Branch, unverändert, vollständige CI ebenfalls ausstehend. **NEXT-79e** bleibt geplant und wird erst nach der 79c/d-Abnahme begonnen. NEXT-69–77 unverändert im Rolling Backlog.
- **Tests:** Letzte bestätigte vollständige CI vor NEXT-79c/d: #40153366228 (383 Unit-/Behavior-/Regression, 102 Desktop-/Mobil-E2E, Typecheck, Build, Audit, reproduzierbare Builds erfolgreich). Die GitHub-Commit-Runs-Abfrage liefert für den aktuellen Head **keinen verwertbaren CI-Nachweis** und liefert auch für bekannte erfolgreiche ältere Commits leere Ergebnisse; daraus folgt nicht, dass CI fehlgeschlagen oder nie gestartet ist. GitHub-Host ist aus der lokalen Testumgebung nicht erreichbar, daher keine aktuelle Vollsuite behaupten.
- **Refactoring:** Einheitliche Aktivierung beider Startaktionen direkt aus `tournamentRun.status` statt eines Sonderfalls; kein zweiter UI-State, keine Engine-/RNG-/Archivänderung. Vollständige Regression nach Refactoring steht aus.
- **Letztes bestätigt veröffentlichtes Release v0.1.55. Kumulativ exakt 6 vollständig getestete und noch NICHT veröffentlichte NEXT-Aufgaben:** NEXT-63 (Zugänglichkeit/Touch; CI grün), NEXT-64 (Lockfile, Audit, reproduzierbare Builds; CI grün), NEXT-66 (Turnierkampfdetails; CI grün), NEXT-67 (deterministisches Replay; CI grün), NEXT-68 (lokale Sicherung/Restore; CI grün), NEXT-78 (Raptor/HUD-Arenagrenzen; CI grün). NEXT-79a/b sind getestete Teilaufgaben, NEXT-79c/d in Abnahme und NEXT-79e offen; keine neue vollständig abgeschlossene NEXT-Aufgabe.
- **GitHub:** Entwicklungsbranch `automation/next-56-tournament-runner-unpublished`, Draft-PR #48; Branch weiterhin vier Commits hinter `main` und nicht integrieren. **Blocker:** Aktuellen vollständigen CI-Lauf für NEXT-79c/d nicht nachweisbar; im nächsten Lauf erneut prüfen, bei Fehlern korrigieren. Andere Automationen nicht verändert.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, kein Release-Commit, kein Publish-Workflow, keine Homepage-Aktualisierung.

## Entwicklungsrunde 25.10.2026, 05:00 MEZ · NEXT-79c CI weiter offen, NEXT-79d Hilfetexte implementiert · KEIN PUBLISHING
- **Aktuelle Runde (2 Teilaufgaben, keine neue vollständige NEXT-Abnahme):** NEXT-79c Code, Tastatur-/Desktop-/Mobiltests und statusabhängige Turnieraktionen überprüft; vollständige CI des neuen Heads weiterhin nicht über GitHub-Commit-Runs/Status abrufbar. **NEXT-79c bleibt offen.** NEXT-79d: konkrete Hilfetexte für Strategie, Energiereserve, Turnier-Startwert/Seed, Ticklimit, Turnierformate und Reststruktur in `src/main.ts` ergänzt; `aria-describedby` verbindet die Eingaben mit ihren Erklärungen. Lesbare CSS-Hilfetexte und Desktop-/Mobil-E2E für Eingabebeschreibungen, 44px-Touchziele, 375/1280px und Seitenscroll ergänzt. **NEXT-79d implementiert, aber vollständige CI noch ausstehend; nicht als abgeschlossen zählen.**
- **Qualität:** Letzte bestätigte vollständige CI **#40153366228** vor NEXT-79c/d: **383 Unit-/Behavior-/Regressionstests und 102 Desktop-/Mobil-E2E**, Typecheck/Build/Audit/reproduzierbare Builds grün. Für aktuellen Branch-Head liefert die GitHub-Abfrage bislang keine CI-Statusnachweise; Repository lokal wegen nicht erreichbarem GitHub-Host nicht klonbar. Neue Tests daher **noch nicht als bestanden behaupten**.
- **Refactoring:** Erklärungen direkt an bestehenden Formularfeldern statt parallelem Hilfestatus; Simulation/Seed/Engine und gespeicherte Formate unverändert. Änderungen seriell auf Entwicklungsbranch geschrieben und Blob-SHAs nachgelesen. Nach aktuellem Code-Stand vollständige Regression weiterhin erforderlich.
- **Letztes bestätigtes Live-Release v0.1.55. Kumulativ sechs vollständig implementierte, zuvor CI-bestätigte und NICHT veröffentlichte NEXT-Aufgaben:** NEXT-63 (Barrierefreiheit/Touch; grün), NEXT-64 (reproduzierbare Builds/Audit; grün), NEXT-66 (Matchdetails; grün), NEXT-67 (deterministisches Replay; grün), NEXT-68 (lokales Autosave/Restore; grün), NEXT-78 (Raptor/HUD innerhalb der Arena; grün). NEXT-79a/b als getestete Teilaufgaben; 79c/d Code ohne aktuelle vollständige CI; 79e offen. NEXT-65 ist in NEXT-59 enthalten.
- **GitHub:** Draft-PR #48 auf `automation/next-56-tournament-runner-unpublished`; Branch zuletzt 4 Commits hinter main, nicht mergen. **Nächste Runde:** aktuelle CI nachweisen/ggf. Fehler korrigieren, danach NEXT-79e und vollständige Usability-Abnahme; NEXT-69–77 bleiben im Rolling Backlog.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Keine Homepage, kein publish.php, kein Release-Commit, kein Merge, kein Deployment.

## Entwicklungsrunde 25.10.2026, 04:00 MEZ · NEXT-79c implementiert, CI-Abnahme ausstehend · KEIN PUBLISHING
- **Aktuelle Runde (1 von maximal 3 Aufgaben):** NEXT-79c – Turnierdialog in die deutlich getrennten Abschnitte „1 · Einrichten“, „2 · Spielen“, „3 · Ergebnisse“ mit zugänglicher Sprungnavigation umgebaut. Erstell-, Kampf-, Export- und Sicherungsaktionen sind gruppiert; für nicht verfügbare Aktionen wird der Disabled-Zustand aus dem bestehenden Runner-Status abgeleitet, ohne zweiten UI-State. Erweiterte Datei-/LocalStorage-Werkzeuge bleiben zugänglich, damit bestehende Import-/Restore-Abläufe nicht unterbrochen werden.
- **Tests im Code ergänzt:** Playwright für 375/1280px, Tastatur-Sprungnavigation, drei Bereiche, Erstellen/Spielen/Ergebnis, Archiv-/Autosave-Erreichbarkeit und Disabled-Zustände. **Vollständige aktuelle CI noch NICHT bestätigt; NEXT-79c bleibt bis zur Abnahme OFFEN.** Letzte bestätigte abschließende CI vor diesen Änderungen: #40153366228 (383 Unit/Behavior/Regression, 102 Desktop/Mobil-E2E, Build/Audit/reproduzierbar grün).
- **Refactoring:** Aktionsfreigabe in `syncTournamentActions()` zentralisiert; ausschließlich aus `tournamentRun.status` abgeleitet. Engine, RNG, Matchdaten und Exportformate unverändert. Vollständiger Regressionstest nach Refactoring steht aus.
- **Kumulativ seit letztem bestätigt veröffentlichtem v0.1.55 genau 6 fertig implementierte, getestet bestätigte und noch NICHT veröffentlichte NEXT-Aufgaben:** NEXT-63 (Zugänglichkeit/Touch; CI grün), NEXT-64 (Lockfile/CI; CI grün), NEXT-66 (Kampfdetails; CI grün), NEXT-67 (deterministisches Replay; CI grün), NEXT-68 (lokale Sicherung; CI grün), NEXT-78 (Raptor/HUD bleibt im Feld; CI grün). NEXT-79a/b getestet, NEXT-79c Code vorhanden aber noch nicht verifiziert, NEXT-79d/e offen. Keine neue ganze NEXT-Aufgabe abschließend abgenommen.
- **GitHub:** Entwicklungsbranch `automation/next-56-tournament-runner-unpublished`, Draft-PR #48. Letzter Feature-/Test-Commit `043106ea`; Dokumentationscommits folgen. Branch gegenüber main zuvor 4 Commits zurück. Kein Merge/Release/Publish/Deployment.
- **Blocker:** Für neuen Head kein bestätigter GitHub-PR-CI-Lauf abrufbar; lokale Repository-Tests in dieser Laufumgebung wegen fehlender Netzwerk-/Repo-Mount-Möglichkeit nicht ausführbar. Nächster Lauf: CI prüfen, Fehler beheben, dann NEXT-79c abschließen; erst danach 79d/e.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsrunde 25.10.2026, 03:00 MEZ · NEXT-78 ABGESCHLOSSEN; NEXT-79a/79b getestet · KEIN PUBLISHING
- **Aktuelle Runde (3 von maximal 3 Teilaufgaben):** NEXT-78 P0 **NEU abgeschlossen**; NEXT-79a UX-Baseline **NEU abgeschlossen**; NEXT-79b gruppierte Kampfsteuerung und eindeutige Laufphase **NEU abgeschlossen**. NEXT-79 als Gesamtaufgabe bleibt OFFEN (79c–79e).
- **NEXT-78:** Engine-Positionen bleiben deterministisch, Darstellung klemmt Raptor/Titan einschließlich Waffe und Energie-/Strukturbalken innerhalb der Arena. Acht Rand-/Eckfälle, echte defensive Flucht und 1000 Schritte, Seeds 1/12/4711, Desktop/Mobil. Vollständige CI #40144987038 auf a06e5c56: 383 Unit-/Behavior-/Regressionstests und 96 E2E erfolgreich.
- **NEXT-79a:** Browser-Baseline für Konfiguration → Start → Pause → Reset und Turnier erstellen → Kampf → Ergebnis; Tastatur, Fokus, 375/768/1280px, kein horizontaler Dokument-Scroll. CI #40152929889: 383 Unit/Behavior/Regression und 100 E2E erfolgreich.
- **NEXT-79b:** Hauptaktionen (Start/Pause/1 Tick/Reset) visuell und semantisch von Werkzeugen (Konfiguration/Replay/Turnier) getrennt; Status jetzt „Kampfbereit“, „Kampf läuft“ und „Kampf pausiert“; kein Einfluss auf Simulation. Development Tests #40153090696 auf 88a415e9: 383 Unit-/Behavior-/Regressionstests (32 Dateien), 102 Desktop-/Mobil-E2E, Typecheck, Build, npm-Audit-Gate und reproduzierbare Clean-Builds erfolgreich.
- **Refactoring:** Laufphase aus bestehendem Timer/Tick abgeleitet, keine zweite konkurrierende Zustandsvariable; CSS/HTML-Gruppen ohne Umbenennung bestehender IDs, Tests nach Umbau vollständig grün.
- **Kumulativ 6 vollständig implementierte und getestete, NICHT veröffentlichte NEXT-Aufgaben seit bestätigtem Live-v0.1.55:** NEXT-63 (Zugänglichkeit/Touch), NEXT-64 (Lockfile/CI), NEXT-66 (Matchdetails), NEXT-67 (deterministisches Replay), NEXT-68 (lokale Turniersicherung), NEXT-78 (Raptor bleibt vollständig innerhalb der Arena). NEXT-79a/79b sind abgeschlossene Teilaufgaben, NEXT-79 selbst nicht doppelt zählen. NEXT-65 ist bereits in NEXT-59 enthalten und wird nicht doppelt gezählt.
- **GitHub:** Entwicklungsbranch `automation/next-56-tournament-runner-unpublished`, Draft-PR #48; geprüfter Code-Commit `88a415e9`, CI #40153090696. Branch liegt weiterhin 4 Commits hinter main; keine Integration/kein Deployment. **Nächste Priorität: NEXT-79c** (Turnierdialog-Schrittfolge), dann NEXT-79d/e; NEXT-69 ff. bleiben erhalten.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsrunde 25.10.2026, 02:00 MESZ · NEXT-78 Testhärtung · KEIN PUBLISHING
- **Aktuelle Runde (1/3): NEXT-78 P0 weiterbearbeitet, NICHT abgeschlossen.** Bei Code-Review fiel auf, dass die acht bisherigen Grenztests auch ohne tatsächliche Fluchtbewegung grün werden konnten. Regressionen jetzt mit verpflichtendem tatsächlichem Rückzug (`moved`) und Erreichen einer Spielfeldkante (`reachedEdge`) verstärkt; alle vier Ränder und Ecken mit 1000 Schritten. Commit `63a0b632`, zurückgelesener Blob bestätigt.
- **Verifikation:** Statische Quellcodeprüfung von `movement.ts`, `simulation.ts`, `src/main.ts`, CSS, Playwright- und Vitest-Fällen. Die vollständige CI für den aktuellen Branch-Head ist **nicht nachgewiesen**; PR-Workflow-Abfrage lieferte keine Runs. Keine Behauptung über grüne neue Tests. Letzte bestätigte vollständige CI #40137115159 (älterer Stand): 372 Unit-/Behavior-/Regression und 92 Desktop-/Mobil-E2E grün. NEXT-78 bleibt **OFFEN**, NEXT-79 (Audit vorhanden, UI-Umsetzung offen) zurückgestellt.
- **Refactoring:** Kein weiteres Produktionscode-Refactoring in dieser Runde; bestehende Trennung von Weltkoordinaten und CSS-Darstellung geprüft, neue Charakterisierungstests präzisiert.
- **Letztes bestätigtes Live-Release:** v0.1.55. **Kumulativ genau 5 fertig implementierte, getestet bestätigte, NICHT veröffentlichte Tasks:** NEXT-63 (Zugänglichkeit/Touch/Fokus; CI grün), NEXT-64 (reproduzierbare Builds/Sicherheitsgate; CI grün), NEXT-66 (Kampfdetails; CI grün), NEXT-67 (deterministisches Turnier-Replay; CI grün), NEXT-68 (lokales Turnier-Autosave/Restore; CI grün). NEXT-78/79 **nicht** dazuzählen.
- **GitHub:** Entwicklungsbranch `automation/next-56-tournament-runner-unpublished`, Draft-PR #48; Branch weiterhin 4 Commits hinter main. Kein Merge/Release/Publish/Deployment. Nächster Schritt: vollständige CI des neuen Heads prüfen und eventuelle Fehler beheben, erst dann NEXT-78 abschließen; danach NEXT-79a Baseline.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsrunde 25.10.2026, 01:00 MESZ · P0 NEXT-78 in Prüfung, NEXT-79 Audit · KEIN PUBLISHING
- **Aktuelle Runde (2 von maximal 3 Aufgaben):** NEXT-78 P0 Rand-/Fluchtfehler und NEXT-79 P1 Usability-Analyse priorisiert. NEXT-69 zurückgestellt; Fehler vor Features.
- **NEXT-78:** Ursache aus Quellcode identifiziert: Engine-Zentrum auf 0..100 begrenzt, aber CSS zeichnet Raptor (48px), Titan (54px), Waffe und HUD über die Kante. Visuellen CSS-Clamp abhängig vom Chassis implementiert; Rohkoordinaten bleiben im Inline-Style und `data-x/y`, Engine/Seeds unberührt. Regressionen: 8 Ränder/Ecken, Desktop/Mobile und 375px, defensive Laufprobe, deterministische Engine-Grenzen/Seeds 1,12,4711. **Neue Tests noch nicht als erfolgreich bestätigt; vollständige aktuelle CI ausstehend. NEXT-78 bleibt offen.**
- **NEXT-79:** Quellcode-Audit `USABILITY_AUDIT.md` erstellt: 7 gleichgewichtete Hauptaktionen, überladener Turnierdialog, Fachbegriffe ohne Hilfen, irreführender Kampfstatus, mobile Navigationslast. Testbare 79a–79e-Umsetzungsschritte festgelegt. **Keine UX-Umsetzung abgeschlossen.**
- **Refactoring:** Weltkoordinaten und CSS-Visualisierung getrennt, vorhandene Inline-Werte für bisherige Tests erhalten; keine Änderung der Simulation. **Isolierter lokaler Chromium-Layoutcheck der gleichen Clamp-Regeln bestanden** (375px/1280px, acht Rand-/Ecklagen, Raptor/Titan einschließlich HUD); dies ersetzt **nicht** die vollständige Repository-CI. Abschließende vollständige Testsuite noch offen.
- **Letztes bestätigtes Live-Release v0.1.55** (Publish #40132737105 / #40132968986); NEXT-56–62 veröffentlicht. **Kumulativ 5 vollständig implementierte, getestete, NICHT veröffentlichte Aufgaben:**
  - NEXT-63 · Zugänglichkeit, Touch, Tastaturfokus, robuste Turnierbedienung · letzte bestätigte CI grün · NICHT VERÖFFENTLICHT.
  - NEXT-64 · npm ci, Lockfile, Audit-Gate, reproduzierbare Builds · letzte bestätigte CI grün · NICHT VERÖFFENTLICHT.
  - NEXT-66 · Validierte Kampfergebnisse und Detailansicht · letzte bestätigte CI grün · NICHT VERÖFFENTLICHT.
  - NEXT-67 · Isoliertes deterministisches Turnierkampf-Replay · letzte bestätigte CI grün · NICHT VERÖFFENTLICHT.
  - NEXT-68 · Browser-Autosave und sichere Wiederaufnahme · letzte bestätigte CI #40137115159: 372 Unit/Behavior/Regression, 92 Desktop/Mobil-E2E · NICHT VERÖFFENTLICHT.
- **GitHub:** Entwicklungsbranch `automation/next-56-tournament-runner-unpublished`, Draft-PR #48. Branch weicht von main ab (zuletzt 4 Commits hinter main); keine Integration ohne Konflikt-/CI-Prüfung. **NEXT-78/79 offen, nicht in kumulativen Zähler aufnehmen.**
- **Blocker:** Kein aktuell bestätigter neuer CI-Lauf für die Randkorrektur; daher keine Abschlussfreigabe. Bei nächstem Lauf CI prüfen, Fehler korrigieren und Tests wiederholen.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, Release-Commit, Publish-Workflow, publish.php oder Homepage-Update.

## Entwicklungsrunde 25.10.2026, 00:08 MESZ · NEXT-68 NEU vollständig verifiziert · KEIN PUBLISHING
- **Aktuelle Runde (1 von maximal 3 Aufgaben): NEXT-68 NEU abgeschlossen.** Opt-in-Browser-Autosave ausschließlich lokal, nur an validierten Match-/Statusgrenzen; versioniertes 2-MB-Archiv, persistente Einwilligung, explizites Wiederherstellen nach Reload, vollständiges Löschen bei Deaktivierung. Fehlerhafte/zu große Daten verändern das laufende Turnier nicht. Pausierte und abgebrochene Turniere behalten ihren Status; kein automatischer Start nach Wiederherstellung.
- **Qualität:** Development Tests **#40137115159 auf c95aaf99 erfolgreich:** **372 Unit-/Behavior-/Regressionstests in 31 Dateien, 92 Desktop-/Mobile-E2E**, TypeScript, Build, npm-Audit-Gate (0 bekannte Advisories), zweimaliger Clean-Build mit identischem SHA256. NEXT-68: 7 neue Unit-Tests und 6 neue Desktop-/Mobile-E2E; 2/3/16 Teilnehmer, 120 Matches, manipulierte Version/Fortschritt, >2 MB, Quota-Fehler, Reload/Pause/Cancel, Datenschutz.
- **Refactoring:** Ein gemeinsamer validierter Importpfad für JSON-Datei und lokale Wiederherstellung; Speicherung/Validierung in reinem, speicherinjiziertem Modul `src/engine/tournament-local-save.ts` statt direkt im UI. Danach komplette CI erfolgreich.
- **Letztes bestätigtes Release: v0.1.55**, Publish **#40132737105** (Upload + Live-Verifikation + Deployment-Status erfolgreich) und erneute Live-Verifikation **#40132968986**. NEXT-56–62 gehören zu v0.1.55 und werden **nicht** mehr als unveröffentlicht gezählt.
- **Kumulativ seit v0.1.55: genau 5 vollständig implementierte, getestete und NICHT veröffentlichte NEXT-Aufgaben:** 
  - **NEXT-63** · Zugänglichkeit, Fokus, Touch, robuste Turnierbedienung · **Tests grün**, nur Draft-PR #48, **NICHT VERÖFFENTLICHT**.
  - **NEXT-64** · Lockfile, npm ci, Sicherheitsgate, reproduzierbare Builds · **Tests grün**, nur Draft-PR #48, **NICHT VERÖFFENTLICHT**.
  - **NEXT-66** · Validierte Matchdetails mit Seed/Ticks/Sieger/Reststruktur · **Tests grün**, nur Draft-PR #48, **NICHT VERÖFFENTLICHT**.
  - **NEXT-67** · Isoliertes deterministisches Turnierkampf-Replay · **Tests grün**, nur Draft-PR #48, **NICHT VERÖFFENTLICHT**.
  - **NEXT-68 – NEU** · Opt-in-LocalStorage-Sicherung und sichere Wiederaufnahme · **Tests grün**, nur Draft-PR #48, **NICHT VERÖFFENTLICHT**.
- **GitHub:** Branch `automation/next-56-tournament-runner-unpublished`, **Draft-PR #48**, kein Merge nach main. NEXT-65 ist in NEXT-59 enthalten und wird nicht separat gezählt. **Nächster Schritt NEXT-69**, danach NEXT-70/71; Rolling Backlog bis NEXT-77. **Keine technischen Blocker.**
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Weder publish.php noch Release-Commit, Merge, Homepage-Update oder Deployment ausgelöst.

## Entwicklungsrunde 24.10.2026, 23:00 MESZ · NEXT-67 vollständig verifiziert · KEIN PUBLISHING
- **Aktuelle Runde (1 von maximal 3 Aufgaben): NEXT-67 NEU abgeschlossen.** Isoliertes deterministisches Replay abgeschlossener Round-Robin-Kämpfe aus eingefrorenen Turnierteilnehmern und Original-Seed. Vergleich der tatsächlichen Sieger-, Tick- und Reststrukturwerte gegen das Archiv vor Wiedergabe; manipulierte Ergebnisse und offene Kämpfe werden abgewiesen. Replay-Player und Sandbox/Turnierlauf bleiben getrennt. Tastatur- und Mobile-E2E vorhanden.
- **Vollständige Development Tests #40132151611 auf ddd26d15 erfolgreich:** 30 Testdateien / **365 Unit-, Behavior- und Regressionstests**, **86 Desktop-/Mobil-E2E**, TypeScript, Build, npm-Audit und zwei byteidentische Clean-Builds (Dist-SHA256 b328d073…). 1- und 3600-Tick-Grenzfälle, 2/3/16 Teilnehmer, Archiv-Roundtrip, Manipulations- und Isolationsprüfungen. 0 Ticks sind laut Turniermodell unzulässig und werden explizit abgewiesen.
- **Refactoring:** Replay-Erzeugung und Archiv-Ergebnisvergleich in reines Engine-Modul `src/engine/tournament-replay.ts` ausgelagert; UI nutzt nur dessen validierte ReplayDocument-Schnittstelle und vorhandenen Player.
- **Kumulativ seit letzter unabhängig bestätigter Veröffentlichung v0.1.54: 11 vollständig getestete Aufgaben:** NEXT-56, 57, 58, 59, 60, 61, 62, 63, 64, 66, **67 (NEU)**. NEXT-65 ist in NEXT-59 enthalten und wird nicht doppelt gezählt.
- **Veröffentlichungsstatus:** NEXT-56 bis 62 befinden sich in main v0.1.55, Homepage-Status weiterhin **Veröffentlichungsstatus ungeklärt**. **NEXT-63, 64, 66, 67 sind sicher nicht veröffentlicht** (ausschließlich Entwicklungsbranch / Draft-PR #48). Letzter unabhängig bestätigter Live-Publish v0.1.54 (#40111747415).
- **GitHub:** Entwicklungsbranch `automation/next-56-tournament-runner-unpublished`, Draft-PR #48. Kein Merge auf main, kein Release-Commit, kein Publish-/Deploy-Workflow und kein Homepage-Upload durch diese Runde. **Nächstes Ziel NEXT-68**, danach NEXT-69/70; Rolling Backlog bis NEXT-74 vorhanden. Keine technischen Blocker; Live-Status von v0.1.55 ungeklärt.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsrunde 24.10.2026, 22:00 MESZ · NEXT-64 und NEXT-66 · KEIN PUBLISHING
- **Aktuelle Runde (2/3 Aufgaben):** NEXT-64 und NEXT-66 vollständig implementiert und getestet; NEXT-67 folgt. NEXT-65 ist das bereits in NEXT-59 enthaltene Duplikat, nicht zusätzlich zählen.
- **NEXT-64:** package-lock.json aus realem npm-Install auf CI erzeugt, npm ci mit Cache nach Lockfile, Audit-Gate 0 Advisories, zweimaliger sauberer Install/Build auf identischem SHA, identischer Dist-SHA256.
- **NEXT-66:** reines immutable Modul für validierte Paarungsdetails, kein erfundener Wert für offene Spiele, sichere Unicode/HTML-Namen über textContent, Import/Export-Roundtrip, Draw/Timeout, 2/16 Teilnehmer, Desktop/Mobil.
- **Tests/Refactoring:** Development Tests #40128110261 auf e23323ef: 29 Testdateien, 358 Unit-/Behavior-/Regressionstests, 82 Desktop-/Mobil-E2E, TypeScript/Build, zweimaliger sauberer npm-ci-Install und byteidentischer Dist-SHA256 (1488f94b…), npm audit 0 bekannte Advisories; vollständig erfolgreich. Refactoring: Match-Detailableitung von der DOM-Anzeige entkoppelt; temporären CI-Lockfile-Export wieder entfernt.
- **Kumulativ seit v0.1.54: 10 vollständig implementierte und getestete NEXT-Aufgaben (56–64 ohne Duplikat 65, plus 66).** Sieben davon sind in main, aber Live-Status ungeklärt; drei sicher nur im Draft-PR.
- **NEXT-56** · Deterministischer Round-Robin-Runner, Pause/Resume/Cancel. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-57** · K.-o.-Bracket, Freilose und Tie-Break. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-58** · Validiertes Turnierarchiv, Import/Export und Wiederaufnahme. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-59** · K.-o.-Browser, 16er-Golden-Referenzen und Refactoring. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-60** · Faire A/B-Seiten und Side-Bias-Audit. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-61** · Tabellenexport CSV/JSON mit Formel-Schutz. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-62** · 120-Match-Benchmark und nicht blockierende Turnierautomatik. **Tests grün** (Development Tests #40128110261 auf e23323ef). main v0.1.55 – Veröffentlichungsstatus ungeklärt.
- **NEXT-63** · Zugängliche robuste Turnierbedienung. **Tests grün** (Development Tests #40128110261 auf e23323ef). nur Draft-PR #48 – NICHT VERÖFFENTLICHT.
- **NEXT-64 – NEU** · Lockfile, npm ci, Audit-Gate und doppelte deterministische Builds. **Tests grün** (Development Tests #40128110261 auf e23323ef). NEU, nur Draft-PR #48 – NICHT VERÖFFENTLICHT.
- **NEXT-66 – NEU** · Match-Detailanzeige für Seeds/Ticks/Sieger/Reststruktur und offene Kämpfe. **Tests grün** (Development Tests #40128110261 auf e23323ef). NEU, nur Draft-PR #48 – NICHT VERÖFFENTLICHT.
- **Veröffentlichung:** Letzte unabhängig bestätigte Live-Version v0.1.54 (#40111747415). main enthält v0.1.55 (809fe86c), aber kein neuer erfolgreicher Publish-Lauf wurde bestätigt; tatsächlicher Live-Status für NEXT-56–62 bleibt 'Veröffentlichungsstatus ungeklärt'. NEXT-63/64/66 sind ausschließlich auf dem Entwicklungsbranch / Draft-PR #48, sicher NICHT veröffentlicht.
- **GitHub:** Entwicklungsbranch `automation/next-56-tournament-runner-unpublished`, Draft-PR #48; kein Merge, kein Release-Commit, kein publish.php, keine Homepage-Aktualisierung durch diese Runde.
- **Blocker:** keine technischen; unabhängige Prüfung der tatsächlichen Live-Version weiterhin nicht möglich. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsrunde 24.10.2026, 21:15 MESZ · NEXT-60, NEXT-62, NEXT-63 (maximal drei)
**Erfolgreich umgesetzt und getestet:** NEXT-60 (ausgeglichene A/B-Zuordnung im echten Runner, Archiv, Tabelle, 25-%-Biasgrenze und Golden-Digests), NEXT-62 (120-Match-Benchmark, CPU/Heap/Wall, UI-Automatik mit Event-Loop-Yield, Pause/Resume/Cancel), NEXT-63 (Fokus, Screenreader-Status, Kontrast, Touch, Doppelklick und ungültige Konfiguration). Refactoring: Fairness-Spielplan und tatsächliche Runner-Schedule vereinheitlicht; UI-Automatik in eigene Terminierung gekapselt. Nach Refactoring **Development Tests #40124222697 auf 01771371 erfolgreich**: 354 Unit/Behavior/Regression, 80 Desktop/Mobile-E2E, TypeScript/Build und npm audit 0 Befunde. Referenzbenchmark: 16 Teilnehmer/120 Kämpfe, Seed 4711/100 Ticks, 191,5 ms Wall, 233,9 ms CPU, +1,70 MiB Heap auf GitHub-CI (keine Endgerätegarantie).

**WICHTIGE VERÖFFENTLICHUNGSABWEICHUNG:** Während dieses Laufs wurde **PR #47 außerhalb dieses Laufs um 19:09:30 UTC gemergt**, danach auf main **v0.1.55** per Commit **809fe86c** eingetragen. Dieser Lauf hat **weder Merge noch Publish/Deployment ausgelöst**. Die tatsächliche Live-Veröffentlichung von v0.1.55 konnte nicht unabhängig bestätigt werden: **Veröffentlichungsstatus ungeklärt**. Letzte unabhängig bestätigte Live-Version bleibt v0.1.54 (Publish #40111747415). Aktueller Entwicklungsstand nach dem Merge ist ausschließlich **Draft-PR #48**, ohne Merge.

**Kumulativ seit dem letzten unabhängig bestätigten Live-Release v0.1.54: acht vollständig implementierte und getestete NEXT-Aufgaben:**
- **NEXT-56** · Deterministischer Round-Robin-Runner, Pause/Resume/Cancel. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-57** · K.-o.-Bracket mit Freilosen und Tie-Break. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-58** · Validiertes Turnierarchiv, Import/Export und Wiederaufnahme. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-59** · K.-o.-Browser-E2E, 16-Teilnehmer-Golden-Digests, Refactoring. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-60 – NEU in diesem Lauf verifiziert** · Faire A/B-Zuordnung und Side-Bias-Audit, Runner/Archiv/Tabellenintegration. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-61** · Versionierte Tabellenexporte CSV/JSON mit Formel-Schutz. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-62 – NEU** · Benchmark und nicht blockierende automatische Turnierausführung. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-63 – NEU** · Accessibility/Robustheit (375px, Touch, Fokus, Doppelklick, Invalid-Plan). **Tests grün**, **NICHT VERÖFFENTLICHT**, nur Draft-PR #48.
NEXT-65 ist ein bereits durch NEXT-59 erledigtes Duplikat und wird nicht zusätzlich gezählt. Nächste Aufgabe NEXT-64; detaillierter Rolling Backlog NEXT-66–71.

**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell** (gilt für den aktuellen unveröffentlichten Entwicklungsstand in Draft-PR #48). Kein publish.php, kein Release-Commit, kein Homepage-Update durch diesen Lauf.

## NEXT-60 abgeschlossen · 24.10.2026 · nicht veröffentlicht
- Tatsächliche CI #40123159397 erfolgreich (auf Code- und Teststand vor dieser Dokumentationsänderung).
- Opt-in-Seitenbalance ist im Spielplan und tatsächlichen Runner implementiert, mit identischen Match-IDs/Seeds, gültigen Archiven und deterministischer Tabellenwertung.
- Regressionen für 2/3/4/5/16 Teilnehmer, Side-Swap, Pause/Resume, Export/Import, legacy unverändertes Verhalten; 16-Teilnehmer-Golden-SHA256 für Spielplan, Ergebnisse, Tabelle und Bias. Referenzszenario maximal 25 % Side-Bias, maximal 1 Seitenstart Differenz je Teilnehmer.
- **Kumulativ 6 vollständig getestete, unveröffentlichte Aufgaben seit v0.1.54: NEXT-56, NEXT-57, NEXT-58, NEXT-59, NEXT-60, NEXT-61.**
- Draft-PR #47, Entwicklungsbranch automation/next-56-tournament-runner-unpublished; keine Veröffentlichung, kein Merge. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-59 vollständig abgeschlossen · 24.10.2026 · NICHT VERÖFFENTLICHT
- 16-Teilnehmer-Round-Robin (120 Paarungen) und K.-o.-Bracket mit SHA256-Golden-Referenzen charakterisiert, 30-Sekunden-CI-Grenze für den deterministischen Engine-Lauf geprüft.
- Desktop-/Mobil-E2E für 3/5/16 Teilnehmer, Freilose, Champion, Eingabefehler und Export vorhanden.
- Seed-Ableitung der K.-o.-Engine refaktoriert, nach Refactoring **Development Tests #40123058094 erfolgreich**: Unit/Behavior/Regression, Desktop/Mobile, TypeScript/Build und npm-Sicherheitsgate.
- Kumulativ vollständig getestete, unveröffentlichte NEXT-Aufgaben seit v0.1.54: **NEXT-56, NEXT-57, NEXT-58, NEXT-59, NEXT-61 (5)**. NEXT-60 bleibt offen.
- Entwicklungsbranch automation/next-56-tournament-runner-unpublished / Draft-PR #47; main und Homepage unverändert. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsrunde 24.10.2026 · NEXT-59 bis NEXT-61 · ohne Publishing
- Letztes verifiziertes Release v0.1.54; main unverändert; Entwicklungsbranch automation/next-56-tournament-runner-unpublished, Draft-PR #47.
- Aktuelle CI #40121383728 auf Commit 0a67a98d: **erfolgreich**; 27 Testdateien, 74 Desktop-/Mobile-E2E, TypeScript/Build grün, npm audit 0 bekannte Schwachstellen.
- NEXT-56: deterministischer Runner mit Pause/Resume/Cancel – vollständig, Tests grün, NICHT VERÖFFENTLICHT.
- NEXT-57: deterministisches K.-o.-Bracket und Freilose – vollständig, Tests grün, NICHT VERÖFFENTLICHT.
- NEXT-58: Archiv-Import/-Export und Wiederaufnahme – vollständig, Tests grün, NICHT VERÖFFENTLICHT.
- NEXT-59: K.-o.-Browseroberfläche mit Champion, Seeds, Freilosen, 3/5/16-Teilnehmer-E2E, ungültigen Eingaben und Desktop/Mobile ergänzt. CI grün; Referenz-Digests, Performance-Grenzen und Refactoring-Charakterisierung aus Akzeptanzkriterien noch offen; daher **NICHT vollständig abgeschlossen**.
- NEXT-60: deterministische paarweise Side-Swap-Bias-Simulation für 2/3/4/16 Teilnehmer, Seeds und Side-Zähler getestet. CI grün; explizite Bias-Grenzwerte, Referenz-Digests und Integration in echten Runner noch offen; daher **NICHT vollständig abgeschlossen**.
- NEXT-61: versionierte JSON-Tabellensnapshots, CSV-Export mit Unicode/Formel-Schutz und Browser-Downloads, 2/16 Teilnehmer, unvollständige Turniere – vollständig implementiert und getestet, **NICHT VERÖFFENTLICHT**.
- Kumulativ seit v0.1.54 **vier vollständig implementierte und verifizierte Aufgaben: NEXT-56, NEXT-57, NEXT-58, NEXT-61**. NEXT-59/60 zählen nicht.
- Keine Homepage-Aktualisierung, kein Merge, kein Release, kein publish.php. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

# RUN_STATE

## Entwicklungsrunde · 24.10.2026, 20:08 Europe/Berlin (ohne Publishing)
- Letztes verifiziertes Release: **v0.1.54**, Publish #40111747415, main 362f8bdb. main unverändert; Entwicklung ausschließlich auf `automation/next-56-tournament-runner-unpublished` / Draft-PR #47.
- **NEU verifiziert in dieser Runde:** NEXT-57 (K.-o.-Engine und Freilose) und NEXT-58 (Round-Robin-Archiv mit Import/Export, Wiederaufnahme und Browser-Regressionsfix). NEXT-56 erneut verifiziert.
- **Kumulativ vollständig implementiert, getestet und NICHT veröffentlicht seit v0.1.54: 3 Aufgaben: NEXT-56, NEXT-57, NEXT-58.** NEXT-59 und NEXT-60 bleiben wegen offener Akzeptanzkriterien ausdrücklich unvollständig.
- NEXT-56 · Serieller deterministischer Runner mit Pause/Resume/Cancel und unveränderlichen Ergebnissen. Teststatus: grün.
- NEXT-57 · Deterministisches K.-o.-Bracket für 2/3/5/8/16 Teilnehmer, Freilose und dokumentierter Tie-Break. Teststatus: grün (Engine/Regression); Browser-K.-o.-UI gehört zu NEXT-59/65.
- NEXT-58 · Validiertes JSON-Turnierarchiv, Fortsetzen ohne Doppelkämpfe, Import/Export im Browser, gültige Sonder-IDs und Ablehnung korrupter Dateien ohne Verlust des laufenden Turniers. Teststatus: grün (Unit/Behavior/Desktop/Mobile).
- NEXT-59 · TEILWEISE: 16-Teilnehmer-Engine-Integration und Round-Robin-Browser-E2E grün; K.-o.-Browser-E2E, deterministische Referenz-Digests und Performance-Dokumentation fehlen. Nicht als abgeschlossen zählen.
- NEXT-60 · TEILWEISE: Seed-/A/B-Audit und optionaler alternierender Spielplan als reine Funktionen vorhanden; quantifizierter Bias-Test und Integration/Abnahmekriterien fehlen. Nicht als abgeschlossen zählen.
- Sicherheitskorrektur: Vitest von 3.x auf 5.x aktualisiert; Audit der installierten Abhängigkeiten **0 bekannte Befunde** (zuvor 1 moderate/2 critical). CI prüft künftig Audit-Befunde; isolierter Workflow-Name `Development Tests` auf Entwicklungsbranch, main unverändert.
- Testlücke behoben: vier zuvor durch `vite.config.ts` ausgeschlossene `src/engine/**/*.test.ts`-Dateien sind jetzt Teil der echten Testmatrix. Archiv-Lebenszyklusvalidierung und Prototyp-Namenskollisionen im Fairness-Audit korrigiert, mit Regressionen abgesichert.
- **Letzter vollständiger grüner Qualitätslauf:** Development Tests #40119157124 und #40119160281 auf Code-SHA 8dc5633a: 335 Unit-/Behavior-/Regressionstests (26 Dateien), 68 Desktop-/Mobile-E2E, Typecheck, Build und npm-audit-Gate erfolgreich.
- Refactoring: Turnierarchiv-Statuskonsistenz zentral validiert; Browser-Vorschau verwendet nach Import die echte importierte Definition statt aus Presets rekonstruierten Daten; Fairness-Zähler ohne geerbte Prototypeigenschaften.
- Publish-Workflow-Runs, die GitHub automatisch nach CI erzeugte, waren **skipped**; kein Publish-Job, kein Merge, kein Deployment, kein publish.php-Aufruf.
- Nächster Schritt: NEXT-59 abschließen, NEXT-60 Audit/Fairness präzisieren; anschließend NEXT-61 Export-Tabelle. Rolling Backlog enthält NEXT-59 bis NEXT-65.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Veröffentlichung der Entwicklung nicht freigegeben.

## Vollständiger CI-Nachweis – 24.10.2026
- Commit e4449845: GitHub CI #40118045416 ERFOLGREICH; TypeScript, Build, 314 Unit-/Behavior-/Regressionstests, 66 Desktop-/Mobile-E2E bestanden.
- Behobene Regression: NEXT-55 erwartete bisherigen Fortschrittstext „0 / 1 Kämpfe abgeschlossen“; neue Laufstatusanzeige bewahrt diese Formulierung.
- Kumulativ seit v0.1.54 unveröffentlicht: NEXT-56, NEXT-57 sowie NEXT-58 (Round-Robin-Archiv und UI), NEXT-59 (16-Teilnehmer-Integrations- und Browser-E2E), NEXT-60 (Seed-/A/B-Audit). K.-o.-UI und vollständige Fairness-Simulation sind weitere Ausbaustufen.
- Sicherheitsgate: npm install meldet 3 Abhängigkeitsschwachstellen (1 moderate, 2 critical); genaue Paket-/Exploit-Bewertung und Abhilfe noch ausstehend. Deshalb **Publish-Reife nicht freigegeben**, trotz grüner funktionaler CI.
- NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.


## Entwicklungsfortsetzung – Turnieroberfläche und Browser-Regression
- NEXT-58: UI-Buttons für Nächster Kampf, Pause/Fortsetzen/Abbrechen, JSON-Export und Import mit Ergebnisfortschritt ergänzt.
- NEXT-59: Desktop-/Mobile-Playwright-Test für Turnierdurchlauf, Pause/Fortsetzen, Download/Upload und Tabellenstand ergänzt.
- NEXT-60: Fairness-Audit mit deterministischer A/B-Seiten- und Seed-Auswertung vorhanden.
- Verifikation der neuesten UI- und E2E-Commits läuft; Freigabe nur nach grünen Checks. npm-audit-Befunde müssen vor Publish-Reife separat eingeordnet werden.
- NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.


## Entwicklungsfortsetzung 24.10.2026 – NEXT-57 bis NEXT-60
- Letzter bestätigter Publish: v0.1.54. main und Homepage bleiben unverändert; Draft-PR #47.
- NEXT-56: bestätigt getestet, unveröffentlicht.
- NEXT-57: deterministisches K.-o.-Bracket, Freilose und Tie-Break; CI #40116730325 erfolgreich.
- NEXT-58: Turnierarchiv mit Schema-/Größen-/Fortschrittsprüfung und Wiederaufnahme implementiert; CI-Gesamtprüfung noch offen.
- NEXT-59: deterministische 16-Teilnehmer-/120-Matches-Integrationsregression implementiert; Browser-E2E und Statistik-UI noch offen.
- NEXT-60: Fairness-Audit mit A/B-Verteilung, Seed-Prüfung und optionalem Seitenwechsel implementiert; CI-Gesamtprüfung noch offen.
- Vorübergehende TypeScript-Fehler (unbenutzte Imports) korrigiert. Veröffentlichung erst nach allen grünen Gates und ausdrücklicher Nutzerfreigabe.
- Kumulativ sicher verifiziert unveröffentlicht: NEXT-56, NEXT-57. NEXT-58–60 erst nach grünem CI als abgeschlossen markieren.
- NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.


## Entwicklungsrunde · 24.10.2026, 18:56 Europe/Berlin (NEUER RELEASE-BASISSTAND)
- **Letzter verifizierter Publish: v0.1.54**. GitHub Publish #40111747415 auf main-Commit 362f8bdb10524f216b3be66e3d9dd1d120e26d46: Upload, Online-Verifikation und Deployment-Status erfolgreich (24.10.2026, 18:29 Europe/Berlin).
- Der alte Stand „13 unveröffentlichte Aufgaben seit v0.1.53“ ist HISTORISCH und wurde durch die erfolgreiche Veröffentlichung abgelöst; NEXT-40 und NEXT-44 bis NEXT-55 gehören zum veröffentlichten Release v0.1.54.
- Aktueller Entwicklungsbranch: automation/next-56-tournament-runner-unpublished; Draft-PR #47. main bleibt unverändert.
- NEXT-56: serieller deterministischer Runner mit immutable Ergebnis-Snapshots, Pause/Fortsetzen/Abbrechen an Matchgrenzen; Unit-/Behavior-/Performance-Tests für 2/4/16 Teilnehmer, Seeds und Timeout geschrieben.
- **Verifikation NEXT-56: CI #40113922862 auf Code-Commit 453f5ef5 erfolgreich** – 314 Unit-/Behavior-/Regressionstests, 64 Desktop-/Mobile-E2E, TypeScript und Build grün.
- Kumulativ seit letztem verifiziertem Release: **1 vollständig implementierte und getestete, unveröffentlichte Aufgabe: NEXT-56**.
- Nächster Schritt: CI prüfen, ggf. Fehler korrigieren; dann NEXT-57 K.-o.-Bracket, NEXT-58 Import/Export.
- Refactoring: Runner ist als reines, UI-unabhängiges Modul isoliert; Engine/Seed-Zuweisung bleibt unverändert. Vollständiger CI-Lauf #40114214478 auf HEAD 9115c0c1 nach Code-, Dokumentations- und E2E-Änderungen grün: 314 Unit-/Behavior-/Regressionstests, 64 Desktop-/Mobile-E2E, TypeScript und Build. Zwei vorübergehende E2E-Fehlläufe durch fest verdrahtete NEXT-56-Backlog-Beschriftung wurden durch generische NEXT-Nummernprüfung behoben; abschließender Test grün.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, kein Deployment, kein publish.php.

## Fortsetzung der Entwicklungsrunde · 24.10.2026, 18:12 Europe/Berlin
- NEU abgeschlossen: NEXT-55 · Responsiver Turnierplanungsdialog mit 2–16 Teilnehmern, Preset- und Namenswahl, validierten Seeds/Ticklimits, deterministischen Paarungen, Fortschritt 0/N und Punktetabelle.
- Verifiziert: Development Tests #40110813524 auf Code-SHA 9f17bc65: 303 Unit-/Behavior-/Regressionstests, 64 Desktop-/Mobile-E2E, Typecheck und Build erfolgreich.
- Testreview: zuerst TypeScript-Tupeltyp korrigiert; danach Browser-Regression wegen mehrdeutigem Seed-Label korrigiert. Vollständiger erneuter Testlauf grün.
- Refactoring/Isolation: Turnier-Vorschau verwendet reine Tournament-Engine-Module; keine Mutation von Sandbox-State oder Sandbox-RNG; dynamische Inhalte per textContent statt HTML-Injektion.
- Kumulativ 13 vollständig getestete NEXT-Aufgaben seit v0.1.53: NEXT-40, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55.
- Nächster Schritt: NEXT-56 · deterministischer serieller Turnier-Runner; NEXT-57 K.-o.-Bracket.
- Veröffentlichungsstatus extern nicht unabhängig bestätigt; bei manueller externer Veröffentlichung ohne GitHub-Merge: **Veröffentlichungsstatus ungeklärt**.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, kein Deployment, kein publish.php.


## Aktuelle Entwicklungsrunde · 24.10.2026, 18:00 Europe/Berlin
- branch: `automation/next-40-energy-reserve-unpublished`; PR #46 Draft, main bleibt bei b90c7448 / v0.1.53.
- completed_this_round: NEXT-54 (1 von maximal 3); NEXT-55/56 nicht begonnen.
- verified: #40109944097 auf Code-SHA 431ee335: 303 Unit-/Behavior-/Regressionstests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.
- functionality: immutable Result-Snapshots, 3/1/0-Punkte, Struktur-Differenz, stabile Rangfolge, unvollständige Tabellen; strenge Match-/Seed-/ID-/Werteprüfung.
- refactoring: Tabellenberechnung in reines, von UI/Simulation entkoppeltes Modul `src/engine/tournament-standings.ts` ausgelagert; vollständige Tests danach erfolgreich.
- current_next: NEXT-55 (responsives Turnier-UI), danach NEXT-56 (Runner).
- cumulative_unpublished: NEXT-40, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54 (12).
- final_documentation_head_ci: Development Tests #40110105950 auf Dokumentations-HEAD a6eb67d0 grün (303 Unit/Behavior, 60 Desktop/Mobile, Typecheck/Build).
- live_website_status: Veröffentlichung extern nicht unabhängig bestätigt; bei manueller Veröffentlichung ohne GitHub-Merge **Veröffentlichungsstatus ungeklärt**.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, kein Deployment, kein publish.php.


## Aktuelle Entwicklungsrunde · 24.10.2026, 17:00 Europe/Berlin
- branch: `automation/next-40-energy-reserve-unpublished`
- pull_request: #46 (Draft; NICHT MERGEN)
- main_sha: `b90c7448419a134cd5e764e1243dc04fd5958715` (per GitHub-Compare weiterhin unverändert)
- last_documented_verified_release: v0.1.53 (laut BACKLOG.md / PROJECT_STATE.md)
- live_website_check: nicht unabhängig bestätigt; bei externer manueller Veröffentlichung ohne GitHub-Merge **Veröffentlichungsstatus ungeklärt**
- package_version_on_branch: 0.1.54 (unveröffentlichter Release-Kandidat)
- current_next: NEXT-54 · Turnierauswertung
- round_completed: NEXT-51, NEXT-52, NEXT-53 (3 von maximal 3)
- round_status: ALLE DREI IMPLEMENTIERT UND VOLLSTÄNDIG GETESTET
- tests: Development Tests #40105284320 (Replay-Refactoring), #40105438397 (290 Unit/Behavior, 60 Desktop/Mobile), #40105486356 (297 Unit/Behavior, 60 Desktop/Mobile), jeweils Typecheck/Build erfolgreich
- deterministic_checks: Immutable-Snapshots; Turniermodell-Grenzen 2/16, IDs, Seeds und JSON-Roundtrip; Round Robin 2/3/4/16, Paarungsformel, Reihenfolge und Seeds bis MAX_SAFE_INTEGER
- refactoring: `deepFreeze` in eigenständiges reines Modul verschoben; Recorder-Runtime-Abhängigkeit in Replay-Format und State beseitigt; bestehende Recorder-API unverändert
- blocker: keiner für Entwicklung; finalen Testlauf nach Dokumentationsänderungen separat prüfen
- publishing: AUSDRÜCKLICH VERBOTEN. Kein Merge auf main, kein Publish/Deployment, kein Aufruf von publish.php.
- publish_workflow_on_main: reagiert weiterhin auf alten CI-Namen; kein Release-Workflow ausgelöst
- unrelated_prs: #5 und #8 nicht verändert

## Kumulative vollständig getestete, seit v0.1.53 nicht in main integrierte Aufgaben
| NEXT | Funktion | Nachweis | Status |
| --- | --- | --- | --- |
| 40 | Energiereserve A/B (0–100 %), Validierung, Schussfreigabe | Development Tests #40085113036 · 246 Unit/Behavior, 48 Desktop/Mobile | Implementiert, getestet, unveröffentlicht |
| 44 | Deterministischer Event Recorder und unveränderliche Snapshots | #40088595774 · 252 / 48 | Implementiert, getestet, unveröffentlicht |
| 45 | Versioniertes Replay-JSON und Schema-/Tick-/ID-Validierung | #40088913689 · 258 / 48 | Implementiert, getestet, unveröffentlicht |
| 46 | Replay-Import/-Export mit 2-MB-Grenze und Live-Isolation | #40092321506 · 262 / 50 | Implementiert, getestet, unveröffentlicht |
| 47 | Eventbasierter Replay-Player mit Play/Pause/Step/Reset | #40096610594 · 268 / 52 | Implementiert, getestet, unveröffentlicht |
| **48 – NEU** | Grafische Replay-Zeitleiste, Seek, Zustands-/Effektrekonstruktion | **#40100789839 · 274 / 56** | **Implementiert, getestet, unveröffentlicht** |
| **49 – NEU** | Kampfstatistiken A/B mit Deduplizierung und Überkill-Begrenzung | **#40100953952 · 281 / 58** | **Implementiert, getestet, unveröffentlicht** |
| **50 – NEU** | 48 Strategie-/Seed-Roundtrips, Hash-Digests, Import-Härtung | **#40101113261 · 284 / 60** | **Implementiert, getestet, unveröffentlicht** |

| **51 – NEU** | Replay-Refactoring: Immutable-Helper und Recorder-Entkopplung | #40105284320 · vollständige Development Tests | **Implementiert, getestet, unveröffentlicht** |
| **52 – NEU** | Validiertes, unveränderliches Turnierdatenmodell | #40105438397 · 290 Unit/Behavior, 60 Desktop/Mobile | **Implementiert, getestet, unveröffentlicht** |
| **53 – NEU** | Deterministischer Round-Robin-Spielplan und Seeds | #40105486356 · 297 Unit/Behavior, 60 Desktop/Mobile | **Implementiert, getestet, unveröffentlicht** |
| **54 – NEU** | Turnierauswertung, 3/1/0 Punkte, Reststruktur-Differenz, immutable Ergebnis-Snapshots | #40109944097 · 303 Unit/Behavior, 60 Desktop/Mobile | **Implementiert, getestet, unveröffentlicht** |
| **55 – NEU** | Responsiver Turnierplanungsdialog, 2–16 Teilnehmer, Presets, Paarungen, Fortschritt und Tabelle, Sandbox-Isolation | #40110813524 · 303 Unit/Behavior, 64 Desktop/Mobile | **Implementiert, getestet, unveröffentlicht** |

**Gesamtzahl vollständig getesteter, seit v0.1.53 nicht in main integrierter Aufgaben: 13.**
- NEXT-55 abgeschlossen; NEXT-56 bis NEXT-63 geplant, noch nicht implementiert.
- Veröffentlichung auf der externen Website konnte in diesem Lauf nicht unabhängig abgerufen werden; falls eine manuelle externe Veröffentlichung ohne GitHub-Merge erfolgt ist, ist deren Status **Veröffentlichungsstatus ungeklärt**.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Nächster Haltepunkt
1. Letzten vollständigen Development-Tests-Lauf auf dem aktuellen Dokumentations-HEAD prüfen; keine neue Aufgabe als getestet melden, bevor der Test grün ist.
2. Nächster Lauf: NEXT-54 Turnierauswertung; Fehler vor Features, maximal drei Aufgaben.
3. Rolling Backlog und Test-/Release-Dokumentation synchron halten; keine Homepage-Aktualisierung.
4. Keine anderen Automationen verändern; PR #46 bleibt Draft und main unverändert.
