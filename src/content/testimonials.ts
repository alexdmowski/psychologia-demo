import type { Testimonial } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// OPINIE — WSZYSTKIE DEMONSTRACYJNE I FIKCYJNE
// Każda opinia jest oznaczana w interfejsie etykietą „opinia demonstracyjna".
// Tu podmieniasz treści na prawdziwe rekomendacje (za zgodą autorów).
// ─────────────────────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    quote:
      'Przyszłam z tematem „chcę zmienić pracę", a wyszłam z czymś znacznie ważniejszym: zrozumieniem, czego naprawdę szukam. Po pięciu sesjach miałam plan, a trzy miesiące później — nową rolę, w której czuję się na miejscu.',
    author: 'Marta, 34',
    context: 'coaching kariery',
    area: 'coaching',
  },
  {
    quote:
      'Konkret, struktura i zero coachingowego żargonu. Pani Aleksandra zadaje pytania, po których naprawdę trzeba się zatrzymać. Awans, do którego się przygotowywałem, przyszedł szybciej, niż zakładał mój plan.',
    author: 'Paweł, 41',
    context: 'coaching managerski',
    area: 'coaching',
  },
  {
    quote:
      'Najbardziej cenię to, że każdą sesję kończyłam z konkretem: co robię, kiedy i po czym poznam, że działa. Praca nad pewnością siebie brzmiała mgliście — okazała się najbardziej praktycznym procesem, w jakim brałam udział.',
    author: 'Karolina, 29',
    context: 'coaching — pewność siebie',
    area: 'coaching',
  },
  {
    quote:
      'Warsztat o wypaleniu był pierwszym szkoleniem, na którym nikt nie patrzył w telefon. Rozmowa o realnych sytuacjach z naszego zespołu, bez ocen i bez frazesów. Zespół do dziś używa „mikroprzerw", które ćwiczyliśmy.',
    author: 'Joanna',
    context: 'HR Business Partner, uczestniczka warsztatu',
    area: 'firmy',
  },
  {
    quote:
      'Rzadko zdarza się prowadząca, która łączy wiedzę psychologiczną z rozumieniem realiów biznesu. Nasi liderzy dostali narzędzia, a nie slajdy. Ankiety po szkoleniu: najwyższe oceny w historii naszych programów.',
    author: 'Tomasz',
    context: 'dyrektor operacyjny, uczestnik programu dla liderów',
    area: 'firmy',
  },
  {
    quote:
      'Współpracujemy z Aleksandrą Nowicką od dwóch lat przy programie wellbeingowym dla 400 pracowników. Profesjonalizm na każdym etapie: od badania potrzeb po raporty. Rekomendujemy ją jako partnerkę, nie „dostawcę szkoleń".',
    author: 'Northlake Software',
    context: 'rekomendacja firmy (demonstracyjna)',
    area: 'firmy',
    company: true,
  },
]
