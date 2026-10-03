# Backlog

Der Backlog zeigt bewusst zuerst größere Entwicklungsblöcke. Wenn ein Block an die Reihe kommt, wird er in kleinere, täglich abarbeitbare Schritte zerlegt.

## Aktueller Zustand

**Phase:** Fundament und Veröffentlichung  
**Aktuelle stabile Version:** 0.1.0  
**Nächstes Ziel:** öffentliche Projektinformationen und sauberer Footer

---

## A. Fundament & Veröffentlichungsqualität

### Bereits erledigt
- [x] Repository-Struktur
- [x] TypeScript strict
- [x] Vite-Build
- [x] deterministische Seed-Quelle
- [x] erste Simulationsengine
- [x] Vitest-Grundtests
- [x] Playwright Desktop
- [x] Playwright Mobile
- [x] GitHub Actions CI
- [x] automatischer Publish nach grüner CI
- [x] versionierte Releases unter `releases/vX.Y.Z/`

### Als Nächstes
- [ ] professionelle Footer-Struktur einbauen
- [ ] `testsuite.html` automatisch erzeugen
- [ ] `release-notes.html` kumulierend erzeugen
- [ ] `backlog.html` aus Projektstatus/Backlog erzeugen
- [ ] Publish-Zeitstempel im Footer anzeigen
- [ ] Zeitpunkt des nächsten geplanten Laufs anzeigen
- [ ] interne/metaartige Beschriftungen aus der öffentlichen Oberfläche entfernen
- [ ] Cache-/Versionsanzeige sauber machen
- [ ] ESLint und Formatter ergänzen
- [ ] Architekturgrenzen automatisiert prüfen

---

## B. Kernsimulation

Ziel: aus der aktuellen Demo eine nachvollziehbare, belastbare Kampfsimulation machen.

Geplant:
- [ ] vollständiges Ereignismodell
- [ ] Waffenaktionen als Events
- [ ] Trefferereignisse
- [ ] Schadensereignisse
- [ ] Kampfende bei Zerstörung
- [ ] Kampfende bei Zeitlimit
- [ ] Unentschieden-Regeln
- [ ] Energieverbrauch verfeinern
- [ ] Bewegungsregeln stabilisieren
- [ ] Arena-Grenzen und Kollisionen
- [ ] deterministische Regression-Seeds festlegen

Wenn dieser Block beginnt, wird er in einzelne tägliche Schritte zerlegt.

---

## C. Roboter- und Komponentensystem

Ziel: unterschiedliche Roboterkonzepte ermöglichen.

Geplant:
- [ ] Chassis-System
- [ ] Motoren
- [ ] Panzerung
- [ ] Energiesysteme
- [ ] Sensorik
- [ ] mehrere Waffen
- [ ] Gewichtslimits
- [ ] gültige/ungültige Konfigurationen
- [ ] mehrere Preset-Roboter

---

## D. Robot Builder

Ziel: Roboter ohne Code im Browser konfigurieren.

Geplant:
- [ ] Komponenten auswählen
- [ ] Gewicht anzeigen
- [ ] Energiebedarf anzeigen
- [ ] Werte live berechnen
- [ ] ungültige Kombinationen markieren
- [ ] Roboter speichern
- [ ] Roboter laden
- [ ] JSON Export
- [ ] JSON Import

---

## E. Strategiesystem

Ziel: Roboter unterscheiden sich nicht nur durch Hardware, sondern durch Verhalten.

Geplant:
- [ ] Strategy Interface
- [ ] aggressiv
- [ ] defensiv
- [ ] Distanz halten
- [ ] Nahkampf
- [ ] Energie sparen
- [ ] konfigurierbare Strategieparameter
- [ ] Strategie-Telemetrie

---

## F. Replay & Analyse

Ziel: Kämpfe verstehen und reproduzieren.

Geplant:
- [ ] Event Recorder
- [ ] Replay-Dateiformat
- [ ] Replay Player
- [ ] Pause
- [ ] Geschwindigkeit
- [ ] Zeitleiste
- [ ] Kampfstatistiken
- [ ] Trefferquote
- [ ] Energieanalyse
- [ ] Debug-/Analyseansicht

---

## G. Turniere

Ziel: mehrere Roboter automatisch gegeneinander antreten lassen.

Geplant:
- [ ] Round Robin
- [ ] K.-o.
- [ ] Best of N
- [ ] Tabellen
- [ ] Punktesystem
- [ ] Turnier-Seeds
- [ ] Wiederaufnahme abgebrochener Turniere
- [ ] Turnierstatistiken

---

## H. Testlabor

Ziel: viele Kämpfe automatisiert auswerten.

Geplant:
- [ ] Batch-Simulation
- [ ] 100 / 1.000 / 10.000 Kämpfe
- [ ] Siegquoten
- [ ] Durchschnittsschaden
- [ ] Reststruktur
- [ ] Energieverbrauch
- [ ] Vergleich verschiedener Seeds
- [ ] Stabilitätsprüfung

---

## I. Arenen & Spieltiefe

Geplant:
- [ ] Hindernisse
- [ ] Säulen
- [ ] unterschiedliche Arena-Größen
- [ ] Engstellen
- [ ] Gefahrenzonen
- [ ] Energiezonen
- [ ] alternative Siegbedingungen

---

## J. Qualität, Performance & Refactoring

Dieser Block läuft nicht erst am Ende, sondern parallel zur gesamten Entwicklung.

Regelmäßig:
- [ ] Testabdeckung prüfen
- [ ] Regressionstests ergänzen
- [ ] Flaky Tests beseitigen
- [ ] Refactoring-Sessions durchführen
- [ ] Duplikation reduzieren
- [ ] Kopplung prüfen
- [ ] Performance messen
- [ ] Memory-Leaks prüfen
- [ ] Accessibility prüfen
- [ ] Desktop-UX prüfen
- [ ] Mobile-UX prüfen
- [ ] Dependency Audit

---

## K. Version 1.0

Zielbild:
- [ ] stabile Sandbox
- [ ] Robotereditor
- [ ] mehrere Komponenten
- [ ] mehrere Strategien
- [ ] Replay
- [ ] Statistiken
- [ ] Turniere
- [ ] Testlabor
- [ ] persistente Speicherung
- [ ] responsive Desktop-/Mobile-Oberfläche
- [ ] reproduzierbare Releases
- [ ] vollständige Testsuite
- [ ] dokumentierter Releaseprozess

---

## Darstellungsregel für backlog.html

Die öffentliche Backlog-Seite soll diese Struktur verständlich abbilden.

Oben:
1. aktuelle Version
2. letzter Publish
3. nächster geplanter Lauf
4. nächster konkreter Entwicklungsschritt

Darunter:
- größere Entwicklungsblöcke,
- Fortschritt,
- erledigte Bereiche,
- offene Bereiche.

Detailaufgaben werden erst dann weiter zerlegt, wenn der jeweilige Block an die Reihe kommt.
