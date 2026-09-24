// Stufennamen und Bereichsziele in der vollständigen Fassung (wie in shell.html),
// damit die Überschriften nach einem Sprachwechsel zurück auf Deutsch gleich bleiben.
const ELDIB_DATA = {
    verhalten: {
        name: "Verhalten",
        code: "V",
        color: "#e74c3c",
        stufen: {
            1: {
                name: "Stufe I: Mit Freude auf die Umwelt reagieren",
                ziel: "Den eigenen körperlichen Fähigkeiten vertrauen",
                items: [
                    { nr: 1, code: "V-1", keyword: "Wahrnehmung", description: "Lässt Wahrnehmung eines sensorischen Reizes erkennen.", zielformulierungen: ["Ich schaue die/den Lehrer:in an, wenn sie/er mich berührt."] },
                    { nr: 2, code: "V-2", keyword: "Orientierung", description: "Reagiert auf sensorischen Reiz mit Zuwendung zur Reizquelle.", zielformulierungen: ["Ich schaue mir Bilder an, die die/der Lehrer:in mir zeigt."] },
                    { nr: 3, code: "V-3", keyword: "Aufmerksamkeit", description: "Reagiert auf einen Reiz mit kurzzeitig anhaltender Aufmerksamkeit.", zielformulierungen: ["Ich schaue auf das, was mir vorgezeigt wird.", "Ich höre zu, wenn die/der Lehrer:in etwas sagt."] },
                    { nr: 4, code: "V-4", keyword: "motorische Reaktion", description: "Reagiert von sich aus auf einfache Umgebungsreize mit einer motorischen Handlung.", zielformulierungen: ["Wenn die/der Lehrer:in mir die Hand reicht, nehme ich sie."] },
                    { nr: 5, code: "V-5", keyword: "komplexe Reaktion", description: "Reagiert auf komplexe Umgebungsreize und verbale Impulse mit motorischer Handlung.", zielformulierungen: ["Ich baue einen Turm, wenn ich Bauklötze angeboten bekomme.", "Ich werfe den Ball zurück, wenn die/der Lehrer:in ihn mir zuwirft."] },
                    { nr: 6, code: "V-6", keyword: "Selbsthilfe", description: "Beteiligt sich aktiv am Erlernen von Selbsthilfe-Fähigkeiten.", zielformulierungen: ["Morgens hänge ich meine Jacke an den Haken.", "Wenn es klingelt, ziehe ich meine Jacke an."] },
                    { nr: 7, code: "V-7", keyword: "Spielmaterial", description: "Reagiert eigenständig auf verschiedene Spielmaterialien.", zielformulierungen: ["Ich räume die Bücher in das Regal, wenn die/der Lehrer:in das sagt.", "Ich lege das Schulmaterial auf den richtigen Platz."] },
                    { nr: 8, code: "V-8", keyword: "Routineabläufe", description: "Zeigt Wiedererkennen von Routineabläufen.", zielformulierungen: ["Wenn die/der Lehrer:in sagt, dass wir in die Pause gehen, räume ich mein Pult."] }
                ]
            },
            2: {
                name: "Stufe II: Erfolgreich auf die Umwelt reagieren",
                ziel: "Erfolgreich an Routineabläufen und Aktivitäten teilnehmen",
                items: [
                    { nr: 9, code: "V-9", keyword: "Spielerfahrung", description: "Geht mit Spielmaterialien sachgerecht um.", zielformulierungen: ["In der Pause benutze ich den Fußball auf dem Fußballfeld.", "Nach der Spielzeit räume ich mein Spiel wieder ins Regal."] },
                    { nr: 10, code: "V-10", keyword: "warten", description: "Wartet ohne körperliche Steuerungshilfe durch den Erwachsenen.", zielformulierungen: ["Ich warte, bis die/der Lehrer:in mich mit meinem Namen ruft.", "Ich melde mich und warte, bis ich drankomme."] },
                    { nr: 11, code: "V-11", keyword: "sitzen", description: "Beteiligt sich verbal und physisch an Aktivitäten im Sitzen.", zielformulierungen: ["Ich bleibe während der Matheaufgabe sitzen.", "In Arbeitsphasen bleibe ich auf meinem Platz sitzen."] },
                    { nr: 12, code: "V-12", keyword: "Bewegung", description: "Beteiligt sich verbal und physisch an Bewegungsaktivitäten.", zielformulierungen: ["Ich beteilige mich während des Sportunterrichts.", "Ich mache bei der Bewegungspause mit."] },
                    { nr: 13, code: "V-13", keyword: "Aktivitäten", description: "Nimmt von sich aus verbal und physisch an Aktivitäten teil.", zielformulierungen: ["Ich setze mich in den Morgenkreis, wenn der Tag beginnt.", "Ich melde mich im Unterricht."] },
                    { nr: 14, code: "V-14", keyword: "Lob/Erfolg", description: "Akzeptiert Lob oder Erfolg ohne unangemessenes Verhalten.", zielformulierungen: ["Ich nehme Lob von anderen an und behalte die Kontrolle.", "Wenn ich gelobt werde, freue ich mich und verhalte mich vernünftig."] }
                ]
            },
            3: {
                name: "Stufe III: Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen",
                ziel: "Erworbene Fähigkeiten anwenden, um innerhalb einer Gruppe das eigene Verhalten erfolgreich zu steuern",
                items: [
                    { nr: 15, code: "V-15", keyword: "beenden", description: "Beendet kurze, individuelle Aufgaben selbstständig.", zielformulierungen: ["Wenn ich eine Aufgabe verstanden habe, löse ich sie alleine.", "Eine angefangene Aufgabe bearbeite ich zu Ende."] },
                    { nr: 16, code: "V-16", keyword: "Erwartungen", description: "Lässt Bewusstsein für erwartete Verhaltensweisen erkennen.", zielformulierungen: ["Ich sage, was unsere Klassenregeln und Ziele sind.", "Ich kenne die Regeln, die dafür sorgen, dass alle sich wohl fühlen."] },
                    { nr: 17, code: "V-17", keyword: "Begründungen", description: "Nennt Gründe für Verhaltenserwartungen.", zielformulierungen: ["Ich sage, warum ich mich freundlich und friedlich verhalten soll.", "Ich erkläre, warum es unsere Klassenziele gibt."] },
                    { nr: 18, code: "V-18", keyword: "Alternativen", description: "Beschreibt alternative Verhaltensmöglichkeiten.", zielformulierungen: ["Ich sage, wie ich mich anders und angemessen verhalten könnte.", "Ich überlege, wie ich mich friedlicher verhalten kann."] },
                    { nr: 19, code: "V-19", keyword: "Gruppenwahl", description: "Reagiert angemessen auf Gruppenwahl.", zielformulierungen: ["Ich akzeptiere die Entscheidung der Gruppe.", "Wenn ich zum Anführer gewählt werde, übernehme ich die Verantwortung."] },
                    { nr: 20, code: "V-20", keyword: "zurückhalten", description: "Hält sich von inakzeptablem Verhalten zurück.", zielformulierungen: ["Wenn andere Kinder sich streiten, bleibe ich ruhig.", "Auch wenn andere sich falsch verhalten, bleibe ich bei meinem guten Verhalten."] },
                    { nr: 21, code: "V-21", keyword: "Kontrolle", description: "Behält während Gruppenaktivitäten Selbstkontrolle.", zielformulierungen: ["Ich behalte die Kontrolle über mein Verhalten während Gruppenaktivitäten.", "Bei Übergängen zwischen Aktivitäten bleibe ich ruhig."] }
                ]
            },
            4: {
                name: "Stufe IV: Sich einbringen in Gruppenprozesse",
                ziel: "Persönliche Fähigkeiten einsetzen, um zum Gruppenerfolg beizutragen",
                items: [
                    { nr: 22, code: "V-22", keyword: "Fortschritt", description: "Zeigt Bewusstsein für eigenen Verhaltensfortschritt.", zielformulierungen: ["Ich erkenne, wenn ich mich verbessert habe.", "Ich kann beschreiben, was ich früher noch nicht konnte."] },
                    { nr: 23, code: "V-23", keyword: "Flexibilität", description: "Lässt Flexibilität erkennen bei Änderungen.", zielformulierungen: ["Ich bleibe ruhig, wenn sich der Plan ändert.", "Ich passe mich an, wenn etwas anders läuft als geplant."] },
                    { nr: 24, code: "V-24", keyword: "neue Erfahrungen", description: "Beteiligt sich kontrolliert an neuen Erfahrungen.", zielformulierungen: ["Ich probiere neue Aktivitäten aus und bleibe dabei ruhig.", "Bei neuen Erfahrungen verhalte ich mich kontrolliert."] },
                    { nr: 25, code: "V-25", keyword: "anwenden", description: "Wendet alternative Verhaltensweisen an.", zielformulierungen: ["Ich wende die besprochenen alternativen Verhaltensweisen an.", "In schwierigen Situationen nutze ich die gelernten Strategien."] },
                    { nr: 26, code: "V-26", keyword: "Provokation", description: "Reagiert auf Provokationen kontrolliert.", zielformulierungen: ["Wenn mich jemand provoziert, bleibe ich ruhig.", "Ich lasse mich nicht provozieren."] },
                    { nr: 27, code: "V-27", keyword: "Verantwortung", description: "Akzeptiert Verantwortung für eigenes Verhalten.", zielformulierungen: ["Ich übernehme Verantwortung für mein Verhalten.", "Ich akzeptiere die Konsequenzen meines Verhaltens."] },
                    { nr: 28, code: "V-28", keyword: "Lösungsvorschlag", description: "Reagiert mit konstruktiven Lösungsvorschlägen.", zielformulierungen: ["Bei Problemen mache ich konstruktive Vorschläge.", "Ich helfe mit, Konflikte zu lösen."] }
                ]
            },
            5: {
                name: "Stufe V: Anwenden von individuellen und gruppenbezogenen Fähigkeiten in neuen Situationen",
                ziel: "Realen Lebenserfahrungen mit konstruktivem Verhalten begegnen",
                items: [
                    { nr: 29, code: "V-29", keyword: "Gewohnheiten", description: "Entwickelt neue persönliche Gewohnheiten.", zielformulierungen: ["Ich entwickle Gewohnheiten, die mir im Berufsleben helfen werden."] },
                    { nr: 30, code: "V-30", keyword: "positive Rolle", description: "Sucht eine positive Rolle in der Gruppe.", zielformulierungen: ["Ich suche mir eine positive Rolle in der Gruppe.", "Ich trage positiv zur Gruppe bei."] },
                    { nr: 31, code: "V-31", keyword: "Recht/Ordnung", description: "Zeigt Verständnis für Rechts- und Ordnungsprinzipien.", zielformulierungen: ["Ich verstehe und akzeptiere Regeln und Gesetze.", "Ich halte mich an Regeln in der Schule und Öffentlichkeit."] },
                    { nr: 32, code: "V-32", keyword: "Selbstverantwortung", description: "Befürwortet Verfahren zur Selbstverantwortung.", zielformulierungen: ["Ich unterstütze Regeln, die das Zusammenleben verbessern.", "Ich übernehme Selbstverantwortung."] },
                    { nr: 33, code: "V-33", keyword: "Einsicht", description: "Löst Probleme durch Einsicht und Analyse.", zielformulierungen: ["Ich löse meine Probleme, indem ich über sie nachdenke.", "Ich analysiere Situationen und finde eigene Lösungen."] }
                ]
            }
        }
    },
    kommunikation: {
        name: "Kommunikation",
        code: "K",
        color: "#3498db",
        stufen: {
            1: { name: "Stufe I: Mit Freude auf die Umwelt reagieren", ziel: "Gebraucht Wörter, um Bedürfnisse zu befriedigen", items: [
                { nr: 1, code: "K-1", keyword: "Laute", description: "Produziert Laute.", zielformulierungen: ["Ich produziere verschiedene Laute."] },
                { nr: 2, code: "K-2", keyword: "Sprecher", description: "Richtet Aufmerksamkeit auf Sprechende.", zielformulierungen: ["Ich schaue die Person an, die spricht."] },
                { nr: 3, code: "K-3", keyword: "verbaler Impuls", description: "Reagiert auf verbalen Impuls.", zielformulierungen: ["Wenn jemand etwas sagt, reagiere ich darauf."] },
                { nr: 4, code: "K-4", keyword: "Wort-Annäherung", description: "Reagiert verbal auf Fragen.", zielformulierungen: ["Wenn ich etwas gefragt werde, antworte ich."] },
                { nr: 5, code: "K-5", keyword: "Wörter spontan", description: "Verwendet von sich aus Wörter.", zielformulierungen: ["Wenn die/der Lehrer:in mir etwas zeigt, antworte ich."] },
                { nr: 6, code: "K-6", keyword: "Wörter Erwachsener", description: "Produziert Wörter für Erwachsene.", zielformulierungen: ["Ich spreche mit der/dem Lehrer:in, wenn ich etwas möchte."] },
                { nr: 7, code: "K-7", keyword: "Wörter Peer", description: "Produziert Wörter für Gleichaltrige.", zielformulierungen: ["Ich spreche mit dem anderen Kind, wenn ich etwas möchte."] },
                { nr: 8, code: "K-8", keyword: "Wortreihung", description: "Produziert sinnvolle Wortsequenz.", zielformulierungen: ["Wenn ich etwas sagen will, mache ich einen ganzen Satz."] }
            ]},
            2: { name: "Stufe II: Erfolgreich auf die Umwelt reagieren", ziel: "Gebraucht Wörter, um andere in konstruktiver Weise zu beeinflussen", items: [
                { nr: 9, code: "K-9", keyword: "beantworten", description: "Beantwortet Fragen sinnvoll.", zielformulierungen: ["Ich antworte so, dass jeder meine Antwort verstehen kann."] },
                { nr: 10, code: "K-10", keyword: "Vokabular", description: "Zeigt rezeptives Vokabular.", zielformulierungen: ["Ich höre zu, damit ich neue Wörter lerne."] },
                { nr: 11, code: "K-11", keyword: "Wortsequenzen", description: "Verwendet angemessene Wortsequenzen.", zielformulierungen: ["Ich spreche freundlich, wenn ich etwas haben möchte."] },
                { nr: 12, code: "K-12", keyword: "Austausch - Erwachsene", description: "Tauscht Informationen mit Erwachsenen.", zielformulierungen: ["Wenn ich Hilfe benötige, spreche ich die/den Lehrer:in an."] },
                { nr: 13, code: "K-13", keyword: "Merkmale", description: "Beschreibt Merkmale von sich und anderen.", zielformulierungen: ["Ich sage, was ich gut kann und was andere gut können."] },
                { nr: 14, code: "K-14", keyword: "Austausch - Kind", description: "Tauscht Informationen mit Kindern.", zielformulierungen: ["Ich erzähle den Kindern aus meiner Klasse etwas."] }
            ]},
            3: { name: "Stufe III: Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen", ziel: "Gebraucht Wörter, um sich auf konstruktive Weise innerhalb einer Gruppe zu äußern", items: [
                { nr: 15, code: "K-15", keyword: "Persönliches", description: "Beschreibt eigene Erfahrungen.", zielformulierungen: ["Ich erzähle von Dingen, die ich erlebt habe."] },
                { nr: 16, code: "K-16", keyword: "Gefühlsreaktionen", description: "Zeigt angemessene Gefühlsreaktionen.", zielformulierungen: ["Wenn ich wütend bin, sage ich was mich stört, ohne zu verletzen."] },
                { nr: 17, code: "K-17", keyword: "Gespräche", description: "Beteiligt sich an Gruppengesprächen.", zielformulierungen: ["Ich beteilige mich vernünftig an Klassengesprächen."] },
                { nr: 18, code: "K-18", keyword: "Stolz - ich", description: "Zeigt Stolz auf eigene Arbeit.", zielformulierungen: ["Ich bin stolz auf die Arbeit, die ich geleistet habe."] },
                { nr: 19, code: "K-19", keyword: "Eigenschaften - ich", description: "Beschreibt eigene Eigenschaften.", zielformulierungen: ["Ich beschreibe meine Stärken und Schwächen."] },
                { nr: 20, code: "K-20", keyword: "Eigenschaften - du", description: "Beschreibt Eigenschaften anderer.", zielformulierungen: ["Ich beschreibe andere, ohne sie zu verletzen."] },
                { nr: 21, code: "K-21", keyword: "Gefühle - du", description: "Erkennt Gefühle anderer.", zielformulierungen: ["Ich erkenne und beschreibe die Gefühle anderer."] },
                { nr: 22, code: "K-22", keyword: "Stolz - wir", description: "Zeigt Stolz auf Gruppenleistungen.", zielformulierungen: ["Ich zeige Stolz auf unsere Gruppenleistung."] }
            ]},
            4: { name: "Stufe IV: Sich einbringen in Gruppenprozesse", ziel: "Verwendet Wörter, um Verständnis von Gefühlen und Verhaltensweisen von sich und anderen zu zeigen", items: [
                { nr: 23, code: "K-23", keyword: "Kreativität", description: "Drückt Gefühle kreativ aus.", zielformulierungen: ["Ich drücke meine Gefühle durch Kunst, Musik oder Tanz aus."] },
                { nr: 24, code: "K-24", keyword: "Fortschritt", description: "Zeigt Bewusstsein für Fortschritt.", zielformulierungen: ["Ich erkenne meinen eigenen Fortschritt."] },
                { nr: 25, code: "K-25", keyword: "Beeinflussung", description: "Erklärt Verhaltensbeeinflussung.", zielformulierungen: ["Ich erkläre, wie mein Verhalten andere beeinflusst."] },
                { nr: 26, code: "K-26", keyword: "Gefühle - ich", description: "Drückt eigene Gefühle aus.", zielformulierungen: ["Ich drücke meine Gefühle mit passenden Worten aus."] },
                { nr: 27, code: "K-27", keyword: "Beziehung", description: "Knüpft positive Beziehungen.", zielformulierungen: ["Ich spreche freundlich, um Beziehungen aufzubauen."] },
                { nr: 28, code: "K-28", keyword: "unterstützen", description: "Lobt und unterstützt andere.", zielformulierungen: ["Ich lobe andere, wenn sie etwas gut gemacht haben."] },
                { nr: 29, code: "K-29", keyword: "Relationen", description: "Beschreibt Ursache-Wirkung.", zielformulierungen: ["Ich beschreibe den Zusammenhang zwischen Gefühlen und Verhalten."] }
            ]},
            5: { name: "Stufe V: Anwenden von individuellen und gruppenbezogenen Fähigkeiten in neuen Situationen", ziel: "Verwendet Wörter, um Beziehungen auszubauen und zu pflegen", items: [
                { nr: 30, code: "K-30", keyword: "komplexe Aussagen", description: "Formuliert komplexe Aussagen.", zielformulierungen: ["Ich drücke mich in komplexen Sätzen aus."] },
                { nr: 31, code: "K-31", keyword: "Ausgleich", description: "Wählt versöhnliche Sprache.", zielformulierungen: ["Bei Provokationen versuche ich zu schlichten."] },
                { nr: 32, code: "K-32", keyword: "Anerkennung", description: "Anerkennt Beiträge anderer.", zielformulierungen: ["Ich anerkenne die Beiträge anderer."] },
                { nr: 33, code: "K-33", keyword: "Motive", description: "Beschreibt verschiedene Motive.", zielformulierungen: ["Ich verstehe, dass Menschen verschiedene Motive haben."] },
                { nr: 34, code: "K-34", keyword: "Ideale", description: "Beschreibt eigene Wertvorstellungen.", zielformulierungen: ["Ich beschreibe, was mir wichtig ist im Leben."] },
                { nr: 35, code: "K-35", keyword: "Erhalt/Pflege", description: "Pflegt positive Beziehungen.", zielformulierungen: ["Ich pflege meine Beziehungen durch gute Kommunikation."] }
            ]}
        }
    },
    sozialisation: {
        name: "Sozialisation",
        code: "SOZ",
        color: "#2ecc71",
        stufen: {
            1: { name: "Stufe I: Mit Freude auf die Umwelt reagieren", ziel: "Einem Erwachsenen genügend vertrauen, um auf ihn zu reagieren", items: [
                { nr: 1, code: "SOZ-1", keyword: "Gegenwart", description: "Ist sich der Gegenwart anderer bewusst.", zielformulierungen: ["Wenn die/der Lehrer:in mich berührt, drehe ich mich um."] },
                { nr: 2, code: "SOZ-2", keyword: "Gerichtetheit", description: "Richtet Aufmerksamkeit auf andere.", zielformulierungen: ["Wenn die/der Lehrer:in mir sagt, dass ich zuschauen soll, tue ich das."] },
                { nr: 3, code: "SOZ-3", keyword: "Eigenname", description: "Reagiert auf eigenen Namen.", zielformulierungen: ["Wenn die/der Lehrer:in mich mit Namen ruft, schaue ich hin."] },
                { nr: 4, code: "SOZ-4", keyword: "Spiel - allein", description: "Spielt für sich allein.", zielformulierungen: ["Ich spiele alleine, wenn es nötig ist."] },
                { nr: 5, code: "SOZ-5", keyword: "nonverbale Interaktion", description: "Interagiert nonverbal.", zielformulierungen: ["Wenn ich etwas möchte, zeige ich auf den Gegenstand."] },
                { nr: 6, code: "SOZ-6", keyword: "kommen", description: "Kommt, wenn gerufen.", zielformulierungen: ["Wenn die/der Lehrer:in mich ruft, gehe ich zu ihr/ihm."] },
                { nr: 7, code: "SOZ-7", keyword: "Aufforderungen", description: "Versteht Aufforderungen.", zielformulierungen: ["Wenn die/der Lehrer:in mich um etwas bittet, erledige ich es."] },
                { nr: 8, code: "SOZ-8", keyword: "Wörter - Erwachsener", description: "Produziert Wörter für Erwachsene.", zielformulierungen: ["Ich spreche mit der/dem Lehrer:in, wenn ich etwas möchte."] },
                { nr: 9, code: "SOZ-9", keyword: "Selbst-Bewusstheit", description: "Zeigt Selbstbewusstheit.", zielformulierungen: ["Ich erzähle von mir und gebrauche: ich, mein, mir."] },
                { nr: 10, code: "SOZ-10", keyword: "Spiel - parallel", description: "Nimmt an parallelem Spiel teil.", zielformulierungen: ["Ich spiele alleine neben anderen."] },
                { nr: 11, code: "SOZ-11", keyword: "Wörter - Peer", description: "Produziert Wörter für Gleichaltrige.", zielformulierungen: ["Ich spreche mit dem anderen Kind, wenn ich etwas möchte."] },
                { nr: 12, code: "SOZ-12", keyword: "Kontaktsuche", description: "Sucht Kontakt mit Erwachsenen.", zielformulierungen: ["Wenn der Unterricht beginnt, begrüße ich die/den Lehrer:in."] }
            ]},
            2: { name: "Stufe II: Erfolgreich auf die Umwelt reagieren", ziel: "Sich erfolgreich an Aktivitäten beteiligen", items: [
                { nr: 13, code: "SOZ-13", keyword: "Fantasie", description: "Beschäftigt sich mit Fantasiespielen.", zielformulierungen: ["Ich denke mir selber etwas zum Spielen aus."] },
                { nr: 14, code: "SOZ-14", keyword: "warten", description: "Wartet ohne Hilfe.", zielformulierungen: ["Ich warte bis ich an der Reihe bin."] },
                { nr: 15, code: "SOZ-15", keyword: "Kontakt", description: "Nimmt sozialen Kontakt auf.", zielformulierungen: ["Ich gehe freundlich auf meine Mitschüler:innen zu."] },
                { nr: 16, code: "SOZ-16", keyword: "teilen", description: "Teilt mit anderen.", zielformulierungen: ["Ich teile mit anderen Kindern."] },
                { nr: 17, code: "SOZ-17", keyword: "Spiel interaktiv", description: "Beteiligt sich an interaktivem Spiel.", zielformulierungen: ["Ich spiele friedlich mit anderen Kindern zusammen."] },
                { nr: 18, code: "SOZ-18", keyword: "Kooperation", description: "Kooperiert mit anderen Kindern.", zielformulierungen: ["Bei Partnerarbeiten arbeite ich mit einem anderen Kind zusammen."] }
            ]},
            3: { name: "Stufe III: Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen", ziel: "Gruppenaktivitäten als befriedigend erleben", items: [
                { nr: 19, code: "SOZ-19", keyword: "abwechseln", description: "Teilt und wechselt sich ab.", zielformulierungen: ["Ich teile und wechsele mich mit anderen Kindern ab."] },
                { nr: 20, code: "SOZ-20", keyword: "nachahmen", description: "Ahmt gutes Verhalten nach.", zielformulierungen: ["Wenn andere sich gut verhalten, mache ich es auch."] },
                { nr: 21, code: "SOZ-21", keyword: "werten", description: "Bewertet soziale Situationen.", zielformulierungen: ["Ich sage, ob ich etwas richtig oder falsch finde."] },
                { nr: 22, code: "SOZ-22", keyword: "leiten", description: "Leitet Gruppenaktivitäten.", zielformulierungen: ["Ich zeige oder erkläre anderen, wie etwas gemacht wird."] },
                { nr: 23, code: "SOZ-23", keyword: "Vorschlag - andere", description: "Akzeptiert Vorschläge anderer.", zielformulierungen: ["Ich akzeptiere Vorschläge meiner Mitschüler:innen."] },
                { nr: 24, code: "SOZ-24", keyword: "Erfahrungen", description: "Beschreibt Erfahrungen.", zielformulierungen: ["Ich erzähle in der richtigen Reihenfolge, was passiert ist."] },
                { nr: 25, code: "SOZ-25", keyword: "Vorliebe", description: "Zeigt Vorliebe für bestimmte Kinder.", zielformulierungen: ["Ich nehme Kontakt zu einem Kind auf, das ich besonders mag."] },
                { nr: 26, code: "SOZ-26", keyword: "Unterstützung", description: "Sucht Hilfe bei anderen Kindern.", zielformulierungen: ["Ich frage andere Kinder um Hilfe."] },
                { nr: 27, code: "SOZ-27", keyword: "Gruppenregeln", description: "Hilft bei der Einhaltung von Regeln.", zielformulierungen: ["Ich erinnere andere freundlich an die Gruppenregeln."] }
            ]},
            4: { name: "Stufe IV: Sich einbringen in Gruppenprozesse", ziel: "Nimmt von sich aus und erfolgreich als Gruppenmitglied an Aktivitäten teil", items: [
                { nr: 28, code: "SOZ-28", keyword: "identifizieren", description: "Identifiziert sich mit Vorbildern.", zielformulierungen: ["Ich orientiere mich an positiven Vorbildern."] },
                { nr: 29, code: "SOZ-29", keyword: "Gruppenerfahrung", description: "Beschreibt Gruppenerfahrungen.", zielformulierungen: ["Ich erzähle von Gruppenerlebnissen."] },
                { nr: 30, code: "SOZ-30", keyword: "Gruppenaktivität", description: "Schlägt Gruppenaktivitäten vor.", zielformulierungen: ["Ich schlage der Gruppe Aktivitäten vor."] },
                { nr: 31, code: "SOZ-31", keyword: "Verschiedenheit", description: "Erkennt Verschiedenheit.", zielformulierungen: ["Ich erkenne Unterschiede zwischen meinem Verhalten und dem anderer."] },
                { nr: 32, code: "SOZ-32", keyword: "Respekt", description: "Respektiert Meinungen anderer.", zielformulierungen: ["Ich höre anderen zu und respektiere ihre Meinung."] },
                { nr: 33, code: "SOZ-33", keyword: "Interesse", description: "Interessiert sich für Meinung anderer.", zielformulierungen: ["Mich interessiert die Meinung anderer über mich."] },
                { nr: 34, code: "SOZ-34", keyword: "Lösungsvorschlag", description: "Macht konstruktive Vorschläge.", zielformulierungen: ["Bei Problemen mache ich konstruktive Vorschläge."] },
                { nr: 35, code: "SOZ-35", keyword: "Wertvorstellung", description: "Erkennt verschiedene Werte.", zielformulierungen: ["Ich unterscheide zwischen richtig und falsch."] },
                { nr: 36, code: "SOZ-36", keyword: "Schlussfolgerungen", description: "Zieht Schlussfolgerungen.", zielformulierungen: ["Ich lerne aus sozialen Situationen."] }
            ]},
            5: { name: "Stufe V: Anwenden von individuellen und gruppenbezogenen Fähigkeiten in neuen Situationen", ziel: "Beginnt und pflegt selbständig dauerhafte und tragfähige Beziehungen mit anderen", items: [
                { nr: 37, code: "SOZ-37", keyword: "Empathie", description: "Versteht Gefühle anderer.", zielformulierungen: ["Ich verstehe, wie sich andere fühlen."] },
                { nr: 38, code: "SOZ-38", keyword: "verschiedene Rollen", description: "Interagiert in verschiedenen Rollen.", zielformulierungen: ["Ich kann verschiedene Rollen in einer Gruppe übernehmen."] },
                { nr: 39, code: "SOZ-39", keyword: "Prinzipien", description: "Entscheidet nach eigenen Werten.", zielformulierungen: ["Ich entscheide nach meinen eigenen Werten."] },
                { nr: 40, code: "SOZ-40", keyword: "Selbstverständnis", description: "Zeigt realistisches Selbstverständnis.", zielformulierungen: ["Ich kenne meine Stärken und Schwächen realistisch."] },
                { nr: 41, code: "SOZ-41", keyword: "Interpersonalität", description: "Baut dauerhafte Beziehungen auf.", zielformulierungen: ["Ich baue langfristige Freundschaften auf."] }
            ]}
        }
    },
    kognition: {
        name: "Kognition",
        code: "KOG",
        color: "#f39c12",
        stufen: {
            1: { name: "Stufe I: Mit Freude auf die Umwelt reagieren", ziel: "Auf die Umgebung reagieren mit gezielten Körperbewegungen und elementaren mentalen Verarbeitungsprozessen", items: [
                { nr: 1, code: "KOG-1", keyword: "Orientierung", description: "Reagiert auf sensorischen Reiz.", zielformulierungen: ["Ich wende mich Reizen zu, die mich interessieren."] },
                { nr: 2, code: "KOG-2", keyword: "Aufmerksamkeit", description: "Zeigt kurze Aufmerksamkeit.", zielformulierungen: ["Ich bleibe kurz aufmerksam bei einer Sache."] },
                { nr: 3, code: "KOG-3", keyword: "Kurzzeitgedächtnis", description: "Erkennt Personen/Objekte wieder.", zielformulierungen: ["Ich erkenne bekannte Personen und Dinge wieder."] },
                { nr: 4, code: "KOG-4", keyword: "komplexe Reaktionen", description: "Reagiert auf komplexe Reize.", zielformulierungen: ["Ich reagiere auf Anweisungen mit Handlungen."] },
                { nr: 5, code: "KOG-5", keyword: "einfache Imitation", description: "Imitiert einfache Handlungen.", zielformulierungen: ["Ich mache einfache Handlungen nach."] },
                { nr: 6, code: "KOG-6", keyword: "Motorik 18 Monate", description: "Zeigt grundlegende Motorik.", zielformulierungen: ["Ich zeige grundlegende motorische Fähigkeiten."] },
                { nr: 7, code: "KOG-7", keyword: "Bezeichnung", description: "Versteht Objektbezeichnungen.", zielformulierungen: ["Ich verstehe die Namen von bekannten Dingen."] },
                { nr: 8, code: "KOG-8", keyword: "Wort-Annäherung", description: "Reagiert verbal auf Fragen.", zielformulierungen: ["Ich antworte auf Fragen mit Worten."] },
                { nr: 9, code: "KOG-9", keyword: "Wörter spontan", description: "Verwendet Wörter spontan.", zielformulierungen: ["Ich benutze Wörter von mir aus."] },
                { nr: 10, code: "KOG-10", keyword: "Form", description: "Erkennt Formen.", zielformulierungen: ["Ich erkenne Formen und ordne sie zu."] },
                { nr: 11, code: "KOG-11", keyword: "Körperteile", description: "Identifiziert Körperteile.", zielformulierungen: ["Ich zeige und benenne meine Körperteile."] },
                { nr: 12, code: "KOG-12", keyword: "Details", description: "Erkennt Details in Bildern.", zielformulierungen: ["Ich erkenne Details in Bildern."] },
                { nr: 13, code: "KOG-13", keyword: "sortieren", description: "Sortiert Objekte.", zielformulierungen: ["Ich sortiere Dinge nach Merkmalen."] },
                { nr: 14, code: "KOG-14", keyword: "Bilder benennen", description: "Benennt Bilder.", zielformulierungen: ["Ich benenne Bilder mit den richtigen Wörtern."] }
            ]},
            2: { name: "Stufe II: Erfolgreich auf die Umwelt reagieren", ziel: "Beteiligung an Aktivitäten, die Fähigkeiten der Selbsthilfe, motorischen Koordination, Sprache sowie mentale Prozesse erfordern", items: [
                { nr: 15, code: "KOG-15", keyword: "Gebrauchswert", description: "Erkennt Gebrauchswert.", zielformulierungen: ["Ich weiß, wofür man Dinge benutzt."] },
                { nr: 16, code: "KOG-16", keyword: "Körper - 3", description: "Motorik eines 3-Jährigen.", zielformulierungen: ["Ich bewege mich altersgemäß."] },
                { nr: 17, code: "KOG-17", keyword: "Serie - identisch", description: "Ordnet identische Bilder zu.", zielformulierungen: ["Ich finde gleiche Bilder."] },
                { nr: 18, code: "KOG-18", keyword: "Feinmotorik - 3", description: "Feinmotorik eines 3-Jährigen.", zielformulierungen: ["Ich kann feine Bewegungen machen."] },
                { nr: 19, code: "KOG-19", keyword: "Serie - anders", description: "Erkennt Unterschiede.", zielformulierungen: ["Ich finde das, was anders ist."] },
                { nr: 20, code: "KOG-20", keyword: "Gegenteile", description: "Versteht Gegenteile.", zielformulierungen: ["Ich kenne Gegenteile wie groß/klein."] },
                { nr: 21, code: "KOG-21", keyword: "kategorisieren", description: "Kategorisiert Bilder.", zielformulierungen: ["Ich ordne Dinge in Gruppen."] },
                { nr: 22, code: "KOG-22", keyword: "zählen - 4", description: "Zählt bis 4.", zielformulierungen: ["Ich zähle bis 4."] },
                { nr: 23, code: "KOG-23", keyword: "Farben", description: "Identifiziert Farben/Formen.", zielformulierungen: ["Ich kenne Farben und Formen."] },
                { nr: 24, code: "KOG-24", keyword: "Alternation", description: "Wechselt zwischen Aufgaben.", zielformulierungen: ["Ich kann zwischen Aufgaben wechseln."] },
                { nr: 25, code: "KOG-25", keyword: "zählen - 10", description: "Zählt bis 10.", zielformulierungen: ["Ich zähle bis 10."] },
                { nr: 26, code: "KOG-26", keyword: "Auge-Hand-5", description: "Auge-Hand-Koordination 5 Jahre.", zielformulierungen: ["Meine Augen und Hände arbeiten gut zusammen."] },
                { nr: 27, code: "KOG-27", keyword: "unterscheiden", description: "Unterscheidet Ziffern/Buchstaben.", zielformulierungen: ["Ich unterscheide Zahlen von Buchstaben."] },
                { nr: 28, code: "KOG-28", keyword: "Körper - 5", description: "Motorik eines 5-Jährigen.", zielformulierungen: ["Ich bewege mich wie ein 5-Jähriger."] },
                { nr: 29, code: "KOG-29", keyword: "Objekte - 5", description: "Erkennt Mengen bis 5.", zielformulierungen: ["Ich erkenne kleine Mengen auf einen Blick."] },
                { nr: 30, code: "KOG-30", keyword: "Gedächtnis", description: "Gibt Auswendiggelerntes wieder.", zielformulierungen: ["Ich kann Lieder und Reime auswendig."] },
                { nr: 31, code: "KOG-31", keyword: "Bilderserie", description: "Ordnet Bilder in Reihenfolge.", zielformulierungen: ["Ich bringe Bilder in die richtige Reihenfolge."] }
            ]},
            3: { name: "Stufe III: Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen", ziel: "Beteiligt sich erfolgreich in einer Lerngruppe und setzt dabei grundlegende Lernkompetenzen ein", items: [
                { nr: 32, code: "KOG-32", keyword: "Auge-Hand-6", description: "Auge-Hand-Koordination 6 Jahre.", zielformulierungen: ["Ich kann präzise mit meinen Händen arbeiten."] },
                { nr: 33, code: "KOG-33", keyword: "Körper - 6", description: "Motorik eines 6-Jährigen.", zielformulierungen: ["Ich kann mich gut bewegen."] },
                { nr: 34, code: "KOG-34", keyword: "lesen - 50", description: "Liest 50 Grundwörter.", zielformulierungen: ["Ich lese einfache Wörter."] },
                { nr: 35, code: "KOG-35", keyword: "Zahlen - 10", description: "Erkennt/schreibt Zahlen bis 10.", zielformulierungen: ["Ich schreibe die Zahlen von 1 bis 10."] },
                { nr: 36, code: "KOG-36", keyword: "schreiben - 50", description: "Schreibt 50 Grundwörter.", zielformulierungen: ["Ich schreibe einfache Wörter."] },
                { nr: 37, code: "KOG-37", keyword: "Verständnis", description: "Versteht Geschichten.", zielformulierungen: ["Ich verstehe Geschichten, die ich höre."] },
                { nr: 38, code: "KOG-38", keyword: "erklären", description: "Erklärt Verhalten anderer.", zielformulierungen: ["Ich erkläre, warum jemand etwas tut."] },
                { nr: 39, code: "KOG-39", keyword: "Sinnentnahme", description: "Versteht gelesene Sätze.", zielformulierungen: ["Ich verstehe, was ich lese."] },
                { nr: 40, code: "KOG-40", keyword: "Plus/Minus - 9", description: "Rechnet bis 9.", zielformulierungen: ["Ich rechne Plus und Minus bis 9."] },
                { nr: 41, code: "KOG-41", keyword: "Unlogik", description: "Erkennt Unstimmigkeiten.", zielformulierungen: ["Ich erkenne, wenn etwas nicht stimmt."] },
                { nr: 42, code: "KOG-42", keyword: "Antwortsätze", description: "Schreibt Antwortsätze.", zielformulierungen: ["Ich schreibe Antworten in ganzen Sätzen."] },
                { nr: 43, code: "KOG-43", keyword: "Sport - Spiele", description: "Zeigt motorische Kompetenz.", zielformulierungen: ["Ich kann Sport- und Bewegungsspiele mitmachen."] },
                { nr: 44, code: "KOG-44", keyword: "Sätze frei", description: "Formuliert eigene Sätze.", zielformulierungen: ["Ich schreibe eigene Sätze."] },
                { nr: 45, code: "KOG-45", keyword: "numerische Konzepte", description: "Rechnet mit Zeit und Geld.", zielformulierungen: ["Ich rechne mit Zeit und Geld."] },
                { nr: 46, code: "KOG-46", keyword: "Quantitativa", description: "Versteht Maßeinheiten.", zielformulierungen: ["Ich verstehe Maßeinheiten."] },
                { nr: 47, code: "KOG-47", keyword: "Sachverhalte", description: "Liest und erzählt Geschichten.", zielformulierungen: ["Ich lese Geschichten und erzähle sie nach."] },
                { nr: 48, code: "KOG-48", keyword: "Operationen", description: "Rechnet mit größeren Zahlen.", zielformulierungen: ["Ich rechne mit größeren Zahlen."] }
            ]},
            4: { name: "Stufe IV: Sich einbringen in Gruppenprozesse", ziel: "Gebraucht kognitive und schulische Fähigkeiten, um sich erfolgreich an sozialen Gruppenerfahrungen zu beteiligen", items: [
                { nr: 49, code: "KOG-49", keyword: "Kommunikation", description: "Schreibt zum Mitteilen.", zielformulierungen: ["Ich schreibe, um mich mitzuteilen."] },
                { nr: 50, code: "KOG-50", keyword: "Mult./Divis. 100", description: "Rechnet Mal/Geteilt bis 100.", zielformulierungen: ["Ich rechne Mal und Geteilt bis 100."] },
                { nr: 51, code: "KOG-51", keyword: "Informationsgewinn", description: "Liest zum Lernen.", zielformulierungen: ["Ich lese gerne, um Neues zu lernen."] },
                { nr: 52, code: "KOG-52", keyword: "Geldmenge - 10€", description: "Rechnet mit Geld bis 10€.", zielformulierungen: ["Ich rechne mit Geld bis 10 Euro."] },
                { nr: 53, code: "KOG-53", keyword: "Fiktion", description: "Versteht fiktive Charaktere.", zielformulierungen: ["Ich verstehe Figuren aus Geschichten."] },
                { nr: 54, code: "KOG-54", keyword: "Grammatik", description: "Verwendet Grammatik korrekt.", zielformulierungen: ["Ich schreibe grammatisch richtig."] },
                { nr: 55, code: "KOG-55", keyword: "Wertvorstellungen", description: "Erkennt verschiedene Werte.", zielformulierungen: ["Ich erkenne verschiedene Werte."] },
                { nr: 56, code: "KOG-56", keyword: "Konzepte", description: "Löst logische Probleme.", zielformulierungen: ["Ich löse Probleme mit Maßeinheiten."] }
            ]},
            5: { name: "Stufe V: Anwenden von individuellen und gruppenbezogenen Fähigkeiten in neuen Situationen", ziel: "Setzt erfolgreich kognitive Fähigkeiten zur Bereicherung persönlicher Erfahrungen ein", items: [
                { nr: 57, code: "KOG-57", keyword: "Zeitgeschichte", description: "Interessiert sich für aktuelle Themen.", zielformulierungen: ["Ich interessiere mich für aktuelle Themen."] },
                { nr: 58, code: "KOG-58", keyword: "Meinungen", description: "Unterscheidet Fakten/Meinungen.", zielformulierungen: ["Ich unterscheide Fakten von Meinungen."] },
                { nr: 59, code: "KOG-59", keyword: "Inkonsistenz", description: "Erkennt widersprüchliches Verhalten.", zielformulierungen: ["Ich erkenne widersprüchliches Verhalten."] },
                { nr: 60, code: "KOG-60", keyword: "Textaufgaben", description: "Löst schwierige Textaufgaben.", zielformulierungen: ["Ich löse schwierige Textaufgaben."] },
                { nr: 61, code: "KOG-61", keyword: "Einsicht", description: "Löst Probleme durch Analyse.", zielformulierungen: ["Ich löse Probleme durch Nachdenken."] },
                { nr: 62, code: "KOG-62", keyword: "Bürger/in", description: "Nutzt Wissen im Alltag.", zielformulierungen: ["Ich nutze mein Wissen im Alltag."] }
            ]}
        }
    }
};
