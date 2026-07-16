import type { BusinessStat, ClientLogo, FaqItem, WorkshopTopic } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// TREŚCI OFERTOWE — WERSJA DEMONSTRACYJNA
// Tu edytujesz opisy usług, obszary wsparcia, tematy warsztatów i statystyki.
// ─────────────────────────────────────────────────────────────────────────────

// ── Trzy ścieżki na stronie głównej ─────────────────────────────────────────

export const pathCards = [
  {
    area: 'psychologia' as const,
    title: 'Potrzebuję wsparcia psychologicznego',
    description: 'Stres, przeciążenie, kryzys, trudne emocje, relacje i wypalenie.',
    cta: 'Zobacz konsultacje',
    path: '/oferta/konsultacje-psychologiczne',
  },
  {
    area: 'coaching' as const,
    title: 'Chcę osiągnąć konkretny cel',
    description: 'Zmiana zawodowa, pewność siebie, motywacja, organizacja i rozwój.',
    cta: 'Zobacz coaching',
    path: '/oferta/coaching',
  },
  {
    area: 'firmy' as const,
    title: 'Szukam wsparcia dla firmy',
    description: 'Warsztaty, wellbeing, rozwój liderów, komunikacja i wystąpienia.',
    cta: 'Zobacz ofertę dla firm',
    path: '/dla-firm',
  },
]

// ── Konsultacje psychologiczne ──────────────────────────────────────────────

export const consultations = {
  title: 'Konsultacje psychologiczne',
  lead: 'Przestrzeń na spokojną, poufną rozmowę o tym, co jest dla Ciebie trudne — i wspólne szukanie sposobów, żeby lepiej sobie z tym radzić.',
  what: [
    'Konsultacja psychologiczna to spotkanie, podczas którego wspólnie przyglądamy się temu, z czym przychodzisz: sytuacji, emocjom, myślom i temu, jak wpływają na Twoje codzienne życie. To rozmowa prowadzona w oparciu o wiedzę psychologiczną — uporządkowana, ale bez sztywnego scenariusza.',
    'Konsultacje pomagają zrozumieć, co się z Tobą dzieje, odzyskać poczucie wpływu i wypracować konkretne sposoby radzenia sobie. Czasem wystarczy jedno lub kilka spotkań, żeby uporządkować sytuację. Innym razem stają się początkiem dłuższej, regularnej pracy.',
  ],
  forWhom: [
    'doświadczasz przedłużającego się stresu lub przeciążenia',
    'przechodzisz przez trudny moment: zmianę, stratę, konflikt',
    'czujesz, że emocje częściej kierują Tobą niż Ty nimi',
    'masz poczucie wypalenia i utraty sensu w pracy',
    'chcesz zadbać o siebie, zanim trudności się nasilą',
  ],
  areas: [
    'stres',
    'przeciążenie',
    'kryzys życiowy',
    'wypalenie',
    'pewność siebie',
    'trudności w podejmowaniu decyzji',
    'emocje',
    'relacje',
    'adaptacja do zmiany',
  ],
  firstMeeting: [
    'Pierwsze spotkanie to przede wszystkim rozmowa o tym, z czym przychodzisz i czego potrzebujesz. Opowiadasz tyle, ile chcesz i w swoim tempie — nie musisz się do niczego przygotowywać.',
    'Pod koniec spotkania wspólnie ustalamy, czy i jak chcesz kontynuować: umawiamy kolejne konsultacje, planujemy pracę coachingową albo — jeśli tak będzie dla Ciebie lepiej — pomagam Ci znaleźć innego specjalistę.',
  ],
  confidentiality:
    'Wszystko, o czym rozmawiamy, jest objęte poufnością. Nie udostępniam nikomu informacji o tym, że korzystasz z konsultacji, ani treści naszych rozmów. Wyjątki od tej zasady określa prawo i dotyczą wyłącznie sytuacji bezpośredniego zagrożenia życia lub zdrowia.',
  notReplacing: [
    'Konsultacje psychologiczne nie są psychoterapią ani leczeniem — nie zastępują pracy z psychoterapeutą, lekarzem psychiatrą ani pomocy medycznej.',
    'Jeśli w trakcie naszej pracy uznam, że lepszą formą wsparcia będzie psychoterapia lub konsultacja lekarska, powiem Ci o tym otwarcie i pomogę znaleźć odpowiedniego specjalistę.',
    'W sytuacji nagłego kryzysu i zagrożenia życia skontaktuj się z numerem alarmowym 112 lub całodobowym Centrum Wsparcia: 800 70 2222.',
  ],
  faq: [
    {
      question: 'Czy konsultacja to już psychoterapia?',
      answer:
        'Nie. Konsultacja psychologiczna to forma wsparcia oparta na rozmowie i narzędziach psychologicznych, ale nie jest psychoterapią. Jeśli okaże się, że psychoterapia byłaby dla Ciebie lepszą formą pomocy, otwarcie o tym porozmawiamy i podpowiem, gdzie jej szukać.',
    },
    {
      question: 'Nie wiem, czy mój problem jest „wystarczająco poważny". Czy mogę przyjść?',
      answer:
        'Tak. Nie ma problemów zbyt małych na konsultację. Wiele osób zgłasza się właśnie po to, żeby zadbać o siebie, zanim trudności urosną — to bardzo dobry moment na rozmowę.',
    },
    {
      question: 'Jak często odbywają się spotkania?',
      answer:
        'To zależy od Twoich potrzeb. Najczęściej spotykamy się co tydzień lub co dwa tygodnie. Rytm ustalamy wspólnie i możemy go zmieniać w trakcie współpracy.',
    },
    {
      question: 'Czy mogę przyjść tylko raz?',
      answer:
        'Oczywiście. Pojedyncza konsultacja bywa wystarczająca, żeby uporządkować sytuację i zaplanować dalsze kroki. Nie zobowiązuje Cię do dłuższej współpracy.',
    },
  ] satisfies FaqItem[],
}

