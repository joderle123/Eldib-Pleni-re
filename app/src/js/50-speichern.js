function saveData() {
    const data = {
        language: state.language,
        selections: state.selections,
        stammdaten: getStammdaten(),
        dsData: getDSData(),
        zusaetzlicheZiele: state.zusaetzlicheZiele,
        bereichNotizen: {
            verhalten: document.getElementById('notizen-verhalten')?.value || '',
            kommunikation: document.getElementById('notizen-kommunikation')?.value || '',
            sozialisation: document.getElementById('notizen-sozialisation')?.value || '',
            kognition: document.getElementById('notizen-kognition')?.value || '',
            zusaetzlich: document.getElementById('notizen-zusaetzlich')?.value || ''
        },
        savedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `eldib_${data.stammdaten.schueler_name || 'export'}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

function loadData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            // Save loaded data to localStorage before reload so it persists
            localStorage.setItem('eldib-data', JSON.stringify(data));
            location.reload();
        } catch (err) { alert('Fehler: ' + err.message); }
    };
    reader.readAsText(file);
}

function resetAllData() {
    if (!confirm('Sind Sie sicher, dass Sie alle Daten löschen möchten?\n\nAlle Schülerdaten und Auswahlen werden unwiderruflich gelöscht!')) {
        return;
    }

    // Clear localStorage
    localStorage.removeItem('eldib-data');

    // Reset state
    state.selections = {};
    state.zusaetzlicheZiele = {
        demarches_mentales: {},
        manieres_apprendre: {},
        attitudes_relationnelles: {},
        attitudes_affectives: {},
        competences_essentielles: {},
        culture_loisirs: {}
    };

    // Show toast and reload
    showToast('Alle Daten wurden gelöscht');
    setTimeout(() => location.reload(), 500);
}

// Period type state (trimester or semester)
let periodenTyp = 'trimester';
let isLoadingData = false;

// Hilfsfunktion für einheitliche Dateinamen: YYYYMMDD_NACHNAME_Vorname_CDSE_Typ.docx
function buildFilename(docType) {
    const stammdaten = getStammdaten();
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const datum = `${y}${m}${d}`;

    const name = stammdaten.schueler_name || 'Export';
    const parts = name.split(',').map(s => s.trim());
    const nachname = (parts[0] || 'Export').toUpperCase().replace(/\s+/g, '-');
    const vorname = (parts[1] || '').replace(/\s+/g, '-');
    const namePart = vorname ? `${nachname}_${vorname}` : nachname;

    return `${datum}_${namePart}_CDSE_${docType}.docx`;
}

function setPeriodType(type) {
    periodenTyp = type;
    const btnTrimester = document.getElementById('btn-trimester');
    const btnSemester = document.getElementById('btn-semester');
    const periodeSelect = document.getElementById('periode');
    const periodeLabel = document.getElementById('periode-label');

    if (type === 'trimester') {
        btnTrimester.classList.add('active');
        btnSemester.classList.remove('active');
        periodeLabel.textContent = 'Trimester';
        periodeSelect.innerHTML = `
            <option value="1">Trimester 1</option>
            <option value="2">Trimester 2</option>
            <option value="3">Trimester 3</option>
        `;
    } else {
        btnSemester.classList.add('active');
        btnTrimester.classList.remove('active');
        periodeLabel.textContent = 'Semester';
        periodeSelect.innerHTML = `
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
        `;
    }
    if (!isLoadingData) saveToLocalStorage();
}

function getStammdaten() {
    return {
        schueler_name: document.getElementById('schueler_name')?.value || '',
        geburtsdatum: document.getElementById('geburtsdatum')?.value || '',
        matricule: document.getElementById('matricule')?.value || '',
        foerderort: document.getElementById('foerderort')?.value || '',
        klasse: document.getElementById('klasse')?.value || '',
        schuljahr: document.getElementById('schuljahr')?.value || '',
        periodenTyp: periodenTyp,
        periode: document.getElementById('periode')?.value || '',
        einschaetzungsdatum: document.getElementById('einschaetzungsdatum')?.value || '',
        einschaetzende: document.getElementById('einschaetzende')?.value || '',
        eltern1_name: document.getElementById('eltern1_name')?.value || '',
        eltern1_tel: document.getElementById('eltern1_tel')?.value || '',
        eltern1_email: document.getElementById('eltern1_email')?.value || ''
    };
}

// ELDiB structure - exact item distribution per NIVEAU
