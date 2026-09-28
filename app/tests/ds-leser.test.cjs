// DS-Leser (46b-ds-leser.js, im Hub über apps/ds-motor.js): Rundlauf und Freitext.
// Nur erfundene Kinder und Namen.
//   node app/tests/ds-leser.test.cjs            Rundlauf DE+FR (je 30 Datensätze), mit OCR-Rauschen, Freitext
//   node app/tests/ds-leser.test.cjs --anzahl 5  schneller; --start 500 andere Zufallsdaten; --laut alle Hinweise
// 1. Rundlauf: zufällige DS-Daten -> Word-Datei wie im Generator (DsWord.erstellen, darin DsAssistent.fertig)
//    -> Text -> DS_LESER.lesen -> Vergleich: Bewertungen (Band und genauer Wert), Auswahlfelder, Fakten,
//    Freitexte, Tabellen; der Bericht aus den gelesenen Daten muss derselbe sein. Dazu dasselbe mit OCR-Rauschen
//    und mit schon getrennten Abschnitten (opt.abschnitte).
// 2. Freitext: von Hand geschriebene (erfundene) Absätze -> sinnvolle Vorschläge mit Beleg und sicher < 0.7;
//    Gegenprobe mit anderen Formulierungen (Verneinung, Gegenteil-Wörter, Englisch): richtige Richtung, nichts Fremdes;
//    Kalibrierung der Schwelle (leicht geänderte Vorlagensätze gegen neutrale Sätze).
// 3. anwenden: Auswahl übernehmen, Bestehendes bleibt. Generator und ds-motor.js lesen gleich; keine Netzanfragen.
'use strict';
const H = require('./hilfen.cjs');
const arg = process.argv.indexOf('--anzahl');
const ANZAHL = arg > 0 ? +process.argv[arg + 1] : 30;
const argStart = process.argv.indexOf('--start');
const START = argStart > 0 ? +process.argv[argStart + 1] : 0;   // andere Zufallsdaten: --start 500
const LAUT = process.argv.includes('--laut');

function klon(o) { return JSON.parse(JSON.stringify(o)); }
function blockText(b) { return b.text != null ? b.text : (b.punkte ? b.punkte.join(' | ') : (b.zeilen ? b.zeilen.map(z => z.join(' / ')).join(' | ') : (b.typ || ''))); }
function berichtTexte(M, lang, ds, stamm, profil) {
  const ab = M.DsText.bericht(lang, ds, stamm, profil), aus = {};
  Object.keys(ab).forEach(k => { aus[k] = (ab[k] || []).map(blockText).join('\n'); });
  return aus;
}
function gleicheBerichte(a, b) { return Object.keys(a).every(k => a[k] === b[k]); }

