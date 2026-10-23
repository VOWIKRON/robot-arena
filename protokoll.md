# Arbeits- und Entscheidungsprotokoll

## 2026-10-03 – Bootstrap

**Ausgangszustand:** Neues GitHub-Repository mit initialem README und vorbereiteten Webordnern.

**Entscheidung:** Projektfundament als TypeScript/Vite-Webanwendung aufsetzen. Simulation und UI bleiben getrennt.

**Umgesetzt:**
- deterministische PRNG
- minimale Match-Engine
- Raptor und Titan
- responsive HTML/CSS-Oberfläche
- Unit-/Regressionstests
- Playwright Smoke-Test
- GitHub Actions
- täglicher Entwicklungsprozess
- Publisher-Vorlage

**Verworfen:** Direkte Veröffentlichung ohne automatisierte Tests.

**Grund:** Der tägliche Entwicklungsprozess soll niemals einen bekannten roten Stand veröffentlichen.

**Lokale Prüfung:** Paketinstallation in der Ausführungsumgebung lief in ein Timeout. Deshalb ist der verbindliche Erstcheck GitHub CI; ein grünes CI-Ergebnis ist Voraussetzung für den ersten Publish.

**Nächster Schritt:** CI-Ergebnis prüfen, Fehler beheben, anschließend publish.php serverseitig installieren und ersten Release-Build veröffentlichen.

---

## 2026-10-03 – Öffentliche Darstellung und Projekttransparenz

**Neue verbindliche Anforderungen:**
- keine internen/metaartigen Überschriften auf der öffentlichen Seite,
- professionelles Erscheinungsbild,
- bestehende visuelle Richtung von v0.1.0 beibehalten,
- Footer mit Testsuite, Release Notes und Backlog,
- alle drei Bereiche zeigen den Zeitpunkt des letzten Publishs,
- Backlog zeigt zusätzlich den Zeitpunkt des nächsten geplanten Laufs,
- Release Notes werden als kumulierende HTML-Seite geführt,
- neueste Release-Information steht immer oben,
- ältere Releases bleiben sichtbar,
- Backlog wird zunächst in größeren Entwicklungsblöcken gezeigt,
- ein Block wird erst bei Bearbeitung in kleinere tägliche Schritte zerlegt.

**Entscheidung:**
Diese Anforderungen werden nicht als optionale UI-Idee behandelt, sondern in `UI_REQUIREMENTS.md`, `DAILY_DEVELOPMENT.md`, `BACKLOG.md` und `PROJECT_STATE.md` verankert.

**Nächster Umsetzungsschritt:**
Footer- und Informationsseiten implementieren und in die Publish-Pipeline integrieren.

---

## 2026-10-03 – Manueller erster Tageslauf

**Ausgangszustand:** CI und bestehender Publish waren grün. Der nächste geplante Schritt war die öffentliche Footer-/Informationsstruktur.

**Umgesetzter Entwicklungsschritt:** Footer und öffentliche Informationsseiten als ein zusammenhängender Produkttransparenz-Schritt.

**Umgesetzt:**
- Footer auf der Arena mit Testsuite, Release Notes und Backlog,
- Anzeige des letzten Publish-Zeitpunkts,
- Anzeige des nächsten geplanten Laufs,
- `testsuite.html`,
- kumulierende `release-notes.html`,
- `backlog.html`,
- responsive gemeinsame Darstellung,
- zusätzliche E2E-Abdeckung für Desktop und Mobile,
- Build-Metadaten für Version, Commit, Buildzeit, Next Run und Qualitätsgates.

**Auffälligkeit im Testlauf:** Die bisherige Pipeline veröffentlichte nach jedem grünen Commit auf `main`. Da ein täglicher Entwicklungsschritt aus mehreren Commits bestehen kann, wurde v0.1.1 bereits während des laufenden Arbeitsschritts veröffentlicht. Weitere Publish-Versuche derselben unveränderlichen Version konnten dadurch kollidieren.

**Korrektur:** Der Publish-Workflow besitzt jetzt ein explizites Release-Gate. CI läuft weiterhin bei jedem Commit, aber der eigentliche Publish wird nur ausgeführt, wenn der abschließende Commit mit `release:` markiert ist. Dadurch bleiben Zwischenstände testbar, aber unveröffentlicht.

**Refactoring:** Die Release-Pipeline wurde in diesem Lauf gezielt gehärtet; unnötige Publish-Versuche während eines Entwicklungsschritts werden künftig vermieden.

