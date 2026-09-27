import { useEffect, useMemo, useState } from 'react'
import { alphabet } from './data/alphabet'
import { categories, vocabulary, type Word } from './data/vocabulary'
import { lessons, type Lesson } from './data/lessons'
import { loadProgress, saveProgress, updateStudyStreak, type UserProgress } from './lib/progress'

type Page = 'home' | 'course' | 'alphabet' | 'vocabulary' | 'flashcards' | 'quiz' | 'pronunciation' | 'grammar' | 'settings'

const nav: { id: Page; label: string; icon: string }[] = [
  { id: 'home', label: 'Dashboard', icon: '⌂' },
  { id: 'course', label: 'Percorso', icon: '◫' },
  { id: 'alphabet', label: 'Alfabeto', icon: 'ع' },
  { id: 'vocabulary', label: 'Vocabolario', icon: 'Aa' },
  { id: 'flashcards', label: 'Flashcard', icon: '◇' },
  { id: 'quiz', label: 'Quiz', icon: '?' },
  { id: 'pronunciation', label: 'Pronuncia', icon: '◖' },
  { id: 'grammar', label: 'Grammatica', icon: '§' },
]

function speakArabic(text: string, rate = 0.78) {
  if (!('speechSynthesis' in window)) return false
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ar-SA'
  utterance.rate = rate
  window.speechSynthesis.speak(utterance)
  return true
}

