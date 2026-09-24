const MASSNAHME_NAMEN = {
    'scas': 'SCAS',
    'cpi': 'CPI',
    'eseb': 'ESEB',
    'logopaedie': 'Logopädie',
    'ergotherapie': 'Ergotherapie',
    'psychotherapie': 'Psychotherapie',
    'psychiatrie': 'Psychiatrische Begleitung',
    'iebs': 'I-EBS',
    'andere': 'Andere Maßnahme'
};

const ANLASS_TEXTE = {
    'verhaltensauffaelligkeiten_schule': 'Verhaltensauffälligkeiten in der Schule',
    'verhaltensauffaelligkeiten_zuhause': 'Verhaltensauffälligkeiten zu Hause',
    'emotionale_schwierigkeiten': 'emotionale Schwierigkeiten',
    'soziale_schwierigkeiten': 'soziale Schwierigkeiten',
    'schulleistungsprobleme': 'Schulleistungsprobleme',
    'aufmerksamkeit': 'Aufmerksamkeits- und Konzentrationsprobleme',
    'aggressives_verhalten': 'aggressives Verhalten',
    'rueckzugsverhalten': 'Rückzugsverhalten',
    'schulverweigerung': 'Schulverweigerung'
};

const ANLIEGEN_TEXTE = {
    'isa': 'eine ISA (Spezialisierte ambulante Intervention)',
    'conseil_guidance': 'Conseil & Guidance',
    'cst': 'eine Aufnahme im CST (Centre socio-thérapeutique)',
    'clapa': 'eine Aufnahme in der ClaPa (Classe de Participation)',
    'spezialisierte_beschulung': 'eine spezialisierte Beschulung',
    'abklaerung': 'eine Abklärung/Diagnostik'
};

const EMPFEHLUNG_TEXTE = {
    'lehrperson': 'der betreuenden Lehrperson',
    'eseb_fachkraft': 'der ESEB-Fachkraft',
    'schulleitung': 'der Schulleitung',
    'arzt': 'des behandelnden Arztes/der behandelnden Ärztin',
    'psychologe': 'des Psychologen/der Psychologin',
    'eltern_empfehlung': 'der Eltern'
};

function generateAuftragsklarungText(dsData, stammdaten) {
    const studentName = stammdaten.schueler_name || 'der/die Schüler:in';
    const auftragDatum = dsData.ds_auftrag_datum ? new Date(dsData.ds_auftrag_datum).toLocaleDateString('de-DE') : '(Datum)';

    let auftraggeber = 'der nationalen Kommission zur Inklusion (CNI)';
    if (dsData.ds_auftraggeber === 'eseb') auftraggeber = 'dem ESEB';
    else if (dsData.ds_auftraggeber === 'schule') auftraggeber = 'der Schule';
    else if (dsData.ds_auftraggeber === 'eltern') auftraggeber = 'den Eltern';
    else if (dsData.ds_auftraggeber === 'andere') auftraggeber = dsData.ds_auftraggeber_andere || 'einem anderen Auftraggeber';

    // Anlass
    const anlassChecked = dsData.checkboxes?.ds_anlass || [];
    let anlassText = joinNatural(anlassChecked.map(a => ANLASS_TEXTE[a] || '').filter(Boolean), 'sowie');
    if (anlassChecked.includes('anlass_andere') && dsData.ds_anlass_andere_text) {
        anlassText += (anlassText ? ', ' : '') + dsData.ds_anlass_andere_text;
    }
    if (!anlassText) anlassText = '(spezifische Auffälligkeiten)';

    // Anliegen
    const anliegenChecked = dsData.checkboxes?.ds_anliegen || [];
    let anliegenText = anliegenChecked.map(a => ANLIEGEN_TEXTE[a] || '').filter(Boolean).join(' / ');
    if (!anliegenText) anliegenText = 'eine Unterstützung';

    // Empfehlung
    const empfehlungChecked = dsData.checkboxes?.ds_empfehlung || [];
    let empfehlungText = empfehlungChecked.map(e => EMPFEHLUNG_TEXTE[e] || '').filter(Boolean).join(', ');
    if (empfehlungChecked.includes('empfehlung_andere') && dsData.ds_empfehlung_andere_text) {
        empfehlungText += (empfehlungText ? ' und ' : '') + dsData.ds_empfehlung_andere_text;
    }

    let text = `Das Zentrum für sozio-emotionale Entwicklung wurde am ${auftragDatum} von ${auftraggeber} damit beauftragt, eine vertiefende Diagnostik bei ${studentName} durchzuführen, um den aktuellen sozio-emotionalen Entwicklungsstand und Förderbedarf festzustellen.`;

    const anlassVerb = anlassChecked.length > 1 ? 'sind' : 'ist';
    text += ` Anlass für die Beauftragung ${anlassVerb} ${anlassText}. Ziel der Untersuchung ist es, ${anliegenText} einzuleiten.`;

    if (empfehlungText) {
        // Wenn nur "eltern_empfehlung" gewählt ist, vermeiden wir die Redundanz "Empfehlung der Eltern und auf Wunsch der Eltern"
        const nurEltern = empfehlungChecked.length === 1 && empfehlungChecked.includes('eltern_empfehlung');
        const andereUndEltern = empfehlungChecked.length > 1 && empfehlungChecked.includes('eltern_empfehlung');
        if (nurEltern) {
            text += ` Die Anfrage erfolgte auf Wunsch und Empfehlung der Eltern.`;
        } else if (andereUndEltern) {
            // Eltern aus empfehlungText entfernen und separat nennen
            const ohneEltern = empfehlungChecked.filter(e => e !== 'eltern_empfehlung').map(e => EMPFEHLUNG_TEXTE[e] || '').filter(Boolean).join(', ');
            text += ` Die Anfrage erfolgte auf Empfehlung ${ohneEltern} sowie auf Wunsch der Eltern.`;
        } else {
            text += ` Die Anfrage erfolgte auf Empfehlung ${empfehlungText}.`;
        }
    }

    if (dsData.ds_auffaelligkeiten) {
        text += `\n\nKonkret wurden folgende Auffälligkeiten beschrieben: ${dsData.ds_auffaelligkeiten}`;
    }

    return text;
}

function generateVorgeschichteText(dsData) {
    let text = '';

    // Frühkindliche Entwicklung
    let entwicklung = [];
    if (dsData.ds_schwangerschaft) {
        if (dsData.ds_schwangerschaft === 'unauffaellig') {
            entwicklung.push('Die Schwangerschaft verlief unauffällig');
        } else if (dsData.ds_schwangerschaft === 'komplikationen') {
            entwicklung.push(`Während der Schwangerschaft traten Komplikationen auf${dsData.ds_schwangerschaft_details ? ' (' + dsData.ds_schwangerschaft_details + ')' : ''}`);
        }
    }

    if (dsData.ds_geburt) {
        if (dsData.ds_geburt === 'unauffaellig') {
            entwicklung.push('die Geburt verlief ohne Besonderheiten');
        } else if (dsData.ds_geburt === 'komplikationen') {
            entwicklung.push(`bei der Geburt gab es Komplikationen${dsData.ds_geburt_details ? ' (' + dsData.ds_geburt_details + ')' : ''}`);
        }
    }

    if (entwicklung.length > 0) {
        text += entwicklung.join(', ') + '. ';
    }

    if (dsData.ds_motorik) {
        const motorikText = dsData.ds_motorik === 'altersgerecht' ? 'altersgerecht' :
                           dsData.ds_motorik === 'verzoegert' ? 'verzögert' : 'unbekannt';
        text += `Die motorische Entwicklung wird als ${motorikText} beschrieben`;
        if (dsData.ds_motorik_bemerkung) text += ` (${dsData.ds_motorik_bemerkung})`;
        text += '. ';
    }

    if (dsData.ds_sprache) {
        const spracheText = dsData.ds_sprache === 'altersgerecht' ? 'altersgerecht' :
                           dsData.ds_sprache === 'verzoegert' ? 'verzögert' : 'unbekannt';
        text += `Die Sprachentwicklung verlief ${spracheText}`;
        if (dsData.ds_sprache_erste_worte) text += `, erste Worte wurden mit ca. ${dsData.ds_sprache_erste_worte} Monaten gesprochen`;
        if (dsData.ds_sprache_bemerkung) text += ` (${dsData.ds_sprache_bemerkung})`;
        text += '. ';
    }

    // Diagnosen
    const diagnosen = dsData.checkboxes?.ds_diagnose || [];
    if (diagnosen.length > 0) {
        text += '\n\nIm Vorfeld wurden folgende Diagnosen gestellt: ';
        const diagnosenTexte = [];
        const diagnoseNamen = {
            'adhs': 'ADHS/ADS',
            'asd': 'Autismus-Spektrum-Störung',
            'lernstoerung': 'Lernstörung',
            'sprachstoerung': 'Sprachentwicklungsstörung',
            'emotional': 'Emotionale Störung',
            'bindung': 'Bindungsstörung',
            'angst': 'Angststörung',
            'opposition': 'Oppositionelle Verhaltensstörung'
        };
        diagnosen.forEach(d => {
            if (d === 'andere_diagnose') {
                if (dsData.ds_diagnose_andere_diagnose_name) {
                    diagnosenTexte.push(dsData.ds_diagnose_andere_diagnose_name);
                }
            } else if (diagnoseNamen[d]) {
                let diagText = diagnoseNamen[d];
                const datum = dsData[`ds_diagnose_${d}_datum`];
                const durch = dsData[`ds_diagnose_${d}_durch`];
                if (datum || durch) {
                    diagText += ' (';
                    if (datum) diagText += datum;
                    if (datum && durch) diagText += ', ';
                    if (durch) diagText += 'diagnostiziert durch ' + durch;
                    diagText += ')';
                }
                diagnosenTexte.push(diagText);
            }
        });
        text += joinNatural(diagnosenTexte, 'sowie') + '.';
    }

    if (dsData.ds_vorgeschichte_weitere) {
        text += '\n\n' + dsData.ds_vorgeschichte_weitere;
    }

    return fixSentenceStart(text) || '(Frühkindliche Entwicklung, Diagnosen, bisherige Maßnahmen)';
}