async function rundlauf(M, page, lang, mitRauschen) {
  const st = { datensaetze: 0, bewertet: 0, sichtbar: 0, genau: 0, band: 0, fehlt: 0, falsch: 0, erfunden: 0, vorschlaege: 0, abschnitte: 0, abschnitteGleich: 0,
    tabellen: 0, tabellenGleich: 0, herkunft: {}, fehlerListe: [], hinweise: [] };
  for (let i = 0; i < ANZAHL; i++) {
    const seed = (lang === 'de' ? 1000 : 2000) + START + i;
    const d = H.zufallsDs(M, seed, lang);
    const r = await page.evaluate(async ([d, lang]) => {
      Object.keys(d.stamm).forEach(k => { const el = document.getElementById(k); if (el) { el.value = d.stamm[k]; } });
      state.selections = d.selections;
      DsAssistent.laden(d.ds);
      const blob = await DsWord.erstellen(lang);
      const buf = new Uint8Array(await blob.arrayBuffer());
      let s = '';
      for (let k = 0; k < buf.length; k += 0x8000) { s += String.fromCharCode.apply(null, buf.subarray(k, k + 0x8000)); }
      return { b64: btoa(s), stamm: getStammdaten(), profil: dsEldibProfil(lang), ds: JSON.parse(JSON.stringify(DsAssistent.get())) };
    }, [d, lang]);
    let text = await H.docxText(Buffer.from(r.b64, 'base64'));
    if (mitRauschen) { text = H.rauschen(text, seed * 7 + 3); }
    const erg = M.DS_LESER.lesen(text, {});
    st.datensaetze++;
    // schon getrennte Abschnitte (opt.abschnitte, wie aus dem Word-Leser des Hubs): dieselben Bewertungen
    if (i === 0) {
      const ab = {};
      Object.keys(erg.abschnitte).forEach(id => { if (id !== 'deckblatt' && id !== 'unbekannt') { ab[id] = erg.abschnitte[id].text; } });
      const erg2 = M.DS_LESER.lesen('', { sprache: lang, abschnitte: ab, name: erg.name, geschlecht: erg.geschlecht });
      const w = e => JSON.stringify(Object.keys(e.bewertungen).sort().map(id => id + '=' + e.bewertungen[id].wert));
      st.abschnitteGetrennt = w(erg) === w(erg2);
    }
    st.herkunft[erg.herkunft] = (st.herkunft[erg.herkunft] || 0) + 1;
    const quelle = r.ds, stamm = r.stamm, profil = r.profil;
    const original = berichtTexte(M, lang, quelle, stamm, profil);
    // Bewertungen: sichtbar = der Bericht ändert sich ohne sie; Band = gleicher Bericht mit dem gelesenen Wert
    Object.keys(quelle.bewertungen).forEach(id => {
      const w = quelle.bewertungen[id];
      if (!(w >= 1 && w <= 7)) { return; }
      st.bewertet++;
      const ohne = klon(quelle); delete ohne.bewertungen[id];
      const sichtbar = !gleicheBerichte(original, berichtTexte(M, lang, ohne, stamm, profil));
      const g0 = erg.bewertungen[id], g = g0 && g0.sicher >= 0.7 ? g0 : null;
      if (!sichtbar) { if (g) { st.erfunden++; st.fehlerListe.push(lang + '#' + i + ' unsichtbar gelesen: ' + id + '=' + g.wert); } return; }
      st.sichtbar++;
      if (!g) { st.fehlt++; st.fehlerListe.push(lang + '#' + i + ' fehlt: ' + id + '=' + w + (g0 ? ' (nur Vorschlag ' + g0.wert + ', ' + g0.sicher + ')' : '')); return; }
      if (g.wert === w) { st.genau++; }
      const mit = klon(quelle); mit.bewertungen[id] = g.wert;
      const gleichesBand = (g.band || []).indexOf(w) >= 0;
      if (gleichesBand) { st.band++; } else { st.falsch++; st.fehlerListe.push(lang + '#' + i + ' falsches Band: ' + id + ' ' + w + ' -> ' + g.wert + ' (' + g.beleg.slice(0, 80) + ')'); }
      // richtiges Band, aber nicht der genaue Wert (im Text nicht zu unterscheiden): nur ein Hinweis
      if (gleichesBand && !gleicheBerichte(original, berichtTexte(M, lang, mit, stamm, profil))) { st.hinweise.push(lang + '#' + i + ' Band stimmt, Wortlaut nicht: ' + id + ' ' + w + ' -> ' + g.wert); }
    });
    Object.keys(erg.bewertungen).forEach(id => {
      const g = erg.bewertungen[id];
      if (quelle.bewertungen[id]) { return; }
      if (g.sicher >= 0.7) { st.erfunden++; st.fehlerListe.push(lang + '#' + i + ' erfunden: ' + id + '=' + g.wert + ' (' + g.beleg.slice(0, 80) + ')'); }
      else { st.vorschlaege++; if (LAUT) { st.fehlerListe.push(lang + '#' + i + ' Vorschlag: ' + id + '=' + g.wert + ' ' + g.sicher + ' (' + g.beleg.slice(0, 80) + ')'); } }
    });
    // alles übernehmen (sicher >= 0.7, Freitexte, Tabellen) und den Bericht neu schreiben
    const neu = M.DS_LESER.anwenden(null, erg);
    const wieder = berichtTexte(M, lang, neu, stamm, profil);
    // mit Rauschen stehen die Freitexte ohne Umlautpunkte usw. im Bericht: dann in der Vergleichsform vergleichen
    const form = s => mitRauschen ? M.DS_LESER._intern.skelett(s, lang).k : s;
    Object.keys(original).forEach(k => {
      st.abschnitte++;
      if (form(original[k]) === form(wieder[k])) { st.abschnitteGleich++; }
      else { st.fehlerListe.push(lang + '#' + i + ' Abschnitt ' + k + ':\n      vorher  ' + original[k].slice(0, 400).replace(/\n/g, ' ¶ ') + '\n      nachher ' + wieder[k].slice(0, 400).replace(/\n/g, ' ¶ ')); }
    });
    // Tabellen
    ['vorgeschichte', 'aktuell', 'interventionen'].forEach(t => {
      st.tabellen++;
      // 6.1 steht in Word nach Art der Intervention geordnet: Reihenfolge egal
      const zeilen = l => l.filter(z => Object.values(z).some(Boolean)).map(z => form(JSON.stringify(z))).sort();
      const a = JSON.stringify(zeilen(quelle.tabellen[t] || [])), b = JSON.stringify(zeilen(neu.tabellen[t] || []));
      if (a === b) { st.tabellenGleich++; } else { st.fehlerListe.push(lang + '#' + i + ' Tabelle ' + t + ': ' + a + ' -> ' + b); }
    });
  }
  return st;
}

