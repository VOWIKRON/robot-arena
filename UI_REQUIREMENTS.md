# UI- und Veröffentlichungsanforderungen

Diese Datei definiert verbindliche Anforderungen für die öffentlich sichtbare Robot-Arena-Webseite.

## 1. Professioneller Auftritt

Die öffentliche Seite soll wie ein fertiges Produkt wirken.

Nicht öffentlich anzeigen:
- interne Entwicklungsbegriffe wie „Bootstrap“, „Debug-Build“, „Work in Progress“ oder ähnliche Meta-Hinweise,
- interne Prozesskommentare,
- technische Entwicklungsnotizen,
- unfertige Platzhaltertexte.

Erlaubt und erwünscht:
- klare Versionsangabe,
- sachliche Statusinformationen,
- professionelle Navigation,
- verständliche Spiel- und Systeminformationen.

Das visuelle Grunddesign der Version 0.1.0 wird als positive Ausgangsbasis beibehalten und schrittweise verfeinert.

## 2. Responsives Design

Jede veröffentlichte Version muss auf Desktop und Smartphone funktionieren.

Verbindlich:
- keine Desktop-only-Breiten,
- keine horizontale Zwangs-Scrollfläche,
- Touch-Bedienbarkeit,
- flexible Karten- und HUD-Anordnung,
- ausreichend große Bedienelemente,
- Arena passt sich an verfügbare Breite an,
- Desktop- und Mobile-E2E-Tests vor Publish.

## 3. Footer

Der Footer ist Bestandteil jeder öffentlichen Seite.

Er enthält mindestens:

### Testsuite
Linktext sinngemäß:
- Testsuite

Zusätzlich sichtbar:
- Datum und Uhrzeit des letzten erfolgreichen Publishs.

Zielseite:
- `testsuite.html`

Die Seite zeigt mindestens:
- Zeitpunkt des Builds,
- Zeitpunkt des Publishs,
- Version,
- Commit,
- Typecheck-Status,
- Unit-/Regressionstest-Status,
- Desktop-E2E-Status,
- Mobile-E2E-Status,
- Build-Status,
- optional Anzahl Tests und Dauer.

Die Testsuite-Seite darf nur tatsächlich ausgeführte Prüfungen und deren Ergebnis anzeigen.

Die Testsuite ist als echte Testfalldokumentation aufgebaut, nicht als Entwicklungsprotokoll. Sie gliedert die Prüfungen mindestens nach:
- statische Qualitätsprüfungen,
- Engine / Unit / Regression,
- Desktop-E2E,
- Mobile-E2E,
- Deployment / Online-Smoke.

Für jeden konkreten Testfall werden möglichst angegeben:
- Test-ID,
- Testbereich,
- Testfall,
- was konkret geprüft wird,
- Ergebnis,
- Zeitpunkt des letzten Testlaufs bzw. Builds.

Neue Produktfunktionen erhalten beim Hinzufügen passende Testfälle und werden in dieser Testsuite ergänzt. Die Testsuite soll mit dem Projekt schrittweise deutlich umfangreicher werden und insbesondere beobachtbares Verhalten absichern, damit interne Refactorings ohne unbemerkte Regeländerungen möglich sind. Charakterisierungs- und Regressionstests haben dafür ausdrücklich hohen Stellenwert.

### Release Notes
Linktext sinngemäß:
- Release Notes

Zusätzlich sichtbar:
- Datum und Uhrzeit des letzten erfolgreichen Publishs.

Zielseite:
- `release-notes.html`

Die Release Notes sind:
- HTML,
- kumulierend,
- neueste Version immer oben,
- ältere Releases bleiben sichtbar,
- jede Version enthält Datum, Uhrzeit und Versionsnummer,
- Änderungen werden knapp und verständlich beschrieben.

### Backlog
Linktext sinngemäß:
- Backlog

Zusätzlich sichtbar:
- Datum und Uhrzeit des letzten erfolgreichen Publishs,
- Zeitpunkt des nächsten geplanten Entwicklungslaufs.

Zielseite:
- `backlog.html`

Die Backlog-Seite zeigt:
- aktuelle Phase,
- nächsten Entwicklungsschritt,
- mehrere konkret priorisierte nächste Entwicklungsschritte in Reihenfolge,\n- danach kommende größere Entwicklungsblöcke,
- erledigte Bereiche,
- bekannte Blocker,
- Zeitpunkt des nächsten geplanten Laufs.

## 4. Zeitstempel

Die Zeitstempel werden beim Publish erzeugt und dürfen nicht manuell geschätzt werden.

Verwendete Werte:
- `publishedAt`
- `nextRunAt`
- `version`
- `commit`

Die Darstellung auf der Webseite erfolgt in verständlichem deutschem Datumsformat.

## 5. Versions- und Releaseinformationen

Jede öffentliche Version muss eindeutig identifizierbar sein.

Mindestens:
- Version,
- Publish-Zeitpunkt,
- Commit-ID oder verkürzte Commit-ID.

Die öffentliche Hauptseite darf die Versionsnummer dezent anzeigen, aber ohne interne Entwicklungsbegriffe.

## 6. Änderungsprinzip

Neue UI-Funktionen müssen:
1. responsive umgesetzt,
2. Desktop getestet,
3. mobil getestet,
4. in Release Notes dokumentiert,
5. im Backlog aktualisiert,
6. im Protokoll nachvollziehbar festgehalten werden.
