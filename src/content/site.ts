import type { Credential, NavItem, ProcessStep, SocialLink, ValueItem } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// DANE SPECJALISTKI — WERSJA DEMONSTRACYJNA
// Tu podmieniasz: imię i nazwisko, tytuł, miasto, telefon, e-mail, social media.
// Zdjęcia podmieniasz w katalogu public/images/ (patrz README.md).
// ─────────────────────────────────────────────────────────────────────────────

export const specialist = {
  name: 'Aleksandra Nowicka',
  degree: 'mgr',
  fullTitle: 'mgr Aleksandra Nowicka',
  role: 'psycholożka · certyfikowana coachka · trenerka rozwoju',
  brand: 'Aleksandra Nowicka — Psychologia i Rozwój',
  brandShort: 'Aleksandra Nowicka',
  city: 'Warszawa',
  workMode: 'Warszawa i online',
  email: 'kontakt@aleksandranowicka.pl',
  phone: '+48 500 600 700',
  phoneHref: 'tel:+48500600700',
  address: {
    street: 'ul. Mokotowska 12/4 (adres demonstracyjny)',
    district: 'Śródmieście Południowe',
    postal: '00-561 Warszawa',
  },
  /** Demonstracyjne godziny kontaktu */
  hours: [
    { days: 'poniedziałek – czwartek', time: '9:00 – 18:00' },
    { days: 'piątek', time: '9:00 – 15:00' },
    { days: 'sobota', time: '9:00 – 13:00 (tylko online)' },
  ],
} as const

/** Adres produkcyjny używany w canonical/OG — podmień przy wdrożeniu. */
export const siteUrl = 'https://www.aleksandranowicka.pl'

export const disclaimers = {
  demo: 'Wersja demonstracyjna — wszystkie dane, opinie i informacje o specjalistce są fikcyjne.',
  crisis:
    'Strona i formularze nie służą do udzielania pomocy w sytuacji bezpośredniego zagrożenia życia lub zdrowia. W nagłej sytuacji skontaktuj się z numerem alarmowym 112.',
  crisisLinks:
    'Możesz też skorzystać z całodobowego Centrum Wsparcia (800 70 2222) lub telefonu zaufania 116 123.',
} as const

// ── Główny przekaz marki ─────────────────────────────────────────────────────

export const brandMessage = {
  headline: 'Odzyskaj równowagę, pewność siebie i poczucie wpływu.',
  subline:
    'Konsultacje psychologiczne, coaching i programy rozwojowe dla osób, które chcą lepiej radzić sobie z emocjami, zmianą oraz wyzwaniami zawodowymi.',
  quote: 'Zmiana zaczyna się od rozmowy, w której możesz być naprawdę sobą.',
} as const

// ── Nawigacja ────────────────────────────────────────────────────────────────

export const navigation: NavItem[] = [
  { label: 'Start', path: '/' },
  { label: 'O mnie', path: '/o-mnie' },
  {
    label: 'Oferta',
    path: '/oferta',
    children: [
      { label: 'Konsultacje psychologiczne', path: '/oferta/konsultacje-psychologiczne' },
      { label: 'Coaching', path: '/oferta/coaching' },
      { label: 'Warsztaty i wystąpienia', path: '/oferta/warsztaty-i-wystapienia' },
    ],
  },
  { label: 'Jak pracuję', path: '/jak-pracuje' },
  { label: 'Dla firm', path: '/dla-firm' },
  { label: 'Cennik', path: '/cennik' },
  { label: 'Wiedza', path: '/wiedza' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Kontakt', path: '/kontakt' },
]

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn (profil demonstracyjny)', href: 'https://www.linkedin.com/in/aleksandra-nowicka-demo', short: 'in' },
  { label: 'Instagram (profil demonstracyjny)', href: 'https://www.instagram.com/aleksandranowicka.demo', short: 'ig' },
  { label: 'Facebook (profil demonstracyjny)', href: 'https://www.facebook.com/aleksandranowicka.demo', short: 'fb' },
]

// ── Sekcja „Być może jesteś tutaj, ponieważ…" ───────────────────────────────

