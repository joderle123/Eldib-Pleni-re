const ITEM_COUNTS = { verhalten: 33, kommunikation: 35, sozialisation: 41, kognition: 62 };

// State Management
const state = {
    language: 'de',
    selections: {},
    zusaetzlicheZiele: {
        demarches_mentales: {},      // { goalId: 'erreicht' | 'ziel' }
        manieres_apprendre: {},
        attitudes_relationnelles: {},
        attitudes_affectives: {},
        competences_essentielles: {},
        culture_loisirs: {}
    }
};

// UI Translation strings
const UI_STRINGS = {
    de: {
        subtitle: 'Entwicklungstherapeutischer/entwicklungspädagogischer Lernziel-Diagnose-Bogen',
        stammdaten: 'Stammdaten', eldibBewertung: 'ELDiB Auswertung', export: 'Export',
        stammdatenTitle: 'Stammdaten', stammdatenTooltip: 'Schülerdaten eingeben',
        eldibTooltip: 'ELDiB-Auswertung durchführen', exportTooltip: 'Dokumente exportieren',
        verhalten: 'Verhalten', kommunikation: 'Kommunikation', sozialisation: 'Sozialisation', kognition: 'Kognition',
        zusaetzlicheZiele: 'Zusätzliche Ziele',
        schuelerInfo: 'Schüler-Informationen', nameLabel: 'Name des Kindes/Jugendlichen', namePlaceholder: 'Nachname, Vorname',
        geburtsdatum: 'Geburtsdatum', matricule: 'Matricule',
        foerderort: 'Förderort / Schule', foerderortPlaceholder: 'Schule/Lycée',
        klasse: 'Klasse/Cycle', klassePlaceholder: 'z.B. C2.1',
        schuljahr: 'Schuljahr', schuljahrPlaceholder: 'z.B. 2025/2026',
        periodentyp: 'Periodentyp', trimester: 'Trimester', semester: 'Semester',
        einschaetzungsdatum: 'Datum der Einschätzung',
        einschaetzende: 'Einschätzende Person(en)', einschaetzendeName: 'Name und Funktion',
        einschaetzendePlaceholder: 'Namen und Funktionen der einschätzenden Personen',
        kontaktdaten: 'Kontaktdaten Erziehungsberechtigte',
        elternName: 'Erziehungsberechtigte/r 1 - Name', telefon: 'Telefon', email: 'E-Mail',
        weiter: 'Weiter zu ELDiB Auswertung',
        bereich: 'Bereich', bis: 'bis',
        exportTitle: 'Dokumente exportieren',
        peiTitle: 'Plan éducatif individualisé (PEI) generieren',
        peiDesc: 'Das PEI-Dokument enthält alle ausgewählten Ziele mit den entsprechenden Ich-Zielformulierungen.',
        peiBtn: 'Plan éducatif individualisé (PEI) herunterladen (Word)',
        peiSchlankTitle: 'PEI – Schlanke Version (nur ELDiB-Tabellen)',
        peiSchlankDesc: 'Reduzierte Version mit ausschließlich den ELDiB-Tabellen (Ziele pro Bereich mit Zielformulierungen). Ohne Anamnese und Interventionen — diese ergänzen Sie selbst.',
        peiSchlankBtn: 'Schlanke ELDiB-Tabellen herunterladen (Word)',
        compTitle: 'Complement generieren',
        compDesc: 'Das Complement-Dokument enthält die letzten 4 erreichten Items pro Bereich.',
        compBtn: 'Complement herunterladen (Word)',
        dsTitle: 'Diagnostic Spécialisé (DS)',
        dsDesc: 'Der Bericht entsteht im Schritt „DS-Bericht“. Hier laden Sie ihn direkt als Word-Datei herunter.',
        dsBtn: 'DS herunterladen (Word)', dsZumAssistenten: 'Zum DS-Assistenten', dsNavTooltip: 'Spezialisierte Diagnostik Schritt für Schritt',
        saveTitle: 'Daten speichern/laden',
        saveDesc: 'Speichern Sie Ihre Eingaben als JSON-Datei, um sie später fortzusetzen.',
        saveBtn: 'Daten speichern', loadBtn: 'Daten laden',
        resetTitle: 'Schüler.in anlegen',
        resetDesc: 'Alle Eingaben löschen und mit einem neuen Schüler.in beginnen. Diese Aktion kann nicht rückgängig gemacht werden!',
        resetBtn: 'Alle Daten zurücksetzen',
        itemDetails: 'Item-Details', beobachtungsbeispiele: 'Beobachtungsbeispiele:',
        itemHint: 'Tipp: Diese Beispiele helfen bei der Einschätzung, ob das Verhalten erreicht, nicht erreicht oder als Ziel definiert werden sollte.',
        erreicht: 'Erreicht', ziel: 'Ziel', nichtErreicht: 'Nicht erreicht',
        zielBtn: '⚡ Ziel', teilweiseBtn: '🤝 Teilweise', erreichtBtn: '✓ Erreicht',
        interventionen: 'Interventionen',
        zielformulierung: 'Zielformulierung',
        moeglicheUmsetzung: 'Mögliche Umsetzung',
        mitUnterstuetzung: 'Mit Unterstützung',
        trimester1: 'Trimester 1', trimester2: 'Trimester 2', trimester3: 'Trimester 3',
        semester1: 'Semester 1', semester2: 'Semester 2',
        // Stammdaten-Gruppen, Alter
        persoenlicheDaten: 'Persönliche Daten', schulinformationen: 'Schulinformationen', zeitraum: 'Einschätzungszeitraum',
        jahr: 'Jahr', jahre: 'Jahre',
        // "Weiter"-Knöpfe unter den Reitern
        weiterKommunikation: 'Weiter zu Kommunikation', weiterSozialisation: 'Weiter zu Sozialisation',
        weiterKognition: 'Weiter zu Kognition', weiterZusatz: 'Zu den zusätzlichen Zielen', weiterExport: 'Weiter zum Export',
        // Zusätzliche Ziele
        zusatzTitel: 'Zusätzliche Förderziele',
        zusatzIntro: 'Wählen Sie zusätzliche Ziele aus den verschiedenen Kategorien. Diese werden automatisch in PEI und Complément eingefügt.',
        katDemarches: 'Démarches mentales', katManieres: 'Manières d\'apprendre', katRelationnelles: 'Attitudes relationnelles',
        katAffectives: 'Attitudes affectives', katCompetences: 'Compétences essentielles', katCulture: 'Culture et loisirs',
        inArbeit: 'In Arbeit',
        // Kopfleiste im Editor
        zurueckUebersicht: '← Zurück zur Übersicht', speichern: '💾 Speichern', gespeichert: '✓ Gespeichert!',
        einschaetzungNr: '{n}. Einschätzung',
        // Export: Schüler-Übersicht
        uebersichtTitle: 'Schüler-Übersicht',
        uebersichtDesc: 'Zurück zur Übersicht aller Schüler.innen, um eine andere Einschätzung zu öffnen oder eine.n neue.n Schüler.in anzulegen.',
        uebersichtBtn: 'Zur Schüler-Übersicht',
        // Meldungen
        stufeZurueckgesetzt: 'Stufe {n} zurückgesetzt', itemsErreicht: '{n} Items als erreicht markiert',
        speicherFehler: 'Fehler beim Speichern! Möglicherweise ist der Speicher voll. Bitte exportieren Sie Ihre Daten als JSON-Backup.',
        fehler: 'Fehler: ',
        resetFrage: 'Sind Sie sicher, dass Sie alle Daten löschen möchten?\n\nAlle Schülerdaten und Auswahlen werden unwiderruflich gelöscht!',
        resetFertig: 'Alle Daten wurden gelöscht',
        keineErreichten: 'Keine erreichten Items',
        // Schüler-Manager (Startseite)
        smNeu: '+ Neuen Schüler anlegen', smLeer: 'Noch keine Schüler angelegt',
        smLeerHinweis: 'Klicken Sie auf "+ Neuen Schüler anlegen", um zu beginnen.',
        smKlasse: 'Klasse', smLoeschen: 'Schüler löschen', smDatenVorhanden: 'Daten vorhanden', smNochLeer: 'Noch leer',
        smDialogTitel: 'Neuen Schüler anlegen', smNachname: 'Nachname', smVorname: 'Vorname',
        smPflichtfelder: 'Pflichtfelder', smAbbrechen: 'Abbrechen', smAnlegen: 'Anlegen', smAlter: 'Alter: {n}',
        smPflichtFehlt: 'Bitte folgende Pflichtfelder ausfüllen:',
        smLoeschenFrage: '"{name}" wirklich löschen?\n\nAlle Einschätzungen dieses Schülers werden unwiderruflich gelöscht!',
        smImportiert: '{n} Schüler importiert', smEinzelnImportiert: '"{name}" importiert',
        smFormatUnbekannt: 'Unbekanntes Dateiformat.', smImportFehler: 'Fehler beim Import: ',
        smKeineSchueler: 'Keine Schüler zum Exportieren vorhanden.'
    },
    fr: {
        subtitle: 'Fiche de diagnostic pour les objectifs éducatifs de la thérapie de développement',
        stammdaten: 'Données de base', eldibBewertung: 'Évaluation ELDiB', export: 'Exportation',
        stammdatenTitle: 'Données de base', stammdatenTooltip: 'Saisir les données de l\'élève',
        eldibTooltip: 'Effectuer l\'évaluation ELDiB', exportTooltip: 'Exporter les documents',
        verhalten: 'Comportement', kommunikation: 'Communication', sozialisation: 'Socialisation', kognition: 'Cognition',
        zusaetzlicheZiele: 'Objectifs supplémentaires',
        schuelerInfo: 'Informations sur l\'élève', nameLabel: 'Nom de l\'enfant/adolescent(e)', namePlaceholder: 'Nom, Prénom',
        geburtsdatum: 'Date de naissance', matricule: 'Matricule',
        foerderort: 'Lieu de prise en charge / École', foerderortPlaceholder: 'École/Lycée',
        klasse: 'Classe/Cycle', klassePlaceholder: 'p.ex. C2.1',
        schuljahr: 'Année scolaire', schuljahrPlaceholder: 'p.ex. 2025/2026',
        periodentyp: 'Type de période', trimester: 'Trimestre', semester: 'Semestre',
        einschaetzungsdatum: 'Date de l\'évaluation',
        einschaetzende: 'Personne(s) évaluatrice(s)', einschaetzendeName: 'Nom et fonction',
        einschaetzendePlaceholder: 'Noms et fonctions des personnes évaluatrices',
        kontaktdaten: 'Coordonnées des responsables légaux',
        elternName: 'Responsable légal 1 - Nom', telefon: 'Téléphone', email: 'E-mail',
        weiter: 'Continuer vers l\'évaluation ELDiB',
        bereich: 'Domaine', bis: 'à',
        exportTitle: 'Exporter les documents',
        peiTitle: 'Générer le Plan éducatif individualisé (PEI)',
        peiDesc: 'Le document PEI contient tous les objectifs sélectionnés avec les formulations d\'objectifs correspondantes.',
        peiBtn: 'Télécharger le Plan éducatif individualisé (PEI) (Word)',
        peiSchlankTitle: 'PEI – Version allégée (uniquement les tableaux ELDiB)',
        peiSchlankDesc: 'Version réduite contenant uniquement les tableaux ELDiB (objectifs par domaine avec formulations). Sans anamnèse ni interventions — à compléter vous-même.',
        peiSchlankBtn: 'Télécharger les tableaux ELDiB allégés (Word)',
        compTitle: 'Générer le Complément',
        compDesc: 'Le document Complément contient les 4 derniers items atteints par domaine.',
        compBtn: 'Télécharger le Complément (Word)',
        dsTitle: 'Diagnostic spécialisé (DS)',
        dsDesc: 'Le rapport se rédige à l\'étape « Rapport DS ». Ici, vous le téléchargez directement en fichier Word.',
        dsBtn: 'Télécharger le DS (Word)', dsZumAssistenten: 'Vers l\'assistant DS', dsNavTooltip: 'Diagnostic spécialisé étape par étape',
        saveTitle: 'Sauvegarder/charger les données',
        saveDesc: 'Sauvegardez vos saisies dans un fichier JSON pour les reprendre plus tard.',
        saveBtn: 'Sauvegarder les données', loadBtn: 'Charger les données',
        resetTitle: 'Créer un nouvel élève',
        resetDesc: 'Effacer toutes les saisies et recommencer avec un nouvel élève. Cette action est irréversible !',
        resetBtn: 'Réinitialiser toutes les données',
        itemDetails: 'Détails de l\'item', beobachtungsbeispiele: 'Exemples d\'observation :',
        itemHint: 'Conseil : Ces exemples aident à évaluer si le comportement est atteint, non atteint ou à définir comme objectif.',
        erreicht: 'Atteint', ziel: 'Objectif', nichtErreicht: 'Non atteint',
        zielBtn: '⚡ Objectif', teilweiseBtn: '🤝 Partiel', erreichtBtn: '✓ Atteint',
        interventionen: 'Interventions',
        zielformulierung: 'Formulation de l\'objectif',
        moeglicheUmsetzung: 'Mise en œuvre possible',
        mitUnterstuetzung: 'Avec soutien',
        trimester1: 'Trimestre 1', trimester2: 'Trimestre 2', trimester3: 'Trimestre 3',
        semester1: 'Semestre 1', semester2: 'Semestre 2',
        persoenlicheDaten: 'Données personnelles', schulinformationen: 'Informations scolaires', zeitraum: 'Période d\'évaluation',
        jahr: 'an', jahre: 'ans',
        weiterKommunikation: 'Continuer vers Communication', weiterSozialisation: 'Continuer vers Socialisation',
        weiterKognition: 'Continuer vers Cognition', weiterZusatz: 'Continuer vers les objectifs supplémentaires', weiterExport: 'Continuer vers l\'exportation',
        zusatzTitel: 'Objectifs supplémentaires',
        zusatzIntro: 'Choisissez des objectifs supplémentaires dans les différentes catégories. Ils sont insérés automatiquement dans le PEI et le Complément.',
        katDemarches: 'Démarches mentales', katManieres: 'Manières d\'apprendre', katRelationnelles: 'Attitudes relationnelles',
        katAffectives: 'Attitudes affectives', katCompetences: 'Compétences essentielles', katCulture: 'Culture et loisirs',
        inArbeit: 'En cours',
        zurueckUebersicht: '← Retour à la liste', speichern: '💾 Enregistrer', gespeichert: '✓ Enregistré !',
        einschaetzungNr: 'Évaluation {n}',
        uebersichtTitle: 'Liste des élèves',
        uebersichtDesc: 'Retour à la liste de tous les élèves pour ouvrir une autre évaluation ou ajouter un nouvel élève.',
        uebersichtBtn: 'Vers la liste des élèves',
        stufeZurueckgesetzt: 'Stade {n} réinitialisé', itemsErreicht: '{n} items marqués comme atteints',
        speicherFehler: 'Erreur lors de l\'enregistrement ! La mémoire est peut-être pleine. Veuillez exporter vos données en fichier JSON de sauvegarde.',
        fehler: 'Erreur : ',
        resetFrage: 'Voulez-vous vraiment supprimer toutes les données ?\n\nToutes les données de l\'élève et toutes les sélections seront définitivement supprimées !',
        resetFertig: 'Toutes les données ont été supprimées',
        keineErreichten: 'Aucun item atteint',
        smNeu: '+ Ajouter un élève', smLeer: 'Aucun élève pour l\'instant',
        smLeerHinweis: 'Cliquez sur « + Ajouter un élève » pour commencer.',
        smKlasse: 'Classe', smLoeschen: 'Supprimer l\'élève', smDatenVorhanden: 'Données disponibles', smNochLeer: 'Pas encore commencée',
        smDialogTitel: 'Ajouter un élève', smNachname: 'Nom', smVorname: 'Prénom',
        smPflichtfelder: 'Champs obligatoires', smAbbrechen: 'Annuler', smAnlegen: 'Créer', smAlter: 'Âge : {n}',
        smPflichtFehlt: 'Veuillez remplir les champs obligatoires suivants :',
        smLoeschenFrage: 'Supprimer vraiment « {name} » ?\n\nToutes les évaluations de cet élève seront définitivement supprimées !',
        smImportiert: '{n} élève(s) importé(s)', smEinzelnImportiert: '« {name} » importé',
        smFormatUnbekannt: 'Format de fichier inconnu.', smImportFehler: 'Erreur lors de l\'importation : ',
        smKeineSchueler: 'Aucun élève à exporter.'
    },
    en: {
        subtitle: 'Developmental Teaching Objectives Rating Form – Revised (DTORF-R)',
        stammdaten: 'Student data', eldibBewertung: 'DTORF-R Assessment', export: 'Export',
        stammdatenTitle: 'Student data', stammdatenTooltip: 'Enter student data',
        eldibTooltip: 'Perform DTORF-R assessment', exportTooltip: 'Export documents',
        verhalten: 'Behavior', kommunikation: 'Communication', sozialisation: 'Socialization', kognition: 'Academics/Cognition',
        zusaetzlicheZiele: 'Additional goals',
        schuelerInfo: 'Student information', nameLabel: 'Name of the child/adolescent', namePlaceholder: 'Last name, First name',
        geburtsdatum: 'Date of birth', matricule: 'ID number',
        foerderort: 'School / placement', foerderortPlaceholder: 'School/Institution',
        klasse: 'Class/Cycle', klassePlaceholder: 'e.g. C2.1',
        schuljahr: 'School year', schuljahrPlaceholder: 'e.g. 2025/2026',
        periodentyp: 'Period type', trimester: 'Trimester', semester: 'Semester',
        einschaetzungsdatum: 'Assessment date',
        einschaetzende: 'Rater(s)', einschaetzendeName: 'Name and function',
        einschaetzendePlaceholder: 'Names and functions of the raters',
        kontaktdaten: 'Legal guardian contact details',
        elternName: 'Legal guardian 1 - Name', telefon: 'Phone', email: 'Email',
        weiter: 'Continue to DTORF-R assessment',
        bereich: 'Domain', bis: 'to',
        exportTitle: 'Export documents',
        peiTitle: 'Generate Individualized Education Plan (IEP)',
        peiDesc: 'The IEP document contains all selected goals with the corresponding I-statement goal formulations.',
        peiBtn: 'Download Individualized Education Plan (IEP) (Word)',
        peiSchlankTitle: 'IEP – Lean version (DTORF-R tables only)',
        peiSchlankDesc: 'Reduced version containing only the DTORF-R tables (goals per domain with formulations). Without anamnesis or interventions — you fill these in yourself.',
        peiSchlankBtn: 'Download lean DTORF-R tables (Word)',
        compTitle: 'Generate Complement',
        compDesc: 'The Complement document contains the last 4 mastered items per domain.',
        compBtn: 'Download Complement (Word)',
        dsTitle: 'Specialized Diagnostic Assessment (DS)',
        dsDesc: 'The report is written in the “DS report” step. Download it here directly as a Word file.',
        dsBtn: 'Download DS (Word)', dsZumAssistenten: 'To the DS assistant', dsNavTooltip: 'Specialized diagnostic assessment step by step',
        saveTitle: 'Save/load data',
        saveDesc: 'Save your entries as a JSON file to resume them later.',
        saveBtn: 'Save data', loadBtn: 'Load data',
        resetTitle: 'Create new student',
        resetDesc: 'Erase all entries and start over with a new student. This action cannot be undone!',
        resetBtn: 'Reset all data',
        itemDetails: 'Item details', beobachtungsbeispiele: 'Observation examples:',
        itemHint: 'Tip: These examples help evaluate whether the behavior is mastered, not yet mastered, or should be defined as a goal.',
        erreicht: 'Mastered', ziel: 'Goal', nichtErreicht: 'Not mastered',
        zielBtn: '⚡ Goal', teilweiseBtn: '🤝 Partial', erreichtBtn: '✓ Mastered',
        interventionen: 'Interventions',
        zielformulierung: 'Goal formulation',
        moeglicheUmsetzung: 'Possible implementation',
        mitUnterstuetzung: 'With support',
        trimester1: 'Trimester 1', trimester2: 'Trimester 2', trimester3: 'Trimester 3',
        semester1: 'Semester 1', semester2: 'Semester 2',
        persoenlicheDaten: 'Personal data', schulinformationen: 'School information', zeitraum: 'Assessment period',
        jahr: 'year', jahre: 'years',
        weiterKommunikation: 'Continue to Communication', weiterSozialisation: 'Continue to Socialization',
        weiterKognition: 'Continue to Academics/Cognition', weiterZusatz: 'Continue to additional goals', weiterExport: 'Continue to export',
        zusatzTitel: 'Additional goals',
        zusatzIntro: 'Select additional goals from the different categories. They are automatically included in the IEP and the Complement.',
        katDemarches: 'Cognitive strategies', katManieres: 'Learning approaches', katRelationnelles: 'Relational attitudes',
        katAffectives: 'Emotional attitudes', katCompetences: 'Essential competencies', katCulture: 'Culture and leisure',
        inArbeit: 'In progress',
        zurueckUebersicht: '← Back to overview', speichern: '💾 Save', gespeichert: '✓ Saved!',
        einschaetzungNr: 'Assessment {n}',
        uebersichtTitle: 'Student overview',
        uebersichtDesc: 'Back to the list of all students to open another assessment or to add a new student.',
        uebersichtBtn: 'To the student overview',
        stufeZurueckgesetzt: 'Stage {n} reset', itemsErreicht: '{n} items marked as mastered',
        speicherFehler: 'Error while saving! The storage may be full. Please export your data as a JSON backup.',
        fehler: 'Error: ',
        resetFrage: 'Are you sure you want to delete all data?\n\nAll student data and selections will be permanently deleted!',
        resetFertig: 'All data has been deleted',
        keineErreichten: 'No mastered items',
        smNeu: '+ Add new student', smLeer: 'No students yet',
        smLeerHinweis: 'Click "+ Add new student" to get started.',
        smKlasse: 'Class', smLoeschen: 'Delete student', smDatenVorhanden: 'Data available', smNochLeer: 'Not started yet',
        smDialogTitel: 'Add new student', smNachname: 'Last name', smVorname: 'First name',
        smPflichtfelder: 'Required fields', smAbbrechen: 'Cancel', smAnlegen: 'Create', smAlter: 'Age: {n}',
        smPflichtFehlt: 'Please fill in the following required fields:',
        smLoeschenFrage: 'Really delete "{name}"?\n\nAll assessments of this student will be permanently deleted!',
        smImportiert: '{n} student(s) imported', smEinzelnImportiert: '"{name}" imported',
        smFormatUnbekannt: 'Unknown file format.', smImportFehler: 'Import error: ',
        smKeineSchueler: 'No students to export.'
    }
};

