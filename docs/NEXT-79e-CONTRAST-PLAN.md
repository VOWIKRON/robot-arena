# NEXT-79e – Kontrastabnahme (Windows/Firefox/Touch)

## Nutzerfreigabe / Umfang (31.10.2026)
- Touchbedienung: vom Nutzer als passend bestätigt.
- Firefox: vom Nutzer als passend bestätigt.
- Screenreader/NVDA und VoiceOver sowie Apple-spezifische Abnahme sind auf ausdrücklichen Nutzerwunsch **nicht Teil des Projekt-Abnahmekatalogs**.
- Noch offen: Sandbox und Buttons optisch deutlich stärker vom Seitenhintergrund absetzen.

## Umsetzung (separater Entwicklungs-Task)
1. Sandbox-Arena durch klar unterscheidbare Hintergrundfläche, sichtbare Kontur und/oder Schatten vom Seitenhintergrund abheben; auch im schmalen mobilen Layout.
2. Primäre und sekundäre Buttons mit klar unterscheidbaren Flächen und Rändern versehen; Hover-, Fokus-, gedrückt- und deaktiviert-Zustände sichtbar differenzieren.
3. Lesbarkeit erhalten: normaler Text mindestens 4,5:1, großer Text mindestens 3:1; relevante UI-Komponenten und Fokusindikatoren mindestens 3:1 gegenüber angrenzenden Farben (WCAG AA als technische Zielwerte).
4. CSS-Änderungen möglichst auf Styling begrenzen; keine Spiel- oder Simulationslogik ändern.

## Abnahme
- Sichtprüfung auf Windows/Firefox und Touch-Bildschirm: Sandbox ist sofort als eigene Spielfläche erkennbar; Buttons heben sich eindeutig vom Hintergrund ab.
- Automatisierte Kontrast-/CSS-Regression sowie bestehende Desktop-/Mobil-Browsertests bestehen auf dem finalen Commit.
- **NEXT-79e erst nach Umsetzung und erfolgreicher Abnahme schließen**; Nutzerwunsch allein ist keine Bestätigung der noch ausstehenden Kontraständerung.
- Keine automatische Veröffentlichung oder Merge nach main.
