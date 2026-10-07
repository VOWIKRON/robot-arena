# Backlog

Der Backlog zeigt die nächsten Entwicklungsschritte bewusst konkret und in Reihenfolge. Pro planmäßigem Lauf wird genau ein Schritt bearbeitet. Nach jedem Lauf wird die Reihenfolge aktualisiert und der jeweils folgende Block weiter detailliert.

## Aktueller Zustand

**Phase:** Einstieg in Kernsimulation  
**Aktuelle stabile Version:** 0.1.47  
**Nächstes Ziel:** Strategiesystem – NEXT-35 · Aggressive Strategie

---

## Konkrete nächste Läufe

### Erledigt in v0.1.6 · Ereignismodell-Grundtypen
- [x] Event-Typen für Bewegung, Schuss, Treffer und Schaden definiert
- [x] Event-Datenmodell vom Simulationszustand getrennt
- [x] Unit-Tests für Event-Erzeugung ergänzt
- [x] Testsuite-Doku um Event-Testfälle ergänzt

### Erledigt in v0.1.7 · Bewegungsereignisse
- [x] Bewegung als explizites Event erzeugt
- [x] Position vor/nach Bewegung im Event nachvollziehbar
- [x] Verhaltenstest: Bewegungsdistanz überschreitet Geschwindigkeitslimit nicht
- [x] Regressionstest: Event-Erzeugung mutiert Input-State nicht

### Erledigt in v0.1.8 · Schussereignisse
- [x] Schuss als Event mit Angreifer, Ziel und Tick
- [x] Bedingungen Reichweite, Energie und Cooldown explizit geprüft
- [x] Test: kein Schuss außerhalb Reichweite
- [x] Test: kein Schuss ohne ausreichende Energie
- [x] Test: kein Schuss während aktivem Cooldown

### Erledigt in v0.1.9 · Treffer- und Schadensereignisse
- [x] Treffer vom Schuss getrennt
- [x] Schaden als separates Event
- [x] Test: Schaden nie negativ
- [x] Test: Struktur nie unter 0
- [x] feste Seed-Regression für Schadensjitter

### Erledigt in v0.1.10 · Sieg- und Kampfende
- [x] Sieg als explizites Victory-Event
- [x] Kampf stoppt unmittelbar nach Zerstörung
- [x] Test: besiegter Roboter führt keine Aktion mehr aus
- [x] Test: fertiger Match-State bleibt inklusive Event-Stream stabil

### Erledigt in v0.1.11 · Zeitlimit und Unentschieden
- [x] explizites Match-Ende bei Tick-Limit
- [x] Unentschieden als outcome=draw mit endReason=timeout
- [x] Test für Sieg im exakt letzten zulässigen Tick
- [x] feste Seed-Regression für Timeout-Fälle

### Erledigt in v0.1.12 · Energieverhalten härten
- [x] Regeneration und Verbrauch durch Tests dokumentiert
- [x] Grenzfälle am Energiemaximum getestet
- [x] langer deterministischer Energietest vorhanden
- [x] Charakterisierungstests vor Engine-Refactoring ergänzt

### Erledigt in v0.1.13 · Bewegungs- und Arena-Grenzen
- [x] Arena-Grenzen erzwungen
- [x] Tests für x/y-Min/Max
- [x] Verhalten an identischen Positionen abgesichert
- [x] hohe Geschwindigkeiten bleiben innerhalb der Arena

### Erledigt in v0.1.14 · Regression-Seeds
- [x] feste Seed-Sammlung 1, 12 und 4711 definiert
- [x] bekannte Gewinner, Endticks und Reststruktur dokumentiert
- [x] Regressionstest gegen unbeabsichtigte Verhaltensänderungen ergänzt
- [x] Seeds im Testcode sichtbar festgehalten

