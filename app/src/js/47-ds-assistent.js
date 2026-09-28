// =====================================================================
// DS-Assistent: Schritt für Schritt zum fertigen Diagnostic Spécialisé
// ---------------------------------------------------------------------
// Aussagen von 1 bis 7 anklicken, Auswahlfelder antippen, Fakten eintragen –
// rechts entsteht sofort der Berichtstext (Text-Motor: 46-ds-text.js).
//
// Datenmodell (dsData, wird je Einschätzung gespeichert):
//   { v: 2, geschlecht: 'm' | 'w' | '',
//     bewertungen: { aussageId: 1..7 },   chips: { gruppe: [schlüssel, …] },
//     f: { Fakten: Auswahl, Datum, Zahl, Listen },   frei: { Freitexte },
//     tabellen: { vorgeschichte: [], aktuell: [], interventionen: [] },
//     bearbeitet: { de|fr|en: { abschnitt: { text, basis } } },
//     alt: { Angaben aus dem früheren DS-Formular, falls übernommen } }
// =====================================================================

// ---------- Beschriftungen der Oberfläche ----------
const DS_UI = {
  de: {
    nav: 'DS-Bericht', titel: 'Spezialisierte Diagnostik (DS)',
    untertitel: 'Klicken Sie sich durch – der Bericht entsteht dabei von selbst.',
    zurueck: '← Zurück', weiter: 'Weiter →', zurVorschau: 'Zur Vorschau →',
    bewertet: '{n} von {m} bewertet', keineAngabe: 'Bewertung löschen',
    tipp: 'Tipp: Aussage anklicken und mit den Tasten 1–7 bewerten. 0 löscht, ↑/↓ wechselt die Aussage.',
    skala: {
      std: ['trifft gar nicht zu', 'teils/teils', 'trifft voll zu'],
      deutlich: ['keine Hinweise', 'teilweise', 'sehr deutlich'],
      wahrscheinlich: ['unwahrscheinlich', 'möglich', 'sehr wahrscheinlich'],
      wichtig: ['nicht nötig', 'hilfreich', 'sehr wichtig']
    },
    wirkung: {
      nicht: 'Wird im Bericht nicht erwähnt.',
      deutlich: 'Wird im Bericht als deutlicher Hinweis genannt.', teilweise: 'Wird im Bericht als möglicher Hinweis genannt.',
      haupt: 'Wird als wahrscheinlichste Erklärung genannt.', neben: 'Wird als mögliche weitere Erklärung genannt.',
      braucht: 'Steht im Bericht unter „braucht vor allem …“.', profitiert: 'Steht im Bericht unter „profitiert zudem von …“.',
      ohne: 'Steht im Bericht in der Aufzählung „keine Hinweise auf …“.'
    },
    vorschau: 'So steht es im Bericht', vorschauLeer: 'Noch kein Text. Sobald Sie Angaben machen, erscheint hier der Bericht.',
    sprache: 'Berichtssprache', spracheFehlt: 'Diese Sprache ist noch nicht verfügbar.',
    frei: 'Eigene Ergänzung', freiHinweis: 'Erscheint als eigener Absatz, genau so wie geschrieben (wird nicht übersetzt).',
    zeileHinzu: '+ Zeile', entfernen: 'Entfernen', beobHinzu: '+ Beobachtung',
    stammBearbeiten: 'Stammdaten bearbeiten', zumEldib: 'Zur ELDiB-Auswertung',
    eldibLeer: 'Es gibt noch keine ELDiB-Einschätzung. Ergebnisse und Förderziele werden automatisch übernommen, sobald im Bereich „ELDiB Auswertung“ Items bewertet sind.',
    eldibStufe: 'Stufe {s}', eldibErreicht: '{n} erreicht', eldibZiele: '{n} Förderziele', eldibKeineStufe: 'noch keine Stufe',
    eldibFrei: 'Ergänzung zum Bereich {b}',
    alter: '{j} Jahre', jahreMonate: '{j} Jahre {m} Monate',
    ja: 'ja', nein: 'nein', bitteWaehlen: '– bitte wählen –', anderes: 'Anderes …',
    // Vorschau & Export
    fertigTitel: 'Fertiger Bericht', pruefen: 'Vor dem Export prüfen', allesDa: 'Alle wichtigen Angaben sind vorhanden.', trotzdem: 'Trotzdem exportieren?',
    fehlt: { geschlecht: 'Geschlecht fehlt (Schritt 1)', name: 'Name des Kindes fehlt (Stammdaten)', geburt: 'Geburtsdatum fehlt (Stammdaten)', verfasser: 'Verfasser/in fehlt (Schritt 1)', auftrag: 'Datum der Beauftragung fehlt (Schritt 2)', eldib: 'Keine ELDiB-Einschätzung', cni: 'Keine Empfehlung an die CNI ausgewählt (Schritt 13)' },
    word: 'Word herunterladen', drucken: 'PDF / Drucken',
    bearbeiten: 'Text bearbeiten', uebernehmen: 'Übernehmen', abbrechen: 'Abbrechen', zuruecksetzen: 'Automatischen Text wiederherstellen',
    bearbeitetMarke: 'von Hand bearbeitet', veraltet: 'Die Angaben haben sich seit Ihrer Bearbeitung geändert. Prüfen Sie den Text oder stellen Sie den automatischen Text wieder her.',
    editHinweis: 'Leere Zeile = neuer Absatz · „• “ am Zeilenanfang = Aufzählungspunkt · „### “ = Zwischenüberschrift · [Tabelle] nicht löschen, wenn die Tabelle bleiben soll.',
    tabelleMarke: '[Tabelle]', rasterHinweis: 'Das vollständige ELDiB-Raster wird im Word-Dokument eingefügt.',
    wordFehlt: 'Der Word-Export wird gerade eingebaut.',
    deckblatt: 'Deckblatt',
    l: {
      geschlecht: 'Geschlecht (für die Grammatik im Bericht)', m: 'Junge', w: 'Mädchen',
      verfasser_name: 'Verfasser/in des Berichts', verfasser_funktion: 'Funktion', bericht_datum: 'Datum des Berichts',
      auftrag_datum: 'Datum der Beauftragung', auftraggeber: 'Auftraggeber', auftraggeber_andere: 'Anderer Auftraggeber',
      anlass: 'Anlass der Anfrage', anlass_andere: 'Weiterer Anlass (eigene Worte)', anlass_details: 'Konkrete Auffälligkeiten laut Anfrage (CI-Dokument)',
      anliegen: 'Ziel der Anfrage', empfohlen: 'Anfrage auf Empfehlung von',
      schwangerschaft: 'Schwangerschaft', schwangerschaft_details: 'Welche Komplikationen?', geburt: 'Geburt', geburt_details: 'Welche Komplikationen?',
      motorik: 'Motorische Entwicklung', motorik_details: 'Details (optional)', sprache: 'Sprachentwicklung', erste_worte: 'Erste Wörter (Monate)', sprache_details: 'Details (optional)',
      diagnosen: 'Bekannte Diagnosen', diagnosen_details: 'Wann, durch wen?', diagnose_andere: 'Andere Diagnose', keine_diagnosen: 'Es liegen keine Diagnosen vor',
      tab_vorgeschichte: 'Bisherige Unterstützungsmaßnahmen (letzte drei Jahre)', tab_aktuell: 'Aktuelle Unterstützungsmaßnahmen (3.1)', tab_interventionen: 'Interventionen des CDSE (Anhang 6.1)',
      familienstand: 'Familienstand der Eltern', lebt_bei: 'Das Kind lebt …', kontakt: 'Kontakt zu den Eltern', kontakt_details: 'Details zum Kontakt / Besuchsrecht',
      geschwister_anzahl: 'Anzahl Geschwister', geschwister_position: 'Position in der Geschwisterreihe', sprachen: 'Sprachen in der Familie', sprache_andere: 'Andere Sprache',
      beruf_mutter: 'Beruf der Mutter', zeit_mutter: 'Arbeitszeit der Mutter', beruf_vater: 'Beruf des Vaters', zeit_vater: 'Arbeitszeit des Vaters',
      ereignisse: 'Belastende Ereignisse', ereignis_details: 'Wann? Details', betreuung: 'Betreuung außerhalb der Schule', freizeit: 'Freizeit (ein Satz, optional)',
      klasse: 'Klasse', schule_name: 'Schule', lehrperson: 'Lehrperson (Name)', eseb_referenz: 'Referenzperson im ESEB',
      schule_quelle: 'Gespräch mit', schule_datum: 'Datum des Gesprächs', kind_datum: 'Datum des Gesprächs mit dem Kind', vertrauensperson: 'Vertrauensperson in der Schule (optional)',
      eltern_quelle: 'Gespräch mit', eltern_datum: 'Datum des Elterngesprächs',
      verfahren: 'Eingesetzte Verfahren', verfahren_andere: 'Weitere Verfahren', verfahren_ort: 'Ort der Beobachtungen und Gespräche (optional)',
      beobachtungen: 'Beobachtungen', b_datum: 'Datum', b_setting: 'Situation', b_dauer: 'Dauer (Min.)',
      abwehr: 'Ergänzung zu Ängsten und Abwehr (optional)', deutung: 'Weitere Interpretation (optional)',
      ressourcen: 'Ressourcen des Kindes', beduerfnisse: 'Ergänzung (optional)',
      abgestimmt: 'Wurden die Empfehlungen mit der Familie abgestimmt?', vorbehalte: 'Welche Vorbehalte?',
      ziele_bis: 'Ziele gelten bis (optional)', ziele_zusatz: 'Weitere Ziele (eine Zeile pro Ziel)',
      empf_familie: 'Empfehlungen – familiärer Kontext', empf_schule: 'Empfehlungen – schulischer Kontext (lokal)', empf_region: 'Empfehlungen – regionaler Kontext (ESEB / CDSE)',
      empfehlung_familie: 'Weitere Empfehlungen (eine pro Zeile)', empfehlung_schule: 'Weitere Empfehlungen (eine pro Zeile)', empfehlung_region: 'Weitere Empfehlungen (eine pro Zeile)',
      cni: 'Empfehlung an die CNI (wird auf dem Deckblatt angekreuzt)', cni_begruendung: 'Begründung (optional)',
      schule: 'Eigene Ergänzung', kind: 'Eigene Ergänzung', eltern: 'Eigene Ergänzung', beobachtung: 'Eigene Ergänzung', familie: 'Eigene Ergänzung', vorgeschichte: 'Eigene Ergänzung', aktuell: 'Eigene Ergänzung'
    },
    tab: { zeitraum: 'Zeitraum', klasse: 'Klasse', massnahme: 'Maßnahme', akteur: 'Akteur', datum: 'Datum', art: 'Art der Intervention' },
    opt: {
      arbeitszeit: { vollzeit: 'Vollzeit', teilzeit: 'Teilzeit', nicht: 'nicht berufstätig' },
      interventionen: { klassenbeobachtung: 'Klassenbeobachtung', kontakt_eltern: 'Kontakt mit Erziehungsberechtigten', kontakt_schule: 'Kontakt mit der Herkunftsschule', kontakt_extern: 'Kontakt mit externem Fachpersonal', kontakt_schueler: 'Kontakt mit dem Kind' },
      auftraggeber: { andere: 'andere' }
    }
  },
  fr: {
    nav: 'Rapport DS', titel: 'Diagnostic spécialisé (DS)',
    untertitel: 'Cliquez-vous à travers les étapes – le rapport se rédige au fur et à mesure.',
    zurueck: '← Retour', weiter: 'Suivant →', zurVorschau: 'Vers l’aperçu →',
    bewertet: '{n} sur {m} évalués', keineAngabe: 'Effacer l’évaluation',
    tipp: 'Astuce : cliquez sur un énoncé et évaluez-le avec les touches 1 à 7. 0 efface, ↑/↓ change d’énoncé.',
    skala: {
      std: ['pas du tout', 'en partie', 'tout à fait'],
      deutlich: ['aucun indice', 'en partie', 'très net'],
      wahrscheinlich: ['peu probable', 'possible', 'très probable'],
      wichtig: ['pas nécessaire', 'utile', 'très important']
    },
    wirkung: {
      nicht: 'N’apparaît pas dans le rapport.',
      deutlich: 'Est mentionné comme indice net.', teilweise: 'Est mentionné comme indice possible.',
      haupt: 'Est mentionné comme explication la plus probable.', neben: 'Est mentionné comme explication possible.',
      braucht: 'Figure sous « a surtout besoin de … ».', profitiert: 'Figure sous « bénéficierait en outre de … ».',
      ohne: 'Figure dans l’énumération « aucun signe de … ».'
    },
    vorschau: 'Ce qui figurera dans le rapport', vorschauLeer: 'Pas encore de texte. Dès que vous saisissez des informations, le rapport apparaît ici.',
    sprache: 'Langue du rapport', spracheFehlt: 'Cette langue n’est pas encore disponible.',
    frei: 'Complément personnel', freiHinweis: 'Apparaît comme paragraphe séparé, tel quel (pas de traduction).',
    zeileHinzu: '+ Ligne', entfernen: 'Supprimer', beobHinzu: '+ Observation',
    stammBearbeiten: 'Modifier les données de base', zumEldib: 'Vers l’évaluation ELDiB',
    eldibLeer: 'Aucune évaluation ELDiB pour l’instant. Les résultats et objectifs sont repris automatiquement dès que des items sont évalués dans « Évaluation ELDiB ».',
    eldibStufe: 'Stade {s}', eldibErreicht: '{n} atteints', eldibZiele: '{n} objectifs', eldibKeineStufe: 'pas encore de stade',
    eldibFrei: 'Complément au domaine {b}',
    alter: '{j} ans', jahreMonate: '{j} ans {m} mois',
    ja: 'oui', nein: 'non', bitteWaehlen: '– veuillez choisir –', anderes: 'Autre …',
    fertigTitel: 'Rapport final', pruefen: 'À vérifier avant l’export', allesDa: 'Toutes les informations importantes sont présentes.', trotzdem: 'Exporter quand même ?',
    fehlt: { geschlecht: 'Sexe manquant (étape 1)', name: 'Nom de l’élève manquant (données de base)', geburt: 'Date de naissance manquante (données de base)', verfasser: 'Auteur·e manquant·e (étape 1)', auftrag: 'Date du mandat manquante (étape 2)', eldib: 'Pas d’évaluation ELDiB', cni: 'Aucune recommandation à la CNI (étape 13)' },
    word: 'Télécharger Word', drucken: 'PDF / Imprimer',
    bearbeiten: 'Modifier le texte', uebernehmen: 'Appliquer', abbrechen: 'Annuler', zuruecksetzen: 'Rétablir le texte automatique',
    bearbeitetMarke: 'modifié à la main', veraltet: 'Les données ont changé depuis votre modification. Vérifiez le texte ou rétablissez le texte automatique.',
    editHinweis: 'Ligne vide = nouveau paragraphe · « • » en début de ligne = puce · « ### » = intertitre · Ne supprimez pas [Tableau] si le tableau doit rester.',
    tabelleMarke: '[Tableau]', rasterHinweis: 'La grille ELDiB complète est insérée dans le document Word.',
    wordFehlt: 'L’export Word est en cours d’intégration.',
    deckblatt: 'Page de garde',
    l: {
      geschlecht: 'Sexe (pour la grammaire du rapport)', m: 'garçon', w: 'fille',
      verfasser_name: 'Auteur·e du rapport', verfasser_funktion: 'Fonction', bericht_datum: 'Date du rapport',
      auftrag_datum: 'Date du mandat', auftraggeber: 'Mandant', auftraggeber_andere: 'Autre mandant',
      anlass: 'Motif de la demande', anlass_andere: 'Autre motif (vos mots)', anlass_details: 'Particularités concrètes selon la demande (document CI)',
      anliegen: 'Objectif de la demande', empfohlen: 'Demande sur recommandation de',
      schwangerschaft: 'Grossesse', schwangerschaft_details: 'Quelles complications ?', geburt: 'Naissance', geburt_details: 'Quelles complications ?',
      motorik: 'Développement moteur', motorik_details: 'Détails (facultatif)', sprache: 'Développement du langage', erste_worte: 'Premiers mots (mois)', sprache_details: 'Détails (facultatif)',
      diagnosen: 'Diagnostics connus', diagnosen_details: 'Quand, par qui ?', diagnose_andere: 'Autre diagnostic', keine_diagnosen: 'Aucun diagnostic n’a été posé',
      tab_vorgeschichte: 'Mesures de soutien antérieures (trois dernières années)', tab_aktuell: 'Mesures de soutien actuelles (3.1)', tab_interventionen: 'Interventions du CDSE (annexe 6.1)',
      familienstand: 'Situation familiale des parents', lebt_bei: 'L’enfant vit …', kontakt: 'Contact avec les parents', kontakt_details: 'Détails sur le contact / droit de visite',
      geschwister_anzahl: 'Nombre de frères et sœurs', geschwister_position: 'Rang dans la fratrie', sprachen: 'Langues parlées en famille', sprache_andere: 'Autre langue',
      beruf_mutter: 'Profession de la mère', zeit_mutter: 'Temps de travail de la mère', beruf_vater: 'Profession du père', zeit_vater: 'Temps de travail du père',
      ereignisse: 'Événements marquants', ereignis_details: 'Quand ? Détails', betreuung: 'Accueil en dehors de l’école', freizeit: 'Loisirs (une phrase, facultatif)',
      klasse: 'Classe', schule_name: 'École', lehrperson: 'Enseignant·e (nom)', eseb_referenz: 'Personne de référence ESEB',
      schule_quelle: 'Entretien avec', schule_datum: 'Date de l’entretien', kind_datum: 'Date de l’entretien avec l’élève', vertrauensperson: 'Personne de confiance à l’école (facultatif)',
      eltern_quelle: 'Entretien avec', eltern_datum: 'Date de l’entretien avec les parents',
      verfahren: 'Procédures utilisées', verfahren_andere: 'Autres procédures', verfahren_ort: 'Lieu des observations et entretiens (facultatif)',
      beobachtungen: 'Observations', b_datum: 'Date', b_setting: 'Situation', b_dauer: 'Durée (min.)',
      abwehr: 'Complément sur les angoisses et défenses (facultatif)', deutung: 'Autre interprétation (facultatif)',
      ressourcen: 'Ressources de l’élève', beduerfnisse: 'Complément (facultatif)',
      abgestimmt: 'Les recommandations ont-elles été concertées avec la famille ?', vorbehalte: 'Quelles réserves ?',
      ziele_bis: 'Objectifs valables jusqu’au (facultatif)', ziele_zusatz: 'Autres objectifs (un par ligne)',
      empf_familie: 'Recommandations – contexte familial', empf_schule: 'Recommandations – contexte scolaire (local)', empf_region: 'Recommandations – contexte régional (ESEB / CDSE)',
      empfehlung_familie: 'Autres recommandations (une par ligne)', empfehlung_schule: 'Autres recommandations (une par ligne)', empfehlung_region: 'Autres recommandations (une par ligne)',
      cni: 'Recommandation à la CNI (cochée sur la page de garde)', cni_begruendung: 'Justification (facultatif)',
      schule: 'Complément personnel', kind: 'Complément personnel', eltern: 'Complément personnel', beobachtung: 'Complément personnel', familie: 'Complément personnel', vorgeschichte: 'Complément personnel', aktuell: 'Complément personnel'
    },
    tab: { zeitraum: 'Période', klasse: 'Classe', massnahme: 'Intervention', akteur: 'Acteur', datum: 'Date', art: 'Type d’intervention' },
    opt: {
      arbeitszeit: { vollzeit: 'temps plein', teilzeit: 'temps partiel', nicht: 'sans activité professionnelle' },
      interventionen: { klassenbeobachtung: 'Observation en classe', kontakt_eltern: 'Contact avec les parents/tuteurs', kontakt_schule: 'Contact avec l’école d’origine', kontakt_extern: 'Contact avec des spécialistes', kontakt_schueler: 'Contact avec l’élève' },
      auftraggeber: { andere: 'autre' }
    }
  },
  en: {
    nav: 'DS report', titel: 'Specialized Diagnostic Assessment (DS)',
    untertitel: 'Click your way through – the report writes itself as you go.',
    zurueck: '← Back', weiter: 'Next →', zurVorschau: 'To the preview →',
    bewertet: '{n} of {m} rated', keineAngabe: 'Clear rating',
    tipp: 'Tip: click a statement and rate it with the keys 1–7. 0 clears, ↑/↓ moves between statements.',
    skala: {
      std: ['not at all true', 'partly', 'completely true'],
      deutlich: ['no indication', 'partly', 'very clear'],
      wahrscheinlich: ['unlikely', 'possible', 'very likely'],
      wichtig: ['not needed', 'helpful', 'very important']
    },
    wirkung: {
      nicht: 'Not mentioned in the report.',
      deutlich: 'Mentioned as a clear indication.', teilweise: 'Mentioned as a possible indication.',
      haupt: 'Mentioned as the most likely explanation.', neben: 'Mentioned as a possible further explanation.',
      braucht: 'Listed under “needs above all …”.', profitiert: 'Listed under “also benefits from …”.',
      ohne: 'Listed in “no indications of …”.'
    },
    vorschau: 'How it reads in the report', vorschauLeer: 'No text yet. As soon as you enter information, the report appears here.',
    sprache: 'Report language', spracheFehlt: 'This language is not available yet.',
    frei: 'Own addition', freiHinweis: 'Appears as a separate paragraph, exactly as written (not translated).',
    zeileHinzu: '+ Row', entfernen: 'Remove', beobHinzu: '+ Observation',
    stammBearbeiten: 'Edit basic data', zumEldib: 'To the ELDiB assessment',
    eldibLeer: 'There is no ELDiB assessment yet. Results and goals are taken over automatically as soon as items are rated in “ELDiB assessment”.',
    eldibStufe: 'Stage {s}', eldibErreicht: '{n} mastered', eldibZiele: '{n} goals', eldibKeineStufe: 'no stage yet',
    eldibFrei: 'Addition for {b}',
    alter: '{j} years', jahreMonate: '{j} years {m} months',
    ja: 'yes', nein: 'no', bitteWaehlen: '– please choose –', anderes: 'Other …',
    fertigTitel: 'Final report', pruefen: 'Check before exporting', allesDa: 'All important information is present.', trotzdem: 'Export anyway?',
    fehlt: { geschlecht: 'Gender missing (step 1)', name: 'Student’s name missing (basic data)', geburt: 'Date of birth missing (basic data)', verfasser: 'Author missing (step 1)', auftrag: 'Referral date missing (step 2)', eldib: 'No ELDiB assessment', cni: 'No recommendation to the CNI selected (step 13)' },
    word: 'Download Word', drucken: 'PDF / Print',
    bearbeiten: 'Edit text', uebernehmen: 'Apply', abbrechen: 'Cancel', zuruecksetzen: 'Restore automatic text',
    bearbeitetMarke: 'edited by hand', veraltet: 'The information has changed since you edited this text. Check it or restore the automatic text.',
    editHinweis: 'Empty line = new paragraph · “• ” at the start of a line = bullet · “### ” = subheading · Do not delete [Table] if the table should stay.',
    tabelleMarke: '[Table]', rasterHinweis: 'The complete ELDiB grid is inserted into the Word document.',
    wordFehlt: 'The Word export is being added.',
    deckblatt: 'Cover page',
    l: {
      geschlecht: 'Gender (for the grammar of the report)', m: 'boy', w: 'girl',
      verfasser_name: 'Author of the report', verfasser_funktion: 'Position', bericht_datum: 'Date of the report',
      auftrag_datum: 'Date of referral', auftraggeber: 'Referred by', auftraggeber_andere: 'Other referrer',
      anlass: 'Reason for referral', anlass_andere: 'Further reason (own words)', anlass_details: 'Concrete concerns according to the referral (CI document)',
      anliegen: 'Aim of the referral', empfohlen: 'Referral recommended by',
      schwangerschaft: 'Pregnancy', schwangerschaft_details: 'Which complications?', geburt: 'Birth', geburt_details: 'Which complications?',
      motorik: 'Motor development', motorik_details: 'Details (optional)', sprache: 'Language development', erste_worte: 'First words (months)', sprache_details: 'Details (optional)',
      diagnosen: 'Known diagnoses', diagnosen_details: 'When, by whom?', diagnose_andere: 'Other diagnosis', keine_diagnosen: 'No diagnoses have been made',
      tab_vorgeschichte: 'Previous support measures (last three years)', tab_aktuell: 'Current support measures (3.1)', tab_interventionen: 'CDSE interventions (appendix 6.1)',
      familienstand: 'Parents’ family status', lebt_bei: 'The child lives …', kontakt: 'Contact with the parents', kontakt_details: 'Details on contact / visiting rights',
      geschwister_anzahl: 'Number of siblings', geschwister_position: 'Position among siblings', sprachen: 'Languages spoken in the family', sprache_andere: 'Other language',
      beruf_mutter: 'Mother’s occupation', zeit_mutter: 'Mother’s working hours', beruf_vater: 'Father’s occupation', zeit_vater: 'Father’s working hours',
      ereignisse: 'Stressful life events', ereignis_details: 'When? Details', betreuung: 'Care outside school', freizeit: 'Leisure (one sentence, optional)',
      klasse: 'Class', schule_name: 'School', lehrperson: 'Teacher (name)', eseb_referenz: 'ESEB contact person',
      schule_quelle: 'Interview with', schule_datum: 'Date of the interview', kind_datum: 'Date of the interview with the student', vertrauensperson: 'Trusted person at school (optional)',
      eltern_quelle: 'Interview with', eltern_datum: 'Date of the parent interview',
      verfahren: 'Procedures used', verfahren_andere: 'Further procedures', verfahren_ort: 'Place of observations and interviews (optional)',
      beobachtungen: 'Observations', b_datum: 'Date', b_setting: 'Setting', b_dauer: 'Duration (min.)',
      abwehr: 'Addition on anxieties and defenses (optional)', deutung: 'Further interpretation (optional)',
      ressourcen: 'The student’s resources', beduerfnisse: 'Addition (optional)',
      abgestimmt: 'Were the recommendations agreed with the family?', vorbehalte: 'Which reservations?',
      ziele_bis: 'Goals valid until (optional)', ziele_zusatz: 'Further goals (one per line)',
      empf_familie: 'Recommendations – family context', empf_schule: 'Recommendations – school context (local)', empf_region: 'Recommendations – regional context (ESEB / CDSE)',
      empfehlung_familie: 'Further recommendations (one per line)', empfehlung_schule: 'Further recommendations (one per line)', empfehlung_region: 'Further recommendations (one per line)',
      cni: 'Recommendation to the CNI (ticked on the cover page)', cni_begruendung: 'Justification (optional)',
      schule: 'Own addition', kind: 'Own addition', eltern: 'Own addition', beobachtung: 'Own addition', familie: 'Own addition', vorgeschichte: 'Own addition', aktuell: 'Own addition'
    },
    tab: { zeitraum: 'Period', klasse: 'Class', massnahme: 'Measure', akteur: 'Provider', datum: 'Date', art: 'Type of intervention' },
    opt: {
      arbeitszeit: { vollzeit: 'full-time', teilzeit: 'part-time', nicht: 'not employed' },
      interventionen: { klassenbeobachtung: 'Classroom observation', kontakt_eltern: 'Contact with parents/guardians', kontakt_schule: 'Contact with the home school', kontakt_extern: 'Contact with external professionals', kontakt_schueler: 'Contact with the student' },
      auftraggeber: { andere: 'other' }
    }
  }
};