function t(key) { return UI_STRINGS[state.language][key] || UI_STRINGS.de[key] || key; }
// Text mit Platzhaltern, z.B. tf('stufeZurueckgesetzt', { n: 2 })
function tf(key, werte) {
    let s = t(key);
    for (const [k, v] of Object.entries(werte || {})) s = s.split('{' + k + '}').join(String(v));
    return s;
}
// Alter mit Einheit in der aktuellen Sprache ("10 Jahre" / "10 ans" / "10 years")
function alterText(alter) {
    return alter + ' ' + (alter === 1 ? t('jahr') : t('jahre'));
}

// Datum aus dem Datumsfeld (JJJJ-MM-TT) für Anzeige und Dokumente formatieren:
// DE TT.MM.JJJJ, FR und EN TT/MM/JJJJ. Andere Eingaben bleiben unverändert.
function eldibDatum(wert, lang) {
    if (!wert) return '';
    const m = String(wert).trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return String(wert);
    const sprache = lang || state.language;
    return sprache === 'de' ? `${m[3]}.${m[2]}.${m[1]}` : `${m[3]}/${m[2]}/${m[1]}`;
}

// Gewählte Oberflächensprache für die Schülerübersicht und neue Einschätzungen merken
// (eigener Schlüssel; die gespeicherten Einschätzungen bleiben unverändert)
const UI_SPRACHE_KEY = 'eldib-ui-sprache';
function merkeUiSprache(lang) {
    try { localStorage.setItem(UI_SPRACHE_KEY, lang); } catch (e) { /* nicht kritisch */ }
}
function gemerkteUiSprache() {
    try {
        const l = localStorage.getItem(UI_SPRACHE_KEY);
        return (l === 'fr' || l === 'en') ? l : 'de';
    } catch (e) { return 'de'; }
}

