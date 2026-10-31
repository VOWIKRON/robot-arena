# Robot Arena – Backlog

**Stand:** 31.10.2026 · **Statusquelle:** GitHub-PRs und Nutzerabnahmen. **Nicht gleichbedeutend mit Live-Deployment.**

> Dieses Dokument ist die **aktuelle Aufgabenübersicht**, kein fortlaufendes Laufprotokoll. Historische Einträge liegen unverändert in [docs/archive/BACKLOG-history-through-20261027.md](docs/archive/BACKLOG-history-through-20261027.md). Technische Laufprotokolle gehören in RUN_STATE.md. Jeder Task bekommt einen eigenen Entwicklungsbranch; kein Merge nach main, Release oder Publishing ohne ausdrückliche Freigabe.

## Als Nächstes – nach Priorität

**NEXT-106 – Code/Fach-QA abgeschlossen, Veröffentlichung noch NICHT freigegeben:** PR #221 integriert, main-CI #41211781285 auf exakt `85b3995398975b57d31c09bd8619675f5e489a16` **SUCCESS** (499 Vitest + 36 Node + 208 Browser = 743/743). NEXT-106 Evidence-Artefakt ID `13046536641`, Browser ID `13046805904` und Dist ID `13046721143` tragen denselben main-SHA. Die reine Dokumentationsfortschreibung erfordert eine eigene exakte CI; Live-Stand bleibt ungeklärt. Kein Auto-Publish.


| Prio | Task | Status | Unmittelbar nächster Schritt | Nachweis |
|---|---|---|---|---|
| P0 | NEXT-108 – Fail-closed Provenienz | 🟡 A–C integriert; D in Prüfung | Finalen Quality- und Provenienz-CI-Lauf auf exaktem HEAD von PR #187 bestätigen; ggf. Fehler beheben | [PR #187](https://github.com/VOWIKRON/robot-arena/pull/187) |
| P0 | NEXT-112–115 – sichtbare Sandbox-Funktionen | 🟡 Release-Integration offen | Isolierten Integrations-PR #218 auf vollständige Integration, CI und Release-Reife prüfen | [PR #218](https://github.com/VOWIKRON/robot-arena/pull/218) |
| P0 | NEXT-110 – simultane Regeln / Replay-v2 | 🟡 umfangreich implementiert, nicht release-freigegeben | Auf aktueller Integrationsbasis Regression, SHA/Artefakte und Release-Gates prüfen; NEXT-108 berücksichtigen | [PR #93](https://github.com/VOWIKRON/robot-arena/pull/93) |
| P1 | NEXT-119 – Sandbox- und Button-Kontrast | 🔲 Neu / noch nicht implementiert | Eigenen NEXT-119-Branch anlegen; CSS-Kontrast von Arena und Buttons erhöhen; Desktop-/Touch-Regression | Nutzerwunsch 31.10.2026 |
| P1 | NEXT-116 – Distanztrend im HUD | 🟡 Entwicklungs-PRs A–C | Grenzfalltests/CI für Teil C prüfen, dann isoliert integrieren | [PR #206](https://github.com/VOWIKRON/robot-arena/pull/206) |
| P1 | NEXT-117 – defensive/adaptive Taktik | 🟡 Entwicklungs-PRs A–H | Fix für zerstörte Gegner/Energielimit und zugehörige Regressionen prüfen | [PR #214](https://github.com/VOWIKRON/robot-arena/pull/214) |
| P2 | NEXT-118 – taktische v3-Vorschau | 🟡 Entwicklungs-PRs A–C | v3-Opt-in-Regressionssuite vollständig prüfen, v1/v2 unverändert halten | [PR #217](https://github.com/VOWIKRON/robot-arena/pull/217) |

## Fachlich abgeschlossen / keine offenen Anforderungen

| Task | Status | Einschränkung |
|---|---|---|
| NEXT-79e – Bedienbarkeit | ✅ **Vom Nutzer am 31.10.2026 im reduzierten Umfang abgenommen**: Touch und Firefox bestätigt | NVDA, VoiceOver und Apple-spezifische Prüfungen ausdrücklich aus dem vereinbarten Umfang entfernt. **Kontrastverbesserung ist NEXT-119, nicht NEXT-79e.** Formale QA-Dokumentation und ggf. Release separat. |

## Bereits bearbeitete Aufgaben mit eigenständiger Release-/Integrationsprüfung

| Task | Stand / nächster Check |
|---|---|
| NEXT-106 | ✅ Implementiert und über PRs #90 + #221 in `main` integriert. Main-CI #41211781285 auf SHA `85b3995` 743/743 PASS, NEXT-106 Gate PASS, SHA/Run/Artefakte geprüft. NEXT-120 prüft das Gate auch vor manuellem Upload. **Code release-reif**, kein Deployment bestätigt, Dokumentations-PR benötigt finalen CI-Abgleich. |
| NEXT-107 | Historisch QA-grün; Release-/Live-Stand nicht aus diesem Dokument ableiten. |
| NEXT-109 | Ursachenanalyse und Startseiten-Effekt dokumentiert; NEXT-110 adressiert die Regelarchitektur. Abschluss/Release anhand PR/CI prüfen. |
| NEXT-112 | Geschwindigkeitsregler implementiert; historische 992/992 QA für Entwicklungskandidat dokumentiert; Integration PR #218 offen. |
| NEXT-113 | Space Start/Pause implementiert; Integration PR #218 offen. |
| NEXT-114 | Zehn-Tick-Steuerung implementiert; WebKit-Regression und Integration PR #218 prüfen. |
| NEXT-115 | Abstands-/Reichweitenanzeige implementiert; Integration PR #218 prüfen. |

## Einheitliche Regeln für Statuspflege

1. **🔲 Offen** = noch nicht implementiert; **🟡 In Arbeit / QA offen** = Code vorhanden, aber finale Abnahme fehlt; **✅ Fachlich abgeschlossen** = definierte Abnahmekriterien erfüllt; **🚀 Live** nur mit nachgewiesenem Deployment.
2. **QA-grün** nur bei erfolgreichem Lauf auf dem **exakten finalen Commit** mit SHA, Workflow-ID und Artefaktnachweis. Alte grüne Tests nicht als aktuelle Freigabe ausgeben.
3. Jeder NEXT-Task besitzt einen eigenen Branch; Änderungen an mehreren Tasks werden erst im isolierten Integrationsbranch zusammengeführt.
4. Backlog enthält **eine aktuelle Zeile je Task**. Laufhistorie, Testdetails und wiederholte Statusmeldungen gehören in RUN_STATE.md bzw. docs/archive/.
5. **Kein automatisches Publishing**. Der Nutzer entscheidet ausdrücklich über Release, main-Merge und Deployment.

## Archiv

- [Vollständige historische Backlog-Einträge bis 27.10.2026](docs/archive/BACKLOG-history-through-20261027.md) – vollständig erhalten, nicht gelöscht.