// Gliederung des Berichts (CNI-Vorlage vom 12.11.2025); Titel mit [m, w, ohne Angabe] je nach Geschlecht
const DS_GLIEDERUNG = [
  { id: 'auftrag', nr: '1', e: 1 }, { id: 'anamnese', nr: '2', e: 1, nurTitel: true },
  { id: 'vorgeschichte', nr: '2.1', e: 2 }, { id: 'sozialbericht', nr: '2.2', e: 2 },
  { id: 'aktuell', nr: '3', e: 1 }, { id: 'massnahmen', nr: '3.1', e: 2 },
  { id: 'schule', nr: '3.2', e: 2 }, { id: 'kind', nr: '3.3', e: 2 }, { id: 'eltern', nr: '3.4', e: 2 },
  { id: 'verfahren', nr: '4', e: 1 }, { id: 'beobachtung', nr: '4.1', e: 2 }, { id: 'eldib', nr: '4.2', e: 2 }, { id: 'deutung', nr: '4.3', e: 2 },
  { id: 'schluss', nr: '5', e: 1 }, { id: 'beduerfnisse', nr: '5.1', e: 2 }, { id: 'ziele', nr: '5.2', e: 2 }, { id: 'empfehlungen', nr: '5.3', e: 2 }, { id: 'cni', nr: '5.4', e: 2 },
  { id: 'anhang', nr: '6', e: 1, nurTitel: true }, { id: 'interventionen', nr: '6.1', e: 2 }, { id: 'raster', nr: '6.2', e: 2 }, { id: 'produktionen', nr: '6.3', e: 2, nurTitel: true }
];
const DS_TITEL = {
  de: { auftrag: 'Auftragsklärung', anamnese: 'Anamnese', vorgeschichte: 'Vorgeschichte', sozialbericht: 'Sozialbericht', aktuell: 'Aktuelle Situation',
    massnahmen: 'Aktuelle schulische und außerschulische Unterstützungsmaßnahmen', schule: 'Sichtweise der Schule', kind: ['Sichtweise des Schülers', 'Sichtweise der Schülerin', 'Sichtweise des Schülers/der Schülerin'],
    eltern: 'Sichtweise der Eltern / Erziehungsberechtigten', verfahren: 'Diagnostische Verfahren', beobachtung: 'Verhaltensbeobachtungen', eldib: 'Ergebnisse der Testverfahren',
    deutung: 'Interpretation', schluss: 'Schlussfolgerung', beduerfnisse: ['Spezifische Bedürfnisse des Schülers', 'Spezifische Bedürfnisse der Schülerin', 'Spezifische Bedürfnisse des Schülers/der Schülerin'], ziele: 'Ziele',
    empfehlungen: 'Empfehlungen', cni: 'Empfehlungen – CNI', anhang: 'Anhänge', interventionen: 'Übersicht der Interventionen des CDSE', raster: 'Testergebnisse',
    produktionen: ['Produktionen des Schülers', 'Produktionen der Schülerin', 'Produktionen des Schülers/der Schülerin'] },
  fr: { auftrag: 'Demande', anamnese: 'Anamnèse', vorgeschichte: 'Antécédents', sozialbericht: 'Bilan social', aktuell: 'Situation actuelle',
    massnahmen: 'Mesures de soutien scolaires et extrascolaires actuelles', schule: 'Point de vue de l’école', kind: 'Point de vue de l’élève',
    eltern: 'Point de vue des parents / tuteurs', verfahren: 'Procédure diagnostique', beobachtung: 'Observations comportementales', eldib: 'Résultats des tests',
    deutung: 'Interprétations', schluss: 'Conclusion', beduerfnisse: 'Besoins spécifiques de l’élève', ziele: 'Objectifs', empfehlungen: 'Recommandations',
    cni: 'Recommandations – CNI', anhang: 'Annexes', interventionen: 'Aperçu des interventions du CDSE', raster: 'Résultats détaillés aux tests', produktionen: 'Productions de l’élève' },
  en: { auftrag: 'Referral', anamnese: 'Case history', vorgeschichte: 'Background', sozialbericht: 'Social report', aktuell: 'Current situation',
    massnahmen: 'Current school and out-of-school support measures', schule: 'The school’s perspective', kind: 'The student’s perspective',
    eltern: 'The parents’/guardians’ perspective', verfahren: 'Diagnostic procedures', beobachtung: 'Behavioral observations', eldib: 'Test results',
    deutung: 'Interpretation', schluss: 'Conclusion', beduerfnisse: 'The student’s specific needs', ziele: 'Goals', empfehlungen: 'Recommendations',
    cni: 'Recommendations – CNI', anhang: 'Appendices', interventionen: 'Overview of CDSE interventions', raster: 'Detailed test results', produktionen: 'The student’s work samples' }
};
// Deckblatt
const DS_DECKBLATT = {
  de: { titel: 'Spezialisierte Diagnostik', unter: 'des Zentrums für sozio-emotionale Entwicklung (CDSE)', name: ['Name des Schülers', 'Name der Schülerin', 'Name des/der Schüler:in'], matricule: 'Sozialversicherungsnummer',
    alter: 'Alter', schule: 'Schule', klasse: 'Klasse', sprachen: 'Sprachen', empfehlungen: 'Empfehlungen des CDSE', unterschrift: 'Unité de diagnostic, de conseil et de suivi',
    cni: { diag_kompetenzzentrum: 'Spezialisierte Diagnostik in Zusammenarbeit mit einem Kompetenzzentrum', beratung_eltern: ['Beratung und Begleitung der Eltern und des betroffenen Schülers', 'Beratung und Begleitung der Eltern und der betroffenen Schülerin', 'Beratung und Begleitung der Eltern und des/der betroffenen Schülers/-in'],
      beratung_fachleute: 'Beratung und Begleitung der Fachleute', lernwerkstatt: 'Spezialisierte Lernwerkstatt', isa: 'Spezialisierte ambulante Intervention (ISA)', beschulung: 'Spezialisierte Beschulung im CDSE',
      clapa: 'Classe de Participation', cst: 'Centre socio-thérapeutique (CST)', annexe: 'Annexe Junglinster', ausland: 'Spezialisierte Beschulung im Ausland', rehabilitation: 'Rehabilitation',
      abschluss: 'Abschluss der Aktivitäten des CDSE', schliessung: 'Schließung der Akte im CDSE' } },
  fr: { titel: 'Diagnostic spécialisé', unter: 'du centre pour le développement socio-émotionnel (CDSE)', name: 'Nom et prénom de l’élève', matricule: 'Matricule',
    alter: 'Âge', schule: 'École', klasse: 'Classe', sprachen: 'Langues', empfehlungen: 'Proposition du CDSE', unterschrift: 'Unité de diagnostic, de conseil et de suivi',
    cni: { diag_kompetenzzentrum: 'Diagnostic spécialisé en collaboration avec un Centre de compétence', beratung_eltern: 'Conseil et guidance des parents et de l’élève',
      beratung_fachleute: 'Conseil et guidance des professionnels', lernwerkstatt: 'Atelier d’apprentissage spécifique', isa: 'Intervention spécialisée ambulatoire (ISA)', beschulung: 'Scolarisation spécialisée au CDSE',
      clapa: 'Classe de Participation', cst: 'Centre socio-thérapeutique (CST)', annexe: 'Annexe Junglinster', ausland: 'Scolarisation spécialisée à l’étranger', rehabilitation: 'Rééducation',
      abschluss: 'Fin de la prise en charge', schliessung: 'Clôture du dossier au CDSE' } },
  en: { titel: 'Specialized Diagnostic Assessment', unter: 'of the Centre pour le développement socio-émotionnel (CDSE)', name: 'Student’s name', matricule: 'Social security number',
    alter: 'Age', schule: 'School', klasse: 'Class', sprachen: 'Languages', empfehlungen: 'CDSE recommendations', unterschrift: 'Unité de diagnostic, de conseil et de suivi',
    cni: { diag_kompetenzzentrum: 'Specialized diagnostic assessment in cooperation with a competence center', beratung_eltern: 'Counseling and guidance for the parents and the student',
      beratung_fachleute: 'Counseling and guidance for professionals', lernwerkstatt: 'Specialized learning workshop (Atelier d’apprentissage spécifique)', isa: 'Specialized ambulatory intervention (ISA)', beschulung: 'Specialized schooling at the CDSE',
      clapa: 'Classe de Participation', cst: 'Centre socio-thérapeutique (CST)', annexe: 'Annexe Junglinster', ausland: 'Specialized schooling abroad', rehabilitation: 'Rehabilitation',
      abschluss: 'End of CDSE support', schliessung: 'Closure of the CDSE file' } }
};
// Richtziele der Entwicklungsstufen (DE/FR wie im ELDiB-Raster der CNI-Vorlage, EN nach DTORF-R)
const DS_RICHTZIEL = {
  de: ['', 'Auf die Umwelt mit Freude reagieren', 'Auf die Umwelt mit Erfolg reagieren', 'Fähigkeiten zur erfolgreichen Gruppenteilnahme erwerben', 'Sich in Gruppenprozesse einbringen', 'Individuelle/gruppenbezogene Fähigkeiten in neuen Situationen anwenden'],
  fr: ['', 'Réagir avec joie à l’environnement', 'Réagir avec succès face à l’environnement', 'Acquérir des compétences pour collaborer en groupe', 'Contribuer au succès du groupe par l’effort individuel', 'Recourir aux habiletés individuelles et collectives dans des situations nouvelles'],
  en: ['', 'Responding to the environment with pleasure', 'Responding to the environment with success', 'Learning skills for successful group participation', 'Investing in group processes', 'Applying individual/group skills in new situations']
};
const DS_STUFEN_ALTER = { 1: [0, 2], 2: [2, 5], 3: [6, 9], 4: [10, 12], 5: [13, 16] };

