# Backlog

Der Backlog zeigt die nächsten Entwicklungsschritte bewusst konkret und in Reihenfolge. Pro stündlichem Lauf werden bis zu drei unabhängige oder sicher sequenzierbare Schritte bearbeitet; unvollständige Schritte werden zuerst fortgesetzt. Nach jedem Lauf wird die Reihenfolge aktualisiert und der jeweils folgende Block weiter detailliert.

## Aktueller Zustand

**Phase:** Turnierlauf/Archiv verifiziert; K.-o.-UI und Fairness-Audit im Ausbau  
**Aktuelle stabile Version:** 0.1.54 (Publish #40111747415 am 24.10.2026 verifiziert)
**Nächstes Ziel:** NEXT-59 · Turnier-E2E/Refactoring vollständig abschließen (Entwicklungsbranch, unveröffentlicht)
**Kumulativ seit bestätigtem Release v0.1.54 vollständig getestet, nicht veröffentlicht:** **3 Aufgaben (NEXT-56, NEXT-57, NEXT-58)**. Development Tests #40119157124/#40119160281: 335 Unit-/Behavior-/Regressionstests, 68 Desktop-/Mobile-E2E, TypeScript/Build und npm audit (0 Befunde) grün. NEXT-59/60 teilweise implementiert, noch nicht abgeschlossen.

---

## Defensive-Korrektur · v0.1.53
- [x] Frühes Abstandhalten statt Warten bis 35 % Struktur
- [x] Verfolgungsstopp standardmäßig bei 70 %; Gegenfeuer innerhalb eigener Reichweite
- [x] Deterministische Engine-/Balance- und Desktop-/Mobile-Regressionen ergänzt
- [x] PR-/main-CI grün: 225 Unit-/Verhaltenstests und 46 Desktop-/Mobile-E2E; PR #45 integriert
- [x] 0.1.53 veröffentlicht, Infoseiten, Versionsarchiv und Build-Commit durch Online-Smoke verifiziert

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

### Erledigt in v0.1.49 · NEXT-35 · Aggressive Strategie
- [x] aggressive Zielannäherung als erste echte Strategie implementieren
- [x] Schussentscheidung mit bestehender Reichweiten-/Energielogik verbinden
- [x] deterministische Verhaltenstests mit festen Seeds ergänzen
- [x] Desktop/Mobile-Auswahl vorbereiten, ohne weitere Strategien vorwegzunehmen

### Erledigt in v0.1.50 · NEXT-36 · Distanzstrategie
- [x] gewünschte Kampfdistanz modellieren
- [x] Roboter bei zu großer Distanz annähern und bei zu kleiner Distanz Abstand gewinnen lassen
- [x] Arena-Grenzen und deterministische Bewegung absichern
- [x] Verhaltenstests für beide Distanzrichtungen ergänzen

### Erledigt in v0.1.50 · NEXT-37 · Defensive Strategie
- [x] defensive Entscheidungsregel auf Basis von Struktur und Distanz einführen
- [x] Rückzugsbewegung innerhalb der Arena absichern
- [x] Schießen während defensiver Bewegung eindeutig festlegen
- [x] feste Seed-Regressionen ergänzen

### Erledigt in v0.1.50 · NEXT-38 · Nahkampfstrategie
- [x] konsequentes Schließen der Distanz implementieren
- [x] Nahkampfverhalten mit Waffenreichweite koppeln
- [x] Stillstand/identische Positionen robust behandeln
- [x] deterministische Verhaltenstests ergänzen

### Erledigt in v0.1.52 · NEXT-39 · Strategieauswahl im Config-Dialog
- [x] Strategie für Roboter A und B auswählbar machen
- [x] Auswahl beim Start und Reset korrekt übernehmen
- [x] aktuelle Strategie in der Konfiguration sichtbar machen
- [x] Desktop- und Mobile-E2E ergänzen

### NEXT-40 · Energieverwaltungsparameter · ABGESCHLOSSEN / NICHT VERÖFFENTLICHT
- [x] Optionale Energiereserve 0–100 % der maximalen Energie, Default 0 %, mit Builder-Validierung modelliert
- [x] Schuss nur zulassen, wenn nach Energieverbrauch die Reserve erhalten bleibt; Regeneration erfolgt vor der Prüfung
- [x] Eingabe und Vorschau für A/B im Config-Dialog als Quellcode ergänzt, Reset auf 0 %
- [x] Unit-, Behavior-, Seed- und Desktop-/Mobile-Testfälle als Quellcode ergänzt
- [x] Development Tests #40085113036 auf Commit 193f42d0: 246 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build erfolgreich
- [x] Default 0 % und feste Seeds gegen Regressionen geprüft; Veröffentlichung bleibt ausschließlich manuell und steht aus

### Erledigt in v0.1.52 · NEXT-41 · Strategieparameter im Config-Dialog
- [x] relevante Strategieparameter abhängig vom Strategietyp anzeigen
- [x] Werte validieren und ungültigen Matchstart verhindern
- [x] Reset auf stabile Defaults absichern
- [x] Desktop- und Mobile-E2E ergänzen

### Erledigt in v0.1.52 · NEXT-42 · Strategievergleich in der Kampfanzeige
- [x] gewählte Strategien während des Kampfes kompakt sichtbar machen
- [x] keine Builder-Details zurück in die Kampfanzeige verschieben
- [x] Layout für kleine Displays absichern
- [x] bestehende Kampfanzeige regressionssicher halten

### Erledigt in v0.1.52 · NEXT-43 · Strategie-Testreview und Refactoring
- [x] Strategie-Verhaltensmatrix auf Lücken prüfen
- [x] feste Seed-Vergleiche aller Strategiepaarungen ergänzen
- [x] wiederholte Entscheidungslogik nur nach Charakterisierung refactoren
- [x] nächsten Planungszyklus aus F · Replay & Analyse konkretisieren

## Folgezyklus · F · Replay & Analyse

NEXT-40 und NEXT-44 sind getestet, aber nicht veröffentlicht. NEXT-45 ist der nächste offene Schritt; weitere Schritte sind geplant.

### NEXT-44 · Event Recorder · ABGESCHLOSSEN / NICHT VERÖFFENTLICHT
- [x] Seed, Startkonfigurationen, Initial-/Endzustand und Tick-Events in einem unveränderlichen Snapshot aufzeichnen.
- [x] Append-only-Recorder mit fortlaufenden Tick-IDs, Ereignisreihenfolge und Ende-Sperre ergänzen.
- [x] Tests für 0/1/3600 Ticks, Sofortsieg und Seed-Determinismus implementieren.
- [x] Development Tests #40088595774 auf SHA 7df3cacc: 252 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build erfolgreich.
- [x] Recorder-Tests und unveränderte Default-Kämpfe verifiziert; NEXT-44 als abgeschlossen und unveröffentlicht gezählt.

### NEXT-45 · Replay-Dateiformat und Validierung · ABGESCHLOSSEN / NICHT VERÖFFENTLICHT
- [x] JSON-Schema-Version 1 mit Seed, Arena, RobotDefinition-Snapshots, Tick-Events und Endzustand ergänzen.
- [x] Validierung von Schema-Version, Robot-IDs, Tick-Folge, Event-Referenzen, Arena und nicht endlichen Werten implementieren.
- [x] Unit-/Behavior-/Regressionstests für JSON-Roundtrip, 0-Tick, Sofortsieg und ungültige Daten ergänzen.
- [x] Development Tests #40088913689 auf SHA 9d6f719c: 258 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build erfolgreich.
- [x] Replay-Format als abgeschlossen und unveröffentlicht gezählt; NEXT-46 folgt frühestens im nächsten Stundenlauf.

### NEXT-46 · Replay exportieren und importieren · ABGESCHLOSSEN / NICHT VERÖFFENTLICHT
- [x] Live-Recorder um unveränderliche, wiederholbare Snapshots ohne Abschluss erweitern.
- [x] Deterministische JSON-Dateinamen, Browser-Download, 2-MB-Grenze und Schema-/ID-/Tick-Validierung beim Import.
- [x] Separaten zugänglichen Replay-Dialog mit Import-/Export-Knöpfen, Dateiauswahl und verständlicher Rückmeldung ergänzen.
- [x] Ungültiger Import und gültige Dateivorschau verändern den laufenden Kampf nicht; Wiedergabe erst NEXT-47.
- [x] Unit-/Behavior-/Regressionstests und Desktop-/Mobile-E2E als Quellcode ergänzt.
- [x] Development Tests #40092321506 auf Commit 556a2858: Typecheck, Build, **262 Unit-/Verhaltenstests und 50 Desktop-/Mobile-E2E erfolgreich**; NEXT-46 implementiert und getestet, unveröffentlicht.

### NEXT-47 · Replay-Player (implementiert und getestet, unveröffentlicht)
- [x] Ereignisbasierte Player-Zustandsmaschine mit Play/Pause/Einzelschritt/Ende aus validierten Frames; keine RNG-/Simulationsaufrufe.
- [x] Importierte Aufzeichnung und aktuellen Kampf im eigenen Replay-Dialog mit Tick- und Ereignisanzeige abspielen; Live-Kampf bleibt unverändert.
- [x] GitHub Development Tests #40096436278 (SHA 1b7413a): 268 Unit-/Behavior-/Regressionstests und 52 Desktop-/Mobile-E2E, Typecheck/Build grün; 0-Tick, Sofortsieg, 3600 Ticks, Pause/Ende, erneutes Öffnen und importierte JSON-Datei geprüft.
- [x] NEXT-47 als abgeschlossen und kumulativ unveröffentlicht gezählt; NEXT-48 übernimmt Zustandsrekonstruktion und grafische Zeitleiste.

### NEXT-48 · Replay-Zeitleiste · ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Seek auf Tick 0, Mitte, Ende und rückwärts; deterministische Zustandsrekonstruktion ohne neue Simulation.
- [x] Struktur, Energie, Position und Kampfeffekte nach Seek konsistent; Mobile-Touch und Tastatur geprüft.
- [x] Referenzzustände und Eventreihenfolge mit festen Seeds getestet; Development Tests #40100789839: 274 Unit-/Behavior-Tests, 56 Desktop-/Mobile-E2E, Typecheck/Build grün.

### NEXT-49 · Kampfstatistiken · ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Schüsse, Treffer, effektiven Schaden und Energieverbrauch aus aufgezeichneten Events berechnen.
- [x] Doppelte Events, Überkill, Sofortsieg, 0 Ticks und Timeout gesondert getestet.
- [x] A/B-Vergleich mit zugänglichen Labels und responsiver Ansicht; Development Tests #40100953952: 281 Unit-/Behavior-Tests, 58 Desktop-/Mobile-E2E, Typecheck/Build grün.

### NEXT-50 · Replay-Roundtrip und Testreview · ABGESCHLOSSEN, UNVERÖFFENTLICHT
- [x] Alle 16 Strategiepaarungen × Seeds 1/12/4711: Aufnahme→Export→Import→Player mit Zustands-/Event-Digests verglichen (48 Fälle).
- [x] Maximalgröße, beschädigte JSON-Daten, fehlende Frames und Desktop-/Mobile-E2E abgesichert.
- [x] Referenz-Snapshots, stabile Hash-Vergleiche und Performance der 48-Fälle-Suite im vollständigen CI-Lauf geprüft; Development Tests #40101113261: 284 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.

### NEXT-51 · Replay-Refactoring und Turnierplanung (erledigt, unveröffentlicht)
- [x] Gemeinsames `deepFreeze` in `src/engine/immutable.ts` extrahiert; Recorder-Export für Kompatibilität beibehalten; Replay-Format und Zustandsrekonstruktion importieren direkt aus dem reinen Modul.
- [x] Charakterisierungstests für verschachtelte Event-/Zustands-Snapshots, referenztreue Rückgabe, Primitivwerte und bereits eingefrorene Werte ergänzt.
- [x] Vollständige Unit-/Behavior-/Regression-/Desktop-/Mobile-Tests erfolgreich: Development Tests #40105284320 (gemeinsamer Immutable-Helper), anschließend #40105438397 und #40105486356.
- [x] Turnier-NEXT-52 bis NEXT-59 mit Datenmodell, Seeds, Round-Robin, Auswertung, UI, K.-o., Persistenz und E2E-Abnahmen konkret geplant.

### NEXT-52 · Turnierdatenmodell und Validierung (erledigt, unveröffentlicht)
- [x] Reines Modul `src/engine/tournament-model.ts`: Teilnehmer mit stabiler eindeutiger ID und validierter RobotDefinition, Turnier-ID, `format` (round-robin/knockout), `baseSeed` und `maxTicks`.
- [x] 2–16 Teilnehmer erzwingen; doppelte IDs, ungültige Definitionen, Nicht-Finite-Werte, negative/unsichere Seeds und leere Namen mit verständlichen Fehlern ablehnen.
- [x] Eingaben niemals mutieren; serialisierbare, versionierte Turnierdefinition mit deterministischem JSON-Roundtrip.
- [x] Unit-/Behavior-Tests: Grenzen 1/2/16/17, Duplikate, Invalid-Inputs, Deep-Copy, Wiederholbarkeit.

### NEXT-53 · Deterministischer Round-Robin-Spielplan (erledigt, unveröffentlicht)
- [x] Paarungen für 2–16 Teilnehmer genau einmal pro ungeordnetem Paar erzeugen: `n*(n-1)/2`; keine Selbstpaarungen.
- [x] Paarungsreihenfolge und Seeds allein aus Turnierdefinition und Matchindex ableiten, ohne globalen RNG; unabhängig von UI-/Ausführungsreihenfolge.
- [x] Gerade/ungerade Teilnehmerzahl, 2/3/4/16 Teilnehmer und Seed-Grenzen testen; Snapshot-Digests für feste Referenzturniere.

### NEXT-54 · Turnierauswertung und Rangfolge (abgeschlossen und getestet)
- [x] Ergebnisse als unveränderliche Datensätze (Teilnehmer-IDs, Seed, Gewinner/Unentschieden, Ticks, Reststruktur) erfassen; doppelte Match-IDs ablehnen.
- [x] Tabelle aus Ergebnissen berechnen: Spiele, Siege, Unentschieden, Niederlagen, Punkte 3/1/0, Struktur-Differenz.
- [x] Gleichstand deterministisch nach Punkten, Struktur-Differenz und stabiler Teilnehmer-ID auflösen; unvollständige Turniere anzeigen.
- [x] Unit-/Behavior-Tests: 0 Matches, Draw, Sieg, Überzählung, Duplikate, stabile Sortierung, keine Eingabemutation.

- Qualitätsnachweis: Development Tests #40109944097 (303 Unit/Behavior, 60 Desktop/Mobile, Typecheck/Build erfolgreich); unveröffentlicht.

### NEXT-55 · Responsives Turnier-UI-Grundgerüst
- [x] Eigenständiger Dialog mit Teilnehmern, Paarungen, Fortschritt und Tabelle; Sandbox-Kampfzustand strikt unverändert.
- [x] Tastaturbedienung, Fokusmanagement, klare Fehlerzustände und responsive Darstellung auf 375px und Desktop.
- [x] Playwright-E2E: Öffnen/Schließen, gültige/ungültige Eingaben, Scrollen, Touch und unveränderte Sandbox.

- **Verifiziert:** Development Tests #40110813524 auf SHA 9f17bc65: 303 Unit-/Behavior-Tests, 64 Desktop-/Mobile-E2E, Typecheck/Build erfolgreich; Sandbox-Isolation, 375px, Escape/Fokus und ungültige Eingaben geprüft.

### NEXT-56 · Deterministische Turnierausführung (implementiert und vollständig getestet, unveröffentlicht)
- [x] Runner verarbeitet geplante Paarungen seriell mit `runMatch`/Engine ohne UI-Kopplung; Pause/Fortsetzen/Abbrechen an Matchgrenzen.
- [x] Kein versteckter RNG; identische Definitionen liefern identische Ergebnisse und Reihenfolge, auch nach Pause.
- [x] Unit-/Behavior-/Performance-Tests für 2/4/16 Teilnehmer, feste Seeds, Timeout und Abbruch ohne Teilzustandsverlust (CI #40113922862 grün: 314 Unit/Behavior, 64 Desktop/Mobile).

### NEXT-57 · K.-o.-Bracket (vollständig getestet, unveröffentlicht)
- [x] Single-Elimination für 2–16 Teilnehmer, deterministische Freilose für die zuerst gesetzten Teilnehmer und keine doppelte Teilnahme pro Runde.
- [x] Unentschieden über Reststrukturanteil und danach stabile Setzreihenfolge auflösen, ohne RNG-Zusatz.
- [x] Engine-Regressionen 2/3/5/8/16 Teilnehmer, stabile Seeds/Champion/Matchzahl. CI #40119157124: grün. Browser-K.-o.-UI ist getrennte Folgeaufgabe.

### NEXT-58 · Turnier-Import/-Export und Wiederaufnahme (vollständig getestet, unveröffentlicht)
- [x] Versioniertes JSON mit Schema-/Größen-/Status-/Matchreihenfolgeprüfung und immutable Ergebnissen.
- [x] Browser-Import/Export, Resume an Matchgrenzen, keine doppelten Kämpfe; ungültiger Import erhält den laufenden Turnierstand.
- [x] Tests: pausierter und abgeschlossener Roundtrip, fehlerhafte Zustände/Progress/IDs, Sonder-IDs, Desktop-/Mobile-Dateiimport; CI #40119157124: grün.

### NEXT-59 · Turnier-E2E, Statistik und Refactoring (weiter in Abnahme)
- [x] Engine-Integration für 16 Teilnehmer/120 Round-Robin-Matches; Import-/Resume-Ergebnisse stimmen mit direktem Lauf überein.
- [x] Browser-E2E für Round Robin mit Pause/Resume, JSON-Download/-Upload und Tabellenstand; Desktop und Mobile.
- [x] K.-o.-Turnier in der Browseroberfläche integrieren und Desktop-/Mobile-E2E mit Tastatur, Gewinneranzeige und Freilosen ergänzen; ungültige Konfiguration und Touch-Details bleiben in der Abnahme.
- [ ] 16-Teilnehmer-Referenz-Digests für Tabelle und Bracket mit festen Seeds erstellen; Performance-/Speichergrenzen dokumentieren.
- [ ] Charakterisierung vor Runner/UI-Refactoring, anschließend vollständige Unit-/Behavior-/Regression-/E2E-Matrix erneut ausführen.

### NEXT-60 · Turnier-Fairness und Seed-Audit (weiter in Abnahme)
- [x] Reines Modul zählt Auftritte, A/B-Zuordnung und deterministische Seeds ohne Simulations-RNG.
- [x] Optional alternierende Seitenzuordnung; bestehender Spielplan bleibt im Default unverändert. Prototypartige Teilnehmer-IDs werden sicher gezählt.
- [x] Für 2/3/4/16 Teilnehmer A/B-Verteilung mit paarweisen Side-Swap-Simulationen deterministisch prüfen; dokumentierte Bias-Grenzwerte und Referenz-Digests bleiben offen.
- [ ] Alternierendes Format mit realem Runner und Ergebnis-/Seed-Ableitung abstimmen; regressionssichere Tests für Side-Swap und faire Turnierauswertung.

### NEXT-61 · Exportierbare Turniertabelle (implementiert, getestet)
- [x] Validierte Ergebnis- und Tabellen-Snapshots als versioniertes JSON und CSV ausgeben, ohne laufende Sandbox zu verändern.
- [x] Feste Spaltenreihenfolge, Unicode, dezimalpunktbasierte numerische Werte, CSV-Quoting, Formel-Injection-Schutz und unvollständige Turniere implementieren.
- [x] Unit-/Behavior-Tests für Sonderzeichen, 0 Ergebnisse und 16 Teilnehmer; Desktop-/Mobile-Download erfolgreich.

### NEXT-62 · Turnier-Leistung und Abbruchgrenzen
- [ ] 16-Teilnehmer-Round-Robin mit 120 Paarungen unter reproduzierbaren Bedingungen benchmarken; CPU-/Speicherbedarf erfassen.
- [ ] Matchgrenzen für Pause/Resume/Cancel und deterministische Zwischenspeicherung unter Last prüfen.
- [ ] Keine UI-Blockade: Ausführungsstrategie und Fortschrittsanzeige nach Messergebnissen festlegen; Regressionen absichern.

### NEXT-63 · Turnier-Zugänglichkeit und Robustheit
- [ ] Tastaturfokus, Screenreader-Status, Kontrast und Touch-Ziele in Dialog, Tabelle und Bracket prüfen.
- [ ] Ungültige Konfigurationen, Doppelklicks, wiederholtes Starten und Fenstergrößen 375px/Desktop abfangen.
- [ ] Browser-Behavior-Tests für Bedienung, Fehlerzustände und unveränderte Sandbox; vollständige Regression.

### NEXT-64 · Reproduzierbare und sichere Entwicklungsabhängigkeiten
- [ ] Deterministischen Lockfile-Prozess einführen, Abhängigkeitsversionen dokumentieren und `npm ci` auf Development Tests umstellen.
- [ ] Sicherheitsgate für neue Advisories und verifizierte Update-Strategie festlegen; keine automatische Veröffentlichung.
- [ ] CI-/Build-Reproduzierbarkeit auf unverändertem SHA mindestens zweimal verifizieren.

### NEXT-65 · K.-o.-Turnier im Browser
- [ ] K.-o.-Format auswählbar machen, Bracket und Freilose/Champion responsiv anzeigen.
- [ ] Ergebnisse mit dem isolierten Engine-Modul berechnen, ohne Sandbox oder laufendes Round-Robin-Turnier zu verändern.
- [ ] Desktop-/Mobile-Behavior-E2E für 3/5/16 Teilnehmer, Fokus/Touch, Seed-/Tie-Break-Anzeige und Reset ergänzen.

## Planungszyklus

- Nach spätestens 10 konkreten NEXT-Schritten oder sobald weniger als 5 konkrete NEXT-Schritte übrig sind, wird ein Planungszyklus fällig.
- Der Planungszyklus erzeugt wieder mindestens 5 und höchstens 10 kleine, eindeutig abschließbare NEXT-Schritte aus dem nächsten priorisierten Entwicklungsblock.
- Er bereinigt dabei bereits erledigte/stale Backlog-Punkte und prüft Test-/Refactoring-Bedarf.
- Ein Planungszyklus ist kein Feature-Lauf und verändert kein Spielverhalten.
- Der jeweils letzte Schritt eines Zyklus plant den nächsten Block konkret vor, damit kein planmäßiger Lauf ohne eindeutigen NEXT-Schritt endet.

---

## Parallel laufender Testausbau

Bei **jedem** Feature-Schritt:
- [x] neue Regel mit Unit-/Verhaltenstest absichern
- [x] bei Bugfix einen Regressionstest ergänzen
- [x] Testsuite-HTML um reale Testfälle erweitern
- [x] feste Seeds verwenden, wenn Verhalten reproduzierbar sein muss
- [x] vor Refactoring fehlende Charakterisierungstests ergänzen
- [x] nach Refactoring komplette Testsuite erneut ausführen

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

## Detaillierte Folgeabnahme (Planung, noch nicht implementiert)
- **NEXT-44 Recorder:** Seed und beide RobotDefinition-Snapshots einmalig beim Matchstart einfrieren; Tick/Events nur append-only; bei Replay-Aufnahme 0, 1 und 3600 Ticks sowie sofortigem Sieg Ereignisreihenfolge und unveränderte Eingaben prüfen.
- **NEXT-45 Replay-Format:** schemaVersion=1, Seed, Arenaabmessungen, Roboterdefinitionen, Tick-/Eventliste und Endzustand; ungültige IDs, Ticks, Versionen und Nicht-Finite-Werte mit benannten Fehlern ablehnen; JSON-Roundtrip deterministisch.
- **NEXT-46 Import/Export:** Download mit stabiler Dateibenennung; Dateiimport mit Größenlimit, Fehlerdialog und ohne Änderung des laufenden Matchs bei ungültigen Daten; Desktop/Mobile und Tastatur testen.
- **NEXT-47 Player:** Aufzeichnungen ohne SeededRandom erneut abspielen; Play/Pause/Step und Ende deterministisch; keine Simulation im Player; Tests für leere und früh beendete Kämpfe.
- **NEXT-48 Zeitleiste:** seek(0), seek(mitte), seek(ende), rückwärts springen; Energie/Struktur/Position/Effekte konsistent rekonstruieren; Desktop/Mobile inklusive Touch testen.
- **NEXT-49 Statistiken:** Shot-, Damage- und Energy-Kennzahlen ausschließlich aus Events ableiten; negative/überzählige Schäden ausschließen; Sieger/Unentschieden getrennt anzeigen.
- **NEXT-50 Roundtrip:** Alle 16 Strategiepaarungen × Seeds 1/12/4711 mit Export→Import→Player gegen Zustands-/Event-Digests prüfen; Speichergrenzen und Browser-E2E aufnehmen.
- **NEXT-51 Refactoring/Turnierplanung:** Recorder/Player-Schnittstellen nach Charakterisierung entkoppeln; bestehende Referenzen unverändert halten; 5–10 konkrete Turnieraufgaben mit Abnahmetests planen.
