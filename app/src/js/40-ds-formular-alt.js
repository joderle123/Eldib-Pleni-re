// Toggle Diagnose-Details
function toggleDiagnoseDetails(diagnose) {
    const details = document.getElementById(`ds_diagnose_${diagnose}_details`);
    const checkbox = document.querySelector(`input[name="ds_diagnose"][value="${diagnose}"]`);
    if (details && checkbox) {
        details.style.display = checkbox.checked ? 'block' : 'none';
    }
}

// Toggle Ereignis-Details
function toggleEreignisDetails(ereignis) {
    const details = document.getElementById(`ds_ereignis_${ereignis}_details`);
    const checkbox = document.querySelector(`input[name="ds_ereignis"][value="${ereignis}"]`);
    if (details && checkbox) {
        details.style.display = checkbox.checked ? 'block' : 'none';
    }
}

// Geschwister-Felder aktualisieren
function updateGeschwisterFields() {
    const anzahl = parseInt(document.getElementById('ds_geschwister_anzahl').value) || 0;
    const container = document.getElementById('ds_geschwister_container');
    container.innerHTML = '';

    for (let i = 1; i <= Math.min(anzahl, 5); i++) {
        container.innerHTML += `
            <div class="form-row" style="margin-top: 10px;">
                <div class="form-group">
                    <label>Geschwister ${i} - Name/Initialen</label>
                    <input type="text" id="ds_geschwister_${i}_name" placeholder="Name">
                </div>
                <div class="form-group">
                    <label>Alter</label>
                    <input type="number" id="ds_geschwister_${i}_alter" placeholder="Alter" min="0">
                </div>
                <div class="form-group">
                    <label>Bemerkungen</label>
                    <input type="text" id="ds_geschwister_${i}_bemerkung" placeholder="Optionale Bemerkungen">
                </div>
            </div>
        `;
    }
}

// Maßnahme hinzufügen (Vorgeschichte)
function addMassnahmeRow() {
    const container = document.getElementById('ds_massnahmen_container');
    const row = document.createElement('div');
    row.className = 'ds-massnahme-row';
    row.style.cssText = 'display: grid; grid-template-columns: 1fr 100px 1fr 1fr 40px; gap: 10px; margin-bottom: 10px; align-items: end;';
    row.innerHTML = `
        <div class="form-group" style="margin-bottom: 0;">
            <input type="text" class="ds_massnahme_zeitraum" placeholder="z.B. 2022-2023">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
            <input type="text" class="ds_massnahme_klasse" placeholder="C2.1">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
            <select class="ds_massnahme_art">
                <option value="">-- Wählen --</option>
                <option value="scas">SCAS</option>
                <option value="cpi">CPI</option>
                <option value="eseb">ESEB</option>
                <option value="logopaedie">Logopädie</option>
                <option value="ergotherapie">Ergotherapie</option>
                <option value="psychotherapie">Psychotherapie</option>
                <option value="psychiatrie">Psychiatrische Begleitung</option>
                <option value="iebs">I-EBS</option>
                <option value="andere">Andere</option>
            </select>
        </div>
        <div class="form-group" style="margin-bottom: 0;">
            <input type="text" class="ds_massnahme_akteur" placeholder="Name/Institution">
        </div>
        <button type="button" class="btn-remove-row" onclick="removeMassnahmeRow(this)" style="background: var(--danger); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 18px;">×</button>
    `;
    container.appendChild(row);
}

function removeMassnahmeRow(btn) {
    const container = document.getElementById('ds_massnahmen_container');
    if (container.children.length > 1) {
        btn.closest('.ds-massnahme-row').remove();
    }
}

