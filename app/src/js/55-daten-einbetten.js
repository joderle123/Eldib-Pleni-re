// =====================================================================
// Daten unsichtbar in jede erzeugte Word-Datei legen (PEI, Complément, DS)
// ---------------------------------------------------------------------
// Der CDSE Hub liest damit die Daten eines PEI bzw. DS 1:1 zurück (Dossier,
// Schülerliste des Generators, DS-Assistent). Sichtbar ändert sich nichts:
// word/document.xml bleibt unverändert. Dazu kommt ein eigener XML-Teil, so wie
// Word ihn selbst schreibt – Word behält ihn beim Bearbeiten und Speichern
// (benennt ihn dabei evtl. um: der Hub durchsucht alle customXml/*.xml).
//   customXml/itemCdse1.xml             <cdse:daten xmlns:cdse="urn:cdse:eldib-generator:1" version="1"
//                                        art="pei|complement|ds" sprache="de|fr|en" erstellt="…">BASE64</cdse:daten>
//   customXml/itemPropsCdse1.xml        ds:datastoreItem (neue GUID), schemaRef urn:cdse:eldib-generator:1
//   customXml/_rels/itemCdse1.xml.rels  -> itemPropsCdse1.xml
//   word/_rels/document.xml.rels        Beziehung …/relationships/customXml -> ../customXml/itemCdse1.xml
//   [Content_Types].xml                 Override für itemProps; Default für xml (application/xml)
// BASE64 = UTF-8-JSON (cdseDatenSammeln):
//   { format: 'cdse-eldib-daten', version: 1, art, sprache, erstellt, generator,
//     schueler: Stammdaten (getStammdaten, dazu geschlecht aus der Schülerliste),
//     einschaetzungNr: offene Einschätzung (1|2),
//     einschaetzungen: [{ nr, datum, language, selections, zusaetzlicheZiele, stammdaten, savedAt }],
//     PEI/Complément: zieltexte { code: Zielsatz }, bericht [{ nr, datum, fortschritte, themen }] (nur PEI),
//     DS: dsData (DsAssistent, mit bearbeitet), einschaetzungen nur mit den ELDiB-Auswahlen (Raster 6.2) }
// Der PEI enthält keine DS-Daten, der DS keine zusätzlichen Ziele. Nicht eingebettet werden die
// Notizen zu den ELDiB-Bereichen (interne Arbeitsnotizen, stehen in keinem Dokument).
// =====================================================================
const CDSE_DATEN = {
  ns: 'urn:cdse:eldib-generator:1',
  format: 'cdse-eldib-daten',
  version: 1,
  typCustomXml: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml',
  typProps: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps',
  inhaltProps: 'application/vnd.openxmlformats-officedocument.customXmlProperties+xml'
};

function cdseKopie(o) { return o == null ? o : JSON.parse(JSON.stringify(o)); }

// Welche Daten gehören in das Dokument? art: 'pei' | 'complement' | 'ds'
// extra: { zieltexte, bericht, variante } – vom Aufrufer, damit es genau die Werte des Dokuments sind
function cdseDatenSammeln(art, sprache, extra) {
  extra = extra || {};
  const stamm = typeof getStammdaten === 'function' ? getStammdaten() : {};
  const schueler = cdseKopie(stamm);
  let eintrag = null, nr = 1;
  if (typeof smAktuellerSchueler !== 'undefined' && smAktuellerSchueler && typeof smGetListe === 'function') {
    eintrag = smGetListe().find(function (s) { return s.id === smAktuellerSchueler.id; }) || null;
    nr = smAktuellerSchueler.einschaetzungNr === 2 ? 2 : 1;
  }
  if (eintrag && eintrag.geschlecht) { schueler.geschlecht = eintrag.geschlecht; }
  // die offene Einschätzung so, wie sie gerade im Formular steht; die andere aus der Schülerliste
  const offen = { language: state.language, selections: state.selections || {}, zusaetzlicheZiele: state.zusaetzlicheZiele || {}, stammdaten: stamm };
  const einschaetzung = function (n, e) {
    if (!e || typeof e !== 'object' || !Object.keys(e).length) { return null; }
    const o = { nr: n, datum: (e.stammdaten && e.stammdaten.einschaetzungsdatum) || '', language: e.language || 'de', selections: cdseKopie(e.selections || {}) };
    if (art !== 'ds') {
      o.zusaetzlicheZiele = cdseKopie(e.zusaetzlicheZiele || {});
      o.stammdaten = cdseKopie(e.stammdaten || {});
      if (e.savedAt) { o.savedAt = e.savedAt; }
    }
    return o;
  };
  const einschaetzungen = art === 'ds' ? [einschaetzung(nr, offen)]
    : [1, 2].map(function (n) { return einschaetzung(n, n === nr ? offen : (eintrag ? eintrag['einschaetzung' + n] : null)); }).filter(Boolean);
  const daten = {
    format: CDSE_DATEN.format, version: CDSE_DATEN.version, art: art, sprache: sprache || 'de', erstellt: new Date().toISOString(),
    generator: 'ELDiB-Generator ' + (typeof ELDIB_GENERATOR_STAND !== 'undefined' ? ELDIB_GENERATOR_STAND : 'ohne Stand'),
    schueler: schueler, einschaetzungNr: nr, einschaetzungen: einschaetzungen
  };
  if (extra.variante) { daten.variante = extra.variante; }
  if (art === 'ds') {
    daten.dsData = cdseKopie(typeof getDSData === 'function' ? getDSData() : {});
  } else {
    daten.zieltexte = extra.zieltexte ? cdseKopie(extra.zieltexte) : cdseZieltexte(state.selections || {});
    if (extra.bericht) { daten.bericht = cdseKopie(extra.bericht); }
  }
  return daten;
}
// Zielsätze (in der Sprache des Dokuments) zu allen Items mit Status "ziel"
function cdseZieltexte(selections) {
  const aus = {};
  Object.keys(selections || {}).forEach(function (code) {
    const s = selections[code];
    if (s && s.status === 'ziel') { aus[code] = typeof resolveZieltext === 'function' ? resolveZieltext(code, s) : (s.zieltext || ''); }
  });
  return aus;
}

