Agromatic Website – Konfigurator-Bildpfad-Fix V45

Geändert:
- konfigurator.html

Korrektur:
- Der Bildpfad des Zusatzgetriebe-Layers wurde angepasst:
  von: assets/img/konfigurator/zusatzgetriebe.png
  auf:  assets/img/konfigurator/Zusatzgetriebe.png

Grund:
- In der aktuellen ZIP liegt die Bilddatei mit großem Z vor: Zusatzgetriebe.png.
- GitHub Pages unterscheidet Groß- und Kleinschreibung.
- Dadurch konnte das Zusatzgetriebe-Bild online fehlen.

Nicht geändert:
- Keine Startseite geändert.
- Kein Hero-Bereich geändert.
- Keine Bilder geändert oder neu generiert.
- Keine CSS-Dateien geändert.
- Keine Rechtsseiten geändert.

Einspielhinweis:
- ZIP entpacken.
- konfigurator.html im Repository ersetzen.
- ZIP selbst nicht committen.
- Keine .git-, mnt- oder Arbeitsordner committen.

Hinweis:
- Die Datei sonderloesungen_update.html wirkt wie eine alte Zwischen-/Update-Datei und verweist auf /images/vibration-industrie.jpg, das in der geprüften ZIP nicht vorhanden war. Diese Datei wurde hier nicht gelöscht, weil dieses Patch-ZIP bewusst nur den Konfigurator-Fix enthält.
