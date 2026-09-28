// =====================================================================
// DS-Leser: liest einen fertigen DS-Bericht (Word, PDF oder OCR-Text) zurück
// in den DS-Assistenten – Bewertungen 1–7, Auswahlfelder, Fakten, Freitexte
// und Tabellen. Genutzt vom CDSE Hub (apps/ds-motor.js) und vom Generator.
// ---------------------------------------------------------------------
// DS_LESER.lesen(text, opt)
//   opt = { sprache: 'de'|'fr'|'en', name, vorname, geschlecht: 'm'|'w',
//           abschnitte: { id: 'Text' } (schon getrennt), tabellen: { vorgeschichte, aktuell, interventionen } }
//   -> { sprache, herkunft: 'generator'|'frei'|'gemischt', name, geschlecht,
//        bewertungen: { id: { wert, sicher, beleg, abschnitt, band, art } },
//        chips: { gruppe: [{ key, beleg, sicher }] }, f: { feld: { wert, beleg, sicher } },
//        frei: { feld: 'Text' }, tabellen: { vorgeschichte, aktuell, interventionen },
//        abschnitte: { id: { titel, text } }, unbekannt: ['Satz', …] }
// DS_LESER.anwenden(dsData, ergebnis, auswahl) -> neues dsData (v2); nicht übernommene
//   bestehende Werte bleiben erhalten (siehe unten).
// ---------------------------------------------------------------------
// So wird gelesen
// 1. Text säubern: Silbentrennung, Zeilenumbrüche, Kopf-/Fußzeilen (PDF), Feldfunktionen.
// 2. Abschnitte an den Überschriften erkennen (DE/FR/EN, mit oder ohne Nummer, OCR-tolerant).
//    Das Inhaltsverzeichnis (Seitenzahlen) zählt nicht, die grauen Anleitungen „(…)“ der
//    Vorlage werden übersprungen.
// 3. Jeden Satz mit den Satzvorlagen des Text-Motors vergleichen (46-ds-text.js rückwärts):
//    fünf Formulierungen je Aussage, Rahmensätze mit Aufzählungen (Auswahlfelder, „Hinweise
//    auf … ergeben sich nicht“), Faktensätze (43b/44b/45b). Name, Pronomen, „jedoch“ bzw.
//    „Toutefois, …“, Eltern-/Schulquelle und Datum sind Platzhalter.
// 4. Was keiner Vorlage entspricht, kommt in den Freitext des Abschnitts und liefert höchstens
//    Vorschläge mit sicher < 0.7 (art 'frei'): Stichwörter je Aussage (FREI_STICH, DE/FR/EN) im
//    Abschnitt, das Band aus Häufigkeits-/Stärkewörtern und Verneinung im selben Satzteil
//    (STUFENWORTE; ohne solches Wort 5); sonst Ähnlichkeit mit dem Wortschatz der Vorlagen
//    (über der Schwelle SCHWELLE_FREI). Eigene Glieder in einer Aufzählung der Vorlage („braucht
//    vor allem klare Strukturen“) bekommen das Band des Rahmensatzes (sicher 0.6).
// Vergleichsform („Skelett“): Kleinbuchstaben ohne Akzente, Umlaut = Grundvokal (OCR verliert
// die Punkte, „ae“ = „ä“), „rn“ = „m“ (OCR), Satzzeichen weg, französische Elision einheitlich.
// ---------------------------------------------------------------------
// Bewertung -> Satz (46-ds-text.js) und zurück
//   Aussagen mit fünf Formulierungen t[0..4] (dsStufe): 1–2 -> t[0], 3 -> t[1], 4 -> t[2],
//     5 -> t[3], 6–7 -> t[4]. Schwierigkeiten (pol −1) mit 1–2: kein eigener Satz, sondern die
//     Aufzählung „Hinweise auf … ergeben sich … nicht“ (np).
//   4.3 Situationen mit Kurzform (m): ≥ 6 „vor allem …“, 5 „Häufig …“, 4 t[2], ≤ 3 nichts;
//     Situationen ohne Kurzform: t[2..4] bei 4, 5, ≥ 6, darunter nichts.
//   4.3 Ängste/Abwehr (Skala „deutlich“): ≥ 5 deutlich, 4 teilweise, ≤ 3 nicht erwähnt.
//   4.3 Erklärungen (Skala „wahrscheinlich“): ≥ 6 „am ehesten“, 4–5 „könnte/kommen in Betracht“;
//     Trauma: ab 4 ein eigener Satz.
//   5.1 Bedürfnisse (Skala „wichtig“): ≥ 6 „braucht vor allem“, 4–5 „profitiert von“.
// Mehrere Bewertungen ergeben denselben Satz (1–2, 6–7, 4–5, 5–7, 4–7). Zurückgegeben wird der
// Wert des Bandes, der der Skalenmitte 4 am nächsten liegt (nie mehr behaupten, als der Text
// sagt): 1–2 -> 2, 6–7 -> 6, 4–5 -> 4, 5–7 -> 5, 4–7 -> 4. `band` nennt alle Werte, die
// denselben Satz ergeben. Verrät die Reihenfolge der Sätze mehr (der Text-Motor ordnet sie nach
// Stärke, z. B. 7 vor 6), wird der Wert innerhalb des Bandes angepasst (`reihenfolge: true`).
// =====================================================================
const DS_LESER = (function () {
'use strict';

const VERSION = 1;
const SPRACHEN = ['de', 'fr', 'en'];
const STUFE_BAND = [[1, 2], [3], [4], [5], [6, 7]];
const BEREICH_ABSCHNITT = { schule: 'schule', kind: 'kind', eltern: 'eltern', beobachtung: 'beobachtung', deutung: 'deutung', beduerfnisse: 'beduerfnisse' };
const INTERVENTIONEN = ['klassenbeobachtung', 'kontakt_eltern', 'kontakt_schule', 'kontakt_extern', 'kontakt_schueler'];
// Freitextfeld je Abschnitt (DS_SCHRITTE: das lange Freitextfeld des Schritts)
const FREI_FELD = { auftrag: 'anlass_details', vorgeschichte: 'vorgeschichte', sozialbericht: 'familie', aktuell: 'aktuell', massnahmen: 'aktuell',
  schule: 'schule', kind: 'kind', eltern: 'eltern', verfahren: 'beobachtung', beobachtung: 'beobachtung', deutung: 'deutung', schluss: 'vorbehalte',
  beduerfnisse: 'beduerfnisse', ziele: 'ziele_zusatz', empfehlungen: 'empfehlung_schule', cni: 'cni_begruendung' };

// Wert eines Bandes, der der Skalenmitte am nächsten liegt
function vertreter(band) { return band.slice().sort(function (a, b) { return (Math.abs(a - 4) - Math.abs(b - 4)) || (a - b); })[0]; }

// ---------- Tafeln (Gliederung, Überschriften, Tabellen; aus 47-ds-assistent.js) ----------
let tafelnCache = null;
function tafeln() {
  if (typeof DS_BERICHT_TAFELN !== 'undefined' && DS_BERICHT_TAFELN) { return DS_BERICHT_TAFELN; }
  if (tafelnCache) { return tafelnCache; }
  if (typeof DS_TITEL === 'undefined' || typeof DS_UI === 'undefined') { throw new Error('DS-Leser: Gliederung des DS fehlt (DS_BERICHT_TAFELN)'); }
  const ui = {};
  Object.keys(DS_UI).forEach(function (l) { const u = DS_UI[l]; ui[l] = { l: u.l, tab: u.tab, opt: u.opt, skala: u.skala, wirkung: u.wirkung, tabelleMarke: u.tabelleMarke }; });
  tafelnCache = { gliederung: DS_GLIEDERUNG, titel: DS_TITEL, tabellen: DS_TABELLEN, skalaThema: DS_SKALA_THEMA, schritte: DS_SCHRITTE,
    deckblatt: DS_DECKBLATT, richtziel: DS_RICHTZIEL, stufenAlter: DS_STUFEN_ALTER, ui: ui };
  return tafelnCache;
}

// ---------- Text säubern ----------
const LIGATUR = { '\uFB00': 'ff', '\uFB01': 'fi', '\uFB02': 'fl', '\uFB03': 'ffi', '\uFB04': 'ffl', '\uFB05': 'st', '\uFB06': 'st' };
// Bindewörter nach einem Trennstrich ("Bauch- oder Kopfschmerzen") – je Sprache, sonst wird "Entwicklungsst-and" zu "st- and"
const BINDEWORT_SPRACHE = { de: /^(und|oder|bzw|sowie)$/i, fr: /^(et|ou)$/i, en: /^(and|or|as)$/i };
const BINDEWORT_ALLE = /^(und|oder|bzw|sowie|et|ou|or|and|as)$/i;
function saeubern(text, lang) {
  const BINDEWORT = BINDEWORT_SPRACHE[lang] || BINDEWORT_ALLE;
  let s = String(text == null ? '' : text).replace(/\r\n?/g, '\n').replace(/[\f\v\u2028\u2029\u0085]/g, '');
  s = s.replace(/[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g, ' ').replace(/[\u200B-\u200D\u2060\uFEFF\u00AD]/g, '')
    .replace(/[\uFB00-\uFB06]/g, function (c) { return LIGATUR[c]; });
  // Feldfunktionen, wenn der Text roh aus document.xml kommt (Inhaltsverzeichnis)
  s = s.replace(/[ \t]*TOC \\o "[^"]*"(?: \\[a-z])*/g, '').replace(/[ \t]*PAGEREF _Toc\d+(?: \\[a-z])*/g, '').replace(/[ \t]*HYPERLINK \\l "_Toc\d+"/g, '');
  // Silbentrennung am Zeilenende: "Unter-\nstützung" -> "Unterstützung", "Bauch-\noder" -> "Bauch- oder",
  // "ELDiB-\nProfil" -> "ELDiB-Profil"
  s = s.replace(/([A-Za-zÀ-ÖØ-öø-ÿß])[-\u2010\u2011\u00AC][ \t]*\n(?:[ \t]*\n){0,3}[ \t]*(?=([A-Za-zÀ-ÖØ-öø-ÿß]+))/g, function (m, a, weiter) {
    if (BINDEWORT.test(weiter)) { return a + '- '; }
    return /^[A-ZÀ-ÖØ-Þ]/.test(weiter) ? a + '-' : a;
  });
  // getrennte Wörter in einer Zeile (OCR): "Unter- stützung"
  s = s.replace(/([a-zà-öø-ÿß])[-\u2010\u2011\u00AC] (?=([a-zà-öø-ÿß]+))/g, function (m, a, weiter) { return BINDEWORT.test(weiter) ? m : a; });
  return s.split('\n').map(function (z) { return z.replace(/[ \t]+$/, ''); }).join('\n');
}

// ---------- Skelett (Vergleichsform) ----------
const BASIS_SONDER = { 'ß': 'ss', 'ẞ': 'ss', 'æ': 'ae', 'Æ': 'ae', 'œ': 'oe', 'Œ': 'oe', 'ø': 'o', 'Ø': 'o', 'ł': 'l', 'Ł': 'l', 'đ': 'd', 'ı': 'i' };
const basisCache = {};
function basis(ch) {
  let b = basisCache[ch];
  if (b !== undefined) { return b; }
  if (BASIS_SONDER[ch]) { b = BASIS_SONDER[ch]; }
  else {
    b = (ch.normalize ? ch.normalize('NFD') : ch).replace(/[\u0300-\u036f]/g, '').toLowerCase();
    if (!/^[a-z0-9]+$/.test(b)) { b = ''; }
  }
  basisCache[ch] = b;
  return b;
}
const ELISION_FR = { de: 'd', que: 'qu', ne: 'n', se: 's', le: 'l', la: 'l', je: 'j', me: 'm', te: 't', lorsque: 'lorsqu', puisque: 'puisqu', jusque: 'jusqu' };
function kanon(w, lang) {
  w = w.replace(/rn/g, 'm');                                   // OCR verwechselt „rn“ und „m“
  if (lang === 'de') { w = w.replace(/([aou])e/g, '$1'); }     // „ae“ = „ä“ = „a“ (Umlautpunkte fehlen)
  else if (lang === 'fr' && ELISION_FR[w]) { w = ELISION_FR[w]; }
  return w;
}
// Wörter mit Position im Ausgangstext
function woerter(s, lang) {
  const t = [];
  let w = '', von = 0;
  for (let i = 0; i < s.length; i++) {
    const b = basis(s.charAt(i));
    if (b) { if (!w) { von = i; } w += b; }
    else if (w) { t.push({ w: kanon(w, lang), von: von, bis: i }); w = ''; }
  }
  if (w) { t.push({ w: kanon(w, lang), von: von, bis: s.length }); }
  return t;
}
// Skelett eines Textes: k = " wort wort …" (jedes Wort mit Leerzeichen davor), start[i] = Lage von Wort i in k
function skelett(s, lang) {
  const toks = woerter(s, lang), start = [];
  let k = '';
  toks.forEach(function (t) { k += ' '; start.push(k.length); k += t.w; });
  return { s: s, toks: toks, k: k, start: start };
}
function skText(s, lang) { return skelett(s, lang).k; }
// Bereich [a, b) in sk.k -> Wörter i..j -> Bereich im Ausgangstext
function wortBereich(sk, a, b) {
  let i = 0;
  while (i < sk.start.length && sk.start[i] < a) { i++; }
  let j = i;
  while (j + 1 < sk.start.length && sk.start[j + 1] < b) { j++; }
  if (i >= sk.toks.length || sk.start[i] >= b) { return null; }
  return { i: i, j: j, von: sk.toks[i].von, bis: sk.toks[j].bis };
}
function ausschnitt(sk, a, b) {
  const r = wortBereich(sk, a, b);
  if (!r) { return ''; }
  let t = sk.s.slice(r.von, r.bis), bis = r.bis;
  // schließende Klammer/Anführungszeichen direkt dahinter gehören dazu, wenn sie innen geöffnet wurden
  while (bis < sk.s.length && /[)\]”“»"'’]/.test(sk.s.charAt(bis))) {
    const zu = sk.s.charAt(bis), auf = { ')': '(', ']': '[', '”': '„', '“': '„', '»': '«' }[zu];
    if (auf && t.split(auf).length <= t.split(zu).length) { break; }
    t += zu; bis++;
  }
  return t;
}

// ---------- Datum ----------
const MONATE = {
  januar: 1, janner: 1, jan: 1, februar: 2, feb: 2, marz: 3, maerz: 3, april: 4, apr: 4, mai: 5, juni: 6, juli: 7, august: 8, aug: 8, september: 9, sept: 9, sep: 9, oktober: 10, okt: 10, november: 11, nov: 11, dezember: 12, dez: 12,
  janvier: 1, fevrier: 2, mars: 3, avril: 4, juin: 6, juillet: 7, aout: 8, septembre: 9, octobre: 10, novembre: 11, decembre: 12,
  january: 1, february: 2, march: 3, may: 5, june: 6, july: 7, october: 10, december: 12
};
// im Skelett: „maerz“ wird zu „marz“, „rn“ zu „m“ – die Monatsnamen selbst sind davon nicht betroffen
const MONAT_RE = Object.keys(MONATE).map(function (m) { return kanon(m, 'de'); }).filter(function (m, i, a) { return a.indexOf(m) === i; }).sort(function (a, b) { return b.length - a.length; }).join('|');
const DATUM_RE = '(\\d{1,2} \\d{1,2} \\d{2,4}|\\d{4} \\d{1,2} \\d{1,2}|\\d{1,2}(?: er)? (?:' + MONAT_RE + ') \\d{4}|(?:' + MONAT_RE + ') \\d{1,2} \\d{4})';
function monatNr(w) {
  if (MONATE[w]) { return MONATE[w]; }
  for (const m of Object.keys(MONATE)) { if (kanon(m, 'de') === w || kanon(m, 'fr') === w) { return MONATE[m]; } }
  return 0;
}
// Datum aus Skelett-Wörtern ("12 03 2025", "12 marz 2025", "march 12 2025") -> "2025-03-12"
function isoAusSkelett(s) {
  const w = String(s || '').trim().split(' ').filter(function (x) { return x && x !== 'er'; });
  let d, m, y;
  if (w.length < 3) { return ''; }
  if (/^\d{4}$/.test(w[0])) { y = +w[0]; m = +w[1]; d = +w[2]; }
  else if (/^\d+$/.test(w[0]) && /^\d+$/.test(w[1])) { d = +w[0]; m = +w[1]; y = +w[2]; }
  else if (/^\d+$/.test(w[0])) { d = +w[0]; m = monatNr(w[1]); y = +w[2]; }
  else { m = monatNr(w[0]); d = +w[1]; y = +w[2]; }
  if (y < 100) { y += 2000; }
  if (!(d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= 2100)) { return ''; }
  return y + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d;
}
const DATUM_IM_TEXT = new RegExp(' ' + DATUM_RE + '(?= |$)', 'g');
// alle Datumsangaben in einem freien Text -> ["2025-03-12", …]
function datenImText(s, lang) {
  const k = skText(s, lang || 'de') + ' ', aus = [];
  let m;
  DATUM_IM_TEXT.lastIndex = 0;
  while ((m = DATUM_IM_TEXT.exec(k))) { const iso = isoAusSkelett(m[1]); if (iso) { aus.push(iso); } }
  return aus;
}

// ---------- Vorlagen -> Regex über dem Skelett ----------
// Jedes Element beginnt mit einem Leerzeichen; die ganze Vorlage passt auf " " + Skelett.
function schliesst(s, i, zu) {
  let tiefe = 0;
  for (let j = i; j < s.length; j++) {
    if (tiefe === 0 && s.startsWith(zu, j)) { return j; }
    const ch = s.charAt(j);
    if (ch === '{' || ch === '[') { tiefe++; } else if (ch === '}' || ch === ']') { tiefe--; }
  }
  return -1;
}
function teileBei(s, trenner) {
  const teile = [];
  let tiefe = 0, von = 0;
  for (let j = 0; j < s.length; j++) {
    const ch = s.charAt(j);
    if (ch === '{' || ch === '[') { tiefe++; } else if (ch === '}' || ch === ']') { tiefe--; }
    else if (ch === trenner && tiefe === 0) { teile.push(s.slice(von, j)); von = j + 1; }
  }
  teile.push(s.slice(von));
  return teile;
}
const PERSON_FALL = { N: 'N', Nd: 'D', Na: 'A', Nt: 'T', Name: 'name', Vollname: 'voll' };
const PRONOMEN_KEYS = { de: ['er', 'ihm', 'ihn', 'T', 'sein', 'seine', 'seinen', 'seinem', 'seiner', 'seines'], fr: ['il', 'lui', 'le', 'T'], en: ['he', 'him', 'his', 'himself', 'T'] };
const sprachCache = {};

// Pronomen (alle Geschlechter) aus dem Text-Motor: { key: [{ t, g }] }
function pronomen(lang) {
  const aus = {};
  ['m', 'w', 'n'].forEach(function (g) {
    const c = DsText.kontext(lang, { geschlecht: g === 'n' ? '' : g }, { schueler_name: 'Xq' });
    (PRONOMEN_KEYS[lang] || []).forEach(function (key) {
      c.seit = 1;
      const v = DsText.fuelle('{' + key + '}', c);
      if (v && v.indexOf('{') < 0 && v !== 'Xq') { (aus[key] = aus[key] || []).push({ t: v, g: g }); }
    });
  });
  return aus;
}
function altRegex(liste) {
  const sks = liste.map(function (x) { return x.sk; }).filter(function (x, i, a) { return x && a.indexOf(x) === i; }).sort(function (a, b) { return b.length - a.length; });
  return '(' + sks.join('|') + ')';
}

// kompiliere(vorlage, lang, extra) -> { src, gruppen, literal }
//   extra.slots: { name: ['Alternative', …] | 'zahl' | 'text' }  (sonst nach Platzhaltername)
function kompiliere(tpl, lang, extra) {
  const L = sprachDaten(lang, true);
  extra = extra || {};
  const gruppen = [];
  let literal = 0;
  function sequenz(s) {
    let out = '', text = '';
    const flush = function () {
      if (text) { woerter(text, lang).forEach(function (t) { out += ' ' + t.w; literal++; }); text = ''; }
    };
    let i = 0;
    while (i < s.length) {
      if (s.startsWith('[[', i)) {
        const e = schliesst(s, i + 2, ']]'); flush();
        const t = teileBei(s.slice(i + 2, e), '|');
        out += alternativen(t.length === 2 ? [t[0], t[1], t[0] + '/' + t[1]] : t, 'geschlecht');
        i = e + 2; continue;
      }
      if (s.startsWith('{{', i)) {
        const e = schliesst(s, i + 2, '}}'); flush();
        out += alternativen(teileBei(s.slice(i + 2, e), '|'), 'alt');
        i = e + 2; continue;
      }
      if (s.charAt(i) === '{') {
        const e = schliesst(s, i + 1, '}'); flush();
        out += platz(s.slice(i + 1, e));
        i = e + 1; continue;
      }
      text += s.charAt(i); i++;
    }
    flush();
    return out;
  }
  function alternativen(teile, typ) {
    // typ 'geschlecht' ([[m|w]], dazu die Form ohne Angabe "m/w") oder 'alt' ({{einzahl|mehrzahl}})
    const g = { typ: typ, alts: teile.map(function (t) { return skText(t.replace(/\{[^}]*\}/g, ' '), lang).trim(); }) };
    gruppen.push(g);
    const lit0 = literal;
    const src = '(' + teile.map(sequenz).join('|') + ')';
    literal = lit0 + 1;
    return src;
  }
  function platz(innen) {
    const bed = /^(\w+):([\s\S]*)$/.exec(innen);
    if (bed) {
      // Bedingung {feld: …}: unter "?feld" (das Feld selbst steht meist innen)
      gruppen.push({ typ: 'bedingung', key: '?' + bed[1] });
      const lit0 = literal;
      const src = '(' + sequenz(bed[2]) + ')?';
      literal = lit0;
      return src;
    }
    const key = innen.replace(/^\^/, '');
    const def = extra.slots && extra.slots[key];
    if (Array.isArray(def)) {
      gruppen.push({ typ: 'wahl', key: key, alts: def.map(function (a) { return skText(a, lang).trim(); }) });
      return ' ' + altRegex(def.map(function (a) { return { sk: skText(a, lang).trim() }; }));
    }
    if (def && def.vor) {
      // Text mit einem der Vorwörter davor ("à l'école …", "au …"): beides wird gefangen
      gruppen.push({ typ: 'text', key: key });
      return ' ((?:' + def.vor.map(function (a) { return skText(a, lang).trim(); }).sort(function (a, b) { return b.length - a.length; }).join('|') + ') [^ ]+(?: [^ ]+)*?)';
    }
    if (def === 'nummer') { gruppen.push({ typ: 'nummer', key: key }); return ' (\\d{1,3})'; }
    if (def === 'text') { gruppen.push({ typ: 'text', key: key }); return ' ([^ ]+(?: [^ ]+)*?)'; }
    if (key === 'KONTRAST') { return lang === 'de' ? '(?: jedoch)?' : ''; }
    if (key === 'datum') { gruppen.push({ typ: 'datum', key: key }); return ' ' + DATUM_RE; }
    if (PERSON_FALL[key]) {
      gruppen.push({ typ: 'person', key: key, fall: PERSON_FALL[key] });
      return key === 'Vollname' ? ' ([^ ]+(?: [^ ]+){0,3}?)' : ' ([^ ]+(?: [^ ]+){0,2}?)';
    }
    if (L.pron[key]) { gruppen.push({ typ: 'pron', key: key }); return ' ' + altRegex(L.pron[key].map(function (x) { return { sk: skText(x.t, lang).trim() }; })); }
    if (/^(Q|Qd|Qg|QS|QSd)$/.test(key)) {
      const art = key.charAt(1) === 'S' ? 'schule' : 'eltern', fall = key === 'Q' || key === 'QS' ? 'n' : (key.slice(-1) === 'g' ? 'g' : 'd');
      const Q = (DS_TEXTE[lang].quellen || DS_TEXTE.de.quellen)[art];
      gruppen.push({ typ: 'quelle', key: key, art: art, fall: fall });
      return ' ' + altRegex(Object.keys(Q).map(function (k) { return { sk: skText(Q[k][fall] || Q[k].n, lang).trim() }; }));
    }
    gruppen.push({ typ: 'text', key: key });
    return ' ([^ ]+(?: [^ ]+)*?)';
  }
  const src = sequenz(tpl);
  return { src: src, gruppen: gruppen, literal: literal };
}
// Regex fertig machen: ganz (Satz), oder als Suche in einem längeren Text
function regexe(k) {
  const mitIndex = function (src, flags) { try { return new RegExp(src, flags + 'd'); } catch (e) { return new RegExp(src, flags); } };
  return { ganz: mitIndex('^' + k.src + '$', ''), suche: mitIndex(k.src + '(?= |$)', 'g') };
}
// Fanggruppen einer Übereinstimmung auslesen (Werte in Originalschreibweise, Datum als ISO)
function werteAus(m, muster, sk, L) {
  const w = { _gruppen: [] };
  muster.gruppen.forEach(function (g, i) {
    const roh = m[i + 1];
    let v = null;
    if (roh == null) { w._gruppen.push(null); return; }
    const idx = m.indices && m.indices[i + 1];
    const orig = idx ? ausschnitt(sk, idx[0] - 1, idx[1]) : roh;
    if (g.typ === 'datum') { v = isoAusSkelett(roh); }
    else if (g.typ === 'nummer') { v = +roh; }
    else if (g.typ === 'wahl' || g.typ === 'geschlecht' || g.typ === 'alt') { v = g.alts.indexOf(roh.trim()); }
    else if (g.typ === 'bedingung') { v = true; }
    else if (g.typ === 'quelle') {
      const Q = (DS_TEXTE[L.lang].quellen || DS_TEXTE.de.quellen)[g.art];
      const kand = Object.keys(Q).filter(function (k) { return skText(Q[k][g.fall] || Q[k].n, L.lang).trim() === roh.trim(); });
      // "le/la titulaire de classe" sind im Skelett gleich: dann der Originaltext
      const dicht = function (s) { return String(s || '').split('').map(basis).join(''); };
      v = (kand.length > 1 ? kand.filter(function (k) { return dicht(Q[k][g.fall] || Q[k].n) === dicht(orig); })[0] : null) || kand[0] || null;
    }
    else { v = String(orig || roh).trim(); }
    const e = { g: g, roh: roh.trim(), orig: String(orig || '').trim(), wert: v };
    if (idx) { e.a = idx[0]; e.b = idx[1]; }
    w._gruppen.push(e);
    if (g.key && !(g.key in w)) { w[g.key] = v; w['_' + g.key] = e; }
  });
  return w;
}

// ---------- Sprachdaten: Muster aller Vorlagen (einmal je Sprache) ----------
function sprachDaten(lang, nurBasis) {
  let L = sprachCache[lang];
  if (!L) {
    const T = DS_TEXTE[lang] || DS_TEXTE.de;
    L = sprachCache[lang] = { lang: lang, T: T, pron: pronomen(lang), fertig: false };
    L.pronWoerter = {};
    Object.keys(L.pron).forEach(function (k) { L.pron[k].forEach(function (x) { L.pronWoerter[skText(x.t, lang).trim()] = x.g; }); });
    L.kindWorte = [skText(T.s.das_kind || '', lang).trim()].filter(Boolean);
  }
  if (!nurBasis && !L.fertig) { L.fertig = true; baueMuster(L); }
  return L;
}
function neuesMuster(L, tpl, info, extra) {
  const k = kompiliere(tpl, L.lang, extra);
  const r = regexe(k);
  return Object.assign({ tpl: tpl, src: k.src, gruppen: k.gruppen, literal: k.literal, re: r.ganz, suche: r.suche }, info);
}
function baueMuster(L) {
  const T = L.T, lang = L.lang;
  L.muster = [];
  L.listen = {};   // Aufzählungsglieder je Liste: { name: [muster] }
  const kontrastVor = lang === 'fr' ? '(?: (?:toutefois|en revanche|cependant))?' : (lang === 'en' ? '(?: (?:however|at the same time|by contrast))?' : '');
  // Aussagen mit fünf Formulierungen
  Object.keys(DS_AUFBAU).forEach(function (bereich) {
    DS_AUFBAU[bereich].themen.forEach(function (th) {
      th.aussagen.forEach(function (a, platz) {
        const id = a[0], t = T.a[id] || {};
        (t.t || []).forEach(function (tpl, stufe) {
          if (!tpl) { return; }
          const m = neuesMuster(L, tpl, { art: 'aussage', id: id, stufe: stufe, bereich: bereich, band: STUFE_BAND[stufe], thema: th.id, pol: a[1], platz: platz, vorne: a[2] === 'vorne' });
          if (kontrastVor) { m.re = new RegExp('^' + kontrastVor + m.src + '$', m.re.flags); m.suche = new RegExp(kontrastVor + m.src + '(?= |$)', m.suche.flags); m.gruppenVersatz = 0; }
          L.muster.push(m);
        });
        // Kurzformen für Aufzählungen
        ['np', 'm', 'g', 'n', 'a', 'd'].forEach(function (feld) {
          if (!t[feld]) { return; }
          const liste = feld === 'np' ? 'np:' + bereich : feld + ':' + bereich;
          (L.listen[liste] = L.listen[liste] || []).push(neuesMuster(L, t[feld], { art: 'glied', id: id, bereich: bereich, feld: feld, thema: th.id, platz: platz }));
        });
        if (t.e) { L.muster.push(neuesMuster(L, t.e, { art: 'erklaerung', id: id, bereich: bereich, band: [5, 6, 7], thema: th.id })); }
      });
    });
  });
  // Auswahlfelder: Textform [1] und Beschriftung [0]
  Object.keys(T.chips || {}).forEach(function (gruppe) {
    const liste = 'chip:' + gruppe;
    L.listen[liste] = [];
    Object.keys(T.chips[gruppe]).forEach(function (key) {
      const v = T.chips[gruppe][key];
      [v[1], v[0]].forEach(function (text, j) {
        if (!text || (j === 1 && text === v[1])) { return; }
        L.listen[liste].push(neuesMuster(L, text, { art: 'chip', gruppe: gruppe, key: key, beschriftung: j === 1 }));
      });
    });
  });
  // Rahmensätze (s.*)
  const S = T.s;
  Object.keys(RAHMEN).forEach(function (key) {
    if (!S[key]) { return; }
    L.muster.push(neuesMuster(L, S[key], Object.assign({ art: 'rahmen', key: key }, RAHMEN[key]), RAHMEN[key].extra));
  });
  // Faktensätze (43b/44b/45b) und die festen Sätze von 4.2, 5, 5.2, 5.4
  (FAKTEN[lang] ? FAKTEN[lang](L) : []).forEach(function (f) {
    L.muster.push(neuesMuster(L, f.tpl, Object.assign({ art: 'fakt' }, f), f.extra));
  });
  L.muster.forEach(function (m, i) { m.nr = i; });
  L.woerter = lexikon(L);
}

// Rahmensätze: was die Aufzählung {liste} enthält und wo der Satz steht
const RAHMEN = {
  schule_intro: { ab: 'schule', wirkung: 'intro', feldDatum: 'schule_datum', feldQuelle: 'schule_quelle' },
  kind_intro: { ab: 'kind', wirkung: 'intro', feldDatum: 'kind_datum' },
  eltern_intro: { ab: 'eltern', wirkung: 'intro', feldDatum: 'eltern_datum', feldQuelle: 'eltern_quelle' },
  schule_staerken: { ab: 'schule', liste: 'chip:s_staerken' },
  schule_hilft: { ab: 'schule', liste: 'chip:s_hilft' },
  schule_erwartung: { ab: 'schule', liste: 'chip:s_erwartung' },
  schule_ohne: { ab: 'schule', liste: 'np:schule', band: [1, 2] },
  kind_interessen: { ab: 'kind', liste: 'chip:k_interessen' },
  kind_wuensche: { ab: 'kind', liste: 'chip:k_wuensche' },
  kind_vertrauen: { ab: 'kind', wirkung: 'vertrauen' },
  kind_ohne: { ab: 'kind', liste: 'np:kind', band: [1, 2] },
  eltern_staerken: { ab: 'eltern', liste: 'chip:e_staerken' },
  eltern_erwartung: { ab: 'eltern', liste: 'chip:e_erwartung', feldQuelle: 'eltern_quelle' },
  eltern_ohne: { ab: 'eltern', liste: 'np:eltern', band: [1, 2] },
  beob_ohne: { ab: 'beobachtung', liste: 'np:beobachtung', band: [1, 2] },
  beob_eine: { ab: 'beobachtung', wirkung: 'beob' },
  beob_mehrere: { ab: 'beobachtung', wirkung: 'beob' },
  muster_stark: { ab: 'deutung', liste: 'm:deutung', band: [6, 7] },
  muster_mittel: { ab: 'deutung', liste: 'm:deutung', band: [5] },
  muster_mittel_nach: { ab: 'deutung', liste: 'm:deutung', band: [5] },
  aengste_stark: { ab: 'deutung', liste: 'np:deutung', band: [5, 6, 7], p2: true, sortiert: true },
  aengste_mittel: { ab: 'deutung', liste: 'np:deutung', band: [4], p2: true, sortiert: true },
  aengste_beide: { ab: 'deutung', listen: { stark: ['np:deutung', [5, 6, 7]], mittel: ['np:deutung', [4]] }, p2: true, sortiert: true },
  abwehr_stark: { ab: 'deutung', liste: 'np:deutung', band: [5, 6, 7], p2: true, sortiert: true },
  abwehr_mittel: { ab: 'deutung', liste: 'np:deutung', band: [4], p2: true, sortiert: true },
  abwehr_beide: { ab: 'deutung', listen: { stark: ['np:deutung', [5, 6, 7]], mittel: ['np:deutung', [4]] }, p2: true, sortiert: true },
  abwehr_bezug_stark: { ab: 'deutung', listen: { stark: ['np:deutung', [5, 6, 7]] }, p2: true, sortiert: true },
  abwehr_bezug_beide: { ab: 'deutung', listen: { stark: ['np:deutung', [5, 6, 7]], mittel: ['np:deutung', [4]] }, p2: true, sortiert: true },
  abwehr_bezug_mittel: { ab: 'deutung', listen: { mittel: ['np:deutung', [4]] }, p2: true, sortiert: true },
  hyp_stark: { ab: 'deutung', liste: 'g:deutung', band: [6, 7], sortiert: true },
  hyp_mittel: { ab: 'deutung', liste: 'n:deutung', band: [4, 5], sortiert: true },
  hyp_nur_mittel: { ab: 'deutung', liste: 'n:deutung', band: [4, 5], sortiert: true },
  hyp_trauma: { ab: 'deutung', wirkung: 'trauma' },
  beduerfnis_stark: { ab: 'beduerfnisse', liste: 'a:beduerfnisse', band: [6, 7], sortiert: true },
  beduerfnis_mittel: { ab: 'beduerfnisse', liste: 'd:beduerfnisse', band: [4, 5], sortiert: true },
  beduerfnis_nur_mittel: { ab: 'beduerfnisse', liste: 'd:beduerfnisse', band: [4, 5], sortiert: true },
  ressourcen: { ab: 'beduerfnisse', liste: 'chip:ressourcen' }
};

// ---------- Faktensätze (43b/44b/45b rückwärts) ----------
// Je Eintrag: ab = Abschnitt, tpl = Satz in der Schreibweise des Text-Motors, extra.slots = Auswahl
// für Platzhalter, tu(w, x) = was der Satz setzt (w: gefangene Werte in Originalschreibweise).
// Die Sätze stehen hier noch einmal, weil sie in 43b/44b/45b im Programmcode stehen (nicht als Daten);
// der Rundlauf-Test (app/tests/ds-leser.test.cjs) merkt, wenn sie auseinanderlaufen.
const FAKTEN = {};
FAKTEN.de = function () {
  const O = DS_TEXTE.de.optionen, f = [];
  const W = '{w: (erste Wörter mit etwa {w} Monaten)}', ex = { slots: { w: 'nummer' } };
  f.push({ ab: 'auftrag', tpl: 'Das Zentrum für sozio-emotionale Entwicklung (CDSE) wurde{datum: am {datum}} von {wer} beauftragt, eine vertiefende Diagnostik bei {wem} durchzuführen, um {seinen} aktuellen sozio-emotionalen Entwicklungsstand und Förderbedarf festzustellen.',
    tu: function (w, x) { x.f('auftrag_datum', w.datum); x.auftraggeber(w.wer); x.wem(w.wem, { w: 'der Schülerin', m: 'dem Schüler' }); } });
  f.push({ ab: 'auftrag', tpl: 'Die Beauftragung erfolgte aufgrund von {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:anlass', { rest: 'anlass_andere' }); } });
  f.push({ ab: 'auftrag', tpl: 'Ziel ist es, {liste} einzuleiten.', tu: function (w, x) { x.liste(w._liste, 'chip:anliegen'); } });
  f.push({ ab: 'auftrag', tpl: 'Die Anfrage erfolgte auf Empfehlung {liste} sowie auf Wunsch der Eltern.', tu: function (w, x) { x.liste(w._liste, 'chip:empfohlen'); x.chip('empfohlen', 'eltern'); } });
  f.push({ ab: 'auftrag', tpl: 'Die Anfrage erfolgte auf Empfehlung {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:empfohlen'); } });
  f.push({ ab: 'auftrag', tpl: 'Die Anfrage erfolgte auf Wunsch der Eltern.', tu: function (w, x) { x.chip('empfohlen', 'eltern'); } });
  // Vorgeschichte
  f.push({ ab: 'vorgeschichte', tpl: 'Schwangerschaft und Geburt verliefen nach Angaben der Eltern unauffällig.', tu: function (w, x) { x.f('schwangerschaft', 'unauffaellig'); x.f('geburt', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die Schwangerschaft verlief unauffällig.', tu: function (w, x) { x.f('schwangerschaft', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die Schwangerschaft verlief mit Komplikationen{d: ({d})}.', tu: function (w, x) { x.f('schwangerschaft', 'komplikationen'); x.frei('schwangerschaft_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die Geburt verlief unauffällig.', tu: function (w, x) { x.f('geburt', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Bei der Geburt kam es zu Komplikationen{d: ({d})}.', tu: function (w, x) { x.f('geburt', 'komplikationen'); x.frei('geburt_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Motorik und Sprache entwickelten sich altersgerecht' + W + '.', extra: ex, tu: function (w, x) { x.f('motorik', 'altersgerecht'); x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die motorische Entwicklung verlief altersgerecht, die Sprachentwicklung verzögert' + W + '.', extra: ex, tu: function (w, x) { x.f('motorik', 'altersgerecht'); x.f('sprache', 'verzoegert'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die Sprachentwicklung verlief altersgerecht' + W + ', die motorische Entwicklung verzögert.', extra: ex, tu: function (w, x) { x.f('motorik', 'verzoegert'); x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die motorische Entwicklung verlief altersgerecht.', tu: function (w, x) { x.f('motorik', 'altersgerecht'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die motorische Entwicklung verlief verzögert{d: ({d})}.', tu: function (w, x) { x.f('motorik', 'verzoegert'); x.frei('motorik_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die Sprachentwicklung verlief altersgerecht' + W + '.', extra: ex, tu: function (w, x) { x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die Sprachentwicklung verlief verzögert' + W + '{d:; {d}}.', extra: ex, tu: function (w, x) { x.f('sprache', 'verzoegert'); x.worte(w.w); x.frei('sprache_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Diagnostiziert {{wurde|wurden}} bisher {liste}.', tu: function (w, x) { x.diagnosen(w._liste); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Bisher liegen keine Diagnosen vor.', tu: function (w, x) { x.f('keine_diagnosen', true); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Bisherige schulische und außerschulische Unterstützungsmaßnahmen:', tu: function () {} });
  // Sozialbericht: Familienstand und Wohnort (alle Kombinationen wie in 43b)
  const STAND = [['getrennt', 'Die Eltern von {Name} leben getrennt'], ['zusammen', 'Die Eltern von {Name} leben zusammen'],
    ['alleinerziehend', 'Die Mutter von {Name} ist alleinerziehend', 'nichtVater'], ['alleinerziehend', 'Der Vater von {Name} ist alleinerziehend', 'vater'],
    ['patchwork', '{Name} wächst in einer Patchworkfamilie auf'], ['verstorben', 'Ein Elternteil von {Name} ist verstorben']];
  STAND.forEach(function (s) {
    Object.keys(O.lebt_bei).forEach(function (lb) {
      if ((s[0] === 'zusammen' && lb === 'beide') || (s[2] === 'vater' && lb !== 'vater') || (s[2] === 'nichtVater' && lb === 'vater')) { return; }
      f.push({ ab: 'sozialbericht', pos: 'stand', tpl: s[1] + '; {er} ' + O.lebt_bei[lb][1] + '.', tu: function (w, x) { x.f('familienstand', s[0]); x.f('lebt_bei', lb); } });
    });
    f.push({ ab: 'sozialbericht', pos: 'stand', tpl: s[1] + '.', tu: function (w, x) { x.f('familienstand', s[0]); } });
  });
  f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{Name} lebt mit beiden Eltern zusammen.', tu: function (w, x) { x.f('familienstand', 'zusammen'); x.f('lebt_bei', 'beide'); } });
  Object.keys(O.lebt_bei).forEach(function (lb) { f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{N} ' + O.lebt_bei[lb][1] + '.', tu: function (w, x) { x.f('lebt_bei', lb); } }); });
  Object.keys(O.kontakt).forEach(function (k) { f.push({ ab: 'sozialbericht', pos: 'stand', tpl: O.kontakt[k], tu: function (w, x) { x.f('kontakt', k); } }); });
  const POS = Object.keys(O.position), exPos = { slots: { pos: POS.map(function (k) { return O.position[k]; }), n: 'nummer' } };
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} ist Einzelkind.', tu: function (w, x) { x.f('geschwister_anzahl', '0'); } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} hat ein Geschwisterkind{p: und ist {pos}}.', extra: exPos, tu: function (w, x) { x.f('geschwister_anzahl', '1'); if (w.pos >= 0) { x.f('geschwister_position', POS[w.pos]); } } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} hat {n} Geschwister{p: und ist {pos}}.', extra: exPos, tu: function (w, x) { x.f('geschwister_anzahl', String(w.n)); if (w.pos >= 0) { x.f('geschwister_position', POS[w.pos]); } } });
  f.push({ ab: 'sozialbericht', pos: 'sprachen', tpl: 'In der Familie wird {liste} gesprochen.', tu: function (w, x) { x.liste(w._liste, 'chip:sprachen', { rest: 'sprache_andere', andere: 'andere' }); } });
  // Beruf der Eltern: Mutter, Vater oder beide ("…; der Vater …")
  const Z = { slots: { z: [O.arbeitszeit.vollzeit, O.arbeitszeit.teilzeit], z2: [O.arbeitszeit.vollzeit, O.arbeitszeit.teilzeit] } };
  const ZK = ['vollzeit', 'teilzeit'];
  const teil = function (wer, n) { return { nicht: wer + ' ist derzeit nicht berufstätig', arbeit: wer + ' arbeitet{z' + n + ': {z' + n + '}}{b' + n + ': als {b' + n + '}}' }; };
  const setzeBeruf = function (x, feld, zeit, art, z, b) { if (art === 'nicht') { x.f(zeit, 'nicht'); return; } if (z >= 0) { x.f(zeit, ZK[z]); } if (b) { x.frei(feld, b); } };
  const M = teil('Die Mutter', ''), V = teil('der Vater', '2'), V1 = teil('Der Vater', '2');
  ['nicht', 'arbeit'].forEach(function (a) {
    f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: M[a] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_mutter', 'zeit_mutter', a, w.z, w.b); } });
    f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: V1[a] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_vater', 'zeit_vater', a, w.z2, w.b2); } });
    ['nicht', 'arbeit'].forEach(function (b) {
      f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: M[a] + '; ' + V[b] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_mutter', 'zeit_mutter', a, w.z, w.b); setzeBeruf(x, 'beruf_vater', 'zeit_vater', b, w.z2, w.b2); } });
    });
  });
  f.push({ ab: 'sozialbericht', pos: 'ereignisse', tpl: '{{Als belastendes Ereignis wird|Als belastende Ereignisse werden}} {liste} genannt.', tu: function (w, x) { x.listeDetails(w._liste, 'ereignisse', 'ereignis_details'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'Nach der Schule besucht {N} die Maison Relais.', tu: function (w, x) { x.chip('betreuung', 'maison_relais'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'Außerhalb der Schule betreuen die Großeltern {Na} regelmäßig.', tu: function (w, x) { x.chip('betreuung', 'grosseltern'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'Außerhalb der Schule wird {N} von einer Tagesmutter betreut.', tu: function (w, x) { x.chip('betreuung', 'tagesmutter'); } });
  // Aktuelle Situation
  const exAm = { slots: { am: ['am', 'an der'] } };
  f.push({ ab: 'aktuell', tpl: 'Derzeit besucht {N} die Klasse {klasse}{s: {am} {schule}}{l: bei {lp}}.', extra: exAm, tu: function (w, x) { x.f('klasse', w.klasse); x.f('schule_name', w.schule); x.frei('lehrperson', w.lp); } });
  f.push({ ab: 'aktuell', tpl: 'Derzeit wird {N} {am} {schule}{l: bei {lp}} beschult.', extra: exAm, tu: function (w, x) { x.f('schule_name', w.schule); x.frei('lehrperson', w.lp); } });
  f.push({ ab: 'aktuell', tpl: '{seine} Referenzperson im ESEB ist {x}.', tu: function (w, x) { x.frei('eseb_referenz', w.x); } });
  // Diagnostische Verfahren
  f.push({ ab: 'verfahren', tpl: 'Die vorliegende Einschätzung beruht {teile}.', tu: function (w, x) { x.verfahren(w._teile, { und: 'sowie', auf: 'auf', beob: 'auf Beobachtungen im Unterricht', gespr: 'auf Gesprächen' }); } });
  f.push({ ab: 'verfahren', tpl: 'Beobachtungen und Gespräche fanden in {ort} statt.', tu: function (w, x) { x.frei('verfahren_ort', w.ort); } });
  // 4.2 ELDiB (entsteht aus der ELDiB-Einschätzung, nicht aus dem DS)
  f.push({ ab: 'eldib', eldib: 'fest', tpl: 'Der ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen) ist ein standardisiertes Einschätzungsinstrument, das dazu dient, die soziale und emotionale Entwicklung von Kindern und Jugendlichen im Alter zwischen Geburt und sechzehn Jahren zu erfassen.' });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: 'Er stellt ein Profil spezifischer Fähigkeiten zur Verfügung, die als Indikatoren der sozialen und emotionalen Förderung dienen.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Im Bereich {bereich} ({code}) wurden noch keine Items als erreicht eingeschätzt.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Am weitesten entwickelt ist bei {Name} der Bereich {bereich} ({code}): Hier befindet {er} sich auf Entwicklungsstufe {rest}.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Am wenigsten entwickelt ist der Bereich {bereich} ({code}): Hier befindet {N} sich auf Entwicklungsstufe {rest}.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Im Bereich {bereich} ({code}) befindet {N} sich auf Entwicklungsstufe {rest}.' });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: '{N} verfügt hier bereits über gute Fähigkeiten: {rest}.' });
  f.push({ ab: 'eldib', eldib: 'ziele', tpl: 'Ausgehend vom Richtziel ergeben sich folgende Lernziele für {Na}:' });
  f.push({ ab: 'eldib', eldib: 'ziele', tpl: 'In diesem Bereich wurden keine Lernziele festgelegt.' });
  f.push({ ab: 'eldib', eldib: 'alter', tpl: 'Gemessen am Lebensalter von {jahre} Jahren wäre Entwicklungsstufe {rest}.' });
  f.push({ ab: 'eldib', eldib: 'alter', tpl: 'Alle eingeschätzten Bereiche entsprechen mindestens der altersentsprechenden Entwicklungsstufe {rest}.' });
  // 5 Schlussfolgerung: vier Fassungen, jeder Satz verrät die Abstimmung mit der Familie
  const schluss = function (a, tpl) { f.push({ ab: 'schluss', tpl: tpl, tu: function (w, x) { if (a) { x.f('abgestimmt', a); } else { x.merke('ohneAbstimmung', true); } } }); };
  schluss('vorbehalte', 'Auf Grundlage der vorliegenden Testergebnisse, Beobachtungen und anamnestischen Informationen wurden spezifische Förderbedarfe identifiziert.');
  schluss('vorbehalte', 'In Gesprächen mit {wer} konnten Empfehlungen zur weiteren Unterstützung der individuellen Entwicklung erarbeitet werden.');
  schluss('vorbehalte', 'Dabei wurden einzelne vorgeschlagene Maßnahmen {von} kritisch hinterfragt bzw. nicht vollständig befürwortet.');
  schluss('nein', 'Auf Grundlage der vorliegenden Testergebnisse, Beobachtungen und anamnestischen Informationen wurden spezifische Förderbedarfe identifiziert und Empfehlungen formuliert.');
  schluss('nein', 'Eine Abstimmung dieser Empfehlungen mit {wer} war bislang nicht möglich.');
  schluss('ja', 'Auf Basis der erhobenen Testergebnisse, Beobachtungen und anamnestischen Informationen wurden in enger Abstimmung mit {wer} gezielte Förderbedarfe identifiziert.');
  schluss('ja', 'Daraus abgeleitet wurden gemeinsam Empfehlungen formuliert, die die individuelle Entwicklung wirksam unterstützen sollen.');
  schluss('', 'Auf Basis der erhobenen Testergebnisse, Beobachtungen und anamnestischen Informationen wurden gezielte Förderbedarfe identifiziert.');
  schluss('', 'Daraus abgeleitet wurden Empfehlungen formuliert, die die individuelle Entwicklung wirksam unterstützen sollen.');
  // 5.2 Ziele
  f.push({ ab: 'ziele', tpl: 'Die folgenden Förderziele leiten sich aus den ELDiB-Lernzielen ab.', tu: function () {} });
  f.push({ ab: 'ziele', tpl: 'Sie beschreiben den jeweils nächsten Entwicklungsschritt; ihre Umsetzung wird {bis} im Alltag beobachtet und in der nächsten ELDiB-Einschätzung überprüft.', tu: function (w, x) { x.zieleBis(w._bis); } });
  // 5.3 Empfehlungen: Zwischenüberschriften
  f.push({ ab: 'empfehlungen', kontext: 'familie', tpl: 'Familiärer Kontext' });
  f.push({ ab: 'empfehlungen', kontext: 'schule', tpl: 'Schulischer Kontext (lokal)' });
  f.push({ ab: 'empfehlungen', kontext: 'region', tpl: 'Regionaler Kontext (ESEB / CDSE)' });
  // 5.4 CNI
  f.push({ ab: 'cni', cniKopf: true, tpl: 'Das CDSE empfiehlt der Nationalen Kommission für Inklusion (CNI) folgende {{Maßnahme|Maßnahmen}}:', tu: function () {} });
  // Vorlagensätze der CNI-Vorlage, von Hand ausgefüllt (herkunft „frei“)
  f.push({ ab: 'auftrag', vorlage: true, tpl: 'Das Zentrum für sozio-emotionale Entwicklung wurde am {datum} von der nationalen Kommission zur Inklusion (CNI) damit beauftragt, eine vertiefende Diagnostik bei {wem} durchzuführen, um {x} aktuellen sozio-emotionalen Entwicklungsstand und Förderbedarf festzustellen.',
    tu: function (w, x) { x.f('auftrag_datum', w.datum, 0.85); x.f('auftraggeber', 'cni', 0.85); x.wem(w.wem, {}); } });
  return f;
};

FAKTEN.fr = function () {
  const O = DS_TEXTE.fr.optionen, f = [];
  const W = '{w: (premiers mots vers {w} mois)}', ex = { slots: { w: 'nummer' } };
  f.push({ ab: 'auftrag', tpl: 'Le Centre pour le développement socio-émotionnel (CDSE) a été mandaté{datum: en date du {datum}} par {wer} pour réaliser un diagnostic spécialisé de {wem}, afin de déterminer son état actuel de développement socio-émotionnel ainsi que ses besoins éducatifs particuliers.',
    tu: function (w, x) { x.f('auftrag_datum', w.datum); x.auftraggeber(w.wer); x.wem(w.wem, {}, "l'élève"); } });
  f.push({ ab: 'auftrag', tpl: 'La demande fait suite à {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:anlass', { rest: 'anlass_andere' }); } });
  f.push({ ab: 'auftrag', tpl: '{{Elle|La demande}} a pour objectif {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:anliegen'); } });
  f.push({ ab: 'auftrag', tpl: 'Cette demande a été formulée sur recommandation {liste}, en accord avec le souhait des parents.', tu: function (w, x) { x.liste(w._liste, 'chip:empfohlen'); x.chip('empfohlen', 'eltern'); } });
  f.push({ ab: 'auftrag', tpl: 'Cette demande a été formulée sur recommandation {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:empfohlen'); } });
  f.push({ ab: 'auftrag', tpl: 'Cette demande émane des parents.', tu: function (w, x) { x.chip('empfohlen', 'eltern'); } });
  f.push({ ab: 'vorgeschichte', tpl: "Selon les parents, la grossesse et l'accouchement se sont déroulés sans particularité.", tu: function (w, x) { x.f('schwangerschaft', 'unauffaellig'); x.f('geburt', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: "La grossesse s'est déroulée sans particularité.", tu: function (w, x) { x.f('schwangerschaft', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'La grossesse a été marquée par des complications{d: ({d})}.', tu: function (w, x) { x.f('schwangerschaft', 'komplikationen'); x.frei('schwangerschaft_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: "L'accouchement s'est déroulé sans particularité.", tu: function (w, x) { x.f('geburt', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: "L'accouchement a donné lieu à des complications{d: ({d})}.", tu: function (w, x) { x.f('geburt', 'komplikationen'); x.frei('geburt_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: "Le développement moteur et le développement du langage ont été conformes à l'âge" + W + '.', extra: ex, tu: function (w, x) { x.f('motorik', 'altersgerecht'); x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: "Le développement moteur a été conforme à l'âge, tandis que le développement du langage a été retardé" + W + '.', extra: ex, tu: function (w, x) { x.f('motorik', 'altersgerecht'); x.f('sprache', 'verzoegert'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: "Le développement du langage a été conforme à l'âge" + W + ', tandis que le développement moteur a été retardé.', extra: ex, tu: function (w, x) { x.f('motorik', 'verzoegert'); x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: "Le développement moteur a été conforme à l'âge.", tu: function (w, x) { x.f('motorik', 'altersgerecht'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Le développement moteur a été retardé{d: ({d})}.', tu: function (w, x) { x.f('motorik', 'verzoegert'); x.frei('motorik_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: "Le développement du langage a été conforme à l'âge" + W + '.', extra: ex, tu: function (w, x) { x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Le développement du langage a été retardé' + W + '{d:; {d}}.', extra: ex, tu: function (w, x) { x.f('sprache', 'verzoegert'); x.worte(w.w); x.frei('sprache_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: '{{Le diagnostic suivant a été posé|Les diagnostics suivants ont été posés}} à ce jour : {liste}.', tu: function (w, x) { x.diagnosen(w._liste); } });
  f.push({ ab: 'vorgeschichte', tpl: "Aucun diagnostic n'a été posé à ce jour.", tu: function (w, x) { x.f('keine_diagnosen', true); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Mesures de soutien scolaires et extrascolaires antérieures :', tu: function () {} });
  const STAND = [['getrennt', 'Les parents de {Name} sont séparés'], ['zusammen', 'Les parents de {Name} vivent ensemble'], ['alleinerziehend', '{Name} grandit dans une famille monoparentale'],
    ['patchwork', '{Name} grandit dans une famille recomposée'], ['verstorben', "L'un des parents de {Name} est décédé"]];
  STAND.forEach(function (s) {
    Object.keys(O.lebt_bei).forEach(function (lb) {
      if (s[0] === 'zusammen' && lb === 'beide') { return; }
      f.push({ ab: 'sozialbericht', pos: 'stand', tpl: s[1] + ' ; {il} ' + O.lebt_bei[lb][1] + '.', tu: function (w, x) { x.f('familienstand', s[0]); x.f('lebt_bei', lb); } });
    });
    f.push({ ab: 'sozialbericht', pos: 'stand', tpl: s[1] + '.', tu: function (w, x) { x.f('familienstand', s[0]); } });
  });
  f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{Name} vit avec ses deux parents.', tu: function (w, x) { x.f('familienstand', 'zusammen'); x.f('lebt_bei', 'beide'); } });
  Object.keys(O.lebt_bei).forEach(function (lb) { f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{N} ' + O.lebt_bei[lb][1] + '.', tu: function (w, x) { x.f('lebt_bei', lb); } }); });
  Object.keys(O.kontakt).forEach(function (k) { f.push({ ab: 'sozialbericht', pos: 'stand', tpl: O.kontakt[k], tu: function (w, x) { x.f('kontakt', k); } }); });
  // Geschwister: "fait partie d'une fratrie de trois enfants, dont il est l'aîné"
  const ZAHL = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze'];
  const POSK = ['aeltestes', 'mittleres', 'juengstes'];
  const POSF = [["l'aîné", "l'aînée"], ["l'un des enfants du milieu", "l'une des enfants du milieu"], ['le plus jeune', 'la plus jeune']];
  const posAlt = [], posKey = [];
  POSF.forEach(function (p, i) { [p[0], p[1], p[0] + '/' + p[1]].forEach(function (t) { posAlt.push(t); posKey.push(POSK[i]); }); });
  const exG = { slots: { z: ZAHL, n: 'nummer', pos: posAlt } };
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} est enfant unique.', tu: function (w, x) { x.f('geschwister_anzahl', '0'); } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: "{N} fait partie d'une fratrie de {z} enfants{p:, dont {il} est {pos}}.", extra: exG, tu: function (w, x) { if (w.z > 0) { x.f('geschwister_anzahl', String(w.z - 1)); } if (w.pos >= 0) { x.f('geschwister_position', posKey[w.pos]); } } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: "{N} fait partie d'une fratrie de {n} enfants{p:, dont {il} est {pos}}.", extra: exG, tu: function (w, x) { x.f('geschwister_anzahl', String(w.n - 1)); if (w.pos >= 0) { x.f('geschwister_position', posKey[w.pos]); } } });
  f.push({ ab: 'sozialbericht', pos: 'sprachen', tpl: 'À la maison, la famille parle {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:sprachen', { rest: 'sprache_andere', andere: 'andere' }); } });
  const Z = { slots: { z: [O.arbeitszeit.vollzeit, O.arbeitszeit.teilzeit], z2: [O.arbeitszeit.vollzeit, O.arbeitszeit.teilzeit] } };
  const ZK = ['vollzeit', 'teilzeit'];
  const teil = function (wer, n) { return { nicht: wer + " n'exerce actuellement pas d'activité professionnelle", arbeit: wer + ' travaille{z' + n + ': {z' + n + '}}{b' + n + ': en tant que {b' + n + '}}' }; };
  const setzeBeruf = function (x, feld, zeit, art, z, b) { if (art === 'nicht') { x.f(zeit, 'nicht'); return; } if (z >= 0) { x.f(zeit, ZK[z]); } if (b) { x.frei(feld, b); } };
  const M = teil('La mère', ''), V = teil('le père', '2'), V1 = teil('Le père', '2');
  ['nicht', 'arbeit'].forEach(function (a) {
    f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: M[a] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_mutter', 'zeit_mutter', a, w.z, w.b); } });
    f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: V1[a] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_vater', 'zeit_vater', a, w.z2, w.b2); } });
    ['nicht', 'arbeit'].forEach(function (b) {
      f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: M[a] + ' ; ' + V[b] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_mutter', 'zeit_mutter', a, w.z, w.b); setzeBeruf(x, 'beruf_vater', 'zeit_vater', b, w.z2, w.b2); } });
    });
  });
  f.push({ ab: 'sozialbericht', pos: 'ereignisse', tpl: "{{L'événement marquant suivant est mentionné|Les événements marquants suivants sont mentionnés}} : {liste}.", tu: function (w, x) { x.listeDetails(w._liste, 'ereignisse', 'ereignis_details'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: "Après l'école, {N} fréquente la maison relais.", tu: function (w, x) { x.chip('betreuung', 'maison_relais'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: "En dehors de l'école, {N} est régulièrement [[gardé|gardée]] par ses grands-parents.", tu: function (w, x) { x.chip('betreuung', 'grosseltern'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: '{N} est par ailleurs [[accueilli|accueillie]] chez une assistante parentale.', tu: function (w, x) { x.chip('betreuung', 'tagesmutter'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: "En dehors de l'école, {N} est [[accueilli|accueillie]] chez une assistante parentale.", tu: function (w, x) { x.chip('betreuung', 'tagesmutter'); } });
  const exS = { slots: { schule: { vor: ["à l'école", 'au', 'à la', "à l'"] } } };
  f.push({ ab: 'aktuell', tpl: '{N} est actuellement [[scolarisé|scolarisée]]{k: dans la classe {klasse}}{s: {schule}}{l:, sous la responsabilité de {lp}}.', extra: exS,
    tu: function (w, x) { x.f('klasse', w.klasse); x.f('schule_name', x.ohneVorwort(w.schule)); x.frei('lehrperson', w.lp); } });
  f.push({ ab: 'aktuell', tpl: "Sa personne de référence au sein de l'ESEB est {x}.", tu: function (w, x) { x.frei('eseb_referenz', w.x); } });
  f.push({ ab: 'aktuell', tpl: "La personne de référence de {Name} au sein de l'ESEB est {x}.", tu: function (w, x) { x.frei('eseb_referenz', w.x); } });
  f.push({ ab: 'verfahren', tpl: 'Cette évaluation repose {teile}.', tu: function (w, x) { x.verfahren(w._teile, { und: 'ainsi que', auf: 'sur', beob: 'sur des observations en classe', gespr: 'sur des entretiens' }); } });
  f.push({ ab: 'verfahren', tpl: 'Lieu des observations et des entretiens : {ort}.', tu: function (w, x) { x.frei('verfahren_ort', w.ort); } });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: "L'ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen) est un instrument d'évaluation standardisé conçu pour mesurer le développement social et émotionnel des enfants et des adolescents à partir de la naissance jusqu'à l'âge de seize ans." });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: "Il fournit un profil de compétences spécifiques servant d'indicateurs du niveau des compétences sociales et émotionnelles." });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: "Dans le domaine {bereich} ({code}), aucun item n'a encore été évalué comme acquis." });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Les compétences les plus développées chez {Name} sont celles du domaine {bereich} ({code}), où {il} se situe au niveau de développement {rest}.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Les compétences les moins développées chez {Name} sont celles du domaine {bereich} ({code}), où {il} se situe au niveau de développement {rest}.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Dans le domaine {bereich} ({code}), {N} se situe au niveau de développement {rest}.' });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: '{N} dispose déjà de bons acquis dans ce domaine : {rest}.' });
  f.push({ ab: 'eldib', eldib: 'ziele', tpl: "En partant de l'objectif général, les objectifs d'apprentissage suivants ont été définis pour {Nt} :" });
  f.push({ ab: 'eldib', eldib: 'ziele', tpl: "Aucun objectif d'apprentissage n'a été défini dans ce domaine." });
  f.push({ ab: 'eldib', eldib: 'alter', tpl: "Au regard de l'âge de {Name} ({jahre} ans), le niveau de développement {rest}." });
  f.push({ ab: 'eldib', eldib: 'alter', tpl: "Tous les domaines évalués atteignent au moins le niveau de développement attendu à l'âge de {Name} ({rest})." });
  const schluss = function (a, tpl) { f.push({ ab: 'schluss', tpl: tpl, tu: function (w, x) { if (a) { x.f('abgestimmt', a); } else { x.merke('ohneAbstimmung', true); } } }); };
  schluss('vorbehalte', 'Sur la base des résultats des tests disponibles, des observations et des données anamnestiques, des besoins spécifiques de soutien ont été identifiés.');
  schluss('vorbehalte', 'Lors des entretiens avec {wer}, des recommandations visant à soutenir davantage le développement individuel ont pu être élaborées.');
  schluss('vorbehalte', "Certaines mesures proposées ont toutefois été remises en question ou n'ont pas été entièrement approuvées par {von}.");
  schluss('nein', 'Sur la base des résultats des tests disponibles, des observations et des données anamnestiques, des besoins spécifiques de soutien ont été identifiés et des recommandations ont été formulées.');
  schluss('nein', "Une concertation sur ces recommandations avec {wer} n'a pas encore pu avoir lieu.");
  schluss('ja', 'Sur la base des résultats des tests, des observations et des informations anamnestiques recueillies, des besoins spécifiques de soutien ont pu être identifiés en étroite concertation avec {wer}.');
  schluss('ja', 'Par la suite, des recommandations ont été formulées conjointement, dans le but de soutenir efficacement le développement individuel.');
  schluss('', 'Sur la base des résultats des tests, des observations et des informations anamnestiques recueillies, des besoins spécifiques de soutien ont pu être identifiés.');
  schluss('', 'Par la suite, des recommandations ont été formulées dans le but de soutenir efficacement le développement individuel.');
  f.push({ ab: 'ziele', tpl: "Les objectifs de soutien suivants découlent des objectifs d'apprentissage de l'ELDiB.", tu: function () {} });
  f.push({ ab: 'ziele', tpl: 'Ils décrivent à chaque fois la prochaine étape de développement ; leur mise en œuvre sera observée au quotidien {bis} et vérifiée lors de la prochaine évaluation ELDiB.', tu: function (w, x) { x.zieleBis(w._bis); } });
  f.push({ ab: 'empfehlungen', kontext: 'familie', tpl: 'Contexte familial' });
  f.push({ ab: 'empfehlungen', kontext: 'schule', tpl: 'Contexte scolaire (local)' });
  f.push({ ab: 'empfehlungen', kontext: 'region', tpl: 'Contexte régional (ESEB / CDSE)' });
  f.push({ ab: 'cni', cniKopf: true, tpl: "Le CDSE recommande à la Commission nationale d'inclusion (CNI) {{la mesure suivante|les mesures suivantes}} :", tu: function () {} });
  f.push({ ab: 'auftrag', vorlage: true, tpl: "Le Centre pour le développement socio-émotionnel (CDSE) a été mandaté en date du {datum} par la Commission nationale d'inclusion (CNI) pour réaliser un diagnostic spécialisé de {wem}, afin de déterminer son état actuel de développement socio-émotionnel ainsi que ses besoins éducatifs particuliers.",
    tu: function (w, x) { x.f('auftrag_datum', w.datum, 0.85); x.f('auftraggeber', 'cni', 0.85); x.wem(w.wem, {}, "l'élève"); } });
  return f;
};

FAKTEN.en = function () {
  const O = DS_TEXTE.en.optionen, f = [];
  const W = '{w: (first words at around {w} months)}', ex = { slots: { w: 'nummer' } };
  f.push({ ab: 'auftrag', tpl: 'The Centre pour le développement socio-émotionnel (Centre for Socio-Emotional Development, CDSE) was commissioned by {wer}{datum: on {datum}} to carry out a specialized diagnostic assessment of {wem} in order to determine {his} current level of socio-emotional development and {his} special educational needs.',
    tu: function (w, x) { x.f('auftrag_datum', w.datum); x.auftraggeber(w.wer); x.wem(w.wem, {}); } });
  f.push({ ab: 'auftrag', tpl: 'The referral was prompted by {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:anlass', { rest: 'anlass_andere', beide: 'behavioral difficulties at school and at home' }); } });
  f.push({ ab: 'auftrag', tpl: 'The aim is to initiate {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:anliegen'); } });
  f.push({ ab: 'auftrag', tpl: 'The request was made at the wish of {Qd} and on the recommendation of {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:empfohlen'); x.chip('empfohlen', 'eltern'); } });
  f.push({ ab: 'auftrag', tpl: 'The request was made on the recommendation of {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:empfohlen'); } });
  f.push({ ab: 'auftrag', tpl: 'The request was made at the wish of {Qd}.', tu: function (w, x) { x.chip('empfohlen', 'eltern'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'According to {Q}, the pregnancy and birth were uneventful.', tu: function (w, x) { x.f('schwangerschaft', 'unauffaellig'); x.f('geburt', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'The pregnancy was uneventful.', tu: function (w, x) { x.f('schwangerschaft', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'There were complications during pregnancy{d: ({d})}.', tu: function (w, x) { x.f('schwangerschaft', 'komplikationen'); x.frei('schwangerschaft_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'The birth was uneventful.', tu: function (w, x) { x.f('geburt', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'There were complications at birth{d: ({d})}.', tu: function (w, x) { x.f('geburt', 'komplikationen'); x.frei('geburt_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Motor and language development were age-appropriate' + W + '.', extra: ex, tu: function (w, x) { x.f('motorik', 'altersgerecht'); x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Motor development was age-appropriate, while language development was delayed' + W + '.', extra: ex, tu: function (w, x) { x.f('motorik', 'altersgerecht'); x.f('sprache', 'verzoegert'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Language development was age-appropriate' + W + ', while motor development was delayed.', extra: ex, tu: function (w, x) { x.f('motorik', 'verzoegert'); x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Motor development was age-appropriate.', tu: function (w, x) { x.f('motorik', 'altersgerecht'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Motor development was delayed{d: ({d})}.', tu: function (w, x) { x.f('motorik', 'verzoegert'); x.frei('motorik_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Language development was age-appropriate' + W + '.', extra: ex, tu: function (w, x) { x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Language development was delayed' + W + '{d:; {d}}.', extra: ex, tu: function (w, x) { x.f('sprache', 'verzoegert'); x.worte(w.w); x.frei('sprache_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'To date, {N} has been diagnosed with {liste}.', tu: function (w, x) { x.diagnosen(w._liste); } });
  f.push({ ab: 'vorgeschichte', tpl: 'No diagnoses have been made to date.', tu: function (w, x) { x.f('keine_diagnosen', true); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Previous school-based and out-of-school support measures:', tu: function () {} });
  const STAND = [['getrennt', '{Name}’s parents are separated'], ['zusammen', '{Name}’s parents live together'], ['alleinerziehend', '{Name}’s mother is a single parent', 'nichtVater'],
    ['alleinerziehend', '{Name}’s father is a single parent', 'vater'], ['patchwork', '{Name} is growing up in a blended family'], ['verstorben', 'One of {Name}’s parents has died']];
  STAND.forEach(function (s) {
    Object.keys(O.lebt_bei).forEach(function (lb) {
      if ((s[0] === 'zusammen' && lb === 'beide') || (s[2] === 'vater' && lb !== 'vater') || (s[2] === 'nichtVater' && lb === 'vater')) { return; }
      f.push({ ab: 'sozialbericht', pos: 'stand', tpl: s[1] + '; [[he|she]] ' + O.lebt_bei[lb][1] + '.', tu: function (w, x) { x.f('familienstand', s[0]); x.f('lebt_bei', lb); } });
    });
    f.push({ ab: 'sozialbericht', pos: 'stand', tpl: s[1] + '.', tu: function (w, x) { x.f('familienstand', s[0]); } });
  });
  f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{Name} lives with {his} mother, who is a single parent.', tu: function (w, x) { x.f('familienstand', 'alleinerziehend'); x.f('lebt_bei', 'mutter'); } });
  f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{Name} lives with {his} father, who is a single parent.', tu: function (w, x) { x.f('familienstand', 'alleinerziehend'); x.f('lebt_bei', 'vater'); } });
  f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{Name} lives with both parents.', tu: function (w, x) { x.f('familienstand', 'zusammen'); x.f('lebt_bei', 'beide'); } });
  Object.keys(O.lebt_bei).forEach(function (lb) { f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{N} ' + O.lebt_bei[lb][1] + '.', tu: function (w, x) { x.f('lebt_bei', lb); } }); });
  Object.keys(O.kontakt).forEach(function (k) { f.push({ ab: 'sozialbericht', pos: 'stand', tpl: O.kontakt[k], tu: function (w, x) { x.f('kontakt', k); } }); });
  const ZAHL = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  const POS = Object.keys(O.position), exG = { slots: { z: ZAHL, n: 'nummer', pos: POS.map(function (k) { return O.position[k]; }) } };
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} is an only child.', tu: function (w, x) { x.f('geschwister_anzahl', '0'); } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} has a younger sibling.', tu: function (w, x) { x.f('geschwister_anzahl', '1'); x.f('geschwister_position', 'aeltestes'); } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} has an older sibling.', tu: function (w, x) { x.f('geschwister_anzahl', '1'); x.f('geschwister_position', 'juengstes'); } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} has one sibling.', tu: function (w, x) { x.f('geschwister_anzahl', '1'); } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} has {z} siblings{p: and is {pos}}.', extra: exG, tu: function (w, x) { if (w.z >= 0) { x.f('geschwister_anzahl', String(w.z)); } if (w.pos >= 0) { x.f('geschwister_position', POS[w.pos]); } } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} has {n} siblings{p: and is {pos}}.', extra: exG, tu: function (w, x) { x.f('geschwister_anzahl', String(w.n)); if (w.pos >= 0) { x.f('geschwister_position', POS[w.pos]); } } });
  f.push({ ab: 'sozialbericht', pos: 'sprachen', tpl: 'The family speaks {liste} at home.', tu: function (w, x) { x.liste(w._liste, 'chip:sprachen', { rest: 'sprache_andere', andere: 'andere' }); } });
  const Z = { slots: { z: [O.arbeitszeit.vollzeit, O.arbeitszeit.teilzeit], z2: [O.arbeitszeit.vollzeit, O.arbeitszeit.teilzeit] } };
  const ZK = ['vollzeit', 'teilzeit'];
  const teil = function (wer, n) { return { nicht: wer + ' is not currently employed', arbeit: wer + ' works{z' + n + ': {z' + n + '}}{b' + n + ': as {b' + n + '}}' }; };
  const setzeBeruf = function (x, feld, zeit, art, z, b) { if (art === 'nicht') { x.f(zeit, 'nicht'); return; } if (z >= 0) { x.f(zeit, ZK[z]); } if (b) { x.frei(feld, String(b).replace(/^(a|an)\s+/i, '')); } };
  const M = teil('{his} mother', ''), V = teil('{his} father', '2');
  ['nicht', 'arbeit'].forEach(function (a) {
    f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: M[a] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_mutter', 'zeit_mutter', a, w.z, w.b); } });
    f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: V[a] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_vater', 'zeit_vater', a, w.z2, w.b2); } });
    ['nicht', 'arbeit'].forEach(function (b) {
      f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: M[a] + '; ' + V[b] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_mutter', 'zeit_mutter', a, w.z, w.b); setzeBeruf(x, 'beruf_vater', 'zeit_vater', b, w.z2, w.b2); } });
    });
  });
  f.push({ ab: 'sozialbericht', pos: 'ereignisse', tpl: '{liste} {{is|are}} reported as {{a stressful life event|stressful life events}}.', tu: function (w, x) { x.listeDetails(w._liste, 'ereignisse', 'ereignis_details'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'After school, {N} attends the Maison Relais.', tu: function (w, x) { x.chip('betreuung', 'maison_relais'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'Outside school hours, {N} is looked after by {his} grandparents and by a childminder.', tu: function (w, x) { x.chip('betreuung', 'grosseltern'); x.chip('betreuung', 'tagesmutter'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'Outside school hours, {N} is regularly looked after by {his} grandparents.', tu: function (w, x) { x.chip('betreuung', 'grosseltern'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'Outside school hours, {N} is looked after by a childminder.', tu: function (w, x) { x.chip('betreuung', 'tagesmutter'); } });
  f.push({ ab: 'aktuell', tpl: '{N} currently attends class {klasse}{s: at {schule}}{l:, where {his} class teacher is {lp}}.', tu: function (w, x) { x.f('klasse', w.klasse); x.f('schule_name', w.schule); x.frei('lehrperson', w.lp); } });
  f.push({ ab: 'aktuell', tpl: '{N} currently attends {schule}{l:, where {his} class teacher is {lp}}.', tu: function (w, x) { x.f('schule_name', w.schule); x.frei('lehrperson', w.lp); } });
  f.push({ ab: 'aktuell', tpl: '{his} reference person at the ESEB is {x}.', tu: function (w, x) { x.frei('eseb_referenz', w.x); } });
  f.push({ ab: 'verfahren', tpl: 'This assessment is based {teile}.', tu: function (w, x) { x.verfahren(w._teile, { und: 'and', auf: 'on', beob: 'on classroom observations', gespr: 'on interviews' }); } });
  f.push({ ab: 'verfahren', tpl: 'Observations and interviews took place in {ort}.', tu: function (w, x) { x.frei('verfahren_ort', w.ort); } });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: 'The ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen), the German adaptation of the Developmental Teaching Objectives Rating Form – Revised (DTORF-R), is a standardized rating instrument designed to assess the social and emotional development of children and adolescents from birth to the age of sixteen.' });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: 'It provides a profile of specific skills that serve as indicators of the level of social and emotional competence.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'In the {bereich} domain ({code}), no items have yet been rated as mastered.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: '{Name} is most advanced in the {bereich} domain ({code}), where [[he|she]] is functioning at developmental Stage {rest}.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'The least developed domain is {bereich} ({code}), where {N} is functioning at developmental Stage {rest}.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'In the {bereich} domain ({code}), {N} is functioning at developmental Stage {rest}.' });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: '{N} has already acquired solid skills in this domain; for example, {rest}.' });
  f.push({ ab: 'eldib', eldib: 'ziele', tpl: 'Based on the stage objective, the following learning goals have been set for {Nt}:' });
  f.push({ ab: 'eldib', eldib: 'ziele', tpl: 'No learning goals have been set in this domain.' });
  f.push({ ab: 'eldib', eldib: 'alter', tpl: 'Given a chronological age of {jahre} years, developmental Stage {rest}.' });
  f.push({ ab: 'eldib', eldib: 'alter', tpl: 'In all domains assessed, {N} is functioning at least at the age-appropriate developmental Stage {rest}.' });
  const schluss = function (a, tpl) { f.push({ ab: 'schluss', tpl: tpl, tu: function (w, x) { if (a) { x.f('abgestimmt', a); } else { x.merke('ohneAbstimmung', true); } } }); };
  schluss('vorbehalte', 'Based on the available test results, observations and case history information, specific support needs were identified.');
  schluss('vorbehalte', 'In discussions with {wer}, recommendations were developed to further support {ihre} individual development.');
  schluss('vorbehalte', 'Some of the proposed measures were, however, questioned or not fully endorsed by {von}.');
  schluss('nein', 'Based on the available test results, observations and case history information, specific support needs were identified and recommendations formulated.');
  schluss('nein', 'It has not yet been possible to agree on these recommendations with {wer}.');
  schluss('ja', 'Based on the test results, observations and case history information gathered, specific support needs were identified in close consultation with {wer}.');
  schluss('ja', 'On this basis, recommendations were jointly formulated to support {ihre} individual development effectively.');
  schluss('', 'Based on the test results, observations and case history information gathered, specific support needs were identified.');
  schluss('', 'On this basis, recommendations were formulated to support {Name}’s individual development effectively.');
  f.push({ ab: 'ziele', tpl: 'The following support goals are derived from the ELDiB learning goals.', tu: function () {} });
  f.push({ ab: 'ziele', tpl: 'Each goal describes the next developmental step; progress will be monitored in everyday situations {bis} and reviewed at the next ELDiB assessment.', tu: function (w, x) { x.zieleBis(w._bis); } });
  f.push({ ab: 'empfehlungen', kontext: 'familie', tpl: 'Family context' });
  f.push({ ab: 'empfehlungen', kontext: 'schule', tpl: 'School context (local)' });
  f.push({ ab: 'empfehlungen', kontext: 'region', tpl: 'Regional context (ESEB / CDSE)' });
  f.push({ ab: 'cni', cniKopf: true, tpl: 'The CDSE recommends the following {{measure|measures}} to the Commission nationale d’inclusion (CNI):', tu: function () {} });
  return f;
};

// ---------- Freitext: Wortschatz der Aussagen (Ähnlichkeit, Vorschläge mit sicher < 0.7) ----------
const STOPP = {
  de: 'der die das den dem des ein eine einer einen einem eines und oder aber auch ist sind war waren wird werden wurde wurden hat haben hatte hatten sich er sie es ihm ihn ihr ihre ihren ihrem ihrer sein seine seinen seinem seiner seines im in am an auf aus bei mit nach von vor zu zum zur fur uber um als wie so dass da dann denn doch noch schon etwa bzw sowie diese dieser dieses man wenn weil ob wo was wer jedoch dabei daran dazu davon dort hier ich wir',
  fr: 'le la les l un une des du d de et ou mais est sont a ont ete il elle ils elles lui leur leurs son sa ses se s en dans au aux par pour avec sur qu que qui ce cette ces y n ne comme lors dont ainsi toutefois cependant revanche tres',
  en: 'the a an and or but is are was were be been has have had he she him her his hers it its they them their in on at to of for with by from as that this these those which who whom however'
};
function stamm(w, lang) {
  if (w.length <= 4 || /\d/.test(w)) { return w; }
  if (lang === 'de') { return w.replace(/(ungen|innen|ern|em|en|er|es|e|n|s)$/, ''); }
  if (lang === 'fr') { return w.replace(/(ements|ement|ments|ment|ees|ee|es|e|s|x)$/, ''); }
  return w.replace(/(ingly|ing|edly|ed|ies|es|s|ly)$/, '');
}
function stammGleich(a, b) {
  if (a === b) { return 1; }
  const n = Math.min(a.length, b.length);
  let p = 0;
  while (p < n && a.charAt(p) === b.charAt(p)) { p++; }
  return (p >= 5 && p >= 0.75 * n) ? 0.8 : 0;
}
function inhaltsStaemme(text, lang, weg) {
  const st = STOPP[lang] || STOPP.de, aus = [];
  const stop = lexStopp[lang] || (lexStopp[lang] = new Set(st.split(' ').map(function (w) { return kanon(w, lang); })));
  woerter(text, lang).forEach(function (t) {
    if (stop.has(t.w) || t.w.length < 3 || (weg && weg.has(t.w))) { return; }
    aus.push(stamm(t.w, lang));
  });
  return aus;
}
const lexStopp = {};
// Wortschatz: je Aussage die Stämme aller Formulierungen (für die Themenerkennung) und je Stufe
function lexikon(L) {
  const lang = L.lang, T = L.T, eintraege = [], df = {};
  Object.keys(DS_AUFBAU).forEach(function (bereich) {
    DS_AUFBAU[bereich].themen.forEach(function (th) {
      th.aussagen.forEach(function (a) {
        const t = T.a[a[0]] || {}, texte = [t.q].concat(t.t || [], [t.np, t.m, t.g, t.n, t.a, t.d, t.e]).filter(Boolean);
        const ohne = function (s) { return String(s).replace(/\{[^}]*\}/g, ' ').replace(/\[\[([^|\]]*)\|[^\]]*\]\]/g, '$1'); };
        const alle = {};
        texte.forEach(function (x) { inhaltsStaemme(ohne(x), lang).forEach(function (s) { alle[s] = 1; }); });
        Object.keys(alle).forEach(function (s) { df[s] = (df[s] || 0) + 1; });
        eintraege.push({ id: a[0], bereich: bereich, thema: th.id, pol: a[1], skala: (tafeln().skalaThema || {})[bereich + '.' + th.id] || 'std',
          staemme: Object.keys(alle), stufen: (t.t || []).map(function (x) { return x ? inhaltsStaemme(ohne(x), lang) : null; }) });
      });
    });
  });
  const n = eintraege.length, idf = {};
  Object.keys(df).forEach(function (s) { idf[s] = Math.log(1 + n / df[s]); });
  return { eintraege: eintraege, idf: idf, df: df };
}
// Stufenwörter im Freitext (Häufigkeit, Stärke, Verneinung) -> Band der Aussage:
//   hoch 6–7, eherHoch 5, mitte 4, eherTief 3, tief/nein 1–2; ohne Hinweis 5 (was jemand eigens
//   erwähnt, trifft eher zu). betont (vor allem, deutlich) nur bei Situationen/Mustern in 4.3.
// Für die anderen Skalen: stark = Wörter für „vor allem / deutlich / am ehesten“.
const STUFENWORTE = {
  de: {
    hoch: 'sehr häufig|sehr oft|ständig|dauernd|permanent|andauernd|immer|stets|jedes Mal|täglich|fast täglich|jeden Tag|stundenlang|sofort|ohne Zögern|zügig|zu den Besten|sehr gut|sehr gerne|sehr gern|zuverlässig|massiv|extrem|heftig|heftige|heftigen|ohne Probleme|ohne Schwierigkeiten|problemlos|mühelos|ausgeprägt|ausgeprägte|ausgeprägten',
    eherHoch: 'häufig|häufige|häufigen|oft|meist|meistens|überwiegend|weitgehend|immer wieder|wiederholt|mehrmals|mehrfach|regelmäßig|gut|gute|guten|gutes|guter|gerne|gern|in der Regel|größtenteils|zumeist|recht gut|sichtlich',
    mitte: 'teilweise|teils|zeitweise|manchmal|gelegentlich|ab und zu|hin und wieder|wechselhaft|schwankend|schwankt|unterschiedlich|nicht immer|nicht durchgehend|zum Teil|mal mehr mal weniger|einigermaßen',
    eherTief: 'selten|wenig|eher nicht|vereinzelt|nur vereinzelt|zögerlich|zögernd|erst nach|nur mit|nur nach|etwas Mühe|einige Mühe|eher schwer|nur kurz|nur kurze|schwach|schwache|schwachen|schwacher|gering|geringe|geringen|geringer|niedrig|niedrige',
    tief: 'kaum|nie|niemals|gar nicht|überhaupt nicht|schwer|sehr schwer|nur schwer|große Mühe|großer Mühe|Mühe|schlecht|keinerlei',
    nein: 'nicht|kein|keine|keinen|keiner|keinem|keines|nichts|nicht gerne|nicht gern|nicht gut',
    betont: 'vor allem|besonders|insbesondere|deutlich|vorwiegend|hauptsächlich|in erster Linie|eindeutig|vorrangig',
    wichtig: 'vor allem|dringend|unbedingt|besonders|insbesondere|in erster Linie|braucht|benötigt|zwingend|wichtig|vorrangig',
    wahrscheinlich: 'am ehesten|vor allem|in erster Linie|hauptsächlich|wahrscheinlich|vermutlich|offensichtlich|eindeutig|deutlich',
    deutlich: 'deutlich|deutliche|deutlichen|stark|starke|starken|ausgeprägt|ausgeprägte|ausgeprägten|massiv|vor allem|hauptsächlich|eindeutig'
  },
  fr: {
    hoch: 'très souvent|constamment|sans cesse|toujours|systématiquement|tous les jours|chaque jour|presque tous les jours|quotidiennement|au quotidien|pendant des heures|sans hésiter|sans hésitation|immédiatement|tout de suite|aussitôt|parmi les meilleurs|parmi les meilleures|très bien|très volontiers|fortement|massivement|violentes|violente|violent|violents|intense|intenses|sans difficulté|sans difficultés|sans problème|sans problèmes|facilement|aisément|marqué|marquée|marqués|marquées',
    eherHoch: 'souvent|fréquemment|régulièrement|la plupart du temps|la plupart des cas|dans la plupart des cas|plusieurs fois|à plusieurs reprises|généralement|globalement|bien|bonne|bonnes|bons|bon|volontiers|majoritairement|en général|assez bien|visiblement',
    mitte: 'parfois|par moments|de temps en temps|de temps à autre|occasionnellement|variable|variables|fluctuant|fluctuante|en partie|partiellement|pas toujours|plus ou moins|irrégulièrement|inégal|inégale',
    eherTief: 'rarement|peu|ponctuellement|seulement après|qu’après|avec de l’aide|un peu de mal|quelques difficultés|hésitant|hésitante|brièvement|faible|faibles|insuffisant|insuffisante|insuffisants',
    tief: 'guère|pratiquement pas|presque pas|jamais|pas du tout|beaucoup de mal|du mal|de mal|difficilement|difficile|très difficile|grandes difficultés|des difficultés',
    nein: 'pas|aucun|aucune|ni|rien|pas volontiers|pas bien',
    betont: 'surtout|particulièrement|notamment|nettement|principalement|avant tout|clairement|essentiellement',
    wichtig: 'surtout|absolument|avant tout|a besoin|besoin|indispensable|essentiel|essentielle|nécessaire|prioritaire|particulièrement|urgent',
    wahrscheinlich: 'avant tout|principalement|probablement|surtout|vraisemblablement|clairement|manifestement|essentiellement',
    deutlich: 'net|nets|nette|nettes|nettement|fort|forte|fortement|marqué|marquée|marqués|marquées|surtout|principalement|clairement'
  },
  en: {
    hoch: 'very often|constantly|always|all the time|every day|daily|for hours|immediately|straight away|without hesitation|promptly|among the best|very well|reliably|severe|extremely|without difficulty|without problems|easily|strongly',
    eherHoch: 'often|frequently|repeatedly|mostly|usually|largely|regularly|several times|generally|well|good|happily|readily|in most cases|visibly',
    mitte: 'sometimes|at times|occasionally|partly|partially|variable|inconsistent|inconsistently|not always|from time to time|now and then|more or less',
    eherTief: 'rarely|seldom|little|hesitant|hesitantly|only after|only with|some difficulty|briefly|weak|poor|low',
    tief: 'hardly|barely|never|scarcely|not at all|great difficulty|difficulty|difficulties|difficult|struggles|struggle|struggled|poorly|badly',
    nein: 'not|no|none|nothing|cannot|doesn|don|didn|isn|wasn|won|nor|not well',
    betont: 'especially|particularly|mainly|clearly|markedly|above all|primarily',
    wichtig: 'above all|especially|urgently|needs|need|essential|necessary|crucial|particularly|priority',
    wahrscheinlich: 'most likely|mainly|primarily|probably|likely|above all|clearly|evidently',
    deutlich: 'clear|clearly|strong|strongly|marked|markedly|mainly|pronounced'
  }
};
const STUFE_KLASSE = { hoch: [6, 7], eherHoch: [5], mitte: [4], eherTief: [3], tief: [1, 2], nein: [1, 2] };
const KLASSE_RANG = { tief: 6, nein: 5, hoch: 4, eherTief: 3, eherHoch: 2, mitte: 1 };
// Satzteile trennen (Hinweiswörter gelten nur im eigenen Satzteil)
const GEGENSATZ = { de: ['aber', 'jedoch', 'doch', 'sondern', 'allerdings', 'wahrend', 'obwohl', 'hingegen', 'dagegen'], fr: ['mais', 'cependant', 'toutefois', 'pourtant', 'tandis', 'alors', 'bien'], en: ['but', 'however', 'although', 'whereas', 'while', 'yet'] };

// Stichwörter je Aussage [de, fr, en]: Muster mit „|“ getrennt; die Wörter eines Musters stehen nah
// beieinander (Reihenfolge egal); „*“ = Wortanfang; „-“ vor dem Muster: beschreibt das Gegenteil der
// Aussage („lässt sich ablenken“ zu „kann sich konzentrieren“). Ergänzt den Wortschatz der Vorlagen.
const FREI_STICH = {
  // 3.2 Schule
  s_motiv: ['motiviert|motivation|beteiligt|beteiligung|beteiligen|Mitarbeit|arbeitet aktiv mit|engagiert|meldet sich|begeistert|-lustlos|-desinteressiert|-unmotiviert',
    'motivé|motivée|motivation|participe|participation|engagé|engagée|enthousiaste|avec enthousiasme|lève la main|-démotivé|-démotivée|-désintéressé|-désintéressée|-manque de motivation',
    'motivated|motivation|participates|participation|engaged|enthusiastic|-unmotivated|-disinterested|-lack of motivation'],
  s_konz: ['konzentr*|aufmerksam|~Aufmerksamkeit|bei der Sache|-ablenk*|-abgelenkt|-unaufmerksam*|-unkonzentriert|-Konzentrationsprobleme|-Konzentrationsschwierigkeiten|-Konzentrationsschwäche|-träumt|-verträumt|-abschweif*',
    'concentr*|attentif|attentive|~attention|-distrai*|-distract*|-inattenti*|-difficultés de concentration|-problèmes de concentration|-manque de concentration|-rêveur|-rêveuse|-dans la lune',
    'concentrat*|attentive|~attention|focus*|-distract*|-inattentive|-concentration problems|-concentration difficulties|-poor concentration|-daydream*'],
  s_selbst: ['selbstständig*|selbständig*|eigenständig*|ohne Hilfe|allein arbeiten|-Anstoß|-Anstöße|-Anleitung braucht',
    'autonome|autonomie|de manière autonome|travaille seul|travaille seule|sans aide|-besoin d’être relancé|-besoin d’être relancée|-relances',
    'independent*|on his own|on her own|without help|-prompting|-prompts'],
  s_sorgfalt: ['sorgfältig*|Sorgfalt|ordentlich*|organisiert|~Ordnung|-unordentlich*|-chaotisch*|-schlampig*|-vergisst Material|-Material vergessen',
    'soin|soigné|soignée|soigneux|soigneuse|organisé|organisée|ordonné|ordonnée|-désordonné|-désordonnée|-brouillon|-oublie son matériel|-oublie ses affaires',
    'careful*|neat|tidy|organised|organized|-messy|-disorganised|-disorganized|-forgets materials'],
  s_leistung: ['~Leistung*|Lernziel*|~Lernstand|Klassenziel|~Rechnen|~Lesen|~Schreiben|~Mathemati*|schulische Anforderungen|-Lernrückstand|-Lernschwierigkeit*|-Rückstand|-unterdurchschnittlich|-unter den Anforderungen',
    '~résultats|objectifs d’apprentissage|~niveau scolaire|~lecture|~calcul|~mathématiques|~apprentissages|-retard scolaire|-difficultés d’apprentissage',
    '~achievement|~attainment|learning goals|~reading|~writing|~maths|~math|~mathematics|-behind|-learning difficulties'],
  s_unruhe: ['unruhig*|Unruhe|zappel*|kippel*|hibbel*|steht auf|stand auf|aufstehen|Platz auf|Platz verlassen|herumlauf*|umherlauf*|Bewegungsdrang|hyperaktiv*|-still sitzen|-stillsitzen|-sitzt ruhig',
    'agité|agitée|agitation|bouge|remue|se lève|levé|levée|quitte sa place|hyperactif|hyperactive|-rester assis|-tenir en place|-reste assis|-reste assise',
    'restless*|fidget*|gets up|out of seat|leaves seat|hyperactive|-sit still|-stays seated'],
  s_regeln: ['Regel|Regeln|Klassenregeln|Absprachen|Vereinbarungen',
    'règle|règles|règles de classe|accords',
    'rule|rules|class rules|agreements'],
  s_impuls: ['impulsiv*|unüberlegt*|ohne nachzudenken|unbedacht*|reinruf*|hineinruf*|dazwischenruf*|platzt heraus',
    'impulsi*|sans réfléchir|irréfléchi*',
    'impulsiv*|without thinking|blurts out'],
  s_frust: ['Frustration|Frustrationstoleranz|mit Kritik|Kritik umgehen|Misserfolg*|Rückschlag|Rückschläge|~verlieren|~verliert|Niederlage*|-frustriert|-schnell frustriert|-gibt auf|-aufgeben|-gibt schnell auf',
    'frustration|tolérance à la frustration|critique|critiques|échec|échecs|~perdre|~perd|-frustré|-frustrée|-abandonne|-baisse les bras',
    'frustration|frustration tolerance|criticism|failure|setback*|~losing|-frustrated|-gives up|-give up'],
  s_wut: ['Wut|wütend|Wutausbruch|Wutausbrüche|Wutausbrüchen|Wutanfall|Wutanfälle|Wutanfällen|Tobsucht*|rastet aus|ausrasten|Ausraster|Zorn|jähzornig',
    'colère|colères|crise de colère|crises de colère|rage|s’emporte|emportements|furieux|furieuse',
    'tantrum|tantrums|outburst|outbursts|anger|angry|rage|meltdown|meltdowns'],
  s_aggr: ['aggressiv*|Aggression*|schlägt|schlagen|haut andere|tritt andere|tritt nach|beißt|kratzt|schubst|beleidigt|beschimpft|bedroht|handgreiflich|prügelt|Gewalt',
    'agressi*|frappe|tape|donne des coups|coups de pied|mord|pousse|insulte|insultes|injures|menace|violence|violent|bagarre|se bat',
    'aggressi*|hits|hitting|kicks|kicking|bites|pushes|insults|threatens|violence|violent|fights'],
  s_verweig: ['verweiger*|weigert sich|lehnt Aufgaben ab|macht nicht mit|boykott*',
    'refuse|refus|refuser|s’oppose|opposition',
    'refuses|refusal|refusing|defian*|oppositional'],
  s_rueckzug: ['Rückzug|zieht sich zurück|zurückgezogen|in sich gekehrt|wirkt still|sehr still|schweigsam|verschlossen|schüchtern',
    'se replie|repli|retiré|retirée|renfermé|renfermée|silencieux|silencieuse|timide|en retrait',
    'withdraw*|withdrawn|quiet|shy|reserved'],
  s_angst: ['ängstlich|Angst|Ängste|angespannt|Anspannung|Versagensangst|Versagensängste|nervös|Prüfungsangst',
    'anxieux|anxieuse|anxiété|angoisse|angoissé|angoissée|peur|peurs|tendu|tendue|tension|nerveux|nerveuse|stressé|stressée',
    'anxious|anxiety|fear|fears|afraid|tense|tension|nervous|worried'],
  s_ausgeglichen: ['ausgeglichen|gelassen|emotional stabil|-gereizt|-launisch|-Stimmungsschwankungen|-reizbar',
    'équilibré|équilibrée|serein|sereine|~stable|-irritable|-lunatique|-sautes d’humeur',
    'balanced|~calm|even-tempered|~stable|-irritable|-moody|-mood swings'],
  s_peers: ['Kontakt Mitschüler*|Kontakte Mitschüler*|Kontakt Klassenkamerad*|Freundschaft*|integriert|Klassengemeinschaft|Anschluss|spielt mit anderen|beliebt|-Außenseiter|-ausgegrenzt|-abgelehnt',
    'contact camarades|contacts camarades|relations camarades|intégré|intégrée|groupe classe|apprécié|appréciée|joue avec|-isolé|-isolée|-exclu|-exclue|-rejeté|-rejetée',
    'contact peers|contact classmates|gets on well with peers|integrated|popular|plays with|-outsider|-excluded|-isolated|-rejected'],
  s_konflikt: ['Konflikt*|Streit|streitet|streiten|Auseinandersetzung*|Reibereien|zankt',
    'conflit|conflits|disputes|dispute|se dispute|querelles',
    'conflict|conflicts|arguments|argues|quarrels'],
  s_erwachsene: ['Beziehung Lehr*|Verhältnis Lehr*|vertraut Lehr*|Vertrauen Lehr*|Beziehung Erwachsen*|Vertrauen Erwachsen*|Lehr* zurecht|-Machtkampf|-Machtkämpfe',
    'relation enseignant*|confiance enseignant*|relation adulte*|confiance adulte*|relation maîtresse|-rapport de force',
    'relationship teacher*|trust* teacher*|relationship adult*|trust* adult*|-power struggle*'],
  s_hilfe: ['Hilfe an|nimmt Hilfe|Hilfe annehmen|Unterstützung an|lässt sich helfen|Hilfsangebote|-lehnt Hilfe ab',
    'accepte l’aide|accepte de l’aide|accepte le soutien|se laisse aider|-refuse l’aide|-refuse de l’aide',
    'accepts help|accepts support|lets others help|-refuses help'],
  s_selbstwert: ['selbstbewusst*|Selbstvertrauen|Selbstwert*|traut sich|selbstsicher*|-traut sich nichts|-unsicher|-Minderwertigkeit*',
    'confiance en soi|confiance en lui|confiance en elle|estime de soi|ose|sûr de lui|sûre d’elle|-manque de confiance|-dévalorise',
    'self-confiden*|self-esteem|confident|dares|-lacks confidence|-insecure'],
  // 3.3 Kind
  k_offen: ['offen|erzählt bereitwillig|gesprächig|-zurückhaltend|-verschlossen|-wortkarg|-einsilbig',
    'ouvertement|volontiers|se confie|bavard|bavarde|-réservé|-réservée|-renfermé|-renfermée',
    'openly|willingly|talkative|-reserved|-reticent'],
  k_wohl: ['fühl* wohl|wohlfühl*|gerne in die Schule|gern in die Schule|geht gerne|Spaß Schule|mag die Schule|-unwohl|-ungern',
    'se sent bien|bien à l’école|aime l’école|aime aller à l’école|plaît|-mal à l’aise',
    'feels good|happy at school|likes school|like school|likes going to school|like going to school|enjoys school|comfortable|-unhappy at school'],
  k_klasse: ['angenommen|zugehörig|dazugehör*|gehört dazu|akzeptiert|-ausgeschlossen|-Außenseiter|-gemobbt|-Mobbing|-ausgegrenzt',
    'acceptée|accepté|appartenance|à sa place|-exclu|-exclue|-harcelé|-harcelée|-harcèlement|-rejeté|-rejetée',
    'accepted|belongs|belonging|-excluded|-bullied|-bullying|-left out'],
  k_lehrer: ['mag Lehr*|Lehr* nett|Lehr* mag|versteht Lehr*|Lehr* zurecht|Lehr* lieb|-Lehr* streng|-Lehr* gemein|-Lehr* ungerecht',
    'aime enseignant*|aime maîtresse|enseignant* gentil*|maîtresse gentille|s’entend enseignant*|-enseignant* sévère*|-maîtresse sévère|-enseignant* injuste*',
    'likes teacher*|teacher* nice|gets on teacher*|-teacher* strict|-teacher* unfair'],
  k_leistung: ['kann gut|bin gut|gut in|stark in|-schlecht in|-schwach in|-kann nichts|-nicht gut in',
    'bon en|bonne en|fort en|forte en|-nul en|-nulle en|-faible en',
    'good at|-bad at|-weak at|-not good at'],
  k_ungerecht: ['ungerecht*|unfair*|benachteiligt|immer schuld',
    'injuste|injustice|injustement|pas juste',
    'unfair*|unjust*|treated unfairly'],
  k_selbstwert: ['stolz|mag sich|positiv über sich|-dumm|-doof|-kann nichts|-wertlos|-negativ über sich',
    'fier|fière|image de soi|-nul|-nulle|-bête|-se dévalorise',
    'proud|self-image|-stupid|-worthless'],
  k_druck: ['Leidensdruck|traurig|belastet|überfordert|unglücklich|weint|verzweifelt',
    'souffrance|souffre|triste|tristesse|malheureux|malheureuse|pleure|débordé|débordée|dépassé|dépassée',
    'distress|suffers|sad|unhappy|cries|overwhelmed'],
  k_angst: ['Angst|Ängste|Sorgen|sorgt sich|fürchtet|befürchtet',
    'peur|peurs|inquiet|inquiète|inquiétudes|craint|angoisses|soucis',
    'fear|fears|afraid|worries|worried|scared'],
  k_einsicht: ['Problembewusstsein|Einsicht|einsichtig|sieht seine Schwierigkeiten|sieht ihre Schwierigkeiten|kennt seine Schwierigkeiten|kennt ihre Schwierigkeiten|räumt ein',
    'conscience de ses difficultés|conscient de ses difficultés|consciente de ses difficultés|reconnaît ses difficultés|admet',
    'aware of his difficulties|aware of her difficulties|insight|recognises his difficulties|recognises her difficulties|admits'],
  k_veraenderung: ['verändern|Veränderung|besser werden|sich bessern|möchte Hilfe|wünscht sich Hilfe|offen für Hilfe',
    'changer|changement|s’améliorer|souhaite de l’aide|veut de l’aide|ouvert à l’aide|ouverte à l’aide',
    'change|improve|wants help|open to help'],
  k_freunde: ['Freund|Freunde|Freunden|Freundin|Freundinnen|Kumpel|Spielkamerad*|-alleine in der Pause|-allein in der Pause',
    'ami|amie|amis|amies|copain|copains|copine|copines|-seul à la récréation|-seule à la récréation',
    'friend|friends|mates|-alone at break'],
  k_familie: ['~Familie|Beziehung Familie|Beziehung Eltern|Beziehung Mutter|Beziehung Vater|versteht sich Eltern|versteht sich Familie|-Streit zu Hause|-Streit mit den Eltern',
    '~famille|relation famille|relation parents|relation mère|relation père|s’entend parents|s’entend famille|-disputes à la maison',
    '~family|relationship family|relationship parents|gets on parents|gets on family|-arguments at home'],
  // 3.4 Eltern
  e_alltag: ['Alltag klappt|Alltag gut|kommt zurecht|kommt im Alltag|-Alltag anstrengend|-Alltag schwierig',
    'se débrouille|quotidien se passe bien|-quotidien difficile|-quotidien épuisant',
    'copes well|daily life goes well|-daily life difficult|-everyday life difficult'],
  e_regeln: ['Regel|Regeln|Absprachen|gehorcht|gehorchen|Grenzen|-ungehorsam',
    'règle|règles|accords|obéit|obéir|limites|-désobéit|-désobéissant|-désobéissante',
    'rule|rules|agreements|obeys|limits|-disobeys|-disobedient'],
  e_wut: ['Wut|wütend|Wutausbruch|Wutausbrüche|Wutausbrüchen|Wutanfall|Wutanfälle|Wutanfällen|rastet aus|ausrasten|tobt|Tobsucht*|schreit herum',
    'colère|colères|crise de colère|crises de colère|rage|s’emporte|hurle',
    'tantrum|tantrums|outburst|outbursts|anger|angry|rage|screams'],
  e_geschwister: ['Streit Geschwister*|Streit Bruder|Streit Schwester|Konflikt* Geschwister*|Konflikt* Bruder|Konflikt* Schwester|streitet Bruder|streitet Schwester|streiten Geschwister*|Geschwisterstreit|Eifersucht|eifersüchtig',
    'dispute* frère*|dispute* sœur*|conflit* frère*|conflit* sœur*|conflit* fratrie|jalousie|jaloux|jalouse',
    'argue* brother*|argue* sister*|conflict* sibling*|fight* brother*|fight* sister*|sibling rivalry|jealous*'],
  e_rueckzug: ['Rückzug|zieht sich zurück|zurückgezogen|in seinem Zimmer|in ihrem Zimmer|verschlossen',
    'se replie|repli|se retire|dans sa chambre|renfermé|renfermée',
    'withdraw*|withdrawn|in his room|in her room'],
  e_angst: ['Angst|Ängste|ängstlich|Sorgen|Albtraum|Albträume|Alpträume|Trennungsangst|klammert',
    'peur|peurs|angoisse|angoisses|anxieux|anxieuse|cauchemars|inquiétudes',
    'fear|fears|anxious|anxiety|nightmares|worries|clingy'],
  e_koerper: ['Schlafprobleme|Schlafstörung*|Schlafschwierigkeiten|Einschlafprobleme|Einschlafschwierigkeiten|Bauchschmerzen|Bauchweh|Kopfschmerzen|Kopfweh|Übelkeit|körperliche Beschwerden|Beschwerden|nässt ein|Einnässen|-einschlafen|-durchschlafen|-schläft gut',
    'troubles du sommeil|problèmes de sommeil|difficultés d’endormissement|dort mal|maux de ventre|mal au ventre|mal de ventre|maux de tête|mal à la tête|nausées|plaintes physiques|douleurs|énurésie|-s’endormir|-dormir|-dort bien',
    'sleep problems|sleeping problems|sleep difficulties|trouble sleeping|stomach ache|stomachache|stomach aches|headache|headaches|nausea|physical complaints|bedwetting|-falls asleep|-sleeps well'],
  e_medien: ['Medien|Bildschirm*|Handy|Smartphone|Tablet|Konsole|Spielkonsole|Computerspiel*|Videospiel*|Fernseh*|YouTube|zockt|zocken',
    'écran|écrans|téléphone|portable|tablette|console|jeux vidéo|jeu vidéo|télévision|télé',
    'screen|screens|phone|tablet|console|video games|gaming|television|tv'],
  e_hausaufgaben: ['Hausaufgabe*|Hausi|Hausis',
    'devoir|devoirs',
    'homework'],
  e_beziehung: ['~Beziehung|~Verhältnis|gute Beziehung|enge Beziehung|liebevoll|innig|eng verbunden|-angespannt|-konflikthaft',
    '~relation|~lien|bonne relation|relation proche|affectueux|affectueuse|-tendue|-conflictuelle',
    '~relationship|~bond|good relationship|close relationship|loving|-strained|-conflictual'],
  e_struktur: ['Struktur|strukturiert|Abläufe|Ablauf|Tagesablauf|Routine|Routinen|feste Zeiten|Rituale|Rhythmus|-chaotisch',
    'structure|structuré|structurée|routine|routines|horaires|rythme|rituels|-chaotique',
    'structure|structured|routine|routines|schedule|rituals|-chaotic'],
  e_konsequenz: ['konsequent|Konsequenz|klare Erziehung|setzen Grenzen|setzt Grenzen|-inkonsequent|-nachgiebig|-gibt nach|-geben nach',
    'cohérent|cohérente|cohérence|constant|constante|posent des limites|-cèdent|-cède|-laxiste',
    'consistent|consistency|set limits|-inconsistent|-give in|-gives in|-lenient'],
  e_belastung: ['belastet|Belastung|erschöpft|überfordert|am Ende|verzweifelt|hilflos|gestresst',
    'éprouvés|éprouvée|éprouvé|épuisés|épuisée|épuisé|débordés|débordée|dépassés|dépassée|impuissants|stressés|stressée',
    'burdened|strained|exhausted|overwhelmed|helpless|stressed'],
  e_sicht_schule: ['Einschätzung der Schule|Sicht der Schule|teilen die Einschätzung|teilt die Einschätzung|-sehen das anders|-sieht das anders|-nur in der Schule',
    'avis de l’école|évaluation de l’école|partagent l’avis|partagent l’évaluation|partage l’avis|-voient les choses autrement',
    'school’s view|school’s assessment|share the view|agree with the school|-disagree'],
  e_kooperation: ['Zusammenarbeit|kooperativ|kooperieren|bereit|mitarbeiten|engagiert|-lehnen ab|-lehnt ab',
    'collaborer|collaboration|coopérer|coopération|disposés|disposée|disposé|prêts|prête|prêt|engagés|-refusent',
    'cooperate|cooperation|collaborate|willing|engaged|-refuse'],
  // 4.1 Beobachtung
  b_start: ['Aufgab* begann|Aufgab* beginnt|Aufgab* begonnen|Aufgab* anfangen|Aufgab* fing|Arbeit begann|Arbeit beginnt|Arbeitsbeginn|legte los|machte sich an die Arbeit|begann zügig|begann sofort',
    'commencé tâche*|commence tâche*|commencer tâche*|commencé travail|commence travail|s’est mis au travail|s’est mise au travail|se met au travail|mise au travail|démarré',
    'started task*|started work*|began task*|began work*|starts task*|got going|got started'],
  b_konz: ['konzentriert|Konzentration|ausdauernd|Ausdauer|vertieft|bei der Sache|-abgelenkt',
    'concentré|concentrée|concentration|persévérant|persévérante|appliqué|appliquée|-distrait|-distraite',
    'concentrated|concentration|persistent|focused|-distracted'],
  b_anweisung: ['Anweisung|Anweisungen|Arbeitsauftrag|Arbeitsaufträge|befolgte|befolgt',
    'consigne|consignes|instructions',
    'instructions|instruction|followed|follows'],
  b_hilfe: ['holte Hilfe|holte sich Hilfe|bat um Hilfe|fragte nach|meldete sich|um Hilfe',
    'demandé de l’aide|demande de l’aide|demandé l’aide|a levé la main|sollicité',
    'asked for help|asks for help|raised hand|raised his hand|raised her hand'],
  b_unruhe: ['unruhig|Unruhe|zappel*|kippel*|stand auf|stand immer wieder auf|aufgestanden|Platz auf|Platz verlassen|verließ den Platz|lief herum|umherlaufen|herumgelaufen|wippte|rutschte|-saß ruhig|-still sitzen',
    'agité|agitée|agitation|bougé|s’est levé|s’est levée|levé de sa place|levée de sa place|quitté sa place|debout en classe|remuait|-resté assis|-restée assise',
    'restless|fidget*|stood up|got up|left seat|out of seat|wandered|-sat still'],
  b_ablenk: ['abgelenkt|ablenken|ließ sich ablenken|Geräusch*|schaute umher|aus dem Fenster',
    'distrait|distraite|distraire|distrait par|bruit|bruits|regardait par la fenêtre',
    'distracted|distraction|noise|noises|looked around|out of the window'],
  b_regeln: ['Regel|Regeln|Klassenregeln|Absprachen',
    'règle|règles|règles de classe',
    'rule|rules|class rules'],
  b_frust: ['Frustrationstoleranz|blieb ruhig|arbeitete ruhig weiter|ging gelassen|-frustriert|-Frust|-gab auf|-aufgegeben|-ärgerte sich|-verzweifelte|-wurde wütend|-reagierte wütend',
    'tolérance à la frustration|est resté calme|est restée calme|a continué calmement|-frustré|-frustrée|-a abandonné|-s’est énervé|-s’est énervée|-s’est mis en colère|-s’est mise en colère',
    'frustration tolerance|stayed calm|carried on calmly|-frustrated|-gave up|-got upset|-got angry'],
  b_uebergang: ['Übergang|Übergänge|Übergängen|~Wechsel|Stundenwechsel|Raumwechsel|~Umstellung',
    'transition|transitions|~changement|~changements|~passage',
    'transition|transitions|~change|~changes|~switch'],
  b_lob: ['Lob|gelobt|lobte|Zuwendung|Anerkennung|positive Rückmeldung|Belohnung|freute sich|erfreut',
    'éloge|éloges|félicité|félicitée|félicitations|compliment|encouragements|encouragé|encouragée|récompense',
    'praise|praised|~attention|compliment|encouragement|reward'],
  b_stoer: ['störte|stört|Störung|Störungen|störend|rief in die Klasse|rief hinein|rief dazwischen|reinrufen|Zwischenrufe|Lärm',
    'perturbé|perturbe|perturbation|dérangé|dérange|interpellé|interpelle|crié|bavardé|bavardages|interrompu',
    'disrupted|disrupts|disruption|disturbed|disturbing|called out|shouted|interrupted'],
  b_peers: ['Kontakt Mitschüler*|Kontakt Kindern|spielte mit|half einem|half Mitschüler*|half anderen|suchte Kontakt|~Gruppenarbeit',
    'contact camarades|contacts camarades|joué avec|joue avec|aidé un camarade|aide un camarade|a cherché le contact|~travail de groupe',
    'contact with peers|played with|helped a classmate|sought contact|~group work'],
  b_erwachsene: ['Kontakt Erwachsen*|Kontakt Lehr*|Kontakt Beobachter*|suchte Nähe|distanzlos*|wandte sich Lehr*|-mied Erwachsen*',
    'contact adulte*|contact enseignant*|contact observat*|cherché la proximité|sans distance|-évitait les adultes',
    'contact adult*|contact teacher*|contact observer|sought closeness|-avoided adults'],
  b_isol: ['für sich|abseits|isoliert|zog sich zurück|zurückgezogen|spielte allein|stand allein|blieb allein|allein in der Pause',
    'à l’écart|isolé|isolée|s’est isolé|s’est isolée|replié|repliée|jouait seul|jouait seule|restait seul|restait seule|est resté seul|est restée seule',
    'isolated|apart|withdrew|by himself|by herself|played alone|stayed alone'],
  b_provo: ['provozierte|provoziert|provozierend|Provokation*|ärgerte andere|ärgerte Mitschüler*|neckte|schubste|schlug zu|schlug Mitschüler*|trat nach|aggressiv',
    'provoqué|provoque|provocation|provocations|taquiné|taquine|poussé|frappé|agressif|agressive',
    'provoked|provokes|provocation|teased|pushed|hit|kicked|aggressive'],
  // 4.3 Interpretation
  i_uebereinstimmung: ['stimmen überein|Übereinstimmung|übereinstimmend|decken sich|-widersprechen sich|-Widerspruch',
    'concordent|concordance|convergent|coïncident|-divergent|-contradictoires',
    'agree|consistent|converge|-diverge|-contradict'],
  i_beobachtung: ['Beobachtung bestätigt|bestätigt die Beobachtung|Beobachtung deckt|Beobachtungen bestätigen',
    'observations confirment|observation confirme|confirment les observations',
    'observation confirms|observations confirm'],
  i_eldib: ['ELDiB-Profil|ELDiB Profil|Profil ELDiB|ELDiB',
    'profil ELDiB|ELDiB',
    'ELDiB profile|ELDiB'],
  i_unstrukturiert: ['unstrukturiert*|wenig strukturiert*|~Pause|~Pausen|~Übergänge|~Übergängen|~Wechsel|freie Arbeit|Freiarbeit|offene Situationen',
    'peu structurées|peu structurée|non structurées|~récréation|~récréations|~transitions|travail libre|~pauses',
    'unstructured|less structured|~break|~breaks|~recess|~transitions|free work'],
  i_anforderung: ['Leistungsanforderung*|~Anforderungen|Leistungssituation*|~Prüfung*|~Klassenarbeit*|Leistungsdruck',
    '~exigences|~performance|~évaluations|~contrôles|~examens',
    '~demands|~performance|~tests|~exams'],
  i_beziehung: ['Beziehungssituation*|Nähe und Distanz|Konkurrenz|Grenzsetzung*|Rivalität',
    'relationnelles|relationnel|proximité et distance|rivalité|pose de limites',
    'relationship situations|closeness and distance|rivalry|~competition|limit setting'],
  i_einzel: ['Einzelsituation*|Einzelförderung|Eins-zu-eins|Einzelbetreuung|mit einem Erwachsenen allein',
    'situation individuelle|individuellement|en individuel|seul avec un adulte|seule avec un adulte|en tête-à-tête',
    'one-to-one|one to one|individual setting|alone with an adult'],
  i_schule: ['vor allem in der Schule|in der Schule stärker|in der Schule deutlicher|schulischen Kontext',
    'surtout à l’école|avant tout à l’école|contexte scolaire|plus à l’école',
    'mainly at school|especially at school|more at school'],
  i_zuhause: ['vor allem zu Hause|zu Hause stärker|zu Hause deutlicher|häuslichen Umfeld|häuslichen Kontext',
    'surtout à la maison|avant tout à la maison|contexte familial|plus à la maison',
    'mainly at home|especially at home|more at home'],
  i_angst_verlassen: ['Verlassenwerden|verlassen zu werden|Verlustangst|Verlustängste|Trennungsangst|Trennungsängste',
    'abandon|peur d’être abandonné|peur d’être abandonnée|angoisse de séparation',
    'abandonment|separation anxiety|fear of loss'],
  i_angst_unzul: ['Unzulänglichkeit|Versagensangst|Versagensängste|Angst zu versagen|Angst vor Misserfolg',
    'insuffisance|peur de l’échec|peur d’échouer',
    'inadequacy|fear of failure|fear of failing'],
  i_angst_schuld: ['Schuldangst|Schuldgefühl*|Schuldgefühle',
    'culpabilité|sentiment de culpabilité|se sent coupable',
    'guilt|feels guilty'],
  i_angst_konflikt: ['Konfliktangst|Angst vor Konflikten|Angst vor Streit|Konflikten aus dem Weg',
    'peur du conflit|peur des conflits|évite les conflits',
    'fear of conflict|avoids conflict'],
  i_angst_identitaet: ['Identitätsangst|Identität|Identitätsfragen',
    'identité',
    'identity'],
  i_abw_rueckzug: ['Rückzug|zieht sich zurück|zurückziehen',
    'repli|se replie|retrait',
    'withdrawal|withdraws'],
  i_abw_vermeidung: ['Vermeidung|vermeidet|Verweigerung|verweigert|weicht aus',
    'évitement|évite|refus|refuse',
    'avoidance|avoids|refusal|refuses'],
  i_abw_aggression: ['Aggression|aggressiv*|Gegenwehr|Angriff|Gegenangriff',
    'agressivité|agressif|agressive|attaque|contre-attaque',
    'aggression|aggressive|attack|counter-attack'],
  i_abw_regression: ['Regression|regressiv*|kleinkindlich*|Babysprache',
    'régression|régressif|régressive|petit enfant|bébé',
    'regression|regressive|babyish'],
  i_abw_clown: ['Clownerie|Clown|Kasper*|albern|Faxen',
    'pitreries|clown|fait le clown|diversion',
    'clowning|clown|silly|diversion'],
  i_abw_kontrolle: ['Überkontrolle|~Kontrolle|~kontrolliert|Perfektionismus|perfektionistisch',
    'contrôle excessif|~contrôle|perfectionnisme|perfectionniste',
    'overcontrol|~control|perfectionism|perfectionist'],
  i_abw_projektion: ['Projektion|Schuldzuweisung*|Schuld anderen|gibt anderen die Schuld|schiebt die Schuld',
    'projection|attribution de la faute|rejette la faute|accuse les autres',
    'projection|blames others|blaming others'],
  i_abw_verleugnung: ['Verleugnung|verleugnet|Bagatellisierung|bagatellisiert|spielt herunter|verharmlost|leugnet',
    'déni|nie|minimisation|minimise|banalise',
    'denial|denies|minimisation|minimization|downplays'],
  i_hyp_entwicklung: ['Entwicklungsverzögerung|Verzögerung|sozio-emotionalen Entwicklung|emotionalen Entwicklung|Entwicklungsrückstand',
    'retard du développement|retard|développement socio-émotionnel',
    'developmental delay|delay|socio-emotional development'],
  i_hyp_regulation: ['Emotionsregulation|Regulation Gefühl*|Gefühle regulieren|Affektregulation|Selbstregulation|Impulskontrolle',
    'régulation émotionnelle|régulation des émotions|gestion des émotions|autorégulation',
    'emotion regulation|emotional regulation|self-regulation|impulse control'],
  i_hyp_belastung: ['Belastung*|belastende Situation|Trennung der Eltern|Scheidung|Umzug|Todesfall|familiäre Krise',
    'difficultés familiales|séparation des parents|divorce|déménagement|décès|crise familiale',
    'family difficulties|separation|divorce|moving house|bereavement|family crisis'],
  i_hyp_bindung: ['Bindung*|Bindungsunsicherheit|unsicher gebunden',
    'attachement|insécurité de l’attachement',
    'attachment|attachment insecurity'],
  i_hyp_sozial: ['soziale Unsicherheit|sozial unsicher|soziale Ängste|Unsicherheit im Kontakt',
    'insécurité sociale|mal à l’aise en groupe|timidité',
    'social insecurity|social anxiety|shyness'],
  i_hyp_aufmerksamkeit: ['Aufmerksamkeitsproblematik|Aufmerksamkeitsprobleme|Aufmerksamkeitsstörung|ADHS|ADS|Konzentrationsprobleme|Konzentrationsschwierigkeiten',
    'problématique attentionnelle|troubles de l’attention|trouble de l’attention|TDAH|difficultés de concentration',
    'attention problems|attention difficulties|ADHD|concentration problems'],
  i_hyp_ueberforderung: ['Überforderung|überfordert',
    'surcharge|dépassé|dépassée|exigences trop élevées',
    'overload|overwhelmed|too demanding'],
  i_hyp_unterforderung: ['Unterforderung|unterfordert|langweilt sich|Langeweile|hochbegabt',
    'manque de stimulation|s’ennuie|ennui|haut potentiel',
    'under-challenged|underchallenged|bored|boredom|gifted'],
  i_hyp_trauma: ['Trauma|traumatisch*|belastende Erfahrungen|Gewalterfahrung*|Misshandlung|Vernachlässigung',
    'trauma|traumatique|traumatiques|expériences éprouvantes|maltraitance|négligence',
    'trauma|traumatic|adverse experiences|maltreatment|neglect'],
  // 5.1 Bedürfnisse
  n_struktur: ['Struktur|Strukturen|vorhersehbar*|Ablauf|Abläufe|Tagesablauf|Routine|Routinen|Rituale',
    'structure|structures|prévisible|prévisibles|déroulement|routine|routines|rituels',
    'structure|structures|predictab*|routine|routines'],
  n_beziehung: ['Bezugsperson|Bezugspersonen|Vertrauensperson|Ansprechperson|verlässliche Person|feste Person|~Beziehung',
    'personne de référence|référence stable|personne de confiance|relation stable',
    'reference person|key person|trusted adult|stable relationship'],
  n_erfolg: ['Erfolgserlebnis*|Erfolg|Erfolge|positive Rückmeldung*|Lob|Ermutigung|Anerkennung|Bestätigung',
    'réussite|réussites|succès|retours positifs|encouragements|valorisation|éloges',
    'success|successes|positive feedback|praise|encouragement'],
  n_regulation: ['Regulation|Gefühle|Emotionen|beruhigen|Umgang mit Wut|Gefühlsregulation',
    'régulation|émotions|s’apaiser|gérer sa colère|gestion des émotions',
    'regulation|emotions|calm down|managing anger'],
  n_grenzen: ['Grenzen|Grenze|Konsequenz|konsequente|klare Regeln',
    'limites|limite|cohérence|cohérents|règles claires',
    'limits|boundaries|consistency|consistent|clear rules'],
  n_sozial: ['soziale Kompetenz*|sozialen Kompetenz*|soziale Fähigkeiten|Sozialtraining|soziales Lernen|Freundschaften',
    'compétences sociales|habiletés sociales|entraînement social',
    'social skills|social competence|social competencies'],
  n_organisation: ['Arbeitsorganisation|Organisation|Aufmerksamkeit|Strukturierungshilfe*|Arbeitsplan|Checkliste*|Zeitplan',
    'organisation du travail|organisation|attention|plan de travail|planification',
    'work organisation|organization|organisation|attention|checklist*|planning'],
  n_differenzierung: ['Differenzierung|differenziert*|angepasste Anforderungen|Anforderungen anpassen|individuelle Förderung|Nachteilsausgleich',
    'différenciation|différencié|différenciées|exigences adaptées|adapter les exigences',
    'differentiation|differentiated|adapted demands|adjusted demands|accommodations'],
  n_therapie: ['Therapie|therapeutisch*|Psychotherapie|Ergotherapie|Logopädie|Behandlung|Psychiatrie',
    'thérapie|thérapeutique|psychothérapie|ergothérapie|logopédie|suivi psychologique',
    'therapy|therapeutic|psychotherapy|occupational therapy|speech therapy|treatment'],
  n_familie: ['Unterstützung Familie|Familie unterstützen|Familie stärken|Stärkung Familie|Eltern unterstützen|Elternberatung|Erziehungsberatung|Elternarbeit|Familienhilfe',
    'soutien famille|soutenir famille|soutien parental|guidance parentale|soutien parents',
    'support family|family support|parent support|parenting support|support parents']
};
// Ohne Abschnitt: woran man die Sichtweise erkennt
const KONTEXT_BEREICH = {
  eltern: ['zu Hause', 'daheim', 'Mutter', 'Vater', 'Eltern', 'à la maison', 'mère', 'père', 'parents', 'at home', 'mother', 'father', 'parents'],
  beobachtung: ['Beobachtung', 'beobachtet', 'observation', 'observé', 'observée', 'observed'],
  kind: ['erzählt', 'berichtet selbst', 'sagt', 'raconte', 'dit', 'says', 'tells'],
  schule: ['Unterricht', 'Klasse', 'Lehrerin', 'Lehrer', 'Lehrperson', 'classe', 'enseignante', 'enseignant', 'cours', 'class', 'teacher', 'lesson']
};

// Stichwörter, Stufenwörter und Satzteil-Grenzen in die Vergleichsform bringen (einmal je Sprache)
function wortFolge(text, lang) {
  // "Wut*" -> [{ w: 'wut', pre: true }]
  const aus = [];
  String(text).trim().split(/\s+/).forEach(function (teil) {
    const pre = /\*$/.test(teil), ws = woerter(teil.replace(/\*$/, ''), lang).map(function (t) { return t.w; });
    ws.forEach(function (w, k) { aus.push({ w: w, pre: pre && k === ws.length - 1 }); });
  });
  return aus;
}
function freiWortschatz(L) {
  const lang = L.lang, li = SPRACHEN.indexOf(lang);
  const stich = [];
  Object.keys(FREI_STICH).forEach(function (id) {
    const def = FREI_STICH[id][li];
    if (!def) { return; }
    const e = L.woerter.eintraege.filter(function (x) { return x.id === id; })[0];
    if (!e) { return; }
    const muster = def.split('|').map(function (m) {
      m = m.trim();
      let gegen = false, schwach = false;
      while (/^[-~]/.test(m)) { if (m.charAt(0) === '-') { gegen = true; } else { schwach = true; } m = m.slice(1); }
      return { w: wortFolge(m, lang), gegen: gegen, schwach: schwach, text: m };
    }).filter(function (m) { return m.w.length; });
    stich.push({ e: e, muster: muster });
  });
  const S = STUFENWORTE[lang] || STUFENWORTE.de, stufen = {};
  Object.keys(S).forEach(function (k) {
    stufen[k] = S[k].split('|').map(function (t) { return wortFolge(t, lang).map(function (x) { return x.w; }); }).filter(function (f) { return f.length; })
      .sort(function (a, b) { return b.length - a.length; });
  });
  const kontext = {};
  Object.keys(KONTEXT_BEREICH).forEach(function (b) { kontext[b] = KONTEXT_BEREICH[b].map(function (t) { return wortFolge(t, lang).map(function (x) { return x.w; }); }); });
  return { stich: stich, stufen: stufen, kontext: kontext, gegensatz: new Set((GEGENSATZ[lang] || []).map(function (w) { return kanon(w, lang); })) };
}
function laenge(m) { return m.w.reduce(function (s, x) { return s + x.w.length; }, 0); }
function wortPasst(m, w) { return m.pre ? (w.length >= m.w.length && w.indexOf(m.w) === 0) : w === m.w; }
// Fundstelle eines Musters: Positionen der Wörter (alle innerhalb von 6 Wörtern um das erste) oder null
function musterFinden(worte, m, frei) {
  const n = worte.length, erstes = m.w[0];
  for (let i = 0; i < n; i++) {
    if (!frei[i] || !wortPasst(erstes, worte[i])) { continue; }
    const pos = [i];
    let ok = true;
    for (let k = 1; k < m.w.length && ok; k++) {
      let f = -1;
      // zuerst direkt dahinter (feste Wendungen), sonst in der Nähe
      if (i + k < n && frei[i + k] && pos.indexOf(i + k) < 0 && wortPasst(m.w[k], worte[i + k])) { f = i + k; }
      for (let j = Math.max(0, i - 6); f < 0 && j <= Math.min(n - 1, i + 6); j++) { if (frei[j] && pos.indexOf(j) < 0 && wortPasst(m.w[k], worte[j])) { f = j; } }
      if (f < 0) { ok = false; } else { pos.push(f); }
    }
    if (ok) { return pos; }
  }
  return null;
}
// Folge von Wörtern (Stufenwort) an Stelle i?
function folgeAn(worte, i, f) { for (let k = 0; k < f.length; k++) { if (worte[i + k] !== f[k]) { return false; } } return true; }
// Stufenwörter im Satzteil um die Fundstelle; das nächste gilt (bei gleichem Abstand das deutlichere)
function stufeFinden(worte, teil, pos, W, klassen, belegt) {
  let best = null;
  klassen.forEach(function (kl) {
    (W.stufen[kl] || []).forEach(function (f) {
      for (let i = 0; i + f.length <= worte.length; i++) {
        if (teil[i] !== teil[pos[0]]) { continue; }
        let frei = true;
        for (let k = 0; k < f.length; k++) { if (belegt[i + k] || teil[i + k] !== teil[pos[0]]) { frei = false; } }
        if (!frei || !folgeAn(worte, i, f)) { continue; }
        let d = 99;
        pos.forEach(function (p) { d = Math.min(d, p < i ? i - p : (p > i + f.length - 1 ? p - (i + f.length - 1) : 0)); });
        if (d > 12) { continue; }
        const rang = (KLASSE_RANG[kl] || 0) + f.length * 10;   // längere Wendung zuerst ("nicht immer" vor "nicht")
        if (!best || d < best.d || (d === best.d && rang > best.rang)) { best = { kl: kl, d: d, rang: rang, i: i, n: f.length }; }
      }
    });
  });
  return best;
}
function spiegel(band) { return band.map(function (r) { return 8 - r; }).sort(function (a, b) { return a - b; }); }
// Vorschläge für einen frei geschriebenen Satz: [{ id, bereich, band, sicher }] (höchstens 3)
const SCHWELLE_FREI = 0.5;
function freiVorschlaege(text, bereiche, L, weg, opt) {
  opt = opt || {};
  const lang = L.lang, W = L.frei || (L.frei = freiWortschatz(L));
  const sk = skelett(text, lang), worte = sk.toks.map(function (t) { return t.w; }), n = worte.length;
  if (!n) { return []; }
  // Satzteile: an ; : ( ) – und an Gegensatzwörtern
  const teil = [];
  let t = 0;
  for (let i = 0; i < n; i++) {
    if (i > 0 && (/[;:()–—]/.test(sk.s.slice(sk.toks[i - 1].bis, sk.toks[i].von)) || W.gegensatz.has(worte[i]))) { t++; }
    teil.push(t);
  }
  // Treffer je Aussage (längere Muster zuerst, ein Wort gehört nur einem Muster derselben Aussage)
  const treffer = [];
  W.stich.forEach(function (s) {
    if (bereiche && bereiche.indexOf(s.e.bereich) < 0) { return; }
    const offen = worte.map(function () { return true; });
    const funde = [];
    s.muster.slice().sort(function (a, b) { return (b.w.length - a.w.length) || (laenge(b) - laenge(a)); }).forEach(function (m) {
      const pos = musterFinden(worte, m, offen);
      if (!pos) { return; }
      pos.forEach(function (p) { offen[p] = false; });
      funde.push({ m: m, pos: pos });
    });
    if (funde.length) { treffer.push({ e: s.e, funde: funde }); }
  });
  const aus = [];
  const kontextBereich = function () {
    let best = null, zahl = 0;
    Object.keys(W.kontext).forEach(function (b) {
      let c = 0;
      W.kontext[b].forEach(function (f) { for (let i = 0; i < n; i++) { if (folgeAn(worte, i, f)) { c++; } } });
      if (c > zahl) { zahl = c; best = b; }
    });
    return best;
  };
  treffer.forEach(function (tr) {
    const e = tr.e, belegt = worte.map(function () { return false; });
    tr.funde.forEach(function (f) { f.pos.forEach(function (p) { belegt[p] = true; }); });
    // allgemeine Wörter ("Pause", "Lesen") zählen nur mit einem Stufenwort in der Nähe
    if (!opt.band) {
      tr.funde = tr.funde.filter(function (f) { return !f.m.schwach || stufeFinden(worte, teil, f.pos, W, ['hoch', 'eherHoch', 'mitte', 'eherTief', 'tief', 'nein', 'betont', e.skala], belegt); });
      if (!tr.funde.length) { return; }
    }
    let band = null, hinweis = false, weg2 = false;
    if (opt.band) { band = opt.band.slice(); hinweis = true; }
    else if (e.skala === 'std') {
      // je Fundstelle das nächste Stufenwort; eine Fundstelle mit Stufenwort geht vor
      const klassen = ['hoch', 'eherHoch', 'mitte', 'eherTief', 'tief', 'nein'].concat(e.pol === 0 ? ['betont'] : []);
      let wahl = null;
      tr.funde.forEach(function (f) {
        const st = stufeFinden(worte, teil, f.pos, W, klassen, belegt);
        const rang = st ? 2 : (f.m.gegen ? 1 : 0);
        const naeher = st && wahl && wahl.st && (st.d < wahl.st.d || (st.d === wahl.st.d && (KLASSE_RANG[st.kl] || 0) > (KLASSE_RANG[wahl.st.kl] || 0)));
        if (!wahl || rang > wahl.rang || naeher) { wahl = { f: f, st: st, rang: rang }; }
      });
      const kl = wahl.st ? wahl.st.kl : null;
      band = kl === 'betont' ? [6, 7] : (kl ? STUFE_KLASSE[kl].slice() : [5]);
      if (wahl.f.m.gegen) { band = spiegel(band); }
      hinweis = !!kl;
    } else {
      const f0 = tr.funde[0];
      const nein = stufeFinden(worte, teil, f0.pos, W, ['nein'], belegt);
      if (nein && nein.d <= 3) { weg2 = true; }
      const stark = stufeFinden(worte, teil, f0.pos, W, [e.skala], belegt) || (e.skala !== 'deutlich' ? null : stufeFinden(worte, teil, f0.pos, W, ['hoch'], belegt));
      band = e.skala === 'deutlich' ? (stark ? [5, 6, 7] : [4]) : (stark ? [6, 7] : [4, 5]);
      hinweis = !!stark;
    }
    if (weg2 || !band) { return; }
    const lang2 = tr.funde.some(function (f) { return f.m.w.length >= 2 || f.m.w[0].w.length >= 8; });
    let sicher = 0.45 + (hinweis ? 0.08 : 0) + (tr.funde.length >= 2 ? 0.05 : 0) + (lang2 ? 0.04 : 0);
    sicher = Math.round(Math.min(0.65, sicher) * 100) / 100;
    aus.push({ id: e.id, bereich: e.bereich, band: band, sicher: sicher, pos: tr.funde[0].pos[0], gewicht: tr.funde.length + (lang2 ? 1 : 0) });
  });
  // ohne Abschnitt: dieselben Wörter in mehreren Sichtweisen -> nach dem Zusammenhang
  if (!opt.band && bereiche && bereiche.length > 1 && aus.length > 1) {
    const kb = kontextBereich();
    const nachStelle = {};
    aus.forEach(function (v) { (nachStelle[v.pos] = nachStelle[v.pos] || []).push(v); });
    Object.keys(nachStelle).forEach(function (p) {
      const l = nachStelle[p];
      if (l.length < 2) { return; }
      const behalten = l.filter(function (v) { return v.bereich === kb; })[0] || l[0];
      l.forEach(function (v) { if (v !== behalten) { v.weg = true; } });
    });
  }
  let liste = aus.filter(function (v) { return !v.weg; });
  // Rückfall: Wortschatz der Satzvorlagen (etwa ein leicht geänderter Satz des Generators)
  if (!liste.length && !opt.nurStich) {
    const v = freiAehnlich(text, bereiche, L, weg);
    if (v) { liste = [v]; }
  }
  liste.sort(function (a, b) { return (b.sicher - a.sicher) || (b.gewicht - a.gewicht) || (a.pos - b.pos); });
  return liste.slice(0, opt.max || 3).map(function (v) { return { id: v.id, bereich: v.bereich, band: v.band, sicher: v.sicher }; });
}
// Ähnlichkeit mit den Formulierungen der Vorlagen (Inhaltswörter, nach Seltenheit gewichtet)
function freiAehnlich(text, bereiche, L, weg) {
  const lang = L.lang, lx = L.woerter, u = inhaltsStaemme(text, lang, weg);
  if (u.length < 2) { return null; }
  const idf = function (s) { return lx.idf[s] != null ? lx.idf[s] : Math.log(1 + lx.eintraege.length); };
  let best = null;
  lx.eintraege.forEach(function (e) {
    if (bereiche && bereiche.indexOf(e.bereich) < 0) { return; }
    let gem = 0, selten = false, gesamtE = 0;
    const genutzt = {};
    e.staemme.forEach(function (s) { gesamtE += idf(s); });
    u.forEach(function (x) {
      let bestS = 0, bestSt = null;
      e.staemme.forEach(function (s) { const g = stammGleich(x, s); if (g > bestS) { bestS = g; bestSt = s; } });
      if (bestS && !genutzt[bestSt]) { genutzt[bestSt] = 1; gem += bestS * idf(bestSt); if ((lx.df[bestSt] || 99) <= 2) { selten = true; } }
    });
    if (!selten || !gem) { return; }
    const gesamtU = u.reduce(function (s, x) { return s + idf(x); }, 0);
    const p = gem / gesamtU, r = gem / Math.min(gesamtE, gesamtU * 2);
    const score = 2 * p * r / (p + r);
    if (!best || score > best.score) { best = { e: e, score: score }; }
  });
  if (!best || best.score < SCHWELLE_FREI) { return null; }
  const e = best.e, W = L.frei || (L.frei = freiWortschatz(L));
  const sk = skelett(text, lang), worte = sk.toks.map(function (t) { return t.w; });
  const alle = worte.map(function () { return 0; }), belegt = worte.map(function () { return false; });
  let band;
  if (e.skala === 'std') {
    // Stufenwort irgendwo im Satz; sonst die ähnlichste der fünf Formulierungen
    let st = null;
    worte.forEach(function (w, i) { const s = stufeFinden(worte, alle, [i], W, ['hoch', 'eherHoch', 'mitte', 'eherTief', 'tief', 'nein'], belegt); if (s && (!st || KLASSE_RANG[s.kl] > KLASSE_RANG[st.kl])) { st = s; } });
    if (st) { band = STUFE_KLASSE[st.kl].slice(); }
    else {
      let bs = -1, stufe = null;
      (e.stufen || []).forEach(function (stm, i) {
        if (!stm) { return; }
        const g = stm.filter(function (s) { return u.some(function (x) { return stammGleich(x, s); }); }).length / (stm.length || 1);
        if (g > bs) { bs = g; stufe = i; }
      });
      band = stufe == null ? [4] : STUFE_BAND[stufe];
    }
  } else {
    let stark = false;
    worte.forEach(function (w, i) { if (stufeFinden(worte, alle, [i], W, [e.skala], belegt)) { stark = true; } });
    band = e.skala === 'deutlich' ? (stark ? [5, 6, 7] : [4]) : (stark ? [6, 7] : [4, 5]);
  }
  const sicher = Math.round((0.4 + 0.1 * Math.min(1, (best.score - SCHWELLE_FREI) / (1 - SCHWELLE_FREI))) * 100) / 100;
  return { id: e.id, bereich: e.bereich, band: band, sicher: sicher, pos: 0, gewicht: 0 };
}

// ---------- Sprache erkennen ----------
function spracheErkennen(text) {
  const k = ' ' + skText(String(text).slice(0, 60000), 'x') + ' ';
  const zaehle = function (worte) { return worte.reduce(function (n, w) { let i = 0, c = 0; while ((i = k.indexOf(' ' + w + ' ', i)) >= 0) { c++; i++; } return n + c; }, 0); };
  const de = zaehle(['der', 'die', 'das', 'und', 'nicht', 'sich', 'ist', 'mit', 'zu', 'im']);
  const fr = zaehle(['le', 'les', 'et', 'des', 'est', 'une', 'pas', 'avec', 'dans', 'du']);
  const en = zaehle(['the', 'and', 'is', 'of', 'with', 'to', 'in', 'was', 'has', 'for']);
  return fr > de && fr >= en ? 'fr' : (en > de && en > fr ? 'en' : 'de');
}

// ---------- Kopf- und Fußzeilen (PDF), Datum des Berichts ----------
const KOPF_FUSS = [/^\s*(Seite|Page)\s+\d+\s*(von|de|sur|of|\/)\s*\d+\s*$/i, /rue du Parc/i, /cc-cdse\.lu|www\.cdse\.lu|info@cc-cdse/i, /^\s*L-5374\b/i, /^\s*_{6,}\s*$/, /^\s*(Tel|Tél)\.?:?\s*247/i];
function kopfFussEntfernen(zeilen, x) {
  // wiederkehrende Zeilen nur in Text mit Seiten (PDF/OCR): "Seite 2 von 9", Seitenvorschub – und nur
  // nahe an einem Seitenwechsel (sonst verschwände eine Empfehlung, die in 5.2 und 5.3 steht)
  const seiten = zeilen.filter(function (z) { return KOPF_FUSS[0].test(z); }).length >= 2 || x.seitenvorschub;
  const nah = zeilen.map(function () { return false; });
  zeilen.forEach(function (z, i) {
    if (/\f/.test(z) || KOPF_FUSS.some(function (re) { return re.test(z.trim()); })) { for (let k = Math.max(0, i - 3); k <= Math.min(zeilen.length - 1, i + 3); k++) { nah[k] = true; } }
  });
  const zahl = {};
  zeilen.forEach(function (z, i) { const t = z.trim(); if (t && nah[i]) { zahl[t] = (zahl[t] || 0) + 1; } });
  const weg = zeilen.map(function (z, i) {
    const t = z.trim();
    if (!t) { return false; }
    const m = /^Munsbach,\s*(?:den|le)?\s*(.+?)\s*$/i.exec(t);
    if (m) { const d = datenImText(m[1], x.lang); if (d.length) { x.fakt('bericht_datum', d[0], 0.9, t); } return true; }
    if (KOPF_FUSS.some(function (re) { return re.test(t); })) { return true; }
    // Zeilen, die auf jeder Seite am Seitenwechsel wiederkehren (Name, Matricule im Seitenkopf)
    return !!(seiten && nah[i] && zahl[t] >= 2 && t.length <= 60 && !/^[☐☒☑□■✓✔✗xX\s]+$/.test(t) && !/[.!?:]$/.test(t));
  });
  // Seitenwechsel mitten im Satz: Leerzeilen dazwischen weg, damit der Absatz zusammenbleibt
  // (auch wenn die nächste Seite mit einem großgeschriebenen Wort beginnt). Mitten im Satz heißt:
  // kein Satzende, und die nächste Zeile beginnt klein oder hätte nicht mehr in die Zeile gepasst.
  const breite = zeilenBreite(zeilen), aus = [];
  let i = 0;
  while (i < zeilen.length) {
    if (!weg[i] && zeilen[i].trim()) { aus.push(zeilen[i]); i++; continue; }
    let j = i, umbruch = false;
    const leer = [];
    while (j < zeilen.length && (weg[j] || !zeilen[j].trim())) {
      if (weg[j] || /\f/.test(zeilen[j])) { umbruch = true; } else { leer.push(zeilen[j]); }
      j++;
    }
    const vor = aus.length ? aus[aus.length - 1].trim() : '', nach = j < zeilen.length ? zeilen[j].trim() : '';
    let verbinden = false;
    if (umbruch && vor && nach && !/[.!?]["“”»)]?$/.test(vor) && !PUNKT.test(nach)) {
      const erstes = nach.split(/\s+/)[0] || '';
      verbinden = /^[a-zà-öø-ÿ]/.test(nach) || !!(!/;["“”»)]?$/.test(vor) && !(/:["“”»)]?$/.test(vor) && ELDIB_ZIEL.test(nach)) && breite && vor.length + 1 + erstes.length > breite);
    }
    if (!verbinden) { leer.forEach(function (z) { aus.push(z); }); if (umbruch && !leer.length) { aus.push(''); } }
    i = j;
  }
  return aus;
}

// ---------- Überschriften und Abschnitte ----------
const TITEL_EXTRA = {
  auftrag: ['Auftrag', 'Demande de diagnostic', 'Referral question'], anamnese: ['Anamnèse'], vorgeschichte: ['Antécédents', 'Vorgeschichte des Kindes'],
  sozialbericht: ['Sozialanamnese', 'Bilan social'], aktuell: ['Aktuelle Situation des Kindes'],
  massnahmen: ['Mesures de soutien scolaires et extrascolaires actuelles :', 'Aktuelle Unterstützungsmaßnahmen', 'Aktuelle schulische und ausserschulische Unterstützungsmassnahmen'],
  schule: ['Sichtweise der Lehrperson'], kind: ['Sichtweise des Schülers/ der Schülerin', 'Sichtweise des Kindes', 'Point de vue de l’enfant'],
  eltern: ['Sichtweise der Eltern', 'Point de vue des parents/ tuteur·ice·s', 'Point de vue des parents'], verfahren: ['Diagnostisches Vorgehen'],
  beobachtung: ['Verhaltensbeobachtung', 'Observations'], eldib: ['Ergebnisse', 'Résultats'], deutung: ['Interprétation', 'Interpretationen'],
  schluss: ['Schlussfolgerungen', 'Conclusions'], beduerfnisse: ['Spezifische Bedürfnisse des Schülers/der Schülerin', 'Besoins spécifiques de l‘élève', 'Spezifische Bedürfnisse', 'Besoins spécifiques'],
  ziele: ['Förderziele', 'Objectifs de soutien'], empfehlungen: [], cni: ['Empfehlungen - CNI', 'Recommandations - CNI', 'Empfehlungen an die CNI', 'Recommandations à la CNI'],
  anhang: ['Anhang', 'Annexe'], interventionen: ['Übersicht der Interventionen', 'Aperçu des interventions'], raster: ['Résultats détaillés'],
  produktionen: ['Production de l‘élève', 'Produktionen']
};
let titelCache = null;
function titelListe() {
  if (titelCache) { return titelCache; }
  const T = tafeln(), aus = [];
  T.gliederung.forEach(function (g, ordnung) {
    const titel = [];
    SPRACHEN.forEach(function (l) { const t = (T.titel[l] || {})[g.id]; (Array.isArray(t) ? t : [t]).forEach(function (x) { if (x) { titel.push(x); } }); });
    (TITEL_EXTRA[g.id] || []).forEach(function (x) { titel.push(x); });
    const sk = {};
    titel.forEach(function (t) { SPRACHEN.forEach(function (l) { sk[skText(t, l).trim()] = 1; }); });
    aus.push({ id: g.id, nr: g.nr, e: g.e, ordnung: ordnung, sk: Object.keys(sk) });
  });
  titelCache = aus;
  return aus;
}
function aehnlich(a, b) {
  // normierte Levenshtein-Ähnlichkeit (0..1)
  if (a === b) { return 1; }
  const n = a.length, m = b.length;
  if (!n || !m) { return 0; }
  if (Math.abs(n - m) > Math.max(n, m) * 0.5) { return 0; }
  let vor = new Array(m + 1), jetzt = new Array(m + 1);
  for (let j = 0; j <= m; j++) { vor[j] = j; }
  for (let i = 1; i <= n; i++) {
    jetzt[0] = i;
    const ca = a.charCodeAt(i - 1);
    for (let j = 1; j <= m; j++) { jetzt[j] = Math.min(vor[j] + 1, jetzt[j - 1] + 1, vor[j - 1] + (ca === b.charCodeAt(j - 1) ? 0 : 1)); }
    const t = vor; vor = jetzt; jetzt = t;
  }
  return 1 - vor[m] / Math.max(n, m);
}
// Kandidat für eine Überschrift: { id, ordnung, score, toc }
function ueberschrift(zeile, lang) {
  let t = zeile.trim();
  if (!t || t.length > 140) { return null; }
  const nrM = /^(\d)\s*(?:[.,]\s*(\d)\s*)?[.)]?(?=\s|[A-Za-zÀ-ÿ])\s*/.exec(t);
  let nr = null;
  if (nrM) { nr = nrM[1] + (nrM[2] ? '.' + nrM[2] : ''); t = t.slice(nrM[0].length); }
  // Inhaltsverzeichnis: Seitenzahl am Ende (mit Punkten, Tab oder Leerzeichen)
  let toc = false;
  const seite = /(?:[\s.·…_\t-]{1,})(\d{1,3})\s*$/.exec(t);
  if (seite && seite.index > 0) { toc = true; t = t.slice(0, seite.index); }
  const k = skText(t, lang).trim();
  if (!k) { return null; }
  let best = null;
  titelListe().forEach(function (e) {
    let s = 0;
    e.sk.forEach(function (x) {
      if (x === k) { s = Math.max(s, 1); }
      else if (k.length >= 8 && x.length >= 8) { const a = aehnlich(k, x); if (a >= 0.86) { s = Math.max(s, a * 0.95); } }
    });
    if (nr && s && nr !== e.nr) { s *= (e.nr.indexOf('.') < 0 && nr.indexOf('.') < 0) ? 0.5 : 0.3; }
    if (nr && s && nr === e.nr) { s = Math.min(1, s + 0.05); }
    // eigene Überschrift mit bekannter Nummer (z. B. "3.2 Sichtweise der Klassenlehrerin")
    if (!s && nr && nr === e.nr && nr.indexOf('.') > 0 && !/[.!?;]$/.test(zeile.trim()) && k.split(' ').length <= 10) { s = 0.6; }
    if (s && (!best || s > best.score)) { best = { id: e.id, ordnung: e.ordnung, e: e.e, score: s }; }
  });
  if (best) { best.toc = toc; best.nr = nr; }
  return best;
}
// Abschnitte finden: Überschriften in aufsteigender Reihenfolge (längste Kette), ohne Inhaltsverzeichnis
function gliedern(zeilen, x) {
  const kand = [];
  let imToc = false, tocIds = {};
  zeilen.forEach(function (z, i) {
    const t = z.trim();
    if (!t) { return; }
    if (/^(Inhaltsverzeichnis|Inhalt|Table des matières|Sommaire|Table of contents|Contents)\s*:?$/i.test(t)) { imToc = true; tocIds = {}; kand.push({ i: i, tocKopf: true }); return; }
    const u = ueberschrift(t, x.lang);
    if (u && u.score >= 0.6) {
      // im Inhaltsverzeichnis: Zeilen mit Seitenzahl; die erste Überschrift, die sich wiederholt, beginnt den Text
      if (imToc && !u.toc && tocIds[u.id]) { imToc = false; }
      if (u.toc || imToc) { u.toc = true; tocIds[u.id] = 1; }
      u.i = i; kand.push(u); return;
    }
    imToc = false;
  });
  const echt = kand.filter(function (k) { return !k.toc && !k.tocKopf; });
  // längste aufsteigende Kette mit größter Summe
  const best = [], vorg = [];
  echt.forEach(function (k, a) {
    best[a] = k.score; vorg[a] = -1;
    for (let b = 0; b < a; b++) { if (echt[b].ordnung < k.ordnung && best[b] + k.score > best[a]) { best[a] = best[b] + k.score; vorg[a] = b; } }
  });
  let ende = -1;
  best.forEach(function (v, a) { if (ende < 0 || v > best[ende]) { ende = a; } });
  const kette = [];
  for (let a = ende; a >= 0; a = vorg[a]) { kette.unshift(echt[a]); }
  const tocZeilen = {};
  kand.forEach(function (k) { if (k.toc || k.tocKopf) { tocZeilen[k.i] = 1; } });
  const abschnitte = kette.map(function (k, n) {
    const bis = n + 1 < kette.length ? kette[n + 1].i : zeilen.length;
    return { id: k.id, titel: zeilen[k.i].trim(), zeilen: zeilen.slice(k.i + 1, bis) };
  });
  const erste = kette.length ? kette[0].i : zeilen.length;
  const vor = zeilen.slice(0, erste).filter(function (z, i) { return !tocZeilen[i]; });
  return { vor: vor, abschnitte: abschnitte };
}

// ---------- Absätze und Sätze ----------
// Umbrochener Text (PDF, OCR): viele lange Zeilen enden mitten im Satz und die nächste beginnt klein
function umbrochen(zeilen) {
  let lang = 0, mitten = 0;
  for (let i = 0; i + 1 < zeilen.length; i++) {
    const a = zeilen[i].trim(), b = zeilen[i + 1].trim();
    if (a.length < 40 || !b) { continue; }
    lang++;
    if (!/[.!?:;)]$/.test(a) && /^[a-zà-öø-ÿ]/.test(b)) { mitten++; }
  }
  return lang >= 5 && mitten / lang > 0.15;
}
const PUNKT = /^\s*(?:[•·▪◦‣∙●○■□•▪-]|[-–—*]\s)\s*/;
function bloecke(zeilen, umbrochenerText) {
  const aus = [];
  let akt = null, pause = false;
  zeilen.forEach(function (z) {
    const t = z.trim();
    if (!t) { pause = true; return; }
    const punkt = PUNKT.test(t) && !/^-\d/.test(t);
    const text = punkt ? t.replace(PUNKT, '').trim() : t;
    const warPause = pause, klein = /^[a-zà-öø-ÿ]/.test(text);
    // Satzende; ein Doppelpunkt am Zeilenende nur, wenn die nächste Zeile nicht klein weitergeht
    // im umbrochenen Text endet am Zeilenende kein Absatz nach "bzw.", "am 12." / "35. Woche", in einer
    // offenen Klammer oder nach einem Doppelpunkt (außer vor einem Lernziel "V-5 – …")
    const abk = !!(umbrochenerText && akt && /\.$/.test(akt.text) && (ABK.test(akt.text) || /(^|\s)\p{L}\.$/u.test(akt.text) ||
      (/(^|\s)\d{1,2}\.$/.test(akt.text) && (/^[A-ZÄÖÜ][a-zäöüß]/.test(text) || new RegExp('^(' + MONAT_RE + ')', 'i').test(basisText(text.slice(0, 12)))))));
    const klammer = !!(umbrochenerText && akt && akt.text.split('(').length > akt.text.split(')').length);
    const doppelpunkt = !!(akt && /:["“”»)]?$/.test(akt.text) && (umbrochenerText ? ELDIB_ZIEL.test(text) : !klein));
    const ende = akt && !abk && !klammer && (/[.!?]["“”»)]?$/.test(akt.text) || doppelpunkt);
    // Leerzeile: neuer Absatz – außer der Satz geht klein weiter oder (umbrochener Text, etwa über einen
    // Seitenwechsel) nach einer Abkürzung oder in einer offenen Klammer
    const weiter = (klein && !ende) || !!(umbrochenerText && !punkt && (abk || klammer));
    if (pause && akt && !weiter) { akt = null; }
    pause = false;
    if (!akt || punkt || akt.punkt || ende || /\t/.test(t)) {
      akt = { text: text, punkt: punkt, zeilen: [t], nachLeer: warPause };
      aus.push(akt);
    } else { akt.text += ' ' + text; akt.zeilen.push(t); }
  });
  return aus;
}
const ABK = /(?:^|[\s(])(?:z|u|d|s|o|v|i|e|ca|bzw|ggf|evtl|inkl|usw|etc|vgl|bspw|Nr|Dr|Hr|Fr|Mme|Mlle|Mr|Mrs|Ms|St|M|p|ex|cf|env|resp|no|vs|al|Tel|Tél|Prof|Dipl|min|max)\.$/i;
function saetze(text) {
  const aus = [];
  let von = 0;
  // Klammertiefe je Stelle: in Klammern endet kein Satz ("(Frühgeburt in der 35. Woche)")
  const tiefe = [];
  let t = 0;
  for (let i = 0; i < text.length; i++) { const ch = text.charAt(i); if (ch === '(') { t++; } else if (ch === ')' && t > 0) { t--; } tiefe.push(t); }
  const re = /[.!?…]+["“”»)]*\s+(?=[„"“«(]?[A-ZÀ-ÖØ-Þ0-9])/g;
  let m;
  while ((m = re.exec(text))) {
    const vor = text.slice(von, m.index + 1).trim(), nach = text.slice(m.index + m[0].length);
    if (tiefe[m.index]) { continue; }
    if (/[.]$/.test(vor) && (ABK.test(vor) || /(^|\s)\p{L}\.$/u.test(vor))) { continue; }
    // Datum und Ordnungszahl: "12. März", "in der 35. Woche", "die 2. Klasse"
    if (/(^|\s)\d{1,2}\.$/.test(vor) && (new RegExp('^(' + MONAT_RE + ')', 'i').test(basisText(nach.slice(0, 12))) || /^[A-ZÄÖÜ][a-zäöüß]/.test(nach))) { continue; }
    const s = text.slice(von, m.index + m[0].length).trim();
    if (s) { aus.push(s); }
    von = m.index + m[0].length;
  }
  const rest = text.slice(von).trim();
  if (rest) { aus.push(rest); }
  return aus;
}
function basisText(s) { return String(s).split('').map(basis).join(''); }

// ---------- Ergebnis sammeln ----------
function neuerKontext(L, opt) {
  const erg = { sprache: L.lang, herkunft: 'frei', name: '', geschlecht: '', bewertungen: {}, chips: {}, f: {}, frei: {}, tabellen: { vorgeschichte: [], aktuell: [], interventionen: [] }, abschnitte: {}, unbekannt: [] };
  const x = { L: L, lang: L.lang, erg: erg, opt: opt, namen: [], namenZahl: {}, g: { m: 0, w: 0, n: 0 }, zahl: { einheiten: 0, vorlage: 0 }, merk: {}, verfahren: null, folge: [], listenFolge: [] };
  x.fakt = function (feld, wert, sicher, beleg) {
    if (wert == null || wert === '' || (typeof wert === 'number' && isNaN(wert))) { return; }
    const alt = erg.f[feld];
    if (!alt || sicher > alt.sicher) { erg.f[feld] = { wert: wert, beleg: beleg || '', sicher: sicher }; }
  };
  x.chip = function (gruppe, key, sicher, beleg) {
    if (!gruppe || !key) { return; }
    const l = erg.chips[gruppe] || (erg.chips[gruppe] = []);
    const da = l.filter(function (c) { return c.key === key; })[0];
    if (da) { if (sicher > da.sicher) { da.sicher = sicher; da.beleg = beleg || da.beleg; } return; }
    l.push({ key: key, beleg: beleg || '', sicher: sicher });
  };
  x.frei = function (feld, text, zeilen) {
    text = String(text == null ? '' : text).trim();
    if (!feld || !text) { return; }
    const alt = erg.frei[feld];
    if (!alt) { erg.frei[feld] = text; return; }
    if (alt.indexOf(text) >= 0) { return; }
    erg.frei[feld] = alt + (zeilen ? '\n' : '\n\n') + text;
  };
  x.bewertung = function (id, band, sicher, beleg, abschnitt, art) {
    if (!id || !band || !band.length) { return; }
    const alt = erg.bewertungen[id];
    if (alt && alt.sicher >= sicher) { return; }
    erg.bewertungen[id] = { wert: vertreter(band), sicher: sicher, beleg: beleg || '', abschnitt: abschnitt || null, band: band.slice(), art: art || 'vorlage' };
  };
  x.unbekannt = function (text) { text = String(text || '').trim(); if (text && erg.unbekannt.indexOf(text) < 0) { erg.unbekannt.push(text); } };
  // bekannte Namen (Aufrufer, Deckblatt, Auftrag) als Skelett
  x.nameDazu = function (text, zaehlen) {
    const t = String(text || '').trim();
    if (!t) { return; }
    const teile = t.indexOf(',') >= 0 ? [t.split(',').slice(1).join(',').trim(), t.split(',')[0].trim()] : t.split(/\s+/);
    const voll = teile.filter(Boolean).join(' ');
    [voll, teile[0], teile.slice().reverse().join(' ')].concat(teile).forEach(function (n) { const k = skText(n, x.lang).trim(); if (k && k.length >= 2 && x.namen.indexOf(k) < 0) { x.namen.push(k); } });
    if (zaehlen) { const k = skText(teile[0] || t, x.lang).trim(); x.namenZahl[k] = (x.namenZahl[k] || 0) + zaehlen; }
  };
  if (opt.vorname) { x.nameDazu(opt.vorname, 5); }
  if (opt.name) { x.nameDazu(opt.name, opt.vorname ? 0 : 3); }
  if (opt.geschlecht === 'm' || opt.geschlecht === 'w') { x.g[opt.geschlecht] += 100; }
  return x;
}
const GENERISCH = { de: ['das kind', 'der schuler', 'die schulerin', 'der junge', 'das madchen', 'der jugendliche', 'die jugendliche'], fr: ['l eleve', 'l enfant', 'le jeune', 'l adolescent', 'l adolescente'], en: ['the student', 'the child', 'the pupil', 'the young person'] };
const ARTIKEL = { de: ['der', 'die', 'das', 'ein', 'eine'], fr: ['l', 'un', 'une'], en: ['the', 'a', 'an'] };
// Platzhalter für die Person prüfen: Pronomen, bekannter Name, "das Kind" – oder ein großgeschriebener Name
function personenOk(w, x) {
  const L = x.L;
  return w._gruppen.every(function (e) {
    if (!e || e.g.typ !== 'person') { return true; }
    const k = e.roh;
    if (L.pronWoerter[k] || L.kindWorte.indexOf(k) >= 0 || x.namen.indexOf(k) >= 0) { return true; }
    if ((GENERISCH[x.lang] || []).indexOf(k) >= 0) { return true; }
    const erstes = k.split(' ')[0];
    if ((ARTIKEL[x.lang] || []).indexOf(erstes) >= 0 && k.split(' ').length === 2) { return true; }
    if (x.namen.length && x.namenFest) { return false; }
    const stop = lexStopp[x.lang] || new Set();
    return /^[A-ZÀ-ÖØ-Þ]/.test(e.orig) && !k.split(' ').some(function (t) { return stop.has(t) || L.pronWoerter[t]; }) && k.split(' ').length <= 3;
  });
}
// Name aus mehreren Wörtern ("Anna-Lena", im Skelett "anna lena") direkt vor einem freien Text: der
// Platzhalter für die Person fängt zuerst nur das erste Wort – mit einem bekannten Namen verlängern
function namenStrecken(w, sk, x) {
  const g = w._gruppen;
  for (let i = 0; i + 1 < g.length; i++) {
    const e = g[i], n = g[i + 1];
    if (!e || !n || e.g.typ !== 'person' || n.g.typ !== 'text' || e.b == null || n.a == null || !n.roh) { continue; }
    const nw = n.roh.split(' ');
    for (let k = Math.min(2, nw.length - 1); k >= 1; k--) {
      const voll = e.roh + ' ' + nw.slice(0, k).join(' ');
      if (x.namen.indexOf(voll) < 0) { continue; }
      const grenze = n.a + nw.slice(0, k).join(' ').length;
      e.roh = voll; e.b = grenze; e.orig = ausschnitt(sk, e.a - 1, grenze);
      n.roh = nw.slice(k).join(' '); n.a = grenze + 1; n.orig = ausschnitt(sk, n.a - 1, n.b); n.wert = String(n.orig || n.roh).trim();
      if (n.g.key && w['_' + n.g.key] === n) { w[n.g.key] = n.wert; }
      if (e.g.key && w['_' + e.g.key] === e) { w[e.g.key] = e.orig; }
      break;
    }
  }
  return w;
}
// Geschlecht und Name aus den Platzhaltern
function stimmen(w, x) {
  const L = x.L;
  w._gruppen.forEach(function (e) {
    if (!e) { return; }
    if (e.g.typ === 'person' || e.g.typ === 'pron') {
      const g = L.pronWoerter[e.roh];
      if (g) { x.g[g]++; return; }
      if (e.g.typ === 'person' && x.namen.indexOf(e.roh) < 0 && (GENERISCH[x.lang] || []).indexOf(e.roh) < 0 && L.kindWorte.indexOf(e.roh) < 0 && /^[A-ZÀ-ÖØ-Þ]/.test(e.orig)) {
        x.namenZahl[e.roh] = (x.namenZahl[e.roh] || 0) + 1;
        if (x.namenZahl[e.roh] >= 2 && x.namen.indexOf(e.roh) < 0) { x.namen.push(e.roh); }
      } else if (e.g.typ === 'person' && x.namen.indexOf(e.roh) >= 0) { x.namenZahl[e.roh] = (x.namenZahl[e.roh] || 0) + 1; }
    }
    if (e.g.typ === 'geschlecht' && e.wert >= 0) { x.g[['m', 'w', 'n'][e.wert] || 'n'] += 1; }
  });
}

// Hilfen für die Faktensätze (an einen Satz gebunden)
function helfer(x, beleg, sicher, abschnitt) {
  const L = x.L, lang = x.lang;
  const h = {
    f: function (feld, wert, s) { x.fakt(feld, wert, s || sicher, beleg); },
    chip: function (gruppe, key, s) { x.chip(gruppe, key, s || sicher, beleg); },
    frei: function (feld, text) { if (text) { x.frei(feld, text); } },
    merke: function (k, v) { x.merk[k] = v; },
    worte: function (n) { if (n != null && !isNaN(n)) { h.f('erste_worte', String(n)); } },
    ohneVorwort: function (t) {
      t = String(t || '').trim();
      const m = /^(?:à l['’]école |à l['’]|au |à la )(.+)$/.exec(t) || /^(?:a l['’]ecole |a l['’]|a la )(.+)$/i.exec(t);
      return m ? m[1] : t;
    },
    auftraggeber: function (wer) {
      if (!wer) { return; }
      const O = (DS_TEXTE[lang] || DS_TEXTE.de).optionen.auftraggeber, k = skText(wer, lang).trim();
      const key = Object.keys(O).filter(function (a) { return skText(O[a][1], lang).trim() === k; })[0];
      if (key) { h.f('auftraggeber', key); } else { h.f('auftraggeber', 'andere'); h.frei('auftraggeber_andere', wer); }
    },
    wem: function (text, formen, vor) {
      let t = String(text || '').trim();
      if (!t) { return; }
      if (formen.w && skText(t, lang).trim() === skText(formen.w, lang).trim()) { x.g.w += 2; return; }
      if (formen.m && skText(t, lang).trim() === skText(formen.m, lang).trim()) { return; }
      if (vor) { t = t.replace(new RegExp('^' + vor.replace(/['’]/g, "['’]") + '\\s*', 'i'), ''); }
      if (t && L.kindWorte.indexOf(skText(t, lang).trim()) < 0 && /^[A-ZÀ-ÖØ-Þ]/.test(t)) { x.nameDazu(t, 2); x.erg.name = x.erg.name || t; x.vollname = t; }
    },
    liste: function (e, liste, o) { return listeAnwenden(e, liste, o || {}, x, beleg, sicher, abschnitt); },
    listeDetails: function (e, gruppe, detailsFeld) { return listeAnwenden(e, 'chip:' + gruppe, { details: detailsFeld }, x, beleg, sicher, abschnitt); },
    diagnosen: function (e) { return listeAnwenden(e, 'chip:diagnosen', { details: 'diagnosen_details', rest: 'diagnose_andere', andere: 'andere' }, x, beleg, sicher, abschnitt); },
    zieleBis: function (e) {
      const d = e ? datenImText(e.orig, lang) : [];
      if (d.length) { h.f('ziele_bis', d[0]); }
      else if (e && /semest/i.test(e.orig)) { x.merk.semester = true; }
    },
    verfahren: function (e, wo) { x.verfahren = { e: e, wo: wo, beleg: beleg, sicher: sicher }; }
  };
  return h;
}
// Aufzählung lesen: Glieder der Liste suchen, Rest als "andere"/Freitext; Details in Klammern
function listeLesen(text, muster, x) {
  const sk = skelett(text, x.lang), belegt = new Array(sk.toks.length).fill(false), treffer = [];
  const sortiert = muster.slice().sort(function (a, b) { return b.literal - a.literal; });
  sortiert.forEach(function (p) {
    p.suche.lastIndex = 0;
    let m;
    while ((m = p.suche.exec(sk.k))) {
      const r = wortBereich(sk, m.index, m.index + m[0].length);
      if (m[0].length === 0) { p.suche.lastIndex++; continue; }
      if (!r) { continue; }
      let frei = true;
      for (let i = r.i; i <= r.j; i++) { if (belegt[i]) { frei = false; } }
      if (!frei) { continue; }
      const w = werteAus(m, p, sk, x.L);
      if (!personenOk(w, x)) { continue; }
      namenStrecken(w, sk, x);
      for (let i = r.i; i <= r.j; i++) { belegt[i] = true; }
      treffer.push({ p: p, i: r.i, j: r.j, w: w, bis: r.bis });
    }
  });
  treffer.sort(function (a, b) { return a.i - b.i; });
  // Details in Klammern direkt nach einem Glied
  treffer.forEach(function (t) {
    const nach = sk.s.slice(t.bis), km = /^\s*\(((?:[^()]|\([^()]*\))*)\)/.exec(nach);
    if (km) {
      t.details = km[1].trim();
      const ende = t.bis + km[0].length;
      for (let i = t.j + 1; i < sk.toks.length && sk.toks[i].von < ende; i++) { belegt[i] = true; }
    }
  });
  // Rest: zusammenhängende, nicht belegte Wörter (ohne Bindewörter) als Originaltext
  const BIND = { de: ['und', 'oder', 'sowie', 'bzw'], fr: ['et', 'ou', 'ainsi', 'qu'], en: ['and', 'or', 'as', 'well'] }[x.lang] || [];
  const rest = [];
  let a = -1;
  for (let i = 0; i <= sk.toks.length; i++) {
    const offen = i < sk.toks.length && !belegt[i];
    if (offen && a < 0) { a = i; }
    if (!offen && a >= 0) {
      let v = a, b = i - 1;
      while (v <= b && BIND.indexOf(sk.toks[v].w) >= 0) { v++; }
      while (b >= v && BIND.indexOf(sk.toks[b].w) >= 0) { b--; }
      if (v <= b) {
        const stueck = sk.s.slice(sk.toks[v].von, sk.toks[b].bis);
        // an Kommas und Bindewörtern trennen, aber nicht in Klammern
        const teile = [];
        let tiefe = 0, von = 0;
        for (let q = 0; q < stueck.length; q++) {
          const ch = stueck.charAt(q);
          if (ch === '(') { tiefe++; } else if (ch === ')') { tiefe = Math.max(0, tiefe - 1); }
          else if (!tiefe && (ch === ',' || ch === ';')) { teile.push(stueck.slice(von, q)); von = q + 1; }
        }
        teile.push(stueck.slice(von));
        teile.forEach(function (tt) { tt.split(/\s+(?:und|oder|sowie|et|ou|ainsi que|and|or|as well as)\s+(?![^(]*\))/).forEach(function (s) { s = s.trim(); if (s) { rest.push({ text: s, pos: v }); } }); });
      }
      a = -1;
    }
  }
  return { treffer: treffer, rest: rest };
}
function listeAnwenden(e, liste, o, x, beleg, sicher, abschnitt) {
  if (!e) { return null; }
  let text = e.orig || e.roh || '';
  const gruppe = liste.indexOf('chip:') === 0 ? liste.slice(5) : null;
  // EN: "behavioral difficulties at school and at home" steht für beide Verhaltens-Chips
  if (o.beide) {
    const re = new RegExp(o.beide.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    if (re.test(text)) { x.chip('anlass', 'verhalten_schule', sicher, beleg); x.chip('anlass', 'verhalten_zuhause', sicher, beleg); text = text.replace(re, ' '); }
  }
  const erg = listeLesen(text, x.L.listen[liste] || [], x);
  // in der Reihenfolge der Aufzählung (die Reihenfolge der Auswahl steht im Text), "andere" an seiner Stelle
  const folge = erg.treffer.map(function (t) { return { pos: t.i, t: t }; }).concat(erg.rest.map(function (r) { return { pos: r.pos, r: r }; }));
  folge.sort(function (a, b) { return a.pos - b.pos; });
  let andere = false;
  const details = function (key, text, s) { const d = (x.erg.f[o.details] && x.erg.f[o.details].wert) || {}; d[key] = text; x.fakt(o.details, d, s, beleg); };
  folge.forEach(function (e) {
    if (e.t) {
      const t = e.t, s = t.p.beschriftung ? Math.min(sicher, 0.85) : sicher;
      if (gruppe) { x.chip(gruppe, t.p.key, s, beleg); if (o.details && t.details) { details(t.p.key, t.details, s); } }
      else if (o.band) { x.bewertung(t.p.id, o.band, s, beleg, abschnitt, 'vorlage'); }
      stimmen(t.w, x);
    } else if (o.rest && o.andere && !andere) { x.chip(gruppe, o.andere, sicher, beleg); andere = true; }
  });
  if (o.band && o.sortiert && erg.treffer.length > 1) {
    x.listenFolge.push(erg.treffer.map(function (t) { return { id: t.p.id, platz: t.p.platz, band: o.band }; }));
  }
  if (erg.rest.length) {
    if (o.rest) {
      let r = erg.rest.map(function (z) { return z.text; }).join(', ');
      // "eine Tic-Störung (2024)": Details der anderen Diagnose in Klammern
      const km = o.details && o.andere ? /^(.*?)\s*\(([^()]*)\)\s*$/.exec(r) : null;
      if (km) { r = km[1]; details(o.andere, km[2], sicher); }
      x.frei(o.rest, r);
    } else {
      // eigene Glieder in einer Aufzählung der Vorlage (von Hand ergänzt): Vorschlag über die Stichwörter
      // mit dem Band des Rahmensatzes; der ganze Satz bleibt zusätzlich als Freitext erhalten
      const bereich = !gruppe && o.band ? liste.split(':')[1] : null, weg = wegWorte(x), stop = lexStopp[x.lang] || new Set();
      // nur Reste mit eigenem Inhalt (nicht Teile des Namens, Pronomen, Füllwörter)
      const echt = erg.rest.filter(function (z) { return woerter(z.text, x.lang).some(function (t) { return t.w.length >= 3 && !weg.has(t.w) && !stop.has(t.w) && !/^\d+$/.test(t.w); }); });
      echt.forEach(function (z) {
        const vs = bereich ? freiVorschlaege(z.text, [bereich], x.L, weg, { band: o.band, nurStich: true, max: 1 }) : [];
        if (vs.length) { x.bewertung(vs[0].id, vs[0].band, 0.6, beleg, abschnitt, 'frei'); } else { x.unbekannt(z.text); }
      });
      if (echt.length) { x.restOffen = true; }
    }
  }
  return erg;
}
// Rahmensatz (s.*) auswerten
function rahmenAnwenden(p, w, x, beleg, sicher, abschnitt) {
  const R = RAHMEN[p.key];
  if (R.liste) { listeAnwenden(w._liste, R.liste, { band: R.band, sortiert: R.sortiert }, x, beleg, sicher, abschnitt); }
  if (R.listen) { Object.keys(R.listen).forEach(function (v) { listeAnwenden(w['_' + v], R.listen[v][0], { band: R.listen[v][1], sortiert: R.sortiert }, x, beleg, sicher, abschnitt); }); }
  if (R.feldDatum && w.datum) { x.fakt(R.feldDatum, w.datum, sicher, beleg); }
  if (R.feldQuelle) {
    w._gruppen.forEach(function (e) { if (e && e.g.typ === 'quelle' && e.wert) { x.fakt(R.feldQuelle, e.wert, sicher, beleg); } });
  }
  if (R.wirkung === 'vertrauen' && w.text) { x.frei('vertrauensperson', w.text); }
  if (R.wirkung === 'trauma') { x.bewertung('i_hyp_trauma', [4, 5, 6, 7], sicher, beleg, abschnitt, 'vorlage'); }
  if (R.wirkung === 'beob' && w._beob) { beobachtungenLesen(w._beob.orig, x, beleg, sicher); }
  if (R.p2) { x.merk.p2 = true; }
}
// "am 18.02.2026 im Klassenverband (45 Minuten) und am 20.02.2026 in der Pause (20 Minuten)",
// auch ohne Datum ("in der Maison Relais (50 Minuten) und am 04.03.2025 …") oder ohne Ort.
// Jeder Eintrag hat die Form [am Datum][ Ort][ (Dauer Minuten)]; zwischen den Einträgen steht
// ", ", "und" bzw. "sowie" (FR "et", "ainsi que"; EN "and"). Gesucht werden Anker (Datum, bekannter
// Ort, Dauer); was dazwischen steht und kein Trennwort ist, ist ein eigener Ort (setting_andere).
const BEOB_TRENN = /,|\s(?:und|sowie|et|ainsi que|and|as well as)(?=\s)/;
function beobachtungenLesen(text, x, beleg, sicher) {
  const O = (DS_TEXTE[x.lang] || DS_TEXTE.de).optionen.setting, lang = x.lang;
  const sk = skelett(text, lang), k = sk.k + ' ';
  const anker = [];
  const finde = function (re, typ, wert) {
    let m;
    while ((m = re.exec(k))) { if (!m[0].length) { re.lastIndex++; continue; } anker.push({ a: m.index, b: m.index + m[0].length, typ: typ, wert: wert(m) }); }
  };
  finde(new RegExp(' (?:am|le|l|on) ' + DATUM_RE + '(?= )', 'g'), 'datum', function (m) { return isoAusSkelett(m[1]); });   // "le" heißt im Skelett "l"
  Object.keys(O).forEach(function (key) {
    const t = skText(O[key], lang).trim();
    if (t) { finde(new RegExp(' ' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?= )', 'g'), 'setting', function () { return key; }); }
  });
  finde(/ (\d{1,3}) (?:minuten|minutes|minute|min)(?= )/g, 'dauer', function (m) { return m[1]; });
  anker.sort(function (p, q) { return (p.a - q.a) || ((q.b - q.a) - (p.b - p.a)); });
  const fest = [];
  anker.forEach(function (an) { if (!fest.length || an.a >= fest[fest.length - 1].b) { fest.push(an); } });
  // Lücken im Originaltext: Trennwörter und eigene Orte
  const folge = [];
  let trenn = false;
  const luecke = function (von, bis) {
    const teile = (' ' + sk.s.slice(von, bis) + ' ').replace(/[()]/g, ' ').split(BEOB_TRENN);
    teile.forEach(function (t, i) {
      if (i > 0) { trenn = true; }
      t = t.replace(/\s+/g, ' ').trim();
      if (t && /[\p{L}\d]/u.test(t)) { folge.push({ typ: 'setting', frei: t, trennVor: trenn }); trenn = false; }
    });
  };
  let pos = 0;
  fest.forEach(function (an) {
    const r = wortBereich(sk, an.a, an.b);
    if (!r) { return; }
    luecke(pos, r.von);
    folge.push({ typ: an.typ, wert: an.wert, trennVor: trenn, orig: sk.s.slice(r.von, r.bis) });
    trenn = false;
    pos = r.bis;
  });
  luecke(pos, sk.s.length);
  const RANG = { datum: 0, setting: 1, dauer: 2 }, liste = [];
  let akt = null, rangVor = -1;
  folge.forEach(function (an, i) {
    const r = RANG[an.typ];
    // eigener Ort, der mit einem bekannten beginnt oder endet ("in der Pause auf dem Schulhof"): ein Ort
    const vor = i > 0 ? folge[i - 1] : null;
    if (akt && an.typ === 'setting' && vor && vor.typ === 'setting' && !an.trennVor && (an.frei || vor.frei)) {
      akt.setting_andere = (vor.frei || vor.orig) + ' ' + (an.frei || an.orig); delete akt.setting;
      return;
    }
    if (!akt || an.trennVor || r <= rangVor) { akt = {}; liste.push(akt); }
    if (an.typ === 'datum') { akt.datum = an.wert; } else if (an.typ === 'dauer') { akt.dauer = an.wert; } else if (an.frei) { akt.setting_andere = an.frei; } else { akt.setting = an.wert; }
    rangVor = r;
  });
  const gut = liste.filter(function (b) { return b.datum || b.setting || b.setting_andere || b.dauer; });
  if (gut.length) { x.fakt('beobachtungen', gut, sicher, beleg); }
}

// ---------- Anleitungen und Reste der CNI-Vorlage ----------
const VORLAGE_REST = [/^ELDiB \(Entwicklungstherapeutischer\/Entwicklungspädagogischer Lernziel-Diagnose-Bogen\)\s*:\s*$/i, /^(V\/K\/KOG\/SOZ|C\/COM\/COG\/SOC)\b/, /^Von … bis/, /^SCAS, CPI, ESEB Dir\./,
  /^Du … au/, /^Depuis …$/, /^Name des Verfassers des Berichts/, /^Berufsbezeichnung$/, /^\(?Nom prénom de l/, /^\(profession\)$/, /^Name of the author/, /^Position$/];
function istAnleitung(text) {
  const t = String(text || '').trim();
  if (!t) { return true; }
  if (/^(oder|ou|or)$/i.test(t)) { return true; }
  if (VORLAGE_REST.some(function (re) { return re.test(t); })) { return true; }
  // ganz in Klammern: graue Anleitung der Vorlage "(…)"
  if (t.charAt(0) === '(' && /\)\.?$/.test(t)) {
    let tiefe = 0;
    for (let i = 0; i < t.length; i++) {
      if (t.charAt(i) === '(') { tiefe++; } else if (t.charAt(i) === ')') { tiefe--; if (tiefe === 0 && i < t.length - 2) { return false; } }
    }
    return true;
  }
  return false;
}
// Satz der Vorlage mit offenen Lücken: "wurde am (Datum) …", "bei … (Name der Lehrperson)"
function istVorlagensatz(text) {
  return /(…|\.\.\.)/.test(text) || /\((Datum|Name des|Name der|nom de l|nom et lieu|Name und Ort|Ortschaft|lieu|ESEB Referenzperson|personne de référence|siehe ELDiB|voir ELDiB|anhand von|présenter|spezifische Auffälligkeiten|indiquer brièvement|ISA \/ Conseil)/i.test(text);
}

// ---------- Kandidaten (Muster) je Abschnitt ----------
const NACHBARN = { schule: ['kind', 'eltern'], kind: ['schule', 'eltern'], eltern: ['schule', 'kind'], anamnese: ['vorgeschichte'], massnahmen: ['aktuell'] };
function abschnittVon(p) { return p.ab || BEREICH_ABSCHNITT[p.bereich] || null; }
function kandidaten(abId, x) {
  const L = x.L, c = L.kand || (L.kand = {}), key = abId || '*';
  if (c[key]) { return c[key]; }
  const l = [];
  L.muster.forEach(function (p) {
    const a = abschnittVon(p);
    if (!abId || a === abId || (NACHBARN[abId] || []).indexOf(a) >= 0) { l.push({ p: p, eigen: !abId || a === abId }); }
  });
  l.sort(function (a, b) { return (b.eigen - a.eigen) || (b.p.literal - a.p.literal) || (a.p.nr - b.p.nr); });
  c[key] = l;
  return l;
}
const BEREICH_FUER = { schule: ['schule'], kind: ['kind'], eltern: ['eltern'], beobachtung: ['beobachtung'], deutung: ['deutung'], beduerfnisse: ['beduerfnisse'] };
const ELDIB_CODE = { v: 'verhalten', k: 'kommunikation', soz: 'sozialisation', kog: 'kognition', comp: 'verhalten', comm: 'kommunikation', soc: 'sozialisation', cog: 'kognition', beh: 'verhalten', com: 'kommunikation' };
function eldibBereich(w, x) {
  const c = String(w.code || '').trim();
  const k = skText(c, 'x').trim();
  if (ELDIB_CODE[k]) { return ELDIB_CODE[k]; }
  const n = skText(w.bereich || '', 'x');
  const namen = { verhalten: /verhalten|comportement|behavior/, kommunikation: /kommunikation|communication/, sozialisation: /sozialisation|socialisation|socialization/, kognition: /kognition|cognition|academics/ };
  return Object.keys(namen).filter(function (b) { return namen[b].test(n); })[0] || null;
}
function wegWorte(x) {
  if (x.weg && x.wegNamen === x.namen.length) { return x.weg; }
  const s = new Set(['jedoch', 'toutefois', 'cependant', 'revanche', 'however', 'contrast']);
  Object.keys(x.L.pronWoerter).forEach(function (k) { k.split(' ').forEach(function (w) { s.add(w); }); });
  x.namen.forEach(function (n) { n.split(' ').forEach(function (w) { s.add(w); }); });
  x.L.kindWorte.forEach(function (n) { n.split(' ').forEach(function (w) { s.add(w); }); });
  x.weg = s; x.wegNamen = x.namen.length;
  return s;
}
function literalSkelett(p, L) {
  const t = String(p.tpl).replace(/\[\[([^|\]]*)\|[^\]]*\]\]/g, '$1').replace(/\{\{([^|}]*)\|[^}]*\}\}/g, '$1');
  let s = '', tiefe = 0;
  for (let i = 0; i < t.length; i++) { const ch = t.charAt(i); if (ch === '{') { tiefe++; } else if (ch === '}') { tiefe--; } else if (!tiefe) { s += ch; } }
  return s;
}

// ---------- Ein Satz ----------
function einheitLesen(u, abId, x) {
  const L = x.L, sk = skelett(u.text, x.lang);
  u.sk = sk;
  if (!sk.toks.length) { u.art = 'leer'; return; }
  if (istAnleitung(u.text)) { u.art = 'anleitung'; return; }
  x.zahl.einheiten++;
  const kand = kandidaten(abId, x);
  for (let n = 0; n < kand.length; n++) {
    const p = kand[n].p, m = p.re.exec(sk.k);
    if (!m) { continue; }
    const w = werteAus(m, p, sk, L);
    if (!personenOk(w, x)) { continue; }
    namenStrecken(w, sk, x);
    x.restOffen = false;
    treffer(p, w, u, abId, x, 0.97);
    // Aufzählung mit eigenen Gliedern: Satz zusätzlich als Freitext
    u.art = x.restOffen ? 'teil' : 'vorlage'; x.zahl.vorlage++;
    return;
  }
  // mehrere Vorlagensätze ohne Satzzeichen dazwischen (OCR), oder ein Vorlagensatz mit Zusatz
  const teil = enthalten(sk, kand, x);
  if (teil) {
    x.restOffen = false;
    teil.treffer.forEach(function (t) { treffer(t.p, t.w, u, abId, x, 0.9); });
    u.art = teil.rest >= 3 || x.restOffen ? 'teil' : 'vorlage'; x.zahl.vorlage += teil.anteil;
    return;
  }
  // fast gleich (andere OCR-Fehler)
  const nah = fastGleich(sk, kand, x);
  if (nah) { treffer(nah.p, { _gruppen: [] }, u, abId, x, nah.sicher); u.art = 'vorlage'; x.zahl.vorlage += 1; return; }
  if (istVorlagensatz(u.text)) { u.art = 'anleitung'; freieFakten(u, abId, x); return; }
  u.art = 'frei';
  const bereiche = abId ? BEREICH_FUER[abId] : Object.keys(BEREICH_ABSCHNITT);
  if (bereiche) {
    const vs = freiVorschlaege(u.text, bereiche, L, wegWorte(x));
    vs.forEach(function (v) { x.bewertung(v.id, v.band, v.sicher, u.text, abId || BEREICH_ABSCHNITT[v.bereich], 'frei'); });
    if (vs.length) { u.vorschlag = vs; }
  }
  freieFakten(u, abId, x);
}
function treffer(p, w, u, abId, x, sicher) {
  const beleg = u.text, ab = abId || abschnittVon(p);
  stimmen(w, x);
  w._gruppen.forEach(function (e) { if (e && e.g.typ === 'quelle' && e.wert) { x.fakt(e.g.art === 'schule' ? 'schule_quelle' : 'eltern_quelle', e.wert, Math.min(sicher, 0.9), beleg); } });
  if (p.art === 'aussage') {
    x.bewertung(p.id, p.band, sicher, beleg, ab, 'vorlage');
    if (['schule', 'kind', 'eltern', 'beobachtung'].indexOf(p.bereich) >= 0) { x.folge.push({ id: p.id, bereich: p.bereich, thema: p.thema, pol: p.pol, platz: p.platz, vorne: p.vorne, band: p.band, abschnitt: ab }); }
    if (w.datum) { x.fakt(p.bereich + '_datum', w.datum, sicher, beleg); }
  } else if (p.art === 'erklaerung') { x.bewertung(p.id, p.band, sicher - 0.01, beleg, ab, 'vorlage'); x.merk.p2 = true; }
  else if (p.art === 'rahmen') { rahmenAnwenden(p, w, x, beleg, sicher, ab); }
  else if (p.art === 'fakt') {
    if (p.eldib === 'bereich') { x.merk.eldibBereich = eldibBereich(w, x); }
    else if (p.eldib === 'ziele' || p.eldib === 'alter') { x.merk.eldibBereich = null; }
    if (p.tu) { p.tu(w, helfer(x, beleg, sicher, ab)); }
  }
  u.muster = (u.muster || []).concat([p]);
}
function enthalten(sk, kand, x) {
  const n = sk.toks.length, belegt = new Array(n).fill(false), tr = [];
  kand.forEach(function (c) {
    const p = c.p;
    if (p.literal < 4) { return; }
    p.suche.lastIndex = 0;
    let m;
    while ((m = p.suche.exec(sk.k))) {
      if (!m[0].length) { p.suche.lastIndex++; continue; }
      const r = wortBereich(sk, m.index, m.index + m[0].length);
      if (!r) { continue; }
      let frei = true;
      for (let i = r.i; i <= r.j; i++) { if (belegt[i]) { frei = false; } }
      if (!frei) { continue; }
      const w = werteAus(m, p, sk, x.L);
      if (!personenOk(w, x)) { continue; }
      namenStrecken(w, sk, x);
      for (let i = r.i; i <= r.j; i++) { belegt[i] = true; }
      tr.push({ p: p, w: w, i: r.i });
    }
  });
  const bel = belegt.filter(Boolean).length;
  if (!tr.length || bel < 0.6 * n) { return null; }
  tr.sort(function (a, b) { return a.i - b.i; });
  return { treffer: tr, rest: n - bel, anteil: bel / n };
}
function fastGleich(sk, kand, x) {
  const weg = wegWorte(x), u = sk.toks.map(function (t) { return t.w; }).filter(function (w) { return !weg.has(w) && !/^\d+$/.test(w); }).join(' ');
  if (u.length < 15) { return null; }
  let best = null;
  kand.forEach(function (c) {
    const p = c.p;
    if (p.art !== 'aussage' && p.art !== 'erklaerung') { return; }
    if (p.lit == null) { p.lit = woerter(literalSkelett(p, x.L), x.lang).map(function (t) { return t.w; }).filter(function (w) { return !weg.has(w); }).join(' '); }
    const lit = p.lit;
    if (!lit || Math.abs(lit.length - u.length) > 0.2 * Math.max(lit.length, u.length)) { return; }
    const a = aehnlich(u, lit);
    if (a >= 0.86 && (!best || a > best.a)) { best = { p: p, a: a }; }
  });
  if (!best) { return null; }
  return { p: best.p, sicher: Math.round((best.a >= 0.95 ? 0.88 : 0.72 + (best.a - 0.86) * 1.5) * 100) / 100 };
}

// ---------- Freitext: Fakten und Auswahlfelder aus frei geschriebenen Sätzen (sicher < 0.7) ----------
function rx(lang, worte) {
  return new RegExp(' (?:' + worte.map(function (w) {
    const pre = /\*$/.test(w);
    return skText(w.replace(/\*$/, ''), lang).trim() + (pre ? '[a-z0-9]*' : '');
  }).join('|') + ')(?= )');
}
const FREI_DIAGNOSEN = {
  adhs: ['ADHS', 'ADS', 'ADHD', 'TDAH', 'TDA', 'Aufmerksamkeitsdefizit*', 'hyperkinetisch*'],
  ass: ['Autismus*', 'autist*', 'Asperger*', 'ASS', 'TSA', 'autisme', 'autism'],
  lernstoerung: ['LRS', 'Legasthenie', 'Dyslexie', 'Dyskalkulie', 'Lernstörung*', 'dyscalculie', 'dysorthographie', 'dyslexia', 'dyscalculia'],
  sprachstoerung: ['Sprachentwicklungsstörung*', 'Sprachstörung*', 'dysphasie', 'Dysphasie'],
  bindung: ['Bindungsstörung*'], angst: ['Angststörung*'], opposition: ['oppositionell*', 'Trotzverhalten']
};
const FREI_FAMILIE = {
  getrennt: ['getrennt', 'geschieden', 'Trennung der Eltern', 'séparés', 'séparé', 'divorcés', 'divorcé', 'separated', 'divorced'],
  zusammen: ['verheiratet', 'leben zusammen', 'mariés', 'vivent ensemble', 'married', 'live together'],
  alleinerziehend: ['alleinerziehend*', 'monoparentale', 'single parent'], patchwork: ['Patchwork*', 'recomposée', 'blended family'],
  verstorben: ['verstorben', 'décédé', 'décédée', 'deceased']
};
const FREI_EREIGNIS = { trennung: ['Trennung', 'Scheidung', 'séparation', 'divorce'], umzug: ['Umzug', 'umgezogen', 'déménagement', 'déménagé', 'moved house'], verlust: ['Tod', 'verstorben', 'Verlust', 'décès', 'deuil', 'death', 'died'],
  krankheit: ['Krankheit', 'erkrankt', 'maladie', 'illness'], konflikte: ['häusliche Gewalt', 'Streit zu Hause', 'violence conjugale', 'conflits familiaux', 'domestic violence'], trauma: ['Trauma*', 'traumatisch*', 'traumatique', 'traumatic'],
  migration: ['Migration', 'geflüchtet', 'Flucht', 'Flüchtling*', 'réfugié*', 'immigr*', 'refugee*'] };
function freieFakten(u, abId, x) {
  const lang = x.lang, t = u.text, k = (u.sk ? u.sk.k : skText(t, lang)) + ' ';
  const hat = function (worte) { return rx(lang, worte).test(k); };
  const daten = datenImText(t, lang);
  if (abId === 'auftrag') {
    if (daten.length && hat(['beauftragt', 'Auftrag', 'Anfrage', 'mandaté', 'mandat', 'demande', 'commissioned', 'referral', 'referred'])) { x.fakt('auftrag_datum', daten[0], 0.65, t); }
    if (hat(['CNI', 'Kommission*', 'Commission']) && hat(['beauftragt', 'mandaté', 'commissioned', 'Auftrag'])) { x.fakt('auftraggeber', 'cni', 0.6, t); }
  }
  if ((abId === 'schule' || abId === 'kind' || abId === 'eltern') && daten.length && hat(['Gespräch*', 'Interview*', 'entretien*', 'rencontre', 'Unterhaltung'])) { x.fakt(abId + '_datum', daten[0], 0.6, t); }
  if (abId === 'beobachtung' && daten.length && hat(['beobacht*', 'Beobachtung*', 'observ*'])) {
    const alt = (x.erg.f.beobachtungen && x.erg.f.beobachtungen.wert) || [];
    daten.forEach(function (d) { if (!alt.some(function (b) { return b.datum === d; })) { alt.push({ datum: d }); } });
    x.fakt('beobachtungen', alt, Math.max(0.55, (x.erg.f.beobachtungen || {}).sicher || 0), t);
  }
  if (abId === 'vorgeschichte' || abId === 'anamnese' || !abId) {
    const vorsicht = hat(['Verdacht*', 'Abklärung', 'abklären', 'abgeklärt', 'ausgeschlossen', 'suspicion', 'soupçon', 'suspecté*', 'suspected', 'exclu*', 'kein', 'keine', 'aucun', 'aucune']);
    if (!vorsicht) { Object.keys(FREI_DIAGNOSEN).forEach(function (key) { if (hat(FREI_DIAGNOSEN[key])) { x.chip('diagnosen', key, 0.6, t); } }); }
    const schw = hat(['Schwangerschaft', 'grossesse', 'pregnancy']), geb = hat(['Geburt', 'accouchement', 'naissance', 'birth']);
    const glatt = hat(['unauffällig', 'problemlos', 'normal', 'sans particularité', 'sans complication', 'uneventful']), kompl = hat(['Komplikation*', 'Frühgeburt', 'Kaiserschnitt', 'complication*', 'prématur*', 'césarienne']);
    if (schw && (glatt || kompl)) { x.fakt('schwangerschaft', kompl ? 'komplikationen' : 'unauffaellig', 0.55, t); }
    if (geb && (glatt || kompl)) { x.fakt('geburt', kompl ? 'komplikationen' : 'unauffaellig', 0.55, t); }
    const verz = hat(['verzögert', 'verspätet', 'Rückstand', 'retard*', 'delayed']), alt = hat(['altersgerecht', 'altersentsprechend', 'normal', "conforme à l'âge", 'age-appropriate']);
    if (hat(['motorisch*', 'Motorik', 'moteur', 'motrice', 'motor']) && (verz || alt)) { x.fakt('motorik', verz ? 'verzoegert' : 'altersgerecht', 0.5, t); }
    if (hat(['Sprachentwicklung', 'Sprache', 'langage', 'language']) && (verz || alt)) { x.fakt('sprache', verz ? 'verzoegert' : 'altersgerecht', 0.5, t); }
    const w = /(?:erste[n]? (?:Wörter|Worte)|premiers mots|first words)[^0-9]{0,25}(\d{1,2})\s*(?:Monat|mois|month)/i.exec(t);
    if (w) { x.fakt('erste_worte', w[1], 0.6, t); }
  }
  if (abId === 'sozialbericht' || !abId) {
    Object.keys(FREI_FAMILIE).forEach(function (key) { if (hat(FREI_FAMILIE[key])) { x.fakt('familienstand', key, 0.5, t); } });
    const lebt = hat(['lebt', 'wohnt', 'vit', 'habite', 'lives']);
    if (lebt) {
      if (hat(['Wechselmodell', 'abwechselnd', 'garde alternée', 'alternately'])) { x.fakt('lebt_bei', 'wechsel', 0.5, t); }
      else if (hat(['Pflegefamilie', "famille d'accueil", 'foster'])) { x.fakt('lebt_bei', 'pflege', 0.5, t); }
      else if (hat(['Wohngruppe', 'Heim', 'foyer', 'residential'])) { x.fakt('lebt_bei', 'heim', 0.5, t); }
      else if (hat(['Großeltern', 'grands-parents', 'grandparents'])) { x.fakt('lebt_bei', 'grosseltern', 0.5, t); }
      else if (hat(['beiden Eltern', 'seinen Eltern', 'ihren Eltern', 'ses deux parents', 'ses parents', 'both parents'])) { x.fakt('lebt_bei', 'beide', 0.5, t); }
      else if (hat(['Mutter', 'mère', 'mother'])) { x.fakt('lebt_bei', 'mutter', 0.5, t); }
      else if (hat(['Vater', 'père', 'father'])) { x.fakt('lebt_bei', 'vater', 0.5, t); }
    }
    if (hat(['Einzelkind', 'enfant unique', 'only child'])) { x.fakt('geschwister_anzahl', '0', 0.55, t); }
    const ZW = { ein: 1, eine: 1, einen: 1, einem: 1, zwei: 2, drei: 3, vier: 4, funf: 5, un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, one: 1, a: 1, an: 1, two: 2, three: 3, four: 4, five: 5 };
    let anz = 0;
    const reG = / (\d|ein|eine|einen|zwei|drei|vier|funf|un|une|deux|trois|quatre|cinq|one|a|an|two|three|four|five)(?: (?:altere|alteren|alterer|jungere|jungeren|jungerer|kleine|kleinen|kleiner|grosse|grossen|grosser|older|younger|grand|grande|petit|petite|grands|grandes|petits|petites|demi))? (geschwister|geschwisterkind|geschwisterkinder|bruder|brudem|schwester|schwestem|frere|freres|soeur|soeurs|sibling|siblings|brother|brothers|sister|sisters)(?= )/g;
    let gm;
    while ((gm = reG.exec(k))) { anz += /^\d$/.test(gm[1]) ? +gm[1] : (ZW[gm[1]] || 0); }
    const fr = / fratrie de (\d+|deux|trois|quatre|cinq|six) enfants /.exec(k);
    if (fr) { anz = (/^\d+$/.test(fr[1]) ? +fr[1] : ZW[fr[1]] || { six: 6 }[fr[1]]) - 1; }
    if (anz > 0 && anz < 15) { x.fakt('geschwister_anzahl', String(anz), 0.5, t); }
    if (hat(['älteste', 'ältester', 'ältestes', 'aîné', 'aînée', 'eldest', 'oldest'])) { x.fakt('geschwister_position', 'aeltestes', 0.5, t); }
    else if (hat(['jüngste', 'jüngster', 'jüngstes', 'cadet', 'cadette', 'benjamin', 'youngest'])) { x.fakt('geschwister_position', 'juengstes', 0.5, t); }
    Object.keys(FREI_EREIGNIS).forEach(function (key) { if (hat(FREI_EREIGNIS[key])) { x.chip('ereignisse', key, 0.5, t); } });
    if (hat(['Maison Relais', 'maison relais'])) { x.chip('betreuung', 'maison_relais', 0.55, t); }
    if (hat(['Tagesmutter', 'assistante parentale', 'childminder'])) { x.chip('betreuung', 'tagesmutter', 0.55, t); }
  }
  if (abId === 'aktuell' || abId === 'massnahmen' || !abId) {
    const kl = /\b(?:Klasse|classe|class)\s+([A-Z]?\d[\w.\-]*)/.exec(t);
    if (kl) { x.fakt('klasse', kl[1].replace(/[.,]$/, ''), 0.55, t); }
    const re = /(?:Referenzperson(?: im ESEB)?|personne de référence(?: au sein de l['’]ESEB| de l['’]ESEB)?|reference person(?: at the ESEB)?)\s+(?:ist|est|is)\s+([^.,;(]+)/i.exec(t);
    if (re && !/…|\.\.\./.test(re[1])) { x.frei('eseb_referenz', re[1].trim()); }
  }
  if (abId === 'verfahren') {
    if (hat(['ELDiB'])) { x.chip('verfahren', 'eldib', 0.65, t); }
    if (hat(['SDQ'])) { x.chip('verfahren', 'sdq', 0.65, t); }
    if (hat(['WISC*'])) { x.chip('verfahren', 'wisc', 0.65, t); }
  }
  freieChips(u, abId, x);
}
// Auswahlfelder in frei geschriebenen Sätzen (Beschriftung oder Textform; kurze Wörter nur mit Hinweiswort)
const FREI_CHIPS = { auftrag: ['anlass', 'anliegen', 'empfohlen'], sozialbericht: ['sprachen'], schule: ['s_staerken', 's_hilft', 's_erwartung'], kind: ['k_interessen', 'k_wuensche'],
  eltern: ['e_staerken', 'e_erwartung'], beduerfnisse: ['ressourcen'] };
const CHIP_HINWEIS = {
  s_staerken: ['Stärke*', 'stark', 'kann gut', 'point fort', 'points forts', 'atout*', 'strength*', 'good at'], e_staerken: ['Stärke*', 'stark', 'kann gut', 'point fort', 'points forts', 'strength*'],
  ressourcen: ['Ressource*', 'Stärke*', 'ressource*', 'resource*', 'strength*'], s_hilft: ['hilft', 'helfen', 'hilfreich', 'bewährt', 'aide*', 'utile*', 'help*'],
  s_erwartung: ['erhofft', 'erwartet', 'wünscht', 'Wunsch', 'attend*', 'espère*', 'souhait*', 'hope*', 'expect*'], e_erwartung: ['erhoffen', 'erhofft', 'erwarten', 'wünschen', 'wünscht', 'attend*', 'espère*', 'souhait*', 'hope*'],
  k_interessen: ['Interesse*', 'Hobby*', 'Freizeit', 'gern', 'gerne', 'mag', 'aime', 'loisir*', 'passion*', 'likes', 'enjoys', 'interest*'], k_wuensche: ['wünscht', 'Wunsch', 'möchte', 'souhait*', 'voudrait', 'wish*', 'would like'],
  sprachen: ['Sprache*', 'spricht', 'gesprochen', 'langue*', 'parle*', 'language*', 'speak*']
};
function freieChips(u, abId, x) {
  const gruppen = FREI_CHIPS[abId];
  if (!gruppen) { return; }
  const sk = u.sk || skelett(u.text, x.lang), k = sk.k + ' ';
  gruppen.forEach(function (g) {
    const hinweis = CHIP_HINWEIS[g] ? rx(x.lang, CHIP_HINWEIS[g]).test(k) : true;
    (x.L.listen['chip:' + g] || []).forEach(function (p) {
      if (/^(andere|keine)$/.test(p.key)) { return; }
      const kurz = p.literal < 2 && String(p.tpl).length < 9;
      if (kurz && !hinweis) { return; }
      p.suche.lastIndex = 0;
      if (p.suche.test(k)) { x.chip(g, p.key, p.beschriftung ? 0.5 : 0.55, u.text); }
    });
  });
}

// ---------- Freitexte zuordnen (was keine Vorlage erklärt, geht nicht verloren) ----------
function freiZuordnen(einheiten, abId, x) {
  const feldFuer = function (u, i) {
    if (!abId) { return null; }
    if (abId === 'deutung') {
      const istP2 = function (e) { return e.art !== 'frei' && (e.muster || []).some(function (p) { return p.art === 'erklaerung' || (p.art === 'rahmen' && RAHMEN[p.key].p2); }); };
      const istHyp = function (e) { return e.art !== 'frei' && (e.muster || []).some(function (p) { return p.art === 'rahmen' && /^hyp_/.test(p.key); }); };
      const hatMuster = function (e) { return e.art !== 'frei' && e.muster && e.muster.length; };
      // Ergänzung zu Ängsten/Abwehr steht im selben Absatz nach diesen Sätzen
      for (let j = i - 1; j >= 0 && einheiten[j].block === u.block; j--) { if (istP2(einheiten[j])) { return 'abwehr'; } }
      // eigener Absatz danach: gehört noch zur Abwehr, wenn die Erklärungsansätze erst danach kommen
      // (die eigene Ergänzung zur Interpretation steht immer am Ende) oder eine Leerzeile ihn als
      // Absatz innerhalb des Feldes abtrennt
      let j = i - 1;
      while (j >= 0 && !hatMuster(einheiten[j])) { j--; }
      const hypDanach = einheiten.slice(i + 1).some(istHyp);
      if (j >= 0 && istP2(einheiten[j]) && (hypDanach || (u.nachLeer && x.leerSelten))) { return 'abwehr'; }
      // ohne Sätze zu Ängsten/Abwehr: ein freier Absatz vor den Erklärungsansätzen ist die Ergänzung zur Abwehr
      if (hypDanach && !einheiten.some(istP2) && !einheiten.slice(0, i).some(istHyp)) { return 'abwehr'; }
      return 'deutung';
    }
    if (abId === 'eldib') { return u.eldib ? 'eldib_' + u.eldib : null; }
    if (abId === 'sozialbericht') {
      const pos = function (e) { return e.muster[0].pos || ''; }, mitMuster = function (e) { return e.art !== 'frei' && e.muster && e.muster.length; };
      // nach den Sätzen zum Familienstand (oder ganz am Anfang) und vor dem nächsten Satz der Vorlage
      // (Geschwister, Sprachen, …): Kontakt-Details
      const vorAlle = einheiten.slice(0, i).filter(mitMuster), nachAlle = einheiten.slice(i + 1).filter(mitMuster);
      if (nachAlle.length && ['geschwister', 'sprachen', 'beruf', 'ereignisse', 'betreuung'].indexOf(pos(nachAlle[0])) >= 0 && vorAlle.every(function (e) { return pos(e) === 'stand'; })) { return 'kontakt_details'; }
      // am Ende des Absatzes der Vorlage: Freizeit; eigene Absätze danach: Familie
      const vor = einheiten.slice(0, i).filter(function (e) { return e.block === u.block && mitMuster(e); });
      const nach = einheiten.slice(i + 1).filter(function (e) { return e.block === u.block && mitMuster(e); });
      if (!nach.length && vor.length) { return 'freizeit'; }
      return 'familie';
    }
    return FREI_FELD[abId] || null;
  };
  let akt = null;
  const fertig = function () {
    if (!akt) { return; }
    const text = akt.teile.join(' ');
    if (akt.feld) { x.frei(akt.feld, text); } else { akt.teile.forEach(function (s) { x.unbekannt(s); }); }
    akt = null;
  };
  einheiten.forEach(function (u, i) {
    if (u.art !== 'frei' && u.art !== 'teil') { if (u.art !== 'anleitung') { fertig(); } return; }
    const feld = feldFuer(u, i);
    if (akt && akt.feld === feld && akt.block === u.block) { akt.teile.push(u.text); }
    else { fertig(); akt = { feld: feld, block: u.block, teile: [u.text] }; }
  });
  fertig();
}

// ---------- Tabellen (2.1, 3.1 als Zeilen; 6.1) ----------
const TAB_KOPF = { zeitraum: ['Zeitraum', 'Période', 'Period'], klasse: ['Klasse', 'Classe', 'Class'], massnahme: ['Maßnahme', 'Intervention', 'Measure'], akteur: ['Akteur', 'Acteur·ice', 'Acteur', 'Provider'], datum: ['Datum', 'Date'], art: ['Art der Intervention', "Type d'intervention", 'Type of intervention'] };
const TAB_MUSTERZEILE = /^(Von … bis|SCAS, CPI, ESEB Dir\.|Du … au|Depuis …$)/;
function zellen(z) { return z.split(/\t+| {2,}/).map(function (c) { return c.trim(); }).filter(function (c, i, a) { return c || (i > 0 && i < a.length - 1); }); }
function istKopf(t, spalte) { const k = skText(t, 'x').trim(); return (TAB_KOPF[spalte] || []).some(function (h) { return skText(h, 'x').trim() === k; }); }
function tabelleLesen(zeilen, name, x) {
  const spalten = tafeln().tabellen[name], rest = [], zeilenAus = [];
  let i = 0;
  while (i < zeilen.length) {
    const z = zeilen[i], c = zellen(z);
    // Kopfzeile in einer Zeile ("Zeitraum<TAB>Klasse<TAB>Maßnahme<TAB>Akteur")
    if (c.length >= 3 && c.filter(function (t, j) { return spalten[j] && istKopf(t, spalten[j]); }).length >= 3) {
      i++;
      while (i < zeilen.length) {
        // Leerzeilen im Tabellenkörper (Seitenwechsel im PDF) überspringen, wenn danach noch Zeilen folgen
        if (!zeilen[i].trim()) {
          let j = i;
          while (j < zeilen.length && !zeilen[j].trim()) { j++; }
          if (j < zeilen.length && zellen(zeilen[j]).length >= 2) { i = j; continue; }
          break;
        }
        if (zellen(zeilen[i]).length < 2) { break; }
        const w = zellen(zeilen[i]);
        if (!TAB_MUSTERZEILE.test(w[0] || '') && !TAB_MUSTERZEILE.test(w[w.length - 1] || '')) { const r = {}; spalten.forEach(function (s, j) { r[s] = w[j] || ''; }); zeilenAus.push(r); }
        i++;
      }
      continue;
    }
    // Kopf Zelle für Zelle ("Zeitraum" / "Klasse" / "Maßnahme" / "Akteur" untereinander)
    if (istKopf(z.trim(), spalten[0])) {
      let j = i, n = 0;
      while (n < spalten.length && j < zeilen.length && istKopf(zeilen[j].trim(), spalten[n])) { j++; n++; }
      if (n === spalten.length) {
        const zellenListe = [];
        let k = j;
        while (k < zeilen.length) {
          const t = zeilen[k].trim();
          if (!t) { k++; continue; }
          if (t.length > 80 || (/[.!?:]$/.test(t) && t.length > 40) || zellen(zeilen[k]).length >= 3) { break; }
          zellenListe.push(t); k++;
        }
        const nutz = zellenListe.filter(function (t) { return !TAB_MUSTERZEILE.test(t); });
        for (let a = 0; a + spalten.length <= nutz.length; a += spalten.length) {
          const r = {}; spalten.forEach(function (s, b) { r[s] = nutz[a + b] || ''; }); zeilenAus.push(r);
        }
        i = k;
        continue;
      }
    }
    rest.push(z);
    i++;
  }
  zeilenAus.forEach(function (r) { if (r.zeitraum || r.massnahme || r.akteur) { x.erg.tabellen[name].push(r); } });
  return rest;
}
const IV_VORLAGE = {
  klassenbeobachtung: ['Klassenbeobachtungen', 'Observations en classe', 'Classroom observations'],
  kontakt_eltern: ['Kontakte mit Erziehungsberechtigten', 'Contacts avec les parents/tuteur·ice·s', 'Contacts with parents/guardians'],
  kontakt_schule: ['Kontakte mit der Herkunftsschule (Lehr-/Fachpersonal)', 'Contacts avec l’école d‘origine (enseignant·e·s, spécialistes)', 'Contacts with the home school (teachers/specialists)'],
  kontakt_extern: ['Kontakte mit externem Fachpersonal', 'Contacts avec les spécialistes', 'Contacts with external professionals'],
  kontakt_schueler: ['Kontakte mit dem/der Schüler:in', 'Contacts avec l‘élève', 'Contacts with the student']
};
function interventionenLesen(zeilen, x) {
  const U = tafeln().ui, namen = {};
  INTERVENTIONEN.forEach(function (art) {
    const l = (IV_VORLAGE[art] || []).slice();
    SPRACHEN.forEach(function (s) { const o = (U[s] || {}).opt; if (o && o.interventionen && o.interventionen[art]) { l.push(o.interventionen[art]); } });
    l.forEach(function (t) { namen[skText(t, 'x').trim()] = art; });
  });
  const aus = [];
  let art = null;
  zeilen.forEach(function (z) {
    const t = z.trim();
    if (!t) { return; }
    const c = zellen(z), erste = skText(c[0], 'x').trim();
    if (namen[erste]) { art = namen[erste]; c.slice(1).forEach(function (d) { datenImText(d, x.lang).forEach(function (iso) { aus.push({ datum: iso, art: art }); }); }); return; }
    if (istKopf(t, 'datum')) { return; }
    const d = datenImText(t, x.lang);
    if (art && d.length) { d.forEach(function (iso) { aus.push({ datum: iso, art: art }); }); }
  });
  x.erg.tabellen.interventionen = x.erg.tabellen.interventionen.concat(aus);
}

// ---------- Listen-Abschnitte: 5.2 Ziele, 5.3 Empfehlungen, 5.4 CNI ----------
// bekannt: { fertig(text), neu(text) } – vollständiger Punkt der Vorlage bzw. Zeile, die sicher einen neuen
// Punkt beginnt (Zwischenüberschrift, Punkt aus der Liste): dann nicht verbinden, auch wenn die Breite passt
function zeilenVerbinden(zeilen, breite, bekannt) {
  const aus = [];
  zeilen.forEach(function (z) {
    const t = z.trim();
    // umbrochener Code eines Ziels "(SOC-5)" ist keine graue Anleitung
    if (!t || (istAnleitung(t) && !ZIEL_CODE.test(t))) { return; }
    const punkt = PUNKT.test(t) && !/^-\d/.test(t);
    const text = punkt ? t.replace(PUNKT, '').trim() : t;
    const vor = aus.length ? aus[aus.length - 1] : null;
    // umbrochen, wenn das erste Wort dieser Zeile nicht mehr in die vorige gepasst hätte
    const erstes = text.split(/\s+/)[0] || '', klein = /^[a-zà-öø-ÿ]/.test(text);
    const umbruch = breite && vor && vor.roh.length + 1 + erstes.length > breite && !/[.!?:)]$/.test(vor.text);
    const getrennt = !!(bekannt && vor && ((!klein && bekannt.fertig(vor.text)) || bekannt.neu(text)));
    if (vor && !punkt && !getrennt && (umbruch || klein)) { vor.text += ' ' + text; vor.roh = t; }
    else { aus.push({ text: text, roh: t }); }
  });
  // zwei Zeilen, die nur zusammen einen bekannten Punkt ergeben ("… folgende" / "Maßnahmen:")
  for (let i = 0; bekannt && i + 1 < aus.length; i++) {
    const a = aus[i].text, b = aus[i + 1].text;
    if (!bekannt.fertig(a) && !bekannt.fertig(b) && bekannt.fertig(a + ' ' + b)) { aus[i].text = a + ' ' + b; aus.splice(i + 1, 1); i--; }
  }
  return aus.map(function (a) { return a.text; });
}
// Was in 5.2–5.4 sicher ein ganzer Punkt ist (für zeilenVerbinden)
function listenBekannt(id, x) {
  if (id === 'ziele') { return { fertig: function (t) { return ZIEL_CODE.test(t); }, neu: function () { return false; } }; }
  const L = x.L, res = [];
  if (id === 'empfehlungen') {
    kandidaten('empfehlungen', x).forEach(function (c) { if (c.p.kontext) { res.push(c.p.re); } });
    ['empf_familie', 'empf_schule', 'empf_region'].forEach(function (g) { (L.listen['chip:' + g] || []).forEach(function (p) { if (!p.beschriftung) { res.push(p.re); } }); });
  } else if (id === 'cni') {
    kandidaten('cni', x).forEach(function (c) { if (c.p.cniKopf) { res.push(c.p.re); } });
    (L.listen['chip:cni'] || []).forEach(function (p) { if (!p.beschriftung) { res.push(p.re); } });
  }
  const passt = function (t) { const k = skelett(t, x.lang).k; return res.some(function (re) { re.lastIndex = 0; return re.test(k); }); };
  return { fertig: passt, neu: passt };
}
// Zeilenbreite eines umbrochenen Textes (95 %-Wert der langen Zeilen ohne Tabellenzeilen, vor dem
// Zusammenfügen getrennter Wörter gemessen); 0 = zu wenige Zeilen
function zeilenBreite(zeilen) {
  const l = zeilen.filter(function (z) { return !/\t/.test(z); }).map(function (z) { return z.trim().length; }).filter(function (n) { return n >= 30; }).sort(function (a, b) { return a - b; });
  return l.length >= 10 ? l[Math.floor(l.length * 0.95)] : 0;
}
const ZIEL_CODE = /\((?:V|K|SOZ|KOG|COMP|COMM|SOC|COG|BEH|COM)-\d+\)\s*$/;
const ELDIB_ZIEL = /^(?:V|K|SOZ|KOG|COMP|COMM|SOC|COG|BEH|COM)-\d+\s*[–—-]\s+/;
function satzZeileLesen(zeile, abId, x) {
  // alle Sätze einer Zeile mit den Vorlagen des Abschnitts; true, wenn alles erklärt ist
  let alle = true;
  saetze(zeile).forEach(function (s) {
    const u = { text: s, block: 0 };
    einheitLesen(u, abId, x);
    if (u.art === 'frei' || u.art === 'teil') { alle = false; }
  });
  return alle;
}
function listenAbschnitt(id, zeilen, x) {
  const L = x.L, liste = zeilenVerbinden(zeilen, x.umbrochen ? x.breite : 0, listenBekannt(id, x));
  x.merk = {};
  if (id === 'ziele') {
    liste.forEach(function (z) {
      if (istAnleitung(z)) { return; }
      if (ZIEL_CODE.test(z) || ELDIB_ZIEL.test(z)) { x.zahl.einheiten++; x.zahl.vorlage++; return; }   // Ziel aus dem ELDiB
      if (!satzZeileLesen(z, 'ziele', x)) { x.frei('ziele_zusatz', z, true); }
    });
    return;
  }
  if (id === 'empfehlungen') {
    const kopf = kandidaten('empfehlungen', x).filter(function (c) { return c.p.kontext; });
    const GR = { familie: 'empf_familie', schule: 'empf_schule', region: 'empf_region' };
    let kontext = null;
    liste.forEach(function (z) {
      if (istAnleitung(z)) { return; }
      const sk = skelett(z, x.lang);
      x.zahl.einheiten++;
      const k = kopf.filter(function (c) { return c.p.re.test(sk.k); })[0];
      if (k) { kontext = k.p.kontext; x.zahl.vorlage++; return; }
      let hit = null;
      const reihenfolge = kontext ? [GR[kontext]].concat(Object.keys(GR).map(function (a) { return GR[a]; }).filter(function (g) { return g !== GR[kontext]; })) : ['empf_familie', 'empf_schule', 'empf_region'];
      reihenfolge.forEach(function (g) {
        if (hit) { return; }
        (L.listen['chip:' + g] || []).forEach(function (p) { if (!hit && !p.beschriftung && p.re.test(sk.k)) { hit = { g: g, p: p }; } });
      });
      if (hit) { x.chip(hit.g, hit.p.key, 0.97, z); x.zahl.vorlage++; if (!kontext) { kontext = Object.keys(GR).filter(function (a) { return GR[a] === hit.g; })[0]; } return; }
      // eigene Empfehlung: in das Feld des Kontexts (ohne Zwischenüberschrift: nach Stichworten)
      let ctx = kontext;
      if (!ctx) {
        const kk = sk.k + ' ';
        ctx = rx(x.lang, ['Eltern', 'Familie', 'zu Hause', 'parents', 'famil*', 'maison', 'home']).test(kk) ? 'familie'
          : (rx(x.lang, ['ESEB', 'CDSE', 'Therapie', 'thérapie', 'therapy', 'ISA', 'Logopädie', 'Ergotherapie', 'logopédie', 'ergothérapie', 'psychiatr*']).test(kk) ? 'region' : 'schule');
      }
      x.frei('empfehlung_' + ctx, z, true);
      (x.L.listen['chip:' + GR[ctx]] || []).forEach(function (p) {
        p.suche.lastIndex = 0;
        if (!/^(andere|keine)$/.test(p.key) && p.suche.test(sk.k + ' ')) { x.chip(GR[ctx], p.key, p.beschriftung ? 0.5 : 0.6, z); }
      });
    });
    return;
  }
  if (id === 'cni') {
    // Unterschrift: die (bis zu) zwei Zeilen vor "Unité de diagnostic, de conseil et de suivi"
    let sig = -1;
    liste.forEach(function (z, i) { if (/unit[ée] de diagnostic,? de conseil et de suivi/i.test(z)) { sig = i; } });
    const unterschrift = [];
    if (sig >= 0) {
      for (let i = sig - 1; i >= 0 && unterschrift.length < 2; i--) {
        const z = liste[i];
        if (istAnleitung(z)) { unterschrift.unshift(null); continue; }
        if (z.length > 90 || /[.!?:]$/.test(z) || (L.listen['chip:cni'] || []).some(function (p) { return p.re.test(skText(z, x.lang)); })) { break; }
        unterschrift.unshift(i);
      }
    }
    const sigZeilen = unterschrift.filter(function (i) { return i != null; });
    if (sigZeilen.length) {
      x.fakt('verfasser_name', liste[sigZeilen[0]], 0.8, liste[sigZeilen[0]]);
      if (sigZeilen[1] != null) { x.fakt('verfasser_funktion', liste[sigZeilen[1]], 0.8, liste[sigZeilen[1]]); }
    }
    const begruendung = [];
    liste.forEach(function (z, i) {
      if (i === sig || sigZeilen.indexOf(i) >= 0 || istAnleitung(z)) { return; }
      const sk = skelett(z, x.lang);
      x.zahl.einheiten++;
      if (kandidaten('cni', x).some(function (c) { return c.p.cniKopf && c.p.re.test(sk.k); })) { x.zahl.vorlage++; return; }
      const hit = (L.listen['chip:cni'] || []).filter(function (p) { return !p.beschriftung && p.re.test(sk.k); })[0];
      if (hit) { x.chip('cni', hit.key, 0.97, z); x.zahl.vorlage++; return; }
      begruendung.push(z);
      (L.listen['chip:cni'] || []).forEach(function (p) {
        p.suche.lastIndex = 0;
        if (p.literal >= 2 && p.suche.test(sk.k + ' ')) { x.chip('cni', p.key, p.beschriftung ? 0.5 : 0.6, z); }
      });
    });
    bloecke(begruendung).forEach(function (b) { x.frei('cni_begruendung', b.text); });
  }
}

// ---------- Deckblatt ----------
const DECK_LABEL = { name: /^(Name des|Name der|Nom et prénom|Nom de l|Student[’']s name)/i, matricule: /^(Sozialversicherungsnummer|Matricule|Social security number)\b/i,
  alter: /^(Alter|Âge|Age)$/i, schule: /^(Schule|École|Ecole|School)$/i, klasse: /^(Klasse|Classe|Class)$/i, sprachen: /^(Sprachen|Langues|Languages)$/i };
const DECK_PLATZHALTER = /^(NAME Vorname|Prénom et NOM|NOM Prénom|2000 04 03 XXXXX|Name der Schule und Ort|C\.?|Luxemburgisch, Portugiesisch, Deutsch, Französisch, Englisch)$/;
const KREUZ = /^\s*(?:☒|☑|✓|✔|⌧|☓|✗|\[x\]|\(x\))\s*(.*)$/i, LEER = /^\s*(?:☐|□|\[ \])\s*(.*)$/;
function deckblattLesen(zeilen, x) {
  const werte = {}, cni = [];
  const D = tafeln().deckblatt;
  const cniNamen = [];
  Object.keys(D).forEach(function (l) { Object.keys(D[l].cni).forEach(function (k) { const v = D[l].cni[k]; (Array.isArray(v) ? v : [v]).forEach(function (t) { cniNamen.push({ k: k, sk: skText(t, 'x').trim() }); }); }); });
  const cniKey = function (t) {
    const s = skText(t, 'x').trim();
    if (!s) { return null; }
    const e = cniNamen.filter(function (c) { return c.sk === s; })[0] || cniNamen.filter(function (c) { return aehnlich(c.sk, s) >= 0.88; })[0];
    return e ? e.k : null;
  };
  const t = zeilen.map(function (z) { return z.trim(); });
  t.forEach(function (z, i) {
    if (!z) { return; }
    Object.keys(DECK_LABEL).forEach(function (feld) {
      if (werte[feld] != null) { return; }
      const c = zellen(z), lab = c[0].replace(/[:：]\s*$/, '');
      if (!DECK_LABEL[feld].test(lab)) { return; }
      let wert = c.length > 1 ? c.slice(1).join(' ') : '';
      if (!wert) { for (let j = i + 1; j < t.length && j <= i + 2; j++) { if (t[j]) { wert = t[j]; break; } } }
      if (wert && !DECK_PLATZHALTER.test(wert.trim()) && !Object.keys(DECK_LABEL).some(function (f) { return DECK_LABEL[f].test(wert); })) { werte[feld] = wert.trim(); }
    });
    // Empfehlungen an die CNI: angekreuzt
    const kr = KREUZ.exec(z);
    if (kr) {
      const text = kr[1] || (t[i + 1] || '');
      const k = cniKey(text);
      if (k && cni.indexOf(k) < 0) { cni.push(k); }
    }
    if (/^Name des Schülers\b/.test(z) && !/Schülerin/.test(z)) { x.g.m += 2; }
    if (/^Name der Schülerin\b/.test(z)) { x.g.w += 2; }
  });
  if (werte.name) {
    const n = werte.name, teile = n.split(/\s+/), gross = teile.filter(function (w) { return w.length > 1 && w === w.toUpperCase(); });
    const vor = teile.filter(function (w) { return gross.indexOf(w) < 0; });
    x.nameDazu(vor.length && gross.length ? gross.join(' ') + ', ' + vor.join(' ') : n, 1);
    x.deckName = vor.length && gross.length ? vor.join(' ') + ' ' + gross.map(function (w) { return w.charAt(0) + w.slice(1).toLowerCase(); }).join(' ') : n;
  }
  x.deckblatt = { werte: werte, cni: cni };
  x.erg.abschnitte.deckblatt = { titel: '', text: zeilen.join('\n').trim(), werte: werte };
}
function titelGeschlecht(a, x) {
  if (x.lang !== 'de' || ['kind', 'beduerfnisse', 'produktionen'].indexOf(a.id) < 0) { return; }
  const T = (tafeln().titel.de || {})[a.id];
  if (!Array.isArray(T)) { return; }
  const k = skText(String(a.titel).replace(/^\s*\d(?:\s*[.,]\s*\d)?\s*[.)]?\s*/, ''), 'de').trim();
  if (k === skText(T[0], 'de').trim()) { x.g.m += 3; }
  if (k === skText(T[1], 'de').trim()) { x.g.w += 3; }
}

// ---------- Ein Abschnitt ----------
function abschnittLesen(ab, x) {
  const id = ab.id;
  x.erg.abschnitte[id || 'unbekannt'] = { titel: ab.titel || '', text: ab.zeilen.join('\n').replace(/\n{3,}/g, '\n\n').trim() };
  if (id === 'raster' || id === 'produktionen' || id === 'anhang') { return; }
  let zeilen = ab.zeilen;
  if (id === 'vorgeschichte' || id === 'anamnese') { zeilen = tabelleLesen(zeilen, 'vorgeschichte', x); }
  if (id === 'massnahmen' || id === 'aktuell') { zeilen = tabelleLesen(zeilen, 'aktuell', x); }
  if (id === 'interventionen') { interventionenLesen(zeilen, x); return; }
  if (id === 'ziele' || id === 'empfehlungen' || id === 'cni') { listenAbschnitt(id, zeilen, x); return; }
  x.merk = {};
  const einheiten = [];
  bloecke(zeilen, x.umbrochen).forEach(function (b, bi) {
    if (istAnleitung(b.text)) { return; }
    if (id === 'eldib' && ELDIB_ZIEL.test(b.text)) { return; }   // Lernziel aus dem ELDiB ("V-5 – …")
    saetze(b.text).forEach(function (s) { einheiten.push({ text: s, block: bi, nachLeer: b.nachLeer }); });
  });
  const leseId = id === 'anamnese' ? 'vorgeschichte' : id;
  einheiten.forEach(function (u) { einheitLesen(u, leseId, x); if (id === 'eldib') { u.eldib = x.merk.eldibBereich; } });
  freiZuordnen(einheiten, leseId, x);
}

// ---------- Nacharbeit: Verfahren, Deckblatt, Name, Geschlecht, Herkunft ----------
function verfahrenAuswerten(x) {
  const v = x.verfahren;
  if (!v || !v.e) { return; }
  const lang = x.lang, text = v.e.orig, wo = v.wo;
  const auf = wo.auf, teile = text.split(new RegExp(',\\s+(?=' + auf + '\\s)|\\s+' + wo.und + '\\s+(?=' + auf + '\\s)'));
  const erster = teile.shift().replace(new RegExp('^' + auf + '\\s+'), '');
  listeAnwenden({ orig: erster, roh: skText(erster, lang).trim() }, 'chip:verfahren', { rest: 'verfahren_andere' }, x, v.beleg, v.sicher, 'verfahren');
  const beobDaten = Object.keys(x.erg.bewertungen).some(function (id) { return /^b_/.test(id); }) || x.erg.f.beobachtungen || x.erg.frei.beobachtung;
  teile.forEach(function (t) {
    const k = skText(t, lang).trim();
    if (k === skText(wo.beob, lang).trim() && !beobDaten) { x.chip('verfahren', 'beobachtung', v.sicher, v.beleg); }
    if (k === skText(wo.gespr, lang).trim()) { x.chip('verfahren', 'gespraeche', v.sicher, v.beleg); }
  });
}
// Reihenfolge nutzen: 46-ds-text.js ordnet die Sätze eines Themas nach Stärke (v = r, bei Schwierigkeiten 8 − r)
// absteigend, bei Gleichstand nach dem Platz in der Liste; Ängste, Abwehr, Erklärungen und Bedürfnisse nach r
// absteigend. Steht ein Satz vor einem aus demselben Band mit kleinerem Listenplatz, muss er höher bewertet sein
// (z. B. 7 vor 6). Gewählt wird je Band weiter der Wert nahe 4, soweit die Reihenfolge es zulässt.
function ordnen(l, v, x) {
  if (l.length < 2) { return; }
  const dom = l.map(function (e) { return e.band.slice(); });
  const passt = function (a, ra, b, rb) { return v(a, ra) > v(b, rb) || (v(a, ra) === v(b, rb) && a.platz < b.platz); };
  for (let runde = 0; runde < 20; runde++) {
    let neu = false;
    for (let k = 0; k + 1 < l.length; k++) {
      const a = l[k], b = l[k + 1];
      const da = dom[k].filter(function (ra) { return dom[k + 1].some(function (rb) { return passt(a, ra, b, rb); }); });
      const db = dom[k + 1].filter(function (rb) { return dom[k].some(function (ra) { return passt(a, ra, b, rb); }); });
      if (da.length && da.length < dom[k].length) { dom[k] = da; neu = true; }
      if (db.length && db.length < dom[k + 1].length) { dom[k + 1] = db; neu = true; }
    }
    if (!neu) { break; }
  }
  let vor = null;
  l.forEach(function (e, k) {
    const g = x.erg.bewertungen[e.id];
    if (!g || g.band.join() !== e.band.join()) { vor = null; return; }
    let kand = dom[k];
    if (vor) { const f = kand.filter(function (r) { return passt(vor.e, vor.r, e, r); }); if (f.length) { kand = f; } }
    const w = vertreter(kand);
    if (w !== g.wert) { g.wert = w; g.reihenfolge = true; }
    vor = { e: e, r: w };
  });
}
function reihenfolgeNutzen(x) {
  const gruppen = {}, liste = [];
  x.folge.forEach(function (e) { if (e.vorne) { return; } const k = e.abschnitt + '|' + e.bereich + '|' + e.thema; if (!gruppen[k]) { gruppen[k] = []; liste.push(gruppen[k]); } gruppen[k].push(e); });
  liste.forEach(function (l) { ordnen(l, function (e, r) { return e.pol < 0 ? 8 - r : r; }, x); });
  x.listenFolge.forEach(function (l) { ordnen(l, function (e, r) { return r; }, x); });
}
function nachbereiten(x) {
  const erg = x.erg;
  verfahrenAuswerten(x);
  reihenfolgeNutzen(x);
  // Deckblatt als Rückfall (Werte des Deckblatts stehen auch im Text)
  const d = x.deckblatt;
  if (d) {
    if (d.cni.length && !(erg.chips.cni || []).length) {
      const sub = d.cni.some(function (k) { return ['clapa', 'cst', 'annexe'].indexOf(k) >= 0; });
      d.cni.forEach(function (k) { if (!(sub && k === 'beschulung')) { x.chip('cni', k, 0.8, 'Deckblatt'); } });
    }
    if (d.werte.klasse) { x.fakt('klasse', d.werte.klasse, 0.6, 'Deckblatt'); }
    if (d.werte.schule) { x.fakt('schule_name', d.werte.schule, 0.6, 'Deckblatt'); }
    if (d.werte.sprachen && !(erg.chips.sprachen || []).length) {
      const T = x.L.T.chips.sprachen;
      d.werte.sprachen.split(/\s*,\s*/).forEach(function (s) {
        const k = Object.keys(T).filter(function (key) { return key !== 'andere' && skText(T[key][0], x.lang).trim() === skText(s, x.lang).trim(); })[0];
        if (k) { x.chip('sprachen', k, 0.7, 'Deckblatt'); }
      });
    }
  }
  // Geschlecht aus Pronomen, Angleichungen, Überschriften
  const g = x.g;
  erg.geschlecht = (g.m >= 2 && g.m > 2 * g.w) ? 'm' : ((g.w >= 2 && g.w > 2 * g.m) ? 'w' : '');
  // Name: Vollname aus dem Auftrag, sonst Deckblatt, sonst der häufigste Vorname in den Sätzen
  if (!erg.name) { erg.name = x.vollname || x.deckName || ''; }
  if (!erg.name) {
    let best = null;
    Object.keys(x.namenZahl).forEach(function (n) { if (!best || x.namenZahl[n] > x.namenZahl[best]) { best = n; } });
    if (best && x.namenZahl[best] >= 2) { erg.name = x.opt.vorname || (x.namenOrig && x.namenOrig[best]) || best.replace(/(^| )(\S)/g, function (m, a, b) { return a + b.toUpperCase(); }); }
  }
  if (!erg.name && x.opt.name) { erg.name = x.opt.name; }
  // Tabellen vom Aufrufer (aus Word) haben Vorrang
  const vt = x.opt.tabellen;
  if (vt && typeof vt === 'object') { Object.keys(DS_TABELLEN_SPALTEN()).forEach(function (t) { if (Array.isArray(vt[t])) { erg.tabellen[t] = tabelleNormalisieren(vt[t], t); } }); }
  // Herkunft: Anteil der Sätze, die eine Vorlage des Generators erklärt
  const n = x.zahl.einheiten, v = x.zahl.vorlage, q = n ? v / n : 0;
  erg.herkunft = (n >= 5 && q >= 0.6) ? 'generator' : (q <= 0.15 ? 'frei' : 'gemischt');
  Object.keys(erg.chips).forEach(function (k) { if (!erg.chips[k].length) { delete erg.chips[k]; } });
}
function DS_TABELLEN_SPALTEN() { return tafeln().tabellen; }
// Tabellen vom Aufrufer: Zeilen als Objekte (Spaltennamen) oder als Zellenlisten (mit oder ohne Kopfzeile)
function tabelleNormalisieren(rows, t) {
  const spalten = DS_TABELLEN_SPALTEN()[t], aus = [];
  rows.forEach(function (r, i) {
    if (Array.isArray(r)) {
      const zellenL = r.map(function (c) { return String(c == null ? '' : c).trim(); });
      if (i === 0 && zellenL.some(function (c, j) { return spalten[j] && istKopf(c, spalten[j]); })) { return; }
      if (t === 'interventionen') {
        // 6.1 aus Word: [Art, Daten]
        const art = Object.keys(IV_VORLAGE).filter(function (a) { return IV_VORLAGE[a].concat(SPRACHEN.map(function (s) { return ((tafeln().ui[s] || {}).opt || {}).interventionen ? tafeln().ui[s].opt.interventionen[a] : ''; })).some(function (l) { return l && skText(l, 'x').trim() === skText(zellenL[0], 'x').trim(); }); })[0];
        if (art) { datenImText(zellenL.slice(1).join(' ')).forEach(function (d) { aus.push({ datum: d, art: art }); }); return; }
      }
      const o = {}; spalten.forEach(function (s, j) { o[s] = zellenL[j] || ''; }); aus.push(o);
    } else if (r && typeof r === 'object') { const o = {}; spalten.forEach(function (s) { o[s] = r[s] == null ? '' : String(r[s]); }); aus.push(o); }
  });
  return aus.filter(function (o) { return spalten.some(function (s) { return o[s]; }); });
}

// ---------- Lesen ----------
function lesen(text, opt) {
  opt = opt || {};
  let gegeben = null;
  if (opt.abschnitte && typeof opt.abschnitte === 'object') {
    gegeben = Array.isArray(opt.abschnitte) ? opt.abschnitte : Object.keys(opt.abschnitte).map(function (id) { return { id: id, text: opt.abschnitte[id] }; });
  }
  const seitenvorschub = /\f/.test(String(text || ''));
  // zuerst Kopf-/Fußzeilen weg (sie können mitten in einem getrennten Wort stehen), dann säubern
  const vorab = String(text || '').replace(/\r\n?/g, '\n');
  const vorLang = SPRACHEN.indexOf(opt.sprache) >= 0 ? opt.sprache : spracheErkennen(vorab);
  const vorX = { lang: vorLang, seitenvorschub: seitenvorschub, fakt: function (k, v, s, b) { vorX.datum = vorX.datum || { wert: v, sicher: s, beleg: b }; } };
  const ohneKopf = kopfFussEntfernen(vorab.split('\n'), vorX);
  const roh = saeubern(ohneKopf.join('\n'), vorLang);
  const alle = roh + (gegeben ? '\n' + gegeben.map(function (a) { return a.text || ''; }).join('\n') : '');
  const lang = SPRACHEN.indexOf(opt.sprache) >= 0 ? opt.sprache : spracheErkennen(alle);
  const L = sprachDaten(lang);
  const x = neuerKontext(L, opt);
  x.seitenvorschub = seitenvorschub;
  x.umbrochen = umbrochen(alle.split('\n'));
  x.breite = zeilenBreite(ohneKopf.concat(gegeben ? gegeben.map(function (a) { return a.text || ''; }).join('\n').split('\n') : []));
  // Leerzeilen zwischen Absätzen selten (Text aus Word): dann trennt eine Leerzeile Absätze innerhalb eines Feldes
  const zl = alle.split('\n'), leerZ = zl.filter(function (z) { return !z.trim(); }).length;
  x.leerSelten = leerZ < 0.3 * (zl.length - leerZ);
  if (vorX.datum) { x.fakt('bericht_datum', vorX.datum.wert, vorX.datum.sicher, vorX.datum.beleg); }
  let gl;
  if (gegeben) {
    const ids = tafeln().gliederung.map(function (g) { return g.id; });
    gl = { vor: roh ? roh.split('\n') : [], abschnitte: gegeben.map(function (a) {
      let id = ids.indexOf(a.id) >= 0 ? a.id : null;
      if (!id && a.titel) { const u = ueberschrift(a.titel, lang); id = u ? u.id : null; }
      return { id: id, titel: a.titel || '', zeilen: saeubern(a.text || '', lang).split('\n') };
    }) };
  } else {
    gl = gliedern(roh.split('\n'), x);
    if (!gl.abschnitte.length) { gl = { vor: gl.vor, abschnitte: [{ id: null, titel: '', zeilen: gl.vor }] }; }
  }
  deckblattLesen(gl.vor, x);
  gl.abschnitte.forEach(function (a) { titelGeschlecht(a, x); });
  gl.abschnitte.forEach(function (a) { abschnittLesen(a, x); });
  nachbereiten(x);
  return x.erg;
}

// ---------- Übernehmen in die Daten des DS-Assistenten ----------
// auswahl: weggelassen -> alles mit sicher >= 0.7 (Vorschläge aus Freitext bleiben draußen),
//          Freitexte und Tabellen ganz; 'alles' | true -> alles, auch Vorschläge;
//          { bewertungen, chips, f, frei, tabellen: true | false | ['id', …] (chips: { gruppe: true | ['key'] }),
//            bewertungen auch { id: wert } (Wert selbst gewählt), geschlecht: true | false, minSicher: 0.7 }
// Bestehende Werte, die nicht übernommen werden, bleiben erhalten; Auswahlfelder, Tabellen,
// Beobachtungen und Freitexte werden ergänzt (nichts doppelt), einzelne Felder überschrieben.
const ZEILEN_FELD = { ziele_zusatz: 1, empfehlung_familie: 1, empfehlung_schule: 1, empfehlung_region: 1 };
function anwenden(dsData, erg, auswahl) {
  const d = (dsData && typeof dsData === 'object') ? JSON.parse(JSON.stringify(dsData)) : {};
  const aus = { v: 2, geschlecht: d.geschlecht === 'm' || d.geschlecht === 'w' ? d.geschlecht : '', bewertungen: {}, chips: {}, f: {}, frei: {}, tabellen: {}, bearbeitet: {} };
  if (d.v === 2 || !Object.keys(d).length) {
    ['bewertungen', 'chips', 'f', 'frei', 'bearbeitet'].forEach(function (k) { if (d[k] && typeof d[k] === 'object') { aus[k] = d[k]; } });
    if (d.alt) { aus.alt = d.alt; }
  } else { aus.alt = d; }
  const spalten = DS_TABELLEN_SPALTEN();
  Object.keys(spalten).forEach(function (t) { aus.tabellen[t] = (d.v === 2 && d.tabellen && Array.isArray(d.tabellen[t])) ? d.tabellen[t] : []; });
  if (!erg) { return aus; }
  const alles = auswahl === true || auswahl === 'alles';
  const a = (auswahl && typeof auswahl === 'object') ? auswahl : {};
  const min = typeof a.minSicher === 'number' ? a.minSicher : (alles ? 0 : 0.7);
  const erlaubt = function (teil, key, sicher) {
    const s = alles ? true : a[teil];
    if (s === false) { return false; }
    if (s === undefined || s === true) { return sicher == null || sicher >= min; }
    if (Array.isArray(s)) { return s.indexOf(key) >= 0; }
    if (typeof s === 'object') { return Object.prototype.hasOwnProperty.call(s, key) && s[key] !== false; }
    return false;
  };
  Object.keys(erg.bewertungen || {}).forEach(function (id) {
    const b = erg.bewertungen[id];
    if (!erlaubt('bewertungen', id, b.sicher)) { return; }
    const eigen = a.bewertungen && typeof a.bewertungen === 'object' && !Array.isArray(a.bewertungen) ? a.bewertungen[id] : null;
    const wert = typeof eigen === 'number' ? eigen : b.wert;
    if (wert >= 1 && wert <= 7) { aus.bewertungen[id] = wert; }
  });
  Object.keys(erg.chips || {}).forEach(function (g) {
    const s = alles ? true : (a.chips === undefined ? true : a.chips);
    if (s === false) { return; }
    let nur = null;
    if (s !== true) {
      if (Array.isArray(s)) { if (s.indexOf(g) < 0) { return; } }
      else if (typeof s === 'object') { if (!s[g]) { return; } if (Array.isArray(s[g])) { nur = s[g]; } }
    }
    (erg.chips[g] || []).forEach(function (c) {
      if (nur ? nur.indexOf(c.key) < 0 : (c.sicher != null && c.sicher < min)) { return; }
      const l = aus.chips[g] || (aus.chips[g] = []);
      if (l.indexOf(c.key) < 0) { l.push(c.key); }
    });
  });
  Object.keys(erg.f || {}).forEach(function (feld) {
    const e = erg.f[feld];
    if (!erlaubt('f', feld, e.sicher)) { return; }
    const v = e.wert;
    if (feld === 'beobachtungen' && Array.isArray(v)) {
      const l = Array.isArray(aus.f.beobachtungen) ? aus.f.beobachtungen : (aus.f.beobachtungen = []);
      const sig = function (b) { return [b.datum || '', b.setting || '', b.setting_andere || '', b.dauer || ''].join('|'); };
      v.forEach(function (b) { if (!l.some(function (o) { return sig(o) === sig(b) || (b.datum && o.datum === b.datum && !b.setting && !b.dauer); })) { l.push(Object.assign({}, b)); } });
    } else if (v && typeof v === 'object' && !Array.isArray(v)) { aus.f[feld] = Object.assign({}, aus.f[feld] || {}, v); }
    else { aus.f[feld] = v; }
  });
  Object.keys(erg.frei || {}).forEach(function (feld) {
    if (!erlaubt('frei', feld, null)) { return; }
    const neu = String(erg.frei[feld] || '').trim();
    if (!neu) { return; }
    const alt = String(aus.frei[feld] || '').trim();
    if (!alt) { aus.frei[feld] = neu; } else if (alt.indexOf(neu) < 0) { aus.frei[feld] = alt + (ZEILEN_FELD[feld] ? '\n' : '\n\n') + neu; }
  });
  Object.keys(erg.tabellen || {}).forEach(function (t) {
    if (!spalten[t] || !erlaubt('tabellen', t, null)) { return; }
    const sig = function (r) { return JSON.stringify(spalten[t].map(function (s) { return String(r[s] || '').trim(); })); };
    const da = aus.tabellen[t].map(sig);
    (erg.tabellen[t] || []).forEach(function (r) { const s = sig(r); if (da.indexOf(s) < 0) { const o = {}; spalten[t].forEach(function (k) { o[k] = r[k] || ''; }); aus.tabellen[t].push(o); da.push(s); } });
  });
  if (erg.geschlecht && !aus.geschlecht && (alles || a.geschlecht !== false)) { aus.geschlecht = erg.geschlecht; }
  return aus;
}

return {
  version: VERSION, lesen: lesen, anwenden: anwenden,
  // für Tests und Hilfsprogramme
  _intern: { saeubern: saeubern, skelett: skelett, kompiliere: kompiliere, gliedern: gliedern, saetze: saetze, sprachDaten: sprachDaten, freiVorschlaege: freiVorschlaege, vertreter: vertreter, tafeln: tafeln, datenImText: datenImText }
};
})();