**Tests:** Die vorhandene Testsuite wurde um Footer- und Informationsseiten-Smoketests erweitert. CI war für die neuen E2E-Tests grün.

**Nächster Entwicklungsschritt:** Kernsimulation – Ereignismodell-Grundstruktur für Bewegung, Schuss, Treffer und Schaden.

---

## 2026-10-03 – Testsuite als ausführliches öffentliches Laufprotokoll

**Anforderung:** Die Online-Testsuite soll denselben Detailgrad wie die Rückmeldung nach einem Daily-Lauf besitzen.

**Umgesetzt:**
- technischer Ampelstatus bleibt erhalten,
- zusätzlich vollständiges 20-Punkte-Laufprotokoll,
- Ausgangszustand und gewählter Schritt,
- umgesetzte Änderungen und ergänzte Tests,
- Typecheck, Unit-/Regressionstests und Build,
- Desktop- und Mobile-E2E getrennt,
- Refactoring und erneute Gesamttestsuite,
- Dokumentationsänderungen, Version und Commit,
- CI und Publish,
- Online-Smoke-Test,
- Auffälligkeiten, Fehler und Blocker,
- nächster Entwicklungsschritt und nächster geplanter Lauf.

**Verbindliche Regel:** Diese ausführliche Darstellung wurde in UI_REQUIREMENTS.md und DAILY_DEVELOPMENT.md festgeschrieben. Fehler oder Umwege dürfen auf der öffentlichen Testsuite-Seite nicht verschwiegen werden.

**Test:** Playwright prüft nun zusätzlich, dass der ausführliche Laufbericht und der Abschnitt zu Auffälligkeiten/Fehlern auf der Testsuite-Seite vorhanden sind.

---

## 2026-10-03 – Korrektur Testsuite-Darstellung

**Klarstellung:** Die öffentliche Testsuite soll kein Entwicklungsablauf-Protokoll sein.

**Korrigiert:**
- 20-Punkte-Ablauf aus der öffentlichen Testsuite entfernt,
- Tests nach Bereichen gegliedert,
- konkrete Testfälle mit Test-IDs dokumentiert,
- Prüfinhalt und Ergebnis je Testfall sichtbar,
- statische Qualitätsprüfungen separat dargestellt,
- Desktop und Mobile getrennt,
- Deployment-/Online-Smoke-Checks als eigener Bereich,
- Testzeitpunkt über Build-Metadaten sichtbar.

**Regel:** Entwicklungsentscheidungen und Auffälligkeiten gehören in protokoll.md und in die Task-Rückmeldung; testsuite.html dokumentiert ausschließlich Tests und Qualitätsprüfungen.

---

## 2026-10-03 – Testsuite für Refactoring und konkreter Rolling Backlog

**Neue Vorgabe:** Die Testsuite wird nicht nur funktional größer, sondern sichert gezielt beobachtbares Verhalten und Spielregeln ab. Ziel ist, spätere Refactorings durchführen zu können, ohne unbeabsichtigte Verhaltensänderungen.

**Direkt ergänzt:**
- stabiler Initialzustand,
- genau ein Tick pro Schritt,
- Eingabestate bleibt unverändert,
- Roboter nähern sich außerhalb der Kampfdistanz an,
- Energie bleibt innerhalb gültiger Grenzen,
- Struktur steigt im Kampf nicht,
- fertiger Match-State bleibt unverändert.

**Teststrategie:** Neue Datei TEST_STRATEGY.md beschreibt Unit-, Verhaltens-, Charakterisierungs-, Regression-, Desktop-, Mobile- und Deployment-Tests sowie das Refactoring-Gate.

**Backlog-Regel:** Der Backlog enthält künftig nicht nur den nächsten Punkt, sondern mindestens 5–10 konkret priorisierte Folgeschritte. Feature- und Testausbau werden dabei gekoppelt.

**Konkrete nächste Schritte:** NEXT-01 bis NEXT-10 wurden für Ereignismodell, Bewegung, Schuss, Treffer/Schaden, Sieg, Timeout, Energie, Arena-Grenzen, Regression-Seeds und Test-Review definiert.

---

## 2026-10-03 – Manueller Tageslauf 2: NEXT-01 Ereignismodell-Grundtypen

**Ausgangszustand:** v0.1.5 war veröffentlicht, CI und Publish waren grün. Der Rolling Backlog markierte NEXT-01 als nächsten Schritt.

