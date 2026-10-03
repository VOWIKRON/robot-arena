# Backlog

Der Backlog zeigt die nächsten Entwicklungsschritte bewusst konkret und in Reihenfolge. Pro täglichem Lauf wird genau ein Schritt bearbeitet. Nach jedem Lauf wird die Reihenfolge aktualisiert und der jeweils folgende Block weiter detailliert.

## Aktueller Zustand

**Phase:** Einstieg in Kernsimulation  
**Aktuelle stabile Version:** 0.1.9  
**Nächstes Ziel:** belastbares Ereignismodell mit wachsender Verhaltens-Testsuite

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

### NEXT-05 · Sieg- und Kampfende
- [ ] Sieg als Event
- [ ] Kampf stoppt nach Zerstörung
- [ ] Tests: besiegter Roboter führt keine Aktion mehr aus
- [ ] Tests: fertiger Match-State bleibt stabil

### NEXT-06 · Zeitlimit und Unentschieden
- [ ] explizites Match-Ende bei Tick-Limit
- [ ] definierte Unentschieden-Regel
- [ ] Tests für exakt letztes zulässiges Tick
- [ ] feste Regression-Seeds für Timeout-Fälle

### NEXT-07 · Energieverhalten härten
- [ ] Regeneration und Verbrauch als Regeln dokumentieren
- [ ] Grenzfälle 0/max testen
- [ ] Tests über lange Läufe
- [ ] Charakterisierungstests vor möglichem Engine-Refactoring

### NEXT-08 · Bewegungs- und Arena-Grenzen
- [ ] Arena-Grenzen erzwingen
- [ ] Tests für x/y-Min/Max
- [ ] Verhalten an identischen Positionen
- [ ] Tests für hohe Geschwindigkeiten

### NEXT-09 · Regression-Seeds
- [ ] feste kleine Seed-Sammlung definieren
- [ ] bekannte Gewinner/Endticks/Reststruktur dokumentieren
- [ ] Regressionstest gegen unbeabsichtigte Verhaltensänderungen
- [ ] Seeds in Testsuite sichtbar machen

### NEXT-10 · Test-Review vor Engine-Refactoring
- [ ] Abdeckung der Kernregeln prüfen
- [ ] fehlende Charakterisierungstests ergänzen
- [ ] Duplikation in Engine identifizieren
- [ ] erst danach gezieltes Refactoring planen

### NEXT-11 · Reichweite und Cooldown charakterisieren
- [ ] Verhalten exakt an der Reichweitengrenze testen
- [ ] Cooldown-Abbau über mehrere Ticks charakterisieren
- [ ] Regressionstest für ersten erlaubten Schuss nach Cooldown
- [ ] Testsuite-Doku um Reichweiten-/Cooldown-Fälle ergänzen

### NEXT-12 · Event-Reihenfolge charakterisieren
- [ ] Reihenfolge mehrerer Events innerhalb eines Ticks festlegen
- [ ] Tests für Move vor Shot/Hit/Damage
- [ ] Verhalten bei zwei handelnden Robotern charakterisieren
- [ ] Testsuite-Doku um Event-Reihenfolge ergänzen

### NEXT-13 · Event-Stream deterministisch absichern
- [ ] gleichen Seed gegen identischen Event-Stream testen
- [ ] Event-Anzahl und Reihenfolge für feste Seeds charakterisieren
- [ ] Regressionstest gegen unbemerkte Event-Änderungen
- [ ] Testsuite-Doku um Event-Stream-Testfälle ergänzen

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
