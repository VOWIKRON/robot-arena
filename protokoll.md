# Arbeits- und Entscheidungsprotokoll

## 2026-10-03 – Bootstrap

**Ausgangszustand:** Neues GitHub-Repository mit initialem README und vorbereiteten Webordnern.

**Entscheidung:** Projektfundament als TypeScript/Vite-Webanwendung aufsetzen. Simulation und UI bleiben getrennt.

**Umgesetzt:**
- deterministische PRNG
- minimale Match-Engine
- Raptor und Titan
- responsive HTML/CSS-Oberfläche
- Unit-/Regressionstests
- Playwright Smoke-Test
- GitHub Actions
- täglicher Entwicklungsprozess
- Publisher-Vorlage

**Verworfen:** Direkte Veröffentlichung ohne automatisierte Tests.

**Grund:** Der tägliche Entwicklungsprozess soll niemals einen bekannten roten Stand veröffentlichen.

**Lokale Prüfung:** Paketinstallation in der Ausführungsumgebung lief in ein Timeout. Deshalb ist der verbindliche Erstcheck GitHub CI; ein grünes CI-Ergebnis ist Voraussetzung für den ersten Publish.

**Nächster Schritt:** CI-Ergebnis prüfen, Fehler beheben, anschließend publish.php serverseitig installieren und ersten Release-Build veröffentlichen.

---

## 2026-10-03 – Öffentliche Darstellung und Projekttransparenz

**Neue verbindliche Anforderungen:**
- keine internen/metaartigen Überschriften auf der öffentlichen Seite,
- professionelles Erscheinungsbild,
- bestehende visuelle Richtung von v0.1.0 beibehalten,
- Footer mit Testsuite, Release Notes und Backlog,
- alle drei Bereiche zeigen den Zeitpunkt des letzten Publishs,
- Backlog zeigt zusätzlich den Zeitpunkt des nächsten geplanten Laufs,
- Release Notes werden als kumulierende HTML-Seite geführt,
- neueste Release-Information steht immer oben,
- ältere Releases bleiben sichtbar,
- Backlog wird zunächst in größeren Entwicklungsblöcken gezeigt,
- ein Block wird erst bei Bearbeitung in kleinere tägliche Schritte zerlegt.

**Entscheidung:**
Diese Anforderungen werden nicht als optionale UI-Idee behandelt, sondern in `UI_REQUIREMENTS.md`, `DAILY_DEVELOPMENT.md`, `BACKLOG.md` und `PROJECT_STATE.md` verankert.

**Nächster Umsetzungsschritt:**
Footer- und Informationsseiten implementieren und in die Publish-Pipeline integrieren.

---

## 2026-10-03 – Manueller erster Tageslauf

**Ausgangszustand:** CI und bestehender Publish waren grün. Der nächste geplante Schritt war die öffentliche Footer-/Informationsstruktur.

**Umgesetzter Entwicklungsschritt:** Footer und öffentliche Informationsseiten als ein zusammenhängender Produkttransparenz-Schritt.

**Umgesetzt:**
- Footer auf der Arena mit Testsuite, Release Notes und Backlog,
- Anzeige des letzten Publish-Zeitpunkts,
- Anzeige des nächsten geplanten Laufs,
- `testsuite.html`,
- kumulierende `release-notes.html`,
- `backlog.html`,
- responsive gemeinsame Darstellung,
- zusätzliche E2E-Abdeckung für Desktop und Mobile,
- Build-Metadaten für Version, Commit, Buildzeit, Next Run und Qualitätsgates.

**Auffälligkeit im Testlauf:** Die bisherige Pipeline veröffentlichte nach jedem grünen Commit auf `main`. Da ein täglicher Entwicklungsschritt aus mehreren Commits bestehen kann, wurde v0.1.1 bereits während des laufenden Arbeitsschritts veröffentlicht. Weitere Publish-Versuche derselben unveränderlichen Version konnten dadurch kollidieren.

**Korrektur:** Der Publish-Workflow besitzt jetzt ein explizites Release-Gate. CI läuft weiterhin bei jedem Commit, aber der eigentliche Publish wird nur ausgeführt, wenn der abschließende Commit mit `release:` markiert ist. Dadurch bleiben Zwischenstände testbar, aber unveröffentlicht.

**Refactoring:** Die Release-Pipeline wurde in diesem Lauf gezielt gehärtet; unnötige Publish-Versuche während eines Entwicklungsschritts werden künftig vermieden.

**Tests:** Die vorhandene Testsuite wurde um Footer- und Informationsseiten-Smoketests erweitert. CI war für die neuen E2E-Tests grün.