function App() {
  const [page, setPage] = useState<Page>('home')
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress())
  const [toast, setToast] = useState('')
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)

  useEffect(() => {
    saveProgress(progress)
    document.documentElement.dataset.theme = progress.theme
  }, [progress])

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2300)
  }

  const completeLesson = (lesson: Lesson) => {
    if (progress.completedLessons.includes(lesson.id)) {
      notify('Lezione già completata ✓')
      setActiveLesson(null)
      return
    }
    setProgress((p) => updateStudyStreak({
      ...p,
      xp: p.xp + lesson.xp,
      completedLessons: [...p.completedLessons, lesson.id],
    }))
    notify(`+${lesson.xp} XP — ottimo lavoro!`)
    setActiveLesson(null)
  }

  const markWord = (word: Word) => {
    setProgress((p) => {
      const known = p.learnedWords.includes(word.id)
      return updateStudyStreak({
        ...p,
        xp: known ? p.xp : p.xp + 3,
        learnedWords: known ? p.learnedWords.filter((id) => id !== word.id) : [...p.learnedWords, word.id],
      })
    })
  }

  const completedPct = Math.round((progress.completedLessons.length / lessons.length) * 100)

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setPage('home')} aria-label="Vai alla dashboard">
          <span className="brand-mark">ع</span>
          <span><strong>Arabica</strong><small>arabo dall'italiano</small></span>
        </button>
        <nav className="nav-list">
          {nav.map((item) => (
            <button key={item.id} className={page === item.id ? 'nav-item active' : 'nav-item'} onClick={() => { setPage(item.id); setActiveLesson(null) }}>
              <span className="nav-icon">{item.icon}</span><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-progress">
          <div className="row spread"><span>Corso</span><strong>{completedPct}%</strong></div>
          <div className="progress"><span style={{ width: `${completedPct}%` }} /></div>
          <small>{progress.completedLessons.length}/{lessons.length} lezioni completate</small>
        </div>
        <button className="profile-chip" onClick={() => setPage('settings')}>
          <span className="avatar">{progress.name.slice(0,1).toUpperCase()}</span>
          <span><strong>{progress.name}</strong><small>{progress.xp} XP · 🔥 {progress.streak}</small></span>
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="mobile-brand" onClick={() => setPage('home')}><span>ع</span> Arabica</button>
          <div className="top-stats">
            <span title="Serie di studio">🔥 {progress.streak}</span>
            <span title="Punti esperienza">✦ {progress.xp} XP</span>
            <button className="icon-button" onClick={() => setProgress((p) => ({...p, theme: p.theme === 'light' ? 'dark' : 'light'}))} title="Cambia tema">
              {progress.theme === 'light' ? '☾' : '☀'}
            </button>
          </div>
        </header>

        <section className="content">
          {activeLesson ? (
            <LessonView lesson={activeLesson} completed={progress.completedLessons.includes(activeLesson.id)} onBack={() => setActiveLesson(null)} onComplete={completeLesson} />
          ) : page === 'home' ? (
            <Dashboard progress={progress} setPage={setPage} startLesson={(l) => { setPage('course'); setActiveLesson(l) }} />
          ) : page === 'course' ? (
            <Course progress={progress} startLesson={setActiveLesson} />
          ) : page === 'alphabet' ? (
            <Alphabet />
          ) : page === 'vocabulary' ? (
            <Vocabulary learned={progress.learnedWords} markWord={markWord} />
          ) : page === 'flashcards' ? (
            <Flashcards learned={progress.learnedWords} markWord={markWord} />
          ) : page === 'quiz' ? (
            <Quiz progress={progress} setProgress={setProgress} notify={notify} />
          ) : page === 'pronunciation' ? (
            <Pronunciation />
          ) : page === 'grammar' ? (
            <Grammar />
          ) : (
            <Settings progress={progress} setProgress={setProgress} notify={notify} />
          )}
        </section>
      </main>

      <nav className="mobile-nav" aria-label="Navigazione mobile">
        {nav.slice(0, 5).map((item) => <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => {setPage(item.id);setActiveLesson(null)}}><span>{item.icon}</span><small>{item.label}</small></button>)}
      </nav>
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

function Dashboard({ progress, setPage, startLesson }: { progress: UserProgress; setPage: (p: Page) => void; startLesson: (l: Lesson) => void }) {
  const nextLesson = lessons.find((lesson) => !progress.completedLessons.includes(lesson.id)) || lessons[0]
  const learnedPct = Math.round((progress.learnedWords.length / vocabulary.length) * 100)
  return <>
    <div className="hero">
      <div>
        <span className="eyebrow">مَرْحَبًا · Bentornato</span>
        <h1>Ciao, {progress.name}.<br/>Continuiamo in arabo.</h1>
        <p>Piccoli passi ogni giorno: lettura, ascolto, vocabolario e conversazione.</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => startLesson(nextLesson)}>Continua · {nextLesson.title}</button>
          <button className="secondary" onClick={() => setPage('flashcards')}>Ripassa vocaboli</button>
        </div>
      </div>
      <div className="arabic-orb"><span>العَرَبِيَّة</span><small>al-ʿarabiyya</small></div>
    </div>

    <div className="stats-grid">
      <Stat label="XP totali" value={String(progress.xp)} hint="Continua a studiare" icon="✦" />
      <Stat label="Serie attuale" value={`${progress.streak} giorni`} hint="Studia ogni giorno" icon="🔥" />
      <Stat label="Parole imparate" value={`${progress.learnedWords.length}`} hint={`${learnedPct}% del dizionario`} icon="Aa" />
      <Stat label="Miglior quiz" value={`${progress.quizBest}%`} hint="Punta al 100%" icon="✓" />
    </div>

    <div className="dashboard-grid">
      <section className="panel">
        <div className="section-heading"><div><span className="eyebrow">Il tuo percorso</span><h2>Prossima lezione</h2></div><button className="text-button" onClick={() => setPage('course')}>Vedi tutto →</button></div>
        <div className="next-lesson">
          <div className="lesson-number">{nextLesson.unit}</div>
          <div className="grow"><strong>{nextLesson.title}</strong><p>{nextLesson.subtitle}</p><div className="meta">◷ {nextLesson.minutes} min · ✦ {nextLesson.xp} XP</div></div>
          <button className="round-button" onClick={() => startLesson(nextLesson)}>→</button>
        </div>
      </section>
      <section className="panel daily-card">
        <span className="eyebrow">Obiettivo quotidiano</span><h2>{progress.dailyGoal} minuti</h2><p>La costanza conta più delle sessioni lunghe.</p>
        <div className="mini-ring"><span>{Math.min(100, progress.streak ? 35 : 0)}%</span></div>
      </section>
    </div>

    <section className="panel shortcuts">
      <div className="section-heading"><div><span className="eyebrow">Allenamento rapido</span><h2>Scegli cosa praticare</h2></div></div>
      <div className="shortcut-grid">
        {[['alphabet','ع','Alfabeto','Lettere e forme'],['vocabulary','Aa','Vocabolario','Parole utili'],['quiz','?','Quiz','Mettiti alla prova'],['pronunciation','◖','Pronuncia','Ascolta e ripeti']].map(([id,icon,title,sub]) => <button key={id} className="shortcut" onClick={() => setPage(id as Page)}><span>{icon}</span><strong>{title}</strong><small>{sub}</small></button>)}
      </div>
    </section>
  </>
}

function Stat({ label, value, hint, icon }: {label:string;value:string;hint:string;icon:string}) {
  return <div className="stat-card"><span className="stat-icon">{icon}</span><div><small>{label}</small><strong>{value}</strong><p>{hint}</p></div></div>
}

function Course({ progress, startLesson }: { progress: UserProgress; startLesson: (l: Lesson) => void }) {
  const units = Array.from(new Set(lessons.map((l) => l.unit)))
  return <PageIntro eyebrow="Percorso guidato" title="Dallo zero alla conversazione" text="Completa le lezioni in ordine oppure apri un argomento specifico. I progressi vengono salvati sul dispositivo.">
    <div className="course-list">
      {units.map((unit) => {
        const unitLessons = lessons.filter((l) => l.unit === unit)
        return <section className="unit" key={unit}>
          <div className="unit-head"><span>UNITÀ {unit}</span><strong>{['Fondamenta','Prime conversazioni','Strutture essenziali','Verbi e domande','Arabo pratico','Consolidamento'][unit-1]}</strong></div>
          <div className="lesson-stack">
            {unitLessons.map((lesson, index) => {
              const done = progress.completedLessons.includes(lesson.id)
              const previousIndex = lessons.findIndex((l) => l.id === lesson.id) - 1
              const unlocked = previousIndex < 0 || progress.completedLessons.includes(lessons[previousIndex].id) || done
              return <button className={`lesson-row ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''}`} key={lesson.id} disabled={!unlocked} onClick={() => startLesson(lesson)}>
                <span className="lesson-dot">{done ? '✓' : unlocked ? index + 1 : '·'}</span>
                <span className="grow"><strong>{lesson.title}</strong><small>{lesson.subtitle}</small></span>
                <span className="meta">{lesson.minutes} min · {lesson.xp} XP</span>
                <span>→</span>
              </button>
            })}
          </div>
        </section>
      })}
    </div>
  </PageIntro>
}

function LessonView({ lesson, completed, onBack, onComplete }: {lesson:Lesson;completed:boolean;onBack:()=>void;onComplete:(l:Lesson)=>void}) {
  const [showPractice, setShowPractice] = useState(false)
  const [revealed, setRevealed] = useState<number[]>([])
  return <div className="lesson-view">
    <button className="back-button" onClick={onBack}>← Torna al percorso</button>
    <div className="lesson-hero"><span className="eyebrow">Unità {lesson.unit} · {lesson.minutes} minuti</span><h1>{lesson.title}</h1><p>{lesson.subtitle}</p></div>
    <div className="lesson-content">
      {lesson.content.map((block, i) => <article className="learning-block" key={i}><span className="block-index">{String(i+1).padStart(2,'0')}</span><div><h2>{block.heading}</h2><p>{block.body}</p>{block.arabic && <button className="arabic-example" onClick={() => speakArabic(block.arabic!)}><span dir="rtl">{block.arabic}</span><small>🔊 ascolta</small></button>}{block.tip && <div className="tip">💡 {block.tip}</div>}</div></article>)}
    </div>
    {!showPractice ? <button className="primary wide" onClick={() => setShowPractice(true)}>Vai agli esercizi →</button> : <section className="practice-box"><span className="eyebrow">Verifica</span><h2>Controlla ciò che ricordi</h2>{lesson.practice.map((item,i)=><div className="practice-item" key={i}><strong>{i+1}. {item.prompt}</strong>{revealed.includes(i) ? <p>{item.answer}</p> : <button className="secondary small" onClick={() => setRevealed((r)=>[...r,i])}>Mostra risposta</button>}</div>)}<button className="primary wide" disabled={revealed.length < lesson.practice.length} onClick={() => onComplete(lesson)}>{completed ? 'Chiudi lezione ✓' : `Completa · +${lesson.xp} XP`}</button></section>}
  </div>
}

function Alphabet() {
  const [selected, setSelected] = useState(alphabet[0])
  return <PageIntro eyebrow="28 lettere" title="Alfabeto arabo" text="Tocca una lettera per vedere nome, suono, forme e una parola d’esempio. Usa l’audio del browser per allenare l’orecchio.">
    <div className="alphabet-layout">
      <div className="letter-grid">{alphabet.map((item)=><button key={item.letter} className={selected.letter===item.letter?'letter-tile selected':'letter-tile'} onClick={()=>setSelected(item)}><span>{item.letter}</span><small>{item.name}</small></button>)}</div>
      <aside className="letter-detail">
        <div className="huge-letter">{selected.letter}</div><span className="eyebrow">{selected.name}</span><h2>{selected.transliteration}</h2><p>{selected.sound}</p>
        <button className="secondary wide" onClick={()=>speakArabic(selected.exampleArabic)}>🔊 Ascolta esempio</button>
        <div className="forms"><div><small>Isolata</small><strong>{selected.isolated}</strong></div><div><small>Iniziale</small><strong>{selected.initial}</strong></div><div><small>Mediana</small><strong>{selected.medial}</strong></div><div><small>Finale</small><strong>{selected.final}</strong></div></div>
        <div className="example-card"><span dir="rtl">{selected.exampleArabic}</span><strong>{selected.exampleItalian}</strong></div>
      </aside>
    </div>
  </PageIntro>
}

function Vocabulary({ learned, markWord }: { learned:string[]; markWord:(w:Word)=>void }) {
  const [category, setCategory] = useState('Tutte')
  const [query, setQuery] = useState('')
  const filtered = vocabulary.filter((word) => (category==='Tutte'||word.category===category) && `${word.arabic} ${word.italian} ${word.transliteration}`.toLowerCase().includes(query.toLowerCase()))
  return <PageIntro eyebrow={`${vocabulary.length} parole e frasi`} title="Vocabolario" text="Cerca, ascolta e contrassegna le parole che conosci. Ogni nuova parola segnata vale 3 XP.">
    <div className="toolbar"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cerca in italiano, arabo o traslitterazione…"/><select value={category} onChange={(e)=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></div>
    <div className="word-list">{filtered.map((word)=><div className="word-row" key={word.id}><button className="sound-button" onClick={()=>speakArabic(word.arabic)}>🔊</button><div className="arabic-word" dir="rtl">{word.arabic}</div><div className="word-meaning"><strong>{word.italian}</strong><small>{word.transliteration} · {word.category}</small></div><button className={learned.includes(word.id)?'known active':'known'} onClick={()=>markWord(word)}>{learned.includes(word.id)?'✓ Imparata':'+ Impara'}</button></div>)}</div>
    {!filtered.length && <div className="empty">Nessun risultato.</div>}
  </PageIntro>
}

function Flashcards({ learned, markWord }: {learned:string[];markWord:(w:Word)=>void}) {
  const [category, setCategory] = useState('Tutte')
  const deck = useMemo(()=>vocabulary.filter(w=>category==='Tutte'||w.category===category),[category])
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  useEffect(()=>{setIndex(0);setFlipped(false)},[category])
  const word = deck[index % Math.max(deck.length,1)]
  const next = () => { setFlipped(false); setIndex((i)=>(i+1)%deck.length) }
  return <PageIntro eyebrow="Ripetizione attiva" title="Flashcard" text="Prova a ricordare il significato prima di girare la carta. Segna ciò che ormai conosci.">
    <div className="flash-toolbar"><select value={category} onChange={(e)=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select><span>{index+1} / {deck.length}</span></div>
    {word && <><button className={`flashcard ${flipped?'flipped':''}`} onClick={()=>setFlipped(!flipped)}><div className="flash-front"><span className="eyebrow">ARABO</span><strong dir="rtl">{word.arabic}</strong><small>{word.transliteration}</small><em>Tocca per girare</em></div><div className="flash-back"><span className="eyebrow">ITALIANO</span><strong>{word.italian}</strong><small>{word.category}</small><em>Tocca per tornare</em></div></button><div className="flash-actions"><button className="secondary" onClick={()=>speakArabic(word.arabic)}>🔊 Ascolta</button><button className={learned.includes(word.id)?'secondary known-action':'secondary'} onClick={()=>markWord(word)}>{learned.includes(word.id)?'✓ Conosco':'Segna imparata'}</button><button className="primary" onClick={next}>Prossima →</button></div></>}
  </PageIntro>
}

function Quiz({ progress, setProgress, notify }: {progress:UserProgress;setProgress:React.Dispatch<React.SetStateAction<UserProgress>>;notify:(s:string)=>void}) {
  const makeQuestions = () => [...vocabulary].sort(()=>Math.random()-.5).slice(0,10).map((correct)=>({correct,options:[correct,...vocabulary.filter(w=>w.id!==correct.id).sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5)}))
  const [questions, setQuestions] = useState(makeQuestions)
  const [index,setIndex]=useState(0)
  const [score,setScore]=useState(0)
  const [picked,setPicked]=useState<string|null>(null)
  const [done,setDone]=useState(false)
  const q=questions[index]
  const choose=(id:string)=>{if(picked)return;setPicked(id);if(id===q.correct.id)setScore(s=>s+1)}
  const advance=()=>{if(index===questions.length-1){const finalScore=score+(picked===q.correct.id?0:0); const pct=Math.round((finalScore/questions.length)*100); setProgress(p=>updateStudyStreak({...p,xp:p.xp+finalScore*5,quizBest:Math.max(p.quizBest,pct)})); setDone(true);notify(`Quiz completato · +${finalScore*5} XP`)} else {setIndex(i=>i+1);setPicked(null)}}
  const restart=()=>{setQuestions(makeQuestions());setIndex(0);setScore(0);setPicked(null);setDone(false)}
  if(done){const pct=Math.round((score/questions.length)*100);return <PageIntro eyebrow="Risultato" title={`${pct}% corretto`} text={`Hai ottenuto ${score} risposte corrette su ${questions.length}. Miglior risultato: ${Math.max(progress.quizBest,pct)}%.`}><div className="result-card"><div className="result-ring"><strong>{pct}%</strong><small>{score}/{questions.length}</small></div><button className="primary" onClick={restart}>Nuovo quiz</button></div></PageIntro>}
  return <PageIntro eyebrow={`Domanda ${index+1} di ${questions.length}`} title="Quiz vocabolario" text="Scegli la traduzione italiana corretta."><div className="quiz-card"><button className="quiz-arabic" onClick={()=>speakArabic(q.correct.arabic)}><strong dir="rtl">{q.correct.arabic}</strong><small>🔊 {q.correct.transliteration}</small></button><div className="options">{q.options.map((option)=>{const cls=picked?option.id===q.correct.id?'option correct':option.id===picked?'option wrong':'option muted':'option';return <button className={cls} key={option.id} onClick={()=>choose(option.id)}>{option.italian}</button>})}</div>{picked&&<button className="primary wide" onClick={advance}>{index===questions.length-1?'Vedi risultato':'Continua →'}</button>}</div></PageIntro>
}

function Pronunciation() {
  const phrases = vocabulary.filter(w=>['Saluti','Viaggio','Base'].includes(w.category)).slice(0,18)
  const [selected,setSelected]=useState(phrases[0])
  const [rate,setRate]=useState(.75)
  return <PageIntro eyebrow="Ascolto e shadowing" title="Allenatore di pronuncia" text="Ascolta una frase, poi ripetila cercando di imitare ritmo e suoni. La voce disponibile dipende dal browser e dal sistema operativo.">
    <div className="pronunciation-grid"><section className="pronounce-main"><span className="eyebrow">Frase selezionata</span><div className="pronounce-arabic" dir="rtl">{selected.arabic}</div><h2>{selected.italian}</h2><p>{selected.transliteration}</p><label className="rate-control">Velocità <input type="range" min="0.5" max="1" step="0.05" value={rate} onChange={(e)=>setRate(Number(e.target.value))}/><strong>{Math.round(rate*100)}%</strong></label><button className="primary wide big" onClick={()=>speakArabic(selected.arabic,rate)}>🔊 Ascolta e ripeti</button><div className="shadow-tip"><strong>Tecnica shadowing</strong><p>1. Ascolta senza parlare. 2. Riascolta e ripeti subito. 3. Ripeti 5 volte. 4. Prova senza guardare il testo.</p></div></section><aside className="phrase-list">{phrases.map(p=><button key={p.id} className={selected.id===p.id?'active':''} onClick={()=>setSelected(p)}><span dir="rtl">{p.arabic}</span><small>{p.italian}</small></button>)}</aside></div>
  </PageIntro>
}

function Grammar() {
  const topics = [
    ['Frase nominale','Al presente, una frase come “io sono italiano” può non usare un verbo equivalente a “essere”.','أَنَا إِيطَالِيّ','Io sono italiano.'],
    ['Articolo determinativo ال','الـ corrisponde in molti casi all’articolo determinativo italiano. Si attacca alla parola.','الْكِتَاب','il libro'],
    ['Genere','Molti nomi femminili terminano in ة (tāʾ marbūṭa), anche se esistono eccezioni.','جَمِيل / جَمِيلَة','bello / bella'],
    ['Aggettivi','L’aggettivo segue normalmente il nome e concorda con esso in caratteristiche grammaticali importanti.','بَيْتٌ جَمِيلٌ','una casa bella'],
    ['Pronomi','أنا io · أنتَ tu m. · أنتِ tu f. · هو lui · هي lei · نحن noi','أَنَا / أَنْتَ / هُوَ','io / tu / lui'],
    ['Possesso semplice','Una desinenza può indicare il possessore: كتابي = il mio libro, كتابك = il tuo libro.','كِتَابِي','il mio libro'],
    ['Domande','Le parole interrogative più utili sono أين dove, من chi, ماذا cosa, كيف come e كم quanto.','أَيْنَ الْمَطْعَم؟','Dov’è il ristorante?'],
    ['Negazione','Per molte frasi al presente puoi incontrare لا davanti al verbo.','لَا أَفْهَم','Non capisco.'],
    ['Radici','Moltissime parole arabe appartengono a famiglie costruite attorno a radici consonantiche. ك-ت-ب è legata alla scrittura.','كِتَاب • كَتَبَ • مَكْتَب','libro • scrisse • ufficio/scrivania']
  ]
  return <PageIntro eyebrow="Riferimento rapido" title="Grammatica essenziale" text="Una sintesi pratica per capire le strutture che incontri nel corso. Non serve memorizzare tutto in una volta."><div className="grammar-grid">{topics.map(([title,body,arabic,meaning],i)=><article className="grammar-card" key={title}><span className="grammar-num">{String(i+1).padStart(2,'0')}</span><h2>{title}</h2><p>{body}</p><button onClick={()=>speakArabic(arabic)} className="grammar-example"><strong dir="rtl">{arabic}</strong><small>{meaning} · 🔊</small></button></article>)}</div></PageIntro>
}

function Settings({ progress, setProgress, notify }: {progress:UserProgress;setProgress:React.Dispatch<React.SetStateAction<UserProgress>>;notify:(s:string)=>void}) {
  const [name,setName]=useState(progress.name)
  const [goal,setGoal]=useState(progress.dailyGoal)
  const save=()=>{setProgress(p=>({...p,name:name.trim()||'Studente',dailyGoal:goal}));notify('Impostazioni salvate')}
  const reset=()=>{if(window.confirm('Vuoi davvero cancellare tutti i progressi?')){localStorage.clear();window.location.reload()}}
  return <PageIntro eyebrow="Profilo locale" title="Impostazioni" text="I dati vengono salvati soltanto nel browser. In una futura versione puoi collegare Supabase/Firebase per sincronizzarli."><div className="settings-card"><label>Nome visualizzato<input value={name} onChange={(e)=>setName(e.target.value)} maxLength={24}/></label><label>Obiettivo giornaliero<select value={goal} onChange={(e)=>setGoal(Number(e.target.value))}><option value={10}>10 minuti</option><option value={20}>20 minuti</option><option value={30}>30 minuti</option><option value={45}>45 minuti</option><option value={60}>60 minuti</option></select></label><label>Tema<select value={progress.theme} onChange={(e)=>setProgress(p=>({...p,theme:e.target.value as 'light'|'dark'}))}><option value="light">Chiaro</option><option value="dark">Scuro</option></select></label><button className="primary" onClick={save}>Salva impostazioni</button><hr/><div><strong>Dati e progressi</strong><p>{progress.completedLessons.length} lezioni · {progress.learnedWords.length} parole · {progress.xp} XP</p><button className="danger" onClick={reset}>Azzera tutti i progressi</button></div></div></PageIntro>
}

function PageIntro({ eyebrow, title, text, children }: {eyebrow:string;title:string;text:string;children:React.ReactNode}) {
  return <><div className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{children}</>
}

export default App
