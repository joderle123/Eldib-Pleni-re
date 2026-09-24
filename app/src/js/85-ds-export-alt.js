const DS_STAGE_DATA = {
    1: { ageMin: 0, ageMax: 2, ageMid: 1, label: "0-2 Jahre", angst: "Verlassenheit", beschreibung: "Grundlegendes Vertrauen aufbauen" },
    2: { ageMin: 2, ageMax: 5, ageMid: 3.5, label: "2-5 Jahre", angst: "Unzulänglichkeit", beschreibung: "Autonomie und Selbstwirksamkeit entwickeln" },
    3: { ageMin: 6, ageMax: 9, ageMid: 7.5, label: "6-9 Jahre", angst: "Schuld", beschreibung: "Initiative und Kompetenz erwerben" },
    4: { ageMin: 10, ageMax: 12, ageMid: 11, label: "10-12 Jahre", angst: "Konflikt", beschreibung: "Soziale Rollen und Beziehungen gestalten" },
    5: { ageMin: 13, ageMax: 16, ageMid: 14.5, label: "13-16 Jahre", angst: "Identität", beschreibung: "Identität und Werte entwickeln" }
};

// DS Hilfsfunktionen
function dsGetStageForAge(age) {
    if (age <= 2) return 1;
    if (age <= 5) return 2;
    if (age <= 9) return 3;
    if (age <= 12) return 4;
    return 5;
}

function dsGetStageRoman(stage) {
    const romans = {1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V'};
    return romans[stage] || stage;
}

function dsGetStageDescription(stage) {
    if (state.language === 'fr') {
        const labels = { 1: "0-2 ans", 2: "2-5 ans", 3: "6-9 ans", 4: "10-12 ans", 5: "12-16 ans" };
        return labels[stage] || '';
    }
    if (state.language === 'en') {
        const labels = { 1: "0-2 years", 2: "2-5 years", 3: "6-9 years", 4: "10-12 years", 5: "12-16 years" };
        return labels[stage] || '';
    }
    return DS_STAGE_DATA[stage]?.label || '';
}

function dsGetStageRichtziel(stage) {
    if (state.language === 'fr') {
        const richtziele = {
            1: "Réagir avec plaisir à l'environnement",
            2: "Réagir avec succès à l'environnement",
            3: "Acquérir des compétences pour participer avec succès en groupe",
            4: "S'impliquer dans les processus de groupe",
            5: "Appliquer les compétences dans de nouvelles situations"
        };
        return richtziele[stage] || '';
    }
    if (state.language === 'en') {
        const richtziele = {
            1: "Responding to the environment with pleasure",
            2: "Responding to the environment with success",
            3: "Acquiring skills for successful participation in a group",
            4: "Investing in group processes",
            5: "Applying skills in new situations"
        };
        return richtziele[stage] || '';
    }
    const richtziele = {
        1: "Mit Freude auf die Umwelt reagieren",
        2: "Erfolgreich auf die Umwelt reagieren",
        3: "Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen",
        4: "Sich einbringen in Gruppenprozesse",
        5: "Anwenden von Fähigkeiten in neuen Situationen"
    };
    return richtziele[stage] || '';
}

function dsGetDomainName(domain) {
    if (state.language === 'fr') {
        const names = { verhalten: 'Comportement', kommunikation: 'Communication', sozialisation: 'Socialisation', kognition: 'Cognition' };
        return names[domain] || domain;
    }
    if (state.language === 'en') {
        const names = { verhalten: 'Behavior', kommunikation: 'Communication', sozialisation: 'Socialization', kognition: 'Academics/Cognition' };
        return names[domain] || domain;
    }
    const names = { verhalten: 'Verhalten', kommunikation: 'Kommunikation', sozialisation: 'Sozialisation', kognition: 'Kognition' };
    return names[domain] || domain;
}

function dsGetDomainCode(domain) {
    const codes = {
        verhalten: 'V',
        kommunikation: 'K',
        sozialisation: 'SOZ',
        kognition: 'KOG'
    };
    return codes[domain] || domain.toUpperCase();
}

function dsCalculateBiologicalAge(birthDate) {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let years = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        years--;
    }
    let months = today.getMonth() - birth.getMonth();
    if (today.getDate() < birth.getDate()) months--;
    if (months < 0) months += 12;
    return { years: years, months: months, decimal: years + (months / 12) };
}

function dsGetGoalsForDomain(domain) {
    const goals = [];
    const bereichData = getCurrentEldibData()[domain];
    if (!bereichData) return goals;

    for (const [stufeNr, stufe] of Object.entries(bereichData.stufen)) {
        for (const item of stufe.items) {
            const selection = state.selections[item.code];
            if (selection && selection.status === 'ziel') {
                goals.push({
                    code: item.code,
                    nr: item.nr,
                    keyword: item.keyword,
                    description: item.description,
                    zieltext: resolveZieltext(item.code, selection),
                    stufe: parseInt(stufeNr)
                });
            }
        }
    }
    return goals.sort((a, b) => a.nr - b.nr);
}

function dsGetReachedForDomain(domain) {
    const reached = [];
    const bereichData = getCurrentEldibData()[domain];
    if (!bereichData) return reached;

    for (const [stufeNr, stufe] of Object.entries(bereichData.stufen)) {
        for (const item of stufe.items) {
            const selection = state.selections[item.code];
            if (selection && selection.status === 'erreicht') {
                reached.push({
                    code: item.code,
                    nr: item.nr,
                    keyword: item.keyword,
                    description: item.description,
                    stufe: parseInt(stufeNr)
                });
            }
        }
    }
    return reached.sort((a, b) => a.nr - b.nr);
}

function dsCalculateDevelopmentalAge(domain) {
    const reached = dsGetReachedForDomain(domain);
    if (reached.length === 0) return 0;

    const highestReached = reached[reached.length - 1];
    const stage = highestReached.stufe;
    const stageData = DS_STAGE_DATA[stage];

    // Calculate position within stage
    const bereichData = ELDIB_DATA[domain];
    const stufeItems = bereichData.stufen[stage]?.items || [];
    const totalInStage = stufeItems.length;
    const reachedInStage = reached.filter(r => r.stufe === stage).length;

    const completionPercent = reachedInStage / totalInStage;
    const ageRange = stageData.ageMax - stageData.ageMin;
    return stageData.ageMin + (ageRange * completionPercent);
}

function dsCalculateAllDevelopmentalAges() {
    return {
        verhalten: dsCalculateDevelopmentalAge('verhalten'),
        kommunikation: dsCalculateDevelopmentalAge('kommunikation'),
        sozialisation: dsCalculateDevelopmentalAge('sozialisation'),
        kognition: dsCalculateDevelopmentalAge('kognition')
    };
}

function dsGetSortedDomainsByAge(devAges) {
    const domains = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'];
    return domains.sort((a, b) => (devAges[b] || 0) - (devAges[a] || 0));
}

function dsGenerate42Section(studentName, devAges) {
    const sortedDomains = dsGetSortedDomainsByAge(devAges);

    let html = '<p style="font-family: Calibri, sans-serif; font-size: 11pt; line-height: 150%; margin: 0 0 8pt 0;"><strong>ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen):</strong> ';
    html += 'Der ELDiB ist ein standardisiertes Einschätzungsinstrument, das dazu dient, die soziale und emotionale ';
    html += 'Entwicklung von Kindern und Jugendlichen im Alter zwischen Geburt und sechzehn Jahren zu erfassen.</p>';

    html += '<p style="font-family: Calibri, sans-serif; font-size: 11pt; line-height: 150%; margin: 0 0 8pt 0;">Die Einschätzung mit dem ELDiB ergab folgendes Entwicklungsprofil für ' + studentName + ':</p>';

    // Zusammenfassende Tabelle
    html += '<table style="width: 100%; border-collapse: collapse; margin: 8pt 0; font-family: Calibri, sans-serif; font-size: 10pt;">';
    html += '<tr>';
    html += '<th style="border: 1pt solid #000000; padding: 4pt; text-align: left; background-color: #BFBFBF; font-weight: bold;">Entwicklungsbereich</th>';
    html += '<th style="border: 1pt solid #000000; padding: 4pt; text-align: center; background-color: #BFBFBF; font-weight: bold;">Stufe</th>';
    html += '<th style="border: 1pt solid #000000; padding: 4pt; text-align: center; background-color: #BFBFBF; font-weight: bold;">Entwicklungsalter</th>';
    html += '<th style="border: 1pt solid #000000; padding: 4pt; text-align: center; background-color: #BFBFBF; font-weight: bold;">Erreichte Items</th>';
    html += '<th style="border: 1pt solid #000000; padding: 4pt; text-align: center; background-color: #BFBFBF; font-weight: bold;">Förderziele</th>';
    html += '</tr>';

    sortedDomains.forEach(domain => {
        const age = devAges[domain] || 0;
        const stage = dsGetStageForAge(age);
        const goals = dsGetGoalsForDomain(domain);
        const reached = dsGetReachedForDomain(domain);
        html += '<tr>';
        html += '<td style="border: 1pt solid #000000; padding: 4pt;"><strong>' + dsGetDomainName(domain) + '</strong></td>';
        html += '<td style="border: 1pt solid #000000; padding: 4pt; text-align: center;">Stufe ' + dsGetStageRoman(stage) + '</td>';
        html += '<td style="border: 1pt solid #000000; padding: 4pt; text-align: center;">' + age.toFixed(1) + ' Jahre</td>';
        html += '<td style="border: 1pt solid #000000; padding: 4pt; text-align: center;">' + reached.length + '</td>';
        html += '<td style="border: 1pt solid #000000; padding: 4pt; text-align: center;">' + goals.length + '</td>';
        html += '</tr>';
    });
    html += '</table>';

    // Detaillierte Beschreibung pro Bereich
    sortedDomains.forEach((domain, index) => {
        const age = devAges[domain] || 0;
        const stage = dsGetStageForAge(age);
        const goals = dsGetGoalsForDomain(domain);
        const reached = dsGetReachedForDomain(domain);
        const domainLabel = dsGetDomainName(domain);

        let positionText = '';
        const sName = studentName || 'der/die Schüler:in';
        if (index === 0) {
            positionText = 'Am weitesten entwickelt zeigt sich ' + sName + ' im Bereich ';
        } else if (index === sortedDomains.length - 1) {
            positionText = 'Den größten Förderbedarf weist ' + sName + ' im Bereich ';
        } else {
            positionText = 'Im Bereich ';
        }

        html += '<p style="font-family: Calibri, sans-serif; font-size: 11pt; line-height: 150%; margin: 8pt 0;">' + positionText + '<strong>' + domainLabel + '</strong>';
        html += ' befindet sich ' + sName + ' auf Entwicklungsstufe ' + dsGetStageRoman(stage) + ' (' + dsGetStageDescription(stage) + ')';
        html += ' mit einem Entwicklungsalter von ' + age.toFixed(1) + ' Jahren. Das Richtziel dieser Stufe lautet: ';
        html += '<em>„' + dsGetStageRichtziel(stage) + '"</em>.';

        if (reached.length > 0) {
            html += ' Von ' + reached.length + ' erreichten Kompetenzen gehören zu den zuletzt erreichten: ';
            const lastFour = reached.slice(-4);
            const itemNames = lastFour.map(item => item.code + ' (' + item.keyword + ')');
            html += itemNames.join(', ') + '.';
        }

        if (goals.length > 0) {
            html += ' Als Förderziele wurden ' + goals.length + ' Item(s) definiert: ';
            const goalNames = goals.map(g => g.code);
            html += goalNames.join(', ') + '.';
        }
        html += '</p>';
    });

    return html;
}

