function dsGetDomainPrefix(domain) {
    const map = { verhalten: 'V', kommunikation: 'K', sozialisation: 'SOZ', kognition: 'KOG' };
    return map[domain] || domain;
}

// ==========================================
// SCHÜLER-MANAGER
// ==========================================

const SM_KEY = 'eldib-schueler-liste';
const SM_AKTIV_KEY = 'eldib-sm-aktiv';
let smAktuellerSchueler = null; // { id, einschaetzungNr }
let smIsReloading = false; // Flag to prevent beforeunload from overwriting data during location.reload()

function smGetListe() {
    try {
        return JSON.parse(localStorage.getItem(SM_KEY)) || [];
    } catch { return []; }
}

function smSaveListe(liste) {
    try {
        localStorage.setItem(SM_KEY, JSON.stringify(liste));
    } catch (e) {
        console.error('Fehler beim Speichern der Schülerliste:', e);
        alert(t('speicherFehler'));
    }
}

function smGenerateId() {
    return 'sch-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function smRenderListe() {
    const grid = document.getElementById('sm-schueler-grid');
    const liste = smGetListe();

    if (liste.length === 0) {
        grid.innerHTML = `
            <div class="sm-empty">
                <p>${smEscapeHtml(t('smLeer'))}</p>
                <small>${smEscapeHtml(t('smLeerHinweis'))}</small>
            </div>`;
        return;
    }

    // Initialen stehen im data-Attribut und werden per CSS gezeigt (gehören nicht zum Text der Karte)
    grid.innerHTML = liste.map(s => {
        const hat1 = s.einschaetzung1 && Object.keys(s.einschaetzung1).length > 0;
        const hat2 = s.einschaetzung2 && Object.keys(s.einschaetzung2).length > 0;
        const datum1 = hat1 ? eldibDatum(s.einschaetzung1.stammdaten?.einschaetzungsdatum) : '';
        const datum2 = hat2 ? eldibDatum(s.einschaetzung2.stammdaten?.einschaetzungsdatum) : '';
        const loeschen = smEscapeHtml(t('smLoeschen'));
        return `
        <div class="sm-card">
            <div class="sm-card-header">
                <div class="sm-avatar" data-initialen="${smEscapeHtml(smInitialen(s.name)).replace(/"/g, '&quot;')}" aria-hidden="true"></div>
                <div class="sm-card-titel">
                    <div class="sm-card-name">${smEscapeHtml(s.name)}</div>
                    <div class="sm-card-klasse">${s.klasse ? t('smKlasse') + ' ' + smEscapeHtml(s.klasse) : ''}${s.geburtsdatum ? (s.klasse ? ' · ' : '') + alterText(smBerechneAlter(s.geburtsdatum)) : ''}</div>
                </div>
                <button type="button" class="sm-card-delete" onclick="smLoescheSchueler('${s.id}')" title="${loeschen}" aria-label="${loeschen}"></button>
            </div>
            <div class="sm-card-buttons">
                <button type="button" class="sm-einschaetzung-btn ${hat1 ? 'has-data' : ''}" onclick="smOeffneEinschaetzung('${s.id}', 1)">
                    <span class="btn-label">${smEscapeHtml(tf('einschaetzungNr', { n: 1 }))}</span>
                    <span class="btn-status">${smEscapeHtml(hat1 ? datum1 || t('smDatenVorhanden') : t('smNochLeer'))}</span>
                </button>
                <button type="button" class="sm-einschaetzung-btn ${hat2 ? 'has-data' : ''}" onclick="smOeffneEinschaetzung('${s.id}', 2)">
                    <span class="btn-label">${smEscapeHtml(tf('einschaetzungNr', { n: 2 }))}</span>
                    <span class="btn-status">${smEscapeHtml(hat2 ? datum2 || t('smDatenVorhanden') : t('smNochLeer'))}</span>
                </button>
            </div>
        </div>`;
    }).join('');
}

// Initialen für den Namenskreis: "Muster, Tom" -> "TM" (ohne Komma: erstes Wort = Nachname)
function smInitialen(name) {
    const text = String(name || '').trim();
    let nachname = '', vorname = '';
    if (text.includes(',')) {
        const teile = text.split(',');
        nachname = teile[0].trim(); vorname = teile.slice(1).join(',').trim();
    } else {
        const woerter = text.split(/\s+/);
        nachname = woerter[0] || ''; vorname = woerter[1] || '';
    }
    return ((vorname.charAt(0) || '') + (nachname.charAt(0) || '')).toUpperCase();
}