function freitextTest(M) {
  // von Hand geschrieben, erfunden; je Abschnitt zwei Absätze (DE) bzw. einer (FR)
  const TEXTE = {
    de: `Spezialisierte Diagnostik

3.2 Sichtweise der Schule
Laut der Klassenlehrerin fällt es Max schwer, sich länger als wenige Minuten auf eine Aufgabe zu konzentrieren; er lässt sich von jedem Geräusch ablenken. Im Rechnen zeigt er gute Ansätze.
Bei Streit auf dem Schulhof reagiert er oft mit Wutausbrüchen und schlägt manchmal zu. Er hält sich meistens an die Regeln der Klasse, wenn die Lehrerin in der Nähe ist.

3.3 Sichtweise des Schülers
Max erzählt, dass er gerne Fußball spielt und in der Pause oft mit zwei Freunden zusammen ist. Er sagt, er fühle sich in der Klasse wohl.
Er möchte bessere Noten in Mathematik und wünscht sich, dass weniger gestritten wird. Über seine Schwierigkeiten spricht er offen.

3.4 Sichtweise der Eltern / Erziehungsberechtigten
Die Mutter berichtet, dass es zu Hause fast täglich Streit um die Hausaufgaben gibt. Abends kann Max schlecht einschlafen und klagt häufig über Bauchschmerzen.
Die Familie hat feste Abläufe am Morgen. Die Mutter wünscht sich Unterstützung und ist zur Zusammenarbeit bereit.

4.1 Verhaltensbeobachtungen
Während der Beobachtung am 12.03.2026 stand Max immer wieder von seinem Platz auf und rief in die Klasse. Mit der Aufgabe begann er erst nach mehreren Aufforderungen.
In der Gruppenarbeit suchte er Kontakt zu den Mitschülern und half einem Mitschüler beim Ausschneiden. Auf Lob der Lehrerin reagierte er sichtlich erfreut.

4.3 Interpretation
Die Schwierigkeiten zeigen sich vor allem in unstrukturierten Situationen wie Pausen und beim Wechsel zwischen den Stunden. In der Einzelsituation gelingt ihm deutlich mehr.
Es liegt nahe, dass eine eingeschränkte Emotionsregulation eine Rolle spielt.

5.1 Spezifische Bedürfnisse des Schülers
Max braucht vor allem klare Strukturen und einen vorhersehbaren Tagesablauf. Er profitiert von Erfolgserlebnissen.
Hilfreich wäre auch eine feste Bezugsperson in der Schule.`,
    fr: `Diagnostic spécialisé

3.2 Point de vue de l’école
Selon l’enseignante, Léa a beaucoup de mal à se concentrer et se laisse distraire par le moindre bruit. Elle réagit souvent par des crises de colère lorsqu’on lui pose une limite.

3.3 Point de vue de l’élève
Léa raconte qu’elle aime dessiner et qu’elle a deux bonnes amies dans la classe. Elle souhaite avoir de meilleures notes.

3.4 Point de vue des parents / tuteurs
La mère explique que les devoirs provoquent presque tous les jours des disputes à la maison. Léa se plaint souvent de maux de ventre le matin.

4.1 Observations comportementales
Pendant l’observation, Léa s’est levée plusieurs fois de sa place et a interpellé ses camarades. Elle a suivi les consignes de l’enseignante dans la plupart des cas.

5.1 Besoins spécifiques de l’élève
Léa a surtout besoin de structures claires et d’une personne de référence stable.`
  };
  // erwartet: Aussage -> erlaubte Bänder (grob); verboten: was absurd wäre
  const ERWARTET = {
    de: { s_konz: [1, 2, 3], s_wut: [5, 6, 7], s_regeln: [5, 6, 7], k_wohl: [5, 6, 7], k_freunde: [4, 5, 6, 7], e_hausaufgaben: [5, 6, 7], e_koerper: [5, 6, 7], e_struktur: [5, 6, 7], e_kooperation: [5, 6, 7],
      b_unruhe: [5, 6, 7], b_start: [1, 2, 3], b_peers: [5, 6, 7], b_lob: [5, 6, 7], i_unstrukturiert: [5, 6, 7], i_einzel: [5, 6, 7], i_hyp_regulation: [4, 5, 6, 7], n_struktur: [6, 7], n_erfolg: [4, 5, 6, 7], n_beziehung: [4, 5, 6, 7] },
    fr: { s_konz: [1, 2, 3], s_wut: [5, 6, 7], k_freunde: [4, 5, 6, 7], e_hausaufgaben: [5, 6, 7], e_koerper: [5, 6, 7], b_unruhe: [5, 6, 7], b_anweisung: [5, 6, 7], n_struktur: [6, 7], n_beziehung: [6, 7] }
  };
  const ABSURD = ['s_selbstwert', 'k_ungerecht', 'e_medien', 'i_hyp_trauma', 'i_angst_identitaet', 'n_therapie', 's_ausgeglichen', 'k_druck'];
  let gut = 0, gesamt = 0;
  const ergebnis = {};
  ['de', 'fr'].forEach(lang => {
    const erg = M.DS_LESER.lesen(TEXTE[lang], {});
    ergebnis[lang] = erg;
    const b = erg.bewertungen, E = ERWARTET[lang];
    H.ok(erg.sprache === lang, lang + ': Sprache erkannt (' + erg.sprache + ')');
    H.ok(erg.herkunft === 'frei', lang + ': Herkunft "frei" (' + erg.herkunft + ')');
    const alle = Object.keys(b);
    H.ok(alle.every(id => b[id].sicher < 0.7), lang + ': alle Vorschläge aus Freitext mit sicher < 0.7');
    H.ok(alle.every(id => b[id].beleg && TEXTE[lang].replace(/\s+/g, ' ').indexOf(b[id].beleg.replace(/\s+/g, ' ')) >= 0), lang + ': jeder Vorschlag mit Beleg aus dem Text');
    const absurd = alle.filter(id => ABSURD.indexOf(id) >= 0 || (E[id] && E[id].indexOf(b[id].wert) < 0));
    H.ok(!absurd.length, lang + ': nichts Absurdes vorgeschlagen' + (absurd.length ? ' – ' + absurd.map(id => id + '=' + b[id].wert).join(', ') : ''));
    Object.keys(E).forEach(id => { gesamt++; if (b[id] && E[id].indexOf(b[id].wert) >= 0) { gut++; } });
    alle.forEach(id => { if (!E[id]) { console.log('     zusätzlich: ' + lang + ' ' + id + '=' + b[id].wert + ' (' + b[id].sicher + ') „' + b[id].beleg.slice(0, 90) + '“'); } });
    const frei = Object.keys(erg.frei);
    H.ok(['schule', 'kind', 'eltern', 'beobachtung', 'beduerfnisse'].every(k => frei.indexOf(k) >= 0), lang + ': Absätze bleiben als Freitext erhalten (' + frei.join(', ') + ')');
  });
  console.log('     Freitext: ' + gut + ' von ' + gesamt + ' erwarteten Vorschlägen gefunden');
  H.ok(gut >= Math.ceil(gesamt * 0.6), 'Freitext: mindestens 60 % der erwarteten Vorschläge');
  gegenprobe(M);
  return ergebnis;
}
// Gegenprobe mit anderen Formulierungen (auch Verneinung, Gegenteil-Wörter, Englisch): richtige Richtung
function gegenprobe(M) {
  const TEXTE = {
    de: `3.2 Sichtweise der Schule
Die Lehrerin beschreibt Tim als hilfsbereiten Jungen, der in Mathematik zu den Besten der Klasse gehört. Er arbeitet sehr ordentlich und bringt sein Material immer mit. Im Unterricht meldet er sich kaum und wirkt oft abwesend. Mit Kritik kann er nur schwer umgehen; dann weint er oder verlässt den Raum. Körperliche Auseinandersetzungen gibt es keine.

3.3 Sichtweise des Schülers
Tim sagt, dass er in der Schule keine Freunde hat und in der Pause meistens alleine ist. Die Lehrerin findet er nett. Er hat Angst, dass die anderen ihn auslachen.

3.4 Sichtweise der Eltern / Erziehungsberechtigten
Der Vater erzählt, Tim spiele nach der Schule stundenlang am Tablet. Beim Essen gibt es selten Streit. Tim schläft gut und hat keine körperlichen Beschwerden. Die Familie ist im letzten Sommer umgezogen.

4.1 Verhaltensbeobachtungen
Tim arbeitete die ganze Stunde konzentriert an seinem Arbeitsblatt. Mit den anderen Kindern sprach er nicht.

4.3 Interpretation
Möglicherweise spielt eine soziale Unsicherheit eine Rolle.

5.1 Spezifische Bedürfnisse des Schülers
Tim benötigt dringend Unterstützung beim Aufbau von Freundschaften. Außerdem wäre eine Psychotherapie sinnvoll.`,
    fr: `3.2 Point de vue de l’école
Selon le titulaire, Noé participe avec enthousiasme aux activités mais oublie souvent ses affaires. Il respecte rarement les règles de la classe et se dispute fréquemment avec ses camarades.

3.3 Point de vue de l’élève
Noé dit qu’il aime venir à l’école et qu’il s’entend bien avec son enseignante. Il ne parle pas volontiers de ses difficultés.

3.4 Point de vue des parents / tuteurs
Noé fait régulièrement des crises de colère à la maison. Les parents se sentent épuisés. La grand-mère habite à proximité.

4.1 Observations comportementales
Noé a commencé la tâche sans hésiter et a demandé de l’aide quand il en avait besoin. Il ne s’est jamais levé de sa place.`,
    en: `3.2 School's view
According to the class teacher, Mia rarely participates in lessons and is easily distracted. She gets on well with peers.

3.3 Student's view
Mia says she does not like school and often feels sad.

4.1 Behavioural observations
Mia started the task only after several prompts. She followed the teacher's instructions most of the time.`
  };
  const hoch = [5, 6, 7], tief = [1, 2, 3];
  const ERWARTET = {
    de: { s_leistung: hoch, s_sorgfalt: hoch, s_motiv: tief, s_frust: tief, s_konflikt: tief, k_freunde: tief, k_lehrer: hoch, k_angst: [4, 5, 6, 7], e_medien: hoch, e_koerper: tief, b_konz: hoch, i_hyp_sozial: [4, 5, 6, 7], n_sozial: [6, 7], n_therapie: [4, 5, 6, 7] },
    fr: { s_motiv: hoch, s_regeln: tief, s_konflikt: hoch, s_sorgfalt: tief, k_wohl: hoch, k_lehrer: hoch, k_offen: tief, e_wut: hoch, e_belastung: hoch, b_start: hoch, b_hilfe: hoch, b_unruhe: [1, 2] },
    en: { s_motiv: tief, s_konz: tief, s_peers: hoch, k_wohl: tief, k_druck: hoch, b_start: tief, b_anweisung: hoch }
  };
  let gut = 0, gesamt = 0;
  ['de', 'fr', 'en'].forEach(lang => {
    const b = M.DS_LESER.lesen(TEXTE[lang], {}).bewertungen, E = ERWARTET[lang];
    const falsch = Object.keys(b).filter(id => E[id] && E[id].indexOf(b[id].wert) < 0);
    // ohne Erwartung: nur, was ein Mensch dort auch lesen könnte (keine Aussage zur Familie aus einem Umzug usw.)
    const fremd = Object.keys(b).filter(id => !E[id]);
    H.ok(!falsch.length && !fremd.length, 'Gegenprobe ' + lang + ': Richtung stimmt, nichts Fremdes' + (falsch.concat(fremd).length ? ' – ' + falsch.concat(fremd).map(id => id + '=' + b[id].wert).join(', ') : ''));
    Object.keys(E).forEach(id => { gesamt++; if (b[id] && E[id].indexOf(b[id].wert) >= 0) { gut++; } });
  });
  console.log('     Gegenprobe: ' + gut + ' von ' + gesamt + ' erwarteten Vorschlägen gefunden');
  H.ok(gut >= Math.ceil(gesamt * 0.7), 'Gegenprobe: mindestens 70 % der erwarteten Vorschläge');
}

