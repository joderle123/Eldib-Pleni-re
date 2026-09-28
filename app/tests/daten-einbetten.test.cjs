// Eingebettete Daten (55-daten-einbetten.js) in PEI, schlankem PEI, Complément und DS.
// Nur erfundene Kinder und Namen.
//   node app/tests/daten-einbetten.test.cjs
// Für eine erfundene Schülerin mit zwei Einschätzungen werden alle Dokumente im Generator erzeugt
// (Chromium ohne Netz). Geprüft wird je Dokument:
//  - customXml/itemCdseN.xml, itemPropsCdseN.xml, _rels/itemCdseN.xml.rels, Beziehung von
//    word/_rels/document.xml.rels, Inhaltstypen (Override für itemProps, Default für xml)
//  - alle XML-Teile des Pakets wohlgeformt (DOMParser)
//  - JSON = Quelle (Stammdaten, Schülerliste, Formular, DS-Assistent) – tief gleich
//  - word/document.xml und alle anderen Teile Byte für Byte wie ohne die Daten; die beiden
//    geänderten Teile ([Content_Types].xml, document.xml.rels) sind ohne die neuen Einträge gleich
'use strict';
const H = require('./hilfen.cjs');
const util = require('util');

const NS = 'urn:cdse:eldib-generator:1';
const TYP_CUSTOM = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml';
const TYP_PROPS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps';
const INHALT_PROPS = 'application/vnd.openxmlformats-officedocument.customXmlProperties+xml';

function gleich(a, b) { return util.isDeepStrictEqual(a, b); }
function unterschied(a, b, pfad) {
  // erste Stelle, an der sich zwei JSON-Werte unterscheiden (für die Meldung)
  pfad = pfad || '';
  if (gleich(a, b)) { return null; }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const k = Array.from(new Set(Object.keys(a).concat(Object.keys(b))));
    for (const x of k) { const u = unterschied(a[x], b[x], pfad + '.' + x); if (u) { return u; } }
  }
  return pfad + ': ' + JSON.stringify(a).slice(0, 120) + ' ≠ ' + JSON.stringify(b).slice(0, 120);
}
function b64(s) { return Buffer.from(s, 'base64'); }

// erfundene Schülerin mit zwei gespeicherten Einschätzungen
const ZUSATZ_LEER = { demarches_mentales: {}, manieres_apprendre: {}, attitudes_relationnelles: {}, attitudes_affectives: {}, competences_essentielles: {}, culture_loisirs: {} };
function einschaetzung(datum, selections, zusatz, savedAt) {
  return {
    language: 'de', selections, zusaetzlicheZiele: Object.assign({}, ZUSATZ_LEER, zusatz),
    stammdaten: { schueler_name: 'Beispiel, Mila', geburtsdatum: '2016-05-09', matricule: '2016050912345', foerderort: 'École Fondamentale Beispielstadt', klasse: 'C2.2',
      schuljahr: '2025/2026', periodenTyp: 'trimester', periode: '1', einschaetzungsdatum: datum, einschaetzende: 'Lea Beispiel', eltern1_name: 'Muster, Jana', eltern1_tel: '000 000 000', eltern1_email: 'jana@example.invalid' },
    dsData: { v: 2, bewertungen: { s_konz: 3 }, chips: {}, f: {}, frei: { schule: 'Nur im DS.' }, tabellen: {}, bearbeitet: {} },
    bereichNotizen: { verhalten: 'interne Notiz', kommunikation: '', sozialisation: '', kognition: '', zusaetzlich: '' },
    savedAt
  };
}
const E1 = einschaetzung('2025-10-15', { 'V-1': { status: 'erreicht' }, 'V-2': { status: 'ziel', zielIndex: 0, zieltext: '' }, 'K-1': { status: 'erreicht' }, 'SOZ-1': { status: 'ziel', zielIndex: 0, zieltext: '' } },
  { demarches_mentales: { 'DM-1': 'stufe1' }, attitudes_affectives: { 'AA-2': 'stufe2' } }, '2025-10-15T09:30:00.000Z');
const E2 = einschaetzung('2026-03-20', { 'V-1': { status: 'erreicht' }, 'V-2': { status: 'erreicht' }, 'V-3': { status: 'ziel', zielIndex: 0, zieltext: '' }, 'K-1': { status: 'erreicht' }, 'K-2': { status: 'ziel', zielIndex: 0, zieltext: '' }, 'SOZ-1': { status: 'erreicht' }, 'KOG-1': { status: 'erreicht' } },
  { demarches_mentales: { 'DM-1': 'stufe3' }, attitudes_affectives: { 'AA-2': 'stufe1' }, manieres_apprendre: { 'MA-1': 'stufe2' } }, '2026-03-20T10:00:00.000Z');
