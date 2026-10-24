# Oberste Regel: Kein Arbeitsabbruch ohne Erfolg oder nachgewiesene Blockade

**Diese Regel gilt für jeden beauftragten Robot-Arena-Entwicklungslauf.**

## Zwingende Abschlussbedingung

**DIE ARBEIT DARF NICHT BEENDET WERDEN, SOLANGE NICHT ENTWEDER (A) DIE GESAMTE BEAUFTRAGTE AUFGABE ERFOLGREICH ABGESCHLOSSEN UND VERIFIZIERT IST ODER (B) EIN TATSÄCHLICHER, KONKRET NACHGEWIESENER HINDERUNGSGRUND DIE FORTSETZUNG UNMÖGLICH MACHT.**

- **A – Erfolg:** Sämtliche Akzeptanzkriterien erledigt, Änderungen auf GitHub geschrieben und geprüft, relevante Unit-/Behavior-/Regressions-/Simulations-/Desktop-/Mobiltests grün. Erst danach Erfolg melden und den Lauf beenden.
- **B – Echter Hinderungsgrund:** Nur wenn eine konkrete technische, rechtliche, sicherheitsbezogene oder Berechtigungsblockade trotz sinnvoller Diagnose und Behebungsversuche eine Fortsetzung tatsächlich verhindert. Exakte Fehlermeldung, Ursache, Versuche, Belege und erforderliche Entblockung nennen. Erst dann darf der Lauf ohne Erfolg enden.

**Kein dritter Abschlussweg.** Insbesondere sind Zeitaufwand, viele Toolaufrufe, ein Zwischenstand, teilweise erledigte Tasks, noch laufende CI, unvollständige Dokumentation, ein misslungener Test oder ein offener Backlogpunkt **kein Grund zum Beenden**. Bei fehlgeschlagenen Tests Fehler beheben und erneut prüfen. Bei ausstehender CI deren Abschluss abwarten. Bei unvollständigen Akzeptanzkriterien weiterarbeiten.

## Ausführung

1. Nutzerauftrag und Akzeptanzkriterien vorab vollständig erfassen; Fehler und offene Punkte zuerst.
2. Tatsächlichen GitHub-/Branch-/PR-/Commit-/CI-Stand prüfen, seriell entwickeln, nach jedem Schreibvorgang verifizieren.
3. Ohne unnötige Rückfragen implementieren, testen, Fehler korrigieren, refactoren, erneut testen, bis A oder B erfüllt ist.
4. PROJECT_STATE.md, BACKLOG.md, CHANGELOG.md und RUN_STATE.md sowie relevante Quellseiten konsistent aktualisieren; kumulativ alle seit dem letzten bestätigten Release fertig getesteten, aber unveröffentlichten NEXT-Tasks dokumentieren.
5. **Kein Publishing, kein Deployment, kein publish.php, kein Merge nach main mit Deployment-Risiko.** Nur ausdrücklicher Nutzerauftrag erlaubt Veröffentlichung.
6. Der Abschlussbericht nennt entweder belegten Gesamterfolg samt Test-/Commitstatus oder eine konkrete, analysierte, tatsächlich unüberwindbare Blockade. **Keine Abschlussmeldung über bloße Fortschritte.**

**Oberste operative Priorität: NICHT AUFHÖREN, BEVOR ERFOLG ODER ECHTE BLOCKADE FESTSTEHT.** Sicherheits- und Systemgrenzen bleiben gültig.
