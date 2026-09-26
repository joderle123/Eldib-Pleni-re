// =====================================================================
// DS-Textbaukasten: macht aus Bewertungen, Auswahl und Fakten den Bericht
// ---------------------------------------------------------------------
// Ergebnis je Abschnitt: Liste von Blöcken
//   { typ: 'absatz', text }   { typ: 'liste', punkte: [...] }
//   { typ: 'zwischen', text } (fette Zwischenzeile)
// Sprachunabhängig; die Sätze stehen in DS_TEXTE.de / .fr / .en.
// =====================================================================
const DsText = (function () {
'use strict';

// n = Geschlecht nicht angegeben: beide Formen (nicht einfach männlich)
const PRON = {
  de: { m: { N: 'er', D: 'ihm', A: 'ihn', T: 'ihm', sein: 'sein', seine: 'seine', seinen: 'seinen', seinem: 'seinem', seiner: 'seiner', seines: 'seines' },
        w: { N: 'sie', D: 'ihr', A: 'sie', T: 'ihr', sein: 'ihr', seine: 'ihre', seinen: 'ihren', seinem: 'ihrem', seiner: 'ihrer', seines: 'ihres' },
        n: { N: 'er/sie', D: 'ihm/ihr', A: 'ihn/sie', T: 'ihm/ihr', sein: 'sein/ihr', seine: 'seine/ihre', seinen: 'seinen/ihren', seinem: 'seinem/ihrem', seiner: 'seiner/ihrer', seines: 'seines/ihres' } },
  // fr: T = betontes Pronomen nach Präposition ("pour lui / pour elle")
  fr: { m: { N: 'il', D: 'lui', A: 'le', T: 'lui' }, w: { N: 'elle', D: 'lui', A: 'la', T: 'elle' }, n: { N: 'il/elle', D: 'lui', A: 'le/la', T: 'lui/elle' } },
  en: { m: { N: 'he', D: 'him', A: 'him', T: 'him', his: 'his', himself: 'himself' }, w: { N: 'she', D: 'her', A: 'her', T: 'her', his: 'her', himself: 'herself' },
        n: { N: 'he/she', D: 'him/her', A: 'him/her', T: 'him/her', his: 'his/her', himself: 'himself/herself' } }
};
const KONTRAST_VORSATZ = { fr: ['Toutefois, ', 'En revanche, ', 'Cependant, '], en: ['However, ', 'At the same time, ', 'By contrast, '] };

function texte(lang) { return DS_TEXTE[lang] || DS_TEXTE.de; }
function gross(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
function klein(s) { return s ? s.charAt(0).toLowerCase() + s.slice(1) : s; }

// ---------- Kontext: wer ist gemeint, welche Sprache ----------
function kontext(lang, ds, stamm) {
  const f = (ds && ds.f) || {};
  const voll = String((stamm && stamm.schueler_name) || '').trim();
  let vorname = voll, nachname = '';
  if (voll.indexOf(',') >= 0) { nachname = voll.split(',')[0].trim(); vorname = voll.split(',').slice(1).join(',').trim(); }
  const g = ds && (ds.geschlecht === 'w' || ds.geschlecht === 'm') ? ds.geschlecht : 'n';   // n: nicht angegeben
  const T = texte(lang);
  const c = {
    lang: lang, T: T, g: g,
    name: vorname || T.s.das_kind || 'das Kind',
    vollname: (vorname && nachname) ? vorname + ' ' + nachname : (vorname || voll),
    seit: 0, kontrast: false, kontrastNr: 0,
    q: (T.quellen && T.quellen.eltern[f.eltern_quelle || 'eltern']) || null,
    qs: (T.quellen && T.quellen.schule[f.schule_quelle || 'lehrperson']) || null,
    alter: alterJahre(stamm && stamm.geburtsdatum)
  };
  c.neuerAbsatz = function () { c.seit = 0; };
  return c;
}
function alterJahre(geb) {
  if (!geb) { return null; }
  const d = new Date(geb), h = new Date();
  if (isNaN(d)) { return null; }
  let j = h.getFullYear() - d.getFullYear();
  if (h.getMonth() < d.getMonth() || (h.getMonth() === d.getMonth() && h.getDate() < d.getDate())) { j--; }
  return j;
}

// Name oder Pronomen? Erste Nennung im Absatz = Name, dann Pronomen,
// jede dritte Nennung wieder der Name - lesbar, ohne Wiederholungen.
// Geschlecht nicht angegeben: immer der Name.
function person(c, fall) {
  const p = PRON[c.lang][c.g];
  if (c.g === 'n' || c.seit === 0 || c.seit >= 3) { c.seit = 1; return c.name; }
  c.seit++;
  return p[fall] || c.name;
}

// ---------- Platzhalter füllen ----------
// {Name} {N} {Nd} {Na} {Nt} {er} … {T} {Q} {QS} {KONTRAST} {liste} … {feld: bedingter Text}
// {Nt} = Name bzw. betontes Pronomen nach Präposition (fr: pour lui/elle), {T} immer das Pronomen
// [[männlich|weiblich]] (ohne Angabe: „männlich/weiblich“)  {{einzahl|mehrzahl}} (Zahl aus vars.zahl bzw. Quelle)
function fuelle(tpl, c, vars) {
  vars = vars || {};
  if (tpl == null) { return ''; }
  let s = String(tpl);
  s = s.replace(/\[\[([^|\]]*)\|([^\]]*)\]\]/g, function (m, a, b) { return c.g === 'w' ? b : (c.g === 'm' ? a : a + '/' + b); });
  const zahl = vars.zahl != null ? vars.zahl : ((c.q && c.q.zahl) || 1);
  s = s.replace(/\{\{([^|}]*)\|([^}]*)\}\}/g, function (m, a, b) { return zahl > 1 ? b : a; });
  return ersetze(s, c, vars);
}
function ersetze(s, c, vars) {
  let out = '', i = 0;
  while (i < s.length) {
    const ch = s.charAt(i);
    if (ch !== '{') { out += ch; i++; continue; }
    let tiefe = 1, j = i + 1;
    while (j < s.length && tiefe > 0) { if (s.charAt(j) === '{') { tiefe++; } else if (s.charAt(j) === '}') { tiefe--; } j++; }
    const innen = s.slice(i + 1, j - 1);
    out += platzhalter(innen, c, vars);
    i = j;
  }
  return out;
}
function platzhalter(innen, c, vars) {
  const bed = /^(\w+):([\s\S]*)$/.exec(innen);
  if (bed) { const v = vars[bed[1]]; return (v != null && v !== '' && !(Array.isArray(v) && !v.length)) ? ersetze(bed[2], c, vars) : ''; }
  let hoch = false, k = innen;
  if (k.charAt(0) === '^') { hoch = true; k = k.slice(1); }
  let w = wert(k, c, vars);
  if (w == null) { w = '{' + innen + '}'; }
  return hoch ? gross(w) : w;
}
function wert(k, c, vars) {
  if (Object.prototype.hasOwnProperty.call(vars, k)) { return vars[k] == null ? '' : String(vars[k]); }
  const p = PRON[c.lang][c.g];
  switch (k) {
    case 'N': return person(c, 'N');
    case 'Nd': return person(c, 'D');
    case 'Na': return person(c, 'A');
    case 'Nt': return person(c, 'T');
    case 'Name': c.seit = 1; return c.name;
    case 'Vollname': c.seit = 1; return c.vollname;
    case 'er': case 'il': case 'he': return p.N;
    case 'ihm': case 'lui': return p.D;
    case 'ihn': case 'him': case 'le': return p.A;
    case 'T': return p.T;
    case 'his': return p.his;
    case 'himself': return p.himself;
    case 'KONTRAST': return (c.kontrast && c.lang === 'de') ? 'jedoch ' : '';
    case 'Q': if (c.q && (c.q.zahl || 1) === 1) { c.seit = 0; } return c.q ? c.q.n : '';
    case 'Qd': return c.q ? c.q.d : '';
    case 'Qg': return c.q ? c.q.g : '';
    case 'QS': return c.qs ? c.qs.n : '';
    case 'QSd': return c.qs ? c.qs.d : '';
  }
  if (p && Object.prototype.hasOwnProperty.call(p, k)) { return p[k]; }
  return null;
}

