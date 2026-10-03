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
