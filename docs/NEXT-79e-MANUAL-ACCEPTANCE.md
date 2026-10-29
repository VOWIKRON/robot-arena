## 29.10.2026 · 10:00 · RC4-CI bestätigt / NEXT-79e-AUTO8 / AUTO9 · NUR ENTWICKLUNG · NICHT LIVE

- **NEXT-110-RC4-CI (P0, Nachweis abgeschlossen):** Isolierter QA-Run #40839866406 für exakte RC4-SHA `6955e1e38ad76a178cf4915cc8ca9956ddb76d8a` nach Abschluss bestätigt: Quality und Provenienz SUCCESS; 554 Vitest + 40 Node + 292 Chromium/WebKit Desktop/Mobil = **886/886**. Beide Artefakte (Build und Audit) vorhanden, nicht abgelaufen, gültige SHA-256-Digests und exakt zu Run/Branch/Commit zugeordnet. Dateien: `.github/workflows/feature-qa.yml`, `docs/NEXT-110-RC-RELEASE-GATE.md`. Akzeptanz: finaler Run SUCCESS und beide Artefakte exakt zugeordnet. Test: isolierte QA inklusive `npm run typecheck && npm test && npm run build && npm run test:e2e` und NEXT-108-Provenienz. Abhängigkeit: RC4. **Abgeschlossen für RC4-SHA; nicht für neue AUTO8/AUTO9-Commits.**
- **NEXT-79e-AUTO8 (P1, NEU, CI ausstehend):** Browser-basierter WCAG-AA-Kontrast-Preflight für tatsächlich berechnete Vorder-/Hintergrundfarben dreier deckender UI-Flächen (Start, Dialog, Turnier-Navigation). Dateien: `e2e/next79e-automated-preflight.spec.ts`, isolierter QA-Workflow. Akzeptanz: Kontrast >=4,5:1 in Chromium/WebKit Desktop/Mobil, Fail bei Unterschreitung. Test: `npx playwright test e2e/next79e-automated-preflight.spec.ts`; vollständige Feature-QA. Abhängigkeit: RC4. **Implementiert auf eigenem Entwicklungsbranch, CI noch nicht bestätigt.**
- **NEXT-79e-AUTO9 (P1, NEU, CI ausstehend):** Kontrastberechnung als gemeinsame Testhilfe refaktoriert; Fokusindikator automatisiert gegen dunkle Arena-/Seitenhintergründe (>=3:1) und >=3px Dicke geprüft. Dateien: `e2e/next79e-automated-preflight.spec.ts`, QA-Workflow. Akzeptanz: Chromium/WebKit Desktop/Mobil PASS, Testhilfe ohne duplizierte Kontrastformel. Test: `npx playwright test e2e/next79e-automated-preflight.spec.ts`; danach vollständige Regression. Abhängigkeit: AUTO8. **Implementiert auf separatem Entwicklungsbranch, CI noch nicht bestätigt.**
- **NEXT-79e reale Abnahme:** NVDA, VoiceOver, echtes Touch-Gerät und reale Kontrastmessungen **0/4**. Automatische Stichproben ersetzen die Abnahme nicht. NEXT-110 **NO-GO**.
- **Kumulativ seit Live v0.1.62:** **108** zuvor vollständig getestete, nicht live bestätigte Unteraufgaben: NEXT-110-E1/E2/E5–E101 (99; E3/E4 nicht separat belegt), NEXT-108-A/B/C (3), NEXT-79e-AUTO1–AUTO6 (6). **AUTO8/AUTO9 erst nach CI zählen.** Veröffentlichungsstatus aller 108: NICHT LIVE. Unklarheiten aus weiteren älteren PRs: **Veröffentlichungsstatus ungeklärt**, nicht zusätzlich zählen.
- **Rolling Backlog:** (1) AUTO8/AUTO9 CI auf exakter SHA prüfen, bei Fehlern isoliert korrigieren, (2) nur nach grüner CI sicher in RC4-Entwicklungsbranch integrieren und erneut voll testen, (3) echte NVDA-/VoiceOver-/Touch-/Kontrast-Abnahme, (4) manuelles GO/NO-GO. Kein main-Merge, Release, Deployment oder publish.php.