// Mapping der deutschen Bereich-Codes auf die französischen / englischen Anzeige-Codes
const BEREICH_CODE_FR_MAP = { 'V': 'COMP', 'K': 'COM', 'SOZ': 'SOC', 'KOG': 'COG' };
const BEREICH_CODE_EN_MAP = { 'V': 'BEH',  'K': 'COM', 'SOZ': 'SOC', 'KOG': 'COG' };

// Wandelt einen Item-Code je nach UI-Sprache in die Anzeigeform um.
// Beispiel: getDisplayCode("V-10") -> "V-10" (de) / "COMP-10" (fr) / "BEH-10" (en)
function getDisplayCode(code, lang) {
    const language = lang || state.language;
    if (!code || (language !== 'fr' && language !== 'en')) return code;
    const parts = String(code).split('-');
    const map = language === 'fr' ? BEREICH_CODE_FR_MAP : BEREICH_CODE_EN_MAP;
    const mapped = map[parts[0]];
    if (!mapped) return code;
    return parts.length > 1 ? `${mapped}-${parts.slice(1).join('-')}` : mapped;
}
function getCurrentEldibData() {
    if (state.language === 'fr' && typeof ELDIB_DATA_FR !== 'undefined') return ELDIB_DATA_FR;
    if (state.language === 'en' && typeof ELDIB_DATA_EN !== 'undefined') return ELDIB_DATA_EN;
    return ELDIB_DATA;
}
function getCurrentInterventionen() {
    if (state.language === 'fr' && typeof INTERVENTIONEN_FR !== 'undefined') return INTERVENTIONEN_FR;
    if (state.language === 'en' && typeof INTERVENTIONEN_EN !== 'undefined') return INTERVENTIONEN_EN;
    return INTERVENTIONEN;
}
function getCurrentInterventionenFallback() {
    if (state.language === 'fr' && typeof INTERVENTIONEN_FALLBACK_FR !== 'undefined') return INTERVENTIONEN_FALLBACK_FR;
    if (state.language === 'en' && typeof INTERVENTIONEN_FALLBACK_EN !== 'undefined') return INTERVENTIONEN_FALLBACK_EN;
    return INTERVENTIONEN_FALLBACK;
}
function getCurrentBeispiele() {
    if (state.language === 'fr' && typeof BEISPIELE_FR !== 'undefined') return BEISPIELE_FR;
    if (state.language === 'en' && typeof BEISPIELE_EN !== 'undefined') return BEISPIELE_EN;
    return BEISPIELE;
}
function getCurrentZusaetzlicheZiele() {
    if (state.language === 'fr' && typeof ZUSAETZLICHE_ZIELE_FR !== 'undefined') return ZUSAETZLICHE_ZIELE_FR;
    if (state.language === 'en' && typeof ZUSAETZLICHE_ZIELE_EN !== 'undefined') return ZUSAETZLICHE_ZIELE_EN;
    return ZUSAETZLICHE_ZIELE;
}
function getCurrentStufen() {
    if (state.language === 'fr') return STUFEN_ALTER_MAPPING_FR;
    if (state.language === 'en') return STUFEN_ALTER_MAPPING_EN;
    return STUFEN_ALTER_MAPPING;
}

// Sprachknöpfe (Editor-Kopf und Schülerübersicht) hervorheben
function markiereSprachKnoepfe(lang) {
    ['de', 'fr', 'en'].forEach(l => {
        ['lang-btn-' + l, 'sm-lang-btn-' + l].forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.classList.toggle('active', l === lang);
            btn.style.background = (l === lang) ? 'rgba(255,255,255,0.3)' : 'transparent';
            btn.style.color = (l === lang) ? 'white' : 'rgba(255,255,255,0.7)';
            btn.style.borderColor = (l === lang) ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)';
        });
    });
}

function switchLanguage(lang) {
    if (state.language === lang) return;
    state.language = lang;
    document.documentElement.lang = lang;

    // Update toggle buttons (de/fr/en)
    markiereSprachKnoepfe(lang);

    // Update all UI text
    updateUILanguage();

    // Re-render ELDiB items with current language data
    rerenderItems();

    // Re-render zusätzliche Ziele
    initializeZusaetzlicheZiele();

    // Restore selections for zusätzliche Ziele
    restoreZusatzSelections();

    // Hinweise (title) der gesperrten Ziel-Knöpfe in der neuen Sprache
    ['verhalten', 'kommunikation', 'sozialisation', 'kognition'].forEach(b => {
        const erstes = ELDIB_DATA[b]?.stufen?.[1]?.items?.[0];
        if (erstes) refreshBlockedButtonsInBereich(erstes.code);
    });

    // Schülerübersicht (Startseite) in der neuen Sprache
    if (typeof smRenderListe === 'function' && document.getElementById('sm-schueler-grid')) smRenderListe();

    // DS-Assistent in der neuen Sprache zeigen
    if (typeof DsAssistent !== 'undefined') DsAssistent.sprachWechsel();

    // Sprache für die Übersicht merken; Einschätzung nur speichern, wenn eine geöffnet ist
    if (!isLoadingData) {
        merkeUiSprache(lang);
        if (typeof smAktuellerSchueler === 'undefined' || smAktuellerSchueler) saveToLocalStorage();
    }
}