// Schwelle der Vorschläge: leicht geänderte Vorlagensätze (ein Wort fehlt) sollen die richtige Aussage
// treffen, neutrale Sätze (Freitexte des Rundlaufs) gar keine
function kalibrierung(M) {
  const r = H.zufall(99), pos = [], neg = [];
  ['de', 'fr'].forEach(lang => {
    const L = M.DS_LESER._intern.sprachDaten(lang), T = M.DS_TEXTE[lang], name = lang === 'de' ? 'Max' : 'Léa', pron = lang === 'de' ? 'er' : 'il';
    Object.keys(M.DS_AUFBAU).forEach(b => M.DS_AUFBAU[b].themen.forEach(th => th.aussagen.forEach(a => {
      ((T.a[a[0]] || {}).t || []).forEach(tpl => {
        if (!tpl) { return; }
        const w = tpl.replace(/\[\[([^|\]]*)\|[^\]]*\]\]/g, '$1').replace(/\{\{([^|}]*)\|[^}]*\}\}/g, '$1').replace(/\{KONTRAST\}/g, '')
          .replace(/\{(N|Name|Nd|Nt|Na)\}/g, name).replace(/\{[^}]*\}/g, pron).replace(/\s+/g, ' ').split(' ');
        if (w.length > 5) { w.splice(r.ganz(1, w.length - 2), 1); }
        const v = M.DS_LESER._intern.freiVorschlaege(w.join(' '), [b], L, new Set(), { max: 1 });
        pos.push(v.length ? (v[0].id === a[0] ? 'richtig' : 'andere') : 'keiner');
      });
    })));
    H.FREI[lang].forEach(s => { neg.push(M.DS_LESER._intern.freiVorschlaege(s, null, L, new Set()).length); });
  });
  const n = k => pos.filter(x => x === k).length;
  console.log('     Kalibrierung: ' + pos.length + ' leicht geänderte Vorlagensätze – richtige Aussage ' + n('richtig') + ' (' + (100 * n('richtig') / pos.length).toFixed(1) + ' %), andere ' + n('andere') +
    ', kein Vorschlag ' + n('keiner') + '; ' + neg.length + ' neutrale Sätze mit Vorschlag: ' + neg.filter(Boolean).length);
  H.ok(n('richtig') >= 0.8 * pos.length && n('andere') <= 0.03 * pos.length && !neg.some(Boolean), 'Kalibrierung: ≥ 80 % richtig, ≤ 3 % andere Aussage, neutrale Sätze ohne Vorschlag');
}

