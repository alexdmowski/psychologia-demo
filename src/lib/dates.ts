// ─────────────────────────────────────────────────────────────────────────────
// Deterministyczny, demonstracyjny kalendarz dostępności.
// Terminy generowane są względem bieżącej daty, a „zajętość" wyliczana
// z prostego hasha — dzięki temu kalendarz zawsze wygląda realistycznie,
// bez backendu. Przy integracji z prawdziwym kalendarzem podmień
// getAvailableSlots()/isDayAvailable() na wywołania API.
// ─────────────────────────────────────────────────────────────────────────────

export interface DaySlots {
  date: string // ISO RRRR-MM-DD
  slots: string[] // np. ['09:00', '10:30']
}

const WEEKDAY_HOURS = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30']
const SATURDAY_HOURS = ['09:00', '10:30', '12:00']

/** Ile dni w przód pokazujemy dostępność */
export const BOOKING_HORIZON_DAYS = 42

function hashCode(text: string): number {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function fromIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function startOfToday(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

/** Niedziele i „dni wolne" (pseudolosowe, deterministyczne) są niedostępne. */
export function getDaySlots(date: Date, serviceId: string): string[] {
  const iso = toIsoDate(date)
  const dow = date.getDay()
  if (dow === 0) return []
  if (hashCode(iso) % 7 === 0) return [] // dzień wolny w grafiku demo

  const hours = dow === 6 ? SATURDAY_HOURS : WEEKDAY_HOURS
  return hours.filter((h) => hashCode(`${iso}T${h}:${serviceId}`) % 3 !== 0)
}

export function isDayAvailable(date: Date, serviceId: string): boolean {
  const today = startOfToday()
  const max = addDays(today, BOOKING_HORIZON_DAYS)
  if (date <= today || date > max) return false
  return getDaySlots(date, serviceId).length > 0
}

const MONTHS_PL = [
  'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
  'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień',
]

const MONTHS_PL_GENITIVE = [
  'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
  'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia',
]

const WEEKDAYS_PL = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota']

export function formatMonthYear(date: Date): string {
  return `${MONTHS_PL[date.getMonth()]} ${date.getFullYear()}`
}

export function formatLongDate(iso: string): string {
  const date = fromIsoDate(iso)
  return `${WEEKDAYS_PL[date.getDay()]}, ${date.getDate()} ${MONTHS_PL_GENITIVE[date.getMonth()]} ${date.getFullYear()}`
}

export function formatShortDate(iso: string): string {
  const date = fromIsoDate(iso)
  return `${date.getDate()} ${MONTHS_PL_GENITIVE[date.getMonth()]} ${date.getFullYear()}`
}

/** Komórki siatki kalendarza dla danego miesiąca (poniedziałek pierwszy). */
export function calendarCells(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1)
  const firstDow = (first.getDay() + 6) % 7 // pon = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  return cells
}