function updateUILanguage() {
    const data = getCurrentEldibData();

    // Header
    document.getElementById('header-subtitle').textContent = t('subtitle');

    // Fortschrittspunkte im Kopf (Tooltips)
    const dotTitel = { stammdaten: t('stammdaten'), eldib: t('eldibBewertung'), ds: 'DS', export: t('export') };
    document.querySelectorAll('.progress-dot').forEach(dot => {
        const titel = dotTitel[dot.dataset.section];
        if (titel) dot.title = titel;
    });

    // Feste Knöpfe im Editor und Kopf der Schülerübersicht
    const zurueckBtn = document.getElementById('backToManagerBtn');
    if (zurueckBtn) zurueckBtn.textContent = t('zurueckUebersicht');
    const speichernBtn = document.getElementById('saveBtn');
    if (speichernBtn && !speichernBtn.classList.contains('saved')) speichernBtn.textContent = t('speichern');
    if (typeof smZeigeAktuelleInfo === 'function') smZeigeAktuelleInfo();
    const smUntertitel = document.querySelector('#schueler-manager .sm-header p');
    if (smUntertitel) smUntertitel.textContent = t('subtitle');
    const smNeuBtn = document.querySelector('#schueler-manager .sm-actions .sm-btn-primary');
    if (smNeuBtn) smNeuBtn.textContent = t('smNeu');

    // Main nav
    const mainNavBtns = document.querySelectorAll('.main-nav .main-nav-item');
    if (mainNavBtns[0]) { mainNavBtns[0].querySelector('span:last-child').textContent = t('stammdaten'); mainNavBtns[0].title = t('stammdatenTooltip'); }
    if (mainNavBtns[1]) { mainNavBtns[1].querySelector('span:last-child').textContent = t('eldibBewertung'); mainNavBtns[1].title = t('eldibTooltip'); }
    if (mainNavBtns[2]) { mainNavBtns[2].querySelector('span:last-child').textContent = (DS_UI[state.language] || DS_UI.de).nav; mainNavBtns[2].title = t('dsNavTooltip'); }
    if (mainNavBtns[3]) { mainNavBtns[3].querySelector('span:last-child').textContent = t('export'); mainNavBtns[3].title = t('exportTooltip'); }

    // Sub nav
    const subNavBtns = document.querySelectorAll('.sub-nav .sub-nav-item');
    if (subNavBtns[0]) subNavBtns[0].textContent = t('verhalten');
    if (subNavBtns[1]) subNavBtns[1].textContent = t('kommunikation');
    if (subNavBtns[2]) subNavBtns[2].textContent = t('sozialisation');
    if (subNavBtns[3]) subNavBtns[3].textContent = t('kognition');
    if (subNavBtns[4]) subNavBtns[4].textContent = t('zusaetzlicheZiele');

    // Stammdaten form labels
    const stammdatenSection = document.getElementById('stammdaten');
    if (stammdatenSection) {
        const h3s = stammdatenSection.querySelectorAll('h3');
        if (h3s[0]) h3s[0].textContent = t('schuelerInfo');
        if (h3s[1]) h3s[1].textContent = t('einschaetzende');
        if (h3s[2]) h3s[2].textContent = t('kontaktdaten');

        // Überschriften der Feldgruppen
        const gruppen = { '.form-group-personal': 'persoenlicheDaten', '.form-group-school': 'schulinformationen', '.form-group-period': 'zeitraum' };
        for (const [sel, key] of Object.entries(gruppen)) {
            const el = stammdatenSection.querySelector(sel + ' .form-row-label');
            if (el) el.textContent = t(key);
        }

        // Labels
        const nameLabel = stammdatenSection.querySelector('label[for="schueler_name"]');
        if (nameLabel) nameLabel.textContent = t('nameLabel');
        const gebLabel = stammdatenSection.querySelector('label[for="geburtsdatum"]');
        if (gebLabel) {
            const alterAnzeige = document.getElementById('alter-anzeige');
            gebLabel.textContent = t('geburtsdatum') + ' ';
            if (alterAnzeige) {
                gebLabel.appendChild(alterAnzeige);
                const alter = getSchuelerAlter();
                if (alter !== null) alterAnzeige.textContent = alterText(alter);
            }
        }
        const matLabel = stammdatenSection.querySelector('label[for="matricule"]');
        if (matLabel) matLabel.textContent = t('matricule');
        const matInput = document.getElementById('matricule');
        if (matInput) matInput.placeholder = t('matricule');
        const foerderLabel = stammdatenSection.querySelector('label[for="foerderort"]');
        if (foerderLabel) foerderLabel.textContent = t('foerderort');
        const klasseLabel = stammdatenSection.querySelector('label[for="klasse"]');
        if (klasseLabel) klasseLabel.textContent = t('klasse');
        const schuljahrLabel = stammdatenSection.querySelector('label[for="schuljahr"]');
        if (schuljahrLabel) schuljahrLabel.textContent = t('schuljahr');
        const einschLabel = stammdatenSection.querySelector('label[for="einschaetzungsdatum"]');
        if (einschLabel) einschLabel.textContent = t('einschaetzungsdatum');
        const einschNameLabel = stammdatenSection.querySelector('label[for="einschaetzende"]');
        if (einschNameLabel) einschNameLabel.textContent = t('einschaetzendeName');
        const elternLabel = stammdatenSection.querySelector('label[for="eltern1_name"]');
        if (elternLabel) elternLabel.textContent = t('elternName');
        const telLabel = stammdatenSection.querySelector('label[for="eltern1_tel"]');
        if (telLabel) telLabel.textContent = t('telefon');
        const emailLabel = stammdatenSection.querySelector('label[for="eltern1_email"]');
        if (emailLabel) emailLabel.textContent = t('email');

        // Placeholders
        document.getElementById('schueler_name').placeholder = t('namePlaceholder');
        document.getElementById('foerderort').placeholder = t('foerderortPlaceholder');
        document.getElementById('klasse').placeholder = t('klassePlaceholder');
        document.getElementById('schuljahr').placeholder = t('schuljahrPlaceholder');
        document.getElementById('einschaetzende').placeholder = t('einschaetzendePlaceholder');

        // Period type label
        const periodenLabel = stammdatenSection.querySelector('.period-toggle')?.closest('.form-group')?.querySelector('label');
        if (periodenLabel) periodenLabel.textContent = t('periodentyp');
        document.getElementById('btn-trimester').textContent = t('trimester');
        document.getElementById('btn-semester').textContent = t('semester');

        // Period select (Trimester oder Semester, je nach Periodentyp)
        const periodeLabel = document.getElementById('periode-label');
        if (periodeLabel) periodeLabel.textContent = periodenTyp === 'semester' ? t('semester') : t('trimester');
        const periodeSelect = document.getElementById('periode');
        if (periodeSelect) {
            const praefix = periodenTyp === 'semester' ? 'semester' : 'trimester';
            Array.from(periodeSelect.options).forEach(opt => { opt.textContent = t(praefix + opt.value); });
        }

        // Weiter button
        const weiterBtn = stammdatenSection.querySelector('.btn-primary');
        if (weiterBtn) weiterBtn.innerHTML = t('weiter') + ' &rarr;';
    }

    // "Weiter"-Knöpfe unter den ELDiB-Reitern
    const weiterKnoepfe = { verhalten: 'weiterKommunikation', kommunikation: 'weiterSozialisation', sozialisation: 'weiterKognition', kognition: 'weiterZusatz', zusaetzlich: 'weiterExport' };
    for (const [tab, key] of Object.entries(weiterKnoepfe)) {
        const btn = document.querySelector(`#${tab} > .button-group .btn-primary`);
        if (btn) btn.textContent = t(key) + ' →';
    }

    // Reiter "Zusätzliche Ziele": Überschrift, Einleitung, Kategorien
    const zusatzIntro = document.querySelector('#zusaetzlich .zusaetzlich-intro');
    if (zusatzIntro) {
        const h2 = zusatzIntro.querySelector('h2'); if (h2) h2.textContent = t('zusatzTitel');
        const p = zusatzIntro.querySelector('p'); if (p) p.textContent = t('zusatzIntro');
    }
    const katTitel = { demarches_mentales: 'katDemarches', manieres_apprendre: 'katManieres', attitudes_relationnelles: 'katRelationnelles', attitudes_affectives: 'katAffectives', competences_essentielles: 'katCompetences', culture_loisirs: 'katCulture' };
    for (const [kat, key] of Object.entries(katTitel)) {
        const el = document.querySelector(`#section-${kat} .category-title`);
        if (el) el.textContent = t(key);
    }

    // Bereich-Notizen Labels und Placeholders
    const _lng = state.language;
    const notizenLabel = _lng === 'fr' ? 'Notes' : (_lng === 'en' ? 'Notes' : 'Notizen');
    const notizenBereiche = {
        verhalten:     _lng === 'fr' ? 'Notes sur le domaine Comportement...'           : (_lng === 'en' ? 'Notes on the Behavior domain...'                  : 'Notizen zum Bereich Verhalten...'),
        kommunikation: _lng === 'fr' ? 'Notes sur le domaine Communication...'           : (_lng === 'en' ? 'Notes on the Communication domain...'             : 'Notizen zum Bereich Kommunikation...'),
        sozialisation: _lng === 'fr' ? 'Notes sur le domaine Socialisation...'           : (_lng === 'en' ? 'Notes on the Socialization domain...'             : 'Notizen zum Bereich Sozialisation...'),
        kognition:     _lng === 'fr' ? 'Notes sur le domaine Cognition...'               : (_lng === 'en' ? 'Notes on the Academics/Cognition domain...'        : 'Notizen zum Bereich Kognition...'),
        zusaetzlich:   _lng === 'fr' ? 'Notes sur le domaine Objectifs supplémentaires...': (_lng === 'en' ? 'Notes on the Additional goals domain...'            : 'Notizen zum Bereich Zusätzliche Ziele...')
    };
    document.querySelectorAll('.notizen-label-text').forEach(el => el.textContent = notizenLabel);
    for (const [bereich, placeholder] of Object.entries(notizenBereiche)) {
        const textarea = document.getElementById(`notizen-${bereich}`);
        if (textarea) textarea.placeholder = placeholder;
    }

    // Export section
    const exportSection = document.getElementById('export');
    if (exportSection) {
        const h2 = exportSection.querySelector('h2');
        if (h2) h2.textContent = t('exportTitle');
        const sections = exportSection.querySelectorAll('.form-section');
        if (sections[0]) {
            sections[0].querySelector('h3').textContent = t('peiTitle');
            sections[0].querySelector('p').textContent = t('peiDesc');
            sections[0].querySelector('button').textContent = t('peiBtn');
        }
        // Section 1 = neue "schlanke" PEI-Version (zwischen PEI und Complement eingefügt)
        if (sections[1]) {
            const h3 = sections[1].querySelector('h3');
            const p = sections[1].querySelector('p');
            const btn = sections[1].querySelector('button');
            if (h3) h3.textContent = t('peiSchlankTitle');
            if (p) p.textContent = t('peiSchlankDesc');
            if (btn) btn.textContent = t('peiSchlankBtn');
        }
        if (sections[2]) {
            sections[2].querySelector('h3').textContent = t('compTitle');
            sections[2].querySelector('p').textContent = t('compDesc');
            sections[2].querySelector('button').textContent = t('compBtn');
        }
        if (sections[3]) {
            sections[3].querySelector('h3').textContent = t('dsTitle');
            sections[3].querySelector('p').textContent = t('dsDesc');
            sections[3].querySelector('button').textContent = t('dsBtn');
            const zumDs = document.getElementById('ds-zum-assistenten');
            if (zumDs) zumDs.textContent = t('dsZumAssistenten');
        }
        // Section 4 = Zurück zur Schüler-Übersicht
        if (sections[4]) {
            const h3 = sections[4].querySelector('h3');
            const p = sections[4].querySelector('p');
            const btn = sections[4].querySelector('button');
            if (h3) h3.textContent = t('uebersichtTitle');
            if (p) p.textContent = t('uebersichtDesc');
            if (btn) btn.textContent = t('uebersichtBtn');
        }
    }

    // Disclaimer
    const disclaimerTitle = document.getElementById('disclaimer-title');
    const disclaimerText = document.getElementById('disclaimer-text');
    if (disclaimerTitle) {
        disclaimerTitle.textContent = state.language === 'fr' ? 'Note relative à la vérification des documents'
            : (state.language === 'en' ? 'Note on document verification' : 'Hinweis zur Dokumentenprüfung');
    }
    if (disclaimerText) {
        const fr = 'Les documents générés ci-dessous sont créés automatiquement sur la base de vos saisies. Cet outil constitue une <strong>aide au travail</strong> — la responsabilité professionnelle quant à l\'exactitude et l\'exhaustivité de toutes les indications incombe aux collaborateurs/-trices signataires. Veuillez vérifier soigneusement chaque document avant son officialisation.';
        const en = 'The documents generated below are created automatically based on your entries. This tool serves as a <strong>working aid</strong> — the professional responsibility for the accuracy and completeness of all information lies with the signing staff. Please carefully review each document before finalization.';
        const de = 'Die nachfolgend generierten Dokumente werden automatisch auf Basis Ihrer Eingaben erstellt. Dieses Instrument dient als <strong>Arbeitshilfe</strong> — die fachliche Verantwortung für Richtigkeit und Vollständigkeit aller Angaben liegt bei den unterzeichnenden Mitarbeiter:innen. Bitte prüfen Sie jedes Dokument sorgfältig vor der Finalisierung.';
        disclaimerText.innerHTML = state.language === 'fr' ? fr : (state.language === 'en' ? en : de);
    }

    // Modal
    const modalTitle = document.querySelector('.item-modal-header h3');
    if (modalTitle) modalTitle.textContent = t('itemDetails');
    const examplesHeader = document.querySelector('.examples-header');
    if (examplesHeader) examplesHeader.textContent = t('beobachtungsbeispiele');
    const modalHint = document.querySelector('.item-modal-hint');
    if (modalHint) modalHint.textContent = t('itemHint');
}

