# Robot Arena

Browserbasiertes Roboter-Simulationsspiel mit deterministischen Kämpfen, täglichem Entwicklungszyklus, Testsuite und versioniertem Publishing.

## Aktueller Stand

Bootstrap **v0.1.0** ist im Repository.

Enthalten:
- TypeScript + Vite
- deterministische Seed-basierte Simulation
- Beispielroboter Raptor und Titan
- responsive Arena für Desktop und Mobile
- Vitest-Regressionstests
- Playwright-E2E für Desktop und Smartphone
- GitHub Actions CI
- täglicher Entwicklungs- und Refactoring-Prozess
- Publisher-Vorlage für vowikron.de

## Lokal starten

```bash
npm install
npm run dev
```

## Qualitätsgate

```bash
npm run quality
npm run test:e2e
```

Es gilt: **kein Publish bei roten Tests**.

## Geplantes Deployment

- Aktuell: https://www.vowikron.de/try_folder/robot-arena/
- Versionen: https://www.vowikron.de/try_folder/robot-arena/releases/vX.Y.Z/

Der echte Publish-Token gehört ausschließlich auf den Server bzw. in ein Secret und niemals ins Repository.

## Projektsteuerung

- `BACKLOG.md`
- `PROJECT_STATE.md`
- `CHANGELOG.md`
- `protokoll.md`
- `DAILY_DEVELOPMENT.md`


## Strategien und Parameter
Im Konfigurationsdialog sind Strategien für A und B unabhängig wählbar. Änderungen setzen den gültigen Kampf zurück. Aggressiv, Distanz und Nahkampf verwenden einen Zielabstand von 0–100 % der effektiven Waffenreichweite (Defaults 80/90/20 %). Defensiv verwendet eine Rückzugsschwelle von 0–100 % Struktur (Default 35 %) und einen Sicherheitsabstand von 100–200 % der größeren effektiven Waffenreichweite (Default 110 %). Ungültige Eingaben pausieren den Lauf und sperren Start, Einzelschritt und Übernehmen. Reset stellt Aggressiv und alle Standardwerte wieder her. Die Kampfanzeige zeigt die tatsächliche Match-Strategie pro Roboter.

Energiereserven/Schussfreigabeparameter gehören zu NEXT-40 und sind noch nicht umgesetzt. Die 48 festen Regression-Digests in `tests/strategy-stream-fixtures.json` stammen aus v0.1.51 (Commit 732cefd) und vergleichen Zustände/Event-Streams aller 16 Strategiepaarungen mit Seeds 1, 12 und 4711 nach höchstens 500 Ticks. Schlüssel werden kanonisch sortiert, Zahlen auf 1e-9 gerundet; dadurch werden keine bloßen Objekt-Schlüsselreihenfolgen eingefroren.
