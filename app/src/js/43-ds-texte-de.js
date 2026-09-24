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