// ---------- Schritte des Assistenten ----------
// Feldtypen: wahl, datum, zahl, kurz, lang, chips, haken, geschlecht, quelle,
// aussagen, tabelle, beob, eldib, stamm, reihe (mehrere Felder nebeneinander)
const DS_SCHRITTE = [
  { id: 'stamm', abschnitte: [], felder: [
    { typ: 'stamm' }, { typ: 'geschlecht' },
    { typ: 'reihe', felder: [{ typ: 'kurz', f: 'verfasser_name' }, { typ: 'kurz', f: 'verfasser_funktion' }, { typ: 'datum', f: 'bericht_datum' }] }] },
  { id: 'auftrag', abschnitte: ['auftrag'], felder: [
    { typ: 'reihe', felder: [{ typ: 'datum', f: 'auftrag_datum' }, { typ: 'wahl', f: 'auftraggeber', opt: 'auftraggeber', andere: 'auftraggeber_andere' }] },
    { typ: 'chips', g: 'anlass' }, { typ: 'kurz', frei: 'anlass_andere' }, { typ: 'lang', frei: 'anlass_details' },
    { typ: 'chips', g: 'anliegen' }, { typ: 'chips', g: 'empfohlen' }] },
  { id: 'vorgeschichte', abschnitte: ['vorgeschichte'], felder: [
    { typ: 'reihe', felder: [{ typ: 'wahl', f: 'schwangerschaft', opt: 'verlauf' }, { typ: 'kurz', frei: 'schwangerschaft_details', wenn: ['schwangerschaft', 'komplikationen'] }] },
    { typ: 'reihe', felder: [{ typ: 'wahl', f: 'geburt', opt: 'verlauf' }, { typ: 'kurz', frei: 'geburt_details', wenn: ['geburt', 'komplikationen'] }] },
    { typ: 'reihe', felder: [{ typ: 'wahl', f: 'motorik', opt: 'entwicklung' }, { typ: 'kurz', frei: 'motorik_details' }] },
    { typ: 'reihe', felder: [{ typ: 'wahl', f: 'sprache', opt: 'entwicklung' }, { typ: 'zahl', f: 'erste_worte' }, { typ: 'kurz', frei: 'sprache_details' }] },
    { typ: 'chips', g: 'diagnosen', details: 'diagnosen_details', andere: 'diagnose_andere' }, { typ: 'haken', f: 'keine_diagnosen' },
    { typ: 'tabelle', t: 'vorgeschichte' }, { typ: 'lang', frei: 'vorgeschichte', frei2: true }] },
  { id: 'familie', abschnitte: ['sozialbericht'], felder: [
    { typ: 'reihe', felder: [{ typ: 'wahl', f: 'familienstand', opt: 'familienstand' }, { typ: 'wahl', f: 'lebt_bei', opt: 'lebt_bei' }] },
    { typ: 'reihe', felder: [{ typ: 'wahl', f: 'kontakt', opt: 'kontakt' }, { typ: 'kurz', frei: 'kontakt_details' }] },
    { typ: 'reihe', felder: [{ typ: 'zahl', f: 'geschwister_anzahl' }, { typ: 'wahl', f: 'geschwister_position', opt: 'position' }] },
    { typ: 'chips', g: 'sprachen', andere: 'sprache_andere' },
    { typ: 'reihe', felder: [{ typ: 'kurz', frei: 'beruf_mutter' }, { typ: 'wahl', f: 'zeit_mutter', opt: 'arbeitszeit' }] },
    { typ: 'reihe', felder: [{ typ: 'kurz', frei: 'beruf_vater' }, { typ: 'wahl', f: 'zeit_vater', opt: 'arbeitszeit' }] },
    { typ: 'chips', g: 'ereignisse', details: 'ereignis_details' }, { typ: 'chips', g: 'betreuung' },
    { typ: 'kurz', frei: 'freizeit' }, { typ: 'lang', frei: 'familie', frei2: true }] },
  { id: 'aktuell', abschnitte: ['aktuell', 'massnahmen'], felder: [
    { typ: 'reihe', felder: [{ typ: 'kurz', f: 'klasse', stamm: 'klasse' }, { typ: 'kurz', f: 'schule_name', stamm: 'foerderort' }] },
    { typ: 'reihe', felder: [{ typ: 'kurz', frei: 'lehrperson' }, { typ: 'kurz', frei: 'eseb_referenz' }] },
    { typ: 'lang', frei: 'aktuell', frei2: true },
    { typ: 'tabelle', t: 'aktuell' }] },
  { id: 'schule', abschnitte: ['schule'], felder: [
    { typ: 'reihe', felder: [{ typ: 'quelle', f: 'schule_quelle', art: 'schule' }, { typ: 'datum', f: 'schule_datum' }] },
    { typ: 'chips', g: 's_staerken' }, { typ: 'aussagen', bereich: 'schule' },
    { typ: 'chips', g: 's_hilft' }, { typ: 'chips', g: 's_erwartung' }, { typ: 'lang', frei: 'schule', frei2: true }] },
  { id: 'kind', abschnitte: ['kind'], felder: [
    { typ: 'datum', f: 'kind_datum' }, { typ: 'aussagen', bereich: 'kind' },
    { typ: 'chips', g: 'k_interessen' }, { typ: 'chips', g: 'k_wuensche' }, { typ: 'kurz', frei: 'vertrauensperson' }, { typ: 'lang', frei: 'kind', frei2: true }] },
  { id: 'eltern', abschnitte: ['eltern'], felder: [
    { typ: 'reihe', felder: [{ typ: 'quelle', f: 'eltern_quelle', art: 'eltern' }, { typ: 'datum', f: 'eltern_datum' }] },
    { typ: 'chips', g: 'e_staerken' }, { typ: 'aussagen', bereich: 'eltern' }, { typ: 'chips', g: 'e_erwartung' }, { typ: 'lang', frei: 'eltern', frei2: true }] },
  { id: 'beobachtung', abschnitte: ['verfahren', 'beobachtung'], felder: [
    { typ: 'chips', g: 'verfahren' }, { typ: 'reihe', felder: [{ typ: 'kurz', frei: 'verfahren_andere' }, { typ: 'kurz', frei: 'verfahren_ort' }] },
    { typ: 'beob' }, { typ: 'aussagen', bereich: 'beobachtung' }, { typ: 'lang', frei: 'beobachtung', frei2: true }] },
  { id: 'eldib', abschnitte: ['eldib'], felder: [{ typ: 'eldib' }] },
  { id: 'deutung', abschnitte: ['deutung'], felder: [
    { typ: 'aussagen', bereich: 'deutung' }, { typ: 'lang', frei: 'abwehr' }, { typ: 'lang', frei: 'deutung' }] },
  { id: 'beduerfnisse', abschnitte: ['beduerfnisse'], felder: [
    { typ: 'aussagen', bereich: 'beduerfnisse' }, { typ: 'chips', g: 'ressourcen' }, { typ: 'lang', frei: 'beduerfnisse' }] },
  { id: 'empfehlungen', abschnitte: ['schluss', 'ziele', 'empfehlungen', 'cni', 'interventionen'], felder: [
    { typ: 'wahl', f: 'abgestimmt', opt: 'abgestimmt' }, { typ: 'lang', frei: 'vorbehalte', wenn: ['abgestimmt', 'vorbehalte'] },
    { typ: 'reihe', felder: [{ typ: 'datum', f: 'ziele_bis' }] }, { typ: 'lang', frei: 'ziele_zusatz' },
    { typ: 'chips', g: 'empf_familie' }, { typ: 'lang', frei: 'empfehlung_familie', klein: true },
    { typ: 'chips', g: 'empf_schule' }, { typ: 'lang', frei: 'empfehlung_schule', klein: true },
    { typ: 'chips', g: 'empf_region' }, { typ: 'lang', frei: 'empfehlung_region', klein: true },
    { typ: 'chips', g: 'cni' }, { typ: 'lang', frei: 'cni_begruendung' },
    { typ: 'tabelle', t: 'interventionen' }] },
  { id: 'vorschau', abschnitte: null, felder: [] }
];
const DS_TABELLEN = {
  vorgeschichte: ['zeitraum', 'klasse', 'massnahme', 'akteur'],
  aktuell: ['zeitraum', 'klasse', 'massnahme', 'akteur'],
  interventionen: ['datum', 'art']
};
// Welche Skala gilt für welches Thema
const DS_SKALA_THEMA = { 'deutung.aengste': 'deutlich', 'deutung.abwehr': 'deutlich', 'deutung.hypothesen': 'wahrscheinlich', 'beduerfnisse.beduerfnisse': 'wichtig' };

