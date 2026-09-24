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
