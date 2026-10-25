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
npm ci
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
Im Konfigurationsdialog sind Strategien für A und B unabhängig wählbar. Änderungen setzen den gültigen Kampf zurück. Aggressiv, Distanz und Nahkampf verwenden einen Zielabstand von 0–100 % der effektiven Waffenreichweite (Defaults 80/90/20 %). Defensiv verwendet eine Rückzugsschwelle von 0–100 % Struktur (Default 70 %) und einen Sicherheitsabstand von 100–200 % der gegnerischen effektiven Waffenreichweite (Default 110 %). Defensive Roboter halten diesen Abstand bereits vor kritischem Schaden und begrenzen ihn auf 95 % der eigenen Waffenreichweite, damit sie weiter schießen können. Ab der Strukturschwelle verfolgen sie den Gegner nicht mehr. Ungültige Eingaben pausieren den Lauf und sperren Start, Einzelschritt und Übernehmen. Reset stellt Aggressiv und alle Standardwerte wieder her. Die Kampfanzeige zeigt die tatsächliche Match-Strategie pro Roboter.

Energiereserven/Schussfreigabeparameter gehören zu NEXT-40 und sind noch nicht umgesetzt. Die 48 festen Regression-Digests in `tests/strategy-stream-fixtures.json` stammen aus v0.1.51 (Commit 732cefd) und vergleichen Zustände/Event-Streams aller 16 Strategiepaarungen mit Seeds 1, 12 und 4711 nach höchstens 500 Ticks. Schlüssel werden kanonisch sortiert, Zahlen auf 1e-9 gerundet; dadurch werden keine bloßen Objekt-Schlüsselreihenfolgen eingefroren.

Die beabsichtigte Defensive-Korrektur in v0.1.53 besitzt 21 eigene Referenzen in `tests/defensive-stream-fixtures.json`. Nur Paarungen mit Defensiv verwenden diese; die übrigen 27 Digests bleiben unverändert aus v0.1.51. Ein 100-Seed-Balancetest hält die konkrete Standardpaarung fest (93 Raptor-Siege statt zuvor 0), ohne eine allgemeine Sieggarantie zu behaupten.

## Reproduzierbare Entwicklung (NEXT-64, unveröffentlicht)

Die Abhängigkeiten sind in `package-lock.json` (Lockfile v3) festgehalten. Lokale Entwicklung und Development Tests verwenden `npm ci` mit Node.js 22. Dependency-Updates nur durch bewusstes `npm install` auf einem separaten Entwicklungsbranch, Lockfile-Diff prüfen, Audit/Unit/E2E ausführen. Das CI-Gate stoppt bei jeder bekannten npm-Advisory und prüft durch zwei saubere Installationen/Builds den identischen SHA256-Digest von `dist` bei unverändertem Commit. CI #40128110261: erfolgreich, 358 Unit-/Behavior-Tests und 82 Desktop-/Mobile-E2E. Diese Dokumentation ist ausschließlich im Draft-PR #48, nicht veröffentlicht.