// Anzeige in der Kopfleiste: "Name — 1. Einschätzung" in der aktuellen Sprache.
// Name und Nummer sind eigene Elemente (Gestaltung); der Text bleibt "Name — Nummer".
function smZeigeAktuelleInfo() {
    const info = document.getElementById('smCurrentInfo');
    if (!info || !smAktuellerSchueler) return;
    const schueler = smGetListe().find(s => s.id === smAktuellerSchueler.id);
    if (!schueler) return;
    info.innerHTML = `<span class="sm-info-name">${smEscapeHtml(schueler.name)}</span><span class="sm-info-sep"> — </span>` +
        `<span class="sm-info-nr">${smEscapeHtml(tf('einschaetzungNr', { n: smAktuellerSchueler.einschaetzungNr }))}</span>`;
    info.dataset.initialen = smInitialen(schueler.name);
    info.title = info.textContent; // voller Name, falls er in der Kopfleiste gekürzt ist
}

function smEscapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

function smBerechneAlter(geburtsdatumStr) {
    if (!geburtsdatumStr) return '';
    const geb = new Date(geburtsdatumStr);
    const heute = new Date();
    let alter = heute.getFullYear() - geb.getFullYear();
    const monatsDiff = heute.getMonth() - geb.getMonth();
    if (monatsDiff < 0 || (monatsDiff === 0 && heute.getDate() < geb.getDate())) alter--;
    return alter;
}

function smNeuerSchueler() {
    const overlay = document.createElement('div');
    overlay.className = 'sm-dialog-overlay';
    overlay.id = 'sm-dialog-overlay';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="sm-dialog" role="dialog" aria-modal="true" aria-labelledby="sm-dialog-titel">
            <h3 id="sm-dialog-titel">${smEscapeHtml(t('smDialogTitel'))}</h3>
            <div class="sm-dialog-raster">
                <div class="sm-feld"><label for="sm-new-nachname">${smEscapeHtml(t('smNachname'))} <b class="sm-pflicht">*</b></label>
                    <input type="text" id="sm-new-nachname" placeholder="${smEscapeHtml(t('smNachname'))}" autofocus></div>
                <div class="sm-feld"><label for="sm-new-vorname">${smEscapeHtml(t('smVorname'))} <b class="sm-pflicht">*</b></label>
                    <input type="text" id="sm-new-vorname" placeholder="${smEscapeHtml(t('smVorname'))}"></div>
                <div class="sm-feld"><label for="sm-new-geburtsdatum">${smEscapeHtml(t('geburtsdatum'))} <b class="sm-pflicht">*</b></label>
                    <input type="date" id="sm-new-geburtsdatum">
                    <div id="sm-new-alter" class="sm-alter"></div></div>
                <div class="sm-feld"><label for="sm-new-klasse">${smEscapeHtml(t('klasse'))}</label>
                    <input type="text" id="sm-new-klasse" placeholder="${smEscapeHtml(t('klassePlaceholder'))}"></div>
                <div class="sm-feld"><label for="sm-new-geschlecht">${smEscapeHtml(t('smGeschlecht'))}</label>
                    <select id="sm-new-geschlecht"><option value="">${smEscapeHtml(t('smGeschlechtLeer'))}</option><option value="m">${smEscapeHtml(t('smJunge'))}</option><option value="w">${smEscapeHtml(t('smMaedchen'))}</option></select></div>
            </div>
            <p class="sm-dialog-fehler" id="sm-dialog-fehler" role="alert" hidden></p>
            <p class="sm-pflicht-hinweis"><b class="sm-pflicht">*</b> ${smEscapeHtml(t('smPflichtfelder'))}</p>
            <div class="sm-dialog-actions">
                <button type="button" class="sm-btn sm-btn-secondary" onclick="smDialogSchliessen()">${smEscapeHtml(t('smAbbrechen'))}</button>
                <button type="button" class="sm-btn sm-btn-primary" onclick="smSchuelerAnlegen()">${smEscapeHtml(t('smAnlegen'))}</button>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    setTimeout(() => document.getElementById('sm-new-nachname')?.focus(), 100);
    // Enter in einem Eingabefeld legt an (Esc schließt: siehe unten)
    overlay.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); smSchuelerAnlegen(); }
    });

    // Alter berechnen bei Geburtsdatum-Eingabe
    document.getElementById('sm-new-geburtsdatum')?.addEventListener('change', function() {
        const alterDiv = document.getElementById('sm-new-alter');
        if (!this.value || !alterDiv) return;
        const geb = new Date(this.value);
        const heute = new Date();
        let alter = heute.getFullYear() - geb.getFullYear();
        const monatsDiff = heute.getMonth() - geb.getMonth();
        if (monatsDiff < 0 || (monatsDiff === 0 && heute.getDate() < geb.getDate())) alter--;
        alterDiv.textContent = alter >= 0 ? tf('smAlter', { n: alterText(alter) }) : '';
    });
}

