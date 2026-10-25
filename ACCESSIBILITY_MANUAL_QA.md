# NEXT-79e – manuelle Abnahme (noch offen)

**Status:** Automatisierte QA grün (#40204710908: 383 Unit-/Behavior-/Regressions-/Determinismustests und 130 Browserprüfungen). Diese Checkliste ist **keine** bestätigte manuelle Abnahme. Kein Merge und kein Publishing ohne dokumentierte Ergebnisse.

## Prüfmatrix

| Umgebung | Durchführung | Erwartung | Ergebnis/Beleg |
| --- | --- | --- | --- |
| Windows 11 + NVDA + Firefox | Turnier mit Tastatur öffnen, Felder per Tab durchlaufen | Dialogtitel „Turnier planen“, Teilnehmerzahl, Seed, Ticklimit, Format und Buttons verständlich angesagt; Fokus bleibt im modalen Dialog | OFFEN |
| Windows 11 + NVDA + Firefox | Ungültigen Seed/Namen eingeben, „Spielplan erstellen“ | Fehler wird angesagt, fehlerhaftes Feld fokussiert und als ungültig markiert; nach Korrektur kein veralteter Fehler | OFFEN |
| Windows 11 + NVDA + Firefox | Start, Pause, Fortsetzen, Auto, Escape | Live-Fortschritt wird angesagt, kein versteckter Kampf nach Schließen, Fokus kehrt zum Turnier-Button zurück | OFFEN |
| macOS + VoiceOver + Safari | Gleiche Dialog-/Feld-/Fehler-/Fortschrittstests | Vergleichbare semantische Ansagen und korrekte Fokusreihenfolge | OFFEN |
| iOS + VoiceOver + Safari | Turnier und Tabelle mit Touch/Sprache bedienen | Buttons erreichbar, Status verständlich, horizontale Tabelle navigierbar | OFFEN |
| 375px Touch | Turnier öffnen, konfigurieren, Ergebnisse seitlich scrollen | Keine horizontale Seitenüberbreite; Tabelle scrollt innerhalb ihrer Region, Touch-Ziele gut bedienbar | OFFEN |
| 768px Touch | Erstellen, Pause/Fortsetzen, Export | Keine überdeckten Buttons, keine abgeschnittenen Meldungen | OFFEN |
| 1280px Desktop | Tastatur und Maus | Sichtbarer Fokus, konsistente Anordnung, keine überlappenden Elemente | OFFEN |
| 375/768/1280px | Kontrast mit geeignetem Messwerkzeug prüfen | WCAG AA: normaler Text ≥4,5:1; großer Text ≥3:1; relevante UI-Grenzen/Fokusindikatoren ≥3:1 | OFFEN |
| Desktop und Mobil | Import/Export/Autosave, Abbrechen und Wiederaufnehmen | Status und Fehlermeldungen nachvollziehbar, keine unerwarteten Spielzustandsänderungen | OFFEN |

## Abnahmevorgabe

Für jede Zeile **PASS/FAIL**, Browser-/Screenreader-Version, Datum, reproduzierbare Schritte und ggf. Screenshot oder Video erfassen. Bei FAIL: eigener Fix auf NEXT-79e-Branch, neue Regression, komplette isolierte QA erneut ausführen. Ein automatisierter Test ersetzt **nicht** die echte NVDA-/VoiceOver- oder visuelle Prüfung.

**NEXT-79e bleibt offen. NICHT VERÖFFENTLICHT.**