export const painPoints = [
  'czujesz przeciążenie i trudno Ci się zatrzymać',
  'stoisz przed ważną zmianą i nie wiesz, od czego zacząć',
  'odczuwasz spadek motywacji, choć „obiektywnie wszystko gra"',
  'brakuje Ci pewności siebie w pracy albo w relacjach',
  'odkładasz ważne decyzje z tygodnia na tydzień',
  'doświadczasz wypalenia i praca przestała cieszyć',
  'chcesz lepiej rozumieć i regulować swoje emocje',
  'potrzebujesz konkretnego planu rozwoju zawodowego',
]

// ── Proces współpracy (4 kroki) ─────────────────────────────────────────────

export const processSteps: ProcessStep[] = [
  {
    title: 'Wybierasz odpowiednią usługę',
    description:
      'Konsultacja psychologiczna, coaching albo rozmowa o współpracy dla firmy. Jeśli nie masz pewności — pomogę Ci wybrać podczas pierwszego kontaktu.',
  },
  {
    title: 'Rezerwujesz termin',
    description:
      'Wybierasz dogodny dzień i godzinę w kalendarzu online. Możesz spotkać się ze mną w gabinecie w Warszawie lub przez wideorozmowę.',
  },
  {
    title: 'Otrzymujesz potwierdzenie',
    description:
      'Dostajesz potwierdzenie terminu wraz z informacjami organizacyjnymi: jak dojechać, jak połączyć się online i jak się przygotować.',
  },
  {
    title: 'Ustalamy kierunek pracy',
    description:
      'Podczas pierwszego spotkania wspólnie określamy, nad czym chcesz pracować, w jakim tempie i po czym poznasz, że idziemy w dobrą stronę.',
  },
]

// ── Sposób pracy (wartości) ─────────────────────────────────────────────────

export const values: ValueItem[] = [
  {
    title: 'Indywidualne podejście',
    description: 'Nie pracuję według jednego szablonu. Tempo, metody i cele dopasowuję do Ciebie — nie odwrotnie.',
  },
  {
    title: 'Bezpieczeństwo i poufność',
    description: 'Wszystko, o czym rozmawiamy, zostaje między nami. Poufność to fundament, nie formalność.',
  },
  {
    title: 'Jasno określone cele',
    description: 'Od początku wiesz, po co się spotykamy i po czym poznamy postęp. Regularnie do tego wracamy.',
  },
  {
    title: 'Praktyczne narzędzia',
    description: 'Wychodzisz ze spotkań z konkretnymi sposobami działania, które możesz stosować od razu.',
  },
  {
    title: 'Empatia bez oceniania',
    description: 'Możesz mówić otwarcie — o trudnościach, wątpliwościach i porażkach. Bez oceny i bez presji.',
  },
  {
    title: 'Regularne podsumowania',
    description: 'Co kilka spotkań zatrzymujemy się i sprawdzamy, co działa, a co warto zmienić w naszej pracy.',
  },
]

// ── Biografia i kwalifikacje (WSZYSTKIE DANE FIKCYJNE) ──────────────────────

