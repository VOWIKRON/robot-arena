# Daily Development

## Grundprinzip

Robot Arena wird einmal pro Tag in genau einem klar abgegrenzten Entwicklungsschritt weiterentwickelt.

Der tägliche Lauf soll nicht möglichst viel ändern, sondern einen kleinen, überprüfbaren Fortschritt erzeugen.

## Verbindlicher Ablauf

1. Repository lesen.
2. `PROJECT_STATE.md`, `BACKLOG.md`, `UI_REQUIREMENTS.md` und letztes `protokoll.md` prüfen.
3. aktuellen Build-/Testzustand prüfen.
4. Bei rotem Zustand keine neue Funktion beginnen.
5. Genau einen Entwicklungsschritt auswählen.
6. Falls ein größerer Backlogblock an die Reihe kommt, nur den unmittelbar nächsten Teil davon detaillieren.
7. Änderung implementieren.
8. passende Tests ergänzen.
9. Typecheck ausführen.
10. Unit-/Regressionstests ausführen.
11. Build erzeugen.
12. Desktop-E2E ausführen.
13. Mobile-E2E ausführen.
14. notwendiges lokales Refactoring durchführen.
15. Nach Refactoring die komplette Testsuite erneut ausführen.
16. `PROJECT_STATE.md`, `BACKLOG.md`, `CHANGELOG.md` und `protokoll.md` aktualisieren.
17. öffentliche HTML-Infoseiten aktualisieren:
    - `testsuite.html`
    - `release-notes.html`
    - `backlog.html`
18. Versionsnummer erhöhen, wenn ein neuer öffentlicher Stand entsteht.
19. Commit erzeugen.
20. CI abwarten.
21. Nur bei grüner CI veröffentlichen.
22. Release unveränderlich unter `releases/vX.Y.Z/` ablegen.
23. dieselbe Version als aktuelle Version veröffentlichen.
24. `publishedAt`, Version und Commit in den öffentlichen Metadaten setzen.
25. Zeitpunkt des nächsten geplanten täglichen Laufs in den öffentlichen Metadaten setzen.
26. Online-Smoke-Test durchführen.

## Refactoring

Refactoring ist Teil des normalen Entwicklungsprozesses.

Zusätzlich:
- jeder 5. Lauf: Test-/Coverage-Review,
- jeder 10. Lauf: gezielte Refactoring-Session,
- jeder 20. Lauf: Architektur- und Roadmap-Review.

Refactoring darf keine unbemerkte Änderung der Spielregeln verursachen.

## No-Publish-Regel

Kein Publish bei:
- fehlschlagendem Typecheck,
- fehlschlagenden Unit-/Regressionstests,
- fehlschlagendem Build,
- fehlschlagendem Desktop-E2E,
- fehlschlagendem Mobile-E2E,
- bekanntem kritischem Fehler.

## Öffentliche Seite

Die öffentliche Seite folgt `UI_REQUIREMENTS.md`.

Insbesondere:
- keine internen/metaartigen Überschriften,
- professioneller Produktauftritt,
- Footer mit Testsuite, Release Notes und Backlog,
- Zeitstempel aus dem tatsächlichen Publishprozess,
- Release Notes kumulierend,
- Backlog zeigt aktuellen Stand und nächsten geplanten Lauf.


## Öffentliche Testsuite-Dokumentation

Nach jedem veröffentlichten Lauf muss `testsuite.html` die tatsächlich ausgeführten Prüfungen als strukturierte Testsuite dokumentieren. Sie enthält konkrete Testfälle nach Bereichen wie Engine, Regression, Desktop, Mobile und Deployment. Jeder neu hinzugefügte Testfall wird mit Test-ID, Zweck, Prüfinhalt und Ergebnis sichtbar ergänzt. Die Testsuite ist kein Entwicklungs- oder Entscheidungsprotokoll; dafür bleibt `protokoll.md` zuständig.


## Verhaltenssicherung für Refactoring

Die Testsuite wird mit jedem Entwicklungsschritt gezielt erweitert. Neue Tests sollen nicht nur technische Ausführbarkeit prüfen, sondern beobachtbares Verhalten und Spielregeln absichern.

Verbindlich:
- jede neue Regel erhält passende Unit-/Verhaltenstests,
- Bugfixes erhalten nach Möglichkeit Regressionstests,
- vor größeren Refactorings werden fehlende Charakterisierungstests ergänzt,
- feste Seeds werden für reproduzierbare Verhaltensprüfungen genutzt,
- nach Refactoring wird die vollständige Testsuite erneut ausgeführt,
- testsuite.html wird mit den tatsächlich hinzugekommenen Testfällen aktualisiert.

## Backlog-Pflege

Der Backlog zeigt nicht nur den nächsten Schritt, sondern mehrere konkrete Folgeschritte in Reihenfolge. Nach jedem Lauf:
- erledigten Schritt abhaken,
- neuen nächsten Schritt markieren,
- mindestens die nächsten 5–10 Schritte konkret sichtbar halten,
- erst dahinter größere Themenblöcke anzeigen,
- jeden konkreten Feature-Schritt mit den dazugehörigen Tests koppeln.
