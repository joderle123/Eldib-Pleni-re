// ==================== PEI (Plan éducatif individualisé) ====================
// DE und FR füllen die offiziellen CDSE-Vorlagen (PEI_DE.docx / PEI_FR.docx).
// EN: Es gibt keine englische Vorlage. Die deutsche Vorlage wird genommen und ihre
// festen Texte werden zuerst ins Englische übersetzt (PEI_VORLAGE_EN). So hat das
// englische IEP denselben Aufbau wie DE/FR: Deckblatt, Anwesenheitsliste, farbiges
// DTORF-R-Raster, Bericht und Zielerfassung.

// Feste Texte der deutschen Vorlage -> Englisch (ganzer Absatztext nach dem Entfernen
// der rosa Kommentare, Leerzeichen am Rand werden ignoriert)
const PEI_VORLAGE_EN = {
    'Individueller Förderplan': 'Individualized Education Plan',
    'PEI': 'IEP',
    'Name des Schülers/ der Schülerin': 'Name of the student',
    'Name des Schülers/ der Schülerin:': 'Name of the student:',
    'Sozialversicherungsnummer': 'ID number (matricule)',
    'Schule/Klasse': 'School/Class',
    'In Zusammenarbeit mit': 'In collaboration with',
    'Anwesenheitsliste': 'Attendance list',
    'Unterschrift:en': 'Signature(s)',
    'Entwicklung ELDiB': 'Development profile (DTORF-R)',
    'Geburtsdatum:': 'Date of birth: ',
    'V': 'BEH', 'K': 'COM', 'SOZ': 'SOC', 'KOG': 'COG',
    'STUFE I': 'STAGE I', 'STUFE II': 'STAGE II', 'STUFE III': 'STAGE III', 'STUFE IV': 'STAGE IV', 'STUFE V': 'STAGE V',
    'Datum:': 'Date:',
    '© deutsche Ausgabe: Institut für Entwicklungstherapie/Entwicklungspädagogik e.V. (ETEP Europe) und Marita Bergsson, Düsseldorf, 2007':
        '© German edition: Institut für Entwicklungstherapie/Entwicklungspädagogik e.V. (ETEP Europe) and Marita Bergsson, Düsseldorf, 2007',
    'Legende: V-Verhalten; K-Kommunikation; SOZ-Sozialisation; KOG-Kognition':
        'Legend: BEH-Behavior; COM-Communication; SOC-Socialization; COG-Academics/Cognition',
    'grün-Lernziel erreicht; gelb-mögliches Lernziel': 'green-objective mastered; yellow-potential objective',
    'Bericht': 'Report',
    'Fortschritte des Schülers/ der Schülerin': 'Progress of the student',
    'Datum': 'Date',
    'Schüler:in': 'Student',
    'Erziehungsberechtigte': 'Legal guardian(s)',
    'Schule': 'School',
    'Andere (CPI,CC ……. )': 'Other (CPI, CC …)',
    'Andere (CPI, CC ……..)': 'Other (CPI, CC …)',
    'Anzugehende Themen': 'Points to address',
    'Zielerfassung und Umsetzung': 'Goals and implementation',
    'CDSE/ ESEB (SePAS)/ Lehrperson (LP)': 'CDSE/ ESEB (SePAS)/ Teacher',
    'Verhalten': 'Behavior',
    'Kommunikation': 'Communication',
    'Sozialisation': 'Socialization',
    'Kognition': 'Academics/Cognition',
    'Diese Ziele werden im Unterricht aufgegriffen und die Umsetzung sollte im Unterricht erfolgen.':
        'These goals are addressed in class, and they should be implemented in class.',
    'Andere ELDiB-unabhängige Ziele': 'Other goals (independent of the DTORF-R)'
};

// Deutsche Reste und Tippfehler in der französischen Vorlage
const PEI_VORLAGE_FR_KORREKTUR = {
    'Erziehungsberechtigte': 'Représentant légal',
    'Schule': 'École',
    'Andere (CPI,CC ……. )': 'Autres (CPI, CC …)',
    'Andere (CPI, CC ……..)': 'Autres (CPI, CC …)',
    'Nom de l‘élève': 'Nom de l’élève',
    'Signature:s': 'Signature(s)',
    'Autres objectifs, indépendants des objectis de l‘ELDiB': 'Autres objectifs, indépendants des objectifs de l’ELDiB',
    // einheitlich mit Akzent auf dem Großbuchstaben (wie in der übrigen App)
    'Ecole/Classe': 'École/Classe',
    'Ecole': 'École',
    'Elève': 'Élève',
    'CDSE/ ESEB (SePAS)/ Ecole (titulaire/ autres intervenants)': 'CDSE/ ESEB (SePAS)/ École (titulaire/ autres intervenants)'
};

// Marken (Texte in der – ggf. übersetzten – Vorlage) und Beschriftungen je Sprache
function peiSprachTexte(lang) {
    if (lang === 'fr') {
        return {
            nameMarke: 'Nom de l', gebMarke: 'Date de naissance', datumMarke: 'Date:',
            domaenen: ['Comportement', 'Communication', 'Socialisation', 'Cognition'],
            andere: 'Autres objectifs', fortschritte: 'Progrès de l', themen: 'Points à développer', datumZeile: 'Date',
            elternRolle: 'Représentant légal', zielformulierung: 'Formulation de l\'objectif : ', umsetzung: 'Mise en œuvre possible',
            anf: ['« ', ' »'], wLang: 'fr-LU', datei: 'PEI'
        };
    }
    if (lang === 'en') {
        return {
            nameMarke: 'Name of the student', gebMarke: 'Date of birth', datumMarke: 'Date:',
            domaenen: ['Behavior', 'Communication', 'Socialization', 'Academics/Cognition'],
            andere: 'Other goals (independent of the DTORF-R)', fortschritte: 'Progress of the student', themen: 'Points to address', datumZeile: 'Date',
            elternRolle: 'Legal guardian', zielformulierung: 'Goal formulation: ', umsetzung: 'Possible implementation',
            anf: ['“', '”'], wLang: 'en-US', datei: 'IEP'
        };
    }
    return {
        nameMarke: 'Name des Sch', gebMarke: 'Geburtsdatum', datumMarke: 'Datum:',
        domaenen: ['Verhalten', 'Kommunikation', 'Sozialisation', 'Kognition'],
        andere: 'Andere ELDiB-unabhängige Ziele', fortschritte: 'Fortschritte des Sch', themen: 'Anzugehende Themen', datumZeile: 'Datum',
        elternRolle: 'Erziehungsberechtigte', zielformulierung: 'Zielformulierung: ', umsetzung: 'Mögliche Umsetzung',
        anf: ['„', '“'], wLang: 'de-LU', datei: 'PEI'
    };
}

// Ersetzt den Text ganzer Absätze (Text über alle Runs zusammengesetzt, Rand-Leerzeichen egal).
// Der erste Run bekommt den neuen Text (Formatierung bleibt), die übrigen Runs werden geleert.
function peiSetzeAbsatzTexte(xml, tabelle) {
    const tRe = /(<w:t(?:\s[^>]*)?>)([^<]*)(<\/w:t>)/g;
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const ent = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, '\'').replace(/&amp;/g, '&');
    return xml.replace(/<w:p[ >][\s\S]*?<\/w:p>/g, p => {
        const runs = [...p.matchAll(tRe)];
        if (runs.length === 0) return p;
        const text = ent(runs.map(r => r[2]).join('')).trim();
        if (!Object.prototype.hasOwnProperty.call(tabelle, text)) return p;
        let i = 0;
        return p.replace(tRe, (m, auf, inhalt, zu) => (i++ === 0 ? '<w:t xml:space="preserve">' + esc(tabelle[text]) + zu : auf + zu));
    });
}

// Positionen aller Absätze, deren Text genau dem Suchtext entspricht (Rand-Leerzeichen egal).
// Liefert jeweils die Stelle vor '</w:p>' zum Anhängen von Text.
function peiFindeAbsaetze(xml, suchtext) {
    const treffer = [];
    const re = /<w:p[ >][\s\S]*?<\/w:p>/g;
    let m;
    while ((m = re.exec(xml)) !== null) {
        const text = [...m[0].matchAll(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g)].map(x => x[1]).join('').trim();
        if (text === suchtext) treffer.push(m.index + m[0].length - '</w:p>'.length);
    }
    return treffer;
}

