// =====================================================================
// DS-Baukasten: englische Faktenabschnitte (Auftrag, Vorgeschichte, Familie,
// aktuelle Situation, Verfahren, ELDiB, Schluss, Ziele, Empfehlungen, CNI)
// Gleiche Funktionen, Signaturen und Blocktypen wie 43b-ds-fakten-de.js.
// h = Hilfsfunktionen aus DsText (fuelle, satz, liste, chips, …);
// Datum immer mit h.datum(iso, 'en').
// ELDiB-Codes erscheinen wie in der englischen App (getDisplayCode):
// V -> BEH, K -> COM, SOZ -> SOC, KOG -> COG (z. B. "COM-17").
// =====================================================================
DS_TEXTE.en.s.das_kind = 'the student';
DS_TEXTE.en.s.vorschau_ohne = 'Mentioned in the report in the list “no indications of …”: {liste}.';
DS_TEXTE.en.quellen = {
  // n = Subjekt/Objekt ("the class teacher"), d = nach "with" (hier gleich)
  schule: {
    lehrperson: { n: 'the teacher', d: 'the teacher', label: 'Teacher' },
    lehrerin: { n: 'the class teacher', d: 'the class teacher', label: 'Class teacher (female)' },
    lehrer: { n: 'the class teacher', d: 'the class teacher', label: 'Class teacher (male)' },
    team: { n: 'the teaching team', d: 'the teaching team', label: 'Teaching team' },
    eseb: { n: 'the ESEB specialist', d: 'the ESEB specialist', label: 'ESEB specialist' }
  },
  // g = Genitiv für {Qg} ("the mother’s"; derzeit in keinem Rahmensatz benutzt); zahl steuert {{is|are}}
  eltern: {
    eltern: { n: 'the parents', d: 'the parents', g: 'the parents’', zahl: 2, label: 'Both parents' },
    mutter: { n: 'the mother', d: 'the mother', g: 'the mother’s', zahl: 1, label: 'Mother' },
    vater: { n: 'the father', d: 'the father', g: 'the father’s', zahl: 1, label: 'Father' },
    pflegeeltern: { n: 'the foster parents', d: 'the foster parents', g: 'the foster parents’', zahl: 2, label: 'Foster parents' },
    grosseltern: { n: 'the grandparents', d: 'the grandparents', g: 'the grandparents’', zahl: 2, label: 'Grandparents' }
  }
};
DS_TEXTE.en.optionen = {
  auftraggeber: { cni: ['CNI', 'the Commission nationale d’inclusion (National Inclusion Commission, CNI)'], eseb: ['ESEB', 'the ESEB'], schule: ['School', 'the school'], eltern: ['Parents', 'the parents'] },
  verlauf: { unauffaellig: 'uneventful', komplikationen: 'with complications', unbekannt: 'unknown' },
  entwicklung: { altersgerecht: 'age-appropriate', verzoegert: 'delayed', unbekannt: 'unknown' },
  familienstand: { zusammen: 'living together', getrennt: 'separated', alleinerziehend: 'single parent', patchwork: 'blended family', verstorben: 'one parent deceased' },
  lebt_bei: { beide: ['with both parents', 'lives with both parents'], mutter: ['with the mother', 'lives with {his} mother'], vater: ['with the father', 'lives with {his} father'], wechsel: ['alternating residence', 'lives alternately with each parent'], grosseltern: ['with the grandparents', 'lives with {his} grandparents'], pflege: ['in a foster family', 'lives with a foster family'], heim: ['in a residential group', 'lives in a residential care group'] },
  kontakt: { regelmaessig: 'There is regular contact with both parents.', eingeschraenkt_vater: 'Contact with the father is limited.', eingeschraenkt_mutter: 'Contact with the mother is limited.', kein_vater: 'There is no contact with the father.', kein_mutter: 'There is no contact with the mother.' },
  position: { aeltestes: 'the oldest child', mittleres: 'a middle child', juengstes: 'the youngest child' },
  arbeitszeit: { vollzeit: 'full-time', teilzeit: 'part-time', nicht: '' },
  setting: { klasse: 'during whole-class instruction', kleingruppe: 'in a small group', einzel: 'in a one-to-one setting', pause: 'during recess', maison: 'at the Maison Relais', sport: 'during physical education' },
  abgestimmt: { ja: 'Yes, fully agreed', vorbehalte: 'Yes, with reservations', nein: 'No' },
  stufeAlter: { 1: '0–2 years', 2: '2–5 years', 3: '6–9 years', 4: '10–12 years', 5: '13–16 years' }
};