**Umgesetzt:**
- neues separates Modul `src/engine/events.ts`,
- diskriminierte Event-Typen `MoveEvent`, `ShotEvent`, `HitEvent`, `DamageEvent`,
- gemeinsame Union `CombatEvent`,
- Factory-Funktionen für alle vier Event-Arten,
- Bewegungsereignisse kopieren Positionsdaten, damit keine unbeabsichtigte Referenzkopplung entsteht.

**Tests ergänzt:**
- EVT-001: Move-Event mit kopierten Positionen,
- EVT-002: Shot-Event mit Angreifer, Ziel und Energieverbrauch,
- EVT-003: Hit-Event mit Angreifer und Ziel,
- EVT-004: Damage-Event mit Quelle, Ziel und Schadenshöhe.

**Abgrenzung:** Die bestehende Simulation erzeugt diese Events noch nicht. Das ist bewusst erst NEXT-02 ff.; NEXT-01 schafft ausschließlich das stabile Event-Datenmodell und seine Tests.

**Backlog:** NEXT-01 erledigt, NEXT-02 Bewegungsereignisse ist neuer nächster Schritt. NEXT-11 wurde ergänzt, damit weiterhin mindestens zehn konkrete Folgeschritte sichtbar bleiben.

**Refactoring-Schutz:** Das Event-Datenmodell ist vom Match-State getrennt. Damit kann die Simulation in den nächsten Schritten schrittweise auf Events umgestellt werden, ohne die bestehenden Verhaltensregeln gleichzeitig umbauen zu müssen.

---

## 2026-10-03 – Manueller Tageslauf 3: NEXT-02 Bewegungsereignisse

**Ausgangszustand:** v0.1.6 war veröffentlicht; CI, Unit-Tests, E2E und Publish waren grün. NEXT-02 war als nächster Rolling-Backlog-Punkt markiert.

**Umgesetzt:**
- `stepMatchWithEvents` ergänzt,
- bestehendes `stepMatch` bleibt kompatibel und delegiert auf die neue Event-Variante,
- Bewegungen erzeugen jetzt echte `MoveEvent`-Einträge,
- Move-Events enthalten Tick, Roboter-ID, Position vorher und Position nachher,
- bei keiner Bewegung entsteht kein Move-Event.

**Tests ergänzt:**
- MOV-001: Vorher-/Nachher-Positionen und Event-Daten,
- MOV-002: Bewegung überschreitet pro Tick nie die konfigurierte Geschwindigkeit,
- MOV-003: Event-Erzeugung mutiert den Input-State nicht.

**Bedienung/Verhalten:** Für den Spieler ändert sich in diesem Schritt bewusst noch nichts an Buttons, Darstellung oder Kampfablauf. Das beobachtbare Bewegungsverhalten soll gleich bleiben. Neu ist die interne Nachvollziehbarkeit jeder Bewegung als Event – Grundlage für Replay, Analyse und sicheres Refactoring.

**Backlog:** NEXT-02 erledigt, NEXT-03 Schussereignisse ist neuer nächster Schritt. NEXT-12 Event-Reihenfolge wurde ergänzt, damit die konkrete Folgeplanung weiter mindestens zehn Schritte umfasst.

---

## 2026-10-03 – Manueller Tageslauf 4: NEXT-03 Schussereignisse

**Ausgangszustand:** v0.1.7 war veröffentlicht; CI, Unit-/Regressionstests, Desktop/Mobile-E2E und Publish waren grün. NEXT-03 war als nächster Rolling-Backlog-Punkt markiert.

**Umgesetzt:**
- erfolgreiche Schüsse erzeugen jetzt echte `ShotEvent`-Einträge,
- Shot-Events enthalten Tick, Angreifer-ID, Ziel-ID und Energiekosten,
- die bestehenden Regeln für Reichweite, Energie und Cooldown bleiben unverändert und steuern nun zusätzlich die Event-Erzeugung,
- Treffer und Schaden bleiben bewusst noch außerhalb dieses Schritts und folgen in NEXT-04.

**Tests ergänzt:**
- SHOT-001: gültiger Schuss erzeugt Shot-Event,
- SHOT-002: kein Shot-Event außerhalb der Reichweite,
- SHOT-003: kein Shot-Event ohne ausreichende Energie,
- SHOT-004: kein Shot-Event bei weiterhin aktivem Cooldown.

