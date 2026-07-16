// ─────────────────────────────────────────────────────────────────────────────
// Centralne typy treści demonstracyjnych.
// Wszystkie dane witryny (teksty, ceny, opinie, artykuły) są typowane tutaj,
// a ich wartości znajdują się w plikach src/content/*.ts.
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceArea = 'psychologia' | 'coaching' | 'firmy'

export interface NavChild {
  label: string
  path: string
}

export interface NavItem {
  label: string
  path: string
  children?: NavChild[]
}

export interface SocialLink {
  label: string
  href: string
  /** Krótka nazwa używana w ikonie tekstowej stopki */
  short: string
}

export interface Credential {
  /** np. „Studia magisterskie" / „Certyfikat" / „Szkolenie" */
  kind: string
  title: string
  place: string
  year: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface ValueItem {
  title: string
  description: string
}

export interface Testimonial {
  quote: string
  /** Podpis, np. „Marta, 34 — coaching kariery" */
  author: string
  context: string
  area: ServiceArea
  /** Rekomendacja firmowa wyróżniana wizualnie */
  company?: boolean
}

export interface ClientLogo {
  name: string
  descriptor: string
}

export interface FaqItem {
  question: string
  answer: string
}

export type ArticleCategory =
  | 'emocje'
  | 'stres'
  | 'wypalenie'
  | 'motywacja'
  | 'kariera'
  | 'rozwoj-liderow'

export interface ArticleSection {
  heading?: string
  paragraphs: string[]
  list?: string[]
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: ArticleCategory
  /** Data publikacji w formacie ISO (RRRR-MM-DD) */
  date: string
  readingMinutes: number
  image: string
  imageAlt: string
  sections: ArticleSection[]
}

export interface LegalSection {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export interface LegalDoc {
  slug: string
  title: string
  /** Data ostatniej aktualizacji w formacie ISO */
  updated: string
  intro: string
  sections: LegalSection[]
}

export interface PriceCard {
  id: string
  name: string
  duration: string
  price: string
  priceNote?: string
  features: string[]
  area: ServiceArea
  /** id usługi w systemie rezerwacji; brak = kieruje do formularza B2B */
  bookingServiceId?: string
  ctaLabel: string
  highlighted?: boolean
}

export interface BookingService {
  id: string
  name: string
  durationMinutes: number
  /** Cena w złotych; 0 = bezpłatna */
  price: number
  area: ServiceArea
  description: string
  /** Czy dostępna forma stacjonarna (wszystkie są dostępne online) */
  inPerson: boolean
}

export interface WorkshopTopic {
  title: string
  description: string
  format: string
}

export interface BusinessStat {
  value: string
  label: string
}
