# Robot Arena – verbindlicher Meilenstein v0.2.0 (NEXT-101)

**Beschluss 26.10.2026:** v0.2.0 wird erst nach nachweisbarer **strategischer Spielreife** vorgeschlagen; Zwischenversionen 0.1.60–0.1.79 sind keine Pflicht und keine automatische Schwelle. Keine Versionsanhebung, Veröffentlichung oder Deployment ohne ausdrückliche Nutzerfreigabe.

## Messbare Abnahme

| ID | Bereich | Nachweis / Akzeptanz |
|---|---|---|
| aggressive | KI | Aggressiver Roboter verfolgt Gegner und nutzt Angriffschancen; Seed-basierte Behavior-Tests und beobachteter Kampf. |
| defensive | KI | Defensiver Roboter weicht in zwei Dimensionen aus, nutzt Raum/Deckung, bleibt nicht nur im Rückwärtsgang; Behavior-Tests und Sichtprüfung. |
| adaptive | KI | Taktischer Roboter wechselt nach Energie, Panzerung und Gegnerverhalten reproduzierbar Strategie; Behavior-Tests und Sichtprüfung. |
| combat | Kampfsystem | Mehrere Seeds liefern nachvollziehbare taktische Entscheidungen, stabile deterministische Simulation und sinnvoll auswertbare Ereignisse. |
| tournament | Turniere | Mindestens drei Strategien gegeneinander, wiederholbare Seeds, Rangliste, Sieger-/Restenergie-/Schadensstatistiken und Export. |
| usability | Bedienung | Roboter konfigurieren, Kampf beobachten, Turnier starten und Resultate verstehen; Desktop/Mobil und praktische Touch-/Screenreader-Abnahme. |
| quality | Qualität | Unit-, Behavior-, Regression-, Determinismus-, Chromium-/WebKit-Tests grün; Speicherung und Wiederherstellung zuverlässig; keine kritischen offenen Fehler; manuelle Accessibility-Abnahme. |

**Qualitative Vergleichsabnahme:** Bei wiederholten Turnieren müssen aggressive, defensive und adaptive Strategien durch dokumentierte **Entscheidungs- und Bewegungsmuster** erkennbar verschieden sein. Bloße Unterschiede der Siegquote reichen nicht. Tests dokumentieren Seeds, RobotDefinition-Snapshots und Bewegungs-/Angriffsereignisse.

## Nachweis- und Freigaberegel

`V02_ACCEPTANCE.json` startet vollständig auf `pending`. Für jeden Punkt müssen echte Referenzen (CI/Behavior-Report; für KI, UX und Qualität zusätzlich manuelle Sicht-/Geräteabnahme) erfasst werden. `node scripts/next101-v02-readiness.mjs` erzeugt eine rein diagnostische Übersicht. `--require-review-ready` liefert Exitcode 1, solange Nachweise fehlen. **Das Tool prüft nur das Manifest-Schema, nicht die externe Echtheit von Belegen.** Auch bei vollständigem Manifest ist nur die *manuelle Prüfung* möglich; `releaseAuthorized` bleibt immer `false`.

**Erinnerung:** Bei jeder Release-Planung und nach wesentlichen Strategie-/Kampfänderungen den Status prüfen und den Nutzer aktiv darauf hinweisen, sobald eine echte v0.2.0-Abnahme sinnvoll ist. NEXT-79e bleibt offen, bis reale Geräte/Screenreader geprüft wurden.
