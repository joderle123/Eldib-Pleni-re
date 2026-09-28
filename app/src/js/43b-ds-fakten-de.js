// =====================================================================
// DS-Baukasten: deutsche Faktenabschnitte (Auftrag, Vorgeschichte, Familie,
// aktuelle Situation, Verfahren, ELDiB, Schluss, Ziele, Empfehlungen, CNI)
// h = Hilfsfunktionen aus DsText (fuelle, satz, liste, chips, …)
// =====================================================================
DS_TEXTE.de.s.das_kind = 'das Kind';
DS_TEXTE.de.s.vorschau_ohne = 'Wird im Bericht in der Aufzählung „keine Hinweise auf …“ erwähnt: {liste}.';
DS_TEXTE.de.quellen = {
  schule: {
    lehrperson: { n: 'die Lehrperson', d: 'der Lehrperson', label: 'Lehrperson' },
    lehrerin: { n: 'die Klassenlehrerin', d: 'der Klassenlehrerin', label: 'Klassenlehrerin' },
    lehrer: { n: 'der Klassenlehrer', d: 'dem Klassenlehrer', label: 'Klassenlehrer' },
    team: { n: 'das pädagogische Team', d: 'dem pädagogischen Team', label: 'Pädagogisches Team' },
    eseb: { n: 'die ESEB-Fachkraft', d: 'der ESEB-Fachkraft', label: 'ESEB-Fachkraft' }
  },
  eltern: {
    eltern: { n: 'die Eltern', d: 'den Eltern', g: 'der Eltern', zahl: 2, label: 'beide Eltern' },
    mutter: { n: 'die Mutter', d: 'der Mutter', g: 'der Mutter', zahl: 1, label: 'Mutter' },
    vater: { n: 'der Vater', d: 'dem Vater', g: 'des Vaters', zahl: 1, label: 'Vater' },
    pflegeeltern: { n: 'die Pflegeeltern', d: 'den Pflegeeltern', g: 'der Pflegeeltern', zahl: 2, label: 'Pflegeeltern' },
    grosseltern: { n: 'die Großeltern', d: 'den Großeltern', g: 'der Großeltern', zahl: 2, label: 'Großeltern' }
  }
};
DS_TEXTE.de.optionen = {
  auftraggeber: { cni: ['CNI', 'der Nationalen Kommission für Inklusion (CNI)'], eseb: ['ESEB', 'dem ESEB'], schule: ['Schule', 'der Schule'], eltern: ['Eltern', 'den Eltern'] },
  verlauf: { unauffaellig: 'unauffällig', komplikationen: 'mit Komplikationen', unbekannt: 'unbekannt' },
  entwicklung: { altersgerecht: 'altersgerecht', verzoegert: 'verzögert', unbekannt: 'unbekannt' },
  familienstand: { zusammen: 'leben zusammen', getrennt: 'leben getrennt', alleinerziehend: 'alleinerziehend', patchwork: 'Patchworkfamilie', verstorben: 'ein Elternteil verstorben' },
  lebt_bei: { beide: ['bei beiden Eltern', 'lebt bei beiden Eltern'], mutter: ['bei der Mutter', 'lebt bei der Mutter'], vater: ['beim Vater', 'lebt beim Vater'], wechsel: ['im Wechselmodell', 'lebt im Wechselmodell abwechselnd bei beiden Eltern'], grosseltern: ['bei den Großeltern', 'lebt bei den Großeltern'], pflege: ['in einer Pflegefamilie', 'lebt in einer Pflegefamilie'], heim: ['in einer Wohngruppe', 'lebt in einer Wohngruppe'] },
  kontakt: { regelmaessig: 'Zu beiden Eltern besteht regelmäßiger Kontakt.', eingeschraenkt_vater: 'Der Kontakt zum Vater ist eingeschränkt.', eingeschraenkt_mutter: 'Der Kontakt zur Mutter ist eingeschränkt.', kein_vater: 'Zum Vater besteht kein Kontakt.', kein_mutter: 'Zur Mutter besteht kein Kontakt.' },
  position: { aeltestes: 'das älteste Kind', mittleres: 'ein mittleres Kind', juengstes: 'das jüngste Kind' },
  arbeitszeit: { vollzeit: 'in Vollzeit', teilzeit: 'in Teilzeit', nicht: '' },
  setting: { klasse: 'im Klassenverband', kleingruppe: 'in der Kleingruppe', einzel: 'in einer Einzelsituation', pause: 'in der Pause', maison: 'in der Maison Relais', sport: 'im Sportunterricht' },
  abgestimmt: { ja: 'Ja, vollständig abgestimmt', vorbehalte: 'Ja, mit Vorbehalten', nein: 'Nein' },
  stufeAlter: { 1: '0–2 Jahre', 2: '2–5 Jahre', 3: '6–9 Jahre', 4: '10–12 Jahre', 5: '13–16 Jahre' }
};