function rerenderItems() {
    const data = getCurrentEldibData();
    const isFR = state.language === 'fr';
    const isEN = state.language === 'en';
    const btnLabels = isEN
        ? { erreicht: 'Mastered', nichtErreicht: 'Not mastered', ziel: 'Goal', alleErreicht: 'All mastered', bereichsziel: 'Domain goal', zielformulierung: 'Goal formulation:', placeholder: 'Or custom formulation...' }
        : (isFR
            ? { erreicht: 'Atteint', nichtErreicht: 'Non atteint', ziel: 'Objectif', alleErreicht: 'Tous atteints', bereichsziel: 'Objectif du domaine', zielformulierung: 'Formulation de l\'objectif :', placeholder: 'Ou formulation personnelle...' }
            : { erreicht: 'Erreicht', nichtErreicht: 'Nicht erreicht', ziel: 'Ziel', alleErreicht: 'Alle erreicht', bereichsziel: 'Bereichsziel', zielformulierung: 'Zielformulierung:', placeholder: 'Oder eigene Formulierung...' });

    const domainWord = isEN ? 'Domain ' : (isFR ? 'Domaine ' : 'Bereich ');
    const toWord = isEN ? 'to' : (isFR ? 'à' : 'bis');

    const texte = itemTexte();
    const beispiele = getCurrentBeispiele();

    for (const [bereichKey, bereich] of Object.entries(data)) {
        // Update Bereich headers
        const header = document.querySelector(`#${bereichKey} .bereich-header h2`);
        if (header) header.textContent = domainWord + bereich.name;
        const headerP = document.querySelector(`#${bereichKey} .bereich-header p`);
        let displayBereichCode = bereich.code;
        if (isFR) displayBereichCode = BEREICH_CODE_FR_MAP[bereich.code] || bereich.code;
        else if (isEN) displayBereichCode = BEREICH_CODE_EN_MAP[bereich.code] || bereich.code;
        if (headerP) headerP.textContent = displayBereichCode + '-1 ' + toWord + ' ' + displayBereichCode + '-' + Object.values(bereich.stufen).reduce((sum, s) => sum + s.items.length, 0);

        // Stufen-Blöcke dieses Bereichs (vor den Stufen steht das Notizfeld,
        // deshalb nicht über :nth-child zählen, sonst verrutschen die Überschriften)
        const stufenEls = document.querySelectorAll(`#${bereichKey}-content .stufe`);

        for (const [stufeNr, stufe] of Object.entries(bereich.stufen)) {
            const stufeEl = stufenEls[parseInt(stufeNr, 10) - 1];
            // Update Stufe headers (name + Bereichsziel)
            const stufeHeader = stufeEl?.querySelector('.stufe-header-text strong');
            if (stufeHeader) stufeHeader.textContent = stufe.name;
            const stufeZiel = stufeEl?.querySelector('.stufe-header-text em');
            if (stufeZiel && stufe.ziel) stufeZiel.textContent = btnLabels.bereichsziel + (isFR ? ' : ' : ': ') + stufe.ziel;

            // Update "Alle erreicht" labels
            const alleLabel = stufeEl?.querySelector('.checkbox-label');
            if (alleLabel) alleLabel.textContent = btnLabels.alleErreicht;

            // Update item contents (keyword, description, button labels) while preserving selection state
            stufe.items.forEach(item => {
                const itemEl = document.getElementById(`item-${item.code}`);
                if (itemEl) {
                    const codeEl = itemEl.querySelector('.item-code');
                    if (codeEl) codeEl.textContent = getDisplayCode(item.code);
                    const keywordEl = itemEl.querySelector('.item-keyword');
                    if (keywordEl) keywordEl.textContent = item.keyword + ':';
                    const descEl = itemEl.querySelector('.item-description');
                    if (descEl) {
                        // Preserve the keyword span, update the text after it
                        const keywordSpan = descEl.querySelector('.item-keyword');
                        if (keywordSpan) {
                            keywordSpan.textContent = item.keyword + ':';
                            // Replace the text node after the keyword span
                            const textNode = keywordSpan.nextSibling;
                            if (textNode) textNode.textContent = ' ' + item.description + ' ';
                        }
                        // Hinweis "identisch" (gleiches Item in einer anderen Stufe)
                        const badge = descEl.querySelector('.duplicate-badge');
                        if (badge) { badge.title = texte.duplicateTitle; badge.textContent = '↔ ' + texte.duplicateLabel; }
                    }
                    // Beobachtungsbeispiele in der aktuellen Sprache
                    const details = itemEl.querySelector('.item-beispiele-details');
                    const liste = beispiele[item.code] || [];
                    if (details && liste.length > 0) {
                        const summary = details.querySelector('summary');
                        if (summary) summary.textContent = `${texte.beispiele} (${liste.length})`;
                        const ul = details.querySelector('.item-beispiele-list');
                        if (ul) {
                            ul.innerHTML = '';
                            liste.forEach(b => { const li = document.createElement('li'); li.textContent = b; ul.appendChild(li); });
                        }
                    }
                    // Update button labels
                    const btns = itemEl.querySelectorAll('.option-btn');
                    btns.forEach(btn => {
                        if (btn.classList.contains('erreicht')) btn.textContent = btnLabels.erreicht;
                        else if (btn.classList.contains('nicht-erreicht')) btn.textContent = btnLabels.nichtErreicht;
                        else if (btn.classList.contains('ziel')) btn.textContent = btnLabels.ziel;
                    });
                    // Update ziel-box labels
                    const zielH4 = itemEl.querySelector('.ziel-box h4');
                    if (zielH4) zielH4.textContent = btnLabels.zielformulierung;
                    const zielTextarea = itemEl.querySelector('.ziel-custom');
                    if (zielTextarea) zielTextarea.placeholder = btnLabels.placeholder;
                    // Update ziel select options
                    const zielSelect = itemEl.querySelector('.ziel-select');
                    if (zielSelect && item.zielformulierungen) {
                        const sel = state.selections[item.code];
                        // gespeicherte Auswahl hat Vorrang vor der bisherigen Anzeige
                        const selectedIdx = (sel && typeof sel.zielIndex === 'number' && sel.zielIndex >= 0 && sel.zielIndex < item.zielformulierungen.length)
                            ? sel.zielIndex : zielSelect.selectedIndex;
                        zielSelect.innerHTML = item.zielformulierungen.map((z, i) => `<option value="${i}">${z}</option>`).join('');
                        zielSelect.selectedIndex = selectedIdx;
                        // Also update custom textarea if a standard zielformulierung is selected
                        if (sel && typeof sel.zielIndex === 'number' && sel.zielIndex >= 0 && item.zielformulierungen[sel.zielIndex]) {
                            const customTextarea = itemEl.querySelector('.ziel-custom');
                            if (customTextarea) customTextarea.value = item.zielformulierungen[sel.zielIndex];
                        }
                    }
                }
            });
        }
    }

    // Update stats text
    updateStats();
}

// Nach dem Neuaufbau (Sprachwechsel) die Auswahl der zusätzlichen Ziele wieder anzeigen
// (gleiche Klassen wie selectZusatzStatus/loadFromLocalStorage: 'selected' und 'item-stufeN')
function restoreZusatzSelections() {
    for (const [category, goals] of Object.entries(state.zusaetzlicheZiele)) {
        if (!goals || typeof goals !== 'object' || Array.isArray(goals)) continue;
        for (const [goalId, gespeichert] of Object.entries(goals)) {
            // Altdaten: 'erreicht' = stufe3, 'ziel' = stufe1
            const status = gespeichert === 'erreicht' ? 'stufe3' : (gespeichert === 'ziel' ? 'stufe1' : gespeichert);
            const item = document.getElementById(`zusatz-${goalId}`);
            if (item) item.classList.add(`item-${status}`);
            const btn = document.getElementById(`btn-${status}-${goalId}`);
            if (btn) btn.classList.add('selected');
            const descDiv = document.getElementById(`stufen-desc-${goalId}`);
            if (descDiv) {
                const stufeText = descDiv.querySelector(`.${status}-text`);
                if (stufeText) stufeText.style.display = 'block';
            }
        }
        updateZusatzCount(category);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeItems();
    initializeZusaetzlicheZiele();
    loadFromLocalStorage();

    // Schülerübersicht (keine Einschätzung geöffnet): zuletzt gewählte Sprache verwenden
    if (typeof smAktuellerSchueler !== 'undefined' && !smAktuellerSchueler) {
        const uiSprache = gemerkteUiSprache();
        if (uiSprache !== state.language) {
            isLoadingData = true;
            try { switchLanguage(uiSprache); } finally { isLoadingData = false; }
        }
    }
    markiereSprachKnoepfe(state.language);
    document.documentElement.lang = state.language;
    if (state.language === 'de') updateUILanguage(); // feste Texte einheitlich aus UI_STRINGS setzen

    // Aktualisiere Altersanzeige und blockierte Buttons nach dem Laden
    setTimeout(() => {
        updateAlterAnzeige();
        // Aktualisiere auch alle "nicht erreicht" Blockaden
        for (const [code, selection] of Object.entries(state.selections)) {
            if (selection.status === 'nicht-erreicht') {
                updateBlockedZielButtons(code);
            }
        }
        // Auch alle Bereiche refreshen, damit das 4-Ziele-Limit visuell direkt greift
        ['verhalten', 'kommunikation', 'sozialisation', 'kognition'].forEach(b => {
            const firstStufe = ELDIB_DATA[b]?.stufen?.[1];
            if (firstStufe && firstStufe.items[0]) refreshBlockedButtonsInBereich(firstStufe.items[0].code);
        });
    }, 100);

    // Auto-Save für Stammdaten
    const stammdatenTab = document.getElementById('stammdaten');
    if (stammdatenTab) {
        stammdatenTab.addEventListener('input', debounce(saveToLocalStorage, 500));
        stammdatenTab.addEventListener('change', saveToLocalStorage);
    }

    // Initialize DS section observer
});

// Debounce-Funktion für Auto-Save
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Tab Navigation
// === NEUE NAVIGATION FUNKTIONEN ===
function showMainSection(section) {
    const mainNavItems = document.querySelectorAll('.main-nav-item');
    const subNav = document.getElementById('eldib-sub-nav');

    // Update main nav styling
    mainNavItems.forEach(item => item.classList.remove('active'));
    const activeMainItem = document.querySelector(`.main-nav-item[onclick*="'${section}'"]`);
    if (activeMainItem) activeMainItem.classList.add('active');

    // Show/hide sub-nav
    if (section === 'eldib') {
        subNav.classList.add('visible');
        // Show first ELDiB tab (Verhalten)
        showTab('verhalten');
        updateSubNavActive('verhalten');
    } else {
        subNav.classList.remove('visible');
        showTab(section);
    }
}