// Dialog schließen; der Fokus geht zurück auf „Neuen Schüler anlegen“
function smDialogSchliessen() {
    document.getElementById('sm-dialog-overlay')?.remove();
    document.querySelector('[onclick="smNeuerSchueler()"]')?.focus();
}
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('sm-dialog-overlay')) { e.preventDefault(); smDialogSchliessen(); }
});

function smSchuelerAnlegen() {
    const nachname = document.getElementById('sm-new-nachname')?.value?.trim();
    const vorname = document.getElementById('sm-new-vorname')?.value?.trim();
    const geburtsdatum = document.getElementById('sm-new-geburtsdatum')?.value;
    const klasse = document.getElementById('sm-new-klasse')?.value?.trim();
    const geschlecht = document.getElementById('sm-new-geschlecht')?.value || '';

    const fehlende = [];
    if (!nachname) fehlende.push(t('smNachname'));
    if (!vorname) fehlende.push(t('smVorname'));
    if (!geburtsdatum) fehlende.push(t('geburtsdatum'));

    // Pflichtfelder: Hinweis im Dialog (statt alert), Felder markieren, Fokus ins erste fehlende Feld
    [['sm-new-nachname', nachname], ['sm-new-vorname', vorname], ['sm-new-geburtsdatum', geburtsdatum]].forEach(([id, wert]) => {
        document.getElementById(id)?.setAttribute('aria-invalid', wert ? 'false' : 'true');
    });
    if (fehlende.length > 0) {
        const fehler = document.getElementById('sm-dialog-fehler');
        if (fehler) { fehler.textContent = t('smPflichtFehlt') + ' ' + fehlende.join(', '); fehler.hidden = false; }
        document.getElementById(!nachname ? 'sm-new-nachname' : (!vorname ? 'sm-new-vorname' : 'sm-new-geburtsdatum'))?.focus();
        return;
    }

    const name = nachname + ', ' + vorname;
    const liste = smGetListe();
    const neu = {
        id: smGenerateId(),
        name: name,
        klasse: klasse || '',
        geburtsdatum: geburtsdatum,
        einschaetzung1: null,
        einschaetzung2: null
    };
    if (geschlecht) neu.geschlecht = geschlecht; // optional; wird in den DS neuer Einschätzungen übernommen
    liste.push(neu);
    smSaveListe(liste);
    smDialogSchliessen();
    smRenderListe();
}

// DS einer neuen Einschätzung: Geschlecht aus „Neuen Schüler anlegen“ übernehmen (für die Grammatik im Bericht).
// Nur für leere bzw. aktuelle DS-Daten (v: 2); ein früheres DS-Format bleibt unverändert.
function smDsMitGeschlecht(ds, schueler) {
    const d = ds && typeof ds === 'object' ? ds : {};
    if (!schueler.geschlecht || d.geschlecht || (Object.keys(d).length && d.v !== 2)) return d;
    return Object.assign({ v: 2 }, d, { geschlecht: schueler.geschlecht });
}

function smLoescheSchueler(id) {
    const liste = smGetListe();
    const schueler = liste.find(s => s.id === id);
    if (!schueler) return;
    if (!confirm(tf('smLoeschenFrage', { name: schueler.name }))) return;
    smSaveListe(liste.filter(s => s.id !== id));
    smRenderListe();
}

