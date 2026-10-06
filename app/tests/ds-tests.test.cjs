// Testergebnisse im DS (46c-ds-tests.js): aus dem CDSE Hub übernehmen, bearbeiten, Bericht.
// Nur erfundene Kinder und Namen.
//   node app/tests/ds-tests.test.cjs
// Eine erfundene Schülerin hat in der Schülerliste zwei Tests aus dem Hub (cdseTests: WISC-V und ein
// anderes Verfahren). Geprüft wird:
//  - ds-motor.js enthält DsTests; DsText.bericht setzt Tabelle und Text unter 4.2 (nach dem ELDiB)
//  - Karte im Schritt „ELDiB-Ergebnisse“: Vorschau, Übernehmen mit einem Klick (Verfahren „WISC-V“ in 4 angekreuzt),
//    ein von Hand geschriebener Abschnitt 4.2 wird nicht überschrieben (nur „veraltet“), Tabelle in der Vorschau
//  - Bearbeiten: Standardwert -> Einordnung automatisch, freie Einordnung, getippte Bezeichnung wird erkannt
//  - Word DE/FR/EN: Zwischenzeile, Tabellenzeilen mit den Bezeichnungen der Sprache, feste Spalten, Kopfzeile
//    wiederholt; eingebettete Daten mit den Tests; der DS-Leser liest die Datei ohne Fehler
//  - „Im Hub geändert“ mit „Neu übernehmen“, entfernen, Test von Hand, Speichern, ältere Daten ohne „tests“
'use strict';
const fs = require('fs'), vm = require('vm');
const H = require('./hilfen.cjs');

const ZUSATZ_LEER = { demarches_mentales: {}, manieres_apprendre: {}, attitudes_relationnelles: {}, attitudes_affectives: {}, competences_essentielles: {}, culture_loisirs: {} };
const WISC = { id: 'te-wisc-1', verfahren: 'wisc-v', name: 'WISC-V', sprache: 'de', datum: '2026-03-12', leiter: 'Dora Diag', ki: 95,
  zeilen: [{ k: 'VCI', sw: '98', pr: '45', kiVon: '92', kiBis: '104', band: 'mittel' }, { k: 'VSI', sw: '112', pr: '79', kiVon: '104', kiBis: '118', band: 'oberer' },
    { k: 'FRI', sw: '85', pr: '16', kiVon: '79', kiBis: '93', band: 'unterer' }, { k: 'WMI', sw: '91', pr: '27', kiVon: '85', kiBis: '98', band: 'mittel' },
    { k: 'PSI', sw: '103', pr: '58', kiVon: '95', kiBis: '110', band: 'mittel' }, { k: 'FSIQ', sw: '97', pr: '42', kiVon: '92', kiBis: '102', band: 'mittel' }],
  untertests: [{ k: 'SI', ww: '9' }, { k: 'VC', ww: '10' }], text: 'Insgesamt durchschnittliche Ergebnisse; die Stärke liegt im visuell-räumlichen Bereich.',
  erstellt: '2026-03-13T09:00:00.000Z', erstelltVon: 'k1', geaendert: '2026-03-13T09:00:00.000Z', geaendertVon: 'k1' };
const ANDERES = { id: 'te-and-1', verfahren: 'anderes', name: 'Beispiel-Fragebogen', datum: '2026-02-02', leiter: 'Dora Diag',
  zeilen: [{ bez: 'Gesamtwert', sw: 'T 62', pr: '88', einordnung: 'erhöht' }, { bez: 'Skala A', sw: 'T 48' }], text: 'Erhöhter Gesamtwert laut Elternangaben.',
  erstellt: '2026-02-03T08:00:00.000Z', geaendert: '2026-02-03T08:00:00.000Z' };
const E1 = { language: 'de', selections: { 'V-1': { status: 'erreicht' }, 'V-2': { status: 'ziel', zielIndex: 0, zieltext: '' }, 'K-1': { status: 'erreicht' } }, zusaetzlicheZiele: ZUSATZ_LEER,
  stammdaten: { schueler_name: 'Beispiel, Mila', geburtsdatum: '2016-05-09', klasse: 'C2.2', foerderort: 'École Fondamentale Beispielstadt', einschaetzungsdatum: '2026-03-20' },
  dsData: { v: 2, geschlecht: 'w', bewertungen: {}, chips: {}, f: { verfasser_name: 'Lea Beispiel', auftrag_datum: '2026-01-10' }, frei: {}, tabellen: {}, bearbeitet: {} }, savedAt: '2026-03-20T10:00:00.000Z' };
