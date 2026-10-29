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
