const ELDIB_STRUCTURE = {
    V:   { V: [33], K: [35,34], S: [41], C: [62,61] },
    IV:  { V: [32,31,30,29,28], K: [33,32,31,30,29], S: [40,39,38,37,36,35], C: [60,59,58,57,56] },
    III: { V: [27,26,25,24,23,22,21], K: [28,27,26,25,24,23,22], S: [34,33,32,31,30,29,28,27,26], C: [55,54,53,52,51,50,49,48] },
    II:  { V: [20,19,18,17,16,15,14], K: [21,20,19,18,17,16,15,14], S: [25,24,23,22,21,20,19], C: [47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31] },
    I:   { V: [13,12,11,10,9,8,7,6,5,4,3,2,1], K: [13,12,11,10,9,8,7,6,5,4,3,2,1], S: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1], C: [30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1] }
};

// Helper to get color for item
function getItemColor(prefix, nr) {
    const code = `${prefix}-${nr}`;
    const sel = state.selections[code];
    if (sel?.status === 'erreicht') return '90EE90'; // green
    if (sel?.status === 'ziel') return 'FFFF00'; // yellow
    return 'FFFFFF'; // white
}

// Pädagogische Interventionen Datenbank
const INTERVENTIONEN = {
    // VERHALTEN (V-1 bis V-33)
    'V-1': ['Blickkontakt beim Ansprechen herstellen', 'Sanfte Berührung zur Kontaktaufnahme', 'Visuelle Reize in Augenhöhe präsentieren'],
    'V-2': ['Reize langsam und deutlich präsentieren', 'Aufmerksamkeit durch Geräusche lenken', 'Zeigen und Benennen kombinieren'],
    'V-3': ['Kurze, klare Anweisungen geben', 'Interessante Materialien nutzen', 'Aufmerksamkeitsspanne schrittweise erhöhen'],
    'V-4': ['Hand-über-Hand Führung anbieten', 'Einfache Handlungsaufforderungen geben', 'Erfolg unmittelbar loben'],
    'V-5': ['Komplexere Spielangebote machen', 'Verbale Impulse mit Gesten unterstützen', 'Modellieren der erwarteten Handlung'],
    'V-6': ['Routinen für Selbsthilfe etablieren', 'Visuelle Ablaufpläne nutzen', 'Teilschritte einzeln üben'],
    'V-7': ['Materialien strukturiert anbieten', 'Ordnungssysteme einführen', 'Aufräumrituale etablieren'],
    'V-8': ['Tagesstruktur visualisieren', 'Übergänge ankündigen', 'Rituale wiederholen und festigen'],
    'V-9': ['Regeln für Materialnutzung erklären', 'Sachgerechten Umgang modellieren', 'Konsequent auf Regeleinhaltung achten'],
    'V-10': ['Wartezeiten kurz halten und steigern', 'Wartespiele einführen', 'Erfolg beim Warten sofort loben'],
    'V-11': ['Bewegungspausen einplanen', 'Sitzposition optimieren', 'Fidget-Tools erlauben'],
    'V-12': ['Bewegungsangebote attraktiv gestalten', 'Mitmachen ohne Zwang ermöglichen', 'Schrittweise Beteiligung erhöhen'],
    'V-13': ['Zur Teilnahme einladen', 'Einfache Beteiligungsmöglichkeiten schaffen', 'Initiative positiv verstärken'],
    'V-14': ['Lob dosiert und authentisch geben', 'Auf Überreaktion vorbereiten', 'Erfolge angemessen feiern'],
    'V-15': ['Aufgaben in Teilschritte gliedern', 'Zeitrahmen visualisieren', 'Fertigstellung konkret würdigen'],
    'V-16': ['Regeln gemeinsam erarbeiten', 'Regeln visualisieren und aushängen', 'Regelmäßig an Regeln erinnern'],
    'V-17': ['Regelverständnis durch Beispiele fördern', 'Konsequenzen erklären', 'Sinn von Regeln besprechen'],
    'V-18': ['Handlungsalternativen gemeinsam sammeln', 'Rollenspiele nutzen', 'Wahlmöglichkeiten anbieten'],
    'V-19': ['Gruppenentscheidungen üben', 'Akzeptanz von Mehrheitsentscheidungen thematisieren', 'Führungsrollen rotieren'],
    'V-20': ['Selbstkontrolltechniken üben', 'Ablenkungsstrategien anbieten', 'Nicht-Reaktion positiv verstärken'],
    'V-21': ['Übergänge strukturieren', 'Entspannungstechniken einführen', 'Selbstregulation unterstützen'],
    'V-22': ['Fortschritte dokumentieren und zeigen', 'Vergleich mit früherem Verhalten', 'Reflexionsgespräche führen'],
    'V-23': ['Ziele gemeinsam setzen', 'Fortschritte visualisieren', 'Selbstbewertung ermöglichen'],
    'V-24': ['Perspektivübernahme üben', 'Konsequenzen für andere besprechen', 'Empathie fördern'],
    'V-25': ['Konstruktive Kritik modellieren', 'Feedbackregeln einführen', 'Kritikfähigkeit üben'],
    'V-26': ['Problemlösestrategien vermitteln', 'Konfliktsituationen nachbesprechen', 'Mediationsangebote machen'],
    'V-27': ['Selbstständigkeit fördern', 'Verantwortung übertragen', 'Erfolgserlebnisse ermöglichen'],
    'V-28': ['Ressourcen des Kindes nutzen', 'Stärken in Gruppen einbringen', 'Peer-Learning fördern'],
    'V-29': ['Gruppenarbeit strukturieren', 'Rollen verteilen', 'Kooperationsspiele einsetzen'],
    'V-30': ['Führungskompetenzen entwickeln', 'Verantwortung für andere übernehmen', 'Vorbildfunktion stärken'],
    'V-31': ['Komplexe Projekte begleiten', 'Selbstorganisation unterstützen', 'Reflexion einplanen'],
    'V-32': ['Mentoring-Aufgaben vergeben', 'Soziale Verantwortung übertragen', 'Engagement würdigen'],
    'V-33': ['Selbstständige Problemlösung fördern', 'Beratende Rolle einnehmen', 'Transfer auf neue Situationen üben'],

    // KOMMUNIKATION (K-1 bis K-35)
    'K-1': ['Blickkontakt herstellen und halten', 'Aufmerksamkeit durch Stimme gewinnen', 'Interesse an Kommunikation wecken'],
    'K-2': ['Auf Kommunikationsversuche reagieren', 'Vokalisationen ermutigen', 'Turn-Taking üben'],
    'K-3': ['Gesten modellieren', 'Körpersprache beobachten', 'Nonverbale Kommunikation verstärken'],
    'K-4': ['Einfache Anweisungen geben', 'Verständnis überprüfen', 'Wiederholungen anbieten'],
    'K-5': ['Wortschatz erweitern', 'Begriffe im Kontext einführen', 'Benennungsspiele spielen'],
    'K-6': ['Aussprache modellieren', 'Korrektives Feedback geben', 'Artikulationsübungen einbauen'],
    'K-7': ['Satzstrukturen modellieren', 'Sätze erweitern', 'Grammatik spielerisch üben'],
    'K-8': ['Zum Sprechen ermutigen', 'Sprechanlässe schaffen', 'Redezeit geben'],
    'K-9': ['Komplexere Anweisungen üben', 'Schrittfolgen verbal begleiten', 'Verstehen überprüfen'],
    'K-10': ['Erzählanlässe schaffen', 'W-Fragen stellen', 'Nachfragen ermutigen'],
    'K-11': ['Gefühle benennen', 'Emotionsvokabular erweitern', 'Gefühlskarten nutzen'],
    'K-12': ['Bedürfnisse verbal ausdrücken üben', 'Ich-Botschaften modellieren', 'Bitten formulieren'],
    'K-13': ['Gruppengespräche führen', 'Gesprächsregeln einführen', 'Aktives Zuhören üben'],
    'K-14': ['Informationsaustausch üben', 'Berichte anfertigen', 'Sachlich kommunizieren'],
    'K-15': ['Fragen stellen ermutigen', 'Fragekategorien einführen', 'Neugier fördern'],
    'K-16': ['Erklärungen einfordern', 'Begründungen üben', 'Argumentation fördern'],
    'K-17': ['Gesprächsführung üben', 'Themen vertiefen', 'Dialog-Struktur vermitteln'],
    'K-18': ['Perspektiven austauschen', 'Andere Meinungen anhören', 'Diskussionen moderieren'],
    'K-19': ['Abstrakte Begriffe einführen', 'Symbolverständnis fördern', 'Metaphern erklären'],
    'K-20': ['Schriftsprache einführen', 'Lesen und Schreiben verbinden', 'Textverständnis fördern'],
    'K-21': ['Komplexe Texte bearbeiten', 'Zusammenfassungen üben', 'Schlussfolgerungen ziehen'],
    'K-22': ['Präsentationen üben', 'Vor Gruppe sprechen', 'Feedback geben und nehmen'],
    'K-23': ['Überzeugend argumentieren', 'Rhetorik üben', 'Standpunkte vertreten'],
    'K-24': ['Verhandeln üben', 'Kompromisse finden', 'Diplomatisch kommunizieren'],
    'K-25': ['Komplexe Sachverhalte erklären', 'Fachsprache einführen', 'Präzise formulieren'],
    'K-26': ['Kreatives Schreiben fördern', 'Textsorten kennenlernen', 'Schreibprozess begleiten'],
    'K-27': ['Medienkompetenzen entwickeln', 'Digitale Kommunikation üben', 'Netiquette vermitteln'],
    'K-28': ['Fremdsprachliche Elemente einführen', 'Interkulturelle Kommunikation', 'Mehrsprachigkeit wertschätzen'],
    'K-29': ['Kommunikationsstrategien reflektieren', 'Missverständnisse klären', 'Metakommunikation üben'],
    'K-30': ['Komplexe Diskussionen führen', 'Debatten strukturieren', 'Sachlich bleiben'],
    'K-31': ['Kommunikative Führung übernehmen', 'Moderation üben', 'Gruppenprozesse leiten'],
    'K-32': ['Kommunikation in Konflikten', 'Deeskalation üben', 'Vermittlerrolle einnehmen'],
    'K-33': ['Öffentliches Sprechen üben', 'Lampenfieber bewältigen', 'Souverän auftreten'],
    'K-34': ['Expertenwissen kommunizieren', 'Komplexes vereinfachen', 'Zielgruppengerecht sprechen'],
    'K-35': ['Kommunikative Vorbildfunktion', 'Andere anleiten', 'Kommunikationskultur prägen'],

    // SOZIALISATION (SOZ-1 bis SOZ-41)
    'SOZ-1': ['Präsenz des Erwachsenen zeigen', 'Nähe anbieten', 'Sicherheit vermitteln'],
    'SOZ-2': ['Auf Bedürfnisse reagieren', 'Verlässlichkeit zeigen', 'Bindung aufbauen'],
    'SOZ-3': ['Positive Interaktionen initiieren', 'Spielangebote machen', 'Gemeinsame Aktivitäten'],
    'SOZ-4': ['Körperkontakt ermöglichen', 'Trost spenden', 'Emotionale Sicherheit geben'],
    'SOZ-5': ['Kontakt zu Peers ermöglichen', 'Parallelspiel fördern', 'Nähe zu anderen Kindern'],
    'SOZ-6': ['Gemeinsames Spiel anregen', 'Spielpartner vermitteln', 'Kooperation anbahnen'],
    'SOZ-7': ['Teilen üben', 'Abwechseln einführen', 'Fairness thematisieren'],
    'SOZ-8': ['Hilfsbereitschaft modellieren', 'Unterstützung anregen', 'Prosoziales Verhalten loben'],
    'SOZ-9': ['Freundschaften unterstützen', 'Kontaktpflege ermöglichen', 'Soziale Netzwerke fördern'],
    'SOZ-10': ['Gruppenregeln einführen', 'Gemeinsame Normen entwickeln', 'Zugehörigkeit stärken'],
    'SOZ-11': ['Empathie entwickeln', 'Gefühle anderer erkennen', 'Mitgefühl zeigen'],
    'SOZ-12': ['Konflikte begleiten', 'Streitschlichtung üben', 'Kompromisse finden'],
    'SOZ-13': ['Kooperationsspiele einsetzen', 'Teamarbeit üben', 'Gemeinsame Ziele verfolgen'],
    'SOZ-14': ['Soziale Rollen erkunden', 'Rollenspiele anbieten', 'Perspektiven wechseln'],
    'SOZ-15': ['Gruppendynamik beobachten', 'Integration fördern', 'Ausgrenzung verhindern'],
    'SOZ-16': ['Verantwortung für andere', 'Patenschaften etablieren', 'Fürsorge zeigen'],
    'SOZ-17': ['Soziale Normen vermitteln', 'Höflichkeit üben', 'Respekt zeigen'],
    'SOZ-18': ['Diversität wertschätzen', 'Unterschiede akzeptieren', 'Inklusion leben'],
    'SOZ-19': ['Gruppenidentität stärken', 'Wir-Gefühl entwickeln', 'Gemeinsame Erlebnisse schaffen'],
    'SOZ-20': ['Konfliktlösung ohne Erwachsene', 'Selbstständigkeit fördern', 'Mediatorenrolle übergeben'],
    'SOZ-21': ['Führungsqualitäten entwickeln', 'Verantwortung übernehmen', 'Andere anleiten'],
    'SOZ-22': ['Demokratische Prozesse üben', 'Abstimmungen durchführen', 'Mehrheitsentscheidungen akzeptieren'],
    'SOZ-23': ['Soziales Engagement fördern', 'Projekte für andere', 'Gemeinwohl thematisieren'],
    'SOZ-24': ['Interkulturelle Kompetenz', 'Kulturelle Vielfalt erkunden', 'Vorurteile abbauen'],
    'SOZ-25': ['Netzwerke aufbauen', 'Beziehungen pflegen', 'Soziale Ressourcen nutzen'],
    'SOZ-26': ['Soziale Verantwortung', 'Ethisches Handeln', 'Konsequenzen bedenken'],
    'SOZ-27': ['Gesellschaftliche Teilhabe', 'Bürgerschaftliches Engagement', 'Politisches Bewusstsein'],
    'SOZ-28': ['Komplexe Gruppenprozesse', 'Organisationen verstehen', 'Strukturen erkennen'],
    'SOZ-29': ['Soziale Gerechtigkeit', 'Ungleichheit thematisieren', 'Solidarität zeigen'],
    'SOZ-30': ['Soziale Innovation', 'Probleme erkennen', 'Lösungen entwickeln'],
    'SOZ-31': ['Mentoring übernehmen', 'Wissen weitergeben', 'Jüngere unterstützen'],
    'SOZ-32': ['Soziale Führung', 'Vorbild sein', 'Einfluss positiv nutzen'],
    'SOZ-33': ['Gesellschaftliche Verantwortung', 'Langfristig denken', 'Nachhaltigkeit leben'],
    'SOZ-34': ['Soziale Netzwerke gestalten', 'Communities aufbauen', 'Verbindungen schaffen'],
    'SOZ-35': ['Soziale Bewegungen', 'Veränderung anstoßen', 'Aktivismus begleiten'],
    'SOZ-36': ['Globale Perspektive', 'Weltbürgerschaft', 'Internationale Solidarität'],
    'SOZ-37': ['Soziales Unternehmertum', 'Impact schaffen', 'Soziale Probleme lösen'],
    'SOZ-38': ['Generationenübergreifend', 'Erfahrungen austauschen', 'Brücken bauen'],
    'SOZ-39': ['Soziale Systeme verstehen', 'Zusammenhänge erkennen', 'Systemisch denken'],
    'SOZ-40': ['Soziale Resilienz', 'Krisen bewältigen', 'Gemeinschaft stärken'],
    'SOZ-41': ['Soziale Weisheit', 'Erfahrung teilen', 'Ratgeber sein'],

    // KOGNITION (KOG-1 bis KOG-62) - Auszug der wichtigsten
    'KOG-1': ['Sensorische Erfahrungen ermöglichen', 'Materialien erkunden lassen', 'Sinne ansprechen'],
    'KOG-2': ['Objektpermanenz üben', 'Versteckspiele', 'Wiederholung und Variation'],
    'KOG-3': ['Ursache-Wirkung zeigen', 'Experimente durchführen', 'Zusammenhänge verdeutlichen'],
    'KOG-4': ['Kategorisieren üben', 'Sortieren nach Eigenschaften', 'Gemeinsamkeiten finden'],
    'KOG-5': ['Reihenfolgen bilden', 'Sequenzen üben', 'Abläufe strukturieren'],
    'KOG-6': ['Muster erkennen', 'Regelmäßigkeiten finden', 'Vorhersagen machen'],
    'KOG-7': ['Mengen vergleichen', 'Mehr/Weniger verstehen', 'Quantitäten einschätzen'],
    'KOG-8': ['Zahlenverständnis aufbauen', 'Zählen üben', 'Zahlbegriff festigen'],
    'KOG-9': ['Räumliches Denken fördern', 'Puzzle lösen', 'Konstruktionsspiele'],
    'KOG-10': ['Zeitverständnis entwickeln', 'Tagesablauf visualisieren', 'Vorher/Nachher verstehen'],
    'KOG-11': ['Symbolverständnis fördern', 'Zeichen deuten', 'Abstraktionen einführen'],
    'KOG-12': ['Gedächtnis trainieren', 'Memory-Spiele', 'Wiederholung einsetzen'],
    'KOG-13': ['Aufmerksamkeit fokussieren', 'Konzentration üben', 'Ablenkungen reduzieren'],
    'KOG-14': ['Problemlösen anleiten', 'Strategien vermitteln', 'Lösungswege erkunden'],
    'KOG-15': ['Planung üben', 'Schritte vorausdenken', 'Ziele setzen'],
    'KOG-16': ['Flexibles Denken fördern', 'Alternative Wege finden', 'Perspektiven wechseln'],
    'KOG-17': ['Kreativität anregen', 'Offene Aufgaben stellen', 'Fantasie ermutigen'],
    'KOG-18': ['Logisches Denken schulen', 'Schlussfolgerungen ziehen', 'Wenn-Dann-Beziehungen'],
    'KOG-19': ['Kritisches Denken fördern', 'Hinterfragen ermutigen', 'Begründungen einfordern'],
    'KOG-20': ['Transferleistung üben', 'Gelerntes anwenden', 'Neue Kontexte erschließen']
};