### Erledigt in v0.1.15 · Test-Review vor Engine-Refactoring
- [x] Abdeckung der Kernregeln geprüft
- [x] Charakterisierung für exakte Reichweitengrenze und Cooldown=1 ergänzt
- [x] wiederholte Aktionsbedingungen in updateRobot als Refactoring-Kandidat identifiziert
- [x] gezieltes Refactoring erst nach Charakterisierung eingeplant

### Erledigt in v0.1.16 · Reichweite und Cooldown charakterisieren
- [x] Verhalten exakt an der Reichweitengrenze getestet
- [x] Cooldown-Abbau über mehrere Ticks charakterisiert
- [x] Regressionstest für ersten erlaubten Schuss nach Cooldown
- [x] Testsuite-Doku um Reichweiten-/Cooldown-Fälle ergänzt

### Erledigt in v0.1.17 · Event-Reihenfolge charakterisieren
- [x] Reihenfolge mehrerer Events innerhalb eines Ticks festgelegt
- [x] Shot/Hit/Damage-Reihenfolge pro handelndem Roboter abgesichert
- [x] Verhalten bei zwei handelnden Robotern charakterisiert
- [x] Testsuite-Doku um Event-Reihenfolge ergänzt

### Erledigt in v0.1.18 · Event-Stream deterministisch absichern
- [x] gleichen Seed gegen identischen Event-Stream testen
- [x] Event-Anzahl und Reihenfolge für feste Seeds charakterisieren
- [x] Regressionstest gegen unbemerkte Event-Änderungen
- [x] Testsuite-Doku um Event-Stream-Testfälle ergänzen

### Erledigt in v0.1.19 · Engine-Refactoring vorbereiten
- [x] charakterisierte Aktionslogik geprüft
- [x] kleinsten sicheren Refactoring-Schnitt festgelegt: Schussfreigabe in canFire zentralisiert
- [x] Verhalten vor Umbau vollständig durch bestehende Charakterisierungs- und Regressionstests abgesichert
- [x] keine sichtbare Verhaltensänderung

### Erledigt in v0.1.20 · Aktionslogik weiter entkoppeln
- [x] Energie-Regeneration, Cooldown-Abbau und Bewegung in prepareAction gekapselt
- [x] Verhalten durch bestehende Regressionstests abgesichert
- [x] nur interne Struktur geändert
- [x] keine sichtbare Verhaltensänderung

### Erledigt in v0.1.21 · Schussausführung kapseln
- [x] Schuss-/Treffer-/Schadensausführung aus updateRobot in fire() herausgelöst
- [x] Energie- und Cooldown-Änderungen unverändert gehalten
- [x] Event-Reihenfolge durch bestehende Regressionstests unverändert gehalten
- [x] keine sichtbare Verhaltensänderung

### Erledigt in v0.1.22 · Roboter- und Komponentensystem beginnen
- [x] Chassis und Waffen als erste kombinierbare Komponenten eingeführt
- [x] bestehende Raptor-/Titan-Presets ohne Verhaltensänderung auf Komponenten migriert
- [x] Konfigurationsvalidierung und Regressionstests ergänzt
- [x] Kombination unterschiedlicher Chassis/Waffen durch Test abgesichert

### Erledigt in v0.1.23 · Komponentenwahl sichtbar machen
- [x] Chassis- und Waffenwahl für Roboter A in der Oberfläche anbieten
- [x] berechnete Roboterwerte live anzeigen
- [x] Reset/Matchstart mit gewählter Konfiguration verbinden
- [x] Desktop- und Mobile-Bedienung absichern

### Erledigt in v0.1.24 · Komponentenwahl für Roboter B
- [x] Chassis- und Waffenwahl für Roboter B in der Oberfläche anbieten
- [x] berechnete Werte von Roboter B live anzeigen
- [x] Reset/Matchstart mit beiden gewählten Konfigurationen verbinden
- [x] Desktop- und Mobile-Bedienung für beide Konfigurationen absichern