**Nächster Entwicklungsschritt:** Kernsimulation – Ereignismodell-Grundstruktur für Bewegung, Schuss, Treffer und Schaden.

---

## 2026-10-03 – Testsuite als ausführliches öffentliches Laufprotokoll

**Anforderung:** Die Online-Testsuite soll denselben Detailgrad wie die Rückmeldung nach einem Daily-Lauf besitzen.

**Umgesetzt:**
- technischer Ampelstatus bleibt erhalten,
- zusätzlich vollständiges 20-Punkte-Laufprotokoll,
- Ausgangszustand und gewählter Schritt,
- umgesetzte Änderungen und ergänzte Tests,
- Typecheck, Unit-/Regressionstests und Build,
- Desktop- und Mobile-E2E getrennt,
- Refactoring und erneute Gesamttestsuite,
- Dokumentationsänderungen, Version und Commit,
- CI und Publish,
- Online-Smoke-Test,
- Auffälligkeiten, Fehler und Blocker,
- nächster Entwicklungsschritt und nächster geplanter Lauf.

**Verbindliche Regel:** Diese ausführliche Darstellung wurde in UI_REQUIREMENTS.md und DAILY_DEVELOPMENT.md festgeschrieben. Fehler oder Umwege dürfen auf der öffentlichen Testsuite-Seite nicht verschwiegen werden.

**Test:** Playwright prüft nun zusätzlich, dass der ausführliche Laufbericht und der Abschnitt zu Auffälligkeiten/Fehlern auf der Testsuite-Seite vorhanden sind.

---

## 2026-10-03 – Korrektur Testsuite-Darstellung

**Klarstellung:** Die öffentliche Testsuite soll kein Entwicklungsablauf-Protokoll sein.

**Korrigiert:**
- 20-Punkte-Ablauf aus der öffentlichen Testsuite entfernt,
- Tests nach Bereichen gegliedert,
- konkrete Testfälle mit Test-IDs dokumentiert,
- Prüfinhalt und Ergebnis je Testfall sichtbar,
- statische Qualitätsprüfungen separat dargestellt,
- Desktop und Mobile getrennt,
- Deployment-/Online-Smoke-Checks als eigener Bereich,
- Testzeitpunkt über Build-Metadaten sichtbar.

**Regel:** Entwicklungsentscheidungen und Auffälligkeiten gehören in protokoll.md und in die Task-Rückmeldung; testsuite.html dokumentiert ausschließlich Tests und Qualitätsprüfungen.

---

## 2026-10-03 – Testsuite für Refactoring und konkreter Rolling Backlog

**Neue Vorgabe:** Die Testsuite wird nicht nur funktional größer, sondern sichert gezielt beobachtbares Verhalten und Spielregeln ab. Ziel ist, spätere Refactorings durchführen zu können, ohne unbeabsichtigte Verhaltensänderungen.

**Direkt ergänzt:**
- stabiler Initialzustand,
- genau ein Tick pro Schritt,
- Eingabestate bleibt unverändert,
- Roboter nähern sich außerhalb der Kampfdistanz an,
- Energie bleibt innerhalb gültiger Grenzen,
- Struktur steigt im Kampf nicht,
- fertiger Match-State bleibt unverändert.

**Teststrategie:** Neue Datei TEST_STRATEGY.md beschreibt Unit-, Verhaltens-, Charakterisierungs-, Regression-, Desktop-, Mobile- und Deployment-Tests sowie das Refactoring-Gate.

**Backlog-Regel:** Der Backlog enthält künftig nicht nur den nächsten Punkt, sondern mindestens 5–10 konkret priorisierte Folgeschritte. Feature- und Testausbau werden dabei gekoppelt.

**Konkrete nächste Schritte:** NEXT-01 bis NEXT-10 wurden für Ereignismodell, Bewegung, Schuss, Treffer/Schaden, Sieg, Timeout, Energie, Arena-Grenzen, Regression-Seeds und Test-Review definiert.

---

## 2026-10-03 – Manueller Tageslauf 2: NEXT-01 Ereignismodell-Grundtypen

**Ausgangszustand:** v0.1.5 war veröffentlicht, CI und Publish waren grün. Der Rolling Backlog markierte NEXT-01 als nächsten Schritt.

**Umgesetzt:**
- neues separates Modul `src/engine/events.ts`,
- diskriminierte Event-Typen `MoveEvent`, `ShotEvent`, `HitEvent`, `DamageEvent`,
- gemeinsame Union `CombatEvent`,
- Factory-Funktionen für alle vier Event-Arten,
- Bewegungsereignisse kopieren Positionsdaten, damit keine unbeabsichtigte Referenzkopplung entsteht.