function smOeffneEinschaetzung(id, nr) {
    const liste = smGetListe();
    const schueler = liste.find(s => s.id === id);
    if (!schueler) return;

    smAktuellerSchueler = { id, einschaetzungNr: nr };

    // Daten der gewählten Einschätzung laden
    const daten = nr === 1 ? schueler.einschaetzung1 : schueler.einschaetzung2;

    if (daten) {
        // Bestehende Einschätzung laden
        localStorage.setItem('eldib-data', JSON.stringify(daten));
    } else if (nr === 2 && schueler.einschaetzung1) {
        // 2. Einschätzung: ELDiB-Daten aus 1. Einschätzung übernehmen
        const basis = schueler.einschaetzung1;
        // Alle Stammdaten aus der 1. Einschätzung übernehmen (inkl. Matricule, Förderort, etc.)
        const basisStammdaten = basis.stammdaten || {};
        const neueDaten = {
            language: basis.language || 'de',
            selections: JSON.parse(JSON.stringify(basis.selections || {})),
            zusaetzlicheZiele: JSON.parse(JSON.stringify(basis.zusaetzlicheZiele || {
                demarches_mentales: {},
                manieres_apprendre: {},
                attitudes_relationnelles: {},
                attitudes_affectives: {},
                competences_essentielles: {},
                culture_loisirs: {}
            })),
            stammdaten: {
                schueler_name: schueler.name,
                geburtsdatum: schueler.geburtsdatum || basisStammdaten.geburtsdatum || '',
                matricule: basisStammdaten.matricule || '',
                foerderort: basisStammdaten.foerderort || '',
                klasse: schueler.klasse || basisStammdaten.klasse || '',
                schuljahr: basisStammdaten.schuljahr || '',
                periodenTyp: basisStammdaten.periodenTyp || 'trimester',
                periode: basisStammdaten.periode || '1',
                einschaetzungsdatum: '',
                einschaetzende: basisStammdaten.einschaetzende || '',
                eltern1_name: basisStammdaten.eltern1_name || '',
                eltern1_tel: basisStammdaten.eltern1_tel || '',
                eltern1_email: basisStammdaten.eltern1_email || ''
            },
            dsData: {}
        };
        localStorage.setItem('eldib-data', JSON.stringify(neueDaten));
    } else {
        // Neue Einschätzung: Stammdaten vorausfüllen
        const neueDaten = {
            language: state.language, // neue Einschätzung in der gewählten Oberflächensprache
            selections: {},
            zusaetzlicheZiele: {
                demarches_mentales: {},
                manieres_apprendre: {},
                attitudes_relationnelles: {},
                attitudes_affectives: {},
                competences_essentielles: {},
                culture_loisirs: {}
            },
            stammdaten: {
                schueler_name: schueler.name,
                geburtsdatum: schueler.geburtsdatum || '',
                klasse: schueler.klasse || ''
            },
            dsData: {}
        };
        localStorage.setItem('eldib-data', JSON.stringify(neueDaten));
    }

    // Manager ausblenden, Editor einblenden
    document.getElementById('schueler-manager').style.display = 'none';
    document.getElementById('main-container').style.display = '';
    document.getElementById('backToManagerBtn').style.display = 'block';
    document.getElementById('saveBtn').style.display = 'block';

    // Info-Badge anzeigen
    const info = document.getElementById('smCurrentInfo');
    info.textContent = `${schueler.name} — ${tf('einschaetzungNr', { n: nr })}`;
    info.style.display = 'block';

    // Flag setzen um zu verhindern, dass beforeunload die vorbereiteten Daten überschreibt
    smIsReloading = true;
    // Seite neu laden, damit loadFromLocalStorage() die Daten einliest
    location.reload();
}

function smZurueckZurListe() {
    // Aktuelle Daten in den Schüler zurückspeichern
    smSaveAktuelleEinschaetzung();

    // Manager-Modus wiederherstellen
    smAktuellerSchueler = null;
    localStorage.removeItem('eldib-data');

    // UI zurücksetzen
    document.getElementById('schueler-manager').style.display = '';
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('backToManagerBtn').style.display = 'none';
    document.getElementById('smCurrentInfo').style.display = 'none';

    smRenderListe();
}

function smSaveAktuelleEinschaetzung() {
    // nur mit geladener Einschätzung und nicht während des Neuladens: sonst schreibt die Übersicht
    // (z. B. beim Doppelklick auf „1. Einschätzung“) ihr leeres Formular in die Schülerliste
    if (!smAktuellerSchueler || !einschaetzungGeladen || smIsReloading) return;

    const data = {
        language: state.language,
        selections: state.selections,
        zusaetzlicheZiele: state.zusaetzlicheZiele,
        stammdaten: getStammdaten(),
        dsData: getDSData(),
        bereichNotizen: {
            verhalten: document.getElementById('notizen-verhalten')?.value || '',
            kommunikation: document.getElementById('notizen-kommunikation')?.value || '',
            sozialisation: document.getElementById('notizen-sozialisation')?.value || '',
            kognition: document.getElementById('notizen-kognition')?.value || '',
            zusaetzlich: document.getElementById('notizen-zusaetzlich')?.value || ''
        },
        savedAt: new Date().toISOString()
    };

    const liste = smGetListe();
    const idx = liste.findIndex(s => s.id === smAktuellerSchueler.id);
    if (idx === -1) return;

    if (smAktuellerSchueler.einschaetzungNr === 1) {
        liste[idx].einschaetzung1 = data;
    } else {
        liste[idx].einschaetzung2 = data;
    }

    // Name, Klasse und Geburtsdatum synchronisieren
    if (data.stammdaten.schueler_name) {
        liste[idx].name = data.stammdaten.schueler_name;
    }
    if (data.stammdaten.klasse) {
        liste[idx].klasse = data.stammdaten.klasse;
    }
    if (data.stammdaten.geburtsdatum) {
        liste[idx].geburtsdatum = data.stammdaten.geburtsdatum;
    }

    smSaveListe(liste);
}