function dsGenerateSMARTGoalsSection() {
    const domains = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'];
    const allGoals = [];

    domains.forEach(domain => {
        const goals = dsGetGoalsForDomain(domain);
        goals.forEach(goal => {
            allGoals.push({
                domain: domain,
                code: goal.code,
                keyword: goal.keyword,
                description: goal.description,
                zieltext: goal.zieltext,
                stufe: goal.stufe
            });
        });
    });

    if (allGoals.length === 0) {
        return '<p style="font-family: Calibri, sans-serif; font-size: 11pt; color: #666666; font-style: italic;">Keine Förderziele im ELDiB definiert.</p>';
    }

    let html = '<table style="width: 100%; border-collapse: collapse; margin: 6pt 0; font-family: Calibri, sans-serif; font-size: 9pt;">';
    html += '<tr>';
    html += '<th style="border: 1pt solid #000000; padding: 4pt; text-align: left; width: 10%; background-color: #BFBFBF; font-weight: bold;">Item</th>';
    html += '<th style="border: 1pt solid #000000; padding: 4pt; text-align: left; width: 18%; background-color: #BFBFBF; font-weight: bold;">Kompetenz</th>';
    html += '<th style="border: 1pt solid #000000; padding: 4pt; text-align: left; width: 32%; background-color: #BFBFBF; font-weight: bold;">Zielformulierung</th>';
    html += '<th style="border: 1pt solid #000000; padding: 4pt; text-align: left; width: 40%; background-color: #BFBFBF; font-weight: bold;">Intervention</th>';
    html += '</tr>';

    allGoals.forEach(goal => {
        const interventions = getInterventionen(goal.code);
        const interventionText = interventions.length > 0 ? interventions.map(i => '• ' + i).join('<br>') : '-';
        html += '<tr>';
        html += '<td style="border: 1pt solid #000000; padding: 4pt; font-weight: bold; vertical-align: top;">' + goal.code + '</td>';
        html += '<td style="border: 1pt solid #000000; padding: 4pt; vertical-align: top;"><strong>' + goal.keyword + '</strong><br><span style="font-size: 8pt;">' + goal.description + '</span></td>';
        html += '<td style="border: 1pt solid #000000; padding: 4pt; vertical-align: top;">' + goal.zieltext + '</td>';
        html += '<td style="border: 1pt solid #000000; padding: 4pt; vertical-align: top;">' + interventionText + '</td>';
        html += '</tr>';
    });

    html += '</table>';
    return html;
}

function dsGenerateGridHTML() {
    // Hilfsfunktion für Farben
    function dsGetItemColor(prefix, nr) {
        const code = `${prefix}-${nr}`;
        const sel = state.selections[code];
        if (sel?.status === 'erreicht') return '#90EE90';
        if (sel?.status === 'ziel') return '#FFFF00';
        return '#FFFFFF';
    }

    // Kompakte Tabelle wie im Original-DS
    let html = '<div style="text-align: center; margin: 4pt 0;">';
    html += '<table style="margin: 0 auto; border-collapse: collapse; font-family: Calibri, sans-serif; font-size: 5pt; line-height: 1;">';

    // Header
    html += '<tr>';
    html += '<td style="border: 1pt solid #000; background: #5B9BD5; color: white; font-weight: bold; text-align: center; padding: 0; width: 24pt; height: 8pt;">V</td>';
    html += '<td style="border: 1pt solid #000; background: #5B9BD5; color: white; font-weight: bold; text-align: center; padding: 0; width: 24pt; height: 8pt;">K</td>';
    html += '<td style="border: 1pt solid #000; background: #5B9BD5; color: white; font-weight: bold; text-align: center; padding: 0; width: 24pt; height: 8pt;">SOZ</td>';
    html += '<td style="border: 1pt solid #000; background: #5B9BD5; color: white; font-weight: bold; text-align: center; padding: 0; width: 24pt; height: 8pt;">KOG</td>';
    html += '<td style="border: 1pt solid #000; background: #BFBFBF; font-weight: bold; text-align: center; padding: 1pt; width: 50pt; font-size: 6pt;">Stufe</td>';
    html += '</tr>';

    // Stufendefinitionen (wie im Original DS)
    const stufen = [
        { label: 'V (13-16 J.)', v: [29,33], k: [30,35], s: [35,41], kog: [57,62] },
        { label: 'IV (10-12 J.)', v: [22,28], k: [23,29], s: [28,34], kog: [50,56] },
        { label: 'III (6-9 J.)', v: [15,21], k: [14,22], s: [18,27], kog: [37,49] },
        { label: 'II (3-5 J.)', v: [9,14], k: [9,13], s: [9,17], kog: [20,36] },
        { label: 'I (0-2 J.)', v: [1,8], k: [1,8], s: [1,8], kog: [1,19] }
    ];

    stufen.forEach(stufe => {
        const maxRows = Math.max(
            stufe.v[1] - stufe.v[0] + 1,
            stufe.k[1] - stufe.k[0] + 1,
            stufe.s[1] - stufe.s[0] + 1,
            stufe.kog[1] - stufe.kog[0] + 1
        );

        for (let i = 0; i < maxRows; i++) {
            html += '<tr>';

            // V
            const vNum = stufe.v[1] - i;
            if (vNum >= stufe.v[0]) {
                const vColor = dsGetItemColor('V', vNum);
                const vTextCol = vColor === '#90EE90' ? '#000' : '#000';
                html += '<td style="border: 1pt solid #000; text-align: center; background: ' + vColor + '; color: ' + vTextCol + '; height: 3pt; padding: 0;">' + vNum + '</td>';
            } else {
                html += '<td style="border: 1pt solid #000; background: #E7E6E6; height: 3pt;"></td>';
            }

            // K
            const kNum = stufe.k[1] - i;
            if (kNum >= stufe.k[0]) {
                const kColor = dsGetItemColor('K', kNum);
                const kTextCol = kColor === '#90EE90' ? '#000' : '#000';
                html += '<td style="border: 1pt solid #000; text-align: center; background: ' + kColor + '; color: ' + kTextCol + '; height: 3pt; padding: 0;">' + kNum + '</td>';
            } else {
                html += '<td style="border: 1pt solid #000; background: #E7E6E6; height: 3pt;"></td>';
            }

            // SOZ
            const sNum = stufe.s[1] - i;
            if (sNum >= stufe.s[0]) {
                const sColor = dsGetItemColor('SOZ', sNum);
                const sTextCol = sColor === '#90EE90' ? '#000' : '#000';
                html += '<td style="border: 1pt solid #000; text-align: center; background: ' + sColor + '; color: ' + sTextCol + '; height: 3pt; padding: 0;">' + sNum + '</td>';
            } else {
                html += '<td style="border: 1pt solid #000; background: #E7E6E6; height: 3pt;"></td>';
            }

            // KOG
            const kogNum = stufe.kog[1] - i;
            if (kogNum >= stufe.kog[0]) {
                const kogColor = dsGetItemColor('KOG', kogNum);
                const kogTextCol = kogColor === '#90EE90' ? '#000' : '#000';
                html += '<td style="border: 1pt solid #000; text-align: center; background: ' + kogColor + '; color: ' + kogTextCol + '; height: 3pt; padding: 0;">' + kogNum + '</td>';
            } else {
                html += '<td style="border: 1pt solid #000; background: #E7E6E6; height: 3pt;"></td>';
            }

            // Stufe Label nur in erster Zeile
            if (i === 0) {
                html += '<td style="border: 1pt solid #000; background: #BFBFBF; font-weight: bold; text-align: center; padding: 1pt; font-size: 6pt;" rowspan="' + maxRows + '">' + stufe.label + '</td>';
            }

            html += '</tr>';
        }
    });

    html += '</table></div>';
    return html;
}

