// Gemeinsame Hilfen für die Tests des ELDiB-Generators (nur erfundene Kinder und Namen).
// Alles bleibt lokal: der Browser lädt die gebaute Datei über file://, alle anderen Anfragen
// werden abgewiesen und gezählt.
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const APP = path.join(__dirname, '..');
const HTML = path.join(APP, 'eldib-generator.html');
const MOTOR = path.join(APP, 'ds-motor.js');
const JSZip = require(path.join(APP, 'src/lib/jszip.min.js'));

function playwright() {
  const orte = [process.env.PLAYWRIGHT_PFAD, 'playwright', '/opt/node22/lib/node_modules/playwright'].filter(Boolean);
  for (const o of orte) { try { return require(o); } catch (e) { /* nächster Ort */ } }
  throw new Error('Playwright nicht gefunden (PLAYWRIGHT_PFAD setzen)');
}

// Generator im Browser öffnen (ohne Netz)
async function generatorStarten() {
  const { chromium } = playwright();
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ locale: 'de-DE', timezoneId: 'Europe/Luxembourg' });
  const blockiert = [], fehler = [];
  await ctx.route('**/*', r => {
    const u = r.request().url();
    if (u.startsWith('file:') || u.startsWith('data:') || u.startsWith('blob:')) { return r.continue(); }
    blockiert.push(u); return r.abort();
  });
  const page = await ctx.newPage();
  page.on('pageerror', e => fehler.push(e.message));
  page.on('dialog', d => d.accept());
  await page.goto('file://' + HTML);
  return { browser, page, blockiert, fehler };
}
// Erfundenen Schüler anlegen und seine 1. (oder 2.) Einschätzung öffnen
async function schuelerOeffnen(page, schueler, nr) {
  await page.evaluate(s => { localStorage.clear(); localStorage.setItem('eldib-schueler-liste', JSON.stringify([s])); }, schueler);
  await page.reload();
  await page.waitForSelector('#sm-schueler-grid .sm-card');
  await Promise.all([page.waitForNavigation(), page.click('.sm-einschaetzung-btn >> nth=' + ((nr || 1) - 1))]);
  await page.waitForSelector('#main-container', { state: 'visible' });
}

// ds-motor.js so laden wie der Hub (klassisches Skript)
function motorLaden(datei) {
  const code = fs.readFileSync(datei || MOTOR, 'utf8');
  const ctx = { console };
  vm.createContext(ctx);
  return vm.runInContext(code + '\n;({ DS_LESER, DsText, DS_TEXTE, DS_AUFBAU, DS_CHIPS, DS_BERICHT_TAFELN, DS_CHIP_LABELS, ELDIB_BANK })', ctx);
}