function updateSubNavActive(tabId) {
    const subNavItems = document.querySelectorAll('.sub-nav-item');
    subNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.classList.contains(tabId) ||
            (tabId === 'zusaetzlich' && item.classList.contains('zusaetzlich'))) {
            item.classList.add('active');
        }
    });
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    if (tabId === 'ds' && typeof DsAssistent !== 'undefined') DsAssistent.zeigen();
    document.querySelectorAll('.tab').forEach(tab => {
        const onclickAttr = tab.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes("'" + tabId + "'")) tab.classList.add('active');
    });

    // Update sub-nav if in ELDiB section
    const eldibTabs = ['verhalten', 'kommunikation', 'sozialisation', 'kognition', 'zusaetzlich'];
    if (eldibTabs.includes(tabId)) {
        updateSubNavActive(tabId);
        document.getElementById('eldib-sub-nav').classList.add('visible');
        // Update main nav
        document.querySelectorAll('.main-nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector('.main-nav-item[onclick*="eldib"]').classList.add('active');
    }

    // Update progress indicator
    updateProgressIndicator(tabId);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgressIndicator(activeTab) {
    // Map tabs to main sections
    const eldibTabs = ['verhalten', 'kommunikation', 'sozialisation', 'kognition', 'zusaetzlich'];
    let activeSection = activeTab;
    if (eldibTabs.includes(activeTab)) {
        activeSection = 'eldib';
    }

    const sections = ['stammdaten', 'eldib', 'ds', 'export'];
    const activeIndex = sections.indexOf(activeSection);

    document.querySelectorAll('.progress-dot').forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        if (index === activeIndex) {
            dot.classList.add('active');
        } else if (index < activeIndex) {
            dot.classList.add('completed');
        }
    });

    // Also update main nav
    document.querySelectorAll('.main-nav-item').forEach((item, index) => {
        item.classList.remove('active', 'completed');
        if (index === activeIndex) {
            item.classList.add('active');
        } else if (index < activeIndex) {
            item.classList.add('completed');
        }
    });
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function toggleBereich(contentId) {
    document.getElementById(contentId).classList.toggle('hidden');
}

function initializeItems() {
    const data = getCurrentEldibData();
    for (const [bereichKey, bereich] of Object.entries(data)) {
        for (const [stufeNr, stufe] of Object.entries(bereich.stufen)) {
            const container = document.getElementById(`${bereichKey}-stufe${stufeNr}-items`);
            if (container) {
                stufe.items.forEach(item => container.appendChild(createItemElement(item, bereichKey)));
            }
        }
    }
}