// Aktuelle Maßnahme hinzufügen
function addAktuelleMassnahmeRow() {
    const container = document.getElementById('ds_aktuelle_massnahmen_container');
    const row = document.createElement('div');
    row.className = 'ds-massnahme-row';
    row.style.cssText = 'display: grid; grid-template-columns: 1fr 100px 1fr 1fr 40px; gap: 10px; margin-bottom: 10px; align-items: end;';
    row.innerHTML = `
        <div class="form-group" style="margin-bottom: 0;">
            <input type="text" class="ds_aktuelle_massnahme_zeitraum" placeholder="seit ...">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
            <input type="text" class="ds_aktuelle_massnahme_klasse" placeholder="C2.1">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
            <select class="ds_aktuelle_massnahme_art">
                <option value="">-- Wählen --</option>
                <option value="scas">SCAS</option>
                <option value="cpi">CPI</option>
                <option value="eseb">ESEB</option>
                <option value="logopaedie">Logopädie</option>
                <option value="ergotherapie">Ergotherapie</option>
                <option value="psychotherapie">Psychotherapie</option>
                <option value="psychiatrie">Psychiatrische Begleitung</option>
                <option value="iebs">I-EBS</option>
                <option value="andere">Andere</option>
            </select>
        </div>
        <div class="form-group" style="margin-bottom: 0;">
            <input type="text" class="ds_aktuelle_massnahme_akteur" placeholder="Name/Institution">
        </div>
        <button type="button" class="btn-remove-row" onclick="removeAktuelleMassnahmeRow(this)" style="background: var(--danger); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 18px;">×</button>
    `;
    container.appendChild(row);
}

function removeAktuelleMassnahmeRow(btn) {
    const container = document.getElementById('ds_aktuelle_massnahmen_container');
    if (container.children.length > 1) {
        btn.closest('.ds-massnahme-row').remove();
    }
}

// Beobachtung hinzufügen
function addBeobachtungBlock() {
    const container = document.getElementById('ds_beobachtungen_container');
    const block = document.createElement('div');
    block.className = 'ds-beobachtung-block';
    block.style.cssText = 'background: #f9f9f9; padding: 20px; border-radius: 12px; margin-bottom: 15px; position: relative;';
    block.innerHTML = `
        <button type="button" onclick="this.closest('.ds-beobachtung-block').remove()" style="position: absolute; top: 10px; right: 10px; background: var(--danger); color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer;">×</button>
        <div class="form-row">
            <div class="form-group">
                <label>Datum</label>
                <input type="date" class="ds_beobachtung_datum">
            </div>
            <div class="form-group">
                <label>Dauer (Min.)</label>
                <input type="number" class="ds_beobachtung_dauer" placeholder="45" min="1">
            </div>
            <div class="form-group">
                <label>Setting</label>
                <select class="ds_beobachtung_setting">
                    <option value="">-- Wählen --</option>
                    <option value="einzelsituation">Einzelsituation</option>
                    <option value="kleingruppe">Kleingruppe</option>
                    <option value="klassenverband">Klassenverband</option>
                    <option value="pausenhof">Pausenhof</option>
                    <option value="maison_relais">Maison Relais</option>
                    <option value="andere">Andere</option>
                </select>
            </div>
            <div class="form-group">
                <label>Beobachter</label>
                <input type="text" class="ds_beobachtung_beobachter" placeholder="Name">
            </div>
        </div>
        <div class="form-group">
            <label>Positive Beobachtungen</label>
            <textarea class="ds_beobachtung_positiv" rows="2" placeholder="Was ist gut gelungen?"></textarea>
        </div>
        <div class="form-group">
            <label>Herausfordernde Situationen</label>
            <textarea class="ds_beobachtung_negativ" rows="2" placeholder="Was war schwierig?"></textarea>
        </div>
        <div class="form-group">
            <label>Zusammenfassende Beschreibung</label>
            <textarea class="ds_beobachtung_zusammenfassung" rows="3" placeholder="Objektive, konkrete, relevante Verhaltensweisen..."></textarea>
        </div>
    `;
    container.appendChild(block);
}

// Intervention hinzufügen
function addInterventionRow() {
    const container = document.getElementById('ds_interventionen_container');
    const row = document.createElement('div');
    row.className = 'ds-intervention-row';
    row.style.cssText = 'display: grid; grid-template-columns: 120px 1fr 40px; gap: 10px; margin-bottom: 10px; align-items: end;';
    row.innerHTML = `
        <div class="form-group" style="margin-bottom: 0;">
            <input type="date" class="ds_intervention_datum">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
            <select class="ds_intervention_art">
                <option value="">-- Wählen --</option>
                <option value="klassenbeobachtung">Klassenbeobachtung</option>
                <option value="kontakt_eltern">Kontakt mit Erziehungsberechtigten</option>
                <option value="kontakt_schule">Kontakt mit Herkunftsschule</option>
                <option value="kontakt_extern">Kontakt mit externem Fachpersonal</option>
                <option value="kontakt_schueler">Kontakt mit Schüler:in</option>
            </select>
        </div>
        <button type="button" class="btn-remove-row" onclick="removeInterventionRow(this)" style="background: var(--danger); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 18px;">×</button>
    `;
    container.appendChild(row);
}