function generateSozialberichtText(dsData) {
    let text = '';

    // Familienstand
    const familienstandTexte = {
        'verheiratet': 'Die Eltern sind verheiratet und leben zusammen',
        'getrennt': 'Die Eltern sind getrennt/geschieden',
        'alleinerziehend_mutter': 'Das Kind wird von der Mutter alleinerziehend betreut',
        'alleinerziehend_vater': 'Das Kind wird vom Vater alleinerziehend betreut',
        'patchwork': 'Das Kind lebt in einer Patchwork-Familie',
        'pflege': 'Das Kind lebt in einer Pflegefamilie'
    };
    if (dsData.ds_familienstand && familienstandTexte[dsData.ds_familienstand]) {
        text += familienstandTexte[dsData.ds_familienstand] + '. ';
    }

    // Kind lebt bei
    const lebtBeiTexte = {
        'beide_eltern': 'bei beiden Eltern',
        'mutter': 'bei der Mutter',
        'vater': 'beim Vater',
        'wechselmodell': 'im Wechselmodell bei beiden Eltern',
        'grosseltern': 'bei den Großeltern',
        'pflegefamilie': 'in einer Pflegefamilie'
    };
    if (dsData.ds_kind_lebt_bei && lebtBeiTexte[dsData.ds_kind_lebt_bei]) {
        text += `Das Kind lebt ${lebtBeiTexte[dsData.ds_kind_lebt_bei]}. `;
    }

    // Besuchsrecht
    if (dsData.ds_besuchsrecht && dsData.ds_besuchsrecht !== '') {
        const besuchsrechtTexte = {
            'regelmaessig': 'Es besteht regelmäßiger Kontakt zu beiden Eltern',
            'eingeschraenkt_vater': 'Der Kontakt zum Vater ist eingeschränkt',
            'eingeschraenkt_mutter': 'Der Kontakt zur Mutter ist eingeschränkt',
            'kein_vater': 'Es besteht kein Kontakt zum Vater',
            'kein_mutter': 'Es besteht kein Kontakt zur Mutter'
        };
        if (besuchsrechtTexte[dsData.ds_besuchsrecht]) {
            text += besuchsrechtTexte[dsData.ds_besuchsrecht];
            if (dsData.ds_besuchsrecht_details) text += ` (${dsData.ds_besuchsrecht_details})`;
            text += '. ';
        }
    }

    // Geschwister
    if (dsData.geschwister && dsData.geschwister.length > 0) {
        text += `\n\nDas Kind hat ${dsData.geschwister.length} Geschwister`;
        const geschwDetails = dsData.geschwister.map(g => {
            let s = g.name || 'Geschwister';
            if (g.alter) s += ` (${g.alter} Jahre)`;
            return s;
        }).join(', ');
        text += `: ${geschwDetails}. `;
    } else if (dsData.ds_geschwister_anzahl === '0') {
        text += '\n\nDas Kind hat keine Geschwister und wächst als Einzelkind auf. ';
    }

    // Sprachen
    const sprachen = dsData.checkboxes?.ds_sprachen || [];
    if (sprachen.length > 0) {
        const sprachenNamen = {
            'luxemburgisch': 'Luxemburgisch',
            'deutsch': 'Deutsch',
            'franzoesisch': 'Französisch',
            'portugiesisch': 'Portugiesisch',
            'englisch': 'Englisch'
        };
        let sprachenText = sprachen.filter(s => s !== 'sprache_andere').map(s => sprachenNamen[s] || s).join(', ');
        if (sprachen.includes('sprache_andere') && dsData.ds_sprachen_andere_text) {
            sprachenText += (sprachenText ? ', ' : '') + dsData.ds_sprachen_andere_text;
        }
        if (sprachenText) {
            const sprachenAnzahl = sprachenText.split(',').length;
            if (sprachenAnzahl === 1) {
                text += `\n\nZu Hause wird ${sprachenText} gesprochen. `;
            } else {
                text += `\n\nZu Hause werden folgende Sprachen gesprochen: ${sprachenText}. `;
            }
        }
    }

    // Berufliche Situation
    if (dsData.ds_beruf_mutter || dsData.ds_beruf_vater) {
        text += '\n\nZur beruflichen Situation: ';
        if (dsData.ds_beruf_mutter) {
            text += `Die Mutter ist ${dsData.ds_beruf_mutter}`;
            if (dsData.ds_arbeitszeit_mutter) text += ` (${dsData.ds_arbeitszeit_mutter})`;
            text += '. ';
        }
        if (dsData.ds_beruf_vater) {
            text += `Der Vater ist ${dsData.ds_beruf_vater}`;
            if (dsData.ds_arbeitszeit_vater) text += ` (${dsData.ds_arbeitszeit_vater})`;
            text += '. ';
        }
    }

    // Markante Ereignisse
    const ereignisse = dsData.checkboxes?.ds_ereignis || [];
    if (ereignisse.length > 0) {
        text += '\n\nAls markante Lebensereignisse werden genannt: ';
        const ereignisTexte = [];
        const ereignisNamen = {
            'trennung': 'Trennung/Scheidung der Eltern',
            'umzug': 'Umzug',
            'verlust': 'Verlust einer nahestehenden Person',
            'krankheit': 'Krankheit in der Familie',
            'konflikte': 'Häusliche Konflikte',
            'trauma': 'Traumatische Erfahrung'
        };
        ereignisse.forEach(e => {
            if (e === 'ereignis_andere' && dsData.ds_ereignis_ereignis_andere_text) {
                ereignisTexte.push(dsData.ds_ereignis_ereignis_andere_text);
            } else if (ereignisNamen[e]) {
                let eText = ereignisNamen[e];
                const wann = dsData[`ds_ereignis_${e}_wann`];
                if (wann) eText += ` (${wann})`;
                ereignisTexte.push(eText);
            }
        });
        text += ereignisTexte.join('; ') + '.';
    }

    // Freizeit
    if (dsData.ds_freizeitaktivitaeten) {
        text += `\n\nFreizeitaktivitäten: ${dsData.ds_freizeitaktivitaeten}`;
    }

    if (dsData.ds_sozialbericht_weitere) {
        text += '\n\n' + dsData.ds_sozialbericht_weitere;
    }

    return fixSentenceStart(text) || '(Familiensituation, Sprachen zu Hause)';
}

function generateAktuelleSituationText(dsData, stammdaten) {
    let text = '';
    const studentName = getVornameForText(stammdaten.schueler_name) || 'Der/Die Schüler:in';

    // Einleitung
    text += `${studentName} besucht derzeit die ${dsData.ds_aktuelle_klasse || stammdaten.klasse || '...'} Klasse der Schule in ${stammdaten.foerderort || '(Name und Ort der Schule)'}`;
    if (dsData.ds_lehrperson) text += `, bei ${dsData.ds_lehrperson}`;
    if (dsData.ds_eseb_referenz) text += ` und seine Referenzperson ist ${dsData.ds_eseb_referenz}`;
    text += '.';

    return text;
}