**Bedienung/Verhalten:** Sichtbar ändert sich für den Spieler noch nichts an Buttons oder Darstellung. Das beobachtbare Schussverhalten bleibt absichtlich gleich; neu ist, dass jede Schussentscheidung explizit als Event nachvollziehbar und gegen die drei Sperrbedingungen testbar ist.

**Backlog:** NEXT-03 erledigt, NEXT-04 Treffer & Schaden ist neuer nächster Schritt. NEXT-13 Event-Stream-Determinismus wurde ergänzt, damit die konkrete Folgeplanung weiter ausreichend tief bleibt.


---

## 2026-10-03 – Automatischer Probelauf: NEXT-04 Treffer und Schaden

**Ausgangszustand:** v0.1.8 live; CI des neuen Ticker-Publishpfads grün.

**Umgesetzt:** Shot, Hit und Damage getrennt; angewandter Schaden auf 0 und Reststruktur begrenzt; Event-Reihenfolge Shot → Hit → Damage.

**Tests:** HIT-001, DMG-001/002/003 einschließlich Strukturgrenze und festem Seed 4711.

**Refactoring:** Schadensanwendung in rawDamage und appliedDamage getrennt; Event-Nutzlast entspricht dem tatsächlich angewandten Schaden.

**Publishprinzip:** ein gebündelter Entwicklungscommit, CI als Gate, automatischer Publish nur für neue Version 0.1.9.

**Nächster Schritt:** NEXT-05 Sieg und Kampfende.

## 2026-10-23 – NEXT-35 · Aggressive Strategie (v0.1.49)

**Ausgangszustand:** main v0.1.48, NEXT-34 abgeschlossen. Vor Änderung Typecheck, 81 Unit-/Regressionstests und Build grün. Kein offener NEXT-35-PR gefunden.

**Schnitt/Entscheidung:** Die bisher implizite Annäherung wird als explizite aggressive Strategie gekapselt: Zielabstand 80 % der effektiven, bereits sensorbegrenzten Waffenreichweite. Das hält die bisherigen Default-Ergebnisse stabil und grenzt die spätere Nahkampfstrategie ab. Andere Strategietypen behalten bis zu ihrem eigenen NEXT-Schritt das Legacy-Verhalten. Bewegung findet vor der bestehenden zentralen Schussfreigabe statt; auch bei Energiemangel/Cooldown wird weiter angenähert. Keine neue Zufallsquelle und keine geänderte Event-Reihenfolge.

**UI-Vorbereitung:** Gemeinsamer Katalog enthält ausschließlich implementiertes Aggressiv. Beide UI-Konfigurationen übergeben den Default explizit; beide Vorschauen zeigen Aggressiv. Keine verfrühte Auswahl unfertiger Strategien; vollständige Auswahl bleibt NEXT-39.

**Tests:** 15 neue Unit-/Verhaltenstest-Ausführungen: Annäherung, Teilbewegung, Stillstand ohne Rückzug, identische Position, Immutability, Event-Reihenfolge, Reichweiten-/Energie-/Cooldown-Sperren und Grenzfreigabe nach Regeneration. Vollständige Event-Stream-Reproduzierbarkeit mit Seeds 1/12/4711. Bestehende Gewinner-/Endtick-/Reststruktur-Regressionen unverändert grün. Neuer Vorschau-/Apply-/Reset-E2E für beide Roboter auf Desktop und Mobile.

**Lokale Prüfung:** Typecheck, 96 Unit-/Regressionstests und Build grün. Browser-E2E durch fehlendes Chromium blockiert; Installationsversuch liefert ungültiges ZIP. Das ist kein bestandener Browser-Test. CI auf dem PR bleibt erforderlich; kein Publish-Erfolg behauptet.

**Nächster Schritt:** NEXT-36 · Distanzstrategie nach Abschluss der Release-Gates.

**PR-CI Korrektur:** Erster CI-Lauf: 96 Unit-Tests und 30/32 Browser-Tests grün; ausschließlich Navigation scheitert auf beiden Profilen an der veralteten exakten NEXT-34-Erwartung. Test auf erledigtes NEXT-34/NEXT-35 und nächsten Schritt NEXT-36 angepasst; neue Testsuite-IDs und Release-Überschrift ebenfalls im Navigationstest geprüft. Vollständiger CI-Wiederholungslauf erforderlich.


