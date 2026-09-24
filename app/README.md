# ELDiB-Generator – Quelltext

Die fertige App ist **eine einzige Datei**: `app/eldib-generator.html`. Sie läuft per
Doppelklick (auch von O:\) ohne Internet. Diese Datei wird **gebaut** – bitte nicht
direkt darin arbeiten.

## Bauen

```
node app/build.cjs            # baut app/eldib-generator.html
node app/build.cjs --pruefen  # baut und prüft zusätzlich die Syntax
```

## Aufbau von `app/src/`

| Ordner/Datei   | Inhalt |
|----------------|--------|
| `shell.html`   | HTML-Gerüst mit den Platzhaltern für Stile und Skripte |
| `styles/*.css` | Stile (alphabetische Reihenfolge) |
| `js/*.js`      | Programm und Daten; werden in Namensreihenfolge zu **einem** Skript verbunden |
| `lib/`         | Bibliotheken (JSZip, docx, FileSaver) mit Lizenzen – früher aus dem Internet geladen |
| `vorlagen/`    | offizielle Word-Vorlagen (PEI, DS); werden beim Bauen eingebettet |

## Datenschutz

Keine Daten verlassen den Computer. Die App speichert im Browser (localStorage);
im CDSE Hub sichert der Hub diese Daten verschlüsselt pro Person.
