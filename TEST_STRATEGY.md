# Teststrategie

## Ziel

Die Testsuite wächst mit jedem Entwicklungsschritt mit und schützt nicht nur technische Ausführbarkeit, sondern zunehmend das beobachtbare Verhalten der Robot Arena. Dadurch sollen spätere Refactorings möglich sein, ohne Spielregeln oder Benutzerverhalten unbemerkt zu verändern.

## Grundregeln

1. Jede neue Produktfunktion erhält mindestens einen passenden Test.
2. Jede neue Spielregel erhält mindestens einen Verhaltens- oder Regressionstest.
3. Bugfixes erhalten nach Möglichkeit einen Test, der den Fehler vor der Korrektur reproduziert hätte.
4. Vor größeren Refactorings werden fehlende Charakterisierungstests ergänzt.
5. Refactoring darf vorhandene Verhaltens- und Regressionstests nicht brechen.
6. Tests werden nach Bereichen strukturiert und in `testsuite.html` dokumentiert.
7. Kritische Regeln werden mit festen Seeds reproduzierbar getestet.
8. Desktop- und Mobile-Verhalten werden getrennt abgesichert.
9. Publish erfolgt nur bei vollständig grüner verpflichtender Testsuite.

## Testebenen

### 1. Statische Qualität
- TypeScript Typecheck
- Produktionsbuild
- später ESLint/Formatter
- später Architekturgrenzen

### 2. Engine Unit Tests
Kleine Regeln isoliert testen:
- Initialzustand
- Tick-Fortschritt
- Bewegung
- Energie
- Cooldowns
- Reichweite
- Schaden
- Siegbedingungen
- Arena-Grenzen

### 3. Verhaltens-/Charakterisierungstests
Diese Tests frieren beobachtbares Verhalten ein, bevor interne Strukturen refactored werden.

Beispiele:
- gleicher Seed + gleiche Konfiguration => identisches Ergebnis
- ein Simulationsschritt verändert Eingabestate nicht
- Struktur steigt im Kampf nie
- Energie bleibt innerhalb gültiger Grenzen
- fertiger Kampf bleibt eingefroren
- Roboter nähern sich außerhalb der gewünschten Distanz an
- feste Seeds erzeugen bekannte Endzustände

### 4. Regressionstests
Für gefundene Fehler werden feste Reproduktionstests ergänzt.

### 5. E2E Desktop
- Laden
- Bedienung
- Statusanzeige
- Navigation
- später Konfiguration/Builder/Replay/Turniere

### 6. E2E Mobile
Dieselben Kernfunktionen im Smartphone-Profil plus mobile Layout-/Touch-Aspekte.

### 7. Deployment-Smoke
Prüft tatsächlich veröffentlichte Seiten und Metadaten.

## Refactoring-Gate

Vor einem geplanten größeren Refactoring:
1. betroffenen Bereich identifizieren,
2. vorhandene Tests bewerten,
3. fehlende Verhaltens-/Charakterisierungstests ergänzen,
4. Tests grün bestätigen,
5. Refactoring durchführen,
6. vollständige Testsuite erneut ausführen,
7. Unterschiede nur akzeptieren, wenn sie als beabsichtigte Regeländerung dokumentiert sind.

## Ausbauziel

Die Testsuite soll schrittweise umfangreich werden. Nicht künstlich Tests erzeugen, sondern entlang realer Funktionen und Regeln wachsen. Der Backlog enthält deshalb neben Feature-Schritten ausdrücklich passende Testausbau-Schritte.
