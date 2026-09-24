// ELDiB Daten - Alle Items mit Zielformulierungen

// Stufen-Alter-Mapping (sozio-emotionales Entwicklungsalter in Jahren)
const STUFEN_ALTER_MAPPING = {
    1: { min: 0, max: 2, name: "Stufe I", beschreibung: "0-2 Jahre" },
    2: { min: 2, max: 5, name: "Stufe II", beschreibung: "2-5 Jahre" },
    3: { min: 6, max: 9, name: "Stufe III", beschreibung: "6-9 Jahre" },
    4: { min: 10, max: 12, name: "Stufe IV", beschreibung: "10-12 Jahre" },
    5: { min: 12, max: 16, name: "Stufe V", beschreibung: "12-16 Jahre" }
};

const STUFEN_ALTER_MAPPING_FR = {
    1: { min: 0, max: 2, name: "Stade I", beschreibung: "0-2 ans" },
    2: { min: 2, max: 5, name: "Stade II", beschreibung: "2-5 ans" },
    3: { min: 6, max: 9, name: "Stade III", beschreibung: "6-9 ans" },
    4: { min: 10, max: 12, name: "Stade IV", beschreibung: "10-12 ans" },
    5: { min: 12, max: 16, name: "Stade V", beschreibung: "12-16 ans" }
};

const STUFEN_ALTER_MAPPING_EN = {
    1: { min: 0, max: 2, name: "Stage I", beschreibung: "0-2 years" },
    2: { min: 2, max: 5, name: "Stage II", beschreibung: "2-5 years" },
    3: { min: 6, max: 9, name: "Stage III", beschreibung: "6-9 years" },
    4: { min: 10, max: 12, name: "Stage IV", beschreibung: "10-12 years" },
    5: { min: 12, max: 16, name: "Stage V", beschreibung: "12-16 years" }
};

// Berechnet das Alter des Schülers in Jahren
function getSchuelerAlter() {
    const geburtsdatumInput = document.getElementById('geburtsdatum');
    if (!geburtsdatumInput || !geburtsdatumInput.value) return null;

    const geburtsdatum = new Date(geburtsdatumInput.value);
    const heute = new Date();
    let alter = heute.getFullYear() - geburtsdatum.getFullYear();
    const monatsDiff = heute.getMonth() - geburtsdatum.getMonth();

    if (monatsDiff < 0 || (monatsDiff === 0 && heute.getDate() < geburtsdatum.getDate())) {
        alter--;
    }

    return alter;
}

// Holt Item-Info aus dem Code (z.B. "V-5" -> { bereich: "verhalten", stufe: 1, nr: 5 })
function getItemInfoFromCode(code) {
    const bereichMap = {
        'V': 'verhalten',
        'K': 'kommunikation',
        'SOZ': 'sozialisation',
        'KOG': 'kognition',
        // Französische Code-Präfixe (display-only) auf die internen Schlüssel mappen
        'COMP': 'verhalten',
        'COMM': 'kommunikation',
        'COM': 'kommunikation',   // ältere Anzeige (vor COMM) und Englisch
        'BEH': 'verhalten',
        'SOC': 'sozialisation',
        'COG': 'kognition'
    };

    const parts = code.split('-');
    const bereichCode = parts[0];
    const itemNr = parseInt(parts[1]);

    const bereich = bereichMap[bereichCode];
    if (!bereich || !ELDIB_DATA[bereich]) return null;

    // Finde die Stufe für dieses Item
    for (const [stufeNr, stufeData] of Object.entries(ELDIB_DATA[bereich].stufen)) {
        const item = stufeData.items.find(i => i.code === code);
        if (item) {
            return { bereich, stufe: parseInt(stufeNr), nr: item.nr, item };
        }
    }
    return null;
}