export const bio = {
  /** Krótki opis do sekcji „O mnie" na stronie głównej */
  short:
    'Jestem psycholożką i certyfikowaną coachką. Od kilkunastu lat towarzyszę ludziom w momentach przeciążenia, zmiany i zawodowych rozdroży — w gabinecie, online i na salach szkoleniowych.',
  /** Trzy najważniejsze wyróżniki na stronę główną */
  highlights: [
    '14 lat pracy z klientami indywidualnymi i zespołami',
    'ponad 2500 godzin konsultacji i sesji coachingowych',
    'warsztaty i programy rozwojowe dla kilkudziesięciu organizacji',
  ],
  /** Pełna historia zawodowa — podstrona „O mnie" */
  story: [
    'Zanim usiadłam po tej stronie gabinetu, przez kilka lat pracowałam w dziale HR dużej firmy technologicznej. Widziałam tam z bliska, jak ambitni, kompetentni ludzie tracą energię, zdrowie i wiarę w siebie — nie dlatego, że są słabi, ale dlatego, że nikt nie nauczył ich zatrzymywać się na czas. To doświadczenie zdecydowało o moim zawodowym kierunku.',
    'Ukończyłam psychologię na Uniwersytecie Warszawskim, a potem kolejne szkolenia z zakresu interwencji kryzysowej, terapii skoncentrowanej na rozwiązaniach i coachingu. Od 2012 roku prowadzę własną praktykę w Warszawie. Pracuję z osobami, które doświadczają przeciążenia, stresu i wypalenia, przechodzą przez zawodowe zmiany albo chcą odbudować pewność siebie.',
    'Drugą częścią mojej pracy są organizacje. Prowadzę warsztaty z zarządzania stresem, odporności psychicznej i komunikacji, wspieram liderów w coachingu managerskim i występuję na firmowych konferencjach. Lubię łączyć te dwa światy: wiedzę psychologiczną z realiami biznesu, w którym po prostu trzeba działać.',
    'W pracy jestem spokojna, uważna i konkretna. Nie obiecuję szybkich metamorfoz. Wierzę w rzetelną pracę opartą na sprawdzonych narzędziach psychologicznych i coachingowych — i w to, że zmiana zaczyna się od rozmowy, w której możesz być naprawdę sobą.',
  ],
  approach: [
    'Pracuję w nurcie skoncentrowanym na rozwiązaniach, korzystam też z dorobku psychologii poznawczo-behawioralnej i treningu uważności. W coachingu opieram się na ustrukturyzowanych modelach pracy z celem, m.in. GROW.',
    'Nie prowadzę psychoterapii ani leczenia — jeśli w trakcie naszej pracy okaże się, że potrzebujesz wsparcia psychoterapeutycznego lub konsultacji lekarskiej, otwarcie o tym porozmawiamy i pomogę Ci znaleźć odpowiedniego specjalistę.',
  ],
  /** Sekcja „Poza gabinetem" */
  personal: [
    'Zaczynam dzień od długiego spaceru z psem — bez telefonu, za to z termosem kawy.',
    'Od lat uczę się grać na wiolonczeli. Postępy są powolne, ale to najlepsza lekcja cierpliwości, jaką znam.',
    'W weekendy najchętniej uciekam z Warszawy na Podlasie, gdzie remontuję stary drewniany dom.',
    'Czytam na zmianę literaturę faktu i kryminały — te drugie podobno „dla równowagi".',
  ],
  areas: [
    'stres i przeciążenie',
    'wypalenie zawodowe',
    'pewność siebie i poczucie własnej wartości',
    'zmiana zawodowa i rozwój kariery',
    'odporność psychiczna',
    'emocje i relacje',
    'rozwój liderów i kompetencji managerskich',
  ],
}

/**
 * Wykształcenie i szkolenia — treści demonstracyjne.
 * Nazwy instytucji certyfikujących są fikcyjne i nie odnoszą się
 * do rzeczywistych organizacji.
 */
export const credentials: Credential[] = [
  {
    kind: 'Studia magisterskie',
    title: 'Psychologia, specjalność: psychologia kliniczna',
    place: 'Uniwersytet Warszawski',
    year: '2010',
  },
  {
    kind: 'Studia podyplomowe',
    title: 'Psychologia w zarządzaniu',
    place: 'demonstracyjna uczelnia biznesowa w Warszawie',
    year: '2013',
  },
  {
    kind: 'Certyfikat (demonstracyjny)',
    title: 'Certyfikowana Coachka — poziom Professional',
    place: 'Demonstracyjny Instytut Coachingu (nazwa fikcyjna)',
    year: '2015',
  },
  {
    kind: 'Szkolenie (demonstracyjne)',
    title: 'Terapia Skoncentrowana na Rozwiązaniach — kurs zaawansowany',
    place: 'Demonstracyjne Centrum Podejścia Skoncentrowanego na Rozwiązaniach',
    year: '2017',
  },
  {
    kind: 'Szkolenie (demonstracyjne)',
    title: 'Interwencja kryzysowa w praktyce',
    place: 'Demonstracyjny Ośrodek Interwencji i Wsparcia',
    year: '2018',
  },
  {
    kind: 'Szkolenie (demonstracyjne)',
    title: 'Trening uważności i regulacji emocji (MBSR — kurs nauczycielski)',
    place: 'Demonstracyjna Szkoła Uważności',
    year: '2021',
  },
]
