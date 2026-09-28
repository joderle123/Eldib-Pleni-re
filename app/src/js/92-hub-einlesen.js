// ==========================================
// PEI/DS EINLESEN – über den CDSE Hub
// ==========================================
// Läuft der Generator im CDSE Hub (in dessen Rahmen), gibt es hier den Knopf „PEI/DS einlesen“:
// - auf der Übersicht für eine oder mehrere Dateien – der Hub ordnet sie den Kindern zu;
//   Dateien lassen sich auch auf die Übersicht ziehen,
// - beim geöffneten Schüler für genau dieses Kind.
// Gelesen wird im Hub (Word, PDF oder Scan, immer mit Vorschau). Er trägt alles ins Dossier und
// hier in die Schülerliste ein und lädt den Generator danach neu. Ohne Hub (Generator per
// Doppelklick geöffnet) bleibt der Knopf verborgen: der Leser steckt im Hub.
//
// Nachrichten nur mit dem Hub, der diesen Rahmen geöffnet hat (window.parent):
//   { cdseEldib: 1, n, op: 'hallo' }
//       Antwort { cdseEldib: 1, antwort: true, n, ok: true, erg: { einlesen: true } }
//   { cdseEldib: 1, n, op: 'einlesen', arg: { dateien: [File], schueler: { id, hubId, name, geburtsdatum, klasse } | null } }
//       Antwort { cdseEldib: 1, antwort: true, n, ok, grund }   (grund: 'laeuft', 'fehlt', 'keine')
// Die Dateien gehen als File-Objekte an den Hub: gewählt wird hier, im Generator.
var HubEinlesen = (function () {
    const ANNEHMEN = '.docx,.pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const imRahmen = (function () { try { return window.parent !== window; } catch (e) { return false; } })();
    // unter file:// hat die Seite keinen Ursprung, den man angeben könnte; sonst nur an denselben Ursprung
    const ziel = location.protocol === 'file:' ? '*' : location.origin;
    const offen = {};
    let bereit = false, nr = 0;

    function senden(op, arg, warten) {
        return new Promise(function (fertig) {
            if (!imRahmen) { fertig(null); return; }
            const n = ++nr;
            offen[n] = fertig;
            try { window.parent.postMessage({ cdseEldib: 1, n: n, op: op, arg: arg || null }, ziel); }
            catch (e) { delete offen[n]; fertig(null); return; }
            setTimeout(function () { if (offen[n]) { delete offen[n]; fertig(null); } }, warten);
        });
    }
    window.addEventListener('message', function (ev) {
        const m = ev.data;
        if (!imRahmen || ev.source !== window.parent || !m || m.cdseEldib !== 1 || !m.antwort) return;
        const f = offen[m.n];
        if (f) { delete offen[m.n]; f(m); }
    });

    function knoepfe() { return [document.getElementById('sm-einlesen-btn'), document.getElementById('einlesenBtn')]; }
    function beschriften() {
        const [start, editor] = knoepfe();
        if (start) { start.textContent = t('hubEinlesen'); start.title = t('hubEinlesenTitelListe'); }
        if (editor) { editor.textContent = t('hubEinlesen'); editor.title = t('hubEinlesenTitelKind'); editor.setAttribute('aria-label', t('hubEinlesen')); }
    }
    function zeigen() {
        knoepfe().forEach(function (b) { if (b) b.hidden = !bereit; });
    }

    // der Schüler, der gerade offen ist (nur im Editor)
    function offenerSchueler() {
        if (typeof smAktuellerSchueler === 'undefined' || !smAktuellerSchueler) return null;
        const s = smGetListe().find(function (x) { return x.id === smAktuellerSchueler.id; });
        if (!s) return null;
        return { id: s.id, hubId: s.hubId || '', name: s.name || '', geburtsdatum: s.geburtsdatum || '', klasse: s.klasse || '' };
    }

    function schicken(dateien, fuerKind) {
        const s = fuerKind ? offenerSchueler() : null;
        // Stand vorher sichern: der Hub trägt danach in die Schülerliste ein und lädt den Generator neu
        if (s && typeof smSaveAll === 'function') smSaveAll();
        return senden('einlesen', { dateien: dateien, schueler: s }, 15000).then(function (m) {
            if (!m) { showToast(t('hubEinlesenStumm')); return; }
            if (!m.ok) showToast(m.grund === 'laeuft' ? t('hubEinlesenLaeuft') : t('hubEinlesenFehler'));
        });
    }

    function waehlen(fuerKind) {
        if (!bereit) return;
        const inp = document.createElement('input');
        inp.type = 'file'; inp.accept = ANNEHMEN; inp.multiple = !fuerKind; inp.hidden = true;
        document.body.appendChild(inp);
        inp.addEventListener('change', function () {
            const l = Array.prototype.slice.call(inp.files || []);
            inp.remove();
            if (l.length) schicken(l, fuerKind);
        });
        inp.addEventListener('cancel', function () { inp.remove(); });
        inp.click();
    }

    // Dateien auf die Übersicht ziehen (wie auf die Schülerliste im Hub)
    function mitDateien(ev) { const dt = ev.dataTransfer; return !!(dt && Array.prototype.indexOf.call(dt.types || [], 'Files') >= 0); }
    function uebersicht(ev) {
        const m = document.getElementById('schueler-manager');
        return m && m.style.display !== 'none' && ev.target && m.contains(ev.target) ? m : null;
    }
    document.addEventListener('dragover', function (ev) {
        const m = uebersicht(ev);
        if (!bereit || !m || !mitDateien(ev)) return;
        ev.preventDefault(); ev.dataTransfer.dropEffect = 'copy'; m.classList.add('sm-drop');
    });
    document.addEventListener('dragleave', function (ev) {
        const m = uebersicht(ev);
        if (m && (!ev.relatedTarget || !m.contains(ev.relatedTarget))) m.classList.remove('sm-drop');
    });
    document.addEventListener('drop', function (ev) {
        const m = uebersicht(ev);
        if (!bereit || !m || !mitDateien(ev)) return;
        ev.preventDefault(); m.classList.remove('sm-drop');
        const l = Array.prototype.slice.call(ev.dataTransfer.files || []);
        if (l.length) schicken(l, false);
    });

    // Beim Hub anmelden: erst mit seiner Antwort erscheint der Knopf (bis zu drei Versuche)
    function hallo(versuch) {
        if (!imRahmen) return;
        senden('hallo', null, 3000).then(function (m) {
            if (!m) { if (versuch < 3) hallo(versuch + 1); return; }
            bereit = !!(m.ok && m.erg && m.erg.einlesen);
            zeigen();
        });
    }

    beschriften();
    hallo(1);
    return { waehlen: waehlen, beschriften: beschriften, bereit: function () { return bereit; } };
})();