// ── Coaching ────────────────────────────────────────────────────────────────

export const coaching = {
  title: 'Coaching indywidualny i zawodowy',
  lead: 'Ustrukturyzowana praca nad celem, który jest dla Ciebie ważny — od pierwszej rozmowy po konkretny plan i jego wdrożenie.',
  what: [
    'Coaching to proces, w którym pracujemy nad jasno określonym celem: zawodowym albo osobistym. Moją rolą jest zadawać dobre pytania, porządkować wnioski i pilnować kierunku — Ty pozostajesz autorem lub autorką decyzji.',
    'Sesje mają strukturę: ustalamy cel procesu, mierniki postępu i plan działania między spotkaniami. Korzystam ze sprawdzonych modeli pracy coachingowej oraz — tam, gdzie to pomaga — z wiedzy psychologicznej o motywacji, nawykach i emocjach.',
  ],
  types: [
    {
      title: 'Coaching życiowy',
      description: 'Równowaga, nawyki, decyzje i zmiany, które odkładasz „na później". Praca nad tym, jak chcesz żyć — nie tylko pracować.',
    },
    {
      title: 'Coaching kariery',
      description: 'Zmiana ścieżki zawodowej, powrót po przerwie, przygotowanie do rekrutacji albo świadoma decyzja: zostaję czy odchodzę.',
    },
    {
      title: 'Coaching managerski',
      description: 'Wejście w rolę lidera, budowanie autorytetu bez autorytaryzmu, trudne rozmowy z zespołem i decyzje pod presją.',
    },
  ],
  goals: [
    'budowanie pewności siebie',
    'planowanie zmiany zawodowej',
    'rozwój kompetencji',
    'praca nad nawykami',
    'organizacja działania',
    'przygotowanie do awansu lub nowej roli',
  ],
  vsPsychology: {
    title: 'Coaching czy pomoc psychologiczna?',
    intro:
      'To częsta wątpliwość — i dobra wiadomość jest taka, że nie musisz rozstrzygać jej samodzielnie. W skrócie:',
    coaching:
      'Coaching wybierz, gdy masz cel i potrzebujesz struktury, motywacji oraz planu: zmiana pracy, rozwój w roli, nawyki, organizacja działania. Coaching zakłada, że Twoje zasoby są dostępne — pomaga je uruchomić.',
    psychology:
      'Konsultacje psychologiczne wybierz, gdy najpierw potrzebujesz zrozumieć i ustabilizować to, co się dzieje: przeciążenie, silny stres, kryzys, trudne emocje. Dopiero na spokojnym gruncie praca nad celami ma sens.',
    outro:
      'Jeśli nie masz pewności, umów konsultację albo bezpłatną rozmowę organizacyjną — wspólnie ustalimy, która forma będzie dla Ciebie odpowiednia. Zdarza się też, że zaczynamy od konsultacji, a po kilku spotkaniach płynnie przechodzimy do coachingu.',
  },
  process: [
    'Sesja zerowa: poznajemy się, ustalamy cel procesu i zasady współpracy.',
    'Sesje robocze co 2–3 tygodnie: praca nad celem, zadania wdrożeniowe między spotkaniami.',
    'Podsumowanie w połowie procesu: sprawdzamy postęp i korygujemy kierunek.',
    'Zamknięcie: utrwalamy zmiany i planujesz dalszy rozwój — już samodzielnie.',
  ],
}

// ── Warsztaty i wystąpienia ─────────────────────────────────────────────────

