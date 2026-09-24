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
