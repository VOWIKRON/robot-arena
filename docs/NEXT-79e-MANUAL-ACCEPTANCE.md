## 29.10.2026 · 06:00 – Ausführbare Prüfschritte (VORBEREITET, NICHT DURCHGEFÜHRT)

**Referenz-RC:** `f97f35a352d8b2dbac02b4ac88078671b139e593` (nur lokale unveröffentlichte Vorschau; kein Deployment). Vor jedem realen Test den exakten Commit mit `git rev-parse HEAD` bestätigen. Keine automatisierte Simulation als reale Abnahme zählen.

- **79e-1 / NVDA:** Windows-Gerät, NVDA und Chromium mit Version protokollieren. Nur mit Tab/Shift+Tab/Enter/Leertaste: Konfiguration öffnen, Eingaben ändern, Dialog schließen, Kampf starten/zurücksetzen und Turnier öffnen. Für jeden Schritt Fokusziel, gesprochene Rolle/Name/Zustand, erwartete und tatsächliche Ausgabe sowie Beleg notieren. FAIL bei Fokusverlust, unbedienbarer Funktion oder fehlender kritischer Ansage.
- **79e-2 / VoiceOver:** Physisches macOS- oder iOS-Gerät mit Safari/WebKit und VoiceOver-Version. Mit VoiceOver-Navigation Dialog öffnen/schließen, Replay steuern, Archiv importieren/exportieren und Fehlerstatus auslösen. Gesprochene Beschriftung, Fokusfolge und Rückmeldung pro Schritt dokumentieren. FAIL bei unerreichbarer Steuerung oder fehlender kritischer Rückmeldung.
- **79e-3 / Touch:** Physisches Smartphone/Tablet mit Modell, OS, Browser und Viewport erfassen. Hoch-/Querformat, 200%-Zoom soweit unterstützt, Scrollen, Dialog, Replay, Import-Dateiauswahl und Trefferflächen prüfen. Bei jedem Schritt unbeabsichtigte Aktivierung, Überlappung, abgeschnittene Inhalte und Bedienbarkeit festhalten. FAIL bei blockierter Kernfunktion.
- **79e-4 / Kontrast:** Auf real gerenderten Desktop- und Mobilansichten die konkreten Vorder-/Hintergrundfarben von Text, Bedienelementen, Fokusmarkierungen und Statusanzeigen messen; Messwerkzeug, Screenshot und Kontrastverhältnis dokumentieren. WCAG-AA-Richtwerte: normaler Text 4,5:1, großer Text 3:1, notwendige UI-/Fokusindikatoren 3:1. FAIL bei unterschrittenem anwendbarem Schwellenwert.

**Abnahmeformular je Fall:** `ID | Datum/Uhrzeit | RC-SHA | Gerät/OS | Browser/Version | Assistive-Technik/Version | Prüferkennung | Schritte | Soll | Ist | Beleg-ID | PASS/FAIL | Bug-ID/Nachtest`. **Alle vier weiterhin AUSSTEHEND/NO-GO.** Nach Bugfix neue SHA und vollständige betroffene Regression; keine Freigabe ohne unterschriebene reale Prüfbelege.

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