const SCHUELERIN = { id: 'sch-tests', name: 'Beispiel, Mila', klasse: 'C2.2', geburtsdatum: '2016-05-09', geschlecht: 'w', einschaetzung1: E1, einschaetzung2: null, hubId: 'dossier-1', cdseTests: [WISC, ANDERES] };

function gleich(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
function b64(s) { return Buffer.from(s, 'base64'); }

(async () => {
  console.log('1) ds-motor.js: DsTests und der Bericht im Motor');
  const code = fs.readFileSync(H.MOTOR, 'utf8'), ctx = { console }; vm.createContext(ctx);
  const Mo = vm.runInContext(code + '\n;({ DsTests, DsText, DS_LESER })', ctx);
  H.ok(!!Mo.DsTests && Mo.DsTests.bandVon('98') === 'mittel' && Mo.DsTests.bandVon('130') === 'sehr_hoch' && Mo.DsTests.bandVon('119') === 'oberer' && Mo.DsTests.bandVon('69') === 'sehr_niedrig' && Mo.DsTests.bandVon('39') === '' && Mo.DsTests.bandVon('abc') === '',
    'ds-motor.js: DsTests mit Einordnung nach Wertebereich (≥130 … ≤69, sonst leer)');
  const dsM = { v: 2, bewertungen: {}, chips: {}, f: {}, frei: {}, tabellen: {}, tests: [ANDERES, WISC] };
  const abM = Mo.DsText.bericht('de', dsM, { schueler_name: 'Beispiel, Mila' }, { bereiche: [], lebensalter: null }).eldib;
  const tabM = abM.filter(b => b.typ === 'tabelle'), zwM = abM.filter(b => b.typ === 'zwischen').map(b => b.text);
  H.ok(/^Der ELDiB/.test(abM[0].text) && gleich(zwM, ['WISC-V – 12.03.2026', 'Beispiel-Fragebogen – 02.02.2026']), 'Motor: 4.2 beginnt mit dem ELDiB, dann die Tests nach Datum (neuester zuerst) ' + JSON.stringify(zwM));
  H.ok(gleich(tabM[0].kopf, ['Index', 'Standardwert', 'Prozentrang', 'Konfidenzintervall (95 %)', 'Einordnung']) && gleich(tabM[0].zeilen[0], ['Sprachverständnis (SV)', '98', '45', '92–104', 'durchschnittlich']) && gleich(tabM[0].zeilen[5], ['Gesamt-IQ (GIQ)', '97', '42', '92–102', 'durchschnittlich']) && tabM[0].breiten.length === 5,
    'Motor: WISC-V-Tabelle mit sechs Indizes (deutsche Bezeichnungen) ' + JSON.stringify(tabM[0] && tabM[0].zeilen[0]));
  H.ok(gleich(tabM[1].kopf, ['Untertest', 'Wertpunkte']) && gleich(tabM[1].zeilen, [['Gemeinsamkeiten finden', '9'], ['Wortschatz-Test', '10']]), 'Motor: Untertests nur mit Wertpunkten ' + JSON.stringify(tabM[1] && tabM[1].zeilen));
  H.ok(gleich(tabM[2].kopf, ['Bezeichnung', 'Wert', 'Prozentrang', 'Einordnung']) && gleich(tabM[2].zeilen, [['Gesamtwert', 'T 62', '88', 'erhöht'], ['Skala A', 'T 48', '', '']]), 'Motor: anderes Verfahren mit freier Tabelle (ohne Spalte Konfidenzintervall) ' + JSON.stringify(tabM[2] && tabM[2].zeilen));
  const absM = abM.filter(b => b.typ === 'absatz').map(b => b.text);
  H.ok(absM.includes('Durchführung am 12.03.2026 durch Dora Diag. Die Tabelle zeigt die Standardwerte (Mittelwert 100, Standardabweichung 15), die Prozentränge, das Konfidenzintervall (95 %) und die Einordnung.') && absM.includes(WISC.text) && absM.includes('Durchführung am 02.02.2026 durch Dora Diag.') && absM.includes(ANDERES.text),
    'Motor: Einleitungssatz (nur was in der Tabelle steht) und die Interpretation als Absatz ' + JSON.stringify(absM.slice(-4)));
  const abFr = Mo.DsText.bericht('fr', dsM, { schueler_name: 'Beispiel, Mila' }, { bereiche: [], lebensalter: null }).eldib, tabFr = abFr.filter(b => b.typ === 'tabelle');
  H.ok(gleich(tabFr[0].kopf, ['Indice', 'Note standard', 'Rang percentile', 'Intervalle de confiance (95 %)', 'Classification']) && gleich(tabFr[0].zeilen[1], ['Visuospatial (IVS)', '112', '79', '104–118', 'moyen supérieur']) && abFr.some(b => b.text === 'Passation le 12.03.2026 par Dora Diag. Le tableau présente les notes standard (moyenne 100, écart-type 15), les rangs percentiles, l’intervalle de confiance (95 %) et la classification.'),
    'Motor FR: französische Bezeichnungen und Einordnungen ' + JSON.stringify(tabFr[0] && tabFr[0].zeilen[1]));

  console.log('2) Im Generator: Karte im Schritt „ELDiB-Ergebnisse“, Übernehmen, Handbearbeitung bleibt');
  const { browser, page, blockiert, fehler } = await H.generatorStarten();
  await H.schuelerOeffnen(page, SCHUELERIN, 1);
  await page.evaluate(() => showMainSection('ds'));
  await page.waitForSelector('.dsa-schritt[data-schritt="eldib"]');
  // 4.2 von Hand bearbeiten (Vorschau & Export), bevor etwas übernommen wird
  await page.click('.dsa-schritt[data-schritt="vorschau"]'); await page.waitForSelector('[data-aktion="bearbeiten"][data-ab="eldib"]');
  await page.click('[data-aktion="bearbeiten"][data-ab="eldib"]'); await page.waitForSelector('textarea[data-edit="eldib"]');
  await page.fill('textarea[data-edit="eldib"]', 'Von Hand geschriebener Abschnitt 4.2.');
  await page.click('[data-aktion="uebernehmen"][data-ab="eldib"]'); await page.waitForTimeout(200);
  const hand = await page.evaluate(() => { const a = DsAssistent.fertig('de').abschnitte.find(x => x.id === 'eldib'); return { bearbeitet: a.bearbeitet, veraltet: a.veraltet, text: a.bloecke.map(b => b.text).join('|') }; });
  H.ok(hand.bearbeitet && !hand.veraltet && hand.text === 'Von Hand geschriebener Abschnitt 4.2.', '4.2 von Hand bearbeitet (nicht veraltet)');
  await page.click('.dsa-schritt[data-schritt="eldib"]'); await page.waitForSelector('.dsa-tests');
  const k0 = await page.evaluate(() => ({ hub: document.querySelectorAll('.dsa-testvorschau').length, alle: !!document.querySelector('[data-aktion="testsAlle"]'), tests: getDSData().tests.length,
    vorschau: document.querySelector('.dsa-testvorschau').innerText.replace(/\s+/g, ' '), rechts: document.getElementById('dsa-vorschau').innerText }));
  H.ok(k0.hub === 2 && k0.alle && k0.tests === 0 && /WISC-V – 12\.03\.2026/.test(k0.vorschau) && /Sprachverständnis \(SV\)/.test(k0.vorschau) && /durchschnittlich/.test(k0.vorschau) && /Testleitung: Dora Diag/.test(k0.vorschau),
    'Karte: zwei Tests aus dem Hub zur Übernahme mit Vorschau-Tabelle, noch nichts im DS ' + k0.vorschau.slice(0, 120));
  H.ok(/Von Hand geschriebener Abschnitt 4\.2\./.test(k0.rechts) && !/WISC-V/.test(k0.rechts), 'Vorschau 4.2 vorher: der von Hand geschriebene Text, keine Tabelle');
  await page.click('.dsa-tests [data-aktion="testUebernehmen"][data-hid="te-wisc-1"]'); await page.waitForTimeout(300);
  const k1 = await page.evaluate(() => { const d = getDSData(); return { n: d.tests.length, hub: d.tests[0].hub, chips: d.chips.verfahren, zeilen: d.tests[0].zeilen.map(z => z.k + ':' + z.sw + ':' + z.band), offen: document.querySelectorAll('.dsa-testvorschau').length, alle: !!document.querySelector('[data-aktion="testsAlle"]'), felder: document.querySelectorAll('.dsa-test[data-i="0"] input[data-tz]').length }; });
  H.ok(k1.n === 1 && k1.hub.id === 'te-wisc-1' && k1.hub.stand === WISC.geaendert && (k1.chips || []).includes('wisc') && k1.zeilen[0] === 'VCI:98:mittel' && k1.zeilen[5] === 'FSIQ:97:mittel' && k1.offen === 1 && !k1.alle && k1.felder === 30,
    'Ein Klick: WISC-V im DS (Herkunft und Stand), Verfahren „WISC-V“ in 4 angekreuzt, bearbeitbare Felder; der zweite Test wartet ' + JSON.stringify(k1));
  const f1 = await page.evaluate(() => { const a = DsAssistent.fertig('de').abschnitte.find(x => x.id === 'eldib'); return { text: a.bloecke.map(b => b.text).join('|'), bearbeitet: a.bearbeitet, veraltet: a.veraltet }; });
  H.ok(f1.bearbeitet && f1.veraltet && f1.text === 'Von Hand geschriebener Abschnitt 4.2.', 'Nichts überschrieben: der von Hand geschriebene Abschnitt bleibt, jetzt als „veraltet“ markiert');
  // Handbearbeitung aufheben (wie „Automatischen Text wiederherstellen“), zweiten Test übernehmen
  await page.evaluate(() => { delete getDSData().bearbeitet.de.eldib; });
  await page.click('.dsa-tests [data-aktion="testUebernehmen"][data-hid="te-and-1"]'); await page.waitForTimeout(300);
  const f2 = await page.evaluate(() => { const a = DsAssistent.fertig('de').abschnitte.find(x => x.id === 'eldib'); const d = getDSData();
    return { typen: a.bloecke.map(b => b.typ), zw: a.bloecke.filter(b => b.typ === 'zwischen').map(b => b.text), tab: a.bloecke.filter(b => b.typ === 'tabelle').map(b => ({ kopf: b.kopf, z0: b.zeilen[0] })), frei: d.frei.verfahren_andere, n: d.tests.length, erster: a.bloecke[0].text }; });
  H.ok(f2.n === 2 && f2.frei === 'Beispiel-Fragebogen' && /^Der ELDiB/.test(f2.erster) && gleich(f2.zw, ['WISC-V – 12.03.2026', 'Beispiel-Fragebogen – 02.02.2026']) && f2.tab.length === 3 && gleich(f2.tab[0].z0, ['Sprachverständnis (SV)', '98', '45', '92–104', 'durchschnittlich']) && gleich(f2.tab[2].z0, ['Gesamtwert', 'T 62', '88', 'erhöht']),
    'Beide Tests im Bericht: ELDiB zuerst, dann WISC-V (Tabelle, Untertests) und das andere Verfahren (Name unter „Weitere Verfahren“) ' + JSON.stringify(f2.zw));
  const v1 = await page.evaluate(() => document.getElementById('dsa-vorschau').innerHTML);
  H.ok(/<table class="dsb-tab">/.test(v1) && /Sprachverständnis \(SV\)/.test(v1) && /92–104/.test(v1) && /class="dsb-zw">WISC-V – 12\.03\.2026/.test(v1), 'Vorschau 4.2: Zwischenzeile und Tabelle mit den Indizes');

  console.log('3) Bearbeiten: Werte, Einordnung');
  await page.fill('.dsa-test[data-i="0"] input[data-tz="0"][data-tf="sw"]', '125'); await page.waitForTimeout(300);
  const e1 = await page.evaluate(() => { const z = getDSData().tests[0].zeilen[0]; return { sw: z.sw, band: z.band, ein: z.einordnung, platz: document.querySelector('.dsa-test[data-i="0"] input[data-tz="0"][data-tf="einordnung"]').value }; });
  H.ok(e1.sw === '125' && e1.band === 'hoch' && !e1.ein && e1.platz === 'durchschnittlich', 'Standardwert 125 -> Einordnung „überdurchschnittlich“ (automatisch, Feld zeigt bis zum Neuzeichnen den alten Text) ' + JSON.stringify(e1));
  await page.fill('.dsa-test[data-i="0"] input[data-tz="0"][data-tf="einordnung"]', 'leicht über dem Durchschnitt'); await page.waitForTimeout(300);
  const e2 = await page.evaluate(() => { const z = getDSData().tests[0].zeilen[0]; const t = DsAssistent.fertig('de').abschnitte.find(x => x.id === 'eldib').bloecke.find(b => b.typ === 'tabelle'); return { band: z.band, ein: z.einordnung, zelle: t.zeilen[0][4] }; });
  H.ok(!e2.band && e2.ein === 'leicht über dem Durchschnitt' && e2.zelle === 'leicht über dem Durchschnitt', 'Freie Einordnung ersetzt die automatische – auch im Bericht');
  await page.fill('.dsa-test[data-i="0"] input[data-tz="0"][data-tf="einordnung"]', 'überdurchschnittlich'); await page.waitForTimeout(300);
  const e3 = await page.evaluate(() => { const z = getDSData().tests[0].zeilen[0]; return { band: z.band, ein: z.einordnung }; });
  H.ok(e3.band === 'hoch' && !e3.ein, 'Getippte Bezeichnung einer Einordnung wird als solche erkannt (wird im Bericht übersetzt)');
  await page.fill('.dsa-test[data-i="0"] input[data-tz="0"][data-tf="einordnung"]', ''); await page.waitForTimeout(200);
  H.ok((await page.evaluate(() => getDSData().tests[0].zeilen[0].band)) === 'hoch', 'Leer gelassen: wieder die automatische Einordnung zum Standardwert');
  await page.fill('.dsa-test[data-i="0"] input[data-tu="2"][data-tf="ww"]', '7'); await page.waitForTimeout(200);
  H.ok((await page.evaluate(() => getDSData().tests[0].untertests[2])).ww === '7', 'Untertest (Mosaik-Test) mit Wertpunkten ergänzt');

  console.log('4) Word DE/FR/EN, eingebettete Daten, DS-Leser');
  const docs = {};
  for (const lang of ['de', 'fr', 'en']) {
    const r = await page.evaluate(async l => { const blob = await DsWord.erstellen(l); const u = new Uint8Array(await blob.arrayBuffer()); let s = ''; for (let i = 0; i < u.length; i += 0x8000) { s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); } return btoa(s); }, lang);
    docs[lang] = b64(r);
  }
  const tDe = await H.docxText(docs.de), tFr = await H.docxText(docs.fr), tEn = await H.docxText(docs.en);
  H.ok(/4\.2\s*Ergebnisse der Testverfahren/.test(tDe) && tDe.indexOf('WISC-V – 12.03.2026') >= 0 && tDe.indexOf('Index\tStandardwert\tProzentrang\tKonfidenzintervall (95 %)\tEinordnung') >= 0 && tDe.indexOf('Sprachverständnis (SV)\t125\t45\t92–104\tüberdurchschnittlich') >= 0 && tDe.indexOf('Gesamt-IQ (GIQ)\t97\t42\t92–102\tdurchschnittlich') >= 0,
    'Word DE: Zwischenzeile, Kopfzeile und Zeilen der WISC-V-Tabelle in 4.2');
  H.ok(tDe.indexOf('Untertest\tWertpunkte') >= 0 && tDe.indexOf('Mosaik-Test\t7') >= 0 && tDe.indexOf('Gesamtwert\tT 62\t88\terhöht') >= 0 && tDe.indexOf(WISC.text) >= 0 && tDe.indexOf('Beispiel-Fragebogen – 02.02.2026') >= 0,
    'Word DE: Untertests, anderes Verfahren und die Interpretation');
  // „4.3“ steht auch im Inhaltsverzeichnis – gesucht wird ab dem ELDiB-Text des Hauptteils
  const pE = tDe.indexOf('Der ELDiB'), pW = tDe.indexOf('WISC-V – 12.03.2026'), p43 = tDe.indexOf('4.3', pE);
  H.ok(pE >= 0 && pE < pW && pW < p43, 'Word DE: Tests nach dem ELDiB, vor 4.3 ' + JSON.stringify({ pE, pW, p43 }));
  H.ok(tFr.indexOf('Indice\tNote standard\tRang percentile\tIntervalle de confiance (95 %)\tClassification') >= 0 && tFr.indexOf('Compréhension verbale (ICV)\t125\t45\t92–104\tsupérieur') >= 0 && tFr.indexOf('Passation le 12.03.2026 par Dora Diag.') >= 0 && tFr.indexOf('Similitudes\t9') >= 0,
    'Word FR: französische Bezeichnungen, Einordnungen und Einleitung');
  H.ok(tEn.indexOf('Verbal Comprehension (VCI)\t125\t45\t92–104\tVery High') >= 0 && tEn.indexOf('Administered on 12 March 2026 by Dora Diag.') >= 0 && tEn.indexOf('Full Scale IQ (FSIQ)\t97\t42\t92–102\tAverage') >= 0,
    'Word EN: englische Bezeichnungen und Einordnungen');
  const zDe = await H.JSZip.loadAsync(docs.de), xmlDe = await zDe.file('word/document.xml').async('string');
  const tabXml = xmlDe.slice(xmlDe.indexOf('WISC-V – 12.03.2026'));
  H.ok(/<w:tblLayout w:type="fixed"\/>/.test(tabXml) && /<w:tblHeader\/>/.test(tabXml) && /<w:gridCol w:w="2755"\/>/.test(tabXml) && /<w:tcW w:w="2755" w:type="dxa"\/>/.test(tabXml), 'Word: feste Spaltenbreiten, Kopfzeile wiederholt sich auf der nächsten Seite');
  const item = await zDe.file('customXml/itemCdse1.xml').async('string'), json = JSON.parse(b64((/>([A-Za-z0-9+/=]+)<\/cdse:daten>/.exec(item) || [])[1] || '').toString('utf8') || '{}');
  H.ok(json.dsData && json.dsData.tests && json.dsData.tests.length === 2 && json.dsData.tests[0].zeilen[0].sw === '125' && json.dsData.tests[0].hub.id === 'te-wisc-1', 'Eingebettete Daten: die Tests stehen in dsData (für den Hub)');
  let leser = null; try { leser = Mo.DS_LESER.lesen(tDe, {}); } catch (e) { leser = { fehler: e.message }; }
  H.ok(leser && !leser.fehler && leser.abschnitte && typeof leser.bewertungen === 'object' && !Object.keys(leser.bewertungen).length, 'DS-Leser liest den DS mit Tabellen ohne Fehler (keine erfundenen Bewertungen) ' + (leser && leser.fehler ? leser.fehler : ''));

  console.log('5) Im Hub geändert, entfernen, von Hand, speichern, ältere Daten');
  await page.evaluate(() => { const l = smGetListe(); l[0].cdseTests[0].geaendert = '2026-04-01T10:00:00.000Z'; l[0].cdseTests[0].text = 'Neuer Text aus dem Hub.'; smSaveListe(l); });
  await page.click('.dsa-schritt[data-schritt="deutung"]'); await page.click('.dsa-schritt[data-schritt="eldib"]'); await page.waitForTimeout(300);
  const n1 = await page.evaluate(() => { const w = document.querySelector('.dsa-test[data-i="0"] .dsa-warnung'); return { warn: w ? w.innerText.replace(/\s+/g, ' ') : '', sw: getDSData().tests[0].zeilen[0].sw, knopf: !!document.querySelector('.dsa-test[data-i="0"] .dsa-warnung [data-aktion="testUebernehmen"]') }; });
  H.ok(/Im Hub geändert \(01\.04\.2026\)/.test(n1.warn) && n1.knopf && n1.sw === '125', 'Im Hub geändert: Hinweis mit „Neu übernehmen“; der bearbeitete Wert bleibt bis dahin ' + n1.warn);
  await page.click('.dsa-test[data-i="0"] .dsa-warnung [data-aktion="testUebernehmen"]'); await page.waitForTimeout(300);
  const n2 = await page.evaluate(() => { const d = getDSData(), t = d.tests[0]; return { sw: t.zeilen[0].sw, text: t.text, stand: t.hub.stand, n: d.tests.length, warn: !!document.querySelector('.dsa-test[data-i="0"] .dsa-warnung') }; });
  H.ok(n2.sw === '98' && n2.text === 'Neuer Text aus dem Hub.' && n2.stand === '2026-04-01T10:00:00.000Z' && n2.n === 2 && !n2.warn, '„Neu übernehmen“ ersetzt genau diesen Test durch den Stand des Hubs ' + JSON.stringify(n2));
  await page.click('.dsa-test[data-i="1"] [data-aktion="testWeg"]'); await page.waitForTimeout(300);
  const w1 = await page.evaluate(() => ({ n: getDSData().tests.length, offen: document.querySelectorAll('.dsa-testvorschau').length, zw: DsAssistent.fertig('de').abschnitte.find(x => x.id === 'eldib').bloecke.filter(b => b.typ === 'zwischen').length }));
  H.ok(w1.n === 1 && w1.offen === 1 && w1.zw === 1, 'Aus dem Bericht entfernt: der Test wartet wieder im Hub-Kasten, der Bericht hat nur noch den WISC-V');
  await page.click('.dsa-tests [data-aktion="testHinzu"]'); await page.waitForTimeout(300);
  const h1 = await page.evaluate(() => { const t = getDSData().tests[1]; return { v: t.verfahren, n: t.zeilen.length, name: t.name, u: t.untertests.length, hub: !!t.hub, zw: DsAssistent.fertig('de').abschnitte.find(x => x.id === 'eldib').bloecke.filter(b => b.typ === 'zwischen').length }; });
  H.ok(h1.v === 'wisc-v' && h1.n === 6 && h1.name === 'WISC-V' && h1.u === 10 && !h1.hub && h1.zw === 1, '„Test von Hand“: leerer WISC-V mit sechs Indizes und zehn Untertests – ohne Werte nicht im Bericht');
  await page.fill('.dsa-test[data-i="1"] input[data-tz="5"][data-tf="sw"]', '200'); await page.waitForTimeout(200);
  const h2 = await page.evaluate(() => { const z = getDSData().tests[1].zeilen[5]; return { sw: z.sw, band: z.band, zw: DsAssistent.fertig('de').abschnitte.find(x => x.id === 'eldib').bloecke.filter(b => b.typ === 'zwischen').length }; });
  H.ok(h2.sw === '200' && h2.band === '' && h2.zw === 2, 'Wert außerhalb 40–160: keine Einordnung (die Plausibilität prüft der Hub beim Eintragen)');
  await page.evaluate(() => smSaveAll());
  const s1 = await page.evaluate(() => { const s = smGetListe()[0]; return { tests: s.einschaetzung1.dsData.tests.length, hub: s.cdseTests.length, text: s.cdseTests[0].text }; });
  H.ok(s1.tests === 2 && s1.hub === 2 && s1.text === 'Neuer Text aus dem Hub.', 'Gespeichert: Tests in der Einschätzung, Hub-Tests beim Schüler unverändert');
  await page.reload(); await page.waitForSelector('#main-container', { state: 'visible' });
  await page.evaluate(() => showMainSection('ds')); await page.click('.dsa-schritt[data-schritt="eldib"]'); await page.waitForSelector('.dsa-tests');
  const s2 = await page.evaluate(() => ({ n: getDSData().tests.length, karten: document.querySelectorAll('.dsa-test').length, zw: DsAssistent.fertig('de').abschnitte.find(x => x.id === 'eldib').bloecke.filter(b => b.typ === 'zwischen').map(b => b.text) }));
  H.ok(s2.n === 2 && s2.karten === 2 && gleich(s2.zw, ['WISC-V – 12.03.2026', 'WISC-V']), 'Nach dem Neuladen: beide Tests wieder da (der von Hand ohne Datum)');
  const alt = await page.evaluate(() => { DsAssistent.laden({ v: 2, geschlecht: 'm', bewertungen: { s_konz: 5 }, chips: {}, f: {}, frei: {}, tabellen: {}, bearbeitet: {} }); const d = getDSData(); const a = DsAssistent.fertig('de').abschnitte.find(x => x.id === 'eldib'); return { tests: Array.isArray(d.tests) && d.tests.length === 0, zw: a.bloecke.filter(b => b.typ === 'zwischen').length, konz: d.bewertungen.s_konz }; });
  H.ok(alt.tests && alt.zw === 0 && alt.konz === 5, 'Ältere DS-Daten ohne „tests“: leer, Bericht wie bisher');
  H.ok(blockiert.length === 0, 'keine Netzanfragen (' + blockiert.length + ')');
  H.ok(fehler.length === 0, 'keine Fehler im Generator ' + JSON.stringify(fehler));
  await browser.close();
  console.log('\n' + (H.fehler() ? H.fehler() + ' Prüfung(en) fehlgeschlagen' : 'Alle Prüfungen bestanden'));
})().catch(e => { console.error(e); process.exit(1); });