### Erledigt in v0.1.25 · Komponentenvalidierung und Builder-Grenzen
- [x] ungültige Roboterkonfigurationen an der Builder-Grenze ablehnen
- [x] Validierungszustand für beide Roboter anzeigen
- [x] Matchstart bei ungültiger Konfiguration verhindern
- [x] Desktop- und Mobile-Verhalten für Validierungszustände absichern

### Erledigt in v0.1.26 · Motoren als Komponente
- [x] Motoren als eigene Komponente modelliert
- [x] Motorwahl für beide Roboter im Builder angeboten
- [x] berechnete Geschwindigkeitswerte live aktualisiert
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.27 · Panzerung als Komponente
- [x] Panzerung als eigene Komponente modelliert
- [x] Panzerungswahl für beide Roboter im Builder angeboten
- [x] berechnete Strukturwerte live aktualisiert
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.28 · Energieversorgung als Komponente
- [x] Energieversorgung als eigene Komponente modelliert
- [x] Energieauswahl für beide Roboter im Builder angeboten
- [x] berechnete Energiewerte live aktualisiert
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.30 · Sensorik als Komponente
- [x] Sensorik als eigene Komponente modelliert
- [x] Sensorwahl für beide Roboter im Builder angeboten
- [x] berechnete Sensorwerte live aktualisiert
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.31 · Gewichtslimits und gültige Komponentenkombinationen
- [x] Komponenten um Gewichtswerte ergänzt
- [x] zulässiges Gesamtgewicht je Chassis definiert
- [x] ungültige Kombinationen im Builder angezeigt und Matchstart gesperrt
- [x] Desktop- und Mobile-Bedienung abgesichert

### Erledigt in v0.1.34 · Roboter optisch unterscheidbarer machen
- [x] Roboter in der Arena visuell klar unterscheiden
- [x] Chassis-Auswahl in der Darstellung erkennbar machen
- [x] bestehende Kampflogik unverändert lassen
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.35 · Start/Reset reparieren und Tests massiv ausbauen
- [x] Start führt sofort einen sichtbaren Tick aus und startet anschließend den Lauf
- [x] Reset stoppt den Lauf und stellt Match, Seed und Standardkonfigurationen zuverlässig wieder her
- [x] Start/Pause/Einzelschritt/Reset und deterministischer Reset auf Desktop und Mobile absichern
- [x] Validierungs-Grenzfälle systematisch erweitern
- [x] Testsuite von 59 auf mindestens 93 Testausführungen erweitern

### Erledigt in v0.1.36 · Waffen am Roboter sichtbar machen
- [x] gewählte Waffe visuell am Roboter darstellen
- [x] Raptor- und Titan-Waffe unterscheidbar machen
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.37 · Projektil- und Schusseffekte
- [x] Shot-Events als sichtbare Schusslinien darstellen
- [x] Effekt zeitlich mit der Simulation koppeln
- [x] deterministisches Kampfverhalten unverändert lassen
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.38 · Treffer- und Schadenseffekte
- [x] Hit-/Damage-Events sichtbar machen
- [x] Trefferfeedback am Zielroboter darstellen
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.39 · Konfiguration in eigenen Dialog auslagern
- [x] Roboter-Konfiguration aus der Kampfanzeige herauslösen
- [x] eigenen Config-Dialog für beide Roboter anlegen
- [x] während des Kampfes nur kampfrelevante Live-Werte anzeigen
- [x] Desktop- und Mobile-Bedienung absichern

### Erledigt in v0.1.40 · Lebensbalken direkt über den Robotern
- [x] Lebens-/Strukturbalken über jedem Roboter anzeigen
- [x] Balken synchron zum tatsächlichen Strukturwert aktualisieren
- [x] bei Schaden sofort sichtbar reagieren
- [x] Desktop- und Mobile-Darstellung absichern