function smManualSave() {
    saveToLocalStorage();
    const btn = document.getElementById('saveBtn');
    if (btn) {
        const origText = btn.innerHTML;
        btn.textContent = t('gespeichert');
        btn.classList.add('saved');
        setTimeout(() => {
            btn.innerHTML = origText;
            btn.classList.remove('saved');
        }, 2000);
    }
}

// Auto-Save in Schüler-Liste (überschreibt bestehende saveToLocalStorage)
// Während eines geplanten Neuladens nicht mehr speichern: die für die nächste Seite vorbereiteten
// Daten (eldib-data) würden sonst von verzögerten Speicherungen dieser Seite überschrieben.
const _originalSaveToLocalStorage = saveToLocalStorage;
saveToLocalStorage = function() {
    if (smIsReloading) return;
    _originalSaveToLocalStorage();
    smSaveAktuelleEinschaetzung();
};

// JSON Import
function smImportJSON() {
    document.getElementById('smImportFile').click();
}

function smHandleImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            // Prüfe ob es eine Schüler-Liste ist (Array) oder einzelne Daten
            if (Array.isArray(data)) {
                // Import einer kompletten Schüler-Liste
                const liste = smGetListe();
                data.forEach(s => {
                    if (s.name && s.id) {
                        // Prüfe auf doppelte IDs
                        if (!liste.find(x => x.id === s.id)) {
                            liste.push(s);
                        }
                    }
                });
                smSaveListe(liste);
                smRenderListe();
                showToast(tf('smImportiert', { n: data.length }));
            } else if (data.stammdaten) {
                // Import einzelner Einschätzungs-Daten (altes Format)
                const name = data.stammdaten.schueler_name || file.name.replace('.json', '');
                const klasse = data.stammdaten.klasse || '';
                const liste = smGetListe();
                liste.push({
                    id: smGenerateId(),
                    name: name,
                    klasse: klasse,
                    einschaetzung1: data,
                    einschaetzung2: null
                });
                smSaveListe(liste);
                smRenderListe();
                showToast(tf('smEinzelnImportiert', { name }));
            } else {
                alert(t('smFormatUnbekannt'));
            }
        } catch (err) {
            alert(t('smImportFehler') + err.message);
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset für erneuten Import
}