export const workshops = {
  title: 'Warsztaty, szkolenia i wystąpienia',
  lead: 'Praktyczne programy rozwojowe dla zespołów i liderów — od dwugodzinnych webinarów po cykliczne programy wellbeingowe.',
  intro: [
    'Prowadzę warsztaty i wystąpienia oparte na wiedzy psychologicznej, ale mówione językiem biznesu. Bez motywacyjnych frazesów i „jedynie słusznych metod" — za to z narzędziami, które zespół może stosować od następnego dnia.',
    'Każdy program poprzedzam krótkim badaniem potrzeb, a treści i przykłady dopasowuję do specyfiki organizacji. Pracuję warsztatowo: mniej slajdów, więcej rozmowy, ćwiczeń i realnych sytuacji uczestników.',
  ],
  formats: [
    { title: 'Warsztaty stacjonarne', description: 'Grupy do 16 osób, 4–8 godzin. Najgłębsza forma pracy — ćwiczenia, studia przypadków, plan wdrożenia.' },
    { title: 'Webinary i szkolenia online', description: 'Interaktywne sesje 90–180 minut dla zespołów rozproszonych, z materiałami do pracy własnej.' },
    { title: 'Wystąpienia i prelekcje', description: '30–60 minut na konferencji firmowej lub evencie — merytorycznie, energetycznie, bez banałów.' },
    { title: 'Programy rozwojowe', description: 'Cykle 3–6 spotkań łączące warsztaty, pracę własną i sesje follow-up dla trwałej zmiany.' },
  ],
}

export const workshopTopics: WorkshopTopic[] = [
  {
    title: 'Zanim się wypalisz — profilaktyka wypalenia w zespole',
    description: 'Jak rozpoznawać wczesne sygnały wypalenia u siebie i współpracowników oraz co realnie działa w profilaktyce — na poziomie osoby, zespołu i organizacji.',
    format: 'warsztat 6 h lub webinar 2 h',
  },
  {
    title: 'Stres pod kontrolą — praktyczny trening regulacji',
    description: 'Fizjologia stresu w pigułce i zestaw technik szybkiej regulacji: oddech, mikroprzerwy, praca z myślami. Trening, nie wykład.',
    format: 'warsztat 4 h',
  },
  {
    title: 'Odporność psychiczna w praktyce',
    description: 'Model 4C (kontrola, zaangażowanie, wyzwanie, pewność siebie) przełożony na codzienne sytuacje zawodowe i plan treningowy dla każdego uczestnika.',
    format: 'program 2 × 4 h',
  },
  {
    title: 'Komunikacja, która nie eskaluje',
    description: 'Feedback, granice i trudne rozmowy w zespole — bez agresji i bez wycofania. Dużo ćwiczeń na realnych sytuacjach uczestników.',
    format: 'warsztat 6 h',
  },
  {
    title: 'Lider, który nie gasi — psychologia dla managerów',
    description: 'Jak zauważać przeciążenie w zespole, prowadzić rozmowy o kondycji psychicznej i budować bezpieczeństwo psychologiczne bez wchodzenia w rolę terapeuty.',
    format: 'program 3 × 3 h',
  },
  {
    title: 'Zmiana bez paniki — zespół w transformacji',
    description: 'Psychologiczne mechanizmy reakcji na zmianę (reorganizacja, fuzja, nowe technologie) i praktyki, które pomagają zespołom przejść przez nią bez utraty zaufania.',
    format: 'warsztat 4 h lub wystąpienie 45 min',
  },
]

export const businessProcess = [
  { title: 'Rozmowa o potrzebach', description: 'Bezpłatna, 15-minutowa rozmowa: cel, grupa, kontekst. Bez zobowiązań.' },
  { title: 'Propozycja programu', description: 'W ciągu 3 dni roboczych otrzymujesz konspekt, wycenę i proponowane terminy.' },
  { title: 'Badanie potrzeb', description: 'Krótka ankieta lub rozmowy z uczestnikami, żeby program trafiał w realne sytuacje.' },
  { title: 'Realizacja', description: 'Warsztat, wystąpienie lub cykl — stacjonarnie u Was, w wynajętej sali albo online.' },
  { title: 'Podsumowanie i follow-up', description: 'Raport z rekomendacjami oraz opcjonalna sesja utrwalająca po 4–6 tygodniach.' },
]

/** Statystyki demonstracyjne — oznaczone w interfejsie jako fikcyjne. */
export const businessStats: BusinessStat[] = [
  { value: '60+', label: 'zrealizowanych warsztatów i programów' },
  { value: '1800+', label: 'przeszkolonych uczestników i uczestniczek' },
  { value: '4,8 / 5', label: 'średnia ocena w ankietach po szkoleniach' },
  { value: '87%', label: 'firm wraca z kolejnym tematem' },
]

/** Fikcyjne logotypy klientów — neutralne znaki tekstowe, nie realne marki. */
export const clientLogos: ClientLogo[] = [
  { name: 'Northlake Software', descriptor: 'IT · 400 os.' },
  { name: 'Grupa Helion Energia', descriptor: 'energetyka' },
  { name: 'Bank Meridian', descriptor: 'finanse' },
  { name: 'Studio Lumen', descriptor: 'agencja kreatywna' },
]