function removeInterventionRow(btn) {
    const container = document.getElementById('ds_interventionen_container');
    if (container.children.length > 1) {
        btn.closest('.ds-intervention-row').remove();
    }
}

// DS Daten sammeln
function getDSData() {
    const data = {};

    // Alle Input/Select/Textarea Felder im Diagnostic Tab
    const diagnosticTab = document.getElementById('diagnostic');
    if (!diagnosticTab) return data;

    // Einfache Felder
    diagnosticTab.querySelectorAll('input[id^="ds_"], select[id^="ds_"], textarea[id^="ds_"]').forEach(el => {
        if (el.type === 'checkbox') return; // Checkboxen separat behandeln
        data[el.id] = el.value;
    });

    // Checkboxen gruppiert
    const checkboxGroups = {};
    diagnosticTab.querySelectorAll('input[type="checkbox"][name^="ds_"]').forEach(cb => {
        if (!checkboxGroups[cb.name]) checkboxGroups[cb.name] = [];
        if (cb.checked) checkboxGroups[cb.name].push(cb.value);
    });
    data.checkboxes = checkboxGroups;

    // Maßnahmen (Vorgeschichte)
    data.massnahmen = [];
    document.querySelectorAll('#ds_massnahmen_container .ds-massnahme-row').forEach(row => {
        const massnahme = {
            zeitraum: row.querySelector('.ds_massnahme_zeitraum')?.value || '',
            klasse: row.querySelector('.ds_massnahme_klasse')?.value || '',
            art: row.querySelector('.ds_massnahme_art')?.value || '',
            akteur: row.querySelector('.ds_massnahme_akteur')?.value || ''
        };
        if (massnahme.zeitraum || massnahme.art) data.massnahmen.push(massnahme);
    });

    // Aktuelle Maßnahmen
    data.aktuelleMassnahmen = [];
    document.querySelectorAll('#ds_aktuelle_massnahmen_container .ds-massnahme-row').forEach(row => {
        const massnahme = {
            zeitraum: row.querySelector('.ds_aktuelle_massnahme_zeitraum')?.value || '',
            klasse: row.querySelector('.ds_aktuelle_massnahme_klasse')?.value || '',
            art: row.querySelector('.ds_aktuelle_massnahme_art')?.value || '',
            akteur: row.querySelector('.ds_aktuelle_massnahme_akteur')?.value || ''
        };
        if (massnahme.zeitraum || massnahme.art) data.aktuelleMassnahmen.push(massnahme);
    });

    // Beobachtungen
    data.beobachtungen = [];
    document.querySelectorAll('#ds_beobachtungen_container .ds-beobachtung-block').forEach(block => {
        // Checkbox-Werte sammeln
        const posChecks = [];
        const negChecks = [];
        const interChecks = [];
        block.querySelectorAll('.ds_beob_pos:checked').forEach(cb => posChecks.push(cb.value));
        block.querySelectorAll('.ds_beob_neg:checked').forEach(cb => negChecks.push(cb.value));
        block.querySelectorAll('.ds_beob_inter:checked').forEach(cb => interChecks.push(cb.value));

        const beob = {
            datum: block.querySelector('.ds_beobachtung_datum')?.value || '',
            dauer: block.querySelector('.ds_beobachtung_dauer')?.value || '',
            setting: block.querySelector('.ds_beobachtung_setting')?.value || '',
            beobachter: block.querySelector('.ds_beobachtung_beobachter')?.value || '',
            positivChecks: posChecks,
            negativChecks: negChecks,
            interaktionChecks: interChecks,
            positiv: block.querySelector('.ds_beobachtung_positiv')?.value || '',
            negativ: block.querySelector('.ds_beobachtung_negativ')?.value || '',
            zusammenfassung: block.querySelector('.ds_beobachtung_zusammenfassung')?.value || ''
        };
        if (beob.datum || beob.zusammenfassung || posChecks.length > 0 || negChecks.length > 0) data.beobachtungen.push(beob);
    });

    // Interventionen
    data.interventionen = [];
    document.querySelectorAll('#ds_interventionen_container .ds-intervention-row').forEach(row => {
        const interv = {
            datum: row.querySelector('.ds_intervention_datum')?.value || '',
            art: row.querySelector('.ds_intervention_art')?.value || ''
        };
        if (interv.datum || interv.art) data.interventionen.push(interv);
    });

    // Geschwister
    data.geschwister = [];
    const anzahl = parseInt(document.getElementById('ds_geschwister_anzahl')?.value) || 0;
    for (let i = 1; i <= anzahl; i++) {
        const name = document.getElementById(`ds_geschwister_${i}_name`)?.value;
        const alter = document.getElementById(`ds_geschwister_${i}_alter`)?.value;
        const bemerkung = document.getElementById(`ds_geschwister_${i}_bemerkung`)?.value;
        if (name || alter) {
            data.geschwister.push({ name, alter, bemerkung });
        }
    }

    return data;
}