# NEXT-79e – praktische Barrierefreiheitsabnahme (NICHT ABGENOMMEN)

Stand: 29.10.2026. **NO-GO** bis zu echten, dokumentierten Prüfungen. Automatisierte Chromium-/WebKit-Tests und simulierte Tastaturereignisse sind **kein** Ersatz für NVDA/VoiceOver und reale Touch-Geräte. Keine Freigabe aus diesem Dokument ableiten.

## Prüfumgebung und Nachweise (noch offen)

Für jede Prüfung sind Datum, reale Hardware/OS, Browser- und Screenreader-Version, Name oder Kennung der prüfenden Person, Prüfschritte, tatsächliche Beobachtung, Screenshot/Video/Log-Referenz und ein ausdrückliches PASS/FAIL zu erfassen. **Leere Felder bedeuten FAIL/NO-GO.**

| ID | Echte Prüfumgebung | Prüffall | Beobachtung / Beleg | Status |
| --- | --- | --- | --- | --- |
| 79e-1 | Windows + NVDA + Chromium | Start/Reset, Roboterkonfiguration, Kampf und Turnier per Tastatur; Fokusreihenfolge und Ansagen | AUSSTEHEND | NO-GO |
| 79e-2 | macOS/iOS + VoiceOver + Safari/WebKit | Dialoge, Replay, Import/Export, Status- und Fehleransagen | AUSSTEHEND | NO-GO |
| 79e-3 | Physisches Touch-Gerät (iOS/Android) | Trefferflächen, Zoom, Scroll, Dialogschließen, Replay und Dateiauswahl | AUSSTEHEND | NO-GO |
| 79e-4 | Reale Darstellung Desktop/Mobil | Kontrast der Texte, Buttons, Fokusmarkierungen, Statusanzeigen (WCAG-AA-Messung dokumentieren) | AUSSTEHEND | NO-GO |

## Vorgehen

1. Eine **unveröffentlichte lokale Vorschau** des exakten RC-Commits verwenden, nicht die Live-Homepage als Nachweis für neue v2-Funktionen.
2. Je Prüffall Soll-/Ist-Ergebnis mit reproduzierbaren Schritten und Beleg festhalten; Probleme als separate NEXT-Bugs erfassen und nach Korrektur erneut prüfen.
3. Nur nach vier bestandenen realen Prüfungen und dokumentierter unabhängiger Abnahme darf NEXT-79e als erfüllt betrachtet werden.
4. NEXT-108 muss zusätzlich einen erfolgreichen **finalen** CI-Run einschließlich unveränderter SHA und gültiger Build-/Audit-Artefakte bestätigen. Ein innerhalb des laufenden CI-Jobs bestandener Provenienzcheck ist **keine** abschließende Release-Provenienz.
5. Auch danach ist NEXT-110 nicht automatisch zur Veröffentlichung autorisiert: ausdrückliche manuelle Release-Freigabe erforderlich.

**Aktuelle Entscheidung: NO-GO. NICHT VERÖFFENTLICHT – Veröffentlichung erfolgt nur manuell.**

## 29.10.2026 · NEXT-79e-PREP2 – reproduzierbares Prüfprotokoll für RC4 (nur Vorbereitung)

**Unveröffentlichter RC4-Branch:** `integration/NEXT-110-RC4-79e-consolidated-20261029-0900`; die genaue HEAD-SHA erst nach der letzten Dokumentationsänderung eintragen. Die automatisierte Quell-CI #40833576469 auf `ad46f898c6153826650777c3d35d8552203ba6ea` bestand mit 886/886. Diese CI ist **keine** praktische Abnahme und keine Bestätigung des neuen RC4-HEAD.

### Prüfprotokoll (je Testlauf separat ausfüllen)

