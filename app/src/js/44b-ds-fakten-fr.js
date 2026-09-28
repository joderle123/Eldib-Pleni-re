// =====================================================================
// DS-Baukasten: französische Faktenabschnitte (Demande, Antécédents, Bilan social,
// Situation actuelle, Procédure diagnostique, ELDiB, Conclusion, Objectifs,
// Recommandations, CNI) – Formulierungen nach der Vorlage der CNI (12.11.2025)
// h = Hilfsfunktionen aus DsText (fuelle, satz, liste, chips, …)
// Datumsangaben immer mit h.datum(…, 'fr'); Apostroph im Berichtstext: gerade (').
// =====================================================================
DS_TEXTE.fr.s.das_kind = "l'élève";
// Vorschau ohne Motor-Nachbearbeitung: Leerzeichen in « » selbst setzen, np ist bereits elidiert
DS_TEXTE.fr.s.vorschau_ohne = 'Figurera dans le rapport sous la forme « aucun signe {liste} ».';
// n = Subjekt, d = nach Präposition (avec, pour, par, sur), g = mit "de" zusammengezogen (du père)
DS_TEXTE.fr.quellen = {
  schule: {
    lehrperson: { n: "l'enseignant·e", d: "l'enseignant·e", label: 'Enseignant·e' },
    lehrerin: { n: 'la titulaire de classe', d: 'la titulaire de classe', label: 'Titulaire de classe (enseignante)' },
    lehrer: { n: 'le titulaire de classe', d: 'le titulaire de classe', label: 'Titulaire de classe (enseignant)' },
    team: { n: "l'équipe pédagogique", d: "l'équipe pédagogique", label: 'Équipe pédagogique' },
    eseb: { n: "un membre de l'ESEB", d: "un membre de l'ESEB", label: 'Professionnel·le de l’ESEB' }
  },
  eltern: {
    eltern: { n: 'les parents', d: 'les parents', g: 'des parents', zahl: 2, label: 'Les deux parents' },
    mutter: { n: 'la mère', d: 'la mère', g: 'de la mère', zahl: 1, label: 'Mère' },
    vater: { n: 'le père', d: 'le père', g: 'du père', zahl: 1, label: 'Père' },
    pflegeeltern: { n: "les parents d'accueil", d: "les parents d'accueil", g: "des parents d'accueil", zahl: 2, label: 'Parents d’accueil' },
    grosseltern: { n: 'les grands-parents', d: 'les grands-parents', g: 'des grands-parents', zahl: 2, label: 'Grands-parents' }
  }
};
// Werte erscheinen auch als Beschriftung in der Oberfläche (Auswahllisten)
DS_TEXTE.fr.optionen = {
  auftraggeber: { cni: ['CNI', "la Commission nationale d'inclusion (CNI)"], eseb: ['ESEB', "l'équipe de soutien des élèves à besoins éducatifs particuliers ou spécifiques (ESEB)"], schule: ['École', "l'école"], eltern: ['Parents', 'les parents'] },
  verlauf: { unauffaellig: 'sans particularité', komplikationen: 'avec complications', unbekannt: 'inconnu' },
  entwicklung: { altersgerecht: "conforme à l'âge", verzoegert: 'retardé', unbekannt: 'inconnu' },
  familienstand: { zusammen: 'vivent ensemble', getrennt: 'séparés', alleinerziehend: 'famille monoparentale', patchwork: 'famille recomposée', verstorben: 'un parent décédé' },
  lebt_bei: { beide: ['chez les deux parents', 'vit chez ses deux parents'], mutter: ['chez la mère', 'vit chez sa mère'], vater: ['chez le père', 'vit chez son père'], wechsel: ['en garde alternée', 'vit en garde alternée chez ses deux parents'], grosseltern: ['chez les grands-parents', 'vit chez ses grands-parents'], pflege: ["en famille d'accueil", "vit dans une famille d'accueil"], heim: ['en foyer', "vit dans un foyer d'accueil"] },
  kontakt: { regelmaessig: 'Les contacts avec les deux parents sont réguliers.', eingeschraenkt_vater: 'Les contacts avec le père sont limités.', eingeschraenkt_mutter: 'Les contacts avec la mère sont limités.', kein_vater: "Aucun contact n'est entretenu avec le père.", kein_mutter: "Aucun contact n'est entretenu avec la mère." },
  position: { aeltestes: "l'aîné(e)", mittleres: 'un enfant du milieu', juengstes: 'le ou la plus jeune' },
  arbeitszeit: { vollzeit: 'à temps plein', teilzeit: 'à temps partiel', nicht: '' },
  setting: { klasse: 'en classe', kleingruppe: 'en petit groupe', einzel: 'en situation individuelle', pause: 'pendant la récréation', maison: 'à la maison relais', sport: "pendant le cours d'éducation physique" },
  abgestimmt: { ja: 'Oui, entièrement concertées', vorbehalte: 'Oui, avec des réserves', nein: 'Non' },
  stufeAlter: { 1: '0–2 ans', 2: '2–5 ans', 3: '6–9 ans', 4: '10–12 ans', 5: '13–16 ans' }
};

