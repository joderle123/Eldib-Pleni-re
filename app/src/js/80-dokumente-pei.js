async function generatePEI() {
    // Sicherstellen, dass alle aktuellen Daten gespeichert sind
    saveToLocalStorage();

    // Englisch: es gibt kein englisches Word-Template -> von Grund auf mit docx.js bauen
    if (state.language === 'en') {
        return generateEnglishPEI();
    }

    // --- 1. Load the DOCX template (embedded as base64) ---
    const isFR = state.language === 'fr' && typeof TEMPLATE_FR_PEI_CDSE_BASE64 !== 'undefined';
    const templateBase64 = isFR ? TEMPLATE_FR_PEI_CDSE_BASE64 : TEMPLATE_DE_CDSE_BASE64;
    const zip = await JSZip.loadAsync(templateBase64, {base64: true});
    let docXml = await zip.file('word/document.xml').async('string');

    // --- 2. Gather all data ---
    const stammdaten = getStammdaten();
    const eldibData = getCurrentEldibData();

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

    // Helper: extract Zusatz data from saved assessment
    function getZusatzFromSaved(zusaetzlicheZiele, category, stufe) {
        const goals = zusaetzlicheZiele?.[category] || {};
        const data = getCurrentZusaetzlicheZiele();
        return Object.entries(goals)
            .filter(([id, status]) => status === stufe)
            .map(([id]) => data[category]?.find(g => g.id === id))
            .filter(Boolean);
    }

    // Use 2nd assessment goals for Zielerfassung (or current if no dual)
    const zieleSelections = hatZweiEinschaetzungen ? einschaetzung2.selections : state.selections;
    const ziele = { verhalten: [], kommunikation: [], sozialisation: [], kognition: [] };

    for (const [code, selection] of Object.entries(zieleSelections)) {
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
    function makeRun(text, bold, italic) {
        let rPr = '';
        if (bold || italic) {
            rPr = '<w:rPr>';
            if (bold) rPr += '<w:b/>';
            if (italic) rPr += '<w:i/>';
            rPr += '</w:rPr>';
        }
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

    // --- Text transformation for professional PEI formulations ---
    // Helper: try to conjugate infinitive verb to 3rd person for observational style
    function tryConjugatePhrase(phrase) {
        if (!phrase || phrase.includes(' und ') || phrase.includes(' oder ')) return null;
        const words = phrase.trim().split(/\s+/);
        if (words.length < 2) return null;
        const verb = words[words.length - 1];
        const rest = words.slice(0, -1).join(' ');
        // -ieren verbs: always regular (regulieren → Reguliert)
        if (verb.endsWith('ieren')) {
            return verb.charAt(0).toUpperCase() + verb.slice(1, -2) + 't ' + rest;
        }
        // Known verb conjugations (3rd person singular)
        const map = {
            'zerlegen':'Zerlegt','finden':'Findet','treffen':'Trifft',
            'ziehen':'Zieht','betrachten':'Betrachtet','hinterfragen':'Hinterfragt',
            'übertragen':'Überträgt','unterscheiden':'Unterscheidet',
            'bewältigen':'Bewältigt','lösen':'Löst','pflegen':'Pflegt',
            'vertreten':'Vertritt','nutzen':'Nutzt','erkennen':'Erkennt',
            'benennen':'Benennt','bewahren':'Bewahrt','verarbeiten':'Verarbeitet',
            'verkraften':'Verkraftet','wahren':'Wahrt','leisten':'Leistet',
            'arbeiten':'Arbeitet','geben':'Gibt','machen':'Macht',
            'warten':'Wartet','bleiben':'Bleibt','verwalten':'Verwaltet',
            'vermeiden':'Vermeidet','befolgen':'Befolgt','gestalten':'Gestaltet',
            'entwickeln':'Entwickelt','lesen':'Liest','schreiben':'Schreibt',
            'erledigen':'Erledigt','verfassen':'Verfasst','begegnen':'Begegnet',
            'bewegen':'Bewegt','kochen':'Kocht','spielen':'Spielt',
            'verarbeiten':'Verarbeitet','genießen':'Genießt',
        };
        if (map[verb]) return map[verb] + ' ' + rest;
        return null;
    }
    // French text formatting functions
    function formatFortschrittFR(text) {
        if (!text) return text;
        let t = text;
        t = t.replace(/peut de manière autonome /gi, 'Peut ');
        t = t.replace(/peut? de manière autonome/gi, 'Peut');
        t = t.replace(/  +/g, ' ').trim();
        t = t.charAt(0).toUpperCase() + t.slice(1);
        if (!t.endsWith('.')) t += '.';
        return t;
    }
    function formatTeilweiseFR(text) {
        if (!text) return text;
        let t = text;
        const markers = ['avec soutien', 'avec aide', 'avec encouragement', 'avec rappel',
            'avec accompagnement', 'avec guidance', 'avec anleitung', 'avec des indications'];
        for (const m of markers) {
            if (t.toLowerCase().includes(m + ' ')) { t = t.replace(new RegExp(m + ' ', 'i'), 'de plus en plus '); break; }
            if (t.toLowerCase().includes(m)) { t = t.replace(new RegExp(m, 'i'), 'de plus en plus'); break; }
        }
        t = t.replace(/  +/g, ' ').trim();
        t = t.charAt(0).toUpperCase() + t.slice(1);
        if (!t.endsWith('.')) t += '.';
        return t;
    }
    function formatAnzugehendesThemaFR(text) {
        if (!text) return text;
        let t = text;
        let m;
        if ((m = t.match(/^apprend encore à (.+)/i))) { t = m[1]; }
        else if ((m = t.match(/^a encore des difficultés à (.+)/i))) { t = m[1]; }
        else if ((m = t.match(/^a encore des difficultés (.+)/i))) { t = m[1]; }
        else if (t.includes(' encore ')) { t = t.replace(' encore ', ' '); }
        t = t.replace(/  +/g, ' ').trim();
        t = t.charAt(0).toUpperCase() + t.slice(1);
        if (!t.endsWith('.')) t += '.';
        return t;
    }

    // Fortschritte (stufe3 - erreicht): Conjugate verbs for variety, remove "selbstständig"
    function formatFortschritt(text) {
        if (!text) return text;
        let t = text;
        if (t.startsWith('kann selbstständig ') || t.startsWith('kann sich selbstständig ')) {
            let rest, hasSich = false;
            if (t.startsWith('kann sich selbstständig ')) {
                rest = t.substring('kann sich selbstständig '.length);
                hasSich = true;
            } else {
                rest = t.substring('kann selbstständig '.length);
            }
            const conj = tryConjugatePhrase(rest);
            if (conj) {
                // Conjugated form: "Zerlegt ein Problem..." / "Reguliert sich..."
                if (hasSich) {
                    const parts = conj.split(' ');
                    t = parts[0] + ' sich ' + parts.slice(1).join(' ');
                } else {
                    t = conj;
                }
            } else {
                t = hasSich ? ('Kann sich ' + rest) : ('Kann ' + rest);
            }
        } else {
            t = t.replace(/ selbstständig /g, ' ').replace(/ selbstständig,/g, ',').replace(/ selbstständig$/g, '');
        }
        t = t.replace(/  +/g, ' ').trim();
        t = t.charAt(0).toUpperCase() + t.slice(1);
        if (!t.endsWith('.')) t += '.';
        return t;
    }
    // Fortschritte (stufe2 - teilweise): Replace support qualifier with "zunehmend"
    function formatTeilweise(text) {
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
        t = t.replace(/  +/g, ' ').trim();
        t = t.charAt(0).toUpperCase() + t.slice(1);
        if (!t.endsWith('.')) t += '.';
        return t;
    }
    // Anzugehende Themen (stufe1 - Ziel): Transform to infinitive/goal form
    function formatAnzugehendesThema(text) {
        if (!text) return text;
        let t = text;
        let m;
        // "lernt noch, X zu Y" → "X Y."
        if ((m = t.match(/^lernt noch, (.+) zu (\w+)$/))) {
            t = m[1] + ' ' + m[2];
        } else if ((m = t.match(/^lernt noch, (.+?) (\w+zu\w+)$/))) {
            t = m[1] + ' ' + m[2].replace('zu', '');
        }
        // "hat noch Schwierigkeiten, X zu Y" → "X Y."
        else if ((m = t.match(/^hat noch Schwierigkeiten, (.+) zu (\w+)$/))) {
            t = m[1] + ' ' + m[2];
        } else if ((m = t.match(/^hat noch Schwierigkeiten, (.+?) (\w+zu\w+)$/))) {
            t = m[1] + ' ' + m[2].replace('zu', '');
        }
        // "hat noch Schwierigkeiten mit X" → "An X weiterarbeiten."
        else if ((m = t.match(/^hat noch Schwierigkeiten mit (.+)$/))) {
            t = 'an ' + m[1] + ' weiterarbeiten';
        }
        // "hat noch Schwierigkeiten, X" (no "zu")
        else if ((m = t.match(/^hat noch Schwierigkeiten, (.+)$/))) {
            t = m[1];
        }
        // "zeigt noch wenig X" → "X weiterentwickeln."
        else if ((m = t.match(/^zeigt noch wenig (.+)$/))) {
            t = m[1] + ' weiterentwickeln';
        }
        // "hat noch keine/keinen X" → "X entwickeln."
        else if ((m = t.match(/^hat noch keine?n? (.+)$/))) {
            t = m[1];
        }
        // Patterns with "noch nicht" → remove negation
        else if (t.includes(' noch nicht ')) {
            t = t.replace(' noch nicht ', ' ');
        }
        // Patterns with "noch " → remove "noch"
        else if (t.includes(' noch ')) {
            t = t.replace(' noch ', ' ');
        }
        // Clean up compound infinitives: "zu erkennen und kommunizieren" → "erkennen und kommunizieren"
        t = t.replace(/ zu (\w+en)\b(?= und )/g, ' $1');
        // Clean up "und zu Y" → "und Y"
        t = t.replace(/ und zu (\w+)\b/g, ' und $1');
        t = t.replace(/  +/g, ' ').trim();
        t = t.charAt(0).toUpperCase() + t.slice(1);
        if (!t.endsWith('.')) t += '.';
        return t;
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
    if (stammdaten.schueler_name) {
        docXml = docXml.replace('>MUSTERMANN Jacques<', '>' + escapeXml(stammdaten.schueler_name) + '<');
        // French template might use different placeholder
        docXml = docXml.replace('>NOM Pr', '>' + escapeXml(stammdaten.schueler_name) + '<'.slice(0,-1));
    }
    if (stammdaten.eltern1_name) {
        docXml = docXml.replace('>HIRSCH Madeleine; Erziehungsberechtigte<', '>' + escapeXml(stammdaten.eltern1_name) + (isFR ? '; Responsable légal' : '; Erziehungsberechtigte') + '<');
        docXml = docXml.replace('>HIRSCH Madeleine; Responsable<', '>' + escapeXml(stammdaten.eltern1_name) + '; Responsable légal<');
    } else {
        docXml = docXml.replace('>HIRSCH Madeleine; Erziehungsberechtigte<', '><');
        docXml = docXml.replace('>HIRSCH Madeleine; Responsable<', '><');
    }
    if (stammdaten.einschaetzende) {
        docXml = docXml.replace('>SCHILTZ Micheline; LP<', '>' + escapeXml(stammdaten.einschaetzende) + '; CDSE<');
    } else {
        docXml = docXml.replace('>SCHILTZ Micheline; LP<', '><');
    }
    docXml = docXml.replace('>LAMBERTY Georgius; ESEB<', '><');

    // --- 6. Fill ELDiB page name and birthdate ---
    // Find name label paragraph on ELDiB page and append name
    {
        const nameLabel = isFR ? 'Nom de l' : 'Name des Sch';
        // Find the second occurrence (first is on title page, second on ELDiB page)
        let firstOcc = docXml.indexOf(nameLabel);
        if (firstOcc >= 0) {
            let secondOcc = docXml.indexOf(nameLabel, firstOcc + 1);
            if (secondOcc >= 0) {
                const pEnd = docXml.indexOf('</w:p>', secondOcc);
                if (pEnd >= 0 && stammdaten.schueler_name) {
                    const nameRun = '<w:r><w:rPr><w:rFonts w:cstheme="minorHAnsi"/><w:lang w:val="de-LU"/></w:rPr><w:t xml:space="preserve"> ' + escapeXml(stammdaten.schueler_name) + '</w:t></w:r>';
                    docXml = docXml.substring(0, pEnd) + nameRun + docXml.substring(pEnd);
                }
            }
        }
    }
    // Fill Geburtsdatum / Date de naissance
    {
        const gebLabel = isFR ? 'Date de naissance' : 'Geburtsdatum: ';
        const gebPos = docXml.indexOf(gebLabel);
        if (gebPos >= 0 && stammdaten.geburtsdatum) {
            const pEnd = docXml.indexOf('</w:p>', gebPos);
            if (pEnd >= 0) {
                const dateRun = '<w:r><w:rPr><w:rFonts w:cstheme="minorHAnsi"/><w:lang w:val="de-LU"/></w:rPr><w:t xml:space="preserve">' + escapeXml(stammdaten.geburtsdatum) + '</w:t></w:r>';
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

    // --- 8. Fill Datum fields in ELDiB grid ---
    {
        const datumMarker = '>Datum:<';
        // Left grid Datum (1st assessment or current)
        const leftDatum = hatZweiEinschaetzungen
            ? einschaetzung1.stammdaten?.einschaetzungsdatum
            : stammdaten.einschaetzungsdatum;
        if (leftDatum) {
            const datumPos = docXml.indexOf(datumMarker);
            if (datumPos >= 0) {
                const pEnd = docXml.indexOf('</w:p>', datumPos);
                if (pEnd >= 0) {
                    const dateRun = '<w:r><w:rPr><w:rFonts w:cstheme="minorHAnsi"/><w:sz w:val="14"/><w:szCs w:val="14"/></w:rPr><w:t xml:space="preserve"> ' + escapeXml(leftDatum) + '</w:t></w:r>';
                    docXml = docXml.substring(0, pEnd) + dateRun + docXml.substring(pEnd);
                }
            }
        }
        // Right grid Datum (2nd assessment)
        if (hatZweiEinschaetzungen) {
            const rightDatum = einschaetzung2.stammdaten?.einschaetzungsdatum;
            if (rightDatum) {
                // Find the second "Datum:" occurrence (right grid) - search after the first
                const firstPos = docXml.indexOf(datumMarker);
                if (firstPos >= 0) {
                    const secondPos = docXml.indexOf(datumMarker, firstPos + datumMarker.length);
                    if (secondPos >= 0) {
                        const pEnd = docXml.indexOf('</w:p>', secondPos);
                        if (pEnd >= 0) {
                            const dateRun = '<w:r><w:rPr><w:rFonts w:cstheme="minorHAnsi"/><w:sz w:val="14"/><w:szCs w:val="14"/></w:rPr><w:t xml:space="preserve"> ' + escapeXml(rightDatum) + '</w:t></w:r>';
                            docXml = docXml.substring(0, pEnd) + dateRun + docXml.substring(pEnd);
                        }
                    }
                }
            }
        }
    }

    // --- 9. Fill Zielerfassung und Umsetzung section ---
    // Fill "Datum:" in the Zielerfassung section
    {
        const zielDatumMarker = '>Datum:<';
        // Use 2nd assessment date when available, otherwise current
        const zielDatum = hatZweiEinschaetzungen
            ? einschaetzung2.stammdaten?.einschaetzungsdatum
            : stammdaten.einschaetzungsdatum;
        const zielerfassungPos = docXml.indexOf('Zielerfassung');
        if (zielerfassungPos >= 0 && zielDatum) {
            const datumPos = docXml.indexOf(zielDatumMarker, zielerfassungPos);
            if (datumPos >= 0) {
                const pEnd = docXml.indexOf('</w:p>', datumPos);
                if (pEnd >= 0) {
                    const dateRun = '<w:r><w:t xml:space="preserve"> ' + escapeXml(zielDatum) + '</w:t></w:r>';
                    docXml = docXml.substring(0, pEnd) + dateRun + docXml.substring(pEnd);
                }
            }
        }
    }

    // Fill each domain in the Zielerfassung table
    function buildDomainContent(domainGoals) {
        let content = '';
        if (domainGoals && domainGoals.length > 0) {
            for (const goal of domainGoals) {
                // V-25 Keyword: Description
                content += makePara(makeRun(goal.code + ' ' + goal.keyword + ': ', true) + makeRun(goal.description));
                content += makePara('');
                // Zielformulierung: "quoted text"
                const zfLabel = isFR ? 'Formulation de l\'objectif : ' : 'Zielformulierung: ';
                content += makePara(makeRun(zfLabel, true) + makeRun('\u201E' + goal.zieltext + '\u201C'));
                content += makePara('');
                // Mögliche Umsetzung with sub-bullets
                const muLabel = isFR ? 'Mise en œuvre possible' : 'Mögliche Umsetzung';
                content += makePara(makeRun(muLabel, true));
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
    const domainLabels = isFR
        ? ['Comportement', 'Communication', 'Socialisation', 'Cognition']
        : ['Verhalten', 'Kommunikation', 'Sozialisation', 'Kognition'];
    const domainMapping = [
        { label: domainLabels[0], goals: ziele.verhalten },
        { label: domainLabels[1], goals: ziele.kommunikation },
        { label: domainLabels[2], goals: ziele.sozialisation },
        { label: domainLabels[3], goals: ziele.kognition }
    ];

    for (const domain of domainMapping) {
        const content = buildDomainContent(domain.goals);
        docXml = replaceDomainCell(docXml, domain.label, content);
    }

    // "Andere ELDiB-unabhängige Ziele" cell - left empty (zusätzliche Ziele go to Bericht only)
    const andereLabel = isFR ? 'Autres objectifs' : 'Andere ELDiB-unabhängige Ziele';
    docXml = replaceDomainCell(docXml, andereLabel, makePara(''));

    // --- 10. Fill Bericht section ---
    // When dual assessments exist:
    //   Fortschritte table = 1st assessment data (zusätzliche Ziele stufe3 + stufe2)
    //   Anzugehende Themen table = 2nd assessment data (zusätzliche Ziele stufe1)
    // When single assessment:
    //   Fortschritte = current stufe3 + stufe2
    //   Anzugehende Themen = current stufe1
    {
        const categories = [
            'demarches_mentales', 'manieres_apprendre', 'attitudes_relationnelles',
            'attitudes_affectives', 'competences_essentielles', 'culture_loisirs'
        ];

        // Fill a specific cell (cellIndex: 1=left/2nd cell, 2=right/3rd cell) in a Bericht row
        function fillBerichtCell(xml, tableLabel, rowLabel, items, cellIndex) {
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
                paras += makeBulletPara(makeRun(item));
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

        // Legacy wrapper: fill left cell (2nd cell, index 1)
        function fillBerichtRow(xml, tableLabel, rowLabel, items) {
            return fillBerichtCell(xml, tableLabel, rowLabel, items, 1);
        }

        if (hatZweiEinschaetzungen) {
            // === DUAL ASSESSMENT: Fill both left and right columns ===
            const zusatz1 = einschaetzung1.zusaetzlicheZiele || {};
            const zusatz2 = einschaetzung2.zusaetzlicheZiele || {};

            // --- Fortschritte-Tabelle (within the big ELDiB grid table) ---
            let fortschritte1 = []; // 1st assessment → left column
            let fortschritte2 = []; // 2nd assessment → right column
            let themen1 = [];       // 1st assessment → left column
            let themen2 = [];       // 2nd assessment → right column

            for (const cat of categories) {
                // 1st assessment data
                const erreicht1 = getZusatzFromSaved(zusatz1, cat, 'stufe3');
                const teilweise1 = getZusatzFromSaved(zusatz1, cat, 'stufe2');
                const ziel1 = getZusatzFromSaved(zusatz1, cat, 'stufe1');
                for (const g of erreicht1) fortschritte1.push(isFR ? formatFortschrittFR(g.stufen?.stufe3 || g.title) : formatFortschritt(g.stufen?.stufe3 || g.title));
                for (const g of teilweise1) fortschritte1.push(isFR ? formatTeilweiseFR(g.stufen?.stufe2 || g.title) : formatTeilweise(g.stufen?.stufe2 || g.title));
                for (const g of ziel1) themen1.push(isFR ? formatAnzugehendesThemaFR(g.stufen?.stufe1 || g.title) : formatAnzugehendesThema(g.stufen?.stufe1 || g.title));

                // 2nd assessment data
                const erreicht2 = getZusatzFromSaved(zusatz2, cat, 'stufe3');
                const teilweise2 = getZusatzFromSaved(zusatz2, cat, 'stufe2');
                const ziel2 = getZusatzFromSaved(zusatz2, cat, 'stufe1');
                for (const g of erreicht2) fortschritte2.push(isFR ? formatFortschrittFR(g.stufen?.stufe3 || g.title) : formatFortschritt(g.stufen?.stufe3 || g.title));
                for (const g of teilweise2) fortschritte2.push(isFR ? formatTeilweiseFR(g.stufen?.stufe2 || g.title) : formatTeilweise(g.stufen?.stufe2 || g.title));
                for (const g of ziel2) themen2.push(isFR ? formatAnzugehendesThemaFR(g.stufen?.stufe1 || g.title) : formatAnzugehendesThema(g.stufen?.stufe1 || g.title));
            }

            // Fortschritte table: left = 1st, right = 2nd
            const fortLabel = isFR ? 'Progr' : 'Fortschritte des Sch';
            if (fortschritte1.length > 0) {
                docXml = fillBerichtCell(docXml, fortLabel, 'CDSE', fortschritte1, 1);
            }
            if (fortschritte2.length > 0) {
                docXml = fillBerichtCell(docXml, fortLabel, 'CDSE', fortschritte2, 2);
            }
            // Fortschritte Datum: left = 1st date, right = 2nd date
            const datum1 = einschaetzung1.stammdaten?.einschaetzungsdatum || '';
            const datum2 = einschaetzung2.stammdaten?.einschaetzungsdatum || '';
            if (datum1) {
                docXml = fillBerichtCell(docXml, fortLabel, isFR ? 'Date' : 'Datum', [datum1], 1);
            }
            if (datum2) {
                docXml = fillBerichtCell(docXml, fortLabel, isFR ? 'Date' : 'Datum', [datum2], 2);
            }

            // Anzugehende Themen table: left = 1st, right = 2nd
            const themenLabel = isFR ? 'Points' : 'Anzugehende Themen';
            if (themen1.length > 0) {
                docXml = fillBerichtCell(docXml, themenLabel, 'CDSE', themen1, 1);
            }
            if (themen2.length > 0) {
                docXml = fillBerichtCell(docXml, themenLabel, 'CDSE', themen2, 2);
            }
            // Anzugehende Themen Datum
            if (datum1) {
                docXml = fillBerichtCell(docXml, themenLabel, isFR ? 'Date' : 'Datum', [datum1], 1);
            }
            if (datum2) {
                docXml = fillBerichtCell(docXml, themenLabel, isFR ? 'Date' : 'Datum', [datum2], 2);
            }
        } else {
            // === SINGLE ASSESSMENT: Fill left column only ===
            let fortschritte = [];
            let themen = [];
            for (const cat of categories) {
                const erreicht = getZusatzErreicht(cat);
                const teilweise = getZusatzTeilweise(cat);
                const ziel = getZusatzZiele(cat);
                for (const g of erreicht) fortschritte.push(isFR ? formatFortschrittFR(g.stufen?.stufe3 || g.title) : formatFortschritt(g.stufen?.stufe3 || g.title));
                for (const g of teilweise) fortschritte.push(isFR ? formatTeilweiseFR(g.stufen?.stufe2 || g.title) : formatTeilweise(g.stufen?.stufe2 || g.title));
                for (const g of ziel) themen.push(isFR ? formatAnzugehendesThemaFR(g.stufen?.stufe1 || g.title) : formatAnzugehendesThema(g.stufen?.stufe1 || g.title));
            }

            if (fortschritte.length > 0) {
                const fortLabel = isFR ? 'Progr' : 'Fortschritte des Sch';
                docXml = fillBerichtRow(docXml, fortLabel, 'CDSE', fortschritte);
            }
            if (themen.length > 0) {
                const themenLabel = isFR ? 'Points' : 'Anzugehende Themen';
                docXml = fillBerichtRow(docXml, themenLabel, 'CDSE', themen);
            }
        }
    }

    // --- 11. Write back and download ---
    zip.file('word/document.xml', docXml);
    const blob = await zip.generateAsync({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    saveAs(blob, buildFilename('PEI'));
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
    const vorname = prenom || nom || tri('The student', 'L\'élève', 'Der Schüler'); // Vorname für die Formulierungen

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
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('LAST NAME', 'NOM', 'NOM'), bold: true, size: 22})]})], borders: noBorders, width: {size: 50, type: WidthType.PERCENTAGE} }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('First name', 'Prénom', 'Prénom'), bold: true, size: 22})]})], borders: noBorders, width: {size: 50, type: WidthType.PERCENTAGE} })
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
    const gebFormatted = stammdaten.geburtsdatum ? new Date(stammdaten.geburtsdatum).toLocaleDateString(tri('en-GB', 'fr-LU', 'de-LU')) : '';
    children.push(new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Date of birth', 'Date de naissance', 'Geburtsdatum'), bold: true, size: 22})]})], borders: noBorders, width: {size: 50, type: WidthType.PERCENTAGE} }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: 'Matricule', bold: true, size: 22})]})], borders: noBorders, width: {size: 50, type: WidthType.PERCENTAGE} })
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
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('School / Class', 'Lycée / Classe', 'Schule / Klasse'), bold: true, size: 22})]})], borders: noBorders, width: {size: 50, type: WidthType.PERCENTAGE} }),
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
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Commented evaluation of performance and progress', 'Evaluation commentée des performances et des progrès', 'Kommentierte Bewertung der Leistungen und Fortschritte'), bold: true, size: 22})]})], borders: cellBorders, shading: {fill: 'D9D9D9'}, width: {size: 65, type: WidthType.PERCENTAGE} })
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
            const zielMitVorname = replaceIchWithVorname(getGoalTextComplement(g, g.stufe));
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

    // Section: Autres domaines
    children.push(new Paragraph({
        children: [new TextRun({ text: tri('☐ Other competency areas:', '☐ Autres domaines de compétences:', '☐ Weitere Kompetenzbereiche:'), bold: true, size: 24 })],
        spacing: { after: 100 }
    }));

    children.push(new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Competency areas to assess', 'Domaines de compétences à évaluer', 'Zu bewertende Kompetenzbereiche'), bold: true, size: 22})]})], borders: cellBorders, shading: {fill: 'D9D9D9'}, width: {size: 35, type: WidthType.PERCENTAGE} }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Commented evaluation of performance and progress', 'Evaluation commentée des performances et des progrès', 'Kommentierte Bewertung der Leistungen und Fortschritte'), bold: true, size: 22})]})], borders: cellBorders, shading: {fill: 'D9D9D9'}, width: {size: 65, type: WidthType.PERCENTAGE} })
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
        children: [new TextRun({ text: tri('☐ Essential competencies for independent living and maximum participation', '☐ Compétences essentielles à la vie autonome et la participation maximale', '☐ Wesentliche Kompetenzen für ein selbstständiges Leben und maximale Teilhabe'), bold: true, size: 24 })],
        spacing: { after: 100 }
    }));

    children.push(new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Competency areas to assess', 'Domaines de compétences à évaluer', 'Zu bewertende Kompetenzbereiche'), bold: true, size: 22})]})], borders: cellBorders, shading: {fill: 'D9D9D9'}, width: {size: 35, type: WidthType.PERCENTAGE} }),
                    new TableCell({ children: [new Paragraph({children: [new TextRun({text: tri('Commented evaluation of performance and progress', 'Evaluation commentée des performances et des progrès', 'Kommentierte Bewertung der Leistungen und Fortschritte'), bold: true, size: 22})]})], borders: cellBorders, shading: {fill: 'D9D9D9'}, width: {size: 65, type: WidthType.PERCENTAGE} })
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

    // Header: Name + Datum
    const localeStr = isEN ? 'en-US' : (isFR ? 'fr-FR' : 'de-DE');
    const heute = new Date().toLocaleDateString(localeStr);
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
            new TextRun({ text: stammdaten.einschaetzungsdatum || heute, size: 22 })
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
                    children: [new Paragraph({ children: [new TextRun({ text: isFR ? 'Compétence' : 'Kompetenz', bold: true, size: 20 })] })],
                    borders: cellBorders, width: { size: 22, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E0E7FF' }
                }),
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: isFR ? 'Description' : 'Beschreibung', bold: true, size: 20 })] })],
                    borders: cellBorders, width: { size: 33, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E0E7FF' }
                }),
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: isFR ? 'Formulation de l\'objectif' : 'Zielformulierung', bold: true, size: 20 })] })],
                    borders: cellBorders, width: { size: 33, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E0E7FF' }
                })
            ]
        });

        const dataRows = ziele.map(z => new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: getDisplayCode(z.code), bold: true, size: 20 })] })],
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
                text: isFR
                    ? 'Aucun objectif n\'a encore été sélectionné. Marquez les items souhaités comme « Objectif » dans l\'évaluation ELDiB.'
                    : 'Es wurden noch keine Ziele ausgewählt. Markieren Sie die gewünschten Items in der ELDiB-Auswertung als "Ziel".',
                italics: true, color: '888888', size: 22
            })],
            spacing: { before: 200 }
        }));
    }

    const doc = new Document({
        creator: 'ELDiB Generator',
        title: 'PEI – ELDiB-Tabellen',
        sections: [{
            properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
            children
        }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, buildFilename('PEI-schlank'));
}

// ==================== ENGLISH FULL IEP (PEI) ====================
// Baut das vollstaendige PEI ("Individualized Education Plan") auf Englisch
// von Grund auf mit docx.js (kein englisches Word-Template vorhanden).
// Enthaelt: Kopfdaten, Foerderziele je Bereich mit Formulierung + moeglicher
// Umsetzung (Interventionen), sowie die zusaetzlichen Ziele (Fortschritte /
// anzugehende Punkte).
async function generateEnglishPEI() {
    saveToLocalStorage();
    const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle } = docx;

    const stammdaten = getStammdaten();

    // Foerderziele je Bereich sammeln
    const ziele = { verhalten: [], kommunikation: [], sozialisation: [], kognition: [] };
    for (const [code, selection] of Object.entries(state.selections)) {
        if (selection?.status !== 'ziel') continue;
        const bereich = findBereichByCode(code);
        const item = findItemByCode(code);
        if (bereich && item && ziele[bereich]) {
            ziele[bereich].push({
                code, keyword: item.keyword, description: item.description,
                zieltext: resolveZieltext(code, selection),
                nr: parseInt(code.split('-').pop()) || 0
            });
        }
    }
    for (const b of Object.keys(ziele)) ziele[b].sort((a, c) => a.nr - c.nr);

    const split = splitSchuelerName(stammdaten.schueler_name || '');
    const nom = split.nachname || '';
    const prenom = split.vorname || '';

    const cellB = {
        top: { style: BorderStyle.SINGLE, size: 4, color: '666666' },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: '666666' },
        left: { style: BorderStyle.SINGLE, size: 4, color: '666666' },
        right: { style: BorderStyle.SINGLE, size: 4, color: '666666' }
    };
    const noB = { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } };

    function headerRow(labelL, valL, labelR, valR) {
        return [
            new TableRow({ children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: labelL, bold: true, size: 22 })] })], borders: noB, width: { size: 50, type: WidthType.PERCENTAGE } }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: labelR, bold: true, size: 22 })] })], borders: noB, width: { size: 50, type: WidthType.PERCENTAGE } })
            ] }),
            new TableRow({ children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: valL, size: 22 })] })], borders: cellB }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: valR, size: 22 })] })], borders: cellB })
            ] })
        ];
    }

    const children = [];

    // Title
    children.push(new Paragraph({
        children: [new TextRun({ text: 'Individualized Education Plan (IEP)', bold: true, size: 32 })],
        spacing: { after: 200 }
    }));

    // Header data
    const gebFormatted = stammdaten.geburtsdatum ? new Date(stammdaten.geburtsdatum).toLocaleDateString('en-GB') : '';
    const periodeLabel = stammdaten.periodenTyp === 'semester' ? 'Semester' : 'Trimester';
    const periodeText = stammdaten.periode ? `${periodeLabel} ${stammdaten.periode}` : '';
    const schuljahrPeriode = [stammdaten.schuljahr, periodeText].filter(Boolean).join(' — ');

    children.push(new Table({ rows: headerRow('Last name', nom, 'First name', prenom), width: { size: 100, type: WidthType.PERCENTAGE } }));
    children.push(new Paragraph({ spacing: { after: 80 } }));
    children.push(new Table({ rows: headerRow('Date of birth', gebFormatted, 'ID number', stammdaten.matricule || ''), width: { size: 100, type: WidthType.PERCENTAGE } }));
    children.push(new Paragraph({ spacing: { after: 80 } }));
    children.push(new Table({ rows: headerRow('School / Class', `${stammdaten.foerderort || ''} / ${stammdaten.klasse || ''}`, 'School year / Period', schuljahrPeriode), width: { size: 100, type: WidthType.PERCENTAGE } }));
    children.push(new Paragraph({ spacing: { after: 80 } }));
    children.push(new Table({ rows: headerRow('Evaluation date', stammdaten.einschaetzungsdatum || '', 'Rater(s)', stammdaten.einschaetzende || ''), width: { size: 100, type: WidthType.PERCENTAGE } }));
    children.push(new Paragraph({ spacing: { after: 300 } }));

    // Goal capture section
    children.push(new Paragraph({
        children: [new TextRun({ text: 'Goal capture (according to DTORF-R)', bold: true, size: 26, color: '4F46E5' })],
        spacing: { after: 120 }
    }));

    const domains = [
        { key: 'verhalten', name: 'Behavior' },
        { key: 'kommunikation', name: 'Communication' },
        { key: 'sozialisation', name: 'Socialization' },
        { key: 'kognition', name: 'Academics/Cognition' }
    ];

    let anyGoal = false;
    for (const d of domains) {
        const goals = ziele[d.key];
        const contentParas = [];
        if (goals && goals.length > 0) {
            anyGoal = true;
            for (const g of goals) {
                contentParas.push(new Paragraph({
                    children: [new TextRun({ text: `${getDisplayCode(g.code)} - ${g.keyword}: `, bold: true, size: 22 }), new TextRun({ text: g.description || '', size: 22 })],
                    spacing: { before: 80, after: 40 }
                }));
                if (g.zieltext) {
                    contentParas.push(new Paragraph({
                        children: [new TextRun({ text: 'Goal formulation: ', bold: true, size: 22 }), new TextRun({ text: '“' + g.zieltext + '”', size: 22 })],
                        spacing: { after: 40 }
                    }));
                }
                const interventions = getInterventionen(g.code);
                if (interventions && interventions.length > 0) {
                    contentParas.push(new Paragraph({ children: [new TextRun({ text: 'Possible implementation:', bold: true, size: 22 })], spacing: { after: 20 } }));
                    for (const iv of interventions) {
                        contentParas.push(new Paragraph({ children: [new TextRun({ text: iv, size: 20 })], bullet: { level: 0 }, spacing: { after: 20 } }));
                    }
                }
                contentParas.push(new Paragraph({ spacing: { after: 80 } }));
            }
        } else {
            contentParas.push(new Paragraph({ children: [new TextRun({ text: '—', size: 22 })] }));
        }

        children.push(new Table({
            rows: [new TableRow({ children: [
                new TableCell({
                    children: [
                        new Paragraph({ children: [new TextRun({ text: d.name, bold: true, size: 22 })] }),
                        new Paragraph({ children: [new TextRun({ text: '(per DTORF-R)', italics: true, size: 18 })] })
                    ],
                    borders: cellB, width: { size: 30, type: WidthType.PERCENTAGE }, shading: { fill: 'EEF2FF' }
                }),
                new TableCell({ children: contentParas, borders: cellB, width: { size: 70, type: WidthType.PERCENTAGE } })
            ] })],
            width: { size: 100, type: WidthType.PERCENTAGE }
        }));
        children.push(new Paragraph({ spacing: { after: 120 } }));
    }

    // Additional goals (report section): Progress + Points to address
    const categories = [
        { key: 'demarches_mentales', name: 'Cognitive strategies' },
        { key: 'manieres_apprendre', name: 'Learning approaches' },
        { key: 'attitudes_relationnelles', name: 'Relational attitudes' },
        { key: 'attitudes_affectives', name: 'Emotional attitudes' },
        { key: 'competences_essentielles', name: 'Essential competencies' },
        { key: 'culture_loisirs', name: 'Culture and leisure' }
    ];
    const progress = [];
    const toAddress = [];
    for (const cat of categories) {
        for (const g of getZusatzErreicht(cat.key)) progress.push(g.stufen?.stufe3 || g.title);
        for (const g of getZusatzTeilweise(cat.key)) progress.push(g.stufen?.stufe2 || g.title);
        for (const g of getZusatzZiele(cat.key)) toAddress.push(g.stufen?.stufe1 || g.title);
    }

    if (progress.length > 0 || toAddress.length > 0) {
        children.push(new Paragraph({
            children: [new TextRun({ text: 'Additional goals', bold: true, size: 26, color: '4F46E5' })],
            spacing: { before: 200, after: 120 }
        }));
        const listBlock = (title, items) => {
            const paras = [new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 22 })], spacing: { after: 40 } })];
            if (items.length > 0) {
                for (const it of items) paras.push(new Paragraph({ children: [new TextRun({ text: it, size: 22 })], bullet: { level: 0 }, spacing: { after: 20 } }));
            } else {
                paras.push(new Paragraph({ children: [new TextRun({ text: '—', size: 22 })] }));
            }
            return paras;
        };
        listBlock('Progress', progress).forEach(p => children.push(p));
        children.push(new Paragraph({ spacing: { after: 100 } }));
        listBlock('Points to address', toAddress).forEach(p => children.push(p));
    }

    if (!anyGoal && progress.length === 0 && toAddress.length === 0) {
        children.push(new Paragraph({
            children: [new TextRun({ text: 'No goals selected yet. Mark the desired items as "Goal" in the DTORF-R assessment.', italics: true, color: '888888', size: 22 })],
            spacing: { before: 200 }
        }));
    }

    const doc = new Document({
        styles: { default: { document: { run: { font: 'Calibri', size: 22 }, paragraph: { spacing: { line: 276 } } } } },
        sections: [{ properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } }, children }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, buildFilename('IEP'));
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