// Initialize additional goals with 3-level system
function initializeZusaetzlicheZiele() {
    const categories = ['demarches_mentales', 'manieres_apprendre', 'attitudes_relationnelles', 'attitudes_affectives', 'competences_essentielles', 'culture_loisirs'];
    const zusatzData = getCurrentZusaetzlicheZiele();

    categories.forEach(category => {
        const container = document.getElementById(`category-${category}`);
        if (container && zusatzData[category]) {
            container.innerHTML = zusatzData[category].map(goal => `
                <div class="zusatz-item" id="zusatz-${goal.id}">
                    <div class="zusatz-item-content">
                        <div class="zusatz-item-text">
                            <strong style="color: var(--gray-900); font-size: 1rem;">${goal.id}: ${goal.title}</strong>
                            <div class="stufen-beschreibung" id="stufen-desc-${goal.id}">
                                <p class="stufe-text stufe1-text" style="display:none; margin: 4px 0; color: #f59e0b; font-style: italic; font-size: 0.9rem;">⚡ ${goal.stufen.stufe1}</p>
                                <p class="stufe-text stufe2-text" style="display:none; margin: 4px 0; color: #3b82f6; font-style: italic; font-size: 0.9rem;">🤝 ${goal.stufen.stufe2}</p>
                                <p class="stufe-text stufe3-text" style="display:none; margin: 4px 0; color: #10b981; font-style: italic; font-size: 0.9rem;">✓ ${goal.stufen.stufe3}</p>
                            </div>
                            <p style="margin: 4px 0 0 0; color: var(--gray-500); font-size: 0.8rem;"><strong>${t('interventionen')}:</strong> ${goal.intervention.join(', ')}</p>
                        </div>
                        <div class="zusatz-item-actions zusatz-3-buttons">
                            <button class="zusatz-btn stufe1" id="btn-stufe1-${goal.id}" onclick="selectZusatzStatus('${category}', '${goal.id}', 'stufe1')" title="${t('inArbeit')}">${t('zielBtn')}</button>
                            <button class="zusatz-btn stufe2" id="btn-stufe2-${goal.id}" onclick="selectZusatzStatus('${category}', '${goal.id}', 'stufe2')" title="${t('mitUnterstuetzung')}">${t('teilweiseBtn')}</button>
                            <button class="zusatz-btn stufe3" id="btn-stufe3-${goal.id}" onclick="selectZusatzStatus('${category}', '${goal.id}', 'stufe3')" title="${t('erreicht')}">${t('erreichtBtn')}</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    });
}

// Toggle category visibility
function toggleCategory(category) {
    const section = document.getElementById(`section-${category}`);
    if (section) {
        section.classList.toggle('expanded');
    }
}

// Select status for zusätzliches Ziel (3-level system: stufe1, stufe2, stufe3)
function selectZusatzStatus(category, goalId, status) {
    const item = document.getElementById(`zusatz-${goalId}`);
    const btnStufe1 = document.getElementById(`btn-stufe1-${goalId}`);
    const btnStufe2 = document.getElementById(`btn-stufe2-${goalId}`);
    const btnStufe3 = document.getElementById(`btn-stufe3-${goalId}`);
    const stufenDesc = document.getElementById(`stufen-desc-${goalId}`);

    if (!item || !btnStufe1 || !btnStufe2 || !btnStufe3) return;

    // Check if same status is clicked again (toggle off)
    if (state.zusaetzlicheZiele[category][goalId] === status) {
        delete state.zusaetzlicheZiele[category][goalId];
        item.classList.remove('item-stufe1', 'item-stufe2', 'item-stufe3');
        btnStufe1.classList.remove('selected');
        btnStufe2.classList.remove('selected');
        btnStufe3.classList.remove('selected');
        // Hide all stufe descriptions
        if (stufenDesc) {
            stufenDesc.querySelectorAll('.stufe-text').forEach(el => el.style.display = 'none');
        }
    } else {
        // Set new status
        state.zusaetzlicheZiele[category][goalId] = status;

        // Reset classes first
        item.classList.remove('item-stufe1', 'item-stufe2', 'item-stufe3');
        btnStufe1.classList.remove('selected');
        btnStufe2.classList.remove('selected');
        btnStufe3.classList.remove('selected');

        // Hide all stufe descriptions first
        if (stufenDesc) {
            stufenDesc.querySelectorAll('.stufe-text').forEach(el => el.style.display = 'none');
        }

        if (status === 'stufe1') {
            item.classList.add('item-stufe1');
            btnStufe1.classList.add('selected');
            if (stufenDesc) stufenDesc.querySelector('.stufe1-text').style.display = 'block';
        } else if (status === 'stufe2') {
            item.classList.add('item-stufe2');
            btnStufe2.classList.add('selected');
            if (stufenDesc) stufenDesc.querySelector('.stufe2-text').style.display = 'block';
        } else if (status === 'stufe3') {
            item.classList.add('item-stufe3');
            btnStufe3.classList.add('selected');
            if (stufenDesc) stufenDesc.querySelector('.stufe3-text').style.display = 'block';
        }
    }

    updateZusatzCount(category);
    saveToLocalStorage();
}

// Update count display for 3-level system
function updateZusatzCount(category) {
    const countElement = document.getElementById(`count-${category}`);
    if (countElement) {
        const goals = state.zusaetzlicheZiele[category];
        const stufe1Count = Object.values(goals).filter(s => s === 'stufe1').length;
        const stufe2Count = Object.values(goals).filter(s => s === 'stufe2').length;
        const stufe3Count = Object.values(goals).filter(s => s === 'stufe3').length;
        const totalCount = stufe1Count + stufe2Count + stufe3Count;

        const countNumber = countElement.querySelector('.count-number');
        if (countNumber) {
            if (totalCount > 0) {
                let text = '';
                if (stufe3Count > 0) text += `${stufe3Count}✓ `;
                if (stufe2Count > 0) text += `${stufe2Count}🤝 `;
                if (stufe1Count > 0) text += `${stufe1Count}⚡`;
                countNumber.textContent = text.trim();
            } else {
                countNumber.textContent = '0';
            }
        }

        // Add/remove "has-items" class for styling
        if (totalCount > 0) {
            countElement.classList.add('has-items');
        } else {
            countElement.classList.remove('has-items');
        }
    }
}

// Get zusätzliches Ziel by ID
function getZusatzZielById(category, goalId) {
    const data = getCurrentZusaetzlicheZiele();
    return data[category]?.find(g => g.id === goalId);
}

// Get all goals for a specific level (stufe1, stufe2, stufe3)
function getZusatzByStufe(category, stufe) {
    const goals = state.zusaetzlicheZiele[category] || {};
    // Altdaten (2-Stufen-System): 'erreicht' zählt als stufe3, 'ziel' als stufe1
    const alt = { stufe3: 'erreicht', stufe1: 'ziel' }[stufe];
    return Object.entries(goals)
        .filter(([id, status]) => status === stufe || (alt && status === alt))
        .map(([id]) => getZusatzZielById(category, id))
        .filter(Boolean);
}

// Get all stufe3 (erreicht/selbstständig) goals for a category
function getZusatzErreicht(category) {
    return getZusatzByStufe(category, 'stufe3');
}

// Get all stufe2 (mit Unterstützung) goals for a category
function getZusatzTeilweise(category) {
    return getZusatzByStufe(category, 'stufe2');
}

// Get all stufe1 (in Arbeit/Ziel) goals for a category
function getZusatzZiele(category) {
    return getZusatzByStufe(category, 'stufe1');
}

// Legacy compatibility - also check for old 'erreicht' and 'ziel' values
function getZusatzErreichtLegacy(category) {
    const goals = state.zusaetzlicheZiele[category] || {};
    return Object.entries(goals)
        .filter(([id, status]) => status === 'stufe3' || status === 'erreicht')
        .map(([id]) => getZusatzZielById(category, id))
        .filter(Boolean);
}

function getZusatzZieleLegacy(category) {
    const goals = state.zusaetzlicheZiele[category] || {};
    return Object.entries(goals)
        .filter(([id, status]) => status === 'stufe1' || status === 'ziel')
        .map(([id]) => getZusatzZielById(category, id))
        .filter(Boolean);
}

function createItemElement(item, bereichKey) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.id = `item-${item.code}`;
    const zielOptions = item.zielformulierungen.map((z, i) => `<option value="${i}">${z}</option>`).join('');
    const beispieleArr = (typeof getCurrentBeispiele === 'function' ? getCurrentBeispiele() : (typeof BEISPIELE !== 'undefined' ? BEISPIELE : {}))[item.code] || [];
    const beispieleHtml = beispieleArr.length > 0
        ? `<ul class="item-beispiele-list">${beispieleArr.map(b => `<li>${b}</li>`).join('')}</ul>`
        : '';
    const texte = itemTexte();
    const duplicateBadge = isDuplicateItem(item.code, bereichKey)
        ? `<span class="duplicate-badge" title="${texte.duplicateTitle}">↔ ${texte.duplicateLabel}</span>`
        : '';
    itemDiv.innerHTML = `
        <div class="item-code">${getDisplayCode(item.code)}</div>
        <div class="item-description" ondblclick="showItemModal('${item.code}')"><span class="item-keyword">${item.keyword}:</span> ${item.description} ${duplicateBadge}</div>
        ${beispieleHtml ? `<details class="item-beispiele-details"><summary>${texte.beispiele} (${beispieleArr.length})</summary>${beispieleHtml}</details>` : ''}
        <div class="item-options">
            <button class="option-btn erreicht" onclick="selectOption('${item.code}', 'erreicht', this)">${texte.erreicht}</button>
            <button class="option-btn nicht-erreicht" onclick="selectOption('${item.code}', 'nicht-erreicht', this)">${texte.nichtErreicht}</button>
            <button class="option-btn ziel" onclick="selectOption('${item.code}', 'ziel', this)">${texte.ziel}</button>
        </div>
        <div class="ziel-box" id="ziel-box-${item.code}">
            <h4>${texte.zielformulierung}:</h4>
            <select class="ziel-select" id="ziel-select-${item.code}" onchange="updateZieltext('${item.code}')">${zielOptions}</select>
            <textarea class="ziel-custom" id="ziel-custom-${item.code}" placeholder="${texte.placeholder}" onchange="updateCustomZiel('${item.code}')"></textarea>
        </div>`;
    return itemDiv;
}

// Beschriftungen innerhalb eines Items (für Aufbau und Sprachwechsel)
function itemTexte() {
    const lng = state.language;
    const tri = (de, fr, en) => lng === 'fr' ? fr : (lng === 'en' ? en : de);
    return {
        beispiele: tri('Beobachtungsbeispiele', 'Exemples d\'observation', 'Observation examples'),
        zielformulierung: tri('Zielformulierung', 'Formulation de l\'objectif', 'Goal formulation'),
        duplicateTitle: tri('Identisches Item in einer anderen Stufe vorhanden', 'Item identique présent dans un autre stade', 'Identical item present in another stage'),
        duplicateLabel: tri('identisch', 'identique', 'identical'),
        erreicht: tri('Erreicht', 'Atteint', 'Mastered'),
        nichtErreicht: tri('Nicht erreicht', 'Non atteint', 'Not mastered'),
        ziel: tri('Ziel', 'Objectif', 'Goal'),
        placeholder: tri('Oder eigene Formulierung...', 'Ou formulation personnelle...', 'Or custom formulation...')
    };
}

// Findet identische Items (gleiche Beschreibung oder gleiches Keyword) in anderen Stufen desselben Bereichs
const _duplicateCache = {};
function isDuplicateItem(itemCode, bereichKey) {
    if (_duplicateCache[itemCode] !== undefined) return _duplicateCache[itemCode];
    const data = (typeof ELDIB_DATA !== 'undefined') ? ELDIB_DATA : null;
    if (!data || !bereichKey || !data[bereichKey]) { _duplicateCache[itemCode] = false; return false; }
    let myItem = null;
    let myStufe = null;
    for (const [stufeNr, stufeData] of Object.entries(data[bereichKey].stufen)) {
        const found = stufeData.items.find(i => i.code === itemCode);
        if (found) { myItem = found; myStufe = stufeNr; break; }
    }
    if (!myItem) { _duplicateCache[itemCode] = false; return false; }
    for (const [stufeNr, stufeData] of Object.entries(data[bereichKey].stufen)) {
        if (stufeNr === myStufe) continue;
        const dup = stufeData.items.find(i => i.code !== itemCode && i.description && i.description === myItem.description);
        if (dup) { _duplicateCache[itemCode] = true; return true; }
    }
    _duplicateCache[itemCode] = false;
    return false;
}

function selectOption(code, status, button) {
    const parent = button.parentElement;
    const isAlreadySelected = button.classList.contains('selected');

    // Wenn derselbe Button nochmal geklickt wird -> Auswahl aufheben
    if (isAlreadySelected) {
        button.classList.remove('selected');
        const previousStatus = state.selections[code]?.status;
        if (state.selections[code]) {
            delete state.selections[code].status;
        }
        const zielBox = document.getElementById(`ziel-box-${code}`);
        if (zielBox) zielBox.classList.remove('visible');
        saveToLocalStorage();

        // Wenn "nicht erreicht" oder "ziel" aufgehoben wurde, aktualisiere alle Blockaden im Bereich
        if (previousStatus === 'nicht-erreicht' || previousStatus === 'ziel') {
            refreshBlockedButtonsInBereich(code);
        }
        return;
    }

    // Blockade-Prüfung für "Ziel"
    if (status === 'ziel') {
        const check = canSetZiel(code);
        if (!check.allowed) {
            showBlockadeMessage(check.message);
            return; // Blockiere die Auswahl
        }
    }

    // Vorherige Auswahl merken bevor wir ändern
    const previousStatus = state.selections[code]?.status;

    parent.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    if (!state.selections[code]) state.selections[code] = {};
    state.selections[code].status = status;
    const zielBox = document.getElementById(`ziel-box-${code}`);
    if (status === 'ziel') { zielBox.classList.add('visible'); updateZieltext(code); }
    else zielBox.classList.remove('visible');
    saveToLocalStorage();

    // Wenn "nicht erreicht" gewählt wurde, aktualisiere die UI für nachfolgende Items
    if (status === 'nicht-erreicht') {
        updateBlockedZielButtons(code);
    }

    // Wenn "ziel" gewählt wurde, aktualisiere Blockaden (max 4 Ziele Regel)
    if (status === 'ziel') {
        refreshBlockedButtonsInBereich(code);
    }

    // Wenn vorher "nicht erreicht" war und jetzt etwas anderes, Blockaden aktualisieren
    if (previousStatus === 'nicht-erreicht' && status !== 'nicht-erreicht') {
        refreshBlockedButtonsInBereich(code);
    }

    // Wenn vorher "ziel" war und jetzt etwas anderes, Blockaden aktualisieren (max-ziele freigeben)
    if (previousStatus === 'ziel' && status !== 'ziel') {
        refreshBlockedButtonsInBereich(code);
    }
}

// Aktualisiert alle Ziel-Buttons im Bereich (nach Aufheben/Ändern von "nicht erreicht" oder Ziel-Limit)
function refreshBlockedButtonsInBereich(changedCode) {
    const itemInfo = getItemInfoFromCode(changedCode);
    if (!itemInfo) return;

    const { bereich } = itemInfo;

    // Gehe durch alle Items in diesem Bereich und aktualisiere deren Ziel-Buttons
    for (const [stufeNr, stufeData] of Object.entries(ELDIB_DATA[bereich].stufen)) {
        for (const item of stufeData.items) {
            const check = canSetZiel(item.code);
            const zielBtn = document.querySelector(`#item-${item.code} .option-btn.ziel`);
            if (zielBtn) {
                // Nicht blockieren wenn das Item selbst bereits als Ziel gesetzt ist
                const isCurrentlyZiel = state.selections[item.code]?.status === 'ziel';
                if (!check.allowed && !isCurrentlyZiel) {
                    zielBtn.classList.add('blocked');
                    zielBtn.title = check.message;
                } else {
                    zielBtn.classList.remove('blocked');
                    zielBtn.title = '';
                }
            }
        }
    }
}

// Aktualisiert die Ziel-Buttons nach einer "nicht erreicht" Auswahl oder Ziel-Änderung
function updateBlockedZielButtons(blockedCode) {
    const itemInfo = getItemInfoFromCode(blockedCode);
    if (!itemInfo) return;

    const { bereich } = itemInfo;

    // Gehe durch alle Items in diesem Bereich und aktualisiere deren Ziel-Buttons
    for (const [stufeNr, stufeData] of Object.entries(ELDIB_DATA[bereich].stufen)) {
        for (const item of stufeData.items) {
            const check = canSetZiel(item.code);
            const zielBtn = document.querySelector(`#item-${item.code} .option-btn.ziel`);
            if (zielBtn) {
                // Nicht blockieren wenn das Item selbst bereits als Ziel gesetzt ist
                const isCurrentlyZiel = state.selections[item.code]?.status === 'ziel';
                if (!check.allowed && !isCurrentlyZiel) {
                    zielBtn.classList.add('blocked');
                    zielBtn.title = check.message;
                } else {
                    zielBtn.classList.remove('blocked');
                    zielBtn.title = '';
                }
            }
        }
    }
}

// Toggle all items in a Stufe as "erreicht" with checkbox animation
function toggleStufeErreicht(bereich, stufeNr, checkboxElement) {
    const stufe = ELDIB_DATA[bereich]?.stufen[stufeNr];
    if (!stufe) return;

    const isChecked = checkboxElement.classList.contains('checked');

    if (isChecked) {
        // Uncheck: Remove "erreicht" from all items
        checkboxElement.classList.remove('checked');
        stufe.items.forEach(item => {
            const code = item.code;
            const itemDiv = document.getElementById(`item-${code}`);
            if (itemDiv) {
                itemDiv.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
                if (state.selections[code]) {
                    delete state.selections[code].status;
                }
            }
        });
        saveToLocalStorage();
        showToast(tf('stufeZurueckgesetzt', { n: stufeNr }));
    } else {
        // Check: Mark all items as "erreicht"
        checkboxElement.classList.add('checked');
        let count = 0;
        stufe.items.forEach(item => {
            const code = item.code;
            const itemDiv = document.getElementById(`item-${code}`);
            if (itemDiv) {
                const erreichtBtn = itemDiv.querySelector('.option-btn.erreicht');
                if (erreichtBtn) {
                    itemDiv.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
                    erreichtBtn.classList.add('selected');
                    if (!state.selections[code]) state.selections[code] = {};
                    state.selections[code].status = 'erreicht';
                    const zielBox = document.getElementById(`ziel-box-${code}`);
                    if (zielBox) zielBox.classList.remove('visible');
                    count++;
                }
            }
        });
        saveToLocalStorage();
        showToast(tf('itemsErreicht', { n: count }));
    }
}

function updateZieltext(code) {
    const select = document.getElementById(`ziel-select-${code}`);
    const customTextarea = document.getElementById(`ziel-custom-${code}`);
    if (select && state.selections[code]) {
        const item = findItemByCode(code);
        if (item && item.zielformulierungen[select.value]) {
            state.selections[code].zieltext = item.zielformulierungen[select.value];
            state.selections[code].zielIndex = parseInt(select.value);
            customTextarea.value = item.zielformulierungen[select.value];
        }
    }
    saveToLocalStorage();
}

function updateCustomZiel(code) {
    const customTextarea = document.getElementById(`ziel-custom-${code}`);
    if (customTextarea && state.selections[code]) {
        state.selections[code].zieltext = customTextarea.value;
        state.selections[code].zielIndex = -1; // custom text
    }
    saveToLocalStorage();
}

function resolveZieltext(code, selection) {
    const item = findItemByCode(code);
    if (!item) return selection.zieltext || '';
    // If a standard zielformulierung was selected (not custom), resolve from current language data
    if (typeof selection.zielIndex === 'number' && selection.zielIndex >= 0 && item.zielformulierungen[selection.zielIndex]) {
        return item.zielformulierungen[selection.zielIndex];
    }
    // Custom text or legacy (no zielIndex stored) — use stored zieltext or fallback
    if (selection.zielIndex === -1) return selection.zieltext || '';
    // Legacy entries without zielIndex: try to find matching index from DE data, then use current language
    if (selection.zieltext) {
        const deData = ELDIB_DATA;
        const deItem = findItemByCodeInData(code, deData);
        if (deItem) {
            const idx = deItem.zielformulierungen.indexOf(selection.zieltext);
            if (idx >= 0 && item.zielformulierungen[idx]) return item.zielformulierungen[idx];
        }
    }
    return selection.zieltext || item.zielformulierungen[0] || '';
}

function findItemByCodeInData(code, data) {
    for (const bereich of Object.values(data)) {
        for (const stufe of Object.values(bereich.stufen)) {
            for (const item of stufe.items) {
                if (item.code === code) return item;
            }
        }
    }
    return null;
}

function findItemByCode(code) {
    const data = getCurrentEldibData();
    for (const bereich of Object.values(data)) {
        for (const stufe of Object.values(bereich.stufen)) {
            const item = stufe.items.find(i => i.code === code);
            if (item) return item;
        }
    }
    return null;
}

function findBereichByCode(code) {
    const prefix = code.split('-')[0];
    return { 'V': 'verhalten', 'K': 'kommunikation', 'SOZ': 'sozialisation', 'KOG': 'kognition' }[prefix];
}

function updateStats() {
    const stats = {
        verhalten: { erreicht: 0, ziele: 0, total: 33 },
        kommunikation: { erreicht: 0, ziele: 0, total: 35 },
        sozialisation: { erreicht: 0, ziele: 0, total: 41 },
        kognition: { erreicht: 0, ziele: 0, total: 62 }
    };
    for (const [code, selection] of Object.entries(state.selections)) {
        const bereich = findBereichByCode(code);
        if (bereich && stats[bereich]) {
            if (selection.status === 'erreicht') stats[bereich].erreicht++;
            else if (selection.status === 'ziel') stats[bereich].ziele++;
        }
    }
    for (const [bereich, data] of Object.entries(stats)) {
        const zieleEl = document.getElementById(`stats-${bereich}-ziele`);
        const erreichtEl = document.getElementById(`stats-${bereich}-erreicht`);
        const progressEl = document.getElementById(`progress-${bereich}`);
        if (zieleEl) zieleEl.textContent = data.ziele;
        if (erreichtEl) erreichtEl.textContent = `${data.erreicht}/${data.total} ${state.language === 'fr' ? 'atteint(s)' : (state.language === 'en' ? 'mastered' : 'erreicht')}`;
        if (progressEl) progressEl.style.width = `${(data.erreicht / data.total) * 100}%`;
    }
    updateZieleListe();
    updateErreichteListe();
}

function updateZieleListe() {
    const container = document.getElementById('ziele-liste');
    if (!container) return;
    container.innerHTML = '';
    const ziele = Object.entries(state.selections).filter(([code, sel]) => sel.status === 'ziel');
    if (ziele.length === 0) {
        const msg = state.language === 'fr' ? 'Aucun objectif sélectionné pour le moment.'
            : (state.language === 'en' ? 'No goals selected yet.' : 'Noch keine Ziele ausgewählt.');
        container.innerHTML = '<p style="color: #888;">' + msg + '</p>';
        return;
    }
    const grouped = {};
    ziele.forEach(([code, sel]) => {
        const bereich = findBereichByCode(code);
        if (!grouped[bereich]) grouped[bereich] = [];
        const item = findItemByCode(code);
        grouped[bereich].push({ code, keyword: item?.keyword, zieltext: resolveZieltext(code, sel) });
    });
    const data = getCurrentEldibData();
    for (const [bereich, items] of Object.entries(grouped)) {
        const bereichDiv = document.createElement('div');
        bereichDiv.style.marginBottom = '20px';
        bereichDiv.innerHTML = `<h4 style="color: ${data[bereich].color};">${data[bereich].name}</h4>`;
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.style.cssText = 'padding:10px;background:#f9f9f9;border-radius:5px;margin-bottom:5px;';
            itemDiv.innerHTML = `<strong>${getDisplayCode(item.code)}</strong> (${item.keyword}): ${item.zieltext || (state.language === 'fr' ? 'Aucune formulation' : (state.language === 'en' ? 'No formulation' : 'Keine Formulierung'))}`;
            bereichDiv.appendChild(itemDiv);
        });
        container.appendChild(bereichDiv);
    }
}