## 2026-10-23 – NEXT-36 bis NEXT-38 · Strategiesystem (v0.1.50)

**Auftrag:** Nutzer beauftragt explizit drei Schritte gemeinsam und fordert Refactoring. Ausgang main 99334fa, veröffentlichte v0.1.49; Baseline Typecheck, 96 Tests und Build grün.

**Regeln:** Distanz hält 90 % effektiver Reichweite bidirektional. Defensiv oberhalb 35 % Struktur wie Aggressiv, sonst Rückzug auf 110 % der größeren effektiven Waffenreichweite; in sicherer Distanz kein Nachsetzen. Nahkampf nähert sich bis 20 % effektiver Reichweite, ohne Rückzug oder neue Schadensregel. Jede Schussentscheidung erfolgt nach Bewegung durch die unveränderten Reichweiten-/Energie-/Cooldown-Gates.

**Refactoring und Charakterisierung:** Bestehende 96 Tests grün bestätigt; neue Verhaltenstests vor Implementierung rot bestätigt. Bewegungsgeometrie als reine Funktion ausgelagert und alle 96 bestehenden Tests erneut grün bestätigt. Danach Strategieentscheidung mit signiertem Bewegungsschritt ergänzt. Gemeinsame Tempobegrenzung, Arenaklemmung und deterministische Überlappungsauflösung; keine Move-Events bei unveränderter Position. Keine zusätzliche RNG-Nutzung. Vollständige Suite nach Umbau erneut ausgeführt. Das größere NEXT-43-Review bleibt bestehen.

**Tests:** Distanzrichtungen/Teilbewegung, exakt 35 % Struktur, Strategiewechsel nach Schaden, gegnerische Reichweite, Schüsse während Rückzug bzw. außerhalb Reichweite, Energie/Cooldown, alle Arenaränder, Ecken, Nulltempo/-reichweite, identische Positionen, Immutability und A/B-Symmetrie. Neun feste Endergebnisse (Gewinner/Endtick/Reststruktur) plus alle 16 Strategiepaarungen mit Seeds 1/12/4711 und reproduzierbaren Zuständen/Event-Streams. Bestehende aggressive Ergebnisse unverändert.

**UI und Scope:** Katalog umfasst alle implementierten Strategien; Dialog bleibt beim aggressiven Default. NEXT-39 bleibt die echte A/B-Auswahl, NEXT-40/41 die Parameterverwaltung. Desktop-/Mobile-Navigation prüft neue Dokumentation und nächsten Schritt.

**Release:** 0.1.50 ist bis zu grüner PR-/main-CI und bestätigtem Publish ein Kandidat. Lokaler Browserdownload ist weiterhin nicht verfügbar; CI muss beide Browserprofile prüfen.


## 2026-10-23 – Bugfix Energieanzeigen (v0.1.51)

**Befund:** Bisher nur Energie-Text im Kampfstatus, kein Energiebalken am Roboter. Der clip-path auf dem gesamten Raptor-Roboter schneidet außerhalb liegende Kindanzeigen ab; die alten toBeVisible-Prüfungen erkennen dieses Painting-Problem nicht.

**Fix:** Raptor-Form in eigenes dekoratives Körperelement verschoben. Elterncontainer bleibt unbeschnitten, beide Lebens-/Energiebalken liegen als Geschwister darüber. Blaue Energieanzeige für A/B und zusätzliche Balken im Kampfstatus; aktuelle Werte und Maximum kommen ausschließlich aus Match-State. Verbrauch/Regeneration/Konfiguration/Reset bleiben Engine-gesteuert. Keine Engine-Änderung.

**Regressionen:** Browser-Hit-Test in der Mitte der Anzeigen prüft die tatsächliche Darstellung und würde die alte Raptor-Clipping-Regel erkennen. Prüfung für beide Roboter und beide Chassis. Zweiter Verhaltenstest prüft Energieabfall nach Schüssen, Regeneration im Folgetick, Balkenanteile/Textwerte, Versorgungswechsel und Reset. Beide Tests laufen auf Desktop und Mobile. Lokaler Typecheck, 191 Tests und Build grün; Browser-/Publish-Gates folgen in CI.

**Scope:** Energieanzeigen-Bugfix; NEXT-39 bleibt als nächster Strategieschritt bestehen.


## 2026-10-23 – NEXT-39, NEXT-41, NEXT-42, NEXT-43 (v0.1.52)

