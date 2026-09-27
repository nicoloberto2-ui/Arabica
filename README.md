# Arabica — Impara l'arabo dall'italiano

Arabica è una web app open source, responsive e installabile, pensata per chi parla italiano e vuole iniziare a studiare l'arabo standard moderno (MSA).

## Funzioni incluse

- percorso didattico con 12 lezioni e progressione a unità;
- alfabeto arabo completo con forme iniziali, mediane e finali;
- vocabolario ricercabile con oltre 60 parole e frasi;
- flashcard interattive;
- quiz a risposta multipla con punteggio e record personale;
- pronuncia tramite Web Speech API del browser;
- schede di grammatica essenziale;
- XP, streak, lezioni completate e parole imparate;
- salvataggio locale con `localStorage`;
- tema chiaro/scuro;
- layout responsive per desktop e smartphone;
- manifest PWA e service worker leggero;
- workflow GitHub Actions già incluso per GitHub Pages.

## Stack

- React 19
- TypeScript
- Vite 8
- CSS puro, senza framework UI
- nessun backend obbligatorio

## Avvio locale

Richiede Node.js 22 o compatibile.

```bash
npm install
npm run dev
```

Apri l'indirizzo mostrato da Vite nel terminale.

## Build di produzione

```bash
npm run build
npm run preview
```

## Pubblicazione su GitHub Pages

1. Crea un repository GitHub, ad esempio `arabica`.
2. Carica tutti i file di questo progetto.
3. Assicurati che il branch principale si chiami `main`.
4. In GitHub vai su **Settings → Pages**.
5. In **Build and deployment → Source**, scegli **GitHub Actions**.
6. Fai push su `main`: il workflow `.github/workflows/deploy.yml` creerà e pubblicherà la build.

Il progetto usa asset relativi (`base: './'`) e non richiede di inserire a mano il nome del repository in `vite.config.ts`.

## Struttura principale

```text
src/
  data/
    alphabet.ts      # 28 lettere arabe
    lessons.ts       # percorso guidato
    vocabulary.ts    # parole e frasi
  lib/
    progress.ts      # localStorage, XP e streak
  App.tsx            # schermate e logica dell'app
  styles.css         # design system responsive
public/
  manifest.webmanifest
  logo.svg
  sw.js
.github/workflows/
  deploy.yml
```

## Roadmap consigliata

Per trasformare l'MVP in un prodotto più avanzato:

- registrazione e sincronizzazione cloud con Supabase o Firebase;
- audio registrato da madrelingua invece della sola sintesi vocale;
- riconoscimento vocale e valutazione della pronuncia;
- dialetti separati: egiziano, levantino, Golfo, maghrebino;
- algoritmo di spaced repetition (SM-2/FSRS);
- pannello CMS per aggiungere lezioni senza modificare il codice;
- certificati, obiettivi settimanali e classifiche opzionali;
- test automatici e controlli editoriali sui contenuti linguistici.

## Nota linguistica

I contenuti inclusi sono una base didattica. Prima di usare il progetto come corso commerciale o scolastico, è consigliata una revisione completa da parte di un insegnante o linguista madrelingua, soprattutto per vocalizzazione, registro, esempi e varianti regionali.

## Licenza

MIT. Vedi `LICENSE`.