// Text eines Word-Dokuments wie ein einfacher Textauszug: ein Absatz je Zeile, Tabellenzeilen mit
// Tabulatoren zwischen den Zellen, Feldfunktionen (Inhaltsverzeichnis) ohne Code
function xmlText(s) { return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&'); }
function docxTextAusXml(xml) {
  const body = xml.slice(xml.indexOf('<w:body'));
  const re = /<w:tbl>|<\/w:tbl>|<w:tr[ >]|<\/w:tr>|<w:tc>|<\/w:tc>|<w:p[ >]|<w:p\/>|<\/w:p>|<w:t(?: [^>]*)?>([^<]*)<\/w:t>|<w:tab\/>|<w:br[^>]*\/>|<w:instrText[^>]*>[^<]*<\/w:instrText>/g;
  const zeilen = [], tabellen = [];
  let absatz = null, m;
  while ((m = re.exec(body))) {
    const tag = m[0];
    const tab = tabellen[tabellen.length - 1];
    if (tag === '<w:tbl>') { tabellen.push({ zeile: null, zelle: null }); }
    else if (tag === '</w:tbl>') { tabellen.pop(); }
    else if (/^<w:tr[ >]/.test(tag)) { if (tab) { tab.zeile = []; } }
    else if (tag === '</w:tr>') { if (tab && tab.zeile) { zeilen.push(tab.zeile.join('\t')); tab.zeile = null; } }
    else if (tag === '<w:tc>') { if (tab) { tab.zelle = []; } }
    else if (tag === '</w:tc>') { if (tab && tab.zelle && tab.zeile) { tab.zeile.push(tab.zelle.join(' ').trim()); tab.zelle = null; } }
    else if (/^<w:p[ >/]/.test(tag)) { absatz = ''; if (tag === '<w:p/>') { absatz = null; if (!tab || !tab.zelle) { zeilen.push(''); } } }
    else if (tag === '</w:p>') {
      if (absatz != null) { if (tab && tab.zelle) { if (absatz.trim()) { tab.zelle.push(absatz.trim()); } } else { zeilen.push(absatz); } }
      absatz = null;
    }
    else if (tag === '<w:tab/>') { if (absatz != null) { absatz += '\t'; } }
    else if (/^<w:br/.test(tag)) { if (absatz != null) { absatz += '\n'; } }
    else if (/^<w:instrText/.test(tag)) { /* Feldcode: nicht Teil des Textes */ }
    else if (m[1] != null && absatz != null) { absatz += xmlText(m[1]); }
  }
  return zeilen.join('\n').replace(/\n{3,}/g, '\n\n');
}
async function docxText(buffer) {
  const z = await JSZip.loadAsync(buffer);
  return docxTextAusXml(await z.file('word/document.xml').async('string'));
}

// ---------- Zufall mit Startwert ----------
function zufall(seed) {
  let s = seed >>> 0 || 1;
  const r = function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  r.ganz = (a, b) => a + Math.floor(r() * (b - a + 1));
  r.eins = l => l[Math.floor(r() * l.length)];
  r.einige = (l, max) => { const k = l.slice(), aus = [], n = r.ganz(0, Math.min(max, l.length)); while (aus.length < n) { aus.push(k.splice(Math.floor(r() * k.length), 1)[0]); } return aus; };
  r.ja = p => r() < p;
  r.datum = (j0, j1) => r.ganz(j0, j1) + '-' + String(r.ganz(1, 12)).padStart(2, '0') + '-' + String(r.ganz(1, 28)).padStart(2, '0');
  return r;
}

// ---------- Erfundene Daten ----------
const NAMEN = ['Beispiel, Noah', 'Muster, Lina', 'Probe, Elias', 'Fiktiv, Mia', 'Erfunden, Jonas', 'Exempel, Léa', 'Modèle, Hugo', 'Essai, Chloé', 'Muster, Anna-Lena', 'Specimen, Ben', 'Testfall, Emma', 'Vorlage, Luca'];
const FREI = {
  de: ['Die Großmutter wohnt in der Nähe und hilft bei den Wegen zur Schule.', 'Der Schulweg dauert etwa zwanzig Minuten.', 'Seit Ostern besucht das Kind einen Schwimmkurs.',
    'Die Familie ist im letzten Sommer in eine größere Wohnung gezogen.', 'Im Kunstunterricht malt das Kind gern mit Wasserfarben.', 'Der Stundenplan wurde im Januar angepasst.',
    'Zu Hause gibt es einen Hund, um den sich das Kind kümmert.', 'Die Lehrperson plant für den Frühling einen Ausflug in den Wald.', 'Das Gespräch fand im Besprechungsraum der Schule statt.',
    'Beim Vorlesen am Morgen hört das Kind still zu.', 'Die Pausenaufsicht wurde vorab informiert.', 'Im Musikunterricht spielt das Kind Trommel.'],
  fr: ['La grand-mère habite à proximité et accompagne l’enfant à l’école.', 'Le trajet vers l’école dure environ vingt minutes.', 'Depuis Pâques, l’enfant suit un cours de natation.',
    'La famille a emménagé l’été dernier dans un appartement plus grand.', 'En arts plastiques, l’enfant aime peindre à l’aquarelle.', 'L’horaire a été adapté en janvier.',
    'À la maison, il y a un chien dont l’enfant s’occupe.', 'L’enseignante prévoit une excursion en forêt au printemps.', 'L’entretien a eu lieu dans la salle de réunion de l’école.',
    'Lors de la lecture du matin, l’enfant écoute en silence.', 'La surveillance de la récréation a été informée au préalable.', 'En musique, l’enfant joue du tambour.'],
  en: ['The grandmother lives nearby and walks the child to school.', 'The way to school takes about twenty minutes.', 'Since Easter, the child has been attending a swimming course.']
};
const ZEILEN = {
  de: ['Gemeinsame Hausaufgabenzeit am Nachmittag', 'Wöchentlicher Austausch per Mitteilungsheft', 'Teilnahme an der Fußball-AG', 'Einen Ordner für die Arbeitsblätter führen', 'Pausenspiele mit einer Mitschülerin planen'],
  fr: ['Temps de devoirs commun l’après-midi', 'Échange hebdomadaire par le cahier de liaison', 'Participation à l’atelier de football', 'Tenir un classeur pour les fiches de travail', 'Organiser des jeux de récréation avec une camarade'],
  en: ['Shared homework time in the afternoon', 'Weekly exchange via the home-school notebook']
};
const KURZ = {
  personen: ['Frau Klee', 'Herr Stein', 'Madame Rocher', 'Monsieur Lac', 'Frau Birke'], berufe: { de: ['Bäckerin', 'Informatiker', 'Pflegehelferin', 'Busfahrer'], fr: ['boulangère', 'informaticien', 'aide-soignante', 'chauffeur de bus'], en: ['baker', 'nurse'] },
  schulen: ['École Fondamentale Beispielstadt', 'Grundschule Musterdorf', 'Lycée Exemple', 'École du Parc Fictif'], klassen: ['C2.1', 'C3.2', 'C4.1', 'C3.1', '5e'],
  details: { de: ['Frühgeburt in der 35. Woche', 'Kaiserschnitt', 'längere Beobachtung nach der Geburt'], fr: ['naissance prématurée à 35 semaines', 'césarienne'], en: ['caesarean section'] },
  diagDetails: { de: ['2024, Kinderärztin', 'seit 2023', 'Zentrum für Diagnostik, 2025'], fr: ['2024, pédiatre', 'depuis 2023'], en: ['2024, paediatrician'] },
  andere: { diagnose: { de: 'eine Tic-Störung', fr: 'un trouble des tics', en: 'a tic disorder' }, sprache: { de: 'Arabisch', fr: 'arabe', en: 'Arabic' }, verfahren: { de: 'ein Zeichentest', fr: 'un test de dessin', en: 'a drawing test' },
    auftraggeber: { de: 'die Gemeinde Beispielstadt', fr: 'la commune de Beispielstadt', en: 'the municipality of Beispielstadt' }, anlass: { de: 'häufigen Fehlzeiten', fr: 'des absences fréquentes', en: 'frequent absences' } }
};
// Ein erfundener DS-Datensatz (Form wie DsAssistent.get()) mit Stammdaten und ELDiB-Auswahl
function zufallsDs(M, seed, lang) {
  const r = zufall(seed), T = M.DS_TEXTE[lang], O = T.optionen;
  const ds = { v: 2, geschlecht: r.eins(['m', 'w', '']), bewertungen: {}, chips: {}, f: {}, frei: {}, tabellen: { vorgeschichte: [], aktuell: [], interventionen: [] }, bearbeitet: {} };
  Object.keys(M.DS_AUFBAU).forEach(b => M.DS_AUFBAU[b].themen.forEach(th => th.aussagen.forEach(a => { if (r.ja(0.72)) { ds.bewertungen[a[0]] = r.ganz(1, 7); } })));
  Object.keys(M.DS_CHIPS).forEach(g => { if (r.ja(0.75)) { const k = r.einige(M.DS_CHIPS[g], 3); if (k.length) { ds.chips[g] = k; } } });
  const f = ds.f, frei = ds.frei, satz = () => r.eins(FREI[lang]);
  const text = () => { const n = r.ganz(1, 2), l = []; while (l.length < n) { const s = satz(); if (l.indexOf(s) < 0) { l.push(s); } } return l.join(r.ja(0.5) ? '\n\n' : ' '); };
  if (r.ja(0.9)) { f.auftrag_datum = r.datum(2025, 2026); }
  if (r.ja(0.8)) { f.auftraggeber = r.eins(Object.keys(O.auftraggeber).concat(['andere'])); if (f.auftraggeber === 'andere') { frei.auftraggeber_andere = KURZ.andere.auftraggeber[lang]; } }
  if ((ds.chips.anlass || []).length && r.ja(0.4)) { frei.anlass_andere = KURZ.andere.anlass[lang]; }
  if (r.ja(0.5)) { frei.anlass_details = text(); }
  ['schwangerschaft', 'geburt'].forEach(k => { if (r.ja(0.7)) { f[k] = r.eins(['unauffaellig', 'komplikationen', 'unbekannt']); if (f[k] === 'komplikationen' && r.ja(0.6)) { frei[k + '_details'] = r.eins(KURZ.details[lang]); } } });
  ['motorik', 'sprache'].forEach(k => { if (r.ja(0.7)) { f[k] = r.eins(['altersgerecht', 'verzoegert', 'unbekannt']); if (f[k] === 'verzoegert' && r.ja(0.4)) { frei[k + '_details'] = r.eins(KURZ.details[lang]); } } });
  if (r.ja(0.4)) { f.erste_worte = String(r.ganz(9, 30)); }
  if ((ds.chips.diagnosen || []).length) {
    if (r.ja(0.5)) { const k = ds.chips.diagnosen.filter(x => x !== 'andere')[0]; if (k) { f.diagnosen_details = { [k]: r.eins(KURZ.diagDetails[lang]) }; } }
    if (ds.chips.diagnosen.indexOf('andere') >= 0) { frei.diagnose_andere = KURZ.andere.diagnose[lang]; }
  } else if (r.ja(0.4)) { f.keine_diagnosen = true; }
  if (r.ja(0.4)) { frei.vorgeschichte = text(); }
  if (r.ja(0.8)) { f.familienstand = r.eins(Object.keys(O.familienstand)); }
  if (r.ja(0.8)) { f.lebt_bei = r.eins(Object.keys(O.lebt_bei)); }
  if (r.ja(0.6)) { f.kontakt = r.eins(Object.keys(O.kontakt)); }
  if (r.ja(0.3)) { frei.kontakt_details = lang === 'fr' ? 'Le père voit l’enfant un week-end sur deux.' : (lang === 'en' ? 'The father sees the child every other weekend.' : 'Der Vater sieht das Kind jedes zweite Wochenende.'); }
  if (r.ja(0.8)) { f.geschwister_anzahl = String(r.ganz(0, 4)); if (+f.geschwister_anzahl > 0 && r.ja(0.7)) { f.geschwister_position = r.eins(Object.keys(O.position)); } }
  if ((ds.chips.sprachen || []).indexOf('andere') >= 0) { frei.sprache_andere = KURZ.andere.sprache[lang]; }
  ['mutter', 'vater'].forEach(w => { if (r.ja(0.6)) { f['zeit_' + w] = r.eins(['vollzeit', 'teilzeit', 'nicht']); } if (r.ja(0.5) && f['zeit_' + w] !== 'nicht') { frei['beruf_' + w] = r.eins(KURZ.berufe[lang]); } });
  if ((ds.chips.ereignisse || []).length && r.ja(0.5)) { f.ereignis_details = { [ds.chips.ereignisse[0]]: String(r.ganz(2019, 2025)) }; }
  if (r.ja(0.3)) { frei.freizeit = lang === 'fr' ? 'Pendant son temps libre, l’enfant joue au football dans un club.' : (lang === 'en' ? 'In their free time, the child plays football in a club.' : 'In der Freizeit spielt das Kind Fußball im Verein.'); }
  if (r.ja(0.4)) { frei.familie = text(); }
  if (r.ja(0.6)) { f.klasse = r.eins(KURZ.klassen); }
  if (r.ja(0.6)) { f.schule_name = r.eins(KURZ.schulen); }
  if (r.ja(0.5)) { frei.lehrperson = r.eins(KURZ.personen); }
  if (r.ja(0.4)) { frei.eseb_referenz = r.eins(KURZ.personen); }
  if (r.ja(0.3)) { frei.aktuell = text(); }
  if (r.ja(0.7)) { f.schule_quelle = r.eins(Object.keys(T.quellen.schule)); }
  if (r.ja(0.7)) { f.eltern_quelle = r.eins(Object.keys(T.quellen.eltern)); }
  ['schule_datum', 'kind_datum', 'eltern_datum'].forEach(k => { if (r.ja(0.7)) { f[k] = r.datum(2025, 2026); } });
  if (r.ja(0.4)) { frei.vertrauensperson = r.eins(KURZ.personen); }
  ['schule', 'kind', 'eltern', 'beobachtung', 'deutung', 'abwehr', 'beduerfnisse', 'cni_begruendung'].forEach(k => { if (r.ja(0.35)) { frei[k] = text(); } });
  if ((ds.chips.verfahren || []).indexOf('andere') >= 0 || r.ja(0.2)) { frei.verfahren_andere = KURZ.andere.verfahren[lang]; }
  if (r.ja(0.3)) { frei.verfahren_ort = r.eins(KURZ.schulen); }
  if (r.ja(0.7)) { f.beobachtungen = []; const n = r.ganz(1, 2); for (let i = 0; i < n; i++) { const b = {}; if (r.ja(0.9)) { b.datum = r.datum(2025, 2026); } if (r.ja(0.8)) { b.setting = r.eins(Object.keys(O.setting)); } if (r.ja(0.7)) { b.dauer = String(r.eins([20, 30, 45, 50, 90])); } f.beobachtungen.push(b); } }
  if (r.ja(0.7)) { f.abgestimmt = r.eins(['ja', 'vorbehalte', 'nein']); if (f.abgestimmt === 'vorbehalte' && r.ja(0.6)) { frei.vorbehalte = text(); } }
  if (r.ja(0.5)) { f.ziele_bis = r.datum(2026, 2027); }
  if (r.ja(0.4)) { frei.ziele_zusatz = r.einige(ZEILEN[lang], 2).join('\n'); }
  ['familie', 'schule', 'region'].forEach(k => { if (r.ja(0.3)) { frei['empfehlung_' + k] = r.einige(ZEILEN[lang], 2).join('\n'); } });
  ['verhalten', 'kommunikation', 'sozialisation', 'kognition'].forEach(b => { if (r.ja(0.2)) { frei['eldib_' + b] = satz(); } });
  if (r.ja(0.8)) { f.verfasser_name = r.eins(['Lea Beispiel', 'Tom Muster', 'Sara Probe']); }
  if (r.ja(0.7)) { f.verfasser_funktion = r.eins(['Psychologin', 'Sozialpädagoge', 'Éducatrice graduée']); }
  if (r.ja(0.8)) { f.bericht_datum = r.datum(2026, 2026); }
  const zeile = () => ({ zeitraum: r.eins(['2022–2023', 'seit 09/2025', '2024']), klasse: r.eins(KURZ.klassen), massnahme: r.eins(['Logopädie', 'I-EBS', 'Ergothérapie', 'Nachhilfe']), akteur: r.eins(['CPI', 'ESEB', 'SCAS', 'Maison Relais']) });
  if (r.ja(0.5)) { ds.tabellen.vorgeschichte = [zeile()].concat(r.ja(0.4) ? [zeile()] : []); }
  if (r.ja(0.5)) { ds.tabellen.aktuell = [zeile()]; }
  if (r.ja(0.6)) { const n = r.ganz(1, 3); for (let i = 0; i < n; i++) { ds.tabellen.interventionen.push({ datum: r.datum(2025, 2026), art: r.eins(['klassenbeobachtung', 'kontakt_eltern', 'kontakt_schule', 'kontakt_extern', 'kontakt_schueler']) }); } }
  // Stammdaten und ELDiB-Auswahl (für 4.2, 5.2 und den Kopf des Berichts)
  const stamm = { schueler_name: r.eins(NAMEN), geburtsdatum: r.datum(2010, 2019), klasse: r.eins(KURZ.klassen), foerderort: r.eins(KURZ.schulen), einschaetzungsdatum: r.datum(2025, 2026) };
  const selections = {};
  ['V', 'K', 'SOZ', 'KOG'].forEach(p => { const n = r.ganz(0, 8); for (let i = 1; i <= n; i++) { selections[p + '-' + i] = { status: 'erreicht' }; } if (r.ja(0.6)) { selections[p + '-' + (n + 1)] = { status: 'ziel', zielIndex: 0, zieltext: '' }; } });
  return { ds, stamm, selections };
}

// ---------- OCR-Rauschen: Umlautpunkte weg, "rn" -> "m", Silbentrennung, Zeilenumbrüche, Seitenköpfe ----------
function rauschen(text, seed, opt) {
  const r = zufall(seed), o = Object.assign({ umlaut: 0.5, rn: 0.5, trennung: 0.12, breite: 78, seiten: true }, opt || {});
  let t = text.replace(/[äöüÄÖÜ]/g, c => r.ja(o.umlaut) ? ({ ä: 'a', ö: 'o', ü: 'u', Ä: 'A', Ö: 'O', Ü: 'U' })[c] : c).replace(/ß/g, c => r.ja(o.umlaut) ? 'ss' : c);
  t = t.replace(/rn/g, m => r.ja(o.rn) ? 'm' : m);
  const zeilen = [];
  t.split('\n').forEach(z => {
    if (z.length <= o.breite || /\t/.test(z)) { zeilen.push(z); return; }
    let akt = '';
    z.split(' ').forEach(w => {
      if ((akt + ' ' + w).length > o.breite && akt) {
        // Silbentrennung am Zeilenende
        if (w.length > 8 && /^[a-zäöüß]+$/i.test(w) && r.ja(o.trennung)) { const k = r.ganz(3, w.length - 3); zeilen.push(akt + ' ' + w.slice(0, k) + '-'); akt = w.slice(k); return; }
        zeilen.push(akt); akt = w; return;
      }
      akt = akt ? akt + ' ' + w : w;
    });
    if (akt) { zeilen.push(akt); }
  });
  if (!o.seiten) { return zeilen.join('\n'); }
  // Seitenköpfe und -füße wie im PDF (alle 45 Zeilen)
  const aus = [], seiten = Math.ceil(zeilen.length / 45);
  zeilen.forEach((z, i) => {
    if (i % 45 === 0 && i) { aus.push('31, rue du Parc   Tel.: 247 65117   www.cc-cdse.lu'); aus.push('L-5374 Munsbach   E-Mail: info@cc-cdse.lu   Seite ' + (i / 45) + ' von ' + seiten); aus.push('\f'); aus.push('MUSTERKIND Vorname'); aus.push('1234567890123'); }
    aus.push(z);
  });
  return aus.join('\n');
}

let fehlerZahl = 0;
function ok(bed, text) { console.log((bed ? 'OK   ' : 'FEHL ') + text); if (!bed) { fehlerZahl++; process.exitCode = 1; } return bed; }
function fehler() { return fehlerZahl; }

module.exports = { APP, HTML, MOTOR, JSZip, playwright, generatorStarten, schuelerOeffnen, motorLaden, docxText, docxTextAusXml, zufall, zufallsDs, rauschen, ok, fehler, FREI, NAMEN };