// Satzbau aufräumen: Leerzeichen, Großschreibung am Satzanfang, Französisch
function satz(s, c) {
  s = String(s || '').replace(/\s+/g, ' ').replace(/\s+([.,;:!?)])/g, '$1').replace(/\(\s+/g, '(').trim();
  if (c.lang === 'fr') { s = franz(s); }
  return gross(s);
}
function franz(s) {
  // Elision vor Vokal/stummem h. Keine \b-Grenzen: die kennen keine Akzente
  // ("Hélène a" würde sonst zu "Hélèn'a"). Y (Yanis) wird nicht elidiert.
  const BUCHST = 'A-Za-zÀ-ÖØ-öø-ÿŒœ\'’';
  s = s.replace(new RegExp('(^|[^' + BUCHST + '])(de|que|ne|se|le|la|je|me|te|lorsque|puisque|jusque) (?=[aeiouyhàâéèêëîïôûùœAEIOUHÀÂÉÈÊÎÔÛ])', 'g'), function (m, v, w) {
    return v + (/^(le|la)$/.test(w) ? "l'" : w.slice(0, -1) + "'");
  });
  s = s.replace(new RegExp('(^|[^' + BUCHST + '])si (?=ils?(?![' + BUCHST + ']))', 'g'), "$1s'");
  // Leerzeichen vor : ; ! ? und in « », typografischer Apostroph
  s = s.replace(/ ?([:;!?])(?=\s|$)/g, ' $1').replace(/« ?/g, '« ').replace(/ ?»/g, ' »');
  return s.replace(/'/g, '’');
}

// Aufzählung "a, b und c"
function liste(teile, c, oder, einfach) {
  const T = c.T.s;
  teile = teile.filter(function (x) { return x; });
  if (teile.length <= 1) { return teile[0] || ''; }
  let und = oder ? T.liste_oder : T.liste_und;
  // enthalten die Teile selbst schon "und", klingt "sowie" besser: "a, b und c sowie d"
  if (!oder && !einfach && T.liste_sowie && teile.some(function (x) { return (' ' + x + ' ').indexOf(' ' + T.liste_und + ' ') >= 0; })) { und = T.liste_sowie; }
  return teile.slice(0, -1).join(', ') + ' ' + und + ' ' + teile[teile.length - 1];
}
// Zahl für {{einzahl|mehrzahl}}: mehrere Teile oder ein Teil in der Mehrzahl
function zahlVon(eintraege) { return (eintraege.length > 1 || eintraege.some(function (x) { return x && x.pl; })) ? 2 : 1; }

// ---------- Bewertete Aussagen ----------
function bewertung(ds, id) { const r = ds.bewertungen && ds.bewertungen[id]; return (r >= 1 && r <= 7) ? r : null; }
function chips(ds, gruppe) { return (ds.chips && ds.chips[gruppe]) || []; }
function chipText(c, gruppe, key) { const g = c.T.chips[gruppe] || {}; return g[key] ? g[key][1] : ''; }

// Ein Satz zu einer bewerteten Aussage
function aussageSatz(c, id, r, kontrast) {
  const a = c.T.a[id];
  if (!a || !a.t) { return ''; }
  const tpl = a.t[dsStufe(r)];
  if (!tpl) { return ''; }
  c.kontrast = !!kontrast;
  let s = satz(fuelle(tpl, c, c.vars || {}), c);
  c.kontrast = false;
  if (kontrast && c.lang !== 'de') {
    const v = KONTRAST_VORSATZ[c.lang];
    const vors = v[(c.kontrastNr++) % v.length];   /* reihum, damit sich nichts wiederholt */
    s = vors + (s.indexOf(c.name) === 0 ? s : klein(s));
  }
  return s;
}

// Sichtweisen und Beobachtung: je Thema ein Absatz, Stärken zuerst, dann
// Gemischtes, dann Schwierigkeiten (die deutlichsten zuerst).
function themenAbsaetze(bereich, c, ds, weiter) {
  const aufbau = DS_AUFBAU[bereich], absaetze = [], ohne = [];
  aufbau.themen.forEach(function (th) {
    const eintraege = [];
    th.aussagen.forEach(function (a, i) {
      const r = bewertung(ds, a[0]);
      if (r == null) { return; }
      const e = { id: a[0], pol: a[1], r: r, i: i, v: a[1] < 0 ? 8 - r : r, vorne: a[2] === 'vorne' };
      if (e.pol < 0 && r <= 2) { const np = c.T.a[e.id] && c.T.a[e.id].np; if (np) { ohne.push(fuelle(np, c)); } return; }
      eintraege.push(e);
    });
    if (!eintraege.length) { return; }
    eintraege.sort(function (x, y) { return (y.vorne - x.vorne) || (y.v - x.v) || (x.i - y.i); });
    if (weiter && !absaetze.length) { weiter = false; } else { c.neuerAbsatz(); }
    const saetze = [];
    let staerke = false, kontrastDa = false;
    eintraege.forEach(function (e) {
      if (e.vorne) { const s0 = aussageSatz(c, e.id, e.r, false); if (s0) { saetze.push(s0); } return; }
      const k = staerke && !kontrastDa && e.v <= 4;
      const s = aussageSatz(c, e.id, e.r, k);
      if (!s) { return; }
      if (k) { kontrastDa = true; }
      if (e.v >= 5) { staerke = true; }
      saetze.push(s);
    });
    if (saetze.length) { absaetze.push(saetze); }
  });
  // sehr kurze Absätze mit dem vorigen zusammenlegen
  const zusammen = [];
  absaetze.forEach(function (a) {
    if (zusammen.length && (a.length < 2 || zusammen[zusammen.length - 1].length < 2)) { zusammen[zusammen.length - 1] = zusammen[zusammen.length - 1].concat(a); }
    else { zusammen.push(a); }
  });
  return { absaetze: zusammen, ohne: ohne };
}

function block(text) { return { typ: 'absatz', text: text }; }
function frei(ds, feld) { const t = ds.frei && ds.frei[feld]; return t && String(t).trim() ? String(t).trim() : ''; }
// Gibt es Angaben zu einer Sichtweise bzw. zur Beobachtung (Bewertung, Auswahl, Datum, Gesprächspartner, Freitext)?
// Nur dann nennt der Bericht das Gespräch bzw. die Beobachtung als Grundlage – nichts erfinden.
function hatAngaben(ds, bereich) {
  const f = ds.f || {}, a = DS_AUFBAU[bereich];
  if (!a) { return false; }
  if (f[bereich + '_datum'] || f[bereich + '_quelle'] || frei(ds, bereich) || (bereich === 'kind' && frei(ds, 'vertrauensperson'))) { return true; }
  if (bereich === 'beobachtung' && (f.beobachtungen || []).some(function (b) { return b && (b.datum || b.setting || b.dauer); })) { return true; }
  if ((a.chips || []).some(function (g) { return chips(ds, g).length; })) { return true; }
  return a.themen.some(function (th) { return th.aussagen.some(function (x) { return bewertung(ds, x[0]) != null; }); });
}
function freiBloecke(ds, feld) {
  return frei(ds, feld) ? frei(ds, feld).split(/\n\s*\n/).map(function (t) { return block(t.replace(/\s*\n\s*/g, ' ').trim()); }) : [];
}

// Sichtweise der Schule / des Kindes / der Eltern
function sichtweise(bereich, c, ds, opt) {
  const T = c.T.s, f = ds.f || {};
  const bloecke = [];
  c.neuerAbsatz();
  const vorne = [];
  c.vars = { datum: datumText(f[opt.datum], c.lang) };
  // Einleitungssatz; beim Kind nur mit Datum (sonst sagt er nichts aus), sonst nur mit Angaben zu dieser Sichtweise
  if (opt.intro && hatAngaben(ds, bereich) && !(opt.introWennNicht && bewertung(ds, opt.introWennNicht) != null) && !(opt.introNurMitDatum && !c.vars.datum)) { vorne.push(satz(fuelle(T[opt.intro], c, c.vars), c)); }
  (opt.chipsVorne || []).forEach(function (g) {
    const l = chips(ds, g[0]).map(function (k) { return fuelle(chipText(c, g[0], k), c); });
    if (l.length) { const v = { liste: liste(l, c) }; if (g[2] === 'liste') { v.zahl = l.length > 1 ? 2 : 1; } vorne.push(satz(fuelle(T[g[1]], c, v), c)); }
  });
  const tz = themenAbsaetze(bereich, c, ds, vorne.length > 0);
  c.vars = null;
  const absaetze = tz.absaetze.map(function (a) { return a.slice(); });
  if (vorne.length) { if (absaetze.length) { absaetze[0] = vorne.concat(absaetze[0]); } else { absaetze.push(vorne); } }
  if (tz.ohne.length && opt.ohne) {
    const s = satz(fuelle(T[opt.ohne], c, { liste: liste(tz.ohne, c, true) }), c);
    if (absaetze.length) { absaetze[absaetze.length - 1].push(s); } else { absaetze.push([s]); }
  }
  absaetze.forEach(function (a) { bloecke.push(block(a.join(' '))); });
  const hinten = [];
  c.neuerAbsatz();
  (opt.chipsHinten || []).forEach(function (g) {
    const l = chips(ds, g[0]).map(function (k) { return fuelle(chipText(c, g[0], k), c); });
    if (l.length) { const v = { liste: liste(l, c) }; if (g[2] === 'liste') { v.zahl = l.length > 1 ? 2 : 1; } hinten.push(satz(fuelle(T[g[1]], c, v), c)); }
  });
  if (opt.extra) { opt.extra(hinten); }
  if (hinten.length) { bloecke.push(block(hinten.join(' '))); }
  return bloecke.concat(freiBloecke(ds, bereich));
}

// ---------- 4.3 Interpretation ----------
function gruppiert(c, ds, themaId, feld) {
  const th = DS_AUFBAU.deutung.themen.filter(function (t) { return t.id === themaId; })[0];
  const stark = [], mittel = [];
  th.aussagen.forEach(function (a) {
    const r = bewertung(ds, a[0]); if (r == null || r < 4) { return; }
    const t = c.T.a[a[0]]; if (!t || !t[feld]) { return; }
    (r >= 5 ? stark : mittel).push({ id: a[0], r: r, pl: !!t.pl, text: fuelle(t[feld], c) });
  });
  const sort = function (x, y) { return y.r - x.r; };
  stark.sort(sort); mittel.sort(sort);
  return { stark: stark, mittel: mittel };
}
function deutung(c, ds) {
  const T = c.T.s, bloecke = [];
  // Abgleich der Quellen und Muster
  c.neuerAbsatz();
  const p1 = [];
  ['quellen', 'muster'].forEach(function (thId) {
    const th = DS_AUFBAU.deutung.themen.filter(function (t) { return t.id === thId; })[0];
    // Situationen mit Kurzform (m) werden zusammengefasst: "vor allem bei … und in …"
    const stark = [], mittel = [];
    th.aussagen.forEach(function (a) {
      const r = bewertung(ds, a[0]); if (r == null) { return; }
      const t = c.T.a[a[0]];
      if (t && t.m && r >= 5) { (r >= 6 ? stark : mittel).push(fuelle(t.m, c)); return; }
      const s = aussageSatz(c, a[0], r, false); if (s) { p1.push(s); }
    });
    if (stark.length) { p1.push(satz(fuelle(T.muster_stark, c, { liste: liste(stark, c) }), c)); }
    if (mittel.length) { p1.push(satz(fuelle(stark.length ? T.muster_mittel_nach : T.muster_mittel, c, { liste: liste(mittel, c) }), c)); }
  });
  if (p1.length) { bloecke.push(block(p1.join(' '))); }
  // Entwicklungsängste und Abwehr
  c.neuerAbsatz();
  const p2 = [], ang = gruppiert(c, ds, 'aengste', 'np'), abw = gruppiert(c, ds, 'abwehr', 'np');
  const txt = function (l) { return l.map(function (x) { return x.text; }); };
  if (ang.stark.length && ang.mittel.length) { p2.push(satz(fuelle(T.aengste_beide, c, { stark: liste(txt(ang.stark), c), mittel: liste(txt(ang.mittel), c) }), c)); }
  else if (ang.stark.length) { p2.push(satz(fuelle(T.aengste_stark, c, { liste: liste(txt(ang.stark), c) }), c)); }
  else if (ang.mittel.length) { p2.push(satz(fuelle(T.aengste_mittel, c, { liste: liste(txt(ang.mittel), c) }), c)); }
  ang.stark.slice(0, 2).forEach(function (x) { const e = c.T.a[x.id].e; if (e) { p2.push(satz(fuelle(e, c), c)); } });
  const angAlle = ang.stark.concat(ang.mittel);
  const vA = { stark: liste(txt(abw.stark), c), mittel: liste(txt(abw.mittel), c) };
  if (angAlle.length) {
    vA.zahl = angAlle.length > 1 ? 2 : 1;
    if (abw.stark.length && abw.mittel.length) { p2.push(satz(fuelle(T.abwehr_bezug_beide, c, vA), c)); }
    else if (abw.stark.length) { p2.push(satz(fuelle(T.abwehr_bezug_stark, c, vA), c)); }
    else if (abw.mittel.length) { p2.push(satz(fuelle(T.abwehr_bezug_mittel, c, vA), c)); }
  } else {
    if (abw.stark.length && abw.mittel.length) { vA.zahl = zahlVon(abw.stark); p2.push(satz(fuelle(T.abwehr_beide, c, vA), c)); }
    else if (abw.stark.length) { p2.push(satz(fuelle(T.abwehr_stark, c, { liste: vA.stark, zahl: zahlVon(abw.stark) }), c)); }
    else if (abw.mittel.length) { p2.push(satz(fuelle(T.abwehr_mittel, c, { liste: vA.mittel, zahl: zahlVon(abw.mittel) }), c)); }
  }
  if (frei(ds, 'abwehr')) { p2.push(frei(ds, 'abwehr')); }
  if (p2.length) { bloecke.push(block(p2.join(' '))); }
  // Erklärungsansätze
  c.neuerAbsatz();
  const p3 = [];
  const hyp = { stark: [], mittel: [] };
  DS_AUFBAU.deutung.themen.filter(function (t) { return t.id === 'hypothesen'; })[0].aussagen.forEach(function (a) {
    const r = bewertung(ds, a[0]); if (r == null || r < 4 || a[0] === 'i_hyp_trauma') { return; }
    (r >= 6 ? hyp.stark : hyp.mittel).push({ r: r, a: c.T.a[a[0]], pl: !!(c.T.a[a[0]] || {}).pl });
  });
  hyp.stark.sort(function (x, y) { return y.r - x.r; }); hyp.mittel.sort(function (x, y) { return y.r - x.r; });
  if (hyp.stark.length) {
    p3.push(satz(fuelle(T.hyp_stark, c, { liste: liste(hyp.stark.map(function (x) { return fuelle(x.a.g, c); }), c) }), c));
    if (hyp.mittel.length) { p3.push(satz(fuelle(T.hyp_mittel, c, { liste: liste(hyp.mittel.map(function (x) { return fuelle(x.a.n, c); }), c), zahl: zahlVon(hyp.mittel) }), c)); }
  } else if (hyp.mittel.length) {
    p3.push(satz(fuelle(T.hyp_nur_mittel, c, { liste: liste(hyp.mittel.map(function (x) { return fuelle(x.a.n, c); }), c), zahl: zahlVon(hyp.mittel) }), c));
  }
  if ((bewertung(ds, 'i_hyp_trauma') || 0) >= 4) { p3.push(satz(fuelle(T.hyp_trauma, c), c)); }
  if (p3.length) { bloecke.push(block(p3.join(' '))); }
  return bloecke.concat(freiBloecke(ds, 'deutung'));
}

// ---------- 5.1 Bedürfnisse und Ressourcen ----------
function beduerfnisse(c, ds) {
  const T = c.T.s, stark = [], mittel = [];
  DS_AUFBAU.beduerfnisse.themen[0].aussagen.forEach(function (a) {
    const r = bewertung(ds, a[0]); if (r == null || r < 4) { return; }
    (r >= 6 ? stark : mittel).push({ r: r, a: c.T.a[a[0]] });
  });
  const sort = function (x, y) { return y.r - x.r; };
  stark.sort(sort); mittel.sort(sort);
  c.neuerAbsatz();
  const s = [];
  if (stark.length) { s.push(satz(fuelle(T.beduerfnis_stark, c, { liste: liste(stark.map(function (x) { return fuelle(x.a.a, c); }), c) }), c)); }
  if (mittel.length) { s.push(satz(fuelle(stark.length ? T.beduerfnis_mittel : T.beduerfnis_nur_mittel, c, { liste: liste(mittel.map(function (x) { return fuelle(x.a.d, c); }), c) }), c)); }
  const res = chips(ds, 'ressourcen').map(function (k) { return fuelle(chipText(c, 'ressourcen', k), c); });
  const bloecke = [];
  if (s.length) { bloecke.push(block(s.join(' '))); }
  c.neuerAbsatz();
  if (res.length) { bloecke.push(block(satz(fuelle(T.ressourcen, c, { liste: liste(res, c) }), c))); }
  return bloecke.concat(freiBloecke(ds, 'beduerfnisse'));
}

// ---------- Datum ----------
const MONATE_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function datumText(iso, lang) {
  if (!iso) { return ''; }
  const d = new Date(iso + 'T12:00:00');
  if (isNaN(d)) { return String(iso); }
  if (lang === 'en') { return d.getDate() + ' ' + MONATE_EN[d.getMonth()] + ' ' + d.getFullYear(); }
  const p = function (n) { return (n < 10 ? '0' : '') + n; };
  return p(d.getDate()) + (lang === 'en' ? '/' : '.') + p(d.getMonth() + 1) + (lang === 'en' ? '/' : '.') + d.getFullYear();
}

// ---------- Der ganze Bericht ----------
// profil: ELDiB-Auswertung (siehe dsEldibProfil); liefert { id: [Blöcke] }
function bericht(lang, ds, stamm, profil) {
  ds = ds || {};
  const c = kontext(lang, ds, stamm), F = c.T.fakten, T = c.T.s, f = ds.f || {};
  const h = { fuelle: fuelle, satz: satz, liste: liste, chips: chips, chipText: chipText, frei: frei, freiBloecke: freiBloecke, block: block, datum: datumText, gross: gross, klein: klein,
    angaben: function (bereich) { return hatAngaben(ds, bereich); } };
  const ab = {};
  ab.auftrag = F.auftrag(c, ds, stamm, h);
  ab.vorgeschichte = F.vorgeschichte(c, ds, stamm, h);
  ab.sozialbericht = F.sozialbericht(c, ds, stamm, h);
  ab.aktuell = F.aktuell(c, ds, stamm, h);
  ab.schule = sichtweise('schule', c, ds, { intro: 'schule_intro', datum: 'schule_datum', ohne: 'schule_ohne',
    chipsVorne: [['s_staerken', 'schule_staerken', 'liste']], chipsHinten: [['s_hilft', 'schule_hilft'], ['s_erwartung', 'schule_erwartung']] });
  ab.kind = sichtweise('kind', c, ds, { intro: 'kind_intro', introWennNicht: 'k_offen', introNurMitDatum: true, datum: 'kind_datum', ohne: 'kind_ohne',
    chipsHinten: [['k_interessen', 'kind_interessen'], ['k_wuensche', 'kind_wuensche']],
    extra: function (hinten) { if (frei(ds, 'vertrauensperson')) { hinten.push(satz(fuelle(T.kind_vertrauen, c, { text: frei(ds, 'vertrauensperson') }), c)); } } });
  ab.eltern = sichtweise('eltern', c, ds, { intro: 'eltern_intro', datum: 'eltern_datum', ohne: 'eltern_ohne',
    chipsVorne: [['e_staerken', 'eltern_staerken', 'liste']], chipsHinten: [['e_erwartung', 'eltern_erwartung']] });
  ab.verfahren = F.verfahren(c, ds, stamm, h);
  ab.beobachtung = F.beobachtungIntro(c, ds, stamm, h).concat(sichtweise('beobachtung', c, ds, { ohne: 'beob_ohne' }));
  if (ab.beobachtung.length > 1 && ab.beobachtung[0].typ === 'absatz' && ab.beobachtung[1].typ === 'absatz') {
    ab.beobachtung = [block(ab.beobachtung[0].text + ' ' + ab.beobachtung[1].text)].concat(ab.beobachtung.slice(2));
  }
  ab.eldib = F.eldib(c, ds, stamm, h, profil);
  ab.deutung = deutung(c, ds);
  ab.schluss = F.schluss(c, ds, stamm, h);
  ab.beduerfnisse = beduerfnisse(c, ds);
  ab.ziele = F.ziele(c, ds, stamm, h, profil);
  ab.empfehlungen = F.empfehlungen(c, ds, stamm, h);
  ab.cni = F.cni(c, ds, stamm, h);
  return ab;
}

// Ein einzelner Satz für die Vorschau beim Anklicken
function vorschauSatz(lang, ds, stamm, id, r) {
  const c = kontext(lang, ds, stamm);
  const a = c.T.a[id];
  if (!a) { return ''; }
  if (a.t) {
    const tpl = a.t[dsStufe(r)];
    if (!tpl) { return a.np ? fuelle(c.T.s.vorschau_ohne || '(„{liste}“ wird als nicht zutreffend erwähnt)', c, { liste: fuelle(a.np, c) }) : ''; }
    return satz(fuelle(tpl, c), c);
  }
  return '';
}

return { bericht: bericht, vorschauSatz: vorschauSatz, kontext: kontext, fuelle: fuelle, satz: satz, liste: liste, datum: datumText };
})();