// DS Daten laden
function loadDSData(data) {
    if (!data) return;

    // Einfache Felder
    for (const [id, value] of Object.entries(data)) {
        if (id === 'checkboxes' || id === 'massnahmen' || id === 'aktuelleMassnahmen' ||
            id === 'beobachtungen' || id === 'interventionen' || id === 'geschwister') continue;

        const el = document.getElementById(id);
        if (el && value) {
            el.value = value;
            // Trigger change event für conditional fields
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    // Checkboxen
    if (data.checkboxes) {
        for (const [name, values] of Object.entries(data.checkboxes)) {
            values.forEach(val => {
                const cb = document.querySelector(`input[name="${name}"][value="${val}"]`);
                if (cb) {
                    cb.checked = true;
                    cb.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        }
    }

    // Geschwister
    if (data.geschwister && data.geschwister.length > 0) {
        document.getElementById('ds_geschwister_anzahl').value = data.geschwister.length;
        updateGeschwisterFields();
        data.geschwister.forEach((g, i) => {
            const idx = i + 1;
            if (document.getElementById(`ds_geschwister_${idx}_name`)) {
                document.getElementById(`ds_geschwister_${idx}_name`).value = g.name || '';
                document.getElementById(`ds_geschwister_${idx}_alter`).value = g.alter || '';
                document.getElementById(`ds_geschwister_${idx}_bemerkung`).value = g.bemerkung || '';
            }
        });
    }

    // Maßnahmen (Vorgeschichte) wiederherstellen
    if (data.massnahmen && data.massnahmen.length > 0) {
        const massnahmenContainer = document.getElementById('ds_massnahmen_container');
        if (massnahmenContainer) {
            // Bestehende Zeilen entfernen (außer der ersten leeren)
            while (massnahmenContainer.children.length > 1) {
                massnahmenContainer.lastChild.remove();
            }
            data.massnahmen.forEach((m, i) => {
                if (i > 0 || !massnahmenContainer.querySelector('.ds-massnahme-row')) {
                    addMassnahmeRow();
                }
                const rows = massnahmenContainer.querySelectorAll('.ds-massnahme-row');
                const row = rows[i];
                if (row) {
                    const zeitraum = row.querySelector('.ds_massnahme_zeitraum');
                    const klasse = row.querySelector('.ds_massnahme_klasse');
                    const art = row.querySelector('.ds_massnahme_art');
                    const akteur = row.querySelector('.ds_massnahme_akteur');
                    if (zeitraum) zeitraum.value = m.zeitraum || '';
                    if (klasse) klasse.value = m.klasse || '';
                    if (art) art.value = m.art || '';
                    if (akteur) akteur.value = m.akteur || '';
                }
            });
        }
    }

    // Aktuelle Maßnahmen wiederherstellen
    if (data.aktuelleMassnahmen && data.aktuelleMassnahmen.length > 0) {
        const aktContainer = document.getElementById('ds_aktuelle_massnahmen_container');
        if (aktContainer) {
            while (aktContainer.children.length > 1) {
                aktContainer.lastChild.remove();
            }
            data.aktuelleMassnahmen.forEach((m, i) => {
                if (i > 0 || !aktContainer.querySelector('.ds-massnahme-row')) {
                    addAktuelleMassnahmeRow();
                }
                const rows = aktContainer.querySelectorAll('.ds-massnahme-row');
                const row = rows[i];
                if (row) {
                    const zeitraum = row.querySelector('.ds_aktuelle_massnahme_zeitraum');
                    const klasse = row.querySelector('.ds_aktuelle_massnahme_klasse');
                    const art = row.querySelector('.ds_aktuelle_massnahme_art');
                    const akteur = row.querySelector('.ds_aktuelle_massnahme_akteur');
                    if (zeitraum) zeitraum.value = m.zeitraum || '';
                    if (klasse) klasse.value = m.klasse || '';
                    if (art) art.value = m.art || '';
                    if (akteur) akteur.value = m.akteur || '';
                }
            });
        }
    }

    // Beobachtungen wiederherstellen
    if (data.beobachtungen && data.beobachtungen.length > 0) {
        const beobContainer = document.getElementById('ds_beobachtungen_container');
        if (beobContainer) {
            beobContainer.innerHTML = '';
            data.beobachtungen.forEach(b => {
                addBeobachtungBlock();
                const blocks = beobContainer.querySelectorAll('.ds-beobachtung-block');
                const block = blocks[blocks.length - 1];
                if (block) {
                    const datum = block.querySelector('.ds_beobachtung_datum');
                    const dauer = block.querySelector('.ds_beobachtung_dauer');
                    const setting = block.querySelector('.ds_beobachtung_setting');
                    const beobachter = block.querySelector('.ds_beobachtung_beobachter');
                    const positiv = block.querySelector('.ds_beobachtung_positiv');
                    const negativ = block.querySelector('.ds_beobachtung_negativ');
                    const zusammenfassung = block.querySelector('.ds_beobachtung_zusammenfassung');
                    if (datum) datum.value = b.datum || '';
                    if (dauer) dauer.value = b.dauer || '';
                    if (setting) setting.value = b.setting || '';
                    if (beobachter) beobachter.value = b.beobachter || '';
                    if (positiv) positiv.value = b.positiv || '';
                    if (negativ) negativ.value = b.negativ || '';
                    if (zusammenfassung) zusammenfassung.value = b.zusammenfassung || '';
                    // Checkboxen wiederherstellen
                    if (b.positivChecks) b.positivChecks.forEach(v => {
                        const cb = block.querySelector(`.ds_beob_pos[value="${v}"]`);
                        if (cb) cb.checked = true;
                    });
                    if (b.negativChecks) b.negativChecks.forEach(v => {
                        const cb = block.querySelector(`.ds_beob_neg[value="${v}"]`);
                        if (cb) cb.checked = true;
                    });
                    if (b.interaktionChecks) b.interaktionChecks.forEach(v => {
                        const cb = block.querySelector(`.ds_beob_inter[value="${v}"]`);
                        if (cb) cb.checked = true;
                    });
                }
            });
        }
    }

    // Interventionen wiederherstellen
    if (data.interventionen && data.interventionen.length > 0) {
        const intContainer = document.getElementById('ds_interventionen_container');
        if (intContainer) {
            while (intContainer.children.length > 1) {
                intContainer.lastChild.remove();
            }
            data.interventionen.forEach((interv, i) => {
                if (i > 0 || !intContainer.querySelector('.ds-intervention-row')) {
                    addInterventionRow();
                }
                const rows = intContainer.querySelectorAll('.ds-intervention-row');
                const row = rows[i];
                if (row) {
                    const datum = row.querySelector('.ds_intervention_datum');
                    const art = row.querySelector('.ds_intervention_art');
                    if (datum) datum.value = interv.datum || '';
                    if (art) art.value = interv.art || '';
                }
            });
        }
    }

    // Diagnosen Details anzeigen
    if (data.checkboxes && data.checkboxes.ds_diagnose) {
        data.checkboxes.ds_diagnose.forEach(d => toggleDiagnoseDetails(d));
    }

    // Ereignisse Details anzeigen
    if (data.checkboxes && data.checkboxes.ds_ereignis) {
        data.checkboxes.ds_ereignis.forEach(e => toggleEreignisDetails(e));
    }
}

// ==========================================
// TEXT GENERIERUNG FÜR DS
// ==========================================
