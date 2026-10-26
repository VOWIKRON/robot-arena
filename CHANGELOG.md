## 26.10.2026 · NEXT-95 IMPLEMENTIERT · CI-ABNAHME AUSSTEHEND · NICHT VERÖFFENTLICHT
- **Basis:** main v0.1.58, Deploymentstatus `robot-arena/deployment = success`. NEXT-76/82/85/86/87/88/89/90/91 sind bereits veröffentlicht.
- **Aktuelle Runde: NEXT-95 in Verifikation.** Eigenständiger, zugänglicher Live-Status `#tournament-save-status` mit `role=status`/`aria-live=polite`: wartende Web Locks/ausstehende lokale Sicherungen, erfolgreiche Sicherung und Fehler. Die Anzeige ist von Match-/Turnierfeedback getrennt. Eine gemeinsame Pending-Zählung verhindert voreilige Erfolgsmeldungen bei mehreren seriellen Operationen; ein Fehler bleibt bis zum Ende des Batches sichtbar. Kontraststile für Busy/Success/Error; Konflikt mit anderem Tab explizit angezeigt.
- **Neue Browserregressionen:** Web Lock absichtlich blockieren und Pending prüfen; anschließend Freigabe/Speichererfolg; Browser ohne Web Locks mit manuellem JSON-Export; QuotaExceededError mit weiter spielbarem Turnier. Automatische GitHub-PR-CI #40304322024 auf Quellcommit `cb2f21b58ad799a652233ff58be5fe4ded205394` gestartet; Abschluss noch nicht bestätigt. Nicht als QA-GREEN zählen, bis die finale CI erfolgreich ist.
- **Kumulativ seit v0.1.58, nachweislich fertig und getestet, aber nicht veröffentlicht: 3 Aufgaben:** NEXT-80 (618/618, #40284084971), NEXT-84 (624/624, #40293191896), NEXT-94 (628/628, #40297832090). NEXT-95 derzeit **nicht** in dieser Anzahl.
- **Refactoring:** UI-Statusübergänge zentral in `tournamentSaveStatus`, alle lokalen Operationen nutzen die bestehende serielle Warteschlange; Kampfsimulation unverändert.
- **Rolling Backlog:** P0 NEXT-79e echte NVDA/VoiceOver-/physische iOS-Touch-/Kontrastabnahme (manuell blockiert); P2 NEXT-92 JSON-Berichte vor Ablauf sicher mit Provenienz, SHA-256, Größenlimit archivieren; P2 NEXT-93 mindestens drei echte CI-Ressourcenberichte vergleichen, Lücken/Verfall kenntlich machen; P2 NEXT-96 wiederholte Cross-Tab-Fairness-/Konflikt-Stresstests mit WebKit und Chromium; P2 NEXT-97 WebKit-Kompatibilitätsgate bei Releasekandidaten. NEXT-95 nur nach grüner finaler CI abschließen.
- **GitHub:** Draft-PR #75, Branch `feature/NEXT-95-autosave-status-unpublished` auf NEXT-80/84/94, kein Merge nach main, kein Release-Commit, kein publish.php, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · NEXT-94 QA-GREEN · NEU ABGESCHLOSSEN · NICHT VERÖFFENTLICHT
- **Releasebasis:** bestätigtes main v0.1.58 (GitHub-Publish erfolgreich); NEXT-76/82/85/86/87/88/89/90/91 sind bereits veröffentlicht und nicht mehr in der offenen Liste.
- **Aktuelle Runde: NEXT-94 NEU ABGESCHLOSSEN.** Zwei neue echte Zwei-Tab-WebKit-E2E-Szenarien in Desktop-Safari und emuliertem iPhone: (1) ein originweiter Web Lock blockiert paralleles Autosave bis zur Freigabe; (2) ein zwischenzeitlich geänderter, gültiger Speicherstand wird nicht überschrieben, sondern als Konflikt behandelt. Falls Web Locks fehlen, prüfen die Tests den sicheren Fallback. Ein anfänglicher mobiler WebKit-Testfehler (asynchrone Weitergabe eines localStorage-Updates) wurde durch deterministisches Warten auf den konkurrierenden Speicherstand behoben; keine Produktionscodeänderung.
- **Verifizierte Code-CI:** GitHub Actions Development Tests **#40297360666 SUCCESS** auf Commit `03bfd6b9fa5bf7d12c3a22999f97f79e8b18571f`: 445/445 Vitest (Unit/Behavior/Regression/Determinismus), 9/9 Node-Integration/Inventar, 174/174 Playwright (164 Chromium + 10 WebKit) = **628/628**; TypeScript, reproduzierbarer Produktionsbuild, Audit ohne bekannte Advisories. Abschließende CI nach dieser Dokumentationsaktualisierung separat prüfen.
- **Kumulativ seit v0.1.58: 3 vollständig implementierte und getestete, aber NICHT veröffentlichte Aufgaben:** NEXT-80 (atomare Multi-Tab-Autosaves, CI #40284084971, 618/618), NEXT-84 (Safari-/iOS-WebKit, CI #40293191896, 624/624), **NEXT-94 NEU** (echte Zwei-Tab-WebKit-Konfliktregressionen, CI #40297360666, 628/628).
- **Refactoring:** gemeinsame Browser-Testhelfer für Lock-Halten/-Freigeben und Zwei-Tab-Testaufbau; Produktionssimulation unverändert.
- **Rolling Backlog:** NEXT-79e (P0, physische NVDA-/VoiceOver-/iOS-Touch-/Kontrastabnahme, manuell blockiert), NEXT-92 (sichere JSON-Ressourcenbericht-Archivierung mit SHA-256, Größenlimit und Provenienz), NEXT-93 (Vergleich von >=3 echten CI-Artefakten), NEXT-95 (sofort sichtbarer Speichervorgang/Fehler), NEXT-96 (wiederholte Cross-Tab-Fairness), NEXT-97 (Browserkompatibilitäts-Release-Gate).
- **GitHub:** Draft-PR #74, Branch `feature/NEXT-94-webkit-cross-tab-races-unpublished`, enthält NEXT-80 und NEXT-84. **Kein Merge, kein Release-Commit, kein publish.php, kein Deployment. NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · NEXT-84 QA-GREEN · NEU ABGESCHLOSSEN · NICHT VERÖFFENTLICHT
- **Releasebasis:** main v0.1.58 (Commit 6d6da65c18ef85b59ccd58f62e2fd60c4e29a334), GitHub-Deploymentstatus `robot-arena/deployment = success`. NEXT-76/82/85/86/87/88/89/90/91 sind in v0.1.58 integriert.
- **Aktuelle Runde (1 Aufgabe): NEXT-84 NEU ABGESCHLOSSEN – automatisierte Safari-/iOS-WebKit-Kompatibilitätsprüfung.** Zwei Playwright-WebKit-Projekte (`Desktop Safari`, emuliertes `iPhone 13`) testen jeweils drei gezielte Browserfälle: Turnierplanung/Kampf/JSON-Export-Import, Web-Locks-Autosave beziehungsweise sichere Fallback-Absage, 375-px-Touchziele und Dialogfokus. Browser und Linux-Laufzeitbibliotheken werden in isolierter PR-CI installiert. Playwright-WebKit ist kein physisches iPhone und ersetzt keine echte VoiceOver-/Touch-Abnahme.
- **Verifizierte CI:** Development Tests **#40292686660 SUCCESS** auf Quellcommit `8d63dd062f4c1e9b99a46ed0c966dd45c86c0d43`: 445/445 Vitest (Unit/Behavior/Regression/Determinismus), 9/9 Node-Integration/Inventar, 170/170 Desktop-/Mobil-Playwright (164 Chromium + 6 WebKit) = **624/624 Tests grün**; TypeScript, reproduzierbarer Build, Dependency-Audit ohne bekannte Advisories. Diese Dokumentationsänderung ist separat nachzutesten.
- **Kumulativ seit bestätigter Veröffentlichung v0.1.58: 2 vollständig implementierte, getestete und NICHT veröffentlichte NEXT-Aufgaben:** NEXT-80 (atomare Cross-Tab-Autosaves; CI #40284084971 SUCCESS, 618/618) und **NEXT-84 NEU** (Safari-/iOS-WebKit-Automation; CI #40292686660 SUCCESS, 624/624).
- **Refactoring:** Browserkompatibilität in zwei fokussierte WebKit-Projekte ausgelagert; bestehende 164 Chromium-Regressionen bleiben unverändert. Keine Produktionssimulation verändert.
- **Rolling Backlog:** P0 NEXT-79e: echte NVDA-/VoiceOver-, physische iOS-Touch- und Kontrastabnahme mit protokollierten Ergebnissen (manuelle Geräte fehlen); P2 NEXT-92: JSON-Ressourcenberichte vor 30-Tage-Retention sicher mit Provenienz, SHA-256 und Größenlimit archivieren, niemals ungeprüfte ZIPs extrahieren; P2 NEXT-93: mindestens drei echte CI-Ressourcenberichte vergleichen und fehlende/abgelaufene Artefakte eindeutig kennzeichnen; P2 NEXT-94: WebKit-Cross-Tab-Races mit echten Web Locks über zwei Seiten prüfen; P2 NEXT-95: unmittelbar sichtbare Speichern-in-Arbeit-Anzeige.
- **GitHub:** Draft-PR #73 auf `feature/NEXT-84-webkit-compatibility-unpublished`, baut auf unveröffentlichtem NEXT-80 Draft-PR #72 auf; PR gegen main nur für CI. **Kein Merge, kein Release-Commit, kein publish.php, kein Deployment. NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 26.10.2026 · NEXT-80 QA-GREEN · NEU ABGESCHLOSSEN · NICHT VERÖFFENTLICHT
- **Releasebasis:** v0.1.58 auf main, Commit `6d6da65c18ef85b59ccd58f62e2fd60c4e29a334`, GitHub-Deploymentstatus `robot-arena/deployment = success` und Publish-Workflow #40280980041 SUCCESS. NEXT-76, 82, 85, 86, 87, 88, 89, 90, 91 sind darin integriert und werden seit v0.1.58 **nicht** mehr als unveröffentlicht gezählt.
- **Aktuelle Runde (1 Aufgabe): NEXT-80 NEU ABGESCHLOSSEN.** Browserweite Web-Locks-Exklusivsperre um Revisionvergleich, Speichern, Opt-in/Opt-out und validierte Wiederherstellung; registerkarteninterne Promise-Warteschlange für Reihenfolge der Match-Grenzstände. Kein stilles Überschreiben zwischen kooperierenden Tabs; ohne Web Locks fail-closed mit Hinweis auf manuellen JSON-Export. Vorherige synchrone Guard-Tests bleiben für die isolierte Logik erhalten, die Benutzeroberfläche nutzt ausschließlich die gesperrten Methoden.
- **Verifizierte isolierte QA:** GitHub Actions Development Tests **#40283780990 SUCCESS** auf Commit `fc97c2db8d1899021923631528995e9789bc115d`: **445/445 Vitest** (Unit/Behavior/Regression/Determinismus), **4/4** Integrations-Konflikttests, **5/5** Node-Inventartests, **164/164** Desktop-/Mobil-Playwright = **618/618**; TypeScript, Produktionsbuild, zweiter reproduzierbarer Build, Dependency-Audit ohne bekannte Advisories. Erste E2E-Runde deckte asynchrone Reload-/Opt-out-Races auf; Tests warten jetzt explizit auf den persistierten Stand. Finaler Dokumentationsstand erfordert erneute CI.
- **Kumulativ seit bestätigter Veröffentlichung v0.1.58: 1 vollständig implementierte, getestete, aber NICHT veröffentlichte NEXT-Aufgabe:** **NEXT-80 NEU** (atomare Multi-Tab-Turniersicherung; 618/618 QA grün). Die zuvor neun NEXT-Aufgaben sind Bestandteil von v0.1.58 und nicht mehr unveröffentlicht.
- **Refactoring:** gemeinsamer originweiter Web-Lock-Adapter und lokale asynchrone Operationswarteschlange; Produktionssimulation unverändert. **Rolling Backlog:** P0 NEXT-79e echte NVDA/VoiceOver/Touch/Kontrastabnahme (manuell blockiert); P2 NEXT-84 Safari/iOS-WebKit und Web-Locks-Kompatibilität; NEXT-92 sichere JSON-Artefaktsicherung vor Retention; NEXT-93 Vergleich von mindestens drei CI-Artefakten. Prüfe außerdem sofortige UI-Feedbackanzeige bei ausstehenden asynchronen Sicherungen.
- **GitHub:** Draft-PR #72, Branch `feature/NEXT-80-atomic-cross-tab-autosave-unpublished`. Keine Änderung an main, keine neue Releaseversion, kein publish.php, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-91 QA-GREEN · 26.10.2026, 07:00 MEZ · NICHT VERÖFFENTLICHT
- **Diese Runde (1 NEXT): NEXT-91 NEU ABGESCHLOSSEN.** Read-only GitHub-Actions-Inventar für `robot-arena-resource-trends`: Run-/Commit-/Artefakt-ID, Branch, Größe, Erstellungs-/Ablaufdatum und Status `available`/`expired`/`expiry-unknown`; begrenzte API-Paginierung, Metadatenvalidierung, API-Fehlerdiagnose. Kein Download fremder ZIPs, keine GitHub-Schreiboperationen.
- **Automatisierung nur in CI:** GitHub-Token `actions:read`/`contents:read`; JSON-Inventar und Ressourcenberichte mit 30 Tagen Retention. Read-only-Inventarschritt ist diagnostisch (`continue-on-error`) und beeinflusst keine Spiel- oder Performance-Grenzen. **Erster vollständiger CI-Lauf #40277798706 SUCCESS auf Commit `3d36f40ace8b23e9a9e1e7423a07a7567611aae4`:** 440 Vitest, 4 Konflikttests, 5 neue Node-Inventartests, 162 Desktop-/Mobiltests = **611 Tests**, TypeScript, reproduzierbarer Build, 0 bekannte Dependency-Advisories. GitHub bestätigt Inventar-Artefakt **12631125138** und Ressourcentrend-Artefakt **12629914902** mit Ablauf am 25.11.2026. Letzte Dokumentationsänderungen benötigen erneute CI.
- **Kumulativ seit letzter bestätigter Veröffentlichung v0.1.57: 9 vollständig implementierte, getestete und unveröffentlichte NEXT-Aufgaben:** NEXT-76 (Suche/Filter), NEXT-82 (sichere Downloads), NEXT-85 (Integration), NEXT-86 (Port auf v0.1.57), NEXT-87 (120-Kampf-Stress), NEXT-88 (Langzeit), NEXT-89 (Ressourcentrends), NEXT-90 (historische Vergleiche), **NEXT-91 NEU** (read-only Inventar/Retention).
- **Refactoring:** API-Abfrage und Retention-Auswertung in eine testbare injizierbare Funktion gekapselt; Produktionssimulation unverändert.
- **Rolling Backlog:** P0 NEXT-79e manuelle NVDA/VoiceOver/Touch-/Kontrastabnahme; P1 NEXT-80 atomare Multi-Tab-CAS mit Race-/Quota-Regression; P2 NEXT-84 Safari/iOS; NEXT-92 sichere JSON-Sicherung vor Retention-Ablauf; NEXT-93 Mehrfachhistorie mit mindestens drei CI-Artefakten.
- **GitHub:** Draft-PR #71 auf `feature/NEXT-91-artifact-inventory-unpublished`. Kein Merge auf main, kein Release, kein publish.php, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · NEXT-90 QA-GREEN · 26.10.2026 · NICHT VERÖFFENTLICHT
- **NEXT-90 NEU ABGESCHLOSSEN:** Zwei echte JSON-Ressourcenartefakte aus CI #40266761987 und #40267008446 archiviert und verglichen; historische Chronologie-/Schema-/Szenario-Validierung, Deltas und vier Vitest-Regressionen. Archivbytes bei 2/4/8/16 Teilnehmern identisch (815/2082/6646/24004); Zeit-/Heapwerte nur diagnostisch. RESOURCE_HISTORY.md enthält Provenienz und Trends.
- **CI #40271841058 SUCCESS** auf cc26536e9818e18f7680502beb314d66de407fbc: 440/440 Vitest, 4/4 Konfliktprüfungen, 162/162 Desktop-/Mobil = **606/606**, TypeScript, reproduzierbarer Build und Security-Audit grün. Nachfolgender Dokumentationscommit braucht erneute CI.
- **Kumulativ seit v0.1.57 acht getestet und unveröffentlicht:** NEXT-76, 82, 85, 86, 87, 88, 89, **90 NEU**. Refactoring: NEXT-89-Vergleichsfunktionen wiederverwendet, Produktionscode unverändert. Draft-PR #70; kein Merge/Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · NEXT-89 QA-GREEN · 26.10.2026 · NICHT VERÖFFENTLICHT
- **NEXT-89 NEU ABGESCHLOSSEN:** 2/4/8/16-Teilnehmer-Ressourcentrends mit 24 Ticks/Kampf, JSON-CI-Artefakt, Vergleich historischer Laufzeit-/Heap-/Archivgrößen-Messungen, robuste Validierung ohne fragile Performance-Fail-Grenzwerte.
- **CI #40266761987 SUCCESS** auf `1f0b6076c15923dfc49a9713ed8e6c239d814f55`: 436/436 Vitest, 4/4 Konfliktprüfungen, 162/162 Desktop-/Mobiltests, TypeScript, reproduzierbarer Build, Audit 0; **602/602**. Ressourcenartefakt ID 12626795952. Dokumentations-Follow-up muss erneut CI bestehen.
- **Kumulativ sieben fertig getestete und unveröffentlichte NEXT-Aufgaben seit v0.1.57:** 76, 82, 85, 86, 87, 88, **89 NEU**. Refactoring: Endurance-Fixture zentralisiert.
- **Offen:** NEXT-79e manuelle Barrierefreiheit, NEXT-80 Cross-Tab-CAS, NEXT-84 Safari/iOS, NEXT-90 historische Trendbaseline.
- **Draft-PR #69; NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · NEXT-88 QA-GREEN · 26.10.2026
- **NEU abgeschlossen:** NEXT-88 deterministische Endurance-Regression für 16 Roboter/120 Kämpfe, 5.760 Ticks und maxTicks=3.600, Archivpause/-wiederaufnahme, Ressourcen-Diagnostik ohne flüchtige Grenzwerte.
- **Verifiziert:** CI #40262194281 SUCCESS (434 Vitest + 4 Konfliktprüfungen + 162 Browser = 600 Prüfungen; TypeScript, Build, Audit grün) auf 12ac113b86a59c8536f7585d34716d5af9858d43; Dokumentations-Follow-up erfordert neue CI.
- **Kumulativ fertig/getestet und unveröffentlicht seit v0.1.57:** NEXT-76, 82, 85, 86, 87, **88** = 6. Kein Produktivcode verändert. Draft-PR #68, kein Merge/Release/Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-87 abgeschlossen · 26.10.2026, 03:00 MEZ · QA-GREEN · NICHT VERÖFFENTLICHT
- **Diese Runde (1 Aufgabe): NEXT-87 NEU ABGESCHLOSSEN.** Deterministischer Maximalgrößen-Stresstest (16 Teilnehmer, 120 Kämpfe) für identische V1-Archive, 47/120-Pause/Wiederaufnahme ohne Replays, vollständige Tabelle und Unicode-Suchfilter, 2-MiB-Grenze sowie Desktop-/Mobil-Playwright mit 120 Paarungen, Statusfiltern und Archivexport/-import. Kein Produktionscode geändert; Test-Fixture und feste Seeds zentralisiert.
- **Vollständige gemeinsame CI auf `dbe5ca073256a8e49d16afd48d881ca2be97d7ac`: #40257410247 SUCCESS:** 432/432 Vitest (40 Dateien), 4/4 Integrations-Konflikttests, 162/162 Desktop-/Mobil-Playwright; TypeScript, Produktionsbuild, reproduzierbarer Zweitbuild, Audit (0 bekannte Schwachstellen). **Insgesamt 598 erfolgreiche Tests/Prüfungen.** Dokumentations-Follow-up muss erneut CI bestehen.
- **Vorheriger NEXT-86-Dokumentationsstand ebenfalls QA-GREEN:** CI #40252418309 SUCCESS auf `43c7531060f349c940ce288892260a650abaeb32`.
- **Kumulativ seit letzter bestätigter Veröffentlichung v0.1.57: 5 vollständig implementierte und getestete, aber NICHT veröffentlichte NEXT-Aufgaben:** NEXT-76 (Turniersuche/Ergebnisfilter), NEXT-82 (sichere Browserdownloads), NEXT-85 (Integration), NEXT-86 (Port auf v0.1.57), **NEXT-87 NEU** (120-Match-Stress/Archiv/Filter). NEXT-85/86/87 sind Integrations-/QA-Aufgaben, keine zusätzlichen UI-Features.
- **Weiter offen:** NEXT-79e echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme; NEXT-80 atomare Multi-Tab-Speicherung; NEXT-84 Safari/iOS; **NEXT-88** längere Simulationen mit höheren Ticklimits, reproduzierbare Dauerlast und Ressourcenmessung ohne flüchtige Zeitgrenzwerte.
- **Branch/PR:** `feature/NEXT-87-tournament-stress-unpublished`, Draft-PR #67 gegen main **nur für PR-CI**; kein Merge nach main, keine Releaseversion verändert, kein publish.php, kein Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-86 abgeschlossen · 26.10.2026 · QA-GREEN · NICHT VERÖFFENTLICHT
- **Aktuelle Runde (1 NEXT): NEXT-86 NEU ABGESCHLOSSEN.** Port von NEXT-76 (zugängliche Turniersuche/Ergebnisfilter) und NEXT-82 (gehärtete Browserdownloads) auf den veröffentlichten v0.1.57-Basisstand, konfliktfrei auf eigenem Entwicklungsbranch. Keine neuen Endnutzerfeatures über 76/82 hinaus.
- **Verifizierte isolierte CI:** GitHub Actions Development Tests #40247820482, SUCCESS auf exakt `990bc0ddcb08880360b4d3b674522d9840d1a325`: 429/429 Vitest (39 Dateien), 4/4 Integration-Conflict-Guard, 160/160 Desktop-/Mobil-Playwright; TypeScript, Produktionsbuild, zweiter reproduzierbarer Build, npm-Audit 0 bekannte Advisories. CI-Job quality und alle Schritte erfolgreich.
- **Kumulativ vollständig implementiert, getestet, aber seit bestätigter Veröffentlichung v0.1.57 NICHT veröffentlicht: 4 NEXT-Aufgaben:** NEXT-76 (Turniersuche/Statusfilter; QA #40243932862 + Integration), NEXT-82 (sichere Browserdownloads; QA #40243672046 + Integration), NEXT-85 (gemeinsame Integration; QA #40244548121), **NEXT-86 (NEU: Port auf v0.1.57; QA #40247820482)**. NEXT-85/86 sind Integrations-/Qualitätssicherungsaufgaben, keine zusätzlichen Benutzerfeatures.
- **GitHub:** Draft-PR #66 auf `feature/NEXT-86-rebase-v0.1.57-unpublished` gegen main; main v0.1.57 mit GitHub-Deploymentstatus success unverändert. Kein Merge, kein Release, kein Publish-Workflow, kein Deployment, keine Homepage-Aktualisierung.
- **Refactoring:** kein zusätzliches Refactoring in dieser Runde; der bestehende gemeinsame Downloadadapter ist durch die vollständige Regression erneut abgesichert.
- **Weiter offen:** NEXT-79e praktische NVDA-/VoiceOver-/Touch-/Kontrastabnahme; NEXT-80 atomare Multi-Tab-Speichersperre; NEXT-84 Safari/iOS; NEXT-87 Stress-/Langläufertests. Fehler vor neuen Features priorisieren. Für die nächste Runde maximal drei NEXT, zunächst offene Regressionen und NEXT-87.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-86 · Rebase auf v0.1.57 · 26.10.2026 · NICHT VERÖFFENTLICHT
- **Verifizierte Releasebasis:** main v0.1.57; NEXT-69/70/71/74/75/77 bereits in main und daher nicht mehr als unveröffentlicht zählen.
- **Kumulativ seit v0.1.57 einzeln und gemeinsam getestet, aber unveröffentlicht:** NEXT-76 (zugängliche Turniersuche/Statusfilter; isolierte QA und NEXT-85 erfolgreich), NEXT-82 (sichere Browserdownloads; isolierte QA und NEXT-85 erfolgreich), NEXT-85 (Acht-Feature-Integration; 429 Unit/Behavior/Regression/Determinismus + 160 Desktop/Mobil in QA #40244548121). **Gesamt 3.**
- **Aktuelle Runde:** NEXT-86 überträgt ausschließlich NEXT-76/82 auf einen frischen main-v0.1.57-Branch; main.ts und style.css sind gegenüber dem früheren sechs-Aufgaben-Kandidaten byte-identisch, daher konnte die zuvor kombinierte Änderung ohne Überschreiben der veröffentlichten Funktionalität übernommen werden. Neue Quell- und Testdateien übernommen.
- **NEXT-86 Status:** Codeport abgeschlossen, volle QA auf neuem Branch NOCH NICHT bestätigt; erst nach grüner CI als abgeschlossen werten.
- **Rolling Backlog:** NEXT-86: volle isolierte CI inkl. deterministischer Simulationen, TypeScript, Build, Audit, Desktop/Mobil; Diff gegen main prüfen; NEXT-79e: echte NVDA/VoiceOver/Touch-Abnahme; NEXT-80: atomare Cross-Tab-CAS; NEXT-84: Safari/iOS-Matrix; NEXT-87: Export-/Suchfilter-Stresstest auf großen Turnierarchiven mit festen Seeds.
- **Kein Publishing:** kein Merge nach main, kein Release-Commit, kein publish.php, keine Homepage-Aktualisierung.

## Gemeinsamer sechs-Aufgaben-QA-Erfolg · 25.10.2026 · NICHT VERÖFFENTLICHT
- **NEXT-74/75/77 in NEXT-69/70/71 integriert und gemeinsam verifiziert.** Isolierte QA-only CI #40238144023 auf Code-HEAD `e7967c636716582fe6bfeab8652ca9b24196abac` erfolgreich: 419/419 Unit-/Behavior-/Regressions-/Determinismustests, 152/152 Desktop-/Mobiltests, TypeScript, Build, reproduzierbarer Zweitbuild, 0 bekannte Dependency-Schwachstellen.
- **Kumulativ 6 fertig entwickelte und gemeinsam getestete, unveröffentlichte NEXT-Aufgaben:** NEXT-69 Presets; NEXT-70 Kampfexport; NEXT-71 Integration; NEXT-74 Importvalidierung; NEXT-75 V1-Archivkompatibilität; NEXT-77 Autosave-/Downloadfehler. **Neu abgeschlossen: 0; 3 bestehende Aufgaben integriert.**
- **Refactoring:** Kampf-/Tabellen-/Archivdownload vereinheitlicht, Objekt-URL-Cleanup. Deterministische Engine unverändert.
- **Releasekandidat:** Draft-PR #62 gegen isolierten QA-Branch, nicht main. Dokumentations-Follow-up benötigt erneuten CI-Erfolg vor Freigabe. NEXT-79e praktische Barrierefreiheitsabnahme weiterhin offen und ausgeschlossen.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** main v0.1.56 unverändert.

## Release-Candidate-Integration · 25.10.2026, 23:00 MEZ · NICHT VERÖFFENTLICHT
- **Diese Runde (3 Integrationsaufgaben):** NEXT-74 (Import-Guard + Model-Validierung), NEXT-75 (V1-Archivkompatibilität + Golden-Tests) und NEXT-77 (Autosave-Konflikte + gemeinsame Downloads) in den isolierten NEXT-69/70/71-Integrationsbranch übernommen; `src/engine/tournament-archive.ts` aus NEXT-74 und NEXT-75 bewusst kombiniert; `src/main.ts` mit NEXT-77 hunkweise gegen main abgeglichen, Match-CSV/JSON ebenfalls auf gemeinsame Downloadfunktion umgestellt. GitHub-Schreibresultate geprüft.
- **Kumulativ seit verifiziert live v0.1.56: 6 einzeln fertig implementierte und getestete, aber unveröffentlichte Aufgaben:** NEXT-69 (Presets; 391 Unit + 134 Browser), NEXT-70 (Kampfexport; 387 + 130), NEXT-71 (gemeinsame Preset/Export-Integration; 395 + 144, 4 Konfliktprüfungen), NEXT-74 (Importgrenzen; 392 + 128), NEXT-75 (Archivkompatibilität; 393 + 126), NEXT-77 (Autosave/Exportfehler; 388 + 134). **Neu als eigenständige NEXT-Aufgaben abgeschlossen: 0**; diese Runde integriert drei bestehende Aufgaben.
- **WICHTIG: Gemeinsame sechs-Aufgaben-CI noch NICHT bestätigt.** Individuelle CI-Erfolge gelten nicht als kombinierte Releasefreigabe. Bei Fehlschlag Fehler beheben und vollständig erneut testen.
- **NEXT-79e bleibt offen:** echte NVDA-/VoiceOver-, Touch- und visuelle Kontrastabnahme ausstehend; nicht Teil dieses Kandidaten.
- **Kein Publishing:** main unverändert; kein Release-Commit, kein Deployment, keine Homepage-Aktualisierung. Veröffentlichung nur durch Nutzer.
- **Refactoring:** Match-, Tabellen- und Archivdownloads teilen denselben sicheren Blob-Download mit URL-Aufräumen; deterministische Simulationsengine unverändert.

## NEXT-71 · Kombinierter QA-Kandidat · 25.10.2026, 19:00 MEZ · KEIN PUBLISHING
- **Neu in dieser Runde:** Auf isoliertem Branch `qa/NEXT-71-combined-integration` die Implementierungen NEXT-69 (versionierte Roboterpresets) und NEXT-70 (Kampfexport CSV/JSON) gemeinsam zusammengeführt; sechs getrennte `src/main.ts`-Diff-Hunks gegen main verifiziert, Quellcode zusammengeführt und per GitHub-Readback kontrolliert.
- **Neue kombinierte Behavior-/Desktop-/Mobil-Regression:** `e2e/next-71-combined-integration.spec.ts` prüft Sandbox-Preset → Turnierkampf → CSV-/JSON-Export derselben Teilnehmer und 375px-Touchlayout. Zusätzlich NEXT-69/70-Tests und NEXT-71-Konfliktguard eingebunden.
- **Qualitätsstatus:** Gemeinsame QA wird erst nach Abschluss aller Branch-Dateien ausgeführt; bis dahin KEIN erfolgreicher Integrationstest behauptet. NEXT-71 bleibt offen bis vollständiger grüner CI.
- **NEXT-79e:** Echte NVDA-/VoiceOver-/Touch-/Kontrastabnahme fehlt weiterhin; automatisierte Tests sind kein Ersatz. **NEXT-74:** geplant, noch nicht begonnen.
- **Kumulativ seit verifiziert live v0.1.56: 2 vollständig implementierte, isoliert getestete, UNVERÖFFENTLICHTE Aufgaben:** NEXT-69 (391 Unit + 134 E2E), NEXT-70 (387 Unit + 130 E2E). NEXT-71 und NEXT-79e offen. Keine Aufgabe neu vollständig abgeschlossen.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** main, Homepage und Publish-Workflow unverändert.

## NEXT-71 · Integrationsvorbereitung · 25.10.2026, 18:00 MEZ · KEIN PUBLISHING
- **Aktuelle Runde:** NEXT-71 begonnen: `scripts/check-integration-conflicts.mjs` und 4 Node-Regressionstests (lokal **4/4 grün**) sowie `INTEGRATION_READINESS.md` erstellt. Automatische kombinierte CI auf einem gemeinsamen NEXT-69+70-Stand **noch nicht durchgeführt**; NEXT-71 **nicht abgeschlossen**.
- **Quellstandsprüfung:** main v0.1.56 `3d516317`; NEXT-69 PR #53 und NEXT-70 PR #57 sind isoliert auf demselben main-Commit, Quelltextänderungen in `src/main.ts` betreffen nach statischem Diff unterschiedliche Bereiche. Dokumentations-/HTML-Quellseiten überschneiden sich und müssen später zusammengeführt werden.
- **QA nachgeprüft:** NEXT-69 #40210126969 (391 Unit + 134 E2E) SUCCESS; NEXT-70 #40210582101 (387 Unit + 130 E2E) SUCCESS; NEXT-79e #40204710908 (383 Unit + 130 E2E) SUCCESS, aber echte Screenreader-/Touch-/Kontrast-Abnahme fehlt.
- **Kumulativ vollständig implementiert, isoliert getestet und NICHT VERÖFFENTLICHT seit v0.1.56: 2 Aufgaben:** NEXT-69 (versionierte Sandbox-Presets im Turnier), NEXT-70 (Einzelkampf-CSV/JSON). **Neu abgeschlossen in dieser Runde: 0.** NEXT-71 und NEXT-79e sind offen.
- **Nächste Schritte:** Gemeinsame isolierte QA ohne Publishing für NEXT-69+70; Dokumentationsabgleich; End-to-End-Kombinationstest; NEXT-79e manuelle Abnahme; anschließend weitere NEXT-72–77 gemäß Akzeptanzkriterien.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge nach main, kein publish.php, keine Homepage-Änderung.

## Entwicklungsrunde 25.10.2026, 12:00 MEZ – NEXT-79c, NEXT-79d, NEXT-68 – KEIN PUBLISHING
- **Erstmals echte aktuelle CI gefunden:** GitHub Actions Push-Run #40183321392 (Head e1ca20c0) war ROT: 383 Unit/Behavior/Regression sowie Typecheck, Audit=0, Build und reproduzierbarer Zweitbuild GRÜN; Playwright **116 bestanden, 10 fehlgeschlagen** (je 5 Desktop/Mobil). Vorherige Commit-Run-Abfragen zeigten irreführend nur PR-Runs. Ab sofort GitHub REST Actions-Runs per Branch prüfen.
- **NEXT-79c Fehlerkorrektur/Regression:** Legacy-E2E erstellt nicht mehr stillschweigend einen neuen Spielplan über einen aktiven; vor der Neuplanung wird explizit abgebrochen. Responsive-Dialogtest erwartet nach Wiederöffnen eines abgeschlossenen Turniers richtigerweise weiterhin verfügbaren Export statt „deaktiviert“. Produktive Guard-Logik unverändert.
- **NEXT-79d P1-Fix:** Doppelte native/synthetische Teilnehmerzahl-Änderungsereignisse bauen bei unveränderter gültiger Anzahl die Teilnehmerfelder nicht erneut auf (Namensverlust). Legacy-E2E erwartet neue, konkrete Validierungstexte für fehlende Namen und Startwert.
- **NEXT-68 Regression:** Wiederhergestelltes abgebrochenes Turnier deaktiviert „Nächster Kampf“ absichtlich. Der E2E-Test prüft „disabled“ statt einen Klick auf einen deaktivierten Button (30-s-Timeout).
- **Verifikation:** 4 Code-/Testdateien auf dem Entwicklungsbranch committed und anhand GitHub-Blob-SHA zurückgelesen. Neue Push-CI-Runs #40187122831, #40187134234, #40187142977, #40187149330 gestartet, zuletzt noch nicht vollständig abgeschlossen. **Keine neue NEXT-Abnahme bis aktueller vollständiger grüner CI.**
- **Rolling Backlog P0:** (1) CI-Run des letzten Entwicklungs-Head auf Typecheck/Unit/Behavior/Determinismus/Audit/reproduzierbaren Build/Desktop/Mobil vollständig auswerten; (2) übrige E2E-Fehler reproduzieren und beheben; (3) NEXT-79c/d und NEXT-68 Regression erst bei Grün freigeben; (4) NEXT-79e Screenreader/Fokus/Touch/375-768-1280px/Import-Export/Autosave/Cancel/Resume als finale UX-Matrix; (5) vor späterer manueller Veröffentlichung Divergenz zu main beheben, erneut CI prüfen.
- **Kumulativ seit letzter bestätigter Live-v0.1.55: 6 vollständig CI-getestete, NICHT veröffentlichte ganze NEXT-Aufgaben:** NEXT-63 (Touch/Tastatur/Barrierefreiheit), NEXT-64 (Audit/reproduzierbare Builds), NEXT-66 (Kampfdetails), NEXT-67 (deterministische Replays), NEXT-68 (Autosave/Restore), NEXT-78 (Raptor/HUD-Arenagrenzen). NEXT-79a/b getestet als Teilaufgaben, NEXT-79c/d noch nicht aktuell vollständig abgenommen, NEXT-79e offen. **In dieser Runde keine neu abgenommene Aufgabe.**
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Keine Homepage, kein publish.php, kein Merge nach main, kein Release.

## Entwicklungsrunde 25.10.2026, 11:00 MEZ · NEXT-79c/d P1-Härtung · KEIN PUBLISHING
- **Aktuelle Runde (2 von maximal 3 NEXT-Aufgaben):** GitHub-Branches, offene PRs, RUN_STATE.md, PROJECT_STATE.md, BACKLOG.md, Commits und CI erneut geprüft. Draft-PR #48; vor dieser Dokumentationsrunde Entwicklungsbranch 176 Commits vor, 4 hinter main. Hauptzweig mit automatischem Publish bei erfolgreicher CI wird NICHT verändert.
- **NEXT-79c Bugfix:** Browser-Dialog löst bei Escape das `cancel`-Event vor dem asynchronen `close`-Event aus. Der Auto-Timer wird nun schon im `cancel`-Handler pausiert, sodass kein 0-ms-Timer zwischen Escape und Schließen einen weiteren Kampf startet. Der bestehende idempotente Close-Handler bleibt als Fallback. Neuer Playwright-Fall: Auto-Start und Cancel im selben Browser-Task → paused 0/3 → schließen/wiederöffnen → kein Fortschritt → ausdrückliches Fortsetzen → 3/3.
- **NEXT-79d Bugfix:** Korrigierte ungültige Eingaben entfernen bereits `aria-invalid`, ließen aber die alte Fehlermeldung stehen. Jetzt wird diese nur bei tatsächlich vorher ungültigen Feldern durch den neutralen Hinweis „Eingabe geändert. Bitte Spielplan erstellen …“ ersetzt. Vorhandene Feldhilfe in `aria-describedby` bleibt erhalten; neue Assertions in vorhandener Playwright-Regression.
- **Refactoring:** Dialog-Schließen bleibt in einem gemeinsamen Suspend-Helper, Escape ruft denselben Helper frühzeitig auf. Fehlermeldungsbereinigung ist auf vorher als ungültig markierte Felder begrenzt. Deterministische Engine, Seeds und Archivformate unverändert.
- **Prüfung:** 13/13 gezielte statische Code-/Test-/CI-Konsistenzprüfungen nach Korrektur eines zu breiten Suchmusters erfolgreich; alle vier neuen Code-/Test-Commits per GitHub-Blob-SHA zurückgelesen. **0 neue Unit-/Behavior-/Regression-/Browser-Tests tatsächlich ausgeführt**: privater GitHub-Clone wegen DNS nicht erreichbar, Commit-Workflow-Run-Abfrage für neuen Head leer (Connector zeigt nur PR-getriggerte Läufe), Combined-Status leer. Letzte nachgewiesene vollständige CI #40153366228: 383 Unit-/Behavior-/Regressionstests und 102 Desktop-/Mobil-E2E; betrifft früheren Commit. NEXT-79c/d bleiben OFFEN.
- **Rolling Backlog P0:** (1) Vollständige aktuelle CI inklusive Audit=0, Typecheck, Unit/Behavior/Regression/Determinismus, zweifachem reproduzierbarem Build und Desktop/Mobil Playwright nachweisen; (2) bei Fehlern reproduzieren, fixen und gesamte Suite erneut ausführen; (3) NEXT-79c/d erst bei grünem Gate schließen; (4) NEXT-79e mit Screenreader-/Fokus-/Escape-/Keyboard-/Touch-/375-768-1280px-/Import-/Export-/Autosave-/Cancel-/Resume-Matrix und Refactoring; (5) 4 Commits Divergenz zu main vor späterer manueller Veröffentlichung sicher auflösen, Release-SHA erneut vollständig testen. Keine anderen Automationen verändert.
- **Kumulativ vollständig getestet, aber NICHT veröffentlicht seit bestätigter Live-v0.1.55: genau 6 ganze NEXT-Aufgaben:** NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (Audit/reproduzierbare Builds), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministische Replays), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD innerhalb der Arena). NEXT-79a/b getestete Teilaufgaben, nicht als vollständige NEXT-79 zählen; NEXT-79c/d weiter offen, NEXT-79e offen. Keine neue ganze NEXT-Aufgabe in dieser Runde abgeschlossen.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein Merge, Release, publish.php, Deployment oder Homepage-Update.

## Entwicklungsrunde 25.10.2026, 10:00 MEZ · NEXT-79c/d P1-Fehlerbehebung · KEIN PUBLISHING
- **Aktuelle Runde (2/3 Aufgaben):** NEXT-79c und NEXT-79d; priorisiert vor NEXT-79e. Vorher GitHub-Branch, Draft-PR #48, RUN_STATE.md, PROJECT_STATE.md, BACKLOG.md, Changelog, Commits und CI geprüft. Branch nach Quellcode/Test-Commits 164 Commits vor, 4 hinter main.
- **NEXT-79c Bugfix:** Schließen des Turnierdialogs während angeforderter automatischer Ausführung pausiert den Runner jetzt ausdrücklich an der Matchgrenze, statt nur den Timer zu löschen und einen unsichtbar auf „running“ stehenden Lauf zurückzulassen. Sowohl Schließen-Knopf als auch Escape/native Dialog-Schließung nutzen denselben idempotenten Suspend-Helper. Automatik-Fortsetzungsabsicht bleibt erhalten, nach Wiederöffnen nur explizites „Fortsetzen“. Neuer Desktop-/Mobil-Playwright-Test: 3 Teilnehmer, Auto + Dialog schließen im selben Browser-Task, Wiederöffnen zeigt paused/0 von 3, Startaktionen gesperrt, Fortsetzen führt 3/3 zu Ende.
- **NEXT-79d Bugfix:** Ungültige Teilnehmerzahl (z. B. 99) löscht keine zuvor eingetragenen Teilnehmernamen mehr: Eingabe vor DOM-Ersetzung validieren. Fehler über gemeinsamen Fokus-/ARIA-Reporter mit `aria-invalid` und `aria-describedby`. Neuer Desktop-/Mobil-Playwright-Test: 3 benannte Teilnehmer, ungültige Zahl, Namen bleiben, Fokus/Fehlermeldung korrekt, nach Korrektur kann Spielplan erzeugt werden.
- **Refactoring:** Schließlogik in `suspendTournamentOnDialogClose()` zentralisiert, doppelte Timer-Clear-Aufrufe vereinheitlicht; Teilnehmerformular erst nach erfolgreicher Zahlvalidierung neu aufbauen. Keine Änderung an Simulation, RNG oder Turnierarchiven.
- **Prüfung:** 10/10 statische Quellcode-/Test-Konsistenzchecks bestanden; beide Commits und Blob-SHAs per GitHub-Readback geprüft. **0 aktuelle Unit-/Behavior-/Regression-/E2E-Tests ausgeführt**: privater GitHub-Clone durch DNS nicht erreichbar, CI-Run-Abfrage für aktuellen Commit leer, Combined-Status leer. Letzte belegte Voll-CI #40153366228 (383 Unit/Behavior/Regression, 102 E2E) betrifft früheren Stand. **NEXT-79c/d ausdrücklich NICHT abgeschlossen/CI-freigegeben.**
- **Rolling Backlog P0:** (1) Aktuelle CI für NEXT-79c/d mit npm ci, Audit 0, Typecheck, 383+ Unit-/Behavior-/Regression-/Determinismus-Tests, doppeltem reproduzierbarem Build und Desktop/Mobil-Playwright nachweisen; (2) bei Rot fehlerhafte Teststelle beheben und komplette Suite wiederholen; (3) bei Grün NEXT-79c/d abschließen; (4) NEXT-79e mit Screenreader/Fokus/375-768-1280px/Import-Export/Autosave/Cancel/Resume/Auto-Play-Matrix, Refactoring und erneuter Voll-CI; (5) erst danach Release-Branch mit main-Divergenz abgleichen, vollständige CI auf Release-SHA. KEIN PUBLISHING.
- **Kumulativ seit bestätigt live v0.1.55 genau 6 vollständig getestete, unveröffentlichte ganze NEXT-Aufgaben:** NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (Audit/reproduzierbare Builds), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministische Replays), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD innerhalb Arena). NEXT-79a/b sind getestete Teilaufgaben, zählen nicht als volle NEXT-79; NEXT-79c/d CI-offen, NEXT-79e offen. Keine neue vollständig abgenommene Aufgabe in dieser Runde.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.** Kein main-Merge, Release, publish.php, Deployment oder Homepage-Update. Andere Automationen unverändert.

## Unreleased – 25.10.2026, 09:00 MEZ (Entwicklungsbranch, NICHT veröffentlicht)
- NEXT-79c: Fehlerhafte oder fehlende Turnier-Sicherungen/Importe unterbrechen Auto-Play nicht mehr; Stopp erfolgt nur nach validiertem Archiv. Roboter-Preset-Auswahl wird nach Restore aus den Archivdaten wiederhergestellt.
- NEXT-79d: Konkrete Turnier-Validierungsfehler mit Fokus, `aria-invalid`, `aria-describedby` und Bereinigung nach Eingabekorrektur.
- Drei Desktop-/Mobil-Playwright-Regressionsfälle ergänzt; noch **nicht ausgeführt**. Letzte bestätigte Voll-CI #40153366228 gilt für früheren Stand.
- Kumulativ unveröffentlicht und vollständig CI-getestet: NEXT-63, 64, 66, 67, 68, 78. NEXT-79a/b getestete Teilaufgaben; 79c/d nicht final abgenommen; 79e offen. Kein Merge, Release oder Deployment.

## 25.10.2026 · NEXT-79c/d Publish-Reife-Prüfung – noch nicht freigegeben
- **NEXT-79c Bugfix:** Bei ungültigem Formularentwurf wird jetzt unmittelbar der konkrete Validierungsfehler angezeigt, ohne `renderTournamentPreview()` aufzurufen; bestehende Spielpläne, Kampfstände und Auto-Play bleiben unberührt. Neuer Playwright-Regressionstest prüft aktiven Spielplan, ungültigen Seed, unveränderten Fortschritt und danach erfolgreichen Einzelkampf. Code und Test im Branch committed und per Blob-SHA zurückgelesen.
- **NEXT-79d:** Präzise Validierung für Seed, Ticklimit, leere und doppelte Teilnehmernamen sowie E2E für ungültige Eingaben vor Spielplanerstellung vorhanden. Refactoring: Fehlerprüfung vor dem mutierenden Preview-Pfad; kein zweiter Runner-Zustand.
- **P0 Blocker:** Vollständige Tests für aktuellen Commit noch NICHT ausgeführt oder durch CI bestätigt. Lokaler GitHub-Clone scheitert an DNS; Commit-Workflow-Abfrage liefert keine Läufe. Keine Publish-Reife behaupten. Nächster Schritt: aktuelle CI (Unit/Behavior/Regression, deterministische Simulation, Desktop/Mobil, Typecheck, Audit, Build) ausführen/nachweisen, dann ggf. korrigieren und wiederholen.
- **Kumulativ unveröffentlicht, zuvor vollständig getestet:** NEXT-63, 64, 66, 67, 68, 78 (6 ganze NEXT-Aufgaben); NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d noch nicht vollständig abgenommen; NEXT-79e offen. Letzter bestätigter Live-Stand v0.1.55. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Publish-Reife Arbeitsstand · 25.10.2026 · KEIN PUBLISHING
- **Auftrag:** Angefangene Pakete bis zur Veröffentlichungsreife bringen; Freigabeumfang NEXT-63/64/66/67/68/78, NEXT-79a/b bereits getestet; NEXT-79c/d/e erst nach vollständiger CI-Abnahme. Keine Veröffentlichung in diesem Arbeitsschritt.
- **NEXT-79d heute weiterbearbeitet:** Präzise Fehlertexte für ungültigen Seed (0..MAX_SAFE_INTEGER), Ticklimit (1..3600), fehlende und doppelte Teilnehmernamen vor Planerstellung ergänzt. Neuer Playwright-Test prüft ungültige Eingaben und anschließend erfolgreiche Erstellung. Produktionscode/Test im Entwicklungsbranch committed und per GitHub-Readback verifiziert. **Noch nicht ausgeführt; keine CI-Freigabe.**
- **Release-Gate:** Aktuellen Branch vollständig testen (Typecheck, 383+ Unit/Behavior/Regression, deterministische Engine, Desktop/Mobil Playwright, Audit, reproduzierbarer Build), danach NEXT-79c/d und NEXT-79e abschließen. Vor Release zusätzlich Divergenz zu main (zuletzt 4 Commits hinter main) auflösen und danach komplette Regression wiederholen. Keine ungeprüften Änderungen veröffentlichen.
- **Kumulativ weiterhin 6 vollständig getestete, unveröffentlichte ganze NEXT-Aufgaben:** 63, 64, 66, 67, 68, 78; NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d in Abnahme; NEXT-79e offen. Letzte bestätigte Live-Version v0.1.55.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · 25.10.2026, ca. 08:00 MEZ · NEXT-79c Auto-Play bleibt bei Formularänderungen erhalten
- Fehlerkorrektur: Ein Klick auf „Spielplan erstellen“ oder die Änderung der Teilnehmerzahl darf einen bereits gestarteten automatischen Turnierlauf nicht stoppen, wenn die aktive Planung nicht ersetzt wird. `stopTournamentAuto()` läuft nun erst nach erfolgreicher echter Neuanlage; reines Formular-Rendering hat keine Timer-Nebenwirkung.
- Neue Desktop-/Mobil-Playwright-Regression mit 3 Teilnehmern und Auto → Pause → geänderte gültige/ungültige Seed-Eingabe → Teilnehmer-Update → Fortsetzen → 3/3 Kämpfe. **Test implementiert, aber aktuelle CI nicht nachgewiesen; NEXT-79c/d offen.**
- Letzte bestätigte Live-Version v0.1.55; kumulativ 6 vollständig CI-getestete, NICHT veröffentlichte NEXT-Aufgaben: NEXT-63 (Barrierefreiheit/Touch/Tastatur), NEXT-64 (reproduzierbare Builds/Audit), NEXT-66 (Turnierkampfdetails), NEXT-67 (deterministisches Replay), NEXT-68 (lokales Autosave/Restore), NEXT-78 (Raptor/HUD-Arenagrenzen). NEXT-79a/b getestete Teilaufgaben; NEXT-79c/d nicht aktuell vollständig CI-abgenommen; NEXT-79e offen. Letzte grüne Voll-CI #40153366228 vor diesen Änderungen. Kein Merge/Release/Deployment. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · 25.10.2026, 07:00 MEZ · NEXT-79c aktiven Spielplan vor versehentlichem Ersetzen geschützt
- Beim Ändern von Turniereinstellungen kann „Spielplan erstellen“ einen aktiven Lauf nicht mehr unbemerkt überschreiben. Die Oberfläche verlangt ausdrücklich „Abbrechen“; nach Abbruch oder Abschluss ist ein neuer Spielplan möglich. Status-Guard vereinheitlicht, deterministische Simulation unverändert.
- Neue Playwright-Regression für ungültige Eingabe, geänderte gültige Konfiguration, Bestandsschutz und Cancel/Neustart im Entwicklungsbranch committed und zurückgelesen. **Vollständige aktuelle CI noch nicht nachgewiesen: NEXT-79c/d weiterhin offen.**
- Letzte bestätigte CI vor diesen Änderungen #40153366228 (383 Unit/Behavior/Regression, 102 Desktop/Mobil-E2E). Kumulativ seit Live-v0.1.55 sechs bereits CI-getestete unveröffentlichte NEXT-Aufgaben: 63, 64, 66, 67, 68, 78; NEXT-79a/b getestete Teilaufgaben.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · 25.10.2026, 06:00 MEZ · NEXT-79c Pausensteuerung verbessert, CI offen
- Ein pausiertes Turnier lässt sich nicht mehr unbeabsichtigt mit „Alle Kämpfe spielen“ fortsetzen: Beide Startaktionen sind bis zum ausdrücklichen „Fortsetzen“ deaktiviert. Vorhandene Runner-Statusableitung vereinheitlicht, Engine/RNG unverändert.
- Neue Playwright-Regressionen für Desktop/Mobil prüfen Pause, deaktivierte Startaktionen und Wiederaufnahme. **Tests im Branch, aktuelle vollständige CI noch nicht nachgewiesen.** NEXT-79c/d bleiben offen.
- Letzte bestätigte vollständige CI vor den neuen UX-Änderungen: #40153366228 (383 Unit/Behavior/Regression, 102 E2E). Sechs zuvor CI-getestete, unveröffentlichte NEXT-Aufgaben seit Live-v0.1.55: 63, 64, 66, 67, 68, 78.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · 25.10.2026, 05:00 MEZ · NEXT-79d Hilfetexte implementiert, NEXT-79c/d CI ausstehend
- Direkt an den Eingaben: kurze verständliche Erklärungen für Strategie, Energiereserve, Turnier-Startwert, Ticklimit und Turnierformate; Reststruktur im Ergebnisbereich erklärt. `aria-describedby` für Screenreader, kontrastreiche responsive `.field-help`-Stile.
- Neue Playwright-Regressionen prüfen Beschriftungen/ARIA-Verknüpfung, Touch-Navigation ≥44px, 375/1280px und keinen horizontalen Seitenscroll. NEXT-79c-Dreischritt-Dialog weiter in Abnahme.
- **Kein neuer vollständiger Testabschluss:** Für neuen Head kein bestätigter GitHub-CI-Lauf abrufbar. Letzte bestätigte CI #40153366228 (383 Unit/Behavior/Regression, 102 E2E) betrifft früheren Stand. NEXT-79c/d bleiben offen.
- Kumulativ unveröffentlicht und zuvor CI-bestätigt seit Live-v0.1.55: NEXT-63, 64, 66, 67, 68, 78 (6). Kein Merge/Release/Deployment.

## Unreleased · 25.10.2026, 04:00 MEZ · NEXT-79c in Abnahme
- Turnierdialog in „Einrichten“, „Spielen“ und „Ergebnisse“ mit zugänglichen Sprunglinks und responsiven Gruppen umstrukturiert. Aktionen je Runner-Status zentral aktiviert/deaktiviert; Export und lokale Sicherung bleiben erreichbar. Engine und Matchdaten unverändert.
- Neue Browser-Regressionen für 375/1280px, Tastatur, Schrittfolge und Action-Gates committed. **Noch keine vollständige CI auf dem neuen Stand bestätigt; nicht als fertig getestet zählen.**
- Letzte grüne vollständige CI vor dem Umbau: #40153366228 (383 Unit/Behavior/Regression, 102 E2E). Kumulativ weiterhin 6 vollständig getestete, NICHT veröffentlichte NEXT-Aufgaben: 63, 64, 66, 67, 68, 78. NEXT-79 bleibt offen.
- Kein Merge, Release-Commit, Publish oder Deployment.

## Unreleased · 25.10.2026, 03:00 MEZ · NEXT-78 ABGESCHLOSSEN und NEXT-79a/79b implementiert
- **NEXT-78 P0:** Raptor/Titan samt Chassis, Waffe, Energie- und Strukturbalken bleiben am Arenarand sichtbar; reine Darstellungsbegrenzung ohne Änderungen an Seeds oder deterministischer Simulation. Acht Rand-/Eckfälle und defensive Langzeitflucht. CI #40144987038: 383 Unit-/Behavior-/Regressionstests, 96 E2E grün.
- **NEXT-79a:** Browser-Baseline für Konfiguration, Kampf und Turnier mit Tastatur sowie 375/768/1280px, kein horizontaler Seitenscroll. CI #40152929889: 383 Unit und 100 E2E grün.
- **NEXT-79b:** Kampf- und Werkzeugaktionen übersichtlich gruppiert, Start hervorgehoben; Status „Kampfbereit“, „Kampf läuft“ und „Kampf pausiert“. Development Tests #40153090696 auf 88a415e9: 383 Unit-/Behavior-/Regressionstests (32 Dateien), 102 Desktop-/Mobil-E2E, Typecheck, Build, npm-Audit-Gate und reproduzierbare Clean-Builds erfolgreich. NEXT-79c/d/e noch offen.
- Kumulativ sechs unveröffentlichte, vollständig getestete NEXT-Aufgaben seit v0.1.55: NEXT-63, 64, 66, 67, 68, 78. **Kein Publish/Deployment.**

## Unreleased · 25.10.2026, 02:00 MESZ · NEXT-78 Regression verstärkt (noch nicht abgenommen)
- P0-Fluchttests prüfen nun explizit, dass der Raptor **wirklich zurückweicht** und die Arenagrenze erreicht, bevor sie das Einhalten der Grenzen bewerten. Vorher war ein fälschlich grüner Test ohne Bewegung möglich. Alle acht Ränder/Ecken und 1000 Schritte bleiben abgedeckt.
- **Keine aktuelle vollständige CI-Bestätigung:** NEXT-78 offen; keine neue veröffentlichungsreife Aufgabe. NEXT-79 nur Audit, keine UX-Implementierung.
- Kumulativ weiterhin fünf zuvor verifizierte, unveröffentlichte Aufgaben NEXT-63/64/66/67/68 seit Live-v0.1.55. Kein Merge, Release oder Publishing.

## Unreleased · 25.10.2026, 01:00 MESZ · NEXT-78 P0 in Verifikation, NEXT-79 Audit
- **Fix vorbereitet, noch nicht abgenommen:** Arena-Darstellung klemmt die sichtbaren Raptor-/Titan-Chassis inklusive Waffe und Energie-/Lebensbalken an allen vier Rändern und Ecken in den Viewport. Engine-Weltkoordinaten, Seeds und Replay bleiben unverändert; Inline-Rohwerte für bestehende Diagnosen erhalten.
- **Tests ergänzt (Ausführung der neuen vollständigen CI noch ausstehend):** Engine-Defensive an Rändern/Ecken, 1000-Schritt-Checks und Seeds 1/12/4711; Desktop-/Mobile-E2E mit 375px und 1280px, acht Grenzlagen und realem defensivem Kampf.
- **NEXT-79 Analyse:** Usability-Audit in `USABILITY_AUDIT.md` dokumentiert; UX-Änderungen noch offen.
- **Veröffentlichungsstatus:** Letztes bestätigtes Live-Release v0.1.55; fünf zuvor grün getestete NEXT-63/64/66/67/68 bleiben unveröffentlicht. NEXT-78/79 nicht als fertig markieren. **Kein Publishing, kein Merge.**

## Unreleased · 25.10.2026, 00:08 MESZ · NEXT-68 (nur Entwicklungsbranch)
- **NEXT-68 NEU vollständig implementiert und getestet:** Browser-lokale, explizit aktivierte Turnier-Zwischenspeicherung an Matchgrenzen. Validiertes Archiv (Version 1, 2-MB-Grenze), Wiederherstellung nach Browser-Reload per Benutzeraktion, Schutz gegen beschädigte/überlange Sicherungen und Speicherkontingentfehler, kein Netztransfer. Ausschalten löscht Sicherung und Einwilligung. Pause, Cancel und deterministische 16-Teilnehmer-Fortsetzung geprüft.
- **Refactoring:** Dateiimport und LocalStorage-Restore verwenden dieselbe validierte UI-Importfunktion; lokale Persistenz und Archivprüfung in eigenständiges Engine-Modul extrahiert.
- **CI #40137115159 auf c95aaf99 vollständig grün:** 372 Unit-/Behavior-/Regressionstests (31 Dateien), 92 Desktop-/Mobile-E2E, Typecheck/Build, 2 reproduzierbare Clean-Builds, npm audit 0 bekannte Advisories.
- **Letztes bestätigtes Live-Release v0.1.55:** Publish #40132737105 (echter Upload, Live-Verifikation und Deployment-Status erfolgreich), erneute Verifikation #40132968986. NEXT-56–62 sind veröffentlicht. **Kumulativ 5 sicher NICHT veröffentlichte Aufgaben seit v0.1.55:** NEXT-63, 64, 66, 67, **68 NEU**. NEXT-65 ist Duplikat von NEXT-59. Nur Draft-PR #48, kein Merge.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · 24.10.2026, 23:00 MESZ · NEXT-67 (nur Entwicklungsbranch)
- **NEU NEXT-67:** Isoliertes Replay abgeschlossener Round-Robin-Kämpfe aus Seed und eingefrorenen Teilnehmern, exakter Abgleich von Sieger/Ticks/Reststruktur mit archiviertem Ergebnis vor Laden; manipulierte oder ausstehende Kämpfe werden abgewiesen.
- Reines Engine-Modul `tournament-replay.ts`; Replay-Player wird wiederverwendet, ohne Sandbox oder Turnier-RNG zu berühren. Zugänglicher Button je abgeschlossenem Match, Desktop-/Mobile- und Tastaturbedienung.
- **Development Tests #40132151611 auf ddd26d15 grün:** 365 Unit-/Behavior-/Regressionstests, 86 Desktop-/Mobile-E2E, TypeScript/Build, npm-Audit und identische Clean-Builds. 1/3600 Ticks, 2/3/16 Teilnehmer, Archiv-Roundtrip, Fehlerfälle. 0 Ticks laut Turniermodell unzulässig.
- **Kumulativ 11 verifizierte NEXT-Aufgaben seit v0.1.54:** 56, 57, 58, 59, 60, 61, 62, 63, 64, 66, 67. NEXT-56–62: Veröffentlichungsstatus ungeklärt; NEXT-63/64/66/67: nur Draft-PR #48, nicht veröffentlicht. Nächstes Ziel NEXT-68.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · 24.10.2026, 22:00 MESZ · NEXT-64/66 (nur Draft-PR #48)
- **NEXT-64:** Reproduzierbares npm-Lockfile, saubere npm-ci-Installationen, Audit-Gate ohne bekannte Advisories und zweimaliger SHA256-identischer Dist-Build bei gleichem Commit.
- **NEXT-66:** Validierte Paarungsdetails (Seed, Ticks, Gewinner/Remis, Reststruktur) nach jedem Kampf, offene Matches ohne erfundene Ergebnisse, sichere Darstellung von Unicode-/HTML-Namen, Archiv-Roundtrip.
- **Qualität:** Development Tests #40128110261 auf e23323ef: 29 Testdateien, 358 Unit-/Behavior-/Regressionstests, 82 Desktop-/Mobil-E2E, TypeScript/Build, zweimaliger sauberer npm-ci-Install und byteidentischer Dist-SHA256 (1488f94b…), npm audit 0 bekannte Advisories; vollständig erfolgreich. Match-Details als reines Modul ausgegliedert und UI-Integration anschließend vollständig geprüft.
- **Kumulativ 10 seit v0.1.54 verifizierte Aufgaben:** NEXT-56–64 und NEXT-66; NEXT-65 war Duplikat. Letzte unabhängig bestätigte Live-Version v0.1.54 (#40111747415). main enthält v0.1.55 (809fe86c), aber kein neuer erfolgreicher Publish-Lauf wurde bestätigt; tatsächlicher Live-Status für NEXT-56–62 bleibt 'Veröffentlichungsstatus ungeklärt'. NEXT-63/64/66 sind ausschließlich auf dem Entwicklungsbranch / Draft-PR #48, sicher NICHT veröffentlicht.
- **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsrunde 24.10.2026, 21:15 MESZ · NEXT-60, NEXT-62, NEXT-63 (maximal drei)
**Erfolgreich umgesetzt und getestet:** NEXT-60 (ausgeglichene A/B-Zuordnung im echten Runner, Archiv, Tabelle, 25-%-Biasgrenze und Golden-Digests), NEXT-62 (120-Match-Benchmark, CPU/Heap/Wall, UI-Automatik mit Event-Loop-Yield, Pause/Resume/Cancel), NEXT-63 (Fokus, Screenreader-Status, Kontrast, Touch, Doppelklick und ungültige Konfiguration). Refactoring: Fairness-Spielplan und tatsächliche Runner-Schedule vereinheitlicht; UI-Automatik in eigene Terminierung gekapselt. Nach Refactoring **Development Tests #40124222697 auf 01771371 erfolgreich**: 354 Unit/Behavior/Regression, 80 Desktop/Mobile-E2E, TypeScript/Build und npm audit 0 Befunde. Referenzbenchmark: 16 Teilnehmer/120 Kämpfe, Seed 4711/100 Ticks, 191,5 ms Wall, 233,9 ms CPU, +1,70 MiB Heap auf GitHub-CI (keine Endgerätegarantie).

**WICHTIGE VERÖFFENTLICHUNGSABWEICHUNG:** Während dieses Laufs wurde **PR #47 außerhalb dieses Laufs um 19:09:30 UTC gemergt**, danach auf main **v0.1.55** per Commit **809fe86c** eingetragen. Dieser Lauf hat **weder Merge noch Publish/Deployment ausgelöst**. Die tatsächliche Live-Veröffentlichung von v0.1.55 konnte nicht unabhängig bestätigt werden: **Veröffentlichungsstatus ungeklärt**. Letzte unabhängig bestätigte Live-Version bleibt v0.1.54 (Publish #40111747415). Aktueller Entwicklungsstand nach dem Merge ist ausschließlich **Draft-PR #48**, ohne Merge.

**Kumulativ seit dem letzten unabhängig bestätigten Live-Release v0.1.54: acht vollständig implementierte und getestete NEXT-Aufgaben:**
- **NEXT-56** · Deterministischer Round-Robin-Runner, Pause/Resume/Cancel. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-57** · K.-o.-Bracket mit Freilosen und Tie-Break. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-58** · Validiertes Turnierarchiv, Import/Export und Wiederaufnahme. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-59** · K.-o.-Browser-E2E, 16-Teilnehmer-Golden-Digests, Refactoring. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-60 – NEU in diesem Lauf verifiziert** · Faire A/B-Zuordnung und Side-Bias-Audit, Runner/Archiv/Tabellenintegration. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-61** · Versionierte Tabellenexporte CSV/JSON mit Formel-Schutz. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-62 – NEU** · Benchmark und nicht blockierende automatische Turnierausführung. **Tests grün**, main v0.1.55, **Veröffentlichungsstatus ungeklärt**.
- **NEXT-63 – NEU** · Accessibility/Robustheit (375px, Touch, Fokus, Doppelklick, Invalid-Plan). **Tests grün**, **NICHT VERÖFFENTLICHT**, nur Draft-PR #48.
NEXT-65 ist ein bereits durch NEXT-59 erledigtes Duplikat und wird nicht zusätzlich gezählt. Nächste Aufgabe NEXT-64; detaillierter Rolling Backlog NEXT-66–71.

**NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell** (gilt für den aktuellen unveröffentlichten Entwicklungsstand in Draft-PR #48). Kein publish.php, kein Release-Commit, kein Homepage-Update durch diesen Lauf.

## NEXT-60 abgeschlossen · 24.10.2026 · nicht veröffentlicht
- Tatsächliche CI #40123159397 erfolgreich (auf Code- und Teststand vor dieser Dokumentationsänderung).
- Opt-in-Seitenbalance ist im Spielplan und tatsächlichen Runner implementiert, mit identischen Match-IDs/Seeds, gültigen Archiven und deterministischer Tabellenwertung.
- Regressionen für 2/3/4/5/16 Teilnehmer, Side-Swap, Pause/Resume, Export/Import, legacy unverändertes Verhalten; 16-Teilnehmer-Golden-SHA256 für Spielplan, Ergebnisse, Tabelle und Bias. Referenzszenario maximal 25 % Side-Bias, maximal 1 Seitenstart Differenz je Teilnehmer.
- **Kumulativ 6 vollständig getestete, unveröffentlichte Aufgaben seit v0.1.54: NEXT-56, NEXT-57, NEXT-58, NEXT-59, NEXT-60, NEXT-61.**
- Draft-PR #47, Entwicklungsbranch automation/next-56-tournament-runner-unpublished; keine Veröffentlichung, kein Merge. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## NEXT-59 vollständig abgeschlossen · 24.10.2026 · NICHT VERÖFFENTLICHT
- 16-Teilnehmer-Round-Robin (120 Paarungen) und K.-o.-Bracket mit SHA256-Golden-Referenzen charakterisiert, 30-Sekunden-CI-Grenze für den deterministischen Engine-Lauf geprüft.
- Desktop-/Mobil-E2E für 3/5/16 Teilnehmer, Freilose, Champion, Eingabefehler und Export vorhanden.
- Seed-Ableitung der K.-o.-Engine refaktoriert, nach Refactoring **Development Tests #40123058094 erfolgreich**: Unit/Behavior/Regression, Desktop/Mobile, TypeScript/Build und npm-Sicherheitsgate.
- Kumulativ vollständig getestete, unveröffentlichte NEXT-Aufgaben seit v0.1.54: **NEXT-56, NEXT-57, NEXT-58, NEXT-59, NEXT-61 (5)**. NEXT-60 bleibt offen.
- Entwicklungsbranch automation/next-56-tournament-runner-unpublished / Draft-PR #47; main und Homepage unverändert. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Entwicklungsrunde 24.10.2026 · NEXT-59 bis NEXT-61 · ohne Publishing
- Letztes verifiziertes Release v0.1.54; main unverändert; Entwicklungsbranch automation/next-56-tournament-runner-unpublished, Draft-PR #47.
- Aktuelle CI #40121383728 auf Commit 0a67a98d: **erfolgreich**; 27 Testdateien, 74 Desktop-/Mobile-E2E, TypeScript/Build grün, npm audit 0 bekannte Schwachstellen.
- NEXT-56: deterministischer Runner mit Pause/Resume/Cancel – vollständig, Tests grün, NICHT VERÖFFENTLICHT.
- NEXT-57: deterministisches K.-o.-Bracket und Freilose – vollständig, Tests grün, NICHT VERÖFFENTLICHT.
- NEXT-58: Archiv-Import/-Export und Wiederaufnahme – vollständig, Tests grün, NICHT VERÖFFENTLICHT.
- NEXT-59: K.-o.-Browseroberfläche mit Champion, Seeds, Freilosen, 3/5/16-Teilnehmer-E2E, ungültigen Eingaben und Desktop/Mobile ergänzt. CI grün; Referenz-Digests, Performance-Grenzen und Refactoring-Charakterisierung aus Akzeptanzkriterien noch offen; daher **NICHT vollständig abgeschlossen**.
- NEXT-60: deterministische paarweise Side-Swap-Bias-Simulation für 2/3/4/16 Teilnehmer, Seeds und Side-Zähler getestet. CI grün; explizite Bias-Grenzwerte, Referenz-Digests und Integration in echten Runner noch offen; daher **NICHT vollständig abgeschlossen**.
- NEXT-61: versionierte JSON-Tabellensnapshots, CSV-Export mit Unicode/Formel-Schutz und Browser-Downloads, 2/16 Teilnehmer, unvollständige Turniere – vollständig implementiert und getestet, **NICHT VERÖFFENTLICHT**.
- Kumulativ seit v0.1.54 **vier vollständig implementierte und verifizierte Aufgaben: NEXT-56, NEXT-57, NEXT-58, NEXT-61**. NEXT-59/60 zählen nicht.
- Keine Homepage-Aktualisierung, kein Merge, kein Release, kein publish.php. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

# Changelog

## Unreleased · Qualitätsrunde 24.10.2026, 20:08 (nicht veröffentlicht)
- NEXT-56/57/58 vollständig implementiert und verifiziert; K.-o.-Bracket, Round-Robin-Runner, Turnier-JSON mit Browser-Import/Export und fehlerfreier Wiederaufnahme. NEXT-59/60 nur teilweise umgesetzt.
- Fehlende Engine-Testdateien durch Erweiterung der Vitest-Discovery aktiviert. Archiv-Endstatus validiert; importierte benutzerdefinierte Teilnehmer-IDs bleiben im Browser erhalten; korrupter Import bewahrt laufendes Turnier; sichere Zähler für Prototype-ähnliche IDs.
- Vitest 5.x ersetzt verwundbare Vitest-3.x-Abhängigkeiten. npm audit: 0 bekannte Schwachstellen. `Development Tests` #40119157124/#40119160281 auf 8dc5633a: 335 Unit/Behavior/Regression, 68 Desktop/Mobile, TypeScript, Build, Audit grün.
- Draft-PR #47, kein Merge, keine Website-Aktualisierung. **NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## Unreleased · NEXT-56 (vollständig getestet, nicht veröffentlicht)
- Separater, UI-unabhängiger Round-Robin-Runner führt Paarungen seriell mit den definierten Seeds und Ticklimits aus; immutable Ergebnis-Snapshots und deterministische Reihenfolge.
- Pause/Fortsetzen/Abbrechen ausschließlich an Matchgrenzen, bereits abgeschlossene Ergebnisse bleiben erhalten. Tests für 2/4/16 Teilnehmer, 120 Matches, Timeout, Seeds und Zustandsübergänge ergänzt. CI #40113922862 auf 453f5ef5 grün: 314 Unit-/Behavior-/Regressionstests, 64 Desktop-/Mobile-E2E, TypeScript und Build.
- **Nicht veröffentlicht**, Entwicklungsbranch und Draft-PR #47; kein Merge, kein Deployment.

## 0.1.54 – 2026-10-24 (erfolgreich veröffentlicht)
- Release v0.1.54 mit NEXT-40 und NEXT-44 bis NEXT-55 auf main integriert. Publish #40111747415: Upload, Live-Verifikation und Deployment-Status erfolgreich; Build-Commit 362f8bdb.
- Historische, unten stehende „Unreleased“-Abschnitte für NEXT-40 bis NEXT-55 beschreiben den Zustand vor dieser Veröffentlichung und sind jetzt Teil von v0.1.54.

## Unreleased · NEXT-55 (getestet, nicht veröffentlicht)
- Responsiver, eigenständiger Turnierdialog: 2–16 Teilnehmer mit Namens- und Presetwahl, sichere Eingabevalidierung, Round-Robin-Paarungen, Fortschrittsanzeige und Tabelle. Sandbox-Zustand und RNG bleiben unverändert.
- TypeScript-/Browser-Regressionen korrigiert, inklusive eindeutiger Eingabelabels. Development Tests #40110813524 auf SHA 9f17bc65 erfolgreich: 303 Unit-/Behavior-Tests, 64 Desktop-/Mobile-E2E, Typecheck/Build.
- Automatische Turnierausführung folgt in NEXT-56; kein Merge oder Deployment.

## Unreleased · NEXT-54 (getestet, nicht veröffentlicht)
- NEXT-54: Deterministische Round-Robin-Auswertung (3/1/0 Punkte, Spiele/Siege/Remis/Niederlagen, Reststruktur-Differenz, stabile Sortierung und unvollständige Turniere); doppelte/ungültige Match-IDs, Seeds, Teilnehmer und Reststruktur werden abgewiesen. Validierte Ergebnis-Snapshots sind unveränderlich. Development Tests #40109944097 auf Commit 431ee335: 303 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.
- NEXT-55 (Turnier-UI) und NEXT-56 (Runner) bleiben offen; keine Veröffentlichung.


## Unreleased · NEXT-51, NEXT-52 und NEXT-53 (getestet, nicht veröffentlicht)
- NEXT-51: `deepFreeze` als reines, gemeinsam verwendetes Modul ausgegliedert; Recorder-API bleibt kompatibel, Replay-Format und Rekonstruktion ohne Runtime-Recorder-Abhängigkeit. Immutable-Charakterisierung und vollständige Tests grün (#40105284320).
- NEXT-52: Validiertes, versioniertes und unveränderliches Turnierdatenmodell mit 2–16 Teilnehmern, Formaten Round Robin/K.-o., Seeds, Ticklimit und deterministischem JSON-Roundtrip. #40105438397: 290 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.
- NEXT-53: Round-Robin-Spielplan mit jeder Paarung genau einmal, stabiler Reihenfolge und Seed-Ableitung ohne globalen RNG; Tests für 2/3/4/16 Teilnehmer und Seed-Grenzen. #40105486356: 297 Unit-/Behavior-Tests, 60 Desktop-/Mobile-E2E, Typecheck/Build grün.
- Noch keine Turnierausführung oder -oberfläche (NEXT-54 ff.); keine Veröffentlichung, main unverändert.

## Unreleased · NEXT-48, NEXT-49 und NEXT-50 (vollständig getestet, nicht veröffentlicht)
- NEXT-48: Grafische Replay-Zeitleiste mit deterministischem Seek in beide Richtungen, unabhängiger Arenaansicht, Struktur-/Energie-/Positionsrekonstruktion und reproduzierbaren Schuss-/Treffereffekten. Development Tests #40100789839: 274 Unit-/Behavior-Tests und 56 Desktop-/Mobile-E2E erfolgreich.
- NEXT-49: Ereignisbasierte A/B-Kampfstatistiken (Schüsse, Treffer, effektiver Schaden, Energieverbrauch), Deduplizierung, Überkill-Schutz, Sofortsieg, Timeout und 0 Ticks. Development Tests #40100953952: 281 Unit-/Behavior-Tests und 58 Desktop-/Mobile-E2E erfolgreich.
- NEXT-50: 48 Replay-Roundtrips (16 Strategiepaarungen × 3 Seeds) mit SHA-256-Vergleich von Events und Zuständen, beschädigten/fehlenden Frames, 2-MB-Grenze und Browser-Regressionen. Development Tests #40101113261: 284 Unit-/Behavior-Tests und 60 Desktop-/Mobile-E2E erfolgreich.
- Replay-Zustandsrekonstruktion und Statistik als reine, von der UI getrennte Module refaktoriert. Vollständiger Typecheck und Build erfolgreich. Alle drei Aufgaben bleiben unveröffentlicht; Live-Version v0.1.53 unverändert.

## Unreleased · NEXT-47 (implementiert und getestet, unveröffentlicht)
- Replay-Player mit Play/Pause, Einzelschritt, Reset und Endzustand; importierte Aufzeichnungen oder aktuellen Kampf im Replay-Dialog ereignisbasiert wiedergeben, ohne Engine oder RNG erneut auszuführen.
- Unit-/Behavior-Tests für leere, sofort beendete und 3600-Tick-Replays, deterministische Ereignisreihenfolge sowie Desktop-/Mobile-E2E für Dateiimport und unveränderten Live-Kampf erfolgreich: Development Tests #40096436278 (SHA 1b7413a), 268 Unit-/Verhaltenstests, 52 Desktop-/Mobile-E2E, Typecheck/Build grün.
- Grafische Zustandsrekonstruktion und Seek gehören erst zu NEXT-48; keine Veröffentlichung oder Deployment.


## Unreleased · NEXT-46 (implementiert und getestet, noch nicht veröffentlicht)
- Replay-Dialog mit JSON-Export des aktuellen Kampfs und Importvalidierung bis 2 MB; Live-Kampf bleibt bei gültigen und ungültigen Imports unverändert.
- Recorder-Snapshot refaktoriert; deterministische Dateinamen und Unit-/Behavior-/Desktop-/Mobile-Tests ergänzt. Development Tests #40092321506 auf Commit 556a2858 erfolgreich: 262 Unit-/Verhaltenstests, 50 Desktop-/Mobile-E2E, Typecheck und Build; Dokumentations-Head separat prüfen.
- Kein Merge, kein Deployment, keine Veröffentlichung.

## 0.1.54 – Freigabekandidat (noch nicht veröffentlicht) · NEXT-40, NEXT-44, NEXT-45
- NEXT-40: Energiereserve 0–100 % pro Roboter, zentrale Schussfreigabe, getrennte Konfiguration A/B und Default 0 % implementiert und geprüft.
- NEXT-40: Development Tests #40085113036 auf SHA 193f42d0 erfolgreich: 246 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build.
- NEXT-44: Append-only-Event-Recorder mit Seed, unveränderlichen Start-/End-Snapshots und Ereignissen pro Tick. Development Tests #40088595774 auf SHA 7df3cacc erfolgreich: 252 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build.
- NEXT-45: Replay-JSON schemaVersion 1, Arena-/Seed-/RobotDefinition-Metadaten, Tick-/Event-/Zustandsprüfung und JSON-Roundtrip implementiert. Development Tests #40088913689 auf SHA 9d6f719c: 258 Unit-/Verhaltenstests, 48 Desktop-/Mobile-E2E, Typecheck und Build grün. Drei NEXT-Aufgaben sind getestet und unveröffentlicht.
- Entwicklungstests durch Workflow-Namen `Development Tests` vom bisherigen Publish-Auslöser `CI` getrennt. Publish auf main ist noch automatisch konfiguriert.
- Release-Kandidat v0.1.54; Veröffentlichung erst nach Tests des finalen Heads und expliziter Freigabe.

## 0.1.53 – 2026-10-23
- Defensive hält Sicherheitsabstand bereits vor kritischem Schaden; ab standardmäßig 70 % Struktur kein Nachsetzen mehr (zuvor erst 35 %).
- Sicherheitsabstand bezieht sich auf die gegnerische Waffenreichweite und bleibt auf 95 % der eigenen begrenzt: Rückzug opfert nicht mehr die Schussmöglichkeit.
- Reine defensive Abstandspolitik gekapselt; Energie, Cooldown, Schaden, Tempo und andere Strategien unverändert.
- Frühzeitiger Rückzug beider Roboter, Schussfreigabe, Parametergrenzen und 100 feste Balance-Seeds getestet; 21 defensive Referenzstreams bewusst neu eingefroren, 27 andere Altversionsreferenzen bleiben unverändert.
- UI-Hinweise, Desktop-/Mobile-Regressionen und öffentliche Projektdokumentation ergänzt. NEXT-40 bleibt offen.

## 0.1.52 – 2026-10-23
- NEXT-39: unabhängige Strategieauswahl für A/B im Config-Dialog, mit korrekter Übernahme und Reset.
- NEXT-41: strategieabhängige Zielabstands-/Rückzugsparameter mit zentraler Validierung; ungültige Werte pausieren und sperren Match-Aktionen.
- NEXT-42: tatsächliche Strategien kompakt im Kampfstatus, ohne Konfigurationsfelder.
- NEXT-43: gemeinsame Strategie-Metadaten/Defaults refactort; 48 feste Zustands-/Event-Digests aus 0.1.51 sichern alle Paarungen und Seeds gegen Änderungen ab. Replay-Folgezyklus NEXT-44 bis NEXT-51 konkretisiert.
- NEXT-40 bleibt ausdrücklich offen: keine Energiereserve oder geänderte Schussfreigabe eingeführt.

## 0.1.51 – 2026-10-23
- Energiebalken direkt über beiden Robotern ergänzt; Verbrauch, Regeneration und gewählte Versorgung aktualisieren sie aus dem Match-State.
- Raptor-Körper wird getrennt von den Anzeigen beschnitten: Energie- und Lebensbalken von Robot A bleiben sichtbar, auch beim Chassiswechsel.
- Kampfstatus zeigt Energie zusätzlich als Balken; zugängliche Energiewerte mit aktuellem Wert und Maximum.
- Desktop-/Mobile-Regressionen prüfen tatsächliche Sichtbarkeit ohne Clipping, beide Chassis sowie Verbrauch, Regeneration, Konfigurationswechsel und Reset.
- Keine Änderung an der Engine; NEXT-39 bleibt der nächste Strategieschritt.

## 0.1.50 – 2026-10-23
- NEXT-36: Distanzstrategie nähert sich auf 90 % der effektiven Reichweite an und weicht bei Unterschreitung zurück.
- NEXT-37: Defensive Strategie zieht sich ab 35 % Struktur auf 110 % der größeren effektiven Waffenreichweite zurück; bei größerer Distanz kein Nachsetzen. Schüsse bleiben während des Rückzugs erlaubt, sofern Reichweite, Energie und Cooldown nach Bewegung passen.
- NEXT-38: Nahkampfstrategie schließt bis auf 20 % der effektiven Waffenreichweite auf; kein Rückzug. Kein zusätzlicher Nahkampfschaden oder neuer Waffentyp.
- Refactoring trennt reine Strategieentscheidung, gemeinsame Bewegungsgeometrie und Kampf-/Eventausführung. Überlappung löst deterministisches Ausweichen aus, stationäre Roboter erzeugen keine leeren Move-Events.
- Alle 16 Strategiepaarungen mit Seeds 1/12/4711 sowie feste Gewinner-/Endtick-/Reststruktur-Regressionen und Grenzfälle ergänzt. Aggressive Standardkämpfe bleiben unverändert.
- Nächster Schritt: NEXT-39 · Strategieauswahl im Config-Dialog.

## 0.1.49 – 2026-10-23
- NEXT-35: aggressive Zielannäherung als explizite Strategie mit 80 % der effektiven Waffenreichweite gekapselt.
- Bestehende Schussfreigabe nach Bewegung berücksichtigt weiterhin Reichweite, Regeneration, Energie und Cooldown. Default-Ergebnisse bleiben stabil.
- Gemeinsamer Auswahlkatalog bietet nur Aggressiv; UI übergibt den Default explizit und zeigt ihn in beiden Konfigurationsvorschauen. Vollständige Auswahl folgt in NEXT-39.
- Deterministische Verhaltenstests mit Seeds 1, 12 und 4711 sowie Desktop-/Mobile-Vorschautest ergänzt.
- Nächster Schritt: NEXT-36 · Distanzstrategie.

## 0.1.48 – 2026-10-08
- Formaler Abschluss von NEXT-34: RUN_STATE auf COMPLETE gesetzt und Release-Metadaten synchronisiert.
- Keine Änderung am Kampfverhalten. NEXT-35 bleibt der nächste Entwicklungsschritt.

## 0.1.47 – 2026-10-08
- NEXT-34: Strategietypen `aggressive`, `defensive`, `distance` und `melee` als Engine-Datenmodell eingeführt.
- Strategie wird explizit je Roboterkonfiguration gespeichert; bestehendes Kampfverhalten bleibt als Default unverändert.
- Unit-/Regressionstests sichern Default und Serialisierbarkeit ab.
- Nächster Schritt: NEXT-35 · Aggressive Strategie.

## 0.1.46 – 2026-10-07
- Planungs-/Publish-Reparatur vollständig abgeschlossen und RUN_STATE auf COMPLETE gesetzt.
- PR-Tests, Tests auf main und Veröffentlichung des exakt getesteten Stands als Release-Gates dokumentiert.
- NEXT-34 bleibt der nächste Entwicklungsschritt; keine Änderung am Spielverhalten.

## 0.1.45
- Planungszyklus nach NEXT-33 veröffentlicht.
- NEXT-34 bis NEXT-43 als zehn konkrete Strategiesystem-Schritte festgelegt.
- Rolling-Backlog-Regel ergänzt: spätestens bei weniger als fünf verbleibenden konkreten Schritten wird der Folgezyklus geplant.
- Keine Änderung am Spielverhalten.

## 0.1.44 – 2026-10-07

- recovery/finalization release for NEXT-33
- keeps the tested smooth robot movement unchanged
- aligns backlog, project state and public release metadata with the published version
- removes the stale fixed 18:00 next-run wording from project documentation

## 0.1.41 – 2026-10-07

- smoothly interpolates robot positions between deterministic simulation ticks
- preserves the engine's exact movement and combat calculations
- exposes deterministic position and speed state for browser behavior tests
- respects reduced-motion preferences
- covers movement on desktop and mobile

## 0.1.40 – 2026-10-07

- adds a live structure/health bar directly above each robot
- derives bar width from actual current structure versus configured maximum
- updates immediately with combat damage and highlights during hit feedback
- covers health-bar behavior on desktop and mobile
- advances to NEXT-33: visibly smooth robot movement

## 0.1.39 – 2026-10-07

- moves both robot builders into a dedicated responsive configuration dialog
- keeps the battle side panel focused on live combat status
- expands core simulation behavior coverage with six additional invariants
- preserves deterministic engine behavior and existing controls
- advances to NEXT-32: health bars above robots

## 0.1.38 – 2026-10-07

- visualizes Damage events as floating damage values at the target robot
- flashes the target robot briefly on a hit
- derives feedback directly from the deterministic event stream without changing combat logic
- covers hit and damage feedback on desktop and mobile
- advances to NEXT-31: move configuration into a dedicated dialog

## 0.1.37 – 2026-10-07

- renders Shot events as short-lived visible shot lines in the arena
- derives effects directly from the existing deterministic event stream
- keeps combat state and deterministic simulation behavior unchanged
- covers visible shot effects on desktop and mobile
- advances to NEXT-30: hit and damage effects

## 0.1.36 – 2026-10-07

- renders the selected weapon visibly on both robots
- gives Raptor and Titan distinct weapon silhouettes
- updates weapon visuals with the selected robot configuration
- keeps deterministic combat behavior unchanged
- covers visible weapons on desktop and mobile
- advances to NEXT-29: projectile and shot effects

## 0.1.35 – 2026-10-06

- fixes Start so a click advances the fight immediately and continues automatically
- fixes Reset so it stops the fight and restores tick 0, seed 4711 and default robot configurations
- adds 8 browser behavior scenarios executed on desktop and mobile
- adds 18 component-validation boundary tests
- expands the suite from 59 to at least 93 test executions
- keeps deterministic engine behavior covered
- advances to NEXT-28: visible weapons

## 0.1.34 – 2026-10-06

- recovery release for completed NEXT-26
- republishes the tested robot/chassis visual state under a fresh immutable release version
- keeps gameplay behavior unchanged
- aligns main SHA, tested state and published deployment
- advances to NEXT-27: visible weapons

## 0.1.32 – 2026-10-06

- makes Robot A and Robot B immediately distinguishable in the arena
- renders Raptor and Titan chassis with different silhouettes
- updates the arena visual when either chassis selection changes
- keeps deterministic combat behavior unchanged
- covers the visuals in desktop and mobile browser tests
- advances to NEXT-27: visible weapons

## 0.1.31 – 2026-10-06

- adds weights to robot components and weight limits to chassis
- rejects overweight robot configurations at the builder boundary
- shows current weight versus chassis limit live for both robots
- prevents match start for overweight configurations
- covers the rule in unit and desktop/mobile browser tests
- advances to NEXT-26: visible robot differentiation


## 0.1.30 – 2026-10-06

- adds sensor systems as selectable robot components
- adds standard, short-range and long-range sensor presets
- calculates sensor range live and lets short-range sensors limit effective weapon range
- exposes sensor selection for Robot A and Robot B
- covers sensor behavior in unit and desktop/mobile browser tests
- advances to NEXT-25: component weight limits


## 0.1.29 – 2026-10-06

- maintenance release for the completed NEXT-23 energy-supply step
- republishes the tested NEXT-23 state under a fresh immutable release version after the v0.1.28 release-path conflict
- keeps gameplay behavior unchanged
- includes the verified deployment-status mechanism for future release confirmation

## 0.1.28 – 2026-10-05

- adds energy supply as a selectable robot component
- adds standard, capacity and regeneration energy presets
- calculates energy capacity and regeneration from chassis and selected supply
- exposes energy selection for Robot A and Robot B
- covers energy behavior in unit and desktop/mobile browser tests
- advances to NEXT-24: sensors as a component


## 0.1.27 – 2026-10-05

- adds armor as a selectable robot component
- adds standard, light and heavy armor presets
- calculates robot structure from chassis and selected armor
- exposes armor selection for Robot A and Robot B
- covers armor behavior in unit and desktop/mobile browser tests
- advances to NEXT-23: energy supply as a component


## 0.1.26 – 2026-10-05

- adds motors as selectable robot components
- adds balanced, swift and heavy motor presets
- calculates robot speed from chassis and selected motor
- exposes motor selection for Robot A and Robot B
- covers motor behavior in unit and desktop/mobile browser tests
- advances to NEXT-22: armor as a component


## 0.1.25 – 2026-10-05

- enforces validation at the robot-builder boundary
- shows a validation state for Robot A and Robot B
- prevents match start when a configuration is invalid
- covers validation state in desktop and mobile browser tests
- advances to NEXT-21: motors as a component


## 0.1.24 – 2026-10-05

- extends chassis and weapon selection to Robot B
- shows calculated Robot B values live
- connects reset and match start to both selected robot configurations
- covers both component builders on desktop and mobile
- advances to NEXT-20: component validation and builder boundaries


## 0.1.23 – 2026-10-04

- makes chassis and weapon selection for Robot A visible in the arena UI
- shows calculated robot values live when the selected components change
- connects reset and match start to the selected Robot A configuration
- covers the component builder on desktop and mobile
- advances to NEXT-19: component selection for Robot B


## 0.1.22 – 2026-10-04

- introduces chassis and weapon as the first composable robot components
- migrates Raptor and Titan presets to component composition without changing combat behavior
- adds robot-configuration validation
- adds regression tests for preset compatibility and mixed component configurations
- advances to NEXT-18: visible component selection

## 0.1.21 – 2026-10-04

- extracts firing, hit and damage execution from updateRobot into fire()
- preserves energy, cooldown, damage jitter and event ordering
- keeps visible simulation behavior unchanged
- closes NEXT-16 and advances to the robot/component system in NEXT-17

## 0.1.20 – 2026-10-04

- extracts energy regeneration, cooldown countdown and movement into prepareAction()
- preserves existing deterministic behavior and event stream
- no visible gameplay change

## 0.1.19 – 2026-10-04

- centralizes firing eligibility in canFire()
- preserves characterized range, cooldown and energy behavior
- begins the safe engine refactoring phase

## 0.1.18 – 2026-10-04

- locks complete event streams deterministically for seeds 1, 12 and 4711
- characterizes stable event count of 98 for representative fixed seeds
- adds regression protection against unnoticed event-stream changes
- advances backlog to NEXT-14


## 0.1.17 – 2026-10-04

- characterizes stable per-tick event ordering for two acting robots
- locks Shot → Hit → Damage ordering per robot
- advances backlog to NEXT-13


## 0.1.16 – 2026-10-04

- characterizes cooldown countdown across multiple ticks
- verifies firing occurs on the first tick cooldown reaches zero
- keeps exact range-boundary behavior covered
- advances backlog to NEXT-12


## 0.1.15 – 2026-10-04

- reviews core simulation rule coverage before refactoring
- adds exact range-boundary characterization
- adds cooldown=1 firing characterization
- identifies updateRobot action-condition duplication as a later refactoring target
- advances backlog to NEXT-11


## 0.1.14 – 2026-10-04

- adds fixed regression seeds 1, 12 and 4711
- locks winner, end tick and remaining structure for representative matches
- advances backlog to NEXT-10


## 0.1.13 – 2026-10-04

- clamps robot movement to arena x/y boundaries
- covers extreme speed and identical-position movement cases
- advances backlog to NEXT-09


## 0.1.12 – 2026-10-04

- hardens energy regeneration and spending behavior with characterization tests
- verifies regeneration clamps at maxEnergy
- verifies weapon energy is spent after tick regeneration
- advances the rolling backlog to NEXT-08


## 0.1.11 – 2026-10-04

- adds explicit match outcome and end reason for timeout draws
- a victory on the last permitted tick takes precedence over timeout
- timeout states stay frozen on later simulation steps
- fixed-seed timeout regressions cover tick limit 0 and 1
- fifth-cycle test review completed; rolling backlog advances to NEXT-07
- public testsuite adds TIME-001 through TIME-003


## 0.1.10 – 2026-10-04

- adds explicit VictoryEvent with winner, loser and tick
- match ends immediately when a robot reaches zero structure
- destroyed robot cannot act later in the same tick
- finished match state stays frozen and emits no further events
- public testsuite adds EVT-005, END-001 and END-002
- rolling backlog advances to NEXT-06


## 0.1.9 – 2026-10-03

- successful shots emit separate HitEvents and DamageEvents
- DamageEvents report actually applied non-negative damage
- structure is clamped at zero; overkill is capped at remaining structure
- fixed-seed regression secures deterministic damage jitter
- public testsuite adds HIT-001 and DMG-001 through DMG-003
- rolling backlog advances to NEXT-05
- publish follows one-commit ticker principle


## 0.1.8 – 2026-10-03

- simulation emits explicit ShotEvents when range, energy and cooldown allow firing
- ShotEvents contain tick, attacker, target and energy cost
- behavior tests cover valid firing plus blocked firing by range, energy and cooldown
- public testsuite adds SHOT-001 through SHOT-004
- rolling backlog advances to NEXT-04 and adds NEXT-13

## 0.1.7 – 2026-10-03

- simulation emits explicit movement events
- move events contain tick, robot id, previous position and new position
- new stepMatchWithEvents API preserves existing stepMatch behavior
- behavior tests cover movement-event generation, per-tick speed limit and input-state immutability
- public testsuite adds MOV-001 through MOV-003
- rolling backlog advances to NEXT-03 and adds NEXT-12

## 0.1.6 – 2026-10-03

- separates combat event model from simulation state
- adds Move, Shot, Hit and Damage event types
- adds event factory functions and four unit tests for event creation
- public testsuite documents EVT-001 through EVT-004
- rolling backlog advances to NEXT-02 and adds NEXT-11
- E2E verifies event-test documentation and updated backlog order

## 0.1.5 – 2026-10-03

- Engine-Verhaltenstests für Initialzustand, Tick, Immutability, Bewegung, Energie, Struktur und Kampfende ergänzt
- TEST_STRATEGY.md als verbindliche Refactoring-Teststrategie eingeführt
- Rolling Backlog mit NEXT-01 bis NEXT-10 konkretisiert
- öffentliche Testsuite um neue Behavior-Testfälle erweitert
- öffentliche Backlog-Seite zeigt mehrere konkrete Folgeschritte
- E2E prüft Testsuite-Ausbau und konkrete Backlog-Reihenfolge

## 0.1.4 – 2026-10-03

- öffentliche Testsuite auf echte Testfalldokumentation umgestellt
- strukturierte Bereiche: statische Qualität, Engine/Regression, Desktop-E2E, Mobile-E2E, Deployment-Smoke
- Testfälle mit Test-ID, Bereich, Prüfinhalt und Ergebnis dokumentiert
- Entwicklungsablauf aus der Testsuite entfernt; bleibt in protokoll.md
- E2E-Test an die neue Testsuite-Struktur angepasst

## 0.1.3 – 2026-10-03

- öffentliche Testsuite zum ausführlichen 20-Punkte-Laufprotokoll erweitert
- Fehler, Auffälligkeiten, Refactoring, CI, Publish und Online-Smoke-Test werden sichtbar dokumentiert
- Daily- und UI-Anforderungen entsprechend verbindlich erweitert
- E2E-Test prüft die ausführliche Testsuite-Dokumentation

## 0.1.2 – 2026-10-03

- professioneller Footer mit Testsuite, Release Notes und Backlog
- tatsächlicher Publish-Zeitpunkt im Footer
- nächster geplanter 18-Uhr-Lauf im Backlog und Footer
- öffentliche Testsuite mit Typecheck-, Unit-, Build-, Desktop- und Mobile-E2E-Status
- kumulierende HTML-Release-Notes
- öffentliche Roadmap/Backlog-Seite
- Playwright-Abdeckung für Footer und Informationsseiten
- Publish-Sperre: Veröffentlichung nur noch beim ausdrücklich markierten Release-Commit
- Build-Metadaten mit Version, Commit, Buildzeit und nächstem Lauf

## 0.1.1 – 2026-10-03

- Footer-Grundstruktur
- öffentliche Versionsdarstellung bereinigt
- interne Bootstrap-Beschriftung entfernt

## 0.1.0 – 2026-10-03

- Vite-/TypeScript-Grundgerüst
- deterministische Seed-Quelle
- minimale Kampfengine mit Raptor und Titan
- responsive Desktop-/Mobile-Oberfläche
- Unit-/Regressionstests
- Playwright Smoke-Test
- GitHub Actions CI
- automatischer versionierter Publish