**Tests ergänzt:**
- EVT-001: Move-Event mit kopierten Positionen,
- EVT-002: Shot-Event mit Angreifer, Ziel und Energieverbrauch,
- EVT-003: Hit-Event mit Angreifer und Ziel,
- EVT-004: Damage-Event mit Quelle, Ziel und Schadenshöhe.

**Abgrenzung:** Die bestehende Simulation erzeugt diese Events noch nicht. Das ist bewusst erst NEXT-02 ff.; NEXT-01 schafft ausschließlich das stabile Event-Datenmodell und seine Tests.

**Backlog:** NEXT-01 erledigt, NEXT-02 Bewegungsereignisse ist neuer nächster Schritt. NEXT-11 wurde ergänzt, damit weiterhin mindestens zehn konkrete Folgeschritte sichtbar bleiben.

**Refactoring-Schutz:** Das Event-Datenmodell ist vom Match-State getrennt. Damit kann die Simulation in den nächsten Schritten schrittweise auf Events umgestellt werden, ohne die bestehenden Verhaltensregeln gleichzeitig umbauen zu müssen.

---

## 2026-10-03 – Manueller Tageslauf 3: NEXT-02 Bewegungsereignisse

**Ausgangszustand:** v0.1.6 war veröffentlicht; CI, Unit-Tests, E2E und Publish waren grün. NEXT-02 war als nächster Rolling-Backlog-Punkt markiert.

**Umgesetzt:**
- `stepMatchWithEvents` ergänzt,
- bestehendes `stepMatch` bleibt kompatibel und delegiert auf die neue Event-Variante,
- Bewegungen erzeugen jetzt echte `MoveEvent`-Einträge,
- Move-Events enthalten Tick, Roboter-ID, Position vorher und Position nachher,
- bei keiner Bewegung entsteht kein Move-Event.

**Tests ergänzt:**
- MOV-001: Vorher-/Nachher-Positionen und Event-Daten,
- MOV-002: Bewegung überschreitet pro Tick nie die konfigurierte Geschwindigkeit,
- MOV-003: Event-Erzeugung mutiert den Input-State nicht.

**Bedienung/Verhalten:** Für den Spieler ändert sich in diesem Schritt bewusst noch nichts an Buttons, Darstellung oder Kampfablauf. Das beobachtbare Bewegungsverhalten soll gleich bleiben. Neu ist die interne Nachvollziehbarkeit jeder Bewegung als Event – Grundlage für Replay, Analyse und sicheres Refactoring.

**Backlog:** NEXT-02 erledigt, NEXT-03 Schussereignisse ist neuer nächster Schritt. NEXT-12 Event-Reihenfolge wurde ergänzt, damit die konkrete Folgeplanung weiter mindestens zehn Schritte umfasst.

---

## 2026-10-03 – Manueller Tageslauf 4: NEXT-03 Schussereignisse

**Ausgangszustand:** v0.1.7 war veröffentlicht; CI, Unit-/Regressionstests, Desktop/Mobile-E2E und Publish waren grün. NEXT-03 war als nächster Rolling-Backlog-Punkt markiert.

**Umgesetzt:**
- erfolgreiche Schüsse erzeugen jetzt echte `ShotEvent`-Einträge,
- Shot-Events enthalten Tick, Angreifer-ID, Ziel-ID und Energiekosten,
- die bestehenden Regeln für Reichweite, Energie und Cooldown bleiben unverändert und steuern nun zusätzlich die Event-Erzeugung,
- Treffer und Schaden bleiben bewusst noch außerhalb dieses Schritts und folgen in NEXT-04.

**Tests ergänzt:**
- SHOT-001: gültiger Schuss erzeugt Shot-Event,
- SHOT-002: kein Shot-Event außerhalb der Reichweite,
- SHOT-003: kein Shot-Event ohne ausreichende Energie,
- SHOT-004: kein Shot-Event bei weiterhin aktivem Cooldown.

**Bedienung/Verhalten:** Sichtbar ändert sich für den Spieler noch nichts an Buttons oder Darstellung. Das beobachtbare Schussverhalten bleibt absichtlich gleich; neu ist, dass jede Schussentscheidung explizit als Event nachvollziehbar und gegen die drei Sperrbedingungen testbar ist.

**Backlog:** NEXT-03 erledigt, NEXT-04 Treffer & Schaden ist neuer nächster Schritt. NEXT-13 Event-Stream-Determinismus wurde ergänzt, damit die konkrete Folgeplanung weiter ausreichend tief bleibt.
