# ELDiB-Generator – Quelltext

Die fertige App ist **eine einzige Datei**: `app/eldib-generator.html`. Sie läuft per
Doppelklick (auch von O:\) ohne Internet. Diese Datei wird **gebaut** – bitte nicht
direkt darin arbeiten.

## Bauen

```
node app/build.cjs            # baut app/eldib-generator.html und app/ds-motor.js
node app/build.cjs --pruefen  # baut und prüft zusätzlich die Syntax
```

`app/ds-motor.js` ist der Text-Motor des DS für den CDSE Hub (klassisches Skript, ohne
Oberfläche): Satzbausteine, `DsText` (Daten -> Bericht) und `DS_LESER` (Bericht -> Daten,
`46b-ds-leser.js`), dazu die Tafeln des Assistenten (`DS_BERICHT_TAFELN`, `DS_CHIP_LABELS`).

## Tests

Die Tests laufen mit Node und einem Chromium ohne Netz (Playwright; anderer Ort über
`PLAYWRIGHT_PFAD`). Sie nutzen nur erfundene Kinder und Namen.

```
node app/tests/ds-leser.test.cjs              # DS-Leser: Rundlauf DE/FR (je 30 Datensätze, auch mit OCR-Rauschen), Freitext
node app/tests/ds-leser.test.cjs --anzahl 5   # schneller; --start 500 andere Zufallsdaten; --laut alle Hinweise
node app/tests/daten-einbetten.test.cjs       # eingebettete Daten in PEI, Complément und DS
```

## Eingebettete Daten (für den CDSE Hub)

Jede erzeugte Word-Datei (PEI, schlanker PEI, Complément, DS) enthält unsichtbar die Daten,
aus denen sie entstanden ist (`55-daten-einbetten.js`): ein eigener XML-Teil
`customXml/itemCdse1.xml` (bei Namensgleichheit `itemCdse2` usw.) mit
`<cdse:daten xmlns:cdse="urn:cdse:eldib-generator:1" version="1" art="pei|complement|ds" sprache="de|fr|en" erstellt="…">`,
darin Base64 von UTF-8-JSON. Dazu `itemPropsCdse1.xml` (eigene GUID), die Beziehung von
`word/document.xml.rels` und die Inhaltstypen. Der Text des Dokuments (`word/document.xml`)
bleibt Byte für Byte gleich. Word behält den Teil beim Speichern, kann ihn aber umbenennen –
beim Lesen deshalb alle `customXml/*.xml` nach `urn:cdse:eldib-generator:1` durchsuchen.
PEI und Complément tragen nur ELDiB-Daten (beide Einschätzungen, Zielsätze, zusätzliche Ziele,
Bericht), der DS die Daten des DS-Assistenten und die ELDiB-Auswahl für das Raster 6.2.

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