function dsGenerateVisualAgeComparisonHTML(domainName, domainColor, bioAge, devAge, maxAge) {
    if (!maxAge) maxAge = 18;
    const bioWidth = bioAge > 0 ? Math.min((bioAge / maxAge) * 100, 100) : 0;
    const devWidth = devAge > 0 ? Math.min((devAge / maxAge) * 100, 100) : 0;
    const diff = bioAge - devAge;
    const diffText = diff > 0 ? diff.toFixed(1) + ' Jahre Differenz' : 'Altersgemäß';
    const diffColor = diff > 2 ? '#c0392b' : (diff > 0 ? '#e67e22' : '#27ae60');

    return '<div style="margin-bottom:15pt;">' +
        '<div style="display:table; width:100%; margin-bottom:5pt;">' +
            '<span style="display:table-cell; font-weight:bold; font-size:11pt; color:' + domainColor + ';">' + domainName + '</span>' +
            '<span style="display:table-cell; text-align:right; font-size:10pt; color:' + diffColor + '; font-weight:bold;">' + diffText + '</span>' +
        '</div>' +
        '<table style="width:100%; border-collapse:collapse; margin:5pt 0;">' +
            '<tr>' +
                '<td style="width:100pt; padding:3pt 8pt 3pt 0; font-size:9pt; color:#3498db; font-weight:bold;">Bio. Alter: ' + bioAge.toFixed(1) + ' J.</td>' +
                '<td style="padding:3pt;">' +
                    '<table style="width:100%; height:18pt; border-collapse:collapse; border:1px solid #bdc3c7;">' +
                        '<tr>' +
                            '<td style="width:' + bioWidth + '%; background:#3498db; height:18pt;"></td>' +
                            '<td style="background:#ecf0f1; height:18pt;"></td>' +
                        '</tr>' +
                    '</table>' +
                '</td>' +
            '</tr>' +
            '<tr>' +
                '<td style="width:100pt; padding:3pt 8pt 3pt 0; font-size:9pt; color:#0097A7; font-weight:bold;">Entw. Alter: ' + devAge.toFixed(1) + ' J.</td>' +
                '<td style="padding:3pt;">' +
                    '<table style="width:100%; height:18pt; border-collapse:collapse; border:1px solid #bdc3c7;">' +
                        '<tr>' +
                            '<td style="width:' + devWidth + '%; background:#0097A7; height:18pt;"></td>' +
                            '<td style="background:#ecf0f1; height:18pt;"></td>' +
                        '</tr>' +
                    '</table>' +
                '</td>' +
            '</tr>' +
        '</table>' +
    '</div>';
}

// Hauptfunktion: Diagnostic Spécialisé exportieren (Template-basiert)
async function exportDS() {
    try {
        showToast('DS wird generiert...');
        await generateDSFromTemplate(false);
    } catch(e) {
        console.error('DS Export Fehler:', e);
        showToast('Fehler beim Generieren des DS: ' + e.message);
    }
}

// Vollständiger DS Export mit allen ausgefüllten Daten (Template-basiert)
async function exportDSComplete() {
    try {
        showToast('Vollständiger DS wird generiert...');
        await generateDSFromTemplate(true);
    } catch(e) {
        console.error('DS Export Fehler:', e);
        showToast('Fehler beim Generieren des DS: ' + e.message);
    }
}

// ==================== ENGLISH SPECIALIZED DIAGNOSTIC (DS) ====================
// Baut den DS ("Specialized Diagnostic") auf Englisch von Grund auf mit docx.js.
// Enthaelt automatisch: Kopfdaten, Entwicklungsprofil (biologisches vs.
// Entwicklungsalter je Bereich), erreichte Items & Foerderziele je Bereich.
// Die Fliesstext-Abschnitte werden als englische Ueberschriften mit Platzhaltern
// eingefuegt (manuell im Word-Dokument zu ergaenzen).
async function generateEnglishDS(isComplete) {
    const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType } = docx;

    const stammdaten = getStammdaten();
    const studentName = getVornameForText(stammdaten.schueler_name) || 'the student';
    const devAges = dsCalculateAllDevelopmentalAges();
    const bioAge = dsCalculateBiologicalAge(stammdaten.geburtsdatum);

    const cellB = {
        top: { style: BorderStyle.SINGLE, size: 4, color: '666666' },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: '666666' },
        left: { style: BorderStyle.SINGLE, size: 4, color: '666666' },
        right: { style: BorderStyle.SINGLE, size: 4, color: '666666' }
    };
    const th = (t, w) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 20 })] })], borders: cellB, shading: { fill: 'BFBFBF' }, width: w ? { size: w, type: WidthType.PERCENTAGE } : undefined });
    const td = (t, center) => new TableCell({ children: [new Paragraph({ alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT, children: [new TextRun({ text: String(t), size: 20 })] })], borders: cellB });

    const children = [];

    // Title
    children.push(new Paragraph({ children: [new TextRun({ text: 'Specialized Diagnostic (DS)', bold: true, size: 32 })], spacing: { after: 160 } }));

    // Student header
    const gebFormatted = stammdaten.geburtsdatum ? new Date(stammdaten.geburtsdatum).toLocaleDateString('en-GB') : '';
    const line = (label, val) => new Paragraph({ children: [new TextRun({ text: label + ': ', bold: true, size: 22 }), new TextRun({ text: val || '—', size: 22 })], spacing: { after: 40 } });
    children.push(line('Student', stammdaten.schueler_name || ''));
    children.push(line('Date of birth', gebFormatted));
    children.push(line('ID number', stammdaten.matricule || ''));
    children.push(line('School / Class', `${stammdaten.foerderort || '—'} / ${stammdaten.klasse || '—'}`));
    children.push(line('School year', stammdaten.schuljahr || ''));
    children.push(line('Evaluation date', stammdaten.einschaetzungsdatum || ''));
    if (bioAge) children.push(line('Chronological age', `${bioAge.years} years ${bioAge.months} months`));
    children.push(new Paragraph({ spacing: { after: 240 } }));

    // DTORF-R intro
    children.push(new Paragraph({ children: [new TextRun({ text: 'DTORF-R (Developmental Teaching Objectives Rating Form): ', bold: true, size: 22 }), new TextRun({ text: 'The DTORF-R is a standardized assessment instrument used to capture the social and emotional development of children and adolescents from birth to sixteen years of age.', size: 22 })], spacing: { after: 160 } }));
    children.push(new Paragraph({ children: [new TextRun({ text: `The DTORF-R assessment yielded the following developmental profile for ${studentName}:`, size: 22 })], spacing: { after: 120 } }));

    // Developmental profile summary table
    const sortedDomains = dsGetSortedDomainsByAge(devAges);
    const profileRows = [new TableRow({ children: [
        th('Developmental domain', 32), th('Stage', 14), th('Developmental age', 22), th('Mastered items', 16), th('Goals', 16)
    ] })];
    sortedDomains.forEach(domain => {
        const age = devAges[domain] || 0;
        const stage = dsGetStageForAge(age);
        const goals = dsGetGoalsForDomain(domain);
        const reached = dsGetReachedForDomain(domain);
        profileRows.push(new TableRow({ children: [
            td(dsGetDomainName(domain)),
            td('Stage ' + dsGetStageRoman(stage), true),
            td(age.toFixed(1) + ' years', true),
            td(reached.length, true),
            td(goals.length, true)
        ] }));
    });
    children.push(new Table({ rows: profileRows, width: { size: 100, type: WidthType.PERCENTAGE } }));
    children.push(new Paragraph({ spacing: { after: 200 } }));

    // Per-domain descriptive paragraphs
    sortedDomains.forEach((domain, index) => {
        const age = devAges[domain] || 0;
        const stage = dsGetStageForAge(age);
        const goals = dsGetGoalsForDomain(domain);
        const reached = dsGetReachedForDomain(domain);
        const domainLabel = dsGetDomainName(domain);

        let positionText;
        if (index === 0) positionText = `${studentName} shows the most advanced development in the domain of `;
        else if (index === sortedDomains.length - 1) positionText = `${studentName} shows the greatest need for support in the domain of `;
        else positionText = 'In the domain of ';

        const runs = [
            new TextRun({ text: positionText, size: 22 }),
            new TextRun({ text: domainLabel, bold: true, size: 22 }),
            new TextRun({ text: `, ${studentName} is at developmental stage ${dsGetStageRoman(stage)} (${dsGetStageDescription(stage)}) with a developmental age of ${age.toFixed(1)} years. The target objective of this stage is: `, size: 22 }),
            new TextRun({ text: `“${dsGetStageRichtziel(stage)}”.`, italics: true, size: 22 })
        ];
        if (reached.length > 0) {
            const lastFour = reached.slice(-4).map(i => getDisplayCode(i.code) + ' (' + i.keyword + ')');
            runs.push(new TextRun({ text: ` Of ${reached.length} mastered competencies, the most recently mastered include: ${lastFour.join(', ')}.`, size: 22 }));
        }
        if (goals.length > 0) {
            const goalCodes = goals.map(g => getDisplayCode(g.code)).join(', ');
            runs.push(new TextRun({ text: ` ${goals.length} support goal(s) were defined: ${goalCodes}.`, size: 22 }));
        }
        children.push(new Paragraph({ children: runs, spacing: { after: 160 } }));
    });

    // Per-domain mastered items + goals detail
    children.push(new Paragraph({ children: [new TextRun({ text: 'Assessment detail per domain', bold: true, size: 26, color: '4F46E5' })], spacing: { before: 200, after: 120 } }));
    ['verhalten', 'kommunikation', 'sozialisation', 'kognition'].forEach(domain => {
        const reached = dsGetReachedForDomain(domain);
        const goals = dsGetGoalsForDomain(domain);
        children.push(new Paragraph({ children: [new TextRun({ text: dsGetDomainName(domain), bold: true, size: 22, color: '4F46E5' })], spacing: { before: 120, after: 40 } }));
        children.push(new Paragraph({ children: [new TextRun({ text: 'Mastered: ', bold: true, size: 20 }), new TextRun({ text: reached.length ? reached.map(i => getDisplayCode(i.code) + ' (' + i.keyword + ')').join(', ') : '—', size: 20 })], spacing: { after: 40 } }));
        children.push(new Paragraph({ children: [new TextRun({ text: 'Goals: ', bold: true, size: 20 }), new TextRun({ text: goals.length ? goals.map(i => getDisplayCode(i.code) + ' (' + i.keyword + ')').join(', ') : '—', size: 20 })], spacing: { after: 80 } }));
    });

    // Narrative sections (placeholders to complete manually)
    children.push(new Paragraph({ children: [new TextRun({ text: 'Narrative sections', bold: true, size: 26, color: '4F46E5' })], spacing: { before: 240, after: 60 } }));
    children.push(new Paragraph({ children: [new TextRun({ text: 'Complete the following sections manually in the Word document.', italics: true, size: 20, color: '888888' })], spacing: { after: 120 } }));
    const sections = [
        'Referral / reason for assessment',
        'Background and history',
        'Social report',
        'Current situation',
        'Perspective of the school',
        'Perspective of the student',
        'Perspective of the parents',
        'Behavioral observations',
        'Interpretation',
        'Specific needs',
        'Recommendations'
    ];
    sections.forEach(sec => {
        children.push(new Paragraph({ children: [new TextRun({ text: sec, bold: true, size: 22 })], spacing: { before: 120, after: 40 } }));
        children.push(new Paragraph({ children: [new TextRun({ text: '[…]', size: 22, color: 'AAAAAA' })], spacing: { after: 40 } }));
    });

    const doc = new Document({
        styles: { default: { document: { run: { font: 'Calibri', size: 22 }, paragraph: { spacing: { line: 276 } } } } },
        sections: [{ properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } }, children }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, buildFilename('DS'));
    showToast('DS (English) generated as DOCX!');
}

