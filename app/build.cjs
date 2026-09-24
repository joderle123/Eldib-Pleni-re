#!/usr/bin/env node
// Baut den ELDiB-Generator als EINE HTML-Datei (app/eldib-generator.html).
// Warum eine Datei: Die App liegt auf O:\ und wird per Doppelklick geöffnet -
// ohne Webserver und ohne Internet. Deshalb steckt alles in der Datei:
// Stile, Schriften, Bibliotheken, Word-Vorlagen und Programmcode.
//
// Aufruf:  node app/build.cjs            baut die Datei
//          node app/build.cjs --pruefen  baut und prüft zusätzlich die Syntax
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const SRC = path.join(__dirname, 'src');
const ZIEL = path.join(__dirname, 'eldib-generator.html');
const lies = (p, bin) => fs.readFileSync(path.join(SRC, p), bin ? undefined : 'utf8');

// Reihenfolge ist wichtig: die App ist ein einziges klassisches Skript.
const STILE = fs.readdirSync(path.join(SRC, 'styles')).filter(f => f.endsWith('.css')).sort();
const BIBLIOTHEKEN = ['lib/jszip.min.js', 'lib/docx.umd.js', 'lib/FileSaver.min.js'];
const PROGRAMM = fs.readdirSync(path.join(SRC, 'js')).filter(f => f.endsWith('.js')).sort();
// Word-Vorlagen: Konstante im Programm -> Datei in src/vorlagen
const VORLAGEN = {
  TEMPLATE_DE_CDSE_BASE64: 'PEI_DE.docx',
  TEMPLATE_DS_DE_BASE64: 'DS_DE.docx',
  TEMPLATE_FR_PEI_CDSE_BASE64: 'PEI_FR.docx',
  TEMPLATE_FR_DS_CDSE_BASE64: 'DS_FR.docx'
};

// "</script" darf in eingebettetem Code nicht vorkommen
const sicher = js => js.replace(/<\/script/gi, '<\\/script');

let html = lies('shell.html');
const css = STILE.map(f => '/* ---- ' + f + ' ---- */\n' + lies('styles/' + f)).join('\n');
const vorlagen = Object.keys(VORLAGEN).map(k =>
  'const ' + k + " = '" + lies('vorlagen/' + VORLAGEN[k], true).toString('base64') + "';").join('\n');
const programm = PROGRAMM.map(f => '// ==== ' + f + ' ====\n' + lies('js/' + f)).join('\n');

const skripte =
  BIBLIOTHEKEN.map(f => '<script>/* ' + f + ' */\n' + sicher(lies(f)) + '\n</script>').join('\n') + '\n' +
  '<script>/* Word-Vorlagen (Base64) */\n' + vorlagen + '\n</script>\n' +
  '<script>\n' + sicher(programm) + '\n</script>\n';

if (html.indexOf('/*@@CSS@@*/') < 0 || html.indexOf('<!--@@SKRIPTE@@-->') < 0) { throw new Error('Platzhalter in shell.html fehlen'); }
html = html.replace('/*@@CSS@@*/', () => css).replace('<!--@@SKRIPTE@@-->', () => skripte);
fs.writeFileSync(ZIEL, html);
console.log('✓ ' + path.relative(process.cwd(), ZIEL) + ' (' + Math.round(html.length / 1024) + ' KB, ' + PROGRAMM.length + ' Programmteile)');