// Fallback-Interventionen nach Bereich
const INTERVENTIONEN_FALLBACK = {
    verhalten: ['Verhaltensregeln visualisieren', 'Positive Verstärkung einsetzen', 'Strukturierte Lernumgebung schaffen', 'Klare Erwartungen kommunizieren'],
    kommunikation: ['Sprachvorbild sein', 'Aktives Zuhören modellieren', 'Kommunikationsanlässe schaffen', 'Wortschatz im Kontext erweitern'],
    sozialisation: ['Soziale Situationen besprechen', 'Rollenspiele durchführen', 'Kooperative Aktivitäten anbieten', 'Empathie fördern'],
    kognition: ['Lernstrategien vermitteln', 'Scaffolding anbieten', 'Handlungsorientiert arbeiten', 'Differenzierte Materialien bereitstellen']
};

// ==========================================
// BEOBACHTUNGSBEISPIELE - Beispielverhalten pro Item
// Für Doppelklick-Anzeige
// ==========================================

const BEISPIELE = {
    // VERHALTEN
    "V-1": ["Reagiert auf Berührung der Wange", "Dreht sich bei Geräuschen", "Folgt bewegenden Objekten mit den Augen"],
    "V-2": ["Wendet Blick/Körper zu Seifenblasen", "Dreht Kopf zur Musik", "Lächelt wenn Hand ins Wasser getaucht wird"],
    "V-3": ["Beobachtet Seifenblasen weiter und greift danach", "Schaut Erwachsenen beim Gitarrespielen zu", "Spritzt weiter im Wasser"],
    "V-4": ["Sieht Bauklotz, hebt ihn hoch und wirft ihn", "Kommt zur Musikquelle gelaufen", "Streckt Hand aus um Gesicht zu berühren"],
    "V-5": ["Spritzt im Wasser nach Aufforderung", "Schiebt Boot durchs Wasser nach Vormachen", "Fährt Spielzeugauto auf verbalen Hinweis"],
    "V-6": ["Zeigt Toilettenbedarf an", "Versucht Wasserhahn aufzudrehen", "Zieht Hose hoch, versucht Reißverschluss"],
    "V-7": ["Hebt Puppe hoch, streichelt Haare", "Zieht Auto über Boden, untersucht Räder", "Legt Spielzeug in Kiste auf Aufforderung"],
    "V-8": ["Geht zur Spielecke wenn 'Jetzt spielen wir' gesagt wird", "Holt Mantel wenn Spaziergang angekündigt wird"],
    "V-9": ["Fährt Spielzeugauto zur Tankstelle, tut als ob tanken", "Füttert und zieht Puppe an"],
    "V-10": ["Wartet bis an der Reihe beim Turnen", "Wartet auf Plätzchen bis anderes Kind seins bekommen hat"],
    "V-11": ["Kehrt in Erzählkreis zurück nach interessantem Hinweis", "Führt Arbeit fort nach Ermutigung sitzen zu bleiben"],
    "V-12": ["Hört auf zu streiten, holt alternatives Spielzeug", "Folgt Klatsch-Rhythmus in der Gruppe"],
    "V-13": ["Nimmt Arbeitsblatt ohne Aufforderung", "Beschäftigt sich mit Spielzeug, antwortet auf Fragen dazu"],
    "V-14": ["Akzeptiert Schulterklopfen ohne Zurückzucken", "Lächelt zurück wenn für Geschichte gelobt"],
    "V-15": ["Räumt Platz nach Frühstück ohne Aufforderung", "Arbeitet im vertrauten Übungsheft ohne Hilfe"],
    "V-16": ["Sagt: 'Im Schwimmbad lassen sie uns nicht rein wenn wir prügeln'", "Kennt Schulbus-Regeln und Pausenregeln"],
    "V-17": ["Erklärt: 'Nach Dunkelwerden kann einem was passieren'", "Begründet: 'Sonst können wir am Tisch nicht arbeiten'"],
    "V-18": ["Sagt: 'Ich könnte aufzeigen anstatt zu rufen'", "Erkennt alternative Verhaltensweisen"],
    "V-19": ["Erfüllt Kapitänsrolle verantwortungsbewusst", "Macht auch als Teilnehmer mit"],
    "V-20": ["Stimmt nicht ein wenn andere Schimpfwörter rufen", "Bleibt auf Platz während andere herumlaufen"],
    "V-21": ["Behält Selbstkontrolle während Gruppenaktivitäten", "Kontrolliert sich bei Übergängen"],
    "V-22": ["Sagt: 'Als du dran warst, hab ich keinen Ton gesagt'", "Erinnert sich an eigene Verbesserungen"],
    "V-23": ["Akzeptiert geänderten Ablauf ohne Ärger", "Wartet ruhig wenn Reihenfolge geändert wird"],
    "V-24": ["Nimmt an Ausflug teil trotz Angst", "Probiert neue Aktivität aus"],
    "V-25": ["Sagt Provokateur er solle aufhören, entzieht sich", "Schlägt Alternative vor wenn Plan ausfällt"],
    "V-26": ["Behält Selbstkontrolle trotz Schimpfwörtern", "Reagiert besonnen auf Provokationen"],
    "V-27": ["Setzt sich freiwillig um Versuchung zu vermeiden", "Ersetzt beschädigtes Buch eines Mitschülers"],
    "V-28": ["Schlägt Abwechseln beim Abwaschen vor", "Bietet konstruktive Alternative an"],
    "V-29": ["Überlegt ob er früh aufstehen könnte für Job", "Übernimmt Verantwortung für Materialien"],
    "V-30": ["Sieht sich als Helfer bei Problemlösungen", "Sichert sich Leiterrolle auf positive Art"],
    "V-31": ["Kommentiert: 'Radkappen klauen bringt nur Probleme'", "Hilft Regelkatalog zu formulieren"],
    "V-32": ["Stellt sich zur Wahl der Schülervertretung", "Akzeptiert Mehrheitsbeschluss"],
    "V-33": ["Analysiert Situation bei Gruppenausschluss", "Diskutiert Problem, plant neue Wege"],
    // KOMMUNIKATION
    "K-1": ["Sagt 'eee', 'nnn' oder 'mmm'", "Sagt 'baba', 'da da' Silbenreihen"],
    "K-2": ["Dreht Körper/Blick zu grüßendem Erwachsenen", "Schaut Mutter an wenn sie spricht"],
    "K-3": ["Zeigt Verständnis von 'Ball' durch Anschauen", "Winkt bei 'Wiedersehen'"],
    "K-4": ["Antwortet annähernd mit Namen eines Kindes", "Antwortet mit Wortannäherung auf Objekt"],
    "K-5": ["Sagt 'Mi..Mi' bei Milch", "Sagt 'Auch' wenn es mitmachen will"],
    "K-6": ["Sagt 'Milch' wenn Milch hingestellt wird", "Sagt 'Bauen' mit Bauklötzen"],
    "K-7": ["Sagt 'Auto' zu Kind das Lieblingsauto hat", "Sagt 'Geh weg' zum anderen Kind"],
    "K-8": ["Sagt 'Gib mir das Auto'", "Singt Zeilen aus einfachem Lied"],
    "K-9": ["Antwortet 'Das ist mein Laster' auf Anfrage", "Beantwortet Fragen mit sinnvollen Wörtern"],
    "K-10": ["Rezeptives Vokabular max. 2 Jahre unter Altersnorm", "Wird durch Sprachentwicklungstests eingeschätzt"],
    "K-11": ["Sagt 'Ich will deine rote Farbe'", "Fragt 'Was ist da drin?'"],
    "K-12": ["Erzählt 'Ich hab meiner Mama beim Backen geholfen'", "Tauscht Informationen mit Erwachsenen"],
    "K-13": ["Sagt 'Ich kann gut klettern, bis ganz oben'", "Beschreibt Vater: 'Mein Papi ist groß'"],
    "K-14": ["Erzählt Schwester 'Ich habe das Buch gelesen'", "Sagt zu Mitschüler 'Das ist nicht richtig'"],
    "K-15": ["Erzählt vom Umzug ins neue Haus", "Erklärt Bild: 'Das ist unser altes Haus'"],
    "K-16": ["Erzählt 'Das Gewitter war so laut'", "Sagt 'Ich hab Angst vor Hunden'"],
    "K-17": ["Schlägt Design für Wandgemälde vor", "Beteiligt sich an Gruppengespräch"],
    "K-18": ["Sagt 'Hey, ich hab es fertig gekriegt'", "Zeigt Stolz auf eigene Arbeit"],
    "K-19": ["Sagt 'Man soll wegbleiben wenn ich Wut habe'", "Beschreibt eigene Stärken und Schwächen"],
    "K-20": ["Beschreibt Freundin: 'Schnellste Läuferin'", "Beschreibt Eigenschaften anderer Kinder"],
    "K-21": ["'Stefan ist froh weil er Urkunde bekommen hat'", "'Er ist sauer weil er nicht dran ist'"],
    "K-22": ["Sagt 'Die sind nicht so weit wie wir'", "Sagt 'Wir sind die größten Künstler'"],
    "K-23": ["Malt Angelerlebnis mit Vater", "Formt wütendes Monster aus Ton"],
    "K-24": ["Sagt 'Ich bin in fast allen Fächern besser als letztes Jahr'", "Erkennt eigenen Fortschritt"],
    "K-25": ["'Susie hat mir eine gescheuert weil ich Blöde Kuh gesagt hab'", "Erklärt Ursache-Wirkung"],
    "K-26": ["'Ich war stinkig als du Farbe über unser Gemälde gekippt hast'", "Drückt eigene Gefühle aus"],
    "K-27": ["Fragt Mechaniker 'Wie lange hat es gedauert das zu lernen?'", "Knüpft Beziehungen durch Fragen"],
    "K-28": ["Erklärt Mitschüler eine Matheaufgabe", "Steht für anderen Mitschüler ein"],
    "K-29": ["'Wir haben auf Lilli gehackt weil sie Ball fallen ließ'", "Beschreibt Zusammenhang von Gefühlen/Verhalten"],
    "K-30": ["'Softball hier erinnert an Hunde die um Knochen balgen'", "Verwendet bildhafte Sprache"],
    "K-31": ["'Setzen wir uns hin, jeder erzählt was er denkt'", "'Hört auf mit dem Blödsinn'"],
    "K-32": ["'Peters Idee ist gut'", "'Deine Idee hat was für sich'"],
    "K-33": ["Vergleicht Eltern: Vater rast, Mutter hält sich an Regeln", "Unterscheidet verschiedene Motive"],
    "K-34": ["'Väter sollten bei Familien bleiben auch bei Problemen'", "Beschreibt eigene Wertvorstellungen"],
    "K-35": ["'Unser Spiel ist gut weil wir zusammenspielen'", "Pflegt positive Beziehungen durch Sprache"],
    // SOZIALISATION
    "SOZ-1": ["Dreht Kopf zu wenn Rücken berührt wird", "Zeigt Interesse an Kuckuck-Spiel"],
    "SOZ-2": ["Beobachtet was Erwachsener und Kind tun", "Beobachtet Vater beim Reden"],
    "SOZ-3": ["Schaut hoch wenn Name gerufen wird", "Reagiert auf den eigenen Namen"],
    "SOZ-4": ["Stapelt Bauklötze allein", "Klettert Rutsche hoch und rutscht runter"],
    "SOZ-5": ["Führt Hand des Erwachsenen zum Keks", "Zeigt auf gewünschten Gegenstand"],
    "SOZ-6": ["Geht zur Mutter und erlaubt Arm um sich", "Rutscht zur Erzieherin hinüber"],
    "SOZ-7": ["Setzt sich auf Aufforderung", "Hängt Mantel auf wenn gesagt"],
    "SOZ-8": ["Sagt 'Milch' wenn Vater Milch hinstellt", "Sagt 'Bauen' mit Bauklötzen"],
    "SOZ-9": ["Erkennt sich im Spiegel", "Verwendet 'ich, mein, mir'"],
    "SOZ-10": ["Spielt mit Lastwagen neben Kind mit Auto", "Baut Turm während anderes Kind auch baut"],
    "SOZ-11": ["Sagt 'Auto' zu Kind mit Lieblingsauto", "Sagt 'Geh weg'"],
    "SOZ-12": ["Betritt Raum und umarmt Erzieherin", "Bringt Buch um Bild zu zeigen"],
    "SOZ-13": ["Spielt 'Einkaufen gehen' mit Spielgeld", "Tut als ob Bus fahren"],
    "SOZ-14": ["Wartet auf Position nach Ermutigung", "Bleibt stehen wenn gesagt 'Warte bitte'"],
    "SOZ-15": ["Geht zu freiem Stuhl neben bestimmtem Kind", "Schließt sich Murmelspiel an"],
    "SOZ-16": ["Reicht Material/Spielzeug weiter", "Teilt Buntstifte mit anderem Kind"],
    "SOZ-17": ["Spielt 'Nachlaufen' mit anderem Kind", "Bereitet gemeinsam Puppenkaffeeklatsch vor"],
    "SOZ-18": ["Spielt Dialog in Theaterstück mit Partner", "Malt gemeinsam Teil eines Wandgemäldes"],
    "SOZ-19": ["Teilt Erdnussflips beim Fernsehen mit Bruder", "Wechselt sich ab beim Völkerball"],
    "SOZ-20": ["Hängt Mantel auf wie älterer Bruder", "Bleibt bei Gruppe statt loszurennen"],
    "SOZ-21": ["Sagt 'Das ist nicht fair'", "Sagt 'Wände beschmieren ist schlecht'"],
    "SOZ-22": ["Demonstriert anderen wie Lagerfeuer entzünden", "Organisiert Frage-Antwort-Spiel"],
    "SOZ-23": ["Nimmt an Aktivität teil obwohl anderes gewünscht", "Akzeptiert Vorschlag der Schwester"],
    "SOZ-24": ["Zeichnet Bilderreihe über Erlebnis", "Beschreibt Konfliktverlauf im Gespräch"],
    "SOZ-25": ["Sagt 'Ich will mit Peter in der Mannschaft sein'", "Wählt regelmäßig bestimmtes Kind"],
    "SOZ-26": ["Zeigt Bild und fragt 'Wie findest du das?'", "Bittet Mitschüler um Hilfe"],
    "SOZ-27": ["Sagt im Kino 'Seid leise sonst setzen sie uns raus'", "Erklärt Neuem die Klassenregeln"],
    "SOZ-28": ["Sammelt Infos über Olympiasieger", "Imitiert Stil der beliebten Lehrerin"],
    "SOZ-29": ["Erzählt Details über Gruppenerlebnis", "Beschreibt Konfliktverlauf der Gruppe"],
    "SOZ-30": ["Schlägt vor 'Sollen wir fragen ob Fußball?'", "Initiiert geeignete Gruppenaktivität"],
    "SOZ-31": ["Sagt 'Peter soll gehen, er hat keine Angst'", "Erkennt Unterschiede zu anderen"],
    "SOZ-32": ["Hört aufmerksam zu bei Erklärung", "Akzeptiert Trainers Rat"],
    "SOZ-33": ["Sagt 'Ich glaube Luise mag mich nicht mehr'", "Fragt nach Meinung über sich"],
    "SOZ-34": ["Schlägt Abstimmung vor für Ausflugsziel", "Bietet konstruktive Lösung an"],
    "SOZ-35": ["'Nachbarin hält Prügel für normal'", "Erkennt gegensätzliche Werte"],
    "SOZ-36": ["Sagt 'Eltern hatten wohl Sorgen'", "Zieht Schlussfolgerungen aus Situationen"],
    "SOZ-37": ["'Daniels Eltern erlauben ihm nichts, ist nicht fair'", "Zeigt Verständnis für andere"],
    "SOZ-38": ["Geben-Nehmen Austausch mit Freund", "Nimmt verschiedene Rollen ein"],
    "SOZ-39": ["'Ich mag nicht mit Billy sein, der ist Unruhestifter'", "Trifft Entscheidungen nach Werten"],
    "SOZ-40": ["Erkennt 'Ich bin zu klein für erstklassigen Basketball'", "Zeigt realistisches Selbstbild"],
    "SOZ-41": ["Entwickelt offene Freundschaft", "Engagiert sich in Gruppe"],
    // KOGNITION
    "KOG-1": ["Wendet sich Seifenblasen zu", "Dreht Kopf zur Gitarrenmusik"],
    "KOG-2": ["Beobachtet Seifenblasen weiter", "Beobachtet Erwachsenen weiter"],
    "KOG-3": ["Lächelt bei vertrautem Erwachsenen", "Macht Gesten wenn es essen will"],
    "KOG-4": ["Spritzt nach Aufforderung und Vormachen", "Fährt Auto nach verbalem Hinweis"],
    "KOG-5": ["Winkt zum Abschied nach Vorbild", "Imitiert Klötzestapeln"],
    "KOG-6": ["Baut Turm aus 3-5 Klötzen", "Rennt, klettert, geht allein"],
    "KOG-7": ["Zeigt auf genanntes Spielzeug", "Wählt richtig zwischen Papier und Stiften"],
    "KOG-8": ["Antwortet annähernd mit Namen", "Gibt Wortannäherung auf Objekt"],
    "KOG-9": ["Sagt 'Mi..Mi' bei Milch", "Sagt 'Gehn' wenn es gehen will"],
    "KOG-10": ["Steckt Formen in passendes Brett", "Legt Puzzleteile richtig"],
    "KOG-11": ["Antwortet richtig auf 'Was ist das?' bei Haaren", "Zeigt Ohr/Fuß auf Frage"],
    "KOG-12": ["Zeigt richtige Person im Bild", "Sagt 'Hund' und zeigt ihn unter Objekten"],
    "KOG-13": ["Sortiert Lastwagen und Autos in zwei Kisten", "Ordnet Objekte in Kategorien"],
    "KOG-14": ["Zeigt Hund im Buch, sagt 'Hund'", "Benennt Abbildungen mit Wörtern"],
    "KOG-15": ["Erklärt/zeigt wozu Schaufel dient", "Demonstriert Verwendung von Gegenständen"],
    "KOG-16": ["Fährt Gokart", "Balanciert kurz auf einem Fuß"],
    "KOG-17": ["Zieht Linie zwischen zwei gleichen Bällen", "Findet Memory-Paare"],
    "KOG-18": ["Baut Brücke aus Bauklötzen", "Fädelt Perlen auf"],
    "KOG-19": ["Findet anderen Lastwagen unter drei Wagen", "Erkennt was anders ist"],
    "KOG-20": ["Versteht: hoch/runter, unter/über", "Zeigt Ersten und Letzten in Reihe"],
    "KOG-21": ["Sortiert Bilder: Menschen hierhin, Tiere dahin", "Ordnet nach Kategorien zu"],
    "KOG-22": ["Nennt 1-4 in richtiger Reihenfolge", "Zeigt beim Zählen auf jeweiliges Objekt"],
    "KOG-23": ["Zeigt richtig auf Kreis, Viereck, Dreieck", "Benennt vier Farben"],
    "KOG-24": ["Wechselt zwischen 'Was ist anders?' und 'Was ist gleich?'", "Reagiert auf wechselnde Aufgaben"],
    "KOG-25": ["Wählt 10 Bauklötze für Straße", "Zählt 10 Becher ab"],
    "KOG-26": ["Zeichnet Menschen mit Körper", "Schreibt Namen ab", "Schneidet an Linien"],
    "KOG-27": ["Findet Buchstaben unter Zeichen", "Unterscheidet Ziffern von Buchstaben"],
    "KOG-28": ["Hüpft abwechselnd mit beiden Füßen", "Fährt Fahrrad mit Stützrädern"],
    "KOG-29": ["Erkennt Anzahl Dominopunkte ohne Zählen", "Erfasst Mengen bis 5 spontan"],
    "KOG-30": ["Singt Lied von ca. 30 Wörtern", "Zählt bis 20"],
    "KOG-31": ["Ordnet drei Bilder zu Geschichte richtig", "Beantwortet 'Was passiert zuerst?'"],
    "KOG-32": ["Zeichnet Menschen mit Armen, Beinen, Kleidung", "Bindet Schnürsenkel"],
    "KOG-33": ["Wirft und fängt Ball gesteuert", "Unterscheidet rechts und links"],
    "KOG-34": ["Liest 50 Wörter des Grundwortschatzes", "Liest einfache Wörter flüssig"],
    "KOG-35": ["Schreibt 1-10 auswendig", "Schreibt Zahl zu gezeigter Menge"],
    "KOG-36": ["Schreibt 50 Wörter lesbar nach Diktat", "Schreibt Grundwortschatz"],
    "KOG-37": ["Erinnert sich an Details einer Geschichte", "Beantwortet Fragen zur Geschichte"],
    "KOG-38": ["Erklärt: 'Junge weint weil andere ihn ärgern'", "Erklärt Verhalten anderer"],
    "KOG-39": ["Liest einfache Sätze und beantwortet Fragen", "Versteht Inhalt beim Lesen"],
    "KOG-40": ["Beherrscht Addition und Subtraktion bis 9", "Rechnet einfache Aufgaben"],
    "KOG-41": ["Erkennt was im Bild fehlt", "Findet Unstimmigkeiten"],
    "KOG-42": ["Schreibt Eigenschaften einer Figur auf", "Beantwortet Fragen schriftlich"],
    "KOG-43": ["Schwimmt, trifft Ball beim Schlagball", "Nimmt an Staffellauf teil"],
    "KOG-44": ["Schreibt drei Sätze als Geschichtsende", "Formuliert eigene Sätze"],
    "KOG-45": ["Addiert/subtrahiert bis 100", "Benennt Uhrzeiten", "Zählt in 5er/10er"],
    "KOG-46": ["Versteht Viertel/Halbe Stunden", "Versteht Zentimeter/Meter"],
    "KOG-47": ["Erzählt von Zeitungsbericht", "Fasst Gelesenes zusammen"],
    "KOG-48": ["Ordnet Zahlen in Stellenwerttabelle", "Rechnet mit Übertrag"],
    "KOG-49": ["Schreibt Artikel für Schülerzeitung", "Schreibt Briefe"],
    "KOG-50": ["Beherrscht Einmaleins", "Versteht 2+2+2+2 = 4x2"],
    "KOG-51": ["Liest Zeitschriften zum Hobby", "Liest aus eigenem Interesse"],
    "KOG-52": ["Wechselt Cent-Münzen in größere", "Rechnet mit Geld"],
    "KOG-53": ["Beschreibt Fernsehfigur nach Aussehen und Verhalten", "Erklärt Motive von Figuren"],
    "KOG-54": ["Verwendet korrekte Grammatik und Rechtschreibung", "Schreibt Aufsätze"],
    "KOG-55": ["Unterscheidet legal/illegal", "Erkennt verschiedene Wertvorstellungen"],
    "KOG-56": ["Wendet Mathematik in Sachaufgaben an", "Plant mit Preisvergleich"],
    "KOG-57": ["Führt Meinungsumfrage durch", "Nimmt an Debatten teil"],
    "KOG-58": ["Unterscheidet Fakten von Meinungen", "Hinterfragt Berichte kritisch"],
    "KOG-59": ["Erkennt widersprüchliche Aussagen", "Bemerkt inkonsistentes Verhalten"],
    "KOG-60": ["Berechnet Mehrwertsteuer", "Passt Rezeptmengen an"],
    "KOG-61": ["Analysiert Probleme und wählt Lösung", "Verarbeitet schwierige Situationen"],
    "KOG-62": ["Berechnet Monatsbudget", "Diskutiert gesellschaftliche Themen"]
};

