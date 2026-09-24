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