// ---- Formulierungen der zusätzlichen Ziele für den Bericht (Fortschritte / anzugehende Punkte) ----
// stufe3 = erreicht, stufe2 = mit Unterstützung (-> "zunehmend"), stufe1 = Ziel (-> Zielform)
const PEI_FORMAT = (function () {
    function satz(t) {
        t = String(t || '').replace(/\s+/g, ' ').trim();
        if (!t) return t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        if (!/[.!?]$/.test(t)) t += '.';
        return t;
    }

    // ---------- Deutsch ----------
    // Fortschritte (stufe3 - erreicht): Text unverändert als Satz.
    // "selbstständig" wurde in den Daten bereits dort entfernt, wo es überflüssig war;
    // bei MA-5, MA-24 und AR-30 gehört es zur Aussage und bleibt deshalb stehen.
    function fortschrittDE(text) {
        return satz(text);
    }
    // Fortschritte (stufe2 - teilweise): Hilfe-Angabe durch "zunehmend" ersetzen
    function teilweiseDE(text) {
        if (!text) return text;
        let t = text;
        const markers = ['wenigen Erinnerungen', 'anfänglicher Anleitung',
            'Unterstützung', 'Anleitung', 'Anregung', 'Ermutigung', 'Erinnerung',
            'Begleitung', 'Hinweisen', 'Übung', 'Vorbereitung', 'Vertrauensaufbau',
            'Gesprächen', 'Erklärung', 'Reflexionsgesprächen', 'Förderung',
            'Lernstrategien', 'Hilfe', 'Zeit', 'Moderation'];
        for (const m of markers) {
            if (t.includes('mit ' + m + ' ')) { t = t.replace('mit ' + m + ' ', 'zunehmend '); break; }
            if (t.includes('mit ' + m)) { t = t.replace('mit ' + m, 'zunehmend'); break; }
        }
        return satz(t);
    }
    // Anzugehende Themen (stufe1 - Ziel): in Zielform (Infinitiv) bringen
    function themaDE(text) {
        if (!text) return text;
        let t = text;
        let m;
        if ((m = t.match(/^lernt noch, (.+) zu (\w+)$/))) {
            t = m[1] + ' ' + m[2];
        } else if ((m = t.match(/^lernt noch, (.+?) (\w+zu\w+)$/))) {
            t = m[1] + ' ' + m[2].replace('zu', '');
        } else if ((m = t.match(/^hat noch Schwierigkeiten, (.+) zu (\w+)$/))) {
            t = m[1] + ' ' + m[2];
        } else if ((m = t.match(/^hat noch Schwierigkeiten, (.+?) (\w+zu\w+)$/))) {
            t = m[1] + ' ' + m[2].replace('zu', '');
        } else if ((m = t.match(/^hat noch Schwierigkeiten mit (.+)$/))) {
            t = 'an ' + m[1] + ' weiterarbeiten';
        } else if ((m = t.match(/^hat noch Schwierigkeiten, (.+)$/))) {
            t = m[1];
        } else if ((m = t.match(/^zeigt noch wenig (.+)$/))) {
            t = m[1] + ' weiterentwickeln';
        } else if ((m = t.match(/^hat noch keine?n? (.+)$/))) {
            t = m[1];
        } else if (t.includes(' noch nicht ')) {
            t = t.replace(' noch nicht ', ' ');
        } else if (t.includes(' noch ')) {
            t = t.replace(' noch ', ' ');
        }
        // "zu erkennen und kommunizieren" -> "erkennen und kommunizieren"; "und zu Y" -> "und Y"
        t = t.replace(/ zu (\w+en)\b(?= und )/g, ' $1');
        t = t.replace(/ und zu (\w+)\b/g, ' und $1');
        return satz(t);
    }

    // ---------- Französisch ----------
    // Hilfe-Angaben in den stufe2-Texten ("avec soutien", "avec des indices" ...)
    const FR_HILFE = /\bavec (?:peu de rappels|des indications|des indices|des discussions|des entretiens de réflexion|des stratégies d'apprentissage|guidance initiale|la construction de la confiance|le temps|soutien|stimulation|guidance|rappel|encouragement|explication|médiation|aide|accompagnement|préparation|entraînement)\b/i;
    function fortschrittFR(text) {
        return satz(text);
    }
    function teilweiseFR(text) {
        if (!text) return text;
        let t = text;
        if (FR_HILFE.test(t)) {
            t = t.replace(FR_HILFE, 'de plus en plus');
            t = t.replace(/de plus en plus plus /g, 'de plus en plus ')
                .replace(/de plus en plus davantage/g, 'de plus en plus')
                .replace(/de plus en plus mieux/g, 'de mieux en mieux')
                .replace(/de plus en plus de l'/g, 'de plus en plus d\'')
                .replace(/de plus en plus (?:de la|du|des) /g, 'de plus en plus de ')
                .replace(/de plus en plus de (?=[aeiouyéèêâîôûh])/gi, 'de plus en plus d\'');
            // "de plus en plus ... de manière plus autonome" -> doppeltes "plus" vermeiden
            t = t.replace(/(de plus en plus .*?)\bde manière plus /, '$1de manière ');
        }
        return satz(t);
    }
    function themaFR(text) {
        if (!text) return text;
        let t = text;
        let m;
        if ((m = t.match(/^apprend encore à (.+)$/i))) { t = m[1]; }
        else if ((m = t.match(/^a encore des difficultés à (.+)$/i))) { t = m[1]; }
        else if ((m = t.match(/^a encore des difficultés avec (.+)$/i))) { t = 'travailler sur ' + m[1]; }
        else if ((m = t.match(/^a encore des difficultés (.+)$/i))) { t = m[1]; }
        else if ((m = t.match(/^est encore en train de (.+)$/i))) { t = m[1]; }
        else if ((m = t.match(/^montre encore peu (de |d')(.+)$/i))) { t = 'développer davantage ' + m[1] + m[2]; }
        // "ne ... pas encore": Verneinung weglassen – außer bei "n'a pas encore" und "pas encore (…) de/d'"
        // (dort bliebe ein fehlerhafter Satz stehen), dann den Satz unverändert übernehmen
        else if ((m = t.match(/^(?:ne |n')(\S+) pas encore (.+)$/i)) && m[1] !== 'a' && !/^(\S+ment )?(de |d')/.test(m[2])) { t = m[1] + ' ' + m[2]; }
        else if (!/pas encore/.test(t) && t.includes(' encore ')) { t = t.replace(' encore ', ' '); }
        // "être patient et à attendre" -> "être patient et attendre"
        t = t.replace(/ et à (?=\S)/, ' et ');
        return satz(t);
    }

    // ---------- Englisch ----------
    const EN_HILFE = / (?:with (?:few reminders|initial guidance|learning strategies|support|guidance|prompting|reminders|encouragement|hints|accompaniment|practice|mediation|help|preparation)|when explained|when reminded|through (?:reflection )?conversations?|over time|as trust is built)\b/;
    const EN_GERUNDIUM = {
        accepting: 'accept', acknowledging: 'acknowledge', adjusting: 'adjust', allowing: 'allow', apologizing: 'apologize',
        appearing: 'appear', applying: 'apply', approaching: 'approach', attending: 'attend', avoiding: 'avoid', being: 'be',
        budgeting: 'budget', building: 'build', carrying: 'carry', communicating: 'communicate', concentrating: 'concentrate',
        controlling: 'control', coping: 'cope', dealing: 'deal', developing: 'develop', engaging: 'engage', expressing: 'express',
        feeling: 'feel', following: 'follow', handling: 'handle', having: 'have', keeping: 'keep', learning: 'learn',
        letting: 'let', listening: 'listen', maintaining: 'maintain', making: 'make', motivating: 'motivate',
        navigating: 'navigate', organizing: 'organize', participating: 'participate', persevering: 'persevere', playing: 'play',
        presenting: 'present', preventing: 'prevent', putting: 'put', recognizing: 'recognize', reflecting: 'reflect',
        regulating: 'regulate', representing: 'represent', resolving: 'resolve', respecting: 'respect', staying: 'stay',
        storing: 'store', structuring: 'structure', taking: 'take', thinking: 'think', using: 'use', verbalizing: 'verbalize',
        working: 'work', doing: 'do', managing: 'manage', planning: 'plan', sharing: 'share', showing: 'show',
        enjoying: 'enjoy', processing: 'process', naming: 'name', waiting: 'wait', looking: 'look'
    };
    // "X and Y-ing" -> "X and Y" (zweites Verb einer Aufzählung ebenfalls in die Grundform)
    const enGrundformRest = rest => rest.replace(/\b(and|or) (\w+ing)\b/, (m, und, v) => und + ' ' + (EN_GERUNDIUM[v] || v));
    function fortschrittEN(text) {
        return satz(text);
    }
    function teilweiseEN(text) {
        if (!text) return text;
        let t = text;
        if (EN_HILFE.test(t)) {
            t = t.replace(EN_HILFE, '');
            // "increasingly" nach "can", sonst an den Anfang – aber nicht, wenn der Satz schon
            // einen Fortschritt ausdrückt ("more", "better" ...) oder mit "has"/"is" beginnt
            if (/\b(more|better|faster|calmer)\b/.test(t) || /^(has|is) /.test(t)) { /* bleibt ohne Zusatz */ }
            else if (/^can /.test(t)) t = t.replace(/^can /, 'can increasingly ');
            else t = 'increasingly ' + t;
        }
        return satz(t);
    }
    function themaEN(text) {
        if (!text) return text;
        let t = text;
        let m;
        if ((m = t.match(/^is still learning to (.+)$/))) { t = m[1]; }
        else if ((m = t.match(/^still has difficulty (?:with )?(\w+)(.*)$/)) && EN_GERUNDIUM[m[1]]) { t = EN_GERUNDIUM[m[1]] + enGrundformRest(m[2]); }
        else if ((m = t.match(/^still has difficulty (\w+ly) (\w+)(.*)$/)) && EN_GERUNDIUM[m[2]]) { t = m[1] + ' ' + EN_GERUNDIUM[m[2]] + enGrundformRest(m[3]); } // "actively approaching" -> "actively approach"
        else if ((m = t.match(/^still has difficulty with (.+)$/))) { t = 'keep working on ' + m[1]; }
        else if ((m = t.match(/^is still (\w+ing) (.+)$/)) && EN_GERUNDIUM[m[1]]) { t = EN_GERUNDIUM[m[1]] + ' ' + m[2]; }
        else if ((m = t.match(/^is not yet (.+)$/))) { t = 'become ' + m[1]; }
        else if ((m = t.match(/^(?:still )?shows little (.+)$/))) { t = 'develop more ' + m[1]; }
        else if ((m = t.match(/^does not (?:yet |always )(.+?)(?: yet)?$/))) { t = m[1]; }
        else if ((m = t.match(/^has no experience with (.+?)(?: yet)?$/))) { t = 'gain experience with ' + m[1]; }
        else { t = t.replace(/^still /, '').replace(/ still /, ' ').replace(/ yet$/, ''); }
        return satz(t);
    }

    return {
        de: { fortschritt: fortschrittDE, teilweise: teilweiseDE, thema: themaDE },
        fr: { fortschritt: fortschrittFR, teilweise: teilweiseFR, thema: themaFR },
        en: { fortschritt: fortschrittEN, teilweise: teilweiseEN, thema: themaEN }
    };
})();

// Fortschritte und anzugehende Punkte aus den zusätzlichen Zielen einer Einschätzung
function peiBerichtListen(zusaetzlicheZiele, lang) {
    const kategorien = ['demarches_mentales', 'manieres_apprendre', 'attitudes_relationnelles',
        'attitudes_affectives', 'competences_essentielles', 'culture_loisirs'];
    const f = PEI_FORMAT[lang] || PEI_FORMAT.de;
    const daten = getCurrentZusaetzlicheZiele();
    // Altdaten (2-Stufen-System): 'erreicht' = stufe3, 'ziel' = stufe1
    const norm = s => (s === 'erreicht' ? 'stufe3' : (s === 'ziel' ? 'stufe1' : s));
    const holen = (kat, stufe) => Object.entries((zusaetzlicheZiele || {})[kat] || {})
        .filter(([id, status]) => norm(status) === stufe)
        .map(([id]) => (daten[kat] || []).find(g => g.id === id))
        .filter(Boolean);
    const fortschritte = [], themen = [];
    for (const kat of kategorien) {
        for (const g of holen(kat, 'stufe3')) fortschritte.push(f.fortschritt(g.stufen?.stufe3 || g.title));
        for (const g of holen(kat, 'stufe2')) fortschritte.push(f.teilweise(g.stufen?.stufe2 || g.title));
        for (const g of holen(kat, 'stufe1')) themen.push(f.thema(g.stufen?.stufe1 || g.title));
    }
    return { fortschritte, themen };
}

async function generatePEI() {
    // Sicherstellen, dass alle aktuellen Daten gespeichert sind
    saveToLocalStorage();

    const lang = (state.language === 'fr' || state.language === 'en') ? state.language : 'de';
    const L = peiSprachTexte(lang);

    // --- 1. Load the DOCX template (embedded as base64) ---
    // FR: französische Vorlage; DE und EN: deutsche Vorlage (EN wird übersetzt, siehe PEI_VORLAGE_EN)
    const isFR = lang === 'fr' && typeof TEMPLATE_FR_PEI_CDSE_BASE64 !== 'undefined';
    const templateBase64 = isFR ? TEMPLATE_FR_PEI_CDSE_BASE64 : TEMPLATE_DE_CDSE_BASE64;
    const zip = await JSZip.loadAsync(templateBase64, {base64: true});
    let docXml = await zip.file('word/document.xml').async('string');

    // --- 2. Gather all data ---
    const stammdaten = getStammdaten();
    const datum = iso => eldibDatum(iso, lang);

    // --- 2a. Check for dual assessment (Schüler-Manager) ---
    let einschaetzung1 = null;
    let einschaetzung2 = null;
    let hatZweiEinschaetzungen = false;

    if (smAktuellerSchueler) {
        const liste = smGetListe();
        const schueler = liste.find(s => s.id === smAktuellerSchueler.id);
        if (schueler && schueler.einschaetzung1 && schueler.einschaetzung2) {
            hatZweiEinschaetzungen = true;
            einschaetzung1 = schueler.einschaetzung1;
            einschaetzung2 = schueler.einschaetzung2;
        }
    }

    // Helper: get item color from a saved selections object
    function getItemColorFromSelections(selections, prefix, nr) {
        const code = `${prefix}-${nr}`;
        const sel = selections?.[code];
        if (sel?.status === 'erreicht') return '90EE90';
        if (sel?.status === 'ziel') return 'FFFF00';
        return 'FFFFFF';
    }

    // Use 2nd assessment goals for Zielerfassung (or current if no dual)
    const zieleSelections = hatZweiEinschaetzungen ? einschaetzung2.selections : state.selections;
    const ziele = { verhalten: [], kommunikation: [], sozialisation: [], kognition: [] };

    for (const [code, selection] of Object.entries(zieleSelections || {})) {
        const bereich = findBereichByCode(code);
        const item = findItemByCode(code);
        if (bereich && item && selection.status === 'ziel') {
            ziele[bereich].push({ code, keyword: item.keyword, description: item.description, zieltext: resolveZieltext(code, selection) });
        }
    }

    for (const bereich of Object.keys(ziele)) {
        ziele[bereich].sort((a, b) => parseInt(a.code.split('-').pop()) - parseInt(b.code.split('-').pop()));
    }

    // --- XML helper functions ---
    function escapeXml(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    // Sprache der eingefügten Texte (für die Rechtschreibprüfung in Word)
    const langRpr = '<w:lang w:val="' + L.wLang + '"/>';
    function makeRun(text, bold, italic) {
        const rPr = '<w:rPr>' + (bold ? '<w:b/>' : '') + (italic ? '<w:i/>' : '') + langRpr + '</w:rPr>';
        return '<w:r>' + rPr + '<w:t xml:space="preserve">' + escapeXml(text) + '</w:t></w:r>';
    }
    function makePara(runs) {
        return '<w:p>' + runs + '</w:p>';
    }
    function makeBulletPara(runs) {
        return '<w:p><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="3"/></w:numPr></w:pPr>' + runs + '</w:p>';
    }
    function makeSubBulletPara(runs) {
        return '<w:p><w:pPr><w:numPr><w:ilvl w:val="1"/><w:numId w:val="3"/></w:numPr></w:pPr>' + runs + '</w:p>';
    }

    // --- 3. Remove pink instructional comments (color FF6699) ---
    // Only remove bold/italic pink runs (actual instructions).
    // Non-bold pink text (like "Schüler:in" labels) is kept but de-colored.
    function removePinkRuns(xml) {
        let prev;
        do {
            prev = xml;
            xml = xml.replace(/<w:r\b[^>]*>((?:(?!<\/w:r>)[\s\S])*?w:val="FF6699"(?:(?!<\/w:r>)[\s\S])*?)<\/w:r>/g, function(match, inner) {
                if (inner.includes('<w:b/>') || inner.includes('<w:i/>')) {
                    return ''; // Remove bold/italic pink text (instructional comments)
                }
                return match; // Keep non-bold pink text (structural labels)
            });
        } while (xml !== prev);
        // Remove remaining pink color markers (de-color kept text)
        xml = xml.replace(/<w:color w:val="FF6699"\/>/g, '');
        return xml;
    }
    docXml = removePinkRuns(docXml);

    // --- 3a. Feste Vorlagentexte: EN übersetzen, FR von deutschen Resten befreien ---
    if (lang === 'en') docXml = peiSetzeAbsatzTexte(docXml, PEI_VORLAGE_EN);
    if (isFR) docXml = peiSetzeAbsatzTexte(docXml, PEI_VORLAGE_FR_KORREKTUR);

    // --- 4. Fill shaded boxes on title page ---
    // Shaded boxes are paragraphs with w:fill="F2F2F2"
    function fillShadedBox(xml, boxIndex, text) {
        if (!text) return xml;
        const marker = 'w:fill="F2F2F2"';
        let pos = -1;
        for (let i = 0; i <= boxIndex; i++) {
            pos = xml.indexOf(marker, pos + 1);
            if (pos < 0) return xml;
        }
        const pEnd = xml.indexOf('</w:p>', pos);
        if (pEnd < 0) return xml;
        const textRun = '<w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">' + escapeXml(text) + '</w:t></w:r>';
        return xml.substring(0, pEnd) + textRun + xml.substring(pEnd);
    }
    // Name (ohne Geburtsdatum)
    docXml = fillShadedBox(docXml, 0, stammdaten.schueler_name);
    docXml = fillShadedBox(docXml, 1, stammdaten.matricule);
    docXml = fillShadedBox(docXml, 2, (stammdaten.foerderort && stammdaten.klasse) ? stammdaten.foerderort + ' / ' + stammdaten.klasse : stammdaten.foerderort || stammdaten.klasse);
    // Box 3 (In Zusammenarbeit mit) - leave empty

    // --- 5. Fill Anwesenheitsliste with available data ---
    // Beispielnamen der Vorlage immer ersetzen (sonst stehen sie im fertigen Dokument)
    docXml = docXml.replace('>MUSTERMANN Jacques<', '>' + escapeXml(stammdaten.schueler_name || '') + '<');
    docXml = docXml.replace('>HIRSCH Madeleine; Erziehungsberechtigte<',
        '>' + (stammdaten.eltern1_name ? escapeXml(stammdaten.eltern1_name) + '; ' + L.elternRolle : '') + '<');
    docXml = docXml.replace('>SCHILTZ Micheline; LP<',
        '>' + (stammdaten.einschaetzende ? escapeXml(stammdaten.einschaetzende) + '; CDSE' : '') + '<');
    docXml = docXml.replace('>LAMBERTY Georgius; ESEB<', '><');

    // --- 6. Fill ELDiB page name and birthdate ---
    // Find name label paragraph on ELDiB page and append name
    {
        // Find the second occurrence (first is on title page, second on ELDiB page)
        const firstOcc = docXml.indexOf(L.nameMarke);
        if (firstOcc >= 0 && stammdaten.schueler_name) {
            const secondOcc = docXml.indexOf(L.nameMarke, firstOcc + 1);
            if (secondOcc >= 0) {
                const pEnd = docXml.indexOf('</w:p>', secondOcc);
                if (pEnd >= 0) {
                    const nameRun = '<w:r><w:rPr><w:rFonts w:cstheme="minorHAnsi"/>' + langRpr + '</w:rPr><w:t xml:space="preserve"> ' + escapeXml(stammdaten.schueler_name) + '</w:t></w:r>';
                    docXml = docXml.substring(0, pEnd) + nameRun + docXml.substring(pEnd);
                }
            }
        }
    }
    // Fill Geburtsdatum / Date de naissance / Date of birth (Datum im Format der Sprache)
    {
        const gebPos = docXml.indexOf(L.gebMarke);
        if (gebPos >= 0 && stammdaten.geburtsdatum) {
            const pEnd = docXml.indexOf('</w:p>', gebPos);
            if (pEnd >= 0) {
                const dateRun = '<w:r><w:rPr><w:rFonts w:cstheme="minorHAnsi"/>' + langRpr + '</w:rPr><w:t xml:space="preserve">' + escapeXml(datum(stammdaten.geburtsdatum)) + '</w:t></w:r>';
                docXml = docXml.substring(0, pEnd) + dateRun + docXml.substring(pEnd);
            }
        }
    }

    // --- 7. Color ELDiB grid cells ---
    {
        const tblWidthMarker = 'w:w="7230"';
        const markerPos = docXml.indexOf(tblWidthMarker);
        if (markerPos >= 0) {
            const tblStart = docXml.lastIndexOf('<w:tbl>', markerPos);
            const tblEndIdx = docXml.indexOf('</w:tbl>', markerPos);
            if (tblStart >= 0 && tblEndIdx >= 0) {
                const tblEnd = tblEndIdx + 8;
                let tableXml = docXml.substring(tblStart, tblEnd);
                const domains = ['V', 'K', 'SOZ', 'KOG'];

                // Determine which selections to use for left (1st) and right (2nd) grids
                const leftSelections = hatZweiEinschaetzungen ? einschaetzung1.selections : state.selections;
                const rightSelections = hatZweiEinschaetzungen ? einschaetzung2.selections : null;

                // Remove cell spacing from table to eliminate white gaps between colored cells
                if (tableXml.includes('<w:tblCellSpacing')) {
                    tableXml = tableXml.replace(/<w:tblCellSpacing[^/]*\/>/g, '<w:tblCellSpacing w:w="0" w:type="dxa"/>');
                } else if (tableXml.includes('</w:tblPr>')) {
                    tableXml = tableXml.replace('</w:tblPr>', '<w:tblCellSpacing w:w="0" w:type="dxa"/></w:tblPr>');
                }

                // Two-pass approach: first collect all rows and cells, then color with gap filling
                // Parse all rows
                const allRows = [];
                let tPos = 0;
                while (tPos < tableXml.length) {
                    const trIdx = tableXml.indexOf('<w:tr ', tPos);
                    if (trIdx < 0) break;
                    const trEndIdx = tableXml.indexOf('</w:tr>', trIdx);
                    if (trEndIdx < 0) break;
                    const trEndFull = trEndIdx + 7;
                    allRows.push({ start: trIdx, end: trEndFull, xml: tableXml.substring(trIdx, trEndFull) });
                    tPos = trEndFull;
                }

                // First pass: build color maps for BOTH left (595) and right (638) grids
                const colorMapLeft = [];  // colorMapLeft[rowIdx][colIdx] = { color, hasNumber }
                const colorMapRight = []; // colorMapRight[rowIdx][colIdx] = { color, hasNumber }
                allRows.forEach((row, rowIdx) => {
                    const rowColorsLeft = [{}, {}, {}, {}];
                    const rowColorsRight = [{}, {}, {}, {}];
                    let col595 = 0;
                    let col638 = 0;
                    let rPos = 0;
                    while (rPos < row.xml.length) {
                        const tcIdx = row.xml.indexOf('<w:tc>', rPos);
                        if (tcIdx < 0) break;
                        const tcEndIdx = row.xml.indexOf('</w:tc>', tcIdx);
                        if (tcEndIdx < 0) break;
                        const cellXml = row.xml.substring(tcIdx, tcEndIdx + 7);
                        const widthMatch = cellXml.match(/w:tcW w:w="(\d+)"/);
                        const width = widthMatch ? parseInt(widthMatch[1]) : 0;

                        // Left grid: width 595
                        if (width === 595) {
                            if (col595 < 4) {
                                const textMatches = [...cellXml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)];
                                const cellText = textMatches.map(m => m[1]).join('').trim();
                                const numMatch = cellText.match(/(\d+)$/);
                                const num = numMatch ? parseInt(numMatch[1]) : NaN;
                                if (!isNaN(num) && num >= 1 && num <= 62) {
                                    rowColorsLeft[col595] = { color: getItemColorFromSelections(leftSelections, domains[col595], num), hasNumber: true };
                                } else {
                                    rowColorsLeft[col595] = { color: null, hasNumber: false };
                                }
                            }
                            col595++;
                        }
                        // Right grid: width 638
                        if (width === 638 && rightSelections) {
                            if (col638 < 4) {
                                const textMatches = [...cellXml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)];
                                const cellText = textMatches.map(m => m[1]).join('').trim();
                                const numMatch = cellText.match(/(\d+)$/);
                                const num = numMatch ? parseInt(numMatch[1]) : NaN;
                                if (!isNaN(num) && num >= 1 && num <= 62) {
                                    rowColorsRight[col638] = { color: getItemColorFromSelections(rightSelections, domains[col638], num), hasNumber: true };
                                } else {
                                    rowColorsRight[col638] = { color: null, hasNumber: false };
                                }
                            }
                            col638++;
                        }
                        rPos = tcEndIdx + 7;
                    }
                    colorMapLeft.push(rowColorsLeft);
                    colorMapRight.push(rowColorsRight);
                });

                // Second pass: fill gaps for both grids
                for (let col = 0; col < 4; col++) {
                    let currentColorLeft = 'FFFFFF';
                    let currentColorRight = 'FFFFFF';
                    for (let r = colorMapLeft.length - 1; r >= 0; r--) {
                        if (colorMapLeft[r][col]?.hasNumber) {
                            currentColorLeft = colorMapLeft[r][col].color;
                        } else if (colorMapLeft[r][col] && !colorMapLeft[r][col].hasNumber) {
                            colorMapLeft[r][col].color = currentColorLeft;
                        }
                        if (colorMapRight[r][col]?.hasNumber) {
                            currentColorRight = colorMapRight[r][col].color;
                        } else if (colorMapRight[r][col] && !colorMapRight[r][col].hasNumber) {
                            colorMapRight[r][col].color = currentColorRight;
                        }
                    }
                }

                // Third pass: apply colors to all cells
                function applyCellColor(cellXml, color) {
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

                let newTable = tableXml.substring(0, allRows.length > 0 ? allRows[0].start : tableXml.length);
                allRows.forEach((row, rowIdx) => {
                    let col595 = 0;
                    let col638 = 0;
                    let newRow = '';
                    let rPos = 0;
                    while (rPos < row.xml.length) {
                        const tcIdx = row.xml.indexOf('<w:tc>', rPos);
                        if (tcIdx < 0) { newRow += row.xml.substring(rPos); break; }
                        newRow += row.xml.substring(rPos, tcIdx);
                        const tcEndIdx = row.xml.indexOf('</w:tc>', tcIdx);
                        if (tcEndIdx < 0) { newRow += row.xml.substring(tcIdx); break; }
                        let cellXml = row.xml.substring(tcIdx, tcEndIdx + 7);
                        const widthMatch = cellXml.match(/w:tcW w:w="(\d+)"/);
                        const width = widthMatch ? parseInt(widthMatch[1]) : 0;
                        // Left grid coloring (width 595)
                        if (width === 595 && col595 < 4) {
                            const color = colorMapLeft[rowIdx][col595]?.color || 'FFFFFF';
                            cellXml = applyCellColor(cellXml, color);
                            col595++;
                        } else if (width === 595) {
                            col595++;
                        }
                        // Right grid coloring (width 638)
                        if (width === 638 && rightSelections && col638 < 4) {
                            const color = colorMapRight[rowIdx][col638]?.color || 'FFFFFF';
                            cellXml = applyCellColor(cellXml, color);
                            col638++;
                        } else if (width === 638) {
                            col638++;
                        }
                        newRow += cellXml;
                        rPos = tcEndIdx + 7;
                    }
                    newTable += newRow;
                    if (rowIdx < allRows.length - 1) {
                        newTable += tableXml.substring(row.end, allRows[rowIdx + 1].start);
                    }
                });
                if (allRows.length > 0) {
                    newTable += tableXml.substring(allRows[allRows.length - 1].end);
                }

                docXml = docXml.substring(0, tblStart) + newTable + docXml.substring(tblEnd);
            }
        }
    }

    // --- 8./9. Datum im Raster (links/rechts) und bei der Zielerfassung ---
    // Die Vorlagen haben drei Absätze "Datum:" / "Date:" (in FR über mehrere Runs verteilt):
    // [0] Raster links (1. bzw. aktuelle Einschätzung), [1] Raster rechts (2. Einschätzung),
    // [2] Zielerfassung. Von hinten nach vorne einfügen, damit die Positionen stimmen.
    {
        const stellen = peiFindeAbsaetze(docXml, L.datumMarke);
        const datumLinks = hatZweiEinschaetzungen ? einschaetzung1.stammdaten?.einschaetzungsdatum : stammdaten.einschaetzungsdatum;
        const datumRechts = hatZweiEinschaetzungen ? einschaetzung2.stammdaten?.einschaetzungsdatum : '';
        const datumZiele = hatZweiEinschaetzungen ? einschaetzung2.stammdaten?.einschaetzungsdatum : stammdaten.einschaetzungsdatum;
        const rasterRun = d => '<w:r><w:rPr><w:rFonts w:cstheme="minorHAnsi"/><w:sz w:val="14"/><w:szCs w:val="14"/></w:rPr><w:t xml:space="preserve"> ' + escapeXml(datum(d)) + '</w:t></w:r>';
        const zielRun = d => '<w:r><w:t xml:space="preserve"> ' + escapeXml(datum(d)) + '</w:t></w:r>';
        const einfuegen = [];
        if (stellen.length >= 3) {
            if (datumLinks) einfuegen.push([stellen[0], rasterRun(datumLinks)]);
            if (datumRechts) einfuegen.push([stellen[1], rasterRun(datumRechts)]);
            if (datumZiele) einfuegen.push([stellen[stellen.length - 1], zielRun(datumZiele)]);
        } else if (stellen.length > 0 && datumLinks) {
            einfuegen.push([stellen[0], rasterRun(datumLinks)]);
        }
        einfuegen.sort((a, b) => b[0] - a[0]).forEach(([pos, run]) => {
            docXml = docXml.substring(0, pos) + run + docXml.substring(pos);
        });
    }

    // Fill each domain in the Zielerfassung table
    function buildDomainContent(domainGoals) {
        let content = '';
        if (domainGoals && domainGoals.length > 0) {
            for (const goal of domainGoals) {
                // COMP-25 Keyword: Description (Code in der Anzeigeform der Sprache)
                content += makePara(makeRun(getDisplayCode(goal.code, lang) + ' ' + goal.keyword + ': ', true) + makeRun(goal.description));
                content += makePara('');
                // Zielformulierung in den Anführungszeichen der Sprache
                content += makePara(makeRun(L.zielformulierung, true) + makeRun(L.anf[0] + goal.zieltext + L.anf[1]));
                content += makePara('');
                // Mögliche Umsetzung with sub-bullets
                content += makePara(makeRun(L.umsetzung, true));
                const interventions = getInterventionen(goal.code);
                for (const interv of interventions) {
                    content += makeSubBulletPara(makeRun(interv));
                }
                content += makePara('');
                content += makePara('');
            }
        } else {
            content += makePara('');
        }
        return content;
    }

    function replaceDomainCell(xml, domainLabel, newContent) {
        // First try direct match
        let labelPos = xml.indexOf('>' + domainLabel + '<');

        // If not found, search by concatenating text across runs in each row
        // (handles cases where label text is split across multiple w:r elements)
        if (labelPos < 0) {
            let searchPos = 0;
            while (searchPos < xml.length) {
                const trIdx = xml.indexOf('<w:tr', searchPos);
                if (trIdx < 0) break;
                const trEndIdx = xml.indexOf('</w:tr>', trIdx);
                if (trEndIdx < 0) break;
                const rowXml = xml.substring(trIdx, trEndIdx + 7);

                // Find first cell and concatenate all text content
                const firstTcEnd = rowXml.indexOf('</w:tc>');
                if (firstTcEnd >= 0) {
                    const firstCellXml = rowXml.substring(0, firstTcEnd);
                    const textMatches = [...firstCellXml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)];
                    const cellText = textMatches.map(m => m[1]).join('');
                    if (cellText.includes(domainLabel)) {
                        labelPos = trIdx; // Use row start as reference position
                        break;
                    }
                }
                searchPos = trEndIdx + 7;
            }
        }

        if (labelPos < 0) return xml;
        // Find the row containing this label
        const trStart = xml.lastIndexOf('<w:tr', labelPos);
        const trEnd = xml.indexOf('</w:tr>', labelPos);
        if (trStart < 0 || trEnd < 0) return xml;
        const trEndFull = trEnd + 7;
        const rowXml = xml.substring(trStart, trEndFull);
        // Find the second <w:tc> (content cell)
        const firstTcEnd = rowXml.indexOf('</w:tc>');
        if (firstTcEnd < 0) return xml;
        const secondTcStart = rowXml.indexOf('<w:tc>', firstTcEnd);
        if (secondTcStart < 0) return xml;
        const secondTcEnd = rowXml.indexOf('</w:tc>', secondTcStart);
        if (secondTcEnd < 0) return xml;
        const contentCell = rowXml.substring(secondTcStart, secondTcEnd + 7);
        // Preserve <w:tcPr>...</w:tcPr> from the content cell
        const tcPrEnd = contentCell.indexOf('</w:tcPr>');
        let newCell;
        if (tcPrEnd >= 0) {
            newCell = contentCell.substring(0, tcPrEnd + 9) + newContent + '</w:tc>';
        } else {
            newCell = '<w:tc>' + newContent + '</w:tc>';
        }
        const newRow = rowXml.substring(0, secondTcStart) + newCell + rowXml.substring(secondTcEnd + 7);
        return xml.substring(0, trStart) + newRow + xml.substring(trEndFull);
    }

    // Find the Zielerfassung table (identified by domain label with btLr text direction)
    const domainMapping = [
        { label: L.domaenen[0], goals: ziele.verhalten },
        { label: L.domaenen[1], goals: ziele.kommunikation },
        { label: L.domaenen[2], goals: ziele.sozialisation },
        { label: L.domaenen[3], goals: ziele.kognition }
    ];

    for (const domain of domainMapping) {
        const content = buildDomainContent(domain.goals);
        docXml = replaceDomainCell(docXml, domain.label, content);
    }

    // "Andere ELDiB-unabhängige Ziele" cell - left empty (zusätzliche Ziele go to Bericht only)
    docXml = replaceDomainCell(docXml, L.andere, makePara(''));

    // --- 10. Fill Bericht section ---
    // Fortschritte (zusätzliche Ziele stufe3 + stufe2) und anzugehende Themen (stufe1):
    //   zwei Einschätzungen: linke Spalte = 1., rechte Spalte = 2. Einschätzung
    //   eine Einschätzung:   linke Spalte = aktuelle Einschätzung
    // Die Zeile "Datum" bekommt das Datum der jeweiligen Einschätzung.
    {
        // Fill a specific cell (cellIndex: 1=left/2nd cell, 2=right/3rd cell) in a Bericht row
        function fillBerichtCell(xml, tableLabel, rowLabel, items, cellIndex, alsListe = true) {
            // Find table label (direct or concatenated text search)
            let tableLabelPos = xml.indexOf(tableLabel);
            if (tableLabelPos < 0) {
                // Search by concatenating text from paragraphs
                const pRegex = /<w:p[ >][\s\S]*?<\/w:p>/g;
                let pMatch;
                while ((pMatch = pRegex.exec(xml)) !== null) {
                    const texts = [...pMatch[0].matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)];
                    const fullText = texts.map(m => m[1]).join('');
                    if (fullText.includes(tableLabel)) {
                        tableLabelPos = pMatch.index;
                        break;
                    }
                }
            }
            if (tableLabelPos < 0) return xml;

            // Find row with the rowLabel (direct or concatenated)
            let rowPos = xml.indexOf('>' + rowLabel + '<', tableLabelPos);
            if (rowPos < 0) {
                // Search by concatenating text in rows after tableLabelPos
                let searchPos = tableLabelPos;
                while (searchPos < xml.length) {
                    const trIdx = xml.indexOf('<w:tr', searchPos);
                    if (trIdx < 0) break;
                    const trEndIdx = xml.indexOf('</w:tr>', trIdx);
                    if (trEndIdx < 0) break;
                    const rowXml = xml.substring(trIdx, trEndIdx + 7);
                    const texts = [...rowXml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)];
                    const fullText = texts.map(m => m[1]).join('');
                    if (fullText.includes(rowLabel)) {
                        rowPos = trIdx;
                        break;
                    }
                    searchPos = trEndIdx + 7;
                }
            }
            if (rowPos < 0) return xml;

            const trStart = xml.lastIndexOf('<w:tr', rowPos);
            const trEnd = xml.indexOf('</w:tr>', rowPos);
            if (trStart < 0 || trEnd < 0) return xml;
            const rowContent = xml.substring(trStart, trEnd + 7);

            // Find all cells in this row
            const cellPositions = [];
            let searchPos = 0;
            while (true) {
                const tcStart = rowContent.indexOf('<w:tc>', searchPos);
                if (tcStart < 0) break;
                const tcEnd = rowContent.indexOf('</w:tc>', tcStart);
                if (tcEnd < 0) break;
                cellPositions.push({ start: tcStart, end: tcEnd + 7 });
                searchPos = tcEnd + 7;
            }

            // cellIndex 1 = 2nd cell (left), cellIndex 2 = 3rd cell (right)
            const targetIdx = cellIndex; // 0-based: cell 0=label, 1=left, 2=right
            if (targetIdx >= cellPositions.length) return xml;

            const targetCell = rowContent.substring(cellPositions[targetIdx].start, cellPositions[targetIdx].end);
            let paras = '';
            for (const item of items) {
                // Aufzählung für Fortschritte/Themen, einfacher Absatz für das Datum
                paras += alsListe ? makeBulletPara(makeRun(item)) : makePara(makeRun(item));
            }
            if (!paras) paras = makePara('');
            const tcPrEnd = targetCell.indexOf('</w:tcPr>');
            let newCell;
            if (tcPrEnd >= 0) {
                newCell = targetCell.substring(0, tcPrEnd + 9) + paras + '</w:tc>';
            } else {
                newCell = '<w:tc>' + paras + '</w:tc>';
            }
            const newRow = rowContent.substring(0, cellPositions[targetIdx].start) + newCell + rowContent.substring(cellPositions[targetIdx].end);
            return xml.substring(0, trStart) + newRow + xml.substring(trEnd + 7);
        }

        // Spalten: [Spalte, Einschätzungsdaten]
        const spalten = hatZweiEinschaetzungen
            ? [[1, einschaetzung1.zusaetzlicheZiele, einschaetzung1.stammdaten?.einschaetzungsdatum],
               [2, einschaetzung2.zusaetzlicheZiele, einschaetzung2.stammdaten?.einschaetzungsdatum]]
            : [[1, state.zusaetzlicheZiele, stammdaten.einschaetzungsdatum]];

        for (const [spalte, zusatz, spaltenDatum] of spalten) {
            const listen = peiBerichtListen(zusatz, lang);
            if (listen.fortschritte.length > 0) {
                docXml = fillBerichtCell(docXml, L.fortschritte, 'CDSE', listen.fortschritte, spalte);
            }
            if (listen.themen.length > 0) {
                docXml = fillBerichtCell(docXml, L.themen, 'CDSE', listen.themen, spalte);
            }
            // Datum nur eintragen, wenn die Spalte auch Inhalte hat
            if (spaltenDatum && listen.fortschritte.length > 0) {
                docXml = fillBerichtCell(docXml, L.fortschritte, L.datumZeile, [datum(spaltenDatum)], spalte, false);
            }
            if (spaltenDatum && listen.themen.length > 0) {
                docXml = fillBerichtCell(docXml, L.themen, L.datumZeile, [datum(spaltenDatum)], spalte, false);
            }
        }
    }

    // --- 11. Write back and download ---
    zip.file('word/document.xml', docXml);
    if (lang === 'en') {
        // Englisches Dokument: Standardsprache für die Rechtschreibprüfung auf Englisch stellen
        const stylesDatei = zip.file('word/styles.xml');
        if (stylesDatei) {
            const styles = await stylesDatei.async('string');
            zip.file('word/styles.xml', styles.replace(/<w:lang w:val="(?:de-LU|de-DE|lb-LU)"/g, '<w:lang w:val="en-US"'));
        }
        zip.file('word/document.xml', docXml.replace(/<w:lang w:val="(?:de-LU|de-DE|lb-LU)"/g, '<w:lang w:val="en-US"'));
    }
    const blob = await zip.generateAsync({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    saveAs(blob, buildFilename(L.datei));
}


async function generateComplement() {
    const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType, VerticalAlign } = docx;
    const isFR_C = state.language === 'fr';
    const isEN_C = state.language === 'en';
    // Dreisprachiger Label-Helper: tri(englisch, franzoesisch, deutsch)
    const tri = (en, fr, de) => isEN_C ? en : (isFR_C ? fr : de);

    const stammdaten = getStammdaten();
    const erreichte = { verhalten: [], kommunikation: [], sozialisation: [], kognition: [] };

    for (const [code, selection] of Object.entries(state.selections)) {
        if (selection.status === 'erreicht') {
            const bereich = findBereichByCode(code);
            const item = findItemByCode(code);
            if (bereich && item) {
                erreichte[bereich].push({
                    code,
                    keyword: item.keyword,
                    description: item.description,
                    nr: parseInt(code.split('-').pop())
                });
            }
        }
    }

    for (const bereich of Object.keys(erreichte)) {
        // Sort ascending (ordre croissant) and get last 4
        erreichte[bereich] = erreichte[bereich].sort((a, b) => a.nr - b.nr).slice(-4);
    }

    // Lux-Konvention: Eingabe "Nachname, Vorname"
    const splitNames = splitSchuelerName(stammdaten.schueler_name || '');
    const nom = splitNames.nachname || '';
    const prenom = splitNames.vorname || '';
    const vorname = prenom || nom || tri('The student', 'L\'élève', 'Die/Der Schüler:in'); // Vorname für die Formulierungen

    const cellBorders = { top: {style: BorderStyle.SINGLE, size: 1}, bottom: {style: BorderStyle.SINGLE, size: 1}, left: {style: BorderStyle.SINGLE, size: 1}, right: {style: BorderStyle.SINGLE, size: 1} };
    const noBorders = { top: {style: BorderStyle.NONE}, bottom: {style: BorderStyle.NONE}, left: {style: BorderStyle.NONE}, right: {style: BorderStyle.NONE} };

    // Helper: Create a row with domain and evaluation
    function createDomainRow(domainName, items, isEldib = false) {
        // Build paragraphs with code, keyword, and description for each item
        const itemParagraphs = items && items.length > 0
            ? items.flatMap(i => [
                new Paragraph({
                    children: [new TextRun({text: `${getDisplayCode(i.code)} - ${i.keyword}`, bold: true, size: 22})],
                    spacing: { before: 120, after: 40 }
                }),
                new Paragraph({
                    children: [new TextRun({text: i.description || '', size: 20})],
                    spacing: { after: 160 }
                })
            ])
            : [new Paragraph('')];

        return new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({children: [new TextRun({text: domainName, bold: true, size: 22})]}),
                        isEldib ? new Paragraph({children: [new TextRun({text: tri('(per DTORF-R)', '(selon ELDiB)', '(laut ELDiB)'), italics: true, size: 18})]}) : new Paragraph('')
                    ],
                    borders: cellBorders,
                    width: {size: 35, type: WidthType.PERCENTAGE}
                }),
                new TableCell({
                    children: itemParagraphs,
                    borders: cellBorders,
                    width: {size: 65, type: WidthType.PERCENTAGE}
                })
            ]
        });
    }

    // Helper: Create checkbox row
    function createCheckboxRow(label) {
        return new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({children: [new TextRun({text: `☐ ${label}`, size: 22})]})],
                    borders: cellBorders,
                    width: {size: 35, type: WidthType.PERCENTAGE}
                }),
                new TableCell({
                    children: [new Paragraph('')],
                    borders: cellBorders,
                    width: {size: 65, type: WidthType.PERCENTAGE}
                })
            ]
        });
    }

    const children = [];

    // Header: NOM and Prénom
    children.push(new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('LAST NAME', 'NOM', 'NAME'), bold: true, size: 22})]})], borders: noBorders, width: {size: 50, type: WidthType.PERCENTAGE} }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('First name', 'Prénom', 'Vorname'), bold: true, size: 22})]})], borders: noBorders, width: {size: 50, type: WidthType.PERCENTAGE} })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: nom, size: 22})]})], borders: cellBorders }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: prenom, size: 22})]})], borders: cellBorders })
                ]
            })
        ],
        width: { size: 100, type: WidthType.PERCENTAGE }
    }));

    children.push(new Paragraph({ spacing: { after: 100 } }));

    // Geburtsdatum and Matricule
    const gebFormatted = eldibDatum(stammdaten.geburtsdatum); // DE TT.MM.JJJJ, FR/EN TT/MM/JJJJ
    children.push(new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Date of birth', 'Date de naissance', 'Geburtsdatum'), bold: true, size: 22})]})], borders: noBorders, width: {size: 50, type: WidthType.PERCENTAGE} }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('ID number (matricule)', 'Matricule', 'Matricule'), bold: true, size: 22})]})], borders: noBorders, width: {size: 50, type: WidthType.PERCENTAGE} })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: gebFormatted, size: 22})]})], borders: cellBorders }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: stammdaten.matricule || '', size: 22})]})], borders: cellBorders })
                ]
            })
        ],
        width: { size: 100, type: WidthType.PERCENTAGE }
    }));

    children.push(new Paragraph({ spacing: { after: 100 } }));

    // Lycée/Classe and Schuljahr/Periode
    const periodeLabel = stammdaten.periodenTyp === 'semester'
        ? tri('Semester', 'Semestre', 'Semester')
        : tri('Trimester', 'Trimestre', 'Trimester');
    const periodeText = stammdaten.periode ? `${periodeLabel} ${stammdaten.periode}` : '';
    const schuljahrPeriode = [stammdaten.schuljahr, periodeText].filter(Boolean).join(' — ');

    children.push(new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('School / Class', 'École / Classe', 'Schule / Klasse'), bold: true, size: 22})]})], borders: noBorders, width: {size: 50, type: WidthType.PERCENTAGE} }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('School year / Period', 'Année scolaire / Période', 'Schuljahr / Periode'), bold: true, size: 22})]})], borders: noBorders, width: {size: 50, type: WidthType.PERCENTAGE} })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: `${stammdaten.foerderort || ''} / ${stammdaten.klasse || ''}`, size: 22})]})], borders: cellBorders }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: schuljahrPeriode, size: 22})]})], borders: cellBorders })
                ]
            })
        ],
        width: { size: 100, type: WidthType.PERCENTAGE }
    }));

    children.push(new Paragraph({ spacing: { after: 300 } }));

    // Section: Compétences transversales
    children.push(new Paragraph({
        children: [new TextRun({ text: tri('☑ Cross-curricular competencies', '☑ Compétences transversales', '☑ Fachübergreifende Kompetenzen'), bold: true, size: 24 })],
        spacing: { after: 100 }
    }));

    // Table header for transversales
    children.push(new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Competency areas to assess', 'Domaines de compétences à évaluer', 'Zu bewertende Kompetenzbereiche'), bold: true, size: 22})]})], borders: cellBorders, shading: {fill: 'D9D9D9'}, width: {size: 35, type: WidthType.PERCENTAGE} }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Commented evaluation of performance and progress', 'Évaluation commentée des performances et des progrès', 'Kommentierte Bewertung der Leistungen und Fortschritte'), bold: true, size: 22})]})], borders: cellBorders, shading: {fill: 'D9D9D9'}, width: {size: 65, type: WidthType.PERCENTAGE} })
                ]
            }),
            createDomainRow(tri('Behavior', 'Comportement', 'Verhalten'), erreichte.verhalten, true),
            createDomainRow(tri('Communication', 'Communication', 'Kommunikation'), erreichte.kommunikation, true),
            createDomainRow(tri('Socialization', 'Socialisation', 'Sozialisation'), erreichte.sozialisation, true),
            createDomainRow(tri('Academics/Cognition', 'Cognition', 'Kognition'), erreichte.kognition, true)
        ],
        width: { size: 100, type: WidthType.PERCENTAGE }
    }));

    children.push(new Paragraph({ spacing: { after: 300 } }));

    // Helper: Replace "Ich"/"Je" with vorname in text, and format 3rd person descriptions
    function replaceIchWithVorname(text) {
        if (isEN_C) {
            let result = text
                .replace(/^I am /i, `${vorname} is `)
                .replace(/^I have /i, `${vorname} has `)
                .replace(/^I can /i, `${vorname} can `)
                .replace(/^I /i, `${vorname} `);
            if (result === text && !text.toLowerCase().startsWith('i ')) {
                result = `${vorname} ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
            }
            return result;
        }
        if (isFR_C) {
            // French: "Je..." → "Vorname..."
            let result = text
                .replace(/^Je peux/i, `${vorname} peut`)
                .replace(/^J'ai/i, `${vorname} a`)
                .replace(/^Je suis/i, `${vorname} est`)
                .replace(/^Je montre/i, `${vorname} montre`)
                .replace(/^Je fais/i, `${vorname} fait`)
                .replace(/^J'accepte/i, `${vorname} accepte`)
                .replace(/^J'utilise/i, `${vorname} utilise`)
                .replace(/^Je m'/i, `${vorname} s'`)
                .replace(/^Je me/i, `${vorname} se`)
                .replace(/^J'/i, `${vorname} `)
                .replace(/^Je /i, `${vorname} `);
            // Handle 3rd person format
            if (result === text && !text.toLowerCase().startsWith('je ') && !text.toLowerCase().startsWith('j\'')) {
                result = `${vorname} ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
            }
            return result;
        }
        // German: "Ich..." → "Vorname..."
        let result = text
            .replace(/^Ich kann/i, `${vorname} kann`)
            .replace(/^Ich habe/i, `${vorname} hat`)
            .replace(/^Ich bin/i, `${vorname} ist`)
            .replace(/^Ich zeige/i, `${vorname} zeigt`)
            .replace(/^Ich achte/i, `${vorname} achtet`)
            .replace(/^Ich ernähre/i, `${vorname} ernährt`)
            .replace(/^Ich vertraue/i, `${vorname} vertraut`)
            .replace(/^Ich akzeptiere/i, `${vorname} akzeptiert`)
            .replace(/^Ich wiederhole/i, `${vorname} wiederholt`)
            .replace(/^Ich /i, `${vorname} `);

        // Handle new 3-Stufen format (already in 3rd person, just add vorname at start if needed)
        if (result === text && !text.toLowerCase().startsWith('ich ')) {
            result = `${vorname} ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
        }

        return result;
    }

    // Helper: Get goal text for Complément - supports new 3-stufen structure
    function getGoalTextComplement(goal, stufe) {
        if (goal.stufen && goal.stufen[stufe]) {
            return goal.stufen[stufe];
        }
        // Legacy support
        return goal.ziel || goal.title;
    }

    // Helper: Create row with selected goals for Complément - Items in order without grouping
    function createZusatzRowComplement(categoryName, categoryKey) {
        // Alle Ziele (stufe3 und stufe2) sammeln und in Originalreihenfolge anzeigen
        const erreichtGoals = getZusatzErreicht(categoryKey); // stufe3
        const teilweiseGoals = getZusatzTeilweise(categoryKey); // stufe2

        // Alle Ziele zusammenführen und nach ID sortieren (Originalreihenfolge)
        const allGoals = [
            ...erreichtGoals.map(g => ({ ...g, stufe: 'stufe3' })),
            ...teilweiseGoals.map(g => ({ ...g, stufe: 'stufe2' }))
        ].sort((a, b) => {
            // Sort by ID to maintain original catalogue order
            const aNum = parseInt(a.id.replace(/[^0-9]/g, '')) || 0;
            const bNum = parseInt(b.id.replace(/[^0-9]/g, '')) || 0;
            return aNum - bNum;
        });

        const hasGoals = allGoals.length > 0;
        const checkbox = hasGoals ? '☑' : '☐';

        // Build evaluation text - items in order without grouping headings
        const evaluationParagraphs = [];

        allGoals.forEach(g => {
            evaluationParagraphs.push(new Paragraph({
                children: [new TextRun({text: '• ' + g.title, bold: true, size: 22})],
                spacing: { before: 40, after: 20 }
            }));
            let zielMitVorname = replaceIchWithVorname(getGoalTextComplement(g, g.stufe));
            if (zielMitVorname && !/[.!?]$/.test(zielMitVorname)) zielMitVorname += '.'; // ganzer Satz
            evaluationParagraphs.push(new Paragraph({
                children: [new TextRun({text: '  ' + zielMitVorname, size: 22})],
                spacing: { after: 80 }
            }));
        });

        if (evaluationParagraphs.length === 0) {
            evaluationParagraphs.push(new Paragraph(''));
        }

        return new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({children: [new TextRun({text: `${checkbox} ${categoryName}`, size: 22})]})],
                    borders: cellBorders,
                    width: {size: 35, type: WidthType.PERCENTAGE}
                }),
                new TableCell({
                    children: evaluationParagraphs,
                    borders: cellBorders,
                    width: {size: 65, type: WidthType.PERCENTAGE}
                })
            ]
        });
    }

    // Kästchen eines Abschnitts: angekreuzt, sobald eine seiner Kategorien Einträge hat
    function abschnittBox(kategorien) {
        return kategorien.some(k => getZusatzErreicht(k).length + getZusatzTeilweise(k).length > 0) ? '☑' : '☐';
    }

    // Section: Autres domaines
    children.push(new Paragraph({
        children: [new TextRun({ text: abschnittBox(['demarches_mentales', 'manieres_apprendre', 'attitudes_relationnelles', 'attitudes_affectives'])
            + tri(' Other competency areas:', ' Autres domaines de compétences :', ' Weitere Kompetenzbereiche:'), bold: true, size: 24 })],
        spacing: { after: 100 }
    }));

    children.push(new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Competency areas to assess', 'Domaines de compétences à évaluer', 'Zu bewertende Kompetenzbereiche'), bold: true, size: 22})]})], borders: cellBorders, shading: {fill: 'D9D9D9'}, width: {size: 35, type: WidthType.PERCENTAGE} }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Commented evaluation of performance and progress', 'Évaluation commentée des performances et des progrès', 'Kommentierte Bewertung der Leistungen und Fortschritte'), bold: true, size: 22})]})], borders: cellBorders, shading: {fill: 'D9D9D9'}, width: {size: 65, type: WidthType.PERCENTAGE} })
                ]
            }),
            createZusatzRowComplement(tri('Cognitive strategies', 'Démarches mentales', 'Denkweisen'), 'demarches_mentales'),
            createZusatzRowComplement(tri('Learning approaches', 'Manières d\'apprendre', 'Lernweisen'), 'manieres_apprendre'),
            createZusatzRowComplement(tri('Relational attitudes', 'Attitudes relationnelles', 'Beziehungshaltungen'), 'attitudes_relationnelles'),
            createZusatzRowComplement(tri('Emotional attitudes', 'Attitudes affectives', 'Emotionale Haltungen'), 'attitudes_affectives')
        ],
        width: { size: 100, type: WidthType.PERCENTAGE }
    }));

    children.push(new Paragraph({ spacing: { after: 300 } }));

    // Section: Compétences essentielles
    children.push(new Paragraph({
        children: [new TextRun({ text: abschnittBox(['culture_loisirs', 'competences_essentielles'])
            + tri(' Essential competencies for independent living and maximum participation', ' Compétences essentielles à la vie autonome et à la participation maximale', ' Wesentliche Kompetenzen für ein selbstständiges Leben und maximale Teilhabe'), bold: true, size: 24 })],
        spacing: { after: 100 }
    }));

    children.push(new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Competency areas to assess', 'Domaines de compétences à évaluer', 'Zu bewertende Kompetenzbereiche'), bold: true, size: 22})]})], borders: cellBorders, shading: {fill: 'D9D9D9'}, width: {size: 35, type: WidthType.PERCENTAGE} }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Commented evaluation of performance and progress', 'Évaluation commentée des performances et des progrès', 'Kommentierte Bewertung der Leistungen und Fortschritte'), bold: true, size: 22})]})], borders: cellBorders, shading: {fill: 'D9D9D9'}, width: {size: 65, type: WidthType.PERCENTAGE} })
                ]
            }),
            createZusatzRowComplement(tri('Culture and leisure', 'Culture et loisirs', 'Kultur und Freizeit'), 'culture_loisirs'),
            createZusatzRowComplement(tri('Essential competencies', 'Compétences essentielles', 'Wesentliche Kompetenzen'), 'competences_essentielles')
        ],
        width: { size: 100, type: WidthType.PERCENTAGE }
    }));

    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: { font: "Calibri", size: 22 },
                    paragraph: { spacing: { line: 276 } }
                }
            }
        },
        sections: [{
            properties: {
                page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } }
            },
            children
        }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, buildFilename('Complement'));
}