// ==========================================
// ITEM MODAL FUNKTIONEN
// Für Doppelklick auf Items
// ==========================================

function showItemModal(itemCode) {
    // Item-Daten aus ELDIB_DATA finden
    const data = getCurrentEldibData();
    const bereichKey = itemCode.split('-')[0];
    let bereichName = '';
    let bereichData = null;

    if (bereichKey === 'V') {
        bereichName = 'verhalten';
        bereichData = data.verhalten;
    } else if (bereichKey === 'K') {
        bereichName = 'kommunikation';
        bereichData = data.kommunikation;
    } else if (bereichKey === 'SOZ') {
        bereichName = 'sozialisation';
        bereichData = data.sozialisation;
    } else if (bereichKey === 'KOG') {
        bereichName = 'kognition';
        bereichData = data.kognition;
    }

    if (!bereichData) return;

    // Item in den Stufen finden (stufen ist ein Objekt, keine Array)
    let item = null;
    for (const stufe of Object.values(bereichData.stufen)) {
        item = stufe.items.find(i => i.code === itemCode);
        if (item) break;
    }

    if (!item) return;

    // Modal befüllen
    document.getElementById('modalItemCode').textContent = getDisplayCode(item.code);
    document.getElementById('modalItemCode').style.background = bereichData.color;
    document.getElementById('modalItemTitle').textContent = item.keyword;
    document.getElementById('modalItemDescription').textContent = item.description;

    // Beispiele anzeigen
    const beispiele = getCurrentBeispiele()[itemCode] || [];
    const examplesList = document.getElementById('modalExamplesList');
    if (beispiele.length > 0) {
        examplesList.innerHTML = beispiele.map(b => `<li>${b}</li>`).join('');
        document.getElementById('modalItemExamples').style.display = 'block';
    } else {
        document.getElementById('modalItemExamples').style.display = 'none';
    }

    document.getElementById('itemModal').classList.add('active');

    // ESC-Taste zum Schließen
    document.addEventListener('keydown', handleModalEsc);
}

function handleModalEsc(e) {
    if (e.key === 'Escape') closeItemModal();
}

function closeItemModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('itemModal').classList.remove('active');
    document.removeEventListener('keydown', handleModalEsc);
}

// ==========================================
// ZUSÄTZLICHE ZIELE-DATENBANK MIT 3-STUFEN-SYSTEM
// Für Jugendliche mit sozio-emotionalen Schwierigkeiten
// Stufe 1: In Arbeit | Stufe 2: Mit Unterstützung | Stufe 3: Selbstständig erreicht
// ==========================================

