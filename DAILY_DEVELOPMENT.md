# Daily Development

Jeder tägliche Lauf folgt verbindlich diesem Ablauf:

1. Repository, PROJECT_STATE, BACKLOG und letztes Protokoll lesen.
2. Build-, Typecheck- und Testzustand prüfen.
3. Bei rotem Zustand ausschließlich reparieren.
4. Genau einen klar abgegrenzten Entwicklungsschritt auswählen.
5. Änderung implementieren und passende Tests ergänzen.
6. Unit-/Regressionstests ausführen.
7. Desktop- und Mobile-E2E prüfen.
8. Kleine notwendige Refactorings direkt durchführen.
9. Nach Refactoring komplette Testsuite erneut ausführen.
10. Regelmäßig eigene Refactoring-Sessions einstreuen; spätestens jeder 10. Entwicklungszyklus ist dafür reserviert.
11. PROJECT_STATE, BACKLOG, CHANGELOG und protokoll.md aktualisieren.
12. Nur bei grünen Gates committen und versionieren.
13. Release-Build veröffentlichen: unveränderlich unter `releases/vX.Y.Z/` und zusätzlich als aktuelle Version.
14. Online-Smoke-Test auf Desktop- und Mobile-Viewport durchführen.
15. Fehler nach Deployment haben Vorrang vor neuen Features.

## No-Publish-Regel

Kein Publish bei fehlschlagendem Typecheck, Unit-/Regressionstest, Build oder relevantem E2E-Smoke-Test.