DS_TEXTE.fr.fakten = (function () {
  const O = DS_TEXTE.fr.optionen;
  const roem = function (n) { return ['', 'I', 'II', 'III', 'IV', 'V'][n] || String(n); };
  // Satz aufräumen wie DsText.satz(), aber mit korrekter Elision: franz() prüft die Wortgrenze
  // mit \b, und \b kennt in JS keine Akzente – aus "lui-même et", "Hélène a", "contrôle excessif"
  // würde sonst "lui-mêm'et", "Hélèn'a", "contrôl'excessif". Sobald franz() im Motor korrigiert ist,
  // kann S() wieder durch S() ersetzt werden.
  const BUCHST = 'A-Za-zÀ-ÖØ-öø-ÿŒœ';
  const ELISION = new RegExp('(^|[^' + BUCHST + "'’])(de|que|ne|se|le|la|je|me|te|lorsque|puisque|jusque) (?=[aeiouyhàâéèêëîïôûùœAEIOUYHÀÂÉÈÊËÎÏÔÛ])", 'g');
  const SI_IL = new RegExp('(^|[^' + BUCHST + '])si (?=ils?(?![' + BUCHST + ']))', 'g');
  function S(s) {
    // Satz aufräumen: dieselbe Regel wie im Motor (Elision, Leerzeichen, Apostroph ’)
    return DsText.satz(s, { lang: 'fr' });
  }
  const zahlwort = function (n) { return ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze'][n] || String(n); };
  // Stellung in der Geschwisterreihe (nach "dont il/elle est …")
  const POSITION = { aeltestes: "[[l'aîné|l'aînée]]", mittleres: "[[l'un des enfants du milieu|l'une des enfants du milieu]]", juengstes: '[[le plus jeune|la plus jeune]]' };

  // Schule mit passender Präposition: "à l'École …", "au Lycée …"
  function beiSchule(name) {
    const n = String(name || '').trim();
    if (!n) { return ''; }
    if (/^(Lycée|Lycee|Lyzeum|Centre|Collège|College|Campus|Conservatoire|Lënster)/i.test(n)) { return 'au ' + n; }
    if (/^(Maison|Classe|Section)/i.test(n)) { return 'à la ' + n; }
    if (/^[AEIOUYÀÂÉÈÊËÎÏÔÛ]/i.test(n)) { return "à l'" + n; }
    if (/(Lycée|Lycee|Lyzeum)/i.test(n)) { return 'au ' + n; }
    return "à l'école " + n;
  }

  // ELDiB-Beschreibungen ("Montre …", "Réagit …", "S'engage …") -> Satzteil nach dem Subjekt.
  // Mädchen: männliche Formen der Itemtexte angleichen (qu'il, lui-même, conscient …).
  function angleichen(s, c) {
    s = String(s || '');
    // bekannte Unebenheit im Itemtext (V-16)
    s = s.replace(/^Montre d'être conscient/, 'Se montre conscient');
    if (c.g !== 'w') { return s; }
    // (\b funktioniert in JS nicht neben à/é – deshalb (^|\s) bzw. Leerzeichen)
    return s.replace(/\bqu'il\b/g, "qu'elle").replace(/\blui-même\b/g, 'elle-même').replace(/\bautour de lui\b/g, "autour d'elle")
      .replace(/\bvers lui\b/g, 'vers elle').replace(/(^|\s)à lui\b/g, '$1à elle').replace(/\bconscient\b/g, 'consciente')
      .replace(/\bseul\b/g, 'seule').replace(/\bleader ou participant\b/g, 'leader ou participante')
      .replace(/(^|[\s'’])étudiant et citoyen\b/g, '$1étudiante et citoyenne');
  }
  // gerade Anführungszeichen im Itemtext ('Je', 'Donne-moi...') -> « … »
  function zitate(s) { return String(s || '').replace(/(^|\s)'([^']+)'(?=[\s.,;:!?]|$)/g, '$1« $2 »').replace(/\.\.\./g, '…'); }
  // Satzanfänge, die kein Verb sind ("Au moins 50 mots", "L'enfant …")
  const KEIN_VERB = /^(?:(?:Le|La|Les|Un|Une|Des|Du|De|Au|Aux|À|En|Dans|Par|Pour|Avec|Sans|Ce|Cette|Son|Sa|Ses)(?=\s)|L')/;
  // erster Satz als Prädikat: "Reconnaît les sentiments des autres." -> "reconnaît les sentiments des autres"
  function praedikat(d, c) {
    const teile = zitate(angleichen(String(d || '').trim(), c)).split(/\.\s+(?=[A-ZÀ-ÖØ-Ý])/);
    const erster = (teile[0] || '').replace(/\.$/, '').trim();
    if (!erster || KEIN_VERB.test(erster) || !/^[A-ZÀ-ÖØ-Ý]/.test(erster)) { return ''; }
    return erster.charAt(0).toLowerCase() + erster.slice(1);
  }
  // ganzer Itemtext als Prädikat (für die Ziele): weitere Sätze werden angehängt
  function praedikatVoll(d, c) {
    const teile = zitate(angleichen(String(d || '').trim(), c)).replace(/\.$/, '').split(/\.\s+(?=[A-ZÀ-ÖØ-Ý])/);
    const p = praedikat(teile[0], c);
    if (!p) { return ''; }
    const il = c.g === 'w' ? 'elle' : (c.g === 'm' ? 'il' : 'il/elle');
    return teile.slice(1).reduce(function (acc, t) {
      t = t.replace(/\.$/, '').trim();
      if (!t) { return acc; }
      if (/^L'enfant\s/.test(t)) { return acc + ' ; ' + il + ' ' + t.replace(/^L'enfant\s/, ''); }
      if (KEIN_VERB.test(t)) { return acc + ', ' + t.charAt(0).toLowerCase() + t.slice(1); }
      return acc + ' ; ' + il + ' ' + t.charAt(0).toLowerCase() + t.slice(1);
    }, p);
  }
  // Itemtext für die Lernziel-Liste (ohne Subjekt, mit Großbuchstaben am Anfang)
  function itemText(d, c) { return zitate(angleichen(String(d || '').trim(), c)).replace(/\.$/, ''); }

  return {
    auftrag: function (c, ds, st, h) {
      const f = ds.f || {}, s = [];
      c.neuerAbsatz();
      const wer = (O.auftraggeber[f.auftraggeber || 'cni'] || O.auftraggeber.cni)[1];
      const wer2 = f.auftraggeber === 'andere' && h.frei(ds, 'auftraggeber_andere') ? h.frei(ds, 'auftraggeber_andere') : wer;
      const wen = c.vollname ? "l'élève " + c.vollname : "l'élève";
      s.push(S(h.fuelle("Le Centre pour le développement socio-émotionnel (CDSE) a été mandaté{datum: en date du {datum}} par {wer} pour réaliser un diagnostic spécialisé de {wen}, afin de déterminer son état actuel de développement socio-émotionnel ainsi que ses besoins éducatifs particuliers.", c, { datum: h.datum(f.auftrag_datum, 'fr'), wer: wer2, wen: wen }), c));
      const anl = h.chips(ds, 'anlass').map(function (k) { return h.chipText(c, 'anlass', k); });
      if (h.frei(ds, 'anlass_andere')) { anl.push(h.frei(ds, 'anlass_andere')); }
      const anl2 = h.chips(ds, 'anliegen').map(function (k) { return h.chipText(c, 'anliegen', k); });
      if (anl.length) { s.push(S(h.fuelle('La demande fait suite à {liste}.', c, { liste: h.liste(anl, c) }), c)); }
      if (anl2.length) { s.push(S(h.fuelle((anl.length ? 'Elle' : 'La demande') + ' a pour objectif {liste}.', c, { liste: h.liste(anl2, c) }), c)); }
      const emp = h.chips(ds, 'empfohlen').filter(function (k) { return k !== 'eltern'; }).map(function (k) { return h.chipText(c, 'empfohlen', k); });
      const wunsch = h.chips(ds, 'empfohlen').indexOf('eltern') >= 0;
      if (emp.length && wunsch) { s.push(S(h.fuelle('Cette demande a été formulée sur recommandation {liste}, en accord avec le souhait des parents.', c, { liste: h.liste(emp, c) }), c)); }
      else if (emp.length) { s.push(S(h.fuelle('Cette demande a été formulée sur recommandation {liste}.', c, { liste: h.liste(emp, c) }), c)); }
      else if (wunsch) { s.push(S('Cette demande émane des parents.', c)); }
      const b = [h.block(s.join(' '))];
      return b.concat(h.freiBloecke(ds, 'anlass_details'));
    },

    vorgeschichte: function (c, ds, st, h) {
      const f = ds.f || {}, s = [], b = [];
      c.neuerAbsatz();
      // Grossesse et accouchement
      const sg = f.schwangerschaft, gb = f.geburt;
      if (sg === 'unauffaellig' && gb === 'unauffaellig') { s.push(S("Selon les parents, la grossesse et l'accouchement se sont déroulés sans particularité.", c)); }
      else {
        if (sg === 'unauffaellig') { s.push(S("La grossesse s'est déroulée sans particularité.", c)); }
        if (sg === 'komplikationen') { s.push(S(h.fuelle('La grossesse a été marquée par des complications{d: ({d})}.', c, { d: h.frei(ds, 'schwangerschaft_details') }), c)); }
        if (gb === 'unauffaellig') { s.push(S("L'accouchement s'est déroulé sans particularité.", c)); }
        if (gb === 'komplikationen') { s.push(S(h.fuelle("L'accouchement a donné lieu à des complications{d: ({d})}.", c, { d: h.frei(ds, 'geburt_details') }), c)); }
      }
      // Développement moteur et langagier
      const mo = f.motorik, sp = f.sprache;
      const worte = f.erste_worte ? ' (premiers mots vers ' + f.erste_worte + ' mois)' : '';
      if (mo === 'altersgerecht' && sp === 'altersgerecht') { s.push(S("Le développement moteur et le développement du langage ont été conformes à l'âge" + worte + '.', c)); }
      else if (mo === 'altersgerecht' && sp === 'verzoegert' && !h.frei(ds, 'sprache_details')) { s.push(S("Le développement moteur a été conforme à l'âge, tandis que le développement du langage a été retardé" + worte + '.', c)); }
      else if (mo === 'verzoegert' && sp === 'altersgerecht' && !h.frei(ds, 'motorik_details')) { s.push(S("Le développement du langage a été conforme à l'âge" + worte + ', tandis que le développement moteur a été retardé.', c)); }
      else {
        if (mo === 'altersgerecht') { s.push(S("Le développement moteur a été conforme à l'âge.", c)); }
        if (mo === 'verzoegert') { s.push(S(h.fuelle('Le développement moteur a été retardé{d: ({d})}.', c, { d: h.frei(ds, 'motorik_details') }), c)); }
        if (sp === 'altersgerecht') { s.push(S("Le développement du langage a été conforme à l'âge" + worte + '.', c)); }
        if (sp === 'verzoegert') { s.push(S(h.fuelle('Le développement du langage a été retardé' + worte + '{d:; {d}}.', c, { d: h.frei(ds, 'sprache_details') }), c)); }
      }
      // Diagnostics
      const dg = h.chips(ds, 'diagnosen').map(function (k) {
        const name = k === 'andere' ? h.frei(ds, 'diagnose_andere') : h.chipText(c, 'diagnosen', k);
        const det = ds.f && ds.f.diagnosen_details && ds.f.diagnosen_details[k];
        return name ? name + (det ? ' (' + det + ')' : '') : '';
      }).filter(Boolean);
      if (dg.length) { s.push(S(h.fuelle('{{Le diagnostic suivant a été posé|Les diagnostics suivants ont été posés}} à ce jour : {liste}.', c, { liste: h.liste(dg, c), zahl: dg.length }), c)); }
      else if (f.keine_diagnosen) { s.push(S("Aucun diagnostic n'a été posé à ce jour.", c)); }
      if (s.length) { b.push(h.block(s.join(' '))); }
      const rows = ((ds.tabellen && ds.tabellen.vorgeschichte) || []).filter(function (r) { return r && (r.zeitraum || r.massnahme || r.akteur); });
      if (rows.length) {
        b.push(h.block('Mesures de soutien scolaires et extrascolaires antérieures :'));
        b.push({ typ: 'tabelle', id: 'vorgeschichte', kopf: ['Période', 'Classe', 'Intervention', 'Acteur·ice'], zeilen: rows.map(function (r) { return [r.zeitraum || '', r.klasse || '', r.massnahme || '', r.akteur || '']; }) });
      }
      return b.concat(h.freiBloecke(ds, 'vorgeschichte'));
    },

    sozialbericht: function (c, ds, st, h) {
      const f = ds.f || {}, s = [];
      c.neuerAbsatz();
      const lb = O.lebt_bei[f.lebt_bei];
      const stand = { getrennt: 'Les parents de {Name} sont séparés', zusammen: 'Les parents de {Name} vivent ensemble', alleinerziehend: '{Name} grandit dans une famille monoparentale', patchwork: '{Name} grandit dans une famille recomposée', verstorben: "L'un des parents de {Name} est décédé" }[f.familienstand];
      if (stand && lb && !(f.familienstand === 'zusammen' && f.lebt_bei === 'beide')) { s.push(S(h.fuelle(stand + ' ; {il} ' + lb[1] + '.', c), c)); }
      else if (stand && f.familienstand === 'zusammen' && f.lebt_bei === 'beide') { s.push(S(h.fuelle('{Name} vit avec ses deux parents.', c), c)); }
      else if (stand) { s.push(S(h.fuelle(stand + '.', c), c)); }
      else if (lb) { s.push(S(h.fuelle('{N} ' + lb[1] + '.', c), c)); }
      if (O.kontakt[f.kontakt]) { s.push(S(O.kontakt[f.kontakt], c)); }
      if (h.frei(ds, 'kontakt_details')) { s.push(S(h.frei(ds, 'kontakt_details'), c)); }
      const n = parseInt(f.geschwister_anzahl, 10);
      if (n === 0) { s.push(S(h.fuelle('{N} est enfant unique.', c), c)); }
      else if (n > 0) {
        const pos = POSITION[f.geschwister_position];
        s.push(S(h.fuelle("{N} fait partie d'une fratrie de " + zahlwort(n + 1) + ' enfants' + (pos ? ', dont {il} est ' + pos : '') + '.', c), c));
      }
      const sp = h.chips(ds, 'sprachen').map(function (k) { return k === 'andere' ? h.frei(ds, 'sprache_andere') : h.chipText(c, 'sprachen', k); }).filter(Boolean);
      if (sp.length) { s.push(S(h.fuelle('À la maison, la famille parle {liste}.', c, { liste: h.liste(sp, c) }), c)); }
      const beruf = function (wer, b, z) {
        if (z === 'nicht') { return wer + " n'exerce actuellement pas d'activité professionnelle"; }
        if (!b && !z) { return ''; }
        return wer + ' travaille' + (O.arbeitszeit[z] ? ' ' + O.arbeitszeit[z] : '') + (b ? ' en tant que ' + b : '');
      };
      const bm = beruf('la mère', h.frei(ds, 'beruf_mutter'), f.zeit_mutter), bv = beruf('le père', h.frei(ds, 'beruf_vater'), f.zeit_vater);
      if (bm && bv) { s.push(S(bm + ' ; ' + bv + '.', c)); } else if (bm || bv) { s.push(S((bm || bv) + '.', c)); }
      const ev = h.chips(ds, 'ereignisse').map(function (k) {
        const det = ds.f && ds.f.ereignis_details && ds.f.ereignis_details[k];
        return h.chipText(c, 'ereignisse', k) + (det ? ' (' + det + ')' : '');
      });
      if (ev.length) { s.push(S(h.fuelle("{{L'événement marquant suivant est mentionné|Les événements marquants suivants sont mentionnés}} : {liste}.", c, { liste: h.liste(ev, c), zahl: ev.length }), c)); }
      const bt = h.chips(ds, 'betreuung');
      if (bt.indexOf('maison_relais') >= 0) { s.push(S(h.fuelle("Après l'école, {N} fréquente la maison relais.", c), c)); }
      if (bt.indexOf('grosseltern') >= 0) { s.push(S(h.fuelle("En dehors de l'école, {N} est régulièrement [[gardé|gardée]] par ses grands-parents.", c), c)); }
      if (bt.indexOf('tagesmutter') >= 0) { s.push(S(h.fuelle(bt.indexOf('grosseltern') >= 0 ? '{N} est par ailleurs [[accueilli|accueillie]] chez une assistante parentale.' : "En dehors de l'école, {N} est [[accueilli|accueillie]] chez une assistante parentale.", c), c)); }
      if (h.frei(ds, 'freizeit')) { s.push(S(h.frei(ds, 'freizeit'), c)); }
      return (s.length ? [h.block(s.join(' '))] : []).concat(h.freiBloecke(ds, 'familie'));
    },

    aktuell: function (c, ds, st, h) {
      const f = ds.f || {};
      c.neuerAbsatz();
      const klasse = f.klasse || (st && st.klasse) || '', schule = f.schule_name || (st && st.foerderort) || '';
      const s = [];
      if (klasse || schule) {
        s.push(S(h.fuelle('{N} est actuellement [[scolarisé|scolarisée]]{klasse: dans la classe {klasse}}{schule: {schule}}{lp:, sous la responsabilité de {lp}}.', c,
          { klasse: klasse, schule: beiSchule(schule), lp: h.frei(ds, 'lehrperson') }), c));
      }
      if (h.frei(ds, 'eseb_referenz')) {
        s.push(S(h.fuelle(s.length ? "Sa personne de référence au sein de l'ESEB est {x}." : "La personne de référence de {Name} au sein de l'ESEB est {x}.", c, { x: h.frei(ds, 'eseb_referenz') }), c));
      }
      const b = (s.length ? [h.block(s.join(' '))] : []).concat(h.freiBloecke(ds, 'aktuell'));   // eigene Ergänzung
      const rows = ((ds.tabellen && ds.tabellen.aktuell) || []).filter(function (r) { return r && (r.zeitraum || r.massnahme || r.akteur); });
      if (rows.length) { b.push({ typ: 'tabelle', id: 'aktuell', kopf: ['Période', 'Classe', 'Intervention', 'Acteur·ice'], zeilen: rows.map(function (r) { return [r.zeitraum || '', r.klasse || '', r.massnahme || '', r.akteur || '']; }), abschnitt: 'massnahmen' }); }
      return b;
    },

    verfahren: function (c, ds, st, h) {
      c.neuerAbsatz();
      const v = h.chips(ds, 'verfahren').filter(function (k) { return k !== 'andere' && h.chipText(c, 'verfahren', k); }).map(function (k) { return h.chipText(c, 'verfahren', k); });
      if (h.frei(ds, 'verfahren_andere')) { v.push(h.frei(ds, 'verfahren_andere')); }
      if (!v.length) { v.push(h.chipText(c, 'verfahren', 'eldib')); }
      const eltern = /^(pflegeeltern|grosseltern)$/.test((ds.f || {}).eltern_quelle || '') && c.q ? c.q.d : 'les parents';
      // Beobachtung und Gespräche nur nennen, wenn dazu Angaben vorliegen (sonst nichts erfinden)
      const gespr = [['schule', "l'équipe enseignante"], ['eltern', eltern], ['kind', '{Name}']].filter(function (x) { return h.angaben(x[0]); }).map(function (x) { return x[1]; });
      const teile = ['sur {liste}'];
      if (h.angaben('beobachtung') || h.chips(ds, 'verfahren').indexOf('beobachtung') >= 0) { teile.push('sur des observations en classe'); }
      if (gespr.length) { teile.push('sur des entretiens avec ' + h.liste(gespr, c)); } else if (h.chips(ds, 'verfahren').indexOf('gespraeche') >= 0) { teile.push('sur des entretiens'); }
      const s = [S(h.fuelle('Cette évaluation repose ' + (teile.length > 1 ? teile.slice(0, -1).join(', ') + ' ainsi que ' + teile[teile.length - 1] : teile[0]) + '.', c, { liste: h.liste(v, c) }), c)];
      if (h.frei(ds, 'verfahren_ort')) { s.push(S(h.fuelle('Lieu des observations et des entretiens : {ort}.', c, { ort: h.frei(ds, 'verfahren_ort') }), c)); }
      return [h.block(s.join(' '))];
    },

    beobachtungIntro: function (c, ds, st, h) {
      const l = ((ds.f && ds.f.beobachtungen) || []).filter(function (b) { return b && (b.datum || b.setting || b.dauer); });
      if (!l.length) { return []; }
      c.neuerAbsatz();
      const T = DS_TEXTE.fr.s;
      const teile = l.map(function (b) {
        return h.fuelle(T.beob_eintrag, c, { datum: h.datum(b.datum, 'fr'), ort: O.setting[b.setting] || b.setting_andere || '', dauer: b.dauer ? String(b.dauer) : '' }).trim();
      });
      return [h.block(S(h.fuelle(l.length > 1 ? T.beob_mehrere : T.beob_eine, c, { beob: h.liste(teile, c) }), c))];
    },

    eldib: function (c, ds, st, h, profil) {
      const b = [];
      c.neuerAbsatz();
      b.push(h.block("L'ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen) est un instrument d'évaluation standardisé conçu pour mesurer le développement social et émotionnel des enfants et des adolescents à partir de la naissance jusqu'à l'âge de seize ans. Il fournit un profil de compétences spécifiques servant d'indicateurs du niveau des compétences sociales et émotionnelles."));
      const bereiche = (profil && profil.bereiche) || [];
      const mitStufe = bereiche.filter(function (x) { return x.stufe > 0; });
      const niveau = '{stufe} (« {richtziel} », {alter})';
      bereiche.forEach(function (x) {
        c.neuerAbsatz();
        const s = [];
        const v = { bereich: x.name, code: x.code, stufe: roem(x.stufe), richtziel: x.richtziel, alter: O.stufeAlter[x.stufe] || '' };
        if (!x.stufe) { s.push(S(h.fuelle("Dans le domaine {bereich} ({code}), aucun item n'a encore été évalué comme acquis.", c, v), c)); }
        else if (mitStufe.length > 1 && x === mitStufe[0]) { s.push(S(h.fuelle('Les compétences les plus développées chez {Name} sont celles du domaine {bereich} ({code}), où {il} se situe au niveau de développement ' + niveau + '.', c, v), c)); }
        else if (mitStufe.length > 1 && x === mitStufe[mitStufe.length - 1]) { s.push(S(h.fuelle('Les compétences les moins développées chez {Name} sont celles du domaine {bereich} ({code}), où {il} se situe au niveau de développement ' + niveau + '.', c, v), c)); }
        else { s.push(S(h.fuelle('Dans le domaine {bereich} ({code}), {N} se situe au niveau de développement ' + niveau + '.', c, v), c)); }
        // die zwei zuletzt erreichten Fähigkeiten, mit unterschiedlichem Verb
        const pr = [], verben = {};
        (x.erreicht || []).slice().reverse().forEach(function (it) { const p = praedikat(it.description, c), w = p.split(' ')[0]; if (p && pr.length < 2 && !verben[w]) { verben[w] = 1; pr.unshift(p); } });
        // zwei Beispiele; enthält ein Itemtext schon "et", werden sie mit "; de plus," verbunden
        const pText = pr.length > 1 && pr.some(function (x) { return / et /.test(x); }) ? pr[0] + ' ; de plus, {il} ' + pr[1] : h.liste(pr, c, false, true);
        if (pr.length) { s.push(S(h.fuelle(h.fuelle('{N} dispose déjà de bons acquis dans ce domaine : {il} ', c) + pText + '.', c), c)); }
        const extra = ds.frei && ds.frei['eldib_' + x.id];
        if (extra && String(extra).trim()) { s.push(String(extra).trim()); }
        b.push(h.block(s.join(' ')));
        if ((x.ziele || []).length) {
          b.push(h.block(S(h.fuelle("En partant de l'objectif général, les objectifs d'apprentissage suivants ont été définis pour {Nt} :", c), c)));
          b.push({ typ: 'liste', punkte: x.ziele.map(function (z) { return S(z.code + ' – ' + itemText(z.description, c), c); }) });
        } else if (x.stufe) {
          b.push(h.block("Aucun objectif d'apprentissage n'a été défini dans ce domaine."));
        }
      });
      if (profil && profil.lebensalter != null && mitStufe.length) {
        c.neuerAbsatz();
        const erw = profil.erwarteteStufe, unter = mitStufe.filter(function (x) { return x.stufe < erw; });
        const v = { roem: roem(erw), alter: O.stufeAlter[erw] || '', jahre: profil.lebensalter };
        const erwartet = "Au regard de l'âge de {Name} ({jahre} ans), le niveau de développement {roem} ({alter}) serait attendu ; ";
        let t;
        if (unter.length === bereiche.length) { t = erwartet + 'les quatre domaines se situent en dessous de ce niveau.'; }
        else if (unter.length === 1) { t = erwartet + 'seul le domaine {liste} se situe en dessous de ce niveau.'; v.liste = unter[0].name; }
        else if (unter.length) { t = erwartet + 'les domaines {liste} se situent en dessous de ce niveau.'; v.liste = h.liste(unter.map(function (x) { return x.name; }), c); }
        else { t = "Tous les domaines évalués atteignent au moins le niveau de développement attendu à l'âge de {Name} ({roem}, {alter})."; }
        b.push(h.block(S(h.fuelle(t, c, v), c)));
      }
      return b;
    },

    schluss: function (c, ds, st, h) {
      const f = ds.f || {};
      c.neuerAbsatz();
      // ab etwa 12 Jahren wird das Kind in die Abstimmung einbezogen (Vorlage der CNI)
      const mitKind = c.alter != null && c.alter >= 12;
      // Pflegeeltern/Großeltern statt "les parents" (Vorlage: parents/tuteur·ice·s)
      const eltern = /^(pflegeeltern|grosseltern)$/.test(f.eltern_quelle || '') && c.q ? c.q.d : 'les parents';
      let t;
      if (f.abgestimmt === 'vorbehalte') {
        t = "Sur la base des résultats des tests disponibles, des observations et des données anamnestiques, des besoins spécifiques de soutien ont été identifiés. Lors des entretiens avec " + (mitKind ? '{Name} et ' + eltern : eltern) + ', des recommandations visant à soutenir davantage le développement individuel ont pu être élaborées. Certaines mesures proposées ont toutefois été remises en question ou n\'ont pas été entièrement approuvées par ' + (mitKind ? eltern + ' ou par {Name}' : eltern) + '.';
      } else if (f.abgestimmt === 'nein') {
        t = "Sur la base des résultats des tests disponibles, des observations et des données anamnestiques, des besoins spécifiques de soutien ont été identifiés et des recommandations ont été formulées. Une concertation sur ces recommandations avec " + (mitKind ? '{Name} et ' + eltern : eltern) + " n'a pas encore pu avoir lieu.";
      } else if (f.abgestimmt === 'ja') {
        t = "Sur la base des résultats des tests, des observations et des informations anamnestiques recueillies, des besoins spécifiques de soutien ont pu être identifiés en étroite concertation avec " + (mitKind ? "{Name} ainsi qu'avec " + eltern : eltern) + '. Par la suite, des recommandations ont été formulées conjointement, dans le but de soutenir efficacement le développement individuel.';
      } else {
        // keine Angabe zur Abstimmung: keine Abstimmung behaupten
        t = 'Sur la base des résultats des tests, des observations et des informations anamnestiques recueillies, des besoins spécifiques de soutien ont pu être identifiés. Par la suite, des recommandations ont été formulées dans le but de soutenir efficacement le développement individuel.';
      }
      return [h.block(S(h.fuelle(t, c), c))].concat(h.freiBloecke(ds, 'vorbehalte'));
    },

    ziele: function (c, ds, st, h, profil) {
      const f = ds.f || {}, b = [];
      c.neuerAbsatz();
      const ziele = [];
      ((profil && profil.bereiche) || []).forEach(function (x) { (x.ziele || []).forEach(function (z) { ziele.push({ z: z, x: x }); }); });
      const bis = f.ziele_bis ? "jusqu'au " + h.datum(f.ziele_bis, 'fr') : "jusqu'à la fin du prochain " + ((st && st.periodenTyp) === 'semester' ? 'semestre' : 'trimestre');
      if (ziele.length) {
        b.push(h.block(S(h.fuelle("Les objectifs de soutien suivants découlent des objectifs d'apprentissage de l'ELDiB. Ils décrivent à chaque fois la prochaine étape de développement ; leur mise en œuvre sera observée au quotidien {bis} et vérifiée lors de la prochaine évaluation ELDiB.", c, { bis: bis }), c)));
        b.push({ typ: 'liste', punkte: ziele.map(function (e) {
          c.neuerAbsatz();
          const p = praedikatVoll(e.z.description, c);
          const text = p ? S(h.fuelle('{Name} ' + p, c), c) : S(itemText(e.z.description, c), c);
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
      [['empf_familie', 'Contexte familial', 'empfehlung_familie'], ['empf_schule', 'Contexte scolaire (local)', 'empfehlung_schule'], ['empf_region', 'Contexte régional (ESEB / CDSE)', 'empfehlung_region']].forEach(function (g) {
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
        b.push(h.block(m.length > 1 ? "Le CDSE recommande à la Commission nationale d'inclusion (CNI) les mesures suivantes :" : "Le CDSE recommande à la Commission nationale d'inclusion (CNI) la mesure suivante :"));
        b.push({ typ: 'liste', punkte: m });
      }
      return b.concat(h.freiBloecke(ds, 'cni_begruendung'));
    }
  };
})();