const DsAssistent = (function () {
  'use strict';
  let daten = leer();
  let schritt = 'stamm';
  let berichtSprache = null;     // null = Sprache der App
  let bearbeiteAbschnitt = null; // Abschnitt, der gerade von Hand bearbeitet wird
  let wurzel = null;
  let zeitVorschau = null, zeitSpeichern = null;

  function leer() { return { v: 2, geschlecht: '', bewertungen: {}, chips: {}, f: {}, frei: {}, tabellen: { vorgeschichte: [], aktuell: [], interventionen: [] }, bearbeitet: {} }; }
  function appSprache() { return (typeof state !== 'undefined' && state.language) || 'de'; }
  function U() { return DS_UI[appSprache()] || DS_UI.de; }
  function T(lang) { return DS_TEXTE[lang || appSprache()] || DS_TEXTE.de; }
  function berichtLang() {
    const l = berichtSprache || appSprache();
    return DS_TEXTE[l] ? l : 'de';
  }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function fmt(s, v) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }); }
  function stamm() { return (typeof getStammdaten === 'function') ? getStammdaten() : {}; }
  function label(key) { const u = U(); return (u.l && u.l[key]) || (DS_UI.de.l[key]) || key; }

  // ---------- Laden, Speichern, Übernahme alter Daten ----------
  function normalisiere(d) {
    const n = leer();
    if (!d || typeof d !== 'object') { return n; }
    n.geschlecht = d.geschlecht === 'w' || d.geschlecht === 'm' ? d.geschlecht : '';
    ['bewertungen', 'chips', 'f', 'frei', 'bearbeitet'].forEach(function (k) { if (d[k] && typeof d[k] === 'object') { n[k] = d[k]; } });
    if (d.tabellen && typeof d.tabellen === 'object') { Object.keys(DS_TABELLEN).forEach(function (k) { n.tabellen[k] = Array.isArray(d.tabellen[k]) ? d.tabellen[k] : []; }); }
    if (d.alt) { n.alt = d.alt; }
    return n;
  }
  // Übernimmt, was sich aus dem früheren DS-Formular eindeutig zuordnen lässt;
  // alles andere bleibt unter "alt" erhalten.
  function uebernehmeAlt(a) {
    const n = leer();
    if (!a || typeof a !== 'object' || !Object.keys(a).length) { return n; }
    n.alt = a;
    const cb = a.checkboxes || {};
    const setF = function (k, v) { if (v != null && v !== '') { n.f[k] = v; } };
    const setFrei = function (k, v) { if (v != null && String(v).trim()) { n.frei[k] = String(v).trim(); } };
    const karte = function (werte, tab) { return (werte || []).map(function (w) { return tab[w]; }).filter(Boolean); };
    setF('auftrag_datum', a.ds_auftrag_datum); setF('auftraggeber', a.ds_auftraggeber); setFrei('auftraggeber_andere', a.ds_auftraggeber_andere);
    setFrei('anlass_details', a.ds_auffaelligkeiten); setFrei('anlass_andere', a.ds_anlass_andere_text);
    n.chips.anlass = karte(cb.ds_anlass, { verhaltensauffaelligkeiten_schule: 'verhalten_schule', verhaltensauffaelligkeiten_zuhause: 'verhalten_zuhause', emotionale_schwierigkeiten: 'emotional', soziale_schwierigkeiten: 'sozial', schulleistungsprobleme: 'leistung', aufmerksamkeit: 'aufmerksamkeit', aggressives_verhalten: 'aggression', rueckzugsverhalten: 'rueckzug', schulverweigerung: 'schulverweigerung' });
    n.chips.anliegen = karte(cb.ds_anliegen, { isa: 'isa', conseil_guidance: 'conseil', cst: 'cst', clapa: 'clapa', spezialisierte_beschulung: 'beschulung', abklaerung: 'diagnostik' });
    n.chips.empfohlen = karte(cb.ds_empfehlung, { lehrperson: 'lehrperson', eseb_fachkraft: 'eseb', schulleitung: 'schulleitung', arzt: 'arzt', psychologe: 'psychologe', eltern_empfehlung: 'eltern' });
    setF('schwangerschaft', a.ds_schwangerschaft); setF('geburt', a.ds_geburt); setF('motorik', a.ds_motorik); setF('sprache', a.ds_sprache); setF('erste_worte', a.ds_sprache_erste_worte);
    setFrei('schwangerschaft_details', a.ds_schwangerschaft_details); setFrei('geburt_details', a.ds_geburt_details); setFrei('motorik_details', a.ds_motorik_bemerkung); setFrei('sprache_details', a.ds_sprache_bemerkung);
    n.chips.diagnosen = karte(cb.ds_diagnose, { adhs: 'adhs', asd: 'ass', lernstoerung: 'lernstoerung', sprachstoerung: 'sprachstoerung', emotional: 'emotional', bindung: 'bindung', angst: 'angst', opposition: 'opposition', andere_diagnose: 'andere' });
    setFrei('diagnose_andere', a.ds_diagnose_andere_diagnose_name);
    n.f.familienstand = { verheiratet: 'zusammen', getrennt: 'getrennt', alleinerziehend_mutter: 'alleinerziehend', alleinerziehend_vater: 'alleinerziehend', patchwork: 'patchwork' }[a.ds_familienstand] || undefined;
    n.f.lebt_bei = { beide_eltern: 'beide', mutter: 'mutter', vater: 'vater', wechselmodell: 'wechsel', grosseltern: 'grosseltern', pflegefamilie: 'pflege' }[a.ds_kind_lebt_bei] || undefined;
    setF('kontakt', a.ds_besuchsrecht); setF('geschwister_anzahl', a.ds_geschwister_anzahl);
    setF('geschwister_position', a.ds_geschwister_position === 'einzelkind' ? '' : a.ds_geschwister_position);
    n.f.zeit_mutter = { vollzeit: 'vollzeit', teilzeit: 'teilzeit', nicht_berufstaetig: 'nicht' }[a.ds_arbeitszeit_mutter] || undefined;
    n.f.zeit_vater = { vollzeit: 'vollzeit', teilzeit: 'teilzeit', nicht_berufstaetig: 'nicht' }[a.ds_arbeitszeit_vater] || undefined;
    setFrei('beruf_mutter', a.ds_beruf_mutter); setFrei('beruf_vater', a.ds_beruf_vater); setFrei('freizeit', a.ds_freizeitaktivitaeten);
    n.chips.sprachen = karte(cb.ds_sprachen, { luxemburgisch: 'lb', deutsch: 'de', franzoesisch: 'fr', portugiesisch: 'pt', englisch: 'en', sprache_andere: 'andere' });
    setFrei('sprache_andere', a.ds_sprachen_andere_text);
    n.chips.ereignisse = karte(cb.ds_ereignis, { trennung: 'trennung', umzug: 'umzug', verlust: 'verlust', krankheit: 'krankheit', konflikte: 'konflikte', trauma: 'trauma' });
    n.chips.betreuung = karte(cb.ds_betreuung, { maison_relais: 'maison_relais', grosseltern: 'grosseltern', tagesmutter: 'tagesmutter', keine_betreuung: 'keine' });
    const det = {}; ['trennung', 'umzug', 'verlust', 'krankheit', 'trauma'].forEach(function (k) { if (a['ds_ereignis_' + k + '_wann']) { det[k] = a['ds_ereignis_' + k + '_wann']; } });
    if (Object.keys(det).length) { n.f.ereignis_details = det; }
    setF('klasse', a.ds_aktuelle_klasse); setFrei('lehrperson', a.ds_lehrperson); setFrei('eseb_referenz', a.ds_eseb_referenz);
    setF('schule_datum', a.ds_schule_info_datum); setF('kind_datum', a.ds_schueler_gespraech_datum); setF('eltern_datum', a.ds_eltern_gespraech_datum);
    setFrei('vertrauensperson', a.ds_schueler_vertrauensperson); setFrei('verfahren_andere', a.ds_testmethoden); setFrei('verfahren_ort', a.ds_test_ort);
    n.chips.s_hilft = karte(cb.ds_schule_hilft, { klare_ansagen: 'ansagen', wiederholungen: 'wiederholung', visualisierungen: 'visualisierung', bewegungspausen: 'bewegung', ruhige_ecke: 'rueckzugsort', einzelansprache: 'einzelansprache', lob: 'lob', vorwarnung: 'vorwarnung', kleingruppe: 'kleingruppe', naehe_lehrer: 'naehe' });
    n.chips.k_interessen = karte(cb.ds_schueler_hobbys, { sport: 'sport', gaming: 'gaming', musik: 'musik', lesen: 'lesen', kreativ: 'kreatives', freunde: 'freunde', tiere: 'tiere', natur: 'natur' });
    n.chips.ressourcen = karte(cb.ds_ressource, { intelligenz: 'kognitiv', kreativitaet: 'kreativ', sportlich: 'sportlich', kuenstlerisch: 'musisch', humor: 'humor', empathie: 'empathie', neugier: 'neugier', begeisterungsfaehig: 'begeisterung', hilfsbereit: 'hilfsbereit', verantwortung: 'verantwortung', einzelbeziehung: 'einzelbeziehung', lernbereit: 'lernbereit', vertrauensperson: 'vertrauensperson', familie_unterstuetzt: 'familie', hobby: 'hobbys', reflektiert: 'reflexion' });
    n.chips.empf_familie = karte(cb.ds_empfehlung_familie, { step: 'step', erziehungsberatung: 'erziehungsberatung', familientherapie: 'familientherapie', strukturen_zuhause: 'tagesstruktur', austausch_schule: 'austausch' });
    n.chips.empf_schule = karte(cb.ds_empfehlung_schule, { sitzplatz: 'sitzplatz', differenzierung: 'differenzierung', positives_feedback: 'verstaerker', klare_regeln: 'regeln', auszeit: 'auszeit', verstaerkerplan: 'verstaerker', iebs: 'iebs' });
    n.chips.empf_region = karte(cb.ds_empfehlung_regional, { eseb_weiter: 'eseb', isa: 'isa', conseil: 'conseil', lernwerkstatt: 'lernwerkstatt', therapeutisch: 'psychotherapie' });
    n.chips.cni = karte(cb.ds_cni_empfehlung, { diagnostik_kz: 'diag_kompetenzzentrum', beratung_eltern: 'beratung_eltern', beratung_fachleute: 'beratung_fachleute', lernwerkstatt_cni: 'lernwerkstatt', isa_cni: 'isa', beschulung_cdse: 'beschulung', clapa_cni: 'clapa', cst_cni: 'cst', annexe_junglinster: 'annexe', beschulung_ausland: 'ausland', abschluss: 'abschluss', schliessung: 'schliessung' });
    n.f.abgestimmt = { ja_einverstanden: 'ja', ja_vorbehalte: 'vorbehalte', nein: 'nein' }[a.ds_empfehlungen_abgestimmt] || undefined;
    setFrei('vorbehalte', a.ds_vorbehalte_details); setFrei('cni_begruendung', a.ds_cni_begruendung); setFrei('ziele_zusatz', a.ds_zusaetzliche_ziele);
    setF('verfasser_name', a.ds_verfasser_name); setF('verfasser_funktion', a.ds_verfasser_beruf);
    const zeile = function (m) { return { zeitraum: m.zeitraum || '', klasse: m.klasse || '', massnahme: m.art || m.massnahme || '', akteur: m.akteur || '' }; };
    n.tabellen.vorgeschichte = (a.massnahmen || []).map(zeile);
    n.tabellen.aktuell = (a.aktuelleMassnahmen || []).map(zeile);
    n.tabellen.interventionen = (a.interventionen || []).map(function (i) { return { datum: i.datum || '', art: i.art || '' }; });
    Object.keys(n.chips).forEach(function (k) { if (!n.chips[k].length) { delete n.chips[k]; } });
    Object.keys(n.f).forEach(function (k) { if (n.f[k] === undefined) { delete n.f[k]; } });
    return n;
  }
  function laden(d) {
    daten = (d && d.v === 2) ? normalisiere(d) : uebernehmeAlt(d);
    bearbeiteAbschnitt = null;
    if (sichtbar()) { rendern(); }
  }
  function get() { return daten; }
  function speichernBald() {
    clearTimeout(zeitSpeichern);
    zeitSpeichern = setTimeout(function () { if (typeof saveToLocalStorage === 'function') { saveToLocalStorage(); } }, 500);
  }

  // ---------- ELDiB-Auswertung für den Bericht ----------
  function eldibDaten(lang) {
    if (lang === 'fr' && typeof ELDIB_DATA_FR !== 'undefined') { return ELDIB_DATA_FR; }
    if (lang === 'en' && typeof ELDIB_DATA_EN !== 'undefined') { return ELDIB_DATA_EN; }
    return ELDIB_DATA;
  }
  function anzeigeCode(code, lang) { return (typeof getDisplayCode === 'function') ? getDisplayCode(code, lang) : code; }
  function profil(lang) {
    lang = lang || berichtLang();
    const D = eldibDaten(lang), sel = (typeof state !== 'undefined' && state.selections) || {};
    const bereiche = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'].map(function (id) {
      const b = D[id], er = [], zi = [];
      Object.keys(b.stufen).sort(function (x, y) { return x - y; }).forEach(function (st) {
        b.stufen[st].items.forEach(function (it) {
          const s = sel[it.code];
          if (!s) { return; }
          const e = { code: anzeigeCode(it.code, lang), intern: it.code, nr: it.nr, description: it.description, keyword: it.keyword, stufe: +st };
          if (s.status === 'erreicht') { er.push(e); } else if (s.status === 'ziel') { zi.push(e); }
        });
      });
      er.sort(function (x, y) { return x.nr - y.nr; }); zi.sort(function (x, y) { return x.nr - y.nr; });
      const hoch = er.length ? er[er.length - 1].stufe : 0;
      let alter = 0;
      if (hoch) {
        const n = b.stufen[hoch].items.length, k = er.filter(function (x) { return x.stufe === hoch; }).length, r = DS_STUFEN_ALTER[hoch];
        alter = r[0] + (r[1] - r[0]) * k / n;
      }
      return { id: id, code: anzeigeCode(ELDIB_DATA[id].code, lang), name: b.name, stufe: hoch, alter: alter, richtziel: (DS_RICHTZIEL[lang] || DS_RICHTZIEL.de)[hoch] || '', erreicht: er, ziele: zi };
    }).sort(function (x, y) { return y.alter - x.alter; });
    const j = DsText.kontext(lang, daten, stamm()).alter;
    return { bereiche: bereiche, lebensalter: j, erwarteteStufe: j == null ? null : (j <= 2 ? 1 : j <= 5 ? 2 : j <= 9 ? 3 : j <= 12 ? 4 : 5) };
  }
  // Raster für Anhang 6.2: je Bereich und Stufe die Items mit Status
  function raster() {
    const sel = (typeof state !== 'undefined' && state.selections) || {};
    return ['verhalten', 'kommunikation', 'sozialisation', 'kognition'].map(function (id) {
      const b = ELDIB_DATA[id], stufen = {};
      Object.keys(b.stufen).forEach(function (st) { stufen[st] = b.stufen[st].items.map(function (it) { return { nr: it.nr, code: it.code, status: (sel[it.code] && sel[it.code].status) || '' }; }); });
      return { id: id, code: b.code, stufen: stufen };
    });
  }

  // ---------- Bericht zusammensetzen (mit Handbearbeitung) ----------
  // [m, w, ohne Angabe] -> Form zum Geschlecht; ohne Angabe die neutrale Form (nicht einfach männlich)
  function nachGeschlecht(t) {
    if (!Array.isArray(t)) { return t; }
    return daten.geschlecht === 'w' ? t[1] : (daten.geschlecht === 'm' ? t[0] : (t[2] || t[0]));
  }
  function titel(lang, id) {
    return nachGeschlecht((DS_TITEL[lang] || DS_TITEL.de)[id]);
  }
  function roh(lang) {
    if (!DS_TEXTE[lang]) { lang = 'de'; } // Sprache noch ohne Texte: deutsch
    const ab = DsText.bericht(lang, daten, stamm(), profil(lang));
    // 3.1: Tabelle der aktuellen Maßnahmen steht in einem eigenen Unterabschnitt
    const akt = ab.aktuell || [];
    ab.aktuell = akt.filter(function (b) { return b.abschnitt !== 'massnahmen'; });
    ab.massnahmen = akt.filter(function (b) { return b.abschnitt === 'massnahmen'; });
    const U2 = DS_UI[lang] || DS_UI.de;
    const iv = (daten.tabellen.interventionen || []).filter(function (r) { return r && (r.datum || r.art); });
    ab.interventionen = iv.length ? [{ typ: 'tabelle', id: 'interventionen', kopf: [U2.tab.datum, U2.tab.art],
      zeilen: iv.map(function (r) { return [DsText.datum(r.datum, lang), U2.opt.interventionen[r.art] || r.art || '']; }) }] : [];
    ab.raster = [{ typ: 'raster' }];
    if (lang === 'fr') { apostrophe(ab); }
    return ab;
  }
  // Französisch: überall der typografische Apostroph (auch in eigenen Texten)
  function apostrophe(ab) {
    const a = function (t) { return String(t).replace(/'/g, '’'); };
    Object.keys(ab).forEach(function (k) {
      (ab[k] || []).forEach(function (b) {
        if (b.text != null) { b.text = a(b.text); }
        if (b.punkte) { b.punkte = b.punkte.map(a); }
        if (b.zeilen) { b.zeilen = b.zeilen.map(function (z) { return z.map(a); }); }
        if (b.kopf) { b.kopf = b.kopf.map(a); }
      });
    });
  }
  function bloeckeZuText(bl, lang) {
    const U2 = DS_UI[lang] || DS_UI.de;
    return bl.map(function (b) {
      if (b.typ === 'absatz') { return b.text; }
      if (b.typ === 'zwischen') { return '### ' + b.text; }
      if (b.typ === 'liste') { return b.punkte.map(function (p) { return '• ' + p; }).join('\n'); }
      if (b.typ === 'tabelle') { return U2.tabelleMarke; }
      return '';
    }).filter(Boolean).join('\n\n');
  }
  function textZuBloecke(text, auto, lang) {
    const U2 = DS_UI[lang] || DS_UI.de, tabellen = auto.filter(function (b) { return b.typ === 'tabelle'; });
    const out = [];
    String(text || '').replace(/\r/g, '').split(/\n\s*\n/).forEach(function (teil) {
      const zeilen = teil.split('\n').map(function (z) { return z.trim(); }).filter(Boolean);
      let absatz = [], punkte = [];
      const fertigAbsatz = function () { if (absatz.length) { out.push({ typ: 'absatz', text: absatz.join(' ') }); absatz = []; } };
      const fertigListe = function () { if (punkte.length) { out.push({ typ: 'liste', punkte: punkte }); punkte = []; } };
      zeilen.forEach(function (z) {
        if (z === U2.tabelleMarke || /^\[(Tabelle|Tableau|Table)\]$/.test(z)) { fertigAbsatz(); fertigListe(); if (tabellen.length) { out.push(tabellen.shift()); } return; }
        if (/^###\s*/.test(z)) { fertigAbsatz(); fertigListe(); out.push({ typ: 'zwischen', text: z.replace(/^###\s*/, '') }); return; }
        if (/^[•\-–*]\s+/.test(z)) { fertigAbsatz(); punkte.push(z.replace(/^[•\-–*]\s+/, '')); return; }
        fertigListe(); absatz.push(z);
      });
      fertigAbsatz(); fertigListe();
    });
    return out;
  }
  function hash(s) { let h = 5381; for (let i = 0; i < s.length; i++) { h = ((h << 5) + h + s.charCodeAt(i)) | 0; } return String(h >>> 0); }
  // Der fertige Bericht: { lang, deckblatt, abschnitte: [{ id, nr, e, titel, bloecke, bearbeitet, veraltet }] }
  function fertig(lang) {
    lang = lang || berichtLang();
    const ab = roh(lang), bea = (daten.bearbeitet && daten.bearbeitet[lang]) || {};
    const abschnitte = DS_GLIEDERUNG.map(function (g) {
      let bl = ab[g.id] || [];
      const e = bea[g.id];
      let veraltet = false;
      if (e && typeof e.text === 'string') {
        veraltet = e.basis !== hash(bloeckeZuText(bl, lang));
        bl = textZuBloecke(e.text, bl, lang);
      }
      return { id: g.id, nr: g.nr, e: g.e, nurTitel: !!g.nurTitel, titel: titel(lang, g.id), bloecke: bl, bearbeitet: !!e, veraltet: veraltet };
    });
    return { lang: lang, deckblatt: deckblatt(lang), abschnitte: abschnitte, raster: raster(), verfasser: { name: daten.f.verfasser_name || '', funktion: daten.f.verfasser_funktion || '' } };
  }
  function deckblatt(lang) {
    const st = stamm(), T2 = T(lang), U2 = DS_UI[lang] || DS_UI.de;
    const sp = (daten.chips.sprachen || []).map(function (k) { return k === 'andere' ? (daten.frei.sprache_andere || '') : ((T2.chips.sprachen || {})[k] || [k])[0]; }).filter(Boolean);
    let alter = '';
    if (st.geburtsdatum) {
      const g = new Date(st.geburtsdatum + 'T12:00:00'), h = new Date();
      if (!isNaN(g)) { let m = (h.getFullYear() - g.getFullYear()) * 12 + h.getMonth() - g.getMonth(); if (h.getDate() < g.getDate()) { m--; } alter = fmt(U2.jahreMonate, { j: Math.floor(m / 12), m: m % 12 }); }
    }
    const nameTeile = String(st.schueler_name || '').split(',');
    const name = nameTeile.length > 1 ? nameTeile[0].trim().toUpperCase() + ' ' + nameTeile.slice(1).join(',').trim() : String(st.schueler_name || '');
    return { name: name, matricule: st.matricule || '', alter: alter, schule: daten.f.schule_name || st.foerderort || '', klasse: daten.f.klasse || st.klasse || '', sprachen: sp.join(', '), cni: (daten.chips.cni || []).slice() };
  }

  // ---------- HTML des Berichts ----------
  function bloeckeHtml(bl) {
    return bl.map(function (b) {
      if (b.typ === 'absatz') { return '<p>' + esc(b.text) + '</p>'; }
      if (b.typ === 'zwischen') { return '<p class="dsb-zw">' + esc(b.text) + '</p>'; }
      if (b.typ === 'liste') { return '<ul>' + b.punkte.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>'; }
      if (b.typ === 'tabelle') {
        return '<table class="dsb-tab"><thead><tr>' + b.kopf.map(function (k) { return '<th>' + esc(k) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          b.zeilen.map(function (z) { return '<tr>' + z.map(function (x) { return '<td>' + esc(x) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
      }
      if (b.typ === 'raster') { return rasterHtml(); }
      return '';
    }).join('');
  }
  function rasterHtml() {
    const r = raster(), namen = { verhalten: 'V', kommunikation: 'K', sozialisation: 'SOZ', kognition: 'KOG' };
    let h = '<table class="dsb-raster"><thead><tr><th></th>' + r.map(function (b) { return '<th>' + esc(anzeigeCode(namen[b.id], berichtLang())) + '</th>'; }).join('') + '</tr></thead><tbody>';
    for (let st = 5; st >= 1; st--) {
      h += '<tr><th>' + ['', 'I', 'II', 'III', 'IV', 'V'][st] + '</th>' + r.map(function (b) {
        return '<td>' + (b.stufen[st] || []).map(function (it) { return '<span class="' + (it.status === 'erreicht' ? 'er' : it.status === 'ziel' ? 'zi' : '') + '">' + it.nr + '</span>'; }).join('') + '</td>';
      }).join('') + '</tr>';
    }
    return h + '</tbody></table>';
  }
  function abschnittHtml(a, lang, mitWerkzeug) {
    const U2 = U();
    const ueber = '<h' + (a.e === 1 ? '3' : '4') + ' class="dsb-h' + a.e + '">' + esc(a.nr + (a.e === 1 ? '. ' : ' ') + a.titel) + '</h' + (a.e === 1 ? '3' : '4') + '>';
    if (a.nurTitel) { return '<section class="dsb-ab" data-ab="' + a.id + '">' + ueber + '</section>'; }
    let werkzeug = '';
    if (mitWerkzeug && a.id !== 'raster') {
      werkzeug = '<div class="dsb-werkzeug">' + (a.bearbeitet ? '<span class="dsb-marke">' + esc(U2.bearbeitetMarke) + '</span><button type="button" class="dsa-link" data-aktion="zuruecksetzen" data-ab="' + a.id + '">' + esc(U2.zuruecksetzen) + '</button>' : '') +
        '<button type="button" class="dsa-link" data-aktion="bearbeiten" data-ab="' + a.id + '">' + esc(U2.bearbeiten) + '</button></div>';
    }
    let inhalt;
    if (mitWerkzeug && bearbeiteAbschnitt === a.id) {
      const auto = roh(lang)[a.id] || [];
      const e = daten.bearbeitet[lang] && daten.bearbeitet[lang][a.id];
      inhalt = '<div class="dsb-edit"><p class="dsa-hinweis">' + esc(U2.editHinweis) + '</p><textarea class="dsa-eingabe" data-edit="' + a.id + '" rows="12">' + esc(e ? e.text : bloeckeZuText(auto, lang)) + '</textarea>' +
        '<div class="dsa-knopfreihe"><button type="button" class="dsa-knopf primaer" data-aktion="uebernehmen" data-ab="' + a.id + '">' + esc(U2.uebernehmen) + '</button><button type="button" class="dsa-knopf" data-aktion="abbrechen">' + esc(U2.abbrechen) + '</button></div></div>';
    } else {
      inhalt = (a.veraltet && mitWerkzeug ? '<p class="dsa-warnung">' + esc(U2.veraltet) + '</p>' : '') + (a.bloecke.length ? bloeckeHtml(a.bloecke) : '<p class="dsb-leer">—</p>');
    }
    return '<section class="dsb-ab' + (a.bearbeitet ? ' bearbeitet' : '') + '" data-ab="' + a.id + '">' + ueber + werkzeug + inhalt + '</section>';
  }

  // ---------- Oberfläche ----------
  function sichtbar() { const el = document.getElementById('ds'); return !!(el && el.classList.contains('active')); }
  function zeigen() {
    wurzel = document.getElementById('ds-app');
    if (!wurzel) { return; }
    if (!wurzel.dataset.bereit) { verbinden(wurzel); wurzel.dataset.bereit = '1'; }
    rendern();
  }
  function schrittIndex(id) { for (let i = 0; i < DS_SCHRITTE.length; i++) { if (DS_SCHRITTE[i].id === id) { return i; } } return 0; }
  function rendern() {
    if (!wurzel) { wurzel = document.getElementById('ds-app'); if (!wurzel) { return; } }
    const u = U(), T2 = T(), i = schrittIndex(schritt), s = DS_SCHRITTE[i];
    const liste = DS_SCHRITTE.map(function (x, k) {
      const fs = fortschritt(x);
      return '<li><button type="button" class="dsa-schritt' + (x.id === schritt ? ' aktiv' : '') + (fs.fertig ? ' fertig' : '') + '" data-schritt="' + x.id + '">' +
        '<span class="nr">' + (k + 1) + '</span><span class="tx">' + esc(T2.ui.schritte[x.id] || x.id) + '</span>' + (fs.text ? '<span class="st">' + esc(fs.text) + '</span>' : '') + '</button></li>';
    }).join('');
    const vorschauSeite = s.id === 'vorschau';
    wurzel.innerHTML =
      '<div class="dsa-kopf"><div><h2>' + esc(u.titel) + '</h2><p>' + esc(u.untertitel) + '</p></div>' + sprachwahl() + '</div>' +
      '<div class="dsa-raster' + (vorschauSeite ? ' breit' : '') + '">' +
        '<nav class="dsa-schritte" aria-label="' + esc(u.titel) + '"><ol>' + liste + '</ol></nav>' +
        '<div class="dsa-haupt" id="dsa-haupt">' + schrittHtml(s, i) + '</div>' +
        (vorschauSeite ? '' : '<aside class="dsa-vorschau" id="dsa-vorschau" aria-live="polite"></aside>') +
      '</div>';
    vorschauJetzt();
  }
  function sprachwahl() {
    const u = U(), l = berichtLang();
    return '<div class="dsa-sprache" role="group" aria-label="' + esc(u.sprache) + '"><span>' + esc(u.sprache) + '</span>' +
      ['de', 'fr', 'en'].map(function (x) {
        const da = !!DS_TEXTE[x];
        return '<button type="button" data-aktion="sprache" data-lang="' + x + '" class="' + (x === l ? 'an' : '') + '"' + (da ? '' : ' disabled title="' + esc(u.spracheFehlt) + '"') + '>' + x.toUpperCase() + '</button>';
      }).join('') + '</div>';
  }
  function fortschritt(s) {
    let n = 0, m = 0;
    s.felder.forEach(function zaehle(fd) {
      if (fd.typ === 'reihe') { fd.felder.forEach(zaehle); return; }
      if (fd.typ === 'aussagen') { DS_AUFBAU[fd.bereich].themen.forEach(function (th) { th.aussagen.forEach(function (a) { m++; if (daten.bewertungen[a[0]]) { n++; } }); }); }
    });
    if (m) { return { text: n + '/' + m, fertig: n === m }; }
    if (s.id === 'vorschau' || s.id === 'eldib') { return { text: '', fertig: false }; }
    let hat = false;
    s.felder.forEach(function pruefe(fd) {
      if (fd.typ === 'reihe') { fd.felder.forEach(pruefe); return; }
      if (fd.f && daten.f[fd.f] != null && daten.f[fd.f] !== '') { hat = true; }
      if (fd.frei && daten.frei[fd.frei]) { hat = true; }
      if (fd.g && (daten.chips[fd.g] || []).length) { hat = true; }
      if (fd.typ === 'geschlecht' && daten.geschlecht) { hat = true; }
    });
    return { text: '', fertig: hat };
  }

  function schrittHtml(s, i) {
    const u = U(), T2 = T();
    let h = '<div class="dsa-schrittkopf"><span class="dsa-schrittnr">' + (i + 1) + ' / ' + DS_SCHRITTE.length + '</span><h3>' + esc(T2.ui.schritte[s.id] || s.id) + '</h3></div>';
    if (s.id === 'vorschau') { h += vorschauSeiteHtml(); }
    else {
      if (s.felder.some(function (fd) { return fd.typ === 'aussagen'; })) { h += '<p class="dsa-tipp">' + esc(u.tipp) + '</p>'; }
      h += s.felder.map(feldHtml).join('');
    }
    h += '<div class="dsa-navi">' + (i > 0 ? '<button type="button" class="dsa-knopf" data-aktion="zurueck">' + esc(u.zurueck) + '</button>' : '<span></span>') +
      (i < DS_SCHRITTE.length - 1 ? '<button type="button" class="dsa-knopf primaer" data-aktion="weiter">' + esc(i === DS_SCHRITTE.length - 2 ? u.zurVorschau : u.weiter) + '</button>' : '') + '</div>';
    return h;
  }

  // Beschriftung einer Auswahl-Option: ['Label', 'Textform'] oder 'Text'
  function optLabel(v) { return Array.isArray(v) ? v[0] : String(v); }
  function optionen(opt) {
    const u = U(), O = (T().optionen || DS_TEXTE.de.optionen || {})[opt] || {}, eigene = (u.opt && u.opt[opt]) || {};
    const keys = Object.keys(O);
    Object.keys(eigene).forEach(function (k) { if (keys.indexOf(k) < 0) { keys.push(k); } });
    return keys.map(function (k) { return [k, eigene[k] || optLabel(O[k])]; }).filter(function (x) { return x[1]; });
  }
  function wennErfuellt(fd) { return !fd.wenn || daten.f[fd.wenn[0]] === fd.wenn[1]; }
  function feldHtml(fd) {
    const u = U(), T2 = T();
    if (!wennErfuellt(fd)) { return ''; }
    switch (fd.typ) {
      case 'reihe': return '<div class="dsa-reihe">' + fd.felder.map(feldHtml).join('') + '</div>';
      case 'stamm': {
        const st = stamm(), k = DsText.kontext(appSprache(), daten, st);
        return '<div class="dsa-karte dsa-stamm"><div><strong>' + esc(st.schueler_name || '—') + '</strong>' +
          (st.geburtsdatum ? ' · ' + esc(DsText.datum(st.geburtsdatum, appSprache())) + (k.alter != null ? ' (' + esc(fmt(u.alter, { j: k.alter })) + ')' : '') : '') +
          (st.klasse ? ' · ' + esc(st.klasse) : '') + (st.foerderort ? ' · ' + esc(st.foerderort) : '') + '</div>' +
          '<button type="button" class="dsa-link" data-aktion="stammdaten">' + esc(u.stammBearbeiten) + '</button></div>';
      }
      case 'geschlecht':
        return '<fieldset class="dsa-feld dsa-geschlecht"><legend>' + esc(label('geschlecht')) + '</legend>' +
          ['m', 'w'].map(function (g) { return '<label class="dsa-radio"><input type="radio" name="dsa-geschlecht" value="' + g + '"' + (daten.geschlecht === g ? ' checked' : '') + '> ' + esc(label(g)) + '</label>'; }).join('') + '</fieldset>';
      case 'datum': case 'zahl': case 'kurz': {
        const key = fd.f || fd.frei, wert = fd.f ? daten.f[fd.f] : daten.frei[fd.frei];
        const ph = fd.stamm ? (stamm()[fd.stamm] || '') : '';
        const typ = fd.typ === 'datum' ? 'date' : (fd.typ === 'zahl' ? 'number' : 'text');
        return '<label class="dsa-feld' + (fd.typ === 'zahl' ? ' schmal' : '') + '"><span>' + esc(label(key)) + '</span><input class="dsa-eingabe" type="' + typ + '"' + (fd.typ === 'zahl' ? ' min="0" max="99"' : '') +
          (fd.f ? ' data-f="' + fd.f + '"' : ' data-frei="' + fd.frei + '"') + ' value="' + esc(wert == null ? '' : wert) + '"' + (ph ? ' placeholder="' + esc(ph) + '"' : '') + '></label>';
      }
      case 'lang': {
        const wert = daten.frei[fd.frei] || '';
        return '<label class="dsa-feld voll"><span>' + esc(label(fd.frei)) + (fd.frei2 ? ' <small>' + esc(u.freiHinweis) + '</small>' : '') + '</span><textarea class="dsa-eingabe" rows="' + (fd.klein ? 2 : 3) + '" data-frei="' + fd.frei + '">' + esc(wert) + '</textarea></label>';
      }
      case 'haken':
        return '<label class="dsa-haken"><input type="checkbox" data-f="' + fd.f + '"' + (daten.f[fd.f] ? ' checked' : '') + '> ' + esc(label(fd.f)) + '</label>';
      case 'wahl': {
        const wert = daten.f[fd.f] || '';
        let h = '<label class="dsa-feld"><span>' + esc(label(fd.f)) + '</span><select class="dsa-eingabe" data-f="' + fd.f + '"><option value="">' + esc(u.bitteWaehlen) + '</option>' +
          optionen(fd.opt).map(function (o) { return '<option value="' + esc(o[0]) + '"' + (o[0] === wert ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select></label>';
        if (fd.andere && wert === 'andere') { h += feldHtml({ typ: 'kurz', frei: fd.andere }); }
        return h;
      }
      case 'quelle': {
        const Q = (T2.quellen || DS_TEXTE.de.quellen)[fd.art] || {}, wert = daten.f[fd.f] || (fd.art === 'schule' ? 'lehrperson' : 'eltern');
        return '<label class="dsa-feld"><span>' + esc(label(fd.f)) + '</span><select class="dsa-eingabe" data-f="' + fd.f + '">' +
          Object.keys(Q).map(function (k) { return '<option value="' + k + '"' + (k === wert ? ' selected' : '') + '>' + esc(Q[k].label) + '</option>'; }).join('') + '</select></label>';
      }
      case 'chips': return '<div class="dsa-karte dsa-chipgruppe" data-gruppe="' + fd.g + '">' + chipsHtml(fd) + '</div>';
      case 'aussagen': return aussagenHtml(fd.bereich);
      case 'tabelle': return tabelleHtml(fd.t);
      case 'beob': return beobHtml();
      case 'eldib': return eldibHtml();
    }
    return '';
  }
  function chipsHtml(fd) {
    const T2 = T(), grp = T2.chips[fd.g] || DS_TEXTE.de.chips[fd.g] || {}, an = daten.chips[fd.g] || [];
    const titelText = (T2.ui.chipTitel && T2.ui.chipTitel[fd.g]) || label(fd.g);
    let h = '<div class="dsa-chiptitel">' + esc(titelText) + '</div><div class="dsa-chips">' +
      (DS_CHIPS[fd.g] || []).map(function (k) {
        const l = grp[k] ? grp[k][0] : k, ist = an.indexOf(k) >= 0;
        return '<button type="button" class="dsa-chip' + (ist ? ' an' : '') + '" aria-pressed="' + ist + '" data-chip="' + fd.g + '" data-k="' + k + '">' + esc(l) + '</button>';
      }).join('') + '</div>';
    if (fd.details) {
      const det = daten.f[fd.details] || {};
      an.filter(function (k) { return k !== 'andere' && k !== 'keine'; }).forEach(function (k) {
        h += '<label class="dsa-feld dsa-detail"><span>' + esc((grp[k] || [k])[0]) + ' – ' + esc(label(fd.details)) + '</span><input class="dsa-eingabe" type="text" data-fmap="' + fd.details + '" data-k="' + k + '" value="' + esc(det[k] || '') + '"></label>';
      });
    }
    if (fd.andere && an.indexOf('andere') >= 0) { h += feldHtml({ typ: 'kurz', frei: fd.andere }); }
    return h;
  }
  function skalaFuer(bereich, thema) { const u = U(); return u.skala[DS_SKALA_THEMA[bereich + '.' + thema] || 'std']; }
  function aussagenHtml(bereich) {
    const u = U(), T2 = T();
    return DS_AUFBAU[bereich].themen.map(function (th) {
      const sk = skalaFuer(bereich, th.id);
      const n = th.aussagen.filter(function (a) { return daten.bewertungen[a[0]]; }).length;
      return '<section class="dsa-karte dsa-thema" data-thema="' + bereich + '.' + th.id + '"><header><h4>' + esc(T2.ui.themen[bereich + '.' + th.id] || th.id) + '</h4>' +
        '<span class="dsa-zaehler">' + esc(fmt(u.bewertet, { n: n, m: th.aussagen.length })) + '</span></header>' +
        '<div class="dsa-skalakopf" aria-hidden="true"><span>' + esc(sk[0]) + '</span><span>' + esc(sk[1]) + '</span><span>' + esc(sk[2]) + '</span></div>' +
        th.aussagen.map(function (a) { return aussageHtml(a[0], a[1]); }).join('') + '</section>';
    }).join('');
  }
  function ton(pol, r) {
    if (!r) { return ''; }
    if (!pol) { return ' ton-n' + (r >= 6 ? '3' : r >= 4 ? '2' : '1'); }
    const v = pol < 0 ? 8 - r : r;
    return v >= 6 ? ' ton-g2' : v === 5 ? ' ton-g1' : v === 4 ? ' ton-m' : v === 3 ? ' ton-r1' : ' ton-r2';
  }
  function aussageHtml(id, pol) {
    const u = U(), r = daten.bewertungen[id] || 0, q = ((T().a[id]) || DS_TEXTE.de.a[id] || {}).q || id;
    let k = '';
    for (let i = 1; i <= 7; i++) { k += '<button type="button" tabindex="-1" class="dsa-p' + (r === i ? ' an' + ton(pol, i) : '') + '" data-r="' + i + '" aria-pressed="' + (r === i) + '">' + i + '</button>'; }
    return '<div class="dsa-aussage' + (r ? ' hat' : '') + '" tabindex="0" data-id="' + id + '" data-pol="' + pol + '">' +
      '<div class="dsa-q">' + esc(q) + '</div><div class="dsa-skala" role="group" aria-label="' + esc(q) + '">' + k +
      '<button type="button" tabindex="-1" class="dsa-x" data-r="0" title="' + esc(u.keineAngabe) + '" aria-label="' + esc(u.keineAngabe) + '">×</button></div>' +
      '<div class="dsa-satz">' + satzVorschau(id, r) + '</div></div>';
  }
  // Was bewirkt die Bewertung im Bericht?
  function satzVorschau(id, r) {
    if (!r) { return ''; }
    const u = U(), lang = appSprache(), a = (T(lang).a[id]) || {};
    let thema = '';
    ['deutung', 'beduerfnisse'].forEach(function (b) { DS_AUFBAU[b].themen.forEach(function (th) { th.aussagen.forEach(function (x) { if (x[0] === id) { thema = b + '.' + th.id; } }); }); });
    if (a.t) {
      const s = DsText.vorschauSatz(lang, daten, stamm(), id, r);
      if (s) { return '<span class="dsa-zitat">' + esc(s) + '</span>'; }
      if (a.np && r <= 2) { return '<span class="dsa-wirkung">' + esc(u.wirkung.ohne) + '</span>'; }
      if (a.m && r >= 5) { return '<span class="dsa-wirkung">' + esc(u.wirkung.deutlich) + '</span>'; }
      return '<span class="dsa-wirkung">' + esc(u.wirkung.nicht) + '</span>';
    }
    let w = u.wirkung.nicht;
    if (thema === 'deutung.aengste' || thema === 'deutung.abwehr') { w = r >= 5 ? u.wirkung.deutlich : r === 4 ? u.wirkung.teilweise : w; }
    else if (thema === 'deutung.hypothesen') { w = r >= 6 ? u.wirkung.haupt : r >= 4 ? u.wirkung.neben : w; }
    else if (thema === 'beduerfnisse.beduerfnisse') { w = r >= 6 ? u.wirkung.braucht : r >= 4 ? u.wirkung.profitiert : w; }
    return '<span class="dsa-wirkung">' + esc(w) + '</span>';
  }
  function tabelleHtml(t) {
    const u = U(), spalten = DS_TABELLEN[t], zeilen = daten.tabellen[t] || [];
    const kopf = spalten.map(function (s) { return '<th>' + esc(u.tab[s]) + '</th>'; }).join('') + '<th></th>';
    const koerper = zeilen.map(function (z, i) {
      return '<tr>' + spalten.map(function (s) {
        if (s === 'datum') { return '<td><input class="dsa-eingabe" type="date" data-tab="' + t + '" data-i="' + i + '" data-s="' + s + '" value="' + esc(z[s] || '') + '"></td>'; }
        if (s === 'art') {
          return '<td><select class="dsa-eingabe" data-tab="' + t + '" data-i="' + i + '" data-s="' + s + '"><option value=""></option>' +
            Object.keys(u.opt.interventionen).map(function (k) { return '<option value="' + k + '"' + (z.art === k ? ' selected' : '') + '>' + esc(u.opt.interventionen[k]) + '</option>'; }).join('') + '</select></td>';
        }
        return '<td><input class="dsa-eingabe" type="text" data-tab="' + t + '" data-i="' + i + '" data-s="' + s + '" value="' + esc(z[s] || '') + '"></td>';
      }).join('') + '<td><button type="button" class="dsa-weg" data-aktion="zeileWeg" data-tabelle="' + t + '" data-i="' + i + '" title="' + esc(u.entfernen) + '" aria-label="' + esc(u.entfernen) + '">×</button></td></tr>';
    }).join('');
    return '<div class="dsa-karte"><div class="dsa-chiptitel">' + esc(label('tab_' + t)) + '</div><div class="dsa-tabwrap"><table class="dsa-tabelle"><thead><tr>' + kopf + '</tr></thead><tbody>' + koerper + '</tbody></table></div>' +
      '<button type="button" class="dsa-link" data-aktion="zeileHinzu" data-tabelle="' + t + '">' + esc(u.zeileHinzu) + '</button></div>';
  }
  function beobHtml() {
    const u = U(), l = daten.f.beobachtungen || [], O = optionen('setting');
    return '<div class="dsa-karte"><div class="dsa-chiptitel">' + esc(label('beobachtungen')) + '</div>' +
      l.map(function (b, i) {
        return '<div class="dsa-reihe dsa-beob"><label class="dsa-feld"><span>' + esc(label('b_datum')) + '</span><input class="dsa-eingabe" type="date" data-beob="' + i + '" data-s="datum" value="' + esc(b.datum || '') + '"></label>' +
          '<label class="dsa-feld"><span>' + esc(label('b_setting')) + '</span><select class="dsa-eingabe" data-beob="' + i + '" data-s="setting"><option value=""></option>' +
          O.map(function (o) { return '<option value="' + o[0] + '"' + (b.setting === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select></label>' +
          '<label class="dsa-feld schmal"><span>' + esc(label('b_dauer')) + '</span><input class="dsa-eingabe" type="number" min="0" max="600" data-beob="' + i + '" data-s="dauer" value="' + esc(b.dauer || '') + '"></label>' +
          '<button type="button" class="dsa-weg" data-aktion="beobWeg" data-i="' + i + '" title="' + esc(u.entfernen) + '" aria-label="' + esc(u.entfernen) + '">×</button></div>';
      }).join('') + '<button type="button" class="dsa-link" data-aktion="beobHinzu">' + esc(u.beobHinzu) + '</button></div>';
  }
  function eldibHtml() {
    const u = U(), p = profil(appSprache());
    const leer = p.bereiche.every(function (b) { return !b.erreicht.length && !b.ziele.length; });
    let h = '';
    if (leer) { h += '<div class="dsa-karte dsa-hinweisbox"><p>' + esc(u.eldibLeer) + '</p><button type="button" class="dsa-knopf" data-aktion="zumEldib">' + esc(u.zumEldib) + '</button></div>'; }
    h += '<div class="dsa-eldib">' + p.bereiche.map(function (b) {
      return '<div class="dsa-karte dsa-bereich"><header><h4>' + esc(b.name) + ' (' + esc(b.code) + ')</h4><span class="dsa-stufe">' +
        esc(b.stufe ? fmt(u.eldibStufe, { s: ['', 'I', 'II', 'III', 'IV', 'V'][b.stufe] }) : u.eldibKeineStufe) + '</span></header>' +
        (b.stufe ? '<p class="dsa-richtziel">„' + esc(b.richtziel) + '“</p>' : '') +
        '<p class="dsa-zahlen">' + esc(fmt(u.eldibErreicht, { n: b.erreicht.length })) + ' · ' + esc(fmt(u.eldibZiele, { n: b.ziele.length })) + '</p>' +
        (b.ziele.length ? '<ul class="dsa-ziele">' + b.ziele.map(function (z) { return '<li><b>' + esc(z.code) + '</b> ' + esc(z.description) + '</li>'; }).join('') + '</ul>' : '') +
        '<label class="dsa-feld voll"><span>' + esc(fmt(u.eldibFrei, { b: b.name })) + '</span><textarea class="dsa-eingabe" rows="2" data-frei="eldib_' + b.id + '">' + esc(daten.frei['eldib_' + b.id] || '') + '</textarea></label></div>';
    }).join('') + '</div>';
    return h;
  }

  // ---------- Vorschau ----------
  function vorschauBald() { clearTimeout(zeitVorschau); zeitVorschau = setTimeout(vorschauJetzt, 120); }
  function vorschauJetzt() {
    const el = document.getElementById('dsa-vorschau');
    if (!el) { return; }
    const u = U(), s = DS_SCHRITTE[schrittIndex(schritt)], lang = berichtLang();
    let h = '<div class="dsa-vorschaukopf">' + esc(u.vorschau) + '</div><div class="dsb-papier">';
    if (s.id === 'stamm') { h += deckblattHtml(fertig(lang)); }
    else {
      const b = fertig(lang), ids = s.abschnitte || [];
      const teile = b.abschnitte.filter(function (a) { return ids.indexOf(a.id) >= 0; });
      const mitText = teile.filter(function (a) { return a.bloecke.length; });
      h += mitText.length ? teile.map(function (a) { return abschnittHtml(a, lang, false); }).join('') : '<p class="dsb-leer">' + esc(u.vorschauLeer) + '</p>';
    }
    el.innerHTML = h + '</div>';
  }
  function deckblattHtml(b) {
    const d = b.deckblatt, D = DS_DECKBLATT[b.lang] || DS_DECKBLATT.de;
    const nameLabel = nachGeschlecht(D.name);
    const zeile = function (l, w) { return '<tr><th>' + esc(l) + '</th><td>' + esc(w || '—') + '</td></tr>'; };
    const cni = DS_CHIPS.cni.map(function (k) {
      const ein = ['clapa', 'cst', 'annexe'].indexOf(k) >= 0;
      let txt = D.cni[k] || k;
      txt = nachGeschlecht(txt);
      return '<li class="' + (ein ? 'ein' : '') + '"><span class="box">' + (d.cni.indexOf(k) >= 0 ? '☒' : '☐') + '</span> ' + esc(txt) + '</li>';
    }).join('');
    return '<div class="dsb-deckblatt"><p class="dsb-dt">' + esc(D.titel) + '</p><p class="dsb-du">' + esc(D.unter) + '</p><table class="dsb-kopf">' +
      zeile(nameLabel, d.name) + zeile(D.matricule, d.matricule) + zeile(D.alter, d.alter) + zeile(D.schule, d.schule) + zeile(D.klasse, d.klasse) + zeile(D.sprachen, d.sprachen) +
      '</table><p class="dsb-zw">' + esc(D.empfehlungen) + '</p><ul class="dsb-cni">' + cni + '</ul></div>';
  }
  function fehlendeAngaben() {
    const u = U(), st = stamm(), f = [];
    if (!daten.geschlecht) { f.push(['geschlecht', 'stamm']); }
    if (!st.schueler_name) { f.push(['name', null]); }
    if (!st.geburtsdatum) { f.push(['geburt', null]); }
    if (!daten.f.verfasser_name) { f.push(['verfasser', 'stamm']); }
    if (!daten.f.auftrag_datum) { f.push(['auftrag', 'auftrag']); }
    if (profil().bereiche.every(function (b) { return !b.erreicht.length; })) { f.push(['eldib', 'eldib']); }
    if (!(daten.chips.cni || []).length) { f.push(['cni', 'empfehlungen']); }
    return f.map(function (x) { return { text: u.fehlt[x[0]], schritt: x[1] }; });
  }
  // Vor jedem Export (Word, Drucken – auch über die Seite „Export“): fehlende Angaben zeigen, z. B. „Geschlecht fehlt“
  function exportPruefen() {
    const fehlt = fehlendeAngaben(), u = U();
    return !fehlt.length || window.confirm(u.pruefen + (appSprache() === 'fr' ? ' :' : ':') + '\n- ' + fehlt.map(function (x) { return x.text; }).join('\n- ') + '\n\n' + u.trotzdem);
  }
  function vorschauSeiteHtml() {
    const u = U(), lang = berichtLang(), b = fertig(lang), fehlt = fehlendeAngaben();
    let h = '<div class="dsa-pruefliste ' + (fehlt.length ? 'offen' : 'ok') + '"><strong>' + esc(fehlt.length ? u.pruefen : u.allesDa) + '</strong>' +
      (fehlt.length ? '<ul>' + fehlt.map(function (x) { return '<li>' + (x.schritt ? '<button type="button" class="dsa-link" data-schritt="' + x.schritt + '">' + esc(x.text) + '</button>' : esc(x.text)) + '</li>'; }).join('') + '</ul>' : '') + '</div>';
    h += '<div class="dsa-knopfreihe"><button type="button" class="dsa-knopf primaer" data-aktion="word">' + esc(u.word) + ' (' + lang.toUpperCase() + ')</button>' +
      '<button type="button" class="dsa-knopf" data-aktion="drucken">' + esc(u.drucken) + '</button></div>';
    h += '<div class="dsb-papier gross"><p class="dsa-vorschaukopf">' + esc(u.deckblatt) + '</p>' + deckblattHtml(b) + b.abschnitte.map(function (a) { return abschnittHtml(a, lang, true); }).join('') +
      signaturHtml(b) + '</div>';
    return h;
  }
  function signaturHtml(b) {
    const D = DS_DECKBLATT[b.lang] || DS_DECKBLATT.de;
    return '<div class="dsb-signatur"><p>' + esc(b.verfasser.name || '') + '</p><p>' + esc(b.verfasser.funktion || '') + '</p><p>' + esc(D.unterschrift) + '</p></div>';
  }

  // ---------- Drucken / PDF ----------
  function drucken(lang) {
    lang = lang || berichtLang();
    const b = fertig(lang);
    const css = 'body{font:11pt/1.5 Arial,Helvetica,sans-serif;color:#111;margin:0}main{max-width:17cm;margin:0 auto}h1{font-size:18pt;margin:0 0 4pt}.dsb-du{margin:0 0 18pt;color:#333}' +
      '.dsb-h1{font-size:13pt;margin:18pt 0 6pt;color:#1f3864}.dsb-h2{font-size:11.5pt;margin:12pt 0 4pt;color:#1f3864}p{margin:0 0 7pt;text-align:justify}ul{margin:0 0 8pt 18pt;padding:0}' +
      'table{border-collapse:collapse;width:100%;margin:4pt 0 10pt}th,td{border:1px solid #777;padding:3pt 5pt;text-align:left;font-size:10pt;vertical-align:top}.dsb-kopf th{width:38%;background:#f2f2f2}' +
      '.dsb-zw{font-weight:bold;margin-top:8pt}.dsb-cni{list-style:none;margin-left:0}.dsb-cni li.ein{margin-left:18pt}.dsb-deckblatt{page-break-after:always}.dsb-dt{font-size:20pt;font-weight:bold;margin:30pt 0 2pt}' +
      '.dsb-raster td span{display:inline-block;min-width:16pt;margin:1pt;padding:0 2pt;border:1px solid #bbb;text-align:center;font-size:8pt}.dsb-raster .er{background:#b7e1a1}.dsb-raster .zi{background:#ffe699}' +
      '.dsb-signatur{margin-top:28pt}.dsb-signatur p{margin:0}.dsb-leer{color:#999}@page{margin:2cm}';
    const html = '<!DOCTYPE html><html lang="' + lang + '"><head><meta charset="utf-8"><title>' + esc((DS_DECKBLATT[lang] || DS_DECKBLATT.de).titel + ' – ' + b.deckblatt.name) + '</title><style>' + css + '</style></head><body><main>' +
      deckblattHtml(b).replace('<p class="dsb-dt">', '<h1 class="dsb-dt">').replace(/<\/p><p class="dsb-du">/, '</h1><p class="dsb-du">') +
      b.abschnitte.map(function (a) { return abschnittHtml(a, lang, false); }).join('') + signaturHtml(b) + '</main></body></html>';
    let rahmen = document.getElementById('dsa-druckrahmen');
    if (rahmen) { rahmen.remove(); }
    rahmen = document.createElement('iframe');
    rahmen.id = 'dsa-druckrahmen';
    rahmen.setAttribute('aria-hidden', 'true');
    rahmen.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
    document.body.appendChild(rahmen);
    const doc = rahmen.contentWindow.document;
    doc.open(); doc.write(html); doc.close();
    setTimeout(function () { try { rahmen.contentWindow.focus(); rahmen.contentWindow.print(); } catch (e) { console.error(e); } }, 250);
  }

  // ---------- Ereignisse ----------
  function geheZu(id) {
    schritt = id; bearbeiteAbschnitt = null;
    rendern();
    const h = document.getElementById('ds');
    if (h) { h.scrollIntoView({ block: 'start' }); }
    window.scrollTo({ top: 0 });
  }
  function nachAenderung(neuZeichnen) {
    if (neuZeichnen) { const y = window.scrollY; const haupt = document.getElementById('dsa-haupt'); if (haupt) { haupt.innerHTML = schrittHtml(DS_SCHRITTE[schrittIndex(schritt)], schrittIndex(schritt)); } window.scrollTo(0, y); }
    aktualisiereSchrittliste();
    vorschauBald();
    speichernBald();
  }
  function aktualisiereSchrittliste() {
    if (!wurzel) { return; }
    wurzel.querySelectorAll('.dsa-schritt').forEach(function (btn) {
      const s = DS_SCHRITTE[schrittIndex(btn.dataset.schritt)], fs = fortschritt(s);
      btn.classList.toggle('fertig', fs.fertig);
      const st = btn.querySelector('.st');
      if (st) { st.textContent = fs.text; }
    });
  }
  function setzeBewertung(zeile, r) {
    const id = zeile.dataset.id, pol = +zeile.dataset.pol;
    if (r) { daten.bewertungen[id] = r; } else { delete daten.bewertungen[id]; }
    zeile.classList.toggle('hat', !!r);
    zeile.querySelectorAll('.dsa-p').forEach(function (b) {
      const i = +b.dataset.r;
      b.className = 'dsa-p' + (i === r ? ' an' + ton(pol, i) : '');
      b.setAttribute('aria-pressed', i === r ? 'true' : 'false');
    });
    zeile.querySelector('.dsa-satz').innerHTML = satzVorschau(id, r);
    const karte = zeile.closest('.dsa-thema');
    if (karte) {
      const alle = karte.querySelectorAll('.dsa-aussage'), n = Array.prototype.filter.call(alle, function (z) { return daten.bewertungen[z.dataset.id]; }).length;
      karte.querySelector('.dsa-zaehler').textContent = fmt(U().bewertet, { n: n, m: alle.length });
    }
    nachAenderung(false);
  }
  function naechsteAussage(zeile, richtung) {
    const alle = Array.prototype.slice.call(wurzel.querySelectorAll('.dsa-aussage'));
    const i = alle.indexOf(zeile), z = alle[i + richtung];
    if (z) { z.focus(); z.scrollIntoView({ block: 'nearest' }); }
  }
  function verbinden(el) {
    el.addEventListener('click', function (ev) {
      const t = ev.target.closest('button');
      if (!t || !el.contains(t)) { return; }
      if (t.dataset.r != null && t.closest('.dsa-aussage')) { const z = t.closest('.dsa-aussage'); setzeBewertung(z, +t.dataset.r); z.focus(); return; }
      if (t.dataset.chip) {
        const g = t.dataset.chip, k = t.dataset.k, l = daten.chips[g] || (daten.chips[g] = []), i = l.indexOf(k);
        if (i >= 0) { l.splice(i, 1); } else { l.push(k); }
        if (!l.length) { delete daten.chips[g]; }
        const fd = findeFeld(function (x) { return x.typ === 'chips' && x.g === g; });
        const box = t.closest('.dsa-chipgruppe');
        if (fd && box && (fd.details || fd.andere)) { box.innerHTML = chipsHtml(fd); const neu = box.querySelector('[data-chip="' + g + '"][data-k="' + k + '"]'); if (neu) { neu.focus(); } }
        else { t.classList.toggle('an', i < 0); t.setAttribute('aria-pressed', i < 0 ? 'true' : 'false'); }
        nachAenderung(false); return;
      }
      if (t.dataset.schritt) { geheZu(t.dataset.schritt); return; }
      const a = t.dataset.aktion;
      if (!a) { return; }
      const i = schrittIndex(schritt);
      if (a === 'weiter' && i < DS_SCHRITTE.length - 1) { geheZu(DS_SCHRITTE[i + 1].id); }
      else if (a === 'zurueck' && i > 0) { geheZu(DS_SCHRITTE[i - 1].id); }
      else if (a === 'sprache') { berichtSprache = t.dataset.lang; bearbeiteAbschnitt = null; rendern(); }
      else if (a === 'zeileHinzu') { const tb = t.dataset.tabelle; (daten.tabellen[tb] || (daten.tabellen[tb] = [])).push({}); nachAenderung(true); }
      else if (a === 'zeileWeg') { daten.tabellen[t.dataset.tabelle].splice(+t.dataset.i, 1); nachAenderung(true); }
      else if (a === 'beobHinzu') { (daten.f.beobachtungen || (daten.f.beobachtungen = [])).push({}); nachAenderung(true); }
      else if (a === 'beobWeg') { daten.f.beobachtungen.splice(+t.dataset.i, 1); nachAenderung(true); }
      else if (a === 'stammdaten') { if (typeof showMainSection === 'function') { showMainSection('stammdaten'); } }
      else if (a === 'zumEldib') { if (typeof showMainSection === 'function') { showMainSection('eldib'); } }
      else if (a === 'bearbeiten') { bearbeiteAbschnitt = t.dataset.ab; nachAenderung(true); const ta = el.querySelector('[data-edit="' + t.dataset.ab + '"]'); if (ta) { ta.focus(); } }
      else if (a === 'abbrechen') { bearbeiteAbschnitt = null; nachAenderung(true); }
      else if (a === 'uebernehmen') {
        const lang = berichtLang(), id = t.dataset.ab, ta = el.querySelector('[data-edit="' + id + '"]');
        const auto = bloeckeZuText(roh(lang)[id] || [], lang);
        daten.bearbeitet[lang] = daten.bearbeitet[lang] || {};
        if (ta && ta.value.trim() !== auto.trim()) { daten.bearbeitet[lang][id] = { text: ta.value, basis: hash(auto) }; } else { delete daten.bearbeitet[lang][id]; }
        bearbeiteAbschnitt = null; nachAenderung(true);
      }
      else if (a === 'zuruecksetzen') { const lang = berichtLang(); if (daten.bearbeitet[lang]) { delete daten.bearbeitet[lang][t.dataset.ab]; } nachAenderung(true); }
      else if (a === 'word') {
        if (!exportPruefen()) { return; }
        if (typeof dsWordExport === 'function') { dsWordExport(berichtLang()); }
        else if (typeof showToast === 'function') { showToast(U().wordFehlt); }
      }
      else if (a === 'drucken') { if (exportPruefen()) { drucken(berichtLang()); } }
    });
    el.addEventListener('keydown', function (ev) {
      const z = ev.target.closest && ev.target.closest('.dsa-aussage');
      if (!z || ev.target !== z || ev.altKey || ev.ctrlKey || ev.metaKey) { return; }
      if (/^[1-7]$/.test(ev.key)) { ev.preventDefault(); setzeBewertung(z, +ev.key); naechsteAussage(z, 1); }
      else if (ev.key === '0' || ev.key === 'Delete' || ev.key === 'Backspace') { ev.preventDefault(); setzeBewertung(z, 0); }
      else if (ev.key === 'ArrowDown') { ev.preventDefault(); naechsteAussage(z, 1); }
      else if (ev.key === 'ArrowUp') { ev.preventDefault(); naechsteAussage(z, -1); }
      else if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
        ev.preventDefault();
        const r = daten.bewertungen[z.dataset.id] || (ev.key === 'ArrowRight' ? 0 : 8);
        setzeBewertung(z, Math.max(1, Math.min(7, r + (ev.key === 'ArrowRight' ? 1 : -1))));
      }
    });
    const eingabe = function (ev, fertig) {
      const t = ev.target;
      if (t.name === 'dsa-geschlecht') { daten.geschlecht = t.value; nachAenderung(true); return; }
      let neu = false;
      if (t.dataset.f) {
        const k = t.dataset.f;
        const v = t.type === 'checkbox' ? t.checked : t.value;
        if (v === '' || v === false) { delete daten.f[k]; } else { daten.f[k] = v; }
        neu = fertig && t.tagName === 'SELECT';
      } else if (t.dataset.frei) {
        if (String(t.value).trim()) { daten.frei[t.dataset.frei] = t.value; } else { delete daten.frei[t.dataset.frei]; }
      } else if (t.dataset.fmap) {
        const m = daten.f[t.dataset.fmap] || (daten.f[t.dataset.fmap] = {});
        if (t.value.trim()) { m[t.dataset.k] = t.value; } else { delete m[t.dataset.k]; }
      } else if (t.dataset.tab) {
        const z = (daten.tabellen[t.dataset.tab] || [])[+t.dataset.i];
        if (z) { z[t.dataset.s] = t.value; }
      } else if (t.dataset.beob != null) {
        const b = (daten.f.beobachtungen || [])[+t.dataset.beob];
        if (b) { b[t.dataset.s] = t.value; }
      } else { return; }
      nachAenderung(neu);
    };
    el.addEventListener('input', function (ev) { if (ev.target.tagName !== 'SELECT' && ev.target.type !== 'radio' && ev.target.type !== 'checkbox') { eingabe(ev, false); } });
    el.addEventListener('change', function (ev) { if (ev.target.tagName === 'SELECT' || ev.target.type === 'radio' || ev.target.type === 'checkbox') { eingabe(ev, true); } });
  }
  function findeFeld(pruef) {
    let treffer = null;
    DS_SCHRITTE.forEach(function (s) { s.felder.forEach(function such(fd) { if (fd.typ === 'reihe') { fd.felder.forEach(such); } else if (!treffer && pruef(fd)) { treffer = fd; } }); });
    return treffer;
  }
  function sprachWechsel() {
    berichtSprache = null; bearbeiteAbschnitt = null;
    const nav = document.querySelector('.main-nav-item[data-bereich="ds"] span:last-child');
    if (nav) { nav.textContent = U().nav; }
    if (sichtbar()) { rendern(); }
  }

  return { get: get, laden: laden, zeigen: zeigen, profil: profil, fertig: fertig, raster: raster, drucken: drucken, sprachWechsel: sprachWechsel, bloeckeZuText: bloeckeZuText,
    exportPruefen: exportPruefen, nachGeschlecht: nachGeschlecht };
})();

// Schnittstellen für Speichern/Laden (50-speichern.js, 90-schueler.js)
function getDSData() { return DsAssistent.get(); }
function loadDSData(d) { DsAssistent.laden(d); }
function dsEldibProfil(lang) { return DsAssistent.profil(lang); }
// Knopf im Bereich Export (mit derselben Prüfliste wie im DS-Schritt „Vorschau & Export“)
function dsExportAusExport() {
  if (typeof dsWordExport === 'function') { if (DsAssistent.exportPruefen()) { dsWordExport(state.language); } } else { showMainSection('ds'); }
}

// Name aufteilen "Nachname, Vorname" (wird auch von den PEI-Dokumenten genutzt)
function splitSchuelerName(fullName) {
  if (!fullName) { return { nachname: '', vorname: '' }; }
  if (fullName.includes(',')) {
    const parts = fullName.split(',');
    return { nachname: (parts[0] || '').trim(), vorname: parts.slice(1).join(',').trim() };
  }
  // Ohne Komma: erstes Wort = Nachname (luxemburgische Schreibweise)
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) { return { nachname: parts[0], vorname: '' }; }
  return { nachname: parts[0], vorname: parts.slice(1).join(' ') };
}
