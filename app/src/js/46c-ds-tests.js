// =====================================================================
// Testergebnisse im DS (z. B. WISC-V): aus dem CDSE Hub übernehmen, bearbeiten,
// im Bericht unter 4.2 „Ergebnisse der Testverfahren“ als Tabelle und kurzer Text
// ---------------------------------------------------------------------
// Das Team Diagnostique trägt Tests im CDSE Hub beim Kind ein; beim Öffnen aus dem
// Hub legt dieser sie beim Schüler in der Schülerliste ab (cdseTests, Ebene des
// Schülers – bleibt beim Speichern erhalten, ältere Fassungen übergehen das Feld).
// Der DS-Assistent zeigt sie im Schritt „ELDiB-Ergebnisse“ (Abschnitt 4.2);
// „Übernehmen“ kopiert sie nach dsData.tests – danach hier bearbeitbar. Nichts, was
// im DS schon steht, wird dabei überschrieben (eine Handbearbeitung von 4.2 bleibt
// und wird nur als „veraltet“ markiert).
// Datenmodell (dsData.tests[], gleiche Form wie im Hub):
//   { id, verfahren: 'wisc-v' | 'anderes', name, sprache: 'de' | 'fr' (Testfassung),
//     datum, leiter, ki: 90 | 95,
//     zeilen: [{ k, bez, sw, pr, kiVon, kiBis, band, einordnung }],   Werte als Text, wie eingetragen
//     untertests: [{ k, bez, ww }], text,
//     hub: { id, stand } }                                             Herkunft im Hub (Kennung, Stand)
// WISC-V: Primärindizes (k = VCI, VSI, FRI, WMI, PSI) und Gesamt-IQ (FSIQ) mit den
// Bezeichnungen der deutschen, französischen und englischen Fassung. Die Einordnung
// (band) folgt den Wertebereichen ≥130, 120–129, 110–119, 90–109, 80–89, 70–79, ≤69;
// sie kann auch frei formuliert sein (einordnung). Der Wortlaut der Einordnungen in
// DE und FR ist gegen das jeweilige Handbuch zu prüfen (EN nach dem Handbuch).
// Liegt auch in apps/ds-motor.js (Hub): DsText.bericht nutzt bloecke().
// =====================================================================
const DsTests = (function () {
  'use strict';
  const INDIZES = ['VCI', 'VSI', 'FRI', 'WMI', 'PSI', 'FSIQ'];
  const INDEX_NAME = {
    de: { VCI: 'Sprachverständnis (SV)', VSI: 'Visuell-räumliche Verarbeitung (VR)', FRI: 'Fluides Schlussfolgern (FS)', WMI: 'Arbeitsgedächtnis (AG)', PSI: 'Verarbeitungsgeschwindigkeit (VG)', FSIQ: 'Gesamt-IQ (GIQ)' },
    fr: { VCI: 'Compréhension verbale (ICV)', VSI: 'Visuospatial (IVS)', FRI: 'Raisonnement fluide (IRF)', WMI: 'Mémoire de travail (IMT)', PSI: 'Vitesse de traitement (IVT)', FSIQ: 'QI total (QIT)' },
    en: { VCI: 'Verbal Comprehension (VCI)', VSI: 'Visual Spatial (VSI)', FRI: 'Fluid Reasoning (FRI)', WMI: 'Working Memory (WMI)', PSI: 'Processing Speed (PSI)', FSIQ: 'Full Scale IQ (FSIQ)' }
  };
  const UNTERTESTS = ['SI', 'VC', 'BD', 'VP', 'MR', 'FW', 'DS', 'PS', 'CD', 'SS'];
  const UNTERTEST_NAME = {
    de: { SI: 'Gemeinsamkeiten finden', VC: 'Wortschatz-Test', BD: 'Mosaik-Test', VP: 'Visuelle Puzzles', MR: 'Matrizen-Test', FW: 'Formenwaage', DS: 'Zahlen nachsprechen', PS: 'Bildspanne', CD: 'Zahlen-Symbol-Test', SS: 'Symbol-Suche' },
    fr: { SI: 'Similitudes', VC: 'Vocabulaire', BD: 'Cubes', VP: 'Puzzles visuels', MR: 'Matrices', FW: 'Balances', DS: 'Mémoire des chiffres', PS: 'Mémoire des images', CD: 'Code', SS: 'Recherche de symboles' },
    en: { SI: 'Similarities', VC: 'Vocabulary', BD: 'Block Design', VP: 'Visual Puzzles', MR: 'Matrix Reasoning', FW: 'Figure Weights', DS: 'Digit Span', PS: 'Picture Span', CD: 'Coding', SS: 'Symbol Search' }
  };
  // [Schlüssel, von, bis, Bereich als Text]
  const BAENDER = [['sehr_hoch', 130, 999, '≥ 130'], ['hoch', 120, 129, '120–129'], ['oberer', 110, 119, '110–119'], ['mittel', 90, 109, '90–109'],
    ['unterer', 80, 89, '80–89'], ['niedrig', 70, 79, '70–79'], ['sehr_niedrig', -999, 69, '≤ 69']];
  const BAND_NAME = {
    de: { sehr_hoch: 'weit überdurchschnittlich', hoch: 'überdurchschnittlich', oberer: 'oberer Durchschnittsbereich', mittel: 'durchschnittlich', unterer: 'unterer Durchschnittsbereich', niedrig: 'unterdurchschnittlich', sehr_niedrig: 'weit unterdurchschnittlich' },
    fr: { sehr_hoch: 'très supérieur', hoch: 'supérieur', oberer: 'moyen supérieur', mittel: 'moyen', unterer: 'moyen inférieur', niedrig: 'faible', sehr_niedrig: 'très faible' },
    en: { sehr_hoch: 'Extremely High', hoch: 'Very High', oberer: 'High Average', mittel: 'Average', unterer: 'Low Average', niedrig: 'Very Low', sehr_niedrig: 'Extremely Low' }
  };
  const UI = {
    de: { titel: 'Testergebnisse (z. B. WISC-V)', erklaerung: 'Stehen unter 4.2 „Ergebnisse der Testverfahren“ – als Tabelle mit kurzem Text, nach den ELDiB-Ergebnissen.',
      hub: 'Aus dem CDSE Hub (Team Diagnostique): {n} Test(s). Mit „Übernehmen“ kommen Tabelle und Text in den Bericht; danach lassen sie sich hier bearbeiten.',
      uebernehmen: 'In den Bericht übernehmen', alle: 'Alle übernehmen', uebernommen: 'im Bericht', neuer: 'Im Hub geändert ({datum}) – im Bericht steht ein älterer Stand.', neuUebernehmen: 'Neu übernehmen',
      entfernen: 'Aus dem Bericht entfernen', hinzu: '+ Test von Hand eintragen', keine: 'Noch keine Testergebnisse. Das Team Diagnostique trägt Tests im CDSE Hub beim Kind ein – sie erscheinen dann hier zum Übernehmen.',
      name: 'Verfahren', datum: 'Datum', leiter: 'Testleitung', ki: 'Konfidenzintervall', text: 'Kurze Interpretation (Text unter der Tabelle)',
      index: 'Index', bez: 'Bezeichnung', sw: 'Standardwert', wert: 'Wert', pr: 'Prozentrang', kiVon: 'KI von', kiBis: 'KI bis', kiSpalte: 'Konfidenzintervall ({ki} %)', ein: 'Einordnung',
      untertests: 'Untertests (Wertpunkte)', untertest: 'Untertest', ww: 'Wertpunkte', zeileHinzu: '+ Zeile', zeileWeg: 'Zeile entfernen', frei: 'frei',
      intro: 'Durchführung am {datum}{leiter: durch {leiter}}.', introOhneDatum: '{leiter:Testleitung: {leiter}.}', zeigt: 'Die Tabelle zeigt {liste}.',
      spalten: { sw: 'die Standardwerte (Mittelwert 100, Standardabweichung 15)', pr: 'die Prozentränge', ki: 'das Konfidenzintervall ({ki} %)', ein: 'die Einordnung' } },
    fr: { titel: 'Résultats aux tests (p. ex. WISC-V)', erklaerung: 'Figurent sous 4.2 « Résultats des tests » – tableau et court texte, après les résultats ELDiB.',
      hub: 'Depuis le CDSE Hub (équipe Diagnostique) : {n} test(s). « Reprendre » insère le tableau et le texte dans le rapport ; ils restent modifiables ici.',
      uebernehmen: 'Reprendre dans le rapport', alle: 'Tout reprendre', uebernommen: 'dans le rapport', neuer: 'Modifié dans le Hub ({datum}) – le rapport contient une version antérieure.', neuUebernehmen: 'Reprendre à nouveau',
      entfernen: 'Retirer du rapport', hinzu: '+ Saisir un test à la main', keine: 'Pas encore de résultats aux tests. L’équipe Diagnostique les saisit dans le CDSE Hub ; ils apparaissent ensuite ici.',
      name: 'Procédure', datum: 'Date', leiter: 'Passation', ki: 'Intervalle de confiance', text: 'Courte interprétation (texte sous le tableau)',
      index: 'Indice', bez: 'Désignation', sw: 'Note standard', wert: 'Score', pr: 'Rang percentile', kiVon: 'IC de', kiBis: 'IC à', kiSpalte: 'Intervalle de confiance ({ki} %)', ein: 'Classification',
      untertests: 'Subtests (notes standard)', untertest: 'Subtest', ww: 'Note standard', zeileHinzu: '+ Ligne', zeileWeg: 'Supprimer la ligne', frei: 'libre',
      intro: 'Passation le {datum}{leiter: par {leiter}}.', introOhneDatum: '{leiter:Passation : {leiter}.}', zeigt: 'Le tableau présente {liste}.',
      spalten: { sw: 'les notes standard (moyenne 100, écart-type 15)', pr: 'les rangs percentiles', ki: 'l’intervalle de confiance ({ki} %)', ein: 'la classification' } },
    en: { titel: 'Test results (e.g. WISC-V)', erklaerung: 'Appear under 4.2 “Test results” – a table with a short text, after the ELDiB results.',
      hub: 'From the CDSE Hub (Diagnostique team): {n} test(s). “Add” puts the table and text into the report; they can then be edited here.',
      uebernehmen: 'Add to the report', alle: 'Add all', uebernommen: 'in the report', neuer: 'Changed in the Hub ({datum}) – the report holds an older version.', neuUebernehmen: 'Add again',
      entfernen: 'Remove from the report', hinzu: '+ Enter a test by hand', keine: 'No test results yet. The Diagnostique team enters tests in the CDSE Hub; they then appear here.',
      name: 'Procedure', datum: 'Date', leiter: 'Examiner', ki: 'Confidence interval', text: 'Short interpretation (text below the table)',
      index: 'Index', bez: 'Scale', sw: 'Standard score', wert: 'Score', pr: 'Percentile rank', kiVon: 'CI from', kiBis: 'CI to', kiSpalte: 'Confidence interval ({ki}%)', ein: 'Qualitative descriptor',
      untertests: 'Subtests (scaled scores)', untertest: 'Subtest', ww: 'Scaled score', zeileHinzu: '+ Row', zeileWeg: 'Remove row', frei: 'free',
      intro: 'Administered on {datum}{leiter: by {leiter}}.', introOhneDatum: '{leiter:Examiner: {leiter}.}', zeigt: 'The table shows {liste}.',
      spalten: { sw: 'the standard scores (mean 100, standard deviation 15)', pr: 'the percentile ranks', ki: 'the {ki}% confidence interval', ein: 'the qualitative descriptors' } }
  };

  function U(lang) { return UI[lang] || UI.de; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  // Platzhalter: {wert} und bedingt {feld: Text mit {feld}} (nur, wenn das Feld gefüllt ist) – verschachtelt wie in DsText
  function fmt(s, v) {
    s = String(s == null ? '' : s);
    let out = '', i = 0;
    while (i < s.length) {
      const ch = s.charAt(i);
      if (ch !== '{') { out += ch; i++; continue; }
      let tiefe = 1, j = i + 1;
      while (j < s.length && tiefe > 0) { if (s.charAt(j) === '{') { tiefe++; } else if (s.charAt(j) === '}') { tiefe--; } j++; }
      const innen = s.slice(i + 1, j - 1), m = /^(\w+):([\s\S]*)$/.exec(innen);
      if (m) { out += v[m[1]] ? fmt(m[2], v) : ''; } else { out += v[innen] != null ? v[innen] : '{' + innen + '}'; }
      i = j;
    }
    return out;
  }
  function text(v) { return v == null ? '' : String(v).trim(); }
  function zahl(v) { const s = text(v).replace(',', '.'); return /^-?\d+(\.\d+)?$/.test(s) ? +s : null; }
  function neueId() { return 'te' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function datumOk(t) { return /^\d{4}-\d{2}-\d{2}$/.test(text(t)) ? text(t) : ''; }
  function datumText(iso, lang) {
    if (!iso) { return ''; }
    if (typeof DsText !== 'undefined' && DsText.datum) { return DsText.datum(iso, lang); }
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
    return m ? m[3] + '.' + m[2] + '.' + m[1] : iso;
  }
  // Zahl im Text der Sprache: 0.5 -> „0,5“ (de, fr), 92 -> „92“
  function zahlText(v, lang) { const s = text(v); return lang === 'en' ? s.replace(',', '.') : s.replace('.', ','); }

  // ---------- Einordnung ----------
  function bandVon(sw) {
    const n = zahl(sw);
    if (n == null || n < 40 || n > 160) { return ''; }
    for (let i = 0; i < BAENDER.length; i++) { if (n >= BAENDER[i][1] && n <= BAENDER[i][2]) { return BAENDER[i][0]; } }
    return '';
  }
  function bandText(k, lang) { return (BAND_NAME[lang] || BAND_NAME.de)[k] || ''; }
  function bandBereich(k) { for (let i = 0; i < BAENDER.length; i++) { if (BAENDER[i][0] === k) { return BAENDER[i][3]; } } return ''; }
  // Ein getippter Text, der genau einer Einordnung entspricht (in irgendeiner Sprache) -> Schlüssel
  function bandAusText(t) {
    const s = text(t).toLowerCase();
    if (!s) { return ''; }
    for (const lang of Object.keys(BAND_NAME)) { for (const k of Object.keys(BAND_NAME[lang])) { if (BAND_NAME[lang][k].toLowerCase() === s) { return k; } } }
    return '';
  }
  function indexName(k, lang) { return (INDEX_NAME[lang] || INDEX_NAME.de)[k] || k; }
  function untertestName(k, lang) { return (UNTERTEST_NAME[lang] || UNTERTEST_NAME.de)[k] || k; }
  // Sprache der Beschriftungen: im Bericht die Berichtssprache, sonst die Testfassung
  function zeileName(t, z, lang) { return z.k ? indexName(z.k, lang) : z.bez; }
  function unterName(u, lang) { return u.k ? untertestName(u.k, lang) : u.bez; }
  function einordnungText(z, lang) { return z.band ? bandText(z.band, lang) : z.einordnung; }

  // ---------- Normalisieren ----------
  function normZeile(z) {
    z = z && typeof z === 'object' ? z : {};
    return { k: INDIZES.indexOf(z.k) >= 0 ? z.k : '', bez: text(z.bez), sw: text(z.sw), pr: text(z.pr), kiVon: text(z.kiVon), kiBis: text(z.kiBis),
      band: BAENDER.some(function (b) { return b[0] === z.band; }) ? z.band : '', einordnung: text(z.einordnung) };
  }
  function normUnter(u) { u = u && typeof u === 'object' ? u : {}; return { k: UNTERTESTS.indexOf(u.k) >= 0 ? u.k : '', bez: text(u.bez), ww: text(u.ww) }; }
  function zeileLeer(z) { return !z.sw && !z.pr && !z.kiVon && !z.kiBis && !z.band && !z.einordnung; }
  function norm(t) {
    t = t && typeof t === 'object' ? t : {};
    const art = t.verfahren === 'anderes' ? 'anderes' : 'wisc-v';
    let zeilen = (Array.isArray(t.zeilen) ? t.zeilen : []).map(normZeile);
    if (art === 'wisc-v') {
      // immer die sechs Indizes in fester Reihenfolge
      zeilen = INDIZES.map(function (k) { return zeilen.filter(function (z) { return z.k === k; })[0] || normZeile({ k: k }); });
    } else {
      zeilen = zeilen.filter(function (z) { return z.bez || !zeileLeer(z); }).map(function (z) { z.k = ''; return z; });
    }
    let unter = (Array.isArray(t.untertests) ? t.untertests : []).map(normUnter).filter(function (u) { return u.k || u.bez || u.ww; });
    if (art === 'wisc-v') {
      unter = UNTERTESTS.map(function (k) { return unter.filter(function (u) { return u.k === k; })[0] || normUnter({ k: k }); })
        .concat(unter.filter(function (u) { return !u.k; }));
    }
    const n = { id: text(t.id) || neueId(), verfahren: art, name: text(t.name) || (art === 'wisc-v' ? 'WISC-V' : ''), sprache: t.sprache === 'fr' ? 'fr' : 'de',
      datum: datumOk(t.datum), leiter: text(t.leiter), ki: zahl(t.ki) === 90 ? 90 : 95, zeilen: zeilen, untertests: unter, text: text(t.text) };
    if (t.hub && typeof t.hub === 'object' && t.hub.id) { n.hub = { id: text(t.hub.id), stand: text(t.hub.stand) }; }
    return n;
  }
  function normListe(l) { return (Array.isArray(l) ? l : []).filter(function (t) { return t && typeof t === 'object'; }).map(norm); }
  function hatWerte(t) { return t.zeilen.some(function (z) { return !zeileLeer(z); }) || t.untertests.some(function (u) { return u.ww; }) || !!t.text; }
  function neu(art, lang) { return norm({ verfahren: art, sprache: lang === 'fr' ? 'fr' : 'de', zeilen: art === 'anderes' ? [{}, {}, {}, {}] : [] }); }
  // Ein Test aus dem Hub (Form des Hubs: id, geaendert …) -> Test im DS mit Herkunft
  function ausHub(h) {
    const t = norm(h);
    t.hub = { id: text(h && h.id) || t.id, stand: text(h && (h.geaendert || h.erstellt)) };
    return t;
  }
  function sortiert(l) { return l.slice().sort(function (a, b) { return (b.datum || '').localeCompare(a.datum || ''); }); }

  // ---------- Tests des Hubs (Schülerliste des Generators) ----------
  function hubTests() {
    try {
      if (typeof smAktuellerSchueler === 'undefined' || !smAktuellerSchueler || typeof smGetListe !== 'function') { return []; }
      const s = smGetListe().filter(function (x) { return x && x.id === smAktuellerSchueler.id; })[0];
      // normalisiert, dazu der Stand im Hub (erstellt/geaendert) für „im Hub geändert“
      return s && Array.isArray(s.cdseTests) ? s.cdseTests.filter(function (t) { return t && typeof t === 'object' && t.id; })
        .map(function (t) { return Object.assign(norm(t), { erstellt: text(t.erstellt), geaendert: text(t.geaendert) }); }) : [];
    } catch (e) { return []; }
  }
  function imBericht(daten, hubId) { return (daten.tests || []).filter(function (t) { return t.hub && t.hub.id === hubId; })[0] || null; }
  // Übernehmen: ersetzt den Eintrag derselben Herkunft, sonst dazu; ergänzt das Verfahren in 4 (nur dazu, nie weg)
  function uebernehmen(daten, hubTest) {
    const t = ausHub(hubTest);
    daten.tests = Array.isArray(daten.tests) ? daten.tests : [];
    const i = daten.tests.findIndex(function (x) { return x.hub && x.hub.id === t.hub.id; });
    if (i >= 0) { daten.tests[i] = t; } else { daten.tests.push(t); }
    daten.chips = daten.chips || {}; daten.frei = daten.frei || {};
    if (t.verfahren === 'wisc-v') {
      const v = daten.chips.verfahren || (daten.chips.verfahren = []);
      if (v.indexOf('wisc') < 0) { v.push('wisc'); }
    } else if (t.name && !text(daten.frei.verfahren_andere)) { daten.frei.verfahren_andere = t.name; }
    return t;
  }

  // ---------- Bericht: Blöcke für 4.2 ----------
  function tabelle(t, lang) {
    const u = U(lang), zeilen = t.zeilen.filter(function (z) { return !zeileLeer(z) || (z.bez && t.verfahren === 'anderes'); });
    if (!zeilen.length) { return null; }
    const mitPr = zeilen.some(function (z) { return z.pr; }), mitKi = zeilen.some(function (z) { return z.kiVon || z.kiBis; }), mitEin = zeilen.some(function (z) { return einordnungText(z, lang); });
    const kopf = [t.verfahren === 'wisc-v' ? u.index : u.bez, t.verfahren === 'wisc-v' ? u.sw : u.wert], breiten = [3, 1.2];
    if (mitPr) { kopf.push(u.pr); breiten.push(1.2); }
    if (mitKi) { kopf.push(fmt(u.kiSpalte, { ki: t.ki })); breiten.push(1.8); }
    if (mitEin) { kopf.push(u.ein); breiten.push(2.6); }
    const rows = zeilen.map(function (z) {
      const r = [zeileName(t, z, lang), zahlText(z.sw, lang)];
      if (mitPr) { r.push(zahlText(z.pr, lang)); }
      if (mitKi) { r.push(z.kiVon || z.kiBis ? zahlText(z.kiVon, lang) + '–' + zahlText(z.kiBis, lang) : ''); }
      if (mitEin) { r.push(einordnungText(z, lang)); }
      return r;
    });
    return { typ: 'tabelle', id: 'test-' + t.id, kopf: kopf, zeilen: rows, breiten: breiten, spalten: { pr: mitPr, ki: mitKi, ein: mitEin } };
  }
  function untertestTabelle(t, lang) {
    const u = U(lang), l = t.untertests.filter(function (x) { return x.ww; });
    if (!l.length) { return null; }
    return { typ: 'tabelle', id: 'test-' + t.id + '-u', kopf: [u.untertest, u.ww], zeilen: l.map(function (x) { return [unterName(x, lang), zahlText(x.ww, lang)]; }), breiten: [3, 1] };
  }
  function liste(teile, lang) {
    if (typeof DsText !== 'undefined' && DsText.liste) { return DsText.liste(teile, { T: (typeof DS_TEXTE !== 'undefined' && DS_TEXTE[lang]) || { s: {} } }, false, true); }
    return teile.join(', ');
  }
  function bloecke(lang, ds) {
    const l = sortiert(normListe(ds && ds.tests)).filter(hatWerte), u = U(lang), out = [];
    l.forEach(function (t) {
      out.push({ typ: 'zwischen', text: t.name + (t.datum ? ' – ' + datumText(t.datum, lang) : '') });
      const saetze = [];
      const intro = t.datum ? fmt(u.intro, { datum: datumText(t.datum, lang), leiter: t.leiter }) : fmt(u.introOhneDatum, { leiter: t.leiter });
      if (intro) { saetze.push(intro); }
      const tab = tabelle(t, lang);
      if (tab && t.verfahren === 'wisc-v') {
        const sp = [u.spalten.sw];
        if (tab.spalten.pr) { sp.push(u.spalten.pr); }
        if (tab.spalten.ki) { sp.push(fmt(u.spalten.ki, { ki: t.ki })); }
        if (tab.spalten.ein) { sp.push(u.spalten.ein); }
        saetze.push(fmt(u.zeigt, { liste: liste(sp, lang) }));
      }
      if (saetze.length) { out.push({ typ: 'absatz', text: saetze.join(' ') }); }
      if (tab) { delete tab.spalten; out.push(tab); }
      const ut = untertestTabelle(t, lang);
      if (ut) { out.push(ut); }
      text(t.text).split(/\n\s*\n/).forEach(function (a) { const s = a.replace(/\s*\n\s*/g, ' ').trim(); if (s) { out.push({ typ: 'absatz', text: s }); } });
    });
    return out;
  }

  // ---------- Oberfläche im DS-Assistenten (Schritt „ELDiB-Ergebnisse“) ----------
  function vorschauTabelleHtml(t, lang) {
    const tab = tabelle(t, lang);
    if (!tab) { return ''; }
    return '<table class="dsb-tab"><thead><tr>' + tab.kopf.map(function (k) { return '<th>' + esc(k) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      tab.zeilen.map(function (z) { return '<tr>' + z.map(function (x) { return '<td>' + esc(x) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
  }
  function hubKopf(t, lang) { return '<b>' + esc(t.name) + (t.datum ? ' – ' + esc(datumText(t.datum, lang)) : '') + '</b>' + (t.leiter ? ' <span class="dsa-leise">' + esc(U(lang).leiter + ': ' + t.leiter) + '</span>' : ''); }
  function feld(label, inner, klasse) { return '<label class="dsa-feld' + (klasse ? ' ' + klasse : '') + '"><span>' + esc(label) + '</span>' + inner + '</label>'; }
  function eingabeFeld(i, f, wert, typ, extra) { return '<input class="dsa-eingabe" type="' + (typ || 'text') + '" data-ti="' + i + '" data-tf="' + f + '" value="' + esc(wert) + '"' + (extra || '') + '>'; }
  function zelle(i, j, f, z, lang, extra) {
    return '<td><input class="dsa-eingabe" type="text" data-ti="' + i + '" data-tz="' + j + '" data-tf="' + f + '" value="' + esc(z[f]) + '"' + (extra || '') + '></td>';
  }
  function testHtml(t, i, lang, hub) {
    const u = U(lang), wisc = t.verfahren === 'wisc-v', sp = wisc ? t.sprache : lang;
    const h = hub ? hub.filter(function (x) { return t.hub && x.id === t.hub.id; })[0] : null;
    const neuer = h && text(h.geaendert || h.erstellt) && t.hub.stand && text(h.geaendert || h.erstellt) > t.hub.stand;
    let s = '<div class="dsa-test" data-i="' + i + '"><div class="dsa-reihe">' +
      feld(u.name, eingabeFeld(i, 'name', t.name)) + feld(u.datum, eingabeFeld(i, 'datum', t.datum, 'date'), 'schmal') + feld(u.leiter, eingabeFeld(i, 'leiter', t.leiter)) +
      (wisc ? feld(u.ki, '<select class="dsa-eingabe" data-ti="' + i + '" data-tf="ki"><option value="95"' + (t.ki === 95 ? ' selected' : '') + '>95 %</option><option value="90"' + (t.ki === 90 ? ' selected' : '') + '>90 %</option></select>', 'schmal') : '') + '</div>';
    if (neuer) { s += '<p class="dsa-warnung">' + esc(fmt(u.neuer, { datum: datumText(text(h.geaendert || h.erstellt).slice(0, 10), lang) })) + ' <button type="button" class="dsa-link" data-aktion="testUebernehmen" data-hid="' + esc(h.id) + '">' + esc(u.neuUebernehmen) + '</button></p>'; }
    s += '<div class="dsa-tabwrap"><table class="dsa-tabelle dsa-testtab"><thead><tr><th>' + esc(wisc ? u.index : u.bez) + '</th><th>' + esc(wisc ? u.sw : u.wert) + '</th><th>' + esc(u.pr) + '</th><th>' + esc(u.kiVon) + '</th><th>' + esc(u.kiBis) + '</th><th>' + esc(u.ein) + '</th>' + (wisc ? '' : '<th></th>') + '</tr></thead><tbody>' +
      t.zeilen.map(function (z, j) {
        const vorschlag = bandVon(z.sw), ein = einordnungText(z, sp);
        return '<tr>' + (wisc ? '<th scope="row">' + esc(indexName(z.k, sp)) + '</th>' : zelle(i, j, 'bez', z, lang)) +
          zelle(i, j, 'sw', z, lang, ' inputmode="decimal"') + zelle(i, j, 'pr', z, lang, ' inputmode="decimal"') + zelle(i, j, 'kiVon', z, lang, ' inputmode="numeric"') + zelle(i, j, 'kiBis', z, lang, ' inputmode="numeric"') +
          '<td><input class="dsa-eingabe" type="text" list="dsa-baender-' + sp + '" data-ti="' + i + '" data-tz="' + j + '" data-tf="einordnung" value="' + esc(ein) + '"' + (vorschlag && !ein ? ' placeholder="' + esc(bandText(vorschlag, sp)) + '"' : '') + '></td>' +
          (wisc ? '' : '<td><button type="button" class="dsa-weg" data-aktion="testZeileWeg" data-i="' + i + '" data-j="' + j + '" title="' + esc(u.zeileWeg) + '" aria-label="' + esc(u.zeileWeg) + '">×</button></td>') + '</tr>';
      }).join('') + '</tbody></table></div>' +
      (wisc ? '' : '<button type="button" class="dsa-link" data-aktion="testZeileHinzu" data-i="' + i + '">' + esc(u.zeileHinzu) + '</button>');
    if (wisc) {
      s += '<details class="dsa-untertests"' + (t.untertests.some(function (x) { return x.ww; }) ? ' open' : '') + '><summary>' + esc(u.untertests) + '</summary><div class="dsa-unterliste">' +
        t.untertests.map(function (x, j) {
          return '<div class="dsa-unterzeile"><input class="dsa-eingabe" type="text" data-ti="' + i + '" data-tu="' + j + '" data-tf="bez" value="' + esc(unterName(x, sp)) + '"><input class="dsa-eingabe" type="number" min="1" max="19" data-ti="' + i + '" data-tu="' + j + '" data-tf="ww" value="' + esc(x.ww) + '" aria-label="' + esc(u.ww) + '"></div>';
        }).join('') + '</div></details>';
    }
    s += '<label class="dsa-feld voll"><span>' + esc(u.text) + '</span><textarea class="dsa-eingabe" rows="3" data-ti="' + i + '" data-tf="text">' + esc(t.text) + '</textarea></label>' +
      '<div class="dsa-testfuss">' + (t.hub ? '<span class="dsa-leise">' + esc(u.uebernommen) + '</span>' : '<span></span>') + '<button type="button" class="dsa-link" data-aktion="testWeg" data-i="' + i + '">' + esc(u.entfernen) + '</button></div></div>';
    return s;
  }
  function datalists() {
    return Object.keys(BAND_NAME).map(function (lang) { return '<datalist id="dsa-baender-' + lang + '">' + Object.keys(BAND_NAME[lang]).map(function (k) { return '<option value="' + esc(BAND_NAME[lang][k]) + '"></option>'; }).join('') + '</datalist>'; }).join('');
  }
  function html(daten, hub, lang) {
    const u = U(lang), tests = normListe(daten.tests), offen = hub.filter(function (h) { return !imBericht(daten, h.id); });
    let s = '<div class="dsa-karte dsa-tests"><div class="dsa-chiptitel">' + esc(u.titel) + '</div><p class="dsa-hinweis">' + esc(u.erklaerung) + '</p>';
    if (offen.length) {
      s += '<div class="dsa-hinweisbox dsa-testhub"><p>' + esc(fmt(u.hub, { n: offen.length })) + '</p>' +
        sortiert(offen).map(function (h) {
          return '<div class="dsa-testvorschau">' + hubKopf(h, lang) + vorschauTabelleHtml(h, lang) + (h.text ? '<p class="dsa-leise">' + esc(h.text) + '</p>' : '') +
            '<button type="button" class="dsa-knopf primaer" data-aktion="testUebernehmen" data-hid="' + esc(h.id) + '">' + esc(u.uebernehmen) + '</button></div>';
        }).join('') + (offen.length > 1 ? '<button type="button" class="dsa-knopf" data-aktion="testsAlle">' + esc(u.alle) + '</button>' : '') + '</div>';
    }
    if (tests.length) { s += tests.map(function (t, i) { return testHtml(t, i, lang, hub); }).join(''); }
    else if (!offen.length) { s += '<p class="dsa-leise">' + esc(u.keine) + '</p>'; }
    s += '<button type="button" class="dsa-link" data-aktion="testHinzu">' + esc(u.hinzu) + '</button>' + datalists() + '</div>';
    return s;
  }
  // Eingabe in einem Feld der Karte -> Daten; liefert true, wenn die Karte neu gezeichnet werden muss
  function eingabe(daten, el) {
    const i = +el.dataset.ti, t = (daten.tests || [])[i];
    if (!t) { return false; }
    const f = el.dataset.tf, v = el.value;
    if (el.dataset.tz != null) {
      const z = t.zeilen[+el.dataset.tz];
      if (!z) { return false; }
      if (f === 'einordnung') {
        const k = bandAusText(v);
        if (k) { z.band = k; z.einordnung = ''; } else if (text(v)) { z.band = ''; z.einordnung = v; } else { z.band = bandVon(z.sw); z.einordnung = ''; }
      } else {
        z[f] = v;
        if (f === 'sw' && !z.einordnung) { z.band = bandVon(z.sw); }
      }
      return false;
    }
    if (el.dataset.tu != null) { const x = t.untertests[+el.dataset.tu]; if (x) { if (f === 'bez') { x.bez = v; if (x.k && untertestName(x.k, t.sprache) !== text(v) && untertestName(x.k, 'de') !== text(v) && untertestName(x.k, 'fr') !== text(v) && untertestName(x.k, 'en') !== text(v)) { x.k = ''; } } else { x[f] = v; } } return false; }
    if (f === 'ki') { t.ki = +v === 90 ? 90 : 95; return false; }
    if (f === 'datum') { t.datum = datumOk(v); return false; }
    t[f] = v;
    return false;
  }
  // Klick auf einen Knopf der Karte; liefert true, wenn etwas geändert wurde (dann neu zeichnen)
  function aktion(daten, a, el) {
    daten.tests = Array.isArray(daten.tests) ? daten.tests : [];
    if (a === 'testUebernehmen') { const h = hubTests().filter(function (x) { return x.id === el.dataset.hid; })[0]; if (!h) { return false; } uebernehmen(daten, h); return true; }
    if (a === 'testsAlle') { hubTests().forEach(function (h) { if (!imBericht(daten, h.id)) { uebernehmen(daten, h); } }); return true; }
    if (a === 'testWeg') { daten.tests.splice(+el.dataset.i, 1); return true; }
    if (a === 'testHinzu') { daten.tests.push(neu('wisc-v', (typeof state !== 'undefined' && state.language) || 'de')); return true; }
    if (a === 'testZeileHinzu') { const t = daten.tests[+el.dataset.i]; if (t) { t.zeilen.push(normZeile({})); return true; } return false; }
    if (a === 'testZeileWeg') { const t = daten.tests[+el.dataset.i]; if (t) { t.zeilen.splice(+el.dataset.j, 1); return true; } return false; }
    return false;
  }

  return { INDIZES: INDIZES, UNTERTESTS: UNTERTESTS, BAENDER: BAENDER, indexName: indexName, untertestName: untertestName, bandVon: bandVon, bandText: bandText, bandBereich: bandBereich,
    norm: norm, normListe: normListe, neu: neu, ausHub: ausHub, hubTests: hubTests, uebernehmen: uebernehmen, bloecke: bloecke, tabelle: tabelle,
    html: html, eingabe: eingabe, aktion: aktion, UI: UI };
})();
