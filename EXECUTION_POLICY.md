# Oberste Ausführungspriorität – Aufgaben vollständig erledigen

**Verbindliche Arbeitsanweisung für alle Entwicklungsrunden und Automationen in Robot Arena.**

1. **Ausführen statt Zwischenberichte:** Eine vom Nutzer beauftragte Aufgabe wird vollständig und ohne künstliche Unterbrechung bis zur Abnahme bearbeitet. Keine freiwillige Beendigung nach Teil-Commits, einzelnen Tests oder Zwischenständen. Fehlende Zeit oder Kapazität darf nicht als Erfolg dargestellt werden.
2. **Nur zwei zulässige Abschlussarten:**
   - **ERFOLG:** Alle beauftragten Akzeptanzkriterien implementiert, dokumentiert, getestet und die Schreibresultate im GitHub-Branch verifiziert; Tests erfolgreich. Erst dann als abgeschlossen melden.
   - **BLOCKADE / NICHT LÖSBAR:** Wenn tatsächliche Hindernisse eine vollständige Umsetzung verhindern, konkret den Grund, technische Analyse, reproduzierbare Belege, bisherige Versuche, verbleibende Schritte und benötigte Entscheidung melden. Nicht stillschweigend unvollständig stoppen oder Erfolg behaupten.
3. **Fehler zuerst:** Fehlgeschlagene Tests, Regressionen und Sicherheitsbefunde vor neuen Features beheben. Danach komplette relevante Unit-, Behavior-, deterministische Simulations-, Desktop- und Mobile-Testmatrix wiederholen.
4. **Vollständigkeit vor Tempo:** Alle expliziten Unterpunkte des NEXT-/Backlog-Eintrags erfüllen; Teilergebnisse nicht als fertig kennzeichnen. Bei notwendigem Refactoring Charakterisierungstests vor und Regressionstests danach.
5. **Sicherer GitHub-Ablauf:** Tatsächlichen Branch-/PR-/Commit-/CI-Stand vorab prüfen, Änderungen seriell auf dem Entwicklungsbranch vornehmen, Schreibresultate und CI nach jedem Abschluss verifizieren. PROJECT_STATE.md, BACKLOG.md, CHANGELOG.md und RUN_STATE.md konsistent halten.
6. **Kein Publishing:** Keine Homepage-Änderung, kein publish.php, kein Release- oder Publishing-Workflow, kein Merge nach main bei Deployment-Risiko. Veröffentlichung ausschließlich auf ausdrücklichen manuellen Nutzerauftrag.
7. **Berichtspflicht:** Nach jedem Lauf kumulativ alle seit dem letzten bestätigten Release vollständig getesteten und noch nicht veröffentlichten NEXT-Aufgaben mit Nummer, Funktion, Teststatus und eindeutiger Kennzeichnung neuer Abschlüsse ausgeben. Ungeklärten Veröffentlichungsstatus ausdrücklich markieren.
8. **Priorität:** Diese Ausführungsregel hat für die Arbeitsweise Vorrang vor Bequemlichkeit, Statusberichten und dem Start neuer Backlogpunkte. Sicherheits-, System- und Berechtigungsgrenzen bleiben unberührt.

**Leitregel: Entweder vollständig liefern und Erfolg nachweisen – oder eine echte Blockade mit Ursachenanalyse melden. Niemals Teilerledigung als Endergebnis verkaufen.**