// Gemeinsame Template-basierte DS-Generierung
async function generateDSFromTemplate(isComplete) {
    // Englisch: kein englisches DS-Word-Template -> von Grund auf mit docx.js bauen
    if (state.language === 'en') {
        return generateEnglishDS(isComplete);
    }

    // --- 1. Load the DOCX template (embedded as base64) ---
    const isFR_DS = state.language === 'fr' && typeof TEMPLATE_FR_DS_CDSE_BASE64 !== 'undefined';
    const dsTemplate = isFR_DS ? TEMPLATE_FR_DS_CDSE_BASE64 : TEMPLATE_DS_CDSE_BASE64;
    const zip = await JSZip.loadAsync(dsTemplate, {base64: true});
    let docXml = await zip.file('word/document.xml').async('string');
    let header1Xml = await zip.file('word/header1.xml').async('string');
    let header2Xml = await zip.file('word/header2.xml').async('string');

    // --- 1b. Color ELDiB grid cells FIRST (on pristine template before any modifications) ---
    {
        // DE template uses cells with w:w="840", FR template uses w:w="854"
        const gridWidths = [840, 854];
        let gridCellWidthVal = 0;
        let markerPos = -1;
        for (const gw of gridWidths) {
            markerPos = docXml.lastIndexOf('w:w="' + gw + '"');
            if (markerPos >= 0) { gridCellWidthVal = gw; break; }
        }
        console.log('[DS Grid] markerPos=' + markerPos + ', gridCellWidthVal=' + gridCellWidthVal);
        if (markerPos >= 0) {
            const tblStart = docXml.lastIndexOf('<w:tbl>', markerPos);
            const tblEndIdx = docXml.indexOf('</w:tbl>', markerPos);
            console.log('[DS Grid] tblStart=' + tblStart + ', tblEndIdx=' + tblEndIdx);
            if (tblStart >= 0 && tblEndIdx >= 0) {
                const tblEnd = tblEndIdx + 8;
                let tableXml = docXml.substring(tblStart, tblEnd);
                const domains = ['V', 'K', 'SOZ', 'KOG'];

                // Remove cell spacing to eliminate white gaps
                if (tableXml.includes('<w:tblCellSpacing')) {
                    tableXml = tableXml.replace(/<w:tblCellSpacing[^/]*\/>/g, '<w:tblCellSpacing w:w="0" w:type="dxa"/>');
                } else if (tableXml.includes('</w:tblPr>')) {
                    tableXml = tableXml.replace('</w:tblPr>', '<w:tblCellSpacing w:w="0" w:type="dxa"/></w:tblPr>');
                }

                function getDSItemColor(prefix, nr) {
                    const code = prefix + '-' + nr;
                    const sel = state.selections[code];
                    if (sel?.status === 'erreicht') return '90EE90';
                    if (sel?.status === 'ziel') return 'FFFF00';
                    return 'FFFFFF';
                }

                // Parse all rows
                const allDSRows = [];
                let tPos = 0;
                while (tPos < tableXml.length) {
                    const trIdx = tableXml.indexOf('<w:tr ', tPos);
                    const trIdxAlt = tableXml.indexOf('<w:tr>', tPos);
                    let actualTrIdx = -1;
                    if (trIdx >= 0 && trIdxAlt >= 0) actualTrIdx = Math.min(trIdx, trIdxAlt);
                    else if (trIdx >= 0) actualTrIdx = trIdx;
                    else if (trIdxAlt >= 0) actualTrIdx = trIdxAlt;
                    else break;
                    const trEndIdx = tableXml.indexOf('</w:tr>', actualTrIdx);
                    if (trEndIdx < 0) break;
                    const trEndFull = trEndIdx + 7;
                    allDSRows.push({ start: actualTrIdx, end: trEndFull, xml: tableXml.substring(actualTrIdx, trEndFull) });
                    tPos = trEndFull;
                }

                // First pass: build color map using grid-width cells
                const dsColorMap = [];
                allDSRows.forEach((row) => {
                    const rowColors = [{}, {}, {}, {}];
                    let colG = 0;
                    let rPos = 0;
                    while (rPos < row.xml.length) {
                        const tcIdx = row.xml.indexOf('<w:tc>', rPos);
                        if (tcIdx < 0) break;
                        const tcEndIdx = row.xml.indexOf('</w:tc>', tcIdx);
                        if (tcEndIdx < 0) break;
                        const cellXml = row.xml.substring(tcIdx, tcEndIdx + 7);
                        const widthMatch = cellXml.match(/w:tcW\s+w:w="(\d+)"/);
                        const width = widthMatch ? parseInt(widthMatch[1]) : 0;
                        if (width === gridCellWidthVal) {
                            if (colG < 4) {
                                const textMatches = [...cellXml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)];
                                const cellText = textMatches.map(m => m[1]).join('').trim();
                                // Extract number - also handles header cells like "KOMM35" or "KOG62"
                                const numMatch = cellText.match(/(\d+)$/);
                                const num = numMatch ? parseInt(numMatch[1]) : NaN;
                                if (!isNaN(num) && num >= 1 && num <= 62) {
                                    rowColors[colG] = { color: getDSItemColor(domains[colG], num), hasNumber: true };
                                } else {
                                    rowColors[colG] = { color: null, hasNumber: false };
                                }
                            }
                            colG++;
                        }
                        rPos = tcEndIdx + 7;
                    }
                    dsColorMap.push(rowColors);
                });

                // Fill gaps: propagate colors bottom-to-top per column
                for (let col = 0; col < 4; col++) {
                    let currentColor = 'FFFFFF';
                    for (let r = dsColorMap.length - 1; r >= 0; r--) {
                        if (dsColorMap[r][col]?.hasNumber) {
                            currentColor = dsColorMap[r][col].color;
                        } else if (dsColorMap[r][col] && !dsColorMap[r][col].hasNumber) {
                            dsColorMap[r][col].color = currentColor;
                        }
                    }
                }

                // Apply colors
                function dsApplyCellColor(cellXml, color) {
                    const shdXml = '<w:shd w:val="clear" w:color="auto" w:fill="' + color + '"/>';
                    let result = cellXml;
                    // CRITICAL: Remove w:themeFill (overrides w:fill in Word!)
                    result = result.replace(/\s*w:themeFill="[^"]*"/g, '');
                    result = result.replace(/\s*w:themeFillTint="[^"]*"/g, '');
                    result = result.replace(/\s*w:themeFillShade="[^"]*"/g, '');
                    if (result.includes('w:fill="')) {
                        return result.replace(/w:fill="[^"]+"/g, 'w:fill="' + color + '"');
                    } else if (result.includes('</w:tcPr>')) {
                        return result.replace('</w:tcPr>', shdXml + '</w:tcPr>');
                    } else {
                        return result.replace(/(<w:tc>)/, '$1<w:tcPr>' + shdXml + '</w:tcPr>');
                    }
                }

                const greenCount = dsColorMap.flat().filter(c => c.color === '90EE90').length;
                const yellowCount = dsColorMap.flat().filter(c => c.color === 'FFFF00').length;
                console.log('[DS Grid] rows=' + allDSRows.length + ', green=' + greenCount + ', yellow=' + yellowCount);
                let newDSTable = tableXml.substring(0, allDSRows.length > 0 ? allDSRows[0].start : tableXml.length);
                allDSRows.forEach((row, rowIdx) => {
                    let colG = 0;
                    let newRow = '';
                    let rPos = 0;
                    while (rPos < row.xml.length) {
                        const tcIdx = row.xml.indexOf('<w:tc>', rPos);
                        if (tcIdx < 0) { newRow += row.xml.substring(rPos); break; }
                        newRow += row.xml.substring(rPos, tcIdx);
                        const tcEndIdx = row.xml.indexOf('</w:tc>', tcIdx);
                        if (tcEndIdx < 0) { newRow += row.xml.substring(tcIdx); break; }
                        let cellXml = row.xml.substring(tcIdx, tcEndIdx + 7);
                        const widthMatch = cellXml.match(/w:tcW\s+w:w="(\d+)"/);
                        const width = widthMatch ? parseInt(widthMatch[1]) : 0;
                        if (width === gridCellWidthVal && colG < 4) {
                            const color = dsColorMap[rowIdx][colG]?.color || 'FFFFFF';
                            cellXml = dsApplyCellColor(cellXml, color);
                            colG++;
                        } else if (width === gridCellWidthVal) {
                            colG++;
                        }
                        newRow += cellXml;
                        rPos = tcEndIdx + 7;
                    }
                    newDSTable += newRow;
                    if (rowIdx < allDSRows.length - 1) {
                        newDSTable += tableXml.substring(row.end, allDSRows[rowIdx + 1].start);
                    }
                });
                if (allDSRows.length > 0) {
                    newDSTable += tableXml.substring(allDSRows[allDSRows.length - 1].end);
                }
                tableXml = newDSTable;

                // --- Shrink ELDiB grid table to fit on one page (DE & FR) ---
                // Reduce font sizes: replace w:sz values in the grid (half-points)
                // Scale down by ~15% to fit on one page while staying readable
                tableXml = tableXml.replace(/<w:sz\s+w:val="(\d+)"\s*\/>/g, function(match, val) {
                    const orig = parseInt(val);
                    const newVal = Math.max(10, Math.round(orig * 0.85));
                    return '<w:sz w:val="' + newVal + '"/>';
                });
                tableXml = tableXml.replace(/<w:szCs\s+w:val="(\d+)"\s*\/>/g, function(match, val) {
                    const orig = parseInt(val);
                    const newVal = Math.max(10, Math.round(orig * 0.85));
                    return '<w:szCs w:val="' + newVal + '"/>';
                });

                // Reduce row heights by ~15%
                tableXml = tableXml.replace(/<w:trHeight\s+([^/]*)w:val="(\d+)"([^/]*)\/>/g, function(match, before, val, after) {
                    const orig = parseInt(val);
                    const newVal = Math.max(100, Math.round(orig * 0.85));
                    return '<w:trHeight ' + before + 'w:val="' + newVal + '"' + after + '/>';
                });

                // Reduce cell margins/padding inside cells
                tableXml = tableXml.replace(/<w:tblCellMar>([\s\S]*?)<\/w:tblCellMar>/g, function(match, inner) {
                    return '<w:tblCellMar>' + inner
                        .replace(/w:w="(\d+)"/g, function(m, v) {
                            return 'w:w="' + Math.max(0, Math.round(parseInt(v) * 0.75)) + '"';
                        }) + '</w:tblCellMar>';
                });

                // Reduce line spacing inside grid paragraphs
                tableXml = tableXml.replace(/<w:spacing\s+([^/]*)w:line="(\d+)"([^/]*)\/>/g, function(match, before, val, after) {
                    const orig = parseInt(val);
                    if (orig > 200) {
                        const newVal = Math.max(200, Math.round(orig * 0.85));
                        return '<w:spacing ' + before + 'w:line="' + newVal + '"' + after + '/>';
                    }
                    return match;
                });

                // Reduce before/after paragraph spacing
                tableXml = tableXml.replace(/<w:spacing\s+([^/]*)w:before="(\d+)"([^/]*)\/>/g, function(match, before, val, after) {
                    const orig = parseInt(val);
                    const newVal = Math.round(orig * 0.75);
                    return '<w:spacing ' + before + 'w:before="' + newVal + '"' + after + '/>';
                });
                tableXml = tableXml.replace(/<w:spacing\s+([^/]*)w:after="(\d+)"([^/]*)\/>/g, function(match, before, val, after) {
                    const orig = parseInt(val);
                    const newVal = Math.round(orig * 0.75);
                    return '<w:spacing ' + before + 'w:after="' + newVal + '"' + after + '/>';
                });

                console.log('[DS Grid] Grid table shrunk for single-page fit');

                docXml = docXml.substring(0, tblStart) + tableXml + docXml.substring(tblEnd);
                console.log('[DS Grid] Grid coloring applied successfully');
            }
        }
    }

    // --- 2. Gather all data ---
    const dsLang = isFR_DS ? 'fr-LU' : 'de-DE';
    const stammdaten = getStammdaten();
    const dsData = isComplete ? getDSData() : {};
    const today = new Date().toLocaleDateString(isFR_DS ? 'fr-FR' : 'de-DE');
    const birthDate = document.getElementById('geburtsdatum')?.value;
    const biologicalAge = dsCalculateBiologicalAge(birthDate);
    const devAges = dsCalculateAllDevelopmentalAges();
    const studentName = getVornameForText(stammdaten.schueler_name) || (isFR_DS ? 'l\'élève' : 'der/die Schüler:in');

    // --- XML helper functions ---
    function escapeXml(str) {
        return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    function makeRun(text, bold, italic) {
        let rPr = '<w:rPr><w:lang w:val="' + (isFR_DS ? 'fr-FR' : 'de-DE') + '"/>';
        if (bold) rPr += '<w:b/>';
        if (italic) rPr += '<w:i/>';
        rPr += '</w:rPr>';
        return '<w:r>' + rPr + '<w:t xml:space="preserve">' + escapeXml(text) + '</w:t></w:r>';
    }
    function makePara(runs, heading) {
        let pPr = '';
        if (heading === 1) pPr = '<w:pPr><w:pStyle w:val="Heading1"/></w:pPr>';
        else if (heading === 2) pPr = '<w:pPr><w:pStyle w:val="Heading2"/></w:pPr>';
        return '<w:p>' + pPr + runs + '</w:p>';
    }
    function makeBulletPara(runs) {
        return '<w:p><w:pPr><w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr>' + runs + '</w:p>';
    }

    // Helper: replace all text within a paragraph that contains a search string
    // This handles text split across multiple runs
    function replaceTextInParagraph(xml, searchText, replaceText) {
        let result = xml;
        let searchIdx = 0;
        while (true) {
            // Find paragraph containing the search text by looking at concatenated text
            const pStart = result.indexOf('<w:p ', searchIdx);
            const pStartAlt = result.indexOf('<w:p>', searchIdx);
            let actualPStart = -1;
            if (pStart >= 0 && pStartAlt >= 0) actualPStart = Math.min(pStart, pStartAlt);
            else if (pStart >= 0) actualPStart = pStart;
            else if (pStartAlt >= 0) actualPStart = pStartAlt;
            else break;

            const pEnd = result.indexOf('</w:p>', actualPStart);
            if (pEnd < 0) break;
            const pEndFull = pEnd + 6;
            const paraXml = result.substring(actualPStart, pEndFull);

            // Extract all text from this paragraph
            const textMatches = [...paraXml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)];
            const fullText = textMatches.map(m => m[1]).join('');

            if (fullText.includes(searchText)) {
                // Found the paragraph - replace text
                const newText = fullText.replace(searchText, replaceText);
                // Create a single clean run with the replaced text
                // Preserve formatting from the first run
                const firstRunMatch = paraXml.match(/<w:r[ >].*?<w:rPr>(.*?)<\/w:rPr>/s);
                let rPr = firstRunMatch ? '<w:rPr>' + firstRunMatch[1] + '</w:rPr>' : '<w:rPr><w:lang w:val="' + dsLang + '"/></w:rPr>';
                // Remove color specs that might make it look like instructions
                rPr = rPr.replace(/<w:color[^/]*\/>/g, '');
                // Get paragraph properties
                const pPrMatch = paraXml.match(/<w:pPr>.*?<\/w:pPr>/s);
                const pPr = pPrMatch ? pPrMatch[0] : '';
                const newPara = '<w:p' + (paraXml.startsWith('<w:p ') ? paraXml.substring(4, paraXml.indexOf('>')) + '>' : '>') + pPr + '<w:r>' + rPr + '<w:t xml:space="preserve">' + escapeXml(newText) + '</w:t></w:r></w:p>';
                result = result.substring(0, actualPStart) + newPara + result.substring(pEndFull);
                searchIdx = actualPStart + newPara.length;
            } else {
                searchIdx = pEndFull;
            }
        }
        return result;
    }

    // Helper: replace the entire content between two section headings
    // Handles text split across multiple XML runs by checking concatenated paragraph text
    function replaceSectionContent(xml, headingText, newContentParas) {
        // Find heading paragraph by scanning all paragraphs and checking combined run text
        const pRegex = /<w:p[ >][\s\S]*?<\/w:p>/g;
        let headingPStart = -1;
        let headingPEnd = -1;
        let pMatch;
        while ((pMatch = pRegex.exec(xml)) !== null) {
            const paraXml = pMatch[0];
            // Must be a Heading1 or Heading2 paragraph
            if (!paraXml.includes('Heading1') && !paraXml.includes('Heading2')) continue;
            // Get combined text from all runs
            const textParts = [...paraXml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)];
            const fullText = textParts.map(m => m[1]).join('');
            if (fullText.includes(headingText)) {
                headingPStart = pMatch.index;
                headingPEnd = pMatch.index + pMatch[0].length;
                break;
            }
        }
        if (headingPStart < 0) return xml;
        const afterHeading = headingPEnd;
        // Find next heading paragraph (Heading1 or Heading2) after this one
        pRegex.lastIndex = afterHeading;
        let nextHeadingStart = xml.length;
        while ((pMatch = pRegex.exec(xml)) !== null) {
            const paraXml = pMatch[0];
            if (paraXml.includes('Heading1') || paraXml.includes('Heading2')) {
                nextHeadingStart = pMatch.index;
                break;
            }
        }
        return xml.substring(0, afterHeading) + newContentParas + xml.substring(nextHeadingStart);
    }

    // --- 3. Fill cover page - Student info table (Table 0) ---
    // Replace placeholder texts in the student info cells
    if (studentName) {
        if (isFR_DS) {
            // French template: "NOM " and "Prénom " are separate runs - use replaceTextInParagraph
            docXml = replaceTextInParagraph(docXml, 'NOM Prénom', escapeXml(studentName));
        } else {
            docXml = docXml.replace(/>NAME Vorname</g, '>' + escapeXml(studentName) + '<');
        }
    }
    // SVN - split across runs, replace the cell content
    {
        const svnLabel = isFR_DS ? 'Matricule' : 'Sozialversicherungsnummer';
        const svnPos = docXml.indexOf(svnLabel);
        if (svnPos >= 0) {
            // Find the next table cell (the value cell)
            const nextTc = docXml.indexOf('<w:tc>', svnPos);
            if (nextTc > 0) {
                const tcEnd = docXml.indexOf('</w:tc>', nextTc);
                if (tcEnd > 0) {
                    // Extract current cell and replace text content
                    const cellXml = docXml.substring(nextTc, tcEnd + 7);
                    // Build new cell preserving structure
                    const tcPrMatch = cellXml.match(/<w:tcPr>.*?<\/w:tcPr>/s);
                    const tcPr = tcPrMatch ? tcPrMatch[0] : '';
                    const svnValue = stammdaten.matricule || '';
                    const newCell = '<w:tc>' + tcPr + '<w:p><w:pPr><w:spacing w:line="360" w:lineRule="auto"/></w:pPr><w:r><w:rPr><w:lang w:val="' + dsLang + '"/></w:rPr><w:t xml:space="preserve">' + escapeXml(svnValue) + '</w:t></w:r></w:p></w:tc>';
                    docXml = docXml.substring(0, nextTc) + newCell + docXml.substring(tcEnd + 7);
                }
            }
        }
    }
    // Alter / Âge
    {
        const alterLabel = isFR_DS ? '>Âge<' : '>Alter<';
        const alterPos = docXml.indexOf(alterLabel);
        if (alterPos >= 0) {
            const nextTc = docXml.indexOf('<w:tc>', alterPos);
            if (nextTc > 0) {
                const tcEnd = docXml.indexOf('</w:tc>', nextTc);
                if (tcEnd > 0) {
                    const cellXml = docXml.substring(nextTc, tcEnd + 7);
                    const tcPrMatch = cellXml.match(/<w:tcPr>.*?<\/w:tcPr>/s);
                    const tcPr = tcPrMatch ? tcPrMatch[0] : '';
                    const alterValue = biologicalAge ? biologicalAge.years + (isFR_DS ? ' ans, ' : ' Jahre, ') + biologicalAge.months + (isFR_DS ? ' mois' : ' Monate') : '';
                    const newCell = '<w:tc>' + tcPr + '<w:p><w:pPr><w:spacing w:line="360" w:lineRule="auto"/></w:pPr><w:r><w:rPr><w:lang w:val="' + dsLang + '"/></w:rPr><w:t xml:space="preserve">' + escapeXml(alterValue) + '</w:t></w:r></w:p></w:tc>';
                    docXml = docXml.substring(0, nextTc) + newCell + docXml.substring(tcEnd + 7);
                }
            }
        }
    }
    // Schule / École
    if (stammdaten.foerderort) {
        const schoolPlaceholder = isFR_DS ? 'Nom de l\u2019école et lieu' : 'Name der Schule und Ort';
        docXml = replaceTextInParagraph(docXml, schoolPlaceholder, escapeXml(stammdaten.foerderort));
    }
    // Klasse / Classe
    {
        const klasseLabel = isFR_DS ? '>Classe<' : '>Klasse<';
        const klassePos = docXml.indexOf(klasseLabel);
        if (klassePos >= 0) {
            const nextTc = docXml.indexOf('<w:tc>', klassePos);
            if (nextTc > 0) {
                const tcEnd = docXml.indexOf('</w:tc>', nextTc);
                if (tcEnd > 0) {
                    const cellXml = docXml.substring(nextTc, tcEnd + 7);
                    const tcPrMatch = cellXml.match(/<w:tcPr>.*?<\/w:tcPr>/s);
                    const tcPr = tcPrMatch ? tcPrMatch[0] : '';
                    const klasseValue = (isComplete && dsData.ds_aktuelle_klasse) ? dsData.ds_aktuelle_klasse : (stammdaten.klasse || '');
                    const newCell = '<w:tc>' + tcPr + '<w:p><w:pPr><w:spacing w:line="360" w:lineRule="auto"/></w:pPr><w:r><w:rPr><w:lang w:val="' + dsLang + '"/></w:rPr><w:t xml:space="preserve">' + escapeXml(klasseValue) + '</w:t></w:r></w:p></w:tc>';
                    docXml = docXml.substring(0, nextTc) + newCell + docXml.substring(tcEnd + 7);
                }
            }
        }
    }
    // Sprachen / Langues
    {
        const sprachenLabel = isFR_DS ? '>Langues<' : '>Sprachen<';
        const sprachenPos = docXml.indexOf(sprachenLabel);
        if (sprachenPos >= 0) {
            const sprachenSearch = 'Luxemburgisch';
            const nextTc = docXml.indexOf('<w:tc>', sprachenPos);
            if (nextTc > 0) {
                const tcEnd = docXml.indexOf('</w:tc>', nextTc);
                if (tcEnd > 0) {
                    const cellXml = docXml.substring(nextTc, tcEnd + 7);
                    const tcPrMatch = cellXml.match(/<w:tcPr>.*?<\/w:tcPr>/s);
                    const tcPr = tcPrMatch ? tcPrMatch[0] : '';
                    const sprachenValue = (isComplete && dsData.ds_sprachen) ? dsData.ds_sprachen : '';
                    const newCell = '<w:tc>' + tcPr + '<w:p><w:pPr><w:spacing w:line="360" w:lineRule="auto"/></w:pPr><w:r><w:rPr><w:lang w:val="' + dsLang + '"/></w:rPr><w:t xml:space="preserve">' + escapeXml(sprachenValue) + '</w:t></w:r></w:p></w:tc>';
                    docXml = docXml.substring(0, nextTc) + newCell + docXml.substring(tcEnd + 7);
                }
            }
        }
    }

    // --- 4. Fill checkboxes (CNI Empfehlungen) ---
    if (isComplete) {
        const cniEmpfehlungen = dsData.checkboxes?.ds_cni_empfehlung || [];
        // Map checkbox indices to their CNI values
        const checkboxMapping = [
            'diagnostik_kz',      // 0: Spezialisierte Diagnostik
            'beratung_eltern',    // 1: Beratung Eltern
            'beratung_fachleute', // 2: Beratung Fachleute
            'lernwerkstatt_cni',  // 3: Lernwerkstatt
            'isa_cni',            // 4: ISA
            'beschulung_cdse',    // 5: Beschulung CDSE
            'clapa_cni',          // 6: ClaPa
            'cst_cni',            // 7: CST
            'annexe_junglinster', // 8: Annexe Junglinster
            'beschulung_ausland', // 9: Beschulung Ausland
            'abschluss',          // 10: Abschluss
            'schliessung'         // 11: Schließung
        ];
        // Replace each ☐ with ☑ if checked
        let checkboxIdx = 0;
        let searchPos = 0;
        while (checkboxIdx < 12) {
            const cbPos = docXml.indexOf('\u2610', searchPos);
            if (cbPos < 0) {
                // Try Unicode character directly
                break;
            }
            searchPos = cbPos + 1;
            checkboxIdx++;
        }
        // Use direct character replacement
        checkboxIdx = 0;
        searchPos = 0;
        while (checkboxIdx < 12) {
            const cbPos = docXml.indexOf('☐', searchPos);
            if (cbPos < 0) break;
            if (checkboxIdx < checkboxMapping.length && cniEmpfehlungen.includes(checkboxMapping[checkboxIdx])) {
                docXml = docXml.substring(0, cbPos) + '☑' + docXml.substring(cbPos + 1);
            }
            searchPos = cbPos + 1;
            checkboxIdx++;
        }
        // Also handle w14:checked val
        // SDT checkboxes have w14:checked w:val="0" - set to "1" for checked
        let sdtIdx = 0;
        searchPos = 0;
        while (sdtIdx < 12) {
            const sdtPos = docXml.indexOf('<w14:checkbox>', searchPos);
            if (sdtPos < 0) break;
            const sdtEnd = docXml.indexOf('</w14:checkbox>', sdtPos);
            if (sdtEnd < 0) break;
            if (sdtIdx < checkboxMapping.length && cniEmpfehlungen.includes(checkboxMapping[sdtIdx])) {
                // Change checked val from 0 to 1
                const sdtBlock = docXml.substring(sdtPos, sdtEnd + 15);
                const newBlock = sdtBlock.replace('w14:val="0"', 'w14:val="1"')
                                         .replace('w14:val=\'0\'', 'w14:val=\'1\'');
                docXml = docXml.substring(0, sdtPos) + newBlock + docXml.substring(sdtEnd + 15);
            }
            searchPos = sdtPos + 20;
            sdtIdx++;
        }
    }

    // --- 5. Fill Header ---
    // Header 1 (pages 2+): Replace student name and SVN
    if (studentName) {
        if (isFR_DS) {
            // French header1: "Prénom" + " et NOM de " + "l'élève" + "Matricule"
            header1Xml = header1Xml.replace('>Prénom</w:t>', '>' + escapeXml(studentName) + '</w:t>');
            header1Xml = header1Xml.replace('> et NOM de </w:t>', '></w:t>');
            header1Xml = header1Xml.replace('>l\u2019élève</w:t>', '></w:t>');
            if (stammdaten.matricule) {
                header1Xml = header1Xml.replace('>Matricule</w:t>', '>' + escapeXml(stammdaten.matricule) + '</w:t>');
            } else {
                header1Xml = header1Xml.replace('>Matricule</w:t>', '></w:t>');
            }
        } else {
            // German header1: "NAME" + "Vorname" + "des " + "Schülers" etc.
            const nameRunRegex = />NAME<\/w:t>/;
            if (nameRunRegex.test(header1Xml)) {
                header1Xml = header1Xml.replace('>NAME</w:t>', '>' + escapeXml(studentName) + '</w:t>');
                header1Xml = header1Xml.replace('>Vorname</w:t>', '></w:t>');
                header1Xml = header1Xml.replace('>des </w:t>', '></w:t>');
                header1Xml = header1Xml.replace('>Schülers</w:t>', '></w:t>');
                header1Xml = header1Xml.replace('>/der </w:t>', '></w:t>');
                header1Xml = header1Xml.replace('>Schüler</w:t>', '></w:t>');
                header1Xml = header1Xml.replace('>:</w:t>', '></w:t>');
                header1Xml = header1Xml.replace('>in</w:t>', '></w:t>');
            }
            if (stammdaten.matricule) {
                header1Xml = header1Xml.replace('>Sozialversicherungsnummer</w:t>', '>' + escapeXml(stammdaten.matricule) + '</w:t>');
            } else {
                header1Xml = header1Xml.replace('>Sozialversicherungsnummer</w:t>', '></w:t>');
            }
        }
    }
    // Header 2 (first page): Replace date
    if (!isFR_DS) {
        header2Xml = header2Xml.replace(/XX\.XX\.20XX/g, today);
    }

    // --- 6. Fill section content (for complete export) ---
    if (isComplete) {
        const auftragsklarungText = generateAuftragsklarungText(dsData, stammdaten);
        const vorgeschichteText = generateVorgeschichteText(dsData);
        const sozialberichtText = generateSozialberichtText(dsData);
        const aktuelleSituationText = generateAktuelleSituationText(dsData, stammdaten);
        const sichtweiseSchuleText = generateSichtweiseSchuleText(dsData);
        const sichtweiseSchuelerText = generateSichtweiseSchuelerText(dsData, stammdaten);
        const sichtweiseElternText = generateSichtweiseElternText(dsData);
        const verhaltensbeobachtungenText = generateVerhaltensbeobachtungenText(dsData);
        const interpretationText = generateInterpretationText(dsData);
        const spezifischeBeduerfnisseText = generateSpezifischeBeduerfnisseText(dsData);
        const empfehlungenText = generateEmpfehlungenText(dsData);

        // Helper: Convert multi-line text to multiple paragraphs
        function textToParas(text) {
            if (!text) return makePara(makeRun(''));
            const lines = text.split('\n');
            return lines.map(line => makePara(makeRun(line))).join('');
        }

        // Replace section 1: Auftragsklärung / Demande
        docXml = replaceSectionContent(docXml, isFR_DS ? 'Demande' : 'Auftragsklärung', textToParas(auftragsklarungText));

        // Replace section 2.1: Vorgeschichte / Antécédents
        docXml = replaceSectionContent(docXml, isFR_DS ? '2.1 Ant' : '2.1 Vorgeschichte', textToParas(vorgeschichteText));

        // Replace section 2.2: Sozialbericht / Bilan social
        docXml = replaceSectionContent(docXml, isFR_DS ? '2.2 Bilan social' : '2.2 Sozialbericht', textToParas(sozialberichtText));

        // Replace section 3: Aktuelle Situation / Situation actuelle
        docXml = replaceSectionContent(docXml, isFR_DS ? 'Situation actuelle' : 'Aktuelle Situation', textToParas(aktuelleSituationText));

        // Replace section 3.1: Aktuelle Maßnahmen / Mesures actuelles
        if (dsData.aktuelleMassnahmen && dsData.aktuelleMassnahmen.length > 0) {
            let massnahmenParas = '';
            dsData.aktuelleMassnahmen.forEach(m => {
                massnahmenParas += makePara(makeRun((m.zeitraum || '') + ' | ' + (m.klasse || '') + ' | ' + (MASSNAHME_NAMEN[m.art] || m.art || '') + ' | ' + (m.akteur || '')));
            });
            docXml = replaceSectionContent(docXml, isFR_DS ? '3.1 Mesures' : '3.1 Aktuelle', massnahmenParas);
        }

        // Replace section 3.2: Sichtweise der Schule / Point de vue de l'école
        docXml = replaceSectionContent(docXml, isFR_DS ? '3.2 Point de vue de l' : '3.2 Sichtweise der Schule', textToParas(sichtweiseSchuleText));

        // Replace section 3.3: Sichtweise des Schülers / Point de vue de l'élève
        docXml = replaceSectionContent(docXml, isFR_DS ? '3.3 Point de vue de l' : '3.3 Sichtweise des Sch', textToParas(sichtweiseSchuelerText));

        // Replace section 3.4: Sichtweise der Eltern / Point de vue des parents
        docXml = replaceSectionContent(docXml, isFR_DS ? '3.4 Point de vue des parents' : '3.4 Sichtweise der Eltern', textToParas(sichtweiseElternText));

        // Replace section "Diagnostische Verfahren" / "Procédures diagnostiques"
        {
            const diagIntro = isFR_DS
                ? 'L\'évaluation présente est basée sur ' + (dsData.ds_testmethoden || 'l\'ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen)') + ' ainsi que sur des observations comportementales systématiques' + (dsData.ds_test_ort ? ', réalisées à ' + dsData.ds_test_ort : '') + '.'
                : 'Die vorliegende Einschätzung basiert auf ' + (dsData.ds_testmethoden || 'dem ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen)') + ' sowie auf systematischen Verhaltensbeobachtungen' + (dsData.ds_test_ort ? ', die in ' + dsData.ds_test_ort + ' durchgeführt wurden' : '') + '.';
            docXml = replaceSectionContent(docXml, isFR_DS ? 'Proc\u00e9dure diagnostique' : 'Diagnostische Verfahren', makePara(makeRun(diagIntro)));
        }

        // Replace section 4.1: Verhaltensbeobachtungen / Observations comportementales
        docXml = replaceSectionContent(docXml, isFR_DS ? '4.1 Observations' : '4.1 Verhaltensbeobachtungen',
            makePara(makeRun(verhaltensbeobachtungenText)));

        // Replace section 4.3: Interpretation / Interprétation
        docXml = replaceSectionContent(docXml, isFR_DS ? '4.3 Interpr\u00e9tation' : '4.3 Interpretation', textToParas(interpretationText));

        // Replace section 5.1: Spezifische Bedürfnisse / Besoins spécifiques
        docXml = replaceSectionContent(docXml, isFR_DS ? '5.1 Besoins sp\u00e9cifiques' : '5.1 Spezifische Bed', textToParas(spezifischeBeduerfnisseText));

        // Replace section 5.3: Empfehlungen / Recommandations
        {
            let empfParas = '';
            const empfLines = empfehlungenText.split('\n');
            empfLines.forEach(line => {
                if (line.trim()) empfParas += makePara(makeRun(line.trim()));
            });
            docXml = replaceSectionContent(docXml, isFR_DS ? '5.3 Recommandations' : '5.3 Empfehlungen',
                empfParas || makePara(makeRun(empfehlungenText)));
        }

        // Schlussfolgerung / Conclusion
        {
            let schlussText = '';
            if (isFR_DS) {
                if (dsData.ds_empfehlungen_abgestimmt === 'ja_einverstanden') {
                    schlussText = 'Sur la base des résultats des tests, des observations et des informations anamnestiques recueillies, des besoins de soutien ciblés ont été identifiés en étroite concertation avec ' + (biologicalAge && biologicalAge.years >= 12 ? 'l\'élève ainsi qu\'avec ' : '') + 'les parents. Des recommandations ont été formulées conjointement pour soutenir efficacement le développement individuel.';
                } else if (dsData.ds_empfehlungen_abgestimmt === 'ja_vorbehalte') {
                    schlussText = 'Sur la base des résultats des tests, des observations et des informations anamnestiques, des besoins de soutien spécifiques ont été identifiés. Lors d\'entretiens avec ' + (biologicalAge && biologicalAge.years >= 12 ? 'l\'élève ainsi qu\'avec ' : '') + 'les parents, des recommandations pour le soutien du développement individuel ont pu être élaborées. Certaines mesures proposées ont toutefois été remises en question ou n\'ont pas été entièrement approuvées par les parents.' + (dsData.ds_vorbehalte_details ? ' ' + dsData.ds_vorbehalte_details : '');
                } else {
                    schlussText = 'Sur la base des résultats des tests, des observations et des informations anamnestiques recueillies, des besoins de soutien ciblés ont été identifiés et des recommandations formulées.';
                }
            } else {
                if (dsData.ds_empfehlungen_abgestimmt === 'ja_einverstanden') {
                    schlussText = 'Auf Basis der erhobenen Testergebnisse, Beobachtungen und anamnestischen Informationen wurden in enger Abstimmung mit ' + (biologicalAge && biologicalAge.years >= 12 ? 'der/dem Schüler:in sowie ' : '') + 'den Eltern gezielte Förderbedarfe identifiziert. Daraus abgeleitet wurden gemeinsam Empfehlungen formuliert, die die individuelle Entwicklung wirksam unterstützen sollen.';
                } else if (dsData.ds_empfehlungen_abgestimmt === 'ja_vorbehalte') {
                    schlussText = 'Auf Grundlage der vorliegenden Testergebnisse, Beobachtungen und anamnestischen Informationen wurden spezifische Förderbedarfe identifiziert. In Gesprächen mit ' + (biologicalAge && biologicalAge.years >= 12 ? 'der/dem Schüler:in sowie ' : '') + 'den Eltern konnten Empfehlungen zur weiteren Unterstützung der individuellen Entwicklung erarbeitet werden. Dabei wurden einzelne vorgeschlagene Maßnahmen von Seiten der Eltern bzw. des/der Schüler:in kritisch hinterfragt bzw. nicht vollständig befürwortet.' + (dsData.ds_vorbehalte_details ? ' ' + dsData.ds_vorbehalte_details : '');
                } else {
                    schlussText = 'Auf Basis der erhobenen Testergebnisse, Beobachtungen und anamnestischen Informationen wurden gezielte Förderbedarfe identifiziert und Empfehlungen formuliert.';
                }
            }
            docXml = replaceSectionContent(docXml, isFR_DS ? 'Conclusion' : 'Schlussfolgerung', makePara(makeRun(schlussText)));
        }

        // Replace section 5.4: Empfehlungen - CNI / Recommandations - CNI
        {
            const cniText = dsData.ds_cni_begruendung || '';
            const verfasserName = dsData.ds_verfasser_name || (isFR_DS ? 'Nom de l\'auteur du rapport' : 'Name des Verfassers des Berichts');
            const verfasserBeruf = dsData.ds_verfasser_beruf || (isFR_DS ? 'Fonction' : 'Berufsbezeichnung');
            const cniContent = makePara(makeRun(cniText)) +
                makePara(makeRun('')) +
                makePara(makeRun('')) +
                makePara(makeRun('___________________________')) +
                makePara(makeRun(verfasserName)) +
                makePara(makeRun(verfasserBeruf)) +
                makePara(makeRun('Unité de diagnostic, de conseil et de suivi'));
            docXml = replaceSectionContent(docXml, isFR_DS ? '5.4 Recommandations - CNI' : '5.4 Empfehlungen - CNI', cniContent);
        }
    }

    // --- 7. Fill ELDiB section 4.2 with actual data ---
    {
        const sortedDomains = dsGetSortedDomainsByAge(devAges);
        if (sortedDomains.length > 0) {
            let section42 = '';
            const sName = studentName || (isFR_DS ? 'l\'élève' : 'der/die Schüler:in');

            if (isFR_DS) {
                // French version
                section42 += makePara(makeRun('ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen) :', true));
                section42 += makePara(makeRun('L\'ELDiB est un instrument d\'évaluation standardisé conçu pour mesurer le développement social et émotionnel des enfants et des adolescents à partir de la naissance jusqu\'à l\'âge de seize ans.'));
                section42 += makePara(makeRun(''));

                sortedDomains.forEach((domain, index) => {
                    const age = devAges[domain] || 0;
                    const stage = dsGetStageForAge(age);
                    const goals = dsGetGoalsForDomain(domain);
                    const reached = dsGetReachedForDomain(domain);
                    const domainLabel = dsGetDomainName(domain);

                    let intro = '';
                    if (index === 0) {
                        intro = 'Les compétences les plus développées chez ' + sName + ' sont celles du domaine ';
                    } else if (index === sortedDomains.length - 1) {
                        intro = 'Les compétences les moins développées chez ' + sName + ' sont celles du domaine ';
                    } else {
                        intro = 'Dans le domaine ';
                    }

                    let text = intro + domainLabel + ' : ' + sName + ' se situe au stade de développement ' + stage;
                    text += ' (' + dsGetStageDescription(stage) + ').';

                    if (reached.length > 0) {
                        const lastItems = reached.slice(-3);
                        text += ' Parmi les dernières compétences atteintes : ';
                        text += lastItems.map(item => item.code + ' (' + item.keyword + ')').join(', ') + '.';
                    }

                    section42 += makePara(makeRun(text));

                    if (goals.length > 0) {
                        section42 += makePara(makeRun('En partant de l\'objectif général, les objectifs d\'apprentissage suivants ont été définis :'));
                        goals.forEach(g => {
                            section42 += makeBulletPara(makeRun(g.code + ' – ' + g.keyword));
                        });
                    }

                    section42 += makePara(makeRun(''));
                });
            } else {
                // German version (original)
                section42 += makePara(makeRun('ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen):', true));
                section42 += makePara(makeRun('Der ELDiB ist ein standardisiertes Einschätzungsinstrument, das dazu dient, die soziale und emotionale Entwicklung von Kindern und Jugendlichen im Alter zwischen Geburt und sechzehn Jahren zu erfassen.'));
                section42 += makePara(makeRun(''));

                sortedDomains.forEach((domain, index) => {
                    const age = devAges[domain] || 0;
                    const stage = dsGetStageForAge(age);
                    const goals = dsGetGoalsForDomain(domain);
                    const reached = dsGetReachedForDomain(domain);
                    const domainLabel = dsGetDomainName(domain);

                    let intro = '';
                    if (index === 0) {
                        intro = 'Am weitesten entwickelt zeigt sich ' + sName + ' im Bereich ';
                    } else if (index === sortedDomains.length - 1) {
                        intro = 'Den größten Förderbedarf weist ' + sName + ' im Bereich ';
                    } else {
                        intro = 'Im Bereich ';
                    }

                    let text = intro + domainLabel + ': Hier befindet sich ' + sName + ' auf Entwicklungsstufe ' + stage;
                    text += ' (' + dsGetStageDescription(stage) + ').';

                    if (reached.length > 0) {
                        const lastItems = reached.slice(-3);
                        text += ' Zu den zuletzt erreichten Kompetenzen zählen: ';
                        text += lastItems.map(item => item.code + ' (' + item.keyword + ')').join(', ') + '.';
                    }

                    section42 += makePara(makeRun(text));

                    if (goals.length > 0) {
                        section42 += makePara(makeRun('Ausgehend vom Richtziel ergaben sich folgende Lernziele:'));
                        goals.forEach(g => {
                            section42 += makeBulletPara(makeRun(g.code + ' – ' + g.keyword));
                        });
                    }

                    section42 += makePara(makeRun(''));
                });
            }

            // Replace section 4.2 content - use FR heading if French template
            docXml = replaceSectionContent(docXml, isFR_DS ? '4.2 R\u00e9sultats' : '4.2 Ergebnisse', section42);
        }
    }

    // --- 8. Fill 5.2 Ziele with SMART goals ---
    {
        const domains = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'];
        const allGoals = [];
        domains.forEach(domain => {
            const goals = dsGetGoalsForDomain(domain);
            goals.forEach(goal => {
                allGoals.push({
                    domain: domain,
                    code: goal.code,
                    keyword: goal.keyword,
                    description: goal.description,
                    zieltext: goal.zieltext
                });
            });
        });

        if (allGoals.length > 0) {
            let zieleContent = makePara(makeRun(isFR_DS
                ? 'À partir des objectifs ELDiB formulés, les objectifs de soutien suivants ont été définis :'
                : 'Ausgehend von den formulierten ELDiB-Zielen wurden folgende Förderziele definiert:'));

            // Build a simple table in WordML
            let tblXml = '<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:w="0" w:type="auto"/></w:tblPr><w:tblGrid><w:gridCol w:w="1000"/><w:gridCol w:w="2000"/><w:gridCol w:w="3000"/><w:gridCol w:w="3000"/></w:tblGrid>';
            // Header row
            tblXml += '<w:tr>';
            const headers = isFR_DS ? ['Item', 'Compétence', 'Formulation de l\'objectif', 'Intervention'] : ['Item', 'Kompetenz', 'Zielformulierung', 'Intervention'];
            headers.forEach(h => {
                tblXml += '<w:tc><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="BFBFBF"/></w:tcPr><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>' + escapeXml(h) + '</w:t></w:r></w:p></w:tc>';
            });
            tblXml += '</w:tr>';
            // Data rows
            allGoals.forEach(goal => {
                const interventions = getInterventionen(goal.code);
                const interventionText = interventions.length > 0 ? interventions.join('; ') : '-';
                tblXml += '<w:tr>';
                tblXml += '<w:tc><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>' + escapeXml(goal.code) + '</w:t></w:r></w:p></w:tc>';
                tblXml += '<w:tc><w:p><w:r><w:t>' + escapeXml(goal.keyword) + '</w:t></w:r></w:p></w:tc>';
                tblXml += '<w:tc><w:p><w:r><w:t>' + escapeXml(goal.zieltext) + '</w:t></w:r></w:p></w:tc>';
                tblXml += '<w:tc><w:p><w:r><w:t>' + escapeXml(interventionText) + '</w:t></w:r></w:p></w:tc>';
                tblXml += '</w:tr>';
            });
            tblXml += '</w:tbl>';

            zieleContent += tblXml;

            // Additional goals
            if (isComplete && dsData.ds_zusaetzliche_ziele) {
                zieleContent += makePara(makeRun((isFR_DS ? 'Objectifs supplémentaires : ' : 'Zusätzliche Ziele: ') + dsData.ds_zusaetzliche_ziele));
            }

            // Replace section 5.2 using robust heading search
            docXml = replaceSectionContent(docXml, isFR_DS ? '5.2 Objectifs' : '5.2 Ziele', zieleContent);
        }
    }

    // --- 10. Fill ELDiB header info (6.2 section) ---
    {
        // Replace student name in the ELDiB section
        if (studentName) {
            if (isFR_DS) {
                // French: "NOM Prénom" may be split across runs - use replaceTextInParagraph
                // (cover page already handled above, this catches remaining occurrences)
                docXml = replaceTextInParagraph(docXml, 'NOM Prénom', escapeXml(studentName));
            } else {
                const firstOcc = docXml.indexOf('>NAME Vorname<');
                if (firstOcc >= 0) {
                    docXml = docXml.substring(0, firstOcc) + '>' + escapeXml(studentName) + '<' + docXml.substring(firstOcc + '>NAME Vorname<'.length);
                }
                const secondOcc = docXml.indexOf('>NAME Vorname<');
                if (secondOcc >= 0) {
                    docXml = docXml.substring(0, secondOcc) + '>' + escapeXml(studentName) + '<' + docXml.substring(secondOcc + '>NAME Vorname<'.length);
                }
            }
        }

        // Replace "XX/XX/20XX" with actual dates
        const birthDateFormatted = birthDate ? new Date(birthDate).toLocaleDateString(isFR_DS ? 'fr-FR' : 'de-DE') : '';
        const ageText = biologicalAge
            ? (isFR_DS
                ? biologicalAge.years + ' ans ' + biologicalAge.months + ' mois'
                : biologicalAge.years + ' Jahre ' + biologicalAge.months + ' Monate')
            : '';
        if (birthDateFormatted || ageText) {
            const gebDatumPattern = 'XX/XX/20XX';
            // First occurrence is birthdate (+ age in French template)
            let idx1 = docXml.indexOf(gebDatumPattern);
            if (idx1 >= 0) {
                docXml = docXml.substring(0, idx1) + birthDateFormatted + docXml.substring(idx1 + gebDatumPattern.length);
            }
            // Replace age part
            if (isFR_DS) {
                // French template: "(X ans XX mois)"
                const frAgePattern = /X ans XX mois/;
                docXml = docXml.replace(frAgePattern, ageText || '');
            } else {
                const agePattern = 'XX Jahre XX Monate';
                let ageIdx = docXml.indexOf(agePattern);
                if (ageIdx >= 0) {
                    docXml = docXml.substring(0, ageIdx) + (ageText || '') + docXml.substring(ageIdx + agePattern.length);
                }
            }
            // Second XX/XX/20XX is assessment date (today)
            let idx2 = docXml.indexOf(gebDatumPattern);
            if (idx2 >= 0) {
                docXml = docXml.substring(0, idx2) + today + docXml.substring(idx2 + gebDatumPattern.length);
            }
        }
    }

    // --- 11. Save modified DOCX ---
    zip.file('word/document.xml', docXml);
    zip.file('word/header1.xml', header1Xml);
    zip.file('word/header2.xml', header2Xml);

    const blob = await zip.generateAsync({type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = buildFilename('DS');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(isComplete ? 'Vollständiger DS wurde als DOCX generiert!' : 'DS wurde als DOCX generiert!');
}

// Helper: Get domain prefix for code generation