// Hilfsfunktion für natürliche deutsche Aufzählungen: "A, B und C"
function joinNatural(items, connector = 'und') {
    if (!items || items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return items[0] + ' ' + connector + ' ' + items[1];
    return items.slice(0, -1).join(', ') + ' ' + connector + ' ' + items[items.length - 1];
}

// Hilfsfunktion: Ersten Buchstaben groß machen (für Satzanfänge)
function capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Hilfsfunktion: Korrigiert Satzanfänge nach Punkt/Absatz - "das Kind" → "Das Kind" etc.
function fixSentenceStart(text) {
    if (!text) return text;
    // Nach Punkt+Leerzeichen oder am Textanfang: Kleinbuchstabe → Großbuchstabe
    text = text.replace(/(^|[.!?]\s+)([a-zäöü])/gm, (match, prefix, letter) => prefix + letter.toUpperCase());
    return text;
}

// Splittet "Nachname, Vorname" in seine Teile (mit Fallbacks)
function splitSchuelerName(fullName) {
    if (!fullName) return { nachname: '', vorname: '' };
    if (fullName.includes(',')) {
        const parts = fullName.split(',');
        return { nachname: (parts[0] || '').trim(), vorname: parts.slice(1).join(',').trim() };
    }
    // Kein Komma -> ohne Komma eingegeben. Heuristik: erstes Wort = Nachname (Lux-Konvention)
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return { nachname: parts[0], vorname: '' };
    return { nachname: parts[0], vorname: parts.slice(1).join(' ') };
}

// Liefert den Vornamen für die Verwendung im Fließtext der Berichte
function getVornameForText(rawName) {
    const { vorname, nachname } = splitSchuelerName(rawName);
    return vorname || nachname || '';
}

// Hilfsfunktion für grammatikalisch korrekte Namensformen
// Wenn kein Name angegeben ist, wird "das Kind" mit korrekter Kasusform verwendet
function getNameWithCase(rawName, casus = 'nom') {
    const isDefaultName = !rawName || rawName === 'Das Kind' || rawName === 'das Kind';
    if (!isDefaultName) return rawName;

    // Kasusformen für "das Kind"
    switch(casus) {
        case 'nom': return 'das Kind';      // Nominativ: das Kind zeigt...
        case 'gen': return 'des Kindes';    // Genitiv: die Entwicklung des Kindes
        case 'dat': return 'dem Kind';      // Dativ: bei dem Kind, von dem Kind
        case 'akk': return 'das Kind';      // Akkusativ: über das Kind
        default: return 'das Kind';
    }
}

function generateSichtweiseSchuleText(dsData) {
    const rawName = getVornameForText(document.getElementById('schueler_name')?.value);
    const name = rawName || 'das Kind';
    const nameGen = getNameWithCase(rawName, 'gen');
    const nameDat = getNameWithCase(rawName, 'dat');
    const nameAkk = getNameWithCase(rawName, 'akk');
    const verhalten = dsData.ds_schule_verhalten;
    const leistung = dsData.ds_schule_leistung;
    const positiv = dsData.checkboxes?.ds_schule_positiv || [];
    const negativ = dsData.checkboxes?.ds_schule_negativ || [];
    const aufmerksamkeit = dsData.checkboxes?.ds_schule_aufmerksamkeit || [];
    const arbeit = dsData.checkboxes?.ds_schule_arbeit || [];
    const emotion = dsData.checkboxes?.ds_schule_emotion || [];
    const konflikt = dsData.checkboxes?.ds_schule_konflikt || [];
    const hilft = dsData.checkboxes?.ds_schule_hilft || [];
    const mitschueler = dsData.ds_schule_mitschueler;
    const lehrer = dsData.ds_schule_lehrer;
    const erwartungen = dsData.checkboxes?.ds_schule_erwartung || [];

    let text = '';

    // === EINLEITUNG ===
    if (dsData.ds_schule_info_von) {
        const datum = dsData.ds_schule_info_datum ? new Date(dsData.ds_schule_info_datum).toLocaleDateString('de-DE') : '';
        text += `Die folgenden Angaben wurden ${datum ? `am ${datum} ` : ''}im Gespräch mit ${dsData.ds_schule_info_von} erhoben.\n\n`;
    }

    const hatAufm = aufmerksamkeit.length > 0;
    const hatArbeit = arbeit.length > 0;
    const hatEmotion = emotion.length > 0;
    const hatNegativ = negativ.length > 0;
    const hatPositiv = positiv.length > 0;
    const hatKonflikt = konflikt.length > 0;
    const hatHilft = hilft.length > 0;

    // --- Aufmerksamkeit und Konzentration ---
    if (hatAufm) {
        if (aufmerksamkeit.includes('konzentriert_gut')) {
            text += `Laut Lehrkraft kann sich ${name} im Unterricht altersgemäß konzentrieren und aufmerksam mitarbeiten. `;
        } else {
            text += `Die Lehrkraft berichtet, dass es ${nameDat} schwerfällt, sich im Unterricht ausreichend zu konzentrieren`;
            const aufmDetails = [];
            if (aufmerksamkeit.includes('kurze_spanne')) aufmDetails.push('die Aufmerksamkeitsspanne sei deutlich verkürzt');
            if (aufmerksamkeit.includes('leicht_ablenkbar')) aufmDetails.push(`${name} lasse sich leicht durch äußere Reize ablenken`);
            if (aufmerksamkeit.includes('beginnt_nicht')) aufmDetails.push('der Einstieg in Aufgaben falle schwer');
            if (aufmerksamkeit.includes('beendet_nicht')) aufmDetails.push('begonnene Aufgaben würden selten zu Ende geführt');
            if (aufmerksamkeit.includes('tagtraeumer')) aufmDetails.push(`${name} wirke häufig abwesend und verträumt`);
            if (aufmDetails.length > 0) {
                text += `: ${aufmDetails.join(', ')}`;
            }
            text += `. `;
            if (aufmerksamkeit.includes('strukturhilfe') || aufmerksamkeit.includes('einzelbegleitung')) {
                text += `Um dem Unterricht folgen zu können, brauche ${name} klare Strukturierungshilfen und eine engmaschige Begleitung. `;
            }
        }
    }

    // --- Motorik und Impulskontrolle ---
    if (negativ.includes('motorisch_unruhig') || negativ.includes('impulsiv') || negativ.includes('stoert')) {
        if (negativ.includes('motorisch_unruhig') && negativ.includes('impulsiv')) {
            text += `Darüber hinaus falle ${name} durch eine ausgeprägte motorische Unruhe auf und handle häufig impulsiv, ohne die Konsequenzen abzuwägen. `;
        } else if (negativ.includes('motorisch_unruhig')) {
            text += `Zudem wird eine auffällige motorische Unruhe beschrieben, die die Teilnahme am Unterricht erschwere. `;
        } else if (negativ.includes('impulsiv')) {
            text += `${name} handle häufig impulsiv, was die Verhaltenssteuerung im Schulalltag erschwere. `;
        } else {
            text += `${name} störe wiederholt den Unterrichtsablauf und habe Schwierigkeiten, sich an die Regeln zu halten. `;
        }
    }

    // --- Emotionale Regulation ---
    if (hatEmotion) {
        if (emotion.includes('emotional_stabil')) {
            text += hatAufm && !aufmerksamkeit.includes('konzentriert_gut')
                ? `Emotional zeige sich ${name} hingegen stabil und ausgeglichen, was als wichtige Stärke hervorgehoben wird. `
                : `Emotional wird ${name} als stabil und ausgeglichen beschrieben. `;
        } else {
            if (emotion.includes('wutausbrueche') && (emotion.includes('stimmungsschwankungen') || negativ.includes('niedrige_frustration'))) {
                text += `Emotional sei ${name} leicht aus dem Gleichgewicht zu bringen: Es komme regelmäßig zu Wutausbrüchen, wobei die Frustrationstoleranz sehr gering sei. `;
            } else if (emotion.includes('wutausbrueche')) {
                text += `Es komme wiederholt zu Wutausbrüchen, in denen ${name} die Kontrolle über das eigene Verhalten verliere. `;
            } else if (emotion.includes('stimmungsschwankungen')) {
                text += `Die Stimmung von ${nameDat} schwanke stark und sei oft schwer vorhersehbar. `;
            } else if (emotion.includes('angst_versagen') || emotion.includes('selbstwert_niedrig')) {
                text += `${name} zeige deutliche Versagensängste und ein geringes Selbstwertgefühl, was sich hemmend auf die Mitarbeit auswirke. `;
            } else if (emotion.includes('trennungsangst')) {
                text += `Auffällig sei eine ausgeprägte Trennungsangst, die ${nameDat} die Teilnahme am Schulalltag erschwere. `;
            } else if (emotion.includes('somatische_beschwerden')) {
                text += `In belastenden Situationen klage ${name} häufig über körperliche Beschwerden wie Kopf- oder Bauchschmerzen. `;
            } else if (emotion.includes('weint_leicht')) {
                text += `${name} reagiere emotional sehr sensibel und weine häufig bei Kleinigkeiten. `;
            }
        }
    }

    // --- Arbeitsverhalten ---
    if (hatArbeit) {
        const probleme = arbeit.filter(a => a !== 'sorgfaeltig');
        if (arbeit.includes('sorgfaeltig') && probleme.length === 0) {
            text += `\n\nDas Arbeitsverhalten wird als sorgfältig und strukturiert beschrieben. `;
        } else if (probleme.length > 0) {
            text += `\n\nBeim Arbeitsverhalten fallen weitere Schwierigkeiten auf: `;
            if (arbeit.includes('chaotisch') && arbeit.includes('material_vergessen')) {
                text += `${name} arbeite unorganisiert, vergesse häufig Materialien und habe Mühe, den Überblick zu behalten. `;
            } else if (arbeit.includes('chaotisch')) {
                text += `Die Arbeit sei wenig strukturiert, der Arbeitsplatz oft unordentlich. `;
            } else if (arbeit.includes('material_vergessen')) {
                text += `${name} vergesse regelmäßig Arbeitsmaterialien. `;
            }
            if (arbeit.includes('sehr_langsam') || arbeit.includes('schnell_fertig')) {
                text += arbeit.includes('sehr_langsam') ? `Das Arbeitstempo sei deutlich verlangsamt, sodass der Unterrichtsstoff kaum bewältigt werden könne. ` : `${name} arbeite überhastet und mache dadurch viele Flüchtigkeitsfehler. `;
            }
            if (arbeit.includes('gibt_auf') || arbeit.includes('perfektionistisch')) {
                text += arbeit.includes('perfektionistisch')
                    ? `Aus Angst vor Fehlern vermeide ${name} es, Aufgaben überhaupt anzufangen. `
                    : `Bei Schwierigkeiten gebe ${name} schnell auf. `;
            }
            if (arbeit.includes('hausaufgaben_fehlen')) {
                text += `Die Hausaufgaben würden nur unregelmäßig erledigt. `;
            }
        }
    }

    // --- Schulische Teilhabe und Leistung ---
    const hatVerhalten = verhalten && verhalten !== '';
    const hatLeistung = leistung && leistung !== '';

    if (hatVerhalten || hatLeistung) {
        if (verhalten === 'unauffaellig') {
            text += `\n\nInsgesamt könne ${name} dem Unterricht angemessen folgen und am Schulleben teilnehmen`;
        } else if (verhalten === 'teilweise') {
            text += `\n\nDie Teilnahme am Unterricht sei je nach Situation unterschiedlich – in manchen Kontexten gelinge sie gut, in anderen komme es zu deutlichen Schwierigkeiten`;
        } else if (verhalten === 'stark') {
            text += `\n\nDie beschriebenen Schwierigkeiten führten insgesamt zu einer erheblichen Beeinträchtigung der schulischen Teilhabe`;
        }
        if (hatLeistung) {
            text += `. `;
            if (leistung === 'ueberdurchschnittlich') {
                text += `Trotz der Verhaltensauffälligkeiten liege das Leistungsniveau über dem Durchschnitt, was auf gute kognitive Fähigkeiten hinweise`;
            } else if (leistung === 'durchschnittlich') {
                text += `Die schulischen Leistungen entsprächen dem Durchschnitt`;
            } else if (leistung === 'unterdurchschnittlich') {
                text += `Die schulischen Leistungen lägen unter dem Durchschnitt`;
            } else if (leistung === 'stark_unter') {
                text += `Es bestünden deutliche Leistungsrückstände in mehreren Bereichen`;
            }
        }
        text += `. `;
    }

    // --- Sozialverhalten ---
    const hatMitschueler = mitschueler && mitschueler !== '';
    const hatLehrer = lehrer && lehrer !== '';

    if (hatMitschueler || hatLehrer) {
        if (mitschueler === 'gut_integriert') {
            text += `${name} sei gut in die Klassengemeinschaft integriert und pflege positive Beziehungen zu den Mitschülern`;
        } else if (mitschueler === 'einige_freunde') {
            text += `${name} habe einige Freundschaften in der Klasse, auch wenn es gelegentlich zu Konflikten komme`;
        } else if (mitschueler === 'isoliert') {
            text += `${name} habe wenig Anschluss an die Klassengemeinschaft und sei eher isoliert`;
        } else if (mitschueler === 'konflikthaft') {
            text += `Es komme wiederholt zu Konflikten mit Mitschülern, die das Zusammenleben in der Klasse belasteten`;
        } else if (mitschueler === 'gemobbt') {
            text += `Es bestehe der Verdacht, dass ${name} von Mitschülern ausgegrenzt oder gemobbt werde`;
        } else if (mitschueler === 'mobbt') {
            text += `${name} sei selbst an Ausgrenzungen anderer Kinder beteiligt`;
        }
        if (hatLehrer) {
            text += `. Die Beziehung zu den Lehrpersonen wird als `;
            if (lehrer === 'positiv') text += `gut und vertrauensvoll beschrieben`;
            else if (lehrer === 'neutral') text += `sachlich und neutral eingeschätzt`;
            else if (lehrer === 'angespannt') text += `phasenweise angespannt wahrgenommen`;
            else if (lehrer === 'konflikthaft') text += `häufig konflikthaft beschrieben`;
        }
        text += `. `;
    }

    // --- Schwierige Situationen und hilfreiche Strategien ---
    if (hatKonflikt || hatHilft || hatPositiv) {
        text += '\n\n';

        if (hatKonflikt) {
            text += `Besonders schwierig seien für ${nameAkk} `;
            const barrieren = [];
            if (konflikt.includes('uebergaenge') || konflikt.includes('unerwartetes')) barrieren.push('Übergänge und unerwartete Veränderungen im Tagesablauf');
            if (konflikt.includes('warten')) barrieren.push('Situationen, in denen gewartet werden müsse');
            if (konflikt.includes('leistungsdruck')) barrieren.push('Prüfungssituationen und Zeitdruck');
            if (konflikt.includes('gruppenarbeit') || konflikt.includes('freies_spiel')) barrieren.push('unstrukturierte Gruppen- und Spielsituationen');
            if (konflikt.includes('kritik') || konflikt.includes('ungerechtigkeit') || konflikt.includes('verlieren')) barrieren.push('Situationen, in denen Kritik geäußert werde oder das Gefühl von Ungerechtigkeit aufkomme');
            if (konflikt.includes('einzelarbeit')) barrieren.push('längere Phasen selbstständiger Arbeit');
            text += barrieren.join(', ') + `. `;
        }

        if (hatHilft) {
            text += `Hilfreich seien hingegen `;
            const foerder = [];
            if (hilft.includes('klare_ansagen') || hilft.includes('vorwarnung') || hilft.includes('visualisierungen')) {
                foerder.push('klare Ansagen, Vorankündigungen und visuelle Hilfen');
            }
            if (hilft.includes('kleingruppe') || hilft.includes('naehe_lehrer') || hilft.includes('einzelansprache')) {
                foerder.push('eine enge Begleitung durch die Lehrperson und kleinere Lerngruppen');
            }
            if (hilft.includes('bewegungspausen') || hilft.includes('ruhige_ecke')) {
                foerder.push('Bewegungspausen und Rückzugsmöglichkeiten');
            }
            if (hilft.includes('lob') || hilft.includes('wiederholungen')) {
                foerder.push('Lob und geduldiges Wiederholen');
            }
            text += foerder.join(', ') + `. `;
        }

        if (hatPositiv) {
            text += `Als Stärken von ${nameDat} werden `;
            const persoenlich = [];
            if (positiv.includes('motiviert')) persoenlich.push('eine grundlegende Lernmotivation');
            if (positiv.includes('kreativ')) persoenlich.push('Kreativität');
            if (positiv.includes('kooperativ') || positiv.includes('hilfsbereit')) persoenlich.push('Hilfsbereitschaft und Kooperationsfähigkeit');
            if (positiv.includes('empathisch')) persoenlich.push('Einfühlungsvermögen');
            if (positiv.includes('respektvoll')) persoenlich.push('respektvolles Verhalten gegenüber Erwachsenen');
            if (positiv.includes('selbststaendig')) persoenlich.push('Ansätze zur Selbstständigkeit');
            if (positiv.includes('frustrationstoleranz')) persoenlich.push('eine gute Frustrationstoleranz');
            text += joinNatural(persoenlich) + ` hervorgehoben. `;
        }
    }

    // Ergänzende Beschreibungen
    if (dsData.ds_schule_verhalten_details) {
        text += `\n\n${dsData.ds_schule_verhalten_details}`;
    }

    // Erwartungen
    if (erwartungen.length > 0 || dsData.ds_schule_erwartungen) {
        text += `\n\nDie Schule wünscht sich Unterstützung bei `;
        const ziele = [];
        if (erwartungen.includes('verhalten_verbessern')) ziele.push('der Verbesserung der Verhaltenssteuerung');
        if (erwartungen.includes('konzentration_verbessern')) ziele.push('der Förderung der Konzentrationsfähigkeit');
        if (erwartungen.includes('soziale_integration')) ziele.push('der sozialen Eingliederung');
        if (erwartungen.includes('emotionale_stabilitaet')) ziele.push('der emotionalen Stabilisierung');
        if (erwartungen.includes('leistung_verbessern')) ziele.push('der Verbesserung der schulischen Leistungen');
        if (erwartungen.includes('strategien_schule')) ziele.push('konkreten Handlungsempfehlungen für den Schulalltag');
        if (erwartungen.includes('externe_unterstuetzung')) ziele.push('der Einleitung externer therapeutischer Maßnahmen');
        if (erwartungen.includes('elternarbeit')) ziele.push('einer intensiveren Zusammenarbeit mit den Eltern');
        if (erwartungen.includes('foerderort_pruefung')) ziele.push('der Überprüfung des geeigneten Förderortes');
        if (erwartungen.includes('abklaerung')) ziele.push('einer diagnostischen Abklärung');
        text += joinNatural(ziele, 'sowie');
        if (dsData.ds_schule_erwartungen) {
            text += `. Darüber hinaus: ${dsData.ds_schule_erwartungen}`;
        }
        text += '.';
    }

    return fixSentenceStart(text.trim()) || '(Schulische Perspektive wird hier eingefügt)';
}

function generateSichtweiseSchuelerText(dsData, stammdaten) {
    const rawName = getVornameForText(stammdaten?.schueler_name) || getVornameForText(document.getElementById('schueler_name')?.value);
    const name = rawName || 'das Kind';
    const nameDat = getNameWithCase(rawName, 'dat');
    const nameAkk = getNameWithCase(rawName, 'akk');
    const wohlbefinden = dsData.ds_schueler_wohlbefinden;
    const leidensdruck = dsData.ds_schueler_leidensdruck;
    const belastungen = dsData.checkboxes?.ds_schueler_belastung || [];
    const wichtig = dsData.checkboxes?.ds_schueler_wichtig || [];
    const selbst = dsData.checkboxes?.ds_schueler_selbst || [];
    const reaktion = dsData.checkboxes?.ds_schueler_reaktion || [];
    const hobbys = dsData.checkboxes?.ds_schueler_hobbys || [];
    const wuensche = dsData.checkboxes?.ds_schueler_wunsch || [];

    let text = '';

    if (dsData.ds_schueler_gespraech_datum) {
        const datum = new Date(dsData.ds_schueler_gespraech_datum).toLocaleDateString('de-DE');
        text += `Am ${datum} wurde ein Gespräch mit ${name} geführt, um dessen eigene Sicht auf die aktuelle Situation zu erfahren.\n\n`;
    }

    const hatWohl = wohlbefinden && wohlbefinden !== '';
    const hatLeiden = leidensdruck && leidensdruck !== '' && leidensdruck !== 'nein';
    const hatBelast = belastungen.length > 0 && !belastungen.includes('nichts');
    const hatSelbst = selbst.length > 0;
    const hatReaktion = reaktion.length > 0;

    // --- Wohlbefinden und Belastungen ---
    if (hatWohl || hatLeiden || hatBelast) {
        if (hatWohl) {
            if (wohlbefinden === 'sehr_wohl' || wohlbefinden === 'meistens_wohl') {
                text += `${name} berichtet, sich in der Schule ${wohlbefinden === 'sehr_wohl' ? 'sehr wohl' : 'überwiegend wohl'} zu fühlen`;
                text += (!hatBelast && !hatLeiden) ? `. ` : `, auch wenn es Dinge gebe, die belasteten. `;
            } else if (wohlbefinden === 'mal_so') {
                text += `${name} beschreibt das eigene Wohlbefinden in der Schule als wechselhaft – mal sei es gut, mal weniger`;
                text += (hatBelast || hatLeiden) ? `. ` : `. `;
            } else if (wohlbefinden === 'eher_unwohl' || wohlbefinden === 'sehr_unwohl') {
                text += `${name} gibt an, sich in der Schule ${wohlbefinden === 'sehr_unwohl' ? 'gar nicht wohl' : 'eher unwohl'} zu fühlen`;
                text += (hatBelast || hatLeiden) ? `. ` : `. `;
            }
        }

        if (hatLeiden && hatBelast) {
            text += `${name} leide ${leidensdruck === 'stark' ? 'stark' : leidensdruck === 'mittel' ? 'spürbar' : 'etwas'} unter der aktuellen Situation. `;
            text += `Als belastend nenne ${name} `;
            const belastText = [];
            if (belastungen.includes('schulische_anforderungen')) belastText.push('die schulischen Anforderungen');
            if (belastungen.includes('konflikte_mitschueler')) belastText.push('Streit mit anderen Kindern');
            if (belastungen.includes('konflikte_lehrer')) belastText.push('Schwierigkeiten mit Lehrpersonen');
            if (belastungen.includes('situation_zuhause')) belastText.push('die Situation zu Hause');
            if (belastungen.includes('traurigkeit_aengste')) belastText.push('Traurigkeit und Ängste');
            if (belastungen.includes('wutausbrueche')) belastText.push('die eigenen Wutausbrüche');
            text += joinNatural(belastText) + `. `;
        } else if (hatLeiden) {
            text += `${name} leide ${leidensdruck === 'stark' ? 'stark' : leidensdruck === 'mittel' ? 'spürbar' : 'etwas'} unter der aktuellen Situation. `;
        } else if (hatBelast) {
            text += `Als belastend benennt ${name} `;
            const belastText = [];
            if (belastungen.includes('schulische_anforderungen')) belastText.push('die Schule');
            if (belastungen.includes('konflikte_mitschueler')) belastText.push('Streit mit anderen Kindern');
            if (belastungen.includes('konflikte_lehrer')) belastText.push('Schwierigkeiten mit Lehrern');
            if (belastungen.includes('situation_zuhause')) belastText.push('die Situation zu Hause');
            if (belastungen.includes('traurigkeit_aengste')) belastText.push('Traurigkeit und Ängste');
            if (belastungen.includes('wutausbrueche')) belastText.push('die eigene Wut');
            text += joinNatural(belastText) + `. `;
        }
    }

    // --- Selbstbild ---
    const selbstPos = ['bin_gut_schule', 'bin_lieb', 'haben_mich_gern', 'strafe_verdient', 'problembewusstsein'];
    const selbstNeg = ['bin_schlecht_schule', 'bin_boese', 'keiner_mag_mich', 'ungerechtigkeit', 'kein_problembewusstsein'];
    const positivesSelbst = selbst.filter(s => selbstPos.includes(s));
    const negativesSelbst = selbst.filter(s => selbstNeg.includes(s));
    const hatWichtig = wichtig.length > 0;

    if (hatSelbst || hatWichtig) {
        text += '\n\n';
        if (positivesSelbst.length > 0 && negativesSelbst.length > 0) {
            text += `Das Selbstbild von ${nameDat} zeigt sich widersprüchlich: Einerseits `;
            const posParts = [];
            if (positivesSelbst.includes('bin_gut_schule')) posParts.push('halte sich ' + name + ' für einen guten Schüler');
            if (positivesSelbst.includes('bin_lieb')) posParts.push('sehe sich ' + name + ' als liebes Kind');
            if (positivesSelbst.includes('haben_mich_gern')) posParts.push('fühle sich ' + name + ' von anderen gemocht');
            if (positivesSelbst.includes('strafe_verdient')) posParts.push('könne ' + name + ' eigenes Fehlverhalten eingestehen');
            if (positivesSelbst.includes('problembewusstsein')) posParts.push('zeige ' + name + ' Problemeinsicht');
            text += posParts.join(', ') + `. Andererseits `;
            const negParts = [];
            if (negativesSelbst.includes('bin_schlecht_schule')) negParts.push('sehe sich ' + name + ' als schlechten Schüler');
            if (negativesSelbst.includes('bin_boese')) negParts.push('bezeichne sich ' + name + ' selbst als \u201Eböse\u201C');
            if (negativesSelbst.includes('keiner_mag_mich')) negParts.push('habe ' + name + ' das Gefühl, von niemandem gemocht zu werden');
            if (negativesSelbst.includes('ungerechtigkeit')) negParts.push('erlebe ' + name + ' vieles als ungerecht');
            if (negativesSelbst.includes('kein_problembewusstsein')) negParts.push('sehe ' + name + ' kaum eigene Anteile an den Schwierigkeiten');
            text += negParts.join(', ') + `. `;
        } else if (positivesSelbst.length > 0) {
            text += `${name} hat ein überwiegend positives Bild von sich: `;
            const posParts = [];
            if (positivesSelbst.includes('bin_gut_schule')) posParts.push(`${name} halte sich für einen guten Schüler`);
            if (positivesSelbst.includes('bin_lieb')) posParts.push(`${name} sehe sich als liebes Kind`);
            if (positivesSelbst.includes('haben_mich_gern')) posParts.push(`${name} fühle sich von anderen gemocht`);
            if (positivesSelbst.includes('strafe_verdient')) posParts.push(`${name} könne eigenes Fehlverhalten eingestehen`);
            if (positivesSelbst.includes('problembewusstsein')) posParts.push(`${name} zeige Problemeinsicht`);
            text += posParts.join(', ') + `. `;
        } else if (negativesSelbst.length > 0) {
            if (negativesSelbst.includes('bin_schlecht_schule') && negativesSelbst.includes('keiner_mag_mich')) {
                text += `${name} habe ein negatives Bild von sich selbst \u2013 sowohl schulisch als auch sozial. ${name} fühle sich als schlechter Schüler und habe das Gefühl, von niemandem gemocht zu werden. `;
            } else if (negativesSelbst.includes('bin_schlecht_schule')) {
                text += `${name} halte sich für einen schlechten Schüler, was die Lernmotivation hemme. `;
            } else if (negativesSelbst.includes('keiner_mag_mich')) {
                text += `${name} habe das Gefühl, von den anderen Kindern nicht gemocht zu werden. `;
            }
            if (negativesSelbst.includes('kein_problembewusstsein')) {
                text += `Eigene Anteile an den Schwierigkeiten sehe ${name} kaum. `;
            }
        }

        if (hatWichtig) {
            text += `Wichtig sei ${nameDat} vor allem `;
            const werte = [];
            if (wichtig.includes('freunde')) werte.push('Freundschaften');
            if (wichtig.includes('gute_noten')) werte.push('gute Noten');
            if (wichtig.includes('gerecht')) werte.push('Gerechtigkeit');
            if (wichtig.includes('respektiert')) werte.push('von anderen respektiert zu werden');
            if (wichtig.includes('ruhe') || wichtig.includes('pause')) werte.push('Ruhe und Erholung');
            if (wichtig.includes('spass')) werte.push('Spa\u00df zu haben');
            if (wichtig.includes('nicht_auffallen')) werte.push('nicht aufzufallen');
            text += joinNatural(werte) + `. `;
        }
    }

    // --- Umgang mit Konflikten und Beziehungen ---
    const hatBezMutter = dsData.ds_schueler_beziehung_mutter && dsData.ds_schueler_beziehung_mutter !== 'ka';
    const hatBezVater = dsData.ds_schueler_beziehung_vater && dsData.ds_schueler_beziehung_vater !== 'ka';
    const hatFreunde = dsData.ds_schueler_freunde && dsData.ds_schueler_freunde !== '';

    if (hatReaktion || hatBezMutter || hatBezVater || hatFreunde) {
        text += '\n\n';

        if (hatReaktion) {
            const adaptiv = reaktion.filter(r => ['hilfe_holen'].includes(r));
            const externalisierend = reaktion.filter(r => ['schreien', 'hauen', 'schuld_anderen'].includes(r));
            const internalisierend = reaktion.filter(r => ['zurueckziehen', 'weinen'].includes(r));
            const vermeidend = reaktion.filter(r => ['weglaufen', 'ignorieren'].includes(r));

            text += `Auf die Frage, was ${name} bei \u00c4rger oder Streit tue, `;

            if (adaptiv.length > 0 && (externalisierend.length > 0 || internalisierend.length > 0 || vermeidend.length > 0)) {
                text += `antwortet ${name}, sich manchmal Hilfe zu holen, aber auch `;
                if (externalisierend.length > 0) text += `${externalisierend.includes('hauen') ? 'zu schlagen' : externalisierend.includes('schreien') ? 'zu schreien' : 'anderen die Schuld zu geben'}`;
                if (internalisierend.length > 0) text += `${externalisierend.length > 0 ? ' oder ' : ''}${internalisierend.includes('zurueckziehen') ? 'sich zurückzuziehen' : 'zu weinen'}`;
                if (vermeidend.length > 0) text += `${(externalisierend.length > 0 || internalisierend.length > 0) ? ' oder ' : ''}die Situation zu verlassen`;
                text += `. `;
            } else if (adaptiv.length > 0) {
                text += `antwortet ${name}, sich Hilfe bei einem Erwachsenen zu holen. `;
            } else if (externalisierend.length > 0) {
                const extParts = [];
                if (externalisierend.includes('hauen')) extParts.push('zuzuschlagen');
                if (externalisierend.includes('schreien')) extParts.push('zu schreien');
                if (externalisierend.includes('schuld_anderen')) extParts.push('den anderen die Schuld zu geben');
                text += `berichtet ${name}, dann ${extParts.join(' oder ')}. `;
            } else if (internalisierend.length > 0) {
                text += `beschreibt ${name}, sich dann zurückzuziehen oder zu weinen. `;
            } else if (vermeidend.length > 0) {
                text += `berichtet ${name}, dann einfach wegzugehen oder die Situation zu ignorieren. `;
            }
        }

        if (hatBezMutter || hatBezVater || hatFreunde) {
            if (hatBezMutter || hatBezVater) {
                text += `Die Beziehung zur `;
                if (hatBezMutter) {
                    const bezM = dsData.ds_schueler_beziehung_mutter;
                    text += `Mutter beschreibt ${name} als ${bezM === 'sehr_gut' ? 'sehr gut' : bezM === 'gut' ? 'gut' : bezM === 'okay' ? 'mal gut, mal schwierig' : 'schwierig'}`;
                }
                if (hatBezMutter && hatBezVater) {
                    const bezV = dsData.ds_schueler_beziehung_vater;
                    text += `, die zum Vater als ${bezV === 'sehr_gut' ? 'sehr gut' : bezV === 'gut' ? 'gut' : bezV === 'okay' ? 'mal gut, mal schwierig' : 'schwierig'}`;
                } else if (hatBezVater) {
                    const bezV = dsData.ds_schueler_beziehung_vater;
                    text += `Vater beschreibt ${name} als ${bezV === 'sehr_gut' ? 'sehr gut' : bezV === 'gut' ? 'gut' : bezV === 'okay' ? 'mal gut, mal schwierig' : 'schwierig'}`;
                }
                text += `. `;
            }

            if (hatFreunde) {
                const freunde = dsData.ds_schueler_freunde;
                if (freunde === 'viele') {
                    text += `${name} berichtet, viele Freunde zu haben. `;
                } else if (freunde === 'einige' || freunde === 'bester_freund') {
                    text += `${name} habe ${freunde === 'einige' ? 'einige gute Freunde' : 'einen besten Freund'}, was ${nameDat} wichtig sei. `;
                } else if (freunde === 'wenige') {
                    text += `${name} erzählt, kaum Freunde zu haben. `;
                }
            }

            if (dsData.ds_schueler_vertrauensperson) {
                text += `Als Vertrauensperson in der Schule nennt ${name} ${dsData.ds_schueler_vertrauensperson}. `;
            }
        }
    }

    if (dsData.ds_schueler_beschreibung) {
        text += `\n\n${dsData.ds_schueler_beschreibung} `;
    }

    // --- Interessen und W\u00fcnsche ---
    const hatHobbys = hobbys.length > 0;
    const hatWuensche = wuensche.length > 0 || dsData.ds_schueler_wuensche;

    if (hatHobbys || hatWuensche) {
        text += '\n\n';

        if (hatHobbys) {
            text += `In der Freizeit interessiere sich ${name} f\u00fcr `;
            const hobbyText = [];
            if (hobbys.includes('sport')) hobbyText.push('Sport');
            if (hobbys.includes('kreativ')) hobbyText.push('kreative Aktivitäten');
            if (hobbys.includes('musik')) hobbyText.push('Musik');
            if (hobbys.includes('lesen')) hobbyText.push('Lesen');
            if (hobbys.includes('gaming')) hobbyText.push('Videospiele');
            if (hobbys.includes('freunde')) hobbyText.push('Treffen mit Freunden');
            if (hobbys.includes('tiere')) hobbyText.push('Tiere');
            if (hobbys.includes('natur')) hobbyText.push('Natur');
            text += joinNatural(hobbyText);
            if (dsData.ds_schueler_hobbys_details) {
                text += ` (${dsData.ds_schueler_hobbys_details})`;
            }
            text += `. `;
        }

        if (hatWuensche) {
            text += `Auf die Frage, was ${name} sich w\u00fcnsche, \u00e4u\u00dfert ${name} `;
            const wunschText = [];
            if (wuensche.includes('bessere_noten')) wunschText.push('bessere Noten');
            if (wuensche.includes('mehr_freunde')) wunschText.push('mehr Freunde');
            if (wuensche.includes('weniger_streit')) wunschText.push('weniger Streit');
            if (wuensche.includes('ruhe_zuhause')) wunschText.push('dass es zu Hause ruhiger w\u00e4re');
            if (wuensche.includes('weniger_druck')) wunschText.push('weniger Druck');
            if (wuensche.includes('verstanden_werden')) wunschText.push('besser verstanden zu werden');
            if (wuensche.includes('hilfe_bekommen')) wunschText.push('Hilfe zu bekommen');
            if (wuensche.includes('normal_sein')) wunschText.push('so zu sein wie die anderen');
            if (wuensche.includes('andere_klasse') || wuensche.includes('andere_schule')) wunschText.push('die Klasse oder Schule zu wechseln');
            if (wunschText.length > 0) {
                text += joinNatural(wunschText);
            }
            if (dsData.ds_schueler_wuensche) {
                text += `${wunschText.length > 0 ? '. Darüber hinaus: ' : ''}${dsData.ds_schueler_wuensche}`;
            }
            text += '.';
        }
    }

    return fixSentenceStart(text.trim()) || '(Kindperspektive wird hier eingefügt)';
}

function generateSichtweiseElternText(dsData) {
    const rawName = getVornameForText(document.getElementById('schueler_name')?.value);
    const name = rawName || 'das Kind';
    const nameGen = getNameWithCase(rawName, 'gen');
    const nameDat = getNameWithCase(rawName, 'dat');
    const verhalten = dsData.ds_eltern_verhalten;
    const beziehung = dsData.ds_eltern_beziehung;
    const zusammenarbeit = dsData.ds_eltern_zusammenarbeit;
    const positiv = dsData.checkboxes?.ds_eltern_positiv || [];
    const negativ = dsData.checkboxes?.ds_eltern_negativ || [];
    const konflikt = dsData.checkboxes?.ds_eltern_konflikt || [];
    const stil = dsData.checkboxes?.ds_eltern_stil || [];
    const belastung = dsData.checkboxes?.ds_eltern_belastung_cb || [];
    const erwartung = dsData.checkboxes?.ds_eltern_erwartung || [];
    const mitWem = dsData.checkboxes?.ds_eltern_gespraech_mit || [];

    let text = '';

    if (dsData.ds_eltern_gespraech_datum) {
        const datum = new Date(dsData.ds_eltern_gespraech_datum).toLocaleDateString('de-DE');
        let mitText = 'den Bezugspersonen';
        if (mitWem.includes('beide') || (mitWem.includes('mutter') && mitWem.includes('vater'))) mitText = 'beiden Elternteilen';
        else if (mitWem.includes('mutter')) mitText = 'der Mutter';
        else if (mitWem.includes('vater')) mitText = 'dem Vater';
        else if (mitWem.includes('andere')) mitText = 'dem/der Erziehungsberechtigten';
        text += `Am ${datum} fand ein Gespräch mit ${mitText} statt.\n\n`;
    }

    const hatVerhalten = verhalten && verhalten !== '';
    const hatBeziehung = beziehung && beziehung !== '';
    const hatPositiv = positiv.length > 0;
    const hatNegativ = negativ.length > 0;
    const hatKonflikt = konflikt.length > 0;
    const hatStil = stil.length > 0;

    // --- Verhalten zu Hause ---
    if (hatVerhalten || hatNegativ || hatPositiv) {
        if (verhalten === 'unauffaellig') {
            text += `Zu Hause verhalte sich ${name} laut den Eltern überwiegend altersgemäß. `;
        } else if (verhalten === 'teilweise') {
            text += `Zu Hause komme es je nach Situation zu Schwierigkeiten, berichten die Eltern. In manchen Momenten verhalte sich ${name} angemessen, in bestimmten Situationen zeigten sich jedoch deutliche Auffälligkeiten. `;
        } else if (verhalten === 'stark') {
            text += `Die Eltern berichten von erheblichen Schwierigkeiten zu Hause, die das Familienleben stark belasteten. `;
        }

        if (hatNegativ) {
            const emotional = negativ.filter(n => ['wutausbrueche', 'aengste', 'rueckzug'].includes(n));
            const koerperlich = negativ.filter(n => ['schlafprobleme', 'essprobleme', 'einnaessen'].includes(n));
            const verhaltensreg = negativ.filter(n => ['verweigert_regeln', 'medienkonsum'].includes(n));
            const interpersonell = negativ.filter(n => ['geschwisterkonflikte', 'hausaufgaben'].includes(n));
            const schwerwiegend = negativ.filter(n => ['selbstverletzung'].includes(n));

            if (emotional.length > 0) {
                if (emotional.includes('wutausbrueche')) {
                    text += `Es komme regelmäßig zu heftigen Wutausbrüchen`;
                }
                if (emotional.includes('aengste')) {
                    text += `${emotional.includes('wutausbrueche') ? '; außerdem zeige ' + name + ' ' : name + ' zeige '}ausgeprägte Ängste`;
                }
                if (emotional.includes('rueckzug')) {
                    text += `${emotional.length > 1 ? '; zudem ziehe sich ' + name : name + ' ziehe sich'} häufig zurück`;
                }
                text += `. `;
            }

            if (koerperlich.length > 0) {
                const koerpTeile = [];
                if (koerperlich.includes('schlafprobleme')) koerpTeile.push('Schlafprobleme');
                if (koerperlich.includes('essprobleme')) koerpTeile.push('Auffälligkeiten beim Essen');
                if (koerperlich.includes('einnaessen')) koerpTeile.push('Einnässen');
                text += `Darüber hinaus werden ${koerpTeile.join(', ')} berichtet. `;
            }

            if (verhaltensreg.length > 0 || interpersonell.length > 0) {
                const alltag = [];
                if (verhaltensreg.includes('verweigert_regeln')) alltag.push(`${name} verweigere sich häufig gegenüber Regeln und Aufforderungen`);
                if (verhaltensreg.includes('medienkonsum')) alltag.push('der Medienkonsum sei schwer zu begrenzen');
                if (interpersonell.includes('geschwisterkonflikte')) alltag.push('es komme zu häufigen Geschwisterkonflikten');
                if (interpersonell.includes('hausaufgaben')) alltag.push('die Hausaufgabensituation sei regelmäßig konfliktbeladen');
                text += `Im Alltag ${alltag.join('; ')}. `;
            }

            if (schwerwiegend.length > 0) {
                text += `Besonders besorgniserregend sei, dass ${name} sich selbst verletze – dies bedürfe dringend weiterer Abklärung. `;
            }
        }

        if (hatPositiv) {
            text += `Positiv heben die Eltern hervor, dass ${name} `;
            const foerder = [];
            if (positiv.includes('hilfsbereit')) foerder.push('hilfsbereit sei');
            if (positiv.includes('liebevoll')) foerder.push('liebevoll mit Familienmitgliedern umgehe');
            if (positiv.includes('selbststaendig')) foerder.push('Ansätze zur Selbstständigkeit zeige');
            if (positiv.includes('regeln')) foerder.push('Regeln grundsätzlich akzeptiere');
            if (positiv.includes('tagesstruktur')) foerder.push('sich an Tagesabläufe halten könne');
            text += joinNatural(foerder) + `. `;
        }
    }

    // --- Familiäres Umfeld ---
    if (hatBeziehung || hatKonflikt || hatStil) {
        text += '\n\n';

        if (hatBeziehung) {
            text += `Die Beziehung zwischen Eltern und Kind wird `;
            if (beziehung === 'sehr_gut' || beziehung === 'gut') {
                text += `als ${beziehung === 'sehr_gut' ? 'eng und vertrauensvoll' : 'insgesamt gut'} beschrieben. `;
            } else if (beziehung === 'ambivalent') {
                text += `als wechselhaft beschrieben – es gebe Phasen großer Nähe, aber auch wiederkehrende Konflikte. `;
            } else if (beziehung === 'angespannt' || beziehung === 'schwierig') {
                text += `als ${beziehung === 'angespannt' ? 'derzeit angespannt' : 'belastet'} beschrieben. `;
            }
        }

        if (hatKonflikt) {
            text += `Besonders schwierig seien `;
            const barrieren = [];
            if (konflikt.includes('morgens')) barrieren.push('die Morgensituation');
            if (konflikt.includes('hausaufgaben')) barrieren.push('die Hausaufgaben');
            if (konflikt.includes('essen')) barrieren.push('die Mahlzeiten');
            if (konflikt.includes('schlafengehen')) barrieren.push('das Zubettgehen');
            if (konflikt.includes('bildschirmzeit')) barrieren.push('die Begrenzung der Bildschirmzeit');
            if (konflikt.includes('pflichten')) barrieren.push('häusliche Pflichten');
            if (konflikt.includes('geschwister')) barrieren.push('das Zusammensein mit den Geschwistern');
            if (konflikt.includes('nein_akzeptieren')) barrieren.push('Situationen, in denen ein Nein akzeptiert werden müsse');
            text += joinNatural(barrieren) + `. `;
        }

        if (hatStil) {
            if (stil.includes('konsequent') && stil.includes('strukturiert')) {
                text += `Die Eltern schildern ihren Erziehungsstil als konsequent und strukturiert. `;
            } else if (stil.includes('inkonsequent') || stil.includes('uneinig') || stil.includes('wenig_struktur')) {
                const stilProbleme = [];
                if (stil.includes('inkonsequent')) stilProbleme.push('es ihnen schwerfalle, konsequent zu bleiben');
                if (stil.includes('uneinig')) stilProbleme.push('sie sich nicht immer einig in Erziehungsfragen seien');
                if (stil.includes('wenig_struktur')) stilProbleme.push('es im Alltag wenig feste Strukturen gebe');
                text += `Die Eltern räumen ein, dass ${stilProbleme.join(' und dass ')}. `;
            }
            if (stil.includes('ueberfordert')) {
                text += `Sie fühlten sich in der Erziehung zunehmend überfordert. `;
            }
        }
    }

    if (dsData.ds_eltern_verhalten_details) {
        text += `\n\n${dsData.ds_eltern_verhalten_details} `;
    }

    // --- Belastungserleben der Eltern ---
    const hatBelastung = belastung.length > 0 || dsData.ds_eltern_belastung;

    if (hatBelastung) {
        text += `\n\nDie Eltern beschreiben eine deutliche eigene Belastung. `;
        const stressoren = [];
        if (belastung.includes('staendige_konflikte')) stressoren.push('die ständigen Auseinandersetzungen');
        if (belastung.includes('sorge_zukunft')) stressoren.push('Sorgen um die Zukunft des Kindes');
        if (belastung.includes('schule_beschwerden')) stressoren.push('die häufigen Beschwerden aus der Schule');
        if (belastung.includes('hilflosigkeit')) stressoren.push('Gefühle der Hilflosigkeit');
        if (belastung.includes('aggressives_verhalten')) stressoren.push('das aggressive Verhalten');
        if (belastung.includes('keine_besserung')) stressoren.push('dass sich trotz aller Bemühungen nichts bessere');
        if (belastung.includes('erschoepfung')) stressoren.push('Erschöpfung');
        if (belastung.includes('partnerkonflikt')) stressoren.push('Konflikte in der Partnerschaft wegen des Kindes');
        if (belastung.includes('schuldgefuehle')) stressoren.push('Schuldgefühle');
        if (belastung.includes('soziale_isolation')) stressoren.push('ein zunehmender sozialer Rückzug der Familie');

        if (stressoren.length > 0) {
            text += `Als besonders belastend nennen sie ${joinNatural(stressoren)}. `;
        }
        if (dsData.ds_eltern_belastung) {
            text += `${dsData.ds_eltern_belastung} `;
        }
    }

    // --- Erwartungen und Kooperation ---
    const hatErwartung = erwartung.length > 0 || dsData.ds_eltern_erwartungen;
    const hatZusammenarbeit = zusammenarbeit && zusammenarbeit !== '';

    if (hatErwartung || hatZusammenarbeit) {
        text += '\n\n';

        if (hatErwartung) {
            text += `Die Eltern wünschen sich `;
            const wuensche = [];
            if (erwartung.includes('verhalten_verbessern')) wuensche.push('eine Verbesserung des Verhaltens');
            if (erwartung.includes('entspannung_zuhause')) wuensche.push('mehr Ruhe und Entspannung zu Hause');
            if (erwartung.includes('strategien_eltern')) wuensche.push('konkrete Tipps für den Erziehungsalltag');
            if (erwartung.includes('schule_verbessern')) wuensche.push('eine Stabilisierung der schulischen Situation');
            if (erwartung.includes('abklaerung')) wuensche.push('eine klare Einordnung der Schwierigkeiten');
            if (erwartung.includes('therapie')) wuensche.push('therapeutische Unterstützung');
            if (erwartung.includes('elternberatung')) wuensche.push('Beratung für sich selbst');
            if (erwartung.includes('verstehen')) wuensche.push('das Verhalten ihres Kindes besser zu verstehen');
            if (erwartung.includes('anderer_foerderort')) wuensche.push('die Prüfung einer anderen Schulform');
            text += joinNatural(wuensche, 'sowie');
            if (dsData.ds_eltern_erwartungen) {
                text += `. Darüber hinaus: ${dsData.ds_eltern_erwartungen}`;
            }
            text += '. ';
        }

        if (hatZusammenarbeit) {
            if (zusammenarbeit === 'sehr_hoch') {
                text += `Die Eltern zeigen sich sehr kooperativ und motiviert zur Zusammenarbeit.`;
            } else if (zusammenarbeit === 'hoch') {
                text += `Die Eltern sind grundsätzlich kooperationsbereit.`;
            } else if (zusammenarbeit === 'mittel') {
                text += `Die Bereitschaft zur Zusammenarbeit ist vorhanden, aber noch ausbaufähig.`;
            } else if (zusammenarbeit === 'zurueckhaltend') {
                text += `Die Eltern zeigen sich eher zurückhaltend, was die Zusammenarbeit angeht.`;
            } else if (zusammenarbeit === 'ablehnend') {
                text += `Die Bereitschaft zur Zusammenarbeit ist derzeit gering, was in der weiteren Begleitung berücksichtigt werden muss.`;
            }
        }
    }

    return fixSentenceStart(text.trim()) || '(Familiäre Perspektive wird hier eingefügt)';
}

function generateVerhaltensbeobachtungenText(dsData) {
    if (!dsData.beobachtungen || dsData.beobachtungen.length === 0) {
        return '(Verhaltensbeobachtungen werden hier eingefügt)';
    }

    const rawName = getVornameForText(document.getElementById('schueler_name')?.value);
    const name = rawName || 'das Kind';
    const nameDat = getNameWithCase(rawName, 'dat');

    // Generiere ICF-basierten Text für jede Beobachtung (INDIKATIV für eigene Beobachtungen)
    const beobachtungsTexte = dsData.beobachtungen.map((b, idx) => {
        let text = '';
        const posChecks = b.positivChecks || [];
        const negChecks = b.negativChecks || [];
        const interChecks = b.interaktionChecks || [];
        const hatPositiv = posChecks.length > 0 || b.positiv;
        const hatNegativ = negChecks.length > 0 || b.negativ;
        const hatInteraktion = interChecks.length > 0;

        // === EINLEITUNG: Beobachtungskontext ===
        if (b.datum) {
            const datum = new Date(b.datum).toLocaleDateString('de-DE');
            text += `Am ${datum} wurde eine systematische Verhaltensbeobachtung durchgeführt`;
            if (b.setting) {
                const settings = {
                    'einzelsituation': 'in einer strukturierten Einzelsituation',
                    'kleingruppe': 'im Kleingruppensetting',
                    'klassenverband': 'im Klassenkontext',
                    'pausenhof': 'in der unstrukturierten Pausensituation',
                    'maison_relais': 'im außerschulischen Betreuungskontext',
                    'andere': 'in einem alternativen Setting'
                };
                text += ` ${settings[b.setting] || b.setting}`;
            }
            if (b.dauer) {
                text += ` (Beobachtungsdauer: ${b.dauer} Minuten`;
                if (b.beobachter) text += `, Beobachter: ${b.beobachter}`;
                text += `)`;
            } else if (b.beobachter) {
                text += ` (Beobachter: ${b.beobachter})`;
            }
            text += `.\n\n`;
        }

        // === VERHALTENSANALYSE ===

        // --- Aufmerksamkeit und Konzentration ---
        const aufmerksamkeitPos = posChecks.filter(p => ['konzentriert'].includes(p));
        const aufmerksamkeitNeg = negChecks.filter(n => ['abgelenkt', 'motorisch_unruhig'].includes(n));

        if (aufmerksamkeitPos.length > 0 || aufmerksamkeitNeg.length > 0) {
            if (aufmerksamkeitPos.length > 0 && aufmerksamkeitNeg.length === 0) {
                text += `${name} konnte sich während der Beobachtung gut konzentrieren und die Aufmerksamkeit über den gesamten Zeitraum auf die jeweilige Aufgabe richten. `;
            } else if (aufmerksamkeitNeg.length > 0) {
                if (negChecks.includes('abgelenkt') && negChecks.includes('motorisch_unruhig')) {
                    text += `${name} ließ sich leicht ablenken und war motorisch unruhig, sodass ein fokussiertes Arbeiten kaum möglich war. `;
                } else if (negChecks.includes('abgelenkt')) {
                    text += `${name} war leicht ablenkbar und ließ sich immer wieder durch Außenreize aus der Aufgabe bringen. `;
                } else if (negChecks.includes('motorisch_unruhig')) {
                    text += `Auffällig war eine deutliche motorische Unruhe – ${name} konnte kaum still sitzen und wechselte ständig die Position. `;
                }
            }
        }

        // --- Arbeitsverhalten ---
        const aufgabenPos = posChecks.filter(p => ['aufgabe_begonnen', 'aufgabe_beendet', 'anweisungen'].includes(p));
        const aufgabenNeg = negChecks.filter(n => ['verweigert'].includes(n));

        if (aufgabenPos.length > 0 || aufgabenNeg.length > 0) {
            if (aufgabenPos.length > 0 && aufgabenNeg.length === 0) {
                if (posChecks.includes('aufgabe_begonnen') && posChecks.includes('aufgabe_beendet')) {
                    text += `Beim Arbeitsverhalten fiel positiv auf, dass ${name} Aufgaben selbstständig begann und auch zu Ende führte. `;
                } else if (posChecks.includes('aufgabe_begonnen')) {
                    text += `${name} ging Aufgaben selbstständig an. `;
                } else if (posChecks.includes('aufgabe_beendet')) {
                    text += `Begonnene Aufgaben führte ${name} ausdauernd zu Ende. `;
                }
                if (posChecks.includes('anweisungen')) {
                    text += `Anweisungen wurden gut aufgenommen und umgesetzt. `;
                }
            } else if (aufgabenNeg.length > 0) {
                text += `${name} verweigerte die gestellten Aufgaben, was auf mangelnde Motivation oder Angst vor dem Scheitern hindeuten kann. `;
            }
        }

        // --- Emotionsregulation ---
        const emotionPos = posChecks.filter(p => ['emotionen_reguliert', 'geduldig'].includes(p));
        const emotionNeg = negChecks.filter(n => ['wutausbruch', 'weinen', 'frustration'].includes(n));

        if (emotionPos.length > 0 || emotionNeg.length > 0) {
            if (emotionPos.length > 0 && emotionNeg.length === 0) {
                if (posChecks.includes('emotionen_reguliert')) {
                    text += `${name} wirkte emotional ausgeglichen und konnte Gefühle angemessen regulieren. `;
                }
                if (posChecks.includes('geduldig')) {
                    text += `Auch Wartezeiten wurden geduldig ausgehalten. `;
                }
            } else if (emotionNeg.length > 0) {
                if (negChecks.includes('wutausbruch') && negChecks.includes('frustration')) {
                    text += `Bei ${nameDat} kam es zu Wutausbrüchen, die mit einer niedrigen Frustrationstoleranz zusammenhingen – schon bei kleinen Hindernissen geriet ${name} in heftige Erregung. `;
                } else if (negChecks.includes('wutausbruch')) {
                    text += `Es kam zu einem Wutausbruch, bei dem ${name} die Kontrolle über die eigenen Gefühle deutlich verlor. `;
                } else if (negChecks.includes('weinen')) {
                    text += `${name} war emotional überflutet und begann zu weinen. `;
                } else if (negChecks.includes('frustration')) {
                    text += `Die Frustrationstoleranz war gering – bereits kleine Anforderungen führten zu Überforderungserleben. `;
                }
            }
        }

        // --- Soziales Verhalten ---
        const sozialPos = posChecks.filter(p => ['freundlich', 'kooperativ', 'beteiligt', 'konflikt_geloest', 'hilfe_geholt', 'regeln_eingehalten'].includes(p));
        const sozialNeg = negChecks.filter(n => ['aggressiv_verbal', 'aggressiv_koerperlich', 'stoeren', 'regelverletzung', 'rueckzug', 'kontaktvermeidung'].includes(n));

        if (sozialPos.length > 0 || sozialNeg.length > 0 || hatInteraktion) {
            if (sozialPos.length > 0 && sozialNeg.length === 0 && !interChecks.some(i => ['blickkontakt_vermeidet', 'isoliert', 'dominiert', 'provoziert'].includes(i))) {
                if (posChecks.includes('freundlich') || posChecks.includes('kooperativ')) {
                    text += `Im Umgang mit anderen zeigte sich ${name} freundlich und kooperativ. `;
                }
                if (posChecks.includes('regeln_eingehalten')) {
                    text += `Regeln wurden eingehalten. `;
                }
                if (posChecks.includes('hilfe_geholt')) {
                    text += `Bei Schwierigkeiten holte sich ${name} angemessen Hilfe. `;
                }
                if (posChecks.includes('konflikt_geloest')) {
                    text += `Konflikte löste ${name} konstruktiv. `;
                }
            } else if (sozialNeg.length > 0) {
                if (negChecks.includes('aggressiv_koerperlich')) {
                    text += `${name} wurde gegenüber anderen körperlich aggressiv. `;
                }
                if (negChecks.includes('aggressiv_verbal')) {
                    text += `Es kam zu verbalen Auseinandersetzungen, bei denen ${name} beleidigend wurde. `;
                }
                if (negChecks.includes('stoeren')) {
                    text += `Durch störendes Verhalten beeinträchtigte ${name} den Ablauf und die Interaktion mit anderen. `;
                }
                if (negChecks.includes('regelverletzung')) {
                    text += `Vereinbarte Regeln wurden wiederholt missachtet. `;
                }
                if (negChecks.includes('rueckzug') || negChecks.includes('kontaktvermeidung')) {
                    text += `${name} zog sich zurück und vermied den Kontakt zu anderen. `;
                }
            }

            // Interaktionsverhalten differenziert
            if (hatInteraktion) {
                const adaptivInter = interChecks.filter(i => ['blickkontakt_gut', 'kontakt_peers', 'fuegt_sich'].includes(i));
                const auffaelligInter = interChecks.filter(i => ['blickkontakt_vermeidet', 'isoliert', 'dominiert', 'provoziert'].includes(i));

                if (adaptivInter.length > 0 && auffaelligInter.length > 0) {
                    text += `Das Kontaktverhalten war uneinheitlich: `;
                    if (interChecks.includes('blickkontakt_gut')) text += `Einerseits hielt ${name} angemessen Blickkontakt, `;
                    if (interChecks.includes('blickkontakt_vermeidet')) text += `wich diesem aber auch immer wieder aus. `;
                    if (interChecks.includes('kontakt_peers') || interChecks.includes('fuegt_sich')) text += `${name} suchte durchaus den Kontakt zu Gleichaltrigen, `;
                    if (interChecks.includes('isoliert')) text += `zog sich dann jedoch wieder zurück. `;
                    if (interChecks.includes('dominiert')) text += `Dabei fiel eine Tendenz auf, andere dominieren zu wollen. `;
                    if (interChecks.includes('provoziert')) text += `Auch provozierendes Verhalten war zu beobachten. `;
                } else if (auffaelligInter.length > 0) {
                    if (interChecks.includes('blickkontakt_vermeidet')) text += `${name} wich Blickkontakt aus. `;
                    if (interChecks.includes('isoliert')) text += `${name} isolierte sich von den anderen Kindern. `;
                    if (interChecks.includes('dominiert')) text += `${name} versuchte, andere zu dominieren. `;
                    if (interChecks.includes('provoziert')) text += `${name} provozierte andere wiederholt. `;
                } else if (adaptivInter.length > 0) {
                    if (interChecks.includes('blickkontakt_gut')) text += `Der Blickkontakt war angemessen. `;
                    if (interChecks.includes('kontakt_peers')) text += `${name} suchte den Kontakt zu Gleichaltrigen. `;
                    if (interChecks.includes('fuegt_sich')) text += `${name} fügte sich gut in die Gruppe ein. `;
                }
                if (interChecks.includes('kontakt_sucht')) {
                    text += `Auffällig war, dass ${name} aktiv die Nähe zu Erwachsenen suchte. `;
                }
            }
        }

        // Ergänzende Freitextbeobachtungen
        if (b.positiv) {
            text += `\n\nAls Stärke fiel auf: ${b.positiv}. `;
        }
        if (b.negativ) {
            text += `${b.positiv ? '' : '\n\n'}Darüber hinaus war auffällig: ${b.negativ}. `;
        }

        // Zusammenfassung
        if (b.zusammenfassung) {
            text += `\n\nZusammenfassend: ${b.zusammenfassung}`;
        }

        return text.trim();
    }).filter(t => t !== '');

    // Übergreifende Einleitung
    if (beobachtungsTexte.length > 1) {
        return fixSentenceStart(`Im Rahmen der Diagnostik wurde ${name} in verschiedenen Situationen beobachtet:\n\n${beobachtungsTexte.join('\n\n---\n\n')}`);
    } else if (beobachtungsTexte.length === 1) {
        return fixSentenceStart(beobachtungsTexte[0]);
    }

    return '(Verhaltensbeobachtungen werden hier eingefügt)';
}

function generateInterpretationText(dsData) {
    const rawName = getVornameForText(document.getElementById('schueler_name')?.value);
    const name = rawName || 'das Kind';
    const nameGen = getNameWithCase(rawName, 'gen');
    const nameDat = getNameWithCase(rawName, 'dat');
    const nameAkk = getNameWithCase(rawName, 'akk');

    // Daten extrahieren
    const uebereinstimmung = dsData.checkboxes?.ds_uebereinstimmung || [];
    const differenz = dsData.checkboxes?.ds_differenz || [];
    const erklaerung = dsData.checkboxes?.ds_erklaerung || [];
    const aengste = dsData.checkboxes?.ds_entwicklungsangst || [];
    const abwehr = dsData.checkboxes?.ds_abwehr || [];

    // ===== ZUSAMMENFASSENDE BEWERTUNG =====
    let paragraphs = [];

    // EINLEITUNG
    paragraphs.push(`Die Zusammenschau aller Untersuchungsergebnisse ergibt ein differenziertes Bild der aktuellen Situation von ${nameDat}. Die Einschätzungen der Schule, der Eltern, die eigene Sichtweise des Kindes sowie die Verhaltensbeobachtungen werden im Folgenden zusammengeführt und eingeordnet.`);

    // ABSCHNITT 1: Übereinstimmungen und Unterschiede zwischen den Sichtweisen
    const hatUeber = uebereinstimmung.length > 0 || dsData.ds_interpretation_uebereinstimmung;
    const hatDiff = differenz.length > 0 || dsData.ds_interpretation_differenzen;

    if (hatUeber || hatDiff) {
        let konvergenzText = '';

        if (hatUeber) {
            konvergenzText += 'Die verschiedenen Sichtweisen stimmen in wesentlichen Punkten überein: ';
            let konvergenzPunkte = [];
            if (uebereinstimmung.includes('alle_verhalten')) {
                konvergenzPunkte.push('alle Bezugspersonen beschreiben ähnliche Verhaltensweisen');
            }
            if (uebereinstimmung.includes('alle_staerken')) {
                konvergenzPunkte.push('die Stärken und Ressourcen des Kindes werden von allen Seiten ähnlich wahrgenommen');
            }
            if (uebereinstimmung.includes('alle_schwaechen')) {
                konvergenzPunkte.push('auch über die Bereiche mit Förderbedarf herrscht weitgehend Einigkeit');
            }
            if (uebereinstimmung.includes('beobachtung_bestaetigt')) {
                konvergenzPunkte.push('die eigenen Beobachtungen bestätigen die Schilderungen der Bezugspersonen');
            }
            if (uebereinstimmung.includes('eldib_bestaetigt')) {
                konvergenzPunkte.push('die Einordnung über den ELDiB stimmt mit dem Gesamteindruck überein');
            }
            if (uebereinstimmung.includes('kind_einsicht')) {
                konvergenzPunkte.push(`${name} selbst zeigt Ansätze, die eigenen Schwierigkeiten wahrzunehmen`);
            }

            if (konvergenzPunkte.length > 0) {
                if (konvergenzPunkte.length === 1) {
                    konvergenzText += konvergenzPunkte[0] + '. ';
                } else {
                    konvergenzText += konvergenzPunkte.slice(0, -1).join('; ') + '. Darüber hinaus ' + konvergenzPunkte[konvergenzPunkte.length - 1] + '. ';
                }
            }

            if (dsData.ds_interpretation_uebereinstimmung) {
                konvergenzText += dsData.ds_interpretation_uebereinstimmung + ' ';
            }
            konvergenzText += 'Diese Übereinstimmung verschiedener Perspektiven gibt den Befunden besonderes Gewicht.';
        }

        // Unterschiede
        if (hatDiff) {
            let divergenzText = hatUeber ? ' Allerdings gibt es auch Unterschiede zwischen den Sichtweisen. ' : 'Zwischen den verschiedenen Sichtweisen zeigen sich Unterschiede. ';

            if (differenz.includes('schule_zuhause') || differenz.includes('kontextabhaengig')) {
                divergenzText += `${name} verhält sich in der Schule deutlich anders als zu Hause, was zeigt, wie stark das Verhalten von der jeweiligen Umgebung abhängt. `;
            }
            if (differenz.includes('eltern_schule')) {
                divergenzText += 'Die Einschätzungen von Eltern und Schule weichen voneinander ab, was mit den unterschiedlichen Anforderungen der beiden Lebenswelten zusammenhängen dürfte. ';
            }
            if (differenz.includes('kind_andere') || differenz.includes('kein_problembewusstsein')) {
                divergenzText += `${name} selbst sieht die Situation anders als die Erwachsenen – ein Bewusstsein für die eigenen Schwierigkeiten ist noch wenig entwickelt. `;
            }
            if (differenz.includes('beobachtung_abweichend')) {
                divergenzText += 'Die eigenen Beobachtungen weichen teilweise von den Schilderungen der Bezugspersonen ab, was die Bedeutung einer Beobachtung in verschiedenen Situationen unterstreicht. ';
            }
            if (differenz.includes('eltern_bagatellisieren')) {
                divergenzText += 'Die Eltern schätzen die Schwierigkeiten möglicherweise geringer ein als sie tatsächlich sind, was bei der weiteren Arbeit berücksichtigt werden sollte. ';
            }
            if (differenz.includes('schule_dramatisiert')) {
                divergenzText += 'Die schulische Darstellung ist möglicherweise durch die eigene Belastung beeinflusst, was eine differenzierte Einordnung erfordert. ';
            }

            if (dsData.ds_interpretation_differenzen) {
                divergenzText += dsData.ds_interpretation_differenzen + ' ';
            }

            konvergenzText += divergenzText;
        }

        paragraphs.push(konvergenzText);
    }

    // ABSCHNITT 2: Erklärungsansätze für die beobachteten Schwierigkeiten
    const hatErkl = erklaerung.length > 0 || dsData.ds_interpretation_deutung;

    if (hatErkl) {
        let erklaerText = 'Für die beobachteten Schwierigkeiten lassen sich mehrere Erklärungsansätze heranziehen. ';

        // Individuelle Faktoren
        let individuell = [];
        if (erklaerung.includes('aufmerksamkeitsproblematik')) {
            individuell.push('Schwierigkeiten in Aufmerksamkeit und Konzentration');
        }
        if (erklaerung.includes('emotionale_dysregulation')) {
            individuell.push('eine eingeschränkte Fähigkeit, die eigenen Gefühle zu regulieren');
        }
        if (erklaerung.includes('reizueberflutung')) {
            individuell.push('eine besondere Empfindlichkeit gegenüber Reizen, die schnell zur Überforderung führt');
        }

        if (individuell.length > 0) {
            erklaerText += `Auf Seiten des Kindes spielen ${individuell.join(' sowie ')} eine Rolle. `;
        }

        // Persönliche Hintergründe
        let persoenlich = [];
        if (erklaerung.includes('entwicklungsverzoegerung')) {
            persoenlich.push('eine Verzögerung in der sozial-emotionalen Entwicklung');
        }
        if (erklaerung.includes('bindungsunsicherheit')) {
            persoenlich.push('eine grundlegende Unsicherheit in Beziehungen');
        }
        if (erklaerung.includes('soziale_unsicherheit')) {
            persoenlich.push('eine ausgeprägte soziale Ängstlichkeit');
        }
        if (erklaerung.includes('fehlende_strategien')) {
            persoenlich.push('fehlende Strategien im Umgang mit Stress und Konflikten');
        }

        if (persoenlich.length > 0) {
            if (persoenlich.length === 1) {
                erklaerText += `Darüber hinaus lässt sich ${persoenlich[0]} als möglicher Hintergrund annehmen. `;
            } else {
                erklaerText += `Darüber hinaus lassen sich ${joinNatural(persoenlich)} als mögliche Hintergründe annehmen. `;
            }
        }

        // Äußere Einflüsse
        let aeussere = [];
        if (erklaerung.includes('belastungsreaktion')) {
            aeussere.push('belastende Lebensereignisse');
        }
        if (erklaerung.includes('trauma_folgen')) {
            aeussere.push('mögliche Folgen traumatischer Erfahrungen');
        }
        if (erklaerung.includes('familiendynamik')) {
            aeussere.push('die aktuelle familiäre Situation');
        }
        if (erklaerung.includes('schulische_ueberforderung')) {
            aeussere.push('eine Überforderung im schulischen Bereich');
        }
        if (erklaerung.includes('schulische_unterforderung')) {
            aeussere.push('eine Unterforderung in der Schule');
        }

        if (aeussere.length > 0) {
            erklaerText += `Auch äußere Einflüsse tragen zur Situation bei: ${aeussere.join(' sowie ')}. `;
        }

        // Zusammenspiel
        if (erklaerung.length > 1) {
            erklaerText += 'Diese verschiedenen Faktoren wirken zusammen und verstärken sich gegenseitig. ';

            if (erklaerung.includes('emotionale_dysregulation') && erklaerung.includes('fehlende_strategien')) {
                erklaerText += `Insbesondere das Zusammenspiel aus mangelnder Emotionsregulation und fehlenden Bewältigungsstrategien scheint bei ${nameDat} ein zentraler Mechanismus zu sein, der die Schwierigkeiten aufrechterhält. `;
            }
            if (erklaerung.includes('bindungsunsicherheit') && (erklaerung.includes('familiendynamik') || erklaerung.includes('belastungsreaktion'))) {
                erklaerText += 'Die Beziehungsunsicherheit vor dem Hintergrund der familiären Situation stellt dabei einen wichtigen entwicklungspsychologischen Zusammenhang dar. ';
            }
        }

        if (dsData.ds_interpretation_deutung) {
            erklaerText += dsData.ds_interpretation_deutung + ' ';
        }

        paragraphs.push(erklaerText);
    }

    // ABSCHNITT 3: Entwicklungstherapeutische Einordnung (ELDiB/Angst-Abwehr)
    const hatAngst = aengste.length > 0;
    const hatAbwehr = abwehr.length > 0;

    if (hatAngst || hatAbwehr) {
        let entwicklungsText = 'Aus entwicklungstherapeutischer Sicht lässt sich das Verhalten im Rahmen des ELDiB-Modells einordnen. ';

        if (hatAngst) {
            let angstNarrativ = `Bei ${nameDat} `;

            if (aengste.includes('stufe1')) {
                angstNarrativ += 'steht die Angst vor dem Verlassenwerden und Alleinsein im Vordergrund (Stufe I), was auf ein starkes Bedürfnis nach Nähe und Sicherheit hinweist';
            } else if (aengste.includes('stufe2')) {
                angstNarrativ += 'zeigt sich vor allem die Angst, nicht zu genügen und zu versagen (Stufe II), was auf das Bedürfnis nach Kompetenzerleben und Eigenständigkeit verweist';
            } else if (aengste.includes('stufe3')) {
                angstNarrativ += 'steht die Angst vor Ablehnung durch Gleichaltrige im Vordergrund (Stufe III), was das Bedürfnis nach Zugehörigkeit und Anerkennung widerspiegelt';
            } else if (aengste.includes('stufe4')) {
                angstNarrativ += 'zeigt sich die Angst vor Konflikten mit Gleichaltrigen (Stufe IV), was auf Herausforderungen im Umgang mit Peers hindeutet';
            } else if (aengste.includes('stufe5')) {
                angstNarrativ += 'ist die Auseinandersetzung mit der eigenen Identität (Stufe V) ein zentrales Thema';
            }

            if (aengste.length > 1) {
                angstNarrativ += '. Dabei überlagern sich verschiedene Ängste, was auf eine komplexe emotionale Bedürfnislage schließen lässt';
            }

            angstNarrativ += '. ';
            entwicklungsText += angstNarrativ;
        }

        if (hatAbwehr) {
            let abwehrNarrativ = 'Die auffälligen Verhaltensweisen lassen sich als Bewältigungsversuche verstehen: ';

            if (abwehr.includes('rueckzug')) {
                abwehrNarrativ += `${name} zieht sich zurück, um sich vor erwarteten negativen Erfahrungen zu schützen. `;
            }
            if (abwehr.includes('aggression')) {
                abwehrNarrativ += 'Aggressive Ausbrüche dienen dazu, innere Anspannung abzubauen. ';
            }
            if (abwehr.includes('verweigerung')) {
                abwehrNarrativ += 'Durch Verweigerung schützt sich das Kind vor dem befürchteten Versagen. ';
            }
            if (abwehr.includes('regression')) {
                abwehrNarrativ += 'Der Rückfall in jüngeres Verhalten verschafft emotionale Entlastung und ruft Fürsorge hervor. ';
            }
            if (abwehr.includes('vermeidung')) {
                abwehrNarrativ += 'Vermeidungsverhalten verringert kurzfristig die Angst, verfestigt aber langfristig die Schwierigkeiten. ';
            }
            if (abwehr.includes('clown')) {
                abwehrNarrativ += 'Durch Clownerie lenkt das Kind von den eigentlichen Anforderungen ab und reguliert Anspannung. ';
            }
            if (abwehr.includes('ueberkontrolle')) {
                abwehrNarrativ += 'Übermäßige Kontrolle und starre Verhaltensweisen geben dem Kind ein Gefühl von Sicherheit. ';
            }
            if (abwehr.includes('projektion')) {
                abwehrNarrativ += 'Indem das Kind eigene Anteile auf andere überträgt, entlastet es sich von inneren Konflikten. ';
            }

            if (dsData.ds_abwehr_konkret) {
                abwehrNarrativ += `Im Alltag zeigt sich dies darin, dass ${dsData.ds_abwehr_konkret}. `;
            }

            entwicklungsText += abwehrNarrativ;
        }

        if (hatAngst && hatAbwehr) {
            entwicklungsText += 'Dieses Zusammenspiel von Ängsten und Bewältigungsstrategien ermöglicht ein vertieftes Verständnis des Verhaltens und liefert wichtige Ansatzpunkte für die Förderung.';
        }

        paragraphs.push(entwicklungsText);
    }

    // ABSCHLUSS
    if (dsData.ds_gesamtinterpretation) {
        paragraphs.push(`Zusammenfassend ist festzuhalten: ${dsData.ds_gesamtinterpretation}`);
    } else if (paragraphs.length > 1) {
        paragraphs.push(`Insgesamt ergibt sich für ${nameAkk} ein Bild, in dem verschiedene Faktoren zusammenwirken. Diese Analyse bildet die Grundlage für eine gezielte, auf die individuellen Bedürfnisse abgestimmte Förderplanung.`);
    }

    return fixSentenceStart(paragraphs.join('\n\n')) || '(Zusammenfassende Bewertung wird hier eingefügt)';
}

function generateSpezifischeBeduerfnisseText(dsData) {
    const rawName = getVornameForText(document.getElementById('schueler_name')?.value);
    const name = rawName || 'das Kind';
    const nameGen = getNameWithCase(rawName, 'gen');
    const nameDat = getNameWithCase(rawName, 'dat');

    // Text-Mappings für natürliche Sprache
    const M = {
        beduerfnis: { 'sichere_beziehungen': 'sicheren, stabilen Beziehungen zu verlässlichen Bezugspersonen', 'klare_strukturen': 'klaren Strukturen und vorhersehbaren Routinen', 'erfolgserlebnisse': 'regelmäßigen Erfolgserlebnissen und positiver Verstärkung', 'individuelle_aufmerksamkeit': 'individueller Aufmerksamkeit und persönlicher Zuwendung', 'emotionsregulation': 'gezielter Unterstützung beim Erlernen der Emotionsregulation', 'soziale_kompetenzen': 'einer Förderung sozialer Kompetenzen', 'schulische_differenzierung': 'schulischer Differenzierung entsprechend dem Leistungsstand', 'therapeutische_begleitung': 'therapeutischer Begleitung', 'familienunterstuetzung': 'Unterstützung für das gesamte Familiensystem' },
        ressource: { 'intelligenz': 'gute kognitive Fähigkeiten', 'kreativitaet': 'Kreativität', 'sportlich': 'sportliche Begabung', 'kuenstlerisch': 'künstlerische oder musische Talente', 'humor': 'Humor', 'empathie': 'Empathiefähigkeit', 'neugier': 'Wissensdurst und Neugier', 'begeisterungsfaehig': 'Begeisterungsfähigkeit', 'hilfsbereit': 'Hilfsbereitschaft', 'verantwortung': 'Verantwortungsbewusstsein', 'einzelbeziehung': 'die Fähigkeit, tragfähige Einzelbeziehungen aufzubauen', 'lernbereit': 'grundsätzliche Lernbereitschaft', 'vertrauensperson': 'eine verfügbare Vertrauensperson', 'familie_unterstuetzt': 'eine unterstützende Familie', 'hobby': 'Interessen und Hobbys', 'reflektiert': 'Ansätze zur Selbstreflexion' }
    };

    // Hilfsfunktion für natürliche Aufzählungen
    const liste = (arr, map) => {
        const items = arr.filter(i => i && map[i]).map(i => map[i]);
        if (items.length === 0) return '';
        if (items.length === 1) return items[0];
        return items.slice(0, -1).join(', ') + ' sowie ' + items[items.length - 1];
    };

    // Daten extrahieren
    const beduerfnisse = dsData.checkboxes?.ds_beduerfnis || [];
    const ressourcen = dsData.checkboxes?.ds_ressource || [];

    // ===== KOHÄRENTER FLIESSTEXT =====
    let text = '';

    // ABSATZ 1: Spezifische Bedürfnisse als Narrativ
    const hatBed = beduerfnisse.length > 0;
    const hatRes = ressourcen.length > 0 || dsData.ds_ressourcen;

    if (hatBed) {
        const bedListe = liste(beduerfnisse, M.beduerfnis);
        text += `Basierend auf der durchgeführten Diagnostik lassen sich die spezifischen Bedürfnisse von ${nameDat} klar benennen. Im Vordergrund steht das Bedürfnis nach ${bedListe}. `;

        // Bedürfnisse kategorisieren für besseren Flow
        const emotionaleBed = beduerfnisse.filter(b => ['sichere_beziehungen', 'individuelle_aufmerksamkeit', 'emotionsregulation'].includes(b));
        const strukturelleBed = beduerfnisse.filter(b => ['klare_strukturen', 'erfolgserlebnisse', 'schulische_differenzierung'].includes(b));
        const unterstuetzungsBed = beduerfnisse.filter(b => ['soziale_kompetenzen', 'therapeutische_begleitung', 'familienunterstuetzung'].includes(b));

        if (emotionaleBed.length > 0 && strukturelleBed.length > 0) {
            text += `Dabei zeigt sich, dass sowohl emotionale Grundbedürfnisse als auch der Bedarf nach struktureller Unterstützung im Vordergrund stehen. `;
        }
    }

    // Ergänzende Zusammenfassung
    if (dsData.ds_beduerfnisse_zusammenfassung) {
        text += dsData.ds_beduerfnisse_zusammenfassung + ' ';
    }

    // ABSATZ 2: Ressourcen als positiver Gegenpol
    if (hatRes) {
        text += '\n\n';
        const resListe = liste(ressourcen, M.ressource);

        if (hatBed) {
            // Verbindung zu Bedürfnissen
            text += `Gleichzeitig verfügt ${name} über wichtige Ressourcen, auf die in der Förderung aufgebaut werden kann: `;
        } else {
            text += `${name} verfügt über bedeutsame Ressourcen und Stärken: `;
        }

        if (resListe) {
            text += resListe;
            if (dsData.ds_ressourcen) {
                text += `. Darüber hinaus ${dsData.ds_ressourcen}`;
            }
        } else if (dsData.ds_ressourcen) {
            text += dsData.ds_ressourcen;
        }
        text += '. ';

        // Abschließender integrativer Satz
        if (hatBed && ressourcen.length >= 2) {
            text += `Diese vorhandenen Stärken bilden eine wichtige Grundlage für die weitere Entwicklung und sollten in der Förderplanung gezielt genutzt werden.`;
        }
    }

    return fixSentenceStart(text.trim()) || '(Spezifische Bedürfnisse und Ressourcen werden hier eingefügt)';
}

function generateEmpfehlungenText(dsData) {
    const rawName = getVornameForText(document.getElementById('schueler_name')?.value);
    const name = rawName || 'das Kind';

    // Text-Mappings für natürliche Sprache
    const M = {
        familie: { 'step': 'die Teilnahme am STEP-Elterntraining (im CDSE)', 'erziehungsberatung': 'eine Erziehungsberatung', 'familientherapie': 'eine Familientherapie', 'strukturen_zuhause': 'die Etablierung klarerer Strukturen im häuslichen Umfeld', 'austausch_schule': 'ein regelmäßiger Austausch zwischen Familie und Schule' },
        schule: { 'sitzplatz': 'eine Optimierung des Sitzplatzes', 'differenzierung': 'differenzierte Aufgabenstellungen', 'positives_feedback': 'häufiges positives Feedback', 'klare_regeln': 'klare Regeln mit transparenten Konsequenzen', 'auszeit': 'eine Auszeitmöglichkeit', 'verstaerkerplan': 'ein Verstärkerplan', 'iebs': 'die Unterstützung durch eine I-EBS' },
        regional: { 'eseb_weiter': 'die weiterführende Begleitung durch den ESEB', 'isa': 'eine spezialisierte ambulante Intervention (ISA)', 'conseil': 'Conseil & Guidance', 'lernwerkstatt': 'eine spezialisierte Lernwerkstatt', 'therapeutisch': 'therapeutische Maßnahmen' }
    };

    // Hilfsfunktion für natürliche Aufzählungen
    const liste = (arr, map) => {
        const items = arr.filter(i => i && map[i]).map(i => map[i]);
        if (items.length === 0) return '';
        if (items.length === 1) return items[0];
        return items.slice(0, -1).join(', ') + ' sowie ' + items[items.length - 1];
    };

    // Daten extrahieren
    const familie = dsData.checkboxes?.ds_empfehlung_familie || [];
    const schule = dsData.checkboxes?.ds_empfehlung_schule || [];
    const regional = dsData.checkboxes?.ds_empfehlung_regional || [];

    // ===== KOHÄRENTER FLIESSTEXT =====
    let text = '';
    const hatFamilie = familie.length > 0 || dsData.ds_empfehlung_familie_details;
    const hatSchule = schule.length > 0 || dsData.ds_empfehlung_schule_details;
    const hatRegional = regional.length > 0 || dsData.ds_empfehlung_regional_details;

    // Einleitung
    if (hatFamilie || hatSchule || hatRegional) {
        text += `Auf Grundlage der diagnostischen Erkenntnisse werden folgende Maßnahmen für ${name} empfohlen:\n\n`;
    }

    // ABSATZ 1: Familiärer Kontext
    if (hatFamilie) {
        const famListe = liste(familie, M.familie);
        text += 'Im familiären Kontext wird ';
        if (famListe) {
            text += famListe + ' empfohlen';
            if (dsData.ds_empfehlung_familie_details) {
                text += `. Ergänzend: ${dsData.ds_empfehlung_familie_details}`;
            }
        } else if (dsData.ds_empfehlung_familie_details) {
            text += dsData.ds_empfehlung_familie_details + ' empfohlen';
        }
        text += '. ';

        // Überleitung zur Schule
        if (hatSchule || hatRegional) {
            text += '\n\n';
        }
    }

    // ABSATZ 2: Schulischer Kontext
    if (hatSchule) {
        const schulListe = liste(schule, M.schule);
        text += 'Für den schulischen Bereich (lokale Ebene) werden ';
        if (schulListe) {
            text += schulListe + ' empfohlen';
            if (dsData.ds_empfehlung_schule_details) {
                text += `. Darüber hinaus: ${dsData.ds_empfehlung_schule_details}`;
            }
        } else if (dsData.ds_empfehlung_schule_details) {
            text += dsData.ds_empfehlung_schule_details + ' empfohlen';
        }
        text += '. ';

        // Verbindender Text wenn beides vorhanden
        if (hatFamilie && schule.includes('austausch_schule')) {
            text += 'Die enge Zusammenarbeit zwischen Schule und Familie bildet hierbei eine wichtige Grundlage. ';
        }

        // Überleitung zu regional
        if (hatRegional) {
            text += '\n\n';
        }
    }

    // ABSATZ 3: Regionaler Kontext (ESEB/CDSE)
    if (hatRegional) {
        const regListe = liste(regional, M.regional);
        text += 'Auf regionaler Ebene (ESEB/CDSE) wird ';
        if (regListe) {
            text += regListe + ' empfohlen';
            if (dsData.ds_empfehlung_regional_details) {
                text += `. Konkret: ${dsData.ds_empfehlung_regional_details}`;
            }
        } else if (dsData.ds_empfehlung_regional_details) {
            text += dsData.ds_empfehlung_regional_details + ' empfohlen';
        }
        text += '.';
    }

    // Abschließender integrativer Satz bei mehreren Kontexten
    if ((hatFamilie && hatSchule) || (hatSchule && hatRegional) || (hatFamilie && hatRegional)) {
        text += `\n\nDie erfolgreiche Umsetzung dieser Maßnahmen setzt eine gute Vernetzung aller beteiligten Akteure voraus, um ${name} optimal zu unterstützen.`;
    }

    return fixSentenceStart(text.trim()) || '(Maßnahmen für Familie, Schule, außerschulischen Kontext)';
}

// ==========================================
// ENDE DS FUNKTIONEN
// ==========================================