function updateErreichteListe() {
    const container = document.getElementById('erreichte-liste');
    if (!container) return;
    container.innerHTML = '';
    ['verhalten', 'kommunikation', 'sozialisation', 'kognition'].forEach(bereich => {
        const erreichte = Object.entries(state.selections)
            .filter(([code, sel]) => sel.status === 'erreicht' && findBereichByCode(code) === bereich)
            .map(([code]) => { const item = findItemByCode(code); return { code, keyword: item?.keyword, nr: parseInt(code.split('-')[1]) }; })
            .sort((a, b) => a.nr - b.nr).slice(-4); // ascending, last 4
        const bereichDiv = document.createElement('div');
        bereichDiv.style.marginBottom = '15px';
        const bereichAktuell = getCurrentEldibData()[bereich];
        bereichDiv.innerHTML = `<h4 style="color: ${bereichAktuell.color};">${bereichAktuell.name}</h4>`;
        if (erreichte.length === 0) bereichDiv.innerHTML += `<p style="color:#888;font-size:0.9em;">${t('keineErreichten')}</p>`;
        else erreichte.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.style.cssText = 'padding:5px 10px;background:#e8f5e9;border-radius:3px;margin-bottom:3px;font-size:0.9em;';
            itemDiv.textContent = `${getDisplayCode(item.code)}: ${item.keyword}`;
            bereichDiv.appendChild(itemDiv);
        });
        container.appendChild(bereichDiv);
    });
}

function saveToLocalStorage() {
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
        }
    };
    try {
        localStorage.setItem('eldib-data', JSON.stringify(data));
    } catch (e) {
        console.error('Fehler beim Speichern:', e);
        alert(t('speicherFehler'));
    }
}

function loadFromLocalStorage() {
    isLoadingData = true;
    try {
    const saved = localStorage.getItem('eldib-data');
    if (saved) {
        const data = JSON.parse(saved);
        if (data.language && data.language !== 'de') {
            state.language = 'de'; // Reset to default so switchLanguage guard doesn't block
            switchLanguage(data.language);
        }
        state.selections = data.selections || {};
        state.zusaetzlicheZiele = data.zusaetzlicheZiele || {
            demarches_mentales: {},
            manieres_apprendre: {},
            attitudes_relationnelles: {},
            attitudes_affectives: {},
            competences_essentielles: {},
            culture_loisirs: {}
        };

        // Restore ELDiB selections
        for (const [code, selection] of Object.entries(state.selections)) {
            const itemDiv = document.getElementById(`item-${code}`);
            if (itemDiv) {
                const button = itemDiv.querySelector(`.option-btn.${selection.status}`);
                if (button) button.classList.add('selected');
                if (selection.status === 'ziel') {
                    const zielBox = document.getElementById(`ziel-box-${code}`);
                    if (zielBox) zielBox.classList.add('visible');
                    // Restore Ziel-Select dropdown index
                    const zielSelect = document.getElementById(`ziel-select-${code}`);
                    if (zielSelect && typeof selection.zielIndex === 'number' && selection.zielIndex >= 0) {
                        zielSelect.value = selection.zielIndex;
                    }
                    const customTextarea = document.getElementById(`ziel-custom-${code}`);
                    if (customTextarea && selection.zieltext) customTextarea.value = selection.zieltext;
                }
            }
        }

        // Restore zusätzliche Ziele selections (3-Stufen-System: stufe1, stufe2, stufe3)
        for (const [category, goals] of Object.entries(state.zusaetzlicheZiele)) {
            if (typeof goals === 'object' && !Array.isArray(goals)) {
                for (const [goalId, status] of Object.entries(goals)) {
                    const item = document.getElementById(`zusatz-${goalId}`);
                    const btnStufe1 = document.getElementById(`btn-stufe1-${goalId}`);
                    const btnStufe2 = document.getElementById(`btn-stufe2-${goalId}`);
                    const btnStufe3 = document.getElementById(`btn-stufe3-${goalId}`);
                    const stufenDesc = document.getElementById(`stufen-desc-${goalId}`);

                    if (item) {
                        item.classList.remove('item-stufe1', 'item-stufe2', 'item-stufe3', 'item-erreicht', 'item-ziel');

                        // Hide all stufe descriptions first
                        if (stufenDesc) {
                            stufenDesc.querySelectorAll('.stufe-text').forEach(el => el.style.display = 'none');
                        }

                        if (status === 'stufe1') {
                            item.classList.add('item-stufe1');
                            if (btnStufe1) btnStufe1.classList.add('selected');
                            if (stufenDesc) {
                                const stufe1Text = stufenDesc.querySelector('.stufe1-text');
                                if (stufe1Text) stufe1Text.style.display = 'block';
                            }
                        } else if (status === 'stufe2') {
                            item.classList.add('item-stufe2');
                            if (btnStufe2) btnStufe2.classList.add('selected');
                            if (stufenDesc) {
                                const stufe2Text = stufenDesc.querySelector('.stufe2-text');
                                if (stufe2Text) stufe2Text.style.display = 'block';
                            }
                        } else if (status === 'stufe3') {
                            item.classList.add('item-stufe3');
                            if (btnStufe3) btnStufe3.classList.add('selected');
                            if (stufenDesc) {
                                const stufe3Text = stufenDesc.querySelector('.stufe3-text');
                                if (stufe3Text) stufe3Text.style.display = 'block';
                            }
                        }
                        // Legacy support for old 'erreicht' and 'ziel' values
                        else if (status === 'erreicht') {
                            item.classList.add('item-stufe3');
                            if (btnStufe3) btnStufe3.classList.add('selected');
                        } else if (status === 'ziel') {
                            item.classList.add('item-stufe1');
                            if (btnStufe1) btnStufe1.classList.add('selected');
                        }
                    }
                }
            }
            updateZusatzCount(category);
        }

        if (data.stammdaten) {
            // Restore periodenTyp first (so that the correct options are available)
            if (data.stammdaten.periodenTyp) {
                setPeriodType(data.stammdaten.periodenTyp);
            }
            // Legacy support: if 'trimester' exists but not 'periodenTyp', use trimester
            else if (data.stammdaten.trimester && !data.stammdaten.periode) {
                setPeriodType('trimester');
                data.stammdaten.periode = data.stammdaten.trimester;
            }

            for (const [key, value] of Object.entries(data.stammdaten)) {
                // Skip periodenTyp and trimester (handled separately)
                if (key === 'periodenTyp' || key === 'trimester') continue;
                const element = document.getElementById(key);
                if (element) element.value = value || '';
            }
        }

        // Lade DS-Daten
        if (data.dsData) {
            loadDSData(data.dsData);
        }

        // Lade Bereich-Notizen
        if (data.bereichNotizen) {
            for (const [bereich, text] of Object.entries(data.bereichNotizen)) {
                const textarea = document.getElementById(`notizen-${bereich}`);
                if (textarea) textarea.value = text || '';
            }
        }
    }
    } catch (e) {
        console.error('Fehler beim Laden der Daten:', e);
    } finally {
        isLoadingData = false;
    }
}