DS_TEXTE.en.fakten = (function () {
  const O = DS_TEXTE.en.optionen;
  const roem = function (n) { return ['', 'I', 'II', 'III', 'IV', 'V'][n] || String(n); };
  // kleine Zahlen im Text ausgeschrieben ("two siblings")
  const ZAHLWORT = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  // Anzeige-Codes der englischen App; unbekannte Codes bleiben unverändert
  const CODES = { V: 'BEH', K: 'COM', SOZ: 'SOC', KOG: 'COG' };
  function code(k) {
    const t = String(k || '').split('-');
    if (CODES[t[0]]) { t[0] = CODES[t[0]]; }
    return t.join('-');
  }
  // Verb in der 3. Person Singular ("Shows", "Uses", "Is") – nicht "Class", "Access"
  function verb3(w) { return /^(Is|Has|Does)$/i.test(w) || /^[A-Za-z][a-z]*[a-rt-z]s$/.test(w || ''); }
  // ELDiB-Beschreibung (englische Daten, DTORF-R-Stil) als Satzteil nach dem Namen:
  // "Describes own experiences." -> "describes {his} own experiences"
  // "Responds on their own …" -> "responds on {his} own …"; auch "Actively participates …".
  // Nominalformen ("Motor skills of a 3-year-old.") -> '' (werden nicht umgeformt).
  function praedikat(d) {
    d = String(d || '').trim().replace(/\.$/, '');
    const w = d.split(/\s+/);
    const adverb = /^[A-Z][a-z]+ly$/.test(w[0]) && w.length > 1;
    if (!(adverb ? verb3(w[1]) : verb3(w[0]))) { return ''; }
    let p = persoenlich(d.charAt(0).toLowerCase() + d.slice(1));
    // "own" ohne Possessiv davor ("for own behavior") -> "for {his} own behavior"
    p = p.replace(/(\S+)(\s+)own\b/g, function (m, vor, ws) {
      return /^(\{his\}|his|her|its|my|your|our|one[’']s)$/i.test(vor) ? m : vor + ws + '{his} own';
    });
    return p;
  }
  // neutrales "their/themselves" der Itemtexte auf das Kind beziehen
  function persoenlich(d) {
    return String(d || '').replace(/\btheir own\b/g, '{his} own').replace(/\bthemselves\b/g, '{himself}').replace(/\btheir\b/g, '{his}').replace(/\bof self(?![\w-])/g, 'of {himself}');
  }
  // Grundform für Zielsätze: "participates in …" -> "participate in …" ("{Name} will …")
  function basis(v) {
    const u = { is: 'be', has: 'have', does: 'do', goes: 'go' };
    if (u[v]) { return u[v]; }
    if (/[^aeiou]ies$/.test(v)) { return v.slice(0, -3) + 'y'; }
    if (/(ss|sh|ch|x|zz|o)es$/.test(v)) { return v.slice(0, -2); }
    return v.replace(/s$/, '');
  }
  function grundform(d) {
    const p = praedikat(d);
    if (!p) { return ''; }
    const w = p.split(' ');
    const i = (/ly$/.test(w[0]) && w.length > 1) ? 1 : 0;
    w[i] = basis(w[i]);
    // zwei Verben: "adds and subtracts" -> "add and subtract"
    if (w[i + 1] === 'and' && verb3(w[i + 2])) { w[i + 2] = basis(w[i + 2]); }
    return w.join(' ');
  }
  // Ziele ohne Verb ("Motor skills of a 5-year-old.", "Eye-hand coordination at age 6.") als "{Name} will develop …"
  function zielNomen(d, c, h) {
    d = persoenlich(d).trim().replace(/\.$/, '');
    let m = /^((?:Fine )?[Mm]otor skills) of an? (\d+)-year-old$/.exec(d);
    if (m) { return h.satz(h.fuelle('{Name} will develop the ' + m[1].toLowerCase() + ' of a ' + m[2] + '-year-old', c), c); }
    m = /^Eye-hand coordination at age (\d+)$/.exec(d);
    if (m) { return h.satz(h.fuelle('{Name} will develop eye-hand coordination at the level expected at age ' + m[1], c), c); }
    return h.fuelle(d, c);
  }
  // Artikel vor frei eingegebenem Beruf: "as a nurse", "as an engineer"
  function mitArtikel(b) {
    if (/^(a|an|the)\s/i.test(b) || /^(self-employed|freelance|retired|unemployed)/i.test(b)) { return b; }
    return (/^[aeio]/i.test(b) ? 'an ' : 'a ') + b;
  }
  // Stufe mit Richtziel und Alter: (“Acquiring skills …”, 6–9 years)
  function klammer(x) {
    const teile = [x.richtziel ? '“' + x.richtziel + '”' : '', O.stufeAlter[x.stufe] || ''].filter(Boolean);
    return teile.length ? ' (' + teile.join(', ') + ')' : '';
  }
  const KOPF = ['Period', 'Class', 'Measure', 'Provider'];

  return {
    auftrag: function (c, ds, st, h) {
      const f = ds.f || {}, s = [];
      c.neuerAbsatz();
      const wer = (O.auftraggeber[f.auftraggeber || 'cni'] || O.auftraggeber.cni)[1];
      const wer2 = f.auftraggeber === 'andere' && h.frei(ds, 'auftraggeber_andere') ? h.frei(ds, 'auftraggeber_andere') : wer;
      // ohne Namen bleibt {Vollname} leer -> dann "the student"
      s.push(h.satz(h.fuelle('The Centre pour le développement socio-émotionnel (Centre for Socio-Emotional Development, CDSE) was commissioned by {wer}{datum: on {datum}} to carry out a specialized diagnostic assessment of ' + (c.vollname ? '{Vollname}' : '{Name}') + ' in order to determine {his} current level of socio-emotional development and {his} special educational needs.', c, { datum: h.datum(f.auftrag_datum, 'en'), wer: wer2 }), c));
      // beide Verhaltens-Chips zusammenfassen: "behavioral difficulties at school and at home"
      const ak = h.chips(ds, 'anlass'), beide = ak.indexOf('verhalten_schule') >= 0 && ak.indexOf('verhalten_zuhause') >= 0;
      const anl = ak.filter(function (k) { return !(beide && k === 'verhalten_zuhause'); }).map(function (k) { return beide && k === 'verhalten_schule' ? 'behavioral difficulties at school and at home' : h.chipText(c, 'anlass', k); });
      if (h.frei(ds, 'anlass_andere')) { anl.push(h.frei(ds, 'anlass_andere')); }
      if (anl.length) { s.push(h.satz(h.fuelle('The referral was prompted by {liste}.', c, { liste: h.liste(anl, c) }), c)); }
      const anl2 = h.chips(ds, 'anliegen').map(function (k) { return h.chipText(c, 'anliegen', k); });
      if (anl2.length) { s.push(h.satz(h.fuelle('The aim is to initiate {liste}.', c, { liste: h.liste(anl2, c) }), c)); }
      const emp = h.chips(ds, 'empfohlen').filter(function (k) { return k !== 'eltern'; }).map(function (k) { return h.chipText(c, 'empfohlen', k); });
      const wunsch = h.chips(ds, 'empfohlen').indexOf('eltern') >= 0;
      // "auf Wunsch der Eltern": mit der Eltern-Quelle ({Qd}), damit z. B. eine alleinerziehende Mutter nicht zu "the parents" wird
      if (emp.length && wunsch) { s.push(h.satz(h.fuelle('The request was made at the wish of {Qd} and on the recommendation of {liste}.', c, { liste: h.liste(emp, c) }), c)); }
      else if (emp.length) { s.push(h.satz(h.fuelle('The request was made on the recommendation of {liste}.', c, { liste: h.liste(emp, c) }), c)); }
      else if (wunsch) { s.push(h.satz(h.fuelle('The request was made at the wish of {Qd}.', c), c)); }
      const b = [h.block(s.join(' '))];
      return b.concat(h.freiBloecke(ds, 'anlass_details'));
    },

    vorgeschichte: function (c, ds, st, h) {
      const f = ds.f || {}, s = [], b = [];
      c.neuerAbsatz();
      // Schwangerschaft und Geburt
      const sg = f.schwangerschaft, gb = f.geburt;
      if (sg === 'unauffaellig' && gb === 'unauffaellig') { s.push(h.satz(h.fuelle('According to {Q}, the pregnancy and birth were uneventful.', c), c)); }
      else {
        if (sg === 'unauffaellig') { s.push('The pregnancy was uneventful.'); }
        if (sg === 'komplikationen') { s.push(h.satz(h.fuelle('There were complications during pregnancy{d: ({d})}.', c, { d: h.frei(ds, 'schwangerschaft_details') }), c)); }
        if (gb === 'unauffaellig') { s.push('The birth was uneventful.'); }
        if (gb === 'komplikationen') { s.push(h.satz(h.fuelle('There were complications at birth{d: ({d})}.', c, { d: h.frei(ds, 'geburt_details') }), c)); }
      }
      // Motorik und Sprache
      const mo = f.motorik, sp = f.sprache;
      const worte = f.erste_worte ? ' (first words at around ' + f.erste_worte + ' months)' : '';
      if (mo === 'altersgerecht' && sp === 'altersgerecht') { s.push('Motor and language development were age-appropriate' + worte + '.'); }
      else if (mo === 'altersgerecht' && sp === 'verzoegert' && !h.frei(ds, 'sprache_details')) { s.push('Motor development was age-appropriate, while language development was delayed' + worte + '.'); }
      else if (mo === 'verzoegert' && sp === 'altersgerecht' && !h.frei(ds, 'motorik_details')) { s.push('Language development was age-appropriate' + worte + ', while motor development was delayed.'); }
      else {
        if (mo === 'altersgerecht') { s.push('Motor development was age-appropriate.'); }
        if (mo === 'verzoegert') { s.push(h.satz(h.fuelle('Motor development was delayed{d: ({d})}.', c, { d: h.frei(ds, 'motorik_details') }), c)); }
        if (sp === 'altersgerecht') { s.push('Language development was age-appropriate' + worte + '.'); }
        if (sp === 'verzoegert') { s.push(h.satz(h.fuelle('Language development was delayed' + worte + '{d:; {d}}.', c, { d: h.frei(ds, 'sprache_details') }), c)); }
      }
      // Diagnosen
      const dg = h.chips(ds, 'diagnosen').map(function (k) {
        const name = k === 'andere' ? h.frei(ds, 'diagnose_andere') : h.chipText(c, 'diagnosen', k);
        const det = ds.f && ds.f.diagnosen_details && ds.f.diagnosen_details[k];
        return name ? name + (det ? ' (' + det + ')' : '') : '';
      }).filter(Boolean);
      if (dg.length) { s.push(h.satz(h.fuelle('To date, {N} has been diagnosed with {liste}.', c, { liste: h.liste(dg, c), zahl: dg.length }), c)); }
      else if (f.keine_diagnosen) { s.push('No diagnoses have been made to date.'); }
      if (s.length) { b.push(h.block(s.join(' '))); }
      const rows = ((ds.tabellen && ds.tabellen.vorgeschichte) || []).filter(function (r) { return r && (r.zeitraum || r.massnahme || r.akteur); });
      if (rows.length) {
        b.push(h.block('Previous school-based and out-of-school support measures:'));
        b.push({ typ: 'tabelle', id: 'vorgeschichte', kopf: KOPF.slice(), zeilen: rows.map(function (r) { return [r.zeitraum || '', r.klasse || '', r.massnahme || '', r.akteur || '']; }) });
      }
      return b.concat(h.freiBloecke(ds, 'vorgeschichte'));
    },

    sozialbericht: function (c, ds, st, h) {
      const f = ds.f || {}, s = [];
      c.neuerAbsatz();
      const lb = O.lebt_bei[f.lebt_bei], fs = f.familienstand, wo = f.lebt_bei;
      const stand = { getrennt: '{Name}’s parents are separated', zusammen: '{Name}’s parents live together', alleinerziehend: wo === 'vater' ? '{Name}’s father is a single parent' : '{Name}’s mother is a single parent', patchwork: '{Name} is growing up in a blended family', verstorben: 'One of {Name}’s parents has died' }[fs];
      if (fs === 'alleinerziehend' && (wo === 'mutter' || wo === 'vater')) { s.push(h.satz(h.fuelle('{Name} lives with {his} ' + (wo === 'vater' ? 'father' : 'mother') + ', who is a single parent.', c), c)); }
      else if (stand && lb && !(fs === 'zusammen' && wo === 'beide')) { s.push(h.satz(h.fuelle(stand + '; [[he|she]] ' + lb[1] + '.', c), c)); }
      else if (stand && fs === 'zusammen' && wo === 'beide') { s.push(h.satz(h.fuelle('{Name} lives with both parents.', c), c)); }
      else if (stand) { s.push(h.satz(h.fuelle(stand + '.', c), c)); }
      else if (lb) { s.push(h.satz(h.fuelle('{N} ' + lb[1] + '.', c), c)); }
      if (O.kontakt[f.kontakt]) { s.push(O.kontakt[f.kontakt]); }
      if (h.frei(ds, 'kontakt_details')) { s.push(h.satz(h.frei(ds, 'kontakt_details'), c)); }
      const n = parseInt(f.geschwister_anzahl, 10);
      if (n === 0) { s.push(h.satz(h.fuelle('{N} is an only child.', c), c)); }
      else if (n > 0) {
        const pk = f.geschwister_position, pos = O.position[pk];
        let t;
        if (n === 1 && pk === 'aeltestes') { t = '{N} has a younger sibling.'; }
        else if (n === 1 && pk === 'juengstes') { t = '{N} has an older sibling.'; }
        else { t = '{N} has ' + (n === 1 ? 'one sibling' : (ZAHLWORT[n] || String(n)) + ' siblings') + (pos && n > 1 ? ' and is ' + pos : '') + '.'; }
        s.push(h.satz(h.fuelle(t, c), c));
      }
      const sp = h.chips(ds, 'sprachen').map(function (k) { return k === 'andere' ? h.frei(ds, 'sprache_andere') : h.chipText(c, 'sprachen', k); }).filter(Boolean);
      if (sp.length) { s.push(h.satz(h.fuelle('The family speaks {liste} at home.', c, { liste: h.liste(sp, c) }), c)); }
      // Beruf der Eltern; Freitext wird nicht durch fuelle geschickt
      const sein = h.fuelle('{his}', c);
      const beruf = function (wer, b, z) {
        if (z === 'nicht') { return wer + ' is not currently employed'; }
        if (!b && !z) { return ''; }
        return wer + ' works' + (O.arbeitszeit[z] ? ' ' + O.arbeitszeit[z] : '') + (b ? ' as ' + mitArtikel(b) : '');
      };
      const bm = beruf(sein + ' mother', h.frei(ds, 'beruf_mutter'), f.zeit_mutter), bv = beruf(sein + ' father', h.frei(ds, 'beruf_vater'), f.zeit_vater);
      if (bm && bv) { s.push(h.satz(bm + '; ' + bv + '.', c)); } else if (bm || bv) { s.push(h.satz((bm || bv) + '.', c)); }
      const ev = h.chips(ds, 'ereignisse').map(function (k) {
        const det = ds.f && ds.f.ereignis_details && ds.f.ereignis_details[k];
        return h.chipText(c, 'ereignisse', k) + (det ? ' (' + det + ')' : '');
      });
      if (ev.length) { s.push(h.satz(h.fuelle('{liste} {{is|are}} reported as {{a stressful life event|stressful life events}}.', c, { liste: h.liste(ev, c), zahl: ev.length }), c)); }
      const bt = h.chips(ds, 'betreuung');
      if (bt.indexOf('maison_relais') >= 0) { s.push(h.satz(h.fuelle('After school, {N} attends the Maison Relais.', c), c)); }
      const gr = bt.indexOf('grosseltern') >= 0, tm = bt.indexOf('tagesmutter') >= 0;
      if (gr && tm) { s.push(h.satz(h.fuelle('Outside school hours, {N} is looked after by {his} grandparents and by a childminder.', c), c)); }
      else if (gr) { s.push(h.satz(h.fuelle('Outside school hours, {N} is regularly looked after by {his} grandparents.', c), c)); }
      else if (tm) { s.push(h.satz(h.fuelle('Outside school hours, {N} is looked after by a childminder.', c), c)); }
      if (h.frei(ds, 'freizeit')) { s.push(h.satz(h.frei(ds, 'freizeit'), c)); }
      return (s.length ? [h.block(s.join(' '))] : []).concat(h.freiBloecke(ds, 'familie'));
    },

    aktuell: function (c, ds, st, h) {
      const f = ds.f || {};
      c.neuerAbsatz();
      const klasse = f.klasse || (st && st.klasse) || '', schule = f.schule_name || (st && st.foerderort) || '';
      const s = [];
      if (klasse || schule) {
        const lp = h.frei(ds, 'lehrperson');
        let t = '{N} currently attends ' + (klasse ? 'class {klasse}' + (schule ? ' at {schule}' : '') : '{schule}');
        if (lp) { t += ', where {his} class teacher is {lp}'; }
        s.push(h.satz(h.fuelle(t + '.', c, { klasse: klasse, schule: schule, lp: lp }), c));
      }
      if (h.frei(ds, 'eseb_referenz')) { s.push(h.satz(h.fuelle('{his} reference person at the ESEB is {x}.', c, { x: h.frei(ds, 'eseb_referenz') }), c)); }
      const b = (s.length ? [h.block(s.join(' '))] : []).concat(h.freiBloecke(ds, 'aktuell'));   // eigene Ergänzung
      const rows = ((ds.tabellen && ds.tabellen.aktuell) || []).filter(function (r) { return r && (r.zeitraum || r.massnahme || r.akteur); });
      if (rows.length) { b.push({ typ: 'tabelle', id: 'aktuell', kopf: KOPF.slice(), zeilen: rows.map(function (r) { return [r.zeitraum || '', r.klasse || '', r.massnahme || '', r.akteur || '']; }), abschnitt: 'massnahmen' }); }
      return b;
    },

    verfahren: function (c, ds, st, h) {
      c.neuerAbsatz();
      const v = h.chips(ds, 'verfahren').filter(function (k) { return k !== 'andere' && h.chipText(c, 'verfahren', k); }).map(function (k) { return h.chipText(c, 'verfahren', k); });
      if (h.frei(ds, 'verfahren_andere')) { v.push(h.frei(ds, 'verfahren_andere')); }
      if (!v.length) { v.push(h.chipText(c, 'verfahren', 'eldib')); }
      // Beobachtung und Gespräche nur nennen, wenn dazu Angaben vorliegen (sonst nichts erfinden)
      const gespr = [['schule', '{QSd}'], ['eltern', '{Qd}'], ['kind', '{Name} {himself}']].filter(function (x) { return h.angaben(x[0]); }).map(function (x) { return x[1]; });
      const teile = ['on {liste}'];
      if (h.angaben('beobachtung') || h.chips(ds, 'verfahren').indexOf('beobachtung') >= 0) { teile.push('on classroom observations'); }
      if (gespr.length) { teile.push('on interviews with ' + h.liste(gespr, c)); } else if (h.chips(ds, 'verfahren').indexOf('gespraeche') >= 0) { teile.push('on interviews'); }
      const s = [h.satz(h.fuelle('This assessment is based ' + (teile.length > 1 ? teile.slice(0, -1).join(', ') + ' and ' + teile[teile.length - 1] : teile[0]) + '.', c, { liste: h.liste(v, c) }), c)];
      if (h.frei(ds, 'verfahren_ort')) { s.push(h.satz(h.fuelle('Observations and interviews took place in {ort}.', c, { ort: h.frei(ds, 'verfahren_ort') }), c)); }
      return [h.block(s.join(' '))];
    },

    beobachtungIntro: function (c, ds, st, h) {
      const l = ((ds.f && ds.f.beobachtungen) || []).filter(function (b) { return b && (b.datum || b.setting || b.dauer); });
      if (!l.length) { return []; }
      c.neuerAbsatz();
      const T = DS_TEXTE.en.s;
      const teile = l.map(function (b) {
        return h.fuelle(T.beob_eintrag, c, { datum: h.datum(b.datum, 'en'), ort: O.setting[b.setting] || b.setting_andere || '', dauer: b.dauer ? String(b.dauer) : '' }).trim();
      });
      return [h.block(h.satz(h.fuelle(l.length > 1 ? T.beob_mehrere : T.beob_eine, c, { beob: h.liste(teile, c) }), c))];
    },

    eldib: function (c, ds, st, h, profil) {
      const b = [];
      c.neuerAbsatz();
      b.push(h.block('The ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen), the German adaptation of the Developmental Teaching Objectives Rating Form – Revised (DTORF-R), is a standardized rating instrument designed to assess the social and emotional development of children and adolescents from birth to the age of sixteen. It provides a profile of specific skills that serve as indicators of the level of social and emotional competence.'));
      const bereiche = (profil && profil.bereiche) || [];
      const mitStufe = bereiche.filter(function (x) { return x.stufe > 0; });
      bereiche.forEach(function (x) {
        c.neuerAbsatz();
        const s = [];
        const v = { bereich: x.name, code: code(x.code), stufe: roem(x.stufe), klammer: klammer(x) };
        if (!x.stufe) { s.push(h.satz(h.fuelle('In the {bereich} domain ({code}), no items have yet been rated as mastered.', c, v), c)); }
        else if (mitStufe.length > 1 && x === mitStufe[0]) { s.push(h.satz(h.fuelle('{Name} is most advanced in the {bereich} domain ({code}), where [[he|she]] is functioning at developmental Stage {stufe}{klammer}.', c, v), c)); }
        else if (mitStufe.length > 1 && x === mitStufe[mitStufe.length - 1]) { s.push(h.satz(h.fuelle('The least developed domain is {bereich} ({code}), where {N} is functioning at developmental Stage {stufe}{klammer}.', c, v), c)); }
        else { s.push(h.satz(h.fuelle('In the {bereich} domain ({code}), {N} is functioning at developmental Stage {stufe}{klammer}.', c, v), c)); }
        // die zwei zuletzt erreichten Fähigkeiten, mit unterschiedlichem Verb
        const pr = [], verben = {};
        (x.erreicht || []).slice().reverse().forEach(function (it) {
          const p = praedikat(it.description), w = p.split(' ')[0];
          if (p && pr.length < 2 && !verben[w]) { verben[w] = 1; pr.unshift(h.fuelle(p, c)); }
        });
        // enthält ein Beispiel schon "and" ("multiplies and divides"), zwei Satzteile: ", and she …"
        const pv = pr.length === 2 && pr.some(function (x) { return / and /.test(x); }) ? pr[0] + ', and ' + h.fuelle('[[he|she]] ', c) + pr[1] : h.liste(pr, c, false, true);
        if (pr.length) { s.push(h.satz(h.fuelle('{N} has already acquired solid skills in this domain; for example, [[he|she]] {p}.', c, { p: pv }), c)); }
        const extra = ds.frei && ds.frei['eldib_' + x.id];
        if (extra && String(extra).trim()) { s.push(String(extra).trim()); }
        b.push(h.block(s.join(' ')));
        if ((x.ziele || []).length) {
          b.push(h.block(h.satz(h.fuelle('Based on the stage objective, the following learning goals have been set for {Nt}:', c), c)));
          b.push({ typ: 'liste', punkte: x.ziele.map(function (z) { return code(z.code) + ' – ' + h.fuelle(persoenlich(z.description).replace(/\.$/, ''), c); }) });
        } else if (x.stufe) {
          b.push(h.block('No learning goals have been set in this domain.'));
        }
      });
      if (profil && profil.lebensalter != null && mitStufe.length) {
        c.neuerAbsatz();
        const erw = profil.erwarteteStufe, unter = mitStufe.filter(function (x) { return x.stufe < erw; });
        const v = { roem: roem(erw), alter: O.stufeAlter[erw] || '', jahre: profil.lebensalter };
        const erwartet = 'Given a chronological age of {jahre} years, developmental Stage {roem}{alter: ({alter})} would be expected; ';
        let t;
        if (unter.length === bereiche.length) { t = erwartet + 'all ' + (ZAHLWORT[bereiche.length] || bereiche.length) + ' domains fall below this level.'; }
        else if (unter.length === 1) { t = erwartet + 'the {liste} domain falls below this level.'; v.liste = unter[0].name; }
        else if (unter.length) { t = erwartet + 'the {liste} domains fall below this level.'; v.liste = h.liste(unter.map(function (x) { return x.name; }), c); }
        else { t = 'In all domains assessed, {N} is functioning at least at the age-appropriate developmental Stage {roem}{alter: ({alter})}.'; }
        b.push(h.block(h.satz(h.fuelle(t, c, v), c)));
      }
      return b;
    },

    schluss: function (c, ds, st, h) {
      const f = ds.f || {};
      c.neuerAbsatz();
      // ab etwa 12 Jahren wird das Kind in die Abstimmung einbezogen (Vorlage CNI)
      const mitKind = c.alter != null && c.alter >= 12;
      // das Kind zuletzt nennen, damit sich "her/his" eindeutig auf das Kind bezieht (nicht auf "the mother")
      const wer = mitKind ? '{Qd} and with {Name} {himself}' : '{Qd}';
      const ihre = mitKind ? '{his}' : '{Name}’s';
      let t;
      if (f.abgestimmt === 'vorbehalte') {
        t = 'Based on the available test results, observations and case history information, specific support needs were identified. In discussions with ' + wer + ', recommendations were developed to further support ' + ihre + ' individual development. Some of the proposed measures were, however, questioned or not fully endorsed by ' + (mitKind ? '{Qd} and/or by {Name}' : '{Qd}') + '.';
      } else if (f.abgestimmt === 'nein') {
        t = 'Based on the available test results, observations and case history information, specific support needs were identified and recommendations formulated. It has not yet been possible to agree on these recommendations with ' + wer + '.';
      } else if (f.abgestimmt === 'ja') {
        t = 'Based on the test results, observations and case history information gathered, specific support needs were identified in close consultation with ' + wer + '. On this basis, recommendations were jointly formulated to support ' + ihre + ' individual development effectively.';
      } else {
        // keine Angabe zur Abstimmung: keine Abstimmung behaupten
        t = 'Based on the test results, observations and case history information gathered, specific support needs were identified. On this basis, recommendations were formulated to support {Name}’s individual development effectively.';
      }
      return [h.block(h.satz(h.fuelle(t, c), c))].concat(h.freiBloecke(ds, 'vorbehalte'));
    },

    ziele: function (c, ds, st, h, profil) {
      const f = ds.f || {}, b = [];
      c.neuerAbsatz();
      const ziele = [];
      ((profil && profil.bereiche) || []).forEach(function (x) { (x.ziele || []).forEach(function (z) { ziele.push({ z: z, x: x }); }); });
      const bis = f.ziele_bis ? 'until ' + h.datum(f.ziele_bis, 'en') : 'until the end of the next ' + ((st && st.periodenTyp) === 'semester' ? 'semester' : 'trimester');
      if (ziele.length) {
        b.push(h.block(h.satz(h.fuelle('The following support goals are derived from the ELDiB learning goals. Each goal describes the next developmental step; progress will be monitored in everyday situations {bis} and reviewed at the next ELDiB assessment.', c, { bis: bis }), c)));
        b.push({ typ: 'liste', punkte: ziele.map(function (e) {
          c.neuerAbsatz();
          // "Participates in group discussions." -> "Tom will participate in group discussions"
          const g = grundform(e.z.description);
          const text = g ? h.satz(h.fuelle('{Name} will ' + g, c), c) : zielNomen(e.z.description, c, h);
          return text + ' (' + code(e.z.code) + ')';
        }) });
      }
      const zus = h.frei(ds, 'ziele_zusatz');
      if (zus) { b.push({ typ: 'liste', punkte: zus.split(/\n+/).map(function (l) { return l.replace(/^[-•*]\s*/, '').trim(); }).filter(Boolean) }); }
      return b;
    },

    empfehlungen: function (c, ds, st, h) {
      const b = [];
      c.neuerAbsatz();
      [['empf_familie', 'Family context', 'empfehlung_familie'], ['empf_schule', 'School context (local)', 'empfehlung_schule'], ['empf_region', 'Regional context (ESEB / CDSE)', 'empfehlung_region']].forEach(function (g) {
        const p = h.chips(ds, g[0]).map(function (k) { return h.fuelle(h.chipText(c, g[0], k), c); });
        const extra = h.frei(ds, g[2]);
        if (extra) { extra.split(/\n+/).forEach(function (l) { l = l.replace(/^[-•*]\s*/, '').trim(); if (l) { p.push(l); } }); }
        if (p.length) { b.push({ typ: 'zwischen', text: g[1] }); b.push({ typ: 'liste', punkte: p }); }
      });
      return b;
    },

    cni: function (c, ds, st, h) {
      c.neuerAbsatz();
      const m = h.chips(ds, 'cni').map(function (k) { return h.fuelle(h.chipText(c, 'cni', k), c); });
      const b = [];
      if (m.length) {
        // Bezeichnungen der Maßnahmen = Deckblatt (siehe chips.cni)
        b.push(h.block(m.length > 1 ? 'The CDSE recommends the following measures to the Commission nationale d’inclusion (CNI):' : 'The CDSE recommends the following measure to the Commission nationale d’inclusion (CNI):'));
        b.push({ typ: 'liste', punkte: m });
      }
      return b.concat(h.freiBloecke(ds, 'cni_begruendung'));
    }
  };
})();
