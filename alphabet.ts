export type ArabicLetter = {
  letter: string
  name: string
  transliteration: string
  sound: string
  isolated: string
  initial: string
  medial: string
  final: string
  exampleArabic: string
  exampleItalian: string
}

export const alphabet: ArabicLetter[] = [
  { letter:'ا', name:'Alif', transliteration:'ā / a', sound:'a lunga; supporto per hamza', isolated:'ا', initial:'ا', medial:'ـا', final:'ـا', exampleArabic:'أَب', exampleItalian:'padre' },
  { letter:'ب', name:'Bāʾ', transliteration:'b', sound:'b come in bene', isolated:'ب', initial:'بـ', medial:'ـبـ', final:'ـب', exampleArabic:'بَيْت', exampleItalian:'casa' },
  { letter:'ت', name:'Tāʾ', transliteration:'t', sound:'t come in tavolo', isolated:'ت', initial:'تـ', medial:'ـتـ', final:'ـت', exampleArabic:'تُفَّاح', exampleItalian:'mela' },
  { letter:'ث', name:'Thāʾ', transliteration:'th', sound:'th inglese di think', isolated:'ث', initial:'ثـ', medial:'ـثـ', final:'ـث', exampleArabic:'ثَلَاثَة', exampleItalian:'tre' },
  { letter:'ج', name:'Jīm', transliteration:'j', sound:'g dolce / j, varia per dialetto', isolated:'ج', initial:'جـ', medial:'ـجـ', final:'ـج', exampleArabic:'جَمِيل', exampleItalian:'bello' },
  { letter:'ح', name:'Ḥāʾ', transliteration:'ḥ', sound:'h profonda e aspirata', isolated:'ح', initial:'حـ', medial:'ـحـ', final:'ـح', exampleArabic:'حُبّ', exampleItalian:'amore' },
  { letter:'خ', name:'Khāʾ', transliteration:'kh', sound:'fricativa gutturale, come ch tedesca', isolated:'خ', initial:'خـ', medial:'ـخـ', final:'ـخ', exampleArabic:'خُبْز', exampleItalian:'pane' },
  { letter:'د', name:'Dāl', transliteration:'d', sound:'d come in dado', isolated:'د', initial:'د', medial:'ـد', final:'ـد', exampleArabic:'دَرْس', exampleItalian:'lezione' },
  { letter:'ذ', name:'Dhāl', transliteration:'dh', sound:'th inglese di this', isolated:'ذ', initial:'ذ', medial:'ـذ', final:'ـذ', exampleArabic:'ذَهَب', exampleItalian:'oro' },
  { letter:'ر', name:'Rāʾ', transliteration:'r', sound:'r vibrante', isolated:'ر', initial:'ر', medial:'ـر', final:'ـر', exampleArabic:'رَجُل', exampleItalian:'uomo' },
  { letter:'ز', name:'Zāy', transliteration:'z', sound:'z sonora', isolated:'ز', initial:'ز', medial:'ـز', final:'ـز', exampleArabic:'زَهْرَة', exampleItalian:'fiore' },
  { letter:'س', name:'Sīn', transliteration:'s', sound:'s sorda', isolated:'س', initial:'سـ', medial:'ـسـ', final:'ـس', exampleArabic:'سَلَام', exampleItalian:'pace / saluto' },
  { letter:'ش', name:'Shīn', transliteration:'sh', sound:'sc di scena', isolated:'ش', initial:'شـ', medial:'ـشـ', final:'ـش', exampleArabic:'شَمْس', exampleItalian:'sole' },
  { letter:'ص', name:'Ṣād', transliteration:'ṣ', sound:'s enfatica', isolated:'ص', initial:'صـ', medial:'ـصـ', final:'ـص', exampleArabic:'صَبَاح', exampleItalian:'mattina' },
  { letter:'ض', name:'Ḍād', transliteration:'ḍ', sound:'d enfatica', isolated:'ض', initial:'ضـ', medial:'ـضـ', final:'ـض', exampleArabic:'ضَيْف', exampleItalian:'ospite' },
  { letter:'ط', name:'Ṭāʾ', transliteration:'ṭ', sound:'t enfatica', isolated:'ط', initial:'طـ', medial:'ـطـ', final:'ـط', exampleArabic:'طَعَام', exampleItalian:'cibo' },
  { letter:'ظ', name:'Ẓāʾ', transliteration:'ẓ', sound:'dh/z enfatica', isolated:'ظ', initial:'ظـ', medial:'ـظـ', final:'ـظ', exampleArabic:'ظَهْر', exampleItalian:'mezzogiorno / schiena' },
  { letter:'ع', name:'ʿAyn', transliteration:'ʿ', sound:'consonante faringale, senza equivalente italiano', isolated:'ع', initial:'عـ', medial:'ـعـ', final:'ـع', exampleArabic:'عَرَبِيّ', exampleItalian:'arabo' },
  { letter:'غ', name:'Ghayn', transliteration:'gh', sound:'r francese gutturale', isolated:'غ', initial:'غـ', medial:'ـغـ', final:'ـغ', exampleArabic:'غُرْفَة', exampleItalian:'stanza' },
  { letter:'ف', name:'Fāʾ', transliteration:'f', sound:'f come in fare', isolated:'ف', initial:'فـ', medial:'ـفـ', final:'ـف', exampleArabic:'فَم', exampleItalian:'bocca' },
  { letter:'ق', name:'Qāf', transliteration:'q', sound:'k molto posteriore; varia nei dialetti', isolated:'ق', initial:'قـ', medial:'ـقـ', final:'ـق', exampleArabic:'قَلْب', exampleItalian:'cuore' },
  { letter:'ك', name:'Kāf', transliteration:'k', sound:'k come in kilo', isolated:'ك', initial:'كـ', medial:'ـكـ', final:'ـك', exampleArabic:'كِتَاب', exampleItalian:'libro' },
  { letter:'ل', name:'Lām', transliteration:'l', sound:'l come in luna', isolated:'ل', initial:'لـ', medial:'ـلـ', final:'ـل', exampleArabic:'لَيْل', exampleItalian:'notte' },
  { letter:'م', name:'Mīm', transliteration:'m', sound:'m come in mare', isolated:'م', initial:'مـ', medial:'ـمـ', final:'ـم', exampleArabic:'مَاء', exampleItalian:'acqua' },
  { letter:'ن', name:'Nūn', transliteration:'n', sound:'n come in nave', isolated:'ن', initial:'نـ', medial:'ـنـ', final:'ـن', exampleArabic:'نُور', exampleItalian:'luce' },
  { letter:'ه', name:'Hāʾ', transliteration:'h', sound:'h leggera aspirata', isolated:'ه', initial:'هـ', medial:'ـهـ', final:'ـه', exampleArabic:'هَوَاء', exampleItalian:'aria' },
  { letter:'و', name:'Wāw', transliteration:'w / ū', sound:'w consonante o vocale u lunga', isolated:'و', initial:'و', medial:'ـو', final:'ـو', exampleArabic:'وَرْد', exampleItalian:'rose' },
  { letter:'ي', name:'Yāʾ', transliteration:'y / ī', sound:'y consonante o i lunga', isolated:'ي', initial:'يـ', medial:'ـيـ', final:'ـي', exampleArabic:'يَوْم', exampleItalian:'giorno' }
]
