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

if (process.argv.includes('--pruefen')) {
  new vm.Script(programm, { filename: 'programm.js' });
  console.log('✓ Syntax des Programms in Ordnung');
}
