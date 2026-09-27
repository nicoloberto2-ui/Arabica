export type Lesson = {
  id: string
  unit: number
  title: string
  subtitle: string
  minutes: number
  xp: number
  content: { heading: string; body: string; arabic?: string; tip?: string }[]
  practice: { prompt: string; answer: string }[]
}

export const lessons: Lesson[] = [
  {id:'l1',unit:1,title:'Come funziona la scrittura araba',subtitle:'Direzione, forme e vocali brevi',minutes:12,xp:40,content:[
    {heading:'Da destra a sinistra',body:'L’arabo si legge e si scrive da destra verso sinistra. I numeri, invece, possono mantenere un ordine diverso a seconda del contesto.',arabic:'العَرَبِيَّة'},
    {heading:'Le lettere si collegano',body:'Molte lettere cambiano forma a seconda della posizione nella parola. Alcune lettere non si collegano alla lettera successiva.'},
    {heading:'Le vocali brevi',body:'Fatḥa َ indica spesso “a”, kasra ِ “i”, ḍamma ُ “u”. Nei testi quotidiani queste vocali sono spesso omesse.',tip:'All’inizio studia con le vocali: ti aiutano moltissimo a leggere.'}
  ],practice:[{prompt:'In quale direzione si legge l’arabo?',answer:'Da destra a sinistra'},{prompt:'Come si chiama il segno َ ?',answer:'Fatḥa'}]},
  {id:'l2',unit:1,title:'Prime 7 lettere',subtitle:'ا ب ت ث ج ح خ',minutes:15,xp:50,content:[
    {heading:'Primo gruppo',body:'Impara a riconoscere le lettere anche quando sono collegate.',arabic:'ا ب ت ث ج ح خ'},
    {heading:'Punti distintivi',body:'ب ت ث condividono una forma simile ma cambiano per numero e posizione dei punti. ج ح خ condividono un’altra forma di base.'}
  ],practice:[{prompt:'Quale lettera rappresenta “b”?',answer:'ب'},{prompt:'Quale lettera ha il suono “kh”?',answer:'خ'}]},
  {id:'l3',unit:1,title:'Completa l’alfabeto',subtitle:'Riconoscimento e collegamenti',minutes:20,xp:60,content:[
    {heading:'Obiettivo',body:'Arriva a riconoscere tutte le 28 lettere senza usare l’ordine alfabetico come aiuto.'},
    {heading:'Lettere che interrompono il collegamento',body:'ا د ذ ر ز و non si collegano alla lettera che viene dopo nella stessa parola.',tip:'Cerca queste sei lettere dentro parole reali.'}
  ],practice:[{prompt:'Quante lettere principali ha l’alfabeto arabo?',answer:'28'},{prompt:'و si collega alla lettera seguente?',answer:'No'}]},
  {id:'l4',unit:2,title:'Saluti e presentazioni',subtitle:'Ciao, grazie, come stai?',minutes:15,xp:60,content:[
    {heading:'Il saluto classico',body:'Un saluto molto diffuso è السَّلَامُ عَلَيْكُمْ.',arabic:'السَّلَامُ عَلَيْكُمْ'},
    {heading:'Presentarsi',body:'Per dire “il mio nome è…” puoi usare اسمي…',arabic:'اِسْمِي مَارْكُو'},
    {heading:'Chiedere come stai',body:'La forma standard è كَيْفَ حَالُكَ؟ rivolta a un uomo; la desinenza cambia al femminile.',arabic:'كَيْفَ حَالُكَ؟'}
  ],practice:[{prompt:'Come si dice “grazie”?',answer:'شكرًا'},{prompt:'Cosa significa اسمي؟',answer:'Il mio nome è…'}]},
  {id:'l5',unit:2,title:'Pronomi personali',subtitle:'Io, tu, lui, lei, noi',minutes:18,xp:70,content:[
    {heading:'Singolare',body:'أنا = io, أنتَ = tu maschile, أنتِ = tu femminile, هو = lui, هي = lei.',arabic:'أنا • أنتَ • أنتِ • هو • هي'},
    {heading:'Frasi senza “essere” al presente',body:'In molte frasi nominali al presente non serve un verbo equivalente a “essere”: أنا إيطالي = io sono italiano.',arabic:'أَنَا إِيطَالِيّ'}
  ],practice:[{prompt:'Come si dice “io”?',answer:'أنا'},{prompt:'Serve sempre il verbo “essere” al presente?',answer:'No'}]},
  {id:'l6',unit:3,title:'Numeri e quantità',subtitle:'Da 1 a 10 e domande con كم',minutes:20,xp:70,content:[
    {heading:'Numeri 1–5',body:'واحد، اثنان، ثلاثة، أربعة، خمسة',arabic:'١ ٢ ٣ ٤ ٥'},
    {heading:'Chiedere quanto',body:'كَمْ significa “quanto/quanti?”. Può introdurre domande sul prezzo o sulla quantità.',arabic:'كَمْ هَذَا؟'}
  ],practice:[{prompt:'Come si dice “tre”?',answer:'ثلاثة'},{prompt:'Quale parola significa “quanto?”',answer:'كم'}]},
  {id:'l7',unit:3,title:'Maschile e femminile',subtitle:'Genere e aggettivi',minutes:18,xp:70,content:[
    {heading:'Tāʾ marbūṭa',body:'Molti nomi e aggettivi femminili terminano in ة, chiamata tāʾ marbūṭa.',arabic:'جَمِيلَة'},
    {heading:'Accordo',body:'L’aggettivo tende ad accordarsi con il nome in genere e definitezza.',arabic:'بَيْتٌ جَمِيلٌ'}
  ],practice:[{prompt:'Quale segno compare spesso nei femminili?',answer:'ة'},{prompt:'L’aggettivo concorda con il nome?',answer:'Sì'}]},
  {id:'l8',unit:4,title:'Il presente dei verbi',subtitle:'Azioni quotidiane',minutes:22,xp:80,content:[
    {heading:'Prefissi',body:'Al presente, i verbi usano spesso prefissi che indicano la persona: أ- per “io”, ت- in varie forme di “tu”, ي- spesso per “lui”.'},
    {heading:'Parlare',body:'أَتَكَلَّمُ العَرَبِيَّة = parlo arabo.',arabic:'أَتَكَلَّمُ العَرَبِيَّة'}
  ],practice:[{prompt:'Quale prefisso compare spesso con “io”?',answer:'أ-'},{prompt:'Traduci أتكلم العربية',answer:'Parlo arabo'}]},
  {id:'l9',unit:4,title:'Domande essenziali',subtitle:'Dove, chi, cosa, come',minutes:18,xp:80,content:[
    {heading:'Parole interrogative',body:'أين = dove, من = chi, ماذا = cosa, كيف = come, كم = quanto.',arabic:'أَيْنَ؟ مَنْ؟ مَاذَا؟ كَيْفَ؟ كَمْ؟'},
    {heading:'Domanda pratica',body:'أين الحمام؟ significa “Dov’è il bagno?”.',arabic:'أَيْنَ الْحَمَّام؟'}
  ],practice:[{prompt:'Come si dice “dove?”',answer:'أين'},{prompt:'Traduci من؟',answer:'Chi?'}]},
  {id:'l10',unit:5,title:'Al ristorante',subtitle:'Ordinare e chiedere il conto',minutes:20,xp:90,content:[
    {heading:'Vorrei…',body:'أريد significa “voglio/vorrei” in contesti semplici.',arabic:'أُرِيدُ مَاءً'},
    {heading:'Il conto',body:'Puoi imparare l’espressione الحساب من فضلك = il conto, per favore.',arabic:'الْحِسَاب مِنْ فَضْلِكَ'}
  ],practice:[{prompt:'Come dici “vorrei dell’acqua”?',answer:'أريد ماءً'},{prompt:'Cosa significa الحساب؟',answer:'Il conto'}]},
  {id:'l11',unit:5,title:'Orientarsi e viaggiare',subtitle:'Taxi, strada e indicazioni',minutes:22,xp:90,content:[
    {heading:'Luoghi',body:'مدينة = città, شارع = strada, سوق = mercato, مطعم = ristorante.',arabic:'مَدِينَة • شَارِع • سُوق • مَطْعَم'},
    {heading:'Non capisco',body:'Una frase salvavita: لا أفهم = non capisco.',arabic:'لَا أَفْهَم'}
  ],practice:[{prompt:'Come si dice “mercato”?',answer:'سوق'},{prompt:'Traduci لا أفهم',answer:'Non capisco'}]},
  {id:'l12',unit:6,title:'Conversazione base',subtitle:'Metti insieme tutto',minutes:25,xp:120,content:[
    {heading:'Mini-dialogo',body:'Combina saluto, presentazione, provenienza e una domanda. L’obiettivo è parlare anche con frasi semplici.',arabic:'مَرْحَبًا! اِسْمِي لُوكَا. أَنَا إِيطَالِيّ. كَيْفَ حَالُكَ؟'},
    {heading:'Strategia',body:'Non tradurre ogni parola nella testa. Memorizza blocchi di lingua e riutilizzali.',tip:'Ripeti lo stesso mini-dialogo per 3 giorni, poi cambia una sola informazione alla volta.'}
  ],practice:[{prompt:'Costruisci una presentazione di 2 frasi.',answer:'Esempio: اسمي لوكا. أنا إيطالي.'},{prompt:'Qual è l’obiettivo finale?',answer:'Comunicare con frasi semplici e comprensibili'}]}
]
