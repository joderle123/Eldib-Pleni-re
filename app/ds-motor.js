/* DS-Text-Motor des ELDiB-Generators (erzeugt von app/build.cjs, nicht von Hand ändern).
   Wird vom CDSE Hub geladen: apps/ds-motor.js */
// ==== 42-ds-bank-struktur.js ====
// =====================================================================
// DS-Baukasten: Aufbau (sprachunabhängig)
// ---------------------------------------------------------------------
// Jede Aussage wird von 1 (trifft gar nicht zu) bis 7 (trifft voll zu)
// bewertet; ohne Bewertung erscheint sie nicht im Bericht.
//   pol  +1 = eine hohe Bewertung ist eine Stärke (z. B. "hält Regeln ein")
//        -1 = eine hohe Bewertung ist eine Schwierigkeit (z. B. "Wutausbrüche")
//   fest     Reihenfolge im Text folgt der Liste (Deutung), nicht Stärke/Schwäche
//   'vorne'  (3. Wert) Satz steht immer am Anfang seines Themas
// Die Texte stehen in 43-ds-texte-de.js, 44-ds-texte-fr.js, 45-ds-texte-en.js.
// Auswahlfelder ("chips") liefern Aufzählungen, z. B. Stärken oder Wünsche.
// =====================================================================
const DS_AUFBAU = {
  schule: {
    themen: [
      { id: 'lernen', aussagen: [['s_motiv', 1], ['s_konz', 1], ['s_selbst', 1], ['s_sorgfalt', 1], ['s_leistung', 1], ['s_unruhe', -1]] },
      { id: 'verhalten', aussagen: [['s_regeln', 1], ['s_impuls', -1], ['s_frust', 1], ['s_wut', -1], ['s_aggr', -1], ['s_verweig', -1], ['s_rueckzug', -1], ['s_angst', -1], ['s_ausgeglichen', 1]] },
      { id: 'beziehung', aussagen: [['s_peers', 1], ['s_konflikt', -1], ['s_erwachsene', 1], ['s_hilfe', 1], ['s_selbstwert', 1]] }
    ],
    chips: ['s_staerken', 's_hilft', 's_erwartung']
  },
  kind: {
    themen: [
      { id: 'schule', aussagen: [['k_offen', 1, 'vorne'], ['k_wohl', 1], ['k_klasse', 1], ['k_lehrer', 1], ['k_leistung', 1], ['k_ungerecht', -1]] },
      { id: 'selbst', aussagen: [['k_selbstwert', 1], ['k_druck', -1], ['k_angst', -1], ['k_einsicht', 1], ['k_veraenderung', 1]] },
      { id: 'umfeld', aussagen: [['k_freunde', 1], ['k_familie', 1]] }
    ],
    chips: ['k_interessen', 'k_wuensche']
  },
  eltern: {
    themen: [
      { id: 'alltag', aussagen: [['e_alltag', 1], ['e_regeln', 1], ['e_wut', -1], ['e_geschwister', -1], ['e_rueckzug', -1], ['e_angst', -1], ['e_koerper', -1], ['e_medien', -1], ['e_hausaufgaben', -1]] },
      { id: 'familie', aussagen: [['e_beziehung', 1], ['e_struktur', 1], ['e_konsequenz', 1], ['e_belastung', -1]] },
      { id: 'zusammenarbeit', aussagen: [['e_sicht_schule', 1], ['e_kooperation', 1]] }
    ],
    chips: ['e_staerken', 'e_erwartung']
  },
  beobachtung: {
    themen: [
      { id: 'arbeit', aussagen: [['b_start', 1], ['b_konz', 1], ['b_anweisung', 1], ['b_hilfe', 1], ['b_unruhe', -1], ['b_ablenk', -1]] },
      { id: 'verhalten', aussagen: [['b_regeln', 1], ['b_frust', 1], ['b_uebergang', 1], ['b_lob', 1], ['b_stoer', -1]] },
      { id: 'kontakt', aussagen: [['b_peers', 1], ['b_erwachsene', 1], ['b_isol', -1], ['b_provo', -1]] }
    ],
    chips: []
  },
  deutung: {
    fest: true,
    themen: [
      { id: 'quellen', aussagen: [['i_uebereinstimmung', 1], ['i_beobachtung', 1], ['i_eldib', 1]] },
      { id: 'muster', aussagen: [['i_unstrukturiert', 0], ['i_anforderung', 0], ['i_beziehung', 0], ['i_einzel', 0], ['i_schule', 0], ['i_zuhause', 0]] },
      { id: 'aengste', aussagen: [['i_angst_verlassen', 0], ['i_angst_unzul', 0], ['i_angst_schuld', 0], ['i_angst_konflikt', 0], ['i_angst_identitaet', 0]] },
      { id: 'abwehr', aussagen: [['i_abw_rueckzug', 0], ['i_abw_vermeidung', 0], ['i_abw_aggression', 0], ['i_abw_regression', 0], ['i_abw_clown', 0], ['i_abw_kontrolle', 0], ['i_abw_projektion', 0], ['i_abw_verleugnung', 0]] },
      { id: 'hypothesen', aussagen: [['i_hyp_entwicklung', 0], ['i_hyp_regulation', 0], ['i_hyp_belastung', 0], ['i_hyp_bindung', 0], ['i_hyp_sozial', 0], ['i_hyp_aufmerksamkeit', 0], ['i_hyp_ueberforderung', 0], ['i_hyp_unterforderung', 0], ['i_hyp_trauma', 0]] }
    ],
    chips: []
  },
  beduerfnisse: {
    fest: true,
    themen: [
      { id: 'beduerfnisse', aussagen: [['n_struktur', 0], ['n_beziehung', 0], ['n_erfolg', 0], ['n_regulation', 0], ['n_grenzen', 0], ['n_sozial', 0], ['n_organisation', 0], ['n_differenzierung', 0], ['n_therapie', 0], ['n_familie', 0]] }
    ],
    chips: ['ressourcen']
  }
};

// Auswahlfelder: Schlüssel je Gruppe (Texte je Sprache in DS_TEXTE[lang].chips)
const DS_CHIPS = {
  s_staerken:  ['hilfsbereit', 'kreativ', 'humorvoll', 'sportlich', 'sprachlich', 'mathematisch', 'technisch', 'musikalisch', 'fantasievoll', 'wissbegierig', 'freundlich', 'zuverlaessig'],
  s_hilft:     ['ansagen', 'wiederholung', 'visualisierung', 'bewegung', 'rueckzugsort', 'einzelansprache', 'lob', 'vorwarnung', 'kleingruppe', 'naehe', 'struktur'],
  s_erwartung: ['strategien', 'verhalten', 'konzentration', 'integration', 'stabilitaet', 'leistung', 'therapie', 'eltern', 'foerderort', 'abklaerung'],
  k_interessen:['sport', 'gaming', 'musik', 'lesen', 'kreatives', 'freunde', 'tiere', 'natur', 'technik', 'kochen'],
  k_wuensche:  ['noten', 'freunde', 'streit', 'ruhe', 'druck', 'verstanden', 'hilfe', 'klasse', 'schule', 'inruhe'],
  e_staerken:  ['hilfsbereit', 'liebevoll', 'selbststaendig', 'kreativ', 'humorvoll', 'sportlich', 'verantwortung', 'offen'],
  e_erwartung: ['verhalten', 'entspannung', 'strategien', 'leistung', 'abklaerung', 'therapie', 'beratung', 'foerderort', 'verstehen', 'bestaetigung'],
  ressourcen:  ['kognitiv', 'kreativ', 'sportlich', 'musisch', 'humor', 'empathie', 'neugier', 'begeisterung', 'hilfsbereit', 'verantwortung', 'einzelbeziehung', 'lernbereit', 'vertrauensperson', 'familie', 'hobbys', 'reflexion'],
  // Fakten-Abschnitte
  anlass:      ['verhalten_schule', 'verhalten_zuhause', 'emotional', 'sozial', 'leistung', 'aufmerksamkeit', 'aggression', 'rueckzug', 'aengste', 'schulverweigerung'],
  anliegen:    ['isa', 'conseil', 'cst', 'clapa', 'annexe', 'lernwerkstatt', 'beschulung', 'diagnostik'],
  empfohlen:   ['lehrperson', 'eseb', 'schulleitung', 'arzt', 'psychologe', 'eltern'],
  diagnosen:   ['adhs', 'ass', 'lernstoerung', 'sprachstoerung', 'emotional', 'bindung', 'angst', 'opposition', 'andere'],
  ereignisse:  ['trennung', 'umzug', 'verlust', 'krankheit', 'konflikte', 'trauma', 'migration'],
  betreuung:   ['maison_relais', 'grosseltern', 'tagesmutter', 'keine'],
  sprachen:    ['lb', 'de', 'fr', 'pt', 'en', 'it', 'es', 'andere'],
  verfahren:   ['eldib', 'sdq', 'wisc', 'andere'],
  empf_familie:['step', 'erziehungsberatung', 'familientherapie', 'tagesstruktur', 'austausch', 'medien', 'freizeit'],
  empf_schule: ['sitzplatz', 'differenzierung', 'verstaerker', 'regeln', 'auszeit', 'uebergaenge', 'visualisierung', 'bewegung', 'iebs', 'bezugsperson'],
  empf_region: ['eseb', 'isa', 'conseil', 'lernwerkstatt', 'psychotherapie', 'ergotherapie', 'logopaedie', 'psychiatrie'],
  cni:         ['diag_kompetenzzentrum', 'beratung_eltern', 'beratung_fachleute', 'lernwerkstatt', 'isa', 'beschulung', 'clapa', 'cst', 'annexe', 'ausland', 'rehabilitation', 'abschluss', 'schliessung']
};

// Bewertung (1-7) -> Formulierungsstufe 0..4
function dsStufe(r) { return r <= 2 ? 0 : (r === 3 ? 1 : (r === 4 ? 2 : (r === 5 ? 3 : 4))); }

// ==== 43-ds-texte-de.js ====
// =====================================================================
// DS-Baukasten: deutsche Texte
// ---------------------------------------------------------------------
// q   = Aussage zum Anklicken (Fragebogen)
// t   = Formulierungen für den Bericht je Stufe:
//       [0] 1–2 trifft (gar) nicht zu  [1] 3 eher nicht  [2] 4 teils/teils
//       [3] 5 eher zu  [4] 6–7 trifft (voll) zu      null = kein Satz
// np  = Kurzform für Aufzählungen ("Hinweise auf …", Akkusativ)
// Platzhalter:
//   {N} Name bzw. er/sie (Subjekt)  {Nd} Dativ  {Na} Akkusativ  {Name} immer der Name
//   {er} {ihm} {ihn} immer Pronomen; {sein} {seine} {seinen} {seinem} {seiner} {seines}
//   [[männlich|weiblich]]   {{Einzahl|Mehrzahl}} (bei Quellen/Listen)
//   {KONTRAST} wird zu "jedoch ", wenn davor Stärken beschrieben wurden
//   {Q}/{Qd}/{Qg} Eltern-Quelle (die Mutter/der Mutter …), {QS}/{QSd} Schul-Quelle
// Stil: sachlich, beschreibend, ressourcenorientiert; Gegenwart, Beobachtung im Präteritum.
// =====================================================================
const DS_TEXTE = {};
DS_TEXTE.de = {
  skala: { 1: 'trifft gar nicht zu', 2: '', 3: '', 4: 'teils/teils', 5: '', 6: '', 7: 'trifft voll zu', leer: 'keine Angabe' },

  a: {
    // ---------------- 3.2 Sichtweise der Schule ----------------
    s_motiv: { q: 'Beteiligt sich motiviert am Unterricht.', t: [
      '{N} beteiligt sich {KONTRAST}kaum am Unterricht und muss immer wieder zur Mitarbeit ermutigt werden.',
      'Am Unterricht beteiligt {N} sich {KONTRAST}eher zurückhaltend; die Motivation schwankt deutlich.',
      'Die Beteiligung am Unterricht ist {KONTRAST}wechselhaft und hängt stark von Thema und Tagesform ab.',
      'Am Unterricht beteiligt {N} sich überwiegend motiviert.',
      '{N} beteiligt sich motiviert und interessiert am Unterricht.'] },
    s_konz: { q: 'Kann sich im Unterricht altersgemäß konzentrieren.', t: [
      'Konzentriertes Arbeiten gelingt {Nd} {KONTRAST}kaum; {er} lässt sich schon von kleinen Reizen ablenken.',
      '{N} kann sich {KONTRAST}nur kurz konzentrieren und ist leicht ablenkbar.',
      'Die Konzentration gelingt {Nd} {KONTRAST}nur zeitweise; vor allem in längeren Arbeitsphasen lässt sie nach.',
      '{N} kann sich im Unterricht meist altersgemäß konzentrieren.',
      '{N} kann sich im Unterricht gut und ausdauernd konzentrieren.'] },
    s_selbst: { q: 'Beginnt und beendet Aufgaben selbstständig.', t: [
      'Aufgaben beginnt {N} {KONTRAST}kaum ohne Unterstützung, und begonnene Arbeiten bleiben häufig unvollendet.',
      '{N} braucht {KONTRAST}häufig Hilfe, um Aufgaben zu beginnen und zu Ende zu führen.',
      'Aufgaben beginnt und beendet {N} nur teilweise selbstständig und braucht dabei immer wieder Anstöße.',
      'Aufgaben beginnt und beendet {N} meist selbstständig.',
      '{N} beginnt Aufgaben selbstständig und führt sie zuverlässig zu Ende.'] },
    s_sorgfalt: { q: 'Arbeitet sorgfältig und organisiert.', t: [
      '{N} arbeitet {KONTRAST}oft flüchtig und unorganisiert; Material und Hausaufgaben fehlen häufig.',
      'Sorgfalt und Arbeitsorganisation gelingen {Nd} {KONTRAST}eher selten.',
      'Sorgfalt und Arbeitsorganisation sind {KONTRAST}wechselhaft.',
      '{N} arbeitet überwiegend sorgfältig und hält {sein} Material meist in Ordnung.',
      '{N} arbeitet sorgfältig und gut organisiert.'] },
    s_leistung: { q: 'Erreicht die Lernziele der Klassenstufe.', t: [
      'Die schulischen Leistungen liegen {KONTRAST}deutlich unter den Anforderungen der Klassenstufe.',
      'Die schulischen Leistungen liegen {KONTRAST}teilweise unter den Anforderungen der Klassenstufe.',
      'Die Lernziele der Klassenstufe erreicht {N} in einzelnen Fächern, in anderen {KONTRAST}noch nicht.',
      'Die Lernziele der Klassenstufe erreicht {N} weitgehend.',
      'Die Lernziele der Klassenstufe erreicht {N} gut.'] },
    s_unruhe: { q: 'Ist motorisch unruhig.', np: 'motorische Unruhe', t: [
      null,
      'Motorische Unruhe zeigt sich nur vereinzelt.',
      'Zeitweise ist {N} motorisch unruhig, etwa in längeren Sitzphasen.',
      '{N} ist {KONTRAST}häufig motorisch unruhig und kann nur schwer ruhig sitzen bleiben.',
      '{N} ist {KONTRAST}ausgeprägt motorisch unruhig; längeres ruhiges Sitzen ist {Nd} kaum möglich.'] },
    s_regeln: { q: 'Hält sich an Klassenregeln und Absprachen.', t: [
      'An Klassenregeln und Absprachen hält {N} sich {KONTRAST}kaum.',
      'An Regeln und Absprachen hält {N} sich {KONTRAST}nur mit viel Unterstützung.',
      'Die Klassenregeln kennt {N}, hält sich aber nur teilweise daran.',
      'An Klassenregeln und Absprachen hält {N} sich meistens.',
      '{N} hält sich zuverlässig an Klassenregeln und Absprachen.'] },
    s_impuls: { q: 'Handelt impulsiv, ohne nachzudenken.', np: 'impulsives Handeln', t: [
      null,
      'Impulsives Verhalten kommt nur vereinzelt vor.',
      'In aufregenden Situationen handelt {N} zeitweise impulsiv.',
      '{N} handelt {KONTRAST}häufig impulsiv, ohne die Folgen zu bedenken.',
      '{N} handelt {KONTRAST}sehr häufig impulsiv; es fällt {Nd} schwer, erst nachzudenken und dann zu handeln.'] },
    s_frust: { q: 'Kann mit Frustration und Misserfolg umgehen.', t: [
      'Mit Frustration und Misserfolg kann {N} {KONTRAST}kaum umgehen; schon kleine Rückschläge führen zu heftigen Reaktionen.',
      'Mit Frustration und Misserfolg umzugehen, fällt {Nd} {KONTRAST}schwer.',
      'Mit Frustration geht {N} {KONTRAST}wechselhaft um: Manchmal gelingt es {ihm}, Rückschläge auszuhalten, manchmal nicht.',
      'Mit Frustration und Misserfolg geht {N} meist angemessen um.',
      '{N} kann Frustration und Misserfolg gut aushalten.'] },
    s_wut: { q: 'Reagiert mit Wutausbrüchen.', np: 'Wutausbrüche', t: [
      null,
      'Wutausbrüche treten nur selten auf.',
      'Gelegentlich kommt es zu Wutausbrüchen.',
      '{N} reagiert {KONTRAST}immer wieder mit Wutausbrüchen, vor allem bei Kritik oder Grenzsetzungen.',
      '{N} zeigt {KONTRAST}häufig heftige Wutausbrüche, die den Unterricht deutlich beeinträchtigen.'] },
    s_aggr: { q: 'Zeigt verbale oder körperliche Aggression.', np: 'aggressives Verhalten', t: [
      null,
      'Aggressives Verhalten zeigt {N} nur vereinzelt.',
      'In Konfliktsituationen reagiert {N} zeitweise verbal oder körperlich aggressiv.',
      '{N} reagiert {KONTRAST}häufig verbal oder körperlich aggressiv gegenüber anderen.',
      '{N} zeigt {KONTRAST}ausgeprägtes verbal und körperlich aggressives Verhalten gegenüber anderen.'] },
    s_verweig: { q: 'Verweigert Aufgaben oder Anweisungen.', np: 'Verweigerungsverhalten', t: [
      null,
      'Aufgaben verweigert {N} nur selten.',
      'Zeitweise verweigert {N} Aufgaben oder Anweisungen, besonders bei hohen Anforderungen.',
      '{N} verweigert {KONTRAST}häufig Aufgaben oder Anweisungen.',
      '{N} verweigert {KONTRAST}sehr häufig Aufgaben und Anweisungen; eine Mitarbeit ist oft nur mit enger Begleitung möglich.'] },
    s_rueckzug: { q: 'Zieht sich zurück, wirkt still oder in sich gekehrt.', np: 'Rückzugstendenzen', t: [
      null,
      'Rückzug zeigt sich nur vereinzelt.',
      'Zeitweise zieht {N} sich zurück und wirkt in sich gekehrt.',
      '{N} zieht sich {KONTRAST}häufig zurück und wirkt still und in sich gekehrt.',
      '{N} zieht sich {KONTRAST}stark zurück und nimmt von sich aus kaum Kontakt auf.'] },
    s_angst: { q: 'Wirkt ängstlich oder angespannt (z. B. Versagensängste).', np: 'ausgeprägte Ängste', t: [
      null,
      'Ängstlichkeit zeigt sich nur selten.',
      'In Leistungssituationen wirkt {N} zeitweise angespannt oder ängstlich.',
      '{N} wirkt {KONTRAST}häufig ängstlich und angespannt, besonders bei Leistungsanforderungen.',
      '{N} wirkt {KONTRAST}sehr ängstlich und angespannt; Versagensängste prägen den Schulalltag deutlich.'] },
    s_ausgeglichen: { q: 'Wirkt emotional ausgeglichen.', t: [
      '{N} wirkt {KONTRAST}emotional sehr unausgeglichen; {seine} Stimmung schwankt stark.',
      '{N} wirkt {KONTRAST}emotional oft unausgeglichen.',
      'Emotional wirkt {N} {KONTRAST}wechselhaft: An manchen Tagen ausgeglichen, an anderen gereizt.',
      '{N} wirkt emotional überwiegend ausgeglichen.',
      '{N} wirkt emotional ausgeglichen und stabil.'] },
    s_peers: { q: 'Hat gute Kontakte zu Mitschülerinnen und Mitschülern.', t: [
      'Zu den Mitschülerinnen und Mitschülern hat {N} {KONTRAST}kaum Kontakt und wirkt in der Klasse isoliert.',
      'Kontakte zu Mitschülerinnen und Mitschülern gelingen {Nd} {KONTRAST}nur eingeschränkt.',
      'Zu einzelnen Mitschülerinnen und Mitschülern hat {N} Kontakt, ist in der Klassengemeinschaft aber nur teilweise integriert.',
      '{N} hat überwiegend gute Kontakte zu Mitschülerinnen und Mitschülern.',
      '{N} ist in der Klasse gut integriert und hat tragfähige Kontakte zu Mitschülerinnen und Mitschülern.'] },
    s_konflikt: { q: 'Gerät häufig in Konflikte mit Mitschülern.', np: 'häufige Konflikte mit Mitschülern', t: [
      null,
      'Konflikte mit Mitschülern sind selten.',
      'Gelegentlich gerät {N} in Konflikte mit Mitschülern.',
      '{N} gerät {KONTRAST}häufig in Konflikte mit Mitschülern.',
      '{N} gerät {KONTRAST}sehr häufig in Konflikte mit Mitschülern, die {er} kaum ohne Hilfe lösen kann.'] },
    s_erwachsene: { q: 'Hat eine vertrauensvolle Beziehung zu den Lehrpersonen.', t: [
      'Die Beziehung zu den Lehrpersonen ist {KONTRAST}deutlich belastet.',
      'Die Beziehung zu den Lehrpersonen ist {KONTRAST}angespannt.',
      'Die Beziehung zu den Lehrpersonen ist {KONTRAST}wechselhaft.',
      'Zu den Lehrpersonen hat {N} überwiegend eine gute Beziehung.',
      'Zu den Lehrpersonen hat {N} eine vertrauensvolle Beziehung.'] },
    s_hilfe: { q: 'Nimmt Hilfe und Unterstützung an.', t: [
      'Hilfe und Unterstützung lehnt {N} {KONTRAST}meist ab.',
      'Hilfe nimmt {N} {KONTRAST}nur zögerlich an.',
      'Hilfe nimmt {N} {KONTRAST}nur teilweise an, abhängig von Situation und Person.',
      'Hilfe und Unterstützung nimmt {N} meist gut an.',
      'Hilfe und Unterstützung nimmt {N} bereitwillig an.'] },
    s_selbstwert: { q: 'Wirkt selbstbewusst und traut sich etwas zu.', t: [
      '{N} traut sich {KONTRAST}sehr wenig zu und wirkt im Selbstwert deutlich verunsichert.',
      '{N} traut sich {KONTRAST}wenig zu und wirkt eher unsicher.',
      '{sein} Selbstvertrauen wirkt {KONTRAST}wechselhaft.',
      '{N} wirkt überwiegend selbstbewusst.',
      '{N} wirkt selbstbewusst und traut sich etwas zu.'] },

    // ---------------- 3.3 Sichtweise des Kindes ----------------
    k_offen: { q: 'Spricht im Gespräch offen über sich und die Situation.', t: [
      'Im Gespräch{datum: am {datum}} zeigte {N} sich {KONTRAST}sehr verschlossen und sprach kaum über sich und die Situation.',
      'Im Gespräch{datum: am {datum}} zeigte {N} sich {KONTRAST}eher zurückhaltend.',
      'Im Gespräch{datum: am {datum}} öffnete {N} sich nach anfänglicher Zurückhaltung teilweise.',
      'Im Gespräch{datum: am {datum}} zeigte {N} sich überwiegend offen.',
      'Im Gespräch{datum: am {datum}} zeigte {N} sich offen und sprach bereitwillig über sich und die Situation.'] },
    k_wohl: { q: 'Fühlt sich in der Schule wohl.', t: [
      '{N} berichtet, sich in der Schule {KONTRAST}nicht wohlzufühlen und ungern hinzugehen.',
      '{N} berichtet, sich in der Schule {KONTRAST}oft nicht wohlzufühlen.',
      'Das eigene Wohlbefinden in der Schule beschreibt {N} {KONTRAST}als wechselhaft.',
      '{N} gibt an, sich in der Schule meistens wohlzufühlen.',
      '{N} gibt an, gerne zur Schule zu gehen und sich dort wohlzufühlen.'] },
    k_klasse: { q: 'Fühlt sich in der Klasse angenommen.', t: [
      'In der Klasse fühlt {N} sich nach eigenen Angaben {KONTRAST}nicht angenommen.',
      'In der Klasse fühlt {N} sich {KONTRAST}eher als [[Außenseiter|Außenseiterin]].',
      'In der Klasse fühlt {N} sich {KONTRAST}nur teilweise zugehörig.',
      'In der Klasse fühlt {N} sich überwiegend angenommen.',
      'In der Klasse fühlt {N} sich angenommen und zugehörig.'] },
    k_lehrer: { q: 'Kommt mit den Lehrpersonen gut zurecht.', t: [
      'Mit den Lehrpersonen kommt {N} nach eigener Aussage {KONTRAST}nicht zurecht.',
      'Mit den Lehrpersonen kommt {N} nach eigener Aussage {KONTRAST}nur schwer zurecht.',
      'Mit einzelnen Lehrpersonen kommt {N} gut zurecht, mit anderen {KONTRAST}weniger.',
      'Mit den Lehrpersonen kommt {N} nach eigener Aussage meist gut zurecht.',
      'Mit den Lehrpersonen kommt {N} nach eigener Aussage gut zurecht.'] },
    k_leistung: { q: 'Schätzt die eigenen schulischen Fähigkeiten positiv ein.', t: [
      'Die eigenen schulischen Fähigkeiten schätzt {N} {KONTRAST}sehr negativ ein.',
      'Die eigenen schulischen Fähigkeiten schätzt {N} {KONTRAST}eher gering ein.',
      'Die eigenen schulischen Fähigkeiten schätzt {N} {KONTRAST}unterschiedlich ein: In manchen Fächern traut {er} sich viel zu, in anderen wenig.',
      'Die eigenen schulischen Fähigkeiten schätzt {N} überwiegend positiv ein.',
      'Die eigenen schulischen Fähigkeiten schätzt {N} positiv ein.'] },
    k_ungerecht: { q: 'Fühlt sich ungerecht behandelt.', np: 'ein Gefühl, ungerecht behandelt zu werden', t: [
      null,
      'Ungerecht behandelt fühlt {N} sich nur selten.',
      'Manchmal fühlt {N} sich ungerecht behandelt.',
      '{N} fühlt sich {KONTRAST}häufig ungerecht behandelt, vor allem bei Konflikten und Konsequenzen.',
      '{N} fühlt sich {KONTRAST}sehr häufig ungerecht behandelt und erlebt die eigenen Schwierigkeiten vor allem als Reaktion auf andere.'] },
    k_selbstwert: { q: 'Spricht positiv über sich selbst.', t: [
      'Über sich selbst spricht {N} {KONTRAST}sehr abwertend.',
      'Über sich selbst spricht {N} {KONTRAST}eher abwertend.',
      'Über sich selbst äußert {N} sich {KONTRAST}teils positiv, teils abwertend.',
      'Über sich selbst spricht {N} überwiegend positiv.',
      'Über sich selbst spricht {N} positiv und kann eigene Stärken benennen.'] },
    k_druck: { q: 'Erlebt Leidensdruck (belastet, traurig, überfordert).', np: 'einen erhöhten Leidensdruck', t: [
      null,
      'Einen Leidensdruck beschreibt {N} kaum.',
      '{N} beschreibt einen gewissen Leidensdruck.',
      '{N} beschreibt {KONTRAST}einen deutlichen Leidensdruck und fühlt sich häufig belastet.',
      '{N} beschreibt {KONTRAST}einen hohen Leidensdruck; {er} fühlt sich stark belastet und traurig.'] },
    k_angst: { q: 'Berichtet von Ängsten oder Sorgen.', np: 'Ängste und Sorgen', t: [
      null,
      'Ängste oder Sorgen erwähnt {N} kaum.',
      '{N} berichtet von einzelnen Ängsten und Sorgen.',
      '{N} berichtet {KONTRAST}von deutlichen Ängsten und Sorgen.',
      '{N} berichtet {KONTRAST}von ausgeprägten Ängsten und Sorgen, die {ihn} stark beschäftigen.'] },
    k_einsicht: { q: 'Erkennt eigene Schwierigkeiten (Problembewusstsein).', t: [
      'Ein Bewusstsein für die eigenen Schwierigkeiten zeigt {N} {KONTRAST}nicht.',
      'Die eigenen Schwierigkeiten erkennt {N} {KONTRAST}nur ansatzweise.',
      'Die eigenen Schwierigkeiten sieht {N} {KONTRAST}nur teilweise.',
      'Die eigenen Schwierigkeiten kann {N} überwiegend benennen.',
      'Die eigenen Schwierigkeiten kann {N} klar benennen und reflektieren.'] },
    k_veraenderung: { q: 'Möchte etwas verändern und ist offen für Hilfe.', t: [
      'Einen Wunsch nach Veränderung äußert {N} {KONTRAST}nicht; Hilfe lehnt {er} ab.',
      'Einen Wunsch nach Veränderung äußert {N} {KONTRAST}kaum.',
      'Hilfe gegenüber zeigt {N} sich {KONTRAST}nur teilweise offen.',
      '{N} wünscht sich Veränderungen und ist für Hilfe überwiegend offen.',
      '{N} wünscht sich ausdrücklich Veränderungen und ist für Hilfe offen.'] },
    k_freunde: { q: 'Hat Freundinnen oder Freunde.', t: [
      'Freundschaften hat {N} nach eigenen Angaben {KONTRAST}keine.',
      'Freundschaften hat {N} nach eigenen Angaben {KONTRAST}kaum.',
      '{N} nennt {KONTRAST}einzelne Freundinnen oder Freunde.',
      '{N} hat nach eigenen Angaben einige Freundinnen und Freunde.',
      '{N} berichtet von mehreren guten Freundschaften.'] },
    k_familie: { q: 'Beschreibt die Beziehung zur Familie positiv.', t: [
      'Die Beziehung zur Familie beschreibt {N} {KONTRAST}als sehr belastet.',
      'Die Beziehung zur Familie beschreibt {N} {KONTRAST}als schwierig.',
      'Die Beziehung zur Familie beschreibt {N} {KONTRAST}als wechselhaft.',
      'Die Beziehung zur Familie beschreibt {N} überwiegend positiv.',
      'Die Beziehung zur Familie beschreibt {N} als positiv und unterstützend.'] },

    // ---------------- 3.4 Sichtweise der Eltern ----------------
    e_alltag: { q: 'Kommt zu Hause im Alltag gut zurecht.', t: [
      'Im häuslichen Alltag kommt es {KONTRAST}ständig zu Schwierigkeiten.',
      'Der häusliche Alltag ist {KONTRAST}häufig von Schwierigkeiten geprägt.',
      'Im häuslichen Alltag gibt es {KONTRAST}sowohl ruhige Phasen als auch schwierige Situationen.',
      'Zu Hause kommt {N} im Alltag überwiegend gut zurecht.',
      'Zu Hause kommt {N} im Alltag gut zurecht.'] },
    e_regeln: { q: 'Hält sich zu Hause an Regeln und Absprachen.', t: [
      'An Regeln und Absprachen hält {N} sich zu Hause {KONTRAST}kaum.',
      'An Regeln und Absprachen hält {N} sich zu Hause {KONTRAST}nur selten.',
      'An Regeln und Absprachen hält {N} sich zu Hause {KONTRAST}nur teilweise.',
      'An Regeln und Absprachen hält {N} sich zu Hause meistens.',
      'An Regeln und Absprachen hält {N} sich zu Hause zuverlässig.'] },
    e_wut: { q: 'Zeigt zu Hause Wutausbrüche.', np: 'Wutausbrüche', t: [
      null,
      'Wutausbrüche kommen zu Hause nur selten vor.',
      'Gelegentlich kommt es zu Hause zu Wutausbrüchen.',
      'Zu Hause kommt es {KONTRAST}häufig zu Wutausbrüchen, besonders bei Grenzsetzungen.',
      'Zu Hause kommt es {KONTRAST}sehr häufig zu heftigen Wutausbrüchen, die den Familienalltag stark belasten.'] },
    e_geschwister: { q: 'Hat häufig Konflikte mit Geschwistern.', np: 'Geschwisterkonflikte', t: [
      null,
      'Konflikte mit den Geschwistern sind selten.',
      'Mit den Geschwistern kommt es gelegentlich zu Konflikten.',
      'Mit den Geschwistern kommt es {KONTRAST}häufig zu Konflikten.',
      'Mit den Geschwistern kommt es {KONTRAST}sehr häufig zu heftigen Konflikten.'] },
    e_rueckzug: { q: 'Zieht sich zu Hause zurück.', np: 'Rückzug', t: [
      null,
      'Rückzug zeigt {N} zu Hause nur selten.',
      'Zeitweise zieht {N} sich zu Hause zurück.',
      'Zu Hause zieht {N} sich {KONTRAST}häufig in {sein} Zimmer zurück.',
      'Zu Hause zieht {N} sich {KONTRAST}sehr stark zurück und ist für die Familie kaum erreichbar.'] },
    e_angst: { q: 'Zeigt zu Hause Ängste oder Sorgen.', np: 'Ängste', t: [
      null,
      'Ängste zeigen sich zu Hause kaum.',
      'Zu Hause zeigt {N} gelegentlich Ängste oder Sorgen.',
      'Zu Hause zeigt {N} {KONTRAST}häufig Ängste und Sorgen.',
      'Zu Hause zeigt {N} {KONTRAST}ausgeprägte Ängste, die den Alltag deutlich einschränken.'] },
    e_koerper: { q: 'Hat Schlafprobleme oder körperliche Beschwerden (z. B. Bauchschmerzen).', np: 'psychosomatische Beschwerden', t: [
      null,
      'Schlafprobleme oder körperliche Beschwerden treten nur selten auf.',
      'Gelegentlich treten Schlafprobleme oder körperliche Beschwerden auf.',
      '{N} hat {KONTRAST}häufig Schlafprobleme oder klagt über körperliche Beschwerden wie Bauch- oder Kopfschmerzen.',
      '{N} hat {KONTRAST}ausgeprägte Schlafprobleme und klagt sehr häufig über körperliche Beschwerden.'] },
    e_medien: { q: 'Verbringt sehr viel Zeit mit Bildschirmmedien.', np: 'einen problematischen Medienkonsum', t: [
      null,
      'Die Mediennutzung ist nach Angaben {Qg} überschaubar.',
      '{N} verbringt zeitweise viel Zeit mit Bildschirmmedien.',
      '{N} verbringt {KONTRAST}viel Zeit mit Bildschirmmedien; Begrenzungen führen häufig zu Konflikten.',
      '{N} verbringt {KONTRAST}sehr viel Zeit mit Bildschirmmedien; die Nutzung ist kaum zu begrenzen.'] },
    e_hausaufgaben: { q: 'Hausaufgaben führen zu Konflikten.', np: 'Konflikte um die Hausaufgaben', t: [
      null,
      'Hausaufgaben führen nur selten zu Konflikten.',
      'Die Hausaufgaben führen gelegentlich zu Konflikten.',
      'Die Hausaufgaben führen {KONTRAST}häufig zu Konflikten.',
      'Die Hausaufgaben führen {KONTRAST}fast täglich zu heftigen Konflikten.'] },
    e_beziehung: { q: 'Die Beziehung zum Kind wird als gut beschrieben.', t: [
      'Die Beziehung zu {Nd} {{beschreibt|beschreiben}} {Q} {KONTRAST}als sehr belastet.',
      'Die Beziehung zu {Nd} {{beschreibt|beschreiben}} {Q} {KONTRAST}als angespannt.',
      'Die Beziehung zu {Nd} {{beschreibt|beschreiben}} {Q} {KONTRAST}als ambivalent.',
      'Die Beziehung zu {Nd} {{beschreibt|beschreiben}} {Q} als überwiegend gut.',
      'Die Beziehung zu {Nd} {{beschreibt|beschreiben}} {Q} als liebevoll und tragfähig.'] },
    e_struktur: { q: 'Der Familienalltag ist klar strukturiert.', t: [
      'Im Familienalltag fehlt es {KONTRAST}weitgehend an festen Strukturen und Routinen.',
      'Der Familienalltag ist {KONTRAST}wenig strukturiert.',
      'Der Familienalltag ist {KONTRAST}nur teilweise strukturiert.',
      'Der Familienalltag ist überwiegend klar strukturiert.',
      'Der Familienalltag ist klar strukturiert und von verlässlichen Routinen geprägt.'] },
    e_konsequenz: { q: 'Die Erziehung ist klar und konsequent.', t: [
      'Eine klare und konsequente Erziehung gelingt {Qd} {KONTRAST}kaum; {Q} {{wirkt|wirken}} in der Situation überfordert.',
      'Eine konsequente Umsetzung von Regeln fällt {Qd} {KONTRAST}schwer.',
      'Regeln werden {KONTRAST}nur teilweise konsequent umgesetzt.',
      'Die Erziehung ist überwiegend klar und konsequent.',
      '{Q} {{handelt|handeln}} in der Erziehung klar und konsequent.'] },
    e_belastung: { q: 'Die Eltern fühlen sich durch die Situation stark belastet.', np: 'eine besondere Belastung der Familie', t: [
      null,
      'Eine besondere Belastung durch die Situation {{beschreibt|beschreiben}} {Q} kaum.',
      '{Q} {{fühlt|fühlen}} sich durch die Situation teilweise belastet.',
      '{Q} {{fühlt|fühlen}} sich durch die Situation {KONTRAST}deutlich belastet.',
      '{Q} {{fühlt|fühlen}} sich durch die Situation {KONTRAST}stark belastet und erschöpft.'] },
    e_sicht_schule: { q: 'Die Eltern teilen die Einschätzung der Schule.', t: [
      'Die Einschätzung der Schule {{teilt|teilen}} {Q} {KONTRAST}nicht.',
      'Die Einschätzung der Schule {{teilt|teilen}} {Q} {KONTRAST}kaum.',
      'Die Einschätzung der Schule {{teilt|teilen}} {Q} {KONTRAST}nur teilweise.',
      'Die Einschätzung der Schule {{teilt|teilen}} {Q} weitgehend.',
      'Die Einschätzung der Schule {{teilt|teilen}} {Q}.'] },
    e_kooperation: { q: 'Die Eltern sind zur Zusammenarbeit bereit.', t: [
      'Eine Zusammenarbeit {{lehnt|lehnen}} {Q} {KONTRAST}derzeit ab.',
      'Einer Zusammenarbeit {{steht|stehen}} {Q} {KONTRAST}zurückhaltend gegenüber.',
      'Zur Zusammenarbeit {{ist|sind}} {Q} grundsätzlich bereit, {{äußert|äußern}} aber noch Vorbehalte.',
      'Zur Zusammenarbeit {{ist|sind}} {Q} bereit.',
      'Zur Zusammenarbeit {{ist|sind}} {Q} sehr bereit und {{bringt|bringen}} sich aktiv ein.'] },

    // ---------------- 4.1 Verhaltensbeobachtung (Präteritum) ----------------
    b_start: { q: 'Begann Aufgaben selbstständig.', t: [
      'Aufgaben begann {N} {KONTRAST}nur nach mehrfacher Aufforderung.',
      'Mit Aufgaben begann {N} {KONTRAST}meist erst nach Aufforderung.',
      'Mit Aufgaben begann {N} {KONTRAST}teils selbstständig, teils erst nach Aufforderung.',
      'Mit Aufgaben begann {N} überwiegend selbstständig.',
      'Mit Aufgaben begann {N} zügig und selbstständig.'] },
    b_konz: { q: 'Arbeitete konzentriert und ausdauernd.', t: [
      'Konzentriertes Arbeiten war {Nd} {KONTRAST}kaum möglich; schon nach kurzer Zeit brach {er} Aufgaben ab.',
      'Konzentriert arbeitete {N} {KONTRAST}nur kurze Zeit.',
      'Die Konzentration schwankte {KONTRAST}deutlich: Phasen konzentrierten Arbeitens wechselten mit Phasen der Ablenkung.',
      '{N} arbeitete überwiegend konzentriert.',
      '{N} arbeitete konzentriert und ausdauernd.'] },
    b_anweisung: { q: 'Befolgte Anweisungen der Lehrperson.', t: [
      'Anweisungen der Lehrperson befolgte {N} {KONTRAST}kaum.',
      'Anweisungen befolgte {N} {KONTRAST}oft erst nach Wiederholung.',
      'Anweisungen befolgte {N} {KONTRAST}nur teilweise.',
      'Anweisungen der Lehrperson befolgte {N} meist.',
      'Anweisungen der Lehrperson befolgte {N} zuverlässig.'] },
    b_hilfe: { q: 'Holte sich bei Bedarf Hilfe.', t: [
      'Bei Schwierigkeiten holte {N} sich {KONTRAST}keine Hilfe.',
      'Bei Schwierigkeiten holte {N} sich {KONTRAST}selten Hilfe.',
      'Hilfe holte {N} sich {KONTRAST}nur gelegentlich.',
      'Bei Schwierigkeiten holte {N} sich meist angemessen Hilfe.',
      'Bei Schwierigkeiten holte {N} sich angemessen Hilfe.'] },
    b_unruhe: { q: 'War motorisch unruhig.', np: 'motorische Unruhe', t: [
      null,
      'Motorische Unruhe zeigte sich nur vereinzelt.',
      'Zeitweise war {N} motorisch unruhig.',
      '{N} war {KONTRAST}häufig motorisch unruhig und stand wiederholt vom Platz auf.',
      '{N} war {KONTRAST}ausgeprägt motorisch unruhig; ruhiges Sitzen gelang kaum.'] },
    b_ablenk: { q: 'Ließ sich leicht ablenken.', np: 'erhöhte Ablenkbarkeit', t: [
      null,
      'Ablenken ließ {N} sich nur selten.',
      'Zeitweise ließ {N} sich ablenken.',
      '{N} ließ sich {KONTRAST}häufig durch Geräusche oder Mitschüler ablenken.',
      '{N} ließ sich {KONTRAST}schon durch kleinste Reize ablenken.'] },
    b_regeln: { q: 'Hielt Klassenregeln ein.', t: [
      'Klassenregeln hielt {N} {KONTRAST}kaum ein.',
      'Klassenregeln hielt {N} {KONTRAST}selten ein.',
      'Klassenregeln hielt {N} {KONTRAST}nur teilweise ein.',
      'Klassenregeln hielt {N} meist ein.',
      'Klassenregeln hielt {N} zuverlässig ein.'] },
    b_frust: { q: 'Ging angemessen mit Schwierigkeiten oder Frustration um.', t: [
      'Auf Schwierigkeiten reagierte {N} {KONTRAST}heftig, etwa mit Abbruch der Aufgabe oder Wutäußerungen.',
      'Mit Schwierigkeiten ging {N} {KONTRAST}selten angemessen um.',
      'Mit Schwierigkeiten ging {N} {KONTRAST}wechselhaft um.',
      'Mit Schwierigkeiten ging {N} überwiegend angemessen um.',
      'Mit Schwierigkeiten und Frustration ging {N} angemessen um.'] },
    b_uebergang: { q: 'Bewältigte Übergänge und Wechsel ohne Schwierigkeiten.', t: [
      'Übergänge und Wechsel bereiteten {Nd} {KONTRAST}große Schwierigkeiten.',
      'Übergänge und Wechsel bereiteten {Nd} {KONTRAST}Schwierigkeiten.',
      'Übergänge und Wechsel gelangen {Nd} {KONTRAST}nur teilweise.',
      'Übergänge und Wechsel gelangen {Nd} meist ohne Schwierigkeiten.',
      'Übergänge und Wechsel bewältigte {N} ohne Schwierigkeiten.'] },
    b_lob: { q: 'Reagierte positiv auf Lob und Zuwendung.', t: [
      'Auf Lob und Zuwendung reagierte {N} {KONTRAST}kaum.',
      'Auf Lob reagierte {N} {KONTRAST}eher zurückhaltend.',
      'Auf Lob reagierte {N} {KONTRAST}unterschiedlich.',
      'Auf Lob und Zuwendung reagierte {N} überwiegend positiv.',
      'Auf Lob und Zuwendung reagierte {N} sichtlich positiv.'] },
    b_stoer: { q: 'Störte den Unterricht.', np: 'Unterrichtsstörungen', t: [
      null,
      'Den Unterricht störte {N} nur vereinzelt.',
      'Zeitweise störte {N} den Unterricht.',
      '{N} störte {KONTRAST}den Unterricht wiederholt, etwa durch Zwischenrufe oder Nebengespräche.',
      '{N} störte {KONTRAST}den Unterricht häufig und deutlich.'] },
    b_peers: { q: 'Suchte und hielt positiven Kontakt zu Mitschülern.', t: [
      'Kontakt zu Mitschülern nahm {N} {KONTRAST}nicht auf.',
      'Kontakt zu Mitschülern nahm {N} {KONTRAST}kaum auf.',
      'Kontakt zu Mitschülern nahm {N} {KONTRAST}nur gelegentlich auf.',
      'Zu Mitschülern hatte {N} überwiegend positiven Kontakt.',
      'Zu Mitschülern suchte und hielt {N} positiven Kontakt.'] },
    b_erwachsene: { q: 'Nahm angemessen Kontakt zu Erwachsenen auf.', t: [
      'Kontakt zu Erwachsenen vermied {N} {KONTRAST}weitgehend.',
      'Kontakt zu Erwachsenen nahm {N} {KONTRAST}nur zögerlich auf.',
      'Den Kontakt zu Erwachsenen gestaltete {N} {KONTRAST}teils angemessen, teils distanzlos oder vermeidend.',
      'Kontakt zu Erwachsenen nahm {N} überwiegend angemessen auf.',
      'Kontakt zu Erwachsenen nahm {N} angemessen und offen auf.'] },
    b_isol: { q: 'Zog sich zurück oder blieb für sich.', np: 'Rückzug', t: [
      null,
      'Rückzug zeigte sich nur vereinzelt.',
      'Zeitweise blieb {N} für sich.',
      '{N} zog sich {KONTRAST}häufig zurück und blieb für sich.',
      '{N} blieb {KONTRAST}fast durchgehend für sich und mied den Kontakt zu anderen.'] },
    b_provo: { q: 'Provozierte andere oder reagierte aggressiv.', np: 'provozierendes Verhalten', t: [
      null,
      'Provozierendes Verhalten zeigte sich nur vereinzelt.',
      'Zeitweise provozierte {N} Mitschüler.',
      '{N} provozierte {KONTRAST}wiederholt Mitschüler oder reagierte aggressiv.',
      '{N} provozierte {KONTRAST}häufig und reagierte mehrfach verbal oder körperlich aggressiv.'] },

    // ---------------- 4.3 Interpretation ----------------
    i_uebereinstimmung: { q: 'Die Sichtweisen von Schule, Eltern und Kind stimmen überein.', t: [
      'Die Sichtweisen von Schule, Eltern und {Name} selbst weichen deutlich voneinander ab.',
      'Die Sichtweisen von Schule, Eltern und {Name} selbst stimmen nur in Teilen überein.',
      'Die Sichtweisen von Schule, Eltern und {Name} selbst stimmen teilweise überein.',
      'Die Sichtweisen von Schule, Eltern und {Name} selbst stimmen weitgehend überein.',
      'Die Sichtweisen von Schule, Eltern und {Name} selbst stimmen in den wesentlichen Punkten überein.'] },
    i_beobachtung: { q: 'Die eigene Beobachtung bestätigt die Berichte.', t: [
      'Die eigene Beobachtung bestätigt die Berichte nicht.',
      'Die eigene Beobachtung bestätigt die Berichte nur in einzelnen Punkten.',
      'Die eigene Beobachtung bestätigt die Berichte teilweise.',
      'Die eigene Beobachtung bestätigt die Berichte weitgehend.',
      'Die eigene Beobachtung bestätigt die Berichte.'] },
    i_eldib: { q: 'Das ELDiB-Profil passt zum klinischen Eindruck.', t: [
      'Das ELDiB-Profil weicht vom klinischen Eindruck deutlich ab.',
      'Das ELDiB-Profil deckt sich nur in Teilen mit dem klinischen Eindruck.',
      'Das ELDiB-Profil deckt sich teilweise mit dem klinischen Eindruck.',
      'Das ELDiB-Profil deckt sich weitgehend mit dem klinischen Eindruck.',
      'Das ELDiB-Profil deckt sich mit dem klinischen Eindruck.'] },
    i_unstrukturiert: { q: 'Schwierigkeiten zeigen sich vor allem in wenig strukturierten Situationen (Pause, Übergänge, freie Arbeit).', m: 'in wenig strukturierten Situationen (etwa Pausen und Übergänge)', t: [
      null, null,
      'Teilweise treten die Schwierigkeiten in wenig strukturierten Situationen auf.',
      'Häufig treten die Schwierigkeiten in wenig strukturierten Situationen auf, etwa in Pausen oder bei Übergängen.',
      'Die Schwierigkeiten treten vor allem in wenig strukturierten Situationen wie Pausen, Übergängen oder freien Arbeitsphasen auf.'] },
    i_anforderung: { q: 'Schwierigkeiten zeigen sich vor allem bei Leistungsanforderungen.', m: 'bei Leistungsanforderungen', t: [
      null, null,
      'Teilweise stehen die Schwierigkeiten im Zusammenhang mit Leistungsanforderungen.',
      'Häufig treten die Schwierigkeiten bei Leistungsanforderungen auf.',
      'Die Schwierigkeiten treten vor allem bei Leistungsanforderungen auf.'] },
    i_beziehung: { q: 'Schwierigkeiten zeigen sich vor allem in Beziehungssituationen (Nähe, Konkurrenz, Grenzen).', m: 'in Beziehungssituationen (etwa bei Nähe, Konkurrenz oder Grenzsetzung)', t: [
      null, null,
      'Teilweise stehen die Schwierigkeiten im Zusammenhang mit Beziehungssituationen.',
      'Häufig treten die Schwierigkeiten in Beziehungssituationen auf, etwa bei Konkurrenz oder Grenzsetzung.',
      'Die Schwierigkeiten treten vor allem in Beziehungssituationen auf, etwa bei Nähe, Konkurrenz oder Grenzsetzung.'] },
    i_einzel: { q: 'In der Einzelsituation mit einem Erwachsenen gelingt deutlich mehr.', t: [
      null, null,
      'In der Einzelsituation gelingt {Nd} teilweise mehr als in der Gruppe.',
      'In der Einzelsituation mit einem Erwachsenen gelingt {Nd} mehr als in der Gruppe.',
      'In der Einzelsituation mit einem Erwachsenen gelingt {Nd} deutlich mehr als in der Gruppe.'] },
    i_schule: { q: 'Die Schwierigkeiten zeigen sich vor allem in der Schule.', t: [
      null, null,
      'In der Schule zeigen sich die Schwierigkeiten etwas stärker als zu Hause.',
      'Die Schwierigkeiten zeigen sich stärker in der Schule als zu Hause.',
      'Die Schwierigkeiten zeigen sich vor allem im schulischen Kontext.'] },
    i_zuhause: { q: 'Die Schwierigkeiten zeigen sich vor allem zu Hause.', t: [
      null, null,
      'Zu Hause zeigen sich die Schwierigkeiten etwas stärker als in der Schule.',
      'Die Schwierigkeiten zeigen sich stärker zu Hause als in der Schule.',
      'Die Schwierigkeiten zeigen sich vor allem im häuslichen Umfeld.'] },
    // Entwicklungsängste (Entwicklungstherapie nach Wood / ETEP)
    i_angst_verlassen: { q: 'Angst vor dem Verlassenwerden (Stufe I)', np: 'eine Angst vor dem Verlassenwerden (Stufe I)',
      e: '{N} scheint stark auf die Verfügbarkeit vertrauter Erwachsener angewiesen zu sein und reagiert auf Trennungen oder Wechsel mit Verunsicherung.' },
    i_angst_unzul: { q: 'Angst vor Unzulänglichkeit/Versagen (Stufe II)', np: 'eine Angst vor Unzulänglichkeit (Stufe II)',
      e: '{N} scheint Anforderungen schnell als Überforderung zu erleben und fürchtet, den Erwartungen nicht zu genügen.' },
    i_angst_schuld: { q: 'Schuldangst (Stufe III)', np: 'eine Schuldangst (Stufe III)',
      e: '{N} scheint Fehler und Regelverstöße stark mit Schuld und Scham zu verbinden und rechnet schnell mit Ablehnung.' },
    i_angst_konflikt: { q: 'Konfliktangst (Stufe IV)', np: 'eine Konfliktangst (Stufe IV)',
      e: 'In Auseinandersetzungen mit Gleichaltrigen und Erwachsenen scheint {N} schnell unter Druck zu geraten und Konflikten entweder auszuweichen oder sie zu verschärfen.' },
    i_angst_identitaet: { q: 'Identitätsangst (Stufe V)', np: 'eine Identitätsangst (Stufe V)',
      e: '{N} scheint stark mit Fragen nach der eigenen Rolle, Zugehörigkeit und Selbstbestimmung beschäftigt zu sein.' },
    // Abwehrmechanismen
    i_abw_rueckzug: { q: 'Rückzug', np: 'Rückzug' },
    i_abw_vermeidung: { q: 'Vermeidung, Verweigerung', np: 'Vermeidung' },
    i_abw_aggression: { q: 'Aggression, Angriff', np: 'aggressive Gegenwehr' },
    i_abw_regression: { q: 'Regression (kleinkindliches Verhalten)', np: 'regressives Verhalten' },
    i_abw_clown: { q: 'Clownerie, Ablenkung', np: 'Clownerie' },
    i_abw_kontrolle: { q: 'Überkontrolle, Perfektionismus', np: 'Überkontrolle' },
    i_abw_projektion: { q: 'Projektion, Schuldzuweisung an andere', np: 'Schuldzuweisung an andere' },
    i_abw_verleugnung: { q: 'Verleugnung, Bagatellisierung', np: 'Bagatellisierung' },
    // Erklärungsansätze: n = Nominativ, g = Genitiv
    i_hyp_entwicklung: { q: 'Verzögerung der sozio-emotionalen Entwicklung', n: 'eine Verzögerung der sozio-emotionalen Entwicklung', g: 'einer Verzögerung der sozio-emotionalen Entwicklung' },
    i_hyp_regulation: { q: 'Schwierigkeiten der Emotionsregulation', n: 'eine eingeschränkte Fähigkeit zur Emotionsregulation', g: 'einer eingeschränkten Fähigkeit zur Emotionsregulation' },
    i_hyp_belastung: { q: 'Reaktion auf aktuelle familiäre oder schulische Belastungen', pl: true, n: 'aktuelle familiäre oder schulische Belastungen', g: 'aktueller familiärer oder schulischer Belastungen' },
    i_hyp_bindung: { q: 'Bindungsunsicherheit', n: 'eine Bindungsunsicherheit', g: 'einer Bindungsunsicherheit' },
    i_hyp_sozial: { q: 'Soziale Unsicherheit', n: 'soziale Unsicherheit', g: 'sozialer Unsicherheit' },
    i_hyp_aufmerksamkeit: { q: 'Aufmerksamkeitsproblematik', n: 'eine Aufmerksamkeitsproblematik', g: 'einer Aufmerksamkeitsproblematik' },
    i_hyp_ueberforderung: { q: 'Schulische Überforderung', n: 'eine schulische Überforderung', g: 'einer schulischen Überforderung' },
    i_hyp_unterforderung: { q: 'Schulische Unterforderung', n: 'eine schulische Unterforderung', g: 'einer schulischen Unterforderung' },
    i_hyp_trauma: { q: 'Mögliche Folgen belastender Erfahrungen (weiter abklären)' },

    // ---------------- 5.1 Bedürfnisse: a = Akkusativ, d = Dativ ----------------
    n_struktur: { q: 'Klare Strukturen und vorhersehbare Abläufe', a: 'klare Strukturen und vorhersehbare Abläufe', d: 'klaren Strukturen und vorhersehbaren Abläufen' },
    n_beziehung: { q: 'Eine verlässliche, stabile Bezugsperson', a: 'eine verlässliche, stabile Bezugsperson', d: 'einer verlässlichen, stabilen Bezugsperson' },
    n_erfolg: { q: 'Erfolgserlebnisse und positive Rückmeldungen', a: 'Erfolgserlebnisse und positive Rückmeldungen', d: 'Erfolgserlebnissen und positiven Rückmeldungen' },
    n_regulation: { q: 'Unterstützung bei der Regulation der Gefühle', a: 'Unterstützung bei der Regulation {seiner} Gefühle', d: 'Unterstützung bei der Regulation {seiner} Gefühle' },
    n_grenzen: { q: 'Klare Grenzen und konsequente Rückmeldungen', a: 'klare Grenzen und konsequente Rückmeldungen', d: 'klaren Grenzen und konsequenten Rückmeldungen' },
    n_sozial: { q: 'Förderung sozialer Kompetenzen', a: 'eine gezielte Förderung {seiner} sozialen Kompetenzen', d: 'einer gezielten Förderung {seiner} sozialen Kompetenzen' },
    n_organisation: { q: 'Hilfen bei Aufmerksamkeit und Arbeitsorganisation', a: 'Hilfen zur Strukturierung von Aufmerksamkeit und Arbeitsorganisation', d: 'Hilfen zur Strukturierung von Aufmerksamkeit und Arbeitsorganisation' },
    n_differenzierung: { q: 'Angepasste Anforderungen (Differenzierung)', a: 'an {seine} Möglichkeiten angepasste Anforderungen', d: 'an {seine} Möglichkeiten angepassten Anforderungen' },
    n_therapie: { q: 'Therapeutische Begleitung', a: 'eine therapeutische Begleitung', d: 'einer therapeutischen Begleitung' },
    n_familie: { q: 'Unterstützung der Familie', a: 'eine Stärkung {seiner} Familie', d: 'einer Stärkung {seiner} Familie' }
  },

  // Auswahlfelder: [Beschriftung, Form im Text]
  chips: {
    s_staerken: { hilfsbereit: ['hilfsbereit', 'Hilfsbereitschaft'], kreativ: ['kreativ', 'Kreativität'], humorvoll: ['humorvoll', 'Humor'], sportlich: ['sportlich', 'sportliche Fähigkeiten'], sprachlich: ['sprachlich stark', 'sprachliche Fähigkeiten'], mathematisch: ['mathematisch stark', 'mathematisches Verständnis'], technisch: ['technisch interessiert', 'technisches Interesse'], musikalisch: ['musikalisch', 'Musikalität'], fantasievoll: ['fantasievoll', 'Fantasie'], wissbegierig: ['wissbegierig', 'Wissbegierde'], freundlich: ['freundlich', 'Freundlichkeit'], zuverlaessig: ['zuverlässig', 'Zuverlässigkeit'] },
    s_hilft: { ansagen: ['klare, kurze Ansagen', 'klare, kurze Ansagen'], wiederholung: ['Wiederholungen', 'Wiederholungen'], visualisierung: ['Visualisierungen', 'Visualisierungen'], bewegung: ['Bewegungspausen', 'Bewegungspausen'], rueckzugsort: ['Rückzugsmöglichkeit', 'eine Rückzugsmöglichkeit'], einzelansprache: ['Einzelansprache', 'persönliche Einzelansprache'], lob: ['Lob, Verstärkung', 'Lob und positive Verstärkung'], vorwarnung: ['Vorwarnung bei Wechseln', 'die Vorankündigung von Wechseln'], kleingruppe: ['Kleingruppe', 'die Arbeit in der Kleingruppe'], naehe: ['Nähe zur Lehrperson', 'die Nähe zur Lehrperson'], struktur: ['feste Abläufe', 'feste Abläufe und Strukturen'] },
    s_erwartung: { strategien: ['Strategien für den Unterricht', 'konkrete Strategien für den Unterricht'], verhalten: ['besseres Verhalten', 'eine Verbesserung des Verhaltens'], konzentration: ['bessere Konzentration', 'eine bessere Konzentration'], integration: ['soziale Integration', 'eine bessere soziale Integration'], stabilitaet: ['emotionale Stabilität', 'mehr emotionale Stabilität'], leistung: ['bessere Leistungen', 'bessere schulische Leistungen'], therapie: ['therapeutische Hilfe', 'externe therapeutische Unterstützung'], eltern: ['Zusammenarbeit mit Eltern', 'eine engere Zusammenarbeit mit den Eltern'], foerderort: ['anderer Förderort', 'die Prüfung eines anderen Förderorts'], abklaerung: ['Abklärung', 'eine diagnostische Abklärung'] },
    k_interessen: { sport: ['Sport', 'Sport'], gaming: ['Videospiele', 'Videospiele'], musik: ['Musik', 'Musik'], lesen: ['Lesen', 'Lesen'], kreatives: ['Malen, Basteln', 'Malen und Basteln'], freunde: ['Freunde treffen', 'Zeit mit Freunden'], tiere: ['Tiere', 'Tiere'], natur: ['Natur', 'Aktivitäten in der Natur'], technik: ['Technik', 'Technik'], kochen: ['Kochen, Backen', 'Kochen und Backen'] },
    k_wuensche: { noten: ['bessere Noten', 'bessere Noten'], freunde: ['mehr Freunde', 'mehr Freunde'], streit: ['weniger Streit', 'weniger Streit'], ruhe: ['Ruhe zu Hause', 'mehr Ruhe zu Hause'], druck: ['weniger Druck', 'weniger Druck'], verstanden: ['verstanden werden', 'mehr Verständnis'], hilfe: ['Hilfe bekommen', 'Unterstützung'], klasse: ['andere Klasse', 'einen Wechsel der Klasse'], schule: ['andere Schule', 'einen Schulwechsel'], inruhe: ['in Ruhe gelassen werden', 'mehr Rückzugsmöglichkeiten'] },
    e_staerken: { hilfsbereit: ['hilfsbereit', 'Hilfsbereitschaft'], liebevoll: ['liebevoll', 'Zuneigung zur Familie'], selbststaendig: ['selbstständig', 'Selbstständigkeit'], kreativ: ['kreativ', 'Kreativität'], humorvoll: ['humorvoll', 'Humor'], sportlich: ['sportlich', 'sportliche Aktivität'], verantwortung: ['verantwortungsbewusst', 'Verantwortungsbewusstsein'], offen: ['offen', 'Offenheit'] },
    e_erwartung: { verhalten: ['besseres Verhalten', 'eine Verbesserung des Verhaltens'], entspannung: ['Entspannung zu Hause', 'eine Entspannung der Situation zu Hause'], strategien: ['Erziehungsstrategien', 'konkrete Erziehungsstrategien'], leistung: ['bessere Leistungen', 'bessere schulische Leistungen'], abklaerung: ['Abklärung', 'eine diagnostische Abklärung'], therapie: ['Therapie für das Kind', 'therapeutische Unterstützung für {Na}'], beratung: ['Beratung für sich', 'Beratung für sich selbst'], foerderort: ['anderer Förderort', 'einen anderen Förderort'], verstehen: ['das Kind verstehen', 'ein besseres Verständnis für {Na}'], bestaetigung: ['Orientierung, Rückhalt', 'Orientierung und Rückhalt'] },
    ressourcen: { kognitiv: ['kognitive Fähigkeiten', 'gute kognitive Fähigkeiten'], kreativ: ['Kreativität', 'Kreativität'], sportlich: ['Sport', 'sportliche Fähigkeiten'], musisch: ['künstlerisch, musisch', 'eine künstlerisch-musische Begabung'], humor: ['Humor', 'Humor'], empathie: ['Einfühlungsvermögen', 'Einfühlungsvermögen'], neugier: ['Neugier', 'Neugier und Wissensdurst'], begeisterung: ['Begeisterungsfähigkeit', 'Begeisterungsfähigkeit'], hilfsbereit: ['Hilfsbereitschaft', 'Hilfsbereitschaft'], verantwortung: ['übernimmt Verantwortung', 'Verantwortungsbereitschaft'], einzelbeziehung: ['Einzelbeziehungen', 'Beziehungsfähigkeit im Einzelkontakt'], lernbereit: ['Lernbereitschaft', 'Lernbereitschaft'], vertrauensperson: ['Vertrauensperson', 'eine Vertrauensperson in der Schule'], familie: ['unterstützende Familie', 'eine unterstützende Familie'], hobbys: ['Hobbys', 'stabile Hobbys und Interessen'], reflexion: ['reflektiert', 'Reflexionsfähigkeit'] },
    // Fakten
    anlass: { verhalten_schule: ['Verhalten in der Schule', 'Verhaltensauffälligkeiten in der Schule'], verhalten_zuhause: ['Verhalten zu Hause', 'Verhaltensauffälligkeiten zu Hause'], emotional: ['emotionale Schwierigkeiten', 'emotionalen Schwierigkeiten'], sozial: ['soziale Schwierigkeiten', 'Schwierigkeiten im sozialen Miteinander'], leistung: ['Schulleistung', 'schulischen Leistungsproblemen'], aufmerksamkeit: ['Aufmerksamkeit', 'Aufmerksamkeits- und Konzentrationsproblemen'], aggression: ['Aggression', 'aggressivem Verhalten'], rueckzug: ['Rückzug', 'Rückzugsverhalten'], aengste: ['Ängste', 'ausgeprägten Ängsten'], schulverweigerung: ['Schulverweigerung', 'Schulverweigerung bzw. Schulabsentismus'] },
    anliegen: { isa: ['ISA', 'eine Spezialisierte ambulante Intervention (ISA)'], conseil: ['Conseil & Guidance', 'eine Beratung und Begleitung (Conseil & Guidance)'], cst: ['CST', 'eine Aufnahme im Centre socio-thérapeutique (CST)'], clapa: ['Classe de Participation', 'eine Aufnahme in eine Classe de Participation'], annexe: ['Annexe Junglinster', 'eine Aufnahme in der Annexe Junglinster'], lernwerkstatt: ['Lernwerkstatt', 'eine Teilnahme an der Spezialisierten Lernwerkstatt'], beschulung: ['spezialisierte Beschulung', 'eine spezialisierte Beschulung im CDSE'], diagnostik: ['Diagnostik', 'eine vertiefte diagnostische Abklärung'] },
    empfohlen: { lehrperson: ['Lehrperson', 'der Lehrperson'], eseb: ['ESEB', 'des ESEB'], schulleitung: ['Schulleitung', 'der Schulleitung'], arzt: ['Ärztin/Arzt', 'der behandelnden Ärztin bzw. des behandelnden Arztes'], psychologe: ['Psychologin/Psychologe', 'der Psychologin bzw. des Psychologen'], eltern: ['Wunsch der Eltern', ''] },
    diagnosen: { adhs: ['ADHS/ADS', 'eine ADHS'], ass: ['Autismus-Spektrum', 'eine Autismus-Spektrum-Störung'], lernstoerung: ['Lernstörung', 'eine Lernstörung'], sprachstoerung: ['Sprachentwicklungsstörung', 'eine Sprachentwicklungsstörung'], emotional: ['emotionale Störung', 'eine emotionale Störung'], bindung: ['Bindungsstörung', 'eine Bindungsstörung'], angst: ['Angststörung', 'eine Angststörung'], opposition: ['oppositionelles Verhalten', 'eine Störung mit oppositionellem Trotzverhalten'], andere: ['andere', ''] },
    ereignisse: { trennung: ['Trennung der Eltern', 'die Trennung der Eltern'], umzug: ['Umzug', 'ein Umzug'], verlust: ['Verlust einer Bezugsperson', 'der Verlust einer nahestehenden Person'], krankheit: ['Krankheit in der Familie', 'eine Erkrankung in der Familie'], konflikte: ['häusliche Konflikte', 'häusliche Konflikte'], trauma: ['belastendes Erlebnis', 'ein belastendes Erlebnis'], migration: ['Migration', 'eine Migrationserfahrung'] },
    betreuung: { maison_relais: ['Maison Relais', ''], grosseltern: ['Großeltern', ''], tagesmutter: ['Tagesmutter', ''], keine: ['keine', ''] },
    sprachen: { lb: ['Luxemburgisch', 'Luxemburgisch'], de: ['Deutsch', 'Deutsch'], fr: ['Französisch', 'Französisch'], pt: ['Portugiesisch', 'Portugiesisch'], en: ['Englisch', 'Englisch'], it: ['Italienisch', 'Italienisch'], es: ['Spanisch', 'Spanisch'], andere: ['andere', ''] },
    verfahren: { eldib: ['ELDiB', 'dem ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen)'], beobachtung: ['Beobachtung', ''], gespraeche: ['Gespräche', ''], sdq: ['SDQ', 'dem Strengths and Difficulties Questionnaire (SDQ)'], wisc: ['WISC-V', 'dem WISC-V'], andere: ['andere', ''] },
    empf_familie: { step: ['STEP-Elterntraining (CDSE)', 'Teilnahme am Elterntraining STEP im CDSE'], erziehungsberatung: ['Erziehungsberatung', 'Erziehungsberatung zur Stärkung der elterlichen Handlungssicherheit'], familientherapie: ['Familientherapie', 'Familientherapeutische Begleitung'], tagesstruktur: ['Tagesstruktur zu Hause', 'Klare Tagesstruktur und verlässliche Routinen zu Hause'], austausch: ['Austausch mit der Schule', 'Regelmäßiger Austausch zwischen Eltern und Schule'], medien: ['Medienregeln', 'Klare, gemeinsam vereinbarte Regeln zur Mediennutzung'], freizeit: ['Freizeitaktivität', 'Regelmäßige Freizeitaktivität, z. B. in einem Verein'] },
    empf_schule: { sitzplatz: ['Sitzplatz', 'Ruhiger Sitzplatz in der Nähe der Lehrperson'], differenzierung: ['Differenzierung', 'Differenzierte, klar gegliederte Aufgabenstellungen'], verstaerker: ['Verstärkerplan', 'Häufige positive Rückmeldungen, ggf. mit einem Verstärkerplan'], regeln: ['Regeln & Konsequenzen', 'Wenige, klare Regeln mit vorhersehbaren Konsequenzen'], auszeit: ['Auszeit/Rückzug', 'Vereinbarte Auszeit- bzw. Rückzugsmöglichkeit'], uebergaenge: ['Übergänge ankündigen', 'Vorankündigung von Übergängen und Wechseln'], visualisierung: ['Visualisierung', 'Visualisierung von Tagesablauf und Arbeitsschritten'], bewegung: ['Bewegungspausen', 'Regelmäßige Bewegungspausen'], iebs: ['I-EBS', 'Unterstützung durch die I-EBS'], bezugsperson: ['Bezugsperson', 'Eine feste Bezugsperson in der Schule'] },
    empf_region: { eseb: ['ESEB-Begleitung', 'Weiterführende Begleitung durch das ESEB'], isa: ['ISA', 'Spezialisierte ambulante Intervention (ISA) des CDSE'], conseil: ['Conseil & Guidance', 'Beratung und Begleitung (Conseil & Guidance) durch das CDSE'], lernwerkstatt: ['Lernwerkstatt', 'Teilnahme an der Spezialisierten Lernwerkstatt'], psychotherapie: ['Psychotherapie', 'Kinder- und jugendpsychotherapeutische Begleitung'], ergotherapie: ['Ergotherapie', 'Ergotherapie'], logopaedie: ['Logopädie', 'Logopädie'], psychiatrie: ['kinderpsychiatrische Abklärung', 'Kinder- und jugendpsychiatrische Abklärung'] },
    cni: { diag_kompetenzzentrum: ['Diagnostik mit Kompetenzzentrum', 'Spezialisierte Diagnostik in Zusammenarbeit mit einem Kompetenzzentrum'], beratung_eltern: ['Beratung Eltern und Kind', 'Beratung und Begleitung der Eltern und [[des betroffenen Schülers|der betroffenen Schülerin]]'], beratung_fachleute: ['Beratung Fachleute', 'Beratung und Begleitung der Fachleute'], lernwerkstatt: ['Lernwerkstatt', 'Spezialisierte Lernwerkstatt'], isa: ['ISA', 'Spezialisierte ambulante Intervention (ISA)'], beschulung: ['Beschulung im CDSE', 'Spezialisierte Beschulung im CDSE'], clapa: ['Classe de Participation', 'Spezialisierte Beschulung im CDSE – Classe de Participation'], cst: ['CST', 'Spezialisierte Beschulung im CDSE – Centre socio-thérapeutique (CST)'], annexe: ['Annexe Junglinster', 'Spezialisierte Beschulung im CDSE – Annexe Junglinster'], ausland: ['Beschulung im Ausland', 'Spezialisierte Beschulung im Ausland'], rehabilitation: ['Rehabilitation', 'Rehabilitation'], abschluss: ['Abschluss der Aktivitäten', 'Abschluss der Aktivitäten des CDSE'], schliessung: ['Schließung der Akte', 'Schließung der Akte im CDSE'] }
  },

  // Rahmensätze
  s: {
    liste_und: 'und', liste_oder: 'oder', liste_sowie: 'sowie',
    schule_intro: 'Grundlage ist ein Gespräch mit {QSd}{datum: am {datum}}.',
    schule_staerken: '{{Als Stärke wird|Als Stärken werden}} {liste} genannt.',
    schule_hilft: 'Als hilfreich haben sich {liste} erwiesen.',
    schule_erwartung: 'Von der Unterstützung durch das CDSE erhofft sich die Schule {liste}.',
    schule_ohne: 'Hinweise auf {liste} ergeben sich aus Sicht der Schule nicht.',
    kind_intro: 'Das Gespräch mit {Name} fand{datum: am {datum}} statt.',
    kind_interessen: 'Zu {seinen} Interessen zählen {liste}.',
    kind_wuensche: 'Für die Zukunft wünscht {N} sich {liste}.',
    kind_vertrauen: 'Als Vertrauensperson in der Schule nennt {N} {text}.',
    kind_ohne: 'Hinweise auf {liste} ergeben sich aus dem Gespräch nicht.',
    eltern_intro: 'Grundlage ist ein Gespräch mit {Qd}{datum: am {datum}}.',
    eltern_staerken: '{{Als Stärke wird|Als Stärken werden}} {liste} genannt.',
    eltern_erwartung: 'Von der Unterstützung {{erhofft|erhoffen}} sich {Q} {liste}.',
    eltern_ohne: 'Hinweise auf {liste} ergeben sich aus dem Elterngespräch nicht.',
    beob_ohne: 'Hinweise auf {liste} zeigten sich während der Beobachtung nicht.',
    beob_eine: 'Grundlage ist eine Beobachtung {beob}.',
    beob_mehrere: 'Grundlage sind Beobachtungen {beob}.',
    beob_eintrag: '{datum: am {datum}}{ort: {ort}}{dauer: ({dauer} Minuten)}',
    // Interpretation
    muster_stark: 'Die Schwierigkeiten treten vor allem {liste} auf.',
    muster_mittel: 'Häufig treten die Schwierigkeiten {liste} auf.',
    muster_mittel_nach: 'Häufig zeigen sie sich auch {liste}.',
    aengste_stark: 'Im entwicklungstherapeutischen Verständnis ergeben sich deutliche Hinweise auf {liste}.',
    aengste_mittel: 'Im entwicklungstherapeutischen Verständnis ergeben sich Hinweise auf {liste}.',
    aengste_beide: 'Im entwicklungstherapeutischen Verständnis ergeben sich deutliche Hinweise auf {stark}, teilweise auch auf {mittel}.',
    abwehr_stark: 'Als Abwehr {{zeigt|zeigen}} sich vor allem {liste}.',
    abwehr_mittel: 'Als Abwehr {{zeigt|zeigen}} sich teilweise {liste}.',
    abwehr_beide: 'Als Abwehr {{zeigt|zeigen}} sich vor allem {stark}, daneben auch {mittel}.',
    abwehr_bezug_stark: '{{Diese Angst|Diese Ängste}} scheint {N} vor allem durch {stark} abzuwehren.',
    abwehr_bezug_beide: '{{Diese Angst|Diese Ängste}} scheint {N} vor allem durch {stark} abzuwehren, teilweise auch durch {mittel}.',
    abwehr_bezug_mittel: '{{Diese Angst|Diese Ängste}} scheint {N} teilweise durch {mittel} abzuwehren.',
    hyp_stark: 'Die beschriebenen Schwierigkeiten lassen sich am ehesten als Ausdruck {liste} verstehen.',
    hyp_mittel: 'Daneben {{könnte|könnten}} {liste} eine Rolle spielen.',
    hyp_nur_mittel: 'Als mögliche Erklärungen kommen {liste} in Betracht.',
    hyp_trauma: 'Ob belastende Erfahrungen eine Rolle spielen, sollte fachlich weiter abgeklärt werden.',
    // Bedürfnisse, Ressourcen
    beduerfnis_stark: '{N} braucht vor allem {liste}.',
    beduerfnis_mittel: 'Zudem profitiert {N} von {liste}.',
    beduerfnis_nur_mittel: '{N} profitiert von {liste}.',
    ressourcen: 'Als Ressourcen sind {liste} hervorzuheben.'
  },

  // Beschriftungen der Oberfläche
  ui: {
    titel: 'Diagnostic Spécialisé', untertitel: 'Schritt für Schritt zum fertigen Bericht',
    schritte: { stamm: 'Kind & Bericht', auftrag: 'Auftrag', vorgeschichte: 'Vorgeschichte', familie: 'Familie', aktuell: 'Aktuelle Situation', schule: 'Sicht der Schule', kind: 'Sicht des Kindes', eltern: 'Sicht der Eltern', beobachtung: 'Beobachtung', eldib: 'ELDiB-Ergebnisse', deutung: 'Interpretation', beduerfnisse: 'Bedürfnisse & Ressourcen', empfehlungen: 'Empfehlungen', vorschau: 'Vorschau & Export' },
    themen: {
      'schule.lernen': 'Lern- und Arbeitsverhalten', 'schule.verhalten': 'Verhalten und Emotionen', 'schule.beziehung': 'Beziehungen',
      'kind.schule': 'Schule', 'kind.selbst': 'Selbstbild und Befinden', 'kind.umfeld': 'Freunde und Familie',
      'eltern.alltag': 'Alltag zu Hause', 'eltern.familie': 'Familie und Erziehung', 'eltern.zusammenarbeit': 'Zusammenarbeit',
      'beobachtung.arbeit': 'Arbeitsverhalten', 'beobachtung.verhalten': 'Verhalten', 'beobachtung.kontakt': 'Kontakt',
      'deutung.quellen': 'Abgleich der Informationen', 'deutung.muster': 'Wann zeigen sich die Schwierigkeiten?', 'deutung.aengste': 'Entwicklungsängste (Hinweise)', 'deutung.abwehr': 'Abwehrmechanismen (wie deutlich?)', 'deutung.hypothesen': 'Erklärungsansätze (wie wahrscheinlich?)',
      'beduerfnisse.beduerfnisse': 'Was braucht das Kind? (wie wichtig?)'
    },
    chipTitel: { s_staerken: 'Stärken aus Sicht der Schule', s_hilft: 'Was hilft im Unterricht?', s_erwartung: 'Was erhofft sich die Schule?', k_interessen: 'Interessen und Hobbys', k_wuensche: 'Was wünscht sich das Kind?', e_staerken: 'Stärken aus Sicht der Eltern', e_erwartung: 'Was erhoffen sich die Eltern?', ressourcen: 'Ressourcen des Kindes' }
  }
};

// ==== 43b-ds-fakten-de.js ====
// =====================================================================
// DS-Baukasten: deutsche Faktenabschnitte (Auftrag, Vorgeschichte, Familie,
// aktuelle Situation, Verfahren, ELDiB, Schluss, Ziele, Empfehlungen, CNI)
// h = Hilfsfunktionen aus DsText (fuelle, satz, liste, chips, …)
// =====================================================================
DS_TEXTE.de.s.das_kind = 'das Kind';
DS_TEXTE.de.s.vorschau_ohne = 'Wird im Bericht in der Aufzählung „keine Hinweise auf …“ erwähnt: {liste}.';
DS_TEXTE.de.quellen = {
  schule: {
    lehrperson: { n: 'die Lehrperson', d: 'der Lehrperson', label: 'Lehrperson' },
    lehrerin: { n: 'die Klassenlehrerin', d: 'der Klassenlehrerin', label: 'Klassenlehrerin' },
    lehrer: { n: 'der Klassenlehrer', d: 'dem Klassenlehrer', label: 'Klassenlehrer' },
    team: { n: 'das pädagogische Team', d: 'dem pädagogischen Team', label: 'Pädagogisches Team' },
    eseb: { n: 'die ESEB-Fachkraft', d: 'der ESEB-Fachkraft', label: 'ESEB-Fachkraft' }
  },
  eltern: {
    eltern: { n: 'die Eltern', d: 'den Eltern', g: 'der Eltern', zahl: 2, label: 'beide Eltern' },
    mutter: { n: 'die Mutter', d: 'der Mutter', g: 'der Mutter', zahl: 1, label: 'Mutter' },
    vater: { n: 'der Vater', d: 'dem Vater', g: 'des Vaters', zahl: 1, label: 'Vater' },
    pflegeeltern: { n: 'die Pflegeeltern', d: 'den Pflegeeltern', g: 'der Pflegeeltern', zahl: 2, label: 'Pflegeeltern' },
    grosseltern: { n: 'die Großeltern', d: 'den Großeltern', g: 'der Großeltern', zahl: 2, label: 'Großeltern' }
  }
};
DS_TEXTE.de.optionen = {
  auftraggeber: { cni: ['CNI', 'der Nationalen Kommission für Inklusion (CNI)'], eseb: ['ESEB', 'dem ESEB'], schule: ['Schule', 'der Schule'], eltern: ['Eltern', 'den Eltern'] },
  verlauf: { unauffaellig: 'unauffällig', komplikationen: 'mit Komplikationen', unbekannt: 'unbekannt' },
  entwicklung: { altersgerecht: 'altersgerecht', verzoegert: 'verzögert', unbekannt: 'unbekannt' },
  familienstand: { zusammen: 'leben zusammen', getrennt: 'leben getrennt', alleinerziehend: 'alleinerziehend', patchwork: 'Patchworkfamilie', verstorben: 'ein Elternteil verstorben' },
  lebt_bei: { beide: ['bei beiden Eltern', 'lebt bei beiden Eltern'], mutter: ['bei der Mutter', 'lebt bei der Mutter'], vater: ['beim Vater', 'lebt beim Vater'], wechsel: ['im Wechselmodell', 'lebt im Wechselmodell abwechselnd bei beiden Eltern'], grosseltern: ['bei den Großeltern', 'lebt bei den Großeltern'], pflege: ['in einer Pflegefamilie', 'lebt in einer Pflegefamilie'], heim: ['in einer Wohngruppe', 'lebt in einer Wohngruppe'] },
  kontakt: { regelmaessig: 'Zu beiden Eltern besteht regelmäßiger Kontakt.', eingeschraenkt_vater: 'Der Kontakt zum Vater ist eingeschränkt.', eingeschraenkt_mutter: 'Der Kontakt zur Mutter ist eingeschränkt.', kein_vater: 'Zum Vater besteht kein Kontakt.', kein_mutter: 'Zur Mutter besteht kein Kontakt.' },
  position: { aeltestes: 'das älteste Kind', mittleres: 'ein mittleres Kind', juengstes: 'das jüngste Kind' },
  arbeitszeit: { vollzeit: 'in Vollzeit', teilzeit: 'in Teilzeit', nicht: '' },
  setting: { klasse: 'im Klassenverband', kleingruppe: 'in der Kleingruppe', einzel: 'in einer Einzelsituation', pause: 'in der Pause', maison: 'in der Maison Relais', sport: 'im Sportunterricht' },
  abgestimmt: { ja: 'Ja, vollständig abgestimmt', vorbehalte: 'Ja, mit Vorbehalten', nein: 'Nein' },
  stufeAlter: { 1: '0–2 Jahre', 2: '2–5 Jahre', 3: '6–9 Jahre', 4: '10–12 Jahre', 5: '13–16 Jahre' }
};

DS_TEXTE.de.fakten = (function () {
  const O = DS_TEXTE.de.optionen;
  const roem = function (n) { return ['', 'I', 'II', 'III', 'IV', 'V'][n] || String(n); };
  // ELDiB-Beschreibung als Satzteil: "Reagiert auf …" -> "reagiert auf …"
  function praedikat(d) {
    d = String(d || '').trim().replace(/\.$/, '');
    const w = d.split(/\s+/)[0] || '';
    return /^[A-ZÄÖÜ][a-zäöüß]+t,?$/.test(w) ? d.charAt(0).toLowerCase() + d.slice(1) : '';
  }
  return {
    auftrag: function (c, ds, st, h) {
      const f = ds.f || {}, s = [];
      c.neuerAbsatz();
      const wer = (O.auftraggeber[f.auftraggeber || 'cni'] || O.auftraggeber.cni)[1];
      const wer2 = f.auftraggeber === 'andere' && h.frei(ds, 'auftraggeber_andere') ? h.frei(ds, 'auftraggeber_andere') : wer;
      s.push(h.satz(h.fuelle('Das Zentrum für sozio-emotionale Entwicklung (CDSE) wurde{datum: am {datum}} von {wer} beauftragt, eine vertiefende Diagnostik bei {wem} durchzuführen, um {seinen} aktuellen sozio-emotionalen Entwicklungsstand und Förderbedarf festzustellen.', c, { datum: h.datum(f.auftrag_datum, 'de'), wer: wer2, wem: c.vollname || (c.g === 'w' ? 'der Schülerin' : 'dem Schüler') }), c));
      const anl = h.chips(ds, 'anlass').map(function (k) { return h.chipText(c, 'anlass', k); });
      if (h.frei(ds, 'anlass_andere')) { anl.push(h.frei(ds, 'anlass_andere')); }
      if (anl.length) { s.push(h.satz(h.fuelle('Die Beauftragung erfolgte aufgrund von {liste}.', c, { liste: h.liste(anl, c) }), c)); }
      const anl2 = h.chips(ds, 'anliegen').map(function (k) { return h.chipText(c, 'anliegen', k); });
      if (anl2.length) { s.push(h.satz(h.fuelle('Ziel ist es, {liste} einzuleiten.', c, { liste: h.liste(anl2, c) }), c)); }
      const emp = h.chips(ds, 'empfohlen').filter(function (k) { return k !== 'eltern'; }).map(function (k) { return h.chipText(c, 'empfohlen', k); });
      const wunsch = h.chips(ds, 'empfohlen').indexOf('eltern') >= 0;
      if (emp.length && wunsch) { s.push(h.satz(h.fuelle('Die Anfrage erfolgte auf Empfehlung {liste} sowie auf Wunsch der Eltern.', c, { liste: h.liste(emp, c) }), c)); }
      else if (emp.length) { s.push(h.satz(h.fuelle('Die Anfrage erfolgte auf Empfehlung {liste}.', c, { liste: h.liste(emp, c) }), c)); }
      else if (wunsch) { s.push(h.satz('Die Anfrage erfolgte auf Wunsch der Eltern.', c)); }
      const b = [h.block(s.join(' '))];
      return b.concat(h.freiBloecke(ds, 'anlass_details'));
    },

    vorgeschichte: function (c, ds, st, h) {
      const f = ds.f || {}, s = [], b = [];
      c.neuerAbsatz();
      // Schwangerschaft und Geburt
      const sg = f.schwangerschaft, gb = f.geburt;
      if (sg === 'unauffaellig' && gb === 'unauffaellig') { s.push('Schwangerschaft und Geburt verliefen nach Angaben der Eltern unauffällig.'); }
      else {
        if (sg === 'unauffaellig') { s.push('Die Schwangerschaft verlief unauffällig.'); }
        if (sg === 'komplikationen') { s.push(h.satz(h.fuelle('Die Schwangerschaft verlief mit Komplikationen{d: ({d})}.', c, { d: h.frei(ds, 'schwangerschaft_details') }), c)); }
        if (gb === 'unauffaellig') { s.push('Die Geburt verlief unauffällig.'); }
        if (gb === 'komplikationen') { s.push(h.satz(h.fuelle('Bei der Geburt kam es zu Komplikationen{d: ({d})}.', c, { d: h.frei(ds, 'geburt_details') }), c)); }
      }
      // Motorik und Sprache
      const mo = f.motorik, sp = f.sprache;
      const worte = f.erste_worte ? ' (erste Wörter mit etwa ' + f.erste_worte + ' Monaten)' : '';
      if (mo === 'altersgerecht' && sp === 'altersgerecht') { s.push('Motorik und Sprache entwickelten sich altersgerecht' + worte + '.'); }
      else if (mo === 'altersgerecht' && sp === 'verzoegert' && !h.frei(ds, 'sprache_details')) { s.push('Die motorische Entwicklung verlief altersgerecht, die Sprachentwicklung verzögert' + worte + '.'); }
      else if (mo === 'verzoegert' && sp === 'altersgerecht' && !h.frei(ds, 'motorik_details')) { s.push('Die Sprachentwicklung verlief altersgerecht' + worte + ', die motorische Entwicklung verzögert.'); }
      else {
        if (mo === 'altersgerecht') { s.push('Die motorische Entwicklung verlief altersgerecht.'); }
        if (mo === 'verzoegert') { s.push(h.satz(h.fuelle('Die motorische Entwicklung verlief verzögert{d: ({d})}.', c, { d: h.frei(ds, 'motorik_details') }), c)); }
        if (sp === 'altersgerecht') { s.push('Die Sprachentwicklung verlief altersgerecht' + worte + '.'); }
        if (sp === 'verzoegert') { s.push(h.satz(h.fuelle('Die Sprachentwicklung verlief verzögert' + worte + '{d:; {d}}.', c, { d: h.frei(ds, 'sprache_details') }), c)); }
      }
      // Diagnosen
      const dg = h.chips(ds, 'diagnosen').map(function (k) {
        const name = k === 'andere' ? h.frei(ds, 'diagnose_andere') : h.chipText(c, 'diagnosen', k);
        const det = ds.f && ds.f.diagnosen_details && ds.f.diagnosen_details[k];
        return name ? name + (det ? ' (' + det + ')' : '') : '';
      }).filter(Boolean);
      if (dg.length) { s.push(h.satz(h.fuelle('Diagnostiziert {{wurde|wurden}} bisher {liste}.', c, { liste: h.liste(dg, c), zahl: dg.length }), c)); }
      else if (f.keine_diagnosen) { s.push('Bisher liegen keine Diagnosen vor.'); }
      if (s.length) { b.push(h.block(s.join(' '))); }
      const rows = ((ds.tabellen && ds.tabellen.vorgeschichte) || []).filter(function (r) { return r && (r.zeitraum || r.massnahme || r.akteur); });
      if (rows.length) {
        b.push(h.block('Bisherige schulische und außerschulische Unterstützungsmaßnahmen:'));
        b.push({ typ: 'tabelle', id: 'vorgeschichte', kopf: ['Zeitraum', 'Klasse', 'Maßnahme', 'Akteur'], zeilen: rows.map(function (r) { return [r.zeitraum || '', r.klasse || '', r.massnahme || '', r.akteur || '']; }) });
      }
      return b.concat(h.freiBloecke(ds, 'vorgeschichte'));
    },

    sozialbericht: function (c, ds, st, h) {
      const f = ds.f || {}, s = [];
      c.neuerAbsatz();
      const lb = O.lebt_bei[f.lebt_bei];
      const stand = { getrennt: 'Die Eltern von {Name} leben getrennt', zusammen: 'Die Eltern von {Name} leben zusammen', alleinerziehend: f.lebt_bei === 'vater' ? 'Der Vater von {Name} ist alleinerziehend' : 'Die Mutter von {Name} ist alleinerziehend', patchwork: '{Name} wächst in einer Patchworkfamilie auf', verstorben: 'Ein Elternteil von {Name} ist verstorben' }[f.familienstand];
      if (stand && lb && !(f.familienstand === 'zusammen' && f.lebt_bei === 'beide')) { s.push(h.satz(h.fuelle(stand + '; {er} ' + lb[1] + '.', c), c)); }
      else if (stand && f.familienstand === 'zusammen' && f.lebt_bei === 'beide') { s.push(h.satz(h.fuelle('{Name} lebt mit beiden Eltern zusammen.', c), c)); }
      else if (stand) { s.push(h.satz(h.fuelle(stand + '.', c), c)); }
      else if (lb) { s.push(h.satz(h.fuelle('{N} ' + lb[1] + '.', c), c)); }
      if (O.kontakt[f.kontakt]) { s.push(O.kontakt[f.kontakt]); }
      if (h.frei(ds, 'kontakt_details')) { s.push(h.satz(h.frei(ds, 'kontakt_details'), c)); }
      const n = parseInt(f.geschwister_anzahl, 10);
      if (n === 0) { s.push(h.satz(h.fuelle('{N} ist Einzelkind.', c), c)); }
      else if (n > 0) {
        const pos = O.position[f.geschwister_position];
        s.push(h.satz(h.fuelle('{N} hat ' + (n === 1 ? 'ein Geschwisterkind' : n + ' Geschwister') + (pos ? ' und ist ' + pos : '') + '.', c), c));
      }
      const sp = h.chips(ds, 'sprachen').map(function (k) { return k === 'andere' ? h.frei(ds, 'sprache_andere') : h.chipText(c, 'sprachen', k); }).filter(Boolean);
      if (sp.length) { s.push(h.satz(h.fuelle('In der Familie wird {liste} gesprochen.', c, { liste: h.liste(sp, c) }), c)); }
      const beruf = function (wer, b, z) {
        if (z === 'nicht') { return wer + ' ist derzeit nicht berufstätig'; }
        if (!b && !z) { return ''; }
        return wer + ' arbeitet' + (O.arbeitszeit[z] ? ' ' + O.arbeitszeit[z] : '') + (b ? ' als ' + b : '');
      };
      const bm = beruf('die Mutter', h.frei(ds, 'beruf_mutter'), f.zeit_mutter), bv = beruf('der Vater', h.frei(ds, 'beruf_vater'), f.zeit_vater);
      if (bm && bv) { s.push(h.satz(bm + '; ' + bv + '.', c)); } else if (bm || bv) { s.push(h.satz((bm || bv) + '.', c)); }
      const ev = h.chips(ds, 'ereignisse').map(function (k) {
        const det = ds.f && ds.f.ereignis_details && ds.f.ereignis_details[k];
        return h.chipText(c, 'ereignisse', k) + (det ? ' (' + det + ')' : '');
      });
      if (ev.length) { s.push(h.satz(h.fuelle('{{Als belastendes Ereignis wird|Als belastende Ereignisse werden}} {liste} genannt.', c, { liste: h.liste(ev, c), zahl: ev.length }), c)); }
      const bt = h.chips(ds, 'betreuung');
      if (bt.indexOf('maison_relais') >= 0) { s.push(h.satz(h.fuelle('Nach der Schule besucht {N} die Maison Relais.', c), c)); }
      if (bt.indexOf('grosseltern') >= 0) { s.push(h.satz(h.fuelle('Außerhalb der Schule betreuen die Großeltern {Na} regelmäßig.', c), c)); }
      if (bt.indexOf('tagesmutter') >= 0) { s.push(h.satz(h.fuelle('Außerhalb der Schule wird {N} von einer Tagesmutter betreut.', c), c)); }
      if (h.frei(ds, 'freizeit')) { s.push(h.satz(h.frei(ds, 'freizeit'), c)); }
      return (s.length ? [h.block(s.join(' '))] : []).concat(h.freiBloecke(ds, 'familie'));
    },

    aktuell: function (c, ds, st, h) {
      const f = ds.f || {};
      c.neuerAbsatz();
      const klasse = f.klasse || (st && st.klasse) || '', schule = f.schule_name || (st && st.foerderort) || '';
      const s = [];
      if (klasse || schule) {
        const am = /^(Lycée|Lyzeum|Athénée|Institut|Centre|Zentrum)/i.test(schule) ? 'am' : 'an der';
        const tpl = klasse ? 'Derzeit besucht {N} die Klasse {klasse}{schule: {am} {schule}}{lp: bei {lp}}.' : 'Derzeit wird {N} {am} {schule}{lp: bei {lp}} beschult.';
        s.push(h.satz(h.fuelle(tpl, c, { klasse: klasse, schule: schule, am: am, lp: h.frei(ds, 'lehrperson') }), c));
      }
      if (h.frei(ds, 'eseb_referenz')) { s.push(h.satz(h.fuelle('{seine} Referenzperson im ESEB ist {x}.', c, { x: h.frei(ds, 'eseb_referenz') }), c)); }
      const b = (s.length ? [h.block(s.join(' '))] : []).concat(h.freiBloecke(ds, 'aktuell'));   // eigene Ergänzung
      const rows = ((ds.tabellen && ds.tabellen.aktuell) || []).filter(function (r) { return r && (r.zeitraum || r.massnahme || r.akteur); });
      if (rows.length) { b.push({ typ: 'tabelle', id: 'aktuell', kopf: ['Zeitraum', 'Klasse', 'Maßnahme', 'Akteur'], zeilen: rows.map(function (r) { return [r.zeitraum || '', r.klasse || '', r.massnahme || '', r.akteur || '']; }), abschnitt: 'massnahmen' }); }
      return b;
    },

    verfahren: function (c, ds, st, h) {
      c.neuerAbsatz();
      const v = h.chips(ds, 'verfahren').filter(function (k) { return k !== 'andere' && h.chipText(c, 'verfahren', k); }).map(function (k) { return h.chipText(c, 'verfahren', k); });
      if (h.frei(ds, 'verfahren_andere')) { v.push(h.frei(ds, 'verfahren_andere')); }
      if (!v.length) { v.push(h.chipText(c, 'verfahren', 'eldib')); }
      // Beobachtung und Gespräche nur nennen, wenn dazu Angaben vorliegen (sonst nichts erfinden)
      const gespr = [['schule', 'den Lehrpersonen'], ['eltern', 'den Eltern'], ['kind', '{Name}']].filter(function (x) { return h.angaben(x[0]); }).map(function (x) { return x[1]; });
      const teile = ['auf {liste}'];
      if (h.angaben('beobachtung') || h.chips(ds, 'verfahren').indexOf('beobachtung') >= 0) { teile.push('auf Beobachtungen im Unterricht'); }
      if (gespr.length) { teile.push('auf Gesprächen mit ' + h.liste(gespr, c)); } else if (h.chips(ds, 'verfahren').indexOf('gespraeche') >= 0) { teile.push('auf Gesprächen'); }
      const s = [h.satz(h.fuelle('Die vorliegende Einschätzung beruht ' + (teile.length > 1 ? teile.slice(0, -1).join(', ') + ' sowie ' + teile[teile.length - 1] : teile[0]) + '.', c, { liste: h.liste(v, c) }), c)];
      if (h.frei(ds, 'verfahren_ort')) { s.push(h.satz(h.fuelle('Beobachtungen und Gespräche fanden in {ort} statt.', c, { ort: h.frei(ds, 'verfahren_ort') }), c)); }
      return [h.block(s.join(' '))];
    },

    beobachtungIntro: function (c, ds, st, h) {
      const l = ((ds.f && ds.f.beobachtungen) || []).filter(function (b) { return b && (b.datum || b.setting || b.dauer); });
      if (!l.length) { return []; }
      c.neuerAbsatz();
      const T = DS_TEXTE.de.s;
      const teile = l.map(function (b) {
        return h.fuelle(T.beob_eintrag, c, { datum: h.datum(b.datum, 'de'), ort: O.setting[b.setting] || b.setting_andere || '', dauer: b.dauer ? String(b.dauer) : '' }).trim();
      });
      return [h.block(h.satz(h.fuelle(l.length > 1 ? T.beob_mehrere : T.beob_eine, c, { beob: h.liste(teile, c) }), c))];
    },

    eldib: function (c, ds, st, h, profil) {
      const b = [];
      c.neuerAbsatz();
      b.push(h.block('Der ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen) ist ein standardisiertes Einschätzungsinstrument, das dazu dient, die soziale und emotionale Entwicklung von Kindern und Jugendlichen im Alter zwischen Geburt und sechzehn Jahren zu erfassen. Er stellt ein Profil spezifischer Fähigkeiten zur Verfügung, die als Indikatoren der sozialen und emotionalen Förderung dienen.'));
      const bereiche = (profil && profil.bereiche) || [];
      const mitStufe = bereiche.filter(function (x) { return x.stufe > 0; });
      bereiche.forEach(function (x, i) {
        c.neuerAbsatz();
        const s = [];
        const v = { bereich: x.name, code: x.code, stufe: roem(x.stufe), richtziel: x.richtziel, alter: O.stufeAlter[x.stufe] || '' };
        if (!x.stufe) { s.push(h.satz(h.fuelle('Im Bereich {bereich} ({code}) wurden noch keine Items als erreicht eingeschätzt.', c, v), c)); }
        else if (mitStufe.length > 1 && x === mitStufe[0]) { s.push(h.satz(h.fuelle('Am weitesten entwickelt ist bei {Name} der Bereich {bereich} ({code}): Hier befindet {er} sich auf Entwicklungsstufe {stufe} („{richtziel}“, {alter}).', c, v), c)); }
        else if (mitStufe.length > 1 && x === mitStufe[mitStufe.length - 1]) { s.push(h.satz(h.fuelle('Am wenigsten entwickelt ist der Bereich {bereich} ({code}): Hier befindet {N} sich auf Entwicklungsstufe {stufe} („{richtziel}“, {alter}).', c, v), c)); }
        else { s.push(h.satz(h.fuelle('Im Bereich {bereich} ({code}) befindet {N} sich auf Entwicklungsstufe {stufe} („{richtziel}“, {alter}).', c, v), c)); }
        // die zwei zuletzt erreichten Fähigkeiten, mit unterschiedlichem Verb
        const pr = [], verben = {};
        (x.erreicht || []).slice().reverse().forEach(function (it) { const p = praedikat(it.description), v = p.split(' ')[0]; if (p && pr.length < 2 && !verben[v]) { verben[v] = 1; pr.unshift(p); } });
        if (pr.length) { s.push(h.satz(h.fuelle('{N} verfügt hier bereits über gute Fähigkeiten: {^N} {p}.', c, { p: h.liste(pr, c, false, true) }), c)); }
        const extra = ds.frei && ds.frei['eldib_' + x.id];
        if (extra && String(extra).trim()) { s.push(String(extra).trim()); }
        b.push(h.block(s.join(' ')));
        if ((x.ziele || []).length) {
          b.push(h.block(h.satz(h.fuelle('Ausgehend vom Richtziel ergeben sich folgende Lernziele für {Na}:', c), c)));
          b.push({ typ: 'liste', punkte: x.ziele.map(function (z) { return z.code + ' – ' + String(z.description || '').replace(/\.$/, ''); }) });
        } else if (x.stufe) {
          b.push(h.block('In diesem Bereich wurden keine Lernziele festgelegt.'));
        }
      });
      if (profil && profil.lebensalter != null && mitStufe.length) {
        c.neuerAbsatz();
        const erw = profil.erwarteteStufe, unter = mitStufe.filter(function (x) { return x.stufe < erw; });
        const v = { roem: roem(erw), alter: O.stufeAlter[erw] || '', jahre: profil.lebensalter };
        let t;
        if (unter.length === bereiche.length) { t = 'Gemessen am Lebensalter von {jahre} Jahren wäre Entwicklungsstufe {roem} ({alter}) zu erwarten; alle vier Bereiche liegen darunter.'; }
        else if (unter.length === 1) { t = 'Gemessen am Lebensalter von {jahre} Jahren wäre Entwicklungsstufe {roem} ({alter}) zu erwarten; darunter liegt der Bereich {liste}.'; v.liste = unter[0].name; }
        else if (unter.length) { t = 'Gemessen am Lebensalter von {jahre} Jahren wäre Entwicklungsstufe {roem} ({alter}) zu erwarten; darunter liegen die Bereiche {liste}.'; v.liste = h.liste(unter.map(function (x) { return x.name; }), c); }
        else { t = 'Alle eingeschätzten Bereiche entsprechen mindestens der altersentsprechenden Entwicklungsstufe {roem} ({alter}).'; }
        b.push(h.block(h.satz(h.fuelle(t, c, v), c)));
      }
      return b;
    },

    schluss: function (c, ds, st, h) {
      const f = ds.f || {};
      c.neuerAbsatz();
      const mitKind = c.alter != null && c.alter >= 12;
      const wer = mitKind ? '{Name} sowie den Eltern' : 'den Eltern';
      let t;
      if (f.abgestimmt === 'vorbehalte') {
        t = 'Auf Grundlage der vorliegenden Testergebnisse, Beobachtungen und anamnestischen Informationen wurden spezifische Förderbedarfe identifiziert. In Gesprächen mit ' + wer + ' konnten Empfehlungen zur weiteren Unterstützung der individuellen Entwicklung erarbeitet werden. Dabei wurden einzelne vorgeschlagene Maßnahmen ' + (mitKind ? 'von den Eltern bzw. von {Name}' : 'von den Eltern') + ' kritisch hinterfragt bzw. nicht vollständig befürwortet.';
      } else if (f.abgestimmt === 'nein') {
        t = 'Auf Grundlage der vorliegenden Testergebnisse, Beobachtungen und anamnestischen Informationen wurden spezifische Förderbedarfe identifiziert und Empfehlungen formuliert. Eine Abstimmung dieser Empfehlungen mit ' + wer + ' war bislang nicht möglich.';
      } else if (f.abgestimmt === 'ja') {
        t = 'Auf Basis der erhobenen Testergebnisse, Beobachtungen und anamnestischen Informationen wurden in enger Abstimmung mit ' + wer + ' gezielte Förderbedarfe identifiziert. Daraus abgeleitet wurden gemeinsam Empfehlungen formuliert, die die individuelle Entwicklung wirksam unterstützen sollen.';
      } else {
        // keine Angabe zur Abstimmung: keine Abstimmung behaupten
        t = 'Auf Basis der erhobenen Testergebnisse, Beobachtungen und anamnestischen Informationen wurden gezielte Förderbedarfe identifiziert. Daraus abgeleitet wurden Empfehlungen formuliert, die die individuelle Entwicklung wirksam unterstützen sollen.';
      }
      return [h.block(h.satz(h.fuelle(t, c), c))].concat(h.freiBloecke(ds, 'vorbehalte'));
    },

    ziele: function (c, ds, st, h, profil) {
      const f = ds.f || {}, b = [];
      c.neuerAbsatz();
      const ziele = [];
      ((profil && profil.bereiche) || []).forEach(function (x) { (x.ziele || []).forEach(function (z) { ziele.push({ z: z, x: x }); }); });
      const bis = f.ziele_bis ? 'bis zum ' + h.datum(f.ziele_bis, 'de') : 'bis zum Ende des nächsten ' + ((st && st.periodenTyp) === 'semester' ? 'Semesters' : 'Trimesters');
      if (ziele.length) {
        b.push(h.block(h.satz(h.fuelle('Die folgenden Förderziele leiten sich aus den ELDiB-Lernzielen ab. Sie beschreiben den jeweils nächsten Entwicklungsschritt; ihre Umsetzung wird {bis} im Alltag beobachtet und in der nächsten ELDiB-Einschätzung überprüft.', c, { bis: bis }), c)));
        b.push({ typ: 'liste', punkte: ziele.map(function (e) {
          c.neuerAbsatz();
          const p = praedikat(e.z.description);
          const text = p ? h.satz(h.fuelle('{Name} ' + p, c), c) : String(e.z.description || '').replace(/\.$/, '');
          return text + ' (' + e.z.code + ')';
        }) });
      }
      const zus = h.frei(ds, 'ziele_zusatz');
      if (zus) { b.push({ typ: 'liste', punkte: zus.split(/\n+/).map(function (l) { return l.replace(/^[-•*]\s*/, '').trim(); }).filter(Boolean) }); }
      return b;
    },

    empfehlungen: function (c, ds, st, h) {
      const b = [];
      c.neuerAbsatz();
      [['empf_familie', 'Familiärer Kontext', 'empfehlung_familie'], ['empf_schule', 'Schulischer Kontext (lokal)', 'empfehlung_schule'], ['empf_region', 'Regionaler Kontext (ESEB / CDSE)', 'empfehlung_region']].forEach(function (g) {
        const p = h.chips(ds, g[0]).map(function (k) { return h.fuelle(h.chipText(c, g[0], k), c); });
        const extra = h.frei(ds, g[2]);
        if (extra) { extra.split(/\n+/).forEach(function (l) { l = l.replace(/^[-•*]\s*/, '').trim(); if (l) { p.push(l); } }); }
        if (p.length) { b.push({ typ: 'zwischen', text: g[1] }); b.push({ typ: 'liste', punkte: p }); }
      });
      return b;
    },

    cni: function (c, ds, st, h) {
      c.neuerAbsatz();
      const m = h.chips(ds, 'cni').map(function (k) { return h.fuelle(h.chipText(c, 'cni', k), c); });
      const b = [];
      if (m.length) {
        b.push(h.block(m.length > 1 ? 'Das CDSE empfiehlt der Nationalen Kommission für Inklusion (CNI) folgende Maßnahmen:' : 'Das CDSE empfiehlt der Nationalen Kommission für Inklusion (CNI) folgende Maßnahme:'));
        b.push({ typ: 'liste', punkte: m });
      }
      return b.concat(h.freiBloecke(ds, 'cni_begruendung'));
    }
  };
})();

// ==== 44-ds-texte-fr.js ====
// =====================================================================
// DS-Baukasten: französische Texte (Diagnostic spécialisé, Vorlage der CNI vom 12.11.2025)
// ---------------------------------------------------------------------
// Gleiche Schlüssel und Felder wie 43-ds-texte-de.js.
// q   = Aussage zum Anklicken (Oberfläche, typografischer Apostroph ’)
// t   = Formulierungen für den Bericht je Stufe:
//       [0] 1–2 trifft (gar) nicht zu  [1] 3 eher nicht  [2] 4 teils/teils
//       [3] 5 eher zu  [4] 6–7 trifft (voll) zu      null = kein Satz
//       Jeder Satz muss auch nach "Toutefois, / En revanche, / Cependant, " passen
//       (der Motor setzt das vor die erste Schwierigkeit nach Stärken).
// np  = Kurzform mit "de/d'" für "aucun signe {liste}" (bereits elidiert)
// m   = Situation für muster_* ("dans …", "face à …")
// e   = erklärender Satz zu den zwei deutlichsten Entwicklungsängsten
// n/g = Erklärungsansätze: n ohne Präposition ("Par ailleurs, {liste} pourrait …"),
//       g mit "de/d'" ("comme l'expression {liste}")
// a/d = Bedürfnisse, beide mit "de/d'" ("a surtout besoin {liste}", "bénéficierait {liste}")
// Platzhalter (Französisch):
//   {N}  Name bzw. il/elle – NUR als Subjekt
//   {Nt} Name bzw. betontes Pronomen lui/elle – nur nach Präposition (pour, avec, chez, par)
//   {Name} immer der Name; {il} {lui} {le} {T} feste Pronomen ({le} = le/la)
//   {Nd}/{Na} werden im Französischen NICHT verwendet (Wortstellung der Pronomen).
//   [[masculin|féminin]] Angleichung an das Kind; {{singulier|pluriel}} Zahl der Quelle/Liste
//   {Q}/{Qd}/{Qg} Eltern-Quelle (la mère / la mère / de la mère), {QS}/{QSd} Schul-Quelle
//   {KONTRAST} gibt es im Französischen nicht.
// Der Motor elidiert (de/que/ne/se/le/la … vor Vokal) und setzt die Leerzeichen vor : ; ! ?
// und in « ». Es gibt KEINE Zusammenziehung (de le -> du, à le -> au): Präpositionen stehen
// deshalb in den Listenformen. Wörter mit h aspiré (honte, hauteur, hasard …) nie nach
// de/le/la verwenden. Apostroph im Berichtstext: gerade ('), wie ihn der Motor erzeugt.
// Stil: sachlich, beschreibend, ressourcenorientiert; Präsens für Berichte von Schule,
// Eltern und Kind, Passé composé/Imparfait für die Verhaltensbeobachtung.
// =====================================================================
DS_TEXTE.fr = {
  skala: { 1: 'ne correspond pas du tout', 2: '', 3: '', 4: 'en partie', 5: '', 6: '', 7: 'correspond tout à fait', leer: 'non renseigné' },

  a: {
    // ---------------- 3.2 Point de vue de l'école ----------------
    s_motiv: { q: 'Participe aux cours avec motivation.', t: [
      "{N} ne participe guère aux cours et doit régulièrement être [[encouragé|encouragée]] à s'investir.",
      "En classe, {N} participe de manière plutôt réservée ; sa motivation varie nettement.",
      "{N} participe aux cours de manière inégale, selon le sujet abordé et sa forme du jour.",
      "Dans l'ensemble, {N} participe aux cours avec motivation.",
      "{N} participe aux cours avec motivation et intérêt."] },
    s_konz: { q: 'Parvient à se concentrer en classe de manière adaptée à son âge.', t: [
      "{N} ne parvient pratiquement pas à se concentrer : le moindre stimulus suffit à {le} distraire.",
      "{N} ne parvient à se concentrer que brièvement et se laisse facilement distraire.",
      "{N} ne parvient à se concentrer que par moments ; son attention faiblit nettement lors des phases de travail prolongées.",
      "{N} parvient le plus souvent à se concentrer de manière adaptée à son âge.",
      "En classe, {N} se concentre de manière efficace et durable."] },
    s_selbst: { q: 'Commence et termine ses tâches de manière autonome.', t: [
      "{N} ne commence pratiquement aucune tâche sans aide, et les travaux entamés restent souvent inachevés.",
      "{N} a souvent besoin d'aide pour commencer ses tâches et les mener à terme.",
      "Pour commencer et terminer ses tâches, {N} a encore régulièrement besoin d'être [[relancé|relancée]].",
      "La plupart du temps, {N} commence et termine ses tâches de manière autonome.",
      "{N} commence ses tâches de manière autonome et les mène jusqu'au bout."] },
    s_sorgfalt: { q: 'Travaille avec soin et de manière organisée.', t: [
      "{N} travaille souvent de manière précipitée et désorganisée ; son matériel et ses devoirs manquent fréquemment.",
      "{N} parvient rarement à travailler avec soin et de manière organisée.",
      "Le soin et l'organisation dans le travail varient d'un jour à l'autre.",
      "{N} travaille généralement avec soin et tient son matériel en ordre.",
      "{N} travaille avec soin et de manière bien organisée."] },
    s_leistung: { q: 'Atteint les objectifs d’apprentissage de son niveau.', t: [
      "Sur le plan scolaire, {N} se situe nettement en dessous des attentes de son niveau.",
      "{N} n'atteint que partiellement les attentes scolaires de son niveau.",
      "{N} n'atteint les objectifs d'apprentissage de son niveau que dans certaines matières.",
      "{N} atteint globalement les objectifs d'apprentissage de son niveau.",
      "Sur le plan scolaire, {N} atteint sans difficulté les objectifs d'apprentissage de son niveau."] },
    s_unruhe: { q: 'Présente une agitation motrice.', np: "d'agitation motrice", t: [
      null,
      "Une agitation motrice n'apparaît que ponctuellement.",
      "{N} présente par moments une agitation motrice, notamment lors des longues périodes en position assise.",
      "{N} est souvent [[agité|agitée]] sur le plan moteur et a du mal à rester [[assis|assise]] tranquillement.",
      "{N} présente une agitation motrice marquée ; rester [[assis|assise]] calmement pendant un certain temps lui est à peine possible."] },
    s_regeln: { q: 'Respecte les règles de classe et les accords.', t: [
      "{N} ne respecte pratiquement pas les règles de classe ni les accords convenus.",
      "{N} ne respecte les règles et les accords qu'avec beaucoup de soutien.",
      "{N} ne respecte les règles de classe que partiellement, bien que {il} les connaisse.",
      "Le plus souvent, {N} respecte les règles de classe et les accords.",
      "{N} respecte scrupuleusement les règles de classe et les accords."] },
    s_impuls: { q: 'Agit de manière impulsive, sans réfléchir.', np: "d'impulsivité", t: [
      null,
      "Des réactions impulsives restent exceptionnelles.",
      "Dans les moments d'excitation, {N} agit parfois de manière impulsive.",
      "{N} agit souvent de manière impulsive, sans mesurer les conséquences de ses actes.",
      "{N} agit très souvent de manière impulsive ; réfléchir avant d'agir reste très difficile pour {T}."] },
    s_frust: { q: 'Sait gérer la frustration et l’échec.', t: [
      "{N} ne parvient guère à gérer la frustration et l'échec : le moindre revers entraîne de vives réactions.",
      "Gérer la frustration et l'échec reste difficile pour {Nt}.",
      "Face à la frustration, {N} réagit de façon variable : {il} parvient parfois à surmonter un revers, parfois non.",
      "Face à la frustration et à l'échec, {N} réagit généralement de manière adaptée.",
      "{N} supporte bien la frustration et l'échec."] },
    s_wut: { q: 'Réagit par des crises de colère.', np: 'de crises de colère', t: [
      null,
      "Les crises de colère sont rares.",
      "Des crises de colère surviennent occasionnellement.",
      "{N} réagit régulièrement par des crises de colère, notamment face aux critiques ou aux limites posées.",
      "{N} présente des crises de colère violentes et répétées qui perturbent nettement le déroulement des cours."] },
    s_aggr: { q: 'Fait preuve d’agressivité verbale ou physique.', np: "d'agressivité", t: [
      null,
      "{N} ne se montre [[agressif|agressive]] que de façon isolée.",
      "En cas de conflit, {N} réagit à l'occasion de manière agressive, verbalement ou physiquement.",
      "{N} a fréquemment des réactions agressives envers les autres, verbales ou physiques.",
      "{N} manifeste une agressivité verbale et physique marquée envers les autres."] },
    s_verweig: { q: 'Refuse des tâches ou des consignes.', np: 'de refus face aux tâches', t: [
      null,
      "{N} ne refuse que rarement les tâches demandées.",
      "Il arrive que {N} refuse des tâches ou des consignes, en particulier lorsque les exigences sont élevées.",
      "{N} refuse à maintes reprises des tâches ou des consignes.",
      "{N} refuse très souvent les tâches et les consignes ; sa participation n'est généralement possible qu'avec un accompagnement étroit."] },
    s_rueckzug: { q: 'Se replie sur soi (silence, retrait).', np: 'de repli sur soi', t: [
      null,
      "Un repli sur soi ne s'observe qu'occasionnellement.",
      "{N} se replie de temps à autre sur [[lui|elle]]-même ; {il} paraît alors [[renfermé|renfermée]].",
      "{N} a tendance à se replier sur [[lui|elle]]-même ; {il} reste alors [[silencieux|silencieuse]] et [[renfermé|renfermée]].",
      "{N} se montre très [[replié|repliée]] sur [[lui|elle]]-même, sans guère prendre contact avec les autres de sa propre initiative."] },
    s_angst: { q: 'Montre de l’anxiété ou de la tension (p. ex. peur de l’échec).', np: "d'anxiété marquée", t: [
      null,
      "Des signes d'anxiété restent peu fréquents.",
      "Lors des évaluations, {N} paraît parfois [[tendu|tendue]] ou [[anxieux|anxieuse]].",
      "{N} paraît souvent [[anxieux|anxieuse]] et [[tendu|tendue]], en particulier face aux exigences scolaires.",
      "{N} se montre très [[anxieux|anxieuse]] et [[tendu|tendue]] ; la peur de l'échec marque nettement son quotidien scolaire."] },
    s_ausgeglichen: { q: 'Fait preuve d’un bon équilibre émotionnel.', t: [
      "Sur le plan émotionnel, {N} est très instable ; son humeur varie fortement.",
      "{N} paraît souvent instable sur le plan émotionnel.",
      "Sur le plan émotionnel, {N} paraît tantôt [[équilibré|équilibrée]], tantôt irritable selon les jours.",
      "{N} paraît globalement [[équilibré|équilibrée]] sur le plan émotionnel.",
      "{N} paraît [[équilibré|équilibrée]] et stable sur le plan émotionnel."] },
    s_peers: { q: 'Entretient de bons contacts avec ses camarades.', t: [
      "{N} n'a pratiquement pas de contacts avec ses camarades et paraît [[isolé|isolée]] au sein de la classe.",
      "{N} ne parvient que difficilement à nouer des contacts avec ses camarades.",
      "{N} n'est que partiellement [[intégré|intégrée]] dans le groupe classe, même si {il} entretient des contacts avec quelques camarades.",
      "{N} a de bons contacts avec la plupart de ses camarades.",
      "{N} est bien [[intégré|intégrée]] dans la classe et entretient des relations solides avec ses camarades."] },
    s_konflikt: { q: 'Entre souvent en conflit avec ses camarades.', np: 'de conflits fréquents avec les pairs', t: [
      null,
      "{N} n'entre que rarement en conflit avec ses camarades.",
      "{N} entre occasionnellement en conflit avec ses camarades.",
      "{N} entre souvent en conflit avec ses camarades.",
      "{N} entre très souvent en conflit avec ses camarades et ne parvient guère à résoudre ces conflits sans aide."] },
    s_erwachsene: { q: 'Entretient une relation de confiance avec le personnel enseignant.', t: [
      "La relation avec le personnel enseignant est fortement dégradée.",
      "La relation avec le personnel enseignant est tendue.",
      "La relation avec le personnel enseignant est fluctuante.",
      "{N} entretient dans l'ensemble une bonne relation avec le personnel enseignant.",
      "{N} entretient une relation de confiance avec le personnel enseignant."] },
    s_hilfe: { q: 'Accepte l’aide et le soutien.', t: [
      "{N} refuse le plus souvent l'aide et le soutien proposés.",
      "{N} n'accepte l'aide qu'avec hésitation.",
      "{N} n'accepte l'aide que partiellement, selon la situation et la personne.",
      "En général, {N} accepte volontiers l'aide et le soutien proposés.",
      "{N} accepte l'aide et le soutien de bon gré."] },
    s_selbstwert: { q: 'A confiance en soi et ose relever des défis.', t: [
      "{N} a très peu confiance en [[lui|elle]] ; son estime de soi semble nettement fragilisée.",
      "{N} a peu confiance en [[lui|elle]] et se montre plutôt [[hésitant|hésitante]].",
      "{N} fait preuve d'une confiance en soi fluctuante.",
      "{N} fait preuve d'une assez bonne confiance en soi.",
      "{N} paraît [[sûr|sûre]] de [[lui|elle]] et n'hésite pas à relever des défis."] },

    // ---------------- 3.3 Point de vue de l'élève ----------------
    k_offen: { q: 'Parle ouvertement de soi et de sa situation lors de l’entretien.', t: [
      "Lors de l'entretien{datum: du {datum}}, {N} s'est [[montré|montrée]] très [[fermé|fermée]] et n'a guère parlé de [[lui|elle]]-même ni de sa situation.",
      "Lors de l'entretien{datum: du {datum}}, {N} s'est [[montré|montrée]] plutôt [[réservé|réservée]].",
      "Lors de l'entretien{datum: du {datum}}, {N} s'est progressivement [[ouvert|ouverte]] après une certaine réserve.",
      "Lors de l'entretien{datum: du {datum}}, {N} s'est [[montré|montrée]] globalement [[ouvert|ouverte]].",
      "Lors de l'entretien{datum: du {datum}}, {N} s'est [[montré|montrée]] [[ouvert|ouverte]] et a parlé volontiers de sa situation et de [[lui|elle]]-même."] },
    k_wohl: { q: 'Se sent bien à l’école.', t: [
      "{N} dit ne pas se sentir bien à l'école et s'y rendre à contrecœur.",
      "{N} dit souvent ne pas se sentir bien à l'école.",
      "À l'école, {N} dit se sentir tantôt bien, tantôt mal.",
      "{N} indique se sentir bien à l'école la plupart du temps.",
      "{N} indique aller volontiers à l'école et s'y sentir bien."] },
    k_klasse: { q: 'Se sent à sa place dans la classe.', t: [
      "Dans sa classe, {N} ne se sent pas [[accepté|acceptée]].",
      "Dans sa classe, {N} se sent plutôt à l'écart.",
      "Dans sa classe, {N} ne se sent que partiellement à sa place.",
      "Dans sa classe, {N} se sent globalement [[accepté|acceptée]].",
      "Dans sa classe, {N} se sent [[accepté|acceptée]] et à sa place."] },
    k_lehrer: { q: 'S’entend bien avec le personnel enseignant.', t: [
      "{N} déclare ne pas s'entendre avec le personnel enseignant.",
      "{N} déclare avoir du mal à s'entendre avec le personnel enseignant.",
      "{N} s'entend bien avec certains membres du personnel enseignant, moins avec d'autres.",
      "Selon ses dires, {N} s'entend généralement bien avec le personnel enseignant.",
      "Selon ses dires, {N} s'entend bien avec le personnel enseignant."] },
    k_leistung: { q: 'Évalue positivement ses capacités scolaires.', t: [
      "{N} porte un regard très négatif sur ses capacités scolaires.",
      "{N} doute de ses capacités scolaires.",
      "{N} évalue ses capacités scolaires de manière contrastée : dans certaines matières, {il} a confiance en [[lui|elle]], dans d'autres beaucoup moins.",
      "{N} a une image plutôt positive de ses capacités scolaires.",
      "{N} porte un regard positif sur ses capacités scolaires."] },
    k_ungerecht: { q: 'Éprouve un sentiment d’injustice.', np: "d'un sentiment d'injustice", t: [
      null,
      "{N} n'éprouve que rarement un sentiment d'injustice.",
      "Il arrive que {N} se sente [[traité|traitée]] injustement.",
      "{N} a souvent le sentiment d'être [[traité|traitée]] injustement, notamment lors de conflits et de sanctions.",
      "{N} a très souvent le sentiment d'être [[traité|traitée]] injustement et perçoit ses propres difficultés avant tout comme une réaction au comportement des autres."] },
    k_selbstwert: { q: 'Parle de soi de manière positive.', t: [
      "{N} parle de [[lui|elle]]-même de manière très dévalorisante.",
      "En parlant de [[lui|elle]]-même, {N} se dévalorise plutôt.",
      "{N} parle de [[lui|elle]]-même tantôt de manière positive, tantôt de manière dévalorisante.",
      "{N} parle de [[lui|elle]]-même plutôt positivement.",
      "{N} parle de [[lui|elle]]-même de manière positive et sait nommer ses points forts."] },
    k_druck: { q: 'Exprime une souffrance (tristesse, surcharge, sentiment de ne plus y arriver).', np: "d'une souffrance importante", t: [
      null,
      "{N} ne décrit guère de souffrance.",
      "{N} décrit une certaine souffrance.",
      "{N} décrit une souffrance marquée et se sent souvent [[accablé|accablée]].",
      "{N} décrit une souffrance importante ; {il} se sent très [[accablé|accablée]] et triste."] },
    k_angst: { q: 'Fait part de peurs ou d’inquiétudes.', np: "de peurs ou d'inquiétudes", t: [
      null,
      "{N} ne mentionne guère de peurs ni d'inquiétudes.",
      "{N} fait part de quelques peurs et inquiétudes.",
      "{N} fait état de peurs et d'inquiétudes récurrentes.",
      "{N} fait part de peurs et d'inquiétudes intenses qui {le} préoccupent beaucoup."] },
    k_einsicht: { q: 'Reconnaît ses propres difficultés (conscience du problème).', t: [
      "{N} ne montre aucune conscience de ses propres difficultés.",
      "{N} ne reconnaît ses propres difficultés que de manière très limitée.",
      "{N} ne perçoit ses difficultés qu'en partie.",
      "{N} parvient dans une large mesure à nommer ses propres difficultés.",
      "{N} sait nommer clairement ses propres difficultés et y réfléchir."] },
    k_veraenderung: { q: 'Souhaite un changement et accepte de l’aide.', t: [
      "{N} n'exprime aucun souhait de changement et refuse toute aide.",
      "{N} ne formule guère le souhait que les choses changent.",
      "{N} ne se montre que partiellement [[ouvert|ouverte]] à l'aide proposée.",
      "{N} souhaite que les choses changent et se montre globalement [[ouvert|ouverte]] à l'aide.",
      "{N} exprime clairement le souhait que les choses changent et se montre [[ouvert|ouverte]] à l'aide."] },
    k_freunde: { q: 'A des amis.', t: [
      "{N} dit ne pas avoir d'amis.",
      "{N} dit n'avoir guère d'amis.",
      "{N} mentionne quelques amis.",
      "D'après ses dires, {N} a plusieurs amis.",
      "{N} fait état de plusieurs amitiés solides."] },
    k_familie: { q: 'Décrit positivement la relation avec sa famille.', t: [
      "{N} décrit la relation avec sa famille comme très tendue.",
      "{N} décrit la relation avec sa famille comme difficile.",
      "{N} décrit la relation avec sa famille comme fluctuante, entre moments sereins et tensions.",
      "{N} décrit la relation avec sa famille comme plutôt positive.",
      "{N} décrit la relation avec sa famille comme positive et soutenante."] },

    // ---------------- 3.4 Point de vue des parents ----------------
    e_alltag: { q: 'Se débrouille bien au quotidien à la maison.', t: [
      "Le quotidien à la maison est marqué par des difficultés permanentes.",
      "Le quotidien familial est fréquemment marqué par des difficultés.",
      "Au quotidien, la vie familiale alterne entre des périodes calmes et des situations difficiles.",
      "À la maison, {N} se débrouille plutôt bien au quotidien.",
      "À la maison, {N} se débrouille bien au quotidien."] },
    e_regeln: { q: 'Respecte les règles et les accords à la maison.', t: [
      "{N} ne respecte pratiquement pas les règles et les accords familiaux.",
      "{N} ne respecte que rarement les règles et les accords familiaux.",
      "{N} ne respecte que partiellement les règles et les accords familiaux.",
      "La plupart du temps, {N} respecte les règles et les accords familiaux.",
      "{N} respecte de manière fiable les règles et les accords familiaux."] },
    e_wut: { q: 'Fait des crises de colère à la maison.', np: 'de crises de colère', t: [
      null,
      "Les crises de colère restent rares.",
      "Il arrive que des crises de colère éclatent.",
      "Des crises de colère surviennent fréquemment, en particulier lorsque des limites sont posées.",
      "De violentes crises de colère surviennent très fréquemment et pèsent lourdement sur le quotidien familial."] },
    e_geschwister: { q: 'Entre souvent en conflit avec ses frères et sœurs.', np: 'de conflits dans la fratrie', t: [
      null,
      "Les conflits dans la fratrie sont peu fréquents.",
      "Des disputes éclatent de temps en temps dans la fratrie.",
      "Les disputes dans la fratrie sont nombreuses.",
      "De violents conflits éclatent très fréquemment dans la fratrie."] },
    e_rueckzug: { q: 'Se replie sur soi à la maison.', np: 'de repli sur soi', t: [
      null,
      "{N} ne se replie que rarement sur [[lui|elle]]-même.",
      "{N} se replie par moments sur [[lui|elle]]-même.",
      "{N} se retire souvent dans sa chambre.",
      "{N} se replie fortement sur [[lui|elle]]-même, au point d'être peu accessible pour sa famille."] },
    e_angst: { q: 'Montre des peurs ou des inquiétudes à la maison.', np: "d'anxiété", t: [
      null,
      "{N} ne manifeste guère de peurs.",
      "{N} exprime à l'occasion des peurs ou des inquiétudes.",
      "{N} exprime régulièrement des peurs et des inquiétudes.",
      "{N} manifeste des peurs importantes qui limitent nettement son quotidien."] },
    e_koerper: { q: 'A des troubles du sommeil ou des plaintes physiques (p. ex. maux de ventre).', np: 'de plaintes psychosomatiques', t: [
      null,
      "Les troubles du sommeil ou les plaintes physiques restent l'exception.",
      "Des troubles du sommeil ou des plaintes physiques apparaissent par périodes.",
      "{N} a des troubles du sommeil à répétition ou se plaint de maux physiques, tels que des maux de ventre ou de tête.",
      "{N} présente des troubles du sommeil marqués et se plaint très souvent de maux physiques."] },
    e_medien: { q: 'Passe beaucoup de temps devant les écrans.', np: "d'une utilisation problématique des écrans", t: [
      null,
      "Selon {Q}, le temps passé devant les écrans reste raisonnable.",
      "{N} passe parfois beaucoup de temps devant les écrans.",
      "{N} passe beaucoup de temps devant les écrans ; toute limite posée déclenche facilement des conflits.",
      "{N} passe énormément de temps devant les écrans ; leur utilisation est difficile à limiter."] },
    e_hausaufgaben: { q: 'Les devoirs sont source de conflits.', np: 'de conflits autour des devoirs', t: [
      null,
      "Les devoirs ne donnent que rarement lieu à des conflits.",
      "Les devoirs sont parfois source de conflits.",
      "Les devoirs provoquent des tensions plusieurs fois par semaine.",
      "Les devoirs donnent lieu à de vifs conflits presque tous les jours."] },
    e_beziehung: { q: 'La relation avec l’enfant est décrite comme bonne.', t: [
      "{Q} {{décrit|décrivent}} la relation avec {Nt} comme très éprouvante.",
      "{Q} {{décrit|décrivent}} la relation avec {Nt} comme tendue.",
      "{Q} {{décrit|décrivent}} la relation avec {Nt} comme ambivalente.",
      "Selon {Q}, la relation avec {Nt} est globalement bonne.",
      "{Q} {{décrit|décrivent}} la relation avec {Nt} comme affectueuse et solide."] },
    e_struktur: { q: 'Le quotidien familial est clairement structuré.', t: [
      "Le quotidien familial manque largement de structures et de routines stables.",
      "Le quotidien familial est peu structuré.",
      "Le quotidien familial n'est que partiellement structuré.",
      "Le quotidien familial est dans l'ensemble bien structuré.",
      "Le quotidien familial est clairement structuré et rythmé par des routines fiables."] },
    e_konsequenz: { q: 'L’éducation est claire et cohérente.', t: [
      "Poser un cadre éducatif clair et cohérent s'avère très difficile ; {Q} {{semble|semblent}} rapidement à court de moyens.",
      "L'application cohérente des règles s'avère difficile.",
      "Les règles ne sont appliquées de manière cohérente que partiellement.",
      "L'éducation est le plus souvent claire et cohérente.",
      "Le cadre éducatif posé par {Qd} est clair et cohérent."] },
    e_belastung: { q: 'Les parents se sentent très éprouvés par la situation.', np: "d'une charge particulière pour la famille", t: [
      null,
      "{Q} ne {{fait|font}} guère état d'une charge particulière liée à la situation.",
      "{Q} {{vit|vivent}} la situation comme éprouvante par moments.",
      "La situation pèse lourdement sur {Qd}.",
      "La situation pèse très lourdement sur {Qd}, qui {{se dit|se disent}} à bout de forces."] },
    e_sicht_schule: { q: 'Les parents partagent l’évaluation de l’école.', t: [
      "L'évaluation de l'école n'est pas partagée par {Qd}.",
      "L'évaluation de l'école ne rejoint guère celle {Qg}.",
      "L'évaluation de l'école ne rejoint que partiellement celle {Qg}.",
      "L'évaluation de l'école rejoint largement celle {Qg}.",
      "L'évaluation de l'école rejoint pleinement celle {Qg}."] },
    e_kooperation: { q: 'Les parents sont disposés à collaborer.', t: [
      "{Q} {{refuse|refusent}} actuellement toute collaboration.",
      "{Q} {{fait|font}} preuve de réserve à l'égard d'une collaboration.",
      "{Q} {{accepte|acceptent}} en principe de collaborer, tout en exprimant encore des réserves.",
      "{Q} {{se montre favorable|se montrent favorables}} à une collaboration.",
      "{Q} {{se montre très favorable|se montrent très favorables}} à une collaboration et s'y {{investit|investissent}} activement."] },

    // ---------------- 4.1 Observations comportementales (passé composé / imparfait) ----------------
    b_start: { q: 'A commencé les tâches de manière autonome.', t: [
      "{N} n'a commencé les tâches qu'après plusieurs sollicitations.",
      "{N} a le plus souvent attendu d'y être [[invité|invitée]] pour commencer les tâches.",
      "{N} a commencé les tâches tantôt de manière autonome, tantôt seulement après y avoir été [[invité|invitée]].",
      "La plupart du temps, {N} a commencé les tâches de manière autonome.",
      "{N} s'est [[mis|mise]] au travail rapidement et sans aide."] },
    b_konz: { q: 'A travaillé de manière concentrée et persévérante.', t: [
      "Un travail concentré n'a guère été possible : {N} interrompait les tâches au bout de quelques instants.",
      "{N} n'est [[resté|restée]] [[concentré|concentrée]] que peu de temps.",
      "L'attention a nettement fluctué : des phases de travail concentré alternaient avec des phases de distraction.",
      "{N} a travaillé de manière plutôt concentrée.",
      "{N} a travaillé de manière concentrée et persévérante."] },
    b_anweisung: { q: 'A suivi les consignes données.', t: [
      "{N} n'a guère suivi les consignes données.",
      "{N} n'a souvent suivi les consignes qu'après répétition.",
      "{N} a suivi les consignes de manière irrégulière.",
      "{N} a suivi les consignes dans la plupart des cas.",
      "{N} a suivi les consignes avec constance."] },
    b_hilfe: { q: 'A demandé de l’aide en cas de besoin.', t: [
      "Face aux difficultés, {N} n'a pas demandé d'aide.",
      "Face aux difficultés, {N} a rarement demandé de l'aide.",
      "{N} n'a demandé de l'aide qu'occasionnellement.",
      "Face aux difficultés, {N} a généralement sollicité de l'aide de manière appropriée.",
      "Face aux difficultés, {N} a sollicité de l'aide de manière appropriée."] },
    b_unruhe: { q: 'A présenté une agitation motrice.', np: "d'agitation motrice", t: [
      null,
      "Une agitation motrice n'est apparue que ponctuellement.",
      "{N} était par moments [[agité|agitée]] sur le plan moteur.",
      "{N} était souvent [[agité|agitée]] et a quitté sa place à plusieurs reprises.",
      "{N} présentait une agitation motrice marquée ; rester [[assis|assise]] calmement ne lui était guère possible."] },
    b_ablenk: { q: 'S’est laissé facilement distraire.', np: "d'une distractibilité accrue", t: [
      null,
      "{N} n'a été [[distrait|distraite]] que rarement.",
      "À certains moments, {N} s'est [[montré|montrée]] [[distrait|distraite]].",
      "{N} a souvent été [[distrait|distraite]] par des bruits ou par ses camarades.",
      "Le moindre stimulus suffisait à détourner son attention."] },
    b_regeln: { q: 'A respecté les règles de classe.', t: [
      "{N} n'a guère respecté les règles de classe.",
      "{N} n'a que rarement respecté les règles de classe.",
      "{N} n'a respecté les règles de classe que partiellement.",
      "{N} a respecté les règles de classe dans l'ensemble.",
      "{N} a respecté les règles de classe de manière fiable."] },
    b_frust: { q: 'A géré les difficultés ou la frustration de manière adaptée.', t: [
      "[[Confronté|Confrontée]] à des difficultés, {N} a réagi vivement, par exemple en abandonnant la tâche ou en manifestant de la colère.",
      "{N} a eu du mal à gérer les difficultés de manière adaptée.",
      "{N} a géré les difficultés de façon inégale.",
      "{N} a le plus souvent géré les difficultés de manière adaptée.",
      "{N} a géré les difficultés et la frustration de manière adaptée."] },
    b_uebergang: { q: 'A géré les transitions et les changements sans difficulté.', t: [
      "Les transitions et les changements ont été très difficiles pour {Nt}.",
      "Les transitions et les changements ont été difficiles pour {Nt}.",
      "{N} a géré les transitions et les changements avec plus ou moins de facilité.",
      "{N} a géré les transitions et les changements sans grande difficulté.",
      "{N} a géré les transitions et les changements sans difficulté."] },
    b_lob: { q: 'A réagi positivement aux éloges et à l’attention.', t: [
      "Les éloges et l'attention n'ont guère suscité de réaction chez {Nt}.",
      "{N} a réagi aux éloges avec une certaine réserve.",
      "Les éloges ont suscité des réactions variables chez {Nt}.",
      "{N} a réagi aux éloges et à l'attention de manière globalement positive.",
      "{N} a réagi de manière visiblement positive aux éloges et à l'attention."] },
    b_stoer: { q: 'A perturbé le cours.', np: 'de perturbations du cours', t: [
      null,
      "{N} n'a perturbé le cours qu'à de rares occasions.",
      "À quelques reprises, {N} a perturbé le cours.",
      "{N} a perturbé le cours à plusieurs reprises, par exemple par des interventions intempestives ou des bavardages.",
      "{N} a perturbé le cours fréquemment et de manière marquée."] },
    b_peers: { q: 'A recherché et entretenu des contacts positifs avec ses camarades.', t: [
      "{N} n'a pas cherché à entrer en relation avec ses camarades.",
      "{N} n'a guère cherché le contact avec ses camarades.",
      "{N} n'a pris contact avec ses camarades qu'occasionnellement.",
      "Avec ses camarades, {N} a eu des échanges majoritairement positifs.",
      "{N} a recherché et entretenu des contacts positifs avec ses camarades."] },
    b_erwachsene: { q: 'A pris contact avec les adultes de manière adaptée.', t: [
      "{N} a largement évité le contact avec les adultes.",
      "{N} ne s'est [[approché|approchée]] des adultes qu'avec hésitation.",
      "{N} a adopté envers les adultes une attitude tantôt adaptée, tantôt trop familière ou au contraire évitante.",
      "{N} est [[entré|entrée]] en contact avec les adultes de manière plutôt adaptée.",
      "{N} a pris contact avec les adultes de manière adaptée et ouverte."] },
    b_isol: { q: 'A eu tendance à s’isoler ou à rester à l’écart.', np: 'de repli sur soi', t: [
      null,
      "{N} ne s'est [[isolé|isolée]] que rarement.",
      "{N} est [[resté|restée]] à l'écart de temps à autre.",
      "{N} s'est souvent [[retiré|retirée]] et est [[resté|restée]] à l'écart.",
      "{N} est [[resté|restée]] presque constamment à l'écart et a évité les échanges avec les autres."] },
    b_provo: { q: 'A provoqué les autres ou réagi de manière agressive.', np: 'de comportements provocateurs', t: [
      null,
      "Des comportements provocateurs sont restés exceptionnels.",
      "{N} a ponctuellement provoqué ses camarades.",
      "{N} a provoqué ses camarades à plusieurs reprises ou a réagi de manière agressive.",
      "{N} a fréquemment provoqué les autres et a réagi à plusieurs reprises de manière verbalement ou physiquement agressive."] },

    // ---------------- 4.3 Interprétations ----------------
    i_uebereinstimmung: { q: 'Les points de vue de l’école, des parents et de l’élève concordent.', t: [
      "Les points de vue de l'école, des parents et de {Name} [[lui|elle]]-même divergent nettement.",
      "Les points de vue de l'école, des parents et de {Name} [[lui|elle]]-même ne concordent que sur certains points.",
      "Les points de vue de l'école, des parents et de {Name} [[lui|elle]]-même concordent en partie.",
      "Les points de vue de l'école, des parents et de {Name} [[lui|elle]]-même concordent largement.",
      "Les points de vue de l'école, des parents et de {Name} [[lui|elle]]-même concordent sur les points essentiels."] },
    i_beobachtung: { q: 'Les observations réalisées confirment les informations recueillies.', t: [
      "Les observations réalisées ne confirment pas les informations recueillies.",
      "Les observations réalisées ne confirment les informations recueillies que sur quelques points.",
      "Les observations réalisées confirment en partie les informations recueillies.",
      "Les observations réalisées confirment largement les informations recueillies.",
      "Les observations réalisées confirment les informations recueillies."] },
    i_eldib: { q: 'Le profil ELDiB correspond à l’impression clinique.', t: [
      "Le profil ELDiB s'écarte sensiblement de l'impression clinique.",
      "Le profil ELDiB ne rejoint l'impression clinique que sur certains points.",
      "Le profil ELDiB correspond en partie à l'impression clinique.",
      "Le profil ELDiB correspond largement à l'impression clinique.",
      "Le profil ELDiB correspond à l'impression clinique."] },
    i_unstrukturiert: { q: 'Les difficultés apparaissent surtout dans les situations peu structurées (récréation, transitions, travail libre).', m: 'dans les situations peu structurées (notamment les récréations et les transitions)', t: [
      null, null,
      "Une partie des difficultés survient dans des situations peu structurées.",
      "Les difficultés apparaissent souvent dans des situations peu structurées, par exemple pendant les récréations ou lors des transitions.",
      "Les difficultés apparaissent surtout dans des situations peu structurées, telles que les récréations, les transitions ou les phases de travail libre."] },
    i_anforderung: { q: 'Les difficultés apparaissent surtout face aux exigences de performance.', m: 'face aux exigences de performance', t: [
      null, null,
      "Les exigences de performance contribuent en partie aux difficultés.",
      "Les difficultés apparaissent souvent face aux exigences de performance.",
      "Les difficultés apparaissent surtout face aux exigences de performance."] },
    i_beziehung: { q: 'Les difficultés apparaissent surtout dans les situations relationnelles (proximité, rivalité, limites).', m: 'dans les situations relationnelles (notamment en cas de proximité, de rivalité ou de limites posées)', t: [
      null, null,
      "Certaines difficultés apparaissent dans des situations relationnelles.",
      "Les difficultés apparaissent souvent dans des situations relationnelles, par exemple en cas de rivalité ou lorsque des limites sont posées.",
      "Les difficultés apparaissent surtout dans des situations relationnelles, notamment en cas de proximité, de rivalité ou lorsque des limites sont posées."] },
    i_einzel: { q: 'En situation individuelle avec un adulte, l’élève réussit nettement mieux.', t: [
      null, null,
      "En situation individuelle, {N} réussit parfois mieux qu'en groupe.",
      "En situation individuelle avec un adulte, {N} réussit mieux qu'en groupe.",
      "En situation individuelle avec un adulte, {N} réussit nettement mieux qu'en groupe."] },
    i_schule: { q: 'Les difficultés apparaissent surtout à l’école.', t: [
      null, null,
      "À l'école, les difficultés se manifestent un peu plus qu'à la maison.",
      "Les difficultés se manifestent davantage à l'école qu'à la maison.",
      "C'est avant tout dans le contexte scolaire que les difficultés se manifestent."] },
    i_zuhause: { q: 'Les difficultés apparaissent surtout à la maison.', t: [
      null, null,
      "À la maison, les difficultés se manifestent un peu plus qu'à l'école.",
      "À la maison, les difficultés sont plus marquées qu'à l'école.",
      "C'est avant tout dans le contexte familial que les difficultés se manifestent."] },
    // Peurs liées au développement (thérapie développementale selon Wood / ETEP)
    i_angst_verlassen: { q: 'Peur de l’abandon (niveau I)', np: "d'une peur de l'abandon (niveau I)",
      e: "{N} paraît fortement [[dépendant|dépendante]] de la disponibilité d'adultes familiers et réagit aux séparations ou aux changements par une insécurité marquée." },
    i_angst_unzul: { q: 'Peur de l’insuffisance, de l’échec (niveau II)', np: "d'une peur de l'échec (niveau II)",
      e: "{N} tend à percevoir rapidement les exigences comme une surcharge et craint de ne pas répondre aux attentes." },
    i_angst_schuld: { q: 'Peur liée à la culpabilité (niveau III)', np: "d'une peur liée à la culpabilité (niveau III)",
      e: "{N} associe vraisemblablement les erreurs et les transgressions à un fort sentiment de culpabilité et s'attend rapidement à être [[rejeté|rejetée]]." },
    i_angst_konflikt: { q: 'Peur du conflit (niveau IV)', np: "d'une peur du conflit (niveau IV)",
      e: "Dans les confrontations avec ses pairs comme avec les adultes, {N} paraît se sentir rapidement sous pression et tend soit à éviter les conflits, soit à les envenimer." },
    i_angst_identitaet: { q: 'Peur liée à l’identité (niveau V)', np: "d'une peur liée à l'identité (niveau V)",
      e: "Les questions liées à son rôle, à son appartenance et à son autonomie paraissent très présentes chez {Nt}." },
    // Mécanismes de défense: np mit Artikel ("on observe surtout …", "par …")
    i_abw_rueckzug: { q: 'Repli sur soi', np: 'le repli sur soi' },
    i_abw_vermeidung: { q: 'Évitement, refus', np: "l'évitement" },
    i_abw_aggression: { q: 'Agressivité, attaque', np: 'une contre-attaque agressive' },
    i_abw_regression: { q: 'Régression (comportements de petit enfant)', np: 'des comportements régressifs' },
    i_abw_clown: { q: 'Pitreries, diversion', np: 'les pitreries' },
    i_abw_kontrolle: { q: 'Contrôle excessif, perfectionnisme', np: 'une maîtrise de soi excessive' },
    i_abw_projektion: { q: 'Projection, attribution de la faute aux autres', np: "l'attribution de la faute aux autres" },
    i_abw_verleugnung: { q: 'Déni, minimisation', np: 'la minimisation' },
    // Pistes d'explication: n = ohne Präposition, g = mit "de/d'" (nach "l'expression")
    i_hyp_entwicklung: { q: 'Retard du développement socio-émotionnel', n: 'un retard du développement socio-émotionnel', g: "d'un retard du développement socio-émotionnel" },
    i_hyp_regulation: { q: 'Difficultés de régulation émotionnelle', n: 'une capacité limitée de régulation émotionnelle', g: "d'une capacité limitée de régulation émotionnelle" },
    i_hyp_belastung: { q: 'Réaction à des difficultés familiales ou scolaires actuelles', pl: true, n: 'des facteurs de stress familiaux ou scolaires actuels', g: 'de facteurs de stress familiaux ou scolaires actuels' },
    i_hyp_bindung: { q: 'Insécurité de l’attachement', n: 'un attachement insécure', g: "d'un attachement insécure" },
    i_hyp_sozial: { q: 'Insécurité sociale', n: 'une insécurité dans les relations sociales', g: "d'une insécurité dans les relations sociales" },
    i_hyp_aufmerksamkeit: { q: 'Problématique attentionnelle', n: 'une problématique attentionnelle', g: "d'une problématique attentionnelle" },
    i_hyp_ueberforderung: { q: 'Surcharge scolaire (exigences trop élevées)', n: 'une surcharge liée aux exigences scolaires', g: "d'une surcharge liée aux exigences scolaires" },
    i_hyp_unterforderung: { q: 'Manque de stimulation scolaire (exigences trop faibles)', n: 'un manque de stimulation scolaire', g: "d'un manque de stimulation scolaire" },
    i_hyp_trauma: { q: 'Conséquences possibles d’expériences éprouvantes (à approfondir)' },

    // ---------------- 5.1 Besoins: a und d beide mit "de/d'" ----------------
    n_struktur: { q: 'Des structures claires et un déroulement prévisible', a: 'de structures claires et de routines prévisibles', d: 'de structures claires et de routines prévisibles' },
    n_beziehung: { q: 'Une personne de référence fiable et stable', a: "d'une personne de référence fiable et stable", d: "d'une personne de référence fiable et stable" },
    n_erfolg: { q: 'Des expériences de réussite et des retours positifs', a: "d'expériences de réussite et de retours positifs", d: "d'expériences de réussite et de retours positifs" },
    n_regulation: { q: 'Un soutien dans la régulation des émotions', a: "d'un soutien dans la régulation de ses émotions", d: "d'un soutien dans la régulation de ses émotions" },
    n_grenzen: { q: 'Des limites claires et des retours cohérents', a: 'de limites claires et de retours cohérents', d: 'de limites claires et de retours cohérents' },
    n_sozial: { q: 'Le développement des compétences sociales', a: "d'un renforcement ciblé de ses compétences sociales", d: "d'un renforcement ciblé de ses compétences sociales" },
    n_organisation: { q: 'Des aides pour l’attention et l’organisation du travail', a: "d'aides pour structurer son attention et l'organisation de son travail", d: "d'aides pour structurer son attention et l'organisation de son travail" },
    n_differenzierung: { q: 'Des exigences adaptées (différenciation)', a: "d'exigences adaptées à ses possibilités", d: "d'exigences adaptées à ses possibilités" },
    n_therapie: { q: 'Un accompagnement thérapeutique', a: "d'un accompagnement thérapeutique", d: "d'un accompagnement thérapeutique" },
    n_familie: { q: 'Un soutien de la famille', a: "d'un soutien apporté à sa famille", d: "d'un soutien apporté à sa famille" }
  },

  // Auswahlfelder: [Beschriftung (Oberfläche), Form im Bericht]
  chips: {
    s_staerken: { hilfsbereit: ['serviabilité', 'sa serviabilité'], kreativ: ['créativité', 'sa créativité'], humorvoll: ['humour', "son sens de l'humour"], sportlich: ['aptitudes sportives', 'ses aptitudes sportives'], sprachlich: ['aisance langagière', 'ses compétences langagières'], mathematisch: ['mathématiques', 'ses compétences en mathématiques'], technisch: ['intérêt technique', 'son intérêt pour la technique'], musikalisch: ['sens musical', 'son sens musical'], fantasievoll: ['imagination', 'son imagination'], wissbegierig: ['curiosité', 'sa curiosité intellectuelle'], freundlich: ['gentillesse', 'sa gentillesse'], zuverlaessig: ['fiabilité', 'sa fiabilité'] },
    s_hilft: { ansagen: ['consignes courtes et claires', 'des consignes courtes et claires'], wiederholung: ['répétitions', 'des répétitions'], visualisierung: ['supports visuels', 'des supports visuels'], bewegung: ['pauses actives', 'des pauses de mouvement'], rueckzugsort: ['espace de retrait', 'un espace de retrait'], einzelansprache: ['consignes individuelles', 'des consignes données individuellement'], lob: ['éloges, renforcement', 'des éloges et un renforcement positif'], vorwarnung: ['annonce des changements', "l'annonce anticipée des changements"], kleingruppe: ['petit groupe', 'le travail en petit groupe'], naehe: ['proximité de l’adulte', "la proximité de l'adulte"], struktur: ['routines fixes', 'des routines et une structure stables'] },
    s_erwartung: { strategien: ['stratégies pour la classe', 'des stratégies concrètes pour la classe'], verhalten: ['meilleur comportement', 'une amélioration du comportement'], konzentration: ['meilleure concentration', 'une meilleure concentration'], integration: ['intégration sociale', 'une meilleure intégration sociale'], stabilitaet: ['stabilité émotionnelle', 'davantage de stabilité émotionnelle'], leistung: ['meilleurs résultats', 'de meilleurs résultats scolaires'], therapie: ['aide thérapeutique', 'un soutien thérapeutique externe'], eltern: ['collaboration avec les parents', 'une collaboration plus étroite avec les parents'], foerderort: ['autre lieu de scolarisation', "l'examen d'un autre lieu de scolarisation"], abklaerung: ['bilan diagnostique', 'un bilan diagnostique'] },
    k_interessen: { sport: ['sport', 'faire du sport'], gaming: ['jeux vidéo', 'jouer aux jeux vidéo'], musik: ['musique', 'écouter ou faire de la musique'], lesen: ['lecture', 'lire'], kreatives: ['dessin, bricolage', 'dessiner et bricoler'], freunde: ['voir des amis', 'passer du temps avec ses amis'], tiere: ['animaux', "s'occuper d'animaux"], natur: ['nature', 'passer du temps dans la nature'], technik: ['technique', 'explorer des sujets techniques'], kochen: ['cuisine, pâtisserie', 'cuisiner et faire des gâteaux'] },
    k_wuensche: { noten: ['meilleures notes', 'de meilleures notes'], freunde: ['plus d’amis', "davantage d'amis"], streit: ['moins de disputes', 'moins de disputes'], ruhe: ['calme à la maison', 'plus de calme à la maison'], druck: ['moins de pression', 'moins de pression'], verstanden: ['être compris', 'davantage de compréhension'], hilfe: ['recevoir de l’aide', "de l'aide"], klasse: ['autre classe', 'un changement de classe'], schule: ['autre école', "un changement d'école"], inruhe: ['être laissé tranquille', 'plus de moments de tranquillité'] },
    e_staerken: { hilfsbereit: ['serviabilité', 'sa serviabilité'], liebevoll: ['affection', 'son affection pour sa famille'], selbststaendig: ['autonomie', 'son autonomie'], kreativ: ['créativité', 'sa créativité'], humorvoll: ['humour', "son sens de l'humour"], sportlich: ['sport', 'son goût pour le sport'], verantwortung: ['sens des responsabilités', 'son sens des responsabilités'], offen: ['ouverture', 'son ouverture'] },
    e_erwartung: { verhalten: ['meilleur comportement', 'une amélioration du comportement'], entspannung: ['apaisement à la maison', 'un apaisement de la situation à la maison'], strategien: ['stratégies éducatives', 'des stratégies éducatives concrètes'], leistung: ['meilleurs résultats', 'de meilleurs résultats scolaires'], abklaerung: ['bilan diagnostique', 'un bilan diagnostique'], therapie: ['thérapie pour l’enfant', 'un soutien thérapeutique pour {Nt}'], beratung: ['conseils pour les parents', 'un soutien et des conseils pour la famille'], foerderort: ['autre lieu de scolarisation', "l'examen d'un autre lieu de scolarisation"], verstehen: ['comprendre l’enfant', 'une meilleure compréhension de ce qui se joue chez {Nt}'], bestaetigung: ['repères, soutien', 'des repères et du soutien'] },
    ressourcen: { kognitiv: ['capacités cognitives', 'son bon potentiel cognitif'], kreativ: ['créativité', 'sa créativité'], sportlich: ['sport', 'ses aptitudes sportives'], musisch: ['arts, musique', 'sa sensibilité artistique et musicale'], humor: ['humour', "son sens de l'humour"], empathie: ['empathie', 'son empathie'], neugier: ['curiosité', "sa curiosité et son envie d'apprendre"], begeisterung: ['enthousiasme', 'son enthousiasme'], hilfsbereit: ['serviabilité', 'sa serviabilité'], verantwortung: ['prend des responsabilités', 'son sens des responsabilités'], einzelbeziehung: ['relation individuelle', 'son aisance dans la relation individuelle'], lernbereit: ['volonté d’apprendre', "sa volonté d'apprendre"], vertrauensperson: ['personne de confiance', "une personne de confiance à l'école"], familie: ['famille soutenante', 'une famille soutenante'], hobbys: ['loisirs', "des loisirs et centres d'intérêt stables"], reflexion: ['capacité de réflexion', 'sa capacité de réflexion'] },
    // Faits
    anlass: { verhalten_schule: ['comportement à l’école', "des troubles du comportement à l'école"], verhalten_zuhause: ['comportement à la maison', 'des troubles du comportement à la maison'], emotional: ['difficultés émotionnelles', 'des difficultés émotionnelles'], sozial: ['difficultés sociales', 'des difficultés dans les relations sociales'], leistung: ['résultats scolaires', "des difficultés d'apprentissage"], aufmerksamkeit: ['attention', "des difficultés d'attention et de concentration"], aggression: ['agressivité', 'un comportement agressif'], rueckzug: ['repli sur soi', 'un repli sur soi'], aengste: ['peurs, angoisses', 'des peurs importantes'], schulverweigerung: ['refus scolaire', 'un refus scolaire ou un absentéisme'] },
    anliegen: { isa: ['ISA', "la mise en place d'une Intervention spécialisée ambulatoire (ISA)"], conseil: ['Conseil & Guidance', 'un accompagnement de type Conseil & Guidance'], cst: ['CST', 'une admission au Centre socio-thérapeutique (CST)'], clapa: ['Classe de Participation', 'une admission en Classe de Participation'], annexe: ['Annexe Junglinster', "une admission à l'Annexe Junglinster"], lernwerkstatt: ['Atelier d’apprentissage spécifique', "une participation à l'Atelier d'apprentissage spécifique"], beschulung: ['scolarisation spécialisée', 'une scolarisation spécialisée au CDSE'], diagnostik: ['diagnostic', "la réalisation d'un bilan diagnostique approfondi"] },
    empfohlen: { lehrperson: ['enseignant·e', "de l'enseignant·e"], eseb: ['ESEB', "de l'ESEB"], schulleitung: ['direction de l’école', "de la direction de l'école"], arzt: ['médecin', 'du médecin traitant'], psychologe: ['psychologue', 'du ou de la psychologue'], eltern: ['souhait des parents', ''] },
    diagnosen: { adhs: ['TDAH/TDA', 'TDAH'], ass: ['trouble du spectre de l’autisme', "trouble du spectre de l'autisme"], lernstoerung: ['trouble des apprentissages', 'trouble spécifique des apprentissages'], sprachstoerung: ['trouble du langage', 'trouble du développement du langage'], emotional: ['trouble émotionnel', 'trouble émotionnel'], bindung: ['trouble de l’attachement', "trouble de l'attachement"], angst: ['trouble anxieux', 'trouble anxieux'], opposition: ['trouble oppositionnel', 'trouble oppositionnel avec provocation'], andere: ['autre', ''] },
    ereignisse: { trennung: ['séparation des parents', 'la séparation des parents'], umzug: ['déménagement', 'un déménagement'], verlust: ['perte d’un proche', "la perte d'un proche"], krankheit: ['maladie dans la famille', 'une maladie dans la famille'], konflikte: ['conflits familiaux', 'des conflits familiaux'], trauma: ['expérience éprouvante', 'une expérience éprouvante'], migration: ['migration', 'un parcours migratoire'] },
    betreuung: { maison_relais: ['maison relais', ''], grosseltern: ['grands-parents', ''], tagesmutter: ['assistant·e parental·e', ''], keine: ['aucun', ''] },
    sprachen: { lb: ['luxembourgeois', 'luxembourgeois'], de: ['allemand', 'allemand'], fr: ['français', 'français'], pt: ['portugais', 'portugais'], en: ['anglais', 'anglais'], it: ['italien', 'italien'], es: ['espagnol', 'espagnol'], andere: ['autre', ''] },
    verfahren: { eldib: ['ELDiB', "l'ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen)"], beobachtung: ['observation', ''], gespraeche: ['entretiens', ''], sdq: ['SDQ', 'le questionnaire SDQ (Strengths and Difficulties Questionnaire)'], wisc: ['WISC-V', 'le WISC-V'], andere: ['autre', ''] },
    empf_familie: { step: ['programme STEP (CDSE)', 'Participation au programme de soutien à la parentalité STEP au CDSE'], erziehungsberatung: ['guidance parentale', "Guidance parentale visant à renforcer l'assurance éducative des parents"], familientherapie: ['thérapie familiale', 'Accompagnement en thérapie familiale'], tagesstruktur: ['structure du quotidien', 'Structure quotidienne claire et routines fiables à la maison'], austausch: ['échanges avec l’école', "Échanges réguliers entre les parents et l'école"], medien: ['règles pour les écrans', "Règles claires, convenues ensemble, concernant l'utilisation des écrans"], freizeit: ['activité de loisirs', 'Activité de loisirs régulière, par exemple dans un club ou une association'] },
    empf_schule: { sitzplatz: ['place en classe', "Place calme, à proximité de l'enseignant·e"], differenzierung: ['différenciation', 'Consignes différenciées et clairement structurées'], verstaerker: ['système de renforcement', 'Retours positifs fréquents, le cas échéant avec un système de renforcement'], regeln: ['règles et conséquences', 'Quelques règles claires assorties de conséquences prévisibles'], auszeit: ['temps calme / retrait', 'Possibilité convenue de temps calme ou de retrait'], uebergaenge: ['annoncer les transitions', 'Annonce anticipée des transitions et des changements'], visualisierung: ['visualisation', 'Visualisation du déroulement de la journée et des étapes de travail'], bewegung: ['pauses actives', 'Pauses de mouvement régulières'], iebs: ['I-EBS', "Soutien par l'I-EBS"], bezugsperson: ['personne de référence', "Personne de référence stable au sein de l'école"] },
    empf_region: { eseb: ['suivi ESEB', "Poursuite de l'accompagnement par l'ESEB"], isa: ['ISA', 'Intervention spécialisée ambulatoire (ISA) du CDSE'], conseil: ['Conseil & Guidance', 'Conseil & Guidance par le CDSE'], lernwerkstatt: ['Atelier d’apprentissage', "Participation à l'Atelier d'apprentissage spécifique"], psychotherapie: ['psychothérapie', 'Accompagnement psychothérapeutique pour enfants et adolescents'], ergotherapie: ['ergothérapie', 'Ergothérapie'], logopaedie: ['logopédie', 'Logopédie'], psychiatrie: ['bilan pédopsychiatrique', 'Bilan pédopsychiatrique'] },
    cni: { diag_kompetenzzentrum: ['diagnostic avec Centre de compétence', 'Diagnostic spécialisé en collaboration avec un Centre de compétence'], beratung_eltern: ['conseil parents et élève', "Conseil et guidance des parents et de l'élève"], beratung_fachleute: ['conseil professionnel·le·s', 'Conseil et guidance des professionnel·le·s'], lernwerkstatt: ['Atelier d’apprentissage', "Atelier d'apprentissage spécifique"], isa: ['ISA', 'Intervention spécialisée ambulatoire (ISA)'], beschulung: ['scolarisation au CDSE', 'Scolarisation spécialisée au CDSE'], clapa: ['Classe de Participation', 'Scolarisation spécialisée au CDSE – Classe de Participation'], cst: ['CST', 'Scolarisation spécialisée au CDSE – Centre socio-thérapeutique (CST)'], annexe: ['Annexe Junglinster', 'Scolarisation spécialisée au CDSE – Annexe Junglinster'], ausland: ['scolarisation à l’étranger', "Scolarisation spécialisée à l'étranger"], rehabilitation: ['rééducation', 'Rééducation'], abschluss: ['fin de la prise en charge', 'Fin de la prise en charge'], schliessung: ['clôture du dossier', 'Clôture du dossier au CDSE'] }
  },

  // Rahmensätze
  s: {
    liste_und: 'et', liste_oder: 'ou', liste_sowie: 'ainsi que',
    schule_intro: "Les informations suivantes reposent sur un entretien mené{datum: le {datum}} avec {QSd}.",
    schule_staerken: "Du point de vue de l'école, {N} se distingue notamment par {liste}.",
    schule_hilft: "Les aides suivantes se sont révélées utiles : {liste}.",
    schule_erwartung: "L'école attend de l'intervention du CDSE {liste}.",
    schule_ohne: "L'école ne signale par ailleurs aucun signe {liste}.",
    kind_intro: "Un entretien a été mené avec {Name}{datum: le {datum}}.",
    kind_interessen: "Pendant son temps libre, {N} aime {liste}.",
    kind_wuensche: "Pour l'avenir, {N} souhaite {liste}.",
    kind_vertrauen: "Comme personne de confiance à l'école, {N} cite {text}.",
    kind_ohne: "L'entretien n'a mis en évidence aucun signe {liste}.",
    eltern_intro: "Les informations suivantes proviennent d'un entretien mené{datum: le {datum}} avec {Qd}.",
    // Zahl richtet sich hier nach der Liste (nicht nach der Quelle)
    eltern_staerken: "Pour {Qd}, {{le point fort|les points forts}} de {Name} {{est|sont}} {liste}.",
    eltern_erwartung: "{Q} {{espère|espèrent}} que l'accompagnement apportera {liste}.",
    eltern_ohne: "Par ailleurs, aucun signe {liste} n'est rapporté.",
    beob_ohne: "Aucun signe {liste} n'a été relevé pendant la période d'observation.",
    beob_eine: "L'observation a été réalisée {beob}.",
    beob_mehrere: "Les observations ont été réalisées {beob}.",
    beob_eintrag: '{datum: le {datum}}{ort: {ort}}{dauer: ({dauer} minutes)}',
    // Interprétations
    muster_stark: "Les difficultés apparaissent surtout {liste}.",
    muster_mittel: "Les difficultés apparaissent souvent {liste}.",
    muster_mittel_nach: "Elles se manifestent souvent aussi {liste}.",
    aengste_stark: "Dans une perspective de thérapie développementale, les éléments recueillis font apparaître des indices nets {liste}.",
    aengste_mittel: "Dans une perspective de thérapie développementale, les éléments recueillis font apparaître des indices {liste}.",
    aengste_beide: "Dans une perspective de thérapie développementale, les éléments recueillis font apparaître des indices nets {stark}, ainsi que, dans une moindre mesure, {mittel}.",
    abwehr_stark: "Sur le plan des mécanismes de défense, on observe surtout {liste}.",
    abwehr_mittel: "Sur le plan des mécanismes de défense, on observe dans une certaine mesure {liste}.",
    abwehr_beide: "Sur le plan des mécanismes de défense, on observe surtout {stark}, ainsi que, dans une certaine mesure, {mittel}.",
    abwehr_bezug_stark: "{N} semble se défendre contre {{cette peur|ces peurs}} principalement par {stark}.",
    abwehr_bezug_beide: "{N} semble se défendre contre {{cette peur|ces peurs}} principalement par {stark}, ainsi que, dans une certaine mesure, par {mittel}.",
    abwehr_bezug_mittel: "{N} semble se défendre en partie contre {{cette peur|ces peurs}} par {mittel}.",
    hyp_stark: "Les difficultés décrites peuvent être comprises avant tout comme l'expression {liste}.",
    hyp_mittel: "Par ailleurs, {liste} {{pourrait|pourraient}} jouer un rôle.",
    hyp_nur_mittel: "Parmi les explications possibles, on peut envisager {liste}.",
    hyp_trauma: "L'éventuelle influence d'expériences éprouvantes devrait faire l'objet d'une évaluation spécialisée complémentaire.",
    // Besoins, ressources
    beduerfnis_stark: "{N} a surtout besoin {liste}.",
    beduerfnis_mittel: "{N} bénéficierait en outre {liste}.",
    beduerfnis_nur_mittel: "{N} bénéficierait {liste}.",
    ressourcen: "L'accompagnement pourra s'appuyer sur les ressources de {Name} : {liste}."
  },

  // Beschriftungen der Oberfläche
  ui: {
    titel: 'Diagnostic spécialisé', untertitel: 'Pas à pas jusqu’au rapport final',
    schritte: { stamm: 'Élève & rapport', auftrag: 'Demande', vorgeschichte: 'Antécédents', familie: 'Bilan social', aktuell: 'Situation actuelle', schule: 'Point de vue de l’école', kind: 'Point de vue de l’élève', eltern: 'Point de vue des parents', beobachtung: 'Observations', eldib: 'Résultats ELDiB', deutung: 'Interprétations', beduerfnisse: 'Besoins & ressources', empfehlungen: 'Recommandations', vorschau: 'Aperçu & export' },
    themen: {
      'schule.lernen': 'Apprentissages et méthode de travail', 'schule.verhalten': 'Comportement et émotions', 'schule.beziehung': 'Relations',
      'kind.schule': 'École', 'kind.selbst': 'Image de soi et bien-être', 'kind.umfeld': 'Amis et famille',
      'eltern.alltag': 'Quotidien à la maison', 'eltern.familie': 'Famille et éducation', 'eltern.zusammenarbeit': 'Collaboration',
      'beobachtung.arbeit': 'Comportement au travail', 'beobachtung.verhalten': 'Comportement', 'beobachtung.kontakt': 'Contacts',
      'deutung.quellen': 'Mise en perspective des informations', 'deutung.muster': 'Dans quelles situations les difficultés apparaissent-elles ?', 'deutung.aengste': 'Peurs liées au développement (indices)', 'deutung.abwehr': 'Mécanismes de défense (dans quelle mesure ?)', 'deutung.hypothesen': 'Pistes d’explication (quelle probabilité ?)',
      'beduerfnisse.beduerfnisse': 'Besoins de l’élève (quelle importance ?)'
    },
    chipTitel: { s_staerken: 'Points forts selon l’école', s_hilft: 'Qu’est-ce qui aide en classe ?', s_erwartung: 'Qu’attend l’école ?', k_interessen: 'Centres d’intérêt et loisirs', k_wuensche: 'Que souhaite l’élève ?', e_staerken: 'Points forts selon les parents', e_erwartung: 'Qu’attendent les parents ?', ressourcen: 'Ressources de l’élève' }
  }
};

// ==== 44b-ds-fakten-fr.js ====
// =====================================================================
// DS-Baukasten: französische Faktenabschnitte (Demande, Antécédents, Bilan social,
// Situation actuelle, Procédure diagnostique, ELDiB, Conclusion, Objectifs,
// Recommandations, CNI) – Formulierungen nach der Vorlage der CNI (12.11.2025)
// h = Hilfsfunktionen aus DsText (fuelle, satz, liste, chips, …)
// Datumsangaben immer mit h.datum(…, 'fr'); Apostroph im Berichtstext: gerade (').
// =====================================================================
DS_TEXTE.fr.s.das_kind = "l'élève";
// Vorschau ohne Motor-Nachbearbeitung: Leerzeichen in « » selbst setzen, np ist bereits elidiert
DS_TEXTE.fr.s.vorschau_ohne = 'Figurera dans le rapport sous la forme « aucun signe {liste} ».';
// n = Subjekt, d = nach Präposition (avec, pour, par, sur), g = mit "de" zusammengezogen (du père)
DS_TEXTE.fr.quellen = {
  schule: {
    lehrperson: { n: "l'enseignant·e", d: "l'enseignant·e", label: 'Enseignant·e' },
    lehrerin: { n: 'la titulaire de classe', d: 'la titulaire de classe', label: 'Titulaire de classe (enseignante)' },
    lehrer: { n: 'le titulaire de classe', d: 'le titulaire de classe', label: 'Titulaire de classe (enseignant)' },
    team: { n: "l'équipe pédagogique", d: "l'équipe pédagogique", label: 'Équipe pédagogique' },
    eseb: { n: "un membre de l'ESEB", d: "un membre de l'ESEB", label: 'Professionnel·le de l’ESEB' }
  },
  eltern: {
    eltern: { n: 'les parents', d: 'les parents', g: 'des parents', zahl: 2, label: 'Les deux parents' },
    mutter: { n: 'la mère', d: 'la mère', g: 'de la mère', zahl: 1, label: 'Mère' },
    vater: { n: 'le père', d: 'le père', g: 'du père', zahl: 1, label: 'Père' },
    pflegeeltern: { n: "les parents d'accueil", d: "les parents d'accueil", g: "des parents d'accueil", zahl: 2, label: 'Parents d’accueil' },
    grosseltern: { n: 'les grands-parents', d: 'les grands-parents', g: 'des grands-parents', zahl: 2, label: 'Grands-parents' }
  }
};
// Werte erscheinen auch als Beschriftung in der Oberfläche (Auswahllisten)
DS_TEXTE.fr.optionen = {
  auftraggeber: { cni: ['CNI', "la Commission nationale d'inclusion (CNI)"], eseb: ['ESEB', "l'équipe de soutien des élèves à besoins éducatifs particuliers ou spécifiques (ESEB)"], schule: ['École', "l'école"], eltern: ['Parents', 'les parents'] },
  verlauf: { unauffaellig: 'sans particularité', komplikationen: 'avec complications', unbekannt: 'inconnu' },
  entwicklung: { altersgerecht: "conforme à l'âge", verzoegert: 'retardé', unbekannt: 'inconnu' },
  familienstand: { zusammen: 'vivent ensemble', getrennt: 'séparés', alleinerziehend: 'famille monoparentale', patchwork: 'famille recomposée', verstorben: 'un parent décédé' },
  lebt_bei: { beide: ['chez les deux parents', 'vit chez ses deux parents'], mutter: ['chez la mère', 'vit chez sa mère'], vater: ['chez le père', 'vit chez son père'], wechsel: ['en garde alternée', 'vit en garde alternée chez ses deux parents'], grosseltern: ['chez les grands-parents', 'vit chez ses grands-parents'], pflege: ["en famille d'accueil", "vit dans une famille d'accueil"], heim: ['en foyer', "vit dans un foyer d'accueil"] },
  kontakt: { regelmaessig: 'Les contacts avec les deux parents sont réguliers.', eingeschraenkt_vater: 'Les contacts avec le père sont limités.', eingeschraenkt_mutter: 'Les contacts avec la mère sont limités.', kein_vater: "Aucun contact n'est entretenu avec le père.", kein_mutter: "Aucun contact n'est entretenu avec la mère." },
  position: { aeltestes: "l'aîné(e)", mittleres: 'un enfant du milieu', juengstes: 'le ou la plus jeune' },
  arbeitszeit: { vollzeit: 'à temps plein', teilzeit: 'à temps partiel', nicht: '' },
  setting: { klasse: 'en classe', kleingruppe: 'en petit groupe', einzel: 'en situation individuelle', pause: 'pendant la récréation', maison: 'à la maison relais', sport: "pendant le cours d'éducation physique" },
  abgestimmt: { ja: 'Oui, entièrement concertées', vorbehalte: 'Oui, avec des réserves', nein: 'Non' },
  stufeAlter: { 1: '0–2 ans', 2: '2–5 ans', 3: '6–9 ans', 4: '10–12 ans', 5: '13–16 ans' }
};

DS_TEXTE.fr.fakten = (function () {
  const O = DS_TEXTE.fr.optionen;
  const roem = function (n) { return ['', 'I', 'II', 'III', 'IV', 'V'][n] || String(n); };
  // Satz aufräumen wie DsText.satz(), aber mit korrekter Elision: franz() prüft die Wortgrenze
  // mit \b, und \b kennt in JS keine Akzente – aus "lui-même et", "Hélène a", "contrôle excessif"
  // würde sonst "lui-mêm'et", "Hélèn'a", "contrôl'excessif". Sobald franz() im Motor korrigiert ist,
  // kann S() wieder durch S() ersetzt werden.
  const BUCHST = 'A-Za-zÀ-ÖØ-öø-ÿŒœ';
  const ELISION = new RegExp('(^|[^' + BUCHST + "'’])(de|que|ne|se|le|la|je|me|te|lorsque|puisque|jusque) (?=[aeiouyhàâéèêëîïôûùœAEIOUYHÀÂÉÈÊËÎÏÔÛ])", 'g');
  const SI_IL = new RegExp('(^|[^' + BUCHST + '])si (?=ils?(?![' + BUCHST + ']))', 'g');
  function S(s) {
    // Satz aufräumen: dieselbe Regel wie im Motor (Elision, Leerzeichen, Apostroph ’)
    return DsText.satz(s, { lang: 'fr' });
  }
  const zahlwort = function (n) { return ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze'][n] || String(n); };
  // Stellung in der Geschwisterreihe (nach "dont il/elle est …")
  const POSITION = { aeltestes: "[[l'aîné|l'aînée]]", mittleres: "[[l'un des enfants du milieu|l'une des enfants du milieu]]", juengstes: '[[le plus jeune|la plus jeune]]' };

  // Schule mit passender Präposition: "à l'École …", "au Lycée …"
  function beiSchule(name) {
    const n = String(name || '').trim();
    if (!n) { return ''; }
    if (/^(Lycée|Lycee|Lyzeum|Centre|Collège|College|Campus|Conservatoire|Lënster)/i.test(n)) { return 'au ' + n; }
    if (/^(Maison|Classe|Section)/i.test(n)) { return 'à la ' + n; }
    if (/^[AEIOUYÀÂÉÈÊËÎÏÔÛ]/i.test(n)) { return "à l'" + n; }
    if (/(Lycée|Lycee|Lyzeum)/i.test(n)) { return 'au ' + n; }
    return "à l'école " + n;
  }

  // ELDiB-Beschreibungen ("Montre …", "Réagit …", "S'engage …") -> Satzteil nach dem Subjekt.
  // Mädchen: männliche Formen der Itemtexte angleichen (qu'il, lui-même, conscient …).
  function angleichen(s, c) {
    s = String(s || '');
    // bekannte Unebenheit im Itemtext (V-16)
    s = s.replace(/^Montre d'être conscient/, 'Se montre conscient');
    if (c.g !== 'w') { return s; }
    // (\b funktioniert in JS nicht neben à/é – deshalb (^|\s) bzw. Leerzeichen)
    return s.replace(/\bqu'il\b/g, "qu'elle").replace(/\blui-même\b/g, 'elle-même').replace(/\bautour de lui\b/g, "autour d'elle")
      .replace(/\bvers lui\b/g, 'vers elle').replace(/(^|\s)à lui\b/g, '$1à elle').replace(/\bconscient\b/g, 'consciente')
      .replace(/\bseul\b/g, 'seule').replace(/\bleader ou participant\b/g, 'leader ou participante')
      .replace(/(^|[\s'’])étudiant et citoyen\b/g, '$1étudiante et citoyenne');
  }
  // gerade Anführungszeichen im Itemtext ('Je', 'Donne-moi...') -> « … »
  function zitate(s) { return String(s || '').replace(/(^|\s)'([^']+)'(?=[\s.,;:!?]|$)/g, '$1« $2 »').replace(/\.\.\./g, '…'); }
  // Satzanfänge, die kein Verb sind ("Au moins 50 mots", "L'enfant …")
  const KEIN_VERB = /^(?:(?:Le|La|Les|Un|Une|Des|Du|De|Au|Aux|À|En|Dans|Par|Pour|Avec|Sans|Ce|Cette|Son|Sa|Ses)(?=\s)|L')/;
  // erster Satz als Prädikat: "Reconnaît les sentiments des autres." -> "reconnaît les sentiments des autres"
  function praedikat(d, c) {
    const teile = zitate(angleichen(String(d || '').trim(), c)).split(/\.\s+(?=[A-ZÀ-ÖØ-Ý])/);
    const erster = (teile[0] || '').replace(/\.$/, '').trim();
    if (!erster || KEIN_VERB.test(erster) || !/^[A-ZÀ-ÖØ-Ý]/.test(erster)) { return ''; }
    return erster.charAt(0).toLowerCase() + erster.slice(1);
  }
  // ganzer Itemtext als Prädikat (für die Ziele): weitere Sätze werden angehängt
  function praedikatVoll(d, c) {
    const teile = zitate(angleichen(String(d || '').trim(), c)).replace(/\.$/, '').split(/\.\s+(?=[A-ZÀ-ÖØ-Ý])/);
    const p = praedikat(teile[0], c);
    if (!p) { return ''; }
    const il = c.g === 'w' ? 'elle' : (c.g === 'm' ? 'il' : 'il/elle');
    return teile.slice(1).reduce(function (acc, t) {
      t = t.replace(/\.$/, '').trim();
      if (!t) { return acc; }
      if (/^L'enfant\s/.test(t)) { return acc + ' ; ' + il + ' ' + t.replace(/^L'enfant\s/, ''); }
      if (KEIN_VERB.test(t)) { return acc + ', ' + t.charAt(0).toLowerCase() + t.slice(1); }
      return acc + ' ; ' + il + ' ' + t.charAt(0).toLowerCase() + t.slice(1);
    }, p);
  }
  // Itemtext für die Lernziel-Liste (ohne Subjekt, mit Großbuchstaben am Anfang)
  function itemText(d, c) { return zitate(angleichen(String(d || '').trim(), c)).replace(/\.$/, ''); }

  return {
    auftrag: function (c, ds, st, h) {
      const f = ds.f || {}, s = [];
      c.neuerAbsatz();
      const wer = (O.auftraggeber[f.auftraggeber || 'cni'] || O.auftraggeber.cni)[1];
      const wer2 = f.auftraggeber === 'andere' && h.frei(ds, 'auftraggeber_andere') ? h.frei(ds, 'auftraggeber_andere') : wer;
      const wen = c.vollname ? "l'élève " + c.vollname : "l'élève";
      s.push(S(h.fuelle("Le Centre pour le développement socio-émotionnel (CDSE) a été mandaté{datum: en date du {datum}} par {wer} pour réaliser un diagnostic spécialisé de {wen}, afin de déterminer son état actuel de développement socio-émotionnel ainsi que ses besoins éducatifs particuliers.", c, { datum: h.datum(f.auftrag_datum, 'fr'), wer: wer2, wen: wen }), c));
      const anl = h.chips(ds, 'anlass').map(function (k) { return h.chipText(c, 'anlass', k); });
      if (h.frei(ds, 'anlass_andere')) { anl.push(h.frei(ds, 'anlass_andere')); }
      const anl2 = h.chips(ds, 'anliegen').map(function (k) { return h.chipText(c, 'anliegen', k); });
      if (anl.length) { s.push(S(h.fuelle('La demande fait suite à {liste}.', c, { liste: h.liste(anl, c) }), c)); }
      if (anl2.length) { s.push(S(h.fuelle((anl.length ? 'Elle' : 'La demande') + ' a pour objectif {liste}.', c, { liste: h.liste(anl2, c) }), c)); }
      const emp = h.chips(ds, 'empfohlen').filter(function (k) { return k !== 'eltern'; }).map(function (k) { return h.chipText(c, 'empfohlen', k); });
      const wunsch = h.chips(ds, 'empfohlen').indexOf('eltern') >= 0;
      if (emp.length && wunsch) { s.push(S(h.fuelle('Cette demande a été formulée sur recommandation {liste}, en accord avec le souhait des parents.', c, { liste: h.liste(emp, c) }), c)); }
      else if (emp.length) { s.push(S(h.fuelle('Cette demande a été formulée sur recommandation {liste}.', c, { liste: h.liste(emp, c) }), c)); }
      else if (wunsch) { s.push(S('Cette demande émane des parents.', c)); }
      const b = [h.block(s.join(' '))];
      return b.concat(h.freiBloecke(ds, 'anlass_details'));
    },

    vorgeschichte: function (c, ds, st, h) {
      const f = ds.f || {}, s = [], b = [];
      c.neuerAbsatz();
      // Grossesse et accouchement
      const sg = f.schwangerschaft, gb = f.geburt;
      if (sg === 'unauffaellig' && gb === 'unauffaellig') { s.push(S("Selon les parents, la grossesse et l'accouchement se sont déroulés sans particularité.", c)); }
      else {
        if (sg === 'unauffaellig') { s.push(S("La grossesse s'est déroulée sans particularité.", c)); }
        if (sg === 'komplikationen') { s.push(S(h.fuelle('La grossesse a été marquée par des complications{d: ({d})}.', c, { d: h.frei(ds, 'schwangerschaft_details') }), c)); }
        if (gb === 'unauffaellig') { s.push(S("L'accouchement s'est déroulé sans particularité.", c)); }
        if (gb === 'komplikationen') { s.push(S(h.fuelle("L'accouchement a donné lieu à des complications{d: ({d})}.", c, { d: h.frei(ds, 'geburt_details') }), c)); }
      }
      // Développement moteur et langagier
      const mo = f.motorik, sp = f.sprache;
      const worte = f.erste_worte ? ' (premiers mots vers ' + f.erste_worte + ' mois)' : '';
      if (mo === 'altersgerecht' && sp === 'altersgerecht') { s.push(S("Le développement moteur et le développement du langage ont été conformes à l'âge" + worte + '.', c)); }
      else if (mo === 'altersgerecht' && sp === 'verzoegert' && !h.frei(ds, 'sprache_details')) { s.push(S("Le développement moteur a été conforme à l'âge, tandis que le développement du langage a été retardé" + worte + '.', c)); }
      else if (mo === 'verzoegert' && sp === 'altersgerecht' && !h.frei(ds, 'motorik_details')) { s.push(S("Le développement du langage a été conforme à l'âge" + worte + ', tandis que le développement moteur a été retardé.', c)); }
      else {
        if (mo === 'altersgerecht') { s.push(S("Le développement moteur a été conforme à l'âge.", c)); }
        if (mo === 'verzoegert') { s.push(S(h.fuelle('Le développement moteur a été retardé{d: ({d})}.', c, { d: h.frei(ds, 'motorik_details') }), c)); }
        if (sp === 'altersgerecht') { s.push(S("Le développement du langage a été conforme à l'âge" + worte + '.', c)); }
        if (sp === 'verzoegert') { s.push(S(h.fuelle('Le développement du langage a été retardé' + worte + '{d:; {d}}.', c, { d: h.frei(ds, 'sprache_details') }), c)); }
      }
      // Diagnostics
      const dg = h.chips(ds, 'diagnosen').map(function (k) {
        const name = k === 'andere' ? h.frei(ds, 'diagnose_andere') : h.chipText(c, 'diagnosen', k);
        const det = ds.f && ds.f.diagnosen_details && ds.f.diagnosen_details[k];
        return name ? name + (det ? ' (' + det + ')' : '') : '';
      }).filter(Boolean);
      if (dg.length) { s.push(S(h.fuelle('{{Le diagnostic suivant a été posé|Les diagnostics suivants ont été posés}} à ce jour : {liste}.', c, { liste: h.liste(dg, c), zahl: dg.length }), c)); }
      else if (f.keine_diagnosen) { s.push(S("Aucun diagnostic n'a été posé à ce jour.", c)); }
      if (s.length) { b.push(h.block(s.join(' '))); }
      const rows = ((ds.tabellen && ds.tabellen.vorgeschichte) || []).filter(function (r) { return r && (r.zeitraum || r.massnahme || r.akteur); });
      if (rows.length) {
        b.push(h.block('Mesures de soutien scolaires et extrascolaires antérieures :'));
        b.push({ typ: 'tabelle', id: 'vorgeschichte', kopf: ['Période', 'Classe', 'Intervention', 'Acteur·ice'], zeilen: rows.map(function (r) { return [r.zeitraum || '', r.klasse || '', r.massnahme || '', r.akteur || '']; }) });
      }
      return b.concat(h.freiBloecke(ds, 'vorgeschichte'));
    },

    sozialbericht: function (c, ds, st, h) {
      const f = ds.f || {}, s = [];
      c.neuerAbsatz();
      const lb = O.lebt_bei[f.lebt_bei];
      const stand = { getrennt: 'Les parents de {Name} sont séparés', zusammen: 'Les parents de {Name} vivent ensemble', alleinerziehend: '{Name} grandit dans une famille monoparentale', patchwork: '{Name} grandit dans une famille recomposée', verstorben: "L'un des parents de {Name} est décédé" }[f.familienstand];
      if (stand && lb && !(f.familienstand === 'zusammen' && f.lebt_bei === 'beide')) { s.push(S(h.fuelle(stand + ' ; {il} ' + lb[1] + '.', c), c)); }
      else if (stand && f.familienstand === 'zusammen' && f.lebt_bei === 'beide') { s.push(S(h.fuelle('{Name} vit avec ses deux parents.', c), c)); }
      else if (stand) { s.push(S(h.fuelle(stand + '.', c), c)); }
      else if (lb) { s.push(S(h.fuelle('{N} ' + lb[1] + '.', c), c)); }
      if (O.kontakt[f.kontakt]) { s.push(S(O.kontakt[f.kontakt], c)); }
      if (h.frei(ds, 'kontakt_details')) { s.push(S(h.frei(ds, 'kontakt_details'), c)); }
      const n = parseInt(f.geschwister_anzahl, 10);
      if (n === 0) { s.push(S(h.fuelle('{N} est enfant unique.', c), c)); }
      else if (n > 0) {
        const pos = POSITION[f.geschwister_position];
        s.push(S(h.fuelle("{N} fait partie d'une fratrie de " + zahlwort(n + 1) + ' enfants' + (pos ? ', dont {il} est ' + pos : '') + '.', c), c));
      }
      const sp = h.chips(ds, 'sprachen').map(function (k) { return k === 'andere' ? h.frei(ds, 'sprache_andere') : h.chipText(c, 'sprachen', k); }).filter(Boolean);
      if (sp.length) { s.push(S(h.fuelle('À la maison, la famille parle {liste}.', c, { liste: h.liste(sp, c) }), c)); }
      const beruf = function (wer, b, z) {
        if (z === 'nicht') { return wer + " n'exerce actuellement pas d'activité professionnelle"; }
        if (!b && !z) { return ''; }
        return wer + ' travaille' + (O.arbeitszeit[z] ? ' ' + O.arbeitszeit[z] : '') + (b ? ' en tant que ' + b : '');
      };
      const bm = beruf('la mère', h.frei(ds, 'beruf_mutter'), f.zeit_mutter), bv = beruf('le père', h.frei(ds, 'beruf_vater'), f.zeit_vater);
      if (bm && bv) { s.push(S(bm + ' ; ' + bv + '.', c)); } else if (bm || bv) { s.push(S((bm || bv) + '.', c)); }
      const ev = h.chips(ds, 'ereignisse').map(function (k) {
        const det = ds.f && ds.f.ereignis_details && ds.f.ereignis_details[k];
        return h.chipText(c, 'ereignisse', k) + (det ? ' (' + det + ')' : '');
      });
      if (ev.length) { s.push(S(h.fuelle("{{L'événement marquant suivant est mentionné|Les événements marquants suivants sont mentionnés}} : {liste}.", c, { liste: h.liste(ev, c), zahl: ev.length }), c)); }
      const bt = h.chips(ds, 'betreuung');
      if (bt.indexOf('maison_relais') >= 0) { s.push(S(h.fuelle("Après l'école, {N} fréquente la maison relais.", c), c)); }
      if (bt.indexOf('grosseltern') >= 0) { s.push(S(h.fuelle("En dehors de l'école, {N} est régulièrement [[gardé|gardée]] par ses grands-parents.", c), c)); }
      if (bt.indexOf('tagesmutter') >= 0) { s.push(S(h.fuelle(bt.indexOf('grosseltern') >= 0 ? '{N} est par ailleurs [[accueilli|accueillie]] chez une assistante parentale.' : "En dehors de l'école, {N} est [[accueilli|accueillie]] chez une assistante parentale.", c), c)); }
      if (h.frei(ds, 'freizeit')) { s.push(S(h.frei(ds, 'freizeit'), c)); }
      return (s.length ? [h.block(s.join(' '))] : []).concat(h.freiBloecke(ds, 'familie'));
    },

    aktuell: function (c, ds, st, h) {
      const f = ds.f || {};
      c.neuerAbsatz();
      const klasse = f.klasse || (st && st.klasse) || '', schule = f.schule_name || (st && st.foerderort) || '';
      const s = [];
      if (klasse || schule) {
        s.push(S(h.fuelle('{N} est actuellement [[scolarisé|scolarisée]]{klasse: dans la classe {klasse}}{schule: {schule}}{lp:, sous la responsabilité de {lp}}.', c,
          { klasse: klasse, schule: beiSchule(schule), lp: h.frei(ds, 'lehrperson') }), c));
      }
      if (h.frei(ds, 'eseb_referenz')) {
        s.push(S(h.fuelle(s.length ? "Sa personne de référence au sein de l'ESEB est {x}." : "La personne de référence de {Name} au sein de l'ESEB est {x}.", c, { x: h.frei(ds, 'eseb_referenz') }), c));
      }
      const b = (s.length ? [h.block(s.join(' '))] : []).concat(h.freiBloecke(ds, 'aktuell'));   // eigene Ergänzung
      const rows = ((ds.tabellen && ds.tabellen.aktuell) || []).filter(function (r) { return r && (r.zeitraum || r.massnahme || r.akteur); });
      if (rows.length) { b.push({ typ: 'tabelle', id: 'aktuell', kopf: ['Période', 'Classe', 'Intervention', 'Acteur·ice'], zeilen: rows.map(function (r) { return [r.zeitraum || '', r.klasse || '', r.massnahme || '', r.akteur || '']; }), abschnitt: 'massnahmen' }); }
      return b;
    },

    verfahren: function (c, ds, st, h) {
      c.neuerAbsatz();
      const v = h.chips(ds, 'verfahren').filter(function (k) { return k !== 'andere' && h.chipText(c, 'verfahren', k); }).map(function (k) { return h.chipText(c, 'verfahren', k); });
      if (h.frei(ds, 'verfahren_andere')) { v.push(h.frei(ds, 'verfahren_andere')); }
      if (!v.length) { v.push(h.chipText(c, 'verfahren', 'eldib')); }
      const eltern = /^(pflegeeltern|grosseltern)$/.test((ds.f || {}).eltern_quelle || '') && c.q ? c.q.d : 'les parents';
      // Beobachtung und Gespräche nur nennen, wenn dazu Angaben vorliegen (sonst nichts erfinden)
      const gespr = [['schule', "l'équipe enseignante"], ['eltern', eltern], ['kind', '{Name}']].filter(function (x) { return h.angaben(x[0]); }).map(function (x) { return x[1]; });
      const teile = ['sur {liste}'];
      if (h.angaben('beobachtung') || h.chips(ds, 'verfahren').indexOf('beobachtung') >= 0) { teile.push('sur des observations en classe'); }
      if (gespr.length) { teile.push('sur des entretiens avec ' + h.liste(gespr, c)); } else if (h.chips(ds, 'verfahren').indexOf('gespraeche') >= 0) { teile.push('sur des entretiens'); }
      const s = [S(h.fuelle('Cette évaluation repose ' + (teile.length > 1 ? teile.slice(0, -1).join(', ') + ' ainsi que ' + teile[teile.length - 1] : teile[0]) + '.', c, { liste: h.liste(v, c) }), c)];
      if (h.frei(ds, 'verfahren_ort')) { s.push(S(h.fuelle('Lieu des observations et des entretiens : {ort}.', c, { ort: h.frei(ds, 'verfahren_ort') }), c)); }
      return [h.block(s.join(' '))];
    },

    beobachtungIntro: function (c, ds, st, h) {
      const l = ((ds.f && ds.f.beobachtungen) || []).filter(function (b) { return b && (b.datum || b.setting || b.dauer); });
      if (!l.length) { return []; }
      c.neuerAbsatz();
      const T = DS_TEXTE.fr.s;
      const teile = l.map(function (b) {
        return h.fuelle(T.beob_eintrag, c, { datum: h.datum(b.datum, 'fr'), ort: O.setting[b.setting] || b.setting_andere || '', dauer: b.dauer ? String(b.dauer) : '' }).trim();
      });
      return [h.block(S(h.fuelle(l.length > 1 ? T.beob_mehrere : T.beob_eine, c, { beob: h.liste(teile, c) }), c))];
    },

    eldib: function (c, ds, st, h, profil) {
      const b = [];
      c.neuerAbsatz();
      b.push(h.block("L'ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen) est un instrument d'évaluation standardisé conçu pour mesurer le développement social et émotionnel des enfants et des adolescents à partir de la naissance jusqu'à l'âge de seize ans. Il fournit un profil de compétences spécifiques servant d'indicateurs du niveau des compétences sociales et émotionnelles."));
      const bereiche = (profil && profil.bereiche) || [];
      const mitStufe = bereiche.filter(function (x) { return x.stufe > 0; });
      const niveau = '{stufe} (« {richtziel} », {alter})';
      bereiche.forEach(function (x) {
        c.neuerAbsatz();
        const s = [];
        const v = { bereich: x.name, code: x.code, stufe: roem(x.stufe), richtziel: x.richtziel, alter: O.stufeAlter[x.stufe] || '' };
        if (!x.stufe) { s.push(S(h.fuelle("Dans le domaine {bereich} ({code}), aucun item n'a encore été évalué comme acquis.", c, v), c)); }
        else if (mitStufe.length > 1 && x === mitStufe[0]) { s.push(S(h.fuelle('Les compétences les plus développées chez {Name} sont celles du domaine {bereich} ({code}), où {il} se situe au niveau de développement ' + niveau + '.', c, v), c)); }
        else if (mitStufe.length > 1 && x === mitStufe[mitStufe.length - 1]) { s.push(S(h.fuelle('Les compétences les moins développées chez {Name} sont celles du domaine {bereich} ({code}), où {il} se situe au niveau de développement ' + niveau + '.', c, v), c)); }
        else { s.push(S(h.fuelle('Dans le domaine {bereich} ({code}), {N} se situe au niveau de développement ' + niveau + '.', c, v), c)); }
        // die zwei zuletzt erreichten Fähigkeiten, mit unterschiedlichem Verb
        const pr = [], verben = {};
        (x.erreicht || []).slice().reverse().forEach(function (it) { const p = praedikat(it.description, c), w = p.split(' ')[0]; if (p && pr.length < 2 && !verben[w]) { verben[w] = 1; pr.unshift(p); } });
        // zwei Beispiele; enthält ein Itemtext schon "et", werden sie mit "; de plus," verbunden
        const pText = pr.length > 1 && pr.some(function (x) { return / et /.test(x); }) ? pr[0] + ' ; de plus, {il} ' + pr[1] : h.liste(pr, c, false, true);
        if (pr.length) { s.push(S(h.fuelle(h.fuelle('{N} dispose déjà de bons acquis dans ce domaine : {il} ', c) + pText + '.', c), c)); }
        const extra = ds.frei && ds.frei['eldib_' + x.id];
        if (extra && String(extra).trim()) { s.push(String(extra).trim()); }
        b.push(h.block(s.join(' ')));
        if ((x.ziele || []).length) {
          b.push(h.block(S(h.fuelle("En partant de l'objectif général, les objectifs d'apprentissage suivants ont été définis pour {Nt} :", c), c)));
          b.push({ typ: 'liste', punkte: x.ziele.map(function (z) { return S(z.code + ' – ' + itemText(z.description, c), c); }) });
        } else if (x.stufe) {
          b.push(h.block("Aucun objectif d'apprentissage n'a été défini dans ce domaine."));
        }
      });
      if (profil && profil.lebensalter != null && mitStufe.length) {
        c.neuerAbsatz();
        const erw = profil.erwarteteStufe, unter = mitStufe.filter(function (x) { return x.stufe < erw; });
        const v = { roem: roem(erw), alter: O.stufeAlter[erw] || '', jahre: profil.lebensalter };
        const erwartet = "Au regard de l'âge de {Name} ({jahre} ans), le niveau de développement {roem} ({alter}) serait attendu ; ";
        let t;
        if (unter.length === bereiche.length) { t = erwartet + 'les quatre domaines se situent en dessous de ce niveau.'; }
        else if (unter.length === 1) { t = erwartet + 'seul le domaine {liste} se situe en dessous de ce niveau.'; v.liste = unter[0].name; }
        else if (unter.length) { t = erwartet + 'les domaines {liste} se situent en dessous de ce niveau.'; v.liste = h.liste(unter.map(function (x) { return x.name; }), c); }
        else { t = "Tous les domaines évalués atteignent au moins le niveau de développement attendu à l'âge de {Name} ({roem}, {alter})."; }
        b.push(h.block(S(h.fuelle(t, c, v), c)));
      }
      return b;
    },

    schluss: function (c, ds, st, h) {
      const f = ds.f || {};
      c.neuerAbsatz();
      // ab etwa 12 Jahren wird das Kind in die Abstimmung einbezogen (Vorlage der CNI)
      const mitKind = c.alter != null && c.alter >= 12;
      // Pflegeeltern/Großeltern statt "les parents" (Vorlage: parents/tuteur·ice·s)
      const eltern = /^(pflegeeltern|grosseltern)$/.test(f.eltern_quelle || '') && c.q ? c.q.d : 'les parents';
      let t;
      if (f.abgestimmt === 'vorbehalte') {
        t = "Sur la base des résultats des tests disponibles, des observations et des données anamnestiques, des besoins spécifiques de soutien ont été identifiés. Lors des entretiens avec " + (mitKind ? '{Name} et ' + eltern : eltern) + ', des recommandations visant à soutenir davantage le développement individuel ont pu être élaborées. Certaines mesures proposées ont toutefois été remises en question ou n\'ont pas été entièrement approuvées par ' + (mitKind ? eltern + ' ou par {Name}' : eltern) + '.';
      } else if (f.abgestimmt === 'nein') {
        t = "Sur la base des résultats des tests disponibles, des observations et des données anamnestiques, des besoins spécifiques de soutien ont été identifiés et des recommandations ont été formulées. Une concertation sur ces recommandations avec " + (mitKind ? '{Name} et ' + eltern : eltern) + " n'a pas encore pu avoir lieu.";
      } else if (f.abgestimmt === 'ja') {
        t = "Sur la base des résultats des tests, des observations et des informations anamnestiques recueillies, des besoins spécifiques de soutien ont pu être identifiés en étroite concertation avec " + (mitKind ? "{Name} ainsi qu'avec " + eltern : eltern) + '. Par la suite, des recommandations ont été formulées conjointement, dans le but de soutenir efficacement le développement individuel.';
      } else {
        // keine Angabe zur Abstimmung: keine Abstimmung behaupten
        t = 'Sur la base des résultats des tests, des observations et des informations anamnestiques recueillies, des besoins spécifiques de soutien ont pu être identifiés. Par la suite, des recommandations ont été formulées dans le but de soutenir efficacement le développement individuel.';
      }
      return [h.block(S(h.fuelle(t, c), c))].concat(h.freiBloecke(ds, 'vorbehalte'));
    },

    ziele: function (c, ds, st, h, profil) {
      const f = ds.f || {}, b = [];
      c.neuerAbsatz();
      const ziele = [];
      ((profil && profil.bereiche) || []).forEach(function (x) { (x.ziele || []).forEach(function (z) { ziele.push({ z: z, x: x }); }); });
      const bis = f.ziele_bis ? "jusqu'au " + h.datum(f.ziele_bis, 'fr') : "jusqu'à la fin du prochain " + ((st && st.periodenTyp) === 'semester' ? 'semestre' : 'trimestre');
      if (ziele.length) {
        b.push(h.block(S(h.fuelle("Les objectifs de soutien suivants découlent des objectifs d'apprentissage de l'ELDiB. Ils décrivent à chaque fois la prochaine étape de développement ; leur mise en œuvre sera observée au quotidien {bis} et vérifiée lors de la prochaine évaluation ELDiB.", c, { bis: bis }), c)));
        b.push({ typ: 'liste', punkte: ziele.map(function (e) {
          c.neuerAbsatz();
          const p = praedikatVoll(e.z.description, c);
          const text = p ? S(h.fuelle('{Name} ' + p, c), c) : S(itemText(e.z.description, c), c);
          return text + ' (' + e.z.code + ')';
        }) });
      }
      const zus = h.frei(ds, 'ziele_zusatz');
      if (zus) { b.push({ typ: 'liste', punkte: zus.split(/\n+/).map(function (l) { return l.replace(/^[-•*]\s*/, '').trim(); }).filter(Boolean) }); }
      return b;
    },

    empfehlungen: function (c, ds, st, h) {
      const b = [];
      c.neuerAbsatz();
      [['empf_familie', 'Contexte familial', 'empfehlung_familie'], ['empf_schule', 'Contexte scolaire (local)', 'empfehlung_schule'], ['empf_region', 'Contexte régional (ESEB / CDSE)', 'empfehlung_region']].forEach(function (g) {
        const p = h.chips(ds, g[0]).map(function (k) { return h.fuelle(h.chipText(c, g[0], k), c); });
        const extra = h.frei(ds, g[2]);
        if (extra) { extra.split(/\n+/).forEach(function (l) { l = l.replace(/^[-•*]\s*/, '').trim(); if (l) { p.push(l); } }); }
        if (p.length) { b.push({ typ: 'zwischen', text: g[1] }); b.push({ typ: 'liste', punkte: p }); }
      });
      return b;
    },

    cni: function (c, ds, st, h) {
      c.neuerAbsatz();
      const m = h.chips(ds, 'cni').map(function (k) { return h.fuelle(h.chipText(c, 'cni', k), c); });
      const b = [];
      if (m.length) {
        b.push(h.block(m.length > 1 ? "Le CDSE recommande à la Commission nationale d'inclusion (CNI) les mesures suivantes :" : "Le CDSE recommande à la Commission nationale d'inclusion (CNI) la mesure suivante :"));
        b.push({ typ: 'liste', punkte: m });
      }
      return b.concat(h.freiBloecke(ds, 'cni_begruendung'));
    }
  };
})();

// ==== 45-ds-texte-en.js ====
// =====================================================================
// DS-Baukasten: englische Texte (amerikanisches Englisch, Begriffe wie in
// den englischen ELDiB-/DTORF-R-Daten: behavior, socialization, student …)
// ---------------------------------------------------------------------
// Gleiche Schlüssel und gleiche Struktur wie 43-ds-texte-de.js.
// q   = Aussage zum Anklicken (Fragebogen)
// t   = Formulierungen für den Bericht je Stufe:
//       [0] 1–2 trifft (gar) nicht zu  [1] 3 eher nicht  [2] 4 teils/teils
//       [3] 5 eher zu  [4] 6–7 trifft (voll) zu      null = kein Satz
// np  = Kurzform für "… no indications of {liste}" und für Ängste/Abwehr
// m   = Situationsangabe für muster_* ("The difficulties occur mainly …")
// e   = Erklärungssatz zu den zwei deutlichsten Entwicklungsängsten
// n/g = Erklärungsansätze: n für hyp_mittel/hyp_nur_mittel, g für hyp_stark
//       ("… understood as reflecting {liste}") – im Englischen dieselbe Form
// a/d = Bedürfnisse: a für beduerfnis_stark, d für beduerfnis_(nur_)mittel
// Platzhalter (siehe 46-ds-text.js):
//   {N} Name bzw. he/she (Subjekt)   {Na}/{Nd} Name bzw. him/her (Objekt)
//   {Nt} Name bzw. him/her nach Präposition ("for {Nt}")   {Name} immer der Name
//   {his} immer his/her   {himself} himself/herself   [[he|she]] festes Pronomen
//   {{Einzahl|Mehrzahl}} nach Zahl der Eltern-Quelle bzw. vars.zahl
//   {Q}/{Qd} Eltern-Quelle (the mother / the parents), {Qg} the mother’s …,
//   {QS}/{QSd} Schul-Quelle (the class teacher …)
// Kein {KONTRAST}: Der Motor stellt "However, / At the same time, / By contrast, "
// vor den ersten Schwierigkeitssatz nach Stärken und schreibt den Satzanfang
// klein. Sätze, die davon betroffen sein können (pol +1: t[0]–t[2], pol −1:
// t[2]–t[4]), beginnen deshalb mit dem Subjekt – nie mit "At times", "Only",
// "By …". Nie "{N}’s" schreiben (könnte "he’s" werden); {Name}’s ist sicher.
// Stil: sachlich, beschreibend, ressourcenorientiert; Präsens für die Berichte
// von Schule, Eltern und Kind, Beobachtung im Simple Past.
// Typografie: “…” und ’ wie im gedruckten Bericht, Spannen mit –.
// =====================================================================
DS_TEXTE.en = {
  skala: { 1: 'does not apply at all', 2: '', 3: '', 4: 'partly applies', 5: '', 6: '', 7: 'fully applies', leer: 'not rated' },

  a: {
    // ---------------- 3.2 Sichtweise der Schule (The school’s perspective) ----------------
    s_motiv: { q: 'Participates in class with motivation.', t: [
      '{N} rarely participates in class and repeatedly needs encouragement to join in.',
      '{N} is rather hesitant to participate in class, and {his} motivation fluctuates considerably.',
      'Participation in class varies and depends heavily on the topic and on how {N} is feeling on the day.',
      '{N} mostly participates in class with motivation.',
      '{N} participates in class with motivation and interest.'] },
    s_konz: { q: 'Is able to concentrate in class at an age-appropriate level.', t: [
      'Sustained concentration is hardly possible for {Nt}; [[he|she]] is distracted by even minor stimuli.',
      '{N} can concentrate only briefly and is easily distracted.',
      '{N} can concentrate only intermittently; {his} attention tends to wane, particularly during longer work periods.',
      'In class, {N} is usually able to concentrate at an age-appropriate level.',
      'In class, {N} is able to concentrate well and for sustained periods.'] },
    s_selbst: { q: 'Starts and completes tasks independently.', t: [
      '{N} rarely starts tasks without support, and work [[he|she]] has begun often remains unfinished.',
      '{N} often needs help to start and complete tasks.',
      '{N} starts and completes tasks independently only some of the time and repeatedly needs prompting.',
      'Most of the time, {N} starts and completes tasks independently.',
      '{N} starts tasks independently and completes them reliably.'] },
    s_sorgfalt: { q: 'Works carefully and in an organized way.', t: [
      '{N} often works hastily and in a disorganized way; materials and homework are frequently missing.',
      '{N} rarely manages to work carefully and keep {his} work organized.',
      '{N} is inconsistent in how carefully [[he|she]] works and organizes {his} materials.',
      '{N} mostly works carefully and generally keeps {his} materials in order.',
      '{N} works carefully and is well organized.'] },
    s_leistung: { q: 'Meets the learning objectives of the grade level.', t: [
      '{N} is performing well below the requirements of {his} grade level.',
      '{N} is performing below the requirements of {his} grade level in some areas.',
      '{N} meets the learning objectives of {his} grade level in some subjects but not yet in others.',
      'Academically, {N} largely meets the learning objectives of {his} grade level.',
      'Academically, {N} meets the learning objectives of {his} grade level with good results.'] },
    s_unruhe: { q: 'Is physically restless.', np: 'motor restlessness', t: [
      null,
      'Motor restlessness is seen only occasionally.',
      '{N} is physically restless at times, for example during longer periods of sitting.',
      '{N} is frequently restless and finds it hard to stay seated.',
      '{N} shows pronounced motor restlessness and finds it very hard to stay seated for any length of time.'] },
    s_regeln: { q: 'Follows class rules and agreements.', t: [
      '{N} rarely follows class rules and agreements.',
      '{N} follows rules and agreements only with a great deal of support.',
      '{N} knows the class rules but follows them only some of the time.',
      'For the most part, {N} follows class rules and agreements.',
      '{N} reliably follows class rules and agreements.'] },
    s_impuls: { q: 'Acts impulsively, without thinking.', np: 'impulsivity', t: [
      null,
      'Impulsive behavior is seldom an issue.',
      '{N} sometimes acts impulsively when excited.',
      '{N} frequently acts impulsively, without considering the consequences.',
      '{N} very often acts on impulse; it is hard for [[him|her]] to stop and think before acting.'] },
    s_frust: { q: 'Copes with frustration and failure.', t: [
      '{N} is barely able to cope with frustration and failure; even minor setbacks trigger strong reactions.',
      'Coping with frustration and failure is difficult for {Nt}.',
      '{N} copes with frustration inconsistently: sometimes [[he|she]] manages to tolerate setbacks, sometimes not.',
      '{N} usually copes appropriately with frustration and failure.',
      '{N} tolerates frustration and failure well.'] },
    s_wut: { q: 'Reacts with angry outbursts.', np: 'angry outbursts', t: [
      null,
      'Angry outbursts are rare.',
      'Angry outbursts happen from time to time.',
      '{N} repeatedly reacts with angry outbursts, especially to criticism or limit-setting.',
      '{N} often has severe angry outbursts that significantly disrupt lessons.'] },
    s_aggr: { q: 'Shows verbal or physical aggression.', np: 'aggressive behavior', t: [
      null,
      'Aggressive behavior occurs only in isolated instances.',
      '{N} sometimes reacts with verbal or physical aggression in conflict situations.',
      '{N} frequently reacts with verbal or physical aggression toward others.',
      '{N} shows marked verbal and physical aggression toward others.'] },
    s_verweig: { q: 'Refuses tasks or instructions.', np: 'task refusal', t: [
      null,
      '{N} rarely refuses tasks.',
      '{N} sometimes refuses tasks or instructions, particularly when demands are high.',
      '{N} frequently refuses tasks or instructions.',
      '{N} very frequently refuses tasks and instructions; cooperation is often possible only with close individual support.'] },
    s_rueckzug: { q: 'Withdraws; seems quiet or introverted.', np: 'withdrawal', t: [
      null,
      'Signs of withdrawal are only occasional.',
      '{N} withdraws at times and seems introverted.',
      '{N} frequently withdraws and seems quiet and introverted.',
      '{N} is very withdrawn and rarely initiates contact with others.'] },
    s_angst: { q: 'Seems anxious or tense (e.g., fear of failure).', np: 'marked anxiety', t: [
      null,
      'Anxiety is rarely apparent.',
      '{N} sometimes appears tense or anxious in test situations.',
      '{N} regularly appears anxious and tense, especially when faced with academic demands.',
      '{N} appears very anxious and tense; fear of failure has a considerable impact on {his} everyday school life.'] },
    s_ausgeglichen: { q: 'Seems emotionally balanced.', t: [
      '{N} seems emotionally very unsettled, with marked mood swings.',
      '{N} often seems emotionally unsettled.',
      '{N} is emotionally changeable, seeming balanced on some days and irritable on others.',
      '{N} mostly seems emotionally balanced.',
      '{N} seems emotionally balanced and stable.'] },
    s_peers: { q: 'Has good relationships with classmates.', t: [
      '{N} has hardly any contact with classmates and seems isolated in the class.',
      '{N} has only limited success in establishing contact with classmates.',
      '{N} has contact with individual classmates but is only partly integrated into the class community.',
      '{N} mostly has good relationships with classmates.',
      '{N} is well integrated into the class and has stable relationships with classmates.'] },
    s_konflikt: { q: 'Frequently gets into conflicts with classmates.', np: 'frequent conflicts with classmates', t: [
      null,
      'Conflicts with classmates are rare.',
      '{N} occasionally gets into conflicts with classmates.',
      '{N} frequently gets into conflicts with classmates.',
      '{N} very frequently gets into conflicts with classmates, which [[he|she]] can hardly resolve without help.'] },
    s_erwachsene: { q: 'Has a trusting relationship with the teachers.', t: [
      '{N} has a severely strained relationship with the teachers.',
      '{N} has a tense relationship with the teachers.',
      '{N} has a changeable relationship with the teachers.',
      '{N} mostly has a good relationship with {his} teachers.',
      '{N} has a trusting relationship with {his} teachers.'] },
    s_hilfe: { q: 'Accepts help and support.', t: [
      '{N} usually rejects help and support.',
      '{N} accepts help only hesitantly.',
      '{N} accepts help only in part, depending on the situation and the person offering it.',
      '{N} is usually receptive to help and support.',
      '{N} readily accepts help and support.'] },
    s_selbstwert: { q: 'Seems self-confident and is willing to try things.', t: [
      '{N} has very little confidence in {his} own abilities and seems deeply insecure.',
      '{N} has little confidence in {his} own abilities and tends to seem insecure.',
      '{N} shows fluctuating self-confidence.',
      '{N} mostly seems self-confident.',
      '{N} seems self-confident and is willing to take on challenges.'] },

    // ---------------- 3.3 Sichtweise des Kindes (The student’s perspective) ----------------
    k_offen: { q: 'Talks openly about themselves and the situation during the interview.', t: [
      'In the interview{datum: on {datum}}, {N} was very reserved and said little about {himself} or {his} situation.',
      'In the interview{datum: on {datum}}, {N} was somewhat reserved.',
      'In the interview{datum: on {datum}}, {N} opened up to some extent after initial reticence.',
      'In the interview{datum: on {datum}}, {N} was mostly open.',
      'In the interview{datum: on {datum}}, {N} was open and talked readily about {himself} and {his} situation.'] },
    k_wohl: { q: 'Feels comfortable at school.', t: [
      '{N} states that [[he|she]] does not feel at ease at school and is reluctant to go.',
      '{N} reports that [[he|she]] often does not feel at ease at school.',
      '{N} describes {his} well-being at school as variable.',
      '{N} says that [[he|she]] mostly feels at ease at school.',
      '{N} says that [[he|she]] enjoys going to school and feels at ease there.'] },
    k_klasse: { q: 'Feels accepted in the class.', t: [
      '{N} does not feel accepted in the class.',
      '{N} tends to feel like an outsider in the class.',
      '{N} feels that [[he|she]] belongs in the class only to some extent.',
      '{N} mostly feels accepted in the class.',
      '{N} feels accepted in the class and has a sense of belonging.'] },
    k_lehrer: { q: 'Gets along well with the teachers.', t: [
      '{N} says that [[he|she]] does not get along with the teachers.',
      '{N} finds it hard to get along with the teachers.',
      '{N} gets along well with some teachers but less well with others.',
      '{N} reports that [[he|she]] mostly gets along well with the teachers.',
      '{N} reports getting along well with the teachers.'] },
    k_leistung: { q: 'Rates own academic abilities positively.', t: [
      '{N} rates {his} own academic abilities very negatively.',
      '{N} has a rather low opinion of {his} own academic abilities.',
      '{N} rates {his} academic abilities unevenly: in some subjects [[he|she]] feels confident, in others much less so.',
      'On the whole, {N} rates {his} academic abilities positively.',
      '{N} rates {his} academic abilities positively.'] },
    k_ungerecht: { q: 'Feels treated unfairly.', np: 'feeling treated unfairly', t: [
      null,
      '{N} rarely feels treated unfairly.',
      '{N} sometimes feels treated unfairly.',
      '{N} often feels treated unfairly, especially in conflicts and when consequences are imposed.',
      '{N} very often feels treated unfairly and sees {his} difficulties mainly as a reaction to the behavior of others.'] },
    k_selbstwert: { q: 'Speaks positively about themselves.', t: [
      '{N} speaks about {himself} in very disparaging terms.',
      '{N} tends to speak about {himself} disparagingly.',
      '{N} speaks about {himself} in partly positive, partly disparaging terms.',
      '{N} mostly speaks positively about {himself}.',
      '{N} speaks positively about {himself} and is able to name {his} own strengths.'] },
    k_druck: { q: 'Experiences psychological distress (burdened, sad, overwhelmed).', np: 'significant psychological distress', t: [
      null,
      '{N} describes little psychological distress.',
      '{N} describes a certain degree of psychological distress.',
      '{N} describes marked psychological distress and often feels weighed down.',
      '{N} describes a high level of psychological distress; [[he|she]] feels overwhelmed and sad.'] },
    k_angst: { q: 'Reports fears or worries.', np: 'fears or worries', t: [
      null,
      '{N} hardly mentions any fears or worries.',
      '{N} reports some fears and worries.',
      '{N} reports marked fears and worries.',
      '{N} reports pronounced fears and worries that weigh heavily on [[him|her]].'] },
    k_einsicht: { q: 'Recognizes own difficulties (problem awareness).', t: [
      '{N} shows no awareness of {his} own difficulties.',
      '{N} recognizes {his} own difficulties only to a limited extent.',
      '{N} sees {his} own difficulties only in part.',
      '{N} is largely able to name {his} own difficulties.',
      '{N} is able to name {his} own difficulties clearly and reflect on them.'] },
    k_veraenderung: { q: 'Wants things to change and is open to help.', t: [
      '{N} expresses no wish for change and rejects help.',
      '{N} hardly expresses any wish for change.',
      '{N} is only partly open to help.',
      '{N} would like things to change and is mostly open to help.',
      '{N} clearly wishes for change and is open to help.'] },
    k_freunde: { q: 'Has friends.', t: [
      '{N} says that [[he|she]] has no friends.',
      '{N} reports having hardly any friends.',
      '{N} names one or two friends.',
      '{N} mentions having a few friends.',
      '{N} reports several good friendships.'] },
    k_familie: { q: 'Describes the relationship with the family positively.', t: [
      '{N} describes {his} family relationships as very strained.',
      '{N} describes {his} family relationships as difficult.',
      '{N} describes {his} family relationships as changeable.',
      '{N} describes {his} family relationships as mostly positive.',
      '{N} describes {his} family relationships as positive and supportive.'] },

    // ---------------- 3.4 Sichtweise der Eltern (The parents’ perspective) ----------------
    e_alltag: { q: 'Copes well with everyday life at home.', t: [
      'Everyday family life is marked by constant difficulties.',
      'Everyday family life is often marked by difficulties.',
      'Everyday family life involves both calm periods and difficult situations.',
      '{N} mostly copes well with everyday family life.',
      '{N} copes well with everyday family life.'] },
    e_regeln: { q: 'Follows rules and agreements at home.', t: [
      '{N} hardly ever follows rules and agreements at home.',
      '{N} rarely follows rules and agreements at home.',
      '{N} follows family rules and agreements only some of the time.',
      '{N} mostly follows family rules and agreements.',
      '{N} reliably follows family rules and agreements.'] },
    e_wut: { q: 'Has angry outbursts at home.', np: 'angry outbursts', t: [
      null,
      'Angry outbursts rarely occur at home.',
      'There are occasional angry outbursts at home.',
      'Angry outbursts are frequent at home, especially when limits are set.',
      'Intense angry outbursts occur very frequently at home and place a heavy strain on family life.'] },
    e_geschwister: { q: 'Frequently has conflicts with siblings.', np: 'conflicts with siblings', t: [
      null,
      'Conflicts with siblings are rare.',
      'There are occasional conflicts with siblings.',
      '{N} frequently gets into conflicts with {his} siblings.',
      '{N} very frequently gets into intense conflicts with {his} siblings.'] },
    e_rueckzug: { q: 'Withdraws at home.', np: 'withdrawal', t: [
      null,
      '{N} rarely withdraws at home.',
      '{N} sometimes withdraws at home.',
      '{N} frequently withdraws to {his} room.',
      '{N} is severely withdrawn and hardly accessible to the family.'] },
    e_angst: { q: 'Shows fears or worries at home.', np: 'anxiety', t: [
      null,
      'Anxiety is hardly noticeable at home.',
      '{N} shows fears or worries at home from time to time.',
      '{N} often shows fears and worries at home.',
      '{N} shows marked anxiety at home, which considerably restricts {his} daily activities.'] },
    e_koerper: { q: 'Has sleep problems or physical complaints (e.g., stomachaches).', np: 'psychosomatic complaints', t: [
      null,
      'Sleep problems or physical complaints are rare.',
      'Sleep problems or physical complaints occur occasionally.',
      '{N} often has trouble sleeping or complains of physical symptoms such as stomachaches or headaches.',
      '{N} has severe sleep problems and very frequently complains of physical symptoms.'] },
    e_medien: { q: 'Spends a great deal of time on screens.', np: 'problematic screen use', t: [
      null,
      'Screen time is reported to be within reasonable limits.',
      '{N} sometimes spends a lot of time on screens.',
      '{N} spends a lot of time on screens; attempts to limit it frequently lead to conflict.',
      '{N} spends a great deal of time on screens, and it is hardly possible to limit this.'] },
    e_hausaufgaben: { q: 'Homework leads to conflicts.', np: 'conflicts over homework', t: [
      null,
      'Homework rarely leads to conflict.',
      'Homework occasionally leads to conflict.',
      'Homework frequently leads to conflict.',
      'Homework leads to intense conflict almost every day.'] },
    e_beziehung: { q: 'The relationship with the child is described as good.', t: [
      '{Q} {{describes|describe}} the relationship with {Name} as very strained.',
      '{Q} {{describes|describe}} the relationship with {Name} as tense.',
      '{Q} {{describes|describe}} the relationship with {Name} as ambivalent.',
      '{Q} {{describes|describe}} the relationship with {Name} as mostly good.',
      '{Q} {{describes|describe}} the relationship with {Name} as loving and stable.'] },
    e_struktur: { q: 'Family life is clearly structured.', t: [
      'Family life largely lacks fixed structures and routines.',
      'Family life has little structure.',
      'Family life is only partly structured.',
      'Family life is mostly clearly structured.',
      'Family life is clearly structured and follows reliable routines.'] },
    e_konsequenz: { q: 'Parenting is clear and consistent.', t: [
      'Clear and consistent parenting is hardly possible at present; the family seems overwhelmed.',
      'Consistent enforcement of rules is difficult to achieve at home.',
      'Rules are enforced consistently only some of the time.',
      'For the most part, parenting is clear and consistent.',
      'Parenting is clear and consistent.'] },
    e_belastung: { q: 'The parents feel heavily burdened by the situation.', np: 'a particular strain on the family', t: [
      null,
      '{Q} {{reports|report}} hardly any particular strain resulting from the situation.',
      '{Q} {{feels|feel}} somewhat burdened by the situation.',
      '{Q} {{feels|feel}} considerably burdened by the current situation.',
      '{Q} {{feels|feel}} heavily burdened and exhausted.'] },
    e_sicht_schule: { q: 'The parents share the school’s assessment.', t: [
      '{Q} {{does|do}} not share the school’s assessment.',
      'The school’s assessment is hardly shared.',
      'The school’s assessment is shared only in part.',
      'The school’s assessment is largely shared.',
      'The school’s assessment is fully shared.'] },
    e_kooperation: { q: 'The parents are willing to cooperate.', t: [
      '{Q} currently {{refuses|refuse}} to cooperate.',
      '{Q} {{is|are}} hesitant about cooperating.',
      '{Q} {{is|are}} willing in principle to cooperate but still {{has|have}} reservations.',
      'There is a clear willingness to cooperate.',
      'There is a strong willingness to cooperate, combined with active involvement.'] },

    // ---------------- 4.1 Verhaltensbeobachtung (Simple Past) ----------------
    b_start: { q: 'Started tasks independently.', t: [
      '{N} started tasks only after repeated prompting.',
      '{N} usually started tasks only after being prompted.',
      '{N} started tasks sometimes independently and sometimes only after being prompted.',
      '{N} mostly started tasks independently.',
      '{N} started tasks promptly and independently.'] },
    b_konz: { q: 'Worked with concentration and persistence.', t: [
      'Concentrated work was hardly possible for {Nt}; [[he|she]] abandoned tasks after a short time.',
      '{N} was able to concentrate only for short periods.',
      'Concentration fluctuated markedly: phases of focused work alternated with phases of distraction.',
      '{N} mostly worked with concentration.',
      '{N} worked with concentration and persistence.'] },
    b_anweisung: { q: 'Followed the teacher’s instructions.', t: [
      '{N} hardly followed the teacher’s instructions.',
      '{N} often followed instructions only after they had been repeated.',
      '{N} followed instructions only some of the time.',
      'For the most part, {N} followed the teacher’s instructions.',
      '{N} reliably followed the teacher’s instructions.'] },
    b_hilfe: { q: 'Asked for help when needed.', t: [
      '{N} did not ask for help when facing difficulties.',
      '{N} rarely asked for help when facing difficulties.',
      '{N} asked for help only occasionally.',
      'When facing difficulties, {N} mostly asked for help appropriately.',
      'When facing difficulties, {N} asked for help appropriately.'] },
    b_unruhe: { q: 'Was physically restless.', np: 'motor restlessness', t: [
      null,
      'Motor restlessness was apparent only occasionally.',
      '{N} was physically restless at times.',
      '{N} was frequently restless and repeatedly got up from {his} seat.',
      '{N} showed pronounced motor restlessness and could barely stay seated.'] },
    b_ablenk: { q: 'Was easily distracted.', np: 'increased distractibility', t: [
      null,
      '{N} was rarely distracted.',
      '{N} was occasionally distracted.',
      '{N} was frequently distracted by noises or classmates.',
      '{N} was distracted by even the slightest stimuli.'] },
    b_regeln: { q: 'Followed class rules.', t: [
      '{N} hardly adhered to the class rules.',
      '{N} rarely adhered to the class rules.',
      '{N} adhered to the class rules only some of the time.',
      '{N} mostly adhered to the class rules.',
      '{N} adhered reliably to the class rules.'] },
    b_frust: { q: 'Dealt appropriately with difficulties or frustration.', t: [
      'Setbacks provoked intense reactions from {Nt}, such as abandoning the task or angry outbursts.',
      '{N} rarely dealt appropriately with difficulties.',
      '{N} dealt with difficulties inconsistently.',
      '{N} mostly dealt appropriately with difficulties.',
      '{N} dealt appropriately with difficulties and frustration.'] },
    b_uebergang: { q: 'Managed transitions and changes without difficulty.', t: [
      'Transitions and changes caused {Na} great difficulty.',
      'Transitions and changes caused {Na} difficulty.',
      '{N} managed transitions and changes only in part.',
      'Transitions and changes mostly posed no difficulty for {Nt}.',
      'Transitions and changes posed no difficulty for {Nt}.'] },
    b_lob: { q: 'Responded positively to praise and attention.', t: [
      '{N} hardly responded to praise and attention.',
      '{N} responded to praise with some reserve.',
      '{N} responded to praise in varying ways.',
      'Praise and attention generally elicited positive responses from {Nt}.',
      '{N} responded to praise and attention with visible pleasure.'] },
    b_stoer: { q: 'Disrupted the lesson.', np: 'classroom disruption', t: [
      null,
      '{N} disrupted the lesson only occasionally.',
      '{N} disrupted the lesson at times.',
      '{N} repeatedly disrupted the lesson, for example by calling out or chatting.',
      '{N} disrupted the lesson frequently and significantly.'] },
    b_peers: { q: 'Sought and maintained positive contact with classmates.', t: [
      '{N} made no contact with classmates.',
      '{N} hardly initiated contact with classmates.',
      '{N} initiated contact with classmates only occasionally.',
      'Contact with classmates was mostly positive.',
      '{N} sought and maintained positive contact with classmates.'] },
    b_erwachsene: { q: 'Made appropriate contact with adults.', t: [
      '{N} largely avoided contact with adults.',
      '{N} approached adults only hesitantly.',
      '{N} interacted with adults partly appropriately and partly in an overly familiar or avoidant way.',
      '{N} mostly made appropriate contact with adults.',
      '{N} interacted with adults appropriately and openly.'] },
    b_isol: { q: 'Withdrew or kept to themselves.', np: 'withdrawal', t: [
      null,
      'Withdrawal occurred only occasionally.',
      '{N} kept to {himself} at times.',
      '{N} frequently withdrew and kept to {himself}.',
      '{N} kept to {himself} almost all the time and avoided others.'] },
    b_provo: { q: 'Provoked others or reacted aggressively.', np: 'provocative behavior', t: [
      null,
      'Provocative behavior occurred only occasionally.',
      '{N} occasionally provoked classmates.',
      '{N} repeatedly provoked classmates or reacted aggressively.',
      '{N} frequently provoked others and on several occasions reacted with verbal or physical aggression.'] },

    // ---------------- 4.3 Interpretation ----------------
    i_uebereinstimmung: { q: 'The perspectives of the school, the parents and the child agree.', t: [
      'The perspectives of the school, {Q} and {Name} {himself} differ considerably.',
      'The perspectives of the school, {Q} and {Name} {himself} agree only in a few respects.',
      'The perspectives of the school, {Q} and {Name} {himself} agree in part.',
      'The perspectives of the school, {Q} and {Name} {himself} largely agree.',
      'The perspectives of the school, {Q} and {Name} {himself} agree on the essential points.'] },
    i_beobachtung: { q: 'Our own observation confirms the reports.', t: [
      'The observations made during the assessment do not confirm the accounts given.',
      'The observations made during the assessment confirm the accounts given only on individual points.',
      'The observations made during the assessment partly confirm the accounts given.',
      'The observations made during the assessment largely confirm the accounts given.',
      'The observations made during the assessment confirm the accounts given.'] },
    i_eldib: { q: 'The ELDiB profile matches the clinical impression.', t: [
      'The ELDiB profile differs markedly from the clinical impression.',
      'The ELDiB profile matches the clinical impression only to a limited extent.',
      'The ELDiB profile partly matches the clinical impression.',
      'The ELDiB profile largely matches the clinical impression.',
      'The ELDiB profile matches the clinical impression.'] },
    i_unstrukturiert: { q: 'Difficulties arise mainly in unstructured situations (recess, transitions, free work).', m: 'in unstructured situations (such as recess and transitions)', t: [
      null, null,
      'To some extent, the difficulties occur in unstructured situations.',
      'The difficulties frequently occur in unstructured situations, such as recess or transitions.',
      'The difficulties occur mainly in unstructured situations such as recess, transitions or free work periods.'] },
    i_anforderung: { q: 'Difficulties arise mainly when academic demands are made.', m: 'in response to academic demands', t: [
      null, null,
      'To some extent, the difficulties are linked to academic demands.',
      'The difficulties frequently occur in response to academic demands.',
      'The difficulties occur mainly in response to academic demands.'] },
    i_beziehung: { q: 'Difficulties arise mainly in interpersonal situations (closeness, competition, limits).', m: 'in interpersonal situations (for example, involving closeness, competition or limit-setting)', t: [
      null, null,
      'To some extent, the difficulties are linked to interpersonal situations.',
      'The difficulties frequently occur in interpersonal situations, for example involving competition or limit-setting.',
      'The difficulties occur mainly in interpersonal situations, for example involving closeness, competition or limit-setting.'] },
    i_einzel: { q: 'Considerably more is possible in a one-to-one setting with an adult.', t: [
      null, null,
      'In a one-to-one setting, {Name} is sometimes more successful than in a group.',
      'In a one-to-one setting with an adult, {Name} is more successful than in a group.',
      'In a one-to-one setting with an adult, {Name} is considerably more successful than in a group.'] },
    i_schule: { q: 'The difficulties appear mainly at school.', t: [
      null, null,
      'At school, the difficulties are somewhat more pronounced than at home.',
      'The difficulties are more pronounced at school than at home.',
      'It is mainly in the school context that the difficulties appear.'] },
    i_zuhause: { q: 'The difficulties appear mainly at home.', t: [
      null, null,
      'At home, the difficulties are somewhat more pronounced than at school.',
      'The difficulties are more pronounced at home than at school.',
      'It is mainly in the home environment that the difficulties appear.'] },
    // Entwicklungsängste (Developmental Therapy nach Wood / ETEP)
    i_angst_verlassen: { q: 'Fear of abandonment (Stage I)', np: 'abandonment anxiety (Stage I)',
      e: '{N} seems to rely heavily on the availability of familiar adults and reacts to separations or changes with insecurity.' },
    i_angst_unzul: { q: 'Fear of inadequacy/failure (Stage II)', np: 'anxiety about inadequacy (Stage II)',
      e: '{N} tends to experience demands as overwhelming and fears not living up to expectations.' },
    i_angst_schuld: { q: 'Guilt (Stage III)', np: 'guilt anxiety (Stage III)',
      e: '{N} probably associates mistakes and rule violations closely with guilt and shame and quickly anticipates rejection.' },
    i_angst_konflikt: { q: 'Conflict anxiety (Stage IV)', np: 'conflict anxiety (Stage IV)',
      e: 'In disputes with peers and adults, {N} quickly comes under pressure and is inclined either to avoid conflicts or to escalate them.' },
    i_angst_identitaet: { q: 'Identity anxiety (Stage V)', np: 'identity anxiety (Stage V)',
      e: '{N} appears to be strongly preoccupied with questions of {his} own role, belonging and self-determination.' },
    // Abwehrmechanismen
    i_abw_rueckzug: { q: 'Withdrawal', np: 'withdrawal' },
    i_abw_vermeidung: { q: 'Avoidance, refusal', np: 'avoidance' },
    i_abw_aggression: { q: 'Aggression, attack', np: 'aggression' },
    i_abw_regression: { q: 'Regression (behaving like a much younger child)', np: 'regressive behavior' },
    i_abw_clown: { q: 'Clowning, diversion', np: 'clowning' },
    i_abw_kontrolle: { q: 'Overcontrol, perfectionism', np: 'overcontrol' },
    i_abw_projektion: { q: 'Projection, blaming others', np: 'blaming others' },
    i_abw_verleugnung: { q: 'Denial, minimization', np: 'minimization' },
    // Erklärungsansätze: n = hyp_mittel/hyp_nur_mittel, g = hyp_stark ("reflecting …")
    i_hyp_entwicklung: { q: 'Delay in socio-emotional development', n: 'a delay in socio-emotional development', g: 'a delay in socio-emotional development' },
    i_hyp_regulation: { q: 'Difficulties with emotion regulation', n: 'a limited ability to regulate emotions', g: 'a limited ability to regulate emotions' },
    i_hyp_belastung: { q: 'Reaction to current stressors in the family or at school', pl: true, n: 'current stressors in the family or at school', g: 'current stressors in the family or at school' },
    i_hyp_bindung: { q: 'Attachment insecurity', n: 'attachment insecurity', g: 'attachment insecurity' },
    i_hyp_sozial: { q: 'Social insecurity', n: 'social insecurity', g: 'social insecurity' },
    i_hyp_aufmerksamkeit: { q: 'Attention difficulties', n: 'attentional difficulties', g: 'attentional difficulties' },
    i_hyp_ueberforderung: { q: 'Academic overload (demands too high)', n: 'academic demands that exceed {his} current capacities', g: 'academic demands that exceed {his} current capacities' },
    i_hyp_unterforderung: { q: 'Insufficient academic challenge (demands too low)', n: 'insufficient academic challenge', g: 'insufficient academic challenge' },
    i_hyp_trauma: { q: 'Possible effects of adverse experiences (clarify further)' },

    // ---------------- 5.1 Bedürfnisse: a = beduerfnis_stark, d = beduerfnis_(nur_)mittel ----------------
    n_struktur: { q: 'Clear structures and predictable routines', a: 'clear structures and predictable routines', d: 'clear structures and predictable routines' },
    n_beziehung: { q: 'A reliable, stable key adult', a: 'a reliable, stable key adult', d: 'a reliable, stable key adult' },
    n_erfolg: { q: 'Experiences of success and positive feedback', a: 'experiences of success and positive feedback', d: 'experiences of success and positive feedback' },
    n_regulation: { q: 'Support in regulating emotions', a: 'help in regulating {his} emotions', d: 'help in regulating {his} emotions' },
    n_grenzen: { q: 'Clear limits and consistent feedback', a: 'clear, consistently applied limits', d: 'clear, consistently applied limits' },
    n_sozial: { q: 'Development of social skills', a: 'targeted work on {his} social skills', d: 'targeted work on {his} social skills' },
    n_organisation: { q: 'Help with attention and work organization', a: 'guidance in focusing {his} attention and organizing {his} work', d: 'guidance in focusing {his} attention and organizing {his} work' },
    n_differenzierung: { q: 'Adapted demands (differentiation)', a: 'demands adapted to {his} abilities', d: 'demands adapted to {his} abilities' },
    n_therapie: { q: 'Therapeutic support', a: 'therapeutic support', d: 'therapeutic support' },
    n_familie: { q: 'Support for the family', a: 'support for {his} family', d: 'support for {his} family' }
  },

  // Auswahlfelder: [Beschriftung, Form im Text]
  chips: {
    // "{N} is described as {liste}." -> Adjektive
    s_staerken: { hilfsbereit: ['helpful', 'helpful'], kreativ: ['creative', 'creative'], humorvoll: ['good sense of humor', 'good-humored'], sportlich: ['athletic', 'athletic'], sprachlich: ['strong in languages', 'strong in languages'], mathematisch: ['strong in math', 'strong in math'], technisch: ['interested in technology', 'interested in technology'], musikalisch: ['musical', 'musical'], fantasievoll: ['imaginative', 'imaginative'], wissbegierig: ['eager to learn', 'eager to learn'], freundlich: ['friendly', 'friendly'], zuverlaessig: ['reliable', 'reliable'] },
    // "Strategies that have proven helpful include {liste}."
    s_hilft: { ansagen: ['clear, short instructions', 'clear, short instructions'], wiederholung: ['repetition', 'repetition'], visualisierung: ['visual aids', 'visual aids'], bewegung: ['movement breaks', 'movement breaks'], rueckzugsort: ['quiet space', 'access to a quiet space'], einzelansprache: ['addressing individually', 'addressing {Na} individually'], lob: ['praise, reinforcement', 'praise and positive reinforcement'], vorwarnung: ['advance notice of changes', 'advance notice of transitions'], kleingruppe: ['small group', 'working in a small group'], naehe: ['proximity to the teacher', 'sitting close to the teacher'], struktur: ['fixed routines', 'fixed routines and structures'] },
    // "The school hopes that the CDSE’s involvement will lead to {liste}."
    s_erwartung: { strategien: ['classroom strategies', 'concrete strategies for the classroom'], verhalten: ['better behavior', 'an improvement in behavior'], konzentration: ['better concentration', 'better concentration'], integration: ['social integration', 'better social integration'], stabilitaet: ['emotional stability', 'greater emotional stability'], leistung: ['better performance', 'better academic performance'], therapie: ['therapeutic help', 'external therapeutic support'], eltern: ['cooperation with parents', 'closer cooperation with the parents'], foerderort: ['different setting', 'a review of whether a different educational setting would be more suitable'], abklaerung: ['assessment', 'a diagnostic assessment'] },
    // "Among {his} interests, {N} mentions {liste}."
    k_interessen: { sport: ['sports', 'sports'], gaming: ['video games', 'video games'], musik: ['music', 'music'], lesen: ['reading', 'reading'], kreatives: ['drawing, crafts', 'drawing and crafts'], freunde: ['meeting friends', 'spending time with friends'], tiere: ['animals', 'animals'], natur: ['nature', 'outdoor activities'], technik: ['technology', 'technology'], kochen: ['cooking, baking', 'cooking and baking'] },
    // "For the future, {N} wishes for {liste}."
    k_wuensche: { noten: ['better grades', 'better grades'], freunde: ['more friends', 'more friends'], streit: ['less arguing', 'less arguing'], ruhe: ['calm at home', 'a calmer atmosphere at home'], druck: ['less pressure', 'less pressure'], verstanden: ['to be understood', 'more understanding'], hilfe: ['to get help', 'support'], klasse: ['a different class', 'a change of class'], schule: ['a different school', 'a change of school'], inruhe: ['to be left alone', 'more time to {himself}'] },
    // "At home, {N} is described as {liste}." -> Adjektive
    e_staerken: { hilfsbereit: ['helpful', 'helpful'], liebevoll: ['affectionate', 'affectionate'], selbststaendig: ['independent', 'independent'], kreativ: ['creative', 'creative'], humorvoll: ['good sense of humor', 'good-humored'], sportlich: ['athletic', 'athletic'], verantwortung: ['responsible', 'responsible'], offen: ['open', 'open'] },
    // "{Q} hopes that the support will bring {liste}."
    e_erwartung: { verhalten: ['better behavior', 'an improvement in behavior'], entspannung: ['calmer situation at home', 'a calmer atmosphere at home'], strategien: ['parenting strategies', 'concrete parenting strategies'], leistung: ['better performance', 'better academic performance'], abklaerung: ['assessment', 'a diagnostic assessment'], therapie: ['therapy for the child', 'therapeutic support for {Name}'], beratung: ['counseling for the parents', 'parent counseling'], foerderort: ['different setting', 'a different school placement'], verstehen: ['understanding the child', 'a better understanding of {Name}'], bestaetigung: ['guidance, reassurance', 'guidance and reassurance'] },
    // "Resources to build on include {liste}."
    ressourcen: { kognitiv: ['cognitive abilities', 'good cognitive abilities'], kreativ: ['creativity', 'creativity'], sportlich: ['sports', 'athletic ability'], musisch: ['artistic, musical', 'artistic and musical talent'], humor: ['humor', 'a sense of humor'], empathie: ['empathy', 'empathy'], neugier: ['curiosity', 'curiosity and a thirst for knowledge'], begeisterung: ['enthusiasm', 'enthusiasm'], hilfsbereit: ['helpfulness', 'helpfulness'], verantwortung: ['takes responsibility', 'a willingness to take on responsibility'], einzelbeziehung: ['one-to-one relationships', 'the ability to form relationships in one-to-one settings'], lernbereit: ['willingness to learn', 'a willingness to learn'], vertrauensperson: ['trusted adult', 'a trusted adult at school'], familie: ['supportive family', 'a supportive family'], hobbys: ['hobbies', 'stable hobbies and interests'], reflexion: ['reflective', 'the capacity for self-reflection'] },
    // Fakten
    // "The referral was prompted by {liste}."
    anlass: { verhalten_schule: ['behavior at school', 'behavioral difficulties at school'], verhalten_zuhause: ['behavior at home', 'behavioral difficulties at home'], emotional: ['emotional difficulties', 'emotional difficulties'], sozial: ['social difficulties', 'difficulties in social interaction'], leistung: ['academic performance', 'academic difficulties'], aufmerksamkeit: ['attention', 'attention and concentration difficulties'], aggression: ['aggression', 'aggressive behavior'], rueckzug: ['withdrawal', 'withdrawn behavior'], aengste: ['anxiety', 'marked anxiety'], schulverweigerung: ['school refusal', 'school refusal or absenteeism'] },
    // "The aim is to initiate {liste}."
    anliegen: { isa: ['ISA', 'a specialized ambulatory intervention (Intervention spécialisée ambulatoire, ISA)'], conseil: ['Conseil & Guidance', 'counseling and guidance (Conseil & Guidance)'], cst: ['CST', 'the admission process for the Centre socio-thérapeutique (CST)'], clapa: ['Classe de Participation', 'the admission process for a Classe de Participation'], annexe: ['Annexe Junglinster', 'the admission process for the Annexe Junglinster'], lernwerkstatt: ['Learning workshop', 'participation in the specialized learning workshop (Atelier d’apprentissage spécifique)'], beschulung: ['Specialized schooling', 'specialized schooling at the CDSE'], diagnostik: ['Diagnostic assessment', 'an in-depth diagnostic assessment'] },
    // "The request was made on the recommendation of {liste}."
    empfohlen: { lehrperson: ['Teacher', 'the teacher'], eseb: ['ESEB', 'the ESEB'], schulleitung: ['School management', 'the school management'], arzt: ['Physician', 'the treating physician'], psychologe: ['Psychologist', 'the psychologist'], eltern: ['Parents’ request', ''] },
    // "To date, {N} has been diagnosed with {liste}."
    diagnosen: { adhs: ['ADHD/ADD', 'ADHD'], ass: ['Autism spectrum', 'autism spectrum disorder'], lernstoerung: ['Learning disorder', 'a specific learning disorder'], sprachstoerung: ['Language disorder', 'a developmental language disorder'], emotional: ['Emotional disorder', 'an emotional disorder'], bindung: ['Attachment disorder', 'an attachment disorder'], angst: ['Anxiety disorder', 'an anxiety disorder'], opposition: ['Oppositional behavior', 'oppositional defiant disorder'], andere: ['Other', ''] },
    // "{liste} is/are reported as (a) stressful life event(s)."
    ereignisse: { trennung: ['Parents’ separation', 'the parents’ separation'], umzug: ['Move', 'a move'], verlust: ['Loss of an attachment figure', 'the loss of an important attachment figure'], krankheit: ['Illness in the family', 'an illness in the family'], konflikte: ['Conflict at home', 'domestic conflict'], trauma: ['Distressing experience', 'a distressing experience'], migration: ['Migration', 'the experience of migration'] },
    betreuung: { maison_relais: ['Maison Relais', ''], grosseltern: ['Grandparents', ''], tagesmutter: ['Childminder', ''], keine: ['None', ''] },
    sprachen: { lb: ['Luxembourgish', 'Luxembourgish'], de: ['German', 'German'], fr: ['French', 'French'], pt: ['Portuguese', 'Portuguese'], en: ['English', 'English'], it: ['Italian', 'Italian'], es: ['Spanish', 'Spanish'], andere: ['Other', ''] },
    // "This assessment is based on {liste}, on classroom observations …"
    verfahren: { eldib: ['ELDiB', 'the ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen, the German adaptation of the DTORF-R)'], beobachtung: ['Observation', ''], gespraeche: ['Interviews', ''], sdq: ['SDQ', 'the Strengths and Difficulties Questionnaire (SDQ)'], wisc: ['WISC-V', 'the Wechsler Intelligence Scale for Children, Fifth Edition (WISC-V)'], andere: ['Other', ''] },
    // Empfehlungen: Aufzählungspunkte
    empf_familie: { step: ['STEP parenting program (CDSE)', 'Participation in the STEP parenting program at the CDSE'], erziehungsberatung: ['Parenting counseling', 'Parenting counseling to strengthen the parents’ confidence in their parenting'], familientherapie: ['Family therapy', 'Family therapy'], tagesstruktur: ['Daily structure at home', 'A clear daily structure and reliable routines at home'], austausch: ['Contact with the school', 'Regular communication between the parents and the school'], medien: ['Rules for screen use', 'Clear, jointly agreed rules on screen time and media use'], freizeit: ['Leisure activity', 'A regular leisure activity, e.g., in a sports club or association'] },
    empf_schule: { sitzplatz: ['Seating', 'A quiet seat close to the teacher'], differenzierung: ['Differentiation', 'Differentiated, clearly structured tasks'], verstaerker: ['Reinforcement plan', 'Frequent positive feedback, if appropriate with a reinforcement plan'], regeln: ['Rules & consequences', 'A small number of clear rules with predictable consequences'], auszeit: ['Time-out/retreat', 'An agreed time-out or retreat option'], uebergaenge: ['Announcing transitions', 'Advance notice of transitions and changes'], visualisierung: ['Visual support', 'Visual support for the daily schedule and work steps'], bewegung: ['Movement breaks', 'Regular movement breaks'], iebs: ['I-EBS', 'Support from the I-EBS (specialized teacher for students with special educational needs)'], bezugsperson: ['Key adult', 'A consistent key adult at school'] },
    empf_region: { eseb: ['ESEB support', 'Continued support from the ESEB'], isa: ['ISA', 'Specialized ambulatory intervention (ISA) by the CDSE'], conseil: ['Conseil & Guidance', 'Counseling and guidance (Conseil & Guidance) by the CDSE'], lernwerkstatt: ['Learning workshop', 'Participation in the specialized learning workshop'], psychotherapie: ['Psychotherapy', 'Child and adolescent psychotherapy'], ergotherapie: ['Occupational therapy', 'Occupational therapy'], logopaedie: ['Speech therapy', 'Speech and language therapy'], psychiatrie: ['Child psychiatric assessment', 'Child and adolescent psychiatric assessment'] },
    // CNI (5.4): genau die Bezeichnungen des Deckblatts (DS_DECKBLATT.en.cni in 47-ds-assistent.js),
    // wie es die CNI-Vorlage verlangt; Unterpunkte der Beschulung wie im Deutschen mit Präfix
    cni: { diag_kompetenzzentrum: ['Diagnostics with a competence center', 'Specialized diagnostic assessment in cooperation with a competence center'], beratung_eltern: ['Counseling for parents and student', 'Counseling and guidance for the parents and the student'], beratung_fachleute: ['Counseling for professionals', 'Counseling and guidance for professionals'], lernwerkstatt: ['Learning workshop', 'Specialized learning workshop (Atelier d’apprentissage spécifique)'], isa: ['ISA', 'Specialized ambulatory intervention (ISA)'], beschulung: ['Schooling at the CDSE', 'Specialized schooling at the CDSE'], clapa: ['Classe de Participation', 'Specialized schooling at the CDSE – Classe de Participation'], cst: ['CST', 'Specialized schooling at the CDSE – Centre socio-thérapeutique (CST)'], annexe: ['Annexe Junglinster', 'Specialized schooling at the CDSE – Annexe Junglinster'], ausland: ['Schooling abroad', 'Specialized schooling abroad'], rehabilitation: ['Rehabilitation', 'Rehabilitation'], abschluss: ['End of CDSE support', 'End of CDSE support'], schliessung: ['Closure of the file', 'Closure of the CDSE file'] }
  },

  // Rahmensätze
  s: {
    liste_und: 'and', liste_oder: 'or', liste_sowie: 'as well as',
    schule_intro: 'The following account is based on an interview with {QSd}{datum: on {datum}}.',
    schule_staerken: '{N} is described as {liste}.',
    schule_hilft: 'Strategies that have proven helpful include {liste}.',
    schule_erwartung: 'The school hopes that the CDSE’s involvement will lead to {liste}.',
    schule_ohne: 'From the school’s perspective, there are no indications of {liste}.',
    kind_intro: '{Name} was interviewed{datum: on {datum}}.',
    kind_interessen: 'Among {his} interests, {N} mentions {liste}.',
    kind_wuensche: 'For the future, {N} wishes for {liste}.',
    kind_vertrauen: '{N} names {text} as a trusted adult at school.',
    kind_ohne: 'The interview gave no indications of {liste}.',
    eltern_intro: '{datum: On {datum}, }an interview was held with {Qd}.',
    eltern_staerken: 'At home, {N} is described as {liste}.',
    eltern_erwartung: '{Q} {{hopes|hope}} that the support will bring {liste}.',
    eltern_ohne: 'The parent interview gave no indications of {liste}.',
    beob_ohne: 'No signs of {liste} were observed.',
    beob_eine: 'An observation was carried out {beob}.',
    beob_mehrere: 'Observations were carried out {beob}.',
    beob_eintrag: '{datum: on {datum}}{ort: {ort}}{dauer: ({dauer} minutes)}',
    // Interpretation
    muster_stark: 'The difficulties occur mainly {liste}.',
    muster_mittel: 'Difficulties frequently arise {liste}.',
    muster_mittel_nach: 'They also frequently occur {liste}.',
    aengste_stark: 'From a Developmental Therapy perspective, there are clear indications of {liste}.',
    aengste_mittel: 'From a Developmental Therapy perspective, there are indications of {liste}.',
    aengste_beide: 'From a Developmental Therapy perspective, there are clear indications of {stark}, and to some extent also of {mittel}.',
    abwehr_stark: 'The predominant defense {{mechanism is|mechanisms are}} {liste}.',
    abwehr_mittel: 'At times, {liste} {{serves|serve}} as {{a defense mechanism|defense mechanisms}}.',
    abwehr_beide: 'The predominant defense {{mechanism is|mechanisms are}} {stark}, and to a lesser extent also {mittel}.',
    abwehr_bezug_stark: 'To defend against {{this anxiety|these anxieties}}, {N} mainly resorts to {stark}.',
    abwehr_bezug_beide: 'To defend against {{this anxiety|these anxieties}}, {N} mainly resorts to {stark}, and to a lesser extent to {mittel}.',
    abwehr_bezug_mittel: 'To defend against {{this anxiety|these anxieties}}, {N} at times resorts to {mittel}.',
    hyp_stark: 'The difficulties described can most plausibly be understood as reflecting {liste}.',
    hyp_mittel: 'In addition, {liste} may play a role.',
    hyp_nur_mittel: '{{A possible explanation is|Possible explanations are}} {liste}.',
    hyp_trauma: 'Whether adverse experiences are a contributing factor should be clarified through further specialist assessment.',
    // Bedürfnisse, Ressourcen
    beduerfnis_stark: 'Above all, {N} needs {liste}.',
    beduerfnis_mittel: '{N} would also benefit from {liste}.',
    beduerfnis_nur_mittel: '{N} would benefit from {liste}.',
    ressourcen: 'Resources to build on include {liste}.'
  },

  // Beschriftungen der Oberfläche
  ui: {
    titel: 'Specialized Diagnostic (DS)', untertitel: 'Step by step to the finished report',
    schritte: { stamm: 'Student & report', auftrag: 'Referral', vorgeschichte: 'Background', familie: 'Family', aktuell: 'Current situation', schule: 'School’s perspective', kind: 'Student’s perspective', eltern: 'Parents’ perspective', beobachtung: 'Observation', eldib: 'ELDiB results', deutung: 'Interpretation', beduerfnisse: 'Needs & resources', empfehlungen: 'Recommendations', vorschau: 'Preview & export' },
    themen: {
      'schule.lernen': 'Learning and work habits', 'schule.verhalten': 'Behavior and emotions', 'schule.beziehung': 'Relationships',
      'kind.schule': 'School', 'kind.selbst': 'Self-image and well-being', 'kind.umfeld': 'Friends and family',
      'eltern.alltag': 'Everyday life at home', 'eltern.familie': 'Family and parenting', 'eltern.zusammenarbeit': 'Cooperation',
      'beobachtung.arbeit': 'Work behavior', 'beobachtung.verhalten': 'Behavior', 'beobachtung.kontakt': 'Social contact',
      'deutung.quellen': 'Comparing the information', 'deutung.muster': 'When do the difficulties occur?', 'deutung.aengste': 'Developmental anxieties (indications)', 'deutung.abwehr': 'Defense mechanisms (how pronounced?)', 'deutung.hypothesen': 'Possible explanations (how likely?)',
      'beduerfnisse.beduerfnisse': 'What does the student need? (how important?)'
    },
    chipTitel: { s_staerken: 'Strengths from the school’s perspective', s_hilft: 'What helps in class?', s_erwartung: 'What does the school hope for?', k_interessen: 'Interests and hobbies', k_wuensche: 'What does the student wish for?', e_staerken: 'Strengths from the parents’ perspective', e_erwartung: 'What do the parents hope for?', ressourcen: 'The student’s resources' }
  }
};

// ==== 45b-ds-fakten-en.js ====
// =====================================================================
// DS-Baukasten: englische Faktenabschnitte (Auftrag, Vorgeschichte, Familie,
// aktuelle Situation, Verfahren, ELDiB, Schluss, Ziele, Empfehlungen, CNI)
// Gleiche Funktionen, Signaturen und Blocktypen wie 43b-ds-fakten-de.js.
// h = Hilfsfunktionen aus DsText (fuelle, satz, liste, chips, …);
// Datum immer mit h.datum(iso, 'en').
// ELDiB-Codes erscheinen wie in der englischen App (getDisplayCode):
// V -> BEH, K -> COM, SOZ -> SOC, KOG -> COG (z. B. "COM-17").
// =====================================================================
DS_TEXTE.en.s.das_kind = 'the student';
DS_TEXTE.en.s.vorschau_ohne = 'Mentioned in the report in the list “no indications of …”: {liste}.';
DS_TEXTE.en.quellen = {
  // n = Subjekt/Objekt ("the class teacher"), d = nach "with" (hier gleich)
  schule: {
    lehrperson: { n: 'the teacher', d: 'the teacher', label: 'Teacher' },
    lehrerin: { n: 'the class teacher', d: 'the class teacher', label: 'Class teacher (female)' },
    lehrer: { n: 'the class teacher', d: 'the class teacher', label: 'Class teacher (male)' },
    team: { n: 'the teaching team', d: 'the teaching team', label: 'Teaching team' },
    eseb: { n: 'the ESEB specialist', d: 'the ESEB specialist', label: 'ESEB specialist' }
  },
  // g = Genitiv für {Qg} ("the mother’s"; derzeit in keinem Rahmensatz benutzt); zahl steuert {{is|are}}
  eltern: {
    eltern: { n: 'the parents', d: 'the parents', g: 'the parents’', zahl: 2, label: 'Both parents' },
    mutter: { n: 'the mother', d: 'the mother', g: 'the mother’s', zahl: 1, label: 'Mother' },
    vater: { n: 'the father', d: 'the father', g: 'the father’s', zahl: 1, label: 'Father' },
    pflegeeltern: { n: 'the foster parents', d: 'the foster parents', g: 'the foster parents’', zahl: 2, label: 'Foster parents' },
    grosseltern: { n: 'the grandparents', d: 'the grandparents', g: 'the grandparents’', zahl: 2, label: 'Grandparents' }
  }
};
DS_TEXTE.en.optionen = {
  auftraggeber: { cni: ['CNI', 'the Commission nationale d’inclusion (National Inclusion Commission, CNI)'], eseb: ['ESEB', 'the ESEB'], schule: ['School', 'the school'], eltern: ['Parents', 'the parents'] },
  verlauf: { unauffaellig: 'uneventful', komplikationen: 'with complications', unbekannt: 'unknown' },
  entwicklung: { altersgerecht: 'age-appropriate', verzoegert: 'delayed', unbekannt: 'unknown' },
  familienstand: { zusammen: 'living together', getrennt: 'separated', alleinerziehend: 'single parent', patchwork: 'blended family', verstorben: 'one parent deceased' },
  lebt_bei: { beide: ['with both parents', 'lives with both parents'], mutter: ['with the mother', 'lives with {his} mother'], vater: ['with the father', 'lives with {his} father'], wechsel: ['alternating residence', 'lives alternately with each parent'], grosseltern: ['with the grandparents', 'lives with {his} grandparents'], pflege: ['in a foster family', 'lives with a foster family'], heim: ['in a residential group', 'lives in a residential care group'] },
  kontakt: { regelmaessig: 'There is regular contact with both parents.', eingeschraenkt_vater: 'Contact with the father is limited.', eingeschraenkt_mutter: 'Contact with the mother is limited.', kein_vater: 'There is no contact with the father.', kein_mutter: 'There is no contact with the mother.' },
  position: { aeltestes: 'the oldest child', mittleres: 'a middle child', juengstes: 'the youngest child' },
  arbeitszeit: { vollzeit: 'full-time', teilzeit: 'part-time', nicht: '' },
  setting: { klasse: 'during whole-class instruction', kleingruppe: 'in a small group', einzel: 'in a one-to-one setting', pause: 'during recess', maison: 'at the Maison Relais', sport: 'during physical education' },
  abgestimmt: { ja: 'Yes, fully agreed', vorbehalte: 'Yes, with reservations', nein: 'No' },
  stufeAlter: { 1: '0–2 years', 2: '2–5 years', 3: '6–9 years', 4: '10–12 years', 5: '13–16 years' }
};

DS_TEXTE.en.fakten = (function () {
  const O = DS_TEXTE.en.optionen;
  const roem = function (n) { return ['', 'I', 'II', 'III', 'IV', 'V'][n] || String(n); };
  // kleine Zahlen im Text ausgeschrieben ("two siblings")
  const ZAHLWORT = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  // Anzeige-Codes der englischen App; unbekannte Codes bleiben unverändert
  const CODES = { V: 'BEH', K: 'COM', SOZ: 'SOC', KOG: 'COG' };
  function code(k) {
    const t = String(k || '').split('-');
    if (CODES[t[0]]) { t[0] = CODES[t[0]]; }
    return t.join('-');
  }
  // Verb in der 3. Person Singular ("Shows", "Uses", "Is") – nicht "Class", "Access"
  function verb3(w) { return /^(Is|Has|Does)$/i.test(w) || /^[A-Za-z][a-z]*[a-rt-z]s$/.test(w || ''); }
  // ELDiB-Beschreibung (englische Daten, DTORF-R-Stil) als Satzteil nach dem Namen:
  // "Describes own experiences." -> "describes {his} own experiences"
  // "Responds on their own …" -> "responds on {his} own …"; auch "Actively participates …".
  // Nominalformen ("Motor skills of a 3-year-old.") -> '' (werden nicht umgeformt).
  function praedikat(d) {
    d = String(d || '').trim().replace(/\.$/, '');
    const w = d.split(/\s+/);
    const adverb = /^[A-Z][a-z]+ly$/.test(w[0]) && w.length > 1;
    if (!(adverb ? verb3(w[1]) : verb3(w[0]))) { return ''; }
    let p = persoenlich(d.charAt(0).toLowerCase() + d.slice(1));
    // "own" ohne Possessiv davor ("for own behavior") -> "for {his} own behavior"
    p = p.replace(/(\S+)(\s+)own\b/g, function (m, vor, ws) {
      return /^(\{his\}|his|her|its|my|your|our|one[’']s)$/i.test(vor) ? m : vor + ws + '{his} own';
    });
    return p;
  }
  // neutrales "their/themselves" der Itemtexte auf das Kind beziehen
  function persoenlich(d) {
    return String(d || '').replace(/\btheir own\b/g, '{his} own').replace(/\bthemselves\b/g, '{himself}').replace(/\btheir\b/g, '{his}').replace(/\bof self(?![\w-])/g, 'of {himself}');
  }
  // Grundform für Zielsätze: "participates in …" -> "participate in …" ("{Name} will …")
  function basis(v) {
    const u = { is: 'be', has: 'have', does: 'do', goes: 'go' };
    if (u[v]) { return u[v]; }
    if (/[^aeiou]ies$/.test(v)) { return v.slice(0, -3) + 'y'; }
    if (/(ss|sh|ch|x|zz|o)es$/.test(v)) { return v.slice(0, -2); }
    return v.replace(/s$/, '');
  }
  function grundform(d) {
    const p = praedikat(d);
    if (!p) { return ''; }
    const w = p.split(' ');
    const i = (/ly$/.test(w[0]) && w.length > 1) ? 1 : 0;
    w[i] = basis(w[i]);
    // zwei Verben: "adds and subtracts" -> "add and subtract"
    if (w[i + 1] === 'and' && verb3(w[i + 2])) { w[i + 2] = basis(w[i + 2]); }
    return w.join(' ');
  }
  // Ziele ohne Verb ("Motor skills of a 5-year-old.", "Eye-hand coordination at age 6.") als "{Name} will develop …"
  function zielNomen(d, c, h) {
    d = persoenlich(d).trim().replace(/\.$/, '');
    let m = /^((?:Fine )?[Mm]otor skills) of an? (\d+)-year-old$/.exec(d);
    if (m) { return h.satz(h.fuelle('{Name} will develop the ' + m[1].toLowerCase() + ' of a ' + m[2] + '-year-old', c), c); }
    m = /^Eye-hand coordination at age (\d+)$/.exec(d);
    if (m) { return h.satz(h.fuelle('{Name} will develop eye-hand coordination at the level expected at age ' + m[1], c), c); }
    return h.fuelle(d, c);
  }
  // Artikel vor frei eingegebenem Beruf: "as a nurse", "as an engineer"
  function mitArtikel(b) {
    if (/^(a|an|the)\s/i.test(b) || /^(self-employed|freelance|retired|unemployed)/i.test(b)) { return b; }
    return (/^[aeio]/i.test(b) ? 'an ' : 'a ') + b;
  }
  // Stufe mit Richtziel und Alter: (“Acquiring skills …”, 6–9 years)
  function klammer(x) {
    const teile = [x.richtziel ? '“' + x.richtziel + '”' : '', O.stufeAlter[x.stufe] || ''].filter(Boolean);
    return teile.length ? ' (' + teile.join(', ') + ')' : '';
  }
  const KOPF = ['Period', 'Class', 'Measure', 'Provider'];

  return {
    auftrag: function (c, ds, st, h) {
      const f = ds.f || {}, s = [];
      c.neuerAbsatz();
      const wer = (O.auftraggeber[f.auftraggeber || 'cni'] || O.auftraggeber.cni)[1];
      const wer2 = f.auftraggeber === 'andere' && h.frei(ds, 'auftraggeber_andere') ? h.frei(ds, 'auftraggeber_andere') : wer;
      // ohne Namen bleibt {Vollname} leer -> dann "the student"
      s.push(h.satz(h.fuelle('The Centre pour le développement socio-émotionnel (Centre for Socio-Emotional Development, CDSE) was commissioned by {wer}{datum: on {datum}} to carry out a specialized diagnostic assessment of ' + (c.vollname ? '{Vollname}' : '{Name}') + ' in order to determine {his} current level of socio-emotional development and {his} special educational needs.', c, { datum: h.datum(f.auftrag_datum, 'en'), wer: wer2 }), c));
      // beide Verhaltens-Chips zusammenfassen: "behavioral difficulties at school and at home"
      const ak = h.chips(ds, 'anlass'), beide = ak.indexOf('verhalten_schule') >= 0 && ak.indexOf('verhalten_zuhause') >= 0;
      const anl = ak.filter(function (k) { return !(beide && k === 'verhalten_zuhause'); }).map(function (k) { return beide && k === 'verhalten_schule' ? 'behavioral difficulties at school and at home' : h.chipText(c, 'anlass', k); });
      if (h.frei(ds, 'anlass_andere')) { anl.push(h.frei(ds, 'anlass_andere')); }
      if (anl.length) { s.push(h.satz(h.fuelle('The referral was prompted by {liste}.', c, { liste: h.liste(anl, c) }), c)); }
      const anl2 = h.chips(ds, 'anliegen').map(function (k) { return h.chipText(c, 'anliegen', k); });
      if (anl2.length) { s.push(h.satz(h.fuelle('The aim is to initiate {liste}.', c, { liste: h.liste(anl2, c) }), c)); }
      const emp = h.chips(ds, 'empfohlen').filter(function (k) { return k !== 'eltern'; }).map(function (k) { return h.chipText(c, 'empfohlen', k); });
      const wunsch = h.chips(ds, 'empfohlen').indexOf('eltern') >= 0;
      // "auf Wunsch der Eltern": mit der Eltern-Quelle ({Qd}), damit z. B. eine alleinerziehende Mutter nicht zu "the parents" wird
      if (emp.length && wunsch) { s.push(h.satz(h.fuelle('The request was made at the wish of {Qd} and on the recommendation of {liste}.', c, { liste: h.liste(emp, c) }), c)); }
      else if (emp.length) { s.push(h.satz(h.fuelle('The request was made on the recommendation of {liste}.', c, { liste: h.liste(emp, c) }), c)); }
      else if (wunsch) { s.push(h.satz(h.fuelle('The request was made at the wish of {Qd}.', c), c)); }
      const b = [h.block(s.join(' '))];
      return b.concat(h.freiBloecke(ds, 'anlass_details'));
    },

    vorgeschichte: function (c, ds, st, h) {
      const f = ds.f || {}, s = [], b = [];
      c.neuerAbsatz();
      // Schwangerschaft und Geburt
      const sg = f.schwangerschaft, gb = f.geburt;
      if (sg === 'unauffaellig' && gb === 'unauffaellig') { s.push(h.satz(h.fuelle('According to {Q}, the pregnancy and birth were uneventful.', c), c)); }
      else {
        if (sg === 'unauffaellig') { s.push('The pregnancy was uneventful.'); }
        if (sg === 'komplikationen') { s.push(h.satz(h.fuelle('There were complications during pregnancy{d: ({d})}.', c, { d: h.frei(ds, 'schwangerschaft_details') }), c)); }
        if (gb === 'unauffaellig') { s.push('The birth was uneventful.'); }
        if (gb === 'komplikationen') { s.push(h.satz(h.fuelle('There were complications at birth{d: ({d})}.', c, { d: h.frei(ds, 'geburt_details') }), c)); }
      }
      // Motorik und Sprache
      const mo = f.motorik, sp = f.sprache;
      const worte = f.erste_worte ? ' (first words at around ' + f.erste_worte + ' months)' : '';
      if (mo === 'altersgerecht' && sp === 'altersgerecht') { s.push('Motor and language development were age-appropriate' + worte + '.'); }
      else if (mo === 'altersgerecht' && sp === 'verzoegert' && !h.frei(ds, 'sprache_details')) { s.push('Motor development was age-appropriate, while language development was delayed' + worte + '.'); }
      else if (mo === 'verzoegert' && sp === 'altersgerecht' && !h.frei(ds, 'motorik_details')) { s.push('Language development was age-appropriate' + worte + ', while motor development was delayed.'); }
      else {
        if (mo === 'altersgerecht') { s.push('Motor development was age-appropriate.'); }
        if (mo === 'verzoegert') { s.push(h.satz(h.fuelle('Motor development was delayed{d: ({d})}.', c, { d: h.frei(ds, 'motorik_details') }), c)); }
        if (sp === 'altersgerecht') { s.push('Language development was age-appropriate' + worte + '.'); }
        if (sp === 'verzoegert') { s.push(h.satz(h.fuelle('Language development was delayed' + worte + '{d:; {d}}.', c, { d: h.frei(ds, 'sprache_details') }), c)); }
      }
      // Diagnosen
      const dg = h.chips(ds, 'diagnosen').map(function (k) {
        const name = k === 'andere' ? h.frei(ds, 'diagnose_andere') : h.chipText(c, 'diagnosen', k);
        const det = ds.f && ds.f.diagnosen_details && ds.f.diagnosen_details[k];
        return name ? name + (det ? ' (' + det + ')' : '') : '';
      }).filter(Boolean);
      if (dg.length) { s.push(h.satz(h.fuelle('To date, {N} has been diagnosed with {liste}.', c, { liste: h.liste(dg, c), zahl: dg.length }), c)); }
      else if (f.keine_diagnosen) { s.push('No diagnoses have been made to date.'); }
      if (s.length) { b.push(h.block(s.join(' '))); }
      const rows = ((ds.tabellen && ds.tabellen.vorgeschichte) || []).filter(function (r) { return r && (r.zeitraum || r.massnahme || r.akteur); });
      if (rows.length) {
        b.push(h.block('Previous school-based and out-of-school support measures:'));
        b.push({ typ: 'tabelle', id: 'vorgeschichte', kopf: KOPF.slice(), zeilen: rows.map(function (r) { return [r.zeitraum || '', r.klasse || '', r.massnahme || '', r.akteur || '']; }) });
      }
      return b.concat(h.freiBloecke(ds, 'vorgeschichte'));
    },

    sozialbericht: function (c, ds, st, h) {
      const f = ds.f || {}, s = [];
      c.neuerAbsatz();
      const lb = O.lebt_bei[f.lebt_bei], fs = f.familienstand, wo = f.lebt_bei;
      const stand = { getrennt: '{Name}’s parents are separated', zusammen: '{Name}’s parents live together', alleinerziehend: wo === 'vater' ? '{Name}’s father is a single parent' : '{Name}’s mother is a single parent', patchwork: '{Name} is growing up in a blended family', verstorben: 'One of {Name}’s parents has died' }[fs];
      if (fs === 'alleinerziehend' && (wo === 'mutter' || wo === 'vater')) { s.push(h.satz(h.fuelle('{Name} lives with {his} ' + (wo === 'vater' ? 'father' : 'mother') + ', who is a single parent.', c), c)); }
      else if (stand && lb && !(fs === 'zusammen' && wo === 'beide')) { s.push(h.satz(h.fuelle(stand + '; [[he|she]] ' + lb[1] + '.', c), c)); }
      else if (stand && fs === 'zusammen' && wo === 'beide') { s.push(h.satz(h.fuelle('{Name} lives with both parents.', c), c)); }
      else if (stand) { s.push(h.satz(h.fuelle(stand + '.', c), c)); }
      else if (lb) { s.push(h.satz(h.fuelle('{N} ' + lb[1] + '.', c), c)); }
      if (O.kontakt[f.kontakt]) { s.push(O.kontakt[f.kontakt]); }
      if (h.frei(ds, 'kontakt_details')) { s.push(h.satz(h.frei(ds, 'kontakt_details'), c)); }
      const n = parseInt(f.geschwister_anzahl, 10);
      if (n === 0) { s.push(h.satz(h.fuelle('{N} is an only child.', c), c)); }
      else if (n > 0) {
        const pk = f.geschwister_position, pos = O.position[pk];
        let t;
        if (n === 1 && pk === 'aeltestes') { t = '{N} has a younger sibling.'; }
        else if (n === 1 && pk === 'juengstes') { t = '{N} has an older sibling.'; }
        else { t = '{N} has ' + (n === 1 ? 'one sibling' : (ZAHLWORT[n] || String(n)) + ' siblings') + (pos && n > 1 ? ' and is ' + pos : '') + '.'; }
        s.push(h.satz(h.fuelle(t, c), c));
      }
      const sp = h.chips(ds, 'sprachen').map(function (k) { return k === 'andere' ? h.frei(ds, 'sprache_andere') : h.chipText(c, 'sprachen', k); }).filter(Boolean);
      if (sp.length) { s.push(h.satz(h.fuelle('The family speaks {liste} at home.', c, { liste: h.liste(sp, c) }), c)); }
      // Beruf der Eltern; Freitext wird nicht durch fuelle geschickt
      const sein = h.fuelle('{his}', c);
      const beruf = function (wer, b, z) {
        if (z === 'nicht') { return wer + ' is not currently employed'; }
        if (!b && !z) { return ''; }
        return wer + ' works' + (O.arbeitszeit[z] ? ' ' + O.arbeitszeit[z] : '') + (b ? ' as ' + mitArtikel(b) : '');
      };
      const bm = beruf(sein + ' mother', h.frei(ds, 'beruf_mutter'), f.zeit_mutter), bv = beruf(sein + ' father', h.frei(ds, 'beruf_vater'), f.zeit_vater);
      if (bm && bv) { s.push(h.satz(bm + '; ' + bv + '.', c)); } else if (bm || bv) { s.push(h.satz((bm || bv) + '.', c)); }
      const ev = h.chips(ds, 'ereignisse').map(function (k) {
        const det = ds.f && ds.f.ereignis_details && ds.f.ereignis_details[k];
        return h.chipText(c, 'ereignisse', k) + (det ? ' (' + det + ')' : '');
      });
      if (ev.length) { s.push(h.satz(h.fuelle('{liste} {{is|are}} reported as {{a stressful life event|stressful life events}}.', c, { liste: h.liste(ev, c), zahl: ev.length }), c)); }
      const bt = h.chips(ds, 'betreuung');
      if (bt.indexOf('maison_relais') >= 0) { s.push(h.satz(h.fuelle('After school, {N} attends the Maison Relais.', c), c)); }
      const gr = bt.indexOf('grosseltern') >= 0, tm = bt.indexOf('tagesmutter') >= 0;
      if (gr && tm) { s.push(h.satz(h.fuelle('Outside school hours, {N} is looked after by {his} grandparents and by a childminder.', c), c)); }
      else if (gr) { s.push(h.satz(h.fuelle('Outside school hours, {N} is regularly looked after by {his} grandparents.', c), c)); }
      else if (tm) { s.push(h.satz(h.fuelle('Outside school hours, {N} is looked after by a childminder.', c), c)); }
      if (h.frei(ds, 'freizeit')) { s.push(h.satz(h.frei(ds, 'freizeit'), c)); }
      return (s.length ? [h.block(s.join(' '))] : []).concat(h.freiBloecke(ds, 'familie'));
    },

    aktuell: function (c, ds, st, h) {
      const f = ds.f || {};
      c.neuerAbsatz();
      const klasse = f.klasse || (st && st.klasse) || '', schule = f.schule_name || (st && st.foerderort) || '';
      const s = [];
      if (klasse || schule) {
        const lp = h.frei(ds, 'lehrperson');
        let t = '{N} currently attends ' + (klasse ? 'class {klasse}' + (schule ? ' at {schule}' : '') : '{schule}');
        if (lp) { t += ', where {his} class teacher is {lp}'; }
        s.push(h.satz(h.fuelle(t + '.', c, { klasse: klasse, schule: schule, lp: lp }), c));
      }
      if (h.frei(ds, 'eseb_referenz')) { s.push(h.satz(h.fuelle('{his} reference person at the ESEB is {x}.', c, { x: h.frei(ds, 'eseb_referenz') }), c)); }
      const b = (s.length ? [h.block(s.join(' '))] : []).concat(h.freiBloecke(ds, 'aktuell'));   // eigene Ergänzung
      const rows = ((ds.tabellen && ds.tabellen.aktuell) || []).filter(function (r) { return r && (r.zeitraum || r.massnahme || r.akteur); });
      if (rows.length) { b.push({ typ: 'tabelle', id: 'aktuell', kopf: KOPF.slice(), zeilen: rows.map(function (r) { return [r.zeitraum || '', r.klasse || '', r.massnahme || '', r.akteur || '']; }), abschnitt: 'massnahmen' }); }
      return b;
    },

    verfahren: function (c, ds, st, h) {
      c.neuerAbsatz();
      const v = h.chips(ds, 'verfahren').filter(function (k) { return k !== 'andere' && h.chipText(c, 'verfahren', k); }).map(function (k) { return h.chipText(c, 'verfahren', k); });
      if (h.frei(ds, 'verfahren_andere')) { v.push(h.frei(ds, 'verfahren_andere')); }
      if (!v.length) { v.push(h.chipText(c, 'verfahren', 'eldib')); }
      // Beobachtung und Gespräche nur nennen, wenn dazu Angaben vorliegen (sonst nichts erfinden)
      const gespr = [['schule', '{QSd}'], ['eltern', '{Qd}'], ['kind', '{Name} {himself}']].filter(function (x) { return h.angaben(x[0]); }).map(function (x) { return x[1]; });
      const teile = ['on {liste}'];
      if (h.angaben('beobachtung') || h.chips(ds, 'verfahren').indexOf('beobachtung') >= 0) { teile.push('on classroom observations'); }
      if (gespr.length) { teile.push('on interviews with ' + h.liste(gespr, c)); } else if (h.chips(ds, 'verfahren').indexOf('gespraeche') >= 0) { teile.push('on interviews'); }
      const s = [h.satz(h.fuelle('This assessment is based ' + (teile.length > 1 ? teile.slice(0, -1).join(', ') + ' and ' + teile[teile.length - 1] : teile[0]) + '.', c, { liste: h.liste(v, c) }), c)];
      if (h.frei(ds, 'verfahren_ort')) { s.push(h.satz(h.fuelle('Observations and interviews took place in {ort}.', c, { ort: h.frei(ds, 'verfahren_ort') }), c)); }
      return [h.block(s.join(' '))];
    },

    beobachtungIntro: function (c, ds, st, h) {
      const l = ((ds.f && ds.f.beobachtungen) || []).filter(function (b) { return b && (b.datum || b.setting || b.dauer); });
      if (!l.length) { return []; }
      c.neuerAbsatz();
      const T = DS_TEXTE.en.s;
      const teile = l.map(function (b) {
        return h.fuelle(T.beob_eintrag, c, { datum: h.datum(b.datum, 'en'), ort: O.setting[b.setting] || b.setting_andere || '', dauer: b.dauer ? String(b.dauer) : '' }).trim();
      });
      return [h.block(h.satz(h.fuelle(l.length > 1 ? T.beob_mehrere : T.beob_eine, c, { beob: h.liste(teile, c) }), c))];
    },

    eldib: function (c, ds, st, h, profil) {
      const b = [];
      c.neuerAbsatz();
      b.push(h.block('The ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen), the German adaptation of the Developmental Teaching Objectives Rating Form – Revised (DTORF-R), is a standardized rating instrument designed to assess the social and emotional development of children and adolescents from birth to the age of sixteen. It provides a profile of specific skills that serve as indicators of the level of social and emotional competence.'));
      const bereiche = (profil && profil.bereiche) || [];
      const mitStufe = bereiche.filter(function (x) { return x.stufe > 0; });
      bereiche.forEach(function (x) {
        c.neuerAbsatz();
        const s = [];
        const v = { bereich: x.name, code: code(x.code), stufe: roem(x.stufe), klammer: klammer(x) };
        if (!x.stufe) { s.push(h.satz(h.fuelle('In the {bereich} domain ({code}), no items have yet been rated as mastered.', c, v), c)); }
        else if (mitStufe.length > 1 && x === mitStufe[0]) { s.push(h.satz(h.fuelle('{Name} is most advanced in the {bereich} domain ({code}), where [[he|she]] is functioning at developmental Stage {stufe}{klammer}.', c, v), c)); }
        else if (mitStufe.length > 1 && x === mitStufe[mitStufe.length - 1]) { s.push(h.satz(h.fuelle('The least developed domain is {bereich} ({code}), where {N} is functioning at developmental Stage {stufe}{klammer}.', c, v), c)); }
        else { s.push(h.satz(h.fuelle('In the {bereich} domain ({code}), {N} is functioning at developmental Stage {stufe}{klammer}.', c, v), c)); }
        // die zwei zuletzt erreichten Fähigkeiten, mit unterschiedlichem Verb
        const pr = [], verben = {};
        (x.erreicht || []).slice().reverse().forEach(function (it) {
          const p = praedikat(it.description), w = p.split(' ')[0];
          if (p && pr.length < 2 && !verben[w]) { verben[w] = 1; pr.unshift(h.fuelle(p, c)); }
        });
        // enthält ein Beispiel schon "and" ("multiplies and divides"), zwei Satzteile: ", and she …"
        const pv = pr.length === 2 && pr.some(function (x) { return / and /.test(x); }) ? pr[0] + ', and ' + h.fuelle('[[he|she]] ', c) + pr[1] : h.liste(pr, c, false, true);
        if (pr.length) { s.push(h.satz(h.fuelle('{N} has already acquired solid skills in this domain; for example, [[he|she]] {p}.', c, { p: pv }), c)); }
        const extra = ds.frei && ds.frei['eldib_' + x.id];
        if (extra && String(extra).trim()) { s.push(String(extra).trim()); }
        b.push(h.block(s.join(' ')));
        if ((x.ziele || []).length) {
          b.push(h.block(h.satz(h.fuelle('Based on the stage objective, the following learning goals have been set for {Nt}:', c), c)));
          b.push({ typ: 'liste', punkte: x.ziele.map(function (z) { return code(z.code) + ' – ' + h.fuelle(persoenlich(z.description).replace(/\.$/, ''), c); }) });
        } else if (x.stufe) {
          b.push(h.block('No learning goals have been set in this domain.'));
        }
      });
      if (profil && profil.lebensalter != null && mitStufe.length) {
        c.neuerAbsatz();
        const erw = profil.erwarteteStufe, unter = mitStufe.filter(function (x) { return x.stufe < erw; });
        const v = { roem: roem(erw), alter: O.stufeAlter[erw] || '', jahre: profil.lebensalter };
        const erwartet = 'Given a chronological age of {jahre} years, developmental Stage {roem}{alter: ({alter})} would be expected; ';
        let t;
        if (unter.length === bereiche.length) { t = erwartet + 'all ' + (ZAHLWORT[bereiche.length] || bereiche.length) + ' domains fall below this level.'; }
        else if (unter.length === 1) { t = erwartet + 'the {liste} domain falls below this level.'; v.liste = unter[0].name; }
        else if (unter.length) { t = erwartet + 'the {liste} domains fall below this level.'; v.liste = h.liste(unter.map(function (x) { return x.name; }), c); }
        else { t = 'In all domains assessed, {N} is functioning at least at the age-appropriate developmental Stage {roem}{alter: ({alter})}.'; }
        b.push(h.block(h.satz(h.fuelle(t, c, v), c)));
      }
      return b;
    },

    schluss: function (c, ds, st, h) {
      const f = ds.f || {};
      c.neuerAbsatz();
      // ab etwa 12 Jahren wird das Kind in die Abstimmung einbezogen (Vorlage CNI)
      const mitKind = c.alter != null && c.alter >= 12;
      // das Kind zuletzt nennen, damit sich "her/his" eindeutig auf das Kind bezieht (nicht auf "the mother")
      const wer = mitKind ? '{Qd} and with {Name} {himself}' : '{Qd}';
      const ihre = mitKind ? '{his}' : '{Name}’s';
      let t;
      if (f.abgestimmt === 'vorbehalte') {
        t = 'Based on the available test results, observations and case history information, specific support needs were identified. In discussions with ' + wer + ', recommendations were developed to further support ' + ihre + ' individual development. Some of the proposed measures were, however, questioned or not fully endorsed by ' + (mitKind ? '{Qd} and/or by {Name}' : '{Qd}') + '.';
      } else if (f.abgestimmt === 'nein') {
        t = 'Based on the available test results, observations and case history information, specific support needs were identified and recommendations formulated. It has not yet been possible to agree on these recommendations with ' + wer + '.';
      } else if (f.abgestimmt === 'ja') {
        t = 'Based on the test results, observations and case history information gathered, specific support needs were identified in close consultation with ' + wer + '. On this basis, recommendations were jointly formulated to support ' + ihre + ' individual development effectively.';
      } else {
        // keine Angabe zur Abstimmung: keine Abstimmung behaupten
        t = 'Based on the test results, observations and case history information gathered, specific support needs were identified. On this basis, recommendations were formulated to support {Name}’s individual development effectively.';
      }
      return [h.block(h.satz(h.fuelle(t, c), c))].concat(h.freiBloecke(ds, 'vorbehalte'));
    },

    ziele: function (c, ds, st, h, profil) {
      const f = ds.f || {}, b = [];
      c.neuerAbsatz();
      const ziele = [];
      ((profil && profil.bereiche) || []).forEach(function (x) { (x.ziele || []).forEach(function (z) { ziele.push({ z: z, x: x }); }); });
      const bis = f.ziele_bis ? 'until ' + h.datum(f.ziele_bis, 'en') : 'until the end of the next ' + ((st && st.periodenTyp) === 'semester' ? 'semester' : 'trimester');
      if (ziele.length) {
        b.push(h.block(h.satz(h.fuelle('The following support goals are derived from the ELDiB learning goals. Each goal describes the next developmental step; progress will be monitored in everyday situations {bis} and reviewed at the next ELDiB assessment.', c, { bis: bis }), c)));
        b.push({ typ: 'liste', punkte: ziele.map(function (e) {
          c.neuerAbsatz();
          // "Participates in group discussions." -> "Tom will participate in group discussions"
          const g = grundform(e.z.description);
          const text = g ? h.satz(h.fuelle('{Name} will ' + g, c), c) : zielNomen(e.z.description, c, h);
          return text + ' (' + code(e.z.code) + ')';
        }) });
      }
      const zus = h.frei(ds, 'ziele_zusatz');
      if (zus) { b.push({ typ: 'liste', punkte: zus.split(/\n+/).map(function (l) { return l.replace(/^[-•*]\s*/, '').trim(); }).filter(Boolean) }); }
      return b;
    },

    empfehlungen: function (c, ds, st, h) {
      const b = [];
      c.neuerAbsatz();
      [['empf_familie', 'Family context', 'empfehlung_familie'], ['empf_schule', 'School context (local)', 'empfehlung_schule'], ['empf_region', 'Regional context (ESEB / CDSE)', 'empfehlung_region']].forEach(function (g) {
        const p = h.chips(ds, g[0]).map(function (k) { return h.fuelle(h.chipText(c, g[0], k), c); });
        const extra = h.frei(ds, g[2]);
        if (extra) { extra.split(/\n+/).forEach(function (l) { l = l.replace(/^[-•*]\s*/, '').trim(); if (l) { p.push(l); } }); }
        if (p.length) { b.push({ typ: 'zwischen', text: g[1] }); b.push({ typ: 'liste', punkte: p }); }
      });
      return b;
    },

    cni: function (c, ds, st, h) {
      c.neuerAbsatz();
      const m = h.chips(ds, 'cni').map(function (k) { return h.fuelle(h.chipText(c, 'cni', k), c); });
      const b = [];
      if (m.length) {
        // Bezeichnungen der Maßnahmen = Deckblatt (siehe chips.cni)
        b.push(h.block(m.length > 1 ? 'The CDSE recommends the following measures to the Commission nationale d’inclusion (CNI):' : 'The CDSE recommends the following measure to the Commission nationale d’inclusion (CNI):'));
        b.push({ typ: 'liste', punkte: m });
      }
      return b.concat(h.freiBloecke(ds, 'cni_begruendung'));
    }
  };
})();

// ==== 46-ds-text.js ====
// =====================================================================
// DS-Textbaukasten: macht aus Bewertungen, Auswahl und Fakten den Bericht
// ---------------------------------------------------------------------
// Ergebnis je Abschnitt: Liste von Blöcken
//   { typ: 'absatz', text }   { typ: 'liste', punkte: [...] }
//   { typ: 'zwischen', text } (fette Zwischenzeile)
// Sprachunabhängig; die Sätze stehen in DS_TEXTE.de / .fr / .en.
// =====================================================================
const DsText = (function () {
'use strict';

// n = Geschlecht nicht angegeben: beide Formen (nicht einfach männlich)
const PRON = {
  de: { m: { N: 'er', D: 'ihm', A: 'ihn', T: 'ihm', sein: 'sein', seine: 'seine', seinen: 'seinen', seinem: 'seinem', seiner: 'seiner', seines: 'seines' },
        w: { N: 'sie', D: 'ihr', A: 'sie', T: 'ihr', sein: 'ihr', seine: 'ihre', seinen: 'ihren', seinem: 'ihrem', seiner: 'ihrer', seines: 'ihres' },
        n: { N: 'er/sie', D: 'ihm/ihr', A: 'ihn/sie', T: 'ihm/ihr', sein: 'sein/ihr', seine: 'seine/ihre', seinen: 'seinen/ihren', seinem: 'seinem/ihrem', seiner: 'seiner/ihrer', seines: 'seines/ihres' } },
  // fr: T = betontes Pronomen nach Präposition ("pour lui / pour elle")
  fr: { m: { N: 'il', D: 'lui', A: 'le', T: 'lui' }, w: { N: 'elle', D: 'lui', A: 'la', T: 'elle' }, n: { N: 'il/elle', D: 'lui', A: 'le/la', T: 'lui/elle' } },
  en: { m: { N: 'he', D: 'him', A: 'him', T: 'him', his: 'his', himself: 'himself' }, w: { N: 'she', D: 'her', A: 'her', T: 'her', his: 'her', himself: 'herself' },
        n: { N: 'he/she', D: 'him/her', A: 'him/her', T: 'him/her', his: 'his/her', himself: 'himself/herself' } }
};
const KONTRAST_VORSATZ = { fr: ['Toutefois, ', 'En revanche, ', 'Cependant, '], en: ['However, ', 'At the same time, ', 'By contrast, '] };

function texte(lang) { return DS_TEXTE[lang] || DS_TEXTE.de; }
function gross(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
function klein(s) { return s ? s.charAt(0).toLowerCase() + s.slice(1) : s; }

// ---------- Kontext: wer ist gemeint, welche Sprache ----------
function kontext(lang, ds, stamm) {
  const f = (ds && ds.f) || {};
  const voll = String((stamm && stamm.schueler_name) || '').trim();
  let vorname = voll, nachname = '';
  if (voll.indexOf(',') >= 0) { nachname = voll.split(',')[0].trim(); vorname = voll.split(',').slice(1).join(',').trim(); }
  const g = ds && (ds.geschlecht === 'w' || ds.geschlecht === 'm') ? ds.geschlecht : 'n';   // n: nicht angegeben
  const T = texte(lang);
  const c = {
    lang: lang, T: T, g: g,
    name: vorname || T.s.das_kind || 'das Kind',
    vollname: (vorname && nachname) ? vorname + ' ' + nachname : (vorname || voll),
    seit: 0, kontrast: false, kontrastNr: 0,
    q: (T.quellen && T.quellen.eltern[f.eltern_quelle || 'eltern']) || null,
    qs: (T.quellen && T.quellen.schule[f.schule_quelle || 'lehrperson']) || null,
    alter: alterJahre(stamm && stamm.geburtsdatum)
  };
  c.neuerAbsatz = function () { c.seit = 0; };
  return c;
}
function alterJahre(geb) {
  if (!geb) { return null; }
  const d = new Date(geb), h = new Date();
  if (isNaN(d)) { return null; }
  let j = h.getFullYear() - d.getFullYear();
  if (h.getMonth() < d.getMonth() || (h.getMonth() === d.getMonth() && h.getDate() < d.getDate())) { j--; }
  return j;
}

// Name oder Pronomen? Erste Nennung im Absatz = Name, dann Pronomen,
// jede dritte Nennung wieder der Name - lesbar, ohne Wiederholungen.
// Geschlecht nicht angegeben: immer der Name.
function person(c, fall) {
  const p = PRON[c.lang][c.g];
  if (c.g === 'n' || c.seit === 0 || c.seit >= 3) { c.seit = 1; return c.name; }
  c.seit++;
  return p[fall] || c.name;
}

// ---------- Platzhalter füllen ----------
// {Name} {N} {Nd} {Na} {Nt} {er} … {T} {Q} {QS} {KONTRAST} {liste} … {feld: bedingter Text}
// {Nt} = Name bzw. betontes Pronomen nach Präposition (fr: pour lui/elle), {T} immer das Pronomen
// [[männlich|weiblich]] (ohne Angabe: „männlich/weiblich“)  {{einzahl|mehrzahl}} (Zahl aus vars.zahl bzw. Quelle)
function fuelle(tpl, c, vars) {
  vars = vars || {};
  if (tpl == null) { return ''; }
  let s = String(tpl);
  s = s.replace(/\[\[([^|\]]*)\|([^\]]*)\]\]/g, function (m, a, b) { return c.g === 'w' ? b : (c.g === 'm' ? a : a + '/' + b); });
  const zahl = vars.zahl != null ? vars.zahl : ((c.q && c.q.zahl) || 1);
  s = s.replace(/\{\{([^|}]*)\|([^}]*)\}\}/g, function (m, a, b) { return zahl > 1 ? b : a; });
  return ersetze(s, c, vars);
}
function ersetze(s, c, vars) {
  let out = '', i = 0;
  while (i < s.length) {
    const ch = s.charAt(i);
    if (ch !== '{') { out += ch; i++; continue; }
    let tiefe = 1, j = i + 1;
    while (j < s.length && tiefe > 0) { if (s.charAt(j) === '{') { tiefe++; } else if (s.charAt(j) === '}') { tiefe--; } j++; }
    const innen = s.slice(i + 1, j - 1);
    out += platzhalter(innen, c, vars);
    i = j;
  }
  return out;
}
function platzhalter(innen, c, vars) {
  const bed = /^(\w+):([\s\S]*)$/.exec(innen);
  if (bed) { const v = vars[bed[1]]; return (v != null && v !== '' && !(Array.isArray(v) && !v.length)) ? ersetze(bed[2], c, vars) : ''; }
  let hoch = false, k = innen;
  if (k.charAt(0) === '^') { hoch = true; k = k.slice(1); }
  let w = wert(k, c, vars);
  if (w == null) { w = '{' + innen + '}'; }
  return hoch ? gross(w) : w;
}
function wert(k, c, vars) {
  if (Object.prototype.hasOwnProperty.call(vars, k)) { return vars[k] == null ? '' : String(vars[k]); }
  const p = PRON[c.lang][c.g];
  switch (k) {
    case 'N': return person(c, 'N');
    case 'Nd': return person(c, 'D');
    case 'Na': return person(c, 'A');
    case 'Nt': return person(c, 'T');
    case 'Name': c.seit = 1; return c.name;
    case 'Vollname': c.seit = 1; return c.vollname;
    case 'er': case 'il': case 'he': return p.N;
    case 'ihm': case 'lui': return p.D;
    case 'ihn': case 'him': case 'le': return p.A;
    case 'T': return p.T;
    case 'his': return p.his;
    case 'himself': return p.himself;
    case 'KONTRAST': return (c.kontrast && c.lang === 'de') ? 'jedoch ' : '';
    case 'Q': if (c.q && (c.q.zahl || 1) === 1) { c.seit = 0; } return c.q ? c.q.n : '';
    case 'Qd': return c.q ? c.q.d : '';
    case 'Qg': return c.q ? c.q.g : '';
    case 'QS': return c.qs ? c.qs.n : '';
    case 'QSd': return c.qs ? c.qs.d : '';
  }
  if (p && Object.prototype.hasOwnProperty.call(p, k)) { return p[k]; }
  return null;
}

// Satzbau aufräumen: Leerzeichen, Großschreibung am Satzanfang, Französisch
function satz(s, c) {
  s = String(s || '').replace(/\s+/g, ' ').replace(/\s+([.,;:!?)])/g, '$1').replace(/\(\s+/g, '(').trim();
  if (c.lang === 'fr') { s = franz(s); }
  return gross(s);
}
function franz(s) {
  // Elision vor Vokal/stummem h. Keine \b-Grenzen: die kennen keine Akzente
  // ("Hélène a" würde sonst zu "Hélèn'a"). Y (Yanis) wird nicht elidiert.
  const BUCHST = 'A-Za-zÀ-ÖØ-öø-ÿŒœ\'’';
  s = s.replace(new RegExp('(^|[^' + BUCHST + '])(de|que|ne|se|le|la|je|me|te|lorsque|puisque|jusque) (?=[aeiouyhàâéèêëîïôûùœAEIOUHÀÂÉÈÊÎÔÛ])', 'g'), function (m, v, w) {
    return v + (/^(le|la)$/.test(w) ? "l'" : w.slice(0, -1) + "'");
  });
  s = s.replace(new RegExp('(^|[^' + BUCHST + '])si (?=ils?(?![' + BUCHST + ']))', 'g'), "$1s'");
  // Leerzeichen vor : ; ! ? und in « », typografischer Apostroph
  s = s.replace(/ ?([:;!?])(?=\s|$)/g, ' $1').replace(/« ?/g, '« ').replace(/ ?»/g, ' »');
  return s.replace(/'/g, '’');
}

// Aufzählung "a, b und c"
function liste(teile, c, oder, einfach) {
  const T = c.T.s;
  teile = teile.filter(function (x) { return x; });
  if (teile.length <= 1) { return teile[0] || ''; }
  let und = oder ? T.liste_oder : T.liste_und;
  // enthalten die Teile selbst schon "und", klingt "sowie" besser: "a, b und c sowie d"
  if (!oder && !einfach && T.liste_sowie && teile.some(function (x) { return (' ' + x + ' ').indexOf(' ' + T.liste_und + ' ') >= 0; })) { und = T.liste_sowie; }
  return teile.slice(0, -1).join(', ') + ' ' + und + ' ' + teile[teile.length - 1];
}
// Zahl für {{einzahl|mehrzahl}}: mehrere Teile oder ein Teil in der Mehrzahl
function zahlVon(eintraege) { return (eintraege.length > 1 || eintraege.some(function (x) { return x && x.pl; })) ? 2 : 1; }

// ---------- Bewertete Aussagen ----------
function bewertung(ds, id) { const r = ds.bewertungen && ds.bewertungen[id]; return (r >= 1 && r <= 7) ? r : null; }
function chips(ds, gruppe) { return (ds.chips && ds.chips[gruppe]) || []; }
function chipText(c, gruppe, key) { const g = c.T.chips[gruppe] || {}; return g[key] ? g[key][1] : ''; }

// Ein Satz zu einer bewerteten Aussage
function aussageSatz(c, id, r, kontrast) {
  const a = c.T.a[id];
  if (!a || !a.t) { return ''; }
  const tpl = a.t[dsStufe(r)];
  if (!tpl) { return ''; }
  c.kontrast = !!kontrast;
  let s = satz(fuelle(tpl, c, c.vars || {}), c);
  c.kontrast = false;
  if (kontrast && c.lang !== 'de') {
    const v = KONTRAST_VORSATZ[c.lang];
    const vors = v[(c.kontrastNr++) % v.length];   /* reihum, damit sich nichts wiederholt */
    s = vors + (s.indexOf(c.name) === 0 ? s : klein(s));
  }
  return s;
}

// Sichtweisen und Beobachtung: je Thema ein Absatz, Stärken zuerst, dann
// Gemischtes, dann Schwierigkeiten (die deutlichsten zuerst).
function themenAbsaetze(bereich, c, ds, weiter) {
  const aufbau = DS_AUFBAU[bereich], absaetze = [], ohne = [];
  aufbau.themen.forEach(function (th) {
    const eintraege = [];
    th.aussagen.forEach(function (a, i) {
      const r = bewertung(ds, a[0]);
      if (r == null) { return; }
      const e = { id: a[0], pol: a[1], r: r, i: i, v: a[1] < 0 ? 8 - r : r, vorne: a[2] === 'vorne' };
      if (e.pol < 0 && r <= 2) { const np = c.T.a[e.id] && c.T.a[e.id].np; if (np) { ohne.push(fuelle(np, c)); } return; }
      eintraege.push(e);
    });
    if (!eintraege.length) { return; }
    eintraege.sort(function (x, y) { return (y.vorne - x.vorne) || (y.v - x.v) || (x.i - y.i); });
    if (weiter && !absaetze.length) { weiter = false; } else { c.neuerAbsatz(); }
    const saetze = [];
    let staerke = false, kontrastDa = false;
    eintraege.forEach(function (e) {
      if (e.vorne) { const s0 = aussageSatz(c, e.id, e.r, false); if (s0) { saetze.push(s0); } return; }
      const k = staerke && !kontrastDa && e.v <= 4;
      const s = aussageSatz(c, e.id, e.r, k);
      if (!s) { return; }
      if (k) { kontrastDa = true; }
      if (e.v >= 5) { staerke = true; }
      saetze.push(s);
    });
    if (saetze.length) { absaetze.push(saetze); }
  });
  // sehr kurze Absätze mit dem vorigen zusammenlegen
  const zusammen = [];
  absaetze.forEach(function (a) {
    if (zusammen.length && (a.length < 2 || zusammen[zusammen.length - 1].length < 2)) { zusammen[zusammen.length - 1] = zusammen[zusammen.length - 1].concat(a); }
    else { zusammen.push(a); }
  });
  return { absaetze: zusammen, ohne: ohne };
}

function block(text) { return { typ: 'absatz', text: text }; }
function frei(ds, feld) { const t = ds.frei && ds.frei[feld]; return t && String(t).trim() ? String(t).trim() : ''; }
// Gibt es Angaben zu einer Sichtweise bzw. zur Beobachtung (Bewertung, Auswahl, Datum, Gesprächspartner, Freitext)?
// Nur dann nennt der Bericht das Gespräch bzw. die Beobachtung als Grundlage – nichts erfinden.
function hatAngaben(ds, bereich) {
  const f = ds.f || {}, a = DS_AUFBAU[bereich];
  if (!a) { return false; }
  if (f[bereich + '_datum'] || f[bereich + '_quelle'] || frei(ds, bereich) || (bereich === 'kind' && frei(ds, 'vertrauensperson'))) { return true; }
  if (bereich === 'beobachtung' && (f.beobachtungen || []).some(function (b) { return b && (b.datum || b.setting || b.dauer); })) { return true; }
  if ((a.chips || []).some(function (g) { return chips(ds, g).length; })) { return true; }
  return a.themen.some(function (th) { return th.aussagen.some(function (x) { return bewertung(ds, x[0]) != null; }); });
}
function freiBloecke(ds, feld) {
  return frei(ds, feld) ? frei(ds, feld).split(/\n\s*\n/).map(function (t) { return block(t.replace(/\s*\n\s*/g, ' ').trim()); }) : [];
}

// Sichtweise der Schule / des Kindes / der Eltern
function sichtweise(bereich, c, ds, opt) {
  const T = c.T.s, f = ds.f || {};
  const bloecke = [];
  c.neuerAbsatz();
  const vorne = [];
  c.vars = { datum: datumText(f[opt.datum], c.lang) };
  // Einleitungssatz; beim Kind nur mit Datum (sonst sagt er nichts aus), sonst nur mit Angaben zu dieser Sichtweise
  if (opt.intro && hatAngaben(ds, bereich) && !(opt.introWennNicht && bewertung(ds, opt.introWennNicht) != null) && !(opt.introNurMitDatum && !c.vars.datum)) { vorne.push(satz(fuelle(T[opt.intro], c, c.vars), c)); }
  (opt.chipsVorne || []).forEach(function (g) {
    const l = chips(ds, g[0]).map(function (k) { return fuelle(chipText(c, g[0], k), c); });
    if (l.length) { const v = { liste: liste(l, c) }; if (g[2] === 'liste') { v.zahl = l.length > 1 ? 2 : 1; } vorne.push(satz(fuelle(T[g[1]], c, v), c)); }
  });
  const tz = themenAbsaetze(bereich, c, ds, vorne.length > 0);
  c.vars = null;
  const absaetze = tz.absaetze.map(function (a) { return a.slice(); });
  if (vorne.length) { if (absaetze.length) { absaetze[0] = vorne.concat(absaetze[0]); } else { absaetze.push(vorne); } }
  if (tz.ohne.length && opt.ohne) {
    const s = satz(fuelle(T[opt.ohne], c, { liste: liste(tz.ohne, c, true) }), c);
    if (absaetze.length) { absaetze[absaetze.length - 1].push(s); } else { absaetze.push([s]); }
  }
  absaetze.forEach(function (a) { bloecke.push(block(a.join(' '))); });
  const hinten = [];
  c.neuerAbsatz();
  (opt.chipsHinten || []).forEach(function (g) {
    const l = chips(ds, g[0]).map(function (k) { return fuelle(chipText(c, g[0], k), c); });
    if (l.length) { const v = { liste: liste(l, c) }; if (g[2] === 'liste') { v.zahl = l.length > 1 ? 2 : 1; } hinten.push(satz(fuelle(T[g[1]], c, v), c)); }
  });
  if (opt.extra) { opt.extra(hinten); }
  if (hinten.length) { bloecke.push(block(hinten.join(' '))); }
  return bloecke.concat(freiBloecke(ds, bereich));
}

// ---------- 4.3 Interpretation ----------
function gruppiert(c, ds, themaId, feld) {
  const th = DS_AUFBAU.deutung.themen.filter(function (t) { return t.id === themaId; })[0];
  const stark = [], mittel = [];
  th.aussagen.forEach(function (a) {
    const r = bewertung(ds, a[0]); if (r == null || r < 4) { return; }
    const t = c.T.a[a[0]]; if (!t || !t[feld]) { return; }
    (r >= 5 ? stark : mittel).push({ id: a[0], r: r, pl: !!t.pl, text: fuelle(t[feld], c) });
  });
  const sort = function (x, y) { return y.r - x.r; };
  stark.sort(sort); mittel.sort(sort);
  return { stark: stark, mittel: mittel };
}
function deutung(c, ds) {
  const T = c.T.s, bloecke = [];
  // Abgleich der Quellen und Muster
  c.neuerAbsatz();
  const p1 = [];
  ['quellen', 'muster'].forEach(function (thId) {
    const th = DS_AUFBAU.deutung.themen.filter(function (t) { return t.id === thId; })[0];
    // Situationen mit Kurzform (m) werden zusammengefasst: "vor allem bei … und in …"
    const stark = [], mittel = [];
    th.aussagen.forEach(function (a) {
      const r = bewertung(ds, a[0]); if (r == null) { return; }
      const t = c.T.a[a[0]];
      if (t && t.m && r >= 5) { (r >= 6 ? stark : mittel).push(fuelle(t.m, c)); return; }
      const s = aussageSatz(c, a[0], r, false); if (s) { p1.push(s); }
    });
    if (stark.length) { p1.push(satz(fuelle(T.muster_stark, c, { liste: liste(stark, c) }), c)); }
    if (mittel.length) { p1.push(satz(fuelle(stark.length ? T.muster_mittel_nach : T.muster_mittel, c, { liste: liste(mittel, c) }), c)); }
  });
  if (p1.length) { bloecke.push(block(p1.join(' '))); }
  // Entwicklungsängste und Abwehr
  c.neuerAbsatz();
  const p2 = [], ang = gruppiert(c, ds, 'aengste', 'np'), abw = gruppiert(c, ds, 'abwehr', 'np');
  const txt = function (l) { return l.map(function (x) { return x.text; }); };
  if (ang.stark.length && ang.mittel.length) { p2.push(satz(fuelle(T.aengste_beide, c, { stark: liste(txt(ang.stark), c), mittel: liste(txt(ang.mittel), c) }), c)); }
  else if (ang.stark.length) { p2.push(satz(fuelle(T.aengste_stark, c, { liste: liste(txt(ang.stark), c) }), c)); }
  else if (ang.mittel.length) { p2.push(satz(fuelle(T.aengste_mittel, c, { liste: liste(txt(ang.mittel), c) }), c)); }
  ang.stark.slice(0, 2).forEach(function (x) { const e = c.T.a[x.id].e; if (e) { p2.push(satz(fuelle(e, c), c)); } });
  const angAlle = ang.stark.concat(ang.mittel);
  const vA = { stark: liste(txt(abw.stark), c), mittel: liste(txt(abw.mittel), c) };
  if (angAlle.length) {
    vA.zahl = angAlle.length > 1 ? 2 : 1;
    if (abw.stark.length && abw.mittel.length) { p2.push(satz(fuelle(T.abwehr_bezug_beide, c, vA), c)); }
    else if (abw.stark.length) { p2.push(satz(fuelle(T.abwehr_bezug_stark, c, vA), c)); }
    else if (abw.mittel.length) { p2.push(satz(fuelle(T.abwehr_bezug_mittel, c, vA), c)); }
  } else {
    if (abw.stark.length && abw.mittel.length) { vA.zahl = zahlVon(abw.stark); p2.push(satz(fuelle(T.abwehr_beide, c, vA), c)); }
    else if (abw.stark.length) { p2.push(satz(fuelle(T.abwehr_stark, c, { liste: vA.stark, zahl: zahlVon(abw.stark) }), c)); }
    else if (abw.mittel.length) { p2.push(satz(fuelle(T.abwehr_mittel, c, { liste: vA.mittel, zahl: zahlVon(abw.mittel) }), c)); }
  }
  if (frei(ds, 'abwehr')) { p2.push(frei(ds, 'abwehr')); }
  if (p2.length) { bloecke.push(block(p2.join(' '))); }
  // Erklärungsansätze
  c.neuerAbsatz();
  const p3 = [];
  const hyp = { stark: [], mittel: [] };
  DS_AUFBAU.deutung.themen.filter(function (t) { return t.id === 'hypothesen'; })[0].aussagen.forEach(function (a) {
    const r = bewertung(ds, a[0]); if (r == null || r < 4 || a[0] === 'i_hyp_trauma') { return; }
    (r >= 6 ? hyp.stark : hyp.mittel).push({ r: r, a: c.T.a[a[0]], pl: !!(c.T.a[a[0]] || {}).pl });
  });
  hyp.stark.sort(function (x, y) { return y.r - x.r; }); hyp.mittel.sort(function (x, y) { return y.r - x.r; });
  if (hyp.stark.length) {
    p3.push(satz(fuelle(T.hyp_stark, c, { liste: liste(hyp.stark.map(function (x) { return fuelle(x.a.g, c); }), c) }), c));
    if (hyp.mittel.length) { p3.push(satz(fuelle(T.hyp_mittel, c, { liste: liste(hyp.mittel.map(function (x) { return fuelle(x.a.n, c); }), c), zahl: zahlVon(hyp.mittel) }), c)); }
  } else if (hyp.mittel.length) {
    p3.push(satz(fuelle(T.hyp_nur_mittel, c, { liste: liste(hyp.mittel.map(function (x) { return fuelle(x.a.n, c); }), c), zahl: zahlVon(hyp.mittel) }), c));
  }
  if ((bewertung(ds, 'i_hyp_trauma') || 0) >= 4) { p3.push(satz(fuelle(T.hyp_trauma, c), c)); }
  if (p3.length) { bloecke.push(block(p3.join(' '))); }
  return bloecke.concat(freiBloecke(ds, 'deutung'));
}

// ---------- 5.1 Bedürfnisse und Ressourcen ----------
function beduerfnisse(c, ds) {
  const T = c.T.s, stark = [], mittel = [];
  DS_AUFBAU.beduerfnisse.themen[0].aussagen.forEach(function (a) {
    const r = bewertung(ds, a[0]); if (r == null || r < 4) { return; }
    (r >= 6 ? stark : mittel).push({ r: r, a: c.T.a[a[0]] });
  });
  const sort = function (x, y) { return y.r - x.r; };
  stark.sort(sort); mittel.sort(sort);
  c.neuerAbsatz();
  const s = [];
  if (stark.length) { s.push(satz(fuelle(T.beduerfnis_stark, c, { liste: liste(stark.map(function (x) { return fuelle(x.a.a, c); }), c) }), c)); }
  if (mittel.length) { s.push(satz(fuelle(stark.length ? T.beduerfnis_mittel : T.beduerfnis_nur_mittel, c, { liste: liste(mittel.map(function (x) { return fuelle(x.a.d, c); }), c) }), c)); }
  const res = chips(ds, 'ressourcen').map(function (k) { return fuelle(chipText(c, 'ressourcen', k), c); });
  const bloecke = [];
  if (s.length) { bloecke.push(block(s.join(' '))); }
  c.neuerAbsatz();
  if (res.length) { bloecke.push(block(satz(fuelle(T.ressourcen, c, { liste: liste(res, c) }), c))); }
  return bloecke.concat(freiBloecke(ds, 'beduerfnisse'));
}

// ---------- Datum ----------
const MONATE_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function datumText(iso, lang) {
  if (!iso) { return ''; }
  const d = new Date(iso + 'T12:00:00');
  if (isNaN(d)) { return String(iso); }
  if (lang === 'en') { return d.getDate() + ' ' + MONATE_EN[d.getMonth()] + ' ' + d.getFullYear(); }
  const p = function (n) { return (n < 10 ? '0' : '') + n; };
  return p(d.getDate()) + (lang === 'en' ? '/' : '.') + p(d.getMonth() + 1) + (lang === 'en' ? '/' : '.') + d.getFullYear();
}

// ---------- Der ganze Bericht ----------
// profil: ELDiB-Auswertung (siehe dsEldibProfil); liefert { id: [Blöcke] }
function bericht(lang, ds, stamm, profil) {
  ds = ds || {};
  const c = kontext(lang, ds, stamm), F = c.T.fakten, T = c.T.s, f = ds.f || {};
  const h = { fuelle: fuelle, satz: satz, liste: liste, chips: chips, chipText: chipText, frei: frei, freiBloecke: freiBloecke, block: block, datum: datumText, gross: gross, klein: klein,
    angaben: function (bereich) { return hatAngaben(ds, bereich); } };
  const ab = {};
  ab.auftrag = F.auftrag(c, ds, stamm, h);
  ab.vorgeschichte = F.vorgeschichte(c, ds, stamm, h);
  ab.sozialbericht = F.sozialbericht(c, ds, stamm, h);
  ab.aktuell = F.aktuell(c, ds, stamm, h);
  ab.schule = sichtweise('schule', c, ds, { intro: 'schule_intro', datum: 'schule_datum', ohne: 'schule_ohne',
    chipsVorne: [['s_staerken', 'schule_staerken', 'liste']], chipsHinten: [['s_hilft', 'schule_hilft'], ['s_erwartung', 'schule_erwartung']] });
  ab.kind = sichtweise('kind', c, ds, { intro: 'kind_intro', introWennNicht: 'k_offen', introNurMitDatum: true, datum: 'kind_datum', ohne: 'kind_ohne',
    chipsHinten: [['k_interessen', 'kind_interessen'], ['k_wuensche', 'kind_wuensche']],
    extra: function (hinten) { if (frei(ds, 'vertrauensperson')) { hinten.push(satz(fuelle(T.kind_vertrauen, c, { text: frei(ds, 'vertrauensperson') }), c)); } } });
  ab.eltern = sichtweise('eltern', c, ds, { intro: 'eltern_intro', datum: 'eltern_datum', ohne: 'eltern_ohne',
    chipsVorne: [['e_staerken', 'eltern_staerken', 'liste']], chipsHinten: [['e_erwartung', 'eltern_erwartung']] });
  ab.verfahren = F.verfahren(c, ds, stamm, h);
  ab.beobachtung = F.beobachtungIntro(c, ds, stamm, h).concat(sichtweise('beobachtung', c, ds, { ohne: 'beob_ohne' }));
  if (ab.beobachtung.length > 1 && ab.beobachtung[0].typ === 'absatz' && ab.beobachtung[1].typ === 'absatz') {
    ab.beobachtung = [block(ab.beobachtung[0].text + ' ' + ab.beobachtung[1].text)].concat(ab.beobachtung.slice(2));
  }
  ab.eldib = F.eldib(c, ds, stamm, h, profil);
  // Testergebnisse (z. B. WISC-V) aus dem Hub, nach den ELDiB-Ergebnissen: Zwischenzeile, Tabelle, kurzer Text (46c-ds-tests.js)
  if (typeof DsTests !== 'undefined') { ab.eldib = ab.eldib.concat(DsTests.bloecke(lang, ds)); }
  ab.deutung = deutung(c, ds);
  ab.schluss = F.schluss(c, ds, stamm, h);
  ab.beduerfnisse = beduerfnisse(c, ds);
  ab.ziele = F.ziele(c, ds, stamm, h, profil);
  ab.empfehlungen = F.empfehlungen(c, ds, stamm, h);
  ab.cni = F.cni(c, ds, stamm, h);
  return ab;
}

// Ein einzelner Satz für die Vorschau beim Anklicken
function vorschauSatz(lang, ds, stamm, id, r) {
  const c = kontext(lang, ds, stamm);
  const a = c.T.a[id];
  if (!a) { return ''; }
  if (a.t) {
    const tpl = a.t[dsStufe(r)];
    if (!tpl) { return a.np ? fuelle(c.T.s.vorschau_ohne || '(„{liste}“ wird als nicht zutreffend erwähnt)', c, { liste: fuelle(a.np, c) }) : ''; }
    return satz(fuelle(tpl, c), c);
  }
  return '';
}

return { bericht: bericht, vorschauSatz: vorschauSatz, kontext: kontext, fuelle: fuelle, satz: satz, liste: liste, datum: datumText };
})();

// ==== 46b-ds-leser.js ====
// =====================================================================
// DS-Leser: liest einen fertigen DS-Bericht (Word, PDF oder OCR-Text) zurück
// in den DS-Assistenten – Bewertungen 1–7, Auswahlfelder, Fakten, Freitexte
// und Tabellen. Genutzt vom CDSE Hub (apps/ds-motor.js) und vom Generator.
// ---------------------------------------------------------------------
// DS_LESER.lesen(text, opt)
//   opt = { sprache: 'de'|'fr'|'en', name, vorname, geschlecht: 'm'|'w',
//           abschnitte: { id: 'Text' } (schon getrennt), tabellen: { vorgeschichte, aktuell, interventionen } }
//   -> { sprache, herkunft: 'generator'|'frei'|'gemischt', name, geschlecht,
//        bewertungen: { id: { wert, sicher, beleg, abschnitt, band, art } },
//        chips: { gruppe: [{ key, beleg, sicher }] }, f: { feld: { wert, beleg, sicher } },
//        frei: { feld: 'Text' }, tabellen: { vorgeschichte, aktuell, interventionen },
//        abschnitte: { id: { titel, text } }, unbekannt: ['Satz', …] }
// DS_LESER.anwenden(dsData, ergebnis, auswahl) -> neues dsData (v2); nicht übernommene
//   bestehende Werte bleiben erhalten (siehe unten).
// ---------------------------------------------------------------------
// So wird gelesen
// 1. Text säubern: Silbentrennung, Zeilenumbrüche, Kopf-/Fußzeilen (PDF), Feldfunktionen.
// 2. Abschnitte an den Überschriften erkennen (DE/FR/EN, mit oder ohne Nummer, OCR-tolerant).
//    Das Inhaltsverzeichnis (Seitenzahlen) zählt nicht, die grauen Anleitungen „(…)“ der
//    Vorlage werden übersprungen.
// 3. Jeden Satz mit den Satzvorlagen des Text-Motors vergleichen (46-ds-text.js rückwärts):
//    fünf Formulierungen je Aussage, Rahmensätze mit Aufzählungen (Auswahlfelder, „Hinweise
//    auf … ergeben sich nicht“), Faktensätze (43b/44b/45b). Name, Pronomen, „jedoch“ bzw.
//    „Toutefois, …“, Eltern-/Schulquelle und Datum sind Platzhalter.
// 4. Was keiner Vorlage entspricht, kommt in den Freitext des Abschnitts und liefert höchstens
//    Vorschläge mit sicher < 0.7 (art 'frei'): Stichwörter je Aussage (FREI_STICH, DE/FR/EN) im
//    Abschnitt, das Band aus Häufigkeits-/Stärkewörtern und Verneinung im selben Satzteil
//    (STUFENWORTE; ohne solches Wort 5); sonst Ähnlichkeit mit dem Wortschatz der Vorlagen
//    (über der Schwelle SCHWELLE_FREI). Eigene Glieder in einer Aufzählung der Vorlage („braucht
//    vor allem klare Strukturen“) bekommen das Band des Rahmensatzes (sicher 0.6).
// Vergleichsform („Skelett“): Kleinbuchstaben ohne Akzente, Umlaut = Grundvokal (OCR verliert
// die Punkte, „ae“ = „ä“), „rn“ = „m“ (OCR), Satzzeichen weg, französische Elision einheitlich.
// ---------------------------------------------------------------------
// Bewertung -> Satz (46-ds-text.js) und zurück
//   Aussagen mit fünf Formulierungen t[0..4] (dsStufe): 1–2 -> t[0], 3 -> t[1], 4 -> t[2],
//     5 -> t[3], 6–7 -> t[4]. Schwierigkeiten (pol −1) mit 1–2: kein eigener Satz, sondern die
//     Aufzählung „Hinweise auf … ergeben sich … nicht“ (np).
//   4.3 Situationen mit Kurzform (m): ≥ 6 „vor allem …“, 5 „Häufig …“, 4 t[2], ≤ 3 nichts;
//     Situationen ohne Kurzform: t[2..4] bei 4, 5, ≥ 6, darunter nichts.
//   4.3 Ängste/Abwehr (Skala „deutlich“): ≥ 5 deutlich, 4 teilweise, ≤ 3 nicht erwähnt.
//   4.3 Erklärungen (Skala „wahrscheinlich“): ≥ 6 „am ehesten“, 4–5 „könnte/kommen in Betracht“;
//     Trauma: ab 4 ein eigener Satz.
//   5.1 Bedürfnisse (Skala „wichtig“): ≥ 6 „braucht vor allem“, 4–5 „profitiert von“.
// Mehrere Bewertungen ergeben denselben Satz (1–2, 6–7, 4–5, 5–7, 4–7). Zurückgegeben wird der
// Wert des Bandes, der der Skalenmitte 4 am nächsten liegt (nie mehr behaupten, als der Text
// sagt): 1–2 -> 2, 6–7 -> 6, 4–5 -> 4, 5–7 -> 5, 4–7 -> 4. `band` nennt alle Werte, die
// denselben Satz ergeben. Verrät die Reihenfolge der Sätze mehr (der Text-Motor ordnet sie nach
// Stärke, z. B. 7 vor 6), wird der Wert innerhalb des Bandes angepasst (`reihenfolge: true`).
// =====================================================================
const DS_LESER = (function () {
'use strict';

const VERSION = 1;
const SPRACHEN = ['de', 'fr', 'en'];
const STUFE_BAND = [[1, 2], [3], [4], [5], [6, 7]];
const BEREICH_ABSCHNITT = { schule: 'schule', kind: 'kind', eltern: 'eltern', beobachtung: 'beobachtung', deutung: 'deutung', beduerfnisse: 'beduerfnisse' };
const INTERVENTIONEN = ['klassenbeobachtung', 'kontakt_eltern', 'kontakt_schule', 'kontakt_extern', 'kontakt_schueler'];
// Freitextfeld je Abschnitt (DS_SCHRITTE: das lange Freitextfeld des Schritts)
const FREI_FELD = { auftrag: 'anlass_details', vorgeschichte: 'vorgeschichte', sozialbericht: 'familie', aktuell: 'aktuell', massnahmen: 'aktuell',
  schule: 'schule', kind: 'kind', eltern: 'eltern', verfahren: 'beobachtung', beobachtung: 'beobachtung', deutung: 'deutung', schluss: 'vorbehalte',
  beduerfnisse: 'beduerfnisse', ziele: 'ziele_zusatz', empfehlungen: 'empfehlung_schule', cni: 'cni_begruendung' };

// Wert eines Bandes, der der Skalenmitte am nächsten liegt
function vertreter(band) { return band.slice().sort(function (a, b) { return (Math.abs(a - 4) - Math.abs(b - 4)) || (a - b); })[0]; }

// ---------- Tafeln (Gliederung, Überschriften, Tabellen; aus 47-ds-assistent.js) ----------
let tafelnCache = null;
function tafeln() {
  if (typeof DS_BERICHT_TAFELN !== 'undefined' && DS_BERICHT_TAFELN) { return DS_BERICHT_TAFELN; }
  if (tafelnCache) { return tafelnCache; }
  if (typeof DS_TITEL === 'undefined' || typeof DS_UI === 'undefined') { throw new Error('DS-Leser: Gliederung des DS fehlt (DS_BERICHT_TAFELN)'); }
  const ui = {};
  Object.keys(DS_UI).forEach(function (l) { const u = DS_UI[l]; ui[l] = { l: u.l, tab: u.tab, opt: u.opt, skala: u.skala, wirkung: u.wirkung, tabelleMarke: u.tabelleMarke }; });
  tafelnCache = { gliederung: DS_GLIEDERUNG, titel: DS_TITEL, tabellen: DS_TABELLEN, skalaThema: DS_SKALA_THEMA, schritte: DS_SCHRITTE,
    deckblatt: DS_DECKBLATT, richtziel: DS_RICHTZIEL, stufenAlter: DS_STUFEN_ALTER, ui: ui };
  return tafelnCache;
}

// ---------- Text säubern ----------
const LIGATUR = { '\uFB00': 'ff', '\uFB01': 'fi', '\uFB02': 'fl', '\uFB03': 'ffi', '\uFB04': 'ffl', '\uFB05': 'st', '\uFB06': 'st' };
// Bindewörter nach einem Trennstrich ("Bauch- oder Kopfschmerzen") – je Sprache, sonst wird "Entwicklungsst-and" zu "st- and"
const BINDEWORT_SPRACHE = { de: /^(und|oder|bzw|sowie)$/i, fr: /^(et|ou)$/i, en: /^(and|or|as)$/i };
const BINDEWORT_ALLE = /^(und|oder|bzw|sowie|et|ou|or|and|as)$/i;
function saeubern(text, lang) {
  const BINDEWORT = BINDEWORT_SPRACHE[lang] || BINDEWORT_ALLE;
  let s = String(text == null ? '' : text).replace(/\r\n?/g, '\n').replace(/[\f\v\u2028\u2029\u0085]/g, '');
  s = s.replace(/[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g, ' ').replace(/[\u200B-\u200D\u2060\uFEFF\u00AD]/g, '')
    .replace(/[\uFB00-\uFB06]/g, function (c) { return LIGATUR[c]; });
  // Feldfunktionen, wenn der Text roh aus document.xml kommt (Inhaltsverzeichnis)
  s = s.replace(/[ \t]*TOC \\o "[^"]*"(?: \\[a-z])*/g, '').replace(/[ \t]*PAGEREF _Toc\d+(?: \\[a-z])*/g, '').replace(/[ \t]*HYPERLINK \\l "_Toc\d+"/g, '');
  // Silbentrennung am Zeilenende: "Unter-\nstützung" -> "Unterstützung", "Bauch-\noder" -> "Bauch- oder",
  // "ELDiB-\nProfil" -> "ELDiB-Profil"
  s = s.replace(/([A-Za-zÀ-ÖØ-öø-ÿß])[-\u2010\u2011\u00AC][ \t]*\n(?:[ \t]*\n){0,3}[ \t]*(?=([A-Za-zÀ-ÖØ-öø-ÿß]+))/g, function (m, a, weiter) {
    if (BINDEWORT.test(weiter)) { return a + '- '; }
    return /^[A-ZÀ-ÖØ-Þ]/.test(weiter) ? a + '-' : a;
  });
  // getrennte Wörter in einer Zeile (OCR): "Unter- stützung"
  s = s.replace(/([a-zà-öø-ÿß])[-\u2010\u2011\u00AC] (?=([a-zà-öø-ÿß]+))/g, function (m, a, weiter) { return BINDEWORT.test(weiter) ? m : a; });
  return s.split('\n').map(function (z) { return z.replace(/[ \t]+$/, ''); }).join('\n');
}

// ---------- Skelett (Vergleichsform) ----------
const BASIS_SONDER = { 'ß': 'ss', 'ẞ': 'ss', 'æ': 'ae', 'Æ': 'ae', 'œ': 'oe', 'Œ': 'oe', 'ø': 'o', 'Ø': 'o', 'ł': 'l', 'Ł': 'l', 'đ': 'd', 'ı': 'i' };
const basisCache = {};
function basis(ch) {
  let b = basisCache[ch];
  if (b !== undefined) { return b; }
  if (BASIS_SONDER[ch]) { b = BASIS_SONDER[ch]; }
  else {
    b = (ch.normalize ? ch.normalize('NFD') : ch).replace(/[\u0300-\u036f]/g, '').toLowerCase();
    if (!/^[a-z0-9]+$/.test(b)) { b = ''; }
  }
  basisCache[ch] = b;
  return b;
}
const ELISION_FR = { de: 'd', que: 'qu', ne: 'n', se: 's', le: 'l', la: 'l', je: 'j', me: 'm', te: 't', lorsque: 'lorsqu', puisque: 'puisqu', jusque: 'jusqu' };
function kanon(w, lang) {
  w = w.replace(/rn/g, 'm');                                   // OCR verwechselt „rn“ und „m“
  if (lang === 'de') { w = w.replace(/([aou])e/g, '$1'); }     // „ae“ = „ä“ = „a“ (Umlautpunkte fehlen)
  else if (lang === 'fr' && ELISION_FR[w]) { w = ELISION_FR[w]; }
  return w;
}
// Wörter mit Position im Ausgangstext
function woerter(s, lang) {
  const t = [];
  let w = '', von = 0;
  for (let i = 0; i < s.length; i++) {
    const b = basis(s.charAt(i));
    if (b) { if (!w) { von = i; } w += b; }
    else if (w) { t.push({ w: kanon(w, lang), von: von, bis: i }); w = ''; }
  }
  if (w) { t.push({ w: kanon(w, lang), von: von, bis: s.length }); }
  return t;
}
// Skelett eines Textes: k = " wort wort …" (jedes Wort mit Leerzeichen davor), start[i] = Lage von Wort i in k
function skelett(s, lang) {
  const toks = woerter(s, lang), start = [];
  let k = '';
  toks.forEach(function (t) { k += ' '; start.push(k.length); k += t.w; });
  return { s: s, toks: toks, k: k, start: start };
}
function skText(s, lang) { return skelett(s, lang).k; }
// Bereich [a, b) in sk.k -> Wörter i..j -> Bereich im Ausgangstext
function wortBereich(sk, a, b) {
  let i = 0;
  while (i < sk.start.length && sk.start[i] < a) { i++; }
  let j = i;
  while (j + 1 < sk.start.length && sk.start[j + 1] < b) { j++; }
  if (i >= sk.toks.length || sk.start[i] >= b) { return null; }
  return { i: i, j: j, von: sk.toks[i].von, bis: sk.toks[j].bis };
}
function ausschnitt(sk, a, b) {
  const r = wortBereich(sk, a, b);
  if (!r) { return ''; }
  let t = sk.s.slice(r.von, r.bis), bis = r.bis;
  // schließende Klammer/Anführungszeichen direkt dahinter gehören dazu, wenn sie innen geöffnet wurden
  while (bis < sk.s.length && /[)\]”“»"'’]/.test(sk.s.charAt(bis))) {
    const zu = sk.s.charAt(bis), auf = { ')': '(', ']': '[', '”': '„', '“': '„', '»': '«' }[zu];
    if (auf && t.split(auf).length <= t.split(zu).length) { break; }
    t += zu; bis++;
  }
  return t;
}

// ---------- Datum ----------
const MONATE = {
  januar: 1, janner: 1, jan: 1, februar: 2, feb: 2, marz: 3, maerz: 3, april: 4, apr: 4, mai: 5, juni: 6, juli: 7, august: 8, aug: 8, september: 9, sept: 9, sep: 9, oktober: 10, okt: 10, november: 11, nov: 11, dezember: 12, dez: 12,
  janvier: 1, fevrier: 2, mars: 3, avril: 4, juin: 6, juillet: 7, aout: 8, septembre: 9, octobre: 10, novembre: 11, decembre: 12,
  january: 1, february: 2, march: 3, may: 5, june: 6, july: 7, october: 10, december: 12
};
// im Skelett: „maerz“ wird zu „marz“, „rn“ zu „m“ – die Monatsnamen selbst sind davon nicht betroffen
const MONAT_RE = Object.keys(MONATE).map(function (m) { return kanon(m, 'de'); }).filter(function (m, i, a) { return a.indexOf(m) === i; }).sort(function (a, b) { return b.length - a.length; }).join('|');
const DATUM_RE = '(\\d{1,2} \\d{1,2} \\d{2,4}|\\d{4} \\d{1,2} \\d{1,2}|\\d{1,2}(?: er)? (?:' + MONAT_RE + ') \\d{4}|(?:' + MONAT_RE + ') \\d{1,2} \\d{4})';
function monatNr(w) {
  if (MONATE[w]) { return MONATE[w]; }
  for (const m of Object.keys(MONATE)) { if (kanon(m, 'de') === w || kanon(m, 'fr') === w) { return MONATE[m]; } }
  return 0;
}
// Datum aus Skelett-Wörtern ("12 03 2025", "12 marz 2025", "march 12 2025") -> "2025-03-12"
function isoAusSkelett(s) {
  const w = String(s || '').trim().split(' ').filter(function (x) { return x && x !== 'er'; });
  let d, m, y;
  if (w.length < 3) { return ''; }
  if (/^\d{4}$/.test(w[0])) { y = +w[0]; m = +w[1]; d = +w[2]; }
  else if (/^\d+$/.test(w[0]) && /^\d+$/.test(w[1])) { d = +w[0]; m = +w[1]; y = +w[2]; }
  else if (/^\d+$/.test(w[0])) { d = +w[0]; m = monatNr(w[1]); y = +w[2]; }
  else { m = monatNr(w[0]); d = +w[1]; y = +w[2]; }
  if (y < 100) { y += 2000; }
  if (!(d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= 2100)) { return ''; }
  return y + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d;
}
const DATUM_IM_TEXT = new RegExp(' ' + DATUM_RE + '(?= |$)', 'g');
// alle Datumsangaben in einem freien Text -> ["2025-03-12", …]
function datenImText(s, lang) {
  const k = skText(s, lang || 'de') + ' ', aus = [];
  let m;
  DATUM_IM_TEXT.lastIndex = 0;
  while ((m = DATUM_IM_TEXT.exec(k))) { const iso = isoAusSkelett(m[1]); if (iso) { aus.push(iso); } }
  return aus;
}

// ---------- Vorlagen -> Regex über dem Skelett ----------
// Jedes Element beginnt mit einem Leerzeichen; die ganze Vorlage passt auf " " + Skelett.
function schliesst(s, i, zu) {
  let tiefe = 0;
  for (let j = i; j < s.length; j++) {
    if (tiefe === 0 && s.startsWith(zu, j)) { return j; }
    const ch = s.charAt(j);
    if (ch === '{' || ch === '[') { tiefe++; } else if (ch === '}' || ch === ']') { tiefe--; }
  }
  return -1;
}
function teileBei(s, trenner) {
  const teile = [];
  let tiefe = 0, von = 0;
  for (let j = 0; j < s.length; j++) {
    const ch = s.charAt(j);
    if (ch === '{' || ch === '[') { tiefe++; } else if (ch === '}' || ch === ']') { tiefe--; }
    else if (ch === trenner && tiefe === 0) { teile.push(s.slice(von, j)); von = j + 1; }
  }
  teile.push(s.slice(von));
  return teile;
}
const PERSON_FALL = { N: 'N', Nd: 'D', Na: 'A', Nt: 'T', Name: 'name', Vollname: 'voll' };
const PRONOMEN_KEYS = { de: ['er', 'ihm', 'ihn', 'T', 'sein', 'seine', 'seinen', 'seinem', 'seiner', 'seines'], fr: ['il', 'lui', 'le', 'T'], en: ['he', 'him', 'his', 'himself', 'T'] };
const sprachCache = {};

// Pronomen (alle Geschlechter) aus dem Text-Motor: { key: [{ t, g }] }
function pronomen(lang) {
  const aus = {};
  ['m', 'w', 'n'].forEach(function (g) {
    const c = DsText.kontext(lang, { geschlecht: g === 'n' ? '' : g }, { schueler_name: 'Xq' });
    (PRONOMEN_KEYS[lang] || []).forEach(function (key) {
      c.seit = 1;
      const v = DsText.fuelle('{' + key + '}', c);
      if (v && v.indexOf('{') < 0 && v !== 'Xq') { (aus[key] = aus[key] || []).push({ t: v, g: g }); }
    });
  });
  return aus;
}
function altRegex(liste) {
  const sks = liste.map(function (x) { return x.sk; }).filter(function (x, i, a) { return x && a.indexOf(x) === i; }).sort(function (a, b) { return b.length - a.length; });
  return '(' + sks.join('|') + ')';
}

// kompiliere(vorlage, lang, extra) -> { src, gruppen, literal }
//   extra.slots: { name: ['Alternative', …] | 'zahl' | 'text' }  (sonst nach Platzhaltername)
function kompiliere(tpl, lang, extra) {
  const L = sprachDaten(lang, true);
  extra = extra || {};
  const gruppen = [];
  let literal = 0;
  function sequenz(s) {
    let out = '', text = '';
    const flush = function () {
      if (text) { woerter(text, lang).forEach(function (t) { out += ' ' + t.w; literal++; }); text = ''; }
    };
    let i = 0;
    while (i < s.length) {
      if (s.startsWith('[[', i)) {
        const e = schliesst(s, i + 2, ']]'); flush();
        const t = teileBei(s.slice(i + 2, e), '|');
        out += alternativen(t.length === 2 ? [t[0], t[1], t[0] + '/' + t[1]] : t, 'geschlecht');
        i = e + 2; continue;
      }
      if (s.startsWith('{{', i)) {
        const e = schliesst(s, i + 2, '}}'); flush();
        out += alternativen(teileBei(s.slice(i + 2, e), '|'), 'alt');
        i = e + 2; continue;
      }
      if (s.charAt(i) === '{') {
        const e = schliesst(s, i + 1, '}'); flush();
        out += platz(s.slice(i + 1, e));
        i = e + 1; continue;
      }
      text += s.charAt(i); i++;
    }
    flush();
    return out;
  }
  function alternativen(teile, typ) {
    // typ 'geschlecht' ([[m|w]], dazu die Form ohne Angabe "m/w") oder 'alt' ({{einzahl|mehrzahl}})
    const g = { typ: typ, alts: teile.map(function (t) { return skText(t.replace(/\{[^}]*\}/g, ' '), lang).trim(); }) };
    gruppen.push(g);
    const lit0 = literal;
    const src = '(' + teile.map(sequenz).join('|') + ')';
    literal = lit0 + 1;
    return src;
  }
  function platz(innen) {
    const bed = /^(\w+):([\s\S]*)$/.exec(innen);
    if (bed) {
      // Bedingung {feld: …}: unter "?feld" (das Feld selbst steht meist innen)
      gruppen.push({ typ: 'bedingung', key: '?' + bed[1] });
      const lit0 = literal;
      const src = '(' + sequenz(bed[2]) + ')?';
      literal = lit0;
      return src;
    }
    const key = innen.replace(/^\^/, '');
    const def = extra.slots && extra.slots[key];
    if (Array.isArray(def)) {
      gruppen.push({ typ: 'wahl', key: key, alts: def.map(function (a) { return skText(a, lang).trim(); }) });
      return ' ' + altRegex(def.map(function (a) { return { sk: skText(a, lang).trim() }; }));
    }
    if (def && def.vor) {
      // Text mit einem der Vorwörter davor ("à l'école …", "au …"): beides wird gefangen
      gruppen.push({ typ: 'text', key: key });
      return ' ((?:' + def.vor.map(function (a) { return skText(a, lang).trim(); }).sort(function (a, b) { return b.length - a.length; }).join('|') + ') [^ ]+(?: [^ ]+)*?)';
    }
    if (def === 'nummer') { gruppen.push({ typ: 'nummer', key: key }); return ' (\\d{1,3})'; }
    if (def === 'text') { gruppen.push({ typ: 'text', key: key }); return ' ([^ ]+(?: [^ ]+)*?)'; }
    if (key === 'KONTRAST') { return lang === 'de' ? '(?: jedoch)?' : ''; }
    if (key === 'datum') { gruppen.push({ typ: 'datum', key: key }); return ' ' + DATUM_RE; }
    if (PERSON_FALL[key]) {
      gruppen.push({ typ: 'person', key: key, fall: PERSON_FALL[key] });
      return key === 'Vollname' ? ' ([^ ]+(?: [^ ]+){0,3}?)' : ' ([^ ]+(?: [^ ]+){0,2}?)';
    }
    if (L.pron[key]) { gruppen.push({ typ: 'pron', key: key }); return ' ' + altRegex(L.pron[key].map(function (x) { return { sk: skText(x.t, lang).trim() }; })); }
    if (/^(Q|Qd|Qg|QS|QSd)$/.test(key)) {
      const art = key.charAt(1) === 'S' ? 'schule' : 'eltern', fall = key === 'Q' || key === 'QS' ? 'n' : (key.slice(-1) === 'g' ? 'g' : 'd');
      const Q = (DS_TEXTE[lang].quellen || DS_TEXTE.de.quellen)[art];
      gruppen.push({ typ: 'quelle', key: key, art: art, fall: fall });
      return ' ' + altRegex(Object.keys(Q).map(function (k) { return { sk: skText(Q[k][fall] || Q[k].n, lang).trim() }; }));
    }
    gruppen.push({ typ: 'text', key: key });
    return ' ([^ ]+(?: [^ ]+)*?)';
  }
  const src = sequenz(tpl);
  return { src: src, gruppen: gruppen, literal: literal };
}
// Regex fertig machen: ganz (Satz), oder als Suche in einem längeren Text
function regexe(k) {
  const mitIndex = function (src, flags) { try { return new RegExp(src, flags + 'd'); } catch (e) { return new RegExp(src, flags); } };
  return { ganz: mitIndex('^' + k.src + '$', ''), suche: mitIndex(k.src + '(?= |$)', 'g') };
}
// Fanggruppen einer Übereinstimmung auslesen (Werte in Originalschreibweise, Datum als ISO)
function werteAus(m, muster, sk, L) {
  const w = { _gruppen: [] };
  muster.gruppen.forEach(function (g, i) {
    const roh = m[i + 1];
    let v = null;
    if (roh == null) { w._gruppen.push(null); return; }
    const idx = m.indices && m.indices[i + 1];
    const orig = idx ? ausschnitt(sk, idx[0] - 1, idx[1]) : roh;
    if (g.typ === 'datum') { v = isoAusSkelett(roh); }
    else if (g.typ === 'nummer') { v = +roh; }
    else if (g.typ === 'wahl' || g.typ === 'geschlecht' || g.typ === 'alt') { v = g.alts.indexOf(roh.trim()); }
    else if (g.typ === 'bedingung') { v = true; }
    else if (g.typ === 'quelle') {
      const Q = (DS_TEXTE[L.lang].quellen || DS_TEXTE.de.quellen)[g.art];
      const kand = Object.keys(Q).filter(function (k) { return skText(Q[k][g.fall] || Q[k].n, L.lang).trim() === roh.trim(); });
      // "le/la titulaire de classe" sind im Skelett gleich: dann der Originaltext
      const dicht = function (s) { return String(s || '').split('').map(basis).join(''); };
      v = (kand.length > 1 ? kand.filter(function (k) { return dicht(Q[k][g.fall] || Q[k].n) === dicht(orig); })[0] : null) || kand[0] || null;
    }
    else { v = String(orig || roh).trim(); }
    const e = { g: g, roh: roh.trim(), orig: String(orig || '').trim(), wert: v };
    if (idx) { e.a = idx[0]; e.b = idx[1]; }
    w._gruppen.push(e);
    if (g.key && !(g.key in w)) { w[g.key] = v; w['_' + g.key] = e; }
  });
  return w;
}

// ---------- Sprachdaten: Muster aller Vorlagen (einmal je Sprache) ----------
function sprachDaten(lang, nurBasis) {
  let L = sprachCache[lang];
  if (!L) {
    const T = DS_TEXTE[lang] || DS_TEXTE.de;
    L = sprachCache[lang] = { lang: lang, T: T, pron: pronomen(lang), fertig: false };
    L.pronWoerter = {};
    Object.keys(L.pron).forEach(function (k) { L.pron[k].forEach(function (x) { L.pronWoerter[skText(x.t, lang).trim()] = x.g; }); });
    L.kindWorte = [skText(T.s.das_kind || '', lang).trim()].filter(Boolean);
  }
  if (!nurBasis && !L.fertig) { L.fertig = true; baueMuster(L); }
  return L;
}
function neuesMuster(L, tpl, info, extra) {
  const k = kompiliere(tpl, L.lang, extra);
  const r = regexe(k);
  return Object.assign({ tpl: tpl, src: k.src, gruppen: k.gruppen, literal: k.literal, re: r.ganz, suche: r.suche }, info);
}
function baueMuster(L) {
  const T = L.T, lang = L.lang;
  L.muster = [];
  L.listen = {};   // Aufzählungsglieder je Liste: { name: [muster] }
  const kontrastVor = lang === 'fr' ? '(?: (?:toutefois|en revanche|cependant))?' : (lang === 'en' ? '(?: (?:however|at the same time|by contrast))?' : '');
  // Aussagen mit fünf Formulierungen
  Object.keys(DS_AUFBAU).forEach(function (bereich) {
    DS_AUFBAU[bereich].themen.forEach(function (th) {
      th.aussagen.forEach(function (a, platz) {
        const id = a[0], t = T.a[id] || {};
        (t.t || []).forEach(function (tpl, stufe) {
          if (!tpl) { return; }
          const m = neuesMuster(L, tpl, { art: 'aussage', id: id, stufe: stufe, bereich: bereich, band: STUFE_BAND[stufe], thema: th.id, pol: a[1], platz: platz, vorne: a[2] === 'vorne' });
          if (kontrastVor) { m.re = new RegExp('^' + kontrastVor + m.src + '$', m.re.flags); m.suche = new RegExp(kontrastVor + m.src + '(?= |$)', m.suche.flags); m.gruppenVersatz = 0; }
          L.muster.push(m);
        });
        // Kurzformen für Aufzählungen
        ['np', 'm', 'g', 'n', 'a', 'd'].forEach(function (feld) {
          if (!t[feld]) { return; }
          const liste = feld === 'np' ? 'np:' + bereich : feld + ':' + bereich;
          (L.listen[liste] = L.listen[liste] || []).push(neuesMuster(L, t[feld], { art: 'glied', id: id, bereich: bereich, feld: feld, thema: th.id, platz: platz }));
        });
        if (t.e) { L.muster.push(neuesMuster(L, t.e, { art: 'erklaerung', id: id, bereich: bereich, band: [5, 6, 7], thema: th.id })); }
      });
    });
  });
  // Auswahlfelder: Textform [1] und Beschriftung [0]
  Object.keys(T.chips || {}).forEach(function (gruppe) {
    const liste = 'chip:' + gruppe;
    L.listen[liste] = [];
    Object.keys(T.chips[gruppe]).forEach(function (key) {
      const v = T.chips[gruppe][key];
      [v[1], v[0]].forEach(function (text, j) {
        if (!text || (j === 1 && text === v[1])) { return; }
        L.listen[liste].push(neuesMuster(L, text, { art: 'chip', gruppe: gruppe, key: key, beschriftung: j === 1 }));
      });
    });
  });
  // Rahmensätze (s.*)
  const S = T.s;
  Object.keys(RAHMEN).forEach(function (key) {
    if (!S[key]) { return; }
    L.muster.push(neuesMuster(L, S[key], Object.assign({ art: 'rahmen', key: key }, RAHMEN[key]), RAHMEN[key].extra));
  });
  // Faktensätze (43b/44b/45b) und die festen Sätze von 4.2, 5, 5.2, 5.4
  (FAKTEN[lang] ? FAKTEN[lang](L) : []).forEach(function (f) {
    L.muster.push(neuesMuster(L, f.tpl, Object.assign({ art: 'fakt' }, f), f.extra));
  });
  L.muster.forEach(function (m, i) { m.nr = i; });
  L.woerter = lexikon(L);
}

// Rahmensätze: was die Aufzählung {liste} enthält und wo der Satz steht
const RAHMEN = {
  schule_intro: { ab: 'schule', wirkung: 'intro', feldDatum: 'schule_datum', feldQuelle: 'schule_quelle' },
  kind_intro: { ab: 'kind', wirkung: 'intro', feldDatum: 'kind_datum' },
  eltern_intro: { ab: 'eltern', wirkung: 'intro', feldDatum: 'eltern_datum', feldQuelle: 'eltern_quelle' },
  schule_staerken: { ab: 'schule', liste: 'chip:s_staerken' },
  schule_hilft: { ab: 'schule', liste: 'chip:s_hilft' },
  schule_erwartung: { ab: 'schule', liste: 'chip:s_erwartung' },
  schule_ohne: { ab: 'schule', liste: 'np:schule', band: [1, 2] },
  kind_interessen: { ab: 'kind', liste: 'chip:k_interessen' },
  kind_wuensche: { ab: 'kind', liste: 'chip:k_wuensche' },
  kind_vertrauen: { ab: 'kind', wirkung: 'vertrauen' },
  kind_ohne: { ab: 'kind', liste: 'np:kind', band: [1, 2] },
  eltern_staerken: { ab: 'eltern', liste: 'chip:e_staerken' },
  eltern_erwartung: { ab: 'eltern', liste: 'chip:e_erwartung', feldQuelle: 'eltern_quelle' },
  eltern_ohne: { ab: 'eltern', liste: 'np:eltern', band: [1, 2] },
  beob_ohne: { ab: 'beobachtung', liste: 'np:beobachtung', band: [1, 2] },
  beob_eine: { ab: 'beobachtung', wirkung: 'beob' },
  beob_mehrere: { ab: 'beobachtung', wirkung: 'beob' },
  muster_stark: { ab: 'deutung', liste: 'm:deutung', band: [6, 7] },
  muster_mittel: { ab: 'deutung', liste: 'm:deutung', band: [5] },
  muster_mittel_nach: { ab: 'deutung', liste: 'm:deutung', band: [5] },
  aengste_stark: { ab: 'deutung', liste: 'np:deutung', band: [5, 6, 7], p2: true, sortiert: true },
  aengste_mittel: { ab: 'deutung', liste: 'np:deutung', band: [4], p2: true, sortiert: true },
  aengste_beide: { ab: 'deutung', listen: { stark: ['np:deutung', [5, 6, 7]], mittel: ['np:deutung', [4]] }, p2: true, sortiert: true },
  abwehr_stark: { ab: 'deutung', liste: 'np:deutung', band: [5, 6, 7], p2: true, sortiert: true },
  abwehr_mittel: { ab: 'deutung', liste: 'np:deutung', band: [4], p2: true, sortiert: true },
  abwehr_beide: { ab: 'deutung', listen: { stark: ['np:deutung', [5, 6, 7]], mittel: ['np:deutung', [4]] }, p2: true, sortiert: true },
  abwehr_bezug_stark: { ab: 'deutung', listen: { stark: ['np:deutung', [5, 6, 7]] }, p2: true, sortiert: true },
  abwehr_bezug_beide: { ab: 'deutung', listen: { stark: ['np:deutung', [5, 6, 7]], mittel: ['np:deutung', [4]] }, p2: true, sortiert: true },
  abwehr_bezug_mittel: { ab: 'deutung', listen: { mittel: ['np:deutung', [4]] }, p2: true, sortiert: true },
  hyp_stark: { ab: 'deutung', liste: 'g:deutung', band: [6, 7], sortiert: true },
  hyp_mittel: { ab: 'deutung', liste: 'n:deutung', band: [4, 5], sortiert: true },
  hyp_nur_mittel: { ab: 'deutung', liste: 'n:deutung', band: [4, 5], sortiert: true },
  hyp_trauma: { ab: 'deutung', wirkung: 'trauma' },
  beduerfnis_stark: { ab: 'beduerfnisse', liste: 'a:beduerfnisse', band: [6, 7], sortiert: true },
  beduerfnis_mittel: { ab: 'beduerfnisse', liste: 'd:beduerfnisse', band: [4, 5], sortiert: true },
  beduerfnis_nur_mittel: { ab: 'beduerfnisse', liste: 'd:beduerfnisse', band: [4, 5], sortiert: true },
  ressourcen: { ab: 'beduerfnisse', liste: 'chip:ressourcen' }
};

// ---------- Faktensätze (43b/44b/45b rückwärts) ----------
// Je Eintrag: ab = Abschnitt, tpl = Satz in der Schreibweise des Text-Motors, extra.slots = Auswahl
// für Platzhalter, tu(w, x) = was der Satz setzt (w: gefangene Werte in Originalschreibweise).
// Die Sätze stehen hier noch einmal, weil sie in 43b/44b/45b im Programmcode stehen (nicht als Daten);
// der Rundlauf-Test (app/tests/ds-leser.test.cjs) merkt, wenn sie auseinanderlaufen.
const FAKTEN = {};
FAKTEN.de = function () {
  const O = DS_TEXTE.de.optionen, f = [];
  const W = '{w: (erste Wörter mit etwa {w} Monaten)}', ex = { slots: { w: 'nummer' } };
  f.push({ ab: 'auftrag', tpl: 'Das Zentrum für sozio-emotionale Entwicklung (CDSE) wurde{datum: am {datum}} von {wer} beauftragt, eine vertiefende Diagnostik bei {wem} durchzuführen, um {seinen} aktuellen sozio-emotionalen Entwicklungsstand und Förderbedarf festzustellen.',
    tu: function (w, x) { x.f('auftrag_datum', w.datum); x.auftraggeber(w.wer); x.wem(w.wem, { w: 'der Schülerin', m: 'dem Schüler' }); } });
  f.push({ ab: 'auftrag', tpl: 'Die Beauftragung erfolgte aufgrund von {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:anlass', { rest: 'anlass_andere' }); } });
  f.push({ ab: 'auftrag', tpl: 'Ziel ist es, {liste} einzuleiten.', tu: function (w, x) { x.liste(w._liste, 'chip:anliegen'); } });
  f.push({ ab: 'auftrag', tpl: 'Die Anfrage erfolgte auf Empfehlung {liste} sowie auf Wunsch der Eltern.', tu: function (w, x) { x.liste(w._liste, 'chip:empfohlen'); x.chip('empfohlen', 'eltern'); } });
  f.push({ ab: 'auftrag', tpl: 'Die Anfrage erfolgte auf Empfehlung {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:empfohlen'); } });
  f.push({ ab: 'auftrag', tpl: 'Die Anfrage erfolgte auf Wunsch der Eltern.', tu: function (w, x) { x.chip('empfohlen', 'eltern'); } });
  // Vorgeschichte
  f.push({ ab: 'vorgeschichte', tpl: 'Schwangerschaft und Geburt verliefen nach Angaben der Eltern unauffällig.', tu: function (w, x) { x.f('schwangerschaft', 'unauffaellig'); x.f('geburt', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die Schwangerschaft verlief unauffällig.', tu: function (w, x) { x.f('schwangerschaft', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die Schwangerschaft verlief mit Komplikationen{d: ({d})}.', tu: function (w, x) { x.f('schwangerschaft', 'komplikationen'); x.frei('schwangerschaft_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die Geburt verlief unauffällig.', tu: function (w, x) { x.f('geburt', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Bei der Geburt kam es zu Komplikationen{d: ({d})}.', tu: function (w, x) { x.f('geburt', 'komplikationen'); x.frei('geburt_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Motorik und Sprache entwickelten sich altersgerecht' + W + '.', extra: ex, tu: function (w, x) { x.f('motorik', 'altersgerecht'); x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die motorische Entwicklung verlief altersgerecht, die Sprachentwicklung verzögert' + W + '.', extra: ex, tu: function (w, x) { x.f('motorik', 'altersgerecht'); x.f('sprache', 'verzoegert'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die Sprachentwicklung verlief altersgerecht' + W + ', die motorische Entwicklung verzögert.', extra: ex, tu: function (w, x) { x.f('motorik', 'verzoegert'); x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die motorische Entwicklung verlief altersgerecht.', tu: function (w, x) { x.f('motorik', 'altersgerecht'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die motorische Entwicklung verlief verzögert{d: ({d})}.', tu: function (w, x) { x.f('motorik', 'verzoegert'); x.frei('motorik_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die Sprachentwicklung verlief altersgerecht' + W + '.', extra: ex, tu: function (w, x) { x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Die Sprachentwicklung verlief verzögert' + W + '{d:; {d}}.', extra: ex, tu: function (w, x) { x.f('sprache', 'verzoegert'); x.worte(w.w); x.frei('sprache_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Diagnostiziert {{wurde|wurden}} bisher {liste}.', tu: function (w, x) { x.diagnosen(w._liste); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Bisher liegen keine Diagnosen vor.', tu: function (w, x) { x.f('keine_diagnosen', true); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Bisherige schulische und außerschulische Unterstützungsmaßnahmen:', tu: function () {} });
  // Sozialbericht: Familienstand und Wohnort (alle Kombinationen wie in 43b)
  const STAND = [['getrennt', 'Die Eltern von {Name} leben getrennt'], ['zusammen', 'Die Eltern von {Name} leben zusammen'],
    ['alleinerziehend', 'Die Mutter von {Name} ist alleinerziehend', 'nichtVater'], ['alleinerziehend', 'Der Vater von {Name} ist alleinerziehend', 'vater'],
    ['patchwork', '{Name} wächst in einer Patchworkfamilie auf'], ['verstorben', 'Ein Elternteil von {Name} ist verstorben']];
  STAND.forEach(function (s) {
    Object.keys(O.lebt_bei).forEach(function (lb) {
      if ((s[0] === 'zusammen' && lb === 'beide') || (s[2] === 'vater' && lb !== 'vater') || (s[2] === 'nichtVater' && lb === 'vater')) { return; }
      f.push({ ab: 'sozialbericht', pos: 'stand', tpl: s[1] + '; {er} ' + O.lebt_bei[lb][1] + '.', tu: function (w, x) { x.f('familienstand', s[0]); x.f('lebt_bei', lb); } });
    });
    f.push({ ab: 'sozialbericht', pos: 'stand', tpl: s[1] + '.', tu: function (w, x) { x.f('familienstand', s[0]); } });
  });
  f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{Name} lebt mit beiden Eltern zusammen.', tu: function (w, x) { x.f('familienstand', 'zusammen'); x.f('lebt_bei', 'beide'); } });
  Object.keys(O.lebt_bei).forEach(function (lb) { f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{N} ' + O.lebt_bei[lb][1] + '.', tu: function (w, x) { x.f('lebt_bei', lb); } }); });
  Object.keys(O.kontakt).forEach(function (k) { f.push({ ab: 'sozialbericht', pos: 'stand', tpl: O.kontakt[k], tu: function (w, x) { x.f('kontakt', k); } }); });
  const POS = Object.keys(O.position), exPos = { slots: { pos: POS.map(function (k) { return O.position[k]; }), n: 'nummer' } };
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} ist Einzelkind.', tu: function (w, x) { x.f('geschwister_anzahl', '0'); } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} hat ein Geschwisterkind{p: und ist {pos}}.', extra: exPos, tu: function (w, x) { x.f('geschwister_anzahl', '1'); if (w.pos >= 0) { x.f('geschwister_position', POS[w.pos]); } } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} hat {n} Geschwister{p: und ist {pos}}.', extra: exPos, tu: function (w, x) { x.f('geschwister_anzahl', String(w.n)); if (w.pos >= 0) { x.f('geschwister_position', POS[w.pos]); } } });
  f.push({ ab: 'sozialbericht', pos: 'sprachen', tpl: 'In der Familie wird {liste} gesprochen.', tu: function (w, x) { x.liste(w._liste, 'chip:sprachen', { rest: 'sprache_andere', andere: 'andere' }); } });
  // Beruf der Eltern: Mutter, Vater oder beide ("…; der Vater …")
  const Z = { slots: { z: [O.arbeitszeit.vollzeit, O.arbeitszeit.teilzeit], z2: [O.arbeitszeit.vollzeit, O.arbeitszeit.teilzeit] } };
  const ZK = ['vollzeit', 'teilzeit'];
  const teil = function (wer, n) { return { nicht: wer + ' ist derzeit nicht berufstätig', arbeit: wer + ' arbeitet{z' + n + ': {z' + n + '}}{b' + n + ': als {b' + n + '}}' }; };
  const setzeBeruf = function (x, feld, zeit, art, z, b) { if (art === 'nicht') { x.f(zeit, 'nicht'); return; } if (z >= 0) { x.f(zeit, ZK[z]); } if (b) { x.frei(feld, b); } };
  const M = teil('Die Mutter', ''), V = teil('der Vater', '2'), V1 = teil('Der Vater', '2');
  ['nicht', 'arbeit'].forEach(function (a) {
    f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: M[a] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_mutter', 'zeit_mutter', a, w.z, w.b); } });
    f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: V1[a] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_vater', 'zeit_vater', a, w.z2, w.b2); } });
    ['nicht', 'arbeit'].forEach(function (b) {
      f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: M[a] + '; ' + V[b] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_mutter', 'zeit_mutter', a, w.z, w.b); setzeBeruf(x, 'beruf_vater', 'zeit_vater', b, w.z2, w.b2); } });
    });
  });
  f.push({ ab: 'sozialbericht', pos: 'ereignisse', tpl: '{{Als belastendes Ereignis wird|Als belastende Ereignisse werden}} {liste} genannt.', tu: function (w, x) { x.listeDetails(w._liste, 'ereignisse', 'ereignis_details'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'Nach der Schule besucht {N} die Maison Relais.', tu: function (w, x) { x.chip('betreuung', 'maison_relais'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'Außerhalb der Schule betreuen die Großeltern {Na} regelmäßig.', tu: function (w, x) { x.chip('betreuung', 'grosseltern'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'Außerhalb der Schule wird {N} von einer Tagesmutter betreut.', tu: function (w, x) { x.chip('betreuung', 'tagesmutter'); } });
  // Aktuelle Situation
  const exAm = { slots: { am: ['am', 'an der'] } };
  f.push({ ab: 'aktuell', tpl: 'Derzeit besucht {N} die Klasse {klasse}{s: {am} {schule}}{l: bei {lp}}.', extra: exAm, tu: function (w, x) { x.f('klasse', w.klasse); x.f('schule_name', w.schule); x.frei('lehrperson', w.lp); } });
  f.push({ ab: 'aktuell', tpl: 'Derzeit wird {N} {am} {schule}{l: bei {lp}} beschult.', extra: exAm, tu: function (w, x) { x.f('schule_name', w.schule); x.frei('lehrperson', w.lp); } });
  f.push({ ab: 'aktuell', tpl: '{seine} Referenzperson im ESEB ist {x}.', tu: function (w, x) { x.frei('eseb_referenz', w.x); } });
  // Diagnostische Verfahren
  f.push({ ab: 'verfahren', tpl: 'Die vorliegende Einschätzung beruht {teile}.', tu: function (w, x) { x.verfahren(w._teile, { und: 'sowie', auf: 'auf', beob: 'auf Beobachtungen im Unterricht', gespr: 'auf Gesprächen' }); } });
  f.push({ ab: 'verfahren', tpl: 'Beobachtungen und Gespräche fanden in {ort} statt.', tu: function (w, x) { x.frei('verfahren_ort', w.ort); } });
  // 4.2 ELDiB (entsteht aus der ELDiB-Einschätzung, nicht aus dem DS)
  f.push({ ab: 'eldib', eldib: 'fest', tpl: 'Der ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen) ist ein standardisiertes Einschätzungsinstrument, das dazu dient, die soziale und emotionale Entwicklung von Kindern und Jugendlichen im Alter zwischen Geburt und sechzehn Jahren zu erfassen.' });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: 'Er stellt ein Profil spezifischer Fähigkeiten zur Verfügung, die als Indikatoren der sozialen und emotionalen Förderung dienen.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Im Bereich {bereich} ({code}) wurden noch keine Items als erreicht eingeschätzt.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Am weitesten entwickelt ist bei {Name} der Bereich {bereich} ({code}): Hier befindet {er} sich auf Entwicklungsstufe {rest}.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Am wenigsten entwickelt ist der Bereich {bereich} ({code}): Hier befindet {N} sich auf Entwicklungsstufe {rest}.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Im Bereich {bereich} ({code}) befindet {N} sich auf Entwicklungsstufe {rest}.' });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: '{N} verfügt hier bereits über gute Fähigkeiten: {rest}.' });
  f.push({ ab: 'eldib', eldib: 'ziele', tpl: 'Ausgehend vom Richtziel ergeben sich folgende Lernziele für {Na}:' });
  f.push({ ab: 'eldib', eldib: 'ziele', tpl: 'In diesem Bereich wurden keine Lernziele festgelegt.' });
  f.push({ ab: 'eldib', eldib: 'alter', tpl: 'Gemessen am Lebensalter von {jahre} Jahren wäre Entwicklungsstufe {rest}.' });
  f.push({ ab: 'eldib', eldib: 'alter', tpl: 'Alle eingeschätzten Bereiche entsprechen mindestens der altersentsprechenden Entwicklungsstufe {rest}.' });
  // 5 Schlussfolgerung: vier Fassungen, jeder Satz verrät die Abstimmung mit der Familie
  const schluss = function (a, tpl) { f.push({ ab: 'schluss', tpl: tpl, tu: function (w, x) { if (a) { x.f('abgestimmt', a); } else { x.merke('ohneAbstimmung', true); } } }); };
  schluss('vorbehalte', 'Auf Grundlage der vorliegenden Testergebnisse, Beobachtungen und anamnestischen Informationen wurden spezifische Förderbedarfe identifiziert.');
  schluss('vorbehalte', 'In Gesprächen mit {wer} konnten Empfehlungen zur weiteren Unterstützung der individuellen Entwicklung erarbeitet werden.');
  schluss('vorbehalte', 'Dabei wurden einzelne vorgeschlagene Maßnahmen {von} kritisch hinterfragt bzw. nicht vollständig befürwortet.');
  schluss('nein', 'Auf Grundlage der vorliegenden Testergebnisse, Beobachtungen und anamnestischen Informationen wurden spezifische Förderbedarfe identifiziert und Empfehlungen formuliert.');
  schluss('nein', 'Eine Abstimmung dieser Empfehlungen mit {wer} war bislang nicht möglich.');
  schluss('ja', 'Auf Basis der erhobenen Testergebnisse, Beobachtungen und anamnestischen Informationen wurden in enger Abstimmung mit {wer} gezielte Förderbedarfe identifiziert.');
  schluss('ja', 'Daraus abgeleitet wurden gemeinsam Empfehlungen formuliert, die die individuelle Entwicklung wirksam unterstützen sollen.');
  schluss('', 'Auf Basis der erhobenen Testergebnisse, Beobachtungen und anamnestischen Informationen wurden gezielte Förderbedarfe identifiziert.');
  schluss('', 'Daraus abgeleitet wurden Empfehlungen formuliert, die die individuelle Entwicklung wirksam unterstützen sollen.');
  // 5.2 Ziele
  f.push({ ab: 'ziele', tpl: 'Die folgenden Förderziele leiten sich aus den ELDiB-Lernzielen ab.', tu: function () {} });
  f.push({ ab: 'ziele', tpl: 'Sie beschreiben den jeweils nächsten Entwicklungsschritt; ihre Umsetzung wird {bis} im Alltag beobachtet und in der nächsten ELDiB-Einschätzung überprüft.', tu: function (w, x) { x.zieleBis(w._bis); } });
  // 5.3 Empfehlungen: Zwischenüberschriften
  f.push({ ab: 'empfehlungen', kontext: 'familie', tpl: 'Familiärer Kontext' });
  f.push({ ab: 'empfehlungen', kontext: 'schule', tpl: 'Schulischer Kontext (lokal)' });
  f.push({ ab: 'empfehlungen', kontext: 'region', tpl: 'Regionaler Kontext (ESEB / CDSE)' });
  // 5.4 CNI
  f.push({ ab: 'cni', cniKopf: true, tpl: 'Das CDSE empfiehlt der Nationalen Kommission für Inklusion (CNI) folgende {{Maßnahme|Maßnahmen}}:', tu: function () {} });
  // Vorlagensätze der CNI-Vorlage, von Hand ausgefüllt (herkunft „frei“)
  f.push({ ab: 'auftrag', vorlage: true, tpl: 'Das Zentrum für sozio-emotionale Entwicklung wurde am {datum} von der nationalen Kommission zur Inklusion (CNI) damit beauftragt, eine vertiefende Diagnostik bei {wem} durchzuführen, um {x} aktuellen sozio-emotionalen Entwicklungsstand und Förderbedarf festzustellen.',
    tu: function (w, x) { x.f('auftrag_datum', w.datum, 0.85); x.f('auftraggeber', 'cni', 0.85); x.wem(w.wem, {}); } });
  return f;
};

FAKTEN.fr = function () {
  const O = DS_TEXTE.fr.optionen, f = [];
  const W = '{w: (premiers mots vers {w} mois)}', ex = { slots: { w: 'nummer' } };
  f.push({ ab: 'auftrag', tpl: 'Le Centre pour le développement socio-émotionnel (CDSE) a été mandaté{datum: en date du {datum}} par {wer} pour réaliser un diagnostic spécialisé de {wem}, afin de déterminer son état actuel de développement socio-émotionnel ainsi que ses besoins éducatifs particuliers.',
    tu: function (w, x) { x.f('auftrag_datum', w.datum); x.auftraggeber(w.wer); x.wem(w.wem, {}, "l'élève"); } });
  f.push({ ab: 'auftrag', tpl: 'La demande fait suite à {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:anlass', { rest: 'anlass_andere' }); } });
  f.push({ ab: 'auftrag', tpl: '{{Elle|La demande}} a pour objectif {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:anliegen'); } });
  f.push({ ab: 'auftrag', tpl: 'Cette demande a été formulée sur recommandation {liste}, en accord avec le souhait des parents.', tu: function (w, x) { x.liste(w._liste, 'chip:empfohlen'); x.chip('empfohlen', 'eltern'); } });
  f.push({ ab: 'auftrag', tpl: 'Cette demande a été formulée sur recommandation {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:empfohlen'); } });
  f.push({ ab: 'auftrag', tpl: 'Cette demande émane des parents.', tu: function (w, x) { x.chip('empfohlen', 'eltern'); } });
  f.push({ ab: 'vorgeschichte', tpl: "Selon les parents, la grossesse et l'accouchement se sont déroulés sans particularité.", tu: function (w, x) { x.f('schwangerschaft', 'unauffaellig'); x.f('geburt', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: "La grossesse s'est déroulée sans particularité.", tu: function (w, x) { x.f('schwangerschaft', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'La grossesse a été marquée par des complications{d: ({d})}.', tu: function (w, x) { x.f('schwangerschaft', 'komplikationen'); x.frei('schwangerschaft_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: "L'accouchement s'est déroulé sans particularité.", tu: function (w, x) { x.f('geburt', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: "L'accouchement a donné lieu à des complications{d: ({d})}.", tu: function (w, x) { x.f('geburt', 'komplikationen'); x.frei('geburt_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: "Le développement moteur et le développement du langage ont été conformes à l'âge" + W + '.', extra: ex, tu: function (w, x) { x.f('motorik', 'altersgerecht'); x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: "Le développement moteur a été conforme à l'âge, tandis que le développement du langage a été retardé" + W + '.', extra: ex, tu: function (w, x) { x.f('motorik', 'altersgerecht'); x.f('sprache', 'verzoegert'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: "Le développement du langage a été conforme à l'âge" + W + ', tandis que le développement moteur a été retardé.', extra: ex, tu: function (w, x) { x.f('motorik', 'verzoegert'); x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: "Le développement moteur a été conforme à l'âge.", tu: function (w, x) { x.f('motorik', 'altersgerecht'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Le développement moteur a été retardé{d: ({d})}.', tu: function (w, x) { x.f('motorik', 'verzoegert'); x.frei('motorik_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: "Le développement du langage a été conforme à l'âge" + W + '.', extra: ex, tu: function (w, x) { x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Le développement du langage a été retardé' + W + '{d:; {d}}.', extra: ex, tu: function (w, x) { x.f('sprache', 'verzoegert'); x.worte(w.w); x.frei('sprache_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: '{{Le diagnostic suivant a été posé|Les diagnostics suivants ont été posés}} à ce jour : {liste}.', tu: function (w, x) { x.diagnosen(w._liste); } });
  f.push({ ab: 'vorgeschichte', tpl: "Aucun diagnostic n'a été posé à ce jour.", tu: function (w, x) { x.f('keine_diagnosen', true); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Mesures de soutien scolaires et extrascolaires antérieures :', tu: function () {} });
  const STAND = [['getrennt', 'Les parents de {Name} sont séparés'], ['zusammen', 'Les parents de {Name} vivent ensemble'], ['alleinerziehend', '{Name} grandit dans une famille monoparentale'],
    ['patchwork', '{Name} grandit dans une famille recomposée'], ['verstorben', "L'un des parents de {Name} est décédé"]];
  STAND.forEach(function (s) {
    Object.keys(O.lebt_bei).forEach(function (lb) {
      if (s[0] === 'zusammen' && lb === 'beide') { return; }
      f.push({ ab: 'sozialbericht', pos: 'stand', tpl: s[1] + ' ; {il} ' + O.lebt_bei[lb][1] + '.', tu: function (w, x) { x.f('familienstand', s[0]); x.f('lebt_bei', lb); } });
    });
    f.push({ ab: 'sozialbericht', pos: 'stand', tpl: s[1] + '.', tu: function (w, x) { x.f('familienstand', s[0]); } });
  });
  f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{Name} vit avec ses deux parents.', tu: function (w, x) { x.f('familienstand', 'zusammen'); x.f('lebt_bei', 'beide'); } });
  Object.keys(O.lebt_bei).forEach(function (lb) { f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{N} ' + O.lebt_bei[lb][1] + '.', tu: function (w, x) { x.f('lebt_bei', lb); } }); });
  Object.keys(O.kontakt).forEach(function (k) { f.push({ ab: 'sozialbericht', pos: 'stand', tpl: O.kontakt[k], tu: function (w, x) { x.f('kontakt', k); } }); });
  // Geschwister: "fait partie d'une fratrie de trois enfants, dont il est l'aîné"
  const ZAHL = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze'];
  const POSK = ['aeltestes', 'mittleres', 'juengstes'];
  const POSF = [["l'aîné", "l'aînée"], ["l'un des enfants du milieu", "l'une des enfants du milieu"], ['le plus jeune', 'la plus jeune']];
  const posAlt = [], posKey = [];
  POSF.forEach(function (p, i) { [p[0], p[1], p[0] + '/' + p[1]].forEach(function (t) { posAlt.push(t); posKey.push(POSK[i]); }); });
  const exG = { slots: { z: ZAHL, n: 'nummer', pos: posAlt } };
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} est enfant unique.', tu: function (w, x) { x.f('geschwister_anzahl', '0'); } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: "{N} fait partie d'une fratrie de {z} enfants{p:, dont {il} est {pos}}.", extra: exG, tu: function (w, x) { if (w.z > 0) { x.f('geschwister_anzahl', String(w.z - 1)); } if (w.pos >= 0) { x.f('geschwister_position', posKey[w.pos]); } } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: "{N} fait partie d'une fratrie de {n} enfants{p:, dont {il} est {pos}}.", extra: exG, tu: function (w, x) { x.f('geschwister_anzahl', String(w.n - 1)); if (w.pos >= 0) { x.f('geschwister_position', posKey[w.pos]); } } });
  f.push({ ab: 'sozialbericht', pos: 'sprachen', tpl: 'À la maison, la famille parle {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:sprachen', { rest: 'sprache_andere', andere: 'andere' }); } });
  const Z = { slots: { z: [O.arbeitszeit.vollzeit, O.arbeitszeit.teilzeit], z2: [O.arbeitszeit.vollzeit, O.arbeitszeit.teilzeit] } };
  const ZK = ['vollzeit', 'teilzeit'];
  const teil = function (wer, n) { return { nicht: wer + " n'exerce actuellement pas d'activité professionnelle", arbeit: wer + ' travaille{z' + n + ': {z' + n + '}}{b' + n + ': en tant que {b' + n + '}}' }; };
  const setzeBeruf = function (x, feld, zeit, art, z, b) { if (art === 'nicht') { x.f(zeit, 'nicht'); return; } if (z >= 0) { x.f(zeit, ZK[z]); } if (b) { x.frei(feld, b); } };
  const M = teil('La mère', ''), V = teil('le père', '2'), V1 = teil('Le père', '2');
  ['nicht', 'arbeit'].forEach(function (a) {
    f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: M[a] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_mutter', 'zeit_mutter', a, w.z, w.b); } });
    f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: V1[a] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_vater', 'zeit_vater', a, w.z2, w.b2); } });
    ['nicht', 'arbeit'].forEach(function (b) {
      f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: M[a] + ' ; ' + V[b] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_mutter', 'zeit_mutter', a, w.z, w.b); setzeBeruf(x, 'beruf_vater', 'zeit_vater', b, w.z2, w.b2); } });
    });
  });
  f.push({ ab: 'sozialbericht', pos: 'ereignisse', tpl: "{{L'événement marquant suivant est mentionné|Les événements marquants suivants sont mentionnés}} : {liste}.", tu: function (w, x) { x.listeDetails(w._liste, 'ereignisse', 'ereignis_details'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: "Après l'école, {N} fréquente la maison relais.", tu: function (w, x) { x.chip('betreuung', 'maison_relais'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: "En dehors de l'école, {N} est régulièrement [[gardé|gardée]] par ses grands-parents.", tu: function (w, x) { x.chip('betreuung', 'grosseltern'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: '{N} est par ailleurs [[accueilli|accueillie]] chez une assistante parentale.', tu: function (w, x) { x.chip('betreuung', 'tagesmutter'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: "En dehors de l'école, {N} est [[accueilli|accueillie]] chez une assistante parentale.", tu: function (w, x) { x.chip('betreuung', 'tagesmutter'); } });
  const exS = { slots: { schule: { vor: ["à l'école", 'au', 'à la', "à l'"] } } };
  f.push({ ab: 'aktuell', tpl: '{N} est actuellement [[scolarisé|scolarisée]]{k: dans la classe {klasse}}{s: {schule}}{l:, sous la responsabilité de {lp}}.', extra: exS,
    tu: function (w, x) { x.f('klasse', w.klasse); x.f('schule_name', x.ohneVorwort(w.schule)); x.frei('lehrperson', w.lp); } });
  f.push({ ab: 'aktuell', tpl: "Sa personne de référence au sein de l'ESEB est {x}.", tu: function (w, x) { x.frei('eseb_referenz', w.x); } });
  f.push({ ab: 'aktuell', tpl: "La personne de référence de {Name} au sein de l'ESEB est {x}.", tu: function (w, x) { x.frei('eseb_referenz', w.x); } });
  f.push({ ab: 'verfahren', tpl: 'Cette évaluation repose {teile}.', tu: function (w, x) { x.verfahren(w._teile, { und: 'ainsi que', auf: 'sur', beob: 'sur des observations en classe', gespr: 'sur des entretiens' }); } });
  f.push({ ab: 'verfahren', tpl: 'Lieu des observations et des entretiens : {ort}.', tu: function (w, x) { x.frei('verfahren_ort', w.ort); } });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: "L'ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen) est un instrument d'évaluation standardisé conçu pour mesurer le développement social et émotionnel des enfants et des adolescents à partir de la naissance jusqu'à l'âge de seize ans." });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: "Il fournit un profil de compétences spécifiques servant d'indicateurs du niveau des compétences sociales et émotionnelles." });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: "Dans le domaine {bereich} ({code}), aucun item n'a encore été évalué comme acquis." });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Les compétences les plus développées chez {Name} sont celles du domaine {bereich} ({code}), où {il} se situe au niveau de développement {rest}.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Les compétences les moins développées chez {Name} sont celles du domaine {bereich} ({code}), où {il} se situe au niveau de développement {rest}.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'Dans le domaine {bereich} ({code}), {N} se situe au niveau de développement {rest}.' });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: '{N} dispose déjà de bons acquis dans ce domaine : {rest}.' });
  f.push({ ab: 'eldib', eldib: 'ziele', tpl: "En partant de l'objectif général, les objectifs d'apprentissage suivants ont été définis pour {Nt} :" });
  f.push({ ab: 'eldib', eldib: 'ziele', tpl: "Aucun objectif d'apprentissage n'a été défini dans ce domaine." });
  f.push({ ab: 'eldib', eldib: 'alter', tpl: "Au regard de l'âge de {Name} ({jahre} ans), le niveau de développement {rest}." });
  f.push({ ab: 'eldib', eldib: 'alter', tpl: "Tous les domaines évalués atteignent au moins le niveau de développement attendu à l'âge de {Name} ({rest})." });
  const schluss = function (a, tpl) { f.push({ ab: 'schluss', tpl: tpl, tu: function (w, x) { if (a) { x.f('abgestimmt', a); } else { x.merke('ohneAbstimmung', true); } } }); };
  schluss('vorbehalte', 'Sur la base des résultats des tests disponibles, des observations et des données anamnestiques, des besoins spécifiques de soutien ont été identifiés.');
  schluss('vorbehalte', 'Lors des entretiens avec {wer}, des recommandations visant à soutenir davantage le développement individuel ont pu être élaborées.');
  schluss('vorbehalte', "Certaines mesures proposées ont toutefois été remises en question ou n'ont pas été entièrement approuvées par {von}.");
  schluss('nein', 'Sur la base des résultats des tests disponibles, des observations et des données anamnestiques, des besoins spécifiques de soutien ont été identifiés et des recommandations ont été formulées.');
  schluss('nein', "Une concertation sur ces recommandations avec {wer} n'a pas encore pu avoir lieu.");
  schluss('ja', 'Sur la base des résultats des tests, des observations et des informations anamnestiques recueillies, des besoins spécifiques de soutien ont pu être identifiés en étroite concertation avec {wer}.');
  schluss('ja', 'Par la suite, des recommandations ont été formulées conjointement, dans le but de soutenir efficacement le développement individuel.');
  schluss('', 'Sur la base des résultats des tests, des observations et des informations anamnestiques recueillies, des besoins spécifiques de soutien ont pu être identifiés.');
  schluss('', 'Par la suite, des recommandations ont été formulées dans le but de soutenir efficacement le développement individuel.');
  f.push({ ab: 'ziele', tpl: "Les objectifs de soutien suivants découlent des objectifs d'apprentissage de l'ELDiB.", tu: function () {} });
  f.push({ ab: 'ziele', tpl: 'Ils décrivent à chaque fois la prochaine étape de développement ; leur mise en œuvre sera observée au quotidien {bis} et vérifiée lors de la prochaine évaluation ELDiB.', tu: function (w, x) { x.zieleBis(w._bis); } });
  f.push({ ab: 'empfehlungen', kontext: 'familie', tpl: 'Contexte familial' });
  f.push({ ab: 'empfehlungen', kontext: 'schule', tpl: 'Contexte scolaire (local)' });
  f.push({ ab: 'empfehlungen', kontext: 'region', tpl: 'Contexte régional (ESEB / CDSE)' });
  f.push({ ab: 'cni', cniKopf: true, tpl: "Le CDSE recommande à la Commission nationale d'inclusion (CNI) {{la mesure suivante|les mesures suivantes}} :", tu: function () {} });
  f.push({ ab: 'auftrag', vorlage: true, tpl: "Le Centre pour le développement socio-émotionnel (CDSE) a été mandaté en date du {datum} par la Commission nationale d'inclusion (CNI) pour réaliser un diagnostic spécialisé de {wem}, afin de déterminer son état actuel de développement socio-émotionnel ainsi que ses besoins éducatifs particuliers.",
    tu: function (w, x) { x.f('auftrag_datum', w.datum, 0.85); x.f('auftraggeber', 'cni', 0.85); x.wem(w.wem, {}, "l'élève"); } });
  return f;
};

FAKTEN.en = function () {
  const O = DS_TEXTE.en.optionen, f = [];
  const W = '{w: (first words at around {w} months)}', ex = { slots: { w: 'nummer' } };
  f.push({ ab: 'auftrag', tpl: 'The Centre pour le développement socio-émotionnel (Centre for Socio-Emotional Development, CDSE) was commissioned by {wer}{datum: on {datum}} to carry out a specialized diagnostic assessment of {wem} in order to determine {his} current level of socio-emotional development and {his} special educational needs.',
    tu: function (w, x) { x.f('auftrag_datum', w.datum); x.auftraggeber(w.wer); x.wem(w.wem, {}); } });
  f.push({ ab: 'auftrag', tpl: 'The referral was prompted by {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:anlass', { rest: 'anlass_andere', beide: 'behavioral difficulties at school and at home' }); } });
  f.push({ ab: 'auftrag', tpl: 'The aim is to initiate {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:anliegen'); } });
  f.push({ ab: 'auftrag', tpl: 'The request was made at the wish of {Qd} and on the recommendation of {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:empfohlen'); x.chip('empfohlen', 'eltern'); } });
  f.push({ ab: 'auftrag', tpl: 'The request was made on the recommendation of {liste}.', tu: function (w, x) { x.liste(w._liste, 'chip:empfohlen'); } });
  f.push({ ab: 'auftrag', tpl: 'The request was made at the wish of {Qd}.', tu: function (w, x) { x.chip('empfohlen', 'eltern'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'According to {Q}, the pregnancy and birth were uneventful.', tu: function (w, x) { x.f('schwangerschaft', 'unauffaellig'); x.f('geburt', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'The pregnancy was uneventful.', tu: function (w, x) { x.f('schwangerschaft', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'There were complications during pregnancy{d: ({d})}.', tu: function (w, x) { x.f('schwangerschaft', 'komplikationen'); x.frei('schwangerschaft_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'The birth was uneventful.', tu: function (w, x) { x.f('geburt', 'unauffaellig'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'There were complications at birth{d: ({d})}.', tu: function (w, x) { x.f('geburt', 'komplikationen'); x.frei('geburt_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Motor and language development were age-appropriate' + W + '.', extra: ex, tu: function (w, x) { x.f('motorik', 'altersgerecht'); x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Motor development was age-appropriate, while language development was delayed' + W + '.', extra: ex, tu: function (w, x) { x.f('motorik', 'altersgerecht'); x.f('sprache', 'verzoegert'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Language development was age-appropriate' + W + ', while motor development was delayed.', extra: ex, tu: function (w, x) { x.f('motorik', 'verzoegert'); x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Motor development was age-appropriate.', tu: function (w, x) { x.f('motorik', 'altersgerecht'); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Motor development was delayed{d: ({d})}.', tu: function (w, x) { x.f('motorik', 'verzoegert'); x.frei('motorik_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Language development was age-appropriate' + W + '.', extra: ex, tu: function (w, x) { x.f('sprache', 'altersgerecht'); x.worte(w.w); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Language development was delayed' + W + '{d:; {d}}.', extra: ex, tu: function (w, x) { x.f('sprache', 'verzoegert'); x.worte(w.w); x.frei('sprache_details', w.d); } });
  f.push({ ab: 'vorgeschichte', tpl: 'To date, {N} has been diagnosed with {liste}.', tu: function (w, x) { x.diagnosen(w._liste); } });
  f.push({ ab: 'vorgeschichte', tpl: 'No diagnoses have been made to date.', tu: function (w, x) { x.f('keine_diagnosen', true); } });
  f.push({ ab: 'vorgeschichte', tpl: 'Previous school-based and out-of-school support measures:', tu: function () {} });
  const STAND = [['getrennt', '{Name}’s parents are separated'], ['zusammen', '{Name}’s parents live together'], ['alleinerziehend', '{Name}’s mother is a single parent', 'nichtVater'],
    ['alleinerziehend', '{Name}’s father is a single parent', 'vater'], ['patchwork', '{Name} is growing up in a blended family'], ['verstorben', 'One of {Name}’s parents has died']];
  STAND.forEach(function (s) {
    Object.keys(O.lebt_bei).forEach(function (lb) {
      if ((s[0] === 'zusammen' && lb === 'beide') || (s[2] === 'vater' && lb !== 'vater') || (s[2] === 'nichtVater' && lb === 'vater')) { return; }
      f.push({ ab: 'sozialbericht', pos: 'stand', tpl: s[1] + '; [[he|she]] ' + O.lebt_bei[lb][1] + '.', tu: function (w, x) { x.f('familienstand', s[0]); x.f('lebt_bei', lb); } });
    });
    f.push({ ab: 'sozialbericht', pos: 'stand', tpl: s[1] + '.', tu: function (w, x) { x.f('familienstand', s[0]); } });
  });
  f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{Name} lives with {his} mother, who is a single parent.', tu: function (w, x) { x.f('familienstand', 'alleinerziehend'); x.f('lebt_bei', 'mutter'); } });
  f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{Name} lives with {his} father, who is a single parent.', tu: function (w, x) { x.f('familienstand', 'alleinerziehend'); x.f('lebt_bei', 'vater'); } });
  f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{Name} lives with both parents.', tu: function (w, x) { x.f('familienstand', 'zusammen'); x.f('lebt_bei', 'beide'); } });
  Object.keys(O.lebt_bei).forEach(function (lb) { f.push({ ab: 'sozialbericht', pos: 'stand', tpl: '{N} ' + O.lebt_bei[lb][1] + '.', tu: function (w, x) { x.f('lebt_bei', lb); } }); });
  Object.keys(O.kontakt).forEach(function (k) { f.push({ ab: 'sozialbericht', pos: 'stand', tpl: O.kontakt[k], tu: function (w, x) { x.f('kontakt', k); } }); });
  const ZAHL = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  const POS = Object.keys(O.position), exG = { slots: { z: ZAHL, n: 'nummer', pos: POS.map(function (k) { return O.position[k]; }) } };
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} is an only child.', tu: function (w, x) { x.f('geschwister_anzahl', '0'); } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} has a younger sibling.', tu: function (w, x) { x.f('geschwister_anzahl', '1'); x.f('geschwister_position', 'aeltestes'); } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} has an older sibling.', tu: function (w, x) { x.f('geschwister_anzahl', '1'); x.f('geschwister_position', 'juengstes'); } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} has one sibling.', tu: function (w, x) { x.f('geschwister_anzahl', '1'); } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} has {z} siblings{p: and is {pos}}.', extra: exG, tu: function (w, x) { if (w.z >= 0) { x.f('geschwister_anzahl', String(w.z)); } if (w.pos >= 0) { x.f('geschwister_position', POS[w.pos]); } } });
  f.push({ ab: 'sozialbericht', pos: 'geschwister', tpl: '{N} has {n} siblings{p: and is {pos}}.', extra: exG, tu: function (w, x) { x.f('geschwister_anzahl', String(w.n)); if (w.pos >= 0) { x.f('geschwister_position', POS[w.pos]); } } });
  f.push({ ab: 'sozialbericht', pos: 'sprachen', tpl: 'The family speaks {liste} at home.', tu: function (w, x) { x.liste(w._liste, 'chip:sprachen', { rest: 'sprache_andere', andere: 'andere' }); } });
  const Z = { slots: { z: [O.arbeitszeit.vollzeit, O.arbeitszeit.teilzeit], z2: [O.arbeitszeit.vollzeit, O.arbeitszeit.teilzeit] } };
  const ZK = ['vollzeit', 'teilzeit'];
  const teil = function (wer, n) { return { nicht: wer + ' is not currently employed', arbeit: wer + ' works{z' + n + ': {z' + n + '}}{b' + n + ': as {b' + n + '}}' }; };
  const setzeBeruf = function (x, feld, zeit, art, z, b) { if (art === 'nicht') { x.f(zeit, 'nicht'); return; } if (z >= 0) { x.f(zeit, ZK[z]); } if (b) { x.frei(feld, String(b).replace(/^(a|an)\s+/i, '')); } };
  const M = teil('{his} mother', ''), V = teil('{his} father', '2');
  ['nicht', 'arbeit'].forEach(function (a) {
    f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: M[a] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_mutter', 'zeit_mutter', a, w.z, w.b); } });
    f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: V[a] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_vater', 'zeit_vater', a, w.z2, w.b2); } });
    ['nicht', 'arbeit'].forEach(function (b) {
      f.push({ ab: 'sozialbericht', pos: 'beruf', tpl: M[a] + '; ' + V[b] + '.', extra: Z, tu: function (w, x) { setzeBeruf(x, 'beruf_mutter', 'zeit_mutter', a, w.z, w.b); setzeBeruf(x, 'beruf_vater', 'zeit_vater', b, w.z2, w.b2); } });
    });
  });
  f.push({ ab: 'sozialbericht', pos: 'ereignisse', tpl: '{liste} {{is|are}} reported as {{a stressful life event|stressful life events}}.', tu: function (w, x) { x.listeDetails(w._liste, 'ereignisse', 'ereignis_details'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'After school, {N} attends the Maison Relais.', tu: function (w, x) { x.chip('betreuung', 'maison_relais'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'Outside school hours, {N} is looked after by {his} grandparents and by a childminder.', tu: function (w, x) { x.chip('betreuung', 'grosseltern'); x.chip('betreuung', 'tagesmutter'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'Outside school hours, {N} is regularly looked after by {his} grandparents.', tu: function (w, x) { x.chip('betreuung', 'grosseltern'); } });
  f.push({ ab: 'sozialbericht', pos: 'betreuung', tpl: 'Outside school hours, {N} is looked after by a childminder.', tu: function (w, x) { x.chip('betreuung', 'tagesmutter'); } });
  f.push({ ab: 'aktuell', tpl: '{N} currently attends class {klasse}{s: at {schule}}{l:, where {his} class teacher is {lp}}.', tu: function (w, x) { x.f('klasse', w.klasse); x.f('schule_name', w.schule); x.frei('lehrperson', w.lp); } });
  f.push({ ab: 'aktuell', tpl: '{N} currently attends {schule}{l:, where {his} class teacher is {lp}}.', tu: function (w, x) { x.f('schule_name', w.schule); x.frei('lehrperson', w.lp); } });
  f.push({ ab: 'aktuell', tpl: '{his} reference person at the ESEB is {x}.', tu: function (w, x) { x.frei('eseb_referenz', w.x); } });
  f.push({ ab: 'verfahren', tpl: 'This assessment is based {teile}.', tu: function (w, x) { x.verfahren(w._teile, { und: 'and', auf: 'on', beob: 'on classroom observations', gespr: 'on interviews' }); } });
  f.push({ ab: 'verfahren', tpl: 'Observations and interviews took place in {ort}.', tu: function (w, x) { x.frei('verfahren_ort', w.ort); } });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: 'The ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen), the German adaptation of the Developmental Teaching Objectives Rating Form – Revised (DTORF-R), is a standardized rating instrument designed to assess the social and emotional development of children and adolescents from birth to the age of sixteen.' });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: 'It provides a profile of specific skills that serve as indicators of the level of social and emotional competence.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'In the {bereich} domain ({code}), no items have yet been rated as mastered.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: '{Name} is most advanced in the {bereich} domain ({code}), where [[he|she]] is functioning at developmental Stage {rest}.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'The least developed domain is {bereich} ({code}), where {N} is functioning at developmental Stage {rest}.' });
  f.push({ ab: 'eldib', eldib: 'bereich', tpl: 'In the {bereich} domain ({code}), {N} is functioning at developmental Stage {rest}.' });
  f.push({ ab: 'eldib', eldib: 'fest', tpl: '{N} has already acquired solid skills in this domain; for example, {rest}.' });
  f.push({ ab: 'eldib', eldib: 'ziele', tpl: 'Based on the stage objective, the following learning goals have been set for {Nt}:' });
  f.push({ ab: 'eldib', eldib: 'ziele', tpl: 'No learning goals have been set in this domain.' });
  f.push({ ab: 'eldib', eldib: 'alter', tpl: 'Given a chronological age of {jahre} years, developmental Stage {rest}.' });
  f.push({ ab: 'eldib', eldib: 'alter', tpl: 'In all domains assessed, {N} is functioning at least at the age-appropriate developmental Stage {rest}.' });
  const schluss = function (a, tpl) { f.push({ ab: 'schluss', tpl: tpl, tu: function (w, x) { if (a) { x.f('abgestimmt', a); } else { x.merke('ohneAbstimmung', true); } } }); };
  schluss('vorbehalte', 'Based on the available test results, observations and case history information, specific support needs were identified.');
  schluss('vorbehalte', 'In discussions with {wer}, recommendations were developed to further support {ihre} individual development.');
  schluss('vorbehalte', 'Some of the proposed measures were, however, questioned or not fully endorsed by {von}.');
  schluss('nein', 'Based on the available test results, observations and case history information, specific support needs were identified and recommendations formulated.');
  schluss('nein', 'It has not yet been possible to agree on these recommendations with {wer}.');
  schluss('ja', 'Based on the test results, observations and case history information gathered, specific support needs were identified in close consultation with {wer}.');
  schluss('ja', 'On this basis, recommendations were jointly formulated to support {ihre} individual development effectively.');
  schluss('', 'Based on the test results, observations and case history information gathered, specific support needs were identified.');
  schluss('', 'On this basis, recommendations were formulated to support {Name}’s individual development effectively.');
  f.push({ ab: 'ziele', tpl: 'The following support goals are derived from the ELDiB learning goals.', tu: function () {} });
  f.push({ ab: 'ziele', tpl: 'Each goal describes the next developmental step; progress will be monitored in everyday situations {bis} and reviewed at the next ELDiB assessment.', tu: function (w, x) { x.zieleBis(w._bis); } });
  f.push({ ab: 'empfehlungen', kontext: 'familie', tpl: 'Family context' });
  f.push({ ab: 'empfehlungen', kontext: 'schule', tpl: 'School context (local)' });
  f.push({ ab: 'empfehlungen', kontext: 'region', tpl: 'Regional context (ESEB / CDSE)' });
  f.push({ ab: 'cni', cniKopf: true, tpl: 'The CDSE recommends the following {{measure|measures}} to the Commission nationale d’inclusion (CNI):', tu: function () {} });
  return f;
};

// ---------- Freitext: Wortschatz der Aussagen (Ähnlichkeit, Vorschläge mit sicher < 0.7) ----------
const STOPP = {
  de: 'der die das den dem des ein eine einer einen einem eines und oder aber auch ist sind war waren wird werden wurde wurden hat haben hatte hatten sich er sie es ihm ihn ihr ihre ihren ihrem ihrer sein seine seinen seinem seiner seines im in am an auf aus bei mit nach von vor zu zum zur fur uber um als wie so dass da dann denn doch noch schon etwa bzw sowie diese dieser dieses man wenn weil ob wo was wer jedoch dabei daran dazu davon dort hier ich wir',
  fr: 'le la les l un une des du d de et ou mais est sont a ont ete il elle ils elles lui leur leurs son sa ses se s en dans au aux par pour avec sur qu que qui ce cette ces y n ne comme lors dont ainsi toutefois cependant revanche tres',
  en: 'the a an and or but is are was were be been has have had he she him her his hers it its they them their in on at to of for with by from as that this these those which who whom however'
};
function stamm(w, lang) {
  if (w.length <= 4 || /\d/.test(w)) { return w; }
  if (lang === 'de') { return w.replace(/(ungen|innen|ern|em|en|er|es|e|n|s)$/, ''); }
  if (lang === 'fr') { return w.replace(/(ements|ement|ments|ment|ees|ee|es|e|s|x)$/, ''); }
  return w.replace(/(ingly|ing|edly|ed|ies|es|s|ly)$/, '');
}
function stammGleich(a, b) {
  if (a === b) { return 1; }
  const n = Math.min(a.length, b.length);
  let p = 0;
  while (p < n && a.charAt(p) === b.charAt(p)) { p++; }
  return (p >= 5 && p >= 0.75 * n) ? 0.8 : 0;
}
function inhaltsStaemme(text, lang, weg) {
  const st = STOPP[lang] || STOPP.de, aus = [];
  const stop = lexStopp[lang] || (lexStopp[lang] = new Set(st.split(' ').map(function (w) { return kanon(w, lang); })));
  woerter(text, lang).forEach(function (t) {
    if (stop.has(t.w) || t.w.length < 3 || (weg && weg.has(t.w))) { return; }
    aus.push(stamm(t.w, lang));
  });
  return aus;
}
const lexStopp = {};
// Wortschatz: je Aussage die Stämme aller Formulierungen (für die Themenerkennung) und je Stufe
function lexikon(L) {
  const lang = L.lang, T = L.T, eintraege = [], df = {};
  Object.keys(DS_AUFBAU).forEach(function (bereich) {
    DS_AUFBAU[bereich].themen.forEach(function (th) {
      th.aussagen.forEach(function (a) {
        const t = T.a[a[0]] || {}, texte = [t.q].concat(t.t || [], [t.np, t.m, t.g, t.n, t.a, t.d, t.e]).filter(Boolean);
        const ohne = function (s) { return String(s).replace(/\{[^}]*\}/g, ' ').replace(/\[\[([^|\]]*)\|[^\]]*\]\]/g, '$1'); };
        const alle = {};
        texte.forEach(function (x) { inhaltsStaemme(ohne(x), lang).forEach(function (s) { alle[s] = 1; }); });
        Object.keys(alle).forEach(function (s) { df[s] = (df[s] || 0) + 1; });
        eintraege.push({ id: a[0], bereich: bereich, thema: th.id, pol: a[1], skala: (tafeln().skalaThema || {})[bereich + '.' + th.id] || 'std',
          staemme: Object.keys(alle), stufen: (t.t || []).map(function (x) { return x ? inhaltsStaemme(ohne(x), lang) : null; }) });
      });
    });
  });
  const n = eintraege.length, idf = {};
  Object.keys(df).forEach(function (s) { idf[s] = Math.log(1 + n / df[s]); });
  return { eintraege: eintraege, idf: idf, df: df };
}
// Stufenwörter im Freitext (Häufigkeit, Stärke, Verneinung) -> Band der Aussage:
//   hoch 6–7, eherHoch 5, mitte 4, eherTief 3, tief/nein 1–2; ohne Hinweis 5 (was jemand eigens
//   erwähnt, trifft eher zu). betont (vor allem, deutlich) nur bei Situationen/Mustern in 4.3.
// Für die anderen Skalen: stark = Wörter für „vor allem / deutlich / am ehesten“.
const STUFENWORTE = {
  de: {
    hoch: 'sehr häufig|sehr oft|ständig|dauernd|permanent|andauernd|immer|stets|jedes Mal|täglich|fast täglich|jeden Tag|stundenlang|sofort|ohne Zögern|zügig|zu den Besten|sehr gut|sehr gerne|sehr gern|zuverlässig|massiv|extrem|heftig|heftige|heftigen|ohne Probleme|ohne Schwierigkeiten|problemlos|mühelos|ausgeprägt|ausgeprägte|ausgeprägten',
    eherHoch: 'häufig|häufige|häufigen|oft|meist|meistens|überwiegend|weitgehend|immer wieder|wiederholt|mehrmals|mehrfach|regelmäßig|gut|gute|guten|gutes|guter|gerne|gern|in der Regel|größtenteils|zumeist|recht gut|sichtlich',
    mitte: 'teilweise|teils|zeitweise|manchmal|gelegentlich|ab und zu|hin und wieder|wechselhaft|schwankend|schwankt|unterschiedlich|nicht immer|nicht durchgehend|zum Teil|mal mehr mal weniger|einigermaßen',
    eherTief: 'selten|wenig|eher nicht|vereinzelt|nur vereinzelt|zögerlich|zögernd|erst nach|nur mit|nur nach|etwas Mühe|einige Mühe|eher schwer|nur kurz|nur kurze|schwach|schwache|schwachen|schwacher|gering|geringe|geringen|geringer|niedrig|niedrige',
    tief: 'kaum|nie|niemals|gar nicht|überhaupt nicht|schwer|sehr schwer|nur schwer|große Mühe|großer Mühe|Mühe|schlecht|keinerlei',
    nein: 'nicht|kein|keine|keinen|keiner|keinem|keines|nichts|nicht gerne|nicht gern|nicht gut',
    betont: 'vor allem|besonders|insbesondere|deutlich|vorwiegend|hauptsächlich|in erster Linie|eindeutig|vorrangig',
    wichtig: 'vor allem|dringend|unbedingt|besonders|insbesondere|in erster Linie|braucht|benötigt|zwingend|wichtig|vorrangig',
    wahrscheinlich: 'am ehesten|vor allem|in erster Linie|hauptsächlich|wahrscheinlich|vermutlich|offensichtlich|eindeutig|deutlich',
    deutlich: 'deutlich|deutliche|deutlichen|stark|starke|starken|ausgeprägt|ausgeprägte|ausgeprägten|massiv|vor allem|hauptsächlich|eindeutig'
  },
  fr: {
    hoch: 'très souvent|constamment|sans cesse|toujours|systématiquement|tous les jours|chaque jour|presque tous les jours|quotidiennement|au quotidien|pendant des heures|sans hésiter|sans hésitation|immédiatement|tout de suite|aussitôt|parmi les meilleurs|parmi les meilleures|très bien|très volontiers|fortement|massivement|violentes|violente|violent|violents|intense|intenses|sans difficulté|sans difficultés|sans problème|sans problèmes|facilement|aisément|marqué|marquée|marqués|marquées',
    eherHoch: 'souvent|fréquemment|régulièrement|la plupart du temps|la plupart des cas|dans la plupart des cas|plusieurs fois|à plusieurs reprises|généralement|globalement|bien|bonne|bonnes|bons|bon|volontiers|majoritairement|en général|assez bien|visiblement',
    mitte: 'parfois|par moments|de temps en temps|de temps à autre|occasionnellement|variable|variables|fluctuant|fluctuante|en partie|partiellement|pas toujours|plus ou moins|irrégulièrement|inégal|inégale',
    eherTief: 'rarement|peu|ponctuellement|seulement après|qu’après|avec de l’aide|un peu de mal|quelques difficultés|hésitant|hésitante|brièvement|faible|faibles|insuffisant|insuffisante|insuffisants',
    tief: 'guère|pratiquement pas|presque pas|jamais|pas du tout|beaucoup de mal|du mal|de mal|difficilement|difficile|très difficile|grandes difficultés|des difficultés',
    nein: 'pas|aucun|aucune|ni|rien|pas volontiers|pas bien',
    betont: 'surtout|particulièrement|notamment|nettement|principalement|avant tout|clairement|essentiellement',
    wichtig: 'surtout|absolument|avant tout|a besoin|besoin|indispensable|essentiel|essentielle|nécessaire|prioritaire|particulièrement|urgent',
    wahrscheinlich: 'avant tout|principalement|probablement|surtout|vraisemblablement|clairement|manifestement|essentiellement',
    deutlich: 'net|nets|nette|nettes|nettement|fort|forte|fortement|marqué|marquée|marqués|marquées|surtout|principalement|clairement'
  },
  en: {
    hoch: 'very often|constantly|always|all the time|every day|daily|for hours|immediately|straight away|without hesitation|promptly|among the best|very well|reliably|severe|extremely|without difficulty|without problems|easily|strongly',
    eherHoch: 'often|frequently|repeatedly|mostly|usually|largely|regularly|several times|generally|well|good|happily|readily|in most cases|visibly',
    mitte: 'sometimes|at times|occasionally|partly|partially|variable|inconsistent|inconsistently|not always|from time to time|now and then|more or less',
    eherTief: 'rarely|seldom|little|hesitant|hesitantly|only after|only with|some difficulty|briefly|weak|poor|low',
    tief: 'hardly|barely|never|scarcely|not at all|great difficulty|difficulty|difficulties|difficult|struggles|struggle|struggled|poorly|badly',
    nein: 'not|no|none|nothing|cannot|doesn|don|didn|isn|wasn|won|nor|not well',
    betont: 'especially|particularly|mainly|clearly|markedly|above all|primarily',
    wichtig: 'above all|especially|urgently|needs|need|essential|necessary|crucial|particularly|priority',
    wahrscheinlich: 'most likely|mainly|primarily|probably|likely|above all|clearly|evidently',
    deutlich: 'clear|clearly|strong|strongly|marked|markedly|mainly|pronounced'
  }
};
const STUFE_KLASSE = { hoch: [6, 7], eherHoch: [5], mitte: [4], eherTief: [3], tief: [1, 2], nein: [1, 2] };
const KLASSE_RANG = { tief: 6, nein: 5, hoch: 4, eherTief: 3, eherHoch: 2, mitte: 1 };
// Satzteile trennen (Hinweiswörter gelten nur im eigenen Satzteil)
const GEGENSATZ = { de: ['aber', 'jedoch', 'doch', 'sondern', 'allerdings', 'wahrend', 'obwohl', 'hingegen', 'dagegen'], fr: ['mais', 'cependant', 'toutefois', 'pourtant', 'tandis', 'alors', 'bien'], en: ['but', 'however', 'although', 'whereas', 'while', 'yet'] };

// Stichwörter je Aussage [de, fr, en]: Muster mit „|“ getrennt; die Wörter eines Musters stehen nah
// beieinander (Reihenfolge egal); „*“ = Wortanfang; „-“ vor dem Muster: beschreibt das Gegenteil der
// Aussage („lässt sich ablenken“ zu „kann sich konzentrieren“). Ergänzt den Wortschatz der Vorlagen.
const FREI_STICH = {
  // 3.2 Schule
  s_motiv: ['motiviert|motivation|beteiligt|beteiligung|beteiligen|Mitarbeit|arbeitet aktiv mit|engagiert|meldet sich|begeistert|-lustlos|-desinteressiert|-unmotiviert',
    'motivé|motivée|motivation|participe|participation|engagé|engagée|enthousiaste|avec enthousiasme|lève la main|-démotivé|-démotivée|-désintéressé|-désintéressée|-manque de motivation',
    'motivated|motivation|participates|participation|engaged|enthusiastic|-unmotivated|-disinterested|-lack of motivation'],
  s_konz: ['konzentr*|aufmerksam|~Aufmerksamkeit|bei der Sache|-ablenk*|-abgelenkt|-unaufmerksam*|-unkonzentriert|-Konzentrationsprobleme|-Konzentrationsschwierigkeiten|-Konzentrationsschwäche|-träumt|-verträumt|-abschweif*',
    'concentr*|attentif|attentive|~attention|-distrai*|-distract*|-inattenti*|-difficultés de concentration|-problèmes de concentration|-manque de concentration|-rêveur|-rêveuse|-dans la lune',
    'concentrat*|attentive|~attention|focus*|-distract*|-inattentive|-concentration problems|-concentration difficulties|-poor concentration|-daydream*'],
  s_selbst: ['selbstständig*|selbständig*|eigenständig*|ohne Hilfe|allein arbeiten|-Anstoß|-Anstöße|-Anleitung braucht',
    'autonome|autonomie|de manière autonome|travaille seul|travaille seule|sans aide|-besoin d’être relancé|-besoin d’être relancée|-relances',
    'independent*|on his own|on her own|without help|-prompting|-prompts'],
  s_sorgfalt: ['sorgfältig*|Sorgfalt|ordentlich*|organisiert|~Ordnung|-unordentlich*|-chaotisch*|-schlampig*|-vergisst Material|-Material vergessen',
    'soin|soigné|soignée|soigneux|soigneuse|organisé|organisée|ordonné|ordonnée|-désordonné|-désordonnée|-brouillon|-oublie son matériel|-oublie ses affaires',
    'careful*|neat|tidy|organised|organized|-messy|-disorganised|-disorganized|-forgets materials'],
  s_leistung: ['~Leistung*|Lernziel*|~Lernstand|Klassenziel|~Rechnen|~Lesen|~Schreiben|~Mathemati*|schulische Anforderungen|-Lernrückstand|-Lernschwierigkeit*|-Rückstand|-unterdurchschnittlich|-unter den Anforderungen',
    '~résultats|objectifs d’apprentissage|~niveau scolaire|~lecture|~calcul|~mathématiques|~apprentissages|-retard scolaire|-difficultés d’apprentissage',
    '~achievement|~attainment|learning goals|~reading|~writing|~maths|~math|~mathematics|-behind|-learning difficulties'],
  s_unruhe: ['unruhig*|Unruhe|zappel*|kippel*|hibbel*|steht auf|stand auf|aufstehen|Platz auf|Platz verlassen|herumlauf*|umherlauf*|Bewegungsdrang|hyperaktiv*|-still sitzen|-stillsitzen|-sitzt ruhig',
    'agité|agitée|agitation|bouge|remue|se lève|levé|levée|quitte sa place|hyperactif|hyperactive|-rester assis|-tenir en place|-reste assis|-reste assise',
    'restless*|fidget*|gets up|out of seat|leaves seat|hyperactive|-sit still|-stays seated'],
  s_regeln: ['Regel|Regeln|Klassenregeln|Absprachen|Vereinbarungen',
    'règle|règles|règles de classe|accords',
    'rule|rules|class rules|agreements'],
  s_impuls: ['impulsiv*|unüberlegt*|ohne nachzudenken|unbedacht*|reinruf*|hineinruf*|dazwischenruf*|platzt heraus',
    'impulsi*|sans réfléchir|irréfléchi*',
    'impulsiv*|without thinking|blurts out'],
  s_frust: ['Frustration|Frustrationstoleranz|mit Kritik|Kritik umgehen|Misserfolg*|Rückschlag|Rückschläge|~verlieren|~verliert|Niederlage*|-frustriert|-schnell frustriert|-gibt auf|-aufgeben|-gibt schnell auf',
    'frustration|tolérance à la frustration|critique|critiques|échec|échecs|~perdre|~perd|-frustré|-frustrée|-abandonne|-baisse les bras',
    'frustration|frustration tolerance|criticism|failure|setback*|~losing|-frustrated|-gives up|-give up'],
  s_wut: ['Wut|wütend|Wutausbruch|Wutausbrüche|Wutausbrüchen|Wutanfall|Wutanfälle|Wutanfällen|Tobsucht*|rastet aus|ausrasten|Ausraster|Zorn|jähzornig',
    'colère|colères|crise de colère|crises de colère|rage|s’emporte|emportements|furieux|furieuse',
    'tantrum|tantrums|outburst|outbursts|anger|angry|rage|meltdown|meltdowns'],
  s_aggr: ['aggressiv*|Aggression*|schlägt|schlagen|haut andere|tritt andere|tritt nach|beißt|kratzt|schubst|beleidigt|beschimpft|bedroht|handgreiflich|prügelt|Gewalt',
    'agressi*|frappe|tape|donne des coups|coups de pied|mord|pousse|insulte|insultes|injures|menace|violence|violent|bagarre|se bat',
    'aggressi*|hits|hitting|kicks|kicking|bites|pushes|insults|threatens|violence|violent|fights'],
  s_verweig: ['verweiger*|weigert sich|lehnt Aufgaben ab|macht nicht mit|boykott*',
    'refuse|refus|refuser|s’oppose|opposition',
    'refuses|refusal|refusing|defian*|oppositional'],
  s_rueckzug: ['Rückzug|zieht sich zurück|zurückgezogen|in sich gekehrt|wirkt still|sehr still|schweigsam|verschlossen|schüchtern',
    'se replie|repli|retiré|retirée|renfermé|renfermée|silencieux|silencieuse|timide|en retrait',
    'withdraw*|withdrawn|quiet|shy|reserved'],
  s_angst: ['ängstlich|Angst|Ängste|angespannt|Anspannung|Versagensangst|Versagensängste|nervös|Prüfungsangst',
    'anxieux|anxieuse|anxiété|angoisse|angoissé|angoissée|peur|peurs|tendu|tendue|tension|nerveux|nerveuse|stressé|stressée',
    'anxious|anxiety|fear|fears|afraid|tense|tension|nervous|worried'],
  s_ausgeglichen: ['ausgeglichen|gelassen|emotional stabil|-gereizt|-launisch|-Stimmungsschwankungen|-reizbar',
    'équilibré|équilibrée|serein|sereine|~stable|-irritable|-lunatique|-sautes d’humeur',
    'balanced|~calm|even-tempered|~stable|-irritable|-moody|-mood swings'],
  s_peers: ['Kontakt Mitschüler*|Kontakte Mitschüler*|Kontakt Klassenkamerad*|Freundschaft*|integriert|Klassengemeinschaft|Anschluss|spielt mit anderen|beliebt|-Außenseiter|-ausgegrenzt|-abgelehnt',
    'contact camarades|contacts camarades|relations camarades|intégré|intégrée|groupe classe|apprécié|appréciée|joue avec|-isolé|-isolée|-exclu|-exclue|-rejeté|-rejetée',
    'contact peers|contact classmates|gets on well with peers|integrated|popular|plays with|-outsider|-excluded|-isolated|-rejected'],
  s_konflikt: ['Konflikt*|Streit|streitet|streiten|Auseinandersetzung*|Reibereien|zankt',
    'conflit|conflits|disputes|dispute|se dispute|querelles',
    'conflict|conflicts|arguments|argues|quarrels'],
  s_erwachsene: ['Beziehung Lehr*|Verhältnis Lehr*|vertraut Lehr*|Vertrauen Lehr*|Beziehung Erwachsen*|Vertrauen Erwachsen*|Lehr* zurecht|-Machtkampf|-Machtkämpfe',
    'relation enseignant*|confiance enseignant*|relation adulte*|confiance adulte*|relation maîtresse|-rapport de force',
    'relationship teacher*|trust* teacher*|relationship adult*|trust* adult*|-power struggle*'],
  s_hilfe: ['Hilfe an|nimmt Hilfe|Hilfe annehmen|Unterstützung an|lässt sich helfen|Hilfsangebote|-lehnt Hilfe ab',
    'accepte l’aide|accepte de l’aide|accepte le soutien|se laisse aider|-refuse l’aide|-refuse de l’aide',
    'accepts help|accepts support|lets others help|-refuses help'],
  s_selbstwert: ['selbstbewusst*|Selbstvertrauen|Selbstwert*|traut sich|selbstsicher*|-traut sich nichts|-unsicher|-Minderwertigkeit*',
    'confiance en soi|confiance en lui|confiance en elle|estime de soi|ose|sûr de lui|sûre d’elle|-manque de confiance|-dévalorise',
    'self-confiden*|self-esteem|confident|dares|-lacks confidence|-insecure'],
  // 3.3 Kind
  k_offen: ['offen|erzählt bereitwillig|gesprächig|-zurückhaltend|-verschlossen|-wortkarg|-einsilbig',
    'ouvertement|volontiers|se confie|bavard|bavarde|-réservé|-réservée|-renfermé|-renfermée',
    'openly|willingly|talkative|-reserved|-reticent'],
  k_wohl: ['fühl* wohl|wohlfühl*|gerne in die Schule|gern in die Schule|geht gerne|Spaß Schule|mag die Schule|-unwohl|-ungern',
    'se sent bien|bien à l’école|aime l’école|aime aller à l’école|plaît|-mal à l’aise',
    'feels good|happy at school|likes school|like school|likes going to school|like going to school|enjoys school|comfortable|-unhappy at school'],
  k_klasse: ['angenommen|zugehörig|dazugehör*|gehört dazu|akzeptiert|-ausgeschlossen|-Außenseiter|-gemobbt|-Mobbing|-ausgegrenzt',
    'acceptée|accepté|appartenance|à sa place|-exclu|-exclue|-harcelé|-harcelée|-harcèlement|-rejeté|-rejetée',
    'accepted|belongs|belonging|-excluded|-bullied|-bullying|-left out'],
  k_lehrer: ['mag Lehr*|Lehr* nett|Lehr* mag|versteht Lehr*|Lehr* zurecht|Lehr* lieb|-Lehr* streng|-Lehr* gemein|-Lehr* ungerecht',
    'aime enseignant*|aime maîtresse|enseignant* gentil*|maîtresse gentille|s’entend enseignant*|-enseignant* sévère*|-maîtresse sévère|-enseignant* injuste*',
    'likes teacher*|teacher* nice|gets on teacher*|-teacher* strict|-teacher* unfair'],
  k_leistung: ['kann gut|bin gut|gut in|stark in|-schlecht in|-schwach in|-kann nichts|-nicht gut in',
    'bon en|bonne en|fort en|forte en|-nul en|-nulle en|-faible en',
    'good at|-bad at|-weak at|-not good at'],
  k_ungerecht: ['ungerecht*|unfair*|benachteiligt|immer schuld',
    'injuste|injustice|injustement|pas juste',
    'unfair*|unjust*|treated unfairly'],
  k_selbstwert: ['stolz|mag sich|positiv über sich|-dumm|-doof|-kann nichts|-wertlos|-negativ über sich',
    'fier|fière|image de soi|-nul|-nulle|-bête|-se dévalorise',
    'proud|self-image|-stupid|-worthless'],
  k_druck: ['Leidensdruck|traurig|belastet|überfordert|unglücklich|weint|verzweifelt',
    'souffrance|souffre|triste|tristesse|malheureux|malheureuse|pleure|débordé|débordée|dépassé|dépassée',
    'distress|suffers|sad|unhappy|cries|overwhelmed'],
  k_angst: ['Angst|Ängste|Sorgen|sorgt sich|fürchtet|befürchtet',
    'peur|peurs|inquiet|inquiète|inquiétudes|craint|angoisses|soucis',
    'fear|fears|afraid|worries|worried|scared'],
  k_einsicht: ['Problembewusstsein|Einsicht|einsichtig|sieht seine Schwierigkeiten|sieht ihre Schwierigkeiten|kennt seine Schwierigkeiten|kennt ihre Schwierigkeiten|räumt ein',
    'conscience de ses difficultés|conscient de ses difficultés|consciente de ses difficultés|reconnaît ses difficultés|admet',
    'aware of his difficulties|aware of her difficulties|insight|recognises his difficulties|recognises her difficulties|admits'],
  k_veraenderung: ['verändern|Veränderung|besser werden|sich bessern|möchte Hilfe|wünscht sich Hilfe|offen für Hilfe',
    'changer|changement|s’améliorer|souhaite de l’aide|veut de l’aide|ouvert à l’aide|ouverte à l’aide',
    'change|improve|wants help|open to help'],
  k_freunde: ['Freund|Freunde|Freunden|Freundin|Freundinnen|Kumpel|Spielkamerad*|-alleine in der Pause|-allein in der Pause',
    'ami|amie|amis|amies|copain|copains|copine|copines|-seul à la récréation|-seule à la récréation',
    'friend|friends|mates|-alone at break'],
  k_familie: ['~Familie|Beziehung Familie|Beziehung Eltern|Beziehung Mutter|Beziehung Vater|versteht sich Eltern|versteht sich Familie|-Streit zu Hause|-Streit mit den Eltern',
    '~famille|relation famille|relation parents|relation mère|relation père|s’entend parents|s’entend famille|-disputes à la maison',
    '~family|relationship family|relationship parents|gets on parents|gets on family|-arguments at home'],
  // 3.4 Eltern
  e_alltag: ['Alltag klappt|Alltag gut|kommt zurecht|kommt im Alltag|-Alltag anstrengend|-Alltag schwierig',
    'se débrouille|quotidien se passe bien|-quotidien difficile|-quotidien épuisant',
    'copes well|daily life goes well|-daily life difficult|-everyday life difficult'],
  e_regeln: ['Regel|Regeln|Absprachen|gehorcht|gehorchen|Grenzen|-ungehorsam',
    'règle|règles|accords|obéit|obéir|limites|-désobéit|-désobéissant|-désobéissante',
    'rule|rules|agreements|obeys|limits|-disobeys|-disobedient'],
  e_wut: ['Wut|wütend|Wutausbruch|Wutausbrüche|Wutausbrüchen|Wutanfall|Wutanfälle|Wutanfällen|rastet aus|ausrasten|tobt|Tobsucht*|schreit herum',
    'colère|colères|crise de colère|crises de colère|rage|s’emporte|hurle',
    'tantrum|tantrums|outburst|outbursts|anger|angry|rage|screams'],
  e_geschwister: ['Streit Geschwister*|Streit Bruder|Streit Schwester|Konflikt* Geschwister*|Konflikt* Bruder|Konflikt* Schwester|streitet Bruder|streitet Schwester|streiten Geschwister*|Geschwisterstreit|Eifersucht|eifersüchtig',
    'dispute* frère*|dispute* sœur*|conflit* frère*|conflit* sœur*|conflit* fratrie|jalousie|jaloux|jalouse',
    'argue* brother*|argue* sister*|conflict* sibling*|fight* brother*|fight* sister*|sibling rivalry|jealous*'],
  e_rueckzug: ['Rückzug|zieht sich zurück|zurückgezogen|in seinem Zimmer|in ihrem Zimmer|verschlossen',
    'se replie|repli|se retire|dans sa chambre|renfermé|renfermée',
    'withdraw*|withdrawn|in his room|in her room'],
  e_angst: ['Angst|Ängste|ängstlich|Sorgen|Albtraum|Albträume|Alpträume|Trennungsangst|klammert',
    'peur|peurs|angoisse|angoisses|anxieux|anxieuse|cauchemars|inquiétudes',
    'fear|fears|anxious|anxiety|nightmares|worries|clingy'],
  e_koerper: ['Schlafprobleme|Schlafstörung*|Schlafschwierigkeiten|Einschlafprobleme|Einschlafschwierigkeiten|Bauchschmerzen|Bauchweh|Kopfschmerzen|Kopfweh|Übelkeit|körperliche Beschwerden|Beschwerden|nässt ein|Einnässen|-einschlafen|-durchschlafen|-schläft gut',
    'troubles du sommeil|problèmes de sommeil|difficultés d’endormissement|dort mal|maux de ventre|mal au ventre|mal de ventre|maux de tête|mal à la tête|nausées|plaintes physiques|douleurs|énurésie|-s’endormir|-dormir|-dort bien',
    'sleep problems|sleeping problems|sleep difficulties|trouble sleeping|stomach ache|stomachache|stomach aches|headache|headaches|nausea|physical complaints|bedwetting|-falls asleep|-sleeps well'],
  e_medien: ['Medien|Bildschirm*|Handy|Smartphone|Tablet|Konsole|Spielkonsole|Computerspiel*|Videospiel*|Fernseh*|YouTube|zockt|zocken',
    'écran|écrans|téléphone|portable|tablette|console|jeux vidéo|jeu vidéo|télévision|télé',
    'screen|screens|phone|tablet|console|video games|gaming|television|tv'],
  e_hausaufgaben: ['Hausaufgabe*|Hausi|Hausis',
    'devoir|devoirs',
    'homework'],
  e_beziehung: ['~Beziehung|~Verhältnis|gute Beziehung|enge Beziehung|liebevoll|innig|eng verbunden|-angespannt|-konflikthaft',
    '~relation|~lien|bonne relation|relation proche|affectueux|affectueuse|-tendue|-conflictuelle',
    '~relationship|~bond|good relationship|close relationship|loving|-strained|-conflictual'],
  e_struktur: ['Struktur|strukturiert|Abläufe|Ablauf|Tagesablauf|Routine|Routinen|feste Zeiten|Rituale|Rhythmus|-chaotisch',
    'structure|structuré|structurée|routine|routines|horaires|rythme|rituels|-chaotique',
    'structure|structured|routine|routines|schedule|rituals|-chaotic'],
  e_konsequenz: ['konsequent|Konsequenz|klare Erziehung|setzen Grenzen|setzt Grenzen|-inkonsequent|-nachgiebig|-gibt nach|-geben nach',
    'cohérent|cohérente|cohérence|constant|constante|posent des limites|-cèdent|-cède|-laxiste',
    'consistent|consistency|set limits|-inconsistent|-give in|-gives in|-lenient'],
  e_belastung: ['belastet|Belastung|erschöpft|überfordert|am Ende|verzweifelt|hilflos|gestresst',
    'éprouvés|éprouvée|éprouvé|épuisés|épuisée|épuisé|débordés|débordée|dépassés|dépassée|impuissants|stressés|stressée',
    'burdened|strained|exhausted|overwhelmed|helpless|stressed'],
  e_sicht_schule: ['Einschätzung der Schule|Sicht der Schule|teilen die Einschätzung|teilt die Einschätzung|-sehen das anders|-sieht das anders|-nur in der Schule',
    'avis de l’école|évaluation de l’école|partagent l’avis|partagent l’évaluation|partage l’avis|-voient les choses autrement',
    'school’s view|school’s assessment|share the view|agree with the school|-disagree'],
  e_kooperation: ['Zusammenarbeit|kooperativ|kooperieren|bereit|mitarbeiten|engagiert|-lehnen ab|-lehnt ab',
    'collaborer|collaboration|coopérer|coopération|disposés|disposée|disposé|prêts|prête|prêt|engagés|-refusent',
    'cooperate|cooperation|collaborate|willing|engaged|-refuse'],
  // 4.1 Beobachtung
  b_start: ['Aufgab* begann|Aufgab* beginnt|Aufgab* begonnen|Aufgab* anfangen|Aufgab* fing|Arbeit begann|Arbeit beginnt|Arbeitsbeginn|legte los|machte sich an die Arbeit|begann zügig|begann sofort',
    'commencé tâche*|commence tâche*|commencer tâche*|commencé travail|commence travail|s’est mis au travail|s’est mise au travail|se met au travail|mise au travail|démarré',
    'started task*|started work*|began task*|began work*|starts task*|got going|got started'],
  b_konz: ['konzentriert|Konzentration|ausdauernd|Ausdauer|vertieft|bei der Sache|-abgelenkt',
    'concentré|concentrée|concentration|persévérant|persévérante|appliqué|appliquée|-distrait|-distraite',
    'concentrated|concentration|persistent|focused|-distracted'],
  b_anweisung: ['Anweisung|Anweisungen|Arbeitsauftrag|Arbeitsaufträge|befolgte|befolgt',
    'consigne|consignes|instructions',
    'instructions|instruction|followed|follows'],
  b_hilfe: ['holte Hilfe|holte sich Hilfe|bat um Hilfe|fragte nach|meldete sich|um Hilfe',
    'demandé de l’aide|demande de l’aide|demandé l’aide|a levé la main|sollicité',
    'asked for help|asks for help|raised hand|raised his hand|raised her hand'],
  b_unruhe: ['unruhig|Unruhe|zappel*|kippel*|stand auf|stand immer wieder auf|aufgestanden|Platz auf|Platz verlassen|verließ den Platz|lief herum|umherlaufen|herumgelaufen|wippte|rutschte|-saß ruhig|-still sitzen',
    'agité|agitée|agitation|bougé|s’est levé|s’est levée|levé de sa place|levée de sa place|quitté sa place|debout en classe|remuait|-resté assis|-restée assise',
    'restless|fidget*|stood up|got up|left seat|out of seat|wandered|-sat still'],
  b_ablenk: ['abgelenkt|ablenken|ließ sich ablenken|Geräusch*|schaute umher|aus dem Fenster',
    'distrait|distraite|distraire|distrait par|bruit|bruits|regardait par la fenêtre',
    'distracted|distraction|noise|noises|looked around|out of the window'],
  b_regeln: ['Regel|Regeln|Klassenregeln|Absprachen',
    'règle|règles|règles de classe',
    'rule|rules|class rules'],
  b_frust: ['Frustrationstoleranz|blieb ruhig|arbeitete ruhig weiter|ging gelassen|-frustriert|-Frust|-gab auf|-aufgegeben|-ärgerte sich|-verzweifelte|-wurde wütend|-reagierte wütend',
    'tolérance à la frustration|est resté calme|est restée calme|a continué calmement|-frustré|-frustrée|-a abandonné|-s’est énervé|-s’est énervée|-s’est mis en colère|-s’est mise en colère',
    'frustration tolerance|stayed calm|carried on calmly|-frustrated|-gave up|-got upset|-got angry'],
  b_uebergang: ['Übergang|Übergänge|Übergängen|~Wechsel|Stundenwechsel|Raumwechsel|~Umstellung',
    'transition|transitions|~changement|~changements|~passage',
    'transition|transitions|~change|~changes|~switch'],
  b_lob: ['Lob|gelobt|lobte|Zuwendung|Anerkennung|positive Rückmeldung|Belohnung|freute sich|erfreut',
    'éloge|éloges|félicité|félicitée|félicitations|compliment|encouragements|encouragé|encouragée|récompense',
    'praise|praised|~attention|compliment|encouragement|reward'],
  b_stoer: ['störte|stört|Störung|Störungen|störend|rief in die Klasse|rief hinein|rief dazwischen|reinrufen|Zwischenrufe|Lärm',
    'perturbé|perturbe|perturbation|dérangé|dérange|interpellé|interpelle|crié|bavardé|bavardages|interrompu',
    'disrupted|disrupts|disruption|disturbed|disturbing|called out|shouted|interrupted'],
  b_peers: ['Kontakt Mitschüler*|Kontakt Kindern|spielte mit|half einem|half Mitschüler*|half anderen|suchte Kontakt|~Gruppenarbeit',
    'contact camarades|contacts camarades|joué avec|joue avec|aidé un camarade|aide un camarade|a cherché le contact|~travail de groupe',
    'contact with peers|played with|helped a classmate|sought contact|~group work'],
  b_erwachsene: ['Kontakt Erwachsen*|Kontakt Lehr*|Kontakt Beobachter*|suchte Nähe|distanzlos*|wandte sich Lehr*|-mied Erwachsen*',
    'contact adulte*|contact enseignant*|contact observat*|cherché la proximité|sans distance|-évitait les adultes',
    'contact adult*|contact teacher*|contact observer|sought closeness|-avoided adults'],
  b_isol: ['für sich|abseits|isoliert|zog sich zurück|zurückgezogen|spielte allein|stand allein|blieb allein|allein in der Pause',
    'à l’écart|isolé|isolée|s’est isolé|s’est isolée|replié|repliée|jouait seul|jouait seule|restait seul|restait seule|est resté seul|est restée seule',
    'isolated|apart|withdrew|by himself|by herself|played alone|stayed alone'],
  b_provo: ['provozierte|provoziert|provozierend|Provokation*|ärgerte andere|ärgerte Mitschüler*|neckte|schubste|schlug zu|schlug Mitschüler*|trat nach|aggressiv',
    'provoqué|provoque|provocation|provocations|taquiné|taquine|poussé|frappé|agressif|agressive',
    'provoked|provokes|provocation|teased|pushed|hit|kicked|aggressive'],
  // 4.3 Interpretation
  i_uebereinstimmung: ['stimmen überein|Übereinstimmung|übereinstimmend|decken sich|-widersprechen sich|-Widerspruch',
    'concordent|concordance|convergent|coïncident|-divergent|-contradictoires',
    'agree|consistent|converge|-diverge|-contradict'],
  i_beobachtung: ['Beobachtung bestätigt|bestätigt die Beobachtung|Beobachtung deckt|Beobachtungen bestätigen',
    'observations confirment|observation confirme|confirment les observations',
    'observation confirms|observations confirm'],
  i_eldib: ['ELDiB-Profil|ELDiB Profil|Profil ELDiB|ELDiB',
    'profil ELDiB|ELDiB',
    'ELDiB profile|ELDiB'],
  i_unstrukturiert: ['unstrukturiert*|wenig strukturiert*|~Pause|~Pausen|~Übergänge|~Übergängen|~Wechsel|freie Arbeit|Freiarbeit|offene Situationen',
    'peu structurées|peu structurée|non structurées|~récréation|~récréations|~transitions|travail libre|~pauses',
    'unstructured|less structured|~break|~breaks|~recess|~transitions|free work'],
  i_anforderung: ['Leistungsanforderung*|~Anforderungen|Leistungssituation*|~Prüfung*|~Klassenarbeit*|Leistungsdruck',
    '~exigences|~performance|~évaluations|~contrôles|~examens',
    '~demands|~performance|~tests|~exams'],
  i_beziehung: ['Beziehungssituation*|Nähe und Distanz|Konkurrenz|Grenzsetzung*|Rivalität',
    'relationnelles|relationnel|proximité et distance|rivalité|pose de limites',
    'relationship situations|closeness and distance|rivalry|~competition|limit setting'],
  i_einzel: ['Einzelsituation*|Einzelförderung|Eins-zu-eins|Einzelbetreuung|mit einem Erwachsenen allein',
    'situation individuelle|individuellement|en individuel|seul avec un adulte|seule avec un adulte|en tête-à-tête',
    'one-to-one|one to one|individual setting|alone with an adult'],
  i_schule: ['vor allem in der Schule|in der Schule stärker|in der Schule deutlicher|schulischen Kontext',
    'surtout à l’école|avant tout à l’école|contexte scolaire|plus à l’école',
    'mainly at school|especially at school|more at school'],
  i_zuhause: ['vor allem zu Hause|zu Hause stärker|zu Hause deutlicher|häuslichen Umfeld|häuslichen Kontext',
    'surtout à la maison|avant tout à la maison|contexte familial|plus à la maison',
    'mainly at home|especially at home|more at home'],
  i_angst_verlassen: ['Verlassenwerden|verlassen zu werden|Verlustangst|Verlustängste|Trennungsangst|Trennungsängste',
    'abandon|peur d’être abandonné|peur d’être abandonnée|angoisse de séparation',
    'abandonment|separation anxiety|fear of loss'],
  i_angst_unzul: ['Unzulänglichkeit|Versagensangst|Versagensängste|Angst zu versagen|Angst vor Misserfolg',
    'insuffisance|peur de l’échec|peur d’échouer',
    'inadequacy|fear of failure|fear of failing'],
  i_angst_schuld: ['Schuldangst|Schuldgefühl*|Schuldgefühle',
    'culpabilité|sentiment de culpabilité|se sent coupable',
    'guilt|feels guilty'],
  i_angst_konflikt: ['Konfliktangst|Angst vor Konflikten|Angst vor Streit|Konflikten aus dem Weg',
    'peur du conflit|peur des conflits|évite les conflits',
    'fear of conflict|avoids conflict'],
  i_angst_identitaet: ['Identitätsangst|Identität|Identitätsfragen',
    'identité',
    'identity'],
  i_abw_rueckzug: ['Rückzug|zieht sich zurück|zurückziehen',
    'repli|se replie|retrait',
    'withdrawal|withdraws'],
  i_abw_vermeidung: ['Vermeidung|vermeidet|Verweigerung|verweigert|weicht aus',
    'évitement|évite|refus|refuse',
    'avoidance|avoids|refusal|refuses'],
  i_abw_aggression: ['Aggression|aggressiv*|Gegenwehr|Angriff|Gegenangriff',
    'agressivité|agressif|agressive|attaque|contre-attaque',
    'aggression|aggressive|attack|counter-attack'],
  i_abw_regression: ['Regression|regressiv*|kleinkindlich*|Babysprache',
    'régression|régressif|régressive|petit enfant|bébé',
    'regression|regressive|babyish'],
  i_abw_clown: ['Clownerie|Clown|Kasper*|albern|Faxen',
    'pitreries|clown|fait le clown|diversion',
    'clowning|clown|silly|diversion'],
  i_abw_kontrolle: ['Überkontrolle|~Kontrolle|~kontrolliert|Perfektionismus|perfektionistisch',
    'contrôle excessif|~contrôle|perfectionnisme|perfectionniste',
    'overcontrol|~control|perfectionism|perfectionist'],
  i_abw_projektion: ['Projektion|Schuldzuweisung*|Schuld anderen|gibt anderen die Schuld|schiebt die Schuld',
    'projection|attribution de la faute|rejette la faute|accuse les autres',
    'projection|blames others|blaming others'],
  i_abw_verleugnung: ['Verleugnung|verleugnet|Bagatellisierung|bagatellisiert|spielt herunter|verharmlost|leugnet',
    'déni|nie|minimisation|minimise|banalise',
    'denial|denies|minimisation|minimization|downplays'],
  i_hyp_entwicklung: ['Entwicklungsverzögerung|Verzögerung|sozio-emotionalen Entwicklung|emotionalen Entwicklung|Entwicklungsrückstand',
    'retard du développement|retard|développement socio-émotionnel',
    'developmental delay|delay|socio-emotional development'],
  i_hyp_regulation: ['Emotionsregulation|Regulation Gefühl*|Gefühle regulieren|Affektregulation|Selbstregulation|Impulskontrolle',
    'régulation émotionnelle|régulation des émotions|gestion des émotions|autorégulation',
    'emotion regulation|emotional regulation|self-regulation|impulse control'],
  i_hyp_belastung: ['Belastung*|belastende Situation|Trennung der Eltern|Scheidung|Umzug|Todesfall|familiäre Krise',
    'difficultés familiales|séparation des parents|divorce|déménagement|décès|crise familiale',
    'family difficulties|separation|divorce|moving house|bereavement|family crisis'],
  i_hyp_bindung: ['Bindung*|Bindungsunsicherheit|unsicher gebunden',
    'attachement|insécurité de l’attachement',
    'attachment|attachment insecurity'],
  i_hyp_sozial: ['soziale Unsicherheit|sozial unsicher|soziale Ängste|Unsicherheit im Kontakt',
    'insécurité sociale|mal à l’aise en groupe|timidité',
    'social insecurity|social anxiety|shyness'],
  i_hyp_aufmerksamkeit: ['Aufmerksamkeitsproblematik|Aufmerksamkeitsprobleme|Aufmerksamkeitsstörung|ADHS|ADS|Konzentrationsprobleme|Konzentrationsschwierigkeiten',
    'problématique attentionnelle|troubles de l’attention|trouble de l’attention|TDAH|difficultés de concentration',
    'attention problems|attention difficulties|ADHD|concentration problems'],
  i_hyp_ueberforderung: ['Überforderung|überfordert',
    'surcharge|dépassé|dépassée|exigences trop élevées',
    'overload|overwhelmed|too demanding'],
  i_hyp_unterforderung: ['Unterforderung|unterfordert|langweilt sich|Langeweile|hochbegabt',
    'manque de stimulation|s’ennuie|ennui|haut potentiel',
    'under-challenged|underchallenged|bored|boredom|gifted'],
  i_hyp_trauma: ['Trauma|traumatisch*|belastende Erfahrungen|Gewalterfahrung*|Misshandlung|Vernachlässigung',
    'trauma|traumatique|traumatiques|expériences éprouvantes|maltraitance|négligence',
    'trauma|traumatic|adverse experiences|maltreatment|neglect'],
  // 5.1 Bedürfnisse
  n_struktur: ['Struktur|Strukturen|vorhersehbar*|Ablauf|Abläufe|Tagesablauf|Routine|Routinen|Rituale',
    'structure|structures|prévisible|prévisibles|déroulement|routine|routines|rituels',
    'structure|structures|predictab*|routine|routines'],
  n_beziehung: ['Bezugsperson|Bezugspersonen|Vertrauensperson|Ansprechperson|verlässliche Person|feste Person|~Beziehung',
    'personne de référence|référence stable|personne de confiance|relation stable',
    'reference person|key person|trusted adult|stable relationship'],
  n_erfolg: ['Erfolgserlebnis*|Erfolg|Erfolge|positive Rückmeldung*|Lob|Ermutigung|Anerkennung|Bestätigung',
    'réussite|réussites|succès|retours positifs|encouragements|valorisation|éloges',
    'success|successes|positive feedback|praise|encouragement'],
  n_regulation: ['Regulation|Gefühle|Emotionen|beruhigen|Umgang mit Wut|Gefühlsregulation',
    'régulation|émotions|s’apaiser|gérer sa colère|gestion des émotions',
    'regulation|emotions|calm down|managing anger'],
  n_grenzen: ['Grenzen|Grenze|Konsequenz|konsequente|klare Regeln',
    'limites|limite|cohérence|cohérents|règles claires',
    'limits|boundaries|consistency|consistent|clear rules'],
  n_sozial: ['soziale Kompetenz*|sozialen Kompetenz*|soziale Fähigkeiten|Sozialtraining|soziales Lernen|Freundschaften',
    'compétences sociales|habiletés sociales|entraînement social',
    'social skills|social competence|social competencies'],
  n_organisation: ['Arbeitsorganisation|Organisation|Aufmerksamkeit|Strukturierungshilfe*|Arbeitsplan|Checkliste*|Zeitplan',
    'organisation du travail|organisation|attention|plan de travail|planification',
    'work organisation|organization|organisation|attention|checklist*|planning'],
  n_differenzierung: ['Differenzierung|differenziert*|angepasste Anforderungen|Anforderungen anpassen|individuelle Förderung|Nachteilsausgleich',
    'différenciation|différencié|différenciées|exigences adaptées|adapter les exigences',
    'differentiation|differentiated|adapted demands|adjusted demands|accommodations'],
  n_therapie: ['Therapie|therapeutisch*|Psychotherapie|Ergotherapie|Logopädie|Behandlung|Psychiatrie',
    'thérapie|thérapeutique|psychothérapie|ergothérapie|logopédie|suivi psychologique',
    'therapy|therapeutic|psychotherapy|occupational therapy|speech therapy|treatment'],
  n_familie: ['Unterstützung Familie|Familie unterstützen|Familie stärken|Stärkung Familie|Eltern unterstützen|Elternberatung|Erziehungsberatung|Elternarbeit|Familienhilfe',
    'soutien famille|soutenir famille|soutien parental|guidance parentale|soutien parents',
    'support family|family support|parent support|parenting support|support parents']
};
// Ohne Abschnitt: woran man die Sichtweise erkennt
const KONTEXT_BEREICH = {
  eltern: ['zu Hause', 'daheim', 'Mutter', 'Vater', 'Eltern', 'à la maison', 'mère', 'père', 'parents', 'at home', 'mother', 'father', 'parents'],
  beobachtung: ['Beobachtung', 'beobachtet', 'observation', 'observé', 'observée', 'observed'],
  kind: ['erzählt', 'berichtet selbst', 'sagt', 'raconte', 'dit', 'says', 'tells'],
  schule: ['Unterricht', 'Klasse', 'Lehrerin', 'Lehrer', 'Lehrperson', 'classe', 'enseignante', 'enseignant', 'cours', 'class', 'teacher', 'lesson']
};

// Stichwörter, Stufenwörter und Satzteil-Grenzen in die Vergleichsform bringen (einmal je Sprache)
function wortFolge(text, lang) {
  // "Wut*" -> [{ w: 'wut', pre: true }]
  const aus = [];
  String(text).trim().split(/\s+/).forEach(function (teil) {
    const pre = /\*$/.test(teil), ws = woerter(teil.replace(/\*$/, ''), lang).map(function (t) { return t.w; });
    ws.forEach(function (w, k) { aus.push({ w: w, pre: pre && k === ws.length - 1 }); });
  });
  return aus;
}
function freiWortschatz(L) {
  const lang = L.lang, li = SPRACHEN.indexOf(lang);
  const stich = [];
  Object.keys(FREI_STICH).forEach(function (id) {
    const def = FREI_STICH[id][li];
    if (!def) { return; }
    const e = L.woerter.eintraege.filter(function (x) { return x.id === id; })[0];
    if (!e) { return; }
    const muster = def.split('|').map(function (m) {
      m = m.trim();
      let gegen = false, schwach = false;
      while (/^[-~]/.test(m)) { if (m.charAt(0) === '-') { gegen = true; } else { schwach = true; } m = m.slice(1); }
      return { w: wortFolge(m, lang), gegen: gegen, schwach: schwach, text: m };
    }).filter(function (m) { return m.w.length; });
    stich.push({ e: e, muster: muster });
  });
  const S = STUFENWORTE[lang] || STUFENWORTE.de, stufen = {};
  Object.keys(S).forEach(function (k) {
    stufen[k] = S[k].split('|').map(function (t) { return wortFolge(t, lang).map(function (x) { return x.w; }); }).filter(function (f) { return f.length; })
      .sort(function (a, b) { return b.length - a.length; });
  });
  const kontext = {};
  Object.keys(KONTEXT_BEREICH).forEach(function (b) { kontext[b] = KONTEXT_BEREICH[b].map(function (t) { return wortFolge(t, lang).map(function (x) { return x.w; }); }); });
  return { stich: stich, stufen: stufen, kontext: kontext, gegensatz: new Set((GEGENSATZ[lang] || []).map(function (w) { return kanon(w, lang); })) };
}
function laenge(m) { return m.w.reduce(function (s, x) { return s + x.w.length; }, 0); }
function wortPasst(m, w) { return m.pre ? (w.length >= m.w.length && w.indexOf(m.w) === 0) : w === m.w; }
// Fundstelle eines Musters: Positionen der Wörter (alle innerhalb von 6 Wörtern um das erste) oder null
function musterFinden(worte, m, frei) {
  const n = worte.length, erstes = m.w[0];
  for (let i = 0; i < n; i++) {
    if (!frei[i] || !wortPasst(erstes, worte[i])) { continue; }
    const pos = [i];
    let ok = true;
    for (let k = 1; k < m.w.length && ok; k++) {
      let f = -1;
      // zuerst direkt dahinter (feste Wendungen), sonst in der Nähe
      if (i + k < n && frei[i + k] && pos.indexOf(i + k) < 0 && wortPasst(m.w[k], worte[i + k])) { f = i + k; }
      for (let j = Math.max(0, i - 6); f < 0 && j <= Math.min(n - 1, i + 6); j++) { if (frei[j] && pos.indexOf(j) < 0 && wortPasst(m.w[k], worte[j])) { f = j; } }
      if (f < 0) { ok = false; } else { pos.push(f); }
    }
    if (ok) { return pos; }
  }
  return null;
}
// Folge von Wörtern (Stufenwort) an Stelle i?
function folgeAn(worte, i, f) { for (let k = 0; k < f.length; k++) { if (worte[i + k] !== f[k]) { return false; } } return true; }
// Stufenwörter im Satzteil um die Fundstelle; das nächste gilt (bei gleichem Abstand das deutlichere)
function stufeFinden(worte, teil, pos, W, klassen, belegt) {
  let best = null;
  klassen.forEach(function (kl) {
    (W.stufen[kl] || []).forEach(function (f) {
      for (let i = 0; i + f.length <= worte.length; i++) {
        if (teil[i] !== teil[pos[0]]) { continue; }
        let frei = true;
        for (let k = 0; k < f.length; k++) { if (belegt[i + k] || teil[i + k] !== teil[pos[0]]) { frei = false; } }
        if (!frei || !folgeAn(worte, i, f)) { continue; }
        let d = 99;
        pos.forEach(function (p) { d = Math.min(d, p < i ? i - p : (p > i + f.length - 1 ? p - (i + f.length - 1) : 0)); });
        if (d > 12) { continue; }
        const rang = (KLASSE_RANG[kl] || 0) + f.length * 10;   // längere Wendung zuerst ("nicht immer" vor "nicht")
        if (!best || d < best.d || (d === best.d && rang > best.rang)) { best = { kl: kl, d: d, rang: rang, i: i, n: f.length }; }
      }
    });
  });
  return best;
}
function spiegel(band) { return band.map(function (r) { return 8 - r; }).sort(function (a, b) { return a - b; }); }
// Vorschläge für einen frei geschriebenen Satz: [{ id, bereich, band, sicher }] (höchstens 3)
const SCHWELLE_FREI = 0.5;
function freiVorschlaege(text, bereiche, L, weg, opt) {
  opt = opt || {};
  const lang = L.lang, W = L.frei || (L.frei = freiWortschatz(L));
  const sk = skelett(text, lang), worte = sk.toks.map(function (t) { return t.w; }), n = worte.length;
  if (!n) { return []; }
  // Satzteile: an ; : ( ) – und an Gegensatzwörtern
  const teil = [];
  let t = 0;
  for (let i = 0; i < n; i++) {
    if (i > 0 && (/[;:()–—]/.test(sk.s.slice(sk.toks[i - 1].bis, sk.toks[i].von)) || W.gegensatz.has(worte[i]))) { t++; }
    teil.push(t);
  }
  // Treffer je Aussage (längere Muster zuerst, ein Wort gehört nur einem Muster derselben Aussage)
  const treffer = [];
  W.stich.forEach(function (s) {
    if (bereiche && bereiche.indexOf(s.e.bereich) < 0) { return; }
    const offen = worte.map(function () { return true; });
    const funde = [];
    s.muster.slice().sort(function (a, b) { return (b.w.length - a.w.length) || (laenge(b) - laenge(a)); }).forEach(function (m) {
      const pos = musterFinden(worte, m, offen);
      if (!pos) { return; }
      pos.forEach(function (p) { offen[p] = false; });
      funde.push({ m: m, pos: pos });
    });
    if (funde.length) { treffer.push({ e: s.e, funde: funde }); }
  });
  const aus = [];
  const kontextBereich = function () {
    let best = null, zahl = 0;
    Object.keys(W.kontext).forEach(function (b) {
      let c = 0;
      W.kontext[b].forEach(function (f) { for (let i = 0; i < n; i++) { if (folgeAn(worte, i, f)) { c++; } } });
      if (c > zahl) { zahl = c; best = b; }
    });
    return best;
  };
  treffer.forEach(function (tr) {
    const e = tr.e, belegt = worte.map(function () { return false; });
    tr.funde.forEach(function (f) { f.pos.forEach(function (p) { belegt[p] = true; }); });
    // allgemeine Wörter ("Pause", "Lesen") zählen nur mit einem Stufenwort in der Nähe
    if (!opt.band) {
      tr.funde = tr.funde.filter(function (f) { return !f.m.schwach || stufeFinden(worte, teil, f.pos, W, ['hoch', 'eherHoch', 'mitte', 'eherTief', 'tief', 'nein', 'betont', e.skala], belegt); });
      if (!tr.funde.length) { return; }
    }
    let band = null, hinweis = false, weg2 = false;
    if (opt.band) { band = opt.band.slice(); hinweis = true; }
    else if (e.skala === 'std') {
      // je Fundstelle das nächste Stufenwort; eine Fundstelle mit Stufenwort geht vor
      const klassen = ['hoch', 'eherHoch', 'mitte', 'eherTief', 'tief', 'nein'].concat(e.pol === 0 ? ['betont'] : []);
      let wahl = null;
      tr.funde.forEach(function (f) {
        const st = stufeFinden(worte, teil, f.pos, W, klassen, belegt);
        const rang = st ? 2 : (f.m.gegen ? 1 : 0);
        const naeher = st && wahl && wahl.st && (st.d < wahl.st.d || (st.d === wahl.st.d && (KLASSE_RANG[st.kl] || 0) > (KLASSE_RANG[wahl.st.kl] || 0)));
        if (!wahl || rang > wahl.rang || naeher) { wahl = { f: f, st: st, rang: rang }; }
      });
      const kl = wahl.st ? wahl.st.kl : null;
      band = kl === 'betont' ? [6, 7] : (kl ? STUFE_KLASSE[kl].slice() : [5]);
      if (wahl.f.m.gegen) { band = spiegel(band); }
      hinweis = !!kl;
    } else {
      const f0 = tr.funde[0];
      const nein = stufeFinden(worte, teil, f0.pos, W, ['nein'], belegt);
      if (nein && nein.d <= 3) { weg2 = true; }
      const stark = stufeFinden(worte, teil, f0.pos, W, [e.skala], belegt) || (e.skala !== 'deutlich' ? null : stufeFinden(worte, teil, f0.pos, W, ['hoch'], belegt));
      band = e.skala === 'deutlich' ? (stark ? [5, 6, 7] : [4]) : (stark ? [6, 7] : [4, 5]);
      hinweis = !!stark;
    }
    if (weg2 || !band) { return; }
    const lang2 = tr.funde.some(function (f) { return f.m.w.length >= 2 || f.m.w[0].w.length >= 8; });
    let sicher = 0.45 + (hinweis ? 0.08 : 0) + (tr.funde.length >= 2 ? 0.05 : 0) + (lang2 ? 0.04 : 0);
    sicher = Math.round(Math.min(0.65, sicher) * 100) / 100;
    aus.push({ id: e.id, bereich: e.bereich, band: band, sicher: sicher, pos: tr.funde[0].pos[0], gewicht: tr.funde.length + (lang2 ? 1 : 0) });
  });
  // ohne Abschnitt: dieselben Wörter in mehreren Sichtweisen -> nach dem Zusammenhang
  if (!opt.band && bereiche && bereiche.length > 1 && aus.length > 1) {
    const kb = kontextBereich();
    const nachStelle = {};
    aus.forEach(function (v) { (nachStelle[v.pos] = nachStelle[v.pos] || []).push(v); });
    Object.keys(nachStelle).forEach(function (p) {
      const l = nachStelle[p];
      if (l.length < 2) { return; }
      const behalten = l.filter(function (v) { return v.bereich === kb; })[0] || l[0];
      l.forEach(function (v) { if (v !== behalten) { v.weg = true; } });
    });
  }
  let liste = aus.filter(function (v) { return !v.weg; });
  // Rückfall: Wortschatz der Satzvorlagen (etwa ein leicht geänderter Satz des Generators)
  if (!liste.length && !opt.nurStich) {
    const v = freiAehnlich(text, bereiche, L, weg);
    if (v) { liste = [v]; }
  }
  liste.sort(function (a, b) { return (b.sicher - a.sicher) || (b.gewicht - a.gewicht) || (a.pos - b.pos); });
  return liste.slice(0, opt.max || 3).map(function (v) { return { id: v.id, bereich: v.bereich, band: v.band, sicher: v.sicher }; });
}
// Ähnlichkeit mit den Formulierungen der Vorlagen (Inhaltswörter, nach Seltenheit gewichtet)
function freiAehnlich(text, bereiche, L, weg) {
  const lang = L.lang, lx = L.woerter, u = inhaltsStaemme(text, lang, weg);
  if (u.length < 2) { return null; }
  const idf = function (s) { return lx.idf[s] != null ? lx.idf[s] : Math.log(1 + lx.eintraege.length); };
  let best = null;
  lx.eintraege.forEach(function (e) {
    if (bereiche && bereiche.indexOf(e.bereich) < 0) { return; }
    let gem = 0, selten = false, gesamtE = 0;
    const genutzt = {};
    e.staemme.forEach(function (s) { gesamtE += idf(s); });
    u.forEach(function (x) {
      let bestS = 0, bestSt = null;
      e.staemme.forEach(function (s) { const g = stammGleich(x, s); if (g > bestS) { bestS = g; bestSt = s; } });
      if (bestS && !genutzt[bestSt]) { genutzt[bestSt] = 1; gem += bestS * idf(bestSt); if ((lx.df[bestSt] || 99) <= 2) { selten = true; } }
    });
    if (!selten || !gem) { return; }
    const gesamtU = u.reduce(function (s, x) { return s + idf(x); }, 0);
    const p = gem / gesamtU, r = gem / Math.min(gesamtE, gesamtU * 2);
    const score = 2 * p * r / (p + r);
    if (!best || score > best.score) { best = { e: e, score: score }; }
  });
  if (!best || best.score < SCHWELLE_FREI) { return null; }
  const e = best.e, W = L.frei || (L.frei = freiWortschatz(L));
  const sk = skelett(text, lang), worte = sk.toks.map(function (t) { return t.w; });
  const alle = worte.map(function () { return 0; }), belegt = worte.map(function () { return false; });
  let band;
  if (e.skala === 'std') {
    // Stufenwort irgendwo im Satz; sonst die ähnlichste der fünf Formulierungen
    let st = null;
    worte.forEach(function (w, i) { const s = stufeFinden(worte, alle, [i], W, ['hoch', 'eherHoch', 'mitte', 'eherTief', 'tief', 'nein'], belegt); if (s && (!st || KLASSE_RANG[s.kl] > KLASSE_RANG[st.kl])) { st = s; } });
    if (st) { band = STUFE_KLASSE[st.kl].slice(); }
    else {
      let bs = -1, stufe = null;
      (e.stufen || []).forEach(function (stm, i) {
        if (!stm) { return; }
        const g = stm.filter(function (s) { return u.some(function (x) { return stammGleich(x, s); }); }).length / (stm.length || 1);
        if (g > bs) { bs = g; stufe = i; }
      });
      band = stufe == null ? [4] : STUFE_BAND[stufe];
    }
  } else {
    let stark = false;
    worte.forEach(function (w, i) { if (stufeFinden(worte, alle, [i], W, [e.skala], belegt)) { stark = true; } });
    band = e.skala === 'deutlich' ? (stark ? [5, 6, 7] : [4]) : (stark ? [6, 7] : [4, 5]);
  }
  const sicher = Math.round((0.4 + 0.1 * Math.min(1, (best.score - SCHWELLE_FREI) / (1 - SCHWELLE_FREI))) * 100) / 100;
  return { id: e.id, bereich: e.bereich, band: band, sicher: sicher, pos: 0, gewicht: 0 };
}

// ---------- Sprache erkennen ----------
function spracheErkennen(text) {
  const k = ' ' + skText(String(text).slice(0, 60000), 'x') + ' ';
  const zaehle = function (worte) { return worte.reduce(function (n, w) { let i = 0, c = 0; while ((i = k.indexOf(' ' + w + ' ', i)) >= 0) { c++; i++; } return n + c; }, 0); };
  const de = zaehle(['der', 'die', 'das', 'und', 'nicht', 'sich', 'ist', 'mit', 'zu', 'im']);
  const fr = zaehle(['le', 'les', 'et', 'des', 'est', 'une', 'pas', 'avec', 'dans', 'du']);
  const en = zaehle(['the', 'and', 'is', 'of', 'with', 'to', 'in', 'was', 'has', 'for']);
  return fr > de && fr >= en ? 'fr' : (en > de && en > fr ? 'en' : 'de');
}

// ---------- Kopf- und Fußzeilen (PDF), Datum des Berichts ----------
const KOPF_FUSS = [/^\s*(Seite|Page)\s+\d+\s*(von|de|sur|of|\/)\s*\d+\s*$/i, /rue du Parc/i, /cc-cdse\.lu|www\.cdse\.lu|info@cc-cdse/i, /^\s*L-5374\b/i, /^\s*_{6,}\s*$/, /^\s*(Tel|Tél)\.?:?\s*247/i];
function kopfFussEntfernen(zeilen, x) {
  // wiederkehrende Zeilen nur in Text mit Seiten (PDF/OCR): "Seite 2 von 9", Seitenvorschub – und nur
  // nahe an einem Seitenwechsel (sonst verschwände eine Empfehlung, die in 5.2 und 5.3 steht)
  const seiten = zeilen.filter(function (z) { return KOPF_FUSS[0].test(z); }).length >= 2 || x.seitenvorschub;
  const nah = zeilen.map(function () { return false; });
  zeilen.forEach(function (z, i) {
    if (/\f/.test(z) || KOPF_FUSS.some(function (re) { return re.test(z.trim()); })) { for (let k = Math.max(0, i - 3); k <= Math.min(zeilen.length - 1, i + 3); k++) { nah[k] = true; } }
  });
  const zahl = {};
  zeilen.forEach(function (z, i) { const t = z.trim(); if (t && nah[i]) { zahl[t] = (zahl[t] || 0) + 1; } });
  const weg = zeilen.map(function (z, i) {
    const t = z.trim();
    if (!t) { return false; }
    const m = /^Munsbach,\s*(?:den|le)?\s*(.+?)\s*$/i.exec(t);
    if (m) { const d = datenImText(m[1], x.lang); if (d.length) { x.fakt('bericht_datum', d[0], 0.9, t); } return true; }
    if (KOPF_FUSS.some(function (re) { return re.test(t); })) { return true; }
    // Zeilen, die auf jeder Seite am Seitenwechsel wiederkehren (Name, Matricule im Seitenkopf)
    return !!(seiten && nah[i] && zahl[t] >= 2 && t.length <= 60 && !/^[☐☒☑□■✓✔✗xX\s]+$/.test(t) && !/[.!?:]$/.test(t));
  });
  // Seitenwechsel mitten im Satz: Leerzeilen dazwischen weg, damit der Absatz zusammenbleibt
  // (auch wenn die nächste Seite mit einem großgeschriebenen Wort beginnt). Mitten im Satz heißt:
  // kein Satzende, und die nächste Zeile beginnt klein oder hätte nicht mehr in die Zeile gepasst.
  const breite = zeilenBreite(zeilen), aus = [];
  let i = 0;
  while (i < zeilen.length) {
    if (!weg[i] && zeilen[i].trim()) { aus.push(zeilen[i]); i++; continue; }
    let j = i, umbruch = false;
    const leer = [];
    while (j < zeilen.length && (weg[j] || !zeilen[j].trim())) {
      if (weg[j] || /\f/.test(zeilen[j])) { umbruch = true; } else { leer.push(zeilen[j]); }
      j++;
    }
    const vor = aus.length ? aus[aus.length - 1].trim() : '', nach = j < zeilen.length ? zeilen[j].trim() : '';
    let verbinden = false;
    if (umbruch && vor && nach && !/[.!?]["“”»)]?$/.test(vor) && !PUNKT.test(nach)) {
      const erstes = nach.split(/\s+/)[0] || '';
      verbinden = /^[a-zà-öø-ÿ]/.test(nach) || !!(!/;["“”»)]?$/.test(vor) && !(/:["“”»)]?$/.test(vor) && ELDIB_ZIEL.test(nach)) && breite && vor.length + 1 + erstes.length > breite);
    }
    if (!verbinden) { leer.forEach(function (z) { aus.push(z); }); if (umbruch && !leer.length) { aus.push(''); } }
    i = j;
  }
  return aus;
}

// ---------- Überschriften und Abschnitte ----------
const TITEL_EXTRA = {
  auftrag: ['Auftrag', 'Demande de diagnostic', 'Referral question'], anamnese: ['Anamnèse'], vorgeschichte: ['Antécédents', 'Vorgeschichte des Kindes'],
  sozialbericht: ['Sozialanamnese', 'Bilan social'], aktuell: ['Aktuelle Situation des Kindes'],
  massnahmen: ['Mesures de soutien scolaires et extrascolaires actuelles :', 'Aktuelle Unterstützungsmaßnahmen', 'Aktuelle schulische und ausserschulische Unterstützungsmassnahmen'],
  schule: ['Sichtweise der Lehrperson'], kind: ['Sichtweise des Schülers/ der Schülerin', 'Sichtweise des Kindes', 'Point de vue de l’enfant'],
  eltern: ['Sichtweise der Eltern', 'Point de vue des parents/ tuteur·ice·s', 'Point de vue des parents'], verfahren: ['Diagnostisches Vorgehen'],
  beobachtung: ['Verhaltensbeobachtung', 'Observations'], eldib: ['Ergebnisse', 'Résultats'], deutung: ['Interprétation', 'Interpretationen'],
  schluss: ['Schlussfolgerungen', 'Conclusions'], beduerfnisse: ['Spezifische Bedürfnisse des Schülers/der Schülerin', 'Besoins spécifiques de l‘élève', 'Spezifische Bedürfnisse', 'Besoins spécifiques'],
  ziele: ['Förderziele', 'Objectifs de soutien'], empfehlungen: [], cni: ['Empfehlungen - CNI', 'Recommandations - CNI', 'Empfehlungen an die CNI', 'Recommandations à la CNI'],
  anhang: ['Anhang', 'Annexe'], interventionen: ['Übersicht der Interventionen', 'Aperçu des interventions'], raster: ['Résultats détaillés'],
  produktionen: ['Production de l‘élève', 'Produktionen']
};
let titelCache = null;
function titelListe() {
  if (titelCache) { return titelCache; }
  const T = tafeln(), aus = [];
  T.gliederung.forEach(function (g, ordnung) {
    const titel = [];
    SPRACHEN.forEach(function (l) { const t = (T.titel[l] || {})[g.id]; (Array.isArray(t) ? t : [t]).forEach(function (x) { if (x) { titel.push(x); } }); });
    (TITEL_EXTRA[g.id] || []).forEach(function (x) { titel.push(x); });
    const sk = {};
    titel.forEach(function (t) { SPRACHEN.forEach(function (l) { sk[skText(t, l).trim()] = 1; }); });
    aus.push({ id: g.id, nr: g.nr, e: g.e, ordnung: ordnung, sk: Object.keys(sk) });
  });
  titelCache = aus;
  return aus;
}
function aehnlich(a, b) {
  // normierte Levenshtein-Ähnlichkeit (0..1)
  if (a === b) { return 1; }
  const n = a.length, m = b.length;
  if (!n || !m) { return 0; }
  if (Math.abs(n - m) > Math.max(n, m) * 0.5) { return 0; }
  let vor = new Array(m + 1), jetzt = new Array(m + 1);
  for (let j = 0; j <= m; j++) { vor[j] = j; }
  for (let i = 1; i <= n; i++) {
    jetzt[0] = i;
    const ca = a.charCodeAt(i - 1);
    for (let j = 1; j <= m; j++) { jetzt[j] = Math.min(vor[j] + 1, jetzt[j - 1] + 1, vor[j - 1] + (ca === b.charCodeAt(j - 1) ? 0 : 1)); }
    const t = vor; vor = jetzt; jetzt = t;
  }
  return 1 - vor[m] / Math.max(n, m);
}
// Kandidat für eine Überschrift: { id, ordnung, score, toc }
function ueberschrift(zeile, lang) {
  let t = zeile.trim();
  if (!t || t.length > 140) { return null; }
  const nrM = /^(\d)\s*(?:[.,]\s*(\d)\s*)?[.)]?(?=\s|[A-Za-zÀ-ÿ])\s*/.exec(t);
  let nr = null;
  if (nrM) { nr = nrM[1] + (nrM[2] ? '.' + nrM[2] : ''); t = t.slice(nrM[0].length); }
  // Inhaltsverzeichnis: Seitenzahl am Ende (mit Punkten, Tab oder Leerzeichen)
  let toc = false;
  const seite = /(?:[\s.·…_\t-]{1,})(\d{1,3})\s*$/.exec(t);
  if (seite && seite.index > 0) { toc = true; t = t.slice(0, seite.index); }
  const k = skText(t, lang).trim();
  if (!k) { return null; }
  let best = null;
  titelListe().forEach(function (e) {
    let s = 0;
    e.sk.forEach(function (x) {
      if (x === k) { s = Math.max(s, 1); }
      else if (k.length >= 8 && x.length >= 8) { const a = aehnlich(k, x); if (a >= 0.86) { s = Math.max(s, a * 0.95); } }
    });
    if (nr && s && nr !== e.nr) { s *= (e.nr.indexOf('.') < 0 && nr.indexOf('.') < 0) ? 0.5 : 0.3; }
    if (nr && s && nr === e.nr) { s = Math.min(1, s + 0.05); }
    // eigene Überschrift mit bekannter Nummer (z. B. "3.2 Sichtweise der Klassenlehrerin")
    if (!s && nr && nr === e.nr && nr.indexOf('.') > 0 && !/[.!?;]$/.test(zeile.trim()) && k.split(' ').length <= 10) { s = 0.6; }
    if (s && (!best || s > best.score)) { best = { id: e.id, ordnung: e.ordnung, e: e.e, score: s }; }
  });
  if (best) { best.toc = toc; best.nr = nr; }
  return best;
}
// Abschnitte finden: Überschriften in aufsteigender Reihenfolge (längste Kette), ohne Inhaltsverzeichnis
function gliedern(zeilen, x) {
  const kand = [];
  let imToc = false, tocIds = {};
  zeilen.forEach(function (z, i) {
    const t = z.trim();
    if (!t) { return; }
    if (/^(Inhaltsverzeichnis|Inhalt|Table des matières|Sommaire|Table of contents|Contents)\s*:?$/i.test(t)) { imToc = true; tocIds = {}; kand.push({ i: i, tocKopf: true }); return; }
    const u = ueberschrift(t, x.lang);
    if (u && u.score >= 0.6) {
      // im Inhaltsverzeichnis: Zeilen mit Seitenzahl; die erste Überschrift, die sich wiederholt, beginnt den Text
      if (imToc && !u.toc && tocIds[u.id]) { imToc = false; }
      if (u.toc || imToc) { u.toc = true; tocIds[u.id] = 1; }
      u.i = i; kand.push(u); return;
    }
    imToc = false;
  });
  const echt = kand.filter(function (k) { return !k.toc && !k.tocKopf; });
  // längste aufsteigende Kette mit größter Summe
  const best = [], vorg = [];
  echt.forEach(function (k, a) {
    best[a] = k.score; vorg[a] = -1;
    for (let b = 0; b < a; b++) { if (echt[b].ordnung < k.ordnung && best[b] + k.score > best[a]) { best[a] = best[b] + k.score; vorg[a] = b; } }
  });
  let ende = -1;
  best.forEach(function (v, a) { if (ende < 0 || v > best[ende]) { ende = a; } });
  const kette = [];
  for (let a = ende; a >= 0; a = vorg[a]) { kette.unshift(echt[a]); }
  const tocZeilen = {};
  kand.forEach(function (k) { if (k.toc || k.tocKopf) { tocZeilen[k.i] = 1; } });
  const abschnitte = kette.map(function (k, n) {
    const bis = n + 1 < kette.length ? kette[n + 1].i : zeilen.length;
    return { id: k.id, titel: zeilen[k.i].trim(), zeilen: zeilen.slice(k.i + 1, bis) };
  });
  const erste = kette.length ? kette[0].i : zeilen.length;
  const vor = zeilen.slice(0, erste).filter(function (z, i) { return !tocZeilen[i]; });
  return { vor: vor, abschnitte: abschnitte };
}

// ---------- Absätze und Sätze ----------
// Umbrochener Text (PDF, OCR): viele lange Zeilen enden mitten im Satz und die nächste beginnt klein
function umbrochen(zeilen) {
  let lang = 0, mitten = 0;
  for (let i = 0; i + 1 < zeilen.length; i++) {
    const a = zeilen[i].trim(), b = zeilen[i + 1].trim();
    if (a.length < 40 || !b) { continue; }
    lang++;
    if (!/[.!?:;)]$/.test(a) && /^[a-zà-öø-ÿ]/.test(b)) { mitten++; }
  }
  return lang >= 5 && mitten / lang > 0.15;
}
const PUNKT = /^\s*(?:[•·▪◦‣∙●○■□•▪-]|[-–—*]\s)\s*/;
function bloecke(zeilen, umbrochenerText) {
  const aus = [];
  let akt = null, pause = false;
  zeilen.forEach(function (z) {
    const t = z.trim();
    if (!t) { pause = true; return; }
    const punkt = PUNKT.test(t) && !/^-\d/.test(t);
    const text = punkt ? t.replace(PUNKT, '').trim() : t;
    const warPause = pause, klein = /^[a-zà-öø-ÿ]/.test(text);
    // Satzende; ein Doppelpunkt am Zeilenende nur, wenn die nächste Zeile nicht klein weitergeht
    // im umbrochenen Text endet am Zeilenende kein Absatz nach "bzw.", "am 12." / "35. Woche", in einer
    // offenen Klammer oder nach einem Doppelpunkt (außer vor einem Lernziel "V-5 – …")
    const abk = !!(umbrochenerText && akt && /\.$/.test(akt.text) && (ABK.test(akt.text) || /(^|\s)\p{L}\.$/u.test(akt.text) ||
      (/(^|\s)\d{1,2}\.$/.test(akt.text) && (/^[A-ZÄÖÜ][a-zäöüß]/.test(text) || new RegExp('^(' + MONAT_RE + ')', 'i').test(basisText(text.slice(0, 12)))))));
    const klammer = !!(umbrochenerText && akt && akt.text.split('(').length > akt.text.split(')').length);
    const doppelpunkt = !!(akt && /:["“”»)]?$/.test(akt.text) && (umbrochenerText ? ELDIB_ZIEL.test(text) : !klein));
    const ende = akt && !abk && !klammer && (/[.!?]["“”»)]?$/.test(akt.text) || doppelpunkt);
    // Leerzeile: neuer Absatz – außer der Satz geht klein weiter oder (umbrochener Text, etwa über einen
    // Seitenwechsel) nach einer Abkürzung oder in einer offenen Klammer
    const weiter = (klein && !ende) || !!(umbrochenerText && !punkt && (abk || klammer));
    if (pause && akt && !weiter) { akt = null; }
    pause = false;
    if (!akt || punkt || akt.punkt || ende || /\t/.test(t)) {
      akt = { text: text, punkt: punkt, zeilen: [t], nachLeer: warPause };
      aus.push(akt);
    } else { akt.text += ' ' + text; akt.zeilen.push(t); }
  });
  return aus;
}
const ABK = /(?:^|[\s(])(?:z|u|d|s|o|v|i|e|ca|bzw|ggf|evtl|inkl|usw|etc|vgl|bspw|Nr|Dr|Hr|Fr|Mme|Mlle|Mr|Mrs|Ms|St|M|p|ex|cf|env|resp|no|vs|al|Tel|Tél|Prof|Dipl|min|max)\.$/i;
function saetze(text) {
  const aus = [];
  let von = 0;
  // Klammertiefe je Stelle: in Klammern endet kein Satz ("(Frühgeburt in der 35. Woche)")
  const tiefe = [];
  let t = 0;
  for (let i = 0; i < text.length; i++) { const ch = text.charAt(i); if (ch === '(') { t++; } else if (ch === ')' && t > 0) { t--; } tiefe.push(t); }
  const re = /[.!?…]+["“”»)]*\s+(?=[„"“«(]?[A-ZÀ-ÖØ-Þ0-9])/g;
  let m;
  while ((m = re.exec(text))) {
    const vor = text.slice(von, m.index + 1).trim(), nach = text.slice(m.index + m[0].length);
    if (tiefe[m.index]) { continue; }
    if (/[.]$/.test(vor) && (ABK.test(vor) || /(^|\s)\p{L}\.$/u.test(vor))) { continue; }
    // Datum und Ordnungszahl: "12. März", "in der 35. Woche", "die 2. Klasse"
    if (/(^|\s)\d{1,2}\.$/.test(vor) && (new RegExp('^(' + MONAT_RE + ')', 'i').test(basisText(nach.slice(0, 12))) || /^[A-ZÄÖÜ][a-zäöüß]/.test(nach))) { continue; }
    const s = text.slice(von, m.index + m[0].length).trim();
    if (s) { aus.push(s); }
    von = m.index + m[0].length;
  }
  const rest = text.slice(von).trim();
  if (rest) { aus.push(rest); }
  return aus;
}
function basisText(s) { return String(s).split('').map(basis).join(''); }

// ---------- Ergebnis sammeln ----------
function neuerKontext(L, opt) {
  const erg = { sprache: L.lang, herkunft: 'frei', name: '', geschlecht: '', bewertungen: {}, chips: {}, f: {}, frei: {}, tabellen: { vorgeschichte: [], aktuell: [], interventionen: [] }, abschnitte: {}, unbekannt: [] };
  const x = { L: L, lang: L.lang, erg: erg, opt: opt, namen: [], namenZahl: {}, g: { m: 0, w: 0, n: 0 }, zahl: { einheiten: 0, vorlage: 0 }, merk: {}, verfahren: null, folge: [], listenFolge: [] };
  x.fakt = function (feld, wert, sicher, beleg) {
    if (wert == null || wert === '' || (typeof wert === 'number' && isNaN(wert))) { return; }
    const alt = erg.f[feld];
    if (!alt || sicher > alt.sicher) { erg.f[feld] = { wert: wert, beleg: beleg || '', sicher: sicher }; }
  };
  x.chip = function (gruppe, key, sicher, beleg) {
    if (!gruppe || !key) { return; }
    const l = erg.chips[gruppe] || (erg.chips[gruppe] = []);
    const da = l.filter(function (c) { return c.key === key; })[0];
    if (da) { if (sicher > da.sicher) { da.sicher = sicher; da.beleg = beleg || da.beleg; } return; }
    l.push({ key: key, beleg: beleg || '', sicher: sicher });
  };
  x.frei = function (feld, text, zeilen) {
    text = String(text == null ? '' : text).trim();
    if (!feld || !text) { return; }
    const alt = erg.frei[feld];
    if (!alt) { erg.frei[feld] = text; return; }
    if (alt.indexOf(text) >= 0) { return; }
    erg.frei[feld] = alt + (zeilen ? '\n' : '\n\n') + text;
  };
  x.bewertung = function (id, band, sicher, beleg, abschnitt, art) {
    if (!id || !band || !band.length) { return; }
    const alt = erg.bewertungen[id];
    if (alt && alt.sicher >= sicher) { return; }
    erg.bewertungen[id] = { wert: vertreter(band), sicher: sicher, beleg: beleg || '', abschnitt: abschnitt || null, band: band.slice(), art: art || 'vorlage' };
  };
  x.unbekannt = function (text) { text = String(text || '').trim(); if (text && erg.unbekannt.indexOf(text) < 0) { erg.unbekannt.push(text); } };
  // bekannte Namen (Aufrufer, Deckblatt, Auftrag) als Skelett
  x.nameDazu = function (text, zaehlen) {
    const t = String(text || '').trim();
    if (!t) { return; }
    const teile = t.indexOf(',') >= 0 ? [t.split(',').slice(1).join(',').trim(), t.split(',')[0].trim()] : t.split(/\s+/);
    const voll = teile.filter(Boolean).join(' ');
    [voll, teile[0], teile.slice().reverse().join(' ')].concat(teile).forEach(function (n) { const k = skText(n, x.lang).trim(); if (k && k.length >= 2 && x.namen.indexOf(k) < 0) { x.namen.push(k); } });
    if (zaehlen) { const k = skText(teile[0] || t, x.lang).trim(); x.namenZahl[k] = (x.namenZahl[k] || 0) + zaehlen; }
  };
  if (opt.vorname) { x.nameDazu(opt.vorname, 5); }
  if (opt.name) { x.nameDazu(opt.name, opt.vorname ? 0 : 3); }
  if (opt.geschlecht === 'm' || opt.geschlecht === 'w') { x.g[opt.geschlecht] += 100; }
  return x;
}
const GENERISCH = { de: ['das kind', 'der schuler', 'die schulerin', 'der junge', 'das madchen', 'der jugendliche', 'die jugendliche'], fr: ['l eleve', 'l enfant', 'le jeune', 'l adolescent', 'l adolescente'], en: ['the student', 'the child', 'the pupil', 'the young person'] };
const ARTIKEL = { de: ['der', 'die', 'das', 'ein', 'eine'], fr: ['l', 'un', 'une'], en: ['the', 'a', 'an'] };
// Platzhalter für die Person prüfen: Pronomen, bekannter Name, "das Kind" – oder ein großgeschriebener Name
function personenOk(w, x) {
  const L = x.L;
  return w._gruppen.every(function (e) {
    if (!e || e.g.typ !== 'person') { return true; }
    const k = e.roh;
    if (L.pronWoerter[k] || L.kindWorte.indexOf(k) >= 0 || x.namen.indexOf(k) >= 0) { return true; }
    if ((GENERISCH[x.lang] || []).indexOf(k) >= 0) { return true; }
    const erstes = k.split(' ')[0];
    if ((ARTIKEL[x.lang] || []).indexOf(erstes) >= 0 && k.split(' ').length === 2) { return true; }
    if (x.namen.length && x.namenFest) { return false; }
    const stop = lexStopp[x.lang] || new Set();
    return /^[A-ZÀ-ÖØ-Þ]/.test(e.orig) && !k.split(' ').some(function (t) { return stop.has(t) || L.pronWoerter[t]; }) && k.split(' ').length <= 3;
  });
}
// Name aus mehreren Wörtern ("Anna-Lena", im Skelett "anna lena") direkt vor einem freien Text: der
// Platzhalter für die Person fängt zuerst nur das erste Wort – mit einem bekannten Namen verlängern
function namenStrecken(w, sk, x) {
  const g = w._gruppen;
  for (let i = 0; i + 1 < g.length; i++) {
    const e = g[i], n = g[i + 1];
    if (!e || !n || e.g.typ !== 'person' || n.g.typ !== 'text' || e.b == null || n.a == null || !n.roh) { continue; }
    const nw = n.roh.split(' ');
    for (let k = Math.min(2, nw.length - 1); k >= 1; k--) {
      const voll = e.roh + ' ' + nw.slice(0, k).join(' ');
      if (x.namen.indexOf(voll) < 0) { continue; }
      const grenze = n.a + nw.slice(0, k).join(' ').length;
      e.roh = voll; e.b = grenze; e.orig = ausschnitt(sk, e.a - 1, grenze);
      n.roh = nw.slice(k).join(' '); n.a = grenze + 1; n.orig = ausschnitt(sk, n.a - 1, n.b); n.wert = String(n.orig || n.roh).trim();
      if (n.g.key && w['_' + n.g.key] === n) { w[n.g.key] = n.wert; }
      if (e.g.key && w['_' + e.g.key] === e) { w[e.g.key] = e.orig; }
      break;
    }
  }
  return w;
}
// Geschlecht und Name aus den Platzhaltern
function stimmen(w, x) {
  const L = x.L;
  w._gruppen.forEach(function (e) {
    if (!e) { return; }
    if (e.g.typ === 'person' || e.g.typ === 'pron') {
      const g = L.pronWoerter[e.roh];
      if (g) { x.g[g]++; return; }
      if (e.g.typ === 'person' && x.namen.indexOf(e.roh) < 0 && (GENERISCH[x.lang] || []).indexOf(e.roh) < 0 && L.kindWorte.indexOf(e.roh) < 0 && /^[A-ZÀ-ÖØ-Þ]/.test(e.orig)) {
        x.namenZahl[e.roh] = (x.namenZahl[e.roh] || 0) + 1;
        if (x.namenZahl[e.roh] >= 2 && x.namen.indexOf(e.roh) < 0) { x.namen.push(e.roh); }
      } else if (e.g.typ === 'person' && x.namen.indexOf(e.roh) >= 0) { x.namenZahl[e.roh] = (x.namenZahl[e.roh] || 0) + 1; }
    }
    if (e.g.typ === 'geschlecht' && e.wert >= 0) { x.g[['m', 'w', 'n'][e.wert] || 'n'] += 1; }
  });
}

// Hilfen für die Faktensätze (an einen Satz gebunden)
function helfer(x, beleg, sicher, abschnitt) {
  const L = x.L, lang = x.lang;
  const h = {
    f: function (feld, wert, s) { x.fakt(feld, wert, s || sicher, beleg); },
    chip: function (gruppe, key, s) { x.chip(gruppe, key, s || sicher, beleg); },
    frei: function (feld, text) { if (text) { x.frei(feld, text); } },
    merke: function (k, v) { x.merk[k] = v; },
    worte: function (n) { if (n != null && !isNaN(n)) { h.f('erste_worte', String(n)); } },
    ohneVorwort: function (t) {
      t = String(t || '').trim();
      const m = /^(?:à l['’]école |à l['’]|au |à la )(.+)$/.exec(t) || /^(?:a l['’]ecole |a l['’]|a la )(.+)$/i.exec(t);
      return m ? m[1] : t;
    },
    auftraggeber: function (wer) {
      if (!wer) { return; }
      const O = (DS_TEXTE[lang] || DS_TEXTE.de).optionen.auftraggeber, k = skText(wer, lang).trim();
      const key = Object.keys(O).filter(function (a) { return skText(O[a][1], lang).trim() === k; })[0];
      if (key) { h.f('auftraggeber', key); } else { h.f('auftraggeber', 'andere'); h.frei('auftraggeber_andere', wer); }
    },
    wem: function (text, formen, vor) {
      let t = String(text || '').trim();
      if (!t) { return; }
      if (formen.w && skText(t, lang).trim() === skText(formen.w, lang).trim()) { x.g.w += 2; return; }
      if (formen.m && skText(t, lang).trim() === skText(formen.m, lang).trim()) { return; }
      if (vor) { t = t.replace(new RegExp('^' + vor.replace(/['’]/g, "['’]") + '\\s*', 'i'), ''); }
      if (t && L.kindWorte.indexOf(skText(t, lang).trim()) < 0 && /^[A-ZÀ-ÖØ-Þ]/.test(t)) { x.nameDazu(t, 2); x.erg.name = x.erg.name || t; x.vollname = t; }
    },
    liste: function (e, liste, o) { return listeAnwenden(e, liste, o || {}, x, beleg, sicher, abschnitt); },
    listeDetails: function (e, gruppe, detailsFeld) { return listeAnwenden(e, 'chip:' + gruppe, { details: detailsFeld }, x, beleg, sicher, abschnitt); },
    diagnosen: function (e) { return listeAnwenden(e, 'chip:diagnosen', { details: 'diagnosen_details', rest: 'diagnose_andere', andere: 'andere' }, x, beleg, sicher, abschnitt); },
    zieleBis: function (e) {
      const d = e ? datenImText(e.orig, lang) : [];
      if (d.length) { h.f('ziele_bis', d[0]); }
      else if (e && /semest/i.test(e.orig)) { x.merk.semester = true; }
    },
    verfahren: function (e, wo) { x.verfahren = { e: e, wo: wo, beleg: beleg, sicher: sicher }; }
  };
  return h;
}
// Aufzählung lesen: Glieder der Liste suchen, Rest als "andere"/Freitext; Details in Klammern
function listeLesen(text, muster, x) {
  const sk = skelett(text, x.lang), belegt = new Array(sk.toks.length).fill(false), treffer = [];
  const sortiert = muster.slice().sort(function (a, b) { return b.literal - a.literal; });
  sortiert.forEach(function (p) {
    p.suche.lastIndex = 0;
    let m;
    while ((m = p.suche.exec(sk.k))) {
      const r = wortBereich(sk, m.index, m.index + m[0].length);
      if (m[0].length === 0) { p.suche.lastIndex++; continue; }
      if (!r) { continue; }
      let frei = true;
      for (let i = r.i; i <= r.j; i++) { if (belegt[i]) { frei = false; } }
      if (!frei) { continue; }
      const w = werteAus(m, p, sk, x.L);
      if (!personenOk(w, x)) { continue; }
      namenStrecken(w, sk, x);
      for (let i = r.i; i <= r.j; i++) { belegt[i] = true; }
      treffer.push({ p: p, i: r.i, j: r.j, w: w, bis: r.bis });
    }
  });
  treffer.sort(function (a, b) { return a.i - b.i; });
  // Details in Klammern direkt nach einem Glied
  treffer.forEach(function (t) {
    const nach = sk.s.slice(t.bis), km = /^\s*\(((?:[^()]|\([^()]*\))*)\)/.exec(nach);
    if (km) {
      t.details = km[1].trim();
      const ende = t.bis + km[0].length;
      for (let i = t.j + 1; i < sk.toks.length && sk.toks[i].von < ende; i++) { belegt[i] = true; }
    }
  });
  // Rest: zusammenhängende, nicht belegte Wörter (ohne Bindewörter) als Originaltext
  const BIND = { de: ['und', 'oder', 'sowie', 'bzw'], fr: ['et', 'ou', 'ainsi', 'qu'], en: ['and', 'or', 'as', 'well'] }[x.lang] || [];
  const rest = [];
  let a = -1;
  for (let i = 0; i <= sk.toks.length; i++) {
    const offen = i < sk.toks.length && !belegt[i];
    if (offen && a < 0) { a = i; }
    if (!offen && a >= 0) {
      let v = a, b = i - 1;
      while (v <= b && BIND.indexOf(sk.toks[v].w) >= 0) { v++; }
      while (b >= v && BIND.indexOf(sk.toks[b].w) >= 0) { b--; }
      if (v <= b) {
        const stueck = sk.s.slice(sk.toks[v].von, sk.toks[b].bis);
        // an Kommas und Bindewörtern trennen, aber nicht in Klammern
        const teile = [];
        let tiefe = 0, von = 0;
        for (let q = 0; q < stueck.length; q++) {
          const ch = stueck.charAt(q);
          if (ch === '(') { tiefe++; } else if (ch === ')') { tiefe = Math.max(0, tiefe - 1); }
          else if (!tiefe && (ch === ',' || ch === ';')) { teile.push(stueck.slice(von, q)); von = q + 1; }
        }
        teile.push(stueck.slice(von));
        teile.forEach(function (tt) { tt.split(/\s+(?:und|oder|sowie|et|ou|ainsi que|and|or|as well as)\s+(?![^(]*\))/).forEach(function (s) { s = s.trim(); if (s) { rest.push({ text: s, pos: v }); } }); });
      }
      a = -1;
    }
  }
  return { treffer: treffer, rest: rest };
}
function listeAnwenden(e, liste, o, x, beleg, sicher, abschnitt) {
  if (!e) { return null; }
  let text = e.orig || e.roh || '';
  const gruppe = liste.indexOf('chip:') === 0 ? liste.slice(5) : null;
  // EN: "behavioral difficulties at school and at home" steht für beide Verhaltens-Chips
  if (o.beide) {
    const re = new RegExp(o.beide.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    if (re.test(text)) { x.chip('anlass', 'verhalten_schule', sicher, beleg); x.chip('anlass', 'verhalten_zuhause', sicher, beleg); text = text.replace(re, ' '); }
  }
  const erg = listeLesen(text, x.L.listen[liste] || [], x);
  // in der Reihenfolge der Aufzählung (die Reihenfolge der Auswahl steht im Text), "andere" an seiner Stelle
  const folge = erg.treffer.map(function (t) { return { pos: t.i, t: t }; }).concat(erg.rest.map(function (r) { return { pos: r.pos, r: r }; }));
  folge.sort(function (a, b) { return a.pos - b.pos; });
  let andere = false;
  const details = function (key, text, s) { const d = (x.erg.f[o.details] && x.erg.f[o.details].wert) || {}; d[key] = text; x.fakt(o.details, d, s, beleg); };
  folge.forEach(function (e) {
    if (e.t) {
      const t = e.t, s = t.p.beschriftung ? Math.min(sicher, 0.85) : sicher;
      if (gruppe) { x.chip(gruppe, t.p.key, s, beleg); if (o.details && t.details) { details(t.p.key, t.details, s); } }
      else if (o.band) { x.bewertung(t.p.id, o.band, s, beleg, abschnitt, 'vorlage'); }
      stimmen(t.w, x);
    } else if (o.rest && o.andere && !andere) { x.chip(gruppe, o.andere, sicher, beleg); andere = true; }
  });
  if (o.band && o.sortiert && erg.treffer.length > 1) {
    x.listenFolge.push(erg.treffer.map(function (t) { return { id: t.p.id, platz: t.p.platz, band: o.band }; }));
  }
  if (erg.rest.length) {
    if (o.rest) {
      let r = erg.rest.map(function (z) { return z.text; }).join(', ');
      // "eine Tic-Störung (2024)": Details der anderen Diagnose in Klammern
      const km = o.details && o.andere ? /^(.*?)\s*\(([^()]*)\)\s*$/.exec(r) : null;
      if (km) { r = km[1]; details(o.andere, km[2], sicher); }
      x.frei(o.rest, r);
    } else {
      // eigene Glieder in einer Aufzählung der Vorlage (von Hand ergänzt): Vorschlag über die Stichwörter
      // mit dem Band des Rahmensatzes; der ganze Satz bleibt zusätzlich als Freitext erhalten
      const bereich = !gruppe && o.band ? liste.split(':')[1] : null, weg = wegWorte(x), stop = lexStopp[x.lang] || new Set();
      // nur Reste mit eigenem Inhalt (nicht Teile des Namens, Pronomen, Füllwörter)
      const echt = erg.rest.filter(function (z) { return woerter(z.text, x.lang).some(function (t) { return t.w.length >= 3 && !weg.has(t.w) && !stop.has(t.w) && !/^\d+$/.test(t.w); }); });
      echt.forEach(function (z) {
        const vs = bereich ? freiVorschlaege(z.text, [bereich], x.L, weg, { band: o.band, nurStich: true, max: 1 }) : [];
        if (vs.length) { x.bewertung(vs[0].id, vs[0].band, 0.6, beleg, abschnitt, 'frei'); } else { x.unbekannt(z.text); }
      });
      if (echt.length) { x.restOffen = true; }
    }
  }
  return erg;
}
// Rahmensatz (s.*) auswerten
function rahmenAnwenden(p, w, x, beleg, sicher, abschnitt) {
  const R = RAHMEN[p.key];
  if (R.liste) { listeAnwenden(w._liste, R.liste, { band: R.band, sortiert: R.sortiert }, x, beleg, sicher, abschnitt); }
  if (R.listen) { Object.keys(R.listen).forEach(function (v) { listeAnwenden(w['_' + v], R.listen[v][0], { band: R.listen[v][1], sortiert: R.sortiert }, x, beleg, sicher, abschnitt); }); }
  if (R.feldDatum && w.datum) { x.fakt(R.feldDatum, w.datum, sicher, beleg); }
  if (R.feldQuelle) {
    w._gruppen.forEach(function (e) { if (e && e.g.typ === 'quelle' && e.wert) { x.fakt(R.feldQuelle, e.wert, sicher, beleg); } });
  }
  if (R.wirkung === 'vertrauen' && w.text) { x.frei('vertrauensperson', w.text); }
  if (R.wirkung === 'trauma') { x.bewertung('i_hyp_trauma', [4, 5, 6, 7], sicher, beleg, abschnitt, 'vorlage'); }
  if (R.wirkung === 'beob' && w._beob) { beobachtungenLesen(w._beob.orig, x, beleg, sicher); }
  if (R.p2) { x.merk.p2 = true; }
}
// "am 18.02.2026 im Klassenverband (45 Minuten) und am 20.02.2026 in der Pause (20 Minuten)",
// auch ohne Datum ("in der Maison Relais (50 Minuten) und am 04.03.2025 …") oder ohne Ort.
// Jeder Eintrag hat die Form [am Datum][ Ort][ (Dauer Minuten)]; zwischen den Einträgen steht
// ", ", "und" bzw. "sowie" (FR "et", "ainsi que"; EN "and"). Gesucht werden Anker (Datum, bekannter
// Ort, Dauer); was dazwischen steht und kein Trennwort ist, ist ein eigener Ort (setting_andere).
const BEOB_TRENN = /,|\s(?:und|sowie|et|ainsi que|and|as well as)(?=\s)/;
function beobachtungenLesen(text, x, beleg, sicher) {
  const O = (DS_TEXTE[x.lang] || DS_TEXTE.de).optionen.setting, lang = x.lang;
  const sk = skelett(text, lang), k = sk.k + ' ';
  const anker = [];
  const finde = function (re, typ, wert) {
    let m;
    while ((m = re.exec(k))) { if (!m[0].length) { re.lastIndex++; continue; } anker.push({ a: m.index, b: m.index + m[0].length, typ: typ, wert: wert(m) }); }
  };
  finde(new RegExp(' (?:am|le|l|on) ' + DATUM_RE + '(?= )', 'g'), 'datum', function (m) { return isoAusSkelett(m[1]); });   // "le" heißt im Skelett "l"
  Object.keys(O).forEach(function (key) {
    const t = skText(O[key], lang).trim();
    if (t) { finde(new RegExp(' ' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?= )', 'g'), 'setting', function () { return key; }); }
  });
  finde(/ (\d{1,3}) (?:minuten|minutes|minute|min)(?= )/g, 'dauer', function (m) { return m[1]; });
  anker.sort(function (p, q) { return (p.a - q.a) || ((q.b - q.a) - (p.b - p.a)); });
  const fest = [];
  anker.forEach(function (an) { if (!fest.length || an.a >= fest[fest.length - 1].b) { fest.push(an); } });
  // Lücken im Originaltext: Trennwörter und eigene Orte
  const folge = [];
  let trenn = false;
  const luecke = function (von, bis) {
    const teile = (' ' + sk.s.slice(von, bis) + ' ').replace(/[()]/g, ' ').split(BEOB_TRENN);
    teile.forEach(function (t, i) {
      if (i > 0) { trenn = true; }
      t = t.replace(/\s+/g, ' ').trim();
      if (t && /[\p{L}\d]/u.test(t)) { folge.push({ typ: 'setting', frei: t, trennVor: trenn }); trenn = false; }
    });
  };
  let pos = 0;
  fest.forEach(function (an) {
    const r = wortBereich(sk, an.a, an.b);
    if (!r) { return; }
    luecke(pos, r.von);
    folge.push({ typ: an.typ, wert: an.wert, trennVor: trenn, orig: sk.s.slice(r.von, r.bis) });
    trenn = false;
    pos = r.bis;
  });
  luecke(pos, sk.s.length);
  const RANG = { datum: 0, setting: 1, dauer: 2 }, liste = [];
  let akt = null, rangVor = -1;
  folge.forEach(function (an, i) {
    const r = RANG[an.typ];
    // eigener Ort, der mit einem bekannten beginnt oder endet ("in der Pause auf dem Schulhof"): ein Ort
    const vor = i > 0 ? folge[i - 1] : null;
    if (akt && an.typ === 'setting' && vor && vor.typ === 'setting' && !an.trennVor && (an.frei || vor.frei)) {
      akt.setting_andere = (vor.frei || vor.orig) + ' ' + (an.frei || an.orig); delete akt.setting;
      return;
    }
    if (!akt || an.trennVor || r <= rangVor) { akt = {}; liste.push(akt); }
    if (an.typ === 'datum') { akt.datum = an.wert; } else if (an.typ === 'dauer') { akt.dauer = an.wert; } else if (an.frei) { akt.setting_andere = an.frei; } else { akt.setting = an.wert; }
    rangVor = r;
  });
  const gut = liste.filter(function (b) { return b.datum || b.setting || b.setting_andere || b.dauer; });
  if (gut.length) { x.fakt('beobachtungen', gut, sicher, beleg); }
}

// ---------- Anleitungen und Reste der CNI-Vorlage ----------
const VORLAGE_REST = [/^ELDiB \(Entwicklungstherapeutischer\/Entwicklungspädagogischer Lernziel-Diagnose-Bogen\)\s*:\s*$/i, /^(V\/K\/KOG\/SOZ|C\/COM\/COG\/SOC)\b/, /^Von … bis/, /^SCAS, CPI, ESEB Dir\./,
  /^Du … au/, /^Depuis …$/, /^Name des Verfassers des Berichts/, /^Berufsbezeichnung$/, /^\(?Nom prénom de l/, /^\(profession\)$/, /^Name of the author/, /^Position$/];
function istAnleitung(text) {
  const t = String(text || '').trim();
  if (!t) { return true; }
  if (/^(oder|ou|or)$/i.test(t)) { return true; }
  if (VORLAGE_REST.some(function (re) { return re.test(t); })) { return true; }
  // ganz in Klammern: graue Anleitung der Vorlage "(…)"
  if (t.charAt(0) === '(' && /\)\.?$/.test(t)) {
    let tiefe = 0;
    for (let i = 0; i < t.length; i++) {
      if (t.charAt(i) === '(') { tiefe++; } else if (t.charAt(i) === ')') { tiefe--; if (tiefe === 0 && i < t.length - 2) { return false; } }
    }
    return true;
  }
  return false;
}
// Satz der Vorlage mit offenen Lücken: "wurde am (Datum) …", "bei … (Name der Lehrperson)"
function istVorlagensatz(text) {
  return /(…|\.\.\.)/.test(text) || /\((Datum|Name des|Name der|nom de l|nom et lieu|Name und Ort|Ortschaft|lieu|ESEB Referenzperson|personne de référence|siehe ELDiB|voir ELDiB|anhand von|présenter|spezifische Auffälligkeiten|indiquer brièvement|ISA \/ Conseil)/i.test(text);
}

// ---------- Kandidaten (Muster) je Abschnitt ----------
const NACHBARN = { schule: ['kind', 'eltern'], kind: ['schule', 'eltern'], eltern: ['schule', 'kind'], anamnese: ['vorgeschichte'], massnahmen: ['aktuell'] };
function abschnittVon(p) { return p.ab || BEREICH_ABSCHNITT[p.bereich] || null; }
function kandidaten(abId, x) {
  const L = x.L, c = L.kand || (L.kand = {}), key = abId || '*';
  if (c[key]) { return c[key]; }
  const l = [];
  L.muster.forEach(function (p) {
    const a = abschnittVon(p);
    if (!abId || a === abId || (NACHBARN[abId] || []).indexOf(a) >= 0) { l.push({ p: p, eigen: !abId || a === abId }); }
  });
  l.sort(function (a, b) { return (b.eigen - a.eigen) || (b.p.literal - a.p.literal) || (a.p.nr - b.p.nr); });
  c[key] = l;
  return l;
}
const BEREICH_FUER = { schule: ['schule'], kind: ['kind'], eltern: ['eltern'], beobachtung: ['beobachtung'], deutung: ['deutung'], beduerfnisse: ['beduerfnisse'] };
const ELDIB_CODE = { v: 'verhalten', k: 'kommunikation', soz: 'sozialisation', kog: 'kognition', comp: 'verhalten', comm: 'kommunikation', soc: 'sozialisation', cog: 'kognition', beh: 'verhalten', com: 'kommunikation' };
function eldibBereich(w, x) {
  const c = String(w.code || '').trim();
  const k = skText(c, 'x').trim();
  if (ELDIB_CODE[k]) { return ELDIB_CODE[k]; }
  const n = skText(w.bereich || '', 'x');
  const namen = { verhalten: /verhalten|comportement|behavior/, kommunikation: /kommunikation|communication/, sozialisation: /sozialisation|socialisation|socialization/, kognition: /kognition|cognition|academics/ };
  return Object.keys(namen).filter(function (b) { return namen[b].test(n); })[0] || null;
}
function wegWorte(x) {
  if (x.weg && x.wegNamen === x.namen.length) { return x.weg; }
  const s = new Set(['jedoch', 'toutefois', 'cependant', 'revanche', 'however', 'contrast']);
  Object.keys(x.L.pronWoerter).forEach(function (k) { k.split(' ').forEach(function (w) { s.add(w); }); });
  x.namen.forEach(function (n) { n.split(' ').forEach(function (w) { s.add(w); }); });
  x.L.kindWorte.forEach(function (n) { n.split(' ').forEach(function (w) { s.add(w); }); });
  x.weg = s; x.wegNamen = x.namen.length;
  return s;
}
function literalSkelett(p, L) {
  const t = String(p.tpl).replace(/\[\[([^|\]]*)\|[^\]]*\]\]/g, '$1').replace(/\{\{([^|}]*)\|[^}]*\}\}/g, '$1');
  let s = '', tiefe = 0;
  for (let i = 0; i < t.length; i++) { const ch = t.charAt(i); if (ch === '{') { tiefe++; } else if (ch === '}') { tiefe--; } else if (!tiefe) { s += ch; } }
  return s;
}

// ---------- Ein Satz ----------
function einheitLesen(u, abId, x) {
  const L = x.L, sk = skelett(u.text, x.lang);
  u.sk = sk;
  if (!sk.toks.length) { u.art = 'leer'; return; }
  if (istAnleitung(u.text)) { u.art = 'anleitung'; return; }
  x.zahl.einheiten++;
  const kand = kandidaten(abId, x);
  for (let n = 0; n < kand.length; n++) {
    const p = kand[n].p, m = p.re.exec(sk.k);
    if (!m) { continue; }
    const w = werteAus(m, p, sk, L);
    if (!personenOk(w, x)) { continue; }
    namenStrecken(w, sk, x);
    x.restOffen = false;
    treffer(p, w, u, abId, x, 0.97);
    // Aufzählung mit eigenen Gliedern: Satz zusätzlich als Freitext
    u.art = x.restOffen ? 'teil' : 'vorlage'; x.zahl.vorlage++;
    return;
  }
  // mehrere Vorlagensätze ohne Satzzeichen dazwischen (OCR), oder ein Vorlagensatz mit Zusatz
  const teil = enthalten(sk, kand, x);
  if (teil) {
    x.restOffen = false;
    teil.treffer.forEach(function (t) { treffer(t.p, t.w, u, abId, x, 0.9); });
    u.art = teil.rest >= 3 || x.restOffen ? 'teil' : 'vorlage'; x.zahl.vorlage += teil.anteil;
    return;
  }
  // fast gleich (andere OCR-Fehler)
  const nah = fastGleich(sk, kand, x);
  if (nah) { treffer(nah.p, { _gruppen: [] }, u, abId, x, nah.sicher); u.art = 'vorlage'; x.zahl.vorlage += 1; return; }
  if (istVorlagensatz(u.text)) { u.art = 'anleitung'; freieFakten(u, abId, x); return; }
  u.art = 'frei';
  const bereiche = abId ? BEREICH_FUER[abId] : Object.keys(BEREICH_ABSCHNITT);
  if (bereiche) {
    const vs = freiVorschlaege(u.text, bereiche, L, wegWorte(x));
    vs.forEach(function (v) { x.bewertung(v.id, v.band, v.sicher, u.text, abId || BEREICH_ABSCHNITT[v.bereich], 'frei'); });
    if (vs.length) { u.vorschlag = vs; }
  }
  freieFakten(u, abId, x);
}
function treffer(p, w, u, abId, x, sicher) {
  const beleg = u.text, ab = abId || abschnittVon(p);
  stimmen(w, x);
  w._gruppen.forEach(function (e) { if (e && e.g.typ === 'quelle' && e.wert) { x.fakt(e.g.art === 'schule' ? 'schule_quelle' : 'eltern_quelle', e.wert, Math.min(sicher, 0.9), beleg); } });
  if (p.art === 'aussage') {
    x.bewertung(p.id, p.band, sicher, beleg, ab, 'vorlage');
    if (['schule', 'kind', 'eltern', 'beobachtung'].indexOf(p.bereich) >= 0) { x.folge.push({ id: p.id, bereich: p.bereich, thema: p.thema, pol: p.pol, platz: p.platz, vorne: p.vorne, band: p.band, abschnitt: ab }); }
    if (w.datum) { x.fakt(p.bereich + '_datum', w.datum, sicher, beleg); }
  } else if (p.art === 'erklaerung') { x.bewertung(p.id, p.band, sicher - 0.01, beleg, ab, 'vorlage'); x.merk.p2 = true; }
  else if (p.art === 'rahmen') { rahmenAnwenden(p, w, x, beleg, sicher, ab); }
  else if (p.art === 'fakt') {
    if (p.eldib === 'bereich') { x.merk.eldibBereich = eldibBereich(w, x); }
    else if (p.eldib === 'ziele' || p.eldib === 'alter') { x.merk.eldibBereich = null; }
    if (p.tu) { p.tu(w, helfer(x, beleg, sicher, ab)); }
  }
  u.muster = (u.muster || []).concat([p]);
}
function enthalten(sk, kand, x) {
  const n = sk.toks.length, belegt = new Array(n).fill(false), tr = [];
  kand.forEach(function (c) {
    const p = c.p;
    if (p.literal < 4) { return; }
    p.suche.lastIndex = 0;
    let m;
    while ((m = p.suche.exec(sk.k))) {
      if (!m[0].length) { p.suche.lastIndex++; continue; }
      const r = wortBereich(sk, m.index, m.index + m[0].length);
      if (!r) { continue; }
      let frei = true;
      for (let i = r.i; i <= r.j; i++) { if (belegt[i]) { frei = false; } }
      if (!frei) { continue; }
      const w = werteAus(m, p, sk, x.L);
      if (!personenOk(w, x)) { continue; }
      namenStrecken(w, sk, x);
      for (let i = r.i; i <= r.j; i++) { belegt[i] = true; }
      tr.push({ p: p, w: w, i: r.i });
    }
  });
  const bel = belegt.filter(Boolean).length;
  if (!tr.length || bel < 0.6 * n) { return null; }
  tr.sort(function (a, b) { return a.i - b.i; });
  return { treffer: tr, rest: n - bel, anteil: bel / n };
}
function fastGleich(sk, kand, x) {
  const weg = wegWorte(x), u = sk.toks.map(function (t) { return t.w; }).filter(function (w) { return !weg.has(w) && !/^\d+$/.test(w); }).join(' ');
  if (u.length < 15) { return null; }
  let best = null;
  kand.forEach(function (c) {
    const p = c.p;
    if (p.art !== 'aussage' && p.art !== 'erklaerung') { return; }
    if (p.lit == null) { p.lit = woerter(literalSkelett(p, x.L), x.lang).map(function (t) { return t.w; }).filter(function (w) { return !weg.has(w); }).join(' '); }
    const lit = p.lit;
    if (!lit || Math.abs(lit.length - u.length) > 0.2 * Math.max(lit.length, u.length)) { return; }
    const a = aehnlich(u, lit);
    if (a >= 0.86 && (!best || a > best.a)) { best = { p: p, a: a }; }
  });
  if (!best) { return null; }
  return { p: best.p, sicher: Math.round((best.a >= 0.95 ? 0.88 : 0.72 + (best.a - 0.86) * 1.5) * 100) / 100 };
}

// ---------- Freitext: Fakten und Auswahlfelder aus frei geschriebenen Sätzen (sicher < 0.7) ----------
function rx(lang, worte) {
  return new RegExp(' (?:' + worte.map(function (w) {
    const pre = /\*$/.test(w);
    return skText(w.replace(/\*$/, ''), lang).trim() + (pre ? '[a-z0-9]*' : '');
  }).join('|') + ')(?= )');
}
const FREI_DIAGNOSEN = {
  adhs: ['ADHS', 'ADS', 'ADHD', 'TDAH', 'TDA', 'Aufmerksamkeitsdefizit*', 'hyperkinetisch*'],
  ass: ['Autismus*', 'autist*', 'Asperger*', 'ASS', 'TSA', 'autisme', 'autism'],
  lernstoerung: ['LRS', 'Legasthenie', 'Dyslexie', 'Dyskalkulie', 'Lernstörung*', 'dyscalculie', 'dysorthographie', 'dyslexia', 'dyscalculia'],
  sprachstoerung: ['Sprachentwicklungsstörung*', 'Sprachstörung*', 'dysphasie', 'Dysphasie'],
  bindung: ['Bindungsstörung*'], angst: ['Angststörung*'], opposition: ['oppositionell*', 'Trotzverhalten']
};
const FREI_FAMILIE = {
  getrennt: ['getrennt', 'geschieden', 'Trennung der Eltern', 'séparés', 'séparé', 'divorcés', 'divorcé', 'separated', 'divorced'],
  zusammen: ['verheiratet', 'leben zusammen', 'mariés', 'vivent ensemble', 'married', 'live together'],
  alleinerziehend: ['alleinerziehend*', 'monoparentale', 'single parent'], patchwork: ['Patchwork*', 'recomposée', 'blended family'],
  verstorben: ['verstorben', 'décédé', 'décédée', 'deceased']
};
const FREI_EREIGNIS = { trennung: ['Trennung', 'Scheidung', 'séparation', 'divorce'], umzug: ['Umzug', 'umgezogen', 'déménagement', 'déménagé', 'moved house'], verlust: ['Tod', 'verstorben', 'Verlust', 'décès', 'deuil', 'death', 'died'],
  krankheit: ['Krankheit', 'erkrankt', 'maladie', 'illness'], konflikte: ['häusliche Gewalt', 'Streit zu Hause', 'violence conjugale', 'conflits familiaux', 'domestic violence'], trauma: ['Trauma*', 'traumatisch*', 'traumatique', 'traumatic'],
  migration: ['Migration', 'geflüchtet', 'Flucht', 'Flüchtling*', 'réfugié*', 'immigr*', 'refugee*'] };
function freieFakten(u, abId, x) {
  const lang = x.lang, t = u.text, k = (u.sk ? u.sk.k : skText(t, lang)) + ' ';
  const hat = function (worte) { return rx(lang, worte).test(k); };
  const daten = datenImText(t, lang);
  if (abId === 'auftrag') {
    if (daten.length && hat(['beauftragt', 'Auftrag', 'Anfrage', 'mandaté', 'mandat', 'demande', 'commissioned', 'referral', 'referred'])) { x.fakt('auftrag_datum', daten[0], 0.65, t); }
    if (hat(['CNI', 'Kommission*', 'Commission']) && hat(['beauftragt', 'mandaté', 'commissioned', 'Auftrag'])) { x.fakt('auftraggeber', 'cni', 0.6, t); }
  }
  if ((abId === 'schule' || abId === 'kind' || abId === 'eltern') && daten.length && hat(['Gespräch*', 'Interview*', 'entretien*', 'rencontre', 'Unterhaltung'])) { x.fakt(abId + '_datum', daten[0], 0.6, t); }
  if (abId === 'beobachtung' && daten.length && hat(['beobacht*', 'Beobachtung*', 'observ*'])) {
    const alt = (x.erg.f.beobachtungen && x.erg.f.beobachtungen.wert) || [];
    daten.forEach(function (d) { if (!alt.some(function (b) { return b.datum === d; })) { alt.push({ datum: d }); } });
    x.fakt('beobachtungen', alt, Math.max(0.55, (x.erg.f.beobachtungen || {}).sicher || 0), t);
  }
  if (abId === 'vorgeschichte' || abId === 'anamnese' || !abId) {
    const vorsicht = hat(['Verdacht*', 'Abklärung', 'abklären', 'abgeklärt', 'ausgeschlossen', 'suspicion', 'soupçon', 'suspecté*', 'suspected', 'exclu*', 'kein', 'keine', 'aucun', 'aucune']);
    if (!vorsicht) { Object.keys(FREI_DIAGNOSEN).forEach(function (key) { if (hat(FREI_DIAGNOSEN[key])) { x.chip('diagnosen', key, 0.6, t); } }); }
    const schw = hat(['Schwangerschaft', 'grossesse', 'pregnancy']), geb = hat(['Geburt', 'accouchement', 'naissance', 'birth']);
    const glatt = hat(['unauffällig', 'problemlos', 'normal', 'sans particularité', 'sans complication', 'uneventful']), kompl = hat(['Komplikation*', 'Frühgeburt', 'Kaiserschnitt', 'complication*', 'prématur*', 'césarienne']);
    if (schw && (glatt || kompl)) { x.fakt('schwangerschaft', kompl ? 'komplikationen' : 'unauffaellig', 0.55, t); }
    if (geb && (glatt || kompl)) { x.fakt('geburt', kompl ? 'komplikationen' : 'unauffaellig', 0.55, t); }
    const verz = hat(['verzögert', 'verspätet', 'Rückstand', 'retard*', 'delayed']), alt = hat(['altersgerecht', 'altersentsprechend', 'normal', "conforme à l'âge", 'age-appropriate']);
    if (hat(['motorisch*', 'Motorik', 'moteur', 'motrice', 'motor']) && (verz || alt)) { x.fakt('motorik', verz ? 'verzoegert' : 'altersgerecht', 0.5, t); }
    if (hat(['Sprachentwicklung', 'Sprache', 'langage', 'language']) && (verz || alt)) { x.fakt('sprache', verz ? 'verzoegert' : 'altersgerecht', 0.5, t); }
    const w = /(?:erste[n]? (?:Wörter|Worte)|premiers mots|first words)[^0-9]{0,25}(\d{1,2})\s*(?:Monat|mois|month)/i.exec(t);
    if (w) { x.fakt('erste_worte', w[1], 0.6, t); }
  }
  if (abId === 'sozialbericht' || !abId) {
    Object.keys(FREI_FAMILIE).forEach(function (key) { if (hat(FREI_FAMILIE[key])) { x.fakt('familienstand', key, 0.5, t); } });
    const lebt = hat(['lebt', 'wohnt', 'vit', 'habite', 'lives']);
    if (lebt) {
      if (hat(['Wechselmodell', 'abwechselnd', 'garde alternée', 'alternately'])) { x.fakt('lebt_bei', 'wechsel', 0.5, t); }
      else if (hat(['Pflegefamilie', "famille d'accueil", 'foster'])) { x.fakt('lebt_bei', 'pflege', 0.5, t); }
      else if (hat(['Wohngruppe', 'Heim', 'foyer', 'residential'])) { x.fakt('lebt_bei', 'heim', 0.5, t); }
      else if (hat(['Großeltern', 'grands-parents', 'grandparents'])) { x.fakt('lebt_bei', 'grosseltern', 0.5, t); }
      else if (hat(['beiden Eltern', 'seinen Eltern', 'ihren Eltern', 'ses deux parents', 'ses parents', 'both parents'])) { x.fakt('lebt_bei', 'beide', 0.5, t); }
      else if (hat(['Mutter', 'mère', 'mother'])) { x.fakt('lebt_bei', 'mutter', 0.5, t); }
      else if (hat(['Vater', 'père', 'father'])) { x.fakt('lebt_bei', 'vater', 0.5, t); }
    }
    if (hat(['Einzelkind', 'enfant unique', 'only child'])) { x.fakt('geschwister_anzahl', '0', 0.55, t); }
    const ZW = { ein: 1, eine: 1, einen: 1, einem: 1, zwei: 2, drei: 3, vier: 4, funf: 5, un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, one: 1, a: 1, an: 1, two: 2, three: 3, four: 4, five: 5 };
    let anz = 0;
    const reG = / (\d|ein|eine|einen|zwei|drei|vier|funf|un|une|deux|trois|quatre|cinq|one|a|an|two|three|four|five)(?: (?:altere|alteren|alterer|jungere|jungeren|jungerer|kleine|kleinen|kleiner|grosse|grossen|grosser|older|younger|grand|grande|petit|petite|grands|grandes|petits|petites|demi))? (geschwister|geschwisterkind|geschwisterkinder|bruder|brudem|schwester|schwestem|frere|freres|soeur|soeurs|sibling|siblings|brother|brothers|sister|sisters)(?= )/g;
    let gm;
    while ((gm = reG.exec(k))) { anz += /^\d$/.test(gm[1]) ? +gm[1] : (ZW[gm[1]] || 0); }
    const fr = / fratrie de (\d+|deux|trois|quatre|cinq|six) enfants /.exec(k);
    if (fr) { anz = (/^\d+$/.test(fr[1]) ? +fr[1] : ZW[fr[1]] || { six: 6 }[fr[1]]) - 1; }
    if (anz > 0 && anz < 15) { x.fakt('geschwister_anzahl', String(anz), 0.5, t); }
    if (hat(['älteste', 'ältester', 'ältestes', 'aîné', 'aînée', 'eldest', 'oldest'])) { x.fakt('geschwister_position', 'aeltestes', 0.5, t); }
    else if (hat(['jüngste', 'jüngster', 'jüngstes', 'cadet', 'cadette', 'benjamin', 'youngest'])) { x.fakt('geschwister_position', 'juengstes', 0.5, t); }
    Object.keys(FREI_EREIGNIS).forEach(function (key) { if (hat(FREI_EREIGNIS[key])) { x.chip('ereignisse', key, 0.5, t); } });
    if (hat(['Maison Relais', 'maison relais'])) { x.chip('betreuung', 'maison_relais', 0.55, t); }
    if (hat(['Tagesmutter', 'assistante parentale', 'childminder'])) { x.chip('betreuung', 'tagesmutter', 0.55, t); }
  }
  if (abId === 'aktuell' || abId === 'massnahmen' || !abId) {
    const kl = /\b(?:Klasse|classe|class)\s+([A-Z]?\d[\w.\-]*)/.exec(t);
    if (kl) { x.fakt('klasse', kl[1].replace(/[.,]$/, ''), 0.55, t); }
    const re = /(?:Referenzperson(?: im ESEB)?|personne de référence(?: au sein de l['’]ESEB| de l['’]ESEB)?|reference person(?: at the ESEB)?)\s+(?:ist|est|is)\s+([^.,;(]+)/i.exec(t);
    if (re && !/…|\.\.\./.test(re[1])) { x.frei('eseb_referenz', re[1].trim()); }
  }
  if (abId === 'verfahren') {
    if (hat(['ELDiB'])) { x.chip('verfahren', 'eldib', 0.65, t); }
    if (hat(['SDQ'])) { x.chip('verfahren', 'sdq', 0.65, t); }
    if (hat(['WISC*'])) { x.chip('verfahren', 'wisc', 0.65, t); }
  }
  freieChips(u, abId, x);
}
// Auswahlfelder in frei geschriebenen Sätzen (Beschriftung oder Textform; kurze Wörter nur mit Hinweiswort)
const FREI_CHIPS = { auftrag: ['anlass', 'anliegen', 'empfohlen'], sozialbericht: ['sprachen'], schule: ['s_staerken', 's_hilft', 's_erwartung'], kind: ['k_interessen', 'k_wuensche'],
  eltern: ['e_staerken', 'e_erwartung'], beduerfnisse: ['ressourcen'] };
const CHIP_HINWEIS = {
  s_staerken: ['Stärke*', 'stark', 'kann gut', 'point fort', 'points forts', 'atout*', 'strength*', 'good at'], e_staerken: ['Stärke*', 'stark', 'kann gut', 'point fort', 'points forts', 'strength*'],
  ressourcen: ['Ressource*', 'Stärke*', 'ressource*', 'resource*', 'strength*'], s_hilft: ['hilft', 'helfen', 'hilfreich', 'bewährt', 'aide*', 'utile*', 'help*'],
  s_erwartung: ['erhofft', 'erwartet', 'wünscht', 'Wunsch', 'attend*', 'espère*', 'souhait*', 'hope*', 'expect*'], e_erwartung: ['erhoffen', 'erhofft', 'erwarten', 'wünschen', 'wünscht', 'attend*', 'espère*', 'souhait*', 'hope*'],
  k_interessen: ['Interesse*', 'Hobby*', 'Freizeit', 'gern', 'gerne', 'mag', 'aime', 'loisir*', 'passion*', 'likes', 'enjoys', 'interest*'], k_wuensche: ['wünscht', 'Wunsch', 'möchte', 'souhait*', 'voudrait', 'wish*', 'would like'],
  sprachen: ['Sprache*', 'spricht', 'gesprochen', 'langue*', 'parle*', 'language*', 'speak*']
};
function freieChips(u, abId, x) {
  const gruppen = FREI_CHIPS[abId];
  if (!gruppen) { return; }
  const sk = u.sk || skelett(u.text, x.lang), k = sk.k + ' ';
  gruppen.forEach(function (g) {
    const hinweis = CHIP_HINWEIS[g] ? rx(x.lang, CHIP_HINWEIS[g]).test(k) : true;
    (x.L.listen['chip:' + g] || []).forEach(function (p) {
      if (/^(andere|keine)$/.test(p.key)) { return; }
      const kurz = p.literal < 2 && String(p.tpl).length < 9;
      if (kurz && !hinweis) { return; }
      p.suche.lastIndex = 0;
      if (p.suche.test(k)) { x.chip(g, p.key, p.beschriftung ? 0.5 : 0.55, u.text); }
    });
  });
}

// ---------- Freitexte zuordnen (was keine Vorlage erklärt, geht nicht verloren) ----------
function freiZuordnen(einheiten, abId, x) {
  const feldFuer = function (u, i) {
    if (!abId) { return null; }
    if (abId === 'deutung') {
      const istP2 = function (e) { return e.art !== 'frei' && (e.muster || []).some(function (p) { return p.art === 'erklaerung' || (p.art === 'rahmen' && RAHMEN[p.key].p2); }); };
      const istHyp = function (e) { return e.art !== 'frei' && (e.muster || []).some(function (p) { return p.art === 'rahmen' && /^hyp_/.test(p.key); }); };
      const hatMuster = function (e) { return e.art !== 'frei' && e.muster && e.muster.length; };
      // Ergänzung zu Ängsten/Abwehr steht im selben Absatz nach diesen Sätzen
      for (let j = i - 1; j >= 0 && einheiten[j].block === u.block; j--) { if (istP2(einheiten[j])) { return 'abwehr'; } }
      // eigener Absatz danach: gehört noch zur Abwehr, wenn die Erklärungsansätze erst danach kommen
      // (die eigene Ergänzung zur Interpretation steht immer am Ende) oder eine Leerzeile ihn als
      // Absatz innerhalb des Feldes abtrennt
      let j = i - 1;
      while (j >= 0 && !hatMuster(einheiten[j])) { j--; }
      const hypDanach = einheiten.slice(i + 1).some(istHyp);
      if (j >= 0 && istP2(einheiten[j]) && (hypDanach || (u.nachLeer && x.leerSelten))) { return 'abwehr'; }
      // ohne Sätze zu Ängsten/Abwehr: ein freier Absatz vor den Erklärungsansätzen ist die Ergänzung zur Abwehr
      if (hypDanach && !einheiten.some(istP2) && !einheiten.slice(0, i).some(istHyp)) { return 'abwehr'; }
      return 'deutung';
    }
    if (abId === 'eldib') { return u.eldib ? 'eldib_' + u.eldib : null; }
    if (abId === 'sozialbericht') {
      const pos = function (e) { return e.muster[0].pos || ''; }, mitMuster = function (e) { return e.art !== 'frei' && e.muster && e.muster.length; };
      // nach den Sätzen zum Familienstand (oder ganz am Anfang) und vor dem nächsten Satz der Vorlage
      // (Geschwister, Sprachen, …): Kontakt-Details
      const vorAlle = einheiten.slice(0, i).filter(mitMuster), nachAlle = einheiten.slice(i + 1).filter(mitMuster);
      if (nachAlle.length && ['geschwister', 'sprachen', 'beruf', 'ereignisse', 'betreuung'].indexOf(pos(nachAlle[0])) >= 0 && vorAlle.every(function (e) { return pos(e) === 'stand'; })) { return 'kontakt_details'; }
      // am Ende des Absatzes der Vorlage: Freizeit; eigene Absätze danach: Familie
      const vor = einheiten.slice(0, i).filter(function (e) { return e.block === u.block && mitMuster(e); });
      const nach = einheiten.slice(i + 1).filter(function (e) { return e.block === u.block && mitMuster(e); });
      if (!nach.length && vor.length) { return 'freizeit'; }
      return 'familie';
    }
    return FREI_FELD[abId] || null;
  };
  let akt = null;
  const fertig = function () {
    if (!akt) { return; }
    const text = akt.teile.join(' ');
    if (akt.feld) { x.frei(akt.feld, text); } else { akt.teile.forEach(function (s) { x.unbekannt(s); }); }
    akt = null;
  };
  einheiten.forEach(function (u, i) {
    if (u.art !== 'frei' && u.art !== 'teil') { if (u.art !== 'anleitung') { fertig(); } return; }
    const feld = feldFuer(u, i);
    if (akt && akt.feld === feld && akt.block === u.block) { akt.teile.push(u.text); }
    else { fertig(); akt = { feld: feld, block: u.block, teile: [u.text] }; }
  });
  fertig();
}

// ---------- Tabellen (2.1, 3.1 als Zeilen; 6.1) ----------
const TAB_KOPF = { zeitraum: ['Zeitraum', 'Période', 'Period'], klasse: ['Klasse', 'Classe', 'Class'], massnahme: ['Maßnahme', 'Intervention', 'Measure'], akteur: ['Akteur', 'Acteur·ice', 'Acteur', 'Provider'], datum: ['Datum', 'Date'], art: ['Art der Intervention', "Type d'intervention", 'Type of intervention'] };
const TAB_MUSTERZEILE = /^(Von … bis|SCAS, CPI, ESEB Dir\.|Du … au|Depuis …$)/;
function zellen(z) { return z.split(/\t+| {2,}/).map(function (c) { return c.trim(); }).filter(function (c, i, a) { return c || (i > 0 && i < a.length - 1); }); }
function istKopf(t, spalte) { const k = skText(t, 'x').trim(); return (TAB_KOPF[spalte] || []).some(function (h) { return skText(h, 'x').trim() === k; }); }
function tabelleLesen(zeilen, name, x) {
  const spalten = tafeln().tabellen[name], rest = [], zeilenAus = [];
  let i = 0;
  while (i < zeilen.length) {
    const z = zeilen[i], c = zellen(z);
    // Kopfzeile in einer Zeile ("Zeitraum<TAB>Klasse<TAB>Maßnahme<TAB>Akteur")
    if (c.length >= 3 && c.filter(function (t, j) { return spalten[j] && istKopf(t, spalten[j]); }).length >= 3) {
      i++;
      while (i < zeilen.length) {
        // Leerzeilen im Tabellenkörper (Seitenwechsel im PDF) überspringen, wenn danach noch Zeilen folgen
        if (!zeilen[i].trim()) {
          let j = i;
          while (j < zeilen.length && !zeilen[j].trim()) { j++; }
          if (j < zeilen.length && zellen(zeilen[j]).length >= 2) { i = j; continue; }
          break;
        }
        if (zellen(zeilen[i]).length < 2) { break; }
        const w = zellen(zeilen[i]);
        if (!TAB_MUSTERZEILE.test(w[0] || '') && !TAB_MUSTERZEILE.test(w[w.length - 1] || '')) { const r = {}; spalten.forEach(function (s, j) { r[s] = w[j] || ''; }); zeilenAus.push(r); }
        i++;
      }
      continue;
    }
    // Kopf Zelle für Zelle ("Zeitraum" / "Klasse" / "Maßnahme" / "Akteur" untereinander)
    if (istKopf(z.trim(), spalten[0])) {
      let j = i, n = 0;
      while (n < spalten.length && j < zeilen.length && istKopf(zeilen[j].trim(), spalten[n])) { j++; n++; }
      if (n === spalten.length) {
        const zellenListe = [];
        let k = j;
        while (k < zeilen.length) {
          const t = zeilen[k].trim();
          if (!t) { k++; continue; }
          if (t.length > 80 || (/[.!?:]$/.test(t) && t.length > 40) || zellen(zeilen[k]).length >= 3) { break; }
          zellenListe.push(t); k++;
        }
        const nutz = zellenListe.filter(function (t) { return !TAB_MUSTERZEILE.test(t); });
        for (let a = 0; a + spalten.length <= nutz.length; a += spalten.length) {
          const r = {}; spalten.forEach(function (s, b) { r[s] = nutz[a + b] || ''; }); zeilenAus.push(r);
        }
        i = k;
        continue;
      }
    }
    rest.push(z);
    i++;
  }
  zeilenAus.forEach(function (r) { if (r.zeitraum || r.massnahme || r.akteur) { x.erg.tabellen[name].push(r); } });
  return rest;
}
const IV_VORLAGE = {
  klassenbeobachtung: ['Klassenbeobachtungen', 'Observations en classe', 'Classroom observations'],
  kontakt_eltern: ['Kontakte mit Erziehungsberechtigten', 'Contacts avec les parents/tuteur·ice·s', 'Contacts with parents/guardians'],
  kontakt_schule: ['Kontakte mit der Herkunftsschule (Lehr-/Fachpersonal)', 'Contacts avec l’école d‘origine (enseignant·e·s, spécialistes)', 'Contacts with the home school (teachers/specialists)'],
  kontakt_extern: ['Kontakte mit externem Fachpersonal', 'Contacts avec les spécialistes', 'Contacts with external professionals'],
  kontakt_schueler: ['Kontakte mit dem/der Schüler:in', 'Contacts avec l‘élève', 'Contacts with the student']
};
function interventionenLesen(zeilen, x) {
  const U = tafeln().ui, namen = {};
  INTERVENTIONEN.forEach(function (art) {
    const l = (IV_VORLAGE[art] || []).slice();
    SPRACHEN.forEach(function (s) { const o = (U[s] || {}).opt; if (o && o.interventionen && o.interventionen[art]) { l.push(o.interventionen[art]); } });
    l.forEach(function (t) { namen[skText(t, 'x').trim()] = art; });
  });
  const aus = [];
  let art = null;
  zeilen.forEach(function (z) {
    const t = z.trim();
    if (!t) { return; }
    const c = zellen(z), erste = skText(c[0], 'x').trim();
    if (namen[erste]) { art = namen[erste]; c.slice(1).forEach(function (d) { datenImText(d, x.lang).forEach(function (iso) { aus.push({ datum: iso, art: art }); }); }); return; }
    if (istKopf(t, 'datum')) { return; }
    const d = datenImText(t, x.lang);
    if (art && d.length) { d.forEach(function (iso) { aus.push({ datum: iso, art: art }); }); }
  });
  x.erg.tabellen.interventionen = x.erg.tabellen.interventionen.concat(aus);
}

// ---------- Listen-Abschnitte: 5.2 Ziele, 5.3 Empfehlungen, 5.4 CNI ----------
// bekannt: { fertig(text), neu(text) } – vollständiger Punkt der Vorlage bzw. Zeile, die sicher einen neuen
// Punkt beginnt (Zwischenüberschrift, Punkt aus der Liste): dann nicht verbinden, auch wenn die Breite passt
function zeilenVerbinden(zeilen, breite, bekannt) {
  const aus = [];
  zeilen.forEach(function (z) {
    const t = z.trim();
    // umbrochener Code eines Ziels "(SOC-5)" ist keine graue Anleitung
    if (!t || (istAnleitung(t) && !ZIEL_CODE.test(t))) { return; }
    const punkt = PUNKT.test(t) && !/^-\d/.test(t);
    const text = punkt ? t.replace(PUNKT, '').trim() : t;
    const vor = aus.length ? aus[aus.length - 1] : null;
    // umbrochen, wenn das erste Wort dieser Zeile nicht mehr in die vorige gepasst hätte
    const erstes = text.split(/\s+/)[0] || '', klein = /^[a-zà-öø-ÿ]/.test(text);
    const umbruch = breite && vor && vor.roh.length + 1 + erstes.length > breite && !/[.!?:)]$/.test(vor.text);
    const getrennt = !!(bekannt && vor && ((!klein && bekannt.fertig(vor.text)) || bekannt.neu(text)));
    if (vor && !punkt && !getrennt && (umbruch || klein)) { vor.text += ' ' + text; vor.roh = t; }
    else { aus.push({ text: text, roh: t }); }
  });
  // zwei Zeilen, die nur zusammen einen bekannten Punkt ergeben ("… folgende" / "Maßnahmen:")
  for (let i = 0; bekannt && i + 1 < aus.length; i++) {
    const a = aus[i].text, b = aus[i + 1].text;
    if (!bekannt.fertig(a) && !bekannt.fertig(b) && bekannt.fertig(a + ' ' + b)) { aus[i].text = a + ' ' + b; aus.splice(i + 1, 1); i--; }
  }
  return aus.map(function (a) { return a.text; });
}
// Was in 5.2–5.4 sicher ein ganzer Punkt ist (für zeilenVerbinden)
function listenBekannt(id, x) {
  if (id === 'ziele') { return { fertig: function (t) { return ZIEL_CODE.test(t); }, neu: function () { return false; } }; }
  const L = x.L, res = [];
  if (id === 'empfehlungen') {
    kandidaten('empfehlungen', x).forEach(function (c) { if (c.p.kontext) { res.push(c.p.re); } });
    ['empf_familie', 'empf_schule', 'empf_region'].forEach(function (g) { (L.listen['chip:' + g] || []).forEach(function (p) { if (!p.beschriftung) { res.push(p.re); } }); });
  } else if (id === 'cni') {
    kandidaten('cni', x).forEach(function (c) { if (c.p.cniKopf) { res.push(c.p.re); } });
    (L.listen['chip:cni'] || []).forEach(function (p) { if (!p.beschriftung) { res.push(p.re); } });
  }
  const passt = function (t) { const k = skelett(t, x.lang).k; return res.some(function (re) { re.lastIndex = 0; return re.test(k); }); };
  return { fertig: passt, neu: passt };
}
// Zeilenbreite eines umbrochenen Textes (95 %-Wert der langen Zeilen ohne Tabellenzeilen, vor dem
// Zusammenfügen getrennter Wörter gemessen); 0 = zu wenige Zeilen
function zeilenBreite(zeilen) {
  const l = zeilen.filter(function (z) { return !/\t/.test(z); }).map(function (z) { return z.trim().length; }).filter(function (n) { return n >= 30; }).sort(function (a, b) { return a - b; });
  return l.length >= 10 ? l[Math.floor(l.length * 0.95)] : 0;
}
const ZIEL_CODE = /\((?:V|K|SOZ|KOG|COMP|COMM|SOC|COG|BEH|COM)-\d+\)\s*$/;
const ELDIB_ZIEL = /^(?:V|K|SOZ|KOG|COMP|COMM|SOC|COG|BEH|COM)-\d+\s*[–—-]\s+/;
function satzZeileLesen(zeile, abId, x) {
  // alle Sätze einer Zeile mit den Vorlagen des Abschnitts; true, wenn alles erklärt ist
  let alle = true;
  saetze(zeile).forEach(function (s) {
    const u = { text: s, block: 0 };
    einheitLesen(u, abId, x);
    if (u.art === 'frei' || u.art === 'teil') { alle = false; }
  });
  return alle;
}
function listenAbschnitt(id, zeilen, x) {
  const L = x.L, liste = zeilenVerbinden(zeilen, x.umbrochen ? x.breite : 0, listenBekannt(id, x));
  x.merk = {};
  if (id === 'ziele') {
    liste.forEach(function (z) {
      if (istAnleitung(z)) { return; }
      if (ZIEL_CODE.test(z) || ELDIB_ZIEL.test(z)) { x.zahl.einheiten++; x.zahl.vorlage++; return; }   // Ziel aus dem ELDiB
      if (!satzZeileLesen(z, 'ziele', x)) { x.frei('ziele_zusatz', z, true); }
    });
    return;
  }
  if (id === 'empfehlungen') {
    const kopf = kandidaten('empfehlungen', x).filter(function (c) { return c.p.kontext; });
    const GR = { familie: 'empf_familie', schule: 'empf_schule', region: 'empf_region' };
    let kontext = null;
    liste.forEach(function (z) {
      if (istAnleitung(z)) { return; }
      const sk = skelett(z, x.lang);
      x.zahl.einheiten++;
      const k = kopf.filter(function (c) { return c.p.re.test(sk.k); })[0];
      if (k) { kontext = k.p.kontext; x.zahl.vorlage++; return; }
      let hit = null;
      const reihenfolge = kontext ? [GR[kontext]].concat(Object.keys(GR).map(function (a) { return GR[a]; }).filter(function (g) { return g !== GR[kontext]; })) : ['empf_familie', 'empf_schule', 'empf_region'];
      reihenfolge.forEach(function (g) {
        if (hit) { return; }
        (L.listen['chip:' + g] || []).forEach(function (p) { if (!hit && !p.beschriftung && p.re.test(sk.k)) { hit = { g: g, p: p }; } });
      });
      if (hit) { x.chip(hit.g, hit.p.key, 0.97, z); x.zahl.vorlage++; if (!kontext) { kontext = Object.keys(GR).filter(function (a) { return GR[a] === hit.g; })[0]; } return; }
      // eigene Empfehlung: in das Feld des Kontexts (ohne Zwischenüberschrift: nach Stichworten)
      let ctx = kontext;
      if (!ctx) {
        const kk = sk.k + ' ';
        ctx = rx(x.lang, ['Eltern', 'Familie', 'zu Hause', 'parents', 'famil*', 'maison', 'home']).test(kk) ? 'familie'
          : (rx(x.lang, ['ESEB', 'CDSE', 'Therapie', 'thérapie', 'therapy', 'ISA', 'Logopädie', 'Ergotherapie', 'logopédie', 'ergothérapie', 'psychiatr*']).test(kk) ? 'region' : 'schule');
      }
      x.frei('empfehlung_' + ctx, z, true);
      (x.L.listen['chip:' + GR[ctx]] || []).forEach(function (p) {
        p.suche.lastIndex = 0;
        if (!/^(andere|keine)$/.test(p.key) && p.suche.test(sk.k + ' ')) { x.chip(GR[ctx], p.key, p.beschriftung ? 0.5 : 0.6, z); }
      });
    });
    return;
  }
  if (id === 'cni') {
    // Unterschrift: die (bis zu) zwei Zeilen vor "Unité de diagnostic, de conseil et de suivi"
    let sig = -1;
    liste.forEach(function (z, i) { if (/unit[ée] de diagnostic,? de conseil et de suivi/i.test(z)) { sig = i; } });
    const unterschrift = [];
    if (sig >= 0) {
      for (let i = sig - 1; i >= 0 && unterschrift.length < 2; i--) {
        const z = liste[i];
        if (istAnleitung(z)) { unterschrift.unshift(null); continue; }
        if (z.length > 90 || /[.!?:]$/.test(z) || (L.listen['chip:cni'] || []).some(function (p) { return p.re.test(skText(z, x.lang)); })) { break; }
        unterschrift.unshift(i);
      }
    }
    const sigZeilen = unterschrift.filter(function (i) { return i != null; });
    if (sigZeilen.length) {
      x.fakt('verfasser_name', liste[sigZeilen[0]], 0.8, liste[sigZeilen[0]]);
      if (sigZeilen[1] != null) { x.fakt('verfasser_funktion', liste[sigZeilen[1]], 0.8, liste[sigZeilen[1]]); }
    }
    const begruendung = [];
    liste.forEach(function (z, i) {
      if (i === sig || sigZeilen.indexOf(i) >= 0 || istAnleitung(z)) { return; }
      const sk = skelett(z, x.lang);
      x.zahl.einheiten++;
      if (kandidaten('cni', x).some(function (c) { return c.p.cniKopf && c.p.re.test(sk.k); })) { x.zahl.vorlage++; return; }
      const hit = (L.listen['chip:cni'] || []).filter(function (p) { return !p.beschriftung && p.re.test(sk.k); })[0];
      if (hit) { x.chip('cni', hit.key, 0.97, z); x.zahl.vorlage++; return; }
      begruendung.push(z);
      (L.listen['chip:cni'] || []).forEach(function (p) {
        p.suche.lastIndex = 0;
        if (p.literal >= 2 && p.suche.test(sk.k + ' ')) { x.chip('cni', p.key, p.beschriftung ? 0.5 : 0.6, z); }
      });
    });
    bloecke(begruendung).forEach(function (b) { x.frei('cni_begruendung', b.text); });
  }
}

// ---------- Deckblatt ----------
const DECK_LABEL = { name: /^(Name des|Name der|Nom et prénom|Nom de l|Student[’']s name)/i, matricule: /^(Sozialversicherungsnummer|Matricule|Social security number)\b/i,
  alter: /^(Alter|Âge|Age)$/i, schule: /^(Schule|École|Ecole|School)$/i, klasse: /^(Klasse|Classe|Class)$/i, sprachen: /^(Sprachen|Langues|Languages)$/i };
const DECK_PLATZHALTER = /^(NAME Vorname|Prénom et NOM|NOM Prénom|2000 04 03 XXXXX|Name der Schule und Ort|C\.?|Luxemburgisch, Portugiesisch, Deutsch, Französisch, Englisch)$/;
const KREUZ = /^\s*(?:☒|☑|✓|✔|⌧|☓|✗|\[x\]|\(x\))\s*(.*)$/i, LEER = /^\s*(?:☐|□|\[ \])\s*(.*)$/;
function deckblattLesen(zeilen, x) {
  const werte = {}, cni = [];
  const D = tafeln().deckblatt;
  const cniNamen = [];
  Object.keys(D).forEach(function (l) { Object.keys(D[l].cni).forEach(function (k) { const v = D[l].cni[k]; (Array.isArray(v) ? v : [v]).forEach(function (t) { cniNamen.push({ k: k, sk: skText(t, 'x').trim() }); }); }); });
  const cniKey = function (t) {
    const s = skText(t, 'x').trim();
    if (!s) { return null; }
    const e = cniNamen.filter(function (c) { return c.sk === s; })[0] || cniNamen.filter(function (c) { return aehnlich(c.sk, s) >= 0.88; })[0];
    return e ? e.k : null;
  };
  const t = zeilen.map(function (z) { return z.trim(); });
  t.forEach(function (z, i) {
    if (!z) { return; }
    Object.keys(DECK_LABEL).forEach(function (feld) {
      if (werte[feld] != null) { return; }
      const c = zellen(z), lab = c[0].replace(/[:：]\s*$/, '');
      if (!DECK_LABEL[feld].test(lab)) { return; }
      let wert = c.length > 1 ? c.slice(1).join(' ') : '';
      if (!wert) { for (let j = i + 1; j < t.length && j <= i + 2; j++) { if (t[j]) { wert = t[j]; break; } } }
      if (wert && !DECK_PLATZHALTER.test(wert.trim()) && !Object.keys(DECK_LABEL).some(function (f) { return DECK_LABEL[f].test(wert); })) { werte[feld] = wert.trim(); }
    });
    // Empfehlungen an die CNI: angekreuzt
    const kr = KREUZ.exec(z);
    if (kr) {
      const text = kr[1] || (t[i + 1] || '');
      const k = cniKey(text);
      if (k && cni.indexOf(k) < 0) { cni.push(k); }
    }
    if (/^Name des Schülers\b/.test(z) && !/Schülerin/.test(z)) { x.g.m += 2; }
    if (/^Name der Schülerin\b/.test(z)) { x.g.w += 2; }
  });
  if (werte.name) {
    const n = werte.name, teile = n.split(/\s+/), gross = teile.filter(function (w) { return w.length > 1 && w === w.toUpperCase(); });
    const vor = teile.filter(function (w) { return gross.indexOf(w) < 0; });
    x.nameDazu(vor.length && gross.length ? gross.join(' ') + ', ' + vor.join(' ') : n, 1);
    x.deckName = vor.length && gross.length ? vor.join(' ') + ' ' + gross.map(function (w) { return w.charAt(0) + w.slice(1).toLowerCase(); }).join(' ') : n;
  }
  x.deckblatt = { werte: werte, cni: cni };
  x.erg.abschnitte.deckblatt = { titel: '', text: zeilen.join('\n').trim(), werte: werte };
}
function titelGeschlecht(a, x) {
  if (x.lang !== 'de' || ['kind', 'beduerfnisse', 'produktionen'].indexOf(a.id) < 0) { return; }
  const T = (tafeln().titel.de || {})[a.id];
  if (!Array.isArray(T)) { return; }
  const k = skText(String(a.titel).replace(/^\s*\d(?:\s*[.,]\s*\d)?\s*[.)]?\s*/, ''), 'de').trim();
  if (k === skText(T[0], 'de').trim()) { x.g.m += 3; }
  if (k === skText(T[1], 'de').trim()) { x.g.w += 3; }
}

// ---------- Ein Abschnitt ----------
function abschnittLesen(ab, x) {
  const id = ab.id;
  x.erg.abschnitte[id || 'unbekannt'] = { titel: ab.titel || '', text: ab.zeilen.join('\n').replace(/\n{3,}/g, '\n\n').trim() };
  if (id === 'raster' || id === 'produktionen' || id === 'anhang') { return; }
  let zeilen = ab.zeilen;
  if (id === 'vorgeschichte' || id === 'anamnese') { zeilen = tabelleLesen(zeilen, 'vorgeschichte', x); }
  if (id === 'massnahmen' || id === 'aktuell') { zeilen = tabelleLesen(zeilen, 'aktuell', x); }
  if (id === 'interventionen') { interventionenLesen(zeilen, x); return; }
  if (id === 'ziele' || id === 'empfehlungen' || id === 'cni') { listenAbschnitt(id, zeilen, x); return; }
  x.merk = {};
  const einheiten = [];
  bloecke(zeilen, x.umbrochen).forEach(function (b, bi) {
    if (istAnleitung(b.text)) { return; }
    if (id === 'eldib' && ELDIB_ZIEL.test(b.text)) { return; }   // Lernziel aus dem ELDiB ("V-5 – …")
    saetze(b.text).forEach(function (s) { einheiten.push({ text: s, block: bi, nachLeer: b.nachLeer }); });
  });
  const leseId = id === 'anamnese' ? 'vorgeschichte' : id;
  einheiten.forEach(function (u) { einheitLesen(u, leseId, x); if (id === 'eldib') { u.eldib = x.merk.eldibBereich; } });
  freiZuordnen(einheiten, leseId, x);
}

// ---------- Nacharbeit: Verfahren, Deckblatt, Name, Geschlecht, Herkunft ----------
function verfahrenAuswerten(x) {
  const v = x.verfahren;
  if (!v || !v.e) { return; }
  const lang = x.lang, text = v.e.orig, wo = v.wo;
  const auf = wo.auf, teile = text.split(new RegExp(',\\s+(?=' + auf + '\\s)|\\s+' + wo.und + '\\s+(?=' + auf + '\\s)'));
  const erster = teile.shift().replace(new RegExp('^' + auf + '\\s+'), '');
  listeAnwenden({ orig: erster, roh: skText(erster, lang).trim() }, 'chip:verfahren', { rest: 'verfahren_andere' }, x, v.beleg, v.sicher, 'verfahren');
  const beobDaten = Object.keys(x.erg.bewertungen).some(function (id) { return /^b_/.test(id); }) || x.erg.f.beobachtungen || x.erg.frei.beobachtung;
  teile.forEach(function (t) {
    const k = skText(t, lang).trim();
    if (k === skText(wo.beob, lang).trim() && !beobDaten) { x.chip('verfahren', 'beobachtung', v.sicher, v.beleg); }
    if (k === skText(wo.gespr, lang).trim()) { x.chip('verfahren', 'gespraeche', v.sicher, v.beleg); }
  });
}
// Reihenfolge nutzen: 46-ds-text.js ordnet die Sätze eines Themas nach Stärke (v = r, bei Schwierigkeiten 8 − r)
// absteigend, bei Gleichstand nach dem Platz in der Liste; Ängste, Abwehr, Erklärungen und Bedürfnisse nach r
// absteigend. Steht ein Satz vor einem aus demselben Band mit kleinerem Listenplatz, muss er höher bewertet sein
// (z. B. 7 vor 6). Gewählt wird je Band weiter der Wert nahe 4, soweit die Reihenfolge es zulässt.
function ordnen(l, v, x) {
  if (l.length < 2) { return; }
  const dom = l.map(function (e) { return e.band.slice(); });
  const passt = function (a, ra, b, rb) { return v(a, ra) > v(b, rb) || (v(a, ra) === v(b, rb) && a.platz < b.platz); };
  for (let runde = 0; runde < 20; runde++) {
    let neu = false;
    for (let k = 0; k + 1 < l.length; k++) {
      const a = l[k], b = l[k + 1];
      const da = dom[k].filter(function (ra) { return dom[k + 1].some(function (rb) { return passt(a, ra, b, rb); }); });
      const db = dom[k + 1].filter(function (rb) { return dom[k].some(function (ra) { return passt(a, ra, b, rb); }); });
      if (da.length && da.length < dom[k].length) { dom[k] = da; neu = true; }
      if (db.length && db.length < dom[k + 1].length) { dom[k + 1] = db; neu = true; }
    }
    if (!neu) { break; }
  }
  let vor = null;
  l.forEach(function (e, k) {
    const g = x.erg.bewertungen[e.id];
    if (!g || g.band.join() !== e.band.join()) { vor = null; return; }
    let kand = dom[k];
    if (vor) { const f = kand.filter(function (r) { return passt(vor.e, vor.r, e, r); }); if (f.length) { kand = f; } }
    const w = vertreter(kand);
    if (w !== g.wert) { g.wert = w; g.reihenfolge = true; }
    vor = { e: e, r: w };
  });
}
function reihenfolgeNutzen(x) {
  const gruppen = {}, liste = [];
  x.folge.forEach(function (e) { if (e.vorne) { return; } const k = e.abschnitt + '|' + e.bereich + '|' + e.thema; if (!gruppen[k]) { gruppen[k] = []; liste.push(gruppen[k]); } gruppen[k].push(e); });
  liste.forEach(function (l) { ordnen(l, function (e, r) { return e.pol < 0 ? 8 - r : r; }, x); });
  x.listenFolge.forEach(function (l) { ordnen(l, function (e, r) { return r; }, x); });
}
function nachbereiten(x) {
  const erg = x.erg;
  verfahrenAuswerten(x);
  reihenfolgeNutzen(x);
  // Deckblatt als Rückfall (Werte des Deckblatts stehen auch im Text)
  const d = x.deckblatt;
  if (d) {
    if (d.cni.length && !(erg.chips.cni || []).length) {
      const sub = d.cni.some(function (k) { return ['clapa', 'cst', 'annexe'].indexOf(k) >= 0; });
      d.cni.forEach(function (k) { if (!(sub && k === 'beschulung')) { x.chip('cni', k, 0.8, 'Deckblatt'); } });
    }
    if (d.werte.klasse) { x.fakt('klasse', d.werte.klasse, 0.6, 'Deckblatt'); }
    if (d.werte.schule) { x.fakt('schule_name', d.werte.schule, 0.6, 'Deckblatt'); }
    if (d.werte.sprachen && !(erg.chips.sprachen || []).length) {
      const T = x.L.T.chips.sprachen;
      d.werte.sprachen.split(/\s*,\s*/).forEach(function (s) {
        const k = Object.keys(T).filter(function (key) { return key !== 'andere' && skText(T[key][0], x.lang).trim() === skText(s, x.lang).trim(); })[0];
        if (k) { x.chip('sprachen', k, 0.7, 'Deckblatt'); }
      });
    }
  }
  // Geschlecht aus Pronomen, Angleichungen, Überschriften
  const g = x.g;
  erg.geschlecht = (g.m >= 2 && g.m > 2 * g.w) ? 'm' : ((g.w >= 2 && g.w > 2 * g.m) ? 'w' : '');
  // Name: Vollname aus dem Auftrag, sonst Deckblatt, sonst der häufigste Vorname in den Sätzen
  if (!erg.name) { erg.name = x.vollname || x.deckName || ''; }
  if (!erg.name) {
    let best = null;
    Object.keys(x.namenZahl).forEach(function (n) { if (!best || x.namenZahl[n] > x.namenZahl[best]) { best = n; } });
    if (best && x.namenZahl[best] >= 2) { erg.name = x.opt.vorname || (x.namenOrig && x.namenOrig[best]) || best.replace(/(^| )(\S)/g, function (m, a, b) { return a + b.toUpperCase(); }); }
  }
  if (!erg.name && x.opt.name) { erg.name = x.opt.name; }
  // Tabellen vom Aufrufer (aus Word) haben Vorrang
  const vt = x.opt.tabellen;
  if (vt && typeof vt === 'object') { Object.keys(DS_TABELLEN_SPALTEN()).forEach(function (t) { if (Array.isArray(vt[t])) { erg.tabellen[t] = tabelleNormalisieren(vt[t], t); } }); }
  // Herkunft: Anteil der Sätze, die eine Vorlage des Generators erklärt
  const n = x.zahl.einheiten, v = x.zahl.vorlage, q = n ? v / n : 0;
  erg.herkunft = (n >= 5 && q >= 0.6) ? 'generator' : (q <= 0.15 ? 'frei' : 'gemischt');
  Object.keys(erg.chips).forEach(function (k) { if (!erg.chips[k].length) { delete erg.chips[k]; } });
}
function DS_TABELLEN_SPALTEN() { return tafeln().tabellen; }
// Tabellen vom Aufrufer: Zeilen als Objekte (Spaltennamen) oder als Zellenlisten (mit oder ohne Kopfzeile)
function tabelleNormalisieren(rows, t) {
  const spalten = DS_TABELLEN_SPALTEN()[t], aus = [];
  rows.forEach(function (r, i) {
    if (Array.isArray(r)) {
      const zellenL = r.map(function (c) { return String(c == null ? '' : c).trim(); });
      if (i === 0 && zellenL.some(function (c, j) { return spalten[j] && istKopf(c, spalten[j]); })) { return; }
      if (t === 'interventionen') {
        // 6.1 aus Word: [Art, Daten]
        const art = Object.keys(IV_VORLAGE).filter(function (a) { return IV_VORLAGE[a].concat(SPRACHEN.map(function (s) { return ((tafeln().ui[s] || {}).opt || {}).interventionen ? tafeln().ui[s].opt.interventionen[a] : ''; })).some(function (l) { return l && skText(l, 'x').trim() === skText(zellenL[0], 'x').trim(); }); })[0];
        if (art) { datenImText(zellenL.slice(1).join(' ')).forEach(function (d) { aus.push({ datum: d, art: art }); }); return; }
      }
      const o = {}; spalten.forEach(function (s, j) { o[s] = zellenL[j] || ''; }); aus.push(o);
    } else if (r && typeof r === 'object') { const o = {}; spalten.forEach(function (s) { o[s] = r[s] == null ? '' : String(r[s]); }); aus.push(o); }
  });
  return aus.filter(function (o) { return spalten.some(function (s) { return o[s]; }); });
}

// ---------- Lesen ----------
function lesen(text, opt) {
  opt = opt || {};
  let gegeben = null;
  if (opt.abschnitte && typeof opt.abschnitte === 'object') {
    gegeben = Array.isArray(opt.abschnitte) ? opt.abschnitte : Object.keys(opt.abschnitte).map(function (id) { return { id: id, text: opt.abschnitte[id] }; });
  }
  const seitenvorschub = /\f/.test(String(text || ''));
  // zuerst Kopf-/Fußzeilen weg (sie können mitten in einem getrennten Wort stehen), dann säubern
  const vorab = String(text || '').replace(/\r\n?/g, '\n');
  const vorLang = SPRACHEN.indexOf(opt.sprache) >= 0 ? opt.sprache : spracheErkennen(vorab);
  const vorX = { lang: vorLang, seitenvorschub: seitenvorschub, fakt: function (k, v, s, b) { vorX.datum = vorX.datum || { wert: v, sicher: s, beleg: b }; } };
  const ohneKopf = kopfFussEntfernen(vorab.split('\n'), vorX);
  const roh = saeubern(ohneKopf.join('\n'), vorLang);
  const alle = roh + (gegeben ? '\n' + gegeben.map(function (a) { return a.text || ''; }).join('\n') : '');
  const lang = SPRACHEN.indexOf(opt.sprache) >= 0 ? opt.sprache : spracheErkennen(alle);
  const L = sprachDaten(lang);
  const x = neuerKontext(L, opt);
  x.seitenvorschub = seitenvorschub;
  x.umbrochen = umbrochen(alle.split('\n'));
  x.breite = zeilenBreite(ohneKopf.concat(gegeben ? gegeben.map(function (a) { return a.text || ''; }).join('\n').split('\n') : []));
  // Leerzeilen zwischen Absätzen selten (Text aus Word): dann trennt eine Leerzeile Absätze innerhalb eines Feldes
  const zl = alle.split('\n'), leerZ = zl.filter(function (z) { return !z.trim(); }).length;
  x.leerSelten = leerZ < 0.3 * (zl.length - leerZ);
  if (vorX.datum) { x.fakt('bericht_datum', vorX.datum.wert, vorX.datum.sicher, vorX.datum.beleg); }
  let gl;
  if (gegeben) {
    const ids = tafeln().gliederung.map(function (g) { return g.id; });
    gl = { vor: roh ? roh.split('\n') : [], abschnitte: gegeben.map(function (a) {
      let id = ids.indexOf(a.id) >= 0 ? a.id : null;
      if (!id && a.titel) { const u = ueberschrift(a.titel, lang); id = u ? u.id : null; }
      return { id: id, titel: a.titel || '', zeilen: saeubern(a.text || '', lang).split('\n') };
    }) };
  } else {
    gl = gliedern(roh.split('\n'), x);
    if (!gl.abschnitte.length) { gl = { vor: gl.vor, abschnitte: [{ id: null, titel: '', zeilen: gl.vor }] }; }
  }
  deckblattLesen(gl.vor, x);
  gl.abschnitte.forEach(function (a) { titelGeschlecht(a, x); });
  gl.abschnitte.forEach(function (a) { abschnittLesen(a, x); });
  nachbereiten(x);
  return x.erg;
}

// ---------- Übernehmen in die Daten des DS-Assistenten ----------
// auswahl: weggelassen -> alles mit sicher >= 0.7 (Vorschläge aus Freitext bleiben draußen),
//          Freitexte und Tabellen ganz; 'alles' | true -> alles, auch Vorschläge;
//          { bewertungen, chips, f, frei, tabellen: true | false | ['id', …] (chips: { gruppe: true | ['key'] }),
//            bewertungen auch { id: wert } (Wert selbst gewählt), geschlecht: true | false, minSicher: 0.7 }
// Bestehende Werte, die nicht übernommen werden, bleiben erhalten; Auswahlfelder, Tabellen,
// Beobachtungen und Freitexte werden ergänzt (nichts doppelt), einzelne Felder überschrieben.
const ZEILEN_FELD = { ziele_zusatz: 1, empfehlung_familie: 1, empfehlung_schule: 1, empfehlung_region: 1 };
function anwenden(dsData, erg, auswahl) {
  const d = (dsData && typeof dsData === 'object') ? JSON.parse(JSON.stringify(dsData)) : {};
  const aus = { v: 2, geschlecht: d.geschlecht === 'm' || d.geschlecht === 'w' ? d.geschlecht : '', bewertungen: {}, chips: {}, f: {}, frei: {}, tabellen: {}, bearbeitet: {} };
  if (d.v === 2 || !Object.keys(d).length) {
    ['bewertungen', 'chips', 'f', 'frei', 'bearbeitet'].forEach(function (k) { if (d[k] && typeof d[k] === 'object') { aus[k] = d[k]; } });
    if (d.alt) { aus.alt = d.alt; }
  } else { aus.alt = d; }
  const spalten = DS_TABELLEN_SPALTEN();
  Object.keys(spalten).forEach(function (t) { aus.tabellen[t] = (d.v === 2 && d.tabellen && Array.isArray(d.tabellen[t])) ? d.tabellen[t] : []; });
  if (!erg) { return aus; }
  const alles = auswahl === true || auswahl === 'alles';
  const a = (auswahl && typeof auswahl === 'object') ? auswahl : {};
  const min = typeof a.minSicher === 'number' ? a.minSicher : (alles ? 0 : 0.7);
  const erlaubt = function (teil, key, sicher) {
    const s = alles ? true : a[teil];
    if (s === false) { return false; }
    if (s === undefined || s === true) { return sicher == null || sicher >= min; }
    if (Array.isArray(s)) { return s.indexOf(key) >= 0; }
    if (typeof s === 'object') { return Object.prototype.hasOwnProperty.call(s, key) && s[key] !== false; }
    return false;
  };
  Object.keys(erg.bewertungen || {}).forEach(function (id) {
    const b = erg.bewertungen[id];
    if (!erlaubt('bewertungen', id, b.sicher)) { return; }
    const eigen = a.bewertungen && typeof a.bewertungen === 'object' && !Array.isArray(a.bewertungen) ? a.bewertungen[id] : null;
    const wert = typeof eigen === 'number' ? eigen : b.wert;
    if (wert >= 1 && wert <= 7) { aus.bewertungen[id] = wert; }
  });
  Object.keys(erg.chips || {}).forEach(function (g) {
    const s = alles ? true : (a.chips === undefined ? true : a.chips);
    if (s === false) { return; }
    let nur = null;
    if (s !== true) {
      if (Array.isArray(s)) { if (s.indexOf(g) < 0) { return; } }
      else if (typeof s === 'object') { if (!s[g]) { return; } if (Array.isArray(s[g])) { nur = s[g]; } }
    }
    (erg.chips[g] || []).forEach(function (c) {
      if (nur ? nur.indexOf(c.key) < 0 : (c.sicher != null && c.sicher < min)) { return; }
      const l = aus.chips[g] || (aus.chips[g] = []);
      if (l.indexOf(c.key) < 0) { l.push(c.key); }
    });
  });
  Object.keys(erg.f || {}).forEach(function (feld) {
    const e = erg.f[feld];
    if (!erlaubt('f', feld, e.sicher)) { return; }
    const v = e.wert;
    if (feld === 'beobachtungen' && Array.isArray(v)) {
      const l = Array.isArray(aus.f.beobachtungen) ? aus.f.beobachtungen : (aus.f.beobachtungen = []);
      const sig = function (b) { return [b.datum || '', b.setting || '', b.setting_andere || '', b.dauer || ''].join('|'); };
      v.forEach(function (b) { if (!l.some(function (o) { return sig(o) === sig(b) || (b.datum && o.datum === b.datum && !b.setting && !b.dauer); })) { l.push(Object.assign({}, b)); } });
    } else if (v && typeof v === 'object' && !Array.isArray(v)) { aus.f[feld] = Object.assign({}, aus.f[feld] || {}, v); }
    else { aus.f[feld] = v; }
  });
  Object.keys(erg.frei || {}).forEach(function (feld) {
    if (!erlaubt('frei', feld, null)) { return; }
    const neu = String(erg.frei[feld] || '').trim();
    if (!neu) { return; }
    const alt = String(aus.frei[feld] || '').trim();
    if (!alt) { aus.frei[feld] = neu; } else if (alt.indexOf(neu) < 0) { aus.frei[feld] = alt + (ZEILEN_FELD[feld] ? '\n' : '\n\n') + neu; }
  });
  Object.keys(erg.tabellen || {}).forEach(function (t) {
    if (!spalten[t] || !erlaubt('tabellen', t, null)) { return; }
    const sig = function (r) { return JSON.stringify(spalten[t].map(function (s) { return String(r[s] || '').trim(); })); };
    const da = aus.tabellen[t].map(sig);
    (erg.tabellen[t] || []).forEach(function (r) { const s = sig(r); if (da.indexOf(s) < 0) { const o = {}; spalten[t].forEach(function (k) { o[k] = r[k] || ''; }); aus.tabellen[t].push(o); da.push(s); } });
  });
  if (erg.geschlecht && !aus.geschlecht && (alles || a.geschlecht !== false)) { aus.geschlecht = erg.geschlecht; }
  return aus;
}

return {
  version: VERSION, lesen: lesen, anwenden: anwenden,
  // für Tests und Hilfsprogramme
  _intern: { saeubern: saeubern, skelett: skelett, kompiliere: kompiliere, gliedern: gliedern, saetze: saetze, sprachDaten: sprachDaten, freiVorschlaege: freiVorschlaege, vertreter: vertreter, tafeln: tafeln, datenImText: datenImText }
};
})();

// ==== 46c-ds-tests.js ====
// =====================================================================
// Testergebnisse im DS (z. B. WISC-V): aus dem CDSE Hub übernehmen, bearbeiten,
// im Bericht unter 4.2 „Ergebnisse der Testverfahren“ als Tabelle und kurzer Text
// ---------------------------------------------------------------------
// Das Team Diagnostique trägt Tests im CDSE Hub beim Kind ein; beim Öffnen aus dem
// Hub legt dieser sie beim Schüler in der Schülerliste ab (cdseTests, Ebene des
// Schülers – bleibt beim Speichern erhalten, ältere Fassungen übergehen das Feld).
// Der DS-Assistent zeigt sie im Schritt „ELDiB-Ergebnisse“ (Abschnitt 4.2);
// „Übernehmen“ kopiert sie nach dsData.tests – danach hier bearbeitbar. Nichts, was
// im DS schon steht, wird dabei überschrieben (eine Handbearbeitung von 4.2 bleibt
// und wird nur als „veraltet“ markiert).
// Datenmodell (dsData.tests[], gleiche Form wie im Hub):
//   { id, verfahren: 'wisc-v' | 'anderes', name, sprache: 'de' | 'fr' (Testfassung),
//     datum, leiter, ki: 90 | 95,
//     zeilen: [{ k, bez, sw, pr, kiVon, kiBis, band, einordnung }],   Werte als Text, wie eingetragen
//     untertests: [{ k, bez, ww }], text,
//     hub: { id, stand } }                                             Herkunft im Hub (Kennung, Stand)
// WISC-V: Primärindizes (k = VCI, VSI, FRI, WMI, PSI) und Gesamt-IQ (FSIQ) mit den
// Bezeichnungen der deutschen, französischen und englischen Fassung. Die Einordnung
// (band) folgt den Wertebereichen ≥130, 120–129, 110–119, 90–109, 80–89, 70–79, ≤69;
// sie kann auch frei formuliert sein (einordnung). Der Wortlaut der Einordnungen in
// DE und FR ist gegen das jeweilige Handbuch zu prüfen (EN nach dem Handbuch).
// Liegt auch in apps/ds-motor.js (Hub): DsText.bericht nutzt bloecke().
// =====================================================================
const DsTests = (function () {
  'use strict';
  const INDIZES = ['VCI', 'VSI', 'FRI', 'WMI', 'PSI', 'FSIQ'];
  const INDEX_NAME = {
    de: { VCI: 'Sprachverständnis (SV)', VSI: 'Visuell-räumliche Verarbeitung (VR)', FRI: 'Fluides Schlussfolgern (FS)', WMI: 'Arbeitsgedächtnis (AG)', PSI: 'Verarbeitungsgeschwindigkeit (VG)', FSIQ: 'Gesamt-IQ (GIQ)' },
    fr: { VCI: 'Compréhension verbale (ICV)', VSI: 'Visuospatial (IVS)', FRI: 'Raisonnement fluide (IRF)', WMI: 'Mémoire de travail (IMT)', PSI: 'Vitesse de traitement (IVT)', FSIQ: 'QI total (QIT)' },
    en: { VCI: 'Verbal Comprehension (VCI)', VSI: 'Visual Spatial (VSI)', FRI: 'Fluid Reasoning (FRI)', WMI: 'Working Memory (WMI)', PSI: 'Processing Speed (PSI)', FSIQ: 'Full Scale IQ (FSIQ)' }
  };
  const UNTERTESTS = ['SI', 'VC', 'BD', 'VP', 'MR', 'FW', 'DS', 'PS', 'CD', 'SS'];
  const UNTERTEST_NAME = {
    de: { SI: 'Gemeinsamkeiten finden', VC: 'Wortschatz-Test', BD: 'Mosaik-Test', VP: 'Visuelle Puzzles', MR: 'Matrizen-Test', FW: 'Formenwaage', DS: 'Zahlen nachsprechen', PS: 'Bildspanne', CD: 'Zahlen-Symbol-Test', SS: 'Symbol-Suche' },
    fr: { SI: 'Similitudes', VC: 'Vocabulaire', BD: 'Cubes', VP: 'Puzzles visuels', MR: 'Matrices', FW: 'Balances', DS: 'Mémoire des chiffres', PS: 'Mémoire des images', CD: 'Code', SS: 'Recherche de symboles' },
    en: { SI: 'Similarities', VC: 'Vocabulary', BD: 'Block Design', VP: 'Visual Puzzles', MR: 'Matrix Reasoning', FW: 'Figure Weights', DS: 'Digit Span', PS: 'Picture Span', CD: 'Coding', SS: 'Symbol Search' }
  };
  // [Schlüssel, von, bis, Bereich als Text]
  const BAENDER = [['sehr_hoch', 130, 999, '≥ 130'], ['hoch', 120, 129, '120–129'], ['oberer', 110, 119, '110–119'], ['mittel', 90, 109, '90–109'],
    ['unterer', 80, 89, '80–89'], ['niedrig', 70, 79, '70–79'], ['sehr_niedrig', -999, 69, '≤ 69']];
  const BAND_NAME = {
    de: { sehr_hoch: 'weit überdurchschnittlich', hoch: 'überdurchschnittlich', oberer: 'oberer Durchschnittsbereich', mittel: 'durchschnittlich', unterer: 'unterer Durchschnittsbereich', niedrig: 'unterdurchschnittlich', sehr_niedrig: 'weit unterdurchschnittlich' },
    fr: { sehr_hoch: 'très supérieur', hoch: 'supérieur', oberer: 'moyen supérieur', mittel: 'moyen', unterer: 'moyen inférieur', niedrig: 'faible', sehr_niedrig: 'très faible' },
    en: { sehr_hoch: 'Extremely High', hoch: 'Very High', oberer: 'High Average', mittel: 'Average', unterer: 'Low Average', niedrig: 'Very Low', sehr_niedrig: 'Extremely Low' }
  };
  const UI = {
    de: { titel: 'Testergebnisse (z. B. WISC-V)', erklaerung: 'Stehen unter 4.2 „Ergebnisse der Testverfahren“ – als Tabelle mit kurzem Text, nach den ELDiB-Ergebnissen.',
      hub: 'Aus dem CDSE Hub (Team Diagnostique): {n} Test(s). Mit „Übernehmen“ kommen Tabelle und Text in den Bericht; danach lassen sie sich hier bearbeiten.',
      uebernehmen: 'In den Bericht übernehmen', alle: 'Alle übernehmen', uebernommen: 'im Bericht', neuer: 'Im Hub geändert ({datum}) – im Bericht steht ein älterer Stand.', neuUebernehmen: 'Neu übernehmen',
      entfernen: 'Aus dem Bericht entfernen', hinzu: '+ Test von Hand eintragen', keine: 'Noch keine Testergebnisse. Das Team Diagnostique trägt Tests im CDSE Hub beim Kind ein – sie erscheinen dann hier zum Übernehmen.',
      name: 'Verfahren', datum: 'Datum', leiter: 'Testleitung', ki: 'Konfidenzintervall', text: 'Kurze Interpretation (Text unter der Tabelle)',
      index: 'Index', bez: 'Bezeichnung', sw: 'Standardwert', wert: 'Wert', pr: 'Prozentrang', kiVon: 'KI von', kiBis: 'KI bis', kiSpalte: 'Konfidenzintervall ({ki} %)', ein: 'Einordnung',
      untertests: 'Untertests (Wertpunkte)', untertest: 'Untertest', ww: 'Wertpunkte', zeileHinzu: '+ Zeile', zeileWeg: 'Zeile entfernen', frei: 'frei',
      intro: 'Durchführung am {datum}{leiter: durch {leiter}}.', introOhneDatum: '{leiter:Testleitung: {leiter}.}', zeigt: 'Die Tabelle zeigt {liste}.',
      spalten: { sw: 'die Standardwerte (Mittelwert 100, Standardabweichung 15)', pr: 'die Prozentränge', ki: 'das Konfidenzintervall ({ki} %)', ein: 'die Einordnung' } },
    fr: { titel: 'Résultats aux tests (p. ex. WISC-V)', erklaerung: 'Figurent sous 4.2 « Résultats des tests » – tableau et court texte, après les résultats ELDiB.',
      hub: 'Depuis le CDSE Hub (équipe Diagnostique) : {n} test(s). « Reprendre » insère le tableau et le texte dans le rapport ; ils restent modifiables ici.',
      uebernehmen: 'Reprendre dans le rapport', alle: 'Tout reprendre', uebernommen: 'dans le rapport', neuer: 'Modifié dans le Hub ({datum}) – le rapport contient une version antérieure.', neuUebernehmen: 'Reprendre à nouveau',
      entfernen: 'Retirer du rapport', hinzu: '+ Saisir un test à la main', keine: 'Pas encore de résultats aux tests. L’équipe Diagnostique les saisit dans le CDSE Hub ; ils apparaissent ensuite ici.',
      name: 'Procédure', datum: 'Date', leiter: 'Passation', ki: 'Intervalle de confiance', text: 'Courte interprétation (texte sous le tableau)',
      index: 'Indice', bez: 'Désignation', sw: 'Note standard', wert: 'Score', pr: 'Rang percentile', kiVon: 'IC de', kiBis: 'IC à', kiSpalte: 'Intervalle de confiance ({ki} %)', ein: 'Classification',
      untertests: 'Subtests (notes standard)', untertest: 'Subtest', ww: 'Note standard', zeileHinzu: '+ Ligne', zeileWeg: 'Supprimer la ligne', frei: 'libre',
      intro: 'Passation le {datum}{leiter: par {leiter}}.', introOhneDatum: '{leiter:Passation : {leiter}.}', zeigt: 'Le tableau présente {liste}.',
      spalten: { sw: 'les notes standard (moyenne 100, écart-type 15)', pr: 'les rangs percentiles', ki: 'l’intervalle de confiance ({ki} %)', ein: 'la classification' } },
    en: { titel: 'Test results (e.g. WISC-V)', erklaerung: 'Appear under 4.2 “Test results” – a table with a short text, after the ELDiB results.',
      hub: 'From the CDSE Hub (Diagnostique team): {n} test(s). “Add” puts the table and text into the report; they can then be edited here.',
      uebernehmen: 'Add to the report', alle: 'Add all', uebernommen: 'in the report', neuer: 'Changed in the Hub ({datum}) – the report holds an older version.', neuUebernehmen: 'Add again',
      entfernen: 'Remove from the report', hinzu: '+ Enter a test by hand', keine: 'No test results yet. The Diagnostique team enters tests in the CDSE Hub; they then appear here.',
      name: 'Procedure', datum: 'Date', leiter: 'Examiner', ki: 'Confidence interval', text: 'Short interpretation (text below the table)',
      index: 'Index', bez: 'Scale', sw: 'Standard score', wert: 'Score', pr: 'Percentile rank', kiVon: 'CI from', kiBis: 'CI to', kiSpalte: 'Confidence interval ({ki}%)', ein: 'Qualitative descriptor',
      untertests: 'Subtests (scaled scores)', untertest: 'Subtest', ww: 'Scaled score', zeileHinzu: '+ Row', zeileWeg: 'Remove row', frei: 'free',
      intro: 'Administered on {datum}{leiter: by {leiter}}.', introOhneDatum: '{leiter:Examiner: {leiter}.}', zeigt: 'The table shows {liste}.',
      spalten: { sw: 'the standard scores (mean 100, standard deviation 15)', pr: 'the percentile ranks', ki: 'the {ki}% confidence interval', ein: 'the qualitative descriptors' } }
  };

  function U(lang) { return UI[lang] || UI.de; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  // Platzhalter: {wert} und bedingt {feld: Text mit {feld}} (nur, wenn das Feld gefüllt ist) – verschachtelt wie in DsText
  function fmt(s, v) {
    s = String(s == null ? '' : s);
    let out = '', i = 0;
    while (i < s.length) {
      const ch = s.charAt(i);
      if (ch !== '{') { out += ch; i++; continue; }
      let tiefe = 1, j = i + 1;
      while (j < s.length && tiefe > 0) { if (s.charAt(j) === '{') { tiefe++; } else if (s.charAt(j) === '}') { tiefe--; } j++; }
      const innen = s.slice(i + 1, j - 1), m = /^(\w+):([\s\S]*)$/.exec(innen);
      if (m) { out += v[m[1]] ? fmt(m[2], v) : ''; } else { out += v[innen] != null ? v[innen] : '{' + innen + '}'; }
      i = j;
    }
    return out;
  }
  function text(v) { return v == null ? '' : String(v).trim(); }
  function zahl(v) { const s = text(v).replace(',', '.'); return /^-?\d+(\.\d+)?$/.test(s) ? +s : null; }
  function neueId() { return 'te' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function datumOk(t) { return /^\d{4}-\d{2}-\d{2}$/.test(text(t)) ? text(t) : ''; }
  function datumText(iso, lang) {
    if (!iso) { return ''; }
    if (typeof DsText !== 'undefined' && DsText.datum) { return DsText.datum(iso, lang); }
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
    return m ? m[3] + '.' + m[2] + '.' + m[1] : iso;
  }
  // Zahl im Text der Sprache: 0.5 -> „0,5“ (de, fr), 92 -> „92“
  function zahlText(v, lang) { const s = text(v); return lang === 'en' ? s.replace(',', '.') : s.replace('.', ','); }

  // ---------- Einordnung ----------
  function bandVon(sw) {
    const n = zahl(sw);
    if (n == null || n < 40 || n > 160) { return ''; }
    for (let i = 0; i < BAENDER.length; i++) { if (n >= BAENDER[i][1] && n <= BAENDER[i][2]) { return BAENDER[i][0]; } }
    return '';
  }
  function bandText(k, lang) { return (BAND_NAME[lang] || BAND_NAME.de)[k] || ''; }
  function bandBereich(k) { for (let i = 0; i < BAENDER.length; i++) { if (BAENDER[i][0] === k) { return BAENDER[i][3]; } } return ''; }
  // Ein getippter Text, der genau einer Einordnung entspricht (in irgendeiner Sprache) -> Schlüssel
  function bandAusText(t) {
    const s = text(t).toLowerCase();
    if (!s) { return ''; }
    for (const lang of Object.keys(BAND_NAME)) { for (const k of Object.keys(BAND_NAME[lang])) { if (BAND_NAME[lang][k].toLowerCase() === s) { return k; } } }
    return '';
  }
  function indexName(k, lang) { return (INDEX_NAME[lang] || INDEX_NAME.de)[k] || k; }
  function untertestName(k, lang) { return (UNTERTEST_NAME[lang] || UNTERTEST_NAME.de)[k] || k; }
  // Sprache der Beschriftungen: im Bericht die Berichtssprache, sonst die Testfassung
  function zeileName(t, z, lang) { return z.k ? indexName(z.k, lang) : z.bez; }
  function unterName(u, lang) { return u.k ? untertestName(u.k, lang) : u.bez; }
  function einordnungText(z, lang) { return z.band ? bandText(z.band, lang) : z.einordnung; }

  // ---------- Normalisieren ----------
  function normZeile(z) {
    z = z && typeof z === 'object' ? z : {};
    return { k: INDIZES.indexOf(z.k) >= 0 ? z.k : '', bez: text(z.bez), sw: text(z.sw), pr: text(z.pr), kiVon: text(z.kiVon), kiBis: text(z.kiBis),
      band: BAENDER.some(function (b) { return b[0] === z.band; }) ? z.band : '', einordnung: text(z.einordnung) };
  }
  function normUnter(u) { u = u && typeof u === 'object' ? u : {}; return { k: UNTERTESTS.indexOf(u.k) >= 0 ? u.k : '', bez: text(u.bez), ww: text(u.ww) }; }
  function zeileLeer(z) { return !z.sw && !z.pr && !z.kiVon && !z.kiBis && !z.band && !z.einordnung; }
  function norm(t) {
    t = t && typeof t === 'object' ? t : {};
    const art = t.verfahren === 'anderes' ? 'anderes' : 'wisc-v';
    let zeilen = (Array.isArray(t.zeilen) ? t.zeilen : []).map(normZeile);
    if (art === 'wisc-v') {
      // immer die sechs Indizes in fester Reihenfolge
      zeilen = INDIZES.map(function (k) { return zeilen.filter(function (z) { return z.k === k; })[0] || normZeile({ k: k }); });
    } else {
      zeilen = zeilen.filter(function (z) { return z.bez || !zeileLeer(z); }).map(function (z) { z.k = ''; return z; });
    }
    let unter = (Array.isArray(t.untertests) ? t.untertests : []).map(normUnter).filter(function (u) { return u.k || u.bez || u.ww; });
    if (art === 'wisc-v') {
      unter = UNTERTESTS.map(function (k) { return unter.filter(function (u) { return u.k === k; })[0] || normUnter({ k: k }); })
        .concat(unter.filter(function (u) { return !u.k; }));
    }
    const n = { id: text(t.id) || neueId(), verfahren: art, name: text(t.name) || (art === 'wisc-v' ? 'WISC-V' : ''), sprache: t.sprache === 'fr' ? 'fr' : 'de',
      datum: datumOk(t.datum), leiter: text(t.leiter), ki: zahl(t.ki) === 90 ? 90 : 95, zeilen: zeilen, untertests: unter, text: text(t.text) };
    if (t.hub && typeof t.hub === 'object' && t.hub.id) { n.hub = { id: text(t.hub.id), stand: text(t.hub.stand) }; }
    return n;
  }
  function normListe(l) { return (Array.isArray(l) ? l : []).filter(function (t) { return t && typeof t === 'object'; }).map(norm); }
  function hatWerte(t) { return t.zeilen.some(function (z) { return !zeileLeer(z); }) || t.untertests.some(function (u) { return u.ww; }) || !!t.text; }
  function neu(art, lang) { return norm({ verfahren: art, sprache: lang === 'fr' ? 'fr' : 'de', zeilen: art === 'anderes' ? [{}, {}, {}, {}] : [] }); }
  // Ein Test aus dem Hub (Form des Hubs: id, geaendert …) -> Test im DS mit Herkunft
  function ausHub(h) {
    const t = norm(h);
    t.hub = { id: text(h && h.id) || t.id, stand: text(h && (h.geaendert || h.erstellt)) };
    return t;
  }
  function sortiert(l) { return l.slice().sort(function (a, b) { return (b.datum || '').localeCompare(a.datum || ''); }); }

  // ---------- Tests des Hubs (Schülerliste des Generators) ----------
  function hubTests() {
    try {
      if (typeof smAktuellerSchueler === 'undefined' || !smAktuellerSchueler || typeof smGetListe !== 'function') { return []; }
      const s = smGetListe().filter(function (x) { return x && x.id === smAktuellerSchueler.id; })[0];
      // normalisiert, dazu der Stand im Hub (erstellt/geaendert) für „im Hub geändert“
      return s && Array.isArray(s.cdseTests) ? s.cdseTests.filter(function (t) { return t && typeof t === 'object' && t.id; })
        .map(function (t) { return Object.assign(norm(t), { erstellt: text(t.erstellt), geaendert: text(t.geaendert) }); }) : [];
    } catch (e) { return []; }
  }
  function imBericht(daten, hubId) { return (daten.tests || []).filter(function (t) { return t.hub && t.hub.id === hubId; })[0] || null; }
  // Übernehmen: ersetzt den Eintrag derselben Herkunft, sonst dazu; ergänzt das Verfahren in 4 (nur dazu, nie weg)
  function uebernehmen(daten, hubTest) {
    const t = ausHub(hubTest);
    daten.tests = Array.isArray(daten.tests) ? daten.tests : [];
    const i = daten.tests.findIndex(function (x) { return x.hub && x.hub.id === t.hub.id; });
    if (i >= 0) { daten.tests[i] = t; } else { daten.tests.push(t); }
    daten.chips = daten.chips || {}; daten.frei = daten.frei || {};
    if (t.verfahren === 'wisc-v') {
      const v = daten.chips.verfahren || (daten.chips.verfahren = []);
      if (v.indexOf('wisc') < 0) { v.push('wisc'); }
    } else if (t.name && !text(daten.frei.verfahren_andere)) { daten.frei.verfahren_andere = t.name; }
    return t;
  }

  // ---------- Bericht: Blöcke für 4.2 ----------
  function tabelle(t, lang) {
    const u = U(lang), zeilen = t.zeilen.filter(function (z) { return !zeileLeer(z) || (z.bez && t.verfahren === 'anderes'); });
    if (!zeilen.length) { return null; }
    const mitPr = zeilen.some(function (z) { return z.pr; }), mitKi = zeilen.some(function (z) { return z.kiVon || z.kiBis; }), mitEin = zeilen.some(function (z) { return einordnungText(z, lang); });
    const kopf = [t.verfahren === 'wisc-v' ? u.index : u.bez, t.verfahren === 'wisc-v' ? u.sw : u.wert], breiten = [3, 1.2];
    if (mitPr) { kopf.push(u.pr); breiten.push(1.2); }
    if (mitKi) { kopf.push(fmt(u.kiSpalte, { ki: t.ki })); breiten.push(1.8); }
    if (mitEin) { kopf.push(u.ein); breiten.push(2.6); }
    const rows = zeilen.map(function (z) {
      const r = [zeileName(t, z, lang), zahlText(z.sw, lang)];
      if (mitPr) { r.push(zahlText(z.pr, lang)); }
      if (mitKi) { r.push(z.kiVon || z.kiBis ? zahlText(z.kiVon, lang) + '–' + zahlText(z.kiBis, lang) : ''); }
      if (mitEin) { r.push(einordnungText(z, lang)); }
      return r;
    });
    return { typ: 'tabelle', id: 'test-' + t.id, kopf: kopf, zeilen: rows, breiten: breiten, spalten: { pr: mitPr, ki: mitKi, ein: mitEin } };
  }
  function untertestTabelle(t, lang) {
    const u = U(lang), l = t.untertests.filter(function (x) { return x.ww; });
    if (!l.length) { return null; }
    return { typ: 'tabelle', id: 'test-' + t.id + '-u', kopf: [u.untertest, u.ww], zeilen: l.map(function (x) { return [unterName(x, lang), zahlText(x.ww, lang)]; }), breiten: [3, 1] };
  }
  function liste(teile, lang) {
    if (typeof DsText !== 'undefined' && DsText.liste) { return DsText.liste(teile, { T: (typeof DS_TEXTE !== 'undefined' && DS_TEXTE[lang]) || { s: {} } }, false, true); }
    return teile.join(', ');
  }
  function bloecke(lang, ds) {
    const l = sortiert(normListe(ds && ds.tests)).filter(hatWerte), u = U(lang), out = [];
    l.forEach(function (t) {
      out.push({ typ: 'zwischen', text: t.name + (t.datum ? ' – ' + datumText(t.datum, lang) : '') });
      const saetze = [];
      const intro = t.datum ? fmt(u.intro, { datum: datumText(t.datum, lang), leiter: t.leiter }) : fmt(u.introOhneDatum, { leiter: t.leiter });
      if (intro) { saetze.push(intro); }
      const tab = tabelle(t, lang);
      if (tab && t.verfahren === 'wisc-v') {
        const sp = [u.spalten.sw];
        if (tab.spalten.pr) { sp.push(u.spalten.pr); }
        if (tab.spalten.ki) { sp.push(fmt(u.spalten.ki, { ki: t.ki })); }
        if (tab.spalten.ein) { sp.push(u.spalten.ein); }
        saetze.push(fmt(u.zeigt, { liste: liste(sp, lang) }));
      }
      if (saetze.length) { out.push({ typ: 'absatz', text: saetze.join(' ') }); }
      if (tab) { delete tab.spalten; out.push(tab); }
      const ut = untertestTabelle(t, lang);
      if (ut) { out.push(ut); }
      text(t.text).split(/\n\s*\n/).forEach(function (a) { const s = a.replace(/\s*\n\s*/g, ' ').trim(); if (s) { out.push({ typ: 'absatz', text: s }); } });
    });
    return out;
  }

  // ---------- Oberfläche im DS-Assistenten (Schritt „ELDiB-Ergebnisse“) ----------
  function vorschauTabelleHtml(t, lang) {
    const tab = tabelle(t, lang);
    if (!tab) { return ''; }
    return '<table class="dsb-tab"><thead><tr>' + tab.kopf.map(function (k) { return '<th>' + esc(k) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      tab.zeilen.map(function (z) { return '<tr>' + z.map(function (x) { return '<td>' + esc(x) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
  }
  function hubKopf(t, lang) { return '<b>' + esc(t.name) + (t.datum ? ' – ' + esc(datumText(t.datum, lang)) : '') + '</b>' + (t.leiter ? ' <span class="dsa-leise">' + esc(U(lang).leiter + ': ' + t.leiter) + '</span>' : ''); }
  function feld(label, inner, klasse) { return '<label class="dsa-feld' + (klasse ? ' ' + klasse : '') + '"><span>' + esc(label) + '</span>' + inner + '</label>'; }
  function eingabeFeld(i, f, wert, typ, extra) { return '<input class="dsa-eingabe" type="' + (typ || 'text') + '" data-ti="' + i + '" data-tf="' + f + '" value="' + esc(wert) + '"' + (extra || '') + '>'; }
  function zelle(i, j, f, z, lang, extra) {
    return '<td><input class="dsa-eingabe" type="text" data-ti="' + i + '" data-tz="' + j + '" data-tf="' + f + '" value="' + esc(z[f]) + '"' + (extra || '') + '></td>';
  }
  function testHtml(t, i, lang, hub) {
    const u = U(lang), wisc = t.verfahren === 'wisc-v', sp = wisc ? t.sprache : lang;
    const h = hub ? hub.filter(function (x) { return t.hub && x.id === t.hub.id; })[0] : null;
    const neuer = h && text(h.geaendert || h.erstellt) && t.hub.stand && text(h.geaendert || h.erstellt) > t.hub.stand;
    let s = '<div class="dsa-test" data-i="' + i + '"><div class="dsa-reihe">' +
      feld(u.name, eingabeFeld(i, 'name', t.name)) + feld(u.datum, eingabeFeld(i, 'datum', t.datum, 'date'), 'schmal') + feld(u.leiter, eingabeFeld(i, 'leiter', t.leiter)) +
      (wisc ? feld(u.ki, '<select class="dsa-eingabe" data-ti="' + i + '" data-tf="ki"><option value="95"' + (t.ki === 95 ? ' selected' : '') + '>95 %</option><option value="90"' + (t.ki === 90 ? ' selected' : '') + '>90 %</option></select>', 'schmal') : '') + '</div>';
    if (neuer) { s += '<p class="dsa-warnung">' + esc(fmt(u.neuer, { datum: datumText(text(h.geaendert || h.erstellt).slice(0, 10), lang) })) + ' <button type="button" class="dsa-link" data-aktion="testUebernehmen" data-hid="' + esc(h.id) + '">' + esc(u.neuUebernehmen) + '</button></p>'; }
    s += '<div class="dsa-tabwrap"><table class="dsa-tabelle dsa-testtab"><thead><tr><th>' + esc(wisc ? u.index : u.bez) + '</th><th>' + esc(wisc ? u.sw : u.wert) + '</th><th>' + esc(u.pr) + '</th><th>' + esc(u.kiVon) + '</th><th>' + esc(u.kiBis) + '</th><th>' + esc(u.ein) + '</th>' + (wisc ? '' : '<th></th>') + '</tr></thead><tbody>' +
      t.zeilen.map(function (z, j) {
        const vorschlag = bandVon(z.sw), ein = einordnungText(z, sp);
        return '<tr>' + (wisc ? '<th scope="row">' + esc(indexName(z.k, sp)) + '</th>' : zelle(i, j, 'bez', z, lang)) +
          zelle(i, j, 'sw', z, lang, ' inputmode="decimal"') + zelle(i, j, 'pr', z, lang, ' inputmode="decimal"') + zelle(i, j, 'kiVon', z, lang, ' inputmode="numeric"') + zelle(i, j, 'kiBis', z, lang, ' inputmode="numeric"') +
          '<td><input class="dsa-eingabe" type="text" list="dsa-baender-' + sp + '" data-ti="' + i + '" data-tz="' + j + '" data-tf="einordnung" value="' + esc(ein) + '"' + (vorschlag && !ein ? ' placeholder="' + esc(bandText(vorschlag, sp)) + '"' : '') + '></td>' +
          (wisc ? '' : '<td><button type="button" class="dsa-weg" data-aktion="testZeileWeg" data-i="' + i + '" data-j="' + j + '" title="' + esc(u.zeileWeg) + '" aria-label="' + esc(u.zeileWeg) + '">×</button></td>') + '</tr>';
      }).join('') + '</tbody></table></div>' +
      (wisc ? '' : '<button type="button" class="dsa-link" data-aktion="testZeileHinzu" data-i="' + i + '">' + esc(u.zeileHinzu) + '</button>');
    if (wisc) {
      s += '<details class="dsa-untertests"' + (t.untertests.some(function (x) { return x.ww; }) ? ' open' : '') + '><summary>' + esc(u.untertests) + '</summary><div class="dsa-unterliste">' +
        t.untertests.map(function (x, j) {
          return '<div class="dsa-unterzeile"><input class="dsa-eingabe" type="text" data-ti="' + i + '" data-tu="' + j + '" data-tf="bez" value="' + esc(unterName(x, sp)) + '"><input class="dsa-eingabe" type="number" min="1" max="19" data-ti="' + i + '" data-tu="' + j + '" data-tf="ww" value="' + esc(x.ww) + '" aria-label="' + esc(u.ww) + '"></div>';
        }).join('') + '</div></details>';
    }
    s += '<label class="dsa-feld voll"><span>' + esc(u.text) + '</span><textarea class="dsa-eingabe" rows="3" data-ti="' + i + '" data-tf="text">' + esc(t.text) + '</textarea></label>' +
      '<div class="dsa-testfuss">' + (t.hub ? '<span class="dsa-leise">' + esc(u.uebernommen) + '</span>' : '<span></span>') + '<button type="button" class="dsa-link" data-aktion="testWeg" data-i="' + i + '">' + esc(u.entfernen) + '</button></div></div>';
    return s;
  }
  function datalists() {
    return Object.keys(BAND_NAME).map(function (lang) { return '<datalist id="dsa-baender-' + lang + '">' + Object.keys(BAND_NAME[lang]).map(function (k) { return '<option value="' + esc(BAND_NAME[lang][k]) + '"></option>'; }).join('') + '</datalist>'; }).join('');
  }
  function html(daten, hub, lang) {
    const u = U(lang), tests = normListe(daten.tests), offen = hub.filter(function (h) { return !imBericht(daten, h.id); });
    let s = '<div class="dsa-karte dsa-tests"><div class="dsa-chiptitel">' + esc(u.titel) + '</div><p class="dsa-hinweis">' + esc(u.erklaerung) + '</p>';
    if (offen.length) {
      s += '<div class="dsa-hinweisbox dsa-testhub"><p>' + esc(fmt(u.hub, { n: offen.length })) + '</p>' +
        sortiert(offen).map(function (h) {
          return '<div class="dsa-testvorschau">' + hubKopf(h, lang) + vorschauTabelleHtml(h, lang) + (h.text ? '<p class="dsa-leise">' + esc(h.text) + '</p>' : '') +
            '<button type="button" class="dsa-knopf primaer" data-aktion="testUebernehmen" data-hid="' + esc(h.id) + '">' + esc(u.uebernehmen) + '</button></div>';
        }).join('') + (offen.length > 1 ? '<button type="button" class="dsa-knopf" data-aktion="testsAlle">' + esc(u.alle) + '</button>' : '') + '</div>';
    }
    if (tests.length) { s += tests.map(function (t, i) { return testHtml(t, i, lang, hub); }).join(''); }
    else if (!offen.length) { s += '<p class="dsa-leise">' + esc(u.keine) + '</p>'; }
    s += '<button type="button" class="dsa-link" data-aktion="testHinzu">' + esc(u.hinzu) + '</button>' + datalists() + '</div>';
    return s;
  }
  // Eingabe in einem Feld der Karte -> Daten; liefert true, wenn die Karte neu gezeichnet werden muss
  function eingabe(daten, el) {
    const i = +el.dataset.ti, t = (daten.tests || [])[i];
    if (!t) { return false; }
    const f = el.dataset.tf, v = el.value;
    if (el.dataset.tz != null) {
      const z = t.zeilen[+el.dataset.tz];
      if (!z) { return false; }
      if (f === 'einordnung') {
        const k = bandAusText(v);
        if (k) { z.band = k; z.einordnung = ''; } else if (text(v)) { z.band = ''; z.einordnung = v; } else { z.band = bandVon(z.sw); z.einordnung = ''; }
      } else {
        z[f] = v;
        if (f === 'sw' && !z.einordnung) { z.band = bandVon(z.sw); }
      }
      return false;
    }
    if (el.dataset.tu != null) { const x = t.untertests[+el.dataset.tu]; if (x) { if (f === 'bez') { x.bez = v; if (x.k && untertestName(x.k, t.sprache) !== text(v) && untertestName(x.k, 'de') !== text(v) && untertestName(x.k, 'fr') !== text(v) && untertestName(x.k, 'en') !== text(v)) { x.k = ''; } } else { x[f] = v; } } return false; }
    if (f === 'ki') { t.ki = +v === 90 ? 90 : 95; return false; }
    if (f === 'datum') { t.datum = datumOk(v); return false; }
    t[f] = v;
    return false;
  }
  // Klick auf einen Knopf der Karte; liefert true, wenn etwas geändert wurde (dann neu zeichnen)
  function aktion(daten, a, el) {
    daten.tests = Array.isArray(daten.tests) ? daten.tests : [];
    if (a === 'testUebernehmen') { const h = hubTests().filter(function (x) { return x.id === el.dataset.hid; })[0]; if (!h) { return false; } uebernehmen(daten, h); return true; }
    if (a === 'testsAlle') { hubTests().forEach(function (h) { if (!imBericht(daten, h.id)) { uebernehmen(daten, h); } }); return true; }
    if (a === 'testWeg') { daten.tests.splice(+el.dataset.i, 1); return true; }
    if (a === 'testHinzu') { daten.tests.push(neu('wisc-v', (typeof state !== 'undefined' && state.language) || 'de')); return true; }
    if (a === 'testZeileHinzu') { const t = daten.tests[+el.dataset.i]; if (t) { t.zeilen.push(normZeile({})); return true; } return false; }
    if (a === 'testZeileWeg') { const t = daten.tests[+el.dataset.i]; if (t) { t.zeilen.splice(+el.dataset.j, 1); return true; } return false; }
    return false;
  }

  return { INDIZES: INDIZES, UNTERTESTS: UNTERTESTS, BAENDER: BAENDER, indexName: indexName, untertestName: untertestName, bandVon: bandVon, bandText: bandText, bandBereich: bandBereich,
    norm: norm, normListe: normListe, neu: neu, ausHub: ausHub, hubTests: hubTests, uebernehmen: uebernehmen, bloecke: bloecke, tabelle: tabelle,
    html: html, eingabe: eingabe, aktion: aktion, UI: UI };
})();

// ==== Gliederung, Überschriften, Tabellen, Beschriftungen des DS (aus 47-ds-assistent.js) ====
var DS_BERICHT_TAFELN = {"gliederung":[{"id":"auftrag","nr":"1","e":1},{"id":"anamnese","nr":"2","e":1,"nurTitel":true},{"id":"vorgeschichte","nr":"2.1","e":2},{"id":"sozialbericht","nr":"2.2","e":2},{"id":"aktuell","nr":"3","e":1},{"id":"massnahmen","nr":"3.1","e":2},{"id":"schule","nr":"3.2","e":2},{"id":"kind","nr":"3.3","e":2},{"id":"eltern","nr":"3.4","e":2},{"id":"verfahren","nr":"4","e":1},{"id":"beobachtung","nr":"4.1","e":2},{"id":"eldib","nr":"4.2","e":2},{"id":"deutung","nr":"4.3","e":2},{"id":"schluss","nr":"5","e":1},{"id":"beduerfnisse","nr":"5.1","e":2},{"id":"ziele","nr":"5.2","e":2},{"id":"empfehlungen","nr":"5.3","e":2},{"id":"cni","nr":"5.4","e":2},{"id":"anhang","nr":"6","e":1,"nurTitel":true},{"id":"interventionen","nr":"6.1","e":2},{"id":"raster","nr":"6.2","e":2},{"id":"produktionen","nr":"6.3","e":2,"nurTitel":true}],"titel":{"de":{"auftrag":"Auftragsklärung","anamnese":"Anamnese","vorgeschichte":"Vorgeschichte","sozialbericht":"Sozialbericht","aktuell":"Aktuelle Situation","massnahmen":"Aktuelle schulische und außerschulische Unterstützungsmaßnahmen","schule":"Sichtweise der Schule","kind":["Sichtweise des Schülers","Sichtweise der Schülerin","Sichtweise des Schülers/der Schülerin"],"eltern":"Sichtweise der Eltern / Erziehungsberechtigten","verfahren":"Diagnostische Verfahren","beobachtung":"Verhaltensbeobachtungen","eldib":"Ergebnisse der Testverfahren","deutung":"Interpretation","schluss":"Schlussfolgerung","beduerfnisse":["Spezifische Bedürfnisse des Schülers","Spezifische Bedürfnisse der Schülerin","Spezifische Bedürfnisse des Schülers/der Schülerin"],"ziele":"Ziele","empfehlungen":"Empfehlungen","cni":"Empfehlungen – CNI","anhang":"Anhänge","interventionen":"Übersicht der Interventionen des CDSE","raster":"Testergebnisse","produktionen":["Produktionen des Schülers","Produktionen der Schülerin","Produktionen des Schülers/der Schülerin"]},"fr":{"auftrag":"Demande","anamnese":"Anamnèse","vorgeschichte":"Antécédents","sozialbericht":"Bilan social","aktuell":"Situation actuelle","massnahmen":"Mesures de soutien scolaires et extrascolaires actuelles","schule":"Point de vue de l’école","kind":"Point de vue de l’élève","eltern":"Point de vue des parents / tuteurs","verfahren":"Procédure diagnostique","beobachtung":"Observations comportementales","eldib":"Résultats des tests","deutung":"Interprétations","schluss":"Conclusion","beduerfnisse":"Besoins spécifiques de l’élève","ziele":"Objectifs","empfehlungen":"Recommandations","cni":"Recommandations – CNI","anhang":"Annexes","interventionen":"Aperçu des interventions du CDSE","raster":"Résultats détaillés aux tests","produktionen":"Productions de l’élève"},"en":{"auftrag":"Referral","anamnese":"Case history","vorgeschichte":"Background","sozialbericht":"Social report","aktuell":"Current situation","massnahmen":"Current school and out-of-school support measures","schule":"The school’s perspective","kind":"The student’s perspective","eltern":"The parents’/guardians’ perspective","verfahren":"Diagnostic procedures","beobachtung":"Behavioral observations","eldib":"Test results","deutung":"Interpretation","schluss":"Conclusion","beduerfnisse":"The student’s specific needs","ziele":"Goals","empfehlungen":"Recommendations","cni":"Recommendations – CNI","anhang":"Appendices","interventionen":"Overview of CDSE interventions","raster":"Detailed test results","produktionen":"The student’s work samples"}},"tabellen":{"vorgeschichte":["zeitraum","klasse","massnahme","akteur"],"aktuell":["zeitraum","klasse","massnahme","akteur"],"interventionen":["datum","art"]},"skalaThema":{"deutung.aengste":"deutlich","deutung.abwehr":"deutlich","deutung.hypothesen":"wahrscheinlich","beduerfnisse.beduerfnisse":"wichtig"},"schritte":[{"id":"stamm","abschnitte":[],"felder":[{"typ":"stamm"},{"typ":"geschlecht"},{"typ":"reihe","felder":[{"typ":"kurz","f":"verfasser_name"},{"typ":"kurz","f":"verfasser_funktion"},{"typ":"datum","f":"bericht_datum"}]}]},{"id":"auftrag","abschnitte":["auftrag"],"felder":[{"typ":"reihe","felder":[{"typ":"datum","f":"auftrag_datum"},{"typ":"wahl","f":"auftraggeber","opt":"auftraggeber","andere":"auftraggeber_andere"}]},{"typ":"chips","g":"anlass"},{"typ":"kurz","frei":"anlass_andere"},{"typ":"lang","frei":"anlass_details"},{"typ":"chips","g":"anliegen"},{"typ":"chips","g":"empfohlen"}]},{"id":"vorgeschichte","abschnitte":["vorgeschichte"],"felder":[{"typ":"reihe","felder":[{"typ":"wahl","f":"schwangerschaft","opt":"verlauf"},{"typ":"kurz","frei":"schwangerschaft_details","wenn":["schwangerschaft","komplikationen"]}]},{"typ":"reihe","felder":[{"typ":"wahl","f":"geburt","opt":"verlauf"},{"typ":"kurz","frei":"geburt_details","wenn":["geburt","komplikationen"]}]},{"typ":"reihe","felder":[{"typ":"wahl","f":"motorik","opt":"entwicklung"},{"typ":"kurz","frei":"motorik_details"}]},{"typ":"reihe","felder":[{"typ":"wahl","f":"sprache","opt":"entwicklung"},{"typ":"zahl","f":"erste_worte"},{"typ":"kurz","frei":"sprache_details"}]},{"typ":"chips","g":"diagnosen","details":"diagnosen_details","andere":"diagnose_andere"},{"typ":"haken","f":"keine_diagnosen"},{"typ":"tabelle","t":"vorgeschichte"},{"typ":"lang","frei":"vorgeschichte","frei2":true}]},{"id":"familie","abschnitte":["sozialbericht"],"felder":[{"typ":"reihe","felder":[{"typ":"wahl","f":"familienstand","opt":"familienstand"},{"typ":"wahl","f":"lebt_bei","opt":"lebt_bei"}]},{"typ":"reihe","felder":[{"typ":"wahl","f":"kontakt","opt":"kontakt"},{"typ":"kurz","frei":"kontakt_details"}]},{"typ":"reihe","felder":[{"typ":"zahl","f":"geschwister_anzahl"},{"typ":"wahl","f":"geschwister_position","opt":"position"}]},{"typ":"chips","g":"sprachen","andere":"sprache_andere"},{"typ":"reihe","felder":[{"typ":"kurz","frei":"beruf_mutter"},{"typ":"wahl","f":"zeit_mutter","opt":"arbeitszeit"}]},{"typ":"reihe","felder":[{"typ":"kurz","frei":"beruf_vater"},{"typ":"wahl","f":"zeit_vater","opt":"arbeitszeit"}]},{"typ":"chips","g":"ereignisse","details":"ereignis_details"},{"typ":"chips","g":"betreuung"},{"typ":"kurz","frei":"freizeit"},{"typ":"lang","frei":"familie","frei2":true}]},{"id":"aktuell","abschnitte":["aktuell","massnahmen"],"felder":[{"typ":"reihe","felder":[{"typ":"kurz","f":"klasse","stamm":"klasse"},{"typ":"kurz","f":"schule_name","stamm":"foerderort"}]},{"typ":"reihe","felder":[{"typ":"kurz","frei":"lehrperson"},{"typ":"kurz","frei":"eseb_referenz"}]},{"typ":"lang","frei":"aktuell","frei2":true},{"typ":"tabelle","t":"aktuell"}]},{"id":"schule","abschnitte":["schule"],"felder":[{"typ":"reihe","felder":[{"typ":"quelle","f":"schule_quelle","art":"schule"},{"typ":"datum","f":"schule_datum"}]},{"typ":"chips","g":"s_staerken"},{"typ":"aussagen","bereich":"schule"},{"typ":"chips","g":"s_hilft"},{"typ":"chips","g":"s_erwartung"},{"typ":"lang","frei":"schule","frei2":true}]},{"id":"kind","abschnitte":["kind"],"felder":[{"typ":"datum","f":"kind_datum"},{"typ":"aussagen","bereich":"kind"},{"typ":"chips","g":"k_interessen"},{"typ":"chips","g":"k_wuensche"},{"typ":"kurz","frei":"vertrauensperson"},{"typ":"lang","frei":"kind","frei2":true}]},{"id":"eltern","abschnitte":["eltern"],"felder":[{"typ":"reihe","felder":[{"typ":"quelle","f":"eltern_quelle","art":"eltern"},{"typ":"datum","f":"eltern_datum"}]},{"typ":"chips","g":"e_staerken"},{"typ":"aussagen","bereich":"eltern"},{"typ":"chips","g":"e_erwartung"},{"typ":"lang","frei":"eltern","frei2":true}]},{"id":"beobachtung","abschnitte":["verfahren","beobachtung"],"felder":[{"typ":"chips","g":"verfahren"},{"typ":"reihe","felder":[{"typ":"kurz","frei":"verfahren_andere"},{"typ":"kurz","frei":"verfahren_ort"}]},{"typ":"beob"},{"typ":"aussagen","bereich":"beobachtung"},{"typ":"lang","frei":"beobachtung","frei2":true}]},{"id":"eldib","abschnitte":["eldib"],"felder":[{"typ":"eldib"},{"typ":"tests"}]},{"id":"deutung","abschnitte":["deutung"],"felder":[{"typ":"aussagen","bereich":"deutung"},{"typ":"lang","frei":"abwehr"},{"typ":"lang","frei":"deutung"}]},{"id":"beduerfnisse","abschnitte":["beduerfnisse"],"felder":[{"typ":"aussagen","bereich":"beduerfnisse"},{"typ":"chips","g":"ressourcen"},{"typ":"lang","frei":"beduerfnisse"}]},{"id":"empfehlungen","abschnitte":["schluss","ziele","empfehlungen","cni","interventionen"],"felder":[{"typ":"wahl","f":"abgestimmt","opt":"abgestimmt"},{"typ":"lang","frei":"vorbehalte","wenn":["abgestimmt","vorbehalte"]},{"typ":"reihe","felder":[{"typ":"datum","f":"ziele_bis"}]},{"typ":"lang","frei":"ziele_zusatz"},{"typ":"chips","g":"empf_familie"},{"typ":"lang","frei":"empfehlung_familie","klein":true},{"typ":"chips","g":"empf_schule"},{"typ":"lang","frei":"empfehlung_schule","klein":true},{"typ":"chips","g":"empf_region"},{"typ":"lang","frei":"empfehlung_region","klein":true},{"typ":"chips","g":"cni"},{"typ":"lang","frei":"cni_begruendung"},{"typ":"tabelle","t":"interventionen"}]},{"id":"vorschau","abschnitte":null,"felder":[]}],"deckblatt":{"de":{"titel":"Spezialisierte Diagnostik","unter":"des Zentrums für sozio-emotionale Entwicklung (CDSE)","name":["Name des Schülers","Name der Schülerin","Name des/der Schüler:in"],"matricule":"Sozialversicherungsnummer","alter":"Alter","schule":"Schule","klasse":"Klasse","sprachen":"Sprachen","empfehlungen":"Empfehlungen des CDSE","unterschrift":"Unité de diagnostic, de conseil et de suivi","cni":{"diag_kompetenzzentrum":"Spezialisierte Diagnostik in Zusammenarbeit mit einem Kompetenzzentrum","beratung_eltern":["Beratung und Begleitung der Eltern und des betroffenen Schülers","Beratung und Begleitung der Eltern und der betroffenen Schülerin","Beratung und Begleitung der Eltern und des/der betroffenen Schülers/-in"],"beratung_fachleute":"Beratung und Begleitung der Fachleute","lernwerkstatt":"Spezialisierte Lernwerkstatt","isa":"Spezialisierte ambulante Intervention (ISA)","beschulung":"Spezialisierte Beschulung im CDSE","clapa":"Classe de Participation","cst":"Centre socio-thérapeutique (CST)","annexe":"Annexe Junglinster","ausland":"Spezialisierte Beschulung im Ausland","rehabilitation":"Rehabilitation","abschluss":"Abschluss der Aktivitäten des CDSE","schliessung":"Schließung der Akte im CDSE"}},"fr":{"titel":"Diagnostic spécialisé","unter":"du centre pour le développement socio-émotionnel (CDSE)","name":"Nom et prénom de l’élève","matricule":"Matricule","alter":"Âge","schule":"École","klasse":"Classe","sprachen":"Langues","empfehlungen":"Proposition du CDSE","unterschrift":"Unité de diagnostic, de conseil et de suivi","cni":{"diag_kompetenzzentrum":"Diagnostic spécialisé en collaboration avec un Centre de compétence","beratung_eltern":"Conseil et guidance des parents et de l’élève","beratung_fachleute":"Conseil et guidance des professionnels","lernwerkstatt":"Atelier d’apprentissage spécifique","isa":"Intervention spécialisée ambulatoire (ISA)","beschulung":"Scolarisation spécialisée au CDSE","clapa":"Classe de Participation","cst":"Centre socio-thérapeutique (CST)","annexe":"Annexe Junglinster","ausland":"Scolarisation spécialisée à l’étranger","rehabilitation":"Rééducation","abschluss":"Fin de la prise en charge","schliessung":"Clôture du dossier au CDSE"}},"en":{"titel":"Specialized Diagnostic Assessment","unter":"of the Centre pour le développement socio-émotionnel (CDSE)","name":"Student’s name","matricule":"Social security number","alter":"Age","schule":"School","klasse":"Class","sprachen":"Languages","empfehlungen":"CDSE recommendations","unterschrift":"Unité de diagnostic, de conseil et de suivi","cni":{"diag_kompetenzzentrum":"Specialized diagnostic assessment in cooperation with a competence center","beratung_eltern":"Counseling and guidance for the parents and the student","beratung_fachleute":"Counseling and guidance for professionals","lernwerkstatt":"Specialized learning workshop (Atelier d’apprentissage spécifique)","isa":"Specialized ambulatory intervention (ISA)","beschulung":"Specialized schooling at the CDSE","clapa":"Classe de Participation","cst":"Centre socio-thérapeutique (CST)","annexe":"Annexe Junglinster","ausland":"Specialized schooling abroad","rehabilitation":"Rehabilitation","abschluss":"End of CDSE support","schliessung":"Closure of the CDSE file"}}},"richtziel":{"de":["","Auf die Umwelt mit Freude reagieren","Auf die Umwelt mit Erfolg reagieren","Fähigkeiten zur erfolgreichen Gruppenteilnahme erwerben","Sich in Gruppenprozesse einbringen","Individuelle/gruppenbezogene Fähigkeiten in neuen Situationen anwenden"],"fr":["","Réagir avec joie à l’environnement","Réagir avec succès face à l’environnement","Acquérir des compétences pour collaborer en groupe","Contribuer au succès du groupe par l’effort individuel","Recourir aux habiletés individuelles et collectives dans des situations nouvelles"],"en":["","Responding to the environment with pleasure","Responding to the environment with success","Learning skills for successful group participation","Investing in group processes","Applying individual/group skills in new situations"]},"stufenAlter":{"1":[0,2],"2":[2,5],"3":[6,9],"4":[10,12],"5":[13,16]},"ui":{"de":{"l":{"geschlecht":"Geschlecht (für die Grammatik im Bericht)","m":"Junge","w":"Mädchen","verfasser_name":"Verfasser/in des Berichts","verfasser_funktion":"Funktion","bericht_datum":"Datum des Berichts","auftrag_datum":"Datum der Beauftragung","auftraggeber":"Auftraggeber","auftraggeber_andere":"Anderer Auftraggeber","anlass":"Anlass der Anfrage","anlass_andere":"Weiterer Anlass (eigene Worte)","anlass_details":"Konkrete Auffälligkeiten laut Anfrage (CI-Dokument)","anliegen":"Ziel der Anfrage","empfohlen":"Anfrage auf Empfehlung von","schwangerschaft":"Schwangerschaft","schwangerschaft_details":"Welche Komplikationen?","geburt":"Geburt","geburt_details":"Welche Komplikationen?","motorik":"Motorische Entwicklung","motorik_details":"Details (optional)","sprache":"Sprachentwicklung","erste_worte":"Erste Wörter (Monate)","sprache_details":"Details (optional)","diagnosen":"Bekannte Diagnosen","diagnosen_details":"Wann, durch wen?","diagnose_andere":"Andere Diagnose","keine_diagnosen":"Es liegen keine Diagnosen vor","tab_vorgeschichte":"Bisherige Unterstützungsmaßnahmen (letzte drei Jahre)","tab_aktuell":"Aktuelle Unterstützungsmaßnahmen (3.1)","tab_interventionen":"Interventionen des CDSE (Anhang 6.1)","familienstand":"Familienstand der Eltern","lebt_bei":"Das Kind lebt …","kontakt":"Kontakt zu den Eltern","kontakt_details":"Details zum Kontakt / Besuchsrecht","geschwister_anzahl":"Anzahl Geschwister","geschwister_position":"Position in der Geschwisterreihe","sprachen":"Sprachen in der Familie","sprache_andere":"Andere Sprache","beruf_mutter":"Beruf der Mutter","zeit_mutter":"Arbeitszeit der Mutter","beruf_vater":"Beruf des Vaters","zeit_vater":"Arbeitszeit des Vaters","ereignisse":"Belastende Ereignisse","ereignis_details":"Wann? Details","betreuung":"Betreuung außerhalb der Schule","freizeit":"Freizeit (ein Satz, optional)","klasse":"Klasse","schule_name":"Schule","lehrperson":"Lehrperson (Name)","eseb_referenz":"Referenzperson im ESEB","schule_quelle":"Gespräch mit","schule_datum":"Datum des Gesprächs","kind_datum":"Datum des Gesprächs mit dem Kind","vertrauensperson":"Vertrauensperson in der Schule (optional)","eltern_quelle":"Gespräch mit","eltern_datum":"Datum des Elterngesprächs","verfahren":"Eingesetzte Verfahren","verfahren_andere":"Weitere Verfahren","verfahren_ort":"Ort der Beobachtungen und Gespräche (optional)","beobachtungen":"Beobachtungen","b_datum":"Datum","b_setting":"Situation","b_dauer":"Dauer (Min.)","abwehr":"Ergänzung zu Ängsten und Abwehr (optional)","deutung":"Weitere Interpretation (optional)","ressourcen":"Ressourcen des Kindes","beduerfnisse":"Ergänzung (optional)","abgestimmt":"Wurden die Empfehlungen mit der Familie abgestimmt?","vorbehalte":"Welche Vorbehalte?","ziele_bis":"Ziele gelten bis (optional)","ziele_zusatz":"Weitere Ziele (eine Zeile pro Ziel)","empf_familie":"Empfehlungen – familiärer Kontext","empf_schule":"Empfehlungen – schulischer Kontext (lokal)","empf_region":"Empfehlungen – regionaler Kontext (ESEB / CDSE)","empfehlung_familie":"Weitere Empfehlungen (eine pro Zeile)","empfehlung_schule":"Weitere Empfehlungen (eine pro Zeile)","empfehlung_region":"Weitere Empfehlungen (eine pro Zeile)","cni":"Empfehlung an die CNI (wird auf dem Deckblatt angekreuzt)","cni_begruendung":"Begründung (optional)","schule":"Eigene Ergänzung","kind":"Eigene Ergänzung","eltern":"Eigene Ergänzung","beobachtung":"Eigene Ergänzung","familie":"Eigene Ergänzung","vorgeschichte":"Eigene Ergänzung","aktuell":"Eigene Ergänzung"},"tab":{"zeitraum":"Zeitraum","klasse":"Klasse","massnahme":"Maßnahme","akteur":"Akteur","datum":"Datum","art":"Art der Intervention"},"opt":{"arbeitszeit":{"vollzeit":"Vollzeit","teilzeit":"Teilzeit","nicht":"nicht berufstätig"},"interventionen":{"klassenbeobachtung":"Klassenbeobachtung","kontakt_eltern":"Kontakt mit Erziehungsberechtigten","kontakt_schule":"Kontakt mit der Herkunftsschule","kontakt_extern":"Kontakt mit externem Fachpersonal","kontakt_schueler":"Kontakt mit dem Kind"},"auftraggeber":{"andere":"andere"}},"skala":{"std":["trifft gar nicht zu","teils/teils","trifft voll zu"],"deutlich":["keine Hinweise","teilweise","sehr deutlich"],"wahrscheinlich":["unwahrscheinlich","möglich","sehr wahrscheinlich"],"wichtig":["nicht nötig","hilfreich","sehr wichtig"]},"wirkung":{"nicht":"Wird im Bericht nicht erwähnt.","deutlich":"Wird im Bericht als deutlicher Hinweis genannt.","teilweise":"Wird im Bericht als möglicher Hinweis genannt.","haupt":"Wird als wahrscheinlichste Erklärung genannt.","neben":"Wird als mögliche weitere Erklärung genannt.","braucht":"Steht im Bericht unter „braucht vor allem …“.","profitiert":"Steht im Bericht unter „profitiert zudem von …“.","ohne":"Steht im Bericht in der Aufzählung „keine Hinweise auf …“."},"tabelleMarke":"[Tabelle]"},"fr":{"l":{"geschlecht":"Sexe (pour la grammaire du rapport)","m":"garçon","w":"fille","verfasser_name":"Auteur·e du rapport","verfasser_funktion":"Fonction","bericht_datum":"Date du rapport","auftrag_datum":"Date du mandat","auftraggeber":"Mandant","auftraggeber_andere":"Autre mandant","anlass":"Motif de la demande","anlass_andere":"Autre motif (vos mots)","anlass_details":"Particularités concrètes selon la demande (document CI)","anliegen":"Objectif de la demande","empfohlen":"Demande sur recommandation de","schwangerschaft":"Grossesse","schwangerschaft_details":"Quelles complications ?","geburt":"Naissance","geburt_details":"Quelles complications ?","motorik":"Développement moteur","motorik_details":"Détails (facultatif)","sprache":"Développement du langage","erste_worte":"Premiers mots (mois)","sprache_details":"Détails (facultatif)","diagnosen":"Diagnostics connus","diagnosen_details":"Quand, par qui ?","diagnose_andere":"Autre diagnostic","keine_diagnosen":"Aucun diagnostic n’a été posé","tab_vorgeschichte":"Mesures de soutien antérieures (trois dernières années)","tab_aktuell":"Mesures de soutien actuelles (3.1)","tab_interventionen":"Interventions du CDSE (annexe 6.1)","familienstand":"Situation familiale des parents","lebt_bei":"L’enfant vit …","kontakt":"Contact avec les parents","kontakt_details":"Détails sur le contact / droit de visite","geschwister_anzahl":"Nombre de frères et sœurs","geschwister_position":"Rang dans la fratrie","sprachen":"Langues parlées en famille","sprache_andere":"Autre langue","beruf_mutter":"Profession de la mère","zeit_mutter":"Temps de travail de la mère","beruf_vater":"Profession du père","zeit_vater":"Temps de travail du père","ereignisse":"Événements marquants","ereignis_details":"Quand ? Détails","betreuung":"Accueil en dehors de l’école","freizeit":"Loisirs (une phrase, facultatif)","klasse":"Classe","schule_name":"École","lehrperson":"Enseignant·e (nom)","eseb_referenz":"Personne de référence ESEB","schule_quelle":"Entretien avec","schule_datum":"Date de l’entretien","kind_datum":"Date de l’entretien avec l’élève","vertrauensperson":"Personne de confiance à l’école (facultatif)","eltern_quelle":"Entretien avec","eltern_datum":"Date de l’entretien avec les parents","verfahren":"Procédures utilisées","verfahren_andere":"Autres procédures","verfahren_ort":"Lieu des observations et entretiens (facultatif)","beobachtungen":"Observations","b_datum":"Date","b_setting":"Situation","b_dauer":"Durée (min.)","abwehr":"Complément sur les angoisses et défenses (facultatif)","deutung":"Autre interprétation (facultatif)","ressourcen":"Ressources de l’élève","beduerfnisse":"Complément (facultatif)","abgestimmt":"Les recommandations ont-elles été concertées avec la famille ?","vorbehalte":"Quelles réserves ?","ziele_bis":"Objectifs valables jusqu’au (facultatif)","ziele_zusatz":"Autres objectifs (un par ligne)","empf_familie":"Recommandations – contexte familial","empf_schule":"Recommandations – contexte scolaire (local)","empf_region":"Recommandations – contexte régional (ESEB / CDSE)","empfehlung_familie":"Autres recommandations (une par ligne)","empfehlung_schule":"Autres recommandations (une par ligne)","empfehlung_region":"Autres recommandations (une par ligne)","cni":"Recommandation à la CNI (cochée sur la page de garde)","cni_begruendung":"Justification (facultatif)","schule":"Complément personnel","kind":"Complément personnel","eltern":"Complément personnel","beobachtung":"Complément personnel","familie":"Complément personnel","vorgeschichte":"Complément personnel","aktuell":"Complément personnel"},"tab":{"zeitraum":"Période","klasse":"Classe","massnahme":"Intervention","akteur":"Acteur","datum":"Date","art":"Type d’intervention"},"opt":{"arbeitszeit":{"vollzeit":"temps plein","teilzeit":"temps partiel","nicht":"sans activité professionnelle"},"interventionen":{"klassenbeobachtung":"Observation en classe","kontakt_eltern":"Contact avec les parents/tuteurs","kontakt_schule":"Contact avec l’école d’origine","kontakt_extern":"Contact avec des spécialistes","kontakt_schueler":"Contact avec l’élève"},"auftraggeber":{"andere":"autre"}},"skala":{"std":["pas du tout","en partie","tout à fait"],"deutlich":["aucun indice","en partie","très net"],"wahrscheinlich":["peu probable","possible","très probable"],"wichtig":["pas nécessaire","utile","très important"]},"wirkung":{"nicht":"N’apparaît pas dans le rapport.","deutlich":"Est mentionné comme indice net.","teilweise":"Est mentionné comme indice possible.","haupt":"Est mentionné comme explication la plus probable.","neben":"Est mentionné comme explication possible.","braucht":"Figure sous « a surtout besoin de … ».","profitiert":"Figure sous « bénéficierait en outre de … ».","ohne":"Figure dans l’énumération « aucun signe de … »."},"tabelleMarke":"[Tableau]"},"en":{"l":{"geschlecht":"Gender (for the grammar of the report)","m":"boy","w":"girl","verfasser_name":"Author of the report","verfasser_funktion":"Position","bericht_datum":"Date of the report","auftrag_datum":"Date of referral","auftraggeber":"Referred by","auftraggeber_andere":"Other referrer","anlass":"Reason for referral","anlass_andere":"Further reason (own words)","anlass_details":"Concrete concerns according to the referral (CI document)","anliegen":"Aim of the referral","empfohlen":"Referral recommended by","schwangerschaft":"Pregnancy","schwangerschaft_details":"Which complications?","geburt":"Birth","geburt_details":"Which complications?","motorik":"Motor development","motorik_details":"Details (optional)","sprache":"Language development","erste_worte":"First words (months)","sprache_details":"Details (optional)","diagnosen":"Known diagnoses","diagnosen_details":"When, by whom?","diagnose_andere":"Other diagnosis","keine_diagnosen":"No diagnoses have been made","tab_vorgeschichte":"Previous support measures (last three years)","tab_aktuell":"Current support measures (3.1)","tab_interventionen":"CDSE interventions (appendix 6.1)","familienstand":"Parents’ family status","lebt_bei":"The child lives …","kontakt":"Contact with the parents","kontakt_details":"Details on contact / visiting rights","geschwister_anzahl":"Number of siblings","geschwister_position":"Position among siblings","sprachen":"Languages spoken in the family","sprache_andere":"Other language","beruf_mutter":"Mother’s occupation","zeit_mutter":"Mother’s working hours","beruf_vater":"Father’s occupation","zeit_vater":"Father’s working hours","ereignisse":"Stressful life events","ereignis_details":"When? Details","betreuung":"Care outside school","freizeit":"Leisure (one sentence, optional)","klasse":"Class","schule_name":"School","lehrperson":"Teacher (name)","eseb_referenz":"ESEB contact person","schule_quelle":"Interview with","schule_datum":"Date of the interview","kind_datum":"Date of the interview with the student","vertrauensperson":"Trusted person at school (optional)","eltern_quelle":"Interview with","eltern_datum":"Date of the parent interview","verfahren":"Procedures used","verfahren_andere":"Further procedures","verfahren_ort":"Place of observations and interviews (optional)","beobachtungen":"Observations","b_datum":"Date","b_setting":"Setting","b_dauer":"Duration (min.)","abwehr":"Addition on anxieties and defenses (optional)","deutung":"Further interpretation (optional)","ressourcen":"The student’s resources","beduerfnisse":"Addition (optional)","abgestimmt":"Were the recommendations agreed with the family?","vorbehalte":"Which reservations?","ziele_bis":"Goals valid until (optional)","ziele_zusatz":"Further goals (one per line)","empf_familie":"Recommendations – family context","empf_schule":"Recommendations – school context (local)","empf_region":"Recommendations – regional context (ESEB / CDSE)","empfehlung_familie":"Further recommendations (one per line)","empfehlung_schule":"Further recommendations (one per line)","empfehlung_region":"Further recommendations (one per line)","cni":"Recommendation to the CNI (ticked on the cover page)","cni_begruendung":"Justification (optional)","schule":"Own addition","kind":"Own addition","eltern":"Own addition","beobachtung":"Own addition","familie":"Own addition","vorgeschichte":"Own addition","aktuell":"Own addition"},"tab":{"zeitraum":"Period","klasse":"Class","massnahme":"Measure","akteur":"Provider","datum":"Date","art":"Type of intervention"},"opt":{"arbeitszeit":{"vollzeit":"full-time","teilzeit":"part-time","nicht":"not employed"},"interventionen":{"klassenbeobachtung":"Classroom observation","kontakt_eltern":"Contact with parents/guardians","kontakt_schule":"Contact with the home school","kontakt_extern":"Contact with external professionals","kontakt_schueler":"Contact with the student"},"auftraggeber":{"andere":"other"}},"skala":{"std":["not at all true","partly","completely true"],"deutlich":["no indication","partly","very clear"],"wahrscheinlich":["unlikely","possible","very likely"],"wichtig":["not needed","helpful","very important"]},"wirkung":{"nicht":"Not mentioned in the report.","deutlich":"Mentioned as a clear indication.","teilweise":"Mentioned as a possible indication.","haupt":"Mentioned as the most likely explanation.","neben":"Mentioned as a possible further explanation.","braucht":"Listed under “needs above all …”.","profitiert":"Listed under “also benefits from …”.","ohne":"Listed in “no indications of …”."},"tabelleMarke":"[Table]"}}};
// ==== Beschriftungen der Auswahlfelder je Sprache (aus 43–45 und 47) ====
var DS_CHIP_LABELS = {"de":{"s_staerken":{"hilfsbereit":"hilfsbereit","kreativ":"kreativ","humorvoll":"humorvoll","sportlich":"sportlich","sprachlich":"sprachlich stark","mathematisch":"mathematisch stark","technisch":"technisch interessiert","musikalisch":"musikalisch","fantasievoll":"fantasievoll","wissbegierig":"wissbegierig","freundlich":"freundlich","zuverlaessig":"zuverlässig"},"s_hilft":{"ansagen":"klare, kurze Ansagen","wiederholung":"Wiederholungen","visualisierung":"Visualisierungen","bewegung":"Bewegungspausen","rueckzugsort":"Rückzugsmöglichkeit","einzelansprache":"Einzelansprache","lob":"Lob, Verstärkung","vorwarnung":"Vorwarnung bei Wechseln","kleingruppe":"Kleingruppe","naehe":"Nähe zur Lehrperson","struktur":"feste Abläufe"},"s_erwartung":{"strategien":"Strategien für den Unterricht","verhalten":"besseres Verhalten","konzentration":"bessere Konzentration","integration":"soziale Integration","stabilitaet":"emotionale Stabilität","leistung":"bessere Leistungen","therapie":"therapeutische Hilfe","eltern":"Zusammenarbeit mit Eltern","foerderort":"anderer Förderort","abklaerung":"Abklärung"},"k_interessen":{"sport":"Sport","gaming":"Videospiele","musik":"Musik","lesen":"Lesen","kreatives":"Malen, Basteln","freunde":"Freunde treffen","tiere":"Tiere","natur":"Natur","technik":"Technik","kochen":"Kochen, Backen"},"k_wuensche":{"noten":"bessere Noten","freunde":"mehr Freunde","streit":"weniger Streit","ruhe":"Ruhe zu Hause","druck":"weniger Druck","verstanden":"verstanden werden","hilfe":"Hilfe bekommen","klasse":"andere Klasse","schule":"andere Schule","inruhe":"in Ruhe gelassen werden"},"e_staerken":{"hilfsbereit":"hilfsbereit","liebevoll":"liebevoll","selbststaendig":"selbstständig","kreativ":"kreativ","humorvoll":"humorvoll","sportlich":"sportlich","verantwortung":"verantwortungsbewusst","offen":"offen"},"e_erwartung":{"verhalten":"besseres Verhalten","entspannung":"Entspannung zu Hause","strategien":"Erziehungsstrategien","leistung":"bessere Leistungen","abklaerung":"Abklärung","therapie":"Therapie für das Kind","beratung":"Beratung für sich","foerderort":"anderer Förderort","verstehen":"das Kind verstehen","bestaetigung":"Orientierung, Rückhalt"},"ressourcen":{"kognitiv":"kognitive Fähigkeiten","kreativ":"Kreativität","sportlich":"Sport","musisch":"künstlerisch, musisch","humor":"Humor","empathie":"Einfühlungsvermögen","neugier":"Neugier","begeisterung":"Begeisterungsfähigkeit","hilfsbereit":"Hilfsbereitschaft","verantwortung":"übernimmt Verantwortung","einzelbeziehung":"Einzelbeziehungen","lernbereit":"Lernbereitschaft","vertrauensperson":"Vertrauensperson","familie":"unterstützende Familie","hobbys":"Hobbys","reflexion":"reflektiert"},"anlass":{"verhalten_schule":"Verhalten in der Schule","verhalten_zuhause":"Verhalten zu Hause","emotional":"emotionale Schwierigkeiten","sozial":"soziale Schwierigkeiten","leistung":"Schulleistung","aufmerksamkeit":"Aufmerksamkeit","aggression":"Aggression","rueckzug":"Rückzug","aengste":"Ängste","schulverweigerung":"Schulverweigerung"},"anliegen":{"isa":"ISA","conseil":"Conseil & Guidance","cst":"CST","clapa":"Classe de Participation","annexe":"Annexe Junglinster","lernwerkstatt":"Lernwerkstatt","beschulung":"spezialisierte Beschulung","diagnostik":"Diagnostik"},"empfohlen":{"lehrperson":"Lehrperson","eseb":"ESEB","schulleitung":"Schulleitung","arzt":"Ärztin/Arzt","psychologe":"Psychologin/Psychologe","eltern":"Wunsch der Eltern"},"diagnosen":{"adhs":"ADHS/ADS","ass":"Autismus-Spektrum","lernstoerung":"Lernstörung","sprachstoerung":"Sprachentwicklungsstörung","emotional":"emotionale Störung","bindung":"Bindungsstörung","angst":"Angststörung","opposition":"oppositionelles Verhalten","andere":"andere"},"ereignisse":{"trennung":"Trennung der Eltern","umzug":"Umzug","verlust":"Verlust einer Bezugsperson","krankheit":"Krankheit in der Familie","konflikte":"häusliche Konflikte","trauma":"belastendes Erlebnis","migration":"Migration"},"betreuung":{"maison_relais":"Maison Relais","grosseltern":"Großeltern","tagesmutter":"Tagesmutter","keine":"keine"},"sprachen":{"lb":"Luxemburgisch","de":"Deutsch","fr":"Französisch","pt":"Portugiesisch","en":"Englisch","it":"Italienisch","es":"Spanisch","andere":"andere"},"verfahren":{"eldib":"ELDiB","beobachtung":"Beobachtung","gespraeche":"Gespräche","sdq":"SDQ","wisc":"WISC-V","andere":"andere"},"empf_familie":{"step":"STEP-Elterntraining (CDSE)","erziehungsberatung":"Erziehungsberatung","familientherapie":"Familientherapie","tagesstruktur":"Tagesstruktur zu Hause","austausch":"Austausch mit der Schule","medien":"Medienregeln","freizeit":"Freizeitaktivität"},"empf_schule":{"sitzplatz":"Sitzplatz","differenzierung":"Differenzierung","verstaerker":"Verstärkerplan","regeln":"Regeln & Konsequenzen","auszeit":"Auszeit/Rückzug","uebergaenge":"Übergänge ankündigen","visualisierung":"Visualisierung","bewegung":"Bewegungspausen","iebs":"I-EBS","bezugsperson":"Bezugsperson"},"empf_region":{"eseb":"ESEB-Begleitung","isa":"ISA","conseil":"Conseil & Guidance","lernwerkstatt":"Lernwerkstatt","psychotherapie":"Psychotherapie","ergotherapie":"Ergotherapie","logopaedie":"Logopädie","psychiatrie":"kinderpsychiatrische Abklärung"},"cni":{"diag_kompetenzzentrum":"Diagnostik mit Kompetenzzentrum","beratung_eltern":"Beratung Eltern und Kind","beratung_fachleute":"Beratung Fachleute","lernwerkstatt":"Lernwerkstatt","isa":"ISA","beschulung":"Beschulung im CDSE","clapa":"Classe de Participation","cst":"CST","annexe":"Annexe Junglinster","ausland":"Beschulung im Ausland","rehabilitation":"Rehabilitation","abschluss":"Abschluss der Aktivitäten","schliessung":"Schließung der Akte"},"interventionen":{"klassenbeobachtung":"Klassenbeobachtung","kontakt_eltern":"Kontakt mit Erziehungsberechtigten","kontakt_schule":"Kontakt mit der Herkunftsschule","kontakt_extern":"Kontakt mit externem Fachpersonal","kontakt_schueler":"Kontakt mit dem Kind"},"arbeitszeit":{"vollzeit":"Vollzeit","teilzeit":"Teilzeit","nicht":"nicht berufstätig"}},"fr":{"s_staerken":{"hilfsbereit":"serviabilité","kreativ":"créativité","humorvoll":"humour","sportlich":"aptitudes sportives","sprachlich":"aisance langagière","mathematisch":"mathématiques","technisch":"intérêt technique","musikalisch":"sens musical","fantasievoll":"imagination","wissbegierig":"curiosité","freundlich":"gentillesse","zuverlaessig":"fiabilité"},"s_hilft":{"ansagen":"consignes courtes et claires","wiederholung":"répétitions","visualisierung":"supports visuels","bewegung":"pauses actives","rueckzugsort":"espace de retrait","einzelansprache":"consignes individuelles","lob":"éloges, renforcement","vorwarnung":"annonce des changements","kleingruppe":"petit groupe","naehe":"proximité de l’adulte","struktur":"routines fixes"},"s_erwartung":{"strategien":"stratégies pour la classe","verhalten":"meilleur comportement","konzentration":"meilleure concentration","integration":"intégration sociale","stabilitaet":"stabilité émotionnelle","leistung":"meilleurs résultats","therapie":"aide thérapeutique","eltern":"collaboration avec les parents","foerderort":"autre lieu de scolarisation","abklaerung":"bilan diagnostique"},"k_interessen":{"sport":"sport","gaming":"jeux vidéo","musik":"musique","lesen":"lecture","kreatives":"dessin, bricolage","freunde":"voir des amis","tiere":"animaux","natur":"nature","technik":"technique","kochen":"cuisine, pâtisserie"},"k_wuensche":{"noten":"meilleures notes","freunde":"plus d’amis","streit":"moins de disputes","ruhe":"calme à la maison","druck":"moins de pression","verstanden":"être compris","hilfe":"recevoir de l’aide","klasse":"autre classe","schule":"autre école","inruhe":"être laissé tranquille"},"e_staerken":{"hilfsbereit":"serviabilité","liebevoll":"affection","selbststaendig":"autonomie","kreativ":"créativité","humorvoll":"humour","sportlich":"sport","verantwortung":"sens des responsabilités","offen":"ouverture"},"e_erwartung":{"verhalten":"meilleur comportement","entspannung":"apaisement à la maison","strategien":"stratégies éducatives","leistung":"meilleurs résultats","abklaerung":"bilan diagnostique","therapie":"thérapie pour l’enfant","beratung":"conseils pour les parents","foerderort":"autre lieu de scolarisation","verstehen":"comprendre l’enfant","bestaetigung":"repères, soutien"},"ressourcen":{"kognitiv":"capacités cognitives","kreativ":"créativité","sportlich":"sport","musisch":"arts, musique","humor":"humour","empathie":"empathie","neugier":"curiosité","begeisterung":"enthousiasme","hilfsbereit":"serviabilité","verantwortung":"prend des responsabilités","einzelbeziehung":"relation individuelle","lernbereit":"volonté d’apprendre","vertrauensperson":"personne de confiance","familie":"famille soutenante","hobbys":"loisirs","reflexion":"capacité de réflexion"},"anlass":{"verhalten_schule":"comportement à l’école","verhalten_zuhause":"comportement à la maison","emotional":"difficultés émotionnelles","sozial":"difficultés sociales","leistung":"résultats scolaires","aufmerksamkeit":"attention","aggression":"agressivité","rueckzug":"repli sur soi","aengste":"peurs, angoisses","schulverweigerung":"refus scolaire"},"anliegen":{"isa":"ISA","conseil":"Conseil & Guidance","cst":"CST","clapa":"Classe de Participation","annexe":"Annexe Junglinster","lernwerkstatt":"Atelier d’apprentissage spécifique","beschulung":"scolarisation spécialisée","diagnostik":"diagnostic"},"empfohlen":{"lehrperson":"enseignant·e","eseb":"ESEB","schulleitung":"direction de l’école","arzt":"médecin","psychologe":"psychologue","eltern":"souhait des parents"},"diagnosen":{"adhs":"TDAH/TDA","ass":"trouble du spectre de l’autisme","lernstoerung":"trouble des apprentissages","sprachstoerung":"trouble du langage","emotional":"trouble émotionnel","bindung":"trouble de l’attachement","angst":"trouble anxieux","opposition":"trouble oppositionnel","andere":"autre"},"ereignisse":{"trennung":"séparation des parents","umzug":"déménagement","verlust":"perte d’un proche","krankheit":"maladie dans la famille","konflikte":"conflits familiaux","trauma":"expérience éprouvante","migration":"migration"},"betreuung":{"maison_relais":"maison relais","grosseltern":"grands-parents","tagesmutter":"assistant·e parental·e","keine":"aucun"},"sprachen":{"lb":"luxembourgeois","de":"allemand","fr":"français","pt":"portugais","en":"anglais","it":"italien","es":"espagnol","andere":"autre"},"verfahren":{"eldib":"ELDiB","beobachtung":"observation","gespraeche":"entretiens","sdq":"SDQ","wisc":"WISC-V","andere":"autre"},"empf_familie":{"step":"programme STEP (CDSE)","erziehungsberatung":"guidance parentale","familientherapie":"thérapie familiale","tagesstruktur":"structure du quotidien","austausch":"échanges avec l’école","medien":"règles pour les écrans","freizeit":"activité de loisirs"},"empf_schule":{"sitzplatz":"place en classe","differenzierung":"différenciation","verstaerker":"système de renforcement","regeln":"règles et conséquences","auszeit":"temps calme / retrait","uebergaenge":"annoncer les transitions","visualisierung":"visualisation","bewegung":"pauses actives","iebs":"I-EBS","bezugsperson":"personne de référence"},"empf_region":{"eseb":"suivi ESEB","isa":"ISA","conseil":"Conseil & Guidance","lernwerkstatt":"Atelier d’apprentissage","psychotherapie":"psychothérapie","ergotherapie":"ergothérapie","logopaedie":"logopédie","psychiatrie":"bilan pédopsychiatrique"},"cni":{"diag_kompetenzzentrum":"diagnostic avec Centre de compétence","beratung_eltern":"conseil parents et élève","beratung_fachleute":"conseil professionnel·le·s","lernwerkstatt":"Atelier d’apprentissage","isa":"ISA","beschulung":"scolarisation au CDSE","clapa":"Classe de Participation","cst":"CST","annexe":"Annexe Junglinster","ausland":"scolarisation à l’étranger","rehabilitation":"rééducation","abschluss":"fin de la prise en charge","schliessung":"clôture du dossier"},"interventionen":{"klassenbeobachtung":"Observation en classe","kontakt_eltern":"Contact avec les parents/tuteurs","kontakt_schule":"Contact avec l’école d’origine","kontakt_extern":"Contact avec des spécialistes","kontakt_schueler":"Contact avec l’élève"},"arbeitszeit":{"vollzeit":"temps plein","teilzeit":"temps partiel","nicht":"sans activité professionnelle"}},"en":{"s_staerken":{"hilfsbereit":"helpful","kreativ":"creative","humorvoll":"good sense of humor","sportlich":"athletic","sprachlich":"strong in languages","mathematisch":"strong in math","technisch":"interested in technology","musikalisch":"musical","fantasievoll":"imaginative","wissbegierig":"eager to learn","freundlich":"friendly","zuverlaessig":"reliable"},"s_hilft":{"ansagen":"clear, short instructions","wiederholung":"repetition","visualisierung":"visual aids","bewegung":"movement breaks","rueckzugsort":"quiet space","einzelansprache":"addressing individually","lob":"praise, reinforcement","vorwarnung":"advance notice of changes","kleingruppe":"small group","naehe":"proximity to the teacher","struktur":"fixed routines"},"s_erwartung":{"strategien":"classroom strategies","verhalten":"better behavior","konzentration":"better concentration","integration":"social integration","stabilitaet":"emotional stability","leistung":"better performance","therapie":"therapeutic help","eltern":"cooperation with parents","foerderort":"different setting","abklaerung":"assessment"},"k_interessen":{"sport":"sports","gaming":"video games","musik":"music","lesen":"reading","kreatives":"drawing, crafts","freunde":"meeting friends","tiere":"animals","natur":"nature","technik":"technology","kochen":"cooking, baking"},"k_wuensche":{"noten":"better grades","freunde":"more friends","streit":"less arguing","ruhe":"calm at home","druck":"less pressure","verstanden":"to be understood","hilfe":"to get help","klasse":"a different class","schule":"a different school","inruhe":"to be left alone"},"e_staerken":{"hilfsbereit":"helpful","liebevoll":"affectionate","selbststaendig":"independent","kreativ":"creative","humorvoll":"good sense of humor","sportlich":"athletic","verantwortung":"responsible","offen":"open"},"e_erwartung":{"verhalten":"better behavior","entspannung":"calmer situation at home","strategien":"parenting strategies","leistung":"better performance","abklaerung":"assessment","therapie":"therapy for the child","beratung":"counseling for the parents","foerderort":"different setting","verstehen":"understanding the child","bestaetigung":"guidance, reassurance"},"ressourcen":{"kognitiv":"cognitive abilities","kreativ":"creativity","sportlich":"sports","musisch":"artistic, musical","humor":"humor","empathie":"empathy","neugier":"curiosity","begeisterung":"enthusiasm","hilfsbereit":"helpfulness","verantwortung":"takes responsibility","einzelbeziehung":"one-to-one relationships","lernbereit":"willingness to learn","vertrauensperson":"trusted adult","familie":"supportive family","hobbys":"hobbies","reflexion":"reflective"},"anlass":{"verhalten_schule":"behavior at school","verhalten_zuhause":"behavior at home","emotional":"emotional difficulties","sozial":"social difficulties","leistung":"academic performance","aufmerksamkeit":"attention","aggression":"aggression","rueckzug":"withdrawal","aengste":"anxiety","schulverweigerung":"school refusal"},"anliegen":{"isa":"ISA","conseil":"Conseil & Guidance","cst":"CST","clapa":"Classe de Participation","annexe":"Annexe Junglinster","lernwerkstatt":"Learning workshop","beschulung":"Specialized schooling","diagnostik":"Diagnostic assessment"},"empfohlen":{"lehrperson":"Teacher","eseb":"ESEB","schulleitung":"School management","arzt":"Physician","psychologe":"Psychologist","eltern":"Parents’ request"},"diagnosen":{"adhs":"ADHD/ADD","ass":"Autism spectrum","lernstoerung":"Learning disorder","sprachstoerung":"Language disorder","emotional":"Emotional disorder","bindung":"Attachment disorder","angst":"Anxiety disorder","opposition":"Oppositional behavior","andere":"Other"},"ereignisse":{"trennung":"Parents’ separation","umzug":"Move","verlust":"Loss of an attachment figure","krankheit":"Illness in the family","konflikte":"Conflict at home","trauma":"Distressing experience","migration":"Migration"},"betreuung":{"maison_relais":"Maison Relais","grosseltern":"Grandparents","tagesmutter":"Childminder","keine":"None"},"sprachen":{"lb":"Luxembourgish","de":"German","fr":"French","pt":"Portuguese","en":"English","it":"Italian","es":"Spanish","andere":"Other"},"verfahren":{"eldib":"ELDiB","beobachtung":"Observation","gespraeche":"Interviews","sdq":"SDQ","wisc":"WISC-V","andere":"Other"},"empf_familie":{"step":"STEP parenting program (CDSE)","erziehungsberatung":"Parenting counseling","familientherapie":"Family therapy","tagesstruktur":"Daily structure at home","austausch":"Contact with the school","medien":"Rules for screen use","freizeit":"Leisure activity"},"empf_schule":{"sitzplatz":"Seating","differenzierung":"Differentiation","verstaerker":"Reinforcement plan","regeln":"Rules & consequences","auszeit":"Time-out/retreat","uebergaenge":"Announcing transitions","visualisierung":"Visual support","bewegung":"Movement breaks","iebs":"I-EBS","bezugsperson":"Key adult"},"empf_region":{"eseb":"ESEB support","isa":"ISA","conseil":"Conseil & Guidance","lernwerkstatt":"Learning workshop","psychotherapie":"Psychotherapy","ergotherapie":"Occupational therapy","logopaedie":"Speech therapy","psychiatrie":"Child psychiatric assessment"},"cni":{"diag_kompetenzzentrum":"Diagnostics with a competence center","beratung_eltern":"Counseling for parents and student","beratung_fachleute":"Counseling for professionals","lernwerkstatt":"Learning workshop","isa":"ISA","beschulung":"Schooling at the CDSE","clapa":"Classe de Participation","cst":"CST","annexe":"Annexe Junglinster","ausland":"Schooling abroad","rehabilitation":"Rehabilitation","abschluss":"End of CDSE support","schliessung":"Closure of the file"},"interventionen":{"klassenbeobachtung":"Classroom observation","kontakt_eltern":"Contact with parents/guardians","kontakt_schule":"Contact with the home school","kontakt_extern":"Contact with external professionals","kontakt_schueler":"Contact with the student"},"arbeitszeit":{"vollzeit":"full-time","teilzeit":"part-time","nicht":"not employed"}}};

// ==== ELDiB-Itembank (deutsch, aus 10/20/60) ====
var ELDIB_BANK = {"stufen":{"1":{"min":0,"max":2,"name":"Stufe I","beschreibung":"0-2 Jahre"},"2":{"min":2,"max":5,"name":"Stufe II","beschreibung":"2-5 Jahre"},"3":{"min":6,"max":9,"name":"Stufe III","beschreibung":"6-9 Jahre"},"4":{"min":10,"max":12,"name":"Stufe IV","beschreibung":"10-12 Jahre"},"5":{"min":12,"max":16,"name":"Stufe V","beschreibung":"12-16 Jahre"}},"bereiche":{"verhalten":{"name":"Verhalten","code":"V","stufen":{"1":{"name":"Stufe I: Mit Freude auf die Umwelt reagieren","ziel":"Den eigenen körperlichen Fähigkeiten vertrauen","items":[{"nr":1,"code":"V-1","keyword":"Wahrnehmung","description":"Lässt Wahrnehmung eines sensorischen Reizes erkennen.","zielformulierungen":["Ich schaue die/den Lehrer:in an, wenn sie/er mich berührt."]},{"nr":2,"code":"V-2","keyword":"Orientierung","description":"Reagiert auf sensorischen Reiz mit Zuwendung zur Reizquelle.","zielformulierungen":["Ich schaue mir Bilder an, die die/der Lehrer:in mir zeigt."]},{"nr":3,"code":"V-3","keyword":"Aufmerksamkeit","description":"Reagiert auf einen Reiz mit kurzzeitig anhaltender Aufmerksamkeit.","zielformulierungen":["Ich schaue auf das, was mir vorgezeigt wird.","Ich höre zu, wenn die/der Lehrer:in etwas sagt."]},{"nr":4,"code":"V-4","keyword":"motorische Reaktion","description":"Reagiert von sich aus auf einfache Umgebungsreize mit einer motorischen Handlung.","zielformulierungen":["Wenn die/der Lehrer:in mir die Hand reicht, nehme ich sie."]},{"nr":5,"code":"V-5","keyword":"komplexe Reaktion","description":"Reagiert auf komplexe Umgebungsreize und verbale Impulse mit motorischer Handlung.","zielformulierungen":["Ich baue einen Turm, wenn ich Bauklötze angeboten bekomme.","Ich werfe den Ball zurück, wenn die/der Lehrer:in ihn mir zuwirft."]},{"nr":6,"code":"V-6","keyword":"Selbsthilfe","description":"Beteiligt sich aktiv am Erlernen von Selbsthilfe-Fähigkeiten.","zielformulierungen":["Morgens hänge ich meine Jacke an den Haken.","Wenn es klingelt, ziehe ich meine Jacke an."]},{"nr":7,"code":"V-7","keyword":"Spielmaterial","description":"Reagiert eigenständig auf verschiedene Spielmaterialien.","zielformulierungen":["Ich räume die Bücher in das Regal, wenn die/der Lehrer:in das sagt.","Ich lege das Schulmaterial auf den richtigen Platz."]},{"nr":8,"code":"V-8","keyword":"Routineabläufe","description":"Zeigt Wiedererkennen von Routineabläufen.","zielformulierungen":["Wenn die/der Lehrer:in sagt, dass wir in die Pause gehen, räume ich mein Pult."]}]},"2":{"name":"Stufe II: Erfolgreich auf die Umwelt reagieren","ziel":"Erfolgreich an Routineabläufen und Aktivitäten teilnehmen","items":[{"nr":9,"code":"V-9","keyword":"Spielerfahrung","description":"Geht mit Spielmaterialien sachgerecht um.","zielformulierungen":["In der Pause benutze ich den Fußball auf dem Fußballfeld.","Nach der Spielzeit räume ich mein Spiel wieder ins Regal."]},{"nr":10,"code":"V-10","keyword":"warten","description":"Wartet ohne körperliche Steuerungshilfe durch den Erwachsenen.","zielformulierungen":["Ich warte, bis die/der Lehrer:in mich mit meinem Namen ruft.","Ich melde mich und warte, bis ich drankomme."]},{"nr":11,"code":"V-11","keyword":"sitzen","description":"Beteiligt sich verbal und physisch an Aktivitäten im Sitzen.","zielformulierungen":["Ich bleibe während der Matheaufgabe sitzen.","In Arbeitsphasen bleibe ich auf meinem Platz sitzen."]},{"nr":12,"code":"V-12","keyword":"Bewegung","description":"Beteiligt sich verbal und physisch an Bewegungsaktivitäten.","zielformulierungen":["Ich beteilige mich während des Sportunterrichts.","Ich mache bei der Bewegungspause mit."]},{"nr":13,"code":"V-13","keyword":"Aktivitäten","description":"Nimmt von sich aus verbal und physisch an Aktivitäten teil.","zielformulierungen":["Ich setze mich in den Morgenkreis, wenn der Tag beginnt.","Ich melde mich im Unterricht."]},{"nr":14,"code":"V-14","keyword":"Lob/Erfolg","description":"Akzeptiert Lob oder Erfolg ohne unangemessenes Verhalten.","zielformulierungen":["Ich nehme Lob von anderen an und behalte die Kontrolle.","Wenn ich gelobt werde, freue ich mich und verhalte mich vernünftig."]}]},"3":{"name":"Stufe III: Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen","ziel":"Erworbene Fähigkeiten anwenden, um innerhalb einer Gruppe das eigene Verhalten erfolgreich zu steuern","items":[{"nr":15,"code":"V-15","keyword":"beenden","description":"Beendet kurze, individuelle Aufgaben selbstständig.","zielformulierungen":["Wenn ich eine Aufgabe verstanden habe, löse ich sie alleine.","Eine angefangene Aufgabe bearbeite ich zu Ende."]},{"nr":16,"code":"V-16","keyword":"Erwartungen","description":"Lässt Bewusstsein für erwartete Verhaltensweisen erkennen.","zielformulierungen":["Ich sage, was unsere Klassenregeln und Ziele sind.","Ich kenne die Regeln, die dafür sorgen, dass alle sich wohl fühlen."]},{"nr":17,"code":"V-17","keyword":"Begründungen","description":"Nennt Gründe für Verhaltenserwartungen.","zielformulierungen":["Ich sage, warum ich mich freundlich und friedlich verhalten soll.","Ich erkläre, warum es unsere Klassenziele gibt."]},{"nr":18,"code":"V-18","keyword":"Alternativen","description":"Beschreibt alternative Verhaltensmöglichkeiten.","zielformulierungen":["Ich sage, wie ich mich anders und angemessen verhalten könnte.","Ich überlege, wie ich mich friedlicher verhalten kann."]},{"nr":19,"code":"V-19","keyword":"Gruppenwahl","description":"Reagiert angemessen auf Gruppenwahl.","zielformulierungen":["Ich akzeptiere die Entscheidung der Gruppe.","Wenn ich zum Anführer gewählt werde, übernehme ich die Verantwortung."]},{"nr":20,"code":"V-20","keyword":"zurückhalten","description":"Hält sich von inakzeptablem Verhalten zurück.","zielformulierungen":["Wenn andere Kinder sich streiten, bleibe ich ruhig.","Auch wenn andere sich falsch verhalten, bleibe ich bei meinem guten Verhalten."]},{"nr":21,"code":"V-21","keyword":"Kontrolle","description":"Behält während Gruppenaktivitäten Selbstkontrolle.","zielformulierungen":["Ich behalte die Kontrolle über mein Verhalten während Gruppenaktivitäten.","Bei Übergängen zwischen Aktivitäten bleibe ich ruhig."]}]},"4":{"name":"Stufe IV: Sich einbringen in Gruppenprozesse","ziel":"Persönliche Fähigkeiten einsetzen, um zum Gruppenerfolg beizutragen","items":[{"nr":22,"code":"V-22","keyword":"Fortschritt","description":"Zeigt Bewusstsein für eigenen Verhaltensfortschritt.","zielformulierungen":["Ich erkenne, wenn ich mich verbessert habe.","Ich kann beschreiben, was ich früher noch nicht konnte."]},{"nr":23,"code":"V-23","keyword":"Flexibilität","description":"Lässt Flexibilität erkennen bei Änderungen.","zielformulierungen":["Ich bleibe ruhig, wenn sich der Plan ändert.","Ich passe mich an, wenn etwas anders läuft als geplant."]},{"nr":24,"code":"V-24","keyword":"neue Erfahrungen","description":"Beteiligt sich kontrolliert an neuen Erfahrungen.","zielformulierungen":["Ich probiere neue Aktivitäten aus und bleibe dabei ruhig.","Bei neuen Erfahrungen verhalte ich mich kontrolliert."]},{"nr":25,"code":"V-25","keyword":"anwenden","description":"Wendet alternative Verhaltensweisen an.","zielformulierungen":["Ich wende die besprochenen alternativen Verhaltensweisen an.","In schwierigen Situationen nutze ich die gelernten Strategien."]},{"nr":26,"code":"V-26","keyword":"Provokation","description":"Reagiert auf Provokationen kontrolliert.","zielformulierungen":["Wenn mich jemand provoziert, bleibe ich ruhig.","Ich lasse mich nicht provozieren."]},{"nr":27,"code":"V-27","keyword":"Verantwortung","description":"Akzeptiert Verantwortung für eigenes Verhalten.","zielformulierungen":["Ich übernehme Verantwortung für mein Verhalten.","Ich akzeptiere die Konsequenzen meines Verhaltens."]},{"nr":28,"code":"V-28","keyword":"Lösungsvorschlag","description":"Reagiert mit konstruktiven Lösungsvorschlägen.","zielformulierungen":["Bei Problemen mache ich konstruktive Vorschläge.","Ich helfe mit, Konflikte zu lösen."]}]},"5":{"name":"Stufe V: Anwenden von individuellen und gruppenbezogenen Fähigkeiten in neuen Situationen","ziel":"Realen Lebenserfahrungen mit konstruktivem Verhalten begegnen","items":[{"nr":29,"code":"V-29","keyword":"Gewohnheiten","description":"Entwickelt neue persönliche Gewohnheiten.","zielformulierungen":["Ich entwickle Gewohnheiten, die mir im Berufsleben helfen werden."]},{"nr":30,"code":"V-30","keyword":"positive Rolle","description":"Sucht eine positive Rolle in der Gruppe.","zielformulierungen":["Ich suche mir eine positive Rolle in der Gruppe.","Ich trage positiv zur Gruppe bei."]},{"nr":31,"code":"V-31","keyword":"Recht/Ordnung","description":"Zeigt Verständnis für Rechts- und Ordnungsprinzipien.","zielformulierungen":["Ich verstehe und akzeptiere Regeln und Gesetze.","Ich halte mich an Regeln in der Schule und Öffentlichkeit."]},{"nr":32,"code":"V-32","keyword":"Selbstverantwortung","description":"Befürwortet Verfahren zur Selbstverantwortung.","zielformulierungen":["Ich unterstütze Regeln, die das Zusammenleben verbessern.","Ich übernehme Selbstverantwortung."]},{"nr":33,"code":"V-33","keyword":"Einsicht","description":"Löst Probleme durch Einsicht und Analyse.","zielformulierungen":["Ich löse meine Probleme, indem ich über sie nachdenke.","Ich analysiere Situationen und finde eigene Lösungen."]}]}}},"kommunikation":{"name":"Kommunikation","code":"K","stufen":{"1":{"name":"Stufe I: Mit Freude auf die Umwelt reagieren","ziel":"Gebraucht Wörter, um Bedürfnisse zu befriedigen","items":[{"nr":1,"code":"K-1","keyword":"Laute","description":"Produziert Laute.","zielformulierungen":["Ich produziere verschiedene Laute."]},{"nr":2,"code":"K-2","keyword":"Sprecher","description":"Richtet Aufmerksamkeit auf Sprechende.","zielformulierungen":["Ich schaue die Person an, die spricht."]},{"nr":3,"code":"K-3","keyword":"verbaler Impuls","description":"Reagiert auf verbalen Impuls.","zielformulierungen":["Wenn jemand etwas sagt, reagiere ich darauf."]},{"nr":4,"code":"K-4","keyword":"Wort-Annäherung","description":"Reagiert verbal auf Fragen.","zielformulierungen":["Wenn ich etwas gefragt werde, antworte ich."]},{"nr":5,"code":"K-5","keyword":"Wörter spontan","description":"Verwendet von sich aus Wörter.","zielformulierungen":["Wenn die/der Lehrer:in mir etwas zeigt, antworte ich."]},{"nr":6,"code":"K-6","keyword":"Wörter Erwachsener","description":"Produziert Wörter für Erwachsene.","zielformulierungen":["Ich spreche mit der/dem Lehrer:in, wenn ich etwas möchte."]},{"nr":7,"code":"K-7","keyword":"Wörter Peer","description":"Produziert Wörter für Gleichaltrige.","zielformulierungen":["Ich spreche mit dem anderen Kind, wenn ich etwas möchte."]},{"nr":8,"code":"K-8","keyword":"Wortreihung","description":"Produziert sinnvolle Wortsequenz.","zielformulierungen":["Wenn ich etwas sagen will, mache ich einen ganzen Satz."]}]},"2":{"name":"Stufe II: Erfolgreich auf die Umwelt reagieren","ziel":"Gebraucht Wörter, um andere in konstruktiver Weise zu beeinflussen","items":[{"nr":9,"code":"K-9","keyword":"beantworten","description":"Beantwortet Fragen sinnvoll.","zielformulierungen":["Ich antworte so, dass jeder meine Antwort verstehen kann."]},{"nr":10,"code":"K-10","keyword":"Vokabular","description":"Zeigt rezeptives Vokabular.","zielformulierungen":["Ich höre zu, damit ich neue Wörter lerne."]},{"nr":11,"code":"K-11","keyword":"Wortsequenzen","description":"Verwendet angemessene Wortsequenzen.","zielformulierungen":["Ich spreche freundlich, wenn ich etwas haben möchte."]},{"nr":12,"code":"K-12","keyword":"Austausch - Erwachsene","description":"Tauscht Informationen mit Erwachsenen.","zielformulierungen":["Wenn ich Hilfe benötige, spreche ich die/den Lehrer:in an."]},{"nr":13,"code":"K-13","keyword":"Merkmale","description":"Beschreibt Merkmale von sich und anderen.","zielformulierungen":["Ich sage, was ich gut kann und was andere gut können."]},{"nr":14,"code":"K-14","keyword":"Austausch - Kind","description":"Tauscht Informationen mit Kindern.","zielformulierungen":["Ich erzähle den Kindern aus meiner Klasse etwas."]}]},"3":{"name":"Stufe III: Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen","ziel":"Gebraucht Wörter, um sich auf konstruktive Weise innerhalb einer Gruppe zu äußern","items":[{"nr":15,"code":"K-15","keyword":"Persönliches","description":"Beschreibt eigene Erfahrungen.","zielformulierungen":["Ich erzähle von Dingen, die ich erlebt habe."]},{"nr":16,"code":"K-16","keyword":"Gefühlsreaktionen","description":"Zeigt angemessene Gefühlsreaktionen.","zielformulierungen":["Wenn ich wütend bin, sage ich was mich stört, ohne zu verletzen."]},{"nr":17,"code":"K-17","keyword":"Gespräche","description":"Beteiligt sich an Gruppengesprächen.","zielformulierungen":["Ich beteilige mich vernünftig an Klassengesprächen."]},{"nr":18,"code":"K-18","keyword":"Stolz - ich","description":"Zeigt Stolz auf eigene Arbeit.","zielformulierungen":["Ich bin stolz auf die Arbeit, die ich geleistet habe."]},{"nr":19,"code":"K-19","keyword":"Eigenschaften - ich","description":"Beschreibt eigene Eigenschaften.","zielformulierungen":["Ich beschreibe meine Stärken und Schwächen."]},{"nr":20,"code":"K-20","keyword":"Eigenschaften - du","description":"Beschreibt Eigenschaften anderer.","zielformulierungen":["Ich beschreibe andere, ohne sie zu verletzen."]},{"nr":21,"code":"K-21","keyword":"Gefühle - du","description":"Erkennt Gefühle anderer.","zielformulierungen":["Ich erkenne und beschreibe die Gefühle anderer."]},{"nr":22,"code":"K-22","keyword":"Stolz - wir","description":"Zeigt Stolz auf Gruppenleistungen.","zielformulierungen":["Ich zeige Stolz auf unsere Gruppenleistung."]}]},"4":{"name":"Stufe IV: Sich einbringen in Gruppenprozesse","ziel":"Verwendet Wörter, um Verständnis von Gefühlen und Verhaltensweisen von sich und anderen zu zeigen","items":[{"nr":23,"code":"K-23","keyword":"Kreativität","description":"Drückt Gefühle kreativ aus.","zielformulierungen":["Ich drücke meine Gefühle durch Kunst, Musik oder Tanz aus."]},{"nr":24,"code":"K-24","keyword":"Fortschritt","description":"Zeigt Bewusstsein für Fortschritt.","zielformulierungen":["Ich erkenne meinen eigenen Fortschritt."]},{"nr":25,"code":"K-25","keyword":"Beeinflussung","description":"Erklärt Verhaltensbeeinflussung.","zielformulierungen":["Ich erkläre, wie mein Verhalten andere beeinflusst."]},{"nr":26,"code":"K-26","keyword":"Gefühle - ich","description":"Drückt eigene Gefühle aus.","zielformulierungen":["Ich drücke meine Gefühle mit passenden Worten aus."]},{"nr":27,"code":"K-27","keyword":"Beziehung","description":"Knüpft positive Beziehungen.","zielformulierungen":["Ich spreche freundlich, um Beziehungen aufzubauen."]},{"nr":28,"code":"K-28","keyword":"unterstützen","description":"Lobt und unterstützt andere.","zielformulierungen":["Ich lobe andere, wenn sie etwas gut gemacht haben."]},{"nr":29,"code":"K-29","keyword":"Relationen","description":"Beschreibt Ursache-Wirkung.","zielformulierungen":["Ich beschreibe den Zusammenhang zwischen Gefühlen und Verhalten."]}]},"5":{"name":"Stufe V: Anwenden von individuellen und gruppenbezogenen Fähigkeiten in neuen Situationen","ziel":"Verwendet Wörter, um Beziehungen auszubauen und zu pflegen","items":[{"nr":30,"code":"K-30","keyword":"komplexe Aussagen","description":"Formuliert komplexe Aussagen.","zielformulierungen":["Ich drücke mich in komplexen Sätzen aus."]},{"nr":31,"code":"K-31","keyword":"Ausgleich","description":"Wählt versöhnliche Sprache.","zielformulierungen":["Bei Provokationen versuche ich zu schlichten."]},{"nr":32,"code":"K-32","keyword":"Anerkennung","description":"Anerkennt Beiträge anderer.","zielformulierungen":["Ich anerkenne die Beiträge anderer."]},{"nr":33,"code":"K-33","keyword":"Motive","description":"Beschreibt verschiedene Motive.","zielformulierungen":["Ich verstehe, dass Menschen verschiedene Motive haben."]},{"nr":34,"code":"K-34","keyword":"Ideale","description":"Beschreibt eigene Wertvorstellungen.","zielformulierungen":["Ich beschreibe, was mir wichtig ist im Leben."]},{"nr":35,"code":"K-35","keyword":"Erhalt/Pflege","description":"Pflegt positive Beziehungen.","zielformulierungen":["Ich pflege meine Beziehungen durch gute Kommunikation."]}]}}},"sozialisation":{"name":"Sozialisation","code":"SOZ","stufen":{"1":{"name":"Stufe I: Mit Freude auf die Umwelt reagieren","ziel":"Einem Erwachsenen genügend vertrauen, um auf ihn zu reagieren","items":[{"nr":1,"code":"SOZ-1","keyword":"Gegenwart","description":"Ist sich der Gegenwart anderer bewusst.","zielformulierungen":["Wenn die/der Lehrer:in mich berührt, drehe ich mich um."]},{"nr":2,"code":"SOZ-2","keyword":"Gerichtetheit","description":"Richtet Aufmerksamkeit auf andere.","zielformulierungen":["Wenn die/der Lehrer:in mir sagt, dass ich zuschauen soll, tue ich das."]},{"nr":3,"code":"SOZ-3","keyword":"Eigenname","description":"Reagiert auf eigenen Namen.","zielformulierungen":["Wenn die/der Lehrer:in mich mit Namen ruft, schaue ich hin."]},{"nr":4,"code":"SOZ-4","keyword":"Spiel - allein","description":"Spielt für sich allein.","zielformulierungen":["Ich spiele alleine, wenn es nötig ist."]},{"nr":5,"code":"SOZ-5","keyword":"nonverbale Interaktion","description":"Interagiert nonverbal.","zielformulierungen":["Wenn ich etwas möchte, zeige ich auf den Gegenstand."]},{"nr":6,"code":"SOZ-6","keyword":"kommen","description":"Kommt, wenn gerufen.","zielformulierungen":["Wenn die/der Lehrer:in mich ruft, gehe ich zu ihr/ihm."]},{"nr":7,"code":"SOZ-7","keyword":"Aufforderungen","description":"Versteht Aufforderungen.","zielformulierungen":["Wenn die/der Lehrer:in mich um etwas bittet, erledige ich es."]},{"nr":8,"code":"SOZ-8","keyword":"Wörter - Erwachsener","description":"Produziert Wörter für Erwachsene.","zielformulierungen":["Ich spreche mit der/dem Lehrer:in, wenn ich etwas möchte."]},{"nr":9,"code":"SOZ-9","keyword":"Selbst-Bewusstheit","description":"Zeigt Selbstbewusstheit.","zielformulierungen":["Ich erzähle von mir und gebrauche: ich, mein, mir."]},{"nr":10,"code":"SOZ-10","keyword":"Spiel - parallel","description":"Nimmt an parallelem Spiel teil.","zielformulierungen":["Ich spiele alleine neben anderen."]},{"nr":11,"code":"SOZ-11","keyword":"Wörter - Peer","description":"Produziert Wörter für Gleichaltrige.","zielformulierungen":["Ich spreche mit dem anderen Kind, wenn ich etwas möchte."]},{"nr":12,"code":"SOZ-12","keyword":"Kontaktsuche","description":"Sucht Kontakt mit Erwachsenen.","zielformulierungen":["Wenn der Unterricht beginnt, begrüße ich die/den Lehrer:in."]}]},"2":{"name":"Stufe II: Erfolgreich auf die Umwelt reagieren","ziel":"Sich erfolgreich an Aktivitäten beteiligen","items":[{"nr":13,"code":"SOZ-13","keyword":"Fantasie","description":"Beschäftigt sich mit Fantasiespielen.","zielformulierungen":["Ich denke mir selber etwas zum Spielen aus."]},{"nr":14,"code":"SOZ-14","keyword":"warten","description":"Wartet ohne Hilfe.","zielformulierungen":["Ich warte bis ich an der Reihe bin."]},{"nr":15,"code":"SOZ-15","keyword":"Kontakt","description":"Nimmt sozialen Kontakt auf.","zielformulierungen":["Ich gehe freundlich auf meine Mitschüler:innen zu."]},{"nr":16,"code":"SOZ-16","keyword":"teilen","description":"Teilt mit anderen.","zielformulierungen":["Ich teile mit anderen Kindern."]},{"nr":17,"code":"SOZ-17","keyword":"Spiel interaktiv","description":"Beteiligt sich an interaktivem Spiel.","zielformulierungen":["Ich spiele friedlich mit anderen Kindern zusammen."]},{"nr":18,"code":"SOZ-18","keyword":"Kooperation","description":"Kooperiert mit anderen Kindern.","zielformulierungen":["Bei Partnerarbeiten arbeite ich mit einem anderen Kind zusammen."]}]},"3":{"name":"Stufe III: Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen","ziel":"Gruppenaktivitäten als befriedigend erleben","items":[{"nr":19,"code":"SOZ-19","keyword":"abwechseln","description":"Teilt und wechselt sich ab.","zielformulierungen":["Ich teile und wechsele mich mit anderen Kindern ab."]},{"nr":20,"code":"SOZ-20","keyword":"nachahmen","description":"Ahmt gutes Verhalten nach.","zielformulierungen":["Wenn andere sich gut verhalten, mache ich es auch."]},{"nr":21,"code":"SOZ-21","keyword":"werten","description":"Bewertet soziale Situationen.","zielformulierungen":["Ich sage, ob ich etwas richtig oder falsch finde."]},{"nr":22,"code":"SOZ-22","keyword":"leiten","description":"Leitet Gruppenaktivitäten.","zielformulierungen":["Ich zeige oder erkläre anderen, wie etwas gemacht wird."]},{"nr":23,"code":"SOZ-23","keyword":"Vorschlag - andere","description":"Akzeptiert Vorschläge anderer.","zielformulierungen":["Ich akzeptiere Vorschläge meiner Mitschüler:innen."]},{"nr":24,"code":"SOZ-24","keyword":"Erfahrungen","description":"Beschreibt Erfahrungen.","zielformulierungen":["Ich erzähle in der richtigen Reihenfolge, was passiert ist."]},{"nr":25,"code":"SOZ-25","keyword":"Vorliebe","description":"Zeigt Vorliebe für bestimmte Kinder.","zielformulierungen":["Ich nehme Kontakt zu einem Kind auf, das ich besonders mag."]},{"nr":26,"code":"SOZ-26","keyword":"Unterstützung","description":"Sucht Hilfe bei anderen Kindern.","zielformulierungen":["Ich frage andere Kinder um Hilfe."]},{"nr":27,"code":"SOZ-27","keyword":"Gruppenregeln","description":"Hilft bei der Einhaltung von Regeln.","zielformulierungen":["Ich erinnere andere freundlich an die Gruppenregeln."]}]},"4":{"name":"Stufe IV: Sich einbringen in Gruppenprozesse","ziel":"Nimmt von sich aus und erfolgreich als Gruppenmitglied an Aktivitäten teil","items":[{"nr":28,"code":"SOZ-28","keyword":"identifizieren","description":"Identifiziert sich mit Vorbildern.","zielformulierungen":["Ich orientiere mich an positiven Vorbildern."]},{"nr":29,"code":"SOZ-29","keyword":"Gruppenerfahrung","description":"Beschreibt Gruppenerfahrungen.","zielformulierungen":["Ich erzähle von Gruppenerlebnissen."]},{"nr":30,"code":"SOZ-30","keyword":"Gruppenaktivität","description":"Schlägt Gruppenaktivitäten vor.","zielformulierungen":["Ich schlage der Gruppe Aktivitäten vor."]},{"nr":31,"code":"SOZ-31","keyword":"Verschiedenheit","description":"Erkennt Verschiedenheit.","zielformulierungen":["Ich erkenne Unterschiede zwischen meinem Verhalten und dem anderer."]},{"nr":32,"code":"SOZ-32","keyword":"Respekt","description":"Respektiert Meinungen anderer.","zielformulierungen":["Ich höre anderen zu und respektiere ihre Meinung."]},{"nr":33,"code":"SOZ-33","keyword":"Interesse","description":"Interessiert sich für Meinung anderer.","zielformulierungen":["Mich interessiert die Meinung anderer über mich."]},{"nr":34,"code":"SOZ-34","keyword":"Lösungsvorschlag","description":"Macht konstruktive Vorschläge.","zielformulierungen":["Bei Problemen mache ich konstruktive Vorschläge."]},{"nr":35,"code":"SOZ-35","keyword":"Wertvorstellung","description":"Erkennt verschiedene Werte.","zielformulierungen":["Ich unterscheide zwischen richtig und falsch."]},{"nr":36,"code":"SOZ-36","keyword":"Schlussfolgerungen","description":"Zieht Schlussfolgerungen.","zielformulierungen":["Ich lerne aus sozialen Situationen."]}]},"5":{"name":"Stufe V: Anwenden von individuellen und gruppenbezogenen Fähigkeiten in neuen Situationen","ziel":"Beginnt und pflegt selbständig dauerhafte und tragfähige Beziehungen mit anderen","items":[{"nr":37,"code":"SOZ-37","keyword":"Empathie","description":"Versteht Gefühle anderer.","zielformulierungen":["Ich verstehe, wie sich andere fühlen."]},{"nr":38,"code":"SOZ-38","keyword":"verschiedene Rollen","description":"Interagiert in verschiedenen Rollen.","zielformulierungen":["Ich kann verschiedene Rollen in einer Gruppe übernehmen."]},{"nr":39,"code":"SOZ-39","keyword":"Prinzipien","description":"Entscheidet nach eigenen Werten.","zielformulierungen":["Ich entscheide nach meinen eigenen Werten."]},{"nr":40,"code":"SOZ-40","keyword":"Selbstverständnis","description":"Zeigt realistisches Selbstverständnis.","zielformulierungen":["Ich kenne meine Stärken und Schwächen realistisch."]},{"nr":41,"code":"SOZ-41","keyword":"Interpersonalität","description":"Baut dauerhafte Beziehungen auf.","zielformulierungen":["Ich baue langfristige Freundschaften auf."]}]}}},"kognition":{"name":"Kognition","code":"KOG","stufen":{"1":{"name":"Stufe I: Mit Freude auf die Umwelt reagieren","ziel":"Auf die Umgebung reagieren mit gezielten Körperbewegungen und elementaren mentalen Verarbeitungsprozessen","items":[{"nr":1,"code":"KOG-1","keyword":"Orientierung","description":"Reagiert auf sensorischen Reiz.","zielformulierungen":["Ich wende mich Reizen zu, die mich interessieren."]},{"nr":2,"code":"KOG-2","keyword":"Aufmerksamkeit","description":"Zeigt kurze Aufmerksamkeit.","zielformulierungen":["Ich bleibe kurz aufmerksam bei einer Sache."]},{"nr":3,"code":"KOG-3","keyword":"Kurzzeitgedächtnis","description":"Erkennt Personen/Objekte wieder.","zielformulierungen":["Ich erkenne bekannte Personen und Dinge wieder."]},{"nr":4,"code":"KOG-4","keyword":"komplexe Reaktionen","description":"Reagiert auf komplexe Reize.","zielformulierungen":["Ich reagiere auf Anweisungen mit Handlungen."]},{"nr":5,"code":"KOG-5","keyword":"einfache Imitation","description":"Imitiert einfache Handlungen.","zielformulierungen":["Ich mache einfache Handlungen nach."]},{"nr":6,"code":"KOG-6","keyword":"Motorik 18 Monate","description":"Zeigt grundlegende Motorik.","zielformulierungen":["Ich zeige grundlegende motorische Fähigkeiten."]},{"nr":7,"code":"KOG-7","keyword":"Bezeichnung","description":"Versteht Objektbezeichnungen.","zielformulierungen":["Ich verstehe die Namen von bekannten Dingen."]},{"nr":8,"code":"KOG-8","keyword":"Wort-Annäherung","description":"Reagiert verbal auf Fragen.","zielformulierungen":["Ich antworte auf Fragen mit Worten."]},{"nr":9,"code":"KOG-9","keyword":"Wörter spontan","description":"Verwendet Wörter spontan.","zielformulierungen":["Ich benutze Wörter von mir aus."]},{"nr":10,"code":"KOG-10","keyword":"Form","description":"Erkennt Formen.","zielformulierungen":["Ich erkenne Formen und ordne sie zu."]},{"nr":11,"code":"KOG-11","keyword":"Körperteile","description":"Identifiziert Körperteile.","zielformulierungen":["Ich zeige und benenne meine Körperteile."]},{"nr":12,"code":"KOG-12","keyword":"Details","description":"Erkennt Details in Bildern.","zielformulierungen":["Ich erkenne Details in Bildern."]},{"nr":13,"code":"KOG-13","keyword":"sortieren","description":"Sortiert Objekte.","zielformulierungen":["Ich sortiere Dinge nach Merkmalen."]},{"nr":14,"code":"KOG-14","keyword":"Bilder benennen","description":"Benennt Bilder.","zielformulierungen":["Ich benenne Bilder mit den richtigen Wörtern."]}]},"2":{"name":"Stufe II: Erfolgreich auf die Umwelt reagieren","ziel":"Beteiligung an Aktivitäten, die Fähigkeiten der Selbsthilfe, motorischen Koordination, Sprache sowie mentale Prozesse erfordern","items":[{"nr":15,"code":"KOG-15","keyword":"Gebrauchswert","description":"Erkennt Gebrauchswert.","zielformulierungen":["Ich weiß, wofür man Dinge benutzt."]},{"nr":16,"code":"KOG-16","keyword":"Körper - 3","description":"Motorik eines 3-Jährigen.","zielformulierungen":["Ich bewege mich altersgemäß."]},{"nr":17,"code":"KOG-17","keyword":"Serie - identisch","description":"Ordnet identische Bilder zu.","zielformulierungen":["Ich finde gleiche Bilder."]},{"nr":18,"code":"KOG-18","keyword":"Feinmotorik - 3","description":"Feinmotorik eines 3-Jährigen.","zielformulierungen":["Ich kann feine Bewegungen machen."]},{"nr":19,"code":"KOG-19","keyword":"Serie - anders","description":"Erkennt Unterschiede.","zielformulierungen":["Ich finde das, was anders ist."]},{"nr":20,"code":"KOG-20","keyword":"Gegenteile","description":"Versteht Gegenteile.","zielformulierungen":["Ich kenne Gegenteile wie groß/klein."]},{"nr":21,"code":"KOG-21","keyword":"kategorisieren","description":"Kategorisiert Bilder.","zielformulierungen":["Ich ordne Dinge in Gruppen."]},{"nr":22,"code":"KOG-22","keyword":"zählen - 4","description":"Zählt bis 4.","zielformulierungen":["Ich zähle bis 4."]},{"nr":23,"code":"KOG-23","keyword":"Farben","description":"Identifiziert Farben/Formen.","zielformulierungen":["Ich kenne Farben und Formen."]},{"nr":24,"code":"KOG-24","keyword":"Alternation","description":"Wechselt zwischen Aufgaben.","zielformulierungen":["Ich kann zwischen Aufgaben wechseln."]},{"nr":25,"code":"KOG-25","keyword":"zählen - 10","description":"Zählt bis 10.","zielformulierungen":["Ich zähle bis 10."]},{"nr":26,"code":"KOG-26","keyword":"Auge-Hand-5","description":"Auge-Hand-Koordination 5 Jahre.","zielformulierungen":["Meine Augen und Hände arbeiten gut zusammen."]},{"nr":27,"code":"KOG-27","keyword":"unterscheiden","description":"Unterscheidet Ziffern/Buchstaben.","zielformulierungen":["Ich unterscheide Zahlen von Buchstaben."]},{"nr":28,"code":"KOG-28","keyword":"Körper - 5","description":"Motorik eines 5-Jährigen.","zielformulierungen":["Ich bewege mich wie ein 5-Jähriger."]},{"nr":29,"code":"KOG-29","keyword":"Objekte - 5","description":"Erkennt Mengen bis 5.","zielformulierungen":["Ich erkenne kleine Mengen auf einen Blick."]},{"nr":30,"code":"KOG-30","keyword":"Gedächtnis","description":"Gibt Auswendiggelerntes wieder.","zielformulierungen":["Ich kann Lieder und Reime auswendig."]},{"nr":31,"code":"KOG-31","keyword":"Bilderserie","description":"Ordnet Bilder in Reihenfolge.","zielformulierungen":["Ich bringe Bilder in die richtige Reihenfolge."]}]},"3":{"name":"Stufe III: Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen","ziel":"Beteiligt sich erfolgreich in einer Lerngruppe und setzt dabei grundlegende Lernkompetenzen ein","items":[{"nr":32,"code":"KOG-32","keyword":"Auge-Hand-6","description":"Auge-Hand-Koordination 6 Jahre.","zielformulierungen":["Ich kann präzise mit meinen Händen arbeiten."]},{"nr":33,"code":"KOG-33","keyword":"Körper - 6","description":"Motorik eines 6-Jährigen.","zielformulierungen":["Ich kann mich gut bewegen."]},{"nr":34,"code":"KOG-34","keyword":"lesen - 50","description":"Liest 50 Grundwörter.","zielformulierungen":["Ich lese einfache Wörter."]},{"nr":35,"code":"KOG-35","keyword":"Zahlen - 10","description":"Erkennt/schreibt Zahlen bis 10.","zielformulierungen":["Ich schreibe die Zahlen von 1 bis 10."]},{"nr":36,"code":"KOG-36","keyword":"schreiben - 50","description":"Schreibt 50 Grundwörter.","zielformulierungen":["Ich schreibe einfache Wörter."]},{"nr":37,"code":"KOG-37","keyword":"Verständnis","description":"Versteht Geschichten.","zielformulierungen":["Ich verstehe Geschichten, die ich höre."]},{"nr":38,"code":"KOG-38","keyword":"erklären","description":"Erklärt Verhalten anderer.","zielformulierungen":["Ich erkläre, warum jemand etwas tut."]},{"nr":39,"code":"KOG-39","keyword":"Sinnentnahme","description":"Versteht gelesene Sätze.","zielformulierungen":["Ich verstehe, was ich lese."]},{"nr":40,"code":"KOG-40","keyword":"Plus/Minus - 9","description":"Rechnet bis 9.","zielformulierungen":["Ich rechne Plus und Minus bis 9."]},{"nr":41,"code":"KOG-41","keyword":"Unlogik","description":"Erkennt Unstimmigkeiten.","zielformulierungen":["Ich erkenne, wenn etwas nicht stimmt."]},{"nr":42,"code":"KOG-42","keyword":"Antwortsätze","description":"Schreibt Antwortsätze.","zielformulierungen":["Ich schreibe Antworten in ganzen Sätzen."]},{"nr":43,"code":"KOG-43","keyword":"Sport - Spiele","description":"Zeigt motorische Kompetenz.","zielformulierungen":["Ich kann Sport- und Bewegungsspiele mitmachen."]},{"nr":44,"code":"KOG-44","keyword":"Sätze frei","description":"Formuliert eigene Sätze.","zielformulierungen":["Ich schreibe eigene Sätze."]},{"nr":45,"code":"KOG-45","keyword":"numerische Konzepte","description":"Rechnet mit Zeit und Geld.","zielformulierungen":["Ich rechne mit Zeit und Geld."]},{"nr":46,"code":"KOG-46","keyword":"Quantitativa","description":"Versteht Maßeinheiten.","zielformulierungen":["Ich verstehe Maßeinheiten."]},{"nr":47,"code":"KOG-47","keyword":"Sachverhalte","description":"Liest und erzählt Geschichten.","zielformulierungen":["Ich lese Geschichten und erzähle sie nach."]},{"nr":48,"code":"KOG-48","keyword":"Operationen","description":"Rechnet mit größeren Zahlen.","zielformulierungen":["Ich rechne mit größeren Zahlen."]}]},"4":{"name":"Stufe IV: Sich einbringen in Gruppenprozesse","ziel":"Gebraucht kognitive und schulische Fähigkeiten, um sich erfolgreich an sozialen Gruppenerfahrungen zu beteiligen","items":[{"nr":49,"code":"KOG-49","keyword":"Kommunikation","description":"Schreibt zum Mitteilen.","zielformulierungen":["Ich schreibe, um mich mitzuteilen."]},{"nr":50,"code":"KOG-50","keyword":"Mult./Divis. 100","description":"Rechnet Mal/Geteilt bis 100.","zielformulierungen":["Ich rechne Mal und Geteilt bis 100."]},{"nr":51,"code":"KOG-51","keyword":"Informationsgewinn","description":"Liest zum Lernen.","zielformulierungen":["Ich lese gerne, um Neues zu lernen."]},{"nr":52,"code":"KOG-52","keyword":"Geldmenge - 10€","description":"Rechnet mit Geld bis 10€.","zielformulierungen":["Ich rechne mit Geld bis 10 Euro."]},{"nr":53,"code":"KOG-53","keyword":"Fiktion","description":"Versteht fiktive Charaktere.","zielformulierungen":["Ich verstehe Figuren aus Geschichten."]},{"nr":54,"code":"KOG-54","keyword":"Grammatik","description":"Verwendet Grammatik korrekt.","zielformulierungen":["Ich schreibe grammatisch richtig."]},{"nr":55,"code":"KOG-55","keyword":"Wertvorstellungen","description":"Erkennt verschiedene Werte.","zielformulierungen":["Ich erkenne verschiedene Werte."]},{"nr":56,"code":"KOG-56","keyword":"Konzepte","description":"Löst logische Probleme.","zielformulierungen":["Ich löse Probleme mit Maßeinheiten."]}]},"5":{"name":"Stufe V: Anwenden von individuellen und gruppenbezogenen Fähigkeiten in neuen Situationen","ziel":"Setzt erfolgreich kognitive Fähigkeiten zur Bereicherung persönlicher Erfahrungen ein","items":[{"nr":57,"code":"KOG-57","keyword":"Zeitgeschichte","description":"Interessiert sich für aktuelle Themen.","zielformulierungen":["Ich interessiere mich für aktuelle Themen."]},{"nr":58,"code":"KOG-58","keyword":"Meinungen","description":"Unterscheidet Fakten/Meinungen.","zielformulierungen":["Ich unterscheide Fakten von Meinungen."]},{"nr":59,"code":"KOG-59","keyword":"Inkonsistenz","description":"Erkennt widersprüchliches Verhalten.","zielformulierungen":["Ich erkenne widersprüchliches Verhalten."]},{"nr":60,"code":"KOG-60","keyword":"Textaufgaben","description":"Löst schwierige Textaufgaben.","zielformulierungen":["Ich löse schwierige Textaufgaben."]},{"nr":61,"code":"KOG-61","keyword":"Einsicht","description":"Löst Probleme durch Analyse.","zielformulierungen":["Ich löse Probleme durch Nachdenken."]},{"nr":62,"code":"KOG-62","keyword":"Bürger/in","description":"Nutzt Wissen im Alltag.","zielformulierungen":["Ich nutze mein Wissen im Alltag."]}]}}}},"interventionen":{"V-1":["Ziel zu Beginn der Aktivität aktivieren","Wahrnehmungsreaktionen des Kindes spiegeln"],"V-2":["Ziel zu Beginn der Aktivität aktivieren","Geschichten vorlesen und dabei Bilder zeigen","Sinnes- und Versteckspiele anbieten (Rasseln, buntes Spielzeug, Spielzeug hinter verschiedenen Texturen verstecken)","Aufmerksamkeit mit Stimme, Mimik und Gesten wecken (winken, klatschen, Geräusche erzeugen)","Reize regelmäßig wiederholen und dem Kind Zeit zum Reagieren lassen","Hinwendung zu Reizen spiegeln"],"V-3":["Aufmerksames Verhalten einzeln und in der Gruppe spiegeln","Aufmerksamkeit gezielt auf kurze Erklärungsphasen lenken","Mit visuellen Verstärkungssignalen arbeiten (Piktogramme)","Kurze, prägnante Reize einsetzen, die das Interesse wecken","Interaktive Spiele anbieten (z. B. auf ein Signal hin einen Ball fangen)","Material anbieten, das neugierig macht (Bausteine, Musikinstrumente)"],"V-4":["Verhaltensanweisungen gezielt und direkt formulieren","Individuelle Verhaltensanweisungen ausarbeiten und vertiefen","Konzentration fördern","Spielerische Anreize anbieten"],"V-5":["Gezielte Aktivitäten anbieten","Rollenspiele und praktische Übungen einsetzen","Klare Anweisungen und Erklärungen geben","Die Umgebung strukturieren"],"V-6":["Routineabläufe fest einführen und beibehalten","Piktogramme einsetzen","Handgriffe vormachen (Lernen am Modell)","Wahlmöglichkeiten anbieten","Eine unterstützende Umgebung schaffen"],"V-7":["Verhaltensanforderung klar benennen","Aufräumaktivitäten zur Zielerreichung nutzen","Vielfältige Spielmaterialien anbieten","Freies Spiel ermöglichen","Beim Spiel beobachten und unterstützen","Material übersichtlich und leicht zugänglich ordnen"],"V-8":["Stunden- und Tagesablauf visualisieren","Klar abgegrenzte Aktivitätsbereiche in der Klasse einrichten","Rituale verlässlich einhalten","Routineabläufe fest einführen und beibehalten"],"V-9":["Spielerfahrungen zulassen","Mitspielen und Vorbild sein (Lernen am Modell)","Klare Spielregeln festlegen und die damit verbundenen Verhaltensanforderungen benennen","Angemessenen Umgang mit dem Material spiegeln","Die Kontrolle über das Material beim Erwachsenen lassen","Grenzen setzen und konsequent anleiten"],"V-10":["Gelungenes Warten spiegeln","Physische Nähe anbieten","Wahlmöglichkeiten anbieten","Konkrete Verhaltensanweisungen geben","Wartezeit sichtbar machen (Time Timer, Sanduhr, Handzeichen)","Vorhersehbare Routinen einführen: wo gewartet wird und wie lange es dauert"],"V-11":["Sitzenbleiben spiegeln","Ziel konkret an der Tafel oder auf dem Pult des Kindes aktivieren","Zeitliche Struktur festlegen und sichtbar machen (Sanduhr, Time Timer, vereinbartes Zeichen)","Physische Nähe anbieten","Interessante Aktivitäten in sehr kleinen Gruppen anbieten","Bewegungspausen einplanen"],"V-12":["Eine feste zeitliche Struktur vorgeben","Wiederkehrende Abläufe einplanen","Zielverhalten mit Piktogrammen visualisieren","Ziel vor der Bewegungsaktivität konkret aktivieren","Ansprechende Bewegungspausen anbieten, die Interesse und Motivation wecken"],"V-13":["Ziel einführen und vor der Aktivität aktivieren","Mitmachen spiegeln","Selbst mitmachen und Vorbild sein (Nachahmung ermöglichen)","Physisch präsent sein","Den Tagesablauf mit wiederkehrenden Abläufen strukturieren","Interessen und Vorlieben des Kindes berücksichtigen, passend zu seiner Entwicklungsstufe"],"V-14":["Ziel aktivieren und klare Erwartungen formulieren","Angemessene Reaktion auf Lob spiegeln","Lobsituationen erkennen, im Rollenspiel herbeiführen und reflektieren","Ritual „Siegesfaust“ einführen","Selbstwertgefühl stärken: eigene Stärken bewusst machen, ermutigen","Gefühle und Körperreaktionen besprechen, Techniken zur Selbstkontrolle üben"],"V-15":["Kurze, differenzierte Aufgaben geben, die Erfolg sichern (Überforderung vermeiden)","Aufgaben übersichtlich gliedern (eine Aufgabe pro Seite, Blätter einzeln austeilen)","Ziel „Beenden“ visualisieren und die Arbeitszeit mit dem Time Timer ankündigen","Arbeitsschritte mit einem 5-Schritte-Plan anleiten (verstehen, Material bereitlegen, erledigen, durchlesen, verbessern)","An ähnliche, schon gelöste Aufgaben erinnern und ermutigen","Beenden spiegeln und kleine Leistungen positiv rückmelden"],"V-16":["Ziele und Regeln visualisieren","Klare Regeln aufstellen und erklären","Ziele und Regeln zu festen Zeiten aktivieren und einüben","Regelbewusstes Verhalten spiegeln und positiv rückmelden","Vorbild sein","Zum Sprechen über Gefühle, Gedanken und Erfahrungen ermutigen, um Missverständnisse zu vermeiden"],"V-17":["Den Sinn der vorhandenen Regeln gemeinsam erarbeiten","Die Notwendigkeit von Regeln an Alltagssituationen, Situationskarten und Erlebtem herausarbeiten","Im Klassenrat Verhalten, Handlungen und Folgen reflektieren","Verhaltenserwartungen gemeinsam festlegen und die Schulregeln visualisieren","Verhaltensweisen im Rollenspiel einüben","Begründungen spiegeln und in der kognitiven Rückschau aufgreifen"],"V-18":["Im Klassenrat gemeinsam nach Verhaltensalternativen suchen","Alternativen im Rollenspiel und in Emotionsprojekten erarbeiten","Lösungswege für kritische Situationen vereinbaren (auf Erwachsene zugehen, um Hilfe bitten, einen sicheren Ort aufsuchen)","Beruhigungsstrategien einüben (langsam zählen, Atemübungen, Achtsamkeit)","Erwartungen klar verbalisieren und mit Piktogrammen sowie Tages- und Wochenzielen stützen","Umlenken und den Blick auf das Positive lenken (Spiegeln)"],"V-19":["Mit Partnerarbeit einsteigen, dann Gruppenaktivitäten anbieten und begleiten","Rollen anfangs selbst verteilen","Wöchentlich abwechselnd eine Gruppenleitung wählen lassen","Die Rolle der Gruppenleitung erklären und verinnerlichen lassen","Themen „Fairness“, „Zusammenhalt“ und „Leitung“ behandeln","Angemessenes Verhalten als Leitung und als Mitglied spiegeln und rückmelden"],"V-20":["Regeln, Ziele und Räume für die Aktivitäten vorab festlegen","Aktivitäten passend zum Entwicklungsstand in kleine Einheiten gliedern","Zurückhaltendes Verhalten spiegeln","Verhalten interpretieren (Hintergründe erklären)","Am Ende der Aktivität sofort und konkret die erzielten Fortschritte rückmelden","Neuorientierung oder Umgestaltung der Aktivität einplanen"],"V-21":["Gruppenaktivitäten anbieten (Arbeitsphasen, Sport, Kunst, Gruppenspiele, Ausflüge)","Ein strukturiertes Umfeld schaffen","Möglichkeiten zum Austoben geben (Pausen, Bewegungsaktivitäten)","Aktivitäten und Übergänge vorher vorbereiten","Vorbild sein","Übungen zur Selbstregulation durchführen"],"V-22":["Konkrete Ziele setzen und Fortschritte gemeinsam mit dem Kind verfolgen","Kognitive Rückschau nutzen","Selbstreflexion ermöglichen","Gesprächsanlässe über das eigene Verhalten anbieten","Alternative Handlungsmöglichkeiten anbieten","Fortschritte positiv rückmelden"],"V-23":["Mit gezielten kleinen Änderungen im Ablauf üben","Angepasstes Verhalten bei Veränderungen im Rollenspiel einüben","Änderungen klar kommunizieren: das Warum erklären und sagen, was erwartet wird","Änderungen visualisieren (Zeitplan, Piktogramme)"],"V-24":["Neues klar erklären und anleiten","Visualisierungshilfen anbieten","In kleinen Schritten vorgehen, üben und wiederholen","Neues vormachen (Lernen am Modell)","Entspannungstechniken zum Stressabbau anbieten","Mitmachen positiv verstärken"],"V-25":["Regeln vor der Stunde wiederholen","Kognitive Rückschau nutzen","Rollenspiele und Simulationen einsetzen","Konfliktlösung trainieren (über Gefühle sprechen, Kompromisse finden, Lösungen aushandeln)","Zu respektvollem Umgang mit anderen ermutigen"],"V-26":["Provokationssituationen mit dem Kind besprechen","Strategien für den Umgang mit Provokationen entwickeln (Situation verlassen, Atemübungen)","Angemessene Reaktionen auf Provokationen spiegeln","Handlungsalternativen besprechen und im Rollenspiel einüben","Kommunikation fördern: Konflikte ansprechen, Gefühle ausdrücken"],"V-27":["Gefühle thematisieren und eigenes Handeln hinterfragen (Gefühlstagebuch, Gefühlsglas, Gefühlskarten, Körperlandkarte)","Konsequenzen erleben lassen (nicht gleichzusetzen mit Strafen)","Regeln und Grenzen setzen","Selbstbewusstsein stärken (Erfolgserlebnisse sichern, eigene Entscheidungen treffen lassen)","Übernahme von Verantwortung positiv verstärken"],"V-28":["Ein sicheres, unterstützendes Umfeld schaffen, in dem Belastendes offen angesprochen werden kann","Zum offenen Sprechen über Gefühle, Bedenken und Sichtweisen ermutigen","Aktiv zuhören","Das Problem gemeinsam benennen und die Ursache verstehen","Lösungen im Brainstorming sammeln","Die Lösung umsetzen, später reflektieren und auswerten"],"V-29":["Gemeinsam erreichbare Ziele setzen","Selbstreflexion anregen","Vorbilder zeigen (Geschichten, Fallbeispiele, Mentoring)","Arbeitsweltbezogene Gewohnheiten in den Unterricht integrieren","Durch den Blick auf Fortschritte und Bemühungen motivieren"],"V-30":["Positive Eigenschaften erkennen und würdigen","Gelegenheiten geben, Verantwortung zu übernehmen (Führungsfähigkeiten fördern)","Teamfähigkeit durch Gruppenprojekte, Teamspiele und kooperative Aktivitäten fördern","Zu Empathie und sozialer Verantwortung ermutigen","Positives Feedback geben"],"V-31":["Werte und Normen vermitteln","Über Recht und Ordnung diskutieren und reflektieren","Praktische Übungen durchführen","Verstößen vorbeugen (Anti-Mobbing-Programme, Konfliktlösungsstrategien, soziale Kompetenzen fördern)","Als Lehrkraft Vorbild sein"],"V-32":["Klassenrat einführen","An der Entwicklung von Regeln beteiligen","Gemeinsame Ziele setzen und klare Erwartungen formulieren","Befähigen, selbst Entscheidungen zu treffen und das Gruppenleben mitzugestalten (Empowerment)","Führungsfähigkeiten fördern und ermutigen","Vorbild sein"],"V-33":["Selbstreflexion anregen","Das Problem benennen","Ursachen analysieren","Lösungsmöglichkeiten suchen","Einen Aktionsplan entwickeln und umsetzen","Das Ergebnis reflektieren und den Plan anpassen"],"K-1":["Laute des Kindes aufgreifen und nachahmen","Lautspiele und Lieder anbieten","Auf Lautäußerungen sofort reagieren"],"K-2":["Blickkontakt herstellen","Stimme und Gestik interessant einsetzen","Kurz und klar sprechen","Das Kind aktiv beteiligen: die sprechende Person anschauen lassen","Hinwenden zur sprechenden Person positiv verstärken"],"K-3":["Vertraute Gegenstände in Sichtweite benennen und auf eine Reaktion warten","Wiederkehrende Schlüsselwörter in Routinen verwenden (z. B. Begrüßung, Abschied)","Gesten als Hilfe schrittweise abbauen, bis das Wort allein genügt","Jede passende Reaktion (Hinschauen, Berühren, Hinwenden) sofort bestätigen"],"K-4":["Einfache Sprache verwenden","Fragen in Spiele und Aktivitäten einbauen (steigert die Motivation)","Auswahlmöglichkeiten für die Antwort geben","Eine sichere, respektvolle Umgebung schaffen","Antwortversuche positiv verstärken"],"K-5":["Wörter für Dinge und Ereignisse klar und deutlich vormachen (Lernen am Modell)","Offene Fragen stellen","Aktivitäten an die Interessen des Kindes anpassen","Wortschatz erweitern","Interaktive Gespräche führen","Spontan verwendete Wörter positiv verstärken"],"K-6":["Relevante Situationen schaffen, in denen ein Wort zum Ziel führt","Wörter vormachen und die Sprache an das Niveau des Kindes anpassen","Piktogramme benutzen","Kontextuelle Hinweise geben (auf das Objekt zeigen, das benannt werden soll)","Gegenstände und Handlungen am konkreten Material benennen (Wortschatz aufbauen)","Such- und Memoryspiele mit Benennen spielen"],"K-7":["Rollenspiele mit minimalem Wortschatz anbieten","Einfache Kooperationsspiele anbieten, die einen kurzen Austausch erfordern","Ziel mit einem Piktogramm visualisieren","Gelungene Ansprache anderer Kinder spiegeln und mit einem Lächeln rückmelden","Gegenstände und Handlungen benennen, Such- und Memoryspiele nutzen","Den Raum klar strukturieren"],"K-8":["Ganze Sätze von Erwachsenen oder anderen Kindern wiederholen lassen","Sätze spiegeln und positiv verstärken","Satzbau spielerisch üben (So-tun-als-ob-Spiele, Kuscheltiere, kleine Rollenspiele)"],"K-9":["Angepasste Fragen gezielt stellen, mit direkter Ansprache und physischer Nähe (z. B. zum Lieblingsfach oder Lieblingsthema)","Visuelle Stützen anbieten","Kooperations- und Gesellschaftsspiele anbieten","Einzelgespräche führen","Kleingruppenarbeit ermöglichen","Zum Antworten ermutigen"],"K-10":["Überprüfen, ob das Gesagte verstanden wurde (Gestik, Mimik, Malen, Antwort ankreuzen)","Verbal und nonverbal unterstützen (z. B. aufs Ohr zeigen)"],"K-11":["Vorbild sein und zum Sprechen und Fragen ermutigen","Freundliches Sprechen einüben (Rollenspiele zu sozialen Situationen, Handpuppen, Geschichten)","Angemessene Kontaktaufnahme üben (jemanden ansprechen, Bedürfnisse formulieren, Fragen stellen)","Giraffensprache einführen","Ziel „Wortsequenzen“ bei Aktivitäten visualisieren","Förderprogramm „Verhaltenstraining für Schulanfänger“ durchführen"],"K-12":["Gezielte Gesprächsanlässe schaffen (Morgenrunde, Rituale, Klassenrat), einzeln oder in der Gruppe","Aktiv zuhören","Sprechspiele anbieten („Ich sehe was, was du nicht siehst“, „Erzähl mir von deinem Lieblingsspielzeug“)"],"K-13":["Kommunikationsaktivitäten planen (Rituale, „Warme Dusche“, Bewegungsspiele)","Übungen zu Unterschieden anbieten (Vergleichsbilder)","Ein Projekt in einer Kleingruppe starten","Animierte Bücher einsetzen"],"K-14":["Gezielte Gesprächsanlässe mit anderen Kindern schaffen (Morgenrunde, Rituale, Klassenrat)","Austausch unter Kindern vormachen (Modellierung)","Eine unterstützende Umgebung schaffen"],"K-15":["Im Morgen- oder Erzählkreis erzählen lassen","Klassenrat nutzen","Pausengespräche führen","Smalltalk bei Übergängen und beim Essen pflegen","Reflexionsrunden durchführen","Gruppenaktivitäten anbieten, die Austausch erfordern"],"K-16":["Gefühlsbarometer oder „Launometer“ einsetzen (eigene Gefühle wahrnehmen und verstehen)","Im Morgenkreis über Gefühle sprechen, offene Fragen stellen","Gefühle mitteilen üben: mit Bildkarten, im Spiel und im Theaterspiel","Die Emotion „Angst“ gemeinsam thematisieren und Ressourcen aufbauen (Toolbox)","Stressbewältigung anbieten (Anti-Stress-Ball basteln, Entspannungsübungen, Methodenkoffer mit Handlungsstrategien)","Angemessenen Gefühlsausdruck spiegeln und Blickkontakt halten"],"K-17":["Verhaltensanforderungen vor dem Gespräch klar formulieren und aktivieren","Gesprächsregeln mit Symbolkarten visualisieren","Klassenrat und Gruppenaktivitäten mit aktiven Rollen nutzen","Aufkommende Impulse im Moment spiegeln und Strategien zur Impulskontrolle einüben","Nonverbale Gesten kennen und darauf reagieren lernen","Bei Bedarf physische Nähe, Umlenken oder Wahlmöglichkeiten einsetzen"],"K-18":["Reflexionsmomente und Abschlussrunden einplanen","Ein positives Tagebuch führen („Glücksheft“)","Ein Portfolio führen","Eigene Stärken bewusst wahrnehmen lassen","Situationsgerechtes Verhalten spiegeln und von weniger angepasstem unterscheiden lernen","Situationen mit Geschichten und Bildkarten veranschaulichen und besprechen"],"K-19":["Stärken und Schwächen visualisieren, Entwicklungsbereiche beschreiben","Situationen als Anlass nutzen, sich selbst zu beschreiben; ermutigen und Positives spiegeln","Ressourcen stärken (Ressourcenkoffer, Ressourcenblume, Kartenset)","Impulskarten zum Selbstwert nutzen (z. B. „Wenn du ein Bonbon wärst …“, Stärken-Schatzkiste)","Mit dem Trainingsbuch „Ich schaffs!“ arbeiten","Kognitive Rückschau am Ende der Aktivität nutzen, kleine Erfolgserlebnisse sichern"],"K-20":["Spiel „Wer bin ich?“ nutzen: Adjektivliste anlegen, Wortschatz erweitern","„Warme Dusche“: Komplimente verteilen und Eigenschaften anderer benennen"],"K-21":["Gefühle auf Fotos und Bildern erkennen (z. B. Bildkarten „Farbenmonster“, Spiel „Das Land der Gefühle“)","Rollenspiele und Pantomime einsetzen","Konfliktsituationen nachbesprechen: Wie hat sich die andere Person gefühlt?","Emotionen in verschiedenen Situationen analysieren (Hörgeschichten, Rollenspiele, Tagebuch)","Zum Ausdruck von Gefühlen ermutigen: verbal, mit Gesten und kreativ (Malen, Briefe, Musik)","Erkennen von Gefühlen spiegeln"],"K-22":["Gruppenaktivitäten und Projektarbeit anbieten","Nach der Gruppenaktivität der Gruppe positiv rückmelden","Kooperationsspiele in der Pause und im Sport anbieten","Reflexionsrunden durchführen"],"K-23":["Gefühle und Eigenschaften künstlerisch darstellen lassen (Malen, Basteln, Tanzen, Musik, Schreiben)","Aufgaben aus der Musik- und Kunsttherapie einsetzen","Sozio-emotionale Themen in die Fächer einbinden","Gefühle im Gefühlstagebuch thematisieren (Gefühlsglas, Gefühlskarten, Körperlandkarte)","Rollenspiele in Gruppen anbieten"],"K-24":["Konkrete Ziele setzen und Fortschritte gemeinsam mit dem Kind verfolgen","Kognitive Rückschau nutzen","Selbstreflexion ermöglichen","Gesprächsanlässe über das eigene Verhalten anbieten","Alternative Handlungsmöglichkeiten anbieten","Fortschritte positiv rückmelden"],"K-25":["Interdependenz thematisieren: wie sich Verhalten gegenseitig beeinflusst","Rollenspiele anbieten","Reflexionsrunden durchführen","Eine Vertrauensperson anbieten","Gefühlskarten nutzen (z. B. „Löwenlaune“)"],"K-26":["Gefühlsrunde mit dem Gefühlsbarometer durchführen","Im Morgenkreis Raum für Gefühle geben","Reflexionsrunden durchführen"],"K-27":["Kontaktaufnahme im Rollenspiel üben","Gezielte Aufgaben übertragen, die Kontakt schaffen (z. B. Obst austeilen, im Sportunterricht Gruppen wählen)","Außerschulische Erlebnisse in der Gruppe ermöglichen"],"K-28":["Team- und Partnerarbeit sowie Teambuilding anbieten","Eine Lobwand einrichten","„Warme Dusche“ durchführen (Komplimente verteilen)"],"K-29":["Konflikte gemeinsam analysieren","Reflexionsmomente schaffen","Wechselwirkung von Gefühlen und Verhalten thematisieren (Interdependenz)","Gruppenaktivitäten anbieten","Präventionsangebote nutzen (Stop-Mobbing, Aufklärung durch die Polizei)","Das Bilderbuch „Der Dachs hat schlechte Laune“ besprechen"],"K-30":["Wortschatz erweitern","Praxisorientierte Aufgaben stellen","Geschichten und Erzählungen analysieren"],"K-31":["Kommunikationstechniken vermitteln","Strategien zum Konfliktmanagement vermitteln","Rollenspiele einsetzen","Empathie thematisieren","Vorbild sein","Versöhnliche Äußerungen positiv verstärken"],"K-32":["Vorbild sein und Beiträge anderer anerkennen","Aktives Zuhören einüben","Gruppenarbeit fördern","Gemeinsame Werte und Normen festlegen"],"K-33":["Diskussionen und Debatten führen","Medieninhalte analysieren","Perspektivenübernahme üben","Empathieübungen durchführen","Reflexionsaufgaben stellen","Differenzierte Sichtweisen positiv verstärken"],"K-34":["Ein unterstützendes Umfeld schaffen","Gelegenheiten zur Selbstpräsentation schaffen","Kommunikationsfähigkeiten fördern","Selbstständigkeit fördern"],"K-35":["Positives Beziehungsverhalten vorleben","Gemeinsame Werte und Normen entwickeln","Empathie fördern","Kommunikative Fähigkeiten gezielt unterrichten"],"SOZ-1":["Ziel mit einem Piktogramm visualisieren","Reaktionen auf Kontakt spiegeln","Mit Mimik rückmelden (Lächeln, freudige Reaktion)","Visuelle oder auditive Reize setzen","Physische Nähe, Blick- oder Körperkontakt anbieten","Den Namen des Kindes gezielt einsetzen (Namenserkennung)"],"SOZ-2":["Ziel mit einem Piktogramm visualisieren","Zuschauen spiegeln","Mit Mimik rückmelden (Lächeln, freudige Reaktion)","Visuelle oder auditive Reize setzen","Die Aufmerksamkeit auf das Geschehen in der Umgebung lenken","Äußerungen des Kindes verbalisieren"],"SOZ-3":["Ziel mit einem Piktogramm visualisieren","Reaktion auf den eigenen Namen spiegeln","Verschiedene Namen aufzählen, das Kind erkennt seinen eigenen"],"SOZ-4":["Ziel mit einem Piktogramm visualisieren","Spielen allein spiegeln","Mit Mimik rückmelden (Lächeln, freudige Reaktion)","Individuelles Spielmaterial bereitstellen","Den Raum in Zonen gliedern und festlegen, wie viele Kinder in jeder Zone spielen dürfen"],"SOZ-5":["Ziel mit einem Piktogramm visualisieren","Nonverbale Mitteilungen spiegeln","Möglichkeiten zur Nachahmung bieten","Mit dem Kind über Zeichen und Gebärden kommunizieren","Kontakt mit Gleichaltrigen fördern"],"SOZ-6":["Ziel mit einem Piktogramm visualisieren","Kommen spiegeln und mit einem Lächeln rückmelden","Feste Signale einführen (Klingel, Handbewegung) und das Wort „kommen“ erarbeiten","Kleine Aufgaben übertragen","Verhaltenskarten oder Gefühlstagebuch nutzen, damit Aufforderungen besser nachvollzogen werden","Regulationsmethoden aus SEE Learning einsetzen"],"SOZ-7":["Aufforderungen deutlich und strukturiert formulieren","Ziel mit einem Piktogramm visualisieren","Befolgen von Aufforderungen spiegeln","Aufgaben in der Klasse verteilen (das Kind hat einen Auftrag)","Visuelle und auditive Signale nutzen (z. B. roter Ball für eine Aufgabe, Musik zum Aufräumen)","Bei Unklarheiten zum Nachfragen ermutigen, das Verstehen von Nachrichten üben"],"SOZ-8":["Relevante Situationen schaffen, in denen ein Wort zum Ziel führt","Wörter vormachen und die Sprache an das Niveau des Kindes anpassen","Piktogramme benutzen","Kontextuelle Hinweise geben (auf das Objekt zeigen, das benannt werden soll)","Gegenstände und Handlungen am konkreten Material benennen (Wortschatz aufbauen)","Such- und Memoryspiele mit Benennen spielen"],"SOZ-9":["Ziel mit einem Piktogramm visualisieren","Äußerungen über sich selbst spiegeln","Sich im Spiegel beobachten und sich selbst malen","Bewusstsein für „mein“ und „sein“ wecken","Etwas Mitgebrachtes in der Klasse vorstellen lassen","Spiele zu Vorlieben anbieten („Was mag ich?“, „Einen Schritt vor, wenn es auf dich zutrifft“)"],"SOZ-10":["Den Raum strukturieren (Spielzonen)","Zum Nachahmen des Spiels anderer ermutigen","Rotationsaktivitäten anbieten: gleiche Aufgaben mit eigenem Material, dann Wechsel"],"SOZ-11":["Rollenspiele mit minimalem Wortschatz anbieten","Einfache Kooperationsspiele anbieten, die einen kurzen Austausch erfordern","Ziel mit einem Piktogramm visualisieren","Gelungene Ansprache anderer Kinder spiegeln und mit einem Lächeln rückmelden","Gegenstände und Handlungen benennen, Such- und Memoryspiele nutzen","Den Raum klar strukturieren"],"SOZ-12":["Ein Begrüßungsritual einführen","Beziehungsarbeit leisten: respektvoll mit den Bedürfnissen des Kindes umgehen","Aktivitäten gemeinsam mit der Lehrkraft anbieten","Botengänge übertragen (z. B. Post zwischen Lehrkräften überbringen)","Alltagsaufgaben üben (beim Bäcker bestellen, im Supermarkt einkaufen)","Kontaktaufnahme über Körperkontakt im Rollenspiel üben"],"SOZ-13":["Ziel mit einem Piktogramm visualisieren","Fantasiekärtchen einsetzen","Das Klassenzimmer in Spielbereiche mit passendem Material gliedern","Geschichten erzählen und nachspielen","Fantasiespiel spiegeln","Kreative Aufgaben vorschlagen, die die Vorstellungskraft anregen"],"SOZ-14":["Gelungenes Warten spiegeln","Physische Nähe anbieten","Wahlmöglichkeiten anbieten","Konkrete Verhaltensanweisungen geben","Wartezeit sichtbar machen (Time Timer, Sanduhr, Handzeichen)","Vorhersehbare Routinen einführen: wo gewartet wird und wie lange es dauert"],"SOZ-15":["Ziel mit einem Piktogramm visualisieren","Freundliche Kontaktaufnahme spiegeln","Austausch durch gezielte Aktivitäten und Gruppenarbeit fördern","Kooperationsspiele anbieten (z. B. Klatschmemory: jedes Kind ist eine Memorykarte)","Aufgaben gezielt verteilen","Kontaktaufnahme im Rollenspiel üben und besprechen"],"SOZ-16":["Ziel mit einem Piktogramm visualisieren","Teilen spiegeln","Aktivitäten mit begrenztem Material anbieten, das geteilt werden muss (z. B. gemeinsam ein Puzzle legen oder einen Turm bauen)","Essen vom Klassenbuffet untereinander aufteilen lassen","Material weitergeben und abwechselnd nutzen lassen","Kooperationsspiele, Rollenspiele und gemeinsame Projekte anbieten (z. B. Klassenzeitung)"],"SOZ-17":["Ziel mit einem Piktogramm visualisieren","Gemeinsames Spielen spiegeln","Spiele zu zweit anbieten (Gesellschaftsspiele, „Nachlaufen“ oder Fußball in der Pause)","Spiele koordinieren und für einen geordneten Ablauf sorgen","Kennenlern-, Vertrauens- und Kooperationsspiele einsetzen","Anschließend reflektieren: Was lief gut? Was ist noch schwierig?"],"SOZ-18":["Ziel mit einem Piktogramm visualisieren","Zusammenarbeit spiegeln und ermutigen","Gemeinsame Aufgaben anbieten (Theater, Puzzle, ein Bild zusammen malen, Gruppenarbeit)","Bewegungen des Partners nachahmen lassen (Spiegelspiele im Sport)","Kompromisse schließen lernen","Kooperationsspiele anbieten"],"SOZ-19":["In Gruppenaktivitäten begrenztes Material bereitstellen, das geteilt werden muss","Abwechseln in Sport- und Gruppenaktivitäten üben"],"SOZ-20":["Erwünschtes Verhalten spiegeln","Eigenes Verhalten und das der anderen reflektieren"],"SOZ-21":["Klassenrat einführen","Soziale Geschichten im Sprachunterricht besprechen"],"SOZ-22":["Gruppenaktivitäten und Projekte mit klarer Rollenaufteilung anbieten, in denen das Kind seine Kompetenzen zeigen kann","Die Leitungsrolle gezielt übertragen","Gruppen- und Kooperationsaktivitäten fördern","Im Rollenspiel eine Rolle mit klaren Aufgaben zuteilen","Stärken in den Vordergrund stellen und darauf aufbauen (z. B. Ansprechperson für Leseaufgaben sein)"],"SOZ-23":["Verschiedene Vorschläge zulassen und abstimmen lassen","Projektarbeiten anbieten","Ermutigen, bei Ideen anderer Kinder mitzumachen"],"SOZ-24":["Ein Morgenritual zum Erzählen einführen (Wochenende, Ferien, Freizeit)","Von einem gemeinsamen Erlebnis erzählen lassen","Nach einem Konflikt den Ablauf im Einzelgespräch der Reihe nach schildern lassen"],"SOZ-25":["Pausen anleiten: vorschlagen, mit wem das Kind die Pause verbringen kann, und das andere Kind einbeziehen","Bei der Gruppenbildung fördernde Konstellationen schaffen"],"SOZ-26":["Partnerarbeit mit Selbsteinschätzung anbieten","Lerntandems im selbstorganisierten Lernen (SOLL) bilden"],"SOZ-27":["Sichtbare Rollen in der Gruppenarbeit vergeben (Regelwächter:in, Zeitwächter:in)","Regeln und Ziele klar erklären und aktivieren","Gemeinsame Vereinbarungen treffen","Gruppendiskussionen führen","Problemlösestrategien vermitteln","Vorbild sein"],"SOZ-28":["Ein Vorbild vorstellen lassen","Texte über positive Vorbilder lesen und herausarbeiten, was sie gut gemacht haben"],"SOZ-29":["Projekte und Gruppenaktivitäten mit anschließender Besprechung durchführen","Pausensituationen gemeinsam besprechen"],"SOZ-30":["Im Einzelsetting eigene Meinungen und Ideen herausarbeiten","Aktivitäten in Kleingruppen planen lassen"],"SOZ-31":["Eine Geschichte vorlesen und Ideen sammeln","Interaktives Theater und Rollenspiele mit unterschiedlichen Charakteren anbieten","Diskussionen zu verschiedenen Meinungen und Sichtweisen anregen, dabei klare Verhaltensanforderungen verbalisieren"],"SOZ-32":["Aktives Zuhören üben","Regeln für respektvolle Kommunikation aufstellen","Offene Diskussionen führen","Empathie fördern","Konfliktlösungskompetenzen entwickeln","Vorbild sein"],"SOZ-33":["Peer-Feedback einbeziehen","Ein unterstützendes Umfeld schaffen","Zur Reflexion anregen","Selbstakzeptanz fördern","Offenheit anerkennen"],"SOZ-34":["Ein sicheres, unterstützendes Umfeld schaffen, in dem Belastendes offen angesprochen werden kann","Zum offenen Sprechen über Gefühle, Bedenken und Sichtweisen ermutigen","Aktiv zuhören","Das Problem gemeinsam benennen und die Ursache verstehen","Lösungen im Brainstorming sammeln","Die Lösung umsetzen, später reflektieren und auswerten"],"SOZ-35":["Offene, respektvolle Diskussionen führen","Beispiele aus dem Alltag besprechen","Wertefragen im Ethikunterricht aufgreifen","Zur Reflexion anregen","Kritisches Denken fördern","Empathie entwickeln"],"SOZ-36":["Soziale Situationen beobachten und analysieren","Fallstudien besprechen und diskutieren","Rollenwechsel üben","Feedback einholen","Vorbilder suchen","Geduldig unterstützen und die Selbstregulation fördern"],"SOZ-37":["Gefühle benennen","Aufmerksames Zuhören üben","Geschichten nutzen, um Gefühle und Sichtweisen anderer zu verstehen","Konfliktlösungskompetenzen stärken","Selbstreflexion anregen","Vorbild sein"],"SOZ-38":["Verschiedene soziale Rollen erleben lassen (Teammitglied, Patenschaft für Jüngere, Praktikum)","Rollenwechsel in Projekten planen","Erwartungen an die jeweilige Rolle vorher besprechen","Erfahrungen in den Rollen gemeinsam reflektieren"],"SOZ-39":["Entscheidungssituationen besprechen","Eigene Werte klären und benennen","Entscheidungen begründen lassen"],"SOZ-40":["Stärken und Schwächen realistisch einschätzen lassen","Persönliche Ziele formulieren","Selbst- und Fremdeinschätzung vergleichen"],"SOZ-41":["Pflege von Beziehungen besprechen (Verlässlichkeit, Vertrauen)","Umgang mit Konflikten in Freundschaften klären","Kontakte in Gruppen und Vereinen unterstützen"],"KOG-1":["Ziel zu Beginn der Aktivität aktivieren","Geschichten vorlesen und dabei Bilder zeigen","Sinnes- und Versteckspiele anbieten (Rasseln, buntes Spielzeug, Spielzeug hinter verschiedenen Texturen verstecken)","Aufmerksamkeit mit Stimme, Mimik und Gesten wecken (winken, klatschen, Geräusche erzeugen)","Reize regelmäßig wiederholen und dem Kind Zeit zum Reagieren lassen","Hinwendung zu Reizen spiegeln"],"KOG-2":["Aufmerksames Verhalten einzeln und in der Gruppe spiegeln","Aufmerksamkeit gezielt auf kurze Erklärungsphasen lenken","Mit visuellen Verstärkungssignalen arbeiten (Piktogramme)","Kurze, prägnante Reize einsetzen, die das Interesse wecken","Interaktive Spiele anbieten (z. B. auf ein Signal hin einen Ball fangen)","Material anbieten, das neugierig macht (Bausteine, Musikinstrumente)"],"KOG-3":["Vertraute Personen und Gegenstände benennen","Versteck- und Wiederfinde-Spiele nutzen","Wiedererkennen freudig bestätigen"],"KOG-4":["Gezielte Aktivitäten anbieten","Rollenspiele und praktische Übungen einsetzen","Klare Anweisungen und Erklärungen geben","Die Umgebung strukturieren"],"KOG-5":["Einfache Handlungen langsam vormachen","Nachahmungsspiele anbieten (Klatschen, Winken)","Gelungene Nachahmung loben"],"KOG-6":["Stapel-, Steck- und Kritzelmaterial anbieten (z. B. einen Turm aus 3–5 Klötzen bauen)","Selbsthilfe im Alltag üben (mit dem Löffel essen, aus dem Becher trinken, Jacke ausziehen)","Bewegungsanlässe schaffen (laufen, Treppen steigen, Dinge schieben und ziehen)","Motorische Fortschritte beobachten und festhalten"],"KOG-7":["Gegenstände im Alltag benennen","Aufforderungen wie „Gib mir …“ und „Zeig mir …“ spielerisch üben","Richtige Auswahl bestätigen"],"KOG-8":["Einfache Sprache verwenden","Fragen in Spiele und Aktivitäten einbauen (steigert die Motivation)","Auswahlmöglichkeiten für die Antwort geben","Eine sichere, respektvolle Umgebung schaffen","Antwortversuche positiv verstärken"],"KOG-9":["Wörter für Dinge und Ereignisse klar und deutlich vormachen (Lernen am Modell)","Offene Fragen stellen","Aktivitäten an die Interessen des Kindes anpassen","Wortschatz erweitern","Interaktive Gespräche führen","Spontan verwendete Wörter positiv verstärken"],"KOG-10":["Formensortierer und Steckpuzzles anbieten","Formen ertasten und benennen","Schwierigkeit schrittweise steigern"],"KOG-11":["Lieder und Spiele zu Körperteilen nutzen","Körperteile am Kind und an der Puppe zeigen","Zeigen und Benennen abwechseln"],"KOG-12":["Bilderbücher gemeinsam betrachten","Nach Details fragen („Wo ist …?“)","Suchbilder anbieten"],"KOG-13":["Sortierspiele mit zwei Kategorien anbieten","Unterschiede gemeinsam benennen","Materialien schrittweise ähnlicher wählen"],"KOG-14":["Bildkarten zum Benennen nutzen","Bilderbücher mit Alltagsdingen betrachten","Benennungen bestätigen und erweitern"],"KOG-15":["Alltagsgegenstände im Rollenspiel nutzen","Fragen stellen: „Wozu braucht man …?“","Gebrauch von Gegenständen vormachen"],"KOG-16":["Bewegungsangebote auf dem Niveau eines 3-jährigen Kindes machen (Dreirad oder Rutschauto fahren, beidbeinig hüpfen)","Gleichgewicht üben (kurz auf einem Bein stehen, auf einer Linie gehen)","Ballspiele anbieten (Ball zurollen und mit beiden Händen fangen)","Einen Bewegungsparcours aufbauen und Fortschritte würdigen"],"KOG-17":["Memory- und Zuordnungsspiele mit gleichen Bildern anbieten","Gleiche Bilder suchen lassen","Aufgaben schrittweise erweitern"],"KOG-18":["Fädeln, Kneten und Malen anbieten","Stifthaltung anbahnen","Feinmotorische Spiele regelmäßig einsetzen"],"KOG-19":["Spiele „Was passt nicht?“ anbieten","Unterschiede benennen lassen","Schwierigkeit schrittweise steigern"],"KOG-20":["Gegenteile mit Gegenständen und Bewegungen erleben (groß/klein)","Bilderpaare zu Gegenteilen zuordnen","Gegenteile im Alltag benennen"],"KOG-21":["Bilder nach Oberbegriffen sortieren (Menschen, Tiere, Fahrzeuge)","Zusammengehörige Bilder verbinden (Hund – Knochen, Pinsel – Farbe)","Gemeinsamkeiten benennen („Warum gehören die zusammen?“)","Zuordnungs- und Lottospiele einsetzen"],"KOG-22":["Zählen mit Zeigen üben (eins-zu-eins)","Zählanlässe im Alltag nutzen","Mengen bis 4 legen lassen"],"KOG-23":["Farben und Formen im Alltag benennen","Sortier- und Zuordnungsspiele anbieten","Zeigen und Benennen abwechselnd üben"],"KOG-24":["Abwechselnd „gleich“ und „anders“ suchen lassen","Klare Signale für den Wechsel geben","Richtiges Wechseln loben"],"KOG-25":["Zählreime und -lieder nutzen","Zählen mit Zeigen bis 10 üben","Mengen im Alltag abzählen lassen"],"KOG-26":["Schneiden entlang von Linien üben","Formen und Menschen zeichnen lassen (Dreieck, Haus, Mensch mit Körper)","Den eigenen Namen nach Vorlage abschreiben lassen","Nachspur- und Schwungübungen anbieten"],"KOG-27":["Ziffern, Zeichen und Buchstaben sortieren lassen","Buchstaben- und Zahlenmaterial ertasten","Unterschiede benennen"],"KOG-28":["Hüpfspiele anbieten (abwechselnd hüpfen, auf einem Bein hüpfen, Himmel und Hölle)","Gleichgewicht üben (rückwärts auf einer Linie gehen, balancieren)","Fahrrad mit Stützrädern oder Laufrad fahren lassen","Einen Bewegungsparcours mit steigender Schwierigkeit aufbauen"],"KOG-29":["Würfelbilder und Punktkarten nutzen","Kleine Mengen kurz zeigen und benennen lassen","Mengen strukturiert darstellen"],"KOG-30":["Lieder, Reime und Verse wiederholen","Auswendiglernen spielerisch üben","Gelerntes vortragen lassen"],"KOG-31":["Bildergeschichten in die richtige Reihenfolge bringen","Zeitwörter nutzen (zuerst, dann, zuletzt)","Geschichten dazu erzählen lassen"],"KOG-32":["Menschen mit Details zeichnen lassen (Arme, Beine, Kleidung)","Den eigenen Namen aus dem Gedächtnis schreiben üben","Schleife binden üben (Schnürsenkel, Bänder)","Schreib- und Schneideübungen anbieten und die Genauigkeit rückmelden"],"KOG-33":["Ballspiele mit gezieltem Werfen und Fangen anbieten","Rechts und links in Bewegungsspielen üben","Im Rhythmus klatschen und sich zur Musik bewegen","Radfahren und Koordination im Sportunterricht fördern"],"KOG-34":["Grundwortschatz mit Wortkarten üben","Wörter in kurzen Texten wiederfinden","Leseerfolge festhalten"],"KOG-35":["Ziffern mit Mengen verbinden","Ziffern schreiben üben","Zahlenspiele einsetzen"],"KOG-36":["Grundwortschatz regelmäßig schreiben üben","Kurze Diktate einsetzen","Wörter nach Rechtschreibmustern ordnen"],"KOG-37":["Geschichten vorlesen und Fragen dazu stellen","Handlung mit Bildern nacherzählen lassen","Reihenfolge der Ereignisse besprechen"],"KOG-38":["Verhalten von Figuren in Geschichten besprechen","Warum-Fragen stellen","Ursache und Wirkung gemeinsam benennen"],"KOG-39":["Kurze Sätze lesen und dazu malen oder handeln","Fragen zum Gelesenen stellen","Lesestrategien vermitteln"],"KOG-40":["Mit Anschauungsmaterial rechnen","Zerlegungen der Zahlen bis 9 üben","Rechenspiele einsetzen"],"KOG-41":["Unsinnsbilder und -geschichten besprechen","Fragen stellen: „Was stimmt hier nicht?“","Begründungen einfordern"],"KOG-42":["Fragen zu Geschichten schriftlich beantworten lassen","Satzanfänge vorgeben","Antworten gemeinsam überprüfen"],"KOG-43":["Regelspiele im Sport anbieten","Grundfertigkeiten üben (Werfen, Fangen, Laufen)","Teilnahme und Fortschritte würdigen"],"KOG-44":["Schreibanlässe schaffen (Bilder, Erlebnisse)","Satzmuster anbieten","Eigene Texte würdigen"],"KOG-45":["Plus und Minus bis 100 mit Material üben (Hunderterfeld, Zehnerstangen)","In Fünfer- und Zehnerschritten zählen","Volle und halbe Stunden an der Lernuhr ablesen","Münzwerte mit Spielgeld zusammenrechnen (Einkaufen spielen)"],"KOG-46":["Zeitbegriffe klären (Viertelstunde, halbe Stunde, Tag, Woche, Monat, Jahr)","Längen mit Lineal und Maßband messen (Zentimeter, Meter)","Flüssigkeiten abmessen (Liter, halber Liter, Viertelliter)","Maßbegriffe lesen und in eigenen Worten erklären lassen"],"KOG-47":["Texte lesen und nacherzählen lassen","Fragen zu Hauptfigur und Handlung stellen","Ein Lesetagebuch führen"],"KOG-48":["Stellenwerte mit Material und Stellenwerttafel darstellen","Addieren und Subtrahieren mit Übertrag üben","Multiplikation mit Material einführen","Aufgaben zu Größenbeziehungen lösen („A ist größer als B, B ist größer als C …“)"],"KOG-49":["Briefe, Nachrichten oder Berichte schreiben lassen","Zum Schreiben über Gefühle und Erlebnisse anregen","Texte gemeinsam überarbeiten"],"KOG-50":["Einmaleins mit Material und Spielen üben","Umkehraufgaben nutzen","Kurz und täglich üben (Automatisierung)"],"KOG-51":["Lesestoff nach Interessen anbieten","Sachtexte zu eigenen Fragen suchen lassen","Die Bibliothek besuchen"],"KOG-52":["Mit Spielgeld rechnen","Einkaufssituationen nachspielen","Wechselgeld berechnen lassen"],"KOG-53":["Figuren aus Büchern und Filmen besprechen","Motive von Figuren herausarbeiten","Eigene Meinung zu Figuren begründen"],"KOG-54":["Grammatikregeln an eigenen Texten anwenden","Texte überarbeiten (Schreibkonferenz)","Regelkarten nutzen"],"KOG-55":["Offene, respektvolle Diskussionen führen","Beispiele aus dem Alltag besprechen","Wertefragen im Ethikunterricht aufgreifen","Zur Reflexion anregen","Kritisches Denken fördern","Empathie entwickeln"],"KOG-56":["Logikaufgaben und Knobeleien anbieten","Lösungswege besprechen","Maßeinheiten in Sachaufgaben anwenden"],"KOG-57":["Aktuelle Themen und Nachrichten besprechen","Meinungen anderer erfragen lassen","Diskussionsrunden durchführen"],"KOG-58":["Fakten und Meinungen in Texten markieren","Quellen prüfen","Eigene Einschätzung begründen"],"KOG-59":["Widersprüchliches Verhalten in Geschichten und Alltag besprechen","Erklärungen suchen lassen","Perspektiven vergleichen"],"KOG-60":["Lösungsstrategien für Textaufgaben vermitteln","Alltagsaufgaben mit Brüchen, Dezimalzahlen und negativen Zahlen lösen (Rezepte, Preise, Temperaturen)","Lösungswege erklären lassen"],"KOG-61":["Selbstreflexion anregen","Das Problem benennen","Ursachen analysieren","Lösungsmöglichkeiten suchen","Einen Aktionsplan entwickeln und umsetzen","Das Ergebnis reflektieren und den Plan anpassen"],"KOG-62":["Gelerntes auf Alltagssituationen übertragen (Budget, Formulare)","Projekte mit Bezug zur Gemeinde durchführen","Selbstständiges Anwenden fördern"]},"fallback":{"verhalten":["Verhaltensregeln visualisieren","Positive Verstärkung einsetzen","Strukturierte Lernumgebung schaffen","Klare Erwartungen kommunizieren"],"kommunikation":["Sprachvorbild sein","Aktives Zuhören modellieren","Kommunikationsanlässe schaffen","Wortschatz im Kontext erweitern"],"sozialisation":["Soziale Situationen besprechen","Rollenspiele durchführen","Kooperative Aktivitäten anbieten","Empathie fördern"],"kognition":["Lernstrategien vermitteln","Scaffolding anbieten","Handlungsorientiert arbeiten","Differenzierte Materialien bereitstellen"]},"beispiele":{"V-1":["Reagiert auf Berührung der Wange","Dreht sich bei Geräuschen","Folgt bewegenden Objekten mit den Augen"],"V-2":["Wendet Blick/Körper zu Seifenblasen","Dreht Kopf zur Musik","Lächelt wenn Hand ins Wasser getaucht wird"],"V-3":["Beobachtet Seifenblasen weiter und greift danach","Schaut Erwachsenen beim Gitarrespielen zu","Spritzt weiter im Wasser"],"V-4":["Sieht Bauklotz, hebt ihn hoch und wirft ihn","Kommt zur Musikquelle gelaufen","Streckt Hand aus um Gesicht zu berühren"],"V-5":["Spritzt im Wasser nach Aufforderung","Schiebt Boot durchs Wasser nach Vormachen","Fährt Spielzeugauto auf verbalen Hinweis"],"V-6":["Zeigt Toilettenbedarf an","Versucht Wasserhahn aufzudrehen","Zieht Hose hoch, versucht Reißverschluss"],"V-7":["Hebt Puppe hoch, streichelt Haare","Zieht Auto über Boden, untersucht Räder","Legt Spielzeug in Kiste auf Aufforderung"],"V-8":["Geht zur Spielecke wenn 'Jetzt spielen wir' gesagt wird","Holt Mantel wenn Spaziergang angekündigt wird"],"V-9":["Fährt Spielzeugauto zur Tankstelle, tut als ob tanken","Füttert und zieht Puppe an"],"V-10":["Wartet bis an der Reihe beim Turnen","Wartet auf Plätzchen bis anderes Kind seins bekommen hat"],"V-11":["Kehrt in Erzählkreis zurück nach interessantem Hinweis","Führt Arbeit fort nach Ermutigung sitzen zu bleiben"],"V-12":["Hört auf zu streiten, holt alternatives Spielzeug","Folgt Klatsch-Rhythmus in der Gruppe"],"V-13":["Nimmt Arbeitsblatt ohne Aufforderung","Beschäftigt sich mit Spielzeug, antwortet auf Fragen dazu"],"V-14":["Akzeptiert Schulterklopfen ohne Zurückzucken","Lächelt zurück wenn für Geschichte gelobt"],"V-15":["Räumt Platz nach Frühstück ohne Aufforderung","Arbeitet im vertrauten Übungsheft ohne Hilfe"],"V-16":["Sagt: 'Im Schwimmbad lassen sie uns nicht rein wenn wir prügeln'","Kennt Schulbus-Regeln und Pausenregeln"],"V-17":["Erklärt: 'Nach Dunkelwerden kann einem was passieren'","Begründet: 'Sonst können wir am Tisch nicht arbeiten'"],"V-18":["Sagt: 'Ich könnte aufzeigen anstatt zu rufen'","Erkennt alternative Verhaltensweisen"],"V-19":["Erfüllt Kapitänsrolle verantwortungsbewusst","Macht auch als Teilnehmer mit"],"V-20":["Stimmt nicht ein wenn andere Schimpfwörter rufen","Bleibt auf Platz während andere herumlaufen"],"V-21":["Behält Selbstkontrolle während Gruppenaktivitäten","Kontrolliert sich bei Übergängen"],"V-22":["Sagt: 'Als du dran warst, hab ich keinen Ton gesagt'","Erinnert sich an eigene Verbesserungen"],"V-23":["Akzeptiert geänderten Ablauf ohne Ärger","Wartet ruhig wenn Reihenfolge geändert wird"],"V-24":["Nimmt an Ausflug teil trotz Angst","Probiert neue Aktivität aus"],"V-25":["Sagt Provokateur er solle aufhören, entzieht sich","Schlägt Alternative vor wenn Plan ausfällt"],"V-26":["Behält Selbstkontrolle trotz Schimpfwörtern","Reagiert besonnen auf Provokationen"],"V-27":["Setzt sich freiwillig um Versuchung zu vermeiden","Ersetzt beschädigtes Buch eines Mitschülers"],"V-28":["Schlägt Abwechseln beim Abwaschen vor","Bietet konstruktive Alternative an"],"V-29":["Überlegt ob er früh aufstehen könnte für Job","Übernimmt Verantwortung für Materialien"],"V-30":["Sieht sich als Helfer bei Problemlösungen","Sichert sich Leiterrolle auf positive Art"],"V-31":["Kommentiert: 'Radkappen klauen bringt nur Probleme'","Hilft Regelkatalog zu formulieren"],"V-32":["Stellt sich zur Wahl der Schülervertretung","Akzeptiert Mehrheitsbeschluss"],"V-33":["Analysiert Situation bei Gruppenausschluss","Diskutiert Problem, plant neue Wege"],"K-1":["Sagt 'eee', 'nnn' oder 'mmm'","Sagt 'baba', 'da da' Silbenreihen"],"K-2":["Dreht Körper/Blick zu grüßendem Erwachsenen","Schaut Mutter an wenn sie spricht"],"K-3":["Zeigt Verständnis von 'Ball' durch Anschauen","Winkt bei 'Wiedersehen'"],"K-4":["Antwortet annähernd mit Namen eines Kindes","Antwortet mit Wortannäherung auf Objekt"],"K-5":["Sagt 'Mi..Mi' bei Milch","Sagt 'Auch' wenn es mitmachen will"],"K-6":["Sagt 'Milch' wenn Milch hingestellt wird","Sagt 'Bauen' mit Bauklötzen"],"K-7":["Sagt 'Auto' zu Kind das Lieblingsauto hat","Sagt 'Geh weg' zum anderen Kind"],"K-8":["Sagt 'Gib mir das Auto'","Singt Zeilen aus einfachem Lied"],"K-9":["Antwortet 'Das ist mein Laster' auf Anfrage","Beantwortet Fragen mit sinnvollen Wörtern"],"K-10":["Rezeptives Vokabular max. 2 Jahre unter Altersnorm","Wird durch Sprachentwicklungstests eingeschätzt"],"K-11":["Sagt 'Ich will deine rote Farbe'","Fragt 'Was ist da drin?'"],"K-12":["Erzählt 'Ich hab meiner Mama beim Backen geholfen'","Tauscht Informationen mit Erwachsenen"],"K-13":["Sagt 'Ich kann gut klettern, bis ganz oben'","Beschreibt Vater: 'Mein Papi ist groß'"],"K-14":["Erzählt Schwester 'Ich habe das Buch gelesen'","Sagt zu Mitschüler 'Das ist nicht richtig'"],"K-15":["Erzählt vom Umzug ins neue Haus","Erklärt Bild: 'Das ist unser altes Haus'"],"K-16":["Erzählt 'Das Gewitter war so laut'","Sagt 'Ich hab Angst vor Hunden'"],"K-17":["Schlägt Design für Wandgemälde vor","Beteiligt sich an Gruppengespräch"],"K-18":["Sagt 'Hey, ich hab es fertig gekriegt'","Zeigt Stolz auf eigene Arbeit"],"K-19":["Sagt 'Man soll wegbleiben wenn ich Wut habe'","Beschreibt eigene Stärken und Schwächen"],"K-20":["Beschreibt Freundin: 'Schnellste Läuferin'","Beschreibt Eigenschaften anderer Kinder"],"K-21":["'Stefan ist froh weil er Urkunde bekommen hat'","'Er ist sauer weil er nicht dran ist'"],"K-22":["Sagt 'Die sind nicht so weit wie wir'","Sagt 'Wir sind die größten Künstler'"],"K-23":["Malt Angelerlebnis mit Vater","Formt wütendes Monster aus Ton"],"K-24":["Sagt 'Ich bin in fast allen Fächern besser als letztes Jahr'","Erkennt eigenen Fortschritt"],"K-25":["'Susie hat mir eine gescheuert weil ich Blöde Kuh gesagt hab'","Erklärt Ursache-Wirkung"],"K-26":["'Ich war stinkig als du Farbe über unser Gemälde gekippt hast'","Drückt eigene Gefühle aus"],"K-27":["Fragt Mechaniker 'Wie lange hat es gedauert das zu lernen?'","Knüpft Beziehungen durch Fragen"],"K-28":["Erklärt Mitschüler eine Matheaufgabe","Steht für anderen Mitschüler ein"],"K-29":["'Wir haben auf Lilli gehackt weil sie Ball fallen ließ'","Beschreibt Zusammenhang von Gefühlen/Verhalten"],"K-30":["'Softball hier erinnert an Hunde die um Knochen balgen'","Verwendet bildhafte Sprache"],"K-31":["'Setzen wir uns hin, jeder erzählt was er denkt'","'Hört auf mit dem Blödsinn'"],"K-32":["'Peters Idee ist gut'","'Deine Idee hat was für sich'"],"K-33":["Vergleicht Eltern: Vater rast, Mutter hält sich an Regeln","Unterscheidet verschiedene Motive"],"K-34":["'Väter sollten bei Familien bleiben auch bei Problemen'","Beschreibt eigene Wertvorstellungen"],"K-35":["'Unser Spiel ist gut weil wir zusammenspielen'","Pflegt positive Beziehungen durch Sprache"],"SOZ-1":["Dreht Kopf zu wenn Rücken berührt wird","Zeigt Interesse an Kuckuck-Spiel"],"SOZ-2":["Beobachtet was Erwachsener und Kind tun","Beobachtet Vater beim Reden"],"SOZ-3":["Schaut hoch wenn Name gerufen wird","Reagiert auf den eigenen Namen"],"SOZ-4":["Stapelt Bauklötze allein","Klettert Rutsche hoch und rutscht runter"],"SOZ-5":["Führt Hand des Erwachsenen zum Keks","Zeigt auf gewünschten Gegenstand"],"SOZ-6":["Geht zur Mutter und erlaubt Arm um sich","Rutscht zur Erzieherin hinüber"],"SOZ-7":["Setzt sich auf Aufforderung","Hängt Mantel auf wenn gesagt"],"SOZ-8":["Sagt 'Milch' wenn Vater Milch hinstellt","Sagt 'Bauen' mit Bauklötzen"],"SOZ-9":["Erkennt sich im Spiegel","Verwendet 'ich, mein, mir'"],"SOZ-10":["Spielt mit Lastwagen neben Kind mit Auto","Baut Turm während anderes Kind auch baut"],"SOZ-11":["Sagt 'Auto' zu Kind mit Lieblingsauto","Sagt 'Geh weg'"],"SOZ-12":["Betritt Raum und umarmt Erzieherin","Bringt Buch um Bild zu zeigen"],"SOZ-13":["Spielt 'Einkaufen gehen' mit Spielgeld","Tut als ob Bus fahren"],"SOZ-14":["Wartet auf Position nach Ermutigung","Bleibt stehen wenn gesagt 'Warte bitte'"],"SOZ-15":["Geht zu freiem Stuhl neben bestimmtem Kind","Schließt sich Murmelspiel an"],"SOZ-16":["Reicht Material/Spielzeug weiter","Teilt Buntstifte mit anderem Kind"],"SOZ-17":["Spielt 'Nachlaufen' mit anderem Kind","Bereitet gemeinsam Puppenkaffeeklatsch vor"],"SOZ-18":["Spielt Dialog in Theaterstück mit Partner","Malt gemeinsam Teil eines Wandgemäldes"],"SOZ-19":["Teilt Erdnussflips beim Fernsehen mit Bruder","Wechselt sich ab beim Völkerball"],"SOZ-20":["Hängt Mantel auf wie älterer Bruder","Bleibt bei Gruppe statt loszurennen"],"SOZ-21":["Sagt 'Das ist nicht fair'","Sagt 'Wände beschmieren ist schlecht'"],"SOZ-22":["Demonstriert anderen wie Lagerfeuer entzünden","Organisiert Frage-Antwort-Spiel"],"SOZ-23":["Nimmt an Aktivität teil obwohl anderes gewünscht","Akzeptiert Vorschlag der Schwester"],"SOZ-24":["Zeichnet Bilderreihe über Erlebnis","Beschreibt Konfliktverlauf im Gespräch"],"SOZ-25":["Sagt 'Ich will mit Peter in der Mannschaft sein'","Wählt regelmäßig bestimmtes Kind"],"SOZ-26":["Zeigt Bild und fragt 'Wie findest du das?'","Bittet Mitschüler um Hilfe"],"SOZ-27":["Sagt im Kino 'Seid leise sonst setzen sie uns raus'","Erklärt Neuem die Klassenregeln"],"SOZ-28":["Sammelt Infos über Olympiasieger","Imitiert Stil der beliebten Lehrerin"],"SOZ-29":["Erzählt Details über Gruppenerlebnis","Beschreibt Konfliktverlauf der Gruppe"],"SOZ-30":["Schlägt vor 'Sollen wir fragen ob Fußball?'","Initiiert geeignete Gruppenaktivität"],"SOZ-31":["Sagt 'Peter soll gehen, er hat keine Angst'","Erkennt Unterschiede zu anderen"],"SOZ-32":["Hört aufmerksam zu bei Erklärung","Akzeptiert Trainers Rat"],"SOZ-33":["Sagt 'Ich glaube Luise mag mich nicht mehr'","Fragt nach Meinung über sich"],"SOZ-34":["Schlägt Abstimmung vor für Ausflugsziel","Bietet konstruktive Lösung an"],"SOZ-35":["'Nachbarin hält Prügel für normal'","Erkennt gegensätzliche Werte"],"SOZ-36":["Sagt 'Eltern hatten wohl Sorgen'","Zieht Schlussfolgerungen aus Situationen"],"SOZ-37":["'Daniels Eltern erlauben ihm nichts, ist nicht fair'","Zeigt Verständnis für andere"],"SOZ-38":["Geben-Nehmen Austausch mit Freund","Nimmt verschiedene Rollen ein"],"SOZ-39":["'Ich mag nicht mit Billy sein, der ist Unruhestifter'","Trifft Entscheidungen nach Werten"],"SOZ-40":["Erkennt 'Ich bin zu klein für erstklassigen Basketball'","Zeigt realistisches Selbstbild"],"SOZ-41":["Entwickelt offene Freundschaft","Engagiert sich in Gruppe"],"KOG-1":["Wendet sich Seifenblasen zu","Dreht Kopf zur Gitarrenmusik"],"KOG-2":["Beobachtet Seifenblasen weiter","Beobachtet Erwachsenen weiter"],"KOG-3":["Lächelt bei vertrautem Erwachsenen","Macht Gesten wenn es essen will"],"KOG-4":["Spritzt nach Aufforderung und Vormachen","Fährt Auto nach verbalem Hinweis"],"KOG-5":["Winkt zum Abschied nach Vorbild","Imitiert Klötzestapeln"],"KOG-6":["Baut Turm aus 3-5 Klötzen","Rennt, klettert, geht allein"],"KOG-7":["Zeigt auf genanntes Spielzeug","Wählt richtig zwischen Papier und Stiften"],"KOG-8":["Antwortet annähernd mit Namen","Gibt Wortannäherung auf Objekt"],"KOG-9":["Sagt 'Mi..Mi' bei Milch","Sagt 'Gehn' wenn es gehen will"],"KOG-10":["Steckt Formen in passendes Brett","Legt Puzzleteile richtig"],"KOG-11":["Antwortet richtig auf 'Was ist das?' bei Haaren","Zeigt Ohr/Fuß auf Frage"],"KOG-12":["Zeigt richtige Person im Bild","Sagt 'Hund' und zeigt ihn unter Objekten"],"KOG-13":["Sortiert Lastwagen und Autos in zwei Kisten","Ordnet Objekte in Kategorien"],"KOG-14":["Zeigt Hund im Buch, sagt 'Hund'","Benennt Abbildungen mit Wörtern"],"KOG-15":["Erklärt/zeigt wozu Schaufel dient","Demonstriert Verwendung von Gegenständen"],"KOG-16":["Fährt Gokart","Balanciert kurz auf einem Fuß"],"KOG-17":["Zieht Linie zwischen zwei gleichen Bällen","Findet Memory-Paare"],"KOG-18":["Baut Brücke aus Bauklötzen","Fädelt Perlen auf"],"KOG-19":["Findet anderen Lastwagen unter drei Wagen","Erkennt was anders ist"],"KOG-20":["Versteht: hoch/runter, unter/über","Zeigt Ersten und Letzten in Reihe"],"KOG-21":["Sortiert Bilder: Menschen hierhin, Tiere dahin","Ordnet nach Kategorien zu"],"KOG-22":["Nennt 1-4 in richtiger Reihenfolge","Zeigt beim Zählen auf jeweiliges Objekt"],"KOG-23":["Zeigt richtig auf Kreis, Viereck, Dreieck","Benennt vier Farben"],"KOG-24":["Wechselt zwischen 'Was ist anders?' und 'Was ist gleich?'","Reagiert auf wechselnde Aufgaben"],"KOG-25":["Wählt 10 Bauklötze für Straße","Zählt 10 Becher ab"],"KOG-26":["Zeichnet Menschen mit Körper","Schreibt Namen ab","Schneidet an Linien"],"KOG-27":["Findet Buchstaben unter Zeichen","Unterscheidet Ziffern von Buchstaben"],"KOG-28":["Hüpft abwechselnd mit beiden Füßen","Fährt Fahrrad mit Stützrädern"],"KOG-29":["Erkennt Anzahl Dominopunkte ohne Zählen","Erfasst Mengen bis 5 spontan"],"KOG-30":["Singt Lied von ca. 30 Wörtern","Zählt bis 20"],"KOG-31":["Ordnet drei Bilder zu Geschichte richtig","Beantwortet 'Was passiert zuerst?'"],"KOG-32":["Zeichnet Menschen mit Armen, Beinen, Kleidung","Bindet Schnürsenkel"],"KOG-33":["Wirft und fängt Ball gesteuert","Unterscheidet rechts und links"],"KOG-34":["Liest 50 Wörter des Grundwortschatzes","Liest einfache Wörter flüssig"],"KOG-35":["Schreibt 1-10 auswendig","Schreibt Zahl zu gezeigter Menge"],"KOG-36":["Schreibt 50 Wörter lesbar nach Diktat","Schreibt Grundwortschatz"],"KOG-37":["Erinnert sich an Details einer Geschichte","Beantwortet Fragen zur Geschichte"],"KOG-38":["Erklärt: 'Junge weint weil andere ihn ärgern'","Erklärt Verhalten anderer"],"KOG-39":["Liest einfache Sätze und beantwortet Fragen","Versteht Inhalt beim Lesen"],"KOG-40":["Beherrscht Addition und Subtraktion bis 9","Rechnet einfache Aufgaben"],"KOG-41":["Erkennt was im Bild fehlt","Findet Unstimmigkeiten"],"KOG-42":["Schreibt Eigenschaften einer Figur auf","Beantwortet Fragen schriftlich"],"KOG-43":["Schwimmt, trifft Ball beim Schlagball","Nimmt an Staffellauf teil"],"KOG-44":["Schreibt drei Sätze als Geschichtsende","Formuliert eigene Sätze"],"KOG-45":["Addiert/subtrahiert bis 100","Benennt Uhrzeiten","Zählt in 5er/10er"],"KOG-46":["Versteht Viertel/Halbe Stunden","Versteht Zentimeter/Meter"],"KOG-47":["Erzählt von Zeitungsbericht","Fasst Gelesenes zusammen"],"KOG-48":["Ordnet Zahlen in Stellenwerttabelle","Rechnet mit Übertrag"],"KOG-49":["Schreibt Artikel für Schülerzeitung","Schreibt Briefe"],"KOG-50":["Beherrscht Einmaleins","Versteht 2+2+2+2 = 4x2"],"KOG-51":["Liest Zeitschriften zum Hobby","Liest aus eigenem Interesse"],"KOG-52":["Wechselt Cent-Münzen in größere","Rechnet mit Geld"],"KOG-53":["Beschreibt Fernsehfigur nach Aussehen und Verhalten","Erklärt Motive von Figuren"],"KOG-54":["Verwendet korrekte Grammatik und Rechtschreibung","Schreibt Aufsätze"],"KOG-55":["Unterscheidet legal/illegal","Erkennt verschiedene Wertvorstellungen"],"KOG-56":["Wendet Mathematik in Sachaufgaben an","Plant mit Preisvergleich"],"KOG-57":["Führt Meinungsumfrage durch","Nimmt an Debatten teil"],"KOG-58":["Unterscheidet Fakten von Meinungen","Hinterfragt Berichte kritisch"],"KOG-59":["Erkennt widersprüchliche Aussagen","Bemerkt inkonsistentes Verhalten"],"KOG-60":["Berechnet Mehrwertsteuer","Passt Rezeptmengen an"],"KOG-61":["Analysiert Probleme und wählt Lösung","Verarbeitet schwierige Situationen"],"KOG-62":["Berechnet Monatsbudget","Diskutiert gesellschaftliche Themen"]},"zusatz":{"demarches_mentales":[{"id":"DM-1","title":"Problemanalyse","stufen":{"stufe1":"lernt noch, ein Problem in kleinere Teile zu zerlegen","stufe2":"kann mit Unterstützung ein Problem in kleinere Teile zerlegen","stufe3":"kann ein Problem in kleinere Teile zerlegen und analysieren"},"intervention":["Problemzerlegung üben","Mindmaps erstellen","Schritt-für-Schritt-Anleitungen nutzen"]},{"id":"DM-2","title":"Lösungsstrategien","stufen":{"stufe1":"lernt noch, verschiedene Lösungswege für ein Problem zu finden","stufe2":"kann mit Unterstützung verschiedene Lösungswege entwickeln","stufe3":"kann verschiedene Lösungswege für ein Problem finden"},"intervention":["Brainstorming-Techniken","Vor- und Nachteile abwägen","Kreative Lösungsansätze fördern"]},{"id":"DM-3","title":"Entscheidungsfindung","stufen":{"stufe1":"lernt noch, begründete Entscheidungen zu treffen","stufe2":"kann mit Unterstützung begründete Entscheidungen treffen","stufe3":"kann begründete Entscheidungen treffen"},"intervention":["Entscheidungsmatrix nutzen","Pro-Contra-Listen erstellen","Konsequenzen durchdenken"]},{"id":"DM-4","title":"Planung","stufen":{"stufe1":"lernt noch, Aufgaben zu planen und zu strukturieren","stufe2":"kann mit Unterstützung Aufgaben planen und strukturieren","stufe3":"kann Aufgaben planen und strukturieren"},"intervention":["Tages-/Wochenpläne erstellen","Prioritäten setzen","Zeitmanagement üben"]},{"id":"DM-5","title":"Selbstreflexion","stufen":{"stufe1":"lernt noch, das eigene Lernverhalten zu reflektieren","stufe2":"kann mit Anleitung das eigene Lernverhalten reflektieren","stufe3":"kann das eigene Lernverhalten reflektieren"},"intervention":["Reflexionsfragen im Unterricht stellen","Lerntagebuch führen","Selbsteinschätzung nach Aufgaben"]},{"id":"DM-6","title":"Hypothesenbildung","stufen":{"stufe1":"lernt noch, Vermutungen aufzustellen und zu überprüfen","stufe2":"kann mit Unterstützung Vermutungen aufstellen und überprüfen","stufe3":"kann Vermutungen aufstellen und überprüfen"},"intervention":["Wissenschaftliches Denken üben","Experimente durchführen","Wenn-Dann-Überlegungen"]},{"id":"DM-7","title":"Schlussfolgern","stufen":{"stufe1":"lernt noch, aus Informationen logische Schlüsse zu ziehen","stufe2":"kann mit Unterstützung logische Schlüsse ziehen","stufe3":"kann aus Informationen logische Schlüsse ziehen"},"intervention":["Logikrätsel lösen","Argumentationsketten bilden","Deduktives Denken üben"]},{"id":"DM-8","title":"Abstraktion","stufen":{"stufe1":"lernt noch, allgemeine Regeln aus Beispielen abzuleiten","stufe2":"kann mit Unterstützung allgemeine Regeln ableiten","stufe3":"kann allgemeine Regeln aus Beispielen ableiten"},"intervention":["Muster erkennen","Kategorien bilden","Vom Konkreten zum Abstrakten"]},{"id":"DM-9","title":"Perspektivwechsel","stufen":{"stufe1":"lernt noch, Situationen aus verschiedenen Blickwinkeln zu betrachten","stufe2":"kann mit Anleitung verschiedene Perspektiven einnehmen","stufe3":"kann Situationen aus verschiedenen Blickwinkeln betrachten"},"intervention":["Rollenspiele","Andere Meinungen einholen","Standortwechsel üben"]},{"id":"DM-10","title":"Kritisches Denken","stufen":{"stufe1":"lernt noch, Informationen kritisch zu hinterfragen","stufe2":"kann mit Unterstützung Informationen kritisch hinterfragen","stufe3":"kann zeitweise Informationen kritisch hinterfragen"},"intervention":["Quellen prüfen","Fakten von Meinungen unterscheiden","Argumente analysieren"]},{"id":"DM-11","title":"Kreatives Denken","stufen":{"stufe1":"lernt noch, neue und originelle Ideen zu entwickeln","stufe2":"kann mit Anregung neue Ideen entwickeln","stufe3":"kann neue und originelle Ideen entwickeln"},"intervention":["Brainstorming ohne Bewertung","Ungewöhnliche Verbindungen suchen","Kreativitätstechniken anwenden"]},{"id":"DM-12","title":"Transferleistung","stufen":{"stufe1":"lernt noch, Gelerntes auf neue Situationen zu übertragen","stufe2":"kann mit Hinweisen Gelerntes auf neue Situationen übertragen","stufe3":"kann Gelerntes auf neue Situationen übertragen"},"intervention":["Anwendungsbeispiele suchen","Parallelen ziehen","Generalisierung üben"]},{"id":"DM-13","title":"Informationsverarbeitung","stufen":{"stufe1":"lernt noch, wichtige von unwichtigen Informationen zu unterscheiden","stufe2":"kann mit Unterstützung Kerninformationen identifizieren","stufe3":"kann wichtige von unwichtigen Informationen unterscheiden"},"intervention":["Kerninformationen markieren","Zusammenfassungen erstellen","Filterstrategien anwenden"]},{"id":"DM-14","title":"Gedächtnisstrategien","stufen":{"stufe1":"lernt noch, Gedächtnisstrategien anzuwenden","stufe2":"kann mit Anleitung Gedächtnisstrategien anwenden","stufe3":"kann verschiedene Gedächtnisstrategien gezielt anwenden"},"intervention":["Eselsbrücken bauen","Visualisierungen nutzen","Wiederholungstechniken anwenden"]},{"id":"DM-15","title":"Antizipation","stufen":{"stufe1":"lernt noch, Konsequenzen von Handlungen vorherzusehen","stufe2":"kann mit Unterstützung Konsequenzen antizipieren","stufe3":"kann mögliche Konsequenzen von Handlungen vorhersehen"},"intervention":["Szenarien durchspielen","Wenn-Dann-Ketten bilden","Vorausschauend denken üben"]}],"manieres_apprendre":[{"id":"MA-1","title":"Lernmotivation","stufen":{"stufe1":"hat noch Schwierigkeiten, sich selbst zum Lernen zu motivieren","stufe2":"kann sich mit Unterstützung zum Lernen motivieren","stufe3":"kann sich zum Lernen motivieren"},"intervention":["Intrinsische Motivation stärken","Lernziele setzen","Erfolge feiern"]},{"id":"MA-2","title":"Lernorganisation","stufen":{"stufe1":"lernt noch, Lernplatz und Materialien zu organisieren","stufe2":"kann mit Unterstützung Lernplatz und Materialien organisieren","stufe3":"kann Lernplatz und Materialien organisieren"},"intervention":["Ordnungssysteme einführen","Arbeitsplatz gestalten","Materialchecklisten nutzen"]},{"id":"MA-3","title":"Zeitmanagement","stufen":{"stufe1":"lernt noch, die Lernzeit effektiv einzuteilen","stufe2":"kann mit Unterstützung die Lernzeit einteilen","stufe3":"kann die Lernzeit effektiv einteilen"},"intervention":["Pomodoro-Technik","Lernpläne erstellen","Pausen einplanen"]},{"id":"MA-4","title":"Konzentration","stufen":{"stufe1":"hat noch Schwierigkeiten, sich über längere Zeit zu konzentrieren","stufe2":"kann sich mit Unterstützung über längere Zeit konzentrieren","stufe3":"kann sich über längere Zeit konzentrieren"},"intervention":["Ablenkungen minimieren","Konzentrationsphasen steigern","Fokussierungsübungen"]},{"id":"MA-5","title":"Selbstständiges Lernen","stufen":{"stufe1":"lernt noch, selbstständig zu lernen und zu arbeiten","stufe2":"kann mit Anleitung selbstständiger lernen und arbeiten","stufe3":"kann selbstständig lernen und arbeiten"},"intervention":["Eigenverantwortung stärken","Hilfe gezielt suchen","Lernprozess selbst steuern"]},{"id":"MA-6","title":"Lernstrategien","stufen":{"stufe1":"lernt noch, verschiedene Lernstrategien anzuwenden","stufe2":"kann mit Unterstützung verschiedene Lernstrategien anwenden","stufe3":"kann verschiedene Lernstrategien anwenden"},"intervention":["Lerntyp ermitteln","Verschiedene Methoden ausprobieren","Passende Strategien wählen"]},{"id":"MA-7","title":"Fehlertoleranz","stufen":{"stufe1":"hat noch Schwierigkeiten, aus Fehlern zu lernen ohne aufzugeben","stufe2":"kann mit Ermutigung aus Fehlern lernen","stufe3":"kann aus Fehlern lernen, ohne aufzugeben"},"intervention":["Fehler als Lernchance sehen","Fehleranalyse durchführen","Growth Mindset fördern"]},{"id":"MA-8","title":"Ausdauer","stufen":{"stufe1":"hat noch Schwierigkeiten, bei Schwierigkeiten durchzuhalten","stufe2":"kann mit Unterstützung bei Schwierigkeiten durchhalten","stufe3":"kann auch bei Schwierigkeiten durchhalten"},"intervention":["Kleine Etappenziele setzen","Durchhaltevermögen stärken","Erfolge dokumentieren"]},{"id":"MA-9","title":"Neugier","stufen":{"stufe1":"zeigt noch wenig Interesse und Neugier an neuen Themen","stufe2":"zeigt mit Anregung Interesse an neuen Themen","stufe3":"zeigt Interesse und Neugier an neuen Themen"},"intervention":["Entdeckendes Lernen fördern","Fragen ermutigen","Interessen aufgreifen"]},{"id":"MA-10","title":"Lernreflexion","stufen":{"stufe1":"lernt noch, den eigenen Lernprozess zu reflektieren","stufe2":"kann mit Anleitung den Lernprozess reflektieren","stufe3":"kann den eigenen Lernprozess reflektieren und verbessern"},"intervention":["Lerntagebuch führen","Was hat funktioniert? Was nicht?","Verbesserungsstrategien entwickeln"]},{"id":"MA-11","title":"Notizen machen","stufen":{"stufe1":"lernt noch, wichtige Informationen zu notieren","stufe2":"kann mit Anleitung wichtige Informationen notieren","stufe3":"kann wichtige Informationen notieren"},"intervention":["Verschiedene Notiztechniken","Stichpunkte vs. Fließtext","Strukturierte Mitschriften"]},{"id":"MA-12","title":"Quellenarbeit","stufen":{"stufe1":"lernt noch, verschiedene Quellen zu nutzen und zu bewerten","stufe2":"kann mit Unterstützung Quellen nutzen und bewerten","stufe3":"kann verschiedene Quellen nutzen und bewerten"},"intervention":["Recherchieren üben","Quellenkritik","Informationen zusammenführen"]},{"id":"MA-13","title":"Visualisierung","stufen":{"stufe1":"lernt noch, Lerninhalte visuell darzustellen","stufe2":"kann mit Anleitung Lerninhalte visuell darstellen","stufe3":"kann Lerninhalte visuell darstellen"},"intervention":["Mind-Maps erstellen","Sketchnotes","Diagramme zeichnen"]},{"id":"MA-14","title":"Wiederholung","stufen":{"stufe1":"wiederholt Lerninhalte noch nicht regelmäßig","stufe2":"wiederholt mit Erinnerung Lerninhalte regelmäßig","stufe3":"wiederholt Lerninhalte regelmäßig"},"intervention":["Spaced Repetition","Karteikarten nutzen","Regelmäßige Übungszeiten"]},{"id":"MA-15","title":"Prüfungsvorbereitung","stufen":{"stufe1":"lernt noch, sich gezielt auf Prüfungen vorzubereiten","stufe2":"kann sich mit Unterstützung auf Prüfungen vorbereiten","stufe3":"kann sich gezielt auf Prüfungen vorbereiten"},"intervention":["Prüfungssimulation","Zeitplanung für Vorbereitung","Prüfungsangst bewältigen"]},{"id":"MA-16","title":"Kooperatives Lernen","stufen":{"stufe1":"hat noch Schwierigkeiten, mit anderen gemeinsam zu lernen","stufe2":"kann mit Anleitung mit anderen gemeinsam lernen","stufe3":"kann mit anderen gemeinsam lernen"},"intervention":["Lerngruppen bilden","Peer-Teaching","Wissen teilen"]},{"id":"MA-17","title":"Mediennutzung","stufen":{"stufe1":"lernt noch, digitale Medien sinnvoll zum Lernen zu nutzen","stufe2":"kann mit Anleitung digitale Medien zum Lernen nutzen","stufe3":"kann digitale Medien sinnvoll zum Lernen nutzen"},"intervention":["Lern-Apps kennenlernen","Online-Ressourcen nutzen","Bildschirmzeit regulieren"]},{"id":"MA-18","title":"Umgang mit Frustration","stufen":{"stufe1":"hat noch Schwierigkeiten, mit Lernfrustration umzugehen","stufe2":"kann mit Unterstützung mit Lernfrustration umgehen","stufe3":"kann mit Lernfrustration umgehen"},"intervention":["Pause machen","Hilfe suchen","Aufgaben aufteilen"]},{"id":"MA-19","title":"Klassenregeln einhalten","stufen":{"stufe1":"hat noch Schwierigkeiten, Klassenregeln einzuhalten","stufe2":"kann mit Erinnerung Klassenregeln einhalten","stufe3":"hält die Klassenregeln ein, auch in offenen Unterrichtssituationen"},"intervention":["Regeln visualisieren","Positive Verstärkung","Selbstkontrolle üben"]},{"id":"MA-20","title":"Arbeitsaufträge annehmen","stufen":{"stufe1":"hat noch Schwierigkeiten, Arbeitsaufträge anzunehmen","stufe2":"nimmt mit Ermutigung Arbeitsaufträge an","stufe3":"kann Arbeitsaufträge annehmen, auch wenn sie nicht den Vorstellungen entsprechen"},"intervention":["Flexibilität fördern","Sinn erklären","Kompromisse finden"]},{"id":"MA-21","title":"Motivation bei ungeliebten Aufgaben","stufen":{"stufe1":"zeigt noch wenig Motivation bei ungeliebten Aufgaben","stufe2":"zeigt mit Unterstützung Motivation bei ungeliebten Aufgaben","stufe3":"zeigt Motivation auch bei weniger geschätzten Aufgaben"},"intervention":["Sinn vermitteln","Kleine Belohnungen","Durchhaltevermögen stärken"]},{"id":"MA-22","title":"Ablenkung reduzieren","stufen":{"stufe1":"hat noch Schwierigkeiten, Ablenkungen im Unterricht zu vermeiden","stufe2":"kann mit Erinnerung Ablenkungen reduzieren","stufe3":"schafft weniger Ablenkung durch Gespräche im Unterricht"},"intervention":["Fokussierung üben","Sitzordnung anpassen","Selbstdisziplin stärken"]},{"id":"MA-23","title":"Anweisungen umsetzen","stufen":{"stufe1":"hat noch Schwierigkeiten, Anweisungen direkt umzusetzen","stufe2":"setzt mit Erinnerung Anweisungen um","stufe3":"setzt Anweisungen und Arbeitsaufträge direkt um"},"intervention":["Klare Anweisungen","Verständnis prüfen","Prompte Reaktion üben"]},{"id":"MA-24","title":"Autonomes Arbeiten","stufen":{"stufe1":"hat noch Schwierigkeiten, Aufträge selbstständig auszuführen","stufe2":"kann mit anfänglicher Anleitung Aufträge ausführen","stufe3":"kann selbstständig Arbeitsaufträge ausführen, nachdem sie erklärt wurden"},"intervention":["Schrittweise Hilfe reduzieren","Selbstständigkeit fördern","Erfolgserlebnisse schaffen"]},{"id":"MA-25","title":"Arbeitstempo steigern","stufen":{"stufe1":"hat noch Schwierigkeiten, das Arbeitstempo anzupassen","stufe2":"kann mit Unterstützung das Arbeitstempo anpassen","stufe3":"kann das Arbeitstempo an die Anforderungen anpassen"},"intervention":["Zeitmanagement üben","Fokussierung trainieren","Effizienz steigern"]},{"id":"MA-26","title":"Transfer ins Langzeitgedächtnis","stufen":{"stufe1":"hat noch Schwierigkeiten, Inhalte im Langzeitgedächtnis zu speichern","stufe2":"kann mit Lernstrategien Inhalte besser behalten","stufe3":"kann schulische Inhalte im Langzeitgedächtnis speichern"},"intervention":["Wiederholung einplanen","Lernstrategien anwenden","Vernetzung herstellen"]},{"id":"MA-27","title":"Schulische Perspektive entwickeln","stufen":{"stufe1":"hat noch Schwierigkeiten, die Ziele der Schulausbildung zu akzeptieren","stufe2":"versteht mit Erklärung die Ziele der Schulausbildung","stufe3":"versteht und akzeptiert die Ziele der Schulausbildung und hat eine realistische schulische Perspektive entwickelt"},"intervention":["Zukunftsperspektiven aufzeigen","Sinn vermitteln","Berufsorientierung"]},{"id":"MA-28","title":"Proaktiv Bedürfnisse kommunizieren","stufen":{"stufe1":"hat noch Schwierigkeiten, Bedürfnisse proaktiv zu äußern","stufe2":"fragt mit Ermutigung nach dem, was benötigt wird","stufe3":"fragt proaktiv nach dem, was benötigt oder gewünscht wird"},"intervention":["Selbstadvokation üben","Initiative ergreifen","Bedürfnisse formulieren"]},{"id":"MA-29","title":"Ohne Aufforderung handeln","stufen":{"stufe1":"benötigt noch Aufforderungen für alltägliche Aufgaben","stufe2":"erledigt mit wenigen Erinnerungen alltägliche Aufgaben","stufe3":"erledigt alltägliche Aufgaben ohne externe Aufforderung"},"intervention":["Routinen etablieren","Eigenverantwortung stärken","Selbstständigkeit fördern"]},{"id":"MA-30","title":"Flüchtigkeitsfehler reduzieren","stufen":{"stufe1":"macht noch häufig Flüchtigkeitsfehler","stufe2":"kann mit Erinnerung konzentrierter arbeiten","stufe3":"arbeitet konzentriert und reduziert Flüchtigkeitsfehler"},"intervention":["Kontrolllesen üben","Fokussierungstechniken","Sorgfalt trainieren"]},{"id":"MA-31","title":"Transferkompetenzen entwickeln","stufen":{"stufe1":"hat noch Schwierigkeiten, Kompetenzen in neuen Situationen anzuwenden","stufe2":"kann mit Hinweisen Kompetenzen in neuen Situationen abrufen","stufe3":"kann Kompetenzen auch in neuen Situationen abrufen"},"intervention":["Generalisierung üben","Verschiedene Kontexte","Anwendung trainieren"]},{"id":"MA-32","title":"Gute schulische Leistungen","stufen":{"stufe1":"arbeitet noch an der Verbesserung der schulischen Leistungen","stufe2":"erreicht mit Unterstützung bessere schulische Leistungen","stufe3":"erreicht gute schulische Leistungen und Prüfungsergebnisse"},"intervention":["Lernstrategien anwenden","Vorbereitung","Kontinuierliches Üben"]},{"id":"MA-33","title":"Regelmäßiger Schulbesuch","stufen":{"stufe1":"hat noch Schwierigkeiten mit regelmäßigem Schulbesuch","stufe2":"besucht mit Unterstützung regelmäßiger die Schule","stufe3":"besucht regelmäßig die Schule ohne Fehltage"},"intervention":["Anwesenheit stärken","Motivation fördern","Auch bei leichtem Unwohlsein"]},{"id":"MA-34","title":"Aufgaben ohne Zögern umsetzen","stufen":{"stufe1":"zögert noch häufig bei der Umsetzung von Arbeitsaufträgen","stufe2":"setzt mit Ermutigung Arbeitsaufträge schneller um","stufe3":"setzt Arbeitsaufträge umgehend und ohne Zögern um"},"intervention":["Prompte Reaktion","Keine Vermeidung","Direkte Umsetzung"]},{"id":"MA-35","title":"Engagement in Projekten","stufen":{"stufe1":"zeigt noch wenig Engagement in Projekten","stufe2":"zeigt mit Anregung Engagement in Projekten","stufe3":"zeigt Engagement in Projekten und besonderen Unterrichtsformen"},"intervention":["Interessen einbringen","Aktive Teilnahme","Motivation zeigen"]},{"id":"MA-36","title":"Strukturierte Arbeitsorganisation","stufen":{"stufe1":"benötigt noch viel Struktur bei der Arbeitsorganisation","stufe2":"profitiert von Struktur und arbeitet damit besser","stufe3":"kann von strukturierter Arbeitsorganisation profitieren und diese umsetzen"},"intervention":["Struktur anbieten","Übersichtlichkeit","Klare Abläufe"]},{"id":"MA-37","title":"Alternative Meinungen zulassen","stufen":{"stufe1":"hat noch Schwierigkeiten, alternative Meinungen zuzulassen","stufe2":"kann mit Unterstützung alternative Meinungen akzeptieren","stufe3":"kann alternative Meinungen zulassen und akzeptieren"},"intervention":["Toleranz üben","Perspektivwechsel","Offenheit entwickeln"]}],"attitudes_relationnelles":[{"id":"AR-1","title":"Vertrauen aufbauen","stufen":{"stufe1":"hat noch Schwierigkeiten, Vertrauen zu anderen aufzubauen","stufe2":"kann mit Unterstützung Vertrauen zu anderen aufbauen","stufe3":"kann Vertrauen zu anderen Menschen aufbauen"},"intervention":["Verlässlichkeit zeigen","Offenheit ermöglichen","Zeit geben"]},{"id":"AR-2","title":"Grenzen setzen","stufen":{"stufe1":"hat noch Schwierigkeiten, eigene Grenzen zu erkennen und zu kommunizieren","stufe2":"kann mit Unterstützung eigene Grenzen kommunizieren","stufe3":"kann eigene Grenzen erkennen und kommunizieren"},"intervention":["Nein sagen üben","Grenzen benennen","Selbstfürsorge praktizieren"]},{"id":"AR-3","title":"Grenzen respektieren","stufen":{"stufe1":"hat noch Schwierigkeiten, die Grenzen anderer zu respektieren","stufe2":"kann mit Erinnerung die Grenzen anderer respektieren","stufe3":"kann verstärkt die Grenzen anderer Mitschüler:innen respektieren"},"intervention":["Auf Signale achten","Nachfragen bei Unsicherheit","Respekt vorleben"]},{"id":"AR-4","title":"Aktives Zuhören","stufen":{"stufe1":"hat noch Schwierigkeiten, anderen aufmerksam zuzuhören","stufe2":"kann mit Anleitung anderen aufmerksam zuhören","stufe3":"kann anderen aufmerksam zuhören"},"intervention":["Blickkontakt halten","Nachfragen stellen","Zusammenfassen üben"]},{"id":"AR-5","title":"Empathie zeigen","stufen":{"stufe1":"hat noch Schwierigkeiten, sich in andere hineinzuversetzen","stufe2":"kann mit Unterstützung sich in andere hineinversetzen","stufe3":"kann sich in andere hineinversetzen"},"intervention":["Gefühle anderer benennen","Perspektivübernahme üben","Mitgefühl ausdrücken"]},{"id":"AR-6","title":"Konflikte lösen","stufen":{"stufe1":"hat noch Schwierigkeiten, Konflikte friedlich zu lösen","stufe2":"kann mit Moderation Konflikte friedlich lösen","stufe3":"kann Konflikte friedlich lösen"},"intervention":["Ich-Botschaften verwenden","Kompromisse finden","Win-Win-Lösungen suchen"]},{"id":"AR-7","title":"Kritikfähigkeit","stufen":{"stufe1":"hat noch Schwierigkeiten, konstruktive Kritik anzunehmen","stufe2":"kann mit Unterstützung konstruktive Kritik annehmen","stufe3":"kann besser mit konstruktiver Kritik umgehen"},"intervention":["Feedback-Regeln anwenden","Kritik nicht persönlich nehmen","Sachlich bleiben"]},{"id":"AR-8","title":"Hilfe annehmen","stufen":{"stufe1":"hat noch Schwierigkeiten, Hilfe von anderen anzunehmen","stufe2":"kann mit Ermutigung Hilfe von anderen annehmen","stufe3":"kann Hilfe von anderen annehmen"},"intervention":["Hilfe als Stärke sehen","Vertrauen in andere","Dankbarkeit zeigen"]},{"id":"AR-9","title":"Hilfe anbieten","stufen":{"stufe1":"bietet noch selten Hilfe an","stufe2":"kann mit Anregung anderen Hilfe anbieten","stufe3":"kann anderen Hilfe anbieten"},"intervention":["Aufmerksam für Bedürfnisse sein","Unterstützung anbieten","Ohne Erwartung helfen"]},{"id":"AR-10","title":"Freundschaften pflegen","stufen":{"stufe1":"hat noch Schwierigkeiten, Freundschaften aufzubauen und zu pflegen","stufe2":"kann mit Unterstützung Freundschaften pflegen","stufe3":"kann Freundschaften aufbauen und pflegen"},"intervention":["Regelmäßiger Kontakt","Interesse zeigen","Gemeinsame Aktivitäten"]},{"id":"AR-11","title":"Teamfähigkeit","stufen":{"stufe1":"hat noch Schwierigkeiten, effektiv im Team zu arbeiten","stufe2":"kann mit Anleitung effektiv im Team arbeiten","stufe3":"kann effektiv im Team arbeiten"},"intervention":["Rollen akzeptieren","Beiträge wertschätzen","Kompromissbereitschaft"]},{"id":"AR-12","title":"Respektvoller Umgang","stufen":{"stufe1":"begegnet anderen noch nicht immer mit Respekt","stufe2":"begegnet mit Erinnerung anderen mit Respekt","stufe3":"begegnet anderen mit Respekt"},"intervention":["Höflichkeitsformen","Wertschätzung zeigen","Würde achten"]},{"id":"AR-13","title":"Toleranz","stufen":{"stufe1":"hat noch Schwierigkeiten, Unterschiede zwischen Menschen zu akzeptieren","stufe2":"kann mit Gesprächen Unterschiede besser akzeptieren","stufe3":"akzeptiert Unterschiede zwischen Menschen"},"intervention":["Vielfalt als Bereicherung","Vorurteile reflektieren","Offenheit fördern"]},{"id":"AR-14","title":"Verantwortung übernehmen","stufen":{"stufe1":"hat noch Schwierigkeiten, Verantwortung für das eigene Handeln zu übernehmen","stufe2":"kann mit Unterstützung Verantwortung übernehmen","stufe3":"übernimmt Verantwortung für das eigene Handeln"},"intervention":["Konsequenzen tragen","Fehler eingestehen","Wiedergutmachung anbieten"]},{"id":"AR-15","title":"Verbindlichkeit","stufen":{"stufe1":"hat noch Schwierigkeiten, Versprechen und Abmachungen einzuhalten","stufe2":"kann mit Erinnerung Versprechen einhalten","stufe3":"hält Versprechen und Abmachungen ein"},"intervention":["Termine einhalten","Zuverlässigkeit üben","Erwartungen klären"]},{"id":"AR-16","title":"Nähe und Distanz","stufen":{"stufe1":"hat noch Schwierigkeiten, ein angemessenes Maß an Nähe und Distanz zu wahren","stufe2":"kann mit Hinweisen angemessene Distanz wahren","stufe3":"hält eine angemessene körperliche Distanz zu anderen Personen ein"},"intervention":["Körperliche Distanz beachten","Intimsphäre respektieren","Situationsangemessen handeln"]},{"id":"AR-17","title":"Kooperationsbereitschaft","stufen":{"stufe1":"zeigt noch wenig Bereitschaft, mit anderen zusammenzuarbeiten","stufe2":"zeigt mit Ermutigung Kooperationsbereitschaft","stufe3":"ist bereit, mit anderen zusammenzuarbeiten"},"intervention":["Gemeinsame Ziele verfolgen","Beiträge leisten","Zusammenarbeit wertschätzen"]},{"id":"AR-18","title":"Durchsetzungsvermögen","stufen":{"stufe1":"hat noch Schwierigkeiten, die eigene Meinung angemessen zu vertreten","stufe2":"kann mit Unterstützung die eigene Meinung vertreten","stufe3":"kann die eigene Meinung angemessen vertreten"},"intervention":["Selbstbewusst auftreten","Argumente formulieren","Standhaft bleiben ohne aggressiv zu sein"]},{"id":"AR-19","title":"Wertschätzung zeigen","stufen":{"stufe1":"zeigt noch selten Wertschätzung gegenüber Lehrpersonen und Mitschüler:innen","stufe2":"zeigt mit Anregung Wertschätzung","stufe3":"zeigt Wertschätzung und Dankbarkeit gegenüber Lehrpersonen und Mitschüler:innen"},"intervention":["Sich bedanken üben","Hilfe anerkennen","Positive Rückmeldungen geben"]},{"id":"AR-20","title":"Authentisches Auftreten","stufen":{"stufe1":"hat noch Schwierigkeiten, authentisch aufzutreten","stufe2":"kann mit Ermutigung authentischer auftreten","stufe3":"kann in der Schule authentisch auftreten und die eigene Meinung ehrlich äußern"},"intervention":["Eigene Meinung vertreten üben","Ehrlich kommunizieren","Selbstbewusst auftreten"]},{"id":"AR-21","title":"Eigener Konfliktanteil","stufen":{"stufe1":"hat noch Schwierigkeiten, den eigenen Anteil in Konflikten zu erkennen","stufe2":"kann mit Reflexionsgesprächen den eigenen Anteil erkennen","stufe3":"kann den eigenen Anteil in Konfliktsituationen erkennen und akzeptieren"},"intervention":["Reflexionsgespräche führen","Perspektivwechsel üben","Verantwortung übernehmen"]},{"id":"AR-22","title":"Erfolge anderer anerkennen","stufen":{"stufe1":"hat noch Schwierigkeiten, Erfolge anderer anzuerkennen","stufe2":"kann mit Unterstützung Erfolge anderer anerkennen","stufe3":"kann die Erfolge anderer anerkennen und sich für sie freuen"},"intervention":["Gratulieren üben","Neid reflektieren","Teamgeist fördern"]},{"id":"AR-23","title":"Alternative Verhaltensweisen","stufen":{"stufe1":"hat noch Schwierigkeiten, Verhaltensalternativen anzuwenden","stufe2":"kann mit Erinnerung Verhaltensalternativen anwenden","stufe3":"kann in schwierigen Situationen Verhaltensalternativen anwenden"},"intervention":["Verhaltensalternativen für Klassensituationen erarbeiten","Rollenspiele durchführen","Positive Verstärkung im Schulalltag"]},{"id":"AR-24","title":"Konflikte vorbeugen","stufen":{"stufe1":"hat noch Schwierigkeiten, Konfliktsituationen vorzubeugen","stufe2":"kann mit Unterstützung präventiv auf Konflikte reagieren","stufe3":"kann präventiv auf mögliche Konfliktsituationen reagieren"},"intervention":["Frühwarnsignale erkennen","Deeskalationsstrategien","Kommunikation vor Konflikten"]},{"id":"AR-25","title":"Nonverbale Kommunikation","stufen":{"stufe1":"setzt Körpersprache noch nicht bewusst ein","stufe2":"kann mit Anleitung Körpersprache bewusster einsetzen","stufe3":"kann Körpersprache bewusst einsetzen"},"intervention":["Körperhaltung üben","Mimik und Gestik reflektieren","Selbstbewusstes Auftreten"]},{"id":"AR-26","title":"Provokationen meiden","stufen":{"stufe1":"hat noch Schwierigkeiten, Provokationen zu meiden","stufe2":"kann mit Unterstützung Provokationen besser meiden","stufe3":"kann Provokationen aktiv und passiv meiden"},"intervention":["Trigger erkennen","Abstand nehmen","Nicht reagieren üben"]},{"id":"AR-27","title":"Sich entschuldigen","stufen":{"stufe1":"hat noch Schwierigkeiten, sich angemessen zu entschuldigen","stufe2":"kann mit Anleitung sich entschuldigen","stufe3":"kann sich angemessen entschuldigen, wenn ein Fehler gemacht wurde"},"intervention":["Entschuldigung formulieren","Wiedergutmachung anbieten","Einsicht zeigen"]},{"id":"AR-28","title":"Aussprechen lassen","stufen":{"stufe1":"hat noch Schwierigkeiten, andere ausreden zu lassen","stufe2":"kann mit Erinnerung andere ausreden lassen","stufe3":"kann andere ausreden lassen und warten, bis man an der Reihe ist"},"intervention":["Aktives Zuhören üben","Geduld trainieren","Gesprächsregeln beachten"]},{"id":"AR-29","title":"Angemessener Umgangston","stufen":{"stufe1":"pflegt noch nicht immer einen respektvollen Umgangston","stufe2":"pflegt mit Erinnerung einen respektvollen Umgangston","stufe3":"pflegt einen respektvollen Umgangston mit allen Personen"},"intervention":["Höflichkeitsformen üben","Wortwahl reflektieren","Vorbildfunktion nutzen"]},{"id":"AR-30","title":"Körperliche Distanz wahren","stufen":{"stufe1":"hat noch Schwierigkeiten, körperliche Distanz einzuhalten","stufe2":"kann mit Hinweisen körperliche Distanz einhalten","stufe3":"hält selbstständig eine angemessene körperliche Distanz zu anderen Personen ein"},"intervention":["Grenzen wahrnehmen","Signale beachten","Nachfragen bei Unsicherheit"]},{"id":"AR-31","title":"Soziale Kontakte aufgebaut","stufen":{"stufe1":"baut noch stabile soziale Kontakte auf","stufe2":"hat mit Unterstützung soziale Kontakte aufgebaut","stufe3":"hat stabile soziale Kontakte aufgebaut und pflegt diese"},"intervention":["Freizeitaktivitäten mit Freunden","Regelmäßiger Kontakt","Außerschulische Beziehungen"]},{"id":"AR-32","title":"Aktive Kontaktaufnahme","stufen":{"stufe1":"hat noch Schwierigkeiten, aktiv auf andere zuzugehen","stufe2":"kann mit Ermutigung auf andere Jugendliche zugehen","stufe3":"kann aktiv auf andere Jugendliche zugehen und Kontakt aufnehmen"},"intervention":["Initiative ergreifen üben","Gesprächseinstiege lernen","Offenheit zeigen"]},{"id":"AR-33","title":"Harmonischer Umgang","stufen":{"stufe1":"hat noch nicht immer einen harmonischen Umgang mit Mitschüler:innen","stufe2":"hat mit Unterstützung einen besseren Umgang mit Mitschüler:innen","stufe3":"hat einen harmonischen Umgang mit Mitschüler:innen"},"intervention":["Positive Interaktionen verstärken","Gemeinschaftsgefühl fördern","Rücksichtnahme üben"]},{"id":"AR-34","title":"Gruppenrolle gefunden","stufen":{"stufe1":"sucht noch nach einer positiven Rolle in der Gruppe","stufe2":"hat mit Unterstützung eine Rolle in der Gruppe gefunden","stufe3":"hat eine positive Rolle innerhalb der Gruppe gefunden"},"intervention":["Stärken einbringen","Verantwortung übernehmen","Beitrag zur Gemeinschaft"]},{"id":"AR-35","title":"Vertrauen aufgebaut","stufen":{"stufe1":"baut noch Vertrauen zu Bezugspersonen auf","stufe2":"hat mit Zeit Vertrauen zu einigen Bezugspersonen aufgebaut","stufe3":"hat Vertrauen zu Bezugspersonen aufbauen können"},"intervention":["Zeit geben","Verlässlichkeit zeigen","Offene Kommunikation"]}],"attitudes_affectives":[{"id":"AA-1","title":"Gefühle erkennen","stufen":{"stufe1":"hat noch Schwierigkeiten, eigene Gefühle zu erkennen und zu benennen","stufe2":"kann mit Unterstützung eigene Gefühle erkennen und benennen","stufe3":"kann eigene Gefühle erkennen und benennen"},"intervention":["Gefühlstagebuch führen","Körperempfindungen beachten","Gefühlsvokabular erweitern"]},{"id":"AA-2","title":"Gefühle ausdrücken","stufen":{"stufe1":"hat noch Schwierigkeiten, Gefühle angemessen auszudrücken","stufe2":"kann mit Anleitung Gefühle angemessen ausdrücken","stufe3":"kann zu bestimmten Momenten Gefühle angemessen ausdrücken"},"intervention":["Ich-Botschaften nutzen","Kreative Ausdrucksformen","Gefühle verbalisieren üben"]},{"id":"AA-3","title":"Emotionsregulation","stufen":{"stufe1":"hat noch Schwierigkeiten, Gefühle zu regulieren","stufe2":"kann mit Unterstützung Gefühle regulieren","stufe3":"kann Gefühle regulieren"},"intervention":["Beruhigungstechniken","Atemübungen","Notfallstrategien entwickeln"]},{"id":"AA-4","title":"Frustrationstoleranz","stufen":{"stufe1":"hat noch Schwierigkeiten, mit Frustration umzugehen","stufe2":"kann mit Unterstützung mit Frustration umgehen","stufe3":"kann mit Frustration umgehen"},"intervention":["Frustrationsauslöser erkennen","Alternative Reaktionen üben","Gedanken umstrukturieren"]},{"id":"AA-5","title":"Impulskontrolle","stufen":{"stufe1":"hat noch Schwierigkeiten, impulsive Reaktionen zu kontrollieren","stufe2":"kann mit Erinnerung impulsive Reaktionen kontrollieren","stufe3":"kann verstärkt impulsive Reaktionen kontrollieren"},"intervention":["Stopp-Technik anwenden","Nachdenken vor Handeln","Konsequenzen bedenken"]},{"id":"AA-6","title":"Stressbewältigung","stufen":{"stufe1":"hat noch Schwierigkeiten, mit Stress umzugehen","stufe2":"kann mit Unterstützung mit Stress umgehen","stufe3":"kann mit Stress umgehen"},"intervention":["Stressoren identifizieren","Entspannungstechniken","Ausgleich schaffen"]},{"id":"AA-7","title":"Angstbewältigung","stufen":{"stufe1":"hat noch Schwierigkeiten, mit Ängsten umzugehen","stufe2":"kann mit Unterstützung mit Ängsten umgehen","stufe3":"kann mit Ängsten umgehen"},"intervention":["Ängste benennen","Schrittweise Konfrontation","Sicherheitsstrategien entwickeln"]},{"id":"AA-8","title":"Wutmanagement","stufen":{"stufe1":"hat noch Schwierigkeiten, Wut zu kontrollieren","stufe2":"kann mit Unterstützung Wut kontrollieren","stufe3":"kann Wut kontrollieren"},"intervention":["Wuttrigger erkennen","Auszeit nehmen","Energie ableiten"]},{"id":"AA-9","title":"Trauer verarbeiten","stufen":{"stufe1":"hat noch Schwierigkeiten, Trauer zuzulassen und zu verarbeiten","stufe2":"kann mit Begleitung Trauer zulassen und verarbeiten","stufe3":"kann Trauer zulassen und verarbeiten"},"intervention":["Trauer ausdrücken erlauben","Rituale entwickeln","Unterstützung suchen"]},{"id":"AA-10","title":"Selbstwertgefühl","stufen":{"stufe1":"hat noch Schwierigkeiten, ein positives Selbstbild zu entwickeln","stufe2":"entwickelt mit Unterstützung ein positiveres Selbstbild","stufe3":"hat ein positives Bild von sich selbst"},"intervention":["Stärken identifizieren","Selbstmitgefühl üben","Negative Gedanken hinterfragen"]},{"id":"AA-11","title":"Selbstvertrauen","stufen":{"stufe1":"hat noch wenig Vertrauen in die eigenen Fähigkeiten","stufe2":"vertraut mit Ermutigung mehr in die eigenen Fähigkeiten","stufe3":"vertraut in die eigenen Fähigkeiten"},"intervention":["Erfolgserlebnisse schaffen","Komfortzone erweitern","Positive Selbstgespräche"]},{"id":"AA-12","title":"Resilienz","stufen":{"stufe1":"hat noch Schwierigkeiten, Rückschläge zu verkraften","stufe2":"kann mit Unterstützung Rückschläge verkraften","stufe3":"kann Rückschläge verkraften und weitermachen"},"intervention":["Bewältigungsstrategien entwickeln","Soziales Netzwerk nutzen","Optimismus fördern"]},{"id":"AA-13","title":"Optimismus","stufen":{"stufe1":"hat noch Schwierigkeiten, in schwierigen Situationen positiv zu denken","stufe2":"kann mit Unterstützung positivere Gedanken entwickeln","stufe3":"kann auch in schwierigen Situationen positiv denken"},"intervention":["Positive Aspekte finden","Hoffnung bewahren","Lösungsorientiert denken"]},{"id":"AA-14","title":"Geduld","stufen":{"stufe1":"hat noch Schwierigkeiten, geduldig zu sein und zu warten","stufe2":"kann mit Unterstützung geduldiger sein","stufe3":"kann geduldig sein und warten"},"intervention":["Warten üben","Belohnungsaufschub trainieren","Ablenkungsstrategien"]},{"id":"AA-15","title":"Gelassenheit","stufen":{"stufe1":"hat noch Schwierigkeiten, in stressigen Situationen ruhig zu bleiben","stufe2":"kann mit Anleitung in stressigen Situationen ruhiger bleiben","stufe3":"kann in stressigen Situationen ruhig bleiben"},"intervention":["Achtsamkeitsübungen","Perspektive bewahren","Was kann ich kontrollieren?"]},{"id":"AA-16","title":"Freude erleben","stufen":{"stufe1":"hat noch Schwierigkeiten, Freude zu empfinden und zu genießen","stufe2":"kann mit Anregung Freude erleben","stufe3":"kann Freude empfinden und genießen"},"intervention":["Positive Aktivitäten planen","Im Moment sein","Dankbarkeit praktizieren"]},{"id":"AA-17","title":"Emotionale Stabilität","stufen":{"stufe1":"hat noch keine ausgeglichene emotionale Grundstimmung","stufe2":"zeigt mit Unterstützung eine stabilere Grundstimmung","stufe3":"hat eine ausgeglichene emotionale Grundstimmung"},"intervention":["Routinen etablieren","Selbstfürsorge praktizieren","Balance finden"]},{"id":"AA-18","title":"Scham bewältigen","stufen":{"stufe1":"hat noch Schwierigkeiten, mit Schamgefühlen umzugehen","stufe2":"kann mit Unterstützung mit Schamgefühlen umgehen","stufe3":"kann mit Schamgefühlen umgehen"},"intervention":["Scham normalisieren","Selbstmitgefühl üben","Vertraute Person einbeziehen"]},{"id":"AA-19","title":"Eifersucht regulieren","stufen":{"stufe1":"hat noch Schwierigkeiten, mit Eifersuchtsgefühlen umzugehen","stufe2":"kann mit Unterstützung mit Eifersuchtsgefühlen umgehen","stufe3":"kann mit Eifersuchtsgefühlen umgehen"},"intervention":["Auslöser verstehen","Selbstwert stärken","Kommunikation fördern"]},{"id":"AA-20","title":"Hoffnung bewahren","stufen":{"stufe1":"hat noch Schwierigkeiten, in schwierigen Zeiten Hoffnung zu haben","stufe2":"kann mit Unterstützung Hoffnung bewahren","stufe3":"kann auch in schwierigen Zeiten Hoffnung haben"},"intervention":["Zukunftsvisionen entwickeln","Kleine Fortschritte wahrnehmen","Unterstützung suchen"]},{"id":"AA-21","title":"Proaktive Haltung","stufen":{"stufe1":"sieht sich noch als Opfer der Umstände","stufe2":"entwickelt mit Unterstützung eine proaktivere Haltung","stufe3":"nimmt eine proaktive Haltung ein und sieht sich nicht als Opfer der Umstände"},"intervention":["Selbstwirksamkeit stärken","Handlungsoptionen erkennen","Verantwortung übernehmen"]},{"id":"AA-22","title":"Mit Lob umgehen","stufen":{"stufe1":"hat noch Schwierigkeiten, Lob und Anerkennung anzunehmen","stufe2":"kann mit Unterstützung Lob besser annehmen","stufe3":"kann Lob und Anerkennung annehmen und verarbeiten"},"intervention":["Komplimente annehmen üben","Selbstwert stärken","Positive Rückmeldungen akzeptieren"]},{"id":"AA-23","title":"Therapeutische Offenheit","stufen":{"stufe1":"hat noch Schwierigkeiten, sich auf pädagogische Unterstützung einzulassen","stufe2":"kann sich mit Vertrauensaufbau auf Unterstützung einlassen","stufe3":"kann sich auf therapeutische oder pädagogische Unterstützung einlassen"},"intervention":["Vertrauen aufbauen","Offenheit ermöglichen","Nutzen erkennen"]},{"id":"AA-24","title":"Eigene Fortschritte erkennen","stufen":{"stufe1":"hat noch Schwierigkeiten, eigene Fortschritte zu erkennen","stufe2":"kann mit Hinweisen eigene Fortschritte erkennen","stufe3":"erkennt eigene Fortschritte und Entwicklungen"},"intervention":["Reflexionsgespräche","Entwicklungsdokumentation","Erfolge würdigen"]},{"id":"AA-25","title":"Gefühle differenziert benennen","stufen":{"stufe1":"benennt Gefühle noch undifferenziert (nur gut/schlecht)","stufe2":"kann mit Hilfe Gefühle differenzierter benennen","stufe3":"kann die Gefühlslage differenziert verbalisieren"},"intervention":["Gefühlsvokabular erweitern","Nuancen erkennen","Nicht nur gut/schlecht"]},{"id":"AA-26","title":"Ursachen erkennen","stufen":{"stufe1":"hat noch Schwierigkeiten, Ursachen negativer Emotionen zu erkennen","stufe2":"kann mit Unterstützung Ursachen erkennen","stufe3":"kann die Ursache negativer Emotionen erkennen und verbalisieren"},"intervention":["Trigger identifizieren","Zusammenhänge verstehen","Kausalitäten erkennen"]},{"id":"AA-27","title":"Schnellere Regulation","stufen":{"stufe1":"braucht nach einer Krise noch lange zur Regulation","stufe2":"kann sich mit Unterstützung schneller nach einer Krise regulieren","stufe3":"kann sich nach einer Krise schneller wieder regulieren"},"intervention":["Regulationsstrategien üben","Rückkehr in Alltag","Selbstberuhigung"]},{"id":"AA-28","title":"Mit Niederlagen umgehen","stufen":{"stufe1":"hat noch Schwierigkeiten, in Gruppensituationen mit Niederlagen umzugehen","stufe2":"kann mit Unterstützung mit Niederlagen umgehen","stufe3":"kann in Gruppensituationen gut mit Niederlagen umgehen"},"intervention":["Frustrationstoleranz","Fairness entwickeln","Verlieren können"]},{"id":"AA-29","title":"Ängste differenziert kommunizieren","stufen":{"stufe1":"hat noch Schwierigkeiten, Ängste differenziert zu kommunizieren","stufe2":"kann mit Unterstützung Ängste besser kommunizieren","stufe3":"kann Ängste differenziert kommunizieren und verstehen"},"intervention":["Ängste benennen","Zusammenhänge erkennen","Auslöser identifizieren"]},{"id":"AA-30","title":"Selbst- und Fremdwahrnehmung","stufen":{"stufe1":"versteht noch nicht, wie das eigene Verhalten andere beeinflusst","stufe2":"versteht mit Erklärung die Auswirkungen des eigenen Verhaltens","stufe3":"versteht, dass das eigene Verhalten Auswirkungen auf sich und das Umfeld hat"},"intervention":["Konsequenzen reflektieren","Perspektivwechsel","Feedback annehmen"]},{"id":"AA-31","title":"Flexibilität bei Veränderungen","stufen":{"stufe1":"hat noch Schwierigkeiten, flexibel mit Veränderungen umzugehen","stufe2":"kann mit Unterstützung flexibler mit Veränderungen umgehen","stufe3":"kann flexibel mit Veränderungen umgehen"},"intervention":["Anpassungsfähigkeit üben","Unvorhergesehenes akzeptieren","Rigidität reduzieren"]},{"id":"AA-32","title":"Emotionalen Zustand verbalisieren","stufen":{"stufe1":"hat noch Schwierigkeiten, den emotionalen Zustand zu verbalisieren","stufe2":"kann mit Anregung den emotionalen Zustand verbalisieren","stufe3":"kann den emotionalen Zustand offen kommunizieren"},"intervention":["Gefühle teilen","Vertrauen aufbauen","Offenheit üben"]},{"id":"AA-33","title":"Mit Distanz reflektieren","stufen":{"stufe1":"hat noch Schwierigkeiten, mit Distanz zu Situationen zu reflektieren","stufe2":"kann mit Unterstützung mit Distanz reflektieren","stufe3":"kann mit Distanz zu einer Situation reflektieren"},"intervention":["Abstand nehmen","Nachbetrachtung","Objektivität entwickeln"]},{"id":"AA-34","title":"Selbstbewussteres Auftreten","stufen":{"stufe1":"tritt noch unsicher und zurückhaltend auf","stufe2":"tritt mit Ermutigung selbstbewusster auf","stufe3":"tritt selbstbewusst und offen auf"},"intervention":["Körperhaltung verbessern","Selbstsicherheit stärken","Erfolge wahrnehmen"]},{"id":"AA-35","title":"Stolz auf Fortschritte","stufen":{"stufe1":"hat noch Schwierigkeiten, stolz auf Fortschritte zu sein","stufe2":"kann mit Ermutigung Stolz auf Fortschritte empfinden","stufe3":"ist stolz auf Fortschritte und kann diese benennen"},"intervention":["Erfolge würdigen","Selbstanerkennung","Positive Selbstgespräche"]},{"id":"AA-36","title":"Ausgleich durch Bewegung","stufen":{"stufe1":"nutzt Bewegung noch nicht als Ausgleich","stufe2":"findet mit Anregung Ausgleich durch Bewegung","stufe3":"findet Ausgleich durch Bewegung und Sport"},"intervention":["Sportliche Aktivitäten","Energie ableiten","Körperliche Betätigung nutzen"]}],"competences_essentielles":[{"id":"CE-1","title":"Körperhygiene","stufen":{"stufe1":"braucht noch Erinnerung für die Körperhygiene","stufe2":"achtet mit wenigen Erinnerungen auf Körperhygiene","stufe3":"achtet auf Körperhygiene"},"intervention":["Routinen etablieren","Checklisten nutzen","Selbstständigkeit fördern"]},{"id":"CE-2","title":"Gesunde Ernährung","stufen":{"stufe1":"ernährt sich noch nicht ausgewogen und gesund","stufe2":"achtet mit Anleitung auf eine gesündere Ernährung","stufe3":"ernährt sich ausgewogen und gesund"},"intervention":["Ernährungswissen vermitteln","Gemeinsam kochen","Mahlzeiten planen"]},{"id":"CE-3","title":"Kochen und Zubereiten","stufen":{"stufe1":"lernt noch, einfache Mahlzeiten zuzubereiten","stufe2":"kann mit Anleitung einfache Mahlzeiten zubereiten","stufe3":"kann einfache Mahlzeiten zubereiten"},"intervention":["Rezepte ausprobieren","Küchengeräte bedienen","Lebensmittelsicherheit"]},{"id":"CE-4","title":"Einkaufen","stufen":{"stufe1":"lernt noch, selbstständig einzukaufen","stufe2":"kann mit Begleitung einkaufen","stufe3":"kann einkaufen gehen"},"intervention":["Einkaufslisten erstellen","Preise vergleichen","Bezahlvorgänge üben"]},{"id":"CE-5","title":"Haushaltsführung","stufen":{"stufe1":"braucht noch Erinnerung für die Sauberkeit des Wohnbereichs","stufe2":"kann mit Erinnerung den Wohnbereich sauber halten","stufe3":"kann den Wohnbereich sauber halten"},"intervention":["Putzplan erstellen","Ordnung halten","Aufgaben aufteilen"]},{"id":"CE-6","title":"Wäschepflege","stufen":{"stufe1":"lernt noch, Wäsche zu waschen und zu pflegen","stufe2":"kann mit Anleitung Wäsche waschen und pflegen","stufe3":"kann Wäsche waschen und pflegen"},"intervention":["Waschmaschine bedienen","Pflegesymbole verstehen","Kleidung sortieren"]},{"id":"CE-7","title":"Geldmanagement","stufen":{"stufe1":"hat noch Schwierigkeiten, Geld einzuteilen und zu verwalten","stufe2":"kann mit Unterstützung Geld einteilen","stufe3":"kann Geld einteilen und verwalten"},"intervention":["Budget erstellen","Ausgaben dokumentieren","Sparen üben"]},{"id":"CE-8","title":"Behördengänge","stufen":{"stufe1":"lernt noch, Behördengänge zu erledigen","stufe2":"kann mit Begleitung Behördengänge erledigen","stufe3":"kann Behördengänge erledigen"},"intervention":["Formulare ausfüllen","Termine vereinbaren","Dokumente organisieren"]},{"id":"CE-9","title":"Mobilität","stufen":{"stufe1":"lernt noch, öffentliche Verkehrsmittel zu nutzen","stufe2":"kann mit Anleitung öffentliche Verkehrsmittel nutzen","stufe3":"kann öffentliche Verkehrsmittel nutzen"},"intervention":["Fahrpläne lesen","Routen planen","Tickets kaufen"]},{"id":"CE-10","title":"Gesundheitsvorsorge","stufen":{"stufe1":"braucht noch Erinnerung für die Gesundheitsvorsorge","stufe2":"kümmert sich mit Erinnerung um die Gesundheit","stufe3":"kümmert sich um die eigene Gesundheit"},"intervention":["Arzttermine wahrnehmen","Medikamente einnehmen","Warnsignale erkennen"]},{"id":"CE-11","title":"Sicherheit im Alltag","stufen":{"stufe1":"hat noch Schwierigkeiten, Gefahren zu erkennen und zu vermeiden","stufe2":"kann mit Hinweisen Gefahren erkennen und vermeiden","stufe3":"kann Gefahren im Alltag erkennen und vermeiden"},"intervention":["Gefahrenquellen kennen","Notrufnummern kennen","Sicherheitsregeln beachten"]},{"id":"CE-12","title":"Mediennutzung","stufen":{"stufe1":"nutzt digitale Medien noch nicht verantwortungsvoll","stufe2":"nutzt mit Anleitung digitale Medien verantwortungsvoller","stufe3":"nutzt digitale Medien verantwortungsvoll"},"intervention":["Bildschirmzeit begrenzen","Datenschutz beachten","Kritischer Umgang mit Inhalten"]},{"id":"CE-13","title":"Tagesstruktur","stufen":{"stufe1":"hat noch Schwierigkeiten, den Tag sinnvoll zu strukturieren","stufe2":"kann mit Unterstützung den Tag strukturieren","stufe3":"kann den Tag sinnvoll strukturieren"},"intervention":["Tagesplan erstellen","Routinen einhalten","Prioritäten setzen"]},{"id":"CE-14","title":"Schlafhygiene","stufen":{"stufe1":"sorgt noch nicht für ausreichend und guten Schlaf","stufe2":"sorgt mit Erinnerung für besseren Schlaf","stufe3":"sorgt für ausreichend und guten Schlaf"},"intervention":["Schlafrhythmus etablieren","Schlafumgebung gestalten","Einschlafrituale"]},{"id":"CE-15","title":"Pünktlichkeit","stufen":{"stufe1":"hat noch Schwierigkeiten mit Pünktlichkeit","stufe2":"ist mit Erinnerung pünktlicher","stufe3":"ist pünktlich zu Terminen und Verabredungen"},"intervention":["Zeitpuffer einplanen","Erinnerungen nutzen","Vorbereitung am Vorabend"]},{"id":"CE-16","title":"Telefonieren","stufen":{"stufe1":"hat noch Schwierigkeiten, Telefongespräche zu führen","stufe2":"kann mit Vorbereitung Telefongespräche führen","stufe3":"kann Telefongespräche führen"},"intervention":["Gesprächsführung üben","Wichtige Infos notieren","Höflichkeitsformen"]},{"id":"CE-17","title":"E-Mails schreiben","stufen":{"stufe1":"lernt noch, formelle E-Mails zu verfassen","stufe2":"kann mit Anleitung formelle E-Mails verfassen","stufe3":"kann formelle E-Mails verfassen"},"intervention":["Aufbau einer E-Mail","Höfliche Formulierungen","Anhänge versenden"]},{"id":"CE-18","title":"Erste Hilfe","stufen":{"stufe1":"kennt noch keine Erste-Hilfe-Maßnahmen","stufe2":"kennt mit Übung grundlegende Erste-Hilfe-Maßnahmen","stufe3":"kann in Notfällen Erste Hilfe leisten"},"intervention":["Erste-Hilfe-Kurs","Notruf absetzen","Grundlegende Maßnahmen"]},{"id":"CE-20","title":"Berufsorientierung","stufen":{"stufe1":"kennt die eigenen beruflichen Interessen noch nicht","stufe2":"erkundet mit Unterstützung berufliche Interessen","stufe3":"kennt die eigenen beruflichen Interessen und Möglichkeiten"},"intervention":["Stärken erkunden","Berufe kennenlernen","Praktika absolvieren"]},{"id":"CE-21","title":"Bewerbung schreiben","stufen":{"stufe1":"lernt noch, eine Bewerbung zu verfassen","stufe2":"kann mit Anleitung eine Bewerbung verfassen","stufe3":"kann eine Bewerbung verfassen"},"intervention":["Lebenslauf erstellen","Anschreiben formulieren","Bewerbungsunterlagen zusammenstellen"]},{"id":"CE-22","title":"Vorstellungsgespräch","stufen":{"stufe1":"hat noch Schwierigkeiten, sich in einem Vorstellungsgespräch zu präsentieren","stufe2":"kann mit Übung sich in einem Vorstellungsgespräch präsentieren","stufe3":"kann sich in einem Vorstellungsgespräch präsentieren"},"intervention":["Selbstpräsentation üben","Fragen vorbereiten","Dresscode beachten"]},{"id":"CE-23","title":"Arbeitsorganisation","stufen":{"stufe1":"hat noch Schwierigkeiten, die Arbeit selbstständig zu organisieren","stufe2":"kann mit Anleitung die Arbeit organisieren","stufe3":"kann die Arbeit organisieren"},"intervention":["Aufgaben strukturieren","Prioritäten setzen","Fristen einhalten"]},{"id":"CE-25","title":"Umweltbewusstsein","stufen":{"stufe1":"handelt noch nicht umweltbewusst im Alltag","stufe2":"handelt mit Anleitung umweltbewusster","stufe3":"handelt umweltbewusst im Alltag"},"intervention":["Mülltrennung","Ressourcen sparen","Nachhaltigkeit verstehen"]},{"id":"CE-26","title":"Medienkonsum regulieren","stufen":{"stufe1":"hat noch Schwierigkeiten, den Medienkonsum zu regulieren","stufe2":"kann mit Unterstützung den Medienkonsum regulieren","stufe3":"kann den Medienkonsum regulieren"},"intervention":["Zeitlimits setzen","Alternativen finden","Selbstkontrolle üben"]},{"id":"CE-27","title":"Gepflegtes Erscheinungsbild","stufen":{"stufe1":"achtet noch nicht auf ein gepflegtes Erscheinungsbild","stufe2":"achtet mit Erinnerung auf ein gepflegteres Erscheinungsbild","stufe3":"achtet auf ein gepflegtes Erscheinungsbild"},"intervention":["Routinen etablieren","Selbstfürsorge","Körperbewusstsein"]},{"id":"CE-28","title":"Online-Sicherheit","stufen":{"stufe1":"hat noch Schwierigkeiten, sich sicher im Internet zu bewegen","stufe2":"kann mit Anleitung sicherer im Internet surfen","stufe3":"kann sich sicher im Internet bewegen"},"intervention":["Datenschutz beachten","Kritischer Umgang","Gefahren erkennen"]},{"id":"CE-29","title":"Realistische Erwartungen","stufen":{"stufe1":"hat noch unrealistische Erwartungen an Schule und Arbeitswelt","stufe2":"entwickelt mit Gesprächen realistischere Erwartungen","stufe3":"hat realistische Erwartungen an Schule und Arbeitswelt"},"intervention":["Berufsorientierung","Anforderungen verstehen","Ziele anpassen"]},{"id":"CE-30","title":"Krisenplan anwenden","stufen":{"stufe1":"hat noch keinen Krisenplan oder kann ihn nicht anwenden","stufe2":"kann mit Unterstützung den Krisenplan anwenden","stufe3":"kann in Krisensituationen den Krisenplan anwenden"},"intervention":["Plan erarbeiten","Strategien üben","Selbsthilfe aktivieren"]},{"id":"CE-31","title":"Gute kognitive Fähigkeiten","stufen":{"stufe1":"nutzt die eigenen kognitiven Fähigkeiten noch nicht voll","stufe2":"nutzt mit Förderung die kognitiven Fähigkeiten besser","stufe3":"hat gute kognitive Fähigkeiten und nutzt diese"},"intervention":["Stärken einsetzen","Potenzial nutzen","Förderung anbieten"]},{"id":"CE-32","title":"Wissbegierig und motiviert","stufen":{"stufe1":"zeigt noch wenig Wissbegier und Lernmotivation","stufe2":"zeigt mit Anregung mehr Wissbegier","stufe3":"zeigt Wissbegier und ist motiviert zu lernen"},"intervention":["Interessen aufgreifen","Neugier fördern","Motivation erhalten"]},{"id":"CE-33","title":"Vielfältige Interessen","stufen":{"stufe1":"hat noch wenige Interessen und Hobbys","stufe2":"entwickelt mit Anregung neue Interessen","stufe3":"hat verschiedene Interessen und Hobbys"},"intervention":["Interessen fördern","Neue Aktivitäten erkunden","Ressourcen nutzen"]}],"culture_loisirs":[{"id":"CL-1","title":"Freizeitgestaltung","stufen":{"stufe1":"hat noch Schwierigkeiten, die Freizeit sinnvoll zu gestalten","stufe2":"kann mit Anregung die Freizeit sinnvoller gestalten","stufe3":"kann die Freizeit sinnvoll gestalten"},"intervention":["Hobbys erkunden","Interessen fördern","Aktivitäten planen"]},{"id":"CL-2","title":"Sport und Bewegung","stufen":{"stufe1":"bewegt sich noch nicht regelmäßig","stufe2":"bewegt sich mit Anregung regelmäßiger","stufe3":"bewegt sich regelmäßig und treibt Sport"},"intervention":["Sportart finden","Bewegung in Alltag integrieren","Motivation aufrechterhalten"]},{"id":"CL-3","title":"Kreative Aktivitäten","stufen":{"stufe1":"gestaltet noch selten kreativ und künstlerisch","stufe2":"gestaltet mit Anregung kreativer","stufe3":"gestaltet kreativ und künstlerisch"},"intervention":["Verschiedene Techniken ausprobieren","Kreativität fördern","Ausdrucksmöglichkeiten finden"]},{"id":"CL-4","title":"Musik","stufen":{"stufe1":"beschäftigt sich noch nicht aktiv mit Musik","stufe2":"beschäftigt sich mit Anregung mehr mit Musik","stufe3":"beschäftigt sich aktiv mit Musik"},"intervention":["Instrument lernen","Musik hören und verstehen","Konzerte besuchen"]},{"id":"CL-5","title":"Lesen","stufen":{"stufe1":"liest noch nicht regelmäßig","stufe2":"liest mit Anregung regelmäßiger","stufe3":"liest regelmäßig Bücher oder andere Texte"},"intervention":["Leseinteresse wecken","Passende Lektüre finden","Lesezeit einplanen"]},{"id":"CL-6","title":"Kulturelle Teilhabe","stufen":{"stufe1":"nimmt noch nicht am kulturellen Leben teil","stufe2":"nimmt mit Anregung mehr am kulturellen Leben teil","stufe3":"nimmt am kulturellen Leben teil"},"intervention":["Kulturveranstaltungen besuchen","Museen erkunden","Theater erleben"]},{"id":"CL-7","title":"Naturerlebnis","stufen":{"stufe1":"verbringt noch wenig Zeit in der Natur","stufe2":"verbringt mit Anregung mehr Zeit in der Natur","stufe3":"verbringt regelmäßig Zeit in der Natur"},"intervention":["Spaziergänge machen","Natur beobachten","Outdoor-Aktivitäten"]},{"id":"CL-8","title":"Gesellschaftsspiele","stufen":{"stufe1":"hat noch Schwierigkeiten, Gesellschaftsspiele zu spielen und Regeln zu befolgen","stufe2":"kann mit Anleitung Gesellschaftsspiele spielen","stufe3":"kann Gesellschaftsspiele spielen und Regeln befolgen"},"intervention":["Spielregeln verstehen","Fair spielen","Gewinnen und Verlieren lernen"]},{"id":"CL-9","title":"Handwerkliche Tätigkeiten","stufen":{"stufe1":"hat noch Schwierigkeiten mit handwerklichen Arbeiten","stufe2":"kann mit Anleitung handwerklich arbeiten","stufe3":"kann handwerklich arbeiten"},"intervention":["Werkzeuge kennenlernen","Projekte durchführen","Sicherheit beachten"]},{"id":"CL-10","title":"Kochen als Hobby","stufen":{"stufe1":"kocht noch nicht gerne als Hobby","stufe2":"kocht mit Anregung gerne","stufe3":"kocht gerne und probiert neue Rezepte"},"intervention":["Rezepte sammeln","Gemeinsam kochen","Verschiedene Küchen entdecken"]},{"id":"CL-11","title":"Fotografie","stufen":{"stufe1":"beschäftigt sich noch nicht mit Fotografie","stufe2":"beschäftigt sich mit Anleitung mit Fotografie","stufe3":"fotografiert und gestaltet Bilder"},"intervention":["Kamerafunktionen lernen","Bildgestaltung üben","Bilder bearbeiten"]},{"id":"CL-12","title":"Gartenarbeit","stufen":{"stufe1":"hat noch keine Erfahrung mit Gartenarbeit","stufe2":"kann mit Anleitung im Garten arbeiten","stufe3":"kann Pflanzen pflegen und im Garten arbeiten"},"intervention":["Pflanzen kennenlernen","Gartenpflege erlernen","Verantwortung übernehmen"]},{"id":"CL-13","title":"Tanzen","stufen":{"stufe1":"drückt sich noch nicht durch Tanz aus","stufe2":"tanzt mit Anregung mehr","stufe3":"drückt sich durch Tanz und Bewegung aus"},"intervention":["Tanzstile ausprobieren","Rhythmusgefühl entwickeln","Tanzveranstaltungen besuchen"]},{"id":"CL-14","title":"Film und Kino","stufen":{"stufe1":"schaut Filme noch ohne bewusste Reflexion","stufe2":"kann mit Anleitung über Filme diskutieren","stufe3":"schaut bewusst Filme und kann darüber diskutieren"},"intervention":["Filmgenres kennenlernen","Filme analysieren","Kinobesuche planen"]},{"id":"CL-15","title":"Ehrenamtliches Engagement","stufen":{"stufe1":"engagiert sich noch nicht ehrenamtlich","stufe2":"engagiert sich mit Anregung ehrenamtlich","stufe3":"engagiert sich ehrenamtlich für andere"},"intervention":["Engagement-Möglichkeiten finden","Regelmäßige Mitarbeit","Sinn und Erfüllung erleben"]},{"id":"CL-16","title":"Vereinsmitgliedschaft","stufen":{"stufe1":"ist noch nicht Mitglied in einem Verein","stufe2":"erkundet mit Unterstützung passende Vereine","stufe3":"ist Mitglied in einem Verein oder einer Gruppe"},"intervention":["Passenden Verein finden","Regelmäßig teilnehmen","Gemeinschaft erleben"]},{"id":"CL-18","title":"Entspannung","stufen":{"stufe1":"kennt und nutzt noch keine Entspannungstechniken","stufe2":"erlernt mit Anleitung Entspannungstechniken","stufe3":"kennt und nutzt Entspannungstechniken"},"intervention":["Entspannungsmethoden erlernen","Regelmäßig anwenden","Stressabbau"]},{"id":"CL-19","title":"Soziale Medien","stufen":{"stufe1":"nutzt soziale Medien noch nicht verantwortungsvoll","stufe2":"nutzt mit Anleitung soziale Medien verantwortungsvoller","stufe3":"nutzt soziale Medien verantwortungsvoll"},"intervention":["Datenschutz beachten","Zeit begrenzen","Positiver Umgang"]}]},"zieleFremd":{"V-1":{"fr":["Je montre que je perçois un stimulus sensoriel."],"en":["I look at the teacher when they touch me."]},"V-2":{"fr":["Je me tourne vers la source d'un stimulus sensoriel."],"en":["I look at the pictures the teacher shows me."]},"V-3":{"fr":["Je regarde ce qu'on me montre.","J'écoute quand l'enseignant(e) parle."],"en":["I look at what is being shown to me.","I listen when the teacher says something."]},"V-4":{"fr":["Je réagis spontanément par une action motrice à un stimulus simple."],"en":["When the teacher reaches out their hand, I take it."]},"V-5":{"fr":["Je construis une tour quand on me donne des cubes.","Je renvoie le ballon quand l'enseignant(e) me le lance."],"en":["I build a tower when I am given building blocks.","I throw the ball back when the teacher throws it to me."]},"V-6":{"fr":["Le matin, j'accroche ma veste au portemanteau.","Quand la sonnerie retentit, je mets ma veste."],"en":["In the morning I hang my jacket on the hook.","When the bell rings, I put on my jacket."]},"V-7":{"fr":["Je range les livres dans l'étagère quand l'enseignant(e) me le demande.","Je remets le matériel scolaire à sa place."],"en":["I put the books on the shelf when the teacher says so.","I put school materials in the right place."]},"V-8":{"fr":["Je reconnais les routines et je change d'activité sans aide physique."],"en":["When the teacher says we are going to recess, I clear my desk."]},"V-9":{"fr":["Pendant la récréation, je joue au ballon sur le terrain de football.","Après le temps de jeu, je range mon jeu dans l'étagère."],"en":["At recess I use the soccer ball on the soccer field.","After playtime I put my game back on the shelf."]},"V-10":{"fr":["J'attends que l'enseignant(e) m'appelle par mon nom.","Je lève la main et j'attends mon tour."],"en":["I wait until the teacher calls me by name.","I raise my hand and wait until it is my turn."]},"V-11":{"fr":["Je reste assis(e) pendant l'exercice de mathématiques.","Pendant les moments de travail, je reste assis(e) à ma place."],"en":["I stay seated during the math task.","During work phases I stay in my seat."]},"V-12":{"fr":["Je participe au cours d'éducation physique.","Je participe à la pause active."],"en":["I participate during physical education.","I join in during the movement break."]},"V-13":{"fr":["Je m'assois dans le cercle du matin quand la journée commence.","Je lève la main en classe."],"en":["I sit down in the morning circle when the day begins.","I raise my hand in class."]},"V-14":{"fr":["J'accepte les félicitations des autres et je garde le contrôle.","Quand on me félicite, je suis content(e) et je reste raisonnable."],"en":["I accept praise from others and keep control.","When I am praised, I am happy and behave reasonably."]},"V-15":{"fr":["Quand j'ai compris une tâche, je la fais seul(e).","Je termine une tâche que j'ai commencée."],"en":["When I understand a task, I solve it on my own.","I finish a task I have started."]},"V-16":{"fr":["Je dis quelles sont nos règles et nos objectifs de classe.","Je connais les règles qui permettent à tout le monde de se sentir bien."],"en":["I can say what our class rules and goals are.","I know the rules that make sure everyone feels comfortable."]},"V-17":{"fr":["Je dis pourquoi je dois me comporter de manière aimable et pacifique.","J'explique pourquoi nous avons des objectifs de classe."],"en":["I say why I should behave in a friendly and peaceful way.","I explain why our class goals exist."]},"V-18":{"fr":["Je dis comment je pourrais me comporter autrement et de manière appropriée.","Je réfléchis à la manière de me comporter plus calmement."],"en":["I say how I could behave differently and appropriately.","I think about how I can behave more peacefully."]},"V-19":{"fr":["J'accepte la décision du groupe.","Quand je suis choisi(e) comme chef, j'assume cette responsabilité."],"en":["I accept the group's decision.","When I am chosen as leader, I take responsibility."]},"V-20":{"fr":["Quand d'autres enfants se disputent, je reste calme.","Même quand les autres se comportent mal, je garde un bon comportement."],"en":["When other children argue, I stay calm.","Even when others behave inappropriately, I keep my good behavior."]},"V-21":{"fr":["Je garde le contrôle de mon comportement pendant les activités de groupe.","Lors des transitions entre les activités, je reste calme."],"en":["I keep control of my behavior during group activities.","I stay calm during transitions between activities."]},"V-22":{"fr":["Je remarque quand j'ai fait des progrès.","Je peux décrire ce que je ne savais pas encore faire avant."],"en":["I recognize when I have improved.","I can describe what I could not do before."]},"V-23":{"fr":["Je reste calme quand le programme change.","Je m'adapte quand les choses ne se passent pas comme prévu."],"en":["I stay calm when the plan changes.","I adapt when things go differently than planned."]},"V-24":{"fr":["J'essaie de nouvelles activités et je reste calme.","Lors de nouvelles expériences, je garde le contrôle de moi-même."],"en":["I try new activities and stay calm while doing so.","During new experiences I behave with self-control."]},"V-25":{"fr":["J'applique les comportements alternatifs dont nous avons parlé.","Dans les situations difficiles, j'utilise les stratégies que j'ai apprises."],"en":["I apply the alternative behaviors we have discussed.","In difficult situations I use the strategies I have learned."]},"V-26":{"fr":["Quand quelqu'un me provoque, je reste calme.","Je ne me laisse pas provoquer."],"en":["When someone provokes me, I stay calm.","I do not let myself be provoked."]},"V-27":{"fr":["J'assume la responsabilité de mon comportement.","J'accepte les conséquences de mon comportement."],"en":["I take responsibility for my behavior.","I accept the consequences of my behavior."]},"V-28":{"fr":["Quand il y a un problème, je fais des propositions constructives.","J'aide à résoudre les conflits."],"en":["When there are problems, I make constructive suggestions.","I help to resolve conflicts."]},"V-29":{"fr":["Je développe de nouvelles habitudes en lien avec le monde du travail."],"en":["I develop habits that will help me in my working life."]},"V-30":{"fr":["Je cherche un rôle positif dans le groupe.","J'apporte une contribution positive au groupe."],"en":["I look for a positive role in the group.","I contribute positively to the group."]},"V-31":{"fr":["Je comprends et j'accepte les règles et les lois.","Je respecte les règles à l'école et dans les lieux publics."],"en":["I understand and accept rules and laws.","I follow the rules at school and in public."]},"V-32":{"fr":["Je soutiens les règles qui améliorent la vie en commun.","Je prends mes responsabilités."],"en":["I support rules that improve community life.","I take personal responsibility."]},"V-33":{"fr":["Je résous mes problèmes en réfléchissant.","J'analyse les situations et je trouve mes propres solutions."],"en":["I solve my problems by thinking about them.","I analyze situations and find my own solutions."]},"K-1":{"fr":["Je produis des sons pour m'exprimer."],"en":["I produce different sounds."]},"K-2":{"fr":["Je me tourne vers la personne qui parle."],"en":["I look at the person who is speaking."]},"K-3":{"fr":["Je réponds à un stimulus verbal par un mouvement ou une action."],"en":["When someone says something, I respond to it."]},"K-4":{"fr":["Je réponds par une approximation de mots aux questions de l'adulte."],"en":["When I am asked something, I answer."]},"K-5":{"fr":["J'utilise spontanément des mots pour décrire ou demander quelque chose."],"en":["When the teacher shows me something, I respond."]},"K-6":{"fr":["Je produis des mots reconnaissables pour obtenir une réponse d'un adulte."],"en":["I speak to the teacher when I want something."]},"K-7":{"fr":["Je produis des mots reconnaissables pour obtenir une réponse d'un autre enfant."],"en":["I speak to the other child when I want something."]},"K-8":{"fr":["Je produis une séquence significative de mots de manière autonome."],"en":["When I want to say something, I make a whole sentence."]},"K-9":{"fr":["Je réponds aux questions par des mots significatifs et pertinents."],"en":["I answer in a way that everyone can understand."]},"K-10":{"fr":["Je montre un vocabulaire réceptif correspondant à mon âge."],"en":["I listen so that I learn new words."]},"K-11":{"fr":["J'utilise spontanément des séquences de mots appropriées."],"en":["I speak politely when I want something."]},"K-12":{"fr":["J'initie spontanément un échange d'informations avec un adulte."],"en":["When I need help, I speak to the teacher."]},"K-13":{"fr":["Je décris des caractéristiques simples de moi-même et des autres."],"en":["I say what I am good at and what others are good at."]},"K-14":{"fr":["J'initie spontanément un échange d'informations avec un autre enfant."],"en":["I tell the children in my class about something."]},"K-15":{"fr":["J'utilise spontanément des mots pour décrire mes expériences personnelles."],"en":["I talk about things I have experienced."]},"K-16":{"fr":["J'utilise le langage pour montrer mes réactions émotionnelles de manière appropriée."],"en":["When I am angry, I say what bothers me without hurting anyone."]},"K-17":{"fr":["Je participe aux discussions de groupe de manière constructive."],"en":["I take part sensibly in class discussions."]},"K-18":{"fr":["J'exprime ma fierté concernant mon propre travail."],"en":["I am proud of the work I have done."]},"K-19":{"fr":["Je décris mes attributs caractéristiques, mes forces et mes faiblesses."],"en":["I describe my strengths and weaknesses."]},"K-20":{"fr":["Je décris les attributs et caractéristiques des autres."],"en":["I describe others without hurting them."]},"K-21":{"fr":["Je reconnais les sentiments des autres."],"en":["I recognize and describe the feelings of others."]},"K-22":{"fr":["J'exprime ma fierté concernant les réalisations du groupe."],"en":["I show pride in our group achievement."]},"K-23":{"fr":["Je transmets mes sentiments par le biais de médias créatifs."],"en":["I express my feelings through art, music or dance."]},"K-24":{"fr":["Je montre une prise de conscience de mes propres progrès."],"en":["I recognize my own progress."]},"K-25":{"fr":["J'explique comment mon comportement influence celui des autres."],"en":["I explain how my behavior influences others."]},"K-26":{"fr":["J'exprime mes propres sentiments de façon appropriée au sein du groupe."],"en":["I express my feelings with appropriate words."]},"K-27":{"fr":["J'utilise le langage pour établir des relations positives."],"en":["I speak in a friendly way to build relationships."]},"K-28":{"fr":["J'utilise le langage pour féliciter et soutenir les autres."],"en":["I praise others when they have done something well."]},"K-29":{"fr":["Je décris des relations de cause à effet concernant les comportements."],"en":["I describe the connection between feelings and behavior."]},"K-30":{"fr":["Je fais des déclarations verbales complexes avec un contenu figuratif ou abstrait."],"en":["I express myself in complex sentences."]},"K-31":{"fr":["J'utilise un langage conciliant dans des situations provocantes."],"en":["When someone provokes me, I try to calm things down."]},"K-32":{"fr":["Je motive les autres en reconnaissant leurs contributions."],"en":["I acknowledge the contributions of others."]},"K-33":{"fr":["Je décris différents motifs et valeurs dans un contexte social."],"en":["I understand that people have different motives."]},"K-34":{"fr":["J'exprime spontanément mes valeurs et idéaux."],"en":["I describe what is important to me in life."]},"K-35":{"fr":["J'utilise mes compétences en communication pour entretenir des relations positives."],"en":["I sustain my relationships through good communication."]},"SOZ-1":{"fr":["Je réagis au contact verbal ou physique d'un adulte ou d'un autre enfant."],"en":["When the teacher touches me, I turn around."]},"SOZ-2":{"fr":["Je porte mon attention sur le comportement des autres."],"en":["When the teacher tells me to watch, I do so."]},"SOZ-3":{"fr":["Je réagis quand un adulte mentionne mon nom."],"en":["When the teacher calls me by name, I look over."]},"SOZ-4":{"fr":["Je m'occupe seul avec un jeu organisé."],"en":["I play alone when necessary."]},"SOZ-5":{"fr":["J'interagis non verbalement avec les adultes pour exprimer mes besoins."],"en":["When I want something, I point at the object."]},"SOZ-6":{"fr":["Je vais vers l'adulte quand il me le demande."],"en":["When the teacher calls me, I go to them."]},"SOZ-7":{"fr":["Je comprends et suis les demandes verbales qui me sont adressées."],"en":["When the teacher asks me to do something, I do it."]},"SOZ-8":{"fr":["Je produis des mots reconnaissables pour obtenir une réponse d'un adulte."],"en":["I speak to the teacher when I want something."]},"SOZ-9":{"fr":["Je montre un début de conscience de moi-même."],"en":["I talk about myself and use: I, my, me."]},"SOZ-10":{"fr":["Je participe spontanément à des jeux parallèles."],"en":["I play alone next to others."]},"SOZ-11":{"fr":["Je produis des mots reconnaissables pour obtenir une réponse d'un autre enfant."],"en":["I speak to the other child when I want something."]},"SOZ-12":{"fr":["Je cherche le contact avec un adulte connu."],"en":["When class begins, I greet the teacher."]},"SOZ-13":{"fr":["J'utilise spontanément la fantaisie pour jouer."],"en":["I make up things to play on my own."]},"SOZ-14":{"fr":["J'attends sans intervention physique d'un adulte."],"en":["I wait until it is my turn."]},"SOZ-15":{"fr":["J'établis un contact social approprié avec un autre enfant."],"en":["I approach my classmates in a friendly way."]},"SOZ-16":{"fr":["Je participe à une activité en partageant."],"en":["I share with other children."]},"SOZ-17":{"fr":["Je participe avec succès à un jeu interactif avec un autre enfant."],"en":["I play peacefully together with other children."]},"SOZ-18":{"fr":["Je coopère de façon autonome avec d'autres enfants."],"en":["In partner work I work together with another child."]},"SOZ-19":{"fr":["Je partage spontanément le matériel et j'alterne sans aide."],"en":["I share and take turns with other children."]},"SOZ-20":{"fr":["J'imite spontanément le comportement approprié d'un autre enfant."],"en":["When others behave well, I do the same."]},"SOZ-21":{"fr":["Je décris des situations sociales avec des évaluations simples."],"en":["I say whether I think something is right or wrong."]},"SOZ-22":{"fr":["Je dirige ou montre quelque chose dans une activité de groupe."],"en":["I show or explain to others how something is done."]},"SOZ-23":{"fr":["Je participe de manière appropriée à une activité proposée par un autre."],"en":["I accept suggestions from my classmates."]},"SOZ-24":{"fr":["Je décris mes propres expériences dans l'ordre chronologique."],"en":["I tell in the correct order what happened."]},"SOZ-25":{"fr":["Je montre le début d'une amitié par préférence pour un enfant."],"en":["I make contact with a child I especially like."]},"SOZ-26":{"fr":["Je sollicite le soutien ou les éloges d'un autre enfant."],"en":["I ask other children for help."]},"SOZ-27":{"fr":["J'aide les autres à suivre les règles du groupe."],"en":["I kindly remind others of the group rules."]},"SOZ-28":{"fr":["Je m'identifie à des adultes dirigeants ou des personnalités publiques."],"en":["I model myself on positive role models."]},"SOZ-29":{"fr":["Je décris des expériences sociales dans l'ordre chronologique."],"en":["I talk about group experiences."]},"SOZ-30":{"fr":["Je propose spontanément une activité de groupe appropriée."],"en":["I suggest activities to the group."]},"SOZ-31":{"fr":["J'exprime que je suis conscient que mes actions diffèrent de celles des autres."],"en":["I recognize differences between my behavior and that of others."]},"SOZ-32":{"fr":["J'écoute et respecte les idées et avis des autres."],"en":["I listen to others and respect their opinion."]},"SOZ-33":{"fr":["Je montre ouvertement mon intérêt pour l'avis des autres sur moi."],"en":["I am interested in what others think about me."]},"SOZ-34":{"fr":["Je propose des solutions constructives aux problèmes de groupe."],"en":["When there are problems, I make constructive suggestions."]},"SOZ-35":{"fr":["Je reconnais et différencie des valeurs opposées dans des situations sociales."],"en":["I distinguish between right and wrong."]},"SOZ-36":{"fr":["Je tire des conclusions de situations sociales."],"en":["I learn from social situations."]},"SOZ-37":{"fr":["Je montre que je comprends et respecte les sentiments des autres."],"en":["I understand how others feel."]},"SOZ-38":{"fr":["J'interagis avec succès dans différents rôles sociaux."],"en":["I can take on different roles in a group."]},"SOZ-39":{"fr":["Je prends des décisions fondées sur mes propres valeurs et principes."],"en":["I decide according to my own values."]},"SOZ-40":{"fr":["Je décris mes objectifs et l'écart entre ce qui est et ce qui est désiré."],"en":["I have a realistic view of my strengths and weaknesses."]},"SOZ-41":{"fr":["Je maintiens et entretiens des relations de groupe et individuelles."],"en":["I build lasting friendships."]},"KOG-1":{"fr":["Je me tourne vers la source d'un stimulus sensoriel."],"en":["I turn toward things that interest me."]},"KOG-2":{"fr":["Je maintiens mon attention dirigée vers un stimulus pendant un court instant."],"en":["I pay attention to one thing for a short time."]},"KOG-3":{"fr":["Je reconnais spontanément des personnes et des objets familiers."],"en":["I recognize familiar people and things."]},"KOG-4":{"fr":["Je réagis par une action motrice à des stimuli complexes ou verbaux."],"en":["I respond to instructions with actions."]},"KOG-5":{"fr":["J'imite spontanément les actions simples de l'adulte."],"en":["I imitate simple actions."]},"KOG-6":{"fr":["Je montre des habiletés motrices correspondant au niveau de 18 mois."],"en":["I demonstrate basic motor skills."]},"KOG-7":{"fr":["Je comprends le nom des objets familiers et réagis correctement."],"en":["I understand the names of familiar things."]},"KOG-8":{"fr":["Je réponds par une approximation de mots aux questions de l'adulte."],"en":["I answer questions with words."]},"KOG-9":{"fr":["J'utilise spontanément des mots pour décrire ou demander quelque chose."],"en":["I use words on my own."]},"KOG-10":{"fr":["Je place chaque forme dans l'emplacement qui lui correspond."],"en":["I put each shape into the right space."]},"KOG-11":{"fr":["J'identifie mes propres parties du corps."],"en":["I point to and name my body parts."]},"KOG-12":{"fr":["Je détecte des détails simples dans les images."],"en":["I recognize details in pictures."]},"KOG-13":{"fr":["Je trie des objets selon leurs caractéristiques."],"en":["I sort things by characteristics."]},"KOG-14":{"fr":["Je nomme des choses familières sur des illustrations simples."],"en":["I name pictures with the right words."]},"KOG-15":{"fr":["Je reconnais la valeur utilitaire d'objets familiers."],"en":["I know what things are used for."]},"KOG-16":{"fr":["J'effectue des activités de coordination corporelle au niveau d'un enfant de trois ans."],"en":["I move in an age-appropriate way."]},"KOG-17":{"fr":["Je détecte deux images identiques parmi trois."],"en":["I find pictures that are the same."]},"KOG-18":{"fr":["J'exécute des activités de motricité fine au niveau d'un enfant de trois ans."],"en":["I can make fine movements."]},"KOG-19":{"fr":["Je détecte l'objet différent parmi trois."],"en":["I find the one that is different."]},"KOG-20":{"fr":["Je comprends au moins trois opposés simples."],"en":["I know opposites like big/small."]},"KOG-21":{"fr":["Je catégorise des images selon leurs caractéristiques communes."],"en":["I sort things into groups."]},"KOG-22":{"fr":["Je compte jusqu'à 4 dans le bon ordre en pointant les objets."],"en":["I count to 4."]},"KOG-23":{"fr":["J'identifie quatre couleurs et trois formes."],"en":["I know colors and shapes."]},"KOG-24":{"fr":["J'identifie les images identiques et différentes en alternance."],"en":["I can switch between finding what is the same and what is different."]},"KOG-25":{"fr":["Je compte jusqu'à 10."],"en":["I count to 10."]},"KOG-26":{"fr":["J'effectue des activités de coordination œil-main au niveau d'un enfant de cinq ans."],"en":["My eyes and hands work well together."]},"KOG-27":{"fr":["Je distingue les chiffres, les dessins et les lettres majuscules."],"en":["I tell numbers from letters."]},"KOG-28":{"fr":["J'effectue des activités de coordination corporelle au niveau d'un enfant de cinq ans."],"en":["I move like a 5-year-old."]},"KOG-29":{"fr":["Je détecte des groupes d'objets jusqu'à 5 sans compter."],"en":["I recognize small quantities at a glance."]},"KOG-30":{"fr":["Je répète ce que j'ai appris par cœur."],"en":["I know songs and rhymes by heart."]},"KOG-31":{"fr":["J'arrange des images d'une histoire dans l'ordre correct."],"en":["I put pictures in the correct order."]},"KOG-32":{"fr":["J'exécute des habiletés de coordination œil-main au niveau d'un enfant de six ans."],"en":["I can work precisely with my hands."]},"KOG-33":{"fr":["J'effectue des activités de coordination corporelle au niveau d'un enfant de six ans."],"en":["I can move well."]},"KOG-34":{"fr":["Je lis un vocabulaire de base de 50 mots."],"en":["I read simple words."]},"KOG-35":{"fr":["Je reconnais et écris des nombres jusqu'à 10."],"en":["I write the numbers from 1 to 10."]},"KOG-36":{"fr":["J'écris un vocabulaire de base d'au moins 50 mots."],"en":["I write simple words."]},"KOG-37":{"fr":["J'écoute une histoire et comprends les faits et la séquence des événements."],"en":["I understand stories I hear."]},"KOG-38":{"fr":["J'explique le comportement des autres en reconnaissant les causes et les effets."],"en":["I explain why someone does something."]},"KOG-39":{"fr":["Je lis des phrases de base en comprenant le sens."],"en":["I understand what I read."]},"KOG-40":{"fr":["Je maîtrise l'addition et la soustraction jusqu'à 9."],"en":["I add and subtract up to 9."]},"KOG-41":{"fr":["J'identifie des éléments illogiques dans des situations simples."],"en":["I recognize when something is not right."]},"KOG-42":{"fr":["Je rédige des phrases simples pour répondre à des questions sur une histoire."],"en":["I write answers in complete sentences."]},"KOG-43":{"fr":["Je maîtrise au moins deux habiletés physiques ou jeux sportifs."],"en":["I can take part in sports and movement games."]},"KOG-44":{"fr":["Je formule et écris librement des phrases simples."],"en":["I write my own sentences."]},"KOG-45":{"fr":["J'applique des concepts numériques relatifs à l'addition, la soustraction, le temps et l'argent."],"en":["I calculate with time and money."]},"KOG-46":{"fr":["Je lis et explique les termes quantitatifs relatifs au temps, à la longueur et au volume."],"en":["I understand units of measurement."]},"KOG-47":{"fr":["Je lis un texte et parle du personnage principal et de l'intrigue."],"en":["I read stories and retell them."]},"KOG-48":{"fr":["J'effectue des opérations de multiplication et de division."],"en":["I calculate with larger numbers."]},"KOG-49":{"fr":["J'écris pour informer, décrire des événements ou communiquer mes sentiments."],"en":["I write to communicate."]},"KOG-50":{"fr":["Je maîtrise la multiplication et la division jusqu'à 100."],"en":["I multiply and divide up to 100."]},"KOG-51":{"fr":["Je lis pour le plaisir et pour obtenir des informations."],"en":["I enjoy reading to learn new things."]},"KOG-52":{"fr":["Je calcule la valeur monétaire jusqu'à 10€."],"en":["I calculate with money up to 10 euros."]},"KOG-53":{"fr":["Je décris des personnages fictifs et explique leurs motifs."],"en":["I understand characters from stories."]},"KOG-54":{"fr":["J'utilise des règles grammaticales pour écrire correctement."],"en":["I write with correct grammar."]},"KOG-55":{"fr":["Je reconnais et différencie des valeurs opposées dans des situations sociales."],"en":["I recognize different values."]},"KOG-56":{"fr":["J'utilise des concepts quantitatifs pour résoudre des problèmes logiques."],"en":["I solve problems with units of measurement."]},"KOG-57":{"fr":["Je sollicite l'opinion des autres sur les problèmes d'actualité."],"en":["I take an interest in current topics."]},"KOG-58":{"fr":["Je distingue les faits des opinions dans les textes."],"en":["I distinguish facts from opinions."]},"KOG-59":{"fr":["Je détecte des comportements illogiques et incohérents dans les situations sociales."],"en":["I recognize contradictory behavior."]},"KOG-60":{"fr":["Je résous des problèmes mathématiques avec des fractions et nombres décimaux."],"en":["I solve difficult word problems."]},"KOG-61":{"fr":["Je résous des problèmes personnels par perspicacité et analyse."],"en":["I solve problems by thinking them through."]},"KOG-62":{"fr":["J'applique mes compétences académiques dans des activités de la vie quotidienne."],"en":["I use my knowledge in everyday life."]}},"hinweise":{"V-2":["Identisch mit KOG-1 – gleich einschätzen."],"V-3":["Identisch mit KOG-2 – gleich einschätzen."],"V-5":["Identisch mit KOG-4 – gleich einschätzen."],"V-8":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"V-9":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"V-10":["Das Warten sollte höchstens 3–5 Minuten dauern.","Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB","Identisch mit SOZ-14 – gleich einschätzen."],"V-11":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"V-12":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"V-13":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"V-14":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"V-22":["Identisch mit K-24 – gleich einschätzen."],"V-28":["Identisch mit SOZ-34 – gleich einschätzen."],"V-33":["Identisch mit KOG-61 – gleich einschätzen."],"K-1":["Absolut „basisches“ Ziel – wird es nicht erreicht, das Einschalten des Kompetenzzentrums für Logopädie erwägen."],"K-3":["Absolut „basisches“ Ziel – wird es nicht erreicht, das Einschalten des Kompetenzzentrums für Logopädie erwägen.","Zusätzlich erwägen, den Eltern einen Besuch beim Ohrenarzt zu empfehlen."],"K-4":["Identisch mit KOG-8 – gleich einschätzen."],"K-5":["Identisch mit KOG-9 – gleich einschätzen."],"K-6":["Bei der Zielformulierung liegt der Fokus auf dem einzelnen Wort, nicht auf der Satzbildung.","Identisch mit SOZ-8 – gleich einschätzen."],"K-7":["Bei der Zielformulierung liegt der Fokus auf dem einzelnen Wort, nicht auf der Satzbildung.","Identisch mit SOZ-11 – gleich einschätzen."],"K-8":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-9":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-10":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-11":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-12":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-13":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-14":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-15":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-16":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-17":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-18":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-19":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-20":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-21":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-22":["Piktogramme vorhanden: O:\\CDSE\\cdseALL\\CDSE_all_ETEP-Entwicklungstherapie-Entwicklungspädagogik\\ELDiB\\Piktogramme zum ELDiB"],"K-24":["Identisch mit V-22 – gleich einschätzen."],"SOZ-8":["Bei der Zielformulierung liegt der Fokus auf dem einzelnen Wort, nicht auf der Satzbildung.","Identisch mit K-6 – gleich einschätzen."],"SOZ-11":["Bei der Zielformulierung liegt der Fokus auf dem einzelnen Wort, nicht auf der Satzbildung.","Identisch mit K-7 – gleich einschätzen."],"SOZ-13":["Hat das Kind Probleme, Realität und Fantasie zu trennen, Fantasiespiel nicht unterstützen."],"SOZ-14":["Das Warten sollte höchstens 3–5 Minuten dauern.","Identisch mit V-10 – gleich einschätzen."],"SOZ-34":["Identisch mit V-28 – gleich einschätzen."],"SOZ-35":["Identisch mit KOG-55 – gleich einschätzen."],"KOG-1":["Identisch mit V-2 – gleich einschätzen."],"KOG-2":["Identisch mit V-3 – gleich einschätzen."],"KOG-4":["Identisch mit V-5 – gleich einschätzen."],"KOG-8":["Identisch mit K-4 – gleich einschätzen."],"KOG-9":["Identisch mit K-5 – gleich einschätzen."],"KOG-55":["Identisch mit SOZ-35 – gleich einschätzen."],"KOG-61":["Identisch mit V-33 – gleich einschätzen."]},"richtziel":["","Auf die Umwelt mit Freude reagieren","Auf die Umwelt mit Erfolg reagieren","Fähigkeiten zur erfolgreichen Gruppenteilnahme erwerben","Sich in Gruppenprozesse einbringen","Individuelle/gruppenbezogene Fähigkeiten in neuen Situationen anwenden"],"dsStufenAlter":{"1":[0,2],"2":[2,5],"3":[6,9],"4":[10,12],"5":[13,16]}};
