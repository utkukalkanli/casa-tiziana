/**
 * German copy. Mirrors `en.js` key for key — see the note at the top of that file.
 *
 * German is the second language of the valley's own market: Trentino borders South
 * Tyrol, and a large share of the winter guests in Folgarida arrive from Germany and
 * Austria. The keywords are "Ferienwohnung", "Val di Sole", "Folgarida", "Skigebiet".
 *
 * Register: informal "du", which is what the mountain trade uses in German, switching
 * to "ihr" only where the sentence is genuinely addressing the whole group. Never
 * "Sie" — it reads like a hotel, and this is not one.
 */
export default {
  meta: {
    title: 'Casa Tiziana — Ferienwohnung im Val di Sole, Dolomiten',
    description:
      'Ferienwohnung für bis zu 6 Personen in Dimaro Folgarida, Val di Sole. Ski, Bike, Wandern und ' +
      'Rafting in den Dolomiten ab 110 € pro Nacht. Direkt über WhatsApp buchen.',
    ogTitle: 'Casa Tiziana — Dein Basislager in den Dolomiten',
    ogDescription:
      'Eine Ferienwohnung für bis zu 6 Personen im Val di Sole, Trentino. Klettern, Mountainbiken, ' +
      'Wandern, Rafting und Skifahren direkt vor der Tür. Ab 110 € pro Nacht.',
  },

  content: {
    location: 'Val di Sole, Trentino–Südtirol, Italien',
    locationCta: 'Auf der Karte ansehen',

    // "Basislager" is the term German-speaking mountaineers use, and it carries the
    // same weight in the heavy slot that "Basecamp" does on the flyer.
    headline: {
      lead: 'Dein',
      main: 'Basislager',
      connector: 'in den',
      place: 'Dolomiten',
    },

    intro:
      'Erkunde die Dolomiten von deiner Ferienwohnung im Val di Sole, Trentino. Klettern, Biken, ' +
      'Wandern und Rafting nur Minuten von der Haustür. Wohne wie ein Einheimischer und finde die ' +
      'besten Touren über Tipps aus erster Hand.',

    price: {
      unit: 'Nacht',
      note: 'Bring deine Freunde mit und teilt die Kosten',
    },

    features: [
      'Bis zu 6 Gäste',
      'Voll ausgestattete Küche',
      'Ruhige Lage am Waldrand',
      'Privater Parkplatz',
      'Bike- und Skiraum',
      'Schneller Zugang zu Trails und Outdoor-Aktivitäten',
    ],

    activities: ['Klettern', 'Mountainbiken', 'Wandern', 'Rafting', 'Skifahren'],

    cta: {
      label: 'Unsere Wochenend-Angebote',
      message:
        'Hallo Gabriele, ich würde gern mehr über die Wochenend-Angebote der Casa Tiziana erfahren.',
    },

    ui: {
      rentsFrom: 'Miete ab',
      bookWhatsApp: 'Über WhatsApp buchen',
      languageLabel: 'Sprache',
    },
  },

  sections: {
    scrollCue: 'Das Tal',

    about: {
      title: 'Die Wohnung',
      lede:
        'Casa Tiziana ist eine Ferienwohnung mit Selbstverpflegung in Carciato, einem Weiler von ' +
        'Dimaro Folgarida im Val di Sole, Trentino. Sie wird komplett vermietet — eine Gruppe zur ' +
        'Zeit, bis zu sechs Personen — Küche, Parkplatz und Abstellraum gehören für die Dauer des ' +
        'Aufenthalts also euch und nicht einer Rezeption.',
      body: [
        'Sie ist für Gäste gemacht, die mit Ausrüstung anreisen. Bikes und Ski kommen in den ' +
          'Abstellraum statt die Treppe hoch, das Auto steht auf dem privaten Parkplatz statt im Dorf ' +
          'zu kreisen, und die Küche ist gut genug ausgestattet, dass man auch nach einem späten ' +
          'Rückweg vom Berg noch richtig kocht.',
        'Die Lage ist ruhig — die letzten Häuser vor dem Wald — aber nicht abgelegen. Talboden, Fluss ' +
          'und Radweg sind zu Fuß erreichbar, die Lifte ein paar Minuten mit dem Auto.',
      ],
    },

    gallery: {
      title: 'Fotos',
      lede:
        'Die Wohnung und das Dorf, aufgenommen vom Eigentümer. Weitwinkel — die Räume wirken dadurch ' +
        'etwas runder, als sie sind.',
      hint: 'Für eine größere Ansicht ein Foto auswählen',
      close: 'Schließen',
      previous: 'Vorheriges Foto',
      next: 'Nächstes Foto',
      alts: {
        house: 'Casa Tiziana von der Straße aus, mit Holzbalkon und der Bergflanke dahinter.',
        living: 'Das Wohnzimmer: Sofa und Esstisch unter einem Fenster zum Tal.',
        kitchen: 'Die Küche in Kiefer, mit Gasherd und Esstisch daneben.',
        'bedroom-double': 'Ein Doppelzimmer mit Fenster zum Garten.',
        'bedroom-window': 'Ein helles Doppelzimmer mit Blick talaufwärts.',
        'bedroom-twin': 'Ein Zimmer mit zwei Betten und einem Holzschrank.',
        'bedroom-wardrobe': 'Ein Einzelzimmer mit deckenhohem Kleiderschrank.',
        dining: 'Das Esszimmer, mit Tisch für sechs unter einem niedrigen Bogenfenster.',
        'kitchen-second': 'Eine zweite Küche, mit Geschirrspüler, Backofen und Tisch am Fenster.',
        balcony: 'Der Balkon, mit Blick über die Dächer von Carciato ins Tal.',
        terrace: 'Die gepflasterte Terrasse und der Garten, mit Picknicktisch unter der Pergola.',
        window: 'Ein offenes Fenster zum Garten und zu den Bergen dahinter.',
        village: 'Die Dächer von Carciato und die bewaldeten Hänge des Val di Sole.',
        courtyard: 'Der Parkplatz am Haus, an der Straße hinter dem Gebäude.',
      },
    },

    location: {
      title: 'Wo du bist',
      lede:
        'Das Val di Sole zieht von der Brenta-Gruppe nach Westen zum Ortler–Cevedale, mit dem Noce ' +
        'auf dem Talboden. Dimaro Folgarida liegt in der Mitte, zwischen dem Naturpark ' +
        'Adamello-Brenta im Süden und dem Nationalpark Stilfserjoch im Norden.',
      facts: [
        {
          label: 'Skifahren',
          detail:
            'Die Gondelbahn Folgarida liegt etwa 4 km die Straße hinauf. Von dort ist ' +
            'Folgarida–Marilleva per Lift mit Madonna di Campiglio und Pinzolo verbunden — rund ' +
            '150 km zusammenhängende Piste in der Skiarea Campiglio Dolomiti di Brenta, ohne die Ski ' +
            'abzuschnallen.',
        },
        {
          label: 'Rafting',
          detail:
            'Der Noce gilt als einer der besten Wildwasserflüsse Europas, und die Raftingzentren, die ' +
            'ihn befahren, liegen in Dimaro selbst — die nächstgelegene Aktivität überhaupt, und der ' +
            'Grund, warum hier auch Leute ins Boot steigen, die noch nie gepaddelt haben.',
        },
        {
          label: 'Radweg',
          detail:
            'Der Radweg des Val di Sole folgt dem Noce über etwa 33 km durch den Talboden und führt ' +
            'durch Carciato. Er ist flach genug für Kinder und verbindet die Dörfer, ohne dass jemand ' +
            'auf die Hauptstraße muss.',
        },
        {
          label: 'Mountainbiken',
          detail:
            'Das Val di Sole ist UCI Bike City Region, und die Weltcup-Strecken für Downhill und ' +
            'Cross-Country in Daolasa liegen wenige Kilometer talwärts. Im Sommer nehmen die Lifte ' +
            'Bikes mit, die Abfahrten müssen also nicht zweimal verdient werden.',
        },
        {
          label: 'Wandern und Klettern',
          detail:
            'Wege starten im Wald hinter dem Haus und steigen zur Presanella und zur Brenta auf; die ' +
            'Brenta-Dolomiten sind UNESCO-Welterbe und haben einige der ältesten Klettersteige der ' +
            'Alpen. Frag vorher — zu wissen, welche Route diese Woche in Verhältnissen ist, ist genau ' +
            'das, wofür ein Einheimischer gut ist.',
        },
      ],
    },

    seasons: {
      title: 'Die richtige Zeit',
      items: [
        {
          label: 'Winter',
          detail:
            'Dezember bis Anfang April. Ski und Board auf dem Karussell ' +
            'Campiglio–Folgarida–Marilleva, mit dem Skiraum im Haus und einer Liftstraße ohne den ' +
            'Verkehr, der die höher gelegenen Dörfer verstopft.',
        },
        {
          label: 'Frühling',
          detail:
            'April bis Juni. Die Schneeschmelze bringt den Noce auf den höchsten und schnellsten ' +
            'Stand — die Saison, auf die Raftingguides warten. Die tieferen Wege trocknen zuerst ab.',
        },
        {
          label: 'Sommer',
          detail:
            'Juni bis September. Das ganze Tal ist gleichzeitig in Betrieb: Bikes an den Liften, ' +
            'Familien auf dem Radweg und lange Tage auf den Höhenwegen unter der Brenta.',
        },
        {
          label: 'Herbst',
          detail:
            'September bis November. Die ruhigste und zum Wandern wohl die beste Zeit: stabiles ' +
            'Wetter, färbende Lärchen und das Tal fast für sich allein.',
        },
      ],
    },

    faq: {
      title: 'Häufige Fragen',
      items: [
        {
          q: 'Für wie viele Personen ist Casa Tiziana?',
          a:
            'Für bis zu sechs. Die Wohnung wird komplett an eine Gruppe vermietet — das ist es, was ' +
            'den Preis pro Person aufgehen lässt: der Nachtpreis beginnt bei 110 €, ob ihr zwei oder ' +
            'sechs seid.',
        },
        {
          q: 'Gibt es einen Parkplatz?',
          a:
            'Ja, privater Parkplatz am Haus, inklusive. Praktisch in einem Tal, in dem die ' +
            'Dorfparkplätze im Februar und im August knapp sind.',
        },
        {
          q: 'Wohin mit Bikes und Ski?',
          a:
            'Es gibt einen eigenen Bike- und Skiraum, damit die Ausrüstung nicht durch den Wohnraum ' +
            'kommt und nicht die Nacht auf dem Dachträger verbringt.',
        },
        {
          q: 'Wie weit sind die Skilifte?',
          a:
            'Die Gondelbahn Folgarida liegt rund 4 km entfernt, ein paar Minuten mit dem Auto. Von ' +
            'dort reicht der Liftverbund bis Madonna di Campiglio und Pinzolo.',
        },
        {
          q: 'Brauche ich ein Auto?',
          a:
            'Es macht das Tal deutlich einfacher, und der Parkplatz ist dafür da. Auch ohne kommt man ' +
            'zu Fuß an den Radweg und an den Fluss, und das Val di Sole hat eine Bahnlinie und ' +
            'Skibusse entlang des Talbodens.',
        },
        {
          q: 'Wie buche ich?',
          a:
            'Schreib Gabriele auf WhatsApp — das ist der Buchungskanal und der schnellste Weg, nach ' +
            'Terminen, Wochenend-Angeboten oder den Verhältnissen dieser Woche zu fragen.',
        },
      ],
    },

    closing: {
      title: 'Nach Terminen fragen',
      body:
        'Casa Tiziana ist eine Wohnung, direkt beim Eigentümer gebucht. Schick eine Nachricht mit ' +
        'euren Terminen und wie viele ihr seid.',
    },
  },
}
