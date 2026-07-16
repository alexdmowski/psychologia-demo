import type { LegalDoc } from '../types'
import { doc as privacy } from './polityka-prywatnosci'
import { doc as cookies } from './polityka-cookies'
import { doc as bookingTerms } from './regulamin-rezerwacji'
import { doc as paymentTerms } from './regulamin-platnosci'

// ─────────────────────────────────────────────────────────────────────────────
// DOKUMENTY FORMALNE — TREŚCI PRZYKŁADOWE
// Przed publikacją produkcyjną wymagają weryfikacji prawnej.
// ─────────────────────────────────────────────────────────────────────────────

export const legalDocs: LegalDoc[] = [privacy, cookies, bookingTerms, paymentTerms]

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((d) => d.slug === slug)
}

export const legalDisclaimer =
  'Dokument przykładowy przygotowany na potrzeby wersji demonstracyjnej. Przed publikacją produkcyjną wymaga weryfikacji i dostosowania przez prawnika.'