### Erledigt in v0.1.44 · Sichtbar flüssige Fahrbewegung
- [x] vorhandene Bewegungspositionen zwischen den Simulationsticks sichtbar animieren
- [x] Fahrbewegung ohne Änderung der deterministischen Engine darstellen
- [x] unterschiedliche Motorgeschwindigkeiten visuell nachvollziehbar machen
- [x] Desktop- und Mobile-Darstellung absichern

---

## Geplanter nächster Zyklus

### Erledigt in v0.1.47 · NEXT-34 · Strategietyp als Engine-Datenmodell
- [x] Strategietypen `aggressive`, `defensive`, `distance` und `melee` definiert
- [x] Strategie explizit je Roboterkonfiguration gespeichert
- [x] bestehendes Kampfverhalten als Default unverändert gehalten
- [x] Unit-/Regressionstests für Default und Serialisierbarkeit ergänzt

### NEXT-35 · Aggressive Strategie
- [ ] aggressive Zielannäherung als erste echte Strategie implementieren
- [ ] Schussentscheidung mit bestehender Reichweiten-/Energielogik verbinden
- [ ] deterministische Verhaltenstests mit festen Seeds ergänzen
- [ ] Desktop/Mobile-Auswahl vorbereiten, ohne weitere Strategien vorwegzunehmen

### NEXT-36 · Distanzstrategie
- [ ] gewünschte Kampfdistanz modellieren
- [ ] Roboter bei zu großer Distanz annähern und bei zu kleiner Distanz Abstand gewinnen lassen
- [ ] Arena-Grenzen und deterministische Bewegung absichern
- [ ] Verhaltenstests für beide Distanzrichtungen ergänzen

### NEXT-37 · Defensive Strategie
- [ ] defensive Entscheidungsregel auf Basis von Struktur und Distanz einführen
- [ ] Rückzugsbewegung innerhalb der Arena absichern
- [ ] Schießen während defensiver Bewegung eindeutig festlegen
- [ ] feste Seed-Regressionen ergänzen

### NEXT-38 · Nahkampfstrategie
- [ ] konsequentes Schließen der Distanz implementieren
- [ ] Nahkampfverhalten mit Waffenreichweite koppeln
- [ ] Stillstand/identische Positionen robust behandeln
- [ ] deterministische Verhaltenstests ergänzen

### NEXT-39 · Strategieauswahl im Config-Dialog
- [ ] Strategie für Roboter A und B auswählbar machen
- [ ] Auswahl beim Start und Reset korrekt übernehmen
- [ ] aktuelle Strategie in der Konfiguration sichtbar machen
- [ ] Desktop- und Mobile-E2E ergänzen

### NEXT-40 · Energieverwaltungsparameter
- [ ] Strategieparameter für Energiereserve definieren
- [ ] Schussfreigabe abhängig von Reserve modellieren
- [ ] Grenzfälle 0 %, Maximum und Regeneration testen
- [ ] deterministisches Verhalten absichern

### NEXT-41 · Strategieparameter im Config-Dialog
- [ ] relevante Strategieparameter abhängig vom Strategietyp anzeigen
- [ ] Werte validieren und ungültigen Matchstart verhindern
- [ ] Reset auf stabile Defaults absichern
- [ ] Desktop- und Mobile-E2E ergänzen

### NEXT-42 · Strategievergleich in der Kampfanzeige
- [ ] gewählte Strategien während des Kampfes kompakt sichtbar machen
- [ ] keine Builder-Details zurück in die Kampfanzeige verschieben
- [ ] Layout für kleine Displays absichern
- [ ] bestehende Kampfanzeige regressionssicher halten

### NEXT-43 · Strategie-Testreview und Refactoring
- [ ] Strategie-Verhaltensmatrix auf Lücken prüfen
- [ ] feste Seed-Vergleiche aller Strategiepaarungen ergänzen
- [ ] wiederholte Entscheidungslogik nur nach Charakterisierung refactoren
- [ ] nächsten Planungszyklus aus F · Replay & Analyse konkretisieren