DS_TEXTE.de.fakten = (function () {
  const O = DS_TEXTE.de.optionen;
  const roem = function (n) { return ['', 'I', 'II', 'III', 'IV', 'V'][n] || String(n); };
  // ELDiB-Beschreibung als Satzteil: "Reagiert auf …" -> "reagiert auf …"
  function praedikat(d) {
    d = String(d || '').trim().replace(/\.$/, '');
    const w = d.split(/\s+/)[0] || '';
    return /^[A-ZÄÖÜ][a-zäöüß]+t,?$/.test(w) ? d.charAt(0).toLowerCase() + d.slice(1) : '';
  }
  return {
    auftrag: function (c, ds, st, h) {
      const f = ds.f || {}, s = [];
      c.neuerAbsatz();
      const wer = (O.auftraggeber[f.auftraggeber || 'cni'] || O.auftraggeber.cni)[1];
      const wer2 = f.auftraggeber === 'andere' && h.frei(ds, 'auftraggeber_andere') ? h.frei(ds, 'auftraggeber_andere') : wer;
      s.push(h.satz(h.fuelle('Das Zentrum für sozio-emotionale Entwicklung (CDSE) wurde{datum: am {datum}} von {wer} beauftragt, eine vertiefende Diagnostik bei {wem} durchzuführen, um {seinen} aktuellen sozio-emotionalen Entwicklungsstand und Förderbedarf festzustellen.', c, { datum: h.datum(f.auftrag_datum, 'de'), wer: wer2, wem: c.vollname || (c.g === 'w' ? 'der Schülerin' : 'dem Schüler') }), c));
      const anl = h.chips(ds, 'anlass').map(function (k) { return h.chipText(c, 'anlass', k); });
      if (h.frei(ds, 'anlass_andere')) { anl.push(h.frei(ds, 'anlass_andere')); }
      if (anl.length) { s.push(h.satz(h.fuelle('Die Beauftragung erfolgte aufgrund von {liste}.', c, { liste: h.liste(anl, c) }), c)); }
      const anl2 = h.chips(ds, 'anliegen').map(function (k) { return h.chipText(c, 'anliegen', k); });
      if (anl2.length) { s.push(h.satz(h.fuelle('Ziel ist es, {liste} einzuleiten.', c, { liste: h.liste(anl2, c) }), c)); }
      const emp = h.chips(ds, 'empfohlen').filter(function (k) { return k !== 'eltern'; }).map(function (k) { return h.chipText(c, 'empfohlen', k); });
      const wunsch = h.chips(ds, 'empfohlen').indexOf('eltern') >= 0;
      if (emp.length && wunsch) { s.push(h.satz(h.fuelle('Die Anfrage erfolgte auf Empfehlung {liste} sowie auf Wunsch der Eltern.', c, { liste: h.liste(emp, c) }), c)); }
      else if (emp.length) { s.push(h.satz(h.fuelle('Die Anfrage erfolgte auf Empfehlung {liste}.', c, { liste: h.liste(emp, c) }), c)); }
      else if (wunsch) { s.push(h.satz('Die Anfrage erfolgte auf Wunsch der Eltern.', c)); }
      const b = [h.block(s.join(' '))];
      return b.concat(h.freiBloecke(ds, 'anlass_details'));
    },

    vorgeschichte: function (c, ds, st, h) {
      const f = ds.f || {}, s = [], b = [];
      c.neuerAbsatz();
      // Schwangerschaft und Geburt
      const sg = f.schwangerschaft, gb = f.geburt;
      if (sg === 'unauffaellig' && gb === 'unauffaellig') { s.push('Schwangerschaft und Geburt verliefen nach Angaben der Eltern unauffällig.'); }
      else {
        if (sg === 'unauffaellig') { s.push('Die Schwangerschaft verlief unauffällig.'); }
        if (sg === 'komplikationen') { s.push(h.satz(h.fuelle('Die Schwangerschaft verlief mit Komplikationen{d: ({d})}.', c, { d: h.frei(ds, 'schwangerschaft_details') }), c)); }
        if (gb === 'unauffaellig') { s.push('Die Geburt verlief unauffällig.'); }
        if (gb === 'komplikationen') { s.push(h.satz(h.fuelle('Bei der Geburt kam es zu Komplikationen{d: ({d})}.', c, { d: h.frei(ds, 'geburt_details') }), c)); }
      }
      // Motorik und Sprache
      const mo = f.motorik, sp = f.sprache;
      const worte = f.erste_worte ? ' (erste Wörter mit etwa ' + f.erste_worte + ' Monaten)' : '';
      if (mo === 'altersgerecht' && sp === 'altersgerecht') { s.push('Motorik und Sprache entwickelten sich altersgerecht' + worte + '.'); }
      else if (mo === 'altersgerecht' && sp === 'verzoegert' && !h.frei(ds, 'sprache_details')) { s.push('Die motorische Entwicklung verlief altersgerecht, die Sprachentwicklung verzögert' + worte + '.'); }
      else if (mo === 'verzoegert' && sp === 'altersgerecht' && !h.frei(ds, 'motorik_details')) { s.push('Die Sprachentwicklung verlief altersgerecht' + worte + ', die motorische Entwicklung verzögert.'); }
      else {
        if (mo === 'altersgerecht') { s.push('Die motorische Entwicklung verlief altersgerecht.'); }
        if (mo === 'verzoegert') { s.push(h.satz(h.fuelle('Die motorische Entwicklung verlief verzögert{d: ({d})}.', c, { d: h.frei(ds, 'motorik_details') }), c)); }
        if (sp === 'altersgerecht') { s.push('Die Sprachentwicklung verlief altersgerecht' + worte + '.'); }
        if (sp === 'verzoegert') { s.push(h.satz(h.fuelle('Die Sprachentwicklung verlief verzögert' + worte + '{d:; {d}}.', c, { d: h.frei(ds, 'sprache_details') }), c)); }
      }
      // Diagnosen
      const dg = h.chips(ds, 'diagnosen').map(function (k) {
        const name = k === 'andere' ? h.frei(ds, 'diagnose_andere') : h.chipText(c, 'diagnosen', k);
        const det = ds.f && ds.f.diagnosen_details && ds.f.diagnosen_details[k];
        return name ? name + (det ? ' (' + det + ')' : '') : '';
      }).filter(Boolean);
      if (dg.length) { s.push(h.satz(h.fuelle('Diagnostiziert {{wurde|wurden}} bisher {liste}.', c, { liste: h.liste(dg, c), zahl: dg.length }), c)); }
      else if (f.keine_diagnosen) { s.push('Bisher liegen keine Diagnosen vor.'); }
      if (s.length) { b.push(h.block(s.join(' '))); }
      const rows = ((ds.tabellen && ds.tabellen.vorgeschichte) || []).filter(function (r) { return r && (r.zeitraum || r.massnahme || r.akteur); });
      if (rows.length) {
        b.push(h.block('Bisherige schulische und außerschulische Unterstützungsmaßnahmen:'));
        b.push({ typ: 'tabelle', id: 'vorgeschichte', kopf: ['Zeitraum', 'Klasse', 'Maßnahme', 'Akteur'], zeilen: rows.map(function (r) { return [r.zeitraum || '', r.klasse || '', r.massnahme || '', r.akteur || '']; }) });
      }
      return b.concat(h.freiBloecke(ds, 'vorgeschichte'));
    },

    sozialbericht: function (c, ds, st, h) {
      const f = ds.f || {}, s = [];
      c.neuerAbsatz();
      const lb = O.lebt_bei[f.lebt_bei];
      const stand = { getrennt: 'Die Eltern von {Name} leben getrennt', zusammen: 'Die Eltern von {Name} leben zusammen', alleinerziehend: f.lebt_bei === 'vater' ? 'Der Vater von {Name} ist alleinerziehend' : 'Die Mutter von {Name} ist alleinerziehend', patchwork: '{Name} wächst in einer Patchworkfamilie auf', verstorben: 'Ein Elternteil von {Name} ist verstorben' }[f.familienstand];
      if (stand && lb && !(f.familienstand === 'zusammen' && f.lebt_bei === 'beide')) { s.push(h.satz(h.fuelle(stand + '; {er} ' + lb[1] + '.', c), c)); }
      else if (stand && f.familienstand === 'zusammen' && f.lebt_bei === 'beide') { s.push(h.satz(h.fuelle('{Name} lebt mit beiden Eltern zusammen.', c), c)); }
      else if (stand) { s.push(h.satz(h.fuelle(stand + '.', c), c)); }
      else if (lb) { s.push(h.satz(h.fuelle('{N} ' + lb[1] + '.', c), c)); }
      if (O.kontakt[f.kontakt]) { s.push(O.kontakt[f.kontakt]); }
      if (h.frei(ds, 'kontakt_details')) { s.push(h.satz(h.frei(ds, 'kontakt_details'), c)); }
      const n = parseInt(f.geschwister_anzahl, 10);
      if (n === 0) { s.push(h.satz(h.fuelle('{N} ist Einzelkind.', c), c)); }
      else if (n > 0) {
        const pos = O.position[f.geschwister_position];
        s.push(h.satz(h.fuelle('{N} hat ' + (n === 1 ? 'ein Geschwisterkind' : n + ' Geschwister') + (pos ? ' und ist ' + pos : '') + '.', c), c));
      }
      const sp = h.chips(ds, 'sprachen').map(function (k) { return k === 'andere' ? h.frei(ds, 'sprache_andere') : h.chipText(c, 'sprachen', k); }).filter(Boolean);
      if (sp.length) { s.push(h.satz(h.fuelle('In der Familie wird {liste} gesprochen.', c, { liste: h.liste(sp, c) }), c)); }
      const beruf = function (wer, b, z) {
        if (z === 'nicht') { return wer + ' ist derzeit nicht berufstätig'; }
        if (!b && !z) { return ''; }
        return wer + ' arbeitet' + (O.arbeitszeit[z] ? ' ' + O.arbeitszeit[z] : '') + (b ? ' als ' + b : '');
      };
      const bm = beruf('die Mutter', h.frei(ds, 'beruf_mutter'), f.zeit_mutter), bv = beruf('der Vater', h.frei(ds, 'beruf_vater'), f.zeit_vater);
      if (bm && bv) { s.push(h.satz(bm + '; ' + bv + '.', c)); } else if (bm || bv) { s.push(h.satz((bm || bv) + '.', c)); }
      const ev = h.chips(ds, 'ereignisse').map(function (k) {
        const det = ds.f && ds.f.ereignis_details && ds.f.ereignis_details[k];
        return h.chipText(c, 'ereignisse', k) + (det ? ' (' + det + ')' : '');
      });
      if (ev.length) { s.push(h.satz(h.fuelle('{{Als belastendes Ereignis wird|Als belastende Ereignisse werden}} {liste} genannt.', c, { liste: h.liste(ev, c), zahl: ev.length }), c)); }
      const bt = h.chips(ds, 'betreuung');
      if (bt.indexOf('maison_relais') >= 0) { s.push(h.satz(h.fuelle('Nach der Schule besucht {N} die Maison Relais.', c), c)); }
      if (bt.indexOf('grosseltern') >= 0) { s.push(h.satz(h.fuelle('Außerhalb der Schule betreuen die Großeltern {Na} regelmäßig.', c), c)); }
      if (bt.indexOf('tagesmutter') >= 0) { s.push(h.satz(h.fuelle('Außerhalb der Schule wird {N} von einer Tagesmutter betreut.', c), c)); }
      if (h.frei(ds, 'freizeit')) { s.push(h.satz(h.frei(ds, 'freizeit'), c)); }
      return (s.length ? [h.block(s.join(' '))] : []).concat(h.freiBloecke(ds, 'familie'));
    },

    aktuell: function (c, ds, st, h) {
      const f = ds.f || {};
      c.neuerAbsatz();
      const klasse = f.klasse || (st && st.klasse) || '', schule = f.schule_name || (st && st.foerderort) || '';
      const s = [];
      if (klasse || schule) {
        const am = /^(Lycée|Lyzeum|Athénée|Institut|Centre|Zentrum)/i.test(schule) ? 'am' : 'an der';
        const tpl = klasse ? 'Derzeit besucht {N} die Klasse {klasse}{schule: {am} {schule}}{lp: bei {lp}}.' : 'Derzeit wird {N} {am} {schule}{lp: bei {lp}} beschult.';
        s.push(h.satz(h.fuelle(tpl, c, { klasse: klasse, schule: schule, am: am, lp: h.frei(ds, 'lehrperson') }), c));
      }
      if (h.frei(ds, 'eseb_referenz')) { s.push(h.satz(h.fuelle('{seine} Referenzperson im ESEB ist {x}.', c, { x: h.frei(ds, 'eseb_referenz') }), c)); }
      const b = (s.length ? [h.block(s.join(' '))] : []).concat(h.freiBloecke(ds, 'aktuell'));   // eigene Ergänzung
      const rows = ((ds.tabellen && ds.tabellen.aktuell) || []).filter(function (r) { return r && (r.zeitraum || r.massnahme || r.akteur); });
      if (rows.length) { b.push({ typ: 'tabelle', id: 'aktuell', kopf: ['Zeitraum', 'Klasse', 'Maßnahme', 'Akteur'], zeilen: rows.map(function (r) { return [r.zeitraum || '', r.klasse || '', r.massnahme || '', r.akteur || '']; }), abschnitt: 'massnahmen' }); }
      return b;
    },

    verfahren: function (c, ds, st, h) {
      c.neuerAbsatz();
      const v = h.chips(ds, 'verfahren').filter(function (k) { return k !== 'andere' && h.chipText(c, 'verfahren', k); }).map(function (k) { return h.chipText(c, 'verfahren', k); });
      if (h.frei(ds, 'verfahren_andere')) { v.push(h.frei(ds, 'verfahren_andere')); }
      if (!v.length) { v.push(h.chipText(c, 'verfahren', 'eldib')); }
      // Beobachtung und Gespräche nur nennen, wenn dazu Angaben vorliegen (sonst nichts erfinden)
      const gespr = [['schule', 'den Lehrpersonen'], ['eltern', 'den Eltern'], ['kind', '{Name}']].filter(function (x) { return h.angaben(x[0]); }).map(function (x) { return x[1]; });
      const teile = ['auf {liste}'];
      if (h.angaben('beobachtung') || h.chips(ds, 'verfahren').indexOf('beobachtung') >= 0) { teile.push('auf Beobachtungen im Unterricht'); }
      if (gespr.length) { teile.push('auf Gesprächen mit ' + h.liste(gespr, c)); } else if (h.chips(ds, 'verfahren').indexOf('gespraeche') >= 0) { teile.push('auf Gesprächen'); }
      const s = [h.satz(h.fuelle('Die vorliegende Einschätzung beruht ' + (teile.length > 1 ? teile.slice(0, -1).join(', ') + ' sowie ' + teile[teile.length - 1] : teile[0]) + '.', c, { liste: h.liste(v, c) }), c)];
      if (h.frei(ds, 'verfahren_ort')) { s.push(h.satz(h.fuelle('Beobachtungen und Gespräche fanden in {ort} statt.', c, { ort: h.frei(ds, 'verfahren_ort') }), c)); }
      return [h.block(s.join(' '))];
    },

    beobachtungIntro: function (c, ds, st, h) {
      const l = ((ds.f && ds.f.beobachtungen) || []).filter(function (b) { return b && (b.datum || b.setting || b.dauer); });
      if (!l.length) { return []; }
      c.neuerAbsatz();
      const T = DS_TEXTE.de.s;
      const teile = l.map(function (b) {
        return h.fuelle(T.beob_eintrag, c, { datum: h.datum(b.datum, 'de'), ort: O.setting[b.setting] || b.setting_andere || '', dauer: b.dauer ? String(b.dauer) : '' }).trim();
      });
      return [h.block(h.satz(h.fuelle(l.length > 1 ? T.beob_mehrere : T.beob_eine, c, { beob: h.liste(teile, c) }), c))];
    },

    eldib: function (c, ds, st, h, profil) {
      const b = [];
      c.neuerAbsatz();
      b.push(h.block('Der ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen) ist ein standardisiertes Einschätzungsinstrument, das dazu dient, die soziale und emotionale Entwicklung von Kindern und Jugendlichen im Alter zwischen Geburt und sechzehn Jahren zu erfassen. Er stellt ein Profil spezifischer Fähigkeiten zur Verfügung, die als Indikatoren der sozialen und emotionalen Förderung dienen.'));
      const bereiche = (profil && profil.bereiche) || [];
      const mitStufe = bereiche.filter(function (x) { return x.stufe > 0; });
      bereiche.forEach(function (x, i) {
        c.neuerAbsatz();
        const s = [];
        const v = { bereich: x.name, code: x.code, stufe: roem(x.stufe), richtziel: x.richtziel, alter: O.stufeAlter[x.stufe] || '' };
        if (!x.stufe) { s.push(h.satz(h.fuelle('Im Bereich {bereich} ({code}) wurden noch keine Items als erreicht eingeschätzt.', c, v), c)); }
        else if (mitStufe.length > 1 && x === mitStufe[0]) { s.push(h.satz(h.fuelle('Am weitesten entwickelt ist bei {Name} der Bereich {bereich} ({code}): Hier befindet {er} sich auf Entwicklungsstufe {stufe} („{richtziel}“, {alter}).', c, v), c)); }
        else if (mitStufe.length > 1 && x === mitStufe[mitStufe.length - 1]) { s.push(h.satz(h.fuelle('Am wenigsten entwickelt ist der Bereich {bereich} ({code}): Hier befindet {N} sich auf Entwicklungsstufe {stufe} („{richtziel}“, {alter}).', c, v), c)); }
        else { s.push(h.satz(h.fuelle('Im Bereich {bereich} ({code}) befindet {N} sich auf Entwicklungsstufe {stufe} („{richtziel}“, {alter}).', c, v), c)); }
        // die zwei zuletzt erreichten Fähigkeiten, mit unterschiedlichem Verb
        const pr = [], verben = {};
        (x.erreicht || []).slice().reverse().forEach(function (it) { const p = praedikat(it.description), v = p.split(' ')[0]; if (p && pr.length < 2 && !verben[v]) { verben[v] = 1; pr.unshift(p); } });
        if (pr.length) { s.push(h.satz(h.fuelle('{N} verfügt hier bereits über gute Fähigkeiten: {^N} {p}.', c, { p: h.liste(pr, c, false, true) }), c)); }
        const extra = ds.frei && ds.frei['eldib_' + x.id];
        if (extra && String(extra).trim()) { s.push(String(extra).trim()); }
        b.push(h.block(s.join(' ')));
        if ((x.ziele || []).length) {
          b.push(h.block(h.satz(h.fuelle('Ausgehend vom Richtziel ergeben sich folgende Lernziele für {Na}:', c), c)));
          b.push({ typ: 'liste', punkte: x.ziele.map(function (z) { return z.code + ' – ' + String(z.description || '').replace(/\.$/, ''); }) });
        } else if (x.stufe) {
          b.push(h.block('In diesem Bereich wurden keine Lernziele festgelegt.'));
        }
      });
      if (profil && profil.lebensalter != null && mitStufe.length) {
        c.neuerAbsatz();
        const erw = profil.erwarteteStufe, unter = mitStufe.filter(function (x) { return x.stufe < erw; });
        const v = { roem: roem(erw), alter: O.stufeAlter[erw] || '', jahre: profil.lebensalter };
        let t;
        if (unter.length === bereiche.length) { t = 'Gemessen am Lebensalter von {jahre} Jahren wäre Entwicklungsstufe {roem} ({alter}) zu erwarten; alle vier Bereiche liegen darunter.'; }
        else if (unter.length === 1) { t = 'Gemessen am Lebensalter von {jahre} Jahren wäre Entwicklungsstufe {roem} ({alter}) zu erwarten; darunter liegt der Bereich {liste}.'; v.liste = unter[0].name; }
        else if (unter.length) { t = 'Gemessen am Lebensalter von {jahre} Jahren wäre Entwicklungsstufe {roem} ({alter}) zu erwarten; darunter liegen die Bereiche {liste}.'; v.liste = h.liste(unter.map(function (x) { return x.name; }), c); }
        else { t = 'Alle eingeschätzten Bereiche entsprechen mindestens der altersentsprechenden Entwicklungsstufe {roem} ({alter}).'; }
        b.push(h.block(h.satz(h.fuelle(t, c, v), c)));
      }
      return b;
    },

    schluss: function (c, ds, st, h) {
      const f = ds.f || {};
      c.neuerAbsatz();
      const mitKind = c.alter != null && c.alter >= 12;
      const wer = mitKind ? '{Name} sowie den Eltern' : 'den Eltern';
      let t;
      if (f.abgestimmt === 'vorbehalte') {
        t = 'Auf Grundlage der vorliegenden Testergebnisse, Beobachtungen und anamnestischen Informationen wurden spezifische Förderbedarfe identifiziert. In Gesprächen mit ' + wer + ' konnten Empfehlungen zur weiteren Unterstützung der individuellen Entwicklung erarbeitet werden. Dabei wurden einzelne vorgeschlagene Maßnahmen ' + (mitKind ? 'von den Eltern bzw. von {Name}' : 'von den Eltern') + ' kritisch hinterfragt bzw. nicht vollständig befürwortet.';
      } else if (f.abgestimmt === 'nein') {
        t = 'Auf Grundlage der vorliegenden Testergebnisse, Beobachtungen und anamnestischen Informationen wurden spezifische Förderbedarfe identifiziert und Empfehlungen formuliert. Eine Abstimmung dieser Empfehlungen mit ' + wer + ' war bislang nicht möglich.';
      } else if (f.abgestimmt === 'ja') {
        t = 'Auf Basis der erhobenen Testergebnisse, Beobachtungen und anamnestischen Informationen wurden in enger Abstimmung mit ' + wer + ' gezielte Förderbedarfe identifiziert. Daraus abgeleitet wurden gemeinsam Empfehlungen formuliert, die die individuelle Entwicklung wirksam unterstützen sollen.';
      } else {
        // keine Angabe zur Abstimmung: keine Abstimmung behaupten
        t = 'Auf Basis der erhobenen Testergebnisse, Beobachtungen und anamnestischen Informationen wurden gezielte Förderbedarfe identifiziert. Daraus abgeleitet wurden Empfehlungen formuliert, die die individuelle Entwicklung wirksam unterstützen sollen.';
      }
      return [h.block(h.satz(h.fuelle(t, c), c))].concat(h.freiBloecke(ds, 'vorbehalte'));
    },

    ziele: function (c, ds, st, h, profil) {
      const f = ds.f || {}, b = [];
      c.neuerAbsatz();
      const ziele = [];
      ((profil && profil.bereiche) || []).forEach(function (x) { (x.ziele || []).forEach(function (z) { ziele.push({ z: z, x: x }); }); });
      const bis = f.ziele_bis ? 'bis zum ' + h.datum(f.ziele_bis, 'de') : 'bis zum Ende des nächsten ' + ((st && st.periodenTyp) === 'semester' ? 'Semesters' : 'Trimesters');
      if (ziele.length) {
        b.push(h.block(h.satz(h.fuelle('Die folgenden Förderziele leiten sich aus den ELDiB-Lernzielen ab. Sie beschreiben den jeweils nächsten Entwicklungsschritt; ihre Umsetzung wird {bis} im Alltag beobachtet und in der nächsten ELDiB-Einschätzung überprüft.', c, { bis: bis }), c)));
        b.push({ typ: 'liste', punkte: ziele.map(function (e) {
          c.neuerAbsatz();
          const p = praedikat(e.z.description);
          const text = p ? h.satz(h.fuelle('{Name} ' + p, c), c) : String(e.z.description || '').replace(/\.$/, '');
          return text + ' (' + e.z.code + ')';
        }) });
      }
      const zus = h.frei(ds, 'ziele_zusatz');
      if (zus) { b.push({ typ: 'liste', punkte: zus.split(/\n+/).map(function (l) { return l.replace(/^[-•*]\s*/, '').trim(); }).filter(Boolean) }); }
      return b;
    },

    empfehlungen: function (c, ds, st, h) {
      const b = [];
      c.neuerAbsatz();
      [['empf_familie', 'Familiärer Kontext', 'empfehlung_familie'], ['empf_schule', 'Schulischer Kontext (lokal)', 'empfehlung_schule'], ['empf_region', 'Regionaler Kontext (ESEB / CDSE)', 'empfehlung_region']].forEach(function (g) {
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
        b.push(h.block(m.length > 1 ? 'Das CDSE empfiehlt der Nationalen Kommission für Inklusion (CNI) folgende Maßnahmen:' : 'Das CDSE empfiehlt der Nationalen Kommission für Inklusion (CNI) folgende Maßnahme:'));
        b.push({ typ: 'liste', punkte: m });
      }
      return b.concat(h.freiBloecke(ds, 'cni_begruendung'));
    }
  };
})();