const ZUSAETZLICHE_ZIELE = {
    // DÉMARCHES MENTALES - Kognitive Strategien und Denkprozesse
    demarches_mentales: [
        { id: 'DM-1', title: 'Problemanalyse', stufen: { stufe1: 'lernt noch, ein Problem in kleinere Teile zu zerlegen', stufe2: 'kann mit Unterstützung ein Problem in kleinere Teile zerlegen', stufe3: 'kann ein Problem in kleinere Teile zerlegen und analysieren' }, intervention: ['Problemzerlegung üben', 'Mindmaps erstellen', 'Schritt-für-Schritt-Anleitungen nutzen'] },
        { id: 'DM-2', title: 'Lösungsstrategien', stufen: { stufe1: 'lernt noch, verschiedene Lösungswege für ein Problem zu finden', stufe2: 'kann mit Unterstützung verschiedene Lösungswege entwickeln', stufe3: 'kann verschiedene Lösungswege für ein Problem finden' }, intervention: ['Brainstorming-Techniken', 'Vor- und Nachteile abwägen', 'Kreative Lösungsansätze fördern'] },
        { id: 'DM-3', title: 'Entscheidungsfindung', stufen: { stufe1: 'lernt noch, begründete Entscheidungen zu treffen', stufe2: 'kann mit Unterstützung begründete Entscheidungen treffen', stufe3: 'kann begründete Entscheidungen treffen' }, intervention: ['Entscheidungsmatrix nutzen', 'Pro-Contra-Listen erstellen', 'Konsequenzen durchdenken'] },
        { id: 'DM-4', title: 'Planung', stufen: { stufe1: 'lernt noch, Aufgaben zu planen und zu strukturieren', stufe2: 'kann mit Unterstützung Aufgaben planen und strukturieren', stufe3: 'kann Aufgaben planen und strukturieren' }, intervention: ['Tages-/Wochenpläne erstellen', 'Prioritäten setzen', 'Zeitmanagement üben'] },
        { id: 'DM-5', title: 'Selbstreflexion', stufen: { stufe1: 'lernt noch, das eigene Lernverhalten zu reflektieren', stufe2: 'kann mit Anleitung das eigene Lernverhalten reflektieren', stufe3: 'kann das eigene Lernverhalten reflektieren' }, intervention: ['Reflexionsfragen im Unterricht stellen', 'Lerntagebuch führen', 'Selbsteinschätzung nach Aufgaben'] },
        { id: 'DM-6', title: 'Hypothesenbildung', stufen: { stufe1: 'lernt noch, Vermutungen aufzustellen und zu überprüfen', stufe2: 'kann mit Unterstützung Vermutungen aufstellen und überprüfen', stufe3: 'kann Vermutungen aufstellen und überprüfen' }, intervention: ['Wissenschaftliches Denken üben', 'Experimente durchführen', 'Wenn-Dann-Überlegungen'] },
        { id: 'DM-7', title: 'Schlussfolgern', stufen: { stufe1: 'lernt noch, aus Informationen logische Schlüsse zu ziehen', stufe2: 'kann mit Unterstützung logische Schlüsse ziehen', stufe3: 'kann aus Informationen logische Schlüsse ziehen' }, intervention: ['Logikrätsel lösen', 'Argumentationsketten bilden', 'Deduktives Denken üben'] },
        { id: 'DM-8', title: 'Abstraktion', stufen: { stufe1: 'lernt noch, allgemeine Regeln aus Beispielen abzuleiten', stufe2: 'kann mit Unterstützung allgemeine Regeln ableiten', stufe3: 'kann allgemeine Regeln aus Beispielen ableiten' }, intervention: ['Muster erkennen', 'Kategorien bilden', 'Vom Konkreten zum Abstrakten'] },
        { id: 'DM-9', title: 'Perspektivwechsel', stufen: { stufe1: 'lernt noch, Situationen aus verschiedenen Blickwinkeln zu betrachten', stufe2: 'kann mit Anleitung verschiedene Perspektiven einnehmen', stufe3: 'kann Situationen aus verschiedenen Blickwinkeln betrachten' }, intervention: ['Rollenspiele', 'Andere Meinungen einholen', 'Standortwechsel üben'] },
        { id: 'DM-10', title: 'Kritisches Denken', stufen: { stufe1: 'lernt noch, Informationen kritisch zu hinterfragen', stufe2: 'kann mit Unterstützung Informationen kritisch hinterfragen', stufe3: 'kann zu Momenten Informationen kritisch hinterfragen' }, intervention: ['Quellen prüfen', 'Fakten von Meinungen unterscheiden', 'Argumente analysieren'] },
        { id: 'DM-11', title: 'Kreatives Denken', stufen: { stufe1: 'lernt noch, neue und originelle Ideen zu entwickeln', stufe2: 'kann mit Anregung neue Ideen entwickeln', stufe3: 'kann neue und originelle Ideen entwickeln' }, intervention: ['Brainstorming ohne Bewertung', 'Ungewöhnliche Verbindungen suchen', 'Kreativitätstechniken anwenden'] },
        { id: 'DM-12', title: 'Transferleistung', stufen: { stufe1: 'lernt noch, Gelerntes auf neue Situationen zu übertragen', stufe2: 'kann mit Hinweisen Gelerntes auf neue Situationen übertragen', stufe3: 'kann Gelerntes auf neue Situationen übertragen' }, intervention: ['Anwendungsbeispiele suchen', 'Parallelen ziehen', 'Generalisierung üben'] },
        { id: 'DM-13', title: 'Informationsverarbeitung', stufen: { stufe1: 'lernt noch, wichtige von unwichtigen Informationen zu unterscheiden', stufe2: 'kann mit Unterstützung Kerninformationen identifizieren', stufe3: 'kann wichtige von unwichtigen Informationen unterscheiden' }, intervention: ['Kerninformationen markieren', 'Zusammenfassungen erstellen', 'Filterstrategien anwenden'] },
        { id: 'DM-14', title: 'Gedächtnisstrategien', stufen: { stufe1: 'lernt noch, Gedächtnisstrategien anzuwenden', stufe2: 'kann mit Anleitung Gedächtnisstrategien anwenden', stufe3: 'kann verschiedene Gedächtnisstrategien gezielt anwenden' }, intervention: ['Eselsbrücken bauen', 'Visualisierungen nutzen', 'Wiederholungstechniken anwenden'] },
        { id: 'DM-15', title: 'Antizipation', stufen: { stufe1: 'lernt noch, Konsequenzen von Handlungen vorherzusehen', stufe2: 'kann mit Unterstützung Konsequenzen antizipieren', stufe3: 'kann mögliche Konsequenzen von Handlungen vorhersehen' }, intervention: ['Szenarien durchspielen', 'Wenn-Dann-Ketten bilden', 'Vorausschauend denken üben'] }
    ],

    // MANIÈRES D'APPRENDRE - Lernstrategien und Lernverhalten
    manieres_apprendre: [
        { id: 'MA-1', title: 'Lernmotivation', stufen: { stufe1: 'hat noch Schwierigkeiten, sich selbst zum Lernen zu motivieren', stufe2: 'kann sich mit Unterstützung zum Lernen motivieren', stufe3: 'kann sich zum Lernen motivieren' }, intervention: ['Intrinsische Motivation stärken', 'Lernziele setzen', 'Erfolge feiern'] },
        { id: 'MA-2', title: 'Lernorganisation', stufen: { stufe1: 'lernt noch, Lernplatz und Materialien zu organisieren', stufe2: 'kann mit Unterstützung Lernplatz und Materialien organisieren', stufe3: 'kann Lernplatz und Materialien organisieren' }, intervention: ['Ordnungssysteme einführen', 'Arbeitsplatz gestalten', 'Materialchecklisten nutzen'] },
        { id: 'MA-3', title: 'Zeitmanagement', stufen: { stufe1: 'lernt noch, die Lernzeit effektiv einzuteilen', stufe2: 'kann mit Unterstützung die Lernzeit einteilen', stufe3: 'kann die Lernzeit effektiv einteilen' }, intervention: ['Pomodoro-Technik', 'Lernpläne erstellen', 'Pausen einplanen'] },
        { id: 'MA-4', title: 'Konzentration', stufen: { stufe1: 'hat noch Schwierigkeiten, sich über längere Zeit zu konzentrieren', stufe2: 'kann sich mit Unterstützung über längere Zeit konzentrieren', stufe3: 'kann sich über längere Zeit konzentrieren' }, intervention: ['Ablenkungen minimieren', 'Konzentrationsphasen steigern', 'Fokussierungsübungen'] },
        { id: 'MA-5', title: 'Selbstständiges Lernen', stufen: { stufe1: 'lernt noch, selbstständig zu lernen und zu arbeiten', stufe2: 'kann mit Anleitung selbstständiger lernen und arbeiten', stufe3: 'kann selbstständig lernen und arbeiten' }, intervention: ['Eigenverantwortung stärken', 'Hilfe gezielt suchen', 'Lernprozess selbst steuern'] },
        { id: 'MA-6', title: 'Lernstrategien', stufen: { stufe1: 'lernt noch, verschiedene Lernstrategien anzuwenden', stufe2: 'kann mit Unterstützung verschiedene Lernstrategien anwenden', stufe3: 'kann verschiedene Lernstrategien anwenden' }, intervention: ['Lerntyp ermitteln', 'Verschiedene Methoden ausprobieren', 'Passende Strategien wählen'] },
        { id: 'MA-7', title: 'Fehlertoleranz', stufen: { stufe1: 'hat noch Schwierigkeiten, aus Fehlern zu lernen ohne aufzugeben', stufe2: 'kann mit Ermutigung aus Fehlern lernen', stufe3: 'kann aus Fehlern lernen, ohne aufzugeben' }, intervention: ['Fehler als Lernchance sehen', 'Fehleranalyse durchführen', 'Growth Mindset fördern'] },
        { id: 'MA-8', title: 'Ausdauer', stufen: { stufe1: 'hat noch Schwierigkeiten, bei Schwierigkeiten durchzuhalten', stufe2: 'kann mit Unterstützung bei Schwierigkeiten durchhalten', stufe3: 'kann auch bei Schwierigkeiten durchhalten' }, intervention: ['Kleine Etappenziele setzen', 'Durchhaltevermögen stärken', 'Erfolge dokumentieren'] },
        { id: 'MA-9', title: 'Neugier', stufen: { stufe1: 'zeigt noch wenig Interesse und Neugier an neuen Themen', stufe2: 'zeigt mit Anregung Interesse an neuen Themen', stufe3: 'zeigt Interesse und Neugier an neuen Themen' }, intervention: ['Entdeckendes Lernen fördern', 'Fragen ermutigen', 'Interessen aufgreifen'] },
        { id: 'MA-10', title: 'Lernreflexion', stufen: { stufe1: 'lernt noch, den eigenen Lernprozess zu reflektieren', stufe2: 'kann mit Anleitung den Lernprozess reflektieren', stufe3: 'kann den eigenen Lernprozess reflektieren und verbessern' }, intervention: ['Lerntagebuch führen', 'Was hat funktioniert? Was nicht?', 'Verbesserungsstrategien entwickeln'] },
        { id: 'MA-11', title: 'Notizen machen', stufen: { stufe1: 'lernt noch, wichtige Informationen zu notieren', stufe2: 'kann mit Anleitung wichtige Informationen notieren', stufe3: 'kann wichtige Informationen notieren' }, intervention: ['Verschiedene Notiztechniken', 'Stichpunkte vs. Fließtext', 'Strukturierte Mitschriften'] },
        { id: 'MA-12', title: 'Quellenarbeit', stufen: { stufe1: 'lernt noch, verschiedene Quellen zu nutzen und zu bewerten', stufe2: 'kann mit Unterstützung Quellen nutzen und bewerten', stufe3: 'kann verschiedene Quellen nutzen und bewerten' }, intervention: ['Recherchieren üben', 'Quellenkritik', 'Informationen zusammenführen'] },
        { id: 'MA-13', title: 'Visualisierung', stufen: { stufe1: 'lernt noch, Lerninhalte visuell darzustellen', stufe2: 'kann mit Anleitung Lerninhalte visuell darstellen', stufe3: 'kann Lerninhalte visuell darstellen' }, intervention: ['Mind-Maps erstellen', 'Sketchnotes', 'Diagramme zeichnen'] },
        { id: 'MA-14', title: 'Wiederholung', stufen: { stufe1: 'wiederholt Lerninhalte noch nicht regelmäßig', stufe2: 'wiederholt mit Erinnerung Lerninhalte regelmäßig', stufe3: 'wiederholt Lerninhalte regelmäßig' }, intervention: ['Spaced Repetition', 'Karteikarten nutzen', 'Regelmäßige Übungszeiten'] },
        { id: 'MA-15', title: 'Prüfungsvorbereitung', stufen: { stufe1: 'lernt noch, sich gezielt auf Prüfungen vorzubereiten', stufe2: 'kann sich mit Unterstützung auf Prüfungen vorbereiten', stufe3: 'kann sich gezielt auf Prüfungen vorbereiten' }, intervention: ['Prüfungssimulation', 'Zeitplanung für Vorbereitung', 'Prüfungsangst bewältigen'] },
        { id: 'MA-16', title: 'Kooperatives Lernen', stufen: { stufe1: 'hat noch Schwierigkeiten, mit anderen gemeinsam zu lernen', stufe2: 'kann mit Anleitung mit anderen gemeinsam lernen', stufe3: 'kann mit anderen gemeinsam lernen' }, intervention: ['Lerngruppen bilden', 'Peer-Teaching', 'Wissen teilen'] },
        { id: 'MA-17', title: 'Mediennutzung', stufen: { stufe1: 'lernt noch, digitale Medien sinnvoll zum Lernen zu nutzen', stufe2: 'kann mit Anleitung digitale Medien zum Lernen nutzen', stufe3: 'kann digitale Medien sinnvoll zum Lernen nutzen' }, intervention: ['Lern-Apps kennenlernen', 'Online-Ressourcen nutzen', 'Bildschirmzeit regulieren'] },
        { id: 'MA-18', title: 'Umgang mit Frustration', stufen: { stufe1: 'hat noch Schwierigkeiten, mit Lernfrustration umzugehen', stufe2: 'kann mit Unterstützung mit Lernfrustration umgehen', stufe3: 'kann mit Lernfrustration umgehen' }, intervention: ['Pause machen', 'Hilfe suchen', 'Aufgaben aufteilen'] },
        { id: 'MA-19', title: 'Klassenregeln einhalten', stufen: { stufe1: 'hat noch Schwierigkeiten, Klassenregeln einzuhalten', stufe2: 'kann mit Erinnerung Klassenregeln einhalten', stufe3: 'hält die Klassenregeln ein, auch in offenen Unterrichtssituationen' }, intervention: ['Regeln visualisieren', 'Positive Verstärkung', 'Selbstkontrolle üben'] },
        { id: 'MA-20', title: 'Arbeitsaufträge annehmen', stufen: { stufe1: 'hat noch Schwierigkeiten, Arbeitsaufträge anzunehmen', stufe2: 'nimmt mit Ermutigung Arbeitsaufträge an', stufe3: 'kann Arbeitsaufträge annehmen, auch wenn sie nicht den Vorstellungen entsprechen' }, intervention: ['Flexibilität fördern', 'Sinn erklären', 'Kompromisse finden'] },
        { id: 'MA-21', title: 'Motivation bei ungeliebten Aufgaben', stufen: { stufe1: 'zeigt noch wenig Motivation bei ungeliebten Aufgaben', stufe2: 'zeigt mit Unterstützung Motivation bei ungeliebten Aufgaben', stufe3: 'zeigt Motivation auch bei weniger geschätzten Aufgaben' }, intervention: ['Sinn vermitteln', 'Kleine Belohnungen', 'Durchhaltevermögen stärken'] },
        { id: 'MA-22', title: 'Ablenkung reduzieren', stufen: { stufe1: 'hat noch Schwierigkeiten, Ablenkungen im Unterricht zu vermeiden', stufe2: 'kann mit Erinnerung Ablenkungen reduzieren', stufe3: 'schafft weniger Ablenkung durch Gespräche im Unterricht' }, intervention: ['Fokussierung üben', 'Sitzordnung anpassen', 'Selbstdisziplin stärken'] },
        { id: 'MA-23', title: 'Anweisungen umsetzen', stufen: { stufe1: 'hat noch Schwierigkeiten, Anweisungen direkt umzusetzen', stufe2: 'setzt mit Erinnerung Anweisungen um', stufe3: 'setzt Anweisungen und Arbeitsaufträge direkt um' }, intervention: ['Klare Anweisungen', 'Verständnis prüfen', 'Prompte Reaktion üben'] },
        { id: 'MA-24', title: 'Autonomes Arbeiten', stufen: { stufe1: 'hat noch Schwierigkeiten, Aufträge selbstständig auszuführen', stufe2: 'kann mit anfänglicher Anleitung Aufträge ausführen', stufe3: 'kann selbstständig Arbeitsaufträge ausführen, nachdem sie erklärt wurden' }, intervention: ['Schrittweise Hilfe reduzieren', 'Selbstständigkeit fördern', 'Erfolgserlebnisse schaffen'] },
        { id: 'MA-25', title: 'Arbeitstempo steigern', stufen: { stufe1: 'hat noch Schwierigkeiten, das Arbeitstempo anzupassen', stufe2: 'kann mit Unterstützung das Arbeitstempo anpassen', stufe3: 'kann das Arbeitstempo an die Anforderungen anpassen' }, intervention: ['Zeitmanagement üben', 'Fokussierung trainieren', 'Effizienz steigern'] },
        { id: 'MA-26', title: 'Transfer ins Langzeitgedächtnis', stufen: { stufe1: 'hat noch Schwierigkeiten, Inhalte im Langzeitgedächtnis zu speichern', stufe2: 'kann mit Lernstrategien Inhalte besser behalten', stufe3: 'kann schulische Inhalte im Langzeitgedächtnis speichern' }, intervention: ['Wiederholung einplanen', 'Lernstrategien anwenden', 'Vernetzung herstellen'] },
        { id: 'MA-27', title: 'Schulische Perspektive entwickeln', stufen: { stufe1: 'hat noch Schwierigkeiten, die Ziele der Schulausbildung zu akzeptieren', stufe2: 'versteht mit Erklärung die Ziele der Schulausbildung', stufe3: 'versteht und akzeptiert die Ziele der Schulausbildung und hat eine realistische schulische Perspektive entwickelt' }, intervention: ['Zukunftsperspektiven aufzeigen', 'Sinn vermitteln', 'Berufsorientierung'] },
        { id: 'MA-28', title: 'Proaktiv Bedürfnisse kommunizieren', stufen: { stufe1: 'hat noch Schwierigkeiten, Bedürfnisse proaktiv zu äußern', stufe2: 'fragt mit Ermutigung nach dem, was benötigt wird', stufe3: 'fragt proaktiv nach dem, was benötigt oder gewünscht wird' }, intervention: ['Selbstadvokation üben', 'Initiative ergreifen', 'Bedürfnisse formulieren'] },
        { id: 'MA-29', title: 'Ohne Aufforderung handeln', stufen: { stufe1: 'benötigt noch Aufforderungen für alltägliche Aufgaben', stufe2: 'erledigt mit wenigen Erinnerungen alltägliche Aufgaben', stufe3: 'erledigt alltägliche Aufgaben ohne externe Aufforderung' }, intervention: ['Routinen etablieren', 'Eigenverantwortung stärken', 'Selbstständigkeit fördern'] },
        { id: 'MA-30', title: 'Flüchtigkeitsfehler reduzieren', stufen: { stufe1: 'macht noch häufig Flüchtigkeitsfehler', stufe2: 'kann mit Erinnerung konzentrierter arbeiten', stufe3: 'arbeitet konzentriert und reduziert Flüchtigkeitsfehler' }, intervention: ['Kontrolllesen üben', 'Fokussierungstechniken', 'Sorgfalt trainieren'] },
        { id: 'MA-31', title: 'Transferkompetenzen entwickeln', stufen: { stufe1: 'hat noch Schwierigkeiten, Kompetenzen in neuen Situationen anzuwenden', stufe2: 'kann mit Hinweisen Kompetenzen in neuen Situationen abrufen', stufe3: 'kann Kompetenzen auch in neuen Situationen abrufen' }, intervention: ['Generalisierung üben', 'Verschiedene Kontexte', 'Anwendung trainieren'] },
        { id: 'MA-32', title: 'Gute schulische Leistungen', stufen: { stufe1: 'arbeitet noch an der Verbesserung der schulischen Leistungen', stufe2: 'erreicht mit Unterstützung bessere schulische Leistungen', stufe3: 'erreicht gute schulische Leistungen und Prüfungsergebnisse' }, intervention: ['Lernstrategien anwenden', 'Vorbereitung', 'Kontinuierliches Üben'] },
        { id: 'MA-33', title: 'Regelmäßiger Schulbesuch', stufen: { stufe1: 'hat noch Schwierigkeiten mit regelmäßigem Schulbesuch', stufe2: 'besucht mit Unterstützung regelmäßiger die Schule', stufe3: 'besucht regelmäßig die Schule ohne Fehltage' }, intervention: ['Anwesenheit stärken', 'Motivation fördern', 'Auch bei leichtem Unwohlsein'] },
        { id: 'MA-34', title: 'Aufgaben ohne Zögern umsetzen', stufen: { stufe1: 'zögert noch häufig bei der Umsetzung von Arbeitsaufträgen', stufe2: 'setzt mit Ermutigung Arbeitsaufträge schneller um', stufe3: 'setzt Arbeitsaufträge umgehend und ohne Zögern um' }, intervention: ['Prompte Reaktion', 'Keine Vermeidung', 'Direkte Umsetzung'] },
        { id: 'MA-35', title: 'Engagement in Projekten', stufen: { stufe1: 'zeigt noch wenig Engagement in Projekten', stufe2: 'zeigt mit Anregung Engagement in Projekten', stufe3: 'zeigt Engagement in Projekten und besonderen Unterrichtsformen' }, intervention: ['Interessen einbringen', 'Aktive Teilnahme', 'Motivation zeigen'] },
        { id: 'MA-36', title: 'Strukturierte Arbeitsorganisation', stufen: { stufe1: 'benötigt noch viel Struktur bei der Arbeitsorganisation', stufe2: 'profitiert von Struktur und arbeitet damit besser', stufe3: 'kann von strukturierter Arbeitsorganisation profitieren und diese umsetzen' }, intervention: ['Struktur anbieten', 'Übersichtlichkeit', 'Klare Abläufe'] },
        { id: 'MA-37', title: 'Alternative Meinungen zulassen', stufen: { stufe1: 'hat noch Schwierigkeiten, alternative Meinungen zuzulassen', stufe2: 'kann mit Unterstützung alternative Meinungen akzeptieren', stufe3: 'kann alternative Meinungen zulassen und akzeptieren' }, intervention: ['Toleranz üben', 'Perspektivwechsel', 'Offenheit entwickeln'] }
    ],

    // ATTITUDES RELATIONNELLES - Beziehungsverhalten
    attitudes_relationnelles: [
        { id: 'AR-1', title: 'Vertrauen aufbauen', stufen: { stufe1: 'hat noch Schwierigkeiten, Vertrauen zu anderen aufzubauen', stufe2: 'kann mit Unterstützung Vertrauen zu anderen aufbauen', stufe3: 'kann Vertrauen zu anderen Menschen aufbauen' }, intervention: ['Verlässlichkeit zeigen', 'Offenheit ermöglichen', 'Zeit geben'] },
        { id: 'AR-2', title: 'Grenzen setzen', stufen: { stufe1: 'hat noch Schwierigkeiten, eigene Grenzen zu erkennen und zu kommunizieren', stufe2: 'kann mit Unterstützung eigene Grenzen kommunizieren', stufe3: 'kann eigene Grenzen erkennen und kommunizieren' }, intervention: ['Nein sagen üben', 'Grenzen benennen', 'Selbstfürsorge praktizieren'] },
        { id: 'AR-3', title: 'Grenzen respektieren', stufen: { stufe1: 'hat noch Schwierigkeiten, die Grenzen anderer zu respektieren', stufe2: 'kann mit Erinnerung die Grenzen anderer respektieren', stufe3: 'kann verstärkt die Grenzen anderer Mitschüler:innen respektieren' }, intervention: ['Auf Signale achten', 'Nachfragen bei Unsicherheit', 'Respekt vorleben'] },
        { id: 'AR-4', title: 'Aktives Zuhören', stufen: { stufe1: 'hat noch Schwierigkeiten, anderen aufmerksam zuzuhören', stufe2: 'kann mit Anleitung anderen aufmerksam zuhören', stufe3: 'kann anderen aufmerksam zuhören' }, intervention: ['Blickkontakt halten', 'Nachfragen stellen', 'Zusammenfassen üben'] },
        { id: 'AR-5', title: 'Empathie zeigen', stufen: { stufe1: 'hat noch Schwierigkeiten, sich in andere hineinzuversetzen', stufe2: 'kann mit Unterstützung sich in andere hineinversetzen', stufe3: 'kann sich in andere hineinversetzen' }, intervention: ['Gefühle anderer benennen', 'Perspektivübernahme üben', 'Mitgefühl ausdrücken'] },
        { id: 'AR-6', title: 'Konflikte lösen', stufen: { stufe1: 'hat noch Schwierigkeiten, Konflikte friedlich zu lösen', stufe2: 'kann mit Moderation Konflikte friedlich lösen', stufe3: 'kann Konflikte friedlich lösen' }, intervention: ['Ich-Botschaften verwenden', 'Kompromisse finden', 'Win-Win-Lösungen suchen'] },
        { id: 'AR-7', title: 'Kritikfähigkeit', stufen: { stufe1: 'hat noch Schwierigkeiten, konstruktive Kritik anzunehmen', stufe2: 'kann mit Unterstützung konstruktive Kritik annehmen', stufe3: 'kann besser mit konstruktiver Kritik umgehen' }, intervention: ['Feedback-Regeln anwenden', 'Kritik nicht persönlich nehmen', 'Sachlich bleiben'] },
        { id: 'AR-8', title: 'Hilfe annehmen', stufen: { stufe1: 'hat noch Schwierigkeiten, Hilfe von anderen anzunehmen', stufe2: 'kann mit Ermutigung Hilfe von anderen annehmen', stufe3: 'kann Hilfe von anderen annehmen' }, intervention: ['Hilfe als Stärke sehen', 'Vertrauen in andere', 'Dankbarkeit zeigen'] },
        { id: 'AR-9', title: 'Hilfe anbieten', stufen: { stufe1: 'bietet noch selten Hilfe an', stufe2: 'kann mit Anregung anderen Hilfe anbieten', stufe3: 'kann anderen Hilfe anbieten' }, intervention: ['Aufmerksam für Bedürfnisse sein', 'Unterstützung anbieten', 'Ohne Erwartung helfen'] },
        { id: 'AR-10', title: 'Freundschaften pflegen', stufen: { stufe1: 'hat noch Schwierigkeiten, Freundschaften aufzubauen und zu pflegen', stufe2: 'kann mit Unterstützung Freundschaften pflegen', stufe3: 'kann Freundschaften aufbauen und pflegen' }, intervention: ['Regelmäßiger Kontakt', 'Interesse zeigen', 'Gemeinsame Aktivitäten'] },
        { id: 'AR-11', title: 'Teamfähigkeit', stufen: { stufe1: 'hat noch Schwierigkeiten, effektiv im Team zu arbeiten', stufe2: 'kann mit Anleitung effektiv im Team arbeiten', stufe3: 'kann effektiv im Team arbeiten' }, intervention: ['Rollen akzeptieren', 'Beiträge wertschätzen', 'Kompromissbereitschaft'] },
        { id: 'AR-12', title: 'Respektvoller Umgang', stufen: { stufe1: 'begegnet anderen noch nicht immer mit Respekt', stufe2: 'begegnet mit Erinnerung anderen mit Respekt', stufe3: 'begegnet anderen mit Respekt' }, intervention: ['Höflichkeitsformen', 'Wertschätzung zeigen', 'Würde achten'] },
        { id: 'AR-13', title: 'Toleranz', stufen: { stufe1: 'hat noch Schwierigkeiten, Unterschiede zwischen Menschen zu akzeptieren', stufe2: 'kann mit Gesprächen Unterschiede besser akzeptieren', stufe3: 'akzeptiert Unterschiede zwischen Menschen' }, intervention: ['Vielfalt als Bereicherung', 'Vorurteile reflektieren', 'Offenheit fördern'] },
        { id: 'AR-14', title: 'Verantwortung übernehmen', stufen: { stufe1: 'hat noch Schwierigkeiten, Verantwortung für das eigene Handeln zu übernehmen', stufe2: 'kann mit Unterstützung Verantwortung übernehmen', stufe3: 'übernimmt Verantwortung für das eigene Handeln' }, intervention: ['Konsequenzen tragen', 'Fehler eingestehen', 'Wiedergutmachung anbieten'] },
        { id: 'AR-15', title: 'Verbindlichkeit', stufen: { stufe1: 'hat noch Schwierigkeiten, Versprechen und Abmachungen einzuhalten', stufe2: 'kann mit Erinnerung Versprechen einhalten', stufe3: 'hält Versprechen und Abmachungen ein' }, intervention: ['Termine einhalten', 'Zuverlässigkeit üben', 'Erwartungen klären'] },
        { id: 'AR-16', title: 'Nähe und Distanz', stufen: { stufe1: 'hat noch Schwierigkeiten, ein angemessenes Maß an Nähe und Distanz zu wahren', stufe2: 'kann mit Hinweisen angemessene Distanz wahren', stufe3: 'hält eine angemessene körperliche Distanz zu anderen Personen ein' }, intervention: ['Körperliche Distanz beachten', 'Intimsphäre respektieren', 'Situationsangemessen handeln'] },
        { id: 'AR-17', title: 'Kooperationsbereitschaft', stufen: { stufe1: 'zeigt noch wenig Bereitschaft, mit anderen zusammenzuarbeiten', stufe2: 'zeigt mit Ermutigung Kooperationsbereitschaft', stufe3: 'ist bereit, mit anderen zusammenzuarbeiten' }, intervention: ['Gemeinsame Ziele verfolgen', 'Beiträge leisten', 'Zusammenarbeit wertschätzen'] },
        { id: 'AR-18', title: 'Durchsetzungsvermögen', stufen: { stufe1: 'hat noch Schwierigkeiten, die eigene Meinung angemessen zu vertreten', stufe2: 'kann mit Unterstützung die eigene Meinung vertreten', stufe3: 'kann die eigene Meinung angemessen vertreten' }, intervention: ['Selbstbewusst auftreten', 'Argumente formulieren', 'Standhaft bleiben ohne aggressiv zu sein'] },
        { id: 'AR-19', title: 'Wertschätzung zeigen', stufen: { stufe1: 'zeigt noch selten Wertschätzung gegenüber Lehrpersonen und Mitschüler:innen', stufe2: 'zeigt mit Anregung Wertschätzung', stufe3: 'zeigt Wertschätzung und Dankbarkeit gegenüber Lehrpersonen und Mitschüler:innen' }, intervention: ['Sich bedanken üben', 'Hilfe anerkennen', 'Positive Rückmeldungen geben'] },
        { id: 'AR-20', title: 'Authentisches Auftreten', stufen: { stufe1: 'hat noch Schwierigkeiten, authentisch aufzutreten', stufe2: 'kann mit Ermutigung authentischer auftreten', stufe3: 'kann in der Schule authentisch auftreten und die eigene Meinung ehrlich äußern' }, intervention: ['Eigene Meinung vertreten üben', 'Ehrlich kommunizieren', 'Selbstbewusst auftreten'] },
        { id: 'AR-21', title: 'Eigener Konfliktanteil', stufen: { stufe1: 'hat noch Schwierigkeiten, den eigenen Anteil in Konflikten zu erkennen', stufe2: 'kann mit Reflexionsgesprächen den eigenen Anteil erkennen', stufe3: 'kann den eigenen Anteil in Konfliktsituationen erkennen und akzeptieren' }, intervention: ['Reflexionsgespräche führen', 'Perspektivwechsel üben', 'Verantwortung übernehmen'] },
        { id: 'AR-22', title: 'Erfolge anderer anerkennen', stufen: { stufe1: 'hat noch Schwierigkeiten, Erfolge anderer anzuerkennen', stufe2: 'kann mit Unterstützung Erfolge anderer anerkennen', stufe3: 'kann die Erfolge anderer anerkennen und sich für sie freuen' }, intervention: ['Gratulieren üben', 'Neid reflektieren', 'Teamgeist fördern'] },
        { id: 'AR-23', title: 'Alternative Verhaltensweisen', stufen: { stufe1: 'hat noch Schwierigkeiten, Verhaltensalternativen anzuwenden', stufe2: 'kann mit Erinnerung Verhaltensalternativen anwenden', stufe3: 'kann in schwierigen Situationen Verhaltensalternativen anwenden' }, intervention: ['Verhaltensalternativen für Klassensituationen erarbeiten', 'Rollenspiele durchführen', 'Positive Verstärkung im Schulalltag'] },
        { id: 'AR-24', title: 'Konflikte vorbeugen', stufen: { stufe1: 'hat noch Schwierigkeiten, Konfliktsituationen vorzubeugen', stufe2: 'kann mit Unterstützung präventiv auf Konflikte reagieren', stufe3: 'kann präventiv auf mögliche Konfliktsituationen reagieren' }, intervention: ['Frühwarnsignale erkennen', 'Deeskalationsstrategien', 'Kommunikation vor Konflikten'] },
        { id: 'AR-25', title: 'Nonverbale Kommunikation', stufen: { stufe1: 'setzt Körpersprache noch nicht bewusst ein', stufe2: 'kann mit Anleitung Körpersprache bewusster einsetzen', stufe3: 'kann Körpersprache bewusst einsetzen' }, intervention: ['Körperhaltung üben', 'Mimik und Gestik reflektieren', 'Selbstbewusstes Auftreten'] },
        { id: 'AR-26', title: 'Provokationen meiden', stufen: { stufe1: 'hat noch Schwierigkeiten, Provokationen zu meiden', stufe2: 'kann mit Unterstützung Provokationen besser meiden', stufe3: 'kann Provokationen aktiv und passiv meiden' }, intervention: ['Trigger erkennen', 'Abstand nehmen', 'Nicht reagieren üben'] },
        { id: 'AR-27', title: 'Sich entschuldigen', stufen: { stufe1: 'hat noch Schwierigkeiten, sich angemessen zu entschuldigen', stufe2: 'kann mit Anleitung sich entschuldigen', stufe3: 'kann sich angemessen entschuldigen, wenn ein Fehler gemacht wurde' }, intervention: ['Entschuldigung formulieren', 'Wiedergutmachung anbieten', 'Einsicht zeigen'] },
        { id: 'AR-28', title: 'Aussprechen lassen', stufen: { stufe1: 'hat noch Schwierigkeiten, andere ausreden zu lassen', stufe2: 'kann mit Erinnerung andere ausreden lassen', stufe3: 'kann andere ausreden lassen und warten, bis man an der Reihe ist' }, intervention: ['Aktives Zuhören üben', 'Geduld trainieren', 'Gesprächsregeln beachten'] },
        { id: 'AR-29', title: 'Angemessener Umgangston', stufen: { stufe1: 'pflegt noch nicht immer einen respektvollen Umgangston', stufe2: 'pflegt mit Erinnerung einen respektvollen Umgangston', stufe3: 'pflegt einen respektvollen Umgangston mit allen Personen' }, intervention: ['Höflichkeitsformen üben', 'Wortwahl reflektieren', 'Vorbildfunktion nutzen'] },
        { id: 'AR-30', title: 'Körperliche Distanz wahren', stufen: { stufe1: 'hat noch Schwierigkeiten, körperliche Distanz einzuhalten', stufe2: 'kann mit Hinweisen körperliche Distanz einhalten', stufe3: 'hält selbstständig eine angemessene körperliche Distanz zu anderen Personen ein' }, intervention: ['Grenzen wahrnehmen', 'Signale beachten', 'Nachfragen bei Unsicherheit'] },
        { id: 'AR-31', title: 'Soziale Kontakte aufgebaut', stufen: { stufe1: 'baut noch stabile soziale Kontakte auf', stufe2: 'hat mit Unterstützung soziale Kontakte aufgebaut', stufe3: 'hat stabile soziale Kontakte aufgebaut und pflegt diese' }, intervention: ['Freizeitaktivitäten mit Freunden', 'Regelmäßiger Kontakt', 'Außerschulische Beziehungen'] },
        { id: 'AR-32', title: 'Aktive Kontaktaufnahme', stufen: { stufe1: 'hat noch Schwierigkeiten, aktiv auf andere zuzugehen', stufe2: 'kann mit Ermutigung auf andere Jugendliche zugehen', stufe3: 'kann aktiv auf andere Jugendliche zugehen und Kontakt aufnehmen' }, intervention: ['Initiative ergreifen üben', 'Gesprächseinstiege lernen', 'Offenheit zeigen'] },
        { id: 'AR-33', title: 'Harmonischer Umgang', stufen: { stufe1: 'hat noch nicht immer einen harmonischen Umgang mit Mitschüler:innen', stufe2: 'hat mit Unterstützung einen besseren Umgang mit Mitschüler:innen', stufe3: 'hat einen harmonischen Umgang mit Mitschüler:innen' }, intervention: ['Positive Interaktionen verstärken', 'Gemeinschaftsgefühl fördern', 'Rücksichtnahme üben'] },
        { id: 'AR-34', title: 'Gruppenrolle gefunden', stufen: { stufe1: 'sucht noch nach einer positiven Rolle in der Gruppe', stufe2: 'hat mit Unterstützung eine Rolle in der Gruppe gefunden', stufe3: 'hat eine positive Rolle innerhalb der Gruppe gefunden' }, intervention: ['Stärken einbringen', 'Verantwortung übernehmen', 'Beitrag zur Gemeinschaft'] },
        { id: 'AR-35', title: 'Vertrauen aufgebaut', stufen: { stufe1: 'baut noch Vertrauen zu Bezugspersonen auf', stufe2: 'hat mit Zeit Vertrauen zu einigen Bezugspersonen aufgebaut', stufe3: 'hat Vertrauen zu Bezugspersonen aufbauen können' }, intervention: ['Zeit geben', 'Verlässlichkeit zeigen', 'Offene Kommunikation'] }
    ],

    // ATTITUDES AFFECTIVES - Emotionales Verhalten und Gefühlsregulation
    attitudes_affectives: [
        { id: 'AA-1', title: 'Gefühle erkennen', stufen: { stufe1: 'hat noch Schwierigkeiten, eigene Gefühle zu erkennen und zu benennen', stufe2: 'kann mit Unterstützung eigene Gefühle erkennen und benennen', stufe3: 'kann eigene Gefühle erkennen und benennen' }, intervention: ['Gefühlstagebuch führen', 'Körperempfindungen beachten', 'Gefühlsvokabular erweitern'] },
        { id: 'AA-2', title: 'Gefühle ausdrücken', stufen: { stufe1: 'hat noch Schwierigkeiten, Gefühle angemessen auszudrücken', stufe2: 'kann mit Anleitung Gefühle angemessen ausdrücken', stufe3: 'kann zu bestimmten Momenten Gefühle angemessen ausdrücken' }, intervention: ['Ich-Botschaften nutzen', 'Kreative Ausdrucksformen', 'Gefühle verbalisieren üben'] },
        { id: 'AA-3', title: 'Emotionsregulation', stufen: { stufe1: 'hat noch Schwierigkeiten, Gefühle zu regulieren', stufe2: 'kann mit Unterstützung Gefühle regulieren', stufe3: 'kann Gefühle regulieren' }, intervention: ['Beruhigungstechniken', 'Atemübungen', 'Notfallstrategien entwickeln'] },
        { id: 'AA-4', title: 'Frustrationstoleranz', stufen: { stufe1: 'hat noch Schwierigkeiten, mit Frustration umzugehen', stufe2: 'kann mit Unterstützung mit Frustration umgehen', stufe3: 'kann mit Frustration umgehen' }, intervention: ['Frustrationsauslöser erkennen', 'Alternative Reaktionen üben', 'Gedanken umstrukturieren'] },
        { id: 'AA-5', title: 'Impulskontrolle', stufen: { stufe1: 'hat noch Schwierigkeiten, impulsive Reaktionen zu kontrollieren', stufe2: 'kann mit Erinnerung impulsive Reaktionen kontrollieren', stufe3: 'kann verstärkt impulsive Reaktionen kontrollieren' }, intervention: ['Stopp-Technik anwenden', 'Nachdenken vor Handeln', 'Konsequenzen bedenken'] },
        { id: 'AA-6', title: 'Stressbewältigung', stufen: { stufe1: 'hat noch Schwierigkeiten, mit Stress umzugehen', stufe2: 'kann mit Unterstützung mit Stress umgehen', stufe3: 'kann mit Stress umgehen' }, intervention: ['Stressoren identifizieren', 'Entspannungstechniken', 'Ausgleich schaffen'] },
        { id: 'AA-7', title: 'Angstbewältigung', stufen: { stufe1: 'hat noch Schwierigkeiten, mit Ängsten umzugehen', stufe2: 'kann mit Unterstützung mit Ängsten umgehen', stufe3: 'kann mit Ängsten umgehen' }, intervention: ['Ängste benennen', 'Schrittweise Konfrontation', 'Sicherheitsstrategien entwickeln'] },
        { id: 'AA-8', title: 'Wutmanagement', stufen: { stufe1: 'hat noch Schwierigkeiten, Wut zu kontrollieren', stufe2: 'kann mit Unterstützung Wut kontrollieren', stufe3: 'kann Wut kontrollieren' }, intervention: ['Wuttrigger erkennen', 'Auszeit nehmen', 'Energie ableiten'] },
        { id: 'AA-9', title: 'Trauer verarbeiten', stufen: { stufe1: 'hat noch Schwierigkeiten, Trauer zuzulassen und zu verarbeiten', stufe2: 'kann mit Begleitung Trauer zulassen und verarbeiten', stufe3: 'kann Trauer zulassen und verarbeiten' }, intervention: ['Trauer ausdrücken erlauben', 'Rituale entwickeln', 'Unterstützung suchen'] },
        { id: 'AA-10', title: 'Selbstwertgefühl', stufen: { stufe1: 'hat noch Schwierigkeiten, ein positives Selbstbild zu entwickeln', stufe2: 'entwickelt mit Unterstützung ein positiveres Selbstbild', stufe3: 'hat ein positives Bild von sich selbst' }, intervention: ['Stärken identifizieren', 'Selbstmitgefühl üben', 'Negative Gedanken hinterfragen'] },
        { id: 'AA-11', title: 'Selbstvertrauen', stufen: { stufe1: 'hat noch wenig Vertrauen in die eigenen Fähigkeiten', stufe2: 'vertraut mit Ermutigung mehr in die eigenen Fähigkeiten', stufe3: 'vertraut in die eigenen Fähigkeiten' }, intervention: ['Erfolgserlebnisse schaffen', 'Komfortzone erweitern', 'Positive Selbstgespräche'] },
        { id: 'AA-12', title: 'Resilienz', stufen: { stufe1: 'hat noch Schwierigkeiten, Rückschläge zu verkraften', stufe2: 'kann mit Unterstützung Rückschläge verkraften', stufe3: 'kann Rückschläge verkraften und weitermachen' }, intervention: ['Bewältigungsstrategien entwickeln', 'Soziales Netzwerk nutzen', 'Optimismus fördern'] },
        { id: 'AA-13', title: 'Optimismus', stufen: { stufe1: 'hat noch Schwierigkeiten, in schwierigen Situationen positiv zu denken', stufe2: 'kann mit Unterstützung positivere Gedanken entwickeln', stufe3: 'kann auch in schwierigen Situationen positiv denken' }, intervention: ['Positive Aspekte finden', 'Hoffnung bewahren', 'Lösungsorientiert denken'] },
        { id: 'AA-14', title: 'Geduld', stufen: { stufe1: 'hat noch Schwierigkeiten, geduldig zu sein und zu warten', stufe2: 'kann mit Unterstützung geduldiger sein', stufe3: 'kann geduldig sein und warten' }, intervention: ['Warten üben', 'Belohnungsaufschub trainieren', 'Ablenkungsstrategien'] },
        { id: 'AA-15', title: 'Gelassenheit', stufen: { stufe1: 'hat noch Schwierigkeiten, in stressigen Situationen ruhig zu bleiben', stufe2: 'kann mit Anleitung in stressigen Situationen ruhiger bleiben', stufe3: 'kann in stressigen Situationen ruhig bleiben' }, intervention: ['Achtsamkeitsübungen', 'Perspektive bewahren', 'Was kann ich kontrollieren?'] },
        { id: 'AA-16', title: 'Freude erleben', stufen: { stufe1: 'hat noch Schwierigkeiten, Freude zu empfinden und zu genießen', stufe2: 'kann mit Anregung Freude erleben', stufe3: 'kann Freude empfinden und genießen' }, intervention: ['Positive Aktivitäten planen', 'Im Moment sein', 'Dankbarkeit praktizieren'] },
        { id: 'AA-17', title: 'Emotionale Stabilität', stufen: { stufe1: 'hat noch keine ausgeglichene emotionale Grundstimmung', stufe2: 'zeigt mit Unterstützung eine stabilere Grundstimmung', stufe3: 'hat eine ausgeglichene emotionale Grundstimmung' }, intervention: ['Routinen etablieren', 'Selbstfürsorge praktizieren', 'Balance finden'] },
        { id: 'AA-18', title: 'Scham bewältigen', stufen: { stufe1: 'hat noch Schwierigkeiten, mit Schamgefühlen umzugehen', stufe2: 'kann mit Unterstützung mit Schamgefühlen umgehen', stufe3: 'kann mit Schamgefühlen umgehen' }, intervention: ['Scham normalisieren', 'Selbstmitgefühl üben', 'Vertraute Person einbeziehen'] },
        { id: 'AA-19', title: 'Eifersucht regulieren', stufen: { stufe1: 'hat noch Schwierigkeiten, mit Eifersuchtsgefühlen umzugehen', stufe2: 'kann mit Unterstützung mit Eifersuchtsgefühlen umgehen', stufe3: 'kann mit Eifersuchtsgefühlen umgehen' }, intervention: ['Auslöser verstehen', 'Selbstwert stärken', 'Kommunikation fördern'] },
        { id: 'AA-20', title: 'Hoffnung bewahren', stufen: { stufe1: 'hat noch Schwierigkeiten, in schwierigen Zeiten Hoffnung zu haben', stufe2: 'kann mit Unterstützung Hoffnung bewahren', stufe3: 'kann auch in schwierigen Zeiten Hoffnung haben' }, intervention: ['Zukunftsvisionen entwickeln', 'Kleine Fortschritte wahrnehmen', 'Unterstützung suchen'] },
        { id: 'AA-21', title: 'Proaktive Haltung', stufen: { stufe1: 'sieht sich noch als Opfer der Umstände', stufe2: 'entwickelt mit Unterstützung eine proaktivere Haltung', stufe3: 'nimmt eine proaktive Haltung ein und sieht sich nicht als Opfer der Umstände' }, intervention: ['Selbstwirksamkeit stärken', 'Handlungsoptionen erkennen', 'Verantwortung übernehmen'] },
        { id: 'AA-22', title: 'Mit Lob umgehen', stufen: { stufe1: 'hat noch Schwierigkeiten, Lob und Anerkennung anzunehmen', stufe2: 'kann mit Unterstützung Lob besser annehmen', stufe3: 'kann Lob und Anerkennung annehmen und verarbeiten' }, intervention: ['Komplimente annehmen üben', 'Selbstwert stärken', 'Positive Rückmeldungen akzeptieren'] },
        { id: 'AA-23', title: 'Therapeutische Offenheit', stufen: { stufe1: 'hat noch Schwierigkeiten, sich auf pädagogische Unterstützung einzulassen', stufe2: 'kann sich mit Vertrauensaufbau auf Unterstützung einlassen', stufe3: 'kann sich auf therapeutische oder pädagogische Unterstützung einlassen' }, intervention: ['Vertrauen aufbauen', 'Offenheit ermöglichen', 'Nutzen erkennen'] },
        { id: 'AA-24', title: 'Eigene Fortschritte erkennen', stufen: { stufe1: 'hat noch Schwierigkeiten, eigene Fortschritte zu erkennen', stufe2: 'kann mit Hinweisen eigene Fortschritte erkennen', stufe3: 'erkennt eigene Fortschritte und Entwicklungen' }, intervention: ['Reflexionsgespräche', 'Entwicklungsdokumentation', 'Erfolge würdigen'] },
        { id: 'AA-25', title: 'Gefühle differenziert benennen', stufen: { stufe1: 'benennt Gefühle noch undifferenziert (nur gut/schlecht)', stufe2: 'kann mit Hilfe Gefühle differenzierter benennen', stufe3: 'kann die Gefühlslage differenziert verbalisieren' }, intervention: ['Gefühlsvokabular erweitern', 'Nuancen erkennen', 'Nicht nur gut/schlecht'] },
        { id: 'AA-26', title: 'Ursachen erkennen', stufen: { stufe1: 'hat noch Schwierigkeiten, Ursachen negativer Emotionen zu erkennen', stufe2: 'kann mit Unterstützung Ursachen erkennen', stufe3: 'kann die Ursache negativer Emotionen erkennen und verbalisieren' }, intervention: ['Trigger identifizieren', 'Zusammenhänge verstehen', 'Kausalitäten erkennen'] },
        { id: 'AA-27', title: 'Schnellere Regulation', stufen: { stufe1: 'braucht nach einer Krise noch lange zur Regulation', stufe2: 'kann sich mit Unterstützung schneller nach einer Krise regulieren', stufe3: 'kann sich nach einer Krise schneller wieder regulieren' }, intervention: ['Regulationsstrategien üben', 'Rückkehr in Alltag', 'Selbstberuhigung'] },
        { id: 'AA-28', title: 'Mit Niederlagen umgehen', stufen: { stufe1: 'hat noch Schwierigkeiten, in Gruppensituationen mit Niederlagen umzugehen', stufe2: 'kann mit Unterstützung mit Niederlagen umgehen', stufe3: 'kann in Gruppensituationen gut mit Niederlagen umgehen' }, intervention: ['Frustrationstoleranz', 'Fairness entwickeln', 'Verlieren können'] },
        { id: 'AA-29', title: 'Ängste differenziert kommunizieren', stufen: { stufe1: 'hat noch Schwierigkeiten, Ängste differenziert zu kommunizieren', stufe2: 'kann mit Unterstützung Ängste besser kommunizieren', stufe3: 'kann Ängste differenziert kommunizieren und verstehen' }, intervention: ['Ängste benennen', 'Zusammenhänge erkennen', 'Auslöser identifizieren'] },
        { id: 'AA-30', title: 'Selbst- und Fremdwahrnehmung', stufen: { stufe1: 'versteht noch nicht, wie das eigene Verhalten andere beeinflusst', stufe2: 'versteht mit Erklärung die Auswirkungen des eigenen Verhaltens', stufe3: 'versteht, dass das eigene Verhalten Auswirkungen auf sich und das Umfeld hat' }, intervention: ['Konsequenzen reflektieren', 'Perspektivwechsel', 'Feedback annehmen'] },
        { id: 'AA-31', title: 'Flexibilität bei Veränderungen', stufen: { stufe1: 'hat noch Schwierigkeiten, flexibel mit Veränderungen umzugehen', stufe2: 'kann mit Unterstützung flexibler mit Veränderungen umgehen', stufe3: 'kann flexibel mit Veränderungen umgehen' }, intervention: ['Anpassungsfähigkeit üben', 'Unvorhergesehenes akzeptieren', 'Rigidität reduzieren'] },
        { id: 'AA-32', title: 'Emotionalen Zustand verbalisieren', stufen: { stufe1: 'hat noch Schwierigkeiten, den emotionalen Zustand zu verbalisieren', stufe2: 'kann mit Anregung den emotionalen Zustand verbalisieren', stufe3: 'kann den emotionalen Zustand offen kommunizieren' }, intervention: ['Gefühle teilen', 'Vertrauen aufbauen', 'Offenheit üben'] },
        { id: 'AA-33', title: 'Mit Distanz reflektieren', stufen: { stufe1: 'hat noch Schwierigkeiten, mit Distanz zu Situationen zu reflektieren', stufe2: 'kann mit Unterstützung mit Distanz reflektieren', stufe3: 'kann mit Distanz zu einer Situation reflektieren' }, intervention: ['Abstand nehmen', 'Nachbetrachtung', 'Objektivität entwickeln'] },
        { id: 'AA-34', title: 'Selbstbewussteres Auftreten', stufen: { stufe1: 'tritt noch unsicher und zurückhaltend auf', stufe2: 'tritt mit Ermutigung selbstbewusster auf', stufe3: 'tritt selbstbewusst und offen auf' }, intervention: ['Körperhaltung verbessern', 'Selbstsicherheit stärken', 'Erfolge wahrnehmen'] },
        { id: 'AA-35', title: 'Stolz auf Fortschritte', stufen: { stufe1: 'hat noch Schwierigkeiten, stolz auf Fortschritte zu sein', stufe2: 'kann mit Ermutigung Stolz auf Fortschritte empfinden', stufe3: 'ist stolz auf Fortschritte und kann diese benennen' }, intervention: ['Erfolge würdigen', 'Selbstanerkennung', 'Positive Selbstgespräche'] },
        { id: 'AA-36', title: 'Ausgleich durch Bewegung', stufen: { stufe1: 'nutzt Bewegung noch nicht als Ausgleich', stufe2: 'findet mit Anregung Ausgleich durch Bewegung', stufe3: 'findet Ausgleich durch Bewegung und Sport' }, intervention: ['Sportliche Aktivitäten', 'Energie ableiten', 'Körperliche Betätigung nutzen'] }
    ],

    // COMPÉTENCES ESSENTIELLES - Lebenskompetenzen für Autonomie
    competences_essentielles: [
        { id: 'CE-1', title: 'Körperhygiene', stufen: { stufe1: 'braucht noch Erinnerung für die Körperhygiene', stufe2: 'achtet mit wenigen Erinnerungen auf Körperhygiene', stufe3: 'achtet auf Körperhygiene' }, intervention: ['Routinen etablieren', 'Checklisten nutzen', 'Selbstständigkeit fördern'] },
        { id: 'CE-2', title: 'Gesunde Ernährung', stufen: { stufe1: 'ernährt sich noch nicht ausgewogen und gesund', stufe2: 'achtet mit Anleitung auf eine gesündere Ernährung', stufe3: 'ernährt sich ausgewogen und gesund' }, intervention: ['Ernährungswissen vermitteln', 'Gemeinsam kochen', 'Mahlzeiten planen'] },
        { id: 'CE-3', title: 'Kochen und Zubereiten', stufen: { stufe1: 'lernt noch, einfache Mahlzeiten zuzubereiten', stufe2: 'kann mit Anleitung einfache Mahlzeiten zubereiten', stufe3: 'kann einfache Mahlzeiten zubereiten' }, intervention: ['Rezepte ausprobieren', 'Küchengeräte bedienen', 'Lebensmittelsicherheit'] },
        { id: 'CE-4', title: 'Einkaufen', stufen: { stufe1: 'lernt noch, selbstständig einzukaufen', stufe2: 'kann mit Begleitung einkaufen', stufe3: 'kann einkaufen gehen' }, intervention: ['Einkaufslisten erstellen', 'Preise vergleichen', 'Bezahlvorgänge üben'] },
        { id: 'CE-5', title: 'Haushaltsführung', stufen: { stufe1: 'braucht noch Erinnerung für die Sauberkeit des Wohnbereichs', stufe2: 'kann mit Erinnerung den Wohnbereich sauber halten', stufe3: 'kann den Wohnbereich sauber halten' }, intervention: ['Putzplan erstellen', 'Ordnung halten', 'Aufgaben aufteilen'] },
        { id: 'CE-6', title: 'Wäschepflege', stufen: { stufe1: 'lernt noch, Wäsche zu waschen und zu pflegen', stufe2: 'kann mit Anleitung Wäsche waschen und pflegen', stufe3: 'kann Wäsche waschen und pflegen' }, intervention: ['Waschmaschine bedienen', 'Pflegesymbole verstehen', 'Kleidung sortieren'] },
        { id: 'CE-7', title: 'Geldmanagement', stufen: { stufe1: 'hat noch Schwierigkeiten, Geld einzuteilen und zu verwalten', stufe2: 'kann mit Unterstützung Geld einteilen', stufe3: 'kann Geld einteilen und verwalten' }, intervention: ['Budget erstellen', 'Ausgaben dokumentieren', 'Sparen üben'] },
        { id: 'CE-8', title: 'Behördengänge', stufen: { stufe1: 'lernt noch, Behördengänge zu erledigen', stufe2: 'kann mit Begleitung Behördengänge erledigen', stufe3: 'kann Behördengänge erledigen' }, intervention: ['Formulare ausfüllen', 'Termine vereinbaren', 'Dokumente organisieren'] },
        { id: 'CE-9', title: 'Mobilität', stufen: { stufe1: 'lernt noch, öffentliche Verkehrsmittel zu nutzen', stufe2: 'kann mit Anleitung öffentliche Verkehrsmittel nutzen', stufe3: 'kann öffentliche Verkehrsmittel nutzen' }, intervention: ['Fahrpläne lesen', 'Routen planen', 'Tickets kaufen'] },
        { id: 'CE-10', title: 'Gesundheitsvorsorge', stufen: { stufe1: 'braucht noch Erinnerung für die Gesundheitsvorsorge', stufe2: 'kümmert sich mit Erinnerung um die Gesundheit', stufe3: 'kümmert sich um die eigene Gesundheit' }, intervention: ['Arzttermine wahrnehmen', 'Medikamente einnehmen', 'Warnsignale erkennen'] },
        { id: 'CE-11', title: 'Sicherheit im Alltag', stufen: { stufe1: 'hat noch Schwierigkeiten, Gefahren zu erkennen und zu vermeiden', stufe2: 'kann mit Hinweisen Gefahren erkennen und vermeiden', stufe3: 'kann Gefahren im Alltag erkennen und vermeiden' }, intervention: ['Gefahrenquellen kennen', 'Notrufnummern kennen', 'Sicherheitsregeln beachten'] },
        { id: 'CE-12', title: 'Mediennutzung', stufen: { stufe1: 'nutzt digitale Medien noch nicht verantwortungsvoll', stufe2: 'nutzt mit Anleitung digitale Medien verantwortungsvoller', stufe3: 'nutzt digitale Medien verantwortungsvoll' }, intervention: ['Bildschirmzeit begrenzen', 'Datenschutz beachten', 'Kritischer Umgang mit Inhalten'] },
        { id: 'CE-13', title: 'Tagesstruktur', stufen: { stufe1: 'hat noch Schwierigkeiten, den Tag sinnvoll zu strukturieren', stufe2: 'kann mit Unterstützung den Tag strukturieren', stufe3: 'kann den Tag sinnvoll strukturieren' }, intervention: ['Tagesplan erstellen', 'Routinen einhalten', 'Prioritäten setzen'] },
        { id: 'CE-14', title: 'Schlafhygiene', stufen: { stufe1: 'sorgt noch nicht für ausreichend und guten Schlaf', stufe2: 'sorgt mit Erinnerung für besseren Schlaf', stufe3: 'sorgt für ausreichend und guten Schlaf' }, intervention: ['Schlafrhythmus etablieren', 'Schlafumgebung gestalten', 'Einschlafrituale'] },
        { id: 'CE-15', title: 'Pünktlichkeit', stufen: { stufe1: 'hat noch Schwierigkeiten mit Pünktlichkeit', stufe2: 'ist mit Erinnerung pünktlicher', stufe3: 'ist pünktlich zu Terminen und Verabredungen' }, intervention: ['Zeitpuffer einplanen', 'Erinnerungen nutzen', 'Vorbereitung am Vorabend'] },
        { id: 'CE-16', title: 'Telefonieren', stufen: { stufe1: 'hat noch Schwierigkeiten, Telefongespräche zu führen', stufe2: 'kann mit Vorbereitung Telefongespräche führen', stufe3: 'kann Telefongespräche führen' }, intervention: ['Gesprächsführung üben', 'Wichtige Infos notieren', 'Höflichkeitsformen'] },
        { id: 'CE-17', title: 'E-Mails schreiben', stufen: { stufe1: 'lernt noch, formelle E-Mails zu verfassen', stufe2: 'kann mit Anleitung formelle E-Mails verfassen', stufe3: 'kann formelle E-Mails verfassen' }, intervention: ['Aufbau einer E-Mail', 'Höfliche Formulierungen', 'Anhänge versenden'] },
        { id: 'CE-18', title: 'Erste Hilfe', stufen: { stufe1: 'kennt noch keine Erste-Hilfe-Maßnahmen', stufe2: 'kennt mit Übung grundlegende Erste-Hilfe-Maßnahmen', stufe3: 'kann in Notfällen Erste Hilfe leisten' }, intervention: ['Erste-Hilfe-Kurs', 'Notruf absetzen', 'Grundlegende Maßnahmen'] },
        { id: 'CE-20', title: 'Berufsorientierung', stufen: { stufe1: 'kennt die eigenen beruflichen Interessen noch nicht', stufe2: 'erkundet mit Unterstützung berufliche Interessen', stufe3: 'kennt die eigenen beruflichen Interessen und Möglichkeiten' }, intervention: ['Stärken erkunden', 'Berufe kennenlernen', 'Praktika absolvieren'] },
        { id: 'CE-21', title: 'Bewerbung schreiben', stufen: { stufe1: 'lernt noch, eine Bewerbung zu verfassen', stufe2: 'kann mit Anleitung eine Bewerbung verfassen', stufe3: 'kann eine Bewerbung verfassen' }, intervention: ['Lebenslauf erstellen', 'Anschreiben formulieren', 'Bewerbungsunterlagen zusammenstellen'] },
        { id: 'CE-22', title: 'Vorstellungsgespräch', stufen: { stufe1: 'hat noch Schwierigkeiten, sich in einem Vorstellungsgespräch zu präsentieren', stufe2: 'kann mit Übung sich in einem Vorstellungsgespräch präsentieren', stufe3: 'kann sich in einem Vorstellungsgespräch präsentieren' }, intervention: ['Selbstpräsentation üben', 'Fragen vorbereiten', 'Dresscode beachten'] },
        { id: 'CE-23', title: 'Arbeitsorganisation', stufen: { stufe1: 'hat noch Schwierigkeiten, die Arbeit selbstständig zu organisieren', stufe2: 'kann mit Anleitung die Arbeit organisieren', stufe3: 'kann die Arbeit organisieren' }, intervention: ['Aufgaben strukturieren', 'Prioritäten setzen', 'Fristen einhalten'] },
        { id: 'CE-25', title: 'Umweltbewusstsein', stufen: { stufe1: 'handelt noch nicht umweltbewusst im Alltag', stufe2: 'handelt mit Anleitung umweltbewusster', stufe3: 'handelt umweltbewusst im Alltag' }, intervention: ['Mülltrennung', 'Ressourcen sparen', 'Nachhaltigkeit verstehen'] },
        { id: 'CE-26', title: 'Medienkonsum regulieren', stufen: { stufe1: 'hat noch Schwierigkeiten, den Medienkonsum zu regulieren', stufe2: 'kann mit Unterstützung den Medienkonsum regulieren', stufe3: 'kann den Medienkonsum regulieren' }, intervention: ['Zeitlimits setzen', 'Alternativen finden', 'Selbstkontrolle üben'] },
        { id: 'CE-27', title: 'Gepflegtes Erscheinungsbild', stufen: { stufe1: 'achtet noch nicht auf ein gepflegtes Erscheinungsbild', stufe2: 'achtet mit Erinnerung auf ein gepflegteres Erscheinungsbild', stufe3: 'achtet auf ein gepflegtes Erscheinungsbild' }, intervention: ['Routinen etablieren', 'Selbstfürsorge', 'Körperbewusstsein'] },
        { id: 'CE-28', title: 'Online-Sicherheit', stufen: { stufe1: 'hat noch Schwierigkeiten, sich sicher im Internet zu bewegen', stufe2: 'kann mit Anleitung sicherer im Internet surfen', stufe3: 'kann sich sicher im Internet bewegen' }, intervention: ['Datenschutz beachten', 'Kritischer Umgang', 'Gefahren erkennen'] },
        { id: 'CE-29', title: 'Realistische Erwartungen', stufen: { stufe1: 'hat noch unrealistische Erwartungen an Schule und Arbeitswelt', stufe2: 'entwickelt mit Gesprächen realistischere Erwartungen', stufe3: 'hat realistische Erwartungen an Schule und Arbeitswelt' }, intervention: ['Berufsorientierung', 'Anforderungen verstehen', 'Ziele anpassen'] },
        { id: 'CE-30', title: 'Krisenplan anwenden', stufen: { stufe1: 'hat noch keinen Krisenplan oder kann ihn nicht anwenden', stufe2: 'kann mit Unterstützung den Krisenplan anwenden', stufe3: 'kann in Krisensituationen den Krisenplan anwenden' }, intervention: ['Plan erarbeiten', 'Strategien üben', 'Selbsthilfe aktivieren'] },
        { id: 'CE-31', title: 'Gute kognitive Fähigkeiten', stufen: { stufe1: 'nutzt die eigenen kognitiven Fähigkeiten noch nicht voll', stufe2: 'nutzt mit Förderung die kognitiven Fähigkeiten besser', stufe3: 'hat gute kognitive Fähigkeiten und nutzt diese' }, intervention: ['Stärken einsetzen', 'Potenzial nutzen', 'Förderung anbieten'] },
        { id: 'CE-32', title: 'Wissbegierig und motiviert', stufen: { stufe1: 'zeigt noch wenig Wissbegier und Lernmotivation', stufe2: 'zeigt mit Anregung mehr Wissbegier', stufe3: 'zeigt Wissbegier und ist motiviert zu lernen' }, intervention: ['Interessen aufgreifen', 'Neugier fördern', 'Motivation erhalten'] },
        { id: 'CE-33', title: 'Vielfältige Interessen', stufen: { stufe1: 'hat noch wenige Interessen und Hobbys', stufe2: 'entwickelt mit Anregung neue Interessen', stufe3: 'hat verschiedene Interessen und Hobbys' }, intervention: ['Interessen fördern', 'Neue Aktivitäten erkunden', 'Ressourcen nutzen'] }
    ],

    // CULTURE ET LOISIRS - Kultur und Freizeitgestaltung
    culture_loisirs: [
        { id: 'CL-1', title: 'Freizeitgestaltung', stufen: { stufe1: 'hat noch Schwierigkeiten, die Freizeit sinnvoll zu gestalten', stufe2: 'kann mit Anregung die Freizeit sinnvoller gestalten', stufe3: 'kann die Freizeit sinnvoll gestalten' }, intervention: ['Hobbys erkunden', 'Interessen fördern', 'Aktivitäten planen'] },
        { id: 'CL-2', title: 'Sport und Bewegung', stufen: { stufe1: 'bewegt sich noch nicht regelmäßig', stufe2: 'bewegt sich mit Anregung regelmäßiger', stufe3: 'bewegt sich regelmäßig und treibt Sport' }, intervention: ['Sportart finden', 'Bewegung in Alltag integrieren', 'Motivation aufrechterhalten'] },
        { id: 'CL-3', title: 'Kreative Aktivitäten', stufen: { stufe1: 'gestaltet noch selten kreativ und künstlerisch', stufe2: 'gestaltet mit Anregung kreativer', stufe3: 'gestaltet kreativ und künstlerisch' }, intervention: ['Verschiedene Techniken ausprobieren', 'Kreativität fördern', 'Ausdrucksmöglichkeiten finden'] },
        { id: 'CL-4', title: 'Musik', stufen: { stufe1: 'beschäftigt sich noch nicht aktiv mit Musik', stufe2: 'beschäftigt sich mit Anregung mehr mit Musik', stufe3: 'beschäftigt sich aktiv mit Musik' }, intervention: ['Instrument lernen', 'Musik hören und verstehen', 'Konzerte besuchen'] },
        { id: 'CL-5', title: 'Lesen', stufen: { stufe1: 'liest noch nicht regelmäßig', stufe2: 'liest mit Anregung regelmäßiger', stufe3: 'liest regelmäßig Bücher oder andere Texte' }, intervention: ['Leseinteresse wecken', 'Passende Lektüre finden', 'Lesezeit einplanen'] },
        { id: 'CL-6', title: 'Kulturelle Teilhabe', stufen: { stufe1: 'nimmt noch nicht am kulturellen Leben teil', stufe2: 'nimmt mit Anregung mehr am kulturellen Leben teil', stufe3: 'nimmt am kulturellen Leben teil' }, intervention: ['Kulturveranstaltungen besuchen', 'Museen erkunden', 'Theater erleben'] },
        { id: 'CL-7', title: 'Naturerlebnis', stufen: { stufe1: 'verbringt noch wenig Zeit in der Natur', stufe2: 'verbringt mit Anregung mehr Zeit in der Natur', stufe3: 'verbringt regelmäßig Zeit in der Natur' }, intervention: ['Spaziergänge machen', 'Natur beobachten', 'Outdoor-Aktivitäten'] },
        { id: 'CL-8', title: 'Gesellschaftsspiele', stufen: { stufe1: 'hat noch Schwierigkeiten, Gesellschaftsspiele zu spielen und Regeln zu befolgen', stufe2: 'kann mit Anleitung Gesellschaftsspiele spielen', stufe3: 'kann Gesellschaftsspiele spielen und Regeln befolgen' }, intervention: ['Spielregeln verstehen', 'Fair spielen', 'Gewinnen und Verlieren lernen'] },
        { id: 'CL-9', title: 'Handwerkliche Tätigkeiten', stufen: { stufe1: 'hat noch Schwierigkeiten mit handwerklichen Arbeiten', stufe2: 'kann mit Anleitung handwerklich arbeiten', stufe3: 'kann handwerklich arbeiten' }, intervention: ['Werkzeuge kennenlernen', 'Projekte durchführen', 'Sicherheit beachten'] },
        { id: 'CL-10', title: 'Kochen als Hobby', stufen: { stufe1: 'kocht noch nicht gerne als Hobby', stufe2: 'kocht mit Anregung gerne', stufe3: 'kocht gerne und probiert neue Rezepte' }, intervention: ['Rezepte sammeln', 'Gemeinsam kochen', 'Verschiedene Küchen entdecken'] },
        { id: 'CL-11', title: 'Fotografie', stufen: { stufe1: 'beschäftigt sich noch nicht mit Fotografie', stufe2: 'beschäftigt sich mit Anleitung mit Fotografie', stufe3: 'fotografiert und gestaltet Bilder' }, intervention: ['Kamerafunktionen lernen', 'Bildgestaltung üben', 'Bilder bearbeiten'] },
        { id: 'CL-12', title: 'Gartenarbeit', stufen: { stufe1: 'hat noch keine Erfahrung mit Gartenarbeit', stufe2: 'kann mit Anleitung im Garten arbeiten', stufe3: 'kann Pflanzen pflegen und im Garten arbeiten' }, intervention: ['Pflanzen kennenlernen', 'Gartenpflege erlernen', 'Verantwortung übernehmen'] },
        { id: 'CL-13', title: 'Tanzen', stufen: { stufe1: 'drückt sich noch nicht durch Tanz aus', stufe2: 'tanzt mit Anregung mehr', stufe3: 'drückt sich durch Tanz und Bewegung aus' }, intervention: ['Tanzstile ausprobieren', 'Rhythmusgefühl entwickeln', 'Tanzveranstaltungen besuchen'] },
        { id: 'CL-14', title: 'Film und Kino', stufen: { stufe1: 'schaut Filme noch ohne bewusste Reflexion', stufe2: 'kann mit Anleitung über Filme diskutieren', stufe3: 'schaut bewusst Filme und kann darüber diskutieren' }, intervention: ['Filmgenres kennenlernen', 'Filme analysieren', 'Kinobesuche planen'] },
        { id: 'CL-15', title: 'Ehrenamtliches Engagement', stufen: { stufe1: 'engagiert sich noch nicht ehrenamtlich', stufe2: 'engagiert sich mit Anregung ehrenamtlich', stufe3: 'engagiert sich ehrenamtlich für andere' }, intervention: ['Engagement-Möglichkeiten finden', 'Regelmäßige Mitarbeit', 'Sinn und Erfüllung erleben'] },
        { id: 'CL-16', title: 'Vereinsmitgliedschaft', stufen: { stufe1: 'ist noch nicht Mitglied in einem Verein', stufe2: 'erkundet mit Unterstützung passende Vereine', stufe3: 'ist Mitglied in einem Verein oder einer Gruppe' }, intervention: ['Passenden Verein finden', 'Regelmäßig teilnehmen', 'Gemeinschaft erleben'] },
        { id: 'CL-18', title: 'Entspannung', stufen: { stufe1: 'kennt und nutzt noch keine Entspannungstechniken', stufe2: 'erlernt mit Anleitung Entspannungstechniken', stufe3: 'kennt und nutzt Entspannungstechniken' }, intervention: ['Entspannungsmethoden erlernen', 'Regelmäßig anwenden', 'Stressabbau'] },
        { id: 'CL-19', title: 'Soziale Medien', stufen: { stufe1: 'nutzt soziale Medien noch nicht verantwortungsvoll', stufe2: 'nutzt mit Anleitung soziale Medien verantwortungsvoller', stufe3: 'nutzt soziale Medien verantwortungsvoll' }, intervention: ['Datenschutz beachten', 'Zeit begrenzen', 'Positiver Umgang'] }
    ]
};

// State für ausgewählte zusätzliche Ziele
if (!state.zusaetzlicheZiele) {
    state.zusaetzlicheZiele = {
        demarches_mentales: [],
        manieres_apprendre: [],
        attitudes_relationnelles: [],
        attitudes_affectives: [],
        competences_essentielles: [],
        culture_loisirs: []
    };
}

// Helper: Get interventions for an item
function getInterventionen(code) {
    const interventionen = getCurrentInterventionen();
    const fallback = getCurrentInterventionenFallback();
    if (interventionen[code]) {
        return interventionen[code];
    }
    // Fallback based on domain
    const prefix = code.split('-')[0];
    if (prefix === 'V') return fallback.verhalten;
    if (prefix === 'K') return fallback.kommunikation;
    if (prefix === 'SOZ') return fallback.sozialisation;
    if (prefix === 'KOG') return fallback.kognition;
    return [state.language === 'fr' ? 'Accompagnement individualisé' : (state.language === 'en' ? 'Individualized support' : 'Individuell angepasste Förderung')];
}
