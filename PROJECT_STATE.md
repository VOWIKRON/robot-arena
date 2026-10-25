## NEXT-77 abgeschlossen · 25.10.2026, 22:05 MEZ · NICHT VERÖFFENTLICHT
- **NEU vollständig implementiert und verifiziert: NEXT-77** – verständliche Quota-/Security-/Download-Fehler; konsolidierter Blob-Download mit URL-Cleanup; lokale Opt-out-Löschreihenfolge; optimistischer Versionsschutz vor stillen Überschreibungen durch andere Tabs; explizite Wiederaufnahme nach validiertem Restore.
- **Isolierte QA #40233631492 SUCCESS** auf Code-/Test-SHA `f77c81b548efba5540c9af59af8895256b9c62e5`: **388/388 Unit-/Behavior-/Regression-/Determinismustests (33 Dateien)**, **134/134 Desktop-/Mobil-Playwright**, TypeScript, npm audit 0 bekannte Schwachstellen, Build und reproduzierbarer Zweitbuild erfolgreich. 5 neue Unit-Tests und 4 neue Browserfälle je Desktop/Mobil. Der Dokumentationscommit danach enthält keinen Produktivcode.
- **Refactoring:** Gemeinsamer Download-Helper und separate `TournamentAutosaveGuard`-Klasse; Simulationsengine, Seeds und Archivschema unverändert.
- **Konkurrierende Tabs:** Speicherrevision vor jedem Schreib-/Löschvorgang prüfen und externe `storage`-Events beachten. Das ist optimistischer Konfliktschutz, **keine atomare Compare-and-Swap-Transaktion**; extrem zeitgleiche Schreibvorgänge bleiben als Härtungsbedarf im Rolling Backlog dokumentiert.
- **Letzter bestätigter Live-Release:** v0.1.56, main `3d516317128578e374ec39eacd8991649c1815cc`, GitHub-Deployment-Status `robot-arena/deployment: success` vom 25.10.2026 13:19 UTC. Kein neues Deployment durch diese Runde.
- **Kumulativ fertig, vollständig getestet, aber NICHT veröffentlicht: 6 NEXT-Aufgaben:**
- NEXT-69 – Eigene Roboterpresets in Turnieren (391 Unit/Behavior/Regression + 134 Browser; PR #53).
- NEXT-70 – Kampfexport CSV/JSON (387 + 130; PR #57).
- NEXT-71 – Gemeinsame Integration 69+70 (395 + 4 Konfliktprüfungen + 144 Browser; PR #59).
- NEXT-74 – Robuste Turnierimport-Validierung (392 + 128; PR #61).
- NEXT-75 – Archivversions-/Kompatibilitätsprüfung (393 + 126; Branch feature/NEXT-75-archive-compatibility).
- NEXT-77 – Autosave-Konflikte und Speicher-/Downloadfehler (388 + 134; Branch feature/NEXT-77-storage-export-errors; **NEU**).
- **Aktuelle Runde:** NEXT-79e (weiterhin offen, echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme fehlt); NEXT-77 (NEU fertig); keine dritte NEXT-Aufgabe begonnen.
- **Nächste Schritte / Rolling Backlog:** (1) NEXT-79e praktische Screenreader-/Touch-/Kontrastabnahme und Fixes; (2) gemeinsame Integrations-QA von NEXT-69/70/71/74/75/77 auf separatem, nicht deployendem Teststand; (3) NEXT-76 Suche/Filter mit 120 Paarungen, Unicode/HTML, Tastatur, Desktop/Mobil; (4) NEXT-72 Best-of-N, danach NEXT-73 Kampfstatistik; (5) atomare Multi-Tab-Speicherkoordination (z. B. Web Locks mit Browser-Fallback) gesondert spezifizieren und testen, falls strikt gleichzeitige Schreibvorgänge garantiert verhindert werden sollen; (6) Release nur nach ausdrücklicher Nutzerfreigabe.
- **Branch/Workflow-Schutz:** `feature/NEXT-77-storage-export-errors`, `ci.yml` auf main begrenzt, isolierte `isolated-next77.yml` ohne Publishing; kein PR gegen main, weil der dortige `pull_request`-Trigger den regulären Development-Tests/Publish-Zyklus auslösen könnte.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Statuskorrektur 25.10.2026, 14:00 MEZ · main parallel verändert · KEIN PUBLISHING durch diese Runde
- Nach der Entwicklungsschreibfolge wurde **main unabhängig** um Commit `ff81817644df` erweitert (GitHub-Commit-Nachricht „release: NEXT-64 reproducible builds and security CI“, nur `.github/workflows/ci.yml` und `package-lock.json`). Dieser Commit stammt **nicht** aus der hier dokumentierten Entwicklungsrunde; wir haben weder main verändert noch ein Deployment ausgelöst.
- **NEXT-64: in main integriert, aber tatsächlicher Live-Veröffentlichungsstatus ungeklärt.** GitHub-Publish-Workflow/Website konnten nicht erfolgreich verifiziert werden; daher NEXT-64 nicht aus der kumulativen Liste entfernen. NEXT-63 weiterhin nicht als live bestätigt. Der Entwicklungssammelbranch liegt nach der Änderung zuletzt 208 Commits vor und 5 hinter main; kein pauschaler Merge zulässig.
- Aktuelle neue NEXT-79e-Playwright-Regression weiterhin ohne verifizierte Voll-CI; letzter sicher grüner Code-Run #40191756134 (383 Unit/Behavior/Regression, 132 E2E) auf älterem SHA. **Kumulativ 6 vollständige NEXT (63/64/66/67/68/78) plus 4 Teilaufgaben (79a–d), wobei NEXT-64 ausdrücklich „Veröffentlichungsstatus ungeklärt“ trägt.**
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell** (für die Änderungen dieser Entwicklungsrunde). Keine andere Automation verändert.

## Entwicklungsrunde 25.10.2026, 14:00 MEZ · NEXT-79e Tastatur-/Screenreader-Namensmatrix · KEIN PUBLISHING
- **Aktuelle Runde: NEXT-79e (weiter offen).** Neuer Desktop-/Mobil-Playwright-Test: Turnier per Tastatur öffnen; zugängliche Dialog- und Feldnamen prüfen; 3-Teilnehmer-Plan mit Enter anlegen; Pause/Fortsetzen/Automatik ausschließlich per Enter; Live-Fortschritt 0/3 → paused → 3/3; Turniertabelle bei 375px mit Pfeiltaste horizontal bedienen; Escape schließt und stellt Fokus auf Turnier-Button zurück.
- **Refactoring:** fünf wiederholte Prüfungen auf horizontale Seitenüberbreite in der Usability-E2E-Datei auf gemeinsamen typisierten Helper `expectNoPageOverflow()` vereinheitlicht; unveränderte Simulationsengine, Seeds und Turnierarchive.
- **GitHub-Commits:** `ca7f9801` (neue E2E-Regression + Helper), `89fd44fd` (Viewport-Fehlermeldung refaktoriert); Quelltext auf dem Entwicklungsbranch zurückgelesen.
- **Teststatus:** Neue E2E-Regression ist eingecheckt, **Voll-CI auf neuem Commit noch NICHT bestätigt**. Letzte tatsächlich geprüfte vollständige CI **#40191756134** auf Code-SHA `64553e0f82f0`: **383/383 Unit-/Behavior-/Regressionstests, 132/132 Desktop-/Mobil-E2E**, Typecheck, Build, Audit=0 und reproduzierbarer Build erfolgreich; dieser Nachweis gilt ausdrücklich nicht für die neue E2E-Änderung. NEXT-79e bleibt wegen CI-Nachweis, echter NVDA/VoiceOver- und visueller Touch-Abnahme sowie Integration mit main offen.
- **Kumulativ seit letzter bestätigter Live-Version v0.1.55: 6 vollständig getestete, aber unveröffentlichte NEXT-Aufgaben:** NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (Audit/reproduzierbare Builds), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministische Replays), NEXT-68 (Autosave/Restore), NEXT-78 (Roboter/HUD innerhalb der Arena); außerdem die abgeschlossenen Teilaufgaben NEXT-79a (UX-Baseline), NEXT-79b (Kampfsteuerung), NEXT-79c (Turniersteuerung), NEXT-79d (Feldhilfe/Validierung). **Gesamt: 6 ganze NEXT-Aufgaben + 4 abgeschlossene NEXT-79-Teilaufgaben = 10 Einträge. Neu vollständig abgeschlossen in dieser Runde: 0.**
- **Release-Grenze:** Der Nutzer hat NEXT-63 und NEXT-64 separat zur Veröffentlichung freigegeben. Beide sind weiterhin **NICHT veröffentlicht**, da der Entwicklungsbranch auch weitere Änderungen enthält (zuletzt 194 Commits vor und 4 hinter main). Kein unkontrollierter Merge; selektive Isolierung und Release-SHA-Test bleiben vor manueller Veröffentlichung erforderlich.
- **Rolling Backlog:** P0 aktuelle Voll-CI und bei Fehlern Fix + Retest; NEXT-79e NVDA/VoiceOver-Fokus- und Live-Region-Abnahme, visuelle 375/768/1280px-Touch-Abnahme, dann finale Regression; P1 NEXT-69 validierte Turnierpresets, NEXT-70 Match-Export, NEXT-71 Release-Isolation/Refactoring; NEXT-72–77 erhalten.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein Release-Commit, kein publish.php, kein Deployment, keine Homepage-Änderung.

# VERBINDLICHE ENTWICKLUNGSREGEL – HÖCHSTE PRIORITÄT (25.10.2026)
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

## 25.10.2026, ca. 09:00 MEZ – NEXT-79c/d P1-Härtung, CI-Abnahme offen · NICHT VERÖFFENTLICHT
- NEXT-79c: Import-/Restore-Validierung vor Stoppen des Auto-Runners; fehlerhafte Dateien oder fehlender lokaler Snapshot lassen aktiven/pausierten Lauf samt Fortsetzungsabsicht unverändert. Nach gültigem Restore spiegeln Teilnehmer-Preset-Selects die geladenen Roboter statt alte Entwurfswerte. Zwei neue Playwright-Fälle für Import-/Restore-Sicherheit und Preset-Wiederherstellung, noch nicht ausgeführt.
- NEXT-79d: Zentraler Eingabe-Fehler-Helper fokussiert das fehlerhafte Turnierfeld, setzt `aria-invalid` und verknüpft `tournament-feedback` über `aria-describedby`; bei Eingabeänderung werden die Fehlerattribute entfernt. Browser-Regression für Seed, Ticklimit, fehlende/doppelte Namen, noch nicht ausgeführt.
- GitHub-Commits und Testdatei-Änderungen auf Entwicklungsbranch seriell geschrieben und zurückgelesen. Refactoring ohne Änderung der Simulation. Aktuelle Voll-CI weiterhin nicht nachgewiesen (DNS-Blockade beim Clone; GitHub-Run-Abfrage leer). Letzte nachweislich grüne CI #40153366228: 383 Unit/Behavior/Regression und 102 E2E vor NEXT-79c/d.
- Kumulativ seit bestätigt live v0.1.55: **6 zuvor vollständig getestete, nicht veröffentlichte NEXT-Aufgaben** NEXT-63/64/66/67/68/78; NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d in Abnahme; NEXT-79e offen. Draft-PR #48; Branch weiterhin hinter main. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

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

## 25.10.2026, ca. 08:00 MEZ – NEXT-79c Automatik-Fortsetzung bei Entwurfsänderungen korrigiert · NICHT VERÖFFENTLICHT
- `stopTournamentAuto()` wurde zuvor beim Versuch einer aktiven Turnier-Neuanlage und beim bloßen Bearbeiten der Teilnehmerzahl ausgeführt. Nach dem Refactoring stoppen Entwurfsänderungen keinen aktiven oder pausierten automatischen Lauf mehr; erst eine gültige Neuanlage beendet die bisherige Automatik.
- Playwright-Regression für 3 Teilnehmer: Auto → Pause → ungültige/geänderte gültige Konfiguration und Teilnehmer-Update → Fortsetzen → 3/3 automatisch. Produktionscode und Test committed und aus GitHub zurückgelesen; **aktuelle Voll-CI weiterhin ohne Nachweis**, Test noch nicht als bestanden gewertet. NEXT-79c/d offen.
- Letzte bestätigte Live-Version v0.1.55; kumulativ 6 vollständig CI-getestete, NICHT veröffentlichte NEXT-Aufgaben: NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (reproduzierbare Builds/Audit), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministisches Replay), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD-Arenagrenzen). NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d nicht aktuell vollständig CI-abgenommen; NEXT-79e offen. Letzte bestätigte Voll-CI #40153366228 (383 Unit/Behavior/Regression, 102 Desktop/Mobil-E2E) vor 79c/d. Draft-PR #48; kein Merge.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 25.10.2026, 07:00 MEZ – NEXT-79c verhindert Datenverlust durch Neuanlage eines aktiven Turniers · NICHT VERÖFFENTLICHT
- Ein aktiver Turnierlauf wird bei geänderten Einstellungen nicht mehr durch „Spielplan erstellen“ ersetzt; die Bedienung verlangt vorherigen expliziten Abbruch. Bestehende Engine/Simulation unverändert. Playwright-Regression für ungültige/geänderte Eingaben, Cancel und Neustart im Entwicklungsbranch ergänzt und zurückgelesen.
- **Aktuelle vollständige CI noch nicht nachweisbar** (GitHub-Commit-Runs-/Statusabfrage ohne Ergebnis; lokaler Clone wegen DNS nicht möglich). NEXT-79c und NEXT-79d bleiben offen, NEXT-79e folgt. Letzte bestätigte CI vor diesen Änderungen: #40153366228 (383 Unit/Behavior/Regression, 102 Desktop/Mobil-E2E).
- **Kumulativ 6 vollständig CI-getestete, unveröffentlichte NEXT-Aufgaben seit Live-v0.1.55:** 63, 64, 66, 67, 68, 78. NEXT-79a/b getestet; 79c/d noch nicht vollständig abgenommen. Draft-PR #48, keine Veröffentlichung.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 25.10.2026, 06:00 MEZ – NEXT-79c Pause-Aktionsgate gehärtet, CI-Abnahme offen · NICHT VERÖFFENTLICHT
- NEXT-79c: `syncTournamentActions()` deaktiviert nun während `paused` sowohl den Einzelkampf- als auch den Automatik-Startknopf. Fortsetzen bleibt die einzige explizite Wiederaufnahme; Desktop-/Mobil-Regression ergänzt. Quellcode und Test nach GitHub-Schreiboperation zurückgelesen. **Kein vollständiger CI-Nachweis auf dem aktuellen Head; NEXT-79c bleibt offen.**
- NEXT-79d: bereits implementierte ARIA-/Hilfetexte warten ebenfalls auf aktuelle vollständige CI. NEXT-79e folgt erst nach Abnahme.
- Refactoring nur der Aktionsfreigabe aus dem vorhandenen Runner-Status; deterministische Simulation, Seeds und Turnierarchive unverändert. Letzte bestätigte CI #40153366228 (383 Unit/Behavior/Regression, 102 E2E) betrifft den vorherigen Stand.
- Kumulativ 6 vollständig CI-getestete, unveröffentlichte NEXT-Aufgaben seit bestätigtem Live-v0.1.55: 63, 64, 66, 67, 68, 78. NEXT-79a/b getestete Teilaufgaben; 79c/d offen, 79e geplant. Draft-PR #48, vier Commits hinter main; kein Merge/Publish.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 25.10.2026, 05:00 MEZ – NEXT-79c/d im Entwicklungsbranch, aktuelle CI noch nicht bestätigt · NICHT VERÖFFENTLICHT
- NEXT-79c (Turnierschritte, Keyboard, statusabhängige Aktionen) weiterhin in CI-Abnahme; nicht abgeschlossen.
- NEXT-79d: Verständliche Hilfetexte und `aria-describedby` für Strategie, Energiereserve, Startwert/Seed, Ticklimit, Turnierformat sowie Erklärung der Reststruktur implementiert. CSS-Hilfestil und Browser-Regressionen für Desktop/Mobil, Fokus und 44px-Navigation ergänzt. **CI für diese Änderungen ausstehend; noch nicht abgeschlossen.**
- Letzte grüne vollständige CI vor NEXT-79c/d: #40153366228 (383 Unit/Behavior/Regression, 102 E2E). Neue Tests noch nicht als bestanden melden. Simulation und RNG unverändert.
- Kumulativ 6 zuvor vollständig CI-getestete, NICHT veröffentlichte NEXT-Aufgaben seit Live-v0.1.55: 63, 64, 66, 67, 68, 78. NEXT-79a/b getestet, 79c/d unbestätigt, 79e offen. Draft-PR #48; kein Merge/Publish/Deployment.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 25.10.2026, 04:00 MEZ – NEXT-79c Entwicklungsstand, keine Testfreigabe, NICHT VERÖFFENTLICHT
- Drei klar beschriftete Turnierschritte mit Tastatur-Sprungnavigation und gruppierten Aktionen in `src/main.ts`; responsives Layout in `src/style.css`. Button-Freigabe zentral aus dem Runner-Status abgeleitet, keine Engine-Änderung.
- Neue Playwright-Tests für Desktop/Mobil, Keyboard, Erstellen → Kampf → Ergebnisse, Sicherung und ungültige Aktionen committed. **Aktuelle vollständige CI ausstehend; NEXT-79c bleibt offen.** Letzte bestätigte CI #40153366228: 383 Unit/Behavior/Regression, 102 E2E grün (vor NEXT-79c).
- **Unveröffentlicht und vollständig CI-verifiziert seit Live-v0.1.55:** NEXT-63, 64, 66, 67, 68, 78 (6). NEXT-79a/b als Teilaufgaben getestet; NEXT-79c in Abnahme; 79d/e offen.
- Entwicklungsbranch/Draft-PR #48; kein Merge, kein Release, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 25.10.2026, 03:00 MEZ – NEXT-78 und UX-Baseline/-Steuerung erfolgreich getestet, unveröffentlicht
- **NEU abgeschlossen:** NEXT-78 P0 Raptor-/Titan-Grenzen inkl. HUD, echte Flucht und Rand/Ecken; CI #40144987038 (383 Unit, 96 E2E) grün.
- **NEU getestete Teilaufgaben NEXT-79a und NEXT-79b:** 375/768/1280px-Browser-Baseline; Haupt-Kampfaktionen von Werkzeugen getrennt; eindeutiger Kampfstatus bereit/läuft/pausiert. Development Tests #40153090696 auf 88a415e9: 383 Unit-/Behavior-/Regressionstests (32 Dateien), 102 Desktop-/Mobil-E2E, Typecheck, Build, npm-Audit-Gate und reproduzierbare Clean-Builds erfolgreich. NEXT-79c/d/e noch offen.
- **Kumulativ 6 vollständig verifizierte, unveröffentlichte NEXT-Aufgaben seit Live-v0.1.55:** NEXT-63 (Zugänglichkeit/Touch), NEXT-64 (Lockfile/CI), NEXT-66 (Matchdetails), NEXT-67 (deterministisches Replay), NEXT-68 (lokale Turniersicherung), NEXT-78 (Raptor bleibt vollständig innerhalb der Arena). NEXT-79 noch offen und nicht separat zählen.
- Entwicklungsbranch / Draft-PR #48, Commit 88a415e9; main weiterhin vier Commits voraus. Kein Merge, kein Release, kein Homepage-Update.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 25.10.2026, 02:00 MESZ – P0 NEXT-78 weiterhin in Verifikation (nicht veröffentlicht)
- Regression gegen Scheinabdeckung verstärkt: alle acht Fluchtrichtungen müssen nun tatsächlich Bewegung und Randkontakt nachweisen, statt nur Koordinaten von untätigen Robotern zu prüfen. Commit `63a0b632`; GitHub-Schreibresultat durch erneutes Lesen geprüft.
- **Keine vollständige aktuelle CI bestätigt:** NEXT-78 offen; NEXT-79 UX-Audit dokumentiert, Umsetzung offen. Vorherige CI #40137115159 (372 Unit/Behavior/Regression, 92 E2E) betrifft nur NEXT-63/64/66/67/68.
- **Unveröffentlichte bestätigte Abschlüsse: 5** – NEXT-63, NEXT-64, NEXT-66, NEXT-67, NEXT-68. Letztes verifiziertes Live-Release v0.1.55. Draft-PR #48, Entwicklungsbranch; kein Merge/Publish.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 25.10.2026, 01:00 MESZ – priorisierter P0-Fix in Verifikation (nicht veröffentlicht)
- **NEXT-78:** Rendering-Ursache des Raptor-Randfehlers analysiert: Engine-Koordinaten 0..100, Robotergrafik/HUD in festen Pixelmaßen und bisher nicht vollständig innerhalb der Arena gehalten. CSS-Clamp mit 24/27px Chassis-Halbe und 53/56px HUD-Kopffreiraum ergänzt. Simulation, Seeds, Rohpositionen und Replay unverändert. Neue Engine-/Browser-Regressionen committed, aber vollständige CI noch nicht bestätigt; NEXT-78 **offen**.
- **NEXT-79:** UX-Quellcodeanalyse in `USABILITY_AUDIT.md` mit Prioritäten und testbaren 79a–79e. Umsetzung/Browser-Abnahme noch offen.
- **Letztes verifiziertes Live-Release:** v0.1.55. **5 verifizierte, NICHT veröffentlichte Aufgaben:** NEXT-63 (Zugänglichkeit), NEXT-64 (Lockfile/CI), NEXT-66 (Kampfergebnisse), NEXT-67 (Replay), NEXT-68 (Autosave). Testbasis CI #40137115159: 372 Unit-/Behavior-/Regressionstests und 92 Desktop-/Mobile-E2E. NEXT-78/79 zählen bis zum vollständigen Abschluss nicht dazu.
- **Branch:** `automation/next-56-tournament-runner-unpublished`, Draft-PR #48; nicht nach main mergen. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

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

## Entwicklungsrunde 24.10.2026, 22:00 MESZ · NEXT-64/66 verifiziert (ohne Publishing)
Development Tests #40128110261 auf e23323ef: 29 Testdateien, 358 Unit-/Behavior-/Regressionstests, 82 Desktop-/Mobil-E2E, TypeScript/Build, zweimaliger sauberer npm-ci-Install und byteidentischer Dist-SHA256 (1488f94b…), npm audit 0 bekannte Advisories; vollständig erfolgreich.
NEXT-64: festes npm-Lockfile, npm ci, 2 identische Dist-Builds und Sicherheitsgate. NEXT-66: validierte unveränderliche Match-Details, Unicode/HTML-Sicherheit, Pending/Draw/Timeout, Desktop/Mobil. Beide vollständig und neu abgeschlossen; NEXT-67 folgt. Refactoring: reine Engine-Details von UI getrennt.
**Kumulativ 10 verifizierte NEXT-Aufgaben seit v0.1.54: 56–64 und 66 (NEXT-65 ist Duplikat).** NEXT-56–62: Veröffentlichungsstatus ungeklärt; NEXT-63/64/66: nur Draft-PR #48, NICHT VERÖFFENTLICHT. Letzte unabhängig bestätigte Live-Version v0.1.54 (#40111747415). main enthält v0.1.55 (809fe86c), aber kein neuer erfolgreicher Publish-Lauf wurde bestätigt; tatsächlicher Live-Status für NEXT-56–62 bleibt 'Veröffentlichungsstatus ungeklärt'. NEXT-63/64/66 sind ausschließlich auf dem Entwicklungsbranch / Draft-PR #48, sicher NICHT veröffentlicht.
**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

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

## Neuer Entwicklungsstand · 24.10.2026, 18:56 Europe/Berlin
- **Release v0.1.54 erfolgreich veröffentlicht und von GitHub Actions verifiziert:** Publish #40111747415, Commit 362f8bdb (Upload, Live-Checks, Deployment-Status grün). Die 13 NEXT-Aufgaben 40 und 44–55 gehören nun zum veröffentlichten Basisstand.
- Neue unveröffentlichte Entwicklung auf Branch automation/next-56-tournament-runner-unpublished, Draft-PR #47, ohne Merge/Deployment.
- NEXT-56 implementiert und verifiziert: CI #40113922862, 314 Unit-/Behavior-/Regressionstests und 64 Desktop-/Mobile-E2E sowie TypeScript/Build erfolgreich. Serienausführung pro Match, immutable Snapshots, Pause/Resume/Cancel, deterministische Seeds.
- Ab NEXT-56 zählt der neue kumulative unveröffentlichte Stand; aktuell **1 bestätigte, unveröffentlichte Aufgabe: NEXT-56**.
- Nach NEXT-56 folgen NEXT-57 K.-o.-Bracket, NEXT-58 Turnier-Import/-Export, NEXT-59 Browser-Integration und E2E.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unveröffentlichte Entwicklungsfortsetzung (24.10.2026, 18:12 Europe/Berlin)
- NEXT-55 abgeschlossen: unabhängiger responsiver Turnierdialog, 2–16 benennbare Teilnehmer mit Raptor/Titan-Presets, Seed/Ticklimit-Validierung, Round-Robin-Paarungen, Fortschritt und Tabelle. Noch keine automatische Turnierausführung.
- Browser-Regression für mehrdeutiges Seed-Label behoben; TypeScript-Tupeltyp korrigiert; vollständiger Testlauf #40110813524 auf SHA 9f17bc65 grün (303 Unit/Behavior, 64 Desktop/Mobile, Typecheck/Build).
- Kumulativ 13 unveröffentlichte Aufgaben seit v0.1.53 (NEXT-40, 44–55). Nächster Schritt NEXT-56; PR #46 Draft, main unverändert, kein Publish/Deployment.
- Veröffentlichungsstatus der externen Homepage unabhängig ungeklärt; **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell**.

## Unveröffentlichte Entwicklungsrunde (24.10.2026, 18:00 Europe/Berlin)
- NEXT-54: Deterministische Round-Robin-Auswertung (3/1/0 Punkte, Spiele/Siege/Remis/Niederlagen, Reststruktur-Differenz, stabile Sortierung und unvollständige Turniere); doppelte/ungültige Match-IDs, Seeds, Teilnehmer und Reststruktur werden abgewiesen. Validierte Ergebnis-Snapshots sind unveränderlich. Development Tests #40109944097 auf Commit 431ee335: 303 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.
- Kumulativ 12 getestete Aufgaben seit v0.1.53, NICHT VERÖFFENTLICHT: NEXT-40, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54.
- Nächster Schritt NEXT-55; Rolling Backlog NEXT-55 bis NEXT-63. PR #46 Draft, main unverändert, kein Publish/Deployment.
- Vollständige Development Tests nach Dokumentationsänderungen #40110105950 auf a6eb67d0 grün.

## Unveröffentlichte Entwicklungsrunde (24.10.2026, 17:00 Europe/Berlin)
- NEXT-51 abgeschlossen: `deepFreeze` aus Recorder in `src/engine/immutable.ts` extrahiert; Replay-Format/State ohne Runtime-Abhängigkeit vom Recorder; Recorder-Export rückwärtskompatibel. Charakterisierungstests und vollständige CI #40105284320 grün.
- NEXT-52 abgeschlossen: unveränderliches, validiertes Turniermodell für 2–16 Teilnehmer, Format, Seed, maxTicks und JSON-Roundtrip; doppelte IDs/ungültige Werte abgewiesen. #40105438397 grün: 290 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E.
- NEXT-53 abgeschlossen: deterministische Round-Robin-Paarungen und Seeds, 2/3/4/16 Teilnehmer, keine Duplikate/Selbstpaarungen, sichere Seeds bis MAX_SAFE_INTEGER. #40105486356 grün: 297 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E.
- Kumulativ 11 implementierte und vollständig getestete Aufgaben seit v0.1.53, NICHT VERÖFFENTLICHT: NEXT-40, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53.
- Nächster Schritt: NEXT-54 Turnierauswertung. PR #46 Draft, main unverändert, kein Publish/Deployment.

# PROJECT_STATE

## Aktuelle unveröffentlichte Entwicklungsrunde (24.10.2026, 16:00 Europe/Berlin)
- NEXT-48: Eventbasierte, unveränderliche Zustandsrekonstruktion und Seek-Zeitleiste mit Position, Energie, Struktur, Schuss-/Treffereffekten; Tastatur und Mobile-Touch getestet. Development Tests #40100789839: 274 Unit-/Behavior-Tests, 56 Desktop-/Mobile-E2E, Typecheck/Build grün.
- NEXT-49: Reine Replay-Statistik (Schüsse, Treffer, effektiver Schaden, Energieverbrauch), Deduplizierung und Überkill-Begrenzung; responsiver A/B-Vergleich. Development Tests #40100953952: 281 Unit-/Behavior-Tests, 58 Desktop-/Mobile-E2E, Typecheck/Build grün.
- NEXT-50: 16 Strategiepaarungen × Seeds 1/12/4711, JSON-Roundtrip, Event-/Zustands-Digests, korrupte/übergroße Imports, Desktop-/Mobile-Regressionen. Development Tests #40101113261: 284 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.
- Refactoring: Replay-Zustandsrekonstruktion und Kampfauswertung als getrennte, RNG-freie Engine-Module; UI verwendet nur diese Modelle. Danach vollständige Tests erfolgreich.
- Kumulativ 8 vollständig getestete, unveröffentlichte Aufgaben seit v0.1.53: NEXT-40, NEXT-44, NEXT-45, NEXT-46, NEXT-47, NEXT-48, NEXT-49, NEXT-50.
- Nächster Schritt: NEXT-51 · Replay-Refactoring/Turnierplanung. Hauptbranch und stabile Version v0.1.53 unverändert; PR #46 Draft, kein Merge, kein Publish.

## Unveröffentlichte Entwicklung NEXT-47 (24.10.2026, vollständig getestet)
- Eventbasierter Replay-Player ohne RNG/Engine-Simulation auf Entwicklungsbranch implementiert; Play/Pause/Step/Reset, Ereignisanzeige und Laden importierter Dateien bzw. des aktuellen Kampfes.
- Separate Replay-Uhr; der laufende Sandbox-Kampf wird durch Import und Wiedergabe nicht verändert.
- Unit-/Behavior-/Regressionstests für 0/1/3600 Ticks, Sofortsieg, Pause, Ende und deterministische Wiedergabe; Desktop-/Mobile-E2E für Dialog und Dateiimport ergänzt.
- Development Tests #40096436278 auf Code-SHA 1b7413a grün: 268 Unit-/Verhaltenstests, 52 Desktop-/Mobile-E2E, Typecheck und Build. NEXT-47 abgeschlossen; finale Dokumentationsänderungen separat prüfen.
- Kumulativ bereits verifiziert, aber nicht veröffentlicht: NEXT-40, NEXT-44, NEXT-45, NEXT-46, NEXT-47 (5).
- Stabile Version auf main: 0.1.53; PR #46 Draft, kein Merge/Publish.

## Aktueller Stand

- Projektphase: Strategiesystem stabil auf main; unveröffentlichte Energieverwaltung, Recorder und Replay-Format fertig getestet; Replay-Import/-Export auf Entwicklungsbranch implementiert und getestet
- Aktuelle stabile Version: 0.1.53
- Branch: main
- CI: aktiv
- Auto-Publish: aktiv
- Publish-Gate: grüne CI + neue, noch nicht live befindliche Version
- Versionierte Releases: aktiv
- Desktop-E2E: aktiv
- Mobile-E2E: aktiv

## Öffentliche Projektinformationen

Umgesetzt:
- professioneller Footer,
- Testsuite-HTML als strukturierte Testfalldokumentation,
- kumulierende Release Notes,
- öffentliche Backlog-/Roadmap-Seite,
- tatsächlicher Publish-Zeitpunkt,
- nächster planmäßiger Lauf gemäß aktiver Automation,
- Version, Commit und Buildzeit über Build-Metadaten.

## Qualitätszähler

- Entwicklungszyklen seit Test-Review: 0
- Entwicklungszyklen seit Refactoring: 0
- Entwicklungszyklen seit Architektur-Review: 16

## Öffentliche Metadaten

Beim Publish werden gepflegt:
- version
- commit
- builtAt
- published
- nextRunAt
- Status der verpflichtenden Qualitätsgates

## Energieanzeigen-Bugfix

0.1.51 veröffentlicht: trennt die Raptor-Form von Energie-/Lebensbalken und zeigt die aktuelle Energie direkt an beiden Robotern sowie im Kampfstatus. Browser-Regressionen prüfen tatsächliche Darstellung (Hit-Test statt nur DOM-Sichtbarkeit), Chassiswechsel, Verbrauch/Regeneration, Konfiguration und Reset. Keine Engine-Änderung. PR-/main-CI grün: 191 Unit-/Verhaltenstests und 36 Desktop-/Mobile-E2E. Publish und Online-Smoke erfolgreich; Produktcommit 1213296167558f6f8ab2d3525879034521902a6d.

Fälliger Test-Review: toBeVisible allein erkennt Clipping nicht. Neue Paint-Hit-Tests und Energie-Lebenszyklustests sichern beide Roboter und Chassis ab. CI prüft den tatsächlichen Chromium-Start vor einer optionalen Paketinstallation; ältere CI-Stände dürfen nicht mehr veröffentlichen.

## Nächster Entwicklungsschritt

NEXT-34 abgeschlossen: Strategietypen `aggressive`, `defensive`, `distance` und `melee` sind als Engine-Datenmodell vorhanden. Jede Roboterkonfiguration trägt eine explizite Strategie; das bisherige Kampfverhalten bleibt über den Default unverändert. Unit-/Regressionstests sichern Default und Serialisierbarkeit ab.

NEXT-35 abgeschlossen und veröffentlicht: explizite aggressive Bewegungspolitik mit Zielabstand 80 % der effektiven Waffenreichweite; Annäherung auch während Cooldown/Energiemangel, Schussfreigabe nach Bewegung weiterhin zentral. Die Default-Kampfergebnisse bleiben kompatibel. Gemeinsamer Katalog ausschließlich implementierter Strategien und expliziter UI-Default bereiten NEXT-39 vor; Vorschau zeigt Aggressiv für A/B.

NEXT-36 bis NEXT-38 abgeschlossen und veröffentlicht: Distanz hält 90 % der effektiven Reichweite durch Annäherung/Rückzug. Defensiv greift bei mehr als 35 % Struktur wie Aggressiv an; ab 35 % Rückzug auf 110 % der größeren effektiven Waffenreichweite beider Roboter, ohne erneutes Nachsetzen. Nahkampf schließt bis auf 20 % der effektiven Waffenreichweite auf, ohne Rückzug. Schussfreigabe nach Bewegung bleibt zentral und gilt auch während Rückzug.

Refactoring: reine Strategieentscheidung (signierte Bewegung), gemeinsame reine Bewegungsgeometrie und Event-/Kampfausführung getrennt. Keine RNG-Nutzung in Entscheidungen. Identische Positionen mit deterministischer Ausweichrichtung; keine Move-Events ohne Ortsänderung. Default-Ergebnis-/Event-Regressionen unverändert.

NEXT-39, NEXT-41, NEXT-42 und NEXT-43 abgeschlossen und veröffentlicht: A/B wählen Strategien getrennt im Config-Dialog. Zielabstand ist für Aggressiv/Distanz/Nahkampf einstellbar (0–100 % effektive Waffenreichweite); Defensiv bietet Rückzugsschwelle (0–100 % Struktur) und Sicherheitsabstand (100–200 % größere Waffenreichweite). Ungültige/leere/nicht endliche Werte sperren Start, Schritt und Übernehmen und pausieren den Lauf. Reset stellt Aggressiv und stabile Defaults wieder her. Kampfstatus zeigt die tatsächlichen Strategien aus dem Match-State ohne Builderfelder.

Refactoring/Testreview: gemeinsame Strategie-Metadaten, Defaults, Labels und Validierung; keine kopierten Schussregeln. 48 feste, aus 0.1.51 gewonnene Zustands-/Event-Digests ergänzen die 16 Paarungen mit Seeds 1/12/4711. Alle Defaults bleiben verhaltensgleich. Replay-Schritte NEXT-44 bis NEXT-51 konkret geplant.

Nächster konkreter Entwicklungsschritt: NEXT-40 · Energieverwaltungsparameter. Nicht beauftragt, nicht implementiert; NEXT-41 verwendet ausschließlich die vorhandenen Bewegungsparameter. Release-Gates 0.1.52 bestanden: PR-/main-CI grün (215 Unit-/Verhaltenstests und 42 Desktop-/Mobile-E2E), Publish und Online-Smoke erfolgreich. Produktcommit ec6f40dba8f625b08efe968b6458b1b814d05f6f.

Release-Gates 0.1.50 bestanden: PR-CI und main-CI grün (191 Unit-/Verhaltenstests, 32 Desktop-/Mobile-E2E), Publish inklusive Online-Smoke erfolgreich. Veröffentlichter Commit: ea747a3624b71cb2725dd35e288675a938bc120a. Der erste main-Runner hing bei Browser-Systempaketen; der aktualisierte Übergabestand wurde vollständig auf einem weiteren Runner geprüft.

Release-Gates für 0.1.49 bestanden: PR-CI und main-CI grün (96 Unit-/Regressionstests, 32 Desktop-/Mobile-E2E), Publish und Online-Smoke erfolgreich. Veröffentlichter Commit: a41af00d95ac1cd72f256f8da445ae208ad9a646.

NEXT-27 abgeschlossen: Start und Reset repariert; Bedienverhalten, deterministischer Reset und Validierungsgrenzen massiv erweitert und auf Desktop/Mobile abgesichert.


## Teststrategie

- Testsuite wächst bei jedem Entwicklungsschritt mit.
- Verhalten und Spielregeln werden als Charakterisierungs-/Regressionstests abgesichert.
- Vor Refactorings werden fehlende Verhaltenstests ergänzt.
- TEST_STRATEGY.md ist verbindliche Grundlage.

## Rolling Backlog

BACKLOG.md hält mindestens die nächsten 5–10 konkreten Schritte in Reihenfolge sichtbar. Pro stündlichem Lauf sind bis zu drei verifizierte Abschlüsse erlaubt; ein unvollständiger Schritt hat Vorrang. Sobald weniger als 5 konkrete Schritte verbleiben, wird vor dem Leerlaufen ein Planungszyklus fällig.


## Aktueller Testausbau

Die Engine-Tests sichern aktuell deterministische Zufallsfolgen, reproduzierbare Matches, Initialzustand, Tick-Fortschritt, Immutability, Annäherungsverhalten, Energiegrenzen, Strukturinvarianten und Verhalten nach Kampfende ab. Dieser Bereich wird bei jedem Entwicklungsschritt weiter ausgebaut.

## Ereignismodell

Move-, Shot-, Hit-, Damage- und Victory-Events sind als separates Datenmodell vorhanden und mit Unit-Tests abgesichert. Die Simulation selbst wird ab NEXT-02 schrittweise auf Event-Erzeugung erweitert.


## Bewegungsereignisse

NEXT-02 abgeschlossen: Bewegungen werden als Move-Events mit Tick, Roboter-ID sowie Vorher-/Nachher-Position ausgegeben. Bestehendes Spielverhalten bleibt unverändert; die Bewegung ist nun für Replay, Analyse und Refactoring explizit nachvollziehbar.


## Schussereignisse

NEXT-03 abgeschlossen: Erfolgreiche Schüsse werden als ShotEvents mit Tick, Angreifer, Ziel und Energiekosten ausgegeben. Reichweite, Energie und Cooldown sind als Verhaltenstests abgesichert. Sichtbares Spielverhalten bleibt unverändert.


## Treffer- und Schadensereignisse

NEXT-04 abgeschlossen: Erfolgreiche Schüsse erzeugen getrennte Shot-, Hit- und Damage-Events. Damage enthält den tatsächlich angewandten, nie negativen Schaden; Zielstruktur wird bei 0 geklemmt. Ein fester Seed sichert den Schadensjitter deterministisch ab.


## Sieg und Kampfende

NEXT-05 abgeschlossen: Zerstörung erzeugt unmittelbar ein Victory-Event mit Gewinner und Verlierer. Der besiegte Roboter führt im selben Tick keine weitere Aktion aus; bereits beendete Matches bleiben einschließlich leerem Event-Stream stabil.


## Zeitlimit und Unentschieden

NEXT-06 abgeschlossen: Erreicht ein Match sein Tick-Limit ohne Sieger, endet es explizit als Unentschieden mit `outcome: draw` und `endReason: timeout`. Ein Sieg im letzten zulässigen Tick hat Vorrang. Timeout-Zustände bleiben bei weiteren Schritten eingefroren.

## Test-Review

Der fällige 5-Läufe-Testreview wurde durchgeführt: NEXT-06 ergänzt Grenztests für den letzten zulässigen Tick, Timeout bei Tick 0 und den eingefrorenen Draw-Zustand; NEXT-10 bleibt als größerer Review vor dem geplanten Engine-Refactoring bestehen.

## Defensive-Korrektur 0.1.53 (veröffentlicht)

Die bisherigen 35-%-/größere-Reichweite-Regeln oben beschreiben v0.1.50–52. Neu: Defensive korrigiert Sicherheitsabstand frühzeitig in beide Richtungen; Abstand = min(gegnerische Waffenreichweite × Faktor, 95 % eigene Waffenreichweite). Ab standardmäßig 70 % Struktur kein Nachsetzen mehr. Reine Abstandspolitik gekapselt, gemeinsame Bewegungsgeometrie und Schussfreigabe unverändert. In 100 festen Standardkämpfen gewinnt der defensive Raptor 93 statt zuvor 0; beide Roboter weichen früh zurück. Keine allgemeine Sieggarantie. 21 neue defensive Referenzstreams ergänzen 27 unveränderte Altversionsreferenzen. NEXT-40 bleibt offen.

Release-Gates 0.1.53 bestanden: PR-CI https://github.com/VOWIKRON/robot-arena/actions/runs/40018423641 und main-CI https://github.com/VOWIKRON/robot-arena/actions/runs/40018619403 grün (225 Unit-/Verhaltenstests, 46 Desktop-/Mobile-E2E). Publish https://github.com/VOWIKRON/robot-arena/actions/runs/40018744209 erfolgreich; Online-Smoke einschließlich Infoseiten, Versionsarchiv und exaktem Commit grün. PR #45 integriert. Produktcommit ec81e688fe92c79e8baf922583eb40132c4b3830. NEXT-40 bleibt der nächste offene Entwicklungsschritt.

## Arbeitsbranch NEXT-40 (24.10.2026, unveröffentlicht)

Geplante Energiereserve (0–100 % Maximalenergie, Default 0 %) wird in der Schussfreigabe nach Regeneration berücksichtigt. Quellcode für getrennte A/B-Eingaben, Validierung und Tests liegt auf dem Entwicklungsbranch. **Nicht abgeschlossen:** Unit-/Verhaltenstests, vollständige Regression, Desktop-/Mobile-E2E und Freigabe müssen auf dem neuen Head nachgewiesen werden. Stabile Version auf main bleibt 0.1.53; kein Merge, kein Publish.

## Unveröffentlichte Entwicklung · 24.10.2026

- Stabil auf main: **0.1.53**, unverändert; Veröffentlichung ausschließlich nach manueller Nutzerfreigabe.
- Branch: `automation/next-40-energy-reserve-unpublished`, Draft-PR #46, nicht mergen.
- **NEXT-40 abgeschlossen und nicht veröffentlicht:** Energiereserve 0–100 % für A/B mit Default 0 %, Validierung, zentrale Schussfreigabe und Regressionen. Development Tests #40085113036 (SHA `193f42d07cb1a6827799e2ac6fe92a974b7ddae2`): 246 Unit-/Verhaltenstests und 48 Desktop-/Mobile-E2E, Typecheck und Build grün.
- **NEXT-44 abgeschlossen und nicht veröffentlicht:** Append-only Recorder mit Seed, initialen RobotDefinition-Snapshots, Tick-Events und Endzustand. Development Tests #40088595774 (SHA 7df3cacc): 252 Unit-/Verhaltenstests und 48 Desktop-/Mobile-E2E, Typecheck und Build grün.
- **NEXT-45 abgeschlossen und nicht veröffentlicht:** Replay-Dateiformat schemaVersion 1, JSON-Roundtrip, ID-/Tick-/Event-/Arena-/Zahlenvalidierung. Development Tests #40088913689 (SHA 9d6f719c): 258 Unit-/Verhaltenstests und 48 Desktop-/Mobile-E2E, Typecheck und Build grün.
- Testworkflow auf dem Entwicklungsbranch heißt `Development Tests`; der `Publish`-Workflow auf main reagiert nur auf `CI`, bleibt aber grundsätzlich automatisch konfiguriert. Nicht auf main mergen und keinen Publish-Workflow auslösen.
- Kumulativ seit v0.1.53: **4 vollständig getestete, unveröffentlichte Aufgaben (NEXT-40, NEXT-44, NEXT-45, NEXT-46)**. Weitere offene Schritte: NEXT-47 bis NEXT-51.

## NEXT-46 · Replay-Import/-Export (Entwicklungsbranch)
- Implementiert: separater Replay-Dialog, Live-Snapshot ohne Recorder-Abschluss, JSON-Download mit stabilem Namen, Dateiimport mit 2-MB-Grenze und Schema-Prüfung.
- Import zeigt nur geprüfte Metadaten; laufender Kampf bleibt unverändert. Player folgt mit NEXT-47.
- Unit-/Behavior-/Regression- und Desktop-/Mobile-Tests auf Commit 556a2858 grün: Development Tests #40092321506, 262 Unit-/Verhaltenstests und 50 Desktop-/Mobile-E2E, Typecheck und Build. NEXT-46 abgeschlossen und unveröffentlicht; Dokumentations-Head separat prüfen.
- main und Live-Version 0.1.53 unverändert; kein Merge, Publish oder Deployment.