**Auftrag/Abgrenzung:** Vier Schritte explizit beauftragt. NEXT-40 bewusst nicht enthalten. NEXT-41 parametrisiert die bereits vorhandenen Bewegungs-/Rückzugsregeln statt eine ungeprüfte Energiereserve vorzutäuschen.

**Umsetzung:** Strategieauswahl A/B; Zielabstand Aggressiv/Distanz/Nahkampf 0–100 %, defensive Strukturgrenze 0–100 % und Sicherheitsabstand 100–200 %. Defaults 80/90/20 %, defensiv 35/110 %. Unabhängige Auswahl, passende aktive Felder, zentrale Builder-Validierung, sichere Pause und Aktionssperre bei ungültigen Eingaben. Letztes gültiges Match bleibt erhalten; gültige Änderungen übernehmen Konfiguration mit Reset. Reset All stellt Aggressiv und stabile Defaults her. Kampfstatus nutzt echte Match-Strategien, keine Builderfelder.

**Refactoring/Testreview:** Baseline 191 Tests grün. Strategie-Metadaten, Labels, Defaults und Parametervalidierung zentralisiert; bisherige Schusslogik unverändert. Separater Worktree auf 732cefd (v0.1.51) erzeugt 48 feste Zustands-/Event-Digests für alle 16 Paarungen und Seeds 1/12/4711 bis maximal 500 Ticks. Kanonische Schlüssel und 1e-9-Zahlenpräzision frieren Verhalten statt Objekt-Reihenfolge ein. Alle neuen Defaults stimmen mit diesen Altversions-Digests überein. 24 neue Unit-Ausführungen prüfen Wertebereiche, nicht endliche Werte, Kopieren/Serialisierung und Parameterwirkung.

**Browser:** Drei zusätzliche Verhaltenstests je Desktop/Mobile (einschließlich sicherer Pause ohne Exceptions bei ungültiger Live-Eingabe): A/B-Auswahl, Start, passende Parameterfelder, Statusvergleich, Reset, Validierung/Aktionssperren und tatsächliche Bewegungswirkung. Bestehende Energie-/Lebensbalkenregressionen bleiben Pflicht.

**Planung:** NEXT-40 bleibt offen und ist nächster Schritt; NEXT-44 bis NEXT-51 konkretisieren Recorder, Format, Import/Export, Player, Zeitleiste, Statistiken, Roundtrip-Review und anschließende Turnierplanung. Keine Replayfunktion in diesem Release vorweggenommen.

**Gates:** Lokaler Typecheck, 215 Unit-/Verhaltenstests und Build grün. PR-/main-/Publish-Prüfungen folgen; kein Publish-Erfolg vorweggenommen.


## 2026-10-23 – Defensive-Korrektur (v0.1.53)

**Befund:** Rückzug ab 35 % Struktur kommt zu spät; Ziel außerhalb beider Reichweiten verhindert eigenes Gegenfeuer. Baseline: defensiver Raptor verliert alle 100 Standardkämpfe mit Seeds 1–100. Bloßes Anheben der Schwelle auf 70/80/85/90 % reicht nicht.

**Entscheidung:** Defensive hält Sicherheitsabstand frühzeitig durch Annäherung und Zurückweichen. Abstand berücksichtigt gegnerische Reichweite × einstellbaren Faktor, begrenzt auf 95 % eigene Reichweite. Ab standardmäßig 70 % Struktur kein Nachsetzen mehr. Reine Abstandspolitik als Funktion gekapselt; gemeinsame Geometrie und Schussfreigabe bleiben unverändert. Keine Stat-Verstärkung.

**Nachweis:** Standard-Raptor zieht erstmals bei Tick 20 zurück (vorher im Mittel 66,4), Titan bei Tick 21. Raptor gewinnt 93 von 100 festen Seeds; keine allgemeine Sieggarantie. Geprüfte Ergebnisreferenzen 1/12/4711, Schwellen 69/70/71, Sicherheitsfaktoren 1/1.1/1.5/2, Schüsse, Randfälle und beide Seiten. 21 defensive Digests neu eingefroren, ursprüngliche Datei mit 48 Referenzen unverändert; 27 unbetroffene werden weiterhin gegen die Altversion geprüft. Browsertests prüfen sichtbare Bewegung über 70 % Struktur.

**Gates:** Lokale und CI-Prüfungen sowie Publish müssen vor Abschluss grün sein. NEXT-40 bleibt offen.
