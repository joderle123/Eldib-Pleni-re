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
node app/tests/ds-tests.test.cjs              # Testergebnisse (WISC-V u. a.) aus dem Hub im DS: Übernehmen, Bearbeiten, Word DE/FR/EN
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

## PEI/DS einlesen (im CDSE Hub)

Läuft der Generator im CDSE Hub (in dessen Rahmen), zeigt er den Knopf **„PEI/DS einlesen“**
(`92-hub-einlesen.js`): auf der Übersicht für eine oder mehrere Dateien (der Hub ordnet sie den
Kindern zu; Dateien lassen sich auch auf die Übersicht ziehen), beim geöffneten Schüler für genau
dieses Kind. Gewählt wird hier, gelesen im Hub (Word, PDF oder Scan, immer mit Vorschau). Der Hub
trägt alles ins Dossier und in die Schülerliste des Generators ein und lädt ihn danach neu.
Ohne Hub (per Doppelklick geöffnet) bleibt der Knopf verborgen – der Leser steckt im Hub.

Nachrichten nur mit dem Hub, der den Rahmen geöffnet hat (`window.parent`, unter http nur derselbe Ursprung):
`{cdseEldib:1, n, op:'hallo'}` → Antwort mit `erg.einlesen` (erst dann erscheint der Knopf);
`{cdseEldib:1, n, op:'einlesen', arg:{dateien:[File], schueler:{id, hubId, name, geburtsdatum, klasse}|null}}`
→ Antwort `ok` oder `grund` (`laeuft`, `fehlt`, `keine`).

## Testergebnisse aus dem Hub im DS (4.2)

Das Team Diagnostique trägt Tests (z. B. den WISC-V) im CDSE Hub beim Kind ein. Öffnet der Hub das Kind im
Generator, liegen sie beim Schüler in der Schülerliste (`cdseTests`, Ebene des Schülers – bleibt beim Speichern
erhalten; ältere Fassungen übergehen das Feld). Der DS-Assistent zeigt sie im Schritt „ELDiB-Ergebnisse“
(`46c-ds-tests.js`): „Übernehmen“ kopiert sie nach `dsData.tests` (mit Herkunft `hub: {id, stand}`), kreuzt bei
einem WISC-V das Verfahren in 4 an und setzt unter 4.2 „Ergebnisse der Testverfahren“ – nach dem ELDiB – je Test
eine Zwischenzeile, einen Einleitungssatz, die Tabelle (Index, Standardwert, Prozentrang, Konfidenzintervall,
Einordnung; Untertests mit Wertpunkten) und die Interpretation. Danach sind die Werte dort bearbeitbar; ein von
Hand bearbeiteter Abschnitt 4.2 wird nie überschrieben (er gilt nur als „veraltet“). Ändert der Hub einen Test,
erscheint „Im Hub geändert … Neu übernehmen“. Im Word-Export sind es feste Tabellen mit wiederholter Kopfzeile
(`neueTabelle` in `48-ds-word.js` mit `breiten`). Bezeichnungen für DE, FR und EN stehen in `46c-ds-tests.js`
(WISC-V-Indizes und Untertests; Einordnungen nach Wertebereich ≥130, 120–129, 110–119, 90–109, 80–89, 70–79,
≤69 – Wortlaut DE/FR gegen das Handbuch prüfen). `46c` ist auch Teil von `ds-motor.js`, damit der Hub die
Tabelle im Profil zeigt.

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
