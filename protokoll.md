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