// Prüft ob ein Item als "Ziel" markiert werden kann
function canSetZiel(code) {
    const itemInfo = getItemInfoFromCode(code);
    if (!itemInfo) return { allowed: true };

    const { bereich, stufe, nr } = itemInfo;

    // Regel 1: Prüfe ob ein vorheriges Item "nicht erreicht" ist
    // Gehe durch alle Stufen und Items vor diesem Item
    for (let s = 1; s <= stufe; s++) {
        const stufeData = ELDIB_DATA[bereich].stufen[s];
        if (!stufeData) continue;

        for (const item of stufeData.items) {
            // Wenn wir beim aktuellen Item angekommen sind, aufhören
            if (s === stufe && item.nr >= nr) break;

            const selection = state.selections[item.code];
            if (selection && selection.status === 'nicht-erreicht') {
                const lng = state.language;
                const dispCode = getDisplayCode(item.code);
                let message;
                if (lng === 'en') {
                    message = `Goal not possible: ${dispCode} is marked as "not mastered". The earlier developmental steps have to be mastered first.`;
                } else if (lng === 'fr') {
                    message = `Objectif impossible : ${dispCode} est marqué comme « non atteint ». Les étapes de développement précédentes doivent d'abord être atteintes.`;
                } else {
                    message = `Ziel nicht möglich: ${dispCode} ist als "nicht erreicht" markiert. Erreichen Sie zuerst die vorherigen Entwicklungsstufen.`;
                }
                return { allowed: false, reason: 'nicht-erreicht', blockingItem: item.code, message };
            }
        }
    }

    // Regel 2: Prüfe Altersgrenze
    // Ziel möglich, sobald das Kind die Stufe erreicht hat (Alter >= min der Stufe).
    // Beispiel: 9-Jähriger ist altersgerecht in Stufe III (6-9) -> Ziele dort erlaubt.
    // Blockiert werden nur Stufen, die das Kind altersmäßig noch gar nicht erreicht hat.
    const alter = getSchuelerAlter();
    if (alter !== null) {
        const stufeAlter = getCurrentStufen()[stufe]; // Stufenname/Alter in der aktuellen Sprache
        if (stufeAlter && alter < stufeAlter.min) {
            const lng = state.language;
            let message;
            if (lng === 'en') {
                message = `Goal not possible: the student is ${alter} years old. ${stufeAlter.name} (${stufeAlter.beschreibung}) has not yet been reached in terms of age.`;
            } else if (lng === 'fr') {
                message = `Objectif impossible : l'élève a ${alter} ans. Le ${stufeAlter.name} (${stufeAlter.beschreibung}) n'est pas encore atteint du point de vue de l'âge.`;
            } else {
                message = `Ziel nicht möglich: Der Schüler ist ${alter} Jahre alt. ${stufeAlter.name} (${stufeAlter.beschreibung}) wurde biologisch noch nicht erreicht.`;
            }
            return { allowed: false, reason: 'alter', message };
        }
    }

    // Regel 3: Maximal 4 Ziele pro Bereich
    const zieleImBereich = countZieleInBereich(bereich);
    if (zieleImBereich >= 4) {
        const lng = state.language;
        const bereichName = getCurrentEldibData()[bereich]?.name || bereich;
        let message;
        if (lng === 'en') {
            message = `Goal not possible: the ${bereichName} domain already has 4 goals (maximum 4 goals per domain).`;
        } else if (lng === 'fr') {
            message = `Objectif impossible : le domaine ${bereichName} a déjà 4 objectifs (maximum 4 objectifs par domaine).`;
        } else {
            message = `Ziel nicht möglich: Der Bereich ${bereichName} hat bereits 4 Ziele. Maximal 4 Ziele pro Bereich erlaubt.`;
        }
        return { allowed: false, reason: 'max-ziele', message };
    }

    return { allowed: true };
}

// Zählt die Anzahl der als "Ziel" markierten Items in einem Bereich
function countZieleInBereich(bereich) {
    let count = 0;
    const bereichData = ELDIB_DATA[bereich];
    if (!bereichData) return 0;
    for (const [stufeNr, stufeData] of Object.entries(bereichData.stufen)) {
        for (const item of stufeData.items) {
            const selection = state.selections[item.code];
            if (selection && selection.status === 'ziel') {
                count++;
            }
        }
    }
    return count;
}

// Zeigt Blockade-Nachricht als Toast
function showBlockadeMessage(message) {
    // Entferne bestehende Toasts
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'toast toast-warning';
    toast.innerHTML = `⚠️ ${message}`;
    toast.style.cssText = `
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(217, 119, 6, 0.95)) !important;
        max-width: 400px;
        line-height: 1.5;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

// Aktualisiert die Altersanzeige und blockierte Buttons
function updateAlterAnzeige() {
    const alter = getSchuelerAlter();
    const anzeige = document.getElementById('alter-anzeige');

    if (alter !== null && anzeige) {
        anzeige.textContent = alterText(alter);
        anzeige.classList.remove('hidden');

        // Aktualisiere alle blockierten Ziel-Buttons basierend auf Alter
        updateAllBlockedButtonsByAge();
    } else if (anzeige) {
        anzeige.classList.add('hidden');
    }

    if (!isLoadingData) saveToLocalStorage();
}

// Aktualisiert alle Ziel-Buttons (Alter, "nicht erreicht", max. 4 Ziele).
// Dieselbe Regel wie beim Klick (canSetZiel): Ziele sind ab dem Mindestalter der Stufe möglich.
// (Früher galt hier noch die alte Regel "Alter > Maximum der Stufe" mit deutschem Hinweis.)
function updateAllBlockedButtonsByAge() {
    for (const bereichData of Object.values(ELDIB_DATA)) {
        for (const stufeData of Object.values(bereichData.stufen)) {
            for (const item of stufeData.items) {
                const zielBtn = document.querySelector(`#item-${item.code} .option-btn.ziel`);
                if (!zielBtn) continue;
                const check = canSetZiel(item.code);
                const isCurrentlyZiel = state.selections[item.code]?.status === 'ziel';
                if (check.allowed || isCurrentlyZiel) {
                    zielBtn.classList.remove('blocked');
                    zielBtn.title = '';
                } else {
                    zielBtn.classList.add('blocked');
                    zielBtn.title = check.message;
                }
            }
        }
    }
}