const SCHUELERIN = { id: 'sch-einbetten', name: 'Beispiel, Mila', klasse: 'C2.2', geburtsdatum: '2016-05-09', geschlecht: 'w', einschaetzung1: E1, einschaetzung2: E2 };

(async () => {
  const M = H.motorLaden();
  const { browser, page, blockiert, fehler } = await H.generatorStarten();
  await H.schuelerOeffnen(page, SCHUELERIN, 2);
  const dsQuelle = H.zufallsDs(M, 777, 'de').ds;
  const r = await page.evaluate(async ([dsQuelle]) => {
    const alsB64 = async blob => { const buf = new Uint8Array(await blob.arrayBuffer()); let s = ''; for (let k = 0; k < buf.length; k += 0x8000) { s += String.fromCharCode.apply(null, buf.subarray(k, k + 0x8000)); } return btoa(s); };
    const u8b64 = buf => { let s = ''; for (let k = 0; k < buf.length; k += 0x8000) { s += String.fromCharCode.apply(null, buf.subarray(k, k + 0x8000)); } return btoa(s); };
    // Formular: die offene (2.) Einschätzung ändert sich nach dem Speichern noch (ein weiteres Ziel)
    state.selections['K-3'] = { status: 'ziel', zielIndex: 0, zieltext: '' };
    DsAssistent.laden(dsQuelle);
    // Stand vor dem Einbetten festhalten (alle Teile des Pakets)
    const echt = window.cdseDatenEinbetten, vorher = [];
    window.cdseDatenEinbetten = async function (zip, art, sprache, extra) {
      const teile = {};
      for (const name of Object.keys(zip.files)) { if (!zip.files[name].dir) { teile[name] = u8b64(await zip.files[name].async('uint8array')); } }
      const daten = await echt(zip, art, sprache, extra);
      vorher.push({ art, sprache, extra: JSON.parse(JSON.stringify(extra || {})), daten: JSON.parse(JSON.stringify(daten)), teile });
      return daten;
    };
    const fang = [];
    window.saveAs = (blob, name) => fang.push({ blob, name });
    await generatePEI(); fang[fang.length - 1].art = 'pei';
    const quellePei = { stamm: getStammdaten(), liste: JSON.parse(JSON.stringify(smGetListe())), selections: JSON.parse(JSON.stringify(state.selections)), zusatz: JSON.parse(JSON.stringify(state.zusaetzlicheZiele)), language: state.language };
    await generateComplement(); fang[fang.length - 1].art = 'complement';
    await generateSchlankPEI(); fang[fang.length - 1].art = 'pei-schlank';
    fang.push({ blob: await DsWord.erstellen('de'), name: 'ds-de.docx', art: 'ds' });
    fang.push({ blob: await DsWord.erstellen('fr'), name: 'ds-fr.docx', art: 'ds' });
    const ds = JSON.parse(JSON.stringify(getDSData()));
    // Zielsätze der offenen Einschätzung, wie sie in den PEI-Dokumenten stehen
    const zieltexte = {};
    Object.keys(state.selections).forEach(c => { if (state.selections[c].status === 'ziel') { zieltexte[c] = resolveZieltext(c, state.selections[c]); } });
    // zweimal einbetten: der zweite Teil bekommt die nächste freie Nummer
    const zweimal = await JSZip.loadAsync(fang[fang.length - 1].blob);
    await echt(zweimal, 'ds', 'fr');
    const zweimalTeile = Object.keys(zweimal.files).filter(n => /customXml\//.test(n)).sort();
    const zweimalRels = await zweimal.file('word/_rels/document.xml.rels').async('string');
    const dokumente = [];
    for (const f of fang) { dokumente.push({ name: f.name, art: f.art, b64: await alsB64(f.blob) }); }
    return { dokumente, vorher, quellePei, ds, zieltexte, stand: typeof ELDIB_GENERATOR_STAND !== 'undefined' ? ELDIB_GENERATOR_STAND : null, zweimalTeile, zweimalRels };
  }, [dsQuelle]);

  H.ok(r.dokumente.length === 5 && r.vorher.length === 5, 'fünf Dokumente erzeugt, fünfmal eingebettet (' + r.dokumente.map(d => d.name).join(', ') + ')');
  const Q = r.quellePei, eintrag = Q.liste.find(s => s.id === SCHUELERIN.id);
  H.ok(eintrag && eintrag.einschaetzung1 && eintrag.einschaetzung2, 'Schülerliste: beide Einschätzungen gespeichert');
  const alleXml = [], guids = [];
  for (let i = 0; i < r.dokumente.length; i++) {
    const d = r.dokumente[i], v = r.vorher[i], name = d.name + ' (' + d.art + ')';
    const z = await H.JSZip.loadAsync(b64(d.b64));
    const dateien = Object.keys(z.files).filter(n => !z.files[n].dir);
    // 1. Teile, Beziehungen, Inhaltstypen
    const items = dateien.filter(n => /^customXml\/itemCdse\d+\.xml$/.test(n));
    H.ok(items.length === 1, name + ': ein Datenteil customXml/itemCdseN.xml (' + items.join(', ') + ')');
    const item = items[0] || '', nr = (/itemCdse(\d+)\.xml$/.exec(item) || [])[1];
    const props = 'customXml/itemPropsCdse' + nr + '.xml', rels = 'customXml/_rels/itemCdse' + nr + '.xml.rels';
    H.ok(dateien.indexOf(props) >= 0 && dateien.indexOf(rels) >= 0, name + ': ' + props + ' und ' + rels);
    const neu = dateien.filter(n => !(n in v.teile)).sort();
    H.ok(gleich(neu, [item, rels, props].sort()), name + ': genau drei neue Teile (' + neu.join(', ') + ')');
    const itemXml = await z.file(item).async('string'), propsXml = await z.file(props).async('string'), relsXml = await z.file(rels).async('string');
    const docRels = await z.file('word/_rels/document.xml.rels').async('string'), typen = await z.file('[Content_Types].xml').async('string');
    const rel = (docRels.match(/<Relationship [^>]*>/g) || []).filter(x => x.indexOf('Target="../customXml/itemCdse' + nr + '.xml"') >= 0);
    H.ok(rel.length === 1 && rel[0].indexOf('Type="' + TYP_CUSTOM + '"') >= 0, name + ': Beziehung vom Hauptdokument (' + (rel[0] || 'fehlt') + ')');
    const relId = (/Id="([^"]+)"/.exec(rel[0] || '') || [])[1];
    H.ok(relId && (docRels.match(new RegExp('Id="' + relId + '"', 'g')) || []).length === 1, name + ': Id der Beziehung eindeutig (' + relId + ')');
    H.ok(new RegExp('<Relationship Id="rId1" Type="' + TYP_PROPS.replace(/[.]/g, '\\.') + '" Target="itemPropsCdse' + nr + '\\.xml"/>').test(relsXml), name + ': ' + rels + ' zeigt auf die Eigenschaften');
    H.ok(typen.indexOf('<Override PartName="/' + props + '" ContentType="' + INHALT_PROPS + '"/>') >= 0, name + ': Inhaltstyp (Override) für ' + props);
    H.ok(/<Default [^>]*Extension="xml"[^>]*ContentType="application\/xml"|<Default [^>]*ContentType="application\/xml"[^>]*Extension="xml"/i.test(typen), name + ': Default-Inhaltstyp für xml');
    const guid = (/ds:itemID="(\{[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}\})"/.exec(propsXml) || [])[1];
    H.ok(guid && propsXml.indexOf('<ds:schemaRef ds:uri="' + NS + '"/>') >= 0, name + ': itemProps mit GUID und Schema ' + NS);
    guids.push(guid);
    // 2. Datenteil: Wurzel, Attribute, JSON
    const m = /^<\?xml version="1\.0" encoding="UTF-8" standalone="yes"\?><cdse:daten xmlns:cdse="([^"]+)" version="1" art="([^"]+)" sprache="([^"]+)" erstellt="([^"]+)">([A-Za-z0-9+/=]+)<\/cdse:daten>$/.exec(itemXml);
    H.ok(!!m && m[1] === NS, name + ': <cdse:daten xmlns:cdse="' + NS + '" version="1" …>BASE64</cdse:daten>');
    let json = null;
    try { json = JSON.parse(b64(m ? m[5] : '').toString('utf8')); } catch (e) { json = null; }
    H.ok(!!json, name + ': Inhalt ist Base64 von UTF-8-JSON');
    if (!m || !json) { continue; }
    const art = d.art === 'pei-schlank' ? 'pei' : d.art;
    H.ok(m[2] === art && json.art === art && m[3] === json.sprache && m[4] === json.erstellt && !isNaN(Date.parse(json.erstellt)), name + ': art/sprache/erstellt wie im JSON (' + m[2] + ', ' + m[3] + ', ' + m[4] + ')');
    H.ok(gleich(json, v.daten), name + ': JSON = eingebettete Daten ' + (gleich(json, v.daten) ? '' : unterschied(json, v.daten)));
    H.ok(json.format === 'cdse-eldib-daten' && json.version === 1 && json.generator === 'ELDiB-Generator ' + r.stand && /^[0-9a-f]{12}$/.test(r.stand || ''), name + ': format, version, generator (' + json.generator + ')');
    // Quelle: Stammdaten (mit Geschlecht aus der Schülerliste), Einschätzungen, Zielsätze bzw. DS
    const schueler = Object.assign({}, Q.stamm, { geschlecht: 'w' });
    H.ok(gleich(json.schueler, schueler), name + ': schueler = Stammdaten ' + (gleich(json.schueler, schueler) ? '' : unterschied(json.schueler, schueler)));
    H.ok(json.einschaetzungNr === 2, name + ': offene Einschätzung 2');
    if (art === 'ds') {
      const erw = [{ nr: 2, datum: Q.stamm.einschaetzungsdatum, language: Q.language, selections: Q.selections }];
      H.ok(gleich(json.einschaetzungen, erw), name + ': nur die ELDiB-Auswahl der offenen Einschätzung (Raster 6.2) ' + (gleich(json.einschaetzungen, erw) ? '' : unterschied(json.einschaetzungen, erw)));
      H.ok(gleich(json.dsData, r.ds) && json.dsData.bearbeitet && typeof json.dsData.bearbeitet === 'object', name + ': dsData = DS-Assistent (mit bearbeitet) ' + (gleich(json.dsData, r.ds) ? '' : unterschied(json.dsData, r.ds)));
      H.ok(gleich(json.dsData.bewertungen, dsQuelle.bewertungen) && gleich(json.dsData.frei, dsQuelle.frei), name + ': Bewertungen und Freitexte wie eingegeben');
      H.ok(!('zieltexte' in json) && !('bericht' in json) && !json.einschaetzungen.some(e => 'zusaetzlicheZiele' in e), name + ': keine PEI-Daten im DS');
    } else {
      const e1 = eintrag.einschaetzung1;
      const erw = [
        { nr: 1, datum: E1.stammdaten.einschaetzungsdatum, language: E1.language, selections: E1.selections, zusaetzlicheZiele: E1.zusaetzlicheZiele, stammdaten: E1.stammdaten, savedAt: E1.savedAt },
        { nr: 2, datum: Q.stamm.einschaetzungsdatum, language: Q.language, selections: Q.selections, zusaetzlicheZiele: Q.zusatz, stammdaten: Q.stamm }
      ];
      H.ok(gleich(e1.selections, E1.selections), name + ': 1. Einschätzung in der Schülerliste unverändert');
      H.ok(gleich(json.einschaetzungen, erw), name + ': beide Einschätzungen (1. aus der Schülerliste, 2. aus dem Formular) ' + (gleich(json.einschaetzungen, erw) ? '' : unterschied(json.einschaetzungen, erw)));
      H.ok(Q.selections['K-3'] && json.einschaetzungen[1].selections['K-3'] && !E2.selections['K-3'], name + ': offene Einschätzung mit dem Stand des Formulars');
      H.ok(!('dsData' in json) && !json.einschaetzungen.some(e => 'dsData' in e || 'bereichNotizen' in e), name + ': keine DS-Daten und keine Notizen im PEI/Complément');
      if (d.art === 'complement') {
        H.ok(gleich(json.zieltexte, r.zieltexte), name + ': zieltexte ' + (gleich(json.zieltexte, r.zieltexte) ? '' : unterschied(json.zieltexte, r.zieltexte)));
      } else {
        H.ok(gleich(json.zieltexte, v.extra.zieltexte) && gleich(json.zieltexte, r.zieltexte), name + ': zieltexte = Zielsätze des Dokuments ' + (gleich(json.zieltexte, r.zieltexte) ? '' : unterschied(json.zieltexte, r.zieltexte)));
      }
      const text = (await H.docxText(b64(d.b64))).replace(/\s+/g, ' ');
      // der Complément zeigt die zusätzlichen Ziele; die Zielsätze kommen dort aus dem Formular
      if (d.art !== 'complement') {
        const fehlend = Object.keys(json.zieltexte).filter(c => text.indexOf(json.zieltexte[c].replace(/\s+/g, ' ')) < 0);
        H.ok(!fehlend.length && Object.keys(json.zieltexte).length === 3, name + ': jeder Zielsatz steht im Dokument (' + Object.keys(json.zieltexte).join(', ') + ')' + (fehlend.length ? ' – fehlt: ' + fehlend.join(', ') : ''));
      }
      if (d.art === 'pei') {
        const b = json.bericht || [];
        H.ok(b.length === 2 && b[0].nr === 1 && b[1].nr === 2 && b[0].datum === E1.stammdaten.einschaetzungsdatum && b[1].datum === Q.stamm.einschaetzungsdatum, name + ': Bericht mit beiden Spalten (Nr., Datum)');
        const punkte = b.reduce((l, s) => l.concat(s.fortschritte, s.themen), []);
        const ohne = punkte.filter(p => text.indexOf(p.replace(/\s+/g, ' ')) < 0);
        H.ok(punkte.length > 0 && !ohne.length, name + ': jeder Punkt des Berichts steht im Dokument (' + punkte.length + ')' + (ohne.length ? ' fehlt: ' + ohne[0] : ''));
      }
      if (d.art === 'pei-schlank') { H.ok(json.variante === 'schlank', name + ': variante "schlank"'); }
    }
    // 3. Byte für Byte: alle alten Teile gleich, die zwei geänderten nur um die neuen Einträge länger
    const geaendert = ['[Content_Types].xml', 'word/_rels/document.xml.rels'];
    const anders = [];
    for (const n of Object.keys(v.teile)) {
      if (geaendert.indexOf(n) >= 0) { continue; }
      const jetzt = z.file(n) ? Buffer.from(await z.file(n).async('uint8array')) : null;
      if (!jetzt || !jetzt.equals(b64(v.teile[n]))) { anders.push(n); }
    }
    H.ok(z.file('word/document.xml') && Buffer.from(await z.file('word/document.xml').async('uint8array')).equals(b64(v.teile['word/document.xml'])), name + ': word/document.xml Byte für Byte wie ohne die Daten');
    H.ok(!anders.length, name + ': alle übrigen Teile unverändert (' + (Object.keys(v.teile).length - 2) + ')' + (anders.length ? ' – anders: ' + anders.join(', ') : ''));
    const typenVorher = b64(v.teile['[Content_Types].xml']).toString('utf8');
    const typenOhne = typen.replace('<Override PartName="/' + props + '" ContentType="' + INHALT_PROPS + '"/>', '').replace(/<Default Extension="xml" ContentType="application\/xml"\/>/, s => (typenVorher.indexOf(s) >= 0 ? s : ''));
    H.ok(typenOhne === typenVorher, name + ': [Content_Types].xml nur um die neuen Einträge ergänzt');
    const relsVorher = v.teile['word/_rels/document.xml.rels'] ? b64(v.teile['word/_rels/document.xml.rels']).toString('utf8') : null;
    H.ok(relsVorher !== null && docRels.replace(rel[0], '') === relsVorher, name + ': document.xml.rels nur um die neue Beziehung ergänzt');
    // wohlgeformt: alle XML-Teile des Pakets
    for (const n of dateien.filter(n => /\.(xml|rels)$/i.test(n))) { alleXml.push({ name: d.name + ':' + n, xml: await z.file(n).async('string') }); }
  }
  H.ok(new Set(guids).size === guids.length, 'jede Datei mit eigener GUID');
  const kaputt = await page.evaluate(liste => liste.filter(x => {
    const doc = new DOMParser().parseFromString(x.xml, 'application/xml');
    return doc.getElementsByTagName('parsererror').length > 0;
  }).map(x => x.name), alleXml);
  H.ok(!kaputt.length, 'alle ' + alleXml.length + ' XML-Teile wohlgeformt' + (kaputt.length ? ' – ' + kaputt.join(', ') : ''));
  // schon belegt: nächste freie Nummer
  H.ok(gleich(r.zweimalTeile, ['customXml/_rels/item1.xml.rels', 'customXml/_rels/itemCdse1.xml.rels', 'customXml/_rels/itemCdse2.xml.rels', 'customXml/item1.xml', 'customXml/itemCdse1.xml', 'customXml/itemCdse2.xml', 'customXml/itemProps1.xml', 'customXml/itemPropsCdse1.xml', 'customXml/itemPropsCdse2.xml'])
    && /Id="rIdCdse2"[^>]*Target="\.\.\/customXml\/itemCdse2\.xml"/.test(r.zweimalRels), 'zweites Einbetten: itemCdse2, rIdCdse2 (Teile der Vorlage bleiben)');
  H.ok(blockiert.length === 0, 'keine Netzanfragen (' + blockiert.length + ')');
  H.ok(fehler.length === 0, 'keine Fehler im Generator ' + JSON.stringify(fehler));
  await browser.close();
  console.log('\n' + (H.fehler() ? H.fehler() + ' Prüfung(en) fehlgeschlagen' : 'Alle Prüfungen bestanden'));
})().catch(e => { console.error(e); process.exit(1); });
