// =====================================================================
// DS als Word-Dokument: füllt die offizielle CNI-Vorlage vom 12.11.2025
// ---------------------------------------------------------------------
// DE und EN nutzen die deutsche Vorlage (EN mit übersetzten Beschriftungen),
// FR die französische. Der Inhalt kommt aus DsAssistent.fertig(lang):
// dieselben Texte wie in der Vorschau, inklusive Handbearbeitung.
// Deckblatt (Werte + Kreuzchen), Kopfzeilen, Abschnitte, Tabellen,
// ELDiB-Raster (grün = erreicht, gelb = Förderziel), Unterschrift.
// Das Inhaltsverzeichnis aktualisiert Word beim Öffnen (updateFields).
// =====================================================================
const DsWord = (function () {
  'use strict';
  const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
  const W14 = 'http://schemas.microsoft.com/office/word/2010/wordml';
  const XMLNS = 'http://www.w3.org/XML/1998/namespace';
  const SPRACHCODE = { de: 'de-DE', fr: 'fr-FR', en: 'en-US' };
  const GRUEN = '90EE90', GELB = 'FFFF00';
  const LISTE_NUM = '18'; // Aufzählungspunkte (Symbol •) aus numbering.xml der Vorlage
  const MONATE = {
    de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };
  // Reihenfolge der Überschriften erster Ebene in der Vorlage
  const H1 = ['auftrag', 'anamnese', 'aktuell', 'verfahren', 'schluss', 'anhang'];
  const H2 = { '2.1': 'vorgeschichte', '2.2': 'sozialbericht', '3.1': 'massnahmen', '3.2': 'schule', '3.3': 'kind', '3.4': 'eltern',
    '4.1': 'beobachtung', '4.2': 'eldib', '4.3': 'deutung', '5.1': 'beduerfnisse', '5.2': 'ziele', '5.3': 'empfehlungen', '5.4': 'cni',
    '6.1': 'interventionen', '6.2': 'raster', '6.3': 'produktionen' };
  // Abschnitte, deren Vorlagentext (Anleitungen in Klammern) ersetzt wird
  const ERSETZEN = ['auftrag', 'vorgeschichte', 'sozialbericht', 'aktuell', 'massnahmen', 'schule', 'kind', 'eltern', 'verfahren', 'beobachtung',
    'eldib', 'deutung', 'schluss', 'beduerfnisse', 'ziele', 'empfehlungen', 'cni'];
  const CNI_ZEILEN = ['diag_kompetenzzentrum', 'beratung_eltern', 'beratung_fachleute', 'lernwerkstatt', 'isa', 'beschulung', ['clapa', 'cst', 'annexe'], 'ausland', 'rehabilitation', 'abschluss', 'schliessung'];
  const INTERVENTIONEN = ['klassenbeobachtung', 'kontakt_eltern', 'kontakt_schule', 'kontakt_extern', 'kontakt_schueler'];
  // Englische Beschriftungen für die deutsche Vorlage (ganzer Absatztext)
  const EN_ABSATZ = {
    'Spezialisierte Diagnostik': 'Specialized Diagnostic Assessment',
    'des Zentrums für sozio-emotionale Entwicklung (CDSE)': 'of the Centre pour le développement socio-émotionnel (CDSE)',
    'Inhaltsverzeichnis': 'Table of contents', 'Empfehlungen des CDSE': 'CDSE recommendations',
    'Zeitraum': 'Period', 'Klasse': 'Class', 'Maßnahme': 'Measure', 'Akteur': 'Provider', 'Datum': 'Date',
    'Klassenbeobachtungen': 'Classroom observations', 'Kontakte mit Erziehungsberechtigten': 'Contacts with parents/guardians',
    'Kontakte mit der Herkunftsschule (Lehr-/Fachpersonal)': 'Contacts with the home school (teachers/specialists)',
    'Kontakte mit externem Fachpersonal': 'Contacts with external professionals', 'Kontakte mit dem/der Schüler:in': 'Contacts with the student',
    'Zusammenfassung der Entwicklungsziele des ELDiB ©': 'Summary of the developmental objectives (ELDiB/DTORF-R) ©',
    '(Entwicklungstherapeutischer / entwicklungspädagogischer Lernziel-Diagnose-Bogen)': '(Developmental Teaching Objectives Rating Form – Revised)',
    'Legende: V-Verhalten; KOMM-Kommunikation; SOZ-Sozialisation; KOG-Kognition grün-Entwicklungsziel erreicht; gelb-Förderziel': 'Legend: BEH – behavior; COM – communication; SOC – socialization; COG – cognition; green – objective mastered; yellow – goal',
    'V': 'BEH', 'KOMM': 'COM', 'SOZ': 'SOC', 'KOG': 'COG',
    'Name des Verfassers des Berichts (unterschreiben)': 'Name of the author (signature)', 'Berufsbezeichnung': 'Position'
  };
  const EN_RICHTZIEL_VORLAGE = {
    'Auf die Umwelt mit Freude reagieren': 1, 'Auf die Umwelt mit Erfolg reagieren': 2, 'Fähigkeiten zur erfolgreichen Gruppenteilnahme erwerben': 3,
    'Sich in Gruppenprozesse einbringen': 4, 'Individuelle/gruppenbezogene Fähigkeiten in neuen Situationen anwenden': 5
  };

  // ---------- XML-Hilfen ----------
  function parse(s) {
    const d = new DOMParser().parseFromString(s, 'application/xml');
    if (d.getElementsByTagName('parsererror').length) { throw new Error('Vorlage konnte nicht gelesen werden'); }
    return d;
  }
  function neu(doc, name, attrs) {
    const n = doc.createElementNS(W, 'w:' + name);
    if (attrs) { Object.keys(attrs).forEach(function (k) { n.setAttributeNS(W, 'w:' + k, attrs[k]); }); }
    return n;
  }
  function kinder(n, name) { return Array.prototype.filter.call(n.childNodes, function (c) { return c.nodeType === 1 && c.namespaceURI === W && (!name || c.localName === name); }); }
  function alle(n, name) { return Array.prototype.slice.call(n.getElementsByTagNameNS(W, name)); }
  function wert(n, name) { const e = kinder(n, name)[0]; return e ? e.getAttributeNS(W, 'val') : null; }
  function stil(p) { const pPr = kinder(p, 'pPr')[0]; return pPr ? wert(pPr, 'pStyle') : null; }
  // Textknoten, die direkt zu diesem Absatz gehören (nicht zu Textfeldern darin)
  function eigeneT(p) { return alle(p, 't').filter(function (t) { let a = t.parentNode; while (a && !(a.namespaceURI === W && a.localName === 'p')) { a = a.parentNode; } return a === p; }); }
  function text(p) { return eigeneT(p).map(function (t) { return t.textContent; }).join(''); }
  function textAlle(n) { return alle(n, 't').map(function (t) { return t.textContent; }).join(''); }
  function norm(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  function bewahre(t) { t.setAttributeNS(XMLNS, 'xml:space', 'preserve'); }
  // Ersetzt Text über Lauf-Grenzen hinweg; die Formatierung des ersten Laufs bleibt
  function ersetzeText(p, alt, neuText) {
    const ts = eigeneT(p), ganz = ts.map(function (t) { return t.textContent; }).join(''), i = ganz.indexOf(alt);
    if (!alt || i < 0) { return false; }
    const ende = i + alt.length;
    let pos = 0, eingesetzt = false;
    ts.forEach(function (t) {
      const tx = t.textContent, a = pos, e = pos + tx.length;
      pos = e;
      if (!(a < ende && e > i)) { return; } // Knoten liegt ausserhalb der Fundstelle
      t.textContent = tx.slice(0, Math.max(i, a) - a) + (eingesetzt ? '' : neuText) + tx.slice(Math.min(ende, e) - a);
      bewahre(t);
      eingesetzt = true;
    });
    return true;
  }
  function setzeAbsatz(p, neuText, lang) {
    const alt = text(p);
    if (alt) { ersetzeText(p, alt, neuText); return; }
    p.appendChild(lauf(p.ownerDocument, neuText, lang));
  }
  function lauf(doc, txt, lang, fett) {
    const r = neu(doc, 'r'), rPr = neu(doc, 'rPr');
    if (fett) { rPr.appendChild(neu(doc, 'b')); rPr.appendChild(neu(doc, 'bCs')); }
    rPr.appendChild(neu(doc, 'lang', { val: SPRACHCODE[lang] || 'de-DE' }));
    r.appendChild(rPr);
    const t = neu(doc, 't'); bewahre(t); t.textContent = txt;
    r.appendChild(t);
    return r;
  }
  function absatz(doc, txt, lang, art) {
    const p = neu(doc, 'p'), pPr = neu(doc, 'pPr');
    if (art === 'liste') {
      pPr.appendChild(neu(doc, 'pStyle', { val: 'ListParagraph' }));
      const np = neu(doc, 'numPr'); np.appendChild(neu(doc, 'ilvl', { val: '0' })); np.appendChild(neu(doc, 'numId', { val: LISTE_NUM })); pPr.appendChild(np);
      pPr.appendChild(neu(doc, 'spacing', { after: '60', line: '300', lineRule: 'auto' }));
    } else if (art === 'zwischen') {
      pPr.appendChild(neu(doc, 'keepNext'));
      pPr.appendChild(neu(doc, 'spacing', { before: '120', after: '60', line: '360', lineRule: 'auto' }));
    } else {
      pPr.appendChild(neu(doc, 'spacing', { after: '120', line: '360', lineRule: 'auto' }));
    }
    pPr.appendChild(neu(doc, 'jc', { val: art === 'zwischen' ? 'left' : 'both' }));
    p.appendChild(pPr);
    p.appendChild(lauf(doc, txt, lang, art === 'zwischen'));
    return p;
  }
  // Zelle leeren und mit Text füllen (Absatzformat der Zelle bleibt)
  function setzeZelle(tc, txt, lang) {
    const ps = kinder(tc, 'p');
    ps.slice(1).forEach(function (p) { tc.removeChild(p); });
    const p = ps[0] || tc.appendChild(neu(tc.ownerDocument, 'p'));
    kinder(p).forEach(function (k) { if (k.localName !== 'pPr') { p.removeChild(k); } });
    if (txt) { p.appendChild(lauf(tc.ownerDocument, txt, lang)); }
  }
  function setzeFarbe(tc, farbe) {
    const doc = tc.ownerDocument;
    let tcPr = kinder(tc, 'tcPr')[0];
    if (!tcPr) { tcPr = neu(doc, 'tcPr'); tc.insertBefore(tcPr, tc.firstChild); }
    let shd = kinder(tcPr, 'shd')[0];
    if (!shd) {
      shd = neu(doc, 'shd');
      const danach = kinder(tcPr).filter(function (k) { return ['noWrap', 'tcMar', 'textDirection', 'tcFitText', 'vAlign', 'hideMark'].indexOf(k.localName) >= 0; })[0];
      tcPr.insertBefore(shd, danach || null);
    }
    ['themeFill', 'themeFillShade', 'themeFillTint', 'themeColor', 'themeShade', 'themeTint'].forEach(function (a) { shd.removeAttributeNS(W, a); });
    shd.setAttributeNS(W, 'w:val', 'clear'); shd.setAttributeNS(W, 'w:color', 'auto'); shd.setAttributeNS(W, 'w:fill', farbe);
  }
  // Kontrollkästchen (Inhaltssteuerelement) in einem Absatz ankreuzen
  function kreuze(p) {
    alle(p, 't').forEach(function (t) { if (t.textContent === '☐') { t.textContent = '☒'; } });
    Array.prototype.forEach.call(p.getElementsByTagNameNS(W14, 'checked'), function (c) { c.setAttributeNS(W14, 'w14:val', '1'); });
  }
  function datumLang(iso, lang) {
    const d = iso ? new Date(iso + 'T12:00:00') : new Date();
    if (isNaN(d)) { return iso || ''; }
    const m = (MONATE[lang] || MONATE.de)[d.getMonth()];
    return lang === 'de' ? d.getDate() + '. ' + m + ' ' + d.getFullYear() : d.getDate() + ' ' + m + ' ' + d.getFullYear();
  }

  // ---------- Inhalt einsetzen ----------
  function bloeckeEinfuegen(doc, anker, bloecke, lang, tabellen) {
    // anker: Element, hinter dem eingefügt wird; tabellen: { id: Vorlagentabelle }
    let nach = anker;
    const setze = function (el) { nach.parentNode.insertBefore(el, nach.nextSibling); nach = el; };
    bloecke.forEach(function (b) {
      if (b.typ === 'absatz') { setze(absatz(doc, b.text, lang)); }
      else if (b.typ === 'zwischen') { setze(absatz(doc, b.text, lang, 'zwischen')); }
      else if (b.typ === 'liste') { b.punkte.forEach(function (pt) { setze(absatz(doc, pt, lang, 'liste')); }); setze(leer(doc)); }
      else if (b.typ === 'tabelle') {
        const t = tabellen && tabellen[b.id];
        if (t) { fuelleTabelle(t, b.zeilen, lang, b.kopf); setze(t); delete tabellen[b.id]; setze(leer(doc)); }
        else { setze(neueTabelle(doc, b.kopf, b.zeilen, lang)); setze(leer(doc)); }
      }
    });
    return nach;
  }
  function leer(doc) { const p = neu(doc, 'p'), pPr = neu(doc, 'pPr'); pPr.appendChild(neu(doc, 'spacing', { after: '0', line: '240', lineRule: 'auto' })); p.appendChild(pPr); return p; }
  function fuelleTabelle(tbl, zeilen, lang, kopf) {
    const trs = kinder(tbl, 'tr'), muster = trs[1] || trs[0];
    if (kopf && trs[0]) { kinder(trs[0], 'tc').forEach(function (tc, i) { if (kopf[i]) { setzeZelle(tc, kopf[i], lang); fett(tc); } }); }
    trs.slice(1).forEach(function (tr) { tbl.removeChild(tr); });
    (zeilen.length ? zeilen : [[]]).forEach(function (z) {
      const tr = muster.cloneNode(true);
      kinder(tr, 'tc').forEach(function (tc, i) { setzeZelle(tc, z[i] || '', lang); });
      tbl.appendChild(tr);
    });
  }
  function fett(tc) { alle(tc, 'rPr').forEach(function (rPr) { if (!kinder(rPr, 'b').length) { rPr.insertBefore(neu(tc.ownerDocument, 'b'), rPr.firstChild); } }); }
  function neueTabelle(doc, kopf, zeilen, lang) {
    const tbl = neu(doc, 'tbl'), tblPr = neu(doc, 'tblPr');
    tblPr.appendChild(neu(doc, 'tblStyle', { val: 'TableGrid' }));
    tblPr.appendChild(neu(doc, 'tblW', { w: '5000', type: 'pct' }));
    tbl.appendChild(tblPr);
    const grid = neu(doc, 'tblGrid'); kopf.forEach(function () { grid.appendChild(neu(doc, 'gridCol', { w: String(Math.floor(9000 / kopf.length)) })); }); tbl.appendChild(grid);
    const zeile = function (werte, istKopf) {
      const tr = neu(doc, 'tr');
      werte.forEach(function (w) {
        const tc = neu(doc, 'tc'), tcPr = neu(doc, 'tcPr');
        if (istKopf) { tcPr.appendChild(neu(doc, 'shd', { val: 'clear', color: 'auto', fill: 'D9D9D9' })); }
        tc.appendChild(tcPr);
        const p = neu(doc, 'p'); p.appendChild(lauf(doc, w || '', lang, istKopf)); tc.appendChild(p);
        tr.appendChild(tc);
      });
      tbl.appendChild(tr);
    };
    zeile(kopf, true);
    zeilen.forEach(function (z) { zeile(z, false); });
    return tbl;
  }

  // ---------- Das Dokument ----------
  function hauptteil(doc, b, lang) {
    const body = alle(doc, 'body')[0];
    const elemente = kinder(body);
    // Überschriften finden und Abschnitten zuordnen
    const marken = [];
    let h1 = 0;
    elemente.forEach(function (el, i) {
      if (el.localName !== 'p') { return; }
      const s = stil(el), t = norm(text(el));
      if (s === 'Heading1' && t) { marken.push({ i: i, id: H1[h1++], el: el, e: 1 }); }
      else if (s === 'Heading2' && t) { const m = /^(\d\.\d)/.exec(t.replace(/\s+/g, '')); if (m && H2[m[1]]) { marken.push({ i: i, id: H2[m[1]], el: el, e: 2, nr: m[1] }); } }
    });
    const abschnitt = {}; b.abschnitte.forEach(function (a) { abschnitt[a.id] = a; });
    marken.forEach(function (m, k) {
      const bis = k + 1 < marken.length ? marken[k + 1].i : elemente.length;
      const bereich = elemente.slice(m.i + 1, bis).filter(function (el) { return el.localName !== 'sectPr'; });
      const a = abschnitt[m.id];
      ueberschrift(m, a, lang);
      if (ERSETZEN.indexOf(m.id) < 0 || !a) { return; }
      const tabellen = {};
      let unterschrift = [];
      if (m.id === 'vorgeschichte' || m.id === 'massnahmen') {
        const t = bereich.filter(function (el) { return el.localName === 'tbl'; })[0];
        if (t) { tabellen[m.id === 'vorgeschichte' ? 'vorgeschichte' : 'aktuell'] = t; }
      }
      if (m.id === 'cni') {
        // Unterschriftsblock der Vorlage behalten (ab zwei Leerzeilen vor dem Namen)
        const j = bereich.findIndex(function (el) { return /Verfasser|auteur/i.test(text(el)); });
        if (j >= 0) { unterschrift = bereich.slice(Math.max(0, j - 2)); }
      }
      bereich.forEach(function (el) { if (unterschrift.indexOf(el) < 0) { body.removeChild(el); } });
      const letztes = bloeckeEinfuegen(doc, m.el, a.bloecke, lang, tabellen);
      // nicht benutzte Vorlagentabellen (keine Zeilen erfasst) leer, aber vorhanden lassen
      Object.keys(tabellen).forEach(function (id) {
        const U2 = DS_UI[lang] || DS_UI.de, kopf = DS_TABELLEN[id].map(function (s) { return U2.tab[s]; });
        fuelleTabelle(tabellen[id], [], lang, kopf);
        letztes.parentNode.insertBefore(tabellen[id], letztes.nextSibling);
      });
      if (unterschrift.length) { unterschriftFuellen(unterschrift, b, lang); }
    });
  }
  function ueberschrift(m, a, lang) {
    if (!a) { return; }
    // Deutsch: geschlechtsspezifische Titel; Englisch: alle Titel übersetzen
    const gendert = ['kind', 'beduerfnisse', 'produktionen'].indexOf(m.id) >= 0;
    if (lang === 'en' || (lang === 'de' && gendert)) { setzeAbsatz(m.el, m.e === 1 ? a.titel : m.nr + ' ' + a.titel, lang); }
  }
  function unterschriftFuellen(els, b, lang) {
    const ps = els.filter(function (el) { return el.localName === 'p' && norm(text(el)); });
    if (ps[0] && b.verfasser.name) { setzeAbsatz(ps[0], b.verfasser.name, lang); }
    if (ps[1] && b.verfasser.funktion) { setzeAbsatz(ps[1], b.verfasser.funktion, lang); }
  }
  function deckblatt(doc, b, lang) {
    const D = DS_DECKBLATT[lang] || DS_DECKBLATT.de, d = b.deckblatt, g = DsAssistent.nachGeschlecht;   // [m, w, ohne Angabe]
    const tabs = alle(doc, 'tbl');
    // Kopfdaten: Name, Matrikel, Alter, Schule, Klasse, Sprachen
    const kopf = tabs.filter(function (t) { return /NAME|NOM/.test(textAlle(t)) && kinder(t, 'tr').length >= 6; })[0];
    if (kopf) {
      const werte = [d.name, d.matricule, d.alter, d.schule, d.klasse, d.sprachen];
      const labels = [g(D.name), D.matricule, D.alter, D.schule, D.klasse, D.sprachen];
      kinder(kopf, 'tr').slice(0, 6).forEach(function (tr, i) {
        const tcs = kinder(tr, 'tc');
        if (tcs[1]) { setzeZelle(tcs[1], werte[i] || '', lang); }
        if (tcs[0] && (lang !== 'fr')) { const p0 = kinder(tcs[0], 'p')[0]; if (p0) { setzeAbsatz(p0, labels[i], lang); } }
      });
    }
    // Empfehlungen an die CNI: Kreuzchen und (EN/DE-gendert) Beschriftungen
    const cni = tabs.filter(function (t) { return textAlle(t).indexOf('☐') >= 0 && kinder(t, 'tr').length >= 12; })[0];
    if (cni) {
      const gewaehlt = d.cni.slice();
      if (['clapa', 'cst', 'annexe'].some(function (k) { return gewaehlt.indexOf(k) >= 0; }) && gewaehlt.indexOf('beschulung') < 0) { gewaehlt.push('beschulung'); }
      const trs = kinder(cni, 'tr');
      if (lang === 'en') { const p = kinder(kinder(trs[0], 'tc')[0], 'p')[0]; if (p) { setzeAbsatz(p, D.empfehlungen, lang); } }
      CNI_ZEILEN.forEach(function (k, i) {
        const tr = trs[i + 1]; if (!tr) { return; }
        const tcs = kinder(tr, 'tc');
        if (Array.isArray(k)) {
          kinder(tcs[tcs.length - 1], 'p').filter(function (p) { return textAlle(p).indexOf('☐') >= 0; }).forEach(function (p, j) { if (k[j] && gewaehlt.indexOf(k[j]) >= 0) { kreuze(p); } });
          return;
        }
        // Das Kästchen ist hier ein Inhaltssteuerelement um die ganze erste Zelle
        if (gewaehlt.indexOf(k) >= 0) { kreuze(tr); }
        if (lang === 'en' || (lang === 'de' && k === 'beratung_eltern')) {
          const l = g(D.cni[k]);
          const p = kinder(tcs[tcs.length - 1], 'p')[0]; if (p && l) { setzeAbsatz(p, l, lang); }
        }
      });
    }
  }
  function anhang(doc, b, lang) {
    const st = typeof getStammdaten === 'function' ? getStammdaten() : {};
    const U2 = DS_UI[lang] || DS_UI.de;
    // 6.1 Interventionen: Zeilen = Art, zweite Spalte = Daten
    const iv = (DsAssistent.get().tabellen.interventionen || []).filter(function (r) { return r && (r.datum || r.art); });
    const tabs = alle(doc, 'tbl');
    const ivTab = tabs.filter(function (t) { const tx = textAlle(t); return /Klassenbeobachtung|Observations en classe/.test(tx); })[0];
    if (ivTab) {
      const trs = kinder(ivTab, 'tr');
      INTERVENTIONEN.forEach(function (art, i) {
        const tr = trs[i + 1]; if (!tr) { return; }
        const daten = iv.filter(function (r) { return r.art === art; }).map(function (r) { return DsText.datum(r.datum, lang); }).filter(Boolean);
        const tcs = kinder(tr, 'tc');
        if (tcs[1]) { setzeZelle(tcs[1], daten.join(', '), lang); }
        if (lang === 'en' && tcs[0]) { const p = kinder(tcs[0], 'p')[0]; if (p) { setzeAbsatz(p, U2.opt.interventionen[art], lang); } }
      });
      if (lang === 'en') { const p = kinder(kinder(trs[0], 'tc')[1] || kinder(trs[0], 'tc')[0], 'p')[0]; if (p) { setzeAbsatz(p, U2.tab.datum, lang); } }
    }
    // 6.2 Raster einfärben
    const raster = tabs.filter(function (t) { return kinder(t, 'tr').length > 50; })[0];
    if (raster) { faerbeRaster(raster, lang); }
    // 6.2 beginnt auf einer neuen Seite (statt vieler Leerzeilen in der Vorlage)
    const h62 = alle(doc, 'p').filter(function (p) { return stil(p) === 'Heading2' && /^6\.\s*2/.test(norm(text(p))); })[0];
    if (h62) {
      let v = h62.previousSibling;
      while (v && v.nodeType === 1 && v.localName === 'p' && !norm(textAlle(v)) && !alle(v, 'drawing').length && !alle(v, 'br').length && !alle(v, 'sectPr').length) {
        const weg = v; v = v.previousSibling; weg.parentNode.removeChild(weg);
      }
      const pPr = kinder(h62, 'pPr')[0];
      if (pPr && !kinder(pPr, 'pageBreakBefore').length) {
        const nach = kinder(pPr).filter(function (k) { return ['pStyle', 'keepNext', 'keepLines'].indexOf(k.localName) < 0; })[0];
        pPr.insertBefore(neu(doc, 'pageBreakBefore'), nach || null);
      }
    }
    // Kopfangaben zum Raster (Name, Geburtsdatum, Datum der Einschätzung)
    const alter = b.deckblatt.alter, geb = st.geburtsdatum ? DsText.datum(st.geburtsdatum, lang) : '';
    const eDatum = st.einschaetzungsdatum ? DsText.datum(st.einschaetzungsdatum, lang) : '';
    alle(doc, 'p').forEach(function (p) {
      const t = text(p);
      if (t.indexOf('Name des/der Schüler:in:') >= 0) {
        setzeAbsatz(p, (lang === 'en' ? 'Student’s name: ' : DsAssistent.nachGeschlecht(['Name des Schülers: ', 'Name der Schülerin: ', 'Name des/der Schüler:in: '])) + b.deckblatt.name, lang);
      } else if (t.indexOf('Geburtsdatum (Alter):') >= 0) {
        setzeAbsatz(p, (lang === 'en' ? 'Date of birth (age): ' : 'Geburtsdatum (Alter): ') + (geb ? geb + (alter ? ' (' + alter + ')' : '') : ''), lang);
      } else if (t.indexOf('XX/XX/20XX') >= 0 && /Datum der Einsch/.test(t)) {
        ersetzeText(p, 'Datum der Einschätzung: ', lang === 'en' ? 'Date of assessment: ' : 'Datum der Einschätzung: ');
        ersetzeText(p, 'XX/XX/20XX', eDatum);
      }
    });
    // Französische Vorlage: Angaben stehen in den ersten Zeilen der Rastertabelle
    if (raster && lang === 'fr') {
      kinder(raster, 'tr').slice(0, 3).forEach(function (tr, i) {
        const tcs = kinder(tr, 'tc');
        if (tcs.length === 2) { setzeZelle(tcs[1], [b.deckblatt.name, geb ? geb + (alter ? ' (' + alter + ')' : '') : '', eDatum][i] || '', lang); }
      });
    }
  }
  function faerbeRaster(tbl, lang) {
    const sel = (typeof state !== 'undefined' && state.selections) || {};
    const prefix = ['V', 'K', 'SOZ', 'KOG'], letzte = [null, null, null, null];
    kinder(tbl, 'tr').forEach(function (tr) {
      const tcs = kinder(tr, 'tc');
      if (tcs.length !== 5) { return; }
      for (let i = 0; i < 4; i++) {
        const tc = tcs[i], t = norm(textAlle(tc)), m = /(\d+)$/.exec(t);
        const tcPr = kinder(tc, 'tcPr')[0], vm = tcPr && kinder(tcPr, 'vMerge')[0];
        const weiter = vm && vm.getAttributeNS(W, 'val') !== 'restart';
        let nr = null;
        if (m) { nr = +m[1]; letzte[i] = nr; } else if (weiter) { nr = letzte[i]; } else { letzte[i] = null; }
        if (nr == null) { continue; }
        const s = sel[prefix[i] + '-' + nr];
        if (s && s.status === 'erreicht') { setzeFarbe(tc, GRUEN); } else if (s && s.status === 'ziel') { setzeFarbe(tc, GELB); }
      }
      // Englisch: Stufenbeschriftung und Richtziele übersetzen
      if (lang === 'en') {
        kinder(tcs[4], 'p').forEach(function (p) {
          const t = norm(text(p));
          const s = /^Stufe (\d): (\d+)-(\d+) Jahre$/.exec(t);
          if (s) { setzeAbsatz(p, 'Stage ' + s[1] + ': ' + s[2] + '–' + s[3] + ' years', lang); }
          else if (EN_RICHTZIEL_VORLAGE[t]) { setzeAbsatz(p, DS_RICHTZIEL.en[EN_RICHTZIEL_VORLAGE[t]], lang); }
        });
      }
    });
  }
  function englisch(doc) {
    alle(doc, 'p').forEach(function (p) {
      const t = norm(text(p));
      if (Object.prototype.hasOwnProperty.call(EN_ABSATZ, t)) { setzeAbsatz(p, EN_ABSATZ[t], 'en'); }
    });
  }
  function kopfzeilen(xml, b, lang, datei) {
    const doc = parse(xml);
    const st = typeof getStammdaten === 'function' ? getStammdaten() : {};
    const datum = datumLang(DsAssistent.get().f.bericht_datum, lang);
    alle(doc, 'p').forEach(function (p) {
      const t = text(p);
      if (/NAME Vorname/.test(t)) { ersetzeText(p, t.indexOf('NAME Vorname des Schülers/der Schüler:in') >= 0 ? 'NAME Vorname des Schülers/der Schüler:in' : 'NAME Vorname', b.deckblatt.name); }
      else if (/Prénom et NOM de l’élève/.test(t)) { ersetzeText(p, 'Prénom et NOM de l’élève', b.deckblatt.name); }
      else if (norm(t) === 'Sozialversicherungsnummer' || norm(t) === 'Matricule') { setzeAbsatz(p, st.matricule || '', lang); }
      else if (/^Munsbach/.test(norm(t))) {
        setzeAbsatz(p, lang === 'fr' ? 'Munsbach, le ' + datum : (lang === 'en' ? 'Munsbach, ' + datum : 'Munsbach, den ' + datum), lang);
      } else if (lang === 'en' && /footer/.test(datei)) {
        eigeneT(p).forEach(function (tt) { if (tt.textContent === 'Seite') { tt.textContent = 'Page'; } else if (tt.textContent === 'von') { tt.textContent = 'of'; } });
      }
    });
    return new XMLSerializer().serializeToString(doc);
  }
  function einstellungen(xml) {
    // Word soll beim Öffnen Felder (Inhaltsverzeichnis, Seitenzahlen) aktualisieren.
    // Die Reihenfolge der Einstellungen ist vorgegeben: vor diesen Elementen einfügen.
    if (xml.indexOf('<w:updateFields') >= 0) { return xml.replace(/<w:updateFields[^>]*\/>/, '<w:updateFields w:val="true"/>'); }
    const danach = ['w:hdrShapeDefaults', 'w:footnotePr', 'w:endnotePr', 'w:compat', 'w:docVars', 'w:rsids', 'm:mathPr', 'w:attachedSchema', 'w:themeFontLang',
      'w:clrSchemeMapping', 'w:doNotIncludeSubdocsInStats', 'w:doNotAutoCompressPictures', 'w:forceUpgrade', 'w:captions', 'w:readModeInkLockDown', 'w:smartTagType',
      'sl:schemaLibrary', 'w:shapeDefaults', 'w:doNotEmbedSmartTags', 'w:decimalSymbol', 'w:listSeparator'];
    let pos = -1;
    danach.forEach(function (tag) { const i = xml.search(new RegExp('<' + tag + '[ />]')); if (i >= 0 && (pos < 0 || i < pos)) { pos = i; } });
    if (pos < 0) { pos = xml.lastIndexOf('</w:settings>'); }
    return xml.slice(0, pos) + '<w:updateFields w:val="true"/>' + xml.slice(pos);
  }

  async function erstellen(lang) {
    lang = lang || 'de';
    const b = DsAssistent.fertig(lang);
    const vorlage = lang === 'fr' ? TEMPLATE_FR_DS_CDSE_BASE64 : TEMPLATE_DS_DE_BASE64;
    const zip = await JSZip.loadAsync(vorlage, { base64: true });
    const doc = parse(await zip.file('word/document.xml').async('string'));
    hauptteil(doc, b, lang);
    deckblatt(doc, b, lang);
    anhang(doc, b, lang);
    if (lang === 'en') { englisch(doc); }
    let xml = new XMLSerializer().serializeToString(doc);
    if (lang === 'en') { xml = xml.replace(/w:val="de-DE"/g, 'w:val="en-US"'); }
    zip.file('word/document.xml', xml);
    const teile = Object.keys(zip.files).filter(function (n) { return /^word\/(header|footer)\d*\.xml$/.test(n); });
    for (const n of teile) { zip.file(n, kopfzeilen(await zip.file(n).async('string'), b, lang, n)); }
    if (zip.file('word/settings.xml')) { zip.file('word/settings.xml', einstellungen(await zip.file('word/settings.xml').async('string'))); }
    // Daten unsichtbar einbetten (für den CDSE Hub, 55-daten-einbetten.js); der Text bleibt unverändert
    if (typeof cdseDatenEinbetten === 'function') { await cdseDatenEinbetten(zip, 'ds', lang); }
    return zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  }

  return { erstellen: erstellen };
})();

// Word-Datei erzeugen und herunterladen
async function dsWordExport(lang) {
  lang = lang || (typeof state !== 'undefined' ? state.language : 'de');
  try {
    if (typeof showToast === 'function') { showToast(lang === 'fr' ? 'Le DS est en cours de création…' : (lang === 'en' ? 'Creating the DS…' : 'DS wird erstellt …')); }
    const blob = await DsWord.erstellen(lang);
    const name = typeof buildFilename === 'function' ? buildFilename('DS' + (lang === 'de' ? '' : '_' + lang.toUpperCase())) : 'DS.docx';
    saveAs(blob, name);
  } catch (e) {
    console.error('DS-Export', e);
    alert((lang === 'fr' ? 'Erreur lors de la création du DS : ' : (lang === 'en' ? 'Error while creating the DS: ' : 'Fehler beim Erstellen des DS: ')) + e.message);
  }
}