function cdseGuid() {
  const b = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) { crypto.getRandomValues(b); } else { for (let i = 0; i < 16; i++) { b[i] = Math.floor(Math.random() * 256); } }
  b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.prototype.map.call(b, function (x) { return (x < 16 ? '0' : '') + x.toString(16); }).join('').toUpperCase();
  return '{' + h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20) + '}';
}
function cdseBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) { s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); }
  return btoa(s);
}
function cdseXmlAttr(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

// Legt die Daten in ein geöffnetes Word-Paket (JSZip). Gibt die eingebetteten Daten zurück.
async function cdseDatenEinbetten(zip, art, sprache, extra) {
  const daten = cdseDatenSammeln(art, sprache, extra);
  let n = 1;
  while (zip.file('customXml/itemCdse' + n + '.xml') || zip.file('customXml/itemPropsCdse' + n + '.xml') || zip.file('customXml/_rels/itemCdse' + n + '.xml.rels')) { n++; }
  const item = 'itemCdse' + n + '.xml', props = 'itemPropsCdse' + n + '.xml', ohneOrdner = { createFolders: false };
  zip.file('customXml/' + item, '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<cdse:daten xmlns:cdse="' + CDSE_DATEN.ns + '" version="' + CDSE_DATEN.version + '" art="' + cdseXmlAttr(art) + '" sprache="' + cdseXmlAttr(daten.sprache) +
    '" erstellt="' + cdseXmlAttr(daten.erstellt) + '">' + cdseBase64(JSON.stringify(daten)) + '</cdse:daten>', ohneOrdner);
  zip.file('customXml/' + props, '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
    '<ds:datastoreItem ds:itemID="' + cdseGuid() + '" xmlns:ds="http://schemas.openxmlformats.org/officeDocument/2006/customXml">' +
    '<ds:schemaRefs><ds:schemaRef ds:uri="' + CDSE_DATEN.ns + '"/></ds:schemaRefs></ds:datastoreItem>', ohneOrdner);
  zip.file('customXml/_rels/' + item + '.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="' + CDSE_DATEN.typProps + '" Target="' + props + '"/></Relationships>', ohneOrdner);
  // Beziehung vom Hauptdokument (wie bei Word: word/_rels/document.xml.rels)
  const relPfad = 'word/_rels/document.xml.rels';
  let rels = zip.file(relPfad) ? await zip.file(relPfad).async('string')
    : '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>';
  let id = 'rIdCdse' + n, k = n;
  while (rels.indexOf('Id="' + id + '"') >= 0) { id = 'rIdCdse' + (++k); }
  rels = rels.replace(/<\/Relationships>\s*$/, '<Relationship Id="' + id + '" Type="' + CDSE_DATEN.typCustomXml + '" Target="../customXml/' + item + '"/></Relationships>');
  zip.file(relPfad, rels);
  // Inhaltstypen: itemProps als Override, xml als Default (für das Datenteil selbst)
  let typen = await zip.file('[Content_Types].xml').async('string');
  if (!/<Default\b[^>]*\bExtension="xml"/i.test(typen)) { typen = typen.replace(/(<Types\b[^>]*>)/, '$1<Default Extension="xml" ContentType="application/xml"/>'); }
  typen = typen.replace(/<\/Types>\s*$/, '<Override PartName="/customXml/' + props + '" ContentType="' + CDSE_DATEN.inhaltProps + '"/></Types>');
  zip.file('[Content_Types].xml', typen);
  return daten;
}
// Für Dateien aus der docx-Bibliothek (Complément, schlanker PEI): Blob -> Paket -> Daten -> Blob
async function cdseDatenInBlob(blob, art, sprache, extra) {
  const zip = await JSZip.loadAsync(blob);
  await cdseDatenEinbetten(zip, art, sprache, extra);
  return zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', compression: 'DEFLATE' });
}
