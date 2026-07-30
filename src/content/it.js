/**
 * Italian copy. Mirrors `en.js` key for key — see the note at the top of that file.
 *
 * The market this language serves is the closest one: Italians drive to Val di Sole
 * for a weekend, so the words that matter are the ones they search with — "Val di
 * Sole", "Dimaro", "Folgarida", "appartamento", "settimana bianca".
 *
 * Register: informal "tu" in the hero, where the flyer is speaking to one reader, and
 * the impersonal in the prose, which describes the property rather than addressing
 * anyone. Do not switch to "Lei" — the guests are people arriving with mountain bikes.
 */
export default {
  meta: {
    title: 'Casa Tiziana — Appartamento vacanze in Val di Sole, Dolomiti',
    description:
      'Appartamento per 6 persone a Dimaro Folgarida, Val di Sole. Sci, bici, trekking e rafting ' +
      'nelle Dolomiti da 110 € a notte. Prenotazione diretta su WhatsApp.',
    ogTitle: 'Casa Tiziana — Il tuo campo base nelle Dolomiti',
    ogDescription:
      'Un appartamento per un massimo di 6 persone in Val di Sole, Trentino. Arrampicata, mountain ' +
      'bike, trekking, rafting e sci a due passi. Da 110 € a notte.',
  },

  content: {
    location: 'Val di Sole, Trentino–Alto Adige, Italia',
    locationCta: 'Vedi sulla mappa',

    // Same rhythm as the flyer: light / heavy / light / heavy. "Campo base" is the
    // mountaineering term an Italian reader expects; "basecamp" would read as English
    // marketing.
    headline: {
      lead: 'Il tuo',
      main: 'Campo base',
      connector: 'nelle',
      place: 'Dolomiti',
    },

    intro:
      'Esplora le Dolomiti dal tuo appartamento in Val di Sole, Trentino. Arrampica, pedala, cammina ' +
      'e scendi il Noce in raft a pochi minuti da casa. Vivi la valle come chi ci abita e scopri le ' +
      'avventure migliori con i consigli di un local.',

    price: {
      unit: 'notte',
      note: 'Porta gli amici e dividete le spese',
    },

    features: [
      'Fino a 6 ospiti',
      'Cucina completamente attrezzata',
      'Posizione tranquilla vicino al bosco',
      'Parcheggio privato',
      'Deposito bici e sci',
      'Accesso rapido a sentieri e attività outdoor',
    ],

    activities: ['Arrampicata', 'Mountain bike', 'Trekking', 'Rafting', 'Sci'],

    cta: {
      label: 'Scopri le offerte weekend',
      message: 'Ciao Gabriele, vorrei sapere di più sulle offerte weekend di Casa Tiziana.',
    },

    ui: {
      rentsFrom: 'Affitto da',
      bookWhatsApp: 'Prenota su WhatsApp',
      languageLabel: 'Lingua',
    },
  },

  sections: {
    scrollCue: 'La valle',

    about: {
      title: 'L’appartamento',
      lede:
        'Casa Tiziana è un appartamento vacanze a Carciato, frazione di Dimaro Folgarida, in Val di ' +
        'Sole, Trentino. Si affitta per intero — un solo gruppo alla volta, fino a sei persone — così ' +
        'cucina, parcheggio e deposito restano a disposizione per tutto il soggiorno, senza dividerli ' +
        'con una reception.',
      body: [
        'È pensato per chi arriva con l’attrezzatura. Bici e sci vanno nel deposito e non su per le ' +
          'scale, l’auto sul parcheggio privato invece di girare per il paese, e la cucina è attrezzata ' +
          'abbastanza bene da permettere una cena come si deve anche la sera in cui si rientra tardi ' +
          'dalla montagna.',
        'La posizione è tranquilla — le ultime case prima del bosco — ma non isolata. Il fondovalle, ' +
          'il fiume e la ciclabile sono a pochi passi, e gli impianti a pochi minuti in auto.',
      ],
    },

    gallery: {
      title: 'Fotografie',
      lede:
        'L’appartamento e il paese, fotografati dal proprietario. Obiettivo grandangolare: le stanze ' +
        'sembrano un po’ più tonde di come sono.',
      hint: 'Tocca una foto per vederla più grande',
      close: 'Chiudi',
      previous: 'Foto precedente',
      next: 'Foto successiva',
      alts: {
        house: 'Casa Tiziana vista dalla strada, con il balcone in legno e il versante alle spalle.',
        living: 'Il soggiorno: divano e tavolo da pranzo sotto una finestra che dà sulla valle.',
        kitchen: 'La cucina in pino, con piano a gas e tavolo per mangiare accanto.',
        'bedroom-double': 'Una camera matrimoniale con finestra sul giardino.',
        'bedroom-window': 'Una camera matrimoniale luminosa con vista verso il fondo della valle.',
        'bedroom-twin': 'Una camera con due letti e armadio in legno.',
        'bedroom-wardrobe': 'Una camera singola con armadio a tutta altezza.',
        dining: 'La sala da pranzo, con tavolo per sei sotto una finestra ad arco.',
        'kitchen-second': 'Una seconda cucina, con lavastoviglie, forno e tavolo accanto alla finestra.',
        balcony: 'Il balcone, con lo sguardo lungo la valle sopra i tetti di Carciato.',
        terrace: 'Il terrazzo pavimentato e il giardino, con tavolo da pic-nic sotto il pergolato.',
        window: 'Una finestra aperta sul giardino e sulle montagne dietro.',
        village: 'I tetti di Carciato e i versanti boscosi della Val di Sole.',
        courtyard: 'Il parcheggio della casa, sulla stradina dietro l’edificio.',
      },
    },

    location: {
      title: 'Dove ti trovi',
      lede:
        'La Val di Sole corre verso ovest dalle Dolomiti di Brenta all’Ortles–Cevedale, con il fiume ' +
        'Noce sul fondovalle. Dimaro Folgarida sta nel mezzo, tra il Parco Naturale Adamello-Brenta a ' +
        'sud e il Parco Nazionale dello Stelvio a nord.',
      facts: [
        {
          label: 'Sci',
          detail:
            'La cabinovia di Folgarida è a circa 4 km lungo la strada. Da lì Folgarida–Marilleva si ' +
            'collega con gli impianti a Madonna di Campiglio e Pinzolo: circa 150 km di piste ' +
            'collegate nella Skiarea Campiglio Dolomiti di Brenta, da percorrere senza togliere gli sci.',
        },
        {
          label: 'Rafting',
          detail:
            'Il Noce è considerato uno dei migliori fiumi da acque bianche d’Europa, e i centri ' +
            'rafting che lo navigano sono a Dimaro paese — l’attività più vicina alla porta, e il ' +
            'motivo per cui chi non ha mai pagaiato finisce per provarci proprio qui.',
        },
        {
          label: 'Ciclabile',
          detail:
            'La ciclabile della Val di Sole segue il Noce per circa 33 km lungo il fondovalle e passa ' +
            'da Carciato. È pianeggiante, adatta anche ai bambini, e collega i paesi senza mettere ' +
            'nessuno sulla statale.',
        },
        {
          label: 'Mountain bike',
          detail:
            'La Val di Sole è UCI Bike City Region, e i tracciati di Coppa del Mondo di downhill e ' +
            'cross-country a Daolasa sono a pochi chilometri giù per la valle. In estate gli impianti ' +
            'caricano le bici, così le discese non si guadagnano due volte.',
        },
        {
          label: 'Trekking e arrampicata',
          detail:
            'I sentieri partono dal bosco dietro casa e salgono verso i gruppi della Presanella e del ' +
            'Brenta; le Dolomiti di Brenta sono Patrimonio UNESCO e ospitano alcune delle vie ferrate ' +
            'più antiche delle Alpi. Chiedi prima di partire — sapere quale via è in condizione questa ' +
            'settimana è esattamente ciò a cui serve un local.',
        },
      ],
    },

    seasons: {
      title: 'Quando venire',
      items: [
        {
          label: 'Inverno',
          detail:
            'Da dicembre a inizio aprile. Sci e snowboard sul carosello Campiglio–Folgarida–Marilleva, ' +
            'con il deposito sci al piano di sotto e la strada degli impianti libera dal traffico che ' +
            'intasa i paesi più in alto.',
        },
        {
          label: 'Primavera',
          detail:
            'Da aprile a giugno. Lo scioglimento della neve porta il Noce al massimo della portata: è ' +
            'la stagione che le guide rafting aspettano. I sentieri più bassi si asciugano per primi.',
        },
        {
          label: 'Estate',
          detail:
            'Da giugno a settembre. Tutta la valle è in movimento: bici sugli impianti, famiglie sulla ' +
            'ciclabile e giornate lunghe sui sentieri alti sotto il Brenta.',
        },
        {
          label: 'Autunno',
          detail:
            'Da settembre a novembre. La stagione più tranquilla e, per camminare, forse la migliore: ' +
            'tempo stabile, larici che virano al giallo e la valle quasi per sé.',
        },
      ],
    },

    faq: {
      title: 'Domande frequenti',
      items: [
        {
          q: 'Quante persone dormono a Casa Tiziana?',
          a:
            'Fino a sei. L’appartamento si affitta per intero a un solo gruppo, ed è questo che fa ' +
            'funzionare il costo a testa: la tariffa parte da 110 € a notte, che siate due o sei.',
        },
        {
          q: 'C’è il parcheggio?',
          a:
            'Sì, parcheggio privato alla casa, incluso. Utile in una valle dove i posti in paese sono ' +
            'contati a febbraio e ad agosto.',
        },
        {
          q: 'Dove si mettono bici e sci?',
          a:
            'C’è un deposito dedicato a bici e sci, così l’attrezzatura non passa dal soggiorno e non ' +
            'dorme sul portapacchi.',
        },
        {
          q: 'Quanto distano gli impianti?',
          a:
            'La cabinovia di Folgarida è a circa 4 km, pochi minuti in auto. Da lì gli impianti ' +
            'collegano fino a Madonna di Campiglio e Pinzolo.',
        },
        {
          q: 'Serve l’auto?',
          a:
            'Rende la valle molto più comoda, e il parcheggio è lì per questo. Anche senza si ' +
            'raggiungono a piedi la ciclabile e il fiume, e la Val di Sole ha la ferrovia e gli ' +
            'skibus lungo il fondovalle.',
        },
        {
          q: 'Come si prenota?',
          a:
            'Scrivi a Gabriele su WhatsApp: è il canale di prenotazione, e il modo più rapido per ' +
            'chiedere le date, le offerte weekend o com’è la situazione in valle questa settimana.',
        },
      ],
    },

    closing: {
      title: 'Chiedi le date',
      body:
        'Casa Tiziana è un appartamento, prenotato direttamente con il proprietario. Manda un ' +
        'messaggio con le date e in quanti siete.',
    },
  },
}