// anwenden: übernommene Teile ersetzen bzw. ergänzen, nicht übernommene bestehende Werte bleiben
function anwendenTest(M) {
  const L = M.DS_LESER;
  const erg = { geschlecht: 'w',
    bewertungen: { s_konz: { wert: 2, sicher: 0.97, band: [1, 2] }, s_wut: { wert: 5, sicher: 0.5, band: [5] } },
    chips: { s_staerken: [{ key: 'sport', sicher: 0.97 }, { key: 'kunst', sicher: 0.5 }] },
    f: { klasse: { wert: 'C3.1', sicher: 0.9 }, beobachtungen: { wert: [{ datum: '2026-03-12', setting: 'pause' }, { datum: '2026-03-19', setting: 'klasse', dauer: '45' }], sicher: 0.97 } },
    frei: { schule: 'Neuer Absatz.' },
    tabellen: { vorgeschichte: [{ zeitraum: '2024', klasse: 'C2.1', massnahme: 'Logopädie', akteur: 'CPI' }, { zeitraum: '2025', klasse: 'C2.2', massnahme: 'I-EBS', akteur: 'ESEB' }], aktuell: [], interventionen: [] } };
  const alt = { v: 2, geschlecht: '', bewertungen: { s_konz: 4, e_wut: 3 }, chips: { s_staerken: ['musik'] }, f: { klasse: 'C2.1', beobachtungen: [{ datum: '2026-03-12', setting: 'pause' }] },
    frei: { schule: 'Alter Absatz.' }, tabellen: { vorgeschichte: [{ zeitraum: '2024', klasse: 'C2.1', massnahme: 'Logopädie', akteur: 'CPI' }], aktuell: [], interventionen: [] }, bearbeitet: { schule: true } };
  const vorher = klon(alt);
  const n = L.anwenden(alt, erg);
  H.ok(n.bewertungen.s_konz === 2 && n.bewertungen.e_wut === 3 && !('s_wut' in n.bewertungen), 'anwenden: sichere Bewertung übernommen, bestehende bleibt, Vorschlag nicht');
  H.ok(klon(n.chips.s_staerken).join() === 'musik,sport', 'anwenden: Auswahl ergänzt (ohne Vorschlag)');
  H.ok(n.f.klasse === 'C3.1' && n.f.beobachtungen.length === 2, 'anwenden: Fakten ersetzt, Beobachtungen ohne Doppelte ergänzt');
  H.ok(n.frei.schule === 'Alter Absatz.\n\nNeuer Absatz.', 'anwenden: Freitext angehängt');
  H.ok(n.tabellen.vorgeschichte.length === 2, 'anwenden: Tabellenzeilen ohne Doppelte ergänzt');
  H.ok(n.bearbeitet.schule === true && n.geschlecht === 'w' && n.v === 2, 'anwenden: bearbeitet bleibt, Geschlecht gesetzt');
  H.ok(JSON.stringify(alt) === JSON.stringify(vorher), 'anwenden: die bestehenden Daten selbst bleiben unverändert');
  const alles = L.anwenden(alt, erg, true);
  H.ok(alles.bewertungen.s_wut === 5 && alles.chips.s_staerken.indexOf('kunst') >= 0, 'anwenden(…, true): auch Vorschläge');
  const nur = L.anwenden(alt, erg, { bewertungen: ['s_wut'], chips: false, f: false, frei: false, tabellen: false, geschlecht: false });
  H.ok(nur.bewertungen.s_wut === 5 && nur.bewertungen.s_konz === 4 && klon(nur.chips.s_staerken).join() === 'musik' && nur.frei.schule === 'Alter Absatz.' && nur.geschlecht === '', 'anwenden: nur ausgewählte Teile');
  const eigen = L.anwenden(alt, erg, { bewertungen: { s_konz: 1 } });
  H.ok(eigen.bewertungen.s_konz === 1, 'anwenden: selbst gewählter Wert');
}