// ==================== SCHLANKE PEI-VERSION ====================
// Generiert ein schlankes Word-Dokument mit nur den ELDiB-Tabellen
// (Förderziele pro Bereich mit Zielformulierungen). Ohne Anamnese
// und Interventionen - diese ergänzen die Nutzer selbst.
async function generateSchlankPEI() {
    saveToLocalStorage();
    const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
            WidthType, BorderStyle, AlignmentType, HeadingLevel } = docx;

    const isFR = state.language === 'fr';
    const isEN = state.language === 'en';
    const stammdaten = getStammdaten();
    const eldibData = getCurrentEldibData();

    // Namen aufteilen (Lux-Konvention "Nachname, Vorname")
    const split = splitSchuelerName(stammdaten.schueler_name || '');
    const _placeholderName = isEN ? 'The student' : (isFR ? 'L\'élève' : 'Der/Die Schüler:in');
    const fullName = stammdaten.schueler_name || _placeholderName;
    const vorname = split.vorname || split.nachname || _placeholderName;

    // Ziele pro Bereich einsammeln
    const zielePerBereich = { verhalten: [], kommunikation: [], sozialisation: [], kognition: [] };
    for (const [code, selection] of Object.entries(state.selections)) {
        if (selection?.status !== 'ziel') continue;
        const bereich = findBereichByCode(code);
        const item = findItemByCode(code);
        if (bereich && item && zielePerBereich[bereich]) {
            zielePerBereich[bereich].push({
                code,
                keyword: item.keyword,
                description: item.description,
                zieltext: resolveZieltext(code, selection),
                nr: parseInt(code.split('-').pop()) || 0
            });
        }
    }
    for (const b of Object.keys(zielePerBereich)) {
        zielePerBereich[b].sort((a, b2) => a.nr - b2.nr);
    }

    const cellBorders = {
        top: { style: BorderStyle.SINGLE, size: 4, color: '666666' },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: '666666' },
        left: { style: BorderStyle.SINGLE, size: 4, color: '666666' },
        right: { style: BorderStyle.SINGLE, size: 4, color: '666666' }
    };

    const children = [];

    // Titel
    const titleText = isEN ? 'IEP – DTORF-R Tables (lean version)'
        : (isFR ? 'PEI – Tableaux ELDiB (version allégée)' : 'PEI – ELDiB-Tabellen (schlanke Version)');
    children.push(new Paragraph({
        children: [new TextRun({ text: titleText, bold: true, size: 32 })],
        spacing: { after: 200 }
    }));

    // Header: Name + Datum (DE TT.MM.JJJJ, FR/EN TT/MM/JJJJ)
    const jetzt = new Date();
    const heute = eldibDatum(`${jetzt.getFullYear()}-${String(jetzt.getMonth() + 1).padStart(2, '0')}-${String(jetzt.getDate()).padStart(2, '0')}`);
    const studentLabel = isEN ? 'Student: ' : (isFR ? 'Élève : ' : 'Schüler:in: ');
    const dateLabel    = isEN ? 'Date: '    : (isFR ? 'Date : '   : 'Datum: ');
    const classLabel   = isEN ? 'Class: '   : (isFR ? 'Classe : ' : 'Klasse: ');
    const schoolLabel  = isEN ? 'School: '  : (isFR ? 'École : '  : 'Schule: ');
    children.push(new Paragraph({
        children: [
            new TextRun({ text: studentLabel, bold: true, size: 22 }),
            new TextRun({ text: fullName, size: 22 }),
            new TextRun({ text: '    ', size: 22 }),
            new TextRun({ text: dateLabel, bold: true, size: 22 }),
            new TextRun({ text: eldibDatum(stammdaten.einschaetzungsdatum) || heute, size: 22 })
        ],
        spacing: { after: 100 }
    }));
    if (stammdaten.klasse || stammdaten.foerderort) {
        children.push(new Paragraph({
            children: [
                new TextRun({ text: classLabel, bold: true, size: 22 }),
                new TextRun({ text: stammdaten.klasse || '—', size: 22 }),
                new TextRun({ text: '    ', size: 22 }),
                new TextRun({ text: schoolLabel, bold: true, size: 22 }),
                new TextRun({ text: stammdaten.foerderort || '—', size: 22 })
            ],
            spacing: { after: 300 }
        }));
    }

    // Pro Bereich eine Tabelle
    const bereichKeys = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'];
    let hatZiele = false;
    for (const bereichKey of bereichKeys) {
        const ziele = zielePerBereich[bereichKey];
        const bereichInfo = eldibData[bereichKey];
        if (!bereichInfo) continue;

        // Bereich-Titel
        const domainLabel = isEN ? 'Domain: ' : (isFR ? 'Domaine : ' : 'Bereich: ');
        children.push(new Paragraph({
            children: [new TextRun({
                text: domainLabel + (bereichInfo.name || bereichKey),
                bold: true, size: 26, color: '4F46E5'
            })],
            spacing: { before: 300, after: 120 }
        }));

        if (ziele.length === 0) {
            const noGoalsMsg = isEN ? '— No goals selected in this domain —'
                : (isFR ? '— Aucun objectif sélectionné dans ce domaine —' : '— Keine Ziele in diesem Bereich ausgewählt —');
            children.push(new Paragraph({
                children: [new TextRun({ text: noGoalsMsg, italics: true, color: '888888', size: 20 })],
                spacing: { after: 200 }
            }));
            continue;
        }

        hatZiele = true;

        // Tabellen-Kopfzeile
        const headerRow = new TableRow({
            tableHeader: true,
            children: [
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Item', bold: true, size: 20 })] })],
                    borders: cellBorders, width: { size: 12, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E0E7FF' }
                }),
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: isEN ? 'Competency' : (isFR ? 'Compétence' : 'Kompetenz'), bold: true, size: 20 })] })],
                    borders: cellBorders, width: { size: 22, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E0E7FF' }
                }),
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: isEN ? 'Description' : (isFR ? 'Description' : 'Beschreibung'), bold: true, size: 20 })] })],
                    borders: cellBorders, width: { size: 33, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E0E7FF' }
                }),
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: isEN ? 'Goal formulation' : (isFR ? 'Formulation de l\'objectif' : 'Zielformulierung'), bold: true, size: 20 })] })],
                    borders: cellBorders, width: { size: 33, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E0E7FF' }
                })
            ]
        });

        const dataRows = ziele.map(z => new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: getDisplayCode(z.code, state.language), bold: true, size: 20 })] })],
                    borders: cellBorders
                }),
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: z.keyword || '', size: 20 })] })],
                    borders: cellBorders
                }),
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: z.description || '', size: 20 })] })],
                    borders: cellBorders
                }),
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: z.zieltext || '—', size: 20 })] })],
                    borders: cellBorders
                })
            ]
        }));

        children.push(new Table({
            rows: [headerRow, ...dataRows],
            width: { size: 100, type: WidthType.PERCENTAGE }
        }));
    }

    if (!hatZiele) {
        children.push(new Paragraph({
            children: [new TextRun({
                text: isEN
                    ? 'No goals have been selected yet. Mark the desired items as "Goal" in the DTORF-R assessment.'
                    : (isFR
                        ? 'Aucun objectif n\'a encore été sélectionné. Marquez les items souhaités comme « Objectif » dans l\'évaluation ELDiB.'
                        : 'Es wurden noch keine Ziele ausgewählt. Markieren Sie die gewünschten Items in der ELDiB-Auswertung als "Ziel".'),
                italics: true, color: '888888', size: 22
            })],
            spacing: { before: 200 }
        }));
    }

    const doc = new Document({
        creator: 'ELDiB Generator',
        title: titleText,
        // gleiche Schrift wie im Complement
        styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
        sections: [{
            properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
            children
        }]
    });

    const blob = await Packer.toBlob(doc);
    // Dateiname in der Sprache des Dokuments
    saveAs(blob, buildFilename(isEN ? 'IEP-lean' : (isFR ? 'PEI-allege' : 'PEI-schlank')));
}

function downloadAsWord(html, filename) {
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// ==================== DIAGNOSTIC SPÉCIALISÉ FUNKTIONEN ====================
