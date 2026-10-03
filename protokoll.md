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
