import type { BookingService, PriceCard } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// CENNIK I USŁUGI REZERWACJI — CENY DEMONSTRACYJNE
// Tu podmieniasz ceny, czasy trwania i opisy usług.
// Identyfikatory (id) łączą cennik z systemem rezerwacji — zachowaj spójność.
// ─────────────────────────────────────────────────────────────────────────────

export const bookingServices: BookingService[] = [
  {
    id: 'konsultacja-50',
    name: 'Konsultacja psychologiczna',
    durationMinutes: 50,
    price: 220,
    area: 'psychologia',
    description: 'Poufna rozmowa o tym, co jest dla Ciebie trudne: stres, przeciążenie, emocje, kryzys, wypalenie.',
    inPerson: true,
  },
  {
    id: 'coaching-60',
    name: 'Sesja coachingowa',
    durationMinutes: 60,
    price: 250,
    area: 'coaching',
    description: 'Praca nad konkretnym celem: zmiana zawodowa, pewność siebie, nawyki, rozwój w roli.',
    inPerson: true,
  },
  {
    id: 'coaching-90',
    name: 'Coaching rozszerzony',
    durationMinutes: 90,
    price: 340,
    area: 'coaching',
    description: 'Dłuższa sesja — dobra na start procesu, pracę nad złożonym tematem albo sesję strategiczną.',
    inPerson: true,
  },
  {
    id: 'pakiet-coaching-5',
    name: 'Pakiet coachingowy — 5 spotkań',
    durationMinutes: 60,
    price: 1150,
    area: 'coaching',
    description: 'Pełny proces coachingowy: 5 sesji po 60 minut z zadaniami wdrożeniowymi między spotkaniami. Rezerwujesz termin pierwszej sesji, kolejne ustalamy wspólnie.',
    inPerson: true,
  },
  {
    id: 'firma-15',
    name: 'Rozmowa organizacyjna dla firmy',
    durationMinutes: 15,
    price: 0,
    area: 'firmy',
    description: 'Bezpłatna rozmowa o potrzebach Twojej organizacji: warsztaty, program rozwojowy, wystąpienie.',
    inPerson: false,
  },
]

export const priceCards: PriceCard[] = [
  {
    id: 'card-konsultacja',
    name: 'Konsultacja psychologiczna',
    duration: '50 minut',
    price: '220 zł',
    features: ['online lub stacjonarnie', 'pełna poufność', 'bez zobowiązania do dalszych spotkań'],
    area: 'psychologia',
    bookingServiceId: 'konsultacja-50',
    ctaLabel: 'Umów konsultację',
  },
  {
    id: 'card-coaching-60',
    name: 'Coaching',
    duration: '60 minut',
    price: '250 zł',
    features: ['praca nad konkretnym celem', 'online lub stacjonarnie', 'zadania wdrożeniowe między sesjami'],
    area: 'coaching',
    bookingServiceId: 'coaching-60',
    ctaLabel: 'Umów sesję',
  },
  {
    id: 'card-coaching-90',
    name: 'Coaching rozszerzony',
    duration: '90 minut',
    price: '340 zł',
    features: ['dłuższa praca nad złożonym tematem', 'dobra na start procesu', 'online lub stacjonarnie'],
    area: 'coaching',
    bookingServiceId: 'coaching-90',
    ctaLabel: 'Umów sesję 90 min',
  },
  {
    id: 'card-pakiet',
    name: 'Pakiet coachingowy',
    duration: '5 spotkań × 60 minut',
    price: '1150 zł',
    priceNote: 'oszczędzasz 100 zł',
    features: ['pełny proces z podsumowaniami', 'materiały i zadania między sesjami', 'ważność pakietu: 4 miesiące'],
    area: 'coaching',
    bookingServiceId: 'pakiet-coaching-5',
    ctaLabel: 'Wybierz pakiet',
    highlighted: true,
  },
  {
    id: 'card-firmy',
    name: 'Warsztaty i wystąpienia',
    duration: 'format dopasowany do potrzeb',
    price: 'wycena indywidualna',
    features: ['warsztaty, webinary, prelekcje', 'programy rozwojowe i wellbeing', 'bezpłatna rozmowa o potrzebach'],
    area: 'firmy',
    ctaLabel: 'Zapytaj o ofertę',
  },
]

export const pricingNotes = [
  {
    title: 'Płatność',
    text: 'Za spotkania indywidualne zapłacisz online podczas rezerwacji (BLIK, karta, szybki przelew) albo gotówką lub kartą w gabinecie.',
  },
  {
    title: 'Faktury',
    text: 'Do każdej usługi mogę wystawić fakturę — również na firmę. Zaznacz to w formularzu rezerwacji lub napisz po spotkaniu.',
  },
  {
    title: 'Zmiana terminu',
    text: 'Termin możesz bezpłatnie zmienić do 24 godzin przed spotkaniem — telefonicznie lub mailowo.',
  },
  {
    title: 'Odwołanie spotkania',
    text: 'Spotkanie odwołane z wyprzedzeniem krótszym niż 24 godziny jest pełnopłatne. Sytuacje losowe zawsze traktuję indywidualnie.',
  },
] as const

export const pricingDemoNote =
  'Ceny mają charakter demonstracyjny i służą wyłącznie prezentacji projektu strony.'