function smExportAlleJSON() {
    const liste = smGetListe();
    if (liste.length === 0) {
        alert(t('smKeineSchueler'));
        return;
    }
    const blob = new Blob([JSON.stringify(liste, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `eldib_alle_schueler_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

// INIT: Beim Laden entscheiden ob Manager oder Editor anzeigen
(function smInit() {
    // Prüfe ob wir gerade einen Schüler bearbeiten
    const aktivData = localStorage.getItem(SM_AKTIV_KEY);
    let showEditor = false;

    if (aktivData) {
        try {
            const parsed = JSON.parse(aktivData);
            const liste = smGetListe();
            const schueler = liste.find(s => s.id === parsed.id);

            if (schueler) {
                // Schüler existiert - Editor anzeigen
                smAktuellerSchueler = parsed;
                showEditor = true;

                // Aus dem Hub gleich zu einem Teil springen (z. B. „DS anlegen“ → DS-Assistent) – nur dieses eine Mal
                if (parsed.bereich) {
                    const bereich = String(parsed.bereich);
                    delete smAktuellerSchueler.bereich;
                    localStorage.setItem(SM_AKTIV_KEY, JSON.stringify(smAktuellerSchueler));
                    if (['stammdaten', 'eldib', 'ds', 'export'].includes(bereich)) {
                        const springen = () => setTimeout(() => { if (typeof showMainSection === 'function') showMainSection(bereich); }, 150);
                        if (document.readyState === 'complete') springen(); else window.addEventListener('load', springen);
                    }
                }

                // Sicherstellen dass eldib-data aus der Schülerliste geladen wird
                // (kann verloren gehen wenn Browser/Tab geschlossen wurde)
                const existingData = localStorage.getItem('eldib-data');
                if (!existingData) {
                    const nr = parsed.einschaetzungNr;
                    const daten = nr === 1 ? schueler.einschaetzung1 : schueler.einschaetzung2;
                    if (daten) {
                        // Bestehende Einschätzung — Profildaten synchronisieren
                        const merged = JSON.parse(JSON.stringify(daten));
                        merged.stammdaten = merged.stammdaten || {};
                        merged.stammdaten.schueler_name = schueler.name;
                        merged.stammdaten.geburtsdatum = schueler.geburtsdatum || merged.stammdaten.geburtsdatum || '';
                        merged.stammdaten.klasse = schueler.klasse || merged.stammdaten.klasse || '';
                        localStorage.setItem('eldib-data', JSON.stringify(merged));
                    } else if (nr === 2 && schueler.einschaetzung1) {
                        // 2. Einschätzung: ALLE Daten aus 1. übernehmen
                        const basis = schueler.einschaetzung1;
                        const basisStammdaten = basis.stammdaten || {};
                        const neueDaten = {
                            language: basis.language || 'de',
                            selections: JSON.parse(JSON.stringify(basis.selections || {})),
                            zusaetzlicheZiele: JSON.parse(JSON.stringify(basis.zusaetzlicheZiele || {
                                demarches_mentales: {}, manieres_apprendre: {},
                                attitudes_relationnelles: {}, attitudes_affectives: {},
                                competences_essentielles: {}, culture_loisirs: {}
                            })),
                            stammdaten: {
                                schueler_name: schueler.name,
                                geburtsdatum: schueler.geburtsdatum || basisStammdaten.geburtsdatum || '',
                                matricule: basisStammdaten.matricule || '',
                                foerderort: basisStammdaten.foerderort || '',
                                klasse: schueler.klasse || basisStammdaten.klasse || '',
                                schuljahr: basisStammdaten.schuljahr || '',
                                periodenTyp: basisStammdaten.periodenTyp || 'trimester',
                                periode: basisStammdaten.periode || '1',
                                einschaetzungsdatum: '',
                                einschaetzende: basisStammdaten.einschaetzende || '',
                                eltern1_name: basisStammdaten.eltern1_name || '',
                                eltern1_tel: basisStammdaten.eltern1_tel || '',
                                eltern1_email: basisStammdaten.eltern1_email || ''
                            },
                            dsData: smDsMitGeschlecht(JSON.parse(JSON.stringify(basis.dsData || {})), schueler)
                        };
                        localStorage.setItem('eldib-data', JSON.stringify(neueDaten));
                    } else {
                        // Leere Einschätzung: ALLE Profildaten als Stammdaten
                        const neueDaten = {
                            language: gemerkteUiSprache(),
                            selections: {},
                            zusaetzlicheZiele: {
                                demarches_mentales: {}, manieres_apprendre: {},
                                attitudes_relationnelles: {}, attitudes_affectives: {},
                                competences_essentielles: {}, culture_loisirs: {}
                            },
                            stammdaten: {
                                schueler_name: schueler.name,
                                geburtsdatum: schueler.geburtsdatum || '',
                                matricule: '',
                                foerderort: '',
                                klasse: schueler.klasse || '',
                                schuljahr: '',
                                periodenTyp: 'trimester',
                                periode: '1',
                                einschaetzungsdatum: '',
                                einschaetzende: '',
                                eltern1_name: '',
                                eltern1_tel: '',
                                eltern1_email: ''
                            },
                            dsData: smDsMitGeschlecht({}, schueler)
                        };
                        localStorage.setItem('eldib-data', JSON.stringify(neueDaten));
                    }
                }

                document.getElementById('schueler-manager').style.display = 'none';
                document.getElementById('main-container').style.display = '';
                document.getElementById('backToManagerBtn').style.display = 'block';
                document.getElementById('saveBtn').style.display = 'block';

                document.getElementById('smCurrentInfo').style.display = 'block';
                smZeigeAktuelleInfo();
            } else {
                // Schüler existiert nicht mehr in der Liste
                // eldib-data behalten für Wiederherstellung, nur SM_AKTIV_KEY entfernen
                localStorage.removeItem(SM_AKTIV_KEY);
                // Versuche eldib-data als neuen Schüler zu migrieren
                const orphanedData = localStorage.getItem('eldib-data');
                if (orphanedData) {
                    try {
                        const oData = JSON.parse(orphanedData);
                        if (oData.stammdaten && oData.stammdaten.schueler_name) {
                            const liste2 = smGetListe();
                            liste2.push({
                                id: smGenerateId(),
                                name: oData.stammdaten.schueler_name,
                                klasse: oData.stammdaten.klasse || '',
                                einschaetzung1: oData,
                                einschaetzung2: null
                            });
                            smSaveListe(liste2);
                        }
                    } catch {}
                }
                localStorage.removeItem('eldib-data');
            }
        } catch {
            localStorage.removeItem(SM_AKTIV_KEY);
        }
    }

    if (!showEditor) {
        // Manager anzeigen
        smRenderListe();

        // Migriere verwaiste eldib-data: Wenn eldib-data existiert aber kein aktiver Schüler
        const alteDaten = localStorage.getItem('eldib-data');
        if (alteDaten) {
            try {
                const data = JSON.parse(alteDaten);
                if (data.stammdaten && data.stammdaten.schueler_name) {
                    const liste = smGetListe();
                    // Prüfe ob dieser Schüler bereits in der Liste existiert (anhand Name)
                    const bereitsVorhanden = liste.some(s => s.name === data.stammdaten.schueler_name);
                    if (!bereitsVorhanden) {
                        liste.push({
                            id: smGenerateId(),
                            name: data.stammdaten.schueler_name,
                            klasse: data.stammdaten.klasse || '',
                            einschaetzung1: data,
                            einschaetzung2: null
                        });
                        smSaveListe(liste);
                        smRenderListe();
                    }
                }
            } catch {}
            // Alte eldib-data aufräumen wenn wir im Manager-Modus sind
            localStorage.removeItem('eldib-data');
        }
    }
})();

// Überschreibe smOeffneEinschaetzung mit localStorage-Persistenz
smOeffneEinschaetzung = function(id, nr) {
    // Aktuelle Einschätzung sichern bevor gewechselt wird
    if (smAktuellerSchueler) {
        smSaveAktuelleEinschaetzung();
    }

    const liste = smGetListe();
    const schueler = liste.find(s => s.id === id);
    if (!schueler) return;

    smAktuellerSchueler = { id, einschaetzungNr: nr };
    localStorage.setItem(SM_AKTIV_KEY, JSON.stringify(smAktuellerSchueler));

    // Daten der gewählten Einschätzung laden
    const daten = nr === 1 ? schueler.einschaetzung1 : schueler.einschaetzung2;

    if (daten) {
        // Bestehende Einschätzung laden — Stammdaten aus Profil synchronisieren
        const merged = JSON.parse(JSON.stringify(daten));
        merged.stammdaten = merged.stammdaten || {};
        merged.stammdaten.schueler_name = schueler.name;
        merged.stammdaten.geburtsdatum = schueler.geburtsdatum || merged.stammdaten.geburtsdatum || '';
        merged.stammdaten.klasse = schueler.klasse || merged.stammdaten.klasse || '';
        localStorage.setItem('eldib-data', JSON.stringify(merged));
    } else if (nr === 2 && schueler.einschaetzung1) {
        // 2. Einschätzung: ALLE Daten aus 1. Einschätzung übernehmen
        const basis = schueler.einschaetzung1;
        const basisStammdaten = basis.stammdaten || {};
        const neueDaten = {
            language: basis.language || 'de',
            selections: JSON.parse(JSON.stringify(basis.selections || {})),
            zusaetzlicheZiele: JSON.parse(JSON.stringify(basis.zusaetzlicheZiele || {
                demarches_mentales: {},
                manieres_apprendre: {},
                attitudes_relationnelles: {},
                attitudes_affectives: {},
                competences_essentielles: {},
                culture_loisirs: {}
            })),
            stammdaten: {
                schueler_name: schueler.name,
                geburtsdatum: schueler.geburtsdatum || basisStammdaten.geburtsdatum || '',
                matricule: basisStammdaten.matricule || '',
                foerderort: basisStammdaten.foerderort || '',
                klasse: schueler.klasse || basisStammdaten.klasse || '',
                schuljahr: basisStammdaten.schuljahr || '',
                periodenTyp: basisStammdaten.periodenTyp || 'trimester',
                periode: basisStammdaten.periode || '1',
                einschaetzungsdatum: '',
                einschaetzende: basisStammdaten.einschaetzende || '',
                eltern1_name: basisStammdaten.eltern1_name || '',
                eltern1_tel: basisStammdaten.eltern1_tel || '',
                eltern1_email: basisStammdaten.eltern1_email || ''
            },
            dsData: smDsMitGeschlecht(JSON.parse(JSON.stringify(basis.dsData || {})), schueler)
        };
        localStorage.setItem('eldib-data', JSON.stringify(neueDaten));
    } else {
        // Neue Einschätzung: ALLE Profildaten als Stammdaten übernehmen
        const neueDaten = {
            language: state.language, // neue Einschätzung in der gewählten Oberflächensprache
            selections: {},
            zusaetzlicheZiele: {
                demarches_mentales: {},
                manieres_apprendre: {},
                attitudes_relationnelles: {},
                attitudes_affectives: {},
                competences_essentielles: {},
                culture_loisirs: {}
            },
            stammdaten: {
                schueler_name: schueler.name,
                geburtsdatum: schueler.geburtsdatum || '',
                matricule: '',
                foerderort: '',
                klasse: schueler.klasse || '',
                schuljahr: '',
                periodenTyp: 'trimester',
                periode: '1',
                einschaetzungsdatum: '',
                einschaetzende: '',
                eltern1_name: '',
                eltern1_tel: '',
                eltern1_email: ''
            },
            dsData: smDsMitGeschlecht({}, schueler)
        };
        localStorage.setItem('eldib-data', JSON.stringify(neueDaten));
    }

    // Flag setzen um zu verhindern, dass beforeunload/pagehide die vorbereiteten Daten überschreibt
    smIsReloading = true;
    // Seite neu laden, damit alles korrekt initialisiert wird
    location.reload();
};

// Überschreibe smZurueckZurListe mit localStorage-Persistenz
smZurueckZurListe = function() {
    // Erst speichern und prüfen ob es geklappt hat
    const prevSchueler = smAktuellerSchueler;
    try {
        smSaveAktuelleEinschaetzung();
        // Verifizieren dass die Daten in der Schülerliste angekommen sind
        if (prevSchueler) {
            const liste = smGetListe();
            const schueler = liste.find(s => s.id === prevSchueler.id);
            const nr = prevSchueler.einschaetzungNr;
            const gespeicherteDaten = nr === 1 ? schueler?.einschaetzung1 : schueler?.einschaetzung2;
            if (!gespeicherteDaten || !gespeicherteDaten.savedAt) {
                console.warn('Speicherung konnte nicht verifiziert werden - behalte eldib-data als Backup');
                // eldib-data nicht löschen als Sicherheitsnetz
                smAktuellerSchueler = null;
                smIsReloading = true;
                localStorage.removeItem(SM_AKTIV_KEY);
                location.reload();
                return;
            }
        }
    } catch (e) {
        console.error('Fehler beim Speichern vor Zurück:', e);
        // Bei Fehler eldib-data behalten als Backup
        smAktuellerSchueler = null;
        smIsReloading = true;
        localStorage.removeItem(SM_AKTIV_KEY);
        location.reload();
        return;
    }
    smAktuellerSchueler = null;
    smIsReloading = true;
    localStorage.removeItem(SM_AKTIV_KEY);
    localStorage.removeItem('eldib-data');
    location.reload();
};

// Zentrale Speicher-Funktion für alle Event-Handler
function smSaveAll() {
    try {
        saveToLocalStorage(); // speichert eldib-data UND Schülerliste (via Override)
    } catch (e) {
        console.error('Fehler beim Speichern:', e);
    }
}

// Beim Seitenverlassen speichern (nur wenn kein geplanter Reload läuft)
window.addEventListener('beforeunload', function() {
    if (smAktuellerSchueler && !smIsReloading) {
        smSaveAll();
    }
});

// pagehide ist zuverlässiger als beforeunload auf Mobilgeräten
window.addEventListener('pagehide', function() {
    if (smAktuellerSchueler && !smIsReloading) {
        smSaveAll();
    }
});

// Periodisches Auto-Save alle 10 Sekunden (Sicherheitsnetz)
setInterval(function() {
    if (smAktuellerSchueler && !smIsReloading) {
        smSaveAll();
    }
}, 10000);

// Speichern wenn Tab/Fenster den Fokus verliert
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden' && smAktuellerSchueler && !smIsReloading) {
        smSaveAll();
    }
});

// Speichern wenn Fenster den Fokus verliert (zusätzlicher Schutz)
window.addEventListener('blur', function() {
    if (smAktuellerSchueler && !smIsReloading) {
        smSaveAll();
    }
});

    