## Planungszyklus

- Nach spätestens 10 konkreten NEXT-Schritten oder sobald weniger als 5 konkrete NEXT-Schritte übrig sind, wird ein Planungszyklus fällig.
- Der Planungszyklus erzeugt wieder mindestens 5 und höchstens 10 kleine, eindeutig abschließbare NEXT-Schritte aus dem nächsten priorisierten Entwicklungsblock.
- Er bereinigt dabei bereits erledigte/stale Backlog-Punkte und prüft Test-/Refactoring-Bedarf.
- Ein Planungszyklus ist kein Feature-Lauf und verändert kein Spielverhalten.
- Der jeweils letzte Schritt eines Zyklus plant den nächsten Block konkret vor, damit kein planmäßiger Lauf ohne eindeutigen NEXT-Schritt endet.

---

## Parallel laufender Testausbau

Bei **jedem** Feature-Schritt:
- [ ] neue Regel mit Unit-/Verhaltenstest absichern
- [ ] bei Bugfix einen Regressionstest ergänzen
- [ ] Testsuite-HTML um reale Testfälle erweitern
- [ ] feste Seeds verwenden, wenn Verhalten reproduzierbar sein muss
- [ ] vor Refactoring fehlende Charakterisierungstests ergänzen
- [ ] nach Refactoring komplette Testsuite erneut ausführen

---

## Danach: größere Entwicklungsblöcke

### C · Roboter- und Komponentensystem
Chassis, Motoren, Panzerung, Energie, Sensorik, Waffen, Gewichtslimits und Presets.

### D · Robot Builder
Komponentenwahl, Live-Werte, Validierung, Speichern/Laden, Import/Export.

**Späterer UI-Aufräumblock · niedrige Priorität**
- [ ] Roboter-Konfiguration aus dem rechten Kampfbereich herauslösen
- [ ] eigenen Config-Dialog für Chassis, Motor, Panzerung, Energie, Sensorik und Waffen anlegen
- [ ] Config-Dialog vor dem Kampf bzw. bei bewusster Neukonfiguration öffnen
- [ ] während des Kampfes rechts nur kampfrelevante Live-Werte anzeigen (z. B. aktuelle Struktur/Panzerung, Energie, Status)
- [ ] Kampfanzeige kompakter und klar von der Konfiguration trennen
- [ ] Desktop- und Mobile-Bedienung des Dialogs absichern

### E · Strategiesystem
Aggressiv, defensiv, Distanz, Nahkampf, Energieverwaltung und Strategieparameter.

### F · Replay & Analyse
Event Recorder, Replay-Datei, Player, Zeitleiste und Kampfstatistiken.

### G · Turniere
Round Robin, K.-o., Best-of-N, Tabellen, Seeds und Turnierstatistiken.

### H · Testlabor
Batch-Simulationen, Siegquoten, Reststruktur, Energieverbrauch, Seed-Vergleiche.

### I · Arenen & Spieltiefe
Hindernisse, Arena-Größen, Engstellen, Gefahren- und Energiezonen.

### J · Qualität, Performance & Refactoring
Testabdeckung, Flaky Tests, Performance, Accessibility, Architektur und Dependencies.

### K · Version 1.0
Stabile Sandbox mit Editor, Strategien, Replay, Turnieren, Testlabor und reproduzierbarer Releasequalität.

---

## Öffentliche Backlog-Regel

`backlog.html` zeigt:
1. aktuelle Version,
2. letzten Publish,
3. nächsten geplanten Lauf,
4. **den nächsten konkreten Schritt**,
5. **mehrere danach folgende konkrete Schritte in Reihenfolge**,
6. anschließend die größeren Entwicklungsblöcke.

So bleibt jederzeit sichtbar, was beim nächsten Lauf passiert und was unmittelbar danach vorgesehen ist.
