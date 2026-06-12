Agromatic – Footer Rechtliches V41

Enthalten:
- impressum.html
- datenschutz.html
- agb.html
- assets/css/legal.css
- assets/js/main.js
- FOOTER_RECHTLICHES_SNIPPET.html

Umsetzung:
1. Neue lokale Unterseiten für Rechtliches:
   - impressum.html
   - datenschutz.html
   - agb.html
2. Der Footer der neuen Unterseiten enthält den Bereich „Rechtliches“ mit Links zu:
   Impressum · Datenschutz · AGB
3. assets/js/main.js ergänzt vorhandene Footer automatisch um diesen Rechtliches-Block,
   sofern die jeweilige HTML-Seite main.js lädt.
4. Für Seiten ohne main.js liegt FOOTER_RECHTLICHES_SNIPPET.html bei.
   Diesen Block kann man im Footer ergänzen.

Wichtig:
- ZIP entpacken.
- Nur den Inhalt ins Repository kopieren.
- Die ZIP-Datei selbst nicht committen.
- Falls eine vorhandene Seite den Rechtliches-Block nach dem Kopieren nicht zeigt,
  lädt sie vermutlich kein assets/js/main.js. Dann dort entweder main.js einbinden
  oder den Snippet manuell in den Footer einfügen.
- Rechtstexte vor Veröffentlichung final juristisch prüfen.