| Feld | Auszufüllender Nachweis |
| --- | --- |
| Prüf-ID | 79e-1 / 79e-2 / 79e-3 / 79e-4 |
| Exakte RC4-SHA und Vorschauquelle | AUSSTEHEND |
| Datum, Uhrzeit, prüfende Person | AUSSTEHEND |
| Physisches Gerät, OS-/Browser-/Assistenztechnik-Version | AUSSTEHEND |
| Schrittfolge und erwartetes Ergebnis | AUSSTEHEND |
| Tatsächliche Beobachtung, Fehler-ID, Belegreferenz | AUSSTEHEND |
| Ergebnis PASS/FAIL und Unterschrift/Freigabe | NO-GO |

### 79e-1 – Windows + NVDA

NVDA mit dokumentierter Version auf echtem Windows-System aktivieren; ausschließlich Tastatur benutzen. Mit Tab/Shift+Tab Start, Reset, Konfigurationsdialog, Turnier und Replay durchlaufen; mit Enter/Leertaste auslösen und Escape schließen. Prüfen, ob Fokus sichtbar und in offenen Dialogen gehalten wird, nach dem Schließen auf den Auslöser zurückkehrt und Status-/Fehleransagen im NVDA-Sprachprotokoll nachvollziehbar sind. Abweichungen mit exakter Schrittfolge erfassen. **Nicht durchgeführt.**

### 79e-2 – Safari + VoiceOver

Auf echtem macOS oder iOS mit VoiceOver die gleichen Bedienwege inklusive Import/Export und Replay abarbeiten. Prüfen, ob Steuerelemente sinnvoll benannt, Dialogzustände angesagt und Fehlermeldungen wahrnehmbar sind. Plattform, Safari-/VoiceOver-Version und Beleg festhalten. **Nicht durchgeführt.**

### 79e-3 – echtes Touch-Gerät

Auf iPhone/iPad oder Android-Smartphone in Portrait und Landscape: Turnierdialog, Roboterkonfiguration, Replay, Dateiauswahl, Schließen, Scrollen und 200-%-Zoom prüfen. Kein horizontal abgeschnittener Pflichtinhalt, keine überlagerten Schaltflächen, alle Aktionen ohne präzise Maus möglich. Displayauflösung, Zoom, Browser und Video-/Screenshotbeleg erfassen. Playwright-Mobile-Emulation gilt nicht als Ersatz. **Nicht durchgeführt.**

### 79e-4 – gemessene Kontraste

Auf realer Desktop- und Mobilansicht den tatsächlichen Vorder- und Hintergrundfarbwert jeder relevanten UI-Zustandskombination erfassen (Normal, Hover, Fokus, Disabled, Fehler, Erfolg). Mit dokumentiertem Messwerkzeug und WCAG-2.2-AA-Methode Kontrastverhältnisse berechnen und tabellarisch festhalten. **Akzeptanz:** gewöhnlicher Text mindestens 4,5:1; großer Text mindestens 3:1; für relevante UI-Komponenten und grafische Zustandsindikatoren mindestens 3:1 gegenüber angrenzenden Farben. Fokusindikator zusätzlich auf Sichtbarkeit und ausreichenden Kontrast prüfen; transparente Overlays und tatsächliche Hintergrundbilder berücksichtigen. Für jeden Messpunkt Element/Selektor, Hex-Farben, Messwert, Sollwert, Toolversion, Screenshot und PASS/FAIL erfassen. Keine gemessenen Werte vorhanden: **NO-GO**.

### Technische Vorprüfung (ersetzt keine reale Abnahme)

`npm run typecheck && npm test && npm run build && npm run test:e2e` auf exakter RC4-SHA ausführen; Chromium/WebKit Desktop/Mobil und beide QA-Jobs nach Abschluss verifizieren. Anschließend Artefakte, Branch, Run-ID und SHA gemäß NEXT-108 prüfen. **Alle vier manuellen Prüfungen stehen weiterhin bei 0/4.**