// Text-Motor des DS zusätzlich als eigene Datei: der CDSE Hub nutzt ihn für das
// Schülerprofil im Dossier (Stärken, Schwierigkeiten, was hilft …)
const MOTOR = PROGRAMM.filter(f => /^4[2-6].*ds-(bank|texte|fakten|text)/.test(f));
// Dazu die ELDiB-Itembank (deutsch) als reine Daten: Stufen mit Alter, Items mit
// Ziel-Formulierungen, Förderideen, Beobachtungsbeispiele und Zusatzziele. Der Hub
// zeigt damit im Dossier den Entwicklungsstand, überfällige Items und die PEI-Ziele.
function itemBank() {
  const leer = () => null;
  const ctx = { console, window: {}, state: { zusaetzlicheZiele: {}, selections: {} },
    document: { getElementById: leer, querySelector: leer, querySelectorAll: () => [], addEventListener: leer } };
  vm.createContext(ctx);
  const quelle = ['10-eldib-kern.js', '20-daten-de.js', '60-daten-struktur-de.js', '70-daten-fr.js', '71-daten-en.js'].map(f => lies('js/' + f)).join('\n');
  const r = vm.runInContext(quelle + '\n;({ ELDIB_DATA, ELDIB_DATA_FR, ELDIB_DATA_EN, STUFEN_ALTER_MAPPING, INTERVENTIONEN, INTERVENTIONEN_FALLBACK, BEISPIELE, ZUSAETZLICHE_ZIELE,' +
    ' HINWEISE: typeof ITEM_HINWEISE !== "undefined" ? ITEM_HINWEISE : {} })', ctx);
  // Ziel-Formulierungen auf Französisch/Englisch: Wurde ein Ziel dort gewählt (ohne
  // gespeicherte Nummer), findet der Hub so die deutsche Fassung derselben Formulierung.
  const fremd = {};
  for (const [lang, D] of [['fr', r.ELDIB_DATA_FR], ['en', r.ELDIB_DATA_EN]]) {
    for (const b of Object.values(D || {})) {
      for (const st of Object.values(b.stufen || {})) {
        for (const i of st.items || []) { if ((i.zielformulierungen || []).length) { (fremd[i.code] = fremd[i.code] || {})[lang] = i.zielformulierungen; } }
      }
    }
  }
  const bank = { stufen: r.STUFEN_ALTER_MAPPING, bereiche: {}, interventionen: r.INTERVENTIONEN,
    fallback: r.INTERVENTIONEN_FALLBACK, beispiele: r.BEISPIELE, zusatz: r.ZUSAETZLICHE_ZIELE, zieleFremd: fremd,
    hinweise: r.HINWEISE };   // Hinweise des CDSE je Item (z. B. Logopädie einschalten, Piktogramme vorhanden)
  for (const [id, b] of Object.entries(r.ELDIB_DATA)) {
    const stufen = {};
    for (const [s, st] of Object.entries(b.stufen)) {
      stufen[s] = { name: st.name, ziel: st.ziel, items: st.items.map(i => ({ nr: i.nr, code: i.code, keyword: i.keyword,
        description: i.description, zielformulierungen: i.zielformulierungen || [] })) };
    }
    bank.bereiche[id] = { name: b.name, code: b.code, stufen };
  }
  // Richtziele und Altersspannen, wie sie der DS-Bericht nennt (aus 47-ds-assistent.js)
  const ds = lies('js/47-ds-assistent.js');
  const hole = n => { const m = ds.match(new RegExp('const ' + n + ' = (\\{[\\s\\S]*?\\n?\\});')); if (!m) { throw new Error(n + ' fehlt in 47-ds-assistent.js'); } return vm.runInNewContext('(' + m[1] + ')'); };
  bank.richtziel = hole('DS_RICHTZIEL').de;
  bank.dsStufenAlter = hole('DS_STUFEN_ALTER');
  return bank;
}
const motor = '/* DS-Text-Motor des ELDiB-Generators (erzeugt von app/build.cjs, nicht von Hand ändern).\n' +
  '   Wird vom CDSE Hub geladen: apps/ds-motor.js */\n' + MOTOR.map(f => '// ==== ' + f + ' ====\n' + lies('js/' + f)).join('\n') +
  '\n// ==== ELDiB-Itembank (deutsch, aus 10/20/60) ====\nvar ELDIB_BANK = ' + JSON.stringify(itemBank()) + ';\n';
fs.writeFileSync(path.join(__dirname, 'ds-motor.js'), motor);
console.log('✓ ds-motor.js (' + Math.round(motor.length / 1024) + ' KB, ' + MOTOR.length + ' Teile)');

if (process.argv.includes('--pruefen')) {
  new vm.Script(motor, { filename: 'ds-motor.js' });
  new vm.Script(programm, { filename: 'programm.js' });
  console.log('✓ Syntax des Programms in Ordnung');
}