(async () => {
  const M = H.motorLaden();
  anwendenTest(M);
  console.log('DS_LESER Version ' + M.DS_LESER.version);
  const { browser, page, blockiert, fehler } = await H.generatorStarten();
  await H.schuelerOeffnen(page, { id: 'sch-test', name: 'Beispiel, Noah', klasse: 'C3.1', geburtsdatum: '2015-03-14', einschaetzung1: null, einschaetzung2: null });
  const zusammen = {};
  for (const lang of ['de', 'fr']) {
    for (const rauschen of [false, true]) {
      const t0 = Date.now();
      const st = await rundlauf(M, page, lang, rauschen);
      const name = lang.toUpperCase() + (rauschen ? ' mit OCR-Rauschen' : '');
      zusammen[name] = st;
      const pz = (a, b) => b ? (100 * a / b).toFixed(1) + ' %' : '–';
      console.log('\n== ' + name + ' (' + st.datensaetze + ' Datensätze, ' + ((Date.now() - t0) / 1000).toFixed(1) + ' s)');
      console.log('   Bewertungen: ' + st.bewertet + ' vergeben, ' + st.sichtbar + ' im Text sichtbar; richtiges Band ' + st.band + ' (' + pz(st.band, st.sichtbar) + '), genauer Wert ' + st.genau + ' (' + pz(st.genau, st.sichtbar) + '), fehlt ' + st.fehlt + ', falsches Band ' + st.falsch + ', erfunden ' + st.erfunden + ', Vorschläge < 0.7: ' + st.vorschlaege);
      console.log('   Bericht aus den gelesenen Daten: ' + st.abschnitteGleich + ' von ' + st.abschnitte + ' Abschnitten gleich (' + pz(st.abschnitteGleich, st.abschnitte) + '); Tabellen ' + st.tabellenGleich + '/' + st.tabellen + '; Herkunft ' + JSON.stringify(st.herkunft));
      st.fehlerListe.slice(0, LAUT ? 400 : 25).forEach(f => console.log('   · ' + f));
      if (st.fehlerListe.length > 25 && !LAUT) { console.log('   … ' + (st.fehlerListe.length - 25) + ' weitere (--laut)'); }
      console.log('   Hinweis: ' + st.hinweise.length + ' Bewertungen im richtigen Band mit anderem genauem Wert, der allein eingesetzt die Reihenfolge im Bericht ändert' + (LAUT ? ':' : ' (--laut)'));
      if (LAUT) { st.hinweise.forEach(f => console.log('   · ' + f)); }
      H.ok(st.band === st.sichtbar, name + ': alle sichtbaren Bewertungen im richtigen Band');
      H.ok(st.erfunden === 0, name + ': keine Aussage erfunden');
      H.ok(st.abschnitteGleich / st.abschnitte >= (rauschen ? 0.97 : 0.99), name + ': Bericht aus den gelesenen Daten gleich (' + pz(st.abschnitteGleich, st.abschnitte) + ')');
      H.ok(st.tabellenGleich / st.tabellen >= (rauschen ? 0.95 : 1), name + ': Tabellen');
      H.ok(st.herkunft.generator === st.datensaetze, name + ': als Generator-Bericht erkannt');
      H.ok(st.abschnitteGetrennt === true, name + ': schon getrennte Abschnitte (opt.abschnitte) ergeben dieselben Bewertungen');
    }
  }
  console.log('\n== Freitext');
  freitextTest(M);
  kalibrierung(M);
  // Generator: DS_LESER ist auch in der HTML-Datei und liest gleich (Tafeln aus 47-ds-assistent.js statt DS_BERICHT_TAFELN)
  const d = H.zufallsDs(M, 4242, 'de');
  const vergleich = await page.evaluate(async d => {
    Object.keys(d.stamm).forEach(k => { const el = document.getElementById(k); if (el) { el.value = d.stamm[k]; } });
    state.selections = d.selections; DsAssistent.laden(d.ds);
    const b = DsAssistent.fertig('de');
    const text = b.abschnitte.map(a => (a.nr + ' ' + a.titel) + '\n' + a.bloecke.map(x => x.text || (x.punkte || []).join('\n') || (x.zeilen || []).map(z => z.join('\t')).join('\n')).join('\n')).join('\n');
    return { text, erg: DS_LESER.lesen(text, {}), tafeln: JSON.stringify(DS_LESER._intern.tafeln()) };
  }, d);
  const imMotor = M.DS_LESER.lesen(vergleich.text, {});
  H.ok(JSON.stringify(imMotor) === JSON.stringify(vergleich.erg), 'Generator und ds-motor.js lesen gleich');
  H.ok(vergleich.tafeln === JSON.stringify(M.DS_BERICHT_TAFELN), 'DS_BERICHT_TAFELN (ds-motor.js) = Tafeln aus 47-ds-assistent.js');
  H.ok(blockiert.length === 0, 'keine Netzanfragen (' + blockiert.length + ')');
  H.ok(fehler.length === 0, 'keine Fehler im Generator ' + JSON.stringify(fehler));
  await browser.close();
  console.log('\n' + (H.fehler() ? H.fehler() + ' Prüfung(en) fehlgeschlagen' : 'Alle Prüfungen bestanden'));
})().catch(e => { console.error(e); process.exit(1); });
