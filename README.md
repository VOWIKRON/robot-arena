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
